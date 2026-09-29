/* Spanish text for the log puzzles and tabletop exercises (assets/blueteam.js). Loaded in Spanish mode.
   Log lines themselves stay as they are (they're log data). Tabletop choices keep the English order. */
CertHub.blueteamEs = {
  puzzles: {
    "win-bruteforce": ["Inicios de sesión en Windows", "Registro de seguridad de Windows (ID de evento, cuenta, dirección de origen)", "El evento 4625 es un inicio de sesión fallido y el 4624 uno correcto. Varios fallos rápidos desde una misma dirección externa, con cuentas distintas, y luego un éxito en una de ellas: es un ataque de adivinación de contraseñas que funcionó. Deshabilita la cuenta backup, bloquea la dirección y averigua qué hizo después."],
    "linux-sudo": ["¿Quién se convirtió en root?", "Registro de autenticación de Linux", "La cuenta del propio servidor web (www-data) normalmente nunca inicia sesión por SSH ni usa sudo. Aquí inició sesión con contraseña desde una dirección externa y abrió una shell de root desde /tmp. Eso indica una cuenta de servicio comprometida o mal configurada: no debería tener contraseña, ni shell de inicio de sesión, ni permisos de sudo."],
    "dns-tunnel": ["Consultas DNS extrañas", "Registro del resolvedor DNS (cliente, nombre consultado, tipo)", "Subdominios largos y de aspecto aleatorio (aquí texto en base64) enviados una y otra vez al mismo dominio, a menudo como consultas TXT, son una señal clásica de túnel DNS: datos escondidos en búsquedas DNS para saltarse el firewall. Revisa 10.2.0.33, bloquea el dominio en el resolvedor y comprueba qué proceso hace las consultas."],
    "impossible-travel": ["Inicios de sesión en la nube", "Registro de inicios de sesión del proveedor de identidad (usuario, hora UTC, ubicación, resultado)", "La misma cuenta inició sesión desde dos lugares muy lejanos en 15 minutos (viaje imposible), y el segundo inicio usó autenticación heredada, que se salta la MFA. Revoca las sesiones de a.chen, restablece la contraseña, bloquea la autenticación heredada y revisa las reglas del buzón por si reenvían correo."],
    "encoded-powershell": ["Creación de procesos", "Eventos de creación de procesos de Windows (4688), padre → hijo y línea de comandos", "Que Word inicie PowerShell con la ventana oculta y un comando codificado (-enc) es una señal clásica de una macro maliciosa en un documento. Aísla el equipo, guarda el documento para analizarlo y bloquea que Office cree procesos hijo (una regla de reducción de la superficie de ataque). Este texto codificado solo dice Write-Output \"hi\", pero uno real descargaría más cosas."],
    "port-scan": ["Registro del firewall", "Registro del firewall perimetral (origen, puerto de destino, acción)", "Una dirección que prueba muchos puertos distintos en poco tiempo está haciendo un escaneo de puertos: reconocimiento para encontrar servicios abiertos. El firewall los denegó, así que aún no hay daño, pero merece una alerta, una entrada en la lista de bloqueo y comprobar que nada más de esa dirección pasó. El primer sondeo es donde empieza el escaneo."],
    "new-service": ["Cambios en el sistema", "Registros de sistema y de seguridad de Windows", "Todas estas líneas son sospechosas a las 2 de la madrugada (un servicio que se ejecuta desde una carpeta pública, una cuenta de administrador nueva), pero borrar el registro de auditoría (1102) es el atacante cubriendo su rastro y la señal más fuerte de compromiso. Trata el equipo como comprometido, reúne los registros que queden en tu SIEM e inicia la respuesta a incidentes."],
    "web-shell": ["Solicitudes al servidor web", "Registro de accesos web (dirección, solicitud, estado)", "Se subió un archivo .php mediante la subida de avatares y luego se pidió con un parámetro cmd, que devolvió 200. Es una web shell: el atacante ya puede ejecutar comandos en el servidor. Desconecta el sitio o bloquea la ruta, elimina el archivo y corrige la subida para que solo acepte imágenes y nunca las ejecute."]
  },
  tabletops: {
    ransomware: { title: "Ransomware en el servidor de archivos", blurb: "Lunes, 7:40: el personal no puede abrir los archivos compartidos y hay una nota de rescate en el servidor de archivos.", nodes: {
      start: { text: "Varias personas informan que los archivos de la unidad compartida ahora terminan en .locked, y un archivo llamado READ_ME.txt exige un pago en criptomonedas. El servidor de archivos sigue en la red. ¿Qué haces primero?", choices: [
        ["Desconectar el servidor de archivos de la red, pero dejarlo encendido", "Correcto. Aislarlo impide que el cifrado se extienda a más recursos compartidos y equipos, y dejarlo encendido conserva la evidencia en memoria (procesos, claves) que un apagado perdería."],
        ["Apagar el servidor de archivos de inmediato", "Detiene el daño, pero pierdes lo que hay en memoria, que puede ayudar a la investigación o incluso a la recuperación. Aislarlo de la red suele ser mejor."],
        ["Contactar a los atacantes para preguntar el precio", "No como primer paso. Hablar con los atacantes es una decisión de la dirección, el asesor legal y a menudo las autoridades, después de la contención. Ahora mismo el cifrado puede seguir extendiéndose."]
      ] },
      scope: { text: "El servidor está aislado. La herramienta de seguridad muestra el mismo programa de cifrado en dos portátiles de finanzas. ¿Y ahora?", choices: [
        ["Aislar también esos dos portátiles y buscar el primer equipo infectado", "Sí. Contén todos los equipos afectados y luego encuentra el paciente cero: saber cómo entraron los atacantes te dice qué más revisar y corregir."],
        ["Reinstalar los dos portátiles de inmediato", "Hay que reconstruirlos, pero no antes de capturar lo necesario para saber cómo empezó el ataque. Primero aísla, reúne evidencia y luego reconstruye."],
        ["Esperar a ver si más equipos muestran síntomas", "Esperar deja que el ataque se extienda. Contén lo que ya conoces."]
      ] },
      notify: { text: "La infección vino de un correo de phishing que se abrió en un portátil de finanzas el viernes pasado. ¿Quién tiene que saberlo ahora?", choices: [
        ["Seguir el plan de respuesta a incidentes: la dirección, el equipo legal y, si puede haber datos personales, el responsable de privacidad; valorar avisar a las autoridades", "Correcto. El plan dice a quién llamar. Los equipos legal y de privacidad deciden las obligaciones de notificación (muchas leyes tienen plazos), y las autoridades pueden tener descifradores o información."],
        ["Solo el equipo de TI, para evitar el pánico", "Dejarlo dentro de TI arriesga incumplir plazos legales de notificación y deja a quienes deciden sin información. Sigue el plan de comunicación."],
        ["Publicar una actualización en las redes sociales de la empresa", "Las declaraciones públicas llegan después, a través del equipo de comunicación y el legal, con los hechos confirmados."]
      ] },
      recover: { text: "Las copias de seguridad son copias sin conexión del domingo por la noche y no están cifradas. ¿Cómo recuperas?", choices: [
        ["Reconstruir los equipos afectados, parchear y cambiar credenciales, luego restaurar desde las copias limpias y vigilar de cerca", "Correcto. Elimina el acceso del atacante antes de restaurar (puede seguir teniendo contraseñas), restaura desde copias que sabes que están bien y vigila por si vuelve."],
        ["Restaurar las copias sobre los servidores existentes de inmediato", "Es más rápido, pero si el atacante sigue teniendo acceso o una puerta trasera en esos servidores, puede volver a cifrar los archivos restaurados."],
        ["Pagar el rescate, porque puede ser más rápido", "Con copias limpias no hay motivo para pagar; además, pagar financia el delito, puede violar leyes de sanciones y no garantiza un descifrado que funcione."]
      ] },
      lessons: { text: "Los archivos están restaurados y el negocio funciona. Haz una reunión de lecciones aprendidas en menos de dos semanas: qué funcionó (las copias sin conexión), qué no (el correo de phishing pasó y el cifrado llegó a una unidad compartida) y qué cambiar: filtrado de correo, formación sobre phishing, acceso con privilegios mínimos a los recursos compartidos y un aislamiento más rápido." }
    } },
    phishing: { title: "Un empleado escribió su contraseña en una página falsa", blurb: "Un empleado informa que escribió su contraseña en una página de inicio de sesión que venía en un correo, y no funcionó.", nodes: {
      start: { text: "A las 10:15 llama un empleado: un correo sobre una \"factura compartida\" lo llevó a una página de inicio de sesión que parecía de Microsoft. Escribió su contraseña y no pasó nada. ¿Qué haces primero?", choices: [
        ["Restablecer su contraseña y revocar todas sus sesiones", "Correcto. Supón que la contraseña fue robada. Revocar las sesiones importa tanto como el cambio: el atacante puede tener ya un token de sesión que sigue funcionando después del cambio de contraseña."],
        ["Decirle que no se preocupe, porque la página no funcionó", "Que la página \"no funcione\" es lo típico: recogió la contraseña y falló a propósito. Trátalo como un compromiso."],
        ["Pedirle que reenvíe el correo a todos como advertencia", "Reenviarlo difunde el enlace malicioso. Mejor avisar a seguridad, que puede eliminarlo de todos los buzones."]
      ] },
      check: { text: "Su cuenta muestra un inicio de sesión a las 10:09 desde otro país, que pasó la MFA después de que aprobara una notificación que no esperaba. ¿Qué revisas?", choices: [
        ["Los registros de inicio de sesión, reglas nuevas del buzón (reenvío o borrado), métodos de MFA nuevos y consentimientos a aplicaciones añadidos desde las 10:09", "Sí. Los atacantes suelen añadir reglas para ocultar respuestas, registrar su propio método de MFA o dar acceso a una aplicación para conservar una forma de entrar tras el cambio de contraseña."],
        ["Nada más: la contraseña ya está cambiada", "Un cambio de contraseña no deshace reglas del buzón, dispositivos de MFA añadidos ni aplicaciones con consentimiento. Busca persistencia."],
        ["Solo su computadora", "Vale la pena revisarla, pero este ataque fue contra la cuenta en la nube. Lo que más importa es la configuración y los registros de la cuenta."]
      ] },
      wider: { text: "Encuentras una regla que reenvía el correo a una dirección externa, y el mismo correo de phishing llegó a otras 40 personas. ¿Y ahora?", choices: [
        ["Eliminar la regla, purgar el correo de todos los buzones, bloquear al remitente y el enlace, y comprobar quién más hizo clic", "Correcto. Limpia esta cuenta y luego trátalo como un incidente de toda la organización: encuentra a cada destinatario que hizo clic o escribió una contraseña."],
        ["Eliminar la regla y cerrar el caso", "Otras cuarenta personas lo recibieron. Algunas pueden haber escrito también su contraseña."],
        ["Bloquear solo la dirección externa de reenvío", "Ayuda, pero deja el correo en 40 buzones y no encuentra a otras víctimas."]
      ] },
      lessons: { text: "Lecciones: el empleado avisó rápido, lo que limitó el daño, así que dale las gracias. Cambios a considerar: MFA con número de coincidencia o resistente al phishing (llaves de acceso o de seguridad) en lugar de una simple aprobación, bloquear el reenvío automático fuera de la organización, y recordar que una página de inicio de sesión que llega por un enlace de correo nunca es segura." }
    } },
    "lost-laptop": { title: "Un portátil perdido", blurb: "Un gerente dejó su portátil del trabajo en un tren. Contiene hojas de cálculo de clientes.", nodes: {
      start: { text: "Una gerente de ventas informa que dejó su portátil en un tren hace una hora. Tiene hojas de cálculo de clientes con nombres y teléfonos. ¿Qué compruebas primero?", choices: [
        ["Si el disco está cifrado y cuándo se conectó por última vez a la gestión de dispositivos", "Correcto. El cifrado de disco completo (BitLocker o FileVault) convierte esto de una probable filtración de datos en un equipo perdido, así que decide todo lo que sigue."],
        ["Si la gerente recuerda su contraseña", "Su contraseña no es la cuestión. Lo que importa es si quien encuentre el portátil puede leer el disco."],
        ["Pedir un portátil de reemplazo", "Hará falta, pero no reduce el riesgo del que se perdió."]
      ] },
      act: { text: "La gestión de dispositivos muestra que el portátil está cifrado, pero se vio conectado por última vez hace 50 minutos. ¿Qué haces?", choices: [
        ["Enviar un bloqueo y borrado remotos, deshabilitar sus certificados y revocar las sesiones de la gerente", "Correcto. El borrado se ejecuta la próxima vez que se conecte; revocar las sesiones y los certificados del equipo impide que llegue a los sistemas de la empresa aunque alguien pase la pantalla de bloqueo."],
        ["Esperar un día por si alguien lo devuelve", "Esperar da más tiempo a quien lo encontró. Si aparece, puedes recuperar los archivos de la copia de seguridad."],
        ["Cambiar la contraseña del Wi-Fi de la oficina", "Eso no resuelve el riesgo: el portátil puede conectarse desde cualquier sitio."]
      ] },
      report: { text: "Registra el incidente y deja que el responsable de privacidad decida sobre las notificaciones. Como el disco estaba cifrado, muchas leyes de privacidad no exigen avisar a los clientes, pero esa decisión le corresponde a esa persona. Lecciones: confirmar que el cifrado es obligatorio en todos los portátiles, guardar los datos de clientes en almacenamiento en la nube gestionado en lugar de en el portátil, y hacer que informar de un dispositivo perdido sea rápido y sin culpas." }
    } }
  },
  phases: { "Detection and analysis": "Detección y análisis", "Containment": "Contención", "Eradication and recovery": "Erradicación y recuperación", "Post-incident activity": "Actividad posterior al incidente" }
};
