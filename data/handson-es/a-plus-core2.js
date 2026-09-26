/* Spanish text for the CompTIA A+ Core 2 hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/a-plus-core2.js. */
CertHub.addHandsonEs("a-plus-core2", {
  "aplus-create-folder-note": {
    title: "Crea una carpeta y un archivo de texto desde PowerShell",
    prompt: "Necesitas una carpeta de trabajo para una tarea de mantenimiento.\n\nCrea la carpeta `C:\\Temp\\report` y luego escribe una nota breve en `C:\\Temp\\report\\info.txt`. La nota debe contener la palabra backup.",
    hint: "New-Item -ItemType Directory crea la carpeta; Set-Content -Path ... -Value escribe el archivo.",
    explain: "PowerShell es una herramienta de línea de comandos estándar de Windows que un técnico de A+ usa para el trabajo diario con archivos. New-Item con -ItemType Directory crea carpetas, y Set-Content escribe texto sin abrir un editor. Dominar estos conceptos básicos te permite automatizar tareas pequeñas con scripts y seguir al pie de la letra los pasos de reparación escritos, algo que exige el objetivo de sistemas operativos de Core 2.",
    labels: ["C:\\Temp\\report existe como carpeta", "La nota menciona la tarea de backup"]
  },
  "aplus-fix-print-spooler": {
    title: "Repara el Print Spooler para que la impresión vuelva a funcionar",
    prompt: "Un usuario no puede imprimir. El servicio `Spooler` está detenido y su tipo de inicio es Disabled, así que no volverá a iniciarse por sí solo.\n\nCambia el tipo de inicio a Automatic y luego inicia el servicio.",
    hint: "Set-Service -StartupType Automatic lo vuelve a habilitar al arrancar; Start-Service lo inicia ahora mismo.",
    explain: "El Print Spooler es un servicio, y un tipo de inicio Disabled impide que se inicie, incluso de forma manual, hasta que lo cambies. Set-Service -StartupType Automatic corrige su comportamiento al arrancar y Start-Service lo ejecuta en la sesión actual. Diagnosticar y reiniciar servicios es una tarea común de solución de problemas de software en A+ Core 2.",
    labels: ["El servicio Spooler está en ejecución", "El Spooler se inicia automáticamente al arrancar"]
  },
  "aplus-standard-user": {
    title: "Crea un usuario estándar con privilegio mínimo",
    prompt: "Una estación de trabajo compartida necesita una cuenta limitada para un nuevo empleado llamado `jdoe`, que solo necesita acceso por escritorio remoto.\n\nCrea el usuario local `jdoe` y luego agrégalo al grupo `Remote Desktop Users`. No lo agregues a Administrators.",
    hint: "New-LocalUser -Name -NoPassword crea la cuenta. Add-LocalGroupMember -Group -Member la agrega a un grupo.",
    explain: "El privilegio mínimo significa dar a una cuenta solo el acceso que necesita, por lo que un usuario estándar se une a Remote Desktop Users y no a Administrators. New-LocalUser crea la cuenta y Add-LocalGroupMember otorga el permiso específico mediante la membresía en el grupo. Asignar los permisos adecuados y evitar accesos de administrador innecesarios es un principio de seguridad central de A+ Core 2.",
    labels: ["La cuenta jdoe existe y está habilitada", "jdoe está en Remote Desktop Users"]
  },
  "aplus-disable-guest": {
    title: "Deshabilita la cuenta Guest integrada",
    prompt: "Una lista de verificación de seguridad exige que la cuenta integrada `Guest` esté desactivada en todas las estaciones de trabajo.\n\nRevisa las cuentas locales y luego deshabilita `Guest`.",
    hint: "Get-LocalUser muestra las cuentas; Disable-LocalUser -Name desactiva una.",
    explain: "La cuenta Guest permite iniciar sesión sin contraseña y debe permanecer deshabilitada, porque es una vía muy conocida para que alguien obtenga acceso limitado. Disable-LocalUser la desactiva sin eliminarla, de modo que la cuenta integrada sigue donde Windows espera encontrarla. Deshabilitar las cuentas predeterminadas y las que no se usan es un paso estándar de hardening de estaciones de trabajo en A+ Core 2.",
    labels: ["La cuenta Guest está deshabilitada", "Revisaste las cuentas con Get-LocalUser"]
  },
  "aplus-restart-hung-service": {
    title: "Reinicia el servicio de una app que dejó de responder",
    prompt: "Una aplicación de línea de negocio no responde, y su servicio en segundo plano `AppSvc` se detuvo.\n\nReinicia el servicio `AppSvc` para que la app vuelva a funcionar.",
    hint: "Restart-Service -Name detiene e inicia un servicio en un solo paso, aunque en ese momento esté detenido.",
    explain: "Cuando una aplicación se comporta mal, reiniciar el servicio en el que se apoya suele resolver el problema sin reiniciar todo el equipo. Restart-Service detiene y luego inicia el servicio con un solo comando, y también inicia un servicio que ya estaba detenido. Reiniciar servicios y procesos es un primer paso habitual en la solución de problemas de software de A+ Core 2.",
    labels: ["El servicio AppSvc está en ejecución", "Usaste Restart-Service"]
  },
  "aplus-backup-before-change": {
    title: "Haz un backup de un archivo de configuración antes de un cambio",
    prompt: "Antes de editar la configuración de una aplicación en `C:\\App\\app.ini`, sigue la gestión de cambios y haz primero un backup.\n\nCrea `C:\\Backup` y luego copia el archivo ahí. Deja el original en su lugar.",
    hint: "New-Item -ItemType Directory crea la carpeta; Copy-Item copia el archivo y conserva el original.",
    explain: "La gestión de cambios significa tener una forma de volver atrás antes de modificar algo. Copy-Item duplica el archivo sin tocar el original, así que puedes restaurarlo si la edición causa problemas. Documentar y preparar la reversión antes de un cambio es justo el tipo de procedimiento operativo que cubren los objetivos de A+ Core 2.",
    labels: ["La copia de backup existe", "El app.ini original sigue en su lugar"]
  }
});
