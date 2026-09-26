/* Spanish translation of the AWS Certified Developer – Associate exam simulations. Same ids and structure as data/pbq/aws-developer.js. */
CertHub.addPbqs("aws-developer", [
  { id: "dynamodb-capacity-fill", d: 1, type: "fill", title: "Calcula la capacidad de lectura y escritura de DynamoDB",
    prompt: "Una tabla de DynamoDB en modo aprovisionado almacena los ítems de pedidos. Con la carga de trabajo de abajo, completa las unidades de capacidad que necesita la tabla (solo números enteros).",
    context: "Perfil de carga (estado estable)\n----------------------------------------------\nLecturas  : 100 llamadas GetItem/segundo, tamaño de ítem 6 KB\nEscrituras: 50 llamadas PutItem/segundo, tamaño de ítem 2.5 KB\n\nReglas de capacidad\n1 RCU = 1 lectura fuertemente consistente/s de hasta 4 KB\n        (o 2 lecturas eventualmente consistentes/s)\n1 WCU = 1 escritura estándar/s de hasta 1 KB\nLas lecturas y escrituras transaccionales cuestan el doble (2x)",
    fields: [
      { label: "RCU para las lecturas si son fuertemente consistentes", answers: ["200"] },
      { label: "RCU para las lecturas si son eventualmente consistentes", answers: ["100"] },
      { label: "WCU para las escrituras como llamadas PutItem estándar", answers: ["150"] },
      { label: "WCU para las escrituras si se hacen con TransactWriteItems", answers: ["300"] }
    ],
    explain: "El tamaño de los ítems siempre se redondea hacia arriba: una lectura de 6 KB necesita ceil(6/4) = 2 RCU si es fuertemente consistente, así que 100 lecturas/s son 200 RCU, y las lecturas eventualmente consistentes cuestan la mitad, lo que da 100 RCU. Una escritura de 2.5 KB se redondea a 3 KB, así que cuesta 3 WCU cada una y 150 WCU para 50 escrituras/s. Las transacciones duplican el costo, así que las mismas escrituras con TransactWriteItems necesitan 300 WCU." },

  { id: "sqs-settings-match", d: 1, type: "match", title: "Relaciona configuraciones de SQS con requisitos",
    prompt: "Un desarrollador está configurando las colas de un servicio de procesamiento de pedidos. Relaciona cada requisito con el atributo de SQS o el parámetro de mensaje que lo cumple.",
    pairs: [
      ["Ocultar un mensaje recibido a los demás consumidores mientras el worker lo procesa", "VisibilityTimeout"],
      ["Reducir las respuestas vacías y el costo dejando que ReceiveMessage espere hasta 20 segundos", "ReceiveMessageWaitTimeSeconds"],
      ["En una cola FIFO, mantener en secuencia los pedidos de cada cliente mientras los de distintos clientes se procesan en paralelo", "MessageGroupId"],
      ["En una cola FIFO, descartar un segundo envío del mismo pedido hecho dentro de 5 minutos", "MessageDeduplicationId"],
      ["Mover un mensaje a la dead-letter queue después de que haya fallado 5 veces", "maxReceiveCount (RedrivePolicy)"],
      ["Posponer 60 segundos la entrega de cada mensaje nuevo en la cola", "DelaySeconds"],
      ["Conservar los mensajes no procesados hasta 14 días", "MessageRetentionPeriod"]
    ],
    extra: ["MaximumBatchingWindowInSeconds", "KmsDataKeyReusePeriodSeconds"],
    explain: "El visibility timeout oculta un mensaje en proceso; si no se elimina antes de que expire, vuelve a ser visible. El long polling se configura con ReceiveMessageWaitTimeSeconds (1-20 s). En las colas FIFO, el message group ID define el alcance del orden y el deduplication ID suprime duplicados dentro de la ventana de 5 minutos. maxReceiveCount en la redrive policy envía los mensajes problemáticos (poison messages) a una DLQ, DelaySeconds crea una delay queue (hasta 15 minutos) y la retención va de 1 minuto a 14 días (4 días por defecto)." },

  { id: "lambda-code-review-select", d: 1, type: "select", title: "Revisa un handler de Lambda en busca de malas prácticas",
    prompt: "La tabla Orders tiene la partition key customerId. Revisa esta función Lambda en Python detrás de una integración proxy de API Gateway y selecciona todas las afirmaciones que describen algo que el desarrollador DEBERÍA cambiar.",
    context: " 1  import boto3, os, json\n 2  from boto3.dynamodb.conditions import Attr\n 3  AWS_SECRET = \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\"\n 4\n 5  def handler(event, context):\n 6      ddb = boto3.resource(\"dynamodb\",\n 7              aws_access_key_id=\"AKIAIOSFODNN7EXAMPLE\",\n 8              aws_secret_access_key=AWS_SECRET)\n 9      table = ddb.Table(os.environ[\"TABLE_NAME\"])\n10      cust = event[\"pathParameters\"][\"customerId\"]\n11      print(json.dumps(event))   # event includes the Authorization header\n12      resp = table.scan(FilterExpression=Attr(\"customerId\").eq(cust))\n13      return {\"statusCode\": 200,\n14              \"body\": json.dumps(resp[\"Items\"], default=str)}",
    options: [
      "Líneas 3 y 7-8: las access keys están escritas directamente en el código",
      "Líneas 6-9: el resource del SDK y la tabla se crean dentro del handler en cada invocación",
      "Línea 9: el nombre de la tabla se lee de una variable de entorno",
      "Línea 10: el ID del cliente se lee de event[\"pathParameters\"]",
      "Línea 11: el event completo, incluido el header Authorization, se escribe en CloudWatch Logs",
      "Línea 12: se usa un Scan con un filtro sobre la partition key para encontrar los pedidos de un cliente",
      "Líneas 13-14: la función devuelve un objeto con statusCode y un body de tipo string"
    ],
    answers: [0, 1, 4, 5],
    explain: "Las keys escritas en el código deben eliminarse para que el SDK use el execution role mediante la cadena de credenciales predeterminada. Los clientes del SDK deben ir fuera del handler para que las invocaciones en caliente (warm) los reutilicen junto con sus conexiones. Registrar el event sin procesar filtra los bearer tokens a los logs, y un Scan lee (y cobra) la tabla completa aunque tenga un filtro, mientras que un Query sobre la partition key lee solo los ítems de ese cliente. Usar variables de entorno para la configuración, leer pathParameters y devolver statusCode más un body de tipo string es correcto para una integración proxy." },

  { id: "s3-policy-eval-select", d: 2, type: "select", title: "Evalúa políticas de IAM y de bucket",
    prompt: "El execution role de una función Lambda (en la misma cuenta que el bucket) tiene la identity policy mostrada, y el bucket tiene la bucket policy mostrada. Selecciona todas las solicitudes que TIENEN ÉXITO.",
    context: "Identity policy (role app-role)\n{\n  \"Effect\": \"Allow\",\n  \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n  \"Resource\": \"arn:aws:s3:::reports-example/*\"\n},\n{\n  \"Effect\": \"Allow\",\n  \"Action\": [\"kms:GenerateDataKey\", \"kms:Decrypt\"],\n  \"Resource\": \"<ARN of the bucket's KMS key>\"\n}\n\nBucket policy (reports-example)\n{\n  \"Effect\": \"Deny\", \"Principal\": \"*\", \"Action\": \"s3:*\",\n  \"Resource\": \"arn:aws:s3:::reports-example/*\",\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n},\n{\n  \"Effect\": \"Deny\", \"Principal\": \"*\", \"Action\": \"s3:PutObject\",\n  \"Resource\": \"arn:aws:s3:::reports-example/*\",\n  \"Condition\": { \"StringNotEquals\": { \"s3:x-amz-server-side-encryption\": \"aws:kms\" } }\n}",
    options: [
      "GetObject reports-example/q1.csv por HTTPS",
      "GetObject reports-example/q1.csv por HTTP simple",
      "PutObject reports-example/q2.csv por HTTPS con el header x-amz-server-side-encryption: aws:kms",
      "PutObject reports-example/q2.csv por HTTPS sin header de cifrado",
      "PutObject reports-example/q2.csv por HTTPS con el header x-amz-server-side-encryption: AES256",
      "DeleteObject reports-example/q1.csv por HTTPS",
      "GetObject reports-archive-example/q1.csv por HTTPS"
    ],
    answers: [0, 2],
    explain: "Dentro de una misma cuenta basta con un Allow en la identity policy o en la bucket policy, pero cualquier Deny explícito prevalece. HTTP simple coincide con el deny de SecureTransport, y el deny con StringNotEquals atrapa las solicitudes PutObject cuyo header falta o no es aws:kms (una clave ausente hace verdadera una condición de string negada). DeleteObject y el otro bucket no están permitidos en ninguna parte, así que fallan por un deny implícito. Solo tienen éxito el GetObject por HTTPS y el PutObject por HTTPS con SSE-KMS." },

  { id: "api-auth-match", d: 2, type: "match", title: "Elige el mecanismo de autorización correcto",
    prompt: "Relaciona cada requisito de una aplicación serverless con el mecanismo de autorización de AWS que mejor encaja.",
    pairs: [
      ["Los usuarios de una app móvil (con sesión iniciada o invitados) necesitan credenciales temporales de AWS para llamar a S3 y DynamoDB directamente desde el dispositivo", "Cognito identity pool"],
      ["Los usuarios con sesión iniciada en una single-page app llaman a una REST API, y sus JWT deben validarse sin código personalizado", "Cognito user pool authorizer"],
      ["Una REST API debe comprobar un token de un header personalizado contra una base de datos de sesiones propia antes de permitir una llamada", "Lambda authorizer"],
      ["Un servicio backend en EC2 con un instance role llama a la API con solicitudes firmadas con SigV4", "Autorización IAM"],
      ["Cada cliente socio debe medirse y limitarse con su propia cuota de solicitudes", "API keys con usage plans"],
      ["Una REST API privada debe aceptar llamadas solo a través de un interface VPC endpoint específico", "Resource policy de API Gateway"]
    ],
    extra: ["Rotación de Secrets Manager", "Lambda function URL con AuthType NONE"],
    explain: "Los identity pools intercambian un inicio de sesión (o una identidad de invitado) por credenciales temporales de AWS, mientras que los user pools autentican usuarios y emiten JWT que valida un Cognito authorizer. Los Lambda authorizers ejecutan tu propio código para tokens o headers personalizados, y la autorización IAM verifica las firmas SigV4 de quienes llaman con credenciales de AWS. Las API keys no son un control de seguridad por sí mismas; identifican a los clientes para el throttling y las cuotas de los usage plans. Las resource policies restringen una API privada a VPC endpoints, cuentas o rangos de IP concretos." },

  { id: "kms-envelope-order", d: 2, type: "order", title: "Aplica envelope encryption con KMS",
    prompt: "Una aplicación debe cifrar archivos de 50 MB con una customer managed key de KMS. Ordena correctamente los pasos de envelope encryption y de descifrado.",
    steps: [
      "Llamar a kms:GenerateDataKey para la customer managed key y recibir una copia en texto plano y una copia cifrada de una data key",
      "Cifrar el archivo localmente (por ejemplo, con AES-256-GCM) usando la data key en texto plano",
      "Guardar la data key cifrada junto con el texto cifrado y borrar de la memoria la data key en texto plano",
      "Cuando se necesite el archivo, enviar la data key cifrada guardada a kms:Decrypt",
      "Descifrar el archivo localmente con la data key en texto plano que devolvió KMS"
    ],
    explain: "KMS Encrypt acepta como máximo 4 KB de datos, así que las cargas grandes usan envelope encryption: KMS genera una data key, la aplicación cifra los datos localmente y guarda solo la copia cifrada de esa key junto al texto cifrado. Para leer el archivo, KMS descifra la pequeña data key (comprobando la key policy y los permisos de IAM) y la aplicación descifra los datos localmente. La KMS key en sí nunca sale de KMS." },

  { id: "codedeploy-ec2-hooks-order", d: 3, type: "order", title: "Ordena los eventos del ciclo de vida de CodeDeploy en EC2",
    prompt: "Un appspec.yml para un despliegue in-place de CodeDeploy en EC2 define scripts para varios hooks. Ordena los eventos del ciclo de vida según el orden en que el agente de CodeDeploy los ejecuta en cada instancia.",
    steps: ["ApplicationStop", "DownloadBundle", "BeforeInstall", "Install", "AfterInstall", "ApplicationStart", "ValidateService"],
    explain: "El agente primero detiene la aplicación en ejecución (ApplicationStop usa los scripts de la revisión anterior) y luego descarga la nueva revisión. BeforeInstall sirve para copias de seguridad o descifrado, Install copia los archivos según la sección files, y AfterInstall se encarga de la configuración y los permisos. ApplicationStart inicia el servicio y ValidateService ejecuta las comprobaciones de estado; DownloadBundle e Install los ejecuta el agente y no admiten scripts." },

  { id: "beanstalk-policies-match", d: 3, type: "match", title: "Relaciona las políticas de despliegue de Elastic Beanstalk",
    prompt: "Relaciona cada descripción con la política o técnica de despliegue de Elastic Beanstalk que describe.",
    pairs: [
      ["La opción más rápida; la aplicación queda brevemente no disponible mientras todas las instancias se actualizan a la vez", "All at once"],
      ["Actualiza las instancias existentes por lotes, así que la capacidad de servicio baja durante el despliegue", "Rolling"],
      ["Lanza primero un lote adicional para mantener la capacidad completa mientras las instancias existentes se actualizan por lotes", "Rolling with additional batch"],
      ["Lanza un conjunto completo de instancias nuevas en un Auto Scaling group temporal; el rollback solo las termina", "Immutable"],
      ["Envía un porcentaje fijo del tráfico de clientes a instancias nuevas durante un período de evaluación antes de hacer el cambio", "Traffic splitting"],
      ["Despliega en un entorno clonado separado y luego intercambia los CNAME de los entornos", "Blue/green (Swap Environment URLs)"]
    ],
    extra: ["Canary10Percent5Minutes", "Linear10PercentEvery1Minute"],
    explain: "All at once es lo más rápido pero causa tiempo de inactividad, rolling evita la inactividad con capacidad reducida y rolling with additional batch mantiene la capacidad completa agregando instancias primero. Immutable y traffic splitting construyen instancias nuevas, lo que hace barato revertir un despliegue fallido; traffic splitting agrega un período de prueba al estilo canary. Blue/green no es una política integrada: creas un segundo entorno y usas Swap Environment URLs. Las opciones adicionales son configuraciones de desplazamiento de tráfico de CodeDeploy para Lambda, no políticas de Beanstalk." },

  { id: "lambda-timeout-logs-select", d: 4, type: "select", title: "Encuentra timeouts en los logs de Lambda",
    prompt: "Los usuarios reportan errores 504 intermitentes de API Gateway. El timeout de la función está configurado en 6 segundos. Selecciona todas las entradas de CloudWatch Logs que muestran una invocación que terminó porque se quedó sin tiempo.",
    context: "/aws/lambda/order-api  (extracto del log group)",
    options: [
      "START RequestId: 3f1c0a2e Version: $LATEST",
      "2026-09-20T10:14:07.112Z 3f1c0a2e Task timed out after 6.01 seconds",
      "REPORT RequestId: 9b72d1c4 Duration: 812.44 ms Billed Duration: 813 ms Memory Size: 512 MB Max Memory Used: 188 MB Init Duration: 402.11 ms",
      "REPORT RequestId: 3f1c0a2e Duration: 6000.00 ms Billed Duration: 6000 ms Memory Size: 512 MB Max Memory Used: 201 MB Status: timeout",
      "[ERROR] ClientError: An error occurred (AccessDeniedException) when calling the GetItem operation",
      "REPORT RequestId: 51e0b9aa Duration: 211.90 ms Billed Duration: 212 ms Memory Size: 512 MB Max Memory Used: 512 MB Status: error Error Type: Runtime.OutOfMemory",
      "[ERROR] ProvisionedThroughputExceededException: The level of configured provisioned throughput for the table was exceeded"
    ],
    answers: [1, 3],
    explain: "Un timeout aparece como una línea 'Task timed out after N seconds' y una línea REPORT cuya duración es igual al timeout configurado, con Status: timeout. La línea con Init Duration es solo un cold start, AccessDeniedException indica que falta un permiso en el execution role, Runtime.OutOfMemory significa que se agotó la memoria y ProvisionedThroughputExceededException es throttling de DynamoDB. Ten en cuenta que API Gateway también devuelve 504 cuando se alcanza su propio timeout de integración (29 segundos por defecto) antes de que termine la función." },

  { id: "lambda-concurrency-fill", d: 4, type: "fill", title: "Dimensiona la concurrencia de Lambda",
    prompt: "Una función detrás de API Gateway recibe un flujo constante de 200 solicitudes por segundo. Usando concurrencia = solicitudes por segundo x duración promedio en segundos, completa los valores.",
    context: "Límite de concurrencia de la cuenta (región): 1000\nDuración promedio actual                    : 0.5 s\nDuración promedio tras una dependencia lenta: 2 s\nReserved concurrency propuesta para la función: 250",
    fields: [
      { label: "Ejecuciones concurrentes necesarias con una duración de 0.5 s", answers: ["100"] },
      { label: "Ejecuciones concurrentes necesarias con una duración de 2 s", answers: ["400"] },
      { label: "Máximo de solicitudes por segundo atendidas sin throttling a 2 s con reserved concurrency de 250", answers: ["125"] },
      { label: "Código de estado HTTP que recibe quien llama de forma síncrona cuando la función sufre throttling", answers: ["429"] }
    ],
    explain: "La concurrencia es la tasa de llegada por la duración: 200 x 0.5 = 100, y 200 x 2 = 400 cuando la dependencia se vuelve lenta. La reserved concurrency es a la vez una garantía y un límite, así que 250 ejecuciones concurrentes de 2 s cada una solo pueden atender 250 / 2 = 125 solicitudes por segundo. Por encima de eso, Lambda aplica throttling a las llamadas síncronas con 429 TooManyRequestsException; corrige la latencia, aumenta la reserva o agrega caché." }
]);
