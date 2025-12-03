package pages;

import manager.DriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.Commons;

public abstract class AbstractPage {

    protected WebDriver driver;
    protected Commons commons;

    public AbstractPage(WebDriver driver) {
        this.driver = driver;
        this.commons = new Commons();
    }

    /**
     * Hace click en un elemento web
     * @param object data-testid del objeto
     */
    public void clickOn(String object){
        String dataTestId = commons.getObjectProperty(object);
        WebElement element = commons.getByDataTestId(dataTestId);
        commons.click(element);
    }//guarfar elemento en varibale de sesion

    /**
     *  Escribe un texto en el campo
     * @param text que se escribirá
     */
    public void writeInInput(String text){//recuperar elemento de la variable de sesion
        commons.inputText();
    }

    /**
     * Devuelve el mensaje de error que se muesta
     * @param object del elemento
     * @return el text de error
     */
    protected String getErrorMessage(String object){
        String dataTestId = commons.getObjectProperty(object);
        commons.waitElementVisible(dataTestId);
        WebElement messageError = commons.getByDataTestId(dataTestId);
        return  messageError.getText();
    }


}
