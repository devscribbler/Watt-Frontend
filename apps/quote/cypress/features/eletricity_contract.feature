@page_electricity_contract
Feature: Electricity Contract page
    As a user, I want to sign a contract, to proceed to succcess page

  Background: Load the electricity contract page
    Given the user is on the "ElectricityContract" page 

  @smoke
  Scenario: User selects first quote
    When the user types "Barclays" into the "Bank name" field
    And the user types "Bob Ross" into the "Account name" field
    And the user types "12345678" into the "Account number" field
    And the user types "123456" into the "Sort code" field
    And the user types "Bob Ross" into the "Signature" field
    And the user types "Hello world" into the "Comments" field
    And the user clicks "I confirm that I am authorized"
    And the user clicks "I understand commission"
    And the user clicks "View PDF"
    And the user clicks "Sign Contract"

    Then the user should be taken to the "Success" page
