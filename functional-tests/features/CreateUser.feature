Feature: Create New User

    As a user of the application
    I want to be able to create a new user
    So that I can add them to the application

@CreateUserPositive
Scenario: Creating a new user
  Given The "Create User" service is available
  And   I set payload to have valid user data
  When  I send request to create a new user
  Then  I should receive a response code 200
  And   Response should match JSON schema "create-user-schema.js"


@CreateUserNegative
Scenario: Creating a new user with missing password
  Given The "Create User" service is available
  And   I set payload to have Missing Password user data
  When  I send request to create a new user
  Then  I should receive a response code 400
  And   Response should contain error message "Missing password"