CertHub.addLessons("jncia-junos", [
 {
  "t": "Collision domains and broadcast domains, and how switches and routers divide them",
  "tt": "Dominios de colisión y dominios de broadcast, y cómo los dividen switches y routers",
  "body": [
   "Dos ideas explican mucho sobre cómo se comportan las redes Ethernet a medida que crecen: el dominio de colisión y el dominio de broadcast. Un dominio de colisión es el conjunto de dispositivos cuyas transmisiones pueden colisionar entre sí en un medio compartido. Un dominio de broadcast es el conjunto de dispositivos que reciben una trama de broadcast de Capa 2 (enviada a la dirección MAC de destino ff:ff:ff:ff:ff:ff) cuando cualquiera de ellos la envía. El examen JNCIA-Junos espera que sepas qué dispositivos dividen qué dominio y por qué eso importa para el rendimiento.",
   "Las colisiones vienen de los primeros días de Ethernet, cuando todas las estaciones compartían un cable o se conectaban a través de un hub. Un hub es un repetidor de Capa 1: lo que llega por un puerto se copia por todos los demás puertos, así que solo un dispositivo puede transmitir a la vez. Si dos envían al mismo tiempo, las señales colisionan, ambos se detienen, esperan un tiempo aleatorio y lo intentan de nuevo. Ese método de acceso es CSMA/CD (carrier sense multiple access with collision detection, acceso múltiple por detección de portadora con detección de colisiones), y solo se aplica a enlaces half-duplex. Todos los puertos de un hub están en el mismo dominio de colisión, así que agregar dispositivos significa más colisiones y menos ancho de banda utilizable.",
   "Un switch resuelve esto. Cada puerto del switch es su propio dominio de colisión, porque el switch almacena las tramas en búfer y las reenvía solo hacia donde deben ir. Cuando un puerto funciona en full duplex, lo cual es lo normal hoy, el dispositivo puede enviar y recibir al mismo tiempo y las colisiones simplemente no pueden ocurrir. Así, un switch de 24 puertos crea 24 dominios de colisión.",
   "Sin embargo, un switch no detiene los broadcasts. Por defecto, inunda (flood) una trama de broadcast por todos los puertos de la misma VLAN (virtual LAN, LAN virtual) excepto por el que llegó. Todos esos puertos forman un dominio de broadcast. Los broadcasts son necesarios, porque las solicitudes ARP y el descubrimiento DHCP los usan, pero en una red plana muy grande consumen ancho de banda y CPU en cada host. Las VLAN permiten que un solo switch cree varios dominios de broadcast separados: cada VLAN es su propio dominio de broadcast.",
   "Un router divide los dominios de broadcast. No reenvía broadcasts de Capa 2 de una interfaz a otra, así que cada interfaz del router (o cada unidad lógica, en Junos) está en un dominio de broadcast diferente y en una subred IP diferente. El tráfico entre dominios de broadcast debe enrutarse, ya sea con un router o con un switch de Capa 3 usando una interfaz de enrutamiento y puenteo integrados (IRB, integrated routing and bridging).",
   "Un resumen práctico: los hubs no dividen nada, los switches dividen dominios de colisión, las VLAN y los routers dividen dominios de broadcast. Cuando cuentes dominios en un diagrama del examen, cuenta cada puerto de switch e interfaz de router como un dominio de colisión separado (un hub y todo lo conectado a él es uno solo), y cuenta cada interfaz de router o VLAN como un dominio de broadcast separado."
  ],
  "terms": [
   [
    "Collision domain (dominio de colisión)",
    "Un segmento de red donde las transmisiones simultáneas pueden colisionar; cada puerto de switch o de router es su propio dominio de colisión."
   ],
   [
    "Broadcast domain (dominio de broadcast)",
    "El conjunto de dispositivos que reciben un broadcast de Capa 2 de cualquier miembro; está delimitado por routers y por VLAN."
   ],
   [
    "CSMA/CD",
    "Carrier sense multiple access with collision detection: el método de Ethernet half-duplex que consiste en escuchar, detectar colisiones y retroceder."
   ],
   [
    "Full duplex",
    "Un modo de enlace en el que un dispositivo puede enviar y recibir al mismo tiempo, lo que elimina por completo las colisiones."
   ],
   [
    "VLAN",
    "Virtual LAN (LAN virtual): un segmento lógico de Capa 2 en un switch; cada VLAN es un dominio de broadcast separado."
   ]
  ],
  "example": "Una oficina tiene 40 PC en dos switches EX de 24 puertos en una sola VLAN, con un firewall SRX como gateway. Hay unos 48 dominios de colisión (uno por cada puerto de switch usado), pero solo un dominio de broadcast del lado de la LAN. Cuando el equipo divide a los usuarios en una VLAN Staff y una VLAN Guest, el switch ahora tiene dos dominios de broadcast, y el SRX (o una interfaz IRB) debe enrutar entre ellas.",
  "tip": "Atento a las preguntas que mezclan hubs, switches y routers en un mismo diagrama. Un hub no agrega dominios de colisión; un switch agrega uno por puerto pero ninguno de broadcast; un router agrega un dominio de broadcast por interfaz.",
  "check": [
   [
    "¿Cuántos dominios de broadcast crea un solo switch con todos sus puertos en la VLAN por defecto?",
    "Uno. Un switch inunda los broadcasts por todos los puertos de la misma VLAN, así que sin VLAN adicionales todo el switch es un solo dominio de broadcast."
   ],
   [
    "¿Por qué no pueden ocurrir colisiones en un puerto de switch full-duplex?",
    "Porque el dispositivo y el puerto del switch tienen cada uno un camino dedicado para enviar y recibir al mismo tiempo, así que no hay un medio compartido en el que las señales puedan colisionar."
   ],
   [
    "¿Qué dispositivo o función necesitas para separar dominios de broadcast?",
    "Un router (o una interfaz de Capa 3 como una IRB) o VLAN; cada interfaz de router y cada VLAN es su propio dominio de broadcast."
   ]
  ]
 },
 {
  "t": "What routers and switches do: Layer 2 frame forwarding vs Layer 3 packet forwarding",
  "tt": "Qué hacen los routers y los switches: reenvío de tramas en Capa 2 vs reenvío de paquetes en Capa 3",
  "body": [
   "Los switches y los routers mueven tráfico, pero toman decisiones usando información diferente en capas diferentes. Un switch reenvía tramas Ethernet dentro de una sola red usando direcciones MAC (media access control, control de acceso al medio), que es la Capa 2 del modelo OSI. Un router reenvía paquetes IP entre redes usando direcciones IP, que es la Capa 3. Entender esa división es la base de todo lo demás que configurarás en dispositivos Junos.",
   "Un switch de Capa 2 mantiene una tabla que asocia direcciones MAC con puertos, llamada tabla MAC o, en Junos, tabla de conmutación Ethernet (`show ethernet-switching table`). Cuando llega una trama, el switch busca la dirección MAC de destino. Si conoce el puerto, reenvía la trama solo por ese puerto. Si no, o si la trama es un broadcast, inunda la trama por todos los puertos de la VLAN. La trama en sí no se modifica: la MAC de origen y la de destino se mantienen iguales de un extremo al otro de la red conmutada.",
   "Un router mantiene una tabla de enrutamiento con prefijos de destino (como 10.1.2.0/24) y el siguiente salto o la interfaz de salida para cada uno. En Junos, la tabla IPv4 principal es `inet.0`, que se ve con `show route`. Cuando llega un paquete, el router quita el encabezado de Capa 2 entrante, lee la dirección IP de destino, busca el prefijo coincidente más largo (más específico), decrementa el TTL (time to live, tiempo de vida) y construye un nuevo encabezado de Capa 2 para el enlace de salida, con su propia MAC como origen y la MAC del siguiente salto como destino. Así, en cada salto enrutado las direcciones MAC cambian mientras las direcciones IP de origen y destino se mantienen iguales.",
   "Los dos dispositivos también tratan de forma distinta el tráfico desconocido. Un switch inunda las tramas con destinos desconocidos, porque asume que el dispositivo está en algún lugar de esta red. Un router descarta los paquetes hacia destinos para los que no tiene ruta (a menos que tenga una ruta por defecto, 0.0.0.0/0), y puede devolver un mensaje ICMP destination-unreachable. Los routers tampoco reenvían broadcasts, por eso delimitan los dominios de broadcast.",
   "Muchos dispositivos modernos hacen ambas cosas. Los switches Juniper EX y QFX pueden conmutar tramas en hardware dentro de una VLAN y enrutar entre VLAN usando interfaces IRB. Los routers MX también pueden hacer puenteo (bridging). En Junos la misma idea aparece en la configuración: `family ethernet-switching` en una unidad de interfaz significa conmutación de Capa 2, y `family inet` con una dirección significa enrutamiento de Capa 3.",
   "Para el examen, recuerda las palabras clave: tramas, direcciones MAC, inundación (flooding) y la tabla de conmutación para la Capa 2; paquetes, direcciones IP, coincidencia más larga, TTL y la tabla de enrutamiento para la Capa 3."
  ],
  "terms": [
   [
    "Frame (trama)",
    "Una unidad de datos de Capa 2 con un encabezado que contiene las direcciones MAC de origen y destino."
   ],
   [
    "Packet (paquete)",
    "Una unidad de datos de Capa 3 con un encabezado que contiene las direcciones IP de origen y destino y un TTL."
   ],
   [
    "Ethernet switching table (tabla de conmutación Ethernet)",
    "La tabla de Junos que asocia las direcciones MAC aprendidas con interfaces y VLAN, que se muestra con `show ethernet-switching table`."
   ],
   [
    "Routing table (tabla de enrutamiento)",
    "Una tabla de prefijos de destino y siguientes saltos; en Junos la tabla unicast IPv4 es inet.0."
   ],
   [
    "Longest-prefix match (coincidencia del prefijo más largo)",
    "La regla según la cual un router usa la ruta coincidente más específica cuando varios prefijos contienen el destino."
   ]
  ],
  "example": "Una PC en 10.1.1.10 hace ping a un servidor en 10.2.2.20. La trama de la PC pasa sin cambios por un switch EX hasta el router gateway. El router coincide con 10.2.2.0/24, reduce el TTL en uno, reescribe el encabezado Ethernet con su propia MAC como origen y la MAC del servidor como destino, y lo envía. Una captura de paquetes en cada lado muestra las mismas direcciones IP pero direcciones MAC diferentes.",
  "tip": "A las preguntas del examen les gusta preguntar qué cambia en cada salto. En tráfico enrutado, las direcciones MAC cambian en cada router mientras las direcciones IP se mantienen (ignorando NAT).",
  "check": [
   [
    "¿Qué hace un switch con una trama cuya MAC de destino no está en su tabla?",
    "Inunda la trama por todos los puertos de la misma VLAN excepto por el que llegó."
   ],
   [
    "¿Qué hace un router con un paquete cuando no tiene ruta coincidente ni ruta por defecto?",
    "Descarta el paquete y puede enviar un mensaje ICMP destination-unreachable al origen."
   ],
   [
    "¿Qué campos del encabezado reescribe un router al reenviar un paquete?",
    "Construye un nuevo encabezado de Capa 2 (nuevas MAC de origen y destino) y decrementa el TTL de IP; las direcciones IP de origen y destino se mantienen iguales."
   ]
  ]
 },
 {
  "t": "Ethernet frames, MAC addresses (48 bits, OUI) and the MAC learning/flooding process",
  "tt": "Tramas Ethernet, direcciones MAC (48 bits, OUI) y el proceso de aprendizaje/inundación de MAC",
  "body": [
   "Ethernet es la tecnología de Capa 2 en casi todas las LAN (local area network, red de área local) con las que trabajarás. Los datos viajan en tramas, y cada trama identifica a su emisor y a su receptor con direcciones MAC. Conocer la estructura de la trama y cómo los switches aprenden direcciones te ayuda a leer la salida de `show ethernet-switching table` y a diagnosticar por qué el tráfico llega o no llega a un host.",
   "Una trama Ethernet II comienza con un preámbulo que permite al receptor sincronizarse, luego la dirección MAC de destino (6 bytes), la dirección MAC de origen (6 bytes) y un EtherType de 2 bytes que indica qué hay dentro, por ejemplo 0x0800 para IPv4, 0x86DD para IPv6 y 0x0806 para ARP. Si la trama lleva una etiqueta de VLAN 802.1Q, una etiqueta de 4 bytes se ubica entre la MAC de origen y el EtherType. Después viene la carga útil (payload), normalmente de hasta 1500 bytes, y finalmente una secuencia de verificación de trama (FCS, frame check sequence) de 4 bytes, un CRC (cyclic redundancy check, verificación de redundancia cíclica) que el receptor usa para detectar corrupción. Las tramas que fallan la verificación se descartan y se cuentan como errores.",
   "Una dirección MAC tiene 48 bits, escritos como 12 dígitos hexadecimales, como `00:05:86:71:2a:c0`. Los primeros 24 bits son el OUI (organizationally unique identifier, identificador único de organización), asignado por el IEEE a un fabricante; los últimos 24 bits los asigna ese fabricante. Dos bits del primer byte son especiales: el bit menos significativo marca una dirección de grupo (multicast) cuando está activado, y el siguiente bit marca una dirección administrada localmente. La dirección de todos unos ff:ff:ff:ff:ff:ff es la dirección de broadcast.",
   "Los switches aprenden las direcciones MAC automáticamente. Cuando llega una trama, el switch lee la MAC de origen y la registra junto con el puerto de entrada y la VLAN. Luego mira la MAC de destino. Si el destino es conocido, la trama sale por ese único puerto (si el puerto es el mismo por el que entró, la trama se filtra, es decir, se descarta). Si el destino es desconocido, broadcast o (por defecto) multicast, el switch la inunda por todos los demás puertos de la VLAN. Cuando el host desconocido responde, se aprende su MAC de origen y las tramas futuras se reenvían directamente.",
   "Las entradas aprendidas caducan (age out) si el switch deja de ver tráfico de esa dirección, así la tabla se mantiene actualizada cuando los dispositivos se mueven. En muchos switches Junos el tiempo de caducidad por defecto es de 300 segundos. Puedes ver la tabla con `show ethernet-switching table` y borrarla con `clear ethernet-switching table`. Como el aprendizaje se basa solo en las direcciones de origen, un dispositivo que nunca transmite nunca se aprende, y el tráfico hacia él se sigue inundando."
  ],
  "terms": [
   [
    "MAC address (dirección MAC)",
    "Una dirección de hardware de Capa 2 de 48 bits, escrita como 12 dígitos hexadecimales, que identifica una interfaz de red."
   ],
   [
    "OUI",
    "Organizationally unique identifier (identificador único de organización): los primeros 24 bits de una dirección MAC, que identifican al fabricante."
   ],
   [
    "EtherType",
    "El campo de 2 bytes que identifica el protocolo de la carga útil, como 0x0800 para IPv4 o 0x0806 para ARP."
   ],
   [
    "FCS",
    "Frame check sequence (secuencia de verificación de trama): un CRC al final de la trama que se usa para detectar errores de transmisión."
   ],
   [
    "Flooding (inundación)",
    "Enviar una trama por todos los puertos de la VLAN excepto el puerto de entrada; se usa para broadcasts y destinos desconocidos."
   ]
  ],
  "example": "Conectas una impresora nueva al puerto ge-0/0/12 de un switch EX. Hasta que la impresora envíe algo, `show ethernet-switching table` no tiene ninguna entrada para ella y las tramas hacia su MAC se inundan. En cuanto envía una solicitud DHCP, el switch registra su MAC en ge-0/0/12 en esa VLAN, y los trabajos de impresión posteriores van solo a ese puerto.",
  "tip": "Los switches aprenden de la MAC de origen y reenvían según la MAC de destino. Las preguntas a menudo intentan intercambiar estas dos.",
  "check": [
   [
    "¿Cuántos bits tiene una dirección MAC y qué representan los primeros 24 bits?",
    "48 bits; los primeros 24 bits son el OUI, que identifica al fabricante que hizo la interfaz."
   ],
   [
    "¿Qué campo de una trama entrante usa un switch para poblar su tabla MAC?",
    "La dirección MAC de origen, registrada junto con el puerto de entrada y la VLAN."
   ],
   [
    "¿Por qué el tráfico hacia un dispositivo silencioso podría seguir inundándose?",
    "Porque el switch nunca ve una trama con la MAC de ese dispositivo como origen, así que nunca aprende el puerto y trata el destino como desconocido."
   ]
  ]
 },
 {
  "t": "ARP: resolving an IPv4 next hop to a MAC address; gratuitous ARP; `show arp`",
  "tt": "ARP: resolución de un siguiente salto IPv4 a una dirección MAC; ARP gratuito; `show arp`",
  "body": [
   "Las direcciones IP le dicen a un dispositivo hacia dónde va un paquete, pero en un enlace Ethernet la trama igual necesita una dirección MAC de destino. ARP (Address Resolution Protocol, protocolo de resolución de direcciones) cubre esa brecha en IPv4. Cada vez que un router Junos envía un paquete por una interfaz Ethernet hacia un siguiente salto, necesita la dirección MAC de ese siguiente salto, y ARP es la forma de obtenerla.",
   "El proceso tiene dos mensajes. Primero, el emisor revisa su caché ARP. Si no hay entrada, envía por broadcast una solicitud ARP a ff:ff:ff:ff:ff:ff preguntando, en efecto, 'quién tiene 10.0.0.2? avisa a 10.0.0.1'. Todos los hosts del dominio de broadcast la reciben, pero solo el dueño de 10.0.0.2 responde, con una respuesta ARP unicast que contiene su dirección MAC. El emisor guarda la asociación en su caché ARP y envía el paquete que estaba esperando. El destino normalmente también guarda en caché la asociación del solicitante, ya que probablemente tendrá que responder.",
   "Un punto clave: un host o router solo hace ARP para direcciones de su propia subred. Si el destino final está en otra red, el emisor hace ARP para el siguiente salto (en el caso de un host, su gateway por defecto), no para el destino lejano. Por eso un gateway por defecto incorrecto o una máscara de subred incorrecta se manifiestan como entradas ARP faltantes o incorrectas.",
   "El ARP gratuito (gratuitous ARP) es un mensaje ARP que un dispositivo envía sobre su propia dirección sin que se lo pidan, normalmente una solicitud o respuesta donde la IP del emisor y la del destino son la misma. Los dispositivos lo envían cuando una interfaz se levanta o cambia una dirección, por tres razones: para detectar una dirección IP duplicada (si alguien responde, la dirección ya está en uso), para actualizar las cachés de otros hosts después de un cambio de MAC, y para anunciar un nuevo dispositivo activo después de un failover, por ejemplo cuando un respaldo VRRP (Virtual Router Redundancy Protocol) toma el control de una IP virtual. Como ARP no tiene autenticación, los atacantes pueden abusar de las respuestas no solicitadas para envenenar cachés; funciones del switch como dynamic ARP inspection ayudan a defenderse de eso.",
   "En Junos, los comandos del modo operacional te permiten inspeccionar la caché. `show arp` lista las entradas con la dirección MAC, la dirección IP, el nombre y la interfaz. `show arp no-resolve` omite las búsquedas DNS inversas, lo que hace la salida más rápida y evita pausas largas cuando DNS no es alcanzable. `show arp interface ge-0/0/0.0` acota la vista, y `clear arp` elimina las entradas dinámicas para que se vuelvan a aprender. Junos hace caducar las entradas ARP dinámicas después de un temporizador (20 minutos por defecto), que puedes cambiar bajo `[edit system arp]`.",
   "```\nuser@r1> show arp no-resolve\nMAC Address       Address         Interface      Flags\n2c:6b:f5:10:22:01 10.0.12.2       ge-0/0/0.0     none\n```"
  ],
  "terms": [
   [
    "ARP",
    "Address Resolution Protocol: asocia una dirección IPv4 con una dirección MAC en el enlace local usando una solicitud broadcast y una respuesta unicast."
   ],
   [
    "ARP cache (caché ARP)",
    "La tabla de asociaciones IP-a-MAC aprendidas, que en Junos se muestra con `show arp`."
   ],
   [
    "Gratuitous ARP (ARP gratuito)",
    "Un ARP no solicitado sobre la propia IP del emisor, usado para detectar direcciones duplicadas y actualizar las cachés de los vecinos."
   ],
   [
    "no-resolve",
    "Una opción de salida de Junos que evita que el comando haga búsquedas DNS inversas de las direcciones."
   ]
  ],
  "example": "Después de configurar 10.0.12.1/30 en r1 y 10.0.12.2/30 en r2, haces ping a r2 desde r1. El primer ping puede ser un poco más lento mientras se ejecuta ARP. Después, `show arp no-resolve` en r1 muestra la MAC de r2 asociada a 10.0.12.2 en ge-0/0/0.0, y r2 también muestra la entrada de r1, lo que demuestra la alcanzabilidad de Capa 2 a través del enlace.",
  "tip": "Recuerda que una solicitud ARP es un broadcast y una respuesta ARP normalmente es unicast, y que un dispositivo hace ARP para su siguiente salto, no para un destino remoto.",
  "check": [
   [
    "Un host en 192.168.1.10/24 envía a 8.8.8.8. ¿Para qué dirección MAC hace ARP?",
    "Para la de su gateway por defecto, porque 8.8.8.8 no está en la subred local; la trama va al gateway, que la enruta hacia adelante."
   ],
   [
    "Menciona dos razones por las que un dispositivo envía un ARP gratuito.",
    "Para detectar una dirección IP duplicada y para actualizar las cachés ARP de otros dispositivos, por ejemplo después de que un failover mueve una IP virtual a una nueva MAC."
   ],
   [
    "¿Por qué usar `show arp no-resolve` en lugar de `show arp`?",
    "Omite las búsquedas DNS inversas, así que la salida aparece de inmediato y no se retrasa cuando DNS está lento o no es alcanzable."
   ]
  ]
 },
 {
  "t": "IPv4 addressing: classes, private ranges, subnet masks, CIDR prefixes and subnetting math",
  "tt": "Direccionamiento IPv4: clases, rangos privados, máscaras de subred, prefijos CIDR y cálculo de subredes",
  "body": [
   "Una dirección IPv4 tiene 32 bits, escritos como cuatro octetos decimales, como 172.16.5.130. Una parte identifica la red y el resto identifica al host en esa red. La máscara de subred, o longitud de prefijo, indica dónde está ese límite. Escribirás direcciones con longitudes de prefijo en cada interfaz Junos (`set interfaces ge-0/0/0 unit 0 family inet address 172.16.5.129/26`), así que el cálculo de subredes tiene que volverse automático.",
   "Históricamente, las direcciones se agrupaban en clases según su primer octeto: Clase A (1 a 126) con una máscara por defecto /8, Clase B (128 a 191) con /16, Clase C (192 a 223) con /24, Clase D (224 a 239) para multicast y Clase E (240 a 255) reservada. 127.0.0.0/8 es loopback. El direccionamiento con clases desperdiciaba espacio, así que hoy usamos CIDR (classless inter-domain routing, enrutamiento entre dominios sin clases), donde se permite cualquier longitud de prefijo de /0 a /32 y las rutas se escriben como prefijo/longitud. Las clases todavía aparecen en los exámenes como vocabulario.",
   "El RFC 1918 reserva tres rangos privados que no se enrutan en internet y que normalmente se traducen con NAT: 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 a 172.31.255.255) y 192.168.0.0/16. También verás 169.254.0.0/16, el rango link-local que un host se asigna a sí mismo cuando falla DHCP.",
   "Una máscara es una serie de bits 1 seguida de bits 0. /24 es 255.255.255.0, /26 es 255.255.255.192, /30 es 255.255.255.252. Para cualquier prefijo, el número de bits de host es 32 menos la longitud del prefijo. Una subred tiene 2 elevado al número de bits de host direcciones, y 2 direcciones de host utilizables menos, porque la primera dirección es la dirección de red y la última es la dirección de broadcast. Así, una /26 tiene 64 direcciones y 62 hosts, y una /30 tiene 4 direcciones y 2 hosts, por eso /30 (o /31, que no tiene dirección de red ni de broadcast y se permite en enlaces punto a punto) es común en enlaces entre routers.",
   "El método más rápido para calcular subredes es el tamaño de bloque. Encuentra el octeto donde la máscara deja de ser 255 y resta ese valor de máscara a 256. Para /26 (máscara .192) el bloque es 64, así que las subredes empiezan en .0, .64, .128 y .192. Para saber a qué subred pertenece 172.16.5.130/26, busca el bloque que contiene 130: es .128. Entonces la red es 172.16.5.128, el broadcast es 172.16.5.191 y los hosts utilizables van de .129 a .190.",
   "Trabajando en sentido inverso, para dividir 172.16.0.0/22 en bloques /26, tomas prestados 4 bits (26 menos 22), lo que da 2 a la 4, o 16 subredes de 64 direcciones cada una, que van 172.16.0.0, .0.64, .0.128, .0.192, 172.16.1.0 y así sucesivamente hasta 172.16.3.192. Practica hasta que puedas hacerlas mentalmente."
  ],
  "terms": [
   [
    "CIDR",
    "Classless inter-domain routing (enrutamiento entre dominios sin clases): direccionamiento con longitudes de prefijo arbitrarias escritas como dirección/longitud, que reemplaza los límites de las clases."
   ],
   [
    "Subnet mask (máscara de subred)",
    "Un valor de 32 bits formado por 1 contiguos (parte de red) seguidos de 0 (parte de host), como 255.255.255.192 para /26."
   ],
   [
    "RFC 1918 private ranges (rangos privados RFC 1918)",
    "10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16, reservados para uso interno y no enrutados en internet."
   ],
   [
    "Broadcast address (dirección de broadcast)",
    "La última dirección de una subred, con todos los bits de host en 1, usada para llegar a todos los hosts de esa subred."
   ],
   [
    "Block size (tamaño de bloque)",
    "256 menos el octeto interesante de la máscara; el espaciado entre direcciones de subred consecutivas."
   ]
  ],
  "example": "Te dan 10.20.0.0/24 y necesitas cuatro subredes iguales para cuatro LAN de sucursales. Tomar prestados 2 bits da /26: 10.20.0.0, .64, .128 y .192, cada una con 62 hosts utilizables. En el router de la primera sucursal configuras `set interfaces ge-0/0/1 unit 0 family inet address 10.20.0.1/26`, y los hosts usan de .2 a .62 con .1 como gateway.",
  "tip": "Fíjate si la pregunta pide direcciones o hosts utilizables. La cantidad utilizable es 2 elevado a los bits de host menos 2 (excepto /31 y /32, que son casos especiales).",
  "check": [
   [
    "¿Cuáles son las direcciones de red y de broadcast para 192.168.10.77/27?",
    "Una /27 tiene un tamaño de bloque de 32, así que la subred que contiene .77 empieza en .64; la red es 192.168.10.64 y el broadcast es 192.168.10.95."
   ],
   [
    "¿Cuántos hosts utilizables hay en una /28?",
    "Una /28 tiene 4 bits de host, así que 16 direcciones y 14 hosts utilizables."
   ],
   [
    "¿Es 172.20.1.1 una dirección privada?",
    "Sí. Está dentro de 172.16.0.0/12, que cubre de 172.16.0.0 a 172.31.255.255."
   ]
  ]
 },
 {
  "t": "IPv6 addressing: 128-bit format, compression rules, global unicast, link-local (fe80::/10), multicast, EUI-64",
  "tt": "Direccionamiento IPv6: formato de 128 bits, reglas de compresión, global unicast, link-local (fe80::/10), multicast, EUI-64",
  "body": [
   "IPv6 se diseñó para reemplazar el espacio de direcciones de 32 bits de IPv4 con direcciones de 128 bits, suficientes para que la escasez de direcciones y la mayor parte del NAT desaparezcan. Una dirección IPv6 se escribe como ocho grupos (hextetos) de cuatro dígitos hexadecimales separados por dos puntos, por ejemplo `2001:0db8:0000:0000:0a00:0000:0000:0001`. Igual que IPv4, tiene una longitud de prefijo: la mayoría de las LAN usan una /64, donde los primeros 64 bits identifican la subred y los últimos 64 bits, el identificador de interfaz (interface ID), identifican al host.",
   "Dos reglas de compresión hacen legibles las direcciones. Primero, se pueden eliminar los ceros a la izquierda en cualquier hexteto, así que `0db8` se convierte en `db8` y `0000` se convierte en `0`. Segundo, una sola secuencia contigua de hextetos todos en cero puede reemplazarse por `::`, pero solo una vez por dirección, porque usarlo dos veces haría ambigua la longitud. Aplicar ambas reglas a la dirección anterior da `2001:db8::a00:0:0:1` (cuando dos secuencias de ceros tienen la misma longitud, la forma estándar comprime la primera). Para expandir una dirección, cuenta los grupos presentes y rellena `::` con suficientes grupos en cero para llegar a ocho.",
   "Los principales tipos de direcciones que debes conocer: las direcciones global unicast, asignadas actualmente de 2000::/3 (empiezan con 2 o 3), son enrutables en internet. Las direcciones link-local, fe80::/10, existen automáticamente en toda interfaz con IPv6 habilitado y solo son válidas en ese enlace; los protocolos de enrutamiento y neighbor discovery las usan, y los routers a menudo las usan como siguientes saltos. Las direcciones unique local, fc00::/7 (en la práctica fd00::/8), son el equivalente aproximado del espacio IPv4 privado. Las direcciones multicast empiezan con ff00::/8; ejemplos son ff02::1 (todos los nodos del enlace) y ff02::2 (todos los routers del enlace). IPv6 no tiene broadcast; el multicast hace ese trabajo. La loopback es ::1 y la dirección no especificada es ::.",
   "EUI-64 es una forma de construir un identificador de interfaz de 64 bits a partir de una dirección MAC de 48 bits. Divide la MAC a la mitad, inserta `fffe` en el medio y luego invierte el séptimo bit del primer byte (el bit universal/local). Para la MAC `00:05:86:71:2a:c0` las mitades son 000586 y 712ac0; insertar fffe da 0005:86ff:fe71:2ac0; invertir el séptimo bit cambia 00 a 02, lo que da el identificador de interfaz `205:86ff:fe71:2ac0`. La dirección link-local sería entonces `fe80::205:86ff:fe71:2ac0`.",
   "En Junos configuras IPv6 bajo `family inet6`. `set interfaces ge-0/0/0 unit 0 family inet6 address 2001:db8:1::1/64` establece una dirección estática, y agregar la palabra clave `eui-64` a un prefijo /64 permite que Junos complete el identificador de interfaz a partir de la MAC. Una dirección link-local se crea automáticamente una vez que se configura `family inet6`. `show interfaces terse` y `show ipv6 neighbors` te permiten revisar las direcciones y neighbor discovery, el reemplazo de ARP en IPv6."
  ],
  "terms": [
   [
    "Hextet (hexteto)",
    "Uno de los ocho grupos de 16 bits de una dirección IPv6, escrito con hasta cuatro dígitos hexadecimales."
   ],
   [
    "Link-local address (dirección link-local)",
    "Una dirección fe80::/10 presente automáticamente en toda interfaz IPv6, válida solo en el enlace local."
   ],
   [
    "Global unicast address (dirección global unicast)",
    "Una dirección IPv6 enrutable públicamente, actualmente de 2000::/3."
   ],
   [
    "EUI-64",
    "Un método para formar un identificador de interfaz de 64 bits a partir de una dirección MAC insertando fffe e invirtiendo el bit universal/local."
   ],
   [
    "Multicast (IPv6)",
    "Direcciones en ff00::/8 que entregan a un grupo; IPv6 usa multicast en lugar de broadcast."
   ]
  ],
  "example": "En un router de laboratorio configuras `set interfaces ge-0/0/1 unit 0 family inet6 address 2001:db8:10::/64 eui-64` y haces commit. `show interfaces ge-0/0/1 terse` luego lista dos direcciones IPv6: una global que termina en el identificador de interfaz EUI-64 y una link-local fe80:: con el mismo identificador de interfaz.",
  "tip": "El doble dos puntos puede aparecer solo una vez en una dirección. Una opción de respuesta con dos `::` siempre es inválida.",
  "check": [
   [
    "Comprime 2001:0db8:0000:0000:0000:0000:0000:0010.",
    "2001:db8::10. Se eliminan los ceros a la izquierda y la secuencia de seis hextetos en cero se convierte en un solo ::."
   ],
   [
    "¿De qué rango vienen las direcciones link-local y se pueden enrutar?",
    "fe80::/10. Solo son válidas en el enlace local y los routers nunca las reenvían."
   ],
   [
    "¿Qué dos cambios convierten una dirección MAC en un identificador de interfaz EUI-64?",
    "Insertar fffe entre las dos mitades de 24 bits e invertir el séptimo bit del primer byte."
   ]
  ]
 },
 {
  "t": "OSI and TCP/IP models; TCP vs UDP; well-known ports",
  "tt": "Modelos OSI y TCP/IP; TCP vs UDP; puertos conocidos",
  "body": [
   "Los modelos en capas te dan un vocabulario común para ubicar dónde vive un problema o una función. El modelo OSI (Open Systems Interconnection) tiene siete capas: 1 Física (bits en el cable, cables, ópticas), 2 Enlace de datos (tramas, direcciones MAC, switches), 3 Red (paquetes, direcciones IP, routers), 4 Transporte (segmentos, puertos TCP y UDP), 5 Sesión, 6 Presentación y 7 Aplicación. El modelo TCP/IP que usa la internet real las condensa en cuatro: Acceso a la red (o Enlace), Internet, Transporte y Aplicación, donde Aplicación cubre las capas OSI 5 a 7.",
   "Cada capa agrega su propio encabezado a medida que los datos bajan por la pila, un proceso llamado encapsulación. Los datos de la aplicación reciben un encabezado TCP o UDP para convertirse en un segmento (o datagrama), luego un encabezado IP para convertirse en un paquete, luego un encabezado y un trailer Ethernet para convertirse en una trama, y después se envían como bits. El receptor invierte el proceso. Cuando escuchas 'switch de Capa 2' o 'puerto de Capa 4', se están usando los números de OSI.",
   "La capa de transporte tiene dos protocolos principales. TCP (Transmission Control Protocol) es orientado a conexión y confiable. Abre una sesión con un saludo de tres vías (three-way handshake: SYN, SYN-ACK, ACK), numera cada byte con números de secuencia, confirma lo que recibe, retransmite los datos perdidos, entrega los datos en orden y usa ventanas (windowing) para el control de flujo. Cierra con intercambios FIN. UDP (User Datagram Protocol) es sin conexión: sin handshake, sin confirmaciones, sin retransmisión, solo un encabezado pequeño con puertos, longitud y checksum. Eso hace a UDP más ligero y rápido, lo que conviene para consultas DNS, voz y video, y protocolos que manejan las pérdidas por sí mismos.",
   "Los puertos identifican la aplicación en un host. Los puertos conocidos (well-known ports) van del 0 al 1023. Vale la pena memorizar estos: FTP 20 y 21 (TCP), SSH 22 (TCP), Telnet 23 (TCP), SMTP 25 (TCP), DNS 53 (UDP y TCP), DHCP 67 servidor y 68 cliente (UDP), TFTP 69 (UDP), HTTP 80 (TCP), NTP 123 (UDP), SNMP 161 y traps 162 (UDP), BGP 179 (TCP), HTTPS 443 (TCP) y syslog 514 (UDP). Ten en cuenta que algunos protocolos de enrutamiento no usan puertos en absoluto: OSPF corre directamente sobre IP como protocolo número 89.",
   "Estos números importan en Junos porque los firewall filters los usan para hacer coincidencias. Un término de filtro podría usar `from protocol tcp destination-port ssh` o `destination-port 22`; Junos acepta muchos nombres conocidos en lugar de números. Cuando construyas un filtro para proteger el Routing Engine, listarás los protocolos y puertos exactos que el router necesita, así que saber cuáles corren sobre TCP y cuáles sobre UDP te evita bloquear BGP o NTP por error."
  ],
  "terms": [
   [
    "Encapsulation (encapsulación)",
    "Agregar el encabezado (y trailer) de cada capa a los datos a medida que bajan por la pila."
   ],
   [
    "TCP",
    "Transporte confiable y orientado a conexión que usa un saludo de tres vías, números de secuencia, confirmaciones y retransmisión."
   ],
   [
    "UDP",
    "Transporte sin conexión y de mejor esfuerzo, con un encabezado pequeño y sin confirmaciones ni retransmisión."
   ],
   [
    "Well-known ports (puertos conocidos)",
    "Números de puerto del 0 al 1023, asignados a servicios comunes como SSH (22) y HTTPS (443)."
   ],
   [
    "Three-way handshake (saludo de tres vías)",
    "El intercambio SYN, SYN-ACK, ACK que abre una conexión TCP."
   ]
  ],
  "example": "Un usuario reporta que un sitio web interno no carga, aunque el ping funciona. Que el ping (ICMP, Capa 3) funcione demuestra que el enrutamiento está bien, así que buscas más arriba: un firewall filter en el camino permite ICMP pero no el puerto TCP 443. Agregar un término que acepte `protocol tcp destination-port https` lo soluciona.",
  "tip": "Conoce qué protocolo usa cada puerto conocido. DNS es la trampa clásica: usa UDP 53 para la mayoría de las consultas pero TCP 53 para transferencias de zona y respuestas grandes. BGP usa TCP 179, mientras que OSPF usa el protocolo IP 89 y ningún puerto.",
  "check": [
   [
    "¿Qué capas OSI cubre la capa de Aplicación de TCP/IP?",
    "Las capas OSI 5, 6 y 7 (Sesión, Presentación y Aplicación)."
   ],
   [
    "Menciona dos funciones que TCP ofrece y UDP no.",
    "Dos cualesquiera de: establecimiento de conexión con un handshake, confirmaciones, retransmisión de datos perdidos, entrega en orden y control de flujo mediante ventanas."
   ],
   [
    "¿Qué protocolo de transporte y qué puerto usa SSH?",
    "TCP puerto 22."
   ]
  ]
 },
 {
  "t": "Class of service concepts: why traffic is classified, queued, scheduled and rewritten",
  "tt": "Conceptos de clase de servicio: por qué el tráfico se clasifica, se encola, se programa y se reescribe",
  "body": [
   "La clase de servicio (CoS, class of service) es la forma en que una red decide qué tráfico recibe mejor trato cuando los enlaces se congestionan. Sin ella, todos los paquetes esperan en una sola cola FIFO (first-in, first-out), así que una transferencia de archivos grande puede retrasar una llamada de voz o incluso un hello de un protocolo de enrutamiento. CoS en Junos te permite ordenar el tráfico en clases y darle a cada clase su propia porción de ancho de banda, espacio de búfer y prioridad. El examen JNCIA evalúa los conceptos y el vocabulario más que el ajuste detallado.",
   "CoS en Junos funciona como un pipeline con cuatro etapas principales. Primero, la clasificación: cuando un paquete entra por una interfaz, el router le asigna una forwarding class (clase de reenvío, que decide la cola de salida) y una loss priority (prioridad de pérdida, que indica con qué facilidad se puede descartar bajo congestión). La clasificación puede leer marcas que ya están en el paquete, como el valor DSCP (Differentiated Services Code Point) en el encabezado IP, o puede hacer coincidencias con otros campos mediante un firewall filter.",
   "Segundo, el policing puede limitar cuánto tráfico de una clase se admite, descartando o remarcando el exceso. Tercero, el encolamiento (queuing) y la programación (scheduling) ocurren en la interfaz de salida. Cada forwarding class se asocia a una cola. Un scheduler define, por cola, una tasa de transmisión (porción del ancho de banda), un tamaño de búfer y una prioridad, y un scheduler map vincula los schedulers con las forwarding classes para una interfaz. Cuando el enlace está congestionado, el scheduler decide qué cola envía a continuación, y los drop profiles usan técnicas como RED (random early detection) para descartar algunos paquetes antes de que una cola se llene por completo, normalmente descartando primero el tráfico con loss priority alta.",
   "Cuarto, la reescritura (rewrite). Antes de que el paquete salga, una rewrite rule puede establecer los bits DSCP, IP precedence, 802.1p o MPLS EXP en el encabezado de salida para que coincidan con la forwarding class y la loss priority que se le asignaron. Así, el siguiente router aguas abajo puede clasificarlo rápidamente usando esas marcas, manteniendo un trato consistente en toda la red.",
   "Ayuda recordar por qué existe cada paso. La clasificación ocurre una sola vez, en el borde, porque puede ser costosa. El encolamiento solo importa cuando hay congestión; en un enlace sin carga, cada paquete sale de inmediato sin importar su clase. La programación decide quién gana cuando las colas compiten. La reescritura lleva la decisión al siguiente salto. Nada de esto crea ancho de banda; solo decide quién sufre cuando no hay suficiente.",
   "En Junos todo esto vive bajo `[edit class-of-service]`, con secciones como `classifiers`, `forwarding-classes`, `schedulers`, `scheduler-maps`, `rewrite-rules` e `interfaces`. `show class-of-service interface ge-0/0/0` muestra lo que está aplicado a una interfaz."
  ],
  "terms": [
   [
    "Class of service (CoS, clase de servicio)",
    "El conjunto de funciones que clasifican, encolan, programan y marcan el tráfico para que distintas clases reciban distinto trato."
   ],
   [
    "Forwarding class (clase de reenvío)",
    "La etiqueta de Junos asignada a un paquete que determina qué cola de salida usa."
   ],
   [
    "Loss priority (prioridad de pérdida)",
    "Un valor por paquete (como low o high) que indica al router qué paquetes descartar primero bajo congestión."
   ],
   [
    "Scheduler",
    "Un conjunto de parámetros para una cola, que incluye tasa de transmisión, tamaño de búfer y prioridad."
   ],
   [
    "Rewrite rule (regla de reescritura)",
    "Una regla de salida que establece marcas CoS como DSCP en los paquetes salientes según la forwarding class y la loss priority."
   ]
  ],
  "example": "Un enlace WAN de sucursal lleva voz y respaldos masivos. Los paquetes de voz llegan marcados con DSCP EF, así que el router de borde los clasifica en expedited-forwarding con loss priority low. Un scheduler da a esa cola prioridad estricta alta con una tasa de transmisión limitada, mientras los respaldos quedan en best-effort. Cuando un respaldo nocturno satura el enlace, las llamadas se mantienen limpias porque el scheduler envía primero la cola de voz.",
  "tip": "Ten claro el orden: clasificar en la entrada, encolar y programar en la salida, reescribir en la salida. Las preguntas a menudo piden en qué punto del camino ocurre cada paso.",
  "check": [
   [
    "¿Qué dos valores asigna un clasificador de Junos a un paquete?",
    "Una forwarding class (que elige la cola de salida) y una loss priority (que controla la preferencia de descarte bajo congestión)."
   ],
   [
    "¿Por qué existen las rewrite rules?",
    "Para marcar los paquetes salientes (por ejemplo, estableciendo DSCP) de modo que los routers aguas abajo puedan clasificarlos de forma consistente sin volver a examinar el tráfico."
   ],
   [
    "¿La programación de CoS cambia algo en un enlace sin congestión?",
    "No de forma notable. Cuando no hay congestión, las colas se mantienen vacías y los paquetes se envían en cuanto llegan."
   ]
  ]
 },
 {
  "t": "Junos default forwarding classes (best-effort, expedited-forwarding, assured-forwarding, network-control)",
  "tt": "Forwarding classes por defecto de Junos (best-effort, expedited-forwarding, assured-forwarding, network-control)",
  "body": [
   "Antes de que configures cualquier cosa bajo `[edit class-of-service]`, Junos ya tiene una configuración de CoS funcionando. Define cuatro forwarding classes y asocia cada una a una cola de salida. Conocer estos valores por defecto importa porque deciden cómo se trata tu tráfico desde el primer día, y porque el examen pregunta por los nombres, los números de cola y para qué están pensadas.",
   "Las cuatro forwarding classes por defecto son: best-effort, asociada a la cola 0; expedited-forwarding, asociada a la cola 1; assured-forwarding, asociada a la cola 2; y network-control, asociada a la cola 3. Puedes verlas con `show class-of-service forwarding-class`. Los nombres a menudo se abrevian BE, EF, AF y NC.",
   "Cada clase tiene un uso previsto. Best-effort es para datos comunes sin garantía especial: navegación web, correo, transferencias de archivos. Expedited-forwarding es para tráfico que necesita bajo retardo, bajo jitter y baja pérdida, como la voz; toma su nombre del comportamiento por salto EF de DiffServ (Differentiated Services). Assured-forwarding es para tráfico que debe recibir una porción garantizada de ancho de banda pero puede tolerar algo de retardo, como aplicaciones de negocio importantes; corresponde a las clases AF de DiffServ. Network-control es para el tráfico de los propios protocolos del router, como OSPF, BGP y otros keepalives, que debe pasar o la propia red se rompe.",
   "Los valores por defecto son deliberadamente simples. Sin configuración de CoS, la mayor parte del tráfico termina en best-effort. El tráfico marcado con IP precedence 6 o 7 (los valores usados para enrutamiento y control de red) se coloca en network-control mediante el clasificador por defecto en muchas plataformas. El scheduler por defecto da ancho de banda y búfer solo a las colas best-effort y network-control, aproximadamente 95 por ciento y 5 por ciento respectivamente, y expedited-forwarding y assured-forwarding no reciben nada hasta que configures schedulers para ellas. Así que simplemente clasificar la voz en EF sin construir también un scheduler no le daría mejor trato e incluso podría perjudicarla.",
   "Puedes renombrar forwarding classes, agregar más (muchas plataformas soportan ocho o más colas) y reasignarlas a otras colas bajo `[edit class-of-service forwarding-classes]`. La mayoría de los diseños mantienen los cuatro nombres por defecto porque son ampliamente conocidos. Cuando mires `show interfaces queue ge-0/0/0`, verás contadores por cola etiquetados con estos nombres de clase, que es la forma más rápida de confirmar qué cola está usando realmente tu tráfico y si alguna cola está descartando paquetes.",
   "```\nuser@r1> show class-of-service forwarding-class\nForwarding class          ID   Queue ...\n  best-effort              0     0\n  expedited-forwarding     1     1\n  assured-forwarding       2     2\n  network-control          3     3\n```"
  ],
  "terms": [
   [
    "best-effort (BE)",
    "Forwarding class por defecto para tráfico común, asociada a la cola 0."
   ],
   [
    "expedited-forwarding (EF)",
    "Forwarding class por defecto para tráfico de baja latencia y bajo jitter como la voz, asociada a la cola 1."
   ],
   [
    "assured-forwarding (AF)",
    "Forwarding class por defecto para tráfico que necesita una garantía de ancho de banda, asociada a la cola 2."
   ],
   [
    "network-control (NC)",
    "Forwarding class por defecto para el tráfico de protocolos de enrutamiento y control, asociada a la cola 3."
   ],
   [
    "show interfaces queue",
    "Comando operacional que muestra los contadores de transmisión y descarte por cola de una interfaz."
   ]
  ],
  "example": "Un ingeniero clasifica la voz en expedited-forwarding pero olvida los schedulers. Las llamadas empeoran en las horas de mayor tráfico. `show interfaces queue ge-0/0/0` muestra descartes en la cola 1, porque el scheduler map por defecto no le da ancho de banda a EF. Agregar un scheduler para EF y aplicar un scheduler map a la interfaz lo soluciona.",
  "tip": "Memoriza los números de cola: BE 0, EF 1, AF 2, NC 3. Recuerda también que por defecto solo BE y NC reciben recursos del scheduler.",
  "check": [
   [
    "¿Qué cola usa network-control por defecto y qué tráfico pertenece ahí?",
    "La cola 3; lleva el tráfico de enrutamiento y de otros protocolos de control como OSPF y BGP."
   ],
   [
    "¿Qué pasa si pones tráfico en assured-forwarding pero no configuras schedulers?",
    "No recibe ancho de banda garantizado, porque el scheduler map por defecto solo asigna recursos a best-effort y network-control."
   ],
   [
    "¿Qué clase por defecto está pensada para la voz?",
    "expedited-forwarding, que está diseñada para bajo retardo, jitter y pérdida."
   ]
  ]
 },
 {
  "t": "Behavior aggregate (DSCP-based) vs multifield classification",
  "tt": "Clasificación behavior aggregate (basada en DSCP) vs clasificación multifield",
  "body": [
   "La clasificación es el primer paso de CoS: decidir qué forwarding class y loss priority recibe un paquete. Junos ofrece dos formas de hacerlo, y el examen espera que sepas cuándo se usa cada una. Un clasificador behavior aggregate (BA) lee una sola marca de CoS que ya está en el paquete. Un clasificador multifield (MF) examina varios campos del encabezado usando un firewall filter.",
   "La clasificación BA depende de marcas que alguien aguas arriba ya estableció. Para tráfico IP, normalmente es el DSCP (Differentiated Services Code Point), los 6 bits superiores del byte ToS de IPv4 o del byte traffic class de IPv6, lo que da 64 valores posibles. Valores comunes son EF (decimal 46) para voz, las clases AF como AF11 a AF43 para tráfico asegurado, CS6 y CS7 para control de red, y 0 para best effort. Los equipos más antiguos usan IP precedence, los 3 bits superiores del mismo byte. En Ethernet, 802.1p usa 3 bits en la etiqueta VLAN, y las redes MPLS usan los bits EXP (traffic class). Un clasificador BA es una tabla de búsqueda: el valor DSCP X se asocia con la forwarding class Y y la loss priority Z. Es rápido y simple, y lo aplicas a una interfaz bajo `[edit class-of-service interfaces]`.",
   "La debilidad de la clasificación BA es la confianza. Solo funciona si las marcas son correctas, lo cual está bien dentro de tu propia red pero es riesgoso en el borde, donde un cliente o usuario podría marcar todo como EF. Ahí es donde ayuda la clasificación MF.",
   "Un clasificador MF es un firewall filter cuyos términos hacen coincidencia con campos como la dirección de origen y destino, el protocolo y los puertos, y cuya acción establece `forwarding-class` y `loss-priority`. Por ejemplo, un término podría coincidir con tráfico UDP de la subred del gateway de voz en un rango de puertos y ponerlo en expedited-forwarding, mientras otro término pone todo lo demás en best-effort. Lo aplicas como filtro de entrada (input) en la interfaz de ingreso, como cualquier otro filtro.",
   "```\nset firewall family inet filter CLASSIFY term voice from source-address 10.9.9.0/24\nset firewall family inet filter CLASSIFY term voice from protocol udp\nset firewall family inet filter CLASSIFY term voice then forwarding-class expedited-forwarding\nset firewall family inet filter CLASSIFY term voice then loss-priority low\nset firewall family inet filter CLASSIFY term rest then forwarding-class best-effort\nset interfaces ge-0/0/1 unit 0 family inet filter input CLASSIFY\n```",
   "Los dos pueden coexistir. Cuando ambos se aplican a la misma interfaz, el clasificador BA se ejecuta primero y el clasificador MF después, así que el resultado MF gana para cualquier paquete con el que coincida. El diseño típico es clasificación MF en el borde de la red, donde el tráfico entra desde orígenes no confiables, luego una rewrite rule establece DSCP en la salida, y luego clasificación BA en los routers del núcleo, que simplemente confían en esas marcas."
  ],
  "terms": [
   [
    "Behavior aggregate (BA) classifier (clasificador BA)",
    "Un clasificador que asocia una sola marca de CoS (DSCP, IP precedence, 802.1p o MPLS EXP) con una forwarding class y una loss priority."
   ],
   [
    "Multifield (MF) classifier (clasificador MF)",
    "Un firewall filter que hace coincidencia con varios campos del encabezado y establece la forwarding class y la loss priority como su acción."
   ],
   [
    "DSCP",
    "Differentiated Services Code Point: 6 bits en el encabezado IP usados para marcar el trato CoS de un paquete."
   ],
   [
    "EF (DSCP 46)",
    "El valor DSCP usado por convención para tráfico expedito de baja latencia, como la voz."
   ]
  ],
  "example": "Un router de borde de un ISP recibe tráfico de clientes donde todos los paquetes dicen ser DSCP EF. El ISP aplica un clasificador MF en la interfaz hacia el cliente que solo respeta EF para el tráfico de la subred de voz contratada por el cliente y pone el resto en best-effort, luego reescribe el DSCP en la salida. Los routers del núcleo usan un clasificador BA y confían en esas marcas corregidas.",
  "tip": "Si una pregunta menciona coincidencias con direcciones o puertos, la respuesta es multifield (un firewall filter). Si menciona leer DSCP, precedence, 802.1p o EXP, la respuesta es behavior aggregate. Cuando aplican ambos, MF tiene prioridad sobre BA.",
  "check": [
   [
    "¿Qué tipo de clasificador usa un firewall filter?",
    "La clasificación multifield; los términos del filtro hacen coincidencia con campos del encabezado y las acciones `then` establecen la forwarding class y la loss priority."
   ],
   [
    "¿Por qué la clasificación BA se usa normalmente en el núcleo y no en el borde?",
    "Porque confía en las marcas existentes, lo cual es seguro una vez que el borde las clasificó y reescribió, pero riesgoso para tráfico de orígenes no confiables."
   ],
   [
    "Si un paquete coincide con un clasificador BA y uno MF en la misma interfaz, ¿qué resultado se aplica?",
    "El resultado MF, porque el clasificador multifield se evalúa después del clasificador BA y lo reemplaza."
   ]
  ]
 },
 {
  "t": "Junos OS as one modular OS across routing, switching and security platforms",
  "tt": "Junos OS como un único sistema operativo modular para plataformas de enrutamiento, conmutación y seguridad",
  "body": [
   "Uno de los principales argumentos de venta de Juniper, y un tema recurrente del examen, es que el mismo sistema operativo, Junos OS, corre en muchas familias de productos: routers MX, routers de núcleo PTX, routers de acceso ACX, switches EX y QFX y gateways de seguridad SRX. Si aprendes el CLI en un router virtual en tu laboratorio, los mismos comandos, la misma jerarquía y el mismo modelo de commit se trasladan a un switch de campus o a un firewall.",
   "Varias ideas de diseño hacen que esto funcione. Primero, hay una sola base de código fuente, con funciones agregadas para hardware específico. Segundo, Juniper tradicionalmente publica versiones con un calendario regular, con nombres de versión como 23.4R1, donde los primeros números identifican la versión y R1, R2 y así sucesivamente son versiones de mantenimiento de ella. La cadencia exacta de versiones ha cambiado con los años, así que consulta la documentación de Juniper en lugar de memorizar un número.",
   "Tercero, el software es modular. En lugar de un solo programa grande, Junos ejecuta muchos procesos separados, llamados daemons, cada uno con una tarea: protocolos de enrutamiento, el CLI, la gestión de interfaces, el hardware del chasis, SNMP y así sucesivamente. Cada daemon corre en su propio espacio de memoria protegida. Si uno falla, el kernel puede reiniciarlo sin tumbar a los demás ni a todo el dispositivo. Esta es una gran razón por la que Junos se considera estable.",
   "Cuarto, separa el plano de control del plano de reenvío. El software que ejecuta los protocolos y la gestión vive en el Routing Engine, mientras que el tráfico lo reenvía el Packet Forwarding Engine. Estudiarás ambos en detalle en las próximas lecciones.",
   "Para ti como operador, la consistencia es el beneficio práctico. La configuración es una jerarquía que editas con `set` y `delete`; los cambios van a una configuración candidata y solo surten efecto cuando haces `commit`; puedes hacer rollback a commits anteriores. Los comandos operacionales como `show interfaces terse`, `show route` y `show system alarms` se ven iguales en todas las familias. Las diferencias entre plataformas aparecen sobre todo como niveles de jerarquía adicionales: zonas y políticas de `security` en SRX, `vlans` y `ethernet-switching` en EX y QFX, o ajustes específicos del chasis.",
   "Juniper también ofrece Junos OS Evolved, una variante basada en Linux en ciertas plataformas, que mantiene el mismo CLI y el mismo modelo de configuración. Desde afuera se comporta como Junos, y el examen trata la interfaz de usuario como común a ambos."
  ],
  "terms": [
   [
    "Junos OS",
    "El sistema operativo de red de Juniper, usado en sus plataformas de enrutamiento, conmutación y seguridad."
   ],
   [
    "Daemon",
    "Un proceso en segundo plano con una sola responsabilidad, como el enrutamiento o el CLI, que corre en su propia memoria protegida."
   ],
   [
    "Modularity (modularidad)",
    "El diseño en el que procesos separados pueden fallar y reiniciarse de forma independiente sin que el sistema se caiga."
   ],
   [
    "Candidate configuration (configuración candidata)",
    "La copia de trabajo de la configuración que editas; surte efecto solo después de un commit."
   ]
  ],
  "example": "Una ingeniera de redes que solo ha usado vJunos-router en un laboratorio empieza un trabajo operando switches EX y firewalls SRX. El primer día inicia sesión, escribe `show interfaces terse`, `configure`, `show | compare` y `commit confirmed` exactamente como en su laboratorio. Lo único nuevo que tiene que aprender son las jerarquías de seguridad y de VLAN específicas de esas plataformas.",
  "tip": "Las respuestas del examen que resaltan 'un sistema operativo, un CLI, un tren de versiones, daemons modulares' describen Junos. Una respuesta que diga que cada plataforma tiene un sistema operativo diferente es incorrecta.",
  "check": [
   [
    "Menciona tres familias de productos de Juniper que ejecutan Junos OS.",
    "Tres cualesquiera de: routers MX, routers PTX, routers ACX, switches EX, switches QFX y firewalls SRX."
   ],
   [
    "¿Cuál es el beneficio de ejecutar cada función como un daemon separado?",
    "Cada daemon tiene su propia memoria protegida, así que una falla en uno puede contenerse y el daemon puede reiniciarse sin que todo el sistema se caiga."
   ],
   [
    "¿Cambia el CLI entre Junos OS y Junos OS Evolved?",
    "No. Ambos usan el mismo CLI y el mismo modelo de configuración."
   ]
  ]
 },
 {
  "t": "Separation of control plane and forwarding plane",
  "tt": "Separación del plano de control y el plano de reenvío",
  "body": [
   "Todo router hace dos trabajos muy distintos. Tiene que determinar hacia dónde debe ir el tráfico, ejecutando protocolos de enrutamiento, manejando sesiones de gestión y construyendo tablas. Y tiene que mover realmente millones de paquetes por segundo por las interfaces correctas. Junos separa esto en el plano de control (control plane) y el plano de reenvío (forwarding plane, también llamado plano de datos o data plane), y los ejecuta en hardware diferente.",
   "El plano de control lo maneja el Routing Engine (RE). Es esencialmente una computadora de propósito general: CPU, memoria y almacenamiento que ejecutan el kernel de Junos y los daemons. Habla OSPF, BGP y otros protocolos con los vecinos, ejecuta el CLI y J-Web, maneja SSH, SNMP y syslog, y calcula el mejor camino hacia cada destino. A partir de eso construye una tabla de enrutamiento y luego una tabla de reenvío.",
   "El plano de reenvío lo maneja el Packet Forwarding Engine (PFE). En la mayoría de las plataformas se construye con ASIC (application-specific integrated circuits, circuitos integrados de aplicación específica) especializados, diseñados para buscar destinos, aplicar filtros, policers y CoS, y reenviar el tráfico a velocidad de línea. El RE envía una copia de la tabla de reenvío al PFE, y el PFE reenvía el tráfico de tránsito usando esa copia sin involucrar al RE en cada paquete.",
   "Los dos están conectados por un enlace interno. Por él, el RE envía las actualizaciones de la tabla de reenvío al PFE, y el PFE sube la pequeña cantidad de tráfico que el propio RE debe manejar, como los paquetes de protocolos de enrutamiento o una sesión SSH al router. Este tráfico dirigido al host se llama tráfico de excepción (exception traffic), y tiene limitación de tasa para que no pueda saturar al RE.",
   "Los beneficios son la razón por la que este diseño está en el examen. Rendimiento: la velocidad de reenvío no depende de la carga de CPU del RE, así que una sesión de CLI ocupada o una actualización BGP grande no ralentiza el tráfico de tránsito. Estabilidad: si el RE está muy cargado, o un daemon de enrutamiento se reinicia, el PFE puede seguir reenviando con la última tabla de reenvío que recibió. Seguridad: como el tráfico de tránsito nunca llega al RE, los ataques contra el propio router se limitan a la ruta de excepción, que puedes proteger con un filtro en la loopback. Escala: los fabricantes pueden mejorar el hardware del RE y del PFE de forma independiente.",
   "Puedes ver ambos lados desde el CLI. `show route` muestra la tabla de enrutamiento que se guarda en el RE. `show route forwarding-table` muestra la tabla de reenvío que se construyó para el PFE. `show chassis routing-engine` muestra la CPU y la memoria del RE; `show chassis fpc` muestra las tarjetas de línea que alojan los PFE en plataformas modulares."
  ],
  "terms": [
   [
    "Control plane (plano de control)",
    "Las funciones que deciden hacia dónde va el tráfico: protocolos de enrutamiento, gestión y construcción de tablas, manejadas por el Routing Engine."
   ],
   [
    "Forwarding plane (plano de reenvío)",
    "Las funciones que mueven los paquetes de tránsito usando la tabla de reenvío, manejadas por el Packet Forwarding Engine."
   ],
   [
    "Routing Engine (RE)",
    "El componente basado en CPU que ejecuta Junos, el CLI y los protocolos de enrutamiento."
   ],
   [
    "Packet Forwarding Engine (PFE)",
    "El componente, normalmente basado en ASIC, que reenvía el tráfico a velocidad de línea."
   ],
   [
    "Exception traffic (tráfico de excepción)",
    "Paquetes que el PFE debe subir al RE, como el tráfico dirigido al propio router."
   ]
  ],
  "example": "Durante una ventana de mantenimiento, un ingeniero ejecuta un comando `show route` grande y la CPU del RE sube al 90 por ciento durante un minuto. Los clientes no notan ningún efecto, porque su tráfico de tránsito lo reenvía el PFE usando su tabla de reenvío, que la salida pesada del CLI no toca.",
  "tip": "Si una pregunta pregunta qué componente reenvía el tráfico de tránsito, la respuesta es el PFE. Si pregunta cuál ejecuta protocolos, construye tablas o aloja el CLI, la respuesta es el RE.",
  "check": [
   [
    "¿Qué envía el RE al PFE?",
    "Una copia de la tabla de reenvío (más configuración como filtros y CoS), que el PFE usa para reenviar el tráfico de tránsito."
   ],
   [
    "¿Por qué un router puede seguir reenviando si su daemon de enrutamiento se reinicia?",
    "Porque el PFE sigue usando la última tabla de reenvío que recibió del RE, independientemente de los procesos del RE."
   ],
   [
    "Menciona un beneficio de seguridad de separar los planos.",
    "El tráfico de tránsito nunca llega al RE, así que solo el tráfico de excepción dirigido al host puede atacar el plano de control, y ese tráfico puede limitarse en tasa y filtrarse."
   ]
  ]
 },
 {
  "t": "Routing Engine (RE): runs the CLI, routing protocols, builds the routing and forwarding tables",
  "tt": "Routing Engine (RE): ejecuta el CLI y los protocolos de enrutamiento, construye las tablas de enrutamiento y de reenvío",
  "body": [
   "El Routing Engine es el cerebro de un dispositivo Junos. Es una computadora de propósito general, con su propia CPU, memoria y almacenamiento, que ejecuta el kernel de Junos y todos los daemons. Cuando inicias sesión, escribes comandos, cambias la configuración o ves a OSPF formar una adyacencia, estás interactuando con el RE.",
   "Sus responsabilidades se agrupan en unas pocas categorías. Gestión: ejecuta el CLI, J-Web, SSH, NETCONF, SNMP y syslog, guarda la configuración y su historial de rollback, y mantiene el reloj del sistema mediante NTP. Enrutamiento: ejecuta protocolos de enrutamiento como OSPF, IS-IS y BGP a través del daemon de protocolos de enrutamiento, rpd, y contiene las rutas estáticas y las rutas directamente conectadas. Control del chasis: supervisa el hardware, la energía, los ventiladores y la temperatura, y genera alarmas. Construcción de tablas: convierte todo lo que aprende en una tabla de reenvío para el PFE.",
   "Vale la pena entender esa última tarea paso a paso. Cada fuente de rutas (interfaces directas, direcciones locales, rutas estáticas, OSPF, BGP) aporta rutas candidatas a la tabla de enrutamiento, también llamada RIB (routing information base). En Junos, las rutas unicast IPv4 viven en `inet.0` y las IPv6 en `inet6.0`. Cuando varias fuentes ofrecen el mismo prefijo, el RE elige la ruta activa usando la preferencia de ruta (route preference), donde gana el número más bajo: direct es 0, static es 5, OSPF interno es 10, BGP es 170. Las rutas activas se usan luego para construir la tabla de reenvío, o FIB (forwarding information base), que lista cada prefijo con su siguiente salto resuelto y su interfaz de salida. El RE envía la FIB a cada PFE.",
   "Puedes ver cada etapa desde el CLI. `show route` lista la tabla de enrutamiento; un asterisco marca la ruta activa para cada prefijo. `show route protocol static` la acota a una sola fuente. `show route forwarding-table destination 10.1.1.0/24` muestra la entrada que el PFE realmente usa. `show chassis routing-engine` informa la CPU, la memoria, el tiempo de actividad y, en sistemas con doble RE, cuál RE es el primario.",
   "Las plataformas más grandes a menudo tienen dos Routing Engines para redundancia. Uno es el primario (también llamado master en documentación más antigua) y el otro es el de respaldo (backup). Funciones como graceful Routing Engine switchover pueden pasar el control al RE de respaldo mientras los PFE siguen reenviando. En sistemas con doble RE usas `commit synchronize` para que ambos RE tengan la misma configuración.",
   "Como el RE es una computadora normal con una CPU limitada en comparación con la capacidad de reenvío del PFE, debe protegerse. Un tráfico intenso dirigido al propio router podría dejar a los protocolos de enrutamiento sin tiempo de CPU. Por eso Junos limita la tasa del tráfico de excepción y por eso deberías poner un firewall filter en la interfaz loopback, como explican las lecciones posteriores."
  ],
  "terms": [
   [
    "Routing table (RIB, tabla de enrutamiento)",
    "La tabla del RE con todas las rutas conocidas de todas las fuentes; inet.0 contiene las rutas unicast IPv4."
   ],
   [
    "Forwarding table (FIB, tabla de reenvío)",
    "La tabla de rutas activas con siguientes saltos resueltos que el RE envía al PFE."
   ],
   [
    "Route preference (preferencia de ruta)",
    "El valor de Junos para elegir entre fuentes para el mismo prefijo; gana el más bajo (direct 0, static 5, OSPF 10, BGP 170)."
   ],
   [
    "Active route (ruta activa)",
    "La ruta que el RE elige para un prefijo e instala en la tabla de reenvío, marcada con * en `show route`."
   ]
  ],
  "example": "Un router aprende 10.50.0.0/24 tanto por OSPF como por una ruta estática. `show route 10.50.0.0/24` muestra la ruta estática con un asterisco porque su preferencia de 5 le gana al 10 de OSPF. `show route forwarding-table destination 10.50.0.0/24` confirma que el siguiente salto estático es el que usa el PFE.",
  "tip": "El RE construye ambas tablas pero no reenvía el tráfico de tránsito. Si una respuesta dice que el RE reenvía paquetes entre interfaces, está describiendo el componente equivocado.",
  "check": [
   [
    "¿Cuál es la diferencia entre la tabla de enrutamiento y la tabla de reenvío?",
    "La tabla de enrutamiento contiene todas las rutas aprendidas de todas las fuentes; la tabla de reenvío contiene solo las rutas activas con siguientes saltos resueltos y se copia al PFE."
   ],
   [
    "¿Qué daemon del RE ejecuta los protocolos de enrutamiento?",
    "rpd, el daemon de protocolos de enrutamiento."
   ],
   [
    "¿Qué comando muestra el uso de CPU y memoria del RE?",
    "`show chassis routing-engine`."
   ]
  ]
 },
 {
  "t": "Packet Forwarding Engine (PFE): forwards transit traffic using the forwarding table copied from the RE",
  "tt": "Packet Forwarding Engine (PFE): reenvía el tráfico de tránsito usando la tabla de reenvío copiada del RE",
  "body": [
   "El Packet Forwarding Engine es la parte de un dispositivo Junos que realmente mueve el tráfico. Donde el Routing Engine piensa, el PFE actúa. Recibe paquetes en las interfaces de entrada, decide hacia dónde va cada uno usando la tabla de reenvío, aplica los filtros, policers y CoS que haya, y lo envía por la interfaz correcta, normalmente a velocidad de línea.",
   "En la mayoría de las plataformas de hardware, el PFE se construye con ASIC diseñados por Juniper, así que las búsquedas y el reenvío ocurren en silicio y no en software. Los chasis modulares, como los routers MX más grandes, tienen varias tarjetas de línea, llamadas FPC (Flexible PIC Concentrators), cada una con uno o más PFE; los puertos físicos están en PIC (Physical Interface Cards) o directamente en la tarjeta. Los dispositivos más pequeños de configuración fija pueden tener un solo PFE. En algunos firewalls SRX de sucursal y en plataformas virtuales, el reenvío se hace en software en núcleos de CPU dedicados, pero la arquitectura y la terminología se mantienen iguales.",
   "El PFE no ejecuta protocolos de enrutamiento ni decide los mejores caminos. En cambio, el RE calcula la tabla de reenvío y envía una copia a cada PFE por el enlace interno. Cuando llega un paquete de tránsito, el PFE hace una coincidencia del prefijo más largo de la dirección de destino contra su copia, encuentra el siguiente salto y la interfaz de salida, reescribe el encabezado de Capa 2, decrementa el TTL y transmite. Nada de esto involucra al RE.",
   "Varias funciones se aplican directamente en el PFE, por eso cuestan poco rendimiento. Los firewall filters (el término de Juniper para las listas de control de acceso stateless) se evalúan en el PFE. Lo mismo ocurre con los policers que limitan la tasa del tráfico, la clasificación, el encolamiento y la reescritura de CoS, y el muestreo (sampling) para el monitoreo de flujos. Cuando haces commit de un firewall filter en el RE, la configuración se compila e instala en el PFE, que luego la aplica a cada paquete.",
   "El PFE también decide qué paquetes no son tráfico de tránsito. Los paquetes dirigidos al propio router, los paquetes con TTL que expira, algunos paquetes con opciones IP y excepciones similares se suben al RE por un camino con limitación de tasa. Esto mantiene al RE receptivo mientras el PFE carga con la mayor parte del trabajo.",
   "Los comandos operacionales te permiten ver el lado del PFE. `show route forwarding-table` muestra lo que se instaló. `show chassis fpc` y `show chassis fpc pic-status` muestran el estado de las tarjetas de línea en sistemas modulares. `show pfe statistics traffic` muestra contadores de los paquetes que manejó el PFE, incluidos los enviados al RE, lo cual es útil al investigar tráfico intenso dirigido al host."
  ],
  "terms": [
   [
    "PFE",
    "Packet Forwarding Engine: el componente que reenvía el tráfico de tránsito usando una copia de la tabla de reenvío."
   ],
   [
    "ASIC",
    "Application-specific integrated circuit (circuito integrado de aplicación específica): silicio personalizado que hace búsquedas y reenvío a alta velocidad."
   ],
   [
    "FPC",
    "Flexible PIC Concentrator: una tarjeta de línea en un chasis Junos modular que contiene hardware PFE."
   ],
   [
    "PIC",
    "Physical Interface Card: el módulo que proporciona los puertos físicos; su número es el valor del medio en nombres como ge-0/1/0."
   ],
   [
    "Firewall filter",
    "El filtro de paquetes stateless de Juniper, evaluado en el PFE, similar a una lista de control de acceso."
   ]
  ],
  "example": "Un router MX reenvía 100 Gbps de tráfico de clientes mientras un ingeniero reconfigura OSPF. Las nuevas rutas se calculan en el RE y se envían a los PFE, que actualizan sus tablas de reenvío. Durante todo el proceso, los PFE siguen reenviando el tráfico de tránsito y aplicando los firewall filters hacia los clientes sin ninguna ralentización medible.",
  "tip": "Los firewall filters, policers y CoS se aplican en el PFE aunque los configures en el RE. Las preguntas a veces sugieren que el RE inspecciona cada paquete de tránsito; no lo hace.",
  "check": [
   [
    "¿De dónde obtiene el PFE su tabla de reenvío?",
    "Del Routing Engine, que la calcula a partir de las rutas activas y envía una copia a cada PFE."
   ],
   [
    "Menciona dos funciones que el PFE aplica al tráfico de tránsito.",
    "Dos cualesquiera de: firewall filters, policers, clasificación y encolamiento de CoS, rewrite rules y sampling."
   ],
   [
    "¿Qué hace el PFE con un paquete dirigido al propio router?",
    "Lo sube al Routing Engine como tráfico de excepción (dirigido al host) por un camino interno con limitación de tasa."
   ]
  ]
 },
 {
  "t": "Key daemons: rpd (routing), mgd (management/CLI), dcd (interfaces), chassisd (chassis)",
  "tt": "Daemons clave: rpd (enrutamiento), mgd (gestión/CLI), dcd (interfaces), chassisd (chasis)",
  "body": [
   "Junos está formado por muchos procesos independientes llamados daemons, cada uno corriendo en su propio espacio de memoria protegida. El examen se enfoca en cuatro de ellos, y saber qué hace cada uno te ayuda a entender los mensajes de log, la salida de `show system processes` y lo que ocurre cuando algo falla.",
   "rpd, el daemon de protocolos de enrutamiento (routing protocol daemon), ejecuta todos los protocolos de enrutamiento: OSPF, IS-IS, BGP, RIP, además de las rutas estáticas, la política de enrutamiento y la selección de rutas. Mantiene las tablas de enrutamiento como inet.0 y entrega las rutas activas al kernel, que construye la tabla de reenvío para el PFE. Si tu adyacencia OSPF está oscilando (flapping) o una sesión BGP no se levanta, rpd es el proceso que hace el trabajo, y sus logs son donde debes mirar. Puedes reiniciarlo con `restart routing`, aunque en un router de producción esto interrumpe brevemente el enrutamiento.",
   "mgd, el daemon de gestión (management daemon), es el corazón de la interfaz de usuario. Maneja el CLI (cada sesión de CLI habla con mgd), procesa los cambios de configuración, ejecuta `commit` revisando la configuración candidata y luego notificando a los demás daemons los cambios relevantes, y sirve NETCONF y otras interfaces de automatización. Cuando escribes `commit check`, mgd valida la sintaxis y la consistencia.",
   "dcd, el daemon de control de dispositivos (device control daemon), configura y gestiona las interfaces. Cuando haces commit de cambios bajo `[edit interfaces]`, dcd los aplica: establece direcciones, MTU, encapsulación y unidades lógicas. Trabaja con el kernel para crear las entradas de interfaz que ven los demás procesos.",
   "chassisd, el daemon del chasis (chassis daemon), gestiona el hardware físico: Routing Engines, tarjetas de línea, fuentes de alimentación, ventiladores y sensores de temperatura. Detecta la inserción y extracción de hardware, enciende y apaga componentes y genera alarmas del chasis, que ves con `show chassis alarms` y `show chassis hardware`.",
   "Existen otros daemons que pueden aparecer en los logs. snmpd maneja SNMP; eventd maneja el registro del sistema (system logging) y las event policies; alarmd gestiona las alarmas en algunas plataformas. El punto arquitectónico importante es que estos procesos son independientes. Si rpd se cae, el kernel lo reinicia; el CLI (mgd) sigue funcionando y chassisd sigue gestionando el hardware, y el PFE sigue reenviando con la última tabla de reenvío que tenía. Puedes ver los procesos en ejecución con `show system processes extensive`, y reiniciar muchos daemons con comandos como `restart interface-control` (dcd) o `restart chassis-control` (chassisd). Trata los reinicios con cuidado en equipos en producción, ya que algunos son disruptivos."
  ],
  "terms": [
   [
    "rpd",
    "Routing protocol daemon (daemon de protocolos de enrutamiento): ejecuta los protocolos de enrutamiento, la política y la selección de rutas, y mantiene las tablas de enrutamiento."
   ],
   [
    "mgd",
    "Management daemon (daemon de gestión): sirve el CLI y las interfaces de automatización y procesa los commits de configuración."
   ],
   [
    "dcd",
    "Device control daemon (daemon de control de dispositivos): configura y gestiona las interfaces físicas y lógicas."
   ],
   [
    "chassisd",
    "Chassis daemon (daemon del chasis): supervisa y controla los componentes de hardware y genera las alarmas del chasis."
   ]
  ],
  "example": "Un router registra que un proceso se reinició inesperadamente. El ingeniero revisa `show system core-dumps` y `show system processes extensive` y ve que rpd tiene una hora de inicio reciente. Los vecinos OSPF volvieron a converger, pero las sesiones SSH, las interfaces y el hardware se mantuvieron activos y el tráfico de tránsito siguió fluyendo, lo que muestra el valor de los daemons independientes.",
  "tip": "Asocia el daemon con el síntoma: los problemas de enrutamiento apuntan a rpd, los problemas de CLI o de commit a mgd, la configuración de interfaces a dcd y las alarmas de hardware a chassisd.",
  "check": [
   [
    "¿Qué daemon valida y aplica un commit?",
    "mgd, el daemon de gestión, que revisa la candidata y avisa a los demás daemons para que apliquen sus partes de la configuración."
   ],
   [
    "¿Qué daemon gestiona las fuentes de alimentación, los ventiladores y las tarjetas de línea?",
    "chassisd, el daemon del chasis."
   ],
   [
    "¿Qué le pasa al CLI si rpd se cae?",
    "Sigue funcionando, porque mgd es un proceso separado; rpd se reinicia de forma independiente."
   ]
  ]
 },
 {
  "t": "Transit traffic vs exception (host-bound) traffic and why exception traffic is rate-limited to the RE",
  "tt": "Tráfico de tránsito vs tráfico de excepción (dirigido al host) y por qué el tráfico de excepción hacia el RE tiene limitación de tasa",
  "body": [
   "Todo paquete que recibe un dispositivo Junos cae en uno de dos grupos, y saber en cuál es esencial para entender el rendimiento y la seguridad. El tráfico de tránsito (transit traffic) pasa a través del dispositivo camino a otro lugar. El tráfico de excepción (exception traffic) necesita atención del Routing Engine, ya sea porque está dirigido al dispositivo o porque el PFE no puede manejarlo solo.",
   "El tráfico de tránsito es la gran mayoría. Una sesión web entre una PC y un servidor, por ejemplo, simplemente pasa a través del router. El PFE busca el destino en su tabla de reenvío, aplica filtros y CoS, y envía el paquete. El RE nunca ve estos paquetes.",
   "El tráfico de excepción viene en varios tipos. El tráfico dirigido al host (host-bound) está dirigido a una de las propias direcciones IP del dispositivo: paquetes de protocolos de enrutamiento como los hellos de OSPF y las actualizaciones BGP, sesiones de gestión como SSH, SNMP y NTP, y pings al router. Cierto tráfico necesita que el RE genere una respuesta: cuando el TTL de un paquete expira, el RE puede crear un mensaje ICMP time-exceeded, que es lo que hace funcionar a traceroute. Algunos paquetes necesitan procesamiento especial, como ciertas opciones IP, o paquetes que necesitan resolución ARP para un siguiente salto. Y cierto tráfico no está dirigido al router pero igual lo procesa, como los paquetes multicast de control de los protocolos de enrutamiento.",
   "El camino del PFE al RE está limitado deliberadamente. El RE es una CPU de propósito general con mucha menos capacidad de paquetes que los ASIC del PFE. Si un atacante, una mala configuración o un bucle de red enviara tráfico a velocidad de línea a la propia dirección del router, un camino sin límite podría saturar la CPU del RE, dejando a rpd sin tiempo para enviar hellos. Las adyacencias de enrutamiento caerían y toda la red podría sufrir. Por eso Junos limita la tasa del tráfico de excepción en su camino hacia el RE, y en muchas plataformas agrega policing por protocolo, a menudo llamado protección DDoS (distributed denial of service, denegación de servicio distribuida), para que una inundación de un tipo de tráfico no desplace a los demás.",
   "Los límites de tasa incorporados son una red de seguridad, no una defensa completa, porque limitan el volumen pero no deciden qué orígenes son legítimos. Esa decisión la agregas tú con un firewall filter aplicado a la interfaz loopback, lo0, que el PFE aplica al tráfico dirigido al host antes de subirlo. Ese filtro debe aceptar solo los protocolos y orígenes que el router necesita y descartar todo lo demás.",
   "Al diagnosticar problemas, recuerda que un ping al router mide el manejo de excepciones, no el reenvío de tránsito. Pings lentos o perdidos hacia un router ocupado no significan necesariamente que el tráfico de tránsito esté afectado. Prueba a través del router, no hacia él, para juzgar el rendimiento de reenvío."
  ],
  "terms": [
   [
    "Transit traffic (tráfico de tránsito)",
    "Paquetes que pasan a través del dispositivo hacia otro destino, reenviados completamente por el PFE."
   ],
   [
    "Exception traffic (tráfico de excepción)",
    "Paquetes que el PFE envía al RE, incluido el tráfico dirigido al host y los paquetes que necesitan manejo especial."
   ],
   [
    "Host-bound traffic (tráfico dirigido al host)",
    "Tráfico dirigido al propio dispositivo, como protocolos de enrutamiento, SSH, SNMP o pings."
   ],
   [
    "DDoS protection (protección DDoS)",
    "Policing por protocolo en muchas plataformas Junos que limita cuánto de cada tipo de tráfico de excepción llega al RE."
   ]
  ],
  "example": "Un servidor de monitoreo mal configurado empieza a enviar miles de solicitudes SNMP por segundo a un router de núcleo. El tráfico de tránsito no se ve afectado, pero las respuestas SNMP se vuelven lentas. Como el tráfico de excepción tiene limitación de tasa, los keepalives de OSPF y BGP siguen pasando. El ingeniero luego actualiza el filtro de lo0 para aceptar SNMP solo desde hosts de gestión aprobados.",
  "tip": "Las respuestas de traceroute, los pings al router y los paquetes de protocolos de enrutamiento son todos tráfico de excepción. Un ping a través del router hacia un host del otro lado es tráfico de tránsito.",
  "check": [
   [
    "¿Un hello OSPF recibido de un vecino es tráfico de tránsito o de excepción?",
    "Tráfico de excepción (dirigido al host), porque está dirigido al router y debe procesarlo rpd en el RE."
   ],
   [
    "¿Por qué Junos limita la tasa del tráfico enviado del PFE al RE?",
    "Para evitar que las inundaciones de tráfico dirigido al host saturen la CPU del RE e interrumpan los protocolos de enrutamiento y la gestión."
   ],
   [
    "¿Por qué un ping lento a un router puede ser engañoso?",
    "Los pings al router son tráfico de excepción que el RE maneja a una tasa limitada, así que no reflejan qué tan rápido el PFE reenvía el tráfico de tránsito."
   ]
  ]
 },
 {
  "t": "Junos OS vs Junos OS Evolved (FreeBSD-based vs Linux-based)",
  "tt": "Junos OS vs Junos OS Evolved (basado en FreeBSD vs basado en Linux)",
  "body": [
   "Juniper mantiene dos variantes de su sistema operativo. El Junos OS clásico está construido sobre un kernel FreeBSD, un sistema operativo tipo Unix, y ha sido la plataforma de Juniper durante la mayor parte de la historia de la empresa. Junos OS Evolved es una variante más nueva construida sobre Linux, usada en un subconjunto de plataformas más nuevas. El examen espera que conozcas la diferencia de base y que entiendas que la experiencia de usuario es deliberadamente la misma.",
   "El Junos OS clásico ejecuta sus daemons, como rpd, mgd, dcd y chassisd, como procesos de FreeBSD. Cuando bajas al shell con `start shell`, estás en un entorno FreeBSD. En muchas plataformas de hardware más nuevas, el propio Junos OS corre como una máquina virtual sobre un host Linux, pero desde el punto de vista del operador sigue siendo Junos basado en FreeBSD.",
   "Junos OS Evolved corre de forma nativa en Linux. Su arquitectura cambia cómo se organiza el software por debajo: las aplicaciones corren como procesos nativos de Linux, el estado del sistema se guarda en una base de datos distribuida a la que otras aplicaciones se suscriben, y los componentes pueden reiniciarse o actualizarse de forma más independiente. Los objetivos son mayor disponibilidad, integración más fácil de aplicaciones Linux de terceros y una base más moderna. Los nombres de versión de Evolved normalmente llevan una etiqueta EVO, lo que te ayuda a saber qué variante ejecuta un dispositivo cuando miras `show version`.",
   "Para los operadores y para el examen, el hecho más importante es lo que no cambia. Junos OS Evolved mantiene el mismo CLI, la misma jerarquía de configuración, el mismo modelo de commit con configuraciones candidata y activa, el rollback y las mismas interfaces de automatización como NETCONF. Comandos como `show interfaces terse`, `show route`, `configure`, `show | compare` y `commit confirmed` funcionan igual. Las habilidades que construyes en el Junos clásico se transfieren directamente.",
   "Cuál te toque depende del hardware. Evolved se usa en algunas plataformas más nuevas de las familias PTX, ACX y QFX, mientras que los routers MX, los switches EX y los firewalls SRX en gran medida ejecutan el Junos OS clásico. La documentación de hardware de Juniper para cada modelo indica cuál soporta, así que consulta ahí en lugar de depender de una lista memorizada, ya que la oferta cambia con el tiempo.",
   "Una forma útil de resumir la diferencia: la misma interfaz de usuario y configuración, distinto kernel y arquitectura interna. Cuando una pregunta del examen los contrasta, FreeBSD va con Junos OS y Linux va con Junos OS Evolved."
  ],
  "terms": [
   [
    "Junos OS",
    "El sistema operativo clásico de Juniper, construido sobre un kernel FreeBSD."
   ],
   [
    "Junos OS Evolved",
    "Una variante de Junos basada en Linux con una arquitectura interna más distribuida y el mismo CLI."
   ],
   [
    "FreeBSD",
    "Un sistema operativo de código abierto tipo Unix que es la base del Junos OS clásico."
   ],
   [
    "show version",
    "Comando operacional que muestra el modelo, el nombre de host y la versión de software en ejecución."
   ]
  ],
  "example": "Una ingeniera gestiona tanto un router MX como un router PTX más nuevo. En ambos usa `show version` y ve la versión; el nombre de la versión del PTX incluye EVO. Su configuración de OSPF, sus filtros y su flujo de trabajo de commit son idénticos en ambos, así que su procedimiento de cambios no necesita reescribirse.",
  "tip": "Si una respuesta dice que Junos OS Evolved necesita un CLI o una sintaxis de configuración diferente, es incorrecta. La diferencia es el sistema operativo subyacente: FreeBSD para Junos OS, Linux para Evolved.",
  "check": [
   [
    "¿En qué kernel se basa el Junos OS clásico?",
    "FreeBSD."
   ],
   [
    "¿Qué se mantiene igual entre Junos OS y Junos OS Evolved?",
    "El CLI, la jerarquía de configuración, el modelo de commit y rollback y las interfaces de automatización."
   ],
   [
    "¿Cómo puedes saber qué variante ejecuta un dispositivo?",
    "Revisa `show version`; las versiones Evolved se identifican con una etiqueta EVO en el nombre de la versión, y la documentación de la plataforma indica qué variante soporta."
   ]
  ]
 },
 {
  "t": "Protecting the RE with a filter on the lo0 interface",
  "tt": "Protección del RE con un filtro en la interfaz lo0",
  "body": [
   "El Routing Engine es la única parte de un dispositivo Junos que los atacantes y los sistemas mal configurados pueden sobrecargar con relativamente poco tráfico, porque es una CPU de propósito general. La defensa estándar de Juniper es un firewall filter aplicado a la interfaz loopback, lo0. Por cómo funciona Junos, un filtro en lo0 inspecciona todo el tráfico dirigido al host, el tráfico que va hacia el RE, sin importar por qué interfaz física llegó.",
   "¿Por qué lo0? La interfaz loopback representa al propio router. Cuando aplicas un filtro de entrada (input) a `lo0.0`, el PFE lo evalúa contra cada paquete destinado al RE, ya sea que haya entrado por ge-0/0/0, xe-1/0/3 o cualquier otra interfaz. Escribes un solo filtro en un solo lugar en lugar de repetirlo en cada interfaz. El tráfico de tránsito no se ve afectado, porque nunca va al RE.",
   "Un firewall filter está formado por términos ordenados. Cada término tiene condiciones `from` (criterios de coincidencia como dirección de origen, protocolo y puerto) y acciones `then` (como `accept`, `discard`, `reject`, `count` o `log`). Junos revisa los términos de arriba hacia abajo y se detiene en la primera coincidencia. Si ningún término coincide, hay una acción final implícita de descarte (discard). Ese deny implícito es lo más importante que debes recordar: todo lo que olvides permitir será descartado.",
   "Por lo tanto, un buen filtro de protección del RE lista todo lo que el router necesita legítimamente. Los términos típicos aceptan SSH solo desde las subredes de gestión, BGP solo desde los peers configurados, OSPF desde los vecinos, NTP y SNMP desde servidores conocidos, respuestas DNS e ICMP (a menudo con limitación de tasa mediante un policer). Un término final descarta todo lo demás, normalmente con `count` para que puedas ver qué se está descartando. Es común definir prefix lists (listas de direcciones con nombre) para los hosts de gestión y los vecinos BGP, así el filtro es más fácil de mantener.",
   "```\nset policy-options prefix-list MGMT 10.99.0.0/24\nset firewall family inet filter PROTECT-RE term ssh from source-prefix-list MGMT\nset firewall family inet filter PROTECT-RE term ssh from protocol tcp\nset firewall family inet filter PROTECT-RE term ssh from destination-port ssh\nset firewall family inet filter PROTECT-RE term ssh then accept\nset firewall family inet filter PROTECT-RE term ospf from protocol ospf\nset firewall family inet filter PROTECT-RE term ospf then accept\nset firewall family inet filter PROTECT-RE term icmp from protocol icmp\nset firewall family inet filter PROTECT-RE term icmp then accept\nset firewall family inet filter PROTECT-RE term deny-rest then count DROPPED\nset firewall family inet filter PROTECT-RE term deny-rest then discard\nset interfaces lo0 unit 0 family inet filter input PROTECT-RE\n```",
   "Aplicar este tipo de filtro es la forma clásica de quedarte sin acceso a un router remoto. Siempre haz commit con `commit confirmed` para que Junos haga rollback automáticamente si pierdes el acceso, y prueba desde tu host de gestión antes de confirmar. Después, revisa `show firewall filter PROTECT-RE` para ver los valores de los contadores y confirmar qué tráfico se está descartando. Recuerda que IPv6 necesita su propio filtro bajo `family inet6` si el router tiene direcciones IPv6."
  ],
  "terms": [
   [
    "lo0",
    "La interfaz loopback, que representa al propio dispositivo; un filtro en ella se aplica a todo el tráfico dirigido al host."
   ],
   [
    "Firewall filter term (término de filtro)",
    "Una regla dentro de un filtro, con condiciones de coincidencia `from` y acciones `then`, evaluada en orden."
   ],
   [
    "Implicit discard (descarte implícito)",
    "La acción final oculta de todo firewall filter de Junos que descarta los paquetes que no coinciden con ningún término."
   ],
   [
    "Prefix list",
    "Una lista de prefijos con nombre bajo `policy-options` que los filtros y las políticas pueden referenciar."
   ],
   [
    "commit confirmed",
    "Un commit que hace rollback automáticamente a menos que se confirme con otro commit dentro de un tiempo establecido."
   ]
  ],
  "example": "Una ingeniera aplica un filtro del RE que permite SSH e ICMP pero olvida OSPF. Usa `commit confirmed 5`. En menos de un minuto los vecinos OSPF caen porque los hellos no coinciden con ningún término y llegan al descarte implícito. Ella simplemente espera; después de cinco minutos Junos hace rollback, las adyacencias vuelven, y agrega el término OSPF que faltaba antes de intentarlo de nuevo.",
  "tip": "El filtro va en lo0 como filtro de entrada bajo la familia que quieres proteger (inet, inet6). Olvidar los protocolos de enrutamiento, u olvidar que hay un descarte implícito, es la trampa habitual.",
  "check": [
   [
    "¿Por qué aplicar el filtro de protección del RE a lo0 en lugar de a cada interfaz física?",
    "Porque un filtro de entrada en lo0 se aplica a todo el tráfico destinado al RE sin importar la interfaz de entrada, así que un solo filtro protege al RE en todas partes."
   ],
   [
    "¿Qué pasa con el tráfico dirigido al host que no coincide con ningún término?",
    "Se descarta por la acción final implícita de descarte del filtro."
   ],
   [
    "¿El filtro de lo0 afecta al tráfico de tránsito?",
    "No. Solo se aplica al tráfico destinado al Routing Engine; el tráfico de tránsito solo se filtra con los filtros de las interfaces que atraviesa."
   ]
  ]
 },
 {
  "t": "Boot sequence and storage: primary/backup media, snapshots",
  "tt": "Secuencia de arranque y almacenamiento: medios primario/de respaldo, snapshots",
  "body": [
   "Un dispositivo Junos arranca desde el almacenamiento igual que una PC, y conocer el orden te ayuda a recuperarte cuando algo sale mal, como un disco corrupto o una actualización fallida. El examen busca las ideas de medios de arranque primario y de respaldo y cómo te protegen los snapshots.",
   "La mayoría de los dispositivos Junos tienen más de un lugar desde donde pueden arrancar. Hay un dispositivo de arranque primario, normalmente flash interna o un SSD, y una o más alternativas, como un segundo disco interno, una segunda partición (en algunas plataformas llamada particionado dual-root) o un dispositivo USB. Al encender, el firmware del sistema y el boot loader prueban los dispositivos en un orden establecido. Normalmente se usa el dispositivo primario. Si falta o su software está corrupto, el dispositivo prueba los medios de respaldo. Cuando un dispositivo arranca desde medios de respaldo, Junos genera una alarma para que sepas que algo anda mal.",
   "Después de que el loader encuentra una imagen válida, arranca el kernel de Junos, luego init levanta los daemons, y mgd carga la configuración activa, guardada como `/config/juniper.conf.gz`. Las interfaces y los protocolos de enrutamiento se levantan a medida que dcd y rpd aplican sus partes de la configuración. Si el dispositivo no puede cargar la configuración, por ejemplo porque está dañada, puede levantarse usando la configuración de rescate (rescue configuration) si se guardó una.",
   "Un snapshot es una copia del software y la configuración actualmente en ejecución hacia otro dispositivo de almacenamiento o partición. Su propósito es asegurar que los medios de arranque de respaldo contengan un sistema en buen estado conocido. El comando es `request system snapshot`, con opciones que dependen de la plataforma; en plataformas de doble partición puedes usar `request system snapshot slice alternate` para copiar la partición en ejecución a la otra. Tomar un snapshot después de una actualización exitosa y verificada significa que si el medio primario falla más adelante, el dispositivo puede arrancar una imagen que funciona en lugar de una vieja o vacía. `show system snapshot` muestra qué contienen los medios de respaldo.",
   "Algunos comandos relacionados ayudan con el arranque y el almacenamiento. `show system storage` muestra el espacio libre en cada sistema de archivos; poco espacio puede hacer que fallen las actualizaciones, y `request system storage cleanup` elimina archivos de log y temporales antiguos. `request system configuration rescue save` guarda la configuración activa actual como configuración de rescate, que puedes volver a cargar más tarde con `rollback rescue` en modo de configuración. `request system reboot` y `request system halt` reinician o apagan el sistema de forma segura; en algunas plataformas también puedes elegir arrancar desde medios específicos con opciones del comando reboot.",
   "Un buen hábito operativo es: antes de una actualización, guarda una configuración de rescate y revisa el almacenamiento; después de verificar la actualización, toma un snapshot para que ambos medios de arranque coincidan."
  ],
  "terms": [
   [
    "Primary boot media (medio de arranque primario)",
    "El dispositivo de almacenamiento desde el que el sistema normalmente arranca Junos, típicamente flash interna o SSD."
   ],
   [
    "Backup boot media (medio de arranque de respaldo)",
    "Almacenamiento alternativo, como una segunda partición, disco o USB, que se usa cuando falla el primario."
   ],
   [
    "Snapshot",
    "Una copia del software y la configuración en ejecución hacia los medios de respaldo, hecha con `request system snapshot`."
   ],
   [
    "Rescue configuration (configuración de rescate)",
    "Una configuración guardada en buen estado conocido que puedes restaurar con `rollback rescue`."
   ],
   [
    "juniper.conf.gz",
    "El archivo comprimido en /config que contiene la configuración activa."
   ]
  ],
  "example": "La partición primaria de un firewall SRX de sucursal se corrompe después de un corte de energía. Al reiniciar, arranca desde la partición alternativa y genera una alarma. Como el administrador había ejecutado `request system snapshot slice alternate` después de la última actualización, la alternativa contiene la versión y la configuración actuales, y el sitio sigue en línea mientras se planifica un reemplazo.",
  "tip": "Los snapshots copian software y configuración a los medios de respaldo para arrancar; la configuración de rescate es solo un archivo de configuración. Mantén separadas las dos cosas en las respuestas del examen.",
  "check": [
   [
    "¿Qué hace un dispositivo si falla su medio de arranque primario?",
    "Prueba el medio de arranque de respaldo (alternativo) y, si arranca desde ahí, genera una alarma."
   ],
   [
    "¿Por qué tomar un snapshot después de una actualización exitosa?",
    "Para que el medio de respaldo contenga el mismo software y configuración en buen estado conocido, lo que permite un arranque limpio si falla el primario."
   ],
   [
    "¿Qué comando guarda la configuración actual como configuración de rescate?",
    "`request system configuration rescue save`."
   ]
  ]
 },
 {
  "t": "CLI modes: operational (`>`) and configuration (`#`); entering with `configure`, `configure private`, `configure exclusive`",
  "tt": "Modos del CLI: operacional (`>`) y de configuración (`#`); entrar con `configure`, `configure private`, `configure exclusive`",
  "body": [
   "El CLI de Junos tiene dos modos principales, y casi todo lo que haces empieza por saber en cuál estás. El modo operacional (operational mode) es para supervisar y gestionar el dispositivo: ver el estado, ejecutar pruebas, reiniciar procesos y actualizar el software. El modo de configuración (configuration mode) es para cambiar la configuración. El prompt te dice en cuál estás: `user@router>` significa modo operacional y `user@router#` significa modo de configuración.",
   "Cuando inicias sesión como usuario normal, llegas al modo operacional. (Si inicias sesión como root en la consola, empiezas en un prompt de shell Unix, `%`, y escribes `cli` para llegar al modo operacional.) Los comandos operacionales incluyen `show` (mostrar estado), `clear` (reiniciar contadores o tablas), `ping`, `traceroute`, `monitor` (ver logs o interfaces en vivo), `request` (acciones del sistema como reiniciar o instalar software), `restart` (reiniciar daemons) y `file` (gestionar archivos). También escribes `configure` aquí para entrar al modo de configuración.",
   "Hay tres formas comunes de entrar al modo de configuración, y se diferencian en cómo manejan a los demás usuarios. El `configure` simple abre la configuración candidata compartida. Todos los que están en modo configure simple editan la misma candidata, y cuando cualquiera hace commit, se confirman todos los cambios de esa candidata, incluidos los cambios sin terminar de otros usuarios. Junos te advierte cuando otros están editando, indicando quiénes son.",
   "`configure exclusive` bloquea la configuración candidata. Mientras tengas el bloqueo, los demás usuarios no pueden hacer commit de cambios, lo que evita sorpresas durante un cambio delicado. Si sales sin hacer commit, tus cambios no confirmados se descartan. Los demás usuarios pueden ver quién tiene el bloqueo.",
   "`configure private` te da tu propia copia privada de la configuración. Tus cambios se mantienen separados de los de otros usuarios hasta que haces commit, y cuando haces commit solo se aplican tus cambios, combinados con la configuración activa actual. Esta es la opción más segura cuando varias personas trabajan en el mismo dispositivo. No puedes entrar al modo private si la candidata compartida tiene cambios sin confirmar, y si sales del modo private sin hacer commit, tus cambios se pierden.",
   "```\nuser@r1> configure private\nwarning: uncommitted changes will be discarded on exit\nEntering configuration mode\n\n[edit]\nuser@r1#\n```",
   "El modo de configuración ofrece `set`, `delete`, `show`, `edit`, `commit`, `rollback` y más. Para salir, escribe `exit` en el nivel superior o `exit configuration-mode` desde cualquier lugar. Si tienes cambios sin confirmar, Junos pregunta si realmente quieres salir."
  ],
  "terms": [
   [
    "Operational mode (modo operacional)",
    "El modo del CLI, indicado por el prompt `>`, que se usa para supervisión, diagnóstico y acciones del sistema."
   ],
   [
    "Configuration mode (modo de configuración)",
    "El modo del CLI, indicado por el prompt `#`, que se usa para cambiar la configuración candidata."
   ],
   [
    "configure exclusive",
    "Entra al modo de configuración y bloquea la candidata para que ningún otro usuario pueda hacer commit."
   ],
   [
    "configure private",
    "Entra al modo de configuración con una candidata privada para que solo se confirmen tus cambios."
   ]
  ],
  "example": "Dos ingenieros necesitan cambiar el mismo router al mismo tiempo. Si ambos usan `configure` simple, el primero en hacer commit también enviaría las ediciones a medio terminar del otro. En cambio, cada uno usa `configure private`; cada uno confirma solo sus propios cambios, que se combinan con la configuración activa.",
  "tip": "Asocia la palabra clave con su efecto: exclusive deja fuera a los demás; private aísla tus cambios; configure simple comparte una candidata con todos.",
  "check": [
   [
    "¿Qué símbolo del prompt indica el modo de configuración?",
    "El numeral, `#`; el modo operacional usa `>`."
   ],
   [
    "¿Qué riesgo tiene el `configure` simple cuando varios usuarios editan a la vez?",
    "Un commit de cualquier usuario confirma todos los cambios de la candidata compartida, incluido el trabajo incompleto de otros usuarios."
   ],
   [
    "¿Qué evita `configure exclusive`?",
    "Bloquea la configuración para que los demás usuarios no puedan hacer commit de cambios mientras estás en modo exclusive."
   ]
  ]
 },
 {
  "t": "Navigating the hierarchy: `edit`, `up`, `top`, `exit`, `exit configuration-mode`; the `[edit ...]` banner",
  "tt": "Navegar por la jerarquía: `edit`, `up`, `top`, `exit`, `exit configuration-mode`; el banner `[edit ...]`",
  "body": [
   "La configuración de Junos es un árbol. En la parte superior hay sentencias como `system`, `interfaces`, `protocols`, `routing-options`, `firewall` y `policy-options`; cada una contiene más niveles, hasta llegar a los ajustes individuales. En modo de configuración puedes moverte por este árbol de forma muy parecida a como te mueves por carpetas en un sistema de archivos, lo que ahorra escritura y te ayuda a enfocarte en una parte de la configuración.",
   "El banner sobre el prompt muestra dónde estás. Cuando entras por primera vez al modo de configuración dice `[edit]`, que significa el nivel superior. Después de `edit protocols ospf area 0`, dice `[edit protocols ospf area 0.0.0.0]`. Cada comando que escribes es relativo a esa posición, así que `set interface ge-0/0/0.0` ahí agrega una interfaz al área 0 de OSPF sin volver a escribir la ruta. `show` en ese nivel muestra solo esa parte de la configuración.",
   "`edit` te baja a un nivel de la jerarquía, creándolo si todavía no existe. `up` sube un nivel; `up 2` sube dos niveles. `top` salta directamente a la parte superior de la jerarquía. También puedes anteponer `top` a un comando para ejecutarlo desde el nivel superior sin moverte, por ejemplo `top show interfaces` o `top edit system` mientras estás muy adentro de protocols.",
   "`exit` es sutil. Te devuelve al nivel en el que estabas antes de tu `edit` más reciente, no necesariamente un nivel arriba. Si estabas en `[edit]` y escribiste `edit protocols ospf area 0`, `exit` te lleva directamente de vuelta a `[edit]`. Cuando escribes `exit` en el nivel superior, sale del modo de configuración (pidiendo confirmación si hay cambios sin confirmar). `exit configuration-mode` sale del modo de configuración desde cualquier nivel en un solo paso.",
   "```\n[edit]\nuser@r1# edit protocols ospf area 0\n\n[edit protocols ospf area 0.0.0.0]\nuser@r1# set interface ge-0/0/0.0\n\n[edit protocols ospf area 0.0.0.0]\nuser@r1# up\n\n[edit protocols ospf]\nuser@r1# top\n\n[edit]\nuser@r1#\n```",
   "Observa que Junos mostró el área 0 como 0.0.0.0; normaliza los valores a su formato estándar. Usa la navegación para mantener ordenadas las sesiones de configuración: entra en la sección en la que estás trabajando, haz cambios con comandos `set` cortos y relativos, revísalos con `show` y luego vuelve al nivel superior para revisar con `show | compare` antes de hacer commit."
  ],
  "terms": [
   [
    "[edit] banner",
    "La línea sobre el prompt de configuración que muestra tu posición actual en la jerarquía."
   ],
   [
    "edit",
    "Te mueve a un nivel de la jerarquía de configuración (y lo crea si hace falta)."
   ],
   [
    "up",
    "Sube un nivel, o varios con un número, como `up 2`."
   ],
   [
    "top",
    "Te lleva a la parte superior de la jerarquía, o ejecuta un comando desde el nivel superior cuando se usa como prefijo."
   ],
   [
    "exit configuration-mode",
    "Sale del modo de configuración desde cualquier nivel de la jerarquía."
   ]
  ],
  "example": "Mientras configuras OSPF en `[edit protocols ospf area 0.0.0.0]`, quieres revisar la dirección en ge-0/0/0. En lugar de navegar hacia otro lado, escribes `top show interfaces ge-0/0/0` para verla, y luego sigues agregando interfaces al área 0 desde donde estás.",
  "tip": "`up` sube un nivel; `exit` vuelve a donde estabas antes del último `edit`, lo cual puede ser varios niveles arriba. En el nivel superior, `exit` sale del modo de configuración.",
  "check": [
   [
    "Estás en `[edit protocols ospf area 0.0.0.0]`. ¿Qué hace `up`?",
    "Te lleva a `[edit protocols ospf]`, un nivel arriba."
   ],
   [
    "¿Cómo puedes ver la configuración de interfaces sin salir de tu nivel de jerarquía actual?",
    "Usa `top show interfaces`, que ejecuta el comando desde el nivel superior mientras te quedas donde estás."
   ],
   [
    "¿Qué te indica el banner `[edit system login]`?",
    "Que estás en modo de configuración en el nivel system login, así que los comandos son relativos a esa posición."
   ]
  ]
 },
 {
  "t": "Command completion with Space and Tab; `?` for context help",
  "tt": "Completado de comandos con Espacio y Tab; `?` para ayuda contextual",
  "body": [
   "El CLI de Junos está diseñado para ayudarte a escribir menos y cometer menos errores. Completa los comandos por ti, lista lo que es válido en cada punto y te avisa de inmediato cuando algo está mal. Sentirte cómodo con estas funciones te hace más rápido en el laboratorio y te ayuda a descubrir comandos que todavía no conoces.",
   "La barra espaciadora completa nombres de comandos y palabras clave que vienen incorporados en Junos. Si escribes `sh` y presionas Espacio, el CLI lo expande a `show `. Si lo que escribiste es ambiguo, como `s` (que podría ser `set`, `show`, `ssh` y otros), el CLI lista las posibilidades. También puedes escribir abreviaturas no ambiguas y presionar Enter: `sh int ters` ejecuta `show interfaces terse`.",
   "La tecla Tab completa las mismas palabras clave, y además completa nombres que tú mismo definiste, como nombres de interfaces, nombres de firewall filters, nombres de políticas y nombres de usuario. Por ejemplo, después de `show firewall filter ` presionar Tab puede completar `PROTECT-RE`, y después de `show interfaces ge-` presionar Tab lista las interfaces gigabit presentes. Espacio no completa valores definidos por el usuario, un detalle que a veces evalúan las preguntas del examen.",
   "El signo de interrogación muestra ayuda sensible al contexto. Escribe `?` solo para listar todos los comandos disponibles en ese punto, con una breve descripción de cada uno. Escribe parte de una palabra seguida de `?`, como `show inter?`, para ver solo las opciones que coinciden. Escribe un comando completo seguido de un espacio y `?`, como `show interfaces ?`, para ver lo que puede venir a continuación, incluidas opciones y nombres de interfaces. En modo de configuración, `?` también lista las sentencias posibles en tu nivel de jerarquía actual, y después de un `set` muestra qué valores son válidos.",
   "El CLI también señala los errores con precisión. Si escribes mal una palabra clave, Junos imprime `syntax error` con un acento circunflejo (^) debajo del punto donde la entrada falló, lo que hace fácil encontrar los errores de tipeo. Cuando un comando tiene un argumento obligatorio que no diste, el CLI te dice que falta.",
   "Algunos atajos de teclado, basados en la edición estilo Emacs, completan el kit de herramientas: Ctrl+A va al inicio de la línea, Ctrl+E al final, Ctrl+W borra la palabra anterior, Ctrl+U borra toda la línea, y la flecha hacia arriba (o Ctrl+P) recupera comandos anteriores. También puedes ver los comandos recientes con `show cli history`."
  ],
  "terms": [
   [
    "Space completion (completado con Espacio)",
    "Presionar Espacio para completar comandos y palabras clave incorporados de Junos."
   ],
   [
    "Tab completion (completado con Tab)",
    "Presionar Tab para completar tanto palabras clave incorporadas como nombres definidos por el usuario, como filtros y políticas."
   ],
   [
    "Context-sensitive help (ayuda contextual)",
    "Usar `?` para listar los comandos, opciones o valores válidos en el punto actual."
   ],
   [
    "Syntax error caret (circunflejo de error de sintaxis)",
    "El marcador ^ que Junos imprime debajo de la parte de un comando que no pudo entender."
   ]
  ],
  "example": "No recuerdas el comando para ver las adyacencias OSPF. Escribes `show ospf ?` y ves una lista que incluye `neighbor`, `interface` y `database`. Eliges `show ospf neighbor`, y más tarde usas Tab después de `show firewall filter ` para completar el nombre largo del filtro que creó un colega.",
  "tip": "Espacio completa solo palabras clave incorporadas; Tab completa palabras clave incorporadas y nombres definidos por el usuario. Esa diferencia es una pregunta favorita del examen.",
  "check": [
   [
    "¿Qué tecla completa el nombre de un firewall filter que tú definiste?",
    "Tab. Espacio solo completa los comandos y palabras clave incorporados de Junos."
   ],
   [
    "¿Qué muestra escribir `show interfaces ?`?",
    "Las opciones y los nombres de interfaces que pueden seguir a `show interfaces`, cada uno con una breve descripción."
   ],
   [
    "¿Qué muestra Junos cuando escribes mal una palabra clave?",
    "Un mensaje `syntax error` con un acento circunflejo (^) que marca dónde falló la entrada."
   ]
  ]
 },
 {
  "t": "Help: `help topic`, `help reference`, `help apropos`",
  "tt": "Ayuda: `help topic`, `help reference`, `help apropos`",
  "body": [
   "Más allá de `?` para la ayuda contextual rápida, Junos incluye documentación directamente dentro del CLI. Esto es útil en laboratorios sin acceso a internet, en dispositivos de redes aisladas y durante las preguntas de escenario del examen donde necesitas reconocer qué hace cada comando de ayuda. Hay tres que debes conocer: `help topic`, `help reference` y `help apropos`.",
   "`help topic` muestra explicaciones conceptuales: qué es una función y cómo se usa. Por ejemplo, `help topic interfaces address` explica cómo se configuran las direcciones de interfaz, y `help topic ospf area` describe las áreas OSPF. El texto se lee como un extracto breve de una guía de usuario. Puedes ver qué temas existen escribiendo `help topic ?` y continuando con `?` en cada nivel.",
   "`help reference` muestra información de sintaxis y jerarquía de una sentencia de configuración: la sintaxis exacta de la sentencia, dónde vive en la jerarquía de configuración, sus opciones y sus valores por defecto. Por ejemplo, `help reference ospf area` muestra la sintaxis de la sentencia, los niveles de jerarquía bajo los que aparece y qué significa cada opción. Piénsalo como el manual de referencia de comandos incorporado en el CLI, mientras que `help topic` es la guía de conceptos.",
   "`help apropos` busca una palabra o cadena entre las sentencias de configuración disponibles en tu nivel de jerarquía actual y por debajo, y lista las sentencias que coinciden con sus rutas. Es la forma de encontrar un comando cuando sabes aproximadamente de qué se trata pero no cómo se llama. Por ejemplo, en el nivel `[edit system]`, `help apropos ntp` lista las sentencias relacionadas con NTP; en el nivel superior, `help apropos mtu` lista los lugares donde se puede configurar el MTU. Apropos busca sentencias de configuración, así que es más útil en modo de configuración.",
   "Vale la pena reconocer otros dos comandos de ayuda. `help syslog` seguido de una etiqueta de mensaje, como `help syslog UI_COMMIT`, explica qué significa un mensaje del log del sistema y sugiere acciones. `help tip cli` imprime un consejo aleatorio sobre el uso del CLI, una forma sencilla de aprender atajos.",
   "Una forma rápida de recordar los tres: topic te habla de un concepto, reference te da la sintaxis exacta de una sentencia y apropos te ayuda a encontrar una sentencia cuyo nombre no conoces."
  ],
  "terms": [
   [
    "help topic",
    "Muestra información conceptual, tipo guía de uso, sobre una función."
   ],
   [
    "help reference",
    "Muestra la sintaxis, la ubicación en la jerarquía, las opciones y los valores por defecto de una sentencia de configuración."
   ],
   [
    "help apropos",
    "Busca una cadena en las sentencias de configuración y lista las sentencias que coinciden con sus rutas."
   ],
   [
    "help syslog",
    "Explica el significado de una etiqueta de mensaje del log del sistema."
   ]
  ],
  "example": "En un laboratorio sin acceso a internet, necesitas limitar cuánto tiempo permanecen abiertas las sesiones de CLI inactivas, pero no conoces la sentencia. En `[edit system]` ejecutas `help apropos idle` y ves `login class ... idle-timeout`. Luego `help reference idle-timeout` muestra su sintaxis y unidades, y lo configuras.",
  "tip": "Asocia el verbo con la necesidad: para conceptos usa `help topic`, para la sintaxis exacta usa `help reference`, y para buscar una sentencia por palabra clave usa `help apropos`.",
  "check": [
   [
    "¿Qué comando de ayuda muestra la sintaxis de una sentencia y dónde vive en la jerarquía?",
    "`help reference`."
   ],
   [
    "Sabes que una función se relaciona con 'mtu' pero no el nombre de la sentencia. ¿Qué comando de ayuda la encuentra?",
    "`help apropos mtu`, que busca esa cadena en las sentencias de configuración."
   ],
   [
    "¿Qué tipo de información da `help topic`?",
    "Información conceptual tipo guía de uso que explica qué es una función y cómo se usa."
   ]
  ]
 },
 {
  "t": "Output filtering with pipes: `| match`, `| except`, `| find`, `| count`, `| no-more`, `| last`, `| save`",
  "tt": "Filtrado de salida con pipes: `| match`, `| except`, `| find`, `| count`, `| no-more`, `| last`, `| save`",
  "body": [
   "Muchos comandos de Junos producen salidas largas. La tabla de enrutamiento de un router de internet puede contener cientos de miles de rutas, y `show interfaces extensive` en un solo puerto llena varias pantallas. El símbolo pipe, `|`, te permite pasar la salida de un comando por un filtro para ver solo lo que necesitas. Funciona tanto en modo operacional como en modo de configuración, y puedes encadenar varios pipes.",
   "`| match` muestra solo las líneas que contienen un patrón. `show interfaces terse | match ge-` lista solo las líneas de gigabit Ethernet. El patrón es una expresión regular, y puedes buscar varias alternativas poniéndolas entre comillas y separándolas con una barra vertical: `show interfaces terse | match \"ge-0/0/0|ge-0/0/1\"`. `| except` es lo opuesto: oculta las líneas que contienen el patrón, así que `show interfaces terse | except down` oculta las interfaces que están caídas.",
   "`| find` empieza a mostrar desde la primera línea que coincide y muestra todo lo que sigue. Es práctico en configuraciones o logs largos: `show configuration | find protocols` salta directamente a la sección de protocols. `| count` cuenta las líneas de la salida en lugar de mostrarlas: `show route protocol bgp | count` da una idea rápida del volumen, y `show interfaces terse | match up | count` te dice cuántas líneas mencionan up.",
   "`| no-more` imprime toda la salida de una vez sin detenerse en cada pantalla con el prompt `---(more)---`. Es útil al capturar la salida en un log de terminal o al ejecutar comandos desde scripts. `| last` muestra solo las últimas líneas de la salida, y `| last 20` muestra las últimas 20, ideal para ver las entradas más recientes de un log como `show log messages | last 20`.",
   "`| save` escribe la salida en un archivo del dispositivo en lugar de mostrarla, o además de mostrarla: `show configuration | save /var/tmp/backup.conf` crea una copia en texto de la configuración que luego puedes copiar fuera del dispositivo. También existen opciones relacionadas, como `| display xml` para ver la salida en formato XML para automatización, `| trim` para quitar columnas desde la izquierda y `| hold` para mantener el prompt more al final.",
   "```\nuser@r1> show log messages | match SNMP | last 5\nuser@r1> show route | count\nuser@r1> show configuration | find interfaces | no-more\n```",
   "Los pipes se combinan de izquierda a derecha. En el primer ejemplo, el log se filtra a las líneas de SNMP y luego se muestran solo las últimas cinco coincidencias. Practicar algunas combinaciones es la forma más rápida de volverte eficiente en el CLI."
  ],
  "terms": [
   [
    "| match",
    "Muestra solo las líneas de salida que coinciden con un patrón (expresión regular)."
   ],
   [
    "| except",
    "Oculta las líneas de salida que coinciden con un patrón."
   ],
   [
    "| find",
    "Empieza a mostrar la salida desde la primera línea que coincide con un patrón."
   ],
   [
    "| count",
    "Cuenta las líneas de salida en lugar de mostrarlas."
   ],
   [
    "| save",
    "Escribe la salida de un comando en un archivo del dispositivo."
   ]
  ],
  "example": "Durante una llamada por una caída necesitas saber qué interfaces están caídas. Ejecutas `show interfaces terse | match down | except \".32768|.16386\"` para listar las interfaces caídas ocultando las unidades internas, y luego `show log messages | match SNMP_TRAP_LINK_DOWN | last 10` para ver cuándo se cayeron.",
  "tip": "`find` empieza en la primera coincidencia y sigue imprimiendo todo lo que viene después; `match` imprime solo las líneas que coinciden. Las preguntas a menudo los contrastan.",
  "check": [
   [
    "¿Qué opción de pipe muestra solo las líneas que contienen 'inet'?",
    "`| match inet`."
   ],
   [
    "¿Cómo verías solo las últimas 10 líneas del log messages?",
    "`show log messages | last 10`."
   ],
   [
    "¿Qué hace `| no-more`?",
    "Muestra toda la salida de una vez, sin pausar en cada pantalla con el prompt more."
   ]
  ]
 },
 {
  "t": "`| display set`, `| compare`, `| display inheritance`",
  "tt": "`| display set`, `| compare`, `| display inheritance`",
  "body": [
   "Algunas opciones de pipe hacen más que filtrar líneas: cambian cómo se muestra la configuración. Tres que usarás constantemente son `| display set`, `| compare` y `| display inheritance`. Cada una responde una pregunta distinta: qué comandos construirían esto, qué cambié y de dónde viene realmente este ajuste.",
   "Por defecto, Junos muestra la configuración en un formato jerárquico con llaves y sangría, que es fácil de leer como estructura. `| display set` muestra la misma configuración como la lista plana de comandos `set` que la recrearían. Por ejemplo, `show configuration interfaces | display set` podría imprimir `set interfaces ge-0/0/0 unit 0 family inet address 10.0.12.1/30`. El formato set es ideal para copiar configuración entre dispositivos, documentar cambios y buscar con `| match`, porque cada línea lleva su ruta completa. Puedes pegar comandos set directamente en el modo de configuración.",
   "`| compare` muestra la diferencia entre dos configuraciones. En modo de configuración, `show | compare` compara tu configuración candidata con la configuración activa (confirmada), y es el comando que debes ejecutar antes de cada commit. Las líneas que empiezan con `+` se agregarán, las líneas que empiezan con `-` se eliminarán, y los encabezados entre corchetes muestran en qué parte de la jerarquía está cada cambio. También puedes comparar con commits anteriores: `show | compare rollback 3` compara la candidata con la configuración de tres commits atrás, y en modo operacional `show configuration | compare rollback 1` muestra qué cambió el último commit.",
   "```\n[edit]\nuser@r1# show | compare\n[edit system]\n-  host-name r1-old;\n+  host-name r1;\n[edit interfaces ge-0/0/1 unit 0 family inet]\n+       address 10.0.13.1/30;\n```",
   "`| display inheritance` tiene que ver con los grupos de configuración. Junos te permite definir bloques reutilizables de configuración bajo `[edit groups]` y aplicarlos con `apply-groups`, por ejemplo un grupo que establece los mismos servidores syslog y NTP en cada router, o uno que aplica un MTU a todas las interfaces que coinciden con un comodín como `<ge-*>`. Como los ajustes heredados no se muestran en la salida normal de `show`, puede ser difícil saber qué está configurado realmente. Agregar `| display inheritance` muestra la configuración con los valores heredados incluidos y los marca con comentarios que nombran el grupo del que vienen. Agregar `| display inheritance no-comments` los muestra sin la anotación.",
   "Combinarlos es común. `show configuration | display inheritance | display set | match mtu` responde 'dónde está cada ajuste de MTU, incluidos los que vienen de grupos?' en una sola línea."
  ],
  "terms": [
   [
    "| display set",
    "Muestra la configuración como la lista de comandos `set` que la recrearían."
   ],
   [
    "| compare",
    "Muestra las diferencias entre la configuración candidata y la activa, o contra un rollback, usando marcadores + y -."
   ],
   [
    "| display inheritance",
    "Muestra la configuración con los valores heredados de los grupos de configuración incluidos y anotados."
   ],
   [
    "Configuration group (grupo de configuración)",
    "Un bloque reutilizable de configuración bajo `[edit groups]` que se aplica en otros lugares con `apply-groups`."
   ]
  ],
  "example": "Antes de un cambio de mantenimiento ejecutas `show | compare` y notas una línea inesperada `- protocols ospf area 0.0.0.0 interface ge-0/0/2.0` que un colega dejó en la candidata compartida. La quitas de tu plan de commit, evitando una caída, y después usas `show configuration | display set | save /var/tmp/after.set` para documentar el cambio.",
  "tip": "En modo de configuración, `show | compare` compara la candidata contra la activa. Agregar `rollback n` compara contra un commit más antiguo. Los ajustes heredados de grupos permanecen ocultos a menos que uses `| display inheritance`.",
  "check": [
   [
    "¿Qué significa una línea que empieza con `+` en la salida de `show | compare`?",
    "Que la línea existe en la candidata pero no en la configuración activa, así que el commit la agregará."
   ],
   [
    "¿Por qué `| display set` es útil para copiar configuración entre routers?",
    "Porque produce comandos set completos con sus rutas enteras, que se pueden pegar directamente en el modo de configuración de otro dispositivo."
   ],
   [
    "¿Cómo ves los ajustes que un router hereda de una sentencia apply-groups?",
    "Agrega `| display inheritance` al comando show; los valores heredados aparecen con comentarios que nombran el grupo de origen."
   ]
  ]
 },
 {
  "t": "Running operational commands from configuration mode with `run`",
  "tt": "Ejecutar comandos operacionales desde el modo de configuración con `run`",
  "body": [
   "Cuando estás en medio de configurar algo, a menudo necesitas revisar el estado del dispositivo: ¿está levantada la interfaz?, ¿apareció la ruta?, ¿cuál es la dirección del vecino? Los comandos operacionales como `show interfaces` o `ping` no están disponibles directamente en el modo de configuración, porque en el modo de configuración `show` muestra la configuración, no el estado. El comando `run` resuelve esto: ejecuta cualquier comando del modo operacional sin salir del modo de configuración.",
   "El uso es simple: pon `run` delante del comando operacional. `run show interfaces terse` muestra el estado de las interfaces. `run ping 10.0.12.2 count 3` prueba la alcanzabilidad. `run show route 10.1.1.0/24` revisa la tabla de enrutamiento. `run show ospf neighbor` revisa las adyacencias. El completado de comandos y `?` funcionan después de `run` igual que en el modo operacional, y los pipes también, por ejemplo `run show log messages | last 10`.",
   "Vale la pena entender claramente la diferencia entre `show` y `run show`, porque es fácil confundirlos y los exámenes lo evalúan. En modo de configuración, `show interfaces` muestra la sección de interfaces de la configuración candidata: lo que configuraste, incluidos los cambios sin confirmar. `run show interfaces` muestra el estado operacional de las interfaces: si están levantadas, sus contadores y las direcciones actualmente en uso. Uno te dice lo que pediste; el otro te dice lo que el dispositivo está haciendo realmente.",
   "Usar `run` mantiene intacta tu sesión de configuración. Te quedas en el mismo nivel de la jerarquía, tus cambios sin confirmar permanecen en la candidata, y evitas el ir y venir de salir, revisar y volver a entrar. Esto es especialmente útil en los modos `configure exclusive` o `configure private`, donde salir podría descartar el trabajo sin confirmar.",
   "Un flujo de trabajo típico se ve así: haces un cambio, `commit`, y luego `run show ...` para confirmar el efecto, todo sin salir del modo de configuración. Si usaste `commit confirmed`, puedes verificar con `run` y luego escribir `commit` de nuevo para confirmar.",
   "```\n[edit interfaces ge-0/0/1]\nuser@r1# set unit 0 family inet address 10.0.13.1/30\nuser@r1# commit\ncommit complete\nuser@r1# run show interfaces ge-0/0/1 terse\nInterface      Admin Link Proto  Local\nge-0/0/1       up    up\nge-0/0/1.0     up    up   inet   10.0.13.1/30\n```"
  ],
  "terms": [
   [
    "run",
    "Un comando del modo de configuración que ejecuta un comando del modo operacional sin salir del modo de configuración."
   ],
   [
    "show (modo de configuración)",
    "Muestra la configuración candidata en el nivel de jerarquía actual o por debajo."
   ],
   [
    "run show",
    "Muestra el estado operacional desde dentro del modo de configuración."
   ],
   [
    "Operational state (estado operacional)",
    "Lo que el dispositivo está haciendo realmente en este momento, como el estado de las interfaces, las rutas y los vecinos."
   ]
  ],
  "example": "Mientras configuras OSPF en `[edit protocols ospf area 0.0.0.0]`, haces commit y luego escribes `run show ospf neighbor` para ver si la adyacencia llegó al estado Full. Muestra Init, así que escribes `run show interfaces ge-0/0/0 terse` y descubres que la dirección hacia el vecino está en la subred equivocada, todo sin salir de tu lugar en la jerarquía.",
  "tip": "En modo de configuración, `show` significa configuración y `run show` significa estado en vivo. Si una pregunta pide cómo hacer ping desde el modo de configuración, la respuesta incluye `run`.",
  "check": [
   [
    "¿Cómo haces ping a 10.1.1.1 sin salir del modo de configuración?",
    "Escribe `run ping 10.1.1.1`."
   ],
   [
    "En modo de configuración, ¿cuál es la diferencia entre `show interfaces` y `run show interfaces`?",
    "`show interfaces` muestra las sentencias de interfaz configuradas (candidata); `run show interfaces` muestra el estado operacional en vivo de las interfaces."
   ],
   [
    "¿Sobreviven los cambios sin confirmar al usar `run`?",
    "Sí. Te quedas en el modo de configuración en el mismo nivel, y la configuración candidata no se toca."
   ]
  ]
 },
 {
  "t": "Active vs candidate configuration",
  "tt": "Configuración activa vs configuración candidata",
  "body": [
   "Junos nunca cambia el dispositivo en funcionamiento en el momento en que escribes un comando de configuración. En cambio, mantiene dos configuraciones: la configuración activa, que es la que el dispositivo está ejecutando realmente, y la configuración candidata, una copia de trabajo que editas. Solo cuando haces commit la candidata se convierte en la nueva configuración activa. Este modelo es una de las ideas más importantes de Junos y hace que los cambios sean más seguros y más fáciles de deshacer.",
   "Cuando entras al modo de configuración, Junos te da una candidata que empieza como una copia de la configuración activa (en modo private obtienes tu propia copia). Cada `set`, `delete`, `rename` o `copy` cambia solo la candidata. Nada en el dispositivo cambia todavía: las interfaces no se mueven, las rutas no cambian, no se agregan usuarios. Puedes hacer muchos cambios relacionados y revisarlos juntos con `show | compare` antes de que cualquiera surta efecto.",
   "Cuando escribes `commit`, Junos revisa toda la candidata en busca de errores de sintaxis y consistencia. Por ejemplo, se negará a hacer commit de una referencia a un firewall filter que apunta a un filtro que no existe. Si la revisión pasa, la candidata se convierte en la configuración activa y los daemons aplican los cambios. Si falla, no se activa nada y recibes mensajes de error para corregir.",
   "Cada commit se guarda. La configuración recién activada es rollback 0, la anterior pasa a ser rollback 1, y así sucesivamente. Junos guarda la configuración actual más hasta 49 anteriores, 50 en total. La configuración activa se guarda como `/config/juniper.conf.gz`, los rollbacks más recientes están junto a ella en `/config`, y los más antiguos en `/var/db/config`. Puedes ver el historial con `show system commit`, que lista la hora, el usuario, el método y el comentario de cada commit.",
   "El comando rollback trabaja sobre la candidata. `rollback 0` en modo de configuración descarta todos los cambios sin confirmar, restableciendo la candidata para que coincida con la configuración activa. `rollback 1` carga el commit anterior en la candidata; el dispositivo no cambia hasta que vuelves a hacer `commit`. Este diseño en dos pasos te permite revisar con `show | compare` exactamente lo que haría un rollback antes de aplicarlo. En modo operacional puedes ver versiones antiguas con `show system rollback 3` o `show configuration | compare rollback 3`.",
   "Las dos vistas se muestran con comandos diferentes. En modo operacional, `show configuration` muestra la configuración activa. En modo de configuración, `show` muestra la candidata, incluidos los cambios sin confirmar. Cuando difieren, `show | compare` es el puente entre ellas."
  ],
  "terms": [
   [
    "Active configuration (configuración activa)",
    "La configuración confirmada que el dispositivo está ejecutando actualmente."
   ],
   [
    "Candidate configuration (configuración candidata)",
    "La copia editable de la configuración; los cambios surten efecto solo después del commit."
   ],
   [
    "Rollback",
    "Cargar una configuración confirmada anteriormente (0 a 49) en la candidata; luego hay que hacer commit."
   ],
   [
    "rollback 0",
    "Descarta los cambios sin confirmar restableciendo la candidata a la configuración activa."
   ],
   [
    "show system commit",
    "Lista el historial de commits con la hora, el usuario y los comentarios."
   ]
  ],
  "example": "Una ingeniera cambia los costos de OSPF, hace commit, y el tráfico se desplaza mal. Entra al modo de configuración, ejecuta `rollback 1`, revisa `show | compare` para confirmar que revierte solo el cambio de costos, y luego hace commit. El comportamiento anterior vuelve en segundos, y `show system commit` muestra ambos commits para el registro del cambio.",
  "tip": "Rollback solo cambia la candidata. Nada en el dispositivo cambia hasta que haces commit de la candidata restaurada.",
  "check": [
   [
    "¿Qué comando descarta todos los cambios de configuración sin confirmar?",
    "`rollback 0` en modo de configuración, que restablece la candidata a la configuración activa."
   ],
   [
    "¿Cuántas configuraciones confirmadas puede guardar Junos para rollback?",
    "50 en total: la actual (rollback 0) más 49 anteriores (rollback 1 a 49)."
   ],
   [
    "En modo operacional, ¿qué comando muestra la configuración activa?",
    "`show configuration`."
   ]
  ]
 },
 {
  "t": "J-Web GUI and enabling it with `system services web-management`",
  "tt": "La GUI J-Web y cómo habilitarla con `system services web-management`",
  "body": [
   "No todos quieren gestionar los dispositivos desde una línea de comandos. J-Web es la interfaz gráfica basada en web incorporada en muchos dispositivos Junos, en particular los firewalls SRX y los switches EX. Te permite supervisar el dispositivo, configurar funciones comunes mediante formularios y asistentes, y ver y confirmar cambios de configuración desde un navegador.",
   "J-Web corre en el propio dispositivo, así que solo apuntas un navegador a una de las direcciones IP del dispositivo. Usa la misma base de datos de configuración que el CLI. Los cambios que haces en J-Web van a una configuración candidata y deben confirmarse con commit, y aparecen en `show system commit` como cualquier otro commit. Eso significa que puedes combinar el CLI y J-Web libremente, y el historial de rollback cubre ambos. J-Web normalmente incluye un dashboard con el estado del sistema y de las interfaces, páginas de monitoreo para enrutamiento, seguridad y logs, páginas de configuración, un editor de configuración de apuntar y hacer clic, y herramientas como ping y traceroute.",
   "J-Web se habilita con el servicio `web-management` bajo `[edit system services]`. Eliges HTTP, HTTPS o ambos. HTTP no está cifrado, así que las credenciales y la configuración cruzan la red en texto claro; se prefiere HTTPS. Para HTTPS necesitas un certificado; la opción más simple es dejar que el dispositivo genere uno autofirmado. También puedes restringir qué interfaces aceptan conexiones J-Web.",
   "```\nset system services web-management https system-generated-certificate\nset system services web-management https interface ge-0/0/0.0\n```",
   "Después de hacer commit, abre una sesión HTTPS a la dirección del dispositivo en un navegador e inicia sesión con una cuenta de usuario de Junos. Tus permisos en J-Web siguen tu clase de login, así que un usuario de solo lectura puede ver pero no cambiar la configuración. En algunos modelos SRX de sucursal, J-Web está habilitado en la configuración de fábrica para que puedas hacer la configuración inicial desde un navegador. Algunas plataformas y versiones entregan J-Web como un paquete separado que debes instalar antes de poder usarlo, así que revisa la documentación de tu modelo.",
   "Desde el punto de vista de la seguridad, trata J-Web como cualquier servicio de gestión. Habilita solo HTTPS cuando sea posible, limítalo a las interfaces de gestión o a redes de confianza, y permítelo en tu firewall filter de la loopback solo desde los hosts de gestión. Si no lo usas, déjalo deshabilitado para reducir la superficie de ataque del dispositivo."
  ],
  "terms": [
   [
    "J-Web",
    "La interfaz gráfica basada en web para gestionar muchos dispositivos Junos."
   ],
   [
    "web-management",
    "La sentencia de `[edit system services]` que habilita J-Web por HTTP y/o HTTPS."
   ],
   [
    "system-generated-certificate",
    "Una opción que permite que Junos cree un certificado autofirmado para el acceso HTTPS a J-Web."
   ],
   [
    "Login class (clase de login)",
    "El conjunto de permisos asignados a un usuario, que se aplica en J-Web igual que en el CLI."
   ]
  ],
  "example": "Una oficina pequeña recibe un firewall SRX nuevo. El administrador conecta una laptop, navega a la dirección por defecto y usa el asistente de configuración de J-Web para establecer una contraseña de root y las direcciones. Más tarde, desde el CLI, ejecuta `show system commit` y ve los commits de J-Web listados junto a sus cambios hechos por CLI.",
  "tip": "La sentencia es `set system services web-management` con `http` o `https`. Los cambios de J-Web usan el mismo modelo de candidata, commit y rollback que el CLI.",
  "check": [
   [
    "¿Qué jerarquía de configuración habilita J-Web?",
    "`[edit system services web-management]`, con `http` y/o `https`."
   ],
   [
    "¿Por qué preferir HTTPS sobre HTTP para J-Web?",
    "HTTP envía las credenciales y la configuración sin cifrar; HTTPS cifra la sesión."
   ],
   [
    "¿Los cambios de J-Web surten efecto de inmediato?",
    "No. Igual que en el CLI, van a una configuración candidata y surten efecto cuando se confirman con commit."
   ]
  ]
 },
 {
  "t": "Remote access: SSH, console, out-of-band management interface (fxp0/em0/me0)",
  "tt": "Acceso remoto: SSH, consola, interfaz de gestión fuera de banda (fxp0/em0/me0)",
  "body": [
   "Puedes llegar a un dispositivo Junos de varias formas, y los buenos diseños usan más de una para que igual puedas entrar cuando algo se rompe. Los métodos principales son el puerto de consola, SSH por la red y una interfaz de gestión fuera de banda (out-of-band) dedicada.",
   "El puerto de consola es una conexión serial directa al Routing Engine. Funciona incluso cuando no existe ninguna configuración de red, lo que lo convierte en el método para la configuración inicial, la recuperación de contraseñas y el diagnóstico cuando el dispositivo no es alcanzable por la red. Te conectas con un cable de consola y un software de terminal; los ajustes por defecto habituales son 9600 baudios, 8 bits de datos, sin paridad y 1 bit de parada. En un dispositivo nuevo la única cuenta es root, que inicia sesión sin contraseña en la consola y llega al shell Unix, donde escribes `cli`.",
   "SSH (Secure Shell) es la forma estándar de gestionar Junos de forma remota. Cifra toda la sesión, incluidas las contraseñas, y corre sobre el puerto TCP 22. Lo habilitas con `set system services ssh`. Es buena práctica impedir que la cuenta root inicie sesión por SSH, con `set system services ssh root-login deny`, para que los administradores inicien sesión con sus propias cuentas con nombre y sean auditados individualmente. Telnet también existe pero envía todo en texto claro, así que evita habilitarlo. Protege SSH aún más con tu filtro de lo0, permitiéndolo solo desde las redes de gestión.",
   "La gestión fuera de banda significa gestionar un dispositivo por un camino de red separado del tráfico que reenvía. Muchos dispositivos Junos tienen un puerto Ethernet de gestión dedicado conectado directamente al Routing Engine y no al PFE. Su nombre depende de la plataforma: fxp0 en muchos routers y firewalls SRX, me0 en los switches EX, y em0 en algunas otras plataformas, incluidos varios modelos QFX. Lo configuras como cualquier interfaz, por ejemplo `set interfaces fxp0 unit 0 family inet address 192.168.100.11/24`.",
   "Como este puerto se conecta al RE, no reenvía tráfico de tránsito entre sí mismo y los puertos de producción. Eso lo hace útil para la gestión incluso cuando la red de producción está caída, y mantiene el tráfico de gestión fuera del plano de datos. También significa que normalmente necesitas una ruta para la red de gestión. Las opciones incluyen una ruta estática, una sentencia `backup-router` que funciona cuando rpd no está corriendo, o colocar la interfaz de gestión en una instancia de enrutamiento de gestión dedicada en las plataformas que la soportan, lo que mantiene las rutas de gestión fuera de la tabla principal.",
   "Una configuración resiliente combina las tres: acceso por consola a través de un servidor de terminales para emergencias, una red de gestión fuera de banda que llega a fxp0, me0 o em0, y SSH con cuentas con nombre para el trabajo diario."
  ],
  "terms": [
   [
    "Console port (puerto de consola)",
    "Un puerto serial conectado directamente al RE, utilizable sin ninguna configuración de red."
   ],
   [
    "SSH",
    "Secure Shell: acceso remoto cifrado al CLI por el puerto TCP 22, habilitado con `set system services ssh`."
   ],
   [
    "Out-of-band management (gestión fuera de banda)",
    "Gestionar un dispositivo por un camino de red separado del tráfico que reenvía."
   ],
   [
    "fxp0 / me0 / em0",
    "Nombres específicos de cada plataforma para la interfaz Ethernet de gestión dedicada conectada al RE."
   ],
   [
    "root-login deny",
    "Opción de SSH que impide que la cuenta root inicie sesión por SSH."
   ]
  ],
  "example": "Un bucle de enrutamiento tumba la red de producción de un sitio. La ingeniera no puede llegar a la loopback del router por la WAN, pero puede hacer SSH a su dirección fxp0 por la red de gestión separada, encontrar la ruta estática errónea y corregirla. Si la red de gestión también hubiera fallado, un servidor de consola habría sido el último recurso.",
  "tip": "Conoce qué nombre de interfaz de gestión va con qué familia de plataformas y recuerda que se conecta al RE, no al PFE, así que no enruta tráfico de tránsito.",
  "check": [
   [
    "¿Por qué el puerto de consola es útil incluso cuando la red está caída?",
    "Es una conexión serial directa al Routing Engine que no necesita configuración de red."
   ],
   [
    "¿Qué sentencia habilita SSH en un dispositivo Junos?",
    "`set system services ssh`."
   ],
   [
    "¿fxp0 reenvía tráfico de tránsito hacia otras interfaces?",
    "No. Se conecta al Routing Engine solo para gestión y no forma parte del plano de reenvío."
   ]
  ]
 },
 {
  "t": "Factory-default configuration and the root-password requirement before the first commit",
  "tt": "Configuración de fábrica y el requisito de contraseña de root antes del primer commit",
  "body": [
   "Todo dispositivo Junos viene con una configuración de fábrica (factory-default): un conjunto mínimo de sentencias que permite que el dispositivo arranque y, en algunas plataformas, haga algo útil de inmediato. Saber qué contiene y qué le falta explica lo primero con lo que te toparás en un equipo nuevo: Junos no te dejará hacer commit de nada hasta que establezcas una contraseña de root.",
   "El contenido de la configuración de fábrica varía según la plataforma. Los routers como MX tienden a tener una configuración por defecto muy pequeña: ajustes de system logging y poco más, con las interfaces sin configurar. Los switches EX normalmente ponen sus puertos en conmutación Ethernet en la VLAN por defecto para que funcionen como un switch simple desde el primer momento. Los firewalls SRX de sucursal suelen incluir zonas de seguridad, una política básica que permite el tráfico de trust a untrust, NAT de origen, un servidor DHCP en el lado interno y un cliente DHCP en el lado externo, para que una oficina pequeña pueda conectar y empezar a trabajar. Sea cual sea la plataforma, la configuración de fábrica no tiene contraseña de root.",
   "Esa contraseña faltante es intencional. La primera vez que inicias sesión como root en la consola, no se pide contraseña. Pero cuando intentas hacer commit de cualquier cambio, Junos busca una sentencia de autenticación de root, y si no la hay el commit falla con un error que dice que falta la sentencia `root-authentication`. Debes establecer una antes de que cualquier otro cambio pueda surtir efecto. Esto impide que un dispositivo se despliegue en una red con una cuenta root abierta.",
   "```\n[edit]\nroot# set system host-name lab-r1\nroot# commit\n[edit]\n  'system'\n    Missing mandatory statement: 'root-authentication'\nerror: configuration check-out failed\nroot# set system root-authentication plain-text-password\nNew password:\nRetype new password:\nroot# commit\ncommit complete\n```",
   "Con `plain-text-password`, Junos pide la contraseña dos veces y la guarda como un hash, así que la configuración muestra una cadena `encrypted-password` en lugar de tu contraseña real. También puedes proporcionar un hash existente con `encrypted-password` o una clave pública SSH con `ssh-rsa` o `ssh-ed25519`, según lo que soporte tu versión.",
   "Puedes devolver un dispositivo a su configuración de fábrica en cualquier momento. En modo de configuración, `load factory-default` reemplaza la candidata con la configuración de fábrica; luego debes establecer de nuevo la contraseña de root antes de poder hacer commit. En modo operacional, `request system zeroize` va más allá, borrando toda la configuración y los datos de log y devolviendo el dispositivo al estado de fábrica, lo que es apropiado antes de devolver o desechar hardware. Muchos dispositivos también tienen un botón de reset que restaura los valores por defecto.",
   "La conclusión es simple: en un dispositivo nuevo o restablecido, la primerísima configuración que confirmes debe incluir una contraseña de root."
  ],
  "terms": [
   [
    "Factory-default configuration (configuración de fábrica)",
    "La configuración específica de cada plataforma con la que viene un dispositivo Junos y a la que vuelve después de un reset."
   ],
   [
    "root-authentication",
    "La sentencia obligatoria de `[edit system]` que establece la contraseña o la clave de la cuenta root."
   ],
   [
    "plain-text-password",
    "Una opción que pide una contraseña y la guarda en forma de hash en la configuración."
   ],
   [
    "load factory-default",
    "Un comando del modo de configuración que reemplaza la candidata con la configuración de fábrica."
   ],
   [
    "request system zeroize",
    "Un comando operacional que borra la configuración y los datos y devuelve el dispositivo al estado de fábrica."
   ]
  ],
  "example": "Sacas de la caja un vSRX en tu laboratorio, inicias sesión como root en la consola, escribes `cli` y `configure`, estableces un nombre de host y haces commit. El commit falla con 'Missing mandatory statement: root-authentication'. Agregas `set system root-authentication plain-text-password`, ingresas una contraseña fuerte dos veces, haces commit de nuevo y funciona.",
  "tip": "Después de `load factory-default` la contraseña de root desaparece de la candidata, así que debes establecerla de nuevo antes de hacer commit. Las preguntas a menudo describen este commit fallido y preguntan por qué.",
  "check": [
   [
    "¿Por qué falla el primer commit en un dispositivo Junos nuevo?",
    "Porque la configuración de fábrica no tiene contraseña de root, y Junos requiere `system root-authentication` antes de que cualquier commit tenga éxito."
   ],
   [
    "¿Cómo se guarda una contraseña ingresada con `plain-text-password`?",
    "Junos la convierte en hash y la guarda como `encrypted-password` en la configuración."
   ],
   [
    "¿Cuál es la diferencia entre `load factory-default` y `request system zeroize`?",
    "`load factory-default` reemplaza solo la configuración candidata (de la que luego haces commit); `request system zeroize` borra la configuración y los datos y restablece todo el dispositivo."
   ]
  ]
 },
 {
  "t": "Initial configuration: host name, root authentication, users and login classes, management interface, static default route",
  "tt": "Configuración inicial: nombre de host, autenticación de root, usuarios y clases de login, interfaz de gestión, ruta estática por defecto",
  "body": [
   "Una vez que un dispositivo arranca con su configuración de fábrica, un puñado de ajustes lo vuelven identificable, seguro y alcanzable. Casi todos los dispositivos Junos que despliegues recibirán el mismo conjunto inicial: un nombre de host, una contraseña de root, cuentas de usuario con nombre y clases de login apropiadas, una dirección en la interfaz de gestión y una ruta para que el tráfico de gestión pueda volver. Estas también son las primeras tareas de la mayoría de los laboratorios JNCIA.",
   "El nombre de host identifica al dispositivo en el prompt, los logs y SNMP. `set system host-name r1` cambia el prompt a `user@r1`. La autenticación de root, `set system root-authentication plain-text-password`, es obligatoria antes del primer commit, como explicó la lección anterior.",
   "Las cuentas de usuario con nombre son mejores que compartir root, porque cada persona rinde cuentas y recibe solo los derechos que necesita. Cada cuenta tiene una clase de login (login class) que define los permisos. Junos incluye cuatro clases predefinidas: `super-user` (todos los permisos), `operator` (puede ver y realizar acciones como borrar contadores y reiniciar, pero no cambiar la configuración), `read-only` (solo puede ver) y `unauthorized` (sin permisos). También puedes crear clases personalizadas bajo `[edit system login class]` con flags de permisos específicos, comandos permitidos o denegados, y ajustes como `idle-timeout`.",
   "```\nset system host-name r1\nset system root-authentication plain-text-password\nset system login user alice class super-user authentication plain-text-password\nset system login user noc class read-only authentication plain-text-password\nset interfaces fxp0 unit 0 family inet address 192.168.100.11/24\nset routing-options static route 0.0.0.0/0 next-hop 192.168.100.1\nset system services ssh root-login deny\n```",
   "La dirección de la interfaz de gestión hace que el dispositivo sea alcanzable por SSH. Usa fxp0, me0 o em0 según la plataforma, o una interfaz normal si no hay un puerto fuera de banda. Una ruta estática proporciona el camino de regreso a las estaciones de trabajo de gestión. Una ruta estática por defecto, `0.0.0.0/0`, es la ruta comodín que se usa cuando ninguna ruta más específica coincide. Aparece en `show route` con el protocolo Static y una preferencia de 5.",
   "Una advertencia: una ruta por defecto que apunta por la interfaz de gestión está bien en un laboratorio pequeño, pero en un router de producción atraería el tráfico de tránsito hacia un puerto que no puede reenviarlo. En producción, prefiere una ruta estática específica para las subredes de gestión, la sentencia `backup-router` o una instancia de enrutamiento de gestión dedicada donde la plataforma la soporte. Considera también agregar `set system name-server`, `set system ntp server` y `set system time-zone`, ya que la hora correcta y el DNS facilitan mucho los logs y el diagnóstico.",
   "Después de hacer commit, verifica: `show system users` muestra quién está conectado, `show interfaces terse fxp0` confirma la dirección y `show route 0.0.0.0/0 exact` confirma que la ruta por defecto está activa."
  ],
  "terms": [
   [
    "host-name",
    "La sentencia de `[edit system]` que da nombre al dispositivo, mostrado en el prompt y en los logs."
   ],
   [
    "Login class (clase de login)",
    "Un conjunto de permisos asignado a cuentas de usuario; las clases predefinidas son super-user, operator, read-only y unauthorized."
   ],
   [
    "super-user",
    "Clase de login predefinida con todos los permisos."
   ],
   [
    "Static default route (ruta estática por defecto)",
    "Una ruta 0.0.0.0/0 configurada manualmente que se usa cuando ninguna ruta más específica coincide."
   ],
   [
    "next-hop",
    "La dirección del router vecino al que una ruta estática envía el tráfico que coincide."
   ]
  ],
  "example": "Para un router de laboratorio nuevo estableces el nombre de host r1, una contraseña de root, una cuenta super-user para ti y una cuenta read-only para un colega, asignas a fxp0 la dirección 192.168.100.11/24 y agregas una ruta estática a la red del jump host vía 192.168.100.1. Tu colega inicia sesión como noc, puede ejecutar comandos `show`, pero recibe un error de permisos al intentar `configure`.",
  "tip": "Conoce las cuatro clases de login predefinidas y lo que permite cada una: super-user todo, operator ver más acciones operacionales, read-only solo ver, unauthorized nada.",
  "check": [
   [
    "¿Qué clase de login predefinida permite a un usuario ver el estado pero no cambiar la configuración ni borrar contadores?",
    "read-only."
   ],
   [
    "Escribe el comando para una ruta estática por defecto vía 10.0.0.1.",
    "`set routing-options static route 0.0.0.0/0 next-hop 10.0.0.1`."
   ],
   [
    "¿Por qué crear cuentas de usuario con nombre en lugar de compartir root?",
    "Para que cada persona se autentique y quede registrada individualmente, y reciba solo los permisos que permite su clase de login."
   ]
  ]
 },
 {
  "t": "Interface naming (type-fpc/pic/port.unit), physical vs logical properties, unit 0, family inet/inet6",
  "tt": "Nomenclatura de interfaces (type-fpc/pic/port.unit), propiedades físicas vs lógicas, unit 0, family inet/inet6",
  "body": [
   "Junos nombra las interfaces de red con un formato consistente que te dice exactamente dónde está un puerto en el hardware: `type-fpc/pic/port`, seguido de `.unit` para una unidad lógica. Por ejemplo, `ge-0/0/1.0` es un puerto Gigabit Ethernet en la FPC 0, PIC 0, puerto 1, unidad lógica 0. Leer estos nombres con rapidez es alfabetización básica de Junos.",
   "El tipo es un prefijo corto para la tecnología de la interfaz. Los comunes son `fe` (Fast Ethernet, 100 Mbps), `ge` (Gigabit Ethernet), `xe` (10 Gigabit Ethernet) y `et` (Ethernet de mayor velocidad, como 40 y 100 Gbps y más). También verás `ae` para los paquetes de Ethernet agregada (aggregated Ethernet) y varios tipos especiales que se cubren en la próxima lección. FPC es el número de ranura de la tarjeta de línea (en switches fijos suele ser 0, o el número de miembro en un Virtual Chassis). PIC es la ranura de la tarjeta o módulo de interfaz en esa FPC. Port es el puerto físico en ese PIC. Los tres empiezan en 0.",
   "Cada interfaz tiene propiedades físicas y propiedades lógicas. Las propiedades físicas se aplican a todo el puerto y se configuran directamente bajo el nombre de la interfaz: `description`, `disable`, `mtu`, `speed`, ajustes de link-mode, `vlan-tagging` y `encapsulation`. Las propiedades lógicas se configuran bajo una unit, que es una interfaz lógica: familias de protocolos, direcciones, IDs de VLAN y filtros. Los comandos muestran la división: `set interfaces ge-0/0/1 mtu 9192` es física, `set interfaces ge-0/0/1 unit 0 family inet address 10.0.13.1/30` es lógica.",
   "Toda interfaz que lleva tráfico necesita al menos una unit. En un puerto Ethernet simple sin etiquetado de VLAN, hay exactamente una unit, y debe ser la unit 0. Cuando habilitas `vlan-tagging`, puedes crear varias units, cada una con un `vlan-id`, convirtiendo un puerto físico en muchas interfaces lógicas (a veces llamadas subinterfaces). El número de unit no tiene que coincidir con el ID de VLAN, pero hacerlos coincidir es una convención común.",
   "La sentencia family define qué protocolo lleva la unit. `family inet` es IPv4 y contiene direcciones IPv4. `family inet6` es IPv6. Otras familias incluyen `mpls`, `iso` (necesaria para IS-IS) y `ethernet-switching` para puertos de Capa 2 en switches. Una unit puede tener varias familias a la vez, así que una unit puede llevar tanto IPv4 como IPv6. También puede tener más de una dirección por familia.",
   "```\nset interfaces ge-0/0/1 description \"to r2\"\nset interfaces ge-0/0/1 unit 0 family inet address 10.0.12.1/30\nset interfaces ge-0/0/1 unit 0 family inet6 address 2001:db8:12::1/64\n```",
   "`show interfaces terse` lista cada interfaz física y sus unidades lógicas con el estado administrativo, el estado del enlace, las familias y las direcciones. Las líneas físicas no tienen punto; las líneas lógicas tienen un punto y el número de unit. `show interfaces ge-0/0/1 extensive` da estadísticas físicas y lógicas detalladas."
  ],
  "terms": [
   [
    "type-fpc/pic/port",
    "El formato de nomenclatura de interfaces de Junos, como ge-0/0/1, que identifica la tecnología, la tarjeta de línea, la tarjeta de interfaz y el puerto."
   ],
   [
    "Logical unit (unidad lógica)",
    "Una interfaz lógica bajo un puerto físico, escrita como .unit, que contiene familias y direcciones."
   ],
   [
    "Physical properties (propiedades físicas)",
    "Ajustes para todo el puerto, como MTU, velocidad, descripción y etiquetado de VLAN."
   ],
   [
    "family inet / inet6",
    "Familias de protocolos que habilitan IPv4 o IPv6 en una unidad lógica."
   ],
   [
    "vlan-tagging",
    "Una propiedad física que permite múltiples units, cada una con su propio ID de VLAN, en un solo puerto."
   ]
  ],
  "example": "Un router tiene un puerto, ge-0/0/2, conectado a un trunk de switch que lleva las VLAN 100 y 200. Configuras `vlan-tagging` en la interfaz física, luego creas la unit 100 con `vlan-id 100` y la dirección 10.100.0.1/24, y la unit 200 con `vlan-id 200` y la dirección 10.200.0.1/24. `show interfaces terse` lista ge-0/0/2.100 y ge-0/0/2.200 como interfaces lógicas separadas.",
  "tip": "En un nombre como xe-1/2/3.0, los números son FPC 1, PIC 2, puerto 3, unit 0. Las direcciones siempre van bajo una unit y una family, nunca directamente en la interfaz física.",
  "check": [
   [
    "¿Qué significa cada parte de et-2/0/5.0?",
    "et es una interfaz Ethernet de alta velocidad; FPC 2, PIC 0, puerto 5; unidad lógica 0."
   ],
   [
    "¿El MTU es una propiedad física o lógica en el comando `set interfaces ge-0/0/0 mtu 1600`?",
    "Física, porque se configura directamente bajo el nombre de la interfaz y no bajo una unit."
   ],
   [
    "¿Qué sentencia family habilita IPv6 en una unit?",
    "`family inet6`."
   ]
  ]
 },
 {
  "t": "Special interfaces: lo0, fxp0/em0/me0, irb",
  "tt": "Interfaces especiales: lo0, fxp0/em0/me0, irb",
  "body": [
   "Además de los puertos Ethernet comunes, Junos tiene varias interfaces especiales que no corresponden a un solo puerto de tránsito. Tres aparecen en todo el material de JNCIA: la interfaz loopback lo0, la interfaz de gestión (fxp0, em0 o me0 según la plataforma) y la interfaz de enrutamiento y puenteo integrados, irb.",
   "lo0 es la interfaz loopback. Es una interfaz lógica que representa al propio dispositivo, y siempre está levantada mientras el dispositivo esté funcionando, porque no depende de ningún enlace físico. Eso la convierte en la mejor dirección para identificar a un router. Los protocolos de enrutamiento como OSPF y BGP suelen usar la dirección de lo0 como router ID y como origen de las sesiones, así las sesiones pueden sobrevivir a la falla de cualquier enlace físico mientras exista algún camino. Las direcciones de loopback suelen ser direcciones de host: una /32 para IPv4 o /128 para IPv6, como en `set interfaces lo0 unit 0 family inet address 192.168.255.1/32`. Como explicó una lección anterior, lo0 también es donde aplicas el firewall filter de entrada que protege al Routing Engine.",
   "La interfaz de gestión es un puerto Ethernet dedicado conectado al Routing Engine para la gestión fuera de banda. Es fxp0 en muchos routers y firewalls SRX, me0 en los switches EX y em0 en algunas otras plataformas. No se conecta al PFE, así que no reenvía tráfico de tránsito entre sí misma y otras interfaces. La configuras como cualquier otra interfaz, con una unit 0 y una dirección family inet, y la usas para SSH, SNMP, NTP y tráfico de gestión similar.",
   "irb significa integrated routing and bridging (enrutamiento y puenteo integrados). Es una interfaz lógica de Capa 3 asociada a una VLAN (o bridge domain), que le da a esa VLAN una dirección de gateway enrutada. Los hosts de la VLAN usan la dirección irb como su gateway por defecto, y el dispositivo enruta entre la VLAN y otras redes. En los switches EX y QFX, las interfaces irb son la forma de enrutar entre VLAN sin un router externo. El software EX más antiguo usaba una interfaz llamada `vlan` para el mismo propósito, que todavía puedes ver en documentación más antigua.",
   "```\nset vlans STAFF vlan-id 10\nset vlans STAFF l3-interface irb.10\nset interfaces irb unit 10 family inet address 10.10.0.1/24\nset interfaces ge-0/0/5 unit 0 family ethernet-switching vlan members STAFF\n```",
   "En un dispositivo también verás interfaces internas en `show interfaces terse` que no debes configurar, como las que se usan para la comunicación entre el RE y el PFE. Sus nombres varían según la plataforma. Las que configuras deliberadamente son las tres de esta lección, más los puertos normales."
  ],
  "terms": [
   [
    "lo0",
    "La interfaz loopback que representa al propio dispositivo; siempre está levantada y normalmente contiene una dirección /32 de router ID."
   ],
   [
    "Management interface (interfaz de gestión)",
    "fxp0, em0 o me0: un puerto Ethernet fuera de banda conectado al RE, que no se usa para tráfico de tránsito."
   ],
   [
    "irb",
    "Integrated routing and bridging: una interfaz de Capa 3 asociada a una VLAN que actúa como su gateway enrutado."
   ],
   [
    "l3-interface",
    "La sentencia de VLAN que asocia una VLAN con su unit irb."
   ]
  ],
  "example": "Un switch EX de campus tiene las VLAN STAFF (10) y VOICE (20). Creas irb.10 con 10.10.0.1/24 e irb.20 con 10.20.0.1/24 y las asocias con las VLAN. Las PC usan 10.10.0.1 como gateway y los teléfonos usan 10.20.0.1, y el switch enruta entre ellas. La dirección lo0 del switch, 192.168.255.10/32, se anuncia en OSPF para que el equipo de red siempre pueda alcanzarlo.",
  "tip": "lo0 siempre está levantada y se usa para router IDs y protección del RE; la interfaz de gestión es fuera de banda y no reenvía tráfico de tránsito; irb es el gateway de Capa 3 de una VLAN.",
  "check": [
   [
    "¿Por qué la dirección de lo0 es una buena opción para un router ID?",
    "Porque lo0 siempre está levantada y no depende de ningún enlace físico, así que el ID se mantiene estable."
   ],
   [
    "¿Cuál es el rol de una interfaz irb?",
    "Proporciona una dirección de gateway de Capa 3 para una VLAN para que el dispositivo pueda enrutar tráfico entre esa VLAN y otras redes."
   ],
   [
    "¿Qué máscara se usa normalmente en una dirección IPv4 de lo0?",
    "Una máscara de host /32."
   ]
  ]
 },
 {
  "t": "Commit model: `commit check`, `commit confirmed`, `commit and-quit`, `commit comment`, `commit at`",
  "tt": "Modelo de commit: `commit check`, `commit confirmed`, `commit and-quit`, `commit comment`, `commit at`",
  "body": [
   "En Junos, un commit es el momento en que la configuración candidata se convierte en la configuración activa. Como un solo commit malo puede dejar incomunicado un sitio remoto, Junos ofrece varias opciones de commit que hacen los cambios más seguros y más fáciles de rastrear. El examen espera que sepas qué hace cada una y cuándo usarla.",
   "`commit check` valida la candidata sin activarla. Junos analiza toda la configuración e informa los errores, como una sentencia obligatoria faltante o una referencia a un filtro o política que no existe, pero no se aplica nada. Úsalo mientras construyes un cambio grande para detectar errores temprano. Pasar `commit check` no garantiza que el cambio sea una buena idea; solo significa que la configuración es válida.",
   "`commit confirmed` es la red de seguridad para los cambios remotos. Hace commit de la candidata como siempre, pero inicia un temporizador, de 10 minutos por defecto, o la cantidad de minutos que especifiques, como en `commit confirmed 5`. Si no confirmas el cambio haciendo commit de nuevo antes de que expire el temporizador, Junos hace rollback automáticamente a la configuración anterior y la confirma. Si tu cambio te deja sin acceso, por ejemplo con un firewall filter malo o una ruta equivocada, solo esperas y el acceso vuelve. Para confirmar, ejecutas otro `commit` (Junos también acepta `commit check` para esto). Úsalo en cualquier cambio que pueda afectar tu propia conectividad.",
   "`commit and-quit` hace commit y, si tiene éxito, sale del modo de configuración y te devuelve al modo operacional en un solo paso. `commit comment` adjunta una nota al commit, por ejemplo `commit comment \"CHG1234 add OSPF on ge-0/0/1\"`. Los comentarios aparecen en `show system commit`, lo que hace mucho más fácil encontrar después a qué rollback volver. Las opciones se pueden combinar, así que `commit confirmed 5 comment \"CHG1234\"` es válido.",
   "`commit at` programa un commit para más tarde. Indicas una hora, como `commit at 02:00:00`, o una fecha y hora completas como `commit at \"2026-10-03 02:00:00\"`. Junos valida la configuración de inmediato y luego la activa a la hora programada, lo que es útil para cambios que deben ocurrir en una ventana de mantenimiento. Mientras un commit está pendiente, la configuración queda bloqueada, y puedes cancelarlo con el comando operacional `clear system commit`. `show system commit` muestra el commit pendiente.",
   "```\n[edit]\nuser@r1# show | compare\nuser@r1# commit check\nconfiguration check succeeds\nuser@r1# commit confirmed 5 comment \"add lo0 filter\"\ncommit confirmed will be automatically rolled back in 5 minutes unless confirmed\ncommit complete\nuser@r1# run show ospf neighbor\nuser@r1# commit\ncommit complete\n```",
   "De estas opciones se desprende una rutina diaria segura: revisa con `show | compare`, valida con `commit check`, aplica con `commit confirmed` más un comentario, verifica con comandos `run show` y luego confirma con `commit`. En sistemas con dos Routing Engines, `commit synchronize` aplica el commit en ambos."
  ],
  "terms": [
   [
    "commit check",
    "Valida la configuración candidata sin activarla."
   ],
   [
    "commit confirmed",
    "Hace commit con un rollback automático (10 minutos por defecto) a menos que se confirme con un segundo commit."
   ],
   [
    "commit and-quit",
    "Hace commit y luego sale del modo de configuración si el commit tiene éxito."
   ],
   [
    "commit comment",
    "Adjunta una nota de texto a un commit, que se muestra en `show system commit`."
   ],
   [
    "commit at",
    "Programa un commit validado para que surta efecto a una hora específica; se cancela con `clear system commit`."
   ]
  ],
  "example": "Estás cambiando el filtro de lo0 en un router a 300 kilómetros de distancia. Ejecutas `commit confirmed 5 comment \"tighten RE filter\"`. Tu sesión SSH se congela, lo que significa que el filtro te bloquea. Te vuelves a conectar después de cinco minutos, cuando el rollback automático ya restauró el acceso, corriges el término faltante y repites. Esta vez `run show system users` funciona, así que confirmas con `commit`.",
  "tip": "Si no confirmas, `commit confirmed` hace rollback automáticamente, a los 10 minutos por defecto. Confirma con un `commit` simple. `commit check` nunca cambia la configuración activa.",
  "check": [
   [
    "¿Qué pasa si usas `commit confirmed` y nunca vuelves a hacer commit?",
    "Cuando expira el temporizador (10 minutos por defecto), Junos hace rollback automáticamente a la configuración anterior y la confirma."
   ],
   [
    "¿Qué opción valida la configuración sin aplicarla?",
    "`commit check`."
   ],
   [
    "¿Cómo cancelas un `commit at` pendiente?",
    "Usa `clear system commit` en modo operacional."
   ]
  ]
 },
 {
  "t": "Rollback: `rollback n` (0–49), `show | compare rollback n`, rescue configuration",
  "tt": "Rollback: `rollback n` (0–49), `show | compare rollback n`, configuración de rescate",
  "body": [
   "Cada vez que ejecutas `commit` en un dispositivo Junos, el software guarda una copia de la configuración que estaba activa antes. Estas copias guardadas forman un historial numerado. La configuración activa actual es rollback 0, la confirmada justo antes es rollback 1, y así sucesivamente hasta rollback 49, así que Junos guarda hasta 50 versiones en total. Este historial es una de las mayores ventajas prácticas de Junos: deshacer un cambio malo es un solo comando en lugar de una sesión frenética de volver a escribir.",
   "Para volver atrás, entra al modo de configuración y escribe `rollback n`, donde n es el número que quieres. Esta es la parte que muchos principiantes pasan por alto: `rollback` solo carga la versión antigua en la configuración candidata. Nada cambia en el dispositivo en funcionamiento hasta que haces `commit`. Eso te da la oportunidad de revisar lo que estás a punto de hacer. `rollback` sin número es lo mismo que `rollback 0`, que descarta todos los cambios sin confirmar de la candidata y te devuelve a la configuración activa.",
   "Antes de hacer rollback, mira las diferencias. En modo de configuración, `show | compare rollback 3` compara la candidata con rollback 3 e imprime líneas que empiezan con `+` (se agregarían) y `-` (se eliminarían). Desde el modo operacional puedes ver el historial en sí con `show system commit`, que lista cada commit con su número, hora, usuario y método (CLI, NETCONF, etc.), y puedes ver cualquier versión antigua con `show configuration | compare rollback 1` o `file compare`.",
   "```\n[edit]\nuser@R1# show | compare rollback 1\n[edit interfaces ge-0/0/1 unit 0 family inet]\n-      address 10.1.1.1/24;\n+      address 10.1.1.5/24;\nuser@R1# rollback 1\nload complete\nuser@R1# commit\n```",
   "La configuración de rescate es diferente del historial numerado. Es una única configuración en buen estado conocido que guardas a propósito, normalmente una configuración mínima que te da acceso de gestión (una dirección de interfaz, una ruta, SSH y la contraseña de root). La guardas con `request system configuration rescue save`, y la cargas en modo de configuración con `rollback rescue` seguido de `commit`. A diferencia de rollback 1 a 49, nunca caduca por nuevos commits. Si no hay configuración de rescate guardada, el dispositivo normalmente genera una alarma menor del sistema que te recuerda que falta.",
   "Piensa en las dos como una red de seguridad a corto plazo y otra a largo plazo. Los rollbacks numerados te permiten retroceder unos pocos commits después de un error. La configuración de rescate es la versión en la que confías cuando ya no sabes cuál versión numerada fue la última buena."
  ],
  "terms": [
   [
    "Rollback 0",
    "La configuración activa (confirmada) actual; `rollback` sin número devuelve la candidata a ella."
   ],
   [
    "Rollback n",
    "Una configuración confirmada anteriormente, numerada de 1 a 49 según su antigüedad, que se puede cargar en la candidata."
   ],
   [
    "show | compare",
    "Muestra las diferencias entre la candidata y la configuración activa o un rollback indicado, usando marcadores + y -."
   ],
   [
    "Rescue configuration (configuración de rescate)",
    "Una configuración en buen estado conocido guardada manualmente, que se carga con `rollback rescue` y que los commits normales no reemplazan."
   ]
  ],
  "example": "Una ingeniera cambia el costo de una interfaz OSPF y hace commit, y de repente el tráfico toma un camino lento. Escribe `configure`, luego `show | compare rollback 1` para confirmar que la única diferencia es el costo, luego `rollback 1` y `commit`. El tráfico vuelve al camino rápido en segundos.",
  "tip": "Recuerda que `rollback n` no surte efecto por sí solo; solo reemplaza la candidata. Igual debes hacer commit. Recuerda también el rango: 0 es la configuración activa y 49 es la más antigua.",
  "check": [
   [
    "Escribes `rollback 2` en modo de configuración. ¿Ya cambió el comportamiento del dispositivo?",
    "No. El rollback solo carga esa versión en la configuración candidata; surte efecto solo después de hacer commit."
   ],
   [
    "¿Cuál es la diferencia entre rollback 1 y la configuración de rescate?",
    "Rollback 1 es automáticamente la versión confirmada anterior y se desplaza con cada commit; la configuración de rescate se guarda deliberadamente con `request system configuration rescue save` y permanece hasta que la reemplaces o la borres."
   ],
   [
    "¿Qué comando muestra quién confirmó cada configuración y cuándo?",
    "`show system commit` en modo operacional."
   ]
  ]
 },
 {
  "t": "Saving and loading: `save`, `load merge`, `load override`, `load replace`, `load set`, `load factory-default`",
  "tt": "Guardar y cargar: `save`, `load merge`, `load override`, `load replace`, `load set`, `load factory-default`",
  "body": [
   "Además de escribir comandos `set` uno por uno, puedes mover configuraciones completas hacia dentro y fuera de la candidata como archivos. Así es como respaldas un dispositivo, copias una configuración estándar a muchos dispositivos o pegas un bloque de configuración de una plantilla. Todos los comandos `load` cambian solo la candidata; como siempre, nada está en vivo hasta que haces commit.",
   "`save` escribe la configuración en un archivo. En la parte superior de la jerarquía, `save r1-backup.conf` escribe toda la candidata en ese archivo, por defecto en tu directorio home. Si estás dentro de un nivel de jerarquía como `[edit protocols ospf]`, `save` escribe solo esa parte. También puedes guardar en un destino remoto usando una ruta estilo FTP o SCP.",
   "Las opciones de `load` difieren en cómo combinan el archivo con lo que ya está en la candidata. `load merge` agrega las sentencias del archivo a la configuración existente; donde ambos definen la misma sentencia, gana el valor del archivo, y todo lo demás se conserva. `load override` descarta toda la candidata existente y la reemplaza con el archivo, así que todo lo que no esté en el archivo desaparece. `load replace` busca las sentencias del archivo marcadas con `replace:` y reemplaza solo esas secciones, dejando el resto intacto. `load set` lee un archivo (o texto pegado) formado por comandos `set` y `delete`, el mismo formato que produce `show configuration | display set`. El origen puede ser un nombre de archivo o la palabra `terminal`, que te permite pegar texto y terminar con Ctrl+D.",
   "```\n[edit interfaces ge-0/0/2]\nuser@R1# load merge terminal relative\n[Type ^D at a new line to end input]\nunit 0 { family inet { address 10.9.9.1/24; } }\n^D\nload complete\n```",
   "La palabra clave `relative` hace que el texto cargado sea relativo a tu nivel de jerarquía actual, lo que es práctico al pegar un fragmento cuando ya estás dentro de, por ejemplo, `[edit interfaces ge-0/0/2]`.",
   "`load factory-default` reemplaza la candidata con la configuración de fábrica de esa plataforma. Como la configuración de fábrica no incluye una contraseña de root, Junos se negará a hacer commit hasta que establezcas una con `set system root-authentication plain-text-password`. Este es un dato común del examen: todo commit requiere que la autenticación de root esté configurada. Para un restablecimiento completo del dispositivo, incluidos logs y archivos, también existe el comando operacional `request system zeroize`, que es más drástico que cargar los valores por defecto."
  ],
  "terms": [
   [
    "load merge",
    "Combina sentencias de un archivo o de la terminal con la candidata existente; los valores cargados ganan en caso de conflicto."
   ],
   [
    "load override",
    "Descarta toda la candidata y la reemplaza con la configuración cargada."
   ],
   [
    "load replace",
    "Reemplaza solo las secciones de configuración marcadas con la etiqueta `replace:` en el texto cargado."
   ],
   [
    "load set",
    "Carga una lista de comandos `set` y `delete`, como los que produce `| display set`."
   ],
   [
    "load factory-default",
    "Carga la configuración de fábrica de la plataforma en la candidata; hay que establecer una contraseña de root antes del commit."
   ]
  ],
  "example": "Un equipo mantiene una línea base de referencia (golden baseline) para los routers de sucursal. Cuando llega un router nuevo, el ingeniero copia el archivo de línea base al equipo, ejecuta `load override /var/tmp/branch-baseline.conf`, establece el nombre de host y las direcciones específicas del sitio, revisa con `commit check` y luego hace commit. Nada de la configuración de fábrica sobrevive, que es exactamente lo que quieren.",
  "tip": "Las preguntas del examen suelen evaluar merge frente a override: merge conserva la configuración existente y le agrega, override borra todo lo que no está en el archivo. Recuerda también que factory-default no hará commit sin una contraseña de root.",
  "check": [
   [
    "Necesitas pegar un conjunto de comandos `set` copiados de otro router. ¿Qué opción de load corresponde?",
    "`load set terminal`, que acepta comandos estilo set; luego haces commit."
   ],
   [
    "Después de `load factory-default`, el commit falla. ¿Cuál es la razón más probable?",
    "Falta la contraseña de autenticación de root; Junos requiere `system root-authentication` antes de cualquier commit."
   ],
   [
    "¿Qué opción eliminaría una ruta estática que existe en la candidata pero no en el archivo cargado?",
    "`load override`, porque reemplaza toda la candidata con el archivo."
   ]
  ]
 },
 {
  "t": "Editing tools: `delete`, `deactivate`/`activate`, `annotate`, `copy`, `rename`, `insert`",
  "tt": "Herramientas de edición: `delete`, `deactivate`/`activate`, `annotate`, `copy`, `rename`, `insert`",
  "body": [
   "Junos te da varios comandos para cambiar la configuración más allá de `set`. Conocerlos ahorra tiempo y, lo que es más importante, te permite hacer cambios de forma segura. Todos trabajan sobre la configuración candidata y surten efecto con el commit.",
   "`delete` elimina una sentencia o una jerarquía completa. `delete interfaces ge-0/0/1 unit 0 family inet address 10.1.1.1/24` elimina una dirección; `delete protocols ospf` elimina toda la configuración de OSPF. Ten cuidado: `delete` en un nivel alto sin argumento, como en la parte superior de `[edit]`, pide confirmación porque borraría todo lo que está bajo ese nivel.",
   "`deactivate` mantiene una sentencia en la configuración pero le dice a Junos que la ignore. La sentencia se marca como `inactive:` cuando ves la configuración. Esto es ideal para apagar algo temporalmente, por ejemplo `deactivate protocols bgp group ISP-B`, porque puedes traerlo de vuelta exactamente como estaba con `activate protocols bgp group ISP-B`. Compáralo con `delete`, que pierde la configuración para siempre (hasta un rollback). También existe `disable` dentro de muchos objetos, como las interfaces, que es un ajuste de configuración real que apaga administrativamente el elemento. Una interfaz desactivada no está configurada en absoluto; una interfaz con `disable` está configurada pero administrativamente caída.",
   "`annotate` agrega un comentario a una sentencia en el nivel actual. Por ejemplo, en `[edit interfaces]` puedes escribir `annotate ge-0/0/0 \"Uplink to ISP-A, circuit 4411\"`. El comentario aparece como una línea `/* ... */` sobre la sentencia en la configuración y ayuda al siguiente ingeniero a entender por qué algo está ahí. Los comentarios se muestran en las vistas normales de configuración pero no en la salida de `display set`.",
   "`copy` duplica un elemento de configuración con un nombre nuevo: `copy interfaces ge-0/0/1 to ge-0/0/2` copia toda la configuración de la interfaz. `rename` cambia un nombre en el lugar: `rename firewall family inet filter PROTECT to filter PROTECT-RE`. Las referencias al nombre anterior en otras partes no se actualizan automáticamente, así que revisa con `show | compare` después.",
   "`insert` cambia el orden de los elementos donde el orden importa, que son principalmente los términos de las políticas de enrutamiento y de los firewall filters. Los términos nuevos siempre se agregan al final, así que si agregas un término que debe evaluarse antes, lo mueves: `insert term BLOCK-TELNET before term ALLOW-ALL`. El orden importa porque tanto las políticas como los filtros se evalúan de arriba hacia abajo y se detienen en la primera acción terminante.",
   "```\n[edit firewall family inet filter PROTECT-RE]\nuser@R1# insert term ALLOW-SSH before term DENY-ALL\nuser@R1# show | compare\n```"
  ],
  "terms": [
   [
    "deactivate",
    "Marca una sentencia como `inactive:` para que permanezca en la configuración pero se ignore en el commit; se revierte con `activate`."
   ],
   [
    "annotate",
    "Adjunta un comentario a una sentencia en el nivel de jerarquía actual, mostrado como `/* ... */`."
   ],
   [
    "rename",
    "Cambia el nombre de un elemento de configuración en el lugar sin actualizar las demás referencias a él."
   ],
   [
    "insert",
    "Mueve un elemento ordenado, como un término de política o de filtro, antes o después de otro."
   ]
  ],
  "example": "Durante una ventana de mantenimiento, una ingeniera de redes necesita detener una sesión BGP con un ISP de respaldo pero podría necesitarla de nuevo mañana. En lugar de borrar el grupo, ejecuta `deactivate protocols bgp group BACKUP` y hace commit. Al día siguiente, `activate protocols bgp group BACKUP` y un commit restauran exactamente los mismos ajustes de la sesión.",
  "tip": "Conoce la diferencia entre `deactivate` (configuración conservada pero ignorada), `delete` (configuración eliminada) y `disable` (configurado pero administrativamente caído). Recuerda también que los términos nuevos van al final, así que `insert` es la solución cuando el orden de los términos está mal.",
  "check": [
   [
    "Agregas un nuevo término de firewall filter, pero nunca coincide porque un término anterior acepta todo. ¿Cómo lo arreglas sin volver a escribirlo?",
    "Usa `insert term NEW before term OLD` para moverlo por encima del término más amplio, y luego haz commit."
   ],
   [
    "¿Cómo aparece una sentencia desactivada cuando ejecutas `show`?",
    "Aparece con el prefijo `inactive:`."
   ]
  ]
 },
 {
  "t": "Configuration groups with `groups` and `apply-groups`, including wildcards",
  "tt": "Grupos de configuración con `groups` y `apply-groups`, incluidos los comodines",
  "body": [
   "Los grupos de configuración te permiten escribir un fragmento de configuración una sola vez y aplicarlo en muchos lugares. Esto mantiene las configuraciones grandes cortas, consistentes y más fáciles de cambiar. Un grupo se define bajo la jerarquía `groups` usando la misma estructura que la configuración normal, y no tiene efecto hasta que lo referencias con `apply-groups`.",
   "Este es un caso simple: cada interfaz Gigabit Ethernet debe tener cierto ajuste de MTU (maximum transmission unit, unidad máxima de transmisión). Defines un grupo con un comodín en el nombre de la interfaz y luego lo aplicas en el nivel superior.",
   "```\nset groups GE-DEFAULTS interfaces <ge-*> mtu 9192\nset groups GE-DEFAULTS interfaces <ge-*> unit 0 family inet\nset apply-groups GE-DEFAULTS\n```",
   "Los signos de menor y mayor contienen un patrón comodín. `<ge-*>` coincide con cualquier nombre de interfaz que empiece con `ge-`, y `<*>` coincide con cualquier cosa. El comodín solo coincide con elementos que realmente existen en la configuración normal; un grupo no crea interfaces por sí solo. Completa sentencias para objetos que ya configuraste. Los patrones también pueden usar `?` para un solo carácter y rangos entre corchetes.",
   "Puedes aplicar grupos en la parte superior de la configuración o en un nivel de jerarquía específico, como `set interfaces apply-groups GE-DEFAULTS` o bajo un protocolo. Las reglas sobre qué valor gana siguen un orden claro. Todo lo que configures explícitamente en la configuración normal reemplaza a un valor heredado de un grupo. Si se aplican varios grupos en el mismo nivel, el que aparece primero en la lista tiene prioridad. Los grupos aplicados en un nivel más específico (más profundo) tienen prioridad sobre los aplicados más arriba. Para detener la herencia en un objeto, usa `apply-groups-except GROUPNAME` en ese nivel.",
   "Como las sentencias heredadas no se muestran en la salida normal de `show`, necesitas una vista especial para ver la configuración real. `show | display inheritance` expande los grupos y marca las líneas heredadas con un comentario que nombra el grupo del que vinieron. Agrega `| display inheritance brief` para una versión compacta. Esta también es la vista que debes usar al diagnosticar un valor que no esperabas.",
   "Un grupo que verás en todos los dispositivos es `junos-defaults`, un grupo incorporado que contiene ajustes predefinidos como las aplicaciones con nombre. Normalmente no lo editas, pero explica por qué existen algunos valores aunque nunca los hayas escrito. En sistemas con doble Routing Engine, los grupos especiales `re0` y `re1` contienen ajustes como nombres de host y direcciones de gestión que difieren para cada Routing Engine."
  ],
  "terms": [
   [
    "groups",
    "La jerarquía de configuración donde se definen los bloques reutilizables de configuración."
   ],
   [
    "apply-groups",
    "La sentencia que hace que la configuración de un grupo se herede en el nivel donde se aplica."
   ],
   [
    "Wildcard (<...>, comodín)",
    "Un patrón entre signos de menor y mayor dentro de un grupo, como `<ge-*>`, que coincide con nombres de configuración existentes."
   ],
   [
    "display inheritance",
    "Una opción de pipe de `show` que expande las sentencias heredadas de grupos y marca de dónde vino cada una."
   ]
  ],
  "example": "Un proveedor de servicios quiere que cada interfaz hacia el núcleo ejecute OSPF punto a punto con los mismos ajustes de hello. Escribe un grupo con ajustes de `protocols ospf area 0 interface <ge-*>`, lo aplica bajo protocols y usa `apply-groups-except` en la única interfaz ge- de OSPF que necesita temporizadores diferentes.",
  "tip": "La configuración explícita siempre le gana a la herencia de grupos, y entre grupos del mismo nivel gana el primero de la lista. Si una pregunta pregunta por qué una sentencia está en efecto pero no es visible, la respuesta suele ser un grupo; `show | display inheritance` lo revela.",
  "check": [
   [
    "Un grupo establece MTU 9192 en `<ge-*>`, y la interfaz ge-0/0/3 tiene `mtu 1500` configurado directamente. ¿Qué MTU se aplica?",
    "1500, porque las sentencias configuradas explícitamente reemplazan a los valores heredados de grupos."
   ],
   [
    "¿Un grupo con comodín crea configuración para interfaces que no están configuradas de otra forma?",
    "No. Los comodines solo coinciden con objetos que ya existen en la configuración."
   ],
   [
    "¿Cómo puedes ver las sentencias heredadas en la configuración?",
    "Usa `show | display inheritance` (o `show configuration | display inheritance`)."
   ]
  ]
 },
 {
  "t": "System services: SSH, NTP, syslog, SNMP basics",
  "tt": "Servicios del sistema: fundamentos de SSH, NTP, syslog y SNMP",
  "body": [
   "Un dispositivo Junos nuevo hace muy poco en cuanto a gestión por defecto. Tú decides qué servicios se ejecutan, y cada uno se configura bajo la jerarquía `system` (SNMP tiene su propia jerarquía de nivel superior `snmp`). Esta lección cubre los cuatro que configurarás en casi todos los dispositivos: SSH para el CLI remoto, NTP para la hora, syslog para el registro de eventos y SNMP para el monitoreo.",
   "SSH (Secure Shell) te da una sesión de CLI remota cifrada. Habilítalo con `set system services ssh`. Es buena práctica agregar `set system services ssh root-login deny` para que nadie pueda iniciar sesión directamente como root por la red; los administradores inician sesión con sus propias cuentas y sus acciones se registran bajo sus nombres. Telnet se puede habilitar con `set system services telnet`, pero envía las contraseñas en texto claro y debe evitarse. La gestión web, NETCONF sobre SSH y otros también están bajo `system services`.",
   "NTP (Network Time Protocol) mantiene exacto el reloj del dispositivo. La hora correcta importa porque las entradas de log, el historial de commits y los certificados dependen de ella; cuando correlacionas un incidente entre diez dispositivos, sus marcas de tiempo deben coincidir. Configura un servidor con `set system ntp server 192.0.2.10` y establece la zona horaria local con `set system time-zone`. Si el reloj está muy desfasado, NTP puede tardar mucho en corregirlo gradualmente, así que puedes ajustarlo una vez con `set date ntp` desde el modo operacional.",
   "Syslog es la forma en que Junos registra los eventos. Los archivos de log locales viven en `/var/log`, y cada archivo se configura con una facility y una severidad: `set system syslog file messages any notice` registra eventos de cualquier facility con severidad notice o más grave. Para enviar también los eventos a un servidor de logs central, usa `set system syslog host 192.0.2.50 any warning`. Las severidades de la más grave a la menos grave son emergency, alert, critical, error, warning, notice, info y debug; elegir una incluye todo lo más grave.",
   "SNMP (Simple Network Management Protocol) permite que un sistema de monitoreo consulte (poll) al dispositivo para obtener contadores y estado y que reciba traps (alertas no solicitadas). Una configuración básica de SNMPv2c usa una community string: `set snmp community monitor-ro authorization read-only` y opcionalmente `clients` para restringir qué direcciones pueden consultar. Los traps se envían a los destinos definidos en un `trap-group`. Las communities de SNMPv2c se envían en texto claro, así que se prefiere SNMPv3, que agrega autenticación y cifrado, donde esté soportado.",
   "```\nset system services ssh root-login deny\nset system ntp server 192.0.2.10\nset system syslog host 192.0.2.50 any warning\nset snmp community monitor-ro authorization read-only\n```"
  ],
  "terms": [
   [
    "SSH",
    "Secure Shell, un protocolo cifrado para el acceso remoto por línea de comandos, habilitado con `set system services ssh`."
   ],
   [
    "NTP",
    "Network Time Protocol, que sincroniza el reloj del dispositivo con un servidor de hora."
   ],
   [
    "Syslog severity (severidad de syslog)",
    "El nivel de un evento, desde emergency (el más grave) hasta debug; un nivel configurado incluye todos los niveles más graves."
   ],
   [
    "SNMP community",
    "Una cadena compartida que usan SNMPv1/v2c para autorizar las consultas; ofrece una protección débil y en texto claro."
   ]
  ],
  "example": "Después de una auditoría de seguridad, una empresa exige gestión cifrada y registro centralizado. El ingeniero habilita SSH con el login de root denegado, elimina el servicio telnet, apunta NTP a los servidores de hora internos y agrega un host syslog para que la plataforma de logs del equipo de seguridad reciba cada warning y lo que sea más grave de cada router.",
  "tip": "Espera preguntas sobre dónde viven los servicios: `system services` para SSH y telnet, `system ntp`, `system syslog`, pero `snmp` en el nivel superior. Recuerda también que una severidad de syslog incluye todo lo que sea más grave que ella.",
  "check": [
   [
    "¿Qué sentencia impide los logins directos de root por SSH?",
    "`set system services ssh root-login deny`."
   ],
   [
    "¿Por qué la hora exacta de NTP es importante para el diagnóstico?",
    "Las marcas de tiempo de los logs y el historial de commits deben coincidir entre dispositivos para correlacionar los eventos correctamente."
   ],
   [
    "Si syslog está configurado con severidad `warning`, ¿se registrarán los mensajes `error`?",
    "Sí. Error es más grave que warning, y un ajuste de severidad incluye todos los niveles más graves."
   ]
  ]
 },
 {
  "t": "Monitoring the platform: `show chassis hardware`, `show chassis alarms`, `show system alarms`, `show chassis routing-engine`, `show system storage`",
  "tt": "Monitoreo de la plataforma: `show chassis hardware`, `show chassis alarms`, `show system alarms`, `show chassis routing-engine`, `show system storage`",
  "body": [
   "Antes de diagnosticar el enrutamiento o las interfaces, necesitas saber que el propio dispositivo está sano. Junos ofrece un pequeño conjunto de comandos del modo operacional que te dicen qué hardware está instalado, si hay alguna alarma, qué tan ocupado está el plano de control y si el almacenamiento se está llenando. Estos son los primeros comandos que muchos ingenieros escriben después de iniciar sesión.",
   "`show chassis hardware` lista el inventario físico: el chasis, los Routing Engines, las tarjetas de línea (como las FPC, Flexible PIC Concentrators), los PIC (Physical Interface Cards), las fuentes de alimentación, los ventiladores y las ópticas, con números de parte y números de serie. Lo usas para confirmar que se detectó una tarjeta de reemplazo, para registrar números de serie para un caso de soporte o para revisar qué transceptor está conectado a un puerto. Agregar `detail` o `extensive` muestra más, como la memoria y las versiones de los componentes.",
   "Junos separa las alarmas en dos tipos. `show chassis alarms` informa problemas de hardware y del entorno: un ventilador fallado, una fuente de alimentación sin entrada, una temperatura por encima del límite o un enlace caído en una interfaz configurada para generar alarma. `show system alarms` informa condiciones de software y configuración, como una configuración de rescate faltante, un problema de licencia o un problema con el medio de arranque. Cada alarma tiene una clase, Major (roja, requiere atención inmediata) o Minor (amarilla). Muchos dispositivos también muestran LED de alarma en el panel frontal, y el banner del prompt del CLI puede avisarte que hay alarmas activas.",
   "`show chassis routing-engine` muestra la salud del Routing Engine (RE), el componente que ejecuta Junos, los protocolos de enrutamiento y el CLI. Los campos clave son la utilización de CPU (dividida en user, kernel, interrupt e idle), la utilización de memoria, la temperatura, el tiempo de actividad, el motivo del último reinicio y los promedios de carga. Una CPU constantemente alta puede indicar un problema de protocolo de enrutamiento o demasiado tráfico enviado al RE. En sistemas con doble RE también muestra cuál RE es el primario (master) y cuál es el de respaldo.",
   "`show system storage` funciona como el comando Unix `df`. Lista cada sistema de archivos con su tamaño, espacio usado, espacio disponible y punto de montaje. Si `/var` se llena, los logs no se pueden escribir y las actualizaciones de software fallarán porque no hay espacio para preparar el paquete. Cuando hay poco espacio lo limpias con `request system storage cleanup`, que se cubre en una lección posterior.",
   "```\nuser@R1> show chassis alarms\n1 alarms currently active\nAlarm time               Class  Description\n2026-03-02 09:14:21 UTC  Major  PEM 1 Not OK\nuser@R1> show system alarms\n1 alarms currently active\nAlarm time               Class  Description\n2026-03-01 18:02:44 UTC  Minor  Rescue configuration is not set\n```",
   "Juntos, estos comandos te dan una revisión rápida de salud: inventario, alarmas de ambos tipos, carga del plano de control y espacio en disco. Otros comandos relacionados que vale la pena conocer son `show chassis environment` para las temperaturas y el estado de los ventiladores, y `show system uptime` para saber cuándo arrancaron por última vez el sistema y los protocolos."
  ],
  "terms": [
   [
    "Chassis alarm (alarma del chasis)",
    "Una alarma de hardware o del entorno, como un ventilador o una fuente de alimentación fallados, que muestra `show chassis alarms`."
   ],
   [
    "System alarm (alarma del sistema)",
    "Una alarma de software o configuración, como una configuración de rescate faltante, que muestra `show system alarms`."
   ],
   [
    "Routing Engine (RE)",
    "El componente del plano de control que ejecuta Junos, los protocolos de enrutamiento y la gestión; su salud se muestra con `show chassis routing-engine`."
   ],
   [
    "FPC",
    "Flexible PIC Concentrator, una ranura de tarjeta de línea que contiene PIC y reenvía tráfico en muchas plataformas Junos."
   ]
  ],
  "example": "El NOC recibe un trap SNMP que indica que un router tiene una alarma mayor. La ingeniera de guardia inicia sesión, ejecuta `show chassis alarms` y ve una fuente de alimentación que informa que no tiene entrada. `show chassis hardware` le da el número de parte y el número de serie de la fuente, que agrega a la solicitud de reemplazo. `show system alarms` está limpio, así que el lado del software está bien.",
  "tip": "Las alarmas del chasis tratan sobre hardware y entorno; las alarmas del sistema tratan sobre software y configuración. Una configuración de rescate faltante es el ejemplo clásico de una alarma del sistema.",
  "check": [
   [
    "¿Qué comando informaría que no hay configuración de rescate guardada?",
    "`show system alarms`, porque es una condición de software/configuración."
   ],
   [
    "¿Dónde encontrarías la utilización de CPU y memoria del Routing Engine y el motivo de su último reinicio?",
    "`show chassis routing-engine`."
   ],
   [
    "¿Por qué podría fallar una actualización de software después de que `show system storage` muestra /var casi lleno?",
    "No hay espacio para copiar y desempaquetar el paquete; primero limpia el almacenamiento."
   ]
  ]
 },
 {
  "t": "Monitoring interfaces: `show interfaces terse`, `extensive`, `monitor interface`, `monitor traffic interface`",
  "tt": "Monitoreo de interfaces: `show interfaces terse`, `extensive`, `monitor interface`, `monitor traffic interface`",
  "body": [
   "Las interfaces son donde aparecen la mayoría de los problemas, así que Junos te da varias vistas de ellas, desde un resumen de una línea hasta un informe detallado de errores, contadores en vivo y capturas de paquetes.",
   "`show interfaces terse` es el panorama rápido. Cada interfaz física y cada unidad lógica recibe una línea con columnas para el estado Admin, el estado Link, Proto (las familias de protocolos como inet, inet6 o iso) y las direcciones Local y Remote. Admin up y Link down normalmente significa un problema de cableado, de óptica o del extremo remoto. Admin down significa que alguien configuró `disable`. Puedes acotarlo con un nombre de interfaz, por ejemplo `show interfaces terse ge-0/0/1`, o con un comodín como `show interfaces terse ge-*`.",
   "```\nuser@R1> show interfaces terse ge-0/0/1\nInterface       Admin Link Proto    Local            Remote\nge-0/0/1        up    up\nge-0/0/1.0      up    up   inet     10.1.12.1/30\n```",
   "Sin opciones, `show interfaces ge-0/0/1` muestra un nivel medio de detalle: velocidad, MTU, dirección MAC, flags, tasas de entrada y salida y direcciones por unit. `show interfaces ge-0/0/1 detail` agrega estadísticas de tráfico y `extensive` lo muestra todo, incluidos los contadores de errores: errores de entrada, errores CRC (cyclic redundancy check) o de framing, descartes, runts, colisiones, transiciones de portadora (carrier transitions) y estadísticas de colas. Cuando un enlace está levantado pero los usuarios se quejan de que está lento o pierde paquetes, la salida extensive es donde debes mirar. Los errores CRC en aumento suelen apuntar a un cable o una óptica defectuosos; las transiciones de portadora muestran un enlace que está oscilando. Usa `clear interfaces statistics ge-0/0/1` para reiniciar los contadores y así ver si los errores siguen aumentando.",
   "`monitor interface ge-0/0/1` abre una visualización a pantalla completa y en tiempo real de los contadores y tasas de la interfaz que se actualiza más o menos cada segundo, con una columna que muestra cuánto cambió cada contador. Algunas teclas te permiten cambiar de interfaz (n para la siguiente), congelar la pantalla y salir (q). Es útil para ver si el tráfico está fluyendo en este momento o si los errores aumentan durante una prueba. `monitor interface traffic` muestra un resumen en vivo de todas las interfaces a la vez.",
   "`monitor traffic interface ge-0/0/1` es una captura de paquetes similar a tcpdump. Una limitación importante: en la mayoría de las plataformas solo muestra los paquetes enviados hacia o desde el Routing Engine, como los hellos de protocolos de enrutamiento, los pings al dispositivo, SSH y ARP, no el tráfico de tránsito que el hardware reenvía a través del equipo. Por eso es excelente para comprobar si llegan los hellos de OSPF o los paquetes BGP. Las opciones incluyen `no-resolve` para evitar búsquedas DNS, `detail` para una decodificación más completa, `count` y una expresión `matching` para filtrar, por ejemplo `monitor traffic interface ge-0/0/1 matching \"proto ospf\"`. Presiona Ctrl+C para detenerla."
  ],
  "terms": [
   [
    "show interfaces terse",
    "Un resumen de una línea por interfaz con el estado administrativo, el estado del enlace, las familias de protocolos y las direcciones."
   ],
   [
    "extensive",
    "La salida de interfaz más detallada, incluidos contadores de errores como errores CRC, descartes y transiciones de portadora."
   ],
   [
    "monitor interface",
    "Una visualización en vivo y con actualización automática de los contadores y tasas de una interfaz."
   ],
   [
    "monitor traffic interface",
    "Una captura estilo tcpdump de los paquetes hacia y desde el Routing Engine en una interfaz."
   ]
  ],
  "example": "Los usuarios de una sucursal reportan transferencias de archivos lentas. `show interfaces terse` muestra el enlace de subida como up/up, pero `show interfaces ge-0/0/0 extensive` muestra miles de errores CRC de entrada. Después de `clear interfaces statistics ge-0/0/0`, `monitor interface ge-0/0/0` muestra que el conteo de CRC sigue subiendo durante una transferencia. Reemplazar el patch cord detiene los errores.",
  "tip": "Recuerda que `monitor traffic interface` normalmente solo ve el tráfico hacia o desde el Routing Engine, no el tráfico de tránsito. Y up/down (admin up, link down) es un problema físico, mientras que down en la columna Admin significa que la interfaz está deshabilitada en la configuración.",
  "check": [
   [
    "En `show interfaces terse`, ge-0/0/2 muestra Admin up, Link down. ¿Cuál es la causa probable?",
    "Un problema de capa física, como un cable, una óptica o el puerto del extremo remoto, ya que la interfaz está habilitada en la configuración."
   ],
   [
    "¿Qué comando muestra los errores CRC de una interfaz?",
    "`show interfaces <name> extensive`."
   ],
   [
    "¿`monitor traffic interface` mostraría una descarga web que pasa a través del router entre dos hosts?",
    "Generalmente no; captura el tráfico hacia y desde el Routing Engine, no el tráfico de tránsito reenviado en hardware."
   ]
  ]
 },
 {
  "t": "Network tools: ping, traceroute, SSH, telnet from the CLI",
  "tt": "Herramientas de red: ping, traceroute, SSH y telnet desde el CLI",
  "body": [
   "Junos incluye las conocidas herramientas de prueba de red directamente en el modo operacional. No necesitas salir del CLI para probar la alcanzabilidad, trazar un camino o abrir una sesión hacia otro dispositivo. Lo que las hace poderosas en un router es el conjunto de opciones que te permiten elegir la dirección de origen, la instancia de enrutamiento y el tamaño del paquete.",
   "`ping` envía solicitudes ICMP (Internet Control Message Protocol) echo. A diferencia de otros sistemas, el ping de Junos sigue ejecutándose hasta que presionas Ctrl+C, a menos que indiques un `count`. Las opciones útiles incluyen `count 5`, `rapid` (envía cinco paquetes rápidamente e imprime `!` por cada respuesta y `.` por cada timeout), `source 10.0.0.1` para probar desde una dirección específica, `interface ge-0/0/1` para enviar por una interfaz específica, `routing-instance vr1` para usar otra tabla de enrutamiento, `size 1472` junto con `do-not-fragment` para probar el MTU del camino, y `ttl` para limitar los saltos.",
   "```\nuser@R1> ping 10.1.12.2 rapid count 5\nPING 10.1.12.2 (10.1.12.2): 56 data bytes\n!!!!!\n--- 10.1.12.2 ping statistics ---\n5 packets transmitted, 5 packets received, 0% packet loss\n```",
   "Elegir el origen importa. Cuando haces ping a una red remota desde un router, el origen por defecto es la dirección de la interfaz de salida. Puede que el extremo remoto no tenga ruta de regreso hacia esa dirección de enlace aunque sí pueda llegar a tu loopback, así que el ping falla mientras el tráfico real funciona. Probar con `source` apuntando a la dirección de loopback, o a una dirección de la LAN, da un resultado más realista.",
   "`traceroute` muestra cada salto de router en el camino hacia un destino enviando sondas con valores de TTL (time to live) crecientes y registrando qué router devuelve un mensaje ICMP time-exceeded. Cada línea muestra un salto y sus tiempos de respuesta; los asteriscos significan que no hubo respuesta dentro del timeout, lo que puede deberse a un filtro y no a una falla. Soporta las mismas opciones `source` y `routing-instance`, y `no-resolve` para omitir las búsquedas DNS. `traceroute inet6` funciona para IPv6, y `ping inet6` para pings IPv6.",
   "`ssh user@192.0.2.20` y `telnet 192.0.2.20` abren una sesión desde el dispositivo hacia otro host. Esto es útil cuando solo puedes llegar a un dispositivo remoto a través de un punto de salto, o para probar que un puerto TCP está abierto: `telnet 192.0.2.20 port 179`, por ejemplo, comprueba si hay algo escuchando en el puerto de BGP. Ambos aceptan las opciones `routing-instance` y `source`. Recuerda que telnet no está cifrado, así que úsalo para pruebas y no para gestionar dispositivos de producción."
  ],
  "terms": [
   [
    "ping rapid",
    "Un modo de ping que envía una ráfaga de solicitudes echo e imprime `!` para las respuestas y `.` para los timeouts."
   ],
   [
    "source option (opción source)",
    "Establece la dirección IP de origen de un paquete de prueba, lo que afecta si el extremo remoto puede responder."
   ],
   [
    "traceroute",
    "Una herramienta que revela cada salto de router hacia un destino usando valores de TTL crecientes."
   ],
   [
    "routing-instance option (opción routing-instance)",
    "Ejecuta una prueba usando la tabla de una instancia de enrutamiento específica en lugar de la inet.0 por defecto."
   ]
  ],
  "example": "Un enlace nuevo hacia la red de un socio está levantado, y `ping 172.16.5.1` desde el router funciona, pero los hosts de la LAN no pueden llegar al socio. `ping 172.16.5.1 source 10.10.10.1` (la dirección del gateway de la LAN) falla, lo que revela que el socio no tiene ruta de regreso hacia el prefijo de la LAN. Agregar esa ruta del lado del socio lo soluciona.",
  "tip": "El ping de Junos corre para siempre sin `count` o `rapid`. Cuando una pregunta describe un ping desde el router que funciona pero hosts que fallan, piensa en la dirección de origen y en la ruta de regreso.",
  "check": [
   [
    "¿Cómo haces ping desde un router usando su dirección de loopback como origen?",
    "`ping <destination> source <loopback address>`."
   ],
   [
    "¿Cómo probarías si un router remoto acepta conexiones TCP en el puerto 179?",
    "`telnet <address> port 179` desde el CLI."
   ],
   [
    "¿Qué significa una línea de asteriscos en la salida de traceroute?",
    "Ese salto no respondió dentro del timeout, posiblemente por filtrado o limitación de tasa, no necesariamente por una falla."
   ]
  ]
 },
 {
  "t": "System logging (`/var/log/messages`, `show log`) and protocol traceoptions",
  "tt": "Registro del sistema (`/var/log/messages`, `show log`) y traceoptions de protocolos",
  "body": [
   "Los logs te dicen qué ha estado haciendo el dispositivo: interfaces que se levantan y se caen, commits, inicios de sesión, vecinos de protocolos de enrutamiento que cambian de estado y eventos de hardware. Junos los escribe en archivos bajo `/var/log`, y el más importante es `messages`, que está configurado por defecto en la mayoría de las plataformas para recoger eventos de nivel notice y superiores de todas las facilities.",
   "Lees los logs desde el modo operacional con `show log messages`. La salida puede ser larga, así que usa pipes: `show log messages | match ge-0/0/1` encuentra las líneas que mencionan una interfaz, `show log messages | last 20` muestra las entradas más recientes y `| except` oculta las líneas ruidosas. Otro archivo útil es `interactive-commands`, si está configurado, que registra los comandos que escribieron los usuarios. `show log` solo lista los archivos de `/var/log`.",
   "```\nuser@R1> show log messages | match SNMP_TRAP_LINK | last 3\nMar  2 10:01:12 R1 mib2d[1780]: SNMP_TRAP_LINK_DOWN: ifIndex 526, ifAdminStatus up(1), ifOperStatus down(2), ifName ge-0/0/1\n```",
   "Para ver un log en vivo, usa `monitor start messages`. Las líneas nuevas se imprimen en tu terminal a medida que se escriben, lo cual es ideal mientras reproduces un problema. Detenlo con `monitor stop`. También puedes presionar Esc-Q para pausar la salida temporalmente. Los archivos de log rotan cuando llegan a su límite de tamaño, conservando un conjunto de archivos antiguos comprimidos como `messages.0.gz`.",
   "Syslog te dice qué pasó; traceoptions te dice por qué. Traceoptions es una función de depuración detallada que habilitas por protocolo o por proceso. Eliges un nombre de archivo y uno o más flags que seleccionan qué registrar. Para OSPF, por ejemplo, el flag `hello` registra los paquetes hello, `error` registra los errores y `state` registra los cambios de estado de los vecinos.",
   "```\nset protocols ospf traceoptions file ospf-trace size 1m files 3\nset protocols ospf traceoptions flag hello detail\nset protocols ospf traceoptions flag error\n```",
   "Después de hacer commit, lee la traza con `show log ospf-trace` u obsérvala con `monitor start ospf-trace`. Los archivos de traza también se guardan en `/var/log`. Traceoptions puede generar mucha salida y usar CPU del Routing Engine, así que habilita solo los flags que necesites, limita el tamaño y la cantidad de archivos, y elimina o desactiva las traceoptions cuando termines. El flag `all` es tentador pero normalmente es demasiado verboso en un dispositivo de producción.",
   "Un flujo de trabajo típico es: revisar `show log messages` para encontrar el evento (por ejemplo, que un vecino OSPF se cayó), luego habilitar traceoptions para ese protocolo para ver los detalles (por ejemplo, que los intervalos de hello no coinciden), corregir el problema y luego apagar el trazado."
  ],
  "terms": [
   [
    "/var/log/messages",
    "El archivo principal de log del sistema en Junos, que contiene eventos de todas las facilities con la severidad configurada."
   ],
   [
    "show log",
    "Muestra un archivo de log de /var/log, o lista los archivos cuando se usa solo."
   ],
   [
    "monitor start",
    "Imprime en tiempo real en la terminal las líneas nuevas de un archivo de log o de traza hasta `monitor stop`."
   ],
   [
    "traceoptions",
    "Configuración de depuración por protocolo o por proceso que escribe eventos detallados en un archivo de traza según los flags seleccionados."
   ]
  ],
  "example": "Una adyacencia OSPF con un router nuevo no se forma. `show log messages | match OSPF` no muestra nada útil, así que la ingeniera habilita `traceoptions` con los flags `hello` y `error`. La traza muestra hellos que llegan con un dead interval de 120 segundos mientras que el ajuste local es 40. Igualar los temporizadores levanta al vecino, y ella borra las traceoptions.",
  "tip": "Syslog registra eventos con una severidad elegida; traceoptions da detalle de depuración a nivel de protocolo. Ambos terminan en /var/log y ambos se leen con `show log <file>`. Siempre elimina las traceoptions después de diagnosticar.",
  "check": [
   [
    "¿Cómo muestras solo las últimas 10 líneas del log messages?",
    "`show log messages | last 10`."
   ],
   [
    "¿Cómo ves las nuevas entradas del log en tiempo real y luego te detienes?",
    "`monitor start messages` para empezar y `monitor stop` para terminar."
   ],
   [
    "¿Por qué deben eliminarse las traceoptions después de usarlas?",
    "Pueden generar archivos grandes y consumir CPU y almacenamiento del Routing Engine."
   ]
  ]
 },
 {
  "t": "Managing files: `file list`, `file show`, `request system storage cleanup`",
  "tt": "Gestión de archivos: `file list`, `file show`, `request system storage cleanup`",
  "body": [
   "Junos está construido sobre un sistema operativo tipo Unix, así que tiene un sistema de archivos normal con directorios como `/var/log` para los logs, `/var/tmp` para archivos temporales y paquetes de software, `/config` y `/var/db/config` para las configuraciones guardadas y `/var/home/<user>` para el directorio home de cada usuario. Desde el CLI gestionas estos archivos con los comandos `file`, sin necesidad de un shell Unix.",
   "`file list` muestra el contenido de un directorio. Sin argumento lista tu directorio home; `file list /var/tmp` lista los archivos temporales y `file list /var/log detail` agrega tamaño, propietario y fecha, similar a `ls -l`. Así confirmas que un paquete de software terminó de copiarse o encuentras el nombre de un log antiguo.",
   "`file show` muestra un archivo de texto, por ejemplo `file show /var/log/messages` o `file show /var/tmp/backup.conf`. Otros comandos de archivos que debes reconocer son `file copy` (incluida la copia hacia o desde un servidor remoto usando URL estilo FTP, SCP o HTTP), `file delete`, `file rename`, `file compare files` para comparar dos archivos y `file archive` para comprimir archivos.",
   "```\nuser@R1> file list /var/tmp detail\n/var/tmp:\n-rw-r--r--  1 root  wheel  412331520 Mar  1 22:10 junos-install-package.tgz\n-rw-r--r--  1 admin wheel      18234 Mar  2 08:02 r1-backup.conf\nuser@R1> file copy /var/tmp/r1-backup.conf scp://admin@192.0.2.30/backups/\n```",
   "Con el tiempo, el almacenamiento se llena de archivos de log rotados, volcados de fallas (crash dumps), paquetes de software antiguos y archivos temporales. `show system storage` te dice qué tan lleno está cada sistema de archivos. Para recuperar espacio, Junos ofrece `request system storage cleanup`. Primero lista los archivos que planea borrar y pide confirmación antes de eliminarlos. Si solo quieres ver la lista sin borrar nada, agrega `dry-run`: `request system storage cleanup dry-run`. Este es un primer paso seguro en cualquier dispositivo que no conozcas.",
   "Ejecutar la limpieza antes de una actualización de software es una buena práctica común, ya que el nuevo paquete debe copiarse al dispositivo y luego expandirse durante la instalación. Después de la limpieza, ejecuta `show system storage` de nuevo para confirmar que tienes espacio suficiente.",
   "Ten cuidado con los borrados manuales. `file delete` elimina un archivo de inmediato, sin papelera de reciclaje. No borres archivos que no entiendas, especialmente en los directorios de configuración. El comando cleanup es el método preferido porque solo apunta a archivos que el sistema considera seguros de eliminar."
  ],
  "terms": [
   [
    "file list",
    "Lista los archivos de un directorio; `detail` agrega tamaño, propietario y fecha."
   ],
   [
    "file show",
    "Muestra el contenido de un archivo de texto desde el CLI."
   ],
   [
    "request system storage cleanup",
    "Elimina logs rotados, archivos de fallas y archivos temporales después de mostrar la lista y pedir confirmación."
   ],
   [
    "dry-run",
    "Una opción de cleanup que muestra qué archivos se borrarían sin borrarlos."
   ]
  ],
  "example": "Antes de actualizar un router de sucursal, una ingeniera ejecuta `show system storage` y ve /var al 93 por ciento. `request system storage cleanup dry-run` muestra archivos de log antiguos y un paquete sobrante de la última actualización. Ejecuta la limpieza de verdad, confirma que se liberó el espacio y luego copia el nuevo paquete a /var/tmp.",
  "tip": "Usa `dry-run` para previsualizar una limpieza. Conoce los directorios: los logs en /var/log, los paquetes normalmente preparados en /var/tmp, y los archivos de usuario en el directorio home, donde `save` escribe por defecto.",
  "check": [
   [
    "¿Cómo ves qué archivos eliminaría una limpieza de almacenamiento sin borrarlos?",
    "`request system storage cleanup dry-run`."
   ],
   [
    "¿Qué comando muestra el contenido de un archivo de configuración guardado?",
    "`file show <path>`, por ejemplo `file show /var/tmp/backup.conf`."
   ]
  ]
 },
 {
  "t": "Software installation and upgrades with `request system software add`; snapshots",
  "tt": "Instalación y actualización de software con `request system software add`; snapshots",
  "body": [
   "Actualizar Junos es una tarea rutinaria pero de alto riesgo. Un proceso cuidadoso minimiza el riesgo de terminar con un dispositivo que no arranca o que no soporta tu configuración. Los pasos generales son los mismos en la mayoría de las plataformas, aunque los nombres de los paquetes y algunas opciones difieren según la línea de productos, así que siempre lee las release notes de tu dispositivo y versión específicos.",
   "Primero, prepara. Revisa la versión actual con `show version`, confirma que la versión objetivo soporta tu hardware y tus funciones, guarda una copia de la configuración fuera del dispositivo y asegúrate de que haya suficiente almacenamiento con `show system storage` y `request system storage cleanup`. Luego copia el paquete al dispositivo, normalmente en `/var/tmp`, usando `file copy` desde un servidor FTP, SCP o HTTP, o subiéndolo con SCP desde tu estación de trabajo.",
   "Segundo, instala. El comando es `request system software add` seguido de la ruta del paquete, normalmente con la opción `reboot` para que el nuevo software se active de inmediato:",
   "```\nuser@R1> request system software add /var/tmp/<package-name>.tgz reboot\n```",
   "Por defecto, Junos valida tu configuración actual contra el nuevo software antes de instalar, y se detiene si la configuración no pudiera confirmarse. Esto te protege de arrancar una versión que rechace tu configuración. Puedes ver opciones como `validate` y `no-validate`; omitir la validación elimina esa red de seguridad y solo debe hacerse cuando entiendas por qué. Sin `reboot`, el paquete queda preparado y se activa en el siguiente reinicio. En algunas plataformas, `request system software rollback` vuelve al software instalado anteriormente si la actualización causa problemas.",
   "Tercero, verifica. Después del reinicio, usa `show version` para confirmar la nueva versión, y luego revisa las alarmas, las interfaces, los vecinos de los protocolos de enrutamiento y los logs en busca de errores.",
   "Los snapshots te protegen contra problemas del medio de arranque. Un snapshot copia el software y la configuración en ejecución a otro dispositivo de almacenamiento o partición, a menudo llamado medio alternativo o de respaldo. Si el medio primario falla o se corrompe, el dispositivo puede arrancar desde la copia alternativa. El comando es `request system snapshot`, con opciones que dependen de la plataforma, como seleccionar el medio o el slice alternativo, y revisas el resultado con `show system snapshot`. Una buena práctica es tomar un snapshot solo después de confirmar que el nuevo software es estable, para que la copia de respaldo sea una en buen estado conocido. Algunos sistemas generan una alarma si arrancaron desde el medio de respaldo, lo cual es una señal para reparar el primario.",
   "En dispositivos con dos Routing Engines, las actualizaciones se hacen en cada RE, y funciones como graceful switchover pueden reducir el tiempo de inactividad, pero el comando básico sigue siendo `request system software add`."
  ],
  "terms": [
   [
    "request system software add",
    "El comando operacional que instala un paquete de software Junos, opcionalmente con `reboot` para activarlo de inmediato."
   ],
   [
    "Configuration validation (validación de la configuración)",
    "Una revisión durante la instalación que confirma que la configuración actual es compatible con el nuevo software."
   ],
   [
    "request system snapshot",
    "Copia el software y la configuración actuales al medio de arranque alternativo como respaldo."
   ],
   [
    "show version",
    "Muestra el nombre de host, el modelo y la versión de software Junos instalada."
   ]
  ],
  "example": "Un equipo de operaciones planifica una actualización de Junos en un router de núcleo. Guardan la configuración en un servidor, limpian el almacenamiento, copian el paquete a /var/tmp y ejecutan `request system software add /var/tmp/<package>.tgz reboot` en una ventana de mantenimiento. Después de verificar vecinos y alarmas durante un día, ejecutan `request system snapshot` para que el medio de respaldo también contenga la nueva versión ya probada.",
  "tip": "El comando de instalación es `request system software add`; agrega `reboot` para activarlo de inmediato. Los snapshots copian software y configuración al medio alternativo, así que tómalos después de que la nueva versión haya demostrado ser estable.",
  "check": [
   [
    "¿Qué pasa por defecto si tu configuración no es compatible con el nuevo software durante la instalación?",
    "La validación falla y la instalación se detiene, lo que te protege de arrancar con una configuración inutilizable."
   ],
   [
    "¿Cuál es el mejor momento para ejecutar `request system snapshot` después de una actualización?",
    "Después de verificar que el nuevo software y la configuración funcionan correctamente, para que el respaldo esté en buen estado conocido."
   ]
  ]
 },
 {
  "t": "Rebooting, halting and powering off safely: `request system reboot`, `halt`, `power-off`",
  "tt": "Reiniciar, detener y apagar de forma segura: `request system reboot`, `halt`, `power-off`",
  "body": [
   "Un dispositivo Junos ejecuta un sistema operativo completo con sistemas de archivos en los que se escribe constantemente. Desconectar el cable de alimentación sin aviso arriesga corromper esos sistemas de archivos, lo que puede dejar al dispositivo sin poder arrancar. Por eso Junos ofrece comandos para apagar de forma ordenada: los procesos se detienen, los archivos se cierran y los discos se sincronizan antes de que algo se apague.",
   "`request system reboot` realiza un reinicio ordenado. El dispositivo apaga su software limpiamente y vuelve a arrancar. Se te pide confirmación antes de continuar. Puedes programarlo con `at`, por ejemplo `request system reboot at 23:00`, o retrasarlo con `in 10` para diez minutos. Un reinicio programado pendiente se puede cancelar con `clear system reboot`. En sistemas con dos Routing Engines, opciones como `both-routing-engines` u `other-routing-engine` controlan qué RE se reinicia. Reiniciar interrumpe todo el tráfico a través del dispositivo en la mayoría de las plataformas con un solo RE, así que prográmalo en una ventana de mantenimiento.",
   "`request system halt` detiene el software de forma ordenada pero deja el hardware encendido. El dispositivo termina en un prompt del boot-loader en la consola, esperando. Para traerlo de vuelta normalmente presionas una tecla en la consola para arrancar, o apagas y enciendes la alimentación. Halt es la opción correcta cuando necesitas quitar la alimentación físicamente después, por ejemplo para mover un dispositivo, porque los sistemas de archivos ya están cerrados de forma segura cuando desconectas el cable.",
   "`request system power-off` apaga el software de forma ordenada y luego corta la alimentación, en hardware que soporta alimentación controlada por software. El dispositivo permanece apagado hasta que alguien lo encienda físicamente de nuevo, así que ten mucho cuidado al usarlo en un dispositivo remoto al que no puedes llegar.",
   "```\nuser@R1> request system reboot in 5 message \"Maintenance reboot\"\nReboot the system in 5 minutes? [yes,no] (no) yes\nuser@R1> clear system reboot\n```",
   "La opción `message` difunde un aviso a los demás usuarios conectados para que no se lleven una sorpresa. Después de cualquier reinicio, `show system uptime` te dice cuándo arrancó el sistema, y `show chassis routing-engine` muestra el motivo del último reinicio, lo que es útil para confirmar si un reinicio fue planificado o causado por una falla.",
   "Una forma sencilla de recordar los tres: reboot vuelve solo, halt se detiene y espera con la alimentación encendida, y power-off se detiene y corta la alimentación. En sistemas con doble RE, los comandos se aplican al RE en el que iniciaste sesión, a menos que especifiques otra cosa."
  ],
  "terms": [
   [
    "request system reboot",
    "Apaga de forma ordenada y reinicia el dispositivo, opcionalmente a una hora programada."
   ],
   [
    "request system halt",
    "Detiene el software de forma ordenada dejando la alimentación encendida, para que el dispositivo pueda desconectarse con seguridad o reiniciarse desde la consola."
   ],
   [
    "request system power-off",
    "Apaga de forma ordenada y corta la alimentación del dispositivo; permanece apagado hasta que se enciende físicamente."
   ],
   [
    "clear system reboot",
    "Cancela un reinicio programado pendiente."
   ]
  ],
  "example": "Un técnico necesita mover un router de sucursal a un nuevo rack. El ingeniero en la consola ejecuta `request system halt`, espera el prompt del boot-loader que muestra que el sistema se detuvo, y le dice al técnico que es seguro desconectar la alimentación. Después del traslado, el router arranca normalmente sin reparación del sistema de archivos.",
  "tip": "Conoce el resultado de cada comando: reboot reinicia automáticamente, halt se detiene pero queda encendido, power-off corta la alimentación. Nunca desconectes la alimentación de un dispositivo en funcionamiento sin hacer halt primero.",
  "check": [
   [
    "Quieres desconectar físicamente un router de forma segura. ¿Qué comando ejecutas primero?",
    "`request system halt` (o `request system power-off`), para que los sistemas de archivos se cierren antes de quitar la alimentación."
   ],
   [
    "¿Cómo cancelas un reinicio que programaste para esta noche?",
    "`clear system reboot`."
   ]
  ]
 },
 {
  "t": "Root password recovery from the console using recovery (single-user) mode",
  "tt": "Recuperación de la contraseña de root desde la consola usando el modo de recuperación (single-user)",
  "body": [
   "Si nadie conoce la contraseña de root y ninguna otra cuenta de administrador funciona, igual puedes recuperar el control de un dispositivo Junos, pero solo con acceso físico a su puerto de consola. Este es un diseño deliberado: el procedimiento de recuperación demuestra que estás físicamente presente, por eso el acceso a la consola y la sala donde está el dispositivo deben estar protegidos. Los prompts exactos varían según la plataforma y la generación de Junos, así que toma esto como el flujo general y sigue el procedimiento documentado para tu modelo.",
   "Paso 1: Conecta una terminal o laptop al puerto de consola (normalmente 9600 baudios, 8 bits de datos, sin paridad, 1 bit de parada) y reinicia o apaga y enciende el dispositivo. Paso 2: Observa los mensajes de arranque e interrumpe el arranque normal en el loader. En muchos dispositivos ves un prompt como 'Hit [Enter] to boot immediately, or space bar for command prompt'; presionar la barra espaciadora te da un prompt del loader. En algunas plataformas más nuevas, en cambio, eliges una entrada de recuperación o de single-user en un menú de arranque.",
   "Paso 3: Arranca en modo single-user. En el prompt del loader clásico esto es `boot -s`. El sistema arranca solo con los servicios mínimos y luego te pide que ingreses una ruta completa para un shell o 'recovery' para la recuperación de la contraseña de root. Paso 4: Escribe `recovery`. Junos inicia el proceso de gestión y te deja en el CLI en modo operacional como root, sin pedir contraseña.",
   "```\nloader> boot -s\n...\nEnter full pathname of shell or 'recovery' for root password recovery or RETURN for /bin/sh: recovery\n...\nroot> configure\nroot# set system root-authentication plain-text-password\nNew password:\nRetype new password:\nroot# commit\nroot# exit\nroot> exit\n```",
   "Paso 5: Entra al modo de configuración, establece una nueva contraseña de root con `set system root-authentication plain-text-password` y haz commit. Es un commit normal, así que cualquier otro error de la configuración debe resolverse primero. Paso 6: Sal del CLI y, cuando se te pida, confirma que quieres reiniciar. El dispositivo arranca normalmente con su configuración existente y la nueva contraseña de root. Solo cambió la contraseña de root; el resto de la configuración queda intacto.",
   "Desde el punto de vista de la seguridad, este procedimiento recuerda que el acceso físico es poderoso. Puedes hacer más difícil la recuperación con `set system ports console insecure`. Cuando la consola está marcada como insecure, entrar al modo single-user requiere la contraseña de root, lo que bloquea este camino de recuperación. Usa ese ajuste solo si tienes otra forma de recuperarte, porque una contraseña olvidada en un dispositivo con consola insecure puede requerir un restablecimiento mucho más disruptivo. Otros controles incluyen racks con llave, servidores de consola con su propia autenticación y el registro del acceso a la consola.",
   "Por último, guarda las credenciales de root y de emergencia en un gestor de contraseñas (password vault) adecuado para que la recuperación rara vez sea necesaria, y cámbialas cuando el personal se vaya."
  ],
  "terms": [
   [
    "Single-user mode (modo single-user)",
    "Un estado de arranque mínimo, al que se entra desde el loader (por ejemplo con `boot -s`), usado para tareas de recuperación."
   ],
   [
    "recovery",
    "La palabra clave que se escribe en el prompt de single-user para iniciar el CLI de Junos como root para la recuperación de la contraseña."
   ],
   [
    "root-authentication",
    "La sentencia de configuración de `system` que contiene la contraseña del usuario root; debe establecerse antes de cualquier commit."
   ],
   [
    "console insecure",
    "Un ajuste de `system ports console` que exige la contraseña de root para entrar al modo single-user, bloqueando la recuperación de contraseña por consola."
   ]
  ],
  "example": "El único ingeniero de redes de una pequeña empresa se va sin entregar la contraseña de root del firewall. Un consultor visita el sitio, se conecta a la consola, reinicia, interrumpe el loader, arranca en modo single-user, escribe `recovery`, establece una nueva contraseña de root y hace commit. Después de un reinicio, el dispositivo funciona normalmente con su configuración original.",
  "tip": "La recuperación de contraseña requiere acceso físico a la consola y termina con un commit normal de la nueva contraseña de root. Marcar la consola como `insecure` impide este método de recuperación.",
  "check": [
   [
    "¿Qué debes escribir en el prompt de single-user para llegar al CLI de Junos y recuperar la contraseña?",
    "`recovery`."
   ],
   [
    "¿Qué ajuste impediría que alguien con acceso a la consola use este procedimiento de recuperación?",
    "`set system ports console insecure`, que hace que el modo single-user requiera la contraseña de root."
   ],
   [
    "¿La recuperación de contraseña borra el resto de la configuración?",
    "No. Solo cambia la contraseña de root; la configuración existente se conserva."
   ]
  ]
 },
 {
  "t": "Saving and restoring a rescue configuration",
  "tt": "Guardar y restaurar una configuración de rescate",
  "body": [
   "Una configuración de rescate (rescue configuration) es tu respaldo personal en buen estado conocido. Normalmente es una configuración mínima que garantiza darte acceso de gestión al dispositivo: la contraseña de root, una dirección en la interfaz de gestión, una ruta por defecto, SSH y quizás una cuenta de login. Su trabajo no es hacer funcionar toda la red; su trabajo es permitirte volver a entrar cuando todo lo demás salió mal.",
   "La creas desde el modo operacional guardando la configuración activa actual: `request system configuration rescue save`. Junos la guarda en un archivo dedicado (en la mayoría de las plataformas bajo /config como rescue.conf.gz). Como se guarda a partir de la configuración activa, el enfoque común es guardarla cuando el dispositivo está en un estado limpio y estable, o hacer commit de una configuración de gestión reducida, guardarla como rescue y luego cargar la configuración completa. Puedes verla con `show system configuration rescue`.",
   "```\nuser@R1> request system configuration rescue save\nuser@R1> show system configuration rescue | match root-authentication\nuser@R1> request system configuration rescue delete\n```",
   "Para restaurarla, entra al modo de configuración y escribe `rollback rescue`. Como todo rollback, esto solo carga la configuración de rescate en la candidata, y debes hacer commit para activarla. La configuración de rescate no caduca como los rollbacks 1 a 49; los nuevos commits no la reemplazan. Solo cambia cuando guardas una nueva o la borras con `request system configuration rescue delete`.",
   "Muchos dispositivos Junos generan una alarma menor del sistema, 'Rescue configuration is not set', cuando no existe ninguna. Algunas plataformas más pequeñas, como ciertos dispositivos SRX de sucursal y EX, también permiten cargar la configuración de rescate con el botón físico Config o Reset del panel frontal. El comportamiento exacto del botón varía según el modelo, pero permite que alguien en el sitio restaure el acceso sin iniciar sesión.",
   "¿En qué se diferencia de los rollbacks numerados? Los rollbacks son automáticos y relativos: rollback 1 es siempre la configuración anterior al último commit, sea cual sea. La configuración de rescate es manual y absoluta: es lo que tú decidiste que era seguro. Después de una larga secuencia de cambios en la que no estás seguro de cuál rollback fue el último que funcionaba, la configuración de rescate te da un punto de partida conocido.",
   "Mantenla actualizada. Si cambias la dirección de gestión, las cuentas de administrador o la contraseña de root, guarda también una nueva configuración de rescate, o el respaldo podría no dejarte entrar cuando lo necesites."
  ],
  "terms": [
   [
    "request system configuration rescue save",
    "Guarda la configuración activa actual como configuración de rescate."
   ],
   [
    "rollback rescue",
    "Carga la configuración de rescate en la candidata; un commit la activa."
   ],
   [
    "request system configuration rescue delete",
    "Elimina la configuración de rescate guardada."
   ],
   [
    "Rescue alarm (alarma de rescate)",
    "Una alarma menor del sistema que muchos dispositivos generan cuando no se ha guardado una configuración de rescate."
   ]
  ],
  "example": "Después de una larga noche de cambios de firewall y enrutamiento, una ingeniera pierde el acceso SSH a un router remoto, pero todavía puede llegar a él a través de un servidor de consola fuera de banda. Sin saber qué rollback es seguro, escribe `configure`, `rollback rescue` y `commit`. El router vuelve a su configuración de gestión mínima, y ella reconstruye los cambios de producción con cuidado a partir de un archivo guardado.",
  "tip": "Guardar es un comando `request` del modo operacional, pero restaurar es `rollback rescue` en modo de configuración seguido de commit. Una configuración de rescate faltante aparece en `show system alarms`.",
  "check": [
   [
    "¿Qué comando guarda la configuración de rescate?",
    "`request system configuration rescue save` en modo operacional."
   ],
   [
    "Después de escribir `rollback rescue`, ¿está activa la configuración de rescate?",
    "No hasta que hagas commit; rollback solo la carga en la candidata."
   ]
  ]
 },
 {
  "t": "NTP, SNMP and remote syslog for ongoing operations",
  "tt": "NTP, SNMP y syslog remoto para las operaciones del día a día",
  "body": [
   "Configurar NTP, SNMP y syslog una vez es solo el comienzo. En las operaciones diarias necesitas confirmar que están funcionando, mantenerlos seguros y usarlos para detectar problemas antes que los usuarios. Esta lección se enfoca en verificar y usar estos servicios.",
   "Para NTP, los comandos clave de verificación son `show ntp associations` y `show ntp status`. La salida de associations lista cada servidor configurado con su stratum, alcanzabilidad y desfase (offset). Un asterisco (`*`) delante de un servidor significa que el dispositivo está sincronizado con él. Si ningún servidor tiene asterisco, el reloj no está sincronizado, quizás porque el servidor no es alcanzable, un firewall filter bloquea el puerto UDP 123 o el reloj estaba demasiado desfasado. `show system uptime` muestra la hora actual. Configura al menos dos o tres servidores para tener redundancia, y usa `source-address` si los servidores solo aceptan solicitudes de ciertas direcciones. Se pueden agregar claves de autenticación NTP para que el dispositivo solo confíe en fuentes de hora genuinas.",
   "```\nuser@R1> show ntp associations\n     remote           refid      st t when poll reach   delay   offset  jitter\n==============================================================================\n*192.0.2.10      .GPS.            1 u   33   64  377    1.022    0.114   0.050\n 192.0.2.11      192.0.2.10       2 u   40   64  377    1.305    0.240   0.071\n```",
   "Para SNMP, el dispositivo ejecuta un agente que responde a las consultas (get requests) de un sistema de gestión de red y envía traps cuando ocurren eventos, como un enlace que se cae o una alarma del chasis. Las consultas se autorizan con community strings en SNMPv2c o con usuarios con ajustes de autenticación y privacidad (cifrado) en SNMPv3. Los traps se definen con `set snmp trap-group <name> targets <address>` y una lista de categorías. `show snmp statistics` muestra los conteos de solicitudes, respuestas y traps, lo que ayuda a demostrar si el sistema de monitoreo realmente está llegando al dispositivo. Restringe el acceso con listas `clients` y autorización de solo lectura, y protege el Routing Engine con un firewall filter que solo permita SNMP desde los servidores de monitoreo.",
   "Para el syslog remoto, `set system syslog host <address> <facility> <severity>` envía los eventos a un servidor central por el puerto UDP 514 por defecto. El registro central importa porque los logs locales rotan y se pierden si el dispositivo falla, y porque un equipo de seguridad necesita los eventos de todos los dispositivos en un solo lugar para correlacionar incidentes. Las opciones útiles incluyen `source-address`, para que los logs siempre provengan de la dirección de loopback, y `structured-data`, para un formato más legible por máquinas. Combinar el syslog remoto con una hora NTP exacta es lo que hace confiables a los logs.",
   "Un buen hábito operativo es una revisión periódica: ¿están sincronizados los servidores NTP?, ¿el sistema de monitoreo sigue consultando (los contadores SNMP aumentan)?, ¿están llegando eventos recientes al servidor de logs? Un servidor de logs silencioso podría significar que todo está bien, o que el dispositivo dejó de enviar."
  ],
  "terms": [
   [
    "show ntp associations",
    "Lista los servidores NTP con stratum, alcanzabilidad y desfase; `*` marca el servidor con el que el dispositivo está sincronizado."
   ],
   [
    "SNMP trap",
    "Un mensaje no solicitado del agente SNMP del dispositivo hacia un sistema de gestión sobre un evento."
   ],
   [
    "SNMPv3",
    "Una versión de SNMP que agrega autenticación basada en usuarios y cifrado."
   ],
   [
    "source-address",
    "Una opción para servicios como syslog y NTP que fija la IP de origen de los paquetes salientes, a menudo en la loopback."
   ]
  ],
  "example": "Un analista de seguridad nota un hueco en los logs del firewall de un sitio. El ingeniero de red revisa el router y encuentra que `show ntp associations` no tiene `*` y que el host syslog está configurado, pero un nuevo filtro de lo0 está bloqueando el tráfico NTP de retorno. Después de permitir NTP en el filtro, el reloj se sincroniza y los logs con marcas de tiempo exactas vuelven a llegar al servidor central.",
  "tip": "Un asterisco en `show ntp associations` significa sincronizado. El agente responde las consultas SNMP y envía los traps por iniciativa propia; SNMPv3 agrega autenticación y cifrado, que v2c no tiene.",
  "check": [
   [
    "¿Cómo puedes saber, a partir de `show ntp associations`, que el dispositivo está sincronizado?",
    "Un servidor está marcado con un asterisco (`*`)."
   ],
   [
    "¿Por qué enviar syslog a un servidor remoto en lugar de depender solo de los archivos locales?",
    "Los logs locales rotan y pueden perderse junto con el dispositivo, y los logs centrales permiten correlacionar entre muchos dispositivos."
   ],
   [
    "¿Qué versión de SNMP ofrece cifrado?",
    "SNMPv3."
   ]
  ]
 },
 {
  "t": "Packet forwarding decisions: longest-prefix match, next hops, active vs inactive routes (`*`)",
  "tt": "Decisiones de reenvío de paquetes: coincidencia del prefijo más largo, siguientes saltos, rutas activas vs inactivas (`*`)",
  "body": [
   "El trabajo central de un router es decidir, para cada paquete, a dónde enviarlo a continuación. Junos toma esa decisión en dos etapas. El Routing Engine reúne las rutas de todas las fuentes (interfaces directamente conectadas, configuración estática y protocolos de enrutamiento) en tablas de enrutamiento y elige la mejor ruta para cada prefijo de destino. Esas mejores rutas se copian a la tabla de reenvío, que el Packet Forwarding Engine (PFE) usa para reenviar los paquetes a alta velocidad.",
   "Cuando llega un paquete, la decisión de reenvío usa la coincidencia del prefijo más largo (longest-prefix match). El router compara la dirección de destino con todos los prefijos de la tabla de reenvío y elige el más específico que la contiene, es decir, el que tiene la longitud de prefijo más larga. Supongamos que la tabla tiene 0.0.0.0/0, 10.0.0.0/8 y 10.1.1.0/24. Un paquete hacia 10.1.1.7 coincide con los tres, pero /24 es el más largo, así que esa ruta gana. Un paquete hacia 10.2.3.4 coincide con la /8 y con la ruta por defecto y usa la /8. Un paquete hacia 8.8.8.8 coincide solo con la ruta por defecto. La coincidencia más larga siempre gana sobre la preferencia de ruta o la métrica, porque estas solo comparan rutas hacia el mismo prefijo.",
   "Cada ruta apunta a un siguiente salto (next hop): la dirección del router vecino y la interfaz de salida. También existen siguientes saltos especiales. Una ruta local (/32 para la propia dirección del dispositivo) sube los paquetes al Routing Engine. Un siguiente salto discard descarta los paquetes en silencio, y un siguiente salto reject los descarta y envía un mensaje ICMP unreachable. Cuando existen varios siguientes saltos iguales, una ruta puede listar más de uno.",
   "Ahora la idea de activa frente a inactiva. Para un solo prefijo, Junos puede aprender varias rutas, por ejemplo una ruta estática y una ruta OSPF hacia 10.5.0.0/16. Solo una de ellas se convierte en la ruta activa, elegida principalmente por la preferencia de ruta (menor es mejor) y luego por criterios de desempate como la métrica. La ruta activa es la única que se coloca en la tabla de reenvío. En la salida de `show route`, la ruta activa se marca con un asterisco `*`. También puedes ver `+` para la ruta activa y `-` para la ruta activa anterior, que aparecen en la línea de leyenda en la parte superior de la salida.",
   "```\nuser@R1> show route 10.5.0.0/16\ninet.0: 12 destinations, 13 routes (12 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n10.5.0.0/16  *[Static/5] 00:12:40\n              >  to 10.1.12.2 via ge-0/0/1.0\n              [OSPF/10] 00:03:11, metric 20\n              >  to 10.1.13.2 via ge-0/0/2.0\n```",
   "Las rutas inactivas no son inútiles; son respaldos. Si la ruta activa desaparece, la siguiente mejor ruta para ese prefijo se vuelve activa y se instala en la tabla de reenvío. El símbolo `>` marca el siguiente salto realmente seleccionado cuando una ruta tiene más de uno. Para ver exactamente lo que está usando el PFE, ejecuta `show route forwarding-table destination 10.5.1.1`."
  ],
  "terms": [
   [
    "Longest-prefix match (coincidencia del prefijo más largo)",
    "La regla de reenvío que elige el prefijo coincidente más específico para una dirección de destino."
   ],
   [
    "Next hop (siguiente salto)",
    "La dirección vecina y la interfaz de salida hacia donde se envía un paquete."
   ],
   [
    "Active route (ruta activa)",
    "La única mejor ruta para un prefijo, marcada con `*` en `show route`, y la única instalada en la tabla de reenvío."
   ],
   [
    "Forwarding table (tabla de reenvío)",
    "La tabla construida a partir de las rutas activas que el Packet Forwarding Engine usa para reenviar paquetes."
   ]
  ],
  "example": "Un router tiene una ruta por defecto hacia un ISP y una ruta estática para 172.16.0.0/12 hacia un socio. Un servidor envía tráfico a 172.16.40.9. Aunque la ruta por defecto también coincide, la /12 es más específica, así que el paquete va hacia el socio. El tráfico hacia cualquier dirección pública cae en la ruta por defecto.",
  "tip": "La coincidencia más larga se decide primero; la preferencia solo elige entre rutas hacia exactamente el mismo prefijo. El `*` marca la ruta activa y `>` marca el siguiente salto seleccionado.",
  "check": [
   [
    "Un router tiene rutas hacia 10.0.0.0/8 (estática) y 10.20.0.0/16 (OSPF). ¿Cuál se usa para 10.20.5.5?",
    "La /16 aprendida por OSPF, porque la coincidencia del prefijo más largo le gana a la preferencia."
   ],
   [
    "¿Qué significa un asterisco delante de una ruta en `show route`?",
    "Que es la ruta activa para ese prefijo y está instalada en la tabla de reenvío."
   ],
   [
    "¿Qué le pasa a una ruta inactiva cuando se retira la ruta activa?",
    "Puede convertirse en la nueva ruta activa e instalarse en la tabla de reenvío."
   ]
  ]
 },
 {
  "t": "Routing tables: inet.0, inet6.0, inet.3, and instance tables such as vr1.inet.0",
  "tt": "Tablas de enrutamiento: inet.0, inet6.0, inet.3 y tablas de instancias como vr1.inet.0",
  "body": [
   "Junos no guarda todas las rutas en una sola tabla. Mantiene tablas de enrutamiento separadas para distintas familias de direcciones y propósitos, cada una con un nombre que te dice qué contiene. Conocer los nombres te ayuda a leer la salida de `show route` y a entender por qué una ruta aparece en un lugar pero no en otro.",
   "`inet.0` es la tabla principal de enrutamiento unicast IPv4. Las redes directamente conectadas, las rutas estáticas y las rutas IPv4 de OSPF, RIP y BGP van aquí por defecto, y es la tabla que se usa para reenviar el tráfico IPv4 normal. Cuando ejecutas `show route` sin opciones, la mayor parte de lo que ves es inet.0.",
   "`inet6.0` es la tabla unicast IPv6. Aquí se guardan las rutas IPv6 conectadas, estáticas y dinámicas (OSPFv3, BGP con IPv6, etc.). La ves con `show route table inet6.0`.",
   "`inet.3` contiene rutas IPv4 hacia los puntos de salida de los label-switched paths (LSP) de MPLS (Multiprotocol Label Switching), normalmente las direcciones de loopback de otros routers alcanzables por un LSP. No se usa para reenviar paquetes IP comunes directamente. En cambio, BGP la usa al resolver siguientes saltos: si un siguiente salto BGP es alcanzable a través de un LSP en inet.3, el tráfico para esa ruta BGP se envía por el túnel MPLS. La verás más en certificaciones posteriores, pero debes reconocer el nombre. Otras tablas que puedes ver incluyen `mpls.0` para las entradas de conmutación de etiquetas, `inet.1` para la caché de reenvío multicast e `inet.2` para las verificaciones de ruta inversa de multicast.",
   "Las instancias de enrutamiento tienen sus propias tablas. Sus nombres siguen el patrón nombre-de-instancia punto familia punto número. Una instancia llamada `vr1` tiene `vr1.inet.0` para IPv4 y `vr1.inet6.0` para IPv6. Las interfaces colocadas en esa instancia, y las rutas configuradas o aprendidas en ella, aparecen solo en sus tablas, no en la inet.0 principal. Esta separación es lo que te permite ejecutar múltiples dominios de enrutamiento independientes en un solo dispositivo.",
   "```\nuser@R1> show route table vr1.inet.0\nvr1.inet.0: 3 destinations, 3 routes (3 active, 0 holddown, 0 hidden)\n192.168.50.0/24    *[Direct/0] 01:02:03\n                    >  via ge-0/0/3.0\n192.168.50.1/32    *[Local/0] 01:02:03\n                       Local via ge-0/0/3.0\n```",
   "La línea de encabezado de cada tabla muestra los destinos, las rutas y los conteos de rutas activas, en holddown y ocultas (hidden). Las rutas ocultas son las que Junos no puede usar, por ejemplo porque el siguiente salto no se puede resolver o una política las rechazó; puedes verlas con `show route hidden`. `show route summary` da un conteo rápido de rutas por tabla y por protocolo, lo cual es una buena forma de ver de un vistazo qué tablas existen en un dispositivo."
  ],
  "terms": [
   [
    "inet.0",
    "La tabla principal de enrutamiento unicast IPv4."
   ],
   [
    "inet6.0",
    "La tabla de enrutamiento unicast IPv6."
   ],
   [
    "inet.3",
    "Una tabla IPv4 de direcciones de salida de LSP MPLS, usada principalmente para la resolución de siguientes saltos de BGP."
   ],
   [
    "Instance table (tabla de instancia)",
    "Una tabla de enrutamiento que pertenece a una instancia de enrutamiento, con un nombre como `vr1.inet.0`."
   ]
  ],
  "example": "Una ingeniera pone una interfaz de Wi-Fi para invitados en una instancia virtual-router llamada GUEST. Las rutas de los invitados aparecen en GUEST.inet.0 y nunca se mezclan con las rutas corporativas de inet.0. Cuando necesita probar desde el lado de invitados, ejecuta `ping 8.8.8.8 routing-instance GUEST` para que el ping use la tabla de la instancia.",
  "tip": "Aprende el patrón de nombres: familia (inet o inet6) más un número, con las tablas de instancias precedidas por el nombre de la instancia. inet.3 es para la resolución de siguientes saltos MPLS, no para el reenvío IP común.",
  "check": [
   [
    "¿Qué tabla guarda las rutas unicast IPv6?",
    "inet6.0."
   ],
   [
    "¿Qué tabla contendría las rutas IPv4 de una instancia de enrutamiento llamada CUST-A?",
    "CUST-A.inet.0."
   ],
   [
    "¿Qué comando da un conteo rápido de rutas en cada tabla?",
    "`show route summary`."
   ]
  ]
 },
 {
  "t": "Route preference values: direct/local 0, static 5, OSPF internal 10, RIP 100, aggregate/generated 130, OSPF external 150, BGP 170",
  "tt": "Valores de preferencia de ruta: direct/local 0, static 5, OSPF interno 10, RIP 100, aggregate/generated 130, OSPF externo 150, BGP 170",
  "body": [
   "Cuando Junos aprende más de una ruta hacia exactamente el mismo prefijo desde fuentes distintas, debe elegir una para hacerla activa. El primer y más importante criterio es la preferencia de ruta (route preference), un número asignado a cada fuente de enrutamiento. Otros fabricantes llaman a la misma idea distancia administrativa (administrative distance). La regla es simple: cuanto más baja la preferencia, más confiable es la ruta, así que gana el valor más bajo.",
   "Los valores por defecto que necesitas conocer son: rutas Direct y Local 0; Static 5; rutas OSPF internas 10; RIP 100; rutas Aggregate y Generated 130; rutas OSPF externas (AS external) 150; y BGP 170, tanto para BGP interno como externo. También existen rutas IS-IS internas con valores entre OSPF y RIP (15 para Level 1 y 18 para Level 2), pero la lista anterior es el núcleo del objetivo del examen.",
   "El orden refleja la confianza. Las redes directamente conectadas son hechos, así que reciben 0. Una ruta estática es una instrucción deliberada de un administrador, así que recibe 5. Las rutas OSPF internas se aprenden dentro de tu propia red con conocimiento completo de la topología, así que siguen en la lista. RIP es más antiguo y menos preciso. Las rutas aggregate son resúmenes que tú creas. Las rutas OSPF externas son rutas que se redistribuyeron en OSPF desde otra parte, así que se confía menos en ellas que en las internas. Las rutas BGP normalmente vienen de fuera de tu red, así que tienen el valor por defecto más alto.",
   "Recuerda que la preferencia solo compara rutas hacia el mismo prefijo. Nunca reemplaza a la coincidencia del prefijo más largo. Si tienes una ruta estática hacia 10.0.0.0/8 (preferencia 5) y una ruta BGP hacia 10.1.0.0/16 (preferencia 170), ambas están activas por derecho propio, y un paquete hacia 10.1.2.3 usa la ruta BGP, más específica.",
   "```\n10.5.0.0/16  *[Static/5] 00:12:40\n              >  to 10.1.12.2 via ge-0/0/1.0\n              [OSPF/150] 00:03:11, metric 20, tag 0\n              >  to 10.1.13.2 via ge-0/0/2.0\n```",
   "En `show route`, la preferencia se muestra entre corchetes junto al protocolo, como `[Static/5]` o `[OSPF/150]`, lo que te dice que la ruta OSPF de arriba es una externa. Si la preferencia empata, Junos pasa a los criterios de desempate, como la métrica del protocolo.",
   "Puedes cambiar la preferencia. A una ruta estática se le puede dar `preference 200` para que pierda frente a una ruta dinámica y solo tome el control cuando la ruta dinámica desaparezca, lo que se llama una ruta estática flotante (floating static route). OSPF permite los ajustes `preference` y `external-preference`, y la política de enrutamiento puede establecer la preferencia con la acción `then preference`. Cambiar los valores por defecto debe hacerse de forma deliberada y consistente, porque cambia qué camino toma cada paquete."
  ],
  "terms": [
   [
    "Route preference (preferencia de ruta)",
    "Un número asignado a cada fuente de rutas en Junos; para el mismo prefijo, el valor más bajo se vuelve activo."
   ],
   [
    "OSPF internal route (ruta OSPF interna)",
    "Una ruta aprendida desde dentro del dominio OSPF, con preferencia por defecto 10."
   ],
   [
    "OSPF external route (ruta OSPF externa)",
    "Una ruta redistribuida en OSPF desde otra fuente, con preferencia por defecto 150."
   ],
   [
    "Floating static route (ruta estática flotante)",
    "Una ruta estática con una preferencia elevada para que se use solo cuando falta una ruta mejor."
   ]
  ],
  "example": "Un router aprende 172.20.0.0/16 por OSPF desde dentro de la red (preferencia 10) y el mismo prefijo por BGP desde un socio (preferencia 170). La ruta OSPF está activa y el tráfico se mantiene en el camino interno. Cuando el enlace interno falla y la ruta OSPF desaparece, la ruta BGP se vuelve activa automáticamente.",
  "tip": "Memoriza la lista en orden: 0, 5, 10, 100, 130, 150, 170. La trampa clásica es comparar OSPF externo (150) con RIP (100): gana RIP. Otra trampa es olvidar que la coincidencia más larga va antes que la preferencia.",
  "check": [
   [
    "Un prefijo se aprende por RIP y como ruta OSPF externa. ¿Cuál está activa por defecto?",
    "RIP, con preferencia 100, le gana a OSPF externo con 150."
   ],
   [
    "¿Cuál es la preferencia por defecto de las rutas BGP internas y externas en Junos?",
    "170."
   ],
   [
    "¿Qué significa `[Static/5]` en la salida de `show route`?",
    "Que la ruta vino de una ruta estática y tiene preferencia 5."
   ]
  ]
 },
 {
  "t": "Routing instances: virtual-router, forwarding and VRF types",
  "tt": "Instancias de enrutamiento: tipos virtual-router, forwarding y VRF",
  "body": [
   "Una instancia de enrutamiento (routing instance) es una colección separada de tablas de enrutamiento, interfaces y ajustes de protocolos de enrutamiento dentro de un solo dispositivo Junos. Por defecto todo vive en la instancia master (por defecto), que usa inet.0 e inet6.0. Las instancias adicionales te permiten ejecutar dominios de enrutamiento independientes lado a lado, con sus propias tablas como `vr1.inet.0`. El tipo de separación que obtienes depende del `instance-type` que elijas.",
   "El tipo virtual-router es la forma más simple de dividir un dispositivo en varios routers independientes. Le asignas interfaces, y puedes ejecutar rutas estáticas y protocolos como OSPF o BGP dentro de él. Sus rutas se quedan en su propia tabla y no se mezclan con la instancia por defecto, a menos que las filtres (leak) deliberadamente. No hay señalización de VPN MPLS involucrada. Los usos típicos son separar el tráfico de invitados y el corporativo, aislar una red de gestión o construir un laboratorio con varios routers en un solo equipo.",
   "```\nset routing-instances vr1 instance-type virtual-router\nset routing-instances vr1 interface ge-0/0/3.0\nset routing-instances vr1 routing-options static route 0.0.0.0/0 next-hop 192.168.50.254\n```",
   "El tipo forwarding se usa para el reenvío basado en filtros (FBF, filter-based forwarding), también llamado enrutamiento basado en políticas (policy-based routing). Una instancia forwarding tiene su propia tabla de enrutamiento pero no tiene interfaces propias. Un firewall filter en una interfaz de entrada hace coincidencia con cierto tráfico (por ejemplo, por dirección de origen) y usa la acción `routing-instance` para enviarlo a la instancia forwarding, que luego busca el paquete en su propia tabla. Esto te permite enviar el tráfico de un departamento por un ISP diferente al del resto de la red, aunque el destino sea el mismo. Para que las rutas de interfaz estén disponibles en la tabla de la instancia forwarding, los diseños FBF normalmente las comparten usando un RIB group.",
   "El tipo vrf (VPN routing and forwarding) lo usan los proveedores de servicios para VPN de Capa 3 sobre MPLS. Como un virtual router, tiene sus propias interfaces y tabla de enrutamiento, pero además requiere un route distinguisher, que hace únicos los prefijos de cada cliente en toda la red del proveedor, y una comunidad VRF target (route target) o políticas de importación y exportación, que controlan qué rutas VPN se comparten entre sitios mediante BGP. Varios clientes pueden usar las mismas direcciones privadas sin conflicto porque cada uno vive en su propia VRF.",
   "Trabajas con instancias usando `show route table vr1.inet.0`, `show route instance` (que lista las instancias y sus tablas) y comandos de prueba con la opción `routing-instance`, como `ping 8.8.8.8 routing-instance vr1`. Recuerda que una interfaz puede pertenecer a una sola instancia a la vez. Existen otros tipos de instancia, para VPN de Capa 2 y virtual switches por ejemplo, pero los tres anteriores son los asociados al enrutamiento de Capa 3 en este nivel."
  ],
  "terms": [
   [
    "virtual-router",
    "Un tipo de instancia con sus propias interfaces y tabla de enrutamiento, usado para crear routers independientes en un dispositivo sin señalización VPN."
   ],
   [
    "forwarding instance (instancia forwarding)",
    "Un tipo de instancia con tabla de enrutamiento pero sin interfaces, usado con firewall filters para el reenvío basado en filtros."
   ],
   [
    "VRF",
    "Tipo de instancia VPN routing and forwarding usado para VPN de Capa 3 MPLS, que requiere un route distinguisher y un VRF target o políticas."
   ],
   [
    "Route distinguisher",
    "Un valor agregado a los prefijos VPN para mantener únicas las direcciones superpuestas de los clientes en la red del proveedor."
   ]
  ],
  "example": "El router de un hotel debe mantener el tráfico de los huéspedes lejos de sus sistemas de gestión de la propiedad. El ingeniero coloca la interfaz VLAN de los huéspedes en una instancia virtual-router con su propia ruta por defecto hacia un circuito de internet separado. Los huéspedes pueden navegar por la web, pero no existe ninguna ruta entre la tabla de huéspedes e inet.0, así que no pueden llegar a los sistemas internos.",
  "tip": "Asocia el tipo con el uso: virtual-router para una separación simple, forwarding para el reenvío basado en filtros (sin interfaces), vrf para VPN de Capa 3 MPLS con route distinguishers y targets.",
  "check": [
   [
    "¿Qué tipo de instancia no tiene interfaces y se usa con firewall filters para dirigir el tráfico?",
    "El tipo de instancia forwarding, usado para el reenvío basado en filtros."
   ],
   [
    "¿Qué dos cosas necesita una VRF que un virtual router no?",
    "Un route distinguisher y un VRF target (o políticas VRF de importación/exportación)."
   ],
   [
    "¿Cómo haces ping usando la tabla de una instancia de enrutamiento?",
    "`ping <address> routing-instance <name>`."
   ]
  ]
 },
 {
  "t": "Static routes: `routing-options static`, next-hop, qualified-next-hop with preference (floating routes), discard and reject",
  "tt": "Rutas estáticas: `routing-options static`, next-hop, qualified-next-hop con preferencia (rutas flotantes), discard y reject",
  "body": [
   "Una ruta estática es una ruta que configuras a mano. No se adapta sola a las fallas como lo hace un protocolo de enrutamiento, pero es simple, predecible y no usa sobrecarga de protocolo. Las rutas estáticas son comunes para las rutas por defecto hacia un ISP, para sitios stub con un solo enlace de subida y para caminos de respaldo. En Junos viven bajo `routing-options static` para la instancia por defecto, o bajo `routing-instances <name> routing-options static` para una instancia. La forma básica indica un prefijo y un siguiente salto, como se muestra a continuación.",
   "```\nset routing-options static route 0.0.0.0/0 next-hop 203.0.113.1\nset routing-options static route 10.50.0.0/16 next-hop 10.1.12.2\n```",
   "Por defecto, la dirección del siguiente salto debe estar en una subred directamente conectada. Si no es alcanzable a través de una interfaz directamente conectada, la ruta permanece inactiva (oculta) porque Junos no puede resolver qué interfaz usar. Si realmente necesitas un siguiente salto a varios saltos de distancia, la opción `resolve` permite que Junos lo resuelva a través de otras rutas, pero los siguientes saltos directamente conectados son el caso normal. Las rutas estáticas tienen una preferencia por defecto de 5. Puedes listar varias sentencias `next-hop` para la misma ruta; se tratan como siguientes saltos de igual costo. Un qualified next hop, en cambio, te permite darle a distintos siguientes saltos de la misma ruta su propia preferencia (y métrica). Así construyes un camino primario y uno de respaldo dentro de una sola ruta estática:",
   "```\nset routing-options static route 0.0.0.0/0 next-hop 203.0.113.1\nset routing-options static route 0.0.0.0/0 qualified-next-hop 198.51.100.1 preference 7\n```",
   "Aquí el next hop simple usa la preferencia 5 y es el preferido. Si la interfaz hacia 203.0.113.1 se cae, ese siguiente salto queda inutilizable y el qualified next hop con preferencia 7 toma el control. Una ruta estática flotante es la misma idea aplicada entre una ruta estática y un protocolo dinámico: le das a la ruta estática una preferencia más alta que la del protocolo, por ejemplo `set routing-options static route 10.50.0.0/16 next-hop 10.9.9.2 preference 200`. OSPF (10 o 150) e incluso BGP (170) ganan mientras están disponibles, y la ruta estática flota hasta volverse activa solo cuando la ruta dinámica desaparece.",
   "En lugar de un siguiente salto, una ruta estática puede apuntar a acciones especiales. `discard` descarta en silencio los paquetes que coinciden. `reject` los descarta y devuelve un mensaje ICMP destination unreachable al emisor. Ambos son útiles para enviar tráfico a un agujero negro (blackholing), por ejemplo para un prefijo resumen que anuncias, de modo que los paquetes hacia partes no usadas de él se descarten en lugar de entrar en bucle, o para detener el tráfico hacia un destino malicioso. Normalmente se prefiere discard hacia internet porque no genera mensajes ICMP que un atacante podría aprovechar o que agregan carga.",
   "Verifica con `show route protocol static` y comprueba que la ruta tenga el `*` de activa. Otras opciones que puedes ver incluyen `no-readvertise`, que evita que la ruta se exporte mediante la política de enrutamiento, y `retain`, que la mantiene en la tabla de reenvío si el proceso de enrutamiento se reinicia."
  ],
  "terms": [
   [
    "next-hop",
    "La dirección directamente conectada hacia la que reenvía una ruta estática; si no es alcanzable, la ruta no se puede usar."
   ],
   [
    "qualified-next-hop",
    "Un siguiente salto dentro de una ruta estática que tiene su propia preferencia o métrica, usado para caminos de respaldo."
   ],
   [
    "Floating static route (ruta estática flotante)",
    "Una ruta estática con una preferencia más alta que una ruta dinámica, para que se vuelva activa solo cuando la ruta dinámica desaparece."
   ],
   [
    "discard vs reject",
    "Ambos descartan los paquetes que coinciden; reject además envía un mensaje ICMP unreachable, discard se mantiene en silencio."
   ]
  ],
  "example": "Un router de sucursal tiene un enlace de fibra hacia el ISP principal y un enlace LTE más barato. El ingeniero configura una ruta por defecto con `next-hop` apuntando al gateway de fibra y un `qualified-next-hop` hacia el gateway LTE con preferencia 7. Cuando la interfaz de fibra se cae, la ruta por defecto usa LTE de inmediato, y vuelve a la fibra cuando esta se recupera.",
  "tip": "Un siguiente salto estático normalmente debe estar directamente conectado, o la ruta no se volverá activa. Una preferencia más alta convierte a una ruta en respaldo, y reject se diferencia de discard solo en que envía un ICMP unreachable.",
  "check": [
   [
    "Configuras una ruta estática cuyo siguiente salto está en una red remota, y no aparece como activa. ¿Por qué?",
    "Junos exige por defecto que el siguiente salto sea directamente alcanzable; sin `resolve`, el siguiente salto no se puede resolver."
   ],
   [
    "¿Cómo haces una ruta estática que se use solo si OSPF pierde su ruta hacia el mismo prefijo?",
    "Dale a la ruta estática una preferencia más alta que la de OSPF, como `preference 200`, creando una ruta estática flotante."
   ],
   [
    "¿Cuál es la diferencia entre discard y reject?",
    "Ambos descartan el tráfico; reject envía un ICMP unreachable al origen, discard descarta en silencio."
   ]
  ]
 },
 {
  "t": "Default routes and summarization (aggregate routes)",
  "tt": "Rutas por defecto y sumarización (rutas aggregate)",
  "body": [
   "Una ruta por defecto, escrita 0.0.0.0/0 para IPv4 y ::/0 para IPv6, coincide con cualquier destino porque su longitud de prefijo es cero. Gracias a la coincidencia del prefijo más largo, solo se usa cuando no existe una ruta más específica. Eso la convierte en la forma clásica de enviar todo el tráfico desconocido hacia un proveedor de internet o un router de núcleo. Puedes crearla como ruta estática (`set routing-options static route 0.0.0.0/0 next-hop 203.0.113.1`), aprenderla de un protocolo de enrutamiento o anunciarla en OSPF con una política de exportación para que otros routers la aprendan.",
   "La sumarización es la idea opuesta: en lugar de enviar muchas rutas específicas, anuncias un prefijo más amplio que las cubre. Si un sitio usa desde 10.20.0.0/24 hasta 10.20.255.0/24, puedes anunciar solo 10.20.0.0/16. La sumarización hace más pequeñas las tablas de enrutamiento, reduce el trabajo que hacen los routers cuando una sola subred oscila (porque el resumen se mantiene estable) y oculta el detalle interno a los vecinos.",
   "En Junos, un resumen se crea con una ruta aggregate bajo `routing-options aggregate`:",
   "```\nset routing-options aggregate route 10.20.0.0/16\nuser@R1> show route 10.20.0.0/16 exact detail\n```",
   "Una ruta aggregate se vuelve activa solo cuando existe al menos una ruta contribuyente. Una ruta contribuyente (contributing route) es cualquier ruta activa que es más específica que la aggregate y cae dentro de ella, como 10.20.5.0/24. Si todas las rutas contribuyentes desaparecen, la aggregate también desaparece, así no anuncias un resumen de redes que no son alcanzables. `show route 10.20.0.0/16 exact detail` lista las rutas contribuyentes.",
   "El siguiente salto de una ruta aggregate es reject por defecto. Puede parecer raro al principio, pero tiene sentido. El router reenvía los paquetes de una subred específica usando la ruta contribuyente más específica, gracias a la coincidencia más larga. Los paquetes que coinciden solo con la aggregate van a partes no usadas del rango, y descartarlos evita bucles de enrutamiento, por ejemplo entre tú y un vecino que tiene una ruta por defecto que apunta de vuelta hacia ti. Puedes cambiar la acción a `discard` para descartes silenciosos. Las rutas aggregate tienen una preferencia por defecto de 130.",
   "Crear una aggregate no la anuncia. Igual necesitas una política de enrutamiento que la exporte a OSPF o BGP, por ejemplo un término que coincida con `from protocol aggregate` y `route-filter 10.20.0.0/16 exact` con `then accept`. A menudo también quieres evitar que se anuncien las rutas específicas, para que solo salga el resumen.",
   "Junos también tiene rutas generated, configuradas bajo `routing-options generate`. También dependen de rutas contribuyentes y tienen preferencia 130, pero en lugar de reject toman el siguiente salto de la ruta contribuyente primaria. Las rutas generated se usan a menudo para crear una ruta por defecto condicional que existe solo mientras están presentes ciertas rutas aguas arriba."
  ],
  "terms": [
   [
    "Default route (ruta por defecto)",
    "La ruta 0.0.0.0/0 (o ::/0) que coincide con cualquier destino no cubierto por una ruta más específica."
   ],
   [
    "Aggregate route (ruta aggregate)",
    "Una ruta resumen bajo `routing-options aggregate`, activa solo cuando existe una ruta contribuyente, con un siguiente salto reject por defecto."
   ],
   [
    "Contributing route (ruta contribuyente)",
    "Una ruta activa y más específica que cae dentro de una ruta aggregate o generated y la mantiene activa."
   ],
   [
    "Generated route (ruta generated)",
    "Una ruta tipo resumen que toma el siguiente salto de su ruta contribuyente primaria en lugar de reject."
   ]
  ],
  "example": "Una oficina regional tiene 10.20.0.0/16, dividida en decenas de subredes /24. Su router de borde crea una aggregate para 10.20.0.0/16 y exporta solo esa en BGP hacia el núcleo. La tabla del núcleo contiene una ruta en lugar de decenas, y cuando una sola /24 oscila en la oficina, el núcleo no lo nota.",
  "tip": "Una aggregate necesita al menos una ruta contribuyente para estar activa, usa preferencia 130, tiene reject como siguiente salto por defecto y no se anuncia hasta que una política de exportación la envía.",
  "check": [
   [
    "¿Qué debe existir para que una ruta aggregate se vuelva activa?",
    "Al menos una ruta contribuyente activa y más específica dentro del rango de la aggregate."
   ],
   [
    "¿Qué le pasa a un paquete que coincide solo con la ruta aggregate y con ninguna ruta contribuyente?",
    "Se rechaza (se descarta con ICMP unreachable) por defecto, o se descarta en silencio si se configuró con discard."
   ],
   [
    "¿En qué se diferencia una ruta generated de una ruta aggregate?",
    "Una ruta generated usa el siguiente salto de su ruta contribuyente primaria en lugar de reject."
   ]
  ]
 },
 {
  "t": "Dynamic routing concepts: why IGPs and EGPs exist, OSPF and BGP at a high level",
  "tt": "Conceptos de enrutamiento dinámico: por qué existen los IGP y los EGP, OSPF y BGP a alto nivel",
  "body": [
   "Las rutas estáticas funcionan bien para un puñado de redes, pero no escalan y no reaccionan solas a las fallas. Los protocolos de enrutamiento dinámico permiten que los routers se digan entre sí qué redes pueden alcanzar, detecten fallas de enlaces y recalculen caminos automáticamente. Los protocolos se dividen en dos grupos según dónde operan con respecto a un sistema autónomo (AS, autonomous system), que es una red bajo un único control administrativo con su propia política de enrutamiento, normalmente identificada por un número de AS.",
   "Los protocolos de gateway interior (IGP, interior gateway protocols) corren dentro de un AS. Su objetivo es encontrar rápidamente el mejor camino dentro de una red que controlas y en la que confías. OSPF (Open Shortest Path First), IS-IS (Intermediate System to Intermediate System) y RIP (Routing Information Protocol) son IGP. Los protocolos de gateway exterior (EGP, exterior gateway protocols) corren entre sistemas autónomos, donde las prioridades son distintas: escalar al tamaño de internet, aplicar la política de negocio (qué vecino prefieres, qué estás dispuesto a transportar) y evitar bucles entre organizaciones. BGP (Border Gateway Protocol) es el EGP que se usa en internet.",
   "OSPF es un protocolo de estado de enlace (link-state). Cada router describe sus propios enlaces en anuncios de estado de enlace (LSA, link-state advertisements) y los inunda hacia todos los routers del área. Luego cada router construye el mismo mapa de la red, la base de datos de estado de enlace, y ejecuta el algoritmo SPF (shortest path first), también llamado algoritmo de Dijkstra, para calcular el camino de menor costo hacia cada destino. El costo se basa por defecto en el ancho de banda de la interfaz. Los vecinos OSPF se descubren entre sí con paquetes hello, y deben coincidir en parámetros como el área, los intervalos de hello y dead y la subred para formar una adyacencia. Para escalar, OSPF divide una red en áreas, con el área 0 como backbone al que se conectan todas las demás áreas. OSPF converge rápido y es muy adecuado para los núcleos empresariales y de proveedores de servicios.",
   "```\nset protocols ospf area 0.0.0.0 interface ge-0/0/1.0\nset protocols ospf area 0.0.0.0 interface lo0.0 passive\nuser@R1> show ospf neighbor\n```",
   "BGP es un protocolo de vector de ruta (path-vector). Los speakers BGP forman sesiones sobre el puerto TCP 179, y cada ruta anunciada lleva atributos, el más importante de los cuales es el AS path, que lista los sistemas autónomos por los que pasó la ruta. Un router que ve su propio AS en el camino rechaza la ruta, lo que evita bucles. Las sesiones BGP entre ASs diferentes son BGP externo (EBGP); las sesiones dentro de un AS son BGP interno (IBGP). BGP elige rutas mediante una secuencia de comparaciones de atributos en lugar de una sola métrica, lo que da a los operadores un control de políticas muy fino. Converge más lento que un IGP pero puede transportar cantidades muy grandes de rutas.",
   "En la práctica, los dos trabajan juntos. Un IGP como OSPF proporciona alcanzabilidad interna rápida (incluida la de las direcciones de loopback de otros routers), y BGP corre sobre él para intercambiar rutas externas y de clientes. En Junos, las rutas OSPF tienen preferencia 10 (internas) o 150 (externas), y las rutas BGP tienen 170."
  ],
  "terms": [
   [
    "Autonomous system (AS, sistema autónomo)",
    "Una red bajo un solo control administrativo con su propia política de enrutamiento, identificada por un número de AS."
   ],
   [
    "IGP",
    "Interior gateway protocol, como OSPF, IS-IS o RIP, usado dentro de un solo AS."
   ],
   [
    "EGP",
    "Exterior gateway protocol usado entre sistemas autónomos; BGP es el que se usa hoy."
   ],
   [
    "Link-state (estado de enlace)",
    "Un diseño de protocolo, usado por OSPF, donde los routers inundan información de enlaces y cada uno calcula los caminos con SPF."
   ],
   [
    "AS path",
    "Un atributo de BGP que lista los sistemas autónomos que cruzó una ruta, usado para evitar bucles y para la selección de caminos."
   ]
  ],
  "example": "Una universidad ejecuta OSPF en todo su campus para que el router de cada edificio encuentre rápidamente el mejor camino interno y redirija el tráfico alrededor de una fibra rota en segundos. En el borde, ejecuta EBGP con dos proveedores de internet para anunciar sus prefijos públicos y recibir rutas de internet, usando políticas para preferir un proveedor para el tráfico saliente.",
  "tip": "IGP significa dentro de un AS y se trata de convergencia rápida al mejor camino; EGP significa entre ASs y se trata de política y escala. OSPF es link-state con SPF y áreas; BGP es path-vector sobre TCP 179 con el AS path para evitar bucles.",
  "check": [
   [
    "¿OSPF es un IGP o un EGP, y qué algoritmo usa?",
    "Un IGP; usa el algoritmo SPF (Dijkstra) sobre su base de datos de estado de enlace."
   ],
   [
    "¿Qué transporte y qué puerto usa BGP?",
    "TCP puerto 179."
   ],
   [
    "¿Cómo evita BGP los bucles de enrutamiento entre sistemas autónomos?",
    "Un router rechaza las rutas cuyo AS path ya contiene su propio número de AS."
   ]
  ]
 },
 {
  "t": "Reading `show route`, `show route detail`, `show route protocol`, `show route table`",
  "tt": "Leer `show route`, `show route detail`, `show route protocol`, `show route table`",
  "body": [
   "`show route` es el comando que más usarás al diagnosticar el enrutamiento en Junos. Leer su salida con rapidez y de forma correcta es una habilidad central, y las preguntas del examen a menudo muestran un fragmento y preguntan qué significa.",
   "```\nuser@R1> show route\ninet.0: 9 destinations, 10 routes (9 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n\n0.0.0.0/0          *[Static/5] 2d 03:11:20\n                    >  to 203.0.113.1 via ge-0/0/0.0\n10.1.12.0/30       *[Direct/0] 2d 03:11:25\n                    >  via ge-0/0/1.0\n10.1.12.1/32       *[Local/0] 2d 03:11:25\n                       Local via ge-0/0/1.0\n10.255.0.2/32      *[OSPF/10] 00:41:02, metric 1\n                    >  to 10.1.12.2 via ge-0/0/1.0\n```",
   "Empieza por el encabezado. Nombra la tabla (inet.0) y da conteos: destinos (prefijos), rutas (un prefijo puede tener varias) y cuántas están activas, en holddown (siendo retiradas) y ocultas (hidden, inutilizables). Luego viene la leyenda de los símbolos. Cada entrada de ruta muestra después el prefijo, un `*` si está activa, el protocolo y la preferencia entre corchetes como `[OSPF/10]`, cuánto tiempo hace que se conoce la ruta, la métrica si la hay, y una o más líneas de siguiente salto. El `>` marca el siguiente salto en uso. Una ruta Direct es la subred de una interfaz, y una ruta Local es la propia dirección /32 del dispositivo en esa subred.",
   "Filtrar ayuda en dispositivos reales con miles de rutas. `show route 10.255.0.2` muestra la mejor coincidencia para esa dirección, mientras que `show route 10.0.0.0/8 exact` muestra solo ese prefijo exacto. `show route protocol ospf` (o static, bgp, direct, local, aggregate) muestra solo las rutas de esa fuente, lo que es una forma rápida de revisar lo que aporta un protocolo. `show route table inet6.0` o `show route table vr1.inet.0` muestra una tabla específica. `show route terse` muestra una vista compacta de una línea por ruta, y `show route hidden` lista las rutas que Junos no puede usar.",
   "`show route detail` (y el aún más largo `extensive`) explica por qué una ruta es como es. Para cada ruta ves su preferencia, el tipo de siguiente salto y la interfaz, el campo State (por ejemplo `<Active Int>` o `<Inactive reason>`), el Age, la Task que la instaló, la métrica, los announcement bits que muestran qué protocolos o procesos la usan y, para las rutas BGP, atributos como el AS path, la local preference y las communities. El Inactive reason es especialmente útil: te dice por qué perdió una ruta, por ejemplo frente a una ruta con mejor preferencia.",
   "Para BGP en particular, `show route receive-protocol bgp <neighbor>` muestra las rutas recibidas de un vecino y `show route advertising-protocol bgp <neighbor>` muestra lo que estás enviando. Estos te permiten revisar ambos lados de una política.",
   "Acostúmbrate a leer cada ruta en este orden: ¿está activa (`*`)?, ¿de dónde vino (protocolo y preferencia)?, ¿hacia dónde va (siguiente salto `>` e interfaz)? y ¿cuánto tiempo lleva ahí? Una antigüedad corta en una ruta importante a menudo revela un enlace que está oscilando."
  ],
  "terms": [
   [
    "Hidden route (ruta oculta)",
    "Una ruta que Junos conoce pero no puede usar, a menudo porque su siguiente salto no se puede resolver o una política la rechazó; se muestra con `show route hidden`."
   ],
   [
    "Direct route (ruta Direct)",
    "Una ruta hacia la subred configurada en una interfaz, con preferencia 0."
   ],
   [
    "Local route (ruta Local)",
    "Una ruta /32 (o /128) hacia la propia dirección de interfaz del dispositivo, con preferencia 0."
   ],
   [
    "show route detail",
    "Salida que agrega estado, antigüedad, task, motivo de inactividad y atributos de protocolo para cada ruta."
   ]
  ],
  "example": "Los usuarios reportan que un sitio remoto queda inalcanzable por unos segundos cada pocos minutos. `show route 10.44.0.0/16` muestra la ruta OSPF con una antigüedad de solo 00:00:37. Al revisar de nuevo más tarde, la antigüedad se reinició, así que la ruta está oscilando. El ingeniero revisa `show interfaces extensive` en el enlace hacia el sitio y encuentra que las transiciones de portadora están aumentando.",
  "tip": "Conoce cada símbolo: `*` activa, `>` siguiente salto seleccionado, los corchetes muestran protocolo/preferencia. Usa `protocol` para filtrar por fuente, `table` para elegir una tabla y `detail` para ver por qué una ruta está inactiva.",
  "check": [
   [
    "¿Qué comando muestra solo las rutas estáticas?",
    "`show route protocol static`."
   ],
   [
    "En la salida de `show route`, ¿qué indica `[OSPF/10]`?",
    "Que la ruta se aprendió de OSPF como ruta interna con preferencia 10."
   ],
   [
    "¿Dónde mirarías para ver por qué una ruta no está activa?",
    "`show route <prefix> detail` (o extensive), que muestra el motivo de inactividad."
   ]
  ]
 },
 {
  "t": "Routing policy uses: import (into the routing table) and export (out of the routing table)",
  "tt": "Usos de la política de enrutamiento: import (hacia la tabla de enrutamiento) y export (desde la tabla de enrutamiento)",
  "body": [
   "La política de enrutamiento (routing policy) es la forma de controlar qué rutas entran a la tabla de enrutamiento y qué rutas anuncia un dispositivo a los demás. En Junos, cada política se aplica en una de dos direcciones, y la dirección siempre se describe desde el punto de vista de la tabla de enrutamiento.",
   "Una política de importación (import policy) actúa sobre las rutas que vienen de un protocolo de enrutamiento hacia la tabla de enrutamiento. Decide qué rutas recibidas se aceptan y puede cambiar sus atributos, como la preferencia, la local preference, la métrica o las communities, antes de que se instalen. Por ejemplo, puedes rechazar el anuncio de un prefijo privado de un vecino BGP, o subir la local preference de las rutas de un proveedor preferido. Las políticas de importación se aplican bajo el protocolo, por ejemplo `set protocols bgp group ISP import FROM-ISP`.",
   "Una política de exportación (export policy) actúa sobre las rutas que salen de la tabla de enrutamiento hacia un protocolo de enrutamiento, para anunciarse a los vecinos. Decide qué rutas activas se anuncian y puede cambiar atributos a la salida. La política de exportación también es la forma en que funciona la redistribución en Junos: para anunciar rutas static, direct o aggregate en OSPF, escribes una política que haga coincidencia con ellas y las acepte, y luego la aplicas con `set protocols ospf export ADVERTISE-STATIC`. Sin esa política de exportación, esas rutas no se anuncian.",
   "```\nset policy-options policy-statement ADVERTISE-STATIC term 1 from protocol static\nset policy-options policy-statement ADVERTISE-STATIC term 1 then accept\nset protocols ospf export ADVERTISE-STATIC\n```",
   "Hay una limitación importante para los protocolos de estado de enlace como OSPF. Como todos los routers OSPF deben tener la misma base de datos de estado de enlace, no puedes usar una política de importación para impedir que los LSA se inunden o entren a la base de datos. La política de importación de OSPF solo puede afectar qué rutas OSPF externas se instalan en la tabla de enrutamiento local. La política de exportación es la forma en que OSPF origina rutas externas dentro del dominio. Con BGP, un protocolo path-vector, tanto las políticas de importación como las de exportación son muy flexibles.",
   "Las políticas también pueden aplicarse en otros lugares. `routing-options forwarding-table export` aplica una política cuando las rutas pasan de la tabla de enrutamiento a la tabla de reenvío; el uso clásico es habilitar el balanceo de carga entre caminos de igual costo con la acción `load-balance per-packet`, que en el hardware moderno en realidad balancea por flujo. Las políticas también se usan para filtrar rutas entre instancias (route leaking) y para crear rutas generated.",
   "Una imagen mental útil: la tabla de enrutamiento está en el medio. Los protocolos alimentan rutas hacia ella a través de las políticas de importación y reciben rutas para anunciar a través de las políticas de exportación. Si recuerdas que import significa hacia dentro de la tabla y export significa hacia fuera de la tabla, puedes ubicar correctamente cualquier política."
  ],
  "terms": [
   [
    "Import policy (política de importación)",
    "Una política de enrutamiento aplicada a las rutas recibidas de un protocolo antes de colocarlas en la tabla de enrutamiento."
   ],
   [
    "Export policy (política de exportación)",
    "Una política de enrutamiento aplicada a las rutas activas cuando se anuncian desde la tabla de enrutamiento hacia un protocolo."
   ],
   [
    "Redistribution (redistribución)",
    "Anunciar rutas aprendidas de una fuente en otro protocolo; en Junos se hace con una política de exportación."
   ],
   [
    "policy-statement",
    "El objeto de política de enrutamiento con nombre que se configura bajo `policy-options`."
   ]
  ],
  "example": "Una empresa conectada a dos ISP quiere recibir solo una ruta por defecto de cada uno. Aplica una política de importación en ambos grupos BGP que acepta 0.0.0.0/0 y rechaza todo lo demás, y una política de exportación que anuncia solo su propia aggregate, para nunca convertirse accidentalmente en un camino de tránsito entre los proveedores.",
  "tip": "Import y export son relativos a la tabla de enrutamiento: import es hacia dentro, export es hacia fuera. La política de importación de OSPF no puede detener la inundación de LSA; para anunciar rutas static o direct en OSPF necesitas una política de exportación.",
  "check": [
   [
    "Quieres que OSPF anuncie una ruta estática. ¿Qué tipo de política aplicas y dónde?",
    "Una política de exportación que haga coincidencia con la ruta estática, aplicada bajo `protocols ospf export`."
   ],
   [
    "Quieres evitar que las rutas de un vecino BGP entren a tu tabla de enrutamiento. ¿Qué dirección?",
    "Política de importación en ese vecino o grupo BGP."
   ]
  ]
 },
 {
  "t": "Default policies: BGP accepts and advertises active BGP routes; OSPF import accepts all and export rejects all; RIP export rejects all",
  "tt": "Políticas por defecto: BGP acepta y anuncia las rutas BGP activas; OSPF import acepta todo y export rechaza todo; RIP export rechaza todo",
  "body": [
   "Cada protocolo de enrutamiento en Junos tiene una política por defecto incorporada. Se aplica automáticamente al final de cualquier cadena de políticas, así que decide qué pasa con una ruta que ninguna de tus políticas configuradas acepta o rechaza explícitamente. Si no configuras ninguna política, la política por defecto es lo único que se aplica. Conocer el valor por defecto de cada protocolo explica mucho comportamiento que sorprende a los principiantes.",
   "La política de importación por defecto de BGP acepta todas las rutas BGP recibidas de los vecinos, así que se colocan en la tabla de enrutamiento (sujetas a las verificaciones normales, como la detección de bucles). La política de exportación por defecto de BGP anuncia todas las rutas BGP activas a los vecinos BGP. Hay una restricción importante que viene del propio protocolo: las rutas aprendidas de un peer IBGP no se anuncian a otros peers IBGP, por eso IBGP normalmente necesita una malla completa (full mesh) o route reflectors. Fíjate en lo que el valor por defecto no hace: no anuncia rutas static, direct, OSPF ni aggregate en BGP. Para anunciar tus propios prefijos, necesitas una política de exportación.",
   "La política de importación por defecto de OSPF acepta todas las rutas OSPF. La política de exportación por defecto de OSPF rechaza todo. Eso suena alarmante hasta que recuerdas cómo funciona OSPF: los routers comparten sus propios enlaces y vecinos mediante LSA, que el propio protocolo genera e inunda, no la política. Así que OSPF sigue intercambiando toda la información OSPF interna con normalidad; el valor por defecto de exportación solo significa que no se inyectan rutas que no son de OSPF, como las estáticas o una ruta por defecto. Cuando quieres anunciar una ruta estática por defecto en OSPF, escribes una política de exportación para ella.",
   "La política de importación por defecto de RIP acepta las rutas RIP de los vecinos, pero su política de exportación por defecto rechaza todo. A diferencia de OSPF, RIP aprende y anuncia rutas a través de la tabla de enrutamiento, así que con la política de exportación por defecto un router Junos que ejecuta RIP recibe rutas pero no anuncia nada, ni siquiera sus redes directamente conectadas ni las rutas que aprendió por RIP. Para que RIP funcione siempre necesitas una política de exportación, normalmente una que acepte `from protocol [ rip direct ]`.",
   "```\nset policy-options policy-statement RIP-OUT term 1 from protocol [ rip direct ]\nset policy-options policy-statement RIP-OUT term 1 then accept\nset protocols rip group NEIGHBORS export RIP-OUT\nset protocols rip group NEIGHBORS neighbor ge-0/0/1.0\n```",
   "Resumiendo los valores por defecto en un solo lugar: BGP acepta todas las rutas BGP recibidas y anuncia las rutas BGP activas; OSPF acepta todo y no exporta nada adicional (aunque sigue inundando su propia información de estado de enlace); RIP acepta las rutas RIP recibidas y no anuncia nada. Cuando un protocolo no se comporta como esperas, la primera pregunta es si tu cadena de políticas termina cayendo en uno de estos valores por defecto."
  ],
  "terms": [
   [
    "Default policy (política por defecto)",
    "La política incorporada y específica de cada protocolo que se evalúa después de todas las políticas configuradas cuando ninguna tomó una decisión final."
   ],
   [
    "BGP default export (export por defecto de BGP)",
    "Anuncia las rutas BGP activas a los peers BGP, excepto que las rutas aprendidas por IBGP no se envían a otros peers IBGP."
   ],
   [
    "OSPF default export (export por defecto de OSPF)",
    "Rechaza todas las rutas; la propia información de estado de enlace de OSPF igual la inunda el protocolo."
   ],
   [
    "RIP default export (export por defecto de RIP)",
    "Rechaza todas las rutas, así que un router RIP no anuncia nada hasta que se configura una política de exportación."
   ]
  ],
  "example": "Un ingeniero habilita RIP en dos routers de laboratorio y no ve llegar rutas en ninguno. `show route protocol rip` está vacío en ambos. Como la política de exportación por defecto de RIP rechaza todo, ningún router está anunciando. Agregar en cada router una política de exportación que acepte las rutas RIP y direct hace que las rutas aparezcan en segundos.",
  "tip": "La trampa de RIP es común: RIP necesita una política de exportación incluso para anunciar sus propias redes conectadas. Para OSPF, 'export rechaza todo' no detiene el funcionamiento normal de OSPF; solo detiene la redistribución de otras rutas.",
  "check": [
   [
    "Sin ninguna política, ¿un router BGP de Junos anunciará sus rutas estáticas a los peers?",
    "No. El export por defecto de BGP anuncia solo las rutas BGP activas; las rutas estáticas necesitan una política de exportación."
   ],
   [
    "¿Por qué OSPF sigue funcionando con una política de exportación por defecto que rechaza todas las rutas?",
    "OSPF comparte su topología mediante LSA que inunda el propio protocolo, no mediante la política de exportación."
   ],
   [
    "¿Qué debes agregar para que un router Junos anuncie algo por RIP?",
    "Una política de exportación bajo el grupo RIP, por ejemplo una que acepte `from protocol [ rip direct ]`."
   ]
  ]
 },
 {
  "t": "Policy structure: terms, `from` match conditions, `then` actions; terminating vs flow-control actions (next term, next policy)",
  "tt": "Estructura de una política: términos, condiciones de coincidencia `from`, acciones `then`; acciones terminantes vs de control de flujo (next term, next policy)",
  "body": [
   "Una política de enrutamiento de Junos es un `policy-statement` definido bajo `policy-options`. Cada política está formada por uno o más términos, y cada término es una regla si-entonces: una sección `from` con condiciones de coincidencia y una sección `then` con acciones. Los términos se evalúan en el orden en que aparecen, de arriba hacia abajo.",
   "```\nset policy-options policy-statement EXPORT-BGP term STATICS from protocol static\nset policy-options policy-statement EXPORT-BGP term STATICS from route-filter 192.0.2.0/24 exact\nset policy-options policy-statement EXPORT-BGP term STATICS then community add CUST\nset policy-options policy-statement EXPORT-BGP term STATICS then accept\nset policy-options policy-statement EXPORT-BGP term REJECT-REST then reject\n```",
   "La sección `from` lista condiciones de coincidencia como `protocol`, `route-filter`, `prefix-list`, `neighbor`, `interface`, `area`, `as-path`, `community` y `tag`. Cuando un término tiene varias condiciones diferentes, todas deben coincidir (un AND lógico). Cuando una condición lista varios valores, como `protocol [ static direct ]`, cualquiera de los valores puede coincidir (un OR lógico). Un término sin sección `from` coincide con todas las rutas, que es como se escribe un término final comodín como el REJECT-REST de arriba. También hay una sección `to` para algunas condiciones sobre hacia dónde va una ruta, como un vecino específico.",
   "La sección `then` contiene las acciones, que se dividen en tres grupos. Las acciones terminantes son `accept` y `reject`. Cuando una ruta coincide con un término que tiene una de ellas, la evaluación se detiene ahí mismo para esa ruta: no se revisan más términos ni más políticas. Las acciones de control de flujo cambian dónde continúa la evaluación: `next term` salta al siguiente término de la política, y `next policy` salta el resto de esta política y pasa a la siguiente política de la cadena. Las acciones modificadoras cambian atributos de la ruta, como `metric`, `preference`, `local-preference`, `community add`, `as-path-prepend` y `next-hop self`. Las acciones modificadoras no detienen la evaluación por sí mismas.",
   "¿Qué pasa si un término coincide pero no tiene ninguna acción terminante ni de control de flujo, solo modificadoras? Se aplican las modificaciones, y la evaluación continúa con el siguiente término, como si hubiera un `next term`. ¿Y si una ruta no coincide con ningún término de la política? La evaluación pasa a la siguiente política de la cadena y, si no hay más, a la política por defecto del protocolo. Por eso muchos ingenieros terminan sus políticas con un término final explícito, para que el resultado sea claro en lugar de depender del valor por defecto.",
   "El orden importa porque gana la primera acción terminante. Si el primer término de una política de exportación acepta todas las rutas estáticas, un término posterior que intente rechazar un prefijo estático nunca tiene la oportunidad. Usa `insert` para mover términos, y usa `show policy-options policy-statement NAME` para leer la política de arriba hacia abajo. Ten en cuenta también que una política es solo una definición: no hace nada hasta que la aplicas como política de importación o exportación en algún lugar."
  ],
  "terms": [
   [
    "Term (término)",
    "Una regla si-entonces con nombre dentro de una política, que contiene condiciones de coincidencia `from` y acciones `then`."
   ],
   [
    "Terminating action (acción terminante)",
    "`accept` o `reject`; termina de inmediato la evaluación de la política para esa ruta."
   ],
   [
    "Flow-control action (acción de control de flujo)",
    "`next term` o `next policy`; mueve la evaluación a otro término o política sin decidir el destino de la ruta."
   ],
   [
    "Modifying action (acción modificadora)",
    "Una acción que cambia atributos de la ruta, como la métrica o la community, sin terminar la evaluación."
   ]
  ],
  "example": "Un cliente de un ISP quiere anteponer (prepend) su AS dos veces en los anuncios hacia un proveedor de respaldo. Su política de exportación tiene un primer término que coincide con su aggregate, aplica `as-path-prepend` y luego `accept`, y un término final sin `from` que rechaza todo lo demás, así nunca se envía nada más que la aggregate.",
  "tip": "Varias condiciones en un mismo `from` se combinan con AND; varios valores en una misma condición se combinan con OR. Un término sin `from` coincide con todo, y un término con solo acciones modificadoras continúa con el siguiente término.",
  "check": [
   [
    "Un término coincide con una ruta y su sección `then` solo establece `metric 50`. ¿Qué pasa después?",
    "Se establece la métrica y la evaluación continúa con el siguiente término, porque no se indicó ninguna acción terminante."
   ],
   [
    "¿Qué hace `next policy`?",
    "Deja de evaluar la política actual y pasa a la siguiente política de la cadena."
   ],
   [
    "¿Cómo se comporta un término sin sección `from`?",
    "Coincide con todas las rutas."
   ]
  ]
 },
 {
  "t": "Policy chains and evaluation order, falling through to the default policy",
  "tt": "Cadenas de políticas y orden de evaluación, y la caída a la política por defecto",
  "body": [
   "Puedes aplicar más de una política en el mismo lugar. Cuando listas varias políticas, por ejemplo `set protocols bgp group ISP export [ NO-BOGONS ADVERTISE-AGG ]`, forman una cadena de políticas (policy chain). Entender cómo recorre Junos una cadena es esencial para predecir qué hará una configuración de políticas.",
   "La evaluación funciona así. Para cada ruta, Junos empieza con la primera política de la cadena y evalúa sus términos de arriba hacia abajo. En cuanto la ruta coincide con un término que tiene una acción terminante, `accept` o `reject`, la decisión es final. Junos no mira ningún término restante, ninguna política restante ni la política por defecto. Si una ruta coincide con un término con `next policy`, o si no coincide con ningún término con acción terminante en esta política, la evaluación pasa a la siguiente política de la cadena. Si la ruta llega al final de la última política configurada sin una acción terminante, cae (falls through) a la política por defecto del protocolo, que toma la decisión final.",
   "```\nChain: export [ P1 P2 P3 ] -> then default policy\nRoute A: P1 term 2 says reject   -> rejected, P2/P3/default never checked\nRoute B: no match in P1, P2 term 1 says accept -> accepted\nRoute C: no match in P1, P2 or P3 -> protocol default decides\n```",
   "Por esto, el orden de las políticas en la cadena importa tanto como el orden de los términos en cada política. Un `accept` amplio en una política temprana impedirá que cualquier política posterior rechace la misma ruta. Un diseño común es poner primero las protecciones más específicas (por ejemplo, una política que rechace prefijos bogon o privados), luego las políticas que aceptan lo que quieres anunciar y, por último, un término o una política explícita de rechazar todo, para que nada se escape hacia un valor por defecto permisivo. Cuando agregas una política a una cadena existente, por defecto va al final de la lista; usa `insert` para ubicarla antes, por ejemplo `insert export NO-BOGONS before ADVERTISE-AGG` bajo el protocolo o el grupo.",
   "Caer a la política por defecto suele ser el origen de las sorpresas. Imagina una cadena de exportación BGP que contiene solo una política que acepta tu ruta aggregate. Tu aggregate se acepta, pero otras rutas BGP activas, como las rutas de otro proveedor, también se anuncian porque caen a la política de exportación por defecto de BGP, que anuncia las rutas BGP activas. El resultado es que ofreces accidentalmente tránsito entre dos ISP. Agregar un término final `then reject` lo soluciona.",
   "Las políticas también pueden aplicarse en más de un nivel de BGP, como el nivel global, de grupo y de vecino. Gana el nivel más específico: una exportación a nivel de vecino reemplaza a la exportación a nivel de grupo para ese vecino en lugar de sumarse a ella. Junos también soporta expresiones de políticas (policy expressions), que combinan políticas con operadores lógicos como `&&`, `||` y `!`, pero las cadenas son la herramienta de todos los días. Puedes verificar el comportamiento con `test policy` y revisando `show route advertising-protocol bgp <neighbor>`."
  ],
  "terms": [
   [
    "Policy chain (cadena de políticas)",
    "Una lista ordenada de políticas aplicada en un solo lugar, evaluada de izquierda a derecha."
   ],
   [
    "Fall-through (caída)",
    "Lo que ocurre cuando ninguna política configurada toma una decisión terminante, de modo que decide la política por defecto del protocolo."
   ],
   [
    "Explicit reject term (término de rechazo explícito)",
    "Un término final sin `from` y con `then reject`, usado para evitar que las rutas lleguen a la política por defecto."
   ],
   [
    "Policy hierarchy in BGP (jerarquía de políticas en BGP)",
    "Las políticas aplicadas a nivel de vecino reemplazan a las de nivel de grupo, que reemplazan a las globales."
   ]
  ],
  "example": "La cadena de exportación BGP de una empresa es `[ AGG-ONLY ]`, que acepta su aggregate 198.51.100.0/24. Unos días después, su segundo ISP nota que está recibiendo rutas del primer ISP a través de la empresa. El ingeniero agrega un término con `then reject` al final de AGG-ONLY, para que las demás rutas BGP ya no caigan a la política de exportación por defecto.",
  "tip": "Gana la primera acción terminante en cualquier punto de la cadena; las políticas posteriores y la política por defecto nunca se consultan para esa ruta. Si nada termina la evaluación, decide la política por defecto del protocolo, que para el export de BGP significa anunciar las rutas BGP activas.",
  "check": [
   [
    "En `export [ A B ]`, la política A acepta una ruta. ¿La política B puede rechazarla?",
    "No. Una vez que una acción terminante acepta la ruta, la evaluación se detiene."
   ],
   [
    "¿Qué decide el destino de una ruta que no coincide con ningún término terminante en ninguna política de la cadena?",
    "La política por defecto del protocolo."
   ],
   [
    "¿Cómo puedes asegurar que BGP exporte solo las rutas previstas?",
    "Termina la cadena con un término o una política de rechazo explícito, para que nada caiga a la política por defecto."
   ]
  ]
 },
 {
  "t": "Route filters and match types: exact, orlonger, longer, upto, prefix-length-range; prefix lists",
  "tt": "Route filters y tipos de coincidencia: exact, orlonger, longer, upto, prefix-length-range; prefix lists",
  "body": [
   "La mayoría de las políticas necesitan hacer coincidencia con prefijos específicos. Junos lo hace con la condición de coincidencia `route-filter`, que combina un prefijo con un tipo de coincidencia (match type) que describe qué rutas dentro de ese prefijo, o iguales a él, deben coincidir. La sintaxis es `from route-filter <prefix>/<length> <match-type>`.",
   "Los tipos de coincidencia, usando 192.168.0.0/16 como prefijo del filtro, son: `exact` coincide solo con 192.168.0.0/16. `orlonger` coincide con 192.168.0.0/16 y con cualquier ruta más específica dentro de él, como 192.168.5.0/24 o 192.168.5.1/32. `longer` coincide solo con rutas más específicas que /16 dentro de él, pero no con la propia /16. `upto /24` coincide con rutas dentro de 192.168.0.0/16 con longitudes de prefijo desde /16 hasta /24, así que 192.168.0.0/16 y 192.168.7.0/24 coinciden pero 192.168.7.128/25 no. `prefix-length-range /20-/24` coincide con rutas dentro de la /16 cuyas longitudes están entre /20 y /24; la propia /16 no coincide. También existe `through`, que coincide con una cadena de prefijos entre dos prefijos dados, pero se usa con menos frecuencia.",
   "```\nset policy-options policy-statement FROM-CUST term OK from route-filter 203.0.113.0/24 upto /26\nset policy-options policy-statement FROM-CUST term OK then accept\nset policy-options policy-statement FROM-CUST term REST then reject\n```",
   "Recuerda siempre que la ruta primero debe caer dentro del prefijo del filtro; luego el tipo de coincidencia revisa su longitud. Una ruta hacia 10.0.0.0/24 nunca coincide con `route-filter 192.168.0.0/16 orlonger`, sin importar la longitud.",
   "Cuando un solo término contiene varios route filters, Junos no los prueba simplemente uno por uno. Primero encuentra el route filter cuyo prefijo es la coincidencia más larga para la ruta, y luego revisa solo el tipo de coincidencia de ese filtro. Si esa revisión falla, la ruta no coincide con el término, aunque un filtro más corto del mismo término sí hubiera coincidido. Por ejemplo, con `10.0.0.0/8 orlonger` y `10.1.0.0/16 exact` en el mismo término, una ruta hacia 10.1.1.0/24 se compara con el filtro /16 (la coincidencia más larga), falla `exact` y, por lo tanto, no coincide en absoluto con el término. Si quieres revisiones independientes, pon los filtros en términos separados.",
   "Las prefix lists son listas de prefijos con nombre definidas bajo `policy-options prefix-list`. Son reutilizables: la misma lista puede referenciarse en muchas políticas y en firewall filters. En una política, `from prefix-list NAME` coincide con rutas que son exactamente iguales a una entrada de la lista. Cuando necesitas un tipo de coincidencia con una lista, usa `from prefix-list-filter NAME orlonger` (o exact, longer, etc.). Una función práctica es `apply-path`, que construye una prefix list automáticamente a partir de otras partes de la configuración, por ejemplo de todas las direcciones de vecinos BGP configuradas.",
   "```\nset policy-options prefix-list CUSTOMER-NETS 203.0.113.0/24\nset policy-options prefix-list CUSTOMER-NETS 198.51.100.0/24\nset policy-options policy-statement P term 1 from prefix-list-filter CUSTOMER-NETS orlonger\n```"
  ],
  "terms": [
   [
    "exact",
    "Coincide solo con la ruta igual al prefijo y la longitud del filtro."
   ],
   [
    "orlonger",
    "Coincide con el prefijo del filtro y con cualquier ruta más específica dentro de él."
   ],
   [
    "longer",
    "Coincide solo con rutas más específicas que el prefijo del filtro, no con el prefijo en sí."
   ],
   [
    "upto",
    "Coincide con rutas dentro del prefijo con longitudes desde la longitud del propio prefijo hasta la longitud indicada."
   ],
   [
    "prefix-length-range",
    "Coincide con rutas dentro del prefijo cuyas longitudes están entre dos longitudes indicadas."
   ],
   [
    "Prefix list",
    "Una lista de prefijos con nombre y reutilizable, que coincide de forma exacta con `prefix-list` o con un tipo de coincidencia mediante `prefix-list-filter`."
   ]
  ],
  "example": "Un proveedor permite que un cliente anuncie su 203.0.113.0/24 y cualquier subred hasta /26 para ingeniería de tráfico, pero nada más pequeño. La política de importación usa `route-filter 203.0.113.0/24 upto /26` con accept, y un término final de rechazo. Los anuncios de /27 o del espacio de cualquier otro se rechazan.",
  "tip": "Conoce la diferencia entre orlonger (incluye el prefijo) y longer (lo excluye), y entre upto (empieza en la longitud del prefijo) y prefix-length-range (empieza donde tú digas). Varios route filters en un mismo término usan primero la coincidencia más larga y luego el tipo de coincidencia.",
  "check": [
   [
    "¿172.16.0.0/12 coincide con `route-filter 172.16.0.0/12 longer`?",
    "No. `longer` coincide solo con rutas más específicas, no con el prefijo en sí."
   ],
   [
    "¿Qué rutas coinciden con `route-filter 10.0.0.0/8 prefix-length-range /16-/24`?",
    "Las rutas dentro de 10.0.0.0/8 con longitudes de prefijo de /16 a /24."
   ],
   [
    "¿Cómo aplicas el tipo de coincidencia `orlonger` a cada entrada de una prefix list?",
    "Usa `from prefix-list-filter NAME orlonger`."
   ]
  ]
 },
 {
  "t": "Testing with `test policy`",
  "tt": "Pruebas con `test policy`",
  "body": [
   "Las políticas de enrutamiento pueden tener efectos amplios, y un error en un route filter o en el orden de los términos puede anunciar o bloquear mucho más de lo que pretendías. Junos te da una forma de ver qué coincidiría con una política antes de confiar en ella: el comando del modo operacional `test policy`.",
   "La sintaxis es `test policy <policy-name> <prefix>`. Junos toma las rutas que están actualmente en la tabla de enrutamiento (inet.0 por defecto) y que caen dentro del prefijo que indicas, pasa cada una por la política nombrada y muestra las rutas que la política acepta. Para probar contra todas las rutas de la tabla, usa `0.0.0.0/0` como prefijo. Como el comando trabaja sobre rutas que ya están en la tabla de enrutamiento, es una buena forma de revisar las políticas de exportación, que operan sobre rutas que el dispositivo ya tiene.",
   "```\nuser@R1> test policy ADVERTISE-AGG 0.0.0.0/0\ninet.0: 25 destinations, 27 routes (25 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n198.51.100.0/24    *[Aggregate/130] 01:12:04\n                       Reject\nPolicy ADVERTISE-AGG: 1 prefix accepted, 24 prefix rejected\n```",
   "Hay un comportamiento que debes recordar: la acción por defecto de `test policy` es accept. Cuando una ruta pasa por todos los términos sin llegar a una acción terminante, `test policy` la trata como aceptada y la muestra. No aplica la política por defecto del protocolo con el que finalmente usarás la política, porque no está ligado a ningún protocolo. Así que si tu política no tiene un término final de rechazo, `test policy` puede mostrar muchas más rutas aceptadas de las que el protocolo realmente anunciará, o lo contrario según el valor por defecto del protocolo. El enfoque más limpio es terminar las políticas con un término terminante explícito, lo que además hace que la salida de la prueba coincida con la realidad.",
   "`test policy` es una revisión de la lógica, no una simulación completa. No muestra cambios de atributos como modificaciones de métrica o de community, y no puede decirte qué hará un vecino BGP con las rutas. Para eso, mira los resultados reales después de hacer commit: `show route advertising-protocol bgp <neighbor>` muestra lo que realmente se está enviando, y `show route receive-protocol bgp <neighbor>` muestra lo que se recibe antes de la política de importación. Comparar la salida de la prueba con esos comandos es un buen hábito.",
   "Un flujo de trabajo práctico es: escribir o cambiar la política en modo de configuración, hacer commit (la política no tiene efecto hasta que se aplica, así que confirmar una política sin aplicar es inofensivo), ejecutar `test policy` con `0.0.0.0/0` y con prefijos específicos, y solo entonces aplicarla bajo el protocolo. Usar `commit confirmed` en el paso final te da un rollback automático si el cambio te deja sin acceso."
  ],
  "terms": [
   [
    "test policy",
    "Un comando operacional que pasa las entradas de la tabla de enrutamiento por una política y muestra las rutas que acepta."
   ],
   [
    "Default accept in test policy (accept por defecto en test policy)",
    "Las rutas que la política probada no rechaza explícitamente se muestran como aceptadas."
   ],
   [
    "advertising-protocol",
    "`show route advertising-protocol bgp <neighbor>` muestra las rutas que realmente se anuncian a un vecino BGP."
   ],
   [
    "commit confirmed",
    "Un commit que hace rollback automáticamente a menos que se confirme dentro de un tiempo establecido, útil al aplicar cambios de política riesgosos."
   ]
  ],
  "example": "Antes de aplicar una nueva política de exportación BGP, una ingeniera hace commit de la definición de la política sin aplicarla y ejecuta `test policy EXPORT-ISP 0.0.0.0/0`. La salida muestra 400 rutas aceptadas en lugar de las 2 esperadas. Se da cuenta de que a la política le falta un término final de rechazo, lo agrega, vuelve a probar y ve solo las dos aggregates, y luego aplica la política.",
  "tip": "`test policy` acepta por defecto cualquier ruta que la política no rechace explícitamente, sin importar la política por defecto del protocolo. Usa `0.0.0.0/0` para probar toda la tabla.",
  "check": [
   [
    "¿Qué prefijo le das a `test policy` para evaluar todas las rutas de inet.0?",
    "`0.0.0.0/0`."
   ],
   [
    "Una ruta no coincide con ningún término de la política probada. ¿Cómo la muestra `test policy`?",
    "Como aceptada, porque la acción por defecto de `test policy` es accept."
   ]
  ]
 },
 {
  "t": "Firewall filters: stateless, term order, match conditions, implicit discard at the end",
  "tt": "Firewall filters: stateless, orden de los términos, condiciones de coincidencia, descarte implícito al final",
  "body": [
   "Los firewall filters de Junos inspeccionan paquetes y deciden qué hacer con ellos. Otros fabricantes llaman a la misma función listas de control de acceso (ACL, access control lists). Los filtros se configuran bajo `firewall family <family> filter <name>`, donde la familia normalmente es `inet` para IPv4 o `inet6` para IPv6. Se aplican a interfaces y se procesan en el Packet Forwarding Engine a alta velocidad.",
   "Los firewall filters son stateless (sin estado). Cada paquete se examina por sí solo, sin memoria de paquetes o conexiones anteriores. Si permites que un cliente dentro de tu red abra una conexión TCP hacia un servidor externo, un filtro stateless en la dirección entrante también debe permitir explícitamente las respuestas del servidor. La condición de coincidencia `tcp-established` ayuda aquí: coincide con los paquetes TCP que tienen activado el flag ACK o RST, que es como se ven los paquetes de respuesta. Esto es diferente de las políticas de seguridad stateful de los firewalls de la serie SRX, que rastrean sesiones y permiten automáticamente el tráfico de retorno.",
   "Un filtro está formado por términos, evaluados en orden de arriba hacia abajo, igual que los términos de las políticas. Cada término tiene una sección `from` con condiciones de coincidencia y una sección `then` con acciones. El primer término que coincide y aplica una acción terminante decide el destino del paquete, y los términos posteriores no se revisan.",
   "```\nset firewall family inet filter PROTECT term SSH from source-address 192.0.2.0/24\nset firewall family inet filter PROTECT term SSH from protocol tcp\nset firewall family inet filter PROTECT term SSH from destination-port ssh\nset firewall family inet filter PROTECT term SSH then accept\nset firewall family inet filter PROTECT term ICMP from protocol icmp\nset firewall family inet filter PROTECT term ICMP then accept\n```",
   "Las condiciones de coincidencia comunes para IPv4 incluyen `source-address`, `destination-address` (y `address` para cualquiera de las dos), `source-prefix-list` y `destination-prefix-list`, `protocol` (tcp, udp, icmp, ospf, etc.), `source-port` y `destination-port` (por número o por nombre), `icmp-type`, `tcp-flags`, `tcp-established` y `tcp-initial`, `dscp` y `fragment-flags`. La lógica es la misma que en la política de enrutamiento: las condiciones diferentes en un término se combinan con AND, y varios valores para una misma condición se combinan con OR. Un término sin sección `from` coincide con todos los paquetes.",
   "Todo filtro termina con un término implícito que descarta todo lo que no coincidió antes. No lo ves en la configuración, pero siempre está ahí. En el ejemplo anterior, un paquete Telnet desde cualquier lugar, o un paquete SSH desde fuera de 192.0.2.0/24, no coincide con ningún término y se descarta en silencio. Este comportamiento de denegación por defecto es seguro, pero también significa que cuando aplicas un filtro debes permitir explícitamente todo lo que aún necesitas, o puedes cortar tráfico, incluida tu propia sesión de gestión. Una práctica común es terminar los filtros con un término final explícito que cuente o registre lo que se descarta, para que el descarte implícito nunca ocurra sin que lo veas.",
   "Como el orden importa y los términos nuevos se agregan al final, usa `insert` para reubicar términos y revisa el filtro con `show firewall family inet filter <name>` en modo de configuración antes de hacer commit."
  ],
  "terms": [
   [
    "Stateless filter (filtro sin estado)",
    "Un filtro que evalúa cada paquete de forma independiente sin rastrear conexiones, así que el tráfico de retorno debe permitirse explícitamente."
   ],
   [
    "Implicit discard (descarte implícito)",
    "La acción final oculta de todo firewall filter de Junos que descarta en silencio los paquetes que no coincidieron con ningún término."
   ],
   [
    "tcp-established",
    "Una condición de coincidencia para paquetes TCP con el flag ACK o RST activado, normalmente tráfico de respuesta."
   ],
   [
    "Match condition (condición de coincidencia)",
    "Un criterio `from` como dirección, protocolo o puerto, usado para seleccionar paquetes en un término de filtro."
   ]
  ],
  "example": "Un ingeniero aplica un filtro que permite solo HTTPS hacia la subred de un servidor web y hace commit. De repente el servidor no puede resolver nombres ni descargar actualizaciones. El filtro es stateless y termina con un descarte implícito, así que las respuestas de DNS y de las actualizaciones que regresan se descartan. Agregar un término para el tráfico de retorno, usando `tcp-established` para TCP, y un término para las respuestas DNS restaura el servicio.",
  "tip": "Los filtros son stateless, se evalúan de arriba hacia abajo y terminan con un descarte implícito. Varias condiciones en un término se combinan con AND, varios valores en una condición se combinan con OR.",
  "check": [
   [
    "Un paquete no coincide con ningún término de un filtro. ¿Qué le pasa?",
    "Se descarta en silencio por el término final implícito."
   ],
   [
    "¿Por qué un filtro stateless podría necesitar un término `tcp-established`?",
    "Porque no rastrea conexiones, los paquetes de respuesta deben permitirse explícitamente; `tcp-established` coincide con ellos."
   ],
   [
    "Un término tiene `from protocol tcp` y `from destination-port [ 22 443 ]`. ¿Qué paquetes coinciden?",
    "Los paquetes TCP hacia el puerto de destino 22 o 443."
   ]
  ]
 },
 {
  "t": "Filter actions: terminating (accept, discard, reject) and non-terminating (count, log, syslog, policer)",
  "tt": "Acciones de filtro: terminantes (accept, discard, reject) y no terminantes (count, log, syslog, policer)",
  "body": [
   "La sección `then` de un término de firewall filter decide qué pasa con los paquetes que coinciden. Las acciones son de dos tipos. Las acciones terminantes deciden el destino del paquete y detienen la evaluación del filtro. Las acciones no terminantes (también llamadas modificadores de acción) hacen algo adicional, como contar o limitar la tasa, y pueden combinarse con una acción terminante en el mismo término.",
   "Las acciones terminantes que debes conocer son `accept`, `discard` y `reject`. `accept` deja que el paquete continúe. `discard` lo descarta en silencio, sin devolver nada. `reject` lo descarta y envía un mensaje ICMP al origen, por defecto un mensaje destination unreachable que indica que el tráfico fue filtrado administrativamente; puedes elegir otros tipos de mensaje ICMP o un TCP reset. Discard suele ser la opción más segura hacia redes no confiables porque le da menos información a un atacante y no genera tráfico adicional, mientras que reject puede ser más amable dentro de una red porque las aplicaciones fallan rápido en lugar de esperar un timeout. `routing-instance` también es terminante: envía el paquete a una instancia forwarding para el reenvío basado en filtros.",
   "Las principales acciones no terminantes son estas. `count <name>` incrementa un contador con nombre para los paquetes y bytes que coinciden, que se muestra con `show firewall filter <name>` o `show firewall`. `log` registra los encabezados de los paquetes en un búfer del Routing Engine, que se ve con `show firewall log`; el búfer es pequeño y se sobrescribe con el tiempo. `syslog` envía un mensaje sobre el paquete al log del sistema, así que puede ir a archivos locales o a un servidor syslog remoto si hay un archivo o host configurado para la facility firewall. `policer <name>` aplica un límite de tasa definido bajo `firewall policer`, de modo que el tráfico por encima de un ancho de banda y un tamaño de ráfaga se descarta o se marca. Otras incluyen `forwarding-class` y `loss-priority` para la clase de servicio, `sample` para el muestreo de tráfico y la acción de control de flujo `next term`.",
   "```\nset firewall policer LIMIT-ICMP if-exceeding bandwidth-limit 1m burst-size-limit 15k\nset firewall policer LIMIT-ICMP then discard\nset firewall family inet filter PROTECT term ICMP from protocol icmp\nset firewall family inet filter PROTECT term ICMP then policer LIMIT-ICMP\nset firewall family inet filter PROTECT term ICMP then count ICMP-IN\nset firewall family inet filter PROTECT term ICMP then accept\nset firewall family inet filter PROTECT term LAST then count DROPPED\nset firewall family inet filter PROTECT term LAST then discard\n```",
   "Una regla importante: si un término solo tiene acciones no terminantes y ninguna acción terminante, Junos trata el término como si también dijera `accept`. Así que un término con solo `count` contará y aceptará el paquete, no lo pasará a los términos posteriores. Si quieres contar un paquete y aun así dejar que los términos posteriores decidan, agrega `next term` de forma explícita.",
   "Los contadores y los logs son tu ventana para ver lo que hace un filtro. Cuando un filtro parece bloquear lo que no debe, revisa qué contador de término está aumentando con `show firewall filter <name>`, y usa `clear firewall filter <name>` para reiniciar los contadores antes de una prueba. El término final `count DROPPED` de arriba hace visible el descarte implícito, que normalmente es invisible."
  ],
  "terms": [
   [
    "discard",
    "Una acción terminante que descarta el paquete en silencio."
   ],
   [
    "reject",
    "Una acción terminante que descarta el paquete y envía un ICMP unreachable (o un TCP reset) al origen."
   ],
   [
    "count",
    "Una acción no terminante que incrementa un contador con nombre de paquetes y bytes."
   ],
   [
    "policer",
    "Una acción no terminante que limita la tasa del tráfico que coincide usando un policer definido bajo `firewall policer`."
   ],
   [
    "log vs syslog",
    "`log` guarda los encabezados de los paquetes en un búfer del Routing Engine para `show firewall log`; `syslog` escribe en el log del sistema."
   ]
  ],
  "example": "La CPU de un router se dispara cada vez que alguien lo inunda con pings. El ingeniero agrega un término a su filtro de loopback que coincide con ICMP, aplica un policer que lo limita a una tasa pequeña, lo cuenta y lo acepta. Los pings normales de diagnóstico siguen funcionando, el contador muestra cuánto ICMP está llegando y la inundación ya no satura al Routing Engine.",
  "tip": "Un término con solo acciones no terminantes acepta el paquete de forma implícita. Discard es silencioso; reject devuelve un ICMP. Log va a un búfer local (`show firewall log`); syslog va al log del sistema.",
  "check": [
   [
    "Un término coincide con un paquete y solo tiene `then count WEB`. ¿Qué le pasa al paquete?",
    "Se cuenta y se acepta, porque un término sin acción terminante implica accept."
   ],
   [
    "¿Cuál es la diferencia entre discard y reject?",
    "Discard descarta en silencio; reject descarta y envía un ICMP unreachable o un TCP reset al emisor."
   ],
   [
    "¿Dónde ves los paquetes registrados por la acción `log`?",
    "Con `show firewall log`."
   ]
  ]
 },
 {
  "t": "Applying filters to interfaces (input/output) and to lo0 to protect the RE",
  "tt": "Aplicar filtros a interfaces (input/output) y a lo0 para proteger el RE",
  "body": [
   "Un firewall filter no hace nada hasta que lo aplicas. Aplicas los filtros a una interfaz lógica (unit) bajo la familia de protocolos, eligiendo una dirección. Los filtros `input` filtran los paquetes que llegan a la interfaz; los filtros `output` filtran los paquetes que salen de ella. Puedes aplicar un filtro de entrada y uno de salida por familia en una interfaz, o usar `input-list` y `output-list` para aplicar varios filtros en secuencia.",
   "```\nset interfaces ge-0/0/0 unit 0 family inet filter input FROM-INTERNET\nset interfaces ge-0/0/1 unit 0 family inet filter output TO-SERVERS\nset interfaces lo0 unit 0 family inet filter input PROTECT-RE\n```",
   "Elige la dirección pensando en de dónde viene el tráfico. Para detener el tráfico no deseado que entra a tu red desde internet, aplica un filtro de entrada en la interfaz hacia internet, que lo descarta lo antes posible. Para controlar lo que llega a un segmento de servidores en particular sin importar por qué interfaz entró, un filtro de salida en la interfaz hacia ese segmento suele ser más simple. Recuerda que un filtro es stateless, así que un filtro en una dirección puede necesitar términos para las respuestas del tráfico que tú iniciaste.",
   "La interfaz loopback, lo0, tiene un rol especial. El tráfico destinado al propio dispositivo, el Routing Engine (RE), como SSH, SNMP, NTP, BGP, OSPF, ping y las respuestas DNS, lo maneja el RE sin importar por qué interfaz física llegó. Un filtro de entrada en lo0 se aplica a todo ese tráfico dirigido al host desde todas las interfaces, así que un solo filtro protege el plano de control. No afecta al tráfico de tránsito que el dispositivo simplemente reenvía. Esto convierte a un filtro de entrada en lo0 en la forma estándar de proteger al RE del acceso no autorizado y de las inundaciones.",
   "Un buen filtro de lo0 permite solo lo que el dispositivo necesita, y solo desde los orígenes que lo necesitan. Los términos típicos permiten SSH desde las redes de gestión, SNMP desde los servidores de monitoreo, NTP desde los servidores de hora, BGP desde los vecinos configurados (una prefix list construida con `apply-path` puede listarlos automáticamente), OSPF y BFD desde la red interna, ICMP con limitación de tasa, DNS y otras respuestas de las que dependes, y luego cuentan y descartan todo lo demás. Por el descarte implícito, olvidar un término rompe esa función: olvida OSPF y tus adyacencias caen; olvida las respuestas NTP y el reloj deja de sincronizarse.",
   "Aplicar un filtro en lo0 es una forma clásica de quedarte sin acceso, así que usa `commit confirmed 5`. Si tu sesión SSH muere, el dispositivo hace rollback automáticamente después de cinco minutos. Si todo sigue funcionando, ejecuta `commit` de nuevo para hacerlo permanente. Después, verifica con `show firewall filter PROTECT-RE` para ver los contadores de cada término y con `show interfaces lo0 detail` o `show configuration interfaces lo0` para confirmar que el filtro está aplicado.",
   "Los filtros también pueden aplicarse a IPv6 con `family inet6`, y un filtro IPv4 nunca inspecciona paquetes IPv6. Si el dispositivo es alcanzable por IPv6, protege lo0 para ambas familias."
  ],
  "terms": [
   [
    "Input filter (filtro de entrada)",
    "Un filtro aplicado a los paquetes que llegan a una interfaz."
   ],
   [
    "Output filter (filtro de salida)",
    "Un filtro aplicado a los paquetes que salen de una interfaz."
   ],
   [
    "lo0 filter (filtro de lo0)",
    "Un filtro de entrada en la interfaz loopback que inspecciona todo el tráfico destinado al Routing Engine desde cualquier interfaz."
   ],
   [
    "Host-bound traffic (tráfico dirigido al host)",
    "Paquetes dirigidos al propio dispositivo, como el tráfico de gestión y de protocolos de enrutamiento, que procesa el RE."
   ]
  ],
  "example": "Un equipo de seguridad quiere detener los intentos de fuerza bruta por SSH que llegan a un router desde internet. La ingeniera crea PROTECT-RE, que permite SSH solo desde la prefix list de gestión, BGP desde los peers, OSPF, NTP e ICMP limitado, con un término final de contar y descartar. Lo aplica como entrada en lo0 con `commit confirmed 5`, verifica que su sesión y las sesiones BGP siguen activas y luego hace commit de nuevo.",
  "tip": "Un filtro de entrada en lo0 protege al Routing Engine del tráfico que llega por cualquier interfaz, pero no filtra el tráfico de tránsito. Incluye siempre los protocolos de enrutamiento y los servicios de gestión, y usa `commit confirmed`.",
  "check": [
   [
    "¿Un filtro de entrada en lo0 bloquea el tráfico de tránsito que pasa a través del router?",
    "No. Solo se aplica al tráfico destinado al Routing Engine."
   ],
   [
    "Aplicas un nuevo filtro en lo0 y todos los vecinos OSPF se caen. ¿Cuál es la causa probable?",
    "Al filtro le falta un término que permita OSPF, así que los paquetes OSPF llegan al descarte implícito."
   ],
   [
    "¿Por qué usar `commit confirmed` al aplicar un filtro en lo0?",
    "Si el filtro bloquea tu acceso de gestión, la configuración hace rollback automáticamente después del temporizador."
   ]
  ]
 },
 {
  "t": "Unicast reverse path forwarding (uRPF) checks: strict and loose",
  "tt": "Verificaciones de unicast reverse path forwarding (uRPF): strict y loose",
  "body": [
   "Los atacantes a menudo falsifican (spoof) la dirección de origen de los paquetes, por ejemplo en inundaciones de denegación de servicio, para ocultar su origen o para que las respuestas golpeen a una víctima. Unicast reverse path forwarding (uRPF) es una defensa simple. Normalmente un router solo mira la dirección de destino de un paquete. Con uRPF habilitado en una interfaz, el router también busca la dirección de origen del paquete en su tabla de reenvío y se pregunta si ese origen es plausible. Los paquetes que fallan la verificación se descartan. Esto apoya la práctica ampliamente recomendada de filtrar el tráfico falsificado en el borde de la red.",
   "En modo strict (estricto), la dirección de origen debe ser alcanzable a través de la misma interfaz por la que llegó el paquete. En otras palabras, si el router tuviera que enviar una respuesta a ese origen, usaría esta interfaz. Un paquete que llega por una interfaz de cliente con una dirección de origen de alguna otra red falla, porque la ruta hacia ese origen apunta a otro lado. El modo strict es muy eficaz en interfaces de cliente o de acceso con una sola conexión (single-homed), donde el tráfico siempre vuelve por donde fue.",
   "En modo loose (flexible), la dirección de origen solo necesita tener una ruta en la tabla de reenvío a través de cualquier interfaz. El modo loose no verifica la interfaz de llegada, así que atrapa menos paquetes falsificados, principalmente los que usan orígenes para los que el router no tiene ninguna ruta, como el espacio de direcciones no asignado o no enrutado. Es útil donde el enrutamiento es asimétrico, por ejemplo en enlaces hacia varios proveedores, donde el modo strict descartaría tráfico legítimo. Ten en cuenta que una ruta por defecto puede hacer que casi cualquier origen parezca alcanzable, lo que debilita considerablemente el modo loose.",
   "El enrutamiento asimétrico es el principal riesgo del modo strict. Si el tráfico de una red llega por un enlace pero la mejor ruta de regreso del router hacia esa red usa otro enlace, uRPF strict descarta tráfico válido. Por defecto, Junos compara solo contra los caminos activos. La opción `set routing-options forwarding-table unicast-reverse-path feasible-paths` hace que la verificación considere todos los caminos factibles, como las rutas alternativas aprendidas por BGP, lo que reduce los descartes erróneos en diseños multihomed.",
   "La configuración es por interfaz y por familia:",
   "```\nset interfaces ge-0/0/1 unit 0 family inet rpf-check\nset interfaces ge-0/0/2 unit 0 family inet rpf-check mode loose\nset interfaces ge-0/0/1 unit 0 family inet rpf-check fail-filter RPF-EXCEPTIONS\n```",
   "La primera línea habilita el modo strict (el valor por defecto). La segunda habilita el modo loose. La opción `fail-filter` nombra un firewall filter que se aplica solo a los paquetes que fallan la verificación, lo que te permite hacer excepciones, como aceptar las solicitudes DHCP que legítimamente usan un origen 0.0.0.0, o contar y registrar las fallas antes de descartarlas. La salida detallada de la interfaz, como `show interfaces ge-0/0/1.0 extensive`, muestra contadores de fallas RPF, que te dicen cuánto tráfico se está descartando. El soporte de cada plataforma y el comportamiento exacto pueden variar, así que revisa la documentación de tu hardware."
  ],
  "terms": [
   [
    "uRPF",
    "Unicast reverse path forwarding, una verificación que valida la dirección de origen de un paquete contra la tabla de reenvío para descartar tráfico falsificado."
   ],
   [
    "Strict mode (modo strict)",
    "El origen debe ser alcanzable por la misma interfaz por la que llegó el paquete."
   ],
   [
    "Loose mode (modo loose)",
    "El origen solo necesita una ruta en la tabla de reenvío a través de cualquier interfaz."
   ],
   [
    "fail-filter",
    "Un firewall filter aplicado solo a los paquetes que fallan la verificación uRPF, usado para excepciones o registro."
   ],
   [
    "Feasible paths (caminos factibles)",
    "Una opción que permite a uRPF considerar todos los caminos alternativos válidos, no solo los activos, para manejar el enrutamiento asimétrico."
   ]
  ],
  "example": "Un ISP habilita `rpf-check` strict en cada interfaz de cliente single-homed. Un dispositivo comprometido de un cliente empieza a enviar inundaciones con direcciones de origen aleatorias. Como esos orígenes no se enrutan de vuelta por la interfaz de ese cliente, el router los descarta, y los contadores de fallas RPF del ISP revelan a qué cliente hay que contactar.",
  "tip": "El modo strict revisa la interfaz de llegada y conviene en bordes single-homed; el modo loose solo revisa que exista una ruta y conviene en enlaces asimétricos o multihomed. Enrutamiento asimétrico más modo strict descarta tráfico legítimo.",
  "check": [
   [
    "¿Por qué uRPF strict puede descartar tráfico legítimo en un enlace multihomed?",
    "Con enrutamiento asimétrico, la mejor ruta de regreso hacia el origen puede usar una interfaz distinta de aquella por la que llegó el paquete."
   ],
   [
    "¿Qué sentencia de Junos habilita uRPF loose en una interfaz?",
    "`set interfaces <if> unit <n> family inet rpf-check mode loose`."
   ],
   [
    "¿Cuál es el propósito de `fail-filter`?",
    "Aplicar un filtro a los paquetes que fallan la verificación, para excepciones como DHCP o para contar y registrar."
   ]
  ]
 }
], { lang: "es" });
