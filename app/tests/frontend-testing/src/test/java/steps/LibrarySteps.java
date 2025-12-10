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
        String actualLibraryName = libraryPage.getLibraryName("@PROPERTY_USER_LIBRARY_NAME");
        Assertions.assertEquals(libraryName, actualLibraryName, "El usuario no ha accedido a su biblio"+
                "teca. El nombre esperado es " + libraryName + ", sin embargo es " + actualLibraryName);
    }

    @Then("all books with {string} are displayed")
    public void displaySearchedBooks(String path) {
        Assertions.assertTrue(libraryPage.verifyBookField(path), "No coincide la búsqueda de libros");
    }

    @Then("there is no {} displayed in any book")
    public void thereIsNoDeleteButtonDisplayedInAnyBook(String property) {
        Assertions.assertFalse(libraryPage.isElement(property), "Se muestra el botón de eliminar en los libros de la biblioteca de otro usuario");
    }

    @Then("no books search by {} or {} are displayed")
    public void noBooksSearchByOrAreDisplayed(String propertyAuthor, String propertyTitle) {
        Assertions.assertFalse(libraryPage.isElement(propertyAuthor), "Se muestran libros por autor");
        Assertions.assertFalse(libraryPage.isElement(propertyTitle), "Se muestran libros por título");
    }
}
