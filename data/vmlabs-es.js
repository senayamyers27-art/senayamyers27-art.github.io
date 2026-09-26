/* Spanish text for the practice VM labs (data/vmlabs.js). Loaded by assets/vm.js in Spanish mode.
   Same order and number of steps and checks as the English; text inside backticks is identical. */
CertHub.vmLabsEs = {
  "users": {
    title: "Crea una cuenta de usuario de la forma correcta",
    intro: "Alex, un nuevo desarrollador, empieza hoy. Crea la cuenta con un directorio personal, el shell bash, una contraseña, una vigencia de contraseña de 90 días y membresía en el grupo de desarrolladores.",
    steps: [
      "Crea el grupo: `sudo groupadd devs`",
      "Crea el usuario con un directorio personal y bash: `sudo useradd -m -s /bin/bash -G devs alex`",
      "Establece una contraseña: `sudo passwd alex`",
      "Haz que la contraseña caduque cada 90 días: `sudo chage -M 90 alex` y luego revísalo con `sudo chage -l alex`",
      "Confirma: `id alex` y `getent passwd alex`"
    ],
    checks: [
      "El usuario alex existe",
      "El shell de alex es /bin/bash",
      "alex es dueño de un directorio personal en /home/alex",
      "alex es miembro de devs",
      "alex tiene una contraseña establecida",
      "La contraseña de alex caduca a los 90 días"
    ]
  },
  "shared-dir": {
    title: "Configura una carpeta compartida de equipo con el bit setgid",
    intro: "El equipo devs necesita /srv/projects: los miembros del equipo pueden leer y escribir, nadie más puede entrar y los archivos nuevos pertenecen automáticamente al grupo devs.",
    steps: [
      "Crea el grupo si aún no existe: `sudo groupadd devs`",
      "Crea la carpeta: `sudo mkdir -p /srv/projects`",
      "Asígnala al grupo: `sudo chown root:devs /srv/projects`",
      "Da rwx al dueño y al grupo, nada a los demás, y agrega setgid: `sudo chmod 2770 /srv/projects`",
      "Crea /srv/projects/plan.txt y haz que solo el grupo pueda leerlo: `sudo touch /srv/projects/plan.txt` y luego `sudo chmod 640 /srv/projects/plan.txt`",
      "Revisa: `ls -ld /srv/projects` muestra `drwxrws---`"
    ],
    checks: [
      "/srv/projects pertenece a root:devs",
      "El modo es 2770 (setgid, sin acceso para los demás)",
      "Los archivos nuevos heredan el grupo devs",
      "plan.txt tiene modo 640 y grupo devs"
    ]
  },
  "acl": {
    title: "Da acceso a un usuario con una ACL",
    intro: "Bob, un auditor, necesita leer /srv/report.txt. El archivo debe seguir perteneciendo a root con modo 600 para todos los demás, así que usa una lista de control de acceso en lugar de cambiar el dueño o el grupo.",
    steps: [
      "Crea el usuario: `sudo useradd -m bob`",
      "Crea el archivo: `echo 'Q3 numbers' | sudo tee /srv/report.txt` y `sudo chmod 600 /srv/report.txt`",
      "Agrega la entrada de ACL: `sudo setfacl -m u:bob:r /srv/report.txt`",
      "Revísala: `getfacl /srv/report.txt` y `sudo -u bob cat /srv/report.txt`"
    ],
    checks: [
      "report.txt sigue perteneciendo a root:root",
      "Una ACL da a bob acceso de lectura",
      "bob puede leer el archivo",
      "Los demás usuarios siguen sin poder leerlo"
    ]
  },
  "sudo": {
    title: "Delega un comando de administración con sudo",
    intro: "El equipo de operaciones puede reiniciar el servicio SSH, y nada más, sin contraseña. Concede exactamente eso, siguiendo el principio de mínimo privilegio.",
    steps: [
      "Crea el grupo y un miembro: `sudo groupadd ops` y `sudo useradd -m -G ops olivia`",
      "Crea un archivo drop-in con visudo: `sudo visudo -f /etc/sudoers.d/ops`",
      "Agrega esta línea: `%ops ALL=(root) NOPASSWD: /usr/bin/systemctl restart ssh`",
      "Revisa la sintaxis: `sudo visudo -cf /etc/sudoers.d/ops`",
      "Mira lo que olivia puede ejecutar: `sudo -l -U olivia`"
    ],
    checks: [
      "olivia está en el grupo ops",
      "/etc/sudoers.d/ops tiene una sintaxis válida",
      "Los miembros de ops pueden reiniciar ssh sin contraseña",
      "olivia no puede ejecutar todo como root"
    ]
  },
  "service": {
    title: "Escribe y habilita un servicio de systemd",
    intro: "Ejecuta un pequeño script de latido como un servicio que se inicie al arrancar, se reinicie si falla y registre su salida en el journal.",
    steps: [
      "Crea el script: `sudo vi /usr/local/bin/heartbeat.sh` con un bucle como `while true; do echo \"heartbeat $(date)\"; sleep 30; done` (empieza el archivo con `#!/bin/bash`)",
      "Hazlo ejecutable: `sudo chmod +x /usr/local/bin/heartbeat.sh`",
      "Crea la unidad: `sudo vi /etc/systemd/system/heartbeat.service` con una Description en [Unit], una sección [Service] con `ExecStart=/usr/local/bin/heartbeat.sh` y `Restart=on-failure`, y una sección [Install] con `WantedBy=multi-user.target`",
      "Cárgala, habilítala e iníciala: `sudo systemctl daemon-reload` y luego `sudo systemctl enable --now heartbeat`",
      "Revisa: `systemctl status heartbeat` y `journalctl -u heartbeat`"
    ],
    checks: [
      "/usr/local/bin/heartbeat.sh es ejecutable",
      "heartbeat.service está habilitado",
      "heartbeat.service se está ejecutando",
      "Se reinicia si falla",
      "Su salida está en el journal"
    ]
  },
  "timer": {
    title: "Programa un respaldo con un timer de systemd",
    intro: "Respalda /etc en /var/backups/etc.tar.gz cada 15 minutos con un servicio y un timer en lugar de cron.",
    steps: [
      "Crea `/etc/systemd/system/backup.service` con `Type=oneshot` y `ExecStart=/usr/bin/tar -czf /var/backups/etc.tar.gz /etc`",
      "Crea `/etc/systemd/system/backup.timer` con una sección [Timer] `OnCalendar=*:0/15` y una sección [Install] `WantedBy=timers.target`",
      "Recarga e inicia el timer: `sudo systemctl daemon-reload` y luego `sudo systemctl enable --now backup.timer`",
      "Ejecuta el respaldo una vez ahora: `sudo systemctl start backup.service`",
      "Revisa: `systemctl list-timers` y `ls -l /var/backups`"
    ],
    checks: [
      "backup.timer está habilitado",
      "backup.timer está activo",
      "Se ejecuta cada 15 minutos",
      "El archivo de respaldo existe"
    ]
  },
  "cron": {
    title: "Programa una tarea de limpieza con cron",
    intro: "Cada noche a las 02:30, elimina de /home/student/tmp los archivos que terminan en .tmp y tienen más de 7 días.",
    steps: [
      "Escribe el script: `vi ~/cleanup.sh` con `#!/bin/bash` y `find /home/student/tmp -name '*.tmp' -mtime +7 -delete`",
      "Hazlo ejecutable: `chmod +x ~/cleanup.sh`",
      "Edita tu crontab: `crontab -e` y agrega `30 2 * * * /home/student/cleanup.sh`",
      "Revisa: `crontab -l`"
    ],
    checks: [
      "/home/student/cleanup.sh es ejecutable",
      "El script usa find para eliminar archivos .tmp antiguos",
      "El crontab de student lo ejecuta todos los días a las 02:30"
    ]
  },
  "lvm": {
    title: "Crea y amplía almacenamiento con LVM",
    intro: "Junta los dos discos vacíos con LVM, crea un volumen de 60 MB para un sitio web, móntalo de forma permanente y luego amplíalo a 100 MB sin desmontarlo.",
    steps: [
      "Mira los discos: `lsblk`",
      "Convierte ambos discos en volúmenes físicos: `sudo pvcreate /dev/sda /dev/sdb`",
      "Crea un grupo de volúmenes: `sudo vgcreate vgdata /dev/sda /dev/sdb`",
      "Crea el volumen lógico: `sudo lvcreate -n lvweb -L 60M vgdata`",
      "Dale formato y móntalo: `sudo mkfs.ext4 /dev/vgdata/lvweb`, `sudo mkdir -p /srv/web`, `sudo mount /dev/vgdata/lvweb /srv/web`",
      "Hazlo permanente: agrega `/dev/vgdata/lvweb /srv/web ext4 defaults 0 2` a /etc/fstab y luego pruébalo con `sudo umount /srv/web && sudo mount -a`",
      "Amplía el volumen y el sistema de archivos a la vez: `sudo lvextend -r -L 100M /dev/vgdata/lvweb` y luego revisa con `df -h /srv/web`"
    ],
    checks: [
      "El grupo de volúmenes vgdata usa ambos discos",
      "El volumen lógico lvweb tiene al menos 100 MB",
      "Está montado en /srv/web como ext4",
      "El sistema de archivos también se amplió",
      "/etc/fstab lo monta al arrancar"
    ]
  },
  "partitions": {
    title: "Particiona un disco y agrega un sistema de archivos y swap",
    intro: "Dale a /dev/sdb una tabla de particiones GPT con una partición de datos ext4 de 40 MB montada en /data por UUID, y usa el resto como swap.",
    steps: [
      "Crea la tabla de particiones y las particiones: `sudo parted /dev/sdb mklabel gpt`, `sudo parted /dev/sdb mkpart data ext4 1MiB 41MiB`, `sudo parted /dev/sdb mkpart swap linux-swap 41MiB 100%`",
      "Da formato: `sudo mkfs.ext4 /dev/sdb1` y `sudo mkswap /dev/sdb2`",
      "Monta: `sudo mkdir -p /data` y `sudo mount /dev/sdb1 /data`",
      "Activa la swap: `sudo swapon /dev/sdb2` y luego revisa `swapon --show` y `free -m`",
      "Busca los UUID con `sudo blkid` y agrega ambos a /etc/fstab: `UUID=<data uuid> /data ext4 defaults 0 2` y `UUID=<swap uuid> none swap sw 0 0`"
    ],
    checks: [
      "/dev/sdb tiene una tabla de particiones GPT",
      "/dev/sdb1 es ext4 y está montado en /data",
      "/data está en /etc/fstab por UUID",
      "/dev/sdb2 es swap activa",
      "La swap está en /etc/fstab"
    ]
  },
  "journal": {
    title: "Conserva los logs entre reinicios y limita su tamaño",
    intro: "De forma predeterminada, este sistema guarda el journal solo en memoria. Hazlo persistente, limítalo a 50 MB y practica cómo buscar eventos.",
    steps: [
      "Crea la carpeta que hace persistente el journal: `sudo mkdir -p /var/log/journal`",
      "Limita el tamaño con un archivo drop-in: `sudo mkdir -p /etc/systemd/journald.conf.d` y crea `/etc/systemd/journald.conf.d/size.conf` con `[Journal]` y `SystemMaxUse=50M`",
      "Aplícalo: `sudo systemctl restart systemd-journald` (o `sudo journalctl --flush`)",
      "Practica: `journalctl -b -p warning`, `journalctl -u ssh --since '10 min ago'`, `journalctl -f`"
    ],
    checks: [
      "El journal se guarda en disco en /var/log/journal",
      "SystemMaxUse está configurado en 50M"
    ]
  },
  "processes": {
    title: "Encuentra, cambia la prioridad y detén procesos",
    intro: "Dos tareas de bob necesitan atención: datasync debe ejecutarse con menor prioridad (nice 15), y cleanup-old está atascado y hay que detenerlo.",
    steps: [
      "Encuéntralos: `ps aux | grep -E 'datasync|cleanup-old'` o `pgrep -a -u bob`",
      "Baja la prioridad de datasync: `sudo renice -n 15 -p <PID>`",
      "Revisa el valor nice: `ps -o pid,ni,cmd -p <PID>`",
      "Detén cleanup-old primero con cortesía: `sudo kill <PID>` (SIGTERM), y usa `kill -9` solo si no se detiene"
    ],
    checks: [
      "datasync sigue en ejecución",
      "datasync se ejecuta con nice 15",
      "cleanup-old está detenido"
    ]
  },
  "firewall": {
    title: "Protege un servidor con iptables",
    intro: "Crea un firewall que niegue todo por defecto: mantén funcionando el loopback y las conexiones existentes, permite SSH y ping, descarta todo lo demás y guarda las reglas.",
    steps: [
      "Permite el loopback: `sudo iptables -A INPUT -i lo -j ACCEPT`",
      "Permite las respuestas a las conexiones que tú iniciaste: `sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`",
      "Permite SSH: `sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT`",
      "Permite ping: `sudo iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT`",
      "Solo ahora establece la política predeterminada: `sudo iptables -P INPUT DROP`",
      "Revisa con `sudo iptables -L -v -n --line-numbers` y luego guarda: `sudo mkdir -p /etc/iptables` y `sudo iptables-save | sudo tee /etc/iptables/rules.v4`"
    ],
    checks: [
      "La política de INPUT es DROP",
      "Se permite el tráfico de loopback",
      "Se permiten las conexiones establecidas",
      "Se permite SSH (TCP 22)",
      "Las reglas están guardadas en /etc/iptables/rules.v4"
    ]
  },
  "ssh-keys": {
    title: "Inicia sesión con claves SSH y desactiva las contraseñas",
    intro: "Dos máquinas comparten una red: client (10.10.0.20) y server (10.10.0.10). Configura el inicio de sesión con claves de client a server y luego haz que server deje de aceptar contraseñas.",
    steps: [
      "En client: crea un par de claves con `ssh-keygen -t ed25519` (presiona Enter para aceptar los valores predeterminados)",
      "En client: copia la clave pública al servidor: `ssh-copy-id student@server` (contraseña: student)",
      "En client: pruébalo: `ssh student@server hostname` debe funcionar sin contraseña",
      "En server: desactiva el inicio de sesión con contraseña: `sudo vi /etc/ssh/sshd_config.d/50-keys-only.conf` con `PasswordAuthentication no`",
      "En server: revisa la configuración y recarga: `sudo sshd -t` y luego `sudo systemctl reload ssh`",
      "En client: confirma que las claves siguen funcionando: `ssh student@server hostname`"
    ],
    checks: [
      "client tiene un par de claves SSH",
      "server autoriza una clave para student",
      "El inicio de sesión con clave de client a server funciona",
      "server rechaza el inicio de sesión con contraseña",
      "El servicio SSH se está ejecutando"
    ]
  },
  "web-service": {
    title: "Sirve un sitio web a otra máquina",
    intro: "En server, publica una pequeña página web en el puerto 80 con un servicio de systemd y luego descárgala desde client.",
    steps: [
      "En server: crea la página: `sudo mkdir -p /srv/www` y `echo 'Welcome to the StudyToCert server' | sudo tee /srv/www/index.html`",
      "En server: crea `/etc/systemd/system/web.service` con `ExecStart=/usr/bin/busybox httpd -f -p 80 -h /srv/www` en [Service] y `WantedBy=multi-user.target` en [Install]",
      "En server: `sudo systemctl daemon-reload` y `sudo systemctl enable --now web`",
      "En server: confirma que está escuchando: `ss -ltnp | grep :80`",
      "En client: descárgala: `wget -qO- http://server/`"
    ],
    checks: [
      "web.service está habilitado y en ejecución",
      "Algo escucha en el puerto TCP 80",
      "client obtiene la página desde server"
    ]
  },
  "firewall-pair": {
    title: "Permite SSH solo desde un host de confianza",
    intro: "En server, permite SSH solo desde client (10.10.0.20), mantén funcionando el ping y descarta todo el resto del tráfico entrante. Pruébalo desde client.",
    steps: [
      "En server: `sudo iptables -A INPUT -i lo -j ACCEPT` y `sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`",
      "En server: `sudo iptables -A INPUT -p tcp -s 10.10.0.20 --dport 22 -j ACCEPT`",
      "En server: `sudo iptables -A INPUT -p icmp -j ACCEPT`",
      "En server: `sudo iptables -P INPUT DROP` y luego revisa con `sudo iptables -S`",
      "En client: `ping -c 2 server` y `nc -zv server 22` deben funcionar los dos"
    ],
    checks: [
      "La política de INPUT de server es DROP",
      "Se permite SSH desde 10.10.0.20",
      "Ninguna regla permite SSH desde cualquier origen",
      "client todavía puede llegar a SSH en server",
      "client todavía puede hacer ping a server"
    ]
  },
  "ssh-investigation": {
    title: "Investiga un ataque de fuerza bruta en el log de SSH",
    intro: "Una alerta indica que este servidor pudo sufrir un ataque de fuerza bruta durante la noche. El log de SSH está en /var/log/auth-review.log. Encuentra la dirección que adivinó contraseñas y logró entrar, y la cuenta que comprometió; escribe ambas en /root/incident/findings.txt; luego contén el ataque: bloquea esa dirección y bloquea la cuenta.",
    steps: [
      "Cuenta los inicios de sesión fallidos por dirección: `sudo grep 'Failed password' /var/log/auth-review.log | grep -oE 'from [0-9.]+' | sort | uniq -c | sort -rn`",
      "Busca un inicio de sesión exitoso desde una dirección que adivinaba: `sudo grep 'Accepted' /var/log/auth-review.log`",
      "Una dirección falló decenas de veces y luego entró. La otra, que solo tiene fallos, nunca entró, y 192.0.2.10 es un usuario normal que escribió mal su contraseña una vez.",
      "Registra lo que encontraste (dirección y cuenta): `echo '203.0.113.x deploy' | sudo tee /root/incident/findings.txt`, con la dirección real",
      "Bloquea la dirección: `sudo iptables -I INPUT -s <address> -j DROP` y luego guarda: `sudo mkdir -p /etc/iptables` y `sudo iptables-save | sudo tee /etc/iptables/rules.v4`",
      "Bloquea la cuenta comprometida: `sudo usermod -L deploy` (y revísalo con `sudo passwd -S deploy`, que muestra L)",
      "En un incidente real, también cerrarías las sesiones de la cuenta, revisarías lo que hizo (`last`, su historial del shell, cron) y restablecerías su contraseña."
    ],
    checks: [
      "findings.txt indica la dirección atacante",
      "findings.txt indica la cuenta comprometida",
      "El tráfico del atacante se descarta",
      "El bloqueo está guardado en /etc/iptables/rules.v4",
      "La cuenta deploy está bloqueada",
      "La dirección inocente 192.0.2.10 no está bloqueada"
    ]
  },
  "ssh-hardening": {
    title: "Refuerza el servidor SSH",
    intro: "Aplica una configuración base de seguridad a SSH: sin inicio de sesión directo de root, un máximo de 3 intentos de contraseña por conexión, 30 segundos para iniciar sesión y sin reenvío X11. Usa un archivo drop-in para que las actualizaciones de paquetes no sobrescriban tus cambios.",
    steps: [
      "Mira la configuración vigente ahora: `sudo sshd -T | grep -E 'permitrootlogin|maxauthtries|logingracetime|x11forwarding'`",
      "Crea un archivo drop-in: `sudo vi /etc/ssh/sshd_config.d/10-hardening.conf` con las líneas `PermitRootLogin no`, `MaxAuthTries 3`, `LoginGraceTime 30` y `X11Forwarding no`",
      "Los archivos de sshd_config.d se leen antes que el archivo principal, y en la mayoría de las opciones gana el primer valor, así que un drop-in tiene prioridad sobre los valores de sshd_config.",
      "Revisa la sintaxis antes de aplicar: `sudo sshd -t` (si no muestra nada, es válida)",
      "Aplícalo sin cortar las sesiones existentes: `sudo systemctl reload ssh`",
      "Confirma: vuelve a ejecutar el comando `sshd -T` del paso 1"
    ],
    checks: [
      "root no puede iniciar sesión por SSH",
      "Un máximo de 3 intentos de autenticación",
      "30 segundos para iniciar sesión",
      "El reenvío X11 está desactivado",
      "La configuración está en un archivo drop-in",
      "La configuración es válida y SSH se está ejecutando"
    ]
  },
  "file-integrity": {
    title: "Encuentra un archivo alterado con una línea base de hashes",
    intro: "Cuando se instaló la aplicación, se tomó la huella SHA-256 de sus scripts en /var/lib/app/baseline.sha256. Compáralos con la línea base, encuentra el archivo que cambió, regístralo en /root/incident/changed.txt y restaura la copia aprobada desde /opt/app/release.",
    steps: [
      "Compara cada archivo con la línea base: `sha256sum -c /var/lib/app/baseline.sha256`",
      "Una línea dice FAILED. Mira qué cambió: `diff /opt/app/release/backup.sh /opt/app/bin/backup.sh` (usa el archivo que falló)",
      "Regístralo: `echo /opt/app/bin/<file> | sudo tee /root/incident/changed.txt`",
      "Restaura la versión aprobada y conserva sus permisos: `sudo cp -p /opt/app/release/<file> /opt/app/bin/`",
      "Vuelve a revisar: `sha256sum -c /var/lib/app/baseline.sha256` debe decir OK en cada archivo",
      "Nunca corrijas una diferencia regenerando la línea base: eso aprobaría el cambio del atacante. Herramientas como AIDE y Tripwire automatizan esta misma revisión."
    ],
    checks: [
      "changed.txt indica el archivo alterado",
      "Todos los scripts vuelven a coincidir con la línea base",
      "La línea de descarga inyectada ya no está",
      "La línea base no se regeneró"
    ]
  },
  "sudo-audit": {
    title: "Audita los permisos de sudo y las cuentas",
    intro: "Una revisión trimestral de accesos encontró problemas: tempadmin todavía tiene permisos completos de root sin contraseña de un proyecto antiguo, intern se agregó al grupo sudo por error y el contrato de contractor ya terminó. Corrige los tres sin tocar la regla legítima de ops para olivia.",
    steps: [
      "Lista quién puede usar sudo: `getent group sudo` y `sudo ls -l /etc/sudoers.d/` y luego `sudo cat /etc/sudoers.d/*`",
      "Revisa los permisos de un usuario: `sudo -l -U tempadmin`",
      "Elimina la regla general de tempadmin: `sudo rm /etc/sudoers.d/90-temp` (o edítala con `sudo visudo -f /etc/sudoers.d/90-temp`)",
      "Saca a intern del grupo sudo: `sudo gpasswd -d intern sudo`",
      "Desactiva a contractor sin eliminar sus archivos: `sudo usermod -L -e 1 contractor` (bloquea la contraseña y hace caducar la cuenta)",
      "Revisa que la configuración de sudo siga siendo válida: `sudo visudo -c`",
      "Confirma que olivia sigue teniendo exactamente su único comando: `sudo -l -U olivia`"
    ],
    checks: [
      "tempadmin no tiene permisos de sudo",
      "intern no está en el grupo sudo",
      "La contraseña de contractor está bloqueada",
      "La cuenta de contractor ha caducado",
      "La configuración de sudo es válida",
      "olivia todavía puede reiniciar SSH"
    ]
  },
  "permissions-audit": {
    title: "Encuentra archivos SUID y con escritura para todos que sean riesgosos",
    intro: "Alguien dejó tres permisos riesgosos en este servidor: un programa extra que se ejecuta como root para cualquiera (SUID), un archivo de configuración que cualquiera puede cambiar y una carpeta compartida donde cualquiera puede eliminar los archivos de los demás. Encuéntralos y corrígelos sin afectar los programas SUID legítimos del sistema.",
    steps: [
      "Lista los programas SUID: `sudo find / -xdev -perm -4000 -type f 2>/dev/null`. Los normales están en /usr/bin y /usr/sbin (passwd, sudo, su, mount...). Cualquier cosa en /usr/local o en una carpeta personal merece una revisión.",
      "Quita el bit SUID de la copia de find: `sudo chmod u-s /usr/local/bin/findx` (o elimínala)",
      "Busca archivos con escritura para todos: `sudo find /etc /srv -xdev -perm -0002 ! -type l 2>/dev/null`",
      "Corrige el archivo de configuración: `sudo chown root:root /etc/app.conf` y `sudo chmod 640 /etc/app.conf`",
      "Las carpetas compartidas necesitan el sticky bit para que cada persona solo pueda eliminar sus propios archivos: `sudo chmod 1777 /srv/share` (como /tmp)",
      "Revisa tu trabajo con los dos comandos find otra vez"
    ],
    checks: [
      "No hay programas SUID en /usr/local",
      "/etc/app.conf no tiene escritura para todos",
      "/srv/share tiene el sticky bit o no tiene escritura para todos",
      "passwd y sudo siguen funcionando (SUID conservado)"
    ]
  },
  "persistence": {
    title: "Encuentra y elimina un listener desconocido",
    intro: "Un escaneo de red muestra que este servidor escucha en el puerto TCP 4444, que nada en él debería usar. Encuentra qué programa y qué servicio son dueños del puerto, anótalos en /root/incident/listener.txt y elimina el listener y todas las formas en que se reinicia solo.",
    steps: [
      "Encuentra qué está escuchando: `sudo ss -ltnp` y busca :4444 (el proceso y el PID están en la última columna)",
      "Encuentra el programa detrás del PID: `sudo ls -l /proc/<PID>/exe` y `ps -o pid,ppid,cmd -p <PID>`",
      "Encuentra el servicio: `systemctl status <PID>` indica la unidad que lo inició",
      "Registra lo que encontraste (el nombre de la unidad y el puerto): `echo 'sys-update-helper.service 4444' | sudo tee /root/incident/listener.txt`",
      "Detenlo y evita que vuelva: `sudo systemctl disable --now sys-update-helper`, luego elimina el archivo de la unidad y ejecuta `sudo systemctl daemon-reload`",
      "Busca otras formas de persistencia: `sudo crontab -l`, `ls /etc/cron.d`, `systemctl list-timers`. Elimina la línea de cron con `sudo crontab -e`.",
      "Elimina la carpeta del programa: `sudo rm -r /usr/local/lib/.sysupd` y luego confirma con `sudo ss -ltnp`"
    ],
    checks: [
      "listener.txt indica el servicio y el puerto",
      "Nada escucha en el puerto 4444",
      "El servicio está detenido y no se iniciará al arrancar",
      "La entrada de cron ya no está",
      "La carpeta del programa está eliminada",
      "SSH sigue en ejecución"
    ]
  }
};
