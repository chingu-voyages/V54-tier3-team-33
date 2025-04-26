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

**Logic:**

- Redux is used to manage the state of products, categories, user authentication, and the shopping cart.

- Actions such as setCategory, setSearchQuery, and loadProducts are dispatched to update the state.

- The app uses fetch to make calls to the backend API for operations like fetching products, submitting orders, and user authentication.

- The app uses dynamic query parameter **useSearchParams** to manage query parameters for filters, search, and pagination.

- Components like OrderHistory and Grid display error messages if API calls fail.

---

## Technologies & Dependencies used

- **React:** for all the logic, many React features were used: conditionals, components, useState, useEffect, functions...

- **Redux Toolkit:** for global state management.

- **React Router:** for all routing needs.

- **Tailwind:** for all styling, dark mode, custom classes...

- **Typescript** for making sure we have no errors and bugs in development

**dependencies:**

- @headlessui/react": "^2.2.0",
- @heroicons/react": "^2.2.0",
- @reduxjs/toolkit": "^2.6.1",
- @tailwindcss/vite": "^4.0.17",
- framer-motion": "^12.9.1",
- react": "^19.0.0",
- react-dom": "^19.0.0",
- react-hot-toast": "^2.5.2",
- react-icons": "^5.5.0",
- react-redux": "^9.2.0",
- react-router-dom": "^7.3.0",
- tailwindcss": "^4.0.17"

**devDependencies:**

- @eslint/js": "^9.21.0",
- @types/react": "^19.0.10",
- @types/react-dom": "^19.0.4",
- @vitejs/plugin-react": "^4.3.4",
- eslint": "^9.21.0",
- eslint-plugin-react-hooks": "^5.1.0",
- eslint-plugin-react-refresh": "^0.4.19",
- globals": "^15.15.0",
- prettier": "^3.5.3",
- prettier-plugin-tailwindcss": "^0.6.11",
- typescript": "~5.7.2",
- typescript-eslint": "^8.24.1",
- vite": "^6.2.0"

---

## Prerequisites

Ensure you have the following installed on your system:

    Node.js v18.00.0
    npm or yarn

---

## Clone & Run locally

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

### Special Thanks

We as a whole team would like to thank Chingu platform and community for this opportunity to learn, improve and collaborate. Thank you Chingu !

Chingu is a platform that helps developers and other people in tech related roles practice in-demand skills and accelerate their learning through collaboration and project-building.

Learn more about Chingu platform at https://www.chingu.io/

---

## Contributing

Contributions to this project are closed.

---
