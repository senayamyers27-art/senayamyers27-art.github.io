/* Spanish translation of the CompTIA A+ Core 2 exam simulations. Same ids and structure as data/pbq/a-plus-core2.js. */
CertHub.addPbqs("a-plus-core2", [
  { id: "cmd-tool-match", d: 1, type: "match", title: "Relaciona comandos de Windows con tareas de soporte",
    prompt: "La cola de tickets de la mesa de ayuda muestra las tareas de abajo. Relaciona cada tarea con la herramienta de línea de comandos de Windows que la realiza.",
    pairs: [
      ["Reparar archivos protegidos del sistema que se dañaron o fueron reemplazados", "sfc /scannow"],
      ["Reparar la imagen del almacén de componentes de Windows antes de ejecutar una verificación de archivos", "DISM /Online /Cleanup-Image /RestoreHealth"],
      ["Aplicar la configuración de Group Policy recién cambiada sin reiniciar", "gpupdate /force"],
      ["Mostrar qué objetos de Group Policy se aplicaron al usuario actual", "gpresult /r"],
      ["Copiar un árbol de carpetas con reintentos y reflejarlo en un nuevo servidor de archivos", "robocopy"],
      ["Analizar un volumen en busca de errores del sistema de archivos y sectores defectuosos", "chkdsk /r"]
    ],
    extra: ["diskpart", "netstat -ano"],
    explain: "sfc revisa y restaura los archivos protegidos del sistema, mientras que DISM repara el almacén de componentes del que sfc copia los archivos limpios, así que ejecuta DISM primero cuando sfc no logre arreglar las cosas. gpupdate aplica las políticas y gpresult reporta lo que se aplicó. robocopy es la herramienta de copia robusta que admite reintentos y el reflejo con /MIR, y chkdsk /r encuentra sectores defectuosos y corrige errores del sistema de archivos. diskpart administra particiones y netstat muestra conexiones, así que ninguno encaja en estas tareas." },

  { id: "ipconfig-read", d: 1, type: "fill", title: "Lee la salida de ipconfig /all",
    prompt: "Un usuario dice que no puede acceder a sitios web. Lee la salida de ipconfig /all y completa los valores.",
    context: "Ethernet adapter Ethernet:\n   Connection-specific DNS Suffix  . : corp.example.com\n   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM\n   Physical Address. . . . . . . . . : 3C-52-82-1A-4F-9B\n   DHCP Enabled. . . . . . . . . . . : Yes\n   Autoconfiguration Enabled . . . . : Yes\n   Autoconfiguration IPv4 Address. . : 169.254.23.118(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . . . . . :\n   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1",
    fields: [
      { label: "Dirección IPv4 que está usando la PC", answers: ["169.254.23.118"] },
      { label: "Nombre de este tipo de dirección (cinco letras)", answers: ["APIPA"] },
      { label: "Dirección MAC del adaptador", answers: ["3C-52-82-1A-4F-9B", "3c:52:82:1a:4f:9b", "3c52821a4f9b"] },
      { label: "Comando para solicitar una nueva concesión después de corregir el problema de DHCP", answers: ["ipconfig /renew", "ipconfig/renew"] }
    ],
    explain: "Una dirección 169.254.x.x sin default gateway es una dirección autoasignada APIPA (Automatic Private IP Addressing), que Windows usa cuando DHCP está habilitado pero ningún servidor DHCP responde. El host solo puede comunicarse con otros hosts APIPA del mismo segmento, así que el acceso web falla. Revisa el cableado, el puerto del switch y el servidor DHCP, y luego ejecuta ipconfig /release e ipconfig /renew para obtener una concesión real." },

  { id: "filesystem-match", d: 1, type: "match", title: "Elige el sistema de archivos correcto",
    prompt: "Relaciona cada escenario de almacenamiento con el sistema de archivos más adecuado.",
    pairs: [
      ["Unidad del sistema de Windows 11 que necesita BitLocker y permisos NTFS", "NTFS"],
      ["Memoria USB de 128 GB que debe mover archivos de video de 20 GB entre una Mac y una PC con Windows", "exFAT"],
      ["SSD interno de una MacBook nueva con la versión actual de macOS", "APFS"],
      ["Partición raíz de un servidor Ubuntu", "ext4"],
      ["Memoria flash vieja de 8 GB para un dispositivo que solo admite archivos de menos de 4 GB", "FAT32"]
    ],
    extra: ["ReFS", "HFS+"],
    explain: "NTFS es el sistema de archivos del sistema en Windows y admite permisos, cifrado y BitLocker. exFAT se lee y escribe de forma nativa tanto en Windows como en macOS y no tiene el límite de 4 GB por archivo, a diferencia de FAT32, que se conserva para la máxima compatibilidad con dispositivos antiguos. APFS es el predeterminado en macOS moderno sobre SSD, y ext4 es el predeterminado común en distribuciones Linux como Ubuntu. ReFS está pensado para la resiliencia del almacenamiento en servidores Windows, no para estos escenarios." },

  { id: "malware-removal-order", d: 2, type: "order", title: "Procedimiento de eliminación de malware",
    prompt: "La PC de un usuario muestra ventanas emergentes y un navegador que redirige a páginas de búsqueda desconocidas. Ordena los pasos de eliminación de malware según las mejores prácticas de CompTIA.",
    steps: [
      "Investiga y verifica los síntomas de malware",
      "Pon en cuarentena el sistema infectado aislándolo de la red",
      "Deshabilita System Restore en Windows",
      "Remedia: actualiza las definiciones antimalware y ejecuta los análisis y la eliminación",
      "Programa análisis y ejecuta actualizaciones",
      "Habilita System Restore y crea un nuevo punto de restauración",
      "Capacita al usuario final"
    ],
    explain: "Primero confirmas que realmente se trata de malware y luego aíslas el equipo para que no se propague. System Restore se deshabilita antes de limpiar para que los puntos de restauración infectados no puedan reinfectar el sistema más adelante. Después de la remediación y de programar los análisis, System Restore se vuelve a activar con un punto de restauración nuevo y limpio y, por último, se le enseña al usuario cómo evitar la infección la próxima vez." },

  { id: "malware-symptom-match", d: 2, type: "match", title: "Identifica tipos de malware por sus síntomas",
    prompt: "Relaciona cada síntoma observado con el tipo de malware que más probablemente indica.",
    pairs: [
      ["Los archivos de una unidad compartida mapeada se renombran con la extensión .locked y una nota exige un pago", "Ransomware"],
      ["El instalador de un juego gratuito también abrió una conexión oculta de acceso remoto", "Troyano"],
      ["El antivirus no puede ver un proceso que claramente usa CPU; el malware se carga antes que el sistema operativo", "Rootkit"],
      ["Una auditoría de seguridad descubre que cada contraseña tecleada se escribe en un archivo oculto", "Keylogger"],
      ["La PC envía spam y se une a ataques cuando se lo ordena un servidor remoto", "Botnet"]
    ],
    extra: ["Adware", "Spyware"],
    explain: "El ransomware cifra los datos y exige un pago. Un troyano esconde código malicioso dentro de algo que el usuario quiere instalar. Los rootkits se ocultan a bajo nivel, a veces cargándose antes que el sistema operativo, así que las herramientas normales no los ven. Los keyloggers registran las pulsaciones de teclas, y un miembro de una botnet (zombie) recibe órdenes de un servidor de comando y control. El adware muestra anuncios no deseados y el spyware vigila la actividad del usuario de forma más amplia, pero ninguno es la MEJOR opción aquí." },

  { id: "logon-failure-log", d: 2, type: "select", title: "Detecta un intento de fuerza bruta en Event Viewer",
    prompt: "Revisa el registro de seguridad de Windows filtrado de una PC de recepción. Selecciona cada entrada que sea evidencia de un intento de fuerza bruta contra una cuenta local.",
    context: "Time      Event ID  Account        Source workstation  Logon type  Status\n08:01:12  4624      jsmith         RECEPT-01           2           Success\n08:14:40  4625      Administrator  192.168.1.77        3           Bad password\n08:14:41  4625      Administrator  192.168.1.77        3           Bad password\n08:14:42  4625      Administrator  192.168.1.77        3           Bad password\n08:14:43  4740      Administrator  -                   -           Account locked out\n09:02:05  4625      jsmith         RECEPT-01           2           Bad password\n09:02:15  4624      jsmith         RECEPT-01           2           Success\n12:30:00  4634      jsmith         RECEPT-01           2           Logoff",
    options: [
      "08:01:12 4624 jsmith, inicio de sesión interactivo exitoso",
      "08:14:40 4625 Administrator desde 192.168.1.77",
      "08:14:41 4625 Administrator desde 192.168.1.77",
      "08:14:42 4625 Administrator desde 192.168.1.77",
      "08:14:43 4740 cuenta Administrator bloqueada",
      "09:02:05 4625 jsmith, un solo error de tecleo en la consola",
      "09:02:15 4624 jsmith, inicio de sesión interactivo exitoso",
      "12:30:00 4634 jsmith, cierre de sesión"
    ],
    answers: [1, 2, 3, 4],
    explain: "El evento 4625 es un inicio de sesión fallido y el 4740 es un bloqueo de cuenta. Tres fallas con un segundo de diferencia contra Administrator por la red (logon type 3) desde otro host, seguidas de un bloqueo, son un patrón de adivinación automatizado. Un solo inicio de sesión fallido en la consola (type 2) seguido de uno exitoso unos segundos después es un error de tecleo normal, y 4624 y 4634 son eventos rutinarios de inicio y cierre de sesión." },

  { id: "phone-slow-select", d: 3, type: "select", title: "Dispositivo móvil posiblemente comprometido",
    prompt: "El teléfono Android de la empresa de un usuario se volvió lento. Revisa el resumen de uso de batería y de datos y selecciona cada elemento que sugiere una app maliciosa o no deseada.",
    context: "Battery use since full charge (6 h):\n  Screen                 18%\n  FlashLight Pro (sideloaded APK, installed 2 days ago)  41%\n  Mail                    9%\n  Maps                    6%\nMobile data this month:\n  FlashLight Pro          3.8 GB  (background: 3.7 GB)\n  YouTube                 2.1 GB  (background: 0.0 GB)\n  Mail                    120 MB\nPermissions for FlashLight Pro: Camera, SMS, Contacts, Location (always), Device admin",
    options: [
      "FlashLight Pro usa el 41% de la batería",
      "FlashLight Pro envió 3.7 GB de datos en segundo plano",
      "FlashLight Pro se instaló por sideloading en lugar de hacerlo desde la tienda de apps administrada",
      "FlashLight Pro tiene permisos de SMS, Contacts y Device admin",
      "YouTube usó 2.1 GB de datos móviles en primer plano",
      "La pantalla representa el 18% del uso de batería"
    ],
    answers: [0, 1, 2, 3],
    explain: "El alto consumo de batería, el uso intenso de datos en segundo plano, la instalación desde una fuente no confiable y permisos que van mucho más allá de lo que necesita una linterna son señales clásicas de una app maliciosa. La solución es revocar el permiso de administrador del dispositivo, desinstalar la app, analizar el dispositivo y reportarlo según la política. El streaming de YouTube en primer plano explica su uso de datos, y que la pantalla sea uno de los principales consumidores de batería es normal." },

  { id: "symptom-fix-match", d: 3, type: "match", title: "Relaciona problemas de Windows con la primera solución",
    prompt: "Relaciona cada síntoma de Windows con el primer paso de troubleshooting más adecuado.",
    pairs: [
      ["Los errores de detención (stop errors) empezaron justo después de instalar un nuevo driver de gráficos", "Revertir el driver en Device Manager"],
      ["La PC tarda cinco minutos en mostrar un escritorio utilizable después de iniciar sesión", "Deshabilitar las apps de inicio innecesarias en Task Manager"],
      ["Una aplicación falla al abrirse después de una actualización fallida", "Reparar o reinstalar la aplicación"],
      ["Windows no arranca después de una actualización y Safe Mode también falla", "Usar Startup Repair desde Windows Recovery Environment"],
      ["Solo el perfil de un usuario carga un escritorio temporal", "Reconstruir el perfil del usuario"]
    ],
    extra: ["Reinstalar la imagen de la PC de inmediato", "Reemplazar el disco duro"],
    explain: "Un problema que empieza justo después de un cambio de driver apunta a ese driver, así que reviértelo. Los inicios de sesión lentos suelen deberse a demasiados elementos de inicio. Una sola aplicación dañada se repara o se reinstala, un sistema que no arranca usa herramientas de WinRE como Startup Repair o la desinstalación de la actualización, y un problema de perfil temporal afecta a un usuario y se corrige reconstruyendo ese perfil. Reinstalar la imagen o reemplazar hardware viene después, cuando fallan los pasos menos disruptivos." },

  { id: "change-mgmt-order", d: 4, type: "order", title: "Flujo de trabajo de change management",
    prompt: "TI necesita actualizar el sistema operativo del servidor de contabilidad. Ordena los pasos de change management.",
    steps: [
      "Envía una solicitud de cambio que describa el propósito y el alcance",
      "Realiza un análisis de riesgos y redacta un plan de reversión (backout plan)",
      "Obtén la aprobación del comité asesor de cambios",
      "Implementa el cambio durante la ventana de mantenimiento programada",
      "Confirma la aceptación del usuario final de que el sistema funciona",
      "Documenta el cambio y cierra la solicitud"
    ],
    explain: "El change management empieza con una solicitud formal que indica por qué se necesita el cambio y a qué afecta. El análisis de riesgos y el backout plan se preparan para que el comité asesor de cambios (CAB) pueda tomar una decisión informada. Solo un cambio aprobado se implementa, en una ventana acordada, y los usuarios confirman que funciona antes de documentar y cerrar el cambio." },

  { id: "backup-restore-fill", d: 4, type: "fill", title: "Calcula los juegos de respaldo para una restauración",
    prompt: "El disco de un servidor de archivos falla el jueves por la mañana, antes de que se ejecute el respaldo de esa noche. Usa el calendario de respaldos para indicar cuántos juegos de respaldo deben restaurarse.",
    context: "Calendario de respaldos (se ejecuta a las 23:00):\nDomingo     Respaldo completo\nLunes       Tarea diaria\nMartes      Tarea diaria\nMiércoles   Tarea diaria\nJueves      Tarea diaria (aún no se ejecuta)",
    fields: [
      { label: "Juegos a restaurar si las tareas diarias son incrementales", answers: ["4", "cuatro"] },
      { label: "Juegos a restaurar si las tareas diarias son diferenciales", answers: ["2", "dos"] },
      { label: "Qué tipo diario tarda más en respaldar cada noche conforme avanza la semana (incremental o diferencial)", answers: ["diferencial"] }
    ],
    explain: "Los respaldos incrementales solo copian los cambios desde el último respaldo de cualquier tipo, así que una restauración necesita el respaldo completo más cada incremental posterior: domingo, lunes, martes y miércoles, cuatro juegos. Un diferencial copia todos los cambios desde el último respaldo completo, así que solo necesitas el completo del domingo y el diferencial del miércoles, dos juegos. Por eso los diferenciales se vuelven más grandes y lentos cada noche, mientras que restaurarlos es más rápido." }
]);
