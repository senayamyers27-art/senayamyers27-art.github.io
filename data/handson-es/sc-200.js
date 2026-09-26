/* Spanish text for the Microsoft SC-200 hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/sc-200.js. */
CertHub.addHandsonEs("sc-200", {
  "failed-signins-basic": {
    title: "Encuentra inicios de sesión fallidos por contraseña incorrecta",
    prompt: "Microsoft Entra ID escribe cada inicio de sesión interactivo en la tabla `SigninLogs`. Un `ResultType` de \"0\" significa éxito; \"50126\" significa nombre de usuario o contraseña no válidos.\n\nDevuelve todos los inicios de sesión con `ResultType` \"50126\". Muestra solo las columnas `UserPrincipalName`, `IPAddress` y `Location`.",
    hint: "Agrega una línea `where` antes del `project`. ResultType se guarda como string, así que pon el valor entre comillas dobles.",
    explain: "`where` filtra filas y `project` elige columnas: son los dos operadores de KQL más comunes en el examen. ResultType es un string en SigninLogs, así que compararlo con el número 50126 no daría coincidencias. Filtrar antes de proyectar también mantiene las consultas económicas. Fíjate en cuántos fallos vienen de 203.0.113.77 y 203.0.113.12; volverás a ellos más adelante."
  },
  "signins-by-app": {
    title: "Cuenta los inicios de sesión exitosos por aplicación",
    prompt: "Tu jefe quiere saber a qué aplicaciones en la nube inicia sesión realmente la gente.\n\nCuenta los inicios de sesión exitosos (`ResultType` \"0\") por `AppDisplayName`. Nombra la columna del conteo `SignIns` y ordena por `SignIns` de mayor a menor. Devuelve solo `AppDisplayName` y `SignIns`.",
    hint: "Primero filtra, luego usa `summarize SignIns = count() by AppDisplayName` y después `sort by`.",
    explain: "`summarize ... by` agrupa filas y aplica una agregación como count(). Ponerle nombre al resultado (`SignIns = count()`) en lugar de aceptar el `count_` por defecto hace que las consultas y los mosaicos de los workbooks sean más fáciles de leer. En KQL, `sort by` ordena de forma descendente por defecto, pero escribir `desc` deja clara tu intención."
  },
  "noisy-event-ids": {
    title: "Encuentra los event IDs de Windows más ruidosos",
    prompt: "Antes de ajustar una regla de recopilación de datos (DCR) para los Windows Security Events, quieres ver qué event IDs forman la mayor parte del volumen en la tabla `SecurityEvent`.\n\nCuenta las filas por `EventID`, nombra el conteo `Events` y ordena por `Events` de mayor a menor. Devuelve `EventID` y `Events`.",
    hint: "Un solo `summarize` con `count()` agrupado por EventID, y luego un `sort by` sobre tu nueva columna.",
    explain: "Revisar el volumen por event ID es el primer paso para optimizar costos: el Azure Monitor Agent con una DCR (o los conjuntos Common/Minimal del conector Windows Security Events) te permite recopilar solo los IDs que tus detecciones necesitan, como 4624, 4625, 4672 y 4688. SC-200 espera que relaciones las decisiones de ingesta con el costo y con lo que realmente consultan tus reglas de análisis."
  },
  "device-timeline": {
    title: "Reconstruye la línea de tiempo de un dispositivo para un incidente",
    prompt: "Un incidente en el portal de Defender apunta al dispositivo `ws-fin-07`. Construye una línea de tiempo sencilla de procesos del último día.\n\nDesde `DeviceProcessEvents`, conserva las filas donde `DeviceName` sea \"ws-fin-07\" y `Timestamp` esté dentro del último día (`ago(1d)`). Ordena por `Timestamp` del más antiguo al más reciente y devuelve solo `FileName`, `InitiatingProcessFileName` y `ProcessCommandLine`.",
    hint: "Ordena antes de proyectar para que la columna Timestamp siga disponible para ordenar. Del más antiguo al más reciente significa `asc`.",
    explain: "Leer el proceso padre (InitiatingProcessFileName) junto a cada hijo muestra la historia del ataque: Outlook abrió un libro con macros, Excel lanzó PowerShell oculto con un comando codificado, el script descargó un binario sin firmar y ese binario creó una tarea programada para lograr persistencia. Es la misma cadena que muestra la línea de tiempo del dispositivo, y el examen espera que reconozcas a Office iniciando un script host como una señal fuerte."
  },
  "phish-recipients": {
    title: "Delimita una campaña de phishing a los buzones que la recibieron",
    prompt: "Un usuario reportó un correo de phishing de `billing@fabrikam-payments.com`. Antes de remediar, necesitas la lista de buzones donde el mensaje realmente llegó.\n\nDesde `EmailEvents`, devuelve los valores distintos de `RecipientEmailAddress` para los mensajes de ese remitente cuyo `DeliveryAction` sea \"Delivered\". Devuelve solo la columna `RecipientEmailAddress`.",
    hint: "Filtra tanto por el remitente como por la acción de entrega, y luego usa `distinct` para que un destinatario que recibió dos mensajes aparezca una sola vez.",
    explain: "Las copias bloqueadas o enviadas a correo no deseado nunca llegaron a la bandeja de entrada, así que la lista de entregados es sobre la que actúas con Threat Explorer o con la remediación de advanced hunting (soft o hard delete). `distinct` elimina el duplicado causado por el mensaje de seguimiento a bob. Primero delimitar, luego remediar y después revisar el Action center es el flujo que SC-200 evalúa para Defender for Office 365."
  },
  "encoded-powershell": {
    title: "Busca PowerShell codificado",
    prompt: "Los atacantes suelen esconder scripts de PowerShell pasándolos codificados en Base64 con `-EncodedCommand`, que PowerShell también acepta en formas abreviadas como `-enc`.\n\nDesde `DeviceProcessEvents`, encuentra los procesos donde `FileName` sea igual a \"powershell.exe\" (sin distinguir mayúsculas) y `ProcessCommandLine` contenga \"-enc\" (en cualquier combinación de mayúsculas y minúsculas). Devuelve `DeviceName`, `AccountName` y `ProcessCommandLine`.",
    hint: "Usa `=~` para una igualdad que no distingue mayúsculas. `has` solo coincide con términos completos, así que no encontraría \"-enc\" dentro de \"-EncodedCommand\"; `contains` coincide con cualquier subcadena.",
    explain: "`has` busca términos completos y es más rápido porque usa el índice de términos; `contains` coincide con cualquier subcadena y es más lento, pero atrapa las abreviaturas. Aquí `contains \"-enc\"` encuentra tanto el switch completo `-EncodedCommand` en ws-fin-07 como el corto `-enc` en ws-hr-02, mientras que el script de inventario programado que usa `-File` queda fuera. Es una consulta clásica de advanced hunting que a menudo se convierte en una regla de detección personalizada."
  },
  "malicious-inbox-rules": {
    title: "Detecta reglas de bandeja de entrada que ocultan correo",
    prompt: "Después de un inicio de sesión sospechoso, los atacantes suelen crear reglas de bandeja de entrada que ocultan las respuestas moviéndolas a una carpeta poco visible o eliminándolas.\n\nDesde `OfficeActivity`, devuelve las filas donde `Operation` sea \"New-InboxRule\" o \"Set-InboxRule\" y `Parameters` contenga \"RSS\" o \"DeleteMessage\". Devuelve `UserId`, `Operation`, `ClientIP` y `Parameters`.",
    hint: "Usa `in (\"New-InboxRule\", \"Set-InboxRule\")` para la operación, y encierra las dos comprobaciones `contains` entre paréntesis unidas con `or`.",
    explain: "Las reglas que mueven palabras clave de finanzas a RSS Subscriptions o eliminan advertencias de seguridad son una señal típica de business email compromise. Ambas filas vienen de 203.0.113.200, la misma IP que inició sesión como erin desde otro país. La respuesta es revocar las sesiones, restablecer la contraseña, eliminar las reglas y confirmar al usuario como comprometido en Entra ID Protection. Sin los paréntesis, `and` tendría más precedencia que `or` y devolvería filas equivocadas."
  },
  "rule-brute-force": {
    title: "Escribe la consulta de una regla de análisis contra fuerza bruta",
    prompt: "Estás escribiendo la consulta para una regla de análisis programada: generar una alerta cuando una cuenta tenga 5 o más inicios de sesión fallidos (EventID 4625) dentro de una ventana de 10 minutos. La cuenta `svc-scan` pertenece al escáner de vulnerabilidades y es un falso positivo conocido, así que exclúyela.\n\nCuenta los fallos por `TargetUserName` en intervalos de 10 minutos de `TimeGenerated`, nombra el conteo `FailedLogons`, conserva los grupos con 5 o más y devuelve solo `TargetUserName` y `FailedLogons`.",
    hint: "El código inicial funciona, pero sigue alertando por el escáner. Agrega una condición sobre TargetUserName al primer `where`.",
    explain: "`bin(TimeGenerated, 10m)` agrupa los eventos en ventanas fijas para que el umbral se aplique por ventana, en línea con la frecuencia de consulta y el periodo de revisión de la regla. Excluir una cuenta benigna conocida en la consulta es una forma de ajustar una regla; para muchas exclusiones, una watchlist es más fácil de mantener. En la regla, asignarías TargetUserName a la entidad Account para que los incidentes se agrupen correctamente."
  },
  "rule-password-spray": {
    title: "Detecta un password spray contando usuarios distintos",
    prompt: "Un password spray prueba una o dos contraseñas comunes contra muchas cuentas desde el mismo origen, así que cada cuenta ve solo un fallo y el bloqueo nunca se activa.\n\nDesde `SigninLogs`, mira solo `ResultType` \"50126\". Para cada `IPAddress`, cuenta los valores distintos de `UserPrincipalName` como `TargetedUsers` y todos los intentos como `Attempts`. Conserva las IPs con `TargetedUsers` de 5 o más. Devuelve `IPAddress`, `TargetedUsers` y `Attempts`.",
    hint: "Puedes calcular dos agregaciones en un solo `summarize`, separadas por una coma: `dcount()` para los usuarios distintos y `count()` para los intentos.",
    explain: "Contar cuentas distintas por origen separa un spray (203.0.113.77: siete usuarios, un intento cada uno) de un intento de fuerza bruta contra una sola cuenta (203.0.113.12: un usuario, varios intentos), que un conteo por usuario sí detectaría. Entra ID Protection y Smart Lockout también señalan los sprays, pero SC-200 espera que expreses la lógica en KQL con dcount()."
  },
  "lateral-movement-logons": {
    title: "Encuentra una cuenta que se extiende por varios hosts",
    prompt: "Un incidente sugiere que se está usando una credencial robada de helpdesk para moverse lateralmente. Los inicios de sesión de red son el EventID 4624 con `LogonType` 3.\n\nCuenta los valores distintos de `Computer` en los que cada `TargetUserName` inició sesión por la red. Nombra el conteo `Computers`, conserva las cuentas con 4 o más y devuelve también la lista de hosts como `Hosts` usando `make_set(Computer)`. Devuelve `TargetUserName`, `Computers` y `Hosts`.",
    hint: "Filtra por EventID y por LogonType (ambos son números) y luego usa `summarize Computers = dcount(Computer), Hosts = make_set(Computer) by TargetUserName`.",
    explain: "Los usuarios normales acceden a uno o dos servidores; `helpdesk.tmp` llegó a cinco hosts en aproximadamente media hora desde una sola IP. El logon type 3 es un inicio de sesión de red (SMB, administración remota), el tipo 2 es interactivo y el tipo 10 es RDP. Defender for Identity muestra la misma idea como rutas de movimiento lateral, y la respuesta es deshabilitar la cuenta, restablecerla y revisar lo que tocó en cada host."
  },
  "rare-processes": {
    title: "Apila procesos para encontrar los poco comunes",
    prompt: "El stacking (contar qué tan extendido está algo) es una técnica de hunting sencilla: el software legítimo suele ejecutarse en muchos dispositivos, mientras que las herramientas de los atacantes a menudo se ejecutan en uno solo.\n\nDesde `DeviceProcessEvents`, cuenta los valores distintos de `DeviceName` por `FileName` como `Devices`. Conserva solo los nombres de archivo vistos exactamente en 1 dispositivo. Devuelve `FileName` y `Devices`.",
    hint: "Usa `dcount(DeviceName)` en un `summarize` agrupado por FileName y luego filtra con `where Devices == 1`.",
    explain: "El análisis de menor frecuencia saca a la luz updater-helper.exe, schtasks.exe, certutil.exe, wscript.exe y code.exe. Poco común no es lo mismo que malicioso: code.exe es una herramienta de desarrollo, así que cada resultado todavía necesita contexto de la línea de comandos y del proceso padre. En un tenant real harías stacking sobre miles de dispositivos, donde los binarios únicos destacan con mucha más claridad."
  },
  "impossible-travel": {
    title: "Busca viajes imposibles",
    prompt: "Defender for Cloud Apps genera una alerta de impossible travel cuando un usuario inicia sesión desde lugares lejanos demasiado rápido. Puedes aproximarlo en KQL.\n\nUsando solo inicios de sesión exitosos (`ResultType` \"0\"), agrupa por `UserPrincipalName` e intervalos de una hora de `TimeGenerated`. En cada grupo calcula `Countries = dcount(Location)` y `Locations = make_set(Location)`. Conserva los grupos donde `Countries` sea mayor que 1 y luego devuelve solo `UserPrincipalName`, `Countries` y `Locations`.",
    hint: "`summarize ... by UserPrincipalName, bin(TimeGenerated, 1h)` crea los grupos por hora. Usa `project` al final para quitar la columna de tiempo.",
    explain: "erin inició sesión desde EE. UU. y luego desde Brasil 35 minutos después, lo cual no es físicamente posible; carlos también aparece en dos países, pero con seis horas de diferencia, así que el intervalo de una hora lo deja fuera correctamente. Los intervalos por hora son una aproximación burda: una detección real compararía inicios de sesión consecutivos y la distancia. Esa misma IP creó después reglas ocultas en la bandeja de entrada, así que este hallazgo y el de OfficeActivity pertenecen al mismo incidente."
  }
});
