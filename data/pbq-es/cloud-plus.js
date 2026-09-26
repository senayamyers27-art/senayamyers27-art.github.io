/* Spanish translation of the CompTIA Cloud+ exam simulations. Same ids and structure as data/pbq/cloud-plus.js. */
CertHub.addPbqs("cloud-plus", [
  { id: "dr-pattern-match", d: 1, type: "match", title: "Relaciona arquitecturas de recuperación ante desastres",
    prompt: "Una empresa está comparando diseños de recuperación ante desastres (DR) para su sistema de pedidos. Relaciona cada descripción con la arquitectura de DR que describe.",
    pairs: [
      ["Solo se copian backups y snapshots a la región de recuperación; la red y los servidores se reconstruyen a partir de plantillas después del desastre", "Backup and restore (copia de seguridad y restauración)"],
      ["La base de datos se replica continuamente a la región de recuperación, pero los servidores de aplicaciones existen solo como imágenes y se lanzan durante el failover", "Pilot light"],
      ["Una copia más pequeña pero totalmente funcional de todo el stack se ejecuta siempre en la región de recuperación y se escala durante el failover", "Warm standby"],
      ["La capacidad completa de producción atiende tráfico real de clientes desde dos regiones al mismo tiempo", "Multisitio activo-activo"]
    ],
    extra: ["Despliegue blue-green", "Canary release"],
    explain: "Los cuatro patrones forman un espectro de costo y velocidad. Backup and restore es el más barato, pero tiene el RTO más largo porque hay que reconstruirlo todo. Pilot light mantiene en ejecución solo la capa de datos esencial. Warm standby ejecuta todo el stack a tamaño reducido, así que puede recibir tráfico en minutos. Activo-activo ejecuta la capacidad completa en cada sitio para lograr un RTO y un RPO casi nulos, al costo más alto. Blue-green y canary son estrategias de lanzamiento, no arquitecturas de DR." },

  { id: "vpc-cidr-plan", d: 1, type: "fill", title: "Planifica las subredes de una nueva VPC",
    prompt: "Estás dividiendo una nueva VPC en subredes del mismo tamaño, una por capa y por zona de disponibilidad. Con el plan de abajo, completa los valores.",
    context: "VPC CIDR:      10.20.0.0/16\nSubnet size:   /20\nSubnets are allocated in order starting at 10.20.0.0:\n  subnet-1  10.20.0.0/20   (public, AZ-a)\n  subnet-2  ?              (public, AZ-b)\n  subnet-3  ?              (private, AZ-a)\n  ...",
    fields: [
      { label: "Cuántas subredes /20 caben en la /16", answers: ["16"] },
      { label: "Total de direcciones IP en cada /20 (antes de las reservas del proveedor)", answers: ["4096", "4,096"] },
      { label: "Dirección de red de subnet-3", answers: ["10.20.32.0", "10.20.32.0/20"] },
      { label: "Última dirección (broadcast) de subnet-1", answers: ["10.20.15.255"] }
    ],
    explain: "Una /20 deja 12 bits de host, así que cada subred tiene 2^12 = 4,096 direcciones, y una /16 contiene 2^(20-16) = 16 de ellas. Cada /20 abarca 16 valores del tercer octeto: subnet-1 va de 10.20.0.0 a 10.20.15.255, subnet-2 empieza en 10.20.16.0 y subnet-3 en 10.20.32.0. Los proveedores de nube reservan algunas direcciones en cada subred, así que las utilizables son un poco menos de 4,096." },

  { id: "migration-plan-order", d: 2, type: "order", title: "Ordena el plan de migración",
    prompt: "Una empresa va a mover 80 aplicaciones on-premises a la nube. Pon estas actividades de migración en el orden correcto.",
    steps: [
      "Ejecutar el descubrimiento para inventariar servidores, aplicaciones y su nivel de uso",
      "Mapear las dependencias entre aplicaciones, bases de datos y servicios compartidos",
      "Agrupar los sistemas dependientes en grupos de migración y programar una oleada piloto de bajo riesgo",
      "Realizar la sincronización final de datos y hacer el cutover del tráfico durante la ventana aprobada",
      "Validar con smoke tests, verificaciones de datos y comparación con la línea base de rendimiento",
      "Dar de baja los servidores on-premises antiguos después de un periodo de estabilización"
    ],
    explain: "No puedes mapear dependencias hasta saber qué existe, y no puedes agrupar sistemas en oleadas hasta saber qué depende de qué; mover una aplicación muy comunicativa sin su base de datos es un error clásico. Una oleada piloto pone a prueba las herramientas y los runbooks antes de mover los sistemas críticos. Después del cutover viene la validación, y los servidores antiguos se conservan hasta que el nuevo entorno demuestre ser estable, para que el rollback siga siendo posible." },

  { id: "transfer-time-fill", d: 2, type: "fill", title: "¿Transferencia de datos en línea o fuera de línea?",
    prompt: "Un equipo debe mover un archivo histórico a almacenamiento de objetos en la nube en un plazo de 5 días. Con las cifras de abajo, completa los valores.",
    context: "Data to move:          40 TB (decimal: 1 TB = 1,000,000 MB)\nInternet link:         500 Mbps\nUsable for migration:  80% of the link (the rest is production traffic)\nDeadline:              5 days",
    fields: [
      { label: "Tasa de transferencia efectiva en Mbps", answers: ["400", "400 Mbps"] },
      { label: "Tiempo de transferencia en segundos", answers: ["800000", "800,000", "800000 s", "800,000 s"] },
      { label: "Tiempo de transferencia redondeado a días completos", answers: ["9", "9 días"] },
      { label: "¿La transferencia en línea cumple el plazo? (sí/no)", answers: ["no"] }
    ],
    explain: "40 TB son 40,000,000 MB, o 320,000,000 megabits. Al 80% de 500 Mbps, la tasa efectiva es 400 Mbps, así que la transferencia tarda 320,000,000 / 400 = 800,000 segundos, unos 9.3 días. Eso no cumple el plazo de 5 días incluso antes de contar la sobrecarga del protocolo, así que un dispositivo de transferencia offline (que se carga localmente y se envía) es la mejor opción, seguido de una sincronización en línea de los cambios." },

  { id: "sla-math-fill", d: 3, type: "fill", title: "Calcula la disponibilidad y el tiempo de inactividad",
    prompt: "Usa la arquitectura y las cifras de SLA de abajo para completar los valores. Da los porcentajes con dos decimales.",
    context: "Month length for the SLA:  30 days (43,200 minutes)\nContracted SLA:            99.95% monthly\n\nRequest path (each component is required, in series):\n  web tier       99.90%\n  database       99.95%\n\nProposed change: run the batch worker as two independent instances,\neach 99.00% available; the job succeeds if either instance is up.",
    fields: [
      { label: "Tiempo de inactividad permitido por mes con 99.95%, en minutos", answers: ["21.6", "21.60"] },
      { label: "Disponibilidad combinada de la capa web y la base de datos en serie (%)", answers: ["99.85", "99.85%"] },
      { label: "Disponibilidad de las dos instancias batch en paralelo (%)", answers: ["99.99", "99.99%"] }
    ],
    explain: "El tiempo de inactividad permitido es el 0.05% de 43,200 minutos = 21.6 minutos. Los componentes en serie se multiplican: 0.999 x 0.9995 = 0.9985, o 99.85%, que es menor que cualquiera de las partes y está por debajo del SLA de 99.95%. Los componentes redundantes en paralelo solo fallan si fallan ambos: 1 - (0.01 x 0.01) = 0.9999, o 99.99%. La redundancia aumenta la disponibilidad; las cadenas de dependencias la reducen." },

  { id: "incremental-restore-order", d: 3, type: "order", title: "Restaura a partir de una cadena de backups incrementales",
    prompt: "Un servidor de archivos se respalda con un backup completo el domingo por la noche y backups incrementales las demás noches. Falla el jueves por la mañana. Pon los pasos de restauración en el orden correcto.",
    context: "Backup job history\n  Sun 23:00  FULL         success\n  Mon 23:00  INCREMENTAL  success\n  Tue 23:00  INCREMENTAL  success\n  Wed 23:00  INCREMENTAL  success\n  Thu 06:10  server failure",
    steps: [
      "Restaurar el backup completo del domingo en el servidor de reemplazo",
      "Aplicar el backup incremental del lunes",
      "Aplicar el backup incremental del martes",
      "Aplicar el backup incremental del miércoles",
      "Verificar la cantidad de archivos y el acceso de las aplicaciones antes de devolver el servidor a los usuarios"
    ],
    explain: "Cada incremental contiene solo los cambios desde el backup anterior de cualquier tipo, así que una restauración necesita el último backup completo más cada incremental posterior, aplicados en orden. Si omites o pierdes un incremental, la cadena se rompe. Con backups diferenciales restaurarías solo el backup completo y el diferencial del miércoles. Siempre verifica los datos restaurados antes de dar por terminada la recuperación." },

  { id: "leaked-key-audit", d: 4, type: "select", title: "Detecta el uso indebido de una access key filtrada",
    prompt: "La access key de la identidad ci-deployer apareció en un repositorio de código público. El sistema de CI siempre se conecta desde 198.51.100.20. Selecciona cada entrada del registro de auditoría que indique que otra persona está usando la clave indebidamente.",
    context: "time (UTC)            identity     source_ip       action              details                         result\n2026-09-20T02:14:05Z  ci-deployer  203.0.113.66    ListBuckets         -                               Success\n2026-09-20T02:14:40Z  ci-deployer  203.0.113.66    CreateUser          userName=support-backup         Success\n2026-09-20T02:15:02Z  ci-deployer  203.0.113.66    AttachUserPolicy    user=support-backup policy=Admin Success\n2026-09-20T02:15:30Z  ci-deployer  203.0.113.66    StopLogging         trail=org-audit                 Success\n2026-09-20T02:16:10Z  ci-deployer  203.0.113.66    RunInstances        type=gpu-large count=20         Success\n2026-09-20T07:55:00Z  alice        198.51.100.20   ConsoleLogin        mfa=true                        Success\n2026-09-20T08:02:11Z  ci-deployer  198.51.100.20   UpdateService       service=web-frontend            Success\n2026-09-20T09:10:44Z  ci-deployer  198.51.100.20   DescribeInstances   -                               Success",
    options: [
      "02:14:05 ci-deployer ListBuckets desde 203.0.113.66",
      "02:14:40 ci-deployer CreateUser support-backup desde 203.0.113.66",
      "02:15:02 ci-deployer AttachUserPolicy Admin desde 203.0.113.66",
      "02:15:30 ci-deployer StopLogging org-audit desde 203.0.113.66",
      "02:16:10 ci-deployer RunInstances 20 x gpu-large desde 203.0.113.66",
      "07:55:00 alice ConsoleLogin con MFA desde 198.51.100.20",
      "08:02:11 ci-deployer UpdateService desde 198.51.100.20",
      "09:10:44 ci-deployer DescribeInstances desde 198.51.100.20"
    ],
    answers: [0, 1, 2, 3, 4],
    explain: "Cada llamada desde 203.0.113.66 usa la identidad de CI desde una dirección que el sistema de CI nunca usa, a las 2 a.m. La secuencia es típica de una clave robada: reconocimiento (ListBuckets), persistencia (un usuario nuevo con permisos de administrador), evasión de defensas (detener el registro de auditoría) y abuso (lanzar instancias con GPU, a menudo para cryptomining). Las entradas desde 198.51.100.20 coinciden con el comportamiento normal del CI y del personal. Respuesta: deshabilita la clave, elimina el usuario nuevo, vuelve a habilitar el registro, termina las instancias y migra el CI a workload identity federation." },

  { id: "net-control-match", d: 4, type: "match", title: "Elige el control de seguridad adecuado",
    prompt: "Relaciona cada requisito de seguridad con el control que mejor lo cumple.",
    pairs: [
      ["Bloquear SQL injection y cross-site scripting en las solicitudes HTTPS a la aplicación web", "Web application firewall (WAF)"],
      ["Permitir que la base de datos acepte el puerto 5432 solo desde instancias de la capa de aplicación, con estado (stateful)", "Security group"],
      ["Denegar rápidamente un rango de direcciones hostil en el límite de la subred usando reglas ordenadas y sin estado (stateless)", "Network ACL"],
      ["Acceder al servicio de almacenamiento administrado mediante una IP privada para que el tráfico nunca cruce internet", "Private endpoint"],
      ["Controlar la rotación de la clave de cifrado y poder revocarla por cumplimiento normativo", "Customer-managed key en KMS"],
      ["Detectar archivos con números de tarjeta que se copian a un recurso compartido no aprobado", "Data loss prevention (DLP)"]
    ],
    extra: ["Internet gateway", "Tokenización"],
    explain: "Un WAF inspecciona el contenido HTTP en la capa 7, algo que los firewalls de red no pueden hacer. Los security groups son stateful, se asocian a instancias y pueden hacer referencia a otros security groups. Las network ACL son stateless, ordenadas y aplican a toda la subred, y pueden denegar explícitamente. Los private endpoints le dan a un servicio administrado una dirección privada en tu red. Las customer-managed keys te dan control sobre la rotación y la revocación. DLP inspecciona el contenido en busca de patrones sensibles. La tokenización protege los números de tarjeta almacenados, pero no detecta cuando se copian." },

  { id: "pipeline-policy-select", d: 5, type: "select", title: "Revisa un pipeline contra la política",
    prompt: "La política de la empresa exige: nada de claves de nube de larga duración guardadas en los pipelines, tags de versión inmutables para las imágenes de producción y una aprobación manual antes de desplegar en producción. Selecciona cada línea que viola la política.",
    context: "stages: [build, test, deploy-staging, deploy-prod]\n\nbuild:\n  script:\n    - docker build -t registry.example.com/orders:$CI_COMMIT_SHA .\n    - docker push registry.example.com/orders:$CI_COMMIT_SHA\n\ndeploy-staging:\n  environment: staging\n  auth: oidc-federation            # short-lived token exchanged per job\n  script:\n    - deploy --image registry.example.com/orders:$CI_COMMIT_SHA\n\ndeploy-prod:\n  environment: production\n  variables:\n    CLOUD_ACCESS_KEY_ID: EXAMPLEKEYID0000\n    CLOUD_SECRET_KEY: example-secret-value\n  when: on_success\n  script:\n    - deploy --image registry.example.com/orders:latest",
    options: [
      "docker build -t registry.example.com/orders:$CI_COMMIT_SHA .",
      "auth: oidc-federation (deploy-staging)",
      "Variables CLOUD_ACCESS_KEY_ID / CLOUD_SECRET_KEY en deploy-prod",
      "when: on_success (deploy-prod)",
      "deploy --image registry.example.com/orders:latest (deploy-prod)",
      "deploy --image registry.example.com/orders:$CI_COMMIT_SHA (deploy-staging)"
    ],
    answers: [2, 3, 4],
    explain: "La etapa de producción guarda una access key de larga duración en variables del pipeline en texto plano, donde puede filtrarse a través de los logs o del acceso al repositorio; usa workload identity federation, como ya lo hace el job de staging. when: on_success despliega automáticamente, lo cual es continuous deployment, pero la política exige una puerta de aprobación manual (continuous delivery). Desplegar :latest usa un tag mutable, así que producción podría no ejecutar la imagen que se probó; debería desplegar el mismo tag de commit SHA o el digest que pasó por staging." },

  { id: "private-subnet-nat", d: 6, type: "select", title: "Las instancias privadas no pueden descargar parches",
    prompt: "Las instancias de la subred privada no pueden llegar a internet para descargar parches. Las instancias de la subred pública funcionan con normalidad. Selecciona cada problema de configuración que explica la falla.",
    context: "VPC 10.0.0.0/16\n\nSubnets\n  public-a   10.0.1.0/24   route table: rt-public\n  private-a  10.0.2.0/24   route table: rt-private\n\nNAT gateway nat-01   subnet: private-a   state: available\n\nrt-public\n  10.0.0.0/16   local\n  0.0.0.0/0     igw-01\n\nrt-private\n  10.0.0.0/16   local\n\nSecurity group app-sg (private instances)\n  outbound: all traffic to 0.0.0.0/0\n\nNetwork ACL on private-a\n  inbound 100  TCP 1024-65535 from 0.0.0.0/0  ALLOW\n  outbound 100 all traffic to 0.0.0.0/0       ALLOW",
    options: [
      "El NAT gateway está desplegado en la subred privada en lugar de en una subred pública",
      "rt-private no tiene una ruta 0.0.0.0/0 que apunte a un NAT gateway",
      "rt-public envía 0.0.0.0/0 al internet gateway",
      "El security group permite todo el tráfico saliente",
      "La network ACL permite los puertos efímeros entrantes 1024-65535",
      "Las instancias privadas no tienen direcciones IP públicas"
    ],
    answers: [0, 1],
    explain: "Un NAT gateway debe estar en una subred pública cuya tabla de rutas envíe 0.0.0.0/0 al internet gateway, y la tabla de rutas de la subred privada debe enviar 0.0.0.0/0 al NAT gateway. Aquí ambas cosas están mal. Los demás elementos son correctos: la ruta pública hacia el IGW es lo esperado, el security group y la NACL permiten el tráfico saliente y su retorno por puertos efímeros, y se supone que las instancias privadas no tienen IP públicas porque usan NAT para el acceso saliente." },

  { id: "deploy-error-match", d: 6, type: "match", title: "Diagnostica errores de despliegue y de API",
    prompt: "Relaciona cada error visto durante un despliegue con su causa más probable.",
    pairs: [
      ["LimitExceeded: requested vCPUs exceed the account limit for this region", "Se alcanzó la service quota"],
      ["InsufficientCapacity: not enough capacity for the requested instance type in this zone", "Falta de capacidad del proveedor"],
      ["HTTP 429 Too Many Requests de la API del proveedor durante un script masivo", "Rate limiting de la API"],
      ["AccessDenied: explicit deny in an organization policy for region eu-south", "Guardrail de la organización"],
      ["ExpiredToken: the security token included in the request is expired", "Credenciales vencidas"],
      ["ImagePullBackOff: manifest for orders:2.7.1 not found", "Tag de imagen incorrecto o inexistente"]
    ],
    extra: ["Un security group bloquea el puerto 443", "Error de sintaxis en la plantilla"],
    explain: "Los errores de cuota son límites de la cuenta que a menudo puedes aumentar con una solicitud, mientras que los errores de capacidad significan que el proveedor no tiene hardware libre de ese tipo en esa zona, así que prueba otra zona u otro tipo. 429 significa throttling: reintenta con exponential backoff. Un deny explícito en una política de la organización anula cualquier allow que tenga el usuario. ExpiredToken apunta a credenciales de sesión que hay que renovar. ImagePullBackOff con manifest not found significa que el tag no existe en el registry." }
]);
