package steps;

import dev.failsafe.internal.util.Assert;
import hooks.DriverHooks;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;

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
        String expectedLibraryName = "Test Librarys";
        Assertions.assertEquals(expectedLibraryName, actualLibraryName, "El usuario no ha accedido a su biblio"+
                "teca. El nombre esperado es " + expectedLibraryName + ", sin embargo es " + actualLibraryName);
    }
}

