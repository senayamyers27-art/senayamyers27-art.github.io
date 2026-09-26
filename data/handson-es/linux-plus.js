/* Spanish text for the CompTIA Linux+ hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/linux-plus.js. */
CertHub.addHandsonEs("linux-plus", {
  "lp-config-backup": {
    title: "Respalda un archivo de configuración antes de editarlo",
    prompt: "Estás a punto de cambiar la configuración del daemon de SSH y primero quieres una copia segura.\n\nCrea el directorio `/root/backup` y luego copia `/etc/ssh/sshd_config` dentro de él como `sshd_config.bak`. El archivo original debe quedarse donde está.",
    hint: "Crea primero el directorio y luego usa cp con una ruta de destino completa que incluya el nuevo nombre de archivo.",
    explain: "cp deja el origen en su lugar, mientras que mv lo quitaría, así que cp es la herramienta correcta para un respaldo antes de un cambio. Guardar los respaldos fuera de /etc (aquí, bajo /root) sigue el Filesystem Hierarchy Standard: /etc contiene la configuración activa, y un archivo .bak suelto ahí incluso podría ser leído por algunos servicios que cargan todos los archivos de un directorio.",
    labels: ["/root/backup existe como directorio", "La copia de respaldo contiene la configuración original", "La configuración original sigue en /etc/ssh"]
  },
  "lp-symlink-release": {
    title: "Apunta una ruta estable a una versión con un enlace simbólico",
    prompt: "Tu aplicación está desplegada en `/opt/app/releases/v2`. Los operadores siempre deben poder llegar a la versión en ejecución a través de `/opt/app/current`.\n\nCrea un enlace simbólico en `/opt/app/current` que apunte a `/opt/app/releases/v2`. Luego usa `ls -l /opt/app` para confirmar la flecha en el listado.",
    hint: "El comando de enlace necesita la opción -s; el destino va primero y el nombre del nuevo enlace después.",
    explain: "ln -s TARGET LINKNAME crea un enlace simbólico, un archivo pequeño que guarda una ruta. A diferencia de un hard link, puede apuntar a un directorio y cruzar sistemas de archivos, y se rompe si se elimina el destino. Cambiar el enlace hacia el directorio de una nueva versión es un patrón común de despliegue sin tiempo de inactividad, y el examen espera que sepas qué tipo de enlace conviene para cada caso.",
    labels: ["/opt/app/current existe", "Se creó un enlace simbólico con ln"]
  },
  "lp-count-errors": {
    title: "Cuenta los errores de un log con grep y redirección",
    prompt: "El log de la aplicación `/var/log/app.log` mezcla líneas INFO, WARN y ERROR.\n\n1. Guarda todas las líneas ERROR en `/root/errors.txt`.\n2. Guarda solo la cantidad de líneas ERROR en `/root/error-count.txt`.",
    hint: "grep puede mostrar las líneas que coinciden o, con una opción, solo un conteo. Usa > para enviar cada resultado a su archivo.",
    explain: "grep PATTERN FILE muestra las líneas que coinciden y grep -c muestra cuántas líneas coincidieron. El operador > redirige la salida estándar a un archivo, reemplazando lo que había, mientras que >> agrega al final. Combinar un filtro con redirección es el núcleo de las operaciones de shell de Linux+ y de la revisión rápida de logs al resolver problemas.",
    labels: ["/root/errors.txt contiene las líneas ERROR", "/root/errors.txt no tiene líneas INFO", "/root/error-count.txt contiene 3"]
  },
  "lp-top-talkers": {
    title: "Encuentra las IPs de clientes más activas con un pipeline",
    prompt: "`/var/log/web/access.log` tiene una solicitud por línea, y el primer campo separado por espacios es la dirección IP del cliente.\n\nConstruye un pipeline que extraiga las IPs, cuente cuántas solicitudes hizo cada una, ordene primero las más activas y guarde las 3 primeras líneas en `/root/top-ips.txt`.",
    hint: "cut con un espacio como delimitador extrae el primer campo. uniq solo une duplicados contiguos, así que ordena antes de contar y luego ordena los conteos numéricamente en orden inverso.",
    explain: "cut -d \" \" -f 1 extrae la IP, sort agrupa las líneas idénticas, uniq -c cuenta cada grupo, sort -rn ordena por conteo de mayor a menor y head -n 3 conserva las tres primeras. Esta cadena cut | sort | uniq -c | sort -rn es un clásico para detectar clientes ruidosos o abusivos y aparece en muchas preguntas de procesamiento de texto de Linux+.",
    labels: ["203.0.113.7 aparece con 5 solicitudes", "198.51.100.23 aparece con 3 solicitudes", "192.0.2.50 aparece con 2 solicitudes"]
  },
  "lp-user-group": {
    title: "Crea un grupo de equipo y sus miembros",
    prompt: "Un nuevo equipo de DevOps está empezando.\n\n1. Crea el grupo `devops`.\n2. Crea el usuario `maria` con directorio home, el shell de inicio de sesión `/bin/bash` y `devops` como grupo suplementario.\n3. Agrega el usuario existente `sam` a `devops` sin quitarlo de sus otros grupos (ya está en `docker`).",
    hint: "useradd tiene opciones para crear el directorio home, elegir grupos suplementarios y definir el shell. Para una cuenta existente, recuerda la opción de agregar (append) de usermod.",
    explain: "useradd -m crea /home/maria, -G define los grupos suplementarios y -s define el shell de inicio de sesión. Para usuarios existentes, usermod -aG agrega un grupo; usermod -G sin -a reemplaza toda la lista de grupos suplementarios, un error clásico que quita accesos sin avisar. El examen evalúa exactamente esta diferencia.",
    labels: ["maria existe", "maria está en devops", "maria tiene un directorio home", "sam está en devops", "sam sigue en docker"]
  },
  "lp-enable-service": {
    title: "Inicia un servicio ahora y en cada arranque",
    prompt: "El servidor web `nginx` está instalado pero detenido, y no se iniciará después de un reinicio.\n\nInícialo de inmediato y habilítalo en el arranque; luego revisa su estado con `systemctl status nginx`.",
    hint: "systemctl puede habilitar una unidad e iniciarla en un solo comando con una opción adicional.",
    explain: "systemctl start solo cambia el estado actual, y systemctl enable solo crea los enlaces para el arranque. systemctl enable --now hace ambas cosas a la vez. Las preguntas de Linux+ a menudo describen un servicio que funciona hasta el siguiente reinicio, lo que apunta a una unidad que se inició pero nunca se habilitó.",
    labels: ["nginx está en ejecución", "nginx está habilitado en el arranque"]
  },
  "lp-cron-job": {
    title: "Programa un respaldo nocturno con cron",
    prompt: "El script `/usr/local/bin/backup.sh` debe ejecutarse todas las noches a las 02:30 como root.\n\nCrea el archivo de cron del sistema `/etc/cron.d/nightly-backup` con una línea en el formato de /etc/cron.d: los cinco campos de tiempo, el usuario y luego el comando.",
    hint: "Los cinco campos son minuto, hora, día del mes, mes y día de la semana. Los archivos de /etc/cron.d también necesitan un nombre de usuario antes del comando. echo con comillas y > escribirá la línea.",
    explain: "La línea 30 2 * * * root /usr/local/bin/backup.sh se ejecuta en el minuto 30 de la hora 2 todos los días. Los archivos de /etc/cron.d y /etc/crontab incluyen un campo de usuario, mientras que un crontab personal editado con crontab -e no lo lleva. Leer y escribir la sintaxis de crontab es un objetivo central de programación de tareas en Linux+, junto con at y los timers de systemd.",
    labels: ["/etc/cron.d/nightly-backup existe", "Se ejecuta a las 02:30 todos los días como root", "Llama al script de respaldo"]
  },
  "lp-sgid-share": {
    title: "Configura un directorio compartido con SGID",
    prompt: "Los miembros del grupo `finance` necesitan una carpeta compartida en `/srv/finance`. Los archivos nuevos creados ahí deben pertenecer automáticamente al grupo `finance`, y los demás usuarios no deben tener ningún acceso.\n\nDefine `finance` como grupo propietario de `/srv/finance` y dale el modo `2770`.",
    hint: "chgrp (o chown con :grupo) cambia el grupo. El primer dígito de un modo octal de cuatro dígitos define los bits especiales: 4 es SUID, 2 es SGID y 1 es sticky.",
    explain: "El modo 2770 es SGID (2) más rwx para el propietario y el grupo, y nada para los demás. SGID en un directorio hace que los archivos nuevos hereden el grupo del directorio, así que los compañeros de equipo pueden editar los archivos de los demás. El sticky bit (1, como en /tmp), en cambio, impide que los usuarios eliminen archivos que no les pertenecen. Reconocer los bits especiales en la salida de ls -l (una s en la posición de ejecución del grupo) es un objetivo de seguridad de Linux+.",
    labels: ["/srv/finance pertenece al grupo finance", "/srv/finance tiene el modo 2770"]
  },
  "lp-disable-legacy": {
    title: "Endurece un host deshabilitando servicios heredados",
    prompt: "Un escaneo de seguridad detectó servicios en texto claro en este servidor. `telnet` y `vsftpd` están en ejecución y habilitados en el arranque. SSH es el método de acceso remoto aprobado y debe seguir funcionando.\n\nDetén y deshabilita `telnet` y `vsftpd`, y deja `sshd` en ejecución y habilitado. Usa `systemctl list-units` para revisar el resultado.",
    hint: "Una sola opción de systemctl deshabilita una unidad y la detiene de inmediato.",
    explain: "systemctl disable --now elimina los enlaces de arranque y detiene la unidad de inmediato. Deshabilitar los servicios que no se usan reduce la superficie de ataque, y Telnet y FTP simple envían las credenciales en texto claro, así que SSH y SFTP los reemplazan. Las preguntas de endurecimiento del sistema operativo en Linux+ esperan que elimines lo que no se necesita en lugar de solo bloquearlo con el firewall.",
    labels: ["telnet está detenido y deshabilitado", "vsftpd está detenido y deshabilitado", "sshd sigue en ejecución y habilitado"]
  },
  "lp-first-script": {
    title: "Escribe y habilita un pequeño script de Bash",
    prompt: "Crea el script `/usr/local/bin/disk-report.sh` con exactamente dos líneas:\n\n1. El shebang `#!/bin/bash`\n2. El comando `df -h`\n\nLuego hazlo ejecutable con el modo `755` para que cualquier usuario pueda ejecutarlo.",
    hint: "Escribe la primera línea con echo y >, agrega la segunda línea con >> y luego define el modo con chmod.",
    explain: "La línea shebang le dice al kernel qué intérprete ejecuta el archivo, y el bit de ejecución permite ejecutarlo como comando. El modo 755 da rwx al propietario y r-x a todos los demás, el modo habitual para scripts compartidos en /usr/local/bin. Usar > para la primera línea y >> para las demás evita sobrescribir lo que ya escribiste, un desliz común al hacer scripts.",
    labels: ["El script comienza con el shebang de Bash", "El script ejecuta df -h", "El script tiene el modo 755"]
  },
  "lp-ssh-key-perms": {
    title: "Corrige un inicio de sesión con clave SSH rechazado por permisos",
    prompt: "El usuario `dev` copió una clave pública en `~/.ssh/authorized_keys`, pero el inicio de sesión con clave sigue cayendo en la contraseña. El servidor SSH ignora las claves cuando los archivos son demasiado permisivos.\n\nRevisa los permisos y luego define `/home/dev/.ssh` en `700` y `/home/dev/.ssh/authorized_keys` en `600`. Asegúrate de que ambos pertenezcan a `dev`.",
    hint: "Empieza con ls -la en el directorio home y en .ssh. El directorio necesita acceso solo para el propietario, y el archivo de claves solo lectura/escritura para el propietario.",
    explain: "Con StrictModes activado (el valor predeterminado), sshd rechaza authorized_keys si el archivo o el directorio .ssh tienen permiso de escritura para el grupo o para otros, o si pertenecen a otro usuario, porque alguien más podría plantar una clave. La corrección es chmod 700 ~/.ssh, chmod 600 ~/.ssh/authorized_keys y la propiedad correcta. La resolución de problemas de Linux+ incluye los permisos de las claves SSH como un problema de seguridad típico.",
    labels: [".ssh tiene el modo 700", "authorized_keys tiene el modo 600", ".ssh pertenece a dev", "authorized_keys pertenece a dev"]
  },
  "lp-full-disk": {
    title: "Libera espacio en un /var lleno eliminando logs rotados antiguos",
    prompt: "`df -h` muestra el sistema de archivos raíz casi lleno, y la mayor parte del crecimiento está en `/var/log/app`. Los logs rotados y comprimidos terminan en `.gz` y ya se enviaron al servidor de logs.\n\nUsa `find` para listar los archivos `.gz` bajo `/var/log/app` y luego elimínalos. Conserva el log activo `current.log`.",
    hint: "find con -name y un patrón comodín entre comillas muestra lo que coincide antes de que borres algo. Luego elimina cada archivo que listó.",
    explain: "Revisar df -h y luego du o find reduce un disco lleno a un directorio concreto, y find -name \"*.gz\" lista los candidatos antes de eliminar nada, lo cual es más seguro que un rm a ciegas. Eliminar el log activo que un proceso todavía tiene abierto no liberaría espacio hasta que el proceso se reinicie (lsof +L1 muestra esos archivos), así que solo se eliminan las copias rotadas. Este es un escenario estándar de resolución de problemas de almacenamiento en Linux+.",
    labels: ["app-20260922.log.gz ya no está", "app-20260923.log.gz ya no está", "app-20260924.log.gz ya no está", "current.log se conserva"]
  }
});
