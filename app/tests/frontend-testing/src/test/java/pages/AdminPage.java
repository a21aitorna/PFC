package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class AdminPage extends AbstractPage{

    public AdminPage(WebDriver driver) {super(driver);}

    /**
     * Mostrar tabla admin
     */
    public void waitUntilTableElementsAreDisplayed(){
        commons.waitElementClickable("@PROPERTY_FIRST_ROW");
        commons.wait(2.0F);
    }

    /**
     * Verifica que se muestra el estado esperado
     * @param property que se pasa
     * @return true si se muestra, snio false
     */
    public boolean getStatusUser(String property){
        commons.wait(2.0F);
        commons.waitElementVisible(property);
        String propertyValue = commons.getObjectProperty(property);
        WebElement elementStatus = commons.getByPath(propertyValue);
        return elementStatus.isDisplayed();
    }
}
