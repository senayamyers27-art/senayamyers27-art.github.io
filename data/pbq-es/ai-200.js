/* Spanish translation of the AI-200 exam simulations. Same ids and structure as data/pbq/ai-200.js. */
CertHub.addPbqs("ai-200", [
  { id: "dockerfile-review", d: 1, type: "select", title: "Revisa un Dockerfile de Python",
    prompt: "Un compañero envió este Dockerfile para una API de Flask que se ejecutará en Azure Container Apps. Selecciona todas las líneas que se deben cambiar antes de pasar a producción.",
    context: "1  FROM python:latest\n2  WORKDIR /app\n3  COPY . .\n4  RUN pip install --no-cache-dir -r requirements.txt\n5  ENV DB_PASSWORD=Summer2026\n6  EXPOSE 8000\n7  USER root\n8  CMD [\"gunicorn\", \"-b\", \"0.0.0.0:8000\", \"app:app\"]",
    options: ["Línea 1: FROM python:latest", "Línea 2: WORKDIR /app", "Línea 3: COPY . .", "Línea 4: RUN pip install --no-cache-dir -r requirements.txt", "Línea 5: ENV DB_PASSWORD=Summer2026", "Línea 6: EXPOSE 8000", "Línea 7: USER root", "Línea 8: CMD [\"gunicorn\", ...]"],
    answers: [0, 2, 4, 6],
    explain: "`latest` no fija una versión y la imagen completa es grande, así que fija una versión como python:3.12-slim. Copiar todo el código antes de `pip install` hace que cada cambio de código invalide la caché de la capa de dependencias; copia primero requirements.txt, instala y luego copia el resto (con un .dockerignore). Una contraseña en ENV queda incrustada en las capas de la imagen y es visible con `docker inspect`, así que usa una managed identity o una referencia de Key Vault. `USER root` ejecuta la app con privilegios completos; crea un usuario sin privilegios de root y cámbiate a él. WORKDIR, EXPOSE 8000 y el CMD de gunicorn están bien." },

  { id: "aca-keda-replicas", d: 1, type: "fill", title: "Predice la cantidad de réplicas de KEDA",
    prompt: "Un worker de Container App usa la configuración de escalado de abajo. Suponiendo que cada valor se mantiene estable el tiempo suficiente para que KEDA reaccione, completa la cantidad de réplicas para cada longitud de la cola.",
    context: "scale:\n  minReplicas: 0\n  maxReplicas: 10\n  rules:\n  - name: orders-queue\n    custom:\n      type: azure-servicebus\n      metadata:\n        queueName: orders\n        messageCount: \"20\"\n      identity: system",
    fields: [
      { label: "Réplicas cuando la cola tiene 45 mensajes", answers: ["3"] },
      { label: "Réplicas cuando la cola tiene 230 mensajes", answers: ["10"] },
      { label: "Réplicas cuando la cola tiene 0 mensajes", answers: ["0"] }
    ],
    explain: "El scaler de Service Bus apunta a messageCount mensajes por réplica, así que las réplicas deseadas = ceil(longitud de la cola / 20). 45 / 20 = 2.25, que se redondea hacia arriba a 3. 230 / 20 = 11.5, que se redondea a 12, pero maxReplicas lo limita a 10. Con la cola vacía y minReplicas en 0, la app escala a cero, así que no se ejecuta ninguna réplica (y no se cobra uso activo)." },

  { id: "aca-blue-green", d: 1, type: "order", title: "Publica una nueva revisión de forma segura",
    prompt: "Quieres publicar la v2 de una Container App con una fase de pruebas y un cambio gradual. Ordena correctamente los pasos.",
    steps: [
      "Cambiar la app al modo de múltiples revisiones (multiple revision mode)",
      "Desplegar la imagen v2 como una nueva revisión mientras el 100% del tráfico sigue en la revisión v1",
      "Agregar una etiqueta (label) a la revisión v2 y probarla mediante la URL de su etiqueta",
      "Desviar el 20% del tráfico a v2 y vigilar los errores y la latencia en Application Insights",
      "Mover el 100% del tráfico a v2",
      "Desactivar la revisión v1 anterior"
    ],
    explain: "En el modo de revisión única (single revision mode), una nueva revisión reemplaza automáticamente a la anterior, así que primero debes habilitar el modo de múltiples revisiones. La nueva revisión se crea con el tráfico todavía fijado en v1, y una etiqueta le da una URL estable para probarla sin tráfico de usuarios. Solo entonces divides el tráfico (canary), mueves todo el tráfico cuando demuestra estar sana y, por último, desactivas v1 cuando ya no necesitas poder revertir." },

  { id: "pgvector-setup", d: 2, type: "fill", title: "Habilita y consulta pgvector",
    prompt: "Estás agregando búsqueda vectorial a Azure Database for PostgreSQL flexible server. Los embeddings están normalizados y quieres usar la distancia coseno. Completa los valores que faltan.",
    context: "-- Server parameter set in the portal/CLI: [A] = VECTOR\nCREATE EXTENSION IF NOT EXISTS [B];\nCREATE TABLE docs (id bigserial PRIMARY KEY, tenant text, body text, embedding vector(1536));\nCREATE INDEX ON docs USING hnsw (embedding [C]);\nSET [D] = 100;   -- raise recall for HNSW queries in this session\nSELECT id, body FROM docs WHERE tenant = 'contoso'\nORDER BY embedding [E] $1 LIMIT 5;",
    fields: [
      { label: "[A] parámetro del servidor que incluye extensiones en la lista de permitidas", answers: ["azure.extensions"] },
      { label: "[B] nombre de la extensión", answers: ["vector"] },
      { label: "[C] clase de operador", answers: ["vector_cosine_ops"] },
      { label: "[D] configuración de HNSW en tiempo de consulta", answers: ["hnsw.ef_search"] },
      { label: "[E] operador de distancia", answers: ["<=>"] }
    ],
    explain: "En flexible server, una extensión primero debe incluirse en la lista de permitidas del parámetro del servidor azure.extensions, y el nombre de la extensión de pgvector es `vector` (no pgvector). La clase de operador del índice debe coincidir con el operador de la consulta: vector_cosine_ops va con <=> (distancia coseno), mientras que <-> es L2 y <#> es el producto interno negativo. hnsw.ef_search define el tamaño de la lista de candidatos en tiempo de consulta; los valores más altos mejoran el recall a costa de la velocidad." },

  { id: "cosmos-vector-terms", d: 2, type: "match", title: "Componentes de la búsqueda vectorial de Cosmos DB",
    prompt: "Relaciona cada elemento de la búsqueda vectorial de Cosmos DB for NoSQL con lo que hace.",
    pairs: [
      ["flat", "Índice exacto de fuerza bruta sobre vectores completos, limitado a 505 dimensiones"],
      ["quantizedFlat", "Búsqueda de fuerza bruta sobre vectores comprimidos (cuantizados), hasta 4,096 dimensiones"],
      ["diskANN", "Índice aproximado basado en grafos para grandes conjuntos de vectores con baja latencia"],
      ["vectorEmbeddingPolicy", "Declara cada ruta de embedding con su tipo de dato, sus dimensiones y su función de distancia"],
      ["VectorDistance()", "Función de consulta que puntúa los ítems frente a un vector de consulta; se usa en ORDER BY"],
      ["Entrada de excludedPaths para /embedding/*", "Deja el vector fuera del índice de rango normal para ahorrar RU de escritura"]
    ],
    extra: ["Define el nivel de consistencia predeterminado para las consultas vectoriales", "Crea embeddings a partir de texto dentro de la base de datos"],
    explain: "La vector embedding policy del contenedor describe los vectores; la indexing policy agrega un índice vectorial (flat, quantizedFlat o diskANN) y debe excluir la ruta del vector del índice de rango, porque indexar cientos de números por ítem desperdicia RU. flat es exacto pero está limitado a 505 dimensiones, quantizedFlat comprime los vectores para la búsqueda de fuerza bruta y diskANN es el índice aproximado basado en grafos para colecciones grandes. Cosmos DB no genera embeddings; tu app primero llama a un modelo de embeddings." },

  { id: "cosmos-point-reads", d: 2, type: "select", title: "Detecta las point reads",
    prompt: "El contenedor orders usa /tenantId como partition key. Selecciona todas las llamadas que son una point read (alrededor de 1 RU para un ítem de 1 KB).",
    context: "from azure.cosmos import CosmosClient\nfrom azure.identity import DefaultAzureCredential\nclient = CosmosClient(\"<account endpoint>\", credential=DefaultAzureCredential())\ncontainer = client.get_database_client(\"shop\").get_container_client(\"orders\")",
    options: [
      "container.read_item(item=\"order-42\", partition_key=\"tenant-7\")",
      "container.query_items(\"SELECT * FROM c WHERE c.id = 'order-42'\", enable_cross_partition_query=True)",
      "container.query_items(\"SELECT * FROM c WHERE c.id = @id\", parameters=[{\"name\": \"@id\", \"value\": \"order-42\"}], partition_key=\"tenant-7\")",
      "container.upsert_item({\"id\": \"order-42\", \"tenantId\": \"tenant-7\", \"total\": 19.5})",
      "container.read_item(item=\"order-77\", partition_key=\"tenant-3\")",
      "container.read_all_items()"
    ],
    answers: [0, 4],
    explain: "Una point read usa read_item con el id y el valor de la partition key, así que Cosmos DB va directo a un ítem sin pasar por el motor de consultas. Cualquier llamada a query_items es una consulta, aunque filtre por id y se limite a una partición, y cuesta más RU; sin partition key se distribuye entre todas las particiones. upsert_item es una escritura, y read_all_items recorre todo el contenedor." },

  { id: "rag-pipeline-order", d: 2, type: "order", title: "Ordena un pipeline de RAG",
    prompt: "Ordena los pasos de un pipeline de retrieval-augmented generation (RAG), desde la ingesta hasta la respuesta.",
    steps: [
      "Dividir los documentos de origen en fragmentos (chunks)",
      "Generar un embedding para cada fragmento",
      "Guardar el texto, el embedding y los metadatos de cada fragmento en un almacén con índice vectorial",
      "Generar el embedding de la pregunta del usuario con el mismo modelo de embeddings",
      "Ejecutar una búsqueda de similitud top-k filtrada por metadatos, como el tenant",
      "Agregar los fragmentos recuperados al prompt y llamar al modelo de chat"
    ],
    explain: "La ingesta (fragmentar, generar embeddings, guardar) ocurre antes de que llegue cualquier pregunta. En el momento de la consulta, la pregunta debe convertirse en embedding con el mismo modelo y las mismas dimensiones que los fragmentos guardados; de lo contrario, las distancias no tienen sentido. La búsqueda top-k con filtros de metadatos encuentra fragmentos relevantes y autorizados, y estos se colocan en el prompt para que el modelo responda con un contexto fundamentado." },

  { id: "messaging-service-match", d: 3, type: "match", title: "Elige el servicio de mensajería",
    prompt: "Relaciona cada requisito con la opción de mensajería de Azure que mejor encaja.",
    pairs: [
      ["Ingerir millones de eventos de telemetría por segundo y permitir que varios consumer groups vuelvan a leer el flujo", "Event Hubs"],
      ["Ejecutar una función cada vez que se crea un blob que termina en .pdf, con entrega push", "Event Grid"],
      ["Procesar los comandos de pedidos de uno en uno por cliente, con peek-lock y dead-lettering", "Cola de Service Bus con sessions"],
      ["Entregar cada mensaje de pedido a facturación, envíos y analítica, cada uno con su propio filtro", "Topic de Service Bus con subscriptions"]
    ],
    extra: ["Azure Relay", "Azure Notification Hubs"],
    explain: "Event Hubs es un log particionado para flujos de gran volumen, con retención y consumer groups. Event Grid envía (push) eventos discretos de cambio de estado como BlobCreated y puede filtrar por subject que termina en .pdf. Las colas de Service Bus ofrecen procesamiento de comandos confiable y transaccional, y las sessions mantienen el orden por cliente. Los topics distribuyen un mensaje a varias subscriptions, cada una con filtros SQL o de correlación (los topics requieren el nivel Standard o superior)." },

  { id: "sb-dead-letter", d: 3, type: "select", title: "¿Qué mensajes terminan en dead-letter?",
    prompt: "Dada la configuración de la cola, selecciona todos los resultados que mueven el mensaje a la subcola de dead-letter.",
    context: "Queue: orders (Standard tier)\n  MaxDeliveryCount: 3\n  LockDuration: 00:01:00\n  DefaultMessageTimeToLive: 1 day\n  DeadLetteringOnMessageExpiration: true\nReceiver: ServiceBusReceiver, receive mode PEEK_LOCK unless stated otherwise",
    options: [
      "El handler llama a receiver.dead_letter_message(msg, reason=\"InvalidSchema\")",
      "El mensaje se abandona dos veces y luego se completa en la tercera entrega",
      "El lock del mensaje expira tres veces seguidas porque el procesamiento tarda 90 segundos",
      "El mensaje permanece sin leer durante dos días",
      "El handler llama a receiver.defer_message(msg)",
      "El mensaje se recibe en modo RECEIVE_AND_DELETE y el worker falla antes de procesarlo",
      "El handler llama a receiver.complete_message(msg)"
    ],
    answers: [0, 2, 3],
    explain: "Un dead_letter_message explícito mueve el mensaje de inmediato con el motivo que indiques. Cada abandono o expiración del lock incrementa el delivery count, así que tres entregas fallidas con MaxDeliveryCount 3 lo envían a dead-letter (un trabajo de 90 segundos con un lock de 60 segundos debería renovar el lock). Los mensajes expirados van a la DLQ porque DeadLetteringOnMessageExpiration está activado. Un mensaje completado en su tercer intento ya terminó, un mensaje diferido permanece en la cola hasta que se recibe por número de secuencia, y receive-and-delete elimina el mensaje al recibirlo, así que una falla lo pierde en lugar de enviarlo a dead-letter." },

  { id: "func-ncrontab", d: 3, type: "fill", title: "Escribe programaciones de timer triggers",
    prompt: "Los timer triggers de Azure Functions usan expresiones NCRONTAB de seis campos: {second} {minute} {hour} {day} {month} {day-of-week}. Escribe la programación de cada @app.timer_trigger (horas en UTC).",
    context: "@app.timer_trigger(schedule=\"<A>\", arg_name=\"timer\")\ndef purge_cache(timer: func.TimerRequest) -> None: ...\n\n@app.timer_trigger(schedule=\"<B>\", arg_name=\"timer\")\ndef weekday_report(timer: func.TimerRequest) -> None: ...\n\n@app.timer_trigger(schedule=\"<C>\", arg_name=\"timer\")\ndef nightly_reindex(timer: func.TimerRequest) -> None: ...",
    fields: [
      { label: "<A> cada 5 minutos, en el segundo 0", answers: ["0 */5 * * * *", "0 0/5 * * * *"] },
      { label: "<B> 09:30 de lunes a viernes", answers: ["0 30 9 * * 1-5", "0 30 9 * * mon-fri"] },
      { label: "<C> 02:00 todos los días", answers: ["0 0 2 * * *"] }
    ],
    explain: "El primer campo de NCRONTAB son los segundos, y ese es el error clásico al copiar expresiones cron de cinco campos (un valor de cinco campos no pasa la validación). */5 en el campo de minutos se dispara cada cinco minutos; 30 9 con día de la semana 1-5 se dispara a las 09:30 los días hábiles; y 0 0 2 se dispara una vez a las 02:00. Los timer triggers se ejecutan en UTC a menos que se configure una zona horaria donde el plan de hosting lo permita." },

  { id: "rbac-role-match", d: 4, type: "match", title: "Roles de data plane con mínimo privilegio",
    prompt: "Una app usa una managed identity con DefaultAzureCredential. Relaciona cada tarea con el rol integrado de menor privilegio que debes asignar.",
    pairs: [
      ["Leer valores de secretos de Key Vault en tiempo de ejecución", "Key Vault Secrets User"],
      ["Crear, actualizar y eliminar secretos desde un pipeline de despliegue", "Key Vault Secrets Officer"],
      ["Descargar (pull) imágenes de Azure Container Registry", "AcrPull"],
      ["Enviar mensajes a una cola de Service Bus", "Azure Service Bus Data Sender"],
      ["Recibir y completar mensajes de una cola de Service Bus", "Azure Service Bus Data Receiver"],
      ["Leer y escribir ítems en un contenedor de Cosmos DB for NoSQL", "Cosmos DB Built-in Data Contributor"]
    ],
    extra: ["Key Vault Reader", "Contributor"],
    explain: "Los roles de data plane dan acceso a los datos en sí. Key Vault Secrets User solo puede leer el contenido de los secretos, mientras que Secrets Officer puede administrarlos; Key Vault Reader ve los metadatos, pero no los valores de los secretos. AcrPull basta para descargar imágenes (AcrPush agrega la subida). Service Bus separa Sender y Receiver, y los roles de datos integrados de Cosmos DB se asignan con los comandos de roles SQL de Cosmos DB, no con el IAM del portal. Contributor es un rol de control plane y no da acceso a los datos de los secretos de Key Vault en modo RBAC ni a los ítems de Cosmos DB." },

  { id: "authz-log-triage", d: 4, type: "select", title: "Clasifica errores de autorización en los logs del contenedor",
    prompt: "Una Container App falla después de pasar de connection strings a su managed identity. Selecciona todas las líneas de log que apuntan a una asignación de rol faltante (problema de autorización) y no a un problema de red, DNS o configuración.",
    context: "Stream del log de consola, revisión orders-api--v7, host 10.0.4.12",
    options: [
      "INFO azure.identity: ManagedIdentityCredential.get_token succeeded",
      "ERROR (Forbidden) Caller is not authorized to perform action on resource. Action: Microsoft.KeyVault/vaults/secrets/getSecret/action Code: ForbiddenByRbac",
      "ERROR ServiceRequestError: Failed to resolve 'kv-orders.vault.azure.net' ([Errno -2] Name or service not known)",
      "ERROR Unauthorized access. 'Send' claim(s) are required to perform this operation. Resource: 'sb-orders.servicebus.windows.net/orders'",
      "ERROR KeyError: 'COSMOS_ENDPOINT'",
      "ERROR (Forbidden) Request blocked by Auth: principal does not have required RBAC permissions to perform action Microsoft.DocumentDB/databaseAccounts/readMetadata",
      "ERROR TimeoutError: connecting to redis-orders.example.com:10000 timed out"
    ],
    answers: [1, 3, 5],
    explain: "Una obtención de token exitosa demuestra que la identidad funciona; los mensajes tipo 403 posteriores significan que a la identidad le falta un rol de data plane. ForbiddenByRbac necesita Key Vault Secrets User, el claim 'Send' faltante necesita Azure Service Bus Data Sender, y el readMetadata bloqueado por RBAC necesita un rol de datos integrado de Cosmos DB. La falla de DNS y el timeout de Redis son problemas de red, y el KeyError es una app setting faltante en la configuración del contenedor." },

  { id: "kql-failures-chart", d: 4, type: "fill", title: "Completa un gráfico de fallas en KQL",
    prompt: "Completa esta consulta de Application Insights para que grafique las solicitudes fallidas por rol en intervalos de 5 minutos durante la última hora.",
    context: "requests\n| where timestamp > [A](1h)\n| where success == false\n| [B] failures = count() by [C](timestamp, 5m), cloud_RoleName\n| render timechart",
    fields: [
      { label: "[A] función para un tiempo relativo", answers: ["ago"] },
      { label: "[B] operador de agregación", answers: ["summarize"] },
      { label: "[C] función de agrupación en intervalos", answers: ["bin"] }
    ],
    explain: "ago(1h) devuelve el momento de una hora antes de ahora, así que el filtro conserva la última hora. summarize ... by agrupa las filas y calcula count() por grupo, y bin(timestamp, 5m) redondea cada timestamp hacia abajo a un intervalo de 5 minutos para que el gráfico tenga un punto por intervalo y por rol. Luego render timechart dibuja una línea por cada cloud_RoleName." }
]);
