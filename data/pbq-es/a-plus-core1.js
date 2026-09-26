/* Spanish translation of the CompTIA A+ Core 1 exam simulations. Same ids and structure as data/pbq/a-plus-core1.js. */
CertHub.addPbqs("a-plus-core1", [
  { id: "mobile-connect-match", d: 1, type: "match", title: "Elige el método de conexión móvil",
    prompt: "La cola de tickets de la mesa de ayuda contiene estas solicitudes de usuarios. Relaciona cada solicitud con la tecnología o función que la resuelve.",
    pairs: [
      ["Pagar en la caja de una tienda acercando el teléfono a la terminal", "NFC"],
      ["Conectar unos audífonos inalámbricos a un teléfono", "Bluetooth"],
      ["Permitir que las laptops de tres compañeros compartan los datos 5G del teléfono por Wi-Fi", "Hotspot móvil"],
      ["Compartir los datos celulares del teléfono con una laptop mediante el cable de carga", "Anclaje USB (USB tethering)"],
      ["Activar un plan del operador en un teléfono nuevo sin insertar una tarjeta", "eSIM"],
      ["Borrar los datos de la empresa en un teléfono que se perdió en un taxi", "Borrado remoto por MDM"]
    ],
    extra: ["Modo avión", "Infrarrojo (IrDA)"],
    explain: "NFC funciona solo a unos pocos centímetros, y por eso el pago sin contacto lo usa; Bluetooth es el enlace de área personal de corto alcance para auriculares y audífonos. Un hotspot comparte los datos celulares con varios dispositivos por Wi-Fi, mientras que el tethering normalmente se refiere a un solo dispositivo por USB (o Bluetooth). Una eSIM es una SIM integrada programable que se activa con un código QR o la app del operador, y el borrado remoto es una acción de política de MDM que se envía a un dispositivo inscrito. El modo avión desactiva los radios en lugar de proporcionar una conexión."
  },
  { id: "laptop-battery-order", d: 1, type: "order", title: "Reemplaza la batería interna de una laptop",
    prompt: "La batería de la laptop de un usuario solo mantiene la carga 20 minutos. Ordena correctamente los pasos del reemplazo.",
    steps: [
      "Consulta el manual de servicio del modelo y pide la batería exacta especificada por el fabricante",
      "Apaga la laptop por completo y desconecta el adaptador de AC",
      "Ponte una pulsera antiestática (ESD) y retira los tornillos de la tapa inferior",
      "Desconecta el cable de la batería de la motherboard antes de tocar otros componentes",
      "Retira la batería vieja e instala la nueva, volviendo a conectar su cable",
      "Vuelve a colocar la tapa, conecta la alimentación de AC y verifica que la batería cargue y reporte su estado"
    ],
    explain: "La investigación va primero para que tengas la pieza correcta y conozcas el orden de desarmado. El equipo debe estar completamente apagado y desconectado antes de abrirlo, y la batería interna se desconecta en cuanto se puede alcanzar para que nada adentro tenga energía mientras trabajas. Verificar que el sistema operativo detecte la batería nueva y que esta cargue cierra el trabajo, igual que el paso final de cualquier reparación."
  },
  { id: "firewall-ports-match", d: 2, type: "match", title: "Abre los puertos correctos del firewall",
    prompt: "Estás llenando una solicitud de cambio de firewall para una oficina. Relaciona cada servicio con el o los puertos TCP/UDP predeterminados que necesita.",
    pairs: [
      ["SMTP (envío de correo entre servidores)", "25"],
      ["Resolución de nombres DNS", "53"],
      ["Asignación de direcciones DHCP", "67/68"],
      ["Recuperación de correo POP3", "110"],
      ["Recuperación de correo IMAP", "143"],
      ["Consultas de directorio LDAP", "389"],
      ["Uso compartido de archivos SMB", "445"],
      ["Remote Desktop Protocol", "3389"]
    ],
    extra: ["23", "161/162", "993"],
    explain: "Estos son los puertos predeterminados que CompTIA espera que recuerdes: SMTP 25, DNS 53, DHCP 67 (servidor) y 68 (cliente), POP3 110, IMAP 143, LDAP 389, SMB 445 y RDP 3389. Los distractores son Telnet (23), SNMP (161/162) e IMAP sobre TLS (993). Una confusión común es entre POP3 e IMAP: POP3 es el número más bajo (110) y normalmente descarga el correo, mientras que IMAP (143) mantiene el correo sincronizado en el servidor."
  },
  { id: "subnet-27-fill", d: 2, type: "fill", title: "Calcula una subred /27",
    prompt: "Una impresora está configurada con 192.168.50.100/27. Completa los datos de la subred.",
    fields: [
      { label: "Máscara de subred (decimal con puntos)", answers: ["255.255.255.224"] },
      { label: "Dirección de red", answers: ["192.168.50.96"] },
      { label: "Dirección de broadcast", answers: ["192.168.50.127"] },
      { label: "Primer host utilizable", answers: ["192.168.50.97"] },
      { label: "Último host utilizable", answers: ["192.168.50.126"] },
      { label: "Número de hosts utilizables", answers: ["30"] }
    ],
    explain: "Un /27 toma prestados 3 bits del último octeto, lo que da una máscara de 255.255.255.224 y bloques de 32 direcciones (0, 32, 64, 96, 128...). La dirección .100 cae en el bloque que empieza en .96, así que la red es .96 y el broadcast es .127. Al quitar las direcciones de red y de broadcast quedan 32 - 2 = 30 hosts utilizables, de .97 a .126."
  },
  { id: "wifi-5ghz-select", d: 2, type: "select", title: "¿Qué estándares Wi-Fi usan 5 GHz?",
    prompt: "Un cliente quiere poner todas las laptops en la banda de 5 GHz, que está menos congestionada. Con base en el inventario de abajo, selecciona cada estándar 802.11 que puede operar en la banda de 5 GHz.",
    context: "Inventario de dispositivos (adaptadores inalámbricos)\nACCT-PC01   802.11a\nACCT-PC02   802.11b\nLOBBY-KSK   802.11g\nSALES-LT03  802.11n (Wi-Fi 4)\nSALES-LT04  802.11ac (Wi-Fi 5)\nENG-LT07    802.11ax (Wi-Fi 6)",
    options: ["802.11a", "802.11b", "802.11g", "802.11n (Wi-Fi 4)", "802.11ac (Wi-Fi 5)", "802.11ax (Wi-Fi 6)"],
    answers: [0, 3, 4, 5],
    explain: "802.11a era solo de 5 GHz, 802.11n admite tanto 2.4 como 5 GHz, 802.11ac es solo de 5 GHz y 802.11ax funciona en 2.4 y 5 GHz (Wi-Fi 6E agrega 6 GHz). 802.11b y 802.11g son solo de 2.4 GHz, así que esos dos adaptadores tendrían que reemplazarse para unirse a una red solo de 5 GHz."
  },
  { id: "connector-match", d: 3, type: "match", title: "Identifica conectores por su uso",
    prompt: "Estás organizando una caja de cables en una sucursal. Relaciona cada conector con el uso que normalmente tiene.",
    pairs: [
      ["RJ45", "Ethernet de par trenzado hacia un switch"],
      ["RJ11", "Línea telefónica analógica o módem DSL"],
      ["F-type", "Cable coaxial hacia un cable módem"],
      ["LC", "Enlace de fibra óptica de factor de forma pequeño"],
      ["DisplayPort", "Video y audio digital hacia un monitor"],
      ["SATA (datos de 7 pines)", "Enlace de datos interno hacia un SSD de 2.5 pulgadas"],
      ["Molex (4 pines)", "Alimentación heredada para unidades y ventiladores antiguos"]
    ],
    extra: ["Consola serial hacia un router", "Video VGA analógico"],
    explain: "RJ45 es el conector Ethernet de par trenzado de 8 pines, mientras que el RJ11, más pequeño, lleva telefonía y DSL. El F-type se enrosca en el coaxial para internet por cable, y LC es un conector de fibra pequeño con seguro de presión (SC y ST son más grandes). DisplayPort es una interfaz digital de video/audio, el cable de datos SATA de 7 pines conecta unidades internas y el Molex de 4 pines es el conector de alimentación para periféricos más antiguo. VGA usa un DE-15 de 15 pines y los cables de consola suelen usar RJ45 o DB-9, por eso aquí son distractores."
  },
  { id: "laser-print-order", d: 3, type: "order", title: "Proceso de impresión de una impresora láser",
    prompt: "Un aprendiz necesita entender cómo una impresora láser crea una página. Ordena los pasos del proceso de impresión.",
    steps: ["Procesamiento", "Carga", "Exposición", "Revelado", "Transferencia", "Fusión", "Limpieza"],
    explain: "Primero la impresora procesa la página y la convierte en una imagen raster. Luego el tambor se carga de manera uniforme, el láser expone (descarga) la imagen sobre el tambor y el tóner se revela en las áreas expuestas. El tóner se transfiere al papel, se fija con calor y presión y, por último, el tambor se limpia del tóner y la carga sobrantes. Conocer el orden te ayuda a ubicar defectos: el tóner que se corre apunta a la fusión, y las imágenes repetidas apuntan a la limpieza o al tambor."
  },
  { id: "raid-capacity-fill", d: 3, type: "fill", title: "Calcula la capacidad RAID",
    prompt: "Un NAS de una oficina pequeña tiene cuatro discos idénticos de 4 TB. Completa la capacidad utilizable (en TB) de cada nivel RAID y el número mínimo de discos para RAID 5.",
    fields: [
      { label: "TB utilizables en RAID 0", answers: ["16", "16 TB", "16TB"] },
      { label: "TB utilizables en RAID 5", answers: ["12", "12 TB", "12TB"] },
      { label: "TB utilizables en RAID 6", answers: ["8", "8 TB", "8TB"] },
      { label: "TB utilizables en RAID 10", answers: ["8", "8 TB", "8TB"] },
      { label: "Mínimo de discos para RAID 5", answers: ["3", "tres"] }
    ],
    explain: "RAID 0 distribuye los datos en franjas (striping) entre todos los discos sin redundancia, así que obtienes los 4 x 4 = 16 TB completos. RAID 5 cede el espacio de un disco para la paridad (12 TB) y necesita al menos tres discos. RAID 6 usa el espacio de dos discos para paridad doble (8 TB) y soporta dos fallas, y RAID 10 refleja pares de discos y distribuye entre ellos, así que la mitad del espacio bruto (8 TB) es utilizable."
  },
  { id: "cloud-model-match", d: 4, type: "match", title: "Relaciona modelos y características de la nube",
    prompt: "Un gerente está revisando una propuesta de nube. Relaciona cada descripción con el término de nube que describe.",
    pairs: [
      ["Rentamos máquinas virtuales y nosotros mismos seguimos aplicando parches a los sistemas operativos invitados", "IaaS"],
      ["Los desarrolladores suben código a un runtime administrado y nunca tocan el sistema operativo", "PaaS"],
      ["El personal usa una suite de correo y ofimática basada en navegador", "SaaS"],
      ["Nuestra nube privada local se expande hacia un proveedor público a fin de mes", "Nube híbrida"],
      ["Varios hospitales regionales comparten infraestructura creada para sus reglas de cumplimiento", "Nube comunitaria"],
      ["Se agregan servidores web automáticamente cuando el tráfico se dispara y se retiran después", "Elasticidad rápida"],
      ["La factura cobra solo las horas de cómputo realmente usadas", "Uso medido"]
    ],
    extra: ["Nube pública", "Alta disponibilidad"],
    explain: "En IaaS el proveedor opera el hardware y el hipervisor, pero tú administras el sistema operativo y lo que está encima; PaaS también oculta el sistema operativo, así que solo administras código y datos; SaaS entrega una aplicación terminada. La nube híbrida combina nubes privadas y públicas, mientras que una nube comunitaria la comparten organizaciones con requisitos comunes. La elasticidad rápida es el escalado automático hacia arriba y hacia abajo, y el uso medido significa facturación por consumo."
  },
  { id: "hyperv-host-select", d: 4, type: "select", title: "¿Puede esta PC alojar las VM?",
    prompt: "Un técnico quiere que este equipo de escritorio ejecute al mismo tiempo dos VM de prueba con Windows 11 en Hyper-V, cada una con 4 GB de RAM asignados. Revisa la salida de systeminfo y selecciona cada problema que debe corregirse primero.",
    context: "OS Name:                   Microsoft Windows 11 Pro\nOS Version:                10.0.22631 N/A Build 22631\nSystem Type:               x64-based PC\nProcessor(s):              1 Processor(s) Installed.\n                           [01]: Intel64 Family 6 Model 154 ~2400 Mhz\nTotal Physical Memory:     4,096 MB\nAvailable Physical Memory: 1,212 MB\nHyper-V Requirements:      VM Monitor Mode Extensions: Yes\n                           Virtualization Enabled In Firmware: No\n                           Second Level Address Translation: Yes\n                           Data Execution Prevention Available: Yes\n\nC:\\> fsutil volume diskfree C:\nTotal free bytes  : 193,273,528,320 (180.0 GB)",
    options: [
      "La virtualización por hardware está deshabilitada en UEFI/BIOS",
      "El host no tiene suficiente RAM para las dos VM",
      "La CPU no admite Second Level Address Translation",
      "Data Execution Prevention no está disponible",
      "Windows 11 Pro no incluye Hyper-V",
      "No hay suficiente espacio libre en disco para dos discos de VM"
    ],
    answers: [0, 1],
    explain: "\"Virtualization Enabled In Firmware: No\" significa que Intel VT-x debe activarse en la configuración de UEFI antes de que Hyper-V pueda ejecutarse. El host tiene solo 4 GB en total, pero las dos VM necesitan 8 GB más la memoria del sistema operativo del host, así que hay que ampliar la RAM. SLAT y DEP aparecen como disponibles, Windows 11 Pro (a diferencia de Home) incluye Hyper-V, y 180 GB libres alcanzan para dos discos típicos de VM de prueba."
  },
  { id: "troubleshoot-method-order", d: 5, type: "order", title: "Metodología de troubleshooting de CompTIA",
    prompt: "Un usuario reporta que su estación de trabajo se reinicia al azar. Ordena correctamente los pasos de la metodología de troubleshooting de CompTIA.",
    steps: [
      "Identifica el problema preguntándole al usuario y anotando los cambios recientes",
      "Establece una teoría de la causa probable (cuestiona lo obvio)",
      "Pon a prueba la teoría para determinar la causa",
      "Establece un plan de acción para resolver el problema e implementa la solución",
      "Verifica el funcionamiento completo del sistema y, si aplica, implementa medidas preventivas",
      "Documenta los hallazgos, las acciones y los resultados"
    ],
    explain: "El método de seis pasos de CompTIA empieza por reunir información y respaldar los datos cuando sea necesario, y luego formula y prueba una teoría. Si la teoría no se confirma, formulas una nueva o escalas el caso. Solo después de confirmar la causa planificas e implementas la solución, luego verificas que todo el sistema funcione y previenes que se repita. La documentación siempre va al final para que el registro refleje lo que realmente resolvió el problema."
  },
  { id: "apipa-ipconfig-select", d: 5, type: "select", title: "Lee la salida de ipconfig en un ticket sin internet",
    prompt: "Un usuario dice que no puede acceder a ningún sitio web ni a las carpetas compartidas. Revisa la salida de ipconfig /all y selecciona cada afirmación verdadera.",
    context: "Ethernet adapter Ethernet:\n\n   Connection-specific DNS Suffix  . :\n   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM\n   Physical Address. . . . . . . . . : 00-1A-2B-3C-4D-5E\n   DHCP Enabled. . . . . . . . . . . : Yes\n   Autoconfiguration Enabled . . . . : Yes\n   Autoconfiguration IPv4 Address. . : 169.254.23.118(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . . . . . :\n   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1",
    options: [
      "La PC se asignó a sí misma una dirección APIPA porque no obtuvo una concesión DHCP",
      "El adaptador tiene enlace físico, ya que no reporta \"Media disconnected\"",
      "La PC puede llegar a otras subredes a través de su default gateway",
      "Un servidor DHCP entregó la concesión 169.254.23.118",
      "El adaptador está configurado con una dirección IP estática",
      "Una vez que se restablezca la conectividad con DHCP, ipconfig /renew debería obtener una dirección válida"
    ],
    answers: [0, 1, 5],
    explain: "Una dirección en 169.254.0.0/16 marcada como Autoconfiguration significa que Windows dejó de esperar a DHCP y usó APIPA; los servidores DHCP nunca entregan este rango, y DHCP Enabled: Yes muestra que no es estática. El adaptador mostraría Media disconnected si no hubiera enlace, así que la falla está entre la PC y el servidor DHCP (puerto del switch, VLAN, ámbito agotado o servidor caído). Sin default gateway no puede salir del segmento local, e ipconfig /renew obtendrá una concesión correcta en cuanto DHCP esté accesible."
  },
  { id: "symptom-cause-match", d: 5, type: "match", title: "Relaciona síntomas con sus causas probables",
    prompt: "Relaciona cada síntoma reportado con su causa más probable.",
    pairs: [
      ["Chasquidos fuertes en la torre, luego acceso a archivos muy lento y errores de lectura", "Disco duro fallando"],
      ["La fecha y la hora se reinician cada vez que la PC se desconecta durante la noche", "Batería CMOS agotada"],
      ["El texto impreso se corre y se borra de la página al tocarlo", "Unidad fusora defectuosa"],
      ["Una copia tenue de la imagen se repite más abajo en la página", "El tambor no se limpia correctamente (imagen fantasma)"],
      ["El touchpad de la laptop se levanta y la carcasa se está separando", "Batería de iones de litio hinchada"],
      ["La PC se apaga después de 10 minutos de juego y los ventiladores suenan muy fuerte", "Sobrecalentamiento por un disipador tapado de polvo"],
      ["No enciende, no giran los ventiladores y hay olor a quemado en la parte trasera del gabinete", "Fuente de poder dañada"]
    ],
    extra: ["Tóner bajo", "Módulo de RAM defectuoso"],
    explain: "Chasquidos más errores de lectura son la señal clásica de un disco mecánico que está fallando, así que respalda los datos de inmediato. La pérdida de fecha y hora apunta a la batería CMOS, el tóner que se borra significa que el fusor no lo está fundiendo sobre el papel, y las imágenes fantasma indican que queda tóner o carga residual en el tambor. Un touchpad o una carcasa abultados indican una batería hinchada que debe retirarse de forma segura, los apagados bajo carga intensa con ventiladores ruidosos indican sobrecalentamiento, y un olor a quemado sin encendido apunta a la PSU. El tóner bajo produce impresiones desvanecidas, no corridas."
  }
]);
