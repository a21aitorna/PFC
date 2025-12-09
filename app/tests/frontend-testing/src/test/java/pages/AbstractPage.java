package pages;

import manager.DriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.Commons;

import java.util.List;

public abstract class AbstractPage {

    protected WebDriver driver;
    protected Commons commons;

    public AbstractPage(WebDriver driver) {
        this.driver = driver;
        this.commons = new Commons();
    }

    /**
     * Hace click en un elemento web por data-testid
     * @param object data-testid del objeto
     */
    public void clickOnElement(String object){
        commons.waitElementVisible(object);
        String dataTestId = commons.getObjectProperty(object);
        WebElement element = commons.getByDataTestId(dataTestId);
        commons.click(element);
    }

    /**
     * Hace click en un elmento web por xpath
     * @param object xpath del objeto
     */
    public void clickOnElementXpath(String object){
        commons.waitElementVisible(object);
        String xpath = commons.getObjectProperty(object);
        WebElement element = commons.getByPath(xpath);
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

    /**
     * Devuelve el mensaje
     * @param path el path del mensaje
     * @return el texto del mensaje
     */
    public String getMessage(String path){
        commons.waitElementVisible(path);
        String dataTestId = commons.getObjectProperty(path);
        WebElement message = commons.getByDataTestId(dataTestId);
        return message.getText();
    }

    /**
     * Comprobar si existe el elemento
     * @return true false si existe, sino true
     */
    public boolean isElement(String property){
        List<WebElement> elements = commons.findElements(property);
        return !elements.isEmpty();
    }

}
