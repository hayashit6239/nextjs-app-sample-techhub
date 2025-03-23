# 概要

[Next.js App Router で実装！Next.js App Router で実装！技術スタック共有っぽいサンプルアプリ]()という記事のリポジトリです。

# 利用手順

## 0. 想定している動作環境

Dockerfile を用意しているので、Docker が動く環境であれば問題ありません。

## 1. コンテナ起動スクリプトの実行

下記のコマンドでコンテナを build & run します。
ポートは 3000 を利用します。

```sh
./build.sh
```

## 2. ログイン画面

下記の画面が表示されたらログインします。

- ユーザー名：tester
- パスワード：test

![Image](https://github.com/user-attachments/assets/74d06a69-0578-483c-b017-be0bf3931cca)

ログイン後に画面が遷移しなかったら「Tech Hub」をクリックしてください。

## 3. プロジェクト一覧画面

seed によって投入されたダミーデータが表示されます。
「Number Zero PJ」の「プロジェクトの詳細を見る」をクリックします。

![Image](https://github.com/user-attachments/assets/c3acdef2-ce8e-47d1-9f1c-b79c19fec621)

## 4. プロジェクト詳細画面

プロジェクトに紐づいている採用している技術スタックが表示されます。

「プロジェクトの編集モードを表示する」をクリックします。

![Image](https://github.com/user-attachments/assets/5a1d375e-b611-422a-8ef5-37238623ebb6)

## 5. プロジェクト編集画面

編集モードが表示されます。

「採用技術の追加モーダルを開く」「採用技術の削除モーダルを開く」で採用している技術スタックを操作できます。

![Image](https://github.com/user-attachments/assets/fbedc659-23a8-4163-ba4a-e694ad4c1903)

※ 採用技術の追加後にリロードしないと反映されないです。

![Image](https://github.com/user-attachments/assets/6338d628-f45c-4b15-bb8b-d38a82165725)

![Image](https://github.com/user-attachments/assets/b2373e72-8f1e-4b1a-bda8-7ca7ac5e1234)
