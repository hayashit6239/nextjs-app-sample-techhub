import { describe, test, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ProjectListContainer } from "@/app/projects/_containers/project-list/container";
import { UserLoginFormContainer } from "@/app/login/_containers/user-login-form/container";
import { UserLogoutFormContainer } from "@/app/logout/_containers/user-logout-form/container";

describe("Container コンポーネントのテスト", () => {
    
    describe("ProjectListContainer", () => {
        test("プロジェクト一覧データを正常に取得してPresentationalコンポーネントに渡す", async () => {
            const container = await ProjectListContainer();
            
            expect(container).toBeDefined();
            expect(container.type).toBe(Symbol.for('react.fragment'));
        });

        test("データ取得に失敗した場合にエラーがスローされる", async () => {
            const originalPrisma = global.prisma;
            
            try {
                global.prisma = {
                    project: {
                        findMany: () => {
                            throw new Error("Database connection failed");
                        }
                    }
                };

                await expect(async () => {
                    await ProjectListContainer();
                }).toThrow();
            } finally {
                global.prisma = originalPrisma;
            }
        });
    });

    describe("UserLoginFormContainer", () => {
        test("UserLoginFormPresentationalコンポーネントをレンダリングする", () => {
            const container = UserLoginFormContainer();
            
            expect(container).toBeDefined();
            expect(container.type).toBeDefined();
        });
    });

    describe("UserLogoutFormContainer", () => {
        test("UserLogoutFormPresentationalコンポーネントをレンダリングする", () => {
            const container = UserLogoutFormContainer();
            
            expect(container).toBeDefined();
            expect(container.type).toBeDefined();
        });
    });
});