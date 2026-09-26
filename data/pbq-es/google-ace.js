/* Spanish translation of the Google Cloud Associate Cloud Engineer exam simulations. Same ids and structure as data/pbq/google-ace.js. */
CertHub.addPbqs("google-ace", [
  { id: "gcloud-config-match", d: 1, type: "match", title: "Relaciona tareas de configuración de gcloud con comandos",
    prompt: "Estás configurando la Google Cloud CLI en una laptop nueva para dos proyectos. Relaciona cada tarea con el comando que la realiza.",
    pairs: [
      ["Autorizar una cuenta y crear una configuración de forma interactiva", "gcloud init"],
      ["Establecer la zona predeterminada en la configuración activa", "gcloud config set compute/zone us-central1-a"],
      ["Crear una nueva configuración con nombre llamada prod", "gcloud config configurations create prod"],
      ["Volver a la configuración dev", "gcloud config configurations activate dev"],
      ["Habilitar la API de Compute Engine en el proyecto actual", "gcloud services enable compute.googleapis.com"]
    ],
    extra: ["gcloud compute zones set us-central1-a", "gcloud auth application-default revoke"],
    explain: "gcloud init te guía por la autorización y una primera configuración. Propiedades como compute/zone se establecen con gcloud config set SECTION/PROPERTY. Las configuraciones con nombre se crean con configurations create (que además activa la nueva) y se cambian con configurations activate. Las APIs se habilitan por proyecto con gcloud services enable. No existe el comando gcloud compute zones set, y application-default revoke elimina las credenciales que usan las bibliotecas cliente, lo cual no tiene relación con estas tareas." },

  { id: "new-project-order", d: 1, type: "order", title: "Prepara un proyecto nuevo para una carga de trabajo en VM",
    prompt: "Un equipo necesita un proyecto nuevo en la carpeta Retail y una VM dentro de él. Pon estos pasos en el orden en que deben ocurrir.",
    steps: [
      "Crear el proyecto en la carpeta Retail con gcloud projects create --folder",
      "Vincular el proyecto a la cuenta de facturación de la empresa con gcloud billing projects link",
      "Habilitar la API de Compute Engine con gcloud services enable compute.googleapis.com",
      "Crear la VM con gcloud compute instances create"
    ],
    explain: "El proyecto tiene que existir antes de poder asociarle cualquier cosa. Compute Engine es un servicio de pago, así que el proyecto necesita una cuenta de facturación activa antes de que su API pueda habilitarse y usarse. Solo después de habilitar la API puedes crear instancias; si lo intentas antes, falla con un error que indica que la API está deshabilitada o que se requiere facturación." },

  { id: "data-product-match", d: 2, type: "match", title: "Elige el producto de datos para cada carga de trabajo",
    prompt: "Relaciona cada carga de trabajo con el producto de Google Cloud que mejor se adapta a ella.",
    pairs: [
      ["Tienda web regional que necesita una base de datos PostgreSQL administrada", "Cloud SQL"],
      ["Libro de inventario global que necesita transacciones relacionales fuertemente consistentes entre regiones", "Spanner"],
      ["Millones de lecturas de sensores IoT por segundo, consultadas por ID de dispositivo y tiempo", "Bigtable"],
      ["Analistas que ejecutan SQL sobre años de historial de ventas a escala de petabytes", "BigQuery"],
      ["App móvil que guarda perfiles de usuario como documentos tipo JSON con sincronización en tiempo real", "Firestore"],
      ["Archivo de cumplimiento con PDF escaneados que se leen menos de una vez al año", "Clase Archive de Cloud Storage"]
    ],
    extra: ["Memorystore", "Filestore"],
    explain: "Cloud SQL es MySQL, PostgreSQL o SQL Server administrado para aplicaciones transaccionales regionales. Spanner es la opción relacional cuando necesitas escalado horizontal y consistencia fuerte entre regiones. Bigtable maneja cargas masivas de baja latencia basadas en claves, como las series temporales. BigQuery es el data warehouse analítico serverless. Firestore es una base de datos de documentos creada para apps web y móviles con listeners en tiempo real. Archive es la clase de Cloud Storage más barata para datos que se leen menos de una vez al año. Memorystore es una caché y Filestore es NFS administrado, así que ninguno cubre estas necesidades." },

  { id: "subnet-fill", d: 2, type: "fill", title: "Planifica direcciones en una subred de modo personalizado",
    prompt: "Creas una subred en una VPC de modo personalizado (custom mode) con el rango primario 10.20.0.0/22. Recuerda que Google Cloud reserva cuatro direcciones en cada rango primario. Completa:",
    context: "gcloud compute networks subnets create app-subnet \\\n  --network=prod-vpc --region=us-east1 --range=10.20.0.0/22",
    fields: [
      { label: "Total de direcciones en el rango", answers: ["1024"] },
      { label: "Direcciones que puedes asignar a VMs", answers: ["1020"] },
      { label: "Dirección del gateway predeterminado", answers: ["10.20.0.1"] },
      { label: "Primera dirección que puede recibir una VM", answers: ["10.20.0.2"] },
      { label: "Última dirección que puede recibir una VM", answers: ["10.20.3.253"] }
    ],
    explain: "Una /22 tiene 2^10 = 1024 direcciones, de 10.20.0.0 a 10.20.3.255. Google Cloud reserva la dirección de red (10.20.0.0), el gateway predeterminado (10.20.0.1), la penúltima dirección (10.20.3.254) y la dirección de broadcast (10.20.3.255), lo que deja 1020 direcciones utilizables, de 10.20.0.2 a 10.20.3.253. Muchos estudiantes restan solo dos, como en las redes tradicionales, y obtienen 1022." },

  { id: "firewall-select", d: 2, type: "select", title: "¿Qué reglas de firewall se aplican a una VM web?",
    prompt: "La VM web-1 está en la red prod-vpc y solo tiene la etiqueta de red web. Se ejecuta con la cuenta de servicio web-sa. Selecciona cada regla que se aplica al tráfico entrante (ingress) que llega a web-1.",
    context: "NAME              NETWORK   DIRECTION  PRIORITY  ALLOW/DENY    SOURCE/DEST RANGES              TARGETS\nallow-web         prod-vpc  INGRESS    1000      ALLOW tcp:80,tcp:443  src 0.0.0.0/0             tag: web\nallow-iap-ssh     prod-vpc  INGRESS    1000      ALLOW tcp:22          src 35.235.240.0/20       all instances\nallow-db          prod-vpc  INGRESS    1000      ALLOW tcp:5432        src 10.20.0.0/22          tag: db\ndeny-smtp-out     prod-vpc  EGRESS     900       DENY tcp:25           dst 0.0.0.0/0             all instances\nallow-lb-health   prod-vpc  INGRESS    1000      ALLOW tcp:80          src 35.191.0.0/16,130.211.0.0/22  tag: web\nallow-batch       prod-vpc  INGRESS    1000      ALLOW tcp:9000        src 10.20.0.0/22          sa: batch-sa",
    options: ["allow-web", "allow-iap-ssh", "allow-db", "deny-smtp-out", "allow-lb-health", "allow-batch"],
    answers: [0, 1, 4],
    explain: "Una regla se aplica a una VM cuando su dirección coincide y su destino (target) cubre la VM: todas las instancias, una etiqueta de red que la VM tiene o la cuenta de servicio con la que se ejecuta. allow-web y allow-lb-health apuntan a la etiqueta web, y allow-iap-ssh apunta a todas las instancias, así que las tres rigen el tráfico entrante a web-1. allow-db apunta a la etiqueta db y allow-batch apunta a la cuenta de servicio batch-sa, que web-1 no usa. deny-smtp-out se aplica a web-1, pero es una regla de egress, así que no afecta el tráfico entrante." },

  { id: "cloud-run-canary", d: 3, type: "order", title: "Lanza una revisión de Cloud Run como canary",
    prompt: "Necesitas lanzar la versión 2.0 del servicio shop de Cloud Run con el mínimo riesgo. Pon los pasos en el orden correcto.",
    steps: [
      "Desplegar la imagen 2.0 con gcloud run deploy --no-traffic --tag=green",
      "Probar la nueva revisión a través de su URL con la etiqueta green",
      "Enviar el 10% del tráfico a la nueva revisión con gcloud run services update-traffic",
      "Vigilar las tasas de error y la latencia de la nueva revisión en Cloud Monitoring",
      "Mover el 100% del tráfico a la revisión más reciente con update-traffic --to-latest"
    ],
    explain: "Desplegar con --no-traffic crea la revisión sin enviarle usuarios, y la etiqueta le da su propia URL para hacer pruebas. Cuando pasa las pruebas, una pequeña división del tráfico expone gradualmente a usuarios reales mientras observas las métricas. Solo cuando el canary está sano cambias todo el tráfico. Si en algún momento las métricas se ven mal, haces rollback enviando el tráfico a la revisión anterior, sin reconstruir nada." },

  { id: "audit-log-select", d: 3, type: "select", title: "Descubre quién eliminó recursos",
    prompt: "Una revisión de incidentes pregunta qué recursos fueron eliminados por personas y no por automatización. Selecciona cada entrada del audit log que muestre a un usuario humano eliminando un recurso.",
    context: "timestamp             principalEmail                                        methodName                                   resource\n2026-09-20T08:02:11Z  alice@example.com                                     v1.compute.instances.delete                  instances/web-3\n2026-09-20T08:05:40Z  123456789012@cloudservices.gserviceaccount.com        v1.compute.instances.delete                  instances/web-mig-x7k2\n2026-09-20T09:14:03Z  bob@example.com                                       v1.compute.instances.insert                  instances/web-4\n2026-09-20T09:30:27Z  carol@example.com                                     storage.buckets.delete                       buckets/tmp-exports-2026\n2026-09-20T10:01:55Z  deploy-sa@shop-prod.iam.gserviceaccount.com           google.cloud.run.v1.Services.DeleteService   services/old-api\n2026-09-20T11:45:19Z  dave@example.com                                      SetIamPolicy                                 projects/shop-prod",
    options: [
      "08:02:11 alice@example.com elimina instances/web-3",
      "08:05:40 la cuenta de servicio cloudservices elimina instances/web-mig-x7k2",
      "09:14:03 bob@example.com inserta instances/web-4",
      "09:30:27 carol@example.com elimina buckets/tmp-exports-2026",
      "10:01:55 deploy-sa elimina services/old-api",
      "11:45:19 dave@example.com llama a SetIamPolicy sobre el proyecto"
    ],
    answers: [0, 3],
    explain: "Los Admin Activity audit logs registran el principal y el método de cada cambio de configuración. El instances.delete de Alice y el buckets.delete de Carol son eliminaciones hechas por cuentas de usuario. La cuenta cloudservices es el agente de servicio de las APIs de Google, que usa un grupo de instancias administrado cuando elimina VMs, y deploy-sa es una cuenta de servicio que usa la automatización. Bob creó una VM y Dave cambió la política de IAM; son cambios, pero no eliminaciones." },

  { id: "ops-tools-match", d: 3, type: "match", title: "Elige la herramienta de operaciones para cada pregunta",
    prompt: "Relaciona cada necesidad operativa con la función de Google Cloud Observability que la cubre.",
    pairs: [
      ["Enviar un correo al equipo cuando el uso promedio de CPU se mantenga por encima del 80% durante 5 minutos", "Alerting policy (política de alertas)"],
      ["Comprobar que la página de inicio pública responde desde varios continentes", "Uptime check"],
      ["Graficar cuántas veces aparece 'payment declined' en los logs", "Métrica basada en logs (log-based metric)"],
      ["Copiar los audit logs de todos los proyectos a un solo dataset de BigQuery", "Sink de logs agregado (aggregated sink)"],
      ["Agrupar las nuevas excepciones de un servicio de Cloud Run y notificar sobre ellas", "Error Reporting"],
      ["Averiguar qué microservicio agrega más latencia a una solicitud", "Cloud Trace"],
      ["Recopilar el uso de memoria y disco desde dentro de las VMs", "Ops Agent"]
    ],
    extra: ["Cloud Profiler", "VPC Flow Logs"],
    explain: "Las alerting policies convierten condiciones de métricas en notificaciones, mientras que los uptime checks sondean endpoints desde ubicaciones globales. Las métricas basadas en logs convierten las entradas de log que coinciden en métricas que se pueden graficar, y un sink agregado a nivel de organización o carpeta enruta los logs de todos los proyectos hijos. Error Reporting agrupa excepciones, Cloud Trace desglosa la latencia de una solicitud en spans y el Ops Agent recopila métricas del sistema operativo invitado que no están disponibles de forma predeterminada. Cloud Profiler muestra el uso de CPU y memoria por función, y VPC Flow Logs registra los flujos de red, así que ninguno cubre estas necesidades." },

  { id: "iam-roles-match", d: 4, type: "match", title: "Otorga el rol de mínimo privilegio",
    prompt: "Relaciona cada requisito con el rol predefinido que lo cumple con el mínimo privilegio.",
    pairs: [
      ["Permitir que un desarrollador asocie app-sa a las VMs que crea", "Service Account User"],
      ["Permitir que un administrador ejecute gcloud como deploy-sa sin crear una clave", "Service Account Token Creator"],
      ["Permitir que un servicio de Cloud Run lea una contraseña de base de datos desde Secret Manager", "Secret Manager Secret Accessor"],
      ["Permitir que un auditor liste recursos y vea políticas de IAM sin cambiar nada", "Security Reviewer"],
      ["Permitir que los operadores se conecten por SSH a VMs Linux con sudo mediante OS Login", "Compute OS Admin Login"],
      ["Permitir que los ingenieros abran túneles SSH hacia VMs privadas a través de IAP", "IAP-secured Tunnel User"]
    ],
    extra: ["Owner", "Service Account Key Admin"],
    explain: "Service Account User permite asociar (actuar como) una cuenta de servicio, mientras que Token Creator permite emitir tokens de corta duración para suplantarla (impersonation). Secret Accessor lee los valores de los secretos, idealmente otorgado sobre un solo secreto. Security Reviewer es de solo lectura para recursos y políticas de IAM. Compute OS Admin Login otorga acceso por OS Login con sudo, e IAP-secured Tunnel User permite el TCP forwarding de IAP. Owner es mucho más amplio de lo que necesita cualquiera de estos casos, y Service Account Key Admin administra claves, algo que quieres evitar." },

  { id: "iam-policy-fill", d: 4, type: "fill", title: "Lee la política de IAM de un proyecto",
    prompt: "Ejecutaste gcloud projects get-iam-policy shop-prod. Usa la salida para completar las respuestas (solo direcciones de correo, sin el prefijo del tipo de miembro).",
    context: "bindings:\n- members:\n  - group:data-team@example.com\n  - serviceAccount:etl-sa@shop-prod.iam.gserviceaccount.com\n  role: roles/bigquery.dataViewer\n- members:\n  - user:alice@example.com\n  role: roles/owner\n- members:\n  - group:ops@example.com\n  role: roles/compute.osAdminLogin\n- condition:\n    expression: request.time < timestamp(\"2026-12-31T00:00:00Z\")\n    title: audit-q4\n  members:\n  - user:auditor@example.net\n  role: roles/viewer\netag: BwYexample00=\nversion: 3",
    fields: [
      { label: "Principal que puede cambiar la política de IAM de este proyecto", answers: ["alice@example.com", "user:alice@example.com"] },
      { label: "Grupo que puede iniciar sesión en VMs Linux con sudo", answers: ["ops@example.com", "group:ops@example.com"] },
      { label: "Cuenta de servicio con acceso de lectura a los datos de BigQuery", answers: ["etl-sa@shop-prod.iam.gserviceaccount.com", "serviceAccount:etl-sa@shop-prod.iam.gserviceaccount.com"] },
      { label: "Año en que termina el acceso del auditor", answers: ["2026"] },
      { label: "Versión de la política", answers: ["3"] }
    ],
    explain: "De estos roles, solo Owner incluye el permiso para establecer políticas de IAM, así que alice@example.com puede cambiar la política. roles/compute.osAdminLogin le da al grupo ops acceso por OS Login con sudo. El binding de BigQuery Data Viewer incluye a etl-sa además del equipo de datos. El otorgamiento de Viewer del auditor tiene una IAM Condition que deja de aplicarse al final de 2026, y los bindings condicionales requieren la versión 3 de la política." }
]);
