CertHub.addLessons("server-plus", [
 {
  "t": "Rack planning: rack units, rail kits, weight distribution (heaviest at the bottom), airflow, hot and cold aisles, cable management arms",
  "tt": "Planificación del rack: unidades de rack, kits de rieles, distribución del peso (lo más pesado abajo), flujo de aire, pasillos calientes y fríos, brazos de gestión de cables",
  "body": [
   "La mayoría de los servidores de un centro de datos se alojan en un rack de equipos estándar de 19 pulgadas. Planificar ese rack antes de atornillar cualquier cosa te evita equipos sobrecalentados, un gabinete que se vuelca y una maraña de cables que nadie puede rastrear. Server+ espera que conozcas la unidad de medida, cómo se monta el equipo, dónde va el equipo pesado y cómo debe moverse el aire.",
   "La altura dentro de un rack se mide en unidades de rack (U). Una U equivale a 1.75 pulgadas (44.45 mm). Un servidor descrito como 1U mide 1.75 pulgadas de alto, un servidor 2U mide 3.5 pulgadas, y así sucesivamente. Los racks de altura completa suelen ser de 42U, aunque existen otras alturas. Al planificar, sumas las U de cada dispositivo más espacio para patch panels, paneles ciegos y crecimiento futuro, y documentas el plan como un diagrama de elevación del rack que muestra qué ocupa cada posición U.",
   "Los servidores se montan sobre kits de rieles. Los rieles deslizantes te permiten sacar un servidor como un cajón para cambiar una pieza sin desmontarlo del rack; los rieles fijos o estáticos simplemente sostienen el dispositivo. Los rieles vienen en versiones sin herramientas (tool-less) que encajan en racks de orificios cuadrados y en versiones roscadas que necesitan tornillos o tuercas enjauladas (cage nuts). Usa siempre los rieles diseñados para el chasis y el tipo de rack, y verifica la carga nominal del rack. Un brazo de gestión de cables (CMA) se fija en la parte trasera de un servidor deslizante y pliega sus cables de alimentación y de red para que el servidor pueda deslizarse hacia afuera sin desconectar nada.",
   "La distribución del peso es una regla de seguridad: coloca el equipo más pesado, como las unidades de sistema de alimentación ininterrumpida (UPS), los paquetes de baterías y los arreglos de almacenamiento grandes, en la parte inferior. Un rack con demasiado peso arriba puede volcarse cuando alguien extiende un servidor sobre sus rieles. Instala patas estabilizadoras o ancla el rack al piso, y extiende solo un dispositivo a la vez.",
   "Los servidores toman aire frío por el frente y expulsan aire caliente por la parte trasera. En una disposición de pasillo caliente/pasillo frío, las filas de racks se enfrentan de modo que los frentes comparten un pasillo frío alimentado con aire frío y las partes traseras comparten un pasillo caliente donde el aire expulsado se recoge y se devuelve a las unidades de enfriamiento. Mezclar ambos, por ejemplo orientando el escape de una fila hacia la toma de aire de otra, desperdicia enfriamiento y eleva las temperaturas de entrada. Los paneles ciegos en los espacios U vacíos impiden que el aire caliente recircule por los huecos hacia el frente, y algunos sitios agregan contención de pasillos (puertas o techos) para mantener separados los flujos.",
   "Una buena gestión de cables también favorece el flujo de aire. Pasa los cables por los costados usando organizadores verticales, mantén ordenados los tendidos de energía y de datos, etiqueta ambos extremos y nunca bloquees las tomas o salidas de aire de los ventiladores con manojos de cables. Deja suficiente holgura para los rieles deslizantes, pero no tanta como para que queden lazos colgando detrás de los ventiladores."
  ],
  "terms": [
   [
    "Rack unit (U) (unidad de rack)",
    "La medida vertical estándar para equipos de rack: 1.75 pulgadas (44.45 mm)."
   ],
   [
    "Hot aisle/cold aisle (pasillo caliente/pasillo frío)",
    "Una disposición en la que los frentes de los racks dan a un pasillo compartido de aire frío y las partes traseras a un pasillo compartido de escape, manteniendo separados el aire de entrada y el de salida."
   ],
   [
    "Blanking panel (panel ciego)",
    "Una placa que cubre un espacio vacío del rack para que el aire caliente de escape no regrese a las tomas de aire de los equipos."
   ],
   [
    "Cable management arm (CMA) (brazo de gestión de cables)",
    "Un brazo articulado en la parte trasera de un servidor deslizante que lleva sus cables para que el servidor pueda extenderse sin desconectarlos."
   ]
  ],
  "example": "Un equipo agrega seis servidores 2U a un rack de 42U que ya tiene un UPS de 3U en la parte superior. Durante la planificación mueven el UPS y su paquete de baterías a la parte inferior, colocan los servidores encima, llenan los espacios sin uso con paneles ciegos y orientan el rack para que los servidores tomen aire del pasillo frío.",
  "tip": "Si una pregunta te pide dónde colocar el UPS o el dispositivo más pesado, la respuesta es la parte inferior del rack. Si pregunta cómo evitar que el aire caliente recircule por espacios vacíos del rack, la respuesta son los paneles ciegos.",
  "check": [
   [
    "¿Qué altura tiene un servidor 4U?",
    "Siete pulgadas, porque cada unidad de rack mide 1.75 pulgadas."
   ],
   [
    "¿Por qué las tomas de aire de los servidores deben dar al pasillo frío?",
    "Los servidores toman aire por el frente y lo expulsan por atrás, así que al dar al pasillo frío reciben aire fresco mientras el escape va al pasillo caliente para su extracción."
   ],
   [
    "¿Qué te permite hacer un brazo de gestión de cables?",
    "Deslizar un servidor sobre sus rieles para darle servicio sin desconectar sus cables de alimentación y de red."
   ]
  ]
 },
 {
  "t": "Server form factors: tower, rack mount, blade enclosures",
  "tt": "Factores de forma de servidores: torre, montaje en rack, gabinetes blade",
  "body": [
   "El factor de forma de un servidor es su forma física y la manera en que está alojado. El mismo procesador y la misma memoria pueden venir en paquetes muy distintos, y la elección correcta depende de cuántos servidores necesitas, cuánto espacio de piso o de rack tienes y cómo quieres compartir la energía, el enfriamiento y la red. Server+ evalúa tres factores de forma: torre, montaje en rack y blade.",
   "Un servidor torre parece una computadora de escritorio grande y se coloca en el piso o en un estante. No necesita rack, suele ser silencioso y a menudo tiene muchas bahías internas para discos y ranuras de expansión. Las torres son adecuadas para oficinas pequeñas o sucursales que necesitan uno o dos servidores y no tienen sala de servidores. Sus debilidades son la densidad y la administración a escala: diez torres ocupan mucho espacio de piso, cada una tiene sus propios cables de alimentación y de red, y son difíciles de asegurar. Algunas torres pueden convertirse a montaje en rack con un kit de conversión.",
   "Un servidor de montaje en rack es un chasis plano que se atornilla sobre rieles en un rack estándar de 19 pulgadas. Los tamaños se indican en unidades de rack: los servidores 1U son densos pero solo tienen espacio para unos pocos discos y tarjetas de expansión de perfil bajo, mientras que los servidores 2U y 4U sacrifican densidad a cambio de más bahías para discos, tarjetas de altura completa, ventiladores más grandes y, a veces, más procesadores. Cada servidor de rack sigue siendo una máquina completa e independiente con sus propias fuentes de alimentación, ventiladores y puertos de red, por lo que un rack lleno de ellos necesita muchos cables de alimentación y de red.",
   "Un sistema blade tiene dos partes. El gabinete blade (blade enclosure, también llamado chasis) se monta en el rack y proporciona fuentes de alimentación compartidas, ventiladores de enfriamiento, un módulo de administración y módulos de interconexión de red o almacenamiento. Los servidores blade se deslizan en ranuras en el frente del gabinete; cada blade contiene procesadores, memoria y normalmente una pequeña cantidad de almacenamiento local, pero depende del gabinete para la energía, el enfriamiento y la conectividad. Los blades ofrecen la mayor densidad y muchos menos cables, y una sola interfaz de administración puede controlar todos los blades. Las desventajas son un mayor costo inicial por el gabinete, la dependencia del proveedor (vendor lock-in) porque los blades solo encajan en el chasis de ese proveedor, y un componente compartido (como el backplane o midplane del gabinete) que debe diseñarse con redundancia para que no sea un punto único de falla.",
   "Al elegir, adapta el factor de forma a la situación. Un solo servidor de archivos en una oficina pequeña apunta a una torre. Un centro de datos en crecimiento que necesita servidores flexibles e independientes apunta al montaje en rack. Un sitio que necesita muchos nodos de cómputo idénticos en un espacio mínimo con administración centralizada apunta a los blades. Considera también la densidad de potencia: un gabinete blade completamente cargado consume mucha energía y produce mucho calor en un área pequeña, así que los circuitos y el enfriamiento del rack deben dimensionarse para ello."
  ],
  "terms": [
   [
    "Tower server (servidor torre)",
    "Un servidor independiente en un gabinete vertical, adecuado para sitios pequeños sin rack."
   ],
   [
    "Rack mount server (servidor de montaje en rack)",
    "Un servidor diseñado para atornillarse en un rack de 19 pulgadas, dimensionado en unidades de rack (1U, 2U, 4U)."
   ],
   [
    "Blade enclosure (gabinete blade)",
    "Un chasis montado en rack que suministra energía, enfriamiento, red y administración compartidos a los servidores blade insertados en él."
   ],
   [
    "Blade server (servidor blade)",
    "Un módulo de servidor delgado que contiene CPU y memoria y que depende de su gabinete para la energía, el enfriamiento y la conectividad."
   ]
  ],
  "example": "Una clínica con un pequeño armario y sin rack compra un servidor torre para compartir archivos. El centro de datos del hospital, que ejecuta cientos de máquinas virtuales, usa gabinetes blade para que dieciséis nodos de cómputo compartan fuentes de alimentación redundantes y un solo módulo de administración en una fracción del espacio de rack.",
  "tip": "Los blades ganan en densidad y cableado, pero dependen de un gabinete compartido y de un solo proveedor. Si una pregunta enfatiza menos cables, energía y enfriamiento compartidos y administración centralizada, piensa en blade.",
  "check": [
   [
    "¿Qué factor de forma comparte fuentes de alimentación y ventiladores entre muchos servidores?",
    "Los servidores blade, que obtienen la energía, el enfriamiento y la conectividad del gabinete blade."
   ],
   [
    "¿Por qué elegirías un servidor de rack 2U en lugar de uno 1U?",
    "Un chasis 2U tiene espacio para más discos, tarjetas de expansión de altura completa y ventiladores más grandes y silenciosos, a costa de la densidad del rack."
   ]
  ]
 },
 {
  "t": "Power: voltage, redundant power supplies, PDUs, UPS sizing and runtime, generators, separate circuits, power connector types",
  "tt": "Energía: voltaje, fuentes de alimentación redundantes, PDU, dimensionamiento y autonomía del UPS, generadores, circuitos separados, tipos de conectores de energía",
  "body": [
   "Los servidores son tan confiables como la energía que los alimenta. Server+ espera que planifiques la energía desde el tomacorriente de la pared hasta la fuente de alimentación: qué voltaje, cuántas fuentes, cómo se distribuye la energía en el rack, cuánto tiempo sostendrá un UPS la carga y qué toma el relevo durante un corte prolongado.",
   "Los servidores aceptan un rango de voltajes de entrada. En Norteamérica, los tomacorrientes generales suministran unos 120 V, mientras que los centros de datos suelen usar circuitos de 208 V o 240 V porque un voltaje más alto entrega la misma potencia con menos corriente, lo que significa más equipos por circuito. Muchas regiones usan 230 V. La mayoría de las fuentes de alimentación de servidores son de rango automático (auto-ranging) y funcionan en estos voltajes, pero revisa siempre la etiqueta. La potencia en watts es igual a volts por amperes, y la capacidad de un UPS suele indicarse en volt-amperes (VA), que es la potencia aparente; la capacidad en watts es menor y depende del factor de potencia.",
   "La mayoría de los servidores admiten fuentes de alimentación (PSU) redundantes, normalmente dos unidades intercambiables en caliente. Con ambas funcionando, comparten la carga; si una falla, la otra sostiene todo el servidor. La redundancia solo ayuda si las fuentes se alimentan desde orígenes separados, así que conecta la PSU 1 a la unidad de distribución de energía (PDU) del lado A y la PSU 2 a la PDU del lado B, cada una en su propio circuito e idealmente en su propio UPS. Una PDU de rack es una regleta de tomacorrientes diseñada para racks; las PDU básicas solo distribuyen energía, las PDU con medición (metered) muestran el consumo de corriente y las PDU conmutadas (switched) te permiten encender o apagar tomas individuales de forma remota.",
   "Un UPS (sistema de alimentación ininterrumpida) usa baterías para mantener los equipos funcionando durante cortes breves y para acondicionar la energía. Para dimensionar un UPS, suma la potencia en watts de cada dispositivo conectado, agrega margen para el crecimiento (una regla común es evitar cargar un UPS cerca de su máximo) y asegúrate de que tanto la capacidad en watts como en VA cubran la carga. La autonomía (runtime) depende de la carga: el mismo UPS dura mucho más al 30 por ciento de carga que al 90 por ciento, así que revisa la tabla de autonomía del fabricante. El UPS debe funcionar lo suficiente para permitir que arranque un generador o para iniciar un apagado ordenado mediante su software de administración.",
   "Un generador de respaldo se encarga de los cortes prolongados. Un interruptor de transferencia automática (ATS) detecta la pérdida de la energía de la red eléctrica y cambia el edificio al generador una vez que este está funcionando. El UPS cubre el intervalo de segundos a minutos mientras arranca el generador. Los generadores necesitan combustible y pruebas periódicas bajo carga.",
   "Conoce los conectores comunes. Los servidores suelen usar una entrada IEC C14 en la PSU con un cable C13 para fuentes estándar, y C20/C19 para equipos de mayor corriente. Las PDU de rack y los UPS pueden conectarse al edificio con clavijas NEMA con bloqueo, como las series L5 (120 V) o L6 (208/240 V) en Norteamérica. Mantén los circuitos separados y no sobrecargues un ramal; un interruptor disparado nunca debería apagar ambas fuentes de un servidor."
  ],
  "terms": [
   [
    "Redundant power supply (fuente de alimentación redundante)",
    "Una segunda PSU que puede soportar toda la carga si la primera falla, normalmente intercambiable en caliente."
   ],
   [
    "PDU (power distribution unit) (unidad de distribución de energía)",
    "Una regleta de tomacorrientes montada en rack; los modelos con medición reportan la carga y los modelos conmutados permiten controlar las tomas de forma remota."
   ],
   [
    "UPS (uninterruptible power supply) (sistema de alimentación ininterrumpida)",
    "Un dispositivo con respaldo de baterías que mantiene alimentados los equipos durante cortes breves y acondiciona la energía entrante."
   ],
   [
    "Automatic transfer switch (ATS) (interruptor de transferencia automática)",
    "Un dispositivo que traslada la carga de la red eléctrica a un generador cuando falla la energía de la red."
   ]
  ],
  "example": "Un administrador conecta las dos fuentes de alimentación de cada servidor a la PDU A y a la PDU B, alimentadas por UPS separados en circuitos separados. Cuando se dispara un interruptor en el circuito A, todos los servidores siguen funcionando con su fuente del lado B, y nadie se da cuenta hasta que llega la alerta de monitoreo.",
  "tip": "Las PSU redundantes conectadas a la misma PDU o al mismo circuito no son realmente redundantes. Las respuestas del examen favorecen alimentaciones A y B en circuitos separados, y la autonomía del UPS la determina la carga, no solo el tamaño del UPS.",
  "check": [
   [
    "¿Por qué un UPS dura más con menos servidores conectados?",
    "La autonomía depende de la carga; una carga más ligera descarga las baterías más lentamente."
   ],
   [
    "¿Qué papel cumple el UPS cuando un sitio tiene generador?",
    "Sostiene la carga durante los segundos o minutos antes de que arranque el generador y el interruptor de transferencia traslade la carga a él."
   ],
   [
    "¿Qué agrega una PDU conmutada frente a una PDU básica?",
    "Control remoto de tomas individuales, para que puedas reiniciar la alimentación de un dispositivo sin ir al rack."
   ]
  ]
 },
 {
  "t": "Network cabling and connectors: Cat5e/Cat6/Cat6a, single-mode vs multimode fiber, SFP/SFP+/QSFP transceivers, twinax/DAC, labeling",
  "tt": "Cableado y conectores de red: Cat5e/Cat6/Cat6a, fibra monomodo vs. multimodo, transceptores SFP/SFP+/QSFP, twinax/DAC, etiquetado",
  "body": [
   "Los servidores se conectan a los switches y al almacenamiento con cables de cobre o de fibra. Elegir el cable correcto depende de la velocidad que necesitas, la distancia, los puertos en cada extremo y el presupuesto. Server+ evalúa las categorías comunes y los módulos enchufables que se usan en las salas de servidores.",
   "El cable de cobre de par trenzado usa conectores RJ45 y se clasifica por categoría. Cat5e admite Ethernet de 1 Gbps hasta 100 metros. Cat6 también admite 1 Gbps hasta 100 metros y puede transportar 10 Gbps en tramos más cortos (unos 55 metros). Cat6a (aumentada) admite 10 Gbps en los 100 metros completos y tiene mejor protección contra la diafonía (crosstalk). Para cobre nuevo en salas de servidores, Cat6a es una elección común porque soporta 10GBASE-T a longitud completa. Las versiones blindadas ayudan en áreas con mucho ruido eléctrico.",
   "El cable de fibra óptica transporta luz en lugar de electricidad, por lo que es inmune a la interferencia electromagnética y llega mucho más lejos. La fibra multimodo (MMF) tiene un núcleo más grande, usa fuentes de luz más baratas y se emplea en tramos más cortos dentro de un edificio o centro de datos, normalmente hasta unos pocos cientos de metros según la velocidad y el grado (OM3, OM4, etc.). La fibra monomodo (SMF) tiene un núcleo muy estrecho y usa láseres para transportar una sola trayectoria de luz a lo largo de kilómetros, por lo que se usa entre edificios y para enlaces largos de campus o metropolitanos. Los conectores de fibra comunes incluyen LC (pequeño, la opción habitual en transceptores) y SC (más grande, cuadrado). La fibra en ambos extremos debe coincidir: la óptica monomodo necesita cable monomodo.",
   "Muchos switches y tarjetas de red de servidores usan ranuras vacías (cages) que aceptan transceptores enchufables. Un módulo SFP (small form-factor pluggable) normalmente transporta 1 Gbps; SFP+ transporta 10 Gbps en una ranura del mismo tamaño; SFP28 transporta 25 Gbps; los módulos QSFP (quad SFP) combinan cuatro carriles para 40 Gbps (QSFP+) o 100 Gbps (QSFP28). El transceptor determina el medio: puedes insertar una óptica multimodo de corto alcance, una óptica monomodo de largo alcance o un módulo de cobre. Ambos extremos deben usar ópticas compatibles, y algunos fabricantes restringen qué módulos de terceros acepta su hardware.",
   "Para conexiones cortas dentro de un rack, un cable de cobre de conexión directa (DAC) es más barato y consume menos energía que dos ópticas más fibra. Un DAC es un cable twinax (cobre biaxial) con extremos SFP+ o QSFP fijos, normalmente de unos pocos metros de largo. Los cables ópticos activos (AOC) son el equivalente en fibra para tramos algo más largos.",
   "Etiqueta cada cable en ambos extremos con un esquema consistente, por ejemplo el rack, el dispositivo y el puerto de cada extremo, y regístralo en tu documentación. Las buenas etiquetas agilizan la resolución de problemas y evitan que alguien desconecte el enlace equivocado durante el mantenimiento. Usa código de colores si tu organización tiene un estándar, y respeta el radio de curvatura de la fibra para no dañarla."
  ],
  "terms": [
   [
    "Cat6a",
    "Cable de par trenzado Categoría 6 aumentada que admite Ethernet de 10 Gbps hasta 100 metros."
   ],
   [
    "Single-mode fiber (fibra monomodo)",
    "Fibra con un núcleo muy pequeño que transporta una sola trayectoria de luz a largas distancias, usada para enlaces entre edificios y de larga distancia."
   ],
   [
    "Multimode fiber (fibra multimodo)",
    "Fibra con un núcleo más grande que transporta múltiples trayectorias de luz a distancias más cortas, común dentro de los centros de datos."
   ],
   [
    "DAC (direct attach copper) (cobre de conexión directa)",
    "Un cable twinax con extremos tipo transceptor fijos, usado para enlaces cortos, de bajo costo y alta velocidad dentro de un rack o entre racks adyacentes."
   ]
  ],
  "example": "Un servidor necesita dos enlaces de 10 Gbps a un switch top-of-rack ubicado a un metro. En lugar de comprar cuatro ópticas SFP+ y cables de parcheo de fibra, el administrador usa dos cables DAC SFP+, etiqueta ambos extremos con el nombre del servidor y el puerto, y actualiza la hoja de cálculo del cableado.",
  "tip": "La distancia decide la mayoría de las preguntas de cableado: DAC para unos pocos metros, multimodo para tramos dentro del centro de datos, monomodo para kilómetros. Cat6a es la respuesta en cobre para 10 Gbps a 100 metros.",
  "check": [
   [
    "¿Qué cable usarías para enlazar dos edificios separados por varios kilómetros?",
    "Fibra monomodo, porque su núcleo estrecho y su óptica láser transportan señales a largas distancias."
   ],
   [
    "¿Cuál es la diferencia entre SFP y SFP+?",
    "Tienen el mismo tamaño, pero SFP normalmente es de 1 Gbps y SFP+ es de 10 Gbps."
   ]
  ]
 },
 {
  "t": "Drive types: HDD speeds (7.2K/10K/15K), SSD, NVMe, SAS vs SATA, hot-swap and hot-plug",
  "tt": "Tipos de discos: velocidades de HDD (7.2K/10K/15K), SSD, NVMe, SAS vs. SATA, intercambio en caliente (hot-swap) y conexión en caliente (hot-plug)",
  "body": [
   "El almacenamiento suele ser la parte más lenta de un servidor, así que elegir bien los discos importa. Server+ evalúa cómo se comparan los tipos de discos en velocidad, capacidad, confiabilidad y costo, las interfaces que usan y si puedes reemplazarlos mientras el servidor está funcionando.",
   "Un disco duro (HDD) almacena datos en platos magnéticos giratorios leídos por un cabezal móvil. Su velocidad se mide en revoluciones por minuto (RPM). Los discos de 7,200 RPM (7.2K) ofrecen la mayor capacidad por el dinero y son adecuados para almacenamiento masivo, respaldos y archivos. Los discos de 10,000 RPM (10K) y 15,000 RPM (15K) giran más rápido, por lo que la latencia rotacional es menor y entregan más operaciones de entrada/salida por segundo (IOPS), pero cuestan más por gigabyte y almacenan menos. Las velocidades de giro más altas han sido reemplazadas en gran medida por los SSD para cargas de trabajo de rendimiento, pero las diferencias todavía aparecen en el examen.",
   "Una unidad de estado sólido (SSD) usa memoria flash sin partes móviles. Tiene una latencia mucho menor y muchas más IOPS que cualquier HDD, consume menos energía y maneja bien el acceso aleatorio. Los SSD cuestan más por gigabyte y cada celda flash tolera un número limitado de escrituras, por lo que los SSD empresariales se clasifican por resistencia (endurance), a menudo en escrituras de disco completo por día (DWPD). Elige SSD de uso intensivo de escritura para bases de datos y logs, y SSD de uso intensivo de lectura para contenido que cambia poco.",
   "La interfaz importa tanto como el medio. SATA (Serial ATA) es económica y común en equipos de escritorio y servidores de bajo costo. SAS (Serial Attached SCSI) es la interfaz empresarial: admite velocidades más altas en sus versiones actuales, puertos duales para que dos controladoras puedan llegar al mismo disco con redundancia, colas de comandos más profundas y mejor manejo de errores. Una controladora SAS normalmente puede operar discos SATA, pero una controladora SATA no puede operar discos SAS. NVMe (Non-Volatile Memory Express) es un protocolo diseñado para flash que conecta los SSD directamente al bus PCIe (Peripheral Component Interconnect Express), evitando la ruta de controladora antigua orientada a discos. Los discos NVMe se presentan como tarjetas de expansión, módulos M.2 o discos U.2/U.3 en bahías frontales y ofrecen la menor latencia.",
   "Hot-swap (intercambio en caliente) significa que puedes retirar y reemplazar un componente mientras el sistema está funcionando, sin apagarlo ni avisar primero al sistema operativo; el hardware y la controladora RAID se encargan de ello. Hot-plug (conexión en caliente) significa que puedes agregar o retirar un componente mientras el sistema está funcionando, pero puede ser necesario avisar al sistema operativo, por ejemplo preparando el dispositivo para su extracción. En la práctica, las bahías de discos de servidor con bandejas (caddies) son intercambiables en caliente cuando la controladora y el backplane lo admiten. Revisa siempre el LED de estado del disco e identifica la bahía correcta antes de extraer un disco, especialmente en un arreglo degradado."
  ],
  "terms": [
   [
    "IOPS",
    "Operaciones de entrada/salida por segundo, una medida de cuántas lecturas y escrituras puede manejar el almacenamiento."
   ],
   [
    "SAS (Serial Attached SCSI)",
    "Una interfaz de discos empresarial con soporte de puerto dual y manejo robusto de errores; las controladoras SAS también pueden operar discos SATA."
   ],
   [
    "NVMe",
    "Un protocolo de almacenamiento que conecta discos flash directamente al bus PCIe para lograr una latencia muy baja y un alto rendimiento."
   ],
   [
    "Hot-swap (intercambio en caliente)",
    "Reemplazar un componente mientras el sistema funciona, sin necesidad de apagarlo ni de una acción especial del sistema operativo."
   ]
  ],
  "example": "Un servidor de base de datos con consultas lentas se migra de seis discos SATA de 7.2K a SSD NVMe, lo que reduce drásticamente la latencia del almacenamiento. Los antiguos discos de 7.2K de alta capacidad se reutilizan en un servidor de respaldos, donde la capacidad por dólar importa más que la velocidad.",
  "tip": "Más RPM significa más IOPS pero menos capacidad y más costo por GB. Las controladoras SAS aceptan discos SATA pero no al revés, y hot-swap no requiere preparación del sistema operativo, mientras que hot-plug puede requerirla.",
  "check": [
   [
    "¿Qué velocidad de HDD ofrece la mejor capacidad por dólar?",
    "Los discos de 7.2K RPM, que sacrifican velocidad a cambio de alta capacidad a bajo costo."
   ],
   [
    "¿Puedes instalar discos SAS en una controladora solo SATA?",
    "No. Una controladora SAS puede operar discos SATA, pero una controladora SATA no puede operar discos SAS."
   ],
   [
    "¿Por qué NVMe es más rápido que un SSD SATA?",
    "NVMe se conecta a través de PCIe con un protocolo diseñado para flash, evitando la interfaz SATA y la sobrecarga de comandos de la era de los discos."
   ]
  ]
 },
 {
  "t": "RAID levels 0, 1, 5, 6, 10: fault tolerance, usable capacity, write penalty; hardware vs software RAID; JBOD",
  "tt": "Niveles RAID 0, 1, 5, 6 y 10: tolerancia a fallos, capacidad utilizable, penalización de escritura; RAID por hardware vs. por software; JBOD",
  "body": [
   "RAID (arreglo redundante de discos independientes) combina varios discos en un solo volumen lógico para mejorar el rendimiento, la tolerancia a fallos o ambos. Server+ espera que calcules la capacidad utilizable, sepas cuántas fallas soporta cada nivel y entiendas por qué algunos niveles escriben más lento. Recuerda que RAID no es un respaldo: protege contra la falla de discos, no contra borrados, corrupción o ransomware.",
   "RAID 0 (striping, o distribución en franjas) divide los datos entre dos o más discos. Es rápido y usa el 100 por ciento de la capacidad, pero no tiene redundancia: un disco que falle hace perder todo el arreglo. RAID 1 (mirroring, o espejo) escribe copias idénticas en dos discos. Soporta la falla de un disco y la capacidad utilizable es del 50 por ciento. Las lecturas pueden ser rápidas; cada escritura va a ambos discos, una penalización de escritura de 2.",
   "RAID 5 distribuye los datos en franjas con paridad distribuida en al menos tres discos. La paridad son datos calculados que permiten a la controladora reconstruir un disco faltante. La capacidad utilizable es de (N menos 1) discos, así que cuatro discos de 4 TB dan 12 TB. Soporta la falla de un disco. Cada escritura pequeña requiere leer los datos antiguos y la paridad antigua, y luego escribir los datos nuevos y la paridad nueva, una penalización de escritura de 4. Las reconstrucciones de discos grandes tardan mucho y someten a esfuerzo a los discos restantes.",
   "RAID 6 usa dos bloques de paridad independientes en al menos cuatro discos. La capacidad utilizable es de (N menos 2), soporta la falla de dos discos cualesquiera y su penalización de escritura es de 6. Se prefiere para arreglos grandes de discos de alta capacidad porque una segunda falla durante una reconstrucción larga destruiría un arreglo RAID 5. RAID 10 (1+0) crea espejos de pares de discos y luego distribuye en franjas sobre esos espejos. Necesita al menos cuatro discos (un número par), ofrece el 50 por ciento de la capacidad, tiene una penalización de escritura de 2 y soporta una falla por cada par en espejo; puede soportar más de una falla solo si afectan a pares distintos. RAID 10 es la elección habitual para bases de datos con mucha escritura.",
   "El RAID por hardware usa una tarjeta o chip controlador dedicado con su propio procesador y, a menudo, una caché de escritura respaldada por batería o por flash. Libera a la CPU del trabajo de paridad, puede arrancar desde el arreglo y se administra mediante la utilidad de firmware de la controladora. El RAID por software lo maneja el sistema operativo, como `mdadm` en Linux o Storage Spaces en Windows. No tiene costo adicional y el arreglo puede trasladarse a otro servidor que ejecute el mismo software del sistema operativo, sin necesitar una controladora igual, pero usa CPU del host y puede ser más difícil arrancar desde él. El RAID por firmware o fake RAID está en un punto intermedio y depende de controladores (drivers).",
   "JBOD (just a bunch of disks, o simplemente un montón de discos) presenta los discos de forma individual, o concatenados en un solo volumen grande sin franjas ni paridad. Usa toda la capacidad pero no ofrece redundancia. JBOD también es el modo que se usa cuando un software como ZFS o un clúster de almacenamiento administra la redundancia por sí mismo. Un hot spare (disco de repuesto en caliente) es un disco inactivo que la controladora usa automáticamente para reconstruir un miembro que falló."
  ],
  "terms": [
   [
    "Parity (paridad)",
    "Datos calculados almacenados en RAID 5 o 6 que permiten al arreglo reconstruir el contenido de un disco que falló."
   ],
   [
    "Write penalty (penalización de escritura)",
    "El número de operaciones de E/S físicas que requiere una escritura lógica: 1 para RAID 0, 2 para RAID 1 y 10, 4 para RAID 5, 6 para RAID 6."
   ],
   [
    "Hot spare (disco de repuesto en caliente)",
    "Un disco en espera que la controladora usa automáticamente para reconstruir un arreglo después de que falla un miembro."
   ],
   [
    "JBOD",
    "Just a bunch of disks: discos presentados de forma individual o concatenados, sin redundancia."
   ]
  ],
  "example": "Seis discos de 2 TB dan 12 TB en RAID 0, 10 TB en RAID 5, 8 TB en RAID 6 y 6 TB en RAID 10. El administrador elige RAID 10 para la base de datos transaccional por su baja penalización de escritura, y RAID 6 para el archivo de documentos porque soporta dos fallas durante una reconstrucción larga.",
  "tip": "Memoriza las fórmulas: RAID 5 = N-1, RAID 6 = N-2, RAID 1 y 10 = N/2. Las penalizaciones de escritura son 2, 4 y 6 para espejo, RAID 5 y RAID 6. RAID nunca reemplaza a los respaldos.",
  "check": [
   [
    "¿Cuánto espacio utilizable ofrecen cinco discos de 8 TB en RAID 5?",
    "32 TB, porque RAID 5 ofrece la capacidad de N menos 1 discos: 4 x 8 TB."
   ],
   [
    "¿Qué nivel RAID no ofrece tolerancia a fallos?",
    "RAID 0, que distribuye los datos en franjas sin espejo ni paridad."
   ],
   [
    "¿Por qué se prefiere RAID 6 sobre RAID 5 para discos grandes?",
    "Las reconstrucciones largas aumentan la probabilidad de una segunda falla, y RAID 6 soporta dos fallas de disco mientras que RAID 5 solo soporta una."
   ]
  ]
 },
 {
  "t": "Storage architectures: DAS, NAS, SAN, iSCSI, Fibre Channel, FCoE; capacity planning and base-2 vs base-10 sizing",
  "tt": "Arquitecturas de almacenamiento: DAS, NAS, SAN, iSCSI, Fibre Channel, FCoE; planificación de capacidad y dimensionamiento en base 2 vs. base 10",
  "body": [
   "Los servidores acceden a su almacenamiento de tres formas generales: conectado directamente, a través de la red como archivos compartidos, o a través de una red dedicada como bloques sin formato. Saber cuál es cuál, y qué protocolo usa cada uno, es una habilidad central de Server+.",
   "El almacenamiento de conexión directa (DAS) está conectado directamente a un servidor, ya sea con discos internos o con un gabinete externo cableado con SAS. Es simple, rápido y económico, pero otros servidores no pueden compartirlo fácilmente, y la capacidad queda aislada en ese único host. El almacenamiento conectado a la red (NAS) es un dispositivo que comparte archivos a través de la red usando protocolos de archivos como SMB (Server Message Block, usado por Windows) y NFS (Network File System, común en Linux y UNIX). Los clientes ven carpetas y archivos; el NAS es dueño del sistema de archivos. El NAS es fácil de implementar y adecuado para directorios personales y documentos compartidos.",
   "Una red de área de almacenamiento (SAN) presenta almacenamiento en bloques: porciones de disco sin formato llamadas LUN (números de unidad lógica) que un servidor formatea con su propio sistema de archivos como si fueran discos locales. Como muchos servidores pueden llegar a un arreglo central, las SAN admiten clústeres, hosts de virtualización que comparten datastores, y snapshots y replicación centralizados. El acceso se controla con zonificación (zoning) en los switches de la fabric y con enmascaramiento de LUN (LUN masking) en el arreglo, para que cada servidor vea solo sus propios LUN.",
   "Las SAN usan protocolos de bloques. Fibre Channel (FC) es una red de almacenamiento dedicada y sin pérdidas, con sus propios switches y adaptadores de bus de host (HBA), identificados por World Wide Names (WWN). Es rápida y predecible, pero necesita equipos y habilidades especializados. iSCSI (Internet Small Computer Systems Interface) transporta comandos SCSI sobre Ethernet TCP/IP común; el servidor ejecuta un iniciador (software o una tarjeta de descarga por hardware) que se conecta a un destino (target) en el arreglo, normalmente a través de una VLAN o red física separada con jumbo frames. iSCSI es más barato y familiar para el personal de redes. FCoE (Fibre Channel over Ethernet) encapsula tramas Fibre Channel directamente en tramas Ethernet, sin IP, sobre Ethernet de centro de datos sin pérdidas usando adaptadores de red convergentes, lo que permite que un solo juego de cables transporte tanto tráfico de datos como de almacenamiento.",
   "La planificación de capacidad consiste en estimar cuánto almacenamiento necesitas ahora y más adelante: datos actuales, tasa de crecimiento, sobrecarga de RAID, snapshots, espacio libre para el rendimiento y sobrecarga del sistema de archivos. Una trampa común son las unidades. Los fabricantes de discos usan unidades en base 10 (decimales), donde 1 TB son 1,000,000,000,000 bytes. Muchos sistemas operativos reportan en unidades en base 2 (binarias), donde 1 TiB (tebibyte) son 1,099,511,627,776 bytes, aunque algunos todavía lo etiquetan como TB. Así, un disco de 4 TB aparece como aproximadamente 3.64 TiB. Esa diferencia crece con cada prefijo: alrededor del 2.4 por ciento en kilo, 7 por ciento en giga y cerca del 10 por ciento en tera.",
   "Cuando dimensiones un arreglo, empieza con la capacidad bruta de los discos, conviértela a las unidades que reporta tu sistema operativo, resta la sobrecarga de RAID y luego deja un margen, ya que los sistemas de archivos y los arreglos se vuelven más lentos a medida que se llenan."
  ],
  "terms": [
   [
    "NAS (almacenamiento conectado a la red)",
    "Network-attached storage: un dispositivo que comparte archivos a través de la red con protocolos como SMB y NFS."
   ],
   [
    "SAN (red de área de almacenamiento)",
    "Storage area network: una red dedicada que presenta almacenamiento a nivel de bloques (LUN) a los servidores."
   ],
   [
    "iSCSI",
    "Un protocolo que transporta comandos de bloques SCSI sobre TCP/IP, usando iniciadores en los servidores y destinos (targets) en el almacenamiento."
   ],
   [
    "LUN",
    "Logical unit number (número de unidad lógica): un volumen de almacenamiento en bloques que una SAN presenta a un servidor."
   ]
  ],
  "example": "Una administradora compra ocho discos de 2 TB para un arreglo RAID 6, esperando 12 TB. El sistema operativo muestra unos 10.9 TiB, porque los 12 TB del fabricante son decimales y el sistema operativo reporta unidades binarias. Ella actualiza el plan de capacidad para usar cifras binarias y agrega un margen del 20 por ciento.",
  "tip": "Compartir a nivel de archivos (SMB, NFS) significa NAS; a nivel de bloques (LUN sobre FC o iSCSI) significa SAN. iSCSI viaja sobre IP; FCoE viaja directamente sobre Ethernet sin IP. Los discos se venden en base 10 pero se reportan en base 2.",
  "check": [
   [
    "¿Por qué un disco nuevo de 1 TB muestra menos de 1 TB en el sistema operativo?",
    "El disco se dimensiona en unidades decimales (10^12 bytes) mientras que el sistema operativo reporta unidades binarias, así que aparecen unos 931 GiB."
   ],
   [
    "¿Qué tipo de almacenamiento formatearía un servidor con su propio sistema de archivos: un recurso compartido NAS o un LUN de SAN?",
    "Un LUN de SAN, porque se presenta como almacenamiento en bloques sin formato; un NAS ya es dueño del sistema de archivos."
   ],
   [
    "¿Qué necesita iSCSI que Fibre Channel no necesita?",
    "Una red IP; iSCSI funciona sobre Ethernet TCP/IP mientras que Fibre Channel usa su propia fabric dedicada."
   ]
  ]
 },
 {
  "t": "Out-of-band management: iLO, iDRAC, IPMI/BMC, remote KVM, IP KVM, crash cart",
  "tt": "Administración fuera de banda: iLO, iDRAC, IPMI/BMC, KVM remoto, IP KVM, carrito de emergencia (crash cart)",
  "body": [
   "La administración dentro de banda (in-band) usa el propio sistema operativo y la red del servidor: te conectas con Escritorio remoto o SSH. Eso funciona hasta que el sistema operativo se cuelga, no arranca o la configuración de red es incorrecta. La administración fuera de banda (out-of-band) te da una ruta separada que funciona sin importar el estado del sistema operativo, para que puedas reiniciar la alimentación de un servidor, verlo arrancar y repararlo sin entrar al centro de datos.",
   "La mayoría de los servidores incluyen un controlador de administración de la placa base (BMC), una pequeña computadora independiente en la placa madre con su propio procesador, firmware y normalmente un puerto de red de administración dedicado. Funciona siempre que el servidor tenga energía en espera (standby), incluso cuando el servidor está apagado. El BMC monitorea temperaturas, ventiladores, voltajes y fuentes de alimentación, mantiene un registro de eventos de hardware y te permite encender y apagar el servidor, abrir una consola remota y montar medios virtuales, como una imagen ISO, para instalar un sistema operativo.",
   "IPMI (Intelligent Platform Management Interface) es un estándar de la industria para comunicarse con los BMC; herramientas como `ipmitool` pueden consultar sensores o reiniciar la alimentación de un servidor. Los fabricantes construyen interfaces más completas encima: HPE llama a su BMC iLO (Integrated Lights-Out), Dell llama a su versión iDRAC (integrated Dell Remote Access Controller), y otros fabricantes tienen sus propios nombres. Muchos también admiten la API REST más reciente Redfish para la administración mediante scripts. Los conceptos son los mismos entre fabricantes.",
   "Un switch KVM (teclado, video, mouse) permite que un solo teclado, monitor y mouse controlen varios servidores. Un IP KVM agrega una interfaz de red para que un administrador pueda ver y controlar esas consolas de forma remota a través de un navegador, incluidas las pantallas del BIOS. El KVM remoto también es una función de los BMC: la consola de iLO o iDRAC muestra la pantalla del servidor desde el encendido. Un crash cart (carrito de emergencia) es el recurso de respaldo de baja tecnología: un carrito con monitor, teclado, mouse y cables que llevas hasta un servidor para conectarte localmente cuando nada más funciona.",
   "Como las interfaces fuera de banda pueden apagar servidores y reinstalar sistemas operativos, son objetivos de alto valor. Coloca los puertos de administración en una red o VLAN de administración separada y restringida, nunca en internet. Cambia las credenciales predeterminadas de inmediato, usa cuentas basadas en roles vinculadas a la autenticación del directorio cuando sea posible, mantén actualizado el firmware del BMC, desactiva los protocolos sin uso y usa acceso cifrado como HTTPS y SSH en lugar de opciones antiguas sin cifrar. Registra y revisa quién accede a estas consolas.",
   "En un laboratorio, normalmente asignarás al BMC una dirección IP en la utilidad de configuración del servidor, navegarás hasta ella, iniciarás sesión y explorarás el panel de estado, el registro de eventos y la consola virtual."
  ],
  "terms": [
   [
    "BMC (baseboard management controller) (controlador de administración de la placa base)",
    "Un controlador independiente en la placa madre que proporciona monitoreo y control remoto incluso cuando el sistema operativo no funciona."
   ],
   [
    "IPMI",
    "Intelligent Platform Management Interface, un protocolo estándar para comunicarse con los BMC."
   ],
   [
    "IP KVM",
    "Un switch de teclado-video-mouse accesible a través de la red, que da acceso remoto a la consola, incluidas las pantallas del BIOS."
   ],
   [
    "Crash cart (carrito de emergencia)",
    "Un carrito móvil con monitor, teclado y mouse que se usa para conectarse localmente a un servidor."
   ]
  ],
  "example": "A las 2 a.m. un servidor remoto deja de responder después de una actualización. El administrador de guardia inicia sesión en su iDRAC a través de la VLAN de administración, abre la consola virtual, ve que el sistema operativo está detenido en un error de arranque, monta una ISO de recuperación como medio virtual y repara el gestor de arranque sin manejar hasta el centro de datos.",
  "tip": "Si el sistema operativo no funciona o el servidor está apagado y debes llegar a él de forma remota, la respuesta es la administración fuera de banda (BMC, iLO, iDRAC, IPMI). Asegurarla significa una red de administración separada y credenciales predeterminadas cambiadas.",
  "check": [
   [
    "¿Por qué se puede acceder a un BMC mientras el servidor está apagado?",
    "Funciona con energía en espera, con su propio procesador y puerto de red, independiente del sistema principal y del sistema operativo."
   ],
   [
    "¿Para qué se usa un crash cart?",
    "Para conectar localmente un monitor, teclado y mouse a un servidor cuando el acceso remoto no está disponible."
   ]
  ]
 },
 {
  "t": "Firmware, BIOS and UEFI settings, Secure Boot, TPM, boot order, driver and firmware update planning",
  "tt": "Firmware, configuración de BIOS y UEFI, Secure Boot, TPM, orden de arranque, planificación de actualizaciones de drivers y firmware",
  "body": [
   "El firmware es el software de bajo nivel almacenado en chips de hardware que se ejecuta antes, y por debajo, del sistema operativo. El firmware del sistema arranca el servidor, prueba el hardware y entrega el control a un gestor de arranque (bootloader). Los discos, las controladoras RAID, las tarjetas de red y los BMC también tienen firmware. Server+ evalúa cómo configurar el firmware del sistema, asegurar el proceso de arranque y actualizarlo todo de forma segura.",
   "BIOS (Basic Input/Output System) es la interfaz de firmware heredada. UEFI (Unified Extensible Firmware Interface) es su reemplazo moderno. UEFI admite discos GPT (GUID Partition Table), que permiten volúmenes de arranque mayores que el límite de aproximadamente 2 TB de los discos MBR (master boot record), un inicio más rápido, opciones de arranque por red, una pantalla de configuración gráfica y Secure Boot. Muchos servidores todavía ofrecen un modo heredado o de compatibilidad, pero el modo UEFI es el predeterminado para los sistemas operativos actuales. La utilidad de configuración del firmware, que se abre con una tecla durante el POST (autoprueba de encendido), es donde estableces el orden de arranque, habilitas las extensiones de virtualización, configuras los perfiles de memoria y energía y defines contraseñas del firmware.",
   "El orden de arranque enumera los dispositivos que el firmware intenta en secuencia: disco local, USB, óptico, arranque de red PXE. Para instalaciones podrías arrancar temporalmente desde medios virtuales o desde la red; en producción, coloca el dispositivo de arranque local primero y restringe las demás opciones para que nadie pueda arrancar desde una memoria USB y evadir el sistema operativo. Muchos servidores ofrecen un menú de arranque de una sola vez para que puedas cambiar el orden solo para un arranque.",
   "Secure Boot es una función de UEFI que verifica la firma digital de cada gestor de arranque y driver cargado durante el inicio contra claves de confianza almacenadas en el firmware. El código sin firmar o alterado se rechaza, lo que bloquea el malware a nivel de arranque, como los rootkits. Algunas distribuciones de Linux y drivers personalizados necesitan shims firmados o claves registradas para arrancar con Secure Boot activado. Un TPM (Trusted Platform Module) es un chip de hardware, o su equivalente en firmware, que almacena claves de forma segura y mide el proceso de arranque. Habilita funciones como el cifrado de discos BitLocker, que solo se desbloquea si la cadena de arranque no ha cambiado, y la atestación que demuestra que un servidor arrancó de forma limpia. Es posible que necesites habilitar el TPM en el firmware y borrarlo o tomar posesión de él cuando reutilices un servidor.",
   "Las actualizaciones corrigen errores y fallas de seguridad, pero también pueden romper cosas, así que planifícalas. Revisa la matriz de compatibilidad del fabricante, porque el firmware, los drivers y las versiones del sistema operativo a menudo se prueban como un conjunto. Lee las notas de la versión para conocer los requisitos previos y el orden requerido, como actualizar el BMC antes que el BIOS. Respalda las configuraciones, programa una ventana de mantenimiento a través de la gestión de cambios, prueba primero en un servidor, mantén disponible la versión anterior para revertir y nunca cortes la energía durante una actualización del firmware (flash). Los fabricantes proporcionan herramientas de actualización empaquetadas o service packs de arranque que actualizan muchos componentes en una sola pasada, y los BMC a menudo pueden aplicar firmware de forma remota."
  ],
  "terms": [
   [
    "UEFI",
    "Unified Extensible Firmware Interface, el firmware moderno que reemplaza al BIOS, con soporte para GPT y Secure Boot."
   ],
   [
    "Secure Boot (arranque seguro)",
    "Una función de UEFI que solo permite ejecutar al inicio gestores de arranque y drivers de confianza con firma digital."
   ],
   [
    "TPM (Trusted Platform Module)",
    "Un chip de seguridad de hardware que almacena claves criptográficas y registra mediciones del proceso de arranque."
   ],
   [
    "Boot order (orden de arranque)",
    "La secuencia de dispositivos que el firmware intenta al buscar un sistema operativo para iniciar."
   ]
  ],
  "example": "Antes de actualizar veinte servidores, un administrador revisa la matriz de soporte del fabricante, aplica el firmware correspondiente del BMC, BIOS, controladora RAID y NIC a un servidor de prueba con el paquete de actualización del fabricante, confirma que arranca de forma limpia con Secure Boot activado y luego programa el resto en una ventana de mantenimiento aprobada.",
  "tip": "Secure Boot verifica las firmas del código de arranque; el TPM almacena claves y mide la integridad del arranque. En las actualizaciones, las respuestas del examen favorecen probar primero, seguir el orden y la matriz de compatibilidad del fabricante y tener un plan de reversión.",
  "check": [
   [
    "¿Qué tipo de firmware se requiere para Secure Boot y para discos de arranque GPT grandes?",
    "UEFI; el BIOS heredado carece de Secure Boot y depende de MBR para arrancar."
   ],
   [
    "¿Por qué debes consultar una matriz de compatibilidad antes de actualizar drivers?",
    "Los fabricantes prueban el firmware, los drivers y las versiones del sistema operativo en conjunto, y las versiones incompatibles pueden causar inestabilidad o fallas."
   ]
  ]
 },
 {
  "t": "Hardware components: CPUs and cores, memory types (ECC, registered), expansion cards, fans and hot-swappable parts",
  "tt": "Componentes de hardware: CPU y núcleos, tipos de memoria (ECC, registrada), tarjetas de expansión, ventiladores y piezas intercambiables en caliente",
  "body": [
   "Un servidor se construye con los mismos tipos de piezas que un equipo de escritorio, pero elegidas por su confiabilidad, capacidad y facilidad de servicio. Server+ espera que reconozcas esas piezas, sepas en qué se diferencian de las versiones de consumo y sepas cuáles pueden reemplazarse mientras el servidor funciona.",
   "La CPU (unidad central de procesamiento) realiza el cómputo. Los servidores suelen tener varios sockets, cada uno con un procesador físico, y cada procesador contiene varios núcleos que pueden ejecutar trabajo en paralelo. El multihilo simultáneo (Intel lo llama Hyper-Threading) presenta dos procesadores lógicos por núcleo, lo que ayuda a algunas cargas de trabajo pero no equivale a duplicar los núcleos. Al agregar un segundo procesador, haz que el modelo, el stepping y la velocidad coincidan con el primero, y recuerda que las ranuras de memoria suelen estar vinculadas a un socket específico, por lo que se necesita una segunda CPU para usar sus bancos de memoria. Las licencias de muchos productos cuentan sockets o núcleos, así que la elección de CPU también tiene efectos en el costo.",
   "La memoria de servidor es RAM (memoria de acceso aleatorio) con protección adicional. La memoria ECC (código de corrección de errores) almacena bits adicionales para que el controlador de memoria pueda detectar y corregir errores de un solo bit y detectar errores de varios bits, evitando la corrupción silenciosa de datos y los fallos del sistema. La memoria registrada (buffered), llamada RDIMM, coloca un registro entre el controlador de memoria y los chips, reduciendo la carga eléctrica para que un servidor pueda alojar muchos más módulos. Los LRDIMM de carga reducida van más allá para capacidades muy grandes. Los UDIMM sin búfer son comunes en equipos de escritorio. No mezcles módulos registrados y sin búfer, sigue las reglas de población del fabricante sobre qué ranuras llenar primero e instala los módulos en conjuntos iguales entre canales para obtener el mejor rendimiento.",
   "Las tarjetas de expansión se conectan en ranuras PCIe (Peripheral Component Interconnect Express) y agregan capacidades: controladoras RAID, adaptadores de bus de host para Fibre Channel o SAS, tarjetas de interfaz de red (NIC) adicionales y GPU (unidades de procesamiento gráfico) para cargas de cómputo. Las ranuras PCIe vienen en anchos de carril como x4, x8 y x16, y en tamaños de altura completa o de perfil bajo, así que verifica que la tarjeta se ajuste tanto a los carriles eléctricos de la ranura como al chasis. Algunas ranuras están conectadas a una CPU en particular y solo funcionan cuando esa CPU está instalada. Las tarjetas riser colocan las ranuras de lado en chasis delgados de 1U y 2U.",
   "Los servidores usan varios ventiladores para el flujo de aire de adelante hacia atrás, y en la mayoría de los servidores empresariales son redundantes e intercambiables en caliente: si uno falla, los demás giran más rápido y lo reemplazas sin apagar. Mantén la tapa del chasis puesta mientras funciona, ya que los servidores están diseñados para canalizar el aire con ella cerrada, y llena las bahías vacías de discos o PSU con tapas ciegas (blanks).",
   "Las piezas que comúnmente son intercambiables en caliente incluyen los discos en bandejas, las fuentes de alimentación y los ventiladores. Las CPU, la memoria y la mayoría de las tarjetas de expansión no son intercambiables en caliente en los servidores típicos y requieren apagar el equipo, así que revisa siempre la documentación del fabricante y usa protección contra descargas electrostáticas (ESD), como una pulsera antiestática, cuando trabajes en el interior."
  ],
  "terms": [
   [
    "ECC memory (memoria ECC)",
    "RAM que usa bits adicionales para detectar y corregir errores de un solo bit, evitando la corrupción silenciosa."
   ],
   [
    "Registered memory (RDIMM) (memoria registrada)",
    "Memoria con un registro que almacena en búfer las señales, lo que permite más módulos y mayor capacidad por servidor."
   ],
   [
    "Core (núcleo)",
    "Una unidad de procesamiento independiente dentro de una CPU; un socket puede contener muchos núcleos."
   ],
   [
    "Hot-swappable (intercambiable en caliente)",
    "Que puede reemplazarse mientras el sistema permanece encendido y funcionando."
   ]
  ],
  "example": "Un host de virtualización registra errores de memoria corregidos repetidos en un DIMM. Como usa RDIMM ECC, el host sigue funcionando sin corrupción. El administrador migra las máquinas virtuales a otro host, lo apaga, reemplaza el módulo en la misma ranura siguiendo la guía de población y lo devuelve al servicio.",
  "tip": "ECC corrige errores; la memoria registrada almacena señales en búfer para lograr capacidad. No mezcles RDIMM y UDIMM. Los discos, las PSU y los ventiladores son las piezas habituales de intercambio en caliente; las CPU y la RAM normalmente requieren tiempo de inactividad.",
  "check": [
   [
    "¿Qué problema resuelve la memoria ECC?",
    "Detecta y corrige errores de memoria de un solo bit, evitando la corrupción silenciosa de datos y los fallos del sistema."
   ],
   [
    "¿Por qué la memoria de algunas ranuras podría no detectarse en un servidor de dos sockets con una sola CPU?",
    "Esas ranuras están conectadas al segundo socket, así que solo funcionan cuando la segunda CPU está instalada."
   ]
  ]
 },
 {
  "t": "OS installation: minimum requirements, HCL, bare metal vs virtual, GUI vs core/headless installs, partitioning and file systems (NTFS, ReFS, ext4, XFS, VMFS)",
  "tt": "Instalación del sistema operativo: requisitos mínimos, HCL, bare metal vs. virtual, instalaciones con GUI vs. core/sin interfaz, particionado y sistemas de archivos (NTFS, ReFS, ext4, XFS, VMFS)",
  "body": [
   "Instalar bien un sistema operativo de servidor empieza antes de insertar el medio de instalación. Confirmas que el hardware sea compatible y suficientemente grande, decides si el sistema operativo se ejecutará en hardware físico o en una máquina virtual, eliges cuánta interfaz instalar y planificas la distribución de los discos y el sistema de archivos.",
   "Todo sistema operativo publica requisitos mínimos de CPU, memoria, disco y firmware. Los mínimos permiten que el sistema operativo se instale, no que ejecute tu carga de trabajo, así que dimensiona según los roles y las aplicaciones que agregarás. La HCL (lista de compatibilidad de hardware) es la lista del fabricante con el hardware certificado para funcionar con el sistema operativo o el hipervisor; usar hardware y drivers de la lista evita fallos inexplicables y te mantiene con derecho al soporte del fabricante. Revísala en particular para las controladoras de almacenamiento y las NIC, ya que la falta de drivers es una razón común por la que un instalador no puede ver los discos.",
   "Una instalación bare metal coloca el sistema operativo, o un hipervisor, directamente en el servidor físico. Una instalación virtual coloca el sistema operativo en una máquina virtual que se ejecuta sobre un hipervisor. Las instalaciones virtuales son más rápidas de aprovisionar y más fáciles de capturar en snapshots y de mover, mientras que bare metal es adecuado para los propios hosts de hipervisor y para cargas de trabajo que necesitan acceso directo al hardware.",
   "Muchos sistemas operativos de servidor pueden instalarse con o sin interfaz gráfica. Windows Server ofrece Desktop Experience (GUI completa) y Server Core, que no tiene escritorio y se administra con PowerShell, la línea de comandos o herramientas remotas. Los servidores Linux normalmente se instalan sin interfaz (headless), sin GUI, y se administran por SSH. Una instalación core o sin interfaz tiene una superficie de ataque más pequeña, necesita menos parches y usa menos recursos; la desventaja es que los administradores deben sentirse cómodos con la línea de comandos y la administración remota.",
   "El particionado divide un disco en secciones. Usa GPT con UEFI. La práctica común separa el sistema operativo de los datos, para que un volumen de datos lleno no pueda hacer caer el sistema operativo y puedas reinstalar sin tocar los datos. Las instalaciones de Linux a menudo separan `/boot`, `/`, `/var` (donde crecen los logs) y swap, a veces usando LVM (Logical Volume Manager) para poder redimensionar los volúmenes más adelante.",
   "Elige el sistema de archivos según la tarea. NTFS es el sistema de archivos estándar de Windows, con permisos (ACL), cifrado, compresión y cuotas. ReFS (Resilient File System) es un sistema de archivos de Windows diseñado para volúmenes grandes e integridad de datos, con sumas de verificación (checksums) y reparación automática cuando se usa con Storage Spaces; es común para almacenamiento de virtualización y de respaldos, pero no puede usarse en todos los casos en que se usa NTFS, por ejemplo como volumen de arranque típico. En Linux, ext4 es un sistema predeterminado maduro y de propósito general, y XFS es un sistema de archivos con registro por diario (journaling) de alto rendimiento, adecuado para archivos y volúmenes grandes (puede crecer pero no reducirse). VMFS (Virtual Machine File System) es el sistema de archivos en clúster de VMware que permite que varios hosts ESXi compartan el mismo datastore de archivos de máquinas virtuales."
  ],
  "terms": [
   [
    "HCL (hardware compatibility list) (lista de compatibilidad de hardware)",
    "La lista de un fabricante con el hardware probado y soportado con un sistema operativo o hipervisor determinado."
   ],
   [
    "Server Core",
    "Una opción de instalación de Windows Server sin la GUI de escritorio, administrada desde la línea de comandos o de forma remota."
   ],
   [
    "ReFS",
    "Resilient File System, un sistema de archivos de Windows enfocado en la integridad y en volúmenes grandes, usado a menudo para almacenamiento de virtualización y de respaldos."
   ],
   [
    "VMFS",
    "El sistema de archivos en clúster de VMware que permite que varios hosts ESXi compartan un datastore."
   ]
  ],
  "example": "Una administradora implementa un nuevo controlador de dominio como máquina virtual usando Windows Server Core para reducir los parches y la superficie de ataque. Verifica que la controladora RAID del host esté en la HCL del hipervisor, le da a la VM discos virtuales separados para el sistema operativo y para la base de datos del directorio, y formatea ambos con NTFS.",
  "tip": "Las instalaciones core o sin interfaz son la respuesta cuando una pregunta enfatiza una superficie de ataque más pequeña y menos actualizaciones. Conoce qué sistema de archivos corresponde a cada plataforma: NTFS/ReFS para Windows, ext4/XFS para Linux, VMFS para datastores de VMware.",
  "check": [
   [
    "¿Por qué revisar la HCL antes de instalar?",
    "Para confirmar que el hardware y los drivers estén probados y soportados con ese sistema operativo, evitando inestabilidad y conservando el soporte del fabricante."
   ],
   [
    "Menciona una ventaja y una desventaja de una instalación sin interfaz (headless).",
    "Ventaja: superficie de ataque más pequeña y menos recursos y parches. Desventaja: la administración requiere herramientas de línea de comandos o remotas."
   ]
  ]
 },
 {
  "t": "Installation methods: media, PXE/network boot, imaging and cloning, templates, answer files, P2V",
  "tt": "Métodos de instalación: medios, arranque PXE/por red, creación de imágenes y clonación, plantillas, archivos de respuesta, P2V",
  "body": [
   "Instalar un servidor a mano desde un DVD está bien. Instalar cincuenta de la misma manera es lento y propenso a errores. Server+ evalúa la gama de métodos de instalación, desde medios simples hasta la implementación totalmente automatizada, y cuándo conviene cada uno.",
   "Las instalaciones basadas en medios arrancan desde una imagen ISO en una unidad USB, un disco óptico o un medio virtual montado a través del BMC. Recorres el instalador y respondes cada pregunta. Este es el método más directo y un buen recurso de respaldo, pero cada servidor termina siendo ligeramente distinto a menos que tengas cuidado.",
   "El arranque PXE (Preboot Execution Environment) permite que un servidor inicie desde la red. El firmware de la NIC solicita una dirección a DHCP (Dynamic Host Configuration Protocol); la respuesta de DHCP incluye la dirección de un servidor de arranque y el nombre de un archivo de arranque, que el servidor descarga con TFTP (Trivial File Transfer Protocol) y ejecuta para iniciar el instalador. Herramientas como Windows Deployment Services o los servidores de instalación por red de Linux usan PXE para implementar muchas máquinas sin tocar medios. PXE necesita DHCP en la misma red o un relay DHCP, y el orden de arranque debe incluir el arranque por red. Como cualquiera en esa red podría arrancar desde él, restringe PXE a una VLAN de aprovisionamiento.",
   "Los archivos de respuesta automatizan las preguntas del instalador: zona horaria, particionado, paquetes, contraseña de administrador y configuración de red. Windows usa un archivo unattend (a menudo `unattend.xml`), Linux basado en Red Hat usa Kickstart y Linux basado en Debian usa archivos preseed. Combinados con PXE, los archivos de respuesta te dan compilaciones repetibles y sin intervención.",
   "La creación de imágenes y la clonación copian un sistema completamente configurado. Construyes una máquina de referencia, instalas actualizaciones y aplicaciones, la generalizas para eliminar los identificadores únicos (en Windows con Sysprep, para que cada copia obtenga su propio identificador de seguridad y nombre de equipo), la capturas como imagen e implementas esa imagen en otros servidores. La clonación copia un disco a otro directamente. Las imágenes son rápidas de implementar pero se desactualizan, así que actualízalas con regularidad.",
   "Las plantillas son la versión de virtualización de las imágenes. Una plantilla de VM es una máquina virtual maestra, normalmente generalizada, que el hipervisor clona para crear nuevas VM con configuraciones consistentes. Las plataformas en la nube ofrecen imágenes de máquina similares.",
   "P2V (físico a virtual) convierte un servidor físico existente en una máquina virtual, normalmente con una herramienta de conversión que copia los discos e inyecta drivers de hardware virtual. Se usa al consolidar hardware antiguo en un hipervisor. También aparecen los términos relacionados V2V (virtual a virtual, entre hipervisores) y V2P (virtual a físico). Después de un P2V, elimina el software del hardware físico, como los agentes del fabricante, revisa la configuración de la NIC virtual y mantén apagada la máquina física para que ambas no aparezcan en la red con la misma identidad."
  ],
  "terms": [
   [
    "PXE",
    "Preboot Execution Environment: arrancar una computadora a través de la red usando DHCP y TFTP para cargar un instalador o una imagen."
   ],
   [
    "Answer file (archivo de respuesta)",
    "Un archivo que proporciona automáticamente las respuestas del instalador, como unattend.xml o Kickstart."
   ],
   [
    "Sysprep",
    "Una herramienta de Windows que generaliza una instalación, eliminando los identificadores únicos antes de capturarla como imagen."
   ],
   [
    "P2V",
    "Conversión de físico a virtual de un servidor físico existente en una máquina virtual."
   ]
  ],
  "example": "Una empresa necesita treinta servidores web Linux idénticos. El equipo crea un archivo Kickstart que define las particiones y los paquetes, coloca los servidores en una VLAN de aprovisionamiento con PXE y los enciende. Cada uno arranca desde la red y se instala solo; después, la herramienta de gestión de configuración aplica el rol web.",
  "tip": "PXE depende de DHCP y TFTP, además del arranque por red en el orden de arranque. Generaliza siempre una imagen de Windows (Sysprep) antes de clonarla para que las máquinas no compartan identificadores.",
  "check": [
   [
    "¿En qué dos servicios de red se basa el arranque PXE?",
    "DHCP para proporcionar una dirección y la información del servidor de arranque, y TFTP para descargar el archivo de arranque."
   ],
   [
    "¿Cuál es el propósito de un archivo de respuesta?",
    "Proporciona automáticamente la configuración del instalador para que las instalaciones sean desatendidas y consistentes."
   ]
  ]
 },
 {
  "t": "Network services: static vs DHCP addressing, DNS, NTP, NIC teaming/bonding, VLAN tagging, firewall ports, IPv4 and IPv6",
  "tt": "Servicios de red: direccionamiento estático vs. DHCP, DNS, NTP, NIC teaming/bonding, etiquetado de VLAN, puertos del firewall, IPv4 e IPv6",
  "body": [
   "Un servidor que no se puede encontrar ni alcanzar en la red no está haciendo su trabajo. Este tema cubre cómo obtiene un servidor su dirección, cómo lo encuentran los clientes por nombre, cómo mantiene la hora, cómo se hacen redundantes y se segmentan sus enlaces de red, y en qué puertos escucha.",
   "Los servidores normalmente obtienen direcciones IP estáticas, configuradas a mano, para que sus direcciones nunca cambien y los registros DNS, las reglas de firewall y la configuración de los clientes sigan siendo válidos. DHCP (Dynamic Host Configuration Protocol) asigna direcciones automáticamente y es adecuado para los dispositivos cliente. Un punto intermedio es una reserva DHCP, que siempre da la misma dirección a una dirección MAC específica. En cualquier caso, cada servidor necesita una dirección IP, una máscara de subred (o longitud de prefijo), una puerta de enlace predeterminada y direcciones de servidores DNS correctas. IPv4 usa direcciones de 32 bits escritas como cuatro números decimales; IPv6 usa direcciones de 128 bits escritas en grupos hexadecimales, puede configurarse sola con SLAAC (autoconfiguración de direcciones sin estado) o DHCPv6, y siempre tiene una dirección link-local que empieza con `fe80::`. Muchos servidores ejecutan ambos (dual stack).",
   "DNS (Domain Name System) traduce nombres a direcciones. Los tipos de registro importantes incluyen A (nombre a IPv4), AAAA (nombre a IPv6), CNAME (alias), MX (servidor de correo), PTR (búsqueda inversa, dirección a nombre) y SRV (ubicaciones de servicios, usado por Active Directory). Los servidores necesitan registros precisos y deben apuntar a servidores DNS internos confiables.",
   "NTP (Network Time Protocol) sincroniza los relojes. La hora precisa es importante para la autenticación (Kerberos rechaza los tickets cuando los relojes difieren en más de unos pocos minutos de forma predeterminada), la correlación de logs, los certificados y las tareas programadas. Apunta los servidores a fuentes de hora internas que se sincronicen con servidores superiores de confianza.",
   "El NIC teaming, llamado bonding en Linux, combina dos o más adaptadores de red en una sola interfaz lógica para tolerancia a fallos, ancho de banda adicional o ambos. Los modos incluyen activo-pasivo (failover) y balanceo de carga activo-activo; algunos modos activo-activo, como LACP (Link Aggregation Control Protocol), requieren una configuración correspondiente en el switch. Conecta los miembros del team a switches distintos cuando sea posible para que la falla de un switch no aísle al servidor.",
   "Una VLAN (red de área local virtual) separa el tráfico en switches compartidos. Mediante el etiquetado 802.1Q, un puerto de servidor o de hipervisor configurado como troncal (trunk) puede transportar varias VLAN, agregando una etiqueta a cada trama; el puerto del switch debe permitir las mismas VLAN. Esto permite que un solo enlace físico transporte por separado el tráfico de administración, de almacenamiento y de producción.",
   "Conoce los puertos comunes para que puedas abrir solo lo que un rol necesita: SSH 22, SMTP 25, DNS 53, DHCP 67 y 68, HTTP 80, NTP 123, LDAP 389, HTTPS 443, SMB 445, LDAPS 636, SQL Server 1433, RDP 3389. Los firewalls del host deben permitirlos solo desde las redes que los necesitan."
  ],
  "terms": [
   [
    "DHCP reservation (reserva DHCP)",
    "Una configuración de DHCP que siempre asigna la misma dirección IP a la dirección MAC de un dispositivo específico."
   ],
   [
    "NIC teaming/bonding",
    "Combinar varios adaptadores de red en una sola interfaz lógica para redundancia y posiblemente más ancho de banda."
   ],
   [
    "802.1Q",
    "El estándar para el etiquetado de VLAN, que marca las tramas Ethernet con un ID de VLAN para que un solo enlace pueda transportar varias VLAN."
   ],
   [
    "NTP",
    "Network Time Protocol, usado para mantener sincronizados los relojes del sistema; usa el puerto UDP 123."
   ]
  ],
  "example": "Los usuarios no pueden iniciar sesión en un nuevo servidor de aplicaciones. El administrador descubre que su reloj está adelantado diez minutos porque nunca se configuró NTP, así que la autenticación Kerberos falla. Apuntarlo a la fuente de hora del dominio corrige los inicios de sesión de inmediato.",
  "tip": "Los servidores obtienen direcciones estáticas o reservas, no concesiones dinámicas. La deriva del reloj rompe la autenticación Kerberos. El teaming LACP necesita configuración en el switch; el teaming simple de failover no.",
  "check": [
   [
    "¿Qué registro DNS asocia un nombre con una dirección IPv6?",
    "Un registro AAAA."
   ],
   [
    "¿Por qué un puerto del switch debe configurarse como troncal para un hipervisor que transporta varias VLAN?",
    "El host envía tramas con etiquetas 802.1Q de varias VLAN, y solo un puerto troncal acepta y reenvía tráfico etiquetado para esas VLAN."
   ],
   [
    "¿Qué puerto usa RDP?",
    "TCP 3389."
   ]
  ]
 },
 {
  "t": "Server roles: web, application, database, file and print, directory services, DNS/DHCP, mail, messaging, NTP, and how roles relate to hardware sizing",
  "tt": "Roles de servidor: web, aplicaciones, base de datos, archivos e impresión, servicios de directorio, DNS/DHCP, correo, mensajería, NTP, y cómo se relacionan los roles con el dimensionamiento del hardware",
  "body": [
   "Un rol de servidor es el trabajo que un servidor realiza para sus clientes. Saber qué hace cada rol te indica qué puertos abre, qué recursos exige y cuánto hardware necesita. Server+ te pide relacionar los roles con su propósito y con sus prioridades de dimensionamiento.",
   "Un servidor web entrega páginas web y APIs mediante HTTP y HTTPS; algunos ejemplos son IIS en Windows y Apache o Nginx en Linux. Los servidores web simples necesitan CPU y memoria moderadas y una red rápida, y escalan bien agregando más servidores detrás de un balanceador de carga. Un servidor de aplicaciones ejecuta la lógica de negocio, a menudo el nivel intermedio entre un front end web y una base de datos; sus necesidades dependen de la aplicación, pero normalmente se centran en la CPU y la memoria.",
   "Un servidor de base de datos almacena y consulta datos estructurados. Suele ser el rol más exigente: necesita abundante memoria para almacenar datos en caché, almacenamiento rápido con muchas IOPS y baja latencia (a menudo SSD o NVMe en RAID 10) y suficientes núcleos de CPU para consultas simultáneas. Las licencias de bases de datos a menudo son por núcleo, lo que también afecta las decisiones de hardware.",
   "Un servidor de archivos comparte carpetas mediante SMB o NFS; sus prioridades son la capacidad de almacenamiento, discos confiables y el rendimiento de la red. Un servidor de impresión administra las colas de impresión y los drivers de las impresoras compartidas y necesita pocos recursos. Los servicios de directorio, como Active Directory Domain Services en un controlador de dominio, almacenan usuarios, grupos y equipos y se encargan de la autenticación. Los controladores de dominio necesitan confiabilidad más que potencia bruta, y deberías ejecutar al menos dos para tener redundancia.",
   "Los roles de infraestructura mantienen la red funcionando. Los servidores DNS resuelven nombres y los servidores DHCP asignan direcciones; ambos consumen pocos recursos pero son críticos, así que ejecútalos de forma redundante. Un servidor NTP proporciona la hora al resto de la red. Un servidor de correo, como Exchange o Postfix, envía y recibe correo electrónico y almacena los buzones, así que necesita bastante almacenamiento y memoria. Los servidores de mensajería incluyen plataformas de chat y colaboración y colas de mensajes que pasan datos entre aplicaciones; necesitan baja latencia y almacenamiento confiable para los mensajes en cola.",
   "Para dimensionar el hardware de un rol, primero identifica el recurso que es el cuello de botella: CPU para aplicaciones con mucho cómputo, memoria para bases de datos y hosts de virtualización, IOPS de disco para sistemas transaccionales, capacidad para servidores de archivos y de respaldos, y ancho de banda de red para tráfico de archivos y web. Obtén una línea base de los sistemas existentes o de la guía de dimensionamiento del fabricante, agrega el crecimiento esperado y deja un margen. Considera también si los roles pueden compartir un servidor. Combinar roles ligeros como DNS y DHCP es común, pero mezclar una base de datos muy ocupada con un servidor web público aumenta el riesgo, porque un compromiso o un pico de recursos en uno afecta al otro. La virtualización facilita darle a cada rol su propia VM mientras se comparte el hardware.",
   "Por último, recuerda que cada rol agrega servicios y puertos abiertos, así que instala solo los roles que un servidor realmente necesita."
  ],
  "terms": [
   [
    "Server role (rol de servidor)",
    "La función principal que un servidor proporciona a los clientes, como servicios web, de base de datos o de archivos."
   ],
   [
    "Domain controller (controlador de dominio)",
    "Un servidor que ejecuta servicios de directorio, almacena cuentas y autentica usuarios y equipos en un dominio."
   ],
   [
    "Application server (servidor de aplicaciones)",
    "Un servidor que ejecuta la lógica de negocio, a menudo ubicado entre los front ends web y las bases de datos."
   ],
   [
    "Sizing (dimensionamiento)",
    "Elegir la capacidad de CPU, memoria, almacenamiento y red para cubrir las necesidades de una carga de trabajo más el crecimiento y un margen."
   ]
  ],
  "example": "Una empresa planifica un nuevo sistema de inventario. El nivel web se ejecuta en dos VM modestas detrás de un balanceador de carga, el nivel de aplicaciones recibe más CPU y el servidor de base de datos recibe la mayor cantidad de memoria y un arreglo SSD en RAID 10, porque los datos de línea base del sistema anterior mostraron que la latencia del almacenamiento era el cuello de botella.",
  "tip": "Cuando una pregunta te pide qué recurso importa más: las bases de datos y los hosts de virtualización quieren memoria y almacenamiento rápido, los servidores de archivos quieren capacidad y rendimiento de red, y DNS/DHCP quieren redundancia más que potencia.",
  "check": [
   [
    "¿Qué rol de servidor normalmente se beneficia más del almacenamiento con muchas IOPS?",
    "El servidor de base de datos, porque realiza muchas lecturas y escrituras aleatorias pequeñas."
   ],
   [
    "¿Por qué ejecutar al menos dos controladores de dominio?",
    "La autenticación depende de ellos; un segundo controlador mantiene funcionando los inicios de sesión si el primero falla."
   ]
  ]
 },
 {
  "t": "High availability: clustering (active-active vs active-passive), heartbeat, quorum, load balancing methods (round robin, least connections), failover and failback",
  "tt": "Alta disponibilidad: clústeres (activo-activo vs. activo-pasivo), heartbeat, quórum, métodos de balanceo de carga (round robin, menos conexiones), failover y failback",
  "body": [
   "La alta disponibilidad (HA) consiste en diseñar un servicio para que siga funcionando, o se recupere en segundos o minutos, cuando falla un componente. La disponibilidad suele expresarse como un porcentaje de tiempo de actividad, como 99.9 o 99.99 por ciento. Las herramientas principales son los clústeres y los balanceadores de carga, y ambos dependen de no tener ningún punto único de falla.",
   "Un clúster es un grupo de servidores, llamados nodos, que trabajan juntos para proporcionar un servicio. En un clúster activo-pasivo, un nodo ejecuta el servicio mientras el otro permanece en espera; si el nodo activo falla, el nodo pasivo toma el control. Es más simple y ofrece un rendimiento predecible después del failover, pero la capacidad del nodo en espera queda inactiva. En un clúster activo-activo, todos los nodos atienden tráfico a la vez, lo que aprovecha completamente el hardware y reparte la carga. El problema es que si un nodo falla, los que sobreviven deben absorber su carga, así que cada uno debe tener capacidad de sobra; ejecutar dos nodos activos al 80 por ciento cada uno significa que un nodo no podrá soportar el 160 por ciento.",
   "Los nodos se monitorean entre sí mediante un heartbeat (latido), una señal regular enviada por la red, a menudo por un enlace dedicado. Si un nodo deja de enviar heartbeats, los demás suponen que falló e inician el failover. Una situación peligrosa es el split brain (cerebro dividido): el enlace de heartbeat se rompe pero ambos nodos siguen funcionando, cada uno cree que el otro murió y ambos intentan ser dueños de los mismos datos, lo que puede corromperlos. El quórum evita esto. Cada nodo, y a menudo un testigo (witness) como un disco compartido o un recurso compartido de archivos, obtiene un voto, y el clúster solo se ejecuta en el lado que tiene la mayoría de los votos. Por eso los clústeres prefieren números impares de votos y agregan un testigo cuando hay un número par de nodos.",
   "El failover es mover un servicio de un nodo que falló o no está sano a uno sano, de forma automática o manual. El failback es devolverlo al nodo original una vez que ese nodo se repara. El failback puede ser automático o manual; muchos administradores prefieren un failback manual o programado para que el servicio no se mueva dos veces durante el horario laboral ni regrese a un nodo que todavía es inestable.",
   "Un balanceador de carga distribuye las solicitudes de los clientes entre un grupo de servidores y retira los servidores no sanos mediante comprobaciones de estado (health checks). Round robin envía cada nueva solicitud al siguiente servidor por turno, lo cual es simple y funciona cuando los servidores y las solicitudes son similares. Weighted round robin (round robin ponderado) envía más a los servidores más potentes. Least connections (menos conexiones) envía cada nueva solicitud al servidor con menos conexiones activas, lo que maneja mejor las sesiones largas o desiguales. Algunas aplicaciones necesitan persistencia de sesión (sticky sessions) para que un usuario siga llegando al mismo servidor. Los propios balanceadores de carga normalmente se implementan en pares para evitar convertirse en un punto único de falla."
  ],
  "terms": [
   [
    "Active-passive cluster (clúster activo-pasivo)",
    "Un clúster en el que un nodo atiende mientras otro espera para tomar el control en caso de falla."
   ],
   [
    "Heartbeat (latido)",
    "Una señal periódica que los nodos intercambian para confirmar que el otro sigue vivo."
   ],
   [
    "Quorum (quórum)",
    "La mayoría de votos que un clúster requiere para seguir funcionando, lo que evita el split brain."
   ],
   [
    "Least connections (menos conexiones)",
    "Un método de balanceo de carga que envía las nuevas solicitudes al servidor con menos conexiones activas."
   ]
  ],
  "example": "Un clúster SQL de dos nodos pierde su red de heartbeat. Como un testigo de recurso compartido de archivos le da al clúster tres votos, el nodo que todavía puede llegar al testigo mantiene el quórum y ejecuta la base de datos, mientras que el nodo aislado detiene sus servicios, evitando el split brain.",
  "tip": "El quórum y los testigos existen para evitar el split brain. Round robin supone servidores y solicitudes iguales; least connections es adecuado para sesiones desiguales o largas. Los nodos activo-activo necesitan capacidad de sobra para absorber la carga de un compañero que falló.",
  "check": [
   [
    "¿Qué es el failback?",
    "Devolver un servicio a su nodo original después de que ese nodo se ha reparado."
   ],
   [
    "¿Por qué agregar un testigo a un clúster de dos nodos?",
    "Proporciona un voto de desempate para que un lado pueda tener la mayoría y mantener el quórum si los nodos pierden contacto."
   ],
   [
    "¿Qué método de balanceo de carga funciona mejor cuando las sesiones varían mucho en duración?",
    "Least connections, porque toma en cuenta qué tan ocupado está cada servidor en ese momento."
   ]
  ]
 },
 {
  "t": "Redundancy: NIC teaming, multipathing (MPIO), redundant power and storage, fault tolerance vs high availability",
  "tt": "Redundancia: NIC teaming, multipathing (MPIO), energía y almacenamiento redundantes, tolerancia a fallos vs. alta disponibilidad",
  "body": [
   "La redundancia significa tener más de uno de un componente para que una falla no detenga el servicio. El objetivo es eliminar los puntos únicos de falla (SPOF): cualquier pieza cuya falla derribe todo el sistema. Server+ te pide detectar los SPOF y conocer las tecnologías específicas que los eliminan.",
   "Empieza por la red. El NIC teaming combina dos o más adaptadores de red en una sola interfaz lógica, de modo que si falla un cable, un puerto o una tarjeta, el tráfico continúa por los miembros restantes. Para una protección completa, conecta los miembros del team a dos switches diferentes y usa tarjetas físicas distintas en lugar de dos puertos de la misma tarjeta, ya que una tarjeta que falle dejaría sin servicio ambos puertos.",
   "Las rutas de almacenamiento necesitan el mismo tratamiento. El multipathing, o MPIO (E/S de múltiples rutas), le da a un servidor más de una ruta hacia su almacenamiento SAN: dos adaptadores de bus de host o NIC iSCSI, dos switches de fabric y dos controladoras de almacenamiento. El driver de multiruta presenta el LUN como un solo disco y hace failover entre las rutas o balancea el tráfico entre ellas (por ejemplo, round robin). Sin MPIO, el sistema operativo puede ver el mismo LUN dos veces y tratarlo como dos discos, lo que puede causar corrupción. Habilita la característica MPIO o el servicio `multipath` de Linux y configura la política recomendada por el fabricante.",
   "La redundancia de energía proviene de fuentes de alimentación dobles alimentadas desde PDU, circuitos y UPS separados, más un generador para los cortes prolongados. La redundancia de almacenamiento proviene de RAID, discos de repuesto en caliente, arreglos con doble controladora y replicación a otro arreglo. La redundancia de enfriamiento proviene de ventiladores adicionales y unidades de aire acondicionado adicionales. En un nivel más alto, agregas servidores redundantes en clústeres, switches y routers redundantes e incluso sitios redundantes.",
   "La tolerancia a fallos y la alta disponibilidad están relacionadas, pero no son idénticas. Un sistema tolerante a fallos sigue operando sin ninguna interrupción cuando falla un componente; los usuarios nunca lo notan. Un RAID 1 que pierde un disco, o un servidor que funciona con su segunda fuente de alimentación, son ejemplos. La alta disponibilidad acepta una breve interrupción mientras el servicio se recupera, como los segundos o minutos que tarda un clúster en hacer failover y reiniciar un servicio en otro nodo. La verdadera tolerancia a fallos suele costar más porque duplica todo en sincronía (lockstep). Elegir entre ambas depende de cuánto tiempo de inactividad puede aceptar el negocio y cuánto está dispuesto a pagar.",
   "Recuerda que los componentes redundantes deben monitorearse. Una fuente de alimentación que falló o un miembro del team caído te dejan funcionando sin protección, así que las alertas del BMC, de la controladora RAID y del sistema operativo deben llegar a alguien que reemplace la pieza."
  ],
  "terms": [
   [
    "Single point of failure (SPOF) (punto único de falla)",
    "Cualquier componente cuya falla, por sí sola, detiene todo el sistema."
   ],
   [
    "MPIO (multipath I/O) (E/S de múltiples rutas)",
    "Software que usa varias rutas físicas hacia el mismo almacenamiento para failover y balanceo de carga, presentándolas como un solo disco."
   ],
   [
    "Fault tolerance (tolerancia a fallos)",
    "La capacidad de seguir operando sin interrupción cuando falla un componente."
   ],
   [
    "High availability (alta disponibilidad)",
    "Un diseño que minimiza el tiempo de inactividad, permitiendo una breve interrupción mientras ocurre el failover."
   ]
  ],
  "example": "Una auditoría descubre que un host de virtualización tiene dos NIC iSCSI, pero ambas se conectan al mismo switch. Cuando ese switch se reinicia por una actualización, todas las VM pierden su almacenamiento. La solución es mover una NIC a un segundo switch y confirmar que MPIO muestra dos rutas activas.",
  "tip": "Tolerante a fallos significa cero interrupciones; alta disponibilidad significa una breve interrupción durante el failover. MPIO es la respuesta para rutas de almacenamiento redundantes, y NIC teaming para enlaces de red redundantes.",
  "check": [
   [
    "¿Qué puede pasar si un servidor ve un LUN de SAN por dos rutas sin MPIO?",
    "El sistema operativo puede tratar el LUN como dos discos separados, con riesgo de corrupción de datos."
   ],
   [
    "¿Un clúster de failover de dos nodos es tolerante a fallos o de alta disponibilidad?",
    "De alta disponibilidad, porque el servicio se interrumpe brevemente mientras hace failover."
   ]
  ]
 },
 {
  "t": "Virtualization: Type 1 vs Type 2 hypervisors, host vs guest, resource allocation and overcommitment, virtual switches and NICs, snapshots, templates, VM migration",
  "tt": "Virtualización: hipervisores Tipo 1 vs. Tipo 2, host vs. invitado, asignación de recursos y sobreasignación, switches y NIC virtuales, snapshots, plantillas, migración de VM",
  "body": [
   "La virtualización ejecuta muchas máquinas virtuales (VM) independientes en un solo servidor físico. Aumenta el aprovechamiento del hardware, acelera el aprovisionamiento y facilita mover o recuperar cargas de trabajo. El software que lo hace posible es el hipervisor.",
   "Un hipervisor Tipo 1, también llamado bare metal, se instala directamente en el hardware y ejecuta las VM con una sobrecarga mínima. Algunos ejemplos son VMware ESXi, Microsoft Hyper-V y KVM en Linux. Es lo que usan los centros de datos de producción. Un hipervisor Tipo 2, también llamado alojado (hosted), se ejecuta como una aplicación sobre un sistema operativo normal, como VirtualBox o VMware Workstation en una laptop. Es práctico para laboratorios y pruebas, pero agrega sobrecarga y depende del sistema operativo del host. La máquina física es el host; cada VM es un invitado (guest) que ejecuta su propio sistema operativo invitado. Los hipervisores necesitan que las extensiones de virtualización de la CPU (Intel VT-x o AMD-V) estén habilitadas en el firmware.",
   "La asignación de recursos le da a cada VM CPU virtuales (vCPU), memoria, disco y adaptadores de red. La sobreasignación (overcommitment) significa asignar más recursos virtuales de los que existen físicamente, confiando en que no todas las VM usen su parte completa al mismo tiempo. La sobreasignación de CPU es común y generalmente segura con moderación; demasiada provoca CPU ready time, en el que las VM esperan un núcleo físico. La sobreasignación de memoria es más riesgosa: cuando el host se queda sin memoria, usa técnicas como ballooning e intercambio a disco (swapping), que hacen mucho más lentas las VM. El almacenamiento puede aprovisionarse de forma delgada (thin provisioning), donde un disco virtual solo consume el espacio realmente escrito; esto ahorra espacio, pero debes monitorear los datastores para que no se llenen y pausen todas las VM que contienen. El aprovisionamiento grueso (thick provisioning) reserva el tamaño completo desde el principio.",
   "La red también es virtual. Cada VM tiene una o más NIC virtuales conectadas a un switch virtual dentro del host. El switch virtual se conecta a las NIC físicas (uplinks) para el tráfico externo, y puede ser externo (llega a la red física), interno (solo host y VM) o privado (solo VM). Los grupos de puertos (port groups) o la configuración de VLAN en el switch virtual etiquetan el tráfico hacia las VLAN correctas.",
   "Un snapshot captura el estado del disco de una VM, y opcionalmente de la memoria, en un momento determinado para que puedas revertir, por ejemplo antes de una actualización riesgosa. Los snapshots funcionan escribiendo los cambios en archivos delta, así que crecen con el tiempo y degradan el rendimiento; elimínalos cuando ya no los necesites, y nunca trates un snapshot como un respaldo, ya que depende del disco original. Una plantilla es una imagen maestra de VM que se usa para implementar nuevas VM consistentes rápidamente.",
   "La migración de VM mueve una VM entre hosts. La migración en vivo (llamada vMotion en VMware y Live Migration en Hyper-V) mueve una VM en ejecución sin tiempo de inactividad perceptible, y normalmente requiere almacenamiento compartido o una migración del almacenamiento, CPU compatibles y una red de migración rápida. La migración en frío (cold migration) mueve una VM apagada. La migración hace posible el mantenimiento de los hosts sin interrupciones del servicio."
  ],
  "terms": [
   [
    "Type 1 hypervisor (hipervisor Tipo 1)",
    "Un hipervisor bare metal instalado directamente en el hardware, usado en producción."
   ],
   [
    "Overcommitment (sobreasignación)",
    "Asignar a las VM más CPU virtual o memoria de la que el host tiene físicamente."
   ],
   [
    "Snapshot",
    "Una captura del estado de una VM en un momento determinado, usada para revertir a corto plazo, no como respaldo."
   ],
   [
    "Live migration (migración en vivo)",
    "Mover una VM en ejecución de un host a otro sin apagarla."
   ]
  ],
  "example": "Antes de aplicar parches a un host, la administradora migra en vivo sus doce VM a otro nodo del clúster, aplica los parches y reinicia el host vacío, y luego las regresa. También encuentra un snapshot de tres meses que hace lento a una VM de servidor de archivos y lo consolida.",
  "tip": "El Tipo 1 se ejecuta en bare metal y se usa en centros de datos; el Tipo 2 se ejecuta sobre un sistema operativo host. Los snapshots son para revertir a corto plazo y afectan el rendimiento si se conservan; nunca sustituyen a los respaldos.",
  "check": [
   [
    "¿Qué tipo de hipervisor se ejecuta como una aplicación en un sistema operativo de escritorio?",
    "El Tipo 2 (alojado), como VirtualBox."
   ],
   [
    "¿Qué riesgo implica el thin provisioning?",
    "Los datastores pueden llenarse inesperadamente a medida que crecen los discos, lo que puede pausar o hacer fallar las VM."
   ],
   [
    "¿Por qué la sobreasignación de memoria es más riesgosa que la de CPU?",
    "Cuando se agota la memoria física, el host debe usar ballooning o intercambiar a disco, lo que hace mucho más lentas las VM."
   ]
  ]
 },
 {
  "t": "Cloud models: IaaS, PaaS, SaaS; public, private, hybrid; on-premises vs cloud-hosted servers",
  "tt": "Modelos de nube: IaaS, PaaS, SaaS; pública, privada, híbrida; servidores locales (on-premises) vs. alojados en la nube",
  "body": [
   "La computación en la nube entrega recursos de cómputo bajo demanda a través de una red, con aprovisionamiento de autoservicio, escalamiento elástico y facturación según el uso (pay-as-you-go). Los administradores de Server+ necesitan saber qué modelo de servicio traslada qué responsabilidades a un proveedor, y qué modelo de implementación le conviene a una organización determinada.",
   "Los modelos de servicio describen cuánto administra el proveedor. En IaaS (Infrastructure as a Service), el proveedor suministra máquinas virtuales, almacenamiento y redes; tú instalas y administras el sistema operativo, los parches, el middleware y las aplicaciones. Es lo más parecido a ejecutar tus propios servidores y te da el mayor control. En PaaS (Platform as a Service), el proveedor también administra el sistema operativo y el entorno de ejecución (runtime), y tú implementas tu código o tus bases de datos en una plataforma administrada, así que ya no aplicas parches a servidores. En SaaS (Software as a Service), el proveedor ejecuta toda la aplicación y tú simplemente la usas a través de un navegador o un cliente, como el correo electrónico alojado o un sistema CRM; solo administras tus datos, usuarios y configuraciones.",
   "Esta división es el modelo de responsabilidad compartida. El proveedor siempre asegura los centros de datos físicos y el hardware. A medida que pasas de IaaS a PaaS y a SaaS, más capas se trasladan al proveedor. Tú, el cliente, siempre sigues siendo responsable de tus datos, cuentas de usuario y control de acceso. Muchos incidentes de seguridad en la nube provienen de clientes que configuran mal las partes que les corresponden, como dejar almacenamiento legible públicamente.",
   "Los modelos de implementación describen quién usa la infraestructura. Una nube pública es propiedad de un proveedor y la comparten muchos clientes (tenants), aislados lógicamente entre sí. Ofrece una escala enorme y no hay hardware que comprar. Una nube privada está dedicada a una sola organización, ya sea en su propio centro de datos o alojada por un proveedor, y da más control y un cumplimiento normativo más sencillo a un costo mayor. Una nube híbrida conecta recursos privados o locales con servicios de nube pública para que las cargas de trabajo y los datos puedan moverse entre ellos, por ejemplo, manteniendo una base de datos sensible en las instalaciones mientras se amplían los servidores web hacia la nube pública durante los picos. Una nube comunitaria la comparten organizaciones con requisitos comunes.",
   "Los servidores locales (on-premises) se ejecutan en tus propias instalaciones. Compras el hardware (gasto de capital), controlas todo y eres responsable de la energía, el enfriamiento, la seguridad física y el reemplazo del hardware. Los servidores alojados en la nube se rentan (gasto operativo), escalan rápidamente y trasladan el cuidado del hardware al proveedor, pero los costos pueden crecer si no se administran, el rendimiento depende de la conectividad de red y la ubicación de los datos puede importar por las regulaciones. Muchas organizaciones eligen según la carga de trabajo: las cargas estables, predecibles o reguladas a menudo permanecen en las instalaciones, mientras que las cargas variables o nuevas van a la nube.",
   "Como administrador de servidores en la nube, tus habilidades de IaaS siguen siendo útiles: todavía dimensionas instancias, refuerzas sistemas operativos, aplicas parches, respaldas y monitoreas."
  ],
  "terms": [
   [
    "IaaS",
    "Infrastructure as a Service: VM, almacenamiento y redes rentados en los que el cliente administra el sistema operativo y lo que está por encima."
   ],
   [
    "PaaS",
    "Platform as a Service: un entorno de ejecución administrado en el que el cliente implementa código sin administrar servidores."
   ],
   [
    "SaaS",
    "Software as a Service: una aplicación completa que ejecuta el proveedor y usa el cliente."
   ],
   [
    "Hybrid cloud (nube híbrida)",
    "Una combinación de recursos locales o privados y servicios de nube pública que funcionan en conjunto."
   ]
  ],
  "example": "Un minorista traslada el correo electrónico a un proveedor SaaS, ejecuta su aplicación web personalizada en una plataforma PaaS para que los desarrolladores ya no apliquen parches a servidores, y mantiene su base de datos de pagos en las instalaciones. Conectar la base de datos local con la aplicación alojada en la nube convierte el entorno en una nube híbrida.",
  "tip": "Pregúntate quién aplica los parches al sistema operativo: tú lo haces en IaaS, el proveedor lo hace en PaaS y SaaS. El cliente siempre es responsable de los datos y del acceso de los usuarios, sin importar el modelo.",
  "check": [
   [
    "¿En qué modelo de servicio todavía aplicas parches al sistema operativo invitado?",
    "En IaaS, porque el proveedor solo suministra la infraestructura."
   ],
   [
    "¿Qué hace que una implementación en la nube sea híbrida?",
    "Combina recursos locales o de nube privada con servicios de nube pública que están conectados y se usan en conjunto."
   ]
  ]
 },
 {
  "t": "Scripting basics: Bash, PowerShell, batch, Python; variables, loops, conditionals, comparators; common uses (user setup, log checks, scheduled tasks)",
  "tt": "Fundamentos de scripting: Bash, PowerShell, batch, Python; variables, bucles, condicionales, comparadores; usos comunes (creación de usuarios, revisión de logs, tareas programadas)",
  "body": [
   "El scripting convierte el trabajo administrativo repetitivo en un archivo de comandos que puedes ejecutar una y otra vez, de la misma forma cada vez. Server+ no espera que seas programador, pero sí que puedas leer un script corto, reconocer su lenguaje y decir qué hace.",
   "Bash es el shell estándar en Linux; los scripts normalmente terminan en `.sh` y empiezan con una línea shebang como `#!/bin/bash`. PowerShell es el shell de Microsoft basado en objetos para Windows (también disponible en Linux), con scripts que terminan en `.ps1` y comandos en forma verbo-sustantivo como `Get-Service`. Los archivos batch (`.bat` o `.cmd`) son los scripts más antiguos del símbolo del sistema de Windows. Python es un lenguaje de propósito general (`.py`) que se usa en todas las plataformas para la automatización. Todos tienen los mismos elementos básicos.",
   "Una variable almacena un valor para usarlo después. En Bash escribes `name=value` y lo lees con `$name`; en PowerShell ambos usan un signo de dólar, `$name = 'value'`; en batch, `set name=value` y `%name%`; en Python, `name = 'value'`. Los condicionales eligen qué hacer: `if`, `else` y `elif` o `elseif`. Los bucles repiten trabajo: un bucle `for` se ejecuta una vez por cada elemento de una lista, y un bucle `while` se ejecuta mientras se cumpla una condición.",
   "Los comparadores evalúan valores. Bash usa `-eq`, `-ne`, `-gt` y `-lt` para números y `==` o `!=` para cadenas dentro de los corchetes de prueba. PowerShell usa `-eq`, `-ne`, `-gt`, `-lt`, `-like` y `-match`, porque `>` significa redirección en los shells. Python usa `==`, `!=`, `>` y `<`. Confundirlos es una trampa clásica del examen: `-gt` es estilo shell y PowerShell, mientras que `>` es estilo Python.",
   "```bash\n#!/bin/bash\n# Advertir si el uso del sistema de archivos raíz supera el 90 por ciento\nusage=$(df / --output=pcent | tail -1 | tr -dc '0-9')\nif [ \"$usage\" -gt 90 ]; then\n  echo \"Disk usage is ${usage}%\"\nfi\n```",
   "```powershell\n# Crear usuarios a partir de un archivo CSV\n$users = Import-Csv users.csv\nforeach ($u in $users) {\n  New-LocalUser -Name $u.Name -NoPassword\n}\n```",
   "Los usos comunes incluyen crear cuentas de usuario en masa a partir de una lista, revisar los logs en busca de errores y enviar un resumen por correo, monitorear el espacio en disco, rotar o archivar archivos, recopilar inventario y reiniciar un servicio que se detuvo. Los scripts a menudo se ejecutan de forma programada: `cron` en Linux (una línea de crontab indica minuto, hora, día del mes, mes y día de la semana) y el Programador de tareas (Task Scheduler) en Windows.",
   "Escribe scripts de forma segura. Pruébalos primero en un laboratorio, agrega comentarios, evita escribir contraseñas directamente en el código (usa un almacén seguro de credenciales), ejecútalos con el mínimo privilegio necesario y mantén los scripts en control de versiones para que los cambios queden registrados. La directiva de ejecución (execution policy) de PowerShell controla si los scripts pueden ejecutarse, y los scripts firmados dan una garantía adicional."
  ],
  "terms": [
   [
    "Variable",
    "Una ubicación de almacenamiento con nombre para un valor que un script puede leer y cambiar."
   ],
   [
    "Loop (bucle)",
    "Una estructura que repite comandos, como for (por cada elemento) o while (hasta que cambie una condición)."
   ],
   [
    "Comparator (comparador)",
    "Un operador que compara valores, como -eq o -gt en los shells y == o > en Python."
   ],
   [
    "cron",
    "El programador de Linux que ejecuta comandos a horas establecidas definidas en un crontab."
   ]
  ],
  "example": "Todas las mañanas a las 6:00, un trabajo de cron ejecuta un script de Bash que busca errores HTTP 500 en el log del servidor web del día anterior, los cuenta y envía el total al canal de operaciones para que el equipo vea los problemas antes de que llamen los usuarios.",
  "tip": "Identifica el lenguaje por las pistas: variables con $ junto con -eq y cmdlets como Get-Item indican PowerShell; shebang y pruebas con [ ] indican Bash; %var% indica batch; sangría con == indica Python.",
  "check": [
   [
    "¿Qué comparador usaría un script de Bash para probar si un número es mayor que 90?",
    "-gt, como en [ \"$usage\" -gt 90 ]."
   ],
   [
    "¿Qué herramienta de Windows programa un script de PowerShell para que se ejecute cada noche?",
    "El Programador de tareas (Task Scheduler)."
   ]
  ]
 },
 {
  "t": "Asset management and documentation: labeling, inventory, warranty, life-cycle, baselines, diagrams, change management, SLAs, secure storage of documents",
  "tt": "Gestión de activos y documentación: etiquetado, inventario, garantía, ciclo de vida, líneas base, diagramas, gestión de cambios, SLA, almacenamiento seguro de documentos",
  "body": [
   "Una buena documentación es lo que permite que otra persona, o tú mismo a las 3 a.m., entienda, repare y cambie un entorno de servidores de forma segura. La gestión de activos lleva el control de lo que posees y en qué punto de su vida se encuentra. Server+ considera ambas como tareas administrativas fundamentales.",
   "El etiquetado va primero. Etiqueta cada servidor, bahía de disco, extremo de cable, PDU y puerto con un esquema de nombres consistente, y marca físicamente los activos con un número de activo o un código de barras. La etiqueta vincula el dispositivo físico con su registro. Un inventario, a menudo en un sistema de gestión de activos o una CMDB (base de datos de gestión de la configuración), registra la marca, el modelo, el número de serie, la ubicación (rack y posición U), el propietario, la fecha de compra, la configuración y las relaciones con otros sistemas de cada activo.",
   "Lleva el control de la garantía y los contratos de soporte: fechas de inicio y fin, el nivel de respuesta (por ejemplo, siguiente día hábil o cuatro horas en sitio) y cómo abrir un caso. Saber que un servidor está fuera de garantía antes de que falle cambia la decisión entre comprar una pieza o reemplazar la máquina. El ciclo de vida del activo va desde la adquisición, pasando por la implementación, la operación, el mantenimiento y las actualizaciones, hasta el retiro y la eliminación. Planificar los ciclos de renovación evita ejecutar servicios críticos en hardware o software sin soporte después del fin de su vida útil.",
   "Una línea base (baseline) es un registro de lo normal: una configuración estándar (los ajustes aprobados para un tipo de servidor) y mediciones de rendimiento (uso típico de CPU, memoria, disco y red). Las líneas base de configuración te ayudan a detectar desviaciones (drift) y cambios no autorizados; las líneas base de rendimiento te ayudan a reconocer cuándo algo es anormal.",
   "Los diagramas muestran cómo encajan las cosas. Los diagramas físicos incluyen elevaciones de rack y mapas de cableado. Los diagramas lógicos muestran las redes, el direccionamiento IP, las VLAN y cómo dependen las aplicaciones unas de otras. Mantenlos actualizados, o te confundirán durante las interrupciones.",
   "La gestión de cambios es el proceso formal para hacer cambios de forma controlada. Una solicitud describe qué cambiará, por qué, el riesgo, los pasos de implementación, el plan de pruebas y un plan de reversión. Un comité asesor de cambios (CAB) o un aprobador la revisa, se programa en una ventana de mantenimiento, se implementa, se verifica y se documenta. Los cambios de emergencia siguen una ruta más rápida, pero aun así se registran. Este proceso evita interrupciones inesperadas y deja un registro de auditoría.",
   "Un SLA (acuerdo de nivel de servicio) es un compromiso documentado entre un proveedor y un cliente, como un 99.9 por ciento de tiempo de actividad o un tiempo de respuesta de cuatro horas, a menudo con penalizaciones si no se cumple. Los equipos internos pueden usar entre sí acuerdos de nivel operativo (OLA).",
   "La documentación a menudo contiene detalles sensibles: planes de IP, contraseñas, reglas de firewall. Almacénala de forma segura con controles de acceso, cífrala, guarda las contraseñas en un gestor de contraseñas (password vault) en lugar de en documentos, conserva el historial de versiones y asegúrate de que exista una copia fuera de línea para que esté disponible durante una interrupción grave."
  ],
  "terms": [
   [
    "CMDB",
    "Configuration management database (base de datos de gestión de la configuración): un registro de los activos de TI, su configuración y sus relaciones."
   ],
   [
    "Baseline (línea base)",
    "Una configuración estándar documentada o un nivel de rendimiento normal que se usa como punto de comparación."
   ],
   [
    "Change management (gestión de cambios)",
    "Un proceso controlado para solicitar, aprobar, programar, implementar y documentar cambios con planes de reversión."
   ],
   [
    "SLA",
    "Service level agreement (acuerdo de nivel de servicio): un compromiso formal sobre el desempeño del servicio, como el tiempo de actividad o el tiempo de respuesta."
   ]
  ],
  "example": "Un disco falla en un arreglo de almacenamiento. Como el registro del activo indica el número de serie, la posición en el rack y una garantía de cuatro horas en sitio, el técnico abre un caso en minutos, y el reemplazo se registra en la CMDB con la misma etiqueta de activo.",
  "tip": "Los cambios necesitan una solicitud documentada, aprobación, una ventana de mantenimiento y un plan de reversión. Una línea base es aquello con lo que comparas para saber si el comportamiento actual es anormal.",
  "check": [
   [
    "¿Qué debe incluir una solicitud de cambio además del cambio en sí?",
    "El motivo, la evaluación de riesgos, los pasos de implementación y de prueba, un calendario y un plan de reversión."
   ],
   [
    "¿Por qué conservar una copia fuera de línea de la documentación?",
    "Para que esté disponible cuando los sistemas que la almacenan no funcionen, por ejemplo, durante un desastre."
   ]
  ]
 },
 {
  "t": "Licensing models: per socket, per core, per user, per device/CAL, site, subscription, open source; license compliance and version compatibility",
  "tt": "Modelos de licenciamiento: por socket, por núcleo, por usuario, por dispositivo/CAL, por sitio, por suscripción, código abierto; cumplimiento de licencias y compatibilidad de versiones",
  "body": [
   "Las licencias de software definen cómo puedes usar un producto y cómo pagas por él. Equivocarse con las licencias puede costar más que el hardware, ya sea por comprar de más o por las penalizaciones después de una auditoría. Server+ espera que reconozcas los modelos comunes y sepas cómo las decisiones de hardware los afectan.",
   "El licenciamiento por socket cobra por cada socket de procesador físico del servidor, sin importar cuántos núcleos tenga cada procesador. El licenciamiento por núcleo cobra por cada núcleo físico, a menudo con un número mínimo de núcleos por procesador o por servidor. Muchos sistemas operativos de servidor y bases de datos modernos usan licenciamiento por núcleo, así que agregar una CPU con más núcleos puede aumentar el costo de las licencias, y en entornos virtualizados puede ser necesario licenciar todos los núcleos de cada host en el que podría ejecutarse una VM. Al dimensionar el hardware, menos núcleos pero más rápidos pueden resultar más baratos en total para el software licenciado por núcleo.",
   "Las licencias por usuario y por dispositivo cubren quién o qué accede al servidor. Una licencia de acceso de cliente (CAL) es el ejemplo clásico en el mundo de Microsoft: además de licenciar el servidor en sí, cada usuario (CAL de usuario) o cada dispositivo (CAL de dispositivo) que se conecta necesita una CAL. Las CAL de usuario son adecuadas para personas que usan varios dispositivos; las CAL de dispositivo son adecuadas para dispositivos compartidos, como un quiosco o una PC de trabajo por turnos que usan muchas personas. Algunos productos también ofrecen licenciamiento por usuario concurrente, que cuenta cuántas personas lo usan al mismo tiempo.",
   "Una licencia de sitio cubre el uso ilimitado en una ubicación o en toda una organización por un precio fijo, lo que simplifica el control. El licenciamiento por suscripción cobra una tarifa recurrente, mensual o anual, y normalmente incluye actualizaciones y soporte; si dejas de pagar, termina el derecho a usar el software. Las licencias perpetuas, en cambio, te permiten usar una versión específica de forma indefinida, con mantenimiento de pago opcional para actualizaciones y soporte.",
   "El software de código abierto pone su código fuente a disposición bajo licencias como la GPL (GNU General Public License), MIT o Apache. A menudo es gratuito de usar, pero no está libre de obligaciones: algunas licencias te exigen compartir las modificaciones si las distribuyes, y las distribuciones empresariales venden suscripciones de soporte de pago. Lee los términos de la licencia antes de construir productos sobre él.",
   "El cumplimiento de licencias significa usar solo lo que has pagado y seguir los términos. Conserva los registros de compras, claves y asignaciones en tu sistema de activos, lleva el control de las instalaciones con herramientas de inventario y concilia con regularidad. Los fabricantes pueden auditarte, y el uso sin licencia puede generar multas. Revisa también la compatibilidad de versiones: una licencia puede cubrir una versión específica, los derechos de downgrade pueden permitirte ejecutar una versión anterior y algunas aplicaciones solo admiten ciertas versiones del sistema operativo. Actualizar un sistema operativo puede requerir nuevas licencias o romper una aplicación que no está certificada para él."
  ],
  "terms": [
   [
    "Per-core licensing (licenciamiento por núcleo)",
    "Un modelo que cobra por cada núcleo físico del procesador, a menudo con mínimos por procesador o por servidor."
   ],
   [
    "CAL (client access license) (licencia de acceso de cliente)",
    "Una licencia que permite a un usuario o dispositivo acceder al software del servidor."
   ],
   [
    "Subscription license (licencia por suscripción)",
    "Una licencia con tarifa recurrente que incluye actualizaciones y termina cuando se dejan de hacer los pagos."
   ],
   [
    "Site license (licencia de sitio)",
    "Una licencia que permite el uso ilimitado dentro de una ubicación u organización definida por una tarifa fija."
   ]
  ],
  "example": "Una empresa planea reemplazar dos CPU de 8 núcleos por dos CPU de 32 núcleos en su servidor de base de datos. Antes de hacer el pedido, el administrador revisa el licenciamiento por núcleo de la base de datos y descubre que las nuevas CPU cuadruplicarían el costo de las licencias, así que eligen una cantidad menor de núcleos con mayor velocidad de reloj.",
  "tip": "Las CAL de usuario son para personas con muchos dispositivos; las CAL de dispositivo son para dispositivos compartidos por muchas personas. Más núcleos pueden significar costos más altos con licenciamiento por núcleo, aunque el hardware sea barato.",
  "check": [
   [
    "Un centro de llamadas tiene 100 trabajadores que comparten 30 PC en distintos turnos. ¿CAL de usuario o de dispositivo?",
    "CAL de dispositivo, porque 30 licencias de dispositivo cubren todas las PC compartidas, menos que 100 licencias de usuario."
   ],
   [
    "¿Código abierto significa que no hay obligaciones de licencia?",
    "No. Las licencias de código abierto tienen términos, como compartir las modificaciones al distribuir, y el soporte puede venderse por separado."
   ]
  ]
 },
 {
  "t": "Data security: encryption at rest and in transit, data retention, data storage location, UEFI/BIOS passwords, bootloader password",
  "tt": "Seguridad de los datos: cifrado en reposo y en tránsito, retención de datos, ubicación del almacenamiento de datos, contraseñas de UEFI/BIOS, contraseña del gestor de arranque",
  "body": [
   "Los servidores guardan los datos que más le importan a una organización. La seguridad de los datos protege esos datos dondequiera que estén: almacenados en disco, moviéndose por una red y durante el proceso de arranque, cuando un atacante con acceso físico podría intentar evadir el sistema operativo.",
   "El cifrado en reposo protege los datos almacenados para que un disco, una cinta de respaldo o una imagen de disco robados sean ilegibles sin la clave. Las opciones incluyen el cifrado de disco completo o de volumen (BitLocker en Windows, LUKS en Linux), discos con autocifrado que cifran por hardware, el cifrado a nivel de archivos y el cifrado de bases de datos, como el cifrado transparente de datos (TDE). El cifrado es tan fuerte como la gestión de claves: guarda las claves en un TPM, un módulo de seguridad de hardware (HSM) o un servicio de claves administrado, respalda las claves de recuperación de forma segura y separada de los datos, y controla quién puede acceder a ellas.",
   "El cifrado en tránsito protege los datos que cruzan la red contra la interceptación y la manipulación. Usa TLS (Transport Layer Security) para el tráfico web (HTTPS), SSH en lugar de Telnet, SFTP o FTPS en lugar de FTP simple, LDAPS para las consultas al directorio, el cifrado SMB para los recursos compartidos de archivos, y VPN o IPsec para los enlaces entre sitios. Desactiva las versiones antiguas de los protocolos y los cifrados débiles, y administra los certificados para que no caduquen.",
   "La retención de datos define cuánto tiempo deben conservarse los datos y cuándo deben destruirse. Los períodos de retención provienen de leyes, regulaciones, contratos y necesidades del negocio, por ejemplo, conservar los registros financieros durante varios años o eliminar los datos personales cuando ya no se necesitan. Conservar los datos demasiado poco tiempo puede infringir leyes; conservarlos demasiado tiempo aumenta la cantidad expuesta en una filtración y el costo del descubrimiento legal (legal discovery). Las políticas de retención también deben aplicarse a los respaldos y archivos, y una retención legal (legal hold) puede suspender la eliminación de datos involucrados en un litigio.",
   "La ubicación del almacenamiento de datos importa porque los datos están sujetos a las leyes del país donde se almacenan, una idea llamada soberanía de los datos. Algunas regulaciones exigen que ciertos datos permanezcan dentro de una región. Al usar la nube o respaldos fuera del sitio, elige las regiones de forma deliberada y documenta dónde se encuentran las copias.",
   "El acceso físico puede evadir la seguridad del sistema operativo, así que protege el proceso de arranque. Una contraseña de UEFI/BIOS (una contraseña de administrador o de configuración) impide que alguien cambie la configuración del firmware, como desactivar Secure Boot o cambiar el orden de arranque para arrancar desde una memoria USB. Una contraseña de encendido puede exigir una contraseña antes de que el sistema siquiera arranque, aunque rara vez se usa en servidores porque bloquea los reinicios desatendidos. Una contraseña del gestor de arranque, como una contraseña de GRUB en Linux, impide que alguien edite las entradas de arranque al inicio para obtener un shell de root. Combínalas con la desactivación de los dispositivos de arranque sin uso, el cifrado de disco completo y un rack cerrado con llave."
  ],
  "terms": [
   [
    "Encryption at rest (cifrado en reposo)",
    "Cifrar los datos almacenados para que sean ilegibles sin la clave si el medio es robado o copiado."
   ],
   [
    "Encryption in transit (cifrado en tránsito)",
    "Cifrar los datos mientras viajan por las redes, por ejemplo con TLS o SSH."
   ],
   [
    "Data retention policy (política de retención de datos)",
    "Reglas que especifican cuánto tiempo se conservan los datos y cuándo deben destruirse."
   ],
   [
    "Data sovereignty (soberanía de los datos)",
    "El principio de que los datos están sujetos a las leyes del país donde se almacenan físicamente."
   ]
  ],
  "example": "Un disco de respaldo se pierde en tránsito hacia una bóveda fuera del sitio. Como los respaldos estaban cifrados con claves guardadas en el almacén de claves del sistema de respaldos, la empresa documenta el incidente, pero no necesita tratarlo como una filtración de datos.",
  "tip": "En reposo significa almacenado (BitLocker, LUKS, discos con autocifrado); en tránsito significa en movimiento (TLS, SSH, IPsec). Una contraseña de configuración del firmware impide los cambios en el orden de arranque; una contraseña de GRUB impide la edición de las entradas de arranque.",
  "check": [
   [
    "¿Contra qué protege una contraseña de administrador de BIOS/UEFI?",
    "Contra cambios no autorizados en la configuración del firmware, como el orden de arranque o Secure Boot, por parte de alguien con acceso físico."
   ],
   [
    "¿Por qué conservar los datos demasiado tiempo puede ser un riesgo?",
    "Se exponen más datos si hay una filtración, y puede infringir leyes de privacidad o aumentar los costos del descubrimiento legal."
   ]
  ]
 },
 {
  "t": "Physical security: locked racks and cages, mantraps/access vestibules, badge readers, biometrics, cameras, security guards, fire suppression",
  "tt": "Seguridad física: racks y jaulas con llave, mantraps/vestíbulos de acceso, lectores de credenciales, biometría, cámaras, guardias de seguridad, supresión de incendios",
  "body": [
   "Cualquiera que pueda tocar un servidor puede robar un disco, conectar un dispositivo o simplemente apagarlo. La seguridad física protege el hardware y los datos con capas, un enfoque llamado defensa en profundidad: el perímetro del edificio, la entrada al centro de datos, la sala, la jaula y finalmente el rack.",
   "A nivel del rack, las puertas con llave en el frente y en la parte trasera impiden el acceso casual a los discos y puertos. En instalaciones compartidas o de colocation, los clientes rentan jaulas cerradas con llave o suites privadas alrededor de sus racks. Las llaves deben controlarse, o reemplazarse con cerraduras electrónicas que registren cada apertura. Bloquea los puertos sin uso y considera alertas de intrusión en las puertas de los racks para los sistemas sensibles.",
   "La entrada al centro de datos se controla con sistemas de control de acceso. Los lectores de credenciales (tarjetas de proximidad o tarjetas inteligentes) conceden la entrada según la autorización de la persona y registran cada uso. Un mantrap, ahora llamado a menudo vestíbulo de control de acceso (access control vestibule), es un espacio pequeño con dos puertas en el que la segunda puerta solo se abre después de que la primera se ha cerrado; impide el tailgating (seguir a una persona autorizada a través de una puerta) y el piggybacking (que una persona autorizada deje entrar a alguien), y puede retener a alguien hasta confirmar su identidad. Los lectores biométricos usan huellas dactilares, geometría de la mano, reconocimiento de iris o facial; como verifican algo que eres, a menudo se combinan con una credencial (algo que tienes) o un PIN (algo que sabes) para un acceso físico multifactor.",
   "Luego vienen la detección y la disuasión. Las cámaras (CCTV) graban la actividad, disuaden las malas conductas y proporcionan evidencia; colócalas en las entradas, los pasillos y los andenes de carga, y conserva las grabaciones según la política. Los guardias de seguridad pueden verificar identidades, acompañar a los visitantes, responder a las alarmas y aplicar un criterio que los sistemas automatizados no pueden. Los registros de visitantes, las credenciales visiblemente distintas para los invitados y los requisitos de acompañamiento completan el panorama. Los sensores de movimiento y las alarmas de puertas alertan al personal sobre entradas fuera del horario normal.",
   "El fuego es un riesgo físico importante. La detección usa detectores de humo y de calor, a veces sistemas de aspiración de alerta muy temprana que toman muestras del aire. Las opciones de supresión difieren en cómo afectan a los equipos. Los rociadores de agua son eficaces y baratos, pero dañan los equipos electrónicos; los sistemas de preacción (pre-action) mantienen las tuberías secas hasta que un detector se activa, reduciendo las descargas accidentales. Los sistemas de agente limpio (clean agent), como ciertos gases inertes o agentes químicos, apagan incendios sin dejar residuos ni dañar los equipos electrónicos, y son comunes en las salas de servidores. Algunos sistemas de gas reducen el oxígeno, así que el personal debe evacuar cuando suenan las alarmas. Mantén cerca de las salidas extintores portátiles de la clase correcta, adecuados para incendios eléctricos.",
   "Piensa también en los controles ambientales: monitoreo de temperatura y humedad, sensores de fugas de agua debajo de los pisos elevados e interruptores de apagado de emergencia protegidos contra el uso accidental."
  ],
  "terms": [
   [
    "Access control vestibule (mantrap) (vestíbulo de control de acceso)",
    "Un espacio de entrada con dos puertas en el que solo una puerta puede abrirse a la vez, lo que impide el tailgating."
   ],
   [
    "Tailgating",
    "Seguir a una persona autorizada a través de una puerta segura sin autenticarse."
   ],
   [
    "Biometrics (biometría)",
    "Autenticación basada en características físicas, como las huellas dactilares o los patrones del iris."
   ],
   [
    "Clean agent suppression (supresión con agente limpio)",
    "Supresión de incendios que usa gases que extinguen el fuego sin daños por agua ni residuos en los equipos."
   ]
  ],
  "example": "Un visitante intenta seguir a un ingeniero al centro de datos. El vestíbulo de control de acceso no abre la puerta interior mientras haya dos personas dentro, la cámara graba el intento y el guardia acompaña al visitante de regreso a la recepción para que se registre.",
  "tip": "Los mantraps/vestíbulos impiden el tailgating. Los sistemas de preacción y de agente limpio son los preferidos donde deben protegerse los equipos electrónicos; los rociadores estándar de tubería húmeda implican riesgo de daños por agua.",
  "check": [
   [
    "¿Qué control derrota específicamente el tailgating?",
    "Un vestíbulo de control de acceso (mantrap), porque solo se abre una puerta a la vez."
   ],
   [
    "¿Por qué los sistemas de agente limpio son comunes en las salas de servidores?",
    "Extinguen los incendios sin agua ni residuos, así que la supresión en sí no daña los equipos."
   ]
  ]
 },
 {
  "t": "Identity and access management: least privilege, role-based access, groups, MFA, SSO, account lockout, password policies, service accounts, auditing",
  "tt": "Gestión de identidades y accesos: mínimo privilegio, acceso basado en roles, grupos, MFA, SSO, bloqueo de cuentas, políticas de contraseñas, cuentas de servicio, auditoría",
  "body": [
   "La gestión de identidades y accesos (IAM) decide quién puede iniciar sesión en un servidor y qué puede hacer una vez dentro. La mayoría de las filtraciones involucran credenciales mal usadas o robadas, así que IAM es uno de los controles de seguridad más importantes que administra un administrador.",
   "El mínimo privilegio significa dar a cada usuario, servicio y proceso solo los permisos necesarios para hacer su trabajo, y nada más. Los administradores deben usar una cuenta normal para el correo electrónico y la navegación y una cuenta privilegiada separada para las tareas administrativas, idealmente elevando privilegios solo cuando sea necesario. Revisa los permisos con regularidad, porque las personas cambian de puesto y conservan accesos antiguos, un problema llamado acumulación de privilegios (privilege creep).",
   "Asignar permisos a personas individuales no escala. El control de acceso basado en roles (RBAC) define roles como mesa de ayuda, administrador de bases de datos u operador de respaldos, concede permisos a esos roles y coloca a las personas en los roles. Los grupos implementan esto: concedes un permiso sobre una carpeta a un grupo y luego agregas o quitas usuarios del grupo. Cuando alguien cambia de departamento, cambias sus membresías de grupo en lugar de buscar entre cientos de permisos individuales.",
   "La autenticación demuestra la identidad. La MFA (autenticación multifactor) requiere dos o más tipos de factores distintos: algo que sabes (contraseña o PIN), algo que tienes (token, tarjeta inteligente o aplicación del teléfono) y algo que eres (biometría). Dos contraseñas no son MFA porque son del mismo tipo de factor. Exige MFA para el acceso remoto y para todas las cuentas administrativas. El SSO (inicio de sesión único) permite que un usuario se autentique una vez y acceda a muchos sistemas, a menudo usando Kerberos dentro de un dominio o protocolos de federación como SAML y OpenID Connect para las aplicaciones web. El SSO mejora la usabilidad y centraliza el control, pero hace que esa única identidad sea muy valiosa, así que combínalo con MFA.",
   "Las políticas de contraseñas establecen reglas como la longitud mínima, la complejidad, el historial (impedir la reutilización) y, en algunas organizaciones, la caducidad; las recomendaciones actuales favorecen las frases de contraseña largas y la verificación contra contraseñas filtradas conocidas por encima de los cambios forzados frecuentes. El bloqueo de cuentas desactiva una cuenta durante un período después de cierto número de inicios de sesión fallidos, lo que ralentiza los ataques de adivinación de contraseñas. Establece el umbral con cuidado, porque un valor muy bajo permite que un atacante bloquee a propósito a los usuarios reales.",
   "Las cuentas de servicio son cuentas que usan las aplicaciones y los servicios para ejecutarse, como un motor de base de datos o un agente de respaldos. Dale a cada servicio su propia cuenta con derechos mínimos, niega el inicio de sesión interactivo, usa contraseñas largas y aleatorias o cuentas de servicio administradas que rotan las contraseñas automáticamente, y documenta sus responsables. Nunca ejecutes servicios como administrador del dominio.",
   "La auditoría registra quién hizo qué. Habilita el registro de los inicios de sesión, los inicios de sesión fallidos, el uso de privilegios y los cambios en cuentas y grupos, envía los logs a un sistema central y revísalos. Las auditorías también incluyen revisiones periódicas de accesos en las que los gerentes confirman que cada persona todavía necesita sus accesos."
  ],
  "terms": [
   [
    "Least privilege (mínimo privilegio)",
    "Conceder solo los permisos mínimos necesarios para realizar una tarea."
   ],
   [
    "RBAC (role-based access control) (control de acceso basado en roles)",
    "Asignar permisos a roles y colocar a los usuarios en roles en lugar de conceder derechos de forma individual."
   ],
   [
    "MFA (autenticación multifactor)",
    "Multifactor authentication: exigir dos o más tipos distintos de factores de autenticación."
   ],
   [
    "Service account (cuenta de servicio)",
    "Una cuenta no humana que usa una aplicación o un servicio para ejecutarse y acceder a recursos."
   ]
  ],
  "example": "Una aplicación de respaldos se instaló usando una cuenta de administrador del dominio. Durante una revisión, el administrador crea una cuenta de servicio administrada dedicada con solo derechos de operador de respaldos, le niega el inicio de sesión interactivo y cambia el servicio de respaldos para que la use.",
  "tip": "La MFA debe combinar tipos de factores distintos; una contraseña más un PIN sigue siendo de un solo factor. Concede permisos a grupos, no a personas, y dale a las cuentas de servicio sus propias identidades con mínimo privilegio.",
  "check": [
   [
    "¿Una contraseña más una pregunta de seguridad es multifactor?",
    "No. Ambas son algo que sabes, así que es de un solo factor."
   ],
   [
    "¿Qué riesgo implica establecer un umbral de bloqueo de cuentas muy bajo?",
    "Los atacantes o los errores pueden bloquear fácilmente a los usuarios legítimos, causando una denegación de servicio."
   ],
   [
    "¿Por qué asignar permisos a grupos en lugar de a usuarios?",
    "Escala, es más fácil de auditar y te permite cambiar el acceso cambiando la membresía del grupo."
   ]
  ]
 },
 {
  "t": "Data security risks: data loss, unencrypted media, insider threats, malware and ransomware; mitigation with DLP, patching and segmentation",
  "tt": "Riesgos para la seguridad de los datos: pérdida de datos, medios sin cifrar, amenazas internas, malware y ransomware; mitigación con DLP, parches y segmentación",
  "body": [
   "Para proteger los datos del servidor primero tienes que reconocer cómo se pierden, se roban o se destruyen. Server+ agrupa los riesgos comunes y te pide relacionar cada uno con mitigaciones sensatas.",
   "La pérdida de datos puede ser accidental: un arreglo que falla sin respaldo, un administrador que borra la carpeta equivocada, una base de datos corrupta o un desastre que destruye el edificio. También puede ser una fuga, en la que los datos terminan donde no deberían, como una hoja de cálculo con registros de clientes enviada por correo a una cuenta personal. Los medios sin cifrar son un caso especial: laptops, unidades USB, cintas de respaldo y discos retirados que salen del edificio con datos legibles. Un solo respaldo sin cifrar que se pierda puede exponer todo lo que contiene.",
   "Las amenazas internas provienen de personas con acceso legítimo: empleados, contratistas o socios. Algunas son malintencionadas, roban datos o sabotean sistemas, a menudo en la época en que renuncian o son despedidas. Otras son descuidadas, caen en el phishing o configuran mal un recurso compartido. Los internos son difíciles de detectar porque su acceso parece normal, así que los controles se centran en el mínimo privilegio, la separación de funciones, el monitoreo de actividad inusual y la eliminación inmediata de los accesos cuando las personas se van.",
   "El malware es software malicioso: virus, gusanos, troyanos, spyware y rootkits. El ransomware es malware que cifra archivos y exige un pago por la clave; muchos grupos también roban los datos primero y amenazan con publicarlos. El ransomware a menudo entra mediante phishing, servicios de escritorio remoto expuestos con contraseñas débiles o sistemas expuestos a internet sin parches, y luego se propaga lateralmente por la red usando credenciales robadas. Las señales incluyen cambios masivos de nombres de archivos con nuevas extensiones, notas de rescate que aparecen en las carpetas, picos de actividad en disco y la eliminación de respaldos.",
   "Las mitigaciones funcionan en capas. Las herramientas DLP (prevención de pérdida de datos) identifican datos sensibles, como números de tarjetas o expedientes médicos, y bloquean o alertan cuando se copian a unidades USB, se suben o se envían por correo fuera de la política. El cifrado en reposo protege los medios que se extravían. Los parches cierran las vulnerabilidades que usa el malware, así que mantén actualizados el sistema operativo, las aplicaciones y el firmware. La segmentación de red divide la red en zonas con firewalls o VLAN entre ellas, para que una estación de trabajo comprometida no pueda llegar directamente a los servidores de bases de datos ni a las interfaces de administración; esto limita hasta dónde puede propagarse el ransomware. La protección de endpoints o EDR detecta comportamientos maliciosos, y las listas de aplicaciones permitidas (allow-listing) bloquean los programas desconocidos.",
   "Los respaldos son la última línea de defensa contra el ransomware y la pérdida de datos. Mantén al menos una copia fuera de línea o inmutable (que no puede cambiarse durante un período establecido) para que los atacantes no puedan cifrarla ni eliminarla, protege las credenciales de los respaldos por separado y prueba las restauraciones con regularidad. Combina estos controles técnicos con la capacitación de los usuarios y un plan de respuesta a incidentes practicado."
  ],
  "terms": [
   [
    "DLP (data loss prevention) (prevención de pérdida de datos)",
    "Herramientas y políticas que detectan e impiden que los datos sensibles salgan de las ubicaciones autorizadas."
   ],
   [
    "Ransomware",
    "Malware que cifra los datos y exige un pago, y que a menudo también roba datos para extorsionar."
   ],
   [
    "Insider threat (amenaza interna)",
    "El riesgo que representan las personas con acceso legítimo que lo usan mal, de forma malintencionada o descuidada."
   ],
   [
    "Network segmentation (segmentación de red)",
    "Dividir una red en zonas aisladas para limitar el acceso y la propagación de los ataques."
   ]
  ],
  "example": "Un ransomware cifra los recursos compartidos de un servidor de archivos después de que un usuario abre un archivo adjunto de phishing. Como los servidores están en un segmento separado que bloquea el acceso de las estaciones de trabajo a los puertos de administración, los servidores de bases de datos quedan intactos, y el servidor de archivos se restaura a partir de respaldos inmutables tomados la noche anterior.",
  "tip": "Relaciona el riesgo con el control: la fuga de datos sensibles apunta a DLP, los medios perdidos al cifrado, las vulnerabilidades conocidas a los parches, la propagación lateral a la segmentación y la recuperación del ransomware a los respaldos fuera de línea o inmutables.",
  "check": [
   [
    "¿Qué control impediría que un empleado copie números de tarjetas de clientes a una unidad USB?",
    "DLP, que detecta datos sensibles y bloquea las transferencias que violan la política."
   ],
   [
    "¿Cómo reduce la segmentación el daño del ransomware?",
    "Restringe los sistemas a los que puede llegar una máquina comprometida, limitando la propagación lateral."
   ]
  ]
 },
 {
  "t": "Server hardening: disable unused services and ports, remove unneeded software, OS and firmware patching, host firewall, antivirus/EDR, secure admin protocols",
  "tt": "Refuerzo de servidores (hardening): desactivar servicios y puertos sin uso, eliminar software innecesario, parches del sistema operativo y del firmware, firewall del host, antivirus/EDR, protocolos de administración seguros",
  "body": [
   "El refuerzo (hardening) consiste en reducir la superficie de ataque de un servidor, es decir, el conjunto total de formas en que un atacante podría interactuar con él. Cada servicio en ejecución, puerto abierto, paquete instalado y cuenta predeterminada es un posible punto de entrada. Un servidor reforzado ejecuta solo lo que su rol requiere, se mantiene actualizado y se administra de forma segura.",
   "Empieza por los servicios y los puertos. Enumera lo que se está ejecutando y escuchando, usando `ss -tulpn` o `systemctl list-units --type=service` en Linux y `Get-Service` o `netstat -ano` en Windows, y luego desactiva todo lo que el rol no necesite, como la cola de impresión en un servidor de base de datos o un servidor web instalado de forma predeterminada. Cerrar un puerto sin detener el servicio no es suficiente; detén y desactiva el servicio para que no regrese después de un reinicio.",
   "Elimina el software innecesario. Cada aplicación adicional, archivo de ejemplo, herramienta de desarrollo o agente de administración agrega código al que hay que aplicarle parches. Las instalaciones mínimas, como Server Core o una compilación de Linux sin interfaz, ayudan desde el principio. Elimina o desactiva también las cuentas predeterminadas y de invitado, renombra o protege las cuentas de administrador integradas y cambia todas las contraseñas predeterminadas, incluidas las de los BMC y los appliances.",
   "Los parches mantienen cerradas las vulnerabilidades conocidas. Aplica las actualizaciones del sistema operativo, de las aplicaciones y del firmware del BIOS/UEFI, el BMC, las controladoras RAID y las NIC. Usa un proceso de gestión de parches: da seguimiento a las publicaciones de los fabricantes, prueba los parches en sistemas que no son de producción, impleméntalos en ventanas programadas mediante la gestión de cambios, verifica y reporta el cumplimiento. Prioriza las vulnerabilidades críticas y las que se están explotando activamente. Los servicios expuestos a internet sin parches son una de las formas más comunes en que se vulneran los servidores.",
   "Activa el firewall basado en host, como Windows Defender Firewall o `firewalld`, `ufw` o `nftables` en Linux, aunque exista un firewall de red. Usa una política de denegación predeterminada para el tráfico entrante, permite solo los puertos que el rol necesita y restringe los puertos de administración a las redes administrativas. Esto limita el movimiento lateral si otra máquina de la misma red es comprometida.",
   "Instala un antivirus o, cada vez más, un EDR (detección y respuesta de endpoints). El antivirus tradicional compara los archivos con firmas conocidas; el EDR además vigila comportamientos como lanzamientos de procesos inusuales, volcado de credenciales o cifrado masivo de archivos, puede aislar un host y registra la actividad para la investigación. Configura con cuidado las exclusiones para las bases de datos y el software de respaldos, de modo que el escaneo no afecte el rendimiento, sin dejar puntos ciegos.",
   "Por último, administra de forma segura. Usa SSH en lugar de Telnet, HTTPS en lugar de HTTP para las consolas web, SFTP en lugar de FTP, y RDP con Network Level Authentication a través de una VPN o una puerta de enlace en lugar de exponerlo a internet. Prefiere los inicios de sesión SSH basados en claves, desactiva el inicio de sesión directo como root y usa servidores de salto (jump hosts). Las líneas base de seguridad, como los CIS Benchmarks o las guías de los fabricantes, ofrecen listas de verificación, y las herramientas de gestión de la configuración pueden aplicarlas y auditarlas."
  ],
  "terms": [
   [
    "Attack surface (superficie de ataque)",
    "Todos los puntos en los que un atacante podría interactuar con un sistema o entrar en él."
   ],
   [
    "Host-based firewall (firewall basado en host)",
    "Un firewall que se ejecuta en el propio servidor y filtra su tráfico entrante y saliente."
   ],
   [
    "EDR",
    "Endpoint detection and response (detección y respuesta de endpoints): software de seguridad que monitorea el comportamiento del host, detecta amenazas y apoya la respuesta."
   ],
   [
    "Security baseline (línea base de seguridad)",
    "Un conjunto documentado de configuraciones de refuerzo que los sistemas deben cumplir."
   ]
  ],
  "example": "Al reforzar un nuevo servidor web Linux, el administrador elimina el servidor FTP y los compiladores instalados, desactiva los inicios de sesión SSH con contraseña en favor de las claves, configura `firewalld` para permitir solo el 443 desde cualquier lugar y el 22 desde la subred de administración, actualiza el firmware del BIOS y del BMC, e instala el agente EDR de la organización.",
  "tip": "Las respuestas sobre hardening normalmente implican eliminar o desactivar algo: servicios, software, cuentas y puertos sin uso. Reemplaza los protocolos de administración en texto plano (Telnet, FTP, HTTP) por protocolos cifrados (SSH, SFTP, HTTPS).",
  "check": [
   [
    "¿Por qué detener y desactivar un servicio sin uso en lugar de solo bloquear su puerto?",
    "El servicio sigue siendo un componente vulnerable que requiere parches, y un cambio en el firewall podría volver a exponerlo; eliminarlo reduce la superficie de ataque."
   ],
   [
    "¿Qué agrega el EDR además del antivirus basado en firmas?",
    "Monitoreo del comportamiento, detección de amenazas desconocidas, aislamiento del host y registro forense."
   ]
  ]
 },
 {
  "t": "Decommissioning and media destruction: wiping, degaussing, shredding, crushing, certificates of destruction, asset records",
  "tt": "Retiro de equipos y destrucción de medios: borrado seguro, desmagnetización, trituración, aplastamiento, certificados de destrucción, registros de activos",
  "body": [
   "Todo servidor llega tarde o temprano al final de su vida útil. Retirarlo de forma segura significa detener sus servicios limpiamente, asegurarse de que ningún dato salga legible del edificio y cerrar sus registros. Los discos antiguos vendidos o reciclados sin una sanitización adecuada son una fuente muy conocida de filtraciones de datos.",
   "El retiro comienza con la planificación mediante la gestión de cambios. Confirma que los servicios del servidor se hayan migrado o dado de baja, notifica a las partes interesadas, retíralo del monitoreo, los respaldos, el DNS, los balanceadores de carga y el directorio, archiva los datos que exijan las políticas de retención y revoca sus certificados y cuentas de servicio. Solo entonces apágalo y retíralo del rack, actualizando los diagramas y los registros de cableado.",
   "La sanitización de medios hace que los datos sean irrecuperables. El método correcto depende del tipo de medio y de si quieres reutilizarlo. Simplemente borrar archivos o formatear un disco no elimina los datos; solo elimina los punteros, y las herramientas de recuperación a menudo pueden restaurarlos.",
   "El borrado seguro (wiping, o sobrescritura) escribe patrones sobre cada sector de un disco duro para que los datos antiguos no puedan leerse, y el disco puede reutilizarse. Usa herramientas que verifiquen la sobrescritura. Los SSD son diferentes: debido a la nivelación de desgaste (wear leveling) y a los bloques de reserva, la sobrescritura puede pasar por alto datos, así que usa el comando de borrado seguro (secure erase) o sanitize integrado en el disco, o el borrado criptográfico (crypto-erase) en los discos con autocifrado, que destruye la clave de cifrado y deja los datos ilegibles. La desmagnetización (degaussing) expone los medios magnéticos, como los discos duros y las cintas, a un campo magnético fuerte que desordena los datos; también destruye la información servo de fábrica del disco, por lo que el disco no puede reutilizarse, y no tiene ningún efecto sobre los SSD ni los medios ópticos.",
   "La destrucción física es el método más seguro. La trituración corta los discos en pedazos pequeños con una trituradora industrial; el aplastamiento o la perforación deforman los platos y las placas de circuitos para que no puedan girar ni leerse. También se usan la incineración y la pulverización. Muchas organizaciones usan un servicio de destrucción externo certificado, ya sea en sitio (tú presencias la trituración) o fuera del sitio con una cadena de custodia documentada.",
   "La documentación demuestra que lo hiciste bien. Un certificado de destrucción del proveedor enumera los números de serie de los medios destruidos, el método, la fecha y el responsable. Actualiza los registros de activos para mostrar cada dispositivo como eliminado, incluido el método y la referencia del certificado, para que las auditorías puedan rastrear cada disco desde la compra hasta la destrucción. Encárgate también de las licencias (reasígnalas o dalas de baja) y del reciclaje ambientalmente responsable del hardware restante, siguiendo las regulaciones locales sobre residuos electrónicos.",
   "Elige el método según la sensibilidad de los datos y la política: borrado seguro o crypto-erase para reutilizar dentro de la organización, desmagnetización o destrucción para datos muy sensibles o discos que saldrán de tu control."
  ],
  "terms": [
   [
    "Wiping (borrado seguro)",
    "Sobrescribir todos los sectores de un medio de almacenamiento para que los datos anteriores no puedan recuperarse, lo que permite reutilizarlo."
   ],
   [
    "Degaussing (desmagnetización)",
    "Borrar medios magnéticos con un campo magnético fuerte, lo que deja inutilizables los discos duros; no es eficaz en los SSD."
   ],
   [
    "Crypto-erase (borrado criptográfico)",
    "Sanitizar un disco con autocifrado destruyendo su clave de cifrado."
   ],
   [
    "Certificate of destruction (certificado de destrucción)",
    "Un documento que confirma qué medios se destruyeron, cómo, cuándo y por quién."
   ]
  ],
  "example": "Un hospital retira cuarenta servidores. Los discos se extraen y se registran por número de serie, un proveedor de trituración los destruye en sitio mientras el personal observa, y el proveedor emite un certificado de destrucción que se adjunta al registro de cada activo en la CMDB.",
  "tip": "La desmagnetización solo funciona en medios magnéticos, nunca en SSD. Formatear no es sanitizar. Para los SSD usa secure erase, crypto-erase o destrucción física, y conserva siempre un certificado de destrucción.",
  "check": [
   [
    "¿Por qué la desmagnetización es inútil para un SSD?",
    "Los SSD almacenan los datos en celdas de memoria flash, no en dominios magnéticos, así que un campo magnético no los borra."
   ],
   [
    "¿Qué le demuestra a un auditor que los discos se destruyeron correctamente?",
    "Un certificado de destrucción que enumera los números de serie, el método y la fecha, vinculado a los registros de activos actualizados."
   ]
  ]
 },
 {
  "t": "Backup types: full, incremental, differential, synthetic full, snapshot; backup media and rotation (grandfather-father-son), 3-2-1 rule",
  "tt": "Tipos de respaldo: completo, incremental, diferencial, completo sintético, snapshot; medios de respaldo y rotación (abuelo-padre-hijo), regla 3-2-1",
  "body": [
   "Los respaldos son copias de los datos que te permiten recuperarte de borrados, corrupción, fallas de hardware, ransomware y desastres. Server+ evalúa los tipos de respaldo, cómo afectan el tiempo de respaldo y el tiempo de restauración, los medios utilizados y los esquemas de rotación que deciden cuánto tiempo se conservan las copias.",
   "Un respaldo completo (full) copia todos los datos seleccionados cada vez. Es el más sencillo de restaurar, porque solo necesitas un conjunto, pero es el que más tarda en ejecutarse y el que más espacio usa. El software de respaldo lleva el control de qué archivos han cambiado, tradicionalmente con el bit de archivo (archive bit) en los archivos de Windows o con el seguimiento de cambios en el sistema de archivos o en el hipervisor.",
   "Un respaldo incremental copia solo los datos que cambiaron desde el último respaldo de cualquier tipo, completo o incremental, y luego marca esos archivos como respaldados. Los incrementales son rápidos y pequeños. La desventaja aparece al restaurar: necesitas el último respaldo completo más cada incremental desde entonces, en orden. Si falta o está dañado un incremental de la cadena, pueden perderse los datos posteriores.",
   "Un respaldo diferencial copia todo lo que cambió desde el último respaldo completo, y no restablece los marcadores de cambio. Cada diferencial crece a lo largo de la semana, pero restaurar solo necesita dos conjuntos: el último completo más el diferencial más reciente. Así, los incrementales son más rápidos para respaldar y más lentos para restaurar; los diferenciales son más lentos para respaldar y más rápidos para restaurar.",
   "Un respaldo completo sintético (synthetic full) lo construye el servidor de respaldos a partir de un respaldo completo anterior más los incrementales posteriores, sin volver a leer todos los datos del servidor de producción. Obtienes la restauración rápida de un respaldo completo sin la carga de tomarlo. Un snapshot captura el estado de un volumen, una VM o un arreglo de almacenamiento en un instante, normalmente en segundos, usando técnicas de copy-on-write o redirect-on-write. Los snapshots son excelentes para revertir rápidamente y como fuente consistente para los trabajos de respaldo, pero normalmente residen en el mismo almacenamiento que el original, así que no protegen contra la pérdida de ese almacenamiento.",
   "Los medios de respaldo incluyen el disco (rápido, a menudo el primer destino), la cinta (económica por terabyte, portátil y naturalmente fuera de línea, todavía usada para copias a largo plazo y fuera del sitio) y el almacenamiento en la nube o de objetos (fuera del sitio por diseño). Los esquemas de rotación reutilizan los medios según un calendario. Abuelo-padre-hijo (GFS) conserva los respaldos diarios (hijos) durante aproximadamente una semana, los semanales (padres) durante aproximadamente un mes y los mensuales (abuelos) durante un año o más, lo que da muchos puntos de restauración con un número limitado de cintas o discos.",
   "La regla 3-2-1 es una guía muy utilizada: conserva al menos tres copias de tus datos (producción más dos respaldos), en dos tipos distintos de medios o almacenamiento, con una copia fuera del sitio. Muchas organizaciones la amplían con una copia fuera de línea o inmutable y cero errores después de restauraciones de prueba verificadas, para defenderse del ransomware."
  ],
  "terms": [
   [
    "Incremental backup (respaldo incremental)",
    "Copia los datos que cambiaron desde el último respaldo de cualquier tipo; las restauraciones necesitan el completo más cada incremental posterior."
   ],
   [
    "Differential backup (respaldo diferencial)",
    "Copia los datos que cambiaron desde el último respaldo completo; las restauraciones necesitan el completo más el diferencial más reciente."
   ],
   [
    "Synthetic full (completo sintético)",
    "Un respaldo completo que se arma en el servidor de respaldos a partir de un completo anterior y los incrementales posteriores."
   ],
   [
    "Grandfather-father-son (GFS) (abuelo-padre-hijo)",
    "Un esquema de rotación que conserva conjuntos de respaldo diarios, semanales y mensuales durante distintos períodos de retención."
   ]
  ],
  "example": "Un servidor recibe un respaldo completo el domingo e incrementales de lunes a sábado. Cuando falla el jueves por la tarde, el administrador restaura el completo del domingo y luego los incrementales del lunes, martes y miércoles, en orden. Con diferenciales, solo se necesitarían el completo del domingo y el diferencial del miércoles.",
  "tip": "Incremental: el respaldo más rápido, la restauración más lenta (completo + todos los incrementales). Diferencial: respaldo más lento, restauración más rápida (completo + último diferencial). 3-2-1 significa tres copias, dos tipos de medios, una fuera del sitio.",
  "check": [
   [
    "Respaldo completo el domingo, diferenciales diarios; falla el viernes por la mañana. ¿Qué conjuntos restauras?",
    "El respaldo completo del domingo y el diferencial del jueves."
   ],
   [
    "¿Por qué un snapshot de almacenamiento no es un respaldo completo?",
    "Normalmente depende del mismo almacenamiento subyacente, así que si ese almacenamiento falla, el snapshot también se pierde."
   ],
   [
    "¿Qué exige la regla 3-2-1?",
    "Tres copias de los datos, en dos tipos distintos de medios, con una copia almacenada fuera del sitio."
   ]
  ]
 },
 {
  "t": "Backup operations: frequency, retention, on-site vs off-site storage, integrity checks, test restores",
  "tt": "Operaciones de respaldo: frecuencia, retención, almacenamiento en sitio vs. fuera del sitio, verificaciones de integridad, restauraciones de prueba",
  "body": [
   "Elegir los tipos de respaldo es solo el comienzo. Las operaciones de respaldo son las decisiones y rutinas diarias que hacen que los respaldos realmente sirvan cuando se necesitan: con qué frecuencia se ejecutan, cuánto tiempo se conservan, dónde se almacenan y cómo demuestras que funcionan.",
   "La frecuencia de los respaldos depende de cuántos datos puede permitirse perder el negocio, lo que se llama RPO (objetivo de punto de recuperación). Si el RPO de una base de datos de pedidos es de 15 minutos, un respaldo nocturno no basta; necesitas respaldos frecuentes del log de transacciones, snapshots o replicación. Un recurso compartido de archivos que cambia lentamente puede necesitar solo un trabajo nocturno. Programa los respaldos en ventanas que eviten la carga pesada de producción, y vigila que los trabajos terminen antes de que empiece el siguiente. Los respaldos con reconocimiento de aplicaciones (application-aware), que usan servicios como el Servicio de instantáneas de volumen de Windows (Volume Shadow Copy Service) o las APIs de respaldo de las bases de datos, garantizan que las bases de datos se capturen en un estado consistente.",
   "La retención es cuánto tiempo se conserva cada respaldo. La establecen los requisitos legales y regulatorios, las necesidades del negocio y el costo del almacenamiento, y a menudo es escalonada: los respaldos diarios se conservan durante semanas, los mensuales durante un año, los anuales durante varios años. Las políticas de retención deben coincidir con la política de retención de datos de la organización, y los respaldos vencidos deben eliminarse de forma segura. Un período de retención demasiado corto puede dejarte sin una copia limpia si la corrupción o el ransomware pasaron desapercibidos durante semanas.",
   "Los respaldos en sitio, almacenados en el mismo edificio, se restauran rápidamente y son prácticos para los errores cotidianos, como un archivo borrado. Los respaldos fuera del sitio protegen contra desastres que afectan a todo el sitio, como incendios, inundaciones o robos. Fuera del sitio puede significar cintas llevadas a una bóveda segura, replicación a otro centro de datos o copias en almacenamiento en la nube. Las copias fuera del sitio tardan más en recuperarse, así que la mayoría de las organizaciones conservan ambas. Protege los medios fuera del sitio con cifrado y dales seguimiento con una cadena de custodia.",
   "Un respaldo que no se ha verificado es una esperanza, no un plan. Las verificaciones de integridad confirman que el respaldo se escribió correctamente: logs de los trabajos y alertas que reportan éxito o falla, sumas de verificación (checksums) o hashes que comparan los datos almacenados con el origen, y pasadas de verificación que vuelven a leer el respaldo después de escribirlo. Revisa todos los días los trabajos fallidos y los parcialmente exitosos.",
   "Las restauraciones de prueba son la única prueba real. Restaura con regularidad archivos individuales, servidores completos y datos de aplicaciones, idealmente en un entorno de pruebas aislado, y confirma que la aplicación realmente funcione y que los datos estén completos. Mide el tiempo de la restauración para ver si cumple con el RTO (objetivo de tiempo de recuperación). Documenta el procedimiento para que cualquier persona del equipo pueda seguirlo durante una crisis, e incluye las restauraciones en los ejercicios de recuperación ante desastres. Muchas organizaciones solo descubren bases de datos faltantes, claves de cifrado vencidas o cintas dañadas durante una emergencia real porque nunca hicieron pruebas."
  ],
  "terms": [
   [
    "Retention period (período de retención)",
    "Cuánto tiempo se conserva una copia de respaldo antes de que venza y se elimine."
   ],
   [
    "Off-site backup (respaldo fuera del sitio)",
    "Una copia de respaldo almacenada en una ubicación diferente para sobrevivir a desastres que afectan a todo el sitio."
   ],
   [
    "Test restore (restauración de prueba)",
    "Restaurar datos desde un respaldo para verificar que el respaldo esté completo y sea utilizable."
   ],
   [
    "Application-aware backup (respaldo con reconocimiento de aplicaciones)",
    "Un respaldo que se coordina con una aplicación para que sus datos se capturen en un estado consistente."
   ]
  ],
  "example": "Durante una restauración de prueba trimestral, un administrador descubre que el trabajo de respaldo llevaba dos meses omitiendo una nueva base de datos porque se agregó en un volumen distinto. El equipo corrige la selección del trabajo y agrega una alerta para los volúmenes sin protección, mucho antes de que una falla real expusiera el hueco.",
  "tip": "La única forma de saber que los respaldos funcionan es una restauración de prueba. Fuera del sitio protege contra desastres del sitio; en sitio acelera la recuperación cotidiana. La frecuencia sigue al RPO, y la velocidad de restauración debe cumplir con el RTO.",
  "check": [
   [
    "¿Qué determina con qué frecuencia deben ejecutarse los respaldos?",
    "El objetivo de punto de recuperación: cuánta pérdida de datos, medida en tiempo, puede tolerar el negocio."
   ],
   [
    "¿Por qué no bastan los logs de trabajos de respaldo exitosos?",
    "Un trabajo puede reportar éxito aunque le falten datos o produzca medios ilegibles; solo las restauraciones de prueba demuestran que la recuperación es posible."
   ]
  ]
 },
 {
  "t": "Disaster recovery: hot, warm and cold sites, cloud DR, replication (synchronous vs asynchronous), RPO and RTO, DR plan testing (tabletop, live failover)",
  "tt": "Recuperación ante desastres: sitios calientes, templados y fríos, DR en la nube, replicación (síncrona vs. asíncrona), RPO y RTO, pruebas del plan de DR (ejercicio de mesa, failover en vivo)",
  "body": [
   "La recuperación ante desastres (DR) es el conjunto de planes y tecnología que se usa para restaurar los servicios de TI después de un evento grave, como un incendio, una inundación, un corte de energía prolongado, un ciberataque o una interrupción regional. Mientras que los respaldos restauran datos, la DR restaura servicios completos, a menudo en otra ubicación.",
   "Dos mediciones guían toda decisión de DR. El RPO (objetivo de punto de recuperación) es la pérdida de datos máxima aceptable, medida hacia atrás en el tiempo desde el desastre: un RPO de una hora significa que debes poder recuperar los datos tal como estaban no más de una hora antes. El RTO (objetivo de tiempo de recuperación) es el tiempo máximo aceptable para restaurar el servicio después del desastre. Los valores más bajos de RPO y RTO cuestan más, así que se establecen por servicio según el impacto en el negocio.",
   "Los sitios de recuperación difieren en su nivel de preparación y costo. Un sitio caliente (hot site) es una instalación totalmente equipada con hardware, conexiones de red y datos actuales, a menudo replicados de forma continua, lista para tomar el control en minutos u horas. Es el más caro. Un sitio templado (warm site) tiene energía, red y parte o todo el hardware, pero los datos y los sistemas deben restaurarse o actualizarse antes de usarlo, así que la recuperación tarda de horas a días. Un sitio frío (cold site) es un espacio con energía y enfriamiento pero con poco o ningún equipo; debes enviar el hardware, instalarlo y restaurar, lo que tarda de días a semanas. Es el más barato.",
   "La DR en la nube usa a un proveedor de nube como sitio de recuperación. Los datos y las imágenes de VM se replican a la nube, y los servidores se inician allí solo cuando se necesitan, así que pagas principalmente por el almacenamiento hasta que ocurre un desastre. Esto puede dar una recuperación parecida a la de un sitio caliente a un costo menor, pero debes planificar la red, los cambios de DNS, las licencias y el ancho de banda para regresar (failback) después.",
   "La replicación mantiene una copia de los datos en otro sitio. La replicación síncrona escribe los datos en ambos sitios antes de confirmar la escritura a la aplicación, así que la copia siempre está actualizada y el RPO es prácticamente cero. El costo es la latencia: cada escritura espera al sitio remoto, así que solo es práctica a distancias cortas con enlaces rápidos. La replicación asíncrona confirma las escrituras localmente y las envía al sitio remoto poco después. Funciona a largas distancias y con enlaces más lentos, pero las escrituras recientes pueden perderse en un desastre, así que el RPO es pequeño pero no cero.",
   "Un plan de DR documenta quién declara un desastre, las listas de contactos, las prioridades, los procedimientos de recuperación paso a paso y cómo volver a la normalidad. Los planes deben probarse. Un ejercicio de mesa (tabletop) es un repaso basado en la discusión, en el que el equipo analiza un escenario para encontrar huecos sin tocar los sistemas. Un recorrido (walkthrough) o una simulación van más allá, y una prueba en paralelo levanta los sistemas en el sitio de DR sin detener la producción. Un failover en vivo (completo) realmente traslada la producción al sitio de DR; es el más realista y el más disruptivo. Actualiza el plan después de cada prueba y de cada cambio significativo."
  ],
  "terms": [
   [
    "RPO",
    "Recovery point objective (objetivo de punto de recuperación): la cantidad máxima aceptable de pérdida de datos, medida en tiempo."
   ],
   [
    "RTO",
    "Recovery time objective (objetivo de tiempo de recuperación): el tiempo máximo aceptable para restaurar un servicio."
   ],
   [
    "Hot site (sitio caliente)",
    "Un sitio de recuperación totalmente equipado con datos actuales, listo para tomar el control rápidamente."
   ],
   [
    "Synchronous replication (replicación síncrona)",
    "Replicación que confirma una escritura solo después de que ambos sitios la tienen, lo que da una pérdida de datos casi nula a costa de la latencia."
   ]
  ],
  "example": "Un banco replica su base de datos principal de forma síncrona a un segundo centro de datos al otro lado de la ciudad (RPO cercano a cero) y de forma asíncrona a una región de nube a cientos de kilómetros. Un failover en vivo anual al sitio cercano confirma que puede reanudar las transacciones dentro de su RTO de 30 minutos.",
  "tip": "El RPO trata de la pérdida de datos (qué tan atrás), el RTO trata del tiempo de inactividad (cuánto tiempo). El sitio caliente es el más rápido y costoso, el frío el más lento y barato. Síncrono significa cero pérdida de datos pero distancias cortas; asíncrono permite distancia con algo de pérdida.",
  "check": [
   [
    "Una empresa puede perder como máximo 4 horas de datos y debe estar funcionando en 8 horas. ¿Cuál es el RPO?",
    "4 horas; el RPO mide la pérdida de datos aceptable, mientras que las 8 horas son el RTO."
   ],
   [
    "¿Qué prueba de DR no implica ningún cambio en los sistemas?",
    "Un ejercicio de mesa, en el que el equipo discute el escenario y los procedimientos."
   ],
   [
    "¿Por qué la replicación síncrona está limitada por la distancia?",
    "Cada escritura espera la confirmación del sitio remoto, así que las distancias largas agregan latencia a cada transacción."
   ]
  ]
 },
 {
  "t": "Business continuity: BIA, MTBF and MTTR, prioritizing critical services, communication plans",
  "tt": "Continuidad del negocio: BIA, MTBF y MTTR, priorización de servicios críticos, planes de comunicación",
  "body": [
   "La planificación de la continuidad del negocio (BCP) es más amplia que la recuperación ante desastres. La DR se enfoca en restaurar los sistemas de TI; la continuidad del negocio se pregunta cómo toda la organización sigue cumpliendo sus funciones esenciales durante y después de una interrupción, incluidas las personas, las instalaciones, los proveedores y los procedimientos manuales alternativos. TI es una parte importante de ese plan, y los administradores de servidores aportan las piezas técnicas.",
   "La base es el BIA (análisis de impacto en el negocio). Un BIA identifica los procesos de negocio de la organización, los sistemas y las personas de los que depende cada uno, y el impacto a lo largo del tiempo si cada proceso se detiene: pérdida de ingresos, sanciones legales o regulatorias, riesgos para la seguridad y daño a la reputación. De ese análisis surgen los objetivos de recuperación de cada proceso, como el RTO y el RPO, y el tiempo de inactividad máximo tolerable, el punto a partir del cual la organización sufre un daño inaceptable. El BIA también revela las dependencias, por ejemplo, que el sistema de pedidos es inútil sin DNS, el servicio de directorio y la pasarela de pagos.",
   "Las métricas de confiabilidad ayudan a predecir las fallas y a planificar para ellas. El MTBF (tiempo medio entre fallas) es el tiempo promedio de funcionamiento entre fallas de un componente o sistema reparable; un MTBF más alto significa equipos más confiables. Los fabricantes publican cifras de MTBF para discos y fuentes de alimentación, y puedes calcularlo a partir de tus propios registros. El MTTR (tiempo medio de reparación o recuperación) es el tiempo promedio que se tarda en devolver a funcionamiento un componente o servicio que falló, incluidos el diagnóstico, la entrega de piezas y la reparación. Un MTTR más bajo es mejor. Puedes mejorar el MTTR con piezas de repuesto en sitio, buena documentación, un monitoreo que alerte rápidamente y contratos de soporte más rápidos. Algunos marcos también usan el MTTF (tiempo medio hasta la falla) para los elementos que se reemplazan en lugar de repararse.",
   "No todo puede restaurarse a la vez, así que prioriza los servicios críticos. Usando el BIA, clasifica los servicios en niveles: el nivel uno se restaura primero (por ejemplo, la autenticación, la red principal y la aplicación que genera ingresos), luego los servicios de soporte y después todo lo demás. El orden de recuperación debe respetar las dependencias: no tiene sentido iniciar los servidores de aplicaciones antes de que funcionen los servicios de directorio, el DNS y las bases de datos. Documenta este orden en el plan.",
   "Un plan de comunicación decide a quién se le informa qué, cuándo y cómo durante un incidente. Incluye un árbol de llamadas o una lista de contactos actualizada del personal, la gerencia, los fabricantes y los proveedores de servicios; voceros designados para los clientes, los medios y los reguladores; plantillas de mensajes; y canales alternativos en caso de que el correo electrónico y los teléfonos no funcionen. Una comunicación clara evita el trabajo duplicado, los mensajes contradictorios y el pánico, y algunas regulaciones exigen notificar dentro de plazos establecidos.",
   "Los planes de continuidad del negocio también cubren la sucesión (quién puede tomar decisiones si los líderes no están disponibles), las ubicaciones de trabajo alternativas y el acceso remoto, y la revisión y las pruebas periódicas para que el plan se mantenga actualizado a medida que cambian los sistemas."
  ],
  "terms": [
   [
    "BIA (business impact analysis) (análisis de impacto en el negocio)",
    "Un análisis de los procesos de negocio, sus dependencias y el impacto de su interrupción a lo largo del tiempo."
   ],
   [
    "MTBF (tiempo medio entre fallas)",
    "Mean time between failures: el tiempo promedio de funcionamiento entre fallas de un elemento reparable."
   ],
   [
    "MTTR (tiempo medio de reparación)",
    "Mean time to repair: el tiempo promedio necesario para restaurar un elemento o servicio que falló."
   ],
   [
    "Communication plan (plan de comunicación)",
    "El proceso documentado y los contactos para compartir información durante un incidente."
   ]
  ],
  "example": "Un BIA muestra que la tienda en línea pierde ingresos significativos por cada hora que está fuera de servicio, mientras que la wiki interna puede esperar dos días. El equipo de TI coloca la tienda, su base de datos y sus dependencias (DNS, directorio y enlaces a la pasarela de pagos) en el nivel de recuperación uno y mantiene discos y fuentes de alimentación de repuesto en sitio para reducir su MTTR.",
  "tip": "Un MTBF más alto es bueno (falla con menos frecuencia); un MTTR más bajo es bueno (se repara más rápido). El BIA va primero y produce las prioridades y los objetivos que implementan los planes de DR.",
  "check": [
   [
    "¿Qué produce un BIA que usa la planificación de DR?",
    "La criticidad de cada proceso, sus dependencias y los objetivos de recuperación, como el RTO, el RPO y el tiempo de inactividad máximo tolerable."
   ],
   [
    "¿Cómo puede mejorar la disponibilidad tener piezas de repuesto en sitio?",
    "Reduce el MTTR al eliminar la espera por la entrega de piezas."
   ]
  ]
 },
 {
  "t": "The CompTIA troubleshooting methodology: identify, theory, test, plan, implement, verify, document",
  "tt": "La metodología de resolución de problemas de CompTIA: identificar, teoría, probar, planificar, implementar, verificar, documentar",
  "body": [
   "La resolución de problemas es una habilidad que puedes volver sistemática. CompTIA usa una metodología estándar en todas sus certificaciones, y las preguntas de Server+ a menudo preguntan qué paso sigue o qué paso se omitió. Seguir los pasos en orden te impide adivinar, hacer cambios que oculten la causa real o resolver un problema mientras creas otro.",
   "El paso 1 es identificar el problema. Reúne información de los logs, los mensajes de error y el monitoreo; pregunta a los usuarios qué ven y cuándo empezó; identifica los síntomas; determina si algo cambió recientemente (actualizaciones, hardware nuevo, cambios de configuración); intenta reproducir el problema; y aborda los problemas múltiples de forma individual. Antes de hacer cambios, respalda los datos y las configuraciones cuando corresponda, porque algunas soluciones son destructivas. Aclara el alcance: un usuario, un servidor o todo el sitio.",
   "El paso 2 es establecer una teoría de la causa probable. Cuestiona primero lo obvio, como un cable suelto, un disco lleno o una contraseña vencida, antes de suponer algo exótico. Considera varios enfoques, por ejemplo, recorrer el modelo OSI capa por capa, o dividir el problema para aislar qué componente es el culpable. Investiga usando la documentación del fabricante y las bases de conocimiento.",
   "El paso 3 es probar la teoría para determinar la causa. Si la prueba la confirma, pasa a planificar la solución. Si no, establece una nueva teoría o escala a un colega con más experiencia o al fabricante. Siempre que sea posible, la prueba en sí no debe hacer cambios permanentes, por ejemplo, revisar un contador o cambiar por un cable que se sabe que funciona.",
   "El paso 4 es establecer un plan de acción para resolver el problema y notificar a los usuarios afectados. En un entorno de servidores, esto normalmente significa seguir la gestión de cambios: programar una ventana, documentar los pasos y preparar un plan de reversión, porque reiniciar un servidor de producción afecta a muchas personas.",
   "El paso 5 es implementar la solución o escalar según sea necesario. Haz un cambio a la vez cuando puedas, para saber qué cambio lo resolvió. El paso 6 es verificar la funcionalidad completa del sistema y, si corresponde, implementar medidas preventivas. Confirma con los usuarios que el servicio funciona de extremo a extremo, no solo que un servicio se inició, y considera qué evitaría que el problema se repita: monitoreo, un parche, un aumento de capacidad.",
   "El paso 7 es documentar los hallazgos, las acciones y los resultados a lo largo de todo el proceso, no solo al final. Registra los síntomas, la causa, la solución y el tiempo empleado en el sistema de tickets o la base de conocimiento. La documentación ayuda a la próxima persona que vea el mismo problema y apoya el análisis de la causa raíz y los informes de tendencias.",
   "Un recurso útil para memorizar es la palabra clave de cada paso: identificar, teoría, probar, planificar, implementar, verificar, documentar."
  ],
  "terms": [
   [
    "Theory of probable cause (teoría de la causa probable)",
    "La mejor explicación actual de un problema, formada después de reunir información y probada antes de actuar."
   ],
   [
    "Escalation (escalamiento)",
    "Pasar un problema a alguien con más experiencia o autoridad cuando no puedes resolverlo."
   ],
   [
    "Preventive measures (medidas preventivas)",
    "Acciones que se toman después de una solución para evitar que el mismo problema vuelva a ocurrir."
   ],
   [
    "Scope (alcance)",
    "Qué tan extendido está un problema, por ejemplo, un usuario, un servidor o todo un sitio."
   ]
  ],
  "example": "Los usuarios reportan que un servidor de archivos está lento. El técnico revisa el monitoreo y descubre que ayer un trabajo de respaldo se movió al horario laboral (identificar), plantea la teoría de que la E/S del respaldo está saturando los discos (teoría), confirma que la longitud de la cola de disco se dispara cuando se ejecuta el trabajo (probar), obtiene la aprobación para regresarlo (planificar), lo reprograma (implementar), confirma el rendimiento con los usuarios (verificar) y registra la solución (documentar).",
  "tip": "Conoce el orden y busca el paso que se omitió. Cuestiona lo obvio y pregunta qué cambió durante el paso 1; respalda antes de hacer cambios; verifica la funcionalidad completa antes de documentar.",
  "check": [
   [
    "¿Qué debes hacer si la prueba refuta tu teoría?",
    "Establecer una nueva teoría, o escalar si no puedes."
   ],
   [
    "¿Qué paso incluye implementar medidas preventivas?",
    "Verificar la funcionalidad completa del sistema y, si corresponde, implementar medidas preventivas."
   ],
   [
    "¿Por qué hacer un cambio a la vez?",
    "Para saber qué cambio resolvió el problema y poder revertir limpiamente si un cambio empeora las cosas."
   ]
  ]
 },
 {
  "t": "Hardware problems: POST errors and beep codes, overheating, failed fans and power supplies, memory errors, predictive failure alerts, LED indicators",
  "tt": "Problemas de hardware: errores de POST y códigos de pitidos, sobrecalentamiento, ventiladores y fuentes de alimentación que fallan, errores de memoria, alertas de falla predictiva, indicadores LED",
  "body": [
   "El hardware de los servidores normalmente te avisa antes de fallar, o mientras falla. Reconocer esas advertencias, desde los mensajes de arranque hasta las luces parpadeantes, te permite encontrar rápidamente la pieza que falló y, a menudo, reemplazarla antes de que los usuarios lo noten.",
   "Cuando un servidor arranca, el firmware ejecuta el POST (autoprueba de encendido), que revisa el procesador, la memoria, las controladoras de almacenamiento y otros componentes. Si el POST encuentra un problema, lo informa con un mensaje en pantalla, un código de error en una pantalla de diagnóstico, una entrada en el registro de eventos del sistema del BMC o códigos de pitidos (beep codes) si el video todavía no funciona. Los patrones de pitidos varían según el fabricante y el firmware, así que busca el patrón en la documentación del fabricante en lugar de adivinar. Un servidor que enciende pero no muestra nada y emite pitidos repetidos a menudo tiene un problema de memoria o de asentamiento de componentes; uno que no muestra ninguna señal de vida apunta a la energía.",
   "El sobrecalentamiento provoca un rendimiento limitado (throttling), apagados inesperados y una vida útil más corta de los componentes. Las causas comunes incluyen filtros de aire bloqueados o sucios, ventiladores que fallaron, paneles ciegos faltantes, una tapa del chasis sin colocar, cables que bloquean el flujo de aire o una unidad de enfriamiento del centro de datos que falló. Revisa los sensores de temperatura en el BMC, compara la temperatura de entrada con el rango del fabricante y verifica la orientación de los pasillos calientes y fríos. Los servidores se protegen aumentando la velocidad de los ventiladores y, a temperaturas críticas, apagándose.",
   "Los ventiladores y las fuentes de alimentación que fallan normalmente los reporta el BMC y se señalan con LED ámbar en la pieza. Como ambos suelen ser redundantes e intercambiables en caliente, el servidor sigue funcionando, pero ha perdido su protección. Reemplaza la pieza de inmediato. En el caso de una PSU que falló, revisa primero las causas simples: el cable de alimentación, la toma de la PDU y si se disparó el circuito que alimenta esa PDU. Si ambas PSU reportan fallas de energía de entrada al mismo tiempo, sospecha de la fuente de energía compartida en lugar de dos unidades que fallaron.",
   "Los errores de memoria van desde corregibles hasta fatales. La memoria ECC corrige los errores de un solo bit y los registra; un número creciente de errores corregibles en un módulo es una advertencia temprana de que está fallando. Los errores no corregibles provocan fallos del sistema o pantallas azules, pantallas moradas en algunos hipervisores, o kernel panics. Revisa el registro de eventos del BMC para encontrar el identificador de la ranura, vuelve a asentar o reemplaza el módulo y sigue las reglas de población del fabricante. Los módulos incompatibles o no soportados también pueden impedir el POST.",
   "Muchos componentes emiten alertas de falla predictiva antes de fallar. Los discos usan SMART (Self-Monitoring, Analysis and Reporting Technology) para dar seguimiento a los sectores reasignados y otros indicadores, y las controladoras RAID marcan un disco como falla predictiva. La memoria y las fuentes de alimentación también pueden emitir alertas predictivas. Trátalas como reemplazos programados, no como emergencias, pero no las ignores.",
   "Los indicadores LED ofrecen un diagnóstico rápido y local: el verde normalmente significa normal, el ámbar o ámbar parpadeante significa una falla o advertencia, y muchos servidores tienen un LED azul de identificación de unidad (UID) que puedes encender de forma remota para que el técnico extraiga el servidor correcto. Los LED de las bahías de discos muestran actividad, fallas y el estado de localización. Confirma siempre el significado exacto en la guía del fabricante."
  ],
  "terms": [
   [
    "POST",
    "Power-on self-test (autoprueba de encendido): verificaciones del firmware que se ejecutan al arrancar y reportan fallas de hardware."
   ],
   [
    "Beep code (código de pitidos)",
    "Un patrón de pitidos al arrancar que indica un error de hardware; los significados varían según el fabricante."
   ],
   [
    "Predictive failure (falla predictiva)",
    "Una alerta de que un componente, como un disco, muestra señales de que probablemente fallará pronto."
   ],
   [
    "UID LED",
    "Una luz de identificación de unidad que se usa para localizar un servidor o componente específico en un rack."
   ]
  ],
  "example": "El BMC reporta temperaturas de entrada en aumento en todos los servidores de un rack. En lugar de reemplazar ventiladores, el técnico inspecciona el rack y encuentra un switch nuevo instalado al revés, que sopla el aire caliente de escape hacia el pasillo frío, además de dos paneles ciegos faltantes. Corregir el flujo de aire devuelve las temperaturas a la normalidad.",
  "tip": "La falla de piezas redundantes no detiene el servidor, así que el examen a menudo pregunta por el siguiente paso: revisa las causas simples (cable, PDU, circuito) y luego intercambia la pieza en caliente. Muchos servidores sobrecalentándose a la vez sugieren una causa ambiental, no un solo ventilador.",
  "check": [
   [
    "Un disco reporta una falla predictiva SMART pero sigue funcionando. ¿Qué debes hacer?",
    "Programar un reemplazo de inmediato, ya que es probable que el disco falle y el arreglo perdería la redundancia."
   ],
   [
    "Ambas fuentes de alimentación de un servidor reportan fallas de energía de entrada a la vez. ¿Cuál es la causa probable?",
    "Un problema con la fuente de energía compartida, como una PDU o un circuito, en lugar de dos fallas simultáneas de PSU."
   ]
  ]
 },
 {
  "t": "Storage problems: degraded or failed RAID arrays, controller battery/cache issues, disk full, slow I/O, mount failures, boot device not found, corrupted file systems",
  "tt": "Problemas de almacenamiento: arreglos RAID degradados o fallidos, problemas de batería/caché de la controladora, disco lleno, E/S lenta, fallas de montaje, dispositivo de arranque no encontrado, sistemas de archivos corruptos",
  "body": [
   "Los problemas de almacenamiento están entre los más graves que enfrenta un administrador de servidores, porque pueden significar pérdida de datos, no solo tiempo de inactividad. Server+ espera que reconozcas los síntomas de cada problema de almacenamiento común y elijas un siguiente paso seguro, que muy a menudo significa proteger los datos antes de intentar una solución.",
   "Un arreglo RAID degradado ha perdido un disco miembro, pero sigue sirviendo datos usando el espejo o la paridad. Está funcionando sin protección, y el rendimiento normalmente baja porque la controladora reconstruye los datos faltantes sobre la marcha. Identifica el disco que falló usando la utilidad de la controladora y los LED de las bahías, verifica que tengas un respaldo actual y reemplaza el disco para que se reconstruya; si existe un disco de repuesto en caliente, es posible que la reconstrucción ya haya comenzado. No extraigas el disco equivocado, porque retirar un miembro sano de un arreglo RAID 5 degradado lo hace fallar por completo. Un arreglo fallido ha perdido más discos de los que tolera su nivel RAID, como dos discos en RAID 5. En ese punto, normalmente los datos tienen que venir de los respaldos. Evita inicializar o recrear el arreglo, lo que destruye cualquier posibilidad de recuperación, y consulta al fabricante.",
   "Las controladoras RAID por hardware usan una caché de escritura para acelerar las escrituras, protegida por una batería o por un módulo flash con un capacitor para que los datos en caché sobrevivan a un corte de energía. Si la batería falla o se está cargando, la controladora normalmente cambia del modo write-back al modo write-through por seguridad, y el rendimiento de escritura cae drásticamente. Los logs de la controladora y la utilidad de administración muestran el estado de la caché y de la batería. La solución es reemplazar la batería o el módulo de caché; forzar write-back sin protección implica riesgo de pérdida de datos.",
   "Un disco lleno hace que las aplicaciones fallen, que las bases de datos se detengan, que los logs dejen de registrar y, a veces, que el sistema operativo se vuelva inestable. Los culpables comunes son los archivos de log que crecen, los archivos temporales, los respaldos o volcados olvidados y los volúmenes con thin provisioning que se llenan. Encuentra qué está usando el espacio con `du` y `df -h` en Linux o con las herramientas de almacenamiento en Windows, limpia o archiva de forma segura, y luego corrige la causa con rotación de logs, cuotas, alertas de monitoreo o más capacidad. En Linux, revisa también el agotamiento de inodos con `df -i`, en el que un disco tiene espacio pero no tiene entradas de archivo libres.",
   "La E/S lenta se manifiesta como una alta latencia de disco y colas largas. Las causas incluyen un arreglo degradado o en reconstrucción, una batería de caché que falló, un disco a punto de fallar, particiones desalineadas, demasiadas VM en un solo datastore, un problema en la ruta de almacenamiento o simplemente una carga de trabajo que superó a sus discos. Compara con las líneas base para ver qué cambió.",
   "Las fallas de montaje ocurren cuando no se puede conectar un sistema de archivos: una entrada incorrecta en `/etc/fstab` (por ejemplo, un nombre de dispositivo que cambió, razón por la cual se prefieren los UUID), una conexión iSCSI o SAN faltante, un driver faltante o un sistema de archivos corrupto. Una entrada incorrecta en fstab puede incluso impedir que un servidor Linux arranque normalmente. \"Boot device not found\" o \"no bootable device\" significa que el firmware no puede encontrar un disco de arranque: revisa el orden de arranque, si el disco o arreglo de arranque está presente y en buen estado, el modo UEFI frente al heredado y si el gestor de arranque está dañado.",
   "Los sistemas de archivos corruptos aparecen después de cortes de energía, fallas de hardware o discos que están fallando. Los síntomas incluyen archivos ilegibles, errores en los logs y volúmenes que se montan como solo lectura. Respalda lo que puedas, luego ejecuta la herramienta de reparación adecuada con el volumen desmontado, e investiga la causa de hardware subyacente."
  ],
  "terms": [
   [
    "Degraded array (arreglo degradado)",
    "Un arreglo RAID que ha perdido un miembro pero sigue sirviendo datos sin redundancia."
   ],
   [
    "Write-back cache (caché write-back)",
    "Caché de la controladora que confirma las escrituras antes de que lleguen al disco; requiere protección por batería o flash."
   ],
   [
    "Write-through",
    "Modo de caché que confirma las escrituras solo después de que llegan al disco; más seguro pero más lento."
   ],
   [
    "fstab",
    "El archivo de Linux que enumera qué sistemas de archivos montar al arrancar y dónde."
   ]
  ],
  "example": "El rendimiento de escritura de un servidor de base de datos se reduce repentinamente a la mitad. El log de la controladora RAID muestra que la batería de la caché falló su ciclo de aprendizaje, así que la controladora cambió a write-through. El administrador pide un módulo de batería de reemplazo, programa el cambio y, después, la caché write-back se reanuda.",
  "tip": "Con un arreglo degradado, respalda primero y reemplaza el disco correcto. Una caída repentina en la velocidad de escritura en RAID por hardware a menudo significa que la batería de la caché falló y la controladora pasó a write-through.",
  "check": [
   [
    "¿Cuál es el peligro de extraer el disco equivocado de un arreglo RAID 5 degradado?",
    "Retirar un segundo disco supera la tolerancia de RAID 5 a la falla de un solo disco, lo que hace fallar el arreglo y pierde los datos."
   ],
   [
    "Un servidor Linux muestra espacio libre pero no puede crear archivos. ¿Qué debes revisar?",
    "El uso de inodos con df -i; es posible que el sistema de archivos se haya quedado sin inodos."
   ]
  ]
 },
 {
  "t": "Storage tools: disk management, fsck/chkdsk, RAID controller utilities, SMART data, partitioning tools",
  "tt": "Herramientas de almacenamiento: administración de discos, fsck/chkdsk, utilidades de la controladora RAID, datos SMART, herramientas de particionado",
  "body": [
   "Saber qué herramienta usar es la mitad de la solución de un problema de almacenamiento. Server+ espera que relaciones las herramientas comunes con sus tareas tanto en Windows como en Linux, y que conozcas las precauciones que evitan que empeoren las cosas.",
   "Administración de discos (Disk Management) es la consola gráfica de Windows (`diskmgmt.msc`) para ver discos y volúmenes. La usas para poner en línea discos nuevos, inicializarlos como GPT o MBR, crear, extender, reducir y formatear volúmenes, asignar letras de unidad y ver si un disco está fuera de línea o tiene errores. PowerShell proporciona las mismas funciones con cmdlets como `Get-Disk`, `Get-Volume`, `Initialize-Disk` y `New-Partition`, y `diskpart` es la herramienta de línea de comandos más antigua. Es común que un disco aparezca fuera de línea después de agregarlo desde una SAN; ponlo en línea de forma deliberada, asegurándote de que no lo esté usando ya otro servidor.",
   "Los verificadores de sistemas de archivos reparan daños lógicos. En Windows, `chkdsk` analiza un volumen en busca de errores del sistema de archivos; `chkdsk /f` corrige los errores y `chkdsk /r` además localiza los sectores defectuosos y recupera los datos legibles, lo que tarda mucho más. Si el volumen está en uso, como la unidad del sistema, la verificación se programa para el siguiente reinicio. En Linux, `fsck` (con versiones específicas por sistema de archivos, como `e2fsck` para ext4) verifica y repara los sistemas de archivos, mientras que XFS usa `xfs_repair`. Ejecútalos siempre en un sistema de archivos desmontado, o al menos montado como solo lectura, porque reparar un sistema de archivos montado y activo puede corromperlo. Respalda primero cuando puedas, ya que las reparaciones pueden eliminar archivos dañados.",
   "Las utilidades de la controladora RAID administran los arreglos por hardware. Vienen como una utilidad de configuración del firmware a la que se entra durante el POST, una herramienta de línea de comandos del fabricante, una interfaz web o una integración con el BMC. Úsalas para ver el estado de los arreglos y los discos, identificar discos que fallaron o con falla predictiva, hacer parpadear los LED de las bahías para localizar discos, asignar discos de repuesto en caliente, iniciar reconstrucciones, revisar el estado de la caché y la batería, y revisar el registro de eventos de la controladora. En el RAID por software de Linux, `mdadm` y `cat /proc/mdstat` cumplen esta función; en Windows, Storage Spaces se administra en el Administrador del servidor (Server Manager) o en PowerShell.",
   "Los datos SMART provienen del propio disco. Herramientas como `smartctl` del paquete smartmontools en Linux, las utilidades del fabricante o la vista pass-through de la controladora RAID muestran atributos como el número de sectores reasignados, los sectores pendientes, las horas de encendido, la temperatura y, en los SSD, el desgaste o el porcentaje usado. Un número creciente de sectores reasignados o pendientes es una señal de advertencia para reemplazar un disco. Detrás de un RAID por hardware, es posible que necesites opciones específicas de la controladora para leer los datos SMART de los discos individuales.",
   "Las herramientas de particionado crean y modifican particiones: `fdisk` (MBR y GPT en las versiones modernas), `gdisk` y `parted` en Linux, `lsblk` y `blkid` para ver los dispositivos de bloques y los UUID, y los comandos de LVM como `pvcreate`, `vgextend` y `lvextend` para administrar volúmenes lógicos. Después de extender una partición o un volumen lógico, también debes hacer crecer el sistema de archivos, por ejemplo con `resize2fs` para ext4 o `xfs_growfs` para XFS. Verifica dos veces el dispositivo de destino antes de escribir, ya que particionar el disco equivocado destruye los datos."
  ],
  "terms": [
   [
    "chkdsk",
    "Herramienta de Windows que verifica y repara errores del sistema de archivos; /f corrige los errores y /r además busca sectores defectuosos."
   ],
   [
    "fsck",
    "Verificador de consistencia de sistemas de archivos de Linux, que se ejecuta en sistemas de archivos desmontados."
   ],
   [
    "smartctl",
    "Una herramienta de línea de comandos que lee los datos de salud SMART de los discos."
   ],
   [
    "parted",
    "Una herramienta de particionado de Linux que admite discos GPT y el redimensionamiento."
   ]
  ],
  "example": "Un volumen de datos ext4 en Linux se extiende en la SAN. El administrador ejecuta `lsblk` para confirmar el nuevo tamaño, usa `parted` para hacer crecer la partición, ejecuta `resize2fs` para hacer crecer el sistema de archivos en línea y comprueba con `df -h` que los usuarios vean el espacio adicional.",
  "tip": "Ejecuta fsck o chkdsk solo en volúmenes desmontados (o de solo lectura) y respalda primero. Extender una partición no es suficiente; también hay que hacer crecer el sistema de archivos.",
  "check": [
   [
    "¿Qué opción de chkdsk también busca sectores defectuosos?",
    "/r, que localiza los sectores defectuosos y recupera la información legible (incluye /f)."
   ],
   [
    "¿Qué herramienta usarías para leer el número de sectores reasignados de un disco en Linux?",
    "smartctl, del paquete smartmontools."
   ]
  ]
 },
 {
  "t": "OS and software problems: failed updates, services not starting, memory leaks, runaway processes, driver issues, boot loops, misconfigured applications",
  "tt": "Problemas del sistema operativo y del software: actualizaciones fallidas, servicios que no inician, fugas de memoria, procesos descontrolados, problemas de drivers, bucles de arranque, aplicaciones mal configuradas",
  "body": [
   "Muchas interrupciones de servidores no las causa el hardware sino el software: una actualización que no se aplicó limpiamente, un servicio que no inicia, un programa que va consumiendo memoria poco a poco. Server+ evalúa cómo reconocer estos problemas y elegir el primer paso correcto.",
   "Las actualizaciones fallidas se manifiestan como códigos de error en el historial de actualizaciones, intentos repetidos de instalar el mismo parche o un servidor que se reinicia y revierte los cambios. Las causas incluyen espacio en disco insuficiente, descargas interrumpidas, cachés de actualización corruptas, drivers o software incompatibles y reinicios pendientes de actualizaciones anteriores. Revisa los logs para encontrar el error, libera espacio en disco, vuelve a intentarlo y, si una actualización rompe alguna funcionalidad, reviértela e infórmalo. Probar las actualizaciones primero en sistemas que no son de producción e implementarlas por oleadas reduce el daño.",
   "Un servicio que no inicia normalmente deja una pista en los logs. Las causas comunes son una dependencia que no está en ejecución (por ejemplo, una aplicación web que necesita su servicio de base de datos), una cuenta de servicio cuya contraseña cambió o venció, permisos faltantes sobre una carpeta, un puerto que ya usa otro programa, un archivo faltante o un archivo de configuración incorrecto. En Windows revisa la consola de Servicios y el log System; en Linux usa `systemctl status servicename` y `journalctl -u servicename`.",
   "Una fuga de memoria ocurre cuando un programa asigna memoria y nunca la libera, así que su uso crece constantemente hasta que el servidor se queda sin memoria y empieza a paginar intensamente o a terminar procesos. Los síntomas son ralentizaciones graduales a lo largo de varios días que desaparecen después de un reinicio. Confírmalo observando la memoria de un proceso a lo largo del tiempo en el Administrador de tareas, el Monitor de rendimiento o `top`. Reiniciar el servicio es una solución temporal; la solución real es un parche del fabricante o del desarrollador. Un proceso descontrolado (runaway process) es uno que se queda atascado consumiendo muchísima CPU, a menudo en un bucle. Identifícalo con el Administrador de tareas o `top`, determina si es legítimo y termínalo si es necesario; luego investiga por qué, incluida la posibilidad de malware, como un criptominero.",
   "Los problemas de drivers aparecen después de instalar hardware nuevo, actualizar drivers o actualizar el sistema operativo: dispositivos que faltan en el Administrador de dispositivos, adaptadores de red o de almacenamiento que fallan, pantallas azules o kernel panics que mencionan un driver. Usa drivers suministrados por el fabricante, incluidos en la HCL, que coincidan con la versión del firmware, y revierte un driver si uno nuevo causa problemas.",
   "Un bucle de arranque (boot loop) ocurre cuando un servidor se reinicia repetidamente antes de terminar el inicio. Las causas incluyen una actualización o un driver defectuosos, archivos del sistema corruptos, un disco de arranque que está fallando o el reinicio automático ante un error del sistema que oculta un mensaje de fallo. Arranca en modo seguro o en modo de recuperación, o en Linux elige un kernel anterior en el menú de arranque, y luego revierte el cambio reciente. Desactivar el reinicio automático ante un error del sistema te permite leer el error de detención (stop error).",
   "Las aplicaciones mal configuradas se comportan de forma inesperada: cadenas de conexión incorrectas, puertos equivocados, permisos incorrectos, errores tipográficos en los archivos de configuración. Compara la configuración con una línea base o un respaldo que se sepa que funciona, revisa qué cambió recientemente mediante los registros de cambios y valida los archivos de configuración con las opciones de prueba de la aplicación, como una verificación de sintaxis, antes de reiniciar."
  ],
  "terms": [
   [
    "Memory leak (fuga de memoria)",
    "Un defecto en el que un programa sigue asignando memoria sin liberarla, agotando gradualmente la RAM."
   ],
   [
    "Runaway process (proceso descontrolado)",
    "Un proceso que consume CPU o recursos en exceso, a menudo atascado en un bucle."
   ],
   [
    "Boot loop (bucle de arranque)",
    "Una condición en la que un sistema se reinicia repetidamente sin completar el inicio."
   ],
   [
    "Service dependency (dependencia de servicio)",
    "Otro servicio que debe estar en ejecución antes de que un servicio determinado pueda iniciar."
   ]
  ],
  "example": "Un servidor de aplicaciones necesita un reinicio cada semana porque se vuelve extremadamente lento. El Monitor de rendimiento muestra que la memoria privada de un servicio crece constantemente desde el momento en que inicia. El administrador programa un reinicio nocturno del servicio como solución temporal y abre un ticket con el fabricante, que más tarde publica un parche que corrige la fuga.",
  "tip": "Una ralentización gradual que se corrige con un reinicio sugiere una fuga de memoria. Un servicio que falla justo después de un cambio de contraseña apunta a las credenciales de su cuenta de servicio. Un fallo después de instalar un driver nuevo significa revertir el driver.",
  "check": [
   [
    "Un servicio no inicia después de que la política de contraseñas del dominio forzó un cambio. ¿Cuál es una causa probable?",
    "El servicio se ejecuta con una cuenta cuya contraseña almacenada ya no coincide, así que no puede iniciar sesión."
   ],
   [
    "¿Qué debes hacer primero cuando un servidor entra en un bucle de arranque después de una actualización?",
    "Arrancar en modo seguro o de recuperación (o con un kernel anterior) y revertir la actualización o el driver recientes."
   ]
  ]
 },
 {
  "t": "OS tools: Event Viewer, system logs and journalctl, Task Manager/top, Performance Monitor, rollback of updates, safe mode",
  "tt": "Herramientas del sistema operativo: Visor de eventos, logs del sistema y journalctl, Administrador de tareas/top, Monitor de rendimiento, reversión de actualizaciones, modo seguro",
  "body": [
   "Los sistemas operativos incluyen las herramientas que necesitas para encontrar y corregir la mayoría de los problemas de software. Server+ espera que sepas qué muestra cada herramienta en Windows y en Linux, y cuándo usar opciones de recuperación como la reversión de actualizaciones y el modo seguro.",
   "El Visor de eventos (Event Viewer, `eventvwr.msc`) es el visor de logs de Windows. Los principales Registros de Windows son Application (eventos de los programas), System (drivers, servicios y componentes del sistema operativo) y Security (inicios de sesión, uso de privilegios y eventos de auditoría, si la auditoría está habilitada), además de Setup y muchos registros detallados de Aplicaciones y servicios. Cada evento tiene un nivel (Critical, Error, Warning, Information), un origen y un ID de evento que puedes buscar en la documentación del fabricante. Usa filtros y vistas personalizadas para acotar por hora, nivel u origen, y reenvía los eventos a un recolector central cuando tengas muchos servidores.",
   "Los logs de Linux tradicionalmente se encuentran en `/var/log`: archivos como `syslog` o `messages` para los mensajes generales del sistema, `auth.log` o `secure` para la autenticación, y logs específicos de las aplicaciones. Las distribuciones basadas en systemd también mantienen un diario (journal) binario que se lee con `journalctl`. Las opciones útiles incluyen `journalctl -u nginx` para un servicio, `-b` para el arranque actual (y `-b -1` para el arranque anterior, muy útil después de un fallo), `-p err` para errores y niveles más graves, `--since` para un rango de tiempo y `-f` para seguir las nuevas entradas en vivo. `dmesg` muestra los mensajes del kernel, incluidos los errores de hardware y de drivers.",
   "El Administrador de tareas (Task Manager) en Windows muestra los procesos en ejecución y su uso de CPU, memoria, disco y red, te permite terminar procesos e incluye las pestañas Servicios y Rendimiento; el Monitor de recursos (Resource Monitor) profundiza en qué procesos usan qué archivos y puertos. En Linux, `top` y el más amigable `htop` muestran los procesos en vivo ordenados por CPU o memoria, los promedios de carga y el uso de memoria; `ps aux` enumera los procesos y `kill` les envía señales para detenerlos. Usa `free -h` para la memoria e `iostat` o `vmstat` para la E/S y la actividad del sistema, donde estén instalados.",
   "El Monitor de rendimiento (Performance Monitor, `perfmon`) en Windows registra contadores de rendimiento a lo largo del tiempo, como el tiempo de procesador, la memoria disponible, las páginas por segundo, la longitud de la cola de disco y los bytes de red. Puedes crear conjuntos de recopiladores de datos que registren contadores durante días, que es como se crean las líneas base de rendimiento y se detectan los problemas intermitentes. Los equivalentes en Linux incluyen `sar` del paquete sysstat y los agentes de monitoreo.",
   "Cuando una actualización causa problemas, reviértela. En Windows, desinstala la actualización desde las actualizaciones instaladas o con la línea de comandos, y considera pausar las actualizaciones hasta que se publique una corrección. En Linux, los gestores de paquetes pueden bajar de versión o deshacer transacciones, por ejemplo `dnf history undo`, y puedes arrancar un kernel anterior desde el menú de GRUB. Los snapshots de VM tomados antes de aplicar parches ofrecen otra vía rápida de reversión.",
   "El modo seguro inicia Windows con un conjunto mínimo de drivers y servicios, para que puedas eliminar un driver, una aplicación o una actualización defectuosos que impiden el inicio normal; el Modo seguro con funciones de red agrega soporte de red. El Entorno de recuperación de Windows ofrece reparación de inicio, restauración del sistema y un símbolo del sistema. Linux ofrece los destinos (targets) rescue o emergency y el modo de un solo usuario, a los que se llega desde el menú de arranque, para reparaciones similares. Úsalos cuando el sistema no pueda arrancar o no se mantenga en funcionamiento el tiempo suficiente para repararlo normalmente."
  ],
  "terms": [
   [
    "Event Viewer (Visor de eventos)",
    "La herramienta de Windows para leer los logs Application, System, Security y otros registros de eventos."
   ],
   [
    "journalctl",
    "El comando para consultar el diario de systemd en Linux, filtrable por unidad, arranque, prioridad y hora."
   ],
   [
    "Performance Monitor (Monitor de rendimiento)",
    "La herramienta de Windows que muestra y registra contadores de rendimiento a lo largo del tiempo."
   ],
   [
    "Safe mode (modo seguro)",
    "Un modo de inicio de Windows que carga solo los drivers y servicios esenciales para la resolución de problemas."
   ]
  ],
  "example": "Un servidor Linux se reinició inesperadamente durante la noche. La administradora ejecuta `journalctl -b -1 -p err` para ver los errores del arranque anterior y encuentra mensajes repetidos de errores de memoria del kernel justo antes del reinicio, lo que la lleva al registro de eventos del BMC y a un DIMM que está fallando.",
  "tip": "La distinción entre los logs Application, System y Security es común en el examen: las fallas de servicios y drivers van a System, los errores de programas a Application y los eventos de inicio de sesión a Security. journalctl -u filtra por servicio, -b por arranque.",
  "check": [
   [
    "¿Qué log de Windows registra un servicio que no pudo iniciar?",
    "El log System, donde el Administrador de control de servicios (Service Control Manager) registra las fallas de inicio de los servicios."
   ],
   [
    "¿Qué herramienta usarías para registrar la longitud de la cola de disco durante varios días en Windows?",
    "El Monitor de rendimiento con un conjunto de recopiladores de datos."
   ]
  ]
 },
 {
  "t": "Network problems: no connectivity, wrong IP/mask/gateway, DNS resolution failures, duplex mismatch, firewall rules, NIC teaming misconfiguration",
  "tt": "Problemas de red: sin conectividad, IP/máscara/puerta de enlace incorrectas, fallas de resolución DNS, discrepancia de dúplex, reglas de firewall, configuración incorrecta del NIC teaming",
  "body": [
   "Cuando los usuarios dicen que el servidor no funciona, a menudo el servidor está funcionando bien y el problema está en la ruta de red hacia él. Server+ espera que reconozcas las fallas de red comunes por sus síntomas y las analices en un orden lógico, normalmente desde la capa física hacia arriba.",
   "La ausencia total de conectividad comienza con la capa física. Revisa las luces de enlace en la NIC y en el puerto del switch, el cable y el transceptor, si el adaptador está habilitado en el sistema operativo y si el puerto del switch está apagado o en la VLAN equivocada. Una máquina virtual puede tener su NIC virtual desconectada o conectada al switch virtual o grupo de puertos equivocado. Si el enlace está activo, verifica que la interfaz realmente tenga una dirección IP. En Windows, una dirección que empieza con 169.254 es una dirección APIPA (Automatic Private IP Addressing), lo que significa que la máquina esperaba DHCP y no obtuvo respuesta.",
   "Una configuración IP incorrecta provoca fallas parciales confusas. Una dirección IP incorrecta puede entrar en conflicto con otro dispositivo (advertencias de dirección duplicada) o colocar el servidor en la subred equivocada. Una máscara de subred incorrecta hace que el servidor crea que hosts locales son remotos o que hosts remotos son locales, así que algunos destinos funcionan y otros no. Una puerta de enlace predeterminada incorrecta o faltante permite que el servidor se comunique con su propia subred pero con nada más allá: puede llegar a sus vecinos, pero no a otras redes ni a internet. Compara la configuración con la documentación.",
   "Las fallas de resolución DNS parecen una red caída, pero solo por nombre. Si `ping 10.0.0.25` funciona y `ping app01` falla, la red está bien y el problema es la resolución de nombres. Las causas incluyen direcciones de servidores DNS incorrectas, un registro DNS faltante o incorrecto, entradas obsoletas en caché, un sufijo DNS incorrecto o una entrada en el archivo hosts local que anula el DNS. Limpia las cachés, consulta directamente al servidor DNS y revisa el registro.",
   "Una discrepancia de dúplex (duplex mismatch) ocurre cuando un lado de un enlace funciona en dúplex completo y el otro en semidúplex, normalmente porque un extremo se configuró manualmente y el otro se dejó en autonegociación. El enlace funciona, pero el rendimiento es malo, y los contadores de la interfaz muestran errores como colisiones tardías, errores CRC o runts. La solución es configurar ambos lados de la misma manera, normalmente ambos en autonegociación. Las discrepancias de velocidad normalmente impiden que el enlace se active en absoluto.",
   "Las reglas de firewall producen un patrón característico: el servidor responde al ping y otros servicios funcionan, pero el puerto de una aplicación no es accesible. El bloqueo puede estar en el firewall del host, un firewall de red, un grupo de seguridad de la nube o un balanceador de carga. Confirma primero que el servicio esté escuchando localmente, luego prueba el puerto desde el lado del cliente y revisa los logs de las reglas. Recuerda que algunas redes bloquean ICMP, así que un ping fallido no siempre significa que el host esté caído.",
   "Una configuración incorrecta del NIC teaming provoca pérdidas intermitentes, enlaces inestables (flapping), paquetes duplicados o solo la mitad del ancho de banda esperado. La causa más común es una discrepancia entre el modo del team del servidor y el switch: por ejemplo, un team LACP en el servidor conectado a puertos del switch que no están configurados como port channel, o un team estático conectado a switches diferentes que no lo admiten. Verifica también que todos los miembros estén en la misma VLAN con la misma velocidad y configuración."
  ],
  "terms": [
   [
    "APIPA",
    "Automatic Private IP Addressing: una dirección 169.254.x.x que un host Windows se asigna a sí mismo cuando falla DHCP."
   ],
   [
    "Default gateway (puerta de enlace predeterminada)",
    "La dirección del router que usa un host para llegar a las redes fuera de su propia subred."
   ],
   [
    "Duplex mismatch (discrepancia de dúplex)",
    "Un enlace en el que un lado funciona en dúplex completo y el otro en semidúplex, lo que causa errores y mal rendimiento."
   ],
   [
    "Hosts file (archivo hosts)",
    "Un archivo local que asocia nombres con direcciones IP y que se consulta antes que el DNS en la mayoría de los sistemas."
   ]
  ],
  "example": "Después de mover un servidor a un rack nuevo, este puede llegar a otros servidores de su subred, pero no a la base de datos en otro edificio. El administrador descubre que la puerta de enlace predeterminada todavía apunta al router de la subred anterior. Corregir la puerta de enlace restablece el acceso de inmediato.",
  "tip": "Llega a hosts locales pero a nada remoto: revisa la puerta de enlace. Funciona por IP pero no por nombre: revisa el DNS. Lento con errores en la interfaz: sospecha de una discrepancia de dúplex. El ping funciona pero un puerto falla: sospecha de una regla de firewall.",
  "check": [
   [
    "Un servidor Windows tiene la dirección 169.254.12.7. ¿Qué indica esto?",
    "Es una dirección APIPA, lo que significa que el servidor intentó usar DHCP y ningún servidor DHCP respondió."
   ],
   [
    "¿Qué síntomas sugieren una discrepancia de dúplex?",
    "El enlace está activo pero lento, con colisiones tardías y errores CRC en los contadores de la interfaz."
   ]
  ]
 },
 {
  "t": "Network tools: ping, tracert/traceroute, nslookup/dig, ipconfig/ip, netstat/ss, arp, telnet or Test-NetConnection for port tests",
  "tt": "Herramientas de red: ping, tracert/traceroute, nslookup/dig, ipconfig/ip, netstat/ss, arp, telnet o Test-NetConnection para pruebas de puertos",
  "body": [
   "Cada herramienta de red responde una pregunta específica. Usar la correcta, en el orden correcto, te permite acotar un problema de red rápidamente. Server+ a menudo te da la salida de un comando y te pregunta qué muestra, así que aprende qué hace cada herramienta y qué significa su salida.",
   "Empieza por la configuración local. `ipconfig` en Windows muestra la dirección IP, la máscara, la puerta de enlace y, con `ipconfig /all`, los servidores DNS, la dirección MAC y los detalles de DHCP. `ipconfig /release` y `/renew` solicitan una nueva concesión de DHCP, e `ipconfig /flushdns` limpia la caché de DNS. En Linux, `ip addr` (abreviado `ip a`) muestra las direcciones, `ip route` muestra la tabla de enrutamiento y la puerta de enlace predeterminada, e `ip link` muestra el estado de las interfaces. El antiguo `ifconfig` todavía puede aparecer en algunos sistemas.",
   "`ping` envía solicitudes de eco ICMP e informa las respuestas y el tiempo de ida y vuelta. Una secuencia lógica es hacer ping a la dirección de loopback 127.0.0.1 (la pila TCP/IP funciona), a tu propia dirección, a la puerta de enlace predeterminada, a un host remoto por IP y, por último, a un host remoto por nombre. El punto donde falla primero te indica qué capa o segmento está roto. Recuerda que los firewalls a menudo bloquean ICMP.",
   "`tracert` en Windows y `traceroute` en Linux muestran cada salto de router a lo largo de la ruta hacia un destino y el retardo hasta cada uno. Revelan dónde se detiene el tráfico o dónde se dispara la latencia. Los asteriscos pueden significar que un salto no responde a las sondas en lugar de una falla, así que fíjate dónde se detienen las respuestas por completo. `pathping` en Windows combina el rastreo con estadísticas de pérdida.",
   "`nslookup` (Windows y Linux) y `dig` (Linux) consultan el DNS directamente. `nslookup app01` muestra qué servidor DNS respondió y la dirección devuelta; puedes consultar un servidor específico, como en `nslookup app01 10.0.0.53`, para comparar respuestas. `dig app01 A` o `dig -x 10.0.0.25` para búsquedas inversas dan una salida detallada que incluye el TTL del registro. Si estas herramientas devuelven la dirección correcta pero la aplicación sigue usando la incorrecta, revisa las cachés locales y el archivo hosts.",
   "`netstat` y su reemplazo en Linux, `ss`, muestran las conexiones de red y los puertos en escucha. `netstat -ano` en Windows enumera todas las conexiones y los puertos en escucha con el ID del proceso propietario; `ss -tulpn` en Linux enumera los sockets TCP y UDP en escucha con los nombres de los procesos. Úsalos para confirmar que un servicio realmente está escuchando, y en qué dirección y puerto, antes de culpar a un firewall. `arp -a` muestra la caché ARP, que asocia direcciones IP con direcciones MAC en la subred local; ayuda a detectar direcciones IP duplicadas o a confirmar qué dispositivo responde por una dirección. En Linux, `ip neigh` ofrece la misma vista.",
   "El ping no prueba los puertos de las aplicaciones. Para comprobar si un puerto TCP específico es accesible, usa `Test-NetConnection server -Port 443` en PowerShell, que informa si la conexión TCP tuvo éxito, o `telnet server 443` en los sistemas donde el cliente Telnet está instalado; una pantalla en blanco significa que se conectó, y un error significa que la conexión fue rechazada o se agotó el tiempo de espera. En Linux, `nc -zv server 443` hace lo mismo. Usa Telnet solo como cliente para probar puertos, nunca para la administración."
  ],
  "terms": [
   [
    "traceroute/tracert",
    "Una herramienta que enumera cada salto de router hacia un destino y el retardo hasta cada uno."
   ],
   [
    "nslookup/dig",
    "Herramientas que consultan directamente a los servidores DNS para comprobar la resolución de nombres."
   ],
   [
    "ss/netstat",
    "Herramientas que enumeran las conexiones de red y los puertos en escucha, opcionalmente con el proceso propietario."
   ],
   [
    "Test-NetConnection",
    "Un cmdlet de PowerShell que prueba la conectividad, incluido si un puerto TCP es accesible."
   ]
  ],
  "example": "Los usuarios no pueden llegar a una nueva aplicación web en el puerto 8443. En el servidor, `ss -tulpn` muestra la aplicación escuchando solo en 127.0.0.1:8443. El administrador cambia su dirección de enlace a la interfaz del servidor, y `Test-NetConnection web01 -Port 8443` desde un cliente ahora informa éxito.",
  "tip": "ping prueba la accesibilidad, no los puertos; usa Test-NetConnection, telnet o nc para los puertos. nslookup/dig para el DNS, tracert/traceroute para la ruta, netstat/ss para lo que está escuchando, arp para la asociación IP-MAC.",
  "check": [
   [
    "¿Qué comando muestra los puertos en escucha con los ID de proceso en Windows?",
    "netstat -ano."
   ],
   [
    "Un host hace ping a su puerta de enlace pero no a un servidor remoto por IP. ¿Qué herramienta ayuda a encontrar dónde se detiene el tráfico?",
    "tracert o traceroute, que muestra cada salto a lo largo de la ruta."
   ],
   [
    "¿Qué hace ipconfig /flushdns?",
    "Limpia la caché local del resolvedor DNS para que se hagan búsquedas nuevas."
   ]
  ]
 },
 {
  "t": "Security problems: permissions and access denied errors, expired certificates, antivirus quarantining files, firewall blocking services, compromised accounts",
  "tt": "Problemas de seguridad: errores de permisos y acceso denegado, certificados vencidos, antivirus que pone archivos en cuarentena, firewall que bloquea servicios, cuentas comprometidas",
  "body": [
   "Los controles de seguridad están diseñados para bloquear cosas, así que cuando están mal configurados o se activan provocan interrupciones que parecen otros problemas. Server+ te pide reconocer las fallas relacionadas con la seguridad y corregirlas sin debilitar la seguridad, y detectar las señales de que una cuenta ha sido comprometida.",
   "Los errores de acceso denegado normalmente provienen de los permisos. En los recursos compartidos de archivos de Windows se aplican dos conjuntos de permisos: los permisos del recurso compartido y los permisos NTFS. El acceso efectivo de un usuario que se conecta a través de la red es el más restrictivo de los dos. Dentro de NTFS, los permisos de varios grupos se combinan, pero una denegación (Deny) explícita prevalece sobre una autorización (Allow). Los permisos se heredan de las carpetas principales a menos que se desactive la herencia, y mover o copiar archivos puede cambiar lo que heredan. En Linux, revisa el propietario, el grupo y el modo con `ls -l`, y recuerda que SELinux o AppArmor pueden denegar el acceso incluso cuando los permisos de archivo parecen correctos. Verifica también que los cambios de membresía de grupo hayan surtido efecto, ya que los usuarios a menudo necesitan cerrar sesión y volver a iniciarla. Corrige el problema ajustando la membresía de grupo o los derechos al mínimo necesario, no concediendo control total a Everyone (Todos).",
   "Los certificados habilitan TLS para sitios web, APIs, LDAPS y muchos servicios internos. Cuando un certificado vence, los clientes muestran advertencias o se niegan a conectarse, y las conexiones entre servicios pueden fallar sin avisar. Otros problemas de certificados incluyen una discrepancia de nombre (el certificado no incluye el nombre de host que usan los clientes), un emisor no confiable o un certificado intermedio faltante, y un certificado revocado. Los errores de reloj también pueden hacer que certificados válidos parezcan vencidos o todavía no válidos. Corrígelo renovando e instalando el certificado con la cadena completa, y luego reiniciando o volviendo a enlazar el servicio. Evita que se repita con un inventario de certificados, monitoreo de vencimientos y renovación automatizada cuando sea posible.",
   "Las herramientas de antivirus y EDR a veces ponen en cuarentena archivos legítimos, como una nueva actualización de una aplicación, un script o un archivo de base de datos, lo que hace que un servicio falle. La pista es un evento de cuarentena o de detección en el log de la herramienta de seguridad alrededor del momento en que comenzó la falla. Verifica que el archivo sea realmente seguro, por ejemplo revisando su origen y su firma digital, restáuralo de la cuarentena y crea una exclusión específica y documentada o envíalo al fabricante como falso positivo. No desactives la protección por completo.",
   "Los firewalls que bloquean servicios aparecen después de nuevas instalaciones, cambios de puerto o actualizaciones de reglas: el servidor es accesible, pero un servicio no. Confirma que el servicio esté escuchando, luego revisa el firewall del host y cualquier firewall de red en busca de una regla que permita ese puerto desde los orígenes correctos, y revisa los logs del firewall para encontrar conexiones descartadas. Agrega una regla específica en lugar de apagar el firewall.",
   "Las cuentas comprometidas muestran señales de advertencia: inicios de sesión a horas inusuales o desde ubicaciones inusuales, muchos inicios de sesión fallidos seguidos de uno exitoso, cuentas o membresías de grupo nuevas que nadie solicitó, herramientas de seguridad desactivadas, tareas programadas o servicios inesperados y tráfico saliente inusual. Responde según el plan de respuesta a incidentes: contén desactivando la cuenta o restableciendo las credenciales y revocando las sesiones, preserva los logs como evidencia, investiga a qué accedió la cuenta, elimina cualquier mecanismo de persistencia que haya agregado el atacante y exige MFA de ahora en adelante."
  ],
  "terms": [
   [
    "Effective permissions (permisos efectivos)",
    "El acceso real que tiene un usuario después de combinar todos los permisos de grupo, las entradas de denegación y los permisos del recurso compartido y NTFS."
   ],
   [
    "Certificate chain (cadena de certificados)",
    "El certificado del servidor más los certificados intermedios que lo vinculan con una raíz de confianza."
   ],
   [
    "False positive (falso positivo)",
    "Una herramienta de seguridad que marca como maliciosos actividades o archivos legítimos."
   ],
   [
    "Indicator of compromise (indicador de compromiso)",
    "Evidencia, como inicios de sesión inusuales o servicios desconocidos, que sugiere que un sistema o una cuenta han sido vulnerados."
   ]
  ],
  "example": "Una API interna de repente rechaza las conexiones de todos los clientes con errores de TLS. La administradora inspecciona el certificado y descubre que venció a medianoche. Lo renueva, instala la cadena completa, reinicia el servicio y agrega el certificado a las verificaciones de vencimiento del sistema de monitoreo para que alerte 30 días antes del próximo vencimiento.",
  "tip": "En los recursos compartidos, el acceso efectivo es el más restrictivo entre los permisos del recurso compartido y los NTFS, y la denegación explícita gana. Corrige los problemas de seguridad de forma específica (una regla o exclusión concreta) en lugar de desactivar el control.",
  "check": [
   [
    "El permiso del recurso compartido es Read (lectura) y el permiso NTFS es Modify (modificar). ¿Qué puede hacer un usuario en la red?",
    "Solo leer, porque el acceso efectivo a través del recurso compartido es el más restrictivo de los dos."
   ],
   [
    "Un servicio se detiene después de una actualización del antivirus, y el log muestra que su DLL se puso en cuarentena. ¿Cuál es la solución correcta?",
    "Verificar que el archivo sea legítimo, restaurarlo y agregar una exclusión específica y documentada o reportar el falso positivo, en lugar de desactivar el antivirus."
   ]
  ]
 },
 {
  "t": "Using logs, baselines and performance counters to find root cause",
  "tt": "Uso de logs, líneas base y contadores de rendimiento para encontrar la causa raíz",
  "body": [
   "Corregir un síntoma restablece un servicio, pero encontrar la causa raíz evita que el problema regrese. El análisis de la causa raíz se basa en evidencia: los logs muestran qué pasó y cuándo, los contadores de rendimiento muestran cómo se comportaron los recursos y las líneas base te dicen cómo luce lo normal para que puedas ver qué cambió.",
   "Una línea base es un registro del comportamiento normal, capturado cuando el sistema está sano. Recopila datos de rendimiento durante el tiempo suficiente para incluir los ciclos diarios y semanales, como el procesamiento de fin de mes o los respaldos nocturnos. Registra el uso típico de CPU, el uso de memoria, la latencia y la longitud de la cola de disco, el rendimiento de red y los recuentos de errores, y las medidas de la aplicación, como el tiempo de respuesta y las solicitudes por segundo. Conserva también las líneas base de configuración, para que puedas comparar la configuración actual con el estado aprobado. Sin una línea base, un 70 por ciento de CPU es solo un número; con una, sabes si es normal para las 10 a.m. de un lunes o una señal de problemas.",
   "Los contadores de rendimiento clave apuntan a cuellos de botella específicos. Para el procesador, observa la utilización y, en las máquinas virtuales, el CPU ready o steal time, que muestran a la VM esperando CPU física. Para la memoria, observa la memoria disponible y la actividad de paginación (páginas por segundo en Windows, swap in y swap out en Linux); una paginación intensa significa presión de memoria aunque la CPU se vea bien. Para el disco, observa la latencia (promedio de segundos por lectura o escritura) y la longitud de la cola; colas y latencias altas sostenidas indican que el almacenamiento no da abasto. Para la red, observa la utilización comparada con la velocidad del enlace, los errores y los descartes. Recuerda que un cuello de botella puede parecer otro: la falta de memoria provoca paginación, que aparece como carga de disco.",
   "Los logs dan la línea de tiempo. Reúne los logs de cada capa involucrada: los registros de eventos o el journal del sistema operativo, los logs de las aplicaciones, los logs de hardware del BMC y de la controladora RAID, los logs del hipervisor y los logs de los dispositivos de red y los firewalls. Correlaciónalos por hora, razón por la cual los relojes sincronizados mediante NTP son esenciales; unos pocos minutos de diferencia entre servidores hacen difícil saber qué evento ocurrió primero. El registro centralizado o un sistema SIEM (gestión de información y eventos de seguridad) recopila los logs en un solo lugar y hace práctica la búsqueda en muchos servidores.",
   "Un enfoque práctico: define el síntoma con precisión, incluido cuándo empezó. Compara los contadores actuales con la línea base para encontrar qué recurso se desvía. Busca en los logs alrededor de la hora de inicio errores, advertencias y cambios, y revisa los registros de gestión de cambios en busca de cualquier cosa implementada. Formula una teoría y pruébala, por ejemplo reproduciendo la carga o revirtiendo el cambio. Sigue preguntando por qué: un servicio falló porque se agotó la memoria; la memoria se agotó porque creció una fuga; la fuga se introdujo con la actualización de la semana pasada. La última respuesta sobre la que puedes actuar es la causa raíz.",
   "Por último, documenta el análisis, corrige la causa raíz, actualiza las líneas base si la carga de trabajo cambió de forma legítima y agrega umbrales o alertas de monitoreo para que el mismo patrón se detecte antes la próxima vez."
  ],
  "terms": [
   [
    "Root cause (causa raíz)",
    "La razón subyacente por la que ocurrió un problema y que, al corregirse, evita que se repita."
   ],
   [
    "Performance counter (contador de rendimiento)",
    "Un valor medido, como la longitud de la cola de disco o la memoria disponible, que registran el sistema operativo o las herramientas de monitoreo."
   ],
   [
    "Bottleneck (cuello de botella)",
    "El recurso que limita el rendimiento general porque está saturado."
   ],
   [
    "SIEM",
    "Security information and event management (gestión de información y eventos de seguridad): un sistema que recopila y correlaciona logs de muchas fuentes."
   ]
  ],
  "example": "Todos los martes por la tarde un servidor de informes se vuelve lento. En comparación con la línea base, la latencia de disco se triplica a las 2 p.m. mientras la CPU se mantiene normal. Los logs muestran un nuevo análisis completo del antivirus programado los martes a las 2 p.m. después de un cambio reciente de política. Mover el análisis a la noche y excluir los archivos de la base de datos de informes lo resuelve.",
  "tip": "Compara con una línea base para ver qué cambió, y correlaciona los logs por hora. Cuidado con los cuellos de botella disfrazados: la paginación intensa por poca memoria a menudo parece un problema de disco.",
  "check": [
   [
    "¿Por qué se necesita una línea base para interpretar los datos de rendimiento?",
    "Muestra cómo luce lo normal para ese sistema y ese momento, para que puedas saber si los valores actuales son anormales."
   ],
   [
    "¿Por qué importa NTP para el análisis de la causa raíz?",
    "Los relojes sincronizados te permiten correlacionar las entradas de los logs de distintos servidores en el orden correcto."
   ],
   [
    "Aparecen juntas una alta actividad de disco y poca memoria disponible. ¿Cuál podría ser el verdadero cuello de botella?",
    "La memoria, porque la falta de memoria obliga a paginar al disco, lo que aparece como carga de disco."
   ]
  ]
 }
], { lang: "es" });
