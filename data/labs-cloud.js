/* Cloud computing labs: AWS account safety, IAM least privilege, S3 static sites, EC2, VPC design,
   CloudWatch monitoring, Azure governance, Azure Storage and VMs, infrastructure as code, and
   shared responsibility and cost estimation. Every lab uses free tiers or no account, with cost
   warnings and cleanup. Format: LABS_FORMAT.md. */
CertHub.registerLabs([
  {
    id: "lab-cloud-aws-account-safety",
    title: "Secure a new AWS account before you build anything: root MFA, zero-spend budget and an Identity Center admin",
    track: "Cloud computing",
    level: "Beginner",
    minutes: 90,
    cost: "Free. Nothing in this lab is billable: MFA, AWS Budgets (two budgets without actions), IAM Identity Center, AWS Organizations and CloudTrail event history cost nothing. Doing this first is what keeps every later lab from surprising you with a bill.",
    summary: "Do the first hour of work every cloud engineer does on a new AWS account: protect the root user with MFA, confirm it has no access keys, turn on billing alerts, create a zero-spend budget and a small monthly budget, create a day-to-day admin identity in IAM Identity Center, sign in to the AWS CLI with short-lived credentials, and audit the result.",
    realWorld: "Most cloud horror stories start with an unprotected root user, long-lived access keys pushed to a public repository, or a forgotten resource nobody was alerted about. Cloud administrators and security teams run this exact checklist on every new account, and the AWS Cloud Practitioner and Solutions Architect exams test the reasoning behind each item: least use of root, MFA, federated short-lived access and cost guardrails.",
    youWillNeed: [
      "An AWS account you own (new or existing); sign-up needs an email address, phone and payment card",
      "An authenticator app (for example Microsoft Authenticator or Google Authenticator), a passkey or a FIDO2 security key",
      "An Ubuntu 24.04 VM or machine for the AWS CLI (lab-home-lab works)"
    ],
    requires: [],
    safety: "COST WARNING: this lab creates nothing billable, but it is the guardrail for every other cloud lab, so do not skip it. Never create access keys for the root user, never paste credentials into chat, screenshots or a Git repository, and keep your MFA recovery options somewhere safe. Accounts created after 15 July 2025 start on the AWS Free plan (credits, time-limited) and older accounts use the legacy 12-month Free Tier: check which one you have on the Billing console's Free Tier page.",
    steps: [
      {
        title: "Sign in as root once and record the basics",
        body: "Sign in at the AWS console with the root email address. Open the account menu (top right) and note the 12-digit account ID. On the Account page, add alternate contacts for Billing, Operations and Security (you can use your own email) so AWS can reach the right person about a security issue or a bill. Open Billing and Cost Management > Free Tier to see whether you are on the Free plan with credits or the legacy Free Tier.",
        check: "You have the account ID written down, three alternate contacts saved, and you know which free offer your account has and when it ends."
      },
      {
        title: "Turn on MFA for the root user",
        body: "Open IAM > Security credentials (as root) > Multi-factor authentication > Assign MFA device. Prefer a passkey or security key; an authenticator app is fine. AWS lets you register more than one MFA device for root, so add a second one (for example a phone and a hardware key) to avoid lockout. Root can close the account and change billing, so it must be the most protected identity you have.",
        check: "The IAM dashboard no longer shows the 'Add MFA for root user' warning and Security credentials lists at least one MFA device."
      },
      {
        title: "Confirm root has no access keys",
        body: "On the same Security credentials page, look at Access keys. There should be none. If an old key exists, deactivate it, check nothing uses it, then delete it. Root access keys give unrestricted programmatic control of the account and can never be limited by IAM policies, which is why AWS recommends never having one.",
        check: "The Access keys section says there are no access keys for the root user."
      },
      {
        title: "Enable billing visibility and alerts",
        body: "On the Account page, find 'IAM user and role access to Billing information' and activate it, otherwise even an admin you create later cannot see costs. Then open Billing and Cost Management > Billing preferences and turn on 'Receive AWS Free Tier alerts' (with your email) and 'Receive CloudWatch billing alerts'. The second one is needed for the billing alarm in lab-cloud-cloudwatch.",
        check: "Billing preferences show Free Tier alerts and CloudWatch billing alerts as enabled."
      },
      {
        title: "Create a zero-spend budget",
        body: "Open Billing and Cost Management > Budgets > Create budget > Use a template > Zero spend budget. Name it zero-spend and enter your email. It emails you as soon as the account spends even one cent above zero, which is exactly what you want while you are learning on free offers.",
        check: "The Budgets list shows zero-spend with an email recipient."
      },
      {
        title: "Create a small monthly cost budget with a forecast alert",
        body: "Create a second budget from the Monthly cost budget template with an amount of 5 USD. Edit its alerts so you get an email at 80 percent of actual spend and at 100 percent of forecasted spend. A forecast alert warns you before the money is spent, based on how fast charges are accumulating; the zero-spend budget tells you the moment anything is charged at all.",
        check: "Two budgets exist: zero-spend and a 5 USD monthly budget with actual and forecasted thresholds."
      },
      {
        title: "Enable IAM Identity Center and create your admin user",
        body: "Open IAM Identity Center in your main region and choose Enable (this also creates an AWS Organization with your account as the management account; both are free). Under Users, add a user for yourself with a different email alias if you like, and add them to a new group named Admins. Under Permission sets, create a predefined permission set from AdministratorAccess with a session duration of 4 hours. Under AWS accounts, select your account and assign the Admins group with that permission set. You now have a human identity with short-lived credentials instead of a long-term IAM user password and keys.",
        check: "AWS accounts shows your account with the Admins group assigned the AdministratorAccess permission set."
      },
      {
        title: "Require MFA for Identity Center and sign in through the access portal",
        body: "In IAM Identity Center > Settings > Authentication > Multi-factor authentication, set users to be prompted for MFA every time they sign in and require them to register a device at sign-in. Accept the invitation email, set a password, register MFA, and bookmark the AWS access portal URL (shown on the Identity Center dashboard). From now on you sign in there, not as root.",
        check: "Signing in to the access portal asks for MFA and shows your account with the AdministratorAccess role; choosing it opens the console as that role."
      },
      {
        title: "Install the AWS CLI v2 and sign in with SSO",
        body: "Install the official CLI v2 and configure an SSO profile named admin. The CLI opens a browser for you to approve the sign-in and then caches temporary credentials that expire, so there are no access keys on disk. Use the start URL from the access portal and your Identity Center region.",
        cmd: "sudo apt update && sudo apt install -y unzip curl\ncurl -sS \"https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip\" -o awscliv2.zip\nunzip -q awscliv2.zip && sudo ./aws/install\naws --version\naws configure sso --profile admin\n# SSO session name: lab | Start URL: your access portal URL | Region: your Identity Center region\n# Pick your account and the AdministratorAccess role; default output: json\naws sso login --profile admin\naws sts get-caller-identity --profile admin\nls ~/.aws/   # config and sso/cache only: no credentials file with keys",
        check: "get-caller-identity returns an Arn containing assumed-role/AWSReservedSSO_AdministratorAccess_..., not root and not an IAM user."
      },
      {
        title: "Audit root and credentials from the CLI",
        body: "Confirm your work with read-only API calls. The account summary exposes whether root has MFA (1) and access keys (0). The credential report lists every IAM user, when their password and keys were last used, and whether they have MFA; a new account should only show the root line.",
        cmd: "export AWS_PROFILE=admin\naws iam get-account-summary --query 'SummaryMap.{RootMFA:AccountMFAEnabled,RootAccessKeys:AccountAccessKeysPresent,Users:Users}'\naws iam generate-credential-report\nsleep 5\naws iam get-credential-report --query Content --output text | base64 -d | cut -d, -f1,4,8,9,14 | column -t -s,",
        check: "RootMFA is 1, RootAccessKeys is 0, and the credential report's <root_account> line shows mfa_active true and access_key_1_active false."
      },
      {
        title: "Check your budgets and recent sign-ins",
        body: "List the budgets from the CLI to prove they exist, then use CloudTrail event history (free, 90 days, no trail needed) to see console sign-ins. Seeing your own root sign-in from step 1 is the kind of evidence an auditor asks for, and you should see no other root sign-ins after today.",
        cmd: "ACCT=$(aws sts get-caller-identity --query Account --output text)\naws budgets describe-budgets --account-id $ACCT --query 'Budgets[].{Name:BudgetName,Limit:BudgetLimit.Amount,Type:BudgetType}' --output table\naws cloudtrail lookup-events --region us-east-1 --lookup-attributes AttributeKey=EventName,AttributeValue=ConsoleLogin --max-results 5 --query 'Events[].{Time:EventTime,User:Username}' --output table",
        check: "Both budgets are listed and the ConsoleLogin events include your root sign-in from step 1 (root sign-ins are logged in us-east-1; sign-ins through the access portal may appear in your Identity Center region instead, so repeat the lookup there with --region)."
      },
      {
        title: "Write a break-glass note and stop using root",
        body: "Sign out of root. Write a short private note: where the root email inbox is, where each root MFA device is kept, how to recover it, and the only tasks that need root (for example changing account settings or closing the account). Keep it offline or in a password manager, not in a repository. From here on, every lab uses the admin profile.",
        check: "You can sign in through the access portal and do everything the next labs need without the root password."
      }
    ],
    verify: [
      "aws iam get-account-summary shows AccountMFAEnabled 1 and AccountAccessKeysPresent 0.",
      "Two budgets exist (zero-spend and 5 USD monthly) with your email as the recipient.",
      "aws sts get-caller-identity --profile admin returns an AWSReservedSSO_AdministratorAccess role session, and ~/.aws has no long-term access keys.",
      "Free Tier alerts and CloudWatch billing alerts are enabled in Billing preferences."
    ],
    deliverable: "A one-page 'new AWS account baseline' checklist with a screenshot of each control (MFA on root with the device name blurred, empty access keys, both budgets, the Identity Center assignment, the get-caller-identity output with the account ID partly masked) and one sentence on why each control matters.",
    resume: "Baselined a new AWS account with root MFA, no root access keys, zero-spend and forecast budgets, and IAM Identity Center admin access with MFA and short-lived CLI credentials.",
    interview: [
      "Why shouldn't you use the root user day to day? Root cannot be restricted by IAM policies and can close the account, so you protect it with MFA, keep no access keys and use a federated admin role with short-lived credentials instead.",
      "How do you avoid a surprise cloud bill while learning? Set a zero-spend budget and a forecast-based budget alert before building anything, tag resources, and delete everything at the end of each session.",
      "What does IAM Identity Center give you over IAM users? Central users and groups, MFA, permission sets mapped to roles in each account, and temporary credentials for the console and CLI instead of long-lived passwords and access keys."
    ],
    cleanup: [
      "Nothing billable was created. Keep the budgets, MFA and Identity Center admin: every other cloud lab depends on them.",
      "Run aws sso logout when you finish a session so cached credentials are removed.",
      "If you ever stop using AWS entirely, delete all resources first, then close the account from the Account page while signed in as root."
    ],
    links: [
      { label: "AWS: Enable MFA for the root user", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/enable-mfa-for-root.html" },
      { label: "AWS: Managing your costs with AWS Budgets", url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html" },
      { label: "AWS: IAM Identity Center getting started", url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html" },
      { label: "AWS CLI: Configure IAM Identity Center authentication", url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html" },
      { label: "AWS Free Tier", url: "https://aws.amazon.com/free/" }
    ]
  },
  {
    id: "lab-cloud-iam-least-privilege",
    title: "Write, test and tighten least-privilege IAM policies for an application role",
    track: "Cloud computing",
    level: "Intermediate",
    minutes: 120,
    cost: "Free. IAM, STS, the IAM policy simulator, IAM Access Analyzer policy validation and an empty S3 bucket with a few small text files cost nothing (S3 storage of a few KB is within any free offer). Delete the bucket at the end anyway.",
    summary: "A reporting job needs to read and write files under one prefix of one S3 bucket and nothing else. Write that policy, catch mistakes with IAM Access Analyzer policy validation, prove it with the policy simulator, put it on a role and test it with real temporary credentials, then add a permissions boundary and an explicit deny to see how AWS evaluates policies, and use last-accessed data to trim unused permissions.",
    realWorld: "Cloud engineers write IAM policies every week, and over-broad policies like s3:* on * are the most common finding in cloud security reviews. Being able to scope a policy to actions, resources and conditions, test it before deploying and explain why an action was denied (explicit deny, no allow, boundary, or resource policy) is expected of anyone who runs AWS workloads and is heavily tested on the AWS Solutions Architect exam.",
    youWillNeed: [
      "Your AWS account baselined in lab-cloud-aws-account-safety, with the admin SSO profile working",
      "AWS CLI v2 and jq on Ubuntu (sudo apt install -y jq)",
      "A text editor"
    ],
    requires: ["lab-cloud-aws-account-safety"],
    safety: "Work only in your own account. The role you create trusts only your own account. Never attach AdministratorAccess to an application role, never create access keys for this test, and delete the role, policies and bucket at the end so nothing over-permissive is left behind.",
    steps: [
      {
        title: "Set up a working folder and a test bucket",
        body: "Bucket names are global, so add your account ID. Create a few objects under reports/ and one under finance/ so you can prove the policy allows one prefix and not the other.",
        cmd: "export AWS_PROFILE=admin AWS_REGION=us-east-1\nACCT=$(aws sts get-caller-identity --query Account --output text)\nB=lab-iam-$ACCT\nmkdir -p ~/iam-lab && cd ~/iam-lab\necho \"export AWS_PROFILE=admin AWS_REGION=us-east-1 ACCT=$ACCT B=$B\" > lab.env\naws s3api create-bucket --bucket $B\necho 'q3 revenue report' > q3.txt; echo 'salaries' > pay.txt\naws s3 cp q3.txt s3://$B/reports/q3.txt\naws s3 cp pay.txt s3://$B/finance/pay.txt\naws s3 ls s3://$B --recursive",
        check: "The listing shows reports/q3.txt and finance/pay.txt."
      },
      {
        title: "Validate a sloppy first draft with IAM Access Analyzer",
        body: "Write the kind of policy people write in a hurry: a misspelled action and a wildcard over every resource. Policy validation (free) checks grammar and best practices and returns ERROR, SECURITY_WARNING, WARNING and SUGGESTION findings. Read each finding and its learnMoreLink before moving on.",
        cmd: "cat > draft.json <<'EOF'\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    { \"Effect\": \"Allow\", \"Action\": [\"s3:GetObjects\", \"s3:PutObject\", \"s3:*\"], \"Resource\": \"*\" }\n  ]\n}\nEOF\naws accessanalyzer validate-policy --policy-type IDENTITY_POLICY --policy-document file://draft.json --query 'findings[].{Type:findingType,Issue:issueCode,Detail:findingDetails}' --output table",
        check: "The output flags the unknown action s3:GetObjects and at least one other finding; the draft clearly is not least privilege because s3:* on * allows deleting any bucket in the account."
      },
      {
        title: "Write the least-privilege policy",
        body: "Split it into statements by resource type. ListBucket applies to the bucket ARN and is limited to the reports/ prefix with a condition; GetObject and PutObject apply to object ARNs under reports/. There is no Delete permission because the job never deletes files. Validate again.",
        cmd: "source ~/iam-lab/lab.env; cd ~/iam-lab\ncat > reports-policy.json <<EOF\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    { \"Sid\": \"ListReportsPrefixOnly\", \"Effect\": \"Allow\", \"Action\": \"s3:ListBucket\",\n      \"Resource\": \"arn:aws:s3:::$B\",\n      \"Condition\": { \"StringLike\": { \"s3:prefix\": [\"reports/\", \"reports/*\"] } } },\n    { \"Sid\": \"ReadWriteReports\", \"Effect\": \"Allow\", \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n      \"Resource\": \"arn:aws:s3:::$B/reports/*\" }\n  ]\n}\nEOF\naws accessanalyzer validate-policy --policy-type IDENTITY_POLICY --policy-document file://reports-policy.json --query 'findings' ",
        check: "validate-policy returns an empty list [] (or only suggestions you can explain)."
      },
      {
        title: "Prove it with the policy simulator before deploying",
        body: "simulate-custom-policy evaluates a policy against actions and resources without creating anything. Test what should be allowed and what should be denied; a good test plan always includes the negative cases.",
        cmd: "source ~/iam-lab/lab.env; cd ~/iam-lab\nfor A in s3:GetObject s3:PutObject s3:DeleteObject; do\n  for R in arn:aws:s3:::$B/reports/q3.txt arn:aws:s3:::$B/finance/pay.txt; do\n    aws iam simulate-custom-policy --policy-input-list file://reports-policy.json --action-names $A --resource-arns $R --query 'EvaluationResults[0].[EvalActionName,EvalResourceName,EvalDecision]' --output text\n  done\ndone",
        check: "Only GetObject and PutObject on reports/q3.txt are 'allowed'; everything else is 'implicitDeny'."
      },
      {
        title: "Create the managed policy and an application role",
        body: "Roles have a trust policy (who may assume the role) and permission policies (what the role can do). Here the trust policy lets principals in your own account assume it, which lets you test it with your admin session. In production the principal would be a service such as ec2.amazonaws.com or lambda.amazonaws.com.",
        cmd: "source ~/iam-lab/lab.env; cd ~/iam-lab\ncat > trust.json <<EOF\n{ \"Version\": \"2012-10-17\", \"Statement\": [ { \"Effect\": \"Allow\", \"Principal\": { \"AWS\": \"arn:aws:iam::$ACCT:root\" }, \"Action\": \"sts:AssumeRole\" } ] }\nEOF\nPOL=$(aws iam create-policy --policy-name lab-reports-rw --policy-document file://reports-policy.json --query Policy.Arn --output text)\naws iam create-role --role-name lab-reports-app --assume-role-policy-document file://trust.json --max-session-duration 3600 >/dev/null\naws iam attach-role-policy --role-name lab-reports-app --policy-arn $POL\necho \"POL=$POL\" >> lab.env\naws iam list-attached-role-policies --role-name lab-reports-app",
        check: "The role lists lab-reports-rw as its only attached policy."
      },
      {
        title: "Assume the role and test with real credentials",
        body: "Get temporary credentials for the role and run the job's actions in a subshell so your admin session is untouched. AccessDenied errors on the finance/ prefix and on delete are the proof you want.",
        cmd: "source ~/iam-lab/lab.env; cd ~/iam-lab\nCREDS=$(aws sts assume-role --role-arn arn:aws:iam::$ACCT:role/lab-reports-app --role-session-name test --query Credentials --output json)\n(\n  export AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r .AccessKeyId) AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r .SecretAccessKey) AWS_SESSION_TOKEN=$(echo $CREDS | jq -r .SessionToken); unset AWS_PROFILE\n  aws sts get-caller-identity --query Arn\n  aws s3 ls s3://$B/reports/            # allowed\n  aws s3 cp s3://$B/reports/q3.txt -     # allowed\n  echo new > q4.txt; aws s3 cp q4.txt s3://$B/reports/q4.txt   # allowed\n  aws s3 cp s3://$B/finance/pay.txt -    # AccessDenied\n  aws s3 ls s3://$B/                     # AccessDenied (prefix not reports/)\n  aws s3 rm s3://$B/reports/q3.txt       # AccessDenied\n)",
        check: "The caller is assumed-role/lab-reports-app/test; the three allowed commands work and the last three fail with AccessDenied."
      },
      {
        title: "Add a permissions boundary and see the intersection",
        body: "A permissions boundary is a ceiling: the effective permissions are the intersection of the boundary and the identity policies. Attach a boundary that allows only S3, then attach an extra AWS managed policy for EC2 read access. The EC2 call still fails because the boundary does not allow it. This is how teams let developers create roles without letting them escalate privileges.",
        cmd: "source ~/iam-lab/lab.env; cd ~/iam-lab\ncat > boundary.json <<'EOF'\n{ \"Version\": \"2012-10-17\", \"Statement\": [ { \"Effect\": \"Allow\", \"Action\": \"s3:*\", \"Resource\": \"*\" } ] }\nEOF\nBND=$(aws iam create-policy --policy-name lab-boundary-s3-only --policy-document file://boundary.json --query Policy.Arn --output text)\necho \"BND=$BND\" >> lab.env\naws iam put-role-permissions-boundary --role-name lab-reports-app --permissions-boundary $BND\naws iam attach-role-policy --role-name lab-reports-app --policy-arn arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess\nsleep 10\nCREDS=$(aws sts assume-role --role-arn arn:aws:iam::$ACCT:role/lab-reports-app --role-session-name boundary --query Credentials --output json)\n( export AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r .AccessKeyId) AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r .SecretAccessKey) AWS_SESSION_TOKEN=$(echo $CREDS | jq -r .SessionToken); unset AWS_PROFILE\n  aws ec2 describe-regions --query 'Regions[0].RegionName'   # denied by boundary\n  aws s3 ls s3://$B/reports/ )                               # still allowed",
        check: "describe-regions fails with UnauthorizedOperation even though AmazonEC2ReadOnlyAccess is attached, while the S3 listing still works."
      },
      {
        title: "Add an explicit deny and see that deny always wins",
        body: "Remove the EC2 policy, then add an inline policy that explicitly denies PutObject on reports/archive/*. AWS policy evaluation is: explicit deny beats any allow; without an allow the default is an implicit deny. Explicit denies are how you carve out protected paths inside a broader allow.",
        cmd: "source ~/iam-lab/lab.env; cd ~/iam-lab\naws iam detach-role-policy --role-name lab-reports-app --policy-arn arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess\ncat > deny.json <<EOF\n{ \"Version\": \"2012-10-17\", \"Statement\": [ { \"Effect\": \"Deny\", \"Action\": \"s3:PutObject\", \"Resource\": \"arn:aws:s3:::$B/reports/archive/*\" } ] }\nEOF\naws iam put-role-policy --role-name lab-reports-app --policy-name deny-archive-writes --policy-document file://deny.json\nsleep 10\nCREDS=$(aws sts assume-role --role-arn arn:aws:iam::$ACCT:role/lab-reports-app --role-session-name deny --query Credentials --output json)\n( export AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r .AccessKeyId) AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r .SecretAccessKey) AWS_SESSION_TOKEN=$(echo $CREDS | jq -r .SessionToken); unset AWS_PROFILE\n  aws s3 cp q4.txt s3://$B/reports/q5.txt          # allowed\n  aws s3 cp q4.txt s3://$B/reports/archive/q5.txt ) # explicitly denied",
        check: "The write to reports/ works; the write to reports/archive/ returns AccessDenied, and the error message mentions an explicit deny in an identity-based policy."
      },
      {
        title: "Use last-accessed data to find unused permissions",
        body: "IAM records which services a role actually used. Generate the report for the role; services that were never accessed are candidates for removal. On real accounts teams run this monthly and remove what has not been used in 90 days.",
        cmd: "source ~/iam-lab/lab.env\nJOB=$(aws iam generate-service-last-accessed-details --arn arn:aws:iam::$ACCT:role/lab-reports-app --query JobId --output text)\nsleep 10\naws iam get-service-last-accessed-details --job-id $JOB --query 'ServicesLastAccessed[?TotalAuthenticatedEntities>`0`].{Service:ServiceNamespace,Last:LastAuthenticated}' --output table",
        check: "Only s3 appears as accessed (tracking can lag up to a few hours; if the table is empty, rerun later and note the lag in your write-up)."
      },
      {
        title: "Write a policy review checklist",
        body: "Turn what you learned into a checklist you could use to review a teammate's pull request: no wildcard actions unless justified, resources scoped to ARNs, conditions for prefixes, tags or source, no iam:PassRole on *, validate-policy clean, simulator results for allowed and denied cases, boundary for delegated role creation, and an owner and review date. Save it as policy-review.md with your final policy.",
        check: "policy-review.md contains the checklist, the final JSON policy and the simulator output table."
      },
      {
        title: "Clean up every IAM object and the bucket",
        body: "Roles cannot be deleted while they have attached or inline policies or a boundary, and managed policies cannot be deleted while attached. Delete in that order, then empty and remove the bucket.",
        cmd: "source ~/iam-lab/lab.env\naws iam delete-role-policy --role-name lab-reports-app --policy-name deny-archive-writes\naws iam detach-role-policy --role-name lab-reports-app --policy-arn $POL\naws iam delete-role-permissions-boundary --role-name lab-reports-app\naws iam delete-role --role-name lab-reports-app\naws iam delete-policy --policy-arn $POL\naws iam delete-policy --policy-arn $BND\naws s3 rb s3://$B --force\naws iam list-roles --query 'Roles[?starts_with(RoleName, `lab-`)].RoleName'\naws iam list-policies --scope Local --query 'Policies[?starts_with(PolicyName, `lab-`)].PolicyName'",
        check: "Both list commands return [] and aws s3 ls no longer shows the lab bucket."
      }
    ],
    verify: [
      "The simulator shows allowed only for GetObject and PutObject under reports/, and implicitDeny for everything else you tested.",
      "With the role's temporary credentials, finance/ reads and deletes fail with AccessDenied while reports/ reads and writes succeed.",
      "The EC2 call fails with the boundary in place despite an attached EC2 read-only policy, and the archive/ write fails due to the explicit deny.",
      "After cleanup no role or customer managed policy starting with lab- remains and the bucket is gone."
    ],
    deliverable: "policy-review.md with the before-and-after policies, the Access Analyzer findings on the draft, the simulator results table, the AccessDenied test transcript, a short explanation of the evaluation order (explicit deny, allow within boundary, implicit deny) and your review checklist.",
    resume: "Designed and tested a least-privilege IAM role for an S3 workload using Access Analyzer validation, the IAM policy simulator, a permissions boundary and explicit denies, replacing an s3:* on * draft with prefix-scoped access.",
    interview: [
      "A user has an Allow for s3:PutObject but still gets AccessDenied. What do you check? An explicit deny anywhere (identity, resource, SCP, session policy), the permissions boundary, the bucket policy, KMS key permissions if the bucket uses SSE-KMS, and whether the resource ARN or condition in the allow actually matches.",
      "What is a permissions boundary? A managed policy that sets the maximum permissions an IAM user or role can have; effective permissions are the intersection of the boundary and the identity policies, which lets you delegate role creation safely.",
      "How do you move an existing over-permissive role toward least privilege? Use last-accessed data and CloudTrail to see what it really uses, write a scoped policy, validate and simulate it, deploy it alongside monitoring for AccessDenied, then remove the broad policy."
    ],
    cleanup: [
      "Delete the inline policy, detach the managed policy, remove the permissions boundary and delete the role lab-reports-app.",
      "Delete the customer managed policies lab-reports-rw and lab-boundary-s3-only.",
      "Empty and delete the lab-iam-<account id> bucket with aws s3 rb --force.",
      "Delete ~/iam-lab/lab.env if you no longer need the variables."
    ],
    links: [
      { label: "AWS: Policies and permissions in IAM", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html" },
      { label: "AWS: Policy evaluation logic", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html" },
      { label: "AWS: Permissions boundaries for IAM entities", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html" },
      { label: "AWS: IAM Access Analyzer policy validation", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html" },
      { label: "AWS: Security best practices in IAM", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" }
    ]
  },
  {
    id: "lab-cloud-s3-static-site",
    title: "Host a static website on Amazon S3 and control access with Block Public Access and bucket policies",
    track: "Cloud computing",
    level: "Beginner",
    minutes: 75,
    cost: "Free or a fraction of a cent: a few KB of storage and a handful of requests are covered by the AWS Free plan credits or the legacy S3 free tier. Costs only grow if you leave a public bucket up and it gets traffic, so delete it the same day.",
    summary: "Upload a small website to S3, turn on static website hosting, watch Block Public Access stop it from being public, deliberately open only that bucket for reading with a bucket policy, test the site, share a private file safely with a pre-signed URL instead, then lock everything back down and delete the bucket.",
    realWorld: "S3 is the most-used storage service on AWS, and public S3 buckets are behind many real data leaks. Cloud and security engineers are expected to know the layers that decide whether an object is public (Block Public Access at the account and bucket level, bucket policies, object ownership and ACLs) and to use safer patterns such as pre-signed URLs or a CDN with origin access control. The Cloud Practitioner and Solutions Architect exams ask about exactly these controls.",
    youWillNeed: [
      "Your AWS account baselined in lab-cloud-aws-account-safety, with the admin SSO profile",
      "AWS CLI v2 and curl on Ubuntu",
      "A web browser"
    ],
    requires: ["lab-cloud-aws-account-safety"],
    safety: "COST AND DATA WARNING: the bucket in this lab becomes publicly readable for a few minutes on purpose. Put only the dummy HTML files from this lab in it, never real or personal data. Do not relax Block Public Access on any other bucket, turn account-level Block Public Access back on in the cleanup step, and delete the bucket the same day.",
    steps: [
      {
        title: "Create the site files",
        body: "Make a tiny site with an index page and an error page. S3 website hosting serves index.html for the root and error.html for missing keys.",
        cmd: "mkdir -p ~/s3-site && cd ~/s3-site\ncat > index.html <<'EOF'\n<!doctype html><html><head><meta charset=\"utf-8\"><title>My cloud lab site</title></head>\n<body><h1>Hello from Amazon S3</h1><p>Static website hosting lab.</p></body></html>\nEOF\ncat > error.html <<'EOF'\n<!doctype html><html><head><meta charset=\"utf-8\"><title>Not found</title></head><body><h1>404: page not found</h1></body></html>\nEOF\nmkdir -p private && echo 'internal notes: not for the website' > private/notes.txt\nls -R",
        check: "index.html, error.html and private/notes.txt exist."
      },
      {
        title: "Create the bucket and check its default protections",
        body: "New buckets have Block Public Access on, ACLs disabled (Object Ownership = bucket owner enforced) and default SSE-S3 encryption. Check the account-level and bucket-level Block Public Access settings so you know which layer will stop you later.",
        cmd: "export AWS_PROFILE=admin AWS_REGION=us-east-1\nACCT=$(aws sts get-caller-identity --query Account --output text)\nB=lab-site-$ACCT\necho \"export AWS_PROFILE=admin AWS_REGION=us-east-1 ACCT=$ACCT B=$B\" > ~/s3-site/lab.env\naws s3api create-bucket --bucket $B\naws s3api get-public-access-block --bucket $B\naws s3control get-public-access-block --account-id $ACCT || echo 'No account-level setting yet'\naws s3api get-bucket-ownership-controls --bucket $B\naws s3api get-bucket-encryption --bucket $B --query 'ServerSideEncryptionConfiguration.Rules[0].ApplyServerSideEncryptionByDefault'",
        check: "All four bucket Block Public Access flags are true, ObjectOwnership is BucketOwnerEnforced and the default encryption algorithm is AES256."
      },
      {
        title: "Upload the files and enable website hosting",
        body: "Sync the site (excluding the private folder) and turn on static website hosting. The website endpoint is different from the normal S3 API endpoint: it serves HTML over HTTP and uses the index and error documents.",
        cmd: "source ~/s3-site/lab.env; cd ~/s3-site\naws s3 sync . s3://$B/ --exclude 'private/*' --exclude 'lab.env'\naws s3 cp private/notes.txt s3://$B/private/notes.txt\naws s3 website s3://$B/ --index-document index.html --error-document error.html\nURL=http://$B.s3-website-us-east-1.amazonaws.com\necho \"URL=$URL\" >> lab.env; echo $URL\ncurl -s -o /dev/null -w '%{http_code}\\n' $URL/",
        check: "The curl returns 403: website hosting is on, but nothing is public yet. (For regions other than us-east-1, check the website endpoint format in the S3 documentation.)"
      },
      {
        title: "See Block Public Access reject a public policy",
        body: "Write a bucket policy that allows anyone to read objects, and try to apply it while Block Public Access is on. BlockPublicPolicy rejects the call; this is the guardrail that prevents most accidental data exposure.",
        cmd: "source ~/s3-site/lab.env; cd ~/s3-site\ncat > public-read.json <<EOF\n{ \"Version\": \"2012-10-17\", \"Statement\": [ { \"Sid\": \"PublicReadSiteOnly\", \"Effect\": \"Allow\", \"Principal\": \"*\", \"Action\": \"s3:GetObject\",\n  \"Resource\": [\"arn:aws:s3:::$B/index.html\", \"arn:aws:s3:::$B/error.html\"] } ] }\nEOF\naws s3api put-bucket-policy --bucket $B --policy file://public-read.json",
        check: "The command fails with AccessDenied mentioning that public policies are blocked by the BlockPublicPolicy setting."
      },
      {
        title: "Relax Block Public Access for this one bucket only",
        body: "Turn off only the two policy-related flags on this bucket and keep ACL blocking on. If you enabled Block Public Access at the account level (a good practice), it overrides the bucket setting, so you must temporarily turn off its policy flags too and write down that you will turn them back on in the cleanup step. Notice the policy grants read on two named files only, not the whole bucket.",
        cmd: "source ~/s3-site/lab.env; cd ~/s3-site\naws s3api put-public-access-block --bucket $B --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false\n# Only if the account-level setting exists and blocks policies:\naws s3control get-public-access-block --account-id $ACCT && aws s3control put-public-access-block --account-id $ACCT --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false\naws s3api put-bucket-policy --bucket $B --policy file://public-read.json\naws s3api get-bucket-policy-status --bucket $B",
        check: "put-bucket-policy succeeds and get-bucket-policy-status shows IsPublic: true."
      },
      {
        title: "Test the website and prove the private file is still private",
        body: "Load the site in a browser and with curl. Request a missing page to see the error document, and request the private notes file through both the website and the API endpoint: it is not covered by the policy, so it stays denied even though the bucket is 'public'.",
        cmd: "source ~/s3-site/lab.env\ncurl -s $URL/ | grep h1\ncurl -s -o /dev/null -w 'missing page: %{http_code}\\n' $URL/nope.html\ncurl -s -o /dev/null -w 'private via website: %{http_code}\\n' $URL/private/notes.txt\ncurl -s -o /dev/null -w 'private via API: %{http_code}\\n' https://$B.s3.amazonaws.com/private/notes.txt",
        check: "The home page shows 'Hello from Amazon S3', the missing page returns 404 with your error page, and both private requests return 403."
      },
      {
        title: "Share a private file with a pre-signed URL",
        body: "When someone needs one file for a short time, do not make it public: generate a pre-signed URL. It carries your temporary credentials' signature and expires. Because your SSO credentials are temporary, the URL also stops working when your session ends, whichever is sooner.",
        cmd: "source ~/s3-site/lab.env\nP=$(aws s3 presign s3://$B/private/notes.txt --expires-in 300)\ncurl -s \"$P\"; echo\necho 'Wait 5 minutes, then:'; echo \"curl -s -o /dev/null -w '%{http_code}\\\\n' \\\"$P\\\"\"",
        check: "The pre-signed URL returns the notes text now, and returns 403 after it expires."
      },
      {
        title: "Review the exposure the way a security team would",
        body: "Open the S3 console: the bucket shows 'Publicly accessible'. Open IAM Access Analyzer's external access findings if you have an analyzer, or the S3 console's Access findings, to see how the public grant is reported. Then write down how you would host this site in production: keep the bucket private and put Amazon CloudFront in front with origin access control (OAC) and HTTPS, instead of the HTTP-only website endpoint.",
        check: "You have a screenshot of the 'Publicly accessible' label and a two-sentence production design using CloudFront and OAC."
      },
      {
        title: "Lock it back down",
        body: "Remove the bucket policy, restore all four Block Public Access flags on the bucket, and restore the account-level setting you changed. Then confirm the site is no longer reachable.",
        cmd: "source ~/s3-site/lab.env\naws s3api delete-bucket-policy --bucket $B\naws s3api put-public-access-block --bucket $B --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true\naws s3control put-public-access-block --account-id $ACCT --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true\ncurl -s -o /dev/null -w '%{http_code}\\n' $URL/",
        check: "The site returns 403 again, and get-public-access-block shows all flags true for both the bucket and the account."
      },
      {
        title: "Delete the bucket",
        body: "Empty and remove the bucket so nothing is left to bill or leak. rb --force deletes the objects first.",
        cmd: "source ~/s3-site/lab.env\naws s3 rb s3://$B --force\naws s3 ls | grep lab-site || echo 'bucket gone'",
        check: "The output says 'bucket gone'."
      }
    ],
    verify: [
      "put-bucket-policy with a public policy failed while Block Public Access was on.",
      "The website served index.html and error.html while private/notes.txt returned 403 on both endpoints.",
      "A pre-signed URL gave temporary access to the private file and stopped working after it expired.",
      "At the end, Block Public Access is fully on at the account level and the bucket no longer exists."
    ],
    deliverable: "A short write-up with the bucket policy, screenshots of the site, the 403 for the private file and the Block Public Access error, the pre-signed URL test, and a diagram of the production design (private bucket, CloudFront with origin access control, HTTPS).",
    resume: "Deployed a static website on Amazon S3, scoped public read to named objects with a bucket policy, used pre-signed URLs for private sharing, and restored account-wide Block Public Access afterward.",
    interview: [
      "How can an S3 object become public? Through a bucket policy or ACL that grants access to everyone, but only if Block Public Access at the account and bucket level allows it; ACLs are disabled by default on new buckets.",
      "How would you serve a static site from S3 securely? Keep the bucket private with Block Public Access on and serve it through CloudFront using origin access control and HTTPS, so only CloudFront can read the bucket.",
      "When would you use a pre-signed URL? To give someone time-limited access to a specific private object without changing bucket permissions or sharing credentials."
    ],
    cleanup: [
      "Delete the bucket policy and set all four Block Public Access flags to true on the bucket (done in the lab).",
      "Restore account-level Block Public Access if you relaxed it.",
      "Delete the bucket with aws s3 rb s3://lab-site-<account id> --force.",
      "Delete ~/s3-site if you do not want to keep the files."
    ],
    links: [
      { label: "Amazon S3: Hosting a static website", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html" },
      { label: "Amazon S3: Blocking public access", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html" },
      { label: "Amazon S3: Bucket policy examples", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html" },
      { label: "Amazon S3: Sharing objects with presigned URLs", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html" },
      { label: "Amazon CloudFront: Restricting access to an S3 origin", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html" }
    ]
  },
  {
    id: "lab-cloud-ec2-basics",
    title: "Launch, secure, snapshot and terminate an EC2 web server on the Free Tier",
    track: "Cloud computing",
    level: "Beginner",
    minutes: 120,
    cost: "Free or a few cents if you finish the same day: use a free-tier-eligible instance type (the lab shows you how to list them) and an 8 GB gp3 volume. The public IPv4 address is billed at about 0.005 USD per hour unless your free offer covers it, and snapshots cost about 0.05 USD per GB-month, so terminate the instance and delete the snapshot at the end. A stopped instance still pays for its EBS volume.",
    summary: "Launch an Amazon Linux 2023 instance from the AWS CLI with a key pair, a security group that allows SSH and HTTP only from your IP, IMDSv2 required and an encrypted gp3 root volume; install a web server with user data; see how stop and start change the public IP; take an EBS snapshot; then terminate everything and prove nothing is left billing.",
    realWorld: "Launching and securing a virtual machine is the most basic cloud operations task, and forgotten instances, open security groups and orphaned volumes and snapshots are the most common sources of waste and exposure. Cloud administrators, support engineers and anyone taking Cloud Practitioner, Cloud+ or Solutions Architect is expected to know instance types, AMIs, security groups, EBS, snapshots, the metadata service and the instance lifecycle.",
    youWillNeed: [
      "Your AWS account baselined in lab-cloud-aws-account-safety, with budgets set and the admin SSO profile",
      "AWS CLI v2, curl and an SSH client on Ubuntu"
    ],
    requires: ["lab-cloud-aws-account-safety"],
    safety: "COST WARNING: check your budgets exist before you start and run the cleanup step the same day. Launch only one free-tier-eligible instance. Allow SSH and HTTP only from your own public IP (/32), never 0.0.0.0/0, and keep the private key file on your machine with chmod 400; never commit it anywhere.",
    steps: [
      {
        title: "Pick a region, the default VPC and a free-tier instance type",
        body: "Stay in one region for the whole lab. The describe-instance-types filter lists the types your account can run for free; use one of them (usually t3.micro or t2.micro). Find the default VPC, which already has public subnets, and your own public IP for the security group.",
        cmd: "export AWS_PROFILE=admin AWS_REGION=us-east-1\naws ec2 describe-instance-types --filters Name=free-tier-eligible,Values=true --query 'InstanceTypes[].InstanceType' --output text\nTYPE=t3.micro   # change to one listed above\nVPC=$(aws ec2 describe-vpcs --filters Name=is-default,Values=true --query 'Vpcs[0].VpcId' --output text)\nMYIP=$(curl -s https://checkip.amazonaws.com)\nmkdir -p ~/ec2-lab && cd ~/ec2-lab\necho \"export AWS_PROFILE=admin AWS_REGION=us-east-1 TYPE=$TYPE VPC=$VPC MYIP=$MYIP\" > lab.env\ncat lab.env",
        check: "lab.env shows a free-tier type, a vpc- ID and your public IP. If there is no default VPC, create one with aws ec2 create-default-vpc."
      },
      {
        title: "Create a key pair",
        body: "EC2 stores the public key and gives you the private key once. ED25519 keys are short and modern. Protect the file: SSH refuses keys that other users can read.",
        cmd: "source ~/ec2-lab/lab.env; cd ~/ec2-lab\naws ec2 create-key-pair --key-name lab-ec2-key --key-type ed25519 --tag-specifications 'ResourceType=key-pair,Tags=[{Key=Project,Value=ec2-lab}]' --query KeyMaterial --output text > lab-ec2-key.pem\nchmod 400 lab-ec2-key.pem\nls -l lab-ec2-key.pem",
        check: "lab-ec2-key.pem exists with permissions -r--------."
      },
      {
        title: "Create a security group that allows only your IP",
        body: "A security group is a stateful virtual firewall on the instance's network interface. Inbound rules are allow-only; return traffic is allowed automatically. Allow SSH (22) and HTTP (80) from your /32 only.",
        cmd: "source ~/ec2-lab/lab.env; cd ~/ec2-lab\nSG=$(aws ec2 create-security-group --group-name lab-ec2-web --description 'EC2 lab: SSH and HTTP from my IP' --vpc-id $VPC --query GroupId --output text)\naws ec2 authorize-security-group-ingress --group-id $SG --protocol tcp --port 22 --cidr $MYIP/32\naws ec2 authorize-security-group-ingress --group-id $SG --protocol tcp --port 80 --cidr $MYIP/32\necho \"SG=$SG\" >> lab.env\naws ec2 describe-security-groups --group-ids $SG --query 'SecurityGroups[0].IpPermissions[].{Port:FromPort,From:IpRanges[0].CidrIp}' --output table",
        check: "Two inbound rules, ports 22 and 80, both from your IP/32."
      },
      {
        title: "Write user data to install a web server at first boot",
        body: "User data is a script cloud-init runs once when the instance first boots. It is how you bootstrap servers without logging in. Amazon Linux 2023 uses dnf.",
        cmd: "cd ~/ec2-lab\ncat > userdata.sh <<'EOF'\n#!/bin/bash\ndnf install -y nginx\nTOKEN=$(curl -s -X PUT http://169.254.169.254/latest/api/token -H 'X-aws-ec2-metadata-token-ttl-seconds: 60')\nIID=$(curl -s -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/instance-id)\necho \"<h1>EC2 lab web server</h1><p>Instance $IID</p>\" > /usr/share/nginx/html/index.html\nsystemctl enable --now nginx\nEOF\ncat userdata.sh",
        check: "userdata.sh contains the nginx install and the IMDSv2 token request."
      },
      {
        title: "Launch the instance with secure defaults",
        body: "Resolve the latest Amazon Linux 2023 AMI through the public SSM parameter instead of hard-coding an AMI ID (AMI IDs differ per region and change with every release). Require IMDSv2 so the metadata service needs a session token, which blocks a common credential-theft path. Encrypt the root volume and tag everything.",
        cmd: "source ~/ec2-lab/lab.env; cd ~/ec2-lab\nSUBNET=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC Name=default-for-az,Values=true --query 'Subnets[0].SubnetId' --output text)\nIID=$(aws ec2 run-instances --image-id resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 \\\n  --instance-type $TYPE --key-name lab-ec2-key --security-group-ids $SG --subnet-id $SUBNET --associate-public-ip-address \\\n  --metadata-options HttpTokens=required,HttpEndpoint=enabled \\\n  --block-device-mappings '[{\"DeviceName\":\"/dev/xvda\",\"Ebs\":{\"VolumeSize\":8,\"VolumeType\":\"gp3\",\"Encrypted\":true,\"DeleteOnTermination\":true}}]' \\\n  --user-data file://userdata.sh \\\n  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=lab-web},{Key=Project,Value=ec2-lab}]' 'ResourceType=volume,Tags=[{Key=Project,Value=ec2-lab}]' \\\n  --query 'Instances[0].InstanceId' --output text)\necho \"IID=$IID\" >> lab.env\naws ec2 wait instance-running --instance-ids $IID\naws ec2 describe-instances --instance-ids $IID --query 'Reservations[0].Instances[0].{State:State.Name,Type:InstanceType,IP:PublicIpAddress,AZ:Placement.AvailabilityZone,IMDS:MetadataOptions.HttpTokens}' --output table",
        check: "The instance is running with your free-tier type, a public IP and IMDS set to 'required'. If the run fails with an architecture error, your type is ARM (for example t4g): use the arm64 parameter name instead of x86_64."
      },
      {
        title: "Connect with SSH and test the web server",
        body: "Wait a minute for user data to finish. Browse to the public IP from your own machine, then SSH in and look around: the cloud-init log shows what user data did, and lsblk shows the EBS root volume.",
        cmd: "source ~/ec2-lab/lab.env; cd ~/ec2-lab\nIP=$(aws ec2 describe-instances --instance-ids $IID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)\ncurl -s http://$IP/\nssh -i lab-ec2-key.pem ec2-user@$IP\n# On the instance:\nsudo tail -n 5 /var/log/cloud-init-output.log\nlsblk\ncurl -s -m 3 http://169.254.169.254/latest/meta-data/ || echo 'IMDSv1 refused (401): token required'\nexit",
        check: "curl returns the EC2 lab page with the instance ID, lsblk shows an 8G disk, and the metadata call without a token does not return data."
      },
      {
        title: "Prove the security group is doing its job",
        body: "From a different network (for example your phone's mobile data), try to open http://<public IP>/: it times out because only your IP is allowed. Then remove the HTTP rule and see your own request time out too. Security groups drop traffic silently rather than rejecting it, which is why 'it just hangs' usually means a security group or NACL.",
        cmd: "source ~/ec2-lab/lab.env\nIP=$(aws ec2 describe-instances --instance-ids $IID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)\naws ec2 revoke-security-group-ingress --group-id $SG --protocol tcp --port 80 --cidr $MYIP/32\ncurl -s -m 5 http://$IP/ || echo 'timed out: no rule for port 80'\naws ec2 authorize-security-group-ingress --group-id $SG --protocol tcp --port 80 --cidr $MYIP/32\ncurl -s -m 5 http://$IP/ | head -1",
        check: "The request times out without the rule and works again once it is restored, with no reboot needed."
      },
      {
        title: "Stop and start: watch the public IP change",
        body: "Stopping releases the auto-assigned public IPv4 address; starting gives a new one, while the private IP and the EBS volume stay. You are not charged for instance hours while stopped, but you are still charged for the EBS volume. Elastic IPs keep a fixed address but are billed, so this lab does not use one.",
        cmd: "source ~/ec2-lab/lab.env\nq(){ aws ec2 describe-instances --instance-ids $IID --query 'Reservations[0].Instances[0].[State.Name,PublicIpAddress,PrivateIpAddress]' --output text; }\nq\naws ec2 stop-instances --instance-ids $IID >/dev/null && aws ec2 wait instance-stopped --instance-ids $IID; q\naws ec2 start-instances --instance-ids $IID >/dev/null && aws ec2 wait instance-running --instance-ids $IID; q",
        check: "The stopped state shows no public IP (None), and after starting the public IP is different while the private IP is the same."
      },
      {
        title: "Snapshot the EBS volume",
        body: "An EBS snapshot is a point-in-time, incremental backup stored in S3 and usable to create new volumes in any AZ of the region, or to copy to another region. Snapshot the root volume and wait for it to complete.",
        cmd: "source ~/ec2-lab/lab.env; cd ~/ec2-lab\nVOL=$(aws ec2 describe-instances --instance-ids $IID --query 'Reservations[0].Instances[0].BlockDeviceMappings[0].Ebs.VolumeId' --output text)\nSNAP=$(aws ec2 create-snapshot --volume-id $VOL --description 'EC2 lab root volume' --tag-specifications 'ResourceType=snapshot,Tags=[{Key=Project,Value=ec2-lab}]' --query SnapshotId --output text)\necho \"VOL=$VOL SNAP=$SNAP\" >> lab.env\naws ec2 wait snapshot-completed --snapshot-ids $SNAP\naws ec2 describe-snapshots --snapshot-ids $SNAP --query 'Snapshots[0].{State:State,Size:VolumeSize,Encrypted:Encrypted}' --output table",
        check: "The snapshot state is completed, size 8 and Encrypted true (snapshots of encrypted volumes are always encrypted)."
      },
      {
        title: "Terminate the instance",
        body: "Terminating deletes the instance. Because DeleteOnTermination was true, the root volume is deleted too. The snapshot is independent and keeps existing (and billing) until you delete it, which is how orphaned snapshots pile up in real accounts.",
        cmd: "source ~/ec2-lab/lab.env\naws ec2 terminate-instances --instance-ids $IID >/dev/null\naws ec2 wait instance-terminated --instance-ids $IID\naws ec2 describe-volumes --volume-ids $VOL 2>&1 | tail -1\naws ec2 describe-snapshots --owner-ids self --filters Name=tag:Project,Values=ec2-lab --query 'Snapshots[].SnapshotId'",
        check: "describe-volumes reports the volume does not exist, but the snapshot is still listed."
      },
      {
        title: "Delete the snapshot, security group and key pair",
        body: "Clean up everything the instance left behind, then search by tag and by name to prove nothing remains. Checking in the console's EC2 dashboard for the region is a good habit too.",
        cmd: "source ~/ec2-lab/lab.env; cd ~/ec2-lab\naws ec2 delete-snapshot --snapshot-id $SNAP\naws ec2 delete-security-group --group-id $SG\naws ec2 delete-key-pair --key-name lab-ec2-key\nrm -f lab-ec2-key.pem\naws ec2 describe-instances --filters Name=tag:Project,Values=ec2-lab Name=instance-state-name,Values=pending,running,stopping,stopped --query 'Reservations[].Instances[].InstanceId'\naws ec2 describe-snapshots --owner-ids self --filters Name=tag:Project,Values=ec2-lab --query 'Snapshots[].SnapshotId'\naws ec2 describe-volumes --filters Name=tag:Project,Values=ec2-lab --query 'Volumes[].VolumeId'\naws ec2 describe-addresses --query 'Addresses[].PublicIp'",
        check: "Every query returns [] (no instances, snapshots, volumes or Elastic IPs)."
      },
      {
        title: "Check the bill the next day",
        body: "Charges appear with a delay of up to a day. Tomorrow, open Billing and Cost Management > Bills or Cost Explorer (the console is free; the Cost Explorer API charges per request) and filter by service EC2. Confirm usage is within your free offer and that no zero-spend budget alert fired, or that it fired for the public IPv4 hours and you understand why.",
        check: "You can explain every EC2 line on the bill, and it is zero or a few cents."
      }
    ],
    verify: [
      "The instance ran with IMDSv2 required, an encrypted gp3 root volume, and a security group open only to your /32 on ports 22 and 80.",
      "The web page loaded from your IP and timed out when the port 80 rule was removed.",
      "The public IP changed after stop and start while the private IP stayed the same.",
      "After cleanup, tag-filtered queries for instances, volumes and snapshots and the Elastic IP query all return []."
    ],
    deliverable: "A runbook (Markdown) with the exact launch command, the security group rules, screenshots of the web page and of the stop/start IP change, the snapshot details, and the cleanup queries showing empty results, plus a paragraph on the instance lifecycle and what keeps billing in each state.",
    resume: "Launched and hardened an Amazon EC2 web server with the AWS CLI (IMDSv2, encrypted EBS, least-access security groups, user-data bootstrap), created EBS snapshots and verified complete teardown with tag-based audits.",
    interview: [
      "What's the difference between stopping and terminating an instance? Stopping keeps the EBS root volume (still billed) and loses the auto-assigned public IP; terminating deletes the instance and, with DeleteOnTermination, its root volume.",
      "Security group or network ACL? Security groups are stateful, allow-only and attached to interfaces; NACLs are stateless, have allow and deny rules, apply to whole subnets and need rules for return traffic.",
      "Why require IMDSv2? It needs a session token from a PUT request, which protects the instance role credentials from SSRF-style attacks that could read IMDSv1 with a simple GET."
    ],
    cleanup: [
      "Terminate the lab-web instance (its root volume is deleted with it).",
      "Delete the EBS snapshot tagged Project=ec2-lab.",
      "Delete the lab-ec2-web security group and the lab-ec2-key key pair, and remove the local .pem file.",
      "Confirm there are no Elastic IPs, volumes or snapshots left in the region."
    ],
    links: [
      { label: "Amazon EC2: Get started tutorial", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html" },
      { label: "Amazon EC2: Security groups", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html" },
      { label: "Amazon EC2: Use the Instance Metadata Service (IMDSv2)", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html" },
      { label: "Amazon EBS: Snapshots", url: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html" },
      { label: "Amazon EC2: Instance lifecycle", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html" }
    ]
  },
  {
    id: "lab-cloud-vpc-subnets",
    title: "Design a two-AZ VPC with public and private subnets, reach a private instance without a NAT gateway",
    track: "Cloud computing",
    level: "Intermediate",
    minutes: 150,
    cost: "Free or a few cents if you clean up the same day: the VPC, subnets, route tables, internet gateway, S3 gateway endpoint and EC2 Instance Connect Endpoint have no hourly charge, and the one free-tier-eligible instance has no public IP. Do NOT create a NAT gateway: it costs about 0.045 USD per hour plus a per-GB processing charge in us-east-1 (over 30 USD a month even when idle). The VPC wizard offers one by default; you will turn it off.",
    summary: "Plan an address layout, build a VPC across two Availability Zones with public and private subnets using the console wizard (with NAT gateways set to None and a free S3 gateway endpoint), inspect the route tables with the CLI, launch a private instance with no public IP, reach it through an EC2 Instance Connect Endpoint, prove it has no internet access but can reach S3, break and fix a security group rule, and delete the whole VPC.",
    realWorld: "Every production AWS workload lives in a VPC, and the public-subnet/private-subnet split across two or more AZs is the default design interviewers expect you to draw. Knowing why a subnet is 'public' (its route to an internet gateway), how private subnets reach the internet (NAT) or AWS services (VPC endpoints), and what each piece costs is core Solutions Architect and Cloud+ material, and cost-aware choices like gateway endpoints instead of NAT for S3 traffic save real money.",
    youWillNeed: [
      "Your AWS account baselined in lab-cloud-aws-account-safety, with budgets set",
      "AWS CLI v2 with the admin SSO profile",
      "lab-cloud-ec2-basics completed, so launching an instance is familiar",
      "Paper or a diagram tool"
    ],
    requires: ["lab-cloud-ec2-basics"],
    safety: "COST WARNING: in the VPC wizard set 'NAT gateways' to None and never create an Elastic IP. Confirm your budget alerts exist before starting and run the cleanup the same day. The private instance has no public IP and is reachable only through the Instance Connect Endpoint from your own account.",
    steps: [
      {
        title: "Plan the address space on paper",
        body: "Choose 10.30.0.0/16 for the VPC (65,536 addresses, not overlapping your home network or other VPCs you may peer with). Carve /24 subnets: public 10.30.0.0/24 (AZ a) and 10.30.1.0/24 (AZ b), private 10.30.10.0/24 (AZ a) and 10.30.11.0/24 (AZ b). AWS reserves 5 addresses in every subnet (network, VPC router, DNS, one for future use, broadcast), so each /24 has 251 usable addresses. Two AZs means one AZ failure does not take the whole application down.",
        check: "You have a table of four subnets with CIDR, AZ, public or private, and usable address count."
      },
      {
        title: "Build the VPC with the wizard, with NAT turned off",
        body: "In the VPC console choose Create VPC > VPC and more. Name tag auto-generation: lab. IPv4 CIDR 10.30.0.0/16, no IPv6, 2 Availability Zones, 2 public and 2 private subnets; customize the subnet CIDRs to match your plan. Set NAT gateways to None and VPC endpoints to S3 Gateway. Keep DNS hostnames and DNS resolution enabled. Before clicking Create, read the preview map: it shows which route table each subnet uses.",
        check: "The preview shows 4 subnets, 1 internet gateway, public and private route tables, an S3 endpoint, and no NAT gateway. After creation, the workflow page lists every resource as created."
      },
      {
        title: "Inspect the subnets and route tables from the CLI",
        body: "A subnet is public only because its route table has 0.0.0.0/0 pointing to an internet gateway. The private route tables have the local route and a route to the S3 prefix list (pl-...) through the gateway endpoint, but no default route. Save the IDs for later steps.",
        cmd: "export AWS_PROFILE=admin AWS_REGION=us-east-1\nVPC=$(aws ec2 describe-vpcs --filters Name=tag:Name,Values=lab-vpc --query 'Vpcs[0].VpcId' --output text)\naws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC --query 'Subnets[].{Name:Tags[?Key==`Name`]|[0].Value,CIDR:CidrBlock,AZ:AvailabilityZone,Free:AvailableIpAddressCount,PublicIP:MapPublicIpOnLaunch}' --output table\naws ec2 describe-route-tables --filters Name=vpc-id,Values=$VPC --query 'RouteTables[].{Name:Tags[?Key==`Name`]|[0].Value,Routes:Routes[].[DestinationCidrBlock||DestinationPrefixListId,GatewayId]}' --output json\nPRIV=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC Name=cidr-block,Values=10.30.10.0/24 --query 'Subnets[0].SubnetId' --output text)\nmkdir -p ~/vpc2-lab; echo \"export AWS_PROFILE=admin AWS_REGION=us-east-1 VPC=$VPC PRIV=$PRIV\" > ~/vpc2-lab/lab.env",
        check: "Each subnet shows 251 free addresses; public route tables contain 0.0.0.0/0 via igw-...; private ones contain only local and a pl-... route via vpce-..."
      },
      {
        title: "Understand the NAT gateway you did not build",
        body: "Private instances usually need outbound internet for patches. A NAT gateway provides that from a public subnet, but it is billed per hour and per GB, and production designs use one per AZ for resilience. Calculate the monthly idle cost for one and for two, then list cheaper options for a lab or small workload: VPC gateway endpoints for S3 and DynamoDB (free), interface endpoints for other AWS services (hourly, but often cheaper than NAT for AWS-only traffic), IPv6 with an egress-only internet gateway (no hourly charge), patching through AWS Systems Manager with endpoints, or a small NAT instance you manage yourself.",
        cmd: "echo \"one NAT gateway idle for a month:  $(echo '0.045*730' | bc) USD\"\necho \"two (one per AZ):                   $(echo '0.045*730*2' | bc) USD\"\necho \"plus data processing, e.g. 100 GB:  $(echo '0.045*100' | bc) USD\"",
        check: "You have a short table of egress options with cost and trade-offs, and can explain why this lab uses a gateway endpoint instead of NAT. (Check current prices on the VPC pricing page; they vary by region.)"
      },
      {
        title: "Create security groups for the endpoint and the private instance",
        body: "The EC2 Instance Connect Endpoint (EICE) needs a security group that allows outbound SSH to the instance, and the instance's group allows SSH only from the endpoint's group. Referencing a security group instead of a CIDR means the rule follows the resource, not an address.",
        cmd: "source ~/vpc2-lab/lab.env\nSG_EICE=$(aws ec2 create-security-group --group-name lab-eice --description 'Instance Connect Endpoint' --vpc-id $VPC --query GroupId --output text)\nSG_APP=$(aws ec2 create-security-group --group-name lab-private-app --description 'Private app instance' --vpc-id $VPC --query GroupId --output text)\naws ec2 revoke-security-group-egress --group-id $SG_EICE --protocol all --cidr 0.0.0.0/0\naws ec2 authorize-security-group-egress --group-id $SG_EICE --protocol tcp --port 22 --source-group $SG_APP\naws ec2 authorize-security-group-ingress --group-id $SG_APP --protocol tcp --port 22 --source-group $SG_EICE\necho \"SG_EICE=$SG_EICE SG_APP=$SG_APP\" >> ~/vpc2-lab/lab.env",
        check: "lab-private-app allows port 22 only from lab-eice, and lab-eice only allows outbound 22 to lab-private-app."
      },
      {
        title: "Launch a private instance with no public IP",
        body: "Launch one free-tier-eligible Amazon Linux 2023 instance in the private subnet with no public address. It cannot be reached from the internet at all, which is the point of a private subnet. Amazon Linux 2023 includes the EC2 Instance Connect agent.",
        cmd: "source ~/vpc2-lab/lab.env\nIID=$(aws ec2 run-instances --image-id resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 \\\n  --instance-type t3.micro --subnet-id $PRIV --security-group-ids $SG_APP --no-associate-public-ip-address \\\n  --metadata-options HttpTokens=required \\\n  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=lab-private-app}]' --query 'Instances[0].InstanceId' --output text)\necho \"IID=$IID\" >> ~/vpc2-lab/lab.env\naws ec2 wait instance-running --instance-ids $IID\naws ec2 describe-instances --instance-ids $IID --query 'Reservations[0].Instances[0].[PrivateIpAddress,PublicIpAddress]' --output text",
        check: "The instance has a 10.30.10.x private address and None for its public address. Use a different free-tier type if t3.micro is not eligible in your account."
      },
      {
        title: "Create an EC2 Instance Connect Endpoint",
        body: "An EICE lets you open SSH to private instances through the AWS API, authenticated by IAM, without a bastion host, public IP or VPN. It has no hourly charge. Creation takes a few minutes.",
        cmd: "source ~/vpc2-lab/lab.env\nEICE=$(aws ec2 create-instance-connect-endpoint --subnet-id $PRIV --security-group-ids $SG_EICE --tag-specifications 'ResourceType=instance-connect-endpoint,Tags=[{Key=Name,Value=lab-eice}]' --query InstanceConnectEndpoint.InstanceConnectEndpointId --output text)\necho \"EICE=$EICE\" >> ~/vpc2-lab/lab.env\nwatch -n 20 \"aws ec2 describe-instance-connect-endpoints --instance-connect-endpoint-ids $EICE --query 'InstanceConnectEndpoints[0].State' --output text\"   # Ctrl+C at create-complete",
        check: "The endpoint state becomes create-complete."
      },
      {
        title: "Connect and test what the private subnet can reach",
        body: "Open an SSH session through the endpoint. Inside, check the route, then test outbound access: the internet must fail (no NAT and no internet route), while the regional S3 endpoint answers through the gateway endpoint. Any HTTP status code from S3 (often 200 or 403 for an anonymous request) proves the network path works.",
        cmd: "source ~/vpc2-lab/lab.env\naws ec2-instance-connect ssh --instance-id $IID --connection-type eice --os-user ec2-user\n# On the instance:\nip route\ncurl -s -m 5 https://checkip.amazonaws.com || echo 'no internet: expected, there is no NAT gateway'\ncurl -s -m 5 -o /dev/null -w 'S3 via gateway endpoint: HTTP %{http_code}\\n' https://s3.us-east-1.amazonaws.com/\nexit",
        check: "The internet request times out and the S3 request returns an HTTP status code."
      },
      {
        title: "Break and fix the security group path",
        body: "Troubleshooting practice: remove the instance's inbound rule and try to connect again; the session fails. Restore it and connect again. Write down the symptom and the check that found it, as you would in a ticket.",
        cmd: "source ~/vpc2-lab/lab.env\naws ec2 revoke-security-group-ingress --group-id $SG_APP --protocol tcp --port 22 --source-group $SG_EICE\ntimeout 60 aws ec2-instance-connect ssh --instance-id $IID --connection-type eice --os-user ec2-user || echo 'connection failed as expected'\naws ec2 authorize-security-group-ingress --group-id $SG_APP --protocol tcp --port 22 --source-group $SG_EICE\naws ec2-instance-connect ssh --instance-id $IID --connection-type eice --os-user ec2-user\n# On the instance: hostname; exit",
        check: "The first attempt hangs and fails; after restoring the rule you get a shell and hostname prints the instance's private DNS name."
      },
      {
        title: "Draw the final design",
        body: "Draw the VPC: two AZs, each with a public and a private subnet, the internet gateway on the public route table, the S3 gateway endpoint on the private route tables, the EICE and the instance. Add a note where a NAT gateway (one per AZ) or interface endpoints would go in production and what each would cost per month.",
        check: "The diagram shows every route table and matches the CLI output from step 3."
      },
      {
        title: "Tear down in the right order",
        body: "Terminate the instance and delete the endpoint first; a VPC cannot be deleted while it has network interfaces in use. Then delete the VPC from the console (Your VPCs > select lab-vpc > Actions > Delete VPC), which also removes its subnets, route tables, internet gateway, security groups and gateway endpoint. Check nothing is left.",
        cmd: "source ~/vpc2-lab/lab.env\naws ec2 terminate-instances --instance-ids $IID >/dev/null && aws ec2 wait instance-terminated --instance-ids $IID\naws ec2 delete-instance-connect-endpoint --instance-connect-endpoint-id $EICE\n# Wait until it is gone, then delete the VPC in the console (or delete SGs, endpoint, subnets, route tables, IGW, VPC with the CLI)\naws ec2 describe-instance-connect-endpoints --query 'InstanceConnectEndpoints[].State'\naws ec2 describe-vpcs --filters Name=tag:Name,Values=lab-vpc --query 'Vpcs[].VpcId'\naws ec2 describe-nat-gateways --filter Name=state,Values=pending,available --query 'NatGateways[].NatGatewayId'",
        check: "No endpoints, no lab-vpc and no NAT gateways are listed."
      }
    ],
    verify: [
      "The VPC had four subnets in two AZs; public route tables pointed 0.0.0.0/0 to the internet gateway and private route tables had only local and S3 prefix-list routes.",
      "The private instance had no public IP, could not reach the internet and could reach S3 through the gateway endpoint.",
      "SSH through the EC2 Instance Connect Endpoint failed without the security group rule and worked with it.",
      "After cleanup, no lab VPC, Instance Connect Endpoint or NAT gateway remains."
    ],
    deliverable: "A design document with the subnet plan table, the architecture diagram, the route table output, the internet-versus-S3 test results, the NAT gateway cost calculation and a recommendation on egress options for a small production workload.",
    resume: "Designed and built a two-AZ AWS VPC with public and private subnets and cost-free private access (S3 gateway endpoint, EC2 Instance Connect Endpoint), avoiding NAT gateway costs of roughly 30 USD or more per month in a lab environment.",
    interview: [
      "What makes a subnet public in AWS? Its route table has a default route to an internet gateway; instances also need a public IP to be reachable from the internet.",
      "How can a private instance download patches or reach S3? A NAT gateway or NAT instance for general internet egress, a gateway endpoint for S3 and DynamoDB, or interface endpoints for other AWS services such as Systems Manager.",
      "Why deploy across two Availability Zones? AZs are separate data centers with independent power and networking, so spreading subnets and instances across them keeps the application up if one AZ fails."
    ],
    cleanup: [
      "Terminate the lab-private-app instance.",
      "Delete the EC2 Instance Connect Endpoint and wait for it to disappear.",
      "Delete lab-vpc from the VPC console, which removes subnets, route tables, the internet gateway, security groups and the S3 gateway endpoint.",
      "Confirm with describe-nat-gateways and describe-addresses that no NAT gateway or Elastic IP exists."
    ],
    links: [
      { label: "Amazon VPC: How it works", url: "https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html" },
      { label: "Amazon VPC: NAT gateways", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" },
      { label: "AWS PrivateLink: Gateway endpoints", url: "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html" },
      { label: "Amazon EC2: Connect using EC2 Instance Connect Endpoint", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-using-eice.html" },
      { label: "Amazon VPC pricing", url: "https://aws.amazon.com/vpc/pricing/" }
    ]
  },
  {
    id: "lab-cloud-cloudwatch",
    title: "Monitor with Amazon CloudWatch: logs, metric filters, alarms, email alerts and a billing alarm",
    track: "Cloud computing",
    level: "Intermediate",
    minutes: 100,
    cost: "Free within the CloudWatch free tier if you follow the steps: a few KB of logs, one custom metric, up to three alarms, one dashboard and a few SNS emails. Logs Insights charges per GB scanned (fractions of a cent here). Set log retention to one day and delete everything at the end.",
    summary: "Create an SNS topic with an email subscription, send application log lines to a CloudWatch Logs group with short retention, turn ERROR lines into a metric with a metric filter, alarm on it and receive the email, query the logs with Logs Insights, build a small dashboard, and add a billing alarm on estimated charges as a second cost guardrail.",
    realWorld: "Operations and SRE teams live in monitoring tools: centralize logs, derive metrics from them, alert the right people on thresholds and investigate with queries. The same pattern (logs, metric filter, alarm, notification) is how teams catch application errors, failed logins and cost spikes. Cloud+ and the AWS exams test CloudWatch metrics, alarms, logs and SNS, and billing alarms are a standard cost control.",
    youWillNeed: [
      "Your AWS account baselined in lab-cloud-aws-account-safety, with CloudWatch billing alerts enabled in Billing preferences",
      "AWS CLI v2 and jq on Ubuntu",
      "An email inbox you can open to confirm the SNS subscription"
    ],
    requires: ["lab-cloud-aws-account-safety"],
    safety: "COST WARNING: stay within the free tier by using one region (us-east-1, required for billing metrics), one log group with 1-day retention and no more than three alarms. Delete the alarms, metric filter, log group, dashboard and SNS topic at the end. Only send made-up log lines, never real personal data.",
    steps: [
      {
        title: "Create an SNS topic and subscribe your email",
        body: "Amazon SNS delivers alarm notifications. Use us-east-1 for everything, because billing metrics only exist there and a billing alarm can only notify a topic in the same region. The subscription stays pending until you click the link in the confirmation email.",
        cmd: "export AWS_PROFILE=admin AWS_REGION=us-east-1\nmkdir -p ~/cw-lab && cd ~/cw-lab\nTOPIC=$(aws sns create-topic --name lab-alerts --query TopicArn --output text)\naws sns subscribe --topic-arn $TOPIC --protocol email --notification-endpoint you@example.com   # your address\necho \"export AWS_PROFILE=admin AWS_REGION=us-east-1 TOPIC=$TOPIC\" > lab.env\n# Click the link in the email, then:\naws sns list-subscriptions-by-topic --topic-arn $TOPIC --query 'Subscriptions[].SubscriptionArn'",
        check: "After confirming, the subscription shows a full ARN instead of PendingConfirmation."
      },
      {
        title: "Create a log group with short retention",
        body: "CloudWatch Logs keeps data forever by default, which slowly costs money. Always set a retention period. One day is enough for a lab; production teams often use 30 to 365 days depending on policy.",
        cmd: "source ~/cw-lab/lab.env\naws logs create-log-group --log-group-name /lab/app\naws logs put-retention-policy --log-group-name /lab/app --retention-in-days 1\naws logs create-log-stream --log-group-name /lab/app --log-stream-name web-1\naws logs describe-log-groups --log-group-name-prefix /lab/ --query 'logGroups[].{Name:logGroupName,Retention:retentionInDays}'",
        check: "/lab/app shows a retention of 1 day."
      },
      {
        title: "Send application log lines",
        body: "Write a small script that sends a batch of made-up web application log lines with the current timestamp in milliseconds. Real systems use the CloudWatch agent or a logging library, but the API call underneath is the same.",
        cmd: "cd ~/cw-lab\ncat > send-logs.sh <<'EOF'\n#!/bin/bash\n# usage: ./send-logs.sh <info-count> <error-count>\nsource ~/cw-lab/lab.env\nEVENTS=\"[]\"\nfor i in $(seq 1 ${1:-5}); do EVENTS=$(echo $EVENTS | jq --arg m \"INFO GET /products 200 $((RANDOM % 300))ms\" --argjson t $(date +%s%3N) '. + [{timestamp:$t, message:$m}]'); sleep 0.01; done\nfor i in $(seq 1 ${2:-0}); do EVENTS=$(echo $EVENTS | jq --arg m \"ERROR POST /checkout 500 payment service timeout\" --argjson t $(date +%s%3N) '. + [{timestamp:$t, message:$m}]'); sleep 0.01; done\naws logs put-log-events --log-group-name /lab/app --log-stream-name web-1 --log-events \"$EVENTS\" --query rejectedLogEventsInfo\nEOF\nchmod +x send-logs.sh\n./send-logs.sh 10 0\naws logs tail /lab/app --since 5m",
        check: "aws logs tail prints ten INFO lines."
      },
      {
        title: "Turn ERROR lines into a metric",
        body: "A metric filter scans incoming log events and publishes a number to a CloudWatch metric. Each ERROR line adds 1 to Lab/AppErrors; defaultValue 0 means periods without errors report 0 instead of nothing, which makes alarms behave predictably. Test the pattern against sample lines first.",
        cmd: "source ~/cw-lab/lab.env\naws logs test-metric-filter --filter-pattern '\"ERROR\"' --log-event-messages 'INFO GET /products 200 20ms' 'ERROR POST /checkout 500 payment service timeout' --query 'matches[].eventMessage'\naws logs put-metric-filter --log-group-name /lab/app --filter-name app-errors --filter-pattern '\"ERROR\"' \\\n  --metric-transformations metricName=AppErrors,metricNamespace=Lab,metricValue=1,defaultValue=0",
        check: "test-metric-filter matches only the ERROR line, and describe-metric-filters --log-group-name /lab/app lists app-errors."
      },
      {
        title: "Create an alarm on the error metric",
        body: "Alarm when there are 3 or more errors in a 1-minute period. Treat missing data as not breaching so the alarm does not flap when the app is quiet. The alarm action publishes to your SNS topic; the OK action tells you when it recovers.",
        cmd: "source ~/cw-lab/lab.env\naws cloudwatch put-metric-alarm --alarm-name lab-app-errors --alarm-description 'Checkout errors >= 3 per minute' \\\n  --namespace Lab --metric-name AppErrors --statistic Sum --period 60 --evaluation-periods 1 \\\n  --threshold 3 --comparison-operator GreaterThanOrEqualToThreshold --treat-missing-data notBreaching \\\n  --alarm-actions $TOPIC --ok-actions $TOPIC\naws cloudwatch describe-alarms --alarm-names lab-app-errors --query 'MetricAlarms[0].[AlarmName,StateValue]' --output text",
        check: "The alarm exists in INSUFFICIENT_DATA or OK state."
      },
      {
        title: "Cause an incident and receive the alert",
        body: "Send a burst of five ERROR lines. Within about two minutes the metric reaches 5, the alarm goes to ALARM and you get an email. Look at the alarm history to see the state change and its reason.",
        cmd: "cd ~/cw-lab; source lab.env\n./send-logs.sh 3 5\nsleep 120\naws cloudwatch describe-alarms --alarm-names lab-app-errors --query 'MetricAlarms[0].[StateValue,StateReason]' --output text\naws cloudwatch describe-alarm-history --alarm-name lab-app-errors --history-item-type StateUpdate --query 'AlarmHistoryItems[].HistorySummary'",
        check: "The alarm is in ALARM, the history shows the transition, and an 'ALARM: lab-app-errors' email arrived. A few minutes later it returns to OK and you get the OK email."
      },
      {
        title: "Investigate with Logs Insights",
        body: "Logs Insights queries let you slice logs quickly during an incident. Count errors per minute and find the slowest requests. Queries are billed by data scanned, which is tiny here.",
        cmd: "source ~/cw-lab/lab.env\nQ=$(aws logs start-query --log-group-name /lab/app --start-time $(date -d '-1 hour' +%s) --end-time $(date +%s) \\\n  --query-string 'fields @timestamp, @message | filter @message like /ERROR/ | stats count() as errors by bin(1m)' --query queryId --output text)\nsleep 5; aws logs get-query-results --query-id $Q --query 'results' --output text\nQ2=$(aws logs start-query --log-group-name /lab/app --start-time $(date -d '-1 hour' +%s) --end-time $(date +%s) \\\n  --query-string 'parse @message \"* * * * *ms\" as level, method, path, status, ms | filter level=\"INFO\" | sort ms desc | limit 3' --query queryId --output text)\nsleep 5; aws logs get-query-results --query-id $Q2 --query 'results' --output text",
        check: "The first query shows 5 errors in one minute bucket; the second lists the three slowest INFO requests."
      },
      {
        title: "Build a small dashboard",
        body: "A dashboard gives the on-call person one place to look. Create one with the error metric and the alarm. The free tier includes a few dashboards.",
        cmd: "source ~/cw-lab/lab.env\nALARM_ARN=$(aws cloudwatch describe-alarms --alarm-names lab-app-errors --query 'MetricAlarms[0].AlarmArn' --output text)\ncat > dash.json <<EOF\n{ \"widgets\": [\n  { \"type\": \"metric\", \"x\": 0, \"y\": 0, \"width\": 12, \"height\": 6, \"properties\": { \"title\": \"Checkout errors\", \"region\": \"us-east-1\", \"stat\": \"Sum\", \"period\": 60, \"metrics\": [[\"Lab\", \"AppErrors\"]] } },\n  { \"type\": \"alarm\", \"x\": 12, \"y\": 0, \"width\": 12, \"height\": 6, \"properties\": { \"title\": \"Alarms\", \"alarms\": [\"$ALARM_ARN\"] } }\n] }\nEOF\naws cloudwatch put-dashboard --dashboard-name lab-app --dashboard-body file://dash.json",
        check: "put-dashboard returns an empty DashboardValidationMessages list and the lab-app dashboard in the console shows the spike."
      },
      {
        title: "Add a billing alarm",
        body: "The AWS/Billing EstimatedCharges metric (us-east-1 only, updated a few times a day) exists once 'Receive CloudWatch billing alerts' is enabled. An alarm at 5 USD is a second guardrail next to your AWS Budgets. Budgets can also forecast; billing alarms react to the running estimate.",
        cmd: "source ~/cw-lab/lab.env\naws cloudwatch list-metrics --namespace AWS/Billing --metric-name EstimatedCharges --dimensions Name=Currency,Value=USD --query 'Metrics[0]'\naws cloudwatch put-metric-alarm --alarm-name lab-billing-5usd --alarm-description 'Estimated charges above 5 USD' \\\n  --namespace AWS/Billing --metric-name EstimatedCharges --dimensions Name=Currency,Value=USD \\\n  --statistic Maximum --period 21600 --evaluation-periods 1 --threshold 5 --comparison-operator GreaterThanThreshold \\\n  --alarm-actions $TOPIC",
        check: "list-metrics returns the metric (if it is empty, billing alerts were enabled recently: wait a few hours) and the lab-billing-5usd alarm exists."
      },
      {
        title: "Test the notification path without waiting for a real problem",
        body: "set-alarm-state forces an alarm into a state temporarily, which is how teams test that paging works end to end. The alarm returns to its real state at the next evaluation.",
        cmd: "source ~/cw-lab/lab.env\naws cloudwatch set-alarm-state --alarm-name lab-billing-5usd --state-value ALARM --state-reason 'Testing the notification path'",
        check: "You receive an ALARM email for lab-billing-5usd saying 'Testing the notification path'."
      },
      {
        title: "Clean up",
        body: "Delete the app alarm, dashboard, metric filter, log group and the test files. Decide about the billing alarm and topic: keeping one billing alarm and its SNS topic is useful and stays within the free tier, but if you remove the topic, remove the billing alarm too so it does not point to nothing.",
        cmd: "source ~/cw-lab/lab.env\naws cloudwatch delete-alarms --alarm-names lab-app-errors\naws cloudwatch delete-dashboards --dashboard-names lab-app\naws logs delete-metric-filter --log-group-name /lab/app --filter-name app-errors\naws logs delete-log-group --log-group-name /lab/app\n# Optional, if you do not keep the billing guardrail:\n# aws cloudwatch delete-alarms --alarm-names lab-billing-5usd && aws sns delete-topic --topic-arn $TOPIC\naws cloudwatch describe-alarms --query 'MetricAlarms[].AlarmName'\naws logs describe-log-groups --log-group-name-prefix /lab/ --query 'logGroups[].logGroupName'",
        check: "Only lab-billing-5usd remains (or nothing, if you removed it) and no /lab/ log groups exist."
      }
    ],
    verify: [
      "The metric filter matched only ERROR lines and published Lab/AppErrors.",
      "The lab-app-errors alarm went to ALARM after the error burst, you received the ALARM and OK emails, and the history shows both transitions.",
      "Logs Insights returned the error count per minute and the slowest requests.",
      "A billing alarm on AWS/Billing EstimatedCharges exists (or was deliberately removed) and the test notification arrived."
    ],
    deliverable: "A monitoring runbook: the architecture (logs, metric filter, metric, alarm, SNS, email), the alarm settings with the reasoning for period, threshold and missing-data handling, screenshots of the dashboard spike and the alert email, the two Logs Insights queries and what a responder should do when the alarm fires.",
    resume: "Built CloudWatch monitoring for an application: log retention, a metric filter for errors, a threshold alarm with SNS email notification, Logs Insights queries and a dashboard, plus a billing alarm on estimated charges.",
    interview: [
      "How would you alert on an error message that appears in application logs? Send the logs to CloudWatch Logs, create a metric filter that counts the pattern, alarm on the metric with a sensible period and threshold, and notify through SNS.",
      "What does treat-missing-data do on an alarm? It decides how periods with no data count: notBreaching, breaching, ignore or missing; for sparse error metrics notBreaching (or a defaultValue of 0 on the metric filter) avoids false alarms.",
      "AWS Budgets or a CloudWatch billing alarm? Budgets support forecasts, filters by service or tag and actions; a billing alarm reacts to the estimated charges metric; many accounts use both."
    ],
    cleanup: [
      "Delete the lab-app-errors alarm and the lab-app dashboard.",
      "Delete the app-errors metric filter and the /lab/app log group.",
      "Keep or delete the lab-billing-5usd alarm and the lab-alerts SNS topic (delete both together).",
      "Remove ~/cw-lab if you do not need the scripts."
    ],
    links: [
      { label: "Amazon CloudWatch: Using alarms", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html" },
      { label: "CloudWatch Logs: Creating metrics from log events using filters", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html" },
      { label: "CloudWatch Logs Insights query syntax", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html" },
      { label: "Amazon CloudWatch: Create a billing alarm", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html" },
      { label: "Amazon CloudWatch pricing", url: "https://aws.amazon.com/cloudwatch/pricing/" }
    ]
  },
  {
    id: "lab-cloud-azure-governance",
    title: "Azure governance basics: free account guardrails, resource groups, tags, RBAC, Azure Policy and locks",
    track: "Cloud computing",
    level: "Beginner",
    minutes: 120,
    cost: "Free. Resource groups, tags, Microsoft Entra ID users, role assignments, custom roles, built-in Azure Policy assignments, resource locks and virtual networks have no charge. The only resources created are empty virtual networks, which are free. Set the budget first anyway.",
    summary: "Set up an Azure free account safely (spending limit, budget alert), then practise the governance tools every Azure administrator uses: a tagged resource group, a test user with the built-in Reader role and a custom least-privilege role, Azure Policy assignments that deny resources in the wrong region or without a cost-center tag, a delete lock, and the activity log. Finish by removing every assignment, role, user and resource group.",
    realWorld: "Azure administrators and cloud governance teams use resource groups, tags, RBAC and Azure Policy to keep subscriptions organized, secure and affordable: who can do what, where resources may live, and who pays for them. AZ-900 dedicates a whole domain to management and governance, and the same controls show up in AZ-104, security reviews and every cloud landing zone design.",
    youWillNeed: [
      "An Azure free account (sign-up needs a Microsoft account, phone and card for identity verification)",
      "Azure Cloud Shell (Bash) in the portal, or the Azure CLI on Ubuntu (curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash, then az login)",
      "A private browser window to sign in as a second user"
    ],
    requires: [],
    safety: "COST WARNING: keep the free account's spending limit on so resources stop instead of billing your card when credit runs out, and create the budget alert in step 1 before anything else. Everything in this lab is free, but do not create virtual machines, databases or public IPs here. The test user gets read-only access to one resource group only; delete it at the end.",
    steps: [
      {
        title: "Check your free account and create a budget",
        body: "In the portal open Subscriptions and note your subscription name and ID, then Cost Management + Billing to see your remaining credit and whether the spending limit is on. Open Cost Management > Budgets > Add, scope it to the subscription, set a monthly amount of 5 (in your billing currency) with alert conditions at 50 and 100 percent of actual cost to your email. Budgets alert; they do not stop resources, which is why the spending limit matters on a free account.",
        check: "The budget appears under Cost Management > Budgets with two alert conditions, and the subscription overview shows the spending limit as on (for free accounts)."
      },
      {
        title: "Open Cloud Shell and set variables",
        body: "Open Cloud Shell (the >_ icon) in Bash mode; if asked about storage, you can choose to continue without a storage account (ephemeral session). az is already signed in. Pick one region and use it everywhere.",
        cmd: "az account show --query '{name:name, id:id, tenant:tenantId, user:user.name}' -o table\nSUB=$(az account show --query id -o tsv)\nLOC=eastus\nDOMAIN=$(az rest --method get --url https://graph.microsoft.com/v1.0/domains --query \"value[?isDefault].id\" -o tsv)\necho \"export SUB=$SUB LOC=$LOC DOMAIN=$DOMAIN\" | tee ~/gov-lab.env",
        check: "The output shows your subscription and a default domain such as yourname.onmicrosoft.com."
      },
      {
        title: "Create a tagged resource group",
        body: "A resource group is a logical container for resources that share a lifecycle; deleting the group deletes everything in it, which makes cleanup easy. Tags are key-value labels used for cost reports and automation. The Azure hierarchy is management groups > subscriptions > resource groups > resources, and RBAC and Policy assigned higher up are inherited below.",
        cmd: "source ~/gov-lab.env\naz group create -n rg-lab-gov -l $LOC --tags env=lab owner=$(az account show --query user.name -o tsv) costcenter=study\nRG_ID=$(az group show -n rg-lab-gov --query id -o tsv); echo \"export RG_ID=$RG_ID\" >> ~/gov-lab.env\naz group show -n rg-lab-gov --query '{name:name, location:location, tags:tags}'",
        check: "rg-lab-gov exists in your region with the env, owner and costcenter tags."
      },
      {
        title: "Create a test user in Microsoft Entra ID",
        body: "Create an ordinary user with no roles. Role-based access control works by assigning a role (a set of allowed actions) to a security principal (user, group, service principal or managed identity) at a scope (management group, subscription, resource group or resource).",
        cmd: "source ~/gov-lab.env\nread -s -p 'Temporary password for labreader: ' PW; echo\naz ad user create --display-name 'Lab Reader' --user-principal-name labreader@$DOMAIN --password \"$PW\" --force-change-password-next-sign-in true --query '{upn:userPrincipalName, id:id}'",
        check: "The user labreader@<your domain> is created and has an object ID."
      },
      {
        title: "Assign the Reader role at resource group scope",
        body: "Give the user the built-in Reader role on rg-lab-gov only. Assigning at the smallest scope that works is least privilege in Azure. Look at what Reader allows: every read action ('*/read') and nothing else.",
        cmd: "source ~/gov-lab.env\naz role definition list --name Reader --query '[0].permissions[0].actions'\naz role assignment create --assignee labreader@$DOMAIN --role Reader --scope $RG_ID\naz role assignment list --resource-group rg-lab-gov --query '[].{who:principalName, role:roleDefinitionName, scope:scope}' -o table",
        check: "The list shows labreader with the Reader role scoped to rg-lab-gov."
      },
      {
        title: "Test the user's access in a private window",
        body: "Open a private browser window, sign in at portal.azure.com as labreader and change the password. Open Resource groups: only rg-lab-gov is visible. Try to create a virtual network in it: the portal refuses at validation or deployment with an authorization error. Role assignments can take a few minutes to apply; sign out and in again if the group is not visible yet.",
        check: "labreader sees only rg-lab-gov and gets an AuthorizationFailed error when trying to create anything."
      },
      {
        title: "Create a least-privilege custom role",
        body: "When no built-in role fits, write a custom role. This one lets an operator see, start, restart and deallocate VMs in one resource group but not create or delete them. Scoping AssignableScopes to the resource group keeps it from being used elsewhere.",
        cmd: "source ~/gov-lab.env\ncat > ~/vm-operator.json <<EOF\n{\n  \"Name\": \"Lab VM Operator\",\n  \"Description\": \"Read, start, restart and deallocate VMs only\",\n  \"Actions\": [\n    \"Microsoft.Compute/virtualMachines/read\",\n    \"Microsoft.Compute/virtualMachines/start/action\",\n    \"Microsoft.Compute/virtualMachines/restart/action\",\n    \"Microsoft.Compute/virtualMachines/deallocate/action\",\n    \"Microsoft.Resources/subscriptions/resourceGroups/read\"\n  ],\n  \"NotActions\": [],\n  \"AssignableScopes\": [\"$RG_ID\"]\n}\nEOF\naz role definition create --role-definition @$HOME/vm-operator.json --query '{name:roleName, type:roleType}'\naz role assignment create --assignee labreader@$DOMAIN --role 'Lab VM Operator' --scope $RG_ID\naz role assignment list --assignee labreader@$DOMAIN --all --query '[].roleDefinitionName' -o tsv",
        check: "The custom role is created as CustomRole and labreader now has both Reader and Lab VM Operator. (New custom roles can take a few minutes to become assignable; retry if the assignment says the role is not found.)"
      },
      {
        title: "Assign Azure Policy: allowed locations and a required tag",
        body: "RBAC controls who can act; Azure Policy controls what the resulting resources must look like, whoever creates them. Look up two built-in definitions by display name and assign them to the resource group: only your region is allowed, and every resource must have a costcenter tag. Both use the deny effect.",
        cmd: "source ~/gov-lab.env\naz provider register --namespace Microsoft.PolicyInsights\nP_LOC=$(az policy definition list --query \"[?displayName=='Allowed locations'].name\" -o tsv)\nP_TAG=$(az policy definition list --query \"[?displayName=='Require a tag on resources'].name\" -o tsv)\naz policy assignment create --name lab-allowed-locations --display-name 'Lab: allowed locations' --policy $P_LOC --scope $RG_ID --params \"{\\\"listOfAllowedLocations\\\":{\\\"value\\\":[\\\"$LOC\\\"]}}\"\naz policy assignment create --name lab-require-costcenter --display-name 'Lab: require costcenter tag' --policy $P_TAG --scope $RG_ID --params '{\"tagName\":{\"value\":\"costcenter\"}}'\naz policy assignment list --resource-group rg-lab-gov --query '[].displayName' -o tsv",
        check: "Both assignments are listed. Allow up to 15 minutes before testing; new assignments take a short while to take effect."
      },
      {
        title: "Test the policies with free virtual networks",
        body: "Try three deployments of an empty virtual network (free): in the wrong region, in the right region without the tag, and in the right region with the tag. The first two fail with RequestDisallowedByPolicy naming the assignment; the third succeeds.",
        cmd: "source ~/gov-lab.env\naz network vnet create -g rg-lab-gov -n vnet-wrong-region -l westeurope --address-prefix 10.60.0.0/16 --tags costcenter=study 2>&1 | grep -o 'RequestDisallowedByPolicy.*' | head -c 200; echo\naz network vnet create -g rg-lab-gov -n vnet-no-tag -l $LOC --address-prefix 10.61.0.0/16 2>&1 | grep -o 'RequestDisallowedByPolicy.*' | head -c 200; echo\naz network vnet create -g rg-lab-gov -n vnet-ok -l $LOC --address-prefix 10.62.0.0/16 --tags costcenter=study --query newVNet.name -o tsv",
        check: "The first two print RequestDisallowedByPolicy, and the third prints vnet-ok."
      },
      {
        title: "Check compliance",
        body: "Policy also evaluates existing resources and reports compliance. Trigger a scan and list the results; the resource group itself and vnet-ok should be compliant. In the portal, Policy > Compliance shows the same view that auditors use.",
        cmd: "az policy state trigger-scan --resource-group rg-lab-gov --no-wait\nsleep 180\naz policy state list --resource-group rg-lab-gov --query '[].{resource:resourceId, assignment:policyAssignmentName, state:complianceState}' -o table",
        check: "The table lists vnet-ok as Compliant for both assignments (scans can take several minutes; rerun the list command if it is empty)."
      },
      {
        title: "Protect the group with a delete lock",
        body: "A CanNotDelete lock stops anyone, even an Owner, from deleting resources until the lock is removed. It protects production resources from accidents. Try to delete the virtual network, then remove the lock.",
        cmd: "az lock create --name lab-no-delete --lock-type CanNotDelete --resource-group rg-lab-gov\naz network vnet delete -g rg-lab-gov -n vnet-ok 2>&1 | grep -o 'ScopeLocked' | head -1\naz lock delete --name lab-no-delete --resource-group rg-lab-gov\naz lock list --resource-group rg-lab-gov",
        check: "The delete attempt prints ScopeLocked, and after removing the lock the list is []."
      },
      {
        title: "Read the activity log",
        body: "The activity log records control-plane operations: who created, changed or deleted what, and whether it succeeded. Find your denied deployments and the lock operations.",
        cmd: "az monitor activity-log list --resource-group rg-lab-gov --offset 2h --query \"[].{time:eventTimestamp, op:operationName.localizedValue, status:status.value, caller:caller}\" -o table | head -30",
        check: "You see the role assignment writes, the failed deployments and the lock create and delete, each with your account as the caller."
      },
      {
        title: "Clean up every governance object",
        body: "Delete the policy assignments and role assignments, then the custom role (it can only be deleted once nothing uses it), the resource group and the test user. Keep the budget.",
        cmd: "source ~/gov-lab.env\naz policy assignment delete --name lab-allowed-locations --scope $RG_ID\naz policy assignment delete --name lab-require-costcenter --scope $RG_ID\naz role assignment delete --assignee labreader@$DOMAIN --scope $RG_ID\naz role definition delete --name 'Lab VM Operator' --scope $RG_ID\naz group delete -n rg-lab-gov --yes\naz ad user delete --id labreader@$DOMAIN\naz group list --query \"[?starts_with(name, 'rg-lab')].name\" -o tsv\naz role definition list --custom-role-only true --query '[].roleName' -o tsv",
        check: "No rg-lab groups and no Lab VM Operator custom role remain, and labreader no longer exists."
      }
    ],
    verify: [
      "A budget with alert conditions exists on the subscription.",
      "labreader could see only rg-lab-gov and could not create resources.",
      "Deployments in the wrong region or without a costcenter tag failed with RequestDisallowedByPolicy, while the compliant one succeeded.",
      "A CanNotDelete lock blocked deletion until it was removed, and after cleanup no lab resource group, custom role or test user remains."
    ],
    deliverable: "A governance summary: the hierarchy diagram (management group, subscription, resource group, resources) with where each control was applied, the custom role JSON, the two policy assignments and their test results, a compliance screenshot and a short explanation of RBAC versus Azure Policy versus locks.",
    resume: "Implemented Azure governance controls in a lab subscription: tagged resource groups, least-privilege RBAC with a custom role, Azure Policy deny assignments for region and tagging, resource locks and budget alerts.",
    interview: [
      "What is the difference between Azure RBAC and Azure Policy? RBAC decides who can perform which actions at a scope; Policy decides which resource configurations are allowed or audited, regardless of who deploys them.",
      "What does a resource lock do? CanNotDelete blocks deletion and ReadOnly blocks changes for everyone, including Owners, until the lock is removed; it prevents accidents, not attacks by someone who can remove locks.",
      "Why use tags? To group resources across resource groups for cost reporting, ownership, automation and policy, for example charging costs back by costcenter."
    ],
    cleanup: [
      "Delete the lab-allowed-locations and lab-require-costcenter policy assignments.",
      "Delete labreader's role assignments, the Lab VM Operator custom role and the labreader user.",
      "Delete the rg-lab-gov resource group.",
      "Keep the budget and the spending limit for the next Azure lab."
    ],
    links: [
      { label: "Microsoft Learn: What is Azure RBAC?", url: "https://learn.microsoft.com/azure/role-based-access-control/overview" },
      { label: "Microsoft Learn: Azure custom roles", url: "https://learn.microsoft.com/azure/role-based-access-control/custom-roles" },
      { label: "Microsoft Learn: What is Azure Policy?", url: "https://learn.microsoft.com/azure/governance/policy/overview" },
      { label: "Microsoft Learn: Lock your resources", url: "https://learn.microsoft.com/azure/azure-resource-manager/management/lock-resources" },
      { label: "Microsoft Learn: Create and manage budgets", url: "https://learn.microsoft.com/azure/cost-management-billing/costs/tutorial-acm-create-budgets" }
    ]
  },
  {
    id: "lab-cloud-azure-storage-vm",
    title: "Azure Storage and VMs: blob tiers, lifecycle rules, SAS, a Linux VM, snapshots and cost cleanup",
    track: "Cloud computing",
    level: "Intermediate",
    minutes: 150,
    cost: "Low and usually covered by free-account credit or 12-month free services: a Standard_LRS storage account with a few KB of blobs, and one small Linux VM of a size listed as free for your account (for example Standard_B1s) for a few hours. A Standard public IP, a disk snapshot and moving tiny blobs to Cool, Cold or Archive cost fractions of a cent. A VM that is only stopped, not deallocated, keeps billing for compute. Delete the resource group the same day.",
    summary: "Create a locked-down storage account, upload blobs with your Entra ID identity (no account keys), move blobs between Hot, Cool, Cold and Archive tiers, write a lifecycle management policy, recover a deleted blob with soft delete, share one file with a short-lived user delegation SAS, then deploy a small Linux VM with an NSG that allows only your IP and auto-shutdown, snapshot its disk, learn the difference between stopped and deallocated, review costs by tag and delete everything.",
    realWorld: "Storage tiers and lifecycle rules are one of the simplest ways cloud teams cut cost, and VMs left running or merely stopped are one of the most common wastes. Azure administrators are expected to secure storage (no public blob access, identity-based data access, SAS instead of keys), manage VM lifecycle and back it up, and prove costs are under control. These topics appear in AZ-900, AZ-104 and Cloud+.",
    youWillNeed: [
      "Your Azure free account with the budget from lab-cloud-azure-governance",
      "The Azure CLI on your Ubuntu machine (recommended for the VM part, so the NSG allows your real IP), or Cloud Shell for the storage part",
      "An SSH client"
    ],
    requires: ["lab-cloud-azure-governance"],
    safety: "COST WARNING: confirm your budget and spending limit before starting, pick a VM size your free account covers, turn on auto-shutdown, and delete the whole resource group at the end of the session. Never enable anonymous blob access; the storage account is created with public access disabled. Allow SSH only from your own IP, and keep the SAS expiry short.",
    steps: [
      {
        title: "Create a resource group and a secure storage account",
        body: "Storage account names are global, 3 to 24 lowercase letters and digits. Standard_LRS keeps three copies in one data center (the cheapest redundancy); ZRS, GRS and GZRS copy across zones or regions for more resilience at more cost. Disable anonymous blob access and shared key authorization so all data access uses Entra ID identities or SAS signed with them.",
        cmd: "LOC=eastus; RG=rg-lab-store\nSA=labstore$RANDOM$RANDOM\necho \"export LOC=$LOC RG=$RG SA=$SA\" > ~/store-lab.env\naz group create -n $RG -l $LOC --tags env=lab costcenter=study\naz storage account create -n $SA -g $RG -l $LOC --sku Standard_LRS --kind StorageV2 --access-tier Hot \\\n  --min-tls-version TLS1_2 --allow-blob-public-access false --allow-shared-key-access false --https-only true --tags costcenter=study\naz storage account show -n $SA -g $RG --query '{sku:sku.name, tier:accessTier, publicBlob:allowBlobPublicAccess, sharedKey:allowSharedKeyAccess, tls:minimumTlsVersion}'",
        check: "The account shows Standard_LRS, Hot, publicBlob false, sharedKey false and TLS1_2."
      },
      {
        title: "Grant yourself a data-plane role",
        body: "Owning the subscription lets you manage the account (control plane) but not read or write blobs (data plane). Grant yourself Storage Blob Data Contributor on this account only. Propagation can take a few minutes.",
        cmd: "source ~/store-lab.env\nME=$(az ad signed-in-user show --query id -o tsv)\nSA_ID=$(az storage account show -n $SA -g $RG --query id -o tsv)\naz role assignment create --assignee-object-id $ME --assignee-principal-type User --role 'Storage Blob Data Contributor' --scope $SA_ID\nsleep 90",
        check: "The role assignment is created with scope ending in /storageAccounts/<your account>."
      },
      {
        title: "Create a container and upload blobs",
        body: "Create a private container and upload a few files, including some under a logs/ prefix for the lifecycle rule later. --auth-mode login uses your Entra ID token instead of account keys.",
        cmd: "source ~/store-lab.env\nmkdir -p ~/store-lab/logs && cd ~/store-lab\necho 'quarterly report' > report.txt; for d in 01 02 03; do echo \"app log day $d\" > logs/app-$d.log; done\naz storage container create --account-name $SA --name docs --auth-mode login\naz storage blob upload --account-name $SA --container-name docs --name report.txt --file report.txt --auth-mode login\naz storage blob upload-batch --account-name $SA --destination docs --destination-path logs --source logs --auth-mode login\naz storage blob list --account-name $SA --container-name docs --auth-mode login --query '[].{name:name, tier:properties.blobTier}' -o table",
        check: "Four blobs are listed, all in the Hot tier. If you get AuthorizationPermissionMismatch, wait a few more minutes for the role assignment."
      },
      {
        title: "Move blobs between access tiers",
        body: "Hot is for frequent access, Cool (30-day minimum), Cold (90-day minimum) and Archive (180-day minimum) cost less to store but more to read, and early deletion is charged pro rata. Archive blobs are offline: you must rehydrate them (hours) before reading. Try reading an archived blob to see the error.",
        cmd: "source ~/store-lab.env\naz storage blob set-tier --account-name $SA --container-name docs --name logs/app-01.log --tier Cool --auth-mode login\naz storage blob set-tier --account-name $SA --container-name docs --name logs/app-02.log --tier Archive --auth-mode login\naz storage blob download --account-name $SA --container-name docs --name logs/app-02.log --file /tmp/x.log --auth-mode login 2>&1 | grep -o 'BlobArchived' | head -1\naz storage blob list --account-name $SA --container-name docs --prefix logs/ --auth-mode login --query '[].{name:name, tier:properties.blobTier}' -o table",
        check: "app-01 is Cool, app-02 is Archive, and downloading app-02 fails with BlobArchived."
      },
      {
        title: "Add a lifecycle management policy",
        body: "Instead of moving blobs by hand, a lifecycle policy moves or deletes them automatically based on age. This rule tiers logs/ to Cool after 30 days, Archive after 90, and deletes them after 365, which is a typical log retention pattern. Policies run about once a day.",
        cmd: "source ~/store-lab.env; cd ~/store-lab\ncat > lifecycle.json <<'EOF'\n{ \"rules\": [ { \"enabled\": true, \"name\": \"age-out-logs\", \"type\": \"Lifecycle\",\n  \"definition\": {\n    \"filters\": { \"blobTypes\": [\"blockBlob\"], \"prefixMatch\": [\"docs/logs/\"] },\n    \"actions\": { \"baseBlob\": {\n      \"tierToCool\":    { \"daysAfterModificationGreaterThan\": 30 },\n      \"tierToArchive\": { \"daysAfterModificationGreaterThan\": 90 },\n      \"delete\":        { \"daysAfterModificationGreaterThan\": 365 } } } } } ] }\nEOF\naz storage account management-policy create --account-name $SA -g $RG --policy @lifecycle.json\naz storage account management-policy show --account-name $SA -g $RG --query 'policy.rules[0].{name:name, prefix:definition.filters.prefixMatch}'",
        check: "The policy shows the age-out-logs rule with prefix docs/logs/ (the prefix includes the container name)."
      },
      {
        title: "Turn on soft delete and versioning, then recover a deleted blob",
        body: "Blob soft delete keeps deleted blobs for a retention period and versioning keeps previous versions when a blob is overwritten; together they protect against accidents and ransomware-style overwrites. Delete report.txt and bring it back.",
        cmd: "source ~/store-lab.env\naz storage account blob-service-properties update --account-name $SA -g $RG --enable-delete-retention true --delete-retention-days 7 --enable-versioning true --query '{softDelete:deleteRetentionPolicy.enabled, versioning:isVersioningEnabled}'\naz storage blob delete --account-name $SA --container-name docs --name report.txt --auth-mode login\naz storage blob list --account-name $SA --container-name docs --include d --auth-mode login --query \"[?name=='report.txt'].{name:name, deleted:deleted}\" -o table\naz storage blob undelete --account-name $SA --container-name docs --name report.txt --auth-mode login\naz storage blob exists --account-name $SA --container-name docs --name report.txt --auth-mode login",
        check: "The listing shows report.txt as deleted, and after undelete exists returns true. (With versioning on, the portal also shows it under Versions.)"
      },
      {
        title: "Share one file with a user delegation SAS",
        body: "A shared access signature (SAS) grants limited, time-bound access to a resource. A user delegation SAS is signed with your Entra ID credentials rather than the account key, which is why it still works with shared key access disabled. Give read-only access to one blob for one hour and test it with curl.",
        cmd: "source ~/store-lab.env\nEXP=$(date -u -d '+1 hour' '+%Y-%m-%dT%H:%MZ')\nURL=$(az storage blob generate-sas --account-name $SA --container-name docs --name report.txt --permissions r --expiry $EXP --https-only --auth-mode login --as-user --full-uri -o tsv)\ncurl -s \"$URL\"\ncurl -s -o /dev/null -w 'without SAS: %{http_code}\\n' \"${URL%%\\?*}\"",
        check: "curl with the SAS prints 'quarterly report'; the same URL without the SAS returns 409 or 404 (public access is disabled)."
      },
      {
        title: "Deploy a small Linux VM with a locked-down NSG",
        body: "Check which sizes your free account covers (the free services page in the portal lists them) and that the size is available in your region. Create the VM with no inbound rules, then allow SSH only from your IP. Image aliases change over time: az vm image list --output table shows the current ones.",
        cmd: "source ~/store-lab.env\naz vm list-skus -l $LOC --size Standard_B1s --query '[].{size:name, restrictions:restrictions[0].reasonCode}' -o table\nMYIP=$(curl -s https://ifconfig.me)\naz vm create -g $RG -n vm-lab --image Ubuntu2404 --size Standard_B1s --admin-username azureuser --generate-ssh-keys \\\n  --public-ip-sku Standard --nsg-rule NONE --tags costcenter=study --query '{ip:publicIpAddress, state:powerState}'\naz network nsg rule create -g $RG --nsg-name vm-labNSG -n allow-ssh-my-ip --priority 1000 --protocol Tcp --destination-port-ranges 22 --source-address-prefixes $MYIP/32 --access Allow\naz vm auto-shutdown -g $RG -n vm-lab --time 2300",
        check: "The VM is running with a public IP, the NSG has one inbound allow rule for your IP on port 22, and auto-shutdown is set for 23:00 UTC."
      },
      {
        title: "Connect and inspect the VM",
        body: "SSH in and look at the disks: the OS disk is a managed disk, and Azure also attaches a temporary disk on many sizes (lost on deallocation, never use it for data). The instance metadata service tells the VM about itself.",
        cmd: "source ~/store-lab.env\nIP=$(az vm show -d -g $RG -n vm-lab --query publicIps -o tsv)\nssh azureuser@$IP\n# On the VM:\nlsblk\ncurl -s -H Metadata:true 'http://169.254.169.254/metadata/instance/compute?api-version=2021-02-01' | python3 -m json.tool | grep -E '\"(vmSize|location|name)\"'\nexit",
        check: "lsblk shows the OS disk and the metadata shows vm-lab, your region and Standard_B1s."
      },
      {
        title: "Snapshot the OS disk",
        body: "A snapshot is a point-in-time, full read-only copy of a managed disk that you can use to create a new disk. Use Standard_LRS for snapshots to keep them cheap; they are billed per GB-month until deleted.",
        cmd: "source ~/store-lab.env\nDISK=$(az vm show -g $RG -n vm-lab --query storageProfile.osDisk.managedDisk.id -o tsv)\naz snapshot create -g $RG -n snap-vm-lab-os --source $DISK --sku Standard_LRS --tags costcenter=study --query '{name:name, sizeGb:diskSizeGb, state:provisioningState}'",
        check: "snap-vm-lab-os is Succeeded with the same size as the OS disk."
      },
      {
        title: "Stopped versus deallocated",
        body: "az vm stop shuts down the OS but keeps the compute reserved, so you keep paying for it. az vm deallocate releases the compute, so only disks (and a Standard public IP) keep billing. The portal's Stop button deallocates; the OS 'shutdown' command only stops.",
        cmd: "source ~/store-lab.env\nstate(){ az vm get-instance-view -g $RG -n vm-lab --query 'instanceView.statuses[1].displayStatus' -o tsv; }\naz vm stop -g $RG -n vm-lab; state\naz vm deallocate -g $RG -n vm-lab; state",
        check: "The first state is 'VM stopped' (still billed for compute) and the second is 'VM deallocated'."
      },
      {
        title: "Review cost by tag and delete everything",
        body: "In the portal open Cost Management > Cost analysis, group by Tag: costcenter or by Resource, and note that charges appear with a delay of up to a day. Then delete the resource group, which removes the VM, disks, snapshot, NIC, NSG, public IP, VNet and storage account together. Azure may also have created NetworkWatcherRG; it is free and can stay, or be deleted.",
        cmd: "source ~/store-lab.env\naz group delete -n $RG --yes\naz group list --query \"[?starts_with(name, 'rg-lab')].name\" -o tsv\naz resource list --tag costcenter=study --query '[].name' -o tsv",
        check: "Both lists are empty. Check Cost analysis again tomorrow to confirm the total is within your credit."
      }
    ],
    verify: [
      "The storage account denies anonymous and shared key access, and blob operations worked with --auth-mode login.",
      "An archived blob could not be read, the lifecycle rule is shown for docs/logs/, and a soft-deleted blob was restored.",
      "The user delegation SAS gave one hour of read access to one blob, while the plain URL did not.",
      "The VM went from 'VM stopped' to 'VM deallocated', and after cleanup no rg-lab resource group or costcenter=study resource remains."
    ],
    deliverable: "A storage and compute cost guide: a table of access tiers with minimum retention and use cases, your lifecycle JSON, the SAS test, the VM's NSG rule and auto-shutdown setting, the stopped-versus-deallocated evidence, and a cost analysis screenshot grouped by tag.",
    resume: "Built and secured Azure Storage with identity-based access, lifecycle tiering, soft delete and user delegation SAS, and operated a Linux VM with a least-access NSG, auto-shutdown and disk snapshots, then verified complete cleanup by tag.",
    interview: [
      "What is the difference between Hot, Cool, Cold and Archive? They trade storage price against access price and minimum retention; Archive is offline and must be rehydrated before reading, which can take hours.",
      "Why deallocate a VM instead of stopping it from inside the OS? A stopped VM still reserves and bills compute; a deallocated VM releases it, so only storage and any Standard public IP keep costing money.",
      "How would you give an outside partner temporary access to one file? A user delegation SAS with read-only permission, HTTPS only and a short expiry, rather than an account key or making the container public."
    ],
    cleanup: [
      "Delete the rg-lab-store resource group (VM, disks, snapshot, network, public IP and storage account).",
      "Optionally delete NetworkWatcherRG if Azure created it and you do not use it.",
      "Delete the local ~/store-lab folder and any SAS URLs you saved.",
      "Check Cost analysis the next day."
    ],
    links: [
      { label: "Microsoft Learn: Access tiers for blob data", url: "https://learn.microsoft.com/azure/storage/blobs/access-tiers-overview" },
      { label: "Microsoft Learn: Lifecycle management overview", url: "https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview" },
      { label: "Microsoft Learn: Create a user delegation SAS with the Azure CLI", url: "https://learn.microsoft.com/azure/storage/blobs/storage-blob-user-delegation-sas-create-cli" },
      { label: "Microsoft Learn: Create a Linux VM with the Azure CLI", url: "https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-cli" },
      { label: "Microsoft Learn: VM power states and billing", url: "https://learn.microsoft.com/azure/virtual-machines/states-billing" }
    ]
  },
  {
    id: "lab-cloud-iac-deploy",
    title: "Infrastructure as code on AWS: deploy, change, detect drift and destroy with Terraform and CloudFormation",
    track: "Cloud computing",
    level: "Intermediate",
    minutes: 150,
    cost: "Free. The stacks create only no-charge resources while idle: an empty S3 bucket with versioning, encryption and Block Public Access, and an SNS topic with no subscribers. Terraform, cfn-lint and Checkov are free open-source tools. Destroy both stacks at the end.",
    summary: "Define the same small, secure stack (an S3 bucket with Block Public Access, versioning and encryption, plus an SNS topic) twice: with Terraform and with AWS CloudFormation. Run the full workflow for each: validate, plan or change set, deploy, read outputs, preview a replacement, cause drift by changing a setting by hand, detect and fix it, scan the code for misconfigurations, and destroy everything.",
    realWorld: "Most cloud teams build infrastructure from code reviewed in pull requests, not by clicking in the console, so environments are repeatable, auditable and easy to tear down. Engineers are expected to read a plan before applying it, recognize when a change will replace a resource, detect drift caused by manual changes and scan templates before deployment. Cloud+ covers IaC and DevOps practices, and the AWS exams test CloudFormation concepts such as stacks, change sets and drift detection.",
    youWillNeed: [
      "Your AWS account baselined in lab-cloud-aws-account-safety, with the admin SSO profile",
      "AWS CLI v2 on Ubuntu 24.04",
      "Terraform (installed in step 1), and pipx for cfn-lint and Checkov (sudo apt install -y pipx)",
      "Optional: lab-terraform-docker for a deeper Terraform workflow without any cloud account"
    ],
    requires: ["lab-cloud-aws-account-safety"],
    safety: "COST WARNING: deploy only the resources in these templates and run terraform destroy and delete-stack at the end. Never commit terraform.tfstate, .terraform/ or AWS credentials to Git: state files can contain sensitive values. Use your SSO profile rather than access keys.",
    steps: [
      {
        title: "Install Terraform from HashiCorp's repository",
        body: "Install Terraform from the official HashiCorp APT repository so you get signed packages and updates. Check the version; the code below needs Terraform 1.6 or newer.",
        cmd: "sudo apt update && sudo apt install -y gpg wget lsb-release\nwget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg\necho \"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main\" | sudo tee /etc/apt/sources.list.d/hashicorp.list\nsudo apt update && sudo apt install -y terraform\nterraform -version",
        check: "terraform -version prints v1.6 or newer."
      },
      {
        title: "Write the Terraform configuration",
        body: "Declare the providers with version constraints, a validated variable, default tags that every resource inherits, and the bucket with its separate security resources (in the current AWS provider, versioning, encryption and Block Public Access are their own resources). force_destroy lets destroy remove a bucket that has object versions.",
        cmd: "mkdir -p ~/iac-lab/tf && cd ~/iac-lab/tf\ncat > main.tf <<'EOF'\nterraform {\n  required_version = \">= 1.6\"\n  required_providers {\n    aws    = { source = \"hashicorp/aws\", version = \"~> 6.0\" }\n    random = { source = \"hashicorp/random\", version = \"~> 3.6\" }\n  }\n}\n\nvariable \"env\" {\n  type    = string\n  default = \"dev\"\n  validation {\n    condition     = contains([\"dev\", \"test\"], var.env)\n    error_message = \"env must be dev or test.\"\n  }\n}\n\nprovider \"aws\" {\n  region = \"us-east-1\"\n  default_tags { tags = { Project = \"iac-lab\", ManagedBy = \"terraform\", Env = var.env } }\n}\n\nresource \"random_id\" \"suffix\" { byte_length = 4 }\n\nresource \"aws_s3_bucket\" \"logs\" {\n  bucket        = \"iac-lab-${var.env}-${random_id.suffix.hex}\"\n  force_destroy = true\n}\n\nresource \"aws_s3_bucket_public_access_block\" \"logs\" {\n  bucket                  = aws_s3_bucket.logs.id\n  block_public_acls       = true\n  block_public_policy     = true\n  ignore_public_acls      = true\n  restrict_public_buckets = true\n}\n\nresource \"aws_s3_bucket_versioning\" \"logs\" {\n  bucket = aws_s3_bucket.logs.id\n  versioning_configuration { status = \"Enabled\" }\n}\n\nresource \"aws_s3_bucket_server_side_encryption_configuration\" \"logs\" {\n  bucket = aws_s3_bucket.logs.id\n  rule {\n    apply_server_side_encryption_by_default { sse_algorithm = \"AES256\" }\n  }\n}\n\nresource \"aws_sns_topic\" \"alerts\" { name = \"iac-lab-${var.env}-alerts\" }\n\noutput \"bucket_name\" { value = aws_s3_bucket.logs.bucket }\noutput \"topic_arn\"   { value = aws_sns_topic.alerts.arn }\nEOF\nprintf '.terraform/\\n*.tfstate*\\ntfplan\\n' > .gitignore",
        check: "main.tf and a .gitignore that excludes state and plan files exist."
      },
      {
        title: "Init, format, validate and plan",
        body: "init downloads the providers and writes a lock file; fmt and validate catch style and syntax errors; plan shows exactly what will change. Saving the plan to a file guarantees that apply does only what you reviewed.",
        cmd: "cd ~/iac-lab/tf && export AWS_PROFILE=admin\naws sso login --profile admin\nterraform init\nterraform fmt -check || terraform fmt\nterraform validate\nterraform plan -out tfplan",
        check: "The plan ends with 'Plan: 6 to add, 0 to change, 0 to destroy.'"
      },
      {
        title: "Apply and inspect the result and the state",
        body: "Apply the saved plan, then confirm the settings with the AWS CLI rather than trusting Terraform's word for it. terraform state list shows what Terraform manages; the state file maps these addresses to real resource IDs, which is why it must be protected and, on a team, stored remotely (for example in an S3 backend with locking).",
        cmd: "cd ~/iac-lab/tf\nterraform apply tfplan\nB=$(terraform output -raw bucket_name); echo $B\nterraform state list\naws s3api get-bucket-versioning --bucket $B\naws s3api get-public-access-block --bucket $B --query PublicAccessBlockConfiguration\naws s3api get-bucket-tagging --bucket $B",
        check: "Versioning is Enabled, all four Block Public Access flags are true, and the bucket has the Project, ManagedBy and Env tags."
      },
      {
        title: "Preview a change that forces replacement",
        body: "Plan with env=test without applying. Because bucket names cannot be changed, Terraform must destroy and recreate the bucket ('-/+ forces replacement'), which in production would mean data loss. Reading plans for replacements is one of the most important review habits. Also try env=prod to see the validation block reject it.",
        cmd: "cd ~/iac-lab/tf\nterraform plan -var env=test | grep -E 'must be replaced|forces replacement|Plan:'\nterraform plan -var env=prod 2>&1 | grep -A1 'Invalid value'",
        check: "The test plan shows the bucket 'must be replaced' because of the bucket name, and prod fails validation with 'env must be dev or test.'"
      },
      {
        title: "Cause drift and let Terraform fix it",
        body: "Someone 'temporarily' suspends versioning in the console. Simulate that with the CLI, then run plan: Terraform compares state, code and reality and proposes to set versioning back. Apply to restore the declared configuration.",
        cmd: "cd ~/iac-lab/tf; B=$(terraform output -raw bucket_name)\naws s3api put-bucket-versioning --bucket $B --versioning-configuration Status=Suspended\nterraform plan | grep -E 'status|Plan:'\nterraform apply -auto-approve\naws s3api get-bucket-versioning --bucket $B --query Status",
        check: "The plan shows status changing from Suspended to Enabled with 1 to change, and after apply versioning is Enabled again."
      },
      {
        title: "Scan the code with Checkov",
        body: "Static analysis tools check IaC for misconfigurations before deployment. Checkov will pass some checks (encryption, versioning, public access) and flag others such as missing access logging, cross-region replication or KMS keys. Decide which findings matter for this use case and document accepted risks rather than blindly fixing everything.",
        cmd: "pipx install checkov && pipx ensurepath && source ~/.bashrc\ncd ~/iac-lab/tf\ncheckov -d . --compact --quiet | tail -40",
        check: "Checkov lists passed and failed checks by ID (CKV_AWS_...); you have written a one-line decision for each failure."
      },
      {
        title: "Write the same stack in CloudFormation",
        body: "CloudFormation is AWS's native IaC service: you submit a template and AWS stores the state as a stack. Write an equivalent YAML template with a parameter and outputs, and lint it with cfn-lint and the CloudFormation API.",
        cmd: "mkdir -p ~/iac-lab/cfn && cd ~/iac-lab/cfn\ncat > stack.yaml <<'EOF'\nAWSTemplateFormatVersion: '2010-09-09'\nDescription: IaC lab - secure bucket and alerts topic\nParameters:\n  Env:\n    Type: String\n    AllowedValues: [dev, test]\n    Default: dev\nResources:\n  LogsBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      PublicAccessBlockConfiguration:\n        BlockPublicAcls: true\n        BlockPublicPolicy: true\n        IgnorePublicAcls: true\n        RestrictPublicBuckets: true\n      VersioningConfiguration:\n        Status: Enabled\n      BucketEncryption:\n        ServerSideEncryptionConfiguration:\n          - ServerSideEncryptionByDefault:\n              SSEAlgorithm: AES256\n  AlertsTopic:\n    Type: AWS::SNS::Topic\n    Properties:\n      TopicName: !Sub 'iac-lab-${Env}-cfn-alerts'\nOutputs:\n  BucketName:\n    Value: !Ref LogsBucket\n  TopicArn:\n    Value: !Ref AlertsTopic\nEOF\npipx install cfn-lint\ncfn-lint stack.yaml && echo 'cfn-lint: no errors'\naws cloudformation validate-template --template-body file://stack.yaml --query Parameters",
        check: "cfn-lint reports no errors and validate-template lists the Env parameter."
      },
      {
        title: "Deploy the stack and read its outputs",
        body: "aws cloudformation deploy creates a change set and executes it. Stack-level tags propagate to supported resources. Watch the events to see the order in which resources are created.",
        cmd: "cd ~/iac-lab/cfn && export AWS_PROFILE=admin AWS_REGION=us-east-1\naws cloudformation deploy --template-file stack.yaml --stack-name iac-lab-cfn --parameter-overrides Env=dev --tags Project=iac-lab ManagedBy=cloudformation\naws cloudformation describe-stacks --stack-name iac-lab-cfn --query 'Stacks[0].[StackStatus,Outputs]' --output json\naws cloudformation describe-stack-events --stack-name iac-lab-cfn --query 'StackEvents[].[Timestamp,LogicalResourceId,ResourceStatus]' --output text | head -8",
        check: "The stack status is CREATE_COMPLETE and the outputs show a bucket name and topic ARN."
      },
      {
        title: "Review a change set before applying it",
        body: "Add a DisplayName to the topic and create a change set without executing it. A change set is CloudFormation's plan: it lists each resource, the action (Add, Modify, Remove) and whether replacement is needed. Execute it only after reviewing.",
        cmd: "cd ~/iac-lab/cfn\nsed -i '/TopicName:/a\\      DisplayName: IaC lab alerts' stack.yaml\ngrep -A2 'TopicName' stack.yaml\naws cloudformation deploy --template-file stack.yaml --stack-name iac-lab-cfn --parameter-overrides Env=dev --no-execute-changeset\nCS=$(aws cloudformation list-change-sets --stack-name iac-lab-cfn --query 'Summaries[0].ChangeSetId' --output text)\naws cloudformation describe-change-set --change-set-name $CS --query 'Changes[].ResourceChange.[LogicalResourceId,Action,Replacement]' --output table\naws cloudformation execute-change-set --change-set-name $CS\naws cloudformation wait stack-update-complete --stack-name iac-lab-cfn",
        check: "The change set shows AlertsTopic with Action Modify and Replacement False, and the stack reaches UPDATE_COMPLETE."
      },
      {
        title: "Detect drift in CloudFormation",
        body: "Suspend versioning on the CloudFormation bucket by hand, then run drift detection. Unlike terraform plan, CloudFormation only reports drift; you fix it by redeploying or reverting the manual change. Revert it with the CLI and check again.",
        cmd: "B2=$(aws cloudformation describe-stacks --stack-name iac-lab-cfn --query \"Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue\" --output text)\naws s3api put-bucket-versioning --bucket $B2 --versioning-configuration Status=Suspended\nID=$(aws cloudformation detect-stack-drift --stack-name iac-lab-cfn --query StackDriftDetectionId --output text)\nsleep 20; aws cloudformation describe-stack-drift-detection-status --stack-drift-detection-id $ID --query '[DetectionStatus,StackDriftStatus]' --output text\naws cloudformation describe-stack-resource-drifts --stack-name iac-lab-cfn --stack-resource-drift-status-filters MODIFIED --query 'StackResourceDrifts[].PropertyDifferences[].[PropertyPath,ExpectedValue,ActualValue]' --output table\naws s3api put-bucket-versioning --bucket $B2 --versioning-configuration Status=Enabled",
        check: "Drift detection reports DRIFTED with /VersioningConfiguration/Status expected Enabled and actual Suspended."
      },
      {
        title: "Destroy both stacks and confirm",
        body: "Tearing down is part of the workflow. Delete the CloudFormation stack (the bucket is empty, so it can be deleted) and run terraform destroy. Then search by tag for anything left.",
        cmd: "export AWS_PROFILE=admin AWS_REGION=us-east-1\naws cloudformation delete-stack --stack-name iac-lab-cfn\naws cloudformation wait stack-delete-complete --stack-name iac-lab-cfn\ncd ~/iac-lab/tf && terraform destroy -auto-approve\naws resourcegroupstaggingapi get-resources --tag-filters Key=Project,Values=iac-lab --query 'ResourceTagMappingList[].ResourceARN'\naws s3 ls | grep iac-lab || echo 'no iac-lab buckets'",
        check: "terraform destroy reports 6 destroyed, the stack is gone and no iac-lab resources or buckets remain (the tagging API can list deleted resources for a short time; recheck after a few minutes)."
      }
    ],
    verify: [
      "terraform plan showed 6 to add, the applied bucket has versioning, encryption, Block Public Access and default tags, and a plan with env=test showed a forced replacement.",
      "Manual drift was detected and corrected by terraform apply, and reported as DRIFTED by CloudFormation drift detection.",
      "The CloudFormation change set showed Modify with no replacement before it was executed.",
      "Both stacks were destroyed and a tag search finds no iac-lab resources."
    ],
    deliverable: "A Git repository (without state files) containing main.tf, stack.yaml, .gitignore and a README comparing Terraform and CloudFormation: workflow commands, how each stores state, how each shows changes and drift, the Checkov findings with your decisions, and screenshots of the plan, the change set and the drift report.",
    resume: "Provisioned and destroyed secure AWS infrastructure with both Terraform and CloudFormation, using saved plans and change sets, drift detection and Checkov scanning to keep deployments reviewable and repeatable.",
    interview: [
      "What is drift and how do you handle it? Differences between the deployed resources and the code, usually from manual changes; detect it with terraform plan or CloudFormation drift detection, then either revert the manual change or update the code, and restrict console write access.",
      "How do you know a change is risky before applying it? Read the plan or change set for replacements and deletions, especially on stateful resources like buckets and databases, and protect them with lifecycle rules or deletion policies.",
      "Where should Terraform state live on a team? In a remote backend with encryption, access control and locking, such as an S3 bucket with state locking, never in Git."
    ],
    cleanup: [
      "aws cloudformation delete-stack --stack-name iac-lab-cfn and wait for stack-delete-complete.",
      "terraform destroy in ~/iac-lab/tf.",
      "Confirm no iac-lab buckets or SNS topics remain.",
      "Keep the code, but never commit terraform.tfstate or .terraform/."
    ],
    links: [
      { label: "HashiCorp: Install Terraform", url: "https://developer.hashicorp.com/terraform/install" },
      { label: "Terraform AWS provider documentation", url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs" },
      { label: "AWS CloudFormation User Guide", url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html" },
      { label: "AWS CloudFormation: Detect unmanaged configuration changes (drift)", url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html" },
      { label: "Checkov documentation", url: "https://www.checkov.io/" }
    ]
  },
  {
    id: "lab-cloud-pricing-responsibility",
    title: "Shared responsibility and cost estimation with the AWS and Azure pricing calculators (no account needed)",
    track: "Cloud computing",
    level: "Beginner",
    minutes: 120,
    cost: "Free. No cloud account is needed: the AWS Pricing Calculator, the Azure Pricing Calculator and the Azure Retail Prices API are public. Nothing is deployed.",
    summary: "Map who is responsible for what across IaaS, PaaS, serverless and SaaS, then estimate the monthly cost of the same small web application on AWS and on Azure with the official pricing calculators, compare on-demand with Savings Plans and reservations, pull live list prices from the public Azure Retail Prices API, and write a one-page cost and responsibility memo with concrete savings recommendations.",
    realWorld: "Before anything is built, someone has to answer 'what will this cost?' and 'what do we still have to secure ourselves?'. Cloud architects, consultants and pre-sales engineers produce calculator estimates and responsibility matrices for every project, and FinOps teams use the same levers (right-sizing, commitments, scheduling, storage tiers, data transfer) to cut bills. The shared responsibility model and pricing are core objectives of Cloud Practitioner, AZ-900 and Cloud+, and cost optimization is a whole domain of the Solutions Architect exam.",
    youWillNeed: [
      "A web browser",
      "A spreadsheet (LibreOffice Calc, Google Sheets or Excel)",
      "curl and jq on Ubuntu (sudo apt install -y curl jq) for the Azure Retail Prices API"
    ],
    requires: [],
    safety: "The calculators' shareable links are readable by anyone who has the link, so never put customer names, internal hostnames or confidential figures in an estimate's description. List prices change often and vary by region: date your estimate and treat it as a planning figure, not a quote.",
    steps: [
      {
        title: "Build a shared responsibility matrix",
        body: "Read the AWS and Microsoft shared responsibility pages. Make a table with columns for EC2 or Azure VMs (IaaS), Amazon RDS or Azure SQL Database (PaaS), AWS Lambda or Azure Functions (serverless) and Microsoft 365 (SaaS), and rows for physical data center, network infrastructure, hypervisor, guest operating system patching, runtime and middleware, application code, network controls (security groups, NSGs), identity and access, data classification and encryption choices, and client devices. Mark each cell Provider, Customer or Shared.",
        check: "Your matrix shows the customer always keeps data, identities and access, and endpoints, while OS patching moves from customer (IaaS) to provider (PaaS and SaaS)."
      },
      {
        title: "Define the workload you will price",
        body: "Use one simple, realistic scenario so the two clouds are comparable: a small company web app in US East, running all month (730 hours). Two small Linux web servers behind a load balancer, one managed PostgreSQL database with 20 GB of storage, 100 GB of object storage for images, and 200 GB of data transfer out to the internet per month. Write these assumptions at the top of your spreadsheet.",
        check: "Your spreadsheet has an assumptions block listing region, hours, instance counts, storage and data transfer."
      },
      {
        title: "Price the compute on AWS",
        body: "Open calculator.aws, create an estimate and add Amazon EC2. Choose US East (N. Virginia), Linux, 2 instances of t3.small (or t4g.small, which is ARM and usually cheaper), On-Demand, 100 percent utilization, and 20 GB of gp3 EBS each. Add an Application Load Balancer with low traffic. Record the monthly cost of each service in your spreadsheet.",
        check: "The estimate lists EC2 and Elastic Load Balancing with monthly costs, and your spreadsheet has both numbers."
      },
      {
        title: "Add the database, storage and data transfer",
        body: "Add Amazon RDS for PostgreSQL: db.t4g.micro, Single-AZ, 20 GB gp3, On-Demand. Record it, then change it to Multi-AZ and record the new cost: high availability roughly doubles the database cost because a standby runs in a second AZ. Add Amazon S3 Standard with 100 GB and a modest number of requests, and add data transfer of 200 GB out to the internet. Notice that inbound data is free while outbound is billed.",
        check: "Your spreadsheet shows Single-AZ and Multi-AZ RDS costs side by side, plus S3 and data transfer lines."
      },
      {
        title: "Compare pricing models on AWS",
        body: "Duplicate the EC2 entry and change the pricing model to a 1-year Compute Savings Plan with no upfront payment, then to a 3-year term. Note the percentage saving compared with On-Demand. Write one sentence on when each model fits: On-Demand for short or unpredictable use, Savings Plans or Reserved Instances for steady baseline use, Spot for interruptible batch work. Save the estimate and export it as CSV.",
        check: "You have On-Demand, 1-year and 3-year compute costs and the percentage saving for each, and the estimate is exported."
      },
      {
        title: "Price the same workload in the Azure Pricing Calculator",
        body: "Open the Azure Pricing Calculator. Add Virtual Machines: East US, Linux, 2 x B2s (or another small general-purpose size), pay as you go, with a small managed disk. Add Azure Database for PostgreSQL flexible server, Burstable B1ms, 20 GB. Add Storage Accounts (Block Blob, Hot, LRS, 100 GB), a Load Balancer or Application Gateway, and Bandwidth with 200 GB outbound. Then switch the VMs to a 1-year reservation and record the saving. Note that Azure Hybrid Benefit applies only when you bring Windows Server or SQL Server licenses.",
        check: "The Azure estimate lists VMs, PostgreSQL, storage, load balancing and bandwidth with pay-as-you-go and reserved VM prices recorded."
      },
      {
        title: "Pull live list prices from the Azure Retail Prices API",
        body: "Microsoft publishes list prices through a public API that needs no account. Query the hourly Linux price for your VM size and compute the monthly cost of two VMs yourself, then compare with the calculator. This is how FinOps tools get prices programmatically.",
        cmd: "curl -sG https://prices.azure.com/api/retail/prices --data-urlencode \"\\$filter=serviceName eq 'Virtual Machines' and armRegionName eq 'eastus' and armSkuName eq 'Standard_B2s' and priceType eq 'Consumption'\" \\\n  | jq -r '.Items[] | select((.productName | test(\"Windows\") | not) and (.skuName | test(\"Spot|Low Priority\") | not)) | [.productName, .skuName, .retailPrice, .unitOfMeasure] | @tsv'\nP=$(curl -sG https://prices.azure.com/api/retail/prices --data-urlencode \"\\$filter=serviceName eq 'Virtual Machines' and armRegionName eq 'eastus' and armSkuName eq 'Standard_B2s' and priceType eq 'Consumption'\" | jq -r '[.Items[] | select((.productName | test(\"Windows\") | not) and (.skuName | test(\"Spot|Low Priority\") | not))][0].retailPrice')\necho \"2 x B2s Linux for 730 hours: $(echo \"$P * 730 * 2\" | bc) USD\"",
        check: "The API returns an hourly Linux price for Standard_B2s and your computed monthly figure matches the calculator's VM line within rounding."
      },
      {
        title: "Compare the two estimates",
        body: "Put AWS and Azure side by side by component in your spreadsheet. Do not declare a 'winner' from list prices alone: note differences in the instance specs you chose, what is included (for example burst credits or load balancer rules), support plans and any discounts. Identify the three biggest cost drivers; in small web apps these are usually compute, the database (especially with high availability) and data transfer.",
        check: "The comparison table has totals for both clouds and the three largest cost drivers are highlighted."
      },
      {
        title: "Model three savings levers",
        body: "Calculate the effect of: running a development copy only during working hours (for example 50 of 168 hours a week), right-sizing one instance size down after monitoring shows low CPU, and moving images older than 90 days to a cheaper storage tier. Show before, after and saving per month for each.",
        cmd: "# Example: share of hours a dev environment runs if it is on 10 hours a day, 5 days a week\necho \"scale=2; 50/168*100\" | bc   # percent of the always-on cost",
        check: "Each lever has a before, after and monthly saving figure, with the assumptions stated."
      },
      {
        title: "Write the cost and responsibility memo",
        body: "Write one page for a non-technical manager: the workload and assumptions, the monthly estimate for each cloud with the date and region, what the company is still responsible for (from your matrix), the recommended pricing model, the top three savings actions, and the guardrails you would set on day one (budgets and alerts, tagging for cost allocation, a monthly cost review). Include a line on what the estimate does not include, such as support plans, staff time and taxes.",
        check: "The memo fits on one page, uses no unexplained jargon and every number traces back to your spreadsheet."
      }
    ],
    verify: [
      "Your responsibility matrix covers IaaS, PaaS, serverless and SaaS with at least ten rows.",
      "Both calculator estimates include compute, database, storage, load balancing and data transfer, with the assumptions written down.",
      "You recorded On-Demand versus commitment prices on both clouds and computed a monthly VM cost from the Azure Retail Prices API.",
      "The memo names three savings levers with numbers and lists day-one cost guardrails."
    ],
    deliverable: "A portfolio folder with the responsibility matrix, the exported AWS estimate (CSV), the Azure estimate (exported to Excel), the comparison spreadsheet, the API query script and output, and the one-page memo. Remove any shareable calculator links that contain anything you would not publish.",
    resume: "Produced side-by-side AWS and Azure cost estimates for a three-tier web application with the official pricing calculators and the Azure Retail Prices API, identifying commitment, scheduling and right-sizing savings and documenting shared-responsibility boundaries.",
    interview: [
      "Under the shared responsibility model, who patches the operating system on EC2 versus on RDS? The customer patches the guest OS on EC2 (IaaS); on RDS (PaaS) AWS patches the OS and database engine, while the customer still controls access, network rules and data.",
      "How would you reduce a cloud bill for a steady production workload? Right-size from monitoring data, buy Savings Plans or reservations for the steady baseline, schedule non-production environments off, tier or expire old storage, reduce data transfer (for example with a CDN), and tag everything to find the owners of costs.",
      "What does a pricing calculator estimate leave out? Actual usage patterns, taxes, support plans, negotiated discounts, staff and migration costs, and charges from services you forgot to include, so it is a planning figure, not a bill."
    ],
    cleanup: [
      "Nothing was deployed, so there is nothing to delete in any cloud.",
      "Delete any saved or shared calculator estimates you no longer need, since anyone with the link can view them."
    ],
    links: [
      { label: "AWS: Shared Responsibility Model", url: "https://aws.amazon.com/compliance/shared-responsibility-model/" },
      { label: "Microsoft Learn: Shared responsibility in the cloud", url: "https://learn.microsoft.com/azure/security/fundamentals/shared-responsibility" },
      { label: "AWS Pricing Calculator", url: "https://calculator.aws/" },
      { label: "Azure Pricing Calculator", url: "https://azure.microsoft.com/pricing/calculator/" },
      { label: "Microsoft Learn: Azure Retail Prices REST API", url: "https://learn.microsoft.com/rest/api/cost-management/retail-prices/azure-retail-prices" },
      { label: "AWS Well-Architected: Cost Optimization Pillar", url: "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html" }
    ]
  }
]);
