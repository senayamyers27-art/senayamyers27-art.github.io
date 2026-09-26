/* Spanish translation of the CompTIA Data+ exam simulations. Same ids and structure as data/pbq/data-plus.js. */
CertHub.addPbqs("data-plus", [
  { id: "data-store-match", d: 1, type: "match", title: "Relaciona almacenes de datos con sus descripciones",
    prompt: "Una empresa está revisando dónde viven sus datos. Relaciona cada almacén de datos con la descripción que mejor le corresponde.",
    pairs: [
      ["Data warehouse", "Historial limpio e integrado de muchos sistemas, modelado para reportes (schema on write)"],
      ["Data lake", "Archivos sin procesar de cualquier tipo guardados en su formato nativo, estructurados solo al leerlos (schema on read)"],
      ["Data mart", "Un subconjunto enfocado en un tema, creado para un solo departamento, como finanzas"],
      ["Base de datos OLTP", "Maneja muchas inserciones y actualizaciones pequeñas y rápidas que sostienen las operaciones diarias"],
      ["Base de datos de grafos", "Almacena nodos y relaciones para responder rápidamente preguntas de conexiones de varios saltos"]
    ],
    extra: ["Almacena valores que solo pueden recuperarse mediante una única clave", "Una hoja de cálculo que se comparte por correo cada mes"],
    explain: "Los warehouses aplican un esquema cuando se cargan los datos e integran historial limpio, mientras que los lakes guardan datos sin procesar y aplican la estructura al momento de leerlos. Un data mart es una porción más pequeña de un área temática, a menudo de un warehouse. Los sistemas OLTP registran las transacciones a medida que ocurren, y las bases de datos de grafos almacenan las relaciones directamente. La descripción de clave-valor corresponde a un almacén clave-valor, que no está en la lista." },

  { id: "data-type-match", d: 1, type: "match", title: "Elige el tipo de dato correcto para cada columna",
    prompt: "Estás definiendo las columnas de una nueva tabla de pedidos de clientes. Relaciona cada valor de ejemplo con el tipo de dato más apropiado.",
    context: "Column          Sample value\nzip_code        02134\nunit_price      19.99   (must total exactly to the cent)\norder_date      2025-03-14\nopted_in        TRUE\nunits_in_stock  42",
    pairs: [["zip_code", "String (texto)"], ["unit_price", "Decimal de precisión fija"], ["order_date", "Fecha (date)"], ["opted_in", "Boolean"], ["units_in_stock", "Entero (integer)"]],
    extra: ["Objeto binario grande (BLOB)", "Punto flotante (floating point)"],
    explain: "Los códigos postales son identificadores, así que el texto conserva el cero inicial. El dinero necesita un tipo decimal exacto; el punto flotante guarda aproximaciones binarias que pueden desviarse un centavo en los totales. Una fecha de calendario va en un tipo date para que se ordene y agrupe correctamente, un indicador de sí/no es un Boolean y una cantidad de unidades es un número entero." },

  { id: "sql-having-result", d: 2, type: "fill", title: "Predice el resultado de una consulta con GROUP BY",
    prompt: "Lee la tabla orders y la consulta, y luego completa lo que devuelve la consulta.",
    context: "orders\norder_id | region | amount | status\n1        | East   | 300    | Complete\n2        | West   | 450    | Complete\n3        | East   | 250    | Cancelled\n4        | North  | 200    | Complete\n5        | West   | 150    | Complete\n6        | East   | 400    | Complete\n7        | North  | 350    | Complete\n8        | West   | 100    | Cancelled\n\nSELECT region, SUM(amount) AS revenue\nFROM orders\nWHERE status = 'Complete'\nGROUP BY region\nHAVING SUM(amount) > 575\nORDER BY revenue DESC;",
    fields: [
      { label: "Número de filas devueltas", answers: ["2", "dos"] },
      { label: "Región en la primera fila", answers: ["East"] },
      { label: "Revenue en la primera fila", answers: ["700"] },
      { label: "Revenue de West", answers: ["600"] }
    ],
    explain: "WHERE se ejecuta primero y elimina los dos pedidos cancelados. Al agrupar las filas restantes se obtiene East 300 + 400 = 700, West 450 + 150 = 600 y North 200 + 350 = 550. HAVING conserva solo los grupos mayores a 575, así que North queda fuera, y ORDER BY revenue DESC pone a East primero. Contar las filas canceladas daría, de forma incorrecta, 950 para East y 700 para West." },

  { id: "sql-logical-order", d: 2, type: "order", title: "Ordena el procesamiento lógico de una consulta SQL",
    prompt: "Una consulta usa SELECT, FROM, WHERE, GROUP BY, HAVING y ORDER BY. Pon las cláusulas en el orden en que la base de datos las procesa lógicamente.",
    steps: [
      "FROM: identifica la(s) tabla(s) de origen y aplica los joins",
      "WHERE: filtra filas individuales",
      "GROUP BY: agrupa las filas restantes",
      "HAVING: filtra los grupos usando agregaciones",
      "SELECT: calcula las columnas de salida y los alias",
      "ORDER BY: ordena el resultado final"
    ],
    explain: "SQL se escribe empezando por SELECT, pero se procesa empezando por FROM. Como WHERE se ejecuta antes que GROUP BY, no puede usar agregaciones como SUM; esas condiciones van en HAVING. SELECT se ejecuta después de HAVING, por eso un alias de columna normalmente funciona en ORDER BY, pero no en WHERE." },

  { id: "dq-flag-rows", d: 2, type: "select", title: "Marca las filas con problemas de calidad de datos",
    prompt: "Perfila este extracto de clientes. Selecciona cada fila que deba marcarse por un problema de calidad de datos. En los duplicados, marca solo la copia posterior.",
    context: "cust_id | name       | email                  | state  | birth_date\nC101    | Ana Lopez  | ana.lopez@example.com  | CA     | 1988-04-12\nC102    | Ben Ortiz  | ben.ortiz@example      | TX     | 1991-11-03\nC103    | Chloe Park | chloe.park@example.com | NY     | 1979-07-22\nC104    | Dev Rao    |                        | WA     | 1995-02-30\nC105    | Ana Lopez  | ana.lopez@example.com  | CA     | 1988-04-12\nC106    | Eli Stone  | eli.stone@example.com  | Calif. | 1983-09-09\nC107    | Fay Green  | fay.green@example.com  | OR     | 2090-01-15\nC108    | Gus Hall   | gus.hall@example.com   | IL     | 1970-12-01",
    options: ["C101", "C102", "C103", "C104", "C105", "C106", "C107", "C108"],
    answers: [1, 3, 4, 5, 6],
    explain: "El email de C102 no tiene dominio de nivel superior, así que no es válido. A C104 le falta el email y tiene una fecha imposible (30 de febrero). C105 repite exactamente a C101, así que la copia posterior es un duplicado. C106 usa 'Calif.' en lugar del código de dos letras, lo cual es un formato inconsistente. La fecha de nacimiento de C107 está en el futuro. C101, C103 y C108 pasan todas las verificaciones." },

  { id: "descriptive-stats-fill", d: 3, type: "fill", title: "Calcula estadísticas descriptivas",
    prompt: "Un equipo de soporte registró estos tiempos de resolución de tickets en horas. Calcula las estadísticas de abajo.",
    context: "Resolution times (hours), sorted:\n4, 7, 7, 8, 10, 12, 13, 15, 32",
    fields: [
      { label: "Media", answers: ["12", "12.0"] },
      { label: "Mediana", answers: ["10", "10.0"] },
      { label: "Moda", answers: ["7"] },
      { label: "Rango", answers: ["28"] }
    ],
    explain: "Los nueve valores suman 108, así que la media es 108 ÷ 9 = 12. Con nueve valores ordenados, la mediana es el quinto, 10. El valor 7 aparece dos veces, así que es la moda, y el rango es 32 − 4 = 28. El único ticket de 32 horas jala la media por encima de la mediana, señal de un sesgo a la derecha, así que la mediana describe mejor un ticket típico." },

  { id: "performance-math", d: 3, type: "fill", title: "Calcula el cambio, la varianza y un z-score",
    prompt: "Usa las cifras de abajo para completar cada valor. Escribe números simples; usa un signo menos para los valores negativos.",
    context: "Quarterly revenue\nQ1 actual: 80,000\nQ2 actual: 92,000\nQ2 budget: 100,000\n\nAgent quality scores: mean 70, standard deviation 6\nAgent Kim's score: 85",
    fields: [
      { label: "Cambio porcentual del revenue de Q1 a Q2 (%)", answers: ["15", "15%", "+15", "+15%"] },
      { label: "Varianza de Q2 frente al presupuesto (real menos presupuesto)", answers: ["-8000", "-8,000"] },
      { label: "Varianza de Q2 como porcentaje del presupuesto (%)", answers: ["-8", "-8%"] },
      { label: "z-score de Kim", answers: ["2.5", "+2.5"] }
    ],
    explain: "El cambio porcentual se divide entre el valor anterior: (92,000 − 80,000) ÷ 80,000 = 15%. La varianza frente al plan es 92,000 − 100,000 = −8,000, y al dividir entre el presupuesto da −8%. El z-score es (85 − 70) ÷ 6 = 2.5, lo que significa que Kim obtuvo dos desviaciones estándar y media por encima de la media. Dividir entre el valor nuevo o real en lugar del valor base es el error clásico." },

  { id: "ab-test-read", d: 3, type: "select", title: "Interpreta el resultado de una prueba A/B",
    prompt: "Lee el resumen de la prueba A/B. Selecciona cada afirmación que sea una interpretación correcta.",
    context: "Test: new checkout page (B) vs current page (A)\nVisitors A: 10,000   Conversions A: 480   Rate A: 4.80%\nVisitors B: 10,000   Conversions B: 545   Rate B: 5.45%\nDifference (B - A): +0.65 percentage points\n95% CI for difference: +0.04 to +1.26 percentage points\np-value: 0.037   Significance level (alpha): 0.05",
    options: [
      "El resultado es estadísticamente significativo al nivel del 5%",
      "Se rechaza la hipótesis nula de que no hay diferencia",
      "Hay una probabilidad del 3.7% de que la hipótesis nula sea verdadera",
      "El aumento relativo (lift) en la tasa de conversión es de aproximadamente 13.5%",
      "El intervalo de confianza incluye el cero, así que el resultado no es concluyente",
      "La prueba demuestra que la página B aumenta la conversión en todos los segmentos de clientes",
      "Con un nivel de significancia de 0.01, el resultado no sería significativo"
    ],
    answers: [0, 1, 3, 6],
    explain: "Como 0.037 es menor que 0.05, el resultado es significativo y se rechaza la hipótesis nula; no sería significativo con 0.01. El lift relativo es 0.65 ÷ 4.80, aproximadamente 13.5%. Un p-value no es la probabilidad de que la hipótesis nula sea verdadera, el intervalo (+0.04 a +1.26) no incluye el cero y una prueba general no dice nada sobre cada segmento." },

  { id: "chart-choice-match", d: 4, type: "match", title: "Elige el gráfico adecuado para cada pregunta",
    prompt: "Los stakeholders enviaron estas solicitudes para un nuevo dashboard. Relaciona cada solicitud con el visual más adecuado.",
    pairs: [
      ["¿Cómo ha cambiado el revenue mensual en los últimos 36 meses?", "Gráfico de líneas"],
      ["¿Cuál de nuestras seis líneas de producto generó más revenue este año?", "Gráfico de barras"],
      ["¿Está relacionado el gasto en publicidad con las ventas en nuestras 200 tiendas?", "Gráfico de dispersión (scatter plot)"],
      ["¿Cómo se distribuyen los tiempos de entrega de los pedidos?", "Histograma"],
      ["¿Cómo se comparan las medianas salariales, la dispersión y los valores atípicos entre cinco departamentos?", "Diagrama de caja (box plot)"],
      ["¿Qué estados generan más revenue?", "Mapa coroplético (filled map)"]
    ],
    extra: ["Gráfico circular (pie chart)", "Indicador (gauge)"],
    explain: "Las líneas muestran tendencias en el tiempo, las barras comparan categorías y los gráficos de dispersión revelan relaciones entre dos variables numéricas. Un histograma muestra la distribución de una variable numérica, y un box plot compara distribuciones, incluidos los valores atípicos, entre grupos. Un mapa coroplético sirve para comparaciones geográficas. Un gráfico circular solo funciona para pocas partes de un mismo total, y un gauge muestra un único valor frente a una meta." },

  { id: "dashboard-review", d: 4, type: "select", title: "Revisa un borrador de dashboard",
    prompt: "Un colega te pide revisar este borrador de dashboard ejecutivo. Selecciona cada elemento que sea un problema de diseño o de reporte.",
    context: "1. Title: 'Monthly Sales, Jan 2024 – Dec 2025'\n2. KPI cards top left: Revenue, Orders, Avg order value, each with a vs-target arrow\n3. Bar chart of revenue by region, y-axis starts at 900,000\n4. Line chart of monthly revenue for the last 24 months\n5. 3D pie chart with 11 product categories\n6. Status column uses red or green cell fill only, with no text or icons\n7. Region slicer at the top, applied to all visuals\n8. Footer 'Data as of' field is blank",
    options: ["Elemento 1: título", "Elemento 2: tarjetas de KPI", "Elemento 3: gráfico de barras por región", "Elemento 4: gráfico de líneas mensual", "Elemento 5: gráfico circular de productos", "Elemento 6: columna de estado", "Elemento 7: segmentador (slicer) de región", "Elemento 8: pie de página"],
    answers: [2, 4, 5, 7],
    explain: "Un gráfico de barras debe empezar en cero; de lo contrario, las diferencias pequeñas parecen enormes. Un pie 3D con 11 porciones distorsiona los tamaños y es ilegible; un gráfico de barras ordenado funciona mejor. Usar solo el color deja fuera a los lectores con deficiencia en la visión del color, así que agrega texto o íconos. Una fecha de corte en blanco impide saber qué tan actuales son los datos. El título, las tarjetas de KPI, la línea de tendencia y el slicer global siguen buenas prácticas." },

  { id: "governance-roles", d: 5, type: "match", title: "Identifica los roles de gobierno de datos",
    prompt: "Relaciona cada persona o actividad con el rol de gobierno de datos que representa.",
    pairs: [
      ["El VP de Ventas aprueba quién puede acceder a los datos del pipeline de clientes", "Data owner (propietario de los datos)"],
      ["Un especialista de operaciones de ventas mantiene la definición de 'lead calificado' y sus reglas de calidad", "Data steward (administrador de los datos)"],
      ["Un administrador de bases de datos configura los backups, el cifrado y los permisos", "Data custodian (custodio de los datos)"],
      ["Un analista crea un reporte semanal a partir del dataset certificado", "Data consumer (consumidor de datos)"],
      ["Un cliente cuyos datos están almacenados en el CRM", "Data subject (titular de los datos)"]
    ],
    extra: ["Data auditor (auditor de datos)"],
    explain: "El owner es el líder de negocio responsable que decide la clasificación y el acceso. El steward gestiona las definiciones y la calidad en el día a día, y el custodian implementa los controles técnicos que decide el owner. Los consumers usan los datos según la política, y el data subject es la persona a la que describen los datos personales. Confundir al owner con el custodian es el error más común." },

  { id: "phi-deidentify", d: 5, type: "select", title: "Elige las columnas que debes quitar antes de compartir",
    prompt: "Un hospital enviará un extracto de visitas a un proveedor externo para un análisis de volumen a nivel regional. Selecciona cada columna que debe eliminarse o desidentificarse antes de compartir.",
    context: "patient_visits extract (one row per visit)\npatient_name          e.g. 'Maria Chen'\nmedical_record_number e.g. 'MRN-0048213'\ndate_of_birth         e.g. '1964-08-19'\nhome_street_address   e.g. '12 Elm Street'\nclinic_region         e.g. 'Northeast' (multi-state region)\nvisit_year            e.g. '2025'\ndepartment            e.g. 'Cardiology'\npatient_email         e.g. 'm.chen@example.com'",
    options: ["patient_name", "medical_record_number", "date_of_birth", "home_street_address", "clinic_region", "visit_year", "department", "patient_email"],
    answers: [0, 1, 2, 3, 7],
    explain: "Los nombres, los números de expediente, las fechas de nacimiento completas, las direcciones y los correos electrónicos identifican a personas, así que, vinculados a las visitas, convierten el extracto en PHI. Una región de varios estados, solo el año y el departamento no son identificadores directos y sirven para el análisis a nivel regional. Conservar solo los campos que el proveedor necesita también sigue el principio de mínimo necesario." }
]);
