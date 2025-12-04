package  utils;

import manager.DriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.Config.KeysReader;
import utils.Config.ObjectsReader;

import java.time.Duration;
import java.util.List;

public class Commons {

    private WebDriver driver;
    private static final int DEFAULT_TIMEOUT = 10;


    public Commons() {
        this.driver = DriverManager.getDriver();
    }

    /**
     * Si objectReference tiene formato Xpath devuelve el objeto By correspondiente
     * @param objectReference seleccionado
     * @return objeto By
     */
    private By getBy(String objectReference) {
        String objectProperty = getObjectProperty(objectReference);
        // XPath
        if(objectProperty.matches("^[(|.]?[(]?/(/)?.*$")) {
            return By.xpath(objectProperty);
        }
        // id
        if(objectProperty.startsWith("id=")) {
            return By.id(objectProperty.substring("id=".length()));
        }
        // Por defecto, data-testid
        return By.cssSelector("[data-testid='" + objectProperty + "']");
    }


    /**
     * Se lee la key del keyProperties
     * @param key que deseas
     * @return el valor de key
     */
    public String getKeyProperty(String key) {
        return KeysReader.get(key);
    }

    /**
     * Se lee el object del xpathObject
     * @param pathObject que se desea
     * @return el valor del object
     */
    public String getObjectProperty(String pathObject){
        return ObjectsReader.get(pathObject);
    }

    /**
     * Navegar a la url
     * @param url que quieres ir
     */
    public void navigateTo(String url) {
        driver.navigate().to(url);
    }

    /**
     * Recargar página
     */
    public void reloadPage() {
        driver.navigate().refresh();
    }

    /**
     * Encontrar elemento
     * @param objectReference seleccionado
     * @return elemento web a buscar
     */
    public WebElement findElement(String objectReference) {
        return  driver.findElement(getBy(objectReference));
    }

    /**
     * Recuperar el elemento por xpath
     * @param xpath del elementp
     * @return elemento web
     */
    public WebElement getByPath(String xpath) {
        return  driver.findElement(By.xpath(xpath));
    }

    /**
     * Recuperar el elemento por data-testid
     * @param dataTestId del elemento
     * @return elemento web
     */
    public WebElement getByDataTestId(String dataTestId) {
        return driver.findElement(By.cssSelector("[data-testid='" + dataTestId + "']"));
    }

    /**
     * Devuelve una lista de webElements
     * @param xpath del elementp
     * @return una lista de elementos
     */
    public List<WebElement> getAllByXpath(String xpath) {
        return  driver.findElements(By.xpath(xpath));
    }

    /**
     * Hacer click en el elemento
     * @param element webElement
     */
    public void click(WebElement element) {
        element.click();
    }

    /**
     * Introducir texto
     * @param element webElement
     * @param text a introducir
     */
    public void inputText(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
    }

    /**
     * Recuperar texto
     * @param element webElement
     * @return texto
     */
    public String getText(WebElement element) {
        return  element.getText();
    }

    /**
     * Comprueba si se muestra el elemento
     * @param element webElement
     * @return true si se muestra, false si no
     */
    public boolean isDisplayed(WebElement element){
        return element.isDisplayed();
    }

    /**
     * Comprueba si está habilitado el elemento
     * @param element webElement
     * @return true si está habilitado, false si no
     */
    public boolean isEnabled(WebElement element){
        return  element.isEnabled();
    }

    /**
     * Esperar a que se visualice el elemento
     * @param object que se tiene que ver
     */
    public void waitElementVisible(String object) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
        wait.until(ExpectedConditions.visibilityOfElementLocated(getBy(object)));
    }

    /**
     * Esperar a que se visualice un elemento
     * @param element que se quiere ver
     */
    public void waitElementVisible(WebElement element) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
         wait.until(ExpectedConditions.visibilityOf(element));
    }

    /**
     * Esperar a que desaparezca el elemento
     * @param object que tiene que desaparecer
     */
    public void waitElementInvisible(String object) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(getBy(object)));
    }

    /**
     * Esperar a que el elemento se pueda hacer click
     * @param object que se tiene que hacer click
     */
    public void waitElementClickable(String object) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
        wait.until(ExpectedConditions.elementToBeClickable(getBy(object)));
    }

    /**
     * Esperar a que el elemento esté en el dom
     * @param object que tiene que estar en el dom
     */
    public void waitElementPresent(String object) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
        wait.until(ExpectedConditions.presenceOfElementLocated(getBy(object)));
    }

    /**
     * Esperar unos
     * @param timeInSeconds que quieres
     */
    public void wait(float timeInSeconds) {
        try {
            Thread.sleep((long) (timeInSeconds * 1000L));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}