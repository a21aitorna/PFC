package steps;

import hooks.DriverHooks;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import pages.AdminPage;

import java.util.Arrays;
import java.util.Map;

public class AdminSteps {
    WebDriver driver = DriverHooks.driver;
    AdminPage adminPage = new AdminPage(driver);

    @Then("the user is redirected to configuration table with columns:")
    public void theUserIsRedirectedToConfigurationTableWithColumns(DataTable dataTable) throws InterruptedException {
        Map<String, String> properties = dataTable.asMap(String.class, String.class);
        adminPage.waitUntilTableElementsAreDisplayed();
        Assertions.assertTrue(adminPage.areElementsDisplayed(properties), "El usuario no está en la página de admin");
    }

    @Then("it is displayed the status as {}")
    public void itIsDisplayedTheStatusAs(String property) {
        Assertions.assertTrue(adminPage.getStatusUser(property), "El usuario no está bloqueado");
    }

    @Then("the user is redirected to user's library")
    public void theUserIsRedirectedToUserSLibrary() {
        String actualUsersLibraryName = adminPage.getLibraryName("@PROPERTY_USER_LIBRARY_NAME");
        String[] expectedLibraryNames = {"Test Library", "Library X", "Library TestUser"};

        boolean found=false;

        for(String expectedLibraryName: expectedLibraryNames){
            if(actualUsersLibraryName.equals(expectedLibraryName)){
                found=true;
                break;
            }
        }
        Assertions.assertTrue(found, "El usuario no ha accedido a su biblio"+
                "teca. Uno de los nombres esperados es " + Arrays.toString(expectedLibraryNames) + ", sin embargo es " + actualUsersLibraryName);
    }

    @Then("the user can delete any book")
    public void theUserCanDeleteAnyBook() {
        int numberOfBooks = adminPage.getNumberElements("@PROPERTY_BOOK_DIV");
        int numberDeleteButtons=adminPage.getNumberElements("@PROPERTY_DELETE_BOOK_XPATH");
        Assertions.assertEquals(numberOfBooks, numberDeleteButtons, "El número de libros es "+numberOfBooks+", sin embargo"+
                " sólo hay "+numberDeleteButtons+" botones de borrar");
    }

    @Then("the user can delete any review")
    public void theUserCanDeleteAnyReview() {
        int numberOfReviews = adminPage.getNumberElements("@PROPERTY_CARD_REVIEW");
        int numberDeleteReviews=adminPage.getNumberElements("@PROPERTY_DELETE_REVIEW");
        Assertions.assertEquals(numberOfReviews, numberDeleteReviews, "El número de libros es "+numberOfReviews+", sin embargo"+
                " sólo hay "+numberDeleteReviews+" botones de borrar");
    }
}
