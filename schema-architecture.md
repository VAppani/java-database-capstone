# Smart Clinic Management System: Architecture Design

## Architecture Summary
The Smart Clinic Management System is a full-stack web application built using Spring Boot, designed to streamline clinic operations by replacing outdated manual systems with an efficient online portal. It employs a three-tier architecture: the presentation tier uses Thymeleaf templates for admin and doctor dashboards and REST APIs for other modules like appointments and patient records; the application tier, powered by Spring Boot, handles business logic through controllers and services; and the data tier integrates MySQL for structured data (patients, doctors, appointments) and MongoDB for flexible prescription records. This architecture ensures scalability, maintainability, and secure data handling, with RESTful APIs enabling future integrations and Docker supporting cloud-native deployment.

## Numbered Flow of Data and Control
1. **User Interaction**: Users (admins, doctors, patients) access the system through Thymeleaf-based web dashboards (e.g., AdminDashboard, DoctorDashboard) for server-rendered HTML or via REST API clients (e.g., mobile apps) for JSON-based interactions like appointment scheduling.
2. **Request Routing to Controllers**: Requests are routed to Spring Boot controllers based on the URL and HTTP method. Thymeleaf controllers handle dashboard requests, returning HTML templates, while REST controllers process API requests, returning JSON responses.
3. **Service Layer Processing**: Controllers delegate business logic to the service layer, which applies rules, validates data, and coordinates workflows (e.g., checking doctor availability for appointments), ensuring a clean separation of concerns.
4. **Repository Layer Access**: The service layer interacts with repositories to perform data operations. MySQL repositories use Spring Data JPA for structured data (e.g., patients, appointments), while MongoDB repositories manage unstructured data (e.g., prescriptions).
5. **Database Interaction**: Repositories connect to MySQL for relational data with defined schemas or MongoDB for flexible, document-based data, retrieving or persisting information as needed.
6. **Model Binding**: Retrieved data is mapped to Java model classes—JPA entities for MySQL (annotated with `@Entity`) and document objects for MongoDB (annotated with `@Document`)—for consistent data handling across the application.
7. **Response Delivery**: For MVC flows, models are passed to Thymeleaf templates to render dynamic HTML for browsers. For REST flows, models or DTOs are serialized into JSON and sent to clients, completing the request-response cycle.

