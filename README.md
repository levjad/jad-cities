# Jad Cities Project

This project is a full-stack application built with Angular for the frontend and NestJS for the backend. It allows users to explore cities and their landmarks.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js:** (Recommended LTS version) [https://nosdejs.org/](https://nodejs.org/)
* **npm:** (Comes with Node.js)
* **Angular CLI:** (If you plan to work on the frontend) `npm install -g @angular/cli`
* **Nest CLI:** (If you plan to work on the backend) `npm install -g @nestjs/cli`
* **Chrome:** (If you want to start the frontend tests) [Chrome Download](https://www.google.com/intl/de_de/chrome/)

## Project Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/levjad/jad-cities.git
    cd jad-cities
    ```

2.  **Install Dependencies:**

    This project uses separate `package.json` files for the frontend and backend.

    * **Frontend Dependencies:**

        ```bash
        cd frontend
        npm install
        cd ..
        ```

    * **Backend Dependencies:**

        ```bash
        cd backend
        npm install
        cd ..
        ```

## Running the Application

Start Development Servers:

Open two separate terminal windows or tabs.

* **Frontend:**

    ```bash
    cd frontend
    npm start
    ```

    * This will start the Angular development server on a port (usually `http://localhost:4200/`).

* **Backend:**

    ```bash
    cd backend
    npm run start:dev
    ```

    * This will start the NestJS development server on another port (e.g., `http://localhost:3000/`).

2.  **Access the Application:**

    * Open your web browser and navigate to the URL where the Angular frontend is running (e.g., `http://localhost:4200/`).

## Building the Application

Build Frontend and Backend:

* **Frontend:**

    ```bash
    cd frontend
    npm run build
    cd ..
    ```

* **Backend:**

    ```bash
    cd backend
    npm run build
    cd ..
    ```

* This will create a `dist` folder in both the `frontend` and `backend` directories containing the production-ready build artifacts.

## Running Tests
Run All Tests:

* **Frontend:**

    ```bash
    cd frontend
    npm run test
    cd ..
    ```

* **Backend:**

    ```bash
    cd backend
    npm run test
    cd ..
    ```

  * This will execute the test suites in both the frontend and backend projects.
