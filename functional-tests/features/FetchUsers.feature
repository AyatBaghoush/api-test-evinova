
Feature: Fetching Users
  As a user of the application
  I want to be able to list all users of the application
  So that I can view and manage them as needed

@fetchUsers
Scenario: Listing all users of the application
  Given The "Fetch Users" service is available
  #And I request page <page> with <per_page> users per page
  When  I retrieve the list of users
  Then  I should receive a response code 200
  And   Response should contain list of users
