package steps;

import hooks.DriverHooks;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;

public class LoginSteps {
    WebDriver driver = DriverHooks.driver;
    LoginPage loginPage = new LoginPage(driver);

    @Given("the user writes in {} its {string}")
    public void theUserWritesInIts(String property, String text) {
        loginPage.writeInInput(property, text);
    }

    @When("the user clicks on login button")
    public void theUserClicksOnLoginButton() {


    }

    @Then("the user is redirected to its library")
    public void theUserIsRedirectedToItsLibrary() {
    }
}

