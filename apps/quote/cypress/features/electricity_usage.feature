@page_electricity_usage
Feature: Electricity usage page
    As a user, I want to provide my electricity usage details, to proceed to electricity quotes page

  Background: Load the electricity usage page
    Given the user is on the "ElectricityUsage" page 
    # Then the step labels should indicate the user is on the "ElectricityUsage" page

  @smoke
  Scenario: User submits with defaults
      When the user clicks "See Quote"
      Then the user should be taken to the "ElectricityQuote" page
