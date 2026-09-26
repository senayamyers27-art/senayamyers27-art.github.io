/* Spanish translation of the Palo Alto Networks NGFW exam simulations. Same ids and structure as data/pbq/palo-alto-ngfw.js. */
CertHub.addPbqs("palo-alto-ngfw", [
  { id: "ha-links-match", d: 1, type: "match", title: "Relaciona los enlaces de HA con lo que transportan",
    prompt: "Se están emparejando dos firewalls PA-Series para alta disponibilidad. Relaciona cada enlace de HA con el tráfico que transporta.",
    pairs: [
      ["HA1", "Hellos, heartbeats, estado de HA y sincronización de la configuración"],
      ["HA2", "Sincronización de la tabla de sesiones, la tabla de reenvío y las SA de IPsec"],
      ["HA3", "Reenvío de paquetes al dueño de la sesión (solo active/active)"],
      ["HA1 backup", "Ruta redundante para el tráfico de control si falla el enlace de control"]
    ],
    extra: ["Sesiones de administrador por web GUI y SSH", "Túneles de GlobalProtect de usuarios remotos"],
    explain: "HA1 es el enlace de control: hellos, heartbeats, estado y sincronización de la configuración. HA2 es el enlace de datos que sincroniza sesiones, tablas de reenvío y SA de IPsec, y por eso un HA2 caído hace que las sesiones se pierdan en el failover. HA3 existe solo en active/active y reenvía los paquetes al peer que es dueño de la sesión. Los enlaces de backup protegen HA1 y HA2; el acceso de administración y GlobalProtect nunca viajan por los enlaces de HA." },

  { id: "dnat-rule-fill", d: 1, type: "fill", title: "Crea las reglas para un NAT de destino entrante",
    prompt: "Los usuarios de Internet deben llegar a un servidor web en la DMZ a través de una IP pública. Con la topología de abajo, completa los valores de la regla de NAT y de la regla de seguridad.",
    context: "ethernet1/1  zone: untrust  IP: 203.0.113.2/24\nethernet1/2  zone: dmz      IP: 192.168.50.1/24\n\nWeb server private IP : 192.168.50.10\nPublic IP for the site: 203.0.113.10 (owned by the firewall on ethernet1/1)\n\nNAT rule \"web-in\":    source zone untrust, destination zone ?, destination address 203.0.113.10\n                      translate destination to 192.168.50.10\nSecurity rule \"web-in\": source zone untrust, destination zone ?, destination address ?, application web-browsing, ssl",
    fields: [
      { label: "Zona de destino de la regla de NAT", answers: ["untrust"] },
      { label: "Zona de destino de la regla de seguridad", answers: ["dmz"] },
      { label: "Dirección de destino de la regla de seguridad", answers: ["203.0.113.10", "203.0.113.10/32"] }
    ],
    explain: "Una regla de NAT coincide con el paquete tal como llega, así que ambas zonas son pre-NAT: la IP pública se enruta por untrust, por lo que la zona de destino del NAT es untrust. Después, la política de seguridad usa la zona post-NAT (dmz, que se obtiene con la búsqueda de ruta para 192.168.50.10), pero sigue usando la IP de destino pre-NAT 203.0.113.10. Poner la IP privada en la regla de seguridad es el error clásico." },

  { id: "packet-flow-order", d: 1, type: "order", title: "Ordena el flujo del primer paquete en PAN-OS",
    prompt: "Llega una nueva sesión TCP a una interfaz de Layer 3 y no coincide con ninguna sesión existente. Pon en el orden correcto los pasos de procesamiento del firewall.",
    steps: [
      "Analizar el paquete y no encontrar ninguna sesión existente (slow path)",
      "Aplicar las verificaciones de zone protection de la zona de entrada",
      "Hacer la búsqueda de ruta para determinar la interfaz y la zona de salida",
      "Evaluar la política de NAT y registrar la traducción que coincide",
      "Evaluar la política de seguridad usando la IP pre-NAT y la zona post-NAT",
      "Identificar la aplicación con App-ID e inspeccionar el contenido con los security profiles",
      "Aplicar la traducción de NAT y reenviar el paquete por la interfaz de salida"
    ],
    explain: "El firewall necesita la zona de salida antes de poder evaluar la política de NAT o de seguridad, así que la búsqueda de reenvío va primero, después de zone protection. El NAT se evalúa antes que la seguridad (por eso las reglas de seguridad ven la zona post-NAT), pero la traducción solo se aplica a la salida, así que la seguridad sigue viendo las direcciones originales. App-ID y Content-ID trabajan sobre la sesión permitida antes de que el paquete salga." },

  { id: "ha-failover-logs", d: 1, type: "select", title: "Encuentra la causa de un failover de HA",
    prompt: "FW-A estaba activo y durante la noche hizo failover hacia FW-B. Selecciona todas las líneas del system log de FW-A que muestran la CAUSA del failover (no sus consecuencias ni eventos no relacionados).",
    context: "FW-A system log (severity  type  description)\n02:12:40 informational ha       HA1 hello received from peer 10.254.0.2\n02:13:55 high          ha       Path monitoring group 'isp-gw': destination 203.0.113.1 unreachable (3 of 3 pings failed)\n02:13:55 critical      ha       Path monitoring failed; local device state changing from active to non-functional\n02:13:56 informational ha       Peer device state changed from passive to active\n02:14:10 informational auth     User admin logged in via web from 192.168.1.20\n02:14:30 informational ha       HA2 session synchronization from peer completed\n02:15:02 informational general  Link ethernet1/1 is up",
    options: [
      "02:12:40 HA1 hello received from peer",
      "02:13:55 Path monitoring group 'isp-gw': 203.0.113.1 unreachable",
      "02:13:55 Path monitoring failed; local state active to non-functional",
      "02:13:56 Peer device state changed from passive to active",
      "02:14:10 User admin logged in via web",
      "02:14:30 HA2 session synchronization completed",
      "02:15:02 Link ethernet1/1 is up"
    ],
    answers: [1, 2],
    explain: "Path monitoring hacía ping al router upstream 203.0.113.1, lo perdió y pasó FW-A a non-functional, lo que disparó el failover aunque ethernet1/1 siguiera arriba (así que link monitoring no lo habría detectado). Que el peer se vuelva activo y la sincronización de HA2 son consecuencias, y el hello y el inicio de sesión del administrador son eventos de rutina." },

  { id: "userid-source-match", d: 2, type: "match", title: "Relaciona las fuentes de User-ID con los escenarios",
    prompt: "Relaciona cada escenario con el método de mapeo de User-ID que MEJOR le corresponde.",
    pairs: [
      ["Leer los eventos de inicio de sesión de Windows (4624) desde los controladores de dominio", "Server monitoring"],
      ["Un controlador inalámbrico Linux solo puede enviar los eventos de autenticación como syslog", "Syslog listener con un parse profile"],
      ["Laptops remotas inician sesión en la aplicación de VPN corporativa", "GlobalProtect"],
      ["Un script de NAC publica eventos de inicio y cierre de sesión desde 10.20.0.0/16", "XML API"],
      ["Los usuarios sin mapeo en una red de invitados deben iniciar sesión mediante un formulario web", "Authentication Portal"]
    ],
    extra: ["Group mapping", "SSL/TLS service profile"],
    explain: "Server monitoring lee los logs de seguridad de los DC; un syslog listener usa parse profiles para extraer usuario e IP de mensajes de terceros; GlobalProtect mapea a los usuarios cuando se conectan; la XML API permite que scripts y herramientas de NAC envíen mapeos; y Authentication Portal le pide iniciar sesión a los usuarios que no se mapean de ninguna otra forma. Group mapping solo aporta la pertenencia a grupos, no mapeos de IP a usuario." },

  { id: "log-forwarding-select", d: 2, type: "select", title: "¿Qué logs envía un log forwarding profile?",
    prompt: "Un servidor syslog recibe los system logs, pero no los datos de sesiones ni de amenazas. Selecciona todos los tipos de log que se reenvían mediante un Log Forwarding profile asociado a las reglas de seguridad (y no desde Device > Log Settings).",
    options: ["Traffic", "Threat", "URL Filtering", "WildFire Submissions", "System", "Configuration", "HIP Match", "User-ID"],
    answers: [0, 1, 2, 3],
    explain: "Los logs ligados a sesiones que coinciden con una regla de seguridad (traffic, threat, URL filtering, WildFire submissions, data filtering) se reenvían con el Log Forwarding profile de esa regla. Los logs de system, configuration, HIP match, User-ID y GlobalProtect no están ligados a una regla, así que se reenvían desde Device > Log Settings, y eso explica por qué llegan los system logs y no los traffic logs." },

  { id: "decryption-fill", d: 2, type: "fill", title: "Elige los certificados y las acciones de descifrado",
    prompt: "Un ingeniero está diseñando el descifrado. Escribe el certificado, el tipo de política o la acción de la regla para cada requisito.",
    context: "Req 1: El HTTPS saliente hacia sitios con una cadena de certificados válida y de confianza debe descifrarse sin advertencias en el navegador.\nReq 2: El HTTPS saliente hacia un sitio con un certificado vencido debe seguir mostrando a los usuarios una advertencia en el navegador.\nReq 3: El HTTPS entrante hacia el propio servidor web de la empresa (con certificado y clave disponibles) debe descifrarse.\nReq 4: Una app bancaria que usa certificate pinning deja de funcionar cuando se descifra.",
    fields: [
      { label: "Req 1: certificado que firma los certificados de servidor suplantados", answers: ["forward trust", "forward trust certificate", "forward-trust", "forward trust ca"] },
      { label: "Req 2: certificado que se presenta en su lugar", answers: ["forward untrust", "forward untrust certificate", "forward-untrust", "forward untrust ca"] },
      { label: "Req 3: tipo de política de descifrado", answers: ["ssl inbound inspection", "inbound inspection", "ssl inbound"] },
      { label: "Req 4: acción de la regla de descifrado para la app", answers: ["no-decrypt", "no decrypt", "no-decryption"] }
    ],
    explain: "Forward proxy firma los certificados de los sitios válidos con la CA forward trust, en la que confían los clientes; para los sitios no válidos usa el certificado forward untrust, que a propósito no es de confianza, para que la advertencia se conserve. Inbound inspection descifra con el certificado y la clave del propio servidor. Las apps con pinning rechazan cualquier certificado suplantado, así que reciben una regla no-decrypt o una exclusión de descifrado." },

  { id: "ha-upgrade-order", d: 2, type: "order", title: "Actualiza un par de HA active/passive",
    prompt: "Pon en el orden correcto los pasos para actualizar PAN-OS en un par de HA active/passive sin interrumpir el tráfico.",
    steps: [
      "Exportar un respaldo de la configuración, descargar la versión objetivo (y su imagen base) en ambos peers y deshabilitar preemption",
      "Instalar el nuevo PAN-OS en el peer pasivo y reiniciarlo",
      "Verificar que el peer actualizado volvió al estado pasivo con HA y la sincronización de configuración en buen estado",
      "Suspender el peer activo para que el peer actualizado pase a activo",
      "Instalar el nuevo PAN-OS en el peer suspendido y reiniciarlo",
      "Volver a poner funcional el peer suspendido y rehabilitar preemption"
    ],
    explain: "Actualizar primero el peer pasivo significa que el tráfico nunca se interrumpe: una vez verificado, suspender el peer activo hace failover del tráfico hacia el firewall que ya está actualizado. Preemption se deshabilita para que el peer de mayor prioridad no tome el rol activo a mitad de la actualización mientras las versiones son distintas, y se vuelve a habilitar solo cuando ambos peers ejecutan la misma versión." },

  { id: "panorama-match", d: 3, type: "match", title: "Relaciona los objetos de Panorama con su propósito",
    prompt: "Relaciona cada requisito de Panorama con la construcción que lo proporciona.",
    pairs: [
      ["Reglas de seguridad evaluadas antes de cualquier regla que escriba un administrador local", "Device group pre-rules"],
      ["Reglas de limpieza evaluadas después de todas las reglas locales", "Device group post-rules"],
      ["Interfaces, zonas, DNS y configuración de NTP para un conjunto de firewalls", "Template"],
      ["Combinar un template base global con un template regional", "Template stack"],
      ["Un solo template asigna una dirección IP distinta en cada firewall de sucursal", "Template variable"]
    ],
    extra: ["Log Collector group", "Shared gateway"],
    explain: "Los device groups llevan la política y los objetos: las pre-rules se ejecutan antes de las reglas locales y las post-rules después. Los templates llevan la configuración de red y del dispositivo, los template stacks combinan varios templates en capas donde gana el de mayor jerarquía, y las template variables permiten que un solo template aporte valores únicos por dispositivo. Los Log Collector groups se encargan del almacenamiento de logs y los shared gateways son una función de multi-vsys." },

  { id: "xml-api-fill", d: 3, type: "fill", title: "Completa los tipos de solicitud de la XML API de PAN-OS",
    prompt: "Un script automatiza un firewall en 192.168.1.1 mediante la XML API. Escribe el valor del parámetro type para cada llamada.",
    context: "1) GET /api/?type=____&user=apiadmin&password=********      -> returns <key>...</key>\n2) GET /api/?type=____&cmd=<show><system><info></info></system></show>&key=KEY\n3) GET /api/?type=____&action=set&xpath=/config/devices/entry/vsys/entry[@name='vsys1']/address/entry[@name='web-srv']&element=<ip-netmask>192.168.50.10/32</ip-netmask>&key=KEY\n4) GET /api/?type=____&cmd=<commit></commit>&key=KEY",
    fields: [
      { label: "Llamada 1 (obtener una API key)", answers: ["keygen"] },
      { label: "Llamada 2 (comando operativo)", answers: ["op"] },
      { label: "Llamada 3 (agregar un address object)", answers: ["config"] },
      { label: "Llamada 4 (activar la configuración candidata)", answers: ["commit"] }
    ],
    explain: "type=keygen intercambia credenciales por una API key que usa cada llamada posterior. type=op ejecuta comandos operativos como show system info, type=config con action=set/edit/delete cambia la configuración candidata en un XPath, y type=commit convierte la candidata en la configuración en ejecución. Usa para la cuenta del script un admin role profile dedicado y limitado a la XML API." },

  { id: "bootstrap-match", d: 3, type: "match", title: "Relaciona el contenido del bootstrap de VM-Series",
    prompt: "Un firewall VM-Series se inicializa con bootstrap desde un bucket de almacenamiento. Relaciona cada elemento con el lugar al que pertenece dentro del paquete de bootstrap.",
    pairs: [
      ["Hostname, IP del servidor Panorama, auth key, device group y template stack", "init-cfg.txt"],
      ["Una configuración completa del firewall para cargar en el primer arranque", "bootstrap.xml"],
      ["Auth codes para licenciar el firewall", "carpeta license"],
      ["Paquetes de Applications and Threats y de antivirus", "carpeta content"],
      ["Una imagen de PAN-OS a la cual actualizar durante el primer arranque", "carpeta software"]
    ],
    extra: ["Template variable", "Snapshot de configuración con nombre"],
    explain: "init-cfg.txt (en la carpeta config) contiene la configuración básica del primer arranque, como el hostname y el registro en Panorama, mientras que bootstrap.xml es una configuración completa opcional. La carpeta license contiene el archivo authcodes, la carpeta content contiene las actualizaciones de contenido y la carpeta software contiene una imagen de PAN-OS para instalar. Los snapshots y las template variables no forman parte de un paquete de bootstrap." }
]);
