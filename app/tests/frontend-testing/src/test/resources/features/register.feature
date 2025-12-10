@registerFeature
Feature: Register

  @registerRedirection
  Scenario Outline: Redirect to register screen
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    Then the user is redirected to register screen

    Examples:
      | inputUsername            | username | inputPassword            | password | login                           |
      | @PROPERTY_USERNAME_LOGIN | a        | @PROPERTY_PASSWORD_LOGIN | a        | @PROPERTY_LOGIN_REGISTER_BUTTON |

  @successRegister
  Scenario Outline: Success user register
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user writes in <inputNameRegister> its '<nameRegister>'
    And the user writes in <inputSurnameRegister> its '<surnameRegister>'
    And the user writes in <inputUsernameRegister> its '<usernameRegister>'
    And the user writes in <inputBornDate> its '<bornDate>'
    And the user writes in <inputPasswordRegister> its '<passwordRegister>'
    And the user writes in <inputVerifyPasswordRegister> its '<verifyPasswordRegister>'
    And the user writes in <inputLibraryNameRegister> its '<libraryNameRegister>'
    And the user writes in <inputSecurityQuestionRegister> its '<securityQuestionRegister>'
    And the user writes in <inputAnswerRegister> its '<answerRegister>'
    When the user clicks on <register> button
    Then the user is redirected to login screen
    Examples:
      | inputUsername            | username | inputPassword            | password | login                           | inputNameRegister       | nameRegister | inputSurnameRegister       | surnameRegister | inputUsernameRegister       | usernameRegister | inputBornDate                 | bornDate | inputPasswordRegister       | passwordRegister | inputVerifyPasswordRegister        | verifyPasswordRegister | inputLibraryNameRegister        | libraryNameRegister | inputSecurityQuestionRegister        | securityQuestionRegister    | inputAnswerRegister       | answerRegister | register                  |
      | @PROPERTY_USERNAME_LOGIN | a        | @PROPERTY_PASSWORD_LOGIN | a        | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_NAME_REGISTER | Test         | @PROPERTY_SURNAME_REGISTER | User            | @PROPERTY_USERNAME_REGISTER | SeleniumUser     | @PROPERTY_BIRTH_DATE_REGISTER | 03091999 | @PROPERTY_PASSWORD_REGISTER | TestUser123..    | @PROPERTY_REPEAT_PASSWORD_REGISTER | TestUser123..          | @PROPERTY_LIBRARY_NAME_REGISTER | Library X           | @PROPERTY_SECURITY_QUESTION_REGISTER | ¿Cuál es tu color favorito? | @PROPERTY_ANSWER_REGISTER | Rojo           | @PROPERTY_REGISTER_BUTTON |


  @emptyFieldsRegister
  Scenario Outline: Try to register without filling all fields and display a message error
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user clicks on <register> button
    Then it is displayed the error <error>

    Examples:
      | inputUsername            | username | inputPassword            | password | login                           | register                  | error                             |
      | @PROPERTY_USERNAME_LOGIN | a        | @PROPERTY_PASSWORD_LOGIN | a        | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_REGISTER_BUTTON | Todos los campos son obligatorios |

  @underageUserRegister
  Scenario Outline: Try register being under 14 and display a message error
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user writes in <inputNameRegister> its '<nameRegister>'
    And the user writes in <inputSurnameRegister> its '<surnameRegister>'
    And the user writes in <inputUsernameRegister> its '<usernameRegister>'
    And the user writes in <inputBornDate> its '<bornDate>'
    And the user writes in <inputPasswordRegister> its '<passwordRegister>'
    And the user writes in <inputVerifyPasswordRegister> its '<verifyPasswordRegister>'
    And the user writes in <inputLibraryNameRegister> its '<libraryNameRegister>'
    And the user writes in <inputSecurityQuestionRegister> its '<securityQuestionRegister>'
    And the user writes in <inputAnswerRegister> its '<answerRegister>'
    When the user clicks on <register> button
    Then it is displayed the error <error>

    Examples:
      | inputUsername            | username | inputPassword            | password | login                           | inputNameRegister       | nameRegister | inputSurnameRegister       | surnameRegister | inputUsernameRegister       | usernameRegister | inputBornDate                 | bornDate | inputPasswordRegister       | passwordRegister | inputVerifyPasswordRegister        | verifyPasswordRegister | inputLibraryNameRegister        | libraryNameRegister | inputSecurityQuestionRegister        | securityQuestionRegister    | inputAnswerRegister       | answerRegister | register                  | error                                |
      | @PROPERTY_USERNAME_LOGIN | a        | @PROPERTY_PASSWORD_LOGIN | a        | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_NAME_REGISTER | Test         | @PROPERTY_SURNAME_REGISTER | User            | @PROPERTY_USERNAME_REGISTER | SeleniumUser     | @PROPERTY_BIRTH_DATE_REGISTER | 03092025 | @PROPERTY_PASSWORD_REGISTER | TestUser123..    | @PROPERTY_REPEAT_PASSWORD_REGISTER | TestUser123..          | @PROPERTY_LIBRARY_NAME_REGISTER | Library X           | @PROPERTY_SECURITY_QUESTION_REGISTER | ¿Cuál es tu color favorito? | @PROPERTY_ANSWER_REGISTER | Rojo           | @PROPERTY_REGISTER_BUTTON | El usuario debe tener 14 años mínimo |

  @differentPasswordRegister
  Scenario Outline: Try register with different passwords and display a message error
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user writes in <inputNameRegister> its '<nameRegister>'
    And the user writes in <inputSurnameRegister> its '<surnameRegister>'
    And the user writes in <inputUsernameRegister> its '<usernameRegister>'
    And the user writes in <inputBornDate> its '<bornDate>'
    And the user writes in <inputPasswordRegister> its '<passwordRegister>'
    And the user writes in <inputVerifyPasswordRegister> its '<verifyPasswordRegister>'
    And the user writes in <inputLibraryNameRegister> its '<libraryNameRegister>'
    And the user writes in <inputSecurityQuestionRegister> its '<securityQuestionRegister>'
    And the user writes in <inputAnswerRegister> its '<answerRegister>'
    When the user clicks on <register> button
    Then it is displayed the error <error>

    Examples:
      | inputUsername            | username | inputPassword            | password | login                           | inputNameRegister       | nameRegister | inputSurnameRegister       | surnameRegister | inputUsernameRegister       | usernameRegister | inputBornDate                 | bornDate | inputPasswordRegister       | passwordRegister | inputVerifyPasswordRegister        | verifyPasswordRegister | inputLibraryNameRegister        | libraryNameRegister | inputSecurityQuestionRegister        | securityQuestionRegister    | inputAnswerRegister       | answerRegister | register                  | error                        |
      | @PROPERTY_USERNAME_LOGIN | a        | @PROPERTY_PASSWORD_LOGIN | a        | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_NAME_REGISTER | Test         | @PROPERTY_SURNAME_REGISTER | User            | @PROPERTY_USERNAME_REGISTER | SeleniumUser     | @PROPERTY_BIRTH_DATE_REGISTER | 03092025 | @PROPERTY_PASSWORD_REGISTER | Password1..      | @PROPERTY_REPEAT_PASSWORD_REGISTER | Password2..            | @PROPERTY_LIBRARY_NAME_REGISTER | Library X           | @PROPERTY_SECURITY_QUESTION_REGISTER | ¿Cuál es tu color favorito? | @PROPERTY_ANSWER_REGISTER | Rojo           | @PROPERTY_REGISTER_BUTTON | Las contraseñas no coinciden |

  @wrongPasswordRegister
  Scenario Outline: Try register with passwords which not follow the format and display a message error
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user writes in <inputNameRegister> its '<nameRegister>'
    And the user writes in <inputSurnameRegister> its '<surnameRegister>'
    And the user writes in <inputUsernameRegister> its '<usernameRegister>'
    And the user writes in <inputBornDate> its '<bornDate>'
    And the user writes in <inputPasswordRegister> its '<passwordRegister>'
    And the user writes in <inputVerifyPasswordRegister> its '<verifyPasswordRegister>'
    And the user writes in <inputLibraryNameRegister> its '<libraryNameRegister>'
    And the user writes in <inputSecurityQuestionRegister> its '<securityQuestionRegister>'
    And the user writes in <inputAnswerRegister> its '<answerRegister>'
    When the user clicks on <register> button
    Then it is displayed the error <error>

    Examples:
      | inputUsername            | username | inputPassword            | password | login                           | inputNameRegister       | nameRegister | inputSurnameRegister       | surnameRegister | inputUsernameRegister       | usernameRegister | inputBornDate                 | bornDate | inputPasswordRegister       | passwordRegister | inputVerifyPasswordRegister        | verifyPasswordRegister | inputLibraryNameRegister        | libraryNameRegister | inputSecurityQuestionRegister        | securityQuestionRegister    | inputAnswerRegister       | answerRegister | register                  | error                                                                                             |
      | @PROPERTY_USERNAME_LOGIN | a        | @PROPERTY_PASSWORD_LOGIN | a        | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_NAME_REGISTER | Test         | @PROPERTY_SURNAME_REGISTER | User            | @PROPERTY_USERNAME_REGISTER | SeleniumUser     | @PROPERTY_BIRTH_DATE_REGISTER | 03092025 | @PROPERTY_PASSWORD_REGISTER | wrongPassword    | @PROPERTY_REPEAT_PASSWORD_REGISTER | wrongPassword          | @PROPERTY_LIBRARY_NAME_REGISTER | Library X           | @PROPERTY_SECURITY_QUESTION_REGISTER | ¿Cuál es tu color favorito? | @PROPERTY_ANSWER_REGISTER | Rojo           | @PROPERTY_REGISTER_BUTTON | La contraseña es inválida. Mínimo, debe tener 8 caracteres, una mayúscula, un número y un símbolo |

  @userAlreadyExistsRegister
  Scenario Outline: Try register an user which already exists and display a message error
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user writes in <inputNameRegister> its '<nameRegister>'
    And the user writes in <inputSurnameRegister> its '<surnameRegister>'
    And the user writes in <inputUsernameRegister> its '<usernameRegister>'
    And the user writes in <inputBornDate> its '<bornDate>'
    And the user writes in <inputPasswordRegister> its '<passwordRegister>'
    And the user writes in <inputVerifyPasswordRegister> its '<verifyPasswordRegister>'
    And the user writes in <inputLibraryNameRegister> its '<libraryNameRegister>'
    And the user writes in <inputSecurityQuestionRegister> its '<securityQuestionRegister>'
    And the user writes in <inputAnswerRegister> its '<answerRegister>'
    When the user clicks on <register> button
    Then it is displayed the error <error>

    Examples:
      | inputUsername            | username | inputPassword            | password | login                           | inputNameRegister       | nameRegister | inputSurnameRegister       | surnameRegister | inputUsernameRegister       | usernameRegister | inputBornDate                 | bornDate | inputPasswordRegister       | passwordRegister | inputVerifyPasswordRegister        | verifyPasswordRegister | inputLibraryNameRegister        | libraryNameRegister | inputSecurityQuestionRegister        | securityQuestionRegister    | inputAnswerRegister       | answerRegister | register                  | error                                           |
      | @PROPERTY_USERNAME_LOGIN | a        | @PROPERTY_PASSWORD_LOGIN | a        | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_NAME_REGISTER | Test         | @PROPERTY_SURNAME_REGISTER | User            | @PROPERTY_USERNAME_REGISTER | TestUser         | @PROPERTY_BIRTH_DATE_REGISTER | 03091999 | @PROPERTY_PASSWORD_REGISTER | TestUser123..    | @PROPERTY_REPEAT_PASSWORD_REGISTER | TestUser123..          | @PROPERTY_LIBRARY_NAME_REGISTER | Library X           | @PROPERTY_SECURITY_QUESTION_REGISTER | ¿Cuál es tu color favorito? | @PROPERTY_ANSWER_REGISTER | Rojo           | @PROPERTY_REGISTER_BUTTON | Ya existe un usuario con este nombre de usuario |