# TODO App Design Document

This document outlines the architecture and implementation details for a CSR (Client-Side Rendering) static site TODO application using Next.js 15 (Pages Router), TanStack Query, and MUI.

## 1. Technology Stack
- **Framework**: Next.js 15 (Pages Router)
- **State Management**: TanStack Query (React Query) v5
- **UI Framework**: MUI (Material UI) v6 with React 19 support
- **Data Fetching**: Mock API using local storage or a simple object with delay to simulate fetching.
- **Error Handling**: `react-error-boundary` with TanStack Query's `throwOnError: true` (default in `useSuspenseQuery`).
- **Styling**: MUI's `sx` prop and Emotion.

## 2. Key Components & Implementation Details
- **`src/pages/_app.tsx`**:
  - `QueryClientProvider` for TanStack Query.
  - MUI `ThemeProvider` and `CssBaseline`.
  - Global `ErrorBoundary` wrapper.
  - `Suspense` wrapper for `useSuspenseQuery`.
- **`src/hooks/useTodos.ts`**:
  - Custom hooks for fetching, adding, updating, and deleting TODOs.
  - Using `useSuspenseQuery` for fetching.
  - Using `useMutation` for mutations.
- **`src/api/todoApi.ts`**:
  - Mock API implementation using `localStorage` to simulate persistence and `setTimeout` to simulate network latency.
- **Pages**:
  - `/`: List of TODOs with a form to add new ones.
  - `/todo/[id]`: Detail view of a specific TODO (to demonstrate multiple pages).

## 3. Global Error Handling
- Use `ErrorBoundary` from `react-error-boundary`.
- `useSuspenseQuery` will automatically throw errors to the nearest error boundary.
- A fallback UI will be displayed when an error occurs, with a "Retry" button.

## 4. UI Components (MUI)
- `Container`, `Box`, `Typography`, `List`, `ListItem`, `TextField`, `Button`, `Checkbox`, `IconButton`, `CircularProgress` (for Suspense fallback).
- `AppBar` for simple navigation.

## 5. Persistence
- TODOs will be saved in `localStorage` to persist data between page reloads in the CSR environment.
