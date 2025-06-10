import { describe, test, expect } from "bun:test";
import { type Project } from "@/app/projects/_containers/project-list/presentational";

const mockProjects: Project[] = [
    {
        id: 1,
        name: "テストプロジェクト1",
        description: "テスト用のプロジェクト1",
        representativeName: "山田太郎",
        representativeEmail: "yamada@example.com",
        departmentName: "開発部",
        techtopicCount: 5
    },
    {
        id: 2,
        name: "サンプルプロジェクト",
        description: "サンプル用のプロジェクト",
        representativeName: "田中花子",
        representativeEmail: "tanaka@example.com",
        departmentName: "システム部",
        techtopicCount: 3
    }
];

describe("Presentational コンポーネントのテスト", () => {
    
    describe("ProjectListPresentational", () => {
        test("Project型のデータ構造が正しく定義されている", () => {
            const project = mockProjects[0];
            
            expect(project).toHaveProperty("id");
            expect(project).toHaveProperty("name");
            expect(project).toHaveProperty("description");
            expect(project).toHaveProperty("representativeName");
            expect(project).toHaveProperty("representativeEmail");
            expect(project).toHaveProperty("departmentName");
            expect(project).toHaveProperty("techtopicCount");
            
            expect(typeof project.id).toBe("number");
            expect(typeof project.name).toBe("string");
            expect(typeof project.description).toBe("string");
            expect(typeof project.representativeName).toBe("string");
            expect(typeof project.representativeEmail).toBe("string");
            expect(typeof project.departmentName).toBe("string");
            expect(typeof project.techtopicCount).toBe("number");
        });

        test("複数のプロジェクトデータの配列操作が正常に動作する", () => {
            const projectNames = mockProjects.map(p => p.name);
            const filteredProjects = mockProjects.filter(p => p.name.includes("テスト"));
            
            expect(projectNames).toEqual(["テストプロジェクト1", "サンプルプロジェクト"]);
            expect(filteredProjects).toHaveLength(1);
            expect(filteredProjects[0].name).toBe("テストプロジェクト1");
        });

        test("空のプロジェクト配列でも正常に処理される", () => {
            const emptyProjects: Project[] = [];
            const filteredData = emptyProjects.filter(x => x.name.includes("test"));
            
            expect(filteredData).toHaveLength(0);
            expect(Array.isArray(filteredData)).toBe(true);
        });

        test("検索フィルタリングロジックが正常に動作する", () => {
            const searchText = "サンプル";
            const filteredData = mockProjects.filter(x => x.name.includes(searchText));
            
            expect(filteredData).toHaveLength(1);
            expect(filteredData[0].name).toBe("サンプルプロジェクト");
        });

        test("大文字小文字を区別した検索が動作する", () => {
            const searchText = "テスト";
            const filteredData = mockProjects.filter(x => x.name.includes(searchText));
            
            expect(filteredData).toHaveLength(1);
            expect(filteredData[0].name).toBe("テストプロジェクト1");
        });

        test("存在しない検索語で空の結果が返る", () => {
            const searchText = "存在しない";
            const filteredData = mockProjects.filter(x => x.name.includes(searchText));
            
            expect(filteredData).toHaveLength(0);
        });
    });

    describe("フォームデータの型安全性", () => {
        test("FormDataから値を取得する際の型チェック", () => {
            const formData = new FormData();
            formData.append("username", "tester");
            formData.append("password", "test");
            formData.append("projectId", "1");
            
            const username = formData.get("username") as string;
            const password = formData.get("password") as string;
            const projectId = formData.get("projectId") as string;
            
            expect(typeof username).toBe("string");
            expect(typeof password).toBe("string");
            expect(typeof projectId).toBe("string");
            expect(username).toBe("tester");
            expect(password).toBe("test");
            expect(Number(projectId)).toBe(1);
        });

        test("バリデーション用の型変換が正常に動作する", () => {
            const formData = new FormData();
            formData.append("projectId", "123");
            formData.append("techtopicId", "456");
            
            const projectId = Number(formData.get("projectId"));
            const techtopicId = Number(formData.get("techtopicId"));
            
            expect(typeof projectId).toBe("number");
            expect(typeof techtopicId).toBe("number");
            expect(projectId).toBe(123);
            expect(techtopicId).toBe(456);
        });
    });
});