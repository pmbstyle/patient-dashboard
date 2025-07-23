# Patient Management Dashboard

This is a full-stack take-home project designed to showcase modern web development practices. It features a user-friendly dashboard for healthcare providers to manage critical patient data, built with a Vue3 frontend and a Node.js backend.

<img width="1238" height="806" alt="image" src="https://github.com/user-attachments/assets/3868e54d-50dd-4688-9e52-56c3c7690e27" />


---

## Features

*   **Patients List**: Paginated table view of all patients, sorted by last name and then first name.
*   **Create Patient**: Add new patients via a user-friendly modal form.
*   **View Patient**: View patient data.
*   **Edit Patient**: Modify existing patient information.
*   **Delete Patient**: Remove patients with a confirmation step to prevent accidental deletion.
*   **Form Validation**: Robust client-side validation for a smooth user experience.
*   **Dark Mode**: UI automatically adapts to the system's color theme.
*   **Data Seeding**: Backend automatically populates the database with 12 mock patients on first launch to demonstrate pagination.

---

## Technology Choices

*   **Frontend**: Vue3 with TypeScript
    *   **UI**: Tailwind CSS, shadcn-vue
    *   **State Management**: Pinia
    *   **Form Handling**: Vee-Validate and Yup

*   **Backend**: Node.js with Express and TypeScript
    *   **Database**: SQLite with the Sequelize ORM
    *   **Rationale for SQLite**: I chose SQLite to ensure a **zero-setup, frictionless experience** for anyone reviewing this project. It requires no external database server installation. The entire database is contained within a single `database.sqlite` file that is created automatically, allowing the reviewer to get the application running with just `npm install` and `npm start`

---

## Getting Started

### Prerequisites

You will need [Node.js](httpss://nodejs.org/en) (version 20.12 or newer recommended) installed on your system.

### Installation & Setup

This is a monorepo-style project with two main folders: `/frontend` and `/backend`. You will need to run the setup commands in both.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pmbstyle/patient-dashboard.git
    cd patient-dashboard
    ```

2.  **Set up the Backend:**
    Open a terminal and navigate to the `/backend` directory.

    ```bash
    cd backend

    # Install dependencies
    npm install

    # This will start the backend server on http://localhost:5001
    # It will also automatically create and seed the database.
    npm run dev
    ```
    The backend server will now be running.

3.  **Set up the Frontend:**
    Open a **new** terminal and navigate to the `/frontend` directory.

    ```bash
    cd frontend

    # Install dependencies
    npm install

    # This will start the frontend development server,
    # usually on http://localhost:5173
    npm run dev
    ```

4.  **View the Application:**
    Open your web browser and navigate to the address shown by the frontend's dev server (e.g., `http://localhost:5173`). You should see the Patient Dashboard populated with the seeded data.

---

## API Documentation

The backend exposes a simple RESTful API for managing patients.

**Base URL**: `http://localhost:5001/api/patients`

### Endpoints

| Method | Endpoint | Description | Request Body | Success Response |
| :--- | :--- | :--- |:--- | :--- |
| `GET` | `/` | Retrieve a list of all patients, sorted by last name and first name. | (none) | `200 OK` with an array of patient objects. |
| `POST`| `/` | Create a new patient. | Patient data object (excluding `id`). | `201 Created` with the newly created patient object. |
| `PUT` | `/:id`| Update an existing patient by their ID. | Patient data object with fields to update. | `200 OK` with the fully updated patient object. |
|`DELETE`| `/:id`| Delete a patient by their ID. | (none) | `204 No Content`. |

---

## Database Schema

The database uses a single table, `Patients`, managed by Sequelize.

| Column | Data Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | INTEGER | Primary Key, Auto-Increment |
| `firstName` | STRING | Not Null |
| `middleName`| STRING | Nullable |
| `lastName` | STRING | Not Null |
| `dateOfBirth`| DATEONLY | Not Null (Format: YYYY-MM-DD) |
| `status` | ENUM | Not Null. One of: 'Inquiry', 'Onboarding', 'Active', 'Churned' |
| `address` | JSON | Not Null. Stored as a JSON string: `{ "street": "...", "city": "...", "state": "...", "zipCode": "..." }` |
| `createdAt`| DATETIME | Automatically managed by Sequelize. |
| `updatedAt`| DATETIME | Automatically managed by Sequelize. |
