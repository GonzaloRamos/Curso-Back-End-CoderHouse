# Análisis

---

## Pruebas realizadas con artillery 50 conexiones con 20 peticiones cada una:

- A la ruta /infoLog con compresion y sin compresión. Con console log.
- A la ruta /infoNoLog con compresion y sin compresión. Sin console log.

Para /infoLog con compresion en comparación a sin compresion hay una diferencia muy grande en cuanto al rendimiento.

1. Ambos tuvieron 1000 peticiones de status 200
2. Requests_rate con compresion es mucho mayor que sin compresion. 266/sec para el primero 221/sec para el segundo.
3. Las velocidades de respuesta fueron mas rápidas para las de sin compresión. 18 de mínima contra 5 de mínima
4. La compresion obtuvo 2295 ticks 99.4% y la noCompresion 3362 99.6% que muestra la diferencia de consumo de recursos.

La misma lógica de análisis aplica para la ruta de noLog siendo que noLog sin compression tomo 1708 ticks (mucho menos unidades de procesamiento) y 4686 para compresion y sin console Log.
