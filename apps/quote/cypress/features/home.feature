@page_home
Feature: Home page
  As a user, I want to access the company page by clicking on a utility and get a quote for my utility needs.

  Background: Load the home page
    Given the user is on the "Home" page

  @smoke
  Scenario Outline: User clicks a utility and is taken to the company page
    When the user clicks "<utility>"
    And the user clicks "Get a quote"
    Then the user should be taken to the "Company" page

    Examples:
      | utility     |
      | Electricity |

  Scenario: User attempts to click a disabled utility and sees a warning
    When the user clicks "<utility>"
    And the user clicks "Get a quote"
    Then the user sees a toaster "warning" message "Please select at least one Utility to continue"

    Examples:
      | utility  |
      | Gas      |
      | Water    |
      | Telecom  |
      | Internet |
