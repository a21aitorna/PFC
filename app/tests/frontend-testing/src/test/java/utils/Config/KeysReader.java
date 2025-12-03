package utils.Config;

import java.io.InputStream;
import java.util.Properties;

public class KeysReader {

    private static  final Properties props = new Properties();

    static  {
        try (InputStream input = KeysReader.class.getClassLoader().getResourceAsStream("data/keys/keysES.properties")) {
            if(input == null){
                throw  new RuntimeException("No se encontró el archivo: data/keys/keysES.properties");
            }

            props.load(input);

        } catch (Exception e) {
            throw new RuntimeException("Error cargando keysES.properties", e);
        }
    }

    public static String get(String key) {
        String value = props.getProperty(key);
        if (value == null) {
            throw new RuntimeException("No existe la KEY: " + key);
        }
        return value.trim();
    }
}
