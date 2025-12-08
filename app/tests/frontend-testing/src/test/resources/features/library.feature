@libraryFeature
Feature: Login

  @successUploadPDFBook
  Scenario Outline: Upload PDF book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user is redirected to its library
    And the user click on <uploadBook> button
    And the user selects a <book>
    Then a new book is uploaded

    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | uploadBook            | book                                 |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_UPLOAD_BOOK | bookSamples/DER_Biblioteca-Aitor.pdf |

  @successUploadEPUBBook
  Scenario Outline: Upload EPUB book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user is redirected to its library
    And the user click on <uploadBook> button
    And the user selects a <book>
    Then a new book is uploaded

    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | uploadBook            | book                                                     |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_UPLOAD_BOOK | bookSamples/Oro y ceniza (Pierce Brown) (Z-Library).epub |

  @downloadBook
  Scenario Outline: Download a book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user is redirected to its library
    Then the user click on <downloadButton> button
    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | downloadButton          |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_DOWNLOAD_BOOK |

  @deleteBook
  Scenario Outline: Deletes a book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user is redirected to its library
    Then the user click on <deleteButton> button
    And the user confirms to delete the book
    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | deleteButton          |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_DELETE_BOOK |

  @deleteDenyBook
  Scenario Outline: Cancel when you try to delete a book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user is redirected to its library
    Then the user click on <deleteButton> button
    And the user denies to delete the book
    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | deleteButton          |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_DELETE_BOOK |

  @searchLibrariesByName
  Scenario Outline: Searches for a library by name
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user is redirected to its library
    When the user writes in <inputSearchLibrary> its '<librarySearchByName>'
    And the user selects the option '<optionSelected>'
    Then the user is redirected to searched library with name '<librarySearched>'
    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | inputSearchLibrary            | librarySearchByName | optionSelected             | librarySearched |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SEARCH_USER_LIBRARY | LibraryS            | @PROPERTY_SELECTED_LIBRARY | LibrarySearch   |

  @searchLibrariesByUsername
  Scenario Outline: Searches for a library by username
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user is redirected to its library
    When the user writes in <inputSearchLibrary> its '<librarySearchByUsername>'
    And the user selects the option '<optionSelected>'
    Then the user is redirected to searched library with name '<librarySearched>'
    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | inputSearchLibrary            | librarySearchByUsername | optionSelected             | librarySearched |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SEARCH_USER_LIBRARY | Search                  | @PROPERTY_SELECTED_LIBRARY | LibrarySearch   |

  @searchBooksByTitle
  Scenario Outline: Searches for a book in the library by the title
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user is redirected to its library
    When the user writes in <inputSearchBook> its '<bookSearchByTitle>'
    Then all books with '<title>' are displayed

    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | inputSearchBook        | bookSearchByTitle | title                          |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SEARCH_BOOKS | Oro               | @PROPERTY_SEARCHED_BOOKS_TITLE |

  @searchBooksByAuthor
  Scenario Outline: Searches for a book in the library by the title
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user is redirected to its library
    When the user writes in <inputSearchBook> its '<bookSearchByAuthor>'
    Then all books with '<Author>' are displayed

    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | inputSearchBook        | bookSearchByAuthor | Author                          |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SEARCH_BOOKS | ier                | @PROPERTY_SEARCHED_BOOKS_AUTHOR |
