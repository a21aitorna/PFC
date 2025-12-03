package utils.Config;

import java.io.InputStream;
import java.util.Properties;

public class ObjectsReader {

    private static  final Properties props = new Properties();

    static {
        try (InputStream input = ObjectsReader.class.getClassLoader()
                .getResourceAsStream("data/objects/xPathObjects.properties")) {

            if (input == null) {
                throw new RuntimeException("No se encontró xPathObjects.properties");
            }
            props.load(input);

        } catch (Exception e) {
            throw new RuntimeException("Error cargando xPathObjects.properties", e);
        }
    }

    public static String get(String key) {
        String value = props.getProperty(key);
        if (value == null) {
            throw new RuntimeException("No existe el objeto/XPath para: " + key);
        }
        return value.trim();
    }
}
