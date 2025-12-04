package manager;

import org.openqa.selenium.TakesScreenshot; // Importar TakesScreenshot
import org.openqa.selenium.WebDriver;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class SlowWebDriver {

    public static WebDriver slow(WebDriver driver, int delayMs) {

        // 1. Obtener todas las interfaces que implementa el driver original (ej. ChromeDriver)
        Set<Class<?>> interfaces = new HashSet<>();
        Class<?> current = driver.getClass();
        while (current != null) {
            interfaces.addAll(Arrays.asList(current.getInterfaces()));
            current = current.getSuperclass();
        }

        // 2. Asegurar que TakesScreenshot esté incluido, aunque generalmente ya lo estará.
        interfaces.add(WebDriver.class);
        interfaces.add(TakesScreenshot.class); // <-- Aseguramos la inclusión explícita

        // 3. Crear el proxy usando *todas* las interfaces encontradas.
        return (WebDriver) Proxy.newProxyInstance(
                driver.getClass().getClassLoader(),
                interfaces.toArray(new Class[0]), // 👈 Ahora usa TODAS las interfaces
                new SlowInvocationHandler(driver, delayMs)
        );
    }

    private static class SlowInvocationHandler implements InvocationHandler {
        // ... (El resto de la clase SlowInvocationHandler es el mismo)

        private final WebDriver driver;
        private final int delayMs;

        public SlowInvocationHandler(WebDriver driver, int delayMs) {
            this.driver = driver;
            this.delayMs = delayMs;
        }

        private void slow() {
            try {
                Thread.sleep(delayMs);
            } catch (InterruptedException ignored) {
            }
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // No ralentizar la captura de pantalla, solo los comandos de Selenium
            if (!method.getName().equals("getScreenshotAs")) {
                slow();
            }

            return method.invoke(driver, args);
        }
    }
}