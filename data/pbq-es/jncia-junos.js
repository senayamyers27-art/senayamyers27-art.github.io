/* Spanish translation of the Juniper JNCIA-Junos exam simulations. Same ids and structure as data/pbq/jncia-junos.js. */
CertHub.addPbqs("jncia-junos", [
  { id: "subnet-27-fill", d: 1, type: "fill", title: "Calcula la subred de una interfaz Junos",
    prompt: "La configuración de un router contiene la línea de abajo. Completa los valores de la subred a la que está conectada ge-0/0/2.",
    context: "user@R1> show configuration interfaces ge-0/0/2 | display set\nset interfaces ge-0/0/2 unit 0 family inet address 10.20.30.77/27",
    fields: [
      { label: "Dirección de red", answers: ["10.20.30.64"] },
      { label: "Dirección de broadcast", answers: ["10.20.30.95"] },
      { label: "Primer host utilizable", answers: ["10.20.30.65"] },
      { label: "Último host utilizable", answers: ["10.20.30.94"] },
      { label: "Máscara de subred en decimal con puntos", answers: ["255.255.255.224"] },
      { label: "Cantidad de hosts utilizables", answers: ["30"] }
    ],
    explain: "Una máscara /27 es 255.255.255.224, así que el tamaño de bloque en el último octeto es 256 - 224 = 32 y las subredes empiezan en .0, .32, .64, .96, etc. La dirección .77 cae en el bloque .64, por lo que el broadcast es uno menos que el siguiente bloque (.95). Los hosts utilizables van de .65 a .94, es decir, 2^5 - 2 = 30 direcciones." },

  { id: "cos-components-match", d: 1, type: "match", title: "Relaciona los componentes de CoS con su función",
    prompt: "Estás revisando un diseño de class-of-service para un router de borde Junos. Relaciona cada componente de CoS con lo que hace.",
    pairs: [
      ["Behavior aggregate classifier", "Asigna una forwarding class a partir del valor DSCP, EXP o 802.1p que ya trae el paquete"],
      ["Multifield classifier", "Asigna una forwarding class con un firewall filter que evalúa varios campos del encabezado"],
      ["Policer", "Limita la tasa de tráfico y descarta o remarca el excedente"],
      ["Scheduler", "Define la porción de ancho de banda, el tamaño de buffer y la prioridad de una cola en la salida"],
      ["Rewrite rule", "Establece el marcado CoS de los paquetes cuando salen por una interfaz"],
      ["Drop profile", "Controla qué tan agresivamente se descartan paquetes a medida que se llena una cola"]
    ],
    extra: ["Resuelve un next hop IPv4 a una dirección MAC", "Elige la ruta activa cuando dos protocolos ofrecen el mismo prefijo"],
    explain: "La clasificación ocurre en la entrada: un clasificador behavior aggregate (BA) confía en un marcado existente, mientras que un multifield classifier es un firewall filter que puede evaluar direcciones, puertos y protocolo. Los policers aplican límites de tasa. En la salida, los schedulers deciden cómo comparten el enlace las colas y los drop profiles (RED) deciden cuándo una cola que se llena empieza a descartar. Las rewrite rules establecen el marcado de salida para que el siguiente salto pueda clasificar correctamente. Una confusión común es pensar que los clasificadores cambian los marcados; solo los leen, y las rewrite rules los escriben." },

  { id: "daemons-match", d: 2, type: "match", title: "Relaciona los daemons de Junos con su función",
    prompt: "Mientras lees `show system processes` en un router ves varios daemons. Relaciona cada daemon con su función.",
    context: "user@R1> show system processes | match \"rpd|mgd|dcd|chassisd|snmpd\"\n 1822  ??  S      2:41.07 /usr/sbin/rpd -N\n 1790  ??  S      0:12.44 /usr/sbin/mgd -N\n 1801  ??  S      0:03.51 /usr/sbin/dcd -N\n 1795  ??  S      1:05.19 /usr/sbin/chassisd -N\n 1840  ??  S      0:07.62 /usr/sbin/snmpd -N",
    pairs: [
      ["rpd", "Ejecuta los protocolos de enrutamiento y construye la tabla de enrutamiento"],
      ["mgd", "Ejecuta la CLI y procesa los commits de configuración"],
      ["dcd", "Configura y administra las interfaces"],
      ["chassisd", "Monitorea los componentes de hardware y genera alarmas de chasis"],
      ["snmpd", "Responde los sondeos SNMP y envía traps"]
    ],
    extra: ["Reenvía los paquetes de tránsito usando la tabla de reenvío", "Almacena la configuración de rescate (rescue)"],
    explain: "Todos estos daemons corren en el Routing Engine. rpd ejecuta OSPF, BGP y otros protocolos y selecciona las rutas activas; mgd es el daemon de administración detrás de la CLI y del proceso de commit; dcd (device control) aplica la configuración de interfaces, como direcciones y MTU; chassisd vigila ventiladores, fuentes de poder y tarjetas y genera alarmas; snmpd atiende SNMP. Reenviar paquetes de tránsito no es tarea de ningún daemon: eso lo hace el Packet Forwarding Engine en hardware con la tabla de reenvío que le entrega el RE." },

  { id: "exception-traffic-select", d: 2, type: "select", title: "Identifica el tráfico de excepción (destinado al host)",
    prompt: "Llegan paquetes a R1, cuyas direcciones se muestran abajo. Selecciona cada paquete que el PFE debe enviar al Routing Engine como tráfico de excepción.",
    context: "Direcciones de R1:\n  ge-0/0/0.0  203.0.113.2/30   (hacia el ISP, par 203.0.113.1)\n  ge-0/0/1.0  10.0.12.1/30     (hacia R2)\n  ge-0/0/2.0  10.10.0.1/24     (LAN de usuarios)\n  lo0.0       192.0.2.1/32\nR1 tiene una ruta predeterminada hacia 203.0.113.1 y rutas OSPF para 10.0.0.0/8.",
    options: [
      "TCP 443 de 10.10.0.50 a 198.51.100.80, TTL 63",
      "TCP 22 de 10.10.0.50 a 192.0.2.1, TTL 64",
      "OSPF hello de 10.0.12.2 a 224.0.0.5 en ge-0/0/1",
      "UDP 33434 de 10.10.0.50 a 198.51.100.80, TTL 1",
      "ICMP echo request de 10.10.0.50 a 10.10.0.1",
      "UDP 53 de 10.10.0.50 a 198.51.100.53, TTL 64",
      "TCP 179 de 203.0.113.1 a 203.0.113.2",
      "TCP 80 de 203.0.113.9 a 10.10.0.20, TTL 50"
    ],
    answers: [1, 2, 3, 4, 6],
    explain: "El tráfico de excepción es todo lo que el PFE no puede simplemente reenviar: paquetes dirigidos al propio router (SSH a lo0, un ping a su propia interfaz, BGP a 203.0.113.2), paquetes de protocolos de control como los OSPF hellos a 224.0.0.5, y paquetes que requieren una respuesta ICMP del router, como la sonda de traceroute cuyo TTL expira aquí. Los paquetes web, DNS y HTTP entrante que pasan hacia otros hosts son tráfico de tránsito y se quedan en el PFE. El tráfico de excepción tiene un límite de tasa en su camino al RE para que una inundación no pueda dejar sin recursos al plano de control." },

  { id: "cli-pipes-match", d: 3, type: "match", title: "Relaciona las opciones de pipe de la CLI con su salida",
    prompt: "Un ingeniero está trabajando en `user@R1>` y agrega distintas opciones de pipe a `show configuration` y `show interfaces terse`. Relaciona cada opción de pipe con lo que hace.",
    pairs: [
      ["| match ge-0/0", "Muestra solo las líneas que contienen la cadena"],
      ["| except down", "Oculta las líneas que contienen la cadena"],
      ["| find inet", "Empieza la salida en la primera línea que contiene la cadena"],
      ["| count", "Imprime solo la cantidad de líneas"],
      ["| display set", "Muestra la configuración como comandos set"],
      ["| compare rollback 1", "Muestra las diferencias con una configuración confirmada anteriormente"],
      ["| no-more", "Imprime toda la salida sin pausar en cada pantalla"]
    ],
    extra: ["Muestra la salida en XML", "Guarda la salida en un archivo en el router"],
    explain: "`match` y `except` son filtros de líneas opuestos, mientras que `find` no filtra nada: salta hasta la primera coincidencia e imprime todo lo que viene después. `count` informa cuántas líneas hay, lo que combina bien con match (por ejemplo `| match down | count`). `display set` aplana la jerarquía en comandos set de una línea que puedes pegar en otro lugar, `compare rollback 1` muestra lo que cambió el último commit, y `no-more` desactiva el paginador --(more)--. La salida en XML viene de `| display xml` y para guardar en un archivo se usa `| save`." },

  { id: "safe-commit-order", d: 4, type: "order", title: "Haz commit de un cambio riesgoso en un router remoto",
    prompt: "Estás conectado por SSH a un router remoto de sucursal y debes cambiar el filtro que protege su acceso de administración. Ordena los pasos de la forma correcta más segura.",
    steps: [
      "Entra al modo de configuración con configure private",
      "Haz el cambio con comandos set en la configuración candidata",
      "Revisa exactamente qué cambió con show | compare",
      "Valida la configuración candidata con commit check",
      "Aplica el cambio con commit confirmed 5",
      "Abre una nueva sesión SSH y prueba que el acceso de administración siga funcionando",
      "Ingresa commit antes de que venzan los 5 minutos para que el cambio sea permanente"
    ],
    explain: "Los cambios se hacen en una configuración candidata, así que revisar con `show | compare` y validar con `commit check` detecta errores antes de que algo entre en producción. `commit confirmed 5` activa el cambio, pero hace rollback automáticamente después de 5 minutos a menos que se confirme, lo que te protege si el nuevo filtro te deja afuera. Después de probar el acceso desde una sesión nueva, un `commit` simple (o `commit check`) lo confirma. Si te quedas sin conexión, simplemente espera y el router restaurará la configuración anterior por sí solo." },

  { id: "interface-name-fill", d: 4, type: "fill", title: "Decodifica el nombre de una interfaz Junos",
    prompt: "Lee la línea de configuración de abajo y completa cada parte del nombre de la interfaz.",
    context: "set interfaces xe-2/1/5 vlan-tagging\nset interfaces xe-2/1/5 unit 30 vlan-id 300\nset interfaces xe-2/1/5 unit 30 family inet address 10.30.0.1/24",
    fields: [
      { label: "Número de slot del FPC", answers: ["2"] },
      { label: "Número de slot del PIC", answers: ["1"] },
      { label: "Número de puerto", answers: ["5"] },
      { label: "Número de unidad lógica", answers: ["30"] },
      { label: "VLAN ID que transporta esa unidad", answers: ["300"] },
      { label: "Velocidad de la interfaz que indica el prefijo xe", answers: ["10 Gbps", "10Gbps", "10G", "10 Gb/s", "10Gb/s", "10 Gigabit", "10 Gigabit Ethernet", "10GbE", "10 GbE"] }
    ],
    explain: "Los nombres de interfaz en Junos siguen el formato tipo-fpc/pic/puerto.unidad, así que xe-2/1/5.30 es un puerto 10-Gigabit Ethernet (xe) en el FPC 2, PIC 1, puerto 5, unidad lógica 30. El número de unidad es solo una etiqueta para la interfaz lógica; la VLAN que transporta se configura por separado con vlan-id, por eso la unidad 30 puede transportar la VLAN 300. Hacer coincidir los números de unidad y de VLAN es un hábito práctico, no un requisito. La dirección IP siempre se configura en la unidad, bajo family inet." },

  { id: "root-recovery-order", d: 5, type: "order", title: "Recupera una contraseña de root perdida",
    prompt: "Nadie conoce la contraseña de root de un router Junos OS del laboratorio. Ordena los pasos de recuperación de contraseña correctamente.",
    steps: [
      "Conéctate al puerto de consola del router",
      "Reinicia o apaga y enciende el router",
      "Interrumpe el proceso de arranque y elige el arranque en modo single-user (recuperación)",
      "Entra al modo recovery para que Junos inicie la CLI sin contraseña",
      "Entra al modo de configuración y define una nueva contraseña de root-authentication",
      "Haz commit de la configuración",
      "Sal y deja que el router termine de arrancar normalmente"
    ],
    explain: "La recuperación de contraseña requiere acceso físico a la consola, porque hay que interrumpir el proceso de arranque antes de que Junos inicie normalmente. Arrancar en modo single-user y escribir recovery abre la CLI sin autenticación, donde configuras `set system root-authentication plain-text-password` y haces commit, ya que la nueva contraseña solo tiene efecto una vez confirmada. La recuperación no requiere un restablecimiento de fábrica y conserva el resto de la configuración, por eso los puertos de consola deben estar protegidos físicamente." },

  { id: "commit-audit-select", d: 5, type: "select", title: "Encuentra el cambio de configuración en el log",
    prompt: "OSPF hacia R2 se cayó a las 02:14. Usando `show log messages`, selecciona cada línea que registra que la configuración se modificó o se confirmó con commit.",
    context: "user@R1> show log messages | match \"Sep 20 02:1\"\nSep 20 02:10:11 R1 mgd[4312]: UI_LOGIN_EVENT: User 'jdoe' login, class 'j-super-user' [4312], ssh-connection '192.0.2.44 51234 192.0.2.1 22', client-mode 'cli'\nSep 20 02:12:58 R1 mgd[4312]: UI_CMDLINE_READ_LINE: User 'jdoe', command 'set interfaces ge-0/0/1 unit 0 family inet address 10.0.12.5/30 '\nSep 20 02:13:40 R1 mgd[4312]: UI_COMMIT: User 'jdoe' requested 'commit' operation (comment: none)\nSep 20 02:13:42 R1 mgd[4312]: UI_COMMIT_COMPLETED: commit complete\nSep 20 02:14:05 R1 rpd[1822]: RPD_OSPF_NBRDOWN: OSPF neighbor 10.0.12.2 (realm ospf-v2 ge-0/0/1.0 area 0.0.0.0) state changed from Full to Down\nSep 20 02:14:30 R1 xntpd[1507]: NTP Server 192.0.2.10 is Reachable\nSep 20 02:16:02 R1 mgd[4312]: UI_LOGOUT_EVENT: User 'jdoe' logout",
    options: [
      "02:10:11 UI_LOGIN_EVENT: el usuario 'jdoe' inicia sesión",
      "02:12:58 UI_CMDLINE_READ_LINE: 'set interfaces ge-0/0/1 ... address 10.0.12.5/30'",
      "02:13:40 UI_COMMIT: el usuario 'jdoe' solicitó la operación 'commit'",
      "02:13:42 UI_COMMIT_COMPLETED: commit complete",
      "02:14:05 RPD_OSPF_NBRDOWN: vecino 10.0.12.2 de Full a Down",
      "02:14:30 NTP Server 192.0.2.10 is Reachable",
      "02:16:02 UI_LOGOUT_EVENT: el usuario 'jdoe' cierra sesión"
    ],
    answers: [1, 2, 3],
    explain: "La entrada UI_CMDLINE_READ_LINE muestra el comando set escrito en la configuración candidata (una dirección nueva que ya no coincide con el enlace 10.0.12.0/30 de R2), y UI_COMMIT junto con UI_COMMIT_COMPLETED muestran cuándo entró en producción. Las líneas de login y logout muestran la sesión, pero no un cambio, y el mensaje de vecino OSPF caído es el efecto del cambio, no el cambio en sí. `show system commit` confirmaría el mismo commit, y `rollback 1` seguido de commit lo desharía." },

  { id: "route-lookup-fill", d: 6, type: "fill", title: "Lee la tabla de enrutamiento y elige los siguientes saltos",
    prompt: "Con la tabla de enrutamiento de abajo, completa hacia dónde envía R1 el tráfico para cada destino (ingresa la dirección IP del siguiente salto, o discard).",
    context: "user@R1> show route table inet.0\n\ninet.0: 4 destinations, 5 routes (4 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n\n0.0.0.0/0          *[Static/5] 3d 02:11:09\n                    >  to 203.0.113.1 via ge-0/0/0.0\n10.1.0.0/16        *[OSPF/10] 01:22:43, metric 20\n                    >  to 10.0.12.2 via ge-0/0/1.0\n10.1.1.0/24        *[OSPF/10] 01:22:43, metric 30\n                    >  to 10.0.13.3 via ge-0/0/2.0\n                    [BGP/170] 00:45:10, localpref 100\n                      AS path: 64500 I\n                    >  to 203.0.113.1 via ge-0/0/0.0\n10.1.1.128/25      *[Static/5] 00:10:02\n                       Discard",
    fields: [
      { label: "Tráfico hacia 10.1.1.5", answers: ["10.0.13.3"] },
      { label: "Tráfico hacia 10.1.200.9", answers: ["10.0.12.2"] },
      { label: "Tráfico hacia 198.51.100.77", answers: ["203.0.113.1"] },
      { label: "Tráfico hacia 10.1.1.200", answers: ["discard", "descartado", "descartar", "descarte"] },
      { label: "Preferencia de la ruta activa para 10.1.1.0/24", answers: ["10"] }
    ],
    explain: "Junos primero usa la coincidencia de prefijo más largo: 10.1.1.5 coincide con la /24 (más específica que la /16), 10.1.200.9 solo coincide con la /16, y 198.51.100.77 no coincide con nada más que la ruta predeterminada. 10.1.1.200 cae en 10.1.1.128/25, la coincidencia más específica, cuyo next hop estático es discard, así que se descarta en silencio. La route preference solo decide entre rutas del mismo prefijo: para 10.1.1.0/24, OSPF (10) le gana a BGP (170), así que la ruta OSPF lleva el asterisco." },

  { id: "route-preference-match", d: 6, type: "match", title: "Relaciona los orígenes de ruta con su preferencia predeterminada",
    prompt: "Dos orígenes de enrutamiento ofrecen el mismo prefijo y necesitas predecir cuál activará Junos. Relaciona cada origen de ruta con su route preference predeterminada en Junos.",
    pairs: [
      ["Direct", "0"],
      ["Static", "5"],
      ["OSPF internal", "10"],
      ["IS-IS Level 1 internal", "15"],
      ["RIP", "100"],
      ["OSPF AS external", "150"],
      ["BGP", "170"]
    ],
    extra: ["20", "110", "200"],
    explain: "En Junos gana la preferencia más baja: las rutas directamente conectadas (0) le ganan a las estáticas (5), que le ganan a OSPF interno (10) y a IS-IS Level 1 interno (15). RIP es 100, las rutas OSPF externas son 150 y BGP (tanto interno como externo) es 170. Los valores 20, 110 y 200 son distancias administrativas de la plataforma de otro fabricante (eBGP, OSPF e iBGP allí), lo cual es una trampa muy común en este examen." },

  { id: "lo0-filter-select", d: 7, type: "select", title: "Evalúa un firewall filter de loopback",
    prompt: "Este filtro está aplicado como filtro de entrada en lo0.0 de R1 (192.0.2.1). Selecciona cada paquete hacia R1 que se DESCARTA.",
    context: "firewall {\n    family inet {\n        filter PROTECT-RE {\n            term ALLOW-SSH {\n                from {\n                    source-address 192.0.2.0/24;\n                    protocol tcp;\n                    destination-port ssh;\n                }\n                then accept;\n            }\n            term ALLOW-OSPF {\n                from protocol ospf;\n                then accept;\n            }\n            term ALLOW-ICMP {\n                from protocol icmp;\n                then accept;\n            }\n            term COUNT-TELNET {\n                from {\n                    protocol tcp;\n                    destination-port telnet;\n                }\n                then count telnet-hits;\n            }\n        }\n    }\n}\ninterfaces lo0 unit 0 family inet filter input PROTECT-RE;",
    options: [
      "SSH (TCP 22) desde 192.0.2.25",
      "SSH (TCP 22) desde 198.51.100.9",
      "OSPF hello desde 10.0.12.2",
      "ICMP echo request desde 203.0.113.50",
      "Telnet (TCP 23) desde 203.0.113.50",
      "SNMP (UDP 161) desde 192.0.2.25",
      "BGP (TCP 179) desde 198.51.100.1",
      "NTP (UDP 123) desde 192.0.2.10"
    ],
    answers: [1, 5, 6, 7],
    explain: "Los terms se evalúan en orden y gana la primera coincidencia; todo lo que no coincide con ningún term cae en el discard implícito al final de todo filtro. SSH desde fuera de 192.0.2.0/24 no cumple el primer term y no coincide con nada más, y SNMP, BGP y NTP no tienen ningún term, así que los cuatro se descartan en silencio, lo que rompería BGP y NTP en un router real. La trampa es COUNT-TELNET: un term que solo tiene una acción no terminal (count) recibe un accept implícito, así que telnet se cuenta y se permite. Corrígelo agregando `discard` al term." },

  { id: "route-filter-select", d: 7, type: "select", title: "Predice las rutas aceptadas por una export policy",
    prompt: "Esta política está aplicada como la export policy de BGP hacia un ISP. Selecciona cada ruta de la tabla de enrutamiento de R1 que se ANUNCIA.",
    context: "policy-options {\n    policy-statement EXPORT-ISP {\n        term CUSTOMERS {\n            from {\n                route-filter 172.16.0.0/16 upto /24;\n                route-filter 10.0.0.0/8 longer;\n            }\n            then accept;\n        }\n        term BLOCK-REST {\n            then reject;\n        }\n    }\n}",
    options: [
      "172.16.0.0/16",
      "172.16.10.0/24",
      "172.16.10.128/25",
      "172.17.0.0/16",
      "172.16.0.0/12",
      "172.16.200.0/22",
      "10.0.0.0/8",
      "10.20.0.0/16"
    ],
    answers: [0, 1, 5, 7],
    explain: "`upto /24` coincide con 172.16.0.0/16 en sí y con cualquier prefijo más específico dentro de él con una longitud de /16 a /24, así que la /16, la /22 y la /24 coinciden, pero la /25 es demasiado larga. 172.17.0.0/16 está fuera del rango, y 172.16.0.0/12 es más corta (menos específica) que el prefijo del filtro, así que ninguna de las dos coincide. `longer` coincide solo con prefijos estrictamente más específicos que 10.0.0.0/8, así que 10.20.0.0/16 coincide pero 10.0.0.0/8 en sí no (para eso haría falta `orlonger`). Todo lo que no coincide con el primer term lo rechaza BLOCK-REST." }
]);
