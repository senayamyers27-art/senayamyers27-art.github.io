/* Spanish text for the AWS Developer Associate hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/aws-developer.js. */
CertHub.addHandsonEs("aws-developer", {
  "dva-log-retention": {
    title: "Crea un log group de Lambda con un período de retención",
    prompt: "La función `orders-api` está a punto de salir a producción. Lambda crearía su log group en la primera ejecución, con los logs guardados para siempre.\n\nCrea tú mismo el log group `/aws/lambda/orders-api` y configura su retención en 14 días. Confírmalo con `describe-log-groups`.",
    hint: "aws logs create-log-group --log-group-name /aws/lambda/orders-api, y luego aws logs put-retention-policy con --retention-in-days 14.",
    explain: "Lambda escribe en el log group /aws/lambda/<function name>, y su execution role necesita logs:CreateLogStream y logs:PutLogEvents (AWSLambdaBasicExecutionRole). La retención solo acepta valores fijos como 1, 3, 5, 7, 14, 30 o 90 días. Configurarla desde el principio mantiene predecibles los costos de almacenamiento y deja suficiente historial para las consultas de Logs Insights durante la solución de problemas.",
    labels: ["El log group /aws/lambda/orders-api existe", "Guarda los logs durante 14 días"]
  },
  "dva-lambda-config": {
    title: "Ajusta el timeout, la memoria y la configuración de una función Lambda",
    prompt: "La función `image-resizer` agota el tiempo de espera con fotos grandes. Se ejecuta con los valores predeterminados: 3 segundos y 128 MB.\n\nConfigura su timeout en 30 segundos, su memoria en 1024 MB y agrega la variable de entorno `BUCKET_NAME=thumbs-111122223333` para que el nombre del bucket no quede fijo en el código. Revisa el resultado con `get-function-configuration`.",
    hint: "aws lambda update-function-configuration --function-name image-resizer --timeout 30 --memory-size 1024 --environment Variables={BUCKET_NAME=thumbs-111122223333}",
    explain: "Lambda asigna CPU en proporción a la memoria, así que aumentar la memoria suele acelerar el procesamiento de imágenes e incluso puede costar menos en total. El timeout puede llegar hasta 900 segundos (15 minutos). Las variables de entorno mantienen la configuración fuera del código; los secretos, en cambio, van en Secrets Manager o Parameter Store. Ten en cuenta que --environment reemplaza el conjunto completo de variables, así que incluye todas las que quieras conservar.",
    labels: ["El timeout es de 30 segundos y la memoria de 1024 MB", "BUCKET_NAME está configurada"]
  },
  "dva-exec-role": {
    title: "Crea un execution role de Lambda",
    prompt: "Una función nueva necesita un execution role que le permita escribir logs y nada más.\n\nCrea el rol `orders-api-exec` con una trust policy para el principal `lambda.amazonaws.com` y luego adjunta la política administrada por AWS `service-role/AWSLambdaBasicExecutionRole`.",
    hint: "Pasa la trust policy en línea: --assume-role-policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}'. El ARN de la política es arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole.",
    explain: "El execution role es la identidad con la que se ejecuta el código de la función: Lambda lo asume y entrega las credenciales temporales al SDK mediante variables de entorno, así que no hay claves guardadas en el código. La trust policy debe nombrar a lambda.amazonaws.com o la función no podrá asumirlo. AWSLambdaBasicExecutionRole otorga solo acceso a CloudWatch Logs; agrega permisos con un alcance limitado para cada otro servicio al que llame el código.",
    labels: ["orders-api-exec confía en el servicio Lambda", "Tiene AWSLambdaBasicExecutionRole"]
  },
  "dva-artifact-bucket": {
    title: "Prepara un bucket con versionado para los artefactos de despliegue",
    prompt: "Tu pipeline empaqueta la app como `app.zip` y necesita un lugar donde guardar cada build para poder hacer rollback.\n\nCrea el bucket `deploy-artifacts-111122223333`, habilita el versionado y luego sube `app.zip` a `releases/app.zip`.",
    hint: "aws s3 mb, luego aws s3api put-bucket-versioning --versioning-configuration Status=Enabled, y después aws s3 cp app.zip s3://deploy-artifacts-111122223333/releases/app.zip.",
    explain: "SAM y CloudFormation suben el código local a un bucket de artefactos en S3 antes de desplegar (sam deploy y cloudformation package lo hacen por ti). Con el versionado activo, cada carga de la misma key conserva el build anterior, así que un rollback puede apuntar a una versión anterior del objeto. CodePipeline también exige un bucket con versionado cuando S3 es la etapa de origen.",
    labels: ["El bucket tiene el versionado habilitado", "releases/app.zip está cargado"]
  },
  "dva-kms-key": {
    title: "Crea una clave de cifrado para la aplicación con un alias",
    prompt: "El servicio de pedidos cifrará datos con envelope encryption y necesita su propia customer managed key de KMS.\n\nCrea una clave de KMS con la descripción `orders app data`, asígnale el alias `alias/orders-app` y habilita la rotación automática de la clave. Confírmalo con `list-aliases` y `get-key-rotation-status`.",
    hint: "create-key muestra un KeyId. Úsalo con create-alias --target-key-id y con enable-key-rotation --key-id (la rotación necesita el ID de la clave, no el alias).",
    explain: "KMS Encrypt maneja como máximo 4 KB, así que las aplicaciones llaman a GenerateDataKey y cifran los datos localmente con la data key que reciben (envelope encryption); el AWS Encryption SDK lo hace por ti. El código debe hacer referencia al alias para poder reemplazar la clave sin cambiar el código. La rotación automática crea nuevo material de clave cada año, y el material anterior sigue disponible para descifrar los datos existentes.",
    labels: ["alias/orders-app existe", "La rotación está habilitada en la clave"]
  },
  "dva-xray-alarm": {
    title: "Rastrea una función que falla y crea una alarma",
    prompt: "Los usuarios reportan fallas intermitentes en la función `checkout` y nadie sabe qué llamada a un servicio posterior es lenta o falla.\n\n1. Activa el rastreo activo de X-Ray para `checkout`.\n2. Crea una alarma de CloudWatch llamada `checkout-errors` sobre la métrica `Errors` en el namespace `AWS/Lambda` para esa función (`Name=FunctionName,Value=checkout`), con la estadística `Sum`, el período `60`, `GreaterThanThreshold` `0` y `1` período de evaluación.",
    hint: "aws lambda update-function-configuration --function-name checkout --tracing-config Mode=Active, y luego aws cloudwatch put-metric-alarm con --dimensions Name=FunctionName,Value=checkout.",
    explain: "El rastreo activo hace que Lambda tome muestras de las solicitudes y envíe segmentos a X-Ray, donde el service map y los traces muestran qué llamada posterior es lenta o falla; el execution role necesita xray:PutTraceSegments (AWSXRayDaemonWriteAccess). La métrica Errors cuenta las invocaciones que terminaron con un error de la función, y una alarma sobre su Sum, que normalmente se envía a SNS, te avisa de las fallas antes que los usuarios.",
    labels: ["El rastreo activo está encendido para checkout", "checkout-errors vigila la métrica Errors de la función"]
  }
});
