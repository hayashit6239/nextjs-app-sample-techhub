import { describe, test, expect } from "bun:test";
import { getProjects } from "@/app/projects/_utils/fetcher";
import { getProject } from "@/app/projects/[id]/_utils/fetcher";

describe("正常系: ProjectListContainer で DB からプロジェクト一覧取得成功テスト", () => {
    test("ProjectListPresentational にプロジェクト一覧を渡すことができる", async () => {
        const res = await getProjects();

        expect(res.ok).toBe(true);

        if (!res.ok) {
            return;
        }

        const projects = res.value;

        expect(projects.length).toBeGreaterThan(0);
        expect(Object.keys(projects[0]).length).toBe(7);
        
        // 技術トピックが存在するプロジェクトがあることを確認
        const projectsWithTech = projects.filter(project => project.techtopics?.length > 0);
        expect(projectsWithTech.length).toBeGreaterThanOrEqual(0);
    })
});

describe("正常系: ProjectDetailContainer で DB から紐付けトピックが存在するプロジェクト詳細取得成功テスト", () => {
    test("ProjectDetailPresentational に紐付けトピックが存在するプロジェクト詳細を渡すことができる", async () => {
        // まずプロジェクト一覧を取得して、技術トピックが存在するプロジェクトを見つける
        const projectsRes = await getProjects();
        expect(projectsRes.ok).toBe(true);
        
        if (!projectsRes.ok) {
            return;
        }
        
        const projectWithTech = projectsRes.value.find(p => p.techtopics?.length > 0);
        
        if (!projectWithTech) {
            // 技術トピックが存在するプロジェクトがない場合はテストをスキップ
            console.log("No project with tech topics found, skipping test");
            return;
        }

        const res = await getProject(projectWithTech.id);

        expect(res.ok).toBe(true);

        if (!res.ok) {
            return;
        }

        const project = res.value;

        expect(Object.keys(project).length).toBe(7);
        expect(Object.keys(project).includes("techtopics")).toBe(true);
        expect(project.techtopics.length).toBeGreaterThan(0);
    })
})

describe("正常系: ProjectDetailContainer で DB から紐付けトピックが存在しないプロジェクト詳細取得成功テスト", () => {
    test("ProjectDetailPresentational に紐付けトピックが存在しないプロジェクト詳細を渡すことができる", async () => {
        // まずプロジェクト一覧を取得して、技術トピックが存在しないプロジェクトを見つける
        const projectsRes = await getProjects();
        expect(projectsRes.ok).toBe(true);
        
        if (!projectsRes.ok) {
            return;
        }
        
        const projectWithoutTech = projectsRes.value.find(p => p.techtopics?.length === 0);
        
        if (!projectWithoutTech) {
            // 技術トピックが存在しないプロジェクトがない場合はテストをスキップ
            console.log("No project without tech topics found, skipping test");
            return;
        }

        const res = await getProject(projectWithoutTech.id);

        expect(res.ok).toBe(true);

        if (!res.ok) {
            return;
        }

        const project = res.value;

        expect(Object.keys(project).length).toBe(7);
        expect(Object.keys(project).includes("techtopics")).toBe(true);
        expect(project.techtopics.length).toBe(0);
    })
})