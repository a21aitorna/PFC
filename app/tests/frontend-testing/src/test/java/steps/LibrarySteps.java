package steps;

import hooks.DriverHooks;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import pages.LibraryPage;

public class LibrarySteps {
    WebDriver driver = DriverHooks.driver;
    LibraryPage libraryPage = new LibraryPage(driver);

    @When("the user selects a {}")
    public void theUserSelectsABook(String bookPath) {
        libraryPage.uploadBook(bookPath);
        libraryPage.confirmAlert();
    }

    @Then("a new book is uploaded")
    public void aNewBookIsUploaded() {
        Assertions.assertTrue(libraryPage.titleIsDisplayed(), "El titulo no se muestra");
    }

    @When("the user confirms to delete the book")
    public void theUserConfirmsToDeleteTheBook() {
        libraryPage.confirmAlert();
        libraryPage.confirmAlert();
    }

    @When("the user denies to delete the book")
    public void theUserDeniesToDeleteTheBook() {
        libraryPage.denyAlert();
    }

    @When("the user selects the option {string}")
    public void theUserSelectsTheOption(String path) {
        libraryPage.clickOnDropdown(path);
    }

    @Then("the user is redirected to searched library with name {string}")
    public void theUserIsRedirectedToSearchedLibraryWithName(String libraryName) {
        String actualLibraryName = libraryPage.getLibraryName();
        Assertions.assertEquals(libraryName, actualLibraryName, "El usuario no ha accedido a su biblio"+
                "teca. El nombre esperado es " + libraryName + ", sin embargo es " + actualLibraryName);
    }

    @Then("all books with {string} are displayed")
    public void displaySearchedBooks(String path) {
        Assertions.assertTrue(libraryPage.verifyBookField(path), "No coincide la búsqueda de libros");
    }

    @Then("no books with {string} or {string} are displayed")
    public void noBooksWithAreDisplayed(String pathAuthor, String pathTitle) {
        Assertions.assertFalse(libraryPage.verifyBookField(pathAuthor), "Se visualizan libros por autor");
        Assertions.assertFalse(libraryPage.verifyBookField(pathTitle), "Se visualizan libros por título");
    }
}
