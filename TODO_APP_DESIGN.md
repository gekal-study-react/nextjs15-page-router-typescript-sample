# TODO アプリ 設計書

このドキュメントでは、Next.js 15 (Pages Router)、TanStack Query、MUI を使用した CSR (クライアントサイドレンダリング) 静的サイト TODO アプリケーションのアーキテクチャと実装の詳細について説明します。

## 1. 技術スタック
- **フレームワーク**: Next.js 15 (Pages Router)
- **状態管理**: TanStack Query (React Query) v5
- **UI フレームワーク**: MUI (Material UI) v7 (React 19 サポート)
- **データ取得**: ローカルストレージを使用したモック API、または遅延を伴うシンプルなオブジェクトによる擬似的なデータ取得。
- **エラーハンドリング**: `react-error-boundary` と TanStack Query の `throwOnError: true` (`useSuspenseQuery` ではデフォルト) を使用。
- **スタイリング**: MUI の `sx` プロップと Emotion。

## 2. 主要コンポーネントと実装詳細
- **`src/pages/_app.tsx`**:
  - TanStack Query 用の `QueryClientProvider`。
  - MUI の `ThemeProvider` と `CssBaseline`。
  - グローバルな `ErrorBoundary` ラッパー。
  - `useSuspenseQuery` 用の `Suspense` ラッパー。
- **`src/hooks/useTodos.ts`**:
  - TODO の取得、追加、更新、削除を行うカスタムフック。
  - 取得には `useSuspenseQuery` を使用。
  - 更新系には `useMutation` を使用。
- **`src/api/todoApi.ts`**:
  - 永続化をシミュレートするための `localStorage` と、ネットワーク遅延をシミュレートするための `setTimeout` を使用したモック API の実装。
- **ページ**:
  - `/`: TODO リストと新規追加用フォーム。
  - `/todo/[id]`: 特定の TODO の詳細ビュー（複数ページのデモンストレーション用）。

## 3. グローバルエラーハンドリング
- `react-error-boundary` の `ErrorBoundary` を使用。
- `useSuspenseQuery` はエラーが発生すると、自動的に最も近いエラー境界にエラーをスローします。
- エラー発生時には「再試行」ボタンを含むフォールバック UI が表示されます。

## 4. UI コンポーネント (MUI)
- `Container`, `Box`, `Typography`, `List`, `ListItem`, `TextField`, `Button`, `Checkbox`, `IconButton`, `CircularProgress` (Suspense のフォールバック用)。
- シンプルなナビゲーション用の `AppBar`。

## 5. 永続化
- TODO は `localStorage` に保存され、CSR 環境でのページリロード間でもデータが保持されます。
