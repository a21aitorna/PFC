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
     * Inicializar driver
     */
    @Before
    public void setup(){
        driver = DriverManager.getDriver();
        driver.get("https://pfcfront-pre.up.railway.app/");
    }

    /**
     * Se ejecuta después de cada escenario. Cierra navegador y en caso de fallo hace captura y la adjunta al informe
     * @param scenario que se ejecuta
     */
    @After
    public void tearDown(Scenario scenario) {
        if(scenario.isFailed()) {
            byte[] screenshot = ScreenshotUtil.takeScreenshot(driver, scenario.getName().replaceAll(" ", "_"));
            scenario.attach(screenshot, "image/png", scenario.getName().replaceAll(" ", "_"));
        }
        DriverManager.quitDriver();
    }
}
