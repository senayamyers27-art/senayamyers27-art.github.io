/* Spanish text for the Fortinet FortiGate hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/fortinet-fortigate.js. */
CertHub.addHandsonEs("fortinet-fortigate", {
  "fg-fw-vip-web": {
    title: "Ajusta la política de un servidor web publicado",
    prompt: "Un servidor web en la DMZ se publica a través de la virtual IP `web-vip` (dirección externa 203.0.113.10). La política de wan1 a dmz permite todos los destinos y el servicio ALL.\n\nLimítala a la VIP y únicamente a los servicios `HTTP` y `HTTPS`.",
    hint: "Configura el destino como web-vip y el servicio como HTTP, HTTPS. El implicit deny (policy 0) bloquea el resto.",
    explain: "Para el NAT de destino entrante, las políticas de FortiGate usan el objeto VIP como destino, y el servicio debe ser tan acotado como la aplicación publicada. Con all y ALL, queda expuesto cada puerto de cada dirección de la DMZ, incluidos SSH y RDP. Todo lo que no coincide con ninguna política cae en el implicit deny, que aparece como policy 0 en los logs y en diagnose debug flow.",
    labels: ["HTTPS desde internet hacia la VIP", "HTTP desde internet hacia la VIP", "SSH desde internet hacia la VIP", "RDP desde internet hacia la VIP", "HTTPS hacia otra dirección pública"]
  },
  "fg-fw-shadow": {
    title: "Corrige una política sombreada",
    prompt: "Las cámaras IP (`cctv-net`, 10.1.60.0/24) nunca deben comunicarse con internet. Existe una política deny para ellas, pero el tráfico de las cámaras sigue saliendo por wan1.\n\nCorrige el orden de las políticas para que el personal conserve el acceso a internet y las cámaras queden bloqueadas.",
    hint: "FortiGate revisa las políticas de arriba hacia abajo y se detiene en la primera coincidencia. Mueve el deny de las cámaras por encima de la política general de la LAN.",
    explain: "La política amplia de LAN a internet también coincide con el tráfico de las cámaras, así que el deny específico que está debajo nunca se ejecuta; el deny queda sombreado (shadowed). En FortiGate decide el orden en la lista de políticas, no el ID de la política. Mantener las políticas específicas por encima de las generales, y verificar con la herramienta de policy lookup, evita este error común.",
    labels: ["Una PC del personal navega a un sitio HTTPS", "Una PC del personal envía una consulta DNS", "Una cámara se conecta hacia afuera por HTTPS", "Una cámara envía una consulta DNS"]
  },
  "fg-fw-smtp": {
    title: "SMTP saliente solo desde el servidor de correo",
    prompt: "Una PC infectada con malware de spam enviaba correo directamente a internet por TCP 25. Solo el servidor de correo (`mail-srv`, 172.16.1.25 en la DMZ) debe enviar SMTP hacia afuera.\n\nCambia las políticas para que los hosts de la LAN no puedan enviar SMTP a internet, mientras su tráfico web y DNS y el SMTP del servidor de correo siguen funcionando.",
    hint: "Agrega una política deny para el servicio SMTP de lan a wan1 por encima de la política de la LAN, o reemplaza ALL en la política de la LAN solo por los servicios que los usuarios necesitan.",
    explain: "Bloquear el TCP 25 saliente desde todo excepto el servidor de correo es un control estándar contra bots de spam y robo de datos por correo electrónico. Los usuarios envían el correo a través del servidor de correo, que es el único host que habla SMTP con internet. Reemplazar el servicio ALL por los servicios que los usuarios realmente necesitan (HTTP, HTTPS, DNS) es la corrección de mínimo privilegio más sólida; un deny explícito de SMTP por encima de la política de la LAN también funciona y se ve claramente en los logs.",
    labels: ["El servidor de correo entrega correo por TCP 25", "Una PC de la LAN envía SMTP directamente a internet", "Una PC de la LAN navega a un sitio HTTPS", "Una PC de la LAN envía una consulta DNS", "Otro host de la DMZ envía SMTP"]
  },
  "fg-fw-dns": {
    title: "Fuerza el DNS a través de los resolvers internos",
    prompt: "Los clientes deben usar los resolvers internos (grupo `dns-servers` en la interfaz servers), que reenvían a internet. Hoy la política de la LAN permite ALL hacia internet, así que los clientes pueden usar cualquier servidor DNS externo.\n\nHaz que el DNS de los clientes hacia internet falle, mientras el tráfico web de los clientes, el DNS de los clientes hacia los resolvers y el reenvío de los resolvers siguen funcionando.",
    hint: "Agrega una política deny de lan a wan1 para el servicio DNS y ponla por encima de lan-internet (o limita lan-internet a HTTP y HTTPS).",
    explain: "Un DNS centralizado te permite registrar cada consulta, aplicar filtrado DNS y detectar malware que usa resolvers codificados en duro o DNS tunneling. El objeto de servicio DNS de FortiGate cubre tanto UDP como TCP 53, así que una sola política maneja ambos. Solo los resolvers tienen permitido enviar DNS a internet.",
    labels: ["Un cliente consulta al resolver interno", "Un cliente consulta a un resolver externo por UDP", "Un cliente consulta a un resolver externo por TCP", "Un cliente navega a un sitio HTTPS", "El resolver reenvía una consulta"]
  },
  "fg-fw-mgmt": {
    title: "Acceso de administración solo desde los administradores",
    prompt: "Los switches y servidores se administran en la interfaz mgmt (`mgmt-net`, 10.200.0.0/24). La política actual permite que toda la LAN llegue a ella con SSH y HTTPS.\n\nRestringe la política para que solo la subred de administradores (`admin-net`, 10.99.0.0/24) pueda administrar los dispositivos. Telnet debe seguir bloqueado.",
    hint: "Cambia el origen de la política de lan-net a admin-net y mantén los servicios en SSH y HTTPS.",
    explain: "El acceso de administración debe venir solo de una pequeña red de administradores o de un jump host, usando protocolos cifrados. Acotar la dirección de origen es la corrección; Telnet nunca se permite porque envía las contraseñas en texto claro. Para la interfaz de administración del propio FortiGate se aplica la misma idea con trusted hosts en las cuentas de administrador y habilitando el acceso HTTPS y SSH solo en las interfaces que lo necesitan.",
    labels: ["Un administrador abre SSH hacia un switch", "Un administrador abre una interfaz web por HTTPS", "La PC de un usuario abre SSH hacia un switch", "Un administrador usa Telnet"]
  },
  "fg-fw-guest": {
    title: "Política de Wi-Fi para invitados solo con internet",
    prompt: "La interfaz del SSID de invitados es `guest`. Su política va hacia la interfaz de destino `any` con el servicio ALL, así que los invitados pueden llegar a la LAN y a la DMZ.\n\nCámbiala para que los invitados solo lleguen a wan1, con `HTTP`, `HTTPS` y `DNS`.",
    hint: "Configura la interfaz de salida como wan1 y los servicios como HTTP, HTTPS, DNS. El implicit deny cubre todo lo demás.",
    explain: "El Wi-Fi de invitados no es de confianza, así que se aísla de las redes internas y recibe solo los servicios que los visitantes necesitan. Usar wan1 como interfaz de salida mantiene a los invitados fuera de la LAN y la DMZ, y limitar los servicios bloquea cosas como el SMTP directo. El implicit deny al final de la lista (policy 0) atrapa todo lo que no coincide.",
    labels: ["Un invitado navega a un sitio HTTPS", "Un invitado envía una consulta DNS", "Un invitado llega a un servidor de archivos de la LAN", "Un invitado llega a un servidor web de la DMZ", "Un invitado envía SMTP a internet"]
  },
  "fg-fw-geo": {
    title: "Bloquea una lista de regiones en el portal VPN",
    prompt: "El portal web de SSL VPN en la DMZ (`vpn-portal`, 203.0.113.20) está abierto a todos. La empresa no tiene usuarios en ciertas regiones, reunidas en el grupo de direcciones `blocked-regions` (que representa objetos de dirección geográficos).\n\nBloquea esos orígenes en el portal y mantenlo abierto para todos los demás.",
    hint: "Agrega una política deny de wan1 a dmz con origen blocked-regions, por encima de la política del portal.",
    explain: "Los objetos de dirección geográficos (y los objetos de ISDB o de threat feeds) permiten que un FortiGate descarte tráfico de regiones sin usuarios legítimos, reduciendo mucho ruido de intentos de adivinar credenciales. Es una reducción de riesgo, no un control completo, porque los atacantes pueden usar VPNs o hosts en la nube de otros lugares, así que el MFA y los parches siguen siendo importantes. El deny debe estar por encima del allow general; de lo contrario, el allow coincide primero.",
    labels: ["Usuario remoto desde una región permitida", "Conexión desde 198.51.100.20 (región bloqueada)", "Conexión desde 203.0.113.200 (región bloqueada)", "Conexión desde 203.0.113.50 (no está en la lista)"]
  },
  "fg-fw-appctl": {
    title: "Bloquea aplicaciones riesgosas en modo de políticas NGFW",
    prompt: "Este FortiGate funciona en modo NGFW basado en políticas, así que las políticas de seguridad pueden coincidir con aplicaciones. La política de la LAN permite todas las aplicaciones. Bloquea `BitTorrent` y `Tor`, y mantén funcionando `HTTPS.BROWSER`, `HTTP.BROWSER` y `Microsoft.Office.365`.\n\nRecuerda que estas aplicaciones se identifican por firma, no por puerto.",
    hint: "Agrega una política deny para las aplicaciones BitTorrent y Tor por encima de la política allow. El servicio puede quedarse en ALL porque las firmas de aplicación hacen la coincidencia.",
    explain: "El control de aplicaciones identifica las aplicaciones por sus patrones de tráfico, así que BitTorrent se detecta aunque corra sobre TCP 443, algo que un bloqueo por puerto no vería. En el modo NGFW basado en políticas, la aplicación va en la propia política de seguridad; en el modo basado en perfiles, el mismo resultado se logra con un sensor de application control con esas aplicaciones en block. Las aplicaciones cifradas a menudo necesitan deep SSL inspection para una detección confiable.",
    labels: ["Navegación HTTPS", "Microsoft 365", "BitTorrent en su puerto habitual", "BitTorrent escondido en TCP 443", "Conexión Tor"]
  }
});
