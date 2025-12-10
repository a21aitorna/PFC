package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.Map;

public class BookDetailPage extends AbstractPage {

    public BookDetailPage(WebDriver driver) {
        super(driver);
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

    /**
     * Coge las reviews con el botón de eliminar con la propieda
     * @param property que se pasa
     * @return la lista
     */
    public List<WebElement> deleteReviewsElements(String property){
        String propertyValue = commons.getObjectProperty(property);
        return commons.getAllByXpath(propertyValue);
    }

    /**
     * Verifica que el usuario loegado puede borrar reviews propias y en el caso de admin todas
     * @param property que se pasa
     * @return true si coincide, sino false
     */
    public boolean verifyOnlyUserCanDeleteReview(String property){
        boolean reviewUserIsAllowed=false;
        String username = commons.getSessionVariable("usernameUser").toLowerCase();
        List<WebElement> deleteReviews = deleteReviewsElements(property);
        for(WebElement deleteReviewOption: deleteReviews){
            if(username.equals("admin")){
                String valuePropperty = commons.getObjectProperty("@PROPERTY_DELETE_BUTTON");
                if (deleteReviewOption.findElement(By.xpath(valuePropperty)).isDisplayed()){
                    reviewUserIsAllowed = true;
                }
            }
            else{
                String valueProperty = commons.getObjectProperty("@PROPERTY_USER_LOGGED_CREATED_REVIEW");
                WebElement usernameCreator = deleteReviewOption.findElement(By.xpath(valueProperty));
                String reviewUser = commons.getText(usernameCreator).toLowerCase();

                if(reviewUser.equals(username)){
                    reviewUserIsAllowed = true;
                }
            }
        }
        return reviewUserIsAllowed;
    }

}