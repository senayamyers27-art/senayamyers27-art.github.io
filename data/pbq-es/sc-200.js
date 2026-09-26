/* Spanish translation of the SC-200 exam simulations. Same ids and structure as data/pbq/sc-200.js. */
CertHub.addPbqs("sc-200", [
  { id: "sentinel-rule-types", d: 1, type: "match", title: "Relaciona los tipos de reglas de analytics de Sentinel con su comportamiento",
    prompt: "Tu líder del SOC te pide explicar los tipos de reglas de analytics disponibles en Microsoft Sentinel. Relaciona cada tipo de regla con la descripción que le corresponde.",
    pairs: [
      ["Scheduled", "Ejecuta tu propia consulta KQL con el intervalo y el período de lookback que defines, con umbrales, entity mapping y agrupación de alertas"],
      ["Near-real-time (NRT)", "Ejecuta una consulta KQL aproximadamente una vez por minuto para lograr la detección más rápida posible, con más limitaciones que el tipo estándar basado en consultas"],
      ["Microsoft security (incident creation)", "Crea incidentes de Sentinel a partir de alertas generadas por otros productos de seguridad de Microsoft, filtradas por producto y severidad"],
      ["Anomaly", "Plantillas integradas de machine learning que escriben los resultados en la tabla Anomalies; puedes ajustar parámetros, pero no reescribir la lógica"],
      ["Fusion", "Correlaciona con machine learning muchas alertas y anomalías de baja fidelidad entre productos para detectar ataques de varias etapas"]
    ],
    extra: ["Ejecuta un search job sobre datos archivados y restaura los resultados en una tabla nueva"],
    explain: "Las reglas Scheduled son el caballo de batalla: tu KQL, tu programación y tu lookback. Las reglas NRT cambian flexibilidad por velocidad y se ejecutan cada minuto. Las reglas Microsoft security solo convierten alertas existentes de los productos en incidentes (y se desactivan cuando Sentinel se incorpora al portal de Defender, que correlaciona las alertas por sí mismo). Las reglas Anomaly son plantillas de ML ajustables, y Fusion correlaciona señales débiles en incidentes de varias etapas de alta confianza. Los search jobs son una función de datos a largo plazo, no un tipo de regla." },

  { id: "sentinel-roles-match", d: 1, type: "match", title: "Asigna el rol correcto de Microsoft Sentinel",
    prompt: "Relaciona cada requisito de tu SOC con el rol integrado de Microsoft Sentinel de menor privilegio que lo cumple.",
    pairs: [
      ["Un gerente necesita ver incidentes, workbooks y reglas de analytics, pero no debe cambiar nada", "Microsoft Sentinel Reader"],
      ["Un analista de Tier 1 debe asignar incidentes, cambiar su estado y cerrarlos, pero no debe editar reglas de analytics", "Microsoft Sentinel Responder"],
      ["Un ingeniero de detección debe crear y editar reglas de analytics, workbooks y watchlists", "Microsoft Sentinel Contributor"],
      ["El propio servicio de Sentinel necesita permiso sobre un grupo de recursos para que las automation rules puedan ejecutar playbooks ahí", "Microsoft Sentinel Automation Contributor"]
    ],
    extra: ["Owner", "Log Analytics Reader"],
    explain: "Reader es solo de lectura, Responder agrega la gestión de incidentes (asignar, cambiar estado, cerrar) y Contributor agrega la creación y edición de contenido, como reglas de analytics y workbooks. Automation Contributor se otorga a la cuenta de servicio de Sentinel para que las automation rules puedan adjuntar y disparar playbooks; no está pensado para usuarios humanos. Owner funcionaría para varias filas, pero viola el principio de mínimo privilegio." },

  { id: "asr-rollout-order", d: 1, type: "order", title: "Despliega una regla de attack surface reduction de forma segura",
    prompt: "Debes habilitar la regla ASR 'Block Office applications from creating child processes' en 4,000 dispositivos sin romper las macros del negocio. Pon estos pasos en el orden correcto.",
    steps: [
      "Desplegar la regla en modo audit en todos los dispositivos objetivo",
      "Dejarla correr durante un tiempo y revisar los eventos de auditoría en el reporte de ASR o en advanced hunting (DeviceEvents, ActionType que empieza con 'Asr')",
      "Agregar exclusiones acotadas de archivos o carpetas para las aplicaciones legítimas del negocio que la regla habría bloqueado",
      "Cambiar la regla a modo block para un grupo piloto pequeño de dispositivos y monitorear",
      "Extender el modo block al resto de los grupos de dispositivos por etapas"
    ],
    explain: "El modo audit registra lo que la regla bloquearía sin afectar a los usuarios, así que siempre va primero. Revisar los datos de auditoría te dice qué aplicaciones legítimas necesitan exclusiones, y las exclusiones deben estar listas antes de bloquear. Un despliegue por etapas (piloto y luego anillos más amplios) limita el alcance si algo se pasó por alto; el modo warn es un paso intermedio opcional para reglas que ven los usuarios." },

  { id: "windows-eventid-fill", d: 1, type: "fill", title: "Elige los event IDs de Windows Security para una DCR",
    prompt: "Estás creando una data collection rule (DCR) con un filtro XPath personalizado para que el Azure Monitor Agent envíe solo los eventos de Windows Security que necesitan tus detecciones. Escribe el event ID de cada actividad.",
    context: "DCR xPathQueries (partial)\n  \"Security!*[System[(EventID=????)]]\"\n\nDetecciones requeridas:\n  - Fuerza bruta: inicios de sesión fallidos\n  - Ejecución sospechosa de procesos (con la auditoría de línea de comandos habilitada)\n  - Antiforense: alguien borró el log de Security\n  - Persistencia: se creó un nuevo usuario local o de dominio",
    fields: [
      { label: "Una cuenta no pudo iniciar sesión", answers: ["4625"] },
      { label: "Se creó un nuevo proceso", answers: ["4688"] },
      { label: "Se borró el log de auditoría (Security)", answers: ["1102"] },
      { label: "Se creó una cuenta de usuario", answers: ["4720"] }
    ],
    explain: "4625 es un inicio de sesión fallido (4624 es el exitoso), 4688 es la creación de procesos e incluye la línea de comandos cuando esa política de auditoría está habilitada, 1102 registra el borrado del log de Security y 4720 registra una nueva cuenta de usuario. Filtrar la DCR solo a los IDs que usan tus reglas es la forma principal de mantener asequible el conector Windows Security Events." },

  { id: "mfa-fatigue-select", d: 2, type: "select", title: "Detecta un ataque de MFA fatigue en los logs de inicio de sesión",
    prompt: "Microsoft Entra ID Protection marcó a jlee@example.com. Revisa el extracto de SigninLogs y selecciona todos los inicios de sesión que forman parte de un ataque de MFA fatigue (push bombing).",
    context: "TimeGenerated(UTC)  UserPrincipalName   IPAddress      Loc  ResultType  ResultDescription\n02:11:04  jlee@example.com   203.0.113.45   RO   500121  Authentication failed during strong authentication request (user declined)\n02:12:30  jlee@example.com   203.0.113.45   RO   500121  Authentication failed during strong authentication request (user declined)\n02:14:02  jlee@example.com   203.0.113.45   RO   500121  Authentication failed during strong authentication request (user declined)\n02:15:40  jlee@example.com   203.0.113.45   RO   0       Success (MFA completed in app)\n08:02:11  jlee@example.com   198.51.100.20  US   0       Success (MFA completed in app)\n08:31:55  mkim@example.com   198.51.100.20  US   50126   Invalid username or password\n08:32:20  mkim@example.com   198.51.100.20  US   0       Success (MFA completed in app)",
    options: [
      "02:11:04 jlee desde 203.0.113.45, 500121 el usuario rechazó",
      "02:12:30 jlee desde 203.0.113.45, 500121 el usuario rechazó",
      "02:14:02 jlee desde 203.0.113.45, 500121 el usuario rechazó",
      "02:15:40 jlee desde 203.0.113.45, éxito",
      "08:02:11 jlee desde 198.51.100.20, éxito",
      "08:31:55 mkim desde 198.51.100.20, 50126 contraseña no válida",
      "08:32:20 mkim desde 198.51.100.20, éxito"
    ],
    answers: [0, 1, 2, 3],
    explain: "El error 500121 significa que la contraseña ya era correcta y el inicio de sesión falló en el paso de MFA, así que los rechazos repetidos desde una IP extranjera desconocida a las 2 a.m. muestran a un atacante que conoce la contraseña y está enviando notificaciones push sin parar. El éxito de las 02:15 desde la misma IP es el usuario que finalmente aprueba, y ese es el compromiso real. El inicio de sesión de las 08:02 viene de la IP habitual de la oficina en horario laboral, y el único error de tipeo de mkim seguido de un éxito es un comportamiento normal. Respuesta: confirmar el usuario como comprometido, revocar sesiones, restablecer la contraseña y habilitar number matching." },

  { id: "mde-response-match", d: 2, type: "match", title: "Elige la acción de respuesta correcta de Defender for Endpoint",
    prompt: "Durante un incidente necesitas tomar varias acciones sobre dispositivos en Microsoft Defender for Endpoint. Relaciona cada objetivo con la acción de respuesta que lo logra.",
    pairs: [
      ["Desconectar el dispositivo de la red manteniendo su conexión con el servicio de Defender", "Isolate device"],
      ["Permitir que en el dispositivo solo se ejecuten ejecutables firmados por Microsoft", "Restrict app execution"],
      ["Recopilar autoruns, programas instalados, conexiones de red y logs de eventos en un zip para análisis offline", "Collect investigation package"],
      ["Abrir un shell remoto para ejecutar scripts y descargar un archivo sospechoso del dispositivo", "Initiate live response session"],
      ["Terminar un proceso malicioso y mover su archivo a cuarentena en este dispositivo", "Stop and quarantine file"]
    ],
    extra: ["Add file indicator (block)", "Run antivirus scan"],
    explain: "El aislamiento mantiene conectado el sensor de Defender para que puedas seguir investigando y respondiendo. Restrict app execution aplica una política de integridad de código que solo permite archivos firmados por Microsoft. El investigation package es una instantánea forense, mientras que live response da acceso remoto interactivo para scripts y recolección de archivos. Stop and quarantine actúa sobre el archivo en el dispositivo afectado; un indicador de bloqueo es la opción correcta para impedir que el mismo hash se ejecute en cualquier parte de la organización." },

  { id: "phish-removal-order", d: 2, type: "order", title: "Elimina un correo de phishing que ya se entregó",
    prompt: "Los usuarios reportan un correo de phishing de credenciales que se entregó en muchos buzones. Usando Defender for Office 365 Plan 2, pon estos pasos en el orden correcto.",
    steps: [
      "Abrir Threat Explorer y filtrar por el remitente, el asunto o la URL del mensaje reportado",
      "Seleccionar todas las copias entregadas del mensaje en los resultados",
      "Elegir Take action y enviar una corrección de soft delete (mover a Deleted Items)",
      "Pedir a un aprobador autorizado que apruebe la corrección pendiente en el Action center",
      "Confirmar que la acción terminó en la pestaña History del Action center y luego revisar qué usuarios hicieron clic en la URL"
    ],
    explain: "Threat Explorer es donde encuentras cada copia entregada usando los indicadores del reporte. La corrección que eliges ahí crea una acción que debe aprobarse en el Action center (a menos que tengas permiso para aprobar directamente), y la pestaña History confirma que se ejecutó. Revisar después los clics en la URL permite encontrar a los usuarios que pudieron haber ingresado sus credenciales y a quienes hay que revocarles las sesiones y restablecerles la contraseña." },

  { id: "mdi-alert-match", d: 2, type: "match", title: "Relaciona la evidencia de ataques de identidad con la técnica",
    prompt: "Microsoft Defender for Identity generó varias alertas. Relaciona cada comportamiento observado con la técnica de ataque que indica.",
    pairs: [
      ["Una estación de trabajo, no un controlador de dominio, envió una solicitud de replicación del directorio pidiendo datos de contraseñas de cuentas", "DCSync"],
      ["Se usó un TGT de Kerberos con una duración mucho mayor que la de la política del dominio y un PAC falsificado", "Golden Ticket"],
      ["Un hash NTLM robado de un host se reutilizó para autenticarse en otro host sin la contraseña en texto claro", "Pass-the-hash"],
      ["Una cuenta de usuario solicitó tickets de servicio de Kerberos para muchos SPN en poco tiempo", "Kerberoasting"]
    ],
    extra: ["Password spray", "AS-REP roasting"],
    explain: "DCSync abusa de los derechos de replicación (DRSUAPI) para que un equipo que no es DC pueda extraer hashes de contraseñas. Un Golden Ticket es un TGT falsificado con el hash robado de KRBTGT, y por eso la solución es restablecer KRBTGT dos veces. Pass-the-hash reutiliza directamente un hash NTLM, y Kerberoasting solicita tickets de servicio en masa para descifrar offline las contraseñas de las cuentas de servicio. Password spraying y AS-REP roasting dejan otra evidencia: muchas cuentas con una misma contraseña y cuentas con la preautenticación deshabilitada, respectivamente." },

  { id: "kql-encoded-ps-fill", d: 3, type: "fill", title: "Completa una consulta de hunting de PowerShell codificado",
    prompt: "Completa la consulta de advanced hunting para que encuentre PowerShell ejecutado con un comando codificado y cuente las ejecuciones por dispositivo y cuenta, de mayor a menor. Escribe el operador que falta en cada espacio.",
    context: "DeviceProcessEvents\n| where Timestamp > ago(7d)\n| where FileName =~ \"powershell.exe\"\n| where ProcessCommandLine ___1___ (\"-enc\", \"-EncodedCommand\")\n| ___2___ Executions = count() by DeviceName, AccountName\n| ___3___ Executions desc",
    fields: [
      { label: "Espacio 1 (coincide con cualquier término de la lista)", answers: ["has_any"] },
      { label: "Espacio 2 (agrega filas)", answers: ["summarize"] },
      { label: "Espacio 3 (ordena los resultados)", answers: ["order by", "sort by"] }
    ],
    explain: "has_any devuelve las filas cuya columna contiene cualquiera de los términos completos listados y es más rápido que contains porque usa el índice de términos. summarize con count() by agrupa las filas y produce un conteo por dispositivo y cuenta. order by (o su sinónimo sort by) con desc pone primero las ejecuciones más frecuentes." },

  { id: "kql-operator-match", d: 3, type: "match", title: "Relaciona los operadores de KQL con su propósito",
    prompt: "Un nuevo hunter está aprendiendo KQL en Microsoft Sentinel. Relaciona cada operador o función con lo que hace.",
    pairs: [
      ["project", "Elige, renombra o reordena las columnas que se conservan"],
      ["extend", "Agrega una columna calculada y conserva todas las columnas existentes"],
      ["mv-expand", "Convierte cada elemento de un arreglo dynamic en su propia fila"],
      ["parse_json", "Convierte una cadena JSON en un valor dynamic al que puedes acceder por índice"],
      ["bin", "Redondea hacia abajo las marcas de tiempo en intervalos de tamaño fijo para agregaciones por tiempo"],
      ["let", "Asocia un nombre a un valor, una lista o una subconsulta para reutilizarlo más adelante en la consulta"]
    ],
    extra: ["Combina filas de dos tablas que comparten una clave", "Devuelve una muestra arbitraria de N filas"],
    explain: "project cambia la forma de la lista de columnas, mientras que extend solo agrega columnas. mv-expand se usa después de parse_json cuando una columna contiene un arreglo (por ejemplo, AdditionalFields o Entities) para que cada elemento se convierta en una fila. bin(TimeGenerated, 1h) agrupa el tiempo en intervalos para summarize, y let define valores reutilizables, como listas dynamic de IOC. Las opciones sobrantes describen join y take." },

  { id: "custom-detection-order", d: 3, type: "order", title: "Convierte una consulta de hunting en una custom detection",
    prompt: "Tu consulta de hunting de PowerShell codificado en advanced hunting de Defender XDR devuelve buenos resultados. Pon en el orden correcto los pasos para convertirla en una custom detection rule.",
    steps: [
      "Asegurarte de que la consulta devuelva Timestamp, ReportId y una columna de entidad como DeviceId, y luego ejecutarla con éxito",
      "Seleccionar Create detection rule en el editor de consultas de advanced hunting",
      "Ingresar los detalles de la alerta: nombre, frecuencia, severidad, categoría y técnicas de MITRE",
      "Elegir las entidades afectadas (columnas de dispositivo, buzón o usuario)",
      "Elegir las acciones automatizadas, como aislar el dispositivo o recopilar un investigation package",
      "Revisar la configuración y crear la regla"
    ],
    explain: "Una custom detection rule necesita las columnas obligatorias (Timestamp, ReportId y al menos un identificador de entidad), o el asistente no te dejará guardarla, así que primero validas la consulta. Luego el asistente recorre los detalles de la alerta, las entidades afectadas y las acciones de respuesta opcionales antes de la revisión final. La frecuencia y el mapeo de MITRE en el paso de detalles de la alerta controlan con qué frecuencia se ejecuta la consulta y cómo se categoriza la alerta." }
]);
