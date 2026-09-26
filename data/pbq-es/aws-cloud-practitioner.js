/* Spanish translation of the AWS Certified Cloud Practitioner exam simulations. Same ids and structure as data/pbq/aws-cloud-practitioner.js. */
CertHub.addPbqs("aws-cloud-practitioner", [
  { id: "wa-pillars-match", d: 1, type: "match", title: "Relaciona prácticas con los pilares de Well-Architected",
    prompt: "Durante una revisión de diseño, el equipo enumera seis prácticas. Relaciona cada práctica con el pilar del AWS Well-Architected Framework al que pertenece.",
    pairs: [
      ["Realizar las operaciones como código y hacer cambios frecuentes, pequeños y reversibles", "Excelencia operativa (Operational excellence)"],
      ["Otorgar el mínimo privilegio y habilitar la trazabilidad con registros (logs)", "Seguridad (Security)"],
      ["Recuperarse automáticamente de fallas y probar con regularidad los procedimientos de recuperación", "Confiabilidad (Reliability)"],
      ["Usar arquitecturas serverless y experimentar para encontrar los tipos de recursos con mejor rendimiento", "Eficiencia del rendimiento (Performance efficiency)"],
      ["Adoptar un modelo de consumo y asignar el gasto a los equipos mediante etiquetas (tags)", "Optimización de costos (Cost optimization)"],
      ["Maximizar la utilización para que menos recursos consuman energía", "Sostenibilidad (Sustainability)"]
    ],
    extra: ["Escalabilidad (Scalability)", "Agilidad (Agility)"],
    explain: "El framework tiene exactamente seis pilares. Las operaciones como código pertenecen a la excelencia operativa, el mínimo privilegio y la trazabilidad a la seguridad, y la recuperación automática con procedimientos probados a la confiabilidad. Elegir y experimentar con tipos de recursos para ganar velocidad es eficiencia del rendimiento, mientras que pagar solo por lo que usas y asignar los costos es optimización de costos. Maximizar la utilización para reducir el impacto ambiental es el pilar de sostenibilidad. La escalabilidad y la agilidad son beneficios de la nube, no pilares." },

  { id: "seven-rs-match", d: 1, type: "match", title: "Asigna estrategias de migración a las aplicaciones",
    prompt: "Un minorista está planificando su portafolio de migración. Relaciona cada decisión sobre una aplicación con la estrategia de migración (una de las 7 R) que representa.",
    pairs: [
      ["Mover 300 máquinas virtuales a Amazon EC2 sin cambios antes de que termine el contrato de arrendamiento del data center", "Rehost"],
      ["Mover un servidor MySQL autoadministrado a Amazon RDS sin cambiar el código de la aplicación", "Replatform"],
      ["Reescribir el sistema monolítico de pedidos como funciones de AWS Lambda respaldadas por Amazon DynamoDB", "Refactor"],
      ["Reemplazar el CRM desarrollado internamente por un producto CRM SaaS", "Repurchase"],
      ["Dar de baja una herramienta de reportes que nadie ha usado en más de un año", "Retire"],
      ["Mantener por ahora una aplicación de mainframe en las instalaciones locales y revisarla el próximo año", "Retain"]
    ],
    extra: ["Relocate", "Replicate"],
    explain: "Rehost (lift and shift) mueve los servidores tal como están. Replatform hace una pequeña optimización, como pasar a una base de datos administrada, sin rediseñar, mientras que refactor rediseña la arquitectura de la aplicación con servicios nativos de la nube. Repurchase cambia a un producto diferente, generalmente SaaS; retire apaga lo que ya no se necesita; retain lo deja donde está por ahora. Relocate se refiere a mover infraestructura, como un entorno VMware, a la nube sin comprar hardware nuevo ni cambiar la operación, y 'Replicate' no es una de las 7 R." },

  { id: "rds-shared-resp", d: 2, type: "select", title: "Responsabilidades del cliente en Amazon RDS",
    prompt: "Una empresa mueve su base de datos a Amazon RDS for PostgreSQL. Selecciona todas las tareas que siguen siendo responsabilidad del CLIENTE según el modelo de responsabilidad compartida.",
    options: [
      "Aplicar parches al motor de base de datos PostgreSQL",
      "Crear usuarios de la base de datos y administrar sus privilegios",
      "Configurar las reglas del security group que controlan quién puede conectarse",
      "Reemplazar el hardware físico de almacenamiento que falla",
      "Decidir si se habilita el cifrado en reposo para la instancia de base de datos",
      "Aplicar parches al sistema operativo del host de la base de datos",
      "Elegir el período de retención de respaldos y la ventana de mantenimiento"
    ],
    answers: [1, 2, 4, 6],
    explain: "RDS es un servicio administrado, así que AWS aplica los parches al motor de base de datos y al sistema operativo del host (durante una ventana de mantenimiento que tú eliges) y se encarga del hardware físico. El cliente sigue controlando el acceso y los datos: los usuarios y privilegios de la base de datos, las reglas del security group, la decisión de cifrar y configuraciones como la retención de respaldos y la ventana de mantenimiento. La administración de datos y accesos siempre queda en manos del cliente." },

  { id: "sg-least-privilege", d: 2, type: "select", title: "Revisa el security group de un servidor web",
    prompt: "Un servidor web Linux debe aceptar HTTP y HTTPS de cualquier origen, y SSH solo desde la red de administración 198.51.100.0/24. Su base de datos se ejecuta en Amazon RDS en otro security group. Selecciona todas las reglas de entrada que se deben ELIMINAR para cumplir con el mínimo privilegio.",
    context: "Security group sg-web (inbound rules)\nRule  Protocol  Port  Source\n1     TCP       443   0.0.0.0/0\n2     TCP       22    0.0.0.0/0\n3     TCP       22    198.51.100.0/24\n4     TCP       3389  0.0.0.0/0\n5     TCP       3306  0.0.0.0/0\n6     TCP       80    0.0.0.0/0",
    options: ["Regla 1 (443 desde 0.0.0.0/0)", "Regla 2 (22 desde 0.0.0.0/0)", "Regla 3 (22 desde 198.51.100.0/24)", "Regla 4 (3389 desde 0.0.0.0/0)", "Regla 5 (3306 desde 0.0.0.0/0)", "Regla 6 (80 desde 0.0.0.0/0)"],
    answers: [1, 3, 4],
    explain: "Las reglas 1 y 6 son necesarias porque el sitio debe servir HTTPS y HTTP a todos, y la regla 3 permite SSH solo desde la red de administración, como se especificó. La regla 2 expone SSH a todo internet, la regla 4 abre RDP, que un servidor web Linux no necesita, y la regla 5 abre el puerto de MySQL a todo el mundo aunque la base de datos no está en este servidor. Los security groups solo permiten (allow), así que la forma de endurecerlos es eliminar las reglas de permiso innecesarias." },

  { id: "security-services-match", d: 2, type: "match", title: "Elige el servicio de seguridad para cada hallazgo",
    prompt: "Un analista de seguridad necesita el servicio de AWS adecuado para cada situación. Relaciona cada situación con el servicio que la atiende.",
    pairs: [
      ["Una instancia EC2 se está comunicando con una dirección IP asociada con minería de criptomonedas", "Amazon GuardDuty"],
      ["Una imagen de contenedor en Amazon ECR incluye un paquete con un CVE crítico", "Amazon Inspector"],
      ["Archivos CSV en un bucket de S3 contienen números de tarjetas de crédito", "Amazon Macie"],
      ["Investigar qué rol y qué direcciones IP estuvieron involucrados en un hallazgo durante la última semana", "Amazon Detective"],
      ["Ver en un solo lugar los hallazgos de varios servicios y las verificaciones de buenas prácticas", "AWS Security Hub"],
      ["Averiguar qué usuario de IAM eliminó ayer un security group", "AWS CloudTrail"]
    ],
    extra: ["AWS Shield", "Amazon Cognito"],
    explain: "GuardDuty detecta amenazas activas analizando CloudTrail, VPC Flow Logs y los registros de DNS. Inspector analiza EC2, imágenes de contenedores y Lambda en busca de vulnerabilidades de software, y Macie descubre datos sensibles como números de tarjetas en S3. Detective ayuda a investigar la causa raíz detrás de los hallazgos, Security Hub agrega los hallazgos y ejecuta verificaciones de postura, y CloudTrail registra las llamadas a la API para que puedas ver quién hizo qué. Shield se encarga de la protección contra DDoS y Cognito del inicio de sesión en aplicaciones, así que ninguno encaja en estas situaciones." },

  { id: "vpc-routes-fill", d: 3, type: "fill", title: "Completa un diseño de VPC",
    prompt: "Los servidores web se ejecutan en subredes públicas y los servidores de aplicaciones en subredes privadas. Los servidores de aplicaciones deben descargar actualizaciones desde internet, pero no deben aceptar conexiones desde internet. Completa los valores que faltan.",
    context: "VPC 10.0.0.0/16\n\nRoute table: public-rt (subredes públicas)\nDestination    Target\n10.0.0.0/16    local\n0.0.0.0/0      [ A ]\n\nRoute table: private-rt (subredes privadas)\nDestination    Target\n10.0.0.0/16    local\n0.0.0.0/0      [ B ]\n\nDNS: shop.example.com -> load balancer   (servicio [ D ])",
    fields: [
      { label: "A: destino (target) para 0.0.0.0/0 en la tabla de rutas pública", answers: ["internet gateway", "un internet gateway", "igw"] },
      { label: "B: destino (target) para 0.0.0.0/0 en la tabla de rutas privada", answers: ["nat gateway", "un nat gateway", "nat", "nat gw"] },
      { label: "C: tipo de subred en la que se coloca el propio NAT gateway (pública o privada)", answers: ["pública", "subred pública", "una subred pública"] },
      { label: "D: servicio DNS de AWS que resuelve shop.example.com", answers: ["route 53", "amazon route 53", "route53"] }
    ],
    explain: "Una subred es pública porque su tabla de rutas envía el tráfico de internet a un internet gateway. Las subredes privadas envían el tráfico saliente hacia internet a un NAT gateway, que permite las conexiones iniciadas desde adentro y bloquea las iniciadas desde internet. El NAT gateway debe estar en una subred pública para poder llegar él mismo al internet gateway. Amazon Route 53 es el servicio DNS de AWS que asocia el nombre de dominio con el balanceador de carga." },

  { id: "storage-match", d: 3, type: "match", title: "Elige el almacenamiento para cada requisito",
    prompt: "Relaciona cada requisito de almacenamiento con el servicio o la clase de almacenamiento de AWS que mejor se ajusta.",
    pairs: [
      ["Volumen de arranque para una sola instancia EC2 que debe persistir después de que la instancia se detiene", "Amazon EBS"],
      ["Sistema de archivos NFS compartido montado por 20 instancias Linux en tres AZ", "Amazon EFS"],
      ["Archivo de cumplimiento conservado durante 10 años al menor costo; se acepta una recuperación dentro de 48 horas", "S3 Glacier Deep Archive"],
      ["Recursos compartidos de archivos SMB integrados con Active Directory para usuarios de Windows", "Amazon FSx for Windows File Server"],
      ["Espacio temporal de trabajo para datos de caché que se pueden perder en cualquier momento", "Instance store"],
      ["Software de respaldo local que escribe en cintas virtuales almacenadas en AWS", "AWS Storage Gateway (Tape Gateway)"]
    ],
    extra: ["S3 One Zone-IA", "Amazon ElastiCache"],
    explain: "EBS ofrece volúmenes de bloque persistentes para una instancia en una AZ, mientras que el instance store es rápido pero temporal y pierde los datos cuando la instancia se detiene. EFS es un sistema de archivos NFS administrado que muchos clientes Linux pueden compartir entre AZ; FSx for Windows File Server ofrece recursos compartidos SMB con integración con Active Directory. Glacier Deep Archive es la clase de S3 de menor costo para archivos a largo plazo con recuperación en horas, y Tape Gateway permite que el software de respaldo existente use cintas virtuales respaldadas por AWS. One Zone-IA es para datos de acceso poco frecuente que se pueden volver a crear, no para archivos a largo plazo." },

  { id: "request-path-order", d: 3, type: "order", title: "Sigue una solicitud a través de una arquitectura web",
    prompt: "Un cliente abre shop.example.com en un navegador y ve una página de producto que no está en la caché. Ordena los pasos según el recorrido de la solicitud.",
    steps: [
      "Amazon Route 53 resuelve shop.example.com a la distribución de CloudFront",
      "El navegador se conecta a una ubicación de borde (edge location) de Amazon CloudFront cercana",
      "CloudFront tiene un cache miss y reenvía la solicitud al origen, el Application Load Balancer",
      "El Application Load Balancer envía la solicitud a una instancia EC2 en buen estado en una subred privada",
      "La instancia EC2 consulta la base de datos de Amazon RDS para obtener los detalles del producto"
    ],
    explain: "La resolución DNS siempre va primero, así que Route 53 responde con la dirección de la distribución de CloudFront. Luego el navegador se conecta a una ubicación de borde; ante un cache miss, CloudFront obtiene el contenido de su origen, en este caso el balanceador de carga. El balanceador de carga enruta solo a destinos en buen estado, y finalmente el servidor de aplicaciones lee los datos de la base de datos antes de que la respuesta regrese por el mismo camino." },

  { id: "purchase-options-match", d: 4, type: "match", title: "Elige las opciones de compra de EC2",
    prompt: "Relaciona cada carga de trabajo con la opción de compra de EC2 más rentable que cumple sus requisitos.",
    pairs: [
      ["Cómputo constante en EC2, AWS Fargate y AWS Lambda durante 3 años, con libertad para cambiar de familia de instancias y de región", "Compute Savings Plans"],
      ["Trabajos nocturnos de renderizado de video que se pueden interrumpir y reiniciar", "Spot Instances"],
      ["Una prueba de carga de dos semanas con uso impredecible que no debe interrumpirse", "On-Demand Instances"],
      ["Software existente con licencia por núcleo físico que requiere visibilidad de sockets y núcleos", "Dedicated Hosts"],
      ["El cumplimiento exige hardware no compartido con otras cuentas de AWS, sin necesidad de visibilidad a nivel de host", "Dedicated Instances"]
    ],
    extra: ["Capacity Reservations sin compromiso"],
    explain: "Los Compute Savings Plans cambian un compromiso de gasto de 1 o 3 años por descuentos que se aplican entre familias de EC2, regiones, Fargate y Lambda. Las Spot Instances son las más baratas, pero pueden interrumpirse con un aviso de dos minutos, así que sirven para trabajos que se pueden reiniciar. El trabajo corto e impredecible que no puede interrumpirse va en On-Demand. Los Dedicated Hosts dan visibilidad de sockets y núcleos para software con licencia propia (bring-your-own-license), mientras que las Dedicated Instances dan hardware de una sola cuenta sin esa visibilidad." },

  { id: "consolidated-billing-fill", d: 4, type: "fill", title: "Calcula el ahorro de la facturación consolidada",
    prompt: "Dos cuentas se unen a la misma AWS Organization con facturación consolidada. Con las tarifas de almacenamiento escalonadas de ejemplo que aparecen abajo (no son precios reales de AWS), completa los costos mensuales de almacenamiento en dólares enteros.",
    context: "Tarifas escalonadas de ejemplo (por TB-mes):\n  Primeros 50 TB:   $20\n  Más de 50 TB:     $15\n\nAlmacenamiento mensual:\n  Cuenta A: 30 TB\n  Cuenta B: 40 TB",
    fields: [
      { label: "Costo combinado si cada cuenta se factura por separado ($)", answers: ["1400", "$1400", "1,400", "$1,400"] },
      { label: "Costo con facturación consolidada ($)", answers: ["1300", "$1300", "1,300", "$1,300"] },
      { label: "Ahorro mensual ($)", answers: ["100", "$100"] }
    ],
    explain: "Si se facturan por separado, ninguna cuenta pasa de 50 TB, así que A paga 30 x $20 = $600 y B paga 40 x $20 = $800, un total de $1,400. Con la facturación consolidada, la organización se trata como un solo cliente para los niveles de volumen: los primeros 50 TB cuestan $1,000 y los 20 TB restantes caen en el nivel más barato a $300, para un total de $1,300. Esa diferencia de $100 es la razón por la que AWS Organizations puede reducir costos incluso antes de compartir Reserved Instances o Savings Plans." }
]);
