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
        commons.waitElementVisible("@PROPERTY_USER_LIBRARY_NAME");
        commons.wait(0.5F);
        WebElement libraryName = commons.getByDataTestId(libraryNameString);
        return commons.getText(libraryName);
    }

    public boolean veryInputPasswordType(String attributeValue){
        String passwordInputProperty = commons.getObjectProperty("@PROPERTY_PASSWORD_LOGIN");
        WebElement inputPassword = commons.getByDataTestId(passwordInputProperty);
        String typeValue = inputPassword.getAttribute("type");
        return  typeValue.equals(attributeValue);
    }


}
