# 環境変数ファイルの作成
cp .env.dummy .env

# コンテナビルド
docker build -t nextjs-techhub . --platform linux/arm64