package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.io.File;
import java.util.List;

public class LibraryPage extends AbstractPage{

    public LibraryPage(WebDriver driver) { super(driver);}

    /**
     * Subir archivo
     * @param bookPath la ruta relativa del archivo
     */
    public void uploadBook(String bookPath){
        File file = new File(bookPath);

        String absolutePath = file.getAbsolutePath();

        WebElement upload = commons.getByPath("//input[@type='file']");
        upload.sendKeys(absolutePath);
    }

    /**
     * Confirma una alerta
     */
    public void confirmAlert(){
        commons.handleAlert(true);
    }

    /**
     * Deniega una alerta
     */
    public void denyAlert(){
        commons.handleAlert(false);
    }
    /**
     * Verifica si el libro ha sido subido por su título (a través del xpath de títulos, el primero le corresponde)
     * @return true si el título se visualiza
     */
    public boolean titleIsDisplayed(){
        commons.waitElementVisible("@PROPERTY_TITLE_UPLOADED_BOOK");
        String property = commons.getObjectProperty("@PROPERTY_TITLE_UPLOADED_BOOK");
        WebElement element = commons.getByPath(property);
        return element.isDisplayed();
    }

    /**
     * Hace click en una de las opciones del dropdown
     * @param property nombre de la propiedad
     */
    public void clickOnDropdown(String property){
        commons.waitElementVisible(property);
        String propertyValue = commons.getObjectProperty(property);
        WebElement element = commons.getByPath(propertyValue);
        commons.click(element);
    }

    /**
     * Devuelve una lista de libros que coincide con el término buscado
     * @param property el nombre de la propiedad
     * @return una lista de libros que coincide con lo buscado
     */
    public List<WebElement> searchedBooks(String property){
        commons.waitElementVisible(property);
        String valueProperty = commons.getObjectProperty(property);
        return commons.getAllByXpath(valueProperty);
    }

    /**
     * Recorre la lista de libros y comprueba si coincide los términos buscados con el texto del property que se pasa como parámetro
     * @param property que tienen los libros buscados
     * @return true si coinciden, sino false
     */
    public boolean verifyBookField(String property){
        List<WebElement> books = searchedBooks(property);

        String searchedText = commons.getSessionVariable("searchbookTerms").toLowerCase();

        if(books.isEmpty()){
            System.err.println("No hay libros");
            return false;
        }
        for(WebElement book : books){
            String fieldBook = commons.getText(book).toLowerCase();
            if(!fieldBook.contains(searchedText)){
                return false;
            }
        }
        return true;
    }




}
