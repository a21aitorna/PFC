package steps;

import hooks.DriverHooks;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import pages.BookDetailPage;

import java.util.List;
import java.util.Map;

public class BookDetailSteps {
    WebDriver driver = DriverHooks.driver;
    BookDetailPage bookDetailPage = new BookDetailPage(driver);

    @When("the user clicks on {} element")
    public void theUserClicksOnElement(String property) {
        bookDetailPage.clickOnElement(property);
    }

    @Then("the user is redirected to book detail screen with details:")
    public void theUserIsRedirectedToScreenWithDetails(DataTable dataTable) {
        Map<String, String> properties = dataTable.asMap(String.class, String.class);
        Assertions.assertTrue(bookDetailPage.areElementsDisplayed(properties), "No se ha accedido al detalle del libro");
    }

    @Then("it is displayed in {} the message {}")
    public void itIsDisplayedInTheMessage(String path, String expectedMessage) {
        String actualMessage = bookDetailPage.getMessage(path);
        Assertions.assertEquals(expectedMessage, actualMessage, "El mensaje esperado es " +expectedMessage+", sin embargo es "+actualMessage);
    }

    @Then("it is displayed this book has {} reviews.")
    public void itIsDisplayedThisBookHasReviews(String expectedNumberReviews) {
        String actualNumberReviews = bookDetailPage.getNumberReviews();
        Assertions.assertEquals(expectedNumberReviews, actualNumberReviews, "El número esperado de reviews es "+expectedNumberReviews +
                ", sin embargo el número actual es " + actualNumberReviews);
    }

    @When("the user selects the rating {}")
    public void theUserSelectsTheRating(String path) {
        bookDetailPage.clickOnElementXpath(path);
    }

    @Then("the review is posted:")
    public void theReviewIsPosted(DataTable dataTable) {
        Map<String, String> properties = dataTable.asMap(String.class, String.class);
        Assertions.assertTrue(bookDetailPage.areElementsDisplayed(properties), "No se muestra la review recién creada");
    }

    @Then("the {} is displayed for the user")
    public void theIsDisplayedForTheUser(String property) {
        Assertions.assertTrue(bookDetailPage.verifyOnlyUserCanDeleteReview(property), "El usuario creador de la review no tiene el botón de eliminar");
    }

    @Then("the {} is not displayed for the user")
    public void theIsNotDisplayedForTheUser(String property) {
        Assertions.assertFalse(bookDetailPage.verifyOnlyUserCanDeleteReview(property), "El usuario logeado no creador de la review tiene el botón de eliminar");
    }
}
