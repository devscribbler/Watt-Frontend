@page_electricity_quote
Feature: Electricity Quote page
    As a user, I want to choose a quote, to proceed to electricity contracts page

  Background: Load the electricity quotes page
    Given the user is on the "ElectricityQuote" page 
    # Then the step labels should indicate the user is on the "ElectricityUsage" page

  @smoke
  Scenario: User selects first quote
    When the user clicks "Sign Me Up" at "0" index
    Then the user should be taken to the "ElectricityContract" page
