/* Lessons for HashiCorp Certified: Terraform Associate (Terraform Associate (004)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("terraform", [
 {
  "t": "What IaC is: infrastructure defined in version-controlled, machine-readable files instead of manual console changes",
  "body": [
   "Infrastructure as Code (IaC) means you describe servers, networks, databases, DNS records and other infrastructure in text files that a tool reads and acts on, rather than building them by clicking through a cloud console or typing one-off commands. The files are the source of truth: if you want a change, you change the file, and the tool makes reality match it.",
   "Two words in the definition carry most of the weight. Machine-readable means a program can parse the file and turn it into API calls without a human interpreting it. Version-controlled means the files live in a system such as Git, so every change has an author, a timestamp, a message and a diff you can review or roll back. A wiki page describing how a server was built is documentation; a file that a tool can execute to build that server is code.",
   "Compare this with manual provisioning, sometimes called ClickOps. An engineer logs in to a console, creates a virtual network, picks a subnet range, launches a virtual machine and opens a firewall port. It works, but the knowledge of exactly what was done lives in that engineer's memory. Rebuilding it in another region, or explaining to an auditor why a port is open, means reconstructing the steps by hand. Small differences creep in between environments, a problem known as configuration drift.",
   "With Terraform, the IaC files are written in the HashiCorp Configuration Language (HCL) and usually end in `.tf`. A directory of `.tf` files is a configuration. You write blocks that declare what should exist, run `terraform plan` to preview what Terraform would change, and run `terraform apply` to make those changes through the provider's API. Terraform also keeps a state file recording which real objects belong to which blocks, which you will study later.",
   "```hcl\nresource \"local_file\" \"hello\" {\n  filename = \"hello.txt\"\n  content  = \"Managed by Terraform\"\n}\n```",
   "This tiny example uses the `local` provider to manage a file on your own machine, which is a good way to learn the workflow without a cloud account. The same pattern, a resource type, a name and some arguments, is how you would declare a cloud virtual machine or a DNS record. Once infrastructure is in files, it can be reviewed in pull requests, tested in pipelines and recreated on demand."
  ],
  "terms": [
   [
    "Infrastructure as Code (IaC)",
    "Managing infrastructure through machine-readable definition files that a tool applies, instead of manual changes."
   ],
   [
    "Configuration",
    "In Terraform, the set of `.tf` files in a directory that together describe the desired infrastructure."
   ],
   [
    "HCL",
    "HashiCorp Configuration Language, the declarative language Terraform configurations are written in."
   ],
   [
    "Configuration drift",
    "Differences that build up between environments or between the recorded design and reality, usually from untracked manual changes."
   ],
   [
    "ClickOps",
    "Informal name for provisioning infrastructure by hand through a web console."
   ]
  ],
  "example": "A team has a staging environment that someone built by hand two years ago. When they need a second copy for load testing, nobody remembers every setting. After they describe the environment in Terraform files stored in Git, creating a third copy is a matter of running plan and apply with different variable values.",
  "tip": "Exam questions define IaC by its properties: code stored in version control and applied by a tool. If an answer describes documenting manual steps or scripting console clicks without a source of truth, it is not the IaC benefit being asked about.",
  "check": [
   [
    "Why is a runbook describing console steps not considered Infrastructure as Code?",
    "Because a tool cannot execute it to produce the infrastructure; IaC files are machine-readable and applied automatically, so the file itself is the source of truth."
   ],
   [
    "What problem does storing IaC files in version control solve that manual changes do not?",
    "It records who changed what, when and why, allows review before changes, and lets you roll back to a known version."
   ]
  ]
 },
 {
  "t": "Advantages of IaC: repeatability, consistency, code review, audit history, automation, fewer configuration errors",
  "body": [
   "Knowing what IaC is gets you halfway; the exam also expects you to explain why organizations adopt it. Each benefit follows directly from the fact that infrastructure is described in files that a tool applies.",
   "Repeatability means you can run the same configuration again and get the same result. Need a new environment for a customer, a region or a test? Apply the same files with different input values. Consistency is the related promise that development, staging and production are built from the same definitions, so a bug that appears in production can be reproduced in staging because the two are genuinely alike rather than approximately alike.",
   "Code review is possible because changes are text diffs. A teammate can read a pull request, see that a security group now allows traffic from anywhere, and ask why before anything reaches a live system. Terraform strengthens this with `terraform plan`, whose output can be attached to the review so reviewers see not just the code change but the exact infrastructure change it will cause.",
   "Audit history comes from version control. Every commit records who changed the infrastructure definition, when, and with what message. When an auditor asks when encryption was enabled on a storage bucket, you can point to the commit. Combined with pipeline logs, you get a trail that manual console work rarely produces.",
   "Automation means the apply step can run in a CI/CD (continuous integration and continuous delivery) pipeline or in HCP Terraform instead of on someone's laptop. Humans approve; machines execute. This removes waiting for a specific person, and it makes policy checks and tests part of the path to production.",
   "Fewer configuration errors is the payoff of all of the above. Typos in a console cannot be reviewed or tested; typos in code can be caught by `terraform validate`, by reviewers, by policy checks and by trying the change in a lower environment first. Manual steps done at 2 a.m. during an outage are where mistakes happen, and IaC reduces how many manual steps exist.",
   "IaC also helps with disaster recovery and cost control: you can recreate infrastructure from code, and you can destroy temporary environments completely when you are done because the tool knows everything it created."
  ],
  "terms": [
   [
    "Repeatability",
    "The ability to produce the same infrastructure again from the same code and inputs."
   ],
   [
    "Consistency",
    "Environments built from the same definitions match each other, reducing works-in-staging-but-not-production surprises."
   ],
   [
    "Audit trail",
    "The record, from version control and pipeline logs, of who changed infrastructure, when and why."
   ],
   [
    "CI/CD",
    "Continuous integration and continuous delivery; automated pipelines that test and deploy changes."
   ]
  ],
  "example": "A security reviewer spots in a pull request that a new database would be publicly accessible. Because the change is code, she comments on the line, the author fixes it, and the corrected plan is approved. In a console-driven team the same mistake might only be found by a later scan, or by an attacker.",
  "tip": "If a question asks which IaC benefit lets you see who changed infrastructure and when, the answer is version control and audit history; if it asks about identical dev and prod, the answer is consistency.",
  "check": [
   [
    "Which IaC advantage lets a teammate catch an insecure change before it is applied?",
    "Code review: changes are text diffs, often with plan output attached, that can be reviewed in a pull request before apply."
   ],
   [
    "How does IaC help create a new test environment quickly?",
    "Repeatability: you apply the same configuration with different input values instead of rebuilding by hand."
   ]
  ]
 },
 {
  "t": "Declarative (describe the end state) vs imperative (list the steps) approaches",
  "body": [
   "There are two broad ways to tell a tool what infrastructure you want. An imperative approach lists the steps: create a network, then create a subnet, then launch two servers, then attach a disk. A declarative approach describes the end state: there should be one network, one subnet and two servers with disks attached, and the tool works out the steps.",
   "Terraform is declarative. You write blocks describing the objects that should exist and their settings. Terraform compares that desired state with what its state file says exists and with what the provider reports about the real objects, then builds a plan of creates, updates and deletes needed to close the gap. You never write the order of operations; Terraform derives it from references between resources.",
   "The difference shows up most clearly when things change. Suppose you have two servers and want three. With an imperative script that says create two servers, running it again creates two more, giving four. You would have to write logic that checks what exists and only creates what is missing. With Terraform, you change `count = 2` to `count = 3`, and the plan shows exactly one new server. Removing a block from a declarative configuration means that object should no longer exist, so Terraform plans to destroy it.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  count         = 3\n  ami           = var.ami_id\n  instance_type = \"t3.micro\"\n}\n```",
   "Imperative tools are not wrong; shell scripts, SDK programs and many configuration management tasks are imperative, and they give fine control over sequence. The trade-off is that you own the logic for checking current state, handling partial failures and cleaning up. Declarative tools take on that work in exchange for you expressing intent in the tool's model.",
   "Terraform does have imperative corners. Provisioners run scripts on a machine, and they are described by HashiCorp as a last resort because Terraform cannot model what the script did. Commands such as `terraform import` or `terraform state rm` are also operations rather than declarations, though newer `import` and `removed` blocks let you express even those as configuration."
  ],
  "terms": [
   [
    "Declarative",
    "Describing the desired end state and letting the tool determine the steps to reach it."
   ],
   [
    "Imperative",
    "Specifying the exact sequence of commands or steps to perform."
   ],
   [
    "Desired state",
    "The infrastructure described by the configuration, which Terraform tries to make real."
   ],
   [
    "Provisioner",
    "A Terraform feature that runs scripts or commands during resource creation or destruction; recommended only as a last resort."
   ]
  ],
  "example": "An engineer's Bash script calls the cloud CLI to create a load balancer. Run twice, it fails with a name conflict or creates a duplicate. Rewritten as a Terraform resource block, running apply twice leaves exactly one load balancer, and editing the block's settings updates it in place.",
  "tip": "The exam words it as 'Terraform is declarative: you describe the desired end state.' If an answer says Terraform executes your steps in the order you wrote them, it is wrong; block order in files does not matter.",
  "check": [
   [
    "In a declarative tool, what happens when you delete a resource block from the configuration and apply?",
    "The tool plans to destroy that object, because the desired state no longer includes it."
   ],
   [
    "Does the order in which you write resource blocks in `.tf` files decide the order Terraform creates them?",
    "No. Terraform builds a dependency graph from references and `depends_on`, and orders operations from that."
   ]
  ]
 },
 {
  "t": "Idempotence: applying the same configuration twice makes no further changes",
  "body": [
   "An operation is idempotent if doing it once or doing it many times produces the same result. Pressing an elevator call button is a common analogy: pressing it five times does not summon five elevators. For infrastructure tools, idempotence means that running the same configuration against infrastructure that already matches it changes nothing.",
   "Terraform achieves this because it is declarative and keeps state. On each run, `terraform plan` refreshes its knowledge of real objects, compares them with the configuration, and proposes only the differences. After a successful apply the differences are gone, so a second plan reports that no changes are needed. You will see the message that your infrastructure matches the configuration, and the summary counts are zero to add, zero to change and zero to destroy.",
   "Idempotence is what makes it safe to run Terraform repeatedly in automation. A pipeline can run plan on every commit; if nothing relevant changed, nothing happens. It also makes Terraform useful for detecting drift: if someone changes a setting by hand, the next plan shows a change back to what the code says, which is a signal that reality and code disagree.",
   "Idempotence can be broken, and recognizing how is useful. Values that change on every run, such as calling the `timestamp()` function inside a resource argument, cause a diff every time. Provisioners and scripts run through `local-exec` do whatever the script does and are not tracked by Terraform. Resources whose API normalizes a value differently from how you wrote it, for example reordering a list or changing letter case, can produce perpetual diffs until the configuration matches the normalized form or you use `lifecycle { ignore_changes = [...] }`.",
   "The lab for this week asks you to use the `random` provider to generate a pet name and write it to a file, then apply twice. The first apply creates both resources. The second apply shows no changes, even though `random_pet` could produce a different name, because the generated value is stored in state and only regenerated if the resource must be replaced. That is a concrete demonstration that Terraform tracks results rather than re-running actions.",
   "```text\n$ terraform apply\n...\nNo changes. Your infrastructure matches the configuration.\n```"
  ],
  "terms": [
   [
    "Idempotence",
    "The property that repeating an operation produces the same result as doing it once, with no further changes."
   ],
   [
    "Drift",
    "A difference between real infrastructure and what the configuration and state describe, usually from manual changes."
   ],
   [
    "Refresh",
    "The part of planning where Terraform reads the current attributes of managed objects from the provider."
   ],
   [
    "Perpetual diff",
    "A change that appears in every plan because a value is non-deterministic or normalized differently by the API."
   ]
  ],
  "example": "A nightly pipeline runs `terraform plan` against production. Most nights it reports no changes. One morning it shows a firewall rule being modified back to its coded value, revealing that someone edited the rule in the console the day before.",
  "tip": "Expect a true/false question along the lines of 'running terraform apply twice with no configuration changes will create duplicate resources.' That is false: Terraform is idempotent and the second run makes no changes.",
  "check": [
   [
    "What should a second `terraform apply` report if nothing has changed since the first?",
    "No changes, because the real infrastructure already matches the configuration and state."
   ],
   [
    "Why can putting `timestamp()` directly in a resource argument break idempotence?",
    "Its value differs on every run, so each plan sees a new value and proposes a change."
   ]
  ]
 },
 {
  "t": "Terraform's plugin model: one workflow and language (HCL) for many providers",
  "body": [
   "Terraform itself knows nothing about AWS, Azure, GitHub or any particular platform. The core binary understands the language, builds dependency graphs, manages state and runs the plan and apply workflow. Everything platform-specific lives in providers, which are separate plugin programs that Terraform downloads and runs.",
   "Terraform core and a provider communicate over a remote procedure call (RPC) protocol. When you write `resource \"azurerm_resource_group\" \"main\"`, core looks at the prefix of the resource type, `azurerm`, finds the matching provider, and asks it to validate the arguments, plan the change and then perform it. The provider translates those requests into calls against the platform's API. This split is why HashiCorp can release Terraform core on one schedule and provider authors can release on their own.",
   "The result is one workflow and one language for many platforms. Whether you are managing a Kubernetes namespace, a Cloudflare DNS record or a virtual machine, you write HCL blocks, run `terraform init`, `terraform plan` and `terraform apply`, and read the same kind of plan output. Skills transfer: once you understand variables, outputs, modules, state and lifecycle rules, you only need to learn each provider's resource types and arguments, which the provider documentation lists.",
   "```hcl\nterraform {\n  required_providers {\n    aws    = { source = \"hashicorp/aws\" }\n    github = { source = \"integrations/github\" }\n  }\n}\n```",
   "Providers expose three main things to your configuration. Resources are objects Terraform creates and manages. Data sources are read-only lookups of information that already exists. Some providers also offer functions, called with a `provider::NAME::FUNCTION` syntax, although most everyday work uses Terraform's built-in functions. The provider also defines its own configuration block, for settings such as region, endpoint or credentials source.",
   "`terraform init` is the step that reads `required_providers`, downloads the right provider versions, usually from the public Terraform Registry, and installs them under the hidden `.terraform` directory in your working directory. Until you run init, plan and apply cannot work, because core has no plugin to talk to. When you add a new provider to a configuration you must run init again."
  ],
  "terms": [
   [
    "Terraform core",
    "The main Terraform binary that parses configuration, builds the dependency graph, manages state and drives the workflow."
   ],
   [
    "Provider",
    "A plugin that lets Terraform manage a specific platform or service by translating requests into its API calls."
   ],
   [
    "Plugin",
    "A separate executable that core launches and talks to over RPC; providers are plugins."
   ],
   [
    "Data source",
    "A read-only lookup, supplied by a provider, that fetches information about existing objects."
   ]
  ],
  "example": "A platform team manages AWS networking, Datadog monitors and PagerDuty schedules. Each uses a different provider, but engineers use the same init, plan and apply commands, the same variable and module patterns, and the same pull request review process for all three.",
  "tip": "If asked which component contains the code that talks to a cloud API, the answer is the provider, not Terraform core. Core handles language, graph, state and workflow.",
  "check": [
   [
    "How does Terraform know which provider handles a resource of type `google_storage_bucket`?",
    "By the type's prefix, `google`, which maps to the local provider name declared in `required_providers` (here `hashicorp/google`)."
   ],
   [
    "What must you run after adding a new provider to a configuration, and why?",
    "`terraform init`, because it downloads and installs the provider plugin that core needs before plan or apply can work."
   ]
  ]
 },
 {
  "t": "Multi-cloud and hybrid-cloud deployments from a single configuration",
  "body": [
   "Multi-cloud means using more than one public cloud provider, for example AWS for compute and Google Cloud for analytics. Hybrid cloud means combining public cloud with private or on-premises infrastructure, such as a VMware vSphere cluster in your own data center. Both are common in larger organizations, often for resilience, regulatory reasons, cost or because different teams chose different platforms.",
   "Each cloud has its own native IaC tool, such as AWS CloudFormation, Azure Resource Manager templates and Bicep, or Google Cloud Deployment Manager and its successors. Those tools work well within one platform but cannot manage resources on another. Terraform's provider model lets one configuration, one language and one workflow cover all of them. A single `terraform apply` can create resources in several clouds and on-premises systems, respecting dependencies between them.",
   "Cross-platform dependencies are where this shines. Imagine creating a load balancer in one cloud and a DNS record in a different DNS provider pointing at it. Because the DNS record's argument references the load balancer's address attribute, Terraform knows to create the load balancer first and pass the address along. With separate native tools you would have to run one, copy an output by hand or with glue scripts, and run the other.",
   "```hcl\nresource \"aws_lb\" \"app\" { ... }\n\nresource \"cloudflare_record\" \"app\" {\n  zone_id = var.zone_id\n  name    = \"app\"\n  type    = \"CNAME\"\n  content = aws_lb.app.dns_name\n}\n```",
   "Be careful not to overstate what Terraform does. It does not make clouds interchangeable. An `aws_instance` and an `azurerm_linux_virtual_machine` are different resource types with different arguments, and you cannot switch clouds by changing one word. What you gain is a common workflow, shared tooling for review, policy and state, and the ability to wire platforms together. Teams often wrap each platform's details in modules with similar inputs so the calling code looks alike.",
   "Multi-cloud setups also raise practical concerns you should recognize: each provider needs its own credentials, state for many platforms should be stored in a shared, secured backend, and very large configurations are often split into smaller ones, each with its own state, to limit the impact of a mistake. The argument code blocks in this lesson are abbreviated with `...` for readability."
  ],
  "terms": [
   [
    "Multi-cloud",
    "Using two or more public cloud providers together."
   ],
   [
    "Hybrid cloud",
    "Combining public cloud services with private or on-premises infrastructure."
   ],
   [
    "Native IaC tool",
    "A cloud vendor's own provisioning tool, such as CloudFormation or ARM templates, which only manages that vendor's resources."
   ],
   [
    "Cross-provider reference",
    "An expression in one provider's resource that uses an attribute from another provider's resource, creating an implicit dependency."
   ]
  ],
  "example": "A retailer runs its web tier in Azure, keeps a disaster recovery copy in AWS, and manages both plus its on-premises vSphere cluster from one repository. Engineers learn one workflow, and a failover DNS change is a reviewed pull request instead of a manual scramble.",
  "tip": "Exam questions contrast Terraform with CloudFormation or ARM templates: the Terraform advantage is managing many providers, including multiple clouds, with one workflow. It is not that the same resource block works on every cloud.",
  "check": [
   [
    "What Terraform feature makes multi-cloud deployment from one configuration possible?",
    "Its provider plugin model: each platform has a provider, and core drives them all with the same language and workflow."
   ],
   [
    "Can you move a workload from AWS to Azure by changing only the provider name in your configuration?",
    "No. Resource types and arguments are provider-specific, so you must rewrite those resources, though the workflow and tooling stay the same."
   ]
  ]
 },
 {
  "t": "Service-agnostic workflows: managing SaaS, DNS, Git, Kubernetes and monitoring tools with providers",
  "body": [
   "Terraform is often introduced as a cloud tool, but a provider can wrap any service that has an API. That is why Terraform is described as service-agnostic: the same workflow manages things that are not virtual machines at all. The Terraform Registry lists thousands of providers, covering DNS services, source control platforms, identity providers, monitoring and alerting tools, databases, content delivery networks and more.",
   "Consider what this lets you codify. DNS records can be managed with providers for services such as Cloudflare or cloud DNS offerings, so a new hostname is a reviewed change. Git platforms can be managed with providers such as `integrations/github`, letting you define repositories, branch protection rules and team access as code. Kubernetes objects such as namespaces and config maps can be managed with the `hashicorp/kubernetes` provider, and Helm releases with `hashicorp/helm`. Monitoring tools can have dashboards, alerts and on-call schedules defined in code.",
   "```hcl\nresource \"github_repository\" \"service\" {\n  name       = \"payments-api\"\n  visibility = \"private\"\n}\n\nresource \"github_branch_protection\" \"main\" {\n  repository_id = github_repository.service.node_id\n  pattern       = \"main\"\n}\n```",
   "The benefit is the same as for cloud resources: repeatability, review and audit history. It is also where the security payoff can be large. Branch protection that is defined in code cannot be quietly turned off without a visible change. Monitoring alerts that are part of the same configuration as the service they watch are created at the same time, so a new service is never deployed without them.",
   "There are also a few small utility providers you will meet in labs. The `hashicorp/random` provider generates random names, passwords and IDs. The `hashicorp/local` provider manages files on the machine running Terraform. The `hashicorp/tls` provider can create keys and certificates, and `hashicorp/http` can fetch data from a URL as a data source. These do not call a cloud at all, which makes them useful for learning and for gluing configurations together.",
   "One point to keep in mind: some things you can manage with Terraform, such as the contents of a Kubernetes cluster, may also be managed by other tools, such as a GitOps controller. Decide which tool owns which objects, because two tools managing the same object will fight each other and produce drift."
  ],
  "terms": [
   [
    "Service-agnostic",
    "Able to manage any service that exposes an API, as long as a provider exists for it."
   ],
   [
    "Terraform Registry",
    "The public catalog where providers and modules are published and from which `terraform init` downloads them by default."
   ],
   [
    "Utility provider",
    "A provider such as `random`, `local`, `tls` or `http` that supports configurations without managing a cloud platform."
   ],
   [
    "Branch protection",
    "Git platform rules, such as required reviews, that can be codified with a Git provider."
   ]
  ],
  "example": "When a team launches a new microservice, one pull request adds a Git repository with branch protection, a Kubernetes namespace, a DNS record and an alert policy. All four are created in one apply, and removing the service later removes all four cleanly.",
  "tip": "If a question asks whether Terraform can manage things like GitHub teams, DNS records or monitoring dashboards, the answer is yes, provided a provider exists for the service's API.",
  "check": [
   [
    "What does a service need for Terraform to manage it?",
    "An API and a Terraform provider that implements resources for that API."
   ],
   [
    "Name a provider that manages no remote infrastructure and what it is used for.",
    "`hashicorp/random`, which generates values such as names or passwords that are stored in state; `local` and `tls` are other examples."
   ]
  ]
 },
 {
  "t": "Terraform vs configuration management tools: provisioning infrastructure vs configuring software inside servers",
  "body": [
   "Terraform is a provisioning tool. It creates, updates and deletes infrastructure objects through APIs: networks, virtual machines, load balancers, databases, DNS records. Configuration management tools such as Ansible, Chef, Puppet and Salt focus on what happens inside a server once it exists: installing packages, writing configuration files, managing users and services, and keeping them in the desired condition over time.",
   "The boundary is not perfectly sharp. Ansible can create cloud resources, and Terraform can pass a startup script to a new virtual machine. But each tool is designed around a different model. Terraform tracks objects in a state file and plans changes against APIs. Configuration management tools usually connect to hosts, often over SSH or via an agent, and converge the operating system and applications toward a described configuration, repeatedly if needed.",
   "In practice teams combine them. Terraform builds the virtual machine and network, then either hands off to a configuration management tool or avoids the need for one. Common hand-off patterns include passing `user_data` or cloud-init scripts that run at first boot, having the new instance register with a configuration management server, or generating an inventory file for Ansible from Terraform outputs.",
   "Terraform does offer provisioners, such as `remote-exec` to run commands over SSH or WinRM and `local-exec` to run a command on the machine running Terraform. HashiCorp documents provisioners as a last resort. Terraform cannot model what a script did, so it cannot plan changes to it, detect drift inside the server or undo it cleanly. If a create-time provisioner fails, the resource is marked tainted and replaced on the next apply. Prefer cloud-init, prebuilt images or a proper configuration management tool.",
   "A third option avoids in-place configuration entirely: build a machine image with everything preinstalled, for example with HashiCorp Packer, and have Terraform launch instances from that image. When the software needs to change, you build a new image and replace the instances. That is the immutable infrastructure pattern covered in the next lesson.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  ami       = var.golden_image_id\n  user_data = file(\"${path.module}/cloud-init.yaml\")\n  ...\n}\n```"
  ],
  "terms": [
   [
    "Provisioning",
    "Creating and managing infrastructure resources themselves, such as servers and networks, typically through APIs."
   ],
   [
    "Configuration management",
    "Installing and maintaining software and settings inside existing servers, as done by Ansible, Chef, Puppet or Salt."
   ],
   [
    "Provisioner",
    "A Terraform block such as `local-exec` or `remote-exec` that runs commands; a last resort because its effects are not tracked."
   ],
   [
    "cloud-init / user_data",
    "A mechanism for passing a first-boot script or configuration to a new virtual machine."
   ]
  ],
  "example": "An operations team uses Terraform to create 20 web servers and a load balancer, and passes each server's address to an Ansible inventory. Ansible then installs the web server software and hardens the operating system, and runs again weekly to fix any drift inside the hosts.",
  "tip": "When the exam asks which tool is best for creating cloud networks and instances, pick Terraform; for managing packages and files inside running servers, pick configuration management. Provisioners are a last resort.",
  "check": [
   [
    "Why does HashiCorp call provisioners a last resort?",
    "Terraform cannot model or plan what a script does, so it cannot detect drift or reverse it; declarative alternatives such as cloud-init, images or configuration management are preferred."
   ],
   [
    "What happens to a resource if its create-time provisioner fails?",
    "It is marked tainted, so Terraform plans to replace it on the next apply."
   ]
  ]
 },
 {
  "t": "Immutable infrastructure: replace rather than patch in place",
  "body": [
   "In a mutable model, you keep servers running for a long time and change them in place: log in, apply patches, edit configuration files, upgrade software. Over months, each server accumulates its own history of changes, and two servers that started identical slowly diverge. These are sometimes called snowflake servers because no two are alike, and rebuilding one exactly becomes hard.",
   "Immutable infrastructure flips this. Once a component is deployed, you do not modify it. When something needs to change, you build a new version, deploy it alongside or instead of the old one, and destroy the old one. Every running instance is built from a known, versioned definition, so what runs in production is exactly what was tested.",
   "Terraform supports this pattern naturally. Many resource arguments cannot be changed on a live object; changing them forces replacement, which the plan marks with `-/+` and the note that the change forces replacement. For a virtual machine, changing the image ID is a typical example. The usual workflow is to bake a new machine image with Packer or a similar tool, update the image ID variable in Terraform, and apply. Terraform destroys the old instance and creates a new one.",
   "Replacement order matters for availability. By default Terraform destroys the old object before creating the new one. Adding `lifecycle { create_before_destroy = true }` reverses that: the new object is created first, and the old one is destroyed only after the new one succeeds. Combined with a load balancer, auto scaling group or rolling deployment, this gives zero or near-zero downtime updates.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  ami           = var.image_id\n  instance_type = \"t3.small\"\n\n  lifecycle {\n    create_before_destroy = true\n  }\n}\n```",
   "Benefits include consistency, easier rollback (redeploy the previous image), less configuration drift, and a smaller attack surface because no one needs to log in to production servers to change them. Security patches are applied by rebuilding images and replacing instances. The costs are that data must live outside the replaceable parts, in databases, object storage or attached volumes, and that your pipeline must be able to build and roll out new images quickly. Terraform does not force immutability; in-place updates remain available for arguments that support them."
  ],
  "terms": [
   [
    "Immutable infrastructure",
    "A practice where deployed components are never modified; changes are made by replacing them with new versions."
   ],
   [
    "Mutable infrastructure",
    "Servers that are updated and patched in place over their lifetime."
   ],
   [
    "Snowflake server",
    "A server whose configuration has drifted into something unique and hard to reproduce."
   ],
   [
    "Golden image",
    "A pre-built, versioned machine image containing the OS and software, used to launch identical instances."
   ],
   [
    "create_before_destroy",
    "A lifecycle setting that makes Terraform create the replacement before destroying the original."
   ]
  ],
  "example": "A critical OpenSSL patch is released. Instead of logging in to 50 servers, the team rebuilds its golden image with Packer, updates the image ID in Terraform, and applies. Instances are replaced behind the load balancer with `create_before_destroy`, and every server now runs the identical patched image.",
  "tip": "Know that Terraform's default replacement order is destroy then create, and that `create_before_destroy` reverses it. In plan output, `-/+` means replace (destroy then create), while `+/-` means create then destroy.",
  "check": [
   [
    "How is a patch applied in an immutable infrastructure model?",
    "By building a new image or artifact with the patch and replacing the running components, not by modifying them in place."
   ],
   [
    "What is Terraform's default order when a resource must be replaced, and how do you change it?",
    "Destroy the old object, then create the new one; set `lifecycle { create_before_destroy = true }` to create the new one first."
   ]
  ]
 },
 {
  "t": "Installing Terraform and pinning its version with `required_version`",
  "body": [
   "Terraform is distributed as a single executable binary called `terraform`. There is no server to run and no database to install; you put the binary somewhere on your PATH and run it. HashiCorp publishes builds for Linux, macOS and Windows on several processor architectures, and also package repositories so you can install and update it with tools such as `apt`, `yum` or `dnf`, Homebrew on macOS, or Chocolatey on Windows. Many teams also use a version manager so different projects can use different Terraform releases.",
   "After installing, confirm it works with `terraform version` (or `terraform -version`). The output shows the Terraform version, the platform, and, when run in an initialized directory, the provider versions in use. If a newer release is available, it also tells you. `terraform -help` lists the subcommands, and `terraform -install-autocomplete` sets up shell tab completion.",
   "Because Terraform's behavior and features change between releases, a configuration should state which Terraform versions it works with. That is the job of the `required_version` setting inside the top-level `terraform` block. It takes a version constraint string, and Terraform checks the running binary against it before doing anything else. If the running version does not satisfy the constraint, commands such as `init`, `plan` and `apply` stop with an error explaining the mismatch.",
   "```hcl\nterraform {\n  required_version = \">= 1.12.0, < 2.0.0\"\n}\n```",
   "Why pin? Imagine one teammate on a newer Terraform release applies a configuration and the state file is written in a way an older release does not expect, or a configuration relies on a language feature only available in recent versions. A clear constraint turns a confusing failure into an immediate, readable error. It also documents for future readers which version the code was written against. Pinning too tightly, such as an exact `= 1.12.1`, forces everyone to upgrade in lockstep, so most teams use a range or a pessimistic constraint such as `~> 1.12`.",
   "Two details are commonly tested. First, `required_version` constrains only the Terraform CLI version, not providers; providers are pinned separately in `required_providers`. Second, the `terraform` block settings must be literal values; you cannot use input variables or other expressions inside `required_version`. Child modules can also declare `required_version`, and every module in the configuration must be satisfied.",
   "In HCP Terraform, a workspace has its own Terraform version setting that chooses which binary runs remote operations, and that version must still satisfy the configuration's `required_version`."
  ],
  "terms": [
   [
    "terraform block",
    "The top-level block for settings about Terraform itself, such as `required_version`, `required_providers` and `backend`."
   ],
   [
    "required_version",
    "A version constraint that the running Terraform CLI must satisfy, or commands fail."
   ],
   [
    "terraform version",
    "Command that prints the installed Terraform version, platform and, in an initialized directory, provider versions."
   ],
   [
    "Version constraint",
    "A string of one or more conditions, such as `>= 1.12.0, < 2.0.0`, that a version must meet."
   ]
  ],
  "example": "A contractor with an old Terraform install runs `terraform plan` on your repository. Because the configuration says `required_version = \"~> 1.12\"`, Terraform stops immediately with an unsupported version error, and the contractor upgrades instead of getting confusing syntax errors from newer language features.",
  "tip": "Remember the split: `required_version` pins the Terraform CLI; `required_providers` pins providers. Neither accepts variables, because the `terraform` block only takes literal values.",
  "check": [
   [
    "Where is `required_version` declared and what does it constrain?",
    "In the top-level `terraform` block; it constrains which Terraform CLI versions may run the configuration."
   ],
   [
    "Can you set `required_version = var.tf_version`?",
    "No. Settings in the `terraform` block must be literal constants, not variables or expressions."
   ]
  ]
 },
 {
  "t": "The `required_providers` block: `source` addresses (hostname/namespace/type) and `version` constraints",
  "body": [
   "Every provider a module uses should be declared in a `required_providers` block nested inside the `terraform` block. Each entry maps a local name, which is how you refer to the provider inside this module, to two key settings: the `source` address that says where to find the provider, and a `version` constraint that says which releases are acceptable.",
   "```hcl\nterraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n    random = {\n      source  = \"hashicorp/random\"\n      version = \">= 3.5\"\n    }\n  }\n}\n```",
   "A source address has three parts: `HOSTNAME/NAMESPACE/TYPE`. The hostname is the registry that distributes the provider. It is optional and defaults to `registry.terraform.io`, the public Terraform Registry, so `hashicorp/aws` is shorthand for `registry.terraform.io/hashicorp/aws`. The namespace is the organization or person that publishes the provider, such as `hashicorp` for providers HashiCorp maintains or `integrations` for the GitHub provider. The type is the short provider name, such as `aws`, `azurerm` or `github`, and by convention it matches the prefix of that provider's resource types.",
   "Private registries use a different hostname. An organization using HCP Terraform's private registry, for example, would write a source whose hostname is the HCP Terraform address followed by the organization name and provider type. The format is the same; only the host changes. Terraform can also be configured to install providers from local mirrors, which is useful on networks without internet access.",
   "The local name, the key on the left such as `aws`, usually matches the type, and it is what you use in `provider \"aws\"` blocks and what Terraform matches against resource type prefixes. It only needs to be unique within the module. If two providers from different namespaces share a type name, you can give one of them a different local name.",
   "The `version` argument accepts a constraint string, explained fully in the next lesson. Constraints in `required_providers` are combined across all modules in the configuration: if the root module asks for `>= 5.0` and a child module asks for `< 6.0`, Terraform picks the newest version that satisfies both. The version actually selected is then recorded in the dependency lock file.",
   "If you use a resource without declaring its provider, Terraform assumes a source of `hashicorp/<prefix>`. That works for HashiCorp's own providers but fails or picks the wrong provider for everyone else, so always declare providers explicitly. Best practice is for reusable modules to state a minimum version, and for root modules to set an upper bound too."
  ],
  "terms": [
   [
    "required_providers",
    "Block inside `terraform` that declares each provider's local name, source address and version constraint."
   ],
   [
    "Source address",
    "The `HOSTNAME/NAMESPACE/TYPE` identifier telling Terraform where to download a provider."
   ],
   [
    "Namespace",
    "The publisher part of a source address, such as `hashicorp` or a company or user name."
   ],
   [
    "Local name",
    "The module-specific name for a provider, used in provider blocks and matched to resource type prefixes."
   ]
  ],
  "example": "A team adds the Datadog provider. They declare `datadog = { source = \"DataDog/datadog\", version = \"~> 3.0\" }` in `required_providers`, run `terraform init`, and Terraform downloads it from the public registry because no hostname was given.",
  "tip": "If a question shows `source = \"hashicorp/aws\"` and asks for the full address, the hidden default hostname is `registry.terraform.io`.",
  "check": [
   [
    "What are the three parts of a provider source address and which is optional?",
    "Hostname, namespace and type; the hostname is optional and defaults to `registry.terraform.io`."
   ],
   [
    "If the root module requires `aws` version `>= 5.0` and a child module requires `< 5.40`, what does Terraform choose?",
    "The newest available version satisfying both constraints, which is then recorded in the lock file."
   ]
  ]
 },
 {
  "t": "Version constraint operators: `=`, `!=`, `>=`, `<=`, and the pessimistic `~>`",
  "body": [
   "Terraform uses the same version constraint syntax for `required_version`, provider `version` arguments and module `version` arguments. A constraint is a string containing one or more conditions separated by commas, and a version is acceptable only if it meets all of them. Versions follow semantic versioning: MAJOR.MINOR.PATCH, where a major bump may break compatibility, a minor bump adds features and a patch bump fixes bugs.",
   "The operators are: `=` or no operator, meaning exactly this version; `!=`, excluding one version; `>`, `>=`, `<` and `<=`, the usual comparisons; and `~>`, the pessimistic constraint operator. For example, `\">= 1.2.0, < 2.0.0\"` allows anything from 1.2.0 up to but not including 2.0.0, and `\">= 3.5, != 3.7.1\"` allows 3.5 and newer while skipping one release known to have a bug.",
   "The pessimistic operator `~>` allows only the rightmost version component you wrote to increase. Read `~> 1.2.0` as at least 1.2.0 but below 1.3.0, so it accepts 1.2.0, 1.2.9 and so on: new patches only. Read `~> 1.2` as at least 1.2 but below 2.0, so it accepts 1.3, 1.10 and any 1.x from 1.2 up: new minor and patch releases, but no new major version. The number of components you write therefore decides how much freedom you allow.",
   "```hcl\nversion = \"~> 5.0\"      # >= 5.0.0, < 6.0.0\nversion = \"~> 5.31.0\"   # >= 5.31.0, < 5.32.0\nversion = \"= 3.6.2\"     # exactly 3.6.2\nversion = \">= 2.0, < 3.0\"\n```",
   "Pre-release versions, such as `1.5.0-beta1`, are matched only by an exact `=` constraint (or no operator); range operators ignore them, so you will not accidentally pick up a beta.",
   "Which style should you choose? HashiCorp's guidance is that reusable modules should specify only a minimum version, for example `>= 5.0`, so they combine easily with other modules, while root modules should use `~>` or an explicit range to avoid surprise major upgrades. Exact pins are rarely needed for providers because the lock file already records the exact version selected; the constraint describes what is allowed when someone deliberately upgrades with `terraform init -upgrade`.",
   "A common exam trap is reading `~> 1.2` as the same as `~> 1.2.0`. The first allows 1.9; the second does not. Work it out by dropping the last component you wrote and incrementing the one before it to find the exclusive upper bound."
  ],
  "terms": [
   [
    "Semantic versioning",
    "Versioning scheme MAJOR.MINOR.PATCH where major changes may break compatibility, minor adds features and patch fixes bugs."
   ],
   [
    "Pessimistic constraint (~>)",
    "Allows only the rightmost specified version component to increase."
   ],
   [
    "Exact constraint (=)",
    "Allows only one specific version; also the only way to select a pre-release."
   ],
   [
    "Exclusion (!=)",
    "Rejects a specific version while allowing others permitted by the remaining conditions."
   ]
  ],
  "example": "A provider release 4.12.0 has a bug that breaks your load balancer settings. You set `version = \"~> 4.11, != 4.12.0\"` so the team stays on 4.x, skips the broken release, and still picks up 4.12.1 once the fix ships.",
  "tip": "Upper bound rule for `~>`: remove the last written component and add one to the new last component. `~> 2.1.3` means < 2.2.0; `~> 2.1` means < 3.0.",
  "check": [
   [
    "Does `~> 1.4.0` allow version 1.5.0?",
    "No. It allows >= 1.4.0 and < 1.5.0, so only patch releases of 1.4."
   ],
   [
    "What does `\"~> 3.0\"` allow?",
    "Any version from 3.0.0 up to but not including 4.0.0."
   ],
   [
    "What constraint style does HashiCorp recommend for reusable modules?",
    "A minimum version such as `>= 5.0`, leaving tighter upper bounds to the root module."
   ]
  ]
 },
 {
  "t": "The dependency lock file `.terraform.lock.hcl`: what it records and why it is committed",
  "body": [
   "Version constraints say which provider versions are acceptable. They do not guarantee that everyone uses the same version. If your constraint is `~> 5.0` and a new 5.x release comes out tomorrow, a teammate who initializes a fresh clone could get a different version from you. The dependency lock file, `.terraform.lock.hcl`, solves this.",
   "When `terraform init` installs providers, it writes or updates `.terraform.lock.hcl` in the root module directory. For each provider it records the full source address, the exact version selected, the constraints that were in effect, and a set of checksums (hashes) of the provider packages. On later runs of `init`, Terraform reuses the recorded version rather than picking the newest allowed one, and verifies that downloaded packages match the recorded hashes.",
   "```hcl\nprovider \"registry.terraform.io/hashicorp/random\" {\n  version     = \"3.6.2\"\n  constraints = \"~> 3.5\"\n  hashes = [\n    \"h1:...\",\n    \"zh:...\",\n  ]\n}\n```",
   "Commit this file to version control. That way your laptop, your teammates' laptops, the CI pipeline and HCP Terraform all use exactly the same provider versions, and a change of provider version appears as a visible diff in a pull request. The hashes also add a supply-chain safeguard: if a downloaded package does not match a recorded checksum, init fails instead of running an unexpected binary.",
   "To move to a newer provider version within your constraints, run `terraform init -upgrade`. Terraform ignores the locked versions, selects the newest allowed versions, and rewrites the lock file, which you then review and commit. If you changed a constraint so that the locked version no longer satisfies it, init reports an error and tells you to use `-upgrade`.",
   "Hashes are platform-specific. If developers use macOS but the pipeline runs Linux, a lock file created on a Mac may only contain hashes for the Mac package. The `terraform providers lock` command can pre-populate hashes for several platforms, for example with `-platform=linux_amd64 -platform=darwin_arm64`.",
   "Two details are commonly tested. The lock file tracks providers only; it does not lock module versions, which you pin with the module block's `version` argument. And it is different from the `.terraform` directory, which holds the downloaded plugins and modules and should not be committed; add `.terraform/` to `.gitignore`."
  ],
  "terms": [
   [
    "Dependency lock file",
    "`.terraform.lock.hcl`, which records the exact provider versions and package checksums selected by `terraform init`."
   ],
   [
    "terraform init -upgrade",
    "Re-selects the newest provider (and module) versions allowed by constraints and updates the lock file."
   ],
   [
    "Checksum (hash)",
    "A fingerprint of a provider package used to verify that the downloaded file is the expected one."
   ],
   [
    ".terraform directory",
    "Local working directory where init stores downloaded providers and modules; not committed."
   ]
  ],
  "example": "A pipeline suddenly fails after a provider's new minor release changed a default. The team had not committed the lock file, so CI picked the newest version. After committing `.terraform.lock.hcl`, CI uses the same version as the developers until someone deliberately runs `terraform init -upgrade`.",
  "tip": "Lock file: commit it. `.terraform/` directory: do not commit it. And the lock file covers providers, not modules.",
  "check": [
   [
    "What command updates the provider versions recorded in `.terraform.lock.hcl`?",
    "`terraform init -upgrade`, which selects the newest versions allowed by the constraints and rewrites the file."
   ],
   [
    "Does the dependency lock file pin module versions?",
    "No. It only tracks providers; module versions are constrained with the `version` argument in module blocks."
   ]
  ]
 },
 {
  "t": "How providers work: plugins that call APIs, downloaded by `terraform init` from the Terraform Registry",
  "body": [
   "A provider is a separate program, usually written in Go using HashiCorp's plugin framework, that knows how to manage one platform. Terraform core starts the provider process when it needs it and talks to it over a local RPC protocol. The provider receives requests such as validate this resource configuration, plan this change, create this object or read this object's current state, and turns each one into calls to the platform's API, using the credentials and settings in its provider configuration.",
   "Each provider defines a schema: the resource types and data sources it offers, their arguments and attributes, which arguments are required or optional, which are computed by the platform, and which changes force a replacement. Terraform core uses the schema to type-check your configuration, and the provider's documentation on the registry is generated from it, which is why every resource page lists argument and attribute references.",
   "Providers are installed by `terraform init`. Init reads `required_providers` from every module, resolves a version satisfying all constraints and the lock file, downloads the package for your operating system and architecture, verifies it and places it in `.terraform/providers` inside the working directory. By default packages come from the public Terraform Registry at `registry.terraform.io`, but init can also use private registries, network mirrors, filesystem mirrors, or a shared plugin cache directory configured in the CLI configuration file to avoid downloading the same provider for every project.",
   "```text\n$ terraform init\nInitializing provider plugins...\n- Finding hashicorp/aws versions matching \"~> 5.0\"...\n- Installing hashicorp/aws v5.x.y...\n- Installed hashicorp/aws v5.x.y (signed by HashiCorp)\nTerraform has created a lock file .terraform.lock.hcl\n```",
   "The output also tells you who signed the package. Terraform checks provider signatures during installation from a registry, which helps ensure you are running the publisher's genuine build.",
   "Because providers are versioned independently from Terraform, a new cloud service can be supported by a provider release without waiting for a Terraform release. It also means provider upgrades can change behavior, which is why you pin versions and review lock file changes.",
   "Once installed, providers are used in every plan and apply. During planning, Terraform asks each provider to read the current state of managed objects (refresh) and to compute the planned change for each resource. During apply, it asks the provider to carry out each change, in dependency order, and records the returned attributes in state."
  ],
  "terms": [
   [
    "Provider schema",
    "The provider's definition of its resource types, data sources, arguments and attributes."
   ],
   [
    "Plugin cache",
    "An optional shared directory where init stores provider packages so they can be reused across working directories."
   ],
   [
    "Provider mirror",
    "A local or network copy of provider packages used instead of the public registry, for example on isolated networks."
   ],
   [
    "Computed attribute",
    "A value set by the provider or platform after creation, such as an ID, rather than by your configuration."
   ]
  ],
  "example": "A new team member clones the repository and runs `terraform plan`. It fails, saying the required providers are not installed. After running `terraform init`, the AWS provider is downloaded into `.terraform/providers` at the version recorded in the lock file, and plan now works.",
  "tip": "Providers are installed by `terraform init`, not by plan or apply, and by default come from the public Terraform Registry. Adding or changing a provider always requires running init again.",
  "check": [
   [
    "Where does `terraform init` put downloaded provider plugins?",
    "In the `.terraform/providers` directory inside the working directory, unless a shared plugin cache is configured."
   ],
   [
    "What part of Terraform translates a planned change into API calls?",
    "The provider plugin; Terraform core sends it requests over RPC and it calls the platform's API."
   ]
  ]
 },
 {
  "t": "Provider tiers in the registry: official, partner and community",
  "body": [
   "Anyone can publish a provider to the public Terraform Registry, so the registry labels each provider with a tier that tells you who publishes and maintains it. Knowing the tiers helps you judge how much to trust a provider and who to go to when something breaks. The exam tests the three main tiers.",
   "Official providers are owned and maintained by HashiCorp. They live under the `hashicorp` namespace, such as `hashicorp/aws`, `hashicorp/azurerm`, `hashicorp/google`, `hashicorp/kubernetes` and utility providers like `hashicorp/random`. Some of these are developed jointly with the cloud vendor, but HashiCorp is the publisher. The registry shows an official badge on them.",
   "Partner providers are written, maintained, validated and published by third-party companies against their own APIs, and those companies take part in HashiCorp's Technology Partner Program. They live under the company's own namespace, for example a monitoring or security vendor publishing a provider for its SaaS product. The partner badge tells you the vendor has been through HashiCorp's partner process and stands behind the provider.",
   "Community providers are published by individual maintainers, groups of maintainers or other members of the community, under their own namespaces. Many are high quality and widely used; others are experiments or unmaintained. You get no vendor support promise, so check the repository activity, open issues, documentation and license before depending on one in production.",
   "The registry also marks archived providers, which are official or partner providers that are no longer maintained by HashiCorp or the community, typically because the API was deprecated or interest dropped. They still exist so old configurations keep working, but you should plan to migrate.",
   "Tiers do not change how a provider works technically. All of them are declared in `required_providers`, installed by `terraform init`, verified by checksum and signature, and used the same way. What changes is trust and support. A security-conscious organization might allow official and partner providers freely but require review of community providers, or host approved providers in a private registry or mirror so engineers cannot pull arbitrary plugins.",
   "Organizations that want tighter control can go further: HCP Terraform's private registry lets an organization publish its own approved providers and modules for internal use. For the exam, focus on the three provider tiers and who maintains each."
  ],
  "terms": [
   [
    "Official provider",
    "Provider owned and maintained by HashiCorp, published under the `hashicorp` namespace."
   ],
   [
    "Partner provider",
    "Provider written and maintained by a third-party company in HashiCorp's Technology Partner Program, published under the company's namespace."
   ],
   [
    "Community provider",
    "Provider published by individuals or groups in the community, with no HashiCorp or vendor support guarantee."
   ],
   [
    "Archived provider",
    "A provider that is no longer maintained, kept available so existing configurations still work."
   ]
  ],
  "example": "A team wants to manage a niche network appliance. The only provider is a community one updated two years ago with many open issues. They test it in a lab, decide the risk is acceptable for a non-production environment only, and record that decision in their provider approval list.",
  "tip": "The namespace is the quick clue: `hashicorp/...` means official. Partner providers are maintained by the technology company that owns the API; community providers by individuals or groups.",
  "check": [
   [
    "Who maintains a partner-tier provider?",
    "The third-party technology company that owns the service, as a member of HashiCorp's Technology Partner Program."
   ],
   [
    "Does a provider's tier change how you declare or install it?",
    "No. All tiers are declared in `required_providers` and installed by `terraform init`; the tier indicates who publishes and supports it."
   ]
  ]
 },
 {
  "t": "Provider configuration blocks, multiple configurations with `alias`, and the `provider` meta-argument",
  "body": [
   "Declaring a provider in `required_providers` tells Terraform what to install. A `provider` block tells it how to configure that provider: which region or endpoint to use, which account or project, and sometimes how to authenticate. Provider blocks belong in the root module; reusable child modules should normally not contain them and instead receive configurations from the caller.",
   "```hcl\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nprovider \"aws\" {\n  alias  = \"west\"\n  region = \"us-west-2\"\n}\n```",
   "The first block is the default configuration for the `aws` provider. Any AWS resource that does not say otherwise uses it. The second block is an additional configuration distinguished by `alias`. You can have one default and as many aliased configurations as you need, for different regions, accounts or credentials. If you only have aliased blocks and no default, resources that do not specify a provider fall back to an empty default configuration, which may fail if required settings are missing.",
   "To choose a non-default configuration, use the `provider` meta-argument on a resource or data block, with the reference `<PROVIDER>.<ALIAS>`, written as a bare reference, not a quoted string. A meta-argument is an argument that Terraform itself interprets and that works on any resource type, unlike the provider-specific arguments.",
   "```hcl\nresource \"aws_s3_bucket\" \"replica\" {\n  provider = aws.west\n  bucket   = \"example-replica-bucket\"\n}\n```",
   "For modules, you pass configurations with the `providers` map on the module block, such as `providers = { aws = aws.west }`. A module that needs more than one configuration of the same provider declares the extra names with `configuration_aliases` inside its `required_providers` entry.",
   "Credentials deserve care. Provider blocks can accept keys directly, but hard-coding secrets in `.tf` files puts them in version control. Prefer environment variables, shared credential files, instance or workload identity, or dynamic credentials from HCP Terraform or Vault. Provider arguments can use input variables and data from other sources, but values must be known during planning; a provider configuration that depends on attributes not yet created can cause problems, so keep provider settings simple.",
   "Common reasons for aliases include deploying to multiple regions, managing resources in several accounts with different assumed roles, and creating a DNS or certificate resource that must live in a specific region while the rest of the stack lives elsewhere."
  ],
  "terms": [
   [
    "provider block",
    "Configuration for a provider, such as region, endpoint or authentication settings, normally placed in the root module."
   ],
   [
    "alias",
    "An argument that names an additional, non-default configuration of the same provider."
   ],
   [
    "provider meta-argument",
    "An argument on a resource or data block, like `provider = aws.west`, that selects a specific provider configuration."
   ],
   [
    "Meta-argument",
    "An argument handled by Terraform itself and usable on any resource type, such as `count`, `for_each`, `depends_on`, `provider` and `lifecycle`."
   ]
  ],
  "example": "A company keeps its application in `eu-west-1` but must create a certificate in `us-east-1` for its content delivery network. It adds a second `aws` provider block with `alias = \"use1\"` and sets `provider = aws.use1` on only the certificate resource.",
  "tip": "The reference is `aws.west`, not `\"aws.west\"` and not `aws-west`. Resources without a `provider` argument use the default (unaliased) configuration.",
  "check": [
   [
    "How do you create two configurations of the same provider in one module?",
    "Write two `provider` blocks for it and give one (or more) an `alias`; the unaliased one is the default."
   ],
   [
    "How does a resource use a non-default provider configuration?",
    "By setting the `provider` meta-argument to `<name>.<alias>`, for example `provider = google.europe`."
   ]
  ]
 },
 {
  "t": "Using several different providers in one configuration",
  "body": [
   "A single Terraform configuration can use as many providers as it needs. You declare each one in `required_providers`, configure each with its own `provider` block if it needs settings, and then write resources of any of their types side by side. `terraform init` installs them all, and one plan shows changes across every platform.",
   "```hcl\nterraform {\n  required_providers {\n    docker = { source = \"kreuzwerker/docker\", version = \"~> 3.0\" }\n    local  = { source = \"hashicorp/local\" }\n    random = { source = \"hashicorp/random\" }\n  }\n}\n\nprovider \"docker\" {}\n\nresource \"random_pet\" \"name\" {}\n\nresource \"docker_container\" \"web\" {\n  name  = random_pet.name.id\n  image = \"nginx:latest\"\n}\n\nresource \"local_file\" \"note\" {\n  filename = \"container.txt\"\n  content  = docker_container.web.name\n}\n```",
   "Notice how the resources connect. The container's name comes from `random_pet`, and the file's content comes from the container. These references create implicit dependencies, so Terraform creates the random name first, then the container, then the file, even though three different providers are involved. This is the core advantage over running separate tools: Terraform sees one dependency graph that spans providers.",
   "Terraform maps each resource to its provider using the prefix of the resource type: `docker_container` goes to the provider whose local name is `docker`, `local_file` to `local`, and so on. Many providers, like `random` and `local`, need no configuration at all, so you can omit their `provider` blocks and Terraform uses an empty default configuration.",
   "A few practical considerations come with multi-provider configurations. Each provider has its own authentication, so the environment running Terraform needs credentials for all of them. Plans take longer as more APIs are refreshed. A failure in one provider's API can stop an apply part-way, leaving earlier resources created; Terraform records what succeeded in state, and the next apply continues from there. And very large configurations spanning many providers can become hard to manage, so teams often split them into separate root modules along team or lifecycle lines and pass values between them through outputs and data sources.",
   "This pattern is what the week's lab asks you to try: adding the third-party `kreuzwerker/docker` provider next to `local` shows one workflow managing two unrelated platforms. Run `terraform providers` to list every provider the configuration requires and which module requires it."
  ],
  "terms": [
   [
    "Resource type prefix",
    "The part of a resource type before the first underscore, such as `docker` in `docker_container`, which selects the provider."
   ],
   [
    "terraform providers",
    "Command that shows the providers required by the configuration and its modules."
   ],
   [
    "Dependency graph",
    "Terraform's internal map of which objects depend on which, used to order operations across all providers."
   ],
   [
    "Partial apply",
    "An apply that stops after some changes succeed; state records completed work so the next run can continue."
   ]
  ],
  "example": "A startup's configuration creates a managed database in its cloud provider, stores the generated password from the `random` provider in a secrets manager, and creates an uptime check in a monitoring SaaS pointing at the new endpoint, all in one plan.",
  "tip": "You do not need a separate configuration or command per provider. One configuration, one init and one apply can manage all of them, and references between them create dependencies automatically.",
  "check": [
   [
    "How does Terraform decide the creation order when resources from different providers reference each other?",
    "It builds a single dependency graph from the references, so a resource is created after anything it references, regardless of provider."
   ],
   [
    "Do you need a `provider` block for every provider you use?",
    "No. Providers that need no settings, such as `random` or `local`, can be used with only a `required_providers` entry."
   ]
  ]
 },
 {
  "t": "What state is for: mapping configuration to real objects, tracking metadata and dependencies, speeding up plans",
  "body": [
   "Terraform keeps a state file, by default `terraform.tfstate` in the working directory, that records what it manages. Beginners sometimes ask why Terraform cannot just look at the cloud. The answer is that state serves several purposes that the cloud's API alone cannot.",
   "The first and most important is mapping configuration to real objects. Your configuration says `aws_instance.web`; the cloud knows about an instance with ID `i-0abc...`. State records that this particular address corresponds to that particular ID. Without it, Terraform could not tell which of hundreds of instances in an account it created, which ones someone else created, or whether `aws_instance.web` already exists. Each resource address in state is bound to exactly one remote object.",
   "The second is tracking metadata, especially dependencies. When you remove a resource block from the configuration, the configuration no longer tells Terraform what that resource depended on. State remembers the dependencies, so Terraform can destroy objects in the correct order even though the code describing them is gone. State also records which provider configuration manages each resource, and other bookkeeping.",
   "The third is performance. For every managed object, state stores the attributes last seen. By default, Terraform refreshes these during plan by querying the provider, but in large infrastructures that can mean many API calls. State lets Terraform work from cached values where appropriate, and options such as `-refresh=false` let you plan quickly from state alone, at the cost of not detecting drift.",
   "State also enables syncing in teams. When state is kept in a shared remote backend, such as HCP Terraform or an object storage bucket, everyone works against the same record of reality, and state locking stops two people applying at once. Local state on one laptop cannot be shared safely, which is why teams move to remote backends early.",
   "Treat state as Terraform's private data. Do not edit the JSON by hand. When you need to change it, use commands designed for the purpose, such as `terraform state list` and `terraform state show` to read, `terraform state mv` or a `moved` block to rename addresses, `terraform state rm` or a `removed` block to stop managing an object, and `import` blocks or `terraform import` to adopt existing objects. Terraform keeps a `terraform.tfstate.backup` of the previous local state when it writes a new one."
  ],
  "terms": [
   [
    "State",
    "Terraform's record of the real objects it manages, their attributes and metadata, stored in `terraform.tfstate` or a remote backend."
   ],
   [
    "Resource address",
    "The identifier of a resource in configuration and state, such as `aws_instance.web` or `module.net.aws_vpc.main`."
   ],
   [
    "Backend",
    "Where Terraform stores state, such as local disk, HCP Terraform or a cloud storage service."
   ],
   [
    "State locking",
    "A mechanism that prevents concurrent operations from writing the same state at once."
   ]
  ],
  "example": "An engineer deletes the `terraform.tfstate` file thinking it is a cache. The next plan proposes creating every resource again because Terraform no longer knows they exist, and apply would fail with name conflicts or create duplicates. Restoring the backup or remote copy fixes the mapping.",
  "tip": "If asked for the primary purpose of state, choose mapping resources in configuration to real-world objects. Metadata such as dependencies and performance caching are the other listed purposes.",
  "check": [
   [
    "Why does Terraform need state to destroy a resource whose block you removed from configuration?",
    "State still records the resource's ID, provider and dependencies, so Terraform knows what to delete and in what order."
   ],
   [
    "What trade-off does `terraform plan -refresh=false` make?",
    "It is faster because it skips querying providers, but it cannot detect drift made outside Terraform."
   ]
  ]
 },
 {
  "t": "State contents: resource attributes, including sensitive values, in plain JSON",
  "body": [
   "The state file is a JSON document. Open a local `terraform.tfstate` in a text editor and you will see a format version, the Terraform version that wrote it, a serial number that increases with every write, a lineage identifier that ties all versions of one state together, the root module's outputs, and a `resources` list. Each resource entry records its mode (managed or data), type, name, provider, and one or more instances with their full attribute values and dependencies.",
   "The important security point is that state contains every attribute Terraform knows about, and that includes sensitive values. A database resource's password argument, a generated `random_password` result, private keys created by the `tls` provider, and access keys returned by an identity resource are all stored, in plaintext, in the state file. Marking a variable or output `sensitive = true` hides the value from plan output and the console, but it does not remove or encrypt it in state.",
   "```json\n{\n  \"version\": 4,\n  \"serial\": 7,\n  \"resources\": [\n    {\n      \"mode\": \"managed\",\n      \"type\": \"random_password\",\n      \"name\": \"db\",\n      \"instances\": [ { \"attributes\": { \"result\": \"(plaintext secret here)\" } } ]\n    }\n  ]\n}\n```",
   "Because of this, you should treat state as sensitive data. Do not commit `terraform.tfstate` or its backup to Git; add them to `.gitignore`. Store state in a remote backend that encrypts data at rest and in transit and restricts who can read it, such as HCP Terraform, or a cloud storage bucket with encryption, versioning and tight access policies. Limit which people and pipelines can read state, since reading state can be equivalent to reading every secret in it. Saved plan files also contain sensitive data and need the same care.",
   "Newer Terraform versions reduce how many secrets reach state. Ephemeral values, such as ephemeral input variables and ephemeral resources, exist only during a run and are never written to state or plan files. Write-only arguments let a provider accept a value, such as a password, that Terraform sends to the API but does not store. Using a secrets manager and reading secrets at runtime, rather than generating them in Terraform, is another way to keep them out of state.",
   "To inspect state safely, use the CLI rather than opening the file: `terraform state list` shows resource addresses, `terraform state show ADDRESS` shows one resource's attributes with sensitive values redacted, and `terraform show -json` gives a machine-readable view. `terraform output -json` reveals sensitive output values in plaintext, which is useful for scripts but should be handled carefully."
  ],
  "terms": [
   [
    "terraform.tfstate",
    "The default local state file, a JSON document recording managed resources and their attributes."
   ],
   [
    "sensitive",
    "A flag on variables and outputs that redacts values in CLI output; the values are still stored in state."
   ],
   [
    "Ephemeral value",
    "A value that exists only during a Terraform run and is never persisted to state or plan files."
   ],
   [
    "Serial and lineage",
    "State metadata: the serial increments on each write, and the lineage identifies a single state's history."
   ]
  ],
  "example": "A security scan of a public repository finds a committed `terraform.tfstate` containing a database administrator password. The team rotates the password, removes the file from history, adds state files to `.gitignore`, and moves state to an encrypted remote backend with restricted access.",
  "tip": "`sensitive = true` hides values from output, not from state. The correct protection for secrets in state is a secure, encrypted, access-controlled backend, plus ephemeral values or write-only arguments where available.",
  "check": [
   [
    "Is a variable marked `sensitive = true` encrypted in the state file?",
    "No. It is redacted from plan and CLI output, but state stores it in plaintext JSON, so state itself must be protected."
   ],
   [
    "Name two ways to keep a secret out of state entirely in recent Terraform versions.",
    "Use ephemeral values (ephemeral variables or resources) or write-only arguments, which Terraform does not persist."
   ]
  ]
 },
 {
  "t": "The Write → Plan → Apply workflow for individuals and teams",
  "body": [
   "Terraform's core workflow has three steps. Write: author or change configuration as code. Plan: preview the changes Terraform would make. Apply: carry out those changes, after someone has approved them. The steps are the same whether you are working alone or in a large organization; what changes is who does each step and where.",
   "For an individual practitioner, the loop is tight and local. You edit `.tf` files in your editor, usually in a Git repository. You run `terraform init` once (and again when providers, modules or the backend change), then run `terraform plan` often, the way a programmer runs tests, to see whether your edit produces the changes you expect and to catch errors early. When the plan looks right, you run `terraform apply`, read the plan it shows once more, and type `yes`. Then you commit the code and push it.",
   "For a team, the same steps are spread across people and tools so that no one changes shared infrastructure from a laptop without review. A typical team flow looks like this:",
   "```text\n1. Write:  create a branch, change the code, push, open a pull request\n2. Plan:   CI or HCP Terraform runs a speculative plan and posts it to the PR\n3. Review: teammates review the code diff and the plan output together\n4. Apply:  after approval and merge, the pipeline or HCP Terraform applies\n```",
   "Several practices make the team workflow safe. State lives in a shared remote backend with locking, so two applies cannot collide. Credentials for applying to production live in the pipeline or HCP Terraform, not on individual machines. Formatting and validation (`terraform fmt -check`, `terraform validate`) run automatically, and policy checks can block plans that break rules, such as unencrypted storage. The plan that reviewers approved should be the plan that is applied, which is why pipelines often save it with `plan -out` and apply that file.",
   "HCP Terraform builds this team workflow in. A workspace can be linked to a version control repository so that opening a pull request triggers a speculative plan, which shows changes but can never be applied, and merging to the main branch triggers a real run that waits for confirmation unless auto-apply is enabled. Runs execute remotely with shared state, variables and access controls.",
   "Whichever way you work, keep the discipline of reading the plan before approving. The plan is the moment to notice an unexpected destroy, a replacement of a database, or a change caused by drift that nobody expected. Skipping it with `-auto-approve` is appropriate in automation only when an approval gate already exists earlier in the process."
  ],
  "terms": [
   [
    "Core workflow",
    "Terraform's Write, Plan and Apply cycle for changing infrastructure."
   ],
   [
    "Speculative plan",
    "A plan run for review only, such as on a pull request, that cannot be applied."
   ],
   [
    "Remote backend",
    "Shared state storage, such as HCP Terraform, that lets a team use one state safely with locking."
   ],
   [
    "Pull request",
    "A request to merge code changes that lets teammates review them, often with plan output attached."
   ]
  ],
  "example": "A developer opens a pull request adding a cache cluster. HCP Terraform posts a speculative plan showing one resource to add. A reviewer notices the plan also replaces a subnet because of an unrelated typo, the author fixes it, and after merge the run applies only the intended change.",
  "tip": "Know the order and purpose: Write (code), Plan (preview and review), Apply (provision). In teams the plan is reviewed alongside the code before anything is applied.",
  "check": [
   [
    "In a team workflow, when is infrastructure actually changed?",
    "Only at the Apply step, after the code and its plan have been reviewed and approved, usually by a pipeline or HCP Terraform rather than a laptop."
   ],
   [
    "What is a speculative plan?",
    "A plan run to show proposed changes, for example on a pull request, that cannot itself be applied."
   ]
  ]
 },
 {
  "t": "`terraform init`: backend setup, provider and module download, `-upgrade`, `-migrate-state`, `-reconfigure`, `-backend-config`",
  "body": [
   "`terraform init` prepares a working directory so that other commands can run. It is the first command you run in a new or freshly cloned configuration, and you run it again whenever you add or change providers, modules or backend settings. It is safe to run repeatedly; it never changes your infrastructure.",
   "Init does three main jobs. It initializes the backend, reading the `backend` block (or `cloud` block for HCP Terraform) and connecting to where state is stored. It installs modules referenced by `module` blocks, copying registry and Git modules into `.terraform/modules`; local path modules are referenced in place. And it installs providers as required by `required_providers` and the lock file, writing or updating `.terraform.lock.hcl`. Everything downloaded goes under the `.terraform` directory.",
   "`-upgrade` tells init to ignore the versions already selected and pick the newest provider and module versions allowed by your constraints. Use it deliberately when you want to upgrade, then review and commit the lock file change.",
   "When you change the backend configuration, for example moving from local state to a cloud storage backend, init notices and asks what to do with existing state. `-migrate-state` copies the existing state to the new backend, prompting for confirmation. `-reconfigure` does the opposite: it ignores the saved backend configuration and existing state and sets up the new backend fresh, without migrating anything. Use `-reconfigure` when you are pointing at a backend that already holds the right state, or when you intentionally want to start clean; using it by mistake can make it look as though your resources have vanished from state.",
   "`-backend-config` supplies backend settings at init time, which is called partial configuration. You can leave some arguments out of the `backend` block and pass them as `-backend-config=\"key=value\"` pairs or as a file of settings. This is useful for keeping environment-specific values, or credentials, out of the committed code, since backend blocks cannot use variables.",
   "```hcl\nterraform {\n  backend \"s3\" {}\n}\n```",
   "```text\nterraform init \\\n  -backend-config=\"bucket=acme-tfstate\" \\\n  -backend-config=\"key=network/prod.tfstate\" \\\n  -backend-config=\"region=us-east-1\"\n```",
   "Other useful options include `-input=false` for automation, so init fails rather than prompting. If init fails, other commands will report that the directory is not initialized or that required plugins are missing, which is your cue to run it again."
  ],
  "terms": [
   [
    "terraform init",
    "Command that initializes a working directory: configures the backend and installs modules and providers."
   ],
   [
    "-migrate-state",
    "Init option that copies existing state to a newly configured backend."
   ],
   [
    "-reconfigure",
    "Init option that configures the backend fresh, ignoring saved settings and not migrating state."
   ],
   [
    "Partial configuration",
    "Leaving backend settings out of code and supplying them with `-backend-config` at init time."
   ]
  ],
  "example": "A team outgrows local state. They add an `s3` backend block, run `terraform init -migrate-state`, confirm the prompt, and their existing state is copied to the bucket. Teammates then run plain `terraform init` on fresh clones and see the same state.",
  "tip": "`-migrate-state` moves state to the new backend; `-reconfigure` does not. `-upgrade` changes provider and module versions. None of init's options change real infrastructure.",
  "check": [
   [
    "You changed the backend block and want your current state copied to the new location. Which init option do you use?",
    "`terraform init -migrate-state`."
   ],
   [
    "Why would you use `-backend-config` instead of writing values in the backend block?",
    "Backend blocks cannot use variables, so partial configuration lets you supply environment-specific or secret settings at init time without committing them."
   ]
  ]
 },
 {
  "t": "`terraform validate`: syntax and internal consistency checks without contacting provider APIs",
  "body": [
   "`terraform validate` checks whether a configuration is syntactically valid and internally consistent. It answers the question: could Terraform make sense of this code at all? It does not answer whether the infrastructure change will succeed, because it never contacts remote services, neither the provider APIs nor remote state.",
   "What does validate catch? Syntax errors such as a missing closing brace or an unquoted string. References to things that do not exist, such as `var.region` when no `variable \"region\"` block is declared, or `aws_instance.web.ip` when the attribute is named differently. Missing required arguments and unknown arguments for a resource type. Type mismatches, such as passing a string where a list is expected. Invalid meta-argument use, such as using `count` and `for_each` together on the same resource.",
   "To check resource arguments, validate needs the provider schemas, which means the directory must be initialized with `terraform init` first so the providers are installed. It does not need credentials, does not need values for input variables, and does not read state. That makes it quick and safe to run anywhere, including in a CI job on every commit or as an editor check.",
   "```text\n$ terraform validate\nSuccess! The configuration is valid.\n\n$ terraform validate\nError: Reference to undeclared input variable\n  on main.tf line 4: region = var.regoin\n```",
   "What does validate miss? Anything that requires talking to the real world. An invalid machine image ID, a bucket name already taken by someone else, insufficient permissions, a quota limit, or a region that does not offer a service will all pass validation and only surface at plan or apply. Some provider-side checks do run during plan because providers can validate arguments against the API then. So validate is a fast first filter, not a guarantee.",
   "Use `terraform validate -json` for machine-readable results, which editors and CI tools can parse. `terraform plan` performs validation too, but it also refreshes state and computes changes, so it is slower and needs credentials. Add custom `validation` blocks to variables and `precondition` or `postcondition` blocks to resources when you want rules specific to your organization, and remember that `terraform fmt` is a separate check for style, not validity."
  ],
  "terms": [
   [
    "terraform validate",
    "Command that checks configuration syntax and internal consistency without contacting remote services."
   ],
   [
    "Internal consistency",
    "Whether references, argument names, types and required arguments in the configuration agree with each other and with provider schemas."
   ],
   [
    "Provider schema",
    "The provider's list of resource types, arguments and types, needed by validate and obtained by `terraform init`."
   ],
   [
    "-json",
    "Option that outputs validation results in a machine-readable format."
   ]
  ],
  "example": "A CI pipeline runs `terraform fmt -check` and `terraform validate` on every push without any cloud credentials. A commit that misspells a variable reference fails in seconds, long before anyone asks for a plan against production.",
  "tip": "Validate does not contact provider APIs or remote state, and does not need variable values, but it does need `terraform init` first. Errors like a nonexistent image ID are caught only at plan or apply.",
  "check": [
   [
    "Will `terraform validate` catch a reference to an undeclared variable?",
    "Yes. Undeclared references are an internal consistency error detected without any API calls."
   ],
   [
    "Will `terraform validate` catch that a chosen instance type is not offered in your region?",
    "No. That requires contacting the provider's API, which validate never does; it would surface at plan or apply."
   ]
  ]
 },
 {
  "t": "`terraform plan`: refresh, diff and symbols (`+`, `-`, `~`, `-/+`), saved plans with `-out`",
  "body": [
   "`terraform plan` creates an execution plan: a preview of what Terraform would change. It does not change real infrastructure. Plan works in three stages. First it reads the current state. Then, by default, it refreshes: it asks each provider for the current attributes of every managed object, so it can see drift made outside Terraform. Finally it compares the configuration with that refreshed view and works out which actions would make reality match the code.",
   "The plan output lists each affected resource with a symbol and a description. The main symbols are: `+` create; `-` destroy; `~` update in place, where only the changed attributes are shown with old and new values; `-/+` destroy and then create a replacement, because an argument that cannot be changed on a live object was changed; and `+/-` create the replacement first and then destroy the old one, when `create_before_destroy` is set. Data sources that must be read during apply appear with `<=`.",
   "```text\n  # aws_instance.web must be replaced\n-/+ resource \"aws_instance\" \"web\" {\n      ~ ami  = \"ami-old\" -> \"ami-new\" # forces replacement\n      ~ id   = \"i-0abc\" -> (known after apply)\n    }\n\nPlan: 1 to add, 0 to change, 1 to destroy.\n```",
   "Read the annotations. `# forces replacement` marks the argument that triggered a replace. `(known after apply)` means the value will only be known once the provider creates or updates the object, such as a new ID. `(sensitive value)` means the value is hidden because it is marked sensitive. The final summary line counts adds, changes and destroys; a replacement counts as one add and one destroy.",
   "Plan also reports drift. If refresh finds that an object changed outside Terraform, the output first notes the changes detected, then shows what Terraform would do to bring the object back in line with the configuration.",
   "By default the plan is shown and discarded. With `-out=FILE`, Terraform saves the plan to a file so that exactly those actions can be applied later with `terraform apply FILE`. This matters in pipelines, where a plan is reviewed and approved and then applied without being recomputed. The saved file is binary; view it with `terraform show FILE`, or `terraform show -json FILE` for tools. It contains the full configuration, variable values and possibly secrets, so protect it like state.",
   "Useful for automation: `-detailed-exitcode` makes plan exit with 0 when there are no changes, 1 on error and 2 when there are changes, so a script can detect drift. `-input=false` prevents prompts for missing variables."
  ],
  "terms": [
   [
    "Execution plan",
    "Terraform's preview of the create, update, replace and destroy actions needed to match the configuration."
   ],
   [
    "-/+ (replace)",
    "Plan symbol meaning the existing object will be destroyed and a new one created."
   ],
   [
    "(known after apply)",
    "Plan annotation for values the provider will only determine when the change is carried out."
   ],
   [
    "Saved plan",
    "A plan written with `-out=FILE` that can be applied later exactly as reviewed."
   ]
  ],
  "example": "A plan meant to change an instance's tags shows `-/+` and a replacement. Reading more closely, the engineer sees `# forces replacement` next to the subnet ID, realizes a variable points at the wrong subnet, and fixes it before any server is destroyed.",
  "tip": "Memorize the symbols: `+` create, `-` destroy, `~` update in place, `-/+` replace (destroy first), `+/-` replace (create first), `<=` read. Plan never changes infrastructure, though it does refresh from providers.",
  "check": [
   [
    "What does `~` mean in plan output?",
    "The resource will be updated in place, without being destroyed."
   ],
   [
    "How do you guarantee that exactly the reviewed actions are applied?",
    "Save the plan with `terraform plan -out=FILE` and apply that file with `terraform apply FILE`."
   ]
  ]
 },
 {
  "t": "Planning options: `-var`, `-var-file`, `-target`, `-refresh=false`, `-refresh-only`, `-replace`",
  "body": [
   "`terraform plan` accepts options that change inputs or planning behavior. Most of them work the same way on `terraform apply`, because apply without a saved plan file first creates a plan.",
   "`-var` and `-var-file` supply input variable values. `-var 'instance_count=3'` sets one variable on the command line. `-var-file=prod.tfvars` loads values from a file. You can repeat either option; when the same variable is set more than once, the last one on the command line wins. These command-line values take the highest precedence, above environment variables and automatically loaded files such as `terraform.tfvars`. A typical pattern is one variable file per environment, such as `dev.tfvars` and `prod.tfvars`.",
   "`-target=ADDRESS` limits planning to one resource or module and whatever it depends on, for example `-target=aws_instance.web` or `-target=module.network`. Terraform prints a warning when you use it, because the result is a partial view that ignores other pending changes and can leave configuration and state out of step. HashiCorp recommends it only for exceptional situations, such as recovering from an error or working around a provider bug, not routine use.",
   "`-refresh=false` skips the refresh step and plans from state alone. It is faster on large configurations, but Terraform will not notice drift, so the plan can be wrong if something changed outside Terraform.",
   "`-refresh-only` creates a different kind of plan. Instead of proposing changes to infrastructure, it proposes updating state to match what the providers report. Use it to review drift: `terraform plan -refresh-only` shows what changed outside Terraform, and `terraform apply -refresh-only` accepts those changes into state without touching any real objects. This replaces the older `terraform refresh` command, which updated state without showing you first and is deprecated.",
   "`-replace=ADDRESS` forces Terraform to plan replacement of a specific resource instance even though its configuration has not changed, for example when a virtual machine is unhealthy. It can be repeated for several resources.",
   "```text\nterraform plan -var-file=prod.tfvars -var 'instance_count=5'\nterraform plan -target=module.network\nterraform plan -refresh-only\nterraform apply -replace='aws_instance.web[0]'\n```",
   "Quote addresses that contain brackets or quotes so your shell does not interpret them. Remember also that a saved plan already contains its variable values and options, so you set these when running plan, not when applying the saved file."
  ],
  "terms": [
   [
    "-var / -var-file",
    "Options that set input variable values on the command line or from a file; highest precedence, last one wins."
   ],
   [
    "-target",
    "Limits planning to specific resources or modules and their dependencies; for exceptional use only."
   ],
   [
    "-refresh-only",
    "Plan or apply mode that updates state to match real infrastructure without changing that infrastructure."
   ],
   [
    "-replace",
    "Forces replacement of a specific resource instance in the plan."
   ]
  ],
  "example": "An administrator suspects someone changed a load balancer setting by hand. She runs `terraform plan -refresh-only`, sees the drifted attribute, and decides whether to accept it into state with `apply -refresh-only` or update the code, rather than letting a normal apply silently revert it.",
  "tip": "`-refresh=false` skips checking reality; `-refresh-only` does only that check and updates state. `terraform refresh` is deprecated in favor of `apply -refresh-only`.",
  "check": [
   [
    "What does `terraform apply -refresh-only` change?",
    "Only the state file, updating it to match the real infrastructure; no infrastructure is created, modified or destroyed."
   ],
   [
    "If `-var-file=prod.tfvars` and a later `-var 'size=large'` both set `size`, which value is used?",
    "`large`, because command-line options are processed in order and the last value wins."
   ]
  ]
 },
 {
  "t": "`terraform apply`: interactive approval, `-auto-approve`, applying a saved plan file",
  "body": [
   "`terraform apply` executes changes to make real infrastructure match the configuration. It can run in two modes: without a plan file, where it creates a fresh plan and asks for approval, or with a saved plan file, where it carries out exactly that plan.",
   "In the first mode, apply runs the same steps as plan: refresh, compare, compute actions. It prints the plan and then stops with a prompt asking whether you want to perform these actions, noting that only `yes` will be accepted. Any other answer, including `y`, cancels. This interactive approval is your last chance to catch a surprise destroy or replacement.",
   "`-auto-approve` skips the prompt and applies immediately. It is meant for automation where approval already happened somewhere else, such as a reviewed pull request, or for disposable environments. Using it on production from a laptop removes the safety check, so treat it with care. Apply without a plan file also accepts planning options such as `-var`, `-var-file`, `-target`, `-replace` and `-refresh-only`.",
   "In the second mode, `terraform apply tfplan` applies a plan saved earlier with `terraform plan -out=tfplan`. There is no approval prompt, because running plan and saving the file is treated as the approval step. You cannot pass new variable values; they were fixed when the plan was made. If state has changed since the plan was created, for example because someone else applied in between, Terraform refuses the stale plan, and you must plan again. This two-step pattern is the standard for pipelines: plan, review, then apply the reviewed file.",
   "```text\nterraform plan -out=tfplan\nterraform show tfplan\nterraform apply tfplan\n```",
   "During apply, Terraform walks the dependency graph, creating, updating and deleting resources in order and running independent operations in parallel. After each change, it writes the result to state. Apply is not a transaction: if an error occurs part-way, changes that already succeeded remain, and state records them. Fix the problem and apply again; Terraform picks up from the current state rather than starting over. A resource whose creation partly failed may be marked tainted and replaced on the next run.",
   "When apply finishes it prints a summary such as `Apply complete! Resources: 2 added, 0 changed, 0 destroyed.` followed by the root module's output values, with sensitive outputs shown as `<sensitive>`. State locking holds for the whole apply, so a second apply against the same state waits or fails instead of colliding."
  ],
  "terms": [
   [
    "terraform apply",
    "Command that carries out a plan to create, update or destroy infrastructure and records the results in state."
   ],
   [
    "-auto-approve",
    "Skips the interactive `yes` confirmation; intended for automation with approval elsewhere."
   ],
   [
    "Stale plan",
    "A saved plan whose state has changed since it was created; Terraform refuses to apply it."
   ],
   [
    "Tainted",
    "State marking for a resource that is known to be damaged, such as after a failed creation, so it will be replaced."
   ]
  ],
  "example": "A release pipeline runs `terraform plan -out=tfplan`, posts `terraform show tfplan` to a chat channel, and waits for a manual approval. Once approved, it runs `terraform apply tfplan`, which applies without prompting and exactly as reviewed.",
  "tip": "Applying a saved plan file does not prompt for approval and does not accept new variables. Without a plan file, apply prompts unless `-auto-approve` is used, and only the exact word `yes` proceeds.",
  "check": [
   [
    "Does `terraform apply tfplan` ask for confirmation?",
    "No. Applying a saved plan is treated as already approved, so it proceeds without a prompt."
   ],
   [
    "An apply fails after creating three of five resources. What happens to those three?",
    "They remain and are recorded in state; apply is not transactional, and the next apply continues from the current state."
   ]
  ]
 },
 {
  "t": "`terraform destroy` and `terraform plan -destroy`",
  "body": [
   "`terraform destroy` removes every object managed by the current configuration and state. It is how you tear down a temporary environment, clean up after a lab, or retire a stack completely. Because it deletes real infrastructure, it follows the same safety pattern as apply: it shows a plan of everything to be destroyed and waits for you to type `yes`.",
   "`terraform destroy` is a convenience alias for `terraform apply -destroy`. The two behave the same. Both accept `-auto-approve` to skip the prompt and planning options such as `-var` and `-var-file`, which you may need if variables are required to evaluate the configuration. Both also accept `-target`, which destroys only the targeted resource and anything that depends on it, though targeted use should be exceptional.",
   "`terraform plan -destroy` creates a speculative destroy plan: it shows what would be removed without removing anything. You can save it with `-out` and later apply it with `terraform apply FILE`, which gives destroy the same review-then-apply pattern as ordinary changes. This is useful in pipelines that tear down preview environments.",
   "```text\nterraform plan -destroy -out=destroy.tfplan\nterraform show destroy.tfplan\nterraform apply destroy.tfplan\n```",
   "Destroy works through the dependency graph in reverse. If an instance depends on a subnet, which depends on a network, Terraform deletes the instance first, then the subnet, then the network. In destroy plans every resource is shown with the `-` symbol, and the summary counts only destroys. Data sources are not destroyed, because Terraform never created them; they are only read.",
   "Destroy only affects objects tracked in this configuration's state. Resources created by hand, or managed by another configuration with its own state, are untouched. That is why deleting a state file is not a way to protect resources and not a way to delete them. If you want a single resource gone, the usual method is simply to remove its block from the configuration and apply; Terraform plans to destroy it.",
   "Protect critical objects with `lifecycle { prevent_destroy = true }`. Any plan that would destroy such a resource, including `terraform destroy`, fails with an error. Removing the setting from the code is required before it can be destroyed, which forces a deliberate, reviewed change. Some providers also offer their own deletion protection arguments on resources such as databases."
  ],
  "terms": [
   [
    "terraform destroy",
    "Command that destroys all resources managed by the configuration; an alias for `terraform apply -destroy`."
   ],
   [
    "plan -destroy",
    "Creates a destroy plan to preview, and optionally save, without destroying anything."
   ],
   [
    "Reverse dependency order",
    "Destroy removes dependents before the objects they depend on."
   ],
   [
    "prevent_destroy",
    "Lifecycle setting that makes any plan that would destroy the resource fail."
   ]
  ],
  "example": "Each pull request in a web project gets a preview environment. When the pull request closes, the pipeline runs `terraform plan -destroy -out=destroy.tfplan`, logs the plan, and applies it, removing the preview's containers, DNS record and database cleanly.",
  "tip": "`terraform destroy` equals `terraform apply -destroy`. `terraform plan -destroy` only previews. To remove one resource in normal work, delete its block and apply rather than using destroy with `-target`.",
  "check": [
   [
    "What is the difference between `terraform destroy` and `terraform plan -destroy`?",
    "Destroy (like `apply -destroy`) removes resources after approval; `plan -destroy` only shows, and can save, a destroy plan without changing anything."
   ],
   [
    "Will `terraform destroy` delete a virtual machine someone created in the console that is not in state?",
    "No. Destroy only affects objects tracked in the configuration's state."
   ]
  ]
 },
 {
  "t": "`terraform fmt`: canonical style, `-check`, `-diff` and `-recursive`",
  "body": [
   "`terraform fmt` rewrites Terraform configuration files into the canonical format and style defined by HashiCorp. It changes whitespace and layout only: indenting nested blocks with two spaces, aligning the equals signs of consecutive arguments, normalizing spacing around operators and brackets, and similar adjustments. It never changes what the code means, and it does not check whether the code is valid; that is the job of `terraform validate`.",
   "```hcl\n# before\nresource \"aws_s3_bucket\" \"logs\" {\nbucket=\"acme-logs\"\n    force_destroy = true\n}\n\n# after terraform fmt\nresource \"aws_s3_bucket\" \"logs\" {\n  bucket        = \"acme-logs\"\n  force_destroy = true\n}\n```",
   "By default, fmt processes the `.tf` and `.tfvars` files (and Terraform test files) in the current directory only, rewrites them in place, and prints the names of files it changed. It does not look into subdirectories unless you add `-recursive`, which matters in repositories with module folders such as `modules/network`. You can also give it a specific directory or file as an argument.",
   "Two options are especially useful in automation. `-check` does not modify any files; it only checks whether they are formatted, lists the files that are not, and exits with a nonzero status if any need changes. That makes it a natural CI gate: the build fails until the author runs `terraform fmt` locally and commits the result. `-diff` prints the differences fmt would make (or has made), so you can see exactly what style changes are involved. They are often combined, as in `terraform fmt -check -diff -recursive`.",
   "Why does consistent formatting matter? When everyone's code is formatted the same way, diffs in pull requests show only meaningful changes, not whitespace noise, and reviewers can focus on what the change does. It also removes style debates from code review. Many editors run `terraform fmt` automatically on save through Terraform language extensions.",
   "Remember the division of labor among the checking commands. `fmt` is about style and layout, needs no initialization and never contacts anything. `validate` is about syntax and internal consistency and needs init for provider schemas. `plan` is about real-world changes and needs credentials and access to state.",
   "A small detail: fmt fixes layout but not everything a linter would. It will not rename resources or reorder blocks, and it will not fail on unused variables. Teams that want stricter rules add separate linting tools to their pipeline."
  ],
  "terms": [
   [
    "terraform fmt",
    "Command that rewrites configuration files into Terraform's canonical style without changing meaning."
   ],
   [
    "-check",
    "fmt option that reports unformatted files and exits nonzero without modifying them."
   ],
   [
    "-diff",
    "fmt option that displays the formatting differences."
   ],
   [
    "-recursive",
    "fmt option that also processes files in subdirectories."
   ]
  ],
  "example": "A pipeline's first job runs `terraform fmt -check -recursive`. A contributor's pull request fails because a module in `modules/dns` has misaligned arguments. They run `terraform fmt -recursive` locally, commit, and the check passes.",
  "tip": "fmt only processes the current directory unless you add `-recursive`, and `-check` never writes files. fmt checks style, not correctness.",
  "check": [
   [
    "Which option makes `terraform fmt` suitable as a CI gate without changing files?",
    "`-check`, which lists unformatted files and returns a nonzero exit code if any exist."
   ],
   [
    "Will `terraform fmt` format files in a `modules/` subdirectory by default?",
    "No. It only processes the given or current directory unless you pass `-recursive`."
   ]
  ]
 },
 {
  "t": "Resource replacement with `-replace` instead of the deprecated `terraform taint`",
  "body": [
   "Sometimes you need Terraform to destroy and recreate a resource even though its configuration has not changed. A virtual machine may be in a bad state, a bootstrapping script may have failed half-way, or you may want to force a fresh certificate. Terraform offers the `-replace` option on plan and apply for exactly this.",
   "```text\nterraform plan -replace=\"aws_instance.web\"\nterraform apply -replace=\"aws_instance.web\"\n```",
   "The plan shows the resource with the replace symbol and a note that it will be replaced, as requested. You review it like any other plan and approve it, and Terraform replaces the object, respecting `create_before_destroy` if set. For resources created with `count` or `for_each`, target the specific instance, such as `-replace='aws_instance.web[1]'` or `-replace='aws_instance.web[\"blue\"]'`, quoting the address for your shell. You can give `-replace` more than once in the same command.",
   "Before `-replace` existed, the approach was `terraform taint ADDRESS`. Taint marked the resource as tainted directly in state, and the next plan, whenever it happened and whoever ran it, would replace it. `terraform untaint` removed the mark. The taint command is now deprecated, and HashiCorp recommends `-replace` instead.",
   "Why the change? Taint modified shared state immediately, with no plan to review. In a team, a teammate running an unrelated apply could be surprised by the replacement. Worse, the taint persisted until someone applied, so the intent was separated from the action. With `-replace`, the replacement is part of a single plan: you see it, you approve it, and nothing is changed if you cancel. It fits the Write, Plan, Apply workflow and works with saved plans and HCP Terraform runs.",
   "Tainting still happens automatically in one situation: if a resource is created but a create-time provisioner fails, or creation otherwise fails part-way, Terraform marks the object tainted in state. The next plan then shows it will be replaced because it is tainted. You can see the status in `terraform state show` or plan output, and `terraform untaint` can still clear it if you are sure the object is fine.",
   "Keep `-replace` for real need. If you find yourself replacing the same resource often, the underlying problem, such as a fragile startup script or configuration drift, deserves a fix in the code, perhaps with `replace_triggered_by` so replacement happens automatically when a related resource changes."
  ],
  "terms": [
   [
    "-replace",
    "Plan and apply option that forces a specific resource instance to be destroyed and recreated, shown in the plan for review."
   ],
   [
    "terraform taint",
    "Deprecated command that marked a resource in state for replacement on the next apply."
   ],
   [
    "terraform untaint",
    "Command that removes a tainted mark from a resource in state."
   ],
   [
    "Tainted resource",
    "A resource marked in state as damaged, usually after a failed create or provisioner, that will be replaced."
   ]
  ],
  "example": "A web server's disk became corrupted after a failed update. Instead of logging in to fix it, the engineer runs `terraform apply -replace=\"aws_instance.web\"`, reviews the plan showing one replacement, types yes, and the server is rebuilt from the golden image.",
  "tip": "If a question asks for the recommended way to force recreation of a resource, choose `terraform apply -replace=ADDRESS`, not `terraform taint`, which is deprecated.",
  "check": [
   [
    "Why is `-replace` preferred over `terraform taint`?",
    "It makes the replacement part of a reviewed plan instead of silently modifying shared state for some later apply to act on."
   ],
   [
    "How would you force replacement of the second instance of a `count`-based resource `aws_instance.web`?",
    "`terraform apply -replace='aws_instance.web[1]'`, since count indexes start at zero."
   ]
  ]
 },
 {
  "t": "Parallelism and the dependency graph during apply",
  "body": [
   "Terraform does not process resources one at a time in file order. It builds a dependency graph: a directed acyclic graph (a graph with directions and no loops) where each node is a resource, data source, provider, variable, output or similar object, and each edge means one node must be handled before another. Edges come from references between blocks, such as a subnet using `aws_vpc.main.id`, and from explicit `depends_on` arguments.",
   "When you plan or apply, Terraform walks this graph. Any node whose dependencies are complete can start. Resources that do not depend on each other, such as ten unrelated storage buckets, can be created at the same time. Resources on a chain, such as network then subnet then instance, happen in sequence. During destroy the graph is walked in reverse, so dependents are removed before the things they depend on.",
   "Terraform limits how many operations run at once. By default it performs up to 10 concurrent operations. You can change this with `-parallelism=n` on plan, apply and destroy. Raising it can speed up large configurations with many independent resources. Lowering it, even to `-parallelism=1`, can help when a provider's API enforces rate limits, when debugging to see operations one at a time, or when the machine running Terraform is short of resources. The setting controls concurrency only; it never changes the order required by dependencies.",
   "```text\nterraform apply -parallelism=4\nterraform graph | dot -Tsvg > graph.svg\n```",
   "`terraform graph` prints the dependency graph in the DOT language, which tools such as Graphviz can render as a picture. It is a handy way to understand why Terraform orders things as it does or to spot an unexpected dependency.",
   "If an operation fails during apply, Terraform stops starting new operations that depend on it, lets operations already in progress finish, and records everything that succeeded in state. The error is reported at the end. That is why an apply can leave some resources created and others not, and why the next apply simply continues from the recorded state.",
   "Cycles are not allowed. If resource A references B and B references A, directly or through a chain, Terraform reports a cycle error during plan. The fix is to restructure: often by moving an attribute into a separate resource, such as a separate security group rule instead of an inline rule, so the dependency runs one way."
  ],
  "terms": [
   [
    "Dependency graph",
    "Directed acyclic graph of configuration objects that Terraform uses to order operations."
   ],
   [
    "-parallelism",
    "Option setting the maximum number of concurrent operations during plan, apply or destroy; the default is 10."
   ],
   [
    "terraform graph",
    "Command that outputs the dependency graph in DOT format for visualization."
   ],
   [
    "Cycle",
    "A circular dependency between objects that makes the graph impossible to order; Terraform reports it as an error."
   ]
  ],
  "example": "An apply creating 200 DNS records keeps failing with throttling errors from the DNS provider's API. Running `terraform apply -parallelism=2` spreads the requests out so the provider no longer throttles them, at the cost of a slower run.",
  "tip": "Parallelism defaults to 10 and changes how many operations run at once, never the order. Order comes from the graph: implicit references plus `depends_on`, reversed for destroy.",
  "check": [
   [
    "What decides the order in which Terraform creates resources?",
    "The dependency graph built from references and `depends_on`; independent resources may be created concurrently."
   ],
   [
    "Why might you lower `-parallelism`?",
    "To avoid API rate limits or throttling, to simplify debugging, or to reduce load on the machine running Terraform."
   ]
  ]
 },
 {
  "t": "Resource blocks vs data blocks, and addressing them (`TYPE.NAME`, `data.TYPE.NAME`)",
  "body": [
   "Terraform configurations are built mostly from two kinds of blocks that come from providers. A `resource` block declares an infrastructure object that Terraform manages: it creates it, updates it when the arguments change, and destroys it when the block is removed. A `data` block declares a data source: a read-only query for information about something that already exists, which Terraform reads but never creates, changes or destroys.",
   "```hcl\ndata \"aws_ami\" \"ubuntu\" {\n  most_recent = true\n  owners      = [\"099720109477\"]\n  filter {\n    name   = \"name\"\n    values = [\"ubuntu/images/*-amd64-server-*\"]\n  }\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = data.aws_ami.ubuntu.id\n  instance_type = \"t3.micro\"\n}\n```",
   "Both blocks have two labels: the type, which comes from the provider, and a local name that you choose. The combination must be unique within a module for each mode. The type determines which arguments are allowed; the name is only for referring to the block elsewhere in your code and appears in plan output and state.",
   "Addresses are how you refer to these blocks. A managed resource is addressed as `TYPE.NAME`, such as `aws_instance.web`, and its attributes as `aws_instance.web.id` or `aws_instance.web.public_ip`. A data source always carries the `data.` prefix: `data.TYPE.NAME`, such as `data.aws_ami.ubuntu`, with attributes like `data.aws_ami.ubuntu.id`. Forgetting the `data.` prefix is a common error that `terraform validate` reports as a reference to an undeclared resource.",
   "Addresses grow when you use modules and multiple instances. A resource inside a module called `network` is `module.network.aws_vpc.main`. A resource with `count` has instances such as `aws_instance.web[0]`, and one with `for_each` has instances such as `aws_instance.web[\"blue\"]`. You use these full addresses with commands such as `terraform state show`, `-target` and `-replace`.",
   "When are data sources read? Normally during planning, so their results are available to compute the plan. If a data source's arguments depend on values that are not known until apply, such as the ID of a resource about to be created, Terraform defers reading it to apply time and shows it in the plan with `<=` and `(known after apply)`. Data sources are read again on every plan, so they always reflect current reality, and their results are also recorded in state.",
   "Choosing between them is usually simple. If Terraform should own the object's lifecycle, use a resource. If something else owns it, such as another team's network, a vendor-published machine image, or the current account's identity, use a data source to look it up rather than hard-coding IDs. This keeps configurations portable across accounts and regions."
  ],
  "terms": [
   [
    "Resource block",
    "Declares an infrastructure object that Terraform creates, updates and destroys."
   ],
   [
    "Data block (data source)",
    "Declares a read-only lookup of existing information that Terraform reads but does not manage."
   ],
   [
    "Resource address",
    "The reference form `TYPE.NAME` for resources and `data.TYPE.NAME` for data sources, extended with module paths and instance keys."
   ],
   [
    "Local name",
    "The second label of a resource or data block, chosen by you and unique per type within a module."
   ]
  ],
  "example": "Instead of hard-coding a machine image ID that differs in every region, a configuration uses `data \"aws_ami\" \"ubuntu\"` to look up the latest approved image, and the instance references `data.aws_ami.ubuntu.id`. Deploying to a new region needs no code change.",
  "tip": "Data sources are addressed with the `data.` prefix and are never destroyed by Terraform. If an exam question asks how to use an existing object that Terraform should not manage, the answer is a data source.",
  "check": [
   [
    "How do you reference the `id` attribute of a data source `aws_vpc` named `shared`?",
    "`data.aws_vpc.shared.id`."
   ],
   [
    "What happens to a data source when you run `terraform destroy`?",
    "Nothing on the real system; Terraform only reads data sources, so there is nothing to destroy."
   ]
  ]
 },
 {
  "t": "Cross-resource references and implicit dependencies",
  "body": [
   "Resources rarely stand alone. A subnet belongs to a network, an instance sits in a subnet, a DNS record points at a load balancer. In Terraform you connect them with references: expressions that use another object's attributes as argument values.",
   "```hcl\nresource \"aws_vpc\" \"main\" {\n  cidr_block = \"10.0.0.0/16\"\n}\n\nresource \"aws_subnet\" \"app\" {\n  vpc_id     = aws_vpc.main.id\n  cidr_block = \"10.0.1.0/24\"\n}\n\nresource \"aws_instance\" \"web\" {\n  subnet_id     = aws_subnet.app.id\n  ami           = var.ami_id\n  instance_type = \"t3.micro\"\n}\n```",
   "The common reference forms are: `TYPE.NAME.ATTRIBUTE` for resources; `data.TYPE.NAME.ATTRIBUTE` for data sources; `var.NAME` for input variables; `local.NAME` for local values; `module.NAME.OUTPUT` for a child module's outputs; and `path.module`, `path.root` and `terraform.workspace` for filesystem and workspace information. You can reference arguments you set and attributes the provider computes, such as `id`, `arn` or `public_ip`; the provider documentation lists both under argument and attribute references.",
   "Every reference to another resource or data source creates an implicit dependency. In the example, Terraform sees that the subnet uses `aws_vpc.main.id`, so the network must exist before the subnet can be created. The instance references the subnet, so it waits for the subnet. You never state the order; Terraform infers it and builds the dependency graph. Resources with no references between them are free to be created in parallel.",
   "Implicit dependencies also explain `(known after apply)` in plans. The network's ID does not exist until the provider creates it, so during planning the subnet's `vpc_id` is unknown. Terraform carries the unknown value forward and fills it in during apply once the network is created. For destroy, the same edges are used in reverse: the instance goes first, then the subnet, then the network.",
   "Prefer implicit dependencies wherever possible. They are precise, because Terraform knows exactly which attribute is needed, and they document themselves in the code. Explicit `depends_on` is needed only when a dependency exists that no attribute reference expresses, such as an application inside a virtual machine that needs a permissions policy to exist first. That is covered in a later lesson.",
   "A reference is also a contract. If you rename a resource, every expression referring to it must change too, and Terraform will otherwise see the rename as a destroy and create; use a `moved` block to tell Terraform the object is the same."
  ],
  "terms": [
   [
    "Reference",
    "An expression that uses a value from another object, such as `aws_vpc.main.id` or `var.region`."
   ],
   [
    "Implicit dependency",
    "An ordering relationship Terraform infers automatically from a reference between objects."
   ],
   [
    "Computed attribute",
    "An attribute set by the provider after creation, such as an ID, often shown as known after apply."
   ],
   [
    "moved block",
    "A block that tells Terraform a resource's address changed so it updates state instead of replacing the object."
   ]
  ],
  "example": "An engineer adds a security group and sets `vpc_security_group_ids = [aws_security_group.web.id]` on an existing instance. The plan creates the security group first and then updates the instance, without any explicit ordering, because the reference created a dependency.",
  "tip": "Terraform orders operations using references, not file order. If a question asks how Terraform knows to create the network before the subnet, the answer is the implicit dependency from `aws_vpc.main.id`.",
  "check": [
   [
    "What creates an implicit dependency between two resources?",
    "One resource's argument referencing the other's attributes, such as `vpc_id = aws_vpc.main.id`."
   ],
   [
    "Why does a subnet's `vpc_id` show `(known after apply)` when the network is new?",
    "The network's ID is only assigned by the provider when it is created during apply, so it is unknown at plan time."
   ]
  ]
 },
 {
  "t": "Input variables: `type`, `default`, `description`, `sensitive`, `nullable`, and value precedence (TF_VAR_, tfvars, auto.tfvars, -var)",
  "body": [
   "Input variables are a module's parameters. They let the same code serve different environments, regions or teams without editing it. You declare each one with a `variable` block and refer to it as `var.NAME`.",
   "```hcl\nvariable \"instance_count\" {\n  type        = number\n  default     = 2\n  description = \"Number of web servers to run.\"\n  nullable    = false\n\n  validation {\n    condition     = var.instance_count > 0\n    error_message = \"instance_count must be at least 1.\"\n  }\n}\n\nvariable \"db_password\" {\n  type      = string\n  sensitive = true\n}\n```",
   "The arguments: `type` constrains which values are accepted, such as `string`, `number`, `bool` or complex types like `list(string)`; Terraform converts compatible values and rejects others. `default` supplies a value when none is given, which makes the variable optional; a variable with no default is required. `description` documents the purpose for users and module documentation. `sensitive = true` redacts the value in plan and apply output, and anything derived from it is treated as sensitive too, but it is still stored in state. `nullable` controls whether `null` is allowed; it defaults to true, and with `nullable = false` a caller passing `null` gets the default instead. A `validation` block adds custom rules with a helpful error message. Newer versions also support `ephemeral = true` for values that must never be persisted.",
   "Values can be provided in several ways, and when the same variable is set in more than one place, Terraform uses this precedence, from lowest to highest, with later sources overriding earlier ones:",
   "```text\n1. Environment variables named TF_VAR_<name>, e.g. TF_VAR_region=us-east-1\n2. terraform.tfvars, if present\n3. terraform.tfvars.json, if present\n4. *.auto.tfvars and *.auto.tfvars.json files, in lexical order of filename\n5. -var and -var-file options on the command line, in the order given\n```",
   "Only `terraform.tfvars`, `terraform.tfvars.json` and files ending in `.auto.tfvars` or `.auto.tfvars.json` are loaded automatically. Any other file, such as `prod.tfvars`, must be passed with `-var-file`. If a required variable has no value from any source, Terraform prompts for it interactively, or fails if run with `-input=false`. Defaults are used only when no source provides a value.",
   "In HCP Terraform, workspace variables can also supply values; they are sent as Terraform or environment variables for each run. For secrets, prefer environment variables or a secrets manager over committing `.tfvars` files containing passwords, and mark those variables sensitive so they do not appear in logs.",
   "For child modules, variables are set as arguments in the `module` block, and none of the precedence sources above apply to them directly; only the root module reads tfvars files and `TF_VAR_` variables."
  ],
  "terms": [
   [
    "Input variable",
    "A module parameter declared with a `variable` block and referenced as `var.NAME`."
   ],
   [
    "TF_VAR_ environment variable",
    "An environment variable named `TF_VAR_<name>` that sets a root module variable; lowest precedence."
   ],
   [
    "terraform.tfvars",
    "Variable definitions file that Terraform loads automatically from the root module directory."
   ],
   [
    "nullable",
    "Variable setting (default true) controlling whether `null` is accepted; when false, null is replaced by the default."
   ],
   [
    "sensitive",
    "Variable setting that redacts the value in CLI output but does not keep it out of state."
   ]
  ],
  "example": "A pipeline sets `TF_VAR_region=us-east-1` in its environment, the repository has `terraform.tfvars` with `region = \"eu-west-1\"`, and the engineer runs `terraform plan -var region=ap-south-1`. Terraform uses `ap-south-1`, because command-line values have the highest precedence.",
  "tip": "Precedence from low to high: TF_VAR_ environment variables, terraform.tfvars, terraform.tfvars.json, *.auto.tfvars in lexical order, then -var and -var-file. Files not named with those patterns load only through -var-file.",
  "check": [
   [
    "If `region` is set both in `terraform.tfvars` and in `override.auto.tfvars`, which wins?",
    "`override.auto.tfvars`, because `*.auto.tfvars` files are loaded after `terraform.tfvars` and take precedence."
   ],
   [
    "What happens when a variable has no default and no value is provided?",
    "Terraform prompts for it interactively, or errors if input is disabled with `-input=false`."
   ],
   [
    "Does `sensitive = true` keep a variable's value out of the state file?",
    "No. It only redacts it in CLI output; the value may still be stored in state."
   ]
  ]
 },
 {
  "t": "Output values and local values",
  "body": [
   "Output values and local values both give names to expressions, but they face in different directions. Outputs expose values from a module to whoever uses it. Locals name intermediate values inside a module to avoid repetition, and cannot be set from outside.",
   "```hcl\noutput \"web_ip\" {\n  value       = aws_instance.web.public_ip\n  description = \"Public IP of the web server.\"\n}\n\noutput \"db_password\" {\n  value     = random_password.db.result\n  sensitive = true\n}\n```",
   "An `output` block needs a `value`, and can have a `description`, `sensitive`, a `depends_on` for rare hidden dependencies, and `precondition` checks. In the root module, outputs are printed at the end of `terraform apply` and stored in state. You can read them later with `terraform output`, one of them with `terraform output web_ip`, the raw string without quotes with `terraform output -raw web_ip`, and all of them as JSON with `terraform output -json`. Sensitive outputs are shown as `<sensitive>` in the apply summary and the plain `terraform output` listing, but `terraform output -raw` and `-json` print them in plain text, because the value itself is in state.",
   "In a child module, outputs are the only way to pass values back to the calling module. If a module called `network` declares `output \"subnet_ids\"`, the root module uses `module.network.subnet_ids`. Anything not exported as an output is invisible outside the module. Outputs from one root module can also be read by another configuration through the `terraform_remote_state` data source or, in HCP Terraform, the `tfe_outputs` data source, which is how separate stacks share values such as network IDs.",
   "Local values are declared in a `locals` block (plural) and referenced with `local.NAME` (singular), a spelling difference the exam likes to test.",
   "```hcl\nlocals {\n  name_prefix = \"${var.project}-${var.environment}\"\n  common_tags = {\n    Project     = var.project\n    Environment = var.environment\n    ManagedBy   = \"terraform\"\n  }\n}\n\nresource \"aws_s3_bucket\" \"logs\" {\n  bucket = \"${local.name_prefix}-logs\"\n  tags   = local.common_tags\n}\n```",
   "Locals shine when the same expression would otherwise be repeated, or when naming a complex expression makes code clearer. They can reference variables, resources, data sources and other locals. Unlike variables, they cannot be overridden by a caller, tfvars file or command line, which makes them a good place for values that should be computed consistently. Overusing them, however, can make code harder to follow, since readers must jump to the definition to see what a value is.",
   "To summarize the trio: variables are a module's inputs, locals are its private working names, and outputs are its return values."
  ],
  "terms": [
   [
    "Output value",
    "A named value a module exports, printed for the root module and accessed as `module.NAME.OUTPUT` for child modules."
   ],
   [
    "Local value",
    "A named expression defined in a `locals` block and referenced as `local.NAME`, usable only inside its module."
   ],
   [
    "terraform output",
    "Command that reads root module output values from state, with `-raw` and `-json` options."
   ],
   [
    "terraform_remote_state",
    "Data source that reads the root module outputs of another configuration's state."
   ]
  ],
  "example": "A networking team's configuration outputs `private_subnet_ids`. An application team's configuration reads those outputs with a remote state data source, and uses a local `common_tags` map so every resource gets the same Project and Environment tags.",
  "tip": "The block is `locals` but the reference is `local.name`. Child module values are reachable only through outputs, as `module.NAME.OUTPUT_NAME`.",
  "check": [
   [
    "How does a root module read a value produced inside a child module named `db`?",
    "The child must declare an output, for example `endpoint`, and the root references it as `module.db.endpoint`."
   ],
   [
    "Can a local value be overridden with `-var`?",
    "No. Locals are internal to the module; only input variables can be set from outside."
   ]
  ]
 },
 {
  "t": "Complex types: list, map, set, object, tuple; type conversion",
  "body": [
   "Beyond the primitive types `string`, `number` and `bool`, Terraform has complex types that group several values. They come in two families, and knowing which family each belongs to explains most of their rules.",
   "Collection types hold many values that all share one element type. A `list(T)` is an ordered sequence, indexed from zero, such as `list(string)` holding `[\"a\", \"b\"]`, accessed with `var.zones[0]`. A `map(T)` is a set of string keys each pointing to a value of type T, such as `map(number)`, accessed with `var.sizes[\"small\"]`. A `set(T)` is an unordered collection of unique values; duplicates are removed, there is no index, and you usually loop over it or convert it rather than picking an element.",
   "Structural types allow different types within one value, with the shape fixed in the type. An `object({...})` has named attributes, each with its own type, such as `object({ name = string, port = number })`. A `tuple([...])` is a fixed-length sequence where each position has its own type, such as `tuple([string, number, bool])`.",
   "```hcl\nvariable \"services\" {\n  type = map(object({\n    port     = number\n    public   = bool\n    replicas = optional(number, 1)\n  }))\n}\n```",
   "The `optional()` modifier marks an object attribute that callers may leave out, with an optional default as the second argument. The special keyword `any` lets Terraform infer the type from the value, which is flexible but gives weaker checking.",
   "Type conversion happens automatically whenever a value of one type is assigned where another is expected and a safe conversion exists. The strings `\"5\"` and `\"true\"` convert to the number 5 and bool true, and numbers and bools convert to strings. A tuple converts to a list if all its elements can share a type, and an object converts to a map in the same way. A list converts to a set, dropping order and duplicates. Literal syntax matters too: `[...]` in HCL is a tuple and `{...}` is an object, which Terraform then converts to the declared list or map type. If no conversion exists, such as the string `\"hello\"` to a number, you get a type error.",
   "You can also convert explicitly with functions: `tostring`, `tonumber`, `tobool`, `tolist`, `toset` and `tomap`. The most common case is `toset(var.names)`, because `for_each` accepts sets and maps but not lists. Explicit conversion is otherwise rarely needed; HashiCorp suggests relying on automatic conversion and declaring types on variables."
  ],
  "terms": [
   [
    "Collection type",
    "list, map or set: many values that all share the same element type."
   ],
   [
    "Structural type",
    "object or tuple: a fixed shape whose attributes or positions may have different types."
   ],
   [
    "set",
    "An unordered collection of unique values with no index."
   ],
   [
    "optional()",
    "Modifier in an object type that makes an attribute omittable, optionally with a default."
   ],
   [
    "Type conversion",
    "Automatic or function-based changing of a value to a compatible type, such as `toset()` on a list."
   ]
  ],
  "example": "A module takes `variable \"subnets\" { type = map(object({ cidr = string, az = string })) }`. The caller passes a map of named subnets, and the module uses `for_each = var.subnets` so each subnet is created with a stable key such as `\"app\"` or `\"db\"`.",
  "tip": "Lists are ordered and indexed; sets are unordered and unique; maps have string keys. Objects and tuples are the structural versions allowing mixed types. `for_each` needs a map or set, so convert lists with `toset()`.",
  "check": [
   [
    "What is the difference between `list(string)` and `set(string)`?",
    "A list is ordered and allows duplicates, with elements accessed by index; a set is unordered, holds unique values and has no index."
   ],
   [
    "Which type allows attributes of different types with fixed names?",
    "`object({...})`, a structural type; a `map` requires all values to share one type."
   ]
  ]
 },
 {
  "t": "Expressions: conditionals, `for` expressions, splat `[*]`, string templates, `dynamic` blocks",
  "body": [
   "Expressions compute values in Terraform. Beyond literals and references, a handful of expression forms let you make decisions, transform collections and generate repeated blocks without writing a general-purpose program. A conditional expression uses the form `condition ? true_value : false_value`. For example, `instance_type = var.environment == \"prod\" ? \"m5.large\" : \"t3.micro\"`. Both results should be of the same type, or convertible to one, because Terraform must know the result type. A common idiom is `count = var.create_bucket ? 1 : 0` to make a resource optional.",
   "A `for` expression transforms one collection into another. Square brackets produce a list or tuple; braces produce an object or map, using `=>` between key and value. An optional `if` clause filters elements.",
   "```hcl\nupper_names = [for n in var.names : upper(n)]\nport_by_svc = { for k, s in var.services : k => s.port }\npublic_only = [for s in var.servers : s.name if s.public]\n```",
   "A splat expression is a shorthand for a common `for` expression. `aws_instance.web[*].id` means the same as `[for i in aws_instance.web : i.id]`: take a list of objects and return a list of one attribute from each. It works on lists, sets and tuples, such as resources created with `count`. It does not work directly on maps, so for a `for_each` resource you use `values(aws_instance.web)[*].id` or a `for` expression.",
   "String templates embed expressions in strings. Interpolation, `\"${var.project}-logs\"`, inserts a value. Directives add logic: `%{ if var.enabled }on%{ else }off%{ endif }` and `%{ for ip in var.ips }${ip} %{ endfor }`. Multi-line strings use heredoc syntax, `<<EOT` through `EOT`, and the `<<-EOT` form strips common leading indentation. To write a literal `${` you escape it as `$${`. For larger templates, keep them in a separate file and render with the `templatefile` function.",
   "A `dynamic` block generates repeated nested blocks inside a resource, such as several `ingress` rules in a security group, from a collection. The label names the nested block type, `for_each` supplies the collection, and a `content` block describes each one. Inside, the iterator is named after the block label unless you set `iterator`.",
   "```hcl\ndynamic \"ingress\" {\n  for_each = var.allowed_ports\n  content {\n    from_port   = ingress.value\n    to_port     = ingress.value\n    protocol    = \"tcp\"\n    cidr_blocks = [\"10.0.0.0/8\"]\n  }\n}\n```",
   "Dynamic blocks make modules flexible, but overusing them makes code hard to read. HashiCorp advises using them mainly to hide detail in reusable modules and writing nested blocks literally where possible. They can only generate nested blocks within a resource, data, provider or provisioner block, not whole resources, and not meta-argument blocks such as `lifecycle`."
  ],
  "terms": [
   [
    "Conditional expression",
    "`condition ? a : b`, which chooses one of two values based on a boolean."
   ],
   [
    "for expression",
    "An expression that builds a list or map by transforming, and optionally filtering, another collection."
   ],
   [
    "Splat expression",
    "`[*]` shorthand that extracts one attribute from every element of a list, such as `aws_instance.web[*].id`."
   ],
   [
    "String template",
    "A string with `${...}` interpolation or `%{...}` directives."
   ],
   [
    "dynamic block",
    "A construct that generates repeated nested blocks from a collection using `for_each` and `content`."
   ]
  ],
  "example": "A security group module accepts a list of ports. A `dynamic \"ingress\"` block produces one rule per port, and an output uses a `for` expression to return a map of rule descriptions, so callers can add ports without editing the module.",
  "tip": "Know which brackets produce what: `[for ...]` gives a list or tuple, `{for ... : k => v}` gives a map or object. Splat works on lists, not maps, and `dynamic` generates nested blocks, not resources.",
  "check": [
   [
    "Write an expression returning the IDs of all instances of a `count`-based resource `aws_instance.web`.",
    "`aws_instance.web[*].id`, equivalent to `[for i in aws_instance.web : i.id]`."
   ],
   [
    "Inside `dynamic \"ingress\"` with no `iterator` set, how do you refer to the current element?",
    "As `ingress.value` (and `ingress.key` for its key or index)."
   ]
  ]
 },
 {
  "t": "Built-in functions and testing them in `terraform console`",
  "body": [
   "Terraform includes a library of built-in functions that you call inside expressions with the syntax `name(arg1, arg2)`. You cannot write your own functions in the Terraform language; you use the built-in ones, plus any functions a provider supplies, called with the `provider::NAME::FUNCTION(...)` syntax. The exam expects you to recognize common functions by category and to know how to experiment with them.",
   "The main categories are worth knowing with an example or two each. Numeric: `min`, `max`, `abs`, `ceil`, `floor`. String: `upper`, `lower`, `format`, `join`, `split`, `replace`, `trimspace`, `substr`. Collection: `length`, `concat`, `merge`, `lookup`, `element`, `flatten`, `keys`, `values`, `contains`, `distinct`, `coalesce`, `zipmap`. Encoding: `jsonencode`, `jsondecode`, `yamlencode`, `base64encode`. Filesystem: `file`, `fileexists`, `templatefile`. Date and time: `timestamp`, `formatdate`. Hash and crypto: `sha256`, `md5`, `bcrypt`. IP network: `cidrsubnet`, `cidrhost`, `cidrnetmask`. Type conversion: `tostring`, `tonumber`, `tolist`, `toset`, `tomap`, plus `try` and `can` for handling errors.",
   "A few behaviors are commonly tested. `lookup(map, key, default)` returns the default when the key is missing. `element(list, index)` wraps around when the index is past the end, unlike `list[index]`, which errors. `merge` combines maps, with later maps winning on duplicate keys. `file` reads a file at plan time, relative paths are best built with `path.module`, and `templatefile(path, vars)` renders a template file with variables. `timestamp()` returns a new value on every run, so using it in resource arguments causes constant changes.",
   "`terraform console` opens an interactive prompt where you can evaluate expressions against your configuration. Run it in an initialized working directory, type an expression, and see the result. It knows your variables, locals and, if state exists, the attributes of your resources, so you can inspect `aws_instance.web.private_ip` or try out a `for` expression before putting it in code. Exit with `exit` or Ctrl+D. You can also pipe an expression into it for scripted checks.",
   "```text\n$ terraform console\n> cidrsubnet(\"10.0.0.0/16\", 8, 1)\n\"10.0.1.0/24\"\n> lookup({a = 1}, \"b\", 0)\n0\n> join(\"-\", [\"app\", \"prod\"])\n\"app-prod\"\n> exit\n```",
   "The `cidrsubnet(prefix, newbits, netnum)` example is worth understanding: it adds `newbits` to the prefix length, here 16 plus 8 gives /24, and then picks subnet number `netnum` within that range. It is widely used to carve subnets out of a network address block without hard-coding each one.",
   "When you meet an unfamiliar function in a question, reason from its name and category, then check the behavior in console during your labs. Knowing that console exists, and that it evaluates expressions without changing anything, is itself a likely exam point."
  ],
  "terms": [
   [
    "Built-in function",
    "A function supplied by Terraform, such as `join` or `cidrsubnet`, callable in expressions; user-defined functions are not supported."
   ],
   [
    "terraform console",
    "Interactive command for evaluating expressions against the current configuration and state without making changes."
   ],
   [
    "lookup",
    "Function that returns a map value by key, or a default when the key is missing."
   ],
   [
    "cidrsubnet",
    "Function that calculates a subnet address range within a larger CIDR block."
   ]
  ],
  "example": "Before writing a module that creates one subnet per availability zone, an engineer opens `terraform console` and tries `[for i in range(3) : cidrsubnet(\"10.20.0.0/16\", 4, i)]` to check that the ranges come out as expected.",
  "tip": "Terraform does not support user-defined functions in HCL. To test function behavior, use `terraform console`, which evaluates expressions without modifying infrastructure.",
  "check": [
   [
    "What does `lookup(var.sizes, \"xl\", \"medium\")` return if `var.sizes` has no `xl` key?",
    "\"medium\", the default given as the third argument."
   ],
   [
    "Can you define your own function in a Terraform configuration?",
    "No. You can only use built-in functions and functions provided by providers."
   ]
  ]
 },
 {
  "t": "`count` vs `for_each`, `count.index`, `each.key` and `each.value`",
  "body": [
   "Both `count` and `for_each` are meta-arguments that create several instances of a resource, data source or module from one block. They look similar but identify instances differently, and that difference decides which one you should use.",
   "`count` takes a whole number. Terraform creates that many instances, addressed by index: `aws_instance.web[0]`, `aws_instance.web[1]` and so on. Inside the block, `count.index` gives the current index, starting at zero.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  count         = 3\n  ami           = var.ami_id\n  instance_type = \"t3.micro\"\n  tags = { Name = \"web-${count.index}\" }\n}\n```",
   "`for_each` takes a map or a set of strings. Terraform creates one instance per element, addressed by key: `aws_iam_user.dev[\"alice\"]`. Inside the block, `each.key` is the map key or set element and `each.value` is the map value; for a set, `each.value` is the same as `each.key`. A list is not accepted directly, so wrap it in `toset()`.",
   "```hcl\nresource \"aws_iam_user\" \"dev\" {\n  for_each = toset([\"alice\", \"bob\", \"carol\"])\n  name     = each.key\n}\n\nresource \"aws_s3_bucket\" \"b\" {\n  for_each = { logs = \"private\", site = \"public\" }\n  bucket   = \"acme-${each.key}\"\n  tags     = { Access = each.value }\n}\n```",
   "The key difference shows up when the collection changes. Suppose you used `count` with a list of three user names and remove the first one. Every remaining name shifts down one index, so Terraform sees index 0 and 1 as changed and index 2 as removed. That can mean renaming or replacing objects you did not intend to touch. With `for_each`, each instance is tied to a stable key; removing `alice` destroys only `[\"alice\"]` and leaves bob and carol alone.",
   "So the general rule: use `count` when the instances are nearly identical and interchangeable, or when you want a simple on/off switch with `count = var.enabled ? 1 : 0`. Use `for_each` when each instance has a distinct identity or distinct settings. A block cannot use both `count` and `for_each` at once. For both, the number of instances, or the keys for `for_each`, must be known at plan time; you cannot base them on attributes only known after apply, such as IDs of resources being created in the same run.",
   "Referencing works differently too. A `count` resource is a list, so `aws_instance.web[*].id` gets all IDs. A `for_each` resource is a map, so you use `aws_s3_bucket.b[\"logs\"].arn` for one, or `values(aws_s3_bucket.b)[*].arn` or a `for` expression for all."
  ],
  "terms": [
   [
    "count",
    "Meta-argument that creates a number of instances addressed by integer index."
   ],
   [
    "count.index",
    "The zero-based index of the current instance in a `count` block."
   ],
   [
    "for_each",
    "Meta-argument that creates one instance per element of a map or set, addressed by key."
   ],
   [
    "each.key / each.value",
    "In a `for_each` block, the current element's key and value; identical for sets."
   ]
  ],
  "example": "A team manages developer accounts with `count` over a list of names. When one developer leaves and is removed from the start of the list, the plan wants to rename two other accounts. They switch to `for_each = toset(var.developers)`, moving existing state entries to the new keys with `moved` blocks, and future removals affect only the departing person.",
  "tip": "`for_each` accepts maps and sets of strings, not lists, and gives stable keys. `count` indexes shift when items are removed from the middle. You cannot use both on one block.",
  "check": [
   [
    "Why is `for_each` usually safer than `count` for a list of named users?",
    "Instances are keyed by name, so removing one user affects only that instance; with `count`, removing an item shifts indexes and changes other instances."
   ],
   [
    "In a `for_each` over `toset([\"a\", \"b\"])`, what are `each.key` and `each.value` for the first element?",
    "Both are `\"a\"`, because for a set the key and value are the same."
   ]
  ]
 },
 {
  "t": "Explicit dependencies with `depends_on`; `lifecycle` rules: `create_before_destroy`, `prevent_destroy`, `ignore_changes`, `replace_triggered_by`",
  "body": [
   "Most dependencies are implicit, created by references. Occasionally one resource relies on another without using any of its attributes. The classic example is an instance whose application, at boot, calls a cloud API using a role; the instance must wait for the role's permission policy to be attached, but its arguments never reference the policy. `depends_on` states that hidden dependency explicitly.",
   "```hcl\nresource \"aws_instance\" \"app\" {\n  ami                  = var.ami_id\n  instance_type        = \"t3.small\"\n  iam_instance_profile = aws_iam_instance_profile.app.name\n  depends_on           = [aws_iam_role_policy.app_s3]\n}\n```",
   "`depends_on` takes a list of references to resources, data sources or modules, written as bare references, not strings. It works on resources, data sources, modules and outputs. Use it as a last resort and add a comment explaining why: it makes Terraform plan more conservatively, since more values may become unknown until apply, and it hides the real reason for the dependency from readers.",
   "The `lifecycle` block is a nested meta-argument block that changes how Terraform handles a resource's changes. It has four settings the exam focuses on.",
   "`create_before_destroy = true` reverses the default replacement order: the new object is created first and the old one destroyed afterward, reducing downtime. It needs the resource to allow two copies at once, so names that must be unique often need a generated suffix. `prevent_destroy = true` makes Terraform reject any plan that would destroy the resource, including replacements and `terraform destroy`, which protects databases and similar objects from accidents. It only works while the block is in the code; if someone deletes the whole resource block, the setting goes with it and the resource can be destroyed.",
   "`ignore_changes` lists attributes whose differences Terraform should ignore after creation, such as tags applied by another system or a desired count adjusted by an autoscaler. Use `ignore_changes = all` to ignore every attribute, so Terraform only creates and destroys the object. `replace_triggered_by` lists references to other managed resources or their attributes; when any of them changes or is replaced, this resource is replaced too. It is the declarative way to say rebuild this instance whenever that configuration file or template changes.",
   "```hcl\nlifecycle {\n  create_before_destroy = true\n  prevent_destroy       = true\n  ignore_changes        = [tags[\"LastScanned\"], desired_count]\n  replace_triggered_by  = [terraform_data.app_version]\n}\n```",
   "The `lifecycle` block can also hold `precondition` and `postcondition` blocks for custom checks, covered with custom conditions. Lifecycle settings are processed while Terraform builds the dependency graph, so `create_before_destroy`, `prevent_destroy` and `ignore_changes` accept only literal values, not input variables or computed expressions."
  ],
  "terms": [
   [
    "depends_on",
    "Meta-argument declaring an explicit dependency that no attribute reference expresses."
   ],
   [
    "create_before_destroy",
    "Lifecycle setting that creates the replacement object before destroying the old one."
   ],
   [
    "prevent_destroy",
    "Lifecycle setting that makes any plan destroying the resource fail with an error."
   ],
   [
    "ignore_changes",
    "Lifecycle setting listing attributes whose drift Terraform should not try to correct."
   ],
   [
    "replace_triggered_by",
    "Lifecycle setting that replaces the resource when referenced resources or attributes change."
   ]
  ],
  "example": "An autoscaling service changes the `desired_count` of a container service throughout the day, and every plan tries to reset it. Adding `lifecycle { ignore_changes = [desired_count] }` lets the autoscaler own that value while Terraform manages everything else about the service.",
  "tip": "Use `depends_on` only for hidden dependencies. Remember that `prevent_destroy` does not stop destruction if the whole resource block is removed, and that lifecycle values must be literals, not variables.",
  "check": [
   [
    "When should you use `depends_on`?",
    "Only when a resource depends on another in a way no attribute reference expresses, such as an app needing a permission policy to exist first."
   ],
   [
    "Which lifecycle setting would you use so Terraform stops reverting tags that another tool adds?",
    "`ignore_changes`, listing the tag attributes (or `tags`) to ignore."
   ],
   [
    "What does `replace_triggered_by` do?",
    "It forces replacement of the resource whenever any referenced managed resource or attribute changes."
   ]
  ]
 },
 {
  "t": "Custom conditions: variable `validation`, `precondition` and `postcondition`, and `check` blocks",
  "body": [
   "Terraform lets you write your own rules about what counts as valid input and valid infrastructure. These custom conditions turn assumptions that used to live in someone's head (\"the instance type must be a t3 size\", \"the AMI must be for x86\") into code that fails early with a clear message. Every custom condition has the same two parts: a `condition` expression that must evaluate to true, and an `error_message` that explains what went wrong in plain language.",
   "The first kind is the `validation` block inside a `variable` block. It checks a value as soon as it is supplied, before any planning of resources. If the condition is false, Terraform stops with your error message. Functions such as `contains`, `can`, `regex` and `length` are common here. In current Terraform versions a validation can also refer to other variables, but its main job is still to check the input it belongs to.",
   "```hcl\nvariable \"env\" {\n  type = string\n  validation {\n    condition     = contains([\"dev\", \"stage\", \"prod\"], var.env)\n    error_message = \"env must be dev, stage or prod.\"\n  }\n}\n```",
   "The second kind lives in the `lifecycle` block of a resource or data source. A `precondition` is checked before Terraform creates or changes the object, so it guards assumptions about inputs and other objects (for example, that a looked-up AMI uses the right architecture). A `postcondition` is checked after the object is created, updated or read, and can refer to the object itself with `self` (for example, that the new instance really received a public DNS name). Output blocks can also have a `precondition`, which stops a module from exporting a value that breaks a promise. A failed precondition or postcondition is an error: it blocks the run and prevents dependent resources from proceeding.",
   "The third kind is the top-level `check` block, added in Terraform 1.5. A check contains one or more `assert` blocks, each with a condition and an error message, and may contain its own scoped `data` block, such as an HTTP request to confirm a website answers. The key difference is severity: a failed check produces a warning, not an error, so the plan and apply still complete. Checks run as the last step of every plan and apply, which makes them good for ongoing health verification rather than hard gates.",
   "How do you choose? Use `validation` to reject bad input values early. Use `precondition` when a resource must not be built unless something is true. Use `postcondition` to confirm that what was built or read matches your expectations. Use `check` when you want to be told about a problem without stopping the workflow, for example to monitor that an endpoint is still reachable. In HCP Terraform, continuous validation re-runs checks and conditions on a schedule and reports failures."
  ],
  "terms": [
   [
    "validation block",
    "A rule inside a variable block with a condition and error_message that rejects bad input values before planning."
   ],
   [
    "precondition",
    "A lifecycle (or output) condition evaluated before an object is created or changed; failure is an error that halts the run."
   ],
   [
    "postcondition",
    "A lifecycle condition evaluated after an object is created, updated or read; it can use self to inspect the result."
   ],
   [
    "check block",
    "A top-level block of assert conditions, optionally with a scoped data source, whose failures produce warnings instead of errors."
   ]
  ],
  "example": "A platform team exposes a module with an instance_type variable. A validation block restricts it to approved sizes, a precondition confirms the chosen AMI is x86_64, and a check block pings the load balancer's health URL after every apply, warning the team if it stops answering without blocking unrelated changes.",
  "tip": "Remember severity: validation, precondition and postcondition failures are errors that stop the run, while a failed check block assertion is only a warning.",
  "check": [
   [
    "You want to be warned when a website stops returning HTTP 200, but you do not want applies to fail. Which construct fits?",
    "A check block with an assert (and optionally a scoped data source), because check failures are reported as warnings and do not block plan or apply."
   ],
   [
    "Which custom condition can refer to the resource's own attributes using self?",
    "A postcondition, because it runs after the object has been created, updated or read."
   ],
   [
    "Where do you put a precondition for a resource?",
    "Inside the resource's lifecycle block; output blocks can also hold a precondition."
   ]
  ]
 },
 {
  "t": "Sensitive data: `sensitive` values, ephemeral variables and resources, write-only arguments, secrets in state",
  "body": [
   "Infrastructure code constantly handles secrets: database passwords, API tokens, private keys. Terraform offers several tools for them, and the exam expects you to know exactly what each one protects and what it does not. The oldest and most misunderstood is the `sensitive` flag.",
   "Setting `sensitive = true` on a variable or output tells Terraform to redact that value in plan and apply output, showing `(sensitive value)` instead. Sensitivity propagates: any expression built from a sensitive value is also treated as sensitive, and a root module output that uses one must itself be marked sensitive. Providers can also mark resource attributes as sensitive. But redaction is only about display. The real value is still written to the state file in plain text, and `terraform output -json` or `terraform output -raw NAME` will show it to anyone who can run the command.",
   "Ephemeral values close that gap. A variable declared with `ephemeral = true` can be used during a run but is never saved in the plan file or the state. Ephemeral resources, declared with an `ephemeral` block instead of a `resource` block, fetch or generate something temporary each run, such as a secret read from a secrets manager or a short-lived token, and Terraform does not persist them. Ephemeral values can only be used in places that do not persist them: provider configuration blocks, other ephemeral contexts, provisioner and connection blocks, and write-only arguments. Child modules can also mark outputs as ephemeral to pass them along.",
   "Write-only arguments are the matching piece on the resource side. A provider can offer an argument, often ending in `_wo`, that accepts a value (including an ephemeral one) and sends it to the API but never records it in the plan or state. Because Terraform cannot compare a value it never stored, these arguments usually come with a companion version argument; you increase the version number when you want Terraform to send a new value.",
   "```hcl\nephemeral \"random_password\" \"db\" {\n  length = 20\n}\n\nresource \"aws_db_instance\" \"main\" {\n  # ...other arguments...\n  password_wo         = ephemeral.random_password.db.result\n  password_wo_version = 1\n}\n```",
   "Even with these features, treat every state file as sensitive. Older providers, data sources and ordinary resource attributes still store secrets in state. Protect state with an encrypted remote backend, strict access control and no commits to version control. Keep secrets out of `.tf` and `.tfvars` files that go into Git, and prefer environment variables (`TF_VAR_name`), a secrets manager or ephemeral resources for supplying them."
  ],
  "terms": [
   [
    "sensitive = true",
    "Marks a variable or output so its value is redacted in CLI output; the value is still stored in state."
   ],
   [
    "Ephemeral variable",
    "A variable declared with ephemeral = true whose value is available during a run but never written to plan or state."
   ],
   [
    "Ephemeral resource",
    "An ephemeral block that obtains a temporary value (such as a secret or token) each run without persisting it."
   ],
   [
    "Write-only argument",
    "A resource argument that accepts a value and passes it to the provider but never stores it in plan or state, usually paired with a version argument."
   ]
  ],
  "example": "A team marked its database password variable sensitive and assumed it was safe, until an auditor opened terraform.tfstate and found the password in plain text. They switched to an ephemeral resource that reads the password from their secrets manager and passes it through the provider's write-only password argument, so the state no longer contains it.",
  "tip": "The exam's favorite trap: sensitive only hides values from CLI output. It does not encrypt them or keep them out of the state file.",
  "check": [
   [
    "Does marking an output sensitive keep it out of terraform.tfstate?",
    "No. It only redacts the value in plan, apply and default output display; the value is still stored in state in plain text."
   ],
   [
    "Why do write-only arguments usually have a companion version argument?",
    "Terraform never stores the write-only value, so it cannot detect a change; bumping the version tells Terraform to send the new value."
   ],
   [
    "Name two places where an ephemeral value may be used.",
    "Examples include a provider configuration block, a write-only argument, another ephemeral resource or variable, and provisioner or connection blocks."
   ]
  ]
 },
 {
  "t": "Secrets management with HashiCorp Vault and the Vault provider",
  "body": [
   "HashiCorp Vault is a secrets management system. It stores secrets centrally, controls who can read them with policies, records every access in audit logs and, most importantly, can generate dynamic secrets: credentials created on demand for a single use or a short lease and revoked automatically afterwards. Pairing Terraform with Vault means your configuration never needs a long-lived cloud key or database password typed into a file.",
   "Terraform talks to Vault through the Vault provider, configured like any other provider with the Vault server address and a way to authenticate. The address and token are usually supplied through environment variables such as `VAULT_ADDR` and `VAULT_TOKEN` rather than written into code, or through an auth method such as AppRole or a cloud identity. The provider can do two jobs: manage Vault itself (mounts, policies, auth methods, roles) as infrastructure, and read secrets out of Vault for use elsewhere in your configuration.",
   "Reading a static secret from a key/value engine is done with a data source, for example `vault_kv_secret_v2` for version 2 of the KV engine or the older generic secret data source. You then reference an attribute of that data source in another resource or provider block. For dynamic secrets, data sources such as the AWS access credentials one ask Vault's AWS secrets engine to mint short-lived AWS keys, which you can feed into the AWS provider block. When the lease expires, Vault revokes the keys, so a leaked credential has a short useful life.",
   "```hcl\ndata \"vault_kv_secret_v2\" \"db\" {\n  mount = \"secret\"\n  name  = \"app/db\"\n}\n\n# later: data.vault_kv_secret_v2.db.data[\"password\"]\n```",
   "There is an important caveat that the exam likes: values read through a data source are stored in the Terraform state file, just like any other attribute. Vault protects the secret at rest in Vault, but once Terraform reads it into a normal data source, your state becomes another place the secret lives. Mitigations include protecting state with an encrypted, access-controlled backend, preferring short-lived dynamic secrets so a copy in state quickly becomes useless, and, where the provider supports it, using ephemeral resources so the secret is used during the run but never persisted.",
   "In HCP Terraform you can go further with dynamic provider credentials, where each run authenticates to Vault using a signed workload identity token instead of a stored Vault token. Whatever the pattern, the principle is the same: Vault is the single source of truth for secrets, Terraform fetches them just in time, and nothing secret is hard-coded in your configuration or committed to version control."
  ],
  "terms": [
   [
    "HashiCorp Vault",
    "A secrets management tool that stores, controls access to, audits and dynamically generates secrets."
   ],
   [
    "Dynamic secret",
    "A credential Vault generates on demand with a lease and revokes automatically when the lease expires."
   ],
   [
    "Vault provider",
    "The Terraform provider used to configure Vault and to read secrets from it through data sources or ephemeral resources."
   ],
   [
    "Lease",
    "The time period a Vault secret is valid for before it must be renewed or is revoked."
   ]
  ],
  "example": "Instead of storing an AWS access key in HCP Terraform variables, a team configures the Vault AWS secrets engine. Their configuration reads short-lived AWS credentials from Vault at the start of each run and passes them into the AWS provider block; the keys expire shortly after the run, so even the copy in state is quickly worthless.",
  "tip": "Secrets read from Vault through a normal data source end up in Terraform state. Vault does not change that; protect the state and prefer short-lived or ephemeral secrets.",
  "check": [
   [
    "Why are dynamic secrets safer than static ones for Terraform runs?",
    "They are created on demand with a short lease and revoked automatically, so a leaked copy (including one in state) stops working soon after the run."
   ],
   [
    "How should the Vault token for the Vault provider usually be supplied?",
    "Through an environment variable such as VAULT_TOKEN or an auth method, not hard-coded in the configuration."
   ]
  ]
 },
 {
  "t": "Root module vs child modules; a module is any directory of .tf files",
  "body": [
   "In Terraform, a module is simply a set of `.tf` (and `.tf.json`) files kept together in one directory. There is no special declaration that makes a folder a module; the directory itself is the module. That means every Terraform configuration you have written so far was already a module, even if you never called it one.",
   "The module you run Terraform commands in is called the root module. When you type `terraform plan` in a working directory, Terraform reads all the `.tf` files in that directory (not in subdirectories) and treats them as one configuration. File names do not matter to Terraform; it merges every file in the directory, so splitting code into `main.tf`, `variables.tf` and `outputs.tf` is a convention for humans.",
   "A child module is any module that another module calls with a `module` block. The root module can call child modules, and those child modules can call their own children, forming a tree. Child modules can come from a subdirectory of your project, from the public Terraform Registry, from a private registry or from a Git repository. The same directory of code can be a root module in one situation (you run Terraform inside it to test it) and a child module in another (someone calls it from their configuration).",
   "Why use modules? They let you package a pattern once, such as a network with public and private subnets, and reuse it in many places with different inputs. They create an abstraction: callers see a small set of input variables and outputs instead of dozens of resources. And they encourage consistency, because every team that uses the approved module builds the same well-reviewed pattern. The trade-off is indirection, so good modules are focused and well documented rather than wrapping a single resource for no benefit.",
   "Addresses reflect the tree. A resource in the root module is addressed like `aws_instance.web`, while a resource inside a child module called `network` is addressed as `module.network.aws_subnet.private`. You will see these addresses in plan output and in commands such as `terraform state list`, so being able to read them tells you exactly where in the module tree a resource lives.",
   "Each module has its own namespace. Variables, locals and resources in a child module are not visible to its parent, and the parent's values are not visible to the child, except through the input variables and outputs the module declares. That encapsulation is what makes modules safe to reuse."
  ],
  "terms": [
   [
    "Module",
    "Any directory containing Terraform configuration files; Terraform treats all .tf files in it as one unit."
   ],
   [
    "Root module",
    "The module in the working directory where Terraform commands are run; the top of the module tree."
   ],
   [
    "Child module",
    "A module called by another module through a module block."
   ],
   [
    "Module address",
    "The path to a resource through the module tree, such as module.network.aws_subnet.private."
   ]
  ],
  "example": "A company keeps a modules/vpc directory. In its CI tests, engineers run terraform apply inside that directory, so it acts as a root module. In production, the environments/prod configuration calls it with a module block named vpc, so there it is a child module and its resources appear as module.vpc.aws_vpc.this.",
  "tip": "If a question asks what makes a directory a module, the answer is simply that it contains Terraform configuration files; the root module is whichever one you run commands from.",
  "check": [
   [
    "Does Terraform read .tf files in subdirectories of the working directory automatically?",
    "No. It reads only the files in the working directory; subdirectories are used only if called as child modules."
   ],
   [
    "What is the address of a resource aws_s3_bucket.logs inside a child module named storage?",
    "module.storage.aws_s3_bucket.logs."
   ]
  ]
 },
 {
  "t": "Module sources: local paths (`./` or `../`), the public Terraform Registry, private registries, Git and HTTP URLs",
  "body": [
   "Every `module` block needs a `source` argument that tells Terraform where to find the module's code. The source string's format decides how Terraform fetches it, so you must be able to recognize each form on sight. The source must be a literal string; you cannot build it from variables.",
   "Local paths start with `./` or `../`, such as `source = \"./modules/network\"`. The leading dot is required, because a string without it is interpreted as a registry address. Local modules are not downloaded or copied; Terraform reads them straight from disk, so changes take effect on the next plan without reinstalling. They cannot have a `version` argument, since they are simply part of your code.",
   "Public Terraform Registry sources use the form `NAMESPACE/NAME/PROVIDER`, for example `terraform-aws-modules/vpc/aws`. Terraform downloads them during `terraform init`, and you should pin them with a `version` constraint. Private registry sources add the registry hostname in front: `HOSTNAME/NAMESPACE/NAME/PROVIDER`. HCP Terraform's private registry uses `app.terraform.io/ORG/NAME/PROVIDER`. Private registries give an organization a curated catalog of approved modules and the same versioning features as the public registry.",
   "Version control sources let you pull a module from a Git repository. Terraform recognizes shorthand such as `github.com/org/repo` and generic Git addresses with a `git::` prefix, such as `git::ssh://git@example.com/org/repo.git`. A double slash selects a subdirectory inside the repository (`repo.git//modules/vpc`), and a `?ref=` query selects a branch, tag or commit. Terraform also supports Mercurial, and archive sources such as an HTTP URL to a zip or tar file, as well as S3 and GCS buckets.",
   "```hcl\nmodule \"vpc\" {\n  source  = \"terraform-aws-modules/vpc/aws\"\n  version = \"~> 5.0\"\n}\n\nmodule \"app\" {\n  source = \"../modules/app\"\n}\n\nmodule \"dns\" {\n  source = \"git::ssh://git@example.com/infra/dns.git?ref=v1.2.0\"\n}\n```",
   "Choosing a source is about trust and change control. Local paths suit modules that live in the same repository. The public registry offers community and partner modules, so review them before use and pin versions. A private registry is the organizational answer for sharing approved modules. Git sources work anywhere, but you must pin a tag or commit with `ref` to get repeatable builds."
  ],
  "terms": [
   [
    "source argument",
    "The required module block argument that tells Terraform where to find the module code."
   ],
   [
    "Registry source",
    "A module address in the form NAMESPACE/NAME/PROVIDER, prefixed with a hostname for private registries."
   ],
   [
    "Local path source",
    "A module path beginning with ./ or ../ that Terraform reads directly from disk without downloading."
   ],
   [
    "Double-slash subdirectory",
    "The // syntax in a source address that selects a subdirectory within a downloaded repository or archive."
   ]
  ],
  "example": "An engineer writes source = \"modules/network\" and Terraform tries to download it from the public registry and fails. Changing it to source = \"./modules/network\" makes Terraform treat it as a local path and read the code from the repository.",
  "tip": "Know the address shapes: ./ or ../ means local, three slash-separated parts mean public registry, a hostname plus three parts means private registry, and git:: or ?ref= means a Git source.",
  "check": [
   [
    "What is the format of a private registry module source?",
    "HOSTNAME/NAMESPACE/NAME/PROVIDER, for example app.terraform.io/example-org/vpc/aws."
   ],
   [
    "Why must a local module path start with ./ or ../?",
    "Without the leading dot, Terraform interprets the string as a registry address instead of a local directory."
   ],
   [
    "Can the source argument be set from a variable?",
    "No. It must be a literal string, because Terraform resolves sources during init before variables are evaluated."
   ]
  ]
 },
 {
  "t": "Calling a module with a `module` block and passing input variables",
  "body": [
   "Using a module in your configuration is called calling it, and you do it with a `module` block. The label after `module` is a local name you choose, such as `module \"web_server\"`. That name is how you refer to this particular instance of the module elsewhere, and you can call the same module source several times under different names to build several copies with different settings.",
   "Inside the block, a few arguments are reserved by Terraform itself. `source` (required) says where the code comes from, and `version` pins a registry module release. The meta-arguments `count`, `for_each`, `providers` and `depends_on` work on module blocks much as they do on resources. Every other argument you write in the block sets one of the module's input variables, using the variable's name as the argument name.",
   "```hcl\nmodule \"web_server\" {\n  source        = \"./modules/server\"\n  instance_type = \"t3.small\"\n  subnet_id     = aws_subnet.public.id\n  tags          = { team = \"web\" }\n}\n```",
   "In this example the child module at `./modules/server` must declare `variable \"instance_type\"`, `variable \"subnet_id\"` and `variable \"tags\"`. If you pass an argument the module does not declare, Terraform reports an unsupported argument error. If the module declares a variable without a `default` and you do not pass it, Terraform reports that a required argument is missing. Variables with defaults are optional, and you only set them when you want a different value. Terraform checks each value against the variable's `type` constraint and any validation rules.",
   "Input values can be any expression: literals, variables of the calling module (`var.env`), resource attributes (`aws_subnet.public.id`) or outputs of other modules (`module.network.subnet_ids`). When you pass a resource attribute or another module's output, Terraform automatically records a dependency, so it creates the upstream objects first. You rarely need `depends_on` on a module; use it only for hidden dependencies Terraform cannot see from references.",
   "After adding or changing a module block's source, you must run `terraform init` (or `terraform get`) so Terraform installs the module. Changing only the input values does not need a new init; just plan and apply. The plan will show the child module's resources with addresses that begin with `module.web_server.`, which is a quick way to confirm your call worked the way you expected."
  ],
  "terms": [
   [
    "module block",
    "A block that calls a child module, giving it a local name, a source and values for its input variables."
   ],
   [
    "Input variable",
    "A variable declared in the child module that callers set as an argument in the module block."
   ],
   [
    "Required input",
    "A module variable without a default; callers must supply it or Terraform reports an error."
   ],
   [
    "Meta-arguments",
    "Arguments Terraform itself handles on a module block: source, version, count, for_each, providers and depends_on."
   ]
  ],
  "example": "A team calls the same ./modules/server module twice, as module \"web\" and module \"api\", passing different instance_type and subnet_id values. Terraform builds two independent sets of resources, addressed as module.web.aws_instance.this and module.api.aws_instance.this.",
  "tip": "Arguments in a module block (other than the meta-arguments) map one-to-one to the child's variable blocks; a missing required variable or an undeclared argument are both errors.",
  "check": [
   [
    "You add a new module block. What must you run before terraform plan?",
    "terraform init (or terraform get) to install the module."
   ],
   [
    "What happens if you set an argument in a module block that the child module does not declare as a variable?",
    "Terraform reports an error for an unsupported argument."
   ]
  ]
 },
 {
  "t": "Variable scope: child modules only see values passed in; outputs are read as `module.NAME.OUTPUT`",
  "body": [
   "Modules are sealed boxes. A child module cannot see the variables, locals, resources or data sources of the module that calls it, and the caller cannot reach inside the child to read its resources directly. The only way in is through input variables, and the only way out is through outputs. This strict scoping is what makes a module predictable and reusable, because its behavior depends only on the values it is given.",
   "Consider a root module with `variable \"region\"`. A child module that writes `var.region` is referring to its own `region` variable, not the root's. If the child does not declare one, the reference is an error. To make the root's value available, the child must declare `variable \"region\"` and the caller must pass it in the module block: `region = var.region`. The same rule applies to environment variables set with `TF_VAR_region`: they set root module variables only, never child module variables directly.",
   "Going the other way, a child exposes data with `output` blocks. The caller reads those outputs using the syntax `module.MODULE_NAME.OUTPUT_NAME`. If the module uses `count`, you index it (`module.web[0].ip`), and with `for_each` you use the key (`module.web[\"blue\"].ip`). Anything the child does not export stays private; you cannot write `module.network.aws_vpc.this.id` in an expression.",
   "```hcl\n# modules/network/outputs.tf\noutput \"vpc_id\" {\n  value = aws_vpc.this.id\n}\n\n# root main.tf\nresource \"aws_security_group\" \"app\" {\n  vpc_id = module.network.vpc_id\n}\n```",
   "Only root module outputs are shown after `terraform apply` and by `terraform output`. If you want a child module's value to appear there, the root module must re-export it with its own output, such as `output \"vpc_id\" { value = module.network.vpc_id }`. This is a very common exam scenario: a value exists in a child module's output but does not appear on the command line because the root never passed it up.",
   "Because values flow only through explicit interfaces, reading a module's `variables.tf` and `outputs.tf` tells you everything you need to use it. Designing good modules means choosing that interface carefully: expose the inputs callers genuinely need to change and the outputs other parts of the system will consume, such as IDs, ARNs and endpoints, and keep everything else internal."
  ],
  "terms": [
   [
    "Module scope",
    "The rule that each module has its own namespace and sees only its own variables, locals and resources."
   ],
   [
    "Output value",
    "A value a module exports with an output block, readable by its caller as module.NAME.OUTPUT."
   ],
   [
    "Re-exporting",
    "Declaring a root module output whose value is a child module output, so it appears in terraform output."
   ],
   [
    "TF_VAR_ environment variable",
    "An environment variable that sets a root module input variable; it does not reach child modules directly."
   ]
  ],
  "example": "An engineer runs terraform output expecting to see the database endpoint, but nothing appears. The endpoint is an output of module.db, and the root module never re-exported it. Adding output \"db_endpoint\" { value = module.db.endpoint } in the root makes it visible.",
  "tip": "Values move down only through module block arguments and up only through outputs; a child can never read the parent's var. values directly.",
  "check": [
   [
    "How does the root module read the subnet_ids output of a module named network?",
    "With module.network.subnet_ids."
   ],
   [
    "Why doesn't a child module output show up in terraform output?",
    "terraform output shows only root module outputs; the root must declare its own output that references the child's output."
   ],
   [
    "A child module references var.env but the root sets TF_VAR_env. Does the child get the value?",
    "Not automatically. The child must declare variable env and the root must pass it in the module block."
   ]
  ]
 },
 {
  "t": "Passing provider configurations to modules with the `providers` argument",
  "body": [
   "Resources in a child module need a provider configuration, such as an AWS provider set to a particular region and account. By default, a child module inherits the default (unaliased) provider configurations of its parent automatically. If your root module has one `provider \"aws\"` block, every module that uses AWS resources quietly uses it. That implicit inheritance covers most simple configurations.",
   "Things change when you have more than one configuration of the same provider. You create extra configurations with the `alias` meta-argument, for example a second AWS provider for another region: `provider \"aws\" { alias = \"west\"  region = \"us-west-2\" }`, referenced as `aws.west`. Aliased configurations are never inherited implicitly. To make a module use one, you pass it explicitly with the `providers` argument on the module block.",
   "```hcl\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nprovider \"aws\" {\n  alias  = \"west\"\n  region = \"us-west-2\"\n}\n\nmodule \"replica\" {\n  source = \"./modules/bucket\"\n  providers = {\n    aws = aws.west\n  }\n}\n```",
   "The `providers` argument is a map. The key is the provider name as the child module sees it, and the value is a provider configuration in the calling module. In the example, everything in `./modules/bucket` that uses `aws` gets the us-west-2 configuration. Once you set `providers` for a module, Terraform uses only the mappings you listed, so include every provider the module needs.",
   "Some modules need two configurations of the same provider at once, for instance to set up replication between a source bucket and a destination bucket in different regions. Such a module declares the extra names it expects with `configuration_aliases` inside its `required_providers` entry, such as `configuration_aliases = [aws.src, aws.dst]`. The caller then maps both: `providers = { aws.src = aws.east, aws.dst = aws.west }`.",
   "Best practice is that reusable child modules should not contain their own `provider` blocks. Provider configuration belongs in the root module, and child modules declare only their `required_providers` requirements (source and version constraints). Modules that contain provider blocks are called legacy modules and cannot be used with `count`, `for_each` or `depends_on`. They also cause trouble when removed, because Terraform needs the provider configuration to destroy the module's resources. Keeping providers in the root and passing them down gives callers control over regions, accounts and credentials."
  ],
  "terms": [
   [
    "Provider alias",
    "An extra, named configuration of a provider created with the alias meta-argument and referenced as PROVIDER.ALIAS."
   ],
   [
    "providers argument",
    "A map on a module block that assigns the caller's provider configurations to the provider names the child module uses."
   ],
   [
    "Implicit provider inheritance",
    "The default behavior where child modules automatically use the parent's default, unaliased provider configurations."
   ],
   [
    "configuration_aliases",
    "A required_providers setting in a child module that declares additional provider configuration names the caller must pass in."
   ]
  ],
  "example": "A disaster recovery module creates a primary database in one region and a replica in another. It declares configuration_aliases = [aws.primary, aws.replica], and the root module calls it with providers = { aws.primary = aws, aws.replica = aws.dr }, so one module call builds resources in two regions.",
  "tip": "Default provider configurations are inherited automatically; aliased ones never are and must be passed with the providers map on the module block.",
  "check": [
   [
    "Your root module defines provider aws with alias eu. How do you make module logs use it?",
    "Add providers = { aws = aws.eu } to the module \"logs\" block."
   ],
   [
    "Why should reusable modules avoid their own provider blocks?",
    "Provider configuration belongs to the caller; modules with provider blocks cannot use count, for_each or depends_on and are hard to remove safely."
   ]
  ]
 },
 {
  "t": "The `version` argument (registry sources only) and `ref` for Git sources",
  "body": [
   "Modules change over time, and an unpinned module can silently pull in a new release that renames resources or changes defaults. Terraform gives you two different pinning mechanisms depending on where the module comes from, and the exam tests which one applies to which source.",
   "For modules from a registry, either the public Terraform Registry or a private registry such as HCP Terraform's, you use the `version` argument in the module block. It accepts the same constraint syntax as provider versions: an exact version (`\"1.4.0\"` or `\"= 1.4.0\"`), comparisons (`\">= 1.2.0, < 2.0.0\"`), exclusions (`\"!= 1.3.1\"`) and the pessimistic operator `~>`. `~> 1.4` allows 1.4 and any later 1.x release but not 2.0; `~> 1.4.0` allows only 1.4.x patch releases. During `terraform init`, Terraform picks the newest available version that satisfies the constraint.",
   "The `version` argument works only with registry sources. Put it on a local path or Git source and Terraform reports an error, because those sources have no registry version list to choose from. Local modules are versioned together with the code around them, so they need no pin.",
   "For Git sources you pin with the `ref` query parameter in the source string. It can name a tag, a branch or a full commit SHA: `source = \"git::ssh://git@example.com/infra/modules.git//vpc?ref=v2.1.0\"`. Tags give readable, stable releases. A commit SHA is the most exact and cannot be moved, which is attractive for strict supply-chain control. A branch name is the weakest choice, because the branch moves as people push to it, so two runs of `terraform init` could fetch different code. Without any `ref`, Terraform uses the repository's default branch.",
   "```hcl\nmodule \"vpc\" {\n  source  = \"app.terraform.io/example-org/vpc/aws\"\n  version = \"~> 3.2\"\n}\n\nmodule \"dns\" {\n  source = \"git::ssh://git@example.com/infra/dns.git?ref=v1.0.4\"\n}\n```",
   "Unlike providers, module versions are not recorded in the dependency lock file (`.terraform.lock.hcl`). That file tracks provider versions and checksums only. So for modules, the constraint in your code is your only protection, which is why exact or tightly bounded versions, or immutable tags and SHAs, are recommended for production. To move to a newer allowed module version, run `terraform init -upgrade` (or `terraform get -update`)."
  ],
  "terms": [
   [
    "version argument",
    "A module block argument that sets a version constraint; valid only for registry module sources."
   ],
   [
    "ref parameter",
    "A query parameter in a Git source address that selects a tag, branch or commit to check out."
   ],
   [
    "Pessimistic constraint (~>)",
    "A version operator that allows only the rightmost specified component to increase, such as ~> 1.4 allowing 1.x from 1.4 up."
   ],
   [
    "Dependency lock file",
    ".terraform.lock.hcl, which records provider versions and hashes but not module versions."
   ]
  ],
  "example": "A team pinned its Git module to ?ref=main. One morning a colleague merged a breaking change to main, and the next CI run pulled it in and planned to replace a load balancer. They switched to ?ref=v4.2.0 tags so module upgrades happen only when someone edits the ref deliberately.",
  "tip": "version is for registry modules only; Git modules pin with ?ref=. Also remember that the lock file does not pin module versions.",
  "check": [
   [
    "You add version = \"1.0.0\" to a module whose source is ./modules/app. What happens?",
    "Terraform reports an error, because the version argument is only supported for registry sources."
   ],
   [
    "Which Git ref is the most immutable choice?",
    "A full commit SHA, since tags can technically be moved and branches move constantly."
   ],
   [
    "Does .terraform.lock.hcl record module versions?",
    "No. It records only provider versions and checksums."
   ]
  ]
 },
 {
  "t": "`terraform init` or `terraform get` to install modules into `.terraform/modules`",
  "body": [
   "Terraform cannot plan a configuration until it has the code for every module that configuration calls. Installing modules is one of the jobs of `terraform init`, alongside initializing the backend and installing providers. You must run init whenever you add a module block, change a module's `source` or `version`, or clone a repository onto a fresh machine.",
   "During init, Terraform walks the module tree, reads each `source` and fetches what it needs. Registry modules are downloaded at the newest version that satisfies the `version` constraint, and Git or archive sources are cloned or unpacked. The code lands in the hidden `.terraform/modules` directory inside your working directory, and Terraform writes a `modules.json` manifest there that records which module call maps to which directory and version. Local path modules are not copied; the manifest simply points at their location on disk.",
   "`terraform get` is a narrower command that does only the module step: it downloads and updates modules without touching the backend or providers. It is handy when you have edited module blocks and want to refresh them quickly. Both commands support an upgrade flag: `terraform init -upgrade` and `terraform get -update` fetch the newest versions allowed by your constraints instead of keeping what is already installed. Without those flags, Terraform keeps already-installed modules if they still satisfy the configuration.",
   "```text\n$ terraform init\nInitializing modules...\nDownloading registry.terraform.io/terraform-aws-modules/vpc/aws 5.x.y for vpc...\n- vpc in .terraform/modules/vpc\n- app in modules/app\n```",
   "The whole `.terraform` directory is a local cache. It should be listed in `.gitignore` and never committed, because it contains downloaded code and provider binaries specific to the machine, and it can be recreated at any time by running init again. The dependency lock file, `.terraform.lock.hcl`, is different: it lives next to your configuration and should be committed so everyone uses the same provider versions.",
   "If you forget to run init after adding a module, `terraform plan` stops with an error saying the module is not installed and suggests running `terraform init`. That message is a reliable signal. Running init is safe to repeat; it is idempotent and will not change infrastructure, which is why CI pipelines typically run it at the start of every job."
  ],
  "terms": [
   [
    ".terraform/modules",
    "The hidden directory in the working directory where Terraform stores downloaded module code and the modules.json manifest."
   ],
   [
    "terraform get",
    "A command that downloads and updates modules only, without initializing backends or providers."
   ],
   [
    "terraform init -upgrade",
    "Re-evaluates version constraints and installs the newest allowed module and provider versions."
   ],
   [
    "modules.json",
    "A manifest in .terraform/modules that records each module call's source, version and install directory."
   ]
  ],
  "example": "A new engineer clones the infrastructure repository and runs terraform plan straight away. Terraform errors that module \"vpc\" is not installed. After running terraform init, the VPC module appears under .terraform/modules/vpc and the plan succeeds.",
  "tip": "Adding or changing a module source or version requires init (or get); changing only module input values does not. Never commit the .terraform directory.",
  "check": [
   [
    "What is the difference between terraform init and terraform get?",
    "init initializes the backend, installs providers and modules; get only downloads or updates modules."
   ],
   [
    "Where are downloaded modules stored?",
    "In the .terraform/modules directory inside the working directory."
   ]
  ]
 },
 {
  "t": "Using `count` and `for_each` on module blocks",
  "body": [
   "Since Terraform 0.13, the `count` and `for_each` meta-arguments work on `module` blocks as well as resources. They let one module block create several instances of an entire module, each with its own copy of all the module's resources. This is how you stamp out a set of similar environments, buckets or services without copying code.",
   "With `count`, you give a whole number and Terraform creates that many instances, indexed from zero. Inside the module block, `count.index` gives the current number, which you can use to vary inputs. The instances are addressed as `module.NAME[0]`, `module.NAME[1]` and so on. `count` also works as an on/off switch: `count = var.enable_monitoring ? 1 : 0` includes or omits the entire module.",
   "With `for_each`, you give a map or a set of strings, and Terraform creates one instance per element. `each.key` and `each.value` are available inside the block. Instances are addressed by key, such as `module.bucket[\"logs\"]`. Because each instance is tied to a stable key rather than a position, removing one element from the middle of the collection destroys only that instance; with `count`, removing an element shifts every later index and can cause unwanted replacements.",
   "```hcl\nmodule \"bucket\" {\n  source   = \"./modules/bucket\"\n  for_each = toset([\"logs\", \"backups\", \"assets\"])\n  name     = \"example-${each.key}\"\n}\n\noutput \"bucket_arns\" {\n  value = { for k, m in module.bucket : k => m.arn }\n}\n```",
   "Because a counted or for_each module is a collection, you read outputs with an index or key: `module.bucket[\"logs\"].arn`, or iterate as in the example. The values used in `count` and `for_each` must be known at plan time; you cannot base them on attributes that only exist after apply, such as a generated ID. A module block cannot use `count` and `for_each` together.",
   "One restriction to remember: a module that contains its own `provider` blocks (a legacy module) cannot be used with `count`, `for_each` or `depends_on`. This is another reason to keep provider configuration in the root module and pass it down. When converting an existing single module call to `for_each`, the resource addresses change, so use a `moved` block (for example from `module.bucket` to `module.bucket[\"logs\"]`) to avoid destroying and recreating the resources."
  ],
  "terms": [
   [
    "count on a module",
    "Creates a number of module instances addressed by index, such as module.web[0]."
   ],
   [
    "for_each on a module",
    "Creates one module instance per map key or set element, addressed by key, such as module.web[\"blue\"]."
   ],
   [
    "each.key / each.value",
    "Values available inside a for_each block that identify the current element."
   ],
   [
    "Legacy module",
    "A module containing its own provider blocks; it cannot be used with count, for_each or depends_on."
   ]
  ],
  "example": "A company runs the same service in three regions. Instead of three module blocks, it uses for_each over a map of region names to CIDR ranges and passes each.value as the network range. Adding a fourth region is a one-line change to the map.",
  "tip": "Prefer for_each over count when instances are distinct and may be removed individually; count indexes shift when an item in the middle is removed.",
  "check": [
   [
    "How do you read the endpoint output of the instance with key prod in a for_each module named app?",
    "module.app[\"prod\"].endpoint."
   ],
   [
    "How can count be used to make a module optional?",
    "Set count = var.enabled ? 1 : 0 so the module has one instance or none."
   ],
   [
    "Which kind of module cannot use count or for_each?",
    "A module that includes its own provider configuration blocks."
   ]
  ]
 },
 {
  "t": "Standard module structure: main.tf, variables.tf, outputs.tf, README",
  "body": [
   "Terraform does not care what your files are called; it reads every `.tf` file in a directory. People, however, care a great deal. HashiCorp documents a standard module structure so that anyone opening a module, or the Terraform Registry rendering it, knows where to look. Following it is expected for modules you publish and is good practice for internal ones.",
   "The minimal recommended layout has three configuration files plus documentation. `main.tf` is the primary entry point, holding the main resources (or nested module calls). `variables.tf` contains every `variable` block, each with a `description` and a `type`, so callers can see the full input interface in one place. `outputs.tf` contains every `output` block, again with descriptions. A `README.md` explains what the module does, how to use it and any assumptions. A `LICENSE` file is expected for modules shared publicly.",
   "```text\nterraform-aws-network/\n  README.md\n  LICENSE\n  main.tf\n  variables.tf\n  outputs.tf\n  versions.tf        # terraform and required_providers blocks\n  modules/\n    subnet/          # nested modules\n  examples/\n    basic/           # example root configurations\n```",
   "Larger modules add a few conventional pieces. Many teams put the `terraform` block with `required_version` and `required_providers` in a `versions.tf` file. Nested modules go under a `modules/` subdirectory, and a nested module without a README is treated as internal. Example configurations that show how to call the module go under `examples/`, each as its own small root module. Tests can live in a `tests/` directory for the `terraform test` framework.",
   "Publishing to the public Terraform Registry adds rules of its own. The module must live in a public GitHub repository named in the form `terraform-PROVIDER-NAME`, such as `terraform-aws-network`, follow the standard structure, and have semantic version tags like `v1.0.0`, which the registry turns into releases. The registry reads the README, inputs and outputs and generates documentation automatically, which is one reason clear descriptions on variables and outputs matter.",
   "Good structure goes beyond file names. A well-designed module does one job, exposes only the inputs callers genuinely need, provides sensible defaults, exports the IDs and endpoints consumers will need, and leaves provider configuration to the caller. It should also avoid hard-coding values such as regions or account numbers, so the same module can be reused across environments."
  ],
  "terms": [
   [
    "main.tf",
    "The conventional primary file of a module, holding its main resources and module calls."
   ],
   [
    "variables.tf",
    "The conventional file holding a module's input variable declarations, forming its input interface."
   ],
   [
    "outputs.tf",
    "The conventional file holding a module's output declarations, forming its output interface."
   ],
   [
    "terraform-PROVIDER-NAME",
    "The repository naming convention required for modules published to the public Terraform Registry."
   ]
  ],
  "example": "An engineer inherits a module where all resources, variables and outputs are mixed across files named a.tf, b.tf and misc.tf. Reorganizing it into main.tf, variables.tf with descriptions, outputs.tf and a README with a usage example lets teammates understand and call it without reading every line.",
  "tip": "File names are a convention, not a requirement: Terraform merges all .tf files in a directory, but the standard structure (main, variables, outputs, README) is what the registry and reviewers expect.",
  "check": [
   [
    "Does Terraform require a file named main.tf?",
    "No. Terraform loads every .tf file in the directory; main.tf is only a naming convention."
   ],
   [
    "What naming format must a GitHub repository use to publish a module to the public registry?",
    "terraform-PROVIDER-NAME, for example terraform-aws-vpc."
   ]
  ]
 },
 {
  "t": "The default local backend and the `terraform.tfstate` file, `terraform.tfstate.backup`",
  "body": [
   "Terraform must remember which real objects belong to which resource blocks, along with their current attributes. It keeps that memory in state. Without state, Terraform could not tell whether `aws_instance.web` already exists or which of many cloud instances it corresponds to. Where and how state is stored is controlled by the backend.",
   "If you do not configure any backend, Terraform uses the local backend. It stores state in a file named `terraform.tfstate` in the root of your working directory. The file is JSON and contains a format version, the Terraform version that wrote it, a serial number that increases with every change, a lineage ID that identifies this state's history, root outputs and a list of resources with all their attributes. You can open it and read it, but you should never edit it by hand; use Terraform's state commands instead.",
   "Every time Terraform writes a new state, the local backend first saves the previous version as `terraform.tfstate.backup`. If an apply goes badly or the state becomes corrupted, that backup gives you one step of history to recover from. It is only one step, though: the next write overwrites the backup. Real version history comes from remote backends with versioning, such as an S3 bucket with versioning enabled or HCP Terraform.",
   "When you use CLI workspaces with the local backend, the default workspace keeps using `terraform.tfstate`, while other workspaces store state under `terraform.tfstate.d/WORKSPACE_NAME/terraform.tfstate`. You can also point the local backend to a different file with its `path` argument, or override the location for one command with older `-state` flags, although those flags are legacy and not recommended.",
   "The local backend is fine for learning and for single-person experiments, but it has serious drawbacks for teams. The state exists only on one laptop, so teammates cannot safely run Terraform; losing the laptop loses the state. It contains secrets in plain text. And unless you are careful, it ends up committed to Git. Add `*.tfstate` and `*.tfstate.*` to `.gitignore`, and move to a remote backend with locking and encryption once more than one person or a CI pipeline is involved.",
   "State also improves performance and tracks metadata such as dependencies between resources, which Terraform needs to destroy objects in the right order even after you delete their configuration. That is why state is essential, not a cache you can throw away."
  ],
  "terms": [
   [
    "State",
    "Terraform's record mapping resources in configuration to real objects, with their attributes and metadata."
   ],
   [
    "Local backend",
    "The default backend, which stores state in a file on the local disk."
   ],
   [
    "terraform.tfstate",
    "The JSON state file the local backend writes in the working directory."
   ],
   [
    "terraform.tfstate.backup",
    "A copy of the previous state that the local backend writes before replacing terraform.tfstate."
   ]
  ],
  "example": "A student runs terraform apply on a laptop, then reformats the laptop. The cloud resources still exist, but terraform.tfstate is gone, so Terraform no longer knows about them and the next apply would try to create duplicates. Importing them back or keeping state in a remote backend would have avoided the problem.",
  "tip": "No backend block means the local backend, which writes terraform.tfstate plus a single-step terraform.tfstate.backup in the working directory.",
  "check": [
   [
    "What file holds the previous version of local state?",
    "terraform.tfstate.backup, written before each new state is saved."
   ],
   [
    "Why should terraform.tfstate not be committed to Git?",
    "It can contain secrets in plain text and cannot be locked, so sharing it through Git risks leaks and conflicting changes."
   ]
  ]
 },
 {
  "t": "State locking: why it prevents corruption, which backends support it, `-lock-timeout` and `terraform force-unlock`",
  "body": [
   "Imagine two engineers running `terraform apply` against the same state at the same moment. Both read the same starting state, both make changes in the cloud and both try to write a new state. Whichever writes second overwrites the first, and the state no longer matches reality. State locking prevents this by letting only one operation that could write state run at a time.",
   "When a backend supports locking, Terraform acquires the lock automatically before any operation that might write state, such as `plan`, `apply`, `destroy`, `import` and the state-changing `state` subcommands, and releases it at the end. If someone else holds the lock, your command fails with an error showing the lock ID, who holds it, the operation and when it was taken. You do not have to do anything to enable locking beyond choosing a backend that supports it.",
   "Not every backend supports locking. The local backend locks using the operating system's file locking. Among remote backends, azurerm uses blob leases, gcs uses a lock file in the bucket, consul and pg (PostgreSQL) support locking natively, and HCP Terraform locks workspaces during runs. The s3 backend historically needed a separate DynamoDB table for locking; newer Terraform versions can instead use a lock file in the S3 bucket itself with `use_lockfile = true`, and the DynamoDB approach is being phased out. Always check the backend's documentation, because a backend without locking leaves you exposed.",
   "Two flags control lock behavior. `-lock-timeout=DURATION`, such as `-lock-timeout=5m`, tells Terraform to keep retrying for that long before giving up, which is useful in CI where jobs might briefly overlap. The default is to fail immediately. `-lock=false` disables locking for a command; it is dangerous and should be avoided except in unusual recovery situations.",
   "```text\n$ terraform force-unlock 6f1c2a3b-9d4e-4a7b-8c21-0e5f7d9a1b22\nDo you really want to force-unlock?\n  Only 'yes' will be accepted to confirm.\n```",
   "Sometimes a lock is left behind, for example if a CI job was killed or a laptop lost its network mid-apply. `terraform force-unlock LOCK_ID` removes it. It takes the lock ID shown in the error message and only unlocks state for the current configuration. Use it only when you are sure no other operation is actually running; force-unlocking an active run invites exactly the corruption locking was meant to prevent."
  ],
  "terms": [
   [
    "State locking",
    "A backend feature that allows only one state-writing Terraform operation at a time to prevent corruption."
   ],
   [
    "-lock-timeout",
    "A flag that makes Terraform retry acquiring a held lock for a given duration before failing."
   ],
   [
    "terraform force-unlock",
    "Manually removes a stale lock using its lock ID; for use only when no operation is running."
   ],
   [
    "Lock ID",
    "The identifier shown in a lock error that force-unlock needs to release that specific lock."
   ]
  ],
  "example": "A CI job applying networking changes is cancelled halfway, leaving the S3 backend locked. The next pipeline fails with a lock error. After confirming in the CI system that no job is still running, an engineer runs terraform force-unlock with the lock ID from the error, then re-runs the pipeline.",
  "tip": "Locking is automatic on supporting backends. force-unlock needs the lock ID and is a last resort; -lock-timeout waits for a lock instead of failing immediately.",
  "check": [
   [
    "What argument does terraform force-unlock require?",
    "The lock ID of the lock to remove, shown in the lock error message."
   ],
   [
    "Your pipeline sometimes fails because another job briefly holds the lock. Which flag helps?",
    "-lock-timeout, for example -lock-timeout=5m, so Terraform retries instead of failing immediately."
   ],
   [
    "Do you need to enable locking manually on a backend that supports it?",
    "No. Terraform acquires and releases locks automatically for operations that could write state."
   ]
  ]
 },
 {
  "t": "The `backend` block inside `terraform {}`: remote backends such as S3, azurerm, gcs, consul and pg",
  "body": [
   "A backend decides where Terraform stores state and, for some backends, how it locks that state. You choose one with a `backend` block nested inside the top-level `terraform` block of the root module. Only one backend can be configured per configuration, and only the root module's backend matters; child modules cannot have their own.",
   "Remote backends put state somewhere shared, durable and access-controlled, which is what teams need. Everyone and every pipeline reads and writes the same state, locking prevents simultaneous writes, and the storage service can provide encryption and version history. Terraform also reads and writes remote state in memory where possible rather than leaving copies on disk.",
   "```hcl\nterraform {\n  backend \"s3\" {\n    bucket       = \"example-tf-state\"\n    key          = \"network/terraform.tfstate\"\n    region       = \"us-east-1\"\n    encrypt      = true\n    use_lockfile = true\n  }\n}\n```",
   "The common backends you should recognize are these. `s3` stores state as an object in an Amazon S3 bucket; `key` is the object path, `encrypt` enables server-side encryption, and locking uses either an S3 lock file (`use_lockfile`) or, in older setups, a DynamoDB table. `azurerm` stores state as a blob in an Azure Storage container, using `storage_account_name`, `container_name` and `key`, and locks with blob leases. `gcs` stores state in a Google Cloud Storage bucket with a `bucket` and `prefix`, and supports locking. `consul` stores state in HashiCorp Consul's key/value store under a `path`. `pg` stores state in a PostgreSQL database. There are others, such as `http` and `kubernetes`, and the `local` backend is the default when none is set.",
   "Changing the backend block requires re-initialization. After you add or edit it, `terraform init` configures the backend, and if state already exists elsewhere it offers to copy it (see `-migrate-state`). Terraform records the active backend settings in `.terraform/terraform.tfstate` inside the hidden `.terraform` directory; this small file is not your real state and should not be confused with it.",
   "Backend credentials, such as cloud access keys, should not be written into the backend block. Supply them with the usual provider-style environment variables or credential files, or with partial configuration at init time. HCP Terraform is configured with a separate `cloud` block rather than a backend block, and older configurations may still use the `remote` backend for the same service."
  ],
  "terms": [
   [
    "Backend",
    "The component that determines where Terraform state is stored and whether it can be locked."
   ],
   [
    "backend block",
    "A block inside terraform {} that selects a backend type and sets its arguments; only one per root module."
   ],
   [
    "Remote backend",
    "A backend that stores state in a shared service such as S3, Azure Storage, GCS, Consul or PostgreSQL."
   ],
   [
    "key (s3/azurerm)",
    "The path or blob name under which the state file is stored in the bucket or container."
   ]
  ],
  "example": "A team moves from local state to the s3 backend. They add a backend \"s3\" block with the bucket, key, region, encrypt = true and locking, run terraform init, accept the prompt to copy the existing state, and from then on every engineer and the CI pipeline share the same locked state.",
  "tip": "The backend block goes inside terraform {}, only in the root module, and any change to it requires running terraform init again.",
  "check": [
   [
    "Where is a backend block placed?",
    "Inside the top-level terraform block of the root module."
   ],
   [
    "Which backend stores state in Azure Storage and locks with blob leases?",
    "The azurerm backend."
   ],
   [
    "What must you run after changing backend settings?",
    "terraform init, which reconfigures the backend and can migrate existing state."
   ]
  ]
 },
 {
  "t": "Backend blocks cannot use variables; partial configuration with `-backend-config`",
  "body": [
   "Terraform initializes the backend before it evaluates anything else in the configuration, because it needs the backend to read state. At that early point, input variables, locals and data sources have not been processed. As a result, a `backend` block cannot contain references such as `var.bucket`, `local.key` or any other expression that depends on configuration values. Only literal values are allowed, and Terraform reports an error if you try to use a variable there.",
   "That restriction creates a practical problem. You often want the same code to use a different bucket or key for each environment, and you certainly do not want access keys hard-coded in version control. The answer is partial configuration: leave some or all backend arguments out of the block and supply them when you run `terraform init`.",
   "There are three ways to provide the missing values. You can pass key/value pairs on the command line with `-backend-config=\"KEY=VALUE\"`, repeating the flag for each argument. You can pass a file path with `-backend-config=PATH`, where the file contains the arguments in HCL format (commonly named something like `prod.s3.tfbackend`). Or, if you run init interactively and required values are missing, Terraform prompts for them. Many backends also read certain settings, especially credentials, from environment variables.",
   "```text\n# backend.tf\nterraform {\n  backend \"s3\" {}\n}\n\n# prod.s3.tfbackend\nbucket = \"example-prod-state\"\nkey    = \"app/terraform.tfstate\"\nregion = \"us-east-1\"\n\n$ terraform init -backend-config=prod.s3.tfbackend\n```",
   "An empty backend block like `backend \"s3\" {}` is valid and common; it declares the backend type while leaving all settings to init. Terraform merges the values from the block, the files and the command line. The final merged configuration is stored in `.terraform/terraform.tfstate` and in any saved plan files, so be aware that secrets passed this way are written to local disk. For credentials, environment variables or the platform's standard credential chain are usually a better choice.",
   "Partial configuration works well with CI pipelines, which can call `terraform init -backend-config=env/${ENV}.tfbackend` for each environment while the Terraform code stays identical. It also keeps environment-specific or sensitive details out of shared code. The `cloud` block for HCP Terraform has a similar limitation and can instead read settings from environment variables such as `TF_CLOUD_ORGANIZATION` and `TF_WORKSPACE`."
  ],
  "terms": [
   [
    "Partial configuration",
    "Leaving some backend arguments out of the backend block and supplying them at terraform init time."
   ],
   [
    "-backend-config",
    "An init flag that supplies backend settings, either as KEY=VALUE pairs or as a path to a configuration file."
   ],
   [
    "Backend configuration file",
    "An HCL file of backend arguments passed with -backend-config, often named with a .tfbackend suffix."
   ],
   [
    "Early evaluation",
    "The reason backends cannot use variables: backends are initialized before variables and locals are evaluated."
   ]
  ],
  "example": "A pipeline deploys the same code to dev and prod. The backend block is just backend \"azurerm\" {}. The dev job runs terraform init -backend-config=dev.tfbackend and the prod job uses prod.tfbackend, each pointing at a different storage account and key, with credentials coming from the pipeline's managed identity.",
  "tip": "If a question shows var. inside a backend block, the answer is that it is not allowed; use -backend-config files or key/value pairs at init instead.",
  "check": [
   [
    "Why can't a backend block reference input variables?",
    "The backend is initialized before Terraform evaluates variables and locals, so only literal values are allowed."
   ],
   [
    "Name two forms the -backend-config flag accepts.",
    "A KEY=VALUE pair such as -backend-config=\"bucket=my-state\", or a path to a file containing backend arguments."
   ]
  ]
 },
 {
  "t": "Migrating state between backends with `terraform init -migrate-state`",
  "body": [
   "Teams often start with local state and later move to a remote backend, or move between remote backends when they change clouds or adopt HCP Terraform. Terraform can copy existing state from the old backend to the new one for you as part of re-initialization, so you do not have to move files by hand.",
   "The process is short. First, edit the configuration: add, change or remove the `backend` block (or add a `cloud` block). Next, run `terraform init`. Terraform notices that the backend configuration differs from the one recorded in `.terraform` and asks what to do. Running `terraform init -migrate-state` tells it explicitly that you want to copy the existing state into the new backend. Terraform then asks for confirmation, copies the state, and from that point uses the new location.",
   "```text\n$ terraform init -migrate-state\nInitializing the backend...\nDo you want to copy existing state to the new backend?\n  Enter \"yes\" to copy and \"no\" to start with an empty state.\n```",
   "Compare this with `terraform init -reconfigure`. That flag also accepts a changed backend configuration, but it ignores the old saved backend settings and does not migrate any state. It is useful when you intentionally want to point at a different state that already exists, or when the old backend is unreachable, but used by mistake it leaves you looking at an empty or different state while the old state sits untouched. Remember: `-migrate-state` copies, `-reconfigure` does not.",
   "Moving back from a remote backend to local state works the same way: remove the `backend` block and run `terraform init -migrate-state`, and Terraform copies the state into a local `terraform.tfstate`. If you use multiple CLI workspaces, Terraform can migrate all of them, and it will ask how to map them when the destination handles workspaces differently. Adding `-force-copy` answers yes to the prompts, which is handy in automation.",
   "Before any migration, take precautions. Make sure no one else is running Terraform, keep a backup copy of the state (for example with `terraform state pull > backup.tfstate`), and afterwards run `terraform plan` to confirm the new backend holds the same resources and the plan shows no unexpected changes. Once you are confident, remove or lock down the old state location so nobody keeps writing to it."
  ],
  "terms": [
   [
    "terraform init -migrate-state",
    "Re-initializes with a changed backend and copies existing state from the old backend to the new one."
   ],
   [
    "terraform init -reconfigure",
    "Re-initializes with a changed backend while ignoring the previous backend settings and without migrating state."
   ],
   [
    "-force-copy",
    "An init flag that automatically answers yes to state migration prompts."
   ],
   [
    "terraform state pull",
    "Outputs the current state from the configured backend, useful for taking a backup before migration."
   ]
  ],
  "example": "A startup has been using local state. The lead adds a gcs backend block, runs terraform state pull to save a backup, then runs terraform init -migrate-state and answers yes. A follow-up terraform plan shows no changes, confirming the bucket now holds the same state.",
  "tip": "To keep your resources tracked when changing backends, use -migrate-state; -reconfigure starts fresh with the new backend and copies nothing.",
  "check": [
   [
    "You change your backend from local to s3 and want your existing state moved. Which command?",
    "terraform init -migrate-state, then confirm the copy."
   ],
   [
    "What is the risk of using terraform init -reconfigure after changing backends?",
    "It does not copy state, so Terraform may see an empty state and plan to recreate existing resources."
   ]
  ]
 },
 {
  "t": "The `cloud` block for HCP Terraform",
  "body": [
   "HCP Terraform (formerly Terraform Cloud) is HashiCorp's hosted service for running Terraform and storing state. To connect a configuration to it, you use a `cloud` block inside the top-level `terraform` block. The `cloud` block replaced the older `remote` backend as the recommended integration, and it does more than a backend: besides storing state, it lets CLI commands such as `plan` and `apply` run remotely in HCP Terraform.",
   "The block needs to know which organization to use and which workspace or workspaces the configuration maps to. The `organization` argument names the HCP Terraform organization. The nested `workspaces` block selects workspaces either by `name`, which maps the configuration to exactly one workspace, or by `tags`, which maps it to every workspace carrying those tags, letting you switch among them with `terraform workspace select`. You can also set `project` to place new workspaces into a particular project, and `hostname` when you use Terraform Enterprise instead of the default HCP Terraform address.",
   "```hcl\nterraform {\n  cloud {\n    organization = \"example-org\"\n    workspaces {\n      name = \"networking-prod\"\n    }\n  }\n}\n```",
   "A configuration can have either a `cloud` block or a `backend` block, never both. Like backend blocks, the `cloud` block cannot use input variables or locals. Instead, HCP Terraform supports environment variables that fill in or override settings: `TF_CLOUD_ORGANIZATION`, `TF_CLOUD_HOSTNAME`, `TF_CLOUD_PROJECT` and `TF_WORKSPACE`. This lets the same code be pointed at different organizations or workspaces from a pipeline.",
   "Before `terraform init` can talk to HCP Terraform, the CLI needs an API token. You normally get one with `terraform login`, which stores it in a local credentials file, or you supply it in an environment variable. Then `terraform init` connects to the organization, creates the workspace if needed and, if you had existing state, can migrate it into the workspace.",
   "Once connected, what happens on `terraform plan` depends on the workspace's execution mode. In remote mode (the default), the plan runs on HCP Terraform's infrastructure and output streams back to your terminal, using variables stored in the workspace. In local mode, runs happen on your machine and HCP Terraform only stores state. Either way, the state is kept securely in the workspace with history and locking."
  ],
  "terms": [
   [
    "cloud block",
    "A block inside terraform {} that connects a configuration to HCP Terraform or Terraform Enterprise for state and runs."
   ],
   [
    "organization",
    "The cloud block argument naming the HCP Terraform organization that owns the workspaces."
   ],
   [
    "workspaces { name / tags }",
    "The nested block that maps the configuration to one workspace by name or to several by tags."
   ],
   [
    "Execution mode",
    "A workspace setting that decides whether runs execute remotely in HCP Terraform, locally, or on agents."
   ]
  ],
  "example": "A team adds a cloud block naming their organization and the workspace app-staging, runs terraform login and then terraform init. Their next terraform plan runs in HCP Terraform, streams output to the terminal and uses the cloud credentials stored as workspace variables, so nobody needs keys on their laptop.",
  "tip": "The cloud block and a backend block are mutually exclusive; the cloud block selects workspaces by name (one) or tags (many) and can be overridden with TF_CLOUD_ORGANIZATION and TF_WORKSPACE.",
  "check": [
   [
    "Can a configuration contain both a cloud block and a backend block?",
    "No. They are mutually exclusive ways of configuring where state is stored."
   ],
   [
    "How does a cloud block map a configuration to several workspaces?",
    "By using tags in the workspaces block instead of a single name."
   ]
  ]
 },
 {
  "t": "Sensitive data in state and protecting remote state (encryption, access control)",
  "body": [
   "Terraform state records every attribute of every resource and data source it manages, and many of those attributes are secrets: database master passwords, generated private keys, access tokens, connection strings. Marking a variable or output `sensitive` hides it on screen but does not remove it from state. So you must assume that anyone who can read your state can read your secrets, and protect state accordingly.",
   "The first defense is simply where state lives. Local state files sit unencrypted on disk and are easy to copy or commit by accident. Remote backends let you apply the storage service's protections. Encryption at rest is available on the major backends: the S3 backend's `encrypt` option enables server-side encryption (optionally with a customer-managed KMS key), Azure Storage and Google Cloud Storage encrypt data at rest by default, and HCP Terraform encrypts state at rest. Remote backends communicate over TLS, protecting state in transit.",
   "The second defense is access control. Treat read access to state as equivalent to read access to the secrets inside it. Use the cloud's identity and access management to limit who and what can read or write the bucket, container or database, typically the CI pipeline's role plus a small group of administrators. In HCP Terraform, workspace permissions control who can read state versions, and you can control which other workspaces may read a workspace's outputs through remote state sharing settings.",
   "The third defense is history and recovery. Enable object versioning on S3 or GCS buckets so an accidental overwrite or deletion can be rolled back, and consider logging access to the state storage so you can audit who read it. HCP Terraform keeps a version history of state automatically.",
   "Finally, reduce the secrets that reach state in the first place. Use ephemeral variables and ephemeral resources for values needed only during a run, write-only arguments where providers support them, and short-lived dynamic credentials from a system such as Vault. Keep secrets out of `.tf` and `.tfvars` files in version control, add state files to `.gitignore`, and be careful with commands that print state, such as `terraform show` and `terraform output -raw`, in shared CI logs.",
   "Sharing outputs between configurations deserves care too. The `terraform_remote_state` data source gives the consumer access to the root outputs of another state, which in practice requires read access to that entire state snapshot. Where possible, publish only the needed values through a dedicated channel such as a parameter store, or use HCP Terraform's `tfe_outputs` data source to read just outputs."
  ],
  "terms": [
   [
    "Secrets in state",
    "The fact that Terraform stores resource attributes, including passwords and keys, in state in plain text."
   ],
   [
    "Encryption at rest",
    "Protection of stored state by the backend's storage service, such as S3 server-side encryption."
   ],
   [
    "Access control",
    "IAM or platform permissions that restrict who can read or write the state storage."
   ],
   [
    "terraform_remote_state",
    "A data source that reads root outputs from another configuration's state, requiring access to that state."
   ]
  ],
  "example": "A security review finds that every developer has read access to the S3 bucket holding production state, which contains the database password. The team restricts the bucket policy to the deployment role and two administrators, enables versioning and KMS encryption, and moves the password to an ephemeral resource with a write-only argument.",
  "tip": "sensitive = true is not encryption. Protect state with an encrypted, access-controlled remote backend and keep it out of version control.",
  "check": [
   [
    "Name two ways to protect remote state stored in S3.",
    "Enable server-side encryption (encrypt = true, optionally with KMS) and restrict access with IAM or bucket policies; versioning adds recovery."
   ],
   [
    "Why is read access to state treated as sensitive?",
    "Because state stores resource attributes, including secrets, in plain text."
   ]
  ]
 },
 {
  "t": "Resource drift: detecting it with `plan` and `apply -refresh-only`, reconciling configuration",
  "body": [
   "Drift happens when real infrastructure no longer matches what Terraform last recorded. Someone edits a security group in the console, an autoscaling process changes a setting, or a resource is deleted by hand. Terraform does not watch your infrastructure continuously, so drift stays invisible until the next time Terraform checks.",
   "That check is the refresh step. By default, `terraform plan` and `terraform apply` first refresh: they ask the providers for the current state of every managed object and update Terraform's in-memory view. Then the plan compares configuration to that refreshed view. If someone changed something, the plan shows a note that objects changed outside of Terraform, followed by the actions needed to bring reality back in line with your configuration. A deleted resource shows as needing to be created again.",
   "Sometimes you want to see or accept drift without changing infrastructure. `terraform plan -refresh-only` shows how the state would change to match reality, without proposing any infrastructure changes. `terraform apply -refresh-only` does the same and, after you approve, writes those updated values into the state file. It never creates, modifies or destroys real objects. This replaced the older `terraform refresh` command, which updated state without showing you what would change or asking for approval, and is now deprecated.",
   "```text\n$ terraform plan -refresh-only\nNote: Objects have changed outside of Terraform\n  # aws_security_group.web has changed\n  ~ ingress = [...]\n```",
   "Detecting drift is half the job; reconciling it is the other half. You have two choices. If the manual change was wrong, simply run a normal `terraform apply`, and Terraform changes the resource back to match your configuration. If the manual change was right (for example an emergency fix that should stay), update the configuration to match it, then plan to confirm there are no changes. Using `apply -refresh-only` alone only updates the state; on the next normal plan Terraform will still try to revert the object if the configuration disagrees.",
   "To reduce drift, limit console access for resources Terraform manages, make changes through code review, and use `lifecycle { ignore_changes = [...] }` for attributes that are legitimately managed elsewhere, such as a desired count adjusted by an autoscaler. HCP Terraform health assessments can also run drift detection on a schedule and alert you."
  ],
  "terms": [
   [
    "Drift",
    "A difference between real infrastructure and the state Terraform last recorded, usually from changes made outside Terraform."
   ],
   [
    "Refresh",
    "The step where Terraform reads the current state of managed objects from providers before planning."
   ],
   [
    "-refresh-only",
    "A plan or apply mode that only updates state to match real infrastructure, without changing any resources."
   ],
   [
    "ignore_changes",
    "A lifecycle setting that tells Terraform to ignore changes to specific attributes when planning."
   ]
  ],
  "example": "During an incident, an engineer opens port 8443 on a security group in the console. The next terraform plan reports that the group changed outside of Terraform and proposes removing the rule. Because the change should stay, the team adds the rule to the configuration, and the next plan shows no changes.",
  "tip": "apply -refresh-only updates state only and never changes infrastructure; to keep a manual change permanently you must also update the configuration.",
  "check": [
   [
    "Which command updates state to match real infrastructure without changing any resources?",
    "terraform apply -refresh-only."
   ],
   [
    "What happens if you run a normal terraform apply after someone manually changed a managed resource?",
    "Terraform plans to change the resource back to match the configuration."
   ],
   [
    "Which older command does -refresh-only replace?",
    "terraform refresh, which is deprecated because it updated state without review."
   ]
  ]
 },
 {
  "t": "CLI workspaces: `terraform workspace new/select/list`, `terraform.workspace`",
  "body": [
   "A CLI workspace lets one configuration and one backend hold several independent states. Every working directory starts in a workspace called `default`. When you create another workspace, Terraform starts a separate, empty state for it, so the same code can manage a second copy of the infrastructure without the two interfering.",
   "The commands are simple. `terraform workspace new NAME` creates a workspace and switches to it. `terraform workspace select NAME` switches to an existing one (newer versions also accept `-or-create`). `terraform workspace list` shows all workspaces with an asterisk beside the current one, and `terraform workspace show` prints just the current name. `terraform workspace delete NAME` removes a workspace; you cannot delete `default` or the workspace you are currently in, and Terraform refuses to delete one whose state still tracks resources unless you force it.",
   "```text\n$ terraform workspace new dev\nCreated and switched to workspace \"dev\"!\n$ terraform workspace list\n  default\n* dev\n```",
   "Where the states live depends on the backend. With the local backend, the default workspace uses `terraform.tfstate`, and other workspaces use `terraform.tfstate.d/NAME/terraform.tfstate`. Remote backends that support workspaces store each state under a derived key; for example, the S3 backend uses a prefix such as `env:/NAME/` in front of the key. Not every backend supports multiple workspaces.",
   "Inside the configuration, the expression `terraform.workspace` returns the current workspace name. You can use it to vary names and sizes: `name = \"app-${terraform.workspace}\"` or `instance_type = terraform.workspace == \"prod\" ? \"m5.large\" : \"t3.micro\"`. This helps avoid naming collisions when two workspaces create similar resources.",
   "Understand the limits. CLI workspaces share the same code, the same backend and usually the same credentials, so they are not a strong boundary between environments. A person with access to dev state typically has access to prod state, and it is easy to run a command in the wrong workspace. HashiCorp recommends CLI workspaces for short-lived copies such as testing a change, and separate directories or separate backends (or HCP Terraform workspaces) for long-lived environments that need different credentials and access controls.",
   "Do not confuse CLI workspaces with HCP Terraform workspaces. An HCP Terraform workspace is a much richer object with its own variables, permissions and run history, and is closer to a separate working directory than to a CLI workspace."
  ],
  "terms": [
   [
    "CLI workspace",
    "A named, separate state for the same configuration and backend, managed with terraform workspace commands."
   ],
   [
    "default workspace",
    "The workspace every configuration starts in; it cannot be deleted."
   ],
   [
    "terraform.workspace",
    "An expression that returns the name of the current workspace for use in configuration."
   ],
   [
    "terraform.tfstate.d",
    "The directory where the local backend stores state for non-default workspaces."
   ]
  ],
  "example": "A developer wants to test a load balancer change without touching the shared dev environment. They run terraform workspace new lb-test, apply, check the result, then run terraform destroy, switch back with terraform workspace select default and delete the lb-test workspace.",
  "tip": "CLI workspaces separate state only, not credentials or backends; they are not recommended as the isolation boundary for production environments.",
  "check": [
   [
    "Where does the local backend store state for a workspace named staging?",
    "In terraform.tfstate.d/staging/terraform.tfstate."
   ],
   [
    "Which workspace can never be deleted?",
    "The default workspace."
   ],
   [
    "How do you make resource names include the workspace name?",
    "Interpolate terraform.workspace, for example name = \"app-${terraform.workspace}\"."
   ]
  ]
 },
 {
  "t": "Importing existing infrastructure with `import` blocks and generating configuration with `terraform plan -generate-config-out`",
  "body": [
   "Many organizations adopt Terraform after they already have infrastructure built by hand or by other tools. Importing brings those existing objects under Terraform management by recording them in state and matching them to resource blocks, without recreating anything. Since Terraform 1.5, the recommended way is the declarative `import` block.",
   "An `import` block has two required arguments: `to`, the resource address that should own the object, and `id`, the provider-specific identifier of the real object, such as an instance ID or bucket name. Import IDs differ by resource type, so check the resource's documentation, which usually has an import section showing the expected format.",
   "```hcl\nimport {\n  to = aws_s3_bucket.logs\n  id = \"example-company-logs\"\n}\n```",
   "The big advantage over the old command is that imports go through the normal plan and apply workflow. `terraform plan` shows exactly which objects will be imported alongside any other changes, reviewers can see them in a pull request, and nothing is written to state until you apply. You can import many resources at once, and import blocks accept `for_each` for importing sets of similar objects. After a successful apply, the import blocks can be left in place (they are idempotent) or removed.",
   "Writing the matching resource blocks by hand is often the hardest part. Terraform can draft them for you. If an import block targets a resource that has no resource block yet, run `terraform plan -generate-config-out=generated.tf`. Terraform queries the provider and writes HCL for the missing resources into that new file (the file must not already exist). The generated code is a starting point: review it, remove attributes you do not want to manage, replace hard-coded values with references and variables, and move it into your normal files.",
   "The typical workflow is: write import blocks; run plan with `-generate-config-out`; edit the generated configuration; run plan again until it shows only imports and no unexpected changes; then apply. A plan that also shows updates means your configuration does not quite match the real object yet, and applying would change it.",
   "Two limits are worth remembering. Import brings one real object into one resource address, so you must not import the same object into two addresses, which would lead to conflicting management. And generated configuration is not guaranteed to be perfect, especially for attributes that conflict with each other, so careful review is essential."
  ],
  "terms": [
   [
    "import block",
    "A declarative block with to and id that tells Terraform to bring an existing object under a resource address during plan and apply."
   ],
   [
    "Import ID",
    "The provider-specific identifier of an existing object, such as an instance ID or bucket name."
   ],
   [
    "-generate-config-out",
    "A terraform plan flag that writes generated HCL for import targets that lack resource blocks into a new file."
   ],
   [
    "Adopting infrastructure",
    "Bringing manually created resources under Terraform management without recreating them."
   ]
  ],
  "example": "A company has forty S3 buckets created by hand. An engineer writes an import block with for_each over the bucket names, runs terraform plan -generate-config-out=buckets.tf, tidies the generated code into a module call, confirms the plan shows only imports, and applies. The buckets are now managed without downtime.",
  "tip": "import blocks are reviewed in plan and applied like other changes; -generate-config-out writes starter HCL into a file that must not already exist.",
  "check": [
   [
    "What are the two required arguments of an import block?",
    "to (the resource address) and id (the existing object's identifier)."
   ],
   [
    "Why is an import block preferred over the old import command?",
    "It works through plan and apply, so imports are previewed, reviewed, can be done in bulk, and can generate configuration."
   ]
  ]
 },
 {
  "t": "The older `terraform import` CLI command",
  "body": [
   "Before import blocks existed, the only way to bring existing infrastructure under Terraform was the `terraform import` command. It is still available and still appears on the exam, so you need to know how it works and why the newer approach is usually preferred.",
   "The syntax is `terraform import ADDRESS ID`. `ADDRESS` is the resource address in your configuration, such as `aws_instance.web` or `module.app.aws_instance.web[0]`, and `ID` is the provider's identifier for the real object. The command reads the object from the provider and writes it into state under that address immediately.",
   "```text\n$ terraform import aws_instance.web i-0abc123def4567890\naws_instance.web: Importing from ID \"i-0abc123def4567890\"...\nImport successful!\n```",
   "There is an important prerequisite: the resource block must already exist in your configuration before you run the command. `terraform import` does not write configuration for you. If `aws_instance.web` is not declared, the command fails. So the older workflow was: write an empty or approximate resource block, run `terraform import`, then run `terraform plan` and keep adjusting the block until the plan shows no changes. Only then is the configuration a faithful description of the real object.",
   "Compared with import blocks, the command has clear limitations. It imports one resource per invocation, so bringing in dozens of objects means dozens of commands or a script. It changes state immediately, with no plan to review first and no record in version control of what was imported. It cannot generate configuration. And it happens outside the normal pull request workflow, which makes it harder to audit in team settings, especially with HCP Terraform, where you would otherwise want every state change to come from a reviewed run.",
   "The command also takes useful flags such as `-var` and `-var-file`, because Terraform must evaluate the configuration (including provider settings) to know how to reach the object. With a remote backend, the imported object is written to the remote state, and the usual locking applies.",
   "When should you still use it? It is fine for a quick one-off import on a small project, or with tooling that has not moved to import blocks. For anything larger or shared, prefer import blocks. Either way, import is not the same as creating: Terraform takes over management of an existing object, and a later `terraform destroy` will delete that real object, so be sure you intend Terraform to own it."
  ],
  "terms": [
   [
    "terraform import",
    "A CLI command that immediately writes an existing object into state at a given resource address."
   ],
   [
    "ADDRESS",
    "The resource address in configuration that the imported object will be bound to."
   ],
   [
    "Prerequisite resource block",
    "The resource block that must already exist in configuration before terraform import can succeed."
   ],
   [
    "Post-import plan",
    "Running terraform plan after import and adjusting configuration until no changes are shown."
   ]
  ],
  "example": "An engineer needs to manage one hand-built DNS zone. They write resource \"aws_route53_zone\" \"main\" {} with the zone name, run terraform import aws_route53_zone.main followed by the zone ID, and then adjust the block until terraform plan reports no changes.",
  "tip": "terraform import needs the resource block to exist first, imports one object at a time and does not generate configuration; import blocks remove those limits.",
  "check": [
   [
    "What must exist before you run terraform import aws_instance.web i-123?",
    "A resource block for aws_instance.web in the configuration."
   ],
   [
    "Does terraform import show a plan before changing state?",
    "No. It writes to state immediately; only import blocks go through plan and apply."
   ]
  ]
 },
 {
  "t": "Inspecting state: `terraform state list`, `terraform state show`, `terraform show`, `terraform output`",
  "body": [
   "You should never open the state file in a text editor to find out what Terraform manages. Terraform provides read-only commands that work with any backend, local or remote, and show state in a safe, readable way. Knowing which command answers which question is a classic exam topic.",
   "`terraform state list` prints the address of every resource and data source in state, one per line, including those inside modules (`module.network.aws_subnet.private[0]`). You can filter it by passing an address prefix, such as `terraform state list module.network`, or by resource ID with `-id=`. It is the quickest way to answer \"what does Terraform manage here?\" and to find exact addresses for other commands.",
   "`terraform state show ADDRESS` prints every attribute of a single resource instance as Terraform recorded it, in a readable HCL-like format. Use it to find an instance's IP address, an ARN, or the value of a setting. Sensitive attributes are redacted in this output.",
   "```text\n$ terraform state list\naws_instance.web\naws_security_group.web\nmodule.network.aws_vpc.this\n\n$ terraform state show aws_instance.web\n# aws_instance.web:\nresource \"aws_instance\" \"web\" {\n    ami           = \"ami-0abc...\"\n    instance_type = \"t3.micro\"\n    ...\n}\n```",
   "`terraform show` with no arguments prints the entire current state in human-readable form, every resource and its attributes, plus outputs. Given a saved plan file (`terraform show tfplan`), it prints that plan instead. Adding `-json` produces machine-readable output for tools and policy checks. Note that the JSON form includes sensitive values in plain text, so be careful where you send it.",
   "`terraform output` prints the root module's output values from state. With a name, `terraform output db_endpoint` prints just that one. Sensitive outputs are shown as `<sensitive>` in the list view, but asking for one by name, or using `-json` or `-raw`, reveals the value. `-raw` prints a plain string without quotes, handy in shell scripts: `ssh admin@$(terraform output -raw public_ip)`.",
   "None of these commands change state or infrastructure. For changing state there is a separate group (`state mv`, `state rm`, `state push`, `state replace-provider`, with `state pull` to export a copy), which you should use carefully and preferably replace with configuration-driven blocks such as `moved` and `removed`."
  ],
  "terms": [
   [
    "terraform state list",
    "Lists the addresses of all resources in state, optionally filtered by an address prefix."
   ],
   [
    "terraform state show",
    "Shows all recorded attributes of one resource instance in state."
   ],
   [
    "terraform show",
    "Shows the whole state, or a saved plan file, in human-readable or JSON form."
   ],
   [
    "terraform output",
    "Prints root module output values from state, with -json and -raw options for scripting."
   ]
  ],
  "example": "An on-call engineer needs the private IP of a database proxy. They run terraform state list | grep proxy to find the address module.db.aws_instance.proxy, then terraform state show module.db.aws_instance.proxy to read its private_ip attribute, all without touching the state file.",
  "tip": "state list gives addresses, state show gives one resource's attributes, show gives everything (or a plan file), and output gives root outputs only.",
  "check": [
   [
    "Which command shows the attributes of just one resource in state?",
    "terraform state show ADDRESS."
   ],
   [
    "How do you print an output value without quotes for use in a shell script?",
    "terraform output -raw NAME."
   ],
   [
    "What does terraform show tfplan do?",
    "Displays the contents of the saved plan file tfplan in human-readable form."
   ]
  ]
 },
 {
  "t": "Refactoring: `moved` blocks and `terraform state mv`",
  "body": [
   "As configurations grow, you rename resources, move them into modules and switch from `count` to `for_each`. Each of these changes the resource's address. Terraform tracks objects by address, so if you simply rename `aws_instance.web` to `aws_instance.frontend`, the plan shows the old address being destroyed and a new one being created. For a database or a production server, that is exactly what you do not want. Refactoring tools tell Terraform that the object has only moved.",
   "The modern approach, added in Terraform 1.1, is the `moved` block. You write it in configuration with `from` (the old address) and `to` (the new address). During the next plan, Terraform sees that state has an object at the old address, updates it to the new address, and reports the move rather than a destroy and create.",
   "```hcl\nmoved {\n  from = aws_instance.web\n  to   = aws_instance.frontend\n}\n\nmoved {\n  from = aws_s3_bucket.logs\n  to   = module.logging.aws_s3_bucket.this\n}\n```",
   "`moved` blocks work for renames, for moving resources into or out of modules, for renaming module calls (`from = module.a`, `to = module.b`) and for adding `count` or `for_each` to an existing resource (`from = aws_instance.web`, `to = aws_instance.web[0]`). Because the move is in code, it is reviewed in a pull request, shown in plan, and applied automatically in every environment and workspace that uses the configuration. Module authors can ship `moved` blocks with a new module version so callers upgrade without losing resources. You can keep old `moved` blocks as a history of changes; removing them early may break users still on older state.",
   "The older approach is `terraform state mv SOURCE DESTINATION`. It edits state immediately: `terraform state mv aws_instance.web aws_instance.frontend`. It also works for modules (`terraform state mv module.a module.b`) and can move items between separate state files. The command changes state directly without a plan, so it must be run separately in every environment, and there is no record in version control. Always update the configuration to match, and consider using `-dry-run` first to see what would move.",
   "The exam expects you to prefer `moved` blocks for refactoring in shared or multi-environment setups, and to recognize `terraform state mv` as the imperative alternative. Neither changes the real infrastructure; they only change which address Terraform associates with an existing object. If a move would require an actual change to the object, such as a different resource type, `state mv` cannot help, and a `moved` block can do it only when the provider explicitly supports that cross-type move (as with `null_resource` to `terraform_data`); otherwise you import into the new resource type and remove the old one from state."
  ],
  "terms": [
   [
    "moved block",
    "A configuration block with from and to that records a change of address so Terraform updates state instead of replacing the object."
   ],
   [
    "terraform state mv",
    "A CLI command that immediately changes the address of an object in state."
   ],
   [
    "Refactoring",
    "Restructuring configuration (renaming, moving into modules) without changing the real infrastructure."
   ],
   [
    "Resource address",
    "The identifier Terraform uses to track an object, such as module.app.aws_instance.web[0]."
   ]
  ],
  "example": "A team moves ten resources from the root module into a new module named network. They add ten moved blocks mapping each old address to module.network.<address>. The plan shows ten moves and zero destroys, and the same pull request safely updates dev, staging and prod.",
  "tip": "Renaming a resource without moved or state mv makes Terraform plan a destroy and create; moved is the reviewable, declarative choice.",
  "check": [
   [
    "You rename resource aws_db_instance.main to aws_db_instance.primary. How do you avoid replacing the database?",
    "Add a moved block with from = aws_db_instance.main and to = aws_db_instance.primary (or run terraform state mv)."
   ],
   [
    "Name one advantage of moved blocks over terraform state mv.",
    "They are in version control, visible in plan and applied automatically in every environment that uses the code."
   ]
  ]
 },
 {
  "t": "Removing resources from state without destroying them: `removed` blocks and `terraform state rm`",
  "body": [
   "Sometimes you want Terraform to stop managing an object without deleting it. Perhaps another team is taking over a database, the resource is moving to a different Terraform configuration, or it was imported by mistake. If you simply delete the resource block, Terraform will plan to destroy the real object, because state still contains it and configuration no longer does. You need a way to forget it instead.",
   "The declarative way, added in Terraform 1.7, is the `removed` block. It has a `from` argument naming the resource (or module) address, and a `lifecycle` block whose `destroy` argument decides what happens. With `destroy = false`, Terraform removes the object from state and leaves the real infrastructure untouched. You delete the original resource block at the same time.",
   "```hcl\nremoved {\n  from = aws_instance.legacy\n\n  lifecycle {\n    destroy = false\n  }\n}\n```",
   "Because it goes through plan and apply, the removal is previewed (the plan says the object will no longer be managed by Terraform but will not be destroyed), reviewed in a pull request and applied consistently in every environment. A `removed` block can also target a whole module, such as `from = module.old_app`. Setting `destroy = true` instead is the same as deleting the resource block normally: Terraform destroys the object. Removed blocks can also carry destroy-time provisioners if you need a cleanup action.",
   "The older, imperative way is `terraform state rm ADDRESS`. It deletes the entry from state immediately, with no plan. For example, `terraform state rm aws_instance.legacy` or `terraform state rm module.old_app` for a whole module. The real object keeps running, and Terraform simply no longer knows about it. You must also remove the resource block from configuration; otherwise the next plan will try to create a new object for that address. Like other state commands it supports `-dry-run`, and with a local backend it writes a backup file.",
   "A common scenario combines this with import: to move a resource from configuration A to configuration B, remove it from A's state (with a `removed` block or `state rm`) and import it into B with an `import` block. Keep in mind that forgetting an object does not delete it, so costs continue; make sure somebody or something else owns it afterwards."
  ],
  "terms": [
   [
    "removed block",
    "A configuration block that tells Terraform to stop managing an address, destroying it or not according to lifecycle destroy."
   ],
   [
    "destroy = false",
    "The removed block lifecycle setting that removes the object from state while leaving the real infrastructure in place."
   ],
   [
    "terraform state rm",
    "A CLI command that immediately deletes a resource entry from state without affecting the real object."
   ],
   [
    "Unmanaged resource",
    "A real object that exists but is not tracked in any Terraform state."
   ]
  ],
  "example": "The data team is taking over an analytics bucket that the platform team created. The platform team deletes the bucket's resource block, adds a removed block with destroy = false and applies. The data team then adds an import block for the same bucket in their own configuration.",
  "tip": "Deleting a resource block alone means destroy. To stop managing without deleting, use a removed block with destroy = false or terraform state rm.",
  "check": [
   [
    "What happens if you delete a resource block and run terraform apply?",
    "Terraform destroys the real object, because it is still in state but no longer in configuration."
   ],
   [
    "Which lifecycle setting in a removed block keeps the real object?",
    "destroy = false."
   ]
  ]
 },
 {
  "t": "Verbose logging with `TF_LOG` (TRACE, DEBUG, INFO, WARN, ERROR, JSON), `TF_LOG_PATH`, `TF_LOG_CORE` and `TF_LOG_PROVIDER`",
  "body": [
   "Terraform's normal output tells you what it plans and what went wrong at a high level. When you need to see what is happening underneath (which API calls a provider makes, how Terraform walks the dependency graph, why a plugin crashed), you turn on detailed logging with environment variables. No command-line flag does this; it is controlled entirely by the environment.",
   "`TF_LOG` enables logging and sets the level. The levels, from most to least verbose, are `TRACE`, `DEBUG`, `INFO`, `WARN` and `ERROR`. `TRACE` is the most detailed and the one HashiCorp asks for in bug reports. There is also `JSON`, which produces logs at the TRACE level in a machine-readable JSON format, useful for feeding into log tools. Leaving `TF_LOG` unset (or setting it to `OFF`) disables logging.",
   "```text\n$ export TF_LOG=DEBUG\n$ export TF_LOG_PATH=./terraform-debug.log\n$ terraform plan\n\n# PowerShell\nPS> $env:TF_LOG = \"TRACE\"\n```",
   "By default logs go to standard error, mixed into your terminal. `TF_LOG_PATH` sends them to a file instead, which is much easier to search or attach to an issue. The file is appended to rather than overwritten, and `TF_LOG_PATH` only has an effect when logging is enabled with a level.",
   "Terraform's logs come from two sources: Terraform core (the CLI itself: configuration loading, graph building, state handling) and the provider plugins (API calls to clouds and services). You can set levels for each separately. `TF_LOG_CORE` controls core logging and `TF_LOG_PROVIDER` controls provider logging, each accepting the same levels. For example, `TF_LOG_PROVIDER=TRACE` with `TF_LOG_CORE` unset shows detailed provider activity without flooding you with core graph messages, which is ideal when you suspect an API problem.",
   "Logs at DEBUG and TRACE can contain sensitive information, such as request bodies, resource attributes and sometimes credentials or tokens. Treat log files like state files: do not commit them, review them before sharing publicly, and delete them when you are done. Remember to unset the variables afterwards, since verbose logging slows Terraform down and produces very large files."
  ],
  "terms": [
   [
    "TF_LOG",
    "Environment variable that enables Terraform logging at TRACE, DEBUG, INFO, WARN, ERROR or JSON level."
   ],
   [
    "TF_LOG_PATH",
    "Environment variable that writes (appends) log output to a file instead of standard error."
   ],
   [
    "TF_LOG_CORE",
    "Environment variable that sets the log level for Terraform core only."
   ],
   [
    "TF_LOG_PROVIDER",
    "Environment variable that sets the log level for provider plugins only."
   ]
  ],
  "example": "A plan fails with a vague permission error from a cloud provider. An engineer sets TF_LOG_PROVIDER=DEBUG and TF_LOG_PATH=provider.log, reruns the plan and finds the exact API call and the role that was denied, then unsets both variables.",
  "tip": "TRACE is the most verbose level, JSON outputs TRACE-level logs as JSON, and TF_LOG_PATH does nothing unless a log level is set.",
  "check": [
   [
    "Which TF_LOG level is the most verbose?",
    "TRACE."
   ],
   [
    "How do you get detailed logs from providers but not from Terraform core?",
    "Set TF_LOG_PROVIDER to a level such as TRACE or DEBUG and leave TF_LOG_CORE unset."
   ],
   [
    "Where do logs go if TF_LOG is set but TF_LOG_PATH is not?",
    "To standard error, shown in the terminal."
   ]
  ]
 },
 {
  "t": "When to use logs: provider errors, crashes and bug reports",
  "body": [
   "Most Terraform errors do not need logs. Syntax problems, missing variables, type errors and failed validations produce clear messages that point to a file and line. `terraform validate` and `terraform fmt` catch many of these before you even plan. Reach for logs when the normal output is not enough to explain what happened.",
   "It helps to know where a problem lives. Terraform troubleshooting is usually grouped into four areas: language errors (HCL syntax and semantics, found by core and reported clearly), state errors (state drift or corruption, often fixed with refresh-only or state commands), core errors (bugs in Terraform itself) and provider errors (problems in a provider plugin or in the remote API it calls). Logs are most valuable for the last two.",
   "Provider errors are the most common reason to enable logging. When a cloud API rejects a request with a vague message, a provider times out, or a resource keeps showing changes after every apply, provider logs show the actual requests and responses. Setting `TF_LOG_PROVIDER=DEBUG` or `TRACE` lets you see the endpoint, status code and error body. From there you can tell whether the issue is permissions, a quota, an API limit or a provider bug.",
   "Crashes are the other big case. If Terraform or a plugin panics, you see a message that Terraform crashed along with a stack trace printed to the output. That trace, and a TRACE-level log of the same run, is what the maintainers need. For a core crash, you would report it to the Terraform project; for a provider crash, to that provider's maintainers, because providers are separate programs developed separately.",
   "When filing a bug report, include the Terraform version and provider versions (`terraform version` shows both), a minimal configuration that reproduces the problem, the expected and actual behavior, and the relevant log, usually captured with `TF_LOG=TRACE` and `TF_LOG_PATH`. Before sharing, remove secrets such as tokens, passwords and account identifiers, because trace logs can contain them.",
   "A practical approach is to start narrow: reproduce the problem, turn on logging at DEBUG for the component you suspect, and increase to TRACE only if you need more. Search the log for the word `error` or the resource address involved. Then turn logging off again, since verbose logs slow runs down and fill disks."
  ],
  "terms": [
   [
    "Provider error",
    "A failure in a provider plugin or the remote API it calls, often diagnosed with provider logs."
   ],
   [
    "Crash (panic)",
    "An unexpected termination of Terraform or a plugin that prints a stack trace and should be reported with logs."
   ],
   [
    "terraform version",
    "Command that shows the Terraform version and installed provider versions, needed for bug reports."
   ],
   [
    "Minimal reproduction",
    "The smallest configuration that still shows the problem, included in a bug report."
   ]
  ],
  "example": "An apply fails with a timeout while creating a load balancer. Normal output only says the context deadline was exceeded. With TF_LOG_PROVIDER=DEBUG, the engineer sees the API returning a throttling error on repeated status checks, and raises the request quota instead of editing the configuration.",
  "tip": "Use logs for provider errors and crashes; include terraform version output, a minimal configuration and a redacted TRACE log in bug reports.",
  "check": [
   [
    "Which command gives the version details you should include in a bug report?",
    "terraform version, which lists Terraform and provider versions."
   ],
   [
    "Why should trace logs be reviewed before posting them publicly?",
    "They can contain sensitive data such as tokens, passwords and resource attributes."
   ]
  ]
 },
 {
  "t": "Reviewing outputs and dependencies with `terraform output -json` and `terraform graph`",
  "body": [
   "Terraform configurations rarely stand alone. Scripts, pipelines and other tools need values Terraform produced, and humans need to understand how resources depend on each other. Two commands help: `terraform output -json` for sharing results in a machine-readable way, and `terraform graph` for visualizing dependencies.",
   "`terraform output -json` prints all root module outputs as a JSON object. Each output appears with its `value`, its `type` and a `sensitive` flag. Unlike the default text view, the JSON form includes sensitive values in plain text, since it is meant for programs. You can also ask for one output: `terraform output -json subnet_ids` prints just that value as JSON, which is useful for lists and maps that `-raw` cannot print.",
   "```text\n$ terraform output -json | jq -r '.web_ip.value'\n203.0.113.10\n\n$ terraform graph | dot -Tsvg > graph.svg\n```",
   "In practice, pipelines use `terraform output -json` to pass values to later steps, such as handing a cluster endpoint to a deployment job or writing an inventory file for a configuration management tool. Because outputs come from state, the command is quick and does not contact providers. Protect wherever the JSON ends up, since it may contain secrets.",
   "`terraform graph` prints Terraform's dependency graph in the DOT language used by Graphviz. Each node is a resource, data source, provider or module element, and each edge shows that one depends on another. Terraform builds this graph from references between blocks (implicit dependencies) and from `depends_on` (explicit dependencies), then uses it to decide creation and destruction order and which operations can run in parallel. Piping the output to Graphviz's `dot` command renders an image you can inspect. The `-type` option shows the graph for a particular operation, such as `plan` or `apply`.",
   "Why does this matter for maintenance? A graph makes hidden coupling visible: you can see that a security group change will affect instances, or that a module depends on another module's output. It helps explain why Terraform wants to replace something or why an apply happens in a particular order, and it is useful when you add `depends_on` to confirm the edge actually appears. For large configurations the graph can be big, so filter or focus on a module when reading it.",
   "Together these commands support good reviews: outputs tell you what the configuration produced, and the graph tells you how the pieces connect."
  ],
  "terms": [
   [
    "terraform output -json",
    "Prints root outputs as JSON with value, type and sensitive fields, revealing sensitive values."
   ],
   [
    "terraform graph",
    "Prints the dependency graph of the configuration or plan in DOT format."
   ],
   [
    "DOT / Graphviz",
    "A graph description language and the toolset (including the dot command) that renders it as an image."
   ],
   [
    "Implicit dependency",
    "A dependency Terraform infers from an expression referencing another resource's attributes."
   ]
  ],
  "example": "A CI pipeline applies infrastructure, then runs terraform output -json > outputs.json. The next stage reads the load balancer DNS name and database endpoint from that file to configure the application deployment, with no values copied by hand.",
  "tip": "terraform output -json shows sensitive values in plain text; terraform graph outputs DOT, which you render with Graphviz.",
  "check": [
   [
    "What format does terraform graph produce?",
    "DOT, the Graphviz graph description language."
   ],
   [
    "Does terraform output -json hide sensitive outputs?",
    "No. The JSON output includes sensitive values in plain text along with a sensitive flag."
   ]
  ]
 },
 {
  "t": "HCP Terraform (formerly Terraform Cloud): remote state, remote runs, a free tier and paid tiers",
  "body": [
   "HCP Terraform is HashiCorp's software-as-a-service platform for running Terraform as a team. It was called Terraform Cloud until it was renamed as part of the HashiCorp Cloud Platform (HCP). Terraform Enterprise is the self-hosted version of the same product, for organizations that must run it on their own infrastructure. The exam uses the name HCP Terraform, so recognize both names as the same service.",
   "Its first core feature is remote state. Each workspace stores its state securely, encrypted at rest, with automatic locking during runs and a history of state versions you can inspect and roll back to. Access is governed by team permissions, and other workspaces can read a workspace's outputs if you allow it. You get the benefits of a remote backend without having to build and secure a bucket yourself.",
   "The second is remote runs. Instead of running `terraform plan` and `apply` on a laptop, runs execute on HashiCorp-managed workers (or on your own agents for private networks). Everyone sees the same run history, output and logs in the web interface. Variables and credentials are stored in the workspace, so engineers do not need cloud keys locally. Runs are queued per workspace so only one applies at a time.",
   "Around those foundations HCP Terraform adds collaboration features: VCS integration that plans automatically on pull requests, a private registry for modules and providers, team-based access control, policy as code with Sentinel or OPA, run tasks for third-party checks, notifications, health assessments that detect drift, and dynamic provider credentials. Which of these you get depends on your plan.",
   "HCP Terraform has a free tier suitable for individuals and small teams, which includes remote state, remote runs, VCS integration and the private registry, with limits on scale. Paid tiers add more advanced governance and operations features, such as broader policy enforcement, more concurrent runs, drift detection and larger-scale team management. The exact tier names, prices and limits change over time, so for the exam focus on the idea: core workflow features are free to start, and governance and enterprise features are in paid tiers or Terraform Enterprise.",
   "Why use it at all instead of a plain remote backend? It removes the undifferentiated work of securing state, managing credentials and building a pipeline, and it gives you a consistent, auditable workflow where every change is a recorded run. For regulated or very large organizations, Terraform Enterprise offers the same workflow inside their own environment."
  ],
  "terms": [
   [
    "HCP Terraform",
    "HashiCorp's hosted service (formerly Terraform Cloud) for remote state, remote runs and team collaboration with Terraform."
   ],
   [
    "Terraform Enterprise",
    "The self-hosted distribution of HCP Terraform for organizations that run it on their own infrastructure."
   ],
   [
    "Remote run",
    "A Terraform plan or apply executed on HCP Terraform workers, with output shown in the UI and CLI."
   ],
   [
    "State version history",
    "The record of every state saved in a workspace, which can be viewed and used for recovery."
   ]
  ],
  "example": "A five-person team replaces its homemade S3 state setup and laptop-based applies with HCP Terraform's free tier. Every change now runs remotely with shared logs, the AWS credentials live only in workspace variables, and pull requests show a plan automatically.",
  "tip": "Terraform Cloud was renamed HCP Terraform; Terraform Enterprise is the self-hosted version. Avoid memorizing prices; know which features are core versus governance.",
  "check": [
   [
    "What is the self-hosted version of HCP Terraform called?",
    "Terraform Enterprise."
   ],
   [
    "Name two core benefits of HCP Terraform over running Terraform locally with local state.",
    "Secure shared remote state with locking and history, and remote runs with shared logs and centrally stored credentials."
   ]
  ]
 },
 {
  "t": "Connecting the CLI: `terraform login` and the `cloud` block (organization, workspaces by name or tags)",
  "body": [
   "To use HCP Terraform from your terminal, two things must be in place: the CLI must be able to authenticate to HCP Terraform, and the configuration must say which organization and workspaces it belongs to. `terraform login` handles the first; the `cloud` block handles the second.",
   "`terraform login` opens a browser page where you generate an API token for your user account, then asks you to paste it into the terminal. The CLI saves the token in a credentials file in your user profile, named `credentials.tfrc.json` in the `.terraform.d` directory on Linux and macOS (the application data directory on Windows). The token is stored in plain text, so protect that file. By default the command targets HCP Terraform's standard hostname; for Terraform Enterprise, pass the hostname: `terraform login tfe.example.com`. `terraform logout` removes the stored token.",
   "In automation there is no browser, so pipelines provide the token differently: through an environment variable named `TF_TOKEN_` followed by the hostname with dots replaced by underscores (for example `TF_TOKEN_app_terraform_io`), or through a CLI configuration file. For CI, a team or organization token or a dedicated service account is usually better than a personal token.",
   "```hcl\nterraform {\n  cloud {\n    organization = \"example-org\"\n    workspaces {\n      tags = [\"app\", \"aws\"]\n    }\n  }\n}\n```",
   "The `cloud` block's `organization` argument names the organization. Inside `workspaces`, choose one of two strategies. With `name = \"app-prod\"`, the configuration maps to exactly one HCP Terraform workspace, which is created on init if it does not exist. With `tags`, the configuration maps to every workspace that has all the listed tags. Tag mode lets one configuration serve several workspaces, such as app-dev and app-prod; you switch between them with `terraform workspace list` and `terraform workspace select`, and `terraform workspace new` creates a new workspace with those tags. You cannot set both `name` and `tags`.",
   "After writing the block, run `terraform init`. Terraform authenticates with your token, connects to the organization and sets up the workspace. If you previously used local or another backend's state, init offers to migrate it. From then on, `terraform plan` and `apply` either run remotely or locally depending on the workspace's execution mode, and state is stored in the workspace.",
   "Environment variables can fill in or override the block's settings, which is useful for pipelines: `TF_CLOUD_ORGANIZATION`, `TF_CLOUD_HOSTNAME`, `TF_CLOUD_PROJECT` and `TF_WORKSPACE`. That allows even an empty `cloud {}` block with all details supplied by the environment."
  ],
  "terms": [
   [
    "terraform login",
    "A command that obtains an HCP Terraform API token through the browser and stores it locally for the CLI."
   ],
   [
    "credentials.tfrc.json",
    "The local file where terraform login stores API tokens in plain text."
   ],
   [
    "TF_TOKEN_hostname",
    "An environment variable that supplies an API token for a given host, such as TF_TOKEN_app_terraform_io."
   ],
   [
    "Workspace tags mapping",
    "Using tags in the cloud block so one configuration maps to multiple HCP Terraform workspaces."
   ]
  ],
  "example": "A developer clones a repository with a cloud block using tags = [\"billing\"]. They run terraform login, paste a token, run terraform init, then terraform workspace select billing-dev to work on the dev workspace before a colleague applies to billing-prod from a reviewed pull request.",
  "tip": "terraform login stores a token in credentials.tfrc.json; in CI use TF_TOKEN_<host> instead. In the cloud block, workspaces use name (one) or tags (many), never both.",
  "check": [
   [
    "How does a CI job authenticate to HCP Terraform without terraform login?",
    "By setting an environment variable such as TF_TOKEN_app_terraform_io with an API token."
   ],
   [
    "What does tags in the cloud block's workspaces block do?",
    "Maps the configuration to all workspaces with those tags, so you can switch among them with terraform workspace select."
   ]
  ]
 },
 {
  "t": "Workflows: VCS-driven, CLI-driven and API-driven runs",
  "body": [
   "Every HCP Terraform workspace uses one of three workflows, which determine how configuration arrives in the workspace and what starts a run. The runs themselves (plan, optional policy checks, apply) are the same; what differs is the trigger.",
   "In the VCS-driven workflow, the workspace is connected to a repository and branch on a version control provider such as GitHub, GitLab, Bitbucket or Azure DevOps. When someone pushes a commit to that branch, HCP Terraform fetches the configuration and starts a run automatically. When someone opens a pull request, it runs a speculative plan, a plan-only run that cannot be applied, and posts the result as a status check on the pull request so reviewers see exactly what would change. Merging the pull request triggers the real run on the branch. This is the most GitOps-style workflow and the most common in teams.",
   "In the CLI-driven workflow, you work from your terminal as usual, with a `cloud` block in the configuration. When you run `terraform plan`, the CLI uploads your local configuration to HCP Terraform and the plan executes remotely, streaming output back to your terminal; `terraform apply` does the same and asks for confirmation. This feels like local Terraform but keeps state, variables, credentials and run history in the workspace. It suits teams that want remote execution but already have their own review process, and developers who want to test changes before committing.",
   "```text\n$ terraform plan\nRunning plan in HCP Terraform. Output will stream here.\nPressing Ctrl-C will stop streaming the logs, but will not stop the plan running remotely.\n```",
   "In the API-driven workflow, an external tool controls everything through the HCP Terraform API. A script or CI system packages the configuration into a tarball, creates a configuration version, uploads it and then creates a run. This gives the most control and is used when organizations have their own CI/CD pipelines or build custom automation. It requires more engineering effort than the other two.",
   "Choosing is mostly about where your source of truth and your approvals live. If pull requests in a repository should drive changes, choose VCS-driven. If people run Terraform interactively and want the remote benefits, choose CLI-driven. If an existing pipeline or custom tool must orchestrate runs, choose API-driven. Note that a workspace connected to VCS does not accept `terraform apply` from the CLI, because the repository is its source of truth; you can still run speculative plans from the CLI against it."
  ],
  "terms": [
   [
    "VCS-driven workflow",
    "A workspace connected to a repository branch, where commits trigger runs and pull requests trigger speculative plans."
   ],
   [
    "CLI-driven workflow",
    "Runs started from the local terraform CLI that upload configuration and execute remotely in HCP Terraform."
   ],
   [
    "API-driven workflow",
    "Runs started by external tools that upload configuration versions and create runs through the HCP Terraform API."
   ],
   [
    "Speculative plan",
    "A plan-only run that shows proposed changes but can never be applied, used for pull request checks."
   ]
  ],
  "example": "A platform team connects its networking workspace to the main branch of a GitHub repository. Each pull request shows a speculative plan as a status check; after approval and merge, HCP Terraform plans and waits for an authorized user to confirm the apply.",
  "tip": "Pull requests trigger speculative (plan-only) runs in the VCS workflow; merges to the tracked branch trigger real runs. VCS-connected workspaces do not accept CLI applies.",
  "check": [
   [
    "Which workflow uses configuration versions uploaded through the API?",
    "The API-driven workflow."
   ],
   [
    "What kind of run does opening a pull request start in a VCS-driven workspace?",
    "A speculative plan, which shows changes but cannot be applied."
   ]
  ]
 },
 {
  "t": "Workspaces: each holds its own state, variables, run history and permissions",
  "body": [
   "In HCP Terraform, a workspace is the unit that manages one collection of infrastructure. Think of it as everything a working directory on your laptop would contain, plus the collaboration features a team needs. Organizations usually create one workspace per component per environment, such as `networking-prod`, `networking-dev` and `app-prod`.",
   "Each workspace holds its own state. The current state and every previous version are stored in the workspace, locked during runs, and visible to users with permission. Because states are separate, a mistake in one workspace cannot overwrite another's state, and access to production state can be limited to the people who need it.",
   "Each workspace holds its own variables. Terraform input variables and environment variables (such as cloud credentials) are set per workspace, optionally marked sensitive, and can be supplemented by variable sets shared across workspaces. This replaces `.tfvars` files and local environment variables, and lets production and development use different values from the same code.",
   "Each workspace keeps its own run history. Every plan and apply is recorded with who or what triggered it, the commit or configuration version, the full plan and apply logs, policy check results and the resulting state version. This provides an audit trail and makes it easy to see when a change was made and why.",
   "Each workspace has its own permissions and settings. Team access decides who can read, plan, apply or administer the workspace, either directly or inherited from its project. Settings include the execution mode (remote, local or agent), whether applies happen automatically or need manual confirmation, the Terraform version, the VCS connection and working directory, run triggers, notifications and remote state sharing.",
   "Contrast this with CLI workspaces. A CLI workspace is just an extra state for the same configuration and backend, sharing everything else. An HCP Terraform workspace is a complete, independently permissioned environment. The two do interact: when a `cloud` block maps to workspaces by tags, `terraform workspace select` switches between HCP Terraform workspaces. But for the exam, remember that HCP Terraform workspaces separate state, variables, runs and access, making them suitable for isolating environments in a way CLI workspaces are not.",
   "Workspaces can share data through outputs. With remote state sharing enabled, one workspace can read another's outputs using the `tfe_outputs` or `terraform_remote_state` data sources, and run triggers can start a downstream workspace's run when an upstream workspace applies."
  ],
  "terms": [
   [
    "HCP Terraform workspace",
    "A container for one infrastructure collection with its own state, variables, run history, settings and permissions."
   ],
   [
    "Run history",
    "The recorded list of a workspace's plans and applies with logs, triggers and resulting state versions."
   ],
   [
    "Auto-apply",
    "A workspace setting that applies successful plans automatically instead of waiting for manual confirmation."
   ],
   [
    "Remote state sharing",
    "A workspace setting that controls which other workspaces may read its outputs."
   ]
  ],
  "example": "An auditor asks who changed a production firewall rule last month. The team opens the firewall-prod workspace's run history, finds the run, sees the commit it came from, who approved the apply and the exact plan output, and exports the log for the audit file.",
  "tip": "HCP Terraform workspaces are full, separately permissioned environments (state, variables, runs, access); CLI workspaces only separate state.",
  "check": [
   [
    "Name four things each HCP Terraform workspace holds separately.",
    "Its state (and state history), variables, run history and permissions/settings."
   ],
   [
    "Why are HCP Terraform workspaces better than CLI workspaces for separating prod and dev?",
    "They have separate variables, credentials and access controls, not just separate state."
   ]
  ]
 },
 {
  "t": "Projects: grouping workspaces and assigning team access at the project level",
  "body": [
   "As organizations grow, they end up with hundreds of workspaces. Managing access workspace by workspace becomes slow and error-prone. Projects solve this by grouping related workspaces into a container that you can organize and permission as one unit.",
   "Every workspace belongs to exactly one project. An organization starts with a default project, and new workspaces land there unless you choose otherwise. You can create projects that mirror how your company is organized, such as one per application, business unit or team, and move workspaces between projects as ownership changes. In the `cloud` block, the `project` argument (or the `TF_CLOUD_PROJECT` environment variable) tells Terraform which project to create new workspaces in.",
   "The most important feature of projects is project-level team access. Instead of granting a team permission on each workspace, you grant it once on the project, and it applies to every workspace in that project, including workspaces created later. Built-in project permission levels range from read access through write access to full administration of the project, which lets a team create and manage its own workspaces within the project without having rights across the whole organization. Custom permission sets are also available for finer control.",
   "This supports a clean delegation model. Organization owners set up projects and decide which teams can use them. Each application team then works independently inside its project, creating workspaces as needed, while other teams cannot see or change them. It follows the principle of least privilege without making administrators a bottleneck.",
   "Projects also help with shared configuration. Variable sets can be scoped to a project, so shared values such as a cloud account's settings reach every workspace in it automatically. Policy sets can likewise be applied to projects, so, for example, stricter rules can be enforced on a production project. Some settings and features available at the project level depend on your HCP Terraform tier.",
   "Keep the hierarchy straight for the exam: an organization contains projects, projects contain workspaces, and each workspace has its own state, variables and runs. Teams belong to the organization and receive access at the organization, project or workspace level."
  ],
  "terms": [
   [
    "Project",
    "An HCP Terraform container that groups related workspaces for organization and access control."
   ],
   [
    "Default project",
    "The project new workspaces are placed in when no other project is specified."
   ],
   [
    "Project-level team access",
    "Permissions granted to a team on a project that apply to all its current and future workspaces."
   ],
   [
    "Organization",
    "The top-level HCP Terraform container that holds projects, workspaces, teams and settings."
   ]
  ],
  "example": "A company creates a payments project and grants the payments team admin access to it. The team can now create and manage its own workspaces for new services, and a payments-specific variable set and policy set apply automatically, while the marketing team cannot see any of it.",
  "tip": "Hierarchy: organization contains projects, projects contain workspaces; each workspace is in exactly one project, and project-level access covers all its workspaces.",
  "check": [
   [
    "How many projects can a workspace belong to?",
    "Exactly one."
   ],
   [
    "What is the advantage of granting a team access at the project level?",
    "The permission automatically covers every workspace in the project, including ones created later."
   ]
  ]
 },
 {
  "t": "Variables and variable sets; Terraform vs environment variables; sensitive variables",
  "body": [
   "HCP Terraform runs happen on remote workers, so the values your configuration needs (input variables and credentials) must be stored in HCP Terraform rather than on your laptop. You define them in each workspace, or share them across workspaces with variable sets.",
   "Each variable has a category. A Terraform variable sets an input variable declared in your configuration, exactly like a value in a `.tfvars` file; its key must match the `variable` block's name. You can mark it as HCL so the value is parsed as a list, map or other complex type rather than a plain string. An environment variable is exported into the shell of the run, which is how you pass provider credentials such as cloud access keys, Terraform settings such as `TF_LOG`, or `TF_VAR_name` values. Choosing the wrong category is a common mistake: a provider credential set as a Terraform variable will not be seen by the provider.",
   "Any variable can be marked sensitive. Sensitive variables are write-only in HCP Terraform: after you save them, nobody can read the value back through the UI or API, not even administrators; you can only replace them. They are still used during runs and are redacted in logs where Terraform knows they are sensitive. This is the right place for secrets such as tokens, but remember that if your configuration writes the value into a resource attribute, it can still end up in state.",
   "Variable sets are reusable groups of variables. You create a set once, for example cloud credentials for a sandbox account, and apply it to specific workspaces, to entire projects, or globally to every workspace in the organization. Updating the set updates every workspace that uses it, which makes credential rotation much easier.",
   "When the same variable is defined in more than one place, precedence rules apply. In general, a variable set directly on a workspace or its project loses to a variable defined in the workspace itself; project-scoped sets beat global sets; and a variable set marked as priority overrides workspace variables and even values from the run itself, which lets administrators enforce certain values. Values in `*.auto.tfvars` files in the configuration also participate, and workspace variables take precedence over them. If a question asks which value wins, look for priority sets first, then workspace-specific values, then broader sets.",
   "Environment variables in HCP Terraform are also how you configure things such as dynamic provider credentials (for example variables beginning with `TFC_` that enable the feature) and how you supply `TF_CLI_ARGS` to add flags to commands in remote runs."
  ],
  "terms": [
   [
    "Terraform variable (category)",
    "A workspace variable that sets a Terraform input variable declared in the configuration."
   ],
   [
    "Environment variable (category)",
    "A workspace variable exported into the run's shell, used for provider credentials and Terraform settings."
   ],
   [
    "Sensitive variable",
    "A write-only variable whose value cannot be viewed after saving but is available to runs."
   ],
   [
    "Variable set",
    "A reusable group of variables applied to selected workspaces, projects or the whole organization."
   ]
  ],
  "example": "A team stores its cloud provider access key ID and secret as sensitive environment variables in a variable set scoped to its project. When the keys are rotated, one edit updates every workspace in the project, and nobody can read the old or new secret back from the UI.",
  "tip": "Provider credentials go in environment variables, not Terraform variables. Sensitive variables are write-only; priority variable sets override workspace values.",
  "check": [
   [
    "Which variable category should hold cloud provider credentials?",
    "Environment variable, because providers read credentials from the run environment."
   ],
   [
    "Can an organization owner read the value of a sensitive variable after it is saved?",
    "No. Sensitive variables are write-only; they can be replaced but not viewed."
   ],
   [
    "What does a variable set let you do?",
    "Define variables once and apply them to many workspaces, whole projects or the entire organization."
   ]
  ]
 },
 {
  "t": "Collaboration and governance: teams and permissions, run approvals, policy as code (Sentinel and OPA), private registry",
  "body": [
   "HCP Terraform's value for larger organizations comes from controlling who can do what and enforcing standards automatically. The exam covers four areas: teams and permissions, run approvals, policy as code and the private registry.",
   "Teams are groups of users in an organization. Every organization has an owners team with full control. Other teams receive permissions at the organization level (for example the ability to manage policies, workspaces or VCS settings), at the project level, or on individual workspaces. Workspace permission levels include read (view state and runs), plan (queue plans), write (plan and apply, edit variables) and admin (manage settings and access), and custom permissions allow finer combinations. Teams can also have API tokens for automation. Following least privilege, most users get plan or read on production, and only a small group can apply.",
   "Run approvals control whether an apply happens automatically. By default a workspace waits after a successful plan for a user with apply permission to confirm and apply, giving a human checkpoint where reviewers read the plan. Enabling auto-apply skips that step, which suits development workspaces or VCS workflows where approval already happened in the pull request. Runs can also be discarded or cancelled, and comments can be left on runs.",
   "Policy as code checks runs against organizational rules before anything is applied. HCP Terraform supports two frameworks: Sentinel, HashiCorp's own policy language, and Open Policy Agent (OPA), which uses the Rego language. Policies are grouped into policy sets that apply to the whole organization or selected projects and workspaces. Policy checks run after the plan and before apply, so a policy can inspect the planned changes, for example to require tags, forbid public buckets or limit instance sizes. Enforcement levels decide what happens on failure: Sentinel has advisory (warn only), soft-mandatory (can be overridden by authorized users) and hard-mandatory (cannot be overridden); OPA policies are advisory or mandatory.",
   "```text\nPlan: 3 to add, 0 to change, 0 to destroy.\nPolicy check: require-cost-center-tag (soft-mandatory) FAILED\n  -> an authorized user may override to continue\n```",
   "The private registry lets an organization publish its own modules and providers for internal use. Modules are typically published from VCS repositories with version tags, and consumers call them with sources like `app.terraform.io/ORG/NAME/PROVIDER` and a `version` constraint, just as with the public registry. Private registries encourage teams to reuse approved, reviewed building blocks rather than copying code, and some tiers also offer no-code provisioning, where users can deploy approved modules without writing Terraform.",
   "Together, these features turn Terraform from a tool individuals run into a governed platform: the registry supplies good patterns, policy blocks bad ones, approvals keep a human in the loop and permissions keep each team in its lane."
  ],
  "terms": [
   [
    "Owners team",
    "The built-in team with full administrative control of an HCP Terraform organization."
   ],
   [
    "Sentinel",
    "HashiCorp's policy-as-code framework with advisory, soft-mandatory and hard-mandatory enforcement levels."
   ],
   [
    "OPA (Open Policy Agent)",
    "An open-source policy engine using the Rego language, supported in HCP Terraform with advisory and mandatory levels."
   ],
   [
    "Private registry",
    "An organization-only registry for sharing approved modules and providers with versioning."
   ]
  ],
  "example": "A company requires every resource to carry a cost-center tag. A Sentinel policy set applied to all workspaces checks planned resources for the tag at soft-mandatory level, so runs missing it stop after the plan until a team lead either fixes the code or overrides with a documented reason.",
  "tip": "Policy checks run after plan and before apply. Know Sentinel's three levels: advisory warns, soft-mandatory can be overridden, hard-mandatory cannot.",
  "check": [
   [
    "When in a run are policy checks evaluated?",
    "After the plan and before the apply, so they can inspect the planned changes."
   ],
   [
    "Which Sentinel enforcement level allows an authorized user to override a failure?",
    "Soft-mandatory."
   ],
   [
    "What does the private registry provide?",
    "A place to publish and version the organization's own modules and providers for internal reuse."
   ]
  ]
 },
 {
  "t": "Health assessments: drift detection and continuous validation",
  "body": [
   "Terraform only notices problems when someone runs it. If a workspace is not touched for weeks, drift and failures can go unseen. HCP Terraform's health assessments fix that by checking workspaces automatically on a schedule and reporting problems, without anyone having to start a run. Health assessments are available on paid tiers and must be enabled for the organization or individual workspaces.",
   "The first half is drift detection. HCP Terraform periodically performs a refresh-only plan against the workspace's real infrastructure and compares the result with the stored state. If resources were changed or deleted outside Terraform, the workspace is flagged as drifted, and the UI lists which resources changed and which attributes differ. It is essentially an automatic `terraform plan -refresh-only` that runs for you in the background.",
   "Detection does not fix anything. Once drift is reported, you decide how to respond, exactly as you would locally: start a normal run to put the infrastructure back to match the configuration, or update the configuration (and possibly run a refresh-only apply) if the change should be kept. Assessments do not modify state or infrastructure on their own.",
   "The second half is continuous validation. Your configuration may contain custom conditions: `check` blocks with assertions, and `precondition` and `postcondition` blocks on resources and data sources. Normally these are evaluated only during runs. Continuous validation re-evaluates them during each health assessment, so a condition that becomes false later, such as a certificate nearing expiry or a website no longer returning a successful status, is reported in the workspace's health status even though nobody has run Terraform.",
   "Health assessment results appear on the workspace and in organization-wide views that show which workspaces are drifted or failing checks. Combined with notifications, they can alert teams through email, chat tools or webhooks when a workspace's health changes. Assessments require that the workspace can run plans (for example that credentials are valid) and typically do not run while other runs are in progress.",
   "The main exam points: health assessments are scheduled and automatic, drift detection is based on refresh-only plans, continuous validation re-runs check blocks and pre/postconditions, and neither changes your infrastructure; they inform you so you can act."
  ],
  "terms": [
   [
    "Health assessment",
    "An automatic, scheduled HCP Terraform check of a workspace for drift and failing conditions."
   ],
   [
    "Drift detection",
    "The part of health assessments that uses refresh-only plans to find changes made outside Terraform."
   ],
   [
    "Continuous validation",
    "The part of health assessments that re-evaluates check blocks and pre/postconditions between runs."
   ],
   [
    "Drifted workspace",
    "A workspace whose real infrastructure no longer matches its stored state."
   ]
  ],
  "example": "A check block asserts that the company's public TLS certificate has more than 30 days of validity. Weeks after the last run, continuous validation marks the workspace as failing, a notification is sent to the team chat, and the team renews the certificate before users see an error.",
  "tip": "Health assessments only detect and report; they never change infrastructure or state. Drift detection equals a scheduled refresh-only plan.",
  "check": [
   [
    "What kind of plan does drift detection use?",
    "A refresh-only plan that compares real infrastructure with the stored state."
   ],
   [
    "Which configuration constructs does continuous validation re-evaluate?",
    "check block assertions and precondition and postcondition blocks."
   ]
  ]
 },
 {
  "t": "Integrations: VCS providers, run triggers, run tasks, notifications, dynamic provider credentials",
  "body": [
   "HCP Terraform connects to the rest of your toolchain in several ways. Each integration solves a different problem, and the exam expects you to match the feature to the scenario.",
   "VCS providers connect an organization to a version control system such as GitHub, GitLab, Bitbucket or Azure DevOps. Once connected, workspaces can use the VCS-driven workflow: commits to a tracked branch start runs, pull requests get speculative plans shown as status checks, and the private registry can publish modules straight from tagged repositories. The connection is typically set up once by an administrator using an OAuth application or a GitHub App.",
   "Run triggers link workspaces together. You configure a downstream workspace to watch one or more source workspaces; when a source workspace completes a successful apply, HCP Terraform automatically queues a run in the downstream workspace. This suits layered infrastructure: when the network workspace changes, the application workspace that reads its outputs re-plans automatically.",
   "Run tasks send run data to external services and wait for their verdict. Examples include security scanners, cost estimation tools and compliance checkers. A run task can be attached at stages such as pre-plan, post-plan, pre-apply and post-apply, and its enforcement can be advisory (results shown, run continues) or mandatory (a failure stops the run). Run tasks are how third-party checks join the same gate as Sentinel or OPA policies.",
   "Notifications tell people and systems about run events. Workspace notification configurations can send to email, Slack, Microsoft Teams or a generic webhook when runs are created, need attention (for example awaiting approval), complete or fail, and for health assessment results such as detected drift.",
   "Dynamic provider credentials remove long-lived secrets from workspaces. Instead of storing static cloud keys, HCP Terraform issues a signed workload identity token for each run using OpenID Connect (OIDC). You configure a trust relationship in the cloud (for example an AWS IAM role, an Azure app registration, a GCP workload identity pool, or a Vault role) that accepts tokens from your organization, project or workspace. Workspace environment variables beginning with `TFC_` turn the feature on and name the role to use. The provider then exchanges the token for short-lived credentials valid only for that run, so there is nothing long-lived to leak or rotate.",
   "```text\nTFC_AWS_PROVIDER_AUTH = true\nTFC_AWS_RUN_ROLE_ARN  = arn:aws:iam::111122223333:role/tfc-app-prod\n```"
  ],
  "terms": [
   [
    "Run trigger",
    "A link that automatically queues a run in a workspace after a source workspace applies successfully."
   ],
   [
    "Run task",
    "An integration that sends run data to an external service at a set stage and can block the run on failure."
   ],
   [
    "Notification configuration",
    "A workspace setting that sends run and health events to email, chat tools or webhooks."
   ],
   [
    "Dynamic provider credentials",
    "Short-lived cloud credentials obtained per run by exchanging an HCP Terraform OIDC workload identity token."
   ]
  ],
  "example": "A company's app workspace reads VPC IDs from a network workspace. They add a run trigger so the app workspace re-plans whenever the network workspace applies, attach a mandatory post-plan run task that runs a security scanner, send failures to a chat channel, and switch both workspaces to dynamic AWS credentials so no access keys are stored.",
  "tip": "Match the feature: run triggers chain workspaces, run tasks call external checks, notifications send alerts, and dynamic provider credentials replace static cloud keys with per-run OIDC credentials.",
  "check": [
   [
    "Which feature starts a run in workspace B after workspace A applies?",
    "A run trigger configured on workspace B with A as its source."
   ],
   [
    "What problem do dynamic provider credentials solve?",
    "They eliminate long-lived static cloud credentials by issuing short-lived credentials per run through OIDC workload identity."
   ],
   [
    "At which stages can run tasks be attached?",
    "Pre-plan, post-plan, pre-apply and post-apply."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
