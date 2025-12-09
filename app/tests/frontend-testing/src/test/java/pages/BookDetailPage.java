package pages;

import io.cucumber.datatable.DataTable;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public class BookDetailPage extends AbstractPage {

    public BookDetailPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Verifica si todos los elementos del map aparecen
     * @param properties el map que viene de convertir la datatable en map
     * @return true si toos los elmentos están, sino false
     */
    public boolean areElementsDisplayed(Map<String, String> properties) {
        for (Map.Entry<String, String> entry : properties.entrySet()) {
            String key = entry.getKey();
            String objectProperty = entry.getValue();

            commons.waitElementVisible(objectProperty);
            String xpath = commons.getObjectProperty(objectProperty);
            WebElement element = commons.getByPath(xpath);

            if (!element.isDisplayed()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Conseguir el total de reviews
     * @return una lista elementos
     */
    public List<WebElement> getReviews(){
        String xpath = commons.getObjectProperty("@PROPERTY_CARD_REVIEW");
        return commons.getAllByXpath(xpath);
    }

    /**
     * Se obtiene el número de reviews
     * @return el número de reviews como string
     */
    public String getNumberReviews(){
        return  String.valueOf(getReviews().size());
    }

    /**
     * Verificar si los elementos se muestran
     * @return true si se muestran los elemntos
     */
    public boolean verifyElementIsDisplayed(){
        String pathUsernameRecentReview = commons.getObjectProperty("@PROPERTY_NAME_USER_REVIEW_FIRST");
        String pathDeleteButtonRecentReview = commons.getObjectProperty("@PROPERTY_DELETE_BUTTON_USER_FIRST");
        WebElement usernameRecentReview = commons.getByPath(pathUsernameRecentReview);
        WebElement deleteButtonRecentReview = commons.getByPath(pathDeleteButtonRecentReview);

        if(!usernameRecentReview.isDisplayed() && !deleteButtonRecentReview.isDisplayed()){
            return false;
        }

        return true;
    }

}