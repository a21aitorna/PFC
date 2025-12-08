package steps;

import hooks.DriverHooks;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import pages.RecoverPasswordPage;

public class RecoverPasswordSteps {
    WebDriver driver = DriverHooks.driver;
    RecoverPasswordPage recoverPasswordPage = new RecoverPasswordPage(driver);

    @Given("the user clicks on {} link")
    public void theUserClickOnLink(String property) {
        recoverPasswordPage.clickOnElement(property);
    }

    @Then("the user is redirected to recovery password first page")
    public void theUserIsRedirectedToRecoveryPasswordFirstPage() {
        String expectedRecoverName = recoverPasswordPage.getExpectedRecoverPasswordFirst();
        String actualRecoverName = recoverPasswordPage.getActualRecoverPasswordFirst();
        Assertions.assertEquals(expectedRecoverName, actualRecoverName, "El nombre esperado es "+expectedRecoverName
        +", sin embargo el actual es "+actualRecoverName);
    }

    @Then("the user is redirected to second page from recover password")
    public void theUserIsRedirectedToRecoveryPasswordSecondPage() {
        String expectedRecoverName = recoverPasswordPage.getExpectedRecoverPasswordSecond().trim().replaceAll("\\s+", " ");;
        String actualRecoverName = recoverPasswordPage.getActualRecoverPasswordSecond().trim().replaceAll("\\s+", " ");;
        Assertions.assertEquals(expectedRecoverName, actualRecoverName, "El nombre esperado es "+expectedRecoverName
                +", sin embargo el actual es "+actualRecoverName);

    }
}
