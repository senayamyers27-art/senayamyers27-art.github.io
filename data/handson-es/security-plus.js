/* Spanish text for the CompTIA Security+ hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/security-plus.js. */
CertHub.addHandsonEs("security-plus", {
  "secp-fw-smtp": {
    title: "Solo el servidor de correo puede enviar SMTP",
    prompt: "Se detectó que varias estaciones de trabajo enviaban spam directamente a internet por TCP 25. Solo el servidor de correo (`mail-server`, 172.16.1.25 en la DMZ) debería enviar SMTP hacia afuera.\n\nActualiza las reglas para que las estaciones de trabajo puedan navegar por la web y usar DNS, pero no puedan enviar SMTP a internet. Este firewall termina con un deny implícito.",
    hint: "Reemplaza service any en la regla inside por los puertos que los usuarios necesitan: tcp/80, tcp/443 y udp/53. Conserva la regla tcp/25 del servidor de correo.",
    explain: "Restringir el SMTP saliente al servidor de correo es un control de filtrado de salida (egress filtering): los hosts infectados no pueden enviar spam ni exfiltrar datos por correo, y el servidor de correo puede aplicar filtrado y registro. La regla inside debe listar solo los servicios que los usuarios necesitan, lo que es privilegio mínimo; todo lo demás cae en el deny implícito al final de la lista de reglas.",
    labels: ["El servidor de correo envía correo por TCP 25", "Una estación de trabajo envía SMTP a internet", "Una estación de trabajo navega a un sitio HTTPS", "Una estación de trabajo envía una consulta DNS"]
  },
  "secp-fw-quarantine": {
    title: "Pon en cuarentena un host comprometido",
    prompt: "Durante un incidente, la estación de trabajo 10.1.9.44 (`infected-pc`) debe quedar aislada de la red mientras el equipo investiga. Se agregó una regla de bloqueo, pero el host sigue llegando a internet y al servidor de archivos.\n\nCorrige la lista de reglas para que la PC infectada quede bloqueada en todas partes y los demás hosts sigan funcionando.",
    hint: "El firewall usa la primera regla que coincide. La regla de bloqueo está al final, debajo de los allow generales. Muévela hasta arriba.",
    explain: "La contención es el paso que sigue a la detección en la respuesta a incidentes, y aislar un host con una regla de firewall es una forma común de hacerlo. Una regla solo funciona si nada por encima de ella coincide primero: aquí las reglas allow generales ocultan el bloqueo. Poner los deny específicos por encima de los allow generales, y probar después, es higiene básica de firewall.",
    labels: ["La PC infectada llega a internet", "La PC infectada llega al servidor de archivos", "Una PC sana llega al servidor de archivos", "Una PC sana navega a un sitio HTTPS"]
  },
  "secp-fw-guest": {
    title: "Segmenta el Wi-Fi de invitados",
    prompt: "La regla de la red de invitados envía el tráfico de invitados a `any` zona en cualquier puerto, así que los visitantes pueden llegar a los servidores internos.\n\nCámbiala para que los invitados solo lleguen a la zona outside, usando web (tcp/80, tcp/443) y DNS (udp/53).",
    hint: "Configura la zona de destino en outside y lista los tres servicios. El deny implícito bloquea el resto.",
    explain: "La segmentación mantiene los dispositivos no confiables lejos de los sistemas internos. El Wi-Fi de invitados se trata como internet: se le permite salir, nunca entrar. Indicar solo la zona de destino y los servicios que los invitados necesitan es privilegio mínimo, y el deny implícito al final de la lista bloquea todo lo demás, incluido SMB hacia los servidores internos.",
    labels: ["Un invitado navega a un sitio HTTPS", "Un invitado envía una consulta DNS", "Un invitado se conecta a un recurso compartido interno", "Un invitado abre RDP hacia un servidor interno"]
  },
  "secp-fw-jump": {
    title: "Acceso de administración solo a través de un jump server",
    prompt: "Los servidores aceptan SSH (tcp/22) y RDP (tcp/3389) desde cualquier punto de la red interna. La política dice que la administración debe pasar por el jump server (`jump-server`, 10.99.0.10).\n\nRestringe la regla de administración para que solo el jump server pueda abrir SSH o RDP hacia los servidores, mientras los usuarios siguen pudiendo llegar a la aplicación web por tcp/443.",
    hint: "Cambia el origen de la regla de administración de inside-net a jump-server. Deja la regla web como está.",
    explain: "Un jump server (jump box) es un host endurecido al que los administradores inician sesión primero, normalmente con MFA, antes de llegar a los servidores. Permitir SSH y RDP solo desde él reduce la superficie de ataque, da un solo lugar donde registrar las sesiones de administración e impide que el malware en una estación de trabajo común llegue a los puertos de administración de los servidores. Es privilegio mínimo y control de acceso aplicados a las rutas de red.",
    labels: ["El jump server abre SSH hacia un servidor", "El jump server abre RDP hacia un servidor", "Una estación de trabajo abre RDP hacia un servidor", "Una estación de trabajo abre SSH hacia un servidor", "Una estación de trabajo usa la aplicación web"]
  },
  "secp-fw-dmz-web": {
    title: "Privilegio mínimo para un servidor web en la DMZ",
    prompt: "Un servidor web público (`web-server`, 172.16.1.10) está en la DMZ. La regla entrante permite cualquier puerto desde outside hacia toda la DMZ.\n\nReescríbela para que internet llegue solo al servidor web, y solo por HTTP (tcp/80) y HTTPS (tcp/443). El firewall termina con un deny implícito.",
    hint: "Configura el destino en web-server y el servicio en tcp/80 y tcp/443.",
    explain: "Una subred filtrada (DMZ) aloja los servidores expuestos al público para que, si uno se compromete, el atacante no termine en la red interna. Aun así, las reglas entrantes deben seguir el privilegio mínimo: un solo destino y solo los puertos que el servicio necesita. Exponer SSH, RDP u otros hosts de la DMZ a internet amplía mucho la superficie de ataque, y el deny implícito se encarga de todo lo que no está en la lista.",
    labels: ["HTTPS desde internet hacia el servidor web", "HTTP desde internet hacia el servidor web", "SSH desde internet hacia el servidor web", "HTTPS desde internet hacia otro host de la DMZ", "RDP desde internet hacia otro host de la DMZ"]
  },
  "secp-fw-blocklist": {
    title: "Bloquea direcciones maliciosas conocidas",
    prompt: "La inteligencia de amenazas reporta servidores de comando y control en el grupo de direcciones `threat-list`. Actualmente los hosts internos pueden llegar a ellos porque la regla saliente permite todo el tráfico web.\n\nAgrega una regla para que ningún host interno pueda llegar a nada de `threat-list`, mientras la navegación web normal sigue funcionando.",
    hint: "Agrega una regla deny de inside a outside con destino threat-list, y colócala por encima de inside-web.",
    explain: "Bloquear las IPs maliciosas conocidas de los feeds de inteligencia de amenazas es una mitigación que corta el comando y control y la exfiltración de datos en los hosts que ya están infectados. El deny tiene que estar por encima del allow general porque gana la primera regla que coincide. Las listas de bloqueo solo detienen indicadores conocidos, así que complementan, pero no reemplazan, el monitoreo y la protección de endpoints.",
    labels: ["Una estación de trabajo navega a un sitio HTTPS normal", "Una estación de trabajo envía una consulta DNS", "Una estación de trabajo se conecta a 203.0.113.66 (en la lista)", "Una estación de trabajo se conecta a 198.51.100.140 (rango en la lista)"]
  },
  "pcap-cleartext-logins": {
    title: "Encuentra credenciales enviadas en texto claro",
    prompt: "Una estación de trabajo en 192.168.1.50 inició sesión en un servidor FTP, en un host Linux por Telnet y en la consola web de un NAS. Filtra cada protocolo y observa lo que cualquiera en el camino podría leer. La cuenta es una cuenta de laboratorio ficticia.",
    hint: "Filtra ftp, telnet y http uno a la vez. Para HTTP, abre la segunda solicitud GET /admin/: la autenticación Basic es solo Base64, que se decodifica directamente a usuario:contraseña.",
    explain: "FTP (21), Telnet (23) y la autenticación HTTP Basic sobre HTTP sin cifrar (80) exponen las credenciales a cualquiera que pueda capturar el tráfico, por ejemplo después de un ARP poisoning o en un Wi-Fi compartido. Base64 es codificación, no cifrado. Reemplázalos con SFTP o FTPS, SSH y HTTPS (TLS), y deshabilita por completo los servicios en texto claro.",
    labels: ["¿Qué nombre de usuario se envió en el comando FTP USER?", "¿Qué dirección IP de servidor aceptó el inicio de sesión por Telnet?", "¿Qué código de estado HTTP devolvió el NAS antes de que el navegador enviara las credenciales?", "¿Qué esquema de autenticación usa la consola web del NAS (mira el encabezado Authorization)?", "¿Qué protocolo usarías en lugar de FTP para cifrar el inicio de sesión y los archivos?"]
  },
  "pcap-syn-scan": {
    title: "Reconoce un escaneo de puertos SYN",
    prompt: "El IDS de la DMZ generó una alerta de escaneo de puertos para el servidor web 198.51.100.10. Usa las banderas TCP para ver qué puertos probó el escáner, cuáles respondieron y cómo trató el escáner esas respuestas. En la captura hay mezclado un visitante real.",
    hint: "Filtra ip.src == 198.51.100.10 && tcp.flags.syn == 1 para listar los puertos abiertos. Los puertos cerrados responden RST/ACK. Un puerto que recibió dos veces un SYN y ninguna respuesta está filtrado por un firewall.",
    explain: "En un escaneo SYN (half-open o stealth), el escáner envía SYN, un puerto abierto responde SYN/ACK y el escáner contesta con RST para que la conexión nunca se complete. Los puertos cerrados responden RST/ACK y los filtrados se quedan en silencio. El mismo puerto de origen, una ventana diminuta de 1024 bytes y muchos puertos de destino en una fracción de segundo son indicadores clásicos. RDP (3389) abierto a internet es un hallazgo de alto riesgo.",
    labels: ["¿Qué dirección IP está ejecutando el escaneo?", "¿Cuántos puertos respondieron con SYN/ACK (abiertos)?", "¿Qué puerto abierto expone Remote Desktop a internet?", "¿Cuántos puertos nunca respondieron (filtrados)?", "¿Qué envía el escáner después de cada SYN/ACK en lugar de completar el handshake?"]
  },
  "pcap-arp-poisoning": {
    title: "Detecta ARP poisoning",
    prompt: "Los usuarios de 192.168.1.0/24 reportan advertencias de certificado extrañas. Revisa el tráfico ARP: compara qué dirección MAC dice ser dueña de la IP del gateway a lo largo del tiempo, y luego revisa a qué MAC se envía realmente el tráfico de la víctima.",
    hint: "Filtra arp.opcode == 2 y compara el Sender MAC para 192.168.1.1. Wireshark también marca una dirección IP duplicada. Luego filtra eth.addr == 08:00:27:5b:c3:99 && ip para ver el tráfico que pasa por el atacante.",
    explain: "ARP no tiene autenticación, así que cualquier host puede enviar respuestas no solicitadas que sobrescriben las cachés ARP de sus vecinos. Aquí 08:00:27:5b:c3:99 les dice a las víctimas que es el gateway y le dice al gateway que es 192.168.1.20, y luego reenvía el tráfico: cada paquete DNS aparece dos veces, una hacia la MAC del atacante y otra desde ella con el TTL de IP reducido en uno. Eso es un ataque on-path (man-in-the-middle). Defensas: Dynamic ARP Inspection con DHCP snooping, entradas estáticas para los hosts críticos y protocolos cifrados como TLS.",
    labels: ["¿Qué dirección IP se está suplantando ante las víctimas?", "¿Cuál es la dirección MAC del atacante?", "¿Cuál es la dirección IP propia del atacante (según su primera solicitud ARP)?", "¿Cuál es la dirección MAC del gateway real?"]
  },
  "pcap-tls-sni": {
    title: "Encuentra un sitio sospechoso a partir del SNI de TLS",
    prompt: "Después de un correo de phishing, el SOC quiere saber si la estación de trabajo 10.0.8.14 llegó al enlace que contenía. HTTPS oculta el contenido de las páginas, pero el Client Hello de TLS todavía muestra el nombre del servidor. Lista los nombres de host y encuentra el sitio de inicio de sesión que imita al original.",
    hint: "Filtra tls.handshake.type == 1 y lee el Server Name Indication de cada Client Hello. Luego filtra dns y relaciona el nombre con su respuesta.",
    explain: "La extensión SNI del Client Hello lleva el nombre de host en texto claro para que el servidor pueda elegir el certificado correcto, lo que permite a los filtros web y a los analistas ver a dónde va el tráfico cifrado. El TTL de DNS corto, el texto verify-your-account y una sesión TLS 1.2 completada con datos enviados (probablemente el usuario escribió algo) son razones para bloquear el dominio, restablecer la contraseña del usuario y buscar a otros visitantes.",
    labels: ["¿Qué nombre de servidor (SNI) parece un sitio de phishing de credenciales?", "¿A qué dirección IP se resolvió ese nombre?", "¿Cuántos mensajes Client Hello de TLS hay en la captura?", "¿Qué versión de TLS eligió el servidor falso (1.2 o 1.3)?"]
  },
  "pcap-http-vs-https": {
    title: "Lo que HTTP y HTTPS revelan en la red",
    prompt: "Compara la solicitud HTTP en texto claro con las dos sesiones HTTPS de la misma captura. Determina qué puede leer un observador de la red en cada caso y qué partes de HTTPS siguen siendo visibles.",
    hint: "Filtra http y abre la solicitud GET, luego filtra tls y mira lo que muestran los paquetes Client Hello y Application Data.",
    explain: "HTTP sin cifrar expone la URL completa, los encabezados, las cookies y el contenido de la página. Con HTTPS, el observador todavía ve las direcciones IP, los puertos, los tiempos, los tamaños, la consulta DNS (a menos que el DNS esté cifrado) y el nombre de host del SNI, pero la ruta, la query string y los datos están cifrados. Por eso los datos en tránsito deben usar TLS, y por eso existen DNS over HTTPS y Encrypted Client Hello.",
    labels: ["¿Qué URI de solicitud puede leer cualquiera en el camino dentro de la solicitud HTTP?", "¿Qué puerto de destino usan las conexiones HTTPS?", "¿Qué extensión del Client Hello de TLS todavía muestra el nombre de host en texto claro (sigla)?", "¿A qué dirección IP se resolvió www.example.com?"]
  },
  "pcap-ping-sweep": {
    title: "Investiga un barrido de ping ICMP",
    prompt: "Una alerta de monitoreo muestra que un host interno hace ping a toda una subred de servidores y luego sondea SMB. Determina qué host lo hizo, qué objetivos respondieron y cuál tiene SMB abierto.",
    hint: "Filtra icmp.type == 0 para ver quién respondió. Luego filtra tcp.port == 445 y busca el único SYN/ACK.",
    explain: "Un barrido de ping (ping sweep) envía solicitudes de eco ICMP (tipo 8) a todo un rango para encontrar hosts activos, que responden con respuestas de eco (tipo 0). Seguirlo con sondeos SYN a TCP 445 solo en los hosts activos es un reconocimiento típico antes del movimiento lateral. Verifica si 10.0.0.99 es un escáner autorizado y, si no lo es, aíslalo. Los hosts que no responden al ping pueden estar activos de todos modos, ya que los firewalls suelen descartar ICMP.",
    labels: ["¿Qué host realizó el barrido?", "¿Cuántos hosts respondieron a los pings?", "¿Qué host tiene TCP 445 abierto?", "¿Qué número de tipo ICMP corresponde a una solicitud de eco?"]
  }
});
