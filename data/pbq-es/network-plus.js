/* Spanish translation of the CompTIA Network+ exam simulations. Same ids and structure as data/pbq/network-plus.js. */
CertHub.addPbqs("network-plus", [
  { id: "ports-match", d: 1, type: "match", title: "Relaciona protocolos con puertos predeterminados",
    prompt: "Una solicitud de cambio de firewall enumera los servicios por nombre. Relaciona cada protocolo con su puerto predeterminado well-known.",
    pairs: [["SMTP", "25"], ["NTP", "123"], ["SNMP (consultas al agente)", "161"], ["Syslog", "514"], ["LDAPS", "636"], ["RDP", "3389"], ["SIP", "5060"]],
    extra: ["162", "389", "587"],
    explain: "SMTP retransmite correo en el 25 (587 es el puerto de envío que usan los clientes de correo). NTP usa UDP 123, a los agentes SNMP se les consulta en UDP 161 mientras que los traps se envían al gestor en el 162, y syslog usa UDP 514. LDAPS es LDAP sobre TLS en el 636, mientras que LDAP sin cifrar es el 389. RDP escucha en el 3389 y la señalización SIP usa el 5060 (5061 para SIP sobre TLS)." },

  { id: "subnet-27-fill", d: 1, type: "fill", title: "Calcula una subred /27",
    prompt: "Una impresora está configurada como 172.16.45.130/27. Completa los detalles de la subred.",
    fields: [
      { label: "Máscara de subred (decimal con puntos)", answers: ["255.255.255.224"] },
      { label: "Dirección de red", answers: ["172.16.45.128"] },
      { label: "Dirección de broadcast", answers: ["172.16.45.159"] },
      { label: "Primer host utilizable", answers: ["172.16.45.129"] },
      { label: "Último host utilizable", answers: ["172.16.45.158"] },
      { label: "Cantidad de hosts utilizables", answers: ["30"] }
    ],
    explain: "Una /27 toma prestados 3 bits del último octeto, lo que da una máscara de 255.255.255.224 y un tamaño de bloque de 256 - 224 = 32. Los bloques son .0, .32, .64, .96, .128, .160, así que .130 cae en el bloque .128. Su broadcast es uno menos que el siguiente bloque (.159), los hosts utilizables van de .129 a .158, y quedan 2^5 - 2 = 30 direcciones utilizables después de quitar la de red y la de broadcast." },

  { id: "osi-pdu-match", d: 1, type: "match", title: "Relaciona las capas OSI con sus unidades de datos y dispositivos",
    prompt: "Relaciona cada descripción con la capa OSI a la que pertenece.",
    pairs: [["Bits en el medio; aquí operan hubs, repetidores y transceptores", "Capa 1 - Física"], ["Tramas direccionadas por MAC; aquí reenvían los switches", "Capa 2 - Enlace de datos"], ["Paquetes direccionados por IP; aquí reenvían los routers", "Capa 3 - Red"], ["Segmentos o datagramas identificados por números de puerto", "Capa 4 - Transporte"], ["Cifrado, compresión y codificación de caracteres", "Capa 6 - Presentación"]],
    extra: ["Capa 5 - Sesión", "Capa 7 - Aplicación"],
    explain: "La Capa 1 mueve bits en bruto e incluye el cableado, los hubs y los transceptores. La Capa 2 arma tramas con direcciones MAC, que es lo que leen los switches. La Capa 3 se encarga del direccionamiento lógico IP y del enrutamiento entre redes. La Capa 4 usa números de puerto, y su PDU se llama segmento en TCP o datagrama en UDP. La traducción de datos, como el cifrado y la codificación, es tarea de la capa de Presentación, no de la capa de Sesión, que establece y cierra los diálogos." },

  { id: "route-select-fill", d: 2, type: "fill", title: "Elige la ruta que usará el router",
    prompt: "Con la tabla de enrutamiento de abajo, ingresa la dirección de siguiente salto que usa el router para cada destino.",
    context: "R1# show ip route\nCodes: S - static, O - OSPF, D - EIGRP, C - connected\n\nS*    0.0.0.0/0          [1/0]     via 203.0.113.1\nO     10.0.0.0/8         [110/20]  via 10.255.0.2\nD     10.20.0.0/16       [90/3072] via 10.255.0.6\nS     10.20.30.0/24      [1/0]     via 10.255.0.10\nC     10.255.0.0/28      is directly connected, GigabitEthernet0/1",
    fields: [
      { label: "Siguiente salto para 10.20.30.9", answers: ["10.255.0.10"] },
      { label: "Siguiente salto para 10.20.99.5", answers: ["10.255.0.6"] },
      { label: "Siguiente salto para 10.5.5.5", answers: ["10.255.0.2"] },
      { label: "Siguiente salto para 198.51.100.40", answers: ["203.0.113.1"] }
    ],
    explain: "Los routers eligen primero por la coincidencia de prefijo más largo (longest prefix match); la distancia administrativa solo desempata entre rutas hacia exactamente el mismo prefijo. 10.20.30.9 coincide con /0, /8, /16 y /24, así que gana la estática /24. 10.20.99.5 coincide hasta la /16 de EIGRP, 10.5.5.5 solo coincide con la /8 de OSPF, y 198.51.100.40 no coincide con nada más que la ruta predeterminada hacia 203.0.113.1." },

  { id: "stp-order", d: 2, type: "order", title: "Ordena la convergencia de Spanning Tree",
    prompt: "Se acaban de conectar tres switches en triángulo. Ordena las decisiones de Spanning Tree Protocol según ocurren.",
    steps: [
      "Los switches intercambian BPDU y eligen el root bridge (el bridge ID más bajo: prioridad y luego MAC)",
      "Cada switch que no es root selecciona un root port con el menor costo de ruta hacia el root bridge",
      "Se elige un designated port en cada segmento de red",
      "Todos los puertos restantes pasan al estado blocking (discarding) para romper el bucle",
      "Los puertos que reenvían pasan por listening/learning hasta llegar a forwarding"
    ],
    explain: "STP primero elige un root bridge, ya que todas las demás decisiones se miden en relación con él. Luego, cada switch que no es root elige su única mejor ruta hacia el root (el root port), y cada segmento obtiene un designated port. Cualquier puerto que no sea root ni designated se bloquea, lo que rompe el bucle, y solo entonces los puertos activos pasan por listening y learning hasta forwarding (un proceso más lento en el 802.1D clásico que en RSTP)." },

  { id: "dr-metrics-match", d: 3, type: "match", title: "Relaciona términos de recuperación ante desastres",
    prompt: "Relaciona cada término de continuidad del negocio con su definición.",
    pairs: [["RPO", "Cantidad máxima aceptable de pérdida de datos, medida hacia atrás en el tiempo desde la interrupción"], ["RTO", "Tiempo máximo aceptable para restaurar un servicio después de una interrupción"], ["MTTR", "Tiempo promedio que toma reparar un componente que falló"], ["MTBF", "Tiempo promedio de funcionamiento entre fallas de un componente reparable"], ["Warm site", "Instalación con hardware disponible que necesita restaurar los datos actuales antes de usarse"], ["Cold site", "Solo espacio y energía; hay que traer e instalar el equipo"]],
    extra: ["Instalación completamente replicada que puede asumir la operación casi de inmediato"],
    explain: "El RPO se refiere a los datos (qué tan atrás puede estar tu última copia buena), mientras que el RTO se refiere al tiempo para volver a poner el servicio en marcha. MTTR y MTBF describen la confiabilidad de los componentes: cuánto tardan las reparaciones y cuánto funcionan las cosas entre fallas. Un cold site es solo una instalación vacía, un warm site tiene equipo pero necesita restaurar los datos, y la definición sobrante describe un hot site." },

  { id: "syslog-severity-select", d: 3, type: "select", title: "Filtra syslog por severidad",
    prompt: "El NOC solo llama al personal de guardia por mensajes de severidad 3 (error) o más graves. Selecciona cada línea que debería generar una llamada.",
    context: "Sep 25 02:11:04 core-sw1: %SYS-5-CONFIG_I: Configured from console by admin\nSep 25 02:13:40 core-sw1: %LINK-3-UPDOWN: Interface Gi1/0/24, changed state to down\nSep 25 02:13:41 core-sw1: %LINEPROTO-5-UPDOWN: Line protocol on Interface Gi1/0/24, changed state to down\nSep 25 02:20:17 edge-rtr: %SYS-2-MALLOCFAIL: Memory allocation of 65536 bytes failed\nSep 25 02:25:55 core-sw1: %SW_MATM-4-MACFLAP_NOTIF: Host 0050.56a1.2b3c in vlan 20 is flapping between port Gi1/0/5 and port Gi1/0/6\nSep 25 02:30:02 edge-rtr: %SEC-6-IPACCESSLOGP: list OUTSIDE denied tcp 203.0.113.44(51514) -> 198.51.100.10(23)\nSep 25 02:31:19 ups-mgmt: %ENV-1-POWER: Input power lost, running on battery",
    options: ["%SYS-5-CONFIG_I (configurado desde la consola)", "%LINK-3-UPDOWN (Gi1/0/24 caída)", "%LINEPROTO-5-UPDOWN (protocolo de línea caído)", "%SYS-2-MALLOCFAIL (falló la asignación de memoria)", "%SW_MATM-4-MACFLAP_NOTIF (MAC flapping)", "%SEC-6-IPACCESSLOGP (deny de ACL)", "%ENV-1-POWER (funcionando con batería)"],
    answers: [1, 3, 6],
    explain: "El dígito después de la facility es la severidad de syslog: 0 emergency, 1 alert, 2 critical, 3 error, 4 warning, 5 notice, 6 informational, 7 debug. Los números más bajos son más graves, así que los niveles 1, 2 y 3 alcanzan el umbral. El MAC flap (4) es una advertencia que vale la pena investigar en la mañana, y los mensajes de configuración (5) y de log de la ACL (6) son rutinarios." },

  { id: "acl-eval-select", d: 4, type: "select", title: "Evalúa una ACL de entrada",
    prompt: "Esta ACL está aplicada en sentido de entrada (inbound) en la interfaz que da a internet. Selecciona cada flujo que será PERMITIDO.",
    context: "ip access-list extended OUTSIDE-IN\n 10 deny   tcp any host 192.0.2.10 eq 23\n 20 permit tcp any host 192.0.2.10 eq 443\n 30 permit tcp 198.51.100.0 0.0.0.255 host 192.0.2.10 eq 22\n 40 permit udp any host 192.0.2.53 eq 53\n (implicit deny ip any any)",
    options: ["203.0.113.5 -> 192.0.2.10 TCP/443", "198.51.100.20 -> 192.0.2.10 TCP/22", "203.0.113.5 -> 192.0.2.10 TCP/22", "198.51.100.20 -> 192.0.2.10 TCP/23", "203.0.113.9 -> 192.0.2.53 UDP/53", "203.0.113.9 -> 192.0.2.53 TCP/53", "198.51.100.20 -> 192.0.2.10 TCP/80"],
    answers: [0, 4, 1],
    explain: "Las ACL se procesan de arriba hacia abajo y gana la primera coincidencia, con un deny implícito al final. HTTPS hacia 192.0.2.10 está permitido desde cualquier origen, SSH solo desde 198.51.100.0/24 (el wildcard 0.0.0.255 coincide con toda la /24), y DNS solo por UDP. Telnet se deniega explícitamente, mientras que SSH desde 203.0.113.5, DNS por TCP (usado para transferencias de zona y respuestas grandes) y HTTP caen en el deny implícito." },

  { id: "l2-attack-match", d: 4, type: "match", title: "Relaciona ataques de Capa 2 con sus mitigaciones",
    prompt: "Relaciona cada amenaza a nivel de switch con el control que la mitiga de forma más directa.",
    pairs: [["Un dispositivo no autorizado en un puerto de acceso responde solicitudes DHCP", "DHCP snooping"], ["Un atacante envía respuestas ARP falsificadas para convertirse en man in the middle", "Dynamic ARP inspection"], ["Una herramienta inunda el switch con miles de MAC de origen falsas", "Port security con un límite de direcciones MAC"], ["Un host negocia un trunk para llegar a otras VLAN", "Deshabilitar DTP y fijar los puertos de acceso manualmente"], ["Alguien conecta una laptop desconocida en una toma de la sala de conferencias", "Autenticación basada en puerto 802.1X"], ["Un usuario conecta un switch doméstico que podría crear un bucle", "BPDU guard"]],
    extra: ["Jumbo frames"],
    explain: "DHCP snooping marca solo los uplinks como confiables para las respuestas de servidores DHCP, y Dynamic ARP inspection usa esa tabla de snooping para descartar respuestas ARP falsificadas. Port security limita la cantidad de MAC aprendidas en un puerto, lo que detiene el desbordamiento de la tabla CAM. El switch spoofing se evita deshabilitando DTP y fijando el modo access de forma estática, 802.1X exige que los dispositivos se autentiquen antes de que el puerto deje pasar tráfico, y BPDU guard apaga un puerto de borde que recibe una BPDU." },

  { id: "troubleshoot-order", d: 5, type: "order", title: "Aplica la metodología de troubleshooting",
    prompt: "Los usuarios del tercer piso no pueden llegar a un servidor de archivos. Ordena los pasos de la metodología de troubleshooting de CompTIA.",
    steps: [
      "Identifica el problema: recopila información, pregunta a los usuarios, identifica los síntomas y los cambios recientes",
      "Establece una teoría de la causa probable",
      "Prueba la teoría para determinar la causa",
      "Establece un plan de acción para resolver el problema e identifica los posibles efectos",
      "Implementa la solución o escala según sea necesario",
      "Verifica la funcionalidad completa del sistema e implementa medidas preventivas si aplica",
      "Documenta los hallazgos, las acciones, los resultados y las lecciones aprendidas"
    ],
    explain: "La metodología de Network+ tiene siete pasos y los exámenes suelen evaluar su orden. Debes entender el problema antes de formular teorías, y probar la teoría antes de planificar una corrección; si la prueba falla, formulas una nueva teoría o escalas. La planificación va antes de la implementación para considerar los efectos secundarios y las ventanas de cambio, la verificación confirma que todo el servicio funciona, y la documentación siempre va al final." },

  { id: "ipconfig-apipa-select", d: 5, type: "select", title: "Interpreta la salida de ipconfig",
    prompt: "Un usuario reporta que no tiene acceso a la red. Según la salida, selecciona cada afirmación VERDADERA.",
    context: "C:\\> ipconfig /all\n\nEthernet adapter Ethernet:\n   Connection-specific DNS Suffix  . :\n   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM\n   Physical Address. . . . . . . . . : 3C-52-82-1A-7F-04\n   DHCP Enabled. . . . . . . . . . . : Yes\n   Autoconfiguration Enabled . . . . : Yes\n   Autoconfiguration IPv4 Address. . : 169.254.83.17(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . . . . . :\n   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1",
    options: ["El cliente no recibió un lease de un servidor DHCP", "La dirección IPv4 se autoasignó mediante APIPA", "El host tiene una dirección IPv4 configurada de forma estática", "El adaptador no muestra enlace físico (medio desconectado)", "Actualmente el host puede llegar a hosts de otras subredes", "Revisar la VLAN del puerto del switch y el scope/relay de DHCP son buenos próximos pasos"],
    answers: [0, 1, 5],
    explain: "Una dirección 169.254.0.0/16 con la etiqueta 'Autoconfiguration' y DHCP habilitado significa que el cliente pidió un lease y no recibió respuesta, así que Windows asignó una dirección APIPA. El adaptador tiene enlace (de lo contrario ipconfig mostraría 'Media disconnected'), pero sin gateway predeterminado no puede salir del segmento local. Entre las causas probables están una VLAN de acceso incorrecta, un DHCP relay faltante (ip helper) o un scope agotado." },

  { id: "symptom-cause-match", d: 5, type: "match", title: "Relaciona síntomas con causas raíz",
    prompt: "Relaciona cada síntoma observado con su causa más probable.",
    pairs: [["Los contadores de la interfaz muestran late collisions; un lado está en half duplex", "Discrepancia de dúplex"], ["Los errores CRC siguen aumentando en un solo enlace de cobre que pasa cerca de iluminación fluorescente", "EMI o un cable dañado"], ["Los pings funcionan a través de un túnel VPN, pero las transferencias de archivos grandes se detienen", "Discrepancia de MTU / problema de fragmentación"], ["Los clientes nuevos obtienen 169.254.x.x mientras los clientes existentes funcionan bien", "Agotamiento del scope DHCP"], ["El Wi-Fi se cae en la sala de descanso cada vez que calientan el almuerzo", "Interferencia en 2.4 GHz de un horno de microondas"], ["Los usuarios pueden llegar a los sitios por dirección IP, pero no por nombre", "Configuración incorrecta de DNS"]],
    extra: ["Gateway predeterminado incorrecto"],
    explain: "Las late collisions son una señal clásica de discrepancia de dúplex, mientras que los errores CRC apuntan a problemas físicos como EMI, malas terminaciones o un cable dañado. Que los paquetes pequeños pasen y los grandes fallen sugiere problemas de MTU o fragmentación, a menudo en túneles. Que los clientes nuevos no obtengan lease mientras los antiguos siguen funcionando apunta a un scope agotado, los hornos de microondas interfieren en la banda de 2.4 GHz, y que funcione por IP pero fallen los nombres aísla la falla en DNS y no en el gateway." }
]);
