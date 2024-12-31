# React TS Material Product Manager

A dynamic product management system built with **React**, **TypeScript**, **Material UI**, and **Tailwind CSS**. This project demonstrates full **CRUD functionality**, seamless **API integration** using Axios, and a responsive user interface with features for product addition, deletion, and editing.

Explore the full project at [React TS Material Product Manager](https://react-ts-material-product-manager.vercel.app/).

---

## 🚀 Features

-   **Backend Compatibility**: Fully compatible with a backend API for CRUD functionality.
-   **Automatic Navigation**: Seamlessly redirects users to relevant pages after actions like editing products.
-   **Dynamic Product Management**:
    -   Add products with comprehensive form validation.
    -   Edit existing products via an intuitive modal window.
    -   Delete products dynamically with real-time updates.
-   **Responsive Design**: Built using **Material UI** and **Tailwind CSS** for an adaptive and visually appealing layout.
-   **Axios Integration**: Reliable and efficient API calls for CRUD operations.
-   **Custom Hooks**:
    -   `useProducts`: Fetch and cache product data for performance.
    -   `useAddProduct`: API logic for adding products.
    -   `useUpdateProduct`: Handles product updates with error handling.
    -   `useDeleteProduct`: Manages product deletion requests.
-   **User Notifications**: Feedback for actions like adding, deleting, or editing products using `react-toastify`.
-   **Error Handling**: Clear error messages for failed API interactions with contextual feedback.
-   **Loader Component**: Displays a spinner for better UX during API calls.
-   **Client-Side Validation**: Ensures data integrity with **Formik** and **Yup**.

## How It Works

### **Pages**

-   **`AddProductPage`**: Form-based page to add new products.
-   **`ProductPageMaterialUI`**: Renders products as Material UI cards.
-   **`ProductsList`**: Displays a paginated list of products with options to edit or delete.

### **Components**

-   **`Loader`**: A reusable spinner for loading states.
-   **`EditProductModal`**: Modal window for editing products with automatic navigation.
-   **`Product`**: Displays individual product information.

### **Custom Hooks**

-   **`useProducts`**: Fetches and caches product data, supporting pagination and caching.
-   **`useAddProduct`**: Adds new products via API calls.
-   **`useUpdateProduct`**: Updates existing products with backend synchronization and error handling.
-   **`useDeleteProduct`**: Deletes products with instant UI updates.

### API Integration

-   Fetches product data from the backend dynamically.
-   Supports pagination with optimized caching for performance.
-   Sends requests for adding, editing, and deleting products using Axios.

### User Experience

-   **Notifications**:
    -   Displays success or error messages for all major actions.
    -   Guides users with intuitive validation feedback.
-   **Validation**:
    -   Strict client-side validation ensures only valid data is sent to the backend.

## Running the App

### Clone the repository:

```
git clone https://github.com/SergiyKonrad/react-ts-material-product-manager.git
```

Move to the project directory:

```
cd react-ts-material-product-manager

```

Install the dependencies:

```
npm install
```

Start the development server:

```
npm start
```

Open http://localhost:3000 to view the app in the browser.

## Deployment

This project is deployed to Vercel at the following link:
[React TS Axios Project on Vercel](https://react-ts-material-product-manager.vercel.app/)

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request to suggest improvements or add new features to this project. All ideas and enhancements are appreciated!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
