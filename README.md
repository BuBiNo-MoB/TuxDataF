TuxData
TuxData is a comprehensive web application designed to help users explore, compare, and discover various Linux distributions. The application provides detailed information, up-to-date news, and insightful reviews to assist users in finding the perfect Linux distro for their needs. It leverages Angular for frontend development and integrates with a Spring Boot backend and PostgreSQL for data persistence.

🌟 Features
User authentication and authorization
CRUD operations for Linux distributions
User comments on Linux distributions
Integration with PostgreSQL
Responsive design
RESTful API endpoints
⌛ Prerequisites
Node.js and npm
Angular CLI
Java 17 or higher (for backend)
Maven 3.6.0 or higher (for backend)
PostgreSQL


📄 Clone the Repository
bash
Copia codice
git clone https://github.com/BuBiNo-MoB/TuxDataFrontEnd
cd tuxdata
📦 Install Dependencies
To install the necessary dependencies for the Angular frontend, run:

bash
Copia codice
npm install
For the backend, navigate to the backend directory and use Maven to install dependencies:

bash
Copia codice
cd backend
mvn install
ℹ️ Configure PostgreSQL
Create a database named tuxdatabase and configure your application.properties file in the backend with your PostgreSQL credentials.

properties
Copia codice
spring.datasource.url=jdbc:postgresql://localhost:5432/tuxdatabase
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update


🚀 Running the Application
To run the Angular frontend:

bash
Copia codice
ng serve
Navigate to http://localhost:4200/ in your web browser to see the application in action.

To run the Spring Boot backend, navigate to the backend directory and use Maven:

bash
Copia codice
cd backend
mvn spring-boot:run


Main Components
HeaderComponent: Manages the top navigation bar.
FooterComponent: Manages the footer content.
HomeComponent: Displays the homepage with a carousel of distributions and a welcome message.
ProfileComponent: Displays user profile information and allows editing.
ResultsPageComponent: Displays search results.
DistributionListComponent: Lists all distributions with sorting options.
EditDistributionComponent: Admin interface for editing distribution details.
Services
AuthService: Manages user authentication and authorization.
DistributionService: Handles CRUD operations for distributions.
UserService: Manages user data and operations.


🚀 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

🏆 Contact
For any inquiries or questions, please contact emanuel.incarnato@gmail.com.
