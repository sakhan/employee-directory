# README #

Feature's implemented:

* Employee directory searchable by first name and last name (auto loaded at startup time)
* Ability to view a paginated listing of all employees
* Application is secured by username/password login in order to view/edit any data
* Role based authorization i.e. only HR role has authority to add/edit/delete employees 

### Technology Stack ###

Back-end is a CORS enabled Hypermedia-Driven RESTful Web Service secured by Spring Security. Persistence layer is auto generated via Spring Data JPA hitting an in-memory H2 database, which is populated with some seed data at startup. Front-end is a AngularJS based semi-SPA webapp that consumes the REST service.

Here is a listing of the technology stack:

* Spring Boot micro-service (embedded Tomcat)
* In memory H2 database
* Spring Data JPA (Hibernate)
* Spring Security
* Spring MVC
* Java 8
* AngularJS

### How do I get set up? ###

* Development Environment: This is a standard Maven based project, and all Eclipse related project files are checked-in. This means all you have to do is import the project into Eclipse as a maven project and your set.

* Running the app: There are 3 ways you can run the application. From Eclipse run the Application.java file as a standalone Java program and your in business. In order to execute the application outside of Eclipse you can either build the JAR as an executable `mvn clean package` then type `java -jar target\emp-reg-0.1.0.jar`. Or you can also run directly via maven `mvn spring-boot:run`

* Configuration: No special configuration is needed

* Login Info: 

1. Standard user account login info is user/user. 
2. HR user account login is admin/admin

### Areas of Improvements ###

* Currently there is absolutely no UI styling, this is intentional as I want to configure twitter-bootstrap.
* There are only two login accounts that are hard coded in an in-memory database. Ideally these would be part of the schema and each employee would have a corresponding account. Note: There are 30,000 employees but only 2 logins.
* There are no errors being displayed in the UI and are silently ignored.
* Unit test coverage is lacking.