# 🌟TuxData
TuxData is a comprehensive web application designed to help users explore, compare, and discover various Linux distributions. The application provides detailed and up-to-date informations, and insightful reviews to assist users in finding the perfect Linux distro for their needs. 
#### It leverages Angular for frontend development and integrates with a Spring Boot backend and PostgreSQL for data persistence.

## 📄 Features
User authentication and authorization
CRUD operations for Linux distributions
User comments on Linux distributions
Integration with PostgreSQL
Responsive design
RESTful API endpoints

## ⌛ Prerequisites
Node.js and npm
Angular CLI
Java 17 or higher (for backend)
Maven 3.6.0 or higher (for backend)
PostgreSQL


## 📄 Clone the Repository
For the Front-end:
- git clone https://github.com/BuBiNo-MoB/TuxDataF

For the Back-end:
- git clone https://github.com/BuBiNo-MoB/TuxDataB


## 📦 Install Dependencies
To install the necessary dependencies for the Angular frontend, run:

npm install

For the backend, navigate to the backend directory and use Maven to install dependencies


## ℹ️ Configure PostgreSQL
Create a database named tuxdatabase and configure your application.properties file in the backend with your PostgreSQL credentials.

```py
spring.datasource.url=jdbc:postgresql://localhost:5432/tuxdatabase
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
```


## 🚀 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 🏆 Contact
For any inquiries or questions, please contact emanuel.incarnato@gmail.com.
