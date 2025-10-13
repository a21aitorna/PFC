package steps;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

import java.net.URL;
import java.time.Duration;

public class GoogleSteps {

    private WebDriver driver;

    @Before
    public void setUp() throws Exception {
        // 🚫 Desactivar OpenTelemetry
        System.setProperty("SE_OPENTELEMETRY_DISABLE", "true");
        System.setProperty("SE_OPENTELEMETRY_LOGGING", "false");

        // URL del Selenium Hub
        URL gridUrl = new URL("http://localhost:4444/wd/hub");

        // Elegir navegador: Chrome o Firefox
        String navegador = "chrome"; // o "firefox"

        if (navegador.equalsIgnoreCase("chrome")) {
            ChromeOptions options = new ChromeOptions();
            // ❌ No headless, para que se abra visible
            options.addArguments("--disable-gpu");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--window-size=1920,1080");
            options.setCapability("se:otelEnabled", false);
            options.setCapability("se:recordLogs", false);
            driver = new RemoteWebDriver(gridUrl, options);

        } else if (navegador.equalsIgnoreCase("firefox")) {
            FirefoxOptions options = new FirefoxOptions();
            // ❌ No headless, para que se abra visible
            options.addArguments("--width=1920");
            options.addArguments("--height=1080");
            options.setCapability("se:otelEnabled", false);
            options.setCapability("se:recordLogs", false);
            driver = new RemoteWebDriver(gridUrl, options);
        } else {
            throw new RuntimeException("Navegador no soportado: " + navegador);
        }
    }

    @Given("el usuario abre Google en el navegador")
    public void el_usuario_abre_google() {
        driver.get("https://www.google.com");
    }

    @When("busca {string}")
    public void busca(String termino) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.elementToBeClickable(By.name("q")));
        driver.findElement(By.name("q")).sendKeys(termino);
        driver.findElement(By.name("q")).sendKeys(Keys.ENTER);
    }

    @Then("debería ver resultados relacionados")
    public void debería_ver_resultados_relacionados() {
        int resultados = driver.findElements(By.cssSelector("div.g, .search-results, [data-testid='result']")).size();
        if (resultados == 0) {
            throw new AssertionError("No se encontraron resultados de búsqueda");
        }
        System.out.println("✅ Se encontraron " + resultados + " resultados");
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
