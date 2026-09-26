/* Spanish text for the AWS Cloud Practitioner hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/aws-cloud-practitioner.js. */
CertHub.addHandsonEs("aws-cloud-practitioner", {
  "ccp-whoami": {
    title: "Verifica con qué identidad y en qué Region trabaja la CLI",
    prompt: "Antes de cambiar cualquier cosa en una cuenta de AWS, confirma con qué identidad se ejecutan tus comandos y a qué Region van.\n\nEjecuta `aws sts get-caller-identity` para ver el ID de la cuenta y el ARN de la identidad, y luego ejecuta `aws configure list` para ver la Region y de dónde vienen las credenciales.",
    hint: "Ninguno de los dos comandos necesita opciones adicionales. Busca el campo Account en el primero y la fila region en el segundo.",
    explain: "La AWS CLI es una de las formas de usar AWS, junto con la Management Console, los SDK y la infraestructura como código. Cada llamada de la CLI se firma con credenciales y se envía a una sola Region, así que verificar primero la identidad y la Region evita el error clásico de cambiar la cuenta equivocada o crear recursos en una Region inesperada, donde es fácil olvidarlos y se siguen cobrando.",
    labels: ["Verificaste la identidad que hace las llamadas", "Revisaste la configuración de la CLI"]
  },
  "ccp-first-bucket": {
    title: "Crea un bucket de S3 y sube un archivo",
    prompt: "Una pequeña cafetería quiere guardar la página de su menú en Amazon S3.\n\nCrea un bucket llamado `cafe-menu-site-2026` y luego sube a él el archivo local `index.html`. Ejecuta `ls` para ver los archivos locales y `aws s3 ls s3://cafe-menu-site-2026` para confirmar la carga.",
    hint: "aws s3 mb crea un bucket a partir de una dirección s3://; aws s3 cp copia un archivo local a un destino s3://.",
    explain: "Amazon S3 es almacenamiento de objetos: guardas objetos (archivos más metadatos) en buckets. Los nombres de bucket son globales en todas las cuentas de AWS, por eso nombres cortos como test casi siempre están ocupados, pero cada bucket vive en una sola Region. S3 está diseñado para una durabilidad del 99.999999999 por ciento porque almacena los datos en varias Availability Zones, y solo pagas por el almacenamiento y las solicitudes que usas.",
    labels: ["El bucket cafe-menu-site-2026 existe", "index.html está guardado en el bucket"]
  },
  "ccp-launch-instance": {
    title: "Lanza un servidor en minutos, no en semanas",
    prompt: "Marketing necesita un servidor web para una promoción de dos semanas. En lugar de comprar hardware, lanza uno bajo demanda.\n\nLanza una instancia `t3.micro` a partir de la imagen `ami-0abcdef1234567890` con dos tags: `Name=promo-web` y `Project=spring-promo`. Luego confirma que está en ejecución con `aws ec2 describe-instances`.",
    hint: "Usa aws ec2 run-instances con --image-id, --instance-type y --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=promo-web},{Key=Project,Value=spring-promo}]'.",
    explain: "Este es el beneficio de agilidad y elasticidad de la nube: la capacidad llega en minutos y dejas de pagar cuando la detienes o la terminas, cambiando gastos fijos por gastos variables y sin tener que adivinar la capacidad. Los tags como Project se pueden activar como cost allocation tags para que el costo de la promoción aparezca por separado en Cost Explorer.",
    labels: ["Hay una t3.micro llamada promo-web en ejecución", "La instancia tiene el tag Project=spring-promo"]
  },
  "ccp-stop-idle": {
    title: "Detén una instancia inactiva para reducir la factura",
    prompt: "Cost Explorer muestra un servidor de desarrollo que estuvo en ejecución todo el fin de semana sin que nadie lo usara.\n\nEncuentra la instancia con el tag `Name=dev-sandbox` y detenla. La instancia de producción `prod-web` debe seguir en ejecución.",
    hint: "Filtra describe-instances con Name=tag:Name,Values=dev-sandbox para obtener su ID de instancia y luego pasa ese ID a aws ec2 stop-instances --instance-ids.",
    explain: "Con los precios On-Demand pagas por el cómputo solo mientras la instancia está en ejecución, así que detener los servidores de desarrollo inactivos es uno de los ahorros más sencillos. Una instancia detenida sigue pagando su almacenamiento EBS, pero no el cómputo. Para cargas de producción constantes, los Savings Plans o las Reserved Instances bajan la tarifa, y AWS Trusted Advisor y Compute Optimizer señalan las instancias inactivas o sobredimensionadas.",
    labels: ["dev-sandbox está detenida", "prod-web sigue en ejecución"]
  },
  "ccp-block-public": {
    title: "Activa S3 Block Public Access en un bucket antiguo",
    prompt: "El bucket `team-shared-docs` se creó hace años, antes de que S3 bloqueara el acceso público de forma predeterminada, y no tiene ninguna configuración de Block Public Access.\n\nActiva las cuatro opciones de Block Public Access para el bucket y luego léelas de nuevo con `get-public-access-block` para confirmarlo.",
    hint: "aws s3api put-public-access-block --bucket team-shared-docs --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true",
    explain: "Según el modelo de responsabilidad compartida, AWS protege el servicio S3 en sí, pero configurar quién puede leer tus datos es tarea del cliente. Block Public Access anula cualquier ACL o bucket policy que haría públicos los objetos, y por eso AWS ahora lo activa en los buckets nuevos. Es posible que en los buckets antiguos todavía haya que activarlo, y Trusted Advisor y Security Hub señalan los buckets públicos.",
    labels: ["Las cuatro opciones de Block Public Access están activas", "Volviste a leer la configuración para confirmarla"]
  },
  "ccp-iam-group": {
    title: "Da a un auditor acceso con privilegio mínimo mediante un grupo",
    prompt: "Una auditora externa, Maya, necesita revisar la configuración de seguridad, pero no debe cambiar nada.\n\nCrea un grupo de IAM `auditors`, adjúntale la política administrada por AWS `SecurityAudit`, crea el usuario `maya` y agrégala al grupo. No adjuntes políticas directamente a su usuario.",
    hint: "create-group, luego attach-group-policy con --policy-arn arn:aws:iam::aws:policy/SecurityAudit, y después create-user y add-user-to-group.",
    explain: "El privilegio mínimo significa otorgar solo los permisos que un trabajo necesita. Adjuntar políticas a grupos en lugar de a usuarios individuales mantiene los permisos consistentes y fáciles de revisar: cuando alguien cambia de rol, lo mueves de un grupo a otro. SecurityAudit es una política administrada por AWS de solo lectura para revisar la configuración. Para los usuarios de la organización a gran escala, el enfoque recomendado es IAM Identity Center con permission sets.",
    labels: ["El grupo auditors tiene SecurityAudit adjunta", "maya existe y está en el grupo auditors"]
  },
  "ccp-cloudtrail": {
    title: "Registra la actividad de la cuenta con CloudTrail",
    prompt: "Tu empresa necesita un registro de quién hizo qué en la cuenta, en todas las Regions.\n\nCrea un trail multi-Region llamado `org-activity` que entregue los registros al bucket existente `audit-logs-111122223333`, luego inicia el registro y revisa el estado del trail.",
    hint: "aws cloudtrail create-trail --name org-activity --s3-bucket-name audit-logs-111122223333 --is-multi-region-trail, y luego aws cloudtrail start-logging --name org-activity.",
    explain: "AWS CloudTrail registra las llamadas a la API (quién, qué, cuándo y desde dónde) para auditorías, investigaciones de seguridad y cumplimiento. El Event history conserva gratis 90 días de eventos de administración, pero necesitas un trail para guardar los registros por más tiempo en S3. Un trail multi-Region también captura la actividad en las Regions que normalmente no usas, que es donde a menudo aparece el uso indebido. Un trail nuevo no registra nada hasta que se inicia el registro.",
    labels: ["El trail org-activity cubre todas las Regions", "El trail está registrando"]
  },
  "ccp-billing-alarm": {
    title: "Recibe un aviso antes de que la factura te sorprenda",
    prompt: "Estás en la Free Tier y quieres un aviso si los cargos estimados superan los 50 dólares estadounidenses. Las alertas de facturación ya están habilitadas en la cuenta.\n\nCrea una alarma de CloudWatch llamada `billing-over-50` sobre la métrica `EstimatedCharges` en el namespace `AWS/Billing`, con la dimensión `Currency=USD`, la estadística `Maximum`, el período `21600`, el umbral `50`, la comparación `GreaterThanThreshold` y `1` período de evaluación.",
    hint: "aws cloudwatch put-metric-alarm necesita --alarm-name, --metric-name, --namespace, --statistic, --period, --threshold, --comparison-operator, --evaluation-periods y --dimensions Name=Currency,Value=USD.",
    explain: "Las métricas de facturación se publican solo en us-east-1, aproximadamente cada seis horas, y por eso el período es de 21600 segundos. Una alarma de facturación (normalmente conectada a un topic de SNS para recibir un email) es una protección sencilla contra cargos inesperados. AWS Budgets puede hacer lo mismo con pronósticos y más opciones, y Cost Explorer te ayuda a ver qué servicio causó un aumento repentino.",
    labels: ["La alarma billing-over-50 vigila EstimatedCharges", "El umbral de la alarma es 50"]
  }
});
