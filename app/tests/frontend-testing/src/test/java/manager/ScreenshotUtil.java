package manager;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.Augmenter;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ScreenshotUtil {

    public static byte[] takeScreenshot(WebDriver driver, String filename) {
        byte[] screenshotBytes = new byte[0];

        if (driver == null) {
            System.out.println("Driver es null. No se puede tomar screenshot.");
            return screenshotBytes;
        }

        try {
            TakesScreenshot ts;

            if (driver instanceof TakesScreenshot) {
                ts = (TakesScreenshot) driver;
            } else {
                try {
                    // Intentamos augmentar solo si el driver no es TakesScreenshot
                    ts = (TakesScreenshot) new Augmenter().augment(driver);
                } catch (IllegalArgumentException e) {
                    System.out.println("No se pudo augmentar el driver: " + e.getMessage());
                    return screenshotBytes; // devolvemos array vacío
                }
            }

            // Tomar screenshot en bytes para Cucumber
            screenshotBytes = ts.getScreenshotAs(OutputType.BYTES);

            // Guardar screenshot en archivo local
            File srcFile = ts.getScreenshotAs(OutputType.FILE);
            Files.createDirectories(Paths.get("target/screenshots/"));
            File destFile = new File("target/screenshots/" + filename + ".png");
            Files.copy(srcFile.toPath(), destFile.toPath());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return screenshotBytes;
    }
}
