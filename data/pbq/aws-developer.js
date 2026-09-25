/* Performance-based simulations for AWS Certified Developer – Associate (DVA-C02). */
CertHub.addPbqs("aws-developer", [
  { id: "dynamodb-capacity-fill", d: 1, type: "fill", title: "Calculate DynamoDB read and write capacity",
    prompt: "A provisioned-mode DynamoDB table stores order items. Using the workload below, fill in the capacity units the table needs (whole numbers only).",
    context: "Workload profile (steady state)\n----------------------------------------------\nReads : 100 GetItem calls/second, item size 6 KB\nWrites: 50 PutItem calls/second, item size 2.5 KB\n\nCapacity rules\n1 RCU = 1 strongly consistent read/s of up to 4 KB\n        (or 2 eventually consistent reads/s)\n1 WCU = 1 standard write/s of up to 1 KB\nTransactional reads and writes cost 2x",
    fields: [
      { label: "RCU for the reads if they are strongly consistent", answers: ["200"] },
      { label: "RCU for the reads if they are eventually consistent", answers: ["100"] },
      { label: "WCU for the writes as standard PutItem calls", answers: ["150"] },
      { label: "WCU for the writes if done with TransactWriteItems", answers: ["300"] }
    ],
    explain: "Item sizes are always rounded up: a 6 KB read needs ceil(6/4) = 2 RCU when strongly consistent, so 100 reads/s is 200 RCU, and eventually consistent reads cost half, giving 100 RCU. A 2.5 KB write rounds up to 3 KB, so 3 WCU each and 150 WCU for 50 writes/s. Transactions double the cost, so the same writes through TransactWriteItems need 300 WCU." },

  { id: "sqs-settings-match", d: 1, type: "match", title: "Match SQS settings to requirements",
    prompt: "A developer is configuring the queues for an order-processing service. Match each requirement to the SQS attribute or message parameter that satisfies it.",
    pairs: [
      ["Hide a received message from other consumers while the worker processes it", "VisibilityTimeout"],
      ["Cut empty responses and cost by letting ReceiveMessage wait up to 20 seconds", "ReceiveMessageWaitTimeSeconds"],
      ["In a FIFO queue, keep each customer's orders in sequence while different customers are processed in parallel", "MessageGroupId"],
      ["In a FIFO queue, discard a second send of the same order made within 5 minutes", "MessageDeduplicationId"],
      ["Move a message to the dead-letter queue after it has failed 5 times", "maxReceiveCount (RedrivePolicy)"],
      ["Postpone delivery of every new message on the queue by 60 seconds", "DelaySeconds"],
      ["Keep unprocessed messages for up to 14 days", "MessageRetentionPeriod"]
    ],
    extra: ["MaximumBatchingWindowInSeconds", "KmsDataKeyReusePeriodSeconds"],
    explain: "The visibility timeout hides an in-flight message; if it is not deleted before it expires, it becomes visible again. Long polling is set with ReceiveMessageWaitTimeSeconds (1-20 s). In FIFO queues the message group ID defines ordering scope and the deduplication ID suppresses duplicates within the 5-minute window. maxReceiveCount in the redrive policy sends poison messages to a DLQ, DelaySeconds makes a delay queue (up to 15 minutes), and retention ranges from 1 minute to 14 days (default 4 days)." },

  { id: "lambda-code-review-select", d: 1, type: "select", title: "Review a Lambda handler for bad practices",
    prompt: "The Orders table has partition key customerId. Review this Python Lambda function behind an API Gateway proxy integration and select every statement that describes something the developer SHOULD change.",
    context: " 1  import boto3, os, json\n 2  from boto3.dynamodb.conditions import Attr\n 3  AWS_SECRET = \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\"\n 4\n 5  def handler(event, context):\n 6      ddb = boto3.resource(\"dynamodb\",\n 7              aws_access_key_id=\"AKIAIOSFODNN7EXAMPLE\",\n 8              aws_secret_access_key=AWS_SECRET)\n 9      table = ddb.Table(os.environ[\"TABLE_NAME\"])\n10      cust = event[\"pathParameters\"][\"customerId\"]\n11      print(json.dumps(event))   # event includes the Authorization header\n12      resp = table.scan(FilterExpression=Attr(\"customerId\").eq(cust))\n13      return {\"statusCode\": 200,\n14              \"body\": json.dumps(resp[\"Items\"], default=str)}",
    options: [
      "Lines 3 and 7-8: access keys are hardcoded in the code",
      "Lines 6-9: the SDK resource and table are created inside the handler on every invocation",
      "Line 9: the table name is read from an environment variable",
      "Line 10: the customer ID is read from event[\"pathParameters\"]",
      "Line 11: the whole event, including the Authorization header, is written to CloudWatch Logs",
      "Line 12: a Scan with a filter on the partition key is used to find one customer's orders",
      "Lines 13-14: the function returns an object with statusCode and a string body"
    ],
    answers: [0, 1, 4, 5],
    explain: "Hardcoded keys should be removed so the SDK uses the execution role through the default credential chain. SDK clients belong outside the handler so warm invocations reuse them and their connections. Logging the raw event leaks bearer tokens into logs, and a Scan reads (and bills for) the whole table even with a filter, whereas a Query on the partition key reads only that customer's items. Environment variables for configuration, reading pathParameters and returning statusCode plus a string body are all correct for a proxy integration." },

  { id: "s3-policy-eval-select", d: 2, type: "select", title: "Evaluate IAM and bucket policies",
    prompt: "A Lambda function's execution role (same account as the bucket) has the identity policy and the bucket has the bucket policy shown. Select every request that SUCCEEDS.",
    context: "Identity policy (role app-role)\n{\n  \"Effect\": \"Allow\",\n  \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n  \"Resource\": \"arn:aws:s3:::reports-example/*\"\n},\n{\n  \"Effect\": \"Allow\",\n  \"Action\": [\"kms:GenerateDataKey\", \"kms:Decrypt\"],\n  \"Resource\": \"<ARN of the bucket's KMS key>\"\n}\n\nBucket policy (reports-example)\n{\n  \"Effect\": \"Deny\", \"Principal\": \"*\", \"Action\": \"s3:*\",\n  \"Resource\": \"arn:aws:s3:::reports-example/*\",\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n},\n{\n  \"Effect\": \"Deny\", \"Principal\": \"*\", \"Action\": \"s3:PutObject\",\n  \"Resource\": \"arn:aws:s3:::reports-example/*\",\n  \"Condition\": { \"StringNotEquals\": { \"s3:x-amz-server-side-encryption\": \"aws:kms\" } }\n}",
    options: [
      "GetObject reports-example/q1.csv over HTTPS",
      "GetObject reports-example/q1.csv over plain HTTP",
      "PutObject reports-example/q2.csv over HTTPS with header x-amz-server-side-encryption: aws:kms",
      "PutObject reports-example/q2.csv over HTTPS with no encryption header",
      "PutObject reports-example/q2.csv over HTTPS with header x-amz-server-side-encryption: AES256",
      "DeleteObject reports-example/q1.csv over HTTPS",
      "GetObject reports-archive-example/q1.csv over HTTPS"
    ],
    answers: [0, 2],
    explain: "Within one account an Allow in either the identity policy or the bucket policy is enough, but any explicit Deny wins. Plain HTTP matches the SecureTransport deny, and the StringNotEquals deny catches PutObject requests whose header is missing or not aws:kms (a missing key makes a negated string condition true). DeleteObject and the other bucket are never allowed anywhere, so they fail with an implicit deny. Only the HTTPS GetObject and the HTTPS PutObject with SSE-KMS succeed." },

  { id: "api-auth-match", d: 2, type: "match", title: "Choose the right authorization mechanism",
    prompt: "Match each requirement for a serverless application to the AWS authorization mechanism that fits it best.",
    pairs: [
      ["Mobile app users (signed in or guest) need temporary AWS credentials to call S3 and DynamoDB directly from the device", "Cognito identity pool"],
      ["Users signed in to a single-page app call a REST API, and their JWTs must be validated with no custom code", "Cognito user pool authorizer"],
      ["A REST API must check a custom header token against an in-house session database before allowing a call", "Lambda authorizer"],
      ["A backend service on EC2 with an instance role calls the API using SigV4-signed requests", "IAM authorization"],
      ["Each partner client must be metered and throttled with its own request quota", "API keys with usage plans"],
      ["A private REST API must accept calls only through one specific interface VPC endpoint", "API Gateway resource policy"]
    ],
    extra: ["Secrets Manager rotation", "Lambda function URL with AuthType NONE"],
    explain: "Identity pools exchange a login (or guest identity) for temporary AWS credentials, while user pools authenticate users and issue JWTs that a Cognito authorizer validates. Lambda authorizers run your own code for custom tokens or headers, and IAM authorization verifies SigV4 signatures from callers that hold AWS credentials. API keys are not a security control by themselves; they identify clients for usage-plan throttling and quotas. Resource policies restrict a private API to particular VPC endpoints, accounts or IP ranges." },

  { id: "kms-envelope-order", d: 2, type: "order", title: "Apply envelope encryption with KMS",
    prompt: "An application must encrypt 50 MB files with a KMS customer managed key. Put the envelope-encryption and decryption steps in the correct order.",
    steps: [
      "Call kms:GenerateDataKey for the customer managed key and receive a plaintext and an encrypted copy of a data key",
      "Encrypt the file locally (for example AES-256-GCM) with the plaintext data key",
      "Store the encrypted data key with the ciphertext and erase the plaintext data key from memory",
      "When the file is needed, send the stored encrypted data key to kms:Decrypt",
      "Decrypt the file locally with the plaintext data key that KMS returned"
    ],
    explain: "KMS Encrypt accepts at most 4 KB of data, so large payloads use envelope encryption: KMS generates a data key, the application encrypts the data locally and keeps only the encrypted copy of that key next to the ciphertext. To read the file, KMS decrypts the small data key (checking the key policy and IAM permissions) and the application decrypts the data locally. The KMS key itself never leaves KMS." },

  { id: "codedeploy-ec2-hooks-order", d: 3, type: "order", title: "Order CodeDeploy EC2 lifecycle events",
    prompt: "An appspec.yml for an in-place CodeDeploy deployment to EC2 defines scripts for several hooks. Put the lifecycle events in the order the CodeDeploy agent runs them on each instance.",
    steps: ["ApplicationStop", "DownloadBundle", "BeforeInstall", "Install", "AfterInstall", "ApplicationStart", "ValidateService"],
    explain: "The agent first stops the running application (ApplicationStop uses the scripts from the previous revision), then downloads the new revision. BeforeInstall suits backups or decryption, Install copies files as listed in the files section, and AfterInstall handles configuration and permissions. ApplicationStart starts the service and ValidateService runs health checks; DownloadBundle and Install are run by the agent and cannot have scripts attached." },

  { id: "beanstalk-policies-match", d: 3, type: "match", title: "Match Elastic Beanstalk deployment policies",
    prompt: "Match each description to the Elastic Beanstalk deployment policy or technique it describes.",
    pairs: [
      ["Fastest option; the application is briefly unavailable while every instance is updated at once", "All at once"],
      ["Updates existing instances in batches, so serving capacity drops during the deployment", "Rolling"],
      ["Launches one extra batch first so full capacity is kept while existing instances are updated in batches", "Rolling with additional batch"],
      ["Launches a full set of new instances in a temporary Auto Scaling group; rollback just terminates them", "Immutable"],
      ["Sends a set percentage of client traffic to new instances for an evaluation period before switching over", "Traffic splitting"],
      ["Deploys to a separate cloned environment, then swaps the environment CNAMEs", "Blue/green (swap environment URLs)"]
    ],
    extra: ["Canary10Percent5Minutes", "Linear10PercentEvery1Minute"],
    explain: "All at once is quickest but causes downtime, rolling avoids downtime at reduced capacity, and rolling with additional batch keeps full capacity by adding instances first. Immutable and traffic splitting both build fresh instances, which makes failed deployments cheap to roll back; traffic splitting adds a canary-style test period. Blue/green is not a built-in policy: you create a second environment and use Swap Environment URLs. The extra options are CodeDeploy traffic-shifting configurations for Lambda, not Beanstalk policies." },

  { id: "lambda-timeout-logs-select", d: 4, type: "select", title: "Find timeouts in Lambda logs",
    prompt: "Users report intermittent API Gateway 504 errors. The function's timeout is set to 6 seconds. Select every CloudWatch Logs entry that shows an invocation ending because it ran out of time.",
    context: "/aws/lambda/order-api  (log group excerpt)",
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
    explain: "A timeout shows as a 'Task timed out after N seconds' line and a REPORT line whose duration equals the configured timeout with Status: timeout. The Init Duration line is just a cold start, AccessDeniedException points to a missing execution-role permission, Runtime.OutOfMemory means memory was exhausted, and ProvisionedThroughputExceededException is DynamoDB throttling. Note that API Gateway also returns 504 when its own integration timeout (29 seconds by default) is reached before the function finishes." },

  { id: "lambda-concurrency-fill", d: 4, type: "fill", title: "Size Lambda concurrency",
    prompt: "A function behind API Gateway receives a steady 200 requests per second. Using concurrency = requests per second x average duration in seconds, fill in the values.",
    context: "Account concurrency limit (Region): 1000\nAverage duration today            : 0.5 s\nAverage duration after a slow dependency: 2 s\nReserved concurrency proposed for the function: 250",
    fields: [
      { label: "Concurrent executions needed at 0.5 s duration", answers: ["100"] },
      { label: "Concurrent executions needed at 2 s duration", answers: ["400"] },
      { label: "Max requests per second served without throttling at 2 s with reserved concurrency 250", answers: ["125"] },
      { label: "HTTP status code a synchronous caller gets when the function is throttled", answers: ["429"] }
    ],
    explain: "Concurrency is the arrival rate times duration: 200 x 0.5 = 100, and 200 x 2 = 400 when the dependency slows down. Reserved concurrency is both a guarantee and a cap, so 250 concurrent executions at 2 s each can handle only 250 / 2 = 125 requests per second. Beyond that Lambda throttles synchronous calls with 429 TooManyRequestsException; fix the latency, raise the reservation or add caching." }
]);
