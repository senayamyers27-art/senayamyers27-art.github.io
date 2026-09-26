/* Spanish translation of the CompTIA Server+ exam simulations. Same ids and structure as data/pbq/server-plus.js. */
CertHub.addPbqs("server-plus", [

  { id: "raid-levels-match", d: 1, type: "match", title: "Relaciona los niveles RAID con su comportamiento",
    prompt: "Relaciona cada nivel RAID (o esquema) con la descripción que mejor le corresponde.",
    pairs: [
      ["RAID 0", "Solo striping, sin tolerancia a fallas, el más rápido y con toda la capacidad utilizable"],
      ["RAID 1", "Espejo (mirroring), sobrevive a la pérdida de un disco, solo el 50% de la capacidad bruta es utilizable"],
      ["RAID 5", "Paridad distribuida simple, sobrevive a un disco, pierde la capacidad de un disco"],
      ["RAID 6", "Paridad distribuida doble, sobrevive a dos discos, pierde la capacidad de dos discos"],
      ["RAID 10", "Conjunto de espejos con striping, buena velocidad de escritura y reconstrucciones muy rápidas"]
    ],
    extra: ["Discos independientes presentados por separado, sin redundancia ni striping (JBOD)"],
    explain: "RAID 0 hace striping para ganar velocidad y capacidad, pero cualquier falla individual hace que se pierda todo. RAID 1 refleja dos discos, así que la mitad del espacio bruto es utilizable. RAID 5 usa el equivalente a un disco para paridad y tolera una falla; RAID 6 usa dos y tolera dos. RAID 10 primero refleja y luego hace striping, lo que da escrituras sin paridad y reconstrucciones rápidas, ya que un disco fallido simplemente se vuelve a copiar desde su espejo. JBOD solo expone los discos de forma individual, sin protección." },

  { id: "raid-capacity-fill", d: 1, type: "fill", title: "Calcula la capacidad RAID utilizable",
    prompt: "Un servidor tiene ocho discos de 4 TB. Ingresa la capacidad utilizable en TB para cada nivel RAID y cuántos discos pueden fallar.",
    fields: [
      { label: "Capacidad utilizable en RAID 5 (TB)", answers: ["28", "28 TB"] },
      { label: "Capacidad utilizable en RAID 6 (TB)", answers: ["24", "24 TB"] },
      { label: "Capacidad utilizable en RAID 10 (TB)", answers: ["16", "16 TB"] },
      { label: "Máximo de discos que pueden fallar en RAID 6", answers: ["2", "dos"] }
    ],
    explain: "RAID 5 pierde un disco por la paridad: (8 - 1) x 4 = 28 TB. RAID 6 pierde dos: (8 - 2) x 4 = 24 TB. RAID 10 refleja cada disco, así que queda la mitad del espacio bruto: (8 / 2) x 4 = 16 TB. La paridad doble de RAID 6 permite que fallen dos discos cualesquiera al mismo tiempo sin pérdida de datos, por eso se prefiere en arreglos grandes con reconstrucciones lentas." },

  { id: "cloud-responsibility-match", d: 2, type: "match", title: "Relaciona los modelos de nube con quién administra qué",
    prompt: "Relaciona cada modelo de implementación o de servicio con la descripción de quién es responsable de cada parte del stack.",
    pairs: [
      ["On-premises", "El cliente es dueño de todo y lo administra, incluido el hardware físico"],
      ["IaaS", "El proveedor opera el hardware y la virtualización; el cliente administra el sistema operativo y todo lo que está encima"],
      ["PaaS", "El proveedor administra hasta el runtime y el sistema operativo; el cliente solo administra el código de la app y los datos"],
      ["SaaS", "El proveedor administra todo el stack; el cliente solo configura y usa la aplicación"]
    ],
    extra: ["El proveedor administra solo el cableado de red mientras el cliente aporta todos los servidores y el software"],
    explain: "La línea de responsabilidad compartida sube por el stack conforme pasas de on-premises a IaaS, a PaaS y a SaaS. Con IaaS tú aplicas parches y aseguras el sistema operativo invitado; con PaaS la plataforma se mantiene por ti y solo eres dueño de tu código y tus datos; con SaaS consumes una aplicación terminada y administras solo su configuración y sus usuarios. On-premises deja cada capa, incluido el hardware, en manos del cliente." },

  { id: "dhcp-scope-fill", d: 2, type: "fill", title: "Planifica un ámbito DHCP en una /26",
    prompt: "Una subred es 192.168.30.0/26. El gateway toma la primera dirección utilizable y los dispositivos estáticos usan de .2 a .10. Un pool DHCP debe cubrir las direcciones utilizables restantes.",
    fields: [
      { label: "Máscara de subred (decimal con puntos)", answers: ["255.255.255.192"] },
      { label: "Dirección de broadcast", answers: ["192.168.30.63"] },
      { label: "Dirección del gateway (primera utilizable)", answers: ["192.168.30.1"] },
      { label: "Primera dirección del pool DHCP", answers: ["192.168.30.11"] },
      { label: "Última dirección del pool DHCP", answers: ["192.168.30.62"] }
    ],
    explain: "Una /26 usa una máscara 255.255.255.192 y un tamaño de bloque de 64, así que esta subred va de .0 a .63. La dirección de red es .0 y el broadcast es .63, lo que deja los hosts utilizables de .1 a .62. El gateway toma .1 y los estáticos toman de .2 a .10, así que el pool DHCP va de .11 a .62. Traslapar el pool con el rango estático provocaría conflictos de direcciones duplicadas." },

  { id: "overcommit-select", d: 2, type: "select", title: "Detecta los riesgos de capacidad de virtualización",
    prompt: "Revisa el host del hipervisor de abajo y selecciona cada afirmación VERDADERA.",
    context: "Host HV1: 32 physical CPU cores, 128 GB RAM, one 2 TB thin-provisioned datastore.\n\nVM         vCPU   RAM assigned   Disk assigned\nVM-DB      16     64 GB          800 GB\nVM-WEB      8     32 GB          200 GB\nVM-APP      8     32 GB          300 GB\nVM-TEST     8     16 GB          1.5 TB\n---------------------------------------------\nTotal      40     144 GB         2.8 TB",
    options: [
      "La RAM está sobreasignada: los 144 GB asignados superan los 128 GB instalados.",
      "Las vCPU están sobreasignadas: las 40 vCPU asignadas superan los 32 núcleos físicos.",
      "El thin provisioning limita cada disco a su tamaño actual, así que el datastore nunca se puede llenar.",
      "El disco virtual asignado (2.8 TB) supera el datastore de 2 TB, así que puede llenarse si los discos thin crecen.",
      "La sobreasignación siempre hace que las VM fallen de inmediato, sin importar el uso real.",
      "Agregar RAM física o migrar una VM fuera de HV1 aliviaría la sobreasignación de memoria."
    ],
    answers: [0, 1, 3, 5],
    explain: "La RAM asignada (144 GB) y las vCPU (40) superan los 128 GB y los 32 núcleos físicos del host, así que ambas están sobreasignadas (overcommitted). La sobreasignación es segura solo mientras las VM no exijan toda su asignación al mismo tiempo; no hace que los invitados fallen de inmediato, pero implica riesgo de contención, ballooning y swapping. Los discos thin crecen conforme se escriben datos, y 2.8 TB de disco asignado en un datastore de 2 TB pueden llenarlo de más. Agregar RAM o migrar en vivo una VM reduce la presión sobre la memoria." },

  { id: "decommission-order", d: 3, type: "order", title: "Ordena los pasos del retiro seguro",
    prompt: "Ordena correctamente estos pasos para retirar de servicio de forma segura un servidor físico.",
    steps: [
      "Revisa la clasificación de los datos y los requisitos de retención del servidor",
      "Notifica a las partes interesadas y confirma que ningún servicio siga dependiendo del servidor",
      "Realiza un respaldo final y verifica que se pueda restaurar",
      "Apaga el servidor y retíralo de la red",
      "Sanitiza los medios de almacenamiento mediante borrado, desmagnetización o triturado, según corresponda",
      "Obtén un certificado de destrucción y actualiza los registros de activos e inventario"
    ],
    explain: "El retiro de servicio empieza por saber qué datos contiene el servidor y cuánto tiempo deben conservarse, y luego confirmar que nada siga dependiendo de él. Un respaldo final verificado protege todo lo que deba conservarse antes de desconectar el equipo. Solo después de apagarlo y desconectarlo sanitizas los medios con un método adecuado al tipo de medio, y cierras con un certificado de destrucción y los registros de activos actualizados para la pista de auditoría." },

  { id: "spray-log-select", d: 3, type: "select", title: "Identifica los intentos de password spraying",
    prompt: "Selecciona cada línea del log que forma parte de un intento de password spraying.",
    context: "Mar 03 08:01:10 web01 sshd[1201]: Failed password for admin from 203.0.113.55 port 40122 ssh2\nMar 03 08:01:12 web01 sshd[1203]: Failed password for jsmith from 203.0.113.55 port 40130 ssh2\nMar 03 08:01:14 web01 sshd[1205]: Failed password for kpatel from 203.0.113.55 port 40144 ssh2\nMar 03 08:01:16 web01 sshd[1207]: Failed password for mchen from 203.0.113.55 port 40151 ssh2\nMar 03 09:22:41 web01 sshd[2044]: Accepted password for jsmith from 198.51.100.10 port 51002 ssh2\nMar 03 10:15:03 web01 sshd[3120]: Failed password for root from 198.51.100.200 port 33110 ssh2",
    options: [
      "08:01:10 Failed password for admin from 203.0.113.55",
      "08:01:12 Failed password for jsmith from 203.0.113.55",
      "08:01:14 Failed password for kpatel from 203.0.113.55",
      "08:01:16 Failed password for mchen from 203.0.113.55",
      "09:22:41 Accepted password for jsmith from 198.51.100.10",
      "10:15:03 Failed password for root from 198.51.100.200"
    ],
    answers: [0, 1, 2, 3],
    explain: "El password spraying prueba una o unas pocas contraseñas contra muchas cuentas distintas para mantenerse por debajo de los umbrales de bloqueo por cuenta. Las cuatro fallas rápidas contra admin, jsmith, kpatel y mchen, todas desde el mismo origen 203.0.113.55 en seis segundos, encajan con ese patrón. La línea Accepted es un inicio de sesión normal desde otra dirección, y una sola falla para root desde otra IP no es, por sí sola, un spraying." },

  { id: "ts-methodology-order", d: 4, type: "order", title: "Ordena los pasos de troubleshooting de CompTIA",
    prompt: "Ordena correctamente los pasos de la metodología de troubleshooting de CompTIA.",
    steps: [
      "Identifica el problema (reúne información, pregunta a los usuarios, anota los cambios recientes)",
      "Establece una teoría de la causa probable (cuestiona lo obvio)",
      "Pon a prueba la teoría para determinar la causa",
      "Establece un plan de acción para resolver el problema e identifica los posibles efectos",
      "Implementa la solución o escala según sea necesario",
      "Verifica el funcionamiento completo del sistema y, si aplica, aplica medidas preventivas",
      "Documenta los hallazgos, las acciones y los resultados"
    ],
    explain: "La metodología va de la comprensión a la acción y al cierre: identificas el problema, formulas y luego pruebas una teoría, y solo cuando la causa está confirmada planificas la solución y evalúas sus efectos secundarios. Luego implementas (o escalas), verificas que el sistema funcione por completo y agregas prevención, y terminas documentando todo para que el siguiente técnico se beneficie. Saltar a una solución antes de probar una teoría es la trampa de examen MÁS común." },

  { id: "gateway-diag-select", d: 4, type: "select", title: "Diagnostica la falla de conectividad",
    prompt: "Un servidor llega a los hosts de su propia subred, pero a nada más allá. Revisa la configuración y los síntomas y luego selecciona cada afirmación VERDADERA.",
    context: "C:\\> ipconfig /all\n   IPv4 Address . . . . . . . : 192.168.10.50\n   Subnet Mask  . . . . . . . : 255.255.255.0\n   Default Gateway  . . . . . : 192.168.1.1\n   DNS Servers  . . . . . . . : 192.168.10.5\n\nSíntomas: la resolución de nombres funciona y los hosts de 192.168.10.0/24 son accesibles, pero ninguna otra subred responde.",
    options: [
      "El default gateway 192.168.1.1 no está en la subred 192.168.10.0/24, así que el tráfico fuera de la subred no tiene un siguiente salto válido.",
      "La máscara de subred es incorrecta y debe cambiarse a /16.",
      "DNS está mal configurado, y por eso las subredes remotas no son accesibles.",
      "Configurar el gateway con una dirección dentro de la subred, como 192.168.10.1, probablemente restablecería la conectividad remota.",
      "El tráfico de la subred local funciona porque no necesita el default gateway.",
      "La causa es un desajuste de dúplex en la NIC del servidor."
    ],
    answers: [0, 3, 4],
    explain: "Con una máscara /24, la subred del host es 192.168.10.0-255, pero el gateway 192.168.1.1 queda fuera de ella, así que el host no puede hacer ARP hacia él y los paquetes fuera de la subred no tienen a dónde ir. Los hosts locales siguen funcionando porque el tráfico dentro de la misma subred se entrega directamente sin gateway. Corregir el gateway con una dirección dentro de 192.168.10.0/24 lo resuelve. DNS está bien (los nombres se resuelven), la máscara no tiene por qué ser /16, y un desajuste de dúplex degradaría todo el tráfico, no solo el de las subredes remotas." },

  { id: "linux-ts-tools-fill", d: 4, type: "fill", title: "Elige el comando de diagnóstico correcto",
    prompt: "Para cada tarea de troubleshooting, ingresa la única herramienta de línea de comandos que usarías.",
    fields: [
      { label: "Linux: mostrar por qué la unidad de systemd 'nginx' no pudo iniciar", answers: ["journalctl", "journalctl -u nginx"] },
      { label: "Linux: revisar si un volumen se quedó sin inodos", answers: ["df -i"] },
      { label: "Linux: revisar y reparar un sistema de archivos ext4 desmontado", answers: ["fsck", "e2fsck", "fsck.ext4"] },
      { label: "Linux: ver los atributos de salud SMART de un disco", answers: ["smartctl", "smartctl -a"] },
      { label: "Windows: probar si el puerto TCP 443 está abierto en un host remoto", answers: ["Test-NetConnection", "tnc"] }
    ],
    explain: "journalctl -u <unit> extrae las entradas de log propias de un servicio para que veas el error de arranque. df -i reporta el uso de inodos, que puede agotarse con muchos archivos pequeños aunque df -h muestre espacio libre. fsck (e2fsck para ext4) repara un sistema de archivos, pero solo cuando el volumen está desmontado. smartctl lee los atributos SMART de un disco, como los sectores reasignados, y Test-NetConnection (alias tnc) hace una prueba TCP para confirmar si un puerto es accesible o está bloqueado." }

]);
