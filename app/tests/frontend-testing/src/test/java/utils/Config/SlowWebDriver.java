package utils;

import org.openqa.selenium.WebDriver;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class SlowWebDriver {

    public static WebDriver slow(WebDriver driver, int delayMs) {
        return (WebDriver) Proxy.newProxyInstance(
                driver.getClass().getClassLoader(),
                new Class[]{WebDriver.class},
                new SlowInvocationHandler(driver, delayMs)
        );
    }

    private static class SlowInvocationHandler implements InvocationHandler {

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
            slow();
            return method.invoke(driver, args);
        }
    }
}
