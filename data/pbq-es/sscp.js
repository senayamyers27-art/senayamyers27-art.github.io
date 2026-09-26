/* Spanish translation of the SSCP exam simulations. Same ids and structure as data/pbq/sscp.js. */
CertHub.addPbqs("sscp", [
  { id: "control-types-match", d: 1, type: "match", title: "Clasifica los controles de seguridad por tipo",
    prompt: "Un profesional de seguridad está documentando controles para una auditoría. Relaciona cada control con su tipo de control PRINCIPAL.",
    pairs: [
      ["Torniquete controlado por credencial en la entrada del centro de datos", "Preventivo"],
      ["Alerta del SIEM por inicios de sesión fallidos repetidos en el servidor de nómina", "Detectivo"],
      ["Restaurar una página web alterada desde un respaldo en buen estado conocido", "Correctivo"],
      ["Letreros de \"Instalaciones vigiladas por CCTV\" en la cerca", "Disuasivo"],
      ["VLAN aislada y jump host para un controlador que no admite MFA", "Compensatorio"],
      ["Política de uso aceptable que establece cómo debe manejar el personal los datos de clientes", "Directivo"]
    ],
    extra: ["De recuperación"],
    explain: "Los controles preventivos detienen un evento antes de que ocurra (el torniquete), los detectivos lo descubren mientras ocurre o después (la alerta del SIEM), y los correctivos reparan el daño (restaurar la página). Los letreros son disuasivos porque desalientan al atacante sin detener físicamente a nadie. La VLAN aislada es compensatoria porque sustituye a un control principal (MFA) que no se puede implementar, y una política que le dice a las personas qué hacer es directiva. Los controles de recuperación restablecen las operaciones completas después de una interrupción grave, y ninguno de estos lo hace específicamente." },

  { id: "change-mgmt-order", d: 1, type: "order", title: "Procesa una solicitud de cambio estándar",
    prompt: "Un administrador quiere habilitar TLS 1.3 y deshabilitar TLS 1.0 en un servidor web de producción. Pon los pasos de gestión de cambios en el orden correcto.",
    steps: [
      "Enviar una solicitud de cambio que describa el cambio, su motivo y los sistemas afectados",
      "Analizar el impacto y el riesgo, y documentar un plan de reversión (backout) probado",
      "Obtener la aprobación del comité asesor de cambios (CAB)",
      "Implementar el cambio durante la ventana de mantenimiento aprobada",
      "Verificar el cambio, actualizar la línea base de configuración y cerrar la solicitud"
    ],
    explain: "La gestión de cambios empieza con una solicitud documentada para que quede registro de qué se cambia y por qué. El análisis de impacto y el plan de reversión van antes de la aprobación, porque quienes aprueban necesitan esa información para decidir. Solo se implementa un cambio aprobado, en la ventana acordada, y el proceso termina verificando el resultado y actualizando la línea base y la documentación para que los registros de configuración coincidan con la realidad." },

  { id: "access-review-select", d: 2, type: "select", title: "Recertificación trimestral de accesos",
    prompt: "Estás haciendo la revisión trimestral de accesos contra la política que se muestra. Selecciona todas las cuentas que deben marcarse para corrección.",
    context: "Política:\n - Deshabilitar las cuentas sin inicio de sesión por más de 90 días\n - Deshabilitar las cuentas el mismo día en que RR. HH. registra una baja\n - Ninguna cuenta puede tener a la vez AP-Create-Vendor y AP-Approve-Payment\n - Cada cuenta debe tener un dueño individual con nombre\n\nFecha de revisión: 2026-06-30\n\nCuenta    Dueño       Estado en RR. HH.      Habilitada Último inicio Grupos\njlee      J. Lee      Activo                 Sí         2026-06-29    AP-Create-Vendor\nmortiz    M. Ortiz    Baja 2026-05-12        Sí         2026-05-11    Sales-RO\nkpatel    K. Patel    Activo                 Sí         2026-06-28    AP-Create-Vendor, AP-Approve-Payment\ntemp01    (ninguno)   n/a                    Sí         2026-06-15    Warehouse-RW\nswong     S. Wong     Activo                 Sí         2026-06-30    AP-Approve-Payment\nrdiaz     R. Diaz     Activo                 Sí         2026-02-10    Engineering-RW",
    options: ["jlee", "mortiz", "kpatel", "temp01", "swong", "rdiaz"],
    answers: [1, 2, 3, 5],
    explain: "mortiz fue dado de baja en mayo pero sigue habilitado, así que el desaprovisionamiento falló. kpatel tiene los dos grupos de cuentas por pagar, lo que rompe la separación de funciones. temp01 no tiene un dueño con nombre, así que nadie rinde cuentas por su uso. rdiaz inició sesión por última vez en febrero, más de 90 días antes de la revisión, así que la cuenta debe deshabilitarse. jlee y swong tienen cada uno solo uno de los dos roles de AP y están activos, así que cumplen." },

  { id: "access-models-match", d: 2, type: "match", title: "Identifica el modelo de control de acceso",
    prompt: "Relaciona cada decisión de acceso descrita con el modelo de control de acceso que utiliza.",
    pairs: [
      ["El creador del archivo le da a un compañero acceso de lectura", "Discrecional (DAC)"],
      ["A un usuario con autorización Secret se le niega un documento Top Secret con base en etiquetas", "Obligatorio (MAC)"],
      ["Todos los que tienen el rol de Enfermera pueden ver los expedientes de pacientes de su piso", "Basado en roles (RBAC)"],
      ["El acceso se permite solo si department=Finance, el dispositivo está administrado y la hora está entre 08:00 y 18:00", "Basado en atributos (ABAC)"],
      ["Una ACL del router permite que cualquier host llegue al TCP 443 del servidor web", "Basado en reglas"]
    ],
    explain: "En DAC el dueño decide quién obtiene acceso. MAC compara etiquetas impuestas por el sistema (autorización vs. clasificación) y los usuarios no pueden anularlas. RBAC asigna permisos a roles de trabajo y no a individuos. ABAC evalúa en conjunto varios atributos del sujeto, del objeto y del entorno. El acceso basado en reglas aplica las mismas reglas globales a todos, como las ACL de firewalls o routers, sin importar quién sea el usuario." },

  { id: "ale-fill", d: 3, type: "fill", title: "Riesgo cuantitativo: ¿vale la pena la salvaguarda?",
    prompt: "Una base de datos de clientes está valuada en $200,000. Una filtración destruiría el 25% de su valor y se espera una vez cada 5 años. Un control propuesto cuesta $15,000 por año y reduciría la frecuencia esperada a una vez cada 20 años. Completa los valores (en dólares enteros).",
    fields: [
      { label: "Expectativa de pérdida única (SLE)", answers: ["50000", "50,000", "$50,000", "$50000"] },
      { label: "Expectativa de pérdida anualizada (ALE) antes del control", answers: ["10000", "10,000", "$10,000", "$10000"] },
      { label: "ALE después del control", answers: ["2500", "2,500", "$2,500", "$2500"] },
      { label: "Valor neto anual del control (negativo si cuesta más de lo que ahorra)", answers: ["-7500", "-7,500", "-$7,500", "-$7500", "$-7,500", "$-7500"] }
    ],
    explain: "SLE = valor del activo x factor de exposición = $200,000 x 0.25 = $50,000. El ARO de una vez cada 5 años es 0.2, así que ALE = $50,000 x 0.2 = $10,000. Con el control, el ARO pasa a 0.05, así que ALE = $2,500. El valor del control es ALE antes - ALE después - costo anual = $10,000 - $2,500 - $15,000 = -$7,500, así que solo por costo no se justifica y conviene considerar un control más barato, transferir o aceptar el riesgo." },

  { id: "spray-log-select", d: 3, type: "select", title: "Detecta password spraying en un log de autenticación",
    prompt: "Revisa el log de autenticación SSH de un servidor Linux. Selecciona todas las líneas que forman parte de un intento de password spraying.",
    context: "Jun 10 09:14:02 srv01 sshd[811]: Failed password for alice from 203.0.113.7 port 51022\nJun 10 09:14:05 srv01 sshd[812]: Failed password for bob from 203.0.113.7 port 51030\nJun 10 09:14:09 srv01 sshd[813]: Failed password for carol from 203.0.113.7 port 51041\nJun 10 09:15:30 srv01 sshd[820]: Accepted publickey for deploy from 10.0.2.15 port 40112\nJun 10 09:16:01 srv01 sshd[824]: Failed password for dave from 203.0.113.7 port 51077\nJun 10 09:20:11 srv01 sshd[830]: Failed password for erin from 192.168.1.40 port 60210\nJun 10 09:20:40 srv01 sshd[831]: Accepted password for erin from 192.168.1.40 port 60215",
    options: [
      "Línea 1: contraseña fallida para alice desde 203.0.113.7",
      "Línea 2: contraseña fallida para bob desde 203.0.113.7",
      "Línea 3: contraseña fallida para carol desde 203.0.113.7",
      "Línea 4: publickey aceptada para deploy desde 10.0.2.15",
      "Línea 5: contraseña fallida para dave desde 203.0.113.7",
      "Línea 6: contraseña fallida para erin desde 192.168.1.40",
      "Línea 7: contraseña aceptada para erin desde 192.168.1.40"
    ],
    answers: [0, 1, 2, 4],
    explain: "El password spraying prueba una o pocas contraseñas comunes contra muchas cuentas distintas desde el mismo origen, manteniéndose por debajo de los umbrales de bloqueo por cuenta. Las cuatro fallas desde la dirección externa 203.0.113.7 contra alice, bob, carol y dave encajan con ese patrón. El inicio de sesión con la clave de deploy es automatización normal desde un host interno, y la única falla de erin seguida de un acceso exitoso desde una dirección interna parece un error de tecleo común, no un ataque." },

  { id: "ir-ransomware-order", d: 4, type: "order", title: "Responde a un ransomware en un servidor de archivos",
    prompt: "El EDR genera una alerta de que los archivos de un servidor de archivos departamental se están renombrando con una extensión nueva. Pon las actividades de respuesta a incidentes en el orden correcto.",
    steps: [
      "Mantener el plan de IR, la lista de contactos y respaldos offline antes de que ocurra cualquier incidente",
      "Validar la alerta y determinar el alcance de los sistemas afectados",
      "Aislar de la red el servidor de archivos y los endpoints afectados",
      "Eliminar el malware y cerrar el vector de acceso inicial",
      "Restaurar los datos desde respaldos limpios y monitorear para detectar una reinfección",
      "Hacer una revisión de lecciones aprendidas y actualizar el plan"
    ],
    explain: "Esto sigue el ciclo de vida del incidente: preparación, detección y análisis, contención, erradicación, recuperación y actividad posterior al incidente. Debes confirmar y delimitar el incidente antes de contenerlo, y contenerlo antes de erradicarlo para que no se siga propagando. Restaurar antes de erradicar implica riesgo de reinfección, y el paso de lecciones aprendidas retroalimenta mejoras hacia la preparación." },

  { id: "backup-restore-fill", d: 4, type: "fill", title: "Conjuntos de restauración de respaldos y pérdida de datos",
    prompt: "Los respaldos se ejecutan cada noche a las 23:00. Cada domingo se hace un respaldo completo. El servidor de archivos falla el jueves a las 15:00. Completa los valores.",
    fields: [
      { label: "Conjuntos de respaldo necesarios para restaurar si las noches de lunes a sábado usan respaldos DIFERENCIALES", answers: ["2", "dos"] },
      { label: "Conjuntos de respaldo necesarios para restaurar si las noches de lunes a sábado usan respaldos INCREMENTALES", answers: ["4", "cuatro"] },
      { label: "Máximo de horas de datos perdidos (desde el último respaldo)", answers: ["16", "16 horas", "dieciséis"] }
    ],
    explain: "Un diferencial contiene todo lo que cambió desde el último respaldo completo, así que necesitas el completo del domingo más solo el diferencial del miércoles en la noche: 2 conjuntos. Un incremental contiene solo los cambios desde el respaldo anterior de cualquier tipo, así que necesitas el completo del domingo más los incrementales del lunes, martes y miércoles: 4 conjuntos. El último respaldo se ejecutó el miércoles a las 23:00, así que se pierden hasta 16 horas de cambios; si eso excede el RPO, los respaldos deben ejecutarse con más frecuencia." },

  { id: "crypto-purpose-match", d: 5, type: "match", title: "Elige la herramienta criptográfica correcta",
    prompt: "Relaciona cada algoritmo o construcción criptográfica con la tarea para la que es más adecuado.",
    pairs: [
      ["AES-256-GCM", "Cifrar grandes volúmenes de datos en reposo o en tránsito"],
      ["SHA-256", "Producir un digest de longitud fija para verificar la integridad de un archivo"],
      ["HMAC-SHA256", "Verificar integridad y autenticidad con una clave secreta compartida"],
      ["ECDHE", "Acordar una clave de sesión con forward secrecy"],
      ["Firma RSA con la clave privada del remitente", "Brindar no repudio para un documento firmado"]
    ],
    extra: ["Almacenar contraseñas de usuarios con un hash lento y con sal"],
    explain: "AES es un cifrado simétrico rápido, adecuado para cifrado masivo, y el modo GCM además autentica los datos. SHA-256 por sí solo da integridad, pero cualquiera puede recalcularlo, así que no demuestra quién creó los datos; HMAC agrega una clave secreta compartida para dar autenticidad. El Diffie-Hellman efímero (ECDHE) crea claves por sesión que se descartan, lo que brinda forward secrecy. Solo una firma digital con clave privada brinda no repudio, porque una clave HMAC compartida pudo haberla usado cualquiera de las dos partes. Para almacenar contraseñas se usan bcrypt, scrypt, Argon2 o PBKDF2, y ninguno aparece en la lista." },

  { id: "fw-rule-review", d: 6, type: "select", title: "Revisa un conjunto de reglas del firewall perimetral",
    prompt: "Revisa las reglas del firewall contra la política indicada. Selecciona todas las reglas que violan la política.",
    context: "Política:\n - Desde internet, el servidor web de la DMZ 198.51.100.10 acepta solo HTTPS\n - La administración remota solo se permite desde la subred de administración 10.0.99.0/24 usando SSH\n - La base de datos 10.0.10.15 solo es accesible desde la subred de apps 10.0.5.0/24 en TCP 1433\n - Los hosts internos solo pueden usar DNS a través del resolver interno 10.0.1.53\n - Todo lo demás se deniega\n\nRegla Origen          Destino          Servicio   Acción\n1     any             198.51.100.10    tcp/443    allow\n2     any             198.51.100.10    tcp/80     allow\n3     any             198.51.100.20    tcp/3389   allow\n4     10.0.5.0/24     10.0.10.15       tcp/1433   allow\n5     any             any              tcp/23     allow\n6     10.0.0.0/8      any              udp/53     allow\n7     10.0.99.0/24    10.0.0.0/8       tcp/22     allow\n8     any             any              any        deny",
    options: ["Regla 1", "Regla 2", "Regla 3", "Regla 4", "Regla 5", "Regla 6", "Regla 7", "Regla 8"],
    answers: [1, 2, 4, 5],
    explain: "La regla 2 permite HTTP sin cifrar hacia el servidor web cuando la política solo permite HTTPS. La regla 3 expone RDP a todo internet en lugar de restringir la administración a SSH desde la subred de administración. La regla 5 permite Telnet en texto claro entre cualquier par de hosts. La regla 6 deja que todos los hosts internos consulten cualquier servidor DNS, lo que evade el resolver interno y habilita el DNS tunneling; el origen debería ser solo 10.0.1.53. Las reglas 1, 4 y 7 coinciden con la política, y la regla 8 es el deny-all explícito que implementa la denegación implícita." },

  { id: "subnet-fill", d: 6, type: "fill", title: "Calcula los límites de la subred",
    prompt: "A una nueva VLAN para lectores de credenciales se le asigna 10.20.30.140/27. Un técnico debe configurar el ámbito de DHCP y un objeto en el firewall. Completa los valores.",
    fields: [
      { label: "Máscara de subred (decimal con puntos)", answers: ["255.255.255.224"] },
      { label: "Dirección de red", answers: ["10.20.30.128"] },
      { label: "Dirección de broadcast", answers: ["10.20.30.159"] },
      { label: "Número de direcciones de host utilizables", answers: ["30"] }
    ],
    explain: "Un /27 deja 5 bits de host, así que el tamaño del bloque es 32 y la máscara es 255.255.255.224. Las subredes en el último octeto empiezan en 0, 32, 64, 96, 128 y 160, así que .140 cae en el bloque que empieza en 10.20.30.128. El broadcast es la última dirección de ese bloque, 128 + 31 = .159, y los hosts utilizables son 2^5 - 2 = 30 (.129 a .158)." },

  { id: "sshd-hardening-select", d: 7, type: "select", title: "Endurece la configuración de un servidor SSH",
    prompt: "El estándar de hardening exige solo autenticación basada en claves, ningún inicio de sesión directo como root y un número limitado de intentos de autenticación. Selecciona todas las líneas de este sshd_config que violan el estándar.",
    context: "# /etc/ssh/sshd_config (extracto) en app01.example.com\nPort 22\nPermitRootLogin yes\nPubkeyAuthentication yes\nPasswordAuthentication yes\nPermitEmptyPasswords no\nMaxAuthTries 3\nX11Forwarding no\nLoginGraceTime 30",
    options: [
      "PermitRootLogin yes",
      "PubkeyAuthentication yes",
      "PasswordAuthentication yes",
      "PermitEmptyPasswords no",
      "MaxAuthTries 3",
      "X11Forwarding no"
    ],
    answers: [0, 2],
    explain: "PermitRootLogin yes permite inicios de sesión directos como root, lo que elimina la rendición de cuentas individual y les da a los atacantes una cuenta conocida como objetivo; debería ser no (o prohibit-password donde la política lo permita). PasswordAuthentication yes permite iniciar sesión con contraseña, así que no se cumple el estándar de acceso solo con claves; debería ser no. Las demás líneas ya endurecen el servidor: las claves están habilitadas, las contraseñas vacías se rechazan, los intentos están limitados y el reenvío de X11 está desactivado." }
]);
