# Todo Application

## Overview

This Todo application allows users to create, view, edit, and delete their tasks. It is built using React for the frontend and a simple backend to manage the todos. The application also includes a search functionality with debouncing to efficiently find todos based on their titles.  
The Backend is deployed on Render and frontend on Vercel.   
Checkout Live Link : https://helpister-assignment.vercel.app/
- **NOTE:** Backend on inactivity of more than 15min on Render takes usually 50sec to spin up again. So delay of 50 sec is possible.
## System Design

### Frontend

- **React**: The frontend is built using React, a JavaScript library for building user interfaces.
- **React Router**: Used for navigation between different pages (Home and Edit pages).
- **Axios**: Used for making HTTP requests to the backend server.
- **Debouncing**: Implemented in the search functionality to optimize performance by reducing the number of API calls.

### Backend

- **Simple REST API**: The backend provides endpoints to handle CRUD (Create, Read, Update, Delete) operations for the todos.
- **JSON Server**: Used as a mock backend server for quick setup and testing.

## Implementation

### Components

1. **App Component**
   - Manages the state of the todos and handles CRUD operations.
   - Uses `useEffect` to fetch todos from the backend on initial render.
   - Provides handlers for adding, deleting, and updating todos.

2. **Todo Component**
   - Displays the list of todos and includes a form to add new todos.
   - Passes handlers for delete and add operations to the child components.

3. **List Component**
   - Represents each todo item.
   - Provides buttons for marking a todo as done/not done and for removing a todo.

4. **Edit Component**
   - Allows users to edit the title and description of a todo.
   - Navigates back to the home page after updating a todo.

5. **Search Component**
   - Includes a search input with debouncing to filter the todos based on the title.
   - Displays the filtered todos in real-time as the user types.

## Setup and Running the Application

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine.

### Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd todo-app

 2. **Install Dependencies**
    ````bash
    cd backend
    npm install
    cd .. && cd frontend
    npm install
    
 3. **Start Backend**
    - **Note**: PORT 3000 is being used by default in backend , if PORT 3000 is already being used by some other service in local machine , you can change it to other PORT then.
    ````bash
    cd backend
    npm run dev
 5. **Start Frontend**
    ````bash
    cd frontend
    npm run dev
  6. **Access the application**: Open your browser and navigate to http://localhost:5173 to view the Todo application.

     ## Features
     - **Add Todo:** Add a new todo with a title and description. By default the completed status of Todo is set to false in backend.
     - **View Todos:** View a list of todos.
     - **Edit Todo:** Edit the title and description of an existing todo.
     - **Delete Todo:** Delete a todo from the list.
     - **Search Todos:** Search for todos by title with debouncing for optimized performance.
