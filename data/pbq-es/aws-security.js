/* Spanish translation of the AWS Certified Security – Specialty exam simulations. Same ids and structure as data/pbq/aws-security.js. */
CertHub.addPbqs("aws-security", [
  { id: "detection-sources-match", d: 1, type: "match", title: "Relaciona preguntas de detección con fuentes de logs de AWS",
    prompt: "Un investigador tiene seis preguntas. Relaciona cada pregunta con la fuente de logs o el servicio de AWS que la responde de forma más directa.",
    pairs: [
      ["¿Qué principal leyó objetos del bucket de nómina ayer?", "CloudTrail S3 data events"],
      ["¿Qué nombres de dominio consultó una instancia EC2 antes de ser comprometida?", "Route 53 Resolver query logs"],
      ["¿Qué IPs de origen fueron rechazadas al intentar llegar al puerto 22 en una subred?", "VPC Flow Logs"],
      ["¿Una instancia se está comunicando ahora mismo con un servidor de comando y control conocido?", "Amazon GuardDuty"],
      ["¿Dónde se pueden guardar logs de AWS y de herramientas de terceros en un data lake OCSF propio?", "Amazon Security Lake"],
      ["¿Quién cambió una regla de security group la semana pasada?", "CloudTrail management events"]
    ],
    extra: ["AWS Artifact", "Amazon Macie"],
    explain: "Las lecturas de objetos de S3 son data events, que los trails registran solo si los activas. Los query logs del Resolver registran las consultas DNS de una VPC. Los flow logs registran conexiones aceptadas y rechazadas por IP y puerto. GuardDuty analiza los logs en busca de actividad maliciosa conocida. Security Lake normaliza datos de AWS y de terceros a OCSF en S3 dentro de tu cuenta. Los cambios de security groups son llamadas a la API del plano de control, registradas como management events. Artifact entrega informes de cumplimiento de AWS y Macie encuentra datos sensibles, así que ninguno responde estas preguntas." },

  { id: "cloudtrail-bucket-policy-fill", d: 1, type: "fill", title: "Completa una bucket policy para la entrega de CloudTrail",
    prompt: "El bucket central de logs debe aceptar archivos de log de CloudTrail solo del organization trail. Completa los tres espacios de la sentencia de la bucket policy.",
    context: "{\n  \"Sid\": \"AWSCloudTrailWrite\",\n  \"Effect\": \"Allow\",\n  \"Principal\": { \"Service\": \"[1]\" },\n  \"Action\": \"[2]\",\n  \"Resource\": \"arn:aws:s3:::central-logs/AWSLogs/o-exampleorg/*\",\n  \"Condition\": {\n    \"StringEquals\": {\n      \"s3:x-amz-acl\": \"bucket-owner-full-control\",\n      \"[3]\": \"arn:aws:cloudtrail:us-east-1:111122223333:trail/org-trail\"\n    }\n  }\n}",
    fields: [
      { label: "[1] Service principal", answers: ["cloudtrail.amazonaws.com"] },
      { label: "[2] Acción", answers: ["s3:PutObject"] },
      { label: "[3] Condition key que vincula el permiso a un solo trail", answers: ["aws:SourceArn"] }
    ],
    explain: "CloudTrail escribe como el service principal cloudtrail.amazonaws.com y necesita s3:PutObject sobre el prefijo de logs (además de s3:GetBucketAcl en otra sentencia). La condición aws:SourceArn limita el permiso al trail indicado, lo que impide que el trail de otra cuenta escriba en el bucket mediante el mismo service principal, un riesgo de confused deputy." },

  { id: "access-key-response-select", d: 2, type: "select", title: "Elige las primeras acciones correctas ante una access key expuesta",
    prompt: "GuardDuty informa que la access key del usuario IAM build-bot se está usando desde una dirección IP desconocida para listar y copiar objetos de S3. Selecciona cada acción que pertenece a la primera fase de la respuesta.",
    options: [
      "Desactivar la access key de build-bot",
      "Eliminar de inmediato el usuario build-bot y todo su historial",
      "Buscar en CloudTrail cada llamada a la API hecha con ese ID de access key",
      "Buscar usuarios, roles, access keys o políticas IAM que el atacante pudo haber creado",
      "Suspender GuardDuty para que deje de generar hallazgos duplicados durante la respuesta",
      "Reconstruir cada instancia EC2 de cada cuenta antes de dimensionar el incidente"
    ],
    answers: [0, 2, 3],
    explain: "Desactivar la clave detiene al atacante pero la conserva como evidencia. Las búsquedas en CloudTrail por ID de access key muestran lo que se hizo, y los atacantes suelen crear usuarios, claves o roles nuevos para mantener el acceso, así que hay que encontrarlos y eliminarlos. Eliminar el usuario destruye contexto, suspender GuardDuty deja ciego al equipo durante el incidente y reconstruir todo antes de dimensionar desperdicia tiempo sin saber qué se tocó." },

  { id: "ec2-containment-order", d: 2, type: "order", title: "Contén una instancia EC2 comprometida en el orden correcto",
    prompt: "Una instancia EC2 en un grupo de Auto Scaling detrás de un balanceador de carga está ejecutando malware de minado de criptomonedas. Ordena los pasos de contención de forma que se conserve la mayor cantidad de evidencia.",
    steps: [
      "Activar la protección contra terminación y etiquetar la instancia con el ID del incidente",
      "Separar la instancia del grupo de Auto Scaling y quitarla del balanceador de carga",
      "Mover la instancia a un security group de aislamiento y bloquear su tráfico con una network ACL",
      "Capturar una imagen de memoria de la instancia en ejecución",
      "Tomar snapshots de todos los volúmenes EBS asociados y etiquetarlos con el ID del incidente",
      "Compartir los snapshots con la cuenta forense para su análisis"
    ],
    explain: "La protección contra terminación y las etiquetas evitan que la automatización destruya la evidencia. Sacar la instancia del grupo de Auto Scaling y del balanceador evita que se reemplace o que atienda usuarios. El aislamiento limita al atacante, y una network ACL corta las conexiones ya rastreadas. La memoria es volátil, así que se captura antes de cualquier cosa que pueda reiniciar o detener la instancia; luego los snapshots de EBS conservan los discos, que se analizan en una cuenta forense aislada." },

  { id: "edge-controls-match", d: 3, type: "match", title: "Relaciona amenazas con controles de red y de borde de AWS",
    prompt: "Relaciona cada amenaza o requisito con el control de AWS que la atiende de forma más directa.",
    pairs: [
      ["Intentos de inyección SQL contra una API detrás de API Gateway", "AWS WAF managed rule group"],
      ["Un gran ataque DDoS de capas 3 y 4 con necesidad de ayuda experta y protección de costos", "AWS Shield Advanced"],
      ["Instancias que resuelven dominios usados para túneles DNS", "Route 53 Resolver DNS Firewall"],
      ["Salida desde muchas VPCs permitida solo a dominios aprobados, con firmas IPS", "AWS Network Firewall"],
      ["Bloquear un rango CIDR atacante para toda una subred", "Network ACL deny rule"],
      ["Mantener un origen S3 accesible solo a través de CloudFront", "Origin access control"]
    ],
    extra: ["Amazon Macie", "AWS Artifact"],
    explain: "AWS WAF inspecciona solicitudes HTTP y sus managed rule groups detectan inyección SQL. Shield Advanced agrega el Shield Response Team y protección de costos por DDoS. DNS Firewall bloquea las consultas de dominios listados en el Route 53 Resolver. Network Firewall ofrece filtrado stateful por dominio y reglas IPS compatibles con Suricata. Las network ACLs son el único filtro de la VPC con reglas deny explícitas a nivel de subred. Origin access control permite que CloudFront firme las solicitudes a un bucket de S3 privado. Macie y Artifact no son controles de red." },

  { id: "security-group-review-select", d: 3, type: "select", title: "Encuentra las reglas de security group riesgosas",
    prompt: "Estándar de la empresa: los puertos de administración (22, 3389) solo pueden alcanzarse desde el rango corporativo 203.0.113.0/24, y las bases de datos solo desde el security group de la capa de aplicación. Selecciona cada regla de entrada que incumple el estándar.",
    context: "Security group sg-0prod (attached to web, app and database instances for review)\n\nRule  Protocol  Port   Source              Description\n1     TCP       443    0.0.0.0/0           Public HTTPS\n2     TCP       22     0.0.0.0/0           Temporary SSH for vendor\n3     TCP       3389   203.0.113.0/24      RDP from corporate range\n4     TCP       3306   0.0.0.0/0           MySQL for reporting tool\n5     TCP       3306   sg-0app             MySQL from app tier\n6     All       All    ::/0                Test IPv6 access",
    options: [
      "Regla 1: HTTPS desde 0.0.0.0/0",
      "Regla 2: SSH desde 0.0.0.0/0",
      "Regla 3: RDP desde 203.0.113.0/24",
      "Regla 4: MySQL desde 0.0.0.0/0",
      "Regla 5: MySQL desde sg-0app",
      "Regla 6: todo el tráfico desde ::/0"
    ],
    answers: [1, 3, 5],
    explain: "SSH abierto a todas las direcciones IPv4 incumple la regla de puertos de administración, aunque sea temporal. MySQL abierto a internet incumple la regla de bases de datos, y todo el tráfico IPv6 desde ::/0 abre todos los puertos a internet por IPv6, algo fácil de pasar por alto. HTTPS público es esperable en una capa web, RDP desde el rango corporativo cumple el estándar y MySQL desde el security group de la capa de aplicación es exactamente el patrón permitido." },

  { id: "policy-evaluation-select", d: 4, type: "select", title: "Evalúa políticas IAM, un boundary, una SCP y una bucket policy",
    prompt: "Lee las políticas de abajo para la cuenta 111122223333. Selecciona cada solicitud que se permite.",
    context: "SCP on the account's OU: FullAWSAccess, plus\n  Deny  s3:DeleteBucket  on *\n\nRole AppRole - identity policy\n  Allow s3:GetObject, s3:PutObject  on arn:aws:s3:::app-data/*\n  Allow s3:DeleteBucket             on *\n  Allow dynamodb:GetItem            on table/orders\n\nRole AppRole - permissions boundary\n  Allow s3:*  on *\n\nBucket app-data - bucket policy\n  Deny  s3:PutObject for all principals when aws:SecureTransport is false\n  Allow s3:GetObject on app-data/* for principal arn:aws:iam::444455556666:root",
    options: [
      "AppRole lee un objeto de app-data por HTTPS",
      "AppRole escribe un objeto en app-data por HTTP sin cifrar",
      "AppRole elimina un bucket viejo y vacío en la misma cuenta",
      "AppRole lee un ítem de la tabla orders de DynamoDB",
      "AppRole escribe un objeto en app-data por HTTPS",
      "Un rol de la cuenta 444455556666 cuya política de identidad permite s3:GetObject en app-data/* lee un objeto",
      "Un rol de la cuenta 777788889999 cuya política de identidad permite s3:GetObject en app-data/* lee un objeto"
    ],
    answers: [0, 4, 5],
    explain: "Las lecturas y las escrituras por HTTPS las permite la política de identidad y están dentro del boundary. La escritura por HTTP sin cifrar choca con el deny explícito de la bucket policy. DeleteBucket lo niega explícitamente la SCP. La lectura de DynamoDB la permite la política de identidad, pero está fuera del permissions boundary, que solo permite S3, así que se niega implícitamente. La cuenta 444455556666 tiene permiso en ambos lados para el acceso entre cuentas, mientras que 777788889999 no tiene ningún allow en la bucket policy." },

  { id: "trust-policy-fill", d: 4, type: "fill", title: "Completa una trust policy para un proveedor externo",
    prompt: "Un proveedor de monitoreo en la cuenta 999988887777 debe asumir el rol VendorAudit, y solo cuando presente el external ID acordado con tu empresa. Completa los espacios.",
    context: "{\n  \"Effect\": \"Allow\",\n  \"Principal\": { \"AWS\": \"arn:aws:iam::[1]:root\" },\n  \"Action\": \"[2]\",\n  \"Condition\": {\n    \"StringEquals\": { \"[3]\": \"c7f2-acme-5521\" }\n  }\n}",
    fields: [
      { label: "[1] ID de cuenta del proveedor", answers: ["999988887777"] },
      { label: "[2] Acción", answers: ["sts:AssumeRole"] },
      { label: "[3] Condition key", answers: ["sts:ExternalId"] }
    ],
    explain: "La trust policy nombra la cuenta del proveedor como principal y permite sts:AssumeRole. La condición sts:ExternalId exige el valor único acordado con tu empresa, así que no se puede engañar al proveedor para que asuma tu rol en nombre de otro cliente: el problema del confused deputy. La política de permisos del rol limita después lo que puede hacer el proveedor." },

  { id: "data-protection-match", d: 5, type: "match", title: "Relaciona requisitos de protección de datos con funciones de S3 y KMS",
    prompt: "Relaciona cada requisito con la función que lo cumple.",
    pairs: [
      ["Cifrado sin ninguna gestión de claves, aplicado por defecto", "SSE-S3"],
      ["Uso de la clave registrado en CloudTrail y controlado por una key policy que tú escribes", "SSE-KMS with a customer managed key"],
      ["Dos capas independientes de cifrado para datos regulados", "DSSE-KMS"],
      ["El cliente entrega la clave en cada solicitud y AWS nunca la guarda", "SSE-C"],
      ["Reducir el volumen de solicitudes a KMS de un bucket con millones de cargas", "S3 Bucket Keys"],
      ["Nadie, incluido root, puede eliminar registros durante siete años", "Object Lock compliance mode"]
    ],
    extra: ["Object Lock governance mode", "MFA Delete"],
    explain: "SSE-S3 es el valor por defecto y no requiere gestionar claves. SSE-KMS con una customer managed key agrega tu propia key policy y el registro del uso de la clave en CloudTrail. DSSE-KMS aplica dos capas de cifrado. SSE-C usa una clave enviada con cada solicitud que AWS no conserva. Bucket Keys reduce las llamadas a KMS con SSE-KMS. El modo compliance no lo puede omitir nadie, a diferencia del modo governance, y MFA Delete solo agrega un paso de MFA." },

  { id: "ebs-encrypt-order", d: 5, type: "order", title: "Cifra un volumen EBS existente sin cifrar",
    prompt: "Una instancia de producción tiene un volumen de datos sin cifrar. Ordena los pasos para reemplazarlo por un volumen cifrado.",
    steps: [
      "Crear un snapshot del volumen sin cifrar",
      "Copiar el snapshot con el cifrado activado, eligiendo la customer managed key de KMS",
      "Crear un volumen nuevo a partir del snapshot cifrado en la zona de disponibilidad de la instancia",
      "Detener la aplicación y desasociar el volumen anterior de la instancia",
      "Asociar el volumen cifrado nuevo con el mismo nombre de dispositivo y reiniciar la aplicación",
      "Eliminar el volumen y el snapshot sin cifrar después de verificar los datos"
    ],
    explain: "Los volúmenes EBS existentes no se pueden cifrar en el lugar. La ruta admitida es tomar un snapshot, copiarlo con cifrado, crear un volumen a partir de la copia cifrada en la misma zona de disponibilidad que la instancia y hacer el cambio. Las copias sin cifrar se eliminan solo después de verificar los datos. Activar el cifrado por defecto solo ayuda con los volúmenes creados después." },

  { id: "governance-policy-match", d: 6, type: "match", title: "Relaciona necesidades de gobierno con funciones de la organización",
    prompt: "Relaciona cada requisito de gobierno con la función de AWS que lo aplica o lo entrega.",
    pairs: [
      ["Impedir que alguien en las cuentas miembro salga de la organización o apague CloudTrail", "Service control policy"],
      ["Impedir que principales fuera de la organización lleguen a buckets de S3, aunque una bucket policy los permita", "Resource control policy"],
      ["Hacer de IMDSv2 el valor obligatorio y bloquear el uso compartido público de AMIs en todas las cuentas", "Declarative policy"],
      ["Estandarizar los valores usados para la clave de etiqueta CostCenter", "Tag policy"],
      ["Desplegar un paquete de reglas de Config mapeado a un marco en todas las cuentas", "Conformance pack"],
      ["Descargar el informe SOC 2 propio de AWS para un auditor", "AWS Artifact"]
    ],
    extra: ["Permissions boundary", "AWS Budgets"],
    explain: "Las SCPs fijan los permisos máximos de los principales en las cuentas miembro. Las RCPs fijan los permisos máximos sobre los recursos, sea quien sea quien llama. Las declarative policies aplican configuraciones de servicio como los valores por defecto de IMDS y el uso compartido de AMIs. Las tag policies estandarizan claves y valores de etiquetas. Los conformance packs despliegan reglas de Config agrupadas en varias cuentas. Artifact entrega informes de cumplimiento de AWS. Los permissions boundaries aplican a identidades individuales y Budgets controla el gasto." }
]);
