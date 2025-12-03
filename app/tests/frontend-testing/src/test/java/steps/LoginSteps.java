package steps;

import hooks.DriverHooks;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;

public class LoginSteps {
    WebDriver driver = DriverHooks.driver;
    LoginPage loginPage = new LoginPage(driver);

    @Given("the user clicks in the {} field")
    public void clickOnField(String object) {
        loginPage.clickOnField(object);
    }
}

//'(.*)'
