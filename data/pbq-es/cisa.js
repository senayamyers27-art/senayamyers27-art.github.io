/* Spanish translation of the CISA exam simulations. Same ids and structure as data/pbq/cisa.js. */
CertHub.addPbqs("cisa", [
  { id: "sampling-deviation-rate", d: 1, type: "fill", title: "Muestreo por atributos: ¿puedes confiar en el control?",
    prompt: "Usa la hoja de muestreo de abajo para completar cada valor. Escribe solo números en los dos primeros campos y sí o no en el último.",
    context: "Control probado: todo cambio en producción tiene aprobación antes del despliegue\nPoblación: 2,000 tickets de cambio del año\nMétodo de selección: sistemático, inicio aleatorio, cada 40.º ticket\nTasa de desviación tolerable: 5%\n\nResultados: 3 cambios de la muestra no tenían aprobación antes del despliegue",
    fields: [
      { label: "Número de elementos en la muestra (2,000 / 40)", answers: ["50"] },
      { label: "Tasa de desviación de la muestra en porcentaje", answers: ["6", "6%", "6.0", "6.0%", "6,0"] },
      { label: "¿La tasa de desviación supera la tasa tolerable? (sí o no)", answers: ["sí", "si", "Sí", "Si", "SI", "SÍ"] }
    ],
    explain: "Un intervalo de muestreo de 40 sobre 2,000 elementos da una muestra de 50. Tres desviaciones en 50 son una tasa de desviación del 6%, que supera la tasa tolerable del 5%, así que el auditor no puede confiar en el control de aprobación tal como está diseñado. El siguiente paso es evaluar las causas de las desviaciones y ampliar las pruebas sustantivas de los cambios. Reemplazar los elementos fallidos por otros, o declarar eficaz el control porque la mayoría pasó, sería incorrecto." },
  { id: "finding-elements", d: 1, type: "match", title: "Arma un hallazgo de auditoría",
    prompt: "Un auditor está redactando un hallazgo sobre accesos de usuarios. Relaciona cada frase con el elemento del hallazgo que representa.",
    pairs: [
      ["\"Catorce cuentas de personal que se fue hace más de 30 días seguían habilitadas.\"", "Condición"],
      ["\"El estándar de control de acceso exige deshabilitar las cuentas dentro de un día hábil tras la baja.\"", "Criterio"],
      ["\"RR. HH. avisa las bajas a TI por correo y no hay conciliación entre bajas y cuentas activas.\"", "Causa"],
      ["\"Exempleados todavía podían acceder a datos de clientes, y dos cuentas se usaron después de la salida del titular.\"", "Efecto"],
      ["\"Vincular las bajas de RR. HH. con la desactivación automática y conciliar bajas contra cuentas cada mes.\"", "Recomendación"]
    ],
    extra: ["Alcance", "Opinión de auditoría"],
    explain: "La condición es lo que el auditor observó y el criterio es lo que debería ser, aquí el estándar de acceso. La causa explica por qué existe la brecha (un proceso de bajas manual y sin conciliar) y el efecto es el riesgo o impacto. La recomendación ataca la causa, no solo el síntoma. El alcance y la opinión pertenecen al informe en su conjunto, no a un hallazgo individual." },
  { id: "audit-engagement-flow", d: 1, type: "order", title: "Ejecuta un trabajo de auditoría de SI",
    prompt: "Ordena correctamente estos pasos de un trabajo de auditoría de SI basado en riesgos.",
    steps: [
      "Entender el proceso de negocio, los sistemas y los riesgos clave",
      "Definir objetivos y alcance de la auditoría e identificar los controles clave",
      "Elaborar el programa de auditoría con los procedimientos de prueba",
      "Realizar el trabajo de campo y documentar la evidencia en papeles de trabajo",
      "Discutir los hallazgos con la gerencia en la reunión de cierre",
      "Emitir el informe con las respuestas de la gerencia",
      "Dar seguimiento a las acciones correctivas acordadas"
    ],
    explain: "Un trabajo basado en riesgos empieza por entender el negocio y sus riesgos, que luego definen los objetivos, el alcance y los controles a probar. El programa de auditoría se escribe antes del trabajo de campo para que las pruebas estén planificadas y no improvisadas. Los hallazgos se discuten con la gerencia para confirmar hechos y obtener respuestas antes de emitir el informe, y el seguimiento verifica que las acciones acordadas se realizaron. Elegir pruebas o herramientas antes de entender los riesgos es una trampa común del examen." },
  { id: "sod-conflicts", d: 2, type: "select", title: "Encuentra los conflictos de segregación de funciones",
    prompt: "La matriz de accesos de abajo muestra las funciones asignadas al personal de un departamento de TI mediano. Selecciona cada asignación que sea una combinación incompatible que el auditor debe reportar.",
    context: "Persona    Funciones asignadas\nAna        Desarrolla código de aplicaciones; pasa el código a producción\nBen        Administrador de seguridad; aprueba sus propias solicitudes de acceso\nCarla      Mesa de ayuda; restablece contraseñas tras verificar la identidad\nDavid      Administrador de base de datos; revisa los registros de su propia actividad de DBA\nElena      Gerente de cambios; aprueba solicitudes de cambio creadas por otros\nFarid      Auxiliar de cuentas por pagar; registra facturas y aprueba pagos",
    options: [
      "Ana: desarrolla código y lo pasa a producción",
      "Ben: administrador de seguridad que aprueba sus propias solicitudes de acceso",
      "Carla: restablece contraseñas en la mesa de ayuda tras verificar la identidad",
      "David: revisa los registros de su propia actividad de DBA",
      "Elena: aprueba solicitudes de cambio creadas por otros",
      "Farid: registra facturas y aprueba los pagos"
    ],
    answers: [0, 1, 3, 5],
    explain: "Ana puede poner en producción código no probado o no autorizado sin que nadie más intervenga. Ben puede otorgarse cualquier acceso. Que David revise su propia actividad no es una revisión independiente, así que no compensa su acceso privilegiado. Farid puede crear y aprobar un pago fraudulento por sí solo. Los restablecimientos de contraseña de Carla con verificación de identidad y que Elena apruebe cambios de otras personas son funciones normales que no combinan tareas incompatibles." },
  { id: "soc-report-match", d: 2, type: "match", title: "Elige el informe de aseguramiento correcto",
    prompt: "Una organización depende de varios proveedores de servicios. Relaciona cada necesidad de aseguramiento con el informe que mejor la cubre.",
    pairs: [
      ["El auditor financiero externo necesita aseguramiento sobre los controles de un procesador de nómina que afectan los estados financieros", "SOC 1 Tipo 2"],
      ["Compras quiere ver si los controles de seguridad de un proveedor SaaS están bien diseñados a una fecha dada", "SOC 2 Tipo 1"],
      ["El equipo de seguridad necesita evidencia probada de que los controles de seguridad y disponibilidad de un proveedor de nube operaron durante doce meses", "SOC 2 Tipo 2"],
      ["Marketing quiere un resumen de uso general de los controles de un proveedor que pueda compartirse públicamente", "SOC 3"],
      ["El último informe SOC terminó en junio y el auditor necesita la declaración del proveedor sobre los controles desde entonces", "Carta puente (bridge letter)"]
    ],
    extra: ["Informe de prueba de penetración", "Certificado ISO 9001"],
    explain: "El SOC 1 cubre los controles relevantes para la información financiera de los clientes, y el Tipo 2 incluye pruebas de eficacia operativa durante un periodo. El SOC 2 cubre los criterios de servicios de confianza como seguridad y disponibilidad; el Tipo 1 trata el diseño en un momento dado y el Tipo 2 agrega la eficacia operativa durante un periodo. El SOC 3 es un resumen de uso general sin resultados detallados de las pruebas. Una carta puente es una declaración de la gerencia que cubre el periodo entre el fin del último informe y el presente; no está probada de forma independiente." },
  { id: "earned-value-status", d: 3, type: "fill", title: "Valor ganado: ¿cuál es el estado real del proyecto?",
    prompt: "El informe de estado de abajo afirma que el proyecto va bien. Calcula cada valor. Escribe números simples; usa signo menos para valores negativos y dos decimales para los índices.",
    context: "Proyecto: reemplazo del portal de clientes (estado al mes 6)\nValor planificado (PV):   $500,000\nValor ganado (EV):        $400,000\nCosto real (AC):          $450,000",
    fields: [
      { label: "Variación de costo (EV - AC)", answers: ["-50000", "-50,000", "-$50,000", "-$50000"] },
      { label: "Variación de cronograma (EV - PV)", answers: ["-100000", "-100,000", "-$100,000", "-$100000"] },
      { label: "Índice de desempeño de costo (EV / AC)", answers: ["0.89", ".89", "0,89"] },
      { label: "Índice de desempeño del cronograma (EV / PV)", answers: ["0.80", "0.8", ".8", ".80", "0,8", "0,80"] }
    ],
    explain: "La variación de costo es 400,000 - 450,000 = -50,000, así que el proyecto está sobre el presupuesto. La variación de cronograma es 400,000 - 500,000 = -100,000, así que va atrasado. El CPI es 400,000 / 450,000 = 0.89 y el SPI es 400,000 / 500,000 = 0.80; ambos por debajo de 1 significan que el proyecto obtiene menos de un dólar de trabajo planificado por cada dólar gastado y avanza más lento de lo previsto. El auditor debe reportar que el estado 'va bien' no tiene sustento y que el comité directivo necesita un pronóstico revisado y una revisión del caso de negocio." },
  { id: "data-conversion-steps", d: 3, type: "order", title: "Planifica una conversión de datos controlada",
    prompt: "Una empresa está migrando sus registros de clientes a un nuevo sistema. Ordena correctamente los pasos de la conversión de datos.",
    steps: [
      "Identificar los datos de origen y asignar a los dueños de los datos",
      "Depurar los datos de origen y definir el mapeo de campos y las reglas de conversión",
      "Ejecutar una conversión de prueba en un entorno de pruebas",
      "Conciliar conteos de registros, totales de control y totales hash, y resolver excepciones",
      "Obtener la aprobación del dueño de los datos sobre los resultados conciliados",
      "Realizar la conversión final en el corte y volver a conciliar",
      "Conservar los datos antiguos en solo lectura hasta verificar el nuevo sistema"
    ],
    explain: "Primero deben conocerse los dueños, porque ellos deciden qué es correcto y aprueban al final. La depuración y el mapeo van antes de cualquier ejecución, y las conversiones de prueba en un entorno aparte detectan errores de mapeo sin riesgo. La conciliación con conteos y totales es el control clave, y la aprobación del dueño confirma los resultados antes de la conversión final. La ejecución final se vuelve a conciliar, y los datos antiguos se conservan hasta verificar el nuevo sistema para poder corregir errores o revertir el cambio." },
  { id: "change-evidence-review", d: 4, type: "select", title: "Revisa la evidencia de gestión de cambios",
    prompt: "Rastreaste una muestra de despliegues a producción desde el registro del pipeline hasta sus tickets de cambio. Selecciona cada cambio que sea una excepción que el auditor debe reportar.",
    context: "Cambio  Desarrollador  Aprobador  Aprobado       Desplegado     Probado  Desplegado por\nCH-101  Lee            Morgan     03-02 10:00    03-04 22:00    Sí       Equipo de liberación\nCH-102  Patel          Patel      03-05 09:00    03-06 21:00    Sí       Equipo de liberación\nCH-103  Wong           Morgan     03-09 16:00    03-08 23:00    Sí       Equipo de liberación\nCH-104  Silva          Morgan     03-11 11:00    03-12 22:00    No       Equipo de liberación\nCH-105  Okafor         Reyes      03-14 10:00    03-15 22:00    Sí       Okafor\nCH-106  Lee            Reyes      03-18 09:00    03-19 21:00    Sí       Equipo de liberación",
    options: [
      "CH-101",
      "CH-102",
      "CH-103",
      "CH-104",
      "CH-105",
      "CH-106"
    ],
    answers: [1, 2, 3, 4],
    explain: "CH-102 lo aprobó la misma persona que lo desarrolló, así que la aprobación no es independiente. CH-103 se desplegó el 03-08, antes de su aprobación del 03-09, por lo que en la práctica no estaba autorizado. CH-104 llegó a producción sin evidencia de pruebas. CH-105 lo desplegó su propio desarrollador, rompiendo la separación entre desarrollo y paso a producción. CH-101 y CH-106 tienen aprobación independiente antes del despliegue, evidencia de pruebas y despliegue por el equipo de liberación." },
  { id: "resilience-terms", d: 4, type: "match", title: "Objetivos y sitios de recuperación",
    prompt: "Relaciona cada frase de un taller de análisis de impacto al negocio con el término que describe.",
    pairs: [
      ["\"Podemos perder como máximo 15 minutos de pedidos.\"", "Objetivo de punto de recuperación (RPO)"],
      ["\"El sistema de pedidos debe volver a funcionar en 4 horas.\"", "Objetivo de tiempo de recuperación (RTO)"],
      ["\"Después de 24 horas caídos, el daño al negocio se vuelve inaceptable.\"", "Tiempo máximo tolerable de inactividad (MTD)"],
      ["\"Durante la recuperación podemos aceptar procesar el 60% del volumen normal de pedidos.\"", "Objetivo de entrega del servicio (SDO)"],
      ["\"Una instalación en espera con equipos y datos actuales que puede asumir la operación en horas.\"", "Sitio caliente"],
      ["\"Una instalación con solo energía, enfriamiento y espacio; hay que llevar los equipos.\"", "Sitio frío"]
    ],
    extra: ["Tiempo medio entre fallas (MTBF)", "Acuerdo recíproco"],
    explain: "El RPO limita la pérdida de datos y define la frecuencia de respaldo o replicación; el RTO es el tiempo objetivo para restablecer; el MTD es el punto a partir del cual el impacto es inaceptable, así que el RTO debe ser menor que el MTD. El SDO es el nivel de servicio reducido aceptable mientras se opera en modo de recuperación. Un sitio caliente puede asumir la operación en horas porque tiene equipos y datos actuales, mientras que un sitio frío solo tiene la instalación básica y tarda semanas en ponerse en servicio." },
  { id: "access-review-exceptions", d: 5, type: "select", title: "Revisión de accesos de usuarios",
    prompt: "Estás probando el acceso a la aplicación financiera. Compara la lista de cuentas con los datos de RR. HH. y selecciona cada cuenta que el auditor debe reportar como excepción.",
    context: "Datos de RR. HH.: M. Grant se fue el 05-15; T. Novak pasó de Cuentas por Pagar a Marketing el 06-01\nPolítica: deshabilitar dentro de 1 día hábil tras la baja; las cuentas inactivas (sin inicio de sesión en 90+ días) deben revisarse\nFecha de revisión: 09-30\n\nCuenta      Titular    Rol en la app          Último acceso  Estado\nagrant      M. Grant   Auxiliar CxP           06-02          Habilitada\ntnovak      T. Novak   Auxiliar CxP           09-28          Habilitada\nsvc_batch   (ninguno)  Servicio - registro    09-30          Habilitada\nlchen       L. Chen    Supervisora CxP        09-29          Habilitada\nadmin       compartida Administrador app      09-27          Habilitada\nrdiaz       R. Diaz    Analista de contab.    03-11          Habilitada",
    options: [
      "agrant",
      "tnovak",
      "svc_batch",
      "lchen",
      "admin",
      "rdiaz"
    ],
    answers: [0, 1, 2, 4, 5],
    explain: "agrant pertenece a alguien que se fue en mayo y se usó después de su salida, lo que es una falla grave del proceso de bajas. tnovak conserva acceso de cuentas por pagar después de pasar a marketing, un caso de acumulación de privilegios. svc_batch no tiene un titular nombrado, así que nadie rinde cuentas por su acceso. La cuenta admin compartida impide atribuir las acciones a una persona. rdiaz no ha iniciado sesión en más de 90 días y debe revisarse como cuenta inactiva. lchen es la supervisora actual de CxP con actividad reciente, así que su acceso es coherente con su rol." },
  { id: "firewall-rule-review", d: 5, type: "select", title: "Revisión de reglas de firewall",
    prompt: "El firewall perimetral procesa las reglas de arriba hacia abajo. La política exige denegar por defecto, un dueño de negocio para cada regla y registro en las reglas que permiten tráfico entrante. Selecciona cada regla que el auditor debe reportar.",
    context: "#  Origen          Destino             Puerto  Acción    Dueño            Registro\n1  Internet        DMZ web             443     Permitir  Comercio en línea Sí\n2  Cualquiera      Cualquiera          Todos   Permitir  (ninguno)        No\n3  Internet        Gateway de correo   25      Permitir  Mensajería TI    Sí\n4  Internet        Servidor de BD      1433    Permitir  (ninguno)        No\n5  Subred admin    DMZ web             22      Permitir  Operaciones TI   Sí\n6  Cualquiera      Cualquiera          Todos   Denegar   Seguridad        Sí",
    options: [
      "Regla 1",
      "Regla 2",
      "Regla 3",
      "Regla 4",
      "Regla 5",
      "Regla 6"
    ],
    answers: [1, 3],
    explain: "La regla 2 permite cualquier tráfico en cualquier dirección cerca del inicio de la lista, así que todas las reglas restrictivas de abajo, incluida la denegación final, quedan anuladas en la práctica; además no tiene dueño ni registro. La regla 4 expone un servidor de base de datos directamente a internet, no tiene dueño y no se registra. Las reglas 1 y 3 permiten servicios específicos expuestos a internet con dueño y registro, la regla 5 limita la administración a una subred de administración y la regla 6 es la denegación por defecto requerida." }
]);
