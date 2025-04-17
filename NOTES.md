# NOTES.md

## Project Overview

This SPA, built with Vue 3, Pinia, Vite, and Octokit, displays Node.js repositories from GitHub. It uses endless scrolling with IntersectionObserver to load more repositories when nearing the end of the list. A long-click dialog lets users navigate to either the repository or owner page.



## Key Technologies

- **Vue 3**: Selected for its reactive data-binding and component-driven architecture, which is well-suited for building scalable single-page applications (SPAs).
- **Pinia**: Provides a streamlined state management solution with support for multiple stores.
- **Pinia Persist** ensures state is retained across sessions, though it may increase the bundle size due to the added persistence logic.
- **Octokit**: A specialized GitHub API client for fetching repositories, providing a clean interface for interacting with GitHub data.
- **IntersectionObserver**: Enhances performance by enabling lazy loading of content as the user scrolls near the bottom, minimizing unnecessary data fetching.
- **Vant**: A lightweight, customizable UI component library, offering a fast and minimal approach to adding common UI elements without significant overhead.

## Features

- **Repositories List**: Displays repository name, description, owner login, and background color based on `has_wiki`.
- **Pagination**: Loads 10 repositories at a time using GitHub's pagination.
- **Long Click Dialog**: Allows navigation to the repository or owner page.
- **Endless Scroll**: Uses IntersectionObserver to load more repositories when scrolling near the bottom.

## Testing

- **Vitest** is used to test:
  - Repositories are fetched correctly.
  - Pagination works as expected.
  - State is persisted using Pinia.

## Rate Limiting

- A personal access token is used for higher API limits.

## Bonus

- The repositories are restored on hard refresh thanks to **Pinia Persist**.

---

## Architectural Patterns Used:

1. **Component-Based Architecture**:
   - Modular components for maintainability and scalability (e.g., repository list, dialog, loading spinner).
2. **State Management (Pinia)**:
   - Centralized state for repositories, loading state, and pagination using Pinia.
   - **Pinia Persist** used to persist state in localStorage, ensuring data is retained across refreshes.
3. **API Layer / Service Pattern**:
   - API logic encapsulated in a service (via Octokit) to keep the app decoupled from API specifics.
4. **Observer Pattern**:
   - IntersectionObserver listens to scroll events to trigger the "load more" action for pagination.
5. **Event-Driven Architecture**:
   - Events like long-clicking trigger specific actions, such as showing the dialog for navigation.
6. **Error Handling and Notifications**:
   - Errors are handled within the API layer, with feedback provided to users via toasts or dialogs.
7. **Lazy Loading / Pagination**:
   - Lazy loading of data; only 10 repositories are fetched at a time to reduce initial load time.

---

## Suggestions for Improvement:

1. **Efficient Memory Management**:
   - When dealing with large data sets, consider optimizing V8's amortized doubling strategy. Instead of repeatedly pushing data into an array, I would prefer to manually manage array growth, potentially creating a new data structure optimized for my needs, for better control and performance.
2. **Caching**:
   - Implement IndexedDB for caching API responses to reduce unnecessary API calls.
2. **Token Security**:
   - Ensure the token is stored securely..
3. **Virtual Scrolling**:
   - Implement virtual scrolling to render only visible elements, improving performance.
4. **Prefetching**:
   - Preload the next set of repositories while the user scrolls through the current list for a seamless experience.
5. **Exponential Backoff**:
   - Use an exponential backoff strategy when retrying failed API requests to avoid server overload.
6. **Code Splitting**:
   - Implement **code splitting** and lazy load components to reduce the initial bundle size and speed up page load time.
7. **JS Comments**:
   - Add JSDoc comments to functions and methods for better documentation. This improves code readability, helps other developers understand your code, and provides better tooling support
8. **Eslint/Prettier**:
   - Configure ESLint and Prettier (using Biome or the Prettier plugin) to automatically enforce consistent code styles, such as indentation, spacing, and semicolons. This will ensure your codebase follows industry best practices, making it easier for teams to collaborate.
9. **Commit linting**:
   - Commit linting ensures that commit messages follow a consistent format, which can be enforced using tools like commitlint. This helps maintain a clear and understandable Git history.
10. **Displaying status**:
   - Displaying status (e.g., loading, success, failure) in your application provides feedback to users, improving the user experience (UX). This ensures that users are aware of the current state of an operation (like API requests or data processing)
