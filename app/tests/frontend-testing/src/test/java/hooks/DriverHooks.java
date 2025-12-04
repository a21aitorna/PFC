package hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import manager.DriverManager;
import manager.ScreenshotUtil;
import org.openqa.selenium.WebDriver;

public class DriverHooks {

    public static WebDriver driver;

    /**
     * Inicializar driver antes de cada escenario
     */
    @Before
    public void setup(){
        driver = DriverManager.getDriver();
        driver.get("https://pfcfront-pre.up.railway.app/");
    }

    /**
     * Ejecutado después de cada escenario. Toma captura si falla y cierra driver
     */
    @After
    public void tearDown(Scenario scenario) {
        if (driver != null && scenario.isFailed()) {
            byte[] screenshot = ScreenshotUtil.takeScreenshot(driver, scenario.getName().replaceAll(" ", "_"));
            if (screenshot.length > 0) {
                scenario.attach(screenshot, "image/png", scenario.getName().replaceAll(" ", "_"));
            } else {
                System.out.println("No se pudo tomar captura para el escenario: " + scenario.getName());
            }
        }

        DriverManager.quitDriver();
    }
}
