/* Spanish text for the Red Hat RHCSA hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/rhcsa.js. */
CertHub.addHandsonEs("rhcsa", {
  "rh-grep-words": {
    title: "Guarda en un archivo las líneas que coinciden",
    prompt: "Una tarea clásica del examen: encuentra todas las líneas de `/usr/share/dict/words` que contienen la cadena `ich` y guárdalas, en su orden original, en `/root/lines.txt`.",
    hint: "grep imprime las líneas que coinciden. Envía su salida al archivo con un operador de redirección.",
    explain: "grep PATTERN FILE > DEST escribe solo las líneas que coinciden en DEST, conservando su orden. Usar > reemplaza cualquier contenido existente, mientras que >> agregaría al final. El examen revisa el contenido del archivo con exactitud, así que no agregues líneas extra ni cambies el orden, y recuerda que grep distingue mayúsculas de minúsculas a menos que agregues -i.",
    labels: ["/root/lines.txt existe", "Contiene exactamente las cinco líneas que coinciden"]
  },
  "rh-find-conf": {
    title: "Busca archivos por nombre y registra sus rutas",
    prompt: "Localiza todos los archivos regulares cuyo nombre termine en `.conf` en cualquier parte bajo `/etc/app`, y guarda la lista de rutas completas en `/root/conf-files.txt`.",
    hint: "find recibe un directorio de inicio, una prueba -type y una prueba -name. Pon el comodín entre comillas para que el shell no lo expanda.",
    explain: "find /etc/app -type f -name \"*.conf\" recorre todo el árbol bajo /etc/app e imprime las rutas completas de los archivos que coinciden. Poner el patrón entre comillas evita que el shell lo expanda primero en el directorio actual. Las tareas de RHCSA suelen pedirte buscar archivos por nombre, dueño o tamaño y guardar los resultados o copiarlos a otro lugar.",
    labels: ["main.conf aparece en la lista", "conf.d/logging.conf aparece en la lista", "conf.d/cache.conf aparece en la lista"]
  },
  "rh-log-review": {
    title: "Extrae los inicios de sesión fallidos de /var/log/secure",
    prompt: "En RHEL, los eventos de autenticación se escriben en `/var/log/secure`.\n\nGuarda todas las líneas que contengan `Failed password` en `/root/failed-logins.txt`, y guarda la cantidad de esas líneas en `/root/failed-count.txt`.",
    hint: "Pon entre comillas un patrón que contenga un espacio. grep tiene una opción que imprime un conteo en lugar de las líneas.",
    explain: "/var/log/secure reúne los mensajes de autenticación de sshd, sudo y PAM, mientras que /var/log/messages contiene la mayoría de los demás logs del sistema. grep \"Failed password\" filtra las líneas relevantes y grep -c las cuenta. En el examen también puedes usar journalctl -u sshd con --since para ver los mismos eventos desde el journal.",
    labels: ["failed-logins.txt contiene los intentos fallidos", "failed-logins.txt no contiene inicios de sesión aceptados", "failed-count.txt contiene 3"]
  },
  "rh-users-groups": {
    title: "Crea usuarios, un grupo y una cuenta de servicio",
    prompt: "Configura estas cuentas:\n\n1. Un grupo llamado `sysadmins`.\n2. Los usuarios `natasha` y `harry`, ambos con `sysadmins` como grupo suplementario.\n3. Un usuario `sarah` que no esté en `sysadmins` y tenga el shell no interactivo `/sbin/nologin`.\n\nSi quieres, asigna contraseñas con `passwd` y luego confirma con `id`.",
    hint: "Crea el grupo antes que los usuarios que lo necesitan. useradd tiene opciones para los grupos suplementarios y para el shell de inicio de sesión.",
    explain: "groupadd crea el grupo, useradd -G agrega grupos suplementarios al momento de la creación y useradd -s /sbin/nologin da una cuenta que puede ser dueña de archivos y ejecutar servicios, pero no puede iniciar sesión de forma interactiva. Este patrón exacto aparece en casi todos los exámenes RHCSA, e id USER es la forma más rápida de verificar la membresía.",
    labels: ["natasha está en sysadmins", "harry está en sysadmins", "sarah existe", "sarah tiene el shell /sbin/nologin"]
  },
  "rh-hosts-entry": {
    title: "Agrega una entrada estática de nombre de host",
    prompt: "El DNS del laboratorio todavía no está listo. Haz que el nombre `server2.lab.example.com` (nombre corto `server2`) se resuelva a `192.168.56.20` en este host agregando una línea al final de `/etc/hosts`. Conserva las entradas existentes.",
    hint: "Agrega al final en lugar de sobrescribir. El formato de /etc/hosts es la dirección IP, luego el nombre completo y después los alias.",
    explain: "Por defecto, /etc/hosts se consulta antes que el DNS (la línea hosts de /etc/nsswitch.conf dice files dns), así que una línea como 192.168.56.20 server2.lab.example.com server2 resuelve ambos nombres localmente. Usar >> agrega al final y conserva las entradas de localhost; usar > las borraría y rompería la resolución local de nombres. En un sistema real, getent hosts server2 verifica el resultado.",
    labels: ["server2 apunta a 192.168.56.20", "La entrada de localhost sigue ahí"]
  },
  "rh-repo-file": {
    title: "Escribe un archivo de repositorio DNF local",
    prompt: "Los paquetes de este laboratorio están en un repositorio local en `/srv/repo`. Crea `/etc/yum.repos.d/local.repo` con estas cuatro líneas:\n\n`[local]`\n`name=Local lab repository`\n`baseurl=file:///srv/repo`\n`enabled=1`\n\ny una quinta línea `gpgcheck=0`.",
    hint: "Escribe la primera línea con > y agrega cada línea siguiente con >>. Pon cada línea entre comillas.",
    explain: "Un archivo .repo necesita un id de sección entre corchetes, un baseurl que apunte al repositorio y los ajustes enabled y gpgcheck. Las URL file:/// hacen referencia a una ruta local. En el examen también podrías ejecutar dnf config-manager --add-repo y luego verificar con dnf repolist. Los repositorios firmados deben mantener gpgcheck=1 con una línea gpgkey; gpgcheck=0 es solo para repositorios locales de prueba de confianza.",
    labels: ["El archivo tiene la sección [local]", "baseurl apunta a /srv/repo", "El repositorio está habilitado", "gpgcheck está configurado"]
  },
  "rh-chrony-service": {
    title: "Apunta chronyd a un servidor de hora y habilítalo",
    prompt: "Configura este host como cliente NTP de `classroom.example.com`.\n\n1. Agrega la línea `server classroom.example.com iburst` al final de `/etc/chrony.conf`.\n2. Reinicia `chronyd` para que lea el cambio y asegúrate de que esté habilitado al arranque.",
    hint: "Agrega al final de la configuración con >>. systemctl puede reiniciar una unidad, y otro subcomando hace que arranque con el sistema.",
    explain: "chronyd lee sus fuentes de hora de /etc/chrony.conf, e iburst acelera la primera sincronización. Un cambio de configuración necesita un reinicio, y enable hace que el servicio sobreviva a un reboot, algo que el calificador del examen revisa después de reiniciar tu sistema. Luego chronyc sources confirma qué servidores están en uso.",
    labels: ["chrony.conf menciona classroom.example.com", "chronyd está en ejecución", "chronyd está habilitado al arranque"]
  },
  "rh-web-perms": {
    title: "Corrige los permisos de un directorio de contenido web",
    prompt: "El servidor web se ejecuta como el usuario `apache` y no puede leer su contenido en `/srv/web`. Diagnostica con `ls -ld` y `ls -l`, y luego:\n\n1. Haz que `apache` sea el dueño y el grupo de `/srv/web` y de todo lo que contiene.\n2. Configura `/srv/web` en `755` y `/srv/web/index.html` en `644`.",
    hint: "chown recibe usuario:grupo y tiene una opción recursiva. Los directorios necesitan permiso de ejecución para poder entrar en ellos; los archivos solo necesitan lectura.",
    explain: "chown -R apache:apache aplica la propiedad a todo el árbol. Los directorios necesitan x para recorrerse y r para listarse, así que 755 es lo típico, mientras que los archivos de contenido solo necesitan lectura, así que 644. Diagnosticar problemas de permisos con ls -l (y namei -l para cada componente de una ruta) es un objetivo explícito de RHCSA. En un sistema real, el contexto de SELinux es lo siguiente que hay que revisar.",
    labels: ["/srv/web pertenece a apache", "index.html pertenece a apache", "/srv/web tiene el modo 755", "index.html tiene el modo 644"]
  },
  "rh-sudo-dropin": {
    title: "Otorga sudo a un grupo con un archivo drop-in",
    prompt: "Los miembros de `sysadmins` deben poder ejecutar cualquier comando con sudo. En lugar de editar `/etc/sudoers` directamente, crea el archivo drop-in `/etc/sudoers.d/sysadmins` con este contenido:\n\n`%sysadmins ALL=(ALL) ALL`\n\nLuego configura su modo en `440`, el modo que sudo espera.",
    hint: "El signo % marca un grupo en las reglas de sudoers. Escribe la línea con echo y luego usa chmod.",
    explain: "Los archivos de /etc/sudoers.d se incluyen desde el archivo sudoers principal, lo que mantiene las reglas personalizadas separadas y fáciles de auditar. %group aplica la regla a todos los miembros, y ALL=(ALL) ALL permite cualquier comando como cualquier usuario en cualquier host. El modo 440 mantiene el archivo en solo lectura. En un sistema real, visudo -cf /etc/sudoers.d/sysadmins revisa la sintaxis, porque un archivo sudoers roto puede dejar a todos sin acceso a sudo.",
    labels: ["El drop-in otorga sudo completo a sysadmins", "El drop-in tiene el modo 440"]
  },
  "rh-backup-script": {
    title: "Crea un script ejecutable que funcione desde el PATH",
    prompt: "Crea `/usr/local/bin/sysinfo` (sin extensión) para que cualquier usuario pueda ejecutar `sysinfo` como comando. Debe contener tres líneas:\n\n1. `#!/bin/bash`\n2. `hostname`\n3. `uname -r`\n\nLuego dale el modo `755`.",
    hint: "/usr/local/bin ya está en el PATH. Construye el archivo línea por línea con echo, usando > una vez y >> después.",
    explain: "Un script se ejecuta como comando cuando tiene una línea shebang, el bit de ejecución y está en un directorio incluido en el PATH, como /usr/local/bin. Sin el bit de ejecución obtendrías un error de permisos, y sin la ubicación en el PATH necesitarías ./ o una ruta completa. Los objetivos de scripting de RHCSA parten exactamente de esto antes de agregar if, for y el manejo de $1.",
    labels: ["El script tiene las tres líneas esperadas", "El script tiene el modo 755"]
  },
  "rh-fstab-mount": {
    title: "Prepara un montaje persistente en /etc/fstab",
    prompt: "Un nuevo sistema de archivos XFS tiene el UUID `7c1a2d3e-4b5f-4a6b-9c8d-0e1f2a3b4c5d`. Debe montarse en `/data` en cada arranque.\n\n1. Crea el punto de montaje `/data`.\n2. Agrega esta línea al final de `/etc/fstab` sin tocar las líneas existentes:\n\n`UUID=7c1a2d3e-4b5f-4a6b-9c8d-0e1f2a3b4c5d /data xfs defaults 0 0`",
    hint: "El punto de montaje debe existir antes de montar. Cuando edites fstab desde el shell, agrega con >>, nunca con >.",
    explain: "Los seis campos de fstab son dispositivo, punto de montaje, tipo, opciones, dump y orden de fsck. Usar el UUID (obtenido con blkid) mantiene estable el montaje si cambian los nombres de los dispositivos. En un sistema real, mount -a y findmnt --verify prueban el archivo antes de reiniciar, porque una línea de fstab incorrecta puede mandar la máquina al modo de emergencia, un fallo que el calificador de RHCSA no te perdonará.",
    labels: ["/data existe como directorio", "fstab monta el UUID en /data", "La entrada del sistema de archivos raíz sigue ahí"]
  },
  "rh-ssh-dir": {
    title: "Asegura el directorio SSH de un usuario para iniciar sesión con llaves",
    prompt: "El usuario `harry` iniciará sesión con llaves SSH. Su directorio `.ssh` y su archivo `authorized_keys` existen, pero pertenecen a root y tienen permisos demasiado abiertos, así que sshd rechazará la llave.\n\nHaz que `harry` sea el dueño (usuario y grupo) de `/home/harry/.ssh` y su contenido, y luego configura el directorio en `700` y `authorized_keys` en `600`.",
    hint: "Primero corrige la propiedad de forma recursiva y luego configura los dos modos por separado: uno para el directorio y otro para el archivo.",
    explain: "La verificación StrictModes de sshd rechaza las llaves cuando ~/.ssh o authorized_keys tienen permiso de escritura para otros o pertenecen a alguien distinto del usuario. chown -R harry:harry, chmod 700 en el directorio y chmod 600 en el archivo lo resuelven. Normalmente ssh-copy-id configura esto por ti, pero el examen puede darte una configuración rota para que la repares, y en un host real SELinux también podría necesitar restorecon -Rv ~/.ssh.",
    labels: [".ssh pertenece a harry", "authorized_keys está en el grupo harry", ".ssh tiene el modo 700", "authorized_keys tiene el modo 600"]
  }
});
