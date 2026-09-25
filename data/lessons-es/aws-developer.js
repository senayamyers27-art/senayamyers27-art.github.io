CertHub.addLessons("aws-developer", [
 {
  "t": "Architectural patterns: event-driven, microservices, fan-out, choreography vs orchestration, loosely coupled and stateless designs",
  "tt": "Patrones de arquitectura: orientada a eventos, microservicios, fan-out, coreografía vs orquestación, diseños débilmente acoplados y sin estado",
  "body": [
   "La mayoría de los escenarios de DVA-C02 describen una aplicación construida con piezas pequeñas que se comunican entre sí, y preguntan qué diseño la mantiene confiable y fácil de cambiar. La idea de fondo es el acoplamiento: cuánto necesita saber un componente sobre otro, y cuánto debe esperarlo. Un sistema fuertemente acoplado falla por completo cuando una parte está lenta o caída. Un sistema débilmente acoplado pone algo en medio (una cola, un tema, un bus de eventos o un contrato de API) para que cada parte pueda fallar, escalar y desplegarse por su cuenta.",
   "En una arquitectura orientada a eventos, los componentes anuncian que algo ocurrió (se hizo un pedido, se subió un archivo) en lugar de llamarse directamente entre sí. El productor emite un evento y sigue adelante; cualquier cantidad de consumidores reacciona a él. En AWS, los medios habituales son Amazon Simple Queue Service (SQS) para colas de trabajo, Amazon Simple Notification Service (SNS) para publicación/suscripción, Amazon EventBridge para enrutar eventos según su contenido y Amazon Kinesis Data Streams para flujos ordenados de alto volumen. Muchos servicios de AWS, como Amazon S3 y Amazon DynamoDB, pueden emitir eventos que invocan funciones de AWS Lambda directamente.",
   "Los microservicios aplican el mismo razonamiento a toda la aplicación: dividirla en servicios pequeños, cada uno dueño de una capacidad de negocio y de su propio almacén de datos, desplegados de forma independiente y accesibles solo a través de su API o de sus eventos. El beneficio es el escalado y la publicación independientes; el costo es más llamadas de red, más cosas que monitorear y la necesidad de manejar fallas parciales. Un distractor común en el examen es un diseño donde dos servicios comparten una misma tabla de base de datos, lo que silenciosamente los vuelve a acoplar.",
   "Fan-out significa que un mensaje se entrega a muchos consumidores en paralelo. El patrón clásico de AWS es SNS hacia varias colas SQS: un productor publica una sola vez en un tema, y cada cola suscrita recibe su propia copia, de modo que un servicio de correo, uno de analítica y uno de inventario procesan cada uno a su propio ritmo, y un consumidor lento nunca bloquea a los demás. Las reglas de EventBridge con varios destinos logran un resultado similar con filtrado basado en contenido.",
   "La coreografía y la orquestación son dos formas de coordinar un proceso de negocio de varios pasos. En la coreografía no hay un controlador central: cada servicio escucha eventos y emite otros nuevos, como bailarines que conocen cada uno su parte. Es muy débilmente acoplada, pero el flujo general es difícil de ver y depurar. En la orquestación, un coordinador, normalmente AWS Step Functions, llama a cada paso, lleva el estado y maneja los reintentos y la compensación. Elige orquestación cuando necesites visibilidad, orden, manejo de errores o pasos de aprobación humana; elige coreografía cuando los servicios deban evolucionar de forma independiente y simplemente reaccionar a eventos.",
   "El diseño sin estado es lo que permite que todo esto escale. Una unidad de cómputo sin estado no guarda datos de sesión ni de usuario en su propia memoria o disco local entre solicitudes, así que cualquier instancia o entorno de ejecución de Lambda puede atender cualquier solicitud y puede reemplazarse en cualquier momento. El estado vive en un almacén externo como DynamoDB, Amazon ElastiCache o S3. Las sesiones persistentes (sticky sessions) y los datos guardados solo en `/tmp` son señales de un diseño con estado que no escalará horizontalmente de forma limpia."
  ],
  "terms": [
   [
    "Loose coupling (acoplamiento débil)",
    "Diseñar componentes para que interactúen a través de un intermediario o un contrato estable, de modo que cada uno pueda fallar, escalar y desplegarse de forma independiente."
   ],
   [
    "Fan-out (distribución a múltiples destinos)",
    "Entregar un mensaje publicado a muchos suscriptores en paralelo, por ejemplo un tema de SNS con varias suscripciones de colas SQS."
   ],
   [
    "Choreography (coreografía)",
    "Coordinación en la que cada servicio reacciona a eventos y emite otros nuevos, sin un controlador central."
   ],
   [
    "Orchestration (orquestación)",
    "Coordinación en la que un motor de flujos de trabajo central, como Step Functions, invoca cada paso y administra el estado y los errores."
   ],
   [
    "Stateless service (servicio sin estado)",
    "Un servicio que no guarda estado del cliente entre solicitudes y lo almacena externamente, para que cualquier instancia pueda atender cualquier solicitud."
   ]
  ],
  "example": "La función Lambda de pago de una tienda en línea publica un mensaje OrderPlaced en un tema de SNS. Tres colas SQS están suscritas: una alimenta el servicio de pagos, otra el servicio de almacén y otra el servicio de correo. Cuando el proveedor de correo sufre una interrupción, los mensajes simplemente esperan en su cola mientras los pagos y los envíos continúan con normalidad.",
  "tip": "Cuando una pregunta dice que un evento debe disparar varios procesos independientes y que un consumidor lento no debe afectar a los demás, busca fan-out de SNS a colas SQS (o EventBridge con varios destinos). Cuando enfatiza un flujo visible y ordenado con manejo de errores, elige la orquestación con Step Functions.",
  "check": [
   [
    "¿Por qué SNS publicando en varias colas SQS es más resiliente que SNS invocando varios servicios directamente?",
    "Cada cola almacena los mensajes para su consumidor, así que un consumidor lento o caído puede ponerse al día después sin perder mensajes ni retrasar a los demás consumidores."
   ],
   [
    "¿Cuándo elegirías orquestación en lugar de coreografía?",
    "Cuando el proceso necesita una vista central del estado, un orden estricto, reintentos o compensación de pasos fallidos, o aprobación humana, que es lo que ofrece una máquina de estados de Step Functions."
   ],
   [
    "¿Qué hace que una capa web sea sin estado?",
    "Guarda los datos de sesión y de usuario en un almacén externo como DynamoDB o ElastiCache en lugar de la memoria de la instancia o el disco local, así que cualquier instancia puede atender cualquier solicitud."
   ]
  ]
 },
 {
  "t": "Resilient code: retries with exponential backoff and jitter, idempotency, timeouts, handling partial failures and dead-letter queues",
  "tt": "Código resiliente: reintentos con retroceso exponencial y jitter, idempotencia, tiempos de espera, fallas parciales y colas de mensajes fallidos",
  "body": [
   "Los sistemas distribuidos fallan de maneras pequeñas todo el tiempo: una solicitud es limitada (throttled), una llamada de red agota su tiempo de espera, un servicio de destino devuelve un error por un momento. El código resiliente cuenta con esto. El examen DVA-C02 evalúa si conoces las técnicas estándar y qué fallas corrige cada una.",
   "Los reintentos son la primera herramienta, pero solo para errores transitorios como la limitación (`ThrottlingException`, HTTP 429), los errores de servidor HTTP 5xx y los tiempos de espera de red. Reintentar un error de validación o un `AccessDenied` solo repite la falla. Reintentar de inmediato en un bucle cerrado es dañino, porque todos los clientes golpean al servicio en apuros al mismo tiempo. El retroceso exponencial (exponential backoff) espera más tiempo después de cada intento fallido, por ejemplo 100 ms, 200 ms, 400 ms, 800 ms, hasta un límite y un número máximo de intentos. El jitter añade aleatoriedad a cada espera para que miles de clientes que fallaron en el mismo momento no reintenten todos en el mismo momento. Los SDK de AWS ya implementan reintentos con retroceso y jitter para las llamadas a la API de AWS; tú configuras el modo de reintento y el número máximo de intentos en lugar de escribirlo tú mismo, pero sí debes agregarlo tú para las llamadas a tus propios servicios o a servicios de terceros.",
   "La idempotencia hace que los reintentos sean seguros. Una operación es idempotente si realizarla dos veces tiene el mismo efecto que realizarla una vez. Como los reintentos, la entrega al menos una vez de las colas estándar de SQS y los reintentos asíncronos de Lambda pueden entregar la misma solicitud más de una vez, tu código debe detectar duplicados. Las técnicas comunes son una clave de idempotencia proporcionada por el cliente (por ejemplo, un ID de pedido), una escritura condicional en DynamoDB como `attribute_not_exists(orderId)` que falla si el elemento ya fue procesado, y la idempotencia natural (asignar un valor en lugar de incrementarlo).",
   "Los tiempos de espera (timeouts) evitan que una dependencia lenta consuma todos tus recursos. Configura tiempos de espera explícitos de conexión y de lectura en los clientes HTTP y del SDK que sean más cortos que el tiempo de espera de tu función o solicitud, para que tu código pueda registrar, reintentar o fallar de forma controlada en lugar de ser terminado a mitad de la operación. Una función Lambda detrás de API Gateway, por ejemplo, debería abandonar una llamada lenta a un servicio de destino bastante antes del propio tiempo de espera de integración de API Gateway.",
   "La falla parcial ocurre cuando un lote contiene elementos buenos y malos. Si un registro de un lote de diez falla y lanzas un error, se reintenta todo el lote, incluidos los nueve que tuvieron éxito. Las API por lotes como `BatchWriteItem` de DynamoDB devuelven `UnprocessedItems`, y `SendMessageBatch` de SQS devuelve fallas por entrada; tu código debe reintentar solo esos. Para Lambda leyendo de SQS o de streams, las respuestas parciales de lote (partial batch responses) te permiten informar solo los elementos fallidos.",
   "Una cola de mensajes fallidos (dead-letter queue, DLQ) es adonde van los mensajes después de fallar un número determinado de veces, para que un mensaje envenenado (uno que nunca se podrá procesar) deje de bloquear la cola y de desperdiciar cómputo. SQS usa una política de redrive con `maxReceiveCount`; las invocaciones asíncronas de Lambda pueden enviar los eventos fallidos a una DLQ de cola SQS o de tema SNS, o a un destino on-failure. Una DLQ solo es útil si configuras una alarma sobre su profundidad e investigas lo que llega allí."
  ],
  "terms": [
   [
    "Exponential backoff (retroceso exponencial)",
    "Una estrategia de reintento en la que la espera entre intentos crece de forma multiplicativa, reduciendo la presión sobre un servicio en apuros."
   ],
   [
    "Jitter (variación aleatoria)",
    "Variación aleatoria añadida a los retrasos de reintento para que muchos clientes no reintenten en oleadas sincronizadas."
   ],
   [
    "Idempotency (idempotencia)",
    "La propiedad de que repetir una operación produce el mismo resultado que hacerla una vez, lo que hace seguros los reintentos y las entregas duplicadas."
   ],
   [
    "Poison message (mensaje envenenado)",
    "Un mensaje que falla al procesarse cada vez que se recibe y que se repetiría para siempre sin una cola de mensajes fallidos."
   ],
   [
    "Dead-letter queue (DLQ, cola de mensajes fallidos)",
    "Una cola que recibe los mensajes o eventos cuyo procesamiento falló después de un número configurado de intentos, para inspeccionarlos más tarde."
   ]
  ],
  "example": "Una función Lambda de pagos procesa mensajes de SQS. Registra cada ID de pago en DynamoDB con un put condicional que usa attribute_not_exists, así que un mensaje entregado dos veces se cobra una sola vez. Su cola SQS tiene una política de redrive con maxReceiveCount de 5 y una DLQ, y una alarma de CloudWatch se dispara cuando la DLQ contiene algún mensaje.",
  "tip": "Si una pregunta menciona errores de limitación como ProvisionedThroughputExceededException o ThrottlingException, la respuesta casi siempre es reintentos con retroceso exponencial (y jitter), no simplemente agregar más reintentos ni aumentar los tiempos de espera.",
  "check": [
   [
    "¿Por qué agregar jitter al retroceso exponencial?",
    "Sin aleatoriedad, los clientes que fallaron juntos reintentan juntos y recrean el pico de carga; el jitter reparte los reintentos a lo largo del tiempo."
   ],
   [
    "¿Qué errores no deben reintentarse?",
    "Los errores del cliente que volverán a fallar sin cambios, como errores de validación, solicitudes mal formadas o AccessDenied; reintenta solo errores transitorios como la limitación, los 5xx y los tiempos de espera agotados."
   ],
   [
    "¿Cómo ayuda una DLQ con un mensaje envenenado en SQS?",
    "Cuando el contador de recepciones del mensaje supera maxReceiveCount, SQS lo mueve a la DLQ, así deja de reintentarse y de bloquear el procesamiento, y puedes inspeccionarlo."
   ]
  ]
 },
 {
  "t": "Messaging and streaming: SQS standard vs FIFO (message groups, deduplication, visibility timeout, long polling), SNS fan-out, EventBridge rules and Scheduler, Kinesis Data Streams",
  "tt": "Mensajería y streaming: SQS estándar vs FIFO (grupos de mensajes, deduplicación, tiempo de visibilidad, long polling), fan-out con SNS, reglas y Scheduler de EventBridge, Kinesis Data Streams",
  "body": [
   "AWS ofrece varios servicios para mover mensajes entre componentes, y el examen espera que elijas el correcto a partir de unas pocas pistas: orden, duplicados, número de consumidores, reproducción (replay) y enrutamiento.",
   "Amazon SQS es una cola basada en extracción (pull): los productores envían mensajes y los consumidores los sondean, y cada mensaje lo procesa un consumidor y luego se elimina. Las colas estándar ofrecen un rendimiento muy alto con entrega al menos una vez y orden de mejor esfuerzo, así que ocasionalmente puedes ver duplicados o mensajes fuera de orden. Las colas FIFO (sus nombres deben terminar en `.fifo`) garantizan el orden primero en entrar, primero en salir y el procesamiento exactamente una vez dentro de una ventana de deduplicación de cinco minutos, con menor rendimiento. El orden en FIFO es por grupo de mensajes: los mensajes con el mismo `MessageGroupId` se entregan en orden, un grupo a la vez, mientras que grupos distintos pueden procesarse en paralelo. La deduplicación usa un `MessageDeduplicationId` que tú proporcionas o la deduplicación basada en contenido, que calcula un hash del cuerpo del mensaje.",
   "Cuando un consumidor recibe un mensaje de SQS, el mensaje no se elimina; se vuelve invisible durante el tiempo de visibilidad (visibility timeout, 30 segundos por defecto). El consumidor debe llamar a `DeleteMessage` antes de que termine ese tiempo, o el mensaje reaparece y otro consumidor podría procesarlo de nuevo. Si el procesamiento tarda más, aumenta el tiempo de visibilidad o llama a `ChangeMessageVisibility`. El long polling (configurar `WaitTimeSeconds` hasta 20 segundos en `ReceiveMessage`, o el tiempo de espera de recepción de la cola) hace que la llamada espere a que lleguen mensajes en lugar de regresar vacía de inmediato, lo que reduce las respuestas vacías y el costo. El short polling es el valor predeterminado.",
   "Amazon SNS es publicación/suscripción basada en empuje (push): un mensaje publicado en un tema se envía a cada suscriptor (colas SQS, funciones Lambda, endpoints HTTP, correo electrónico, SMS). SNS por sí mismo no almacena mensajes para leerlos después. Las políticas de filtro de suscripción permiten que cada suscriptor reciba solo los mensajes cuyos atributos (o cuerpo) coinciden. Los temas FIFO de SNS pueden entregar en orden a colas FIFO de SQS.",
   "Amazon EventBridge es un bus de eventos con enrutamiento basado en contenido. Las reglas seleccionan eventos mediante patrones de eventos (por ejemplo, source `aws.s3` y un nombre de bucket específico) y los envían a destinos como Lambda, Step Functions, SQS u otro bus. Recibe eventos de servicios de AWS, de tus propias aplicaciones mediante `PutEvents` y de socios SaaS compatibles, y puede archivar y reproducir eventos. Para trabajo basado en tiempo, EventBridge Scheduler crea programaciones únicas o recurrentes (expresiones cron o rate) que invocan destinos, con soporte de zonas horarias y su propia configuración de reintentos y DLQ; las reglas programadas en un bus de eventos son la forma más antigua de hacerlo.",
   "Amazon Kinesis Data Streams sirve para datos de streaming ordenados, reproducibles y de alto volumen, como flujos de clics (clickstreams) o telemetría de IoT. Un stream está formado por shards; cada registro tiene una clave de partición que decide su shard, y el orden está garantizado dentro de un shard. Los registros permanecen en el stream durante el período de retención (24 horas por defecto, ampliable), así que varios consumidores pueden leer los mismos datos de forma independiente y reprocesarlos. La capacidad se administra con shards aprovisionados o con el modo bajo demanda (on-demand).",
   "Guía rápida de elección: para desacoplar trabajo con un consumidor por mensaje, usa SQS; si necesitas orden estricto o cero duplicados, SQS FIFO; un mensaje para muchos suscriptores, SNS (normalmente hacia SQS); enrutar por contenido del evento o desde SaaS y servicios de AWS, EventBridge; un stream ordenado en tiempo real con varios consumidores y reproducción, Kinesis."
  ],
  "terms": [
   [
    "Visibility timeout (tiempo de visibilidad)",
    "El período posterior a la recepción de un mensaje de SQS durante el cual está oculto para otros consumidores; reaparece si no se elimina a tiempo."
   ],
   [
    "Message group ID (ID de grupo de mensajes)",
    "El atributo de las colas FIFO que define un grupo ordenado; los mensajes del mismo grupo se procesan estrictamente en orden."
   ],
   [
    "Long polling (sondeo largo)",
    "Una llamada a ReceiveMessage que espera hasta 20 segundos a que haya mensajes, reduciendo las respuestas vacías y el costo."
   ],
   [
    "Event pattern (patrón de eventos)",
    "El filtro JSON de una regla de EventBridge que selecciona qué eventos se envían a los destinos de la regla."
   ],
   [
    "Shard (fragmento)",
    "La unidad de capacidad y de orden en un stream de datos de Kinesis; los registros con la misma clave de partición van al mismo shard."
   ]
  ],
  "example": "Un banco procesa las transacciones de cuentas mediante una cola FIFO de SQS, usando el número de cuenta como MessageGroupId. Las transacciones de una cuenta se aplican estrictamente en orden, mientras que miles de cuentas distintas se procesan en paralelo, y el MessageDeduplicationId evita que un envío reintentado debite dos veces.",
  "tip": "Que distintos consumidores procesen dos veces los mensajes suele significar que el tiempo de visibilidad es más corto que el tiempo de procesamiento. Muchas respuestas vacías de ReceiveMessage y un costo alto apuntan a habilitar el long polling.",
  "check": [
   [
    "¿Cómo puede una cola FIFO de SQS mantener el orden por cliente y aun así escalar?",
    "Usa el ID del cliente como MessageGroupId; el orden se mantiene dentro de cada grupo mientras que grupos distintos se procesan en paralelo."
   ],
   [
    "¿Cuál es la diferencia entre la entrega de SNS y la de SQS?",
    "SNS empuja cada mensaje a todos los suscriptores y no lo conserva; SQS almacena los mensajes hasta que un único consumidor los sondea, procesa y elimina."
   ],
   [
    "¿Qué servicio permite que varias aplicaciones lean y reproduzcan el mismo stream ordenado de registros?",
    "Kinesis Data Streams, porque los registros se conservan durante el período de retención y cada consumidor lleva su propia posición."
   ]
  ]
 },
 {
  "t": "AWS Step Functions: Standard vs Express workflows, retry/catch, task tokens for callbacks",
  "tt": "AWS Step Functions: flujos de trabajo Standard vs Express, retry/catch, task tokens para callbacks",
  "body": [
   "AWS Step Functions es un servicio de orquestación sin servidor. Describes un flujo de trabajo como una máquina de estados en Amazon States Language (ASL), un formato basado en JSON, y Step Functions lo ejecuta: llama a funciones Lambda y a otros servicios de AWS, pasa datos entre pasos, espera, se ramifica y maneja errores. Como la lógica del flujo vive en la máquina de estados y no en tu código, cada función Lambda se mantiene pequeña y la consola muestra cada ejecución de forma visual, paso a paso.",
   "Los principales tipos de estado son `Task` (realizar trabajo, como invocar una función Lambda o llamar directamente a una API de AWS mediante una integración con el SDK), `Choice` (ramificar según los datos), `Parallel` (ejecutar ramas al mismo tiempo), `Map` (ejecutar los mismos pasos para cada elemento de un arreglo), `Wait` (pausar durante un tiempo o hasta una marca de tiempo), `Pass`, `Succeed` y `Fail`.",
   "Hay dos tipos de flujo de trabajo, que se eligen al crear la máquina de estados. Los flujos Standard pueden ejecutarse hasta un año, ejecutan cada paso exactamente una vez y conservan un historial de ejecución completo que puedes inspeccionar en la consola; se cobran por transición de estado. Son adecuados para procesos de negocio de larga duración y auditables, incluidos los que esperan a personas. Los flujos Express se ejecutan hasta cinco minutos, están diseñados para el procesamiento de eventos de alto volumen (como manejar datos de streaming o solicitudes de API), se cobran por número de ejecuciones, duración y memoria, y envían el historial a CloudWatch Logs en lugar de guardarlo en el servicio. Los flujos Express asíncronos tienen semántica al menos una vez y los síncronos como máximo una vez, así que los pasos deben ser idempotentes.",
   "El manejo de errores se declara en los estados. Un bloque `Retry` enumera nombres de errores (como `States.Timeout`, `States.TaskFailed`, `Lambda.ServiceException` o tus propios nombres de error personalizados) con `IntervalSeconds`, `MaxAttempts` y `BackoffRate` para el retroceso exponencial. Un bloque `Catch` se ejecuta cuando se agotan los reintentos y envía la ejecución a un estado alternativo, con `ResultPath` controlando dónde se colocan los detalles del error en los datos del estado. Así es como construyes la compensación, por ejemplo reembolsar un pago cuando falla el envío.",
   "```json\n\"ChargeCard\": {\n  \"Type\": \"Task\",\n  \"Resource\": \"arn:aws:states:::lambda:invoke\",\n  \"Retry\": [{ \"ErrorEquals\": [\"States.TaskFailed\"], \"IntervalSeconds\": 2, \"MaxAttempts\": 3, \"BackoffRate\": 2 }],\n  \"Catch\": [{ \"ErrorEquals\": [\"States.ALL\"], \"ResultPath\": \"$.error\", \"Next\": \"NotifyFailure\" }],\n  \"Next\": \"ShipOrder\"\n}\n```",
   "Las integraciones de servicios vienen en tres patrones. Request Response llama a un servicio y continúa en cuanto este responde. Run a Job (`.sync`) espera a que termine un trabajo, como un job de AWS Batch u otra máquina de estados. Wait for Callback (`.waitForTaskToken`) pausa el flujo y pasa un task token a algo externo, por ejemplo un mensaje en SQS para un sistema de aprobación humana o una integración de terceros. El flujo permanece en pausa hasta que ese proceso externo llama a `SendTaskSuccess` o `SendTaskFailure` con el token (o hasta que la tarea agota su tiempo; `HeartbeatSeconds` puede detectar un trabajador que dejó de responder). Los task tokens son la forma en que los flujos Standard esperan días a que un gerente apruebe algo sin pagar por cómputo inactivo."
  ],
  "terms": [
   [
    "Amazon States Language (ASL)",
    "El lenguaje basado en JSON que se usa para definir las máquinas de estados de Step Functions."
   ],
   [
    "Standard workflow (flujo de trabajo Standard)",
    "Un tipo de flujo de Step Functions para ejecuciones de larga duración (hasta un año), exactamente una vez y completamente auditadas."
   ],
   [
    "Express workflow (flujo de trabajo Express)",
    "Un tipo de flujo de Step Functions para ejecuciones cortas (hasta cinco minutos) y de alto volumen, registradas en CloudWatch Logs."
   ],
   [
    "Task token (token de tarea)",
    "Un token que Step Functions pasa a un proceso externo en el patrón Wait for Callback; el flujo se reanuda cuando se llama a SendTaskSuccess o SendTaskFailure con él."
   ]
  ],
  "example": "Un flujo de gastos guarda una solicitud y luego usa una tarea de SQS con .waitForTaskToken para poner el token en un mensaje para la aplicación de aprobaciones. Dos días después, un gerente hace clic en Aprobar y la aplicación llama a SendTaskSuccess con el token, así que el flujo Standard se reanuda y paga la solicitud.",
  "tip": "Larga duración, auditable o en espera de personas apunta a Standard. Altas tasas de eventos con duración corta apuntan a Express. Cualquier cosa que deba pausarse hasta que responda un sistema externo apunta a un task token con .waitForTaskToken.",
  "check": [
   [
    "¿Qué hace un bloque Catch que Retry no hace?",
    "Catch redirige la ejecución a un estado alternativo cuando el error (y los reintentos) no se resuelve, mientras que Retry solo vuelve a intentar el mismo estado."
   ],
   [
    "¿Por qué un flujo que se ejecuta durante varios días necesitaría un flujo Standard?",
    "Los flujos Express están limitados a cinco minutos, mientras que los flujos Standard pueden ejecutarse hasta un año."
   ],
   [
    "¿Cómo reanuda un sistema externo un flujo pausado en un task token?",
    "Llama a SendTaskSuccess (o SendTaskFailure) con el task token que recibió."
   ]
  ]
 },
 {
  "t": "Calling AWS services with the SDKs and CLI: credential provider chain, pagination, waiters, error handling",
  "tt": "Llamar a servicios de AWS con los SDK y la CLI: cadena de proveedores de credenciales, paginación, waiters, manejo de errores",
  "body": [
   "Cada llamada que tu código hace a AWS, ya sea mediante un SDK de AWS (para Python es Boto3, para JavaScript es AWS SDK for JavaScript v3, y así sucesivamente) o mediante la AWS Command Line Interface (CLI), es una solicitud HTTPS a la API de un servicio, firmada con Signature Version 4 (SigV4) usando credenciales. Saber de dónde vienen esas credenciales y cómo manejar resultados de varias páginas, operaciones largas y errores es un conocimiento central para un desarrollador.",
   "Los SDK y la CLI buscan credenciales en un orden fijo llamado cadena predeterminada de proveedores de credenciales (default credential provider chain). El orden exacto varía un poco según el SDK, pero en términos generales es: credenciales pasadas explícitamente en el código, variables de entorno (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`), los archivos compartidos de credenciales y configuración (`~/.aws/credentials` y `~/.aws/config`, incluidos perfiles con nombre, perfiles de IAM Identity Center (SSO) y perfiles de asunción de rol) y, por último, las credenciales del entorno de cómputo: un rol de ejecución de Lambda, un rol de tarea de Amazon ECS o un perfil de instancia de Amazon EC2 a través del servicio de metadatos de instancia. Gana la primera fuente que proporciona credenciales. Por eso la forma correcta de dar permisos al código en AWS es asociar un rol y no poner ninguna clave en el código ni en la configuración; la cadena encuentra automáticamente las credenciales del rol y las renueva antes de que expiren. Un caso clásico de solución de problemas: una instancia EC2 usa permisos inesperados porque alguien dejó claves de acceso en variables de entorno o en un archivo de credenciales, que tienen prioridad sobre el perfil de instancia.",
   "Las API de listado y descripción devuelven resultados en páginas. Una respuesta incluye un token como `NextToken`, `Marker` o, en DynamoDB, `LastEvaluatedKey`, y lo pasas de nuevo para obtener la página siguiente hasta que ya no se devuelva ningún token. Los SDK ofrecen paginadores que hacen el bucle por ti. La CLI pagina automáticamente por defecto; `--max-items` y `--starting-token` la controlan, y `--page-size` cambia cuántos elementos obtiene cada llamada interna, lo que puede ayudar a evitar tiempos de espera agotados sin cambiar el resultado total.",
   "```python\nimport boto3\ns3 = boto3.client('s3')\nfor page in s3.get_paginator('list_objects_v2').paginate(Bucket='my-bucket'):\n    for obj in page.get('Contents', []):\n        print(obj['Key'])\n```",
   "Los waiters sondean una llamada de descripción hasta que un recurso alcanza un estado deseado, como `bucket_exists`, una instancia EC2 en `instance_running` o `table_exists` de DynamoDB, y entonces regresan, o lanzan un error tras un número máximo de intentos. En la CLI se ven así: `aws dynamodb wait table-exists --table-name Orders`. Úsalos en lugar de escribir tus propios bucles con sleep.",
   "Para el manejo de errores, los SDK lanzan excepciones de servicio que llevan un código de error y un estado HTTP. Captura códigos específicos: `ConditionalCheckFailedException`, `ResourceNotFoundException`, `AccessDeniedException`, `ThrottlingException`. Los SDK reintentan automáticamente la limitación y los errores transitorios con retroceso exponencial; puedes configurar el modo de reintento (`standard` o `adaptive` en muchos SDK) y el número máximo de intentos en el código o con `AWS_RETRY_MODE` y `AWS_MAX_ATTEMPTS`. Registra el ID de solicitud de las llamadas fallidas, ya que AWS Support y CloudTrail lo usan para rastrear una solicitud. Para depurar desde la CLI, `--debug` muestra la solicitud y la respuesta completas, y `aws sts get-caller-identity` muestra a qué identidad se resuelven realmente tus credenciales."
  ],
  "terms": [
   [
    "Default credential provider chain (cadena predeterminada de proveedores de credenciales)",
    "La lista ordenada de lugares donde un SDK o la CLI buscan credenciales, que termina con las credenciales del rol del entorno de cómputo."
   ],
   [
    "Paginator (paginador)",
    "Una ayuda del SDK que sigue automáticamente los tokens de continuación para devolver todas las páginas de resultados de una API de listado."
   ],
   [
    "Waiter (esperador)",
    "Una ayuda del SDK o de la CLI que sondea hasta que un recurso alcanza un estado especificado o se llega a un número máximo de intentos."
   ],
   [
    "SigV4",
    "Signature Version 4, el proceso que firma las solicitudes a la API de AWS con credenciales para que el servicio pueda autenticarlas."
   ]
  ],
  "example": "Un script ejecutado por un job de CI lista todos los objetos de un bucket con 50,000 objetos, pero solo procesa los primeros 1,000. El desarrollador cambia una única llamada a list_objects_v2 por el paginador de list_objects_v2, y ahora el script sigue el ContinuationToken por todas las páginas.",
  "tip": "Si el código en EC2, ECS o Lambda usa los permisos equivocados, sospecha que hay credenciales codificadas o en variables de entorno que ganan sobre el rol en la cadena de credenciales. Ejecuta aws sts get-caller-identity para confirmar quién eres.",
  "check": [
   [
    "¿Por qué el código de Lambda no debe contener claves de acceso?",
    "Las credenciales temporales del rol de ejecución se proporcionan automáticamente mediante la cadena de credenciales y se rotan; las claves incrustadas son de larga duración, pueden filtrarse y anulan el rol previsto."
   ],
   [
    "Un Scan de DynamoDB devuelve un LastEvaluatedKey. ¿Qué significa?",
    "Los resultados están paginados; pasa esa clave como ExclusiveStartKey en la siguiente solicitud para continuar hasta que ya no se devuelva LastEvaluatedKey."
   ],
   [
    "¿Para qué sirve un waiter?",
    "Sondea el estado de un recurso hasta que alcanza un estado deseado, como que una tabla pase a ACTIVE, reemplazando los bucles escritos a mano de esperar y comprobar."
   ]
  ]
 },
 {
  "t": "Lambda configuration: memory, timeout (15-minute max), ephemeral /tmp storage, environment variables, layers, concurrency, VPC access",
  "tt": "Configuración de Lambda: memoria, tiempo de espera (máximo de 15 minutos), almacenamiento efímero /tmp, variables de entorno, capas, concurrencia, acceso a VPC",
  "body": [
   "AWS Lambda ejecuta tu código en entornos de ejecución administrados. No eliges servidores; configuras un puñado de valores, y el examen comprueba que sepas qué controla cada uno y sus límites clave.",
   "La memoria es el principal ajuste de rendimiento, de 128 MB hasta 10,240 MB. Lambda asigna CPU en proporción a la memoria, así que aumentar la memoria también acelera el código limitado por CPU; a veces un ajuste más alto cuesta menos en total porque la función termina antes. El tiempo de espera (timeout) es cuánto puede durar una invocación, de 1 segundo hasta un máximo de 900 segundos (15 minutos); el valor predeterminado es de 3 segundos, lo que sorprende a mucha gente cuando falla una función que llama a una API lenta. El trabajo que necesita más de 15 minutos corresponde a Step Functions, AWS Fargate o AWS Batch, o debe dividirse en partes más pequeñas.",
   "Cada entorno de ejecución tiene almacenamiento efímero montado en `/tmp`, de 512 MB por defecto y configurable hasta 10,240 MB. Persiste entre invocaciones que reutilizan el mismo entorno, lo que es útil para guardar en caché un archivo descargado, pero no se comparte entre entornos y desaparece cuando el entorno se recicla, así que nunca lo trates como almacenamiento duradero. Para archivos compartidos o persistentes, usa S3 o Amazon EFS (que Lambda puede montar).",
   "Las variables de entorno guardan configuración como nombres de tablas o ajustes de etapa, y se leen con `os.environ` o `process.env`. Se cifran en reposo con KMS (una clave administrada por AWS por defecto, o tu propia clave administrada por el cliente), y hay un límite de tamaño total de 4 KB. Los secretos, en cambio, deben obtenerse de Secrets Manager o Parameter Store en tiempo de ejecución, o al menos cifrarse con una clave administrada por el cliente usando los asistentes de cifrado para que no se muestren en texto plano en la consola.",
   "Las capas (layers) son archivos .zip con bibliotecas, runtimes personalizados o código compartido que varias funciones pueden referenciar. Una función puede usar hasta cinco capas, y el tamaño combinado descomprimido de la función y sus capas debe mantenerse dentro del límite de despliegue de 250 MB. Las capas tienen versiones y son inmutables; las funciones referencian el ARN de una versión específica de la capa. Las funciones de imagen de contenedor no usan capas; en su lugar, agregas las dependencias a la imagen.",
   "La concurrencia es el número de invocaciones que se ejecutan al mismo tiempo. Cada cuenta tiene una cuota de concurrencia regional compartida por todas las funciones (1,000 por defecto, ampliable). La concurrencia reservada garantiza a una función una parte de ese grupo y además la limita a ese número; configurarla en 0 deshabilita efectivamente la función. La concurrencia aprovisionada mantiene un número de entornos inicializados por adelantado para evitar arranques en frío (cold starts).",
   "Por defecto, una función Lambda se ejecuta en una red administrada por AWS con acceso a internet pero sin acceso a los recursos de tu VPC privada. Para llegar a una base de datos de Amazon RDS o a un clúster de ElastiCache en subredes privadas, configura la función con subredes y grupos de seguridad de la VPC; Lambda crea interfaces de red elásticas Hyperplane para ella (el rol de ejecución necesita los permisos de interfaces de red de EC2, incluidos en la política administrada `AWSLambdaVPCAccessExecutionRole`). Una vez conectada a una VPC, la función no tiene acceso a internet a menos que sus subredes enruten a través de un NAT gateway; para los servicios de AWS puedes usar en su lugar VPC endpoints."
  ],
  "terms": [
   [
    "Timeout (tiempo de espera)",
    "El tiempo máximo de ejecución de una invocación de Lambda, configurable de 1 segundo a 15 minutos, con un valor predeterminado de 3 segundos."
   ],
   [
    "Ephemeral storage /tmp (almacenamiento efímero)",
    "Disco temporal por entorno para una función Lambda, de 512 MB por defecto y configurable hasta 10,240 MB, no duradero."
   ],
   [
    "Layer (capa)",
    "Un archivo .zip con versión que contiene código compartido o dependencias y que muchas funciones pueden referenciar; cada función puede incluir hasta cinco capas."
   ],
   [
    "Reserved concurrency (concurrencia reservada)",
    "Un ajuste que garantiza y a la vez limita el número de ejecuciones simultáneas de una función."
   ]
  ],
  "example": "Una función en subredes privadas debe leer de una base de datos RDS y también llamar a una API pública de pagos. Funciona con la base de datos, pero las llamadas de pago agotan su tiempo de espera. La solución es enrutar el tráfico saliente de las subredes a través de un NAT gateway, porque una función Lambda conectada a una VPC no tiene acceso a internet por sí sola.",
  "tip": "¿Necesitas más de 15 minutos? No es Lambda (usa Step Functions, Fargate o Batch). ¿Limitada por CPU y lenta? Aumenta la memoria. ¿Una función en VPC no llega a internet? Agrega un NAT gateway o VPC endpoints.",
  "check": [
   [
    "¿Cómo le das más CPU a una función Lambda?",
    "Aumenta su ajuste de memoria; Lambda asigna potencia de CPU en proporción a la memoria configurada."
   ],
   [
    "¿Los datos escritos en /tmp están disponibles para la siguiente invocación?",
    "Solo si esa invocación reutiliza el mismo entorno de ejecución; no se comparten ni son duraderos, así que usa S3 o EFS para datos que deban persistir."
   ],
   [
    "¿Qué pasa si configuras la concurrencia reservada de una función en 0?",
    "No se puede ejecutar ninguna invocación, así que la función queda efectivamente limitada y deshabilitada hasta que se cambie el ajuste."
   ]
  ]
 },
 {
  "t": "Lambda invocation models: synchronous, asynchronous (retries, destinations, DLQs) and event source mappings (SQS, Kinesis, DynamoDB Streams, partial batch responses)",
  "tt": "Modelos de invocación de Lambda: síncrono, asíncrono (reintentos, destinos, DLQ) y mapeos de fuentes de eventos (SQS, Kinesis, DynamoDB Streams, respuestas parciales de lote)",
  "body": [
   "La forma en que se invoca una función Lambda decide quién reintenta cuando hay una falla y adónde van a parar los errores. Hay tres modelos, y muchas preguntas del examen dependen discretamente de cuál está en juego.",
   "La invocación síncrona (`InvocationType` `RequestResponse`) significa que quien llama espera a que la función termine y recibe el resultado o el error. API Gateway, Application Load Balancer, los disparadores de Amazon Cognito y una llamada directa a `aws lambda invoke` son síncronos. Lambda no reintenta por su cuenta; lo decide quien llama. Si la función lanza un error, API Gateway devuelve un error al cliente, y es trabajo del cliente reintentar.",
   "La invocación asíncrona (`InvocationType` `Event`) coloca el evento en una cola interna de Lambda y regresa de inmediato con HTTP 202. Las notificaciones de eventos de Amazon S3, SNS y EventBridge invocan funciones de esta forma. Si la función devuelve un error, Lambda la reintenta dos veces más por defecto (configurable a 0, 1 o 2 reintentos), con esperas entre intentos, y conserva los eventos en la cola hasta seis horas por defecto (antigüedad máxima del evento configurable). Cuando fallan todos los intentos, el evento puede ir a una cola de mensajes fallidos (una cola SQS o un tema SNS que recibe solo la carga útil del evento) o, la opción más nueva y completa, a un destino on-failure. Los destinos también pueden enrutar los resultados exitosos: los destinos on-success y on-failure pueden ser SQS, SNS, Lambda, EventBridge (y S3 para fallas), y reciben el registro de invocación, incluidos los detalles de la respuesta o del error. Como los eventos pueden entregarse más de una vez, los manejadores asíncronos deben ser idempotentes.",
   "Los mapeos de fuentes de eventos (event source mappings) son para fuentes basadas en sondeo: SQS, Kinesis Data Streams, DynamoDB Streams, Amazon MQ, Amazon MSK y Apache Kafka. Aquí el servicio Lambda ejecuta sondeadores que leen registros en lotes e invocan tu función de forma síncrona con cada lote. Los ajustes incluyen el tamaño de lote, la ventana de agrupación y, para los streams, la posición inicial y el factor de paralelización.",
   "El comportamiento ante errores varía según la fuente. En SQS, un lote fallido no se elimina, así que los mensajes vuelven a ser visibles tras el tiempo de visibilidad de la cola y se reintentan hasta que tienen éxito o alcanzan el `maxReceiveCount` de la cola y pasan a la DLQ propia de la cola (configurada en la cola, no en la función). En Kinesis y DynamoDB Streams, un lote que falla bloquea ese shard, porque los registros deben procesarse en orden, y Lambda lo reintenta hasta que tiene éxito o los registros expiran. Los mapeos de streams te permiten limitar esto con el número máximo de reintentos, la antigüedad máxima del registro, la división del lote ante error de la función (bisect batch on function error) y un destino on-failure que recibe los detalles de los registros descartados.",
   "Las respuestas parciales de lote evitan reprocesar los registros exitosos. Habilita `ReportBatchItemFailures` en el mapeo de fuente de eventos y devuelve los ID solo de los elementos fallidos; Lambda reintenta entonces solo esos (en los streams, a partir del primer número de secuencia fallido).",
   "```python\ndef handler(event, context):\n    failures = []\n    for record in event['Records']:\n        try:\n            process(record)\n        except Exception:\n            failures.append({'itemIdentifier': record['messageId']})\n    return {'batchItemFailures': failures}\n```"
  ],
  "terms": [
   [
    "Synchronous invocation (invocación síncrona)",
    "Quien llama espera la respuesta de la función; los reintentos son responsabilidad de quien llama."
   ],
   [
    "Asynchronous invocation (invocación asíncrona)",
    "Lambda encola el evento, devuelve 202 de inmediato y reintenta las fallas por su cuenta antes de enviarlas a una DLQ o a un destino."
   ],
   [
    "Lambda destination (destino de Lambda)",
    "Un destino (SQS, SNS, Lambda, EventBridge, o S3 para fallas) que recibe un registro del éxito o la falla de una invocación asíncrona o de stream."
   ],
   [
    "Event source mapping (mapeo de fuente de eventos)",
    "Un recurso de Lambda que sondea una cola o un stream e invoca la función con lotes de registros."
   ],
   [
    "ReportBatchItemFailures",
    "Un ajuste del mapeo de fuente de eventos que permite a la función devolver solo los registros fallidos para que los exitosos no se reintenten."
   ]
  ],
  "example": "Una carga en S3 dispara de forma asíncrona una función que redimensiona imágenes. Las imágenes corruptas hacen que lance un error, así que Lambda reintenta dos veces y luego envía el registro de invocación, con el mensaje de error y el evento original, a una cola SQS configurada como destino on-failure que el equipo revisa cada mañana.",
  "tip": "Una DLQ configurada en la función Lambda solo se aplica a las invocaciones asíncronas. Para una fuente de eventos SQS, configura la política de redrive y la DLQ en la propia cola de origen.",
  "check": [
   [
    "¿Qué modelo de invocación usa S3 y qué pasa cuando la función falla?",
    "Asíncrono; Lambda reintenta hasta dos veces más por defecto y luego envía el evento a una DLQ o a un destino on-failure si están configurados."
   ],
   [
    "¿Por qué un solo registro malo puede detener una función disparada por Kinesis?",
    "Los lotes de un stream se procesan en orden por shard, así que Lambda sigue reintentando el lote que falla hasta que tiene éxito o expira, a menos que configures límites de reintento, la división ante error o respuestas parciales de lote."
   ],
   [
    "¿Qué devuelve una función para informar fallas parciales de lote?",
    "Un objeto con batchItemFailures que enumera el itemIdentifier (ID de mensaje o número de secuencia) de cada registro fallido."
   ]
  ]
 },
 {
  "t": "Lambda coding practices: initializing SDK clients and connections outside the handler, reading events, returning API Gateway proxy responses",
  "tt": "Buenas prácticas de código en Lambda: inicializar clientes del SDK y conexiones fuera del handler, leer eventos, devolver respuestas proxy de API Gateway",
  "body": [
   "Una función Lambda es un handler (manejador): una función que Lambda llama una vez por invocación con dos argumentos, el evento (los datos de entrada) y el contexto (información de tiempo de ejecución como el ID de solicitud y el tiempo restante). Escribir bien el handler tiene un efecto directo en la velocidad, el costo y la corrección.",
   "Lambda reutiliza los entornos de ejecución. La primera invocación en un entorno nuevo ejecuta la fase de inicialización (init phase), que carga tu código y ejecuta todo lo que está fuera del handler; esto forma parte de un arranque en frío. Las invocaciones posteriores en el mismo entorno pasan directamente al handler. Así que crea los clientes del SDK y las conexiones a bases de datos, y carga la configuración o las bibliotecas grandes, a nivel de módulo, fuera del handler. Se crean una sola vez y se reutilizan en muchas invocaciones en caliente, lo que ahorra tiempo y evita abrir una nueva conexión a la base de datos en cada solicitud. Mantén dentro del handler todo lo específico de la solicitud, y no guardes datos de usuario en variables globales, porque la siguiente invocación puede venir de otro usuario.",
   "```python\nimport os, json, boto3\n\ntable = boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])  # se ejecuta una vez por entorno\n\ndef handler(event, context):\n    order_id = event['pathParameters']['id']\n    item = table.get_item(Key={'orderId': order_id}).get('Item')\n    if not item:\n        return {'statusCode': 404, 'body': json.dumps({'message': 'not found'})}\n    return {\n        'statusCode': 200,\n        'headers': {'Content-Type': 'application/json'},\n        'body': json.dumps(item, default=str)\n    }\n```",
   "Leer el evento correctamente significa conocer su forma para cada fuente. Una notificación de S3 llega como `event['Records'][i]['s3']['bucket']['name']` y `['object']['key']` (las claves vienen codificadas como URL, así que decodifícalas). SQS entrega `Records` con `body` como una cadena que normalmente analizas como JSON. Un evento de integración proxy de API Gateway incluye `httpMethod` (REST API) o `requestContext.http.method` (HTTP API, versión de carga útil 2.0), `path` (`rawPath` en 2.0), `headers`, `queryStringParameters`, `pathParameters` y `body` como cadena, posiblemente codificada en Base64 cuando `isBase64Encoded` es true. Maneja siempre los campos ausentes, porque en un evento de REST API `queryStringParameters` es null cuando no se envía cadena de consulta (en un evento 2.0 el campo simplemente no está).",
   "Con una integración proxy de Lambda, API Gateway pasa la solicitud completa a la función y espera recibir un objeto de respuesta específico: `statusCode` (número), `headers` y `multiValueHeaders` opcionales, `body` como cadena (así que debes aplicar `json.dumps` o `JSON.stringify` a los objetos) y `isBase64Encoded` opcional para contenido binario. Si devuelves otra forma, como un objeto sin procesar o un cuerpo que no es cadena, API Gateway no puede mapearlo y el cliente recibe un 502 Bad Gateway con un mensaje como 'Malformed Lambda proxy response'. Para clientes de navegador que llaman a una integración proxy, la propia función debe devolver los encabezados CORS, como `Access-Control-Allow-Origin`.",
   "Otras buenas prácticas: usa `get_remaining_time_in_millis()` del objeto de contexto para detenerte de forma controlada antes de agotar el tiempo; registra los logs en JSON estructurado; mantén pequeños los paquetes de despliegue; y evita los patrones recursivos, como una función que escribe en el mismo prefijo del bucket de S3 que la dispara."
  ],
  "terms": [
   [
    "Handler (manejador)",
    "La función que Lambda llama en cada invocación, que recibe el evento y el objeto de contexto."
   ],
   [
    "Init phase (fase de inicialización)",
    "La parte de un arranque en frío en la que Lambda carga el código y ejecuta la inicialización fuera del handler, una vez por entorno de ejecución."
   ],
   [
    "Lambda proxy integration (integración proxy de Lambda)",
    "Una integración de API Gateway que pasa la solicitud HTTP completa a Lambda y espera una respuesta con statusCode, headers y un body de tipo cadena."
   ],
   [
    "Context object (objeto de contexto)",
    "El segundo argumento del handler, que expone el ID de solicitud, el nombre de la función, el límite de memoria y el tiempo de ejecución restante."
   ]
  ],
  "example": "La API de un equipo devuelve errores 502 después de una refactorización. Los logs muestran que la función ahora devuelve {'statusCode': 200, 'body': {'id': 7}}. Como el body es un objeto y no una cadena, API Gateway rechaza la respuesta; envolverlo en json.dumps corrige el error.",
  "tip": "Espera una pregunta en la que la solución para funciones lentas o que agotan las conexiones sea mover la creación de clientes o conexiones fuera del handler. Un 502 de una integración proxy casi siempre significa que la forma de la respuesta o el body de tipo cadena están mal.",
  "check": [
   [
    "¿Por qué inicializar una conexión a la base de datos fuera del handler?",
    "Se ejecuta una vez por entorno de ejecución y la reutilizan las invocaciones en caliente, lo que reduce la latencia y el número de conexiones abiertas."
   ],
   [
    "¿Qué debe ser el campo body en una respuesta proxy de Lambda?",
    "Una cadena; los objetos deben serializarse, por ejemplo con JSON.stringify o json.dumps."
   ],
   [
    "¿Dónde se encuentra la cadena de consulta en un evento proxy de REST API y cuál es su valor cuando no se envía ninguna?",
    "En queryStringParameters, que es null cuando la solicitud no tiene cadena de consulta, así que el código debe manejar ese caso."
   ]
  ]
 },
 {
  "t": "DynamoDB: partition and sort keys, Query vs Scan, LSI vs GSI, RCU/WCU math, consistency models, condition expressions, TTL, Streams, DAX",
  "tt": "DynamoDB: claves de partición y de ordenamiento, Query vs Scan, LSI vs GSI, cálculo de RCU/WCU, modelos de consistencia, expresiones de condición, TTL, Streams, DAX",
  "body": [
   "Amazon DynamoDB es una base de datos sin servidor de clave-valor y de documentos. Es rápida a cualquier escala si diseñas en torno a sus claves, y se evalúa mucho en DVA-C02, incluida la aritmética.",
   "Toda tabla tiene una clave primaria. Una clave primaria simple es solo una clave de partición; DynamoDB le aplica un hash para elegir la partición de almacenamiento, así que cada valor debe ser único. Una clave primaria compuesta agrega una clave de ordenamiento (sort key): los elementos comparten una clave de partición y se almacenan ordenados por la clave de ordenamiento, lo que permite consultas por rango como todos los pedidos del cliente 42 entre dos fechas. Los elementos pueden tener hasta 400 KB.",
   "`Query` encuentra elementos por clave de partición (coincidencia exacta) y puede acotar con condiciones sobre la clave de ordenamiento (`=`, `<`, `between`, `begins_with`). Lee solo los elementos que coinciden y es eficiente. `Scan` lee todos los elementos de la tabla o del índice y luego filtra, consumiendo capacidad por todo lo leído incluso cuando un `FilterExpression` descarta la mayor parte. Prefiere Query; usa Scan solo para tablas pequeñas o exportaciones, y acelera los escaneos grandes con segmentos de escaneo en paralelo. `ProjectionExpression` limita los atributos devueltos, pero no la capacidad consumida.",
   "Los índices secundarios permiten consultar por otros atributos. Un índice secundario local (LSI) mantiene la misma clave de partición con una clave de ordenamiento distinta, debe crearse cuando se crea la tabla y admite lecturas fuertemente consistentes. Un índice secundario global (GSI) puede tener una clave de partición y de ordenamiento completamente distintas, puede agregarse en cualquier momento, tiene su propia capacidad y solo admite lecturas eventualmente consistentes. Si la capacidad de escritura de un GSI es demasiado baja, las escrituras en la tabla base se limitan.",
   "Cálculo de capacidad: una unidad de capacidad de lectura (RCU) es una lectura fuertemente consistente por segundo de un elemento de hasta 4 KB, o dos lecturas eventualmente consistentes por segundo. Una unidad de capacidad de escritura (WCU) es una escritura por segundo de un elemento de hasta 1 KB. Primero redondea hacia arriba el tamaño del elemento y luego multiplica. Las lecturas y escrituras transaccionales cuestan el doble. Por ejemplo, 10 lecturas fuertemente consistentes por segundo de elementos de 6 KB: 6 KB se redondea a 8 KB, que son 2 RCU cada una, así que 20 RCU; con consistencia eventual serían 10 RCU. Escribir 5 elementos por segundo de 2.5 KB se redondea a 3 KB cada uno, así que 15 WCU.",
   "Las lecturas son eventualmente consistentes por defecto y pueden no reflejar por un momento una escritura reciente; configura `ConsistentRead=true` para lecturas fuertemente consistentes (al doble del costo en RCU). Las expresiones de condición hacen que las escrituras sean condicionales, por ejemplo `attribute_not_exists(pk)` para evitar sobrescribir o `version = :expected` para el bloqueo optimista; una condición fallida lanza `ConditionalCheckFailedException`. `UpdateItem` con `ADD` o `SET x = x + :inc` actualiza de forma atómica sin una lectura previa.",
   "Time to Live (TTL) elimina elementos después de una marca de tiempo guardada en un atributo que tú nombras, en segundos de época Unix, sin costo de escritura; la eliminación ocurre en segundo plano, normalmente en unos pocos días, así que filtra los elementos vencidos en las consultas. DynamoDB Streams registra los cambios a nivel de elemento (solo claves, imagen nueva, imagen anterior o ambas) durante 24 horas y suele disparar Lambda para replicación, auditoría o notificaciones. DynamoDB Accelerator (DAX) es una caché en memoria compatible con la API que reduce las lecturas eventualmente consistentes a microsegundos; no ayuda con las lecturas fuertemente consistentes ni con cargas de trabajo con muchas escrituras."
  ],
  "terms": [
   [
    "Partition key (clave de partición)",
    "El atributo clave al que DynamoDB aplica un hash para decidir qué partición almacena un elemento."
   ],
   [
    "Global secondary index (GSI, índice secundario global)",
    "Un índice con su propia clave de partición y de ordenamiento, que se puede agregar en cualquier momento, con capacidad separada y solo lecturas eventualmente consistentes."
   ],
   [
    "Local secondary index (LSI, índice secundario local)",
    "Un índice que comparte la clave de partición de la tabla con una clave de ordenamiento alternativa; solo se crea junto con la tabla."
   ],
   [
    "Read capacity unit (RCU, unidad de capacidad de lectura)",
    "Una lectura fuertemente consistente por segundo, o dos lecturas eventualmente consistentes, de un elemento de hasta 4 KB."
   ],
   [
    "Write capacity unit (WCU, unidad de capacidad de escritura)",
    "Una escritura por segundo de un elemento de hasta 1 KB."
   ]
  ],
  "example": "Un juego guarda puntuaciones con la clave de partición playerId y la clave de ordenamiento gameDate. Para mostrar una tabla de clasificación de un juego entre todos los jugadores, el desarrollador agrega un GSI con clave de partición gameId y clave de ordenamiento score, y luego ejecuta un Query sobre el GSI con ScanIndexForward en false.",
  "tip": "En las preguntas de RCU/WCU, siempre redondea el tamaño del elemento hacia arriba al siguiente múltiplo de 4 KB (lecturas) o 1 KB (escrituras) antes de multiplicar; luego divide entre dos para lecturas eventualmente consistentes o duplica para transacciones.",
  "check": [
   [
    "¿Cuántas RCU necesitan 20 lecturas eventualmente consistentes por segundo de elementos de 9 KB?",
    "9 KB se redondea a 12 KB, que son 3 RCU por lectura fuertemente consistente; la consistencia eventual lo reduce a la mitad, así que 20 x 3 / 2 = 30 RCU."
   ],
   [
    "Necesitas un nuevo patrón de consulta en una tabla existente con una clave de partición distinta. ¿LSI o GSI?",
    "Un GSI, porque puede usar una clave de partición distinta y puede agregarse a una tabla existente."
   ],
   [
    "¿Por qué un Scan con FilterExpression es costoso?",
    "Se consume capacidad por cada elemento leído antes de aplicar el filtro, no solo por los elementos devueltos."
   ]
  ]
 },
 {
  "t": "Amazon S3 from code: multipart upload, storage classes and lifecycle, event notifications",
  "tt": "Amazon S3 desde el código: carga multiparte, clases de almacenamiento y ciclo de vida, notificaciones de eventos",
  "body": [
   "Amazon S3 almacena objetos (archivos más metadatos) en buckets, direccionados por clave. Como desarrollador, principalmente llamas a `PutObject`, `GetObject`, `ListObjectsV2` y `DeleteObject`, pero el examen se centra en las cargas grandes, la elección de clases de almacenamiento y la reacción a los cambios.",
   "Un solo `PutObject` puede subir hasta 5 GB. La carga multiparte (multipart upload) divide un objeto grande en partes que se suben de forma independiente y en paralelo, y luego se ensamblan. Es obligatoria por encima de 5 GB y se recomienda para objetos de más de unos 100 MB. El flujo es `CreateMultipartUpload` (devuelve un ID de carga), `UploadPart` para cada parte (cada una obtiene un ETag; las partes miden de 5 MB a 5 GB salvo la última, con hasta 10,000 partes) y luego `CompleteMultipartUpload` con la lista de números de parte y ETags. Beneficios: mayor rendimiento, y una parte fallida puede reintentarse sola en lugar de reiniciar toda la carga. Las utilidades de transferencia de alto nivel de los SDK, y `aws s3 cp`, hacen esto automáticamente. Las cargas multiparte incompletas mantienen sus partes almacenadas (y facturadas) hasta que se abortan, así que agrega una regla de ciclo de vida para abortar las cargas incompletas después de algunos días.",
   "Para cargas rápidas desde clientes lejanos, S3 Transfer Acceleration enruta los datos a través de las ubicaciones perimetrales (edge locations) de CloudFront. Para descargas, las lecturas por rango de bytes (el encabezado `Range`) recuperan partes de un objeto en paralelo o reanudan una descarga fallida.",
   "Las clases de almacenamiento equilibran el costo con la velocidad y el patrón de acceso. S3 Standard es para datos a los que se accede con frecuencia. S3 Intelligent-Tiering mueve automáticamente los objetos entre niveles de acceso según el uso, lo cual es bueno cuando los patrones son desconocidos. S3 Standard-IA (Infrequent Access) y S3 One Zone-IA cuestan menos de almacenar, pero cobran por recuperación; One Zone-IA guarda los datos en una sola zona de disponibilidad, así que úsala solo para datos que se puedan volver a crear. S3 Glacier Instant Retrieval, Glacier Flexible Retrieval y Glacier Deep Archive son para archivos históricos; las dos últimas requieren una solicitud de restauración que tarda de minutos a horas antes de poder leer los datos. Configuras la clase por objeto con el parámetro `StorageClass`.",
   "La configuración de ciclo de vida automatiza esto con reglas delimitadas por prefijo o etiqueta: las acciones de transición mueven los objetos a clases más baratas después de un número de días (por ejemplo, Standard-IA a los 30 días, Glacier Flexible Retrieval a los 90), y las acciones de expiración eliminan objetos, versiones anteriores no actuales en buckets con control de versiones o cargas multiparte incompletas.",
   "Las notificaciones de eventos de S3 se disparan cuando los objetos se crean, eliminan, restauran o replican, y pueden filtrarse por prefijo y sufijo de clave (por ejemplo `uploads/` y `.jpg`). Los destinos son Lambda, SQS y SNS; la política de recursos del destino debe permitir que S3 lo invoque o le envíe mensajes. Como alternativa, habilita la entrega de eventos de S3 a EventBridge para obtener un filtrado más completo y muchos más destinos. Las notificaciones suelen entregarse en segundos y ocasionalmente pueden entregarse más de una vez, así que los manejadores deben ser idempotentes. Evita escribir la salida en el mismo prefijo que dispara la función, lo que crea un bucle de invocaciones."
  ],
  "terms": [
   [
    "Multipart upload (carga multiparte)",
    "Subir un objeto como partes cargadas por separado que S3 ensambla; obligatoria por encima de 5 GB y recomendada para archivos grandes."
   ],
   [
    "Lifecycle rule (regla de ciclo de vida)",
    "Una configuración del bucket que transiciona los objetos a otras clases de almacenamiento o los hace expirar después de períodos definidos."
   ],
   [
    "S3 Intelligent-Tiering",
    "Una clase de almacenamiento que mueve automáticamente los objetos entre niveles de acceso según la frecuencia con que se accede a ellos."
   ],
   [
    "Event notification (notificación de eventos)",
    "Una función de S3 que envía eventos a nivel de objeto a Lambda, SQS, SNS o EventBridge, opcionalmente filtrados por prefijo y sufijo."
   ]
  ],
  "example": "Una plataforma de video sube archivos de 20 GB desde una aplicación móvil. Usa carga multiparte con partes de 100 MB en paralelo, así que una conexión caída solo reintenta una parte. Una notificación ObjectCreated filtrada por el sufijo .mp4 envía un mensaje a una cola SQS que consumen los trabajadores de transcodificación, y una regla de ciclo de vida mueve los originales a Glacier Flexible Retrieval después de 90 días.",
  "tip": "Las cargas de más de 5 GB deben usar carga multiparte. Recuerda la regla de ciclo de vida para abortar cargas multiparte incompletas cuando una pregunta plantee por qué los costos de almacenamiento siguen creciendo sin objetos visibles.",
  "check": [
   [
    "¿Qué tres llamadas a la API componen una carga multiparte?",
    "CreateMultipartUpload, UploadPart para cada parte y luego CompleteMultipartUpload (o AbortMultipartUpload para cancelar)."
   ],
   [
    "¿Qué clase de almacenamiento es adecuada para datos con patrones de acceso impredecibles?",
    "S3 Intelligent-Tiering, que mueve automáticamente los objetos entre niveles según el acceso."
   ],
   [
    "¿Qué debe estar configurado para que S3 invoque una función Lambda al subir un archivo?",
    "Una configuración de notificación de eventos en el bucket y una política basada en recursos en la función que permita a s3.amazonaws.com invocarla."
   ]
  ]
 },
 {
  "t": "Caching strategies with ElastiCache: lazy loading, write-through, TTLs; choosing between SQL, NoSQL and in-memory stores",
  "tt": "Estrategias de caché con ElastiCache: lazy loading, write-through, TTL; cómo elegir entre almacenes SQL, NoSQL y en memoria",
  "body": [
   "Una caché guarda datos leídos con frecuencia en memoria rápida para que tu aplicación no consulte la base de datos en cada solicitud. Amazon ElastiCache es un servicio administrado en memoria que ejecuta los motores Redis OSS, Valkey o Memcached. El examen pregunta cómo poblar y hacer expirar la caché, y cuándo otro tipo de almacén de datos es la opción correcta.",
   "La carga diferida (lazy loading, también llamada cache-aside) carga datos en la caché solo cuando se solicitan. La aplicación consulta la caché; si hay un acierto (hit), devuelve el valor; si hay un fallo (miss), lee de la base de datos, escribe el resultado en la caché y lo devuelve. Ventajas: solo se guardan en caché los datos solicitados, y la falla de un nodo de caché no es fatal, porque la aplicación simplemente recurre a la base de datos. Desventajas: cada fallo cuesta tres viajes (caché, base de datos, escritura en caché), y los datos en caché pueden quedar desactualizados porque nada los actualiza cuando cambia la base de datos.",
   "```python\ndef get_product(pid):\n    cached = cache.get(f'product:{pid}')\n    if cached:\n        return json.loads(cached)\n    item = db_get_product(pid)\n    cache.set(f'product:{pid}', json.dumps(item), ex=300)  # TTL de 5 minutos\n    return item\n```",
   "Write-through actualiza la caché cada vez que la aplicación escribe en la base de datos. Los datos de la caché nunca están desactualizados y las lecturas son rápidas. Los costos son una penalización en escritura (dos escrituras por actualización) y la rotación de caché (cache churn): gran parte de lo que escribes quizá nunca se lea, lo que desperdicia memoria. Además, los datos faltan en la caché hasta que se escriben, así que un nodo nuevo empieza vacío; por eso write-through suele combinarse con lazy loading.",
   "Un tiempo de vida (TTL) en cada clave limita la desactualización y el uso de memoria: cuando expira, la siguiente lectura es un fallo y vuelve a cargar datos frescos. TTL cortos significan datos más frescos pero más carga en la base de datos; TTL largos significan lo contrario. Agregar una pequeña variación aleatoria a los TTL evita que muchas claves expiren a la vez. Cuando la memoria se llena, el motor desaloja claves según su política de desalojo, como la de menos usada recientemente (LRU).",
   "Elección de motor: Redis OSS y Valkey admiten estructuras de datos avanzadas (conjuntos ordenados para tablas de clasificación, hashes, listas), replicación con conmutación por error automática entre zonas de disponibilidad, persistencia, copias de seguridad y pub/sub. Memcached es más simple, multihilo y particionado horizontalmente, pero no tiene replicación ni persistencia. Si una pregunta menciona alta disponibilidad, tablas de clasificación ordenadas o almacenes de sesiones que deben sobrevivir a la falla de un nodo, elige Redis OSS o Valkey.",
   "Cómo elegir el almacén: usa una base de datos relacional (SQL) como Amazon RDS o Amazon Aurora cuando necesites joins, consultas ad hoc complejas y transacciones de varias filas sobre datos estructurados. Usa un almacén NoSQL como DynamoDB para patrones de acceso conocidos a escala masiva, con latencia de milisegundos de un solo dígito y esquemas flexibles. Usa un almacén en memoria (ElastiCache, o DAX delante de DynamoDB) para lecturas de microsegundos a menos de un milisegundo de datos muy consultados, estado de sesión, contadores de límite de tasa y tablas de clasificación, normalmente delante de una base de datos duradera y no en su lugar."
  ],
  "terms": [
   [
    "Lazy loading / cache-aside (carga diferida)",
    "Una estrategia que pobla la caché solo cuando hay un fallo de caché, después de leer de la base de datos."
   ],
   [
    "Write-through (escritura directa)",
    "Una estrategia que escribe en la caché cada vez que se actualiza la base de datos, manteniendo actualizados los datos en caché."
   ],
   [
    "TTL (time to live, tiempo de vida)",
    "Un tiempo de expiración en una clave de caché, después del cual se elimina y se vuelve a cargar en la siguiente lectura."
   ],
   [
    "Cache hit ratio (tasa de aciertos de caché)",
    "La proporción de lecturas atendidas desde la caché; una tasa baja sugiere claves mal elegidas, TTL cortos o una caché demasiado pequeña."
   ]
  ],
  "example": "Un sitio de noticias lee las páginas de artículos desde Aurora. Agrega ElastiCache para Valkey con lazy loading y un TTL de 10 minutos, así que los artículos populares se sirven desde la memoria. Cuando un editor actualiza un artículo, el CMS también escribe la nueva versión en la caché (write-through), para que los lectores nunca vean un titular desactualizado.",
  "tip": "¿Quejas por datos desactualizados? Agrega write-through o acorta el TTL. ¿La caché se llena de datos que nadie lee? Eso es la rotación de write-through, así que combínalo con TTL. ¿Necesitas replicación, conmutación por error o conjuntos ordenados? Redis OSS o Valkey, no Memcached.",
  "check": [
   [
    "¿Cuál es la principal desventaja de lazy loading?",
    "Los datos pueden quedar desactualizados porque la caché solo se actualiza cuando hay un fallo, y cada fallo agrega latencia por los viajes adicionales."
   ],
   [
    "¿Por qué combinar write-through con un TTL?",
    "Write-through guarda en caché cada escritura, incluidos los datos que rara vez se leen; un TTL hace expirar las claves no usadas para no desperdiciar memoria."
   ],
   [
    "¿Cuándo elegirías ElastiCache para Redis OSS en lugar de Memcached?",
    "Cuando necesitas replicación y conmutación por error automática, persistencia, copias de seguridad o estructuras de datos avanzadas como conjuntos ordenados."
   ]
  ]
 },
 {
  "t": "IAM for applications: execution roles, instance profiles, ECS task roles, least-privilege policies, policy evaluation (explicit deny wins)",
  "tt": "IAM para aplicaciones: roles de ejecución, perfiles de instancia, roles de tarea de ECS, políticas de mínimo privilegio, evaluación de políticas (gana la denegación explícita)",
  "body": [
   "Las aplicaciones necesitan permisos igual que las personas, y AWS Identity and Access Management (IAM) los proporciona mediante roles. Un rol es una identidad con políticas de permisos pero sin contraseña ni claves de acceso de larga duración; quien tiene permitido asumirlo obtiene credenciales temporales de AWS Security Token Service (STS). Darle un rol a tu código, en lugar de incrustar las claves de acceso de un usuario de IAM, es el patrón que el examen espera siempre.",
   "Cada servicio de cómputo tiene su propia forma de asociar un rol. El servicio Lambda asume un rol de ejecución de Lambda en nombre de la función; su política de confianza permite a `lambda.amazonaws.com`, y sus permisos deciden a qué puede llamar el código de la función. Como mínimo necesita permiso para escribir en CloudWatch Logs (la política administrada `AWSLambdaBasicExecutionRole`); leer de SQS o de streams mediante un mapeo de fuente de eventos también requiere los permisos de lectura correspondientes en este rol. En EC2, un rol se asocia mediante un perfil de instancia (instance profile), un contenedor del rol que la instancia expone a través del servicio de metadatos de instancia; la cadena de credenciales del SDK toma las credenciales automáticamente. En Amazon ECS, el rol de tarea (task role) da a los contenedores de la aplicación sus permisos de AWS, mientras que el rol de ejecución de tarea (task execution role), que es distinto, lo usa el agente de ECS para descargar imágenes de Amazon ECR y enviar logs. Confundir estos dos es una trampa común.",
   "Mínimo privilegio significa conceder solo las acciones y los recursos que el código realmente necesita. Una declaración de política tiene `Effect` (Allow o Deny), `Action`, `Resource` y `Condition` opcional. En lugar de `dynamodb:*` sobre `*`, concede `dynamodb:GetItem` y `dynamodb:PutItem` sobre el ARN de una sola tabla. Las condiciones restringen aún más, por ejemplo por VPC de origen, por etiqueta o exigiendo cifrado.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"dynamodb:GetItem\", \"dynamodb:PutItem\"],\n    \"Resource\": \"arn:aws:dynamodb:us-east-1:111122223333:table/Orders\"\n  }]\n}\n```",
   "La evaluación de políticas dentro de una cuenta sigue una lógica sencilla. Toda solicitud empieza denegada implícitamente. Luego AWS reúne todas las políticas aplicables: políticas basadas en identidad, políticas basadas en recursos, límites de permisos (permissions boundaries), políticas de sesión y políticas de control de servicios (SCP) de AWS Organizations. Si alguna política aplicable tiene un `Deny` explícito que coincide, la solicitud se deniega, sin importar cuántos Allow existan. De lo contrario, si un Allow la concede (y ningún límite, SCP o política de sesión la restringe), la solicitud se permite. Si nada la permite, se mantiene la denegación implícita. Es decir: la denegación explícita gana sobre el permiso, y el permiso gana sobre la denegación implícita predeterminada.",
   "Las políticas administradas (administradas por AWS o por el cliente) son reutilizables y tienen versiones; las políticas en línea (inline) están incrustadas en un solo rol o usuario y se eliminan con él. Los límites de permisos establecen los permisos máximos que puede conceder una política basada en identidad, lo cual es útil cuando se permite a los desarrolladores crear roles para sus propias funciones. Para probar políticas, usa el simulador de políticas de IAM, y lee el mensaje de error `AccessDenied`, que a menudo nombra la acción faltante y el tipo de política que la bloqueó."
  ],
  "terms": [
   [
    "Execution role (rol de ejecución)",
    "El rol de IAM que asume una función Lambda para obtener credenciales temporales con las que llamar a otros servicios de AWS."
   ],
   [
    "Instance profile (perfil de instancia)",
    "Un contenedor que asocia un rol de IAM a una instancia EC2 para que las aplicaciones que corren en ella reciban credenciales temporales."
   ],
   [
    "ECS task role (rol de tarea de ECS)",
    "El rol de IAM cuyos permisos usan los contenedores de la aplicación en una tarea de ECS, distinto del rol de ejecución de tarea."
   ],
   [
    "Explicit deny (denegación explícita)",
    "Una declaración de política con Effect Deny que anula cualquier Allow para las solicitudes que coinciden."
   ],
   [
    "Least privilege (mínimo privilegio)",
    "Conceder solo las acciones y los recursos específicos necesarios para realizar una tarea."
   ]
  ],
  "example": "Un servicio en contenedores en Fargate falla con AccessDenied al escribir en S3, aunque el rol de ejecución de tarea tiene AmazonS3FullAccess. El desarrollador se da cuenta de que la aplicación usa el rol de tarea, no el rol de ejecución, y en su lugar asocia al rol de tarea una política que permite s3:PutObject sobre ese único bucket.",
  "tip": "Si una pregunta muestra un Allow y un Deny para la misma acción, la respuesta es denegado. Si pregunta cómo debe obtener credenciales una aplicación en EC2, elige un rol de IAM mediante un perfil de instancia, nunca claves de acceso en la instancia.",
  "check": [
   [
    "¿Qué rol permite a un contenedor de ECS llamar a DynamoDB y cuál permite a ECS descargar la imagen desde ECR?",
    "El rol de tarea concede los permisos de la aplicación; el rol de ejecución de tarea permite al agente de ECS descargar imágenes y escribir logs."
   ],
   [
    "Un usuario tiene una política de identidad que permite s3:* y una SCP deniega s3:DeleteBucket. ¿Puede eliminar un bucket?",
    "No; la denegación explícita de la SCP anula el permiso."
   ],
   [
    "¿Qué necesita como mínimo un rol de ejecución de Lambda?",
    "Permiso para crear flujos de logs (log streams) y escribir eventos de log en CloudWatch Logs, como en AWSLambdaBasicExecutionRole."
   ]
  ]
 },
 {
  "t": "Resource-based policies: Lambda permissions for S3/SNS/API Gateway, S3 bucket policies, KMS key policies",
  "tt": "Políticas basadas en recursos: permisos de Lambda para S3/SNS/API Gateway, políticas de bucket de S3, políticas de claves de KMS",
  "body": [
   "Las políticas basadas en identidad se asocian a un usuario o rol y dicen qué puede hacer esa identidad. Las políticas basadas en recursos se asocian a un recurso y dicen quién puede acceder a él. Incluyen un elemento `Principal` que nombra a quién se le permite, que puede ser una cuenta de AWS, un rol o un servicio de AWS como `s3.amazonaws.com`. Muchos errores de integración en el examen se reducen a que falta una política basada en recursos.",
   "La política basada en recursos de una función Lambda (su política de función) controla qué servicios y cuentas pueden invocarla. Cuando S3, SNS, EventBridge o API Gateway invocan una función, esos servicios no asumen tu rol de ejecución; necesitan permiso en la propia función. Lo agregas con `lambda add-permission` (la consola lo hace por ti cuando agregas un disparador). Usa condiciones `SourceArn` (y, para S3, `SourceAccount`) para que solo tu bucket, tema o API específico pueda invocar la función, lo que evita el problema del suplente confundido (confused deputy), en el que el recurso de otro cliente dispara tu función.",
   "```bash\naws lambda add-permission \\\n  --function-name resize-image \\\n  --statement-id s3-invoke \\\n  --action lambda:InvokeFunction \\\n  --principal s3.amazonaws.com \\\n  --source-arn arn:aws:s3:::my-upload-bucket \\\n  --source-account 111122223333\n```",
   "Para API Gateway, el principal es `apigateway.amazonaws.com` y el ARN de origen es el ARN execute-api de la API, que puede delimitarse a una etapa, un método y una ruta. Cuando una variable de etapa apunta a distintos alias de la función, cada alias necesita su propio permiso. Si falta este permiso, aparece como un error 500 de API Gateway con 'Invalid permissions on Lambda function' en los logs de ejecución. Para las fuentes de eventos SQS, Kinesis y DynamoDB Streams es lo contrario: Lambda las sondea, así que el rol de ejecución necesita permisos de lectura y no se requiere política de función.",
   "Las políticas de bucket de S3 son políticas JSON en el bucket. Pueden conceder acceso a otras cuentas, imponer condiciones para todos (por ejemplo, denegar cualquier solicitud en la que `aws:SecureTransport` sea false, o denegar `PutObject` sin un encabezado de cifrado obligatorio) y restringir el acceso a VPC endpoints específicos o a IP de origen. El acceso dentro de una cuenta se concede si la política de identidad o la política del bucket lo permiten y nada lo deniega explícitamente; el acceso entre cuentas requiere que ambos lados lo permitan. La configuración S3 Block Public Access anula las políticas de bucket que harían públicos los datos.",
   "Las políticas de claves de AWS Key Management Service (KMS) son especiales: toda clave de KMS debe tener una, y es el control principal. Las políticas de IAM conceden acceso a una clave solo si la política de la clave lo permite, normalmente mediante la declaración predeterminada que da acceso completo al principal raíz de la cuenta, lo que en la práctica delega en IAM. Sin esa declaración, ni siquiera la política de IAM de un administrador puede usar la clave. Para el uso entre cuentas, la política de la clave debe nombrar a la otra cuenta y las políticas de IAM de esa cuenta también deben permitir las acciones de KMS. Los grants son un mecanismo adicional para la delegación temporal y programática del uso de la clave a servicios de AWS."
  ],
  "terms": [
   [
    "Resource-based policy (política basada en recursos)",
    "Una política asociada a un recurso que nombra a los principales a los que se permite acceder a él."
   ],
   [
    "Function policy (política de función)",
    "La política basada en recursos de una función Lambda que autoriza a servicios o cuentas a invocarla."
   ],
   [
    "Bucket policy (política de bucket)",
    "Una política basada en recursos en un bucket de S3 que controla el acceso e impone condiciones a las solicitudes."
   ],
   [
    "Key policy (política de clave)",
    "La política basada en recursos obligatoria de una clave de KMS; las políticas de IAM solo funcionan si ella lo permite."
   ],
   [
    "Confused deputy (suplente confundido)",
    "Una situación en la que se engaña a un servicio de confianza para que actúe en nombre de la parte equivocada, lo que se evita con las condiciones SourceArn y SourceAccount."
   ]
  ],
  "example": "Un desarrollador crea con la CLI una suscripción de un tema de SNS a una función Lambda, pero los mensajes nunca la disparan. La política de la función no tiene ninguna declaración que permita a sns.amazonaws.com. Ejecutar lambda add-permission con el ARN del tema como ARN de origen corrige la entrega.",
  "tip": "Las fuentes basadas en empuje (S3, SNS, API Gateway, EventBridge) necesitan permiso en la política basada en recursos de la función. Las fuentes basadas en sondeo (SQS, Kinesis, DynamoDB Streams) necesitan permisos en el rol de ejecución.",
  "check": [
   [
    "¿Por qué S3 necesita una política de función de Lambda pero SQS no?",
    "S3 invoca la función directamente, así que la función debe permitir al principal de S3; con SQS, Lambda sondea la cola usando los permisos del rol de ejecución."
   ],
   [
    "Un administrador con permisos completos de IAM no puede usar una clave de KMS. ¿Por qué podría ser?",
    "La política de la clave no permite a la raíz de la cuenta ni al administrador, así que las políticas de IAM no se respetan para esa clave."
   ],
   [
    "¿Cómo puedes obligar a que todo el acceso a un bucket de S3 use HTTPS?",
    "Agrega una política de bucket que deniegue todas las acciones cuando la condición aws:SecureTransport sea false."
   ]
  ]
 },
 {
  "t": "Cross-account access with STS AssumeRole and trust policies; temporary credentials",
  "tt": "Acceso entre cuentas con STS AssumeRole y políticas de confianza; credenciales temporales",
  "body": [
   "Las organizaciones operan muchas cuentas de AWS, y las aplicaciones a menudo necesitan llegar a recursos de otra cuenta: una canalización de compilación que despliega en producción, un proceso de informes que lee el bucket de una cuenta de datos. La forma estándar y segura de hacerlo es que quien llama asuma un rol en la cuenta de destino y reciba credenciales de corta duración, en lugar de crear usuarios de IAM con claves de larga duración en cada cuenta.",
   "Dos políticas en el rol de destino hacen que esto funcione. La política de confianza (la política basada en recursos del rol, también llamada política de asunción de rol) dice quién puede asumir el rol: su `Principal` nombra la cuenta o el rol específico de confianza, y la acción es `sts:AssumeRole`. La política de permisos dice qué puede hacer el rol una vez asumido. Del lado de quien llama, su propia política de identidad debe permitir `sts:AssumeRole` sobre el ARN del rol de destino. Ambos lados deben estar de acuerdo; esa es la regla para todo acceso entre cuentas.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Principal\": { \"AWS\": \"arn:aws:iam::111122223333:role/ci-deployer\" },\n    \"Action\": \"sts:AssumeRole\",\n    \"Condition\": { \"StringEquals\": { \"sts:ExternalId\": \"example-external-id\" } }\n  }]\n}\n```",
   "Luego quien llama invoca la API `AssumeRole` de AWS Security Token Service (STS) con el ARN del rol y un nombre de sesión. STS devuelve credenciales temporales: un ID de clave de acceso, una clave de acceso secreta y un token de sesión, además de una hora de expiración. La sesión dura una hora por defecto; puedes solicitar desde 15 minutos hasta la duración máxima de sesión configurada en el rol (que puede fijarse hasta en 12 horas). El código usa los tres valores, y el token de sesión es lo que distingue las credenciales temporales de las de larga duración. Cuando las credenciales expiran, quien llama debe volver a asumir el rol; los proveedores de credenciales de asunción de rol del SDK y los perfiles de la CLI con `role_arn` y `source_profile` se renuevan automáticamente.",
   "Un ID externo (external ID) es un valor semisecreto que un tercero debe pasar al asumir un rol en tu cuenta, exigido mediante una condición en la política de confianza. Protege contra el problema del suplente confundido cuando un proveedor atiende a muchos clientes. También se puede exigir autenticación multifactor (MFA) con la condición `aws:MultiFactorAuthPresent`. Cuando un rol asumido se usa para asumir otro, lo que se llama encadenamiento de roles (role chaining), la sesión se limita a una hora.",
   "STS tiene API relacionadas que conviene reconocer: `AssumeRoleWithWebIdentity` intercambia un token de un proveedor OpenID Connect (OIDC), como el token de identidad de un sistema de CI o Cognito, por credenciales de AWS; `AssumeRoleWithSAML` hace lo mismo para proveedores de identidad SAML; `GetSessionToken` devuelve credenciales temporales para un usuario de IAM, normalmente para cumplir un requisito de MFA; `GetCallerIdentity` te dice a quién pertenecen las credenciales actuales; y `DecodeAuthorizationMessage` decodifica el mensaje codificado que algunos servicios devuelven con una falla de autorización, lo que te ayuda a ver qué política denegó una solicitud.",
   "Cada acción realizada con un rol asumido se registra en AWS CloudTrail con el nombre de la sesión del rol, así que elige nombres de sesión significativos (como el ID de ejecución de la canalización) para facilitar la auditoría. En la cuenta de destino, las acciones aparecen como realizadas por el rol, y el nombre de sesión muestra quién lo usó."
  ],
  "terms": [
   [
    "Trust policy (política de confianza)",
    "La política basada en recursos de un rol de IAM que especifica qué principales pueden asumirlo."
   ],
   [
    "AssumeRole",
    "La API de STS que devuelve credenciales temporales de un rol a quien llama si es de confianza."
   ],
   [
    "Temporary credentials (credenciales temporales)",
    "Un ID de clave de acceso, una clave de acceso secreta y un token de sesión que expiran después de una duración establecida."
   ],
   [
    "External ID (ID externo)",
    "Un valor exigido en una condición de la política de confianza que los terceros deben proporcionar al asumir un rol, lo que evita ataques de suplente confundido."
   ],
   [
    "Role chaining (encadenamiento de roles)",
    "Usar las credenciales de un rol asumido para asumir otro rol; las sesiones se limitan a una hora."
   ]
  ],
  "example": "Un proyecto de CodeBuild en una cuenta de herramientas despliega en una cuenta de producción. Producción tiene un rol de despliegue cuya política de confianza permite al rol de servicio del proyecto de compilación, y la política del rol de compilación permite sts:AssumeRole sobre ese ARN. El buildspec ejecuta aws sts assume-role, exporta los tres valores devueltos como variables de entorno y ejecuta el despliegue.",
  "tip": "El acceso entre cuentas necesita ambos lados: la política de confianza del rol de destino debe confiar en quien llama, y la política de IAM de quien llama debe permitir sts:AssumeRole sobre el rol. Si falta alguno, obtienes AccessDenied.",
  "check": [
   [
    "¿Qué tres valores componen las credenciales temporales?",
    "Un ID de clave de acceso, una clave de acceso secreta y un token de sesión."
   ],
   [
    "¿Qué política de un rol decide quién puede asumirlo?",
    "La política de confianza (documento de política de asunción de rol)."
   ],
   [
    "¿Qué API de STS usaría un sistema de CI con un token OIDC para obtener credenciales de AWS sin claves almacenadas?",
    "AssumeRoleWithWebIdentity."
   ]
  ]
 },
 {
  "t": "Amazon Cognito: user pools (sign-up, sign-in, ID/access/refresh tokens) vs identity pools (temporary AWS credentials)",
  "tt": "Amazon Cognito: grupos de usuarios (registro, inicio de sesión, tokens de ID/acceso/actualización) vs grupos de identidades (credenciales temporales de AWS)",
  "body": [
   "Amazon Cognito proporciona identidad para los usuarios finales de tu aplicación: los clientes de una aplicación móvil o web, no usuarios de IAM. Tiene dos componentes con funciones distintas, y elegir entre ellos es una de las preguntas más comunes de DVA-C02.",
   "Un grupo de usuarios (user pool) es un directorio de usuarios y un servicio de autenticación. Se encarga del registro (con verificación por correo electrónico o teléfono), el inicio de sesión, las políticas de contraseñas, MFA, la recuperación de cuentas y una interfaz de inicio de sesión alojada, y puede federarse con proveedores sociales (como Google o Apple) y con proveedores de identidad empresariales SAML u OIDC. Después de un inicio de sesión exitoso, el grupo de usuarios emite JSON Web Tokens (JWT). El token de ID contiene afirmaciones (claims) sobre la identidad del usuario (como `email`, `sub` y la pertenencia a grupos) y está pensado para que tu aplicación sepa quién es el usuario. El token de acceso contiene scopes y grupos y está pensado para autorizar llamadas a API, incluidas API Gateway con un autorizador de Cognito y las propias API de usuario del grupo de usuarios. El token de actualización (refresh token) es de larga duración y se usa para obtener nuevos tokens de ID y de acceso sin volver a iniciar sesión. Los tokens de ID y de acceso son de corta duración (una hora por defecto); los tokens de actualización duran 30 días por defecto y son configurables. Tu backend valida los JWT comprobando la firma con las claves públicas del grupo de usuarios y verificando el emisor, la audiencia o el ID de cliente, y la expiración.",
   "Los disparadores de Lambda te permiten personalizar los flujos del grupo de usuarios: pre sign-up (confirmar automáticamente o bloquear usuarios), post confirmation (escribir un perfil en DynamoDB), pre token generation (agregar claims personalizados), custom message y desafíos de autenticación personalizados.",
   "Un grupo de identidades (identity pool, identidades federadas) hace algo distinto: intercambia un token de un proveedor de identidad por credenciales temporales de AWS, para que la aplicación pueda llamar directamente a servicios de AWS como S3 o DynamoDB. Los proveedores compatibles incluyen un grupo de usuarios de Cognito, proveedores sociales, proveedores SAML y OIDC, y tus propias identidades autenticadas por el desarrollador. Los grupos de identidades también pueden emitir credenciales para usuarios no autenticados (invitados) si lo habilitas. Tras bambalinas, el grupo de identidades llama a `AssumeRoleWithWebIdentity` de STS para asumir un rol de IAM: un rol para los usuarios autenticados y otro para los invitados, o roles elegidos por reglas o por claims del token.",
   "El acceso detallado se logra con variables de política. Por ejemplo, una política de rol puede permitir el acceso al prefijo de S3 `private/${cognito-identity.amazonaws.com:sub}/*` o usar la condición `dynamodb:LeadingKeys` para que cada usuario solo pueda leer elementos de DynamoDB cuya clave de partición sea igual a su propio ID de identidad.",
   "Para no confundirlos: los grupos de usuarios responden '¿quién es este usuario?' y devuelven JWT; los grupos de identidades responden '¿a qué recursos de AWS puede llegar directamente este usuario?' y devuelven credenciales de AWS. Muchas aplicaciones usan ambos: inician sesión con un grupo de usuarios y luego intercambian el token de ID en el grupo de identidades por credenciales para subir archivos a S3."
  ],
  "terms": [
   [
    "User pool (grupo de usuarios)",
    "Un directorio de usuarios de Cognito que gestiona el registro y el inicio de sesión y emite tokens JWT de ID, de acceso y de actualización."
   ],
   [
    "Identity pool (grupo de identidades)",
    "Un componente de Cognito que intercambia tokens de proveedores de identidad por credenciales temporales de AWS mediante roles de IAM."
   ],
   [
    "ID token (token de ID)",
    "Un JWT que contiene claims sobre la identidad del usuario autenticado."
   ],
   [
    "Access token (token de acceso)",
    "Un JWT que contiene scopes y grupos, usado para autorizar solicitudes a API."
   ],
   [
    "Refresh token (token de actualización)",
    "Un token de larga duración que se usa para obtener nuevos tokens de ID y de acceso sin volver a autenticarse."
   ]
  ],
  "example": "Una aplicación de fotos inicia la sesión de los usuarios con un grupo de usuarios de Cognito. Luego la aplicación pasa el token de ID a un grupo de identidades, recibe credenciales temporales para un rol autenticado y sube las fotos directamente a S3 bajo private/ seguido del ID de identidad del usuario, al que la política del rol restringe a cada usuario.",
  "tip": "Si el escenario necesita registro, inicio de sesión o tokens para una API, elige un grupo de usuarios. Si los usuarios deben acceder directamente desde el dispositivo a servicios de AWS como S3 o DynamoDB, o los invitados necesitan acceso limitado, elige un grupo de identidades.",
  "check": [
   [
    "¿Qué componente de Cognito entrega credenciales temporales de AWS?",
    "Un grupo de identidades, que asume un rol de IAM para el usuario mediante STS."
   ],
   [
    "¿Para qué se usa el token de actualización?",
    "Para obtener nuevos tokens de ID y de acceso cuando expiran, sin que el usuario tenga que volver a iniciar sesión."
   ],
   [
    "¿Cómo puedes agregar un claim personalizado a los tokens?",
    "Usa un disparador de Lambda pre token generation en el grupo de usuarios."
   ]
  ]
 },
 {
  "t": "API Gateway authorization: IAM (SigV4), Cognito user pool authorizers, Lambda authorizers, API keys and usage plans",
  "tt": "Autorización en API Gateway: IAM (SigV4), autorizadores de grupos de usuarios de Cognito, autorizadores Lambda, claves de API y planes de uso",
  "body": [
   "Amazon API Gateway puede comprobar quién llama antes de que una solicitud llegue a tu backend. Cada método (o ruta, en las HTTP API) elige un tipo de autorización, y el examen espera que asocies la opción con el tipo de cliente que llama.",
   "La autorización de IAM (`AWS_IAM`) exige que las solicitudes estén firmadas con AWS Signature Version 4 (SigV4) usando credenciales de AWS. API Gateway verifica la firma y comprueba que la política de IAM de quien llama permita `execute-api:Invoke` sobre el ARN del método. Es la opción natural para quienes ya tienen credenciales de AWS: otros servicios de AWS, herramientas internas o usuarios de la aplicación que recibieron credenciales temporales de un grupo de identidades de Cognito. Las políticas de recursos en las REST API pueden además restringir el acceso por cuenta, IP de origen o VPC endpoint, que es como se protegen las API privadas.",
   "Un autorizador de grupo de usuarios de Cognito valida un JWT de un grupo de usuarios de Cognito, que el cliente envía en un encabezado como `Authorization`. API Gateway comprueba por sí mismo la firma y la expiración, sin que tengas que escribir código. En las REST API, si configuras scopes de OAuth en el método, el cliente debe enviar un token de acceso que contenga uno de ellos; sin scopes, funciona un token de ID. Las HTTP API ofrecen un autorizador JWT general que funciona con Cognito o con cualquier emisor compatible con OIDC. Tu backend puede leer los claims verificados desde el contexto de la solicitud.",
   "Un autorizador Lambda (antes llamado autorizador personalizado) ejecuta tu propia función para decidir. Un autorizador basado en token recibe un único valor de encabezado, como un bearer token; un autorizador basado en solicitud recibe encabezados, cadenas de consulta, variables de etapa y contexto. La función valida la credencial como quieras (un proveedor OAuth de terceros, un sistema de sesiones heredado) y devuelve un documento de política de IAM que permite o deniega `execute-api:Invoke`, más un `principalId` y valores de contexto opcionales que se pasan al backend. API Gateway puede guardar en caché la política devuelta durante un TTL configurable (300 segundos por defecto), con la fuente de identidad como clave, lo que reduce la latencia y el costo; ten cuidado de que la política en caché cubra todos los recursos que llamará el usuario, o las solicitudes posteriores podrían denegarse por error.",
   "Las claves de API y los planes de uso no son autenticación. Una clave de API es un identificador que el cliente envía en el encabezado `x-api-key`; puede compartirse o filtrarse, así que solo identifica qué cliente está llamando. Los planes de uso asocian claves de API con límites de limitación (solicitudes por segundo y ráfaga) y cuotas (solicitudes por día, semana o mes) para etapas específicas. Uso típico: ofrecer niveles gratuitos y de pago de una API pública. Combina las claves de API con un autorizador real si la API necesita seguridad. Cuando un cliente supera los límites recibe HTTP 429 Too Many Requests; una clave ausente o inválida en un método que la exige devuelve 403 Forbidden.",
   "Resumen: quienes llaman desde dentro o con credenciales de AWS usan IAM; los usuarios que iniciaron sesión en tu aplicación usan un autorizador de Cognito; los tokens de otros sistemas de identidad o la lógica personalizada usan un autorizador Lambda; la medición y la limitación por cliente usan claves de API con planes de uso."
  ],
  "terms": [
   [
    "IAM authorization (autorización de IAM)",
    "Autorización de API Gateway que exige solicitudes firmadas con SigV4 y una política de IAM que permita execute-api:Invoke."
   ],
   [
    "Cognito user pool authorizer (autorizador de grupo de usuarios de Cognito)",
    "Un autorizador de API Gateway que valida los JWT emitidos por un grupo de usuarios de Cognito sin código personalizado."
   ],
   [
    "Lambda authorizer (autorizador Lambda)",
    "Una función que recibe un token o parámetros de la solicitud y devuelve una política de IAM que permite o deniega la solicitud."
   ],
   [
    "Usage plan (plan de uso)",
    "Una configuración de API Gateway que aplica límites de limitación y cuotas a las claves de API asociadas a ella."
   ]
  ],
  "example": "Una empresa expone una API del clima. Los usuarios móviles inician sesión con Cognito, así que las rutas públicas usan un autorizador de grupo de usuarios de Cognito. Los socios que se integran desde sus servidores reciben claves de API asociadas a un plan de uso Gold que permite 100 solicitudes por segundo, y cada solicitud de socio también pasa por un autorizador Lambda que valida un token firmado por el socio.",
  "tip": "Las claves de API sirven para identificar clientes y aplicar planes de uso, no para proteger una API. Si una pregunta necesita validación de tokens personalizada o de terceros, elige un autorizador Lambda; para tokens de Cognito sin código, elige un autorizador de Cognito.",
  "check": [
   [
    "¿Qué devuelve un autorizador Lambda?",
    "Un documento de política de IAM que permite o deniega execute-api:Invoke, un principalId y valores de contexto opcionales."
   ],
   [
    "¿Qué tipo de autorización debe usar un servicio interno con un rol de IAM para llamar a una API?",
    "La autorización de IAM, firmando las solicitudes con SigV4."
   ],
   [
    "¿Qué respuesta recibe un cliente por superar la limitación de un plan de uso?",
    "HTTP 429 Too Many Requests."
   ]
  ]
 },
 {
  "t": "Encryption at rest: SSE-S3, SSE-KMS, SSE-C, S3 Bucket Keys, client-side encryption with the AWS Encryption SDK",
  "tt": "Cifrado en reposo: SSE-S3, SSE-KMS, SSE-C, S3 Bucket Keys, cifrado del lado del cliente con AWS Encryption SDK",
  "body": [
   "El cifrado en reposo protege los datos almacenados si los medios de almacenamiento o las copias de seguridad quedan expuestos. En Amazon S3 eliges quién administra las claves y dónde ocurre el cifrado, y las preguntas del examen te dan requisitos como auditoría, control de claves o confianza cero en AWS que apuntan a una opción.",
   "El cifrado del lado del servidor significa que S3 cifra el objeto cuando lo escribe y lo descifra cuando un usuario autorizado lo lee, de forma transparente. SSE-S3 usa claves que S3 administra por completo, con AES-256; no haces nada más que solicitarlo con el encabezado `x-amz-server-side-encryption: AES256`. S3 ahora aplica SSE-S3 como cifrado predeterminado para todos los objetos nuevos, así que todo objeto está cifrado en reposo a menos que elijas otra cosa.",
   "SSE-KMS cifra con una clave de AWS Key Management Service (KMS), y se solicita con `x-amz-server-side-encryption: aws:kms` y opcionalmente `x-amz-server-side-encryption-aws-kms-key-id`. Puedes usar la clave administrada por AWS para S3 (`aws/s3`) o tu propia clave administrada por el cliente. Beneficios: cada uso de la clave se registra en CloudTrail, controlas la política de la clave y su rotación, y leer un objeto requiere tanto el permiso de S3 como `kms:Decrypt` sobre la clave, lo que da separación de funciones. Las cargas necesitan `kms:GenerateDataKey`. Como cada operación sobre un objeto llama a KMS, tasas de solicitudes muy altas pueden alcanzar las cuotas de solicitudes de KMS y costar más; esta es la principal desventaja de SSE-KMS. SSE-KMS de doble capa (DSSE-KMS) aplica dos capas de cifrado para cargas de trabajo con ese requisito de cumplimiento.",
   "Las S3 Bucket Keys reducen ese tráfico hacia KMS. Con una Bucket Key habilitada, S3 usa KMS para crear una clave de corta duración a nivel de bucket y deriva de ella claves de datos por objeto, así que llama a KMS con mucha menos frecuencia. Esto reduce los costos de solicitudes a KMS y el riesgo de limitación, sin dejar de usar SSE-KMS. CloudTrail muestra entonces el bucket, y no cada objeto, como contexto de cifrado.",
   "SSE-C (cifrado del lado del servidor con claves proporcionadas por el cliente) significa que envías tu propia clave de 256 bits con cada solicitud en encabezados; S3 la usa para cifrar o descifrar y luego la descarta, guardando solo un hash con sal para validar las solicitudes posteriores. Debes administrar la clave y nunca perderla, y las solicitudes deben usar HTTPS (S3 rechaza SSE-C sobre HTTP). Además, no está disponible desde la consola para las cargas.",
   "El cifrado del lado del cliente significa que tu aplicación cifra los datos antes de enviarlos, así que S3 solo almacena texto cifrado y AWS nunca ve el texto plano. AWS Encryption SDK es una biblioteca del lado del cliente que implementa el cifrado de sobre (envelope encryption) por ti: obtiene una clave de datos de un keyring o proveedor de clave maestra (a menudo respaldado por KMS), cifra tus datos con ella y guarda la clave de datos cifrada junto al texto cifrado en un formato de mensaje portable. Amazon S3 Encryption Client es una opción relacionada especializada en objetos de S3.",
   "Para imponer el cifrado, configura el cifrado predeterminado del bucket (por ejemplo, SSE-KMS con tu clave) y usa una política de bucket que deniegue las solicitudes `s3:PutObject` que especifiquen un tipo de cifrado distinto del requerido."
  ],
  "terms": [
   [
    "SSE-S3",
    "Cifrado del lado del servidor con claves administradas por completo por S3, usando AES-256; el valor predeterminado para los objetos nuevos."
   ],
   [
    "SSE-KMS",
    "Cifrado del lado del servidor con una clave de KMS, que ofrece auditoría en CloudTrail y control mediante la política de la clave."
   ],
   [
    "SSE-C",
    "Cifrado del lado del servidor con una clave proporcionada por el cliente, enviada en cada solicitud HTTPS y que S3 no almacena."
   ],
   [
    "S3 Bucket Key",
    "Una clave a nivel de bucket derivada de KMS que reduce el número de llamadas a KMS, el costo y la limitación en SSE-KMS."
   ],
   [
    "AWS Encryption SDK",
    "Una biblioteca del lado del cliente que realiza cifrado de sobre para que los datos se cifren antes de salir de la aplicación."
   ]
  ],
  "example": "Una startup del sector salud necesita un registro de auditoría de quién descifró los archivos de pacientes y debe poder revocar el acceso al instante. Usa SSE-KMS con una clave administrada por el cliente; revocar kms:Decrypt de un rol en la política de la clave bloquea las lecturas incluso para usuarios con acceso a S3. A medida que crece el volumen de cargas y aparece la limitación de KMS, habilita las S3 Bucket Keys.",
  "tip": "¿Registro de auditoría y control del uso de la clave? SSE-KMS. ¿Limitación o costo de KMS con SSE-KMS? Habilita las Bucket Keys. ¿Tú administras las claves y S3 nunca debe almacenarlas? SSE-C (solo HTTPS). ¿AWS nunca debe ver el texto plano? Cifrado del lado del cliente.",
  "check": [
   [
    "¿Qué permiso adicional requiere leer un objeto cifrado con SSE-KMS?",
    "kms:Decrypt sobre la clave de KMS, además de s3:GetObject."
   ],
   [
    "¿Por qué las solicitudes con SSE-C deben usar HTTPS?",
    "Porque la clave de cifrado se envía en los encabezados de la solicitud, y S3 rechaza las solicitudes SSE-C hechas sobre HTTP."
   ],
   [
    "¿Qué problema resuelven las S3 Bucket Keys?",
    "Reducen el número de solicitudes de S3 a KMS, lo que baja el costo y el riesgo de limitación de KMS en SSE-KMS."
   ]
  ]
 },
 {
  "t": "AWS KMS: customer managed vs AWS managed keys, envelope encryption with GenerateDataKey, 4 KB Encrypt limit, cross-account key use",
  "tt": "AWS KMS: claves administradas por el cliente vs administradas por AWS, cifrado de sobre con GenerateDataKey, límite de 4 KB de Encrypt, uso de claves entre cuentas",
  "body": [
   "AWS Key Management Service (KMS) crea y controla claves criptográficas cuyo material de clave nunca sale de KMS sin cifrar. Servicios como S3, DynamoDB, Lambda y Secrets Manager llaman a KMS por ti, y tu propio código puede llamarlo directamente.",
   "Hay distintos tipos de claves de KMS según quién las administra. Las claves administradas por AWS (alias como `aws/s3` o `aws/lambda`) se crean automáticamente cuando usas el cifrado predeterminado de un servicio; puedes verlas y ver su uso en CloudTrail, pero no puedes cambiar su política de clave, y rotan automáticamente cada año. Las claves administradas por el cliente son las que tú creas; controlas la política de la clave, los grants, la habilitación y deshabilitación, la eliminación (con un período de espera de 7 a 30 días), las etiquetas y los alias, y puedes activar la rotación automática. Solo las claves administradas por el cliente pueden compartirse con otras cuentas o recibir políticas detalladas, así que requisitos como 'controlar quién puede usar la clave' o 'entre cuentas' apuntan a ellas. (Las claves propiedad de AWS, que los servicios usan internamente en cuentas de AWS que no puedes ver, son una tercera categoría.)",
   "La API `Encrypt` puede cifrar directamente como máximo 4 KB de texto plano. Eso está bien para una contraseña o un secreto pequeño, pero no para un archivo. Para datos más grandes, usa el cifrado de sobre (envelope encryption): cifra los datos con una clave de datos y cifra la clave de datos con la clave de KMS. Llama a `GenerateDataKey` con el ID de tu clave de KMS; KMS devuelve la clave de datos en dos formas, en texto plano y cifrada con la clave de KMS. Tu código cifra los datos localmente con la clave de datos en texto plano (por ejemplo, con AES-GCM), descarta de la memoria la clave en texto plano y guarda la clave de datos cifrada junto al texto cifrado. Para descifrar, llama a `Decrypt` sobre la clave de datos cifrada para recuperar la clave en texto plano y luego descifra los datos localmente. `GenerateDataKeyWithoutPlaintext` devuelve solo la copia cifrada, útil cuando un componente cifrará más tarde.",
   "El cifrado de sobre es más rápido (los datos grandes nunca viajan a KMS), más barato (una llamada a KMS por clave de datos, no por byte) y evita el límite de 4 KB. Tanto AWS Encryption SDK como SSE-KMS de S3 lo usan internamente.",
   "Un contexto de cifrado (encryption context) es un conjunto de pares clave-valor no secretos que pasas con Encrypt o GenerateDataKey; los mismos pares deben proporcionarse para descifrar. Agrega comprobaciones de integridad y aparece en CloudTrail, lo que hace más claras las auditorías. Cuando las solicitudes fallan con `ThrottlingException`, has alcanzado las cuotas de solicitudes de KMS; las respuestas incluyen guardar en caché las claves de datos (Encryption SDK lo admite), usar S3 Bucket Keys, reintentar con retroceso o solicitar un aumento de cuota.",
   "Para el uso entre cuentas se requieren dos cosas: la política de la clave en la cuenta de la clave debe permitir a la otra cuenta (o a un rol específico de ella) usar la clave, y en la otra cuenta una política de IAM debe conceder al usuario o rol las acciones de KMS sobre el ARN de esa clave. Las claves administradas por AWS no pueden usarse así porque sus políticas de clave no se pueden editar. Las claves son regionales; las claves multirregión te permiten descifrar en otra región sin volver a cifrar."
  ],
  "terms": [
   [
    "Customer managed key (clave administrada por el cliente)",
    "Una clave de KMS que creas y controlas, incluida su política de clave, su rotación y el acceso entre cuentas."
   ],
   [
    "AWS managed key (clave administrada por AWS)",
    "Una clave de KMS creada por un servicio de AWS para tu cuenta, con una política de clave fija que no puedes cambiar."
   ],
   [
    "Envelope encryption (cifrado de sobre)",
    "Cifrar los datos con una clave de datos y luego cifrar esa clave de datos con una clave de KMS."
   ],
   [
    "GenerateDataKey",
    "Una API de KMS que devuelve una clave de datos en texto plano y cifrada para el cifrado local."
   ],
   [
    "Encryption context (contexto de cifrado)",
    "Pares clave-valor no secretos vinculados a una operación de cifrado de KMS que deben coincidir al descifrar."
   ]
  ],
  "example": "Una aplicación debe cifrar archivos de logs de 50 MB antes de almacenarlos. Llamar a Encrypt falla porque solo acepta 4 KB. En su lugar, el código llama a GenerateDataKey, cifra el archivo localmente con la clave de datos en texto plano, descarta esa clave y guarda la clave de datos cifrada como metadatos del objeto junto al archivo.",
  "tip": "Cualquier pregunta con datos de más de 4 KB y KMS apunta al cifrado de sobre con GenerateDataKey. Los requisitos de uso entre cuentas o de política de clave personalizada descartan las claves administradas por AWS.",
  "check": [
   [
    "¿Qué devuelve GenerateDataKey?",
    "Una clave de datos en texto plano para el cifrado local inmediato y una copia de la misma clave cifrada con la clave de KMS para almacenarla."
   ],
   [
    "¿Por qué no puedes compartir una clave administrada por AWS con otra cuenta?",
    "Su política de clave la controla AWS y no se puede editar, así que no puede conceder acceso a otras cuentas."
   ],
   [
    "Menciona dos formas de reducir la limitación de KMS.",
    "Guardar en caché las claves de datos (por ejemplo con Encryption SDK) y habilitar S3 Bucket Keys; también reintentar con retroceso o solicitar un aumento de cuota."
   ]
  ]
 },
 {
  "t": "Encryption in transit: TLS, ACM certificates (us-east-1 for CloudFront), enforcing aws:SecureTransport",
  "tt": "Cifrado en tránsito: TLS, certificados de ACM (us-east-1 para CloudFront), imponer aws:SecureTransport",
  "body": [
   "El cifrado en tránsito protege los datos que se mueven por las redes contra la escucha y la manipulación. En AWS esto casi siempre significa Transport Layer Security (TLS), el protocolo detrás de HTTPS. Todos los endpoints de API de los servicios de AWS admiten TLS, y los SDK y la CLI usan HTTPS por defecto.",
   "TLS funciona haciendo que el servidor presente un certificado emitido por una autoridad de certificación de confianza, que demuestra que es dueño del nombre de dominio; luego el cliente y el servidor acuerdan claves de sesión y cifran todo lo que sigue. Para tus propios endpoints necesitas un certificado para tu dominio. AWS Certificate Manager (ACM) aprovisiona certificados TLS públicos sin costo adicional para usarlos con servicios integrados, valida la propiedad del dominio por DNS (la opción preferida, ya que así la renovación es automática) o por correo electrónico, y renueva los certificados automáticamente. También puedes importar certificados de terceros en ACM, pero ACM no puede renovarlos. Los certificados de ACM se despliegan en servicios integrados, como Elastic Load Balancing, Amazon CloudFront, API Gateway y Elastic Beanstalk; con los certificados públicos estándar de ACM, en general no puedes exportar la clave privada para instalarla en tu propio servidor web en EC2.",
   "Los certificados de ACM son recursos regionales, y esto importa para uno de los favoritos del examen: CloudFront es un servicio global que solo usa certificados de la región US East (N. Virginia), `us-east-1`. Si tu distribución de CloudFront, o un dominio personalizado de API Gateway optimizado para el borde (edge-optimized, que usa CloudFront internamente), no encuentra tu certificado, probablemente lo solicitaste en otra región. Un dominio personalizado regional de API Gateway o un Application Load Balancer usa un certificado de su propia región.",
   "También importa dónde termina TLS. Un Application Load Balancer puede terminar TLS y reenviar HTTP simple a los destinos en una red privada, o volver a cifrar hacia los destinos si se requiere cifrado de extremo a extremo. Un Network Load Balancer puede terminar TLS o dejarlo pasar hasta los destinos.",
   "Imponer TLS en S3 usa la clave de condición global `aws:SecureTransport`, que es true cuando la solicitud llegó por HTTPS. Una política de bucket que deniega todas las acciones cuando es false bloquea cualquier acceso por HTTP simple, sin importar los permisos de IAM de quien llama, porque la denegación explícita gana.",
   "```json\n{\n  \"Effect\": \"Deny\",\n  \"Principal\": \"*\",\n  \"Action\": \"s3:*\",\n  \"Resource\": [\"arn:aws:s3:::my-bucket\", \"arn:aws:s3:::my-bucket/*\"],\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n}\n```",
   "La misma clave de condición funciona en las políticas de temas de SNS y de colas de SQS. En otros servicios, impón TLS exponiendo solo listeners HTTPS, redirigiendo HTTP a HTTPS (política de protocolo del espectador de CloudFront o una regla de listener del ALB), exigiendo TLS en la configuración de conexión a la base de datos y usando políticas de seguridad con versión mínima de TLS en los balanceadores de carga, CloudFront y los dominios personalizados de API Gateway."
  ],
  "terms": [
   [
    "TLS",
    "Transport Layer Security, el protocolo que cifra y autentica conexiones de red como HTTPS."
   ],
   [
    "AWS Certificate Manager (ACM)",
    "Un servicio que aprovisiona, despliega y renueva automáticamente certificados TLS para servicios de AWS integrados."
   ],
   [
    "aws:SecureTransport",
    "Una clave de condición global de IAM que es true cuando una solicitud se hizo sobre TLS."
   ],
   [
    "TLS termination (terminación de TLS)",
    "El punto donde se descifra el tráfico cifrado, como un balanceador de carga o CloudFront."
   ]
  ],
  "example": "Un equipo solicita un certificado de ACM para shop.example.com en eu-west-1 e intenta asociarlo a su distribución de CloudFront, pero no aparece en la lista. Solicitan el certificado de nuevo en us-east-1, lo validan con el mismo registro DNS, y CloudFront ya puede usarlo.",
  "tip": "CloudFront (y los dominios de API Gateway optimizados para el borde) necesitan certificados de ACM en us-east-1. Para forzar HTTPS en un bucket de S3, deniega en la política del bucket las solicitudes en las que aws:SecureTransport sea false.",
  "check": [
   [
    "¿Por qué un certificado creado en ap-southeast-2 no aparece para CloudFront?",
    "CloudFront solo usa certificados de ACM de la región us-east-1."
   ],
   [
    "¿Qué condición de política de bucket bloquea el acceso HTTP a S3?",
    "Una declaración Deny con la condición Bool aws:SecureTransport igual a false."
   ],
   [
    "¿Por qué se prefiere la validación por DNS para los certificados de ACM?",
    "Mientras el registro CNAME permanezca en su lugar, ACM puede renovar el certificado automáticamente."
   ]
  ]
 },
 {
  "t": "Secrets and configuration: Secrets Manager (rotation) vs Systems Manager Parameter Store (SecureString, tiers)",
  "tt": "Secretos y configuración: Secrets Manager (rotación) vs Systems Manager Parameter Store (SecureString, niveles)",
  "body": [
   "Las aplicaciones necesitan valores de configuración (ajustes de funcionalidades, URL de endpoints, nombres de tablas) y secretos (contraseñas de bases de datos, claves de API). Ambos deben vivir fuera del código, en un servicio que controle el acceso con IAM y registre el uso en CloudTrail. AWS ofrece dos opciones principales, y el examen normalmente te pide elegir entre ellas.",
   "AWS Systems Manager Parameter Store es un almacén jerárquico de clave-valor para configuración y secretos. Los parámetros tienen nombres con forma de ruta, como `/myapp/prod/db-url`, lo que te permite obtener una rama completa con `GetParametersByPath` y controlar el acceso por ruta en las políticas de IAM. Los tipos son `String`, `StringList` y `SecureString`; los valores SecureString se cifran con una clave de KMS (la clave administrada por AWS `aws/ssm` o tu clave administrada por el cliente) y se devuelven descifrados cuando pasas `WithDecryption=true` y tienes el permiso `kms:Decrypt`. Los parámetros conservan un historial de versiones. Hay dos niveles: los parámetros Standard son gratuitos, con un tamaño máximo de valor menor (4 KB) y una cuota de cantidad por región; los parámetros Advanced permiten valores más grandes (8 KB) y políticas de parámetros como fechas de expiración y notificaciones, y tienen costo. El rendimiento Standard basta para la mayoría de las aplicaciones; se puede habilitar un rendimiento mayor con costo adicional.",
   "AWS Secrets Manager está hecho específicamente para secretos. Su función estrella es la rotación automática: según una programación, Secrets Manager invoca una función Lambda de rotación que crea una nueva credencial, la configura en la base de datos o el servicio, la prueba y la marca como actual. AWS proporciona funciones de rotación listas para usar para Amazon RDS, Aurora, Redshift y DocumentDB, y puedes escribir las tuyas para otros sistemas. Durante la rotación, las etiquetas de preparación (staging labels: `AWSCURRENT`, `AWSPENDING`, `AWSPREVIOUS`) llevan el control de las versiones para que las aplicaciones siempre lean un valor que funciona. Secrets Manager también admite la replicación de secretos entre regiones, políticas basadas en recursos para el acceso entre cuentas y la generación de contraseñas aleatorias. Siempre se cifra con KMS y tiene un cargo mensual por secreto más cargos por llamadas a la API.",
   "Cómo elegir: si el requisito menciona rotación automática de credenciales de bases de datos, réplicas de secretos entre regiones o integración con RDS, elige Secrets Manager. Si enfatiza bajo costo, valores de configuración simples, una jerarquía de ajustes o guardar configuración no secreta junto con algunos valores cifrados, elige Parameter Store con SecureString. Parameter Store también puede referenciar secretos de Secrets Manager mediante una ruta especial, lo que da una sola API para ambos.",
   "En Lambda, obtén los secretos en la inicialización (fuera del handler) y guárdalos en caché durante un período, en lugar de hacerlo en cada invocación, para reducir la latencia y los costos de API. La extensión AWS Parameters and Secrets Lambda Extension ofrece una caché local por HTTP para esto. En CloudFormation, las referencias dinámicas como `{{resolve:secretsmanager:MySecret:SecretString:password}}` y `{{resolve:ssm-secure:/myapp/db-pass}}` (para las propiedades de recursos compatibles) inyectan los valores en el momento del despliegue sin ponerlos en la plantilla. Nunca guardes secretos en variables de entorno en texto plano ni en el control de código fuente."
  ],
  "terms": [
   [
    "Secrets Manager rotation (rotación de Secrets Manager)",
    "Un proceso programado en el que una función Lambda reemplaza la credencial de un secreto tanto en el secreto como en el servicio de destino."
   ],
   [
    "SecureString",
    "Un tipo de parámetro de Parameter Store cuyo valor se cifra con una clave de KMS."
   ],
   [
    "Parameter hierarchy (jerarquía de parámetros)",
    "Nombres de parámetros con forma de ruta que agrupan ajustes y permiten obtenerlos y controlarlos con IAM por ruta."
   ],
   [
    "Advanced parameter (parámetro Advanced)",
    "Un nivel de pago de Parameter Store con valores más grandes y políticas de parámetros como la expiración."
   ],
   [
    "Staging label (etiqueta de preparación)",
    "Una etiqueta como AWSCURRENT o AWSPENDING que marca qué versión de un secreto está en uso."
   ]
  ],
  "example": "Un equipo de cumplimiento exige que la contraseña de Aurora de producción cambie cada 30 días sin tiempo de inactividad. Los desarrolladores la guardan en Secrets Manager con la función de rotación integrada para Aurora en una programación de 30 días, y sus funciones Lambda leen el secreto mediante la extensión de caché, así que los valores nuevos se toman en cuestión de minutos.",
  "tip": "La rotación automática es la palabra clave para Secrets Manager. La forma más barata de guardar configuración y algunos valores cifrados, organizados en una jerarquía: Parameter Store con SecureString.",
  "check": [
   [
    "¿Qué servicio rota automáticamente las credenciales de RDS?",
    "AWS Secrets Manager, usando una función Lambda de rotación."
   ],
   [
    "¿Qué se necesita para leer un SecureString en texto plano?",
    "Llamar a GetParameter con WithDecryption en true y tener el permiso kms:Decrypt sobre la clave usada."
   ],
   [
    "Menciona una característica de los parámetros Advanced que no tienen los Standard.",
    "Las políticas de parámetros, como la expiración, o tamaños de valor más grandes (8 KB en lugar de 4 KB)."
   ]
  ]
 },
 {
  "t": "Keeping sensitive data out of code and logs: default credential chain, no hardcoded keys, CloudWatch Logs data protection masking",
  "tt": "Mantener los datos sensibles fuera del código y de los logs: cadena predeterminada de credenciales, sin claves codificadas, enmascaramiento con la protección de datos de CloudWatch Logs",
  "body": [
   "Muchas filtraciones reales empiezan con un secreto en el lugar equivocado: una clave de acceso subida a un repositorio público, una contraseña de base de datos dentro de una imagen de contenedor o el número de tarjeta de un cliente impreso en un log de depuración. El examen comprueba que sepas adónde deben ir los datos sensibles y adónde no, y qué funciones de AWS ayudan.",
   "Nunca codifiques claves de acceso de AWS en el código fuente, archivos de configuración, imágenes de contenedor o variables de entorno en texto plano. El código que se ejecuta en AWS debe basarse en la cadena predeterminada de proveedores de credenciales, que encuentra automáticamente credenciales temporales del rol de ejecución de Lambda, el rol de tarea de ECS o el perfil de instancia de EC2 y las renueva. En la laptop de un desarrollador, usa perfiles con nombre con IAM Identity Center (SSO) o credenciales de corta duración en lugar de claves de larga duración de usuarios de IAM. En sistemas de CI/CD fuera de AWS, usa la federación OIDC con `AssumeRoleWithWebIdentity` en lugar de guardar claves como secretos de la canalización. Si alguna vez se expone una clave, desactívala y elimínala de inmediato, y luego investiga su uso en CloudTrail; asume que fue usada.",
   "Los secretos de la aplicación, como contraseñas de bases de datos y claves de API de terceros, van en Secrets Manager o en SecureString de Parameter Store, y se obtienen en tiempo de ejecución mediante un rol que tenga permiso para leer solo ese secreto. Mantenlos fuera del control de código fuente (usa `.gitignore` para los archivos env locales), fuera de las plantillas de CloudFormation (usa referencias dinámicas y parámetros `NoEcho`) y fuera de los logs de compilación. Las herramientas de detección de secretos en repositorios y canalizaciones de CI pueden señalar los secretos que se cuelan en el código.",
   "Los logs son la otra fuga. Registra lo que necesitas para solucionar problemas (ID de solicitud, nombres de operaciones, códigos de error, tiempos) pero no contraseñas, tokens, números de tarjeta completos ni datos personales. Evita registrar por defecto los eventos entrantes completos o los encabezados de las solicitudes, ya que pueden contener encabezados `Authorization` o información personal; registra en su lugar un subconjunto depurado. El logging estructurado en JSON con campos explícitos hace esto más fácil de controlar que imprimir objetos completos.",
   "La protección de datos de Amazon CloudWatch Logs agrega una red de seguridad. Asocias una política de protección de datos a un grupo de logs (o a toda la cuenta) que usa identificadores de datos administrados para tipos sensibles comunes, como direcciones de correo electrónico, números de tarjetas de crédito, claves secretas de AWS y diversos identificadores nacionales, y puede incluir identificadores personalizados que defines con expresiones regulares. Los datos que coinciden se enmascaran cuando se ven en la consola, Logs Insights, las suscripciones y las exportaciones; solo los principales con el permiso `logs:Unmask` pueden ver los valores originales. La política también puede producir hallazgos de auditoría, enviados a CloudWatch Logs, S3 o Amazon Data Firehose, para que sepas que se están registrando datos sensibles y puedas corregir el código. El enmascaramiento solo se aplica a los datos ingeridos después de que la política está en vigor.",
   "Otras capas: cifra los grupos de logs con una clave de KMS si es necesario, configura períodos de retención de logs en lugar de conservarlos para siempre y restringe con IAM quién puede leer los grupos de logs. Para los datos en S3, Amazon Macie puede descubrir datos sensibles en los buckets."
  ],
  "terms": [
   [
    "Hardcoded credentials (credenciales codificadas)",
    "Claves de acceso o contraseñas escritas directamente en el código o en los artefactos, fáciles de filtrar y difíciles de rotar."
   ],
   [
    "Data protection policy (política de protección de datos)",
    "Una política de CloudWatch Logs que detecta y enmascara datos sensibles en los eventos de log usando identificadores de datos."
   ],
   [
    "Managed data identifier (identificador de datos administrado)",
    "Un patrón predefinido para un tipo de dato sensible, como números de tarjetas de crédito, usado por la protección de datos de CloudWatch Logs."
   ],
   [
    "logs:Unmask",
    "El permiso de IAM que permite a un principal ver los valores sensibles enmascarados en CloudWatch Logs."
   ]
  ],
  "example": "Un equipo de pagos descubre una instrucción de depuración que registra los cuerpos completos de las solicitudes, incluidos los números de tarjeta. La eliminan y además asocian a los grupos de logs del servicio una política de protección de datos con el identificador administrado de tarjetas de crédito. Las filtraciones accidentales futuras aparecen enmascaradas, solo el equipo de seguridad tiene logs:Unmask, y los hallazgos de auditoría les avisan si vuelven a aparecer datos de tarjetas.",
  "tip": "Para el código en AWS, la respuesta correcta es un rol obtenido mediante la cadena predeterminada de credenciales, no claves de acceso en ningún lugar. Para los datos sensibles en los logs, la respuesta nativa de AWS es una política de protección de datos de CloudWatch Logs.",
  "check": [
   [
    "¿Qué debe hacer un desarrollador con una clave de acceso subida por accidente a un repositorio público?",
    "Desactivarla y eliminarla de inmediato, revisar su uso en CloudTrail y cambiar el código a credenciales temporales basadas en roles o federadas."
   ],
   [
    "¿Quién puede ver el valor original de los datos enmascarados por la protección de datos de CloudWatch Logs?",
    "Solo los principales a los que se concedió el permiso logs:Unmask."
   ],
   [
    "¿Una política de protección de datos enmascara los eventos ya almacenados antes de su creación?",
    "No; se aplica a los eventos de log ingeridos después de que la política está en vigor."
   ]
  ]
 },
 {
  "t": "Presigned URLs for temporary S3 access; IAM Access Analyzer for least privilege",
  "tt": "URL prefirmadas para acceso temporal a S3; IAM Access Analyzer para el mínimo privilegio",
  "body": [
   "A veces un usuario sin credenciales de AWS necesita descargar o subir un objeto específico de S3: un cliente que obtiene el PDF de una factura, o una aplicación móvil que sube una foto de perfil. Hacer público el bucket lo expondría todo. Una URL prefirmada (presigned URL) resuelve esto concediendo acceso temporal a exactamente una operación sobre un objeto.",
   "Tu backend, ejecutándose con credenciales que tienen permiso para la operación, genera la URL con el SDK o la CLI. La URL incluye el bucket, la clave, la operación y la expiración, además de una firma SigV4 hecha con las credenciales de quien la generó. Cualquiera que tenga la URL puede realizar esa operación hasta que expire; S3 comprueba la firma y si la identidad firmante todavía tiene permiso en el momento de la solicitud. El objeto y el bucket siguen siendo privados.",
   "```python\nurl = s3.generate_presigned_url(\n    'get_object',\n    Params={'Bucket': 'invoices', 'Key': 'cust-42/inv-1001.pdf'},\n    ExpiresIn=300)  # segundos\n```",
   "Desde la CLI, `aws s3 presign s3://invoices/cust-42/inv-1001.pdf --expires-in 300` crea una URL de descarga. Para cargas, genera una URL prefirmada de `put_object` (o un POST prefirmado, que además te permite fijar condiciones como el tamaño máximo de archivo y el tipo de contenido para cargas desde formularios del navegador). Detalles importantes: la URL nunca puede conceder más que los permisos del firmante; deja de funcionar antes de tiempo si las credenciales firmantes expiran, por eso una URL generada por una función Lambda con credenciales de rol no puede sobrevivir a esa sesión de rol; con SigV4 la expiración máxima es de siete días; y una URL prefirmada es un bearer token, así que compártela solo por HTTPS y mantén expiraciones cortas. Para el contenido servido mediante CloudFront, las URL firmadas o las cookies firmadas de CloudFront son el equivalente.",
   "IAM Access Analyzer ayuda con la otra mitad del trabajo: asegurar que las políticas concedan solo lo necesario y que nada se comparta de forma involuntaria. Tiene varias capacidades. El análisis de acceso externo examina las políticas basadas en recursos de buckets de S3, claves de KMS, roles de IAM, funciones Lambda, colas SQS, secretos de Secrets Manager y otros recursos compatibles, y produce hallazgos cuando un recurso se comparte con un principal fuera de tu zona de confianza (tu cuenta u organización), como un bucket público o un rol en el que confía una cuenta desconocida. El análisis de acceso no utilizado encuentra roles, claves de acceso, contraseñas y permisos sin uso. La generación de políticas revisa tu actividad en CloudTrail para un rol o usuario durante un período y genera una política que contiene solo las acciones realmente usadas, lo cual es un excelente punto de partida para el mínimo privilegio. La validación de políticas revisa las políticas mientras las escribes en busca de errores, advertencias de seguridad y concesiones demasiado amplias, y las comprobaciones de políticas personalizadas pueden ejecutarse en CI/CD para bloquear cambios riesgosos antes del despliegue.",
   "Un flujo práctico de mínimo privilegio para un rol de aplicación: empieza con permisos amplios en desarrollo, ejecútalo con pruebas realistas, usa la generación de políticas de Access Analyzer a partir de la actividad de CloudTrail, afina la política generada con ARN de recursos específicos, valídala y revisa con el tiempo los hallazgos de acceso no utilizado."
  ],
  "terms": [
   [
    "Presigned URL (URL prefirmada)",
    "Una URL firmada con las credenciales de una identidad que concede acceso temporal a una operación específica de S3 sobre un objeto."
   ],
   [
    "Presigned POST (POST prefirmado)",
    "Una política de formulario firmada que permite cargas a S3 desde el navegador con condiciones como límites de tamaño y prefijos de clave."
   ],
   [
    "IAM Access Analyzer",
    "Un servicio que encuentra accesos compartidos externamente y sin uso, valida políticas y genera políticas de mínimo privilegio a partir de la actividad."
   ],
   [
    "Zone of trust (zona de confianza)",
    "La cuenta u organización que Access Analyzer considera interna al informar sobre el acceso externo."
   ]
  ],
  "example": "La función Lambda del backend de una aplicación de fotos genera una URL PUT prefirmada que expira en cinco minutos para la clave uploads/user-123/avatar.jpg. El teléfono sube directamente a S3 con esa URL, así que los archivos grandes nunca pasan por la API, y el bucket permanece totalmente privado.",
  "tip": "¿Acceso temporal a un objeto privado de S3 para alguien sin credenciales de AWS? URL prefirmada. Recuerda que la URL está limitada tanto por su expiración como por la vida útil y los permisos de las credenciales que la firmaron.",
  "check": [
   [
    "¿Por qué una URL prefirmada creada en Lambda podría dejar de funcionar antes de su tiempo ExpiresIn?",
    "Se firmó con las credenciales temporales del rol de ejecución, y la URL deja de ser válida cuando esas credenciales expiran."
   ],
   [
    "¿Puede una URL prefirmada conceder un acceso que el firmante no tiene?",
    "No; S3 evalúa los permisos del firmante, así que la URL solo puede permitir lo que el firmante tiene permitido hacer."
   ],
   [
    "¿Qué función de Access Analyzer construye una política basada en lo que un rol realmente hizo?",
    "La generación de políticas, que analiza la actividad del rol en CloudTrail."
   ]
  ]
 },
 {
  "t": "Preparing artifacts: .zip packages vs container images in ECR, Lambda layers, dependency packaging, CodeArtifact",
  "tt": "Preparar artefactos: paquetes .zip vs imágenes de contenedor en ECR, capas de Lambda, empaquetado de dependencias, CodeArtifact",
  "body": [
   "Antes de que el código pueda ejecutarse en Lambda u otro servicio, debe empaquetarse como un artefacto de despliegue. El examen evalúa los dos formatos de empaquetado de Lambda, sus límites y cómo administrar las dependencias de forma limpia.",
   "Un archivo .zip contiene tu código y sus dependencias. Puedes subirlo directamente (hasta 50 MB comprimido) o desde S3 para archivos más grandes, y el tamaño descomprimido de la función más todas sus capas debe ser como máximo de 250 MB. Lambda lo ejecuta en un runtime administrado como Python, Node.js o Java, que AWS parchea por ti. Una imagen de contenedor se construye a partir de un Dockerfile, normalmente basado en una imagen base proporcionada por AWS para tu runtime (que incluye el Lambda Runtime Interface Client), se sube a Amazon Elastic Container Registry (ECR) y la función la referencia. Las imágenes pueden tener hasta 10 GB, lo que se ajusta a dependencias grandes como las bibliotecas de machine learning, y te permiten reutilizar las herramientas de contenedores existentes. La contrapartida: debes reconstruir y volver a desplegar para recibir los parches del runtime, y la imagen debe estar en ECR en la misma región (el acceso a ECR entre cuentas es posible con permisos del repositorio). No puedes cambiar una función existente entre .zip e imagen; debes crear una función nueva.",
   "Las dependencias deben empaquetarse para el entorno de Lambda, que ejecuta Amazon Linux en x86_64 o arm64. Para los lenguajes interpretados, esto significa instalar las bibliotecas en el directorio del paquete, por ejemplo `pip install -r requirements.txt -t package/`, y luego comprimir la carpeta del paquete con tu handler. Las bibliotecas con código nativo compilado deben construirse para el sistema operativo y la arquitectura correctos; compilar en una Mac o en Windows puede producir binarios que fallan con errores de importación en Lambda. Compila dentro de un contenedor equivalente (por ejemplo con `sam build --use-container`) o usa wheels específicos de la plataforma. Mantén los paquetes pequeños excluyendo pruebas, dependencias de desarrollo y versiones del SDK que ya están en el runtime, a menos que necesites fijar una versión específica del SDK.",
   "Las capas de Lambda empaquetan por separado las dependencias compartidas o el código común para que muchas funciones puedan reutilizarlas y el paquete propio de cada función se mantenga pequeño (lo que además te permite editar el código en la consola). El contenido de las capas se extrae en `/opt`, y los runtimes buscan en subcarpetas específicas, por ejemplo `python/` para las bibliotecas de Python y `nodejs/node_modules/` para Node.js. Una función puede usar hasta cinco capas. Las capas también entregan extensiones de Lambda, como agentes de monitoreo.",
   "AWS CodeArtifact es un repositorio administrado de artefactos para paquetes de software: npm, PyPI, Maven, NuGet y otros. Un dominio agrupa repositorios, y los repositorios pueden tener repositorios upstream y conexiones externas (por ejemplo, al registro público de npm), así que tus compilaciones obtienen los paquetes públicos a través de una copia controlada y en caché, mientras que también publicas paquetes internos privados. Los desarrolladores y CodeBuild se autentican con un token de corta duración, por ejemplo `aws codeartifact login --tool pip --domain my-domain --repository my-repo`, que configura el gestor de paquetes. Esto da compilaciones consistentes, una auditoría de qué paquetes se usan y protección si un paquete público desaparece."
  ],
  "terms": [
   [
    ".zip deployment package (paquete de despliegue .zip)",
    "Un archivo con el código de la función y sus dependencias que se despliega en un runtime administrado de Lambda."
   ],
   [
    "Container image function (función de imagen de contenedor)",
    "Una función Lambda empaquetada como una imagen OCI de hasta 10 GB, almacenada en Amazon ECR."
   ],
   [
    "Amazon ECR",
    "Elastic Container Registry, el registro administrado de AWS para imágenes de contenedor."
   ],
   [
    "AWS CodeArtifact",
    "Un repositorio de paquetes administrado que actúa como proxy de registros públicos y aloja paquetes privados para las herramientas de compilación."
   ]
  ],
  "example": "La función de un equipo de ciencia de datos necesita 3 GB de bibliotecas de Python, muy por encima del límite de 250 MB descomprimidos para paquetes .zip. Construyen una imagen de contenedor a partir de la imagen base de Python de AWS, la suben a ECR y crean la función a partir del URI de la imagen.",
  "tip": "Dependencias de más de 250 MB descomprimidas apuntan a imágenes de contenedor (hasta 10 GB). Los errores de importación de bibliotecas nativas suelen significar que el paquete se compiló en un sistema operativo o arquitectura distintos a los de Lambda.",
  "check": [
   [
    "¿Cuál es el tamaño máximo de una imagen de contenedor de Lambda?",
    "10 GB."
   ],
   [
    "¿Dónde queda disponible el contenido de las capas dentro del entorno de ejecución?",
    "Bajo /opt, en subdirectorios específicos del runtime como /opt/python."
   ],
   [
    "¿Por qué usar las conexiones externas de CodeArtifact?",
    "Para obtener los paquetes públicos a través de un repositorio administrado y en caché, de modo que las compilaciones sean consistentes, auditables y resistentes a cambios en el registro público."
   ]
  ]
 },
 {
  "t": "AWS SAM: template structure, sam build, sam deploy --guided, sam local invoke / start-api, samconfig.toml",
  "tt": "AWS SAM: estructura de la plantilla, sam build, sam deploy --guided, sam local invoke / start-api, samconfig.toml",
  "body": [
   "AWS Serverless Application Model (SAM) es un framework de código abierto para construir aplicaciones sin servidor. Tiene dos partes: un formato de plantilla que extiende CloudFormation con tipos de recursos sin servidor concisos, y la SAM CLI, que las compila, las prueba localmente y las despliega.",
   "Una plantilla de SAM es una plantilla de CloudFormation con una línea esencial: `Transform: AWS::Serverless-2016-10-31`. Esa línea le indica a CloudFormation que expanda los recursos de SAM en recursos completos de CloudFormation durante el despliegue. Los principales tipos de recursos de SAM son `AWS::Serverless::Function`, `AWS::Serverless::Api` y `AWS::Serverless::HttpApi`, `AWS::Serverless::SimpleTable` (una tabla básica de DynamoDB), `AWS::Serverless::LayerVersion`, `AWS::Serverless::StateMachine` y `AWS::Serverless::Application` (aplicaciones anidadas). Una sección `Globals` define propiedades compartidas por todas las funciones, como el runtime, el tiempo de espera y las variables de entorno. Todavía puedes incluir cualquier recurso normal de CloudFormation, `Parameters` y `Outputs`.",
   "```yaml\nTransform: AWS::Serverless-2016-10-31\nGlobals:\n  Function:\n    Runtime: python3.12\n    Timeout: 10\nResources:\n  GetOrder:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: app.handler\n      CodeUri: src/\n      Policies:\n        - DynamoDBReadPolicy:\n            TableName: !Ref Orders\n      Events:\n        Api:\n          Type: Api\n          Properties: { Path: /orders/{id}, Method: get }\n  Orders:\n    Type: AWS::Serverless::SimpleTable\n```",
   "Observa cuánto incluye la definición de una función: la propiedad `Events` crea el disparador (aquí una ruta de API Gateway, y el permiso correspondiente), y `Policies` acepta plantillas de políticas de SAM como `DynamoDBReadPolicy` o `S3ReadPolicy` que se expanden en declaraciones de IAM de mínimo privilegio. Las funciones también pueden definir `AutoPublishAlias` y `DeploymentPreference` para desplegar mediante CodeDeploy con desplazamiento de tráfico canary o lineal.",
   "El flujo de trabajo típico: `sam init` crea un proyecto a partir de una plantilla. `sam build` resuelve las dependencias y prepara los artefactos en `.aws-sam/build` (agrega `--use-container` para compilar dependencias nativas en un contenedor similar a Lambda). `sam deploy --guided` pregunta el nombre del stack, la región, los valores de los parámetros y si se deben confirmar los cambios, y luego guarda tus respuestas en `samconfig.toml`, así que los despliegues posteriores solo necesitan `sam deploy`. Internamente, deploy empaqueta los artefactos en un bucket de S3 (SAM puede crear un bucket administrado por ti) y crea o actualiza un stack de CloudFormation mediante un change set. `samconfig.toml` puede contener entornos separados, por ejemplo secciones `[default]` y `[prod]` que se seleccionan con `--config-env prod`.",
   "Las pruebas locales usan Docker para emular el entorno de Lambda. `sam local invoke GetOrder -e events/get.json` ejecuta una función una vez con un evento de prueba; `sam local generate-event` crea eventos de ejemplo para fuentes como S3 o SQS. `sam local start-api` ejecuta un servidor HTTP local que emula las rutas de API Gateway, para que puedas probar con un navegador o con curl. `sam local start-lambda` emula el endpoint de invocación de Lambda para pruebas basadas en el SDK. Para iterar más rápido en la nube, `sam sync --watch` envía los cambios de código directamente a un stack de desarrollo, y `sam logs` muestra en vivo los logs de CloudWatch de una función."
  ],
  "terms": [
   [
    "Transform: AWS::Serverless-2016-10-31",
    "La declaración de plantilla que hace que CloudFormation procese los tipos de recursos de SAM."
   ],
   [
    "sam build",
    "El comando de la SAM CLI que instala las dependencias y prepara los artefactos de despliegue."
   ],
   [
    "sam deploy --guided",
    "Un despliegue interactivo que solicita la configuración y la guarda en samconfig.toml."
   ],
   [
    "sam local start-api",
    "Ejecuta una emulación local de las rutas de API Gateway respaldadas por funciones que se ejecutan en Docker."
   ],
   [
    "SAM policy template (plantilla de políticas de SAM)",
    "Una política de IAM con nombre y parámetros, como DynamoDBReadPolicy, que se usa en la propiedad Policies de una función."
   ]
  ],
  "example": "Un desarrollador cambia un handler, ejecuta sam build, luego sam local start-api y llama al endpoint con curl para confirmar la nueva respuesta. Satisfecho, ejecuta sam deploy, que lee el nombre del stack y la región guardados en samconfig.toml desde el primer despliegue guiado.",
  "tip": "La línea Transform es lo que identifica una plantilla de SAM. Para probar una API localmente, el comando es sam local start-api; para un solo evento, sam local invoke. sam deploy --guided escribe samconfig.toml.",
  "check": [
   [
    "¿Qué línea debe incluir una plantilla de SAM?",
    "Transform: AWS::Serverless-2016-10-31."
   ],
   [
    "¿Dónde se guardan las respuestas de sam deploy --guided?",
    "En samconfig.toml, en el directorio del proyecto."
   ],
   [
    "¿Qué requiere sam local invoke en tu máquina?",
    "Docker, porque ejecuta la función en un contenedor que emula Lambda."
   ]
  ]
 },
 {
  "t": "CloudFormation: templates, parameters, outputs and exports, Fn::ImportValue, change sets, packaging local artifacts to S3",
  "tt": "CloudFormation: plantillas, parámetros, salidas y exportaciones, Fn::ImportValue, change sets, empaquetado de artefactos locales en S3",
  "body": [
   "AWS CloudFormation es el servicio de infraestructura como código de AWS: describes los recursos en una plantilla (YAML o JSON), y CloudFormation los crea, actualiza y elimina en conjunto como un stack, en el orden correcto, revirtiendo los cambios si algo falla. Tanto SAM como el CDK terminan produciendo CloudFormation, así que sus conceptos aparecen en todo el examen.",
   "Las secciones de una plantilla: `AWSTemplateFormatVersion` y `Description`; `Parameters` (entradas proporcionadas en el momento del despliegue, con tipos como `String`, `Number` o `AWS::EC2::KeyPair::KeyName` y tipos de parámetros de SSM, además de restricciones como `AllowedValues`, y `NoEcho` para ocultar valores sensibles); `Mappings` (tablas de búsqueda estáticas, por ejemplo ID de AMI por región, que se leen con `Fn::FindInMap`); `Conditions` (crear recursos solo, por ejemplo, en producción); `Transform` (para SAM o macros); `Resources` (la única sección obligatoria); y `Outputs`. Las funciones intrínsecas conectan las cosas: `Ref` devuelve el valor de un parámetro o el identificador principal de un recurso, `Fn::GetAtt` devuelve un atributo como un ARN, `Fn::Sub` sustituye variables dentro de cadenas, y `Fn::Join`, `Fn::Select` y `Fn::If` ayudan a construir valores. Los pseudoparámetros como `AWS::Region` y `AWS::AccountId` evitan codificar valores.",
   "Las salidas (Outputs) devuelven valores después del despliegue, como la URL de una API. Una salida con un nombre de `Export` pone el valor a disposición de otros stacks en la misma cuenta y región, que lo leen con `Fn::ImportValue`. Así es como un stack de red comparte los ID de la VPC y de las subredes con los stacks de aplicación. Los nombres de exportación deben ser únicos dentro de la región, y CloudFormation no te permite eliminar un stack, ni cambiar un valor exportado, mientras otro stack lo importe. Los stacks anidados (`AWS::CloudFormation::Stack`) son la alternativa para componentes reutilizables que se despliegan como parte de un stack padre.",
   "```yaml\n# stack de red\nOutputs:\n  VpcId:\n    Value: !Ref Vpc\n    Export:\n      Name: !Sub '${AWS::StackName}-VpcId'\n# stack de aplicación\n  VpcId: !ImportValue network-VpcId\n```",
   "Actualizar un stack puede modificar los recursos en el lugar, interrumpirlos o reemplazarlos (por ejemplo, cambiar el esquema de claves de una tabla de DynamoDB crea una tabla nueva). Un change set te permite previsualizar exactamente lo que hará una actualización antes de ejecutarla, lo cual importa para cualquier cosa con datos. La detección de desviaciones (drift detection) muestra los recursos modificados fuera de CloudFormation. `DeletionPolicy: Retain` o `Snapshot` protege los datos cuando se elimina un recurso o un stack, y las políticas de stack pueden impedir actualizaciones a recursos críticos. Si la creación falla, el stack se revierte por defecto; para solucionar problemas, busca el primer evento fallido en la pestaña Events del stack.",
   "Las plantillas pueden apuntar a código local, como `CodeUri: ./src` para una función Lambda o un archivo de plantilla anidada. Esas rutas locales deben subirse antes del despliegue. `aws cloudformation package --template-file template.yaml --s3-bucket my-artifacts --output-template-file packaged.yaml` comprime y sube los artefactos locales a S3 y escribe una nueva plantilla con los URI de S3 en su lugar. Luego `aws cloudformation deploy --template-file packaged.yaml --stack-name my-app --capabilities CAPABILITY_IAM` crea un change set y lo ejecuta. El reconocimiento `CAPABILITY_IAM` o `CAPABILITY_NAMED_IAM` es obligatorio cuando la plantilla crea recursos de IAM, y `CAPABILITY_AUTO_EXPAND` cuando usa macros o transformaciones. `sam package` y `sam deploy` hacen el mismo trabajo."
  ],
  "terms": [
   [
    "Stack",
    "Un conjunto de recursos de AWS creados y administrados en conjunto a partir de una plantilla de CloudFormation."
   ],
   [
    "Export (exportación)",
    "Un valor de salida que se pone a disposición de otros stacks en la misma región y que se lee con Fn::ImportValue."
   ],
   [
    "Change set (conjunto de cambios)",
    "Una vista previa de los cambios que CloudFormation hará en un stack, que revisas y luego ejecutas."
   ],
   [
    "aws cloudformation package",
    "Sube a S3 los artefactos locales referenciados por una plantilla y genera una plantilla con las ubicaciones en S3."
   ],
   [
    "CAPABILITY_IAM",
    "Un reconocimiento obligatorio al desplegar una plantilla que crea o modifica recursos de IAM."
   ]
  ],
  "example": "El stack de red de un equipo de plataforma exporta los ID de sus subredes privadas. La plantilla del servicio de pedidos usa Fn::ImportValue para colocar sus funciones Lambda en esas subredes. Más tarde, el equipo de plataforma intenta eliminar el stack de red y CloudFormation se niega, porque el stack de pedidos todavía importa la exportación.",
  "tip": "Comparte valores entre stacks independientes con Outputs Export más Fn::ImportValue. Previsualiza las actualizaciones riesgosas con un change set. Despliega plantillas con rutas de código local ejecutando primero cloudformation package.",
  "check": [
   [
    "¿Qué sección de una plantilla es obligatoria?",
    "Resources."
   ],
   [
    "¿Por qué no se puede eliminar un stack cuando su exportación se importa en otro lugar?",
    "CloudFormation bloquea la eliminación o el cambio de una exportación de la que depende otro stack hasta que el stack que la importa deje de usarla."
   ],
   [
    "¿Qué error obtienes al desplegar una plantilla que crea roles de IAM sin reconocerlo, y cómo lo corriges?",
    "Un error InsufficientCapabilities; agrega --capabilities CAPABILITY_IAM o CAPABILITY_NAMED_IAM."
   ]
  ]
 },
 {
  "t": "AWS CDK basics: constructs, cdk bootstrap, cdk synth, cdk deploy",
  "tt": "Fundamentos de AWS CDK: constructs, cdk bootstrap, cdk synth, cdk deploy",
  "body": [
   "AWS Cloud Development Kit (CDK) te permite definir la infraestructura en un lenguaje de programación de propósito general, como TypeScript, Python, Java, C# o Go, en lugar de escribir YAML. Tu código se sintetiza en plantillas de CloudFormation, que luego CloudFormation despliega. Obtienes bucles, condiciones, clases, autocompletado en el IDE y pruebas unitarias para tu infraestructura, conservando la administración segura de stacks de CloudFormation.",
   "Todo en el CDK es un construct: un bloque de construcción que representa uno o más recursos de AWS. Los constructs se organizan en un árbol. En la parte superior hay una `App`; contiene uno o más constructs `Stack`, cada uno de los cuales se convierte en un stack de CloudFormation; los stacks contienen constructs de recursos. Los constructs vienen en tres niveles. Los constructs L1 se corresponden uno a uno con los recursos de CloudFormation y se nombran con el prefijo `Cfn`, como `CfnBucket`; tú configuras cada propiedad. Los constructs L2, como `s3.Bucket` o `lambda.Function`, son clases seleccionadas de más alto nivel, con valores predeterminados sensatos y métodos auxiliares. Los constructs L3, también llamados patrones, combinan varios recursos para una arquitectura común, por ejemplo una API Gateway respaldada por una función Lambda, o un servicio Fargate con balanceo de carga.",
   "```python\nfrom aws_cdk import App, Stack, aws_s3 as s3, aws_lambda as _lambda\n\nclass ImageStack(Stack):\n    def __init__(self, scope, id, **kw):\n        super().__init__(scope, id, **kw)\n        bucket = s3.Bucket(self, 'Uploads', versioned=True)\n        fn = _lambda.Function(self, 'Resize',\n            runtime=_lambda.Runtime.PYTHON_3_12,\n            handler='app.handler',\n            code=_lambda.Code.from_asset('src'))\n        bucket.grant_read(fn)  # agrega una política de IAM de mínimo privilegio\n\napp = App()\nImageStack(app, 'ImageStack')\napp.synth()\n```",
   "La llamada a `grant_read` muestra una fortaleza de los constructs L2: los métodos auxiliares crean por ti permisos de IAM con el alcance correcto, así que escribes la intención en lugar de una política en JSON.",
   "El flujo de trabajo de la CLI tiene algunos comandos que debes conocer. `cdk init app --language python` crea un proyecto. `cdk bootstrap` debe ejecutarse una vez por cuenta y región antes del primer despliegue: crea un stack de CloudFormation (llamado `CDKToolkit` por defecto) con un bucket de S3 y un repositorio de ECR para los assets, como el código de Lambda y las imágenes de Docker, además de los roles de IAM que el CDK usa para desplegar. Si ves un error de que el entorno no está preparado (bootstrapped), o de que el bucket de assets no existe, ejecuta `cdk bootstrap aws://ACCOUNT-ID/REGION`. `cdk synth` ejecuta tu aplicación y emite la plantilla de CloudFormation (en el directorio `cdk.out`), lo cual es útil para revisarla y probarla. `cdk diff` compara tu código con lo que está desplegado. `cdk deploy` sintetiza, sube los assets y despliega los stacks mediante CloudFormation, pidiendo confirmación cuando se incluyen cambios relacionados con la seguridad, como nuevos permisos de IAM. `cdk destroy` elimina un stack.",
   "Como la salida es CloudFormation normal, se aplica todo el comportamiento de CloudFormation: reversiones ante fallas, desviaciones, políticas de retención (`removal_policy` en el CDK, donde muchos recursos con estado se conservan por defecto al eliminarse) y salidas (`CfnOutput`). Puedes hacer pruebas unitarias de las plantillas sintetizadas con el módulo de aserciones del CDK, por ejemplo comprobando que un bucket tenga el cifrado habilitado."
  ],
  "terms": [
   [
    "Construct",
    "El bloque de construcción básico del CDK que representa uno o más recursos de AWS, organizado en un árbol bajo una App."
   ],
   [
    "L2 construct (construct L2)",
    "Una clase del CDK de más alto nivel con valores predeterminados sensatos y métodos auxiliares, como s3.Bucket."
   ],
   [
    "cdk bootstrap",
    "Crea el stack CDKToolkit con un bucket de assets, un repositorio de ECR y roles de despliegue en una cuenta y región."
   ],
   [
    "cdk synth",
    "Ejecuta la aplicación del CDK y produce plantillas de CloudFormation en el directorio cdk.out."
   ]
  ],
  "example": "Un desarrollador ejecuta cdk deploy en una región nueva y obtiene un error de que el stack requiere bootstrapping porque falta un bucket de assets. Ejecuta cdk bootstrap una vez para esa cuenta y región, y el siguiente cdk deploy sube el asset con el código de Lambda y crea el stack.",
  "tip": "Si un primer despliegue del CDK falla porque falta el bucket de staging o el stack de bootstrap, la respuesta es cdk bootstrap. Para ver la plantilla de CloudFormation que producirá el CDK, usa cdk synth.",
  "check": [
   [
    "¿Con qué despliegan finalmente las aplicaciones del CDK?",
    "Con AWS CloudFormation, usando las plantillas producidas por la síntesis."
   ],
   [
    "¿Cuál es la diferencia entre un construct L1 y uno L2?",
    "Los constructs L1 (prefijo Cfn) se corresponden directamente con recursos de CloudFormation y tú configuras todas las propiedades; los constructs L2 agregan valores predeterminados y métodos auxiliares, como las funciones grant."
   ],
   [
    "¿Con qué frecuencia debe ejecutarse cdk bootstrap?",
    "Una vez por cada combinación de cuenta y región (y de nuevo si la plantilla de bootstrap necesita actualizarse)."
   ]
  ]
 },
 {
  "t": "Lambda versions and aliases; weighted aliases; CodeDeploy canary, linear and all-at-once traffic shifting with alarm rollback",
  "tt": "Versiones y alias de Lambda; alias ponderados; desplazamiento de tráfico canary, lineal y todo a la vez con CodeDeploy y reversión por alarmas",
  "body": [
   "Desplegar código nuevo de Lambda de forma segura significa poder dirigir a quienes llaman a una versión conocida, desplazar el tráfico gradualmente y revertir rápido. Las versiones y los alias proporcionan los bloques de construcción, y AWS CodeDeploy automatiza el desplazamiento.",
   "Cuando editas una función, cambias `$LATEST`, la copia de trabajo mutable. Publicar una versión (`aws lambda publish-version`) toma una instantánea inmutable del código y la configuración, numerada 1, 2, 3 y así sucesivamente. El código y la mayoría de los ajustes de una versión no pueden cambiar después, así que una versión es una unidad de despliegue confiable. Cada versión tiene su propio ARN: un ARN calificado termina en `:3` para la versión 3, mientras que un ARN no calificado se refiere a `$LATEST`.",
   "Un alias es un puntero con nombre a una versión, como `prod`, `staging` o `live`, con su propio ARN que termina en `:prod`. Quienes llaman y los disparadores (integraciones de API Gateway, mapeos de fuentes de eventos, notificaciones de S3) deben referenciar el alias, no un número de versión. Para publicar, actualizas el alias para que apunte a una nueva versión; para revertir, lo vuelves a apuntar a la anterior. La configuración de quien llama nunca cambia. Los alias también pueden tener su propia concurrencia aprovisionada y sus propios permisos en la política basada en recursos.",
   "Un alias ponderado divide el tráfico entre dos versiones: por ejemplo, `prod` envía el 90% de las invocaciones a la versión 3 y el 10% a la versión 4, usando una configuración de enrutamiento (`--routing-config AdditionalVersionWeights={\"4\"=0.1}`). Luego puedes observar las métricas de la nueva versión y aumentar el peso. Los alias no pueden apuntar a `$LATEST` con pesos; ambas deben ser versiones publicadas.",
   "AWS CodeDeploy automatiza el desplazamiento ponderado para Lambda. Una configuración de despliegue define el patrón: canary desplaza primero un porcentaje pequeño y luego el resto después de un intervalo (por ejemplo, `CodeDeployDefault.LambdaCanary10Percent5Minutes`: 10% durante cinco minutos y luego 100%); lineal desplaza incrementos iguales a intervalos fijos (por ejemplo, `LambdaLinear10PercentEvery1Minute`: 10% más cada minuto hasta llegar a 100%); todo a la vez (all-at-once) desplaza todo de inmediato. También puedes crear configuraciones personalizadas. Durante el despliegue, CodeDeploy supervisa las alarmas de CloudWatch que asocies, como alarmas de tasa de errores o de latencia para la nueva versión del alias. Si una alarma pasa al estado ALARM, CodeDeploy se detiene y revierte automáticamente el alias a la versión anterior. Las funciones hook (`BeforeAllowTraffic` y `AfterAllowTraffic`) pueden ejecutar pruebas de validación antes y después del desplazamiento, y un hook que falla también dispara la reversión.",
   "En SAM esto son solo unas líneas en la función: `AutoPublishAlias: live` publica una nueva versión en cada despliegue y mueve el alias `live`, y `DeploymentPreference` con `Type: Canary10Percent5Minutes`, una lista de `Alarms` y `Hooks` opcionales hace que CodeDeploy se encargue del desplazamiento de tráfico y la reversión."
  ],
  "terms": [
   [
    "$LATEST",
    "La versión mutable y no publicada de una función Lambda que refleja las ediciones más recientes de código y configuración."
   ],
   [
    "Version (versión)",
    "Una instantánea inmutable y numerada del código y la configuración de una función Lambda."
   ],
   [
    "Alias",
    "Un puntero con nombre a una versión de la función, opcionalmente ponderado entre dos versiones, con su propio ARN."
   ],
   [
    "Canary deployment (despliegue canary)",
    "Un desplazamiento de tráfico que envía primero un porcentaje pequeño a la nueva versión y luego el resto tras una espera."
   ],
   [
    "Linear deployment (despliegue lineal)",
    "Un desplazamiento de tráfico que mueve porcentajes iguales a la nueva versión a intervalos regulares."
   ]
  ],
  "example": "Un equipo usa SAM con AutoPublishAlias: live y DeploymentPreference Type Linear10PercentEvery1Minute, más una alarma sobre la métrica Errors de la función. A los cuatro minutos de una publicación, los errores se disparan, la alarma se activa y CodeDeploy regresa el alias live a la versión anterior sin que nadie cambie API Gateway.",
  "tip": "Canary son dos pasos (un porcentaje pequeño y luego todo); lineal son muchos pasos iguales. La reversión automática en CodeDeploy la activan las alarmas de CloudWatch o los hooks que fallan. En producción, apunta los disparadores a alias, nunca a $LATEST.",
  "check": [
   [
    "¿Por qué API Gateway debe llamar a un alias en lugar de a un número de versión?",
    "Para que las publicaciones y las reversiones solo requieran mover el alias, sin cambiar la integración de API Gateway."
   ],
   [
    "¿Qué hace LambdaCanary10Percent5Minutes?",
    "Desplaza el 10% del tráfico a la nueva versión, espera cinco minutos y luego desplaza el 90% restante."
   ],
   [
    "¿Qué dispara una reversión automática en un despliegue de Lambda con CodeDeploy?",
    "Una alarma de CloudWatch configurada que pasa al estado ALARM, o un hook BeforeAllowTraffic o AfterAllowTraffic que falla."
   ]
  ]
 },
 {
  "t": "API Gateway stages, stage variables, deployments, mock integrations, canary releases",
  "tt": "Etapas de API Gateway, variables de etapa, despliegues, integraciones mock, publicaciones canary",
  "body": [
   "En una REST API de Amazon API Gateway, editar recursos y métodos en la consola no cambia lo que ven quienes llaman. Los cambios solo entran en producción cuando creas un despliegue (deployment): una instantánea de la configuración de la API. Un despliegue se asocia a una etapa (stage), una referencia con nombre e invocable a esa instantánea, como `dev`, `test` o `prod`, accesible en una URL de invocación con la forma `{api-id}.execute-api.{region}.amazonaws.com/prod`. Olvidar desplegar después de una edición es una razón clásica por la que un cambio 'no funciona'. (Las HTTP API pueden habilitar el despliegue automático para una etapa.)",
   "Cada etapa tiene su propia configuración: límites de limitación, caché, logs y métricas de CloudWatch, trazas de X-Ray, un certificado de cliente para el backend y la asociación con una web ACL. Esto permite que `prod` tenga caché y logs detallados mientras `dev` sigue siendo barata.",
   "Las variables de etapa son pares nombre-valor definidos en una etapa que se comportan como variables de entorno para la API. Las referencias en la configuración de integración y en las plantillas de mapeo como `${stageVariables.name}`. El uso más común en el examen es apuntar cada etapa a un alias distinto de Lambda: configura la función de la integración como `my-function:${stageVariables.lambdaAlias}`, luego define `lambdaAlias` como `dev` en la etapa dev y `prod` en la etapa prod. Así, una sola definición de API sirve para todos los entornos. Recuerda que cada alias necesita un permiso en la política basada en recursos que permita a API Gateway invocarlo, que normalmente se agrega con la CLI para cada alias. Las variables de etapa también pueden guardar la URL de un backend HTTP o valores que se pasan a un autorizador Lambda.",
   "Las integraciones conectan un método con un backend: Lambda (proxy o personalizada), HTTP (proxy o personalizada), servicio de AWS (llamar directamente a una API de AWS, como `SendMessage` de SQS) y mock. Una integración mock devuelve una respuesta generada por el propio API Gateway a partir de una plantilla de mapeo, sin llamar a ningún backend. Úsala para que los equipos de front-end trabajen contra una API antes de que exista el backend, para devolver respuestas fijas en pruebas o para responder las solicitudes `OPTIONS` de preflight de CORS. Con las integraciones que no son proxy, las plantillas de mapeo escritas en Velocity Template Language (VTL) transforman las solicitudes y respuestas, y defines respuestas de método y de integración para mapear los códigos de estado.",
   "Una publicación canary en una etapa de REST API envía un porcentaje configurado del tráfico de la etapa a un nuevo despliegue, mientras el resto sigue usando el actual. El canary puede tener sus propias sobrescrituras de variables de etapa, así que puedes apuntar el tráfico canary a un nuevo alias de Lambda, y sus propias métricas y logs, para poder comparar el comportamiento. Cuando estés conforme, promueves el canary, lo que convierte su despliegue en el despliegue principal de la etapa; si no, eliminas la configuración del canary y todo el tráfico vuelve al despliegue existente.",
   "Los clientes también pueden llegar a una API mediante un nombre de dominio personalizado con mapeos de rutas base a etapas, de modo que `api.example.com/v1` se mapea a una etapa y quienes llaman nunca ven los nombres de las etapas. Los tipos de endpoint son optimizado para el borde (edge-optimized, a través de CloudFront), regional y privado (accesible solo desde una VPC mediante un VPC endpoint de interfaz)."
  ],
  "terms": [
   [
    "Deployment (despliegue)",
    "Una instantánea de la configuración de una REST API que debe crearse para que los cambios entren en producción en una etapa."
   ],
   [
    "Stage (etapa)",
    "Una referencia con nombre a un despliegue, con su propia URL y configuración, como caché, limitación y logs."
   ],
   [
    "Stage variable (variable de etapa)",
    "Un par nombre-valor en una etapa, referenciado como ${stageVariables.name} en integraciones y plantillas de mapeo."
   ],
   [
    "Mock integration (integración mock)",
    "Una integración en la que API Gateway devuelve una respuesta a partir de una plantilla de mapeo sin llamar a un backend."
   ],
   [
    "Canary release (publicación canary)",
    "Una configuración de etapa que enruta un porcentaje del tráfico a un nuevo despliegue antes de su promoción."
   ]
  ],
  "example": "La integración de la API de un equipo usa el ARN de función orders-fn:${stageVariables.alias}. La etapa dev define alias como dev y la etapa prod lo define como prod. Después de agregar un canary en prod con el 10% del tráfico y una sobrescritura del alias a prod-next, monitorean las métricas del canary durante una hora y luego lo promueven.",
  "tip": "¿Cambios que los clientes no ven? Olvidaste desplegar en la etapa. ¿Distintas etapas que llaman a distintos alias de Lambda desde una sola API? Variables de etapa, más un permiso de Lambda para cada alias.",
  "check": [
   [
    "¿Por qué los clientes podrían no ver un cambio de API hecho en la consola?",
    "Los cambios de una REST API solo entran en producción después de crear un nuevo despliegue en la etapa."
   ],
   [
    "¿Cómo haces que la etapa prod invoque el alias prod y la etapa dev el alias dev usando una sola integración?",
    "Referencia una variable de etapa en el ARN de la función, como my-function:${stageVariables.lambdaAlias}, defínela en cada etapa y concede a API Gateway permiso sobre cada alias."
   ],
   [
    "¿Cuándo es útil una integración mock?",
    "Para devolver respuestas fijas sin backend, como en el desarrollo temprano del front-end, en pruebas o en las respuestas de preflight de CORS."
   ]
  ]
 },
 {
  "t": "Elastic Beanstalk deployment policies: all at once, rolling, rolling with additional batch, immutable, traffic splitting, blue/green URL swap",
  "tt": "Políticas de despliegue de Elastic Beanstalk: todo a la vez, rolling, rolling con lote adicional, inmutable, división de tráfico, intercambio de URL blue/green",
  "body": [
   "AWS Elastic Beanstalk ejecuta aplicaciones web en instancias EC2 sin que tengas que configurar tú mismo la infraestructura. Subes una versión de la aplicación (un paquete de código fuente, por ejemplo un .zip), y Beanstalk aprovisiona balanceadores de carga, grupos de Auto Scaling e instancias para un entorno. La forma en que aplica una nueva versión a las instancias en ejecución la define la política de despliegue, y el examen espera que sopeses la velocidad, el tiempo de inactividad, el costo y la reversión de cada una.",
   "Todo a la vez (all at once) despliega la nueva versión en todas las instancias simultáneamente. Es la más rápida y no necesita instancias adicionales, pero la aplicación no está disponible durante el despliegue, y si la nueva versión está rota, todo está roto; revertir significa volver a desplegar la versión anterior. Adecuada para entornos de desarrollo.",
   "Rolling despliega en un lote de instancias a la vez (el tamaño del lote como número o porcentaje). Las instancias del lote actual se sacan de servicio, se actualizan y se devuelven antes de que empiece el siguiente lote. No hay costo adicional, pero la capacidad se reduce durante el despliegue, y por un tiempo ambas versiones atienden tráfico. Una falla deja algunas instancias en cada versión y requiere volver a desplegar manualmente.",
   "Rolling con lote adicional (rolling with additional batch) primero lanza un nuevo lote de instancias, así que se mantiene la capacidad completa en todo momento; luego procede como un despliegue rolling y termina el lote adicional al final. Cuesta un poco más durante un tiempo corto y se usa cuando producción debe mantener la capacidad completa.",
   "Inmutable (immutable) lanza un conjunto completo de instancias nuevas con la nueva versión en un grupo de Auto Scaling temporal, comprueba que pasen las verificaciones de estado, luego las mueve al grupo original y termina las instancias antiguas. Es la opción más segura dentro del mismo entorno: las instancias antiguas no se tocan hasta que las nuevas estén sanas, así que un despliegue fallido se revierte rápido terminando las instancias nuevas. Es más lenta y duplica temporalmente el costo de capacidad.",
   "La división de tráfico (traffic splitting) es una variante tipo canary de inmutable: se lanzan instancias nuevas, y el balanceador de carga les envía un porcentaje configurado del tráfico de los clientes durante un período de evaluación mientras se monitorea su estado. Si todo va bien, el tráfico se desplaza por completo; si no, Beanstalk regresa el tráfico y termina las instancias nuevas.",
   "Blue/green no es una política de despliegue sino una técnica: clonas el entorno (o creas uno nuevo) con la nueva versión, lo pruebas en su propia URL y luego usas Swap Environment URLs, que intercambia los registros CNAME de los dos entornos para que el nuevo reciba el tráfico de producción. Revertir es volver a intercambiarlos. Como depende de cambios de DNS, los clientes pueden tardar un poco en cambiar. Los recursos como una base de datos RDS creada dentro de un entorno están ligados a su ciclo de vida, así que las bases de datos de producción deben crearse fuera de Beanstalk y conectarse mediante configuración.",
   "Resumen para el examen: la más rápida con tiempo de inactividad es todo a la vez; sin costo adicional pero con capacidad reducida es rolling; capacidad completa es rolling con lote adicional; la más segura con reversión rápida es inmutable; las pruebas basadas en porcentaje con tráfico real son división de tráfico; cero tiempo de inactividad con un entorno separado y un intercambio de DNS es blue/green."
  ],
  "terms": [
   [
    "Deployment policy (política de despliegue)",
    "La configuración de Elastic Beanstalk que controla cómo se aplica una nueva versión de la aplicación a las instancias de un entorno."
   ],
   [
    "Rolling with additional batch (rolling con lote adicional)",
    "Una política que primero lanza un lote adicional de instancias para que la capacidad nunca baje durante un despliegue rolling."
   ],
   [
    "Immutable deployment (despliegue inmutable)",
    "Una política que despliega en un conjunto nuevo de instancias y las incorpora solo después de que estén sanas."
   ],
   [
    "Swap environment URLs (intercambiar las URL de los entornos)",
    "Una técnica blue/green que intercambia los CNAME de dos entornos de Beanstalk para mover el tráfico de producción."
   ]
  ],
  "example": "El entorno de Beanstalk de producción de una tienda en línea nunca debe bajar de su capacidad completa y debe revertir rápido si una publicación se comporta mal. Eligen despliegues inmutables, así la nueva versión se ejecuta en instancias nuevas que solo entran en servicio después de pasar las verificaciones de estado.",
  "tip": "Busca las palabras del requisito: costo mínimo con tiempo de inactividad aceptable significa todo a la vez; mantener la capacidad completa significa rolling con lote adicional; la reversión segura más rápida significa inmutable; entorno separado y cambio de DNS significa blue/green.",
  "check": [
   [
    "¿Qué política mantiene la capacidad completa mientras actualiza por lotes?",
    "Rolling con lote adicional."
   ],
   [
    "¿Cómo funciona la reversión de un despliegue inmutable fallido?",
    "Se terminan las instancias nuevas; las instancias originales nunca se modificaron, así que siguen atendiendo."
   ],
   [
    "¿Cómo se realiza blue/green en Elastic Beanstalk?",
    "Despliega la nueva versión en un entorno separado, pruébala y luego intercambia las URL de los entornos (CNAME) con producción."
   ]
  ]
 },
 {
  "t": "CodePipeline stages and actions, manual approvals; CodeBuild buildspec phases and artifacts",
  "tt": "Etapas y acciones de CodePipeline, aprobaciones manuales; fases y artefactos del buildspec de CodeBuild",
  "body": [
   "La integración continua y la entrega continua (CI/CD) automatizan el camino desde un cambio de código hasta una versión en ejecución. En AWS, AWS CodePipeline orquesta el flujo y AWS CodeBuild se encarga de compilar y probar.",
   "Una canalización de CodePipeline está formada por etapas que se ejecutan en orden, como Source, Build, Test, Approve y Deploy. Cada etapa contiene una o más acciones, que pueden ejecutarse de forma secuencial o en paralelo (usando el orden de ejecución, run order). Las categorías de acciones son source, build, test, deploy, approval e invoke. Las acciones de origen incluyen AWS CodeCommit, Amazon S3, Amazon ECR y repositorios de terceros como GitHub o Bitbucket mediante una conexión. Las acciones de compilación y prueba suelen usar CodeBuild. Las acciones de despliegue incluyen CodeDeploy, CloudFormation, Elastic Beanstalk, Amazon ECS y S3. Las acciones invoke pueden llamar a una función Lambda o ejecutar una máquina de estados de Step Functions para pasos personalizados. Las acciones se pasan archivos entre sí como artefactos, almacenados en el bucket de artefactos de S3 de la canalización: una acción declara artefactos de salida, y una acción posterior los nombra como artefactos de entrada. Una canalización se inicia con los cambios en el origen (mediante eventos o webhooks) y cada ejecución es una execution; si una acción falla, la etapa falla y la ejecución se detiene.",
   "Una acción de aprobación manual pausa la canalización hasta que alguien con los permisos de IAM adecuados la apruebe o la rechace, por ejemplo antes de desplegar en producción. Puede notificar a los revisores mediante un tema de SNS e incluir una URL para que la revisen, como un sitio de staging. Si nadie responde en siete días, la acción falla.",
   "CodeBuild es un servicio de compilación completamente administrado: cada compilación se ejecuta en un contenedor nuevo a partir de una imagen de compilación, instala herramientas, ejecuta tus comandos y sube las salidas. Describes la compilación en `buildspec.yml` en la raíz del código fuente (o especificas un archivo alternativo o un buildspec en línea en el proyecto).",
   "```yaml\nversion: 0.2\nenv:\n  variables:\n    STAGE: test\n  parameter-store:\n    DB_URL: /myapp/test/db-url\nphases:\n  install:\n    runtime-versions:\n      python: 3.12\n    commands:\n      - pip install -r requirements.txt\n  pre_build:\n    commands:\n      - pytest tests/unit\n  build:\n    commands:\n      - sam build\n  post_build:\n    commands:\n      - sam package --s3-bucket my-artifacts --output-template-file packaged.yaml\nartifacts:\n  files:\n    - packaged.yaml\ncache:\n  paths:\n    - /root/.cache/pip/**/*\n```",
   "Las fases se ejecutan en orden: `install` (instalar runtimes y herramientas), `pre_build` (iniciar sesión en ECR, ejecutar pruebas unitarias, obtener dependencias), `build` (compilar o empaquetar) y `post_build` (subir imágenes, empaquetar, notificar). La sección `env` proporciona variables simples y valores de Parameter Store o Secrets Manager, para que los secretos no queden escritos en el archivo. `artifacts` enumera los archivos que se suben como salida de la compilación, que CodePipeline pasa a la siguiente etapa. `reports` publica los resultados de las pruebas, y `cache` guarda las dependencias en S3 o localmente para acelerar compilaciones posteriores. Los logs de compilación van a CloudWatch Logs o a S3. El rol de servicio de CodeBuild necesita permisos para todo lo que hace la compilación, como subir a ECR o leer parámetros. CodeBuild también puede ejecutarse dentro de tu VPC para llegar a recursos privados, y puedes ejecutar compilaciones localmente con el agente local de CodeBuild para depurar."
  ],
  "terms": [
   [
    "Stage (etapa)",
    "Un paso secuencial de una canalización de CodePipeline que contiene una o más acciones."
   ],
   [
    "Action (acción)",
    "Una tarea dentro de una etapa, como obtener el código fuente, una compilación de CodeBuild, un despliegue o una aprobación manual."
   ],
   [
    "Artifact (artefacto)",
    "Archivos producidos por una acción de la canalización y consumidos por otra, almacenados en el bucket de S3 de la canalización."
   ],
   [
    "buildspec.yml",
    "El archivo YAML que define el entorno, las fases, los artefactos, los informes y la caché de CodeBuild."
   ],
   [
    "Manual approval (aprobación manual)",
    "Una acción de la canalización que pausa la ejecución hasta que una persona autorizada la aprueba o la rechaza."
   ]
  ],
  "example": "Una canalización tiene Source (conexión con GitHub), Build (CodeBuild ejecuta pruebas unitarias y sam package), DeployStaging (CloudFormation), una acción de Approval que envía un correo a la líder de QA mediante SNS con la URL de staging, y DeployProd. La líder de QA aprueba después de revisar staging, y el mismo artefacto empaquetado se despliega en producción.",
  "tip": "El orden de las fases del buildspec es install, pre_build, build, post_build. Los archivos que necesita la siguiente etapa de la canalización deben enumerarse en artifacts. Guarda los secretos en env con parameter-store o secrets-manager, nunca en el buildspec.",
  "check": [
   [
    "¿Cómo obtiene una etapa de despliegue los archivos producidos por la etapa de compilación?",
    "La acción de compilación declara un artefacto de salida y la acción de despliegue lo usa como artefacto de entrada, almacenado en el bucket de artefactos de S3 de la canalización."
   ],
   [
    "¿En qué fase del buildspec ejecutarías normalmente pruebas unitarias o iniciarías sesión en ECR?",
    "pre_build (aunque las pruebas también pueden ejecutarse en build)."
   ],
   [
    "¿Qué pasa si nadie actúa sobre una aprobación manual?",
    "Espera, y falla si no se aprueba ni se rechaza en siete días, lo que detiene la ejecución."
   ]
  ]
 },
 {
  "t": "CodeDeploy appspec.yml lifecycle hooks for EC2, Lambda and ECS; the CodeDeploy agent",
  "tt": "Hooks del ciclo de vida de appspec.yml de CodeDeploy para EC2, Lambda y ECS; el agente de CodeDeploy",
  "body": [
   "AWS CodeDeploy automatiza el despliegue de revisiones de aplicaciones en tres plataformas de cómputo: servidores EC2 y locales (on-premises), Lambda y Amazon ECS. En cada despliegue lee un archivo de especificación de la aplicación, `appspec.yml` (o JSON para Lambda y ECS), que describe qué desplegar y qué hooks de eventos del ciclo de vida ejecutar. El examen evalúa el orden de los hooks y cuáles existen en cada plataforma.",
   "En los servidores EC2 y locales, CodeDeploy depende del agente de CodeDeploy, un programa instalado y en ejecución en cada instancia. El agente sondea CodeDeploy en busca de trabajo, descarga la revisión (desde S3 o GitHub), copia los archivos según lo descrito en la sección `files`, establece los `permissions` y ejecuta tus scripts de hooks. La instancia también necesita un perfil de instancia que le permita leer la revisión desde S3. Si los despliegues se quedan colgados o fallan de inmediato en una instancia, comprueba que el agente esté instalado y en ejecución y que sus logs (en el directorio de logs del agente) no muestren errores de permisos.",
   "El orden del ciclo de vida en EC2 in-place es: `ApplicationStop`, `DownloadBundle`, `BeforeInstall`, `Install`, `AfterInstall`, `ApplicationStart`, `ValidateService`. Con un balanceador de carga, `BeforeBlockTraffic`, `BlockTraffic` y `AfterBlockTraffic` van primero, y `BeforeAllowTraffic`, `AllowTraffic` y `AfterAllowTraffic` van al final. Puedes asociar scripts a los hooks, pero no a los eventos que ejecuta el propio CodeDeploy (`DownloadBundle`, `Install`, `BlockTraffic`, `AllowTraffic`). Ten en cuenta que `ApplicationStop` ejecuta el script de la revisión desplegada anteriormente, por eso un script de detención roto de una revisión antigua puede hacer fallar un despliegue nuevo.",
   "```yaml\nversion: 0.0\nos: linux\nfiles:\n  - source: /\n    destination: /var/www/app\nhooks:\n  ApplicationStop:\n    - location: scripts/stop.sh\n      timeout: 60\n  AfterInstall:\n    - location: scripts/install_deps.sh\n  ApplicationStart:\n    - location: scripts/start.sh\n  ValidateService:\n    - location: scripts/health_check.sh\n```",
   "En Lambda no hay instancias ni archivos. El AppSpec nombra la función, el alias, la versión actual y la versión de destino, y CodeDeploy desplaza el tráfico del alias según la configuración de despliegue (canary, lineal o todo a la vez). Los únicos hooks son `BeforeAllowTraffic` y `AfterAllowTraffic`, y cada uno nombra una función Lambda que ejecuta pruebas de validación e informa el éxito o la falla a CodeDeploy con `PutLifecycleEventHookExecutionStatus`.",
   "En ECS, CodeDeploy realiza despliegues blue/green: inicia un conjunto de tareas de reemplazo (green) con la nueva definición de tarea detrás del listener de prueba de un balanceador de carga, y luego desplaza el tráfico de producción desde el conjunto de tareas blue. El AppSpec indica la definición de tarea, el nombre del contenedor y el puerto. Los hooks, cada uno una función Lambda, son `BeforeInstall`, `AfterInstall`, `AfterAllowTestTraffic`, `BeforeAllowTraffic` y `AfterAllowTraffic`; `AfterAllowTestTraffic` es donde ejecutas pruebas a través del listener de prueba antes de que lleguen los usuarios reales.",
   "Ajustes de despliegue que debes conocer: las configuraciones de despliegue de EC2 como `CodeDeployDefault.OneAtATime`, `HalfAtATime` y `AllAtOnce`; in-place frente a blue/green en EC2; y la reversión automática cuando un despliegue falla o se dispara una alarma de CloudWatch, que vuelve a desplegar la última revisión que funcionaba."
  ],
  "terms": [
   [
    "appspec.yml",
    "El archivo de especificación de la aplicación de CodeDeploy que describe los archivos que se despliegan y los scripts o funciones de los hooks del ciclo de vida."
   ],
   [
    "CodeDeploy agent (agente de CodeDeploy)",
    "Software en instancias EC2 o locales que obtiene las revisiones de CodeDeploy y ejecuta los hooks del ciclo de vida."
   ],
   [
    "Lifecycle event hook (hook de evento del ciclo de vida)",
    "Un punto de un despliegue en el que CodeDeploy ejecuta tu script o función Lambda, como AfterInstall."
   ],
   [
    "AfterAllowTestTraffic",
    "Un hook de despliegue de ECS que se ejecuta después de que el listener de prueba envía tráfico al nuevo conjunto de tareas, antes de que se desplace el tráfico de producción."
   ]
  ],
  "example": "Los despliegues en un grupo de instancias EC2 fallan en ApplicationStop solo en un host. El log del despliegue muestra que falta el script de la revisión anterior. El desarrollador vuelve a ejecutar el despliegue con la opción de ignorar las fallas de ApplicationStop y luego corrige el script de detención en la nueva revisión para que los despliegues futuros tengan éxito.",
  "tip": "Memoriza el orden en EC2: ApplicationStop, DownloadBundle, BeforeInstall, Install, AfterInstall, ApplicationStart, ValidateService. Lambda solo tiene BeforeAllowTraffic y AfterAllowTraffic. Los despliegues en EC2 que nunca empiezan suelen significar que el agente no está en ejecución.",
  "check": [
   [
    "¿Qué hook usarías para verificar que una aplicación en EC2 está sana después de iniciarse?",
    "ValidateService."
   ],
   [
    "¿Qué hooks del ciclo de vida puede usar un despliegue de Lambda?",
    "BeforeAllowTraffic y AfterAllowTraffic."
   ],
   [
    "¿Qué debe estar instalado en las instancias EC2 para que CodeDeploy funcione?",
    "El agente de CodeDeploy, además de un perfil de instancia que permita acceder a la ubicación de la revisión."
   ]
  ]
 },
 {
  "t": "Testing in development environments: unit tests in CI, integration tests against deployed stages, AppConfig feature flags and gradual configuration rollout",
  "tt": "Pruebas en entornos de desarrollo: pruebas unitarias en CI, pruebas de integración contra etapas desplegadas, feature flags de AppConfig y despliegue gradual de configuración",
  "body": [
   "Una buena estrategia de pruebas para aplicaciones en la nube combina distintos tipos de pruebas, cada uno de los cuales detecta problemas diferentes a un costo diferente. El examen quiere que sepas dónde encaja cada uno y qué funciones de AWS respaldan las pruebas y publicaciones seguras.",
   "Las pruebas unitarias verifican funciones y clases individuales de forma aislada, rápidamente y sin llamadas a AWS. Para una función Lambda, estructura el código de modo que la lógica de negocio viva en funciones simples que el handler llama, y luego prueba esa lógica directamente. Las llamadas al SDK de AWS se reemplazan con mocks o stubs (por ejemplo, la biblioteca moto o botocore Stubber en Python, o un cliente simulado en JavaScript). Ejecuta las pruebas unitarias en cada commit en CI, normalmente en la fase `pre_build` o `build` de CodeBuild, y haz fallar la compilación ante cualquier falla para que el código roto nunca llegue a un entorno. Los informes de pruebas de CodeBuild muestran los resultados.",
   "La emulación local está entre las pruebas unitarias y las de integración: `sam local invoke` y `sam local start-api` ejecutan funciones en Docker con eventos de ejemplo, lo que es útil para comprobaciones rápidas del análisis de eventos y del cableado del handler. Sin embargo, la emulación no puede reproducir por completo los permisos de IAM, los límites de los servicios ni las integraciones reales.",
   "Las pruebas de integración ejercitan recursos reales desplegados, que es la única forma de detectar permisos de IAM incorrectos, disparadores mal configurados, mapeos de API Gateway o tiempos de espera. El patrón común es desplegar el stack en una etapa dedicada de desarrollo o de pruebas (un stack separado, y a menudo una cuenta separada), y luego ejecutar pruebas que llaman a su endpoint de API, ponen mensajes en sus colas o escriben en sus tablas, y verifican los resultados. Las salidas del stack, como la URL de la API, alimentan las pruebas. En CodePipeline, una etapa de pruebas después de una acción de despliegue en test ejecuta estas pruebas antes de la promoción. Las etapas de API Gateway con variables de etapa y los alias de Lambda permiten probar el mismo código en dev y test antes de prod, y las integraciones mock pueden reemplazar backends sin terminar. Limpia los stacks de prueba temporales para evitar costos.",
   "AWS AppConfig, una capacidad de AWS Systems Manager, separa los cambios de configuración de los despliegues de código. Creas una aplicación, entornos (como beta y prod) y perfiles de configuración, ya sea configuración libre (JSON, YAML o texto, almacenada en AppConfig, S3, Parameter Store y otros) o feature flags. Los feature flags te permiten publicar código con una funcionalidad desactivada, luego activarla para pruebas o para los usuarios sin volver a desplegar, y desactivarla al instante si aparecen problemas. Los validadores (un esquema JSON o una función Lambda) comprueban una configuración antes de desplegarla.",
   "Los despliegues de AppConfig aplican la configuración gradualmente usando una estrategia de despliegue, que define el tipo de crecimiento (lineal o exponencial), el factor de crecimiento, el tiempo total de despliegue y un tiempo de horneado (bake time). Durante el despliegue y el tiempo de horneado, AppConfig vigila las alarmas de CloudWatch que asocies con el entorno y revierte automáticamente la configuración si alguna se dispara. Las aplicaciones obtienen la configuración con la API de datos de AppConfig (`StartConfigurationSession` y `GetLatestConfiguration`), y las funciones Lambda suelen usar la extensión de Lambda de AppConfig, que guarda la configuración en caché y la actualiza en segundo plano."
  ],
  "terms": [
   [
    "Unit test (prueba unitaria)",
    "Una prueba rápida y aislada de una sola pieza de lógica, con las dependencias externas simuladas."
   ],
   [
    "Integration test (prueba de integración)",
    "Una prueba contra recursos desplegados para verificar permisos, disparadores e interacciones reales entre servicios."
   ],
   [
    "Feature flag (bandera de funcionalidad)",
    "Un interruptor de configuración que activa o desactiva una funcionalidad en tiempo de ejecución sin volver a desplegar el código."
   ],
   [
    "AppConfig deployment strategy (estrategia de despliegue de AppConfig)",
    "Ajustes que controlan qué tan rápido se aplica un cambio de configuración y cuánto tiempo se hornea antes de completarse."
   ]
  ],
  "example": "Un equipo publica un nuevo motor de recomendaciones detrás de un feature flag de AppConfig que está desactivado. Después del despliegue, lo activan con una estrategia lineal de 30 minutos y una alarma sobre la tasa de errores 5xx de la API. Las tasas de error suben al 40% del despliegue, la alarma se dispara y AppConfig revierte el flag sin ningún cambio de código.",
  "tip": "Cambiar el comportamiento de la aplicación de forma segura sin volver a desplegar código apunta a los feature flags de AppConfig con una estrategia de despliegue y reversión basada en alarmas. Las pruebas que deben verificar permisos de IAM o integraciones reales necesitan una etapa de prueba desplegada, no mocks.",
  "check": [
   [
    "¿Por qué las pruebas unitarias con mocks no pueden detectar un permiso de IAM faltante?",
    "Los mocks nunca llaman a AWS, así que la autorización nunca se comprueba; solo las pruebas de integración contra recursos desplegados ejercitan los permisos reales."
   ],
   [
    "¿Qué dispara una reversión automática de AppConfig?",
    "Una alarma de CloudWatch asociada con el entorno que pasa al estado ALARM durante el despliegue o el tiempo de horneado."
   ],
   [
    "¿Cómo leen normalmente las funciones Lambda la configuración de AppConfig de forma eficiente?",
    "Mediante la extensión de Lambda de AppConfig, que guarda la configuración en caché localmente y la actualiza en segundo plano."
   ]
  ]
 },
 {
  "t": "Root cause analysis with CloudWatch Logs, Logs Insights queries, metrics and dashboards",
  "tt": "Análisis de causa raíz con CloudWatch Logs, consultas de Logs Insights, métricas y paneles",
  "body": [
   "Cuando algo se rompe en producción, necesitas ir de un síntoma ('el pago está lento') a una causa ('la función de pagos agota el tiempo al llamar a una API de terceros'). Amazon CloudWatch proporciona la materia prima: logs, métricas y paneles (dashboards). El dominio 4 del examen presenta síntomas y pregunta dónde buscar.",
   "CloudWatch Logs organiza los datos de logs en grupos de logs (normalmente uno por aplicación o función, como `/aws/lambda/checkout`) que contienen flujos de logs (log streams, uno por fuente, como uno por entorno de ejecución de Lambda o por contenedor). Lambda escribe todo lo que imprime tu código más sus propias líneas `START`, `END` y `REPORT`; la línea `REPORT` muestra la duración, la duración facturada, el tamaño de memoria, la memoria máxima usada y la duración de inicialización en los arranques en frío. Configura un período de retención en cada grupo de logs, porque por defecto los logs se conservan para siempre. Puedes buscar en los logs con patrones de filtro, verlos en vivo (Live Tail) y reenviarlos en tiempo real con filtros de suscripción a Lambda, Kinesis o Amazon Data Firehose.",
   "CloudWatch Logs Insights es un lenguaje de consulta interactivo para grupos de logs. Las consultas encadenan comandos con barras verticales (pipes): `fields`, `filter`, `stats`, `sort`, `limit` y `parse`. Logs Insights descubre automáticamente los campos en los logs JSON, que es otra razón para registrar en JSON. Eliges uno o más grupos de logs y un rango de tiempo, ejecutas la consulta y puedes agregar los resultados a un panel.",
   "```\nfields @timestamp, @requestId, @message\n| filter @message like /ERROR/\n| sort @timestamp desc\n| limit 50\n\nfilter @type = \"REPORT\"\n| stats avg(@duration), max(@duration), max(@maxMemoryUsed) by bin(5m)\n```",
   "Las métricas son series temporales numéricas. Los servicios de AWS publican métricas automáticamente, por ejemplo en Lambda `Invocations`, `Errors`, `Throttles`, `Duration`, `ConcurrentExecutions` e `IteratorAge`; en API Gateway `Count`, `4XXError`, `5XXError`, `Latency` e `IntegrationLatency`; en SQS `ApproximateNumberOfMessagesVisible` y `ApproximateAgeOfOldestMessage`; en DynamoDB la capacidad consumida y `ThrottledRequests`. Cada métrica pertenece a un espacio de nombres (namespace) y tiene dimensiones (como `FunctionName`), y la ves con una estadística (Average, Sum, Maximum, percentiles como p99) sobre un período. Los filtros de métricas convierten patrones de logs en métricas, como contar las líneas que contienen `PaymentDeclined`, para que puedas graficarlas y crear alarmas sobre ellas.",
   "Un proceso útil de causa raíz: empieza con las métricas para encontrar cuándo comenzó el problema y qué componente está afectado (por ejemplo, `Latency` de API Gateway menos `IntegrationLatency` te dice si el tiempo se gastó en API Gateway o en el backend); acota la ventana de tiempo; usa Logs Insights para encontrar errores y solicitudes lentas en esa ventana; sigue un ID de solicitud o un ID de correlación a través de los servicios; y usa las trazas de X-Ray para ver la ruta de llamadas. Los paneles de CloudWatch colocan lado a lado los gráficos clave de una aplicación, pueden abarcar regiones y cuentas, y pueden compartirse, lo que los convierte en la primera parada durante un incidente. Contributor Insights puede mostrar los principales contribuyentes, como las claves de DynamoDB más limitadas o las IP de clientes más ruidosas."
  ],
  "terms": [
   [
    "Log group (grupo de logs)",
    "Un contenedor de CloudWatch Logs para flujos de logs que comparten la configuración de retención, cifrado y acceso."
   ],
   [
    "CloudWatch Logs Insights",
    "Un servicio de consultas interactivo para buscar y agregar datos de logs con un lenguaje de consulta basado en pipes."
   ],
   [
    "Metric filter (filtro de métricas)",
    "Una regla que extrae valores de métricas de los eventos de log que coinciden para poder graficarlos y crear alarmas."
   ],
   [
    "Dimension (dimensión)",
    "Un par nombre-valor que identifica una serie de métricas específica, como FunctionName=checkout."
   ]
  ],
  "example": "Los usuarios reportan que el pago está lento desde las 14:00. El panel muestra que Latency de API Gateway sube mientras IntegrationLatency sube en la misma cantidad, así que el backend está lento. Una consulta de Logs Insights sobre las líneas REPORT de la función de pago muestra una duración máxima cercana al tiempo de espera, y filtrar por ERROR revela tiempos de espera agotados al llamar al proveedor de pagos.",
  "tip": "Conoce qué herramienta responde cada pregunta: las métricas te dicen qué y cuándo, los logs (mediante Logs Insights) te dicen por qué, y las trazas te dicen dónde en la cadena de llamadas. Convertir un patrón de log en algo sobre lo que puedas crear una alarma significa un filtro de métricas.",
  "check": [
   [
    "¿Cómo puedes contar las apariciones de un mensaje de error específico en los logs y crear una alarma?",
    "Crea un filtro de métricas en el grupo de logs que coincida con el mensaje y luego crea una alarma de CloudWatch sobre la métrica resultante."
   ],
   [
    "¿Qué línea de log de Lambda muestra la memoria usada y la duración?",
    "La línea REPORT que se escribe al final de cada invocación."
   ],
   [
    "¿Por qué configurar un período de retención en un grupo de logs?",
    "Por defecto los logs se conservan indefinidamente, lo que aumenta el costo; la retención elimina los logs después del período elegido."
   ]
  ]
 },
 {
  "t": "Common Lambda errors: throttling (429), timeouts, AccessDenied from the execution role, malformed proxy responses (502), API Gateway 504 integration timeouts",
  "tt": "Errores comunes de Lambda: limitación (429), tiempos de espera agotados, AccessDenied del rol de ejecución, respuestas proxy mal formadas (502), tiempos de espera de integración 504 de API Gateway",
  "body": [
   "Muchas preguntas de solución de problemas describen un síntoma y un código de error. Saber qué significa cada error común de Lambda y API Gateway, y cómo se corrige, convierte estas preguntas en puntos fáciles.",
   "La limitación (throttling) ocurre cuando las invocaciones superan la concurrencia disponible: la cuota de concurrencia regional de la cuenta o la concurrencia reservada de una función. Quienes llaman de forma síncrona reciben `TooManyRequestsException` con el estado HTTP 429 (API Gateway puede devolver 429 o un 5xx a los clientes según la configuración), y la métrica `Throttles` sube. Las invocaciones asíncronas se reintentan automáticamente hasta seis horas por defecto, y los mapeos de fuentes de eventos reducen su ritmo de sondeo. Soluciones: solicitar una cuota de concurrencia de cuenta más alta, aumentar o configurar la concurrencia reservada de la función, reducir la concurrencia necesaria haciendo más rápida la función, comprobar que otra función no esté consumiendo el grupo compartido (reservar concurrencia para las funciones críticas) y hacer que los clientes reintenten con retroceso exponencial. API Gateway también devuelve 429 cuando se superan sus propios límites de limitación de etapa, de método o de plan de uso, lo cual es distinto de la limitación de Lambda.",
   "Los tiempos de espera agotados ocurren cuando una función se ejecuta más tiempo del configurado; el log muestra `Task timed out after N seconds`. El valor predeterminado es de solo 3 segundos. Mira qué está esperando la función: una API de destino lenta, una conexión a la base de datos que no se puede establecer (a menudo una función en VPC sin ruta a la base de datos o a internet), o muy poca memoria (y por lo tanto poca CPU). Soluciones: aumentar el tiempo de espera (hasta 15 minutos), aumentar la memoria, configurar tiempos de espera más cortos en los clientes para que la función falle rápido con un error claro, reutilizar conexiones o mover el trabajo largo a un procesamiento asíncrono.",
   "Los errores AccessDenied (`AccessDeniedException`, o mensajes como 'User: arn:aws:sts::...:assumed-role/my-fn-role/my-fn is not authorized to perform: dynamodb:PutItem on resource ...') significan que al rol de ejecución le falta un permiso. El mensaje te dice exactamente qué acción y qué recurso agregar. Revisa también las políticas de recursos (políticas de bucket o de claves de KMS), las denegaciones explícitas de límites de permisos o de SCP, y si se necesitan permisos de KMS para recursos cifrados. Si la función ni siquiera puede escribir logs y nada aparece en CloudWatch, al rol le faltan los permisos básicos de logging.",
   "Un 502 Bad Gateway de una integración proxy de Lambda casi siempre significa una respuesta proxy mal formada: la función devolvió algo que no es un objeto con `statusCode` y un `body` de tipo cadena, o la función lanzó un error no manejado. Los logs de ejecución de API Gateway muestran 'Malformed Lambda proxy response'. Corrige la forma de lo que se devuelve (serializa el body con `JSON.stringify` o `json.dumps`) y captura los errores para devolver respuestas 4xx o 5xx adecuadas. Un 500 con un mensaje de permisos inválidos significa que API Gateway no tiene permitido invocar la función.",
   "Un 504 Gateway Timeout de API Gateway es un tiempo de espera de integración agotado: el backend no respondió dentro del tiempo de espera de integración de API Gateway, 29 segundos por defecto. Aunque el tiempo de espera de la función Lambda sea de 5 minutos, el cliente recibe 504 cuando se alcanza el límite de la API mientras la función sigue ejecutándose. Soluciones: hacer más rápido el backend, o cambiar el diseño para que sea asíncrono: aceptar la solicitud, encolar el trabajo en SQS o iniciar una ejecución de Step Functions, devolver 202 con un ID de trabajo y dejar que el cliente sondee o reciba un callback. Las REST API regionales y privadas pueden solicitar un tiempo de espera de integración más largo, pero el diseño asíncrono es la respuesta que el examen suele buscar."
  ],
  "terms": [
   [
    "TooManyRequestsException (429)",
    "El error que se devuelve cuando una invocación de Lambda se limita porque no hay concurrencia disponible."
   ],
   [
    "Task timed out (tarea con tiempo agotado)",
    "El mensaje de log que escribe Lambda cuando una invocación supera su tiempo de espera configurado."
   ],
   [
    "Malformed Lambda proxy response (respuesta proxy de Lambda mal formada)",
    "Un error de API Gateway (que se devuelve a los clientes como 502) cuando la salida de la función de una integración proxy tiene un formato incorrecto."
   ],
   [
    "Integration timeout (tiempo de espera de integración)",
    "El tiempo máximo que API Gateway espera la respuesta de un backend, 29 segundos por defecto, después del cual devuelve 504."
   ]
  ],
  "example": "Un endpoint de informes devuelve errores 504 tras unos 30 segundos, aunque la función Lambda termina finalmente después de 90 segundos. El equipo cambia la API para poner una solicitud en una cola SQS y devolver 202 con un ID de informe; una función trabajadora construye el informe y el cliente sondea un endpoint de estado.",
  "tip": "Asocia los códigos con sus causas: 429 es limitación, 502 es una respuesta proxy incorrecta o un error de la función, 504 es el backend superando el tiempo de espera de integración de API Gateway, y un AccessDenied que nombra el rol asumido es un permiso faltante en el rol de ejecución.",
  "check": [
   [
    "Una API devuelve 502 y los logs muestran 'Malformed Lambda proxy response'. ¿Cuál es la solución probable?",
    "Devolver un objeto con un statusCode numérico, headers opcionales y el body como cadena, y manejar las excepciones para que la función siempre devuelva esa forma."
   ],
   [
    "¿Por qué aumentar el tiempo de espera de Lambda no corrige un 504 de API Gateway?",
    "El tiempo de espera de integración de API Gateway (29 segundos por defecto) se alcanza primero, sin importar el tiempo de espera propio de la función."
   ],
   [
    "Menciona dos formas de resolver la limitación de Lambda.",
    "Solicitar una cuota de concurrencia de cuenta más alta, configurar o aumentar la concurrencia reservada, acelerar la función o hacer que los clientes reintenten con retroceso."
   ]
  ]
 },
 {
  "t": "AWS X-Ray: segments, subsegments, annotations vs metadata, sampling, active tracing, the X-Ray daemon/CloudWatch agent",
  "tt": "AWS X-Ray: segmentos, subsegmentos, anotaciones vs metadatos, muestreo, rastreo activo, el daemon de X-Ray/agente de CloudWatch",
  "body": [
   "Los logs te dicen lo que hizo un componente; el rastreo distribuido muestra una solicitud completa mientras viaja por API Gateway, Lambda, DynamoDB, SQS y API externas. AWS X-Ray recopila esos datos de trazas, dibuja un mapa de servicios de tu aplicación y te permite encontrar qué llamada hizo que una solicitud fuera lenta o fallara.",
   "Una traza es el recorrido completo de una solicitud, identificada por un ID de traza que se pasa entre servicios en el encabezado `X-Amzn-Trace-Id`. Cada servicio que maneja la solicitud envía un segmento: un documento JSON que describe el trabajo que hizo ese servicio, con horas de inicio y fin, el nombre del recurso, detalles de la solicitud y la respuesta HTTP, y cualquier error o falla. Dentro de un segmento, los subsegmentos desglosan más el trabajo, como cada llamada al SDK de AWS de destino, cada llamada HTTP o consulta SQL, o un bloque de tu propio código que quieras cronometrar. Las llamadas a servicios que no envían sus propios segmentos (una API externa, por ejemplo) aparecen como nodos inferidos a partir de los subsegmentos. El mapa de servicios agrupa los segmentos en nodos y los colorea según sus tasas de errores (4xx), fallas (5xx) y limitación (429).",
   "Puedes adjuntar datos adicionales a los segmentos de dos formas, y la diferencia se evalúa con frecuencia. Las anotaciones (annotations) son pares clave-valor simples (cadena, número o booleano) que X-Ray indexa, así que puedes buscar y filtrar trazas con expresiones de filtro como `annotation.customer_tier = \"gold\"` y crear grupos a partir de ellas. Los metadatos (metadata) son datos clave-valor de cualquier tipo, incluidos objetos y listas, que se guardan con la traza pero no se indexan, así que puedes verlos pero no buscar por ellos. Pon en las anotaciones los ID y las categorías por los que vayas a filtrar; pon en los metadatos las cargas de depuración más grandes.",
   "```python\nfrom aws_xray_sdk.core import xray_recorder\n\n@xray_recorder.capture('charge_card')   # crea un subsegmento\ndef charge_card(order):\n    sub = xray_recorder.current_subsegment()\n    sub.put_annotation('order_id', order['id'])\n    sub.put_metadata('order', order)\n```",
   "El muestreo (sampling) controla cuántas solicitudes se rastrean, para mantener bajos el costo y la sobrecarga. La regla predeterminada registra la primera solicitud de cada segundo (el reservorio) y el cinco por ciento de las solicitudes adicionales. Puedes crear reglas de muestreo personalizadas en la consola, que coinciden por nombre de servicio, ruta de URL, método HTTP, etc., con su propio reservorio y tasa, y los SDK las aplican sin cambios de código. Si una pregunta pide rastrear más o menos solicitudes para una ruta, la respuesta es una regla de muestreo.",
   "Para habilitar el rastreo en Lambda, activa el rastreo activo (`TracingConfig: Mode: Active`, o `Tracing: Active` en Globals de SAM). Lambda crea entonces segmentos para la invocación, y el rol de ejecución necesita permiso para enviar datos (`xray:PutTraceSegments` y `xray:PutTelemetryRecords`, incluidos en la política administrada `AWSXRayDaemonWriteAccess`). API Gateway tiene un ajuste de rastreo de X-Ray por etapa. Para ver las llamadas de destino como subsegmentos, instrumenta tu código con el SDK de X-Ray (o AWS Distro for OpenTelemetry, que AWS ahora recomienda para la instrumentación nueva) para que los clientes del SDK de AWS y las bibliotecas HTTP queden parcheados.",
   "En EC2, ECS y servidores locales, el SDK no envía los datos directamente a la API de X-Ray. Envía los segmentos por el puerto UDP 2000 a un recolector local, el daemon de X-Ray o el agente de CloudWatch (que puede actuar como ese recolector), que los almacena en búfer y los sube por lotes. En ECS lo ejecutas como un contenedor sidecar, y el SDK lo encuentra mediante la variable de entorno `AWS_XRAY_DAEMON_ADDRESS`. El rol de instancia o de tarea necesita los mismos permisos de escritura. En Lambda y en Elastic Beanstalk (con un ajuste de opción), este recolector ya se proporciona. La falta de trazas desde EC2 suele significar que el daemon no está en ejecución o que al rol le falta permiso."
  ],
  "terms": [
   [
    "Segment (segmento)",
    "El registro del trabajo realizado por un servicio para una solicitud rastreada, incluidos los tiempos, los detalles de la solicitud y los errores."
   ],
   [
    "Subsegment (subsegmento)",
    "Una parte más detallada de un segmento, como una llamada de destino o un bloque de código cronometrado."
   ],
   [
    "Annotation (anotación)",
    "Un par clave-valor indexado en un segmento que se puede usar en expresiones de filtro para buscar trazas."
   ],
   [
    "Metadata (metadatos)",
    "Datos clave-valor no indexados de cualquier tipo, guardados con un segmento para verlos pero no para buscarlos."
   ],
   [
    "Sampling rule (regla de muestreo)",
    "Una regla que define cuántas solicitudes de cierto tipo se rastrean, usando un reservorio y una tasa fija."
   ]
  ],
  "example": "Soporte necesita encontrar las trazas de los pedidos fallidos de un cliente específico. El desarrollador agrega put_annotation('customer_id', id) en la función de pedidos. Ahora el equipo puede ejecutar la expresión de filtro annotation.customer_id = \"C-1042\" en la consola de X-Ray y abrir exactamente las trazas lentas, donde un subsegmento muestra una llamada a DynamoDB que está siendo limitada.",
  "tip": "¿Necesitas buscar o filtrar trazas por un valor? Anotación. ¿Necesitas guardar detalles adicionales solo para verlos? Metadatos. ¿No hay trazas desde EC2 o ECS? Revisa el daemon o el agente en UDP 2000 y los permisos de escritura de X-Ray del rol.",
  "check": [
   [
    "¿Puedes filtrar trazas por un valor de metadatos?",
    "No; los metadatos no se indexan. Usa una anotación para los valores por los que necesites buscar."
   ],
   [
    "¿Qué registra la regla de muestreo predeterminada de X-Ray?",
    "La primera solicitud de cada segundo, más el cinco por ciento de las solicitudes adicionales."
   ],
   [
    "¿Qué hay que hacer para rastrear una función Lambda además de instrumentar el código?",
    "Habilitar el rastreo activo en la función y dar a su rol de ejecución permisos de escritura de X-Ray, como PutTraceSegments."
   ]
  ]
 },
 {
  "t": "Custom metrics: PutMetricData, CloudWatch embedded metric format, high-resolution metrics",
  "tt": "Métricas personalizadas: PutMetricData, formato de métricas integradas de CloudWatch, métricas de alta resolución",
  "body": [
   "Los servicios de AWS publican muchas métricas automáticamente, pero no tus eventos de negocio: pedidos realizados, pagos rechazados, artículos en un carrito, tiempo dedicado a llamar a la API de un socio. Las métricas personalizadas te permiten publicar esos números en Amazon CloudWatch para graficarlos, ponerlos en paneles y crear alarmas sobre ellos igual que con las métricas integradas.",
   "Una métrica se identifica por un espacio de nombres (namespace, un contenedor al que le pones nombre, como `MyShop/Checkout`; el prefijo `AWS/` está reservado para los servicios de AWS), un nombre de métrica y hasta 30 dimensiones, los pares nombre-valor que identifican una serie concreta, como `Environment=prod` o `PaymentProvider=acme`. Cada combinación única de dimensiones es una métrica separada, así que evita dimensiones con valores ilimitados como ID de usuario o ID de solicitud; crean cantidades enormes de métricas y de costo. Cada punto de datos tiene un valor, una unidad opcional (`Count`, `Milliseconds`, `Bytes`, etc.) y una marca de tiempo.",
   "La forma directa de publicar es la API `PutMetricData`. Puedes enviar valores individuales, arreglos de valores con conteos o conjuntos de estadísticas (Sum, Minimum, Maximum y SampleCount) que resumen muchas observaciones en un solo punto de datos. Agrupa varios valores en cada llamada, porque llamar a la API por cada evento individual agrega latencia a tu código y puede ser limitado. La identidad que llama necesita el permiso `cloudwatch:PutMetricData`, y puedes restringirlo a un espacio de nombres con la clave de condición `cloudwatch:namespace`.",
   "```bash\naws cloudwatch put-metric-data --namespace MyShop/Checkout \\\n  --metric-name OrdersPlaced --dimensions Environment=prod \\\n  --unit Count --value 1 --storage-resolution 1\n```",
   "La resolución importa. Las métricas de resolución estándar tienen una granularidad de un minuto. Las métricas de alta resolución, publicadas con `StorageResolution` en 1, conservan los datos con granularidad de un segundo para que puedas ver picos cortos, y las alarmas sobre ellas pueden usar períodos de 10 o 30 segundos (además de múltiplos de 60). Los datos de alta resolución se conservan con detalle de un segundo solo por poco tiempo antes de agregarse, y cuestan más cuando se usan en alarmas, así que úsalos solo cuando los segundos importen, como en el trading en tiempo real o en señales de autoescalado.",
   "El formato de métricas integradas de CloudWatch (embedded metric format, EMF) suele ser la mejor opción desde Lambda y contenedores. En lugar de llamar a una API, escribes una línea de log JSON estructurada que incluye un objeto `_aws` que describe qué campos son métricas y cuáles son dimensiones. CloudWatch Logs extrae las métricas de forma automática y asíncrona, así que no hay llamada a la API en la ruta de la solicitud, ni latencia adicional ni riesgo de limitación, y la línea de log completa, incluidos detalles de alta cardinalidad como el ID de pedido, sigue siendo consultable en Logs Insights. Bibliotecas como las bibliotecas cliente de EMF y las utilidades de métricas de Powertools for AWS Lambda generan este formato por ti.",
   "```json\n{\"_aws\": {\"Timestamp\": 1735689600000, \"CloudWatchMetrics\": [{\"Namespace\": \"MyShop/Checkout\", \"Dimensions\": [[\"Environment\"]], \"Metrics\": [{\"Name\": \"OrderValue\", \"Unit\": \"None\"}]}]}, \"Environment\": \"prod\", \"OrderValue\": 42.5, \"orderId\": \"o-981\"}\n```",
   "En las instancias EC2, el uso de memoria y de disco no son métricas integradas; el agente de CloudWatch los recopila y los publica como métricas personalizadas, lo cual es otro escenario común del examen."
  ],
  "terms": [
   [
    "Namespace (espacio de nombres)",
    "Un contenedor para métricas de CloudWatch, como MyShop/Checkout; el prefijo AWS/ está reservado para los servicios de AWS."
   ],
   [
    "PutMetricData",
    "La API de CloudWatch para publicar puntos de datos de métricas personalizadas o conjuntos de estadísticas."
   ],
   [
    "Embedded metric format (EMF, formato de métricas integradas)",
    "Un formato de log JSON estructurado del que CloudWatch Logs extrae métricas automáticamente."
   ],
   [
    "High-resolution metric (métrica de alta resolución)",
    "Una métrica personalizada almacenada con granularidad de un segundo al configurar StorageResolution en 1."
   ]
  ],
  "example": "Una función Lambda de pago llamaba a PutMetricData en cada pedido, lo que agregaba latencia y a veces provocaba limitación. El equipo cambia a imprimir líneas de log EMF con las métricas OrderValue y PaymentLatency y una dimensión Environment. Las métricas siguen apareciendo en CloudWatch, la función es más rápida y cada línea de log sigue llevando el ID de pedido para la investigación.",
  "tip": "Publicar métricas desde Lambda sin llamadas a la API ni latencia adicional apunta al formato de métricas integradas. ¿Necesitas granularidad de menos de un minuto o alarmas de 10 segundos? Métricas de alta resolución con StorageResolution 1. ¿Uso de memoria en EC2? El agente de CloudWatch.",
  "check": [
   [
    "¿Por qué evitar usar un ID de usuario como dimensión de una métrica?",
    "Cada combinación distinta de dimensiones es una métrica separada, así que los valores ilimitados crean cantidades enormes de métricas y de costo."
   ],
   [
    "¿Cuál es la ventaja de EMF sobre PutMetricData en Lambda?",
    "Las métricas se extraen de los logs de forma asíncrona, así que no hay llamada síncrona a la API, ni latencia ni limitación, y el contexto detallado se queda en la línea de log."
   ],
   [
    "¿Cómo publicas una métrica de alta resolución?",
    "Configura StorageResolution en 1 en PutMetricData (o su equivalente en EMF), lo que da granularidad de un segundo."
   ]
  ]
 },
 {
  "t": "CloudWatch alarms with SNS notifications; structured logging and correlation IDs",
  "tt": "Alarmas de CloudWatch con notificaciones de SNS; logging estructurado e ID de correlación",
  "body": [
   "El monitoreo solo sirve si alguien se entera cuando algo sale mal. Las alarmas de CloudWatch vigilan métricas y actúan cuando cruzan un umbral, y las buenas prácticas de logging hacen que la investigación posterior sea rápida.",
   "Una alarma de métrica vigila una métrica (o una expresión de matemáticas de métricas) y tiene tres estados: `OK`, `ALARM` e `INSUFFICIENT_DATA`. Configuras la estadística (como Average, Sum o p99), el período, el umbral y el operador de comparación, y cuántos períodos deben superarlo: los períodos de evaluación y los puntos de datos para alarma (datapoints to alarm) te permiten exigir, por ejemplo, 3 de 5 períodos de un minuto por encima del umbral, lo que evita alertas por picos aislados. También decides cómo se tratan los datos faltantes (como incumplimiento, como no incumplimiento, ignorados o faltantes), lo cual importa para métricas como `Errors` de Lambda, que simplemente no tienen datos cuando no pasa nada. Las alarmas de detección de anomalías usan una banda aprendida del historial de la métrica en lugar de un umbral fijo. Las alarmas compuestas combinan varias alarmas con reglas AND, OR y NOT para reducir el ruido, por ejemplo alertando solo cuando tanto la tasa de errores como la latencia son altas.",
   "Las acciones de alarma se ejecutan con los cambios de estado. La acción más común es publicar en un tema de Amazon SNS, que luego entrega a correo electrónico, SMS, una función Lambda, un endpoint HTTPS o integraciones de chat. Los suscriptores de correo deben confirmar la suscripción antes de recibir mensajes, lo cual es una razón común por la que las alertas 'nunca llegan'. Si el tema de SNS está cifrado con una clave de KMS administrada por el cliente, la política de la clave debe permitir que CloudWatch la use. Otras acciones incluyen acciones de EC2 (detener, terminar, reiniciar, recuperar), políticas de Auto Scaling y OpsItems o incidentes de Systems Manager. Las alarmas también impulsan las reversiones automáticas en CodeDeploy y AppConfig.",
   "```bash\naws cloudwatch put-metric-alarm --alarm-name checkout-errors \\\n  --namespace AWS/Lambda --metric-name Errors \\\n  --dimensions Name=FunctionName,Value=checkout \\\n  --statistic Sum --period 60 --evaluation-periods 5 --datapoints-to-alarm 3 \\\n  --threshold 5 --comparison-operator GreaterThanThreshold \\\n  --treat-missing-data notBreaching \\\n  --alarm-actions arn:aws:sns:us-east-1:111122223333:oncall\n```",
   "El logging estructurado significa escribir cada entrada de log como un objeto JSON con campos consistentes (marca de tiempo, nivel, servicio, mensaje, ID de solicitud e ID de negocio relevantes) en lugar de texto libre. Los logs en JSON pueden consultarse por campo en Logs Insights, filtrarse con precisión con filtros de métricas y analizarse con otras herramientas. Lambda puede emitir sus propios logs del sistema en JSON y filtrar por nivel de log mediante su configuración de logging, y bibliotecas como Logger de Powertools for AWS Lambda agregan automáticamente contexto como el ID de solicitud y el indicador de arranque en frío.",
   "Un ID de correlación une todas las entradas de log de una solicitud de negocio a través de los servicios. Genéralo en el borde (o reutiliza uno entrante, como un encabezado de la solicitud o el ID de solicitud de API Gateway), inclúyelo en cada línea de log y pásalo hacia los servicios de destino: en encabezados HTTP, atributos de mensajes de SQS o SNS, el detail de los eventos de EventBridge y la entrada de Step Functions. Así, una sola consulta de Logs Insights que filtre por ese ID en varios grupos de logs muestra toda la historia. Los ID de traza de X-Ray cumplen un propósito similar para las trazas, y registrar el ID de traza conecta los logs con las trazas."
  ],
  "terms": [
   [
    "Metric alarm (alarma de métrica)",
    "Una alarma de CloudWatch que cambia de estado cuando una métrica o expresión cruza un umbral durante un número determinado de períodos."
   ],
   [
    "Datapoints to alarm (puntos de datos para alarma)",
    "El número de puntos de datos que superan el umbral dentro de los períodos de evaluación necesarios para disparar ALARM (M de N)."
   ],
   [
    "Composite alarm (alarma compuesta)",
    "Una alarma cuyo estado se calcula a partir de una regla que combina los estados de otras alarmas."
   ],
   [
    "Structured logging (logging estructurado)",
    "Escribir las entradas de log como campos consistentes y legibles por máquina, normalmente en JSON."
   ],
   [
    "Correlation ID (ID de correlación)",
    "Un identificador único que se propaga por todos los servicios que manejan una solicitud para poder vincular sus logs."
   ]
  ],
  "example": "Un pedido pasa de API Gateway a una función Lambda y luego, a través de SQS, a una función de cumplimiento. La primera función registra JSON con correlationId igual al ID de solicitud de la API y lo agrega como atributo del mensaje de SQS; la segunda registra el mismo ID. Cuando un cliente se queja, una sola consulta de Logs Insights en ambos grupos de logs por ese ID muestra exactamente dónde se detuvo el pedido.",
  "tip": "Una alarma que debe notificar a personas publica en un tema de SNS; si los correos nunca llegan, comprueba que la suscripción esté confirmada. Para evitar alertas por picos aislados, usa M de N puntos de datos para alarma en lugar de un solo período.",
  "check": [
   [
    "¿Cuáles son los tres estados de una alarma de CloudWatch?",
    "OK, ALARM e INSUFFICIENT_DATA."
   ],
   [
    "¿Cómo debería tratar normalmente los datos faltantes una alarma sobre Errors de Lambda, y por qué?",
    "Como no incumplimiento, porque la ausencia de datos simplemente significa que no hubo errores (ni invocaciones) en ese período."
   ],
   [
    "¿Cómo llevas un ID de correlación a través de una cola SQS?",
    "Ponlo en un atributo del mensaje (o en el cuerpo) al enviarlo, y haz que el consumidor lo lea y lo registre."
   ]
  ]
 },
 {
  "t": "Lambda performance: memory/CPU tuning, cold starts, provisioned concurrency, reserved concurrency",
  "tt": "Rendimiento de Lambda: ajuste de memoria/CPU, arranques en frío, concurrencia aprovisionada, concurrencia reservada",
  "body": [
   "El ajuste del rendimiento de Lambda trata de tres cosas: qué tan rápido se ejecuta cada invocación, cuánto tardan en iniciar los nuevos entornos de ejecución y cómo se comparte la concurrencia. Cada una tiene una palanca específica.",
   "La memoria es el único ajuste de tamaño de cómputo: Lambda asigna potencia de CPU (y ancho de banda de red) en proporción a la memoria configurada, así que duplicar la memoria duplica aproximadamente la CPU disponible. Para el código limitado por CPU (procesamiento de imágenes, compresión, cifrado, análisis JSON de documentos grandes), aumentar la memoria a menudo reduce tanto la duración que el costo se mantiene igual o baja, porque pagas memoria multiplicada por duración. Con ajustes de memoria más altos, una función obtiene más de una CPU virtual, lo que solo ayuda si el código usa varios hilos o procesos. Usa el campo `Max Memory Used` de la línea `REPORT` para encontrar funciones con demasiada o muy poca memoria, y prueba distintos ajustes empíricamente, por ejemplo con la herramienta de código abierto AWS Lambda Power Tuning o con las recomendaciones de AWS Compute Optimizer. Las funciones basadas en Arm Graviton (arm64) suelen ofrecer una mejor relación precio-rendimiento.",
   "Un arranque en frío (cold start) ocurre cuando Lambda debe crear un nuevo entorno de ejecución: descargar tu código, iniciar el runtime y ejecutar tu código de inicialización antes del handler. Aparece como `Init Duration` en la línea `REPORT` y en X-Ray. Los arranques en frío ocurren en la primera solicitud, después de escalar, después de desplegar código nuevo y después de que un entorno estuvo inactivo y fue reclamado. Para reducirlos: mantén pequeños los paquetes de despliegue, importa solo lo que necesitas, inicializa los clientes del SDK una vez fuera del handler pero evita trabajo pesado que no se necesita en todas las rutas, elige runtimes y frameworks con arranque rápido y, para los runtimes compatibles como Java, considera Lambda SnapStart, que toma una instantánea de un entorno inicializado y se reanuda a partir de ella. Conectar una función a una VPC ya no agrega un tiempo de arranque en frío significativo como ocurría antes.",
   "La concurrencia aprovisionada preinicializa un número fijo de entornos de ejecución para que estén listos para responder de inmediato, eliminando los arranques en frío para el tráfico hasta ese número. Se configura en una versión publicada o un alias (no en `$LATEST`), cuesta dinero mientras está aprovisionada se use o no, y puede escalarse con Application Auto Scaling según una programación (para el horario laboral) o con seguimiento de objetivos sobre la utilización. Úsala para cargas de trabajo síncronas sensibles a la latencia, como API interactivas con requisitos estrictos de tiempo de respuesta. Las solicitudes por encima de la cantidad aprovisionada las atienden entornos normales bajo demanda, con arranques en frío.",
   "La concurrencia reservada trata de capacidad, no de velocidad. Aparta un número de ejecuciones simultáneas del grupo regional de la cuenta para una función, garantizando que siempre pueda escalar hasta ese nivel, y también actúa como máximo. Ese límite es útil para proteger un recurso de destino, por ejemplo limitar una función a 50 ejecuciones simultáneas para que no pueda abrir más conexiones de las que permite una base de datos relacional, o para evitar que una función descontrolada deje sin capacidad a las demás. La concurrencia reservada no tiene cargo adicional. Las invocaciones que superan la cantidad reservada se limitan.",
   "Mantén clara la distinción: la concurrencia aprovisionada sirve para eliminar los arranques en frío y cuesta más; la concurrencia reservada garantiza y limita el escalado sin costo. Una función puede tener ambas, siempre que la concurrencia aprovisionada no supere su concurrencia reservada. Específicamente para la presión de conexiones a la base de datos, Amazon RDS Proxy agrupa y comparte conexiones entre muchos entornos de Lambda."
  ],
  "terms": [
   [
    "Cold start (arranque en frío)",
    "La latencia adicional cuando Lambda crea e inicializa un nuevo entorno de ejecución antes de ejecutar el handler."
   ],
   [
    "Init Duration (duración de inicialización)",
    "El campo de la línea de log REPORT que muestra cuánto tardó la inicialización en una invocación que tuvo un arranque en frío."
   ],
   [
    "Provisioned concurrency (concurrencia aprovisionada)",
    "Entornos de ejecución preinicializados en una versión o alias que eliminan los arranques en frío, facturados mientras están configurados."
   ],
   [
    "Reserved concurrency (concurrencia reservada)",
    "Un ajuste gratuito que garantiza y limita las ejecuciones simultáneas de una función."
   ],
   [
    "Lambda SnapStart",
    "Una función para los runtimes compatibles que reanuda los nuevos entornos a partir de una instantánea de uno ya inicializado para acortar los arranques en frío."
   ]
  ],
  "example": "La latencia p99 de la API de un banco se dispara cada mañana a las 9:00, cuando el tráfico aumenta y los nuevos entornos tienen arranques en frío. El equipo agrega concurrencia aprovisionada al alias live con una acción programada de Application Auto Scaling que la aumenta antes de las 9:00 y la reduce por la tarde, y configura concurrencia reservada en una función de informes para que no pueda agotar las conexiones de la base de datos.",
  "tip": "¿Latencia por arranques en frío? Concurrencia aprovisionada (o SnapStart para los runtimes compatibles). ¿Proteger un sistema de destino o garantizar capacidad? Concurrencia reservada. ¿Función lenta con mucho uso de CPU? Aumenta la memoria.",
  "check": [
   [
    "¿Qué ajuste elimina los arranques en frío y qué requiere?",
    "La concurrencia aprovisionada, configurada en una versión publicada o un alias y facturada mientras está aprovisionada."
   ],
   [
    "¿Cómo puedes evitar que una función Lambda sature una base de datos RDS con conexiones?",
    "Configura la concurrencia reservada para limitar las ejecuciones simultáneas, y considera RDS Proxy para agrupar las conexiones."
   ],
   [
    "¿Por qué aumentar la memoria podría reducir el costo?",
    "Más memoria da más CPU, así que la función termina más rápido; como el costo es memoria por duración, el total puede mantenerse igual o bajar."
   ]
  ]
 },
 {
  "t": "Stream and queue troubleshooting: Kinesis IteratorAge, parallelization factor, SQS dead-letter queues and redrive",
  "tt": "Solución de problemas de streams y colas: IteratorAge de Kinesis, factor de paralelización, colas de mensajes fallidos de SQS y redrive",
  "body": [
   "Cuando el consumidor de un stream o una cola se atrasa o sigue fallando, los mensajes se acumulan y los datos llegan tarde. El examen describe estos síntomas mediante métricas específicas, y necesitas saber qué significa cada una y qué ajuste lo corrige.",
   "Para Kinesis Data Streams y DynamoDB Streams consumidos por Lambda, la métrica clave es `IteratorAge`: la antigüedad del último registro del lote cuando Lambda lo procesó, es decir, qué tan atrasado está el consumidor respecto al tiempo real. (Kinesis por su parte informa `GetRecords.IteratorAgeMilliseconds`.) Una antigüedad del iterador que crece de forma constante significa que los registros llegan más rápido de lo que se procesan, o que el procesamiento está bloqueado. Los registros que siguen sin procesarse más allá del período de retención del stream se pierden, así que una antigüedad del iterador en aumento es urgente.",
   "Causas comunes y soluciones: la función está fallando en un lote y, como el procesamiento de streams es ordenado por shard, Lambda sigue reintentando ese lote y el shard se detiene. Revisa la métrica `Errors` y los logs, y luego configura el número máximo de reintentos, la antigüedad máxima del registro, la división del lote ante error de la función, las respuestas parciales de lote y un destino on-failure para que un registro malo no pueda bloquear el shard indefinidamente. Si la función simplemente es lenta, optimízala o aumenta su memoria. Si no hay suficiente paralelismo, aumenta el factor de paralelización en el mapeo de fuente de eventos (de 1 hasta 10), lo que permite a Lambda procesar hasta esa cantidad de lotes de cada shard simultáneamente, manteniendo el orden para los registros con la misma clave de partición. Los tamaños de lote y las ventanas de agrupación más grandes reducen la sobrecarga por invocación. Agregar shards aumenta el rendimiento tanto para productores como para consumidores. Cuando varias aplicaciones leen el mismo stream y compiten por el rendimiento de lectura compartido, el enhanced fan-out da a cada consumidor registrado su propio rendimiento de lectura dedicado por shard.",
   "Del lado del productor, `ProvisionedThroughputExceededException` o `WriteProvisionedThroughputExceeded` significa que se superó la capacidad de escritura de un shard, a menudo porque una clave de partición mal elegida envía la mayoría de los registros a un único shard caliente. Usa una clave de partición de mayor cardinalidad, agrega shards (o usa el modo bajo demanda) y reintenta con retroceso.",
   "En SQS, vigila `ApproximateNumberOfMessagesVisible` (el atraso) y `ApproximateAgeOfOldestMessage` (cuánto tiempo lleva esperando el mensaje más antiguo). Si estos valores suben, los consumidores son demasiado lentos, están fallando o no se están ejecutando. En los consumidores Lambda, revisa los errores y la limitación de la función y su ajuste de concurrencia máxima en el mapeo de fuente de eventos. Asegúrate también de que el tiempo de visibilidad de la cola sea holgadamente más largo que el tiempo de espera de la función (AWS recomienda al menos seis veces el tiempo de espera de la función para las fuentes de eventos de Lambda); de lo contrario, los mensajes reaparecen y se procesan dos veces mientras el primer intento sigue en curso.",
   "Una cola de mensajes fallidos atrapa los mensajes que fallan repetidamente. La política de redrive de la cola de origen nombra la DLQ y el `maxReceiveCount`; cuando un mensaje se ha recibido más veces que ese número sin eliminarse, SQS lo mueve a la DLQ. La DLQ debe ser del mismo tipo que la de origen (una cola FIFO necesita una DLQ FIFO) y estar en la misma cuenta y región, y su período de retención debe ser más largo que el de la de origen, porque en las colas estándar se conserva la marca de tiempo original de encolado cuando un mensaje se mueve. Una redrive allow policy en la DLQ controla qué colas de origen pueden usarla. Una vez que hayas corregido el error, el redrive de la DLQ mueve los mensajes de vuelta a la cola de origen (o a otra cola) para reprocesarlos, desde la consola o con la API `StartMessageMoveTask`. Crea siempre una alarma sobre la profundidad de la DLQ, o las fallas pasarán desapercibidas."
  ],
  "terms": [
   [
    "IteratorAge (antigüedad del iterador)",
    "La métrica que muestra la antigüedad de los registros que se procesan de un stream, lo que indica qué tan atrasado está un consumidor."
   ],
   [
    "Parallelization factor (factor de paralelización)",
    "Un ajuste del mapeo de fuente de eventos (de 1 a 10) para lotes simultáneos por shard, que conserva el orden por clave de partición."
   ],
   [
    "Enhanced fan-out",
    "Una función de Kinesis que da a cada consumidor registrado un rendimiento de lectura dedicado por shard."
   ],
   [
    "maxReceiveCount",
    "El número de veces que se puede recibir un mensaje de SQS antes de que la política de redrive lo mueva a la DLQ."
   ],
   [
    "DLQ redrive (reenvío desde la DLQ)",
    "Mover los mensajes de una cola de mensajes fallidos de vuelta a una cola de origen para reprocesarlos después de una corrección."
   ]
  ],
  "example": "El IteratorAge de una función de clickstream sube de segundos a horas. Los logs no muestran errores, pero la duración es alta y el stream tiene solo cuatro shards. El equipo configura el factor de paralelización en 5, así que cada shard lo procesan hasta cinco invocaciones simultáneas, y la antigüedad del iterador vuelve a estar cerca de cero.",
  "tip": "¿IteratorAge en aumento? Busca errores que bloqueen un shard (corrígelos con la división del lote, límites de reintento o respuestas parciales de lote) o poco paralelismo (aumenta el factor de paralelización o agrega shards). ¿Mensajes de SQS procesados dos veces? Tiempo de visibilidad más corto que el tiempo de procesamiento.",
  "check": [
   [
    "¿Qué indica un IteratorAge que aumenta constantemente?",
    "Que el consumidor se está atrasando respecto al stream, porque es demasiado lento o está bloqueado por lotes que fallan, con riesgo de perder datos cuando los registros expiren."
   ],
   [
    "¿Cómo mantiene el orden el aumento del factor de paralelización?",
    "Los registros con la misma clave de partición se siguen procesando en orden; solo las claves distintas dentro de un shard se procesan simultáneamente."
   ],
   [
    "Después de corregir un error, ¿cómo reprocesas los mensajes que están en una DLQ de SQS?",
    "Usa el redrive de la DLQ (desde la consola o con StartMessageMoveTask) para moverlos de vuelta a la cola de origen."
   ]
  ]
 },
 {
  "t": "DynamoDB optimization: hot partitions, key design, on-demand vs provisioned capacity, adaptive capacity",
  "tt": "Optimización de DynamoDB: particiones calientes, diseño de claves, capacidad bajo demanda vs aprovisionada, capacidad adaptativa",
  "body": [
   "El rendimiento de DynamoDB depende mucho de cómo se distribuyen tus datos entre las particiones. Los datos y el rendimiento de una tabla se dividen entre particiones según el hash de la clave de partición, y cada partición tiene su propio límite de rendimiento: hasta 3,000 unidades de capacidad de lectura y 1,000 unidades de capacidad de escritura por segundo. Así que una tabla puede tener mucha capacidad total y aun así sufrir limitación si las solicitudes se concentran en unas pocas claves.",
   "Una partición caliente (o clave caliente) es una partición que recibe una parte desproporcionada del tráfico. Síntomas: `ProvisionedThroughputExceededException` o `ThrottlingException`, aumento de `ThrottledRequests` y de los eventos de limitación de lectura o escritura en CloudWatch, aunque la capacidad consumida de toda la tabla parezca muy por debajo de la aprovisionada. CloudWatch Contributor Insights para DynamoDB puede mostrar las claves más consultadas y más limitadas, lo que facilita identificar las claves calientes.",
   "El diseño de claves es la verdadera solución. Elige una clave de partición con alta cardinalidad (muchos valores distintos) a la que se acceda de forma bastante uniforme, como el ID de usuario, el ID de pedido o el ID de dispositivo. Las malas elecciones incluyen valores de estado (`active` o `inactive`), fechas para escrituras de series temporales (todas las escrituras de hoy caen en una sola clave) o un solo inquilino mucho más grande que los demás. Para patrones de escritura inevitablemente calientes, usa la fragmentación de escrituras (write sharding): agrega un sufijo a la clave, ya sea aleatorio (por ejemplo `2026-09-25#7` con un sufijo de 0 a 9) o calculado a partir de otro atributo para poder volver a encontrar el elemento, y luego consulta todos los sufijos y combina los resultados al leer. Para elementos calientes con mucha lectura, coloca una caché como DAX o ElastiCache delante de la tabla. Evita también los elementos grandes (guarda los blobs grandes en S3 y conserva un puntero), porque las unidades de lectura y escritura escalan con el tamaño del elemento, y usa `Query` en lugar de `Scan`.",
   "Modos de capacidad: el modo bajo demanda (on-demand) cobra por solicitud y escala automáticamente según tu tráfico sin planificación de capacidad, lo que se ajusta a aplicaciones nuevas, tráfico impredecible o con picos, y cargas de trabajo con períodos de inactividad. El modo aprovisionado te hace definir las RCU y WCU, normalmente con auto scaling que ajusta la capacidad entre valores mínimos y máximos para seguir una utilización objetivo. Es más barato para tráfico estable y predecible, pero auto scaling reacciona en minutos, así que los picos repentinos pueden provocar limitación antes de que se ajuste. La capacidad reservada puede reducir aún más los costos del modo aprovisionado para cargas de trabajo estables a largo plazo. Los índices secundarios globales también necesitan suficiente capacidad: un GSI con muy poca capacidad de escritura limita las escrituras en la tabla base.",
   "DynamoDB también tiene protecciones integradas. La capacidad de ráfaga (burst capacity) permite a una partición usar temporalmente la capacidad no utilizada guardada del pasado reciente para absorber picos cortos. La capacidad adaptativa (adaptive capacity) asigna de forma automática e instantánea más rendimiento de la tabla a las particiones que reciben más tráfico, así que el acceso desigual funciona mientras el total se mantenga dentro de la capacidad de la tabla y cada partición no supere sus límites por partición. La capacidad adaptativa también puede dividir una partición para aislar los elementos a los que se accede con frecuencia. Estas funciones reducen la limitación por desequilibrios moderados, pero no pueden corregir una sola clave que supera el rendimiento máximo de una partición; eso sigue requiriendo un mejor diseño de claves o caché.",
   "Del lado del cliente, los SDK reintentan automáticamente las solicitudes limitadas con retroceso exponencial, lo que suaviza la limitación breve pero no sustituye a un buen diseño."
  ],
  "terms": [
   [
    "Hot partition (partición caliente)",
    "Una partición que recibe una parte desproporcionada de las solicitudes y provoca limitación a pesar de que haya capacidad de la tabla sin usar."
   ],
   [
    "Write sharding (fragmentación de escrituras)",
    "Agregar un sufijo aleatorio o calculado a las claves de partición para repartir las escrituras entre más particiones."
   ],
   [
    "On-demand capacity (capacidad bajo demanda)",
    "Un modo de DynamoDB que se factura por solicitud y escala automáticamente sin planificación de capacidad."
   ],
   [
    "Adaptive capacity (capacidad adaptativa)",
    "La reasignación automática de rendimiento de DynamoDB a las particiones más ocupadas y el aislamiento de los elementos consultados con frecuencia."
   ],
   [
    "Burst capacity (capacidad de ráfaga)",
    "Capacidad no utilizada que DynamoDB conserva brevemente para absorber picos cortos de tráfico."
   ]
  ],
  "example": "Una tabla de IoT usa la fecha como clave de partición, así que todas las escrituras del día caen en una sola clave y se limitan en las horas pico. El equipo cambia la clave a deviceId#date para las consultas por dispositivo y, para un resumen diario, agrega un GSI cuya clave de partición es la fecha más un sufijo de 0 a 9, consultando los diez fragmentos para construir el informe.",
  "tip": "Limitación mientras la capacidad total consumida es baja significa una partición caliente: corrige la clave de partición (mayor cardinalidad, fragmentación de escrituras) o guarda en caché las lecturas calientes. El tráfico impredecible o con picos sin planificación de capacidad apunta al modo bajo demanda.",
  "check": [
   [
    "¿Por qué una tabla puede sufrir limitación aunque apenas use su capacidad aprovisionada?",
    "Los límites de rendimiento se aplican por partición, así que el tráfico concentrado en una clave de partición puede superar el límite de esa partición."
   ],
   [
    "¿Cuándo es la capacidad aprovisionada con auto scaling una mejor opción que la bajo demanda?",
    "Para tráfico estable y predecible, donde normalmente es más barata."
   ],
   [
    "¿Qué hace la fragmentación de escrituras?",
    "Agrega un sufijo a la clave de partición para que las escrituras que caerían en una sola clave se repartan entre varias particiones."
   ]
  ]
 },
 {
  "t": "Caching for performance: API Gateway stage caching, CloudFront, ElastiCache, DAX",
  "tt": "Caché para el rendimiento: caché de etapa de API Gateway, CloudFront, ElastiCache, DAX",
  "body": [
   "La caché guarda el resultado de un trabajo costoso para que las solicitudes repetidas se respondan más rápido y los backends trabajen menos. AWS ofrece cachés en varias capas, y las preguntas del examen dan pistas sobre dónde está el trabajo repetido y qué tipo de datos intervienen.",
   "La caché de API Gateway se habilita por etapa en las REST API. API Gateway conserva las respuestas de la integración durante un tiempo de vida (TTL), 300 segundos por defecto y configurable hasta 3,600 segundos (0 deshabilita la caché), y devuelve las respuestas en caché sin llamar a Lambda ni a tu backend. Eliges una capacidad (tamaño) de caché para la etapa y puedes sobrescribir la configuración de caché por método, por ejemplo deshabilitándola para los métodos POST. Por defecto, la clave de caché es el método y la ruta del recurso; agrega parámetros de cadena de consulta o encabezados como claves de caché cuando las respuestas dependan de ellos, o los usuarios recibirán los resultados de otros. Los clientes pueden solicitar una respuesta nueva enviando `Cache-Control: max-age=0`, pero solo si están autorizados (el permiso `execute-api:InvalidateCache`) o si la etapa permite la invalidación no autorizada, lo cual es riesgoso. También puedes vaciar toda la caché de la etapa. Las métricas `CacheHitCount` y `CacheMissCount` muestran su efectividad. La caché se cobra por hora según el tamaño de la caché.",
   "Amazon CloudFront es una red de entrega de contenido (CDN) que guarda en caché el contenido en ubicaciones perimetrales cercanas a los usuarios en todo el mundo. Sirve recursos estáticos desde S3 (protegidos con origin access control para que el bucket siga siendo privado) y también puede guardar en caché respuestas dinámicas o de API de cualquier origen HTTP. Las políticas de caché controlan los TTL y qué encabezados, cookies y cadenas de consulta forman parte de la clave de caché; incluir menos valores aumenta la tasa de aciertos. Para eliminar contenido antes de que expire, crea una invalidación, o mejor aún, usa nombres de archivo con versión (como `app.3f9c.js`) para que el contenido nuevo tenga una URL nueva. Usa CloudFront cuando los usuarios estén geográficamente dispersos y el problema sea la latencia hasta el origen.",
   "Amazon ElastiCache (Redis OSS, Valkey o Memcached) es una caché en memoria que controla el código de tu aplicación, normalmente delante de bases de datos relacionales o servicios lentos. Eliges lazy loading, write-through y los TTL como se vio antes. Funciona para cualquier dato que puedas calcular o consultar: estado de sesión, fragmentos de páginas renderizadas, resultados de joins SQL costosos, tablas de clasificación. Requiere cambios de código y se ejecuta dentro de tu VPC.",
   "DynamoDB Accelerator (DAX) es una caché administrada en memoria creada específicamente para DynamoDB. Es compatible con la API, así que cambias al cliente de DAX con cambios mínimos de código, y reduce la latencia de las lecturas eventualmente consistentes de milisegundos a microsegundos. DAX tiene una caché de elementos (para `GetItem` y `BatchGetItem`) y una caché de consultas (para los resultados de `Query` y `Scan`), y las escrituras pasan por DAX hacia DynamoDB, actualizando la caché de elementos. Las lecturas fuertemente consistentes pasan directamente a DynamoDB y no se guardan en caché, así que DAX no ayuda a las cargas de trabajo que las necesitan ni a las cargas con muchas escrituras.",
   "Cómo elegir: solicitudes de API idénticas y repetidas que llegan a tu backend sugieren la caché de API Gateway; usuarios globales y contenido estático o almacenable en caché sugieren CloudFront; resultados muy consultados de una base de datos relacional o de un cálculo personalizado sugieren ElastiCache; tráfico de DynamoDB con muchas lecturas, lecturas de claves calientes o la necesidad de lecturas en microsegundos con cambios mínimos de código sugieren DAX. Toda caché sacrifica frescura a cambio de velocidad, así que decide qué tan desactualizados pueden estar los datos y configura los TTL en consecuencia."
  ],
  "terms": [
   [
    "API Gateway stage cache (caché de etapa de API Gateway)",
    "Una caché de REST API por etapa que devuelve respuestas de integración almacenadas durante un TTL de hasta 3,600 segundos."
   ],
   [
    "Cache key (clave de caché)",
    "Los atributos de la solicitud que se usan para decidir si una respuesta en caché corresponde a una nueva solicitud."
   ],
   [
    "CloudFront invalidation (invalidación de CloudFront)",
    "Una solicitud que elimina objetos de las cachés perimetrales de CloudFront antes de que expire su TTL."
   ],
   [
    "DynamoDB Accelerator (DAX)",
    "Una caché en memoria compatible con la API para DynamoDB que ofrece lecturas eventualmente consistentes en microsegundos."
   ]
  ],
  "example": "Una API de catálogo de productos respaldada por Lambda y DynamoDB recibe las mismas solicitudes GET miles de veces por minuto. El equipo habilita la caché de API Gateway en la etapa prod con un TTL de 600 segundos y el parámetro de cadena de consulta category como clave de caché, lo que reduce drásticamente las invocaciones de Lambda, y agrega DAX para las búsquedas de elementos restantes.",
  "tip": "DAX solo acelera las lecturas eventualmente consistentes; las lecturas fuertemente consistentes lo evitan. La caché de API Gateway es por etapa, con un TTL predeterminado de 300 segundos y un máximo de 3,600; incluye en la clave de caché los parámetros que cambian la respuesta.",
  "check": [
   [
    "¿Qué pasa si una cadena de consulta que cambia la respuesta no forma parte de la clave de caché de API Gateway?",
    "Solicitudes distintas pueden recibir la misma respuesta en caché, devolviendo datos incorrectos a los usuarios."
   ],
   [
    "¿Por qué DAX no ayudaría a una aplicación que usa lecturas fuertemente consistentes?",
    "Las lecturas fuertemente consistentes pasan directamente a DynamoDB y no se atienden desde la caché de DAX."
   ],
   [
    "¿Cómo puede un cliente autorizado evitar la caché de API Gateway en una solicitud?",
    "Enviando el encabezado Cache-Control: max-age=0, lo que requiere el permiso execute-api:InvalidateCache a menos que la etapa permita la invalidación no autorizada."
   ]
  ]
 }
], { lang: "es" });
