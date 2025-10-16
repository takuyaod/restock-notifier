# Playwrightの公式イメージを使用
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# TypeScriptをビルド
RUN npm run build

# アプリケーションを実行
CMD ["npm", "start"]
