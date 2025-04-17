# GitHub Repositories Viewer

A Vue 3 SPA that displays public repositories from the Node.js GitHub organization using the GitHub API. Features include infinite scrolling, state persistence, and long-press navigation.

## Stack

- **Vue 3** — Lightweight reactive frontend framework
- **Vite** — Fast dev server and bundler
- **Pinia** — State management with persistence
- **Octokit** — GitHub API client
- **Vant** — Mobile-friendly UI library
- **IntersectionObserver** — Efficient scroll tracking
- **Custom Directives** — Long-press handler
- **Aliases** — Clean import paths using `@`

## Features

- Display repository name, description, owner
- Background color reflects `has_wiki` status
- Paginated GitHub API requests (10 at a time)
- Infinite scroll via IntersectionObserver
- Long-press shows navigation dialog (repo or owner)
- State restored on hard refresh

## Testing

- **Vitest** ensures:
  - Repositories are fetched correctly
  - Pagination triggers as expected
  - State is preserved with Pinia

## Suggestions for Improvement

- **Efficient memory management**:  
  Consider V8’s amortized doubling strategy. Instead of pushing to arrays repeatedly, manage memory with pre-allocated structures when handling large datasets.
  
- **Virtual scrolling**:  
  Render only visible elements for better performance on long lists.

- **Offline caching**:  
  Use IndexedDB to store API responses and reduce redundant requests.

- **Exponential backoff**:  
  Retry failed API requests with increasing delay to prevent overload.

- **Prefetching**:  
  Preload the next page of repositories while scrolling.

- **Code splitting**:  
  Dynamically load components to reduce initial bundle size.

- **ESLint + Prettier**:  
  Enforce consistent code style for better collaboration.

- **Commit linting**:  
  Standardize commit messages for readable Git history.

- **Status indicators**:  
  Show loading/success/error states during data operations.

- **JSDoc comments**:  
  Improve readability and IDE support with function docs.

## Dev Notes

- Long-press is handled via a reusable directive applied with event delegation.
- Store logic is abstracted into a small composable for separation of concerns.
- Aliases simplify internal imports (`@/store`, `@/components`, etc.).
