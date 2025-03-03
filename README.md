# React ToDo List Monorepo

This repository contains a full-stack ToDo list application built with React (frontend) and Express.js (backend), managed as a monorepo using `npm workspaces`.

## Project Structure

```
react-todo-list-monorepo/
├── backend/        # Express.js backend
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/       # React frontend (Vite)
│   ├── src/
│   │   └── ...
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
├── package.json    # Root package.json for monorepo management
└── README.md
```

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd react-todo-list-monorepo
    ```

2.  **Install dependencies:**

    ```bash
    npm run install:all
    ```

    This command installs dependencies for both the frontend and backend using `npm workspaces`.

3.  **Run the development servers:**

    ```bash
    npm run dev
    ```

    This command starts both the React frontend and Express.js backend development servers concurrently using `concurrently`. The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:3001`.

## Available Scripts

The root `package.json` provides the following scripts:

* **`install:all`**: Installs dependencies for all workspaces (frontend and backend).
* **`build:frontend`**: Builds the React frontend.
* **`build:backend`**: Builds the Express.js backend.
* **`dev:frontend`**: Starts the React frontend development server.
* **`dev:backend`**: Starts the Express.js backend development server.
* **`start:backend`**: Starts the production Express.js backend server.
* **`dev`**: Starts both frontend and backend development servers concurrently.
* **`build`**: Builds both the frontend and backend.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will build both the frontend and backend. You can then deploy the `frontend/dist` and `backend/dist` directories to your respective hosting environments.

## Backend API Documentation

See the `backend/README.md` file for detailed information about the backend API endpoints.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.
