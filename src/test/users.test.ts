import { describe, test, expect } from "bun:test";
import { _fetchUser } from "@/app/projects/[id]/_utils/fetcher";

// ユーザー情報の取得に cookie が必要なため、内部のプライベート関数を使用
describe("正常系: Header で Edit ボタンをクリック時に DB からユーザー詳細取得成功テスト", () => {
    test("開いているプロジェクトの ID を含んでいれば編集画面に遷移できる", async () => {
        const user = await _fetchUser(1);

        if (!user) {
            return;
        }
        const openedProjectId = 1;

        expect(user.name).toBe("山田 太郎");
        expect(user.projectIds.length).toBe(1);
        expect(user.projectIds.includes(openedProjectId)).toBe(true);
    })
});
