@detailBookFeature
Feature: Detail book

  @detailBook
  Scenario Outline: Click on a book and get redirected to its detail
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user clicks on <bookClick> element
    Then the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |


    Examples:
      | inputUsername            | username | inputPassword            | password      | login                           | bookClick      |
      | @PROPERTY_USERNAME_LOGIN | TestUser | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @BOOK_SELECTED |

  @noReviews
  Scenario Outline: Click on a book with no reviews
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user clicks on <bookClick> element
    When the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    Then it is displayed in <message> the message <messageNoReviews>

    Examples:
      | inputUsername            | username | inputPassword            | password      | login                           | bookClick                 | message                          | messageNoReviews                                              |
      | @PROPERTY_USERNAME_LOGIN | TestUser | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @BOOK_SELECTED_NO_REVIEWS | @PROPERTY_BOOK_DETAIL_NO_REVIEWS | No hay opiniones todavía. ¡Sé el primero en dejar una reseña! |

  @countNumberReviews
  Scenario Outline: Count how many reviews has the book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user clicks on <bookClick> element
    When the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    Then it is displayed this book has <numberReviews> reviews.

    Examples:
      | inputUsername            | username | inputPassword            | password      | login                           | bookClick                     | numberReviews |
      | @PROPERTY_USERNAME_LOGIN | TestUser | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @BOOK_SELECTED_NUMBER_REVIEWS | 4             |

  @postReview
  Scenario Outline: Post a review
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user clicks on <bookClick> element
    When the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    And the user selects the rating <rating>
    And the user writes in <inputReview> its '<textReview>'
    And the user clicks on <postReview> element
    Then the review is posted:
      | username     | @PROPERTY_NAME_USER_REVIEW_FIRST   |
      | deleteButton | @PROPERTY_DELETE_BUTTON_USER_FIRST |

    Examples:
      | inputUsername            | username | inputPassword            | password      | login                           | bookClick                  | rating               | inputReview            | textReview | postReview                   |
      | @PROPERTY_USERNAME_LOGIN | TestUser | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @BOOK_SELECTED_POST_REVIEW | @PROPERTY_START_RATE | @PROPERTY_REVIEW_INPUT | Me encanta | @PROPERTY_POST_REVIEW_BUTTON |

  @postReviewDifferentUser
  Scenario Outline: Post a review
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user writes in <inputSearchLibrary> its '<librarySearchByUsername>'
    And the user selects the option '<optionSelected>'
    And the user clicks on <bookClick> element
    When the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    And the user selects the rating <rating>
    And the user writes in <inputReview> its '<textReview>'
    And the user clicks on <postReview> element
    Then the review is posted:
      | username     | @PROPERTY_NAME_USER_REVIEW_FIRST   |
      | deleteButton | @PROPERTY_DELETE_BUTTON_USER_FIRST |

    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | inputSearchLibrary            | librarySearchByUsername | optionSelected             | bookClick                  | rating               | inputReview            | textReview | postReview                   |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SEARCH_USER_LIBRARY | TestUser                | @PROPERTY_SELECTED_LIBRARY | @BOOK_SELECTED_POST_REVIEW | @PROPERTY_START_RATE | @PROPERTY_REVIEW_INPUT | Me encanta | @PROPERTY_POST_REVIEW_BUTTON |

  @readBook
  Scenario Outline: Read a book
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user clicks on <bookClick> element
    When the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    And the user clicks on <readBook> button

    Examples:
      | inputUsername            | username | inputPassword            | password      | login                           | bookClick                  | readBook            |
      | @PROPERTY_USERNAME_LOGIN | TestUser | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @BOOK_SELECTED_POST_REVIEW | @PROPERTY_BOOK_READ |

  @verifyDeleteReviewIsDisplayedForLoggedOwner
  Scenario Outline: Verify delete in review logged user created
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    And the user clicks on <bookClick> element
    When the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    Then the <deleteReviewButton> is displayed for the user

    Examples:
      | inputUsername            | username | inputPassword            | password      | login                           | bookClick                  | deleteReviewButton            |
      | @PROPERTY_USERNAME_LOGIN | TestUser | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @BOOK_SELECTED_POST_REVIEW | @PROPERTY_REVIEWS_WITH_DELETE |

  @verifyDeleteReviewIsNotDisplayedForNotLoggedOwner
  Scenario Outline: Verify delete is not in review logged user
    Given the user writes in <inputUsername> its '<username>'
    And the user writes in <inputPassword> its '<password>'
    And the user clicks on <login> button
    When the user writes in <inputSearchLibrary> its '<librarySearchByUsername>'
    And the user selects the option '<optionSelected>'
    And the user clicks on <bookClick> element
    When the user is redirected to book detail screen with details:
      | detailImage  | @PROPERTY_BOOK_DETAIL_IMG    |
      | detailTitle  | @PROPERTY_BOOK_DETAIL_TITLE  |
      | detailAuthor | @PROPERTY_BOOK_DETAIL_AUTHOR |
      | detailRating | @PROPERTY_BOOK_DETAIL_RATING |
    Then the <deleteReviewButton> is not displayed for the user

    Examples:
      | inputUsername            | username  | inputPassword            | password      | login                           | inputSearchLibrary            | librarySearchByUsername | optionSelected             | bookClick                  | deleteReviewButton            |
      | @PROPERTY_USERNAME_LOGIN | Test-User | @PROPERTY_PASSWORD_LOGIN | TestUser123.. | @PROPERTY_LOGIN_REGISTER_BUTTON | @PROPERTY_SEARCH_USER_LIBRARY | TestUser                | @PROPERTY_SELECTED_LIBRARY | @BOOK_SELECTED_POST_REVIEW | @PROPERTY_REVIEWS_WITH_DELETE |