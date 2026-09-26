/* Spanish translation of the Cisco CCNP ENCOR exam simulations. Same ids and structure as data/pbq/ccnp-encor.js. */
CertHub.addPbqs("ccnp-encor", [
  { id: "sdwan-roles-match", d: 1, type: "match", title: "Relaciona los componentes de SD-WAN con sus funciones",
    prompt: "Un plan de despliegue en sucursales enumera los componentes de Cisco Catalyst SD-WAN. Relaciona cada componente con la tarea que cumple en el fabric.",
    pairs: [
      ["SD-WAN Manager (vManage)", "GUI y API centrales para plantillas de configuración, monitoreo y actualizaciones de software"],
      ["SD-WAN Validator (vBond)", "Primer punto de contacto que autentica los dispositivos, orquesta su incorporación y ayuda con el NAT traversal"],
      ["SD-WAN Controller (vSmart)", "Plano de control que ejecuta OMP y distribuye rutas, TLOC y la política centralizada"],
      ["WAN Edge router", "Dispositivo del plano de datos que construye túneles IPsec hacia otros sitios y reenvía el tráfico de usuarios"]
    ],
    extra: ["Almacena los mapeos EID-a-RLOC para el plano de control LISP", "Asigna Security Group Tags a los endpoints después de 802.1X"],
    explain: "El Manager es el plano de administración (una sola consola), el Validator es el plano de orquestación que autentica cada componente y les indica a los edges dónde están los Controllers, y los Controllers son el plano de control que intercambia rutas OMP y aplica la política. Solo los WAN Edges transportan tráfico de usuarios, por túneles IPsec construidos directamente entre sitios. Los distractores describen piezas de SD-Access: los map servers de LISP y la asignación de SGT de ISE/TrustSec." },

  { id: "dscp-values-fill", d: 1, type: "fill", title: "Completa los valores DSCP de una política de QoS",
    prompt: "Estás escribiendo una política MQC que clasifica el tráfico por DSCP. Ingresa el valor DSCP decimal de cada marcado (y el binario de EF).",
    context: "class-map match-any VOICE\n match dscp ef\nclass-map match-any VIDEO\n match dscp af41\nclass-map match-any CRITICAL-DATA\n match dscp af31\nclass-map match-any SIGNALING\n match dscp cs3\n!\npolicy-map WAN-EDGE\n class VOICE\n  priority percent 20\n class VIDEO\n  bandwidth percent 25\n class CRITICAL-DATA\n  bandwidth percent 20\n class class-default\n  fair-queue",
    fields: [
      { label: "EF (decimal)", answers: ["46"] },
      { label: "EF (binario de 6 bits)", answers: ["101110"] },
      { label: "AF41 (decimal)", answers: ["34"] },
      { label: "AF31 (decimal)", answers: ["26"] },
      { label: "CS3 (decimal)", answers: ["24"] }
    ],
    explain: "EF es 46 (binario 101110) y se usa para voz en la clase de prioridad LLQ. Los valores AFxy siguen la fórmula DSCP = 8x + 2y, así que AF41 = 32 + 2 = 34 y AF31 = 24 + 2 = 26. Los valores class selector son 8 veces el número de clase, así que CS3 = 24, lo que mantiene la compatibilidad con IP Precedence 3." },

  { id: "gre-mtu-fill", d: 2, type: "fill", title: "Dimensiona la MTU y el MSS de un túnel GRE",
    prompt: "Los usuarios reportan que algunas páginas web se quedan colgadas a través de un túnel GRE nuevo cuya ruta underlay tiene una MTU de 1500 bytes. Completa los valores correctos para evitar la fragmentación con GRE simple sobre IPv4 (sin key, sin checksum, sin IPsec).",
    context: "interface Tunnel0\n ip address 10.255.0.1 255.255.255.252\n ip mtu ____\n ip tcp adjust-mss ____\n tunnel source GigabitEthernet0/0\n tunnel destination 203.0.113.2\n!\ninterface GigabitEthernet0/0\n ip address 198.51.100.1 255.255.255.0\n mtu 1500",
    fields: [
      { label: "Overhead de GRE en bytes", answers: ["24"] },
      { label: "ip mtu del túnel", answers: ["1476"] },
      { label: "Valor de ip tcp adjust-mss", answers: ["1436"] }
    ],
    explain: "GRE simple sobre IPv4 agrega un nuevo encabezado IP de 20 bytes más un encabezado GRE de 4 bytes, es decir, 24 bytes de overhead y una IP MTU del túnel de 1500 - 24 = 1476. El TCP MSS también debe dejar espacio para el encabezado IP interno de 20 bytes y el encabezado TCP de 20 bytes, así que 1476 - 40 = 1436. Agregar IPsec sumaría más overhead, por eso muchos diseños usan 1400 y 1360 por seguridad." },

  { id: "stp-guards-match", d: 3, type: "match", title: "Relaciona las funciones de protección de spanning tree",
    prompt: "Relaciona cada función de spanning tree con lo que hace cuando se cumple su condición.",
    pairs: [
      ["BPDU guard", "Pone en err-disabled un puerto de borde en cuanto recibe cualquier BPDU"],
      ["Root guard", "Pone un puerto en estado root-inconsistent si recibe una BPDU superior"],
      ["Loop guard", "Pone un puerto no designated en estado loop-inconsistent cuando dejan de llegar BPDU"],
      ["BPDU filter", "Deja de enviar y procesar BPDU en el puerto"],
      ["PortFast", "Pasa un puerto de acceso directamente a forwarding, saltándose listening y learning"]
    ],
    extra: ["Limita el tráfico broadcast a un porcentaje del ancho de banda del puerto", "Bloquea el puerto si el otro extremo deja de devolver las tramas UDLD"],
    explain: "BPDU guard protege los puertos de borde contra switches no autorizados, mientras que root guard se usa en los designated ports hacia la capa de acceso para que un switch aguas abajo no pueda convertirse en root. Loop guard protege los root ports y alternate ports contra enlaces unidireccionales que dejan de entregar BPDU. BPDU filter ignora las BPDU en silencio, lo cual es riesgoso porque puede permitir bucles, y PortFast solo acelera la convergencia en puertos de hosts. Los extras describen storm control y UDLD agresivo, que no son funciones de STP." },

  { id: "eigrp-fs-select", d: 3, type: "select", title: "Identifica los feasible successors de EIGRP",
    prompt: "Con la tabla de topología de abajo, selecciona cada vecino que califica como feasible successor para 10.10.10.0/24.",
    context: "R1# show ip eigrp topology all-links\nP 10.10.10.0/24, 1 successors, FD is 30720, serno 42\n        via 10.0.12.2 (30720/28160), GigabitEthernet0/1\n        via 10.0.13.3 (35840/25600), GigabitEthernet0/2\n        via 10.0.14.4 (33280/30720), GigabitEthernet0/3\n        via 10.0.15.5 (40960/15360), GigabitEthernet0/4\n        via 10.0.16.6 (46080/40960), GigabitEthernet0/5",
    options: ["10.0.12.2 vía Gi0/1", "10.0.13.3 vía Gi0/2", "10.0.14.4 vía Gi0/3", "10.0.15.5 vía Gi0/4", "10.0.16.6 vía Gi0/5"],
    answers: [1, 3],
    explain: "La condición de factibilidad dice que la distancia reportada (reported distance, el segundo número) de un vecino debe ser estrictamente menor que la feasible distance actual de 30720. 10.0.13.3 (RD 25600) y 10.0.15.5 (RD 15360) la cumplen, así que son respaldos libres de bucles. 10.0.12.2 es el propio successor, 10.0.14.4 tiene una RD igual a la FD (no menor), y 10.0.16.6 tiene una RD mayor que la FD, así que ninguno de esos dos puede ser feasible successor." },

  { id: "bgp-bestpath-order", d: 3, type: "order", title: "Ordena los atributos de best-path de BGP",
    prompt: "Un router Cisco tiene varias rutas hacia el mismo prefijo. Ordena las verificaciones de selección de best path en el orden en que IOS las evalúa.",
    steps: [
      "Mayor weight",
      "Mayor local preference",
      "Preferir una ruta originada localmente (network, redistribute o aggregate)",
      "AS_PATH más corto",
      "Menor tipo de origin (IGP, luego EGP, luego incomplete)",
      "Menor MED",
      "Preferir rutas eBGP sobre iBGP",
      "Menor métrica IGP hacia el next hop"
    ],
    explain: "IOS primero revisa el weight, propio de Cisco (local al router), luego la local preference (compartida en todo el AS) y luego las rutas que el propio router originó. Siguen la longitud del AS_PATH, el código de origin y el MED, y solo después prefiere las rutas externas sobre las internas y el next hop más cercano según la métrica IGP. Los desempates posteriores incluyen la ruta eBGP más antigua y el router ID más bajo. Una regla mnemotécnica común en inglés es 'We Love Oranges AS Oranges Mean Pure Refreshment'." },

  { id: "ospf-areas-match", d: 3, type: "match", title: "Relaciona los tipos de área OSPF con el manejo de LSA",
    prompt: "Relaciona cada tipo de área OSPF con la forma en que su ABR maneja los LSA que entran al área.",
    pairs: [
      ["Área estándar (normal)", "Permite LSA de tipo 1, 2, 3, 4 y 5"],
      ["Área stub", "Bloquea los LSA de tipo 4 y 5 e inyecta una ruta predeterminada como LSA de tipo 3"],
      ["Área totally stubby", "Bloquea los LSA de tipo 3, 4 y 5, excepto una única ruta predeterminada de tipo 3"],
      ["NSSA", "Bloquea los LSA de tipo 5, pero permite que un ASBR local origine LSA de tipo 7"],
      ["Totally NSSA", "Bloquea los LSA de tipo 3, 4 y 5 excepto una ruta predeterminada, y aún permite LSA de tipo 7"]
    ],
    extra: ["Inunda solo LSA de tipo 1 y ningún resumen"],
    explain: "Las áreas stub eliminan los LSA externos (tipo 5) y los de resumen de ASBR (tipo 4) y dependen de una ruta predeterminada; totally stubby además elimina los resúmenes inter-área de tipo 3. NSSA funciona como un stub, pero permite la redistribución dentro del área, transportada como LSA de tipo 7 que el ABR traduce a tipo 5. Totally NSSA combina ambas ideas. Totally stubby y totally NSSA son funciones de Cisco que se configuran con la palabra clave no-summary en el ABR." },

  { id: "etherchannel-select", d: 3, type: "select", title: "Encuentra los miembros del EtherChannel que no reenvían",
    prompt: "Los usuarios de DIST-SW1 reportan menor capacidad en el uplink. Selecciona cada interfaz miembro que NO está reenviando tráfico actualmente como parte de Po1.",
    context: "DIST-SW1# show etherchannel summary\nFlags:  D - down        P - bundled in port-channel\n        I - stand-alone s - suspended\n        H - Hot-standby (LACP only)\n        S - Layer2      U - in use\n\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+----------------------------------\n1      Po1(SU)         LACP      Gi1/0/1(P)  Gi1/0/2(P)  Gi1/0/3(s)\n                                 Gi1/0/4(I)  Gi1/0/5(D)  Gi1/0/6(P)",
    options: ["Gi1/0/1", "Gi1/0/2", "Gi1/0/3", "Gi1/0/4", "Gi1/0/5", "Gi1/0/6"],
    answers: [2, 3, 4],
    explain: "Solo los puertos marcados con P están agrupados y transportando tráfico en Po1. Gi1/0/3 está suspendido (s), lo que normalmente significa que su velocidad, dúplex, trunk o configuración de VLAN no coincide con los demás miembros. Gi1/0/4 está stand-alone (I), así que está activo pero no recibió PDU de LACP de un par, y Gi1/0/5 está down (D). Corrige la consistencia de la configuración de los miembros y el modo channel-group del otro extremo para recuperar todo el ancho de banda." },

  { id: "syslog-trap-select", d: 4, type: "select", title: "Predice qué mensajes llegan al servidor syslog",
    prompt: "Un router tiene 'logging host 192.0.2.50' y 'logging trap warnings'. Selecciona cada mensaje de abajo que se enviará al servidor syslog.",
    context: "Router(config)# logging host 192.0.2.50\nRouter(config)# logging trap warnings\n\nMensajes generados en la última hora:\n%LINK-3-UPDOWN: Interface GigabitEthernet0/2, changed state to down\n%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/2, changed state to down\n%SEC-6-IPACCESSLOGP: list EDGE-IN denied tcp 203.0.113.9(51514) -> 198.51.100.10(23), 1 packet\n%SYS-2-MALLOCFAIL: Memory allocation of 65536 bytes failed\n%CDP-4-DUPLEX_MISMATCH: duplex mismatch discovered on GigabitEthernet0/3\n%OSPF-5-ADJCHG: Process 1, Nbr 10.0.0.2 on Gi0/2 from FULL to DOWN",
    options: ["%LINK-3-UPDOWN", "%LINEPROTO-5-UPDOWN", "%SEC-6-IPACCESSLOGP", "%SYS-2-MALLOCFAIL", "%CDP-4-DUPLEX_MISMATCH", "%OSPF-5-ADJCHG"],
    answers: [0, 3, 4],
    explain: "El número en el medio de cada mnemónico es la severidad, y 'logging trap warnings' envía el nivel 4 y todo lo más grave (los números más bajos, 0-4). Eso significa que se envían Errors (3), Critical (2) y Warnings (4). Los Notifications (5), como los cambios del line protocol de la interfaz y de la adyacencia OSPF, y los Informational (6), como los hits del log de la ACL, se quedan en el equipo local a menos que el nivel de trap se suba a notifications o informational." },

  { id: "acl-evaluate-select", d: 5, type: "select", title: "Evalúa una ACL extendida",
    prompt: "La ACL de abajo está aplicada en sentido de entrada en la interfaz que da a Internet. Selecciona cada paquete que el router va a permitir.",
    context: "ip access-list extended EDGE-IN\n 10 permit tcp any host 192.0.2.10 eq 443\n 20 deny   tcp any host 192.0.2.10 eq 22\n 30 permit tcp 198.51.100.0 0.0.0.255 host 192.0.2.10 eq 22\n 40 permit udp any host 192.0.2.53 eq 53\n 50 deny   ip any any log\n!\ninterface GigabitEthernet0/0\n ip access-group EDGE-IN in",
    options: [
      "TCP 203.0.113.5:50122 -> 192.0.2.10:443",
      "TCP 198.51.100.20:50200 -> 192.0.2.10:22",
      "UDP 203.0.113.9:53001 -> 192.0.2.53:53",
      "TCP 203.0.113.9:53002 -> 192.0.2.53:53",
      "TCP 198.51.100.20:50300 -> 192.0.2.10:80",
      "ICMP echo 203.0.113.5 -> 192.0.2.10"
    ],
    answers: [0, 2],
    explain: "Las ACL se procesan de arriba hacia abajo y se detienen en la primera coincidencia. HTTPS hacia 192.0.2.10 coincide con la línea 10 y DNS por UDP coincide con la línea 40. El paquete SSH desde 198.51.100.20 es denegado por la línea 20 antes de llegar al permit más específico de la línea 30, un error de orden clásico. DNS por TCP, HTTP e ICMP no coinciden con ningún permit y caen en el deny explícito de la línea 50." },

  { id: "l2-security-match", d: 5, type: "match", title: "Relaciona las funciones de seguridad de la capa de acceso",
    prompt: "Relaciona cada función de seguridad de la capa de acceso con lo que hace.",
    pairs: [
      ["DHCP snooping", "Descarta los mensajes de servidor DHCP en puertos no confiables y construye la tabla de vínculos IP-MAC"],
      ["Dynamic ARP inspection", "Valida los paquetes ARP en puertos no confiables contra la tabla de vínculos"],
      ["IP source guard", "Filtra el tráfico de un puerto cuya IP de origen no coincide con el vínculo de ese puerto"],
      ["Port security", "Limita cuántas direcciones MAC puede aprender un puerto y actúa ante las violaciones"],
      ["802.1X", "Autentica al usuario o dispositivo con EAP a través de un servidor RADIUS antes de dar acceso"],
      ["MAC Authentication Bypass", "Usa la dirección MAC del endpoint como credencial cuando no tiene supplicant"]
    ],
    extra: ["Cifra las tramas salto a salto entre switches", "Limita la tasa del tráfico destinado al route processor"],
    explain: "DHCP snooping es la base: su tabla de vínculos es contra la que verifican DAI e IP source guard, así que esas dos funciones dependen de que snooping esté habilitado. Port security funciona solo con conteos de MAC. 802.1X es el control basado en identidad preferido y MAB es la alternativa para impresoras, cámaras y otros dispositivos sin supplicant. Los extras describen MACsec y CoPP." },

  { id: "rest-codes-match", d: 6, type: "match", title: "Relaciona las respuestas de una API REST con escenarios",
    prompt: "Un script de Python llama a la Intent API de Catalyst Center. Relaciona cada código de estado HTTP con el escenario que más probablemente lo produjo.",
    pairs: [
      ["200", "GET /dna/intent/api/v1/network-device devolvió la lista de dispositivos"],
      ["201", "Un POST creó un sitio nuevo y la respuesta apunta al nuevo recurso"],
      ["204", "Un DELETE tuvo éxito y la respuesta no tiene cuerpo"],
      ["400", "El cuerpo JSON enviado con un POST estaba mal formado"],
      ["401", "Faltaba el encabezado X-Auth-Token o el token había expirado"],
      ["403", "El token era válido, pero el rol del usuario no tiene permitido hacer cambios"],
      ["404", "La solicitud usó un ID de dispositivo que no existe"]
    ],
    extra: ["El servidor de la API tuvo un error interno no controlado", "El cliente superó su límite de tasa de solicitudes"],
    explain: "Los códigos 2xx indican éxito: 200 OK, 201 Created y 204 No Content. Los códigos 4xx son problemas del lado del cliente: 400 es un cuerpo de solicitud incorrecto, 401 significa que no estás autenticado (obtén un token nuevo), 403 significa que estás autenticado pero no autorizado, y 404 significa que el recurso no existe. Los extras describen 500 Internal Server Error y 429 Too Many Requests." },

  { id: "python-json-fill", d: 6, type: "fill", title: "Lee valores de un JSON analizado en Python",
    prompt: "El script de abajo analiza la respuesta de una API. Completa a qué se evalúa cada expresión.",
    context: "import json\n\nresp_text = '''\n{\n  \"response\": [\n    {\"hostname\": \"edge-rtr1\", \"softwareVersion\": \"17.9.4\", \"reachabilityStatus\": \"Reachable\"},\n    {\"hostname\": \"acc-sw2\", \"softwareVersion\": \"17.6.5\", \"reachabilityStatus\": \"Unreachable\"},\n    {\"hostname\": \"acc-sw3\", \"softwareVersion\": \"17.9.4\", \"reachabilityStatus\": \"Reachable\"}\n  ],\n  \"version\": \"1.0\"\n}\n'''\ndata = json.loads(resp_text)\ndown = [d[\"hostname\"] for d in data[\"response\"] if d[\"reachabilityStatus\"] != \"Reachable\"]",
    fields: [
      { label: "len(data[\"response\"])", answers: ["3"] },
      { label: "data[\"response\"][0][\"softwareVersion\"]", answers: ["17.9.4", "'17.9.4'", "\"17.9.4\""] },
      { label: "type(data[\"response\"]).__name__", answers: ["list"] },
      { label: "down[0]", answers: ["acc-sw2", "'acc-sw2'", "\"acc-sw2\""] }
    ],
    explain: "json.loads convierte un objeto JSON en un dict de Python y un arreglo JSON en una list, así que data['response'] es una lista de tres dicts. Los índices empiezan en 0, así que el elemento 0 es edge-rtr1 con la versión 17.9.4. La list comprehension conserva solo los dispositivos cuyo estado no es Reachable, así que down contiene únicamente acc-sw2." }
]);
