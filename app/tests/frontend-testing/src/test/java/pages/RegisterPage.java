package pages;

import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class RegisterPage extends  AbstractPage{

    public RegisterPage(WebDriver driver) {super(driver);}

    /**
     * Se obtiene el texto que se muestra en el encabezado de la página de registro
     * @return el texto de registro
     */
    public String getRegisterNameScreen(){
        String path = commons.getObjectProperty("@PROPERTY_REGISTER_SCREEN");
        commons.waitElementVisible("@PROPERTY_REGISTER_SCREEN");
        WebElement nameScreen = commons.getByPath(path);
        return commons.getText(nameScreen);
    }

    /**
     * Se obtiene el texto esperado en el encabezado de la página de registro
     * @return texto registro esperado
     */
    public String getExpectedNameScreen(){
        return commons.getKeyProperty("REGISTER_USER_FIELD");
    }

    /**
     * Se obtiene el texto que se muestra en el encabezado de la página de login
     * @return el texto de login
     */
    public String getLoginNameScreen(){
        String path = commons.getObjectProperty("@PROPERTY_LOGIN_SCREEN");
        commons.waitElementVisible("@PROPERTY_LOGIN_SCREEN");
        WebElement nameScreen = commons.getByPath(path);
        return commons.getText(nameScreen);
    }

    /**
     * Se obtiene el texto esperado en el encabezado de la página de login
     * @return texto login esperado
     */
    public String getExpectedLoginScreen(){
        return commons.getKeyProperty("LOGIN_SCREEN_FIELD");
    }
}
