import { describe, test, expect } from "bun:test";
import { cn, transformTechtopicsToTechCategoryTopics, removeDuplicateObjects, sleep } from "@/lib/utils";
import { ResTechtopic } from "@/lib/server-response-types";

describe("ユーティリティ関数のテスト", () => {

    describe("cn 関数", () => {
        test("複数のクラス名を正常に結合する", () => {
            const result = cn("text-red-500", "bg-blue-200", "p-4");
            expect(typeof result).toBe("string");
            expect(result).toContain("text-red-500");
            expect(result).toContain("bg-blue-200");
            expect(result).toContain("p-4");
        });

        test("条件付きクラス名を正常に処理する", () => {
            const isActive = true;
            const result = cn("base-class", {
                "active-class": isActive,
                "inactive-class": !isActive
            });
            
            expect(result).toContain("base-class");
            expect(result).toContain("active-class");
            expect(result).not.toContain("inactive-class");
        });

        test("重複するクラス名を適切にマージする", () => {
            const result = cn("p-2", "p-4");
            expect(result).toBe("p-4");
        });

        test("空の入力でも正常に動作する", () => {
            const result = cn();
            expect(result).toBe("");
        });

        test("null/undefinedを含む入力を正常に処理する", () => {
            const result = cn("valid-class", null, undefined, "another-valid");
            expect(result).toContain("valid-class");
            expect(result).toContain("another-valid");
        });
    });

    describe("transformTechtopicsToTechCategoryTopics 関数", () => {
        const mockTechtopics: ResTechtopic[] = [
            {
                id: 1,
                name: "React",
                techcategoryName: "フロントエンド",
                version: "18.0",
                purpose: "UI開発",
                adoptionId: 1
            },
            {
                id: 2,
                name: "Vue.js",
                techcategoryName: "フロントエンド", 
                version: "3.0",
                purpose: "UI開発",
                adoptionId: 2
            },
            {
                id: 3,
                name: "Node.js",
                techcategoryName: "バックエンド",
                version: "18.0",
                purpose: "サーバー開発",
                adoptionId: 3
            }
        ];

        test("技術トピックをカテゴリごとに正常に分類する", () => {
            const result = transformTechtopicsToTechCategoryTopics(mockTechtopics);
            
            expect(result).toHaveLength(2);
            
            const frontendCategory = result.find(cat => cat.techCategoryName === "フロントエンド");
            const backendCategory = result.find(cat => cat.techCategoryName === "バックエンド");
            
            expect(frontendCategory).toBeDefined();
            expect(frontendCategory?.techtopics).toHaveLength(2);
            expect(frontendCategory?.techtopics.map(t => t.name)).toEqual(["React", "Vue.js"]);
            
            expect(backendCategory).toBeDefined();
            expect(backendCategory?.techtopics).toHaveLength(1);
            expect(backendCategory?.techtopics[0].name).toBe("Node.js");
        });

        test("空配列を渡すと空配列が返る", () => {
            const result = transformTechtopicsToTechCategoryTopics([]);
            expect(result).toHaveLength(0);
        });

        test("同じカテゴリの技術が複数ある場合に正しくグループ化される", () => {
            const sameCategoryTechs: ResTechtopic[] = [
                {
                    id: 1,
                    name: "React",
                    techcategoryName: "フロントエンド",
                    version: "18.0",
                    purpose: "UI",
                    adoptionId: 1
                },
                {
                    id: 2,
                    name: "Angular",
                    techcategoryName: "フロントエンド",
                    version: "15.0",
                    purpose: "UI",
                    adoptionId: 2
                }
            ];

            const result = transformTechtopicsToTechCategoryTopics(sameCategoryTechs);
            
            expect(result).toHaveLength(1);
            expect(result[0].techCategoryName).toBe("フロントエンド");
            expect(result[0].techtopics).toHaveLength(2);
        });
    });

    describe("removeDuplicateObjects 関数", () => {
        test("重複するIDのオブジェクトを正常に削除する", () => {
            const input = [
                { id: 1, name: "React" },
                { id: 2, name: "Vue" },
                { id: 1, name: "React Duplicate" },
                { id: 3, name: "Angular" }
            ];

            const result = removeDuplicateObjects(input);
            
            expect(result).toHaveLength(3);
            expect(result.map(item => item.id)).toEqual([1, 2, 3]);
            expect(result[0].name).toBe("React");
        });

        test("重複がない場合は元の配列がそのまま返る", () => {
            const input = [
                { id: 1, name: "React" },
                { id: 2, name: "Vue" },
                { id: 3, name: "Angular" }
            ];

            const result = removeDuplicateObjects(input);
            
            expect(result).toHaveLength(3);
            expect(result).toEqual(input);
        });

        test("空配列を渡すと空配列が返る", () => {
            const result = removeDuplicateObjects([]);
            expect(result).toHaveLength(0);
        });

        test("1つの要素の配列でも正常に動作する", () => {
            const input = [{ id: 1, name: "React" }];
            const result = removeDuplicateObjects(input);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(input[0]);
        });

        test("すべて同じIDの場合は最初の要素のみ返る", () => {
            const input = [
                { id: 1, name: "First" },
                { id: 1, name: "Second" },
                { id: 1, name: "Third" }
            ];

            const result = removeDuplicateObjects(input);
            
            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("First");
        });
    });

    describe("sleep 関数", () => {
        test("指定した時間だけ待機する", async () => {
            const startTime = Date.now();
            const waitTime = 100;
            
            await sleep(waitTime);
            
            const endTime = Date.now();
            const actualWaitTime = endTime - startTime;
            
            expect(actualWaitTime).toBeGreaterThanOrEqual(waitTime - 10);
            expect(actualWaitTime).toBeLessThan(waitTime + 50);
        });

        test("0ミリ秒でも正常に動作する", async () => {
            const startTime = Date.now();
            
            await sleep(0);
            
            const endTime = Date.now();
            const actualWaitTime = endTime - startTime;
            
            expect(actualWaitTime).toBeLessThan(10);
        });

        test("大きな値でも正常に動作する", async () => {
            const startTime = Date.now();
            const waitTime = 200;
            
            await sleep(waitTime);
            
            const endTime = Date.now();
            const actualWaitTime = endTime - startTime;
            
            expect(actualWaitTime).toBeGreaterThanOrEqual(waitTime - 10);
        }, 1000);

        test("Promiseを返す", () => {
            const result = sleep(10);
            expect(result).toBeInstanceOf(Promise);
        });
    });
});