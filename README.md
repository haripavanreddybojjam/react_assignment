# MERN E-Commerce Application

This is a simple e-commerce application built using the MERN stack (MongoDB, Express, React, and Node.js).

## Live Demo

Check out the deployed application here: http://3.15.24.186:5000

## Getting Started

### Prerequisites

To run this project locally, you need to have the following installed:

- Node.js (v14 or higher)
- MongoDB (MongoDB Atlas)
- Git (to clone the repository)

### Installation

#### 1. Clone the Repository

Clone the project from GitHub to your local machine:

```bash
git clone https://github.com/haripavanreddybojjam/react_assignment 
```

#### 2. Navigate to the Project Directory

```bash
cd react_assignment/server
```

#### 3. Install Dependencies

Install the server dependencies:

```bash
npm install
```

#### 4. Set Up Environment Variables

In the server folder, create a .env file and add the following environment variables:

```env
MONGODB_URI=<Your MongoDB URI>
PORT=5000
```

Replace `<Your MongoDB URI>` with the connection string for your MongoDB database (use MongoDB Atlas).

### Running the Application

To start the server and serve the application on http://localhost:5000:

```bash
npm start
```

The Express server will serve both the backend API and the React frontend (from the build folder), so the entire application will be available at http://localhost:5000.


### Technologies Used

- **MongoDB**: Database for storing products, cart, and wishlist data
- **Express.js**: Backend framework to handle API requests
- **React.js**: Frontend library to create the user interface
- **Node.js**: Runtime environment to run JavaScript on the server side
