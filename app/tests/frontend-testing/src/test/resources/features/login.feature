@loginFeature
Feature: Login

  @successLogin
  Scenario Outline: Login in the page
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    Then the user is redirected to its library

    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON |

  @emptyFieldsLogin
  Scenario Outline: Try to log without writing and get message error
    Given the user clicks on <login> button
    Then it is displayed the error <error>

    Examples:
      | login                           | error                             |
      | @PROPERTY_LOGIN_REGISTER_BUTTON | Todos los campos son obligatorios |

  @emptyPasswordError
  Scenario Outline: Try to log only writing the username and get error
    Given the user writes in <inputUsername> its '<username>'
    When the user clicks on <login> button
    Then it is displayed the error <error>

    Examples:
      | inputUsername            | username  | login                           | error                              |
      | @PROPERTY_USERNAME_LOGIN | aitor_n_a | @PROPERTY_LOGIN_REGISTER_BUTTON | El campo contraseña es obligatorio |

  @emptyUsernamePassword
  Scenario Outline: Try to log only writing the password and get error
    Given the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    Then it is displayed the error <error>

    Examples:
      | inputPassword            | password   | login                           | error                           |
      | @PROPERTY_PASSWORD_LOGIN | Abcd123... | @PROPERTY_LOGIN_REGISTER_BUTTON | El campo usuario es obligatorio |

  @verifyPasswordNotDisplayed
  Scenario Outline: Verify password is not displayed
    Given the user writes in <inputPassword> its '<password>'
    Then the password is not displayed

    Examples:
      | inputPassword            | password      |
      | @PROPERTY_PASSWORD_LOGIN | TestUser123.. |

  @verifyPasswordIsDisplayed
  Scenario Outline: Click on visualize password button to see the password
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user click on <visualizePassword> button
    Then the password is displayed as text

    Examples:
      | inputUsername            | username  | inputPassword            | password      | visualizePassword            |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_VISUALIZE_PASSWORD |