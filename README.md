# Ebuy - Full stack app

# 🔗 [Live preview](https://ebuy.fly.dev/)

# ▶️ [Video walkthrough by dev](https://youtu.be/hCyIC1Irsio)

![Design preview](./frontend/src/assets/preview.png)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [How it works](#how-it-works)
- [Technologies & Dependencies used](#technologies--dependencies-used)
- [Prerequisites](#prerequisites)
- [Clone & Run locally](#clone--run-locally)
- [Deploy the Project to Fly.io](#deploying-with-flyio)
- [Team](#team)
- [Special Thanks](#special-thanks)
- [Contributing](#contributing)

---

## About

**Ebuy** is a **full-stack** application, scaled down clone of Ebay. We successfully completed this project by following the Agile framework, focusing on team communication, task management, and planning ahead. Frontend and Backend teams worked closely together, collaborating throughout the project to bring the idea to life.

---

## Features

- **Product Browsing:** Users can browse through a wide range of products displayed in a grid layout and apply different display criteria (filter, sort etc).

- **Category Filtering:** Products can be filtered by categories such as Electronics, Clothes, and Music.

- **Search Functionality:** Users can search for specific products using a search bar.

- **Pagination:** Products are displayed in paginated views, allowing users to navigate through multiple pages of items.

- **Shopping Cart:** Users can add products to their cart, adjust quantities, and remove items.

- **Order History:** Logged-in users can view their past orders on their profile page, with the latest order highlighted.

- **User Authentication:** Users can sign in, register, and log out securely.

- **Responsive Design:** The app is fully responsive and works seamlessly on desktops, tablets, and mobile devices.

---

## How it works

**Technical Overview:**

- Frontend Framework: The app is built using React with TypeScript for type safety and maintainability.

- State Management: Redux is used for global state management, ensuring consistent state across components.

- Routing: React Router is used for navigation between pages such as Home, Profile, and Checkout.

- API Integration: The app communicates with a backend API to fetch products, handle user authentication, and manage orders.

- Styling: Tailwind CSS is used for styling

- Backend Framework: The backend is built with Express.js and uses MongoDB (via Mongoose) for database interactions.

- Authentication: JSON Web Tokens (JWT) and bcrypt are used to securely register and log in users.

- Environment Configuration: dotenv is used to manage environment variables (e.g., database URI, secret keys).

- CORS & Cookies: Configured using cors and cookie-parser to support secure frontend-backend communication.

- Deployment: Both frontend and backend are deployed together on Fly.io with a build script that packages the frontend UI into the backend before deployment.

**Logic:**

- Redux is used to manage the state of products, categories, user authentication, and the shopping cart.

- Actions such as setCategory, setSearchQuery, and loadProducts are dispatched to update the state.

- The app uses fetch to make calls to the backend API for operations like fetching products, submitting orders, and user authentication.
- Backend Routes: The backend exposes RESTful endpoints for /api/products, /api/users, and /api/orders, with middleware for authentication and error handling.
- The app uses dynamic query parameter **useSearchParams** to manage query parameters for filters, search, and pagination.

- Components like OrderHistory and Grid display error messages if API calls fail.

---

## Technologies & Dependencies used
### Frontend:
- **React:** for all the logic, many React features were used: conditionals, components, useState, useEffect, functions...

- **Redux Toolkit:** for global state management.

- **React Router:** for all routing needs.

- **Tailwind:** for all styling, dark mode, custom classes.

- **Typescript** for making sure we have no errors and bugs in development

### Backend:
- **Express**: Core Node.js web framework used to build the RESTful API.

- **MongoDB** & **Mongoose**: For data storage and modeling of users, products, and orders.

- **JWT** & **bcrypt**: For secure authentication and password hashing.

- **morgan**: For logging HTTP requests during development.

---

## Prerequisites

Ensure you have the following installed on your system:

    Node.js v18.00.0
    npm or yarn

---

## Clone & Run locally
To be able to run the project you will need to create a `.env` file which contain the following 2 variables:
- `JWT_STRONG_SECRET`, the secret used to generate JWT tokens
- `MONGODB_URI`, the connection string of your MongoDB database

To be able to run tests you also want to define `TEST_MONGODB_URI` with the connections tring of your MongoDB test database
1. **Clone the Repository:**

   - On the GitHub repo page, click the green "Code" button.

   - Copy the HTTPS URL.

2. **Open the Terminal:**

   - Open the terminal by typing "cmd" in your desktop's start menu, **OR**

   - Right-click on the desktop and select "Git Bash Here" (if you have Git Bash installed), **OR**

   - Open Visual Studio Code's terminal by clicking "Terminal" -> "New Terminal" inside the editor.

3. **Navigate to Your Project Location:**

   - In the terminal, navigate to your desired location (e.g., desktop) using the command: `cd desktop`.

4. **Clone the Repository:**

   - Run the command: `git clone /link/`. Replace `/link/` with the HTTPS URL from step 1.

5. **Enter the Project Directory:**

   - Navigate into the cloned repository by using command `cd V54-tier3-team-33` or whatever the cloned folder's name is. Then command `cd frontend`. You are now inside frontend folder. You also need to open a second terminal in the same location and do the same for backend folder, meaning `cd backend`. You now have two terminals, one in frontend and one in backend.

6. **Install Dependencies:**

   - Run the command: `npm i` in both terminals to install all the necessary dependencies.

7. **Start the Project:**

   - Run the command: `npm run dev` in the frontend terminal and `npm run dev` in the backend terminal as well. You have now started the frontend side of the project and the backend side. You will need to manually open the browser address at [localhost:5173/](http://localhost:5173/)

---
 ## Deploying with Fly.io
 After installing the dependencies in the previous section you can deploy the ap using [Fly.io](https://fly.io/) with the following steps:

1. **Sign Up or Log In to Fly.io**:
   - Run the command `flyctl auth login` and login to your Fly.io account
2. **Navigate to the Backend Folder**:
   - In your terminal, make sure you're inside the backend folder of the project. If not, use: `cd backend`
3. **Initialize Fly Project**:
   - Run the command: `flyctl launch` . When prompted pick a unique app name, a region close to your name and select No when asking to create a Postgres database
4. **Set Environment Variables (Secrets)**:
   - Run the following command in the backend terminal (replace the values with your own): `flyctl secrets set MONGO_URI=your_mongodb_uri JWT_SECRET=your_jwt_secret
5. **Build the Frontend into the Backend**:
   - Run the following command in the backend folder to bundle the frontend and copy it into the backend `dist` folder: `npm run build:ui`
6. **Deploy to Fly.io**:
   - Run the final deploy command: `flyctl deploy`
## Team

Voyage 54 - Team 33. March 2025 - May 2025. (8 weeks)

- Damilola Oshinowo: [GitHub](https://github.com/dami-boy) / [LinkedIn](https://linkedin.com/in/damilola-oshinowo)
- Chinedu Olekah: [GitHub](https://github.com/kenako0127) / [LinkedIn](www.linkedin.com/in/chinedu-olekah)
- Tonia Gbuji: [GitHub](https://github.com/Tgee78) / [LinkedIn](https://www.linkedin.com/in/toniagbuji/)
- Ismail Marghich: [GitHub](https://github.com/IsmailMarghich) / [LinkedIn](https://www.linkedin.com/in/ismail-marghich-9174111aa/)
- Riry Nomenjanahary: [GitHub](https://github.com/TiaDev7474) / [LinkedIn](https://www.linkedin.com/in/riry-nomenjanahary/)
- R. Ed Masawi: [GitHub](https://github.com/Masawi68) / [LinkedIn](https://www.linkedin.com/in/ed-masawi-97345a29/)
- Predrag Jandric: [GitHub](https://github.com/Predrag-Jandric) / [LinkedIn](https://www.linkedin.com/in/predrag-jandric/)
- Andrés R. Bucheli: [GitHub](https://github.com/ARBUCHELI) / [LinkedIn](https://www.linkedin.com/in/andresregaladobucheli/)

### Roles and Responsibilities

- Damilola Oshinowo **(Scrum Master)** made sure all meetings were productive and scheduled at times that worked best for everyone. He kept the team communicating, made sure daily stand-ups were posted, and helped solve any issues that came up.

- Chinedu Olekah **(Product Owner)** was responsible for creating an extensive document that outlined all the features for each product iteration (MVP). He kept it updated by tracking which features were completed and which ones were still pending.

- Tonia Gbuji **(Shadow Product Owner)** played a supportive role to the main product owner. She used this voyage as a big learning experience, getting hands-on insight into how real development teams are managed.

- Ismail Marghich **(Backend Developer)** worked on key backend features, set up and managed the Mongo database, fixed bugs, and helped the team move forward by doing a lot of pair programming sessions with other developers. He was also responsible for deploying the app live.

- Riry Nomenjanahary **(Backend Developer)** built the authentication system, making it possible for users to create an account, sign in, and log out. He also fixed bugs, worked on other backend features, and did pair programming.

- R. Ed Masawi **(Backend Developer)** contributed to a few backend features and joined pair programming sessions to help push the project forward.

- Predrag Jandric **(Frontend Developer)** worked mainly on the frontend logic and styling, and also did a lot of pair programming with other developers. His idea for the app was the one selected — which is why we ended up building this project!

- Andrés R. Bucheli **(Frontend Developer)** decided to leave the team early on, but he still helped out during the initial stages by contributing to the frontend setup and some early stage components.

---

## Special Thanks

We as a whole team would like to thank Chingu platform and community for this opportunity to learn, improve and collaborate. Thank you Chingu !

Chingu is a platform that helps developers and other people in tech related roles practice in-demand skills and accelerate their learning through collaboration and project-building.

Learn more about Chingu platform at https://www.chingu.io/

---

## Contributing

Contributions to this project are closed.

---
