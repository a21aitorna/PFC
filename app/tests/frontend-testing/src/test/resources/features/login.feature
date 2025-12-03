Feature: Login

  @pruebaLogin
  Scenario Outline: Login in the page
    Given the user clicks in the <inputUsername> field
    And writes its '<username>'
    And the user clicks in the <inputPassword> field
    And writes its '<password>'
    When the user clicks on login button
    Then the user is redirected to its library

    Examples:
      | inputUsername            | username  | inputPassword            | password      |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. |

  Scenario Outline: Try to log without writing and get message errpr
    Given the user clicks on login button
    Then it is displayed the error <error>

    Examples:
      | error                             |
      | Todos los campos son obligatorios |

  Scenario Outline: Try to log only writing the username and get error
    Given Given the user clicks in the <inputUsername> field
    And writes its '<username>'
    When the user clicks on login button
    Then it is displayed the error <error>

    Examples:
      | error                              |
      | El campo contraseña es obligatorio |

  Scenario Outline: Try to log only writing the password and get error
    Given Given the user clicks in the <inputUsername> field
    And writes its '<username>'
    When the user clicks on login button
    Then it is displayed the error <error>

    Examples:
      | error                           |
      | El campo usuario es obligatorio |

  Scenario Outline: Click on visualize password button to see the password
    Given the user clicks in the <inputUsername> field
    And writes its '<username>'
    And the user clicks in the <inputPassword> field
    And writes its '<password>'
    When the user click on visualize password button
    Then the password is displayed as text