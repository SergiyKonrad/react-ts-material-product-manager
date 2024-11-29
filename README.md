# React TS Material Product Manager

A dynamic product management system built with React, TypeScript, Material UI, and Tailwind CSS. This project demonstrates CRUD functionality, API integration using Axios, and a responsive user interface with features like product addition, deletion, and editing.

Explore the full project at [React TS Material Product Manager](https://react-ts-material-product-manager.vercel.app/).

---

## Features

- **Dynamic Product Management**:
  - Add new products with validation for all fields.
  - Edit existing products with an intuitive modal window.
  - Delete products dynamically, with instant updates to the product list.
- **Responsive UI**: Fully responsive layout using Material UI and Tailwind CSS.
- **Tailwind CSS Integration**:
  - Tailwind CSS utilities are used alongside Material UI for flexible and efficient styling.
  - Enhanced modal designs, buttons, and layout components with Tailwind classes.
- **Axios Integration**: Seamless API calls for fetching, adding, editing, and deleting products.
- **Custom Hooks**:
  - `useProducts`: Fetches and caches product data for optimized performance.
  - `useAddProduct`: Handles API calls for adding products.
  - `useUpdateProduct`: Manages product updates via API.
  - `useDeleteProduct`: Handles API calls for deleting products.
- **Loader Component**: Displays a spinner during API interactions.
- **Error Handling**: Gracefully handles API failures with meaningful error messages.
- **Toasts for Notifications**: Provides feedback for actions like product addition, deletion, and editing.
- **Validation**: Implements robust client-side validation using Formik and Yup.
- **Backend Compatibility**: Frontend components prepared for integration with a backend API, supporting full CRUD operations.

## How It Works

### Components and Pages

#### **Pages**

- **`AddProductPage`**: Page for adding new products with a form.
- **`ProductPageMaterialUI`**: Displays the product list using Material UI cards.
- **`ProductsList`**: Lists all products with delete and edit options.

#### **Components**

- **`Loader`**: A reusable spinner for loading states.
- **`ToastMessage`**: Custom toast notifications with optional navigation support.
- **`EditProductModal`**: Modal window for editing products.
- **`Product`**: Renders individual product details.

#### **Custom Hooks**

- **`useProducts`**: Fetches and caches product data, supporting pagination and caching.
- **`useAddProduct`**: Adds new products via API calls.
- **`useUpdateProduct`**: Updates existing products with backend synchronization.
- **`useDeleteProduct`**: Deletes products with instant UI updates.

### API Integration

- Fetches product data from the backend and dynamically updates the UI.
- Adds, edits, and deletes products via Axios-powered API requests.
- Caches fetched products for optimized performance.

### User Experience

- **Notifications**:
  - Success and error notifications for product actions using `react-toastify`.
  - Intuitive navigation and validation messages ensure a smooth user experience.
- **Validation**:
  - Formik and Yup enforce strict data validation to ensure only valid data is submitted.

## Running the App

### Clone the repository:

```bash
git clone https://github.com/SergiyKonrad/react-ts-material-product-manager.git
```

Move to the project directory:

```bash
cd react-ts-material-product-manager

```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open http://localhost:3000 to view the app in the browser.

## Deployment

This project is deployed to Vercel at the following link:
[React TS Axios Project on Vercel](https://react-ts-material-product-manager.vercel.app/)

## Contributions

We welcome your contributions! Feel free to open an issue or submit a pull request to suggest improvements or add new features to this project. All ideas and enhancements are appreciated!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
