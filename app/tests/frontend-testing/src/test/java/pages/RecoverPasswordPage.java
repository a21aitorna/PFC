package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class RecoverPasswordPage extends AbstractPage{

    public RecoverPasswordPage(WebDriver driver)  {super(driver);}

    /**
     * Se obtiene el nombre de la página esperado
     * @return el nombre esperado
     */
    public String getExpectedRecoverPasswordFirst(){
        return  commons.getKeyProperty("RECOVER_PASSWORD_FIELD");
    }

    /**
     * Se obtiene el nombre actual de la página
     * @return el nombre actual
     */
    public String getActualRecoverPasswordFirst(){
        String path = commons.getObjectProperty("@PROPERTY_RECOVER_PASSWORD_SCREEN");
        commons.waitElementVisible("@PROPERTY_RECOVER_PASSWORD_SCREEN");
        WebElement recoverPassword1 = commons.getByPath(path);
        return  commons.getText(recoverPassword1);
    }

    /**
     * Se obtiene la frase de introducción de usuario de la segunda página esperada
     * @return el nombre esperado
     */
    public String getExpectedRecoverPasswordSecond(){
        return  commons.getKeyProperty("RECOVER_PASSWORD_USERNAME_SECOND");
    }

    /**
     * Se obtiene la frase de introducción de usuario de la segunda  página
     * @return el nombre actual
     */
    public String getActualRecoverPasswordSecond(){
        String path = commons.getObjectProperty("@PROPERTY_RECOVER_PASSWORD_SCREEN_SECOND_SCREEN");
        commons.waitElementVisible("@PROPERTY_RECOVER_PASSWORD_SCREEN_SECOND_SCREEN");
        WebElement recoverPassword1 = commons.getByPath(path);
        return  commons.getText(recoverPassword1);
    }
}
