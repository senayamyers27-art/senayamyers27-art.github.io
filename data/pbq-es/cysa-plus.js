/* Spanish translation of the CompTIA CySA+ exam simulations. Same ids and structure as data/pbq/cysa-plus.js. */
CertHub.addPbqs("cysa-plus", [
  { id: "ssh-spray-log", d: 1, type: "select", title: "Detecta password spraying en auth.log",
    prompt: "Estás revisando /var/log/auth.log en un servidor Ubuntu expuesto a internet. Selecciona todas las líneas del log que forman parte de un intento de password spraying.",
    context: "Mar 04 02:11:05 web01 sshd[2211]: Accepted publickey for deploy from 10.0.5.20 port 50122 ssh2\nMar 04 02:14:31 web01 sshd[2240]: Failed password for invalid user admin from 203.0.113.45 port 41822 ssh2\nMar 04 02:14:33 web01 sshd[2242]: Failed password for jsmith from 203.0.113.45 port 41830 ssh2\nMar 04 02:14:35 web01 sshd[2244]: Failed password for mlopez from 203.0.113.45 port 41838 ssh2\nMar 04 02:14:37 web01 sshd[2246]: Failed password for invalid user oracle from 203.0.113.45 port 41846 ssh2\nMar 04 02:20:10 web01 sshd[2301]: Failed password for bchen from 10.0.5.31 port 50410 ssh2\nMar 04 02:20:18 web01 sshd[2303]: Accepted password for bchen from 10.0.5.31 port 50412 ssh2\nMar 04 02:25:01 web01 CRON[2400]: pam_unix(cron:session): session opened for user root by (uid=0)",
    options: [
      "02:11:05 Accepted publickey for deploy from 10.0.5.20",
      "02:14:31 Failed password for invalid user admin from 203.0.113.45",
      "02:14:33 Failed password for jsmith from 203.0.113.45",
      "02:14:35 Failed password for mlopez from 203.0.113.45",
      "02:14:37 Failed password for invalid user oracle from 203.0.113.45",
      "02:20:10 Failed password for bchen from 10.0.5.31",
      "02:20:18 Accepted password for bchen from 10.0.5.31",
      "02:25:01 Sesión de CRON abierta para el usuario root"
    ],
    answers: [1, 2, 3, 4],
    explain: "El password spraying prueba una o pocas contraseñas comunes contra muchas cuentas distintas, así que la firma es un solo origen (203.0.113.45) que falla una vez contra admin, jsmith, mlopez y oracle en cuestión de segundos. Las líneas de bchen son un error de tecleo desde una dirección interna seguido de un acceso exitoso, lo cual es comportamiento normal de un usuario. El inicio de sesión con clave de deploy y la sesión de cron de root son rutinarios. Compáralo con la fuerza bruta, que martilla una sola cuenta con muchas contraseñas."
  },
  { id: "event-id-match", d: 1, type: "match", title: "Relaciona los Event IDs de Windows y Sysmon",
    prompt: "Estás creando búsquedas en el SIEM para un dominio Windows. Relaciona cada Event ID con lo que registra.",
    pairs: [
      ["Security 4624", "Inicio de sesión exitoso"],
      ["Security 4625", "Inicio de sesión fallido"],
      ["Security 4688", "Se creó un proceso nuevo"],
      ["Security 4720", "Se creó una cuenta de usuario"],
      ["Security 4698", "Se creó una tarea programada"],
      ["Security 1102", "Se borró el log de auditoría de seguridad"],
      ["Sysmon 3", "Conexión de red realizada por un proceso"]
    ],
    extra: ["Cuenta bloqueada", "Solicitud de TGT de Kerberos"],
    explain: "4624 y 4625 son el par de inicio de sesión exitoso y fallido que se usa para detectar fuerza bruta y spraying. 4688 registra la creación de procesos (habilita la auditoría de línea de comandos para ver los argumentos), 4720 señala cuentas nuevas que podrían ser puertas traseras del atacante y 4698 detecta persistencia mediante tareas programadas. 1102 significa que alguien borró el log de Security, un fuerte indicador de antiforense. El Event ID 3 de Sysmon vincula una conexión de red con la imagen del proceso, algo que los logs del firewall no pueden hacer. El bloqueo de cuenta es 4740 y una solicitud de TGT de Kerberos es 4768."
  },
  { id: "phish-header-fill", d: 1, type: "fill", title: "Lee los resultados de autenticación de un correo de phishing",
    prompt: "Un usuario reportó este correo sobre la nómina. Lee los encabezados y completa los valores.",
    context: "Received: from mail.payroll-example.net (mail.payroll-example.net [198.51.100.23])\n        by mx.example.com with ESMTPS; Tue, 11 Mar 2026 08:02:44 +0000\nAuthentication-Results: mx.example.com;\n        spf=fail (mx.example.com: domain of bounce@payroll-example.net does not designate 198.51.100.23 as permitted sender) smtp.mailfrom=payroll-example.net;\n        dkim=none (message not signed);\n        dmarc=fail (p=REJECT sp=REJECT dis=NONE) header.from=example.com\nReturn-Path: <bounce@payroll-example.net>\nFrom: \"Example Payroll\" <payroll@example.com>\nReply-To: <payroll-desk@example.net>\nSubject: Action required: confirm your direct deposit details",
    fields: [
      { label: "Dirección IP del servidor que entregó el mensaje a mx.example.com", answers: ["198.51.100.23"] },
      { label: "Resultado de SPF", answers: ["fail", "falló"] },
      { label: "Política DMARC publicada por example.com (none, quarantine o reject)", answers: ["reject", "p=reject"] },
      { label: "Dominio al que realmente llegarán las respuestas", answers: ["example.net"] }
    ],
    explain: "El último encabezado Received que agregó tu propio MX muestra la IP real de envío, 198.51.100.23. SPF falló porque esa IP no está autorizada para el dominio del remitente del sobre, y no hay firma DKIM, así que nada se alinea con el dominio From example.com y DMARC falla. La política publicada es p=REJECT, que el servidor receptor debió haber aplicado. El Reply-To apunta a example.net, un truco clásico para que la respuesta de la víctima le llegue al atacante aunque la línea From parezca interna."
  },
  { id: "web-log-injection", d: 1, type: "select", title: "Encuentra cadenas de ataque en un log de acceso web",
    prompt: "Selecciona todas las solicitudes de este log de acceso del servidor web que muestran un intento de inyección o de traversal.",
    context: "198.51.100.14 - - [12/Mar/2026:10:01:12 +0000] \"GET /products.php?id=42 HTTP/1.1\" 200 5120\n198.51.100.14 - - [12/Mar/2026:10:01:15 +0000] \"GET /products.php?id=42%27%20OR%20%271%27%3D%271 HTTP/1.1\" 500 312\n203.0.113.88 - - [12/Mar/2026:10:02:40 +0000] \"GET /search?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E HTTP/1.1\" 200 2210\n192.168.20.5 - - [12/Mar/2026:10:03:02 +0000] \"GET /images/logo.png HTTP/1.1\" 304 0\n203.0.113.88 - - [12/Mar/2026:10:03:30 +0000] \"GET /download?file=..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1\" 403 199\n192.168.20.9 - - [12/Mar/2026:10:04:11 +0000] \"POST /login HTTP/1.1\" 302 0\n203.0.113.88 - - [12/Mar/2026:10:05:47 +0000] \"GET /ping.php?host=127.0.0.1%3Bid HTTP/1.1\" 200 88\n192.168.20.9 - - [12/Mar/2026:10:06:02 +0000] \"GET /search?q=running+shoes HTTP/1.1\" 200 4410",
    options: [
      "10:01:12 GET /products.php?id=42",
      "10:01:15 GET /products.php?id=42' OR '1'='1 (codificado en URL)",
      "10:02:40 GET /search?q=<script>alert(1)</script> (codificado en URL)",
      "10:03:02 GET /images/logo.png",
      "10:03:30 GET /download?file=../../../etc/passwd (codificado en URL)",
      "10:04:11 POST /login",
      "10:05:47 GET /ping.php?host=127.0.0.1;id (codificado en URL)",
      "10:06:02 GET /search?q=running+shoes"
    ],
    answers: [1, 2, 4, 6],
    explain: "Primero decodifica la codificación URL (%27 es una comilla, %3C y %3E son los signos de menor y mayor, %2F es una diagonal y %3B es un punto y coma). La cláusula OR siempre verdadera es inyección SQL, y el error 500 sugiere que la consulta se rompió. La etiqueta script es XSS reflejado, las secuencias ../ son directory traversal (bloqueado con un 403), y el punto y coma seguido de id es inyección de comandos del sistema operativo contra la página de ping. Las líneas restantes son tráfico normal de páginas, imágenes, login y búsqueda."
  },
  { id: "cvss-vector-fill", d: 2, type: "fill", title: "Decodifica un vector CVSS",
    prompt: "Un reporte del escáner muestra CVSS:3.1/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:N/A:N para un hallazgo. Completa el valor de cada métrica.",
    fields: [
      { label: "Attack Vector (vector de ataque)", answers: ["Adjacent", "Red adyacente", "Adyacente"] },
      { label: "Privileges Required (privilegios requeridos)", answers: ["Bajo"] },
      { label: "User Interaction (interacción del usuario)", answers: ["Requerida"] },
      { label: "Scope (alcance)", answers: ["Sin cambios"] },
      { label: "La única métrica de impacto calificada como High (Confidencialidad, Integridad o Disponibilidad)", answers: ["Confidencialidad", "C"] }
    ],
    explain: "AV:A significa que el atacante debe estar en el mismo segmento de red lógico o de broadcast (adyacente), no en cualquier parte de internet (N) ni en el propio equipo (L). PR:L requiere una cuenta de usuario básica, UI:R requiere que una víctima realice alguna acción, y S:U significa que el impacto se queda dentro del componente vulnerable. Solo C:H es alto, así que se trata de una falla de divulgación de información sin impacto en la integridad ni en la disponibilidad. Esas restricciones mantienen el puntaje base muy por debajo de un 9.8 accesible por red y sin interacción."
  },
  { id: "vuln-tool-match", d: 2, type: "match", title: "Elige el método de evaluación correcto",
    prompt: "Relaciona cada requisito con el método o la herramienta de evaluación que mejor se ajusta.",
    pairs: [
      ["Revisar código fuente Java en busca de fallas de inyección sin ejecutar la app", "Pruebas estáticas de seguridad de aplicaciones (SAST)"],
      ["Recorrer y atacar automáticamente una app web de staging en ejecución", "Pruebas dinámicas de seguridad de aplicaciones (DAST)"],
      ["Encontrar bibliotecas open source con vulnerabilidades conocidas que llegan a través de dependencias", "Análisis de composición de software (SCA)"],
      ["Enviar entradas malformadas y aleatorias a un parser de archivos para encontrar fallas", "Fuzzing"],
      ["Señalar continuamente buckets de almacenamiento públicos y security groups abiertos", "Gestión de la postura de seguridad en la nube (CSPM)"],
      ["Inventariar los PLC de una línea de producción activa sin enviarles tráfico", "Monitoreo pasivo de red"]
    ],
    extra: ["Ping sweep", "Ejercicio de mesa (tabletop)"],
    explain: "SAST lee el código en reposo, mientras que DAST prueba la aplicación en ejecución desde afuera. SCA compara los componentes de terceros contra CVE conocidos, algo que ni SAST ni DAST hacen bien. El fuzzing lanza entradas inesperadas a un programa para encontrar caídas y errores de memoria. CSPM revisa continuamente la configuración de la nube, y en OT se prefiere el monitoreo pasivo porque los sondeos activos pueden hacer caer PLC frágiles. Un ping sweep es descubrimiento activo y un tabletop es un ejercicio de IR, así que ninguno encaja."
  },
  { id: "nmap-exposure", d: 2, type: "select", title: "Señala servicios inseguros en la salida de nmap",
    prompt: "Este escaneo de servicios con nmap apunta a un servidor web y de archivos en la DMZ. Selecciona todos los servicios que deben reportarse como una configuración insegura que requiere corrección.",
    context: "$ nmap -sS -sU -sV -sC -p T:21,22,23,80,443,U:161 192.0.2.40\nPORT    STATE SERVICE  VERSION\n21/tcp  open  ftp      vsftpd 3.0.5\n| ftp-anon: Anonymous FTP login allowed (FTP code 230)\n22/tcp  open  ssh      OpenSSH 9.6p1 (protocol 2.0)\n23/tcp  open  telnet   Linux telnetd\n80/tcp  open  http     nginx 1.26.1\n|_http-title: 301 Moved Permanently (redirects to HTTPS on 443)\n443/tcp open  ssl/http nginx 1.26.1\n| ssl-enum-ciphers: TLSv1.3 only, least strength: A\n161/udp open  snmp     SNMPv1 server (net-snmp)\n| snmp-info: community string: public",
    options: [
      "21/tcp FTP con inicio de sesión anónimo permitido",
      "22/tcp OpenSSH 9.6p1",
      "23/tcp Telnet",
      "80/tcp HTTP que redirige a HTTPS",
      "443/tcp HTTPS que ofrece solo TLS 1.3",
      "161/udp SNMP que responde a la community string public"
    ],
    answers: [0, 2, 5],
    explain: "El FTP anónimo permite que cualquiera lea (y posiblemente escriba) archivos, y de todas formas FTP envía las credenciales en texto claro, así que deshabilita el acceso anónimo y migra a SFTP. Telnet envía todas las credenciales en texto claro y debe reemplazarse por el servicio SSH que ya está en ejecución. SNMPv1 con la community string predeterminada public expone detalles del dispositivo a cualquiera que pregunte; usa SNMPv3 con autenticación y cifrado. Un OpenSSH actualizado, una redirección de HTTP a HTTPS y HTTPS solo con TLS 1.3 son aceptables."
  },
  { id: "kill-chain-match", d: 3, type: "match", title: "Mapea una intrusión a la Cyber Kill Chain",
    prompt: "Un reporte de incidente describe estas acciones del atacante. Relaciona cada una con su fase de la Cyber Kill Chain de Lockheed Martin.",
    pairs: [
      ["Recopiló nombres y cargos del personal de finanzas desde el sitio web público de la empresa", "Reconocimiento"],
      ["Creó un documento de factura con una macro maliciosa que descarga un loader", "Weaponization (armamentización)"],
      ["Envió por correo el documento de factura a seis empleados de finanzas", "Entrega"],
      ["La macro se ejecutó cuando un usuario hizo clic en Habilitar contenido", "Explotación"],
      ["El loader agregó una clave Run en el registro que apunta a su ejecutable", "Instalación"],
      ["El implante contactó a 203.0.113.50 por HTTPS cada 60 segundos para recibir tareas", "Comando y control"],
      ["Los archivos de diseño del personal se comprimieron y se subieron al almacenamiento del atacante", "Acciones sobre los objetivos"]
    ],
    explain: "La Kill Chain va así: reconocimiento, weaponization, entrega, explotación, instalación, comando y control, y luego acciones sobre los objetivos. Recopilar nombres es reconocimiento, y combinar la macro con el loader ocurre antes de que algo llegue a la víctima, lo cual es weaponization. Enviar el correo es la entrega, el código que se ejecuta en el endpoint es la explotación, y la clave Run es persistencia en la fase de instalación. El beaconing regular para recibir tareas es C2, y robar los archivos de diseño es la meta del atacante, las acciones sobre los objetivos."
  },
  { id: "ir-malware-order", d: 3, type: "order", title: "Ordena la respuesta a una estación de trabajo infectada",
    prompt: "El EDR marca una estación de trabajo por comportamiento similar a ransomware. Pon estas actividades de respuesta a incidentes en el orden correcto.",
    steps: [
      "Mantener un playbook de ransomware aprobado y probar el aislamiento de red del EDR (antes de cualquier incidente)",
      "Validar la alerta y confirmar que la estación de trabajo está comprometida",
      "Aislar la estación de trabajo de la red usando la contención del EDR",
      "Eliminar el malware, su tarea programada y la cuenta creada por el atacante",
      "Reinstalar la imagen o restaurar desde un respaldo limpio, y luego monitorear antes de devolvérsela al usuario",
      "Hacer una revisión de lecciones aprendidas y actualizar el playbook"
    ],
    explain: "Esto sigue el ciclo de vida de respuesta a incidentes del NIST: preparación, detección y análisis, contención, erradicación, recuperación y actividad posterior al incidente. La contención va antes de la erradicación para que el malware no se propague mientras limpias. La recuperación usa una imagen o un respaldo en buen estado conocido y monitoreo adicional para confirmar que la amenaza desapareció. La revisión de lecciones aprendidas cierra el ciclo al retroalimentar mejoras hacia la preparación."
  },
  { id: "volatility-order", d: 3, type: "order", title: "Recolecta evidencia según el orden de volatilidad",
    prompt: "Debes recolectar evidencia de un servidor Linux comprometido que sigue en ejecución. Ordena estas fuentes de la MÁS volátil a la MENOS volátil.",
    steps: [
      "Registros y caché de la CPU",
      "RAM: procesos en ejecución, conexiones de red, tablas ARP y de enrutamiento",
      "Sistemas de archivos temporales, como un /tmp montado en tmpfs",
      "Disco local (imagen forense)",
      "Logs remotos ya reenviados al SIEM",
      "Cintas de respaldo archivadas"
    ],
    explain: "Siguiendo el orden de volatilidad (RFC 3227), recolecta primero lo que desaparece más rápido. Los registros y la caché cambian en nanosegundos, y la RAM se pierde al apagar el equipo junto con el estado de procesos, conexiones y ARP. Un /tmp en tmpfs vive en memoria y desaparece al reiniciar, mientras que el disco persiste pero todavía puede ser alterado por el sistema en ejecución. Los logs remotos del SIEM y los respaldos archivados son lo más estable, porque el atacante en este host tiene la menor capacidad de modificarlos."
  },
  { id: "report-audience-match", d: 4, type: "match", title: "Adapta el reporte del incidente a cada audiencia",
    prompt: "Después de una filtración que involucra PII de clientes, relaciona a cada parte interesada con la información que más necesita del equipo de seguridad.",
    pairs: [
      ["Consejo de administración", "Impacto en el negocio, tendencia del riesgo y decisiones o fondos necesarios"],
      ["Administradores de sistemas", "Hosts afectados, IDs de CVE, evidencia y pasos de corrección"],
      ["Asesoría legal", "Qué datos se expusieron, para las obligaciones de notificación y la retención legal (legal hold)"],
      ["Relaciones públicas", "Hechos aprobados para el comunicado público y las consultas de los medios"],
      ["Recursos humanos", "Evidencia de participación de empleados para cualquier acción disciplinaria"]
    ],
    extra: ["Capturas de paquetes sin procesar y consultas del SIEM"],
    explain: "Los ejecutivos y el consejo necesitan el impacto en el negocio y decisiones, no detalles técnicos. Los administradores necesitan datos específicos y accionables para resolver el problema. La asesoría legal decide las obligaciones de notificación de la filtración y preserva la evidencia, relaciones públicas le da a la organización una sola voz pública precisa, y recursos humanos maneja las acciones laborales cuando hay un insider involucrado. Las capturas de paquetes sin procesar y las consultas van en un anexo técnico, no en el resumen de ninguna de estas audiencias."
  },
  { id: "mttr-sla-fill", d: 4, type: "fill", title: "Calcula métricas de corrección",
    prompt: "La política indica que las vulnerabilidades críticas deben corregirse en un plazo de 15 días. Usa la tabla para completar las métricas de los hallazgos críticos del mes pasado.",
    context: "Hallazgo  Descubierto  Corregido    \n--------  -----------  -----------\nVULN-101  2026-01-02   2026-01-10\nVULN-102  2026-01-03   2026-01-25\nVULN-103  2026-01-05   2026-01-11\nVULN-104  2026-01-08   2026-01-20",
    fields: [
      { label: "Tiempo medio de corrección (días)", answers: ["12", "12 días"] },
      { label: "Número de hallazgos que incumplieron el SLA de 15 días", answers: ["1", "uno"] },
      { label: "Tasa de cumplimiento del SLA (%)", answers: ["75", "75%", "75 %"] }
    ],
    explain: "Los días abiertos son 8, 22, 6 y 12, que suman 48, así que el tiempo medio de corrección es 48 / 4 = 12 días. Solo VULN-102 tardó más de 15 días, así que 3 de 4 hallazgos cumplieron el SLA, para un 75% de cumplimiento. Reportar ambos números es importante: un promedio sano puede ocultar hallazgos individuales que estuvieron abiertos demasiado tiempo, y por eso el cumplimiento del SLA se mide por separado."
  }
]);
