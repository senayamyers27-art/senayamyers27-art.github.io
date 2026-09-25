/* Lessons for AWS Certified Developer – Associate (DVA-C02): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-developer", [
 {
  "t": "Architectural patterns: event-driven, microservices, fan-out, choreography vs orchestration, loosely coupled and stateless designs",
  "body": [
   "Most DVA-C02 scenarios describe an application built from small pieces that talk to each other, and ask which design keeps it reliable and easy to change. The underlying idea is coupling: how much one component needs to know about, and wait for, another. A tightly coupled system breaks as a whole when one part is slow or down. A loosely coupled system puts something in between (a queue, a topic, an event bus or an API contract) so each part can fail, scale and be deployed on its own.",
   "In an event-driven architecture, components announce that something happened (an order was placed, a file was uploaded) instead of calling each other directly. The producer emits an event and moves on; any number of consumers react to it. On AWS the usual carriers are Amazon Simple Queue Service (SQS) for work queues, Amazon Simple Notification Service (SNS) for publish/subscribe, Amazon EventBridge for routing events by content, and Amazon Kinesis Data Streams for ordered, high-volume streams. Many AWS services, such as Amazon S3 and Amazon DynamoDB, can emit events that trigger AWS Lambda functions directly.",
   "Microservices apply the same thinking to the whole application: split it into small services, each owning one business capability and its own data store, deployed independently and reached only through its API or its events. The benefit is independent scaling and release; the cost is more network calls, more things to monitor and the need to handle partial failure. A common exam distractor is a design where two services share one database table, which quietly couples them again.",
   "Fan-out means one message is delivered to many consumers in parallel. The classic AWS pattern is SNS to multiple SQS queues: a producer publishes once to a topic, and each subscribed queue gets its own copy, so an email service, an analytics service and an inventory service each process at their own pace, and a slow consumer never blocks the others. EventBridge rules with several targets achieve a similar result with content-based filtering.",
   "Choreography and orchestration are two ways to coordinate a multi-step business process. In choreography, there is no central controller: each service listens for events and emits new ones, like dancers who each know their part. It is very loosely coupled but the overall flow is hard to see and debug. In orchestration, one coordinator, typically AWS Step Functions, calls each step, tracks state, and handles retries and compensation. Choose orchestration when you need visibility, ordering, error handling or human approval steps; choose choreography when services should evolve independently and simply react to events.",
   "Stateless design is what lets all of this scale. A stateless compute unit keeps no session or user data in its own memory or local disk between requests, so any instance or Lambda execution environment can serve any request and can be replaced at any moment. State lives in an external store such as DynamoDB, Amazon ElastiCache or S3. Sticky sessions and data kept only in `/tmp` are signs of a stateful design that will not scale out cleanly."
  ],
  "terms": [
   [
    "Loose coupling",
    "Designing components so they interact through an intermediary or stable contract, letting each fail, scale and deploy independently."
   ],
   [
    "Fan-out",
    "Delivering one published message to many subscribers in parallel, for example an SNS topic with several SQS queue subscriptions."
   ],
   [
    "Choreography",
    "Coordination where each service reacts to events and emits new ones with no central controller."
   ],
   [
    "Orchestration",
    "Coordination where a central workflow engine, such as Step Functions, invokes each step and manages state and errors."
   ],
   [
    "Stateless service",
    "A service that keeps no client state between requests, storing it externally so any instance can handle any request."
   ]
  ],
  "example": "An online shop's checkout Lambda function publishes an OrderPlaced message to an SNS topic. Three SQS queues subscribe: one feeds the payment service, one the warehouse service and one the email service. When the email provider has an outage, messages simply wait in its queue while payments and shipping continue normally.",
  "tip": "When a question says one event must trigger several independent processes and a slow consumer must not affect the others, look for SNS fan-out to SQS queues (or EventBridge with multiple targets). When it stresses a visible, ordered workflow with error handling, pick Step Functions orchestration.",
  "check": [
   [
    "Why is SNS publishing to several SQS queues more resilient than SNS invoking several services directly?",
    "Each queue buffers messages for its consumer, so a slow or failed consumer can catch up later without losing messages or delaying other consumers."
   ],
   [
    "When would you choose orchestration over choreography?",
    "When the process needs a central view of state, strict ordering, retries or compensation for failed steps, or human approval, which a Step Functions state machine provides."
   ],
   [
    "What makes a web tier stateless?",
    "It stores session and user data in an external store such as DynamoDB or ElastiCache instead of instance memory or local disk, so any instance can serve any request."
   ]
  ]
 },
 {
  "t": "Resilient code: retries with exponential backoff and jitter, idempotency, timeouts, handling partial failures and dead-letter queues",
  "body": [
   "Distributed systems fail in small ways all the time: a request is throttled, a network call times out, a downstream service briefly returns an error. Resilient code expects this. The DVA-C02 exam tests whether you know the standard techniques and which failures they fix.",
   "Retries are the first tool, but only for transient errors such as throttling (`ThrottlingException`, HTTP 429), HTTP 5xx server errors and network timeouts. Retrying a validation error or an `AccessDenied` just repeats the failure. Retrying immediately in a tight loop is harmful, because every client hammers the struggling service at once. Exponential backoff waits longer after each failed attempt, for example 100 ms, 200 ms, 400 ms, 800 ms, up to a cap and a maximum number of attempts. Jitter adds randomness to each wait so that thousands of clients that failed at the same moment do not all retry at the same moment. The AWS SDKs already implement retries with backoff and jitter for AWS API calls; you configure the retry mode and maximum attempts rather than writing it yourself, but you add it yourself for calls to your own or third-party services.",
   "Idempotency makes retries safe. An operation is idempotent if performing it twice has the same effect as performing it once. Because retries, at-least-once message delivery in SQS standard queues and asynchronous Lambda retries can all deliver the same request more than once, your code should detect duplicates. Common techniques are an idempotency key supplied by the client (for example an order ID), a DynamoDB conditional write such as `attribute_not_exists(orderId)` that fails if the item was already processed, and natural idempotency (setting a value rather than incrementing it).",
   "Timeouts stop one slow dependency from consuming all your resources. Set explicit connect and read timeouts on HTTP and SDK clients that are shorter than your function or request timeout, so your code can log, retry or fail gracefully instead of being killed mid-operation. A Lambda function behind API Gateway, for instance, should give up on a slow downstream call well before API Gateway's own integration timeout.",
   "Partial failure happens when a batch contains good and bad items. If one record in a batch of ten fails and you throw an error, the whole batch is retried, including the nine that succeeded. Batch APIs such as DynamoDB `BatchWriteItem` return `UnprocessedItems` and SQS `SendMessageBatch` returns per-entry failures; your code must retry only those. For Lambda reading from SQS or streams, partial batch responses let you report just the failed items.",
   "A dead-letter queue (DLQ) is where messages go after they have failed a set number of times, so a poison message (one that can never be processed) stops blocking the queue and wasting compute. SQS uses a redrive policy with `maxReceiveCount`; asynchronous Lambda invocations can send failed events to an SQS queue or SNS topic DLQ, or to an on-failure destination. A DLQ is only useful if you alarm on its depth and investigate what lands there."
  ],
  "terms": [
   [
    "Exponential backoff",
    "A retry strategy where the wait between attempts grows multiplicatively, reducing pressure on a struggling service."
   ],
   [
    "Jitter",
    "Random variation added to retry delays so many clients do not retry in synchronized waves."
   ],
   [
    "Idempotency",
    "The property that repeating an operation produces the same result as doing it once, making retries and duplicate deliveries safe."
   ],
   [
    "Poison message",
    "A message that fails processing every time it is received and would loop forever without a dead-letter queue."
   ],
   [
    "Dead-letter queue (DLQ)",
    "A queue that receives messages or events that failed processing after a configured number of attempts, for later inspection."
   ]
  ],
  "example": "A payment Lambda function processes SQS messages. It records each payment ID in DynamoDB with a conditional put using attribute_not_exists, so a message delivered twice is charged once. Its SQS queue has a redrive policy with maxReceiveCount of 5 and a DLQ, and a CloudWatch alarm fires when the DLQ holds any messages.",
  "tip": "If a question mentions throttling errors such as ProvisionedThroughputExceededException or ThrottlingException, the answer is almost always retries with exponential backoff (and jitter), not simply adding more retries or raising timeouts.",
  "check": [
   [
    "Why add jitter to exponential backoff?",
    "Without randomness, clients that failed together retry together, recreating the load spike; jitter spreads retries out over time."
   ],
   [
    "Which errors should not be retried?",
    "Client errors that will fail again unchanged, such as validation errors, malformed requests or AccessDenied; retry only transient errors like throttling, 5xx and timeouts."
   ],
   [
    "How does a DLQ help with a poison message in SQS?",
    "After the message's receive count exceeds maxReceiveCount, SQS moves it to the DLQ, so it stops being retried and blocking processing, and you can inspect it."
   ]
  ]
 },
 {
  "t": "Messaging and streaming: SQS standard vs FIFO (message groups, deduplication, visibility timeout, long polling), SNS fan-out, EventBridge rules and Scheduler, Kinesis Data Streams",
  "body": [
   "AWS offers several services for moving messages between components, and the exam expects you to pick the right one from a few clues: ordering, duplicates, number of consumers, replay and routing.",
   "Amazon SQS is a pull-based queue: producers send messages and consumers poll for them, and each message is processed by one consumer and then deleted. Standard queues offer very high throughput with at-least-once delivery and best-effort ordering, so you may occasionally see duplicates or out-of-order messages. FIFO queues (names must end in `.fifo`) guarantee first-in, first-out order and exactly-once processing within a deduplication window of five minutes, at lower throughput. Ordering in FIFO is per message group: messages with the same `MessageGroupId` are delivered in order, one group at a time, while different groups can be processed in parallel. Deduplication uses either a `MessageDeduplicationId` you supply or content-based deduplication, which hashes the message body.",
   "When a consumer receives an SQS message, the message is not deleted; it becomes invisible for the visibility timeout (30 seconds by default). The consumer must call `DeleteMessage` before the timeout ends, or the message reappears and another consumer may process it again. If processing takes longer, raise the timeout or call `ChangeMessageVisibility`. Long polling (setting `WaitTimeSeconds` up to 20 seconds on `ReceiveMessage`, or the queue's receive wait time) makes the call wait for messages to arrive instead of returning empty immediately, which cuts empty responses and cost. Short polling is the default.",
   "Amazon SNS is push-based publish/subscribe: a message published to a topic is pushed to every subscriber (SQS queues, Lambda functions, HTTP endpoints, email, SMS). SNS itself does not store messages for later reading. Subscription filter policies let each subscriber receive only messages whose attributes (or body) match. SNS FIFO topics can deliver in order to SQS FIFO queues.",
   "Amazon EventBridge is an event bus with content-based routing. Rules match events using event patterns (for example source `aws.s3` and a specific bucket name) and send them to targets such as Lambda, Step Functions, SQS or another bus. It receives events from AWS services, your own applications through `PutEvents` and supported SaaS partners, and can archive and replay events. For time-based work, EventBridge Scheduler creates one-time or recurring schedules (cron or rate expressions) that invoke targets, with time zone support and its own retry and DLQ settings; scheduled rules on an event bus are the older way to do this.",
   "Amazon Kinesis Data Streams is for ordered, replayable, high-volume streaming data such as clickstreams or IoT telemetry. A stream is made of shards; each record has a partition key that decides its shard, and ordering is guaranteed within a shard. Records stay in the stream for the retention period (24 hours by default, extendable), so multiple consumers can read the same data independently and reprocess it. Capacity is managed with provisioned shards or on-demand mode.",
   "Quick choice guide: decouple work with one consumer per message, use SQS; need strict order or no duplicates, SQS FIFO; one message to many subscribers, SNS (usually into SQS); route by event content or from SaaS and AWS services, EventBridge; real-time ordered stream with several consumers and replay, Kinesis."
  ],
  "terms": [
   [
    "Visibility timeout",
    "The period after an SQS message is received during which it is hidden from other consumers; it reappears if not deleted in time."
   ],
   [
    "Message group ID",
    "The FIFO queue attribute that defines an ordered group; messages in the same group are processed strictly in order."
   ],
   [
    "Long polling",
    "A ReceiveMessage call that waits up to 20 seconds for messages, reducing empty responses and cost."
   ],
   [
    "Event pattern",
    "The JSON filter in an EventBridge rule that selects which events are sent to the rule's targets."
   ],
   [
    "Shard",
    "The unit of capacity and ordering in a Kinesis data stream; records with the same partition key go to the same shard."
   ]
  ],
  "example": "A bank processes account transactions through an SQS FIFO queue, using the account number as the MessageGroupId. Transactions for one account are applied strictly in order, while thousands of different accounts are processed in parallel, and the MessageDeduplicationId stops a retried send from debiting twice.",
  "tip": "Messages being processed twice by different consumers usually means the visibility timeout is shorter than the processing time. Many empty ReceiveMessage responses and high cost point to enabling long polling.",
  "check": [
   [
    "How can an SQS FIFO queue keep per-customer ordering but still scale?",
    "Use the customer ID as the MessageGroupId; order is kept within each group while different groups are processed in parallel."
   ],
   [
    "What is the difference between SNS and SQS delivery?",
    "SNS pushes each message to all subscribers and does not keep it; SQS stores messages until a single consumer polls, processes and deletes them."
   ],
   [
    "Which service lets several applications read and replay the same ordered stream of records?",
    "Kinesis Data Streams, because records are retained for the retention period and each consumer tracks its own position."
   ]
  ]
 },
 {
  "t": "AWS Step Functions: Standard vs Express workflows, retry/catch, task tokens for callbacks",
  "body": [
   "AWS Step Functions is a serverless orchestration service. You describe a workflow as a state machine in Amazon States Language (ASL), a JSON-based format, and Step Functions runs it: calling Lambda functions and other AWS services, passing data between steps, waiting, branching and handling errors. Because the workflow's logic lives in the state machine rather than in your code, each Lambda function stays small and the console shows every execution visually, step by step.",
   "The main state types are `Task` (do work, such as invoke a Lambda function or call an AWS API directly through an SDK integration), `Choice` (branch on data), `Parallel` (run branches at the same time), `Map` (run the same steps for each item in an array), `Wait` (pause for a time or until a timestamp), `Pass`, `Succeed` and `Fail`.",
   "There are two workflow types, chosen when you create the state machine. Standard workflows can run for up to one year, use exactly-once execution of each step, and keep a full execution history you can inspect in the console; they are billed per state transition. They suit long-running, auditable business processes, including ones that wait for humans. Express workflows run for up to five minutes, are designed for high-volume event processing (such as handling streaming data or API requests), are billed by number of executions, duration and memory, and send history to CloudWatch Logs rather than keeping it in the service. Asynchronous Express workflows have at-least-once semantics and synchronous ones at-most-once, so steps should be idempotent.",
   "Error handling is declared on states. A `Retry` block lists error names (such as `States.Timeout`, `States.TaskFailed`, `Lambda.ServiceException` or your own custom error names) with `IntervalSeconds`, `MaxAttempts` and `BackoffRate` for exponential backoff. A `Catch` block runs after retries are exhausted and sends execution to a fallback state, with `ResultPath` controlling where the error details are placed in the state's data. This is how you build compensation, for example refunding a payment when shipping fails.",
   "```json\n\"ChargeCard\": {\n  \"Type\": \"Task\",\n  \"Resource\": \"arn:aws:states:::lambda:invoke\",\n  \"Retry\": [{ \"ErrorEquals\": [\"States.TaskFailed\"], \"IntervalSeconds\": 2, \"MaxAttempts\": 3, \"BackoffRate\": 2 }],\n  \"Catch\": [{ \"ErrorEquals\": [\"States.ALL\"], \"ResultPath\": \"$.error\", \"Next\": \"NotifyFailure\" }],\n  \"Next\": \"ShipOrder\"\n}\n```",
   "Service integrations come in three patterns. Request Response calls a service and moves on as soon as it replies. Run a Job (`.sync`) waits for a job such as an AWS Batch job or another state machine to finish. Wait for Callback (`.waitForTaskToken`) pauses the workflow and passes a task token to something outside, for example a message in SQS for a human approval system or a third-party integration. The workflow stays paused until that external process calls `SendTaskSuccess` or `SendTaskFailure` with the token (or the task times out; `HeartbeatSeconds` can detect a worker that went silent). Task tokens are how Standard workflows wait days for a manager to approve something without paying for idle compute."
  ],
  "terms": [
   [
    "Amazon States Language (ASL)",
    "The JSON-based language used to define Step Functions state machines."
   ],
   [
    "Standard workflow",
    "A Step Functions workflow type for long-running (up to one year), exactly-once, fully audited executions."
   ],
   [
    "Express workflow",
    "A Step Functions workflow type for high-volume, short (up to five minutes) executions, logged to CloudWatch Logs."
   ],
   [
    "Task token",
    "A token Step Functions passes to an external process in the Wait for Callback pattern; the workflow resumes when SendTaskSuccess or SendTaskFailure is called with it."
   ]
  ],
  "example": "An expense workflow saves a claim, then uses an SQS task with .waitForTaskToken to put the token in a message for the approval app. Two days later a manager clicks Approve, and the app calls SendTaskSuccess with the token, so the Standard workflow resumes and pays the claim.",
  "tip": "Long-running, auditable, or waiting on humans points to Standard. High event rates with short duration points to Express. Anything that must pause until an outside system responds points to a task token with .waitForTaskToken.",
  "check": [
   [
    "What does a Catch block do that Retry does not?",
    "Catch redirects the execution to a fallback state after the error (and any retries) is not resolved, while Retry only re-attempts the same state."
   ],
   [
    "Why would a workflow that runs for several days need a Standard workflow?",
    "Express workflows are limited to five minutes, while Standard workflows can run for up to one year."
   ],
   [
    "How does an external system resume a workflow paused on a task token?",
    "It calls SendTaskSuccess (or SendTaskFailure) with the task token it received."
   ]
  ]
 },
 {
  "t": "Calling AWS services with the SDKs and CLI: credential provider chain, pagination, waiters, error handling",
  "body": [
   "Every call your code makes to AWS, whether through an AWS SDK (for Python it is Boto3, for JavaScript it is the AWS SDK for JavaScript v3, and so on) or the AWS Command Line Interface (CLI), is an HTTPS request to a service API, signed with Signature Version 4 (SigV4) using credentials. Knowing where those credentials come from, and how to handle multi-page results, long operations and errors, is core developer knowledge.",
   "The SDKs and CLI look for credentials in a fixed order called the default credential provider chain. The exact order varies slightly by SDK, but broadly it is: credentials passed explicitly in code, environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`), the shared credentials and config files (`~/.aws/credentials` and `~/.aws/config`, including named profiles, IAM Identity Center (SSO) profiles and assume-role profiles), and finally the credentials of the compute environment: a Lambda execution role, an Amazon ECS task role, or an Amazon EC2 instance profile through the instance metadata service. The first source that provides credentials wins. That is why the right way to give code on AWS permissions is to attach a role and not put any keys in code or config; the chain finds the role credentials automatically and refreshes them before they expire. A classic troubleshooting case: an EC2 instance uses unexpected permissions because someone left access keys in environment variables or a credentials file, which take precedence over the instance profile.",
   "List and describe APIs return results in pages. A response includes a token such as `NextToken`, `Marker`, or for DynamoDB `LastEvaluatedKey`, and you pass it back to get the next page until no token is returned. SDKs provide paginators that loop for you. The CLI paginates automatically by default; `--max-items` and `--starting-token` control it, and `--page-size` changes how many items each underlying call fetches, which can help avoid timeouts without changing the total output.",
   "```python\nimport boto3\ns3 = boto3.client('s3')\nfor page in s3.get_paginator('list_objects_v2').paginate(Bucket='my-bucket'):\n    for obj in page.get('Contents', []):\n        print(obj['Key'])\n```",
   "Waiters poll a describe call until a resource reaches a desired state, such as `bucket_exists`, an EC2 instance `instance_running` or a DynamoDB `table_exists`, then return, or raise an error after a maximum number of attempts. In the CLI they look like `aws dynamodb wait table-exists --table-name Orders`. Use them instead of writing your own sleep loops.",
   "For error handling, SDKs raise service exceptions carrying an error code and HTTP status. Catch specific codes: `ConditionalCheckFailedException`, `ResourceNotFoundException`, `AccessDeniedException`, `ThrottlingException`. The SDKs automatically retry throttling and transient errors with exponential backoff; you can set the retry mode (`standard` or `adaptive` in many SDKs) and maximum attempts in code or with `AWS_RETRY_MODE` and `AWS_MAX_ATTEMPTS`. Log the request ID from failed calls, since AWS Support and CloudTrail use it to trace a request. For debugging from the CLI, `--debug` shows the full request and response, and `aws sts get-caller-identity` shows which identity your credentials actually resolve to."
  ],
  "terms": [
   [
    "Default credential provider chain",
    "The ordered list of places an SDK or the CLI looks for credentials, ending with the role credentials of the compute environment."
   ],
   [
    "Paginator",
    "An SDK helper that automatically follows continuation tokens to return every page of a list API's results."
   ],
   [
    "Waiter",
    "An SDK or CLI helper that polls until a resource reaches a specified state or a maximum number of attempts is reached."
   ],
   [
    "SigV4",
    "Signature Version 4, the process that signs AWS API requests with credentials so the service can authenticate them."
   ]
  ],
  "example": "A script run by a CI job lists every object in a bucket with 50,000 objects but only processes the first 1,000. The developer switches from a single list_objects_v2 call to the list_objects_v2 paginator, and the script now follows ContinuationToken through every page.",
  "tip": "If code on EC2, ECS or Lambda uses the wrong permissions, suspect hardcoded or environment-variable credentials winning over the role in the credential chain. Run aws sts get-caller-identity to confirm who you are.",
  "check": [
   [
    "Why should Lambda code not contain access keys?",
    "The execution role's temporary credentials are provided automatically through the credential chain and rotated; embedded keys are long-lived, can leak and override the intended role."
   ],
   [
    "A DynamoDB Scan returns a LastEvaluatedKey. What does that mean?",
    "The results are paginated; pass that key as ExclusiveStartKey in the next request to continue until no LastEvaluatedKey is returned."
   ],
   [
    "What is a waiter for?",
    "It polls a resource's status until it reaches a desired state, such as a table becoming ACTIVE, replacing hand-written sleep-and-check loops."
   ]
  ]
 },
 {
  "t": "Lambda configuration: memory, timeout (15-minute max), ephemeral /tmp storage, environment variables, layers, concurrency, VPC access",
  "body": [
   "AWS Lambda runs your code in managed execution environments. You do not choose servers; you set a handful of configuration values, and the exam checks that you know what each one controls and its key limits.",
   "Memory is the main performance setting, from 128 MB up to 10,240 MB. Lambda allocates CPU in proportion to memory, so raising memory also makes CPU-bound code faster; sometimes a higher setting costs less overall because the function finishes sooner. The timeout is how long one invocation may run, from 1 second up to a maximum of 900 seconds (15 minutes); the default is 3 seconds, which surprises many people when a function calling a slow API fails. Work that needs longer than 15 minutes belongs in Step Functions, AWS Fargate or AWS Batch, or must be split into smaller pieces.",
   "Each execution environment has ephemeral storage mounted at `/tmp`, 512 MB by default and configurable up to 10,240 MB. It persists between invocations that reuse the same environment, which is handy for caching a downloaded file, but it is not shared between environments and disappears when the environment is recycled, so never treat it as durable storage. For shared or persistent files, use S3 or Amazon EFS (which Lambda can mount).",
   "Environment variables hold configuration such as table names or stage settings, read with `os.environ` or `process.env`. They are encrypted at rest with KMS (an AWS managed key by default, or your own customer managed key), and there is a total size limit of 4 KB. Secrets should instead be fetched from Secrets Manager or Parameter Store at runtime, or at least encrypted with a customer managed key using encryption helpers so they are not shown in plain text in the console.",
   "Layers are .zip archives of libraries, custom runtimes or shared code that several functions can reference. A function can use up to five layers, and the combined unzipped size of the function and its layers must stay within the 250 MB deployment limit. Layers are versioned and immutable; functions reference a specific layer version ARN. Container image functions do not use layers; you add dependencies to the image instead.",
   "Concurrency is the number of invocations running at the same time. Each account has a Regional concurrency quota shared by all functions (1,000 by default, raisable). Reserved concurrency guarantees a function a slice of that pool and also caps it at that number; setting it to 0 effectively disables the function. Provisioned concurrency keeps a number of environments initialized in advance to avoid cold starts.",
   "By default a Lambda function runs in an AWS-managed network with internet access but no access to resources in your private VPC. To reach an Amazon RDS database or ElastiCache cluster in private subnets, configure the function with VPC subnets and security groups; Lambda creates Hyperplane elastic network interfaces for it (the execution role needs the EC2 network-interface permissions, included in the `AWSLambdaVPCAccessExecutionRole` managed policy). Once attached to a VPC, the function has no internet access unless its subnets route through a NAT gateway; for AWS services you can instead use VPC endpoints."
  ],
  "terms": [
   [
    "Timeout",
    "The maximum run time for one Lambda invocation, configurable from 1 second to 15 minutes, with a default of 3 seconds."
   ],
   [
    "Ephemeral storage (/tmp)",
    "Per-environment scratch disk for a Lambda function, 512 MB by default and configurable up to 10,240 MB, not durable."
   ],
   [
    "Layer",
    "A versioned .zip archive of shared code or dependencies that up to five functions' configurations can include."
   ],
   [
    "Reserved concurrency",
    "A setting that both guarantees and caps the number of concurrent executions for a function."
   ]
  ],
  "example": "A function in private subnets must read from an RDS database and also call a public payments API. It works for the database but the payment calls time out. The fix is to route the subnets' outbound traffic through a NAT gateway, because a VPC-connected Lambda function has no internet access on its own.",
  "tip": "Need more than 15 minutes: not Lambda (use Step Functions, Fargate or Batch). CPU-bound and slow: raise memory. VPC function cannot reach the internet: add a NAT gateway or VPC endpoints.",
  "check": [
   [
    "How do you give a Lambda function more CPU?",
    "Increase its memory setting; Lambda allocates CPU power in proportion to configured memory."
   ],
   [
    "Is data written to /tmp available to the next invocation?",
    "Only if that invocation reuses the same execution environment; it is not shared or durable, so use S3 or EFS for data that must persist."
   ],
   [
    "What happens if you set a function's reserved concurrency to 0?",
    "No invocations can run, so the function is effectively throttled and disabled until the setting is changed."
   ]
  ]
 },
 {
  "t": "Lambda invocation models: synchronous, asynchronous (retries, destinations, DLQs) and event source mappings (SQS, Kinesis, DynamoDB Streams, partial batch responses)",
  "body": [
   "How a Lambda function is invoked decides who retries on failure and where errors end up. There are three models, and many exam questions quietly depend on which one is in play.",
   "Synchronous invocation (`InvocationType` `RequestResponse`) means the caller waits for the function to finish and receives the result or error. API Gateway, Application Load Balancer, Amazon Cognito triggers and a direct `aws lambda invoke` call are synchronous. Lambda does not retry on its own; the caller decides. If the function throws, API Gateway returns an error to the client, and it is the client's job to retry.",
   "Asynchronous invocation (`InvocationType` `Event`) puts the event on an internal Lambda queue and returns immediately with HTTP 202. Amazon S3 event notifications, SNS and EventBridge invoke functions this way. If the function returns an error, Lambda retries it twice more by default (configurable to 0, 1 or 2 retries), with delays between attempts, and keeps events in the queue for up to six hours by default (configurable maximum event age). When all attempts fail, the event can go to a dead-letter queue (an SQS queue or SNS topic that receives only the event payload) or, the newer and richer option, an on-failure destination. Destinations can also route successful results: on-success and on-failure destinations can be SQS, SNS, Lambda, EventBridge (and S3 for failures), and they receive the invocation record including the response or error details. Because events may be delivered more than once, asynchronous handlers must be idempotent.",
   "Event source mappings are for poll-based sources: SQS, Kinesis Data Streams, DynamoDB Streams, Amazon MQ, Amazon MSK and Apache Kafka. Here the Lambda service runs pollers that read records in batches and invoke your function synchronously with each batch. Settings include batch size, batching window, and for streams, starting position and parallelization factor.",
   "Error behaviour differs by source. For SQS, a failed batch is not deleted, so messages become visible again after the queue's visibility timeout and are retried until they succeed or reach the queue's `maxReceiveCount` and move to the queue's own DLQ (configured on the queue, not the function). For Kinesis and DynamoDB Streams, a failing batch blocks that shard, because records must be processed in order, and Lambda retries it until it succeeds or the records expire. Stream mappings let you limit this with maximum retry attempts, maximum record age, bisect batch on function error, and an on-failure destination that receives details of discarded records.",
   "Partial batch responses avoid reprocessing successful records. Enable `ReportBatchItemFailures` on the event source mapping and return the IDs of only the failed items; Lambda then retries just those (for streams, from the first failed sequence number).",
   "```python\ndef handler(event, context):\n    failures = []\n    for record in event['Records']:\n        try:\n            process(record)\n        except Exception:\n            failures.append({'itemIdentifier': record['messageId']})\n    return {'batchItemFailures': failures}\n```"
  ],
  "terms": [
   [
    "Synchronous invocation",
    "The caller waits for the function's response; retries are the caller's responsibility."
   ],
   [
    "Asynchronous invocation",
    "Lambda queues the event, returns 202 immediately, and retries failures itself before sending them to a DLQ or destination."
   ],
   [
    "Lambda destination",
    "A target (SQS, SNS, Lambda, EventBridge, or S3 for failures) that receives a record of an asynchronous or stream invocation's success or failure."
   ],
   [
    "Event source mapping",
    "A Lambda resource that polls a queue or stream and invokes the function with batches of records."
   ],
   [
    "ReportBatchItemFailures",
    "An event source mapping setting that lets the function return only the failed records so successful ones are not retried."
   ]
  ],
  "example": "An S3 upload triggers an image-resizing function asynchronously. Corrupt images make it throw an error, so Lambda retries twice and then sends the invocation record, including the error message and the original event, to an on-failure destination SQS queue that the team reviews each morning.",
  "tip": "A DLQ configured on the Lambda function only applies to asynchronous invocations. For an SQS event source, configure the redrive policy and DLQ on the source queue itself.",
  "check": [
   [
    "Which invocation model does S3 use, and what happens when the function fails?",
    "Asynchronous; Lambda retries up to two more times by default, then sends the event to a DLQ or on-failure destination if configured."
   ],
   [
    "Why can one bad record stall a Kinesis-triggered function?",
    "Stream batches are processed in order per shard, so Lambda keeps retrying the failing batch until it succeeds or expires unless you set retry limits, bisect on error or partial batch responses."
   ],
   [
    "What does a function return to report partial batch failures?",
    "An object with batchItemFailures listing the itemIdentifier (message ID or sequence number) of each failed record."
   ]
  ]
 },
 {
  "t": "Lambda coding practices: initializing SDK clients and connections outside the handler, reading events, returning API Gateway proxy responses",
  "body": [
   "A Lambda function is a handler: a function Lambda calls once per invocation with two arguments, the event (the input data) and the context (runtime information such as the request ID and remaining time). Writing the handler well has a direct effect on speed, cost and correctness.",
   "Lambda reuses execution environments. The first invocation in a new environment runs the init phase, which loads your code and runs everything outside the handler; this is part of a cold start. Later invocations in the same environment skip straight to the handler. So create SDK clients, database connections, and load configuration or large libraries at module level, outside the handler. They are created once and reused across many warm invocations, which saves time and avoids opening a new database connection on every request. Keep anything request-specific inside the handler, and do not store user data in global variables, because the next invocation may come from a different user.",
   "```python\nimport os, json, boto3\n\ntable = boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])  # runs once per environment\n\ndef handler(event, context):\n    order_id = event['pathParameters']['id']\n    item = table.get_item(Key={'orderId': order_id}).get('Item')\n    if not item:\n        return {'statusCode': 404, 'body': json.dumps({'message': 'not found'})}\n    return {\n        'statusCode': 200,\n        'headers': {'Content-Type': 'application/json'},\n        'body': json.dumps(item, default=str)\n    }\n```",
   "Reading the event correctly means knowing its shape for each source. An S3 notification arrives as `event['Records'][i]['s3']['bucket']['name']` and `['object']['key']` (keys are URL-encoded, so decode them). SQS delivers `Records` with `body` as a string you usually parse as JSON. An API Gateway proxy integration event includes `httpMethod` (REST API) or `requestContext.http.method` (HTTP API payload version 2.0), `path`, `headers`, `queryStringParameters`, `pathParameters`, and `body` as a string, possibly Base64-encoded when `isBase64Encoded` is true. Always handle missing fields, because `queryStringParameters` is null when no query string is sent.",
   "With a Lambda proxy integration, API Gateway passes the whole request to the function and expects a specific response object back: `statusCode` (number), optional `headers` and `multiValueHeaders`, `body` as a string (so you must `json.dumps` or `JSON.stringify` objects), and optional `isBase64Encoded` for binary content. If you return a different shape, such as a raw object or a body that is not a string, API Gateway cannot map it and the client receives a 502 Bad Gateway with a message like 'Malformed Lambda proxy response'. For browser clients calling a proxy integration, the function itself must return CORS headers such as `Access-Control-Allow-Origin`.",
   "Other good practices: use the context object's `get_remaining_time_in_millis()` to stop gracefully before timing out; log in structured JSON; keep deployment packages small; and avoid recursive patterns, such as a function that writes to the same S3 bucket prefix that triggers it."
  ],
  "terms": [
   [
    "Handler",
    "The function Lambda calls for each invocation, receiving the event and the context object."
   ],
   [
    "Init phase",
    "The part of a cold start where Lambda loads code and runs initialization outside the handler, done once per execution environment."
   ],
   [
    "Lambda proxy integration",
    "An API Gateway integration that passes the full HTTP request to Lambda and expects a response with statusCode, headers and a string body."
   ],
   [
    "Context object",
    "The second handler argument, exposing the request ID, function name, memory limit and remaining execution time."
   ]
  ],
  "example": "A team's API returns 502 errors after a refactor. The logs show the function now returns {'statusCode': 200, 'body': {'id': 7}}. Because the body is an object rather than a string, API Gateway rejects the response; wrapping it in json.dumps fixes the error.",
  "tip": "Expect a question where the fix for slow or connection-exhausting functions is moving client or connection creation outside the handler. A 502 from a proxy integration almost always means the response shape or string body is wrong.",
  "check": [
   [
    "Why initialize a database connection outside the handler?",
    "It runs once per execution environment and is reused by warm invocations, reducing latency and the number of connections opened."
   ],
   [
    "What must the body field be in a Lambda proxy response?",
    "A string; objects must be serialized, for example with JSON.stringify or json.dumps."
   ],
   [
    "Where is the query string found in a REST API proxy event, and what is its value when none is sent?",
    "In queryStringParameters, which is null when the request has no query string, so code must handle that case."
   ]
  ]
 },
 {
  "t": "DynamoDB: partition and sort keys, Query vs Scan, LSI vs GSI, RCU/WCU math, consistency models, condition expressions, TTL, Streams, DAX",
  "body": [
   "Amazon DynamoDB is a serverless key-value and document database. It is fast at any scale if you design around its keys, and it is heavily tested on DVA-C02, including arithmetic.",
   "Every table has a primary key. A simple primary key is just a partition key; DynamoDB hashes it to choose the storage partition, so each value must be unique. A composite primary key adds a sort key: items share a partition key and are stored sorted by sort key, which enables range queries such as all orders for customer 42 between two dates. Items can be up to 400 KB.",
   "`Query` finds items by partition key (exact match) and can narrow by sort key conditions (`=`, `<`, `between`, `begins_with`). It reads only matching items and is efficient. `Scan` reads every item in the table or index and then filters, consuming capacity for everything read even when a `FilterExpression` discards most of it. Prefer Query; use Scan only for small tables or exports, and speed large scans with parallel scan segments. `ProjectionExpression` limits the attributes returned but not the capacity consumed.",
   "Secondary indexes enable queries on other attributes. A local secondary index (LSI) keeps the same partition key with a different sort key, must be created when the table is created, and supports strongly consistent reads. A global secondary index (GSI) can have a completely different partition and sort key, can be added any time, has its own capacity, and supports only eventually consistent reads. If a GSI's write capacity is too low, writes to the base table get throttled.",
   "Capacity math: one read capacity unit (RCU) is one strongly consistent read per second of an item up to 4 KB, or two eventually consistent reads per second. One write capacity unit (WCU) is one write per second of an item up to 1 KB. Round the item size up first, then multiply. Transactional reads and writes cost double. For example, 10 strongly consistent reads per second of 6 KB items: 6 KB rounds up to 8 KB, which is 2 RCU each, so 20 RCU; eventually consistent would be 10 RCU. Writing 5 items per second of 2.5 KB rounds up to 3 KB each, so 15 WCU.",
   "Reads are eventually consistent by default and may briefly miss a recent write; set `ConsistentRead=true` for strongly consistent reads (at double the RCU cost). Condition expressions make writes conditional, for example `attribute_not_exists(pk)` to prevent overwriting or `version = :expected` for optimistic locking; a failed condition raises `ConditionalCheckFailedException`. `UpdateItem` with `ADD` or `SET x = x + :inc` updates atomically without a read.",
   "Time to Live (TTL) deletes items after a timestamp stored in an attribute you name, as Unix epoch seconds, at no write cost; deletion happens in the background, typically within a few days, so filter out expired items in queries. DynamoDB Streams records item-level changes (keys only, new image, old image, or both) for 24 hours and commonly triggers Lambda for replication, auditing or notifications. DynamoDB Accelerator (DAX) is an in-memory, API-compatible cache that brings eventually consistent reads down to microseconds; it does not help strongly consistent reads or write-heavy workloads."
  ],
  "terms": [
   [
    "Partition key",
    "The key attribute DynamoDB hashes to decide which partition stores an item."
   ],
   [
    "Global secondary index (GSI)",
    "An index with its own partition and sort key, addable any time, with separate capacity and eventually consistent reads only."
   ],
   [
    "Local secondary index (LSI)",
    "An index sharing the table's partition key with an alternate sort key; created only with the table."
   ],
   [
    "Read capacity unit (RCU)",
    "One strongly consistent read per second, or two eventually consistent reads, of an item up to 4 KB."
   ],
   [
    "Write capacity unit (WCU)",
    "One write per second of an item up to 1 KB."
   ]
  ],
  "example": "A game stores scores with partition key playerId and sort key gameDate. To show a leaderboard for one game across all players, the developer adds a GSI with partition key gameId and sort key score, then runs a Query on the GSI with ScanIndexForward set to false.",
  "tip": "For RCU/WCU questions, always round item size up to the next 4 KB (reads) or 1 KB (writes) before multiplying, then halve for eventually consistent reads or double for transactions.",
  "check": [
   [
    "How many RCUs do 20 eventually consistent reads per second of 9 KB items need?",
    "9 KB rounds to 12 KB, which is 3 RCU per strongly consistent read; eventually consistent halves it, so 20 x 3 / 2 = 30 RCU."
   ],
   [
    "You need a new query pattern on an existing table with a different partition key. LSI or GSI?",
    "A GSI, because it can use a different partition key and can be added to an existing table."
   ],
   [
    "Why is a Scan with a FilterExpression expensive?",
    "Capacity is consumed for every item read before the filter is applied, not just for items returned."
   ]
  ]
 },
 {
  "t": "Amazon S3 from code: multipart upload, storage classes and lifecycle, event notifications",
  "body": [
   "Amazon S3 stores objects (files plus metadata) in buckets, addressed by key. As a developer you mostly call `PutObject`, `GetObject`, `ListObjectsV2` and `DeleteObject`, but the exam focuses on large uploads, choosing storage classes and reacting to changes.",
   "A single `PutObject` can upload up to 5 GB. Multipart upload splits a large object into parts that are uploaded independently and in parallel, then assembled. It is required above 5 GB and recommended for objects over about 100 MB. The flow is `CreateMultipartUpload` (returns an upload ID), `UploadPart` for each part (each gets an ETag; parts are 5 MB to 5 GB except the last, with up to 10,000 parts), then `CompleteMultipartUpload` with the list of part numbers and ETags. Benefits: higher throughput, and a failed part can be retried alone instead of restarting the whole upload. The SDKs' high-level transfer utilities, and `aws s3 cp`, do this automatically. Incomplete multipart uploads keep their parts stored (and billed) until aborted, so add a lifecycle rule to abort incomplete uploads after some days.",
   "For fast uploads from distant clients, S3 Transfer Acceleration routes data through CloudFront edge locations. For downloads, byte-range fetches (the `Range` header) retrieve parts of an object in parallel or resume a failed download.",
   "Storage classes trade cost against access speed and pattern. S3 Standard is for frequently accessed data. S3 Intelligent-Tiering moves objects between access tiers automatically based on usage, good when patterns are unknown. S3 Standard-IA (Infrequent Access) and S3 One Zone-IA cost less to store but charge per retrieval; One Zone-IA keeps data in a single Availability Zone, so use it only for re-creatable data. S3 Glacier Instant Retrieval, Glacier Flexible Retrieval and Glacier Deep Archive are for archives, with the latter two requiring a restore request that takes minutes to hours before data can be read. You set the class per object with the `StorageClass` parameter.",
   "Lifecycle configuration automates this with rules scoped by prefix or tag: transition actions move objects to cheaper classes after a number of days (for example Standard-IA at 30 days, Glacier Flexible Retrieval at 90), and expiration actions delete objects, old noncurrent versions in versioned buckets, or incomplete multipart uploads.",
   "S3 event notifications fire when objects are created, removed, restored or replicated, and can be filtered by key prefix and suffix (for example `uploads/` and `.jpg`). Destinations are Lambda, SQS and SNS; the destination's resource policy must allow S3 to invoke or send to it. Alternatively, enable delivery of S3 events to EventBridge to get richer filtering and many more targets. Notifications are typically delivered in seconds and can occasionally be delivered more than once, so handlers should be idempotent. Avoid writing output back into the prefix that triggers the function, which creates an invocation loop."
  ],
  "terms": [
   [
    "Multipart upload",
    "Uploading an object as separately uploaded parts that S3 assembles; required above 5 GB and recommended for large files."
   ],
   [
    "Lifecycle rule",
    "A bucket configuration that transitions objects to other storage classes or expires them after set periods."
   ],
   [
    "S3 Intelligent-Tiering",
    "A storage class that automatically moves objects between access tiers based on how often they are accessed."
   ],
   [
    "Event notification",
    "An S3 feature that sends object-level events to Lambda, SQS, SNS or EventBridge, optionally filtered by prefix and suffix."
   ]
  ],
  "example": "A video platform uploads 20 GB files from a mobile app. It uses multipart upload with 100 MB parts in parallel, so a dropped connection only retries one part. An ObjectCreated notification filtered to the suffix .mp4 sends a message to an SQS queue that transcoding workers consume, and a lifecycle rule moves originals to Glacier Flexible Retrieval after 90 days.",
  "tip": "Uploads over 5 GB must use multipart upload. Remember the lifecycle rule to abort incomplete multipart uploads when a question asks why storage costs keep growing with no visible objects.",
  "check": [
   [
    "What three API calls make up a multipart upload?",
    "CreateMultipartUpload, UploadPart for each part, then CompleteMultipartUpload (or AbortMultipartUpload to cancel)."
   ],
   [
    "Which storage class suits data with unpredictable access patterns?",
    "S3 Intelligent-Tiering, which moves objects between tiers automatically based on access."
   ],
   [
    "What must be in place for S3 to invoke a Lambda function on upload?",
    "An event notification configuration on the bucket and a resource-based policy on the function allowing s3.amazonaws.com to invoke it."
   ]
  ]
 },
 {
  "t": "Caching strategies with ElastiCache: lazy loading, write-through, TTLs; choosing between SQL, NoSQL and in-memory stores",
  "body": [
   "A cache keeps frequently read data in fast memory so your application does not hit the database for every request. Amazon ElastiCache is a managed in-memory service that runs Redis OSS, Valkey or Memcached engines. The exam asks how to populate and expire the cache, and when a different type of data store is the right choice.",
   "Lazy loading (also called cache-aside) loads data into the cache only when it is requested. The application checks the cache; on a hit it returns the value; on a miss it reads from the database, writes the result to the cache, and returns it. Advantages: only requested data is cached, and a failed cache node is not fatal, because the application just falls back to the database. Disadvantages: every miss costs three trips (cache, database, cache write), and cached data can become stale because nothing updates it when the database changes.",
   "```python\ndef get_product(pid):\n    cached = cache.get(f'product:{pid}')\n    if cached:\n        return json.loads(cached)\n    item = db_get_product(pid)\n    cache.set(f'product:{pid}', json.dumps(item), ex=300)  # 5-minute TTL\n    return item\n```",
   "Write-through updates the cache whenever the application writes to the database. Data in the cache is never stale, and reads are fast. The costs are a write penalty (two writes per update), and cache churn: much of what you write may never be read, wasting memory. Also, data is missing from the cache until it is written, so a new node starts empty; that is why write-through is usually combined with lazy loading.",
   "A time to live (TTL) on each key limits staleness and memory use: when it expires, the next read is a miss and reloads fresh data. Short TTLs mean fresher data but more database load; long TTLs mean the opposite. Adding a little random variation to TTLs avoids many keys expiring at once. When memory fills, the engine evicts keys according to its eviction policy, such as least recently used.",
   "Engine choice: Redis OSS and Valkey support rich data structures (sorted sets for leaderboards, hashes, lists), replication with automatic failover across Availability Zones, persistence, backups and pub/sub. Memcached is simpler, multi-threaded and horizontally partitioned, but has no replication or persistence. If a question mentions high availability, sorted leaderboards or session stores that must survive a node failure, pick Redis OSS or Valkey.",
   "Choosing the store: use a relational (SQL) database such as Amazon RDS or Amazon Aurora when you need joins, complex ad hoc queries and multi-row transactions over structured data. Use a NoSQL store such as DynamoDB for known access patterns at massive scale with single-digit-millisecond latency and flexible schemas. Use an in-memory store (ElastiCache, or DAX in front of DynamoDB) for microsecond-to-sub-millisecond reads of hot data, session state, rate counters and leaderboards, usually in front of a durable database rather than instead of it."
  ],
  "terms": [
   [
    "Lazy loading (cache-aside)",
    "A strategy that populates the cache only on a cache miss, after reading from the database."
   ],
   [
    "Write-through",
    "A strategy that writes to the cache every time the database is updated, keeping cached data current."
   ],
   [
    "TTL (time to live)",
    "An expiry time on a cache key after which it is removed and reloaded on the next read."
   ],
   [
    "Cache hit ratio",
    "The proportion of reads served from the cache; a low ratio suggests poor keys, short TTLs or too small a cache."
   ]
  ],
  "example": "A news site reads article pages from Aurora. It adds ElastiCache for Valkey with lazy loading and a 10-minute TTL, so popular articles are served from memory. When an editor updates an article, the CMS also writes the new version to the cache (write-through), so readers never see a stale headline.",
  "tip": "Stale data complaint: add write-through or shorten the TTL. Cache filling with data nobody reads: that is write-through churn, so combine it with TTLs. Need replication, failover or sorted sets: Redis OSS or Valkey, not Memcached.",
  "check": [
   [
    "What is the main drawback of lazy loading?",
    "Data can become stale because the cache is only updated on a miss, and every miss adds latency from extra round trips."
   ],
   [
    "Why combine write-through with a TTL?",
    "Write-through caches every write, including rarely read data; a TTL expires unused keys so memory is not wasted."
   ],
   [
    "When would you choose ElastiCache for Redis OSS over Memcached?",
    "When you need replication and automatic failover, persistence, backups or advanced data structures such as sorted sets."
   ]
  ]
 },
 {
  "t": "IAM for applications: execution roles, instance profiles, ECS task roles, least-privilege policies, policy evaluation (explicit deny wins)",
  "body": [
   "Applications need permissions just as people do, and AWS Identity and Access Management (IAM) provides them through roles. A role is an identity with permission policies but no long-term password or access keys; whoever is allowed to assume it gets temporary credentials from the AWS Security Token Service (STS). Giving your code a role, rather than embedding an IAM user's access keys, is the pattern the exam expects every time.",
   "Each compute service has its own way to attach a role. A Lambda execution role is assumed by the Lambda service on the function's behalf; its trust policy allows `lambda.amazonaws.com`, and its permissions decide what the function code can call. At minimum it needs permission to write to CloudWatch Logs (the `AWSLambdaBasicExecutionRole` managed policy); reading from SQS or streams through an event source mapping also requires the matching read permissions on this role. For EC2, a role is attached through an instance profile, a container for the role that the instance exposes through the instance metadata service; the SDK credential chain picks up the credentials automatically. For Amazon ECS, the task role gives the application containers their AWS permissions, while the separate task execution role is used by the ECS agent to pull images from Amazon ECR and send logs. Mixing these two up is a common trap.",
   "Least privilege means granting only the actions and resources the code actually needs. A policy statement has `Effect` (Allow or Deny), `Action`, `Resource` and optional `Condition`. Instead of `dynamodb:*` on `*`, grant `dynamodb:GetItem` and `dynamodb:PutItem` on the ARN of one table. Conditions narrow further, for example by source VPC, tag, or requiring encryption.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"dynamodb:GetItem\", \"dynamodb:PutItem\"],\n    \"Resource\": \"arn:aws:dynamodb:us-east-1:111122223333:table/Orders\"\n  }]\n}\n```",
   "Policy evaluation within one account follows a simple logic. Every request starts as implicitly denied. AWS then gathers all applicable policies: identity-based policies, resource-based policies, permissions boundaries, session policies, and service control policies (SCPs) from AWS Organizations. If any applicable policy has an explicit `Deny` that matches, the request is denied, no matter how many Allows exist. Otherwise, if an Allow grants it (and no boundary, SCP or session policy limits it), the request is allowed. If nothing allows it, the implicit deny stands. So: explicit deny beats allow, and allow beats the default implicit deny.",
   "Managed policies (AWS managed or customer managed) are reusable and versioned; inline policies are embedded in a single role or user and deleted with it. Permissions boundaries set the maximum permissions an identity-based policy can grant, which is useful when developers are allowed to create roles for their own functions. To test policies, use the IAM policy simulator, and read the `AccessDenied` error message, which often names the missing action and the type of policy that blocked it."
  ],
  "terms": [
   [
    "Execution role",
    "The IAM role a Lambda function assumes to get temporary credentials for calling other AWS services."
   ],
   [
    "Instance profile",
    "A container that attaches an IAM role to an EC2 instance so applications on it receive temporary credentials."
   ],
   [
    "ECS task role",
    "The IAM role whose permissions the application containers in an ECS task use, distinct from the task execution role."
   ],
   [
    "Explicit deny",
    "A policy statement with Effect Deny that overrides any Allow for matching requests."
   ],
   [
    "Least privilege",
    "Granting only the specific actions and resources needed to perform a task."
   ]
  ],
  "example": "A containerized service on Fargate fails with AccessDenied when writing to S3, even though the task execution role has AmazonS3FullAccess. The developer realizes the application uses the task role, not the execution role, and attaches a policy allowing s3:PutObject on the one bucket to the task role instead.",
  "tip": "If a question shows both an Allow and a Deny for the same action, the answer is denied. If it asks how an app on EC2 should get credentials, pick an IAM role via an instance profile, never access keys on the instance.",
  "check": [
   [
    "Which role lets an ECS container call DynamoDB, and which lets ECS pull the image from ECR?",
    "The task role grants the application's permissions; the task execution role lets the ECS agent pull images and write logs."
   ],
   [
    "A user has an identity policy allowing s3:* and an SCP denies s3:DeleteBucket. Can they delete a bucket?",
    "No; the explicit deny in the SCP overrides the allow."
   ],
   [
    "What does a Lambda execution role need at minimum?",
    "Permission to create log streams and write log events to CloudWatch Logs, as in AWSLambdaBasicExecutionRole."
   ]
  ]
 },
 {
  "t": "Resource-based policies: Lambda permissions for S3/SNS/API Gateway, S3 bucket policies, KMS key policies",
  "body": [
   "Identity-based policies are attached to a user or role and say what that identity can do. Resource-based policies are attached to a resource and say who can access it. They include a `Principal` element naming who is allowed, which can be an AWS account, a role, or an AWS service such as `s3.amazonaws.com`. Many integration errors on the exam come down to a missing resource-based policy.",
   "A Lambda function's resource-based policy (its function policy) controls which services and accounts may invoke it. When S3, SNS, EventBridge or API Gateway invokes a function, those services do not assume your execution role; they need permission on the function itself. You add it with `lambda add-permission` (the console does this for you when you add a trigger). Use `SourceArn` (and for S3, `SourceAccount`) conditions so only your specific bucket, topic or API can invoke the function, which prevents the confused deputy problem where another customer's resource triggers your function.",
   "```bash\naws lambda add-permission \\\n  --function-name resize-image \\\n  --statement-id s3-invoke \\\n  --action lambda:InvokeFunction \\\n  --principal s3.amazonaws.com \\\n  --source-arn arn:aws:s3:::my-upload-bucket \\\n  --source-account 111122223333\n```",
   "For API Gateway the principal is `apigateway.amazonaws.com` and the source ARN is the API's execute-api ARN, which can be scoped to a stage, method and path. When a stage variable points to different function aliases, each alias needs its own permission. A missing permission here shows up as a 500 error from API Gateway with 'Invalid permissions on Lambda function' in execution logs. For SQS, Kinesis and DynamoDB Streams event sources it is the opposite: Lambda polls them, so the execution role needs read permissions and no function policy is required.",
   "S3 bucket policies are JSON policies on the bucket. They can grant access to other accounts, enforce conditions for everyone (for example deny any request where `aws:SecureTransport` is false, or deny `PutObject` without a required encryption header), and restrict access to specific VPC endpoints or source IPs. Access within one account is granted if either the identity policy or the bucket policy allows it and nothing explicitly denies it; cross-account access requires both sides to allow it. S3 Block Public Access settings override bucket policies that would make data public.",
   "AWS Key Management Service (KMS) key policies are special: every KMS key must have one, and it is the primary control. IAM policies grant access to a key only if the key policy allows it, typically through the default statement that gives the account root principal full access, which in effect delegates to IAM. Without that statement, even an administrator's IAM policy cannot use the key. For cross-account use, the key policy must name the other account and that account's IAM policies must also allow the KMS actions. Grants are an additional mechanism for temporary, programmatic delegation of key use to AWS services."
  ],
  "terms": [
   [
    "Resource-based policy",
    "A policy attached to a resource that names the principals allowed to access it."
   ],
   [
    "Function policy",
    "The resource-based policy on a Lambda function that authorizes services or accounts to invoke it."
   ],
   [
    "Bucket policy",
    "A resource-based policy on an S3 bucket controlling access and enforcing conditions for requests to it."
   ],
   [
    "Key policy",
    "The mandatory resource-based policy on a KMS key; IAM policies only work if it allows them."
   ],
   [
    "Confused deputy",
    "A situation where a trusted service is tricked into acting for the wrong party, prevented with SourceArn and SourceAccount conditions."
   ]
  ],
  "example": "A developer creates an SNS topic subscription to a Lambda function using the CLI, but messages never trigger it. The function policy has no statement allowing sns.amazonaws.com. Running lambda add-permission with the topic's ARN as the source ARN fixes delivery.",
  "tip": "Push-based sources (S3, SNS, API Gateway, EventBridge) need permission in the function's resource-based policy. Poll-based sources (SQS, Kinesis, DynamoDB Streams) need permissions in the execution role.",
  "check": [
   [
    "Why does S3 need a Lambda function policy but SQS does not?",
    "S3 invokes the function directly, so the function must allow the S3 principal; with SQS, Lambda polls the queue using the execution role's permissions."
   ],
   [
    "An admin with full IAM permissions cannot use a KMS key. Why might that be?",
    "The key policy does not allow the account root or the admin, so IAM policies are not honored for that key."
   ],
   [
    "How can you force all S3 access to a bucket to use HTTPS?",
    "Add a bucket policy that denies all actions when the condition aws:SecureTransport is false."
   ]
  ]
 },
 {
  "t": "Cross-account access with STS AssumeRole and trust policies; temporary credentials",
  "body": [
   "Organizations run many AWS accounts, and applications often need to reach resources in another account: a build pipeline deploying to production, a reporting job reading a data account's bucket. The standard, secure way to do this is for the caller to assume a role in the target account, receiving short-lived credentials, instead of creating IAM users with long-term keys in every account.",
   "Two policies on the target role make this work. The trust policy (the role's resource-based policy, also called the assume role policy) says who may assume the role: its `Principal` names the trusted account or specific role, and the action is `sts:AssumeRole`. The permissions policy says what the role can do once assumed. On the calling side, the caller's own identity policy must allow `sts:AssumeRole` on the target role's ARN. Both sides must agree; that is the rule for all cross-account access.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Principal\": { \"AWS\": \"arn:aws:iam::111122223333:role/ci-deployer\" },\n    \"Action\": \"sts:AssumeRole\",\n    \"Condition\": { \"StringEquals\": { \"sts:ExternalId\": \"example-external-id\" } }\n  }]\n}\n```",
   "The caller then calls the AWS Security Token Service (STS) `AssumeRole` API with the role ARN and a session name. STS returns temporary credentials: an access key ID, a secret access key and a session token, plus an expiration time. The session lasts one hour by default; you can request from 15 minutes up to the role's configured maximum session duration (which can be set as high as 12 hours). Code uses all three values, and the session token is what distinguishes temporary credentials from long-term ones. When credentials expire, the caller must assume the role again; SDK assume-role credential providers and CLI profiles with `role_arn` and `source_profile` refresh automatically.",
   "An external ID is a secret-ish value that a third party must pass when assuming a role in your account, required through a condition in the trust policy. It protects against the confused deputy problem when a vendor serves many customers. Multi-factor authentication (MFA) can also be required with the `aws:MultiFactorAuthPresent` condition. When one assumed role is used to assume another, called role chaining, the session is limited to one hour.",
   "STS has related APIs worth recognizing: `AssumeRoleWithWebIdentity` exchanges a token from an OpenID Connect (OIDC) provider, such as a CI system's identity token or Cognito, for AWS credentials; `AssumeRoleWithSAML` does the same for SAML identity providers; `GetSessionToken` returns temporary credentials for an IAM user, typically to satisfy an MFA requirement; `GetCallerIdentity` tells you who the current credentials belong to; and `DecodeAuthorizationMessage` decodes the encoded message that some services return with an authorization failure, which helps you see which policy denied a request.",
   "Every assumed-role action is logged in AWS CloudTrail with the role session name, so choose meaningful session names (such as the pipeline run ID) to make auditing easier. In the target account, the actions appear as performed by the role, and the session name shows who used it."
  ],
  "terms": [
   [
    "Trust policy",
    "The resource-based policy on an IAM role that specifies which principals may assume it."
   ],
   [
    "AssumeRole",
    "The STS API that returns temporary credentials for a role to a trusted caller."
   ],
   [
    "Temporary credentials",
    "An access key ID, secret access key and session token that expire after a set duration."
   ],
   [
    "External ID",
    "A value required in a trust policy condition that third parties must supply when assuming a role, preventing confused deputy attacks."
   ],
   [
    "Role chaining",
    "Using credentials from one assumed role to assume another role; sessions are limited to one hour."
   ]
  ],
  "example": "A CodeBuild project in a tools account deploys to a production account. Production has a deploy role whose trust policy allows the build project's service role, and the build role's policy allows sts:AssumeRole on that ARN. The buildspec runs aws sts assume-role, exports the three returned values as environment variables, and runs the deployment.",
  "tip": "Cross-account access needs both sides: the target role's trust policy must trust the caller, and the caller's IAM policy must allow sts:AssumeRole on the role. If either is missing, you get AccessDenied.",
  "check": [
   [
    "What three values make up temporary credentials?",
    "An access key ID, a secret access key and a session token."
   ],
   [
    "Which policy on a role decides who can assume it?",
    "The trust policy (assume role policy document)."
   ],
   [
    "Which STS API would a CI system with an OIDC token use to get AWS credentials without stored keys?",
    "AssumeRoleWithWebIdentity."
   ]
  ]
 },
 {
  "t": "Amazon Cognito: user pools (sign-up, sign-in, ID/access/refresh tokens) vs identity pools (temporary AWS credentials)",
  "body": [
   "Amazon Cognito provides identity for your application's end users: customers of a mobile or web app, not IAM users. It has two components with different jobs, and choosing between them is one of the most common DVA-C02 questions.",
   "A user pool is a user directory and authentication service. It handles sign-up (with email or phone verification), sign-in, password policies, MFA, account recovery and a hosted sign-in UI, and it can federate with social providers (such as Google or Apple) and SAML or OIDC enterprise identity providers. After a successful sign-in, the user pool issues JSON Web Tokens (JWTs). The ID token contains claims about the user's identity (such as `email`, `sub` and group membership) and is meant for your application to learn who the user is. The access token contains scopes and groups and is meant to authorize calls to APIs, including API Gateway with a Cognito authorizer and the user pool's own user APIs. The refresh token is long-lived and is used to obtain new ID and access tokens without signing in again. ID and access tokens are short-lived (one hour by default); refresh tokens default to 30 days and are configurable. Your backend validates JWTs by checking the signature against the user pool's public keys and verifying the issuer, audience or client ID, and expiration.",
   "Lambda triggers let you customize user pool flows: pre sign-up (auto-confirm or block users), post confirmation (write a profile to DynamoDB), pre token generation (add custom claims), custom message, and custom authentication challenges.",
   "An identity pool (federated identities) does something different: it exchanges a token from an identity provider for temporary AWS credentials, so the app can call AWS services such as S3 or DynamoDB directly. Supported providers include a Cognito user pool, social providers, SAML and OIDC providers, and your own developer-authenticated identities. Identity pools can also issue credentials for unauthenticated (guest) users if you enable that. Behind the scenes, the identity pool calls STS `AssumeRoleWithWebIdentity` to assume an IAM role: one role for authenticated users and one for guests, or roles chosen by rules or token claims.",
   "Fine-grained access is achieved with policy variables. For example, a role policy can allow access to the S3 prefix `private/${cognito-identity.amazonaws.com:sub}/*` or use the `dynamodb:LeadingKeys` condition so each user can only read DynamoDB items whose partition key equals their own identity ID.",
   "To keep them straight: user pools answer 'who is this user?' and return JWTs; identity pools answer 'what AWS resources may this user reach directly?' and return AWS credentials. Many apps use both: sign in with a user pool, then trade the ID token at the identity pool for credentials to upload to S3."
  ],
  "terms": [
   [
    "User pool",
    "A Cognito user directory that handles sign-up and sign-in and issues JWT ID, access and refresh tokens."
   ],
   [
    "Identity pool",
    "A Cognito component that exchanges identity provider tokens for temporary AWS credentials via IAM roles."
   ],
   [
    "ID token",
    "A JWT containing claims about the authenticated user's identity."
   ],
   [
    "Access token",
    "A JWT containing scopes and groups, used to authorize API requests."
   ],
   [
    "Refresh token",
    "A long-lived token used to obtain new ID and access tokens without re-authenticating."
   ]
  ],
  "example": "A photo app signs users in with a Cognito user pool. The app then passes the ID token to an identity pool, receives temporary credentials for an authenticated role, and uploads photos straight to S3 under private/ followed by the user's identity ID, which the role policy restricts each user to.",
  "tip": "If the scenario needs sign-up, sign-in or tokens for an API, choose a user pool. If users must access AWS services such as S3 or DynamoDB directly from the device, or guests need limited access, choose an identity pool.",
  "check": [
   [
    "Which Cognito component gives temporary AWS credentials?",
    "An identity pool, which assumes an IAM role for the user through STS."
   ],
   [
    "What is the refresh token used for?",
    "Getting new ID and access tokens after they expire, without making the user sign in again."
   ],
   [
    "How can you add a custom claim to tokens?",
    "Use a pre token generation Lambda trigger on the user pool."
   ]
  ]
 },
 {
  "t": "API Gateway authorization: IAM (SigV4), Cognito user pool authorizers, Lambda authorizers, API keys and usage plans",
  "body": [
   "Amazon API Gateway can check who is calling before a request ever reaches your backend. Each method (or route, in HTTP APIs) chooses an authorization type, and the exam expects you to match the option to the kind of caller.",
   "IAM authorization (`AWS_IAM`) requires requests to be signed with AWS Signature Version 4 (SigV4) using AWS credentials. API Gateway verifies the signature and checks that the caller's IAM policy allows `execute-api:Invoke` on the method's ARN. It is the natural choice for callers that already have AWS credentials: other AWS services, internal tools, or app users who received temporary credentials from a Cognito identity pool. Resource policies on REST APIs can additionally restrict access by account, source IP or VPC endpoint, which is how private APIs are locked down.",
   "A Cognito user pool authorizer validates a JWT from a Cognito user pool, sent by the client in a header such as `Authorization`. API Gateway checks the signature and expiration itself, with no code to write. For REST APIs, if you configure OAuth scopes on the method, the client must send an access token that contains one of them; without scopes an ID token works. HTTP APIs offer a general JWT authorizer that works with Cognito or any OIDC-compliant issuer. Your backend can read the verified claims from the request context.",
   "A Lambda authorizer (formerly custom authorizer) runs your own function to decide. A token-based authorizer receives a single header value such as a bearer token; a request-based authorizer receives headers, query strings, stage variables and context. The function validates the credential however you like (a third-party OAuth provider, a legacy session system) and returns an IAM policy document that allows or denies `execute-api:Invoke`, plus a `principalId` and optional context values passed to the backend. API Gateway can cache the returned policy for a configurable TTL (300 seconds by default) keyed on the identity source, which cuts latency and cost; be careful that a cached policy covers every resource the user will call, or later requests may be wrongly denied.",
   "API keys and usage plans are not authentication. An API key is an identifier a client sends in the `x-api-key` header; it can be shared or leaked, so it only identifies which customer is calling. Usage plans associate API keys with throttling limits (requests per second and burst) and quotas (requests per day, week or month) for specific stages. Typical use: offering free and paid tiers of a public API. Combine API keys with a real authorizer if the API needs security. When a client exceeds limits it gets HTTP 429 Too Many Requests; a missing or invalid key on a method that requires one returns 403 Forbidden.",
   "Summary: internal or AWS-credentialed callers use IAM; your app's signed-in users use a Cognito authorizer; tokens from other identity systems or custom logic use a Lambda authorizer; metering and throttling per customer use API keys with usage plans."
  ],
  "terms": [
   [
    "IAM authorization",
    "API Gateway authorization that requires SigV4-signed requests and an IAM policy allowing execute-api:Invoke."
   ],
   [
    "Cognito user pool authorizer",
    "An API Gateway authorizer that validates JWTs issued by a Cognito user pool without custom code."
   ],
   [
    "Lambda authorizer",
    "A function that receives a token or request parameters and returns an IAM policy allowing or denying the request."
   ],
   [
    "Usage plan",
    "An API Gateway configuration that applies throttling and quota limits to the API keys associated with it."
   ]
  ],
  "example": "A company exposes a weather API. Mobile users sign in with Cognito, so the public routes use a Cognito user pool authorizer. Partners who integrate from their servers get API keys attached to a Gold usage plan allowing 100 requests per second, and each partner request also passes a Lambda authorizer that validates a partner-signed token.",
  "tip": "API keys are for identifying clients and applying usage plans, not for securing an API. If a question needs custom or third-party token validation, choose a Lambda authorizer; for Cognito tokens with no code, choose a Cognito authorizer.",
  "check": [
   [
    "What does a Lambda authorizer return?",
    "An IAM policy document allowing or denying execute-api:Invoke, a principalId and optional context values."
   ],
   [
    "Which authorization type should an internal service with an IAM role use to call an API?",
    "IAM authorization, signing requests with SigV4."
   ],
   [
    "What response does a client receive for exceeding a usage plan's throttle?",
    "HTTP 429 Too Many Requests."
   ]
  ]
 },
 {
  "t": "Encryption at rest: SSE-S3, SSE-KMS, SSE-C, S3 Bucket Keys, client-side encryption with the AWS Encryption SDK",
  "body": [
   "Encryption at rest protects stored data if the storage media or backups are exposed. For Amazon S3 you choose who manages the keys and where encryption happens, and exam questions give you requirements such as auditing, key control or zero trust in AWS that point to one option.",
   "Server-side encryption means S3 encrypts the object when it writes it and decrypts it when an authorized user reads it, transparently. SSE-S3 uses keys that S3 fully manages, with AES-256; you do nothing beyond requesting it with the header `x-amz-server-side-encryption: AES256`. S3 now applies SSE-S3 as the default encryption for all new objects, so every object is encrypted at rest unless you choose otherwise.",
   "SSE-KMS encrypts with a key in AWS Key Management Service (KMS), requested with `x-amz-server-side-encryption: aws:kms` and optionally `x-amz-server-side-encryption-aws-kms-key-id`. You can use the AWS managed key for S3 (`aws/s3`) or your own customer managed key. Benefits: every use of the key is logged in CloudTrail, you control the key policy and rotation, and reading an object requires both S3 permission and `kms:Decrypt` on the key, which gives separation of duties. Uploads need `kms:GenerateDataKey`. Because each object operation calls KMS, very high request rates can hit KMS request quotas and cost more; this is the main SSE-KMS drawback. Dual-layer SSE-KMS (DSSE-KMS) applies two layers of encryption for workloads with that compliance requirement.",
   "S3 Bucket Keys reduce that KMS traffic. With a Bucket Key enabled, S3 uses KMS to create a short-lived bucket-level key and derives per-object data keys from it, so it calls KMS far less often. This lowers KMS request costs and reduces throttling risk, while still using SSE-KMS. CloudTrail then shows the bucket, not each object, as the encryption context.",
   "SSE-C (server-side encryption with customer-provided keys) means you send your own 256-bit key with every request in headers; S3 uses it to encrypt or decrypt and then discards it, storing only a salted hash to validate later requests. You must manage and never lose the key, and requests must use HTTPS (S3 rejects SSE-C over HTTP). It is also not available through the console for uploads.",
   "Client-side encryption means your application encrypts data before sending it, so S3 only ever stores ciphertext and AWS never sees the plaintext. The AWS Encryption SDK is a client-side library that implements envelope encryption for you: it gets a data key from a keyring or master key provider (often backed by KMS), encrypts your data with it, and stores the encrypted data key alongside the ciphertext in a portable message format. The Amazon S3 Encryption Client is a related option specialized for S3 objects.",
   "To enforce encryption, set default bucket encryption (for example to SSE-KMS with your key), and use a bucket policy that denies `s3:PutObject` requests that specify a different encryption type than required."
  ],
  "terms": [
   [
    "SSE-S3",
    "Server-side encryption with keys fully managed by S3, using AES-256; the default for new objects."
   ],
   [
    "SSE-KMS",
    "Server-side encryption using a KMS key, providing CloudTrail auditing and key-policy control."
   ],
   [
    "SSE-C",
    "Server-side encryption with a customer-provided key sent in each HTTPS request and not stored by S3."
   ],
   [
    "S3 Bucket Key",
    "A bucket-level key derived from KMS that reduces the number of KMS calls, cost and throttling for SSE-KMS."
   ],
   [
    "AWS Encryption SDK",
    "A client-side library that performs envelope encryption so data is encrypted before it leaves the application."
   ]
  ],
  "example": "A healthcare startup needs an audit trail of who decrypted patient files and must be able to revoke access instantly. They use SSE-KMS with a customer managed key; revoking a role's kms:Decrypt in the key policy blocks reads even for users with S3 access. As upload volume grows and KMS throttling appears, they enable S3 Bucket Keys.",
  "tip": "Audit trail and control of key usage: SSE-KMS. KMS throttling or cost with SSE-KMS: enable Bucket Keys. You manage keys and S3 must never store them: SSE-C (HTTPS only). AWS must never see plaintext: client-side encryption.",
  "check": [
   [
    "What extra permission does reading an SSE-KMS object require?",
    "kms:Decrypt on the KMS key, in addition to s3:GetObject."
   ],
   [
    "Why must SSE-C requests use HTTPS?",
    "Because the encryption key is sent in request headers, and S3 rejects SSE-C requests made over HTTP."
   ],
   [
    "What problem do S3 Bucket Keys solve?",
    "They reduce the number of requests from S3 to KMS, lowering cost and the risk of KMS throttling for SSE-KMS."
   ]
  ]
 },
 {
  "t": "AWS KMS: customer managed vs AWS managed keys, envelope encryption with GenerateDataKey, 4 KB Encrypt limit, cross-account key use",
  "body": [
   "AWS Key Management Service (KMS) creates and controls cryptographic keys whose key material never leaves KMS unencrypted. Services such as S3, DynamoDB, Lambda and Secrets Manager call KMS for you, and your own code can call it directly.",
   "There are different kinds of KMS keys by who manages them. AWS managed keys (aliases like `aws/s3` or `aws/lambda`) are created automatically when you use a service's default encryption; you can view them and see their use in CloudTrail, but you cannot change their key policy, and they rotate automatically every year. Customer managed keys are ones you create; you control the key policy, grants, enabling and disabling, deletion (with a 7 to 30 day waiting period), tags and aliases, and you can turn on automatic rotation. Only customer managed keys can be shared with other accounts or given fine-grained policies, so requirements like 'control who can use the key' or 'cross-account' point to them. (AWS owned keys, used internally by services in AWS accounts you cannot see, are a third category.)",
   "The `Encrypt` API can encrypt at most 4 KB of plaintext directly. That is fine for a password or a small secret, but not for a file. For larger data, use envelope encryption: encrypt the data with a data key, and encrypt the data key with the KMS key. Call `GenerateDataKey` with your KMS key ID; KMS returns the data key in two forms, plaintext and encrypted under the KMS key. Your code encrypts the data locally with the plaintext data key (for example with AES-GCM), discards the plaintext key from memory, and stores the encrypted data key next to the ciphertext. To decrypt, call `Decrypt` on the encrypted data key to get the plaintext key back, then decrypt the data locally. `GenerateDataKeyWithoutPlaintext` returns only the encrypted copy, useful when a component will encrypt later.",
   "Envelope encryption is faster (large data never travels to KMS), cheaper (one KMS call per data key, not per byte) and avoids the 4 KB limit. The AWS Encryption SDK and S3 SSE-KMS both use it internally.",
   "An encryption context is a set of non-secret key-value pairs you pass with Encrypt or GenerateDataKey; the same pairs must be supplied to decrypt. It adds integrity checks and shows up in CloudTrail, making audits clearer. When requests fail with `ThrottlingException`, you have hit KMS request quotas; answers include caching data keys (the Encryption SDK supports this), using S3 Bucket Keys, retrying with backoff, or requesting a quota increase.",
   "For cross-account use, two things are required: the key policy in the key's account must allow the other account (or a specific role in it) to use the key, and in the other account an IAM policy must grant the user or role the KMS actions on that key's ARN. AWS managed keys cannot be used this way because their key policies cannot be edited. Keys are Regional; multi-Region keys let you decrypt in another Region without re-encrypting."
  ],
  "terms": [
   [
    "Customer managed key",
    "A KMS key you create and control, including its key policy, rotation and cross-account access."
   ],
   [
    "AWS managed key",
    "A KMS key created by an AWS service for your account, with a fixed key policy you cannot change."
   ],
   [
    "Envelope encryption",
    "Encrypting data with a data key and then encrypting that data key with a KMS key."
   ],
   [
    "GenerateDataKey",
    "A KMS API that returns a data key in plaintext and encrypted forms for local encryption."
   ],
   [
    "Encryption context",
    "Non-secret key-value pairs bound to a KMS encryption operation that must match on decryption."
   ]
  ],
  "example": "An application must encrypt 50 MB log archives before storing them. Calling Encrypt fails because it only accepts 4 KB. Instead the code calls GenerateDataKey, encrypts the archive locally with the plaintext data key, discards that key, and stores the encrypted data key as object metadata alongside the file.",
  "tip": "Any question with data larger than 4 KB and KMS points to envelope encryption with GenerateDataKey. Cross-account or custom key policy requirements rule out AWS managed keys.",
  "check": [
   [
    "What does GenerateDataKey return?",
    "A plaintext data key for immediate local encryption and a copy of the same key encrypted under the KMS key for storage."
   ],
   [
    "Why can't you share an AWS managed key with another account?",
    "Its key policy is controlled by AWS and cannot be edited, so it cannot grant access to other accounts."
   ],
   [
    "Name two ways to reduce KMS throttling.",
    "Cache data keys (for example with the Encryption SDK) and enable S3 Bucket Keys; also retry with backoff or request a quota increase."
   ]
  ]
 },
 {
  "t": "Encryption in transit: TLS, ACM certificates (us-east-1 for CloudFront), enforcing aws:SecureTransport",
  "body": [
   "Encryption in transit protects data moving over networks from eavesdropping and tampering. On AWS this almost always means Transport Layer Security (TLS), the protocol behind HTTPS. All AWS service API endpoints support TLS, and the SDKs and CLI use HTTPS by default.",
   "TLS works by having the server present a certificate issued by a trusted certificate authority, proving it owns the domain name; the client and server then agree on session keys and encrypt everything that follows. For your own endpoints you need a certificate for your domain. AWS Certificate Manager (ACM) provisions public TLS certificates at no extra cost for use with integrated services, validates domain ownership by DNS (preferred, since renewal is then automatic) or email, and renews certificates automatically. You can also import third-party certificates into ACM, but ACM cannot renew those. ACM certificates are deployed to integrated services, including Elastic Load Balancing, Amazon CloudFront, API Gateway and Elastic Beanstalk; with standard ACM public certificates you generally cannot export the private key to install on your own EC2 web server.",
   "ACM certificates are Regional resources, and this matters for one exam favourite: CloudFront is a global service that only uses certificates from the US East (N. Virginia) Region, `us-east-1`. If your CloudFront distribution, or an API Gateway edge-optimized custom domain (which uses CloudFront under the hood), cannot find your certificate, you probably requested it in another Region. A Regional API Gateway custom domain or an Application Load Balancer uses a certificate from its own Region.",
   "Where TLS terminates matters too. An Application Load Balancer can terminate TLS and forward plain HTTP to targets in a private network, or re-encrypt to the targets if end-to-end encryption is required. A Network Load Balancer can terminate TLS or pass it through to targets.",
   "Enforcing TLS for S3 uses the global condition key `aws:SecureTransport`, which is true when the request came over HTTPS. A bucket policy that denies all actions when it is false blocks any plain HTTP access, whatever the caller's IAM permissions, because an explicit deny wins.",
   "```json\n{\n  \"Effect\": \"Deny\",\n  \"Principal\": \"*\",\n  \"Action\": \"s3:*\",\n  \"Resource\": [\"arn:aws:s3:::my-bucket\", \"arn:aws:s3:::my-bucket/*\"],\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n}\n```",
   "The same condition key works in SNS topic policies and SQS queue policies. For other services, enforce TLS by only exposing HTTPS listeners, redirecting HTTP to HTTPS (CloudFront viewer protocol policy or an ALB listener rule), requiring TLS in database connection settings, and using minimum TLS version security policies on load balancers, CloudFront and API Gateway custom domains."
  ],
  "terms": [
   [
    "TLS",
    "Transport Layer Security, the protocol that encrypts and authenticates network connections such as HTTPS."
   ],
   [
    "AWS Certificate Manager (ACM)",
    "A service that provisions, deploys and automatically renews TLS certificates for integrated AWS services."
   ],
   [
    "aws:SecureTransport",
    "A global IAM condition key that is true when a request was made over TLS."
   ],
   [
    "TLS termination",
    "The point where encrypted traffic is decrypted, such as a load balancer or CloudFront."
   ]
  ],
  "example": "A team requests an ACM certificate for shop.example.com in eu-west-1 and tries to attach it to their CloudFront distribution, but it does not appear in the list. They request the certificate again in us-east-1, validate it with the same DNS record, and CloudFront can use it.",
  "tip": "CloudFront (and edge-optimized API Gateway domains) need ACM certificates in us-east-1. To force HTTPS on an S3 bucket, deny requests where aws:SecureTransport is false in the bucket policy.",
  "check": [
   [
    "Why doesn't a certificate created in ap-southeast-2 show up for CloudFront?",
    "CloudFront only uses ACM certificates from the us-east-1 Region."
   ],
   [
    "What bucket policy condition blocks HTTP access to S3?",
    "A Deny statement with the condition Bool aws:SecureTransport equal to false."
   ],
   [
    "Why is DNS validation preferred for ACM certificates?",
    "As long as the CNAME record stays in place, ACM can renew the certificate automatically."
   ]
  ]
 },
 {
  "t": "Secrets and configuration: Secrets Manager (rotation) vs Systems Manager Parameter Store (SecureString, tiers)",
  "body": [
   "Applications need configuration values (feature settings, endpoint URLs, table names) and secrets (database passwords, API keys). Both should live outside the code, in a service that controls access with IAM and records use in CloudTrail. AWS offers two main options, and the exam typically asks you to pick between them.",
   "AWS Systems Manager Parameter Store is a hierarchical key-value store for configuration and secrets. Parameters have names like paths, such as `/myapp/prod/db-url`, which lets you fetch a whole branch with `GetParametersByPath` and control access by path in IAM policies. Types are `String`, `StringList` and `SecureString`; SecureString values are encrypted with a KMS key (the AWS managed `aws/ssm` key or your customer managed key) and returned decrypted when you pass `WithDecryption=true` and have `kms:Decrypt` permission. Parameters keep a version history. There are two tiers: Standard parameters are free, with a smaller maximum value size (4 KB) and a per-Region count quota; Advanced parameters allow larger values (8 KB) and parameter policies such as expiration dates and notifications, and are charged. Standard throughput is enough for most apps; higher throughput can be enabled at extra cost.",
   "AWS Secrets Manager is built specifically for secrets. Its headline feature is automatic rotation: on a schedule, Secrets Manager invokes a rotation Lambda function that creates a new credential, sets it in the database or service, tests it and marks it current. AWS provides ready-made rotation functions for Amazon RDS, Aurora, Redshift and DocumentDB, and you can write your own for other systems. During rotation, staging labels (`AWSCURRENT`, `AWSPENDING`, `AWSPREVIOUS`) track versions so apps always read a working value. Secrets Manager also supports cross-Region replication of secrets, resource-based policies for cross-account access, and generating random passwords. It is always encrypted with KMS and has a per-secret monthly charge plus API charges.",
   "Choosing: if the requirement mentions automatic rotation of database credentials, cross-Region replicas of secrets or RDS integration, choose Secrets Manager. If it emphasizes low cost, simple configuration values, a hierarchy of settings, or storing non-secret config alongside a few encrypted values, choose Parameter Store with SecureString. Parameter Store can also reference Secrets Manager secrets by a special path, giving one API for both.",
   "In Lambda, fetch secrets at initialization (outside the handler) and cache them for a period, rather than on every invocation, to reduce latency and API costs. The AWS Parameters and Secrets Lambda Extension provides a local cache over HTTP for this. In CloudFormation, dynamic references like `{{resolve:secretsmanager:MySecret:SecretString:password}}` and `{{resolve:ssm-secure:/myapp/db-pass}}` (for supported resource properties) inject values at deploy time without putting them in the template. Never store secrets in plain environment variables or source control."
  ],
  "terms": [
   [
    "Secrets Manager rotation",
    "A scheduled process in which a Lambda function replaces a secret's credential in both the secret and the target service."
   ],
   [
    "SecureString",
    "A Parameter Store parameter type whose value is encrypted with a KMS key."
   ],
   [
    "Parameter hierarchy",
    "Path-style parameter names that group settings and allow retrieval and IAM control by path."
   ],
   [
    "Advanced parameter",
    "A paid Parameter Store tier with larger values and parameter policies such as expiration."
   ],
   [
    "Staging label",
    "A label such as AWSCURRENT or AWSPENDING that marks which version of a secret is in use."
   ]
  ],
  "example": "A compliance team requires the production Aurora password to change every 30 days with no downtime. The developers store it in Secrets Manager with the built-in Aurora rotation function on a 30-day schedule, and their Lambda functions read the secret through the caching extension so new values are picked up within minutes.",
  "tip": "Automatic rotation is the keyword for Secrets Manager. Cheapest way to store configuration and some encrypted values, organized in a hierarchy: Parameter Store with SecureString.",
  "check": [
   [
    "Which service rotates RDS credentials automatically?",
    "AWS Secrets Manager, using a rotation Lambda function."
   ],
   [
    "What is needed to read a SecureString in plaintext?",
    "Call GetParameter with WithDecryption set to true and have kms:Decrypt permission on the key used."
   ],
   [
    "Name one feature of Advanced parameters that Standard parameters lack.",
    "Parameter policies such as expiration, or larger value sizes (8 KB instead of 4 KB)."
   ]
  ]
 },
 {
  "t": "Keeping sensitive data out of code and logs: default credential chain, no hardcoded keys, CloudWatch Logs data protection masking",
  "body": [
   "Many real breaches start with a secret in the wrong place: an access key committed to a public repository, a database password in a container image, or a customer's card number printed in a debug log. The exam checks that you know where sensitive data should and should not go, and which AWS features help.",
   "Never hardcode AWS access keys in source code, configuration files, container images or plain environment variables. Code running on AWS should rely on the default credential provider chain, which automatically finds temporary credentials from the Lambda execution role, ECS task role or EC2 instance profile and refreshes them. On a developer laptop, use named profiles with IAM Identity Center (SSO) or short-lived credentials rather than long-lived IAM user keys. In CI/CD systems outside AWS, use OIDC federation with `AssumeRoleWithWebIdentity` instead of storing keys as pipeline secrets. If a key is ever exposed, deactivate and delete it immediately, then investigate its use in CloudTrail; assume it was used.",
   "Application secrets such as database passwords and third-party API keys belong in Secrets Manager or Parameter Store SecureString, retrieved at runtime by a role that has permission to read only that secret. Keep them out of source control (use `.gitignore` for local env files), out of CloudFormation templates (use dynamic references and `NoEcho` parameters), and out of build logs. Amazon CodeGuru Reviewer and secret-scanning tools in repositories can flag secrets that slip into code.",
   "Logs are the other leak. Log what you need to troubleshoot (request IDs, operation names, error codes, timings) but not passwords, tokens, full card numbers or personal data. Avoid logging entire incoming events or request headers by default, since they may contain `Authorization` headers or personal information; log a sanitized subset instead. Structured JSON logging with explicit fields makes this easier to control than printing whole objects.",
   "Amazon CloudWatch Logs data protection adds a safety net. You attach a data protection policy to a log group (or account-wide) that uses managed data identifiers for common sensitive types, such as email addresses, credit card numbers, AWS secret keys and various national identifiers, and can include custom identifiers you define with regular expressions. Matching data is masked when viewed in the console, Logs Insights, subscriptions and exports; only principals with the `logs:Unmask` permission can see the original values. The policy can also produce audit findings, sent to CloudWatch Logs, S3 or Amazon Data Firehose, so you learn that sensitive data is being logged and can fix the code. Masking only applies to data ingested after the policy is in place.",
   "Other layers: encrypt log groups with a KMS key if required, set log retention periods instead of keeping logs forever, and restrict who can read log groups with IAM. For S3 data, Amazon Macie can discover sensitive data in buckets."
  ],
  "terms": [
   [
    "Hardcoded credentials",
    "Access keys or passwords written directly into code or artifacts, easily leaked and hard to rotate."
   ],
   [
    "Data protection policy",
    "A CloudWatch Logs policy that detects and masks sensitive data in log events using data identifiers."
   ],
   [
    "Managed data identifier",
    "A predefined pattern for a sensitive data type, such as credit card numbers, used by CloudWatch Logs data protection."
   ],
   [
    "logs:Unmask",
    "The IAM permission that lets a principal view masked sensitive values in CloudWatch Logs."
   ]
  ],
  "example": "A payments team discovers a debug statement logging full request bodies, including card numbers. They remove it, and also attach a data protection policy to the service's log groups with the credit card managed identifier. Future accidental leaks appear masked, only the security team holds logs:Unmask, and audit findings alert them if card data shows up again.",
  "tip": "For code on AWS, the right answer is a role picked up through the default credential chain, not access keys anywhere. For sensitive data in logs, the AWS-native answer is a CloudWatch Logs data protection policy.",
  "check": [
   [
    "What should a developer do with an access key accidentally pushed to a public repository?",
    "Deactivate and delete it immediately, review CloudTrail for its use, and switch the code to role-based or federated temporary credentials."
   ],
   [
    "Who can see the original value of data masked by CloudWatch Logs data protection?",
    "Only principals granted the logs:Unmask permission."
   ],
   [
    "Does a data protection policy mask events already stored before it was created?",
    "No; it applies to log events ingested after the policy is in place."
   ]
  ]
 },
 {
  "t": "Presigned URLs for temporary S3 access; IAM Access Analyzer for least privilege",
  "body": [
   "Sometimes a user without AWS credentials needs to download or upload one specific S3 object: a customer fetching an invoice PDF, or a mobile app uploading a profile photo. Making the bucket public would expose everything. A presigned URL solves this by granting temporary access to exactly one object operation.",
   "Your backend, running with credentials that have permission for the operation, generates the URL with the SDK or CLI. The URL includes the bucket, key, operation and expiration, plus a SigV4 signature made with the generator's credentials. Anyone holding the URL can perform that operation until it expires; S3 checks the signature and whether the signing identity still has permission at request time. The object and bucket stay private.",
   "```python\nurl = s3.generate_presigned_url(\n    'get_object',\n    Params={'Bucket': 'invoices', 'Key': 'cust-42/inv-1001.pdf'},\n    ExpiresIn=300)  # seconds\n```",
   "From the CLI, `aws s3 presign s3://invoices/cust-42/inv-1001.pdf --expires-in 300` creates a download URL. For uploads, generate a presigned `put_object` URL (or a presigned POST, which also lets you set conditions like maximum file size and content type for browser form uploads). Important details: the URL can never grant more than the signer's permissions; it stops working early if the signing credentials expire, which is why a URL generated by a Lambda function with role credentials cannot outlive that role session; with SigV4 the maximum expiry is seven days; and a presigned URL is a bearer token, so share it only over HTTPS and keep expirations short. For content served through CloudFront, CloudFront signed URLs or signed cookies are the equivalent.",
   "IAM Access Analyzer helps with the other half of the job: making sure policies grant only what is needed and nothing is shared unintentionally. It has several capabilities. External access analysis examines resource-based policies on S3 buckets, KMS keys, IAM roles, Lambda functions, SQS queues, Secrets Manager secrets and other supported resources, and produces findings when a resource is shared with a principal outside your zone of trust (your account or organization), such as a public bucket or a role trusted by an unknown account. Unused access analysis finds unused roles, access keys, passwords and permissions. Policy generation reviews your CloudTrail activity for a role or user over a period and generates a policy containing only the actions actually used, which is an excellent starting point for least privilege. Policy validation checks policies as you write them for errors, security warnings and overly broad grants, and custom policy checks can be run in CI/CD to block risky changes before deployment.",
   "A practical least-privilege workflow for an application role: start broad in development, run it through realistic tests, use Access Analyzer policy generation from CloudTrail activity, refine the generated policy with specific resource ARNs, validate it, and review unused access findings over time."
  ],
  "terms": [
   [
    "Presigned URL",
    "A URL signed with an identity's credentials that grants temporary access to a specific S3 operation on one object."
   ],
   [
    "Presigned POST",
    "A signed form policy allowing browser uploads to S3 with conditions such as size limits and key prefixes."
   ],
   [
    "IAM Access Analyzer",
    "A service that finds externally shared and unused access, validates policies, and generates least-privilege policies from activity."
   ],
   [
    "Zone of trust",
    "The account or organization that Access Analyzer treats as internal when reporting external access."
   ]
  ],
  "example": "A photo app's backend Lambda function generates a presigned PUT URL that expires in five minutes for the key uploads/user-123/avatar.jpg. The phone uploads directly to S3 with that URL, so large files never pass through the API, and the bucket remains fully private.",
  "tip": "Temporary access to a private S3 object for someone without AWS credentials: presigned URL. Remember the URL is limited by both its expiry and the lifetime and permissions of the credentials that signed it.",
  "check": [
   [
    "Why might a presigned URL created in Lambda stop working before its ExpiresIn time?",
    "It was signed with the execution role's temporary credentials, and the URL becomes invalid when those credentials expire."
   ],
   [
    "Can a presigned URL grant access the signer does not have?",
    "No; S3 evaluates the signer's permissions, so the URL can only allow what the signer is allowed to do."
   ],
   [
    "Which Access Analyzer feature builds a policy based on what a role actually did?",
    "Policy generation, which analyzes CloudTrail activity for the role."
   ]
  ]
 },
 {
  "t": "Preparing artifacts: .zip packages vs container images in ECR, Lambda layers, dependency packaging, CodeArtifact",
  "body": [
   "Before code can run on Lambda or another service, it must be packaged as a deployment artifact. The exam tests the two Lambda packaging formats, their limits, and how to manage dependencies cleanly.",
   "A .zip file archive contains your code and its dependencies. You can upload it directly (up to 50 MB zipped) or from S3 for larger files, and the unzipped size of the function plus all its layers must be at most 250 MB. Lambda runs it on a managed runtime such as Python, Node.js or Java, which AWS patches for you. A container image is built from a Dockerfile, usually based on an AWS-provided base image for your runtime (which includes the Lambda Runtime Interface Client), pushed to Amazon Elastic Container Registry (ECR) and referenced by the function. Images can be up to 10 GB, which suits large dependencies such as machine learning libraries, and let you reuse existing container tooling. The trade-off: you rebuild and redeploy to pick up runtime patches, and the image must be in ECR in the same Region (cross-account ECR access is possible with repository permissions). You cannot switch an existing function between .zip and image; you create a new function.",
   "Dependencies must be packaged for the Lambda environment, which runs Amazon Linux on x86_64 or arm64. For interpreted languages this means installing libraries into the package directory, for example `pip install -r requirements.txt -t package/` then zipping the package folder with your handler. Libraries with native compiled code must be built for the right OS and architecture; building on a Mac or Windows machine can produce binaries that fail with import errors on Lambda. Build inside a matching container (for example with `sam build --use-container`) or use platform-specific wheels. Keep packages small by excluding tests, dev dependencies and SDK versions already in the runtime, unless you need to pin a specific SDK version.",
   "Lambda layers package shared dependencies or common code separately so that many functions can reuse them and each function's own package stays small (which also lets you edit code in the console). Layer content is extracted to `/opt`, and runtimes look in specific subfolders, for example `python/` for Python libraries and `nodejs/node_modules/` for Node.js. A function can use up to five layers. Layers also deliver Lambda extensions, such as monitoring agents.",
   "AWS CodeArtifact is a managed artifact repository for software packages: npm, PyPI, Maven, NuGet and others. A domain groups repositories, and repositories can have upstream repositories and external connections (for example to the public npm registry), so your builds pull public packages through a controlled, cached copy while you also publish private internal packages. Developers and CodeBuild authenticate with a short-lived token, for example `aws codeartifact login --tool pip --domain my-domain --repository my-repo`, which configures the package manager. This gives consistent builds, an audit of which packages are used, and protection if a public package disappears."
  ],
  "terms": [
   [
    ".zip deployment package",
    "An archive of function code and dependencies deployed to a managed Lambda runtime."
   ],
   [
    "Container image function",
    "A Lambda function packaged as an OCI image up to 10 GB, stored in Amazon ECR."
   ],
   [
    "Amazon ECR",
    "Elastic Container Registry, AWS's managed registry for container images."
   ],
   [
    "AWS CodeArtifact",
    "A managed package repository that proxies public registries and hosts private packages for build tools."
   ]
  ],
  "example": "A data science team's function needs 3 GB of Python libraries, far above the 250 MB unzipped limit for .zip packages. They build a container image from the AWS Python base image, push it to ECR and create the function from the image URI.",
  "tip": "Dependencies larger than 250 MB unzipped point to container images (up to 10 GB). Import errors for native libraries usually mean the package was built on a different OS or architecture than Lambda's.",
  "check": [
   [
    "What is the maximum size of a Lambda container image?",
    "10 GB."
   ],
   [
    "Where are layer contents made available inside the execution environment?",
    "Under /opt, in runtime-specific subdirectories such as /opt/python."
   ],
   [
    "Why use CodeArtifact external connections?",
    "To fetch public packages through a managed, cached repository so builds are consistent, auditable and resilient to public registry changes."
   ]
  ]
 },
 {
  "t": "AWS SAM: template structure, sam build, sam deploy --guided, sam local invoke / start-api, samconfig.toml",
  "body": [
   "The AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications. It has two parts: a template format that extends CloudFormation with concise serverless resource types, and the SAM CLI, which builds, tests locally and deploys them.",
   "A SAM template is a CloudFormation template with one essential line: `Transform: AWS::Serverless-2016-10-31`. That tells CloudFormation to expand SAM resources into full CloudFormation resources during deployment. The main SAM resource types are `AWS::Serverless::Function`, `AWS::Serverless::Api` and `AWS::Serverless::HttpApi`, `AWS::Serverless::SimpleTable` (a basic DynamoDB table), `AWS::Serverless::LayerVersion`, `AWS::Serverless::StateMachine` and `AWS::Serverless::Application` (nested apps). A `Globals` section sets properties shared by all functions, such as runtime, timeout and environment variables. You can still include any normal CloudFormation resources, `Parameters` and `Outputs`.",
   "```yaml\nTransform: AWS::Serverless-2016-10-31\nGlobals:\n  Function:\n    Runtime: python3.12\n    Timeout: 10\nResources:\n  GetOrder:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: app.handler\n      CodeUri: src/\n      Policies:\n        - DynamoDBReadPolicy:\n            TableName: !Ref Orders\n      Events:\n        Api:\n          Type: Api\n          Properties: { Path: /orders/{id}, Method: get }\n  Orders:\n    Type: AWS::Serverless::SimpleTable\n```",
   "Notice how much a function definition includes: the `Events` property creates the trigger (here an API Gateway route, and the permission for it), and `Policies` accepts SAM policy templates such as `DynamoDBReadPolicy` or `S3ReadPolicy` that expand into least-privilege IAM statements. Functions can also define `AutoPublishAlias` and `DeploymentPreference` to deploy through CodeDeploy with canary or linear traffic shifting.",
   "The typical workflow: `sam init` creates a project from a template. `sam build` resolves dependencies and prepares the artifacts in `.aws-sam/build` (add `--use-container` to build native dependencies in a Lambda-like container). `sam deploy --guided` asks for the stack name, Region, parameter values and whether to confirm changes, then saves your answers to `samconfig.toml`, so later deployments need only `sam deploy`. Under the hood, deploy packages the artifacts to an S3 bucket (SAM can create a managed bucket for you) and creates or updates a CloudFormation stack through a change set. `samconfig.toml` can hold separate environments, for example `[default]` and `[prod]` sections selected with `--config-env prod`.",
   "Local testing uses Docker to emulate the Lambda environment. `sam local invoke GetOrder -e events/get.json` runs one function once with a test event; `sam local generate-event` creates sample events for sources like S3 or SQS. `sam local start-api` runs a local HTTP server that emulates API Gateway routes, so you can test with a browser or curl. `sam local start-lambda` emulates the Lambda invoke endpoint for SDK-based tests. For faster cloud iteration, `sam sync --watch` pushes code changes to a development stack directly, and `sam logs` tails a function's CloudWatch logs."
  ],
  "terms": [
   [
    "Transform: AWS::Serverless-2016-10-31",
    "The template declaration that makes CloudFormation process SAM resource types."
   ],
   [
    "sam build",
    "The SAM CLI command that installs dependencies and prepares deployment artifacts."
   ],
   [
    "sam deploy --guided",
    "An interactive deployment that prompts for settings and saves them to samconfig.toml."
   ],
   [
    "sam local start-api",
    "Runs a local emulation of API Gateway routes backed by functions running in Docker."
   ],
   [
    "SAM policy template",
    "A named, parameterized IAM policy, such as DynamoDBReadPolicy, used in a function's Policies property."
   ]
  ],
  "example": "A developer changes a handler, runs sam build, then sam local start-api and calls the endpoint with curl to confirm the new response. Satisfied, they run sam deploy, which reads the stack name and Region saved in samconfig.toml from the first guided deployment.",
  "tip": "The Transform line is what identifies a SAM template. For testing an API locally, the command is sam local start-api; for a single event, sam local invoke. sam deploy --guided writes samconfig.toml.",
  "check": [
   [
    "Which line must a SAM template include?",
    "Transform: AWS::Serverless-2016-10-31."
   ],
   [
    "Where are the answers from sam deploy --guided stored?",
    "In samconfig.toml in the project directory."
   ],
   [
    "What does sam local invoke require on your machine?",
    "Docker, because it runs the function in a container that emulates Lambda."
   ]
  ]
 },
 {
  "t": "CloudFormation: templates, parameters, outputs and exports, Fn::ImportValue, change sets, packaging local artifacts to S3",
  "body": [
   "AWS CloudFormation is AWS's infrastructure as code service: you describe resources in a template (YAML or JSON), and CloudFormation creates, updates and deletes them together as a stack, in the right order, rolling back if something fails. SAM and the CDK both produce CloudFormation in the end, so its concepts appear throughout the exam.",
   "A template's sections: `AWSTemplateFormatVersion` and `Description`; `Parameters` (inputs supplied at deploy time, with types like `String`, `Number` or `AWS::EC2::KeyPair::KeyName` and SSM parameter types, plus constraints such as `AllowedValues`, and `NoEcho` to hide sensitive values); `Mappings` (static lookup tables, for example AMI IDs by Region, read with `Fn::FindInMap`); `Conditions` (create resources only in, say, production); `Transform` (for SAM or macros); `Resources` (the only required section); and `Outputs`. Intrinsic functions connect things: `Ref` returns a parameter's value or a resource's primary identifier, `Fn::GetAtt` returns an attribute such as an ARN, `Fn::Sub` substitutes variables into strings, and `Fn::Join`, `Fn::Select` and `Fn::If` help build values. Pseudo parameters such as `AWS::Region` and `AWS::AccountId` avoid hardcoding.",
   "Outputs return values after deployment, such as an API URL. An output with an `Export` name makes the value available to other stacks in the same account and Region, which read it with `Fn::ImportValue`. This is how a network stack shares VPC and subnet IDs with application stacks. Export names must be unique within the Region, and CloudFormation will not let you delete a stack, or change an exported value, while another stack imports it. Nested stacks (`AWS::CloudFormation::Stack`) are the alternative for reusable components that are deployed as part of a parent stack.",
   "```yaml\n# network stack\nOutputs:\n  VpcId:\n    Value: !Ref Vpc\n    Export:\n      Name: !Sub '${AWS::StackName}-VpcId'\n# app stack\n  VpcId: !ImportValue network-VpcId\n```",
   "Updating a stack can modify resources in place, interrupt them, or replace them (for example, changing a DynamoDB table's key schema creates a new table). A change set lets you preview exactly what an update will do before you execute it, which matters for anything with data. Drift detection shows resources changed outside CloudFormation. `DeletionPolicy: Retain` or `Snapshot` protects data when a resource or stack is deleted, and stack policies can prevent updates to critical resources. If creation fails, the stack rolls back by default; for troubleshooting, look at the first failed event in the stack's Events tab.",
   "Templates can point at local code, such as `CodeUri: ./src` for a Lambda function or a nested template file. Those local paths must be uploaded before deployment. `aws cloudformation package --template-file template.yaml --s3-bucket my-artifacts --output-template-file packaged.yaml` zips and uploads the local artifacts to S3 and writes a new template with S3 URIs in their place. Then `aws cloudformation deploy --template-file packaged.yaml --stack-name my-app --capabilities CAPABILITY_IAM` creates a change set and executes it. The `CAPABILITY_IAM` or `CAPABILITY_NAMED_IAM` acknowledgment is required when the template creates IAM resources, and `CAPABILITY_AUTO_EXPAND` when it uses macros or transforms. `sam package` and `sam deploy` do the same work."
  ],
  "terms": [
   [
    "Stack",
    "A set of AWS resources created and managed together from one CloudFormation template."
   ],
   [
    "Export",
    "An output value made available to other stacks in the same Region, read with Fn::ImportValue."
   ],
   [
    "Change set",
    "A preview of the changes CloudFormation will make to a stack, which you review and then execute."
   ],
   [
    "aws cloudformation package",
    "Uploads local artifacts referenced by a template to S3 and outputs a template with S3 locations."
   ],
   [
    "CAPABILITY_IAM",
    "An acknowledgment required when deploying a template that creates or modifies IAM resources."
   ]
  ],
  "example": "A platform team's network stack exports its private subnet IDs. The orders service template uses Fn::ImportValue to place its Lambda functions in those subnets. Later the platform team tries to delete the network stack and CloudFormation refuses, because the orders stack still imports the export.",
  "tip": "Share values between independent stacks with Outputs Export plus Fn::ImportValue. Preview risky updates with a change set. Deploy templates with local code paths by running cloudformation package first.",
  "check": [
   [
    "Which section of a template is required?",
    "Resources."
   ],
   [
    "Why can't a stack be deleted when its export is imported elsewhere?",
    "CloudFormation blocks deleting or changing an export that another stack depends on until the importing stack stops using it."
   ],
   [
    "What error do you get when deploying a template that creates IAM roles without acknowledging it, and how do you fix it?",
    "An InsufficientCapabilities error; add --capabilities CAPABILITY_IAM or CAPABILITY_NAMED_IAM."
   ]
  ]
 },
 {
  "t": "AWS CDK basics: constructs, cdk bootstrap, cdk synth, cdk deploy",
  "body": [
   "The AWS Cloud Development Kit (CDK) lets you define infrastructure in a general-purpose programming language, such as TypeScript, Python, Java, C# or Go, instead of writing YAML. Your code is synthesized into CloudFormation templates, which CloudFormation then deploys. You get loops, conditions, classes, IDE autocompletion and unit tests for your infrastructure, while keeping CloudFormation's safe stack management.",
   "Everything in the CDK is a construct: a building block representing one or more AWS resources. Constructs are organized into a tree. At the top is an `App`; it contains one or more `Stack` constructs, each of which becomes a CloudFormation stack; stacks contain resource constructs. Constructs come in three levels. L1 constructs map one-to-one to CloudFormation resources and are named with a `Cfn` prefix, such as `CfnBucket`; you set every property yourself. L2 constructs, such as `s3.Bucket` or `lambda.Function`, are curated, higher-level classes with sensible defaults and helper methods. L3 constructs, also called patterns, combine several resources for a common architecture, for example an API Gateway backed by a Lambda function, or a load-balanced Fargate service.",
   "```python\nfrom aws_cdk import App, Stack, aws_s3 as s3, aws_lambda as _lambda\n\nclass ImageStack(Stack):\n    def __init__(self, scope, id, **kw):\n        super().__init__(scope, id, **kw)\n        bucket = s3.Bucket(self, 'Uploads', versioned=True)\n        fn = _lambda.Function(self, 'Resize',\n            runtime=_lambda.Runtime.PYTHON_3_12,\n            handler='app.handler',\n            code=_lambda.Code.from_asset('src'))\n        bucket.grant_read(fn)  # adds a least-privilege IAM policy\n\napp = App()\nImageStack(app, 'ImageStack')\napp.synth()\n```",
   "The `grant_read` call shows a strength of L2 constructs: helper methods create correctly scoped IAM permissions for you, so you write intent rather than JSON policy.",
   "The CLI workflow has a few commands to know. `cdk init app --language python` creates a project. `cdk bootstrap` must be run once per account and Region before the first deployment: it creates a CloudFormation stack (named `CDKToolkit` by default) with an S3 bucket and ECR repository for assets such as Lambda code and Docker images, plus IAM roles the CDK uses to deploy. If you see an error that the environment is not bootstrapped, or that the assets bucket does not exist, run `cdk bootstrap aws://ACCOUNT-ID/REGION`. `cdk synth` runs your app and emits the CloudFormation template (into the `cdk.out` directory), which is handy for review and testing. `cdk diff` compares your code with what is deployed. `cdk deploy` synthesizes, uploads assets, and deploys the stacks through CloudFormation, asking for confirmation when security-related changes like new IAM permissions are included. `cdk destroy` deletes a stack.",
   "Because the output is ordinary CloudFormation, all of CloudFormation's behaviour applies: rollbacks on failure, drift, retention policies (`removal_policy` in the CDK, where many stateful resources are retained by default when deleted), and outputs (`CfnOutput`). You can unit test synthesized templates with the CDK assertions module, for example checking that a bucket has encryption enabled."
  ],
  "terms": [
   [
    "Construct",
    "The basic CDK building block representing one or more AWS resources, arranged in a tree under an App."
   ],
   [
    "L2 construct",
    "A higher-level CDK class with sensible defaults and helper methods, such as s3.Bucket."
   ],
   [
    "cdk bootstrap",
    "Creates the CDKToolkit stack with an asset bucket, ECR repository and deployment roles in an account and Region."
   ],
   [
    "cdk synth",
    "Runs the CDK app and produces CloudFormation templates in the cdk.out directory."
   ]
  ],
  "example": "A developer runs cdk deploy in a new Region and gets an error that the stack requires bootstrapping because an assets bucket is missing. They run cdk bootstrap for that account and Region once, and the next cdk deploy uploads the Lambda code asset and creates the stack.",
  "tip": "If a first CDK deployment fails because the staging bucket or bootstrap stack is missing, the answer is cdk bootstrap. To see the CloudFormation template the CDK will produce, use cdk synth.",
  "check": [
   [
    "What do CDK apps ultimately deploy with?",
    "AWS CloudFormation, using templates produced by synthesis."
   ],
   [
    "What is the difference between an L1 and an L2 construct?",
    "L1 constructs (Cfn prefix) map directly to CloudFormation resources with all properties set by you; L2 constructs add defaults and helper methods such as grant functions."
   ],
   [
    "How often must cdk bootstrap be run?",
    "Once per account and Region combination (and again if the bootstrap template needs upgrading)."
   ]
  ]
 },
 {
  "t": "Lambda versions and aliases; weighted aliases; CodeDeploy canary, linear and all-at-once traffic shifting with alarm rollback",
  "body": [
   "Deploying new Lambda code safely means being able to point callers at a known version, shift traffic gradually, and roll back quickly. Versions and aliases provide the building blocks, and AWS CodeDeploy automates the shifting.",
   "When you edit a function, you change `$LATEST`, the mutable working copy. Publishing a version (`aws lambda publish-version`) takes an immutable snapshot of the code and configuration, numbered 1, 2, 3 and so on. A version's code and most settings cannot change afterwards, so a version is a reliable deployment unit. Each version has its own ARN: a qualified ARN ends with `:3` for version 3, while an unqualified ARN refers to `$LATEST`.",
   "An alias is a named pointer to a version, such as `prod`, `staging` or `live`, with its own ARN ending in `:prod`. Callers and triggers (API Gateway integrations, event source mappings, S3 notifications) should reference the alias, not a version number. To release, you update the alias to point to a new version; to roll back, you point it back. The caller's configuration never changes. Aliases can also have their own provisioned concurrency and resource-based policy permissions.",
   "A weighted alias splits traffic between two versions: for example `prod` sends 90% of invocations to version 3 and 10% to version 4, using a routing configuration (`--routing-config AdditionalVersionWeights={\"4\"=0.1}`). You can then watch metrics for the new version and increase the weight. Aliases cannot point to `$LATEST` with weights; both must be published versions.",
   "AWS CodeDeploy automates weighted shifting for Lambda. A deployment configuration defines the pattern: canary shifts a small percentage first, then the rest after an interval (for example `CodeDeployDefault.LambdaCanary10Percent5Minutes`: 10% for five minutes, then 100%); linear shifts equal increments at fixed intervals (for example `LambdaLinear10PercentEvery1Minute`: 10% more every minute until 100%); all-at-once shifts everything immediately. You can create custom configurations too. During the deployment, CodeDeploy monitors CloudWatch alarms you attach, such as error rate or latency alarms for the new alias version. If an alarm goes into ALARM state, CodeDeploy stops and automatically rolls the alias back to the previous version. Hook functions (`BeforeAllowTraffic` and `AfterAllowTraffic`) can run validation tests before and after the shift, and a failing hook also triggers rollback.",
   "In SAM this is just a few lines on the function: `AutoPublishAlias: live` publishes a new version on each deployment and moves the `live` alias, and `DeploymentPreference` with `Type: Canary10Percent5Minutes`, a list of `Alarms` and optional `Hooks` makes CodeDeploy do the traffic shifting and rollback."
  ],
  "terms": [
   [
    "$LATEST",
    "The mutable, unpublished version of a Lambda function that reflects the most recent code and configuration edits."
   ],
   [
    "Version",
    "An immutable, numbered snapshot of a Lambda function's code and configuration."
   ],
   [
    "Alias",
    "A named pointer to a function version, optionally weighted between two versions, with its own ARN."
   ],
   [
    "Canary deployment",
    "A traffic shift that sends a small percentage to the new version first, then the rest after a wait."
   ],
   [
    "Linear deployment",
    "A traffic shift that moves equal percentages to the new version at regular intervals."
   ]
  ],
  "example": "A team uses SAM with AutoPublishAlias: live and DeploymentPreference Type Linear10PercentEvery1Minute plus an alarm on the function's Errors metric. Four minutes into a release, errors spike, the alarm fires, and CodeDeploy moves the live alias back to the previous version without anyone changing API Gateway.",
  "tip": "Canary is two steps (small percent, then all); linear is many equal steps. Automatic rollback in CodeDeploy is driven by CloudWatch alarms or failing hooks. Point triggers at aliases, never at $LATEST, in production.",
  "check": [
   [
    "Why should API Gateway call an alias rather than a version number?",
    "So releases and rollbacks only require moving the alias, without changing API Gateway's integration."
   ],
   [
    "What does LambdaCanary10Percent5Minutes do?",
    "Shifts 10% of traffic to the new version, waits five minutes, then shifts the remaining 90%."
   ],
   [
    "What triggers an automatic rollback in a CodeDeploy Lambda deployment?",
    "A configured CloudWatch alarm entering ALARM state, or a failing BeforeAllowTraffic or AfterAllowTraffic hook."
   ]
  ]
 },
 {
  "t": "API Gateway stages, stage variables, deployments, mock integrations, canary releases",
  "body": [
   "In an Amazon API Gateway REST API, editing resources and methods in the console does not change what callers see. Changes go live only when you create a deployment: a snapshot of the API's configuration. A deployment is associated with a stage, a named, callable reference to that snapshot, such as `dev`, `test` or `prod`, reachable at an invoke URL of the form `{api-id}.execute-api.{region}.amazonaws.com/prod`. Forgetting to deploy after an edit is a classic reason why a change 'doesn't work'. (HTTP APIs can enable automatic deployment for a stage.)",
   "Each stage has its own settings: throttling limits, caching, CloudWatch logging and metrics, X-Ray tracing, a client certificate for the backend, and web ACL association. This lets `prod` have caching and detailed logging while `dev` stays cheap.",
   "Stage variables are name-value pairs defined on a stage that behave like environment variables for the API. You reference them in integration settings and mapping templates as `${stageVariables.name}`. The most common exam use is pointing each stage at a different Lambda alias: set the integration's function to `my-function:${stageVariables.lambdaAlias}`, then set `lambdaAlias` to `dev` on the dev stage and `prod` on the prod stage. One API definition then serves every environment. Remember that each alias needs a resource-based policy permission allowing API Gateway to invoke it, typically added with the CLI for each alias. Stage variables can also hold an HTTP backend URL or values passed to a Lambda authorizer.",
   "Integrations connect a method to a backend: Lambda (proxy or custom), HTTP (proxy or custom), AWS service (call an AWS API directly, such as SQS `SendMessage`), and mock. A mock integration returns a response generated by API Gateway itself from a mapping template, without calling any backend. Use it to let front-end teams work against an API before the backend exists, to return fixed responses for testing, or to answer CORS preflight `OPTIONS` requests. With non-proxy integrations, mapping templates written in Velocity Template Language (VTL) transform requests and responses, and you define method and integration responses to map status codes.",
   "A canary release on a REST API stage sends a configured percentage of the stage's traffic to a new deployment while the rest continues to use the current one. The canary can have its own stage variable overrides, so you can point canary traffic at a new Lambda alias, and its own metrics and logs, so you can compare behaviour. When satisfied, you promote the canary, making its deployment the stage's main deployment; if not, you delete the canary settings and all traffic returns to the existing deployment.",
   "Clients can also reach an API through a custom domain name with base path mappings to stages, so `api.example.com/v1` maps to a stage and callers never see stage names. Endpoint types are edge-optimized (through CloudFront), Regional, and private (only reachable from a VPC through an interface VPC endpoint)."
  ],
  "terms": [
   [
    "Deployment",
    "A snapshot of a REST API's configuration that must be created for changes to go live on a stage."
   ],
   [
    "Stage",
    "A named reference to a deployment, with its own URL and settings such as caching, throttling and logging."
   ],
   [
    "Stage variable",
    "A name-value pair on a stage, referenced as ${stageVariables.name} in integrations and mapping templates."
   ],
   [
    "Mock integration",
    "An integration where API Gateway returns a response from a mapping template without calling a backend."
   ],
   [
    "Canary release",
    "A stage setting that routes a percentage of traffic to a new deployment before promotion."
   ]
  ],
  "example": "A team's API integration uses the function ARN orders-fn:${stageVariables.alias}. The dev stage sets alias to dev and the prod stage sets it to prod. After they add a prod canary with 10% of traffic and an alias override of prod-next, they monitor the canary's metrics for an hour and then promote it.",
  "tip": "Changes not visible to clients means you forgot to deploy to the stage. Different stages calling different Lambda aliases from one API means stage variables, plus a Lambda permission for each alias.",
  "check": [
   [
    "Why might an API change made in the console not be seen by clients?",
    "REST API changes only go live after a new deployment is created to the stage."
   ],
   [
    "How do you make the prod stage invoke the prod alias and the dev stage the dev alias using one integration?",
    "Reference a stage variable in the function ARN, such as my-function:${stageVariables.lambdaAlias}, set per stage, and grant API Gateway permission on each alias."
   ],
   [
    "When is a mock integration useful?",
    "For returning fixed responses without a backend, such as early front-end development, testing, or CORS preflight responses."
   ]
  ]
 },
 {
  "t": "Elastic Beanstalk deployment policies: all at once, rolling, rolling with additional batch, immutable, traffic splitting, blue/green URL swap",
  "body": [
   "AWS Elastic Beanstalk runs web applications on EC2 instances without you configuring the infrastructure yourself. You upload an application version (a source bundle, for example a .zip), and Beanstalk provisions load balancers, Auto Scaling groups and instances for an environment. How it rolls a new version onto running instances is set by the deployment policy, and the exam expects you to weigh speed, downtime, cost and rollback for each.",
   "All at once deploys the new version to every instance simultaneously. It is the fastest and needs no extra instances, but the application is unavailable during the deployment, and if the new version is broken, everything is broken; rollback means redeploying the old version. Suitable for development environments.",
   "Rolling deploys to one batch of instances at a time (batch size as a number or percentage). Instances in the current batch are taken out of service, updated, and returned before the next batch starts. There is no additional cost, but capacity is reduced during the deployment, and for a while both versions serve traffic. A failure leaves some instances on each version, requiring a manual redeploy.",
   "Rolling with additional batch first launches a new batch of instances, so full capacity is maintained throughout, then proceeds as a rolling deployment and terminates the extra batch at the end. It costs a little more for a short time and is used when production must keep full capacity.",
   "Immutable launches a complete set of new instances with the new version in a temporary Auto Scaling group, checks that they pass health checks, then moves them into the original group and terminates the old instances. It is the safest in-place-environment option: old instances are untouched until the new ones are healthy, so a failed deployment is rolled back quickly by terminating the new instances. It is slower and temporarily doubles capacity cost.",
   "Traffic splitting is a canary-style variant of immutable: new instances are launched, and the load balancer sends a configured percentage of client traffic to them for an evaluation period while health is monitored. If all is well, traffic fully shifts; if not, Beanstalk moves traffic back and terminates the new instances.",
   "Blue/green is not a deployment policy but a technique: you clone the environment (or create a new one) with the new version, test it at its own URL, then use Swap Environment URLs, which swaps the CNAME records of the two environments so the new one takes production traffic. Rollback is swapping back. Because it relies on DNS changes, clients may take a short while to switch. Resources such as an RDS database created inside an environment are tied to its lifecycle, so production databases should be created outside Beanstalk and connected by configuration.",
   "Summary for the exam: fastest with downtime is all at once; no extra cost but reduced capacity is rolling; full capacity is rolling with additional batch; safest with quick rollback is immutable; percentage-based testing of live traffic is traffic splitting; zero-downtime with a separate environment and DNS swap is blue/green."
  ],
  "terms": [
   [
    "Deployment policy",
    "The Elastic Beanstalk setting that controls how a new application version is rolled onto an environment's instances."
   ],
   [
    "Rolling with additional batch",
    "A policy that launches an extra batch of instances first so capacity never drops during a rolling deployment."
   ],
   [
    "Immutable deployment",
    "A policy that deploys to a fresh set of instances and swaps them in only after they are healthy."
   ],
   [
    "Swap environment URLs",
    "A blue/green technique that exchanges the CNAMEs of two Beanstalk environments to move production traffic."
   ]
  ],
  "example": "An online retailer's production Beanstalk environment must never drop below full capacity and must roll back fast if a release misbehaves. They choose immutable deployments, so the new version runs on new instances that are only moved into service once they pass health checks.",
  "tip": "Look for the requirement words: minimal cost with downtime acceptable means all at once; keep full capacity means rolling with additional batch; quickest safe rollback means immutable; separate environment and DNS switch means blue/green.",
  "check": [
   [
    "Which policy keeps full capacity while updating in batches?",
    "Rolling with additional batch."
   ],
   [
    "How does rollback work for a failed immutable deployment?",
    "The new instances are terminated; the original instances were never changed, so they keep serving."
   ],
   [
    "How is blue/green performed in Elastic Beanstalk?",
    "Deploy the new version to a separate environment, test it, then swap environment URLs (CNAMEs) with production."
   ]
  ]
 },
 {
  "t": "CodePipeline stages and actions, manual approvals; CodeBuild buildspec phases and artifacts",
  "body": [
   "Continuous integration and continuous delivery (CI/CD) automate the path from a code change to a running release. On AWS, AWS CodePipeline orchestrates the flow and AWS CodeBuild does the building and testing.",
   "A CodePipeline pipeline is made of stages, run in order, such as Source, Build, Test, Approve and Deploy. Each stage contains one or more actions, which can run sequentially or in parallel (using run order). Action categories are source, build, test, deploy, approval and invoke. Source actions include AWS CodeCommit, Amazon S3, Amazon ECR and third-party repositories such as GitHub or Bitbucket through a connection. Build and test actions typically use CodeBuild. Deploy actions include CodeDeploy, CloudFormation, Elastic Beanstalk, Amazon ECS and S3. Invoke actions can call a Lambda function or run a Step Functions state machine for custom steps. Actions pass files to one another as artifacts, stored in the pipeline's S3 artifact bucket: an action declares output artifacts, and a later action names them as input artifacts. A pipeline starts on source changes (through events or webhooks) and each run is an execution; if an action fails, the stage fails and the execution stops.",
   "A manual approval action pauses the pipeline until someone with the right IAM permissions approves or rejects it, for example before deploying to production. It can notify reviewers through an SNS topic and include a URL for them to review, such as a staging site. If nobody responds within seven days the action fails.",
   "CodeBuild is a fully managed build service: each build runs in a fresh container from a build image, installs tools, runs your commands, and uploads outputs. You describe the build in `buildspec.yml` at the root of the source (or specify an alternate file or inline buildspec in the project).",
   "```yaml\nversion: 0.2\nenv:\n  variables:\n    STAGE: test\n  parameter-store:\n    DB_URL: /myapp/test/db-url\nphases:\n  install:\n    runtime-versions:\n      python: 3.12\n    commands:\n      - pip install -r requirements.txt\n  pre_build:\n    commands:\n      - pytest tests/unit\n  build:\n    commands:\n      - sam build\n  post_build:\n    commands:\n      - sam package --s3-bucket my-artifacts --output-template-file packaged.yaml\nartifacts:\n  files:\n    - packaged.yaml\ncache:\n  paths:\n    - /root/.cache/pip/**/*\n```",
   "The phases run in order: `install` (install runtimes and tools), `pre_build` (log in to ECR, run unit tests, fetch dependencies), `build` (compile or package) and `post_build` (push images, package, notify). The `env` section supplies plain variables and values from Parameter Store or Secrets Manager, so secrets are not written in the file. `artifacts` lists files to upload as the build output, which CodePipeline passes to the next stage. `reports` publishes test results, and `cache` saves dependencies to S3 or locally to speed later builds. Build logs go to CloudWatch Logs or S3. The CodeBuild service role needs permissions for everything the build does, such as pushing to ECR or reading parameters. CodeBuild can also run inside your VPC to reach private resources, and you can run builds locally with the CodeBuild local agent for debugging."
  ],
  "terms": [
   [
    "Stage",
    "A sequential step in a CodePipeline pipeline containing one or more actions."
   ],
   [
    "Action",
    "A task within a stage, such as a source fetch, CodeBuild build, deployment or manual approval."
   ],
   [
    "Artifact",
    "Files produced by one pipeline action and consumed by another, stored in the pipeline's S3 bucket."
   ],
   [
    "buildspec.yml",
    "The YAML file defining CodeBuild's environment, phases, artifacts, reports and cache."
   ],
   [
    "Manual approval",
    "A pipeline action that pauses execution until an authorized person approves or rejects it."
   ]
  ],
  "example": "A pipeline has Source (GitHub connection), Build (CodeBuild runs unit tests and sam package), DeployStaging (CloudFormation), an Approval action that emails the QA lead through SNS with the staging URL, and DeployProd. The QA lead approves after checking staging, and the same packaged artifact is deployed to production.",
  "tip": "Buildspec phase order is install, pre_build, build, post_build. Files needed by the next pipeline stage must be listed under artifacts. Keep secrets in env parameter-store or secrets-manager, never in the buildspec.",
  "check": [
   [
    "How does a deploy stage get the files produced by the build stage?",
    "The build action declares an output artifact and the deploy action uses it as an input artifact, stored in the pipeline's S3 artifact bucket."
   ],
   [
    "In which buildspec phase would you typically run unit tests or log in to ECR?",
    "pre_build (though tests can also be run in build)."
   ],
   [
    "What happens if a manual approval is not acted on?",
    "It waits, and fails if not approved or rejected within seven days, stopping the execution."
   ]
  ]
 },
 {
  "t": "CodeDeploy appspec.yml lifecycle hooks for EC2, Lambda and ECS; the CodeDeploy agent",
  "body": [
   "AWS CodeDeploy automates deploying application revisions to three compute platforms: EC2 and on-premises servers, Lambda, and Amazon ECS. For each deployment it reads an application specification file, `appspec.yml` (or JSON for Lambda and ECS), which describes what to deploy and which lifecycle event hooks to run. The exam tests the hook order and which hooks exist on each platform.",
   "For EC2 and on-premises servers, CodeDeploy relies on the CodeDeploy agent, a program installed and running on each instance. The agent polls CodeDeploy for work, downloads the revision (from S3 or GitHub), copies files as described in the `files` section, sets `permissions`, and runs your hook scripts. The instance also needs an instance profile allowing it to read the revision from S3. If deployments hang or fail immediately on an instance, check that the agent is installed and running and that its logs (under the agent's log directory) show no permission errors.",
   "The EC2 in-place lifecycle order is: `ApplicationStop`, `DownloadBundle`, `BeforeInstall`, `Install`, `AfterInstall`, `ApplicationStart`, `ValidateService`. With a load balancer, `BeforeBlockTraffic`, `BlockTraffic` and `AfterBlockTraffic` come first, and `BeforeAllowTraffic`, `AllowTraffic` and `AfterAllowTraffic` come at the end. You can attach scripts to the hooks but not to the events CodeDeploy runs itself (`DownloadBundle`, `Install`, `BlockTraffic`, `AllowTraffic`). Note that `ApplicationStop` runs the script from the previously deployed revision, which is why a broken stop script from an old revision can fail a new deployment.",
   "```yaml\nversion: 0.0\nos: linux\nfiles:\n  - source: /\n    destination: /var/www/app\nhooks:\n  ApplicationStop:\n    - location: scripts/stop.sh\n      timeout: 60\n  AfterInstall:\n    - location: scripts/install_deps.sh\n  ApplicationStart:\n    - location: scripts/start.sh\n  ValidateService:\n    - location: scripts/health_check.sh\n```",
   "For Lambda, there are no instances or files. The AppSpec names the function, alias, current version and target version, and CodeDeploy shifts the alias's traffic according to the deployment configuration (canary, linear or all at once). The only hooks are `BeforeAllowTraffic` and `AfterAllowTraffic`, and each names a Lambda function that runs validation tests and reports success or failure back to CodeDeploy with `PutLifecycleEventHookExecutionStatus`.",
   "For ECS, CodeDeploy performs blue/green deployments: it starts a replacement (green) task set with the new task definition behind a load balancer's test listener, then shifts production traffic from the blue task set. The AppSpec gives the task definition, container name and port. Hooks, each a Lambda function, are `BeforeInstall`, `AfterInstall`, `AfterAllowTestTraffic`, `BeforeAllowTraffic` and `AfterAllowTraffic`; `AfterAllowTestTraffic` is where you run tests through the test listener before real users arrive.",
   "Deployment settings to know: EC2 deployment configurations such as `CodeDeployDefault.OneAtATime`, `HalfAtATime` and `AllAtOnce`; in-place versus blue/green for EC2; and automatic rollback when a deployment fails or a CloudWatch alarm fires, which redeploys the last known good revision."
  ],
  "terms": [
   [
    "appspec.yml",
    "The CodeDeploy application specification file describing files to deploy and lifecycle hook scripts or functions."
   ],
   [
    "CodeDeploy agent",
    "Software on EC2 or on-premises instances that pulls revisions from CodeDeploy and runs lifecycle hooks."
   ],
   [
    "Lifecycle event hook",
    "A point in a deployment where CodeDeploy runs your script or Lambda function, such as AfterInstall."
   ],
   [
    "AfterAllowTestTraffic",
    "An ECS deployment hook that runs after the test listener sends traffic to the new task set, before production traffic shifts."
   ]
  ],
  "example": "Deployments to a group of EC2 instances fail at ApplicationStop on one host only. The deployment log shows the script from the previous revision is missing. The developer reruns the deployment with the option to ignore ApplicationStop failures, and then fixes the stop script in the new revision so future deployments succeed.",
  "tip": "Memorize the EC2 order: ApplicationStop, DownloadBundle, BeforeInstall, Install, AfterInstall, ApplicationStart, ValidateService. Lambda has only BeforeAllowTraffic and AfterAllowTraffic. EC2 deployments that never start usually mean the agent is not running.",
  "check": [
   [
    "Which hook would you use to verify an EC2 application is healthy after it starts?",
    "ValidateService."
   ],
   [
    "Which lifecycle hooks can a Lambda deployment use?",
    "BeforeAllowTraffic and AfterAllowTraffic."
   ],
   [
    "What must be installed on EC2 instances for CodeDeploy to work?",
    "The CodeDeploy agent, plus an instance profile that allows access to the revision location."
   ]
  ]
 },
 {
  "t": "Testing in development environments: unit tests in CI, integration tests against deployed stages, AppConfig feature flags and gradual configuration rollout",
  "body": [
   "Good test strategy for cloud applications layers different kinds of tests, each catching different problems at different cost. The exam wants you to know where each fits and which AWS features support safe testing and release.",
   "Unit tests check individual functions and classes in isolation, quickly, with no AWS calls. For a Lambda function, structure the code so business logic lives in plain functions that the handler calls, then test that logic directly. AWS SDK calls are replaced with mocks or stubs (for example the moto library or botocore Stubber in Python, or a mocking client in JavaScript). Run unit tests on every commit in CI, typically in the CodeBuild `pre_build` or `build` phase, and fail the build on any failure so broken code never reaches an environment. CodeBuild test reports display the results.",
   "Local emulation sits between unit and integration tests: `sam local invoke` and `sam local start-api` run functions in Docker with sample events, useful for quick checks of event parsing and handler wiring. However, emulation cannot fully reproduce IAM permissions, service limits or real integrations.",
   "Integration tests exercise real deployed resources, which is the only way to catch wrong IAM permissions, misconfigured triggers, API Gateway mappings or timeouts. The common pattern is deploying the stack to a dedicated development or test stage (a separate stack, and often a separate account), then running tests that call its API endpoint, put messages on its queues or write to its tables, and assert results. Stack outputs, such as the API URL, feed the tests. In CodePipeline, a test stage after a deploy-to-test action runs these tests before promotion. API Gateway stages with stage variables and Lambda aliases let the same code be tested in dev and test before prod, and mock integrations can stand in for unfinished backends. Clean up temporary test stacks to avoid cost.",
   "AWS AppConfig, a capability of AWS Systems Manager, separates configuration changes from code deployments. You create an application, environments (such as beta and prod) and configuration profiles, either freeform configuration (JSON, YAML or text, stored in AppConfig, S3, Parameter Store and others) or feature flags. Feature flags let you ship code with a feature turned off, then turn it on for testing or users without redeploying, and turn it off instantly if problems appear. Validators (a JSON schema or a Lambda function) check a configuration before it is deployed.",
   "AppConfig deployments roll out configuration gradually using a deployment strategy, which sets the growth type (linear or exponential), growth factor, total deployment time and a bake time. During the rollout and bake time, AppConfig watches CloudWatch alarms you associate with the environment and automatically rolls back the configuration if one fires. Applications retrieve configuration with the AppConfig data API (`StartConfigurationSession` and `GetLatestConfiguration`), and Lambda functions usually use the AppConfig Lambda extension, which caches configuration and refreshes it in the background."
  ],
  "terms": [
   [
    "Unit test",
    "A fast, isolated test of a single piece of logic with external dependencies mocked."
   ],
   [
    "Integration test",
    "A test against deployed resources to verify real permissions, triggers and service interactions."
   ],
   [
    "Feature flag",
    "A configuration switch that turns functionality on or off at runtime without redeploying code."
   ],
   [
    "AppConfig deployment strategy",
    "Settings controlling how quickly a configuration change rolls out and how long it bakes before completing."
   ]
  ],
  "example": "A team ships a new recommendation engine behind an AppConfig feature flag that is off. After deployment, they enable it with a linear strategy over 30 minutes and an alarm on the API's 5xx rate. Error rates climb at 40% rollout, the alarm fires, and AppConfig rolls the flag back without any code change.",
  "tip": "Changing application behaviour safely without redeploying code points to AppConfig feature flags with a deployment strategy and alarm-based rollback. Tests that must verify IAM permissions or real integrations need a deployed test stage, not mocks.",
  "check": [
   [
    "Why can't unit tests with mocks catch a missing IAM permission?",
    "Mocks never call AWS, so authorization is never checked; only integration tests against deployed resources exercise real permissions."
   ],
   [
    "What triggers an automatic AppConfig rollback?",
    "A CloudWatch alarm associated with the environment going into ALARM during the deployment or bake time."
   ],
   [
    "How do Lambda functions typically read AppConfig configuration efficiently?",
    "Through the AppConfig Lambda extension, which caches configuration locally and refreshes it in the background."
   ]
  ]
 },
 {
  "t": "Root cause analysis with CloudWatch Logs, Logs Insights queries, metrics and dashboards",
  "body": [
   "When something breaks in production, you need to go from a symptom ('checkout is slow') to a cause ('the payment function times out calling a third-party API'). Amazon CloudWatch provides the raw material: logs, metrics and dashboards. Domain 4 of the exam presents symptoms and asks where to look.",
   "CloudWatch Logs organizes log data into log groups (usually one per application or function, such as `/aws/lambda/checkout`) containing log streams (one per source, such as one per Lambda execution environment or container). Lambda writes everything your code prints plus its own `START`, `END` and `REPORT` lines; the `REPORT` line shows duration, billed duration, memory size, max memory used and init duration for cold starts. Set a retention period on each log group, because the default is to keep logs forever. You can search logs with filter patterns, stream them live (Live Tail), and forward them in real time with subscription filters to Lambda, Kinesis or Amazon Data Firehose.",
   "CloudWatch Logs Insights is an interactive query language for log groups. Queries chain commands with pipes: `fields`, `filter`, `stats`, `sort`, `limit` and `parse`. Logs Insights automatically discovers fields in JSON logs, which is another reason to log in JSON. You choose one or more log groups and a time range, run the query and can add results to a dashboard.",
   "```\nfields @timestamp, @requestId, @message\n| filter @message like /ERROR/\n| sort @timestamp desc\n| limit 50\n\nfilter @type = \"REPORT\"\n| stats avg(@duration), max(@duration), max(@maxMemoryUsed) by bin(5m)\n```",
   "Metrics are numerical time series. AWS services publish metrics automatically, for example Lambda `Invocations`, `Errors`, `Throttles`, `Duration`, `ConcurrentExecutions` and `IteratorAge`; API Gateway `Count`, `4XXError`, `5XXError`, `Latency` and `IntegrationLatency`; SQS `ApproximateNumberOfMessagesVisible` and `ApproximateAgeOfOldestMessage`; DynamoDB consumed capacity and `ThrottledRequests`. Each metric belongs to a namespace and has dimensions (such as `FunctionName`), and you view it with a statistic (Average, Sum, Maximum, percentiles like p99) over a period. Metric filters turn log patterns into metrics, such as counting lines containing `PaymentDeclined`, so you can graph and alarm on them.",
   "A useful root cause process: start with metrics to find when the problem began and which component is affected (for example, API Gateway `Latency` minus `IntegrationLatency` tells you whether time was spent in API Gateway or the backend); narrow the time window; use Logs Insights to find errors and slow requests in that window; follow a request ID or correlation ID across services; and use X-Ray traces for the call path. CloudWatch dashboards place the key graphs for an application side by side, can span Regions and accounts, and can be shared, making them the first stop during an incident. Contributor Insights can show the top contributors, such as the most throttled DynamoDB keys or the noisiest client IPs."
  ],
  "terms": [
   [
    "Log group",
    "A CloudWatch Logs container for log streams that share retention, encryption and access settings."
   ],
   [
    "CloudWatch Logs Insights",
    "An interactive query service for searching and aggregating log data with a pipe-based query language."
   ],
   [
    "Metric filter",
    "A rule that extracts metric values from matching log events so they can be graphed and alarmed on."
   ],
   [
    "Dimension",
    "A name-value pair that identifies a specific metric series, such as FunctionName=checkout."
   ]
  ],
  "example": "Users report slow checkout since 14:00. The dashboard shows API Gateway Latency rising while IntegrationLatency rises by the same amount, so the backend is slow. A Logs Insights query on the checkout function's REPORT lines shows max duration near the timeout, and filtering for ERROR reveals timeouts calling the payment provider.",
  "tip": "Know which tool answers which question: metrics tell you what and when, logs (via Logs Insights) tell you why, and traces tell you where in the call chain. Turning a log pattern into something you can alarm on means a metric filter.",
  "check": [
   [
    "How can you count occurrences of a specific error message in logs and alarm on it?",
    "Create a metric filter on the log group that matches the message, then create a CloudWatch alarm on the resulting metric."
   ],
   [
    "Which Lambda log line shows memory used and duration?",
    "The REPORT line written at the end of each invocation."
   ],
   [
    "Why set a log group retention period?",
    "By default logs are kept indefinitely, which grows cost; retention deletes logs after the chosen period."
   ]
  ]
 },
 {
  "t": "Common Lambda errors: throttling (429), timeouts, AccessDenied from the execution role, malformed proxy responses (502), API Gateway 504 integration timeouts",
  "body": [
   "Many troubleshooting questions describe a symptom and an error code. Knowing what each common Lambda and API Gateway error means, and its fix, turns these into easy points.",
   "Throttling happens when invocations exceed available concurrency: the account's Regional concurrency quota, or a function's reserved concurrency. Synchronous callers receive `TooManyRequestsException` with HTTP status 429 (API Gateway may return 429 or a 5xx to clients depending on the setup), and the `Throttles` metric rises. Asynchronous invocations are retried automatically for up to six hours by default, and event source mappings slow their polling. Fixes: request a higher account concurrency quota, raise or set reserved concurrency for the function, reduce concurrency needed by making the function faster, check that another function is not consuming the shared pool (reserve concurrency for critical functions), and have clients retry with exponential backoff. API Gateway also returns 429 when its own stage, method or usage plan throttling limits are exceeded, which is separate from Lambda throttling.",
   "Timeouts occur when a function runs longer than its configured timeout; the log shows `Task timed out after N seconds`. The default is only 3 seconds. Look at what the function waits on: a slow downstream API, a database connection that cannot be established (often a VPC function without a route to the database or to the internet), or too little memory (and hence CPU). Fixes: raise the timeout (up to 15 minutes), raise memory, set shorter client timeouts so the function fails fast with a clear error, reuse connections, or move long work to asynchronous processing.",
   "AccessDenied errors (`AccessDeniedException`, or messages like 'User: arn:aws:sts::...:assumed-role/my-fn-role/my-fn is not authorized to perform: dynamodb:PutItem on resource ...') mean the execution role lacks a permission. The message tells you exactly which action and resource to add. Also check resource policies (bucket or KMS key policies), explicit denies from permission boundaries or SCPs, and whether KMS permissions are needed for encrypted resources. If the function cannot even write logs and nothing appears in CloudWatch, the role is missing the basic logging permissions.",
   "A 502 Bad Gateway from a Lambda proxy integration most often means a malformed proxy response: the function returned something that is not an object with `statusCode` and a string `body`, or the function threw an unhandled error. The API Gateway execution logs show 'Malformed Lambda proxy response'. Fix the return shape (serialize the body with `JSON.stringify` or `json.dumps`) and catch errors to return proper 4xx or 5xx responses. A 500 with an invalid permissions message means API Gateway is not allowed to invoke the function.",
   "A 504 Gateway Timeout from API Gateway is an integration timeout: the backend did not respond within API Gateway's integration timeout, 29 seconds by default. Even if the Lambda function's timeout is 5 minutes, the client gets 504 after the API's limit while the function keeps running. Fixes: make the backend faster, or change the design to be asynchronous: accept the request, queue work in SQS or start a Step Functions execution, return 202 with a job ID, and let the client poll or receive a callback. Regional and private REST APIs can request a longer integration timeout, but asynchronous design is the answer the exam usually wants."
  ],
  "terms": [
   [
    "TooManyRequestsException (429)",
    "The error returned when a Lambda invocation is throttled because no concurrency is available."
   ],
   [
    "Task timed out",
    "The log message Lambda writes when an invocation exceeds its configured timeout."
   ],
   [
    "Malformed Lambda proxy response",
    "An API Gateway error (returned to clients as 502) when a proxy integration's function output has the wrong format."
   ],
   [
    "Integration timeout",
    "The maximum time API Gateway waits for a backend response, 29 seconds by default, after which it returns 504."
   ]
  ],
  "example": "A report endpoint returns 504 errors after about 30 seconds, although the Lambda function eventually finishes after 90 seconds. The team changes the API to put a request on an SQS queue and return 202 with a report ID; a worker function builds the report, and the client polls a status endpoint.",
  "tip": "Map codes to causes: 429 is throttling, 502 is a bad proxy response or function error, 504 is the backend exceeding API Gateway's integration timeout, and AccessDenied naming the assumed role is a missing execution role permission.",
  "check": [
   [
    "An API returns 502 and the logs show 'Malformed Lambda proxy response'. What is the likely fix?",
    "Return an object with a numeric statusCode, optional headers, and body as a string, and handle exceptions so the function always returns that shape."
   ],
   [
    "Why does raising the Lambda timeout not fix a 504 from API Gateway?",
    "API Gateway's integration timeout (29 seconds by default) is reached first, regardless of the function's own timeout."
   ],
   [
    "Name two ways to resolve Lambda throttling.",
    "Request a higher account concurrency quota, set or raise reserved concurrency, speed up the function, or have clients retry with backoff."
   ]
  ]
 },
 {
  "t": "AWS X-Ray: segments, subsegments, annotations vs metadata, sampling, active tracing, the X-Ray daemon/CloudWatch agent",
  "body": [
   "Logs tell you what one component did; distributed tracing shows a whole request as it travels through API Gateway, Lambda, DynamoDB, SQS and external APIs. AWS X-Ray collects that trace data, draws a service map of your application, and lets you find which call made a request slow or failed.",
   "A trace is the full journey of one request, identified by a trace ID that is passed between services in the `X-Amzn-Trace-Id` header. Each service that handles the request sends a segment: a JSON document describing the work that service did, with start and end times, the resource name, HTTP request and response details, and any error or fault. Inside a segment, subsegments break the work down further, such as each downstream AWS SDK call, HTTP call or SQL query, or a block of your own code you want to time. Calls to services that do not send their own segments (an external API, for instance) appear as inferred nodes from subsegments. The service map groups segments into nodes and colours them by error (4xx), fault (5xx) and throttle (429) rates.",
   "You can attach extra data to segments in two ways, and the difference is tested often. Annotations are simple key-value pairs (string, number or Boolean) that X-Ray indexes, so you can search and filter traces with filter expressions such as `annotation.customer_tier = \"gold\"` and create groups from them. Metadata is key-value data of any type, including objects and lists, that is stored with the trace but not indexed, so you can view it but not search on it. Put IDs and categories you will filter by in annotations; put larger debugging payloads in metadata.",
   "```python\nfrom aws_xray_sdk.core import xray_recorder\n\n@xray_recorder.capture('charge_card')   # creates a subsegment\ndef charge_card(order):\n    sub = xray_recorder.current_subsegment()\n    sub.put_annotation('order_id', order['id'])\n    sub.put_metadata('order', order)\n```",
   "Sampling controls how many requests are traced, to keep cost and overhead low. The default rule records the first request each second (the reservoir) and five percent of additional requests. You can create custom sampling rules in the console, matched by service name, URL path, HTTP method and so on, with their own reservoir and rate, and the SDKs pick them up without code changes. If a question asks for tracing more or fewer requests for one path, the answer is a sampling rule.",
   "To enable tracing for Lambda, turn on active tracing (`TracingConfig: Mode: Active`, or `Tracing: Active` in SAM Globals). Lambda then creates segments for the invocation, and the execution role needs permission to send data (`xray:PutTraceSegments` and `xray:PutTelemetryRecords`, included in the `AWSXRayDaemonWriteAccess` managed policy). API Gateway has a per-stage X-Ray tracing setting. To see downstream calls as subsegments, instrument your code with the X-Ray SDK (or AWS Distro for OpenTelemetry, which AWS now recommends for new instrumentation) so that AWS SDK clients and HTTP libraries are patched.",
   "On EC2, ECS and on-premises servers, the SDK does not send data directly to the X-Ray API. It sends segments over UDP port 2000 to a local collector, the X-Ray daemon or the CloudWatch agent (which can act as that collector), which buffers them and uploads them in batches. On ECS you run it as a sidecar container, and the SDK finds it through the `AWS_XRAY_DAEMON_ADDRESS` environment variable. The instance or task role needs the same write permissions. In Lambda and Elastic Beanstalk (with an option setting), this collector is provided for you. Missing traces from EC2 usually mean the daemon is not running or the role lacks permission."
  ],
  "terms": [
   [
    "Segment",
    "The record of work done by one service for a traced request, including timing, request details and errors."
   ],
   [
    "Subsegment",
    "A finer-grained part of a segment, such as one downstream call or a timed block of code."
   ],
   [
    "Annotation",
    "An indexed key-value pair on a segment that can be used in filter expressions to search traces."
   ],
   [
    "Metadata",
    "Non-indexed key-value data of any type stored with a segment for viewing but not searching."
   ],
   [
    "Sampling rule",
    "A rule that sets how many requests of a given kind are traced, using a reservoir and a fixed rate."
   ]
  ],
  "example": "Support needs to find traces for a specific customer's failed orders. The developer adds put_annotation('customer_id', id) in the order function. Now the team can run the filter expression annotation.customer_id = \"C-1042\" in the X-Ray console and open the exact slow traces, where a subsegment shows a DynamoDB call being throttled.",
  "tip": "Need to search or filter traces by a value: annotation. Need to store extra detail for viewing only: metadata. No traces from EC2 or ECS: check the daemon or agent on UDP 2000 and the role's X-Ray write permissions.",
  "check": [
   [
    "Can you filter traces by a metadata value?",
    "No; metadata is not indexed. Use an annotation for values you need to search on."
   ],
   [
    "What does the default X-Ray sampling rule record?",
    "The first request each second, plus five percent of any additional requests."
   ],
   [
    "What must be done to trace a Lambda function besides code instrumentation?",
    "Enable active tracing on the function and give its execution role X-Ray write permissions such as PutTraceSegments."
   ]
  ]
 },
 {
  "t": "Custom metrics: PutMetricData, CloudWatch embedded metric format, high-resolution metrics",
  "body": [
   "AWS services publish many metrics automatically, but not your business events: orders placed, payments declined, items in a cart, time spent calling a partner API. Custom metrics let you publish those numbers to Amazon CloudWatch so you can graph them, put them on dashboards and alarm on them just like built-in metrics.",
   "A metric is identified by a namespace (a container you name, such as `MyShop/Checkout`; the `AWS/` prefix is reserved for AWS services), a metric name, and up to 30 dimensions, the name-value pairs that identify a particular series, such as `Environment=prod` or `PaymentProvider=acme`. Each unique combination of dimensions is a separate metric, so avoid dimensions with unbounded values like user IDs or request IDs; they create huge numbers of metrics and cost. Each data point has a value, an optional unit (`Count`, `Milliseconds`, `Bytes` and so on) and a timestamp.",
   "The direct way to publish is the `PutMetricData` API. You can send single values, arrays of values with counts, or statistic sets (Sum, Minimum, Maximum and SampleCount) that summarize many observations in one data point. Batch multiple values in each call, because calling the API for every single event adds latency to your code and can be throttled. The calling identity needs the `cloudwatch:PutMetricData` permission, and you can restrict it to a namespace with the `cloudwatch:namespace` condition key.",
   "```bash\naws cloudwatch put-metric-data --namespace MyShop/Checkout \\\n  --metric-name OrdersPlaced --dimensions Environment=prod \\\n  --unit Count --value 1 --storage-resolution 1\n```",
   "Resolution matters. Standard-resolution metrics have one-minute granularity. High-resolution metrics, published with `StorageResolution` set to 1, keep data at one-second granularity so you can see short spikes, and alarms on them can use periods of 10 or 30 seconds (as well as multiples of 60). High-resolution data is kept at one-second detail only for a short time before being aggregated, and it costs more when alarmed on, so use it only when seconds matter, such as for real-time trading or autoscaling signals.",
   "The CloudWatch embedded metric format (EMF) is often the best choice from Lambda and containers. Instead of calling an API, you write a structured JSON log line that includes an `_aws` object describing which fields are metrics and which are dimensions. CloudWatch Logs extracts the metrics automatically and asynchronously, so there is no API call in the request path, no added latency and no throttling risk, and the full log line, including high-cardinality details like the order ID, stays searchable in Logs Insights. Libraries such as the EMF client libraries and Powertools for AWS Lambda metrics utilities generate this format for you.",
   "```json\n{\"_aws\": {\"Timestamp\": 1735689600000, \"CloudWatchMetrics\": [{\"Namespace\": \"MyShop/Checkout\", \"Dimensions\": [[\"Environment\"]], \"Metrics\": [{\"Name\": \"OrderValue\", \"Unit\": \"None\"}]}]}, \"Environment\": \"prod\", \"OrderValue\": 42.5, \"orderId\": \"o-981\"}\n```",
   "On EC2 instances, memory and disk usage are not built-in metrics; the CloudWatch agent collects them and publishes them as custom metrics, which is another common exam scenario."
  ],
  "terms": [
   [
    "Namespace",
    "A container for CloudWatch metrics, such as MyShop/Checkout; the AWS/ prefix is reserved for AWS services."
   ],
   [
    "PutMetricData",
    "The CloudWatch API for publishing custom metric data points or statistic sets."
   ],
   [
    "Embedded metric format (EMF)",
    "A structured JSON log format from which CloudWatch Logs automatically extracts metrics."
   ],
   [
    "High-resolution metric",
    "A custom metric stored at one-second granularity by setting StorageResolution to 1."
   ]
  ],
  "example": "A checkout Lambda function called PutMetricData on every order, adding latency and occasionally hitting throttling. The team switches to printing EMF log lines with OrderValue and PaymentLatency metrics and an Environment dimension. The metrics still appear in CloudWatch, the function is faster, and each log line still carries the order ID for investigation.",
  "tip": "Publishing metrics from Lambda without API calls or added latency points to the embedded metric format. Need sub-minute granularity or 10-second alarms: high-resolution metrics with StorageResolution 1. Memory usage on EC2: the CloudWatch agent.",
  "check": [
   [
    "Why avoid using a user ID as a metric dimension?",
    "Every distinct dimension combination is a separate metric, so unbounded values create huge numbers of metrics and cost."
   ],
   [
    "What is the benefit of EMF over PutMetricData in Lambda?",
    "Metrics are extracted asynchronously from logs, so there is no synchronous API call, latency or throttling, and detailed context stays in the log line."
   ],
   [
    "How do you publish a high-resolution metric?",
    "Set StorageResolution to 1 in PutMetricData (or the equivalent in EMF), giving one-second granularity."
   ]
  ]
 },
 {
  "t": "CloudWatch alarms with SNS notifications; structured logging and correlation IDs",
  "body": [
   "Monitoring only helps if someone finds out when something goes wrong. CloudWatch alarms watch metrics and act when they cross a threshold, and good logging practices make the follow-up investigation fast.",
   "A metric alarm watches one metric (or a metric math expression) and has three states: `OK`, `ALARM` and `INSUFFICIENT_DATA`. You configure the statistic (such as Average, Sum or p99), the period, the threshold and comparison operator, and how many periods must breach: evaluation periods and datapoints to alarm let you require, for example, 3 of 5 one-minute periods above the threshold, which avoids alerts on single blips. You also decide how missing data is treated (as breaching, not breaching, ignored, or missing), which matters for metrics like Lambda `Errors` that simply have no data when nothing happens. Anomaly detection alarms use a band learned from the metric's history instead of a fixed threshold. Composite alarms combine several alarms with AND, OR and NOT rules to reduce noise, for example alerting only when both error rate and latency are high.",
   "Alarm actions run on state changes. The most common action is publishing to an Amazon SNS topic, which then delivers to email, SMS, a Lambda function, an HTTPS endpoint or chat integrations. Email subscribers must confirm the subscription before they receive messages, which is a common reason alerts 'never arrive'. If the SNS topic is encrypted with a customer managed KMS key, the key policy must let CloudWatch use it. Other actions include EC2 actions (stop, terminate, reboot, recover), Auto Scaling policies and Systems Manager OpsItems or incidents. Alarms also drive automated rollbacks in CodeDeploy and AppConfig.",
   "```bash\naws cloudwatch put-metric-alarm --alarm-name checkout-errors \\\n  --namespace AWS/Lambda --metric-name Errors \\\n  --dimensions Name=FunctionName,Value=checkout \\\n  --statistic Sum --period 60 --evaluation-periods 5 --datapoints-to-alarm 3 \\\n  --threshold 5 --comparison-operator GreaterThanThreshold \\\n  --treat-missing-data notBreaching \\\n  --alarm-actions arn:aws:sns:us-east-1:111122223333:oncall\n```",
   "Structured logging means writing each log entry as a JSON object with consistent fields (timestamp, level, service, message, request ID and relevant business IDs) instead of free-form text. JSON logs can be queried by field in Logs Insights, filtered precisely with metric filters, and parsed by other tools. Lambda can emit its own system logs in JSON and filter by log level through its logging configuration, and libraries such as Powertools for AWS Lambda Logger add context like the request ID and cold start flag automatically.",
   "A correlation ID ties together all log entries for one business request across services. Generate it at the edge (or reuse an incoming one, such as a request header or the API Gateway request ID), include it in every log line, and pass it downstream: in HTTP headers, SQS or SNS message attributes, EventBridge event detail and Step Functions input. Then one Logs Insights query filtering on that ID across several log groups shows the whole story. X-Ray trace IDs serve a similar purpose for traces, and logging the trace ID connects logs and traces."
  ],
  "terms": [
   [
    "Metric alarm",
    "A CloudWatch alarm that changes state when a metric or expression crosses a threshold for a set number of periods."
   ],
   [
    "Datapoints to alarm",
    "The number of breaching data points within the evaluation periods required to trigger ALARM (M out of N)."
   ],
   [
    "Composite alarm",
    "An alarm whose state is computed from a rule combining other alarms' states."
   ],
   [
    "Structured logging",
    "Writing log entries as consistent machine-readable fields, usually JSON."
   ],
   [
    "Correlation ID",
    "A unique identifier propagated through all services handling a request so their logs can be linked."
   ]
  ],
  "example": "An order passes from API Gateway to a Lambda function, then through SQS to a fulfillment function. The first function logs JSON with correlationId set to the API request ID and adds it as an SQS message attribute; the second logs the same ID. When a customer complains, one Logs Insights query across both log groups for that ID shows exactly where the order stalled.",
  "tip": "An alarm that should notify people publishes to an SNS topic; if emails never arrive, check the subscription is confirmed. To avoid alerts on one-off spikes, use M out of N datapoints to alarm rather than a single period.",
  "check": [
   [
    "What are the three states of a CloudWatch alarm?",
    "OK, ALARM and INSUFFICIENT_DATA."
   ],
   [
    "How should an alarm on Lambda Errors usually treat missing data, and why?",
    "As not breaching, because no data simply means no errors (or no invocations) in that period."
   ],
   [
    "How do you carry a correlation ID through an SQS queue?",
    "Put it in a message attribute (or the body) when sending, and have the consumer read and log it."
   ]
  ]
 },
 {
  "t": "Lambda performance: memory/CPU tuning, cold starts, provisioned concurrency, reserved concurrency",
  "body": [
   "Lambda performance tuning is about three things: how fast each invocation runs, how long new execution environments take to start, and how concurrency is shared. Each has a specific lever.",
   "Memory is the only compute size setting: Lambda allocates CPU power (and network bandwidth) in proportion to configured memory, so doubling memory roughly doubles available CPU. For CPU-bound code (image processing, compression, encryption, JSON parsing of large documents), raising memory often cuts duration so much that cost stays the same or drops, because you pay for memory multiplied by duration. At higher memory settings a function gets more than one virtual CPU, which only helps if the code uses multiple threads or processes. Use the `REPORT` log line's `Max Memory Used` to find functions that are over- or under-provisioned, and test different settings empirically, for example with the open-source AWS Lambda Power Tuning tool or AWS Compute Optimizer recommendations. Arm-based Graviton (arm64) functions often give better price performance.",
   "A cold start happens when Lambda must create a new execution environment: download your code, start the runtime and run your initialization code before the handler. It appears as `Init Duration` in the `REPORT` line and in X-Ray. Cold starts occur on the first request, after scaling up, after deploying new code, and after an environment has been idle and reclaimed. To reduce them: keep deployment packages small, import only what you need, initialize SDK clients once outside the handler but avoid heavy work that is not needed on every path, choose runtimes and frameworks with fast startup, and, for supported runtimes such as Java, consider Lambda SnapStart, which snapshots an initialized environment and resumes from it. Connecting a function to a VPC no longer adds significant cold start time in the way it once did.",
   "Provisioned concurrency pre-initializes a set number of execution environments so they are ready to respond immediately, eliminating cold starts for traffic up to that number. It is configured on a published version or alias (not `$LATEST`), costs money while provisioned whether used or not, and can be scaled with Application Auto Scaling on a schedule (for business hours) or with target tracking on utilization. Use it for latency-sensitive, synchronous workloads such as interactive APIs with strict response-time requirements. Requests above the provisioned amount are served by normal on-demand environments, with cold starts.",
   "Reserved concurrency is about capacity, not speed. It sets aside a number of concurrent executions from the account's Regional pool for one function, guaranteeing it can always scale to that level, and it also acts as a maximum. That cap is useful to protect a downstream resource, for example limiting a function to 50 concurrent executions so it cannot open more connections than a relational database allows, or to stop one runaway function from starving the others. Reserved concurrency has no extra charge. Invocations beyond the reserved amount are throttled.",
   "Keep the distinction straight: provisioned concurrency is for eliminating cold starts and costs extra; reserved concurrency guarantees and limits scaling at no cost. A function can have both, with provisioned concurrency not exceeding its reserved concurrency. For database connection pressure specifically, Amazon RDS Proxy pools and shares connections among many Lambda environments."
  ],
  "terms": [
   [
    "Cold start",
    "The added latency when Lambda creates and initializes a new execution environment before running the handler."
   ],
   [
    "Init Duration",
    "The REPORT log field showing how long initialization took for an invocation that had a cold start."
   ],
   [
    "Provisioned concurrency",
    "Pre-initialized execution environments on a version or alias that remove cold starts, billed while configured."
   ],
   [
    "Reserved concurrency",
    "A free setting that guarantees and caps a function's concurrent executions."
   ],
   [
    "Lambda SnapStart",
    "A feature for supported runtimes that resumes new environments from a snapshot of an initialized one to shorten cold starts."
   ]
  ],
  "example": "A banking API's p99 latency spikes every morning at 9:00 when traffic ramps up and new environments cold start. The team adds provisioned concurrency to the live alias with a scheduled Application Auto Scaling action that raises it before 9:00 and lowers it in the evening, and sets reserved concurrency on a reporting function so it cannot exhaust the database's connections.",
  "tip": "Latency from cold starts: provisioned concurrency (or SnapStart for supported runtimes). Protect a downstream system or guarantee capacity: reserved concurrency. Slow CPU-heavy function: increase memory.",
  "check": [
   [
    "Which setting removes cold starts, and what does it require?",
    "Provisioned concurrency, configured on a published version or alias, billed while provisioned."
   ],
   [
    "How can you stop a Lambda function from overwhelming an RDS database with connections?",
    "Set reserved concurrency to cap concurrent executions, and consider RDS Proxy to pool connections."
   ],
   [
    "Why might increasing memory reduce cost?",
    "More memory gives more CPU, so the function finishes faster; since cost is memory times duration, the total can stay the same or drop."
   ]
  ]
 },
 {
  "t": "Stream and queue troubleshooting: Kinesis IteratorAge, parallelization factor, SQS dead-letter queues and redrive",
  "body": [
   "When a stream or queue consumer falls behind or keeps failing, messages pile up and data arrives late. The exam describes these symptoms through specific metrics, and you need to know what each one means and which setting fixes it.",
   "For Kinesis Data Streams and DynamoDB Streams consumed by Lambda, the key metric is `IteratorAge`: the age of the last record in the batch when Lambda processed it, in other words how far behind real time the consumer is. (Kinesis itself reports `GetRecords.IteratorAgeMilliseconds`.) A steadily growing iterator age means records arrive faster than they are processed, or processing is blocked. Records that stay unprocessed beyond the stream's retention period are lost, so a rising iterator age is urgent.",
   "Common causes and fixes: the function is erroring on a batch, and because stream processing is ordered per shard, Lambda keeps retrying that batch and the shard stalls. Check the `Errors` metric and logs, then configure maximum retry attempts, maximum record age, bisect batch on function error, partial batch responses and an on-failure destination so a bad record cannot block the shard indefinitely. If the function is simply slow, optimize it or raise its memory. If there is not enough parallelism, raise the parallelization factor on the event source mapping (from 1 up to 10), which lets Lambda process up to that many batches from each shard concurrently while still keeping order for records with the same partition key. Larger batch sizes and batching windows reduce per-invocation overhead. Adding shards increases throughput for both producers and consumers. When several applications read the same stream and compete for the shared read throughput, enhanced fan-out gives each registered consumer its own dedicated read throughput per shard.",
   "On the producer side, `ProvisionedThroughputExceededException` or `WriteProvisionedThroughputExceeded` means a shard's write capacity was exceeded, often because a poorly chosen partition key sends most records to one hot shard. Use a higher-cardinality partition key, add shards (or use on-demand mode), and retry with backoff.",
   "For SQS, watch `ApproximateNumberOfMessagesVisible` (backlog) and `ApproximateAgeOfOldestMessage` (how long the oldest message has waited). Rising values mean consumers are too slow, failing or not running. For Lambda consumers, check the function's errors and throttles and its maximum concurrency setting on the event source mapping. Also make sure the queue's visibility timeout is comfortably longer than the function's timeout (AWS recommends at least six times the function timeout for Lambda event sources); otherwise messages reappear and are processed twice while the first attempt is still running.",
   "A dead-letter queue catches messages that fail repeatedly. The source queue's redrive policy names the DLQ and `maxReceiveCount`; when a message has been received more than that many times without being deleted, SQS moves it to the DLQ. The DLQ must be the same type as the source (a FIFO queue needs a FIFO DLQ) and in the same account and Region, and its retention period should be longer than the source's, because for standard queues the original enqueue timestamp is kept when a message moves. A redrive allow policy on the DLQ controls which source queues may use it. Once you have fixed the bug, DLQ redrive moves messages back to the source queue (or another queue) for reprocessing, from the console or with the `StartMessageMoveTask` API. Always alarm on DLQ depth, or failures go unnoticed."
  ],
  "terms": [
   [
    "IteratorAge",
    "The metric showing how old the records being processed from a stream are, indicating how far behind a consumer is."
   ],
   [
    "Parallelization factor",
    "An event source mapping setting (1 to 10) for concurrent batches per shard, preserving order per partition key."
   ],
   [
    "Enhanced fan-out",
    "A Kinesis feature that gives each registered consumer dedicated read throughput per shard."
   ],
   [
    "maxReceiveCount",
    "The number of times an SQS message can be received before the redrive policy moves it to the DLQ."
   ],
   [
    "DLQ redrive",
    "Moving messages from a dead-letter queue back to a source queue for reprocessing after a fix."
   ]
  ],
  "example": "A clickstream function's IteratorAge climbs from seconds to hours. Logs show no errors, but duration is high and the stream has only four shards. The team sets the parallelization factor to 5, so each shard is processed by up to five concurrent invocations, and the iterator age falls back to near zero.",
  "tip": "Rising IteratorAge: look for errors blocking a shard (fix with bisect, retry limits, partial batch responses) or too little parallelism (raise the parallelization factor or add shards). Messages processed twice from SQS: visibility timeout shorter than processing time.",
  "check": [
   [
    "What does a steadily increasing IteratorAge indicate?",
    "The consumer is falling behind the stream, because it is too slow or blocked by failing batches, risking data loss when records expire."
   ],
   [
    "How does raising the parallelization factor keep ordering?",
    "Records with the same partition key are still processed in order; only different keys within a shard are processed concurrently."
   ],
   [
    "After fixing a bug, how do you reprocess messages sitting in an SQS DLQ?",
    "Use DLQ redrive (console or StartMessageMoveTask) to move them back to the source queue."
   ]
  ]
 },
 {
  "t": "DynamoDB optimization: hot partitions, key design, on-demand vs provisioned capacity, adaptive capacity",
  "body": [
   "DynamoDB performance depends heavily on how your data spreads across partitions. A table's data and throughput are divided among partitions by the hash of the partition key, and each partition has its own throughput limit: up to 3,000 read capacity units and 1,000 write capacity units per second. So a table can have plenty of total capacity and still throttle if requests concentrate on a few keys.",
   "A hot partition (or hot key) is a partition receiving a disproportionate share of traffic. Symptoms: `ProvisionedThroughputExceededException` or `ThrottlingException`, rising `ThrottledRequests` and read or write throttle events in CloudWatch, even though consumed capacity for the whole table looks well below what is provisioned. CloudWatch Contributor Insights for DynamoDB can show the most accessed and most throttled keys, making hot keys easy to identify.",
   "Key design is the real fix. Choose a partition key with high cardinality (many distinct values) that is accessed fairly evenly, such as user ID, order ID or device ID. Poor choices include status values (`active` or `inactive`), dates for time-series writes (all of today's writes hit one key) or a single tenant that is much larger than others. For unavoidably hot write patterns, use write sharding: add a suffix to the key, either random (for example `2026-09-25#7` with a suffix from 0 to 9) or calculated from another attribute so you can find the item again, then query all suffixes and merge results when reading. For read-heavy hot items, put a cache such as DAX or ElastiCache in front of the table. Also avoid large items (store big blobs in S3 and keep a pointer), because read and write units scale with item size, and use `Query` instead of `Scan`.",
   "Capacity modes: On-demand mode charges per request and scales automatically to your traffic with no capacity planning, which suits new applications, unpredictable or spiky traffic, and workloads with idle periods. Provisioned mode has you set RCUs and WCUs, usually with auto scaling that adjusts capacity between minimum and maximum values to track a target utilization. It is cheaper for steady, predictable traffic, but auto scaling reacts over minutes, so sudden spikes can throttle before it catches up. Reserved capacity can lower provisioned costs further for long-term steady workloads. Global secondary indexes need enough capacity too: a GSI with too little write capacity throttles writes to the base table.",
   "DynamoDB also has built-in protections. Burst capacity lets a partition temporarily use unused capacity saved from the recent past to absorb short spikes. Adaptive capacity automatically and instantly gives more of the table's throughput to partitions receiving more traffic, so uneven access works as long as the total stays within the table's capacity and each partition stays within its per-partition limits. Adaptive capacity can also split a partition to isolate frequently accessed items. These features reduce throttling from moderate imbalance but cannot fix a single key that exceeds a partition's maximum throughput; that still requires better key design or caching.",
   "Client-side, the SDKs retry throttled requests automatically with exponential backoff, which smooths brief throttling but is not a substitute for good design."
  ],
  "terms": [
   [
    "Hot partition",
    "A partition receiving a disproportionate share of requests, causing throttling despite unused table capacity."
   ],
   [
    "Write sharding",
    "Adding a random or calculated suffix to partition keys to spread writes across more partitions."
   ],
   [
    "On-demand capacity",
    "A DynamoDB mode billed per request that scales automatically without capacity planning."
   ],
   [
    "Adaptive capacity",
    "DynamoDB's automatic reallocation of throughput to busier partitions and isolation of frequently accessed items."
   ],
   [
    "Burst capacity",
    "Unused capacity DynamoDB briefly retains to absorb short traffic spikes."
   ]
  ],
  "example": "An IoT table uses the date as its partition key, so every write for the day lands on one key and throttles at peak. The team changes the key to deviceId#date for per-device queries, and for a daily roll-up adds a GSI whose partition key is date plus a suffix from 0 to 9, querying all ten shards to build the report.",
  "tip": "Throttling while total consumed capacity is low means a hot partition: fix the partition key (higher cardinality, write sharding) or cache hot reads. Unpredictable or spiky traffic with no capacity planning points to on-demand mode.",
  "check": [
   [
    "Why can a table throttle even though its provisioned capacity is barely used?",
    "Throughput limits apply per partition, so traffic concentrated on one partition key can exceed that partition's limit."
   ],
   [
    "When is provisioned capacity with auto scaling a better choice than on-demand?",
    "For steady, predictable traffic, where it is usually cheaper."
   ],
   [
    "What does write sharding do?",
    "It adds a suffix to the partition key so writes that would hit one key are spread across several partitions."
   ]
  ]
 },
 {
  "t": "Caching for performance: API Gateway stage caching, CloudFront, ElastiCache, DAX",
  "body": [
   "Caching stores the result of expensive work so repeated requests are answered faster and backends do less. AWS offers caches at several layers, and exam questions give clues about where the repeated work is and what kind of data is involved.",
   "API Gateway caching is enabled per stage on REST APIs. API Gateway keeps responses from the integration for a time to live (TTL), 300 seconds by default and configurable up to 3,600 seconds (0 disables caching), and returns cached responses without calling Lambda or your backend. You choose a cache capacity (size) for the stage, and you can override caching settings per method, for example disabling it for POST methods. By default the cache key is the method and resource path; add query string parameters or headers as cache keys when responses depend on them, or users will receive each other's results. Clients can request a fresh response by sending `Cache-Control: max-age=0`, but only if they are authorized (the `execute-api:InvalidateCache` permission) or the stage allows unauthorized invalidation, which is risky. You can also flush the whole stage cache. The `CacheHitCount` and `CacheMissCount` metrics show effectiveness. Caching is charged per hour by cache size.",
   "Amazon CloudFront is a content delivery network (CDN) that caches content at edge locations close to users worldwide. It serves static assets from S3 (locked down with origin access control so the bucket stays private) and can also cache dynamic or API responses from any HTTP origin. Cache policies control TTLs and which headers, cookies and query strings are part of the cache key; including fewer values raises the hit ratio. To remove content before it expires, create an invalidation, or better, use versioned file names (such as `app.3f9c.js`) so new content gets a new URL. Use CloudFront when users are geographically spread and latency to the origin is the problem.",
   "Amazon ElastiCache (Redis OSS, Valkey or Memcached) is an in-memory cache your application code controls, typically in front of relational databases or slow services. You choose lazy loading, write-through and TTLs as covered earlier. It works for any data you can compute or query: session state, rendered page fragments, results of expensive SQL joins, leaderboards. It requires code changes and runs inside your VPC.",
   "DynamoDB Accelerator (DAX) is a managed, in-memory cache built specifically for DynamoDB. It is API-compatible, so you switch to the DAX client with minimal code change, and it reduces eventually consistent read latency from milliseconds to microseconds. DAX has an item cache (for `GetItem` and `BatchGetItem`) and a query cache (for `Query` and `Scan` results), and writes go through DAX to DynamoDB, updating the item cache. Strongly consistent reads pass straight through to DynamoDB and are not cached, so DAX does not help workloads that need them, or write-heavy workloads.",
   "Choosing: repeated identical API requests reaching your backend suggest API Gateway caching; global users and static or cacheable content suggest CloudFront; hot results from a relational database or custom computation suggest ElastiCache; read-heavy DynamoDB traffic, hot keys being read, or a need for microsecond reads with minimal code change suggest DAX. Every cache trades freshness for speed, so decide how stale data may be and set TTLs accordingly."
  ],
  "terms": [
   [
    "API Gateway stage cache",
    "A per-stage REST API cache that returns stored integration responses for a TTL of up to 3,600 seconds."
   ],
   [
    "Cache key",
    "The request attributes used to decide whether a cached response matches a new request."
   ],
   [
    "CloudFront invalidation",
    "A request that removes objects from CloudFront edge caches before their TTL expires."
   ],
   [
    "DynamoDB Accelerator (DAX)",
    "An API-compatible in-memory cache for DynamoDB offering microsecond eventually consistent reads."
   ]
  ],
  "example": "A product catalog API backed by Lambda and DynamoDB gets the same GET requests thousands of times a minute. The team enables API Gateway caching on the prod stage with a 600-second TTL and the category query string parameter as a cache key, cutting Lambda invocations sharply, and adds DAX for the remaining item lookups.",
  "tip": "DAX only accelerates eventually consistent reads; strongly consistent reads bypass it. API Gateway caching is per stage with a default TTL of 300 seconds and a maximum of 3,600; include parameters that change the response in the cache key.",
  "check": [
   [
    "What happens if a query string that changes the response is not part of the API Gateway cache key?",
    "Different requests may receive the same cached response, returning wrong data to users."
   ],
   [
    "Why would DAX not help an application that uses strongly consistent reads?",
    "Strongly consistent reads are passed through to DynamoDB and not served from the DAX cache."
   ],
   [
    "How can an authorized client bypass an API Gateway cache for one request?",
    "Send the Cache-Control: max-age=0 header, which requires the execute-api:InvalidateCache permission unless the stage allows unauthorized invalidation."
   ]
  ]
 }
]);
