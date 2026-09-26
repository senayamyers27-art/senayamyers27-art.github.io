/* Spanish text for the Palo Alto Networks NGFW hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/palo-alto-ngfw.js. */
CertHub.addHandsonEs("palo-alto-ngfw", {
  "pa-fw-dmz-web": {
    title: "Regla de mínimo privilegio para un servidor web en la DMZ",
    prompt: "Un servidor web público está en la zona dmz detrás de un NAT de destino. Su dirección pública es `web-public` (203.0.113.10). La regla que alguien escribió permite cualquier cosa desde untrust hacia la DMZ.\n\nReescribe la regla para que internet solo pueda llegar al servidor web, y solo con las aplicaciones `web-browsing` y `ssl` en sus puertos estándar. Todo lo demás entrante debe denegarse.",
    hint: "Configura el destino como web-public (la dirección pre-NAT), las aplicaciones como ssl y web-browsing, y el servicio como application-default. La regla interzone-default deniega el resto.",
    explain: "El mínimo privilegio en una regla entrante significa indicar el destino exacto, las aplicaciones exactas y sus puertos predeterminados. Con NAT de destino, las reglas de seguridad de PAN-OS usan la dirección de destino pre-NAT (pública) junto con la zona post-NAT, en este caso dmz. application-default impide que las aplicaciones permitidas se usen en puertos extraños, y la regla implícita interzone-default deniega silenciosamente SSH, RDP y el tráfico hacia otros hosts de la DMZ.",
    labels: ["HTTPS desde internet hacia el servidor web", "HTTP desde internet hacia el servidor web", "SSH desde internet hacia el servidor web", "RDP desde internet hacia el servidor web", "HTTPS desde internet hacia otro host de la DMZ"]
  },
  "pa-fw-shadow": {
    title: "Corrige una regla deny sombreada",
    prompt: "Las PCs de quiosco del vestíbulo (`kiosk-net`, 10.1.50.0/24) no deben llegar a internet en absoluto. Existe una regla deny para ellas, y aun así los quioscos navegan libremente.\n\nDescubre por qué y corrige el rulebase para que el personal conserve el acceso a internet y los quioscos queden bloqueados.",
    hint: "Las reglas se revisan de arriba hacia abajo y gana la primera coincidencia. Un allow amplio por encima de un deny específico oculta (sombrea) el deny. Sube la regla de los quioscos.",
    explain: "Esto es rule shadowing: la regla amplia allow-staff-internet coincide primero con el tráfico de los quioscos, así que el deny más específico que está debajo nunca tiene oportunidad. Por eso PAN-OS advierte sobre las reglas sombreadas al hacer commit. La corrección es el orden: las reglas específicas (sobre todo las excepciones y los deny) van por encima de las amplias. Eliminar el deny y acotar el allow también funciona, pero colocar primero las reglas específicas es el hábito que conviene formar.",
    labels: ["Una PC del personal navega a un sitio HTTPS", "Una PC del personal resuelve un nombre con DNS", "Una PC de quiosco navega a un sitio HTTPS", "Una PC de quiosco navega a un sitio HTTP"]
  },
  "pa-fw-risky-apps": {
    title: "Permite las aplicaciones de negocio y bloquea las riesgosas",
    prompt: "Los usuarios de trust llegan a internet mediante una sola regla que lo permite todo. Seguridad quiere bloquear el intercambio de archivos peer-to-peer (`bittorrent`) y los anonimizadores (`tor`), mientras la navegación web (`web-browsing`, `ssl`) y Microsoft 365 (`ms-office365`) siguen funcionando.\n\nConstruye las reglas salientes con App-ID. Ten en cuenta que algunas aplicaciones riesgosas intentarán esconderse en el puerto 443.",
    hint: "Escribe una regla allow que nombre solo las aplicaciones de negocio con el servicio application-default. Todo lo que no esté nombrado cae en interzone-default. Una regla deny explícita para bittorrent y tor colocada arriba deja clara la intención en los logs.",
    explain: "App-ID identifica la aplicación a partir del propio tráfico y no del puerto, así que BitTorrent se sigue reconociendo cuando corre sobre TCP 443. Una regla positiva (allow-list) para las aplicaciones aprobadas es el enfoque recomendado: las aplicaciones nuevas o desconocidas se deniegan por defecto. Agregar encima un deny explícito para aplicaciones de riesgo conocido es opcional, pero genera entradas de log claras. Una regla allow-any, en cambio, deja salir cualquier aplicación por cualquier puerto.",
    labels: ["Navegación web en el puerto 80", "Navegación HTTPS en el puerto 443", "Microsoft 365 en el puerto 443", "BitTorrent en su puerto habitual", "BitTorrent escondido en el puerto 443", "Conexión Tor"]
  },
  "pa-fw-app-default": {
    title: "Application-default frente a any",
    prompt: "La regla saliente permite `ssl`, `web-browsing` y `dns` con el servicio `any`, así que esas aplicaciones funcionan en cualquier puerto, lo que permite que ciertas herramientas hagan túneles hacia afuera por puertos inusuales.\n\nLimita las aplicaciones a sus puertos predeterminados. Se necesita una excepción: el portal de socios (`partner-portal`, 198.51.100.40) realmente ejecuta web-browsing en TCP 8080, usando el objeto de servicio `tcp-8080`.",
    hint: "Cambia el servicio de la regla general a application-default. Agrega una segunda regla para web-browsing hacia partner-portal con el servicio tcp-8080.",
    explain: "Con el servicio any, una aplicación permitida coincide en cualquier puerto, así que ssl en TCP 4444 o web-browsing en 8080 pasan. application-default restringe cada aplicación a los puertos que Palo Alto define para ella (ssl en 443, web-browsing en 80, dns en 53), y es la configuración recomendada. Cuando una aplicación legítima realmente usa un puerto no estándar, escribe una regla acotada para ese destino con un objeto de servicio específico en lugar de abrir el puerto para todos.",
    labels: ["HTTPS en el puerto 443", "DNS en UDP 53", "Navegación web hacia el portal de socios en 8080", "Navegación web hacia otro sitio en 8080", "SSL en TCP 4444"]
  },
  "pa-fw-dns": {
    title: "DNS solo a través de los resolvers internos",
    prompt: "Los clientes solo deben resolver nombres a través de los dos resolvers internos (grupo de direcciones `internal-dns`) en la zona servers. Los propios resolvers reenvían las consultas a internet. Ahora mismo los clientes pueden consultar cualquier servidor DNS de internet, y los resolvers no pueden salir.\n\nCorrige las reglas para que el DNS de los clientes vaya solo a los resolvers internos y los resolvers puedan llegar a internet para DNS.",
    hint: "Quita dns de la regla de internet de los clientes y luego agrega una regla de servers a untrust para el grupo internal-dns con la aplicación dns.",
    explain: "Forzar el DNS a través de resolvers internos da un único lugar para registrar las consultas, aplicar filtrado de DNS security y detectar malware que usa sus propios servidores DNS o DNS tunneling. Los clientes solo tienen DNS hacia los resolvers, y solo los resolvers pueden enviar DNS a internet. El tráfico entre zonas distintas que no coincide con ninguna regla cae en interzone-default y se deniega.",
    labels: ["Un cliente consulta al resolver interno 1", "Un cliente consulta al resolver interno 2", "Un cliente consulta directamente a un servidor DNS público", "Un cliente navega a un sitio HTTPS", "El resolver reenvía una consulta a internet"]
  },
  "pa-fw-mgmt": {
    title: "Acceso de administración solo desde la subred de administradores",
    prompt: "La red de administración (zona mgmt) contiene las interfaces de administración de switches y servidores. La regla actual permite que cualquiera en trust llegue a ella con `ssh` y `ssl`.\n\nRestríngela para que solo la subred de administradores (`admin-net`, 10.99.0.0/24) pueda administrar los dispositivos, usando únicamente SSH y HTTPS. Telnet sigue bloqueado para todos.",
    hint: "Configura el origen de la regla de administración como admin-net. Mantén las aplicaciones en ssh y ssl con application-default.",
    explain: "Las interfaces de administración son objetivos de alto valor, así que el acceso se limita a una subred de administradores pequeña y conocida (o a un jump host) y a protocolos cifrados. Acotar la dirección de origen es el cambio clave; application-default mantiene SSH y HTTPS en sus puertos normales, y Telnet nunca se permite porque envía las credenciales en texto claro. En el propio firewall se aplica la misma idea mediante las direcciones IP permitidas en la interfaz de administración y los perfiles de administración de interfaz.",
    labels: ["La estación de un administrador abre SSH hacia un switch", "La estación de un administrador abre una interfaz web por HTTPS", "Un usuario común abre SSH hacia un switch", "La estación de un administrador usa Telnet", "Un host de internet intenta SSH hacia la administración"]
  },
  "pa-fw-threat-list": {
    title: "Bloquea una lista de threat intelligence",
    prompt: "El threat feed del SOC está cargado como el grupo de direcciones `threat-feed` (en representación de una external dynamic list). Las conexiones entrantes desde esa lista ya están bloqueadas, pero los hosts infectados todavía pueden conectarse hacia ella.\n\nAgrega lo necesario para que ningún host de trust pueda llegar a nada de `threat-feed`, mientras la navegación normal sigue funcionando.",
    hint: "Agrega una regla deny de trust a untrust con destino threat-feed y colócala por encima de la regla de navegación.",
    explain: "Las listas de amenazas deben aplicarse en ambas direcciones: de entrada, para detener el escaneo y la explotación, y de salida, para cortar el command-and-control y la exfiltración de datos desde hosts que ya están comprometidos. En PAN-OS, una external dynamic list se actualiza según un calendario, así que la regla se mantiene igual mientras la lista cambia. La regla de bloqueo tiene que estar por encima del allow general; de lo contrario, el allow coincide primero.",
    labels: ["Un usuario navega a un sitio HTTPS normal", "Un usuario navega a un sitio HTTP normal", "Un host se conecta a 203.0.113.66 (en la lista)", "Un host se conecta a 198.51.100.9 (en la lista)", "Un host se conecta a 192.0.2.200 (en un rango de la lista)"]
  },
  "pa-fw-guest": {
    title: "El Wi-Fi de invitados solo tiene internet",
    prompt: "La zona guest da servicio al Wi-Fi de visitantes. Su regla permite web y DNS hacia la zona de destino `any`, así que los invitados pueden llegar a los servidores internos y a la DMZ.\n\nCámbiala para que los invitados solo lleguen a internet (untrust) con `ssl`, `web-browsing` y `dns`, y a nada interno.",
    hint: "Configura la zona de destino de la regla como untrust en lugar de any. Así, interzone-default deniega el tráfico de invitados hacia trust y dmz.",
    explain: "Las redes de invitados no son de confianza, así que deben segmentarse de las zonas internas y solo tener permitido salir a internet. Definir untrust como zona de destino es el control preciso más sencillo; el deny de interzone-default se encarga de guest hacia trust y de guest hacia dmz. Limitar las aplicaciones a web y DNS con application-default también impide que los invitados usen intercambio de archivos u otras aplicaciones que podrían causar problemas legales o de seguridad.",
    labels: ["Un invitado navega a un sitio HTTPS", "Un invitado usa un servidor DNS público", "Un invitado llega a un servidor de archivos interno", "Un invitado llega a un servidor web de la DMZ", "Un invitado ejecuta BitTorrent hacia internet"]
  }
});
