/* Spanish text for the CompTIA Network+ hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/network-plus.js. */
CertHub.addHandsonEs("network-plus", {
  "netp-intf-ip": {
    title: "Levanta una interfaz de router con una dirección",
    prompt: "Una LAN nueva necesita un gateway en este router.\n\nEn GigabitEthernet0/0 configura la dirección `172.16.1.1 255.255.255.0` y habilita la interfaz para que pueda funcionar como default gateway de la red 172.16.1.0/24.",
    hint: "Las interfaces de router arrancan administrativamente apagadas, así que después de ip address debes ejecutar no shutdown para que el enlace se levante.",
    explain: "Las interfaces de router están apagadas por defecto y siguen así hasta que se ejecuta no shutdown, una razón frecuente por la que un gateway recién configurado no responde. La dirección de la interfaz se convierte en el default gateway al que apuntan los hosts de esa subred. Leer el estado de las interfaces con show ip interface brief es una habilidad de implementación y resolución de problemas de Network+.",
    labels: ["GigabitEthernet0/0 tiene la dirección 172.16.1.1", "GigabitEthernet0/0 está habilitada (no shutdown)"]
  },
  "netp-vlan-trunk": {
    title: "Crea VLANs y un enlace trunk",
    prompt: "Este switch de acceso necesita una VLAN de datos y una VLAN de voz, además de un uplink que transporte ambas.\n\nCrea la VLAN 10 con el nombre `DATA` y la VLAN 20 con el nombre `VOICE`, y luego convierte GigabitEthernet0/24 en un trunk. Verifica con `show vlan brief` y `show interfaces trunk`.",
    hint: "Crea cada VLAN con vlan N y ponle nombre; luego, en el uplink, usa switchport mode trunk.",
    explain: "Las VLANs segmentan un switch en dominios de broadcast separados, comúnmente una VLAN de datos y una VLAN de voz para los teléfonos IP. Un trunk transporta varias VLANs entre switches usando etiquetas 802.1Q, mientras que cada puerto de acceso sirve a una sola VLAN. Configurar VLANs y trunking 802.1Q forma parte central del dominio de implementación de Network+.",
    labels: ["La VLAN 10 se llama DATA", "La VLAN 20 se llama VOICE", "GigabitEthernet0/24 es un trunk"]
  },
  "netp-ospf": {
    title: "Habilita el enrutamiento dinámico con OSPF",
    prompt: "Dos subredes conectadas directamente, 10.0.0.0/24 y 10.0.1.0/24, deben compartirse mediante un protocolo de enrutamiento en lugar de rutas estáticas.\n\nHabilita el proceso OSPF 1 y anuncia ambas redes en el área 0 usando sus wildcard masks.",
    hint: "Bajo router ospf 1, agrega una línea network por subred: network ADDRESS 0.0.0.255 area 0 para cada /24.",
    explain: "OSPF es un protocolo de gateway interior de estado de enlace que aprende rutas de forma dinámica y vuelve a converger cuando cambia un enlace, a diferencia de las rutas estáticas, que deben editarse a mano. Sus sentencias network usan wildcard masks (el inverso de la máscara de subred) para decidir qué interfaces participan. Comparar el enrutamiento estático y el dinámico, y la selección de rutas, es un objetivo de Network+.",
    labels: ["El proceso OSPF 1 está configurado", "10.0.0.0/24 se anuncia en el área 0", "10.0.1.0/24 se anuncia en el área 0"]
  },
  "netp-portsec": {
    title: "Endurece un puerto de switch con port security",
    prompt: "Un puerto de acceso en el vestíbulo solo debe aceptar dispositivos conocidos.\n\nEn GigabitEthernet0/1, habilita port security, permite como máximo 2 direcciones MAC, apréndelas como sticky y usa la acción de violación predeterminada `shutdown` para que un dispositivo adicional ponga el puerto en err-disabled.",
    hint: "Configura primero switchport mode access y luego switchport port-security con sus opciones maximum, mac-address sticky y violation shutdown.",
    explain: "Port security limita qué direcciones MAC acepta un puerto y cuántas, lo que protege contra MAC flooding y dispositivos no autorizados. El aprendizaje sticky registra las direcciones permitidas en la configuración, y el modo de violación shutdown pone el puerto en err-disabled ante una infracción, la respuesta más estricta. El endurecimiento de puertos de switch es un objetivo de seguridad de red de Network+.",
    labels: ["Port security está habilitado en el puerto", "El modo de violación es shutdown", "Las direcciones se aprenden como sticky"]
  },
  "netp-acl": {
    title: "Permite solo tráfico web con una ACL extendida",
    prompt: "Una VLAN de usuarios debe llegar a una subred de servidores solo por HTTP y HTTPS.\n\nConstruye una ACL extendida con nombre llamada `WEB` que permita TCP hacia los puertos 80 y 443 y deniegue todo lo demás, y luego aplícala de entrada en GigabitEthernet0/0. Revísala con `show access-lists`.",
    hint: "Usa ip access-list extended WEB, agrega permit tcp any any eq 80 y eq 443, agrega un deny ip any any y luego aplícala con ip access-group WEB in.",
    explain: "Las ACLs extendidas comparan origen, destino, protocolo y puerto, así que pueden permitir los puertos web y bloquear el resto del tráfico. El implicit deny al final descarta todo lo que no está permitido, y a menudo se agrega un deny ip any any explícito para mayor claridad en los logs. Aplicar la ACL en la dirección correcta es esencial, y las ACLs son un tema de seguridad y resolución de problemas de Network+.",
    labels: ["Existe una ACL extendida llamada WEB", "Permite HTTPS (TCP 443)", "Está aplicada de entrada en GigabitEthernet0/0"]
  },
  "netp-fix-interface": {
    title: "Soluciona una interfaz caída y guarda la corrección",
    prompt: "Los usuarios de GigabitEthernet0/0 perdieron la conectividad. `show ip interface brief` muestra la interfaz administrativamente apagada y sin dirección.\n\nAsigna `192.168.100.1 255.255.255.0`, vuelve a levantar la interfaz y luego guarda la configuración para que la corrección sobreviva a un reinicio.",
    hint: "Agrega la ip address y luego no shutdown para quitar el estado administratively down. Guarda con copy running-config startup-config o write memory.",
    explain: "Una interfaz que aparece como administratively down fue apagada por configuración, y no shutdown lo resuelve; la falta de dirección es una segunda causa común de un gateway sin respuesta. Después de corregir una falla debes verificar con show ip interface brief y luego guardar en la startup, porque una corrección sin guardar se pierde al reiniciar. Esto sigue la metodología de resolución de problemas de Network+.",
    labels: ["GigabitEthernet0/0 tiene la dirección 192.168.100.1", "GigabitEthernet0/0 está levantada otra vez (no shutdown)", "La corrección está guardada en la startup"]
  },
  "pcap-web-handshake": {
    title: "Sigue la carga de una página web desde DNS hasta FIN",
    prompt: "Un usuario en 192.168.10.25 abrió una página web. Recorre la captura en orden: encuentra la resolución del nombre, el three-way handshake de TCP, las solicitudes HTTP y el cierre de la conexión. Prueba los filtros de ejemplo y luego responde las preguntas.",
    hint: "Filtra tcp.flags.syn == 1 para ver el SYN y el SYN/ACK. El siguiente paquete del cliente con solo ACK activado completa el handshake. Para el cierre, filtra tcp.flags.fin == 1.",
    explain: "El cliente primero resuelve el nombre (DNS sobre UDP 53) y luego abre TCP con SYN, SYN/ACK, ACK (paquetes 7 a 9). HTTP viaja sobre esa conexión. El cliente la cierra con FIN/ACK, el servidor responde con su propio FIN/ACK y un último ACK completa el cierre al estilo de cuatro pasos. La consulta AAAA volvió sin respuestas, así que el navegador usó IPv4.",
    labels: ["¿Qué dirección IP devolvió DNS para www.example.com?", "¿Qué puerto de origen usó el navegador para la conexión web?", "¿Qué número de paquete completa el three-way handshake (el ACK final)?", "¿Cuántos paquetes de la captura tienen activado el flag SYN?", "¿Qué dirección IP envió el primer FIN?"]
  },
  "pcap-mgmt-protocols": {
    title: "Detecta protocolos de administración inseguros",
    prompt: "Un administrador en 10.1.1.50 gestiona varios dispositivos. Identifica cada protocolo de administración por su puerto y decide cuáles exponen datos en texto claro. Abre los paquetes de Telnet y SNMP y observa qué podría leer alguien que escucha la red.",
    hint: "Filtra telnet y abre los paquetes de datos: el usuario y la contraseña se pueden leer. Luego filtra snmp y mira el campo community. Los traps van a UDP 162 y los sondeos a UDP 161.",
    explain: "Telnet (TCP 23) y SNMPv1/v2c (UDP 161/162) envían todo, incluidos los inicios de sesión y las community strings, en texto claro. Reemplaza Telnet por SSH (TCP 22) y usa SNMPv3 con autenticación y cifrado (authPriv). SSH, SMB 3.1.1 y RDP con CredSSP cifran sus sesiones, así que solo se ven los detalles del handshake.",
    labels: ["¿Qué dirección IP de dispositivo se administra por Telnet?", "¿Qué community string de SNMP se envía en texto claro?", "¿Qué versión de SNMP se usa (v1, v2c o v3)?", "¿Qué puerto UDP recibe el trap de SNMP?", "¿Qué puerto TCP transporta la sesión de Remote Desktop?"]
  },
  "pcap-dhcp-dora": {
    title: "Lee un intercambio DORA de DHCP",
    prompt: "Dos laptops se unieron a la red 192.168.20.0/24. Filtra el tráfico DHCP, sigue el Discover, Offer, Request y ACK del primer cliente y lee las opciones que entrega el servidor.",
    hint: "Filtra dhcp. Discover y Request son broadcasts desde 0.0.0.0 por UDP 68 hacia 67. Abre el Offer o el ACK y lee Your (client) IP address, la opción Router y el tiempo de lease (86400 segundos).",
    explain: "DORA es Discover (broadcast del cliente), Offer (el servidor propone una dirección), Request (el cliente pide esa dirección) y ACK (el servidor confirma el lease). Los clientes usan UDP 68 y los servidores UDP 67. Después del ACK, el cliente envía sondeos ARP desde 0.0.0.0 para asegurarse de que nadie más use la dirección, luego un anuncio ARP, y solo entonces empieza el tráfico normal, como DNS y NTP.",
    labels: ["¿Qué dirección IP se asignó al primer cliente (3c:52:82:77:0c:41)?", "¿Cuál es la dirección IP del servidor DHCP?", "¿Qué default gateway (opción router) entrega el servidor?", "¿Cuántas horas dura el lease?", "¿En qué puerto UDP escucha el servidor DHCP?"]
  },
  "pcap-tracert-hops": {
    title: "Lee un traceroute en una captura",
    prompt: "Un técnico ejecutó tracert -d hacia 198.51.100.80 desde 192.168.50.20. Usa los tipos ICMP y el campo TTL de IP para reconstruir la ruta salto por salto y encontrar el salto que nunca respondió.",
    hint: "Filtra icmp.type == 11 para listar los routers que respondieron y luego compara el TTL de cada echo request (ip.ttl) con las respuestas que le siguen.",
    explain: "Traceroute envía sondeos con TTL 1, 2, 3 y así sucesivamente. Cada router que reduce el TTL a cero descarta el sondeo y devuelve un ICMP Time Exceeded (tipo 11). El destino responde con un Echo Reply (tipo 0). Un salto que muestra * * * normalmente filtra o limita la tasa de ICMP; no necesariamente está caído, porque los saltos posteriores sí respondieron.",
    labels: ["¿Cuál es la dirección IP del primer salto (el default gateway)?", "¿Qué valor de TTL inicial no obtuvo ninguna respuesta?", "¿A cuántos saltos está el destino?", "¿Qué número de tipo ICMP devuelven los routers cuando el TTL llega a cero?"]
  },
  "pcap-http-errors": {
    title: "Soluciona errores HTTP 404 y 500",
    prompt: "Los usuarios dicen que el portal de intranet en portal.example.com está roto: faltan imágenes y los reportes fallan. Filtra el tráfico HTTP, relaciona cada solicitud con su respuesta y determina qué problemas son del lado del cliente y cuáles del servidor.",
    hint: "Filtra http.response.code >= 400 y luego filtra http.request para ver las solicitudes. Cada respuesta sigue a la solicitud inmediatamente anterior en el mismo stream.",
    explain: "Los códigos 4xx significan que el cliente pidió algo que el servidor no puede dar (404: el archivo no está, así que revisa los enlaces de la página o los archivos desplegados). Los códigos 5xx significan que el servidor falló al procesar una solicitud válida (500: revisa los logs de la aplicación). Los tiempos de respuesta lentos en /reports/q3 apuntan a un problema del back end, no de la red.",
    labels: ["¿Cuántas respuestas fueron 404 Not Found?", "¿Qué URI de solicitud devolvió el primer error 500?", "¿Qué software de servidor web muestra el encabezado Server?", "¿Qué método HTTP usó la solicitud a /api/orders?"]
  },
  "pcap-retransmissions": {
    title: "Encuentra retransmisiones TCP",
    prompt: "El mismo portal también se siente lento. Usa los flags de análisis de TCP para encontrar segmentos perdidos, ACKs duplicados y retransmisiones, y determina qué lado tuvo que reenviar datos.",
    hint: "Filtra tcp.analysis.retransmission y luego tcp.analysis.duplicate_ack. Los ACKs duplicados repiten el mismo número Ack porque el receptor sigue esperando un segmento faltante.",
    explain: "Cuando se pierde un segmento, el receptor sigue confirmando el último byte que recibió en orden (ACKs duplicados). Después de tres ACKs duplicados, el emisor reenvía de inmediato el segmento faltante (fast retransmit) en lugar de esperar a su temporizador de retransmisión. Las dos retransmisiones del POST por parte del cliente significan que el servidor tardó en confirmar. Unas pocas retransmisiones son normales; muchas apuntan a congestión, un enlace defectuoso o un duplex mismatch.",
    labels: ["¿Cuántos paquetes están marcados como retransmisiones?", "¿Cuántos ACKs duplicados envió el cliente?", "¿Qué dirección IP retransmitió el segmento perdido del reporte después de los ACKs duplicados?", "¿Qué URI de solicitud tuvo que enviarse más de una vez?"]
  }
});
