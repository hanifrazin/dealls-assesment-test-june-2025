# Dealls Assessment Test June 2025

 ### Reference UI Web
 [Dev Dealls Mentoring](https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring)

### Requirement Dependencies
 1. cypress
 1. cypress-xpath
 1. mochawesome
 1. mochawesome-merge
 1. mochawesome-report-generator

### Scope Test Feature 
1. Register and Login as Job Seeker
1. Register and Login as Mentor
1. Mentoring Landing Page

### How to Run the Code

 1. Clone [this repo](https://github.com/hanifrazin/dealls-assesment-test-june-2025) to your local
 1. Open the project using Visual Studio Code
 1. Type bellow command in terminal at VS Code
	 ```
     npm install
     ```
     > You only need to run `npm install` once to install dependencies such as `cypress, cypress-xpath, mochawesome, mochawesome-merge, mochawesome-report-generator`
 1. You want to run all test only but not generate all report you must using this command
     ```
     npm run test:only
     ```
 1. You want to run all test with generate report each test you must using this command
     ```
     npm run test:report
     ```
 1. You want to merge report and convert to html report you must using this command
     ```
     npm run report
     ```       
