package steps;

import dev.failsafe.internal.util.Assert;
import hooks.DriverHooks;
import io.cucumber.java.en.Given;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;

public class ExampleSteps {

    WebDriver driver = DriverHooks.driver;

    @Given("el usuario abre Google en el navegador")
    public void openGoogle() {
        driver.get("cs");
        Assertions.assertEquals("da","as", "abc");
    }
}