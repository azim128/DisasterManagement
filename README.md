# Crisis Management System Documentation

## Project Overview

This project is a Crisis Management System with separate frontend and backend components. The system appears to handle various aspects of crisis management, including volunteer management, inventory control, donations, and crisis reporting.

# Project Documentation

This document provides instructions on how to set up and run the full project, including both the backend and frontend components. It also includes information about the deployed version of the project.

## Deployed Project

The project is already deployed and accessible online:

- Frontend: [https://disaster-management-iota.vercel.app/](https://disaster-management-iota.vercel.app/)
- Backend: [https://disastermanagement-jpv8.onrender.com/](https://disastermanagement-jpv8.onrender.com/)
- Backend Health Check: [https://disastermanagement-jpv8.onrender.com/health](https://disastermanagement-jpv8.onrender.com/health)
- API Documentation: [https://documenter.getpostman.com/view/31589139/2sAXqv3zxQ](https://documenter.getpostman.com/view/31589139/2sAXqv3zxQ)

You can access the live application using these URLs. For detailed information about the API endpoints and how to use them, please refer to the API documentation link provided above.


## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)
- Git (for cloning the repository)

## Environment Variables

**Important Note:** The `.env` files for both the backend and frontend are already available in their respective project folders. No additional setup for environment variables is required.

**.env file push only for this project**

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd main/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - The project uses Prisma as an ORM. The database connection string is already configured in the existing `.env` file.
   - Run Prisma migrations:
     ```
     npx prisma migrate dev
     ```

4. Start the backend server:
   - For development:
     ```
     npm run dev
     ```
   - For production:
     ```
     npm start
     ```

The backend server should now be running on the port specified in the `.env` file.

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd main/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

The frontend development server should now be running on `http://localhost:5173` (Vite's default port).

4. To build the frontend for production:
   ```
   npm run build
   ```

5. To preview the production build:
   ```
   npm run preview
   ```

## Running the Full Project

1. Start the backend server (from the `backend` directory):
   ```
   npm run dev
   ```

2. In a separate terminal, start the frontend development server (from the `frontend` directory):
   ```
   npm run dev
   ```

3. Access the application by opening a web browser and navigating to `http://localhost:5173` (or whichever port your frontend is running on).

## Additional Notes

- The backend uses Express.js as the web framework and Prisma as the ORM.
- The frontend is built with React and uses Vite as the build tool.
- Chakra UI is used for the frontend component library.
- All required environment variables are already set in the `.env` files in their respective project folders.
- For production deployment, consider using process managers like PM2 for the backend and serving the frontend build using a static file server or CDN.

## Troubleshooting

- If you encounter any issues with Prisma, try running `npx prisma generate` to regenerate the Prisma client.
- Make sure your Node.js version is compatible with the project requirements.
- Check that all required ports are free and not being used by other applications.

For any other issues or questions, please refer to the project's issue tracker or contact the project maintainers.


## Project Structure

The project is divided into two main parts: `backend` and `frontend`.


```
task
├─ .git
├─ .gitignore
├─ .vscode
├─ README.md
├─ backend
│  ├─ config
│  │  ├─ database.config.js
│  │  └─ variable.config.js
│  ├─ controllers
│  │  ├─ admin
│  │  │  ├─ adminUserManagement.controller.js
│  │  │  ├─ crisisManagement.controller.js
│  │  │  ├─ index.js
│  │  │  └─ inventoryMangement.controllers.js
│  │  ├─ auth.controller.js
│  │  ├─ crisis.controller.js
│  │  ├─ donation.controller.js
│  │  ├─ inventory.controller.js
│  │  ├─ purchase.controller.js
│  │  ├─ user.controller.js
│  │  └─ volunteer
│  │     └─ volunteer.controller.js
│  ├─ lib
│  │  └─ prisma.js
│  ├─ main.js
│  ├─ middleware
│  │  └─ authenticate.middleware.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma
│  │  └─ schema.prisma
│  ├─ routes
│  │  ├─ admin.routers.js
│  │  ├─ auth.routers.js
│  │  ├─ crisis.routers.js
│  │  ├─ donation.routers.js
│  │  ├─ index.js
│  │  ├─ inventory.routers.js
│  │  ├─ purchase.routers.js
│  │  ├─ user.routers.js
│  │  └─ volunteer.routers.js
│  └─ utils
│     ├─ enums.js
│     ├─ jwt.utils.js
│     ├─ password.utils.js
│     └─ responses.utils.js
└─ frontend
   ├─ .gitignore
   ├─ README.md
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.js
   ├─ public
   │  └─ vite.svg
   ├─ src
   │  ├─ App.jsx
   │  ├─ Layout/
   │  │  ├─  DashboardLayout.jsx
   │  │  ├─ Layout.jsx
   │  │  └─ PublicLayout.jsx
   │  ├─ assets/
   │  ├─ components/
   │  │  ├─ ContactItem.jsx
   │  │  ├─ CreateCrisis.jsx
   │  │  ├─ CrisisListComponent.jsx
   │  │  ├─ DonationForm.jsx
   │  │  ├─ DonationsExpensesChart.jsx
   │  │  ├─ FeatureItem.jsx
   │  │  ├─ Footer.jsx
   │  │  ├─ FullScreenLoading.jsx
   │  │  ├─ Header.jsx
   │  │  ├─ InventoryList.jsx
   │  │  ├─ LoginForm.jsx
   │  │  ├─ PurchaseHistory.jsx
   │  │  ├─ RegisterForm.jsx
   │  │  ├─ TotalDonationsExpenses.jsx
   │  │  ├─ VolunteerListComponent.jsx
   │  │  ├─ admin
   │  │  │  ├─ AddInventoryItem.jsx
   │  │  │  ├─ AdminInventoryList.jsx
   │  │  │  ├─ AssignTaskToVolunteer.jsx
   │  │  │  ├─ CrisisTable.jsx
   │  │  │  └─ VolunteersTable.jsx
   │  │  ├─ reports
   │  │  │  └─ ReportDownload.jsx
   │  │  └─ ui
   │  │     ├─ Button.jsx
   │  │     ├─ Input.jsx
   │  │     ├─ Label.jsx
   │  │     ├─ Modal.jsx
   │  │     ├─ SkeletonLoader.jsx
   │  │     ├─ card.jsx
   │  │     └─ select.jsx
   │  ├─ config
   │  │  └─ variables.js
   │  ├─ context
   │  │  └─ AuthContext.jsx
   │  ├─ hooks
   │  │  ├─ useDonation.jsx
   │  │  ├─ useFetchData.jsx
   │  │  ├─ useRegister.jsx
   │  │  └─ useVolunteers.jsx
   │  ├─ index.css
   │  ├─ main.jsx
   │  ├─ pages
   │  │  ├─ Admin
   │  │  │  ├─ AdminDashboardPage.jsx
   │  │  │  ├─ AssignTaskPage.jsx
   │  │  │  ├─ CrisesManagementPage.jsx
   │  │  │  ├─ FeedBacksPage.jsx
   │  │  │  ├─ InventoryManagementPage.jsx
   │  │  │  ├─ ReportsManagementPage.jsx
   │  │  │  ├─ SettingPage.jsx
   │  │  │  └─ VolunteersManagementPage.jsx
   │  │  ├─ Auth
   │  │  │  ├─ LoginPage.jsx
   │  │  │  ├─ ProfilePage.jsx
   │  │  │  └─ RegisterPage.jsx
   │  │  ├─ Public
   │  │  │  ├─ AboutPage.jsx
   │  │  │  ├─ ContactPage.jsx
   │  │  │  ├─ CrisisPage.jsx
   │  │  │  ├─ DonationPage.jsx
   │  │  │  ├─ HomePage.jsx
   │  │  │  ├─ NotAuthorized.jsx
   │  │  │  ├─ NotFoundPage.jsx
   │  │  │  └─ VolunteerPage.jsx
   │  │  ├─ Volunteer
   │  │  │  ├─ PurchaseHistoryPage.jsx
   │  │  │  ├─ StocksPage.jsx
   │  │  │  └─ VolunteerPage.jsx
   │  │  └─ common
   │  │     └─ InventoryPage.jsx
   │  ├─ reducer
   │  │  └─ authReducer.js
   │  ├─ routes
   │  │  └─ ProtectedRoute.jsx
   │  └─ utils
   │     ├─ enums.js
   │     └─ toNormalcase.js
   ├─ tailwind.config.js
   ├─ vercel.json
   └─ vite.config.js

```


### Backend

The backend is built using Node.js and uses Prisma as an ORM. It follows a typical MVC structure.

Key components:
- `config`: Contains configuration files for the database and environment variables.
- `controllers`: Handles the business logic for different aspects of the system (admin, auth, crisis, donation, inventory, purchase, user, volunteer).
- `lib`: Contains the Prisma client initialization.
- `middleware`: Includes authentication middleware.
- `prisma`: Contains the Prisma schema for database modeling.
- `routes`: Defines the API routes for different functionalities.
- `utils`: Includes utility functions for JWT, password hashing, and response formatting.

### Frontend

The frontend is built using React and Vite. It uses React Router for routing and appears to use Tailwind CSS for styling.

Key components:
- `Layout`: Contains layout components for different parts of the application.
- `components`: Reusable React components, including UI components and feature-specific components.
- `context`: Includes the AuthContext for managing authentication state.
- `hooks`: Custom React hooks for various functionalities.
- `pages`: React components representing different pages of the application.
- `routes`: Contains the ProtectedRoute component for role-based access control.
- `utils`: Utility functions for the frontend.

## Main Features

1. **User Authentication**: The system supports user registration, login, and role-based access control (Admin and Volunteer roles).

2. **Crisis Management**: Admins can create and manage crisis events.

3. **Volunteer Management**: Admins can manage volunteers, assign tasks, and view volunteer information.

4. **Inventory Management**: The system tracks inventory items, allowing for stock management and purchase history.

5. **Donation System**: Users can make donations, which are tracked and reported.

6. **Reporting**: The system generates reports on donation and expenses on daily basis

7. **Public Information**: Public pages provide information about crises, volunteering opportunities, and ways to donate.



## API Routes

The backend includes the following main route groups:
- Admin routes
- Authentication routes
- Crisis routes
- Donation routes
- Inventory routes
- Purchase routes
- User routes
- Volunteer routes

## Frontend Routes

The frontend uses React Router and includes the following main route groups:
- Public routes (home, about, contact, login, register, etc.)
- Admin routes (dashboard, volunteer management, reports, crises, inventory)
- Volunteer routes (stocks, purchase history)
- Shared routes (inventory, account)

## Security

The system implements role-based access control using protected routes. It also uses JWT for authentication.

## Technologies Used

- Backend: Node.js, Express.js, Prisma
- Frontend: React, Vite, React Router Dom, Tailwind CSS
- Authentication: JWT
- Database: Postgress



## Limitations and Pending Features

1. **Notifications**: The system does not currently use email for notifications.
2. **Password Management**: Password update functionality is not implemented.
3. **Google Login**: Not currently implemented.
4. **Payment Gateway**: Not currently integrated.
5. **Relief Type Management**: Not fully implemented in inventory management.



## Future Improvements

1. Implement email notifications for important system events.
2. Complete the implementation of relief type management in the inventory system.
3. Add password update functionality for users.
4. Integrate Google login for easier authentication.
5. Implement a payment gateway for processing donations.
6. Enhance the inventory management system to fully support both relief and expense type goods.
7. Improve reporting capabilities, possibly including data visualization.
8. Implement real-time updates for crisis information using WebSockets.

## Known Issues

- The inventory management system does not fully distinguish between relief and expense type goods.
- Users cannot update their passwords through the system interface.
- The donation system lacks integration with a payment processor.







