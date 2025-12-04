package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage extends AbstractPage{

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Devuelve el nombre de la biblioteca del usuario
     * @return
     */
    public String getLibraryName(){
        String libraryNameString = commons.getObjectProperty("@PROPERTY_USER_LIBRARY_NAME");
        WebElement libraryName = commons.getByDataTestId(libraryNameString);
        commons.waitElementVisible(libraryName);
        return commons.getText(libraryName);
    }



}
