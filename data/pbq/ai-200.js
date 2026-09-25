CertHub.addPbqs("ai-200", [
  { id: "dockerfile-review", d: 1, type: "select", title: "Review a Python Dockerfile",
    prompt: "A teammate submitted this Dockerfile for a Flask API that will run in Azure Container Apps. Select every line that should be changed before it goes to production.",
    context: "1  FROM python:latest\n2  WORKDIR /app\n3  COPY . .\n4  RUN pip install --no-cache-dir -r requirements.txt\n5  ENV DB_PASSWORD=Summer2026\n6  EXPOSE 8000\n7  USER root\n8  CMD [\"gunicorn\", \"-b\", \"0.0.0.0:8000\", \"app:app\"]",
    options: ["Line 1: FROM python:latest", "Line 2: WORKDIR /app", "Line 3: COPY . .", "Line 4: RUN pip install --no-cache-dir -r requirements.txt", "Line 5: ENV DB_PASSWORD=Summer2026", "Line 6: EXPOSE 8000", "Line 7: USER root", "Line 8: CMD [\"gunicorn\", ...]"],
    answers: [0, 2, 4, 6],
    explain: "`latest` is unpinned and the full image is large, so pin a version such as python:3.12-slim. Copying all the code before `pip install` means every code change busts the dependency layer cache; copy requirements.txt first, install, then copy the rest (with a .dockerignore). A password in ENV is baked into the image layers and visible with `docker inspect`, so use a managed identity or Key Vault reference instead. `USER root` runs the app with full privileges; create and switch to a non-root user. WORKDIR, EXPOSE 8000 and the gunicorn CMD are fine." },

  { id: "aca-keda-replicas", d: 1, type: "fill", title: "Predict KEDA replica counts",
    prompt: "A Container App worker uses the scale settings below. Assuming each value is steady long enough for KEDA to react, fill in the replica count for each queue length.",
    context: "scale:\n  minReplicas: 0\n  maxReplicas: 10\n  rules:\n  - name: orders-queue\n    custom:\n      type: azure-servicebus\n      metadata:\n        queueName: orders\n        messageCount: \"20\"\n      identity: system",
    fields: [
      { label: "Replicas when the queue holds 45 messages", answers: ["3"] },
      { label: "Replicas when the queue holds 230 messages", answers: ["10"] },
      { label: "Replicas when the queue holds 0 messages", answers: ["0"] }
    ],
    explain: "The Service Bus scaler targets messageCount messages per replica, so desired replicas = ceil(queue length / 20). 45 / 20 = 2.25, rounded up to 3. 230 / 20 = 11.5, rounded up to 12, but maxReplicas caps it at 10. With an empty queue and minReplicas 0 the app scales to zero, so no replicas run (and nothing is billed for active usage)." },

  { id: "aca-blue-green", d: 1, type: "order", title: "Roll out a new revision safely",
    prompt: "You want to release v2 of a Container App with a test phase and a gradual cutover. Put the steps in the correct order.",
    steps: [
      "Switch the app to multiple revision mode",
      "Deploy the v2 image as a new revision while 100% of traffic stays on the v1 revision",
      "Add a label to the v2 revision and test it through its label URL",
      "Shift 20% of traffic to v2 and watch errors and latency in Application Insights",
      "Move 100% of traffic to v2",
      "Deactivate the old v1 revision"
    ],
    explain: "In single revision mode a new revision replaces the old one automatically, so you must enable multiple revision mode first. The new revision is created with traffic still pinned to v1, and a label gives it a stable URL for testing with no user traffic. Only then do you split traffic (canary), move all traffic after it proves healthy, and finally deactivate v1 once rollback is no longer needed." },

  { id: "pgvector-setup", d: 2, type: "fill", title: "Enable and query pgvector",
    prompt: "You are adding vector search to Azure Database for PostgreSQL flexible server. Embeddings are normalized and you want cosine distance. Fill in the missing values.",
    context: "-- Server parameter set in the portal/CLI: [A] = VECTOR\nCREATE EXTENSION IF NOT EXISTS [B];\nCREATE TABLE docs (id bigserial PRIMARY KEY, tenant text, body text, embedding vector(1536));\nCREATE INDEX ON docs USING hnsw (embedding [C]);\nSET [D] = 100;   -- raise recall for HNSW queries in this session\nSELECT id, body FROM docs WHERE tenant = 'contoso'\nORDER BY embedding [E] $1 LIMIT 5;",
    fields: [
      { label: "[A] server parameter that allow-lists extensions", answers: ["azure.extensions"] },
      { label: "[B] extension name", answers: ["vector"] },
      { label: "[C] operator class", answers: ["vector_cosine_ops"] },
      { label: "[D] query-time HNSW setting", answers: ["hnsw.ef_search"] },
      { label: "[E] distance operator", answers: ["<=>"] }
    ],
    explain: "On flexible server an extension must first be allow-listed in the azure.extensions server parameter, and pgvector's extension name is `vector` (not pgvector). The index operator class must match the query operator: vector_cosine_ops pairs with <=> (cosine distance), while <-> is L2 and <#> is negative inner product. hnsw.ef_search sets the size of the candidate list at query time; higher values improve recall at the cost of speed." },

  { id: "cosmos-vector-terms", d: 2, type: "match", title: "Cosmos DB vector search building blocks",
    prompt: "Match each Cosmos DB for NoSQL vector search element to what it does.",
    pairs: [
      ["flat", "Exact brute-force index over full vectors, limited to 505 dimensions"],
      ["quantizedFlat", "Brute-force search over compressed (quantized) vectors, up to 4,096 dimensions"],
      ["diskANN", "Graph-based approximate index for large vector sets with low latency"],
      ["vectorEmbeddingPolicy", "Declares each embedding path with its data type, dimensions and distance function"],
      ["VectorDistance()", "Query function that scores items against a query vector, used in ORDER BY"],
      ["excludedPaths entry for /embedding/*", "Keeps the vector out of the regular range index to save write RUs"]
    ],
    extra: ["Sets the default consistency level for vector queries", "Creates embeddings from text inside the database"],
    explain: "The container's vector embedding policy describes the vectors; the indexing policy adds a vector index (flat, quantizedFlat or diskANN) and should exclude the vector path from the range index, because indexing hundreds of numbers per item wastes RUs. flat is exact but capped at 505 dimensions, quantizedFlat compresses vectors for brute-force search, and diskANN is the approximate graph index for large collections. Cosmos DB does not generate embeddings; your app calls an embedding model first." },

  { id: "cosmos-point-reads", d: 2, type: "select", title: "Spot the point reads",
    prompt: "The orders container uses /tenantId as its partition key. Select every call that is a point read (about 1 RU for a 1 KB item).",
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
    explain: "A point read uses read_item with both the id and the partition key value, so Cosmos DB goes straight to one item without the query engine. Any query_items call is a query, even when it filters on id and is scoped to one partition, and it costs more RUs; without a partition key it fans out across partitions. upsert_item is a write, and read_all_items scans the whole container." },

  { id: "rag-pipeline-order", d: 2, type: "order", title: "Order a RAG pipeline",
    prompt: "Put the steps of a retrieval-augmented generation (RAG) pipeline in order, from ingestion to answer.",
    steps: [
      "Split the source documents into chunks",
      "Generate an embedding for each chunk",
      "Store each chunk's text, embedding and metadata in a store with a vector index",
      "Embed the user's question with the same embedding model",
      "Run a top-k similarity search filtered by metadata such as tenant",
      "Add the retrieved chunks to the prompt and call the chat model"
    ],
    explain: "Ingestion (chunk, embed, store) happens before any question arrives. At query time the question must be embedded with the same model and dimensions as the stored chunks, otherwise distances are meaningless. The top-k search with metadata filters finds relevant, authorized chunks, and those are placed in the prompt so the model answers from grounded context." },

  { id: "messaging-service-match", d: 3, type: "match", title: "Pick the messaging service",
    prompt: "Match each requirement to the best-fit Azure messaging option.",
    pairs: [
      ["Ingest millions of telemetry events per second and let several consumer groups replay the stream", "Event Hubs"],
      ["Run a function whenever a blob ending in .pdf is created, using push delivery", "Event Grid"],
      ["Process order commands one at a time per customer with peek-lock and dead-lettering", "Service Bus queue with sessions"],
      ["Deliver each order message to billing, shipping and analytics, each with its own filter", "Service Bus topic with subscriptions"]
    ],
    extra: ["Azure Relay", "Azure Notification Hubs"],
    explain: "Event Hubs is a partitioned log for high-volume streams with retention and consumer groups. Event Grid pushes discrete state-change events such as BlobCreated and can filter on subject ends-with .pdf. Service Bus queues give reliable, transactional command processing, and sessions keep ordering per customer. Topics fan one message out to multiple subscriptions, each with SQL or correlation filters (topics need Standard tier or higher)." },

  { id: "sb-dead-letter", d: 3, type: "select", title: "Which messages end up dead-lettered?",
    prompt: "Given the queue settings, select every outcome that moves the message into the dead-letter subqueue.",
    context: "Queue: orders (Standard tier)\n  MaxDeliveryCount: 3\n  LockDuration: 00:01:00\n  DefaultMessageTimeToLive: 1 day\n  DeadLetteringOnMessageExpiration: true\nReceiver: ServiceBusReceiver, receive mode PEEK_LOCK unless stated otherwise",
    options: [
      "Handler calls receiver.dead_letter_message(msg, reason=\"InvalidSchema\")",
      "Message is abandoned twice, then completed on the third delivery",
      "Message's lock expires three times in a row because processing takes 90 seconds",
      "Message sits unread for two days",
      "Handler calls receiver.defer_message(msg)",
      "Message is received in RECEIVE_AND_DELETE mode and the worker crashes before processing it",
      "Handler calls receiver.complete_message(msg)"
    ],
    answers: [0, 2, 3],
    explain: "Explicit dead_letter_message moves the message immediately with your reason. Each abandon or lock expiry increments the delivery count, so three failed deliveries with MaxDeliveryCount 3 dead-letter it (a 90-second job with a 60-second lock should renew the lock). Expired messages go to the DLQ because DeadLetteringOnMessageExpiration is on. A message completed on its third try is done, a deferred message stays in the queue until received by sequence number, and receive-and-delete removes the message on receipt, so a crash loses it rather than dead-lettering it." },

  { id: "func-ncrontab", d: 3, type: "fill", title: "Write timer trigger schedules",
    prompt: "Azure Functions timer triggers use six-field NCRONTAB expressions: {second} {minute} {hour} {day} {month} {day-of-week}. Write the schedule for each @app.timer_trigger (times in UTC).",
    context: "@app.timer_trigger(schedule=\"<A>\", arg_name=\"timer\")\ndef purge_cache(timer: func.TimerRequest) -> None: ...\n\n@app.timer_trigger(schedule=\"<B>\", arg_name=\"timer\")\ndef weekday_report(timer: func.TimerRequest) -> None: ...\n\n@app.timer_trigger(schedule=\"<C>\", arg_name=\"timer\")\ndef nightly_reindex(timer: func.TimerRequest) -> None: ...",
    fields: [
      { label: "<A> every 5 minutes, on the minute", answers: ["0 */5 * * * *", "0 0/5 * * * *"] },
      { label: "<B> 09:30 Monday through Friday", answers: ["0 30 9 * * 1-5", "0 30 9 * * mon-fri"] },
      { label: "<C> 02:00 every day", answers: ["0 0 2 * * *"] }
    ],
    explain: "The first NCRONTAB field is seconds, which is the classic mistake when copying five-field cron expressions (a five-field value fails validation). */5 in the minute field fires every fifth minute; 30 9 with day-of-week 1-5 fires at 09:30 on weekdays; and 0 0 2 fires once at 02:00. Timer triggers run in UTC unless a time zone is configured where the hosting plan supports it." },

  { id: "rbac-role-match", d: 4, type: "match", title: "Least-privilege data-plane roles",
    prompt: "An app uses a managed identity with DefaultAzureCredential. Match each task to the least-privileged built-in role to assign.",
    pairs: [
      ["Read secret values from Key Vault at runtime", "Key Vault Secrets User"],
      ["Create, update and delete secrets from a deployment pipeline", "Key Vault Secrets Officer"],
      ["Pull images from Azure Container Registry", "AcrPull"],
      ["Send messages to a Service Bus queue", "Azure Service Bus Data Sender"],
      ["Receive and complete messages from a Service Bus queue", "Azure Service Bus Data Receiver"],
      ["Read and write items in a Cosmos DB for NoSQL container", "Cosmos DB Built-in Data Contributor"]
    ],
    extra: ["Key Vault Reader", "Contributor"],
    explain: "Data-plane roles grant access to the data itself. Key Vault Secrets User can only read secret contents, while Secrets Officer can manage them; Key Vault Reader sees metadata but not secret values. AcrPull is enough to pull images (AcrPush adds push). Service Bus separates Sender and Receiver, and Cosmos DB's built-in data roles are assigned with the Cosmos DB SQL role commands, not portal IAM. Contributor is a control-plane role and does not grant data access to Key Vault secrets in RBAC mode or Cosmos DB items." },

  { id: "authz-log-triage", d: 4, type: "select", title: "Triage authorization errors in container logs",
    prompt: "A Container App fails after moving from connection strings to its managed identity. Select every log line that points to a missing role assignment (authorization problem) rather than a network, DNS or configuration problem.",
    context: "Console log stream, revision orders-api--v7, host 10.0.4.12",
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
    explain: "A successful token acquisition shows the identity works; 403-style messages afterwards mean the identity lacks a data-plane role. ForbiddenByRbac needs Key Vault Secrets User, the missing 'Send' claim needs Azure Service Bus Data Sender, and readMetadata blocked by RBAC needs a Cosmos DB built-in data role. The DNS failure and Redis timeout are network problems, and the KeyError is a missing app setting in the container configuration." },

  { id: "kql-failures-chart", d: 4, type: "fill", title: "Complete a KQL failure chart",
    prompt: "Complete this Application Insights query so it charts failed requests per role in 5-minute buckets over the last hour.",
    context: "requests\n| where timestamp > [A](1h)\n| where success == false\n| [B] failures = count() by [C](timestamp, 5m), cloud_RoleName\n| render timechart",
    fields: [
      { label: "[A] function for a relative time", answers: ["ago"] },
      { label: "[B] aggregation operator", answers: ["summarize"] },
      { label: "[C] bucketing function", answers: ["bin"] }
    ],
    explain: "ago(1h) returns the time one hour before now, so the filter keeps the last hour. summarize ... by groups rows and computes count() per group, and bin(timestamp, 5m) rounds each timestamp down to a 5-minute bucket so the chart has one point per bucket per role. render timechart then draws a line per cloud_RoleName." }
]);
