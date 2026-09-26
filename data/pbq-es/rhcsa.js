/* Spanish translation of the RHCSA exam simulations. Same ids and structure as data/pbq/rhcsa.js. */
CertHub.addPbqs("rhcsa", [
  { id: "perm-octal", d: 1, type: "fill", title: "Traduce requisitos de permisos a modos numéricos",
    prompt: "Debes asignar a cada ruta los permisos descritos. Completa el modo numérico (octal) que le pasarías a chmod.",
    context: "1. /opt/app/run.sh   propietario rwx, grupo r-x, otros sin acceso\n2. /srv/shared        propietario y grupo rwx, otros nada, los archivos nuevos heredan el grupo del directorio\n3. /etc/app.conf      propietario rw, grupo r, otros r\n4. /scratch           todos rwx, pero los usuarios solo pueden borrar sus propios archivos",
    fields: [
      { label: "1. /opt/app/run.sh", answers: ["750", "0750"] },
      { label: "2. /srv/shared", answers: ["2770"] },
      { label: "3. /etc/app.conf", answers: ["644", "0644"] },
      { label: "4. /scratch", answers: ["1777"] }
    ],
    explain: "Lectura=4, escritura=2, ejecución=1, sumados por usuario/grupo/otros: rwx=7, r-x=5, rw-=6, r--=4. Un cuarto dígito al inicio define los bits especiales: 4 es set-UID, 2 es set-GID (los archivos nuevos de un directorio heredan su grupo, por eso /srv/shared es 2770) y 1 es el sticky bit (solo el propietario puede borrar un archivo, como en /tmp, por eso /scratch es 1777). No confundas 2770 con 1770: el sticky bit no cambia el grupo propietario." },

  { id: "pkg-query-match", d: 2, type: "match", title: "Elige el comando correcto de rpm, dnf o flatpak",
    prompt: "Relaciona cada tarea de administración con el comando que la realiza.",
    pairs: [
      ["¿Qué paquete instalado es dueño de /etc/chrony.conf?", "rpm -qf /etc/chrony.conf"],
      ["Listar solo los archivos de configuración incluidos en openssh-server", "rpm -qc openssh-server"],
      ["Listar todos los archivos instalados por el paquete httpd", "rpm -ql httpd"],
      ["Encontrar qué paquete (instalado o no) proporciona semanage", "dnf provides '*/semanage'"],
      ["Revertir la transacción de dnf más reciente", "dnf history undo last"],
      ["Mostrar los remotes de Flatpak configurados en el sistema", "flatpak remotes"]
    ],
    extra: ["rpm -qi httpd", "dnf repolist"],
    explain: "rpm solo consulta la base de datos local: -qf relaciona un archivo con el paquete que es su dueño, -qc lista sus archivos de configuración y -ql lista todos sus archivos. dnf provides busca en los metadatos del repositorio, así que encuentra paquetes que todavía no están instalados. dnf history undo revierte una transacción por ID o con 'last'. rpm -qi muestra los detalles del paquete (versión, resumen) y dnf repolist lista los repositorios RPM habilitados, no los remotes de Flatpak." },

  { id: "script-args-fill", d: 3, type: "fill", title: "Predice la salida de un script según sus argumentos",
    prompt: "El script de abajo se ejecuta así: ./report.sh alpha \"beta gamma\" delta   Completa el valor que se imprime después de cada etiqueta.",
    context: "#!/bin/bash\necho \"count=$#\"\necho \"second=$2\"\nn=0\nfor w in $@; do\n  n=$((n+1))\ndone\necho \"words=$n\"\ntest $# -gt 3\necho \"status=$?\"",
    fields: [
      { label: "count=", answers: ["3"] },
      { label: "second=", answers: ["beta gamma"] },
      { label: "words=", answers: ["4"] },
      { label: "status=", answers: ["1"] }
    ],
    explain: "Las comillas mantienen \"beta gamma\" como un solo argumento, así que $# es 3 y $2 es 'beta gamma'. $@ sin comillas en el ciclo for se divide en palabras, lo que da alpha, beta, gamma y delta, así que el ciclo se ejecuta 4 veces; ponerlo entre comillas como \"$@\" daría 3. test 3 -gt 3 es falso, y una prueba falsa asigna 1 a $? (0 significa éxito/verdadero)." },

  { id: "root-reset-order", d: 4, type: "order", title: "Restablece una contraseña de root olvidada",
    prompt: "Nadie conoce la contraseña de root de un servidor RHEL con SELinux en modo enforcing. Ordena correctamente los pasos de recuperación.",
    steps: [
      "En el menú de GRUB presiona e y agrega rd.break a la línea que empieza con linux; luego presiona Ctrl+X",
      "mount -o remount,rw /sysroot",
      "chroot /sysroot",
      "passwd root",
      "touch /.autorelabel",
      "Escribe exit dos veces para salir del chroot y continuar el arranque"
    ],
    explain: "rd.break detiene el arranque dentro del initramfs con la raíz real montada como solo lectura en /sysroot, así que debe volver a montarse en lectura-escritura antes de hacer chroot hacia ella y cambiar la contraseña. Cambiar /etc/shadow desde el initramfs lo deja sin la etiqueta SELinux correcta, así que /.autorelabel fuerza un reetiquetado completo en el siguiente arranque; si lo omites, puede bloquearse cualquier inicio de sesión. Salir del chroot y luego de la shell de emergencia reanuda el arranque." },

  { id: "journal-match", d: 4, type: "match", title: "Elige el comando journalctl",
    prompt: "Relaciona cada necesidad de lectura de logs con el comando journalctl que la resuelve.",
    pairs: [
      ["Todos los mensajes solo del arranque actual", "journalctl -b"],
      ["Errores y peores del arranque anterior", "journalctl -b -1 -p err"],
      ["Ver en vivo los mensajes de sshd conforme llegan", "journalctl -u sshd -f"],
      ["Mensajes desde las 09:00 de hoy", "journalctl --since 09:00"],
      ["Solo mensajes del kernel", "journalctl -k"]
    ],
    extra: ["journalctl -p info", "journalctl --vacuum-size=100M"],
    explain: "-b limita la salida a un arranque (-b -1 es el anterior, que solo existe si el journal es persistente en /var/log/journal), -p err muestra la prioridad err y las más graves, -u filtra por unidad de systemd y -f sigue las entradas nuevas, --since acepta una hora o fecha, y -k muestra los mensajes del kernel. -p info incluiría casi todo, y --vacuum-size borra archivos viejos del journal en lugar de leerlos." },

  { id: "lvm-build-order", d: 5, type: "order", title: "Crea un volumen lógico XFS persistente",
    prompt: "Un disco nuevo y vacío, /dev/vdb, debe alojar un volumen lógico de 2 GiB llamado lvdata en el grupo de volúmenes vgdata, montado en /data en cada arranque. Ordena los pasos.",
    steps: [
      "parted /dev/vdb mklabel gpt, luego mkpart y set 1 lvm on",
      "pvcreate /dev/vdb1",
      "vgcreate vgdata /dev/vdb1",
      "lvcreate -n lvdata -L 2G vgdata",
      "mkfs.xfs /dev/vgdata/lvdata",
      "mkdir /data y agrega el UUID del dispositivo a /etc/fstab",
      "systemctl daemon-reload, luego mount -a y verifica con findmnt /data"
    ],
    explain: "LVM se construye de abajo hacia arriba: una partición (marcada para LVM) se convierte en volumen físico, los PV forman un grupo de volúmenes y los volúmenes lógicos se crean a partir del VG. El sistema de archivos va en el LV, no en el PV. Solo después de mkfs el dispositivo tiene un UUID para /etc/fstab. Ejecutar mount -a prueba la entrada de fstab en ese momento, así que un error de tecleo aparece antes de reiniciar en lugar de mandar el equipo a emergency mode." },

  { id: "lvm-extent-fill", d: 5, type: "fill", title: "Calcula tamaños de extents de LVM",
    prompt: "El grupo de volúmenes vgdata se creó con vgcreate -s 8M. Responde usando MiB (solo números) o cantidades de extents.",
    context: "# vgcreate -s 8M vgdata /dev/vdb1\n# lvcreate -n lvapp -l 60 vgdata\n# lvcreate -n lvlog -L 100M vgdata\n  Rounding up size to full physical extent ...",
    fields: [
      { label: "Tamaño de lvapp en MiB", answers: ["480", "480M", "480MiB", "480 MiB"] },
      { label: "Número de extents que usa lvlog", answers: ["13"] },
      { label: "Tamaño real de lvlog en MiB", answers: ["104", "104M", "104MiB", "104 MiB"] }
    ],
    explain: "-l recibe una cantidad de extents, así que 60 x 8 MiB = 480 MiB. -L recibe un tamaño, y LVM redondea hacia arriba a un número entero de extents: 100 / 8 = 12.5, así que asigna 13 extents, que son 104 MiB. Las tareas del examen suelen dar el tamaño y la cantidad de extents, así que lee con cuidado -s, -l y -L." },

  { id: "fstab-select", d: 6, type: "select", title: "Encuentra las entradas dañadas de /etc/fstab",
    prompt: "Un administrador editó /etc/fstab. Selecciona cada línea que no se podrá montar (o que findmnt --verify reportará como error).",
    context: "1  UUID=5b0d2c1e-7f3a-4c11-9a2e-0c1d2e3f4a5b  /          xfs    defaults          0 0\n2  /dev/mapper/vgdata-lvdata                  /data      xfs    defaults          0 0\n3  UUID=9e8d7c6b-5a49-4382-a1b0-c9d8e7f6a5b4  none       swap   defaults          0 0\n4  192.168.50.10:/exports/home                /mnt/home  nfs    defaults,_netdev  0 0\n5  /dev/vdb1                                  /backup    ext4   default           0 2\n6  LABEL=archive                              archive    xfs    defaults          0 0",
    options: ["Línea 1 (sistema de archivos raíz por UUID)", "Línea 2 (ruta de dispositivo LVM)", "Línea 3 (swap con punto de montaje none)", "Línea 4 (export NFS con _netdev)", "Línea 5 (/backup ext4)", "Línea 6 (LABEL=archive)"],
    answers: [4, 5],
    explain: "La línea 5 usa la opción 'default', que no es una opción de montaje (la palabra clave es 'defaults'), así que el montaje falla. La línea 6 tiene un punto de montaje relativo, 'archive'; el segundo campo debe ser una ruta absoluta, como /archive. Las entradas de swap usan 'none' (o 'swap') como punto de montaje, las rutas /dev/mapper son estables para los LV y _netdev marca correctamente un montaje de red. Siempre prueba con mount -a o findmnt --verify antes de reiniciar." },

  { id: "cron-fill", d: 7, type: "fill", title: "Programa un trabajo de cron entre semana",
    prompt: "La usuaria alice necesita que /home/alice/bin/sync.sh se ejecute a las 02:30 cada lunes a viernes. Completa los campos del crontab y el comando que usa root para editar su crontab.",
    context: "# crontab line format:\n# minute  hour  day-of-month  month  day-of-week  command\n  ___     ___   *             *      ___          /home/alice/bin/sync.sh",
    fields: [
      { label: "minuto (minute)", answers: ["30"] },
      { label: "hora (hour)", answers: ["2", "02"] },
      { label: "día de la semana (day-of-week)", answers: ["1-5", "mon-fri", "1,2,3,4,5"] },
      { label: "Comando que ejecuta root para editar el crontab de alice", answers: ["crontab -e -u alice", "crontab -u alice -e"] }
    ],
    explain: "Los campos de cron son minuto, hora, día del mes, mes y día de la semana, así que 02:30 es '30 2' y los días hábiles son 1-5 (0 y 7 son domingo). Un error común es escribir '2 30', que cron rechaza porque la hora debe estar entre 0 y 23. crontab -u alice -e edita su crontab personal en /var/spool/cron; un systemd timer con OnCalendar=Mon..Fri 02:30 es la alternativa." },

  { id: "nmcli-match", d: 8, type: "match", title: "Tareas de red y sus comandos",
    prompt: "Server1 debe usar una dirección estática en la conexión eth0 y resolver nombres correctamente. Relaciona cada tarea con su comando.",
    pairs: [
      ["Definir el hostname persistente del sistema", "hostnamectl set-hostname server1.example.com"],
      ["Definir la dirección IPv4 estática y el prefijo", "nmcli con mod eth0 ipv4.addresses 192.168.50.10/24"],
      ["Dejar de usar DHCP en el perfil", "nmcli con mod eth0 ipv4.method manual"],
      ["Definir el servidor DNS del perfil", "nmcli con mod eth0 ipv4.dns 192.168.50.1"],
      ["Activar ahora el perfil modificado", "nmcli con up eth0"],
      ["Verificar la resolución de nombres mediante /etc/hosts y DNS", "getent hosts server2.example.com"]
    ],
    extra: ["nmcli con reload", "ip addr add 192.168.50.10/24 dev eth0"],
    explain: "nmcli con mod solo cambia el perfil guardado (un keyfile en /etc/NetworkManager/system-connections en RHEL 10); nmcli con up lo aplica. ip addr add cambia la interfaz en ejecución, pero el cambio se pierde al reiniciar, y nmcli con reload solo vuelve a leer los archivos editados a mano. getent hosts sigue /etc/nsswitch.conf, así que revisa /etc/hosts además de DNS, a diferencia de dig o nslookup." },

  { id: "login-select", d: 9, type: "select", title: "Identifica las cuentas que no pueden iniciar sesión con contraseña",
    prompt: "Con base en los fragmentos de abajo, selecciona cada cuenta que no puede obtener un inicio de sesión interactivo con contraseña.",
    context: "/etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nalice:x:1001:1001:Alice Admin:/home/alice:/bin/bash\nbob:x:1002:1002:Bob:/home/bob:/bin/bash\ncarol:x:1003:1003::/home/carol:/bin/false\napache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin\nsvcbackup:x:985:985::/var/lib/backup:/sbin/nologin\n\n/etc/shadow (hashes acortados)\nroot:$6$Xy...:20350:0:99999:7:::\nalice:$6$Ab...:20351:0:90:7:::\nbob:!$6$Cd...:20340:0:99999:7:::",
    options: ["root", "alice", "bob", "carol", "apache", "svcbackup"],
    answers: [2, 3, 4, 5],
    explain: "Un '!' al inicio del hash en shadow significa que la contraseña está bloqueada (usermod -L o passwd -l), así que la contraseña de bob no puede coincidir. La shell de carol, /bin/false, sale de inmediato, y /sbin/nologin imprime un rechazo y sale, lo cual es lo estándar para cuentas de servicio como apache y svcbackup. La antigüedad máxima de 90 días de alice solo obliga a cambiar la contraseña más adelante; no bloquea el inicio de sesión hoy." },

  { id: "selinux-cmd-match", d: 10, type: "match", title: "Comandos para tareas de SELinux y firewall",
    prompt: "httpd debe servir contenido en TCP 8088 con SELinux en modo enforcing. Relaciona cada tarea con su comando.",
    pairs: [
      ["Permitir que httpd se enlace a TCP 8088", "semanage port -a -t http_port_t -p tcp 8088"],
      ["Abrir TCP 8088 en el firewall de forma permanente", "firewall-cmd --permanent --add-port=8088/tcp"],
      ["Permitir conexiones de red salientes de httpd, de forma que sobreviva al reinicio", "setsebool -P httpd_can_network_connect on"],
      ["Mostrar el modo actual de SELinux", "getenforce"],
      ["Restablecer las etiquetas bajo /web a los valores predeterminados de la política", "restorecon -Rv /web"],
      ["Encontrar las denegaciones recientes de SELinux", "ausearch -m AVC -ts recent"]
    ],
    extra: ["setenforce 0", "chcon -R -t httpd_sys_content_t /web"],
    explain: "SELinux controla a qué puertos se puede enlazar un dominio, así que un puerto no estándar necesita una etiqueta con semanage port; firewalld es una capa aparte y también necesita que se abra el puerto (y luego --reload). setsebool -P escribe el booleano de forma permanente. restorecon aplica las etiquetas definidas en la política, y ausearch -m AVC extrae las denegaciones de /var/log/audit/audit.log. setenforce 0 solo cambia a modo permissive, lo cual no es una solución." },

  { id: "avc-web-select", d: 10, type: "select", title: "Corrige una denegación de SELinux en una raíz web",
    prompt: "httpd devuelve 403 para las páginas de /web. Selecciona los comandos que, en conjunto, corrigen esto de forma persistente manteniendo SELinux en modo enforcing.",
    context: "# ls -Zd /web /web/index.html\nunconfined_u:object_r:default_t:s0 /web\nunconfined_u:object_r:default_t:s0 /web/index.html\n\n# ausearch -m AVC -ts recent\ntype=AVC msg=audit(1758790000.123:412): avc:  denied  { getattr } for  pid=2211 comm=\"httpd\" path=\"/web/index.html\" dev=\"vda3\" ino=33620 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:default_t:s0 tclass=file permissive=0",
    options: [
      "semanage fcontext -a -t httpd_sys_content_t \"/web(/.*)?\"",
      "restorecon -Rv /web",
      "setenforce 0",
      "chcon -R -t httpd_sys_content_t /web",
      "chmod -R 777 /web",
      "setsebool -P httpd_read_user_content on",
      "semanage port -a -t http_port_t -p tcp 80"
    ],
    answers: [0, 1],
    explain: "El AVC muestra que a httpd_t se le deniega el acceso a un archivo etiquetado como default_t, así que la solución es una etiqueta, no permisos. semanage fcontext agrega una regla a la política y restorecon la aplica, así que la etiqueta sobrevive a un reetiquetado. chcon funciona solo hasta el siguiente restorecon o autorelabel, setenforce 0 desactiva la protección, chmod 777 no resuelve lo de SELinux, el booleano de contenido de usuario es para directorios personales y el puerto 80 ya está etiquetado como http_port_t." },

  { id: "umask-fill", d: 10, type: "fill", title: "Calcula permisos a partir de una umask",
    prompt: "El ~/.bashrc de un usuario define umask 027. Completa los permisos de un archivo nuevo y de un directorio nuevo que cree este usuario.",
    context: "$ umask 027\n$ touch report.txt\n$ mkdir project\n$ ls -ld report.txt project",
    fields: [
      { label: "Modo numérico de report.txt", answers: ["640", "0640"] },
      { label: "Modo simbólico de report.txt", answers: ["rw-r-----", "-rw-r-----"] },
      { label: "Modo numérico de project", answers: ["750", "0750"] }
    ],
    explain: "Los archivos nuevos parten de 666 y los directorios nuevos de 777, y se quitan los bits de la umask. 666 menos 027 da 640 (rw-r-----), y 777 menos 027 da 750 (rwxr-x---). Los archivos nunca obtienen permiso de ejecución por defecto porque 666 no tiene bits x; la umask solo puede quitar permisos." }
]);
