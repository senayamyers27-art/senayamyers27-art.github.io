/* Spanish text for the CompTIA Server+ hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/server-plus.js. */
CertHub.addHandsonEs("server-plus", {
  "sp-asset-baseline": {
    title: "Registra una línea base del servidor para el inventario de activos",
    prompt: "Antes de que este servidor Linux pase a producción, documenta una línea base sencilla en `/srv/inventory/baseline.txt`.\n\nEscribe la salida de `hostname` en el archivo y luego agrega la salida de `uname -r` (la versión del kernel) y de `df -h` (el uso de disco).",
    hint: "Redirige el primer comando con > para crear el archivo, y usa >> para cada comando que siga.",
    explain: "Una línea base registra cómo se veía un servidor cuando estaba sano: su nombre, la versión del sistema operativo o del kernel, el uso de disco, etc. Más adelante comparas contra ella para detectar desviaciones o encontrar la causa raíz de un problema. Server+ relaciona las líneas base con la gestión de activos y la documentación, junto con las etiquetas, los registros de inventario y la gestión de cambios.",
    labels: ["La línea base indica el nombre del host", "La línea base registra la versión del kernel", "La línea base incluye el uso de disco"]
  },
  "sp-ntp-client": {
    title: "Configura NTP en un servidor",
    prompt: "La hora exacta importa para los logs, la autenticación y los certificados. Apunta este servidor a la fuente de hora interna `ntp1.corp.example.com`.\n\nAgrega `server ntp1.corp.example.com iburst` al final de `/etc/chrony.conf`, y luego reinicia `chronyd` y habilítalo al arranque.",
    hint: "Agrega al final con >> para conservar la configuración existente. Luego usa systemctl para reiniciar y habilitar el servicio.",
    explain: "NTP es uno de los servicios de red fundamentales en Server+. El desfase del reloj rompe Kerberos (que solo permite unos minutos de diferencia), hace que los certificados TLS parezcan aún no válidos o vencidos, y desordena la secuencia de eventos entre archivos de log. chronyd lee sus fuentes de /etc/chrony.conf, y hay que reiniciarlo para que tome los cambios y habilitarlo para que sobreviva a los reinicios.",
    labels: ["chrony.conf menciona el servidor NTP interno", "chronyd está en ejecución", "chronyd está habilitado al arranque"]
  },
  "sp-least-privilege": {
    title: "Aplica el privilegio mínimo con un grupo por rol",
    prompt: "Solo los administradores de bases de datos deben poder acceder a `/srv/db-exports`.\n\n1. Crea el grupo `dbadmins` y agrega a él al usuario existente `lena` (conserva sus otros grupos).\n2. Haz que `/srv/db-exports` pertenezca a `root` con el grupo `dbadmins`.\n3. Configura su modo en `770` para que los demás no tengan acceso.",
    hint: "Otorga el acceso a un grupo que represente el rol, no a usuarios individuales. usermod necesita la opción de agregar (append) para conservar los grupos existentes.",
    explain: "El control de acceso basado en roles asigna permisos a un grupo que corresponde a un puesto de trabajo y luego agrega personas a ese grupo. Quitar el acceso más adelante es un solo comando, y nadie recibe más de lo que necesita. El modo 770 da acceso completo al dueño y al grupo del rol, y nada a los demás, que es el privilegio mínimo en la práctica para las preguntas de gestión de identidades y accesos de Server+.",
    labels: ["lena está en dbadmins", "lena sigue en staff", "/srv/db-exports tiene el grupo dbadmins", "/srv/db-exports tiene el modo 770"]
  },
  "sp-harden-services": {
    title: "Endurece un servidor eliminando servicios innecesarios",
    prompt: "Este servidor de archivos se construyó a partir de una imagen genérica. `telnet` y `cups` (impresión) están en ejecución y habilitados, pero el rol del servidor no necesita ninguno de los dos. `sshd` es el protocolo de administración aprobado.\n\nDetén y deshabilita `telnet` y `cups`, y confirma que `sshd` sigue en ejecución y habilitado.",
    hint: "systemctl puede deshabilitar una unidad y detenerla en un solo paso. Revisa el resultado con systemctl status o list-units.",
    explain: "El endurecimiento de un servidor empieza por apagar los servicios que su rol no necesita, ya que cada servicio en escucha es superficie de ataque y requiere parches. Telnet envía las credenciales en texto claro, así que SSH lo reemplaza como protocolo de administración seguro. systemctl disable --now detiene el servicio y además evita que vuelva en el siguiente arranque.",
    labels: ["telnet está detenido y deshabilitado", "cups está detenido y deshabilitado", "sshd sigue en ejecución y habilitado"]
  },
  "sp-full-backup": {
    title: "Haz una copia completa rápida antes de un cambio",
    prompt: "Estás por actualizar la aplicación web en `/srv/www`. Haz primero una copia completa para poder revertir.\n\nCrea `/backup` y copia todo el directorio `/srv/www` a `/backup/www-full`. Luego confirma la copia con `ls`.",
    hint: "cp necesita su opción recursiva para copiar un directorio con todo lo que contiene.",
    explain: "cp -r copia un árbol de directorios. Una copia en el mismo servidor protege contra un cambio mal hecho, pero no contra una falla de disco o un ransomware; por eso la regla 3-2-1 pide tres copias en dos tipos de medios, con una fuera del sitio. Server+ también espera que conozcas los respaldos completos, incrementales y diferenciales, y que pruebes las restauraciones, ya que un respaldo sin probar es solo una esperanza.",
    labels: ["/backup/www-full existe", "index.html se copió", "El subdirectorio css se copió", "El original sigue en su lugar"]
  },
  "sp-service-wont-start": {
    title: "Soluciona un servicio web que falla al acceder a un archivo",
    prompt: "Después de una actualización de contenido, los usuarios reciben errores y `httpd` está detenido. Sigue el método de solución de problemas: primero reúne información.\n\nLee `/var/log/httpd/error_log` para encontrar la causa, corrige el archivo para que la cuenta de servicio pueda leerlo (modo `644`) y luego reinicia `httpd`.",
    hint: "Mira el final del log de errores y los permisos del archivo que menciona. El servidor web se ejecuta con una cuenta que no es root, así que los demás necesitan permiso de lectura.",
    explain: "El método de CompTIA es identificar el problema, formular una teoría, probarla, planificar, implementar, verificar y documentar. El log indica el archivo y ls -l muestra el modo 600, que solo root puede leer, así que la teoría se confirma antes de cambiar nada. chmod 644 lo corrige, reiniciar httpd y revisar su estado verifica la solución, y el último paso es dejarlo por escrito.",
    labels: ["index.html tiene el modo 644", "httpd está en ejecución"]
  }
});
