package utils;

public class AteneaUtils {

    private String recoverPassword;
    private String searchbookTerms;
    /**
     * Instancia
     */
    private static  AteneaUtils instance;

    /**
     * Se consigue la instancia
     * @return la instancia
     */
    public static  AteneaUtils getInstance() {
        if(instance==null) {
            instance = new AteneaUtils();
        }
        return instance;
    }
}
