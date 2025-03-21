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

        expect(projects.length).toBe(6);
        expect(projects.filter((project) => project.id === 1)[0].techtopics?.length).toBe(6);
        expect(Object.keys(projects[0]).length).toBe(7);
    })
});

describe("正常系: ProjectDetailContainer で DB から紐付けトピックが存在するプロジェクト詳細取得成功テスト", () => {
    test("ProjectDetailPresentational に紐付けトピックが存在するプロジェクト詳細を渡すことができる", async () => {
        const res = await getProject(1);

        expect(res.ok).toBe(true);

        if (!res.ok) {
            return;
        }

        const project = res.value;

        expect(Object.keys(project).length).toBe(7);
        expect(Object.keys(project).includes("techtopics")).toBe(true);
        expect(project.techtopics.length).toBe(6);
    })
})

describe("正常系: ProjectDetailContainer で DB から紐付けトピックが存在しないプロジェクト詳細取得成功テスト", () => {
    test("ProjectDetailPresentational に紐付けトピックが存在しないプロジェクト詳細を渡すことができる", async () => {
        const res = await getProject(6);

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