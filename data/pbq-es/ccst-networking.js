/* Spanish translation of the CCST Networking exam simulations. Same ids and structure as data/pbq/ccst-networking.js. */
CertHub.addPbqs("ccst-networking", [
  { id: "ports-match", d: 1, type: "match", title: "Relaciona protocolos con puertos predeterminados",
    prompt: "Un ticket de la mesa de ayuda te pide confirmar qué puertos debe permitir un firewall nuevo. Relaciona cada protocolo con su puerto predeterminado.",
    pairs: [["FTP (control)", "21"], ["SSH / SFTP", "22"], ["DNS", "53"], ["TFTP", "69"], ["NTP", "123"], ["HTTPS", "443"]],
    extra: ["20", "80", "3389"],
    explain: "FTP usa TCP 21 para su canal de control (20 es el puerto de datos clásico del modo activo), y SFTP funciona dentro de SSH en TCP 22. DNS usa el 53 (UDP para la mayoría de las consultas, TCP para respuestas grandes y transferencias de zona), TFTP usa UDP 69, NTP usa UDP 123 y HTTPS usa TCP 443. El puerto 80 es HTTP sin cifrar y el 3389 es RDP; ambos son distractores comunes." },

  { id: "encap-order", d: 1, type: "order", title: "Ordena los pasos de encapsulación",
    prompt: "Una laptop envía una solicitud HTTPS a un servidor web. Ordena los pasos tal como ocurren en la laptop que envía, desde la aplicación hasta el medio físico.",
    steps: [
      "El navegador crea los datos de aplicación (la solicitud HTTP dentro de TLS)",
      "TCP agrega los puertos de origen y destino, y crea un segmento",
      "IP agrega las direcciones IP de origen y destino, y crea un paquete",
      "Ethernet o Wi-Fi agrega las direcciones MAC y un tráiler (FCS), y crea una trama",
      "La interfaz de red envía la trama como bits (señales eléctricas, de luz o de radio)"
    ],
    explain: "La encapsulación va de arriba hacia abajo: datos en la capa de aplicación, un segmento en la capa de transporte (puertos), un paquete en la capa de red (direcciones IP), una trama en la capa de enlace de datos (direcciones MAC más una secuencia de verificación de trama) y bits en la capa física. El receptor invierte el proceso (desencapsulación) y quita cada encabezado de abajo hacia arriba." },

  { id: "subnet-27-fill", d: 2, type: "fill", title: "Calcula una subred /27",
    prompt: "Una impresora está configurada con 172.16.45.200/27. Completa los valores de su subred.",
    context: "C:\\> ipconfig\nEthernet adapter Ethernet:\n   IPv4 Address. . . . . . . . . . . : 172.16.45.200\n   Subnet Mask . . . . . . . . . . . : 255.255.255.224\n   Default Gateway . . . . . . . . . : 172.16.45.193",
    fields: [
      { label: "Dirección de red", answers: ["172.16.45.192"] },
      { label: "Dirección de broadcast", answers: ["172.16.45.223"] },
      { label: "Última dirección de host utilizable", answers: ["172.16.45.222"] },
      { label: "Cantidad de hosts utilizables", answers: ["30"] }
    ],
    explain: "Una máscara /27 (255.255.255.224) deja 5 bits de host, así que cada subred es un bloque de 32 direcciones: .0, .32, .64 ... .192, .224. La dirección .200 cae en el bloque .192, por lo que la red es 172.16.45.192 y el broadcast es la última dirección antes del siguiente bloque, 172.16.45.223. Los hosts utilizables son 2^5 - 2 = 30 (de .193 a .222), y el gateway .193 está correctamente dentro de ese rango." },

  { id: "ipv6-types-match", d: 2, type: "match", title: "Identifica tipos de direcciones IPv6",
    prompt: "Ejecutaste ipconfig y una captura de paquetes en una red dual-stack. Relaciona cada dirección IPv6 con su tipo.",
    pairs: [
      ["fe80::1c2b:3aff:fe4d:5e6f", "Unicast link-local"],
      ["2001:db8:acad:10::25", "Unicast global"],
      ["fd12:3456:789a::10", "Unique local"],
      ["ff02::1", "Multicast"],
      ["::1", "Loopback"]
    ],
    extra: ["Broadcast", "APIPA"],
    explain: "Las direcciones link-local empiezan con fe80::/10 y existen en toda interfaz IPv6; las unicast globales están en 2000::/3 (2001:db8::/32 es el rango de documentación dentro de ese bloque). Las direcciones unique local usan fc00::/7, en la práctica fd00::/8, como los rangos IPv4 privados. ff00::/8 es multicast (ff02::1 son todos los nodos del enlace) y ::1 es loopback. IPv6 no tiene broadcast, y APIPA (169.254.x.x) es un concepto de IPv4." },

  { id: "connector-match", d: 3, type: "match", title: "Relaciona conectores con su uso",
    prompt: "Un técnico está armando una hoja de identificación de conectores con etiquetas. Relaciona cada conector con su descripción.",
    pairs: [
      ["RJ-45", "Conector de 8 posiciones en cable Ethernet de par trenzado"],
      ["RJ-11", "Conector más pequeño de 6 posiciones en una línea telefónica o DSL"],
      ["F-type", "Conector coaxial roscado en un cable módem o una toma de TV"],
      ["BNC", "Conector coaxial de bayoneta (giro y traba) en equipos antiguos de video y CCTV"],
      ["LC", "Conector de fibra dúplex pequeño con traba, usado con la mayoría de los módulos SFP"],
      ["SC", "Conector de fibra cuadrado de tipo push-pull"]
    ],
    extra: ["Conector USB usado para una sesión de consola de Cisco"],
    explain: "RJ-45 termina los 8 hilos del par trenzado Ethernet, mientras que el RJ-11, más angosto, lleva telefonía analógica y DSL. F-type (roscado) y BNC (bayoneta) son coaxiales: F-type para internet por cable y TV, BNC para Ethernet antiguo y video/CCTV. LC es el conector de fibra de factor de forma pequeño que encaja en los transceptores SFP, y SC es el conector de fibra cuadrado push-pull más grande; ST, un conector de fibra redondo de bayoneta, es el que suele confundirse con BNC." },

  { id: "cable-runs-select", d: 3, type: "select", title: "Detecta los tendidos de cable problemáticos",
    prompt: "Revisa los tendidos de cable planificados para la remodelación de una oficina. Selecciona cada tendido que incumpla el estándar o que probablemente cause problemas.",
    context: "Tendido  Medio                      Longitud  Velocidad requerida  Notas\nA        Cat 6 UTP                  85 m      1 Gbps               Por una bandeja de techo con clasificación plenum\nB        Cat 5e UTP                 120 m     1 Gbps               Cámara de bodega, sin switch intermedio\nC        Cat 6 UTP                  40 m      1 Gbps               Sujeto a la carcasa del motor de un ascensor\nD        Fibra monomodo (LC)        60 m      1 Gbps               Conectado a un SFP 1000BASE-SX (multimodo)\nE        Cat 6a UTP                 90 m      10 Gbps              De la sala de servidores al armario de cableado\nF        Fibra multimodo OM3 (LC)   250 m     1 Gbps               Entre edificios, SFP 1000BASE-SX\nG        Cat 5e UTP                 80 m      10 Gbps              Uplink entre dos switches",
    options: ["Tendido A", "Tendido B", "Tendido C", "Tendido D", "Tendido E", "Tendido F", "Tendido G"],
    answers: [1, 2, 3, 6],
    explain: "Ethernet de par trenzado está limitado a 100 m por tendido, así que B, con 120 m, no cumple. El tendido C está expuesto a una fuerte EMI del motor, lo que provoca errores en cobre sin blindaje. El D mezcla fibra monomodo con un transceptor multimodo (SX); la fibra y la óptica deben coincidir. El G necesita Cat 6a (o superior) para 10GBASE-T a esa distancia, así que Cat 5e no está certificado para eso. A, E y F cumplen la especificación: la multimodo OM3 cubre sin problema 250 m a 1 Gbps." },

  { id: "mac-table-flood", d: 4, type: "select", title: "Predice por dónde inunda una trama el switch",
    prompt: "La PC en Gi1/0/1 envía una trama unicast a la MAC 0050.56aa.9c10, que no está en la tabla de direcciones MAC. Todos los puertos listados están conectados y activos. Selecciona cada puerto por el que el switch envía la trama.",
    context: "SW1# show vlan brief\nVLAN Name        Status    Ports\n10   STAFF       active    Gi1/0/1, Gi1/0/2, Gi1/0/3, Gi1/0/4\n20   GUEST       active    Gi1/0/5, Gi1/0/6\n(Gi1/0/24 es un trunk 802.1Q que permite las VLAN 10 y 20)\n\nSW1# show mac address-table dynamic\nVlan  Mac Address       Type     Ports\n10    0011.2233.4401    DYNAMIC  Gi1/0/1\n10    0011.2233.4402    DYNAMIC  Gi1/0/2\n20    0011.2233.4405    DYNAMIC  Gi1/0/5\n10    00aa.bbcc.0001    DYNAMIC  Gi1/0/24",
    options: ["Gi1/0/1", "Gi1/0/2", "Gi1/0/3", "Gi1/0/4", "Gi1/0/5", "Gi1/0/6", "Gi1/0/24"],
    answers: [1, 2, 3, 6],
    explain: "Un switch inunda una trama unicast desconocida por todos los puertos de la misma VLAN, excepto por el puerto donde llegó. El emisor está en la VLAN 10, así que la trama va a Gi1/0/2, Gi1/0/3 y Gi1/0/4, y también sale por el trunk Gi1/0/24 porque el trunk transporta la VLAN 10. Los puertos de la VLAN 20 (Gi1/0/5 y Gi1/0/6) nunca la ven, porque las VLAN son dominios de broadcast separados, y el switch nunca devuelve una trama por su puerto de entrada." },

  { id: "port-led-match", d: 4, type: "match", title: "Interpreta los LED de puerto de un Catalyst",
    prompt: "Un ingeniero al teléfono pregunta qué están mostrando los LED de puerto de un switch de acceso Cisco Catalyst (modo de estado de puerto). Relaciona cada estado del LED con su significado.",
    pairs: [
      ["Apagado", "Sin enlace, o el puerto está deshabilitado administrativamente"],
      ["Verde fijo", "El enlace está activo sin tráfico en este momento"],
      ["Verde parpadeante", "El enlace está activo y enviando o recibiendo tráfico"],
      ["Alternando verde y ámbar", "Falla del enlace, como errores excesivos"],
      ["Ámbar fijo", "El puerto está bloqueado por Spanning Tree y no reenvía"]
    ],
    extra: ["El switch está recibiendo alimentación PoE desde el puerto"],
    explain: "Verde significa un enlace correcto, y verde parpadeante indica además actividad. Apagado significa que no se detecta nada (desconectado, el otro extremo apagado o puerto en shutdown). Ámbar fijo normalmente significa que Spanning Tree está bloqueando el puerto, lo cual es normal hasta unos 30 segundos después de conectar un dispositivo, mientras que alternar verde/ámbar apunta a una falla del enlace, como errores por un cable dañado o un problema de dúplex. Los puertos del switch suministran PoE; no lo reciben." },

  { id: "troubleshoot-order", d: 5, type: "order", title: "Ordena la metodología de troubleshooting",
    prompt: "Un usuario reporta que no puede imprimir en la impresora compartida de la oficina. Pon los pasos de troubleshooting en el orden correcto.",
    steps: [
      "Identifica el problema: haz preguntas, averigua qué cambió y cuántos usuarios están afectados",
      "Establece una teoría de la causa probable",
      "Prueba la teoría para determinar la causa",
      "Establece un plan de acción para resolver el problema",
      "Implementa la solución o escala si es necesario",
      "Verifica la funcionalidad completa del sistema y aplica medidas preventivas",
      "Documenta los hallazgos, las acciones y los resultados en el ticket"
    ],
    explain: "La metodología va de la información a la acción: identifica el problema y su alcance, formula una teoría y pruébala antes de cambiar algo. Si la prueba confirma la teoría, planifica la corrección, impleméntala (o escala si está fuera de tus permisos) y luego verifica que el usuario pueda imprimir y que nada más se haya dañado. La documentación va al final para que el ticket registre lo que se encontró y se hizo, pensando en el siguiente técnico." },

  { id: "ip-int-brief-select", d: 5, type: "select", title: "Lee show ip interface brief",
    prompt: "Usuarios de dos redes de sucursal reportan caídas. Revisa la salida del router y selecciona cada afirmación que esté respaldada por ella.",
    context: "R1# show ip interface brief\nInterface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     192.168.1.1     YES manual up                    up\nGigabitEthernet0/1     10.0.12.1       YES manual administratively down down\nGigabitEthernet0/2     10.0.23.1       YES manual down                  down\nSerial0/0/0            203.0.113.2     YES manual up                    down\nVlan1                  unassigned      YES unset  administratively down down",
    options: [
      "Gi0/0 funciona tanto en la Capa 1 como en la Capa 2",
      "Gi0/1 se deshabilitó con el comando shutdown y necesita no shutdown para activarse",
      "Lo más probable es que Gi0/2 tenga un problema físico, como un cable desconectado o un dispositivo apagado en el otro extremo",
      "Serial0/0/0 no tiene ningún cable conectado",
      "Serial0/0/0 tiene señal física pero un problema de enlace de datos, como una discrepancia de encapsulación o de keepalive",
      "Gi0/0 no tiene ninguna dirección IP configurada",
      "Vlan1 está reenviando tráfico enrutado"
    ],
    answers: [0, 1, 2, 4],
    explain: "La columna Status es la Capa 1 y Protocol es la Capa 2. up/up (Gi0/0) está sano; 'administratively down' (Gi0/1) significa que alguien ingresó shutdown; down/down sin shutdown administrativo (Gi0/2) apunta al cableado o al otro extremo. up/down en Serial0/0/0 significa que la capa física está bien pero el protocolo de enlace de datos no, algo típico de una discrepancia de encapsulación, así que no es un cable faltante. Gi0/0 claramente tiene 192.168.1.1, y Vlan1 está en shutdown y sin dirección." },

  { id: "fw-rules-select", d: 6, type: "select", title: "Evalúa reglas de firewall",
    prompt: "El firewall procesa las reglas de arriba hacia abajo, usa la primera coincidencia y termina con un deny implícito. Selecciona cada flujo que será permitido.",
    context: "#  Action  Proto  Source             Destination        Dest port\n1  permit  TCP    any                198.51.100.10      443\n2  permit  TCP    any                198.51.100.10      80\n3  deny    TCP    any                198.51.100.10      22\n4  permit  TCP    192.168.50.0/24    any                22\n5  permit  UDP    192.168.50.0/24    198.51.100.53      53\n   (implicit deny all)",
    options: [
      "203.0.113.44 a 198.51.100.10, TCP 443",
      "192.168.50.20 a 198.51.100.10, TCP 22",
      "192.168.50.20 a 198.51.100.20, TCP 22",
      "192.168.60.5 a 198.51.100.53, UDP 53",
      "192.168.50.7 a 198.51.100.53, UDP 53",
      "203.0.113.44 a 198.51.100.10, TCP 3389",
      "203.0.113.44 a 198.51.100.10, UDP 443"
    ],
    answers: [0, 2, 4],
    explain: "HTTPS hacia .10 coincide con la regla 1. SSH desde 192.168.50.20 hacia .10 choca con el deny de la regla 3 antes de llegar a la regla 4, porque el orden importa; SSH hacia .20 no coincide con la regla 3 y sí con la regla 4. DNS desde 192.168.50.7 coincide con la regla 5, pero 192.168.60.5 está fuera de 192.168.50.0/24 y cae en el deny implícito. RDP (3389) y UDP 443 no coinciden con ninguna regla permit, ya que la regla 1 solo permite TCP, así que ambos se deniegan." },

  { id: "wifi-security-match", d: 6, type: "match", title: "Relaciona opciones de seguridad inalámbrica",
    prompt: "Estás revisando la página de configuración inalámbrica de un router de oficina pequeña. Relaciona cada opción con su descripción.",
    pairs: [
      ["WEP", "Cifrado heredado basado en RC4 que se puede romper en minutos"],
      ["WPA2-Personal", "Cifrado AES-CCMP con una sola frase de acceso compartida"],
      ["WPA3-Personal", "Handshake SAE que resiste la adivinación de contraseñas offline"],
      ["WPA2/WPA3-Enterprise", "Inicio de sesión 802.1X contra un servidor RADIUS con credenciales por usuario"],
      ["WPS", "Función de configuración por PIN o botón que conviene desactivar"],
      ["Abierta (sin seguridad)", "Sin cifrado del tráfico por el aire"]
    ],
    extra: ["Oculta el SSID para que los atacantes no puedan encontrar la red"],
    explain: "WEP está roto y nunca debe usarse. WPA2-Personal usa AES con una clave precompartida, y WPA3-Personal reemplaza el handshake PSK por SAE, lo que impide que los atacantes capturen un handshake y adivinen la contraseña offline. Los modos Enterprise usan 802.1X y un servidor RADIUS para que cada usuario tenga sus propias credenciales. El método PIN de WPS es vulnerable a fuerza bruta, y las redes abiertas envían el tráfico sin cifrar. Ocultar el SSID no es seguridad real, porque el nombre sigue apareciendo en el tráfico de sondeo (probe) de los clientes." }
]);
