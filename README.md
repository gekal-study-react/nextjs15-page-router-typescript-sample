これは、[`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) でブートストラップされた [Next.js](https://nextjs.org) プロジェクトです。

## はじめに

まず、開発サーバーを起動します。

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開き、結果を確認してください。

`pages/index.tsx` を編集し始めると、ページが自動的に更新されます。

[API ルート](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) は [http://localhost:3000/api/hello](http://localhost:3000/api/hello) でアクセスできます。このエンドポイントは `pages/api/hello.ts` で編集可能です。

`pages/api` ディレクトリは `/api/*` にマッピングされています。このディレクトリ内のファイルは、React ページではなく [API ルート](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) として扱われます。

このプロジェクトは、Vercel の新しいフォントファミリーである [Geist](https://vercel.com/font) を自動的に最適化してロードするために [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) を使用しています。

## 詳細情報

Next.js について詳しく知るには、以下のリソースを参照してください。

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.js の機能と API について学べます。
- [Next.js を学ぶ](https://nextjs.org/learn-pages-router) - インタラクティブな Next.js チュートリアルです。

[Next.js の GitHub リポジトリ](https://github.com/vercel/next.js) もぜひチェックしてください。フィードバックや貢献をお待ちしています！

## Vercel へのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の作成者による [Vercel プラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細については、[Next.js のデプロイに関するドキュメント](https://nextjs.org/docs/pages/building-your-application/deploying) を参照してください。
