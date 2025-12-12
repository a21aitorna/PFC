@adminFeature @all
Feature: Admin

  @successLoginAdmin
  Scenario Outline: Login in the page
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    Then the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |

    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON |

  @blockUser
  Scenario Outline: Block user
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    And the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |
    And the user selects the option '<blockButton>'
    Then it is displayed the status as <statusBlocked>
    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           | blockButton                | statusBlocked                 |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_BLOCK_USER_BLOCK | @PROPERTY_STATUS_BLOCKED_USER |

  @unblockUser
  Scenario Outline: Rectify block user
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    And the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |
    And the user selects the option '<rectifyBlockButton>'
    Then it is displayed the status as <statusActive>
    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           | rectifyBlockButton                 | statusActive                 |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_RECTIFY_BLOCK_USER_BLOCK | @PROPERTY_STATUS_ACTIVE_USER |

  @deleteUser
  Scenario Outline: Delete user
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    And the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |
    And the user selects the option '<deleteButton>'
    Then it is displayed the status as <deletedStatus>
    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           | deleteButton                 | deletedStatus                |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_DELETE_USER_DELETE | @PROPERTY_DELETE_USER_DELETE |

  @rectifyDeleteUser
  Scenario Outline: Rectify delete user
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    And the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |
    And the user selects the option '<rectifyDeleteButton>'
    Then it is displayed the status as <statusActive>
    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           | rectifyDeleteButton                  | statusActive                 |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_RECTIFY_DELETE_USER_DELETE | @PROPERTY_STATUS_ACTIVE_USER |

  @navigateIntoUsersLibray
  Scenario Outline: Select one users library
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    And the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |
    When the user selects the option '<userLibrary>'
    Then the user is redirected to user's library
    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           | userLibrary                   |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SELECT_USER_LIBRARY |

  @verifyAdminCanDeleteAnyBook
  Scenario Outline: Select one users library and verifies tha admin can delete any book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    And the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |
    When the user selects the option '<userLibrary>'
    And the user is redirected to user's library
    Then the user can delete any book

    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           | userLibrary                   |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SELECT_USER_LIBRARY |

  @verifyAdminCanDeleteAnyReview
  Scenario Outline: Select one users library and verifies tha admin can delete any review
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    When the user clicks on <login> button
    And the user is redirected to configuration table with columns:
      | usernameColumn    | @PROPERTY_USERNAME_COLUMN_HEADER     |
      | libraryNameColumn | @PROPERTY_LIBRARY_NAME_COLUMN_HEADER |
      | statusColumn      | @PROPERTY_STATUS_COLUMN_HEADER       |
      | actionsColumn     | @PROPERTY_ACTION_COLUMN_HEADER       |
    When the user selects the option '<userLibrary>'
    And the user is redirected to user's library
    When the user clicks on <bookClick> element
    And the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    Then the user can delete any review

    Examples:
      | inputUsername            | username | inputPassword            | password   | login                           | userLibrary                     | bookClick                              |
      | @PROPERTY_USERNAME_LOGIN | Admin    | @PROPERTY_PASSWORD_LOGIN | Admin123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SELECT_USER_LIBRARY_2 | @PROPERTY_BOOK_SELECTED_NUMBER_REVIEWS |