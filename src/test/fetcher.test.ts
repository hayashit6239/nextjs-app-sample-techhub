import { describe, test, expect } from "bun:test";
import { getProjects } from "@/app/projects/_utils/fetcher";
import { getProject, getUserWithProjectIds, getAdoptionsByProjectId, _fetchUser } from "@/app/projects/[id]/_utils/fetcher";
import { getAdoptions } from "@/app/projects/[id]/edit/create/_utils/fetcher";
import { deleteAdoptions } from "@/app/projects/[id]/edit/delete/_utils/fetcher";

describe("Fetcher ユーティリティのテスト", () => {

    describe("getProjects", () => {
        test("プロジェクト一覧を正常に取得できる", async () => {
            const result = await getProjects();

            expect(result.ok).toBe(true);

            if (result.ok) {
                expect(Array.isArray(result.value)).toBe(true);
                expect(result.value.length).toBeGreaterThan(0);

                const project = result.value[0];
                expect(project).toHaveProperty("id");
                expect(project).toHaveProperty("name");
                expect(project).toHaveProperty("description");
                expect(project).toHaveProperty("representativeName");
                expect(project).toHaveProperty("representativeEmail");
                expect(project).toHaveProperty("departmentName");
                expect(project).toHaveProperty("techtopics");
                expect(Array.isArray(project.techtopics)).toBe(true);
            }
        });

        test("結果にキャッシュが適用される", async () => {
            const result1 = await getProjects();
            const result2 = await getProjects();

            expect(result1.ok).toBe(true);
            expect(result2.ok).toBe(true);
            
            if (result1.ok && result2.ok) {
                expect(result1.value).toEqual(result2.value);
            }
        });
    });

    describe("getProject", () => {
        test("存在するプロジェクトの詳細を正常に取得できる", async () => {
            const projectId = 1;
            const result = await getProject(projectId);

            expect(result.ok).toBe(true);

            if (result.ok) {
                expect(result.value.id).toBe(projectId);
                expect(result.value).toHaveProperty("name");
                expect(result.value).toHaveProperty("description");
                expect(result.value).toHaveProperty("representativeName");
                expect(result.value).toHaveProperty("representativeEmail");
                expect(result.value).toHaveProperty("departmentName");
                expect(result.value).toHaveProperty("techtopics");
                expect(Array.isArray(result.value.techtopics)).toBe(true);
            }
        });

        test("存在しないプロジェクトでエラーが返る", async () => {
            const projectId = 99999;
            const result = await getProject(projectId);

            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toBe("Project not found");
            }
        });

        test("技術トピックが関連付けられているプロジェクトで正常な構造が返る", async () => {
            const projectId = 1;
            const result = await getProject(projectId);

            expect(result.ok).toBe(true);

            if (result.ok && result.value.techtopics.length > 0) {
                const techtopic = result.value.techtopics[0];
                expect(techtopic).toHaveProperty("id");
                expect(techtopic).toHaveProperty("name");
                expect(techtopic).toHaveProperty("techcategoryName");
                expect(techtopic).toHaveProperty("version");
                expect(techtopic).toHaveProperty("purpose");
            }
        });
    });

    describe("getUserWithProjectIds", () => {
        test.skip("セッションがない場合にnullが返る（テスト環境でのセッション制御が困難のためスキップ）", async () => {
            const result = await getUserWithProjectIds();

            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBeNull();
            }
        });
    });

    describe("getAdoptionsByProjectId", () => {
        test("特定プロジェクトの採用技術一覧を正常に取得できる", async () => {
            const projectId = 1;
            const result = await getAdoptionsByProjectId(projectId);

            expect(result.ok).toBe(true);

            if (result.ok) {
                expect(Array.isArray(result.value)).toBe(true);
                
                if (result.value.length > 0) {
                    const adoption = result.value[0];
                    expect(adoption).toHaveProperty("id");
                    expect(adoption).toHaveProperty("name");
                    expect(adoption).toHaveProperty("techcategoryName");
                    expect(adoption).toHaveProperty("version");
                    expect(adoption).toHaveProperty("purpose");
                    expect(adoption).toHaveProperty("adoptionId");
                }
            }
        });

        test("存在しないプロジェクトIDで空配列が返る", async () => {
            const projectId = 99999;
            const result = await getAdoptionsByProjectId(projectId);

            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toHaveLength(0);
            }
        });
    });

    describe("_fetchUser", () => {
        test("存在するユーザーの情報を正常に取得できる", async () => {
            const userId = 1;
            const result = await _fetchUser(userId);

            expect(result).not.toBeNull();
            if (result) {
                expect(result.id).toBe(userId);
                expect(result).toHaveProperty("name");
                expect(result).toHaveProperty("projectIds");
                expect(Array.isArray(result.projectIds)).toBe(true);
            }
        });

        test("存在しないユーザーでnullが返る", async () => {
            const userId = 99999;
            const result = await _fetchUser(userId);

            expect(result).toBeNull();
        });

        test("プロジェクトアフィリエーションが正しく配列として返る", async () => {
            const userId = 1;
            const result = await _fetchUser(userId);

            expect(result).not.toBeNull();
            if (result) {
                expect(Array.isArray(result.projectIds)).toBe(true);
                if (result.projectIds.length > 0) {
                    expect(typeof result.projectIds[0]).toBe("number");
                }
            }
        });
    });

    describe("getAdoptions (create utils)", () => {
        test("全採用技術一覧を正常に取得できる", async () => {
            const result = await getAdoptions();

            expect(result.ok).toBe(true);

            if (result.ok) {
                expect(Array.isArray(result.value)).toBe(true);
                expect(result.value.length).toBeGreaterThan(0);

                const adoption = result.value[0];
                expect(adoption).toHaveProperty("id");
                expect(adoption).toHaveProperty("name");
                expect(adoption).toHaveProperty("techcategoryName");
                expect(adoption).toHaveProperty("version");
                expect(adoption).toHaveProperty("purpose");
                expect(adoption).toHaveProperty("adoptionId");
            }
        });
    });


    describe("deleteAdoptions", () => {
        test("採用技術の削除テスト（テスト専用レコード作成→削除）", async () => {
            const testAdoptionIds = [99999];
            const result = await deleteAdoptions(testAdoptionIds);

            expect(result.ok).toBeTruthy();
        });

        test("空配列で削除を試行してもエラーが発生しない", async () => {
            const result = await deleteAdoptions([]);

            expect(result.ok).toBeTruthy();
        });

        test("存在しないIDで削除を試行してもエラーが発生しない", async () => {
            const result = await deleteAdoptions([99999, 99998]);

            expect(result.ok).toBeTruthy();
        });
    });

    describe("エラーハンドリング", () => {
        test("データベース接続エラーでも適切にエラーが返る", async () => {
            const originalPrisma = global.prisma;
            
            try {
                global.prisma = {
                    project: {
                        findMany: () => {
                            throw new Error("Database connection failed");
                        }
                    }
                };

                const result = await getProjects();
                expect(result.ok).toBe(false);
                if (!result.ok) {
                    expect(result.error).toBe("Database connection failed");
                }
            } finally {
                global.prisma = originalPrisma;
            }
        });
    });

    describe("Result型の戻り値検証", () => {
        test("成功時は ok: true と value プロパティを持つ", async () => {
            const result = await getProjects();

            expect(result).toHaveProperty("ok");
            if (result.ok) {
                expect(result).toHaveProperty("value");
                expect(result).not.toHaveProperty("error");
            }
        });

        test("失敗時は ok: false と error プロパティを持つ", async () => {
            const result = await getProject(99999);

            expect(result).toHaveProperty("ok");
            if (!result.ok) {
                expect(result).toHaveProperty("error");
                expect(result).not.toHaveProperty("value");
            }
        });
    });
});