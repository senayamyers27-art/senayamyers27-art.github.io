/* "A day in the life" for each career track (shown on the career pages). A typical day for one common entry or
   early-career role; real days vary by employer. Each entry: role, then [time, what happens] pairs, in English and Spanish. */
CertHub.dayInLife = {
  cybersecurity: {
    en: { role: "SOC analyst (tier 1)", day: [
      ["8:00", "Handover from the night shift: which alerts are still open and what's being watched."],
      ["8:30", "Work the alert queue in the SIEM: a burst of failed sign-ins, a malware detection on a laptop, a user reporting a phishing email."],
      ["10:30", "The phishing email was real: find who else received it, remove it from mailboxes and block the sender and link."],
      ["12:30", "Escalate a suspicious PowerShell alert to a tier 2 analyst with a clear write-up: what happened, when, on which host, and what you checked."],
      ["14:00", "Tune a noisy detection rule that fires on a legitimate backup job, so real alerts don't get buried."],
      ["16:00", "Write up the day's tickets, update the runbook with what you learned, and hand over to the next shift."]
    ] },
    es: { role: "Analista de SOC (nivel 1)", day: [
      ["8:00", "Traspaso del turno de noche: qué alertas siguen abiertas y qué se está vigilando."],
      ["8:30", "Trabajar la cola de alertas en el SIEM: una ráfaga de inicios de sesión fallidos, una detección de malware en un portátil, un usuario que reporta un correo de phishing."],
      ["10:30", "El correo de phishing era real: averiguar quién más lo recibió, eliminarlo de los buzones y bloquear el remitente y el enlace."],
      ["12:30", "Escalar una alerta sospechosa de PowerShell a un analista de nivel 2 con un informe claro: qué pasó, cuándo, en qué equipo y qué comprobaste."],
      ["14:00", "Ajustar una regla de detección ruidosa que salta con una copia de seguridad legítima, para que las alertas reales no se pierdan."],
      ["16:00", "Documentar los casos del día, actualizar el manual de procedimientos con lo aprendido y pasar el turno."]
    ] }
  },
  network: {
    en: { role: "Network technician / junior network engineer", day: [
      ["8:00", "Check the monitoring dashboard: one branch office's link flapped overnight."],
      ["9:00", "Read the interface counters and logs on the branch router, find errors on the WAN port, and open a ticket with the carrier."],
      ["11:00", "Add a new VLAN for the building's security cameras, trunk it to the right switches and document the change."],
      ["13:00", "Help desk escalation: a meeting room has no Wi-Fi. A cleared access point had lost its configuration; restore it from the saved copy."],
      ["15:00", "Prepare tonight's change window: switch firmware upgrades, with a rollback plan and a list of checks to run after."],
      ["16:30", "Update the network diagram and IP address records with today's changes."]
    ] },
    es: { role: "Técnico de redes / ingeniero de redes júnior", day: [
      ["8:00", "Revisar el panel de monitoreo: el enlace de una sucursal se cayó varias veces durante la noche."],
      ["9:00", "Leer los contadores de interfaz y los registros del router de la sucursal, encontrar errores en el puerto WAN y abrir un caso con el proveedor."],
      ["11:00", "Agregar una VLAN nueva para las cámaras de seguridad del edificio, llevarla por troncal a los switches correctos y documentar el cambio."],
      ["13:00", "Escalamiento de soporte: una sala de reuniones no tiene Wi-Fi. Un punto de acceso había perdido su configuración; restaurarla desde la copia guardada."],
      ["15:00", "Preparar la ventana de cambios de esta noche: actualizaciones de firmware de switches, con plan de reversión y una lista de comprobaciones posteriores."],
      ["16:30", "Actualizar el diagrama de red y el registro de direcciones IP con los cambios de hoy."]
    ] }
  },
  software: {
    en: { role: "Junior software developer", day: [
      ["9:00", "Stand-up meeting: what you finished yesterday, what you're doing today, and anything blocking you."],
      ["9:30", "Pick up a ticket: the sign-up form accepts an invalid email address. Write a failing test first, then the fix."],
      ["11:30", "Open a pull request. The automated checks (tests, linting, a security scan) run; a teammate reviews it and asks for a clearer variable name."],
      ["13:30", "Pair with a senior developer on a new feature, learning how the codebase handles payments."],
      ["15:00", "Investigate a bug report from production using the logs, and reproduce it locally."],
      ["16:30", "Update the pull request, get it approved and merged, and watch it deploy."]
    ] },
    es: { role: "Desarrollador de software júnior", day: [
      ["9:00", "Reunión diaria: qué terminaste ayer, qué harás hoy y si algo te bloquea."],
      ["9:30", "Tomar una tarea: el formulario de registro acepta un correo inválido. Escribir primero una prueba que falle y luego la corrección."],
      ["11:30", "Abrir una solicitud de cambios. Se ejecutan las comprobaciones automáticas (pruebas, linter, un escaneo de seguridad); un compañero la revisa y pide un nombre de variable más claro."],
      ["13:30", "Programar en pareja con un desarrollador sénior en una función nueva, aprendiendo cómo el código gestiona los pagos."],
      ["15:00", "Investigar un error reportado en producción con los registros y reproducirlo en local."],
      ["16:30", "Actualizar la solicitud de cambios, conseguir la aprobación, fusionarla y ver cómo se despliega."]
    ] }
  },
  secadmin: {
    en: { role: "Security administrator", day: [
      ["8:30", "Review last night's vulnerability scan: two servers are missing a critical patch."],
      ["9:30", "Schedule the patches with the server owners and add a temporary firewall rule to limit exposure until then."],
      ["11:00", "Process access requests: a new hire's accounts and groups, and removing access for someone who changed teams."],
      ["13:00", "Quarterly access review: send managers the list of who can reach their systems and record their answers."],
      ["14:30", "Update the firewall and endpoint policies after a new threat advisory from a vendor."],
      ["16:00", "Write the monthly security report: patch levels, open risks and what changed."]
    ] },
    es: { role: "Administrador de seguridad", day: [
      ["8:30", "Revisar el escaneo de vulnerabilidades de anoche: a dos servidores les falta un parche crítico."],
      ["9:30", "Programar los parches con los responsables de los servidores y añadir una regla temporal de firewall para limitar la exposición mientras tanto."],
      ["11:00", "Tramitar solicitudes de acceso: las cuentas y grupos de una nueva incorporación, y retirar accesos a alguien que cambió de equipo."],
      ["13:00", "Revisión trimestral de accesos: enviar a los responsables la lista de quién puede entrar a sus sistemas y registrar sus respuestas."],
      ["14:30", "Actualizar las políticas de firewall y de endpoints tras un nuevo aviso de amenaza de un fabricante."],
      ["16:00", "Redactar el informe mensual de seguridad: nivel de parches, riesgos abiertos y cambios."]
    ] }
  },
  sysadmin: {
    en: { role: "IT support technician / junior systems administrator", day: [
      ["8:00", "Check the overnight backup report: one job failed because a disk filled up. Free space and rerun it."],
      ["9:00", "Help desk queue: a locked-out account, a printer that won't print, and a new laptop to set up."],
      ["11:00", "Build the new laptop from the standard image, enroll it in device management and confirm disk encryption is on."],
      ["13:00", "Apply this month's operating system updates to a test group before they go to everyone."],
      ["15:00", "Write a short how-to for a common request so the next person can fix it without escalating."],
      ["16:30", "Close tickets with clear notes on what was wrong and what fixed it."]
    ] },
    es: { role: "Técnico de soporte de TI / administrador de sistemas júnior", day: [
      ["8:00", "Revisar el informe de copias de seguridad de la noche: una falló porque se llenó un disco. Liberar espacio y volver a ejecutarla."],
      ["9:00", "Cola de soporte: una cuenta bloqueada, una impresora que no imprime y un portátil nuevo por configurar."],
      ["11:00", "Preparar el portátil nuevo con la imagen estándar, inscribirlo en la gestión de dispositivos y confirmar que el cifrado del disco está activo."],
      ["13:00", "Aplicar las actualizaciones del sistema operativo de este mes a un grupo de prueba antes de enviarlas a todos."],
      ["15:00", "Escribir una guía breve para una petición frecuente, para que la próxima persona la resuelva sin escalar."],
      ["16:30", "Cerrar los casos con notas claras sobre qué fallaba y qué lo arregló."]
    ] }
  },
  cloud: {
    en: { role: "Cloud engineer (associate level)", day: [
      ["9:00", "Check the cost and health dashboards: spending jumped yesterday because a test environment was left running."],
      ["9:45", "Shut down the forgotten resources and add a tag policy and budget alert so it's caught sooner next time."],
      ["11:00", "Review a teammate's infrastructure-as-code change that adds a storage bucket, and point out that it's publicly readable."],
      ["13:00", "Build a new environment for a project with Terraform: network, virtual machines and a managed database, all from code."],
      ["15:00", "Tighten access: replace a long-lived access key with a role, following least privilege."],
      ["16:30", "Document the new environment and add monitoring alerts for it."]
    ] },
    es: { role: "Ingeniero de nube (nivel asociado)", day: [
      ["9:00", "Revisar los paneles de costos y de estado: el gasto subió ayer porque un entorno de pruebas quedó encendido."],
      ["9:45", "Apagar los recursos olvidados y añadir una política de etiquetas y una alerta de presupuesto para detectarlo antes la próxima vez."],
      ["11:00", "Revisar un cambio de infraestructura como código de un compañero que añade un bucket de almacenamiento, y señalar que es de lectura pública."],
      ["13:00", "Crear un entorno nuevo para un proyecto con Terraform: red, máquinas virtuales y una base de datos gestionada, todo desde código."],
      ["15:00", "Restringir accesos: sustituir una clave de acceso de larga duración por un rol, siguiendo el mínimo privilegio."],
      ["16:30", "Documentar el entorno nuevo y añadirle alertas de monitoreo."]
    ] }
  },
  "data-ai": {
    en: { role: "Data analyst", day: [
      ["9:00", "Check that last night's data loads ran and the dashboard numbers look sensible."],
      ["10:00", "A manager asks why sign-ups dropped last week. Write the SQL queries to break the numbers down by channel and region."],
      ["12:00", "Clean a messy spreadsheet from another team: duplicates, mixed date formats and missing values."],
      ["13:30", "Build a chart that answers the sign-up question and write two sentences on what it shows and what it doesn't."],
      ["15:00", "Meet with the team trying an AI model to sort support emails: check its accuracy on a labeled sample and note where it gets things wrong."],
      ["16:30", "Share the findings and document the queries so they can be rerun next month."]
    ] },
    es: { role: "Analista de datos", day: [
      ["9:00", "Comprobar que las cargas de datos de anoche se ejecutaron y que los números del panel tienen sentido."],
      ["10:00", "Un responsable pregunta por qué bajaron los registros la semana pasada. Escribir las consultas SQL para desglosar los números por canal y región."],
      ["12:00", "Limpiar una hoja de cálculo desordenada de otro equipo: duplicados, formatos de fecha mezclados y valores faltantes."],
      ["13:30", "Crear un gráfico que responda a la pregunta de los registros y escribir dos frases sobre lo que muestra y lo que no."],
      ["15:00", "Reunirse con el equipo que prueba un modelo de IA para clasificar correos de soporte: comprobar su precisión en una muestra etiquetada y anotar dónde se equivoca."],
      ["16:30", "Compartir los resultados y documentar las consultas para poder repetirlas el mes que viene."]
    ] }
  }
};
