/* Spanish translation of the CompTIA Security+ exam simulations. Same ids and structure as data/pbq/security-plus.js. */
CertHub.addPbqs("security-plus", [
  { id: "control-types-match", d: 1, type: "match", title: "Clasifica los controles por tipo",
    prompt: "Un pequeño comercio minorista enumera los controles que tiene implementados. Relaciona cada control con su tipo de control.",
    pairs: [
      ["Banner de inicio de sesión que advierte que el acceso no autorizado será procesado legalmente", "Disuasivo"],
      ["Alerta del IDS cuando un escaneo de puertos llega a la DMZ", "Detectivo"],
      ["Restaurar el servidor de archivos desde el respaldo de anoche después de un ransomware", "Correctivo"],
      ["Regla de firewall que descarta el SMB entrante desde internet", "Preventivo"],
      ["Monitoreo adicional y aislamiento de red para una terminal POS heredada que no se puede parchear", "Compensatorio"],
      ["Política de uso aceptable que indica al personal no instalar software no aprobado", "Directivo"]
    ],
    explain: "Los controles disuasivos desalientan al atacante, pero no lo detienen físicamente (un banner). Los controles detectivos identifican que algo ocurrió (alerta del IDS), los correctivos restablecen después de un incidente (restauración del respaldo) y los preventivos bloquean la acción de plano (descarte del firewall). Un control compensatorio sustituye al control principal cuando este (el parcheo) no es posible, y un control directivo le dice a las personas qué hacer, normalmente mediante una política." },

  { id: "crypto-concepts-match", d: 1, type: "match", title: "Relaciona técnicas criptográficas con objetivos",
    prompt: "Relaciona cada requisito de un equipo de desarrollo con la técnica que mejor lo cumple.",
    pairs: [
      ["Hacer que dos usuarios con la misma contraseña terminen con hashes almacenados distintos", "Salting"],
      ["Hacer que cada intento de adivinar una contraseña sea más lento de calcular, p. ej. 600,000 iteraciones de PBKDF2", "Key stretching"],
      ["Reemplazar un número de tarjeta por un valor aleatorio que solo se vincula de vuelta a él en una bóveda segura", "Tokenización"],
      ["Demostrar que un PDF de contrato no ha cambiado y quién lo firmó", "Firma digital"],
      ["Ocultar un mensaje dentro de los datos de píxeles de una imagen", "Esteganografía"]
    ],
    extra: ["Enmascaramiento de datos", "Cifrado simétrico"],
    explain: "Una sal (salt) es un valor aleatorio único que se agrega a cada contraseña antes de aplicar el hash, así que contraseñas idénticas producen hashes distintos y las rainbow tables precalculadas fallan. El key stretching (PBKDF2, bcrypt) repite el trabajo para frenar la fuerza bruta. La tokenización cambia los datos sensibles por un token y guarda la correspondencia en una bóveda, mientras que el enmascaramiento solo oculta parte del valor (****1234). Una firma digital (hash cifrado con la clave privada del firmante) brinda integridad, autenticación y no repudio, y la esteganografía oculta datos dentro de otro archivo." },

  { id: "web-log-sqli", d: 2, type: "select", title: "Detecta inyección SQL en un log web",
    prompt: "Revisa el log de acceso del servidor web. Selecciona todas las solicitudes que son intentos de inyección SQL.",
    context: "203.0.113.45 - - [12/Mar/2026:10:02:11] \"GET /products.php?id=42 HTTP/1.1\" 200 5120\n203.0.113.45 - - [12/Mar/2026:10:02:19] \"GET /products.php?id=42' OR '1'='1 HTTP/1.1\" 200 98304\n198.51.100.9 - - [12/Mar/2026:10:03:02] \"GET /search?q=<script>alert(1)</script> HTTP/1.1\" 200 2210\n203.0.113.45 - - [12/Mar/2026:10:03:40] \"GET /products.php?id=42 UNION SELECT username,password FROM users-- HTTP/1.1\" 500 312\n198.51.100.23 - - [12/Mar/2026:10:04:15] \"GET /download?file=../../../../etc/passwd HTTP/1.1\" 403 199\n192.0.2.10 - - [12/Mar/2026:10:04:51] \"POST /login HTTP/1.1\" 302 0\n203.0.113.45 - - [12/Mar/2026:10:05:30] \"GET /products.php?id=42;WAITFOR DELAY '0:0:5'-- HTTP/1.1\" 200 5120",
    options: [
      "Línea 1: GET /products.php?id=42",
      "Línea 2: GET /products.php?id=42' OR '1'='1",
      "Línea 3: GET /search?q=<script>alert(1)</script>",
      "Línea 4: GET /products.php?id=42 UNION SELECT username,password FROM users--",
      "Línea 5: GET /download?file=../../../../etc/passwd",
      "Línea 6: POST /login",
      "Línea 7: GET /products.php?id=42;WAITFOR DELAY '0:0:5'--"
    ],
    answers: [1, 3, 6],
    explain: "Las líneas 2, 4 y 7 inyectan sintaxis SQL en el parámetro id: una tautología (' OR '1'='1) que devolvió una respuesta mucho más grande, una consulta UNION que intenta extraer credenciales y una prueba ciega basada en tiempo (WAITFOR DELAY). La línea 3 es cross-site scripting, la línea 5 es directory traversal, y las líneas 1 y 6 son tráfico normal. Las consultas parametrizadas y la validación de entradas son las soluciones principales, con un WAF como capa adicional." },

  { id: "attack-indicators-match", d: 2, type: "match", title: "Relaciona indicadores con ataques",
    prompt: "Un analista del SOC documenta varias observaciones. Relaciona cada observación con el ataque más probable.",
    pairs: [
      ["400 cuentas distintas tienen cada una un inicio de sesión fallido usando la contraseña Winter2026!", "Password spraying"],
      ["Una sola cuenta registra 5,000 inicios de sesión fallidos en diez minutos", "Fuerza bruta"],
      ["Muchos inicios de sesión con pares de usuario y contraseña que aparecieron en el volcado de una filtración de otro sitio", "Credential stuffing"],
      ["Un usuario se autentica desde Chicago y luego desde Singapur 20 minutos después", "Viaje imposible"],
      ["Un foro de la industria que visitan los ingenieros del objetivo es comprometido para distribuir malware", "Watering hole"],
      ["Alguien registra examp1e.com, a un carácter de diferencia del dominio de la empresa", "Typosquatting"]
    ],
    extra: ["Pharming", "Vishing"],
    explain: "El password spraying prueba una o pocas contraseñas comunes en muchas cuentas para mantenerse por debajo de los umbrales de bloqueo, mientras que la fuerza bruta martilla una sola cuenta. El credential stuffing reutiliza pares reales robados en otro lugar, y por eso reutilizar contraseñas es peligroso. El viaje imposible es un indicador de cuenta comprometida, un watering hole compromete un sitio en el que las víctimas ya confían, y el typosquatting se apoya en dominios parecidos. El pharming redirige a los usuarios envenenando el DNS o el archivo hosts, y el vishing es phishing por voz." },

  { id: "firewall-rule-review", d: 3, type: "select", title: "Revisa un conjunto de reglas de firewall",
    prompt: "Estás revisando el firewall perimetral de una red de tres zonas (internet, DMZ 10.0.10.0/24, interna). Selecciona todas las reglas que violan el mínimo privilegio o permiten un servicio inseguro y que deben eliminarse o restringirse.",
    context: "Regla Acción  Origen          Destino       Puerto/Proto Comentario\n1     ALLOW   any             10.0.10.20    443/tcp     Servidor web público (DMZ)\n2     ALLOW   any             10.0.10.20    22/tcp      SSH de administración al servidor web\n3     ALLOW   10.0.50.0/24    10.0.20.15    1433/tcp    Servidores de apps a la BD SQL\n4     ALLOW   any             10.0.20.15    3389/tcp    Soporte remoto del proveedor a la BD\n5     ALLOW   10.0.30.0/24    any           23/tcp      Administración de switches heredados\n6     ALLOW   10.0.99.5       10.0.20.15    22/tcp      Jump host al servidor de BD\n7     DENY    any             any           any         Denegación implícita",
    options: [
      "Regla 1: any al servidor web en 443/tcp",
      "Regla 2: any al servidor web en 22/tcp",
      "Regla 3: subred de apps a la base de datos en 1433/tcp",
      "Regla 4: any a la base de datos en 3389/tcp",
      "Regla 5: subred de administración a any en 23/tcp",
      "Regla 6: jump host a la base de datos en 22/tcp",
      "Regla 7: denegar todo"
    ],
    answers: [1, 3, 4],
    explain: "La regla 2 expone el SSH del servidor web a todo internet; el acceso de administración solo debería venir del jump host o de una VPN. La regla 4 es peor: expone RDP de un servidor de base de datos interno a cualquiera, y el acceso del proveedor debería pasar por una VPN o un jump host con MFA. La regla 5 permite Telnet, que envía credenciales en texto claro, hacia cualquier destino; reemplázala con SSH hacia las direcciones específicas de los switches. Las reglas 1, 3 y 6 están acotadas al origen, destino y puerto necesarios, y el deny-all final es exactamente lo que debe ser una denegación implícita." },

  { id: "backup-restore-fill", d: 3, type: "fill", title: "Calcula los conjuntos de restauración y la pérdida de datos",
    prompt: "Los respaldos se ejecutan cada noche a las 23:00: un respaldo completo el domingo y respaldos incrementales de lunes a sábado. El servidor de archivos falla el jueves a las 15:00. Completa:",
    fields: [
      { label: "Conjuntos de respaldo necesarios para restaurar (esquema incremental)", answers: ["4", "cuatro"] },
      { label: "Conjuntos de respaldo necesarios si se usaran respaldos diferenciales", answers: ["2", "dos"] },
      { label: "Horas de datos perdidos desde el último respaldo", answers: ["16", "16 horas", "16h"] }
    ],
    explain: "El respaldo del jueves a las 23:00 todavía no se ha ejecutado, así que el último respaldo bueno es el del miércoles en la noche. Con incrementales restauras el completo del domingo más los incrementales del lunes, martes y miércoles (4 conjuntos), porque cada incremental solo contiene los cambios desde el respaldo anterior. Un diferencial contiene todo desde el último completo, así que solo necesitas el completo del domingo más el diferencial del miércoles (2 conjuntos). Del miércoles a las 23:00 al jueves a las 15:00 hay 16 horas de datos perdidos; si el RPO es menor que eso, los respaldos deben ejecutarse con más frecuencia." },

  { id: "ransomware-ir-order", d: 4, type: "order", title: "Ordena la respuesta a un incidente de ransomware",
    prompt: "Pon en el orden correcto estas actividades de respuesta a incidentes para un evento de ransomware.",
    steps: [
      "Mantener el plan de IR, la lista de contactos y un conjunto de respaldos offline probado",
      "El EDR alerta sobre renombrado masivo de archivos con extensión .lock en el servidor de archivos FS01",
      "Revisar los logs para confirmar el ransomware, delimitar los hosts afectados y encontrar la primera máquina infectada",
      "Aislar de la red a FS01 y a la estación de trabajo infectada",
      "Eliminar el malware y deshabilitar la cuenta comprometida que se usó para propagarlo",
      "Restaurar los archivos desde respaldos limpios y monitorear los hosts antes de devolverlos a producción",
      "Hacer una revisión posterior al incidente y actualizar el playbook de ransomware"
    ],
    explain: "El proceso de SY0-701 es preparación, detección, análisis, contención, erradicación, recuperación y lecciones aprendidas. La contención va antes de la erradicación para que el malware no siga propagándose mientras limpias, y la recuperación restaura desde respaldos que verificaste que están limpios. La reunión de lecciones aprendidas retroalimenta mejoras hacia la preparación y cierra el ciclo." },

  { id: "ssh-spray-log", d: 4, type: "select", title: "Encuentra password spraying en un log de autenticación",
    prompt: "Revisa el log de autenticación SSH de un servidor Linux. Selecciona todas las líneas que forman parte de un intento de password spraying.",
    context: "Mar 12 09:14:02 web01 sshd[811]: Failed password for alice from 203.0.113.7 port 50122 ssh2\nMar 12 09:14:05 web01 sshd[812]: Failed password for bob from 203.0.113.7 port 50131 ssh2\nMar 12 09:14:07 web01 sshd[815]: Accepted publickey for deploy from 10.0.5.20 port 40211 ssh2\nMar 12 09:14:09 web01 sshd[816]: Failed password for carol from 203.0.113.7 port 50140 ssh2\nMar 12 09:14:12 web01 sshd[818]: Failed password for dave from 10.0.8.44 port 51002 ssh2\nMar 12 09:14:14 web01 sshd[819]: Failed password for erin from 203.0.113.7 port 50155 ssh2\nMar 12 09:14:20 web01 sshd[821]: Accepted password for dave from 10.0.8.44 port 51010 ssh2",
    options: [
      "Línea 1: Failed password for alice from 203.0.113.7",
      "Línea 2: Failed password for bob from 203.0.113.7",
      "Línea 3: Accepted publickey for deploy from 10.0.5.20",
      "Línea 4: Failed password for carol from 203.0.113.7",
      "Línea 5: Failed password for dave from 10.0.8.44",
      "Línea 6: Failed password for erin from 203.0.113.7",
      "Línea 7: Accepted password for dave from 10.0.8.44"
    ],
    answers: [0, 1, 3, 5],
    explain: "Una sola dirección externa (203.0.113.7) falla una vez contra cada una de varias cuentas distintas en cuestión de segundos, que es la firma del password spraying: muchos usuarios, pocos intentos por cada uno, para evitar el bloqueo. La única falla de dave seguida de un acceso exitoso desde una dirección interna parece un error de tecleo, y el inicio de sesión con la clave de deploy es automatización normal. Las mitigaciones incluyen MFA, bloquear el origen, deshabilitar los inicios de sesión SSH con contraseña a favor de claves y alertar sobre fallas en muchas cuentas desde una misma IP." },

  { id: "secure-protocols-match", d: 4, type: "match", title: "Reemplaza protocolos inseguros",
    prompt: "Una auditoría señaló protocolos inseguros. Relaciona cada protocolo inseguro o necesidad con su reemplazo seguro.",
    pairs: [
      ["Telnet para acceso remoto a la shell", "SSH"],
      ["FTP para transferencias de archivos", "SFTP"],
      ["HTTP para el portal de clientes", "HTTPS"],
      ["LDAP en el puerto 389 para consultas al directorio", "LDAPS"],
      ["SNMPv2c con community strings", "SNMPv3"],
      ["Respuestas DNS que pueden falsificarse o envenenarse", "DNSSEC"]
    ],
    extra: ["TFTP", "SSL 3.0"],
    explain: "SSH (22) cifra las sesiones remotas de shell que Telnet envía en texto claro, y SFTP hace la transferencia de archivos sobre SSH. HTTPS envuelve HTTP en TLS, LDAPS envuelve LDAP en TLS en el puerto 636, y SNMPv3 agrega autenticación y cifrado en lugar de community strings en texto plano. DNSSEC firma los registros DNS para que los resolvers puedan verificar su integridad y origen, aunque no cifra las consultas. TFTP no tiene ninguna autenticación y SSL 3.0 está obsoleto, así que ninguno es una opción segura." },

  { id: "ale-calc-fill", d: 5, type: "fill", title: "Calcula la expectativa de pérdida anualizada",
    prompt: "Una base de datos de clientes está valuada en $120,000. Una filtración expondría el 25% de su valor, y se espera una cada dos años. Un control DLP propuesto cuesta $20,000 por año y reduciría la tasa esperada a una vez cada diez años. Completa:",
    fields: [
      { label: "Expectativa de pérdida única (SLE) en dólares", answers: ["30000", "30,000", "$30000", "$30,000"] },
      { label: "Tasa anualizada de ocurrencia (ARO)", answers: ["0.5", ".5", "1/2"] },
      { label: "Expectativa de pérdida anualizada (ALE) en dólares", answers: ["15000", "15,000", "$15000", "$15,000"] },
      { label: "¿El control DLP se justifica por su costo? (sí o no)", answers: ["no"] }
    ],
    explain: "SLE = valor del activo x factor de exposición = $120,000 x 0.25 = $30,000. Una vez cada dos años es un ARO de 0.5, así que ALE = $30,000 x 0.5 = $15,000. Con el control, el ARO baja a 0.1 y el ALE a $3,000, un ahorro de $12,000 al año, que es menos que el costo anual de $20,000, así que con estas cifras el control no se justifica por su costo. La organización podría aceptar el riesgo, transferirlo con un seguro o buscar una mitigación más barata." },

  { id: "agreements-match", d: 5, type: "match", title: "Relaciona acuerdos con terceros",
    prompt: "Una empresa está incorporando a un proveedor de servicios administrados. Relaciona cada necesidad con el tipo de acuerdo que la cubre.",
    pairs: [
      ["Garantizar 99.9% de disponibilidad mensual, con créditos de servicio si no se cumple", "SLA"],
      ["Enumerar los entregables, el cronograma y el costo de un proyecto de migración", "SOW"],
      ["Establecer los términos legales generales que regirán todas las órdenes de trabajo futuras", "MSA"],
      ["Registrar una intención mutua de cooperar que en general no es legalmente vinculante", "MOU"],
      ["Prohibir que el proveedor divulgue la información confidencial de la empresa", "NDA"]
    ],
    extra: ["BPA", "MOA"],
    explain: "Un acuerdo de nivel de servicio (SLA) define metas de desempeño medibles y penalizaciones. Un acuerdo marco de servicios (MSA) establece una sola vez los términos generales, y cada declaración de trabajo (SOW) bajo él describe el alcance, los entregables y el costo de un proyecto específico. Un memorando de entendimiento (MOU) expresa una intención sin obligación legal fuerte (un memorando de acuerdo, MOA, es más formal y vinculante), y un acuerdo de confidencialidad (NDA) protege los datos confidenciales. Un acuerdo de socios de negocio (BPA) cubre términos de la asociación como el reparto de utilidades, no estas necesidades." }
]);
