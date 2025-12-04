package utils.Config;

import java.io.InputStream;
import java.util.Properties;

public class ObjectsReader {

    private static  final Properties props = new Properties();

    static {
        try (InputStream input = ObjectsReader.class.getClassLoader()
                .getResourceAsStream("data/objects/pathObjects.properties")) {

            if (input == null) {
                throw new RuntimeException("No se encontró pathObjects.properties");
            }
            props.load(input);

        } catch (Exception e) {
            throw new RuntimeException("Error cargando pathObjects.properties", e);
        }
    }

    public static String get(String key) {
        String value = props.getProperty(key);
        if (value == null) {
            throw new RuntimeException("No existe el objeto/path para: " + key);
        }
        return value.trim();
    }
}
