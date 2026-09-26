/* Spanish text for the AZ-802 hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/az-802.js. */
CertHub.addHandsonEs("az-802", {
  "az802-enable-aduser": {
    title: "Vuelve a habilitar una cuenta deshabilitada de Active Directory",
    prompt: "Un empleado que regresa, `tjones`, tiene una cuenta de Active Directory que se deshabilitó mientras estaba fuera.\n\nPrimero inspecciona la cuenta con Get-ADUser y luego habilítala para que el usuario pueda volver a iniciar sesión.",
    hint: "Get-ADUser -Identity muestra la cuenta. Enable-ADAccount vuelve a activar una cuenta deshabilitada; pásale la misma identidad.",
    explain: "Una cuenta deshabilitada sigue existiendo con todas sus membresías de grupo y atributos intactos, así que volver a habilitarla es más seguro y rápido que eliminarla y crearla de nuevo. Enable-ADAccount cambia la marca de deshabilitado de userAccountControl, mientras que Enable-LocalUser hace lo mismo con las cuentas SAM locales. En AZ-802 se espera que sepas qué cmdlet actúa sobre cuentas de AD y cuál sobre cuentas locales.",
    labels: ["La cuenta tjones está habilitada", "Primero inspeccionaste la cuenta con Get-ADUser"]
  },
  "az802-new-aduser": {
    title: "Crea y habilita una nueva cuenta de usuario de AD",
    prompt: "Una nueva contratación llamada Bao Wong se une al equipo de Ventas. Su nombre de inicio de sesión (SamAccountName) debe ser `bwong`.\n\nCrea la cuenta con New-ADUser y luego habilítala para que quede lista para usarse.",
    hint: "New-ADUser -Name define el nombre para mostrar y -SamAccountName define el nombre de inicio de sesión. Una cuenta nueva empieza deshabilitada, así que continúa con Enable-ADAccount.",
    explain: "New-ADUser crea el objeto, pero lo deja deshabilitado hasta que se configure una contraseña y se habilite la cuenta, lo que evita que se use una cuenta a medio terminar. Indicar un SamAccountName explícito mantiene predecibles los nombres de inicio de sesión en lugar de dejar que se deriven automáticamente. AZ-802 cubre el aprovisionamiento de cuentas en un directorio híbrido, donde estos atributos después se sincronizan con Entra ID.",
    labels: ["La cuenta bwong existe y está habilitada", "La creaste con New-ADUser"]
  },
  "az802-adgroup-member": {
    title: "Otorga acceso agregando un usuario a un grupo de seguridad",
    prompt: "El usuario `mlee` necesita el mismo acceso que el resto de la mesa de ayuda.\n\nAgrega a `mlee` al grupo existente `Helpdesk Operators` y luego confirma la membresía con Get-ADGroupMember.",
    hint: "Add-ADGroupMember -Identity indica el grupo y -Members indica el usuario. Get-ADGroupMember lista quién está en un grupo.",
    explain: "Asignar permisos a grupos y agregar usuarios a esos grupos (acceso basado en roles) escala mucho mejor que otorgar permisos a personas individuales. Add-ADGroupMember cambia el atributo member del grupo, y el usuario hereda todos los permisos que tiene el grupo. Verificar con Get-ADGroupMember es el hábito que AZ-802 premia, porque un error silencioso de membresía es un problema de acceso común.",
    labels: ["mlee es miembro de Helpdesk Operators", "Confirmaste la membresía con Get-ADGroupMember"]
  },
  "az802-install-feature": {
    title: "Instala un rol de servidor con Install-WindowsFeature",
    prompt: "Este servidor alojará un sitio web interno, así que necesita el rol Web Server (IIS).\n\nRevisa las características disponibles y luego instala el rol `Web-Server`.",
    hint: "Get-WindowsFeature lista los roles y su estado de instalación. Install-WindowsFeature -Name agrega uno.",
    explain: "Install-WindowsFeature es el equivalente en PowerShell de agregar un rol en Server Manager, y es la forma de automatizar con scripts compilaciones consistentes y repetibles en muchos servidores. Revisar primero Get-WindowsFeature confirma el nombre exacto de la característica y si ya está presente. En AZ-802 administras los roles de esta manera tanto en instancias de Windows Server on-premises como en las alojadas en Azure.",
    labels: ["El rol Web-Server está instalado", "Revisaste las características con Get-WindowsFeature"]
  },
  "az802-service-startup": {
    title: "Haz que un servicio se inicie automáticamente y ejecútalo ahora",
    prompt: "El servicio `W3SVC` (World Wide Web Publishing) está detenido y configurado para iniciarse de forma manual, así que el sitio está caído y seguirá caído después de un reinicio.\n\nCambia su tipo de inicio a Automatic e inícialo ahora.",
    hint: "Set-Service -StartupType Automatic cambia el comportamiento al arrancar; Start-Service lo inicia en la sesión actual.",
    explain: "El tipo de inicio y el estado actual son configuraciones separadas: Set-Service -StartupType Automatic controla lo que pasa al arrancar, mientras que Start-Service solo afecta la sesión en curso. Un servicio que funciona hasta el siguiente reinicio normalmente tiene el tipo de inicio equivocado. La solución de problemas en AZ-802 espera que corrijas ambos para que el servicio sobreviva a un reinicio.",
    labels: ["W3SVC está en ejecución", "W3SVC se inicia automáticamente al arrancar"]
  },
  "az802-vm-export-folder": {
    title: "Prepara una carpeta de destino para exportar una máquina virtual",
    prompt: "Antes de exportar una máquina virtual de Hyper-V, necesitas un lugar donde guardarla.\n\nCrea la carpeta `C:\\VMExports` y luego escribe una nota breve en `C:\\VMExports\\readme.txt` que describa para qué es la carpeta. La nota debe mencionar la palabra export.",
    hint: "New-Item -ItemType Directory crea la carpeta. Set-Content -Path ... -Value escribe texto en un archivo.",
    explain: "Planear el almacenamiento antes de una exportación evita que una operación a medias llene la unidad del sistema. New-Item con -ItemType Directory crea la ruta de destino, y Set-Content deja una marca legible para que otros administradores sepan para qué sirve la carpeta. Administrar los archivos de las VM y sus ubicaciones de almacenamiento forma parte del objetivo de máquinas virtuales de AZ-802.",
    labels: ["C:\\VMExports existe como carpeta", "El readme explica la carpeta de exportación"]
  },
  "az802-test-connectivity": {
    title: "Verifica la conectividad con un controlador de dominio",
    prompt: "Los clientes reportan que no pueden autenticarse. Antes de cambiar algo, confirma la ruta de red hacia el controlador de dominio.\n\nResuelve el nombre `dc01.corp.local` con Resolve-DnsName y luego prueba si se puede llegar al puerto TCP 389 (LDAP) con Test-NetConnection.",
    hint: "Resolve-DnsName -Name verifica el DNS. Test-NetConnection -ComputerName ... -Port prueba un puerto TCP específico.",
    explain: "Una buena solución de problemas confirma la resolución de nombres y el puerto específico antes de tocar la configuración. Resolve-DnsName muestra si el DNS devuelve la dirección correcta, y Test-NetConnection -Port comprueba que el puerto del servicio (389 para LDAP) realmente responda, algo que un ping por sí solo no te puede decir. Esta verificación por capas es exactamente la forma en que AZ-802 plantea los problemas de conectividad híbrida.",
    labels: ["Resolviste el nombre con Resolve-DnsName", "Probaste el puerto 389 con Test-NetConnection"]
  },
  "az802-share-structure": {
    title: "Crea una estructura de carpetas por departamento para recursos compartidos",
    prompt: "Estás configurando recursos compartidos de archivos para dos departamentos.\n\nCrea las carpetas `C:\\Shares\\Finance` y `C:\\Shares\\HR`. Tanto la carpeta principal como las secundarias deben quedar creadas.",
    hint: "New-Item -ItemType Directory crea por ti cualquier carpeta principal que falte en la ruta.",
    explain: "New-Item con -ItemType Directory crea la ruta completa, incluida la carpeta principal C:\\Shares, en un solo paso. Diseñar una jerarquía de carpetas ordenada es la primera etapa para aprovisionar recursos compartidos SMB, antes de configurar los permisos de recurso compartido y NTFS. AZ-802 cubre los servicios de archivos y almacenamiento, donde una estructura ordenada simplifica el trabajo posterior con permisos.",
    labels: ["C:\\Shares\\Finance existe", "C:\\Shares\\HR existe"]
  },
  "az802-backup-config": {
    title: "Haz un backup de un archivo de configuración antes de editarlo",
    prompt: "Estás por editar la configuración del sitio de IIS en `C:\\inetpub\\web.config` y quieres tener primero una copia segura.\n\nCrea `C:\\Backup` y luego copia el archivo ahí. El original debe quedarse donde está.",
    hint: "Crea la carpeta con New-Item y luego usa Copy-Item con un origen y un destino. Copy-Item deja el origen en su lugar.",
    explain: "Copy-Item duplica un archivo y deja el original, a diferencia de Move-Item, que lo cambia de lugar, así que es la herramienta correcta para un backup antes de un cambio. Guardar el backup fuera de la carpeta de configuración activa evita que IIS lea un archivo sobrante. Crear un punto de restauración antes de un cambio es una práctica operativa central que se evalúa a lo largo de AZ-802.",
    labels: ["La copia de backup existe", "El web.config original sigue en su lugar"]
  },
  "az802-firewall-rule": {
    title: "Permite HTTPS a través del firewall de Windows",
    prompt: "Un servidor web debe aceptar tráfico HTTPS en el puerto TCP 443, pero todavía no existe ninguna regla de entrada.\n\nCrea una regla de entrada habilitada que permita el tráfico, llamada `Allow HTTPS`, para el puerto TCP 443.",
    hint: "New-NetFirewallRule recibe -DisplayName, -Direction Inbound, -Action Allow, -Protocol TCP y -LocalPort 443.",
    explain: "New-NetFirewallRule crea una regla precisa para que abras solo el puerto que necesita un servicio en lugar de un rango amplio. Nombrar la regla con claridad y definir explícitamente la dirección, la acción, el protocolo y el puerto mantiene el firewall auditable. Limitar la exposición de red con privilegio mínimo mediante reglas del firewall del host forma parte de proteger Windows Server en AZ-802.",
    labels: ["La regla Allow HTTPS está habilitada", "La regla abre el puerto TCP 443"]
  },
  "az802-disable-legacy": {
    title: "Deshabilita las cuentas locales sin uso para reducir la superficie de ataque",
    prompt: "Una revisión de seguridad señaló dos cuentas locales habilitadas que ya no se usan: la cuenta integrada `Guest` y una antigua cuenta de servicio, `svc_legacy`.\n\nDeshabilita ambas para que no se puedan usar para iniciar sesión.",
    hint: "Disable-LocalUser -Name desactiva una cuenta local sin eliminarla.",
    explain: "Deshabilitar una cuenta sin uso elimina una vía de inicio de sesión que un atacante podría aprovechar y conserva la cuenta para el historial de auditoría, lo que es más seguro que eliminarla de inmediato. En particular, la cuenta Guest debe permanecer deshabilitada en los servidores. Reducir la superficie de ataque desactivando las cuentas y servicios innecesarios es un tema recurrente de hardening en AZ-802.",
    labels: ["La cuenta Guest está deshabilitada", "La cuenta svc_legacy está deshabilitada"]
  },
  "az802-restart-critical": {
    title: "Recupera un servicio crítico detenido y revisa el log",
    prompt: "El servicio `LanmanServer` (Server) se detuvo, así que no se puede acceder a los recursos compartidos de archivos.\n\nRevisa los eventos recientes con Get-WinEvent y luego inicia el servicio para que los recursos compartidos vuelvan a estar disponibles.",
    hint: "Get-WinEvent muestra las entradas recientes del log. Start-Service -Name inicia el servicio detenido.",
    explain: "Revisar el registro de eventos antes de actuar te dice si un servicio se detuvo por sí solo o si alguien lo detuvo a propósito, y eso define la solución. Get-WinEvent lee los registros de eventos modernos de Windows, y Start-Service vuelve a levantar el servicio Server para que los recursos compartidos SMB respondan otra vez. Monitorear y solucionar problemas de la salud de los servicios de esta forma es central en el objetivo de operaciones de AZ-802.",
    labels: ["El servicio Server vuelve a estar en ejecución", "Revisaste los eventos con Get-WinEvent"]
  }
});
