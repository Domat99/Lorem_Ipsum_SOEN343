# Project README: Lorem_Ipsum_SOEN343

## Delivery Web Application

### Team Name: Lorem Ipsum

### Team Members:
- Elias Hannoun (ID: 40246643)
- Domat AlKhoury (ID: 40246644)
- Caline Batal (ID: 40250222)
- Rawda Waez (ID: 40139173)
- Asif Khan (ID: 40211000)
- Hazem Mohamed (ID: 40184419)

### Repository: [REPOSITORY](https://github.com/Domat99/Lorem_Ipsum_SOEN343)

---

## Project Description:

A delivery website lets users easily schedule and track packages with clear pricing and secure payments. It offers 24/7 support and real-time updates of the status of each package.

---


## How to Run the Project:

To run the project locally, follow these steps:

### Prerequisites
Before running the project, ensure you have the following installed:
- **Java JDK 17**: Required for Spring Boot. Download and install from [Oracle JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or [OpenJDK](https://adoptopenjdk.net/).
- **Maven**: Necessary for building and running Spring Boot applications. Download and install Maven from [Apache Maven Project](https://maven.apache.org/download.cgi).
- **Node.js**: For running the Node.js parts of the project. Download and install Node.js from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Download MongoDB Compass GUI from [MongoDB's official website](https://www.mongodb.com/try/download/compass) for database setup. Please Enter the following URL to access the database: `mongodb+srv://domatalkhoury10:ZA5V2FkQIwGPrSET@lorem-ipsum-db.cozhn.mongodb.net/`.

### Steps to Run
1. **Clone the Repository**: 
```
git clone https://github.com/Domat99/Lorem_Ipsum_SOEN343.git
```
2. **Navigate to the Project Directory**: 
 ```
cd Lorem_Ipsum_SOEN343
 ```
3. **Install Node.js Dependencies**: Run this in the directory where `package.json` is located: 
 ```
npm install
 ```
4. **Run Maven Build**: This step is crucial for Spring Boot projects. In the root directory of the Spring Boot application (where the `pom.xml` file is located), execute: 
 ```
mvn clean install
 ```
If Maven is installed correctly, this command will download all the required dependencies specified in your `pom.xml` file and build your project.

5. **Set Up Your Database**: Ensure MongoDB is running and set up according to the provided schema. 

6. **Configure Environment Variables**: Set necessary environment variables, such as database connection strings.

7. **Run the Application**:
- For Spring Boot (Backend), execute:
  ```
  mvn spring-boot:run
  ```
- For Node.js (Frontend), in the directory containing the frontend code (this will also launch the website), execute:
  ```
  npm start
  ```

--- 
