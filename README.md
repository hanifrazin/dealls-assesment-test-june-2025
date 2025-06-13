# Dealls Assessment Test June 2025

 ### Reference UI Web
 [Dev Dealls Mentoring](https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring)

### Requirement Dependencies
 1. cypress
 1. cypress-xpath
 1. mochawesome
 1. mochawesome-merge
 1. mochawesome-report-generator
 1. faker
 1. luxon

### Scope Test Feature 
1. Register and Login as Job Seeker
1. Register and Login as Mentor
1. Mentoring Landing Page
1. Booking Mentor 1 on 1

### Flow Test Feature 
1. Run **register-job-seeker.cy.js** to create the new account for job seeker. 
1. Run **booking-mentor.cy.js** to create booking 1 on 1 mentor with user that has been created at first step.


### How to Run the Code

 1. Clone [this repo](https://github.com/hanifrazin/dealls-assesment-test-june-2025) to your local
 1. Open the project using Visual Studio Code
 1. Type bellow command in terminal at VS Code
	 ```
     npm install
     ```
     > You only need to run `npm install` once to install dependencies such as `cypress, cypress-xpath, mochawesome, mochawesome-merge, mochawesome-report-generator`
 1. Choose one of the bellow CLI to run the project
    1. To run all test in headless mode with **chrome browser** 
         ```
        npm run test:chrome
        ```
    1. To run all test in headless mode with **edge browser** 
        ```
        npm run test:edge
        ```
    1. To run all test in headless mode for **mentoring e2e test** 
        ```
        npm run test:mentoring
        ```
    1. To run all test in headless mode for **register e2e test** 
        ```
        npm run test:register
        ```     
    1. To run all test in headless mode with **electron browser** 
        ```
        npm run test:electron
        ```
    1. To run specific file test in headless mode  
        ```
        npx cypress run --browser chrome --headless  --spec "cypress/e2e/{{folder-name}}/{{filename.cy.js}}""
        ```        
 1. To **merge report** and **convert to html** report. Note: run this bellow CLI after you run test with one of the above CLI, becase it is just only merge report exist and generate it to new report in html file
     ```
     npm run report
     ```       

### Result in Video
[Recording e2e test](https://drive.google.com/drive/folders/1XyzzEjJMlki3uW2proVJVHRTOoT0dO30?usp=sharing)

