/* Spanish translation of the CompTIA Linux+ exam simulations. Same ids and structure as data/pbq/linux-plus.js. */
CertHub.addPbqs("linux-plus", [
  { id: "fhs-match", d: 1, type: "match", title: "Relaciona los directorios del FHS con su propósito",
    prompt: "Relaciona cada directorio de nivel superior con lo que, según el Filesystem Hierarchy Standard, contiene.",
    pairs: [
      ["Directorios personales de los usuarios", "/home"],
      ["Archivos de configuración de todo el sistema", "/etc"],
      ["Datos variables como logs, colas (spools) y cachés", "/var"],
      ["Imágenes del kernel y el initramfs", "/boot"],
      ["Sistema de archivos virtual que expone información de procesos y del kernel", "/proc"],
      ["Software adicional o de terceros autocontenido", "/opt"]
    ],
    extra: ["/usr", "/dev"],
    explain: "El FHS le asigna a cada tipo de dato un lugar fijo para que los administradores encuentren las cosas en cualquier distribución. La configuración vive en /etc, los datos cambiantes como logs y colas de correo en /var, y los archivos de arranque (vmlinuz, initramfs) en /boot. /proc es un sistema de archivos virtual (en memoria) con el estado de los procesos y del kernel, mientras que /opt es para software opcional empaquetado. Los distractores /usr (datos de programas compartidos de solo lectura) y /dev (nodos de dispositivos) cumplen funciones distintas." },

  { id: "subnet-26-fill", d: 1, type: "fill", title: "Lee la dirección de un host /26",
    prompt: "La interfaz eth0 de un host Linux está configurada con 192.0.2.77/26. Completa los datos de la red.",
    fields: [
      { label: "Máscara de subred (decimal con puntos)", answers: ["255.255.255.192"] },
      { label: "Dirección de red", answers: ["192.0.2.64"] },
      { label: "Dirección de broadcast", answers: ["192.0.2.127"] },
      { label: "Hosts utilizables en esta subred", answers: ["62"] }
    ],
    explain: "Un /26 toma prestados 2 bits del último octeto, lo que da la máscara 255.255.255.192 y un tamaño de bloque de 256 - 192 = 64. Los bloques empiezan en .0, .64, .128 y .192, así que .77 cae en el bloque .64: red .64 y broadcast una dirección antes del siguiente bloque, en .127. Las direcciones utilizables son 2^6 - 2 = 62 después de quitar las direcciones de red y de broadcast." },

  { id: "lvm-extend-order", d: 1, type: "order", title: "Amplía un volumen lógico hacia un disco nuevo",
    prompt: "El volumen lógico lv_data del grupo de volúmenes vg_data está casi lleno y se conectó un disco nuevo, /dev/sdc. Ordena los pasos para ampliarlo.",
    steps: [
      "pvcreate /dev/sdc para inicializar el disco nuevo como volumen físico de LVM",
      "vgextend vg_data /dev/sdc para agregar el volumen físico al grupo de volúmenes",
      "lvextend -L +50G /dev/vg_data/lv_data para agrandar el volumen lógico",
      "resize2fs /dev/vg_data/lv_data para expandir el sistema de archivos ext4 hacia el nuevo espacio"
    ],
    explain: "LVM agrupa volúmenes físicos en un grupo de volúmenes, que luego se divide en volúmenes lógicos. Debes inicializar el disco como PV, agregarlo al VG para crear extents libres y luego extender el LV antes de, finalmente, expandir el sistema de archivos que está encima. lvextend -r haría el cambio de tamaño del sistema de archivos automáticamente; aquí se muestra como un paso separado con resize2fs (xfs_growfs para XFS)." },

  { id: "fstab-recovery-order", d: 5, type: "order", title: "Recupérate de una entrada incorrecta en /etc/fstab",
    prompt: "Un error de tecleo en /etc/fstab mandó al servidor a emergency mode con / montado como solo lectura. Ordena correctamente los pasos de recuperación.",
    steps: [
      "Ingresa la contraseña de root en el prompt de emergency mode",
      "Ejecuta mount -o remount,rw / para que el sistema de archivos raíz sea escribible",
      "Edita /etc/fstab y corrige la línea defectuosa (compara los UUID con blkid)",
      "Ejecuta systemctl daemon-reload para que systemd vuelva a leer las unidades de montaje",
      "Ejecuta mount -a para probar que cada entrada se monte sin errores",
      "Reinicia para confirmar que el sistema arranca normalmente"
    ],
    explain: "Emergency mode te da una shell de root con / en solo lectura, así que debes autenticarte y volver a montarlo en lectura-escritura antes de poder editar fstab. Después de corregir la línea, recargas las unidades de montaje que genera systemd y pruebas con mount -a, lo que muestra cualquier error restante antes de arriesgarte a otro arranque fallido. El boot loader y el kernel están bien, así que no hace falta reinstalar nada." },

  { id: "perms-octal-fill", d: 5, type: "fill", title: "Traduce la salida de ls -l",
    prompt: "Con base en el listado de abajo, completa los valores solicitados.",
    context: "$ ls -l /srv/app\n-rwxr-x---. 1 deploy ops 2048 Sep 25 report.sh\n-rw-rw-r--. 1 deploy ops  512 Sep 25 config.yml",
    fields: [
      { label: "Permisos en octal de report.sh", answers: ["750"] },
      { label: "Permisos en octal de config.yml", answers: ["664"] },
      { label: "umask que produce 664 para un archivo nuevo (base predeterminada 666)", answers: ["002", "0002"] }
    ],
    explain: "Cada tríada rwx es un valor de 3 bits: rwx=7, r-x=5, ---=0, así que report.sh es 750, y rw-rw-r-- es 664 para config.yml. Los archivos regulares nuevos parten de una base de 666, y la umask resta bits; 666 con el bit de escritura quitado para other es 664, lo cual viene de una umask de 002. Los directorios, en cambio, parten de 777." },

  { id: "net-triage-select", d: 5, type: "select", title: "Diagnostica 'no puedo llegar a internet'",
    prompt: "Con base en la salida de comandos de abajo, selecciona cada afirmación VERDADERA.",
    context: "$ ping -c1 192.0.2.1        # default gateway\n64 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=0.4 ms\n$ ping -c1 198.51.100.10    # external host by IP\n64 bytes from 198.51.100.10: icmp_seq=1 ttl=117 time=12 ms\n$ ping -c1 example.com\nping: example.com: Temporary failure in name resolution\n$ cat /etc/resolv.conf\n# (file is empty)",
    options: [
      "La conectividad de capa 3 hacia internet funciona",
      "El default gateway no es accesible",
      "La resolución de nombres falla porque no hay ningún servidor DNS configurado",
      "Agregar un nameserver (con nmcli o en resolv.conf) es una solución adecuada",
      "La interfaz no tiene enlace físico",
      "El firewall está descartando todo el ICMP saliente"
    ],
    answers: [0, 2, 3],
    explain: "Los pings al gateway y a una IP externa funcionan, lo que demuestra que el enlace, la dirección, la ruta y el camino ICMP funcionan, así que el gateway es accesible y no hay bloqueo de ICMP. La única falla es 'Temporary failure in name resolution' con un /etc/resolv.conf vacío, lo que aísla la falla en DNS. La solución es configurar un resolver, idealmente de forma persistente mediante NetworkManager o netplan." },

  { id: "signals-match", d: 2, type: "match", title: "Relaciona las señales con su comportamiento",
    prompt: "Relaciona cada señal de proceso con lo que hace.",
    pairs: [
      ["SIGTERM (15)", "Solicitud amable de terminar; se puede capturar para hacer limpieza; es la predeterminada de kill"],
      ["SIGKILL (9)", "Terminación inmediata que no se puede capturar ni ignorar"],
      ["SIGHUP (1)", "Comúnmente le indica a un daemon que recargue su configuración"],
      ["SIGINT (2)", "Se envía con Ctrl+C para interrumpir un trabajo en primer plano"],
      ["SIGSTOP (19)", "Suspende un proceso; no se puede capturar ni ignorar"]
    ],
    extra: ["Reanuda un trabajo detenido en segundo plano"],
    explain: "SIGTERM es la opción predeterminada y ordenada, que permite a un programa vaciar sus búferes antes de salir, mientras que SIGKILL fuerza una salida que no se puede capturar y se usa solo cuando SIGTERM falla. Muchos daemons reutilizan SIGHUP como disparador de recarga, SIGINT es la interrupción de Ctrl+C y SIGSTOP suspende un trabajo sin terminarlo. La descripción sobrante corresponde a SIGCONT, que reanuda un proceso suspendido." },

  { id: "cron-read-fill", d: 2, type: "fill", title: "Interpreta calendarios de cron",
    prompt: "Lee las entradas de cron de abajo (campos: minuto hora día-del-mes mes día-de-la-semana) y completa las respuestas.",
    context: "# /etc/cron.d/jobs\n30 2 * * 1 root /usr/local/bin/backup.sh\n0 */6 * * * root /usr/local/bin/sync.sh\n*/15 * * * * root /usr/local/bin/check.sh",
    fields: [
      { label: "¿Cada cuántos minutos se ejecuta check.sh?", answers: ["15", "cada 15", "cada 15 minutos"] },
      { label: "¿Qué día de la semana se ejecuta backup.sh (nombre)?", answers: ["Lunes", "Lun"] },
      { label: "Primera hora del día en que se ejecuta sync.sh (número en formato de 24 horas)", answers: ["0", "00", "medianoche"] }
    ],
    explain: "*/15 en el campo de minutos ejecuta check.sh cada 15 minutos. backup.sh usa el día de la semana 1, que es lunes (0 o 7 es domingo), a las 02:30. sync.sh usa */6 en el campo de horas, así que se ejecuta a las horas 0, 6, 12 y 18, y la primera es 00:00 (medianoche). Los asteriscos significan 'todos los valores' en los campos no especificados." },

  { id: "sshd-harden-select", d: 3, type: "select", title: "Detecta directivas débiles en sshd_config",
    prompt: "El inicio de sesión con llaves ya funciona. Selecciona cada directiva de abajo que DEBILITA la seguridad y que debe cambiarse como parte del hardening de SSH.",
    context: "# /etc/ssh/sshd_config\nPort 22\nPermitRootLogin yes\nPasswordAuthentication yes\nPermitEmptyPasswords yes\nPubkeyAuthentication yes\nMaxAuthTries 3\nX11Forwarding no",
    options: [
      "PermitRootLogin yes",
      "PasswordAuthentication yes",
      "PermitEmptyPasswords yes",
      "PubkeyAuthentication yes",
      "MaxAuthTries 3",
      "X11Forwarding no"
    ],
    answers: [0, 1, 2],
    explain: "PermitRootLogin yes permite que los atacantes apunten directamente a la todopoderosa cuenta root y debe quedar en no, con los administradores usando sudo. Como las llaves ya funcionan, PasswordAuthentication yes deja abierto un camino vulnerable a fuerza bruta y debe quedar en no. PermitEmptyPasswords yes es peligroso bajo cualquier circunstancia. Las otras tres ya refuerzan el servidor: autenticación por llave pública activada, un límite bajo de reintentos y X11 forwarding desactivado." },

  { id: "git-branch-order", d: 4, type: "order", title: "Fusiona una rama de funcionalidad en el main compartido",
    prompt: "Estás aportando un cambio a una rama main compartida por medio de una rama de funcionalidad. Ordena los comandos de Git como los ejecutarías.",
    steps: [
      "git switch -c feature/login para crear una rama de funcionalidad y cambiarte a ella",
      "git add y git commit para registrar el cambio en la rama",
      "git switch main para volver a la rama main",
      "git pull para actualizar main con los commits más recientes de tus compañeros",
      "git merge feature/login para integrar la funcionalidad",
      "git push para publicar el main actualizado"
    ],
    explain: "Aíslas el trabajo en una rama de funcionalidad para que main se mantenga estable, y haces commit ahí. Antes de fusionar, vuelves a main y haces pull para integrar sobre el historial compartido más reciente, lo que reduce los conflictos. Solo entonces fusionas la funcionalidad y haces push. Trabajar el historial compartido de esta forma evita el historial reescrito que causarían git reset --hard y un force-push." }
]);
