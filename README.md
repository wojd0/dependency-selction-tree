# Dependency Management UI

This is a Next.js application that demonstrates a dependency management UI. It allows users to select items from a list and automatically handles the selection of their dependencies based on configurable rules.

## Features

- **Dependency Management**: Automatically select or highlight dependencies when an item is selected.
- **Switchable Rules**:
    - **Force**: Prevents users from deselecting items that are dependencies of other selected items.
    - **Warn**: Allows deselection but visually indicates that a required dependency is missing.
- **Tree View**: Items are organized in a collapsible tree structure by category.
- **Select/Deselect All**: Checkboxes for selecting or deselecting all items at once, or all items within a category.
- **Indeterminate State**: Checkboxes correctly reflect when only some of a category's items are selected.
- **Expand/Collapse All**: Easily expand or collapse all categories in the tree.
- **Multiple Datasets**: The UI can be used with different data sets. The application includes two examples:
    - **Smart Pantry**: Manage recipes and their ingredients/utensils.
    - **Expense Management**: A more complex example modeling dependencies in a process automation project.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)

This project was built with Firebase Studio. To get started exploring the code, take a look at `src/app/page.tsx`.