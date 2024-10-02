@page_company
Feature: Company page
  As a user, I want to provide my company details, contact information and approval to proceed to electricity usage details

  Background: Load the company page
    Given the user is on the "Company" page
  # Then the step labels should indicate the user is on the "Company" page

  @smoke
  Scenario: User submits a company without entering anything they see all fields are required
    When the user clicks "Submit"
    Then the user sees form validation message "Required information." associated with the "Postcode" field
    And the user sees form validation message "Required information." associated with the "Site address" field
    And the user sees form validation message "Required information." associated with the "Business type" field
    And the user sees form validation message "Required information." associated with the "Contact email" field
    And the user sees form validation message "Required information." associated with the "Business phone number" field
    And the user sees form validation message "Required information." associated with the "Forename" field
    And the user sees form validation message "Required information." associated with the "Surname" field
    And the user sees form validation message "Required information." associated with the "Company position" field
    And the user sees form validation message "Required information." associated with the "I am authorised" field
    And the user sees form validation message "Required information." associated with the "I sign LOA" field
    And the user sees form validation message "Required information." associated with the "I agree T&C" field
    And the user sees form validation message "Required information." associated with the "I agree to credit check" field

  Scenario: User submits a company with only a valid postcode they see site address is requireds
    When the user types "SN7 7WD" into the "Postcode" field
    And the user clicks "Submit"
    Then the user sees form validation message "Required information." associated with the "Site address" field

  Scenario: User submits as a limited company without entering anything else they see registration number is required
    When the user selects "Limited Company" from the "Business type" dropdown menu
    And the user clicks "Submit"
    Then the user sees form validation message "Required information." associated with the "Registration number" field

  Scenario: User submits as a charity without entering anything else they see charity number is required
    When the user selects "Charity" from the "Business type" dropdown menu
    And the user clicks "Submit"
    Then the user sees form validation message "Required information." associated with the "Charity number" field

  Scenario: User submits as a sole trader without entering anything else they see bussiness name, soletrader postcode and address are required
    When the user selects "Sole Trader" from the "Business type" dropdown menu
    And the user clicks "Submit"
    Then the user sees form validation message "Required information." associated with the "Business name" field
    And the user sees form validation message "Required information." associated with the "Soletrader postcode" field
    And the user sees form validation message "Required information." associated with the "Soletrader address" field

  Scenario: User submits as a sole trader with only a valid soletrader postcode they see soletrader site address is requireds
    When the user selects "Sole Trader" from the "Business type" dropdown menu
    When the user types "SN7 7WD" into the "Soletrader postcode" field
    And the user clicks "Submit"
    And the user sees form validation message "Required information." associated with the "Site address" field

  Scenario: User submits a company with email verification code sent they see verification code is required
    When the user types "valid@email.com" into the "Contact email" field
    And the user clicks "Send verification email"
    And the user clicks "Submit"
    And the user sees form validation message "Required information." associated with the "Verification code" field

  @smoke
  Scenario: User submits as a limited company with all required fields they see the electricity usage page
    When the user types "SN7 7WD" into the "Postcode" field
    And the user selects "1" from the "Site address" dropdown menu
    And the user selects "Limited Company" from the "Business type" dropdown menu
    And the user types "13824863" into the "Registration number" field
    Then the user should see "Fake Company Ltd" in the "Business name" field
    When the user types "valid@email.com" into the "Contact email" field
    And the user clicks "Send verification email"
    And the user types "000000" into the "Verification code" field
    And the user clicks "Verify"
    Then the user sees a toaster "Success" message "Email successfully verified."
    When the user types "07501123456" into the "Business phone number" field
    And the user types "Bob" into the "Forename" field
    And the user types "Ross" into the "Surname" field
    And the user types "Artist" into the "Company position" field
    And the user clicks "I am authorised"
    And the user clicks "I sign LOA"
    And the user clicks "I agree T&C"
    And the user clicks "I agree to credit check"
    And the user clicks "I agree to direct debit"
    And the user clicks "I agree to smart meter"
    And the user clicks "Submit"
    Then the user should be taken to the "ElectricityUsage" page

  @fixture_post_company_no_direct_debit
  Scenario: User submits as a limited company with all required fields but with no direct debit they see the error page
    When the user types "SN7 7WD" into the "Postcode" field
    And the user selects "1" from the "Site address" dropdown menu
    And the user selects "Limited Company" from the "Business type" dropdown menu
    And the user types "13824863" into the "Registration number" field
    Then the user should see "Fake Company Ltd" in the "Business name" field
    When the user types "valid@email.com" into the "Contact email" field
    And the user clicks "Send verification email"
    And the user types "000000" into the "Verification code" field
    And the user clicks "Verify"
    Then the user sees a toaster "Success" message "Email successfully verified."
    When the user types "07501123456" into the "Business phone number" field
    And the user types "Bob" into the "Forename" field
    And the user types "Ross" into the "Surname" field
    And the user types "Artist" into the "Company position" field
    And the user clicks "I am authorised"
    And the user clicks "I sign LOA"
    And the user clicks "I agree T&C"
    And the user clicks "I agree to credit check"
    And the user clicks "I agree to smart meter"
    And the user clicks "Submit"
    Then the user should be taken to the "Error" page

  Scenario: User submits as a charity with invalid charity numbers
    When the user selects "Charity" from the "Business type" dropdown menu
    When the user types "<invalidcharitynumber>" into the "Charity number" field
    When the user clicks "Submit"
    Then the user sees form validation message "<invaliderrormessage>" associated with the "Charity number" field
    Examples:
      | invalidcharitynumber | invaliderrormessage                                                                                |
      | 1234                 | Charity number must be at least six digits                                                         |
      | 123456789            | Charity number must be a maximum of eight digits                                                   |
      | 123456CB             | Charity number must be either (6-7 digits, 'SC' followed by 6 digits or 6 digits followed by '-0') |

  @smoke
  Scenario: User submits as a charity with all required fields they see the electricity usage page
    When the user types "SN7 7WD" into the "Postcode" field
    When the user selects "2" from the "Site address" dropdown menu
    When the user selects "Charity" from the "Business type" dropdown menu
    When the user types "Refugee salvation" into the "Business name" field
    When the user types "SC123456" into the "Charity number" field
    When the user types "valid@email.com" into the "Contact email" field
    And the user clicks "Send verification email"
    And the user types "000000" into the "Verification code" field
    And the user clicks "Verify"
    Then the user sees a toaster "Success" message "Email successfully verified."
    When the user types "07501123457" into the "Business phone number" field
    When the user types "Bob" into the "Forename" field
    When the user types "Ross" into the "Surname" field
    When the user types "executor" into the "Company position" field
    When the user clicks "I am authorised"
    When the user clicks "I sign LOA"
    When the user clicks "I agree T&C"
    When the user clicks "I agree to credit check"
    When the user clicks "I agree to direct debit"
    When the user clicks "I agree to smart meter"
    When the user clicks "Submit"
    Then the user should be taken to the "ElectricityUsage" page
