package manager;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.safari.SafariDriver;

public class DriverManager {

    private static WebDriver driver;

    /**
     * Obtener el webdriver activo y maximizar ventana navegador
     * @return webdriver inicializado
     */
    public static WebDriver getDriver() {
        if (driver == null) {
            String browser = System.getProperty("browser", "chrome").toLowerCase();

            switch (browser) {
                case "chrome":
                    WebDriverManager.chromedriver().setup();
                    driver = new ChromeDriver();
                    break;
                case "firefox":
                    WebDriverManager.firefoxdriver().setup();
                    driver = new FirefoxDriver();
                    break;
                case "edge":
                    WebDriverManager.edgedriver().setup();
                    driver = new EdgeDriver();
                    break;
                case "safari":
                    WebDriverManager.safaridriver().setup();
                    driver = new SafariDriver();
                    break;
                default:
                    throw new RuntimeException("Navegador no soportado: "+ browser);
            }
            driver.manage().window().maximize();
           // driver = SlowWebDriver.slow(driver, 600);
        }
        return  driver;
    }

    /**
     * Cerrar el navegdor y eliminar instancia del driver
     */
    public static  void quitDriver() {
        if(driver != null) {
            driver.quit();;
            driver = null;
        }
    }
}
