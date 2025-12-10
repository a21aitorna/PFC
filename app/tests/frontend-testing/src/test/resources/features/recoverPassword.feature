@recoverPasswordFeature
Feature: Get new password

  @recoverPasswordFirstRedirection
  Scenario Outline: Redirect to first page from recovering password
    Given the user clicks on <recoverPassword> link
    Then the user is redirected to recovery password first page

    Examples:
      | recoverPassword            |
      | @PROPERTY_RECOVER_PASSWORD |

  @emptyFieldRecoverPassword
  Scenario Outline: Clicks on continue button with empty field and it is displayed an error
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user clicks on <continue> button
    Then it is displayed the error <error>

    Examples:
      | recoverPassword            | continue                  | error                   |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_CONTINUE_BUTTON | El campo es obligatorio |

  @unknownUser
  Scenario Outline: Clicks on continue button with unknown username and it is displayed an error
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    Then it is displayed the error <error>

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | error                                      |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | UnknownUser     | @PROPERTY_CONTINUE_BUTTON | El usuario no existe o no se ha encontrado |

  @backToLoginFromFirst
  Scenario Outline: Clicks on continue button with unknown username and it is displayed an error
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user clicks on <returnLogin> button
    Then the user is redirected to login screen

    Examples:
      | recoverPassword            | returnLogin            |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_RETURN_LOGIN |

  @redirectionToSecondPage
  Scenario Outline: Clicks on continue and it is redirected to second page from recover password
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    Then the user is redirected to second page from recover password

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | Test-User       | @PROPERTY_CONTINUE_BUTTON |

  @returnToLoginFromSecondPage
  Scenario Outline: Clicks on continue and it is redirected to second page from recover password
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    When the user is redirected to second page from recover password
    And the user clicks on <returnLoginButton> button
    Then the user is redirected to login screen

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | returnLoginButton        |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | Test-User       | @PROPERTY_CONTINUE_BUTTON | @PROPERTY_RETURN_LOGIN_2 |

  @emptyFieldRecoverPassword2
  Scenario Outline: The user leaves empty fields and clicks on recover password and an error message is displayed
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    When the user is redirected to second page from recover password
    And the user clicks on <updatePassword> button
    Then it is displayed the error <error>

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | updatePassword            | error                             |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | Test-User       | @PROPERTY_CONTINUE_BUTTON | @PROPERTY_UPDATE_PASSWORD | Todos los campos son obligatorios |

  @wrongAnswer
  Scenario Outline: The user answers wrong and an error message is displayed
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    When the user is redirected to second page from recover password
    And the user writes in <inputAnswerRecoverPassword> its '<answerRecover>'
    And the user writes in <inputPasswordRecoverPassword> its '<passwordRecover>'
    And the user writes in <inputVerifyPasswordRecoverPassword> its '<verifyPasswordRecover>'
    And the user clicks on <updatePassword> button
    Then it is displayed the error <error>

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | inputAnswerRecoverPassword | answerRecover    | inputPasswordRecoverPassword | passwordRecover | inputVerifyPasswordRecoverPassword | verifyPasswordRecover | updatePassword            | error                       |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | Test-User       | @PROPERTY_CONTINUE_BUTTON | @PROPERTY_ANSWER_QUESTION  | Incorrect answer | @PROPERTY_PASSWORD_RECOVER   | Abc123..        | @PROPERTY_VERIFY_PASSWORD_RECOVER  | Abc123..              | @PROPERTY_UPDATE_PASSWORD | La respuesta no es correcta |

  @differentPasswordRecover
  Scenario Outline: The user writes two different passwords and an error message is displayed
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    When the user is redirected to second page from recover password
    And the user writes in <inputAnswerRecoverPassword> its '<answerRecover>'
    And the user writes in <inputPasswordRecoverPassword> its '<passwordRecover>'
    And the user writes in <inputVerifyPasswordRecoverPassword> its '<verifyPasswordRecover>'
    And the user clicks on <updatePassword> button
    Then it is displayed the error <error>

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | inputAnswerRecoverPassword | answerRecover | inputPasswordRecoverPassword | passwordRecover | inputVerifyPasswordRecoverPassword | verifyPasswordRecover | updatePassword            | error                        |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | Test-User       | @PROPERTY_CONTINUE_BUTTON | @PROPERTY_ANSWER_QUESTION  | test_answer   | @PROPERTY_PASSWORD_RECOVER   | Abc123.         | @PROPERTY_VERIFY_PASSWORD_RECOVER  | Abc123..              | @PROPERTY_UPDATE_PASSWORD | Las contraseñas no coinciden |

  @wrongFormatPasswordRecover
  Scenario Outline: The user writes passwords wih wrong and an error message is displayed
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    When the user is redirected to second page from recover password
    And the user writes in <inputAnswerRecoverPassword> its '<answerRecover>'
    And the user writes in <inputPasswordRecoverPassword> its '<passwordRecover>'
    And the user writes in <inputVerifyPasswordRecoverPassword> its '<verifyPasswordRecover>'
    And the user clicks on <updatePassword> button
    Then it is displayed the error <error>

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | inputAnswerRecoverPassword | answerRecover | inputPasswordRecoverPassword | passwordRecover | inputVerifyPasswordRecoverPassword | verifyPasswordRecover | updatePassword            | error                                                                                             |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | Test-User       | @PROPERTY_CONTINUE_BUTTON | @PROPERTY_ANSWER_QUESTION  | test_answer   | @PROPERTY_PASSWORD_RECOVER   | InvalidPassword | @PROPERTY_VERIFY_PASSWORD_RECOVER  | InvalidPassword       | @PROPERTY_UPDATE_PASSWORD | La contraseña es inválida. Mínimo, debe tener 8 caracteres, una mayúscula, un número y un símbolo |

  @passwordInUse
  Scenario Outline: The user writes passwords wih wrong and an error message is displayed
    Given the user clicks on <recoverPassword> link
    And the user is redirected to recovery password first page
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    When the user is redirected to second page from recover password
    And the user writes in <inputAnswerRecoverPassword> its '<answerRecover>'
    And the user writes in <inputPasswordRecoverPassword> its '<passwordRecover>'
    And the user writes in <inputVerifyPasswordRecoverPassword> its '<verifyPasswordRecover>'
    And the user clicks on <updatePassword> button
    Then it is displayed the error <error>

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | inputAnswerRecoverPassword | answerRecover | inputPasswordRecoverPassword | passwordRecover | inputVerifyPasswordRecoverPassword | verifyPasswordRecover | updatePassword            | error                                    |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | Test-User       | @PROPERTY_CONTINUE_BUTTON | @PROPERTY_ANSWER_QUESTION  | test_answer   | @PROPERTY_PASSWORD_RECOVER   | TestUser123..   | @PROPERTY_VERIFY_PASSWORD_RECOVER  | TestUser123..         | @PROPERTY_UPDATE_PASSWORD | La nueva contraseña ya está siendo usada |

  @updatePasswordSuccess
  Scenario Outline: The user writes data an password is updadted
    Given the user clicks on <recoverPassword> link
    When the user writes in <inputUsernameRecoverPassword> its '<usernameRecover>'
    And the user clicks on <continue> button
    When the user writes in <inputAnswerRecoverPassword> its '<answerRecover>'
    And the user writes in <inputPasswordRecoverPassword> its '<passwordRecover>'
    And the user writes in <inputVerifyPasswordRecoverPassword> its '<verifyPasswordRecover>'
    And the user clicks on <updatePassword> button
    Then the user is redirected to login screen

    Examples:
      | recoverPassword            | inputUsernameRecoverPassword        | usernameRecover | continue                  | inputAnswerRecoverPassword | answerRecover  | inputPasswordRecoverPassword | passwordRecover | inputVerifyPasswordRecoverPassword | verifyPasswordRecover | updatePassword            |
      | @PROPERTY_RECOVER_PASSWORD | @PROPERTY_USERNAME_RECOVER_PASSWORD | ModifyPassword  | @PROPERTY_CONTINUE_BUTTON | @PROPERTY_ANSWER_QUESTION  | ModifyPassword | @PROPERTY_PASSWORD_RECOVER   |                 | @PROPERTY_VERIFY_PASSWORD_RECOVER  |                       | @PROPERTY_UPDATE_PASSWORD |