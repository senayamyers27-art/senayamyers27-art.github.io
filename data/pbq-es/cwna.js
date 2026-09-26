/* Spanish translation of the CWNA exam simulations. Same ids and structure as data/pbq/cwna.js. */
CertHub.addPbqs("cwna", [
  { id: "eirp-link-fill", d: 1, type: "fill", title: "Calcula la potencia del intentional radiator y el EIRP",
    prompt: "Un AP exterior alimenta una antena externa. Con los valores de abajo, completa cada campo (solo números).",
    context: "Potencia de transmisión del radio : 17 dBm\nPérdida del cable LMR-400        : 2 dB\nPararrayos + conectores          : 1 dB (total)\nGanancia de la antena            : 9 dBi",
    fields: [
      { label: "Potencia de transmisión en mW", answers: ["50", "50 mw", "50mw"] },
      { label: "Potencia entregada a la entrada de la antena (intentional radiator), dBm", answers: ["14", "14 dbm", "14dbm"] },
      { label: "EIRP en dBm", answers: ["23", "23 dbm", "23dbm"] },
      { label: "EIRP en mW", answers: ["200", "200 mw", "200mw"] }
    ],
    explain: "17 dBm son 20 dBm (100 mW) menos 3 dB, es decir, 50 mW. Al restar los 3 dB de pérdida del cable, el pararrayos y los conectores quedan 14 dBm en la entrada de la antena, que es el intentional radiator. Al sumar los 9 dBi de ganancia de la antena se obtienen 23 dBm de EIRP; 23 dBm son 20 dBm más 3 dB, así que 100 mW duplicados dan 200 mW. Recuerda que en dB las pérdidas se restan y la ganancia de la antena se suma, nunca se multiplica." },

  { id: "amendment-match", d: 2, type: "match", title: "Relaciona funciones con enmiendas 802.11",
    prompt: "Un documento de diseño enumera las funciones requeridas en la nueva WLAN. Relaciona cada función con la enmienda 802.11 que la define.",
    pairs: [
      ["Fast BSS transition para que los teléfonos de voz hagan roaming sin un intercambio 802.1X completo", "802.11r"],
      ["Neighbor reports y mediciones de radio que ayudan a los clientes a elegir a qué AP hacer roaming", "802.11k"],
      ["Solicitudes de BSS transition management que le sugieren a un cliente un AP mejor", "802.11v"],
      ["Protección de las tramas de deauthentication y disassociation contra la suplantación", "802.11w"],
      ["Categorías de acceso EDCA que dan prioridad a las tramas de voz sobre best effort", "802.11e"]
    ],
    extra: ["802.11h", "802.11s"],
    explain: "802.11k aporta información (neighbor reports), 802.11v permite que la red sugiera un cambio (BSS transition management) y 802.11r acelera el cambio en sí derivando las claves por adelantado, por eso las tres suelen desplegarse juntas. 802.11w define los Protected Management Frames y 802.11e define QoS, que la Wi-Fi Alliance certifica como WMM. 802.11h agrega DFS y TPC, y 802.11s define las redes mesh; ninguna de las dos corresponde a estas funciones." },

  { id: "dfs-scan-select", d: 2, type: "select", title: "Identifica los BSS en canales DFS",
    prompt: "Se muestran los resultados del escaneo de un sitio en EE. UU. Selecciona cada BSS que opera en un canal donde se requiere DFS.",
    context: "SSID    BSSID              Banda    Canal prim. Ancho\nCORP    00:11:22:33:44:01  5 GHz    36          80 MHz\nCORP    00:11:22:33:44:02  5 GHz    56          20 MHz\nCORP    00:11:22:33:44:03  5 GHz    100         40 MHz\nCORP    00:11:22:33:44:04  5 GHz    149         80 MHz\nGUEST   00:11:22:33:44:05  2.4 GHz  11          20 MHz\nCORP    00:11:22:33:44:06  5 GHz    124         20 MHz\nCORP    00:11:22:33:44:07  6 GHz    37          80 MHz\nCORP    00:11:22:33:44:08  5 GHz    44          40 MHz",
    options: ["BSSID :01, canal 36, 80 MHz", "BSSID :02, canal 56, 20 MHz", "BSSID :03, canal 100, 40 MHz", "BSSID :04, canal 149, 80 MHz", "BSSID :05, canal 11, 2.4 GHz", "BSSID :06, canal 124, 20 MHz", "BSSID :07, canal 37 de 6 GHz", "BSSID :08, canal 44, 40 MHz"],
    answers: [1, 2, 5],
    explain: "En EE. UU., DFS aplica a U-NII-2A (canales 52-64) y U-NII-2C/2e (canales 100-144), así que los canales 56, 100 y 124 requieren detección de radar. El canal 36 a 80 MHz abarca 36-48 y el canal 44 a 40 MHz abarca 44-48, todos en U-NII-1, que no es DFS; el canal 149 a 80 MHz abarca 149-161 en U-NII-3. Las bandas de 2.4 GHz y 6 GHz no tienen requisito de DFS (6 GHz standard power usa AFC en su lugar)." },

  { id: "wpa2-join-order", d: 3, type: "order", title: "Ordena las tramas al unirse a un BSS WPA2-Personal",
    prompt: "Un analizador de protocolos capturó a un cliente uniéndose a un SSID WPA2-Personal con escaneo activo. Ordena los intercambios según ocurren.",
    steps: [
      "El cliente envía un probe request para el SSID",
      "El AP responde con un probe response que enumera sus capacidades y la información RSN",
      "Se intercambian la solicitud y la respuesta de autenticación Open System",
      "El cliente envía un association request",
      "El AP envía un association response que contiene un association ID",
      "Mensaje EAPOL-Key 1: el AP envía su ANonce",
      "Los mensajes EAPOL-Key 2 a 4 completan la PTK y entregan la GTK",
      "Fluyen tramas de datos protegidas con CCMP entre el cliente y el AP"
    ],
    explain: "Primero, el cliente descubre el BSS (probe request y response, o un beacon con escaneo pasivo) y luego realiza la autenticación 802.11 Open System, que bajo WPA2 es solo una formalidad. Luego viene la asociación, que le da al cliente un AID. Solo después de la asociación se ejecuta el 4-way handshake, que empieza con el ANonce del AP, deriva la PTK y entrega la GTK; entonces se abre el puerto controlado de 802.1X y pueden fluir datos cifrados." },

  { id: "frame-purpose-match", d: 3, type: "match", title: "Relaciona las tramas 802.11 con su propósito",
    prompt: "Al revisar una captura ves los siguientes subtipos de trama. Relaciona cada trama con su propósito.",
    pairs: [
      ["Beacon", "Anuncia el BSS, sus capacidades y el TIM a intervalos regulares"],
      ["ACK", "Confirma que una sola trama unicast llegó intacta"],
      ["RTS", "Reserva el medio configurando el NAV de las estaciones que lo escuchan"],
      ["Null data", "Indica el estado de ahorro de energía del cliente sin transportar carga útil"],
      ["Deauthentication", "Notifica a una estación que su autenticación terminó"],
      ["Block Ack", "Confirma en una sola respuesta un grupo de tramas de un A-MPDU"]
    ],
    extra: ["Asigna una dirección IP al cliente", "Mide el noise floor del canal"],
    explain: "Los beacons son tramas de administración que anuncian el BSS y llevan el TIM para los clientes en reposo. ACK, RTS y Block Ack son tramas de control: ACK confirma una trama unicast, RTS usa su campo Duration para reservar tiempo de aire mediante el NAV de otras estaciones, y Block Ack confirma muchas tramas agregadas a la vez. Las tramas Null data son tramas de datos sin cuerpo, que se usan comúnmente para establecer el bit de power management. Deauthentication es una notificación de administración, no una solicitud, por eso 802.11w la protege. El direccionamiento IP viene de DHCP, no de una trama 802.11." },

  { id: "poe-budget-fill", d: 4, type: "fill", title: "Planifica PoE para un nuevo despliegue de AP",
    prompt: "Estás planificando AP 802.3at (PoE+) Class 4 en un switch de acceso con un presupuesto total de PoE de 370 W que asigna a cada puerto el máximo completo de su clase. Completa:",
    fields: [
      { label: "Potencia máxima por puerto en el PSE con 802.3af (W)", answers: ["15.4", "15.4w", "15.4 w"] },
      { label: "Potencia máxima por puerto en el PSE con 802.3at Class 4 (W)", answers: ["30", "30w", "30 w"] },
      { label: "Potencia garantizada en el dispositivo alimentado con 802.3at (W)", answers: ["25.5", "25.5w", "25.5 w"] },
      { label: "Cantidad de AP Class 4 que el switch puede alimentar con asignación completa", answers: ["12"] }
    ],
    explain: "802.3af suministra hasta 15.4 W en el switch (PSE), de los cuales 12.95 W están garantizados en el dispositivo después de la pérdida del cable. 802.3at Class 4 suministra hasta 30 W en el PSE y garantiza 25.5 W en el dispositivo alimentado. Con un presupuesto de 370 W y 30 W reservados por AP, 370 / 30 = 12.3, así que solo se pueden alimentar 12 AP; redondea hacia abajo, porque no se puede alimentar una fracción de AP. Los AP de tres radios o 4x4 pueden necesitar 802.3bt, así que revisa el consumo de cada AP durante el diseño." },

  { id: "security-choice-match", d: 5, type: "match", title: "Elige el método de seguridad WLAN adecuado",
    prompt: "Relaciona el requisito de cada organización con el método de seguridad que mejor lo cumple.",
    pairs: [
      ["Una cafetería quiere cifrado por el aire en una red sin contraseña", "Enhanced Open (OWE)"],
      ["Una oficina pequeña quiere una frase de acceso compartida que resista ataques de diccionario offline sobre un handshake capturado", "WPA3-Personal (SAE)"],
      ["Una clínica quiere inicios de sesión por usuario con nombre de usuario y contraseña, protegidos dentro de un túnel construido a partir de un certificado de servidor", "PEAP-MSCHAPv2"],
      ["Un banco quiere autenticación mutua con certificados, sin ninguna contraseña de usuario", "EAP-TLS"],
      ["Un campus quiere evitar que tramas de deauthentication falsificadas desconecten a los clientes", "Protected Management Frames (802.11w)"]
    ],
    extra: ["WEP con autenticación shared key", "Filtrado de direcciones MAC"],
    explain: "OWE le da a cada cliente claves de cifrado únicas en una red abierta sin autenticación. SAE reemplaza el intercambio PSK de WPA2 por un intercambio de claves autenticado con contraseña, así que un handshake capturado no se puede atacar por fuerza bruta offline. PEAP solo necesita un certificado de servidor y transporta las credenciales del usuario dentro del túnel TLS, mientras que EAP-TLS requiere certificados tanto en el servidor como en cada cliente. PMF (802.11w) protege criptográficamente las tramas de deauthentication y disassociation. WEP y el filtrado MAC son medidas heredadas que no brindan una protección significativa." },

  { id: "validation-survey-select", d: 6, type: "select", title: "Encuentra los AP que no pasan el validation survey",
    prompt: "El diseño requiere una señal primaria de -67 dBm o mejor, un SNR de al menos 25 dB, reintentos por debajo del 10% y una utilización del canal por debajo del 50%. Selecciona cada AP cuya área no cumple al menos un requisito.",
    context: "Validation survey posterior a la instalación (5 GHz, peor lectura en el área de cobertura de cada AP)\nAP       Ch   Signal   Noise   SNR   Retry   ChUtil\nAP-101   36   -62 dBm  -92 dBm  30 dB   4%     22%\nAP-102   52   -71 dBm  -93 dBm  22 dB   6%     18%\nAP-103  149   -64 dBm  -90 dBm  26 dB  17%     35%\nAP-104  100   -60 dBm  -80 dBm  20 dB   8%     30%\nAP-105   44   -66 dBm  -94 dBm  28 dB   5%     61%\nAP-106  157   -58 dBm  -95 dBm  37 dB   3%     25%\nAP-107   60   -67 dBm  -93 dBm  26 dB   9%     49%",
    options: ["AP-101", "AP-102", "AP-103", "AP-104", "AP-105", "AP-106", "AP-107"],
    answers: [1, 2, 3, 4],
    explain: "AP-102 no cumple ni la señal (-71 dBm es más débil que -67) ni el SNR (22 dB). AP-103 tiene buena señal, pero 17% de reintentos. AP-104 tiene una señal fuerte de -60 dBm, pero un noise floor alto de -80 dBm, así que el SNR es de solo 20 dB; un RSSI fuerte por sí solo no garantiza un enlace utilizable. AP-105 supera el 50% de utilización del canal. AP-107 queda exactamente en los umbrales (-67 dBm, 26 dB, 9%, 49%) y pasa, y AP-101 y AP-106 pasan sin problema." },

  { id: "symptom-cause-match", d: 6, type: "match", title: "Relaciona los síntomas de troubleshooting con sus causas probables",
    prompt: "Relaciona cada síntoma observado durante el troubleshooting con su causa más probable.",
    pairs: [
      ["El analizador de espectro muestra una joroba ancha de energía en 2.4 GHz cerca de los canales 9-11 con un duty cycle de aproximadamente 50%, solo a la hora del almuerzo cerca de la sala de descanso", "Interferencia de un horno de microondas"],
      ["Los clientes ven una señal fuerte del AP, pero el AP los escucha débilmente y los reintentos de subida son altos", "Desbalance de potencia de transmisión entre el AP y el cliente"],
      ["Una laptop sigue asociada a un AP lejano a -80 dBm mientras se escucha un AP cercano a -55 dBm", "Sticky client"],
      ["Clientes en extremos opuestos de una bodega no se escuchan entre sí y sus tramas colisionan en el AP", "Hidden node"],
      ["El 4-way handshake de un dispositivo se detiene después del mensaje 2 en cada intento", "Frase de acceso incorrecta"],
      ["Los clientes completan la autenticación 802.1X, pero reciben direcciones 169.254.x.x", "Configuración incorrecta de DHCP o de VLAN"]
    ],
    extra: ["Contención co-canal", "Certificado del servidor RADIUS vencido"],
    explain: "Los hornos de microondas filtran energía de banda ancha en la parte alta de la banda de 2.4 GHz con un duty cycle ligado al ciclo de la red eléctrica. Un AP configurado con alta potencia llega a clientes que transmiten con mucha menos potencia, así que el enlace de subida falla primero. El cliente, no el AP, decide cuándo hacer roaming, por eso un sticky client se aferra a un AP débil. Los hidden nodes no pueden detectar las transmisiones del otro, y RTS/CTS o celdas más pequeñas ayudan. Con una PSK incorrecta, el AP encuentra un MIC inválido en el mensaje 2 y nunca envía el mensaje 3. Las direcciones APIPA después de una autenticación exitosa apuntan a DHCP o a una VLAN incorrecta, no a la seguridad Wi-Fi; un certificado RADIUS vencido fallaría durante EAP, antes de cualquier 4-way handshake." },

  { id: "troubleshoot-order", d: 6, type: "order", title: "Ordena un proceso de troubleshooting estructurado",
    prompt: "Los usuarios reportan caídas intermitentes en la WLAN de la bodega. Ordena los pasos de una metodología de troubleshooting estructurada.",
    steps: [
      "Identifica el problema recopilando los síntomas de los usuarios y de los tickets de la mesa de ayuda",
      "Determina la escala: qué usuarios, dispositivos, áreas y horarios se ven afectados",
      "Reproduce el problema y aísla la causa con análisis de espectro y de protocolos",
      "Planifica una acción correctiva y evalúa su impacto",
      "Implementa la acción correctiva durante una ventana aprobada",
      "Verifica la corrección con un survey o una captura y confírmala con los usuarios",
      "Documenta el problema, la causa y la solución"
    ],
    explain: "El troubleshooting estructurado empieza por definir el problema y su alcance, porque saber si está afectado un solo cliente o todo un piso apunta a causas distintas. Luego reproduces y aíslas la falla antes de cambiar algo, planificas e implementas la corrección, y verificas que realmente haya resuelto el problema. La documentación va al final para que el siguiente ingeniero pueda aprender de la causa raíz y del cambio que la corrigió." }
]);
