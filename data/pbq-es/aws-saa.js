/* Spanish translation of the AWS Certified Solutions Architect - Associate exam simulations. Same ids and structure as data/pbq/aws-saa.js. */
CertHub.addPbqs("aws-saa", [
  { id: "detective-services-match", d: 1, type: "match", title: "Relaciona necesidades de seguridad con servicios de detección de AWS",
    prompt: "Un equipo de seguridad enumera seis requisitos. Relaciona cada requisito con el servicio de AWS que lo cumple de forma más directa.",
    pairs: [
      ["Averiguar qué principal de IAM eliminó ayer un VPC flow log", "AWS CloudTrail"],
      ["Mantener el historial de configuración de los security groups y marcar cualquiera que permita 0.0.0.0/0 en el puerto 22", "AWS Config"],
      ["Alertar cuando una instancia EC2 empiece a consultar dominios vinculados al minado de criptomonedas", "Amazon GuardDuty"],
      ["Listar las instancias EC2 y las imágenes de contenedor de ECR que tienen CVE conocidas", "Amazon Inspector"],
      ["Descubrir objetos de S3 que contienen números de tarjeta de crédito", "Amazon Macie"],
      ["Agregar los hallazgos de todos los anteriores y calificar las cuentas frente a un estándar de buenas prácticas", "AWS Security Hub"]
    ],
    extra: ["AWS Shield Advanced", "Amazon Cognito"],
    explain: "CloudTrail registra las llamadas a la API, así que responde quién hizo qué. Config registra la configuración de los recursos a lo largo del tiempo y evalúa reglas. GuardDuty analiza CloudTrail, VPC Flow Logs y los logs de DNS en busca de amenazas como el cryptomining. Inspector escanea las cargas de trabajo en busca de vulnerabilidades de software, Macie encuentra datos sensibles en S3 y Security Hub agrega hallazgos y ejecuta verificaciones de estándares. Shield es protección contra DDoS y Cognito es identidad de usuarios de aplicaciones, así que ninguno detecta estos problemas." },

  { id: "nacl-rule-evaluation", d: 1, type: "select", title: "Evalúa una network ACL",
    prompt: "La network ACL de abajo está asociada a una subred web pública. Supón que el security group de la instancia permite el tráfico. Selecciona cada flujo que la network ACL permite en ambas direcciones.",
    context: "Web subnet 10.0.1.0/24 - network ACL acl-0web\n\nINBOUND\nRule  Type   Protocol  Port range   Source            Action\n100   HTTPS  TCP       443          0.0.0.0/0         ALLOW\n110   SSH    TCP       22           203.0.113.0/24    ALLOW\n120   SSH    TCP       22           203.0.113.50/32   DENY\n130   Custom TCP       1024-65535   0.0.0.0/0         ALLOW\n*     All    All       All          0.0.0.0/0         DENY\n\nOUTBOUND\nRule  Type   Protocol  Port range   Destination       Action\n100   Custom TCP       1024-65535   0.0.0.0/0         ALLOW\n110   HTTPS  TCP       443          0.0.0.0/0         ALLOW\n*     All    All       All          0.0.0.0/0         DENY",
    options: [
      "Un cliente en 198.51.100.20 abre HTTPS (TCP 443) hacia el servidor web",
      "Un administrador en 203.0.113.50 abre SSH (TCP 22) hacia el servidor web",
      "Un administrador en 192.0.2.10 abre SSH (TCP 22) hacia el servidor web",
      "El servidor web descarga actualizaciones por HTTPS desde 192.0.2.80",
      "Un cliente en 198.51.100.20 abre HTTP (TCP 80) hacia el servidor web",
      "El servidor web envía correo por SMTP (TCP 25) a 192.0.2.25"
    ],
    answers: [0, 1, 3],
    explain: "Las network ACL son stateless y se evalúan en orden de número de regla; gana la primera coincidencia. El HTTPS entrante coincide con la regla inbound 100, y la respuesta al puerto efímero del cliente coincide con la outbound 100. El SSH desde 203.0.113.50 coincide con la regla 110 antes de llegar al DENY de la regla 120, así que ese deny no tiene efecto; necesitaría un número menor. El HTTPS saliente coincide con la outbound 110 y su respuesta regresa a un puerto efímero permitido por la inbound 130. El SSH desde 192.0.2.10, el HTTP en el 80 y el SMTP al puerto 25 no coinciden con ninguna regla de allow y caen en el deny predeterminado." },

  { id: "s3-https-policy-fill", d: 1, type: "fill", title: "Completa una bucket policy que exija HTTPS",
    prompt: "Un auditor exige que el bucket example-reports rechace toda solicitud que no se envíe por TLS. Completa los tres espacios en blanco de la declaración de la bucket policy.",
    context: "{\n  \"Sid\": \"EnforceTLS\",\n  \"Effect\": \"[1]\",\n  \"Principal\": \"*\",\n  \"Action\": \"s3:*\",\n  \"Resource\": [\n    \"arn:aws:s3:::example-reports\",\n    \"arn:aws:s3:::example-reports/*\"\n  ],\n  \"Condition\": {\n    \"Bool\": { \"[2]\": \"[3]\" }\n  }\n}",
    fields: [
      { label: "[1] Effect", answers: ["Deny"] },
      { label: "[2] Clave de condición (condition key)", answers: ["aws:SecureTransport"] },
      { label: "[3] Valor de la condición", answers: ["false", "\"false\""] }
    ],
    explain: "La declaración debe ser un Deny para que anule cualquier Allow en otro lugar, y se aplica a todos con Principal \"*\". La clave de condición global aws:SecureTransport es true cuando una solicitud llega por TLS, así que compararla con el valor false atrapa las solicitudes HTTP sin cifrar. Incluir tanto el ARN del bucket como el ARN de objetos /* cubre las acciones a nivel de bucket y a nivel de objeto." },

  { id: "kms-envelope-order", d: 1, type: "order", title: "Ordena los pasos del envelope encryption con KMS",
    prompt: "Una aplicación cifra un archivo de 2 GB con AWS KMS usando envelope encryption y más tarde lo vuelve a leer. Pon los pasos en el orden correcto.",
    steps: [
      "La aplicación llama a GenerateDataKey indicando la customer managed KMS key",
      "KMS devuelve una data key en texto plano y una copia de la data key cifrada con la KMS key",
      "La aplicación cifra el archivo localmente con la data key en texto plano",
      "La aplicación borra de la memoria la data key en texto plano y guarda la data key cifrada junto con el archivo",
      "Para leer el archivo, la aplicación envía la data key cifrada a la API Decrypt de KMS",
      "La aplicación descifra el archivo localmente con la data key en texto plano que devolvió KMS"
    ],
    explain: "KMS cifra directamente como máximo 4 KB, así que los datos grandes usan envelope encryption. GenerateDataKey devuelve una copia en texto plano y una copia cifrada de una data key; el cifrado masivo ocurre localmente y solo se conserva la data key cifrada. Para descifrar, la aplicación le pide a KMS que descifre la pequeña data key, lo cual está sujeto a la key policy y queda registrado en CloudTrail, y luego descifra el archivo localmente." },

  { id: "sqs-dlq-lifecycle-order", d: 2, type: "order", title: "Sigue un mensaje envenenado hasta la dead-letter queue",
    prompt: "Una cola de SQS tiene una redrive policy con maxReceiveCount de 3. Un consumidor falla con un mensaje de pedido mal formado. Pon los eventos en el orden en que ocurren.",
    steps: [
      "El productor llama a SendMessage y el mensaje del pedido se guarda en la cola de origen",
      "Un consumidor recibe el mensaje y comienza su visibility timeout",
      "El consumidor falla antes de llamar a DeleteMessage",
      "El visibility timeout expira y el mensaje vuelve a ser visible",
      "El mensaje se recibe y falla dos veces más, alcanzando el maxReceiveCount de 3",
      "SQS mueve el mensaje a la dead-letter queue",
      "Tras corregir el bug, un ingeniero inicia un DLQ redrive para devolver el mensaje a la cola de origen"
    ],
    explain: "Un mensaje recibido queda oculto durante el visibility timeout; si no se elimina a tiempo, reaparece y su contador de recepciones aumenta. Cuando el contador de recepciones supera el maxReceiveCount de la redrive policy, SQS mueve el mensaje a la dead-letter queue en lugar de volver a entregarlo, así deja de bloquear el resto del trabajo. Después de corregir la causa raíz, el DLQ redrive devuelve los mensajes a la cola de origen para procesarlos." },

  { id: "route53-policy-match", d: 2, type: "match", title: "Relaciona requisitos con routing policies de Route 53",
    prompt: "Relaciona cada requisito de DNS con la routing policy de Route 53 que lo cumple.",
    pairs: [
      ["Enviar al 10 por ciento de los usuarios a una nueva versión del sitio para un canary release", "Weighted"],
      ["Enviar a cada usuario a la Region que le da la menor latencia de red", "Latency"],
      ["Mostrar a los usuarios de Alemania un sitio con términos legales específicos del país", "Geolocation"],
      ["Devolver una página de mantenimiento estática en S3 solo cuando el ALB principal falla su health check", "Failover"],
      ["Devolver hasta ocho direcciones IP de servidores web sanos y dejar que los clientes elijan una", "Multivalue answer"]
    ],
    extra: ["Simple", "IP-based"],
    explain: "El weighted routing reparte el tráfico según pesos relativos, ideal para canaries. El latency routing elige la Region con la mejor latencia medida, que no es lo mismo que el país más cercano. Geolocation responde según el continente, país o estado del usuario, así que sirve para contenido legal y localizado. Failover devuelve el registro secundario solo cuando falla el health check del principal. Multivalue answer devuelve hasta ocho registros sanos al azar. El simple routing no tiene health checks, y el IP-based routing elige según el CIDR de origen del cliente, no según el país." },

  { id: "dr-rpo-rto-fill", d: 2, type: "fill", title: "Calcula el RPO y el RTO logrados",
    prompt: "Lee la cronología del incidente de una carga de trabajo con backup and restore y completa los valores.",
    context: "Workload: internal ordering app (backup and restore strategy)\nTargets: RPO 4 hours, RTO 2 hours\nRDS automated snapshots copied to the DR Region at 00:00, 04:00, 08:00, 12:00, 16:00, 20:00\n\n10:30  Primary Region outage begins; last snapshot copied to DR Region was taken at 08:00\n10:45  DR declared; CloudFormation stacks deployed in DR Region\n11:40  Database restored from the 08:00 snapshot\n13:15  Application verified and DNS switched; service restored",
    fields: [
      { label: "Datos perdidos, en minutos de transacciones", answers: ["150"] },
      { label: "Tiempo de inactividad, en minutos, desde el inicio de la interrupción hasta que se restauró el servicio", answers: ["165"] },
      { label: "¿Se cumplió el objetivo de RPO? (sí/no)", answers: ["sí", "s"] },
      { label: "¿Se cumplió el objetivo de RTO? (sí/no)", answers: ["no", "n"] }
    ],
    explain: "La restauración usó el snapshot de las 08:00, así que todo lo escrito entre las 08:00 y la interrupción de las 10:30, 150 minutos, se perdió; eso está dentro del RPO de 4 horas. El tiempo de inactividad va de las 10:30 a las 13:15, 165 minutos, lo que supera el RTO de 2 horas. Para cumplir el RTO, el equipo necesitaría una estrategia más rápida, como pilot light o warm standby, con los datos ya replicándose y la infraestructura lista." },

  { id: "ebs-volume-match", d: 3, type: "match", title: "Relaciona cargas de trabajo con EBS y almacenamiento de instancia",
    prompt: "Relaciona cada carga de trabajo con la opción de almacenamiento en bloque más adecuada.",
    pairs: [
      ["Volúmenes de arranque y servidores de aplicaciones generales que necesitan una base de 3,000 IOPS a bajo costo", "gp3"],
      ["Base de datos SAP HANA de misión crítica que necesita los IOPS sostenidos más altos y latencia inferior a un milisegundo", "io2 Block Express"],
      ["Clúster de big data que recorre archivos de log grandes de forma secuencial", "st1"],
      ["Datos de acceso poco frecuente, orientados a throughput, al precio de EBS más bajo", "sc1"],
      ["Caché temporal reconstruible que necesita la E/S local más rápida, donde perder los datos al detener la instancia es aceptable", "Instance store"]
    ],
    extra: ["Amazon EFS", "gp2"],
    explain: "gp3 ofrece una base de 3,000 IOPS y 125 MB/s sin importar el tamaño, y es la opción predeterminada. io2 Block Express es el nivel de EBS de mayor rendimiento para bases de datos críticas. st1 es HDD optimizado para throughput en lecturas secuenciales grandes, mientras que sc1 es el HDD frío más barato; ninguno puede ser volumen de arranque. El instance store está conectado físicamente y es muy rápido, pero pierde los datos al detener o terminar la instancia. gp2 vincula los IOPS al tamaño y cuesta más que gp3, y EFS es un sistema de archivos compartido, no almacenamiento en bloque." },

  { id: "dynamodb-capacity-fill", d: 3, type: "fill", title: "Calcula la capacidad aprovisionada de DynamoDB",
    prompt: "Una tabla en modo de capacidad aprovisionada debe soportar el tráfico de abajo. Calcula las unidades de capacidad necesarias para cada carga de trabajo.",
    context: "Workload A: 50 strongly consistent reads per second, items of 10 KB\nWorkload B: 100 eventually consistent reads per second, items of 3 KB\nWorkload C: 20 standard writes per second, items of 2.5 KB\nWorkload D: 20 transactional writes per second, items of 2.5 KB\n\n1 RCU = one strongly consistent read/s (or two eventually consistent reads/s) of up to 4 KB\n1 WCU = one write/s of up to 1 KB; transactional requests use twice the units",
    fields: [
      { label: "Read capacity units de la Workload A", answers: ["150"] },
      { label: "Read capacity units de la Workload B", answers: ["50"] },
      { label: "Write capacity units de la Workload C", answers: ["60"] },
      { label: "Write capacity units de la Workload D", answers: ["120"] }
    ],
    explain: "El tamaño de los ítems se redondea hacia arriba a la siguiente unidad. Un ítem de 10 KB necesita 3 unidades de lectura de 4 KB, así que 50 lecturas fuertemente consistentes necesitan 150 RCU. Un ítem de 3 KB necesita 1 unidad, y las lecturas eventualmente consistentes cuestan la mitad, así que 100 lecturas necesitan 50 RCU. Una escritura de 2.5 KB se redondea a 3 KB, así que 20 escrituras necesitan 60 WCU, y las escrituras transaccionales lo duplican a 120." },

  { id: "ec2-purchase-match", d: 4, type: "match", title: "Relaciona cargas de trabajo con opciones de compra de EC2",
    prompt: "Relaciona cada carga de trabajo con la opción de compra más rentable que aún cumple sus requisitos.",
    pairs: [
      ["Flota estable 24/7 que el próximo año pasará de EC2 a Fargate y Lambda", "Compute Savings Plan"],
      ["Trabajos de renderizado nocturnos que guardan checkpoints en S3 y pueden reiniciarse en cualquier momento", "Spot Instances"],
      ["Una prueba de carga de dos semanas que no debe interrumpirse, con tipos de instancia aún no elegidos", "On-Demand Instances"],
      ["Software licenciado por núcleo físico de CPU que requiere visibilidad de sockets y núcleos", "Dedicated Hosts"],
      ["Una flota estable de m6i en una sola Region durante tres años, buscando el mayor descuento de Savings Plan", "EC2 Instance Savings Plan"]
    ],
    extra: ["Dedicated Instances", "Convertible Reserved Instances"],
    explain: "Un Compute Savings Plan es el compromiso que también cubre Fargate y Lambda, así que sobrevive a la migración. El trabajo interrumpible y con checkpoints va en Spot. Una prueba corta, no interrumpible y no planificada encaja con On-Demand, porque un compromiso de un año desperdiciaría dinero. Las licencias por núcleo o por socket necesitan Dedicated Hosts, ya que las Dedicated Instances no exponen el servidor físico. Un EC2 Instance Savings Plan da un descuento mayor que un Compute Savings Plan cuando la familia y la Region son fijas. Las RI convertibles descuentan menos y no cubren Fargate ni Lambda." },

  { id: "cost-findings-select", d: 4, type: "select", title: "Elige los ahorros reales de una revisión de costos",
    prompt: "Una revisión de costos de una cuenta produjo los hallazgos de abajo. Selecciona cada hallazgo que represente una acción clara de ahorro de costos.",
    context: "Resource                      Service      Finding\n1  vol-0a1 (gp2, 500 GiB)      EBS          State: available (unattached) for 94 days\n2  eipalloc-07c                EC2          Elastic IP not associated with any running instance\n3  nat-0b2 (us-east-1a)        VPC          12 TB/month processed; 95% of bytes go to the S3 prefix list\n4  i-0c3 (m5.4xlarge)          EC2          Prod web: avg CPU 4%, max 9%, memory max 11% over 14 days\n5  i-0d4 (c7g.xlarge) x6       EC2          ASG with target tracking at 60% CPU; avg CPU 58%\n6  db-orders (Aurora)          RDS          Busy 24/7; 100% covered by reserved DB instances\n7  example-logs bucket         S3           Lifecycle: Standard-IA at 30 days, Glacier Flexible Retrieval at 90 days",
    options: [
      "1: Volumen gp2 sin conectar",
      "2: Dirección Elastic IP sin asociar",
      "3: NAT gateway que transporta principalmente tráfico de S3",
      "4: Servidor web m5.4xlarge con utilización muy baja",
      "5: Auto Scaling group c7g cerca de su objetivo de escalado",
      "6: Clúster Aurora totalmente cubierto por reservas",
      "7: Bucket de logs con transiciones de lifecycle"
    ],
    answers: [0, 1, 2, 3],
    explain: "Un volumen sin conectar se factura sin hacer nada; toma un snapshot si hace falta y elimínalo. Las direcciones IPv4 públicas, incluidas las Elastic IP sin asociar, generan cargos, así que libera las que no uses. Los NAT gateways cobran por GB procesado, y un S3 gateway endpoint transporta ese tráfico gratis. El m5.4xlarge está muy sobredimensionado y debería ajustarse al tamaño correcto (right-sizing). El Auto Scaling group ya está siguiendo su objetivo, el clúster Aurora ocupado está totalmente reservado y el bucket ya tiene reglas de lifecycle, así que ninguno de ellos es desperdicio." }
]);
