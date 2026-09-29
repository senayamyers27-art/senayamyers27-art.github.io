/* Lessons for ISC2 CCSP (outline effective Aug 1, 2026): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("ccsp", [
 {
  "t": "Cloud computing concepts: NIST definitions, essential characteristics and roles (customer, provider, partner, broker, regulator)",
  "body": [
   "Cloud computing is a way of delivering computing resources, such as servers, storage, databases and software, over a network on demand, so you pay for what you use instead of buying and running everything yourself. The CCSP exam builds on two definitions: NIST SP 800-145 and ISO/IEC 17788. You need their vocabulary, because many questions hinge on whether a situation really is cloud computing and who is responsible for what.",
   "NIST lists five essential characteristics. On-demand self-service means a customer can provision resources without a human at the provider approving each request. Broad network access means services are reachable over standard networks from many kinds of device. Resource pooling means the provider serves many customers from shared physical resources, and the customer usually does not know exactly where their workload runs. Rapid elasticity means capacity can grow and shrink quickly, often automatically. Measured service means usage is metered, which enables pay-per-use billing and gives both sides data for chargeback and capacity planning. ISO/IEC 17788 adds multitenancy as a sixth key characteristic: several customers share the same infrastructure while being kept isolated from each other.",
   "Roles matter because responsibility follows them. The cloud service customer (CSC) uses the service and remains accountable for its own data. The cloud service provider (CSP) makes the service available. A cloud service partner supports either side; examples are a cloud auditor who independently assesses controls and a cloud service broker who negotiates, aggregates or integrates services from several providers on the customer's behalf. Regulators set the legal and industry requirements that both customer and provider must meet, and they can request evidence.",
   "Security consequences flow straight from the characteristics. Resource pooling and multitenancy create the risk that one tenant affects another, so isolation is a core provider duty. Self-service and elasticity make it easy to create resources nobody tracks, so governance and tagging become the customer's job. Measured service gives you data that can reveal abuse, such as a sudden cost spike from a hijacked account mining cryptocurrency."
  ],
  "terms": [
   [
    "Resource pooling",
    "The provider serves many customers from shared physical resources that are dynamically assigned, with location largely hidden from the customer."
   ],
   [
    "Rapid elasticity",
    "The ability to scale capacity up or down quickly, often automatically, so it appears unlimited to the customer."
   ],
   [
    "Cloud service broker",
    "A partner that negotiates, integrates or aggregates cloud services from one or more providers on behalf of a customer."
   ],
   [
    "Multitenancy",
    "Several customers (tenants) sharing the same infrastructure while their data and workloads are kept logically separated."
   ]
  ],
  "example": "A retailer's developers spin up dozens of virtual machines in minutes for a holiday sale and remove them afterwards. The monthly bill shows exactly how many compute hours were used. Those are on-demand self-service, rapid elasticity and measured service at work, and the security team adds tagging rules so every short-lived resource still has an owner.",
  "tip": "Know the five NIST characteristics by name. A service that needs a ticket and a week of manual work to add capacity fails on-demand self-service and rapid elasticity, however it is marketed.",
  "check": [
   [
    "Which characteristic makes pay-per-use billing possible?",
    "Measured service, because the provider meters resource usage."
   ],
   [
    "Who remains accountable for data when a company moves it into a public cloud?",
    "The cloud service customer; the provider operates controls, but accountability for the data stays with the customer."
   ],
   [
    "What does a cloud auditor do?",
    "It is a partner that independently assesses and reports on the controls of a cloud service, giving assurance to customers and regulators."
   ]
  ]
 },
 {
  "t": "Cloud reference architecture: IaaS, PaaS, SaaS service models and cloud service capabilities",
  "body": [
   "A reference architecture is a shared map of the parts of a cloud service and who operates each one. The CCSP exam uses it to test whether you can tell what the customer controls in each service model, because that decides which security controls the customer must build and which it can only request or verify.",
   "Infrastructure as a Service (IaaS) gives the customer virtual machines, virtual networks and storage. The provider runs the physical data center, hardware and hypervisor; the customer installs and patches the guest operating system, middleware and applications, and configures firewalls and identity. Platform as a Service (PaaS) moves the operating system and runtime to the provider: you deploy code or use a managed database, and the provider patches the platform underneath. Software as a Service (SaaS) delivers a finished application; the customer mainly controls its users, their permissions, configuration settings and the data it puts in.",
   "ISO/IEC 17788 describes the same idea as cloud capability types. An infrastructure capability type lets the customer provision and use processing, storage or networking. A platform capability type lets the customer deploy and run applications written in languages and tools the provider supports. An application capability type lets the customer use the provider's applications. Named service categories such as compute as a service, data storage as a service, network as a service and communications as a service fit inside these types.",
   "The pattern to remember is that as you move from IaaS to PaaS to SaaS, the customer gives up control and gains convenience. Less control means you rely more on contracts, service level agreements and third-party assurance reports to confirm the provider's controls. Some responsibilities never move: in every model the customer owns its data, decides who gets access, and is accountable to regulators and customers if that data is mishandled."
  ],
  "terms": [
   [
    "IaaS",
    "A service model in which the customer rents virtual compute, storage and networking and manages everything from the guest operating system up."
   ],
   [
    "PaaS",
    "A service model in which the provider runs the operating system and runtime, and the customer deploys and manages its own applications and data."
   ],
   [
    "SaaS",
    "A service model in which the provider delivers a complete application, and the customer manages users, configuration and data."
   ],
   [
    "Cloud capability type",
    "ISO/IEC 17788's classification of what a service offers the customer: infrastructure, platform or application capability."
   ]
  ],
  "example": "A startup runs its web app on managed PaaS, keeps files in object storage and uses a SaaS email suite. When a critical kernel flaw is announced, the startup does nothing for the PaaS and SaaS parts because the providers patch those, but it must still patch the two IaaS virtual machines it runs for a legacy reporting tool.",
  "tip": "When a question asks who patches the operating system, the answer depends on the model: the customer in IaaS, the provider in PaaS and SaaS. Data and access decisions stay with the customer in all three.",
  "check": [
   [
    "In PaaS, who is responsible for patching the runtime and operating system?",
    "The provider; the customer is responsible for its application code, configuration and data."
   ],
   [
    "Which service model gives the customer the most control and therefore the most security responsibility?",
    "IaaS, because the customer manages the guest operating system and everything above it."
   ],
   [
    "What does the application capability type describe?",
    "A service where the customer uses the provider's applications, which corresponds to SaaS."
   ]
  ]
 },
 {
  "t": "Cloud deployment models: public, private, community, hybrid and multi-cloud",
  "body": [
   "A deployment model describes who can use a cloud and who owns or operates it. It is a separate question from the service model: you can have private IaaS or public SaaS. The CCSP exam expects you to match a business need, such as regulatory isolation, cost or burst capacity, to the right deployment model and to name its main risks.",
   "A public cloud is open to any customer and run by a provider on its own infrastructure. It offers the greatest scale and lowest upfront cost, but the customer shares infrastructure with strangers and depends on the provider's controls and contract terms. A private cloud serves a single organization; it may be on premises or hosted by a third party, and it gives the most control over location, hardware and configuration at a higher cost. A community cloud is shared by several organizations with common concerns, such as regional hospitals or government agencies with the same compliance rules; governance and cost are shared among the members.",
   "A hybrid cloud combines two or more distinct clouds, typically private and public, that stay separate but are linked by technology that lets data and applications move between them. A common pattern is cloud bursting, where a private cloud sends overflow work to public capacity at peak times. Multi-cloud means using services from more than one provider, often to avoid dependence on a single vendor or to pick the best service for each job. Multi-cloud reduces vendor lock-in but increases complexity: each provider has different identity systems, logging formats and security tools, so consistent policy and skilled staff are harder to maintain.",
   "When you evaluate a deployment model, think about data location and jurisdiction, the degree of isolation from other tenants, who holds the keys, how you will get your data back when you leave, and whether your team can monitor every environment. Portability (moving an application between clouds) and interoperability (making components in different clouds work together) are the two properties that decide how painful a later move will be."
  ],
  "terms": [
   [
    "Community cloud",
    "A cloud shared by several organizations with common requirements, such as the same regulations, with shared governance and cost."
   ],
   [
    "Hybrid cloud",
    "Two or more distinct clouds, such as private and public, bound together so that data and applications can move between them."
   ],
   [
    "Vendor lock-in",
    "Dependence on one provider's proprietary services or formats that makes leaving costly or difficult."
   ],
   [
    "Cloud bursting",
    "Sending overflow workload from a private environment to public cloud capacity during demand peaks."
   ]
  ],
  "example": "A group of state universities builds a shared research cloud that meets the same student-privacy rules for all members and splits the running costs. Individually they could not justify a private cloud, and a public cloud's contract did not satisfy their regulator, so a community cloud fits.",
  "tip": "Hybrid means different deployment models linked together; multi-cloud means more than one provider, which may all be public. Questions often use one word to test whether you confuse it with the other.",
  "check": [
   [
    "Which deployment model best fits several organizations with the same compliance requirements that want to share costs?",
    "A community cloud."
   ],
   [
    "What is the main security cost of a multi-cloud strategy?",
    "Complexity: different identity, logging and security tools across providers make consistent policy and monitoring harder."
   ],
   [
    "What is cloud bursting?",
    "Moving overflow demand from a private cloud to public cloud capacity at peak times, a common hybrid pattern."
   ]
  ]
 },
 {
  "t": "Shared responsibility model across service models",
  "body": [
   "The shared responsibility model is the agreement, sometimes written and sometimes only implied, about which security tasks the provider performs and which the customer performs. Most real cloud breaches happen on the customer side of the line: a storage bucket left public, an over-privileged access key, an unpatched virtual machine. The CCSP exam tests whether you can place each task on the correct side for IaaS, PaaS and SaaS.",
   "A useful rule is that the provider is responsible for security of the cloud and the customer for security in the cloud. The provider always owns physical security of data centers, the hardware, the host network and the virtualization layer. In IaaS the customer owns the guest operating system, patching, host firewalls, network rules, applications, identities and data. In PaaS the provider also takes the operating system and runtime, leaving the customer with application code, configuration, identities and data. In SaaS the provider runs almost everything, and the customer still owns user accounts, access rights, configuration choices such as sharing settings, and the data.",
   "Some responsibilities are shared in every model. Identity and access management is split: the provider supplies the identity service and keeps it secure, but the customer decides who gets which permissions and whether MFA is enforced. Encryption is often split too: the provider offers encryption features, while the customer chooses to enable them and decides how keys are managed. Logging is a third shared area: the provider generates logs, but the customer must turn them on where needed, keep them and review them.",
   "Two things never transfer. Accountability for data stays with the data owner, even when a provider processes it. And responsibility only moves when it is written down, so read the contract and the provider's responsibility documentation rather than assuming. When you cannot inspect the provider's side directly, you verify it through audit reports such as SOC 2 Type II or ISO/IEC 27001 certification."
  ],
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between cloud provider and customer, which shifts according to the service model."
   ],
   [
    "Security of the cloud",
    "The provider's duties: facilities, hardware, host network and virtualization layer."
   ],
   [
    "Security in the cloud",
    "The customer's duties: data, identities, configuration and, depending on the model, operating systems and applications."
   ],
   [
    "Accountability",
    "Being answerable for the outcome; it stays with the data owner even when tasks are delegated to a provider."
   ]
  ],
  "example": "A company using a SaaS file-sharing tool suffers a leak after an employee shares a folder with 'anyone with the link'. The provider's platform worked as designed; the sharing setting was the customer's configuration decision, so the incident sits on the customer side of the shared responsibility model.",
  "tip": "Data, identities and access decisions are always the customer's. If an answer claims the provider is accountable for a customer's data classification or user permissions, it is wrong.",
  "check": [
   [
    "In IaaS, who configures the host-based firewall on a virtual machine?",
    "The customer, because it manages the guest operating system."
   ],
   [
    "Name one responsibility that is shared in every service model.",
    "Identity and access management (the provider secures the service; the customer assigns permissions). Encryption and logging are also commonly shared."
   ],
   [
    "How does a customer confirm the provider's side of the model is working?",
    "Through contracts and independent assurance such as SOC 2 Type II reports or ISO/IEC 27001 certification."
   ]
  ]
 },
 {
  "t": "Related technologies: containers, serverless, edge computing, confidential computing, DevSecOps and quantum",
  "body": [
   "Cloud security is not only about virtual machines. The CCSP outline asks you to understand technologies that commonly run on or alongside cloud platforms and the security questions each one raises. You are not expected to be an engineer in each, but you should know what it is, why organizations use it and where its risks lie.",
   "Containers package an application with its libraries so it runs the same way everywhere. They share the host operating system kernel, so isolation is weaker than between virtual machines; a kernel flaw or a container running with excessive privileges can affect the host and its neighbors. Good practice includes scanning images for known vulnerabilities, using minimal trusted base images, running as a non-root user and letting an orchestrator such as Kubernetes enforce network policies and secrets handling. Serverless (function as a service) goes further: you upload a function and the provider runs it on demand. There is no server to patch, but each function needs tightly scoped permissions, input validation and logging, because many small functions multiply the attack surface.",
   "Edge computing moves processing close to where data is produced, such as factory sensors or retail stores, to reduce latency. Those devices may sit in places without physical security, so tamper resistance, secure boot and remote update matter. Confidential computing protects data in use by processing it inside a hardware-based trusted execution environment (TEE), an enclave whose memory the host operating system and hypervisor cannot read. It complements encryption at rest and in transit, closing the gap while data is being processed.",
   "DevSecOps builds security into the development and operations pipeline: automated code scanning, dependency checks and policy tests run on every change instead of at the end. Quantum computing is on the list because large quantum computers are expected to break today's public-key algorithms such as RSA and elliptic-curve cryptography. Attackers can harvest encrypted data now and decrypt it later, so organizations are inventorying their cryptography and planning a move to post-quantum algorithms, which NIST has begun standardizing."
  ],
  "terms": [
   [
    "Container",
    "A lightweight package of an application and its dependencies that shares the host operating system kernel with other containers."
   ],
   [
    "Serverless",
    "A model in which the provider runs code on demand in response to events, and the customer manages no servers."
   ],
   [
    "Trusted execution environment (TEE)",
    "A hardware-isolated area of a processor where code and data are protected even from the host operating system and hypervisor."
   ],
   [
    "Harvest now, decrypt later",
    "The threat of attackers storing encrypted data today to decrypt it once quantum computers can break current public-key algorithms."
   ]
  ],
  "example": "A payments company moves a fraud model to confidential computing so it can analyze card data from partner banks inside an enclave. Neither the cloud provider's administrators nor a compromised hypervisor can read the data while it is being processed, which the partner banks required in the contract.",
  "tip": "Containers share a kernel and virtual machines do not; that single fact explains most container-isolation questions. Confidential computing is the answer when the question is about protecting data in use.",
  "check": [
   [
    "Why is isolation between containers weaker than between virtual machines?",
    "Containers share the host kernel, so a kernel flaw or a privileged container can affect other containers and the host."
   ],
   [
    "Which technology protects data while it is being processed?",
    "Confidential computing, using a hardware trusted execution environment."
   ],
   [
    "Why does quantum computing matter for data encrypted today?",
    "Attackers can store it now and decrypt it later when quantum computers can break RSA and elliptic-curve cryptography."
   ]
  ]
 },
 {
  "t": "AI and machine learning in the cloud: service types, use cases and security considerations",
  "body": [
   "The 2026 CCSP outline adds a subdomain on understanding artificial intelligence (AI) and machine learning (ML) in the cloud. Most organizations now reach AI through cloud services rather than building it from scratch, so a cloud security professional must be able to describe how those services are consumed and where the new risks appear.",
   "AI services come in layers that mirror the familiar service models. At the infrastructure level you rent GPU or accelerator instances and run your own training jobs, which is essentially IaaS with the same patching and network duties. At the platform level a managed ML platform provides notebooks, training pipelines, model registries and hosted endpoints; the provider runs the platform and you own the data, code, models and access. At the application level you call a pre-trained model through an API, for example a large language model (LLM) for text, a vision model or a speech service, or you use AI features built into SaaS products. Common uses include customer support assistants, document summarization, fraud and anomaly detection, forecasting and code assistance.",
   "The security considerations follow the data and the model. Training data and prompts may contain personal or confidential information, so you need to know where they are stored, whether the provider may use them to improve its own models, and in which region they are processed. Models are valuable assets that can be stolen or tampered with, so model registries need access control and integrity checks. AI-specific attacks include data poisoning (corrupting training data), prompt injection (crafting input that overrides an LLM's instructions), model inversion and membership inference (extracting information about training data from outputs) and model extraction (copying a model by querying it).",
   "Governance ties this together. Keep an inventory of AI services and models in use, including unapproved 'shadow AI'. Apply least privilege to model endpoints and to the tools an AI agent can call. Log prompts and outputs where the law allows, and review the provider's contract terms on data use and retention. Frameworks such as the NIST AI Risk Management Framework and ISO/IEC 42001 give a structure for managing these risks."
  ],
  "terms": [
   [
    "Large language model (LLM)",
    "A machine learning model trained on large amounts of text that generates or analyzes language in response to prompts."
   ],
   [
    "Prompt injection",
    "An attack in which crafted input causes an AI model to ignore its instructions or perform unintended actions."
   ],
   [
    "Data poisoning",
    "Deliberately corrupting training data so that a model learns wrong or malicious behavior."
   ],
   [
    "Shadow AI",
    "Use of AI services by staff without the organization's approval or oversight."
   ]
  ],
  "example": "A law firm wants to summarize contracts with a cloud LLM. Before approval, the security team confirms that the provider will not train on the firm's prompts, that processing stays in the required region, that access to the endpoint requires single sign-on and that prompts and outputs are logged for review.",
  "tip": "For AI questions, apply the same shared responsibility logic as any other service: the customer still owns its data, access decisions and the business use of the output, whatever the provider manages.",
  "check": [
   [
    "What should you check in a provider's terms before sending confidential data to a hosted AI model?",
    "Whether the provider stores or trains on your prompts and data, how long it keeps them, and where they are processed."
   ],
   [
    "What is model extraction?",
    "Copying a model's behavior by sending many queries and training a substitute on the responses."
   ],
   [
    "Name one framework for managing AI risk.",
    "The NIST AI Risk Management Framework or ISO/IEC 42001."
   ]
  ]
 },
 {
  "t": "Security concepts for cloud computing: cryptography and key management, identity, data and media sanitization, network security, virtualization security",
  "body": [
   "Domain 1 asks you to understand the basic security building blocks as they apply to the cloud. Each one exists on premises too, but the cloud changes who controls it and which options are available.",
   "Cryptography protects data at rest, in transit and, with confidential computing, in use. In the cloud the hard part is key management: who generates the keys, where they are stored, who can use them and how they are rotated and destroyed. Keeping keys separate from the data they protect is the central principle, so a provider-managed key service, a customer-managed key or a hardware security module (HSM) is chosen according to how much control and separation the organization needs. Identity and access management (IAM) is often called the new perimeter because cloud resources are reachable from anywhere; strong authentication with MFA, least privilege, federation with the corporate identity provider and careful control of privileged accounts matter more than network location.",
   "Data and media sanitization is different in the cloud because you cannot walk into the provider's data center and shred a disk. Storage is shared and data may be spread across many drives. The practical tools are overwriting where the service supports it and cryptographic erasure (crypto-shredding): if data was encrypted with a key only you control, destroying every copy of that key makes the data unrecoverable. Physical destruction of failed drives is the provider's job, which you confirm through contracts and audit reports.",
   "Network security relies on software-defined controls: virtual networks, security groups, network access control lists, private endpoints and web application firewalls, configured through the provider's management interface rather than by cabling. Virtualization security covers the hypervisor, which must isolate tenants, and the management plane, the console and APIs that control everything; a compromised management account can delete or copy an entire environment, so it needs the strongest protection of all."
  ],
  "terms": [
   [
    "Key management",
    "The lifecycle of cryptographic keys: generation, distribution, storage, use, rotation, revocation and destruction."
   ],
   [
    "Crypto-shredding",
    "Making encrypted data unrecoverable by destroying all copies of the key that encrypted it."
   ],
   [
    "Management plane",
    "The console, APIs and tools used to create, configure and delete cloud resources."
   ],
   [
    "Hypervisor",
    "Software that creates and runs virtual machines and isolates them from one another."
   ]
  ],
  "example": "When a company ends its contract with a storage provider, it cannot supervise disk wiping. Because it encrypted every object with keys held in its own key management service, it deletes those keys and records the event, leaving any remaining copies on the provider's disks unreadable.",
  "tip": "For sanitization questions in a public cloud, crypto-shredding is usually the best answer because the customer cannot physically destroy shared media.",
  "check": [
   [
    "Why is IAM called the new perimeter in cloud computing?",
    "Because cloud resources are reachable from anywhere, so identity and permissions, not network location, decide who can reach them."
   ],
   [
    "What must be true for crypto-shredding to work?",
    "The data must have been encrypted and every copy of the key must be destroyed, including backups of the key."
   ],
   [
    "Why does the management plane need the strongest protection?",
    "A compromised management account can create, copy or delete entire environments."
   ]
  ]
 },
 {
  "t": "Design principles of secure cloud computing: secure data lifecycle, cloud-based BC/DR, BIA, cost-benefit and security patterns",
  "body": [
   "Designing securely means making good decisions before anything is built. The CCSP outline groups several design ideas together: protecting data at every lifecycle phase, planning continuity and recovery, measuring business impact, weighing cost against benefit, and reusing proven security patterns.",
   "The cloud secure data lifecycle has six phases: create, store, use, share, archive and destroy. At each phase you ask which controls apply. Classification should happen at creation. Encryption and access control protect storage. Use may need monitoring or data loss prevention. Sharing needs rights management or tokenization. Archives need long-term key management. Destruction needs a method, such as crypto-shredding, that works in shared infrastructure.",
   "Business continuity (BC) keeps critical functions running during a disruption; disaster recovery (DR) restores IT services afterwards. A business impact analysis (BIA) identifies critical processes and sets the recovery time objective (RTO, how quickly a service must be back) and the recovery point objective (RPO, how much data loss is tolerable). The cloud makes DR cheaper, because you can replicate to another region and pay for full capacity only when you fail over, but you must plan for the provider itself being the disruption, for example a region-wide outage or a contract dispute. A cost-benefit analysis compares the cloud's savings and agility with new costs such as egress fees, retraining, compliance work and the risk of lock-in. Security spending should be proportional to the value of what it protects.",
   "Security patterns are reusable, reviewed designs. Examples include the provider's well-architected framework guidance, the Cloud Security Alliance's reference materials, defense in depth, secure-by-default templates and least-privilege roles. Using patterns means you do not rediscover the same mistakes, and auditors can compare your design against a known baseline."
  ],
  "terms": [
   [
    "Recovery time objective (RTO)",
    "The maximum acceptable time to restore a service after a disruption."
   ],
   [
    "Recovery point objective (RPO)",
    "The maximum acceptable amount of data loss, measured as time before the disruption."
   ],
   [
    "Business impact analysis (BIA)",
    "An analysis that identifies critical business processes, the impact of losing them and the recovery objectives they need."
   ],
   [
    "Security pattern",
    "A proven, reusable design solution for a recurring security problem."
   ]
  ],
  "example": "An online insurer's BIA shows that its quote engine can be down for no more than two hours and can lose no more than five minutes of data. The team replicates the database continuously to a second region and keeps a scaled-down copy of the application there, meeting the RTO and RPO at a fraction of the cost of a full second site.",
  "tip": "RPO drives backup and replication frequency; RTO drives how fast failover must be. If a question gives an acceptable data loss, it is asking about RPO.",
  "check": [
   [
    "List the six phases of the cloud secure data lifecycle.",
    "Create, store, use, share, archive and destroy."
   ],
   [
    "Which BIA metric decides how often you must replicate data?",
    "The recovery point objective (RPO)."
   ],
   [
    "Name one cost that a cloud cost-benefit analysis should not overlook.",
    "Examples: data egress fees, staff retraining, compliance effort, or the cost of lock-in when leaving."
   ]
  ]
 },
 {
  "t": "Evaluating cloud service providers: ISO/IEC 27017, CSA STAR, SOC 2, Common Criteria and FIPS 140-3",
  "body": [
   "Customers rarely get to audit a large provider themselves, so they rely on independent certifications and reports. The CCSP exam expects you to know what each common assurance scheme covers, so you can pick the right evidence for a given concern and spot when a certificate does not cover what you need.",
   "ISO/IEC 27001 certifies an information security management system (ISMS). ISO/IEC 27017 adds cloud-specific guidance on top of the 27002 controls, covering topics such as shared roles, virtual machine hardening, tenant separation and removal of customer assets at contract end. ISO/IEC 27018 is a code of practice for protecting personally identifiable information (PII) in public clouds acting as processors. Always check the scope: a certificate that covers one data center or one service tells you nothing about the others.",
   "The Cloud Security Alliance's Security, Trust, Assurance and Risk (STAR) program is built on its Cloud Controls Matrix (CCM). Level 1 is a self-assessment, often using the Consensus Assessments Initiative Questionnaire (CAIQ), published in the STAR registry. Level 2 adds third-party validation, such as STAR certification combined with ISO/IEC 27001 or STAR attestation combined with a SOC 2 examination. A SOC 2 report, issued under AICPA standards, describes controls relevant to the trust services criteria (security, availability, processing integrity, confidentiality and privacy). A Type I report judges the design at a point in time; a Type II report also tests whether controls operated effectively over a period, usually six to twelve months, so it is stronger evidence.",
   "Two product-level schemes also appear. Common Criteria (ISO/IEC 15408) evaluates a specific product against a protection profile and assigns an evaluation assurance level (EAL1 to EAL7); it says nothing about how a provider operates that product. FIPS 140-3, the current U.S. standard that replaced FIPS 140-2, validates cryptographic modules at security levels 1 to 4, which matters when a regulation requires validated encryption, for example for U.S. federal data."
  ],
  "terms": [
   [
    "ISO/IEC 27017",
    "A code of practice adding cloud-specific security controls and guidance for providers and customers."
   ],
   [
    "CSA STAR",
    "The Cloud Security Alliance's assurance program, with a self-assessment level and a third-party validated level, based on the Cloud Controls Matrix."
   ],
   [
    "SOC 2 Type II",
    "An auditor's report on the design and operating effectiveness of a service organization's controls over a period of time."
   ],
   [
    "FIPS 140-3",
    "The U.S. standard for validating cryptographic modules, with four increasing security levels."
   ]
  ],
  "example": "A hospital shortlisting two providers asks each for a SOC 2 Type II report and its ISO/IEC 27001 and 27017 certificates. One provider offers only a Type I report issued last month, so the hospital asks for bridge letters and schedules a follow-up, preferring evidence that controls actually worked over time.",
  "tip": "Type I is design at a point in time; Type II is design plus operating effectiveness over a period. When asked which gives the most assurance, pick Type II. Common Criteria rates products, not providers.",
  "check": [
   [
    "Which standard specifically covers protecting PII in public clouds?",
    "ISO/IEC 27018."
   ],
   [
    "What is the difference between CSA STAR Level 1 and Level 2?",
    "Level 1 is a self-assessment; Level 2 adds independent third-party validation."
   ],
   [
    "What does a FIPS 140-3 validation tell you?",
    "That a cryptographic module has been tested and validated at a defined security level from 1 to 4."
   ]
  ]
 },
 {
  "t": "Cloud data concepts: cloud data lifecycle phases, data dispersion and data flows",
  "body": [
   "Cloud Data Security is the heaviest CCSP domain, and it starts with understanding how data lives and moves. If you cannot say where data is, in what state and who touches it, you cannot choose controls for it.",
   "The cloud data lifecycle, as described by the Cloud Security Alliance, has six phases. Create covers new data and modified data, and it is the best moment to classify. Store happens almost immediately after creation, when data is committed to a storage system. Use means viewing, processing or changing the data. Share means making it available to others, inside or outside the organization. Archive moves data that is no longer active into long-term storage. Destroy removes it permanently. Data does not always move through the phases in order; it can be used and shared many times, and each phase has typical controls such as classification, encryption, access control, rights management and secure deletion.",
   "Data dispersion is a storage technique in which data is split into fragments and spread across several locations, often with parity or erasure coding so the original can be rebuilt even if some fragments are lost. Bit splitting combines splitting with encryption, so that no single location holds readable data. Dispersion improves availability and can improve confidentiality, but it complicates sanitization and makes jurisdiction harder to pin down, because fragments may sit in several data centers.",
   "Data flows describe how data moves between systems, services, regions and third parties. Drawing a data flow diagram shows you where data crosses trust boundaries, where it is encrypted or decrypted, which parties receive it and which countries it passes through. In the cloud, flows change quickly as teams add services, so keep the diagrams current and use them to decide where to place controls, what to log and which legal obligations, such as data residency requirements, apply."
  ],
  "terms": [
   [
    "Cloud data lifecycle",
    "The six phases data passes through: create, store, use, share, archive and destroy."
   ],
   [
    "Data dispersion",
    "Splitting data into fragments stored in different locations so it can be rebuilt even if some fragments are lost."
   ],
   [
    "Erasure coding",
    "A method of adding calculated redundancy to data fragments so the original can be reconstructed from a subset of them."
   ],
   [
    "Data flow diagram",
    "A drawing of how data moves between systems, users and parties, showing trust boundaries and processing points."
   ]
  ],
  "example": "A marketing team starts sending customer lists to a new analytics SaaS tool. The security architect updates the data flow diagram, notices the data now leaves the EU for processing, and triggers a review of the transfer mechanism and the tool's contract before the flow is approved.",
  "tip": "Classification belongs in the create phase. If a question asks when data should first be classified, choose create, not store or use.",
  "check": [
   [
    "Which lifecycle phase includes modifying existing data?",
    "Create; the CSA model treats new and modified content as created."
   ],
   [
    "What is one security drawback of data dispersion?",
    "It spreads fragments across locations, which complicates sanitization and jurisdiction."
   ],
   [
    "Why keep data flow diagrams current in the cloud?",
    "Services and integrations change quickly, and the diagram shows where data crosses trust and legal boundaries and where controls are needed."
   ]
  ]
 },
 {
  "t": "Cloud data storage architectures: storage types (ephemeral, raw, long-term, object, volume, database) and threats to storage",
  "body": [
   "Different cloud storage types behave differently, and each needs different controls. The CCSP exam uses the vocabulary of storage types, so learn what each one is and what can go wrong with it.",
   "Ephemeral storage is temporary space attached to a running instance; it disappears when the instance stops, so it must never hold the only copy of important data, and sensitive leftovers should not be assumed to be wiped unless the provider says so. Raw storage (raw device mapping) gives a virtual machine direct access to a physical storage device, bypassing the virtualization layer's file system. Volume storage (block storage) presents a virtual disk that is attached to one instance and formatted with a file system, much like a hard drive. Object storage keeps files as objects with metadata in flat containers called buckets, reached through web APIs; it is cheap and scalable, and it is also the storage type most often exposed by accidental public access settings. Database storage covers managed relational and non-relational databases in PaaS. Long-term storage is designed for archives and backups: very cheap, durable and slow to retrieve, which suits retention requirements.",
   "Service models also shape storage. IaaS customers mainly see volume and object storage. PaaS adds structured storage (databases) and unstructured storage (big data and file services). SaaS customers see information storage and management inside the application and content and file storage for documents.",
   "Threats to storage include unauthorized access through weak permissions or leaked keys, public exposure from misconfiguration, loss of availability during outages, accidental deletion, ransomware that encrypts or deletes data, data remnants left on shared media, jurisdictional exposure when data lands in the wrong region, and tampering. The standard countermeasures are least-privilege access policies, blocking public access by default, encryption with well-managed keys, versioning and immutable backups, replication, logging of access and regular configuration scanning."
  ],
  "terms": [
   [
    "Ephemeral storage",
    "Temporary storage tied to an instance's life that is lost when the instance stops or is terminated."
   ],
   [
    "Object storage",
    "Storage that keeps data as objects with metadata in buckets, accessed through APIs rather than a file system."
   ],
   [
    "Volume storage",
    "Block storage presented to a virtual machine as a virtual disk that the guest formats with a file system."
   ],
   [
    "Immutable backup",
    "A backup copy that cannot be changed or deleted for a set period, protecting it from ransomware and mistakes."
   ]
  ],
  "example": "A research lab stores images in an object storage bucket. A weekly configuration scan finds one bucket with a public read policy created for a conference demo. The team removes the public grant, turns on the account-wide block on public access and enables access logging so similar mistakes are caught quickly.",
  "tip": "If a question mentions buckets, metadata and API access, it is object storage. If it mentions data lost at reboot, it is ephemeral storage.",
  "check": [
   [
    "Which storage type is lost when an instance is terminated?",
    "Ephemeral storage."
   ],
   [
    "What storage type best suits seven-year retention of rarely accessed records?",
    "Long-term (archival) storage, which is cheap and durable but slow to retrieve."
   ],
   [
    "Name two countermeasures against ransomware in cloud storage.",
    "Versioning and immutable backups (also least privilege and replication to a separate account)."
   ]
  ]
 },
 {
  "t": "Data security technologies: encryption and key management, hashing, data obfuscation (masking, anonymization), tokenization",
  "body": [
   "Several technologies protect data by transforming it. The exam tests whether you choose the right one for the goal: keeping data secret but recoverable, proving it has not changed, hiding real values from people who do not need them, or removing sensitive values from a system entirely.",
   "Encryption turns readable data into ciphertext that only a key holder can reverse. Symmetric algorithms such as AES are fast and used for bulk data at rest and in transit; asymmetric algorithms such as RSA and elliptic-curve cryptography are used for key exchange and digital signatures. In the cloud, encryption can happen at the storage level, the database level, the application level or on the client before upload, and each level protects against different threats. Storage-level encryption stops someone reading a stolen disk, but it does nothing against an attacker who logs in to the application. Encryption is only as strong as its key management: keys must be generated securely, stored apart from data, rotated and destroyed when no longer needed.",
   "Hashing produces a fixed-length digest from input data using a one-way function such as SHA-256. It cannot be reversed, so it is used to check integrity and to store passwords (with a salt and a deliberately slow algorithm), not to protect data you need to read again. Data obfuscation hides real values. Masking replaces data with realistic but fake or partly hidden values, for example showing only the last four digits of a card. Static masking creates a permanently masked copy, often for test environments; dynamic masking hides values on the fly depending on who is looking. Anonymization removes or alters identifiers so that individuals can no longer be identified, while pseudonymization replaces identifiers with codes that can be linked back using separately held information. Only truly anonymized data falls outside privacy laws like the GDPR.",
   "Tokenization replaces a sensitive value, such as a card number, with a random token that has no mathematical relationship to it. The real value is kept in a separate, tightly secured token vault. Systems that handle only tokens are out of scope for much of the compliance burden, which is why tokenization is popular for PCI DSS."
  ],
  "terms": [
   [
    "Tokenization",
    "Replacing a sensitive value with a random surrogate, with the mapping held in a separate secured vault."
   ],
   [
    "Dynamic masking",
    "Hiding or altering data values at query time based on the user's role, without changing the stored data."
   ],
   [
    "Pseudonymization",
    "Replacing identifiers with codes that can be re-linked to the person using additional information kept separately."
   ],
   [
    "Salt",
    "Random data added to a password before hashing so that identical passwords produce different hashes."
   ]
  ],
  "example": "An online store sends card numbers to a payment tokenization service and stores only the returned tokens. Its order database, analytics platform and support tools never see real card numbers, which shrinks the part of the environment that PCI DSS assessors must examine.",
  "tip": "Tokens have no mathematical link to the original; encrypted values do and can be reversed with the key. If a question stresses reducing compliance scope, tokenization is usually the intended answer.",
  "check": [
   [
    "Why is hashing unsuitable for protecting data that must be read later?",
    "Hashing is one-way; the original cannot be recovered from the digest."
   ],
   [
    "What distinguishes anonymization from pseudonymization?",
    "Anonymized data cannot be linked back to a person; pseudonymized data can be re-identified using separately held information."
   ],
   [
    "Which masking type is best for creating a safe copy of production data for testing?",
    "Static masking, which produces a permanently masked copy."
   ]
  ]
 },
 {
  "t": "Data loss prevention (DLP) in the cloud",
  "body": [
   "Data loss prevention (DLP) is a set of tools and processes that find sensitive data and stop it from leaving approved places or being used in unapproved ways. In the cloud, data moves between SaaS apps, storage services, email and personal devices, so DLP has to follow data across many channels that the organization does not physically control.",
   "DLP works in three stages. Discovery and classification find sensitive content by pattern matching (for example card numbers or national ID formats), keywords, document fingerprints, exact data matching against a known dataset, or machine-learning classifiers. Monitoring watches data in motion, at rest and in use. Enforcement then applies policy: it can alert, block, quarantine, encrypt, remove a sharing link or ask the user to justify an action.",
   "Deployment location matters. Network DLP inspects traffic at the edge or through a proxy, but it sees nothing inside encrypted traffic unless TLS is inspected and nothing that never passes through the corporate network. Endpoint DLP runs on devices and can control copying to USB drives, printing and uploads. Storage or at-rest DLP scans repositories. Cloud-native and API-based DLP connects directly to SaaS and storage services, often through a cloud access security broker (CASB), and can scan files already stored in the cloud and fix bad sharing settings. Many organizations combine several of these.",
   "The main challenges are false positives that annoy users and lead to policies being switched off, encrypted data that DLP cannot read, the cost of inspecting large volumes, and the legal need to respect employee privacy while monitoring. A good program starts with classification, tunes policies in monitor-only mode first, involves data owners in deciding what to block and reviews incidents regularly. DLP supports, but never replaces, access control and encryption."
  ],
  "terms": [
   [
    "DLP",
    "Tools and processes that discover sensitive data, monitor its use and movement, and enforce policies to prevent unauthorized disclosure."
   ],
   [
    "Exact data matching",
    "A DLP technique that detects specific records from a known sensitive dataset rather than generic patterns."
   ],
   [
    "CASB",
    "A cloud access security broker that sits between users and cloud services to give visibility and enforce security policy, including DLP."
   ],
   [
    "Data in motion",
    "Data travelling across a network, such as uploads, email and API calls."
   ]
  ],
  "example": "A hospital's cloud DLP policy scans its SaaS file storage and finds spreadsheets with patient identifiers shared through public links. The tool automatically removes the public links, notifies the file owners and creates tickets for the privacy team, while email DLP starts blocking outbound messages that contain the same identifiers.",
  "tip": "DLP needs classification first; it cannot protect data it cannot recognize. When asked what to do before deploying DLP, choose discovering and classifying data.",
  "check": [
   [
    "Why can network DLP miss data leaving through a cloud app?",
    "The traffic may be encrypted or may never pass through the corporate network, for example from a remote laptop directly to the SaaS app."
   ],
   [
    "What are the three stages of DLP?",
    "Discovery and classification, monitoring, and enforcement."
   ],
   [
    "Why run a new DLP policy in monitor-only mode first?",
    "To measure and tune false positives before blocking disrupts legitimate work."
   ]
  ]
 },
 {
  "t": "Keys, secrets and certificates management: KMS, HSM, BYOK and HYOK",
  "body": [
   "Keys, secrets and certificates are the credentials that everything else depends on. An encryption key opens data, a secret such as an API key or database password opens a system, and a certificate proves an identity and enables TLS. The CCSP outline names their management explicitly because mistakes here undo every other control.",
   "Cloud providers offer a key management service (KMS) that creates, stores and controls keys, usually backed by hardware security modules (HSMs). An HSM is tamper-resistant hardware that generates and uses keys without ever exposing them in plain form. Most KMS designs use envelope encryption: a data encryption key encrypts the data, and a key encryption key held in the KMS encrypts the data key. Access to use a key is itself controlled by IAM policy and logged, which gives you an audit trail of every decryption.",
   "The ownership options form a spectrum. Provider-managed keys are simplest, but the provider controls them. Customer-managed keys stay in the provider's KMS while the customer controls policies, rotation and deletion. Bring your own key (BYOK) means the customer generates keys in its own HSM and imports them into the provider's KMS, proving where they came from and allowing them to be revoked, although the provider's service still uses them. Hold your own key (HYOK), sometimes called external key management, keeps keys entirely outside the provider in the customer's own HSM or key service; the provider must call out to it for each use. HYOK gives the most control and separation but adds latency and outage risk, and some cloud features stop working without provider access to keys. A dedicated cloud HSM service is another option when regulations demand single-tenant, validated hardware.",
   "Secrets belong in a secrets manager, never in source code, images or plain configuration files. Good practice includes automatic rotation, short-lived credentials issued at runtime, and scanning code repositories for leaked secrets. Certificates need an inventory, automated renewal and monitoring of expiry dates, because an expired certificate causes outages and a stolen private key allows impersonation."
  ],
  "terms": [
   [
    "HSM",
    "A tamper-resistant hardware device that securely generates, stores and uses cryptographic keys."
   ],
   [
    "Envelope encryption",
    "Encrypting data with a data key and then encrypting that data key with a master key held in a key management service."
   ],
   [
    "BYOK",
    "Bring your own key: the customer generates keys in its own environment and imports them into the provider's key service."
   ],
   [
    "HYOK",
    "Hold your own key: keys stay in the customer's own key service outside the provider and are used remotely when needed."
   ]
  ],
  "example": "A bank's regulator requires that the cloud provider can never decrypt certain records on its own. The bank uses external key management so that the key for those records lives in its own HSM; if the bank revokes access, the provider's service can no longer decrypt the data at all.",
  "tip": "BYOK imports the customer's key into the provider; HYOK keeps the key outside the provider. When the question stresses that the provider must never hold the key, choose HYOK or external key management.",
  "check": [
   [
    "What is the benefit of envelope encryption?",
    "Large data is encrypted with fast data keys, while only the small data keys need protection by the master key in the KMS, which also simplifies rotation."
   ],
   [
    "Where should application secrets be stored?",
    "In a secrets manager with access control, rotation and logging, never in code or images."
   ],
   [
    "What is a drawback of HYOK?",
    "Extra latency and dependency: if the customer's key service is unavailable, the cloud service cannot decrypt data, and some features may not work."
   ]
  ]
 },
 {
  "t": "Data discovery: structured, semi-structured and unstructured data, and data location",
  "body": [
   "You cannot protect data you do not know you have. Data discovery is the process of finding where data is stored, what kind it is and how sensitive it is. In the cloud this is hard because teams can create new storage in minutes, copy data between regions and connect SaaS tools without telling anyone.",
   "The type of data shapes the discovery method. Structured data lives in rows and columns with a defined schema, as in a relational database; you can discover sensitive fields by reading the schema, column names and samples, and tools can label entire columns. Semi-structured data has tags or keys but no fixed schema, for example JSON documents, XML, email headers or log files; discovery tools parse the keys and values. Unstructured data has no internal model at all: documents, images, audio, chat messages and free-text notes. It is the largest and hardest category, and discovery depends on content inspection such as pattern matching, keyword lists, optical character recognition and machine-learning classifiers. Discovery approaches are often grouped as metadata-based (looking at names, tags and properties), label-based (reading existing classification labels) and content-based (inspecting the data itself).",
   "Data location is part of discovery. Laws and contracts may require that some data stays in a particular country or region (data residency) or is only processed under certain legal safeguards. Discovery should therefore record the region of each store, the backups and replicas, and the countries from which administrators and support staff can access it. Remember that copies spread: snapshots, logs, analytics exports, test environments and AI training sets often contain the same sensitive data as the production database.",
   "Make discovery continuous rather than a one-time project. Cloud-native discovery services and data security posture management tools can scan accounts on a schedule, flag new stores of sensitive data and feed results into classification, DLP and risk reporting."
  ],
  "terms": [
   [
    "Structured data",
    "Data organized in a defined schema of rows and columns, such as a relational database table."
   ],
   [
    "Semi-structured data",
    "Data with tags or keys but no fixed schema, such as JSON, XML or log records."
   ],
   [
    "Unstructured data",
    "Data without a predefined model, such as documents, images, audio and free text."
   ],
   [
    "Data residency",
    "A requirement that data be stored, and sometimes processed, within a specific geographic location."
   ]
  ],
  "example": "A discovery scan of an insurer's cloud accounts finds customer medical notes in a forgotten analytics bucket in a region outside the country where the law requires them to stay. The team moves the data, deletes the stale copy and adds a policy that blocks creating storage in unapproved regions.",
  "tip": "Unstructured data is the hardest to discover and classify because there is no schema to read; content inspection is needed.",
  "check": [
   [
    "Is a JSON log file structured, semi-structured or unstructured?",
    "Semi-structured: it has keys and values but no fixed schema."
   ],
   [
    "Why must data discovery include backups and replicas?",
    "Copies contain the same sensitive data and may sit in other regions or accounts with weaker controls."
   ],
   [
    "Name the three broad discovery approaches.",
    "Metadata-based, label-based and content-based discovery."
   ]
  ]
 },
 {
  "t": "Data classification: policies, data mapping and data labeling",
  "body": [
   "Data classification assigns each piece of data a category based on its sensitivity, value and legal requirements, so that the organization can apply the right level of protection without over-protecting everything. Discovery tells you where data is; classification tells you how much it matters.",
   "A classification policy is written and approved by management. It defines a small number of levels, commonly something like public, internal, confidential and restricted, with clear criteria for each, and it names who decides: the data owner, a business role accountable for the data, not the IT team. The policy links each level to handling rules for storage, transmission, sharing, retention and disposal. Criteria usually include the damage from disclosure, legal and regulatory obligations such as privacy or payment card rules, contractual commitments, and the data's value to the business. Too many levels confuse people; too few force everything into the highest bucket.",
   "Data mapping records how data elements in one system correspond to those in another, and where each category of data lives and flows. When data moves between clouds or applications, mapping makes sure that a field marked restricted in the source is still treated as restricted in the destination, and it supports privacy duties such as answering requests from individuals about their data. A data map or record of processing is also something regulators may ask to see.",
   "Labeling puts the classification where tools and people can see it. Labels can be visible markings in a document header, metadata tags on files and objects, resource tags on cloud storage, or column-level tags in a database. Machine-readable labels let DLP, rights management, encryption policies and access rules act automatically. Labels must travel with the data when it is copied or exported, and classification should be reviewed over time, because data can become less sensitive, such as a product launch plan after launch, or more sensitive when combined with other data."
  ],
  "terms": [
   [
    "Data classification",
    "Categorizing data by sensitivity, value and legal requirements to determine how it must be protected."
   ],
   [
    "Data owner",
    "The business role accountable for a data set, including deciding its classification and who may access it."
   ],
   [
    "Data mapping",
    "Documenting how data elements correspond between systems and where each category of data is stored and flows."
   ],
   [
    "Data label",
    "A visible or machine-readable marker that records a data item's classification."
   ]
  ],
  "example": "A manufacturer tags every storage bucket with a classification label. A policy engine then enforces rules automatically: buckets tagged restricted must use customer-managed keys, cannot be public and must send access logs to the security account, and any bucket without a tag is flagged for its owner to classify.",
  "tip": "The data owner, not the custodian or IT, decides classification. If an answer has IT or the provider choosing classification levels, it is wrong.",
  "check": [
   [
    "Who should decide the classification of a customer database?",
    "The data owner, the business role accountable for that data."
   ],
   [
    "Why are machine-readable labels useful in the cloud?",
    "They let DLP, encryption and access policies act automatically on data according to its classification."
   ],
   [
    "Why should classification be reviewed periodically?",
    "Sensitivity changes over time, for example when information becomes public or when data sets are combined."
   ]
  ]
 },
 {
  "t": "Information rights management (IRM): objectives, provisioning, access models and tools",
  "body": [
   "Information rights management (IRM), also called digital rights management in some contexts, protects a file itself rather than the place where it is stored. The protection travels with the document when it is emailed, downloaded or copied to another cloud, which makes IRM valuable once data leaves systems you control.",
   "IRM works by encrypting the content and attaching a policy that says who may open it and what they may do: view, edit, print, copy, forward or save. When a user tries to open the file, the IRM client contacts a policy server, checks the user's identity and rights, and only then provides a key to decrypt the content. The CCSP objectives describe the goals of IRM as persistent protection that follows the data, dynamic policy control so the owner can change or revoke rights after distribution, automatic expiration after a set date, a continuous audit trail of who accessed the content, and interoperability with the systems and devices people use.",
   "Provisioning means getting users and their rights into the IRM system. Rights are usually assigned through groups in the corporate directory, and access to protected content depends on the user authenticating to that directory or a federated identity provider. That makes IRM hard to use with outside parties unless they are federated or given guest identities. Access models vary: some products require a specific client application or plug-in, others work in a browser. IRM tools are often built into productivity suites and document platforms, and some integrate with classification labels so that a document labeled confidential is protected automatically.",
   "IRM has limits you should know. A user who can view a document can still photograph the screen. Every device needs a compatible client, which can block mobile or partner use. Key and policy servers become critical dependencies. And if the owner leaves without a successor, rights may become hard to manage. IRM is strongest for high-value documents shared outside the organization."
  ],
  "terms": [
   [
    "IRM",
    "Information rights management: encrypting content and attaching usage policies that are enforced wherever the file goes."
   ],
   [
    "Persistent protection",
    "Protection that stays with the data itself regardless of where it is stored or sent."
   ],
   [
    "Dynamic policy control",
    "The ability of the owner to change or revoke usage rights after the content has been distributed."
   ],
   [
    "Automatic expiration",
    "An IRM feature that stops protected content from being opened after a set date or period."
   ]
  ],
  "example": "A biotech company shares a confidential study with a partner university. The files are IRM-protected so the partner's researchers can view but not print or forward them, access expires when the collaboration ends, and when one researcher leaves the project the company revokes his rights, locking him out of copies he already downloaded.",
  "tip": "IRM's distinctive feature is that control continues after the data leaves your systems. If a question asks how to revoke access to a document already sent outside, IRM is the answer, not DLP or storage permissions.",
  "check": [
   [
    "Name three objectives of IRM.",
    "Any three of: persistent protection, dynamic policy control, automatic expiration, continuous auditing and interoperability."
   ],
   [
    "Why is IRM harder to use with external partners?",
    "Users must authenticate to obtain keys, so partners need federated or guest identities and compatible clients."
   ],
   [
    "What can IRM not prevent?",
    "Analog capture, such as photographing or retyping content that the user is allowed to view."
   ]
  ]
 },
 {
  "t": "Data retention, deletion and archiving policies, including legal hold and crypto-shredding",
  "body": [
   "Keeping data too long creates risk and cost; deleting it too soon can break the law. Retention, deletion and archiving policies set the rules in between, and the cloud adds its own challenges: many copies in many services, storage that is cheap enough to tempt people to keep everything, and the inability to physically destroy the provider's media.",
   "A retention policy states how long each category of data must be kept and why. It is driven by laws and regulations (tax, employment, health and financial record rules), contracts and business need. It names the retention period, the format and storage location, how the data remains accessible and readable for the whole period, and what happens at the end. Retention applies to backups, logs and archives too, not only to the live system. Privacy laws such as the GDPR add the opposite pressure through storage limitation: personal data should not be kept longer than the purpose requires.",
   "Archiving moves inactive data to cheaper long-term storage while keeping it retrievable. An archiving policy should cover the storage class, encryption and the keys needed to read the data years later, the format (can you still open it in ten years?), retrieval time, integrity checks and periodic restore tests. Deletion policy then covers how data is removed at the end of retention. In the cloud, the dependable method is crypto-shredding: encrypt data with keys you control and destroy the keys, which makes all copies unreadable, including those in replicas and on media you will never see. Overwriting is possible for some storage but cannot be verified across a provider's infrastructure.",
   "A legal hold, sometimes called a litigation hold, suspends normal deletion for data that may be relevant to a lawsuit, investigation or audit. Once the organization reasonably anticipates litigation, it must preserve relevant data even if the retention period has expired. Cloud services provide hold features that stop users and automated lifecycle rules from deleting the covered items. Deleting data under a hold can lead to court sanctions, so holds override retention schedules until legal counsel releases them."
  ],
  "terms": [
   [
    "Retention period",
    "The length of time a category of data must be kept to meet legal, regulatory, contractual or business requirements."
   ],
   [
    "Legal hold",
    "An instruction to preserve data relevant to anticipated or actual litigation, overriding normal deletion."
   ],
   [
    "Storage limitation",
    "The privacy principle that personal data should be kept no longer than necessary for its purpose."
   ],
   [
    "Archiving",
    "Moving inactive data to long-term storage where it stays protected and retrievable for its retention period."
   ]
  ],
  "example": "A lifecycle rule deletes chat messages after two years. When the company learns it is being sued by a former supplier, legal counsel places a hold on the mailboxes and chats of the procurement team, and the cloud platform stops deleting those items until counsel releases the hold months later.",
  "tip": "Legal hold overrides the retention schedule. If a question asks what to do with data under hold whose retention period has ended, the answer is to preserve it.",
  "check": [
   [
    "Why is crypto-shredding the preferred deletion method in the public cloud?",
    "The customer cannot physically destroy or verify overwriting of the provider's shared media, but destroying the keys makes every copy unreadable."
   ],
   [
    "What should an archiving policy say about encryption keys?",
    "That the keys needed to decrypt archives are retained and protected for the whole retention period."
   ],
   [
    "When does the duty to preserve data under a legal hold begin?",
    "When litigation is reasonably anticipated, not only when a lawsuit is filed."
   ]
  ]
 },
 {
  "t": "Auditability, traceability and accountability of data events",
  "body": [
   "When something goes wrong with data, you need to answer who did what, to which data, when, from where and with what result. Auditability, traceability and accountability describe the ability to answer those questions reliably, and they depend on collecting the right events, protecting them and being able to link them to real identities.",
   "Start by defining event sources. In the cloud these include management plane activity logs (who created, changed or deleted resources), data access logs from storage and databases (who read or wrote objects), identity provider logs (sign-ins, MFA, token issuance), key management logs (every use of a key), application logs and network flow logs. Many data access logs are off by default because of their volume and cost, so the customer must decide to enable them. Useful events record the user or service identity, a timestamp from a synchronized clock, the source address, the action, the target object and whether it succeeded.",
   "Identity attribution is what turns logs into accountability. Shared accounts and long-lived access keys make it impossible to prove which person acted, so every human should use a personal identity, ideally federated with single sign-on, and automated workloads should use distinct service identities. When a user assumes a role, the log should still show the original identity behind the session. Without attribution, non-repudiation fails: a person can credibly deny an action.",
   "Logs must be stored so they are trustworthy as evidence. Send them to a separate, locked-down account or a SIEM, use write-once or immutable storage, check integrity with hashes or digital signatures, restrict who can read them (logs often contain sensitive data), and keep them for the period required by policy and law. Chain of custody applies when logs are used in an investigation. Finally, someone has to look: logs that nobody reviews give an audit trail but no protection."
  ],
  "terms": [
   [
    "Auditability",
    "The ability to review a complete, reliable record of events to verify what happened."
   ],
   [
    "Traceability",
    "The ability to follow an action or data item through systems back to its origin and actor."
   ],
   [
    "Non-repudiation",
    "Assurance that someone cannot credibly deny having performed an action."
   ],
   [
    "Identity attribution",
    "Linking each logged action to a specific, unique person or service identity."
   ]
  ],
  "example": "An investigation finds that a customer file was downloaded from object storage at 2 a.m. Because data access logging was enabled, federated identities were used and logs were shipped to an immutable security account, the team can show which employee's session downloaded it, from which address, and that the logs were not altered.",
  "tip": "Shared accounts destroy accountability. If a question asks how to improve traceability, look for unique identities, synchronized time and protected, centrally stored logs.",
  "check": [
   [
    "Why must clocks be synchronized across log sources?",
    "So that events from different systems can be put in the correct order and correlated reliably."
   ],
   [
    "Why store logs in a separate account with immutable storage?",
    "So that an attacker or insider who compromises the workload cannot alter or delete the evidence."
   ],
   [
    "Which cloud logs are often disabled by default and must be turned on?",
    "Data access logs, such as object-level read and write events in storage services."
   ]
  ]
 },
 {
  "t": "Protecting AI and ML data: training data integrity, data poisoning, model and prompt security",
  "body": [
   "The 2026 CCSP outline adds a subdomain on protecting the data used by artificial intelligence and machine learning systems. An AI system is only as trustworthy as the data it learns from and the inputs it receives, and those data sets often combine sensitive records from many sources in cloud storage.",
   "Training data integrity comes first. If an attacker or a careless process can change training data, the model learns the wrong lessons. Data poisoning inserts crafted records so that the model misclassifies certain inputs, sometimes only when a hidden trigger is present, which is called a backdoor. Defenses are familiar data security controls applied to a new asset: restrict write access to training data and pipelines, record where every data set came from (data provenance), validate and clean data before training, keep versioned and hashed copies so you can detect changes and roll back, and review data from external or user-generated sources with extra care.",
   "Training data also creates confidentiality and privacy risk. Models can memorize and later reveal fragments of their training data, and attacks such as membership inference can show whether a person's record was used. Minimize personal data before training, apply masking, pseudonymization or synthetic data where possible, respect the purpose for which data was collected, and apply the same classification and residency rules to training sets, embeddings and vector databases as to the source data.",
   "Models and prompts are data assets too. Model files and weights should be stored in access-controlled registries, signed or hashed so tampering is detectable, and encrypted at rest. Prompts and retrieved context can carry confidential data into a model and can carry attacks: indirect prompt injection hides instructions in a document or web page that the model later reads. Controls include filtering and labeling untrusted content, limiting what data a retrieval system can reach based on the user's own permissions, logging prompts and outputs, and treating model output as untrusted input to other systems."
  ],
  "terms": [
   [
    "Data provenance",
    "A record of where data came from and how it has been changed, used to establish trust in it."
   ],
   [
    "Backdoor (in ML)",
    "Hidden behavior planted in a model through poisoned training data that activates on a specific trigger."
   ],
   [
    "Membership inference",
    "An attack that determines whether a particular record was part of a model's training data."
   ],
   [
    "Indirect prompt injection",
    "Malicious instructions hidden in content, such as a web page or document, that an AI system reads and follows."
   ]
  ],
  "example": "A company builds an internal assistant that answers questions from its document store. To stop it revealing salary files to everyone, the retrieval layer runs each search with the asking employee's own permissions, so the model only sees documents that employee could already open.",
  "tip": "Most AI data protection answers are ordinary data security controls (access control, integrity checks, classification, encryption, logging) applied to training data, models and prompts. Pick the answer that protects integrity when the scenario is poisoning.",
  "check": [
   [
    "What is data poisoning?",
    "Deliberately inserting or altering training data so that a model learns wrong or malicious behavior."
   ],
   [
    "How can versioned, hashed training data sets help?",
    "They make unauthorized changes detectable and let you roll back to a known-good version."
   ],
   [
    "Why should a retrieval-augmented assistant use the user's own permissions when fetching documents?",
    "So the model cannot expose documents the user is not already authorized to see."
   ]
  ]
 },
 {
  "t": "Cloud infrastructure components: physical environment, network and communications, compute, virtualization, storage and management plane",
  "body": [
   "Domain 3 looks underneath the services at the infrastructure that makes them work. Even if you only ever rent SaaS, understanding these components helps you ask providers the right questions and judge the evidence they give you.",
   "The physical environment is the data center: buildings, power, cooling, fire suppression and physical access control. Providers run many data centers grouped into regions and availability zones, which are separate facilities with independent power and networking so that one failure does not take down everything. Network and communications cover the physical links, switches and routers, and the software-defined networking (SDN) layer that lets customers create isolated virtual networks on shared hardware. SDN separates the control plane, which decides where traffic should go, from the data plane, which forwards it, so networks can be programmed through APIs.",
   "Compute is the processors and memory that run workloads, delivered as virtual machines, containers or functions. Virtualization is the layer that makes pooling possible: a hypervisor divides physical hosts into many isolated virtual machines. Storage is provided as block volumes, object stores, file shares and databases, usually replicated across devices and facilities for durability. The management plane is the set of consoles, APIs and command-line tools that control all of the above. It is what makes the cloud self-service, and it is also the most powerful target, because anyone who controls it can create, change, copy or delete resources at scale.",
   "For the customer, the security questions are about visibility and verification. You cannot tour most provider data centers, so you rely on audit reports for the physical layer. You control your own virtual networks, compute configuration, storage settings and management plane identities, and those are where most incidents begin. For the provider, the key duty is isolation: keeping tenants separate at every layer, from the hypervisor to the network to the storage system."
  ],
  "terms": [
   [
    "Availability zone",
    "One or more physically separate data centers within a region, with independent power, cooling and networking."
   ],
   [
    "Software-defined networking (SDN)",
    "Networking in which a software controller manages traffic decisions separately from the hardware that forwards packets."
   ],
   [
    "Control plane vs data plane",
    "The control plane decides how traffic or resources are managed; the data plane carries out the actual forwarding or processing."
   ],
   [
    "Region",
    "A geographic area containing multiple availability zones operated by a cloud provider."
   ]
  ],
  "example": "A payments firm deploys its application across three availability zones in one region. When a power failure takes one zone offline, load balancers route traffic to the other two, and customers see no outage, because the design assumed any single facility could fail.",
  "tip": "The management plane is the highest-value target in the cloud; questions about protecting it point to strong MFA, least privilege, separate administrative identities and logging of every API call.",
  "check": [
   [
    "Why does a provider separate facilities into availability zones?",
    "So a failure in one facility (power, cooling, network) does not affect workloads running in the others."
   ],
   [
    "What does SDN separate?",
    "The control plane, which makes forwarding decisions, from the data plane, which forwards traffic."
   ],
   [
    "Which layer can a customer typically not inspect directly, and how is it assured?",
    "The physical data center layer; it is assured through third-party audit reports and certifications."
   ]
  ]
 },
 {
  "t": "Secure data center design: logical design, physical design, environmental design and tier levels",
  "body": [
   "Whether you build a private cloud or evaluate a provider, you should know what a secure data center looks like. The CCSP outline divides design into logical, physical and environmental aspects and uses the Uptime Institute tier classification to talk about resilience.",
   "Logical design covers how tenants and functions are separated inside shared infrastructure: tenant partitioning, separate networks for management, storage and customer traffic, access control for administrators, and secure remote management. A good logical design means one tenant's compromise or misconfiguration cannot reach another tenant or the management network. Physical design covers the site and building: location away from flood plains, flight paths and other hazards, setbacks and barriers, a limited number of entry points, layered access control with mantraps and badge plus biometric checks, video surveillance, and secure delivery and media destruction areas. You also think about whether to build your own facility or use space in a shared colocation site.",
   "Environmental design keeps equipment running within safe limits. It includes redundant utility feeds, uninterruptible power supplies (UPS) and generators with fuel contracts; heating, ventilation and air conditioning (HVAC) with hot aisle and cold aisle containment; temperature and humidity monitoring; fire detection and suppression suited to electronics; and multiple diverse network carriers entering the building by different paths.",
   "The Uptime Institute defines four tiers. Tier I has basic capacity with single paths and no redundancy, so maintenance requires shutdown. Tier II adds redundant capacity components such as extra generators or chillers, but still has a single distribution path. Tier III is concurrently maintainable: there are multiple distribution paths so any component can be taken out for planned maintenance without shutting down IT equipment. Tier IV is fault tolerant: it can withstand any single unplanned failure without affecting IT operations, with compartmentalized, fully redundant systems. Higher tiers cost more, so match the tier to the availability the business actually needs."
  ],
  "terms": [
   [
    "Concurrently maintainable",
    "Tier III property: any component can be removed for planned maintenance without shutting down IT equipment."
   ],
   [
    "Fault tolerant",
    "Tier IV property: the facility continues operating through any single unplanned component failure."
   ],
   [
    "Mantrap",
    "An entry area with two interlocking doors that allows only one authenticated person through at a time."
   ],
   [
    "Hot aisle/cold aisle containment",
    "Arranging server racks so cool intake air and hot exhaust air are kept separate, improving cooling efficiency."
   ]
  ],
  "example": "A regional bank building a private cloud compares a Tier II colocation site with a Tier III site. Because its core banking system cannot be shut down for maintenance windows, it chooses the Tier III site, which allows planned work on power and cooling without downtime, and accepts the higher monthly cost.",
  "tip": "Remember the key word for each tier: I basic, II redundant components, III concurrently maintainable, IV fault tolerant.",
  "check": [
   [
    "Which tier is the lowest that allows planned maintenance without downtime?",
    "Tier III, which is concurrently maintainable."
   ],
   [
    "Give two elements of good logical design in a multitenant data center.",
    "Tenant partitioning and separate management networks (also restricted administrator access and secure remote management)."
   ],
   [
    "Why should network carriers enter the building by different paths?",
    "So a single cable cut or construction accident cannot sever all connectivity."
   ]
  ]
 },
 {
  "t": "Analyzing risks to cloud infrastructure and platforms: virtualization risks, countermeasures and threats",
  "body": [
   "Risk analysis for cloud infrastructure follows the usual steps: identify assets, threats and vulnerabilities, estimate likelihood and impact, then choose countermeasures. What changes is the list of threats, because shared, virtualized, API-driven infrastructure has weaknesses that a single-tenant server room does not.",
   "Virtualization brings specific risks. A flaw in the hypervisor could let code in one virtual machine break out and reach the host or other guests, called VM escape. Side-channel attacks can leak data between tenants that share physical processors or caches. VM sprawl, the uncontrolled growth of virtual machines, leaves unpatched and unowned systems running. Snapshots and images may contain secrets or sensitive data and can be copied far more easily than a physical disk. Dormant images that are powered on later may have missed months of patches.",
   "Broader cloud infrastructure threats include misconfiguration, which is the most common cause of cloud breaches; compromise of management plane credentials or access keys; insecure interfaces and APIs; insider threats at the customer or provider; denial of service, including attacks that simply drive up your bill; loss of data or availability during provider outages; and legal risks such as data being seized or held under a foreign jurisdiction. Resources abandoned by projects, such as old storage or DNS records pointing to deleted services, create openings too.",
   "Countermeasures come from both sides of the shared responsibility model. The provider hardens and patches hypervisors, isolates tenants, and offers features such as dedicated hosts for workloads that must not share hardware. The customer uses least privilege and MFA for the management plane, infrastructure as code with policy checks to prevent misconfiguration, continuous configuration scanning (often called cloud security posture management), tagging and lifecycle rules to control sprawl, encrypted snapshots, patched golden images, network segmentation, and logging and monitoring of API activity. Document the results in a risk register and decide for each risk whether to mitigate, transfer, avoid or accept it."
  ],
  "terms": [
   [
    "VM escape",
    "An attack in which code running inside a virtual machine breaks out to interact with the hypervisor, host or other VMs."
   ],
   [
    "VM sprawl",
    "Uncontrolled growth of virtual machines, leaving unmanaged, unpatched systems running."
   ],
   [
    "Side-channel attack",
    "An attack that infers secret data from physical effects such as timing, cache behavior or power use rather than from a direct flaw."
   ],
   [
    "Cloud security posture management (CSPM)",
    "Tools that continuously check cloud configurations against policies and best practices and report or fix deviations."
   ]
  ],
  "example": "A risk review for a genomics platform identifies VM sprawl as a high risk: researchers had launched hundreds of instances, many with no owner. The team introduces mandatory owner tags, a policy that stops untagged instances after 24 hours and a monthly report of idle machines, reducing unpatched exposure sharply.",
  "tip": "When a scenario asks for the most common cause of cloud data exposure, choose misconfiguration by the customer, not an exotic hypervisor attack.",
  "check": [
   [
    "What is VM escape and whose responsibility is the main defense?",
    "Breaking out of a VM to the hypervisor or other VMs; the provider patches and hardens the hypervisor."
   ],
   [
    "Why are VM snapshots a data security risk?",
    "They can contain sensitive data and secrets and are easy to copy or share."
   ],
   [
    "What does CSPM do?",
    "It continuously compares cloud configurations against policies and best practices to detect and fix misconfigurations."
   ]
  ]
 },
 {
  "t": "Security controls: physical and environmental protection, system and communication protection, identification and authentication",
  "body": [
   "The CCSP outline asks you to design and plan security controls for cloud infrastructure in several families. Knowing which party implements each control, and how the customer gets evidence about the provider's part, is as important as knowing the controls themselves.",
   "Physical and environmental protection covers the data center and anything else physical: perimeter security, guards, badge and biometric access, visitor logs, cameras, secure disposal of drives, and the power, cooling and fire controls that protect availability. In public cloud these are the provider's controls, verified through SOC 2 reports, ISO/IEC 27001 certificates and similar evidence. They still matter to the customer for its own offices, network closets and administrator workstations, which are part of the attack surface for the cloud environment.",
   "System and communication protection covers how systems and the data flowing between them are protected. It includes encrypting data in transit with TLS or VPNs, segmenting networks, filtering traffic with firewalls and security groups, protecting against denial of service, isolating tenants and workloads, hardening operating systems, and protecting cryptographic keys. The NIST SP 800-53 control catalog groups many of these into its system and communications protection (SC) family, which is a useful reference when building a baseline.",
   "Identification and authentication controls make sure every user, administrator, device and service is uniquely identified and proves its identity before access. In the cloud this means federating with a central identity provider, enforcing MFA, preferring phishing-resistant methods for administrators, eliminating shared accounts, replacing long-lived access keys with short-lived tokens or workload identities, and managing the full account lifecycle. Audit mechanisms that record who did what tie these control families together. Aim for defense in depth: if one layer fails, another still stands between the attacker and the data."
  ],
  "terms": [
   [
    "Security control",
    "A safeguard or countermeasure that avoids, detects, counteracts or reduces a security risk."
   ],
   [
    "Defense in depth",
    "Using multiple independent layers of controls so that failure of one does not expose the asset."
   ],
   [
    "Workload identity",
    "An identity assigned to an application or service so it can authenticate without stored static credentials."
   ],
   [
    "Phishing-resistant MFA",
    "Authentication, such as FIDO2 security keys or passkeys, that cannot be captured and replayed by a fake login page."
   ]
  ],
  "example": "A health insurer designing its cloud landing zone maps each control family to an owner. Physical protection is inherited from the provider and evidenced by its SOC 2 Type II report. Network segmentation and TLS are implemented by the platform team. Identification and authentication use federated single sign-on with security keys for every administrator.",
  "tip": "Physical controls in a public cloud are inherited from the provider; the customer's job is to verify them through audit reports, not to implement them.",
  "check": [
   [
    "How does a public cloud customer gain assurance about physical security?",
    "By reviewing the provider's independent audit reports and certifications such as SOC 2 Type II and ISO/IEC 27001."
   ],
   [
    "Name two system and communication protection controls.",
    "Examples: TLS or VPN encryption in transit, network segmentation, security groups, DDoS protection, tenant isolation."
   ],
   [
    "Why replace long-lived access keys with short-lived tokens?",
    "Stolen long-lived keys work until someone notices; short-lived tokens expire quickly and reduce the damage from theft."
   ]
  ]
 },
 {
  "t": "Securing the management plane and hypervisors: type 1 vs type 2, VM escape and isolation",
  "body": [
   "The hypervisor and the management plane are the two components that, if compromised, expose everything above them. The exam expects you to know the hypervisor types, why isolation matters and how both the provider and the customer protect administrative access.",
   "A type 1 hypervisor, also called bare metal, runs directly on the physical hardware with no general-purpose operating system underneath. It has a small attack surface and high performance, which is why cloud providers use type 1 designs. A type 2 hypervisor, also called hosted, runs as an application on top of a normal operating system, such as desktop virtualization software on a laptop. It is convenient for testing but inherits every vulnerability of the host operating system, so it is not suitable for multitenant clouds.",
   "Isolation is the hypervisor's security promise: each virtual machine should see only its own memory, storage and network traffic. VM escape breaks that promise, and it is rare but severe. Providers reduce the risk by keeping hypervisors minimal, patching them quickly, using hardware virtualization features, and sometimes offloading networking and storage to dedicated hardware so the host has less code to attack. Customers with strict requirements can choose dedicated or isolated hosts so their workloads never share hardware with other tenants, or confidential computing so memory is encrypted even from the host.",
   "The management plane includes the web console, the APIs and the command-line tools that manage cloud resources. Protecting it is mostly the customer's job for its own account. Use a small number of administrators, enforce phishing-resistant MFA, avoid using the root or owner account for daily work and lock its credentials away, give administrators separate privileged identities, grant just-in-time elevation instead of standing privileges, restrict console and API access by network or device where possible, and log every management action to a protected location. Break-glass accounts for emergencies should exist, be tightly controlled and trigger alerts whenever they are used."
  ],
  "terms": [
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor that runs directly on hardware, used by cloud providers for its small attack surface."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on a general-purpose operating system."
   ],
   [
    "Break-glass account",
    "An emergency administrative account kept locked away and used only when normal access fails, with every use alerted and reviewed."
   ],
   [
    "Just-in-time access",
    "Granting elevated privileges only when needed and for a limited time, rather than permanently."
   ]
  ],
  "example": "A retailer finds that eight engineers log in daily with its cloud account's root credentials. It moves all daily work to federated administrator roles with MFA and time-limited elevation, stores the root credentials with a hardware key in a safe, and sets an alert that pages the security team whenever the root account signs in.",
  "tip": "Type 1 runs on bare metal and is used in the cloud; type 2 runs on a host operating system. If a question asks which is more secure for multitenancy, choose type 1.",
  "check": [
   [
    "Why are type 1 hypervisors preferred for cloud providers?",
    "They run directly on hardware with a smaller attack surface and better performance than hosted hypervisors."
   ],
   [
    "What can a customer do if a workload must not share physical hardware with other tenants?",
    "Use dedicated or isolated hosts (or confidential computing to protect memory from the host)."
   ],
   [
    "How should the cloud account's root or owner credentials be handled?",
    "Not used for daily work; protected with strong MFA, stored securely, and monitored with alerts on every use."
   ]
  ]
 },
 {
  "t": "Network security in the cloud: virtual networks, security groups, microsegmentation, zero trust and VPNs",
  "body": [
   "Cloud networks are built from software, so they can be secured precisely, and they can also be exposed with a single wrong setting. The CCSP exam expects you to know the main building blocks and how they fit together into a layered design.",
   "A virtual network, often called a virtual private cloud (VPC) or virtual network (VNet), is an isolated address space inside the provider's network. You divide it into subnets, typically public subnets for load balancers and private subnets for application servers and databases that should never be reachable from the internet. Route tables decide where traffic goes, and gateways connect the network to the internet, to other networks or to on-premises sites. Private endpoints let workloads reach provider services such as storage without traversing the public internet.",
   "Two filtering tools work at different levels. Security groups act like a stateful firewall attached to each instance or network interface: they allow specified traffic, and return traffic is automatically permitted. Network access control lists (NACLs) apply to whole subnets, are usually stateless, so both directions must be allowed explicitly, and can include deny rules. Microsegmentation pushes filtering down to individual workloads, so that even servers in the same subnet can only talk to the specific peers they need. That limits lateral movement after a breach.",
   "Zero trust is the design philosophy that ties this together: never trust a request because of where it comes from on the network; verify identity, device health and context for every access, grant least privilege and assume breach. Network location becomes one signal among many rather than a gate. VPNs remain useful for encrypted site-to-site links between on-premises networks and the cloud and for some remote administration, though many organizations now replace user VPNs with zero trust network access that checks each application request. Web application firewalls and DDoS protection services defend internet-facing applications, and flow logs record traffic for detection and investigation."
  ],
  "terms": [
   [
    "Security group",
    "A stateful virtual firewall attached to an instance or interface that allows specified traffic and automatically permits responses."
   ],
   [
    "Network ACL",
    "A usually stateless subnet-level filter with ordered allow and deny rules for inbound and outbound traffic."
   ],
   [
    "Microsegmentation",
    "Fine-grained network policy that restricts communication between individual workloads to only what is required."
   ],
   [
    "Zero trust",
    "A security model that grants access based on continuous verification of identity and context rather than network location."
   ]
  ],
  "example": "An e-commerce company places its load balancer in a public subnet, application servers in a private subnet and its database in an isolated subnet. The database security group accepts connections only from the application servers' security group on the database port, so even a compromised web-facing component cannot reach it directly.",
  "tip": "Security groups are stateful and attach to instances; NACLs are stateless and attach to subnets. If return traffic is being blocked, suspect a stateless rule missing the outbound direction.",
  "check": [
   [
    "What is the key difference between a security group and a network ACL?",
    "Security groups are stateful and instance-level; NACLs are typically stateless, subnet-level and support deny rules."
   ],
   [
    "What does microsegmentation limit after an attacker gains a foothold?",
    "Lateral movement between workloads."
   ],
   [
    "What does zero trust replace network location with as the basis for access?",
    "Continuous verification of identity, device and context for each request, with least privilege."
   ]
  ]
 },
 {
  "t": "Business continuity and disaster recovery in the cloud: strategy, RTO/RPO, plan creation and testing",
  "body": [
   "Business continuity and disaster recovery (BC/DR) planning answers one question: how will the organization keep delivering its critical services when something breaks? The cloud offers new ways to recover and introduces a new kind of disaster, the failure or loss of the provider itself.",
   "There are three common scenarios. An on-premises environment can use the cloud as its recovery site, replacing an expensive second data center. A cloud-hosted workload can recover within the same provider, in another availability zone or region. Or a workload can recover to a different provider, which protects against provider-wide failure or business failure but is harder because services and formats differ. Recovery strategies are often described by how warm the standby is: backup and restore (cheapest, slowest), pilot light (core data replicated and minimal systems ready to scale), warm standby (a scaled-down copy running) and active-active or multi-site (full capacity in two places, fastest and most expensive).",
   "The business impact analysis sets the targets. The recovery time objective (RTO) is how long the service can be down; the recovery point objective (RPO) is how much data loss is acceptable. The maximum tolerable downtime (MTD) is the point beyond which the business suffers unacceptable harm, so the RTO must be shorter than it. Choose the cheapest strategy that meets the RTO and RPO. The plan must also cover people and dependencies: identity services, DNS, key management, network links and third-party APIs often turn out to be single points of failure.",
   "Creating the plan involves defining scope and requirements, analyzing risks and dependencies, designing the recovery architecture, writing runbooks with clear roles, and getting management approval. Testing proves the plan works, from low effort to high: checklist reviews, tabletop walkthroughs, simulations, parallel tests that recover systems without affecting production, and full interruption tests that actually fail over production. Cloud automation makes realistic tests cheaper, so test regularly, record the actual recovery times against the RTO and RPO, and update the plan after every test and every significant change."
  ],
  "terms": [
   [
    "Maximum tolerable downtime (MTD)",
    "The longest a business process can be unavailable before the organization suffers unacceptable harm."
   ],
   [
    "Pilot light",
    "A DR strategy in which core data is replicated and minimal infrastructure is kept ready to scale up during a disaster."
   ],
   [
    "Warm standby",
    "A DR strategy in which a scaled-down but functional copy of the environment runs continuously and can be scaled up quickly."
   ],
   [
    "Tabletop exercise",
    "A discussion-based test in which participants walk through a scenario and their roles without touching systems."
   ]
  ],
  "example": "A logistics company with a two-hour RTO and fifteen-minute RPO for its tracking system chooses a warm standby in a second region with database replication every few minutes. A semi-annual failover test shows actual recovery takes 95 minutes, and a missing DNS change in the runbook is fixed afterwards.",
  "tip": "RTO must be less than or equal to MTD. For exam scenarios, choose the least expensive DR strategy that still meets both the RTO and the RPO, and remember the provider itself can be the disaster.",
  "check": [
   [
    "Which DR strategy is cheapest and slowest?",
    "Backup and restore."
   ],
   [
    "What is the relationship between RTO and MTD?",
    "The RTO must not exceed the MTD; recovery has to finish before harm becomes unacceptable."
   ],
   [
    "Which test type actually fails over production and carries the most risk?",
    "A full interruption test."
   ]
  ]
 },
 {
  "t": "Audit mechanisms: log collection, correlation and packet capture in cloud environments",
  "body": [
   "Audit mechanisms are the technical means of recording activity so that it can be reviewed, investigated and proven. The CCSP outline names three: log collection, correlation and packet capture. Each works differently in the cloud than in a traditional data center.",
   "Log collection starts with knowing what exists and what you can reach. Providers generate management plane audit logs, service logs, identity logs and network flow logs; you generate operating system and application logs in IaaS and PaaS. In SaaS you may only get whatever the provider exposes through an admin console or API, and retention may be short, so check before you need it. Collect centrally into a log platform or SIEM in a separate security account, normalize formats, synchronize time, protect integrity and set retention by policy. Watch costs: high-volume logs such as data access events need deliberate choices about what to keep and for how long.",
   "Correlation links events from different sources to reveal a pattern that no single log shows, such as a sign-in from a new country followed by creation of an access key and a large download from storage. SIEM platforms and cloud-native threat detection services apply rules and analytics to do this at scale. Correlation depends on consistent identities, accurate timestamps and enough context in each event, which is why log design matters as much as collection.",
   "Packet capture records the actual network traffic. In a traditional network you plug a tap or mirror a switch port; in a multitenant cloud you have no access to physical switches, and the provider will not let you see other tenants' traffic. Options include provider traffic mirroring features that copy traffic from your own instances' network interfaces to an analysis tool, capture agents running on your virtual machines, and relying on flow logs, which record metadata such as addresses, ports and byte counts but not packet contents. In PaaS and SaaS, packet capture is usually not possible at all, which is a limitation to plan around for investigations and to discuss in contracts."
  ],
  "terms": [
   [
    "SIEM",
    "Security information and event management: a platform that collects, normalizes, correlates and alerts on logs from many sources."
   ],
   [
    "Flow log",
    "A record of network connections showing metadata such as source, destination, ports, protocol and bytes, without packet payloads."
   ],
   [
    "Traffic mirroring",
    "A cloud feature that copies network packets from a customer's instance interfaces to a monitoring or analysis destination."
   ],
   [
    "Correlation",
    "Linking related events from multiple sources to detect patterns that single events do not reveal."
   ]
  ],
  "example": "An analyst sees in the SIEM that a developer's identity signed in from an unfamiliar country, created a new access key and, ten minutes later, that key listed and downloaded thousands of objects. No single log looked alarming, but the correlation rule linking the three events raised a high-priority alert.",
  "tip": "Customers cannot tap a provider's physical network. For packet-level visibility in IaaS, the answer is provider traffic mirroring or host-based capture on your own instances; in SaaS, packet capture is generally unavailable.",
  "check": [
   [
    "What does a flow log not contain?",
    "Packet payloads; it records connection metadata only."
   ],
   [
    "Why is correlation valuable?",
    "It links events from several sources to reveal attacks that no single event would show."
   ],
   [
    "Why should you check SaaS log availability before an incident?",
    "SaaS providers may expose limited logs with short retention, and you cannot add logging after the fact."
   ]
  ]
 },
 {
  "t": "Training and awareness for application security: cloud development basics and common pitfalls",
  "body": [
   "Most application vulnerabilities are written by well-meaning developers who did not know better. Training and awareness is therefore the first objective in the Cloud Application Security domain: teams need to understand how building for the cloud differs from building for a server in their own data center.",
   "Cloud development basics start with the idea that the application is now tightly coupled to the provider's services. Code calls storage, queues, databases, identity and AI services through APIs, and every one of those calls needs authentication and authorization. Applications are often broken into microservices and deployed through automated pipelines many times a day. Infrastructure itself is defined as code, so a developer's template can create a public database as easily as an application feature. Developers therefore make security decisions constantly, whether they realize it or not.",
   "Common pitfalls follow a pattern. Hard-coded secrets, such as access keys pasted into source code or container images, are leaked through repositories. Over-privileged identities give a function or container broad administrative rights because it was easier than working out the precise permissions. Insecure defaults, such as storage created with public access or debug endpoints left on, reach production. Developers assume on-premises controls, like a perimeter firewall, still protect them. Other pitfalls include poor handling of multitenancy in SaaS applications, where one customer's request can reach another customer's data; ignoring portability and lock-in; not logging enough to investigate incidents; and trusting data from other services without validation.",
   "Effective training is role-specific and continuous. Developers need secure coding in their own languages and frameworks, the organization's approved patterns and libraries, how to use the secrets manager and how to read scanner results. Architects need threat modeling and cloud design patterns. Everyone needs to know how to report a problem. Security champions, developers with extra training embedded in each team, spread knowledge and give feedback to the security team. Measure effectiveness by trends in real defects, not by course completion."
  ],
  "terms": [
   [
    "Security champion",
    "A developer or engineer embedded in a team who receives extra security training and promotes secure practices."
   ],
   [
    "Hard-coded secret",
    "A password, key or token written directly into source code, configuration or images."
   ],
   [
    "Insecure default",
    "A setting that is unsafe out of the box and must be changed to be secure."
   ],
   [
    "Microservices",
    "An architecture that splits an application into small, independently deployed services communicating over APIs."
   ]
  ],
  "example": "After a scan finds three access keys committed to public repositories in one quarter, a software company adds pre-commit secret scanning, trains every team on the secrets manager in a one-hour hands-on session and appoints a security champion in each squad. The next quarter, leaked keys drop to zero.",
  "tip": "The CCSP treats training as a preventive control that addresses the root cause. If a question describes the same type of coding flaw recurring across teams, the best long-term answer usually includes developer training, not just another scanner.",
  "check": [
   [
    "Name two common cloud development pitfalls.",
    "Any two of: hard-coded secrets, over-privileged identities, insecure defaults, assuming perimeter controls, weak tenant separation, insufficient logging."
   ],
   [
    "What does a security champion do?",
    "Acts as the security point of contact inside a development team, spreading secure practices and relaying feedback."
   ],
   [
    "How should the effectiveness of secure development training be measured?",
    "By changes in real outcomes such as defect rates and repeat findings, not just completion rates."
   ]
  ]
 },
 {
  "t": "Secure software development lifecycle (SDLC): phases, methodologies and threat modeling (STRIDE, DREAD, PASTA, ATASM)",
  "body": [
   "A secure software development lifecycle (SDLC) builds security activities into every phase of building software instead of testing for problems at the end. Fixing a design flaw on a whiteboard costs little; fixing it after release can mean a breach, an emergency patch and lost customer trust.",
   "The phases are described in slightly different ways, but they usually include requirements, design, development (coding), testing, deployment, and operations and maintenance, ending with disposal. Security activities map to each: security and privacy requirements, including abuse cases, in the requirements phase; threat modeling and secure architecture review in design; secure coding standards, peer review and static analysis in development; dynamic testing, penetration testing and dependency checks in testing; secure configuration and secrets handling at deployment; and monitoring, patching and incident response in operations. Methodologies such as waterfall, agile and DevOps change how often these activities run, not whether they happen. In agile and DevOps they must be small, automated and repeated every iteration.",
   "Threat modeling is the structured way to find design flaws before they are built. STRIDE, created at Microsoft, classifies threats as spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege; each maps to a security property it violates (authentication, integrity, non-repudiation, confidentiality, availability and authorization). DREAD scores threats by damage, reproducibility, exploitability, affected users and discoverability, to help prioritize them, though it is criticized as subjective. PASTA, the Process for Attack Simulation and Threat Analysis, is a seven-stage, risk-centric method that starts from business objectives and works through technical scope, decomposition, threat analysis, vulnerability analysis and attack modeling to risk and impact analysis. ATASM stands for architecture, threats, attack surfaces and mitigations, a straightforward sequence for analyzing a system.",
   "In the cloud, a threat model should include the provider's services and the trust boundaries between them, the management plane, identities used by each component, and what happens if a dependency fails or is compromised."
  ],
  "terms": [
   [
    "STRIDE",
    "A threat classification: spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege."
   ],
   [
    "DREAD",
    "A threat scoring model: damage, reproducibility, exploitability, affected users and discoverability."
   ],
   [
    "PASTA",
    "Process for Attack Simulation and Threat Analysis, a seven-stage risk-centric threat modeling method."
   ],
   [
    "Abuse case",
    "A description of how an attacker might misuse a feature, written alongside normal use cases to drive security requirements."
   ]
  ],
  "example": "During design review of a file-upload service, the team applies STRIDE and notes that a user could upload a file on behalf of another user (spoofing) and that uploads are not logged (repudiation). They add signed upload URLs bound to the caller's identity and upload audit logging before any code is written.",
  "tip": "Match the model to the question: STRIDE categorizes threats, DREAD rates them, PASTA is risk-centric and aligned to business objectives, ATASM is a simple architecture-first sequence.",
  "check": [
   [
    "Which STRIDE category does an attacker altering data in transit represent, and which property does it violate?",
    "Tampering; it violates integrity."
   ],
   [
    "What makes PASTA different from STRIDE?",
    "PASTA is a seven-stage risk-centric process that starts from business objectives; STRIDE is a classification of threat types."
   ],
   [
    "In which SDLC phase is threat modeling most valuable?",
    "Design, when flaws can be fixed cheaply before code is written."
   ]
  ]
 },
 {
  "t": "Common cloud vulnerabilities: OWASP Top 10 and SANS/CWE Top 25",
  "body": [
   "You do not need to memorize every weakness in existence, but you do need to recognize the ones that cause most real breaches. The CCSP outline points to two widely used lists: the OWASP Top 10 for web application risks and the CWE Top 25 Most Dangerous Software Weaknesses, published by MITRE and historically associated with SANS.",
   "The OWASP Top 10 is updated every few years from real-world data, and its categories include broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable and outdated components, identification and authentication failures, software and data integrity failures, security logging and monitoring failures, and server-side request forgery (SSRF). Exact names and order change between editions, so focus on understanding each idea. Broken access control, where users can act outside their intended permissions, has sat at or near the top because it is so common.",
   "The CWE Top 25 is a ranked list of specific software weaknesses, scored by how often they appear in reported vulnerabilities and how severe they are. It includes items such as cross-site scripting, out-of-bounds write, SQL injection, use after free, missing authorization, OS command injection, improper input validation and cross-site request forgery. Where OWASP groups risks into broad categories for web applications, CWE names precise coding weaknesses across all kinds of software.",
   "Several of these are especially dangerous in the cloud. SSRF can trick a server into calling the provider's instance metadata service and stealing temporary credentials, which is why providers introduced metadata protections that require a session token. Security misconfiguration covers exposed storage and overly broad permissions. Vulnerable components matter because cloud applications pull in many open-source packages and base images. Insufficient logging hides attacks in environments where you cannot fall back on network taps. Use these lists to shape secure coding standards, testing plans and training, but do not treat them as complete; they are a starting point, not a checklist of everything that can go wrong."
  ],
  "terms": [
   [
    "OWASP Top 10",
    "A regularly updated awareness list of the most critical web application security risk categories."
   ],
   [
    "CWE Top 25",
    "MITRE's ranked list of the most dangerous specific software weaknesses based on real vulnerability data."
   ],
   [
    "Server-side request forgery (SSRF)",
    "A flaw that lets an attacker make a server send requests to destinations of the attacker's choosing, often internal services."
   ],
   [
    "Broken access control",
    "A failure to enforce what authenticated users are allowed to do, letting them act outside their permissions."
   ]
  ],
  "example": "A penetration tester finds that an image-preview feature fetches any URL supplied by the user. By pointing it at the instance metadata address, the tester retrieves temporary cloud credentials. The team fixes it by validating URLs against an allow list, blocking internal addresses and enforcing token-based metadata access.",
  "tip": "SSRF is the classic cloud-specific web vulnerability because of instance metadata services. If a scenario involves a server fetching user-supplied URLs and leaking credentials, the answer is SSRF.",
  "check": [
   [
    "What is the difference between the OWASP Top 10 and the CWE Top 25?",
    "OWASP lists broad web application risk categories; CWE Top 25 ranks specific software weaknesses across all software."
   ],
   [
    "Why is SSRF especially dangerous in the cloud?",
    "It can reach the instance metadata service and steal temporary credentials for the workload's identity."
   ],
   [
    "Which OWASP category covers publicly exposed storage buckets?",
    "Security misconfiguration."
   ]
  ]
 },
 {
  "t": "Applying the SDLC in cloud: secure coding, ASVS and software configuration management",
  "body": [
   "Knowing the SDLC phases is one thing; applying them to real cloud projects is another. This objective covers three practical tools: secure coding practices, the OWASP Application Security Verification Standard (ASVS) and software configuration management.",
   "Secure coding means writing code that handles untrusted input safely and uses platform security features correctly. Core practices include validating input against expected formats, encoding output for its context to prevent cross-site scripting, using parameterized queries to prevent injection, enforcing authorization on every request on the server side, handling errors without leaking stack traces or secrets, using vetted cryptographic libraries rather than writing your own, and getting credentials from a secrets manager or workload identity rather than from code. Organizations turn these into a written coding standard, backed by linters and static analysis rules, and check them in code review.",
   "The ASVS gives you a detailed, testable list of security requirements for web applications and APIs. It has three verification levels. Level 1 is a basic level suitable for all applications and can largely be tested from outside. Level 2 is the recommended level for most applications that handle sensitive data. Level 3 is for the most critical applications, such as those handling high-value transactions or sensitive medical data, and requires deep verification including design review. Teams use ASVS as a source of requirements at the start of a project, as a checklist for design reviews and as the scope for testing, which makes security measurable rather than a matter of opinion.",
   "Software configuration management (SCM) controls changes to code, dependencies, build scripts, infrastructure templates and application settings. It uses version control for everything, protected main branches with required reviews, signed commits and artifacts, reproducible builds, and a record of exactly which version is deployed where. Configuration is kept separate from code and secrets are never stored in either. In the cloud, where infrastructure is code, SCM is how you prevent and trace unauthorized changes and how you roll back quickly when a change goes wrong."
  ],
  "terms": [
   [
    "ASVS",
    "The OWASP Application Security Verification Standard, a list of testable security requirements organized into three verification levels."
   ],
   [
    "Parameterized query",
    "A database query where user input is passed as separate parameters, so it can never be executed as code."
   ],
   [
    "Software configuration management",
    "The discipline of tracking and controlling changes to code, dependencies, build and deployment configuration."
   ],
   [
    "Output encoding",
    "Transforming data before display so that the browser treats it as text rather than executable code."
   ]
  ],
  "example": "A fintech startup adopts ASVS Level 2 as the security requirement set for its customer portal. Each user story references the relevant ASVS requirements, automated tests check them in the pipeline, and a quarterly review reports which requirements are met, giving the board a concrete measure of application security.",
  "tip": "ASVS Level 1 is the minimum for all apps, Level 2 is recommended for apps with sensitive data, and Level 3 is for critical applications. Pick the level that matches the data and business impact in the scenario.",
  "check": [
   [
    "Which ASVS level is recommended for most applications handling sensitive data?",
    "Level 2."
   ],
   [
    "What is the best defense against SQL injection?",
    "Parameterized queries (prepared statements), supported by input validation."
   ],
   [
    "Why is software configuration management important for infrastructure as code?",
    "It controls and records every change to infrastructure definitions, preventing unauthorized changes and enabling quick rollback."
   ]
  ]
 },
 {
  "t": "Cloud software assurance and validation: functional and non-functional testing, SAST, DAST, IAST, SCA, abuse cases",
  "body": [
   "Software assurance is the confidence that software does what it should and nothing it should not. You get that confidence by testing, and the CCSP expects you to know which kind of test finds which kind of problem and where each fits in a cloud delivery pipeline.",
   "Functional testing checks that features behave as specified: a user can reset a password, an order total is calculated correctly. Security has functional requirements too, such as locking an account after repeated failures or rejecting access for users without a role. Non-functional testing checks qualities such as performance, scalability, availability, resilience and usability. In the cloud, load and resilience tests matter because autoscaling, failover and cost limits all need to behave as expected under stress. Abuse cases, sometimes called misuse cases, turn attacker behavior into test scenarios: what happens if a user submits another customer's ID, uploads a huge file or calls an API a million times?",
   "Automated security testing tools each look at software from a different angle. Static application security testing (SAST) analyzes source code, bytecode or binaries without running them. It finds flaws early, points to the exact line and fits in the developer's workflow, but it can produce false positives and does not see runtime configuration. Dynamic application security testing (DAST) attacks a running application from outside, like a black-box tester; it finds real exploitable issues and configuration problems, but only later in the lifecycle and without pointing to the code. Interactive application security testing (IAST) places an agent inside the running application during testing, combining runtime observation with code-level detail. Software composition analysis (SCA) inventories third-party and open-source components, flags known vulnerabilities and license problems, and can produce a software bill of materials (SBOM).",
   "Quality assurance ties it together. Build these tests into the CI/CD pipeline with thresholds that block releases for serious findings, triage and fix results, and add penetration testing by skilled humans for critical systems. Before testing against a provider's infrastructure, check its penetration testing policy; many providers allow testing your own resources without prior approval but forbid attacks on the underlying platform."
  ],
  "terms": [
   [
    "SAST",
    "Static application security testing: analyzing code without executing it to find security flaws."
   ],
   [
    "DAST",
    "Dynamic application security testing: probing a running application from the outside to find exploitable weaknesses."
   ],
   [
    "IAST",
    "Interactive application security testing: an agent inside the running application observes behavior during tests and reports flaws with code context."
   ],
   [
    "SCA",
    "Software composition analysis: identifying third-party components and their known vulnerabilities and licenses."
   ]
  ],
  "example": "A team's pipeline runs SAST and SCA on every pull request, blocks merges with critical findings, and runs DAST nightly against a staging environment. When SCA flags a newly disclosed vulnerability in a logging library, the team knows within an hour which of its 40 services include it, thanks to the SBOMs generated by each build.",
  "tip": "SAST = code at rest, early, white box. DAST = running app, later, black box. SCA = third-party components. If the question is about a known vulnerable open-source library, SCA is the answer.",
  "check": [
   [
    "Which testing type analyzes source code without executing it?",
    "SAST."
   ],
   [
    "What does an SBOM provide?",
    "An inventory of the components and dependencies in a piece of software, used to find affected systems when a vulnerability is disclosed."
   ],
   [
    "Why should you read a provider's penetration testing policy first?",
    "Providers set rules on what customers may test; attacking the underlying platform or other tenants is usually prohibited."
   ]
  ]
 },
 {
  "t": "Using verified secure software: approved APIs, supply chain management, third-party and open-source components",
  "body": [
   "Modern cloud applications are assembled more than written. A typical service combines the team's own code with dozens or hundreds of open-source packages, container base images, provider SDKs and third-party APIs. Each of these is a trust decision, and attackers increasingly target the supply chain because compromising one popular component can reach thousands of victims.",
   "Approved APIs are interfaces that the organization has reviewed and allowed. Reviewing an API means checking how it authenticates callers, whether it encrypts traffic, what data it receives and returns, rate limits, logging, the provider's security posture and contract terms, and what happens if it changes or disappears. Maintaining a catalog of approved APIs and blocking unapproved ones stops developers from sending sensitive data to unknown services. Internally, publish your own APIs through a gateway that enforces authentication and rate limits.",
   "Supply chain management applies to software vendors and to the build process itself. For vendors, assess their secure development practices, request evidence such as SBOMs or attestations, and put security obligations in contracts. For your own pipeline, protect it as a production system: restrict who can change build definitions, pin dependency versions, pull packages from a curated internal repository or proxy rather than directly from public registries, verify signatures and checksums, sign the artifacts you produce and record their provenance. Frameworks such as NIST's Secure Software Development Framework and the SLSA levels describe these practices.",
   "Open-source components are not less secure by nature, but they need management. Track them with software composition analysis, watch for new vulnerabilities, check licenses for legal compatibility, prefer actively maintained projects, and have a process to patch or replace components quickly when a serious flaw is announced. Beware of typosquatting and dependency confusion attacks, in which malicious packages imitate legitimate names. Validate container images the same way: use minimal trusted base images, scan them and allow only signed images from approved registries to run."
  ],
  "terms": [
   [
    "Software supply chain",
    "All the components, tools, processes and suppliers involved in building and delivering software."
   ],
   [
    "Dependency confusion",
    "An attack where a malicious public package with the same name as an internal one is pulled into a build instead of the real package."
   ],
   [
    "Artifact signing",
    "Digitally signing build outputs so consumers can verify they came from the expected source and were not altered."
   ],
   [
    "Approved API",
    "An external or internal interface that has been security-reviewed and authorized for use by the organization."
   ]
  ],
  "example": "After a widely used open-source library is found to contain a backdoor, a company that pulls all packages through a curated internal repository blocks the compromised version within minutes and uses its SBOM inventory to confirm that no production service ever built with it.",
  "tip": "Open source is not automatically risky or safe; the exam favors answers that manage it with inventory (SCA/SBOM), trusted sources, version pinning, signature checks and rapid patching.",
  "check": [
   [
    "Name two ways to protect a build pipeline from supply chain attacks.",
    "Examples: pull packages from a curated internal repository, pin versions, verify signatures and checksums, restrict changes to build definitions, sign artifacts."
   ],
   [
    "What is typosquatting in package ecosystems?",
    "Publishing malicious packages with names similar to popular ones so that developers install them by mistake."
   ],
   [
    "What should be checked before approving a third-party API?",
    "Authentication, encryption, the data exchanged, rate limits, logging, the provider's security posture and contract terms."
   ]
  ]
 },
 {
  "t": "Specifics of cloud application architecture: WAF, XML gateways, API gateways, database activity monitoring, cryptography, sandboxing, app virtualization",
  "body": [
   "Beyond secure code, cloud applications rely on supplemental security components placed around them. The CCSP outline lists several, and the exam often asks which one fits a specific need.",
   "A web application firewall (WAF) inspects HTTP and HTTPS traffic at layer 7 and blocks common attacks such as SQL injection and cross-site scripting using signatures, rules and behavior analysis. It can also rate-limit and filter bots. A WAF is a compensating control that buys time and blocks known patterns; it does not fix the underlying code. XML gateways, and their modern equivalents for JSON, inspect structured messages between services: they validate messages against schemas, block oversized or malicious payloads such as XML external entity attacks, and can transform, sign or encrypt messages and strip sensitive fields before they leave. An API gateway is the front door for APIs: it authenticates callers, enforces authorization and quotas, applies rate limits and throttling, routes requests to back-end services, and logs traffic in one place.",
   "Database activity monitoring (DAM) watches queries against databases, often through an agent or by reading database audit logs, and alerts on or blocks suspicious behavior such as a service account suddenly reading an entire customer table or an administrator querying data outside working hours. It gives separation of duties over database administrators, whose actions would otherwise be hard to review. Cryptography in the application layer covers TLS for all connections, encryption of sensitive fields before they are stored, and signing of tokens and messages, all with keys from a managed key service.",
   "Sandboxing runs code in a restricted, isolated environment so that if it misbehaves or is malicious, it cannot affect the host or other applications. It is used to detonate suspicious files, to run untrusted plug-ins and to test new code. Application virtualization runs an application in an encapsulated layer separate from the underlying operating system, which allows legacy or conflicting applications to run and limits their access to the host, while also making them easier to deliver and update centrally."
  ],
  "terms": [
   [
    "WAF",
    "A web application firewall that filters HTTP traffic at layer 7 to block attacks such as injection and cross-site scripting."
   ],
   [
    "API gateway",
    "A service that fronts APIs to handle authentication, authorization, rate limiting, routing and logging."
   ],
   [
    "Database activity monitoring (DAM)",
    "Monitoring database queries and activity in real time to detect and alert on suspicious or policy-violating access."
   ],
   [
    "Sandbox",
    "An isolated, restricted execution environment that contains the effects of untrusted code."
   ]
  ],
  "example": "A travel booking company exposes partner APIs. It places an API gateway in front of them to require OAuth tokens and enforce per-partner quotas, a WAF to block injection attempts, and database activity monitoring on the bookings database, which later alerts when a compromised partner key starts pulling records far outside its normal pattern.",
  "tip": "A WAF protects web apps at layer 7 but does not fix vulnerable code; an API gateway handles authentication, quotas and routing for APIs; DAM watches what happens inside the database. Match the tool to where the risk sits.",
  "check": [
   [
    "Which component would enforce per-client rate limits and token authentication for REST APIs?",
    "An API gateway."
   ],
   [
    "Why is a WAF considered a compensating control?",
    "It blocks attack patterns in traffic but does not remove the vulnerability in the application code."
   ],
   [
    "What threat does database activity monitoring address that network controls miss?",
    "Misuse by authorized accounts, such as insiders or compromised service accounts running unusual queries."
   ]
  ]
 },
 {
  "t": "Identity and access management solutions: federated identity, identity providers, SSO, MFA, CASB and secrets management",
  "body": [
   "Applications in the cloud are used by employees, partners, customers and other services, often across several providers. Identity and access management (IAM) solutions make sure each of them is identified, authenticated and given only the access it needs. The CCSP outline lists the main building blocks that application architects must design with.",
   "Federated identity lets a user authenticate once with a trusted identity provider (IdP) and use that identity to access applications run by other parties, called service providers or relying parties, without separate passwords. The IdP authenticates the user and issues a signed assertion or token; the application trusts the IdP's signature. SAML 2.0 is common for enterprise web single sign-on and uses XML assertions. OpenID Connect (OIDC), built on OAuth 2.0, uses JSON web tokens and suits modern web and mobile apps. OAuth 2.0 itself is an authorization framework: it lets an application obtain limited access to an API on a user's behalf without learning the user's password. Single sign-on (SSO) is the user experience that federation enables, and it also gives the organization one place to disable access when someone leaves.",
   "Multifactor authentication (MFA) requires two or more factor types: something you know, something you have and something you are. Phishing-resistant methods such as FIDO2 security keys and passkeys are preferred, especially for administrators, over SMS codes or push approvals that attackers can intercept or trick users into accepting. Adaptive or risk-based authentication adds steps when context looks unusual.",
   "A cloud access security broker (CASB) sits between users and cloud services, either inline as a proxy or through the services' APIs. It discovers which cloud apps are in use (shadow IT), enforces access and data policies, applies DLP, detects risky behavior and checks configuration. Secrets management covers non-human credentials: API keys, database passwords, certificates and tokens used by applications. A secrets manager stores them encrypted, controls and logs access, rotates them automatically and delivers them at runtime, and where possible workload identities replace static secrets entirely."
  ],
  "terms": [
   [
    "Identity provider (IdP)",
    "The system that authenticates users and issues assertions or tokens that other applications trust."
   ],
   [
    "SAML 2.0",
    "An XML-based standard for exchanging authentication and attribute assertions between an identity provider and a service provider."
   ],
   [
    "OpenID Connect",
    "An identity layer on top of OAuth 2.0 that provides authentication using JSON web tokens."
   ],
   [
    "CASB",
    "A cloud access security broker that gives visibility and policy enforcement between users and cloud services."
   ]
  ],
  "example": "A university federates its SaaS learning platform, email and research tools with its central IdP. Students sign in once with MFA; when a staff member leaves, disabling one account removes access to every federated app, and a CASB reports several unsanctioned file-sharing apps holding research data.",
  "tip": "OAuth 2.0 is for authorization (delegated access to APIs); OpenID Connect adds authentication on top of it; SAML is the older XML standard for enterprise SSO. Questions often test that OAuth alone does not authenticate users.",
  "check": [
   [
    "In federation, which party authenticates the user?",
    "The identity provider (IdP); the service provider or relying party trusts the IdP's signed assertion or token."
   ],
   [
    "What does a CASB help discover?",
    "Shadow IT: cloud services in use without the organization's approval."
   ],
   [
    "Why are workload identities preferred to stored secrets?",
    "They remove long-lived static credentials that can be leaked, using short-lived credentials issued automatically."
   ]
  ]
 },
 {
  "t": "Building and implementing physical and logical infrastructure: hardware security (TPM, HSM), virtualization toolsets and guest OS installation",
  "body": [
   "Domain 5 is about running cloud environments day to day, and it starts with building them correctly. Whether you are a provider building hosts or a customer building virtual machines, security has to be part of the build, because fixing an insecure foundation later is slow and often incomplete.",
   "Hardware-specific security configuration begins with trusted hardware components. A trusted platform module (TPM) is a chip on the motherboard that securely stores keys and measurements of the boot process. It supports secure boot and measured boot, so a host can prove it started with approved firmware and software, and it protects disk encryption keys. Virtual TPMs give the same capabilities to virtual machines. A hardware security module (HSM) is a dedicated, tamper-resistant device for generating and using cryptographic keys at scale. Providers also configure BIOS and firmware settings, disable unused ports and devices, keep firmware patched and lock down baseboard management controllers, which offer powerful out-of-band access to servers.",
   "Virtualization management toolsets are the software used to create, configure, monitor and move virtual machines and hosts. They are extremely powerful, so they must be installed and configured securely: patch them, limit administrative access to a small group with MFA, place management interfaces on isolated management networks, use role-based permissions, and log every action. The same thinking applies to the customer's use of the provider's management console and APIs.",
   "Installing guest operating systems securely means starting from hardened, approved images rather than building by hand each time. Organizations build golden images that include the latest patches, security agents, logging configuration and settings from a benchmark such as the CIS Benchmarks, then scan and sign them and publish them to an approved image catalog. Virtualization tools and guest additions installed in the guest should come from trusted sources and be kept current. Rebuild images regularly so new instances start patched, and prevent teams from launching unapproved images through policy."
  ],
  "terms": [
   [
    "Trusted platform module (TPM)",
    "A hardware chip that securely stores keys and boot measurements, supporting secure and measured boot and disk encryption."
   ],
   [
    "Golden image",
    "A hardened, pre-approved template used to build consistent, secure instances."
   ],
   [
    "Measured boot",
    "Recording measurements of each boot component in the TPM so that the system's startup integrity can be verified."
   ],
   [
    "Baseboard management controller",
    "An out-of-band management processor on a server that allows remote control even when the operating system is off."
   ]
  ],
  "example": "A company's platform team rebuilds its Linux golden image every two weeks with current patches and CIS Benchmark settings, scans it, signs it and publishes it to the image catalog. A cloud policy blocks launching any virtual machine from an image that is not in the catalog.",
  "tip": "TPM is a chip bound to one machine that anchors boot integrity and local keys; an HSM is a dedicated, high-assurance device for managing many keys. Questions about proving boot integrity point to the TPM.",
  "check": [
   [
    "Which hardware component supports measured boot?",
    "The trusted platform module (TPM)."
   ],
   [
    "Why use golden images?",
    "They give every new instance a consistent, patched and hardened starting point that has been scanned and approved."
   ],
   [
    "Why must virtualization management toolsets be tightly controlled?",
    "They can create, modify, move and delete every virtual machine, so compromise of them affects the whole environment."
   ]
  ]
 },
 {
  "t": "Operating and maintaining physical and logical infrastructure: access controls for local and remote access, secure network configuration (VLAN, TLS, DHCP, DNSSEC, VPN)",
  "body": [
   "Once infrastructure is built, it has to be operated securely for years. Two of the operational objectives in Domain 5 are controlling how administrators reach systems, locally and remotely, and keeping network services configured securely.",
   "Local access means physically at the console of a host or in the data center, which in public cloud is the provider's concern, controlled with badges, escorts, logs and the principle that very few staff can touch hardware. Remote access is how nearly all administration happens. Options include SSH for Linux and RDP for Windows, ideally not exposed to the internet at all but reached through a bastion host (jump box), a provider-managed session service that brokers connections through the management plane without open inbound ports, or a zero trust access proxy. Whatever the method, require strong authentication with MFA, grant access just in time, use a privileged access management tool that records sessions, and remove standing access when work is done. Console-based keyboard, video and mouse access to instances should also be restricted and logged.",
   "Secure network configuration covers several services. Virtual LANs (VLANs) separate traffic on shared physical networks, for example keeping management, storage and tenant traffic apart; in the cloud, virtual networks and subnets play a similar role. TLS protects data in transit and should use current protocol versions with weak versions disabled, valid certificates and strong cipher suites. DHCP automatically assigns addresses; if abused, a rogue DHCP server can redirect traffic, so use snooping or provider-managed addressing. DNS is critical and often attacked; DNSSEC adds digital signatures to DNS records so resolvers can verify that answers are authentic and unaltered, which defends against cache poisoning, although it does not encrypt queries. VPNs using IPsec or TLS create encrypted tunnels between sites or for remote users.",
   "Maintenance keeps all of this correct over time: review firewall and access rules regularly, rotate certificates before they expire, remove unused remote access paths, and monitor for configuration drift."
  ],
  "terms": [
   [
    "Bastion host",
    "A hardened server that is the only allowed entry point for administrative access to systems in a private network."
   ],
   [
    "DNSSEC",
    "DNS Security Extensions, which sign DNS records so resolvers can verify their authenticity and integrity."
   ],
   [
    "VLAN",
    "A virtual LAN that logically separates traffic on a shared physical network."
   ],
   [
    "Privileged access management (PAM)",
    "Tools and processes that control, broker, record and audit use of privileged accounts."
   ]
  ],
  "example": "An operations team removes public SSH access from all its cloud servers. Administrators now connect through the provider's managed session service after single sign-on with MFA, each session is recorded to a protected log store, and access is granted for four hours at a time through an approval workflow.",
  "tip": "DNSSEC provides integrity and authenticity of DNS answers, not confidentiality. If the question is about preventing forged DNS responses, choose DNSSEC; if it is about hiding queries, DNSSEC is not the answer.",
  "check": [
   [
    "What attack does DNSSEC defend against?",
    "DNS spoofing and cache poisoning, by letting resolvers verify signed records."
   ],
   [
    "Why use a bastion host or managed session service instead of exposing SSH directly?",
    "It reduces the attack surface to one hardened, monitored entry point, or none at all with managed sessions, and centralizes authentication and logging."
   ],
   [
    "What risk does a rogue DHCP server create?",
    "It can hand out malicious gateway or DNS settings, redirecting victims' traffic."
   ]
  ]
 },
 {
  "t": "Hardening, patch management and infrastructure as code",
  "body": [
   "Most successful attacks exploit known weaknesses: default settings, unnecessary services and missing patches. Hardening and patch management close those gaps, and infrastructure as code makes the secure configuration repeatable instead of a one-off effort.",
   "Hardening reduces the attack surface of an operating system, application or service. Typical steps are removing unneeded software and services, closing unused ports, changing default accounts and passwords, enforcing strong authentication, enabling logging, applying least privilege to service accounts and setting secure parameters for encryption and protocols. Organizations base their settings on published baselines such as the CIS Benchmarks or government guides and document justified exceptions. In the cloud, hardening also covers account-level settings: blocking public storage access by default, enforcing encryption, restricting regions and requiring MFA.",
   "Patch management is a process, not an event. It includes keeping an inventory of assets and software, monitoring vendor advisories and vulnerability feeds, assessing and prioritizing patches by severity and exposure, testing them in a non-production environment, deploying them within defined time limits, verifying that they were applied and documenting exceptions with compensating controls. Remember the shared responsibility split: the customer patches guest operating systems and applications in IaaS, while the provider patches the platform in PaaS and SaaS. Cloud patterns change how patching is done: instead of patching running servers, many teams rebuild images with the patches and replace instances, which is faster and leaves no drift.",
   "Infrastructure as code (IaC) defines networks, servers, permissions and services in text files, using tools such as Terraform or the provider's own template languages, that are stored in version control and deployed automatically. IaC makes environments consistent and reviewable. Security teams scan templates before deployment to catch mistakes like open security groups or unencrypted storage, and policy as code enforces rules automatically. Because the running environment should match the code, detecting drift, meaning manual changes that bypass the code, is an important monitoring task. Immutable infrastructure goes further: servers are never modified in place, only replaced."
  ],
  "terms": [
   [
    "Hardening",
    "Reducing a system's attack surface by removing unnecessary functions and applying secure configuration settings."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining and deploying infrastructure through machine-readable template files kept in version control."
   ],
   [
    "Configuration drift",
    "Differences that develop between a system's actual configuration and its approved baseline or code definition."
   ],
   [
    "Immutable infrastructure",
    "An approach in which servers are never changed after deployment; updates are made by replacing them with new instances."
   ]
  ],
  "example": "A security scan in the deployment pipeline flags a Terraform change that would open a database port to the internet. The pull request is blocked, the developer changes the rule to allow only the application subnet, and the corrected template is deployed with a full review record.",
  "tip": "Test patches before production, but do not delay critical patches indefinitely. When a patch cannot be applied, the exam expects a documented exception with compensating controls and a remediation date.",
  "check": [
   [
    "What is configuration drift and why does it matter with IaC?",
    "Manual changes that make the real environment differ from the code, bypassing review and hiding insecure settings."
   ],
   [
    "Who patches the database engine in a managed PaaS database?",
    "The provider; the customer manages database configuration, access and data."
   ],
   [
    "Why is replacing instances with rebuilt images often better than patching in place?",
    "It is consistent and repeatable, avoids drift, and leaves every instance in a known, tested state."
   ]
  ]
 },
 {
  "t": "Availability, clustering, performance and capacity monitoring, and backup and restore of the host and guest OS",
  "body": [
   "Availability is the part of the CIA triad that users notice first. Domain 5 expects you to know how cloud systems are kept available through redundancy, how their health is monitored, and how hosts and guests are backed up and restored.",
   "Clustering groups several hosts so they act as one resource. In a virtualization cluster, if a host fails, its virtual machines restart on the remaining hosts (high availability), and a scheduler can move running machines between hosts to balance load or clear a host for maintenance. Providers use these features on their own hosts; customers achieve similar results with load balancers, auto scaling groups and deployments spread across availability zones. Distributed resource scheduling automates placement, and maintenance mode lets administrators move workloads off a host before patching it, so maintenance does not cause outages.",
   "Performance and capacity monitoring watches metrics such as CPU, memory, disk and network utilization, latency, error rates and queue lengths. Thresholds trigger alerts or automatic scaling. Hardware monitoring on the provider side tracks disks, fans, power supplies and temperatures to predict failures. Capacity planning uses the trends to make sure there is headroom for growth, and in the cloud it also means watching service quotas and budgets, because hitting an account limit or an unexpected bill can cause an outage just as surely as a failed server. Monitoring data is also a security signal: a sudden CPU spike across many instances might be cryptomining.",
   "Backup and restore protects both the host configuration and guest systems. Providers back up host configurations and hypervisor settings so they can rebuild hosts quickly. Customers back up guest operating systems and data using snapshots, image-based backups or application-aware backups for databases. Good practice follows the 3-2-1 idea (three copies, two media or services, one off-site or in a separate account), encrypts backups, protects them from deletion with immutability or separate credentials, and above all tests restores regularly. A backup that has never been restored is only a hope. Match backup frequency to the RPO and restore speed to the RTO."
  ],
  "terms": [
   [
    "High availability (HA)",
    "Design that keeps a service running despite component failure, for example by restarting VMs on other hosts in a cluster."
   ],
   [
    "Maintenance mode",
    "A host state in which workloads are moved elsewhere so the host can be patched or repaired without downtime."
   ],
   [
    "Service quota",
    "A provider-imposed limit on the number or size of resources an account can use."
   ],
   [
    "3-2-1 backup rule",
    "Keep three copies of data on two different media or services, with one copy off-site or isolated."
   ]
  ],
  "example": "An online education company monitors its video platform and notices storage IOPS climbing steadily each week. It increases provisioned capacity before the new semester and also requests a higher instance quota, avoiding the outage that would have hit when thousands of students logged in on the first day.",
  "tip": "Backups are only proven by successful restores. If an answer choice mentions testing restoration, it is usually stronger than one that only increases backup frequency.",
  "check": [
   [
    "What does a virtualization cluster do when a host fails?",
    "It restarts that host's virtual machines on other hosts in the cluster."
   ],
   [
    "Why should service quotas be part of capacity monitoring in the cloud?",
    "Hitting a quota can stop scaling or new deployments and cause an outage."
   ],
   [
    "How do you protect backups from ransomware?",
    "Make them immutable or store them in a separate account with separate credentials, and encrypt them."
   ]
  ]
 },
 {
  "t": "Implementing operational controls and standards: ITIL and ISO/IEC 20000-1 processes (change, configuration, incident, problem, release, deployment)",
  "body": [
   "Security operations do not work in isolation; they rely on disciplined IT service management. The CCSP outline refers to ITIL, a widely used body of good practice, and ISO/IEC 20000-1, the international standard for a service management system. You should know the purpose of each core process and how security fits into it.",
   "Change management controls modifications to systems so they are assessed, approved, tested, scheduled and documented, reducing the chance that a change causes an outage or opens a security hole. Security reviews high-risk changes, and emergency changes still get recorded and reviewed afterwards. Standard, pre-approved changes, such as a routine scaling action, can be automated. Configuration management maintains accurate records of configuration items and their relationships in a configuration management database (CMDB), which lets you assess the impact of a change and know what you need to protect. Release and deployment management plans, builds, tests and moves new or changed services into production in controlled packages, with rollback plans.",
   "Incident management restores normal service as quickly as possible after an unplanned interruption or degradation. Problem management finds and removes the root cause of one or more incidents, so they do not recur; a known error is a problem with a documented root cause and workaround. The distinction matters: incident management is about speed of recovery, problem management about preventing repetition. Security incidents follow a specialized incident response process but should connect to these service processes.",
   "Other processes named in the outline include service level management (agreeing and monitoring service levels), availability management, capacity management, business continuity management, information security management and continual service improvement. In the cloud, many of these processes are shared with the provider: the provider manages changes to its platform and publishes status and incident reports, while the customer manages changes to its own configurations and applications. Pipelines and infrastructure as code can implement change and release controls automatically, with approvals and audit trails built in."
  ],
  "terms": [
   [
    "Change management",
    "The process that ensures changes are assessed, approved, tested, implemented and reviewed in a controlled way."
   ],
   [
    "Problem management",
    "The process of finding and eliminating the root causes of incidents to prevent recurrence."
   ],
   [
    "CMDB",
    "Configuration management database: a repository of configuration items and the relationships between them."
   ],
   [
    "ISO/IEC 20000-1",
    "The international standard specifying requirements for an IT service management system."
   ]
  ],
  "example": "After three outages in a month caused by expired certificates, the incident team restored service each time within an hour. Problem management then traced the root cause to certificates tracked in a spreadsheet, and the fix, automated renewal with monitoring, went through change management before rollout.",
  "tip": "Incident management restores service fast; problem management finds the root cause. If a question asks which process prevents recurrence, choose problem management.",
  "check": [
   [
    "What is the goal of incident management?",
    "To restore normal service operation as quickly as possible and minimize business impact."
   ],
   [
    "What does a CMDB help with during change management?",
    "Assessing the impact of a change by showing configuration items and their dependencies."
   ],
   [
    "What happens to emergency changes in a mature change process?",
    "They are implemented quickly under an expedited approval, then documented and reviewed afterwards."
   ]
  ]
 },
 {
  "t": "Supporting digital forensics: forensic data collection methodologies, evidence management, chain of custody",
  "body": [
   "Digital forensics is the careful collection and analysis of digital evidence in a way that preserves its integrity so it can support an investigation, a disciplinary action or a court case. Cloud environments make forensics harder because you do not own the hardware, evidence can disappear when an instance is terminated, and data may sit in several jurisdictions.",
   "Forensic methodology follows a consistent sequence: identify potential evidence, collect or acquire it, preserve it, analyze it and report the findings. ISO/IEC 27037 gives guidelines for identification, collection, acquisition and preservation of digital evidence, and related standards cover analysis and investigation. Collect the most volatile data first, following the order of volatility: CPU registers and memory, then running processes and network connections, then temporary files, then disk contents, then logs and archived data. In IaaS, practical steps include isolating a compromised instance with a restrictive security group rather than shutting it down, capturing its memory with an agent, taking snapshots of its disks, and exporting relevant provider logs. Work on copies, never originals, and hash every item at acquisition so you can prove it has not changed.",
   "The service model decides what you can collect. In IaaS you can snapshot disks and capture memory yourself. In PaaS and SaaS you depend almost entirely on the provider's logs and on what it agrees to supply, so forensic support, log retention and response times should be written into the contract before any incident. Multitenancy also limits what a provider can hand over, because shared systems contain other customers' data.",
   "Evidence management and chain of custody make evidence admissible and trustworthy. The chain of custody is a documented record of who collected each item, when, how, where it was stored and every person who handled it afterwards. Evidence should be stored securely with restricted access, and its hashes verified whenever it is used. Investigators should be trained, use validated tools and document every action. Legal counsel should be involved early, especially when evidence crosses borders or involves personal data."
  ],
  "terms": [
   [
    "Chain of custody",
    "The documented, unbroken record of who collected, handled, transferred and stored each piece of evidence."
   ],
   [
    "Order of volatility",
    "The principle of collecting the most short-lived evidence, such as memory, before more persistent evidence such as disk."
   ],
   [
    "ISO/IEC 27037",
    "The international guideline for identifying, collecting, acquiring and preserving digital evidence."
   ],
   [
    "Forensic image",
    "An exact, verified bit-for-bit copy of storage media, used for analysis in place of the original."
   ]
  ],
  "example": "When a web server in IaaS shows signs of compromise, the responder applies an isolation security group, captures memory with a pre-installed agent, snapshots both volumes, records SHA-256 hashes, exports the management plane logs for the last 30 days and logs each step on a chain-of-custody form before any remediation begins.",
  "tip": "Do not shut down a compromised cloud instance first; you would lose volatile evidence. Isolate it, capture memory and snapshot disks, then remediate.",
  "check": [
   [
    "Why is terminating a compromised instance a forensic mistake?",
    "It destroys volatile evidence and can delete ephemeral storage before it is captured."
   ],
   [
    "What proves that evidence has not been altered since collection?",
    "Hashes recorded at acquisition and verified later, together with the chain-of-custody record."
   ],
   [
    "Why should forensic support be negotiated in SaaS contracts?",
    "SaaS customers depend on the provider for logs and data, so availability, retention and response times must be agreed in advance."
   ]
  ]
 },
 {
  "t": "Communicating with relevant parties: customers, vendors, partners, regulators and other stakeholders",
  "body": [
   "Cloud operations involve many parties, and security depends on the right people receiving the right information at the right time. The CCSP outline includes communication as its own objective because failures in communication, such as a late breach notification or a provider change nobody passed on, cause real damage.",
   "Customers need to know about service changes, planned maintenance, incidents that affect them, and how their data is protected. Communication should be timely, accurate and consistent with contracts and service level agreements. When an incident affects customer data, legal and regulatory notification rules often set deadlines and content, so communication plans should be prepared in advance with approved templates and clear authority for who may speak publicly.",
   "Vendors and cloud providers communicate with you through status pages, security bulletins, change notices and support channels. Someone in your organization must monitor those channels and act on them, for example when a provider announces the deprecation of an old TLS version or a change in a shared responsibility boundary. Contracts should define how the provider will notify you of breaches, incidents and material changes, and within what time. Partners, such as integrators, managed service providers and companies that exchange data with you, need agreed escalation contacts and procedures so incidents that cross organizational boundaries are handled jointly.",
   "Regulators require specific communication: mandatory breach notifications within legal deadlines (the GDPR, for example, generally requires notifying the supervisory authority within 72 hours of becoming aware of a qualifying personal data breach), periodic compliance reports and responses to inquiries. Other stakeholders include senior management and the board, who need risk-focused summaries rather than technical detail; employees, who need clear instructions; law enforcement; insurers; and sometimes the media. A communication plan maps each stakeholder to what they need, when, from whom and through which channel, and it is exercised along with the incident response plan."
  ],
  "terms": [
   [
    "Stakeholder",
    "Any person or organization affected by, or with an interest in, a service or incident."
   ],
   [
    "Breach notification",
    "A legally or contractually required notice to regulators or affected individuals after certain data breaches."
   ],
   [
    "Status page",
    "A provider's public page reporting current service health, incidents and maintenance."
   ],
   [
    "Communication plan",
    "A documented plan stating who communicates what to which stakeholders, when and through which channels."
   ]
  ],
  "example": "A SaaS provider detects unauthorized access to one customer database. Its prepared communication plan kicks in: legal assesses notification duties, the affected customer is informed within the contractual 24 hours through its named security contact, the regulator is notified inside the legal deadline and the board receives a one-page risk summary.",
  "tip": "Communication must follow authority and contracts. In exam scenarios, technical staff should not make public statements on their own; they escalate to the designated communications and legal functions.",
  "check": [
   [
    "Why should breach notification templates be prepared in advance?",
    "Legal deadlines are short and content is regulated, so prepared, approved templates allow fast, accurate notices."
   ],
   [
    "What should a contract specify about provider communications?",
    "How and how quickly the provider will notify the customer of incidents, breaches and material changes, and the contact points."
   ],
   [
    "What kind of information does the board need after an incident?",
    "A concise summary of business impact, risk, actions taken and decisions required, not technical detail."
   ]
  ]
 },
 {
  "t": "Security operations: SOC, intelligent monitoring of security controls, log capture and analysis (SIEM), incident management and vulnerability assessments",
  "body": [
   "Security operations is where controls, logs and people come together to detect and respond to threats continuously. The CCSP outline groups the security operations center, monitoring, log analysis, incident management and vulnerability assessment into one objective.",
   "A security operations center (SOC) is the team, processes and tools that monitor the environment, triage alerts, investigate and coordinate response, often around the clock. It may be in-house, outsourced to a managed security service provider or a hybrid. Intelligent monitoring of security controls means checking not only for attacks but also that controls themselves keep working: that logging is still enabled, encryption settings have not changed, firewalls and web application firewalls are in place and security agents are reporting. In the cloud, provider-native services detect threats and misconfigurations, and cloud security posture management reports drift from policy.",
   "Log capture and analysis centers on a security information and event management (SIEM) platform, which collects logs from cloud services, identities, endpoints, networks and applications, normalizes them, correlates events and generates alerts. Security orchestration, automation and response (SOAR) tools add playbooks that automate routine responses, such as disabling a compromised key or isolating an instance. Tuning is continuous: too many false positives cause alert fatigue and real attacks get missed.",
   "Incident management for security follows a lifecycle, for example NIST's preparation; detection and analysis; containment, eradication and recovery; and post-incident activity. In the cloud, preparation includes having access, tools and provider contacts ready, and knowing what logs exist. Containment often uses cloud controls: revoking credentials, changing security groups, snapshotting for evidence. Lessons learned should feed back into controls and plans. Vulnerability assessments find weaknesses before attackers do: authenticated scans of instances and images, container image scanning, configuration assessment and application testing, with results prioritized by severity, exploitability and exposure. Always follow the provider's testing policy, and remember that in SaaS you usually rely on the provider's own assessments and reports."
  ],
  "terms": [
   [
    "SOC",
    "Security operations center: the team and capability that continuously monitors, detects, investigates and coordinates response to security events."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response: tools that automate and coordinate incident response steps through playbooks."
   ],
   [
    "Alert fatigue",
    "Desensitization caused by too many alerts, especially false positives, leading analysts to miss real threats."
   ],
   [
    "Authenticated scan",
    "A vulnerability scan that logs in to systems to inspect installed software and configuration in detail."
   ]
  ],
  "example": "A SOAR playbook detects that an access key has been used from an anonymizing network to list storage buckets. Within a minute it disables the key, tags the affected identity, opens an incident ticket with the related SIEM events and pages the on-call analyst, who confirms the compromise and begins scoping.",
  "tip": "In the incident lifecycle, containment comes before eradication and recovery. In the cloud, the first containment step is often revoking or disabling compromised credentials.",
  "check": [
   [
    "What does intelligent monitoring of security controls check besides attacks?",
    "That the controls themselves remain in place and working, such as logging, encryption settings and agents."
   ],
   [
    "What is the benefit of SOAR?",
    "It automates repetitive response actions through playbooks, speeding containment and reducing analyst workload."
   ],
   [
    "Why use authenticated vulnerability scans?",
    "They see installed software and configuration in detail, finding more real vulnerabilities with fewer false positives."
   ]
  ]
 },
 {
  "t": "Using AI and ML in security operations: anomaly detection, automation and their limits",
  "body": [
   "Cloud environments generate far more security data than people can read, so security teams increasingly use machine learning and AI to help. The 2026 CCSP outline recognizes AI and ML as tools for threat detection, and you should understand both what they do well and where they need human judgment.",
   "Anomaly detection is the most established use. A model learns a baseline of normal behavior, such as when a user usually signs in, from which locations, which APIs a service normally calls or how much data an account typically downloads, and flags significant deviations. User and entity behavior analytics (UEBA) applies this to people and service accounts. Cloud providers' threat detection services use similar models to spot unusual API activity, cryptomining, credential misuse and data exfiltration. Unlike signature-based detection, anomaly detection can catch new attacks that match no known pattern.",
   "Generative AI assistants now help analysts summarize incidents, explain alerts in plain language, write detection queries, draft reports and suggest next steps. Combined with SOAR automation, AI can enrich alerts with context and trigger containment actions. These uses save time, especially for junior analysts, and let the team focus on complex investigations.",
   "The limits matter as much as the benefits. Anomaly models produce false positives when behavior legitimately changes, such as a new project or a holiday, and false negatives when attackers move slowly to blend into the baseline. Models trained on data that already contains attacker activity treat it as normal. Generative models can state wrong conclusions confidently, so their output must be verified before it drives decisions, and automated actions should have guardrails and human approval for high-impact steps such as deleting resources. AI systems also create their own attack surface: prompt injection through log content, poisoning of training data and leakage of sensitive incident data to external services. Govern security AI like any other critical tool: validate it, monitor its accuracy, restrict its permissions and keep people accountable for the decisions."
  ],
  "terms": [
   [
    "Anomaly detection",
    "Identifying events that deviate significantly from a learned baseline of normal behavior."
   ],
   [
    "UEBA",
    "User and entity behavior analytics: analysis of the behavior of users, devices and service accounts to detect threats."
   ],
   [
    "False negative",
    "A real malicious event that a detection system fails to flag."
   ],
   [
    "Human in the loop",
    "A design in which a person reviews or approves decisions before an automated system acts on them."
   ]
  ],
  "example": "A UEBA model flags that a finance service account, which normally reads a few hundred records a day, has read two million in an hour. An AI assistant summarizes related events for the analyst, who confirms a stolen key; the SOAR playbook then disables it after the analyst approves.",
  "tip": "AI supports, but does not replace, human accountability. In exam scenarios, prefer answers that validate AI output and keep a human approval step for high-impact automated actions.",
  "check": [
   [
    "What advantage does anomaly detection have over signature-based detection?",
    "It can detect new or unknown attacks that match no existing signature."
   ],
   [
    "How can a patient attacker defeat anomaly detection?",
    "By acting slowly and within normal patterns so the activity blends into, or becomes part of, the learned baseline."
   ],
   [
    "Why should generative AI output be verified before acting on it?",
    "Models can produce confident but incorrect conclusions, and they can be manipulated by injected content."
   ]
  ]
 },
 {
  "t": "Legal requirements and unique risks in the cloud: conflicting international law, eDiscovery (ISO/IEC 27050, CSA guidance) and forensic requirements",
  "body": [
   "The cloud lets data cross borders in milliseconds, but laws stop at borders. Domain 6 starts with the legal risks that arise when data, providers and customers are in different jurisdictions, and with the legal processes, eDiscovery and forensics, that depend on getting data back out of the cloud.",
   "Conflicting international law is a core concern. A provider headquartered in one country may be compelled by that country's laws to disclose data stored in another, while the second country's privacy law forbids the disclosure. Laws on data localization may require certain data to stay in-country. Export controls restrict some technologies and data. Customers must understand where data is stored and processed, where the provider and its subcontractors are based, and which laws could reach the data. Useful tools include choosing regions deliberately, contractual commitments on location and on how the provider handles government requests, and encryption with customer-controlled keys so that data disclosed without the customer's cooperation is unreadable. Legal frameworks to know include national constitutions and statutes, administrative regulations, contract law and the difference between criminal and civil law, plus doctrines such as the duty of care.",
   "Electronic discovery (eDiscovery) is the process of identifying, preserving, collecting, reviewing and producing electronically stored information for litigation or investigations. ISO/IEC 27050 is the international standard series for eDiscovery, and the Cloud Security Alliance's security guidance discusses cloud-specific challenges. In the cloud, the customer may not know every location where relevant data lives, may lack tools to search it, and may depend on the provider to preserve and export it. Contracts should cover preservation capabilities, legal hold, export formats, costs and response times.",
   "Forensic requirements follow the same logic. Courts expect evidence to be collected in a sound, documented way with a chain of custody. Multitenancy makes provider-side collection difficult because systems hold other customers' data. Plan in advance: know which logs and snapshots you can collect yourself, negotiate forensic cooperation, and understand that a foreign provider may need a legal process in its own jurisdiction to release data."
  ],
  "terms": [
   [
    "Jurisdiction",
    "The legal authority of a court or government over people, organizations and data within a territory."
   ],
   [
    "eDiscovery",
    "The identification, preservation, collection, review and production of electronically stored information for legal matters."
   ],
   [
    "ISO/IEC 27050",
    "The international standard series providing guidance on electronic discovery."
   ],
   [
    "Data localization",
    "A legal requirement that certain data be stored or processed within a specific country."
   ]
  ],
  "example": "A European retailer using a provider headquartered abroad is asked by its regulator how it would respond to a foreign government request for customer data. It shows that data is stored in EU regions, that the contract obliges the provider to challenge and notify it of requests where lawful, and that sensitive data is encrypted with keys held in the retailer's own HSM.",
  "tip": "When a question involves data in several countries, think about the strictest applicable law and about where the provider is headquartered, not only where the data center is.",
  "check": [
   [
    "Why can a provider's headquarters location matter even if data is stored in another country?",
    "The provider may be subject to its home country's laws that compel disclosure of data it controls anywhere."
   ],
   [
    "What does ISO/IEC 27050 cover?",
    "Electronic discovery: identification, preservation, collection, processing, review and production of electronically stored information."
   ],
   [
    "Name one contractual term that supports eDiscovery in SaaS.",
    "Examples: legal hold capability, data export in usable formats, preservation periods, response times and costs."
   ]
  ]
 },
 {
  "t": "Privacy issues: contractual vs regulated private data, country-specific laws (GDPR, HIPAA, GLBA), jurisdictional differences and privacy impact assessments",
  "body": [
   "Privacy is about the rights of individuals over information that identifies them. The CCSP exam asks you to distinguish types of private data, know the major laws at a high level, understand how they differ between jurisdictions and use privacy impact assessments to manage risk.",
   "Contractual private data is protected because a contract says so, for example a customer agreement promising that personal information will be used only for a stated purpose, or the payment card rules merchants accept. Regulated private data is protected by law, such as health information or personal data of EU residents. The distinction matters because the consequences, enforcement bodies and notification duties differ. Personally identifiable information (PII) is any information that can identify a person directly or indirectly; protected health information (PHI) is a US health-sector category.",
   "The EU General Data Protection Regulation (GDPR) applies to organizations that process personal data of people in the EU, wherever the organization is based. It defines controllers, who decide the purposes and means of processing, and processors, who act on their behalf, which in the cloud is usually the provider. It sets principles such as lawfulness, purpose limitation, data minimization, accuracy, storage limitation, integrity and confidentiality, and accountability, and it grants rights such as access, rectification and erasure. Transfers outside the EU need a legal basis, such as an adequacy decision or standard contractual clauses. In the US, privacy law is sector-based: HIPAA covers health information held by covered entities and their business associates (a cloud provider storing PHI signs a business associate agreement), GLBA covers financial institutions' customer information, and states have their own laws. Other countries have their own frameworks, such as Canada's PIPEDA and Japan's APPI.",
   "A privacy impact assessment (PIA), called a data protection impact assessment (DPIA) under the GDPR when processing is likely to create high risk, is done before a new system or process that handles personal data. It describes what data is collected, why, how it flows, who can access it, how long it is kept and which risks it creates for individuals, then records measures to reduce those risks. In the cloud, include the provider's role, locations and subprocessors."
  ],
  "terms": [
   [
    "Data controller",
    "The party that determines the purposes and means of processing personal data and is accountable for it."
   ],
   [
    "Data processor",
    "A party that processes personal data on behalf of the controller, such as a cloud provider."
   ],
   [
    "Business associate agreement (BAA)",
    "A HIPAA-required contract under which a service provider agrees to protect PHI it handles for a covered entity."
   ],
   [
    "Privacy impact assessment (PIA)",
    "An assessment of how a project collects, uses and protects personal data and what privacy risks it creates."
   ]
  ],
  "example": "A US clinic wants to move patient scheduling to a SaaS tool. Before signing, it confirms the provider will sign a business associate agreement, runs a privacy impact assessment covering data flows and subprocessors, and restricts the tool's data fields to the minimum needed for scheduling.",
  "tip": "The customer is normally the controller and the cloud provider the processor. Outsourcing processing never transfers the controller's accountability.",
  "check": [
   [
    "What is the difference between contractual and regulated private data?",
    "Contractual data is protected by agreements between parties; regulated data is protected by law with legal enforcement."
   ],
   [
    "Which US law covers customer financial information held by financial institutions?",
    "The Gramm-Leach-Bliley Act (GLBA)."
   ],
   [
    "When should a privacy impact assessment be done?",
    "Before implementing a new system or process that handles personal data, or before a significant change to one."
   ]
  ]
 },
 {
  "t": "Audit process, methodologies and adaptations for cloud: internal vs external audit, assurance challenges of virtualization, SOC reports, gap analysis, audit planning",
  "body": [
   "An audit is an independent, evidence-based examination of whether controls meet a defined standard. Auditing cloud services is different because the customer cannot inspect the provider's systems directly and because shared, virtualized infrastructure is hard to observe.",
   "Internal audit is performed by the organization's own audit function, which reports to the board or audit committee to stay independent of the areas it reviews. It provides ongoing assurance and prepares for external audits. External audit is performed by an independent third party, often required by regulators, contracts or certification schemes, and its opinion carries more weight with outsiders. Customers generally do not get a right to audit a large public provider themselves; instead they rely on the provider's third-party reports. Smaller or specialized providers may accept customer audits if the contract grants a right to audit.",
   "Virtualization creates assurance challenges. Workloads move between hosts, resources are shared among tenants and instances may exist for minutes, so traditional sampling of fixed servers does not work. Auditors must look at automated controls, configuration baselines, logs and the processes that create resources, and must understand the shared responsibility split to know which controls belong to whom. SOC reports, issued under AICPA standards, are the most common evidence. SOC 1 covers controls relevant to customers' financial reporting. SOC 2 covers the trust services criteria (security, availability, processing integrity, confidentiality and privacy) and is restricted to informed users. SOC 3 is a short, general-use summary without detailed test results. Type I reports assess design at a point in time; Type II reports test operating effectiveness over a period. Always read the complementary user entity controls section, which lists what the customer must do for the provider's controls to work.",
   "A gap analysis compares the current state against a target standard or regulation and lists missing or weak controls, and it is often the first step before a certification audit. Audit planning defines objectives, scope (which services, regions and time period), criteria, methods, required evidence, roles and schedule. In the cloud, the scope must say clearly which parts are the provider's and how they will be assured."
  ],
  "terms": [
   [
    "Right to audit",
    "A contract clause allowing the customer, or its auditor, to audit the provider's controls."
   ],
   [
    "SOC 3",
    "A general-use summary report on a service organization's controls against the trust services criteria, without detailed test results."
   ],
   [
    "Complementary user entity controls (CUECs)",
    "Controls a customer must implement for the provider's controls described in a SOC report to be effective."
   ],
   [
    "Gap analysis",
    "A comparison of current controls with a target standard to identify what is missing or inadequate."
   ]
  ],
  "example": "Preparing for an ISO/IEC 27001 certification of its SaaS product, a company runs a gap analysis against the standard's requirements, finds that supplier management and log review are undocumented, fixes them over three months and then plans the external audit, scoping it to the production environment in two regions.",
  "tip": "SOC 1 is about financial reporting controls; SOC 2 is about security and the other trust services criteria; SOC 3 is the public summary. For cloud security due diligence, a SOC 2 Type II report is usually the right evidence.",
  "check": [
   [
    "Why do most public cloud customers not audit the provider directly?",
    "Large providers serve many customers and generally do not grant individual audit rights, so they provide independent third-party reports instead."
   ],
   [
    "What must a customer check in the complementary user entity controls section?",
    "The controls the customer itself must operate for the provider's described controls to be effective."
   ],
   [
    "What does a gap analysis produce?",
    "A list of missing or inadequate controls compared with the target standard or regulation."
   ]
  ]
 },
 {
  "t": "Implications of cloud for enterprise risk management: data owner/controller vs custodian/processor, regulatory transparency, risk treatment",
  "body": [
   "Enterprise risk management (ERM) is how an organization identifies and manages risks across the whole business, not just in IT. Adopting cloud services moves some activities to providers but leaves the organization responsible for the outcomes, and ERM has to reflect that.",
   "Roles are central. The data owner, or data controller in privacy terms, is accountable for the data: deciding its classification, who may use it, for what purpose and how long it is kept. The data custodian, or data processor, handles the data on the owner's behalf and implements the controls the owner requires. When an organization uses a cloud provider, the organization usually remains the owner and controller, while the provider acts as custodian or processor for the parts of the stack it runs. The owner can delegate tasks but not accountability. That is why contracts must spell out the provider's obligations, and why the owner must monitor the provider through reports, metrics and reviews.",
   "Regulatory transparency means being able to show regulators, auditors and customers how data is handled and protected. The organization must know where data is, who can access it, which subprocessors are involved, and what incidents have occurred. Providers support this by publishing certifications, subprocessor lists, data location commitments and transparency reports on government requests. If you cannot explain your data handling, you cannot demonstrate compliance, which is itself a compliance failure under laws built on accountability.",
   "Risk treatment options are the same in the cloud but look different. Mitigation uses controls such as encryption, IAM and monitoring. Transfer shifts financial impact through insurance or contract terms, such as indemnities and service credits, but never transfers accountability or reputational harm. Avoidance means not putting certain data or workloads in the cloud, or choosing a different service. Acceptance means knowingly living with a risk within the organization's risk appetite, documented and approved by the right level of management. Residual risk is what remains after treatment and must be within appetite. Cloud adoption should be recorded in the risk register with owners and review dates, and reassessed as services and threats change."
  ],
  "terms": [
   [
    "Enterprise risk management (ERM)",
    "An organization-wide approach to identifying, assessing and treating risks in line with business objectives."
   ],
   [
    "Risk appetite",
    "The amount and type of risk an organization is willing to accept in pursuit of its objectives."
   ],
   [
    "Residual risk",
    "The risk that remains after controls and other treatments have been applied."
   ],
   [
    "Risk transfer",
    "Shifting the financial consequences of a risk to another party, for example through insurance or contract terms."
   ]
  ],
  "example": "A retailer's board approves moving customer analytics to SaaS. The risk register records the provider as processor, mitigation through encryption and SSO, transfer of some financial risk through cyber insurance, and acceptance of the residual risk of a provider outage, signed off by the chief operating officer as within appetite.",
  "tip": "Insurance and contracts can transfer financial loss, but accountability stays with the data owner. If an answer claims the provider becomes accountable for the customer's data, it is wrong.",
  "check": [
   [
    "Who is normally the data controller when a company uses a SaaS provider for customer data?",
    "The company; the SaaS provider is the processor."
   ],
   [
    "Why is regulatory transparency important in the cloud?",
    "Organizations must be able to demonstrate how data is handled and protected, including by providers, to prove compliance."
   ],
   [
    "Who should approve acceptance of a significant residual risk?",
    "Management with the appropriate authority, in line with the organization's risk appetite, not the security team alone."
   ]
  ]
 },
 {
  "t": "Risk frameworks and metrics: ISO/IEC 31000, ENISA cloud risk guidance, NIST SP 800-37, and assessing a provider's risk management",
  "body": [
   "Risk frameworks give structure and a shared language to risk management, so that decisions are consistent and defensible. The CCSP outline names several frameworks and asks you to understand metrics and how to judge whether a provider manages its own risks well.",
   "ISO/IEC 31000 provides principles and guidelines for risk management applicable to any organization and any type of risk. Its process is: establish scope, context and criteria; assess risk through identification, analysis and evaluation; treat risk; and support it all with communication and consultation, monitoring and review, and recording and reporting. It is not certifiable; it guides how to build a risk management approach. The European Union Agency for Cybersecurity (ENISA) published a well-known cloud computing risk assessment that catalogs cloud-specific risks in policy and organizational, technical and legal categories, such as lock-in, loss of governance, isolation failure, compliance challenges, management interface compromise, data protection and insecure or incomplete data deletion. NIST SP 800-37, the Risk Management Framework (RMF), gives a lifecycle for managing security and privacy risk of systems: prepare, categorize, select, implement, assess, authorize and monitor. It is mandatory for US federal systems and is the basis of FedRAMP authorization for cloud services.",
   "Metrics make risk management measurable. Key risk indicators (KRIs) warn that risk is rising, for example the number of critical vulnerabilities older than 30 days or the share of storage without encryption. Key performance indicators (KPIs) measure how well security processes work, such as mean time to detect and respond, patch compliance, or percentage of accounts with MFA. Good metrics are specific, measurable, tied to objectives and reviewed regularly by the people who can act on them.",
   "Assessing a provider's risk management means looking beyond its marketing. Review its certifications and their scope, SOC 2 Type II reports and any exceptions noted by the auditor, its CSA STAR entry, its incident history and transparency, its business continuity arrangements, financial stability, subprocessor management and how it handles vulnerabilities. Check that its risk appetite and practices are compatible with yours, and reassess periodically rather than only at contract signing."
  ],
  "terms": [
   [
    "ISO/IEC 31000",
    "An international standard giving principles and guidelines for risk management applicable to any organization."
   ],
   [
    "NIST Risk Management Framework",
    "The seven-step lifecycle in NIST SP 800-37: prepare, categorize, select, implement, assess, authorize and monitor."
   ],
   [
    "Key risk indicator (KRI)",
    "A metric that signals increasing exposure to a risk, used as an early warning."
   ],
   [
    "ENISA cloud risk assessment",
    "ENISA's analysis of cloud-specific risks across policy and organizational, technical and legal categories."
   ]
  ],
  "example": "A government agency evaluating a SaaS case-management tool requires it to hold a FedRAMP authorization, which reflects the NIST RMF process. The agency then reviews the provider's continuous monitoring deliverables every month, tracking open vulnerabilities as a key risk indicator.",
  "tip": "ISO/IEC 31000 is general risk management guidance and is not certifiable; NIST SP 800-37 is the system-level RMF behind FedRAMP; ENISA's work catalogs cloud-specific risks. Match the framework to the purpose in the question.",
  "check": [
   [
    "List the steps of the NIST RMF.",
    "Prepare, categorize, select, implement, assess, authorize and monitor."
   ],
   [
    "What is the difference between a KRI and a KPI?",
    "A KRI signals rising risk exposure; a KPI measures how well a process or control performs."
   ],
   [
    "Name two cloud-specific risks from the ENISA assessment.",
    "Examples: lock-in, loss of governance, isolation failure, compliance challenges, management interface compromise, incomplete data deletion."
   ]
  ]
 },
 {
  "t": "Outsourcing and cloud contract design: business requirements (SLA, MSA, SOW), vendor management and supply chain management (ISO/IEC 27036)",
  "body": [
   "In the cloud, the contract is one of your most important security controls. It is how you turn expectations about availability, data handling and incident response into obligations the provider must meet, and it is often the only lever you have once the service is running.",
   "Cloud agreements usually come as a set of documents. A master services agreement (MSA) sets the overall legal terms of the relationship: liability, indemnities, confidentiality, governing law, dispute resolution and termination. A statement of work (SOW) describes specific services, deliverables, timelines and costs for a particular engagement. A service level agreement (SLA) defines measurable service commitments, such as availability percentage, support response times and recovery objectives, how they are measured, and the remedy if they are missed, typically service credits. Many providers also publish acceptable use policies, data processing agreements for privacy obligations and shared responsibility documentation. Large public providers offer mostly standard terms, while smaller providers may negotiate.",
   "Key contract topics to check include data ownership and location, the right to audit or to receive assurance reports, security requirements, breach notification timing, subcontractor and subprocessor use, forensic and eDiscovery support, business continuity, change notification, liability limits, insurance, termination rights and exit terms. Exit is critical: the contract should specify how you will get your data back, in what format and time frame, and how the provider will delete it afterwards, so that you can leave without lock-in or loss.",
   "Vendor management is the ongoing process of overseeing providers after signing: tracking performance against SLAs, reviewing updated audit reports, reassessing risk, handling issues and planning for renewal or exit. Critical providers deserve more frequent and deeper review. Supply chain management extends this to the provider's own suppliers, because your data may pass through several companies. ISO/IEC 27036 is the multipart standard on information security for supplier relationships, including a part dedicated to the security of cloud services, and it guides how to define requirements, select suppliers and manage the relationship through its lifecycle."
  ],
  "terms": [
   [
    "Service level agreement (SLA)",
    "A contract component defining measurable service commitments and remedies if they are not met."
   ],
   [
    "Master services agreement (MSA)",
    "The overarching contract setting the legal terms that govern all work between the parties."
   ],
   [
    "Statement of work (SOW)",
    "A document describing specific services, deliverables, schedule and costs under the MSA."
   ],
   [
    "ISO/IEC 27036",
    "The international standard series on information security in supplier relationships, including cloud services."
   ]
  ],
  "example": "A hospital negotiating with a regional SaaS provider adds clauses requiring 99.9 percent monthly availability with service credits, breach notification within 24 hours, data stored only in-country, a list of subprocessors with advance notice of changes, and full data export in an open format within 30 days of termination followed by certified deletion.",
  "tip": "Service credits compensate for missed SLAs but rarely cover the real business loss. When an exam question asks how to protect against lock-in, look for exit and data portability terms in the contract.",
  "check": [
   [
    "Which document defines availability commitments and service credits?",
    "The service level agreement (SLA)."
   ],
   [
    "Why are exit terms important in cloud contracts?",
    "They ensure you can retrieve your data in a usable format and have it deleted, avoiding lock-in and data loss when leaving."
   ],
   [
    "What does vendor management add after the contract is signed?",
    "Ongoing monitoring of SLA performance, review of assurance reports, reassessment of risk and management of issues and exit."
   ]
  ]
 },
 {
  "t": "Policies for cloud: organizational and functional policies, and cloud computing policies",
  "body": [
   "Policies express management's intent and set the rules that standards, procedures and technical controls then implement. The CCSP outline asks you to understand how organizational and functional policies relate to cloud use and what a cloud computing policy should cover.",
   "Organizational policies are the high-level statements that apply across the enterprise, such as the information security policy, acceptable use policy, data classification policy and risk management policy. They are approved by senior management and give authority to the security program. Functional policies address specific areas in more detail, for example access control, encryption and key management, incident response, business continuity, backup, vendor management, logging and monitoring, and secure development. Existing policies usually need updating for cloud: an encryption policy written for on-premises servers may say nothing about who controls keys in a provider's service, and an incident response policy may not mention provider coordination.",
   "A cloud computing policy sets rules specific to cloud adoption and use. Common elements include who may approve and procure cloud services (to prevent shadow IT), mandatory security and legal review before adoption, approved providers and regions, which data classifications may be stored in which service models, required controls such as SSO, MFA, encryption and logging, tagging and ownership rules, cost accountability, and requirements for exit plans. It should align with the organization's risk appetite and with legal and contractual obligations.",
   "Policies only work if they are communicated, understood and enforced. In the cloud, many policy statements can be enforced automatically through policy as code, organization-wide guardrails, identity rules and configuration scanning, which turn written rules into preventive and detective controls. Policies also need owners, review cycles, an exception process with documented risk acceptance and a clear connection to standards and procedures. Make sure the provider's own policies, for example on data handling and staff access, are compatible with yours; where they are not, the contract must close the gap."
  ],
  "terms": [
   [
    "Organizational policy",
    "A high-level, management-approved statement of intent that applies across the whole organization."
   ],
   [
    "Functional policy",
    "A policy governing a specific security area, such as access control or incident response."
   ],
   [
    "Guardrail",
    "An automated organization-wide control that prevents or detects actions that violate policy in cloud accounts."
   ],
   [
    "Policy exception",
    "A documented, approved and time-limited deviation from a policy, with the associated risk accepted by the right authority."
   ]
  ],
  "example": "A university's new cloud computing policy states that restricted research data may only be stored in approved providers' EU regions with customer-managed keys. The cloud team implements this as organization-wide guardrails that block other regions and refuse storage without the required encryption setting.",
  "tip": "Policy comes first and is high level; standards and procedures implement it. When a question asks what should be in place before approving cloud services across the organization, a cloud policy approved by management is usually the answer.",
  "check": [
   [
    "Give two examples of functional policies that need cloud updates.",
    "Examples: encryption and key management, incident response, logging and monitoring, vendor management, backup."
   ],
   [
    "What problem does a rule on who may procure cloud services address?",
    "Shadow IT: unapproved cloud services adopted without security or legal review."
   ],
   [
    "How can cloud policies be enforced automatically?",
    "Through policy as code, organization-wide guardrails, identity rules and configuration scanning."
   ]
  ]
 },
 {
  "t": "AI regulation and ethics in the cloud: regulatory requirements, bias, transparency and accountability",
  "body": [
   "The 2026 CCSP outline adds AI to the legal, risk and compliance domain because regulators and courts now treat AI systems as something organizations must govern. When an organization uses cloud AI services to make or support decisions about people, it takes on legal and ethical responsibilities that the provider does not carry for it.",
   "Regulatory requirements are developing quickly and vary by jurisdiction. The European Union's AI Act takes a risk-based approach: some practices are prohibited, high-risk systems (for example in employment, credit, education and critical infrastructure) face requirements for risk management, data governance, documentation, human oversight, accuracy and security, and certain systems carry transparency duties, such as telling people they are interacting with AI. Existing laws also apply to AI: data protection law governs personal data used in training and prompts and gives rights around automated decision-making, anti-discrimination law applies to biased outcomes, and consumer protection law applies to misleading AI claims. Standards and frameworks such as ISO/IEC 42001 (AI management systems) and the NIST AI Risk Management Framework help organizations show that they govern AI responsibly.",
   "Ethical concerns focus on a few recurring themes. Bias arises when training data or model design produces unfair outcomes for particular groups; it must be tested for, measured and mitigated, not assumed away. Transparency and explainability mean people affected by an AI-supported decision should know AI was used and be able to get a meaningful explanation. Privacy covers minimizing personal data and respecting purpose limits. Safety and reliability require testing and monitoring for errors and misuse.",
   "Accountability ties these together. A named owner should be responsible for each AI system, with documented purpose, data sources, testing results and limitations. Keep humans in the loop for significant decisions, log inputs and outputs where lawful, monitor performance for drift, provide a route for people to challenge decisions, and review AI suppliers' contracts for data use, security, incident notification and support for your compliance obligations."
  ],
  "terms": [
   [
    "EU AI Act",
    "The European Union's risk-based regulation of artificial intelligence systems, with obligations that increase with risk."
   ],
   [
    "Algorithmic bias",
    "Systematic and unfair differences in an AI system's outcomes for particular groups of people."
   ],
   [
    "Explainability",
    "The ability to describe in understandable terms how an AI system reached a particular output or decision."
   ],
   [
    "ISO/IEC 42001",
    "An international standard specifying requirements for an AI management system."
   ]
  ],
  "example": "A bank wants to use a cloud AI model to pre-screen loan applications. Its AI governance board classifies the use as high risk, requires bias testing across protected groups, a human underwriter to review every rejection, plain-language explanations for applicants and a contract clause preventing the provider from training on applicant data.",
  "tip": "Using a provider's AI service does not transfer accountability for decisions made with it. For AI ethics questions, favor answers with human oversight, bias testing, transparency to affected people and a named accountable owner.",
  "check": [
   [
    "How does the EU AI Act decide obligations?",
    "By risk level: prohibited practices, high-risk systems with strict requirements, transparency duties for some systems, and minimal obligations for low-risk uses."
   ],
   [
    "What is algorithmic bias?",
    "Systematic, unfair differences in AI outcomes for particular groups, often caused by training data or model design."
   ],
   [
    "Name two accountability measures for an AI system.",
    "Examples: a named owner, documented purpose and limitations, human review of significant decisions, logging, performance monitoring and a way to challenge decisions."
   ]
  ]
 },
 {
  "t": "Specialized compliance requirements: PCI DSS, FedRAMP, HIPAA, NERC CIP and certification scope",
  "body": [
   "Some data and industries carry compliance requirements beyond general privacy law. When such data goes into the cloud, the organization must know which rules apply, how responsibilities are split with the provider, and whether the provider's certifications actually cover the services in use.",
   "The Payment Card Industry Data Security Standard (PCI DSS) applies to any organization that stores, processes or transmits cardholder data. It is a contractual standard enforced through the card brands and acquiring banks, not a law. In the cloud, the provider can be assessed as a PCI DSS compliant service provider for its infrastructure, but the customer remains responsible for its own systems and configurations within the cardholder data environment. A responsibility matrix from the provider shows which requirements are the provider's, the customer's or shared. Reducing scope, for example through tokenization or outsourcing payment pages to a compliant payment processor, reduces the customer's burden.",
   "FedRAMP, the US Federal Risk and Authorization Management Program, standardizes security assessment and authorization of cloud services used by US federal agencies. It is based on NIST SP 800-53 controls and the NIST Risk Management Framework, with impact levels of low, moderate and high, and requires continuous monitoring after authorization. HIPAA applies to US health information held by covered entities and their business associates; a cloud provider handling protected health information signs a business associate agreement and must implement required safeguards. NERC CIP (Critical Infrastructure Protection) standards apply to the bulk electric system in North America, with strict requirements for protecting cyber assets that support grid operations; moving such systems or their data to the cloud requires careful analysis of which requirements apply.",
   "Certification scope is the trap to watch for. A provider may hold PCI DSS, FedRAMP or ISO certifications for some services and regions but not others. Check the provider's published list of in-scope services, confirm that every service you plan to use for regulated data is covered, and remember that the provider's certification never certifies your own use of the service. Your configurations, applications and processes still need their own compliance evidence."
  ],
  "terms": [
   [
    "PCI DSS",
    "The Payment Card Industry Data Security Standard, which sets security requirements for entities handling cardholder data."
   ],
   [
    "FedRAMP",
    "The US government program that standardizes security assessment, authorization and continuous monitoring of cloud services for federal use."
   ],
   [
    "NERC CIP",
    "North American Electric Reliability Corporation Critical Infrastructure Protection standards for the bulk electric system."
   ],
   [
    "Responsibility matrix",
    "A provider document mapping each compliance requirement to the provider, the customer or both."
   ]
  ],
  "example": "An online retailer assumes its whole checkout is PCI DSS compliant because its cloud provider holds a PCI attestation. During assessment, the auditor finds that one managed service used for order processing is not in the provider's PCI scope and that the retailer's own logging configuration fails a requirement, so both must be fixed.",
  "tip": "A provider's certification covers only the listed services and the provider's own responsibilities. If a question asks what the customer must verify, choose confirming that the specific services used are in scope and that the customer's own controls are compliant.",
  "check": [
   [
    "Is PCI DSS a law?",
    "No; it is an industry standard enforced contractually through card brands and acquiring banks."
   ],
   [
    "Which control catalog underlies FedRAMP?",
    "NIST SP 800-53, applied through the NIST Risk Management Framework."
   ],
   [
    "Why must certification scope be checked service by service?",
    "Providers certify specific services and regions; using an out-of-scope service for regulated data breaks compliance."
   ]
  ]
 }
], { reviewed: "2026-09-29" });
