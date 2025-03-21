import { describe, test, expect } from "bun:test";
import { getAdoptions } from "@/app/projects/[id]/edit/create/_utils/fetcher";
import { deleteAdoptions, getAdoptionsByProjectId } from "@/app/projects/[id]/edit/delete/_utils/fetcher";
import { _mutateCreateAdoption } from "@/app/projects/[id]/edit/create/_actions/mutater";

describe("正常系: TechtopicCreateEditorContainer で DB から採用技術の一覧取得成功テスト", () => {
    test("TechtopicsListPresentational に採用技術一覧を渡すことができる", async () => {
        const res = await getAdoptions();

        expect(res.ok).toBe(true);

        if (!res.ok) {
            return;
        }
        const adoptions = res.value;

        expect(adoptions.length).toBe(24);
        expect(Object.keys(adoptions[0]).length).toBe(6);
    })
})

describe("正常系： xx で DB から特定のプロジェクトに紐づく採用技術の一覧取得成功テスト", () => {
    test("xx に採用技術一覧を渡すことができる", async () => {
        const res = await getAdoptionsByProjectId(1)

        expect(res.ok).toBe(true);

        if (!res.ok) {
            return;
        }
        const adoptions = res.value;

        expect(adoptions.length).toBe(6);
    })
})

describe("正常系: TechtopicCreateEditor で DB に採用技術の登録成功テスト", () => {
    test("TechtopicCreatePresentational で登録した採用技術をを取得することができる", async () => {
        const res = await _mutateCreateAdoption({
            projectId: 6,
            techtopicId: 1,
            version: "test",
            purpose: "test",
        });

        const adoption = res;

        expect(adoption.purpose).toBe("test");
        expect(adoption.version).toBe("test");

        const res2 = await getAdoptions();

        expect(res2.ok).toBe(true);

        if (!res2.ok) {
            return;
        }
        const adoptions = res2.value;

        expect(adoptions.length).toBe(25);
    })

    test("テストで登録成功した採用技術を削除することができる", async () => {
        const res = await deleteAdoptions([25]);

        expect(res.ok).toBe(true);

        const res2 = await getAdoptions();

        expect(res2.ok).toBe(true);

        if (!res2.ok) {
            return;
        }
        const adoptions = res2.value;

        expect(adoptions.length).toBe(24);
    })
})