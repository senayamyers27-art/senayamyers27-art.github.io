/* Hands-on exercises for AWS Certified Developer – Associate (DVA-C02). Checked by tools/check-data.js. */
CertHub.addHandson("aws-developer", {
  items: [
    {
      id: "dva-log-retention", kind: "aws", d: 4,
      title: "Create a Lambda log group with a retention period",
      prompt: "The function `orders-api` is about to go live. Lambda would create its log group on first run with logs kept forever.\n\nCreate the log group `/aws/lambda/orders-api` yourself and set its retention to 14 days. Confirm with `describe-log-groups`.",
      hint: "aws logs create-log-group --log-group-name /aws/lambda/orders-api, then aws logs put-retention-policy with --retention-in-days 14.",
      explain: "Lambda writes to the log group /aws/lambda/<function name>, and its execution role needs logs:CreateLogStream and logs:PutLogEvents (AWSLambdaBasicExecutionRole). Retention accepts only fixed values such as 1, 3, 5, 7, 14, 30 or 90 days. Setting it up front keeps storage costs predictable while leaving enough history for Logs Insights queries during troubleshooting.",
      setup: { lambda: { "orders-api": { runtime: "nodejs20.x", handler: "index.handler" } } },
      checks: [
        { label: "The log group /aws/lambda/orders-api exists", type: "logGroup", name: "/aws/lambda/orders-api" },
        { label: "It keeps logs for 14 days", type: "logGroup", name: "/aws/lambda/orders-api", retention: 14 }
      ],
      solution: ["aws logs create-log-group --log-group-name /aws/lambda/orders-api", "aws logs put-retention-policy --log-group-name /aws/lambda/orders-api --retention-in-days 14", "aws logs describe-log-groups --log-group-name-prefix /aws/lambda/orders-api"]
    },
    {
      id: "dva-lambda-config", kind: "aws", d: 1,
      title: "Tune a Lambda function's timeout, memory and settings",
      prompt: "The function `image-resizer` times out on large photos. It runs with the defaults: 3 seconds and 128 MB.\n\nSet its timeout to 30 seconds, its memory to 1024 MB, and add the environment variable `BUCKET_NAME=thumbs-111122223333` so the bucket name is not hardcoded. Check the result with `get-function-configuration`.",
      hint: "aws lambda update-function-configuration --function-name image-resizer --timeout 30 --memory-size 1024 --environment Variables={BUCKET_NAME=thumbs-111122223333}",
      explain: "Lambda allocates CPU in proportion to memory, so raising memory often makes image work faster and can even cost less overall. The timeout can be up to 900 seconds (15 minutes). Environment variables keep configuration out of code; secrets belong in Secrets Manager or Parameter Store instead. Note that --environment replaces the whole variable set, so include every variable you want to keep.",
      setup: { lambda: { "image-resizer": { runtime: "python3.12", handler: "app.handler", timeout: 3, memory: 128 } } },
      checks: [
        { label: "Timeout is 30 seconds and memory is 1024 MB", type: "lambda", name: "image-resizer", timeout: 30, memory: 1024 },
        { label: "BUCKET_NAME is set", type: "lambda", name: "image-resizer", env: { BUCKET_NAME: "thumbs-111122223333" } }
      ],
      solution: ["aws lambda update-function-configuration --function-name image-resizer --timeout 30 --memory-size 1024 --environment Variables={BUCKET_NAME=thumbs-111122223333}", "aws lambda get-function-configuration --function-name image-resizer"]
    },
    {
      id: "dva-exec-role", kind: "aws", d: 2,
      title: "Create a Lambda execution role",
      prompt: "A new function needs an execution role that lets it write logs and nothing else.\n\nCreate the role `orders-api-exec` with a trust policy for the principal `lambda.amazonaws.com`, then attach the AWS managed policy `service-role/AWSLambdaBasicExecutionRole`.",
      hint: "Pass the trust policy inline: --assume-role-policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}'. The policy ARN is arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole.",
      explain: "The execution role is what the function's code runs as: Lambda assumes it and hands the temporary credentials to the SDK through environment variables, so no keys live in the code. The trust policy must name lambda.amazonaws.com or the function cannot assume it. AWSLambdaBasicExecutionRole grants only CloudWatch Logs access; add narrowly scoped permissions for each other service the code calls.",
      setup: {},
      checks: [
        { label: "orders-api-exec trusts the Lambda service", type: "role", name: "orders-api-exec", trust: "lambda.amazonaws.com" },
        { label: "It has AWSLambdaBasicExecutionRole", type: "role", name: "orders-api-exec", policy: "AWSLambdaBasicExecutionRole" }
      ],
      solution: ["aws iam create-role --role-name orders-api-exec --assume-role-policy-document '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}'", "aws iam attach-role-policy --role-name orders-api-exec --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
    },
    {
      id: "dva-artifact-bucket", kind: "aws", d: 3,
      title: "Set up a versioned bucket for deployment artifacts",
      prompt: "Your pipeline packages the app as `app.zip` and needs somewhere to keep every build so you can roll back.\n\nCreate the bucket `deploy-artifacts-111122223333`, enable versioning on it, then upload `app.zip` to `releases/app.zip`.",
      hint: "aws s3 mb, then aws s3api put-bucket-versioning --versioning-configuration Status=Enabled, then aws s3 cp app.zip s3://deploy-artifacts-111122223333/releases/app.zip.",
      explain: "SAM and CloudFormation upload local code to an S3 artifact bucket before deploying (sam deploy and cloudformation package do this for you). With versioning on, each upload of the same key keeps the previous build, so a rollback can point at an earlier object version. CodePipeline also requires a versioned bucket when S3 is the source stage.",
      setup: { files: { "app.zip": "PK (zip archive of the build, 2.1 MB)\n" } },
      checks: [
        { label: "The bucket has versioning enabled", type: "bucket", name: "deploy-artifacts-111122223333", versioning: "Enabled" },
        { label: "releases/app.zip is uploaded", type: "object", bucket: "deploy-artifacts-111122223333", key: "releases/app.zip" }
      ],
      solution: ["aws s3 mb s3://deploy-artifacts-111122223333", "aws s3api put-bucket-versioning --bucket deploy-artifacts-111122223333 --versioning-configuration Status=Enabled", "aws s3 cp app.zip s3://deploy-artifacts-111122223333/releases/app.zip"]
    },
    {
      id: "dva-kms-key", kind: "aws", d: 2,
      title: "Create an application encryption key with an alias",
      prompt: "The orders service will encrypt data with envelope encryption and needs its own customer managed KMS key.\n\nCreate a KMS key with the description `orders app data`, give it the alias `alias/orders-app`, and enable automatic key rotation. Confirm with `list-aliases` and `get-key-rotation-status`.",
      hint: "create-key prints a KeyId. Use it with create-alias --target-key-id and with enable-key-rotation --key-id (rotation needs the key ID, not the alias).",
      explain: "KMS Encrypt handles at most 4 KB, so applications call GenerateDataKey and encrypt data locally with the returned data key (envelope encryption); the AWS Encryption SDK does this for you. Code should refer to the alias so the key can be replaced without a code change. Automatic rotation creates new key material yearly while old material stays available to decrypt existing data.",
      setup: {},
      checks: [
        { label: "alias/orders-app exists", type: "keyAlias", alias: "alias/orders-app" },
        { label: "Rotation is enabled on the key", type: "keyAlias", alias: "alias/orders-app", rotation: true }
      ],
      solution: ["aws kms create-key --description \"orders app data\"", "aws kms create-alias --alias-name alias/orders-app --target-key-id 0f1e2d3c-4b5a-4c6d-8e7f-000000000001", "aws kms enable-key-rotation --key-id 0f1e2d3c-4b5a-4c6d-8e7f-000000000001", "aws kms get-key-rotation-status --key-id 0f1e2d3c-4b5a-4c6d-8e7f-000000000001"]
    },
    {
      id: "dva-xray-alarm", kind: "aws", d: 4,
      title: "Trace and alarm on a failing function",
      prompt: "Users report intermittent failures in the `checkout` function and nobody knows which downstream call is slow or failing.\n\n1. Turn on active X-Ray tracing for `checkout`.\n2. Create a CloudWatch alarm named `checkout-errors` on the `Errors` metric in the `AWS/Lambda` namespace for that function (`Name=FunctionName,Value=checkout`), statistic `Sum`, period `60`, `GreaterThanThreshold` `0`, `1` evaluation period.",
      hint: "aws lambda update-function-configuration --function-name checkout --tracing-config Mode=Active, then aws cloudwatch put-metric-alarm with --dimensions Name=FunctionName,Value=checkout.",
      explain: "Active tracing makes Lambda sample requests and send segments to X-Ray, where the service map and traces show which downstream call is slow or failing; the execution role needs xray:PutTraceSegments (AWSXRayDaemonWriteAccess). The Errors metric counts invocations that ended in a function error, and an alarm on its Sum, usually sent to SNS, tells you about failures before users do.",
      setup: { lambda: { checkout: { runtime: "nodejs20.x", handler: "index.handler", timeout: 10, memory: 512 } } },
      checks: [
        { label: "Active tracing is on for checkout", type: "lambda", name: "checkout", tracing: "Active" },
        { label: "checkout-errors watches the function's Errors metric", type: "alarm", name: "checkout-errors", metric: "Errors", namespace: "AWS/Lambda", dimension: "checkout" }
      ],
      solution: ["aws lambda update-function-configuration --function-name checkout --tracing-config Mode=Active", "aws cloudwatch put-metric-alarm --alarm-name checkout-errors --metric-name Errors --namespace AWS/Lambda --statistic Sum --period 60 --threshold 0 --comparison-operator GreaterThanThreshold --evaluation-periods 1 --dimensions Name=FunctionName,Value=checkout"]
    }
  ]
});
