# 環境変数ファイルの作成
if [ ! -e .env ]; then
    cp .env.dummy .env
fi

# コンテナビルド
docker build -t nextjs-techhub . --platform linux/amd64

# コンテナ起動
docker run -d -p 3000:3000 --name nextjs-techhub nextjs-techhub