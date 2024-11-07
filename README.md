# Project Manager

## Description

The **Project Manager** is a web application that allows users to view, add, edit, remove, and favorite projects. The app uses Firebase Firestore as a backend and provides an interactive frontend interface.

## Installation

To set up the project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ssp1999/project-manager
    ```

2. **Navigate to the project directory:**

    ```bash
    cd project-manager
    ```

3. **Install project dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root of your project based on the `.env.example` template provided in the repository. Add your Firebase configuration details:
    Replace `your_api_key`, `your_auth_domain`, etc., with the actual configuration values from your Firebase project.

5. **Build the project for production:**

    ```bash
    npm run build
    ```

6. **Run the project in preview mode:**

    ```bash
    npm run preview
    ```

## Running the Project

After setup, you can access the application in your browser at:

[http://localhost:3000/project-manager/](http://localhost:3000/project-manager/)