/* Spanish text for the Cisco CCNA hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/ccna.js. */
CertHub.addHandsonEs("ccna", {
  "ccna-svi-ip": {
    title: "Asigna una dirección IP de administración a un switch",
    prompt: "Este switch de acceso no tiene dirección IP, así que no puedes llegar a él de forma remota.\n\nConfigura una dirección de administración en la interfaz VLAN 1 (`192.168.1.10 255.255.255.0`), levanta la interfaz y configura el default gateway del switch en `192.168.1.1` para que las respuestas puedan salir de la subred.",
    hint: "Un switch llega a otras subredes mediante ip default-gateway, que es un comando global, no de interfaz. La SVI en sí necesita no shutdown para levantarse.",
    explain: "Un switch de Capa 2 tiene una sola IP para administración, normalmente en una SVI como interface VLAN 1. Como el switch no enruta, depende de ip default-gateway para responder a hosts de otras subredes, exactamente igual que un dispositivo final. Olvidar el no shutdown en la SVI, o el gateway, es una razón clásica por la que falla la administración remota.",
    labels: ["La VLAN 1 tiene la dirección 192.168.1.10", "La interfaz VLAN 1 está habilitada (no shutdown)", "El default gateway es 192.168.1.1"]
  },
  "ccna-dhcp-pool": {
    title: "Configura un pool de servidor DHCP en IOS",
    prompt: "Los hosts en 192.168.20.0/24 deben obtener sus direcciones de este router.\n\nCrea un pool DHCP llamado `LAN` para la red `192.168.20.0 255.255.255.0`, entrega a los clientes el router predeterminado `192.168.20.1` y asígnales el servidor DNS `8.8.8.8`.",
    hint: "Empieza con ip dhcp pool NAME para entrar al pool y luego configura network, default-router y dns-server, uno por línea.",
    explain: "Un pool DHCP de IOS entrega a los clientes una dirección de su sentencia network más opciones como el default gateway (default-router) y el servidor DNS (dns-server). Las direcciones que usa el propio router deben reservarse con ip dhcp excluded-address para que nunca se asignen dos veces. Este es el objetivo de DHCPv4 del Dominio 1 de CCNA.",
    labels: ["Existe un pool DHCP llamado LAN", "El pool atiende a 192.168.20.0/24", "Los clientes reciben el router predeterminado 192.168.20.1", "Los clientes reciben el servidor DNS 8.8.8.8"]
  },
  "ccna-vlans": {
    title: "Crea y nombra dos VLAN",
    prompt: "Este switch todavía tiene solo la VLAN predeterminada.\n\nCrea la VLAN 10 con el nombre `USERS` y la VLAN 20 con el nombre `SERVERS` para que los dos grupos queden en dominios de broadcast separados. Confirma tu trabajo con `show vlan brief`.",
    hint: "Entra a cada VLAN con vlan N en la configuración global y luego asígnale un nombre con el comando name antes de salir.",
    explain: "Cada VLAN es un dominio de broadcast separado, así que dividir usuarios y servidores en la VLAN 10 y la VLAN 20 limita el tráfico de broadcast y te permite aplicar políticas distintas. El nombre es solo una etiqueta para las personas, pero el examen espera nombres consistentes entre los switches. show vlan brief lista cada VLAN y los puertos de acceso asignados a ella.",
    labels: ["La VLAN 10 se llama USERS", "La VLAN 20 se llama SERVERS"]
  },
  "ccna-access-port": {
    title: "Asigna un puerto de acceso a una VLAN",
    prompt: "Una PC de usuario está conectada a GigabitEthernet0/1, pero el puerto todavía lleva la VLAN predeterminada.\n\nConvierte GigabitEthernet0/1 en un puerto de acceso estático y colócalo en la VLAN 10. Verifica con `show vlan brief` que el puerto ahora aparece en la VLAN 10.",
    hint: "Primero define el rol del puerto con switchport mode access y luego usa switchport access vlan 10 para colocarlo.",
    explain: "Un puerto de acceso pertenece exactamente a una VLAN de datos y quita las etiquetas antes de entregar las tramas al host. Configurar switchport mode access fija el rol para que no negocie un trunk, y switchport access vlan 10 asigna la membresía. Dejar un puerto en dynamic auto es una trampa común del examen, porque puede formar un trunk de forma inesperada.",
    labels: ["GigabitEthernet0/1 es un puerto de acceso", "GigabitEthernet0/1 está en la VLAN 10"]
  },
  "ccna-trunk": {
    title: "Crea un trunk 802.1Q entre switches",
    prompt: "GigabitEthernet0/24 es el uplink hacia el siguiente switch y debe transportar varias VLAN.\n\nConfigúralo como trunk, establece la native VLAN en 99 y restringe la lista de VLAN permitidas a 10 y 20. Revisa el resultado con `show interfaces trunk`.",
    hint: "Fuerza el rol con switchport mode trunk y luego usa los comandos switchport trunk native vlan y switchport trunk allowed vlan.",
    explain: "Un trunk transporta muchas VLAN por un solo enlace etiquetando las tramas con 802.1Q. Hacer coincidir la native VLAN en ambos extremos evita un native VLAN mismatch, y reducir la lista de permitidas solo a las VLAN en uso limita el dominio de falla y el flooding innecesario. show interfaces trunk confirma el modo, la native VLAN y la lista de permitidas.",
    labels: ["GigabitEthernet0/24 es un trunk", "La native VLAN es 99", "Solo se permiten las VLAN 10 y 20"]
  },
  "ccna-default-route": {
    title: "Agrega una ruta estática predeterminada hacia internet",
    prompt: "Este router de borde llega a internet a través del siguiente salto `203.0.113.1`.\n\nAgrega una ruta estática predeterminada (`0.0.0.0 0.0.0.0`) que apunte a ese siguiente salto y luego confirma que aparece con `show ip route`.",
    hint: "La sintaxis es ip route PREFIX MASK NEXT-HOP; una ruta predeterminada usa 0.0.0.0 tanto para el prefijo como para la máscara.",
    explain: "Una ruta predeterminada (0.0.0.0/0) coincide con cualquier destino que no se encuentre de forma más específica en la tabla, y así es como una red stub llega a internet. La coincidencia del prefijo más largo sigue prefiriendo primero cualquier ruta más específica, así que la predeterminada solo se usa como último recurso y aparece como gateway of last resort. Esto es enrutamiento estático fundamental de CCNA.",
    labels: ["Hay una ruta predeterminada configurada hacia 203.0.113.1", "La ruta predeterminada aparece en la tabla de enrutamiento"]
  },
  "ccna-static-route": {
    title: "Llega a una subred remota con una ruta estática",
    prompt: "La subred 192.168.50.0/24 está detrás de un router vecino en `10.0.0.2`.\n\nAgrega una ruta estática para que este router pueda llegar a 192.168.50.0/24 a través de ese siguiente salto y luego confírmala con `show ip route`.",
    hint: "Usa ip route con la red de destino, su máscara de subred (255.255.255.0 para una /24) y la dirección del siguiente salto.",
    explain: "Una ruta estática le indica al router exactamente a dónde enviar el tráfico hacia un destino al que no está conectado directamente. Las rutas estáticas tienen una distancia administrativa de 1, así que se prefieren sobre la mayoría de las rutas dinámicas, y son predecibles, pero no se adaptan si la ruta falla. Leer y escribir líneas ip route es una habilidad que se evalúa en CCNA.",
    labels: ["Existe una ruta estática a 192.168.50.0/24 vía 10.0.0.2", "192.168.50.0/24 está en la tabla de enrutamiento"]
  },
  "ccna-ospf": {
    title: "Anuncia redes con OSPF de área única",
    prompt: "Las dos interfaces de este router ya tienen direcciones en 10.0.0.0/24 y 10.0.1.0/24.\n\nHabilita el proceso OSPF 1, configura el router ID en `1.1.1.1` y anuncia ambas redes conectadas en el área 0 usando máscaras wildcard.",
    hint: "Dentro de router ospf 1 configura router-id y luego usa network ADDRESS WILDCARD area 0 para cada subred (la wildcard de una /24 es 0.0.0.255).",
    explain: "Las sentencias network de OSPF usan una máscara wildcard, el inverso de la máscara de subred, para decidir qué interfaces ejecutan OSPF y qué subredes se anuncian. Un router-id configurado manualmente mantiene estable la identidad entre reinicios, y todos los routers de la misma área deben coincidir en el área, los temporizadores y el MTU para formar una adyacencia. Este es el objetivo de OSPFv2 de área única.",
    labels: ["El proceso OSPF 1 está configurado", "El router ID es 1.1.1.1", "10.0.0.0/24 se anuncia en el área 0"]
  },
  "ccna-ssh": {
    title: "Protege la administración remota con SSH",
    prompt: "En este dispositivo hay que reemplazar Telnet por SSH.\n\nConfigura el nombre de dominio `example.com`, crea el usuario local `admin` con privilegio 15 y el secret `S3cureAdmin`, genera una clave RSA de 2048 bits, fuerza SSH versión 2 y luego, en las líneas VTY, exige el inicio de sesión local y permite solo SSH.",
    hint: "SSH necesita un hostname e ip domain-name antes de crypto key generate rsa. En line vty 0 4 usa login local y transport input ssh.",
    explain: "SSH cifra las sesiones de administración, a diferencia de Telnet, que envía todo en texto plano. IOS necesita un hostname y un nombre de dominio para nombrar el par de claves RSA, y un nombre de usuario local con login local permite que cada administrador se autentique de forma individual. transport input ssh en las líneas VTY bloquea Telnet por completo. Estos pasos forman el objetivo de acceso seguro de CCNA.",
    labels: ["El nombre de dominio es example.com", "Se exige SSH versión 2", "Las líneas VTY usan inicio de sesión local", "Las líneas VTY permiten solo SSH"]
  },
  "ccna-acl": {
    title: "Filtra el tráfico de administración con una ACL estándar",
    prompt: "Solo los hosts de 192.168.1.0/24 deben poder llegar a la interfaz LAN de este router.\n\nCrea una ACL estándar con nombre llamada `MGMT` que permita 192.168.1.0/24 y luego aplícala de entrada en GigabitEthernet0/0. Confírmalo con `show access-lists`.",
    hint: "Crea la lista con ip access-list standard MGMT, agrega una línea permit con una máscara wildcard y luego aplícala en la interfaz con ip access-group MGMT in.",
    explain: "Una ACL estándar compara solo la dirección de origen y debe ubicarse cerca del destino para no bloquear el tráfico demasiado pronto. Toda ACL termina con un deny implícito, así que todo lo que no esté permitido se descarta. Aplicarla con ip access-group en la dirección correcta es tan importante como las propias líneas permit, un punto frecuente en el examen CCNA.",
    labels: ["Existe una ACL estándar llamada MGMT", "Permite 192.168.1.0/24", "Está aplicada de entrada en GigabitEthernet0/0"]
  },
  "ccna-portsec": {
    title: "Asegura un puerto de acceso con port security",
    prompt: "GigabitEthernet0/1 es un puerto de acceso en la VLAN 10 ubicado en un área pública.\n\nActiva port security, permite un máximo de 2 direcciones MAC, apréndelas como sticky y configura el modo de violación en `restrict` para que un dispositivo adicional se descarte y se registre sin apagar el puerto.",
    hint: "Primero el puerto debe ser un puerto de acceso. Luego agrega switchport port-security junto con sus opciones maximum, mac-address sticky y violation.",
    explain: "Port security limita cuántas direcciones MAC acepta un puerto, lo que detiene el MAC flooding y los dispositivos no autorizados. El aprendizaje sticky guarda las direcciones vistas en la running configuration, y el modo restrict descarta las tramas infractoras e incrementa un contador mientras mantiene el puerto activo, a diferencia de shutdown, que lo pone en err-disabled. Este es el objetivo de seguridad de Capa 2.",
    labels: ["Port security está habilitado en el puerto", "El modo de violación es restrict", "Las direcciones se aprenden como sticky"]
  },
  "ccna-baseline-save": {
    title: "Aplica una configuración base y guárdala",
    prompt: "Estandariza este switch nuevo según la configuración base del sitio.\n\nConfigura el hostname como `CampusSW1`, protege el modo privilegiado con `enable secret Str0ngSecret`, activa service password-encryption, agrega un banner de inicio de sesión que advierta que el acceso es solo para personal autorizado y luego guarda la configuración en startup para que sobreviva a un reinicio.",
    hint: "banner motd usa un carácter delimitador en cada extremo del texto. Guarda con copy running-config startup-config o write memory una vez que vuelvas al modo privilegiado.",
    explain: "Una configuración base consistente (hostname, enable secret, cifrado de contraseñas y un banner legal) es lo que las golden configs y la administración de configuración imponen en toda una flota. enable secret guarda un hash fuerte en lugar de texto plano, y guardar en startup-config es esencial porque la running configuration se pierde al recargar. Esto conecta las ideas de administración de configuración del Dominio 5 con comandos reales.",
    labels: ["El hostname es CampusSW1", "El cifrado de contraseñas está activo", "Hay un banner de inicio de sesión configurado", "La configuración está guardada en startup", "Terminas de nuevo en el modo privilegiado"]
  }
});
