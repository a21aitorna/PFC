Feature: Búsqueda en Google

  @prueba
  Scenario: Buscar información sobre Selenium Grid
    Given el usuario abre Google en el navegador
    When busca "Selenium Grid con Docker"
    Then debería ver resultados relacionados
