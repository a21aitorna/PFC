package utils;

public class AteneaUtils {

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
