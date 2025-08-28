
Feature: Fetching Users
  As a user of the application
  I want to be able to list all users of the application
  So that I can view and manage them as needed

@fetchUsers
Scenario: Listing all users of the application
  Given The "Fetch Users" endpoint is available
  And   I set query params
        | key      | value |
        | page     | 2     |
        | per_page | 6     |
  When  I send GET HTTP request
  Then  I receive HTTP response code "200"
  And   Response should contain list of users
