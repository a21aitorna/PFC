package steps;

import hooks.DriverHooks;
import io.cucumber.java.en.Then;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import pages.RegisterPage;

public class RegisterSteps {
    WebDriver driver = DriverHooks.driver;
    RegisterPage registerPage = new RegisterPage(driver);

    @Then("the user is redirected to register screen")
    public void theUserIsRedirectedToRegisterScreen() {
        String expectedText = registerPage.getExpectedNameScreen();
        String actualText = registerPage.getRegisterNameScreen();
        Assertions.assertEquals(expectedText, actualText, "El usuario no está en la páginad de resgistro. El nombre esperado es " +
                expectedText+", sin embargo el nombre actual es "+actualText);
    }

    @Then("the user is redirected to login screen")
    public void theUserIsRedirectedToLoginScreen() {
        String expectedText = registerPage.getExpectedLoginScreen();
        String actualText = registerPage.getLoginNameScreen();
        Assertions.assertEquals(expectedText, actualText, "El usuario no está en la páginad de resgistro. El nombre esperado es " +
                expectedText+", sin embargo el nombre actual es "+actualText);
    }
}
