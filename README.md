Features
CozyCombRestro is designed to provide a seamless experience for both administrators managing the restaurant and customers ordering food. Key features include:
Lazy-Loaded Modules: The application uses lazy loading for key components like admin, food, footer, header, home, login, and user to improve initial load times. This is implemented using the ng g m pages/food --route food --module app.module command.
Distinct User Roles: The application supports two main user roles:
Admin: Manages all aspects of the restaurant, including adding, updating, and deleting food items.
User: Customers can sign up, log in, browse food items, add items to a cart, place orders, and manage their password.
Authentication and Authorization:
Route Guards: We use separate route guards for admin and user to protect specific routes and ensure that only authorized users can access certain parts of the application. The guards were generated using ng g g auth.
HTTP Interceptors: Custom interceptors are implemented to handle API requests. The admininterceptor and userinterceptor manage logic for different user types, such as handling authentication tokens and logouts. These were created with commands like ng g interceptor auth/admininterceptor.
Food Management and Ordering:
Food Display: The Foods page displays all available food items.
CRUD Operations: After logging in, admins have full Create, Read, Update, and Delete (CRUD) capabilities for food items.
User Functionality: Logged-in users can add food to their cart and place orders.
Search Functionality: A custom pipe is used to enable real-time searching of food items, making it easy for users to find what they're looking for.
Service-Oriented Architecture: The application uses different services to manage API calls for specific functionalities, such as user, food, admin, and order APIs, promoting code reusability and maintainability.
Project Structure:
The project is structured to be scalable and maintainable, with a clear separation of concerns. The lazy-loaded modules reside in the pages directory, while services, guards, and interceptors are organized logically.
