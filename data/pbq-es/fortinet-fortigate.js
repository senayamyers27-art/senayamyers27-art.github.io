/* Spanish translation of the Fortinet FortiGate exam simulations. Same ids and structure as data/pbq/fortinet-fortigate.js. */
CertHub.addPbqs("fortinet-fortigate", [
  {
    id: "ha-election-order", d: 1, type: "order",
    title: "Elección del primario en FGCP (override deshabilitado)",
    prompt: "Con el override de HA deshabilitado (el valor predeterminado), pon los criterios de elección del primario de FGCP en el orden en que FortiGate los compara, del primero que revisa al último.",
    steps: [
      "Número de interfaces monitoreadas conectadas (gana la que tenga más)",
      "Uptime de HA por encima del margen de uptime (gana el mayor)",
      "Prioridad del dispositivo (gana la más alta)",
      "Número de serie (gana el más alto)"
    ],
    explain: "Con override desactivado, FGCP compara primero las interfaces monitoreadas, luego el uptime de HA, luego la prioridad y al final el número de serie. Como aquí el uptime pesa más que la prioridad, subir la prioridad de una unidad que regresa no la convierte en primaria hasta que se habilite override o se reinicie el uptime. El número de serie es solo el desempate final."
  },
  {
    id: "debug-flow-order", d: 1, type: "order",
    title: "Rastrea una sesión descartada con debug flow",
    prompt: "Pon estos pasos de CLI en el orden correcto para capturar un rastreo de debug flow del tráfico hacia 192.0.2.50 y luego limpiar.",
    steps: [
      "diagnose debug reset",
      "diagnose debug flow filter addr 192.0.2.50",
      "diagnose debug flow trace start 20",
      "diagnose debug enable",
      "diagnose debug disable"
    ],
    explain: "Primero reinicias cualquier filtro anterior, configuras el filtro de dirección, inicias el rastreo para cierto número de paquetes y luego habilitas debug para que la salida se imprima en la consola. No aparece nada hasta que se habilita debug. Terminas con diagnose debug disable para que la consola deje de mostrar salida una vez que ya tienes lo que necesitas."
  },
  {
    id: "conserve-mode-select", d: 1, type: "select",
    title: "Lee get system performance status",
    prompt: "Con esta salida, selecciona todas las afirmaciones correctas.",
    context: "FGT # get system performance status\nCPU states: 3% user 2% system 0% nice 95% idle\nMemory: 2020168k total, 1717060k used (85.0%), 303108k free\nMemory conserve mode: on\nAverage sessions: 4200 sessions\nUptime: 6 days, 2 hours, 11 minutes",
    options: [
      "La unidad está en memory conserve mode",
      "El uso de memoria es de alrededor del 85%, por encima del umbral rojo",
      "El recurso bajo presión es la CPU, no la memoria",
      "Ahora la configuración av-failopen decide si el tráfico inspeccionado por proxy pasa sin inspección",
      "El dispositivo lleva encendido unos 6 días"
    ],
    answers: [0, 1, 3, 4],
    explain: "La salida muestra conserve mode activado y la memoria al 85% de uso, que es la razón por la que la unidad entró en conserve mode; la CPU está 95% inactiva, así que la presión viene de la memoria y no de la CPU. En conserve mode, av-failopen decide si el tráfico que necesita AV por proxy pasa sin inspección, se descarta o pasa una vez. El uptime confirma unos 6 días."
  },
  {
    id: "policy-fields-select", d: 2, type: "select",
    title: "Qué hace coincidir una firewall policy",
    prompt: "Un FortiGate está eligiendo con qué firewall policy coincide una nueva sesión. Selecciona todos los campos que se usan para HACER COINCIDIR la política (no los campos que solo se aplican después de la coincidencia).",
    options: [
      "Interfaz de entrada y de salida",
      "Dirección de origen, usuario o ISDB",
      "Dirección de destino",
      "Servicio y horario (schedule)",
      "El perfil de antivirus asociado a la política",
      "El IP pool usado para el NAT de origen"
    ],
    answers: [0, 1, 2, 3],
    explain: "La coincidencia de políticas usa interfaces, origen, destino, servicio y horario, evaluados de arriba hacia abajo hasta la primera coincidencia. Los security profiles, como antivirus, y la configuración de NAT/IP pool se aplican solo después de que una política coincidió, así que nunca deciden qué política se selecciona."
  },
  {
    id: "ippool-match", d: 2, type: "match",
    title: "Relaciona el escenario de NAT con la opción de NAT de origen",
    prompt: "Relaciona cada escenario de NAT saliente con la MEJOR opción de NAT de origen.",
    pairs: [
      ["Una sola IP pública de WAN para todos los usuarios internos", "NAT con la dirección de la interfaz de salida"],
      ["Cuatro IP públicas compartidas por 800 usuarios", "IP pool de tipo Overload"],
      ["Cada host necesita su propia IP pública, sin traducción de puertos", "IP pool de tipo One-to-one"],
      ["Rangos de puertos externos predecibles para el registro de logs", "IP pool de tipo Fixed port range"]
    ],
    extra: ["VIP de NAT estático", "Central DNAT"],
    explain: "Una sola IP de WAN se maneja con NAT usando la dirección de la interfaz de salida. Overload comparte un pool pequeño entre muchos usuarios con traducción de puertos, mientras que one-to-one le da a cada host una IP completa (así que el tamaño del pool limita la cantidad de usuarios). Fixed port range asigna puertos externos predecibles. Los VIP y el DNAT son NAT de destino, no NAT de origen."
  },
  {
    id: "vip-portfwd-fill", d: 2, type: "fill",
    title: "Publica un servidor interno con un VIP",
    prompt: "Un servidor web interno 198.51.100.10 que escucha en TCP 443 debe ser accesible desde Internet en la IP pública 203.0.113.20, puerto externo 8443, usando un VIP con port forwarding. Completa los valores del VIP.",
    fields: [
      { label: "Dirección IP externa", answers: ["203.0.113.20"] },
      { label: "Dirección IP mapeada (interna)", answers: ["198.51.100.10"] },
      { label: "Puerto de servicio externo", answers: ["8443"] },
      { label: "Puerto mapeado (interno)", answers: ["443"] },
      { label: "Dirección de la política (de zona a zona, p. ej. WAN a DMZ)", answers: ["WAN a DMZ", "wan-to-dmz", "WAN-DMZ", "WAN a LAN", "externa a interna"] }
    ],
    explain: "Un VIP con port forwarding traduce tanto la dirección como el puerto: el externo 203.0.113.20:8443 se mapea a 198.51.100.10:443. El VIP se usa como destino de una política entrante desde el lado no confiable (WAN) hacia la interfaz del servidor. Los servicios solo hacen coincidir el tráfico; nunca reescriben el puerto, así que el port forwarding debe configurarse en el VIP."
  },
  {
    id: "fsso-mode-match", d: 2, type: "match",
    title: "Relaciona el requisito de FSSO con el modo",
    prompt: "Relaciona cada restricción de Active Directory con el despliegue de FSSO que le corresponde.",
    pairs: [
      ["Inicios de sesión en tiempo real, se permite un agente en cada DC", "Modo DC agent"],
      ["No se permite software en los controladores de dominio", "Modo polling"],
      ["Identificar a usuarios que nunca pasan por una página de inicio de sesión", "Autenticación pasiva"],
      ["Pedir a los usuarios sus credenciales de AD en un portal", "Autenticación activa (captive portal)"]
    ],
    extra: ["Accounting de TACACS+", "RADIUS CoA"],
    explain: "El modo DC agent instala un agente en cada controlador de dominio y envía los eventos de inicio de sesión en tiempo real. El modo polling lee de forma remota los logs de seguridad de los DC sin software en ellos. FSSO es single sign-on pasivo; un captive portal es autenticación activa que le pide datos al usuario. TACACS+ y RADIUS CoA no tienen relación con el descubrimiento de grupos de FSSO."
  },
  {
    id: "ssl-inspection-select", d: 3, type: "select",
    title: "Certificate inspection frente a deep inspection",
    prompt: "Una política usa actualmente certificate inspection. Selecciona todas las afirmaciones VERDADERAS sobre certificate inspection frente a deep inspection.",
    context: "Policy: LAN -> WAN\nSSL inspection profile: certificate-inspection\nSecurity profiles: AV (enabled), Web filter (enabled), App control (enabled)",
    options: [
      "Certificate inspection puede leer el SNI y aplicar categorías web",
      "El antivirus puede escanear archivos dentro de HTTPS con certificate inspection",
      "Deep inspection vuelve a firmar los certificados del servidor con la CA del FortiGate",
      "Los clientes deben confiar en la CA del FortiGate para que deep inspection no genere advertencias",
      "Las apps con certificate pinning pueden dejar de funcionar con deep inspection"
    ],
    answers: [0, 2, 3, 4],
    explain: "Certificate inspection lee el handshake sin cifrar (SNI, nombres del certificado), así que puede aplicar categorías, pero no ve el contenido, por lo que con ella el AV no puede escanear archivos dentro de TLS. Deep inspection descifra volviendo a firmar con la CA del FortiGate, en la que los clientes deben confiar, y las apps con pinning que rechazan el certificado re-firmado pueden dejar de funcionar."
  },
  {
    id: "webfilter-action-match", d: 3, type: "match",
    title: "Relaciona el comportamiento del web filter con la acción",
    prompt: "Relaciona lo que experimenta el usuario con la acción del web filter de FortiGuard o del static URL filter que lo provoca.",
    pairs: [
      ["Página intermedia; el usuario puede elegir continuar", "Warning"],
      ["Omite todas las revisiones restantes del web filter para esa URL", "Exempt"],
      ["Se permite, pero igual pasa a la revisión por categoría", "Allow"],
      ["Se registra en silencio, pero no se detiene", "Monitor"]
    ],
    extra: ["Quarantine", "Disclaimer"],
    explain: "Warning muestra una página que el usuario puede aceptar para continuar, mientras que Block no da opción. En el static URL filter, Exempt omite por completo las revisiones posteriores, pero Allow sigue pasando la URL a la revisión por categoría de FortiGuard, que podría bloquearla. Monitor permite y registra sin detener el tráfico."
  },
  {
    id: "inspection-tools-match", d: 3, type: "match",
    title: "Relaciona el control de seguridad con la amenaza",
    prompt: "Relaciona cada requisito con la función de inspección de contenido de FortiGate que MEJOR lo atiende.",
    pairs: [
      ["Bloquear BitTorrent que salta de puerto en puerto y usa TLS", "Application control"],
      ["Quitar las macros de los archivos de Office antes de entregarlos", "Content disarm and reconstruction"],
      ["Detectar malware desconocido ejecutándolo", "FortiSandbox"],
      ["Impedir que los hosts lleguen a servidores de C&C conocidos", "Bloqueo de botnet C&C de IPS"],
      ["Limitar un SYN flood antes de la búsqueda de políticas", "DoS policy"]
    ],
    extra: ["IP pool de tipo overload", "Traffic shaper"],
    explain: "El P2P que salta de puerto necesita application control basado en firmas, no el bloqueo de un solo puerto. CDR (en modo proxy) reconstruye los archivos sin contenido activo. FortiSandbox ejecuta los archivos desconocidos para analizar su comportamiento. El bloqueo de botnet C&C de IPS usa la lista de C&C de FortiGuard, y las DoS policies aplican umbrales de anomalías al principio, antes de la búsqueda de firewall policies."
  },
  {
    id: "route-select-fill", d: 4, type: "fill",
    title: "Selección de rutas estáticas por distancia y prioridad",
    prompt: "Un FortiGate tiene dos rutas estáticas por defecto: la ruta A por wan1 (distancia 10, prioridad 0) y la ruta B por wan2 (distancia 20, prioridad 0). Responde cada pregunta con un valor corto.",
    fields: [
      { label: "¿Qué ruta se instala en la tabla de enrutamiento activa? (A o B)", answers: ["A", "Ruta A", "wan1"] },
      { label: "Distancia administrativa de la ruta activa", answers: ["10"] },
      { label: "Si ambas rutas tuvieran distancia 10 y prioridades 0 y 5, ¿cuál se prefiere? (A o B)", answers: ["A", "Ruta A"] },
      { label: "Si ambas tuvieran igual distancia E igual prioridad, ¿qué tipo de reenvío resulta? (una palabra o sigla)", answers: ["ECMP", "multiruta de igual costo", "multiruta de costo igual"] }
    ],
    explain: "Gana la menor distancia administrativa, así que la ruta A (distancia 10) se instala y la B espera en la base de datos de enrutamiento. Con igual distancia, se prefiere el valor de prioridad más bajo, así que la prioridad 0 le gana a la prioridad 5. Igual distancia e igual prioridad producen ECMP, que de forma predeterminada distribuye las sesiones según la IP de origen."
  },
  {
    id: "sdwan-strategy-match", d: 4, type: "match",
    title: "Relaciona el objetivo de tráfico con la estrategia de la regla de SD-WAN",
    prompt: "Relaciona cada objetivo del negocio con la estrategia de regla de SD-WAN que le corresponde.",
    pairs: [
      ["Usar siempre el miembro con el menor jitter", "Best quality"],
      ["Usar la banda ancha económica mientras cumpla el SLA", "Lowest cost (SLA)"],
      ["Repartir las sesiones entre todos los miembros que cumplen el SLA", "Maximize bandwidth (SLA)"],
      ["Forzar la voz primero por MPLS sin importar las métricas", "Manual"]
    ],
    extra: ["Round robin por paquete", "Coincidencia del prefijo más largo"],
    explain: "Best quality elige el miembro con el mejor valor medido (aquí, el jitter). Lowest cost (SLA) usa el miembro más barato que todavía cumple el objetivo del SLA. Maximize bandwidth (SLA) balancea la carga entre todos los miembros que cumplen, y Manual fija el tráfico a los miembros elegidos sin importar las mediciones."
  },
  {
    id: "ipsec-p2-order", d: 5, type: "order",
    title: "Soluciona una falla de la fase 2",
    prompt: "La fase 1 de un túnel IPsec site-to-site está arriba, pero la fase 2 nunca se forma. Pon estos pasos de troubleshooting en un orden lógico.",
    steps: [
      "diagnose debug application ike -1",
      "diagnose debug enable",
      "Reproducir el tráfico para que IKE vuelva a negociar",
      "Comparar las propuestas de fase 2, el grupo PFS/DH y los selectores en ambos peers",
      "Corregir el selector o la propuesta que no coincide y volver a probar"
    ],
    explain: "Que la fase 1 funcione demuestra que la clave, la versión de IKE y la conectividad están bien, así que los problemas de fase 2 casi siempre son propuestas, grupo PFS/DH o selectores de quick mode que no coinciden. Inicias el debug de IKE, habilitas la salida, generas tráfico para forzar la negociación, lees la discrepancia y luego corriges el lado que falla y verificas."
  },
  {
    id: "vpn-ports-fill", d: 5, type: "fill",
    title: "Puertos de IPsec y cantidad de túneles",
    prompt: "Responde estos datos sobre IPsec. Mantén las respuestas cortas.",
    fields: [
      { label: "Puerto UDP que usa IKE", answers: ["500", "udp 500"] },
      { label: "Puerto UDP que se usa después de NAT traversal (NAT-T)", answers: ["4500", "udp 4500"] },
      { label: "Túneles necesarios para una malla completa de 5 sitios", answers: ["10"] },
      { label: "Función que permite a los spokes crear túneles directos bajo demanda", answers: ["ADVPN", "auto-discovery vpn"] }
    ],
    explain: "IKE negocia en UDP 500 y cambia a UDP 4500 cuando se necesita NAT-T. Una malla completa necesita n(n-1)/2 túneles, así que 5 sitios necesitan 10, frente a solo 4 en hub-and-spoke. ADVPN empieza como hub-and-spoke y crea túneles de atajo bajo demanda entre los spokes."
  }
]);
