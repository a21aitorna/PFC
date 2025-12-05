package steps;

import dev.failsafe.internal.util.Assert;
import hooks.DriverHooks;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import utils.Commons;


public class LoginSteps {
    WebDriver driver = DriverHooks.driver;
    LoginPage loginPage = new LoginPage(driver);

    @Given("the user writes in {} its {string}")
    public void writeInputField(String property, String text) {
        loginPage.writeInInput(property, text);
    }

    @When("the user clicks on {} button")
    public void clickOnButtonStep(String property) {
        loginPage.clickOnButton(property);

    }

    @Then("the user is redirected to its library")
    public void theUserIsRedirectedToItsLibrary() {
        String actualLibraryName = loginPage.getLibraryName();
        String expectedLibraryName = "Test Library";
        Assertions.assertEquals(expectedLibraryName, actualLibraryName, "El usuario no ha accedido a su biblio"+
                "teca. El nombre esperado es " + expectedLibraryName + ", sin embargo es " + actualLibraryName);
    }

    @Then("it is displayed the error {}")
    public void displayed(String messageError) {
        String actualError = loginPage.getErrorMessage();
        Assertions.assertEquals(messageError, actualError, "El error esperado es "+messageError+", sin embargo es " +actualError);
    }

    @Then("the password is not displayed")
    public void thePasswordIsNotDisplayed() {
        String value = "password";
        Assertions.assertTrue(loginPage.veryInputPasswordType(value), "El type no es el esperado");
    }

    @When("the user click on {} button")
    public void theUserClickOnButton(String property) {
        loginPage.clickOnButton(property);
    }

    @Then("the password is displayed as text")
    public void thePasswordIsDisplayedAsText() {
        String value="text";
        Assertions.assertTrue(loginPage.veryInputPasswordType(value));
    }
}

