package steps;

import hooks.DriverHooks;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import utils.Commons;

public class CommonSteps {
    WebDriver driver = DriverHooks.driver;
    LoginPage loginPage = new LoginPage(driver);
    Commons commons = new Commons();

    @Given("the user writes in {} its {string}")
    public void writeInputField(String property, String text) {
        if(text.equals("SeleniumUser")){
            text += System.currentTimeMillis();
        }

        if(property.equals("@PROPERTY_USERNAME_LOGIN")){
            commons.setSessionVariable("usernameUser", text);
        }

        if(property.equals("@PROPERTY_PASSWORD_RECOVER") && text.isEmpty()){
            String password = commons.generatePassword();
            commons.setSessionVariable("recoverPassword", password);
            text=password;
        }

        if(property.equals("@PROPERTY_VERIFY_PASSWORD_RECOVER") && text.isEmpty()){
            text = commons.getSessionVariable("recoverPassword");
        }

        if (property.equals("@PROPERTY_SEARCH_BOOKS")){
            commons.setSessionVariable("searchbookTerms", text);
        }
        loginPage.writeInInput(property, text);
    }

    @When("the user clicks on {} button")
    public void clickOnButtonStep(String property) {
        loginPage.clickOnElement(property);

    }
}
