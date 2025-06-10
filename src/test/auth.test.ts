import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { encrypt, createSession, decrypt } from "@/lib/session";

describe("認証機能のテスト", () => {
    
    const mockSecretKey = "test-secret-key-32-characters-long";
    const originalEnvKey = process.env.JWT_SECRET_KEY;
    
    beforeEach(() => {
        process.env.JWT_SECRET_KEY = mockSecretKey;
    });
    
    afterEach(() => {
        process.env.JWT_SECRET_KEY = originalEnvKey;
    });

    describe("encrypt 関数", () => {
        test("ペイロードを正常に暗号化できる", async () => {
            const payload = {
                sub: "1",
                name: "テストユーザー",
                username: "testuser"
            };
            
            const encodedKey = new TextEncoder().encode(mockSecretKey);
            const encrypted = await encrypt(payload, encodedKey);
            
            expect(typeof encrypted).toBe("string");
            expect(encrypted.length).toBeGreaterThan(0);
            expect(encrypted.split(".")).toHaveLength(3);
        });

        test("異なるペイロードで異なる暗号化結果を生成する", async () => {
            const payload1 = {
                sub: "1",
                name: "ユーザー1",
                username: "user1"
            };
            
            const payload2 = {
                sub: "2", 
                name: "ユーザー2",
                username: "user2"
            };
            
            const encodedKey = new TextEncoder().encode(mockSecretKey);
            const encrypted1 = await encrypt(payload1, encodedKey);
            const encrypted2 = await encrypt(payload2, encodedKey);
            
            expect(encrypted1).not.toBe(encrypted2);
        });
    });

    describe("decrypt 関数", () => {
        test("暗号化されたセッションを正常に復号化できる", async () => {
            const originalPayload = {
                sub: "1",
                name: "テストユーザー",
                username: "testuser"
            };
            
            const encodedKey = new TextEncoder().encode(mockSecretKey);
            const encrypted = await encrypt(originalPayload, encodedKey);
            const decrypted = await decrypt(encrypted);
            
            expect(decrypted).toBeDefined();
            expect(decrypted?.sub).toBe(originalPayload.sub);
            expect(decrypted?.name).toBe(originalPayload.name);
            expect(decrypted?.username).toBe(originalPayload.username);
        });

        test("無効なセッションの復号化でundefinedが返る", async () => {
            const invalidSession = "invalid.session.token";
            const decrypted = await decrypt(invalidSession);
            
            expect(decrypted).toBeUndefined();
        });

        test("空文字列のセッションでundefinedが返る", async () => {
            const decrypted = await decrypt("");
            
            expect(decrypted).toBeUndefined();
        });

        test("undefinedのセッションでundefinedが返る", async () => {
            const decrypted = await decrypt(undefined);
            
            expect(decrypted).toBeUndefined();
        });
    });

    describe("セッション管理の統合テスト", () => {
        test("暗号化と復号化のラウンドトリップが正常に動作する", async () => {
            const testCases = [
                {
                    sub: "1",
                    name: "山田太郎",
                    username: "yamada"
                },
                {
                    sub: "999",
                    name: "Special User @#$%",
                    username: "special_user"
                },
                {
                    sub: "123",
                    name: "",
                    username: "empty_name"
                }
            ];

            const encodedKey = new TextEncoder().encode(mockSecretKey);

            for (const payload of testCases) {
                const encrypted = await encrypt(payload, encodedKey);
                const decrypted = await decrypt(encrypted);
                
                expect(decrypted?.sub).toBe(payload.sub);
                expect(decrypted?.name).toBe(payload.name);
                expect(decrypted?.username).toBe(payload.username);
            }
        });

        test("JWTトークンに有効期限が設定されている", async () => {
            const payload = {
                sub: "1",
                name: "テストユーザー",
                username: "testuser"
            };
            
            const encodedKey = new TextEncoder().encode(mockSecretKey);
            const encrypted = await encrypt(payload, encodedKey);
            const decrypted = await decrypt(encrypted);
            
            expect(decrypted?.exp).toBeDefined();
            expect(decrypted?.iat).toBeDefined();
            expect(Number(decrypted?.exp)).toBeGreaterThan(Number(decrypted?.iat));
        });
    });

    describe("セキュリティテスト", () => {
        test("異なる秘密鍵で暗号化されたトークンは復号化できない", async () => {
            const payload = {
                sub: "1",
                name: "テストユーザー",
                username: "testuser"
            };
            
            const key1 = new TextEncoder().encode("different-secret-key-32-chars");
            const encrypted = await encrypt(payload, key1);
            
            process.env.JWT_SECRET_KEY = "another-different-key-32-chars";
            const decrypted = await decrypt(encrypted);
            
            expect(decrypted).toBeUndefined();
        });

        test("改ざんされたトークンは復号化できない", async () => {
            const payload = {
                sub: "1",
                name: "テストユーザー",
                username: "testuser"
            };
            
            const encodedKey = new TextEncoder().encode(mockSecretKey);
            const encrypted = await encrypt(payload, encodedKey);
            
            const tamperedToken = encrypted.slice(0, -10) + "tamperedend";
            const decrypted = await decrypt(tamperedToken);
            
            expect(decrypted).toBeUndefined();
        });
    });
});