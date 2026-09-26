/* Spanish translation of the Cisco CCNA exam simulations. Same ids and structure as data/pbq/ccna.js. */
CertHub.addPbqs("ccna", [
  { id: "subnet-27-fill", d: 1, type: "fill", title: "Calcula la subred /27 de un host",
    prompt: "Una impresora de sucursal está configurada como 172.16.45.200/27. Completa los valores de su subred.",
    fields: [
      { label: "Dirección de red", answers: ["172.16.45.192"] },
      { label: "Primer host utilizable", answers: ["172.16.45.193"] },
      { label: "Último host utilizable", answers: ["172.16.45.222"] },
      { label: "Dirección de broadcast", answers: ["172.16.45.223"] },
      { label: "Cantidad de hosts utilizables", answers: ["30"] }
    ],
    explain: "Una máscara /27 es 255.255.255.224, así que el tamaño de bloque en el cuarto octeto es 256 - 224 = 32. Las subredes empiezan en 0, 32, 64 ... 192, 224, y .200 cae en el bloque 192. El broadcast es uno menos que el siguiente bloque (.223), los hosts utilizables van de .193 a .222, y hay 2^5 - 2 = 30 hosts utilizables." },

  { id: "ipv6-types-match", d: 1, type: "match", title: "Identifica tipos de direcciones IPv6",
    prompt: "Ejecutas show ipv6 interface en varios dispositivos y anotas estas direcciones. Relaciona cada dirección con su tipo.",
    pairs: [
      ["FE80::21A:2BFF:FE3C:4D5E", "Unicast link-local"],
      ["2001:DB8:ACAD:10::25", "Unicast global"],
      ["FD12:3456:789A:1::1", "Unique local"],
      ["FF02::1", "Multicast (todos los nodos)"],
      ["::1", "Loopback"]
    ],
    extra: ["IPv4-mapped", "Unspecified (no especificada)"],
    explain: "FE80::/10 es link-local y se crea automáticamente en toda interfaz IPv6 (el FFFE en el medio indica un ID de interfaz EUI-64). 2000::/3 es unicast global (2001:DB8::/32 es el rango de documentación dentro de ese bloque). FC00::/7, que en la práctica se usa como FD00::/8, es unique local, el equivalente en IPv6 del espacio RFC 1918. FF00::/8 es multicast y FF02::1 llega a todos los nodos del enlace. ::1 es loopback, mientras que :: por sí sola es la dirección no especificada (unspecified)." },

  { id: "duplex-mismatch-select", d: 1, type: "select", title: "Detecta los síntomas de una discrepancia de dúplex",
    prompt: "Los usuarios detrás de SW1 reportan transferencias de archivos lentas hacia R1. En R1 Gi0/0 se fijaron manualmente speed 100 y duplex full; SW1 Gi0/1 quedó en auto. Selecciona cada línea que sea síntoma de una discrepancia de dúplex.",
    context: "SW1# show interfaces gi0/1\nGigabitEthernet0/1 is up, line protocol is up (connected)\n  Half-duplex, 100Mb/s, media type is 10/100/1000BaseTX\n     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n     0 output errors, 2140 collisions, 0 interface resets\n     0 babbles, 187 late collision, 0 deferred\n\nR1# show interfaces gi0/0\nGigabitEthernet0/0 is up, line protocol is up\n  Full-duplex, 100Mb/s, media type is RJ45\n     22 runts, 0 giants, 0 throttles\n     812 input errors, 790 CRC, 0 frame, 0 overrun, 0 ignored\n     0 output errors, 0 collisions, 0 interface resets",
    options: [
      "SW1 reporta Half-duplex mientras que R1 reporta Full-duplex",
      "SW1 muestra 187 late collisions",
      "R1 muestra errores CRC y runts en aumento",
      "Ambas interfaces reportan 100Mb/s",
      "El media type de SW1 es 10/100/1000BaseTX",
      "SW1 muestra 0 output errors y 0 interface resets"
    ],
    answers: [0, 1, 2],
    explain: "Cuando un lado está fijado manualmente, la autonegociación falla y el lado en auto cae a half duplex a la velocidad detectada. El lado half-duplex (SW1) ve late collisions porque el lado full-duplex transmite cuando quiere; el lado full-duplex (R1) ve errores CRC y runts por las tramas que SW1 abandonó a mitad de la transmisión. Que las velocidades coincidan descarta una discrepancia de velocidad, y el media type y los cero output errors no dicen nada sobre el dúplex. Corrígelo poniendo ambos lados en auto o ambos con los mismos valores fijos." },

  { id: "rstp-output-select", d: 2, type: "select", title: "Lee la salida de Rapid PVST+",
    prompt: "Revisa la salida de spanning-tree de SW2. Selecciona cada afirmación verdadera.",
    context: "SW2# show spanning-tree vlan 10\nVLAN0010\n  Spanning tree enabled protocol rstp\n  Root ID    Priority    24586\n             Address     0011.2233.4401\n             Cost        4\n             Port        1 (GigabitEthernet0/1)\n  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)\n             Address     0011.2233.4402\n\nInterface           Role Sts Cost      Prio.Nbr Type\n------------------- ---- --- --------- -------- ----------\nGi0/1               Root FWD 4         128.1    P2p\nGi0/2               Altn BLK 4         128.2    P2p\nFa0/5               Desg FWD 19        128.5    P2p Edge\nFa0/6               Desg FWD 19        128.6    P2p",
    options: [
      "SW2 no es el root bridge de la VLAN 10",
      "La prioridad configurada en el root bridge es 24576",
      "Gi0/2 está descartando tramas para evitar un bucle",
      "Fa0/5 está configurado con PortFast",
      "El costo de ruta hacia el root de SW2 es 19",
      "Gi0/1 es un designated port",
      "Fa0/6 está bloqueando"
    ],
    answers: [0, 1, 2, 3],
    explain: "Las direcciones de Root ID y Bridge ID son distintas, así que SW2 no es el root; SW2 llega al root por Gi0/1 (su root port) con un costo de 4. La prioridad del bridge incluye el número de VLAN (sys-id-ext), así que se configuró 24586 - 10 = 24576. Altn BLK significa un alternate port en estado discarding, y el tipo Edge indica PortFast. Fa0/6 es un designated port y está en forwarding." },

  { id: "roas-fill", d: 2, type: "fill", title: "Completa un diseño router-on-a-stick",
    prompt: "R1 Gi0/0 se conecta a SW1 Gi0/24 y debe enrutar entre la VLAN 10 y la VLAN 20. Con la tabla de diseño, completa los valores de configuración que faltan.",
    context: "VLAN  Nombre  Subred             Regla del gateway\n10    SALES   192.168.10.0/24    primera dirección utilizable\n20    STAFF   192.168.20.0/24    primera dirección utilizable\n99    NATIVE  (sin hosts)\n\nR1(config)# interface gi0/0.20\nR1(config-subif)# ______________\nR1(config-subif)# ip address ______________ 255.255.255.0\n\nSW1(config)# interface gi0/24\nSW1(config-if)# switchport mode ______\nSW1(config-if)# switchport trunk native vlan 99",
    fields: [
      { label: "Comando que etiqueta el tráfico de la subinterfaz para la VLAN 20", answers: ["encapsulation dot1q 20", "encapsulation dot1q 20 ", "encap dot1q 20"] },
      { label: "Dirección IP en Gi0/0.20", answers: ["192.168.20.1"] },
      { label: "Modo switchport en SW1 Gi0/24", answers: ["trunk"] },
      { label: "Gateway predeterminado para una PC en la VLAN 20", answers: ["192.168.20.1"] }
    ],
    explain: "Cada subinterfaz del router necesita encapsulation dot1Q <vlan-id> antes de aceptar una dirección IP, y la dirección de la subinterfaz se convierte en el gateway predeterminado de los hosts de esa VLAN. El puerto del switch que da al router debe ser un trunk 802.1Q para que las tramas de la VLAN 10 y 20 lleguen etiquetadas. Como la VLAN nativa es la 99 en el switch, una subinterfaz del router para la VLAN 99 necesitaría encapsulation dot1Q 99 native para coincidir." },

  { id: "route-lookup-fill", d: 3, type: "fill", title: "Elige los siguientes saltos desde una tabla de enrutamiento",
    prompt: "Con la tabla de enrutamiento de R1, ingresa la dirección de siguiente salto que usa R1 para cada destino.",
    context: "R1# show ip route\nGateway of last resort is 203.0.113.1 to network 0.0.0.0\n\nS*    0.0.0.0/0 [1/0] via 203.0.113.1\n      10.0.0.0/8 is variably subnetted, 9 subnets, 5 masks\nC        10.0.12.0/30 is directly connected, GigabitEthernet0/1\nL        10.0.12.1/32 is directly connected, GigabitEthernet0/1\nC        10.0.13.0/30 is directly connected, GigabitEthernet0/2\nL        10.0.13.1/32 is directly connected, GigabitEthernet0/2\nC        10.0.14.0/30 is directly connected, GigabitEthernet0/3\nL        10.0.14.1/32 is directly connected, GigabitEthernet0/3\nO        10.1.0.0/16 [110/20] via 10.0.12.2, 00:14:02, GigabitEthernet0/1\nO        10.1.4.0/22 [110/30] via 10.0.13.2, 00:14:02, GigabitEthernet0/2\nS        10.1.5.0/24 [1/0] via 10.0.14.2\n      203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks\nC        203.0.113.0/29 is directly connected, GigabitEthernet0/0\nL        203.0.113.2/32 is directly connected, GigabitEthernet0/0",
    fields: [
      { label: "Destino 10.1.5.77", answers: ["10.0.14.2"] },
      { label: "Destino 10.1.6.9", answers: ["10.0.13.2"] },
      { label: "Destino 10.1.200.1", answers: ["10.0.12.2"] },
      { label: "Destino 10.2.0.1", answers: ["203.0.113.1"] }
    ],
    explain: "El router siempre elige el prefijo coincidente más largo; la distancia administrativa y la métrica solo desempatan entre rutas hacia el mismo prefijo. 10.1.5.77 coincide con /16, /22 y /24, así que gana la estática /24. 10.1.6.9 está dentro de 10.1.4.0/22 (de 10.1.4.0 a 10.1.7.255) pero no de la /24, así que gana la /22 de OSPF. 10.1.200.1 solo coincide con la /16, y 10.2.0.1 no coincide con nada más que la ruta predeterminada." },

  { id: "ospf-adjacency-select", d: 3, type: "select", title: "Descubre por qué no se forman los vecinos OSPF",
    prompt: "R1 y R2 comparten el enlace 10.0.12.0/24, pero show ip ospf neighbor está vacío en ambos. Selecciona cada discrepancia que impide la adyacencia.",
    context: "R1# show ip ospf interface gi0/0\nGigabitEthernet0/0 is up, line protocol is up\n  Internet Address 10.0.12.1/24, Area 0\n  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n\nR2# show ip ospf interface gi0/0\nGigabitEthernet0/0 is up, line protocol is up\n  Internet Address 10.0.12.2/24, Area 1\n  Process ID 2, Router ID 2.2.2.2, Network Type BROADCAST, Cost: 10\n  Timer intervals configured, Hello 5, Dead 20, Wait 20, Retransmit 5",
    options: [
      "Las interfaces están en áreas distintas (0 y 1)",
      "Los temporizadores hello y dead no coinciden",
      "Los process ID de OSPF son distintos (1 y 2)",
      "Los costos de las interfaces son distintos (1 y 10)",
      "Los router ID son diferentes",
      "Las máscaras de subred no coinciden"
    ],
    answers: [0, 1],
    explain: "Los vecinos deben coincidir en el ID de área, la subred y la máscara, los intervalos hello y dead, la autenticación y (para la adyacencia completa) la MTU, y sus router ID deben ser únicos. Aquí el área y los temporizadores son distintos, así que se rechazan los hellos. El process ID tiene significado local y puede ser distinto, el costo es un valor de salida de cada router, los router ID diferentes son obligatorios, y ambas máscaras son /24." },

  { id: "ospf-states-order", d: 3, type: "order", title: "Ordena los estados de vecino OSPF",
    prompt: "Se levantan dos routers OSPF en un segmento broadcast. Ordena los estados de vecino por los que pasan hasta llegar a la adyacencia completa.",
    steps: ["Down", "Init", "2-Way", "ExStart", "Exchange", "Loading", "Full"],
    explain: "Down significa que todavía no hay hellos; Init significa que llegó un hello pero no incluye nuestro router ID; 2-Way significa que cada router se ve a sí mismo en el hello del otro (aquí ocurre la elección de DR/BDR). En ExStart el par elige un master y el número de secuencia inicial, en Exchange intercambian resúmenes DBD, en Loading solicitan los LSA que les faltan, y Full significa que las bases de datos están sincronizadas. Un router atascado en ExStart/Exchange suele indicar una discrepancia de MTU." },

  { id: "acl-evaluate-select", d: 4, type: "select", title: "Evalúa una ACL extendida",
    prompt: "La ACL de abajo está aplicada en sentido de entrada en R1 Gi0/1, que da a la LAN 192.168.10.0/24. Selecciona cada flujo que la ACL permite.",
    context: "R1# show access-lists LAN-IN\nExtended IP access list LAN-IN\n    10 deny tcp 192.168.10.0 0.0.0.255 host 10.20.0.5 eq www\n    20 permit icmp 192.168.10.0 0.0.0.255 any\n    30 permit tcp 192.168.10.0 0.0.0.127 any eq 443\n    40 permit udp any any eq domain\n\nR1# show running-config interface gi0/1\ninterface GigabitEthernet0/1\n ip address 192.168.10.1 255.255.255.0\n ip access-group LAN-IN in",
    options: [
      "192.168.10.20 a 10.20.0.5, puerto TCP 80",
      "192.168.10.20 a 10.20.0.5, ICMP echo request",
      "192.168.10.200 a 10.20.0.5, puerto TCP 443",
      "192.168.10.50 a 10.20.0.5, puerto TCP 443",
      "192.168.10.60 a 10.20.0.9, puerto TCP 80",
      "192.168.10.90 a 10.20.0.53, puerto UDP 53",
      "192.168.10.30 a 10.20.0.5, puerto TCP 22"
    ],
    answers: [1, 3, 5],
    explain: "Las ACL se procesan de arriba hacia abajo y se detienen en la primera coincidencia, con un deny implícito al final. La línea 10 bloquea HTTP hacia 10.20.0.5; la línea 20 permite todo ICMP desde la LAN. El wildcard 0.0.0.127 de la línea 30 solo coincide con .0 a .127, así que .50 tiene permitido HTTPS pero .200 no. HTTP hacia 10.20.0.9 y SSH no coinciden con ningún permit y caen en el deny implícito, mientras que DNS por UDP 53 coincide con la línea 40." },

  { id: "l2-security-match", d: 4, type: "match", title: "Relaciona funciones de protección de Capa 2",
    prompt: "Relaciona cada función o configuración del switch de acceso con la acción que realiza.",
    pairs: [
      ["Port security, violation shutdown", "Pone el puerto en err-disabled cuando una MAC desconocida supera el máximo"],
      ["Port security, violation restrict", "Descarta las tramas infractoras, incrementa el contador de violaciones y lo registra en el log"],
      ["Port security, violation protect", "Descarta las tramas infractoras en silencio, sin contador ni log"],
      ["DHCP snooping", "Descarta los mensajes de servidor DHCP que llegan por puertos no confiables"],
      ["Dynamic ARP inspection", "Descarta los paquetes ARP cuyo vínculo IP-MAC no está en la tabla de snooping"],
      ["BPDU guard", "Pone en err-disabled un puerto PortFast que recibe una BPDU"]
    ],
    extra: ["Cifra las tramas entre el switch y el host", "Asigna el puerto a una VLAN de invitados después de un fallo de 802.1X"],
    explain: "Port security tiene tres modos de violación: shutdown (el predeterminado) pone el puerto en err-disabled, restrict descarta y reporta, y protect descarta en silencio. DHCP snooping detiene servidores DHCP no autorizados confiando solo en los puertos uplink y construye una tabla de vínculos, que luego Dynamic ARP inspection usa para rechazar ARP falsificados. BPDU guard protege los puertos de borde PortFast de que alguien conecte un switch." },

  { id: "syslog-trap-select", d: 5, type: "select", title: "Predice qué mensajes de syslog llegan al servidor",
    prompt: "R1 está configurado con logging host 192.168.50.10 y logging trap warnings. Selecciona cada mensaje que se enviará al servidor syslog.",
    context: "R1# show logging (extracto del buffer)\n1. %SYS-5-CONFIG_I: Configured from console by admin on vty0 (192.168.50.25)\n2. %LINK-3-UPDOWN: Interface GigabitEthernet0/1, changed state to down\n3. %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down\n4. %OSPF-5-ADJCHG: Process 1, Nbr 2.2.2.2 on GigabitEthernet0/1 from FULL to DOWN\n5. %SEC_LOGIN-4-LOGIN_FAILED: Login failed [user: admin] [Source: 198.51.100.44]\n6. %SYS-2-MALLOCFAIL: Memory allocation of 65536 bytes failed\n7. %SEC-6-IPACCESSLOGP: list LAN-IN denied tcp 192.168.10.60 -> 10.20.0.9(80), 1 packet",
    options: ["Mensaje 1", "Mensaje 2", "Mensaje 3", "Mensaje 4", "Mensaje 5", "Mensaje 6", "Mensaje 7"],
    answers: [1, 4, 5],
    explain: "El número después de la facility en %FACILITY-SEVERITY-MNEMONIC es la severidad (0 emergencies, 1 alerts, 2 critical, 3 errors, 4 warnings, 5 notifications, 6 informational, 7 debugging). logging trap warnings envía el nivel 4 y todo lo más grave (0-4), así que salen los mensajes de nivel 3, 4 y 2. Los notifications de nivel 5 y el log de ACL de nivel 6 se quedan en el equipo local a menos que se suba el nivel de trap." }
]);
