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
    public void clickOnButton(String object){
        commons.waitElementVisible(object);
        String dataTestId = commons.getObjectProperty(object);
        WebElement element = commons.getByDataTestId(dataTestId);
        commons.click(element);
    }

    /**
     *  Escribe un texto en el campo
     * @param text que se escribirá
     */
    public void writeInInput(String object, String text){
        commons.waitElementVisible(object);
        String dataTestId = commons.getObjectProperty(object);
        WebElement element = commons.getByDataTestId(dataTestId);
        commons.inputText(element, text);
    }

    /**
     * Devuelve el mensaje de error que se muesta
     * @return el text de error
     */
    public String getErrorMessage(){
        commons.waitElementVisible("@ERROR_MESSAGE_DISPLAY");
        String dataTestId = commons.getObjectProperty("@ERROR_MESSAGE_DISPLAY");
        WebElement messageError = commons.getByDataTestId(dataTestId);
        return  messageError.getText();
    }


}
