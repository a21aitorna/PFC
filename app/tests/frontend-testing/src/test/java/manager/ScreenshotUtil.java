package manager;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ScreenshotUtil {

    public static byte[] takeScreenshot(WebDriver driver, String filename){
        byte[] screenshotBytes = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);

        try {
            File srcFile= ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            Files.createDirectories(Paths.get("target/screenshots/"));
            File destFile = new File("target/screenshots/" + filename + ".png");
            Files.copy(srcFile.toPath(), destFile.toPath());
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        return screenshotBytes;
    }
}
