/* Spanish translation of the SC-500 exam simulations. Same ids and structure as data/pbq/sc-500.js. */
CertHub.addPbqs("sc-500", [
  {
    id: "policy-effects-match", d: 1, type: "match",
    title: "Relaciona los efectos de Azure Policy con su comportamiento",
    prompt: "Relaciona cada efecto de Azure Policy con lo que hace cuando se evalúa un recurso.",
    pairs: [
      ["Deny", "Bloquea una solicitud de creación o actualización que infringe la regla"],
      ["Audit", "Marca un recurso no conforme, pero aun así permite el cambio"],
      ["DeployIfNotExists", "Despliega un recurso relacionado cuando falta, usando una managed identity de corrección"],
      ["Modify", "Agrega, actualiza o quita propiedades, como etiquetas, en el propio recurso"]
    ],
    extra: ["Cifra los datos del recurso con una clave administrada por el cliente", "Otorga a un usuario una asignación de rol en el ámbito del recurso"],
    explain: "Deny detiene las escrituras no conformes, mientras que los recursos existentes solo se marcan; Audit permite el cambio y registra el incumplimiento. DeployIfNotExists y Modify necesitan una managed identity en la asignación: DeployIfNotExists aprovisiona un recurso aparte (por ejemplo, un diagnostic setting), mientras que Modify cambia propiedades del recurso evaluado. Ninguna política cifra datos ni otorga roles de RBAC."
  },
  {
    id: "pim-eligible-select", d: 1, type: "select",
    title: "Identifica las afirmaciones verdaderas sobre asignaciones elegibles de PIM",
    prompt: "Selecciona todas las afirmaciones verdaderas sobre una asignación de rol elegible (eligible) de Privileged Identity Management.",
    options: [
      "El usuario debe activar el rol antes de poder usar sus permisos",
      "La activación puede condicionarse con MFA, una justificación escrita y una aprobación",
      "La activación otorga el rol solo durante una ventana de tiempo limitada",
      "Una asignación elegible da acceso permanente y fijo sin necesidad de activación",
      "Ser elegible elimina por completo la necesidad de que el usuario se autentique"
    ],
    answers: [0, 1, 2],
    explain: "Las asignaciones elegibles no conceden privilegios permanentes: el usuario activa el rol cuando lo necesita, y la activación puede exigir MFA, justificación y aprobación por una duración limitada. Es lo contrario de una asignación activa, que otorga el rol de forma permanente o durante una ventana definida sin ninguna acción. Ser elegible nunca elimina la autenticación; al contrario, agrega MFA al momento de activar."
  },
  {
    id: "net-services-match", d: 2, type: "match",
    title: "Relaciona las funciones de seguridad de red de Azure con su papel",
    prompt: "Relaciona cada función de red de Azure con lo que hace.",
    pairs: [
      ["Application security group", "Agrupa las NIC de las VM por rol para que las reglas del NSG las referencien en lugar de usar direcciones IP"],
      ["Private endpoint", "Le da a un recurso PaaS una IP privada dentro de tu red virtual"],
      ["Service tag", "Representa los rangos de direcciones de un servicio de Microsoft y se actualiza automáticamente"],
      ["User-defined route", "Anula las rutas del sistema para enviar el tráfico a un siguiente salto, como un firewall"],
      ["Network security group", "Filtra el tráfico con reglas de permitir y denegar procesadas en orden de prioridad"]
    ],
    extra: ["Descifra el TLS saliente y aplica firmas de IDPS"],
    explain: "Los application security groups etiquetan las NIC según el rol de la carga de trabajo para que las reglas no dependan de IP, mientras que los service tags representan rangos administrados por Microsoft. Un private endpoint proyecta un servicio PaaS dentro de la VNet con una IP privada, una UDR fuerza el tráfico (por ejemplo, 0.0.0.0/0) hacia un firewall como siguiente salto, y el NSG evalúa reglas de 5-tuple por prioridad. La inspección de TLS y el IDPS son funciones de Azure Firewall Premium, no de ninguno de estos."
  },
  {
    id: "sql-private-order", d: 2, type: "order",
    title: "Restringe Azure SQL a un private endpoint",
    prompt: "Pon estos pasos en el orden correcto para que una Azure SQL Database solo sea accesible a través de un private endpoint.",
    steps: [
      "Crear un private endpoint para el servidor lógico de SQL en la subred de la aplicación",
      "Crear una zona DNS privada privatelink.database.windows.net",
      "Vincular la zona DNS privada a la red virtual",
      "Deshabilitar el acceso de red público en el servidor lógico de SQL",
      "Verificar con nslookup que el nombre del servidor ahora resuelve a la IP privada"
    ],
    explain: "Crea primero el private endpoint para que el servidor tenga una IP privada; luego crea y vincula la zona privatelink.database.windows.net para que el nombre se resuelva de forma privada en la VNet y en las redes emparejadas o locales. Solo después de que la ruta privada funcione debes deshabilitar el acceso de red público; de lo contrario, puedes dejarte a ti mismo sin acceso. Un nslookup final confirma que el FQDN devuelve la IP privada y no la pública."
  },
  {
    id: "nsg-eval-select", d: 2, type: "select",
    title: "Lee las reglas del NSG y elige los flujos permitidos",
    prompt: "Con las reglas de entrada del NSG que se muestran abajo, selecciona todos los flujos que están PERMITIDOS.",
    context: "Priority 100  Allow  TCP 443   Source: Internet          Dest: web ASG\nPriority 200  Allow  TCP 1433  Source: web ASG           Dest: db ASG\nPriority 300  Deny   TCP 3389  Source: Internet          Dest: web ASG\nPriority 4096 Deny   *         Source: any (DenyAllInBound default)",
    options: [
      "HTTPS (TCP 443) desde Internet hacia un servidor web",
      "SQL (TCP 1433) desde un servidor web hacia un servidor de base de datos",
      "RDP (TCP 3389) desde Internet hacia un servidor web",
      "SSH (TCP 22) desde Internet hacia un servidor de base de datos",
      "SQL (TCP 1433) desde Internet hacia un servidor de base de datos"
    ],
    answers: [0, 1],
    explain: "Las reglas del NSG se evalúan por prioridad ascendente y gana la primera coincidencia. La regla 100 permite la entrada por 443 hacia el nivel web y la regla 200 permite el tráfico de web a base de datos por 1433, así que esos dos flujos están permitidos. RDP está denegado explícitamente por la regla 300, y los flujos de SSH y de Internet hacia la base de datos no coinciden con nada hasta que la regla predeterminada DenyAllInBound en 4096 los descarta."
  },
  {
    id: "subnet-fill", d: 2, type: "fill",
    title: "Calcula la subred /26 de un nivel de base de datos",
    prompt: "A una VM de base de datos se le asigna 198.51.100.130/26. Completa los detalles de direccionamiento.",
    fields: [
      { label: "Dirección de red", answers: ["198.51.100.128"] },
      { label: "Dirección de broadcast", answers: ["198.51.100.191"] },
      { label: "Primera dirección de host utilizable", answers: ["198.51.100.129"] },
      { label: "Número de direcciones de host utilizables", answers: ["62"] }
    ],
    explain: "Un /26 tiene 6 bits de host, así que los bloques son de 64 direcciones: .0, .64, .128, .192. La dirección .130 cae en el bloque .128, por lo que 198.51.100.128 es la red y 198.51.100.191 el broadcast. Los hosts utilizables son los 62 intermedios (64 menos la red y el broadcast), y el primero es 198.51.100.129."
  },
  {
    id: "vm-protection-match", d: 3, type: "match",
    title: "Relaciona las protecciones de cómputo con lo que hacen",
    prompt: "Relaciona cada función de seguridad de VM o de cómputo con la protección que ofrece.",
    pairs: [
      ["Trusted launch", "Proporciona secure boot, un vTPM y monitoreo de la integridad del arranque"],
      ["Encryption at host", "Cifra los discos temporales y las cachés en el host sin agente dentro del invitado"],
      ["Azure Bastion", "Intermedia RDP y SSH sobre TLS sin una IP pública en la VM"],
      ["Just-in-time VM access", "Mantiene cerrados los puertos de administración y los abre temporalmente ante una solicitud aprobada"],
      ["Azure Disk Encryption", "Usa BitLocker o DM-Crypt dentro del sistema operativo invitado"]
    ],
    extra: ["Escanea las imágenes de contenedor en busca de vulnerabilidades antes de ejecutarlas"],
    explain: "Trusted launch refuerza la cadena de arranque contra rootkits, mientras que las dos opciones de cifrado se diferencian por la capa: encryption at host no usa agente y cubre discos temporales y cachés, mientras que Azure Disk Encryption ejecuta BitLocker o DM-Crypt dentro del invitado. Bastion elimina la necesidad de IP públicas de administración, y JIT mantiene los puertos cerrados hasta que una solicitud aprobada y limitada en el tiempo los abre. El escaneo de imágenes corresponde a Defender for Containers."
  },
  {
    id: "secure-ai-select", d: 3, type: "select",
    title: "Protege un chatbot de Foundry expuesto a Internet",
    prompt: "Un chatbot de IA generativa construido en Microsoft Foundry está expuesto a Internet. Selecciona todos los controles apropiados para protegerlo.",
    options: [
      "Habilitar la protección contra amenazas de Defender for AI services para alertar sobre intentos de jailbreak y prompt injection",
      "Aplicar los filtros de contenido de Azure AI Content Safety y Prompt Shields en el despliegue",
      "Poner delante del modelo un AI gateway de API Management con autenticación por managed identity y límites de tokens",
      "Deshabilitar todo el logging para que los prompts y las respuestas nunca se registren",
      "Incrustar la API key del modelo en el JavaScript del lado del cliente para que el navegador lo llame directamente"
    ],
    answers: [0, 1, 2],
    explain: "Defender for AI services genera alertas de jailbreak y prompt injection, los filtros de contenido y Prompt Shields revisan los prompts y las salidas, y un AI gateway de APIM centraliza la autenticación y aplica límites de tokens por consumidor. Deshabilitar el logging destruye el rastro de auditoría que necesitas para detectar e investigar ataques. Exponer una API key en el código del lado del cliente le entrega la credencial a cada usuario y nunca debe hacerse."
  },
  {
    id: "spray-vs-brute-select", d: 4, type: "select",
    title: "Distingue el password spraying en los logs de inicio de sesión",
    prompt: "Selecciona todas las características del log que indican PASSWORD SPRAYING y no un ataque de fuerza bruta contra una sola cuenta.",
    context: "09:01:02 UPN=alice@example.com IP=203.0.113.50 Result=50126 (invalid username or password)\n09:01:05 UPN=bob@example.com   IP=203.0.113.50 Result=50126\n09:01:09 UPN=carol@example.com IP=203.0.113.50 Result=50126\n09:01:14 UPN=dave@example.com  IP=203.0.113.50 Result=50126\n(50+ cuentas distintas, 1-2 fallos cada una, todas desde 203.0.113.50)",
    options: [
      "Se atacan muchos nombres de usuario distintos desde una sola dirección de origen",
      "Cada cuenta recibe solo uno o dos intentos, por debajo de los umbrales de bloqueo",
      "Cientos de intentos llegan contra un solo nombre de usuario en cuestión de segundos",
      "Parece que se prueba una única contraseña débil común una vez en todas las cuentas",
      "Los eventos de inicio de sesión exitosos (Result 0) predominan en el log"
    ],
    answers: [0, 1, 3],
    explain: "El password spraying cambia profundidad por amplitud: prueba unas pocas contraseñas comunes en muchas cuentas, así que el log muestra un solo origen atacando decenas de usuarios distintos con solo uno o dos fallos cada uno para evitar el bloqueo. Un gran volumen de intentos contra un solo nombre de usuario es, en cambio, el patrón de fuerza bruta, y un log dominado por éxitos señalaría otro problema, no spraying."
  },
  {
    id: "ir-order", d: 4, type: "order",
    title: "Atiende un incidente de cuenta comprometida en Sentinel",
    prompt: "Un incidente de Sentinel señala una cuenta de usuario comprometida. Pon estos pasos de respuesta en el orden correcto.",
    steps: [
      "Hacer el triage del incidente y confirmar que es un verdadero positivo",
      "Contener la amenaza deshabilitando la cuenta comprometida y revocando sus sesiones",
      "Erradicar la persistencia y restablecer las credenciales de la cuenta",
      "Recuperar los recursos afectados y restablecer la operación normal",
      "Documentar las lecciones aprendidas y ajustar la regla de analytics para reducir el ruido futuro"
    ],
    explain: "La respuesta a incidentes empieza con el triage para confirmar una detección real, luego la contención para frenar la propagación deshabilitando la cuenta y revocando los tokens antes de que el atacante siga actuando. La erradicación elimina la persistencia y restablece las credenciales, la recuperación devuelve los servicios a la normalidad, y la revisión posterior al incidente registra las lecciones aprendidas y ajusta la regla. Saltar directo a la recuperación sin contención deja que el atacante siga trabajando."
  }
]);
