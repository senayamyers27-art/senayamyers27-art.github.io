/* Spanish text for the AWS Solutions Architect Associate hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/aws-saa.js. */
CertHub.addHandsonEs("aws-saa", {
  "saa-backup-bucket": {
    title: "Protege un bucket de backups contra borrados y exposición",
    prompt: "Las exportaciones nocturnas de la base de datos llegan al bucket `orders-backup-111122223333`. Hoy, una sobrescritura o un borrado destruiría la única copia, y el bucket no tiene ninguna configuración de Block Public Access.\n\nHabilita el versionado en el bucket y activa las cuatro opciones de Block Public Access.",
    hint: "put-bucket-versioning recibe --versioning-configuration Status=Enabled; put-public-access-block recibe BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true.",
    explain: "El versionado conserva todas las versiones de un objeto, así que una sobrescritura o un borrado se pueden recuperar: un borrado solo agrega un delete marker. También es un requisito previo para la replicación de S3 (incluida Cross-Region Replication para recuperación ante desastres) y para Object Lock. Combínalo con reglas de lifecycle que hagan expirar las versiones antiguas para que el costo de almacenamiento no crezca sin fin, y con Block Public Access para que los backups nunca queden expuestos por una política mal hecha.",
    labels: ["El versionado está habilitado", "Las cuatro opciones de Block Public Access están activas"]
  },
  "saa-ssh-restrict": {
    title: "Cierra el SSH hacia internet en un security group",
    prompt: "El security group `bastion-sg` (sg-0b1c2d3e4f5a60001) permite SSH en el puerto 22 desde `0.0.0.0/0`. Solo la red de la oficina `203.0.113.0/24` debería poder llegar a él.\n\nElimina la regla de SSH abierta y agrega una que permita TCP 22 únicamente desde `203.0.113.0/24`. Revisa el resultado con `describe-security-groups`.",
    hint: "revoke-security-group-ingress y authorize-security-group-ingress reciben --group-id, --protocol tcp, --port 22 y --cidr.",
    explain: "Los security groups son listas de permisos stateful asociadas a las interfaces de red: el tráfico de retorno se permite automáticamente y no existen reglas de denegación, así que la única forma de cerrar un acceso es eliminar la regla que lo permite. El SSH abierto a 0.0.0.0/0 es uno de los hallazgos más comunes en Trusted Advisor y Security Hub. Un diseño todavía mejor elimina por completo el SSH entrante y usa Systems Manager Session Manager.",
    labels: ["Ya no hay SSH desde 0.0.0.0/0", "Se permite SSH desde 203.0.113.0/24"]
  },
  "saa-compute-launch": {
    title: "Lanza un worker optimizado para cómputo en una subred privada",
    prompt: "Un trabajo por lotes que usa mucha CPU necesita su propio worker. Debe ejecutarse en la subred privada `subnet-0aa11bb22cc33dd44` de la VPC de la aplicación y usar el security group `app-sg` (sg-0a1a2a3a4a5a6a7a8).\n\nLanza una instancia `c6i.large` a partir de `ami-0abcdef1234567890` en esa subred con ese security group y con el tag `Name=batch-worker-1`. Usa `describe-subnets` y `describe-security-groups` si quieres verificar los IDs primero.",
    hint: "aws ec2 run-instances con --image-id, --instance-type c6i.large, --subnet-id, --security-group-ids y --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=batch-worker-1}]'.",
    explain: "Elegir la familia de instancia es una decisión de rendimiento: las instancias C están optimizadas para cómputo, las M son de uso general y las R están optimizadas para memoria. Ubicar los workers en una subred privada hace que no se pueda llegar a ellos desde internet (ellos salen a través de un NAT gateway o de VPC endpoints). Un security group debe pertenecer a la misma VPC que la subred, y por eso se rechazaría el grupo predeterminado de otra VPC.",
    labels: ["batch-worker-1 es una c6i.large en ejecución", "Se ejecuta en la subred privada", "Usa app-sg"]
  },
  "saa-cost-cleanup": {
    title: "Limpia los recursos olvidados",
    prompt: "Una revisión de costos encontró dos sobrantes: una instancia `m5.2xlarge` con el tag `Name=old-load-test` que sigue en ejecución un mes después de la prueba, y el log group `/app/debug`, que guarda cada línea de log para siempre.\n\nTermina la instancia de la prueba de carga y configura el log group para que guarde los logs durante 30 días. La instancia `api-prod` debe seguir en ejecución.",
    hint: "Encuentra el ID de la instancia de la prueba de carga con un filtro por tag y luego usa aws ec2 terminate-instances. Para los logs, aws logs put-retention-policy --retention-in-days 30.",
    explain: "El cómputo inactivo y la retención ilimitada de logs son dos de las fuentes de desperdicio más comunes. Terminar una instancia detiene los cargos de cómputo y, de forma predeterminada, elimina su volumen raíz, así que hazlo solo cuando no necesites nada de lo que contiene (si tienes dudas, toma primero un snapshot). CloudWatch Logs cobra por los datos almacenados, y los log groups nuevos nunca expiran a menos que configures un período de retención.",
    labels: ["old-load-test está terminada", "/app/debug guarda los logs durante 30 días", "api-prod sigue en ejecución"]
  },
  "saa-rds-multiaz": {
    title: "Haz que una base de datos sobreviva a la falla de una Availability Zone",
    prompt: "La base de datos de producción `orders-db` se ejecuta en una sola Availability Zone y solo tiene un día de backups automáticos.\n\nConviértela a Multi-AZ y aumenta la retención de backups a 7 días, aplicando el cambio ahora en lugar de en la próxima ventana de mantenimiento. Revisa el resultado con `describe-db-instances`.",
    hint: "aws rds modify-db-instance --db-instance-identifier orders-db --multi-az --backup-retention-period 7 --apply-immediately",
    explain: "RDS Multi-AZ mantiene un standby síncrono en otra Availability Zone y hace failover automáticamente, normalmente en uno a dos minutos, lo que protege la disponibilidad. No es una función para escalar lecturas; para eso están las read replicas. Los backups automáticos con un período de retención más largo protegen contra la pérdida de datos mediante la restauración a un punto en el tiempo. Sin --apply-immediately, cambios como Multi-AZ esperan a la próxima ventana de mantenimiento.",
    labels: ["orders-db es Multi-AZ", "Los backups se guardan durante al menos 7 días"]
  },
  "saa-cpu-alarm": {
    title: "Crea una alarma por CPU alta sostenida",
    prompt: "El servidor web `i-0d15ea5e00000c001` se vuelve lento cuando la CPU se mantiene alta. Quieres enterarte antes de que lo noten los usuarios.\n\nCrea una alarma de CloudWatch llamada `web-cpu-high` sobre `CPUUtilization` (namespace `AWS/EC2`) para esa instancia, usando la estadística `Average` en períodos de `300` segundos, que se active cuando esté `GreaterThanThreshold` `70` durante `2` períodos de evaluación.",
    hint: "Pasa --dimensions Name=InstanceId,Value=i-0d15ea5e00000c001 para que la alarma vigile esta instancia en particular.",
    explain: "Exigir dos períodos consecutivos de cinco minutos evita alarmas por picos breves. CloudWatch recopila gratis las métricas básicas de EC2 cada cinco minutos; el monitoreo detallado da datos cada minuto. Para una flota, la mejor respuesta suele ser un Auto Scaling group con una política de target tracking sobre la CPU promedio, que crea y administra las alarmas por ti y agrega capacidad automáticamente.",
    labels: ["web-cpu-high vigila CPUUtilization del servidor web", "Se activa por encima del 70 por ciento"]
  },
  "saa-ec2-role": {
    title: "Da a EC2 acceso de lectura a S3 con un rol, no con claves",
    prompt: "Una app de reportes en EC2 lee archivos de S3. Un desarrollador sugirió pegar una access key en su archivo de configuración. Usa un rol en su lugar.\n\nCrea un rol de IAM llamado `report-reader-role` que EC2 pueda asumir (principal de confianza `ec2.amazonaws.com`) y luego adjunta la política administrada por AWS `AmazonS3ReadOnlyAccess`. El archivo local `ec2-trust.json` ya contiene una trust policy adecuada (`cat ec2-trust.json`).",
    hint: "aws iam create-role --role-name report-reader-role --assume-role-policy-document file://ec2-trust.json, y luego aws iam attach-role-policy con --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess.",
    explain: "Un rol tiene una trust policy (quién puede asumirlo) y políticas de permisos (qué puede hacer). EC2 obtiene el rol mediante un instance profile, y el SDK toma automáticamente credenciales de corta duración del servicio de metadatos de la instancia, así que no hay claves de larga duración que se puedan filtrar o que haya que rotar. Para un privilegio mínimo más estricto, reemplaza la política administrada por una limitada al bucket específico.",
    labels: ["report-reader-role confía en el servicio EC2", "El rol tiene AmazonS3ReadOnlyAccess"]
  },
  "saa-sse-kms": {
    title: "Cifra un bucket con una customer managed key de KMS",
    prompt: "Cumplimiento exige que los datos financieros se cifren con una clave que tú controles, con rotación anual, y que puedas auditar cada uso de la clave.\n\n1. Crea una clave de KMS y asígnale el alias `alias/finance-data`.\n2. Habilita la rotación automática en la clave.\n3. Configura el cifrado predeterminado del bucket `finance-reports-111122223333` en SSE-KMS con ese alias y con S3 Bucket Keys habilitadas.",
    hint: "create-key muestra el KeyId que debes usar con create-alias --target-key-id y enable-key-rotation --key-id. Para el bucket: --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"aws:kms\",\"KMSMasterKeyID\":\"alias/finance-data\"},\"BucketKeyEnabled\":true}]}'",
    explain: "S3 cifra los objetos nuevos con SSE-S3 de forma predeterminada, pero SSE-KMS con una customer managed key te permite controlar la key policy, activar la rotación, deshabilitar la clave y ver cada uso en CloudTrail. Las S3 Bucket Keys reducen la cantidad de solicitudes a KMS, y con ello el costo de KMS, al usar una data key a nivel de bucket. Los alias facilitan hacer referencia a las claves sin tener que copiar sus IDs de un lado a otro.",
    labels: ["alias/finance-data apunta a una clave con la rotación activa", "El bucket usa SSE-KMS con esa clave"]
  }
});
