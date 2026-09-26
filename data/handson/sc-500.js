/* Hands-on exercises for Microsoft Cloud and AI Security Engineer (SC-500). Checked by tools/check-data.js (and tools/check-python.js for Python). */
CertHub.addHandson("sc-500", {
  tables: {
    SecurityAlert: [
      {"TimeGenerated":"2026-09-18T07:40:00Z","AlertName":"Suspicious sign-in to a virtual machine from an unusual location","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-web-01","ResourceGroup":"rg-web","Status":"Resolved"},
      {"TimeGenerated":"2026-09-18T10:15:00Z","AlertName":"Access from a suspicious IP address to a storage account","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Storage","CompromisedEntity":"stfinance01","ResourceGroup":"rg-data","Status":"Resolved"},
      {"TimeGenerated":"2026-09-18T13:30:00Z","AlertName":"Unusual volume of data extracted from a key vault","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"KeyVault","CompromisedEntity":"kv-prod-01","ResourceGroup":"rg-shared","Status":"InProgress"},
      {"TimeGenerated":"2026-09-18T16:05:00Z","AlertName":"Malicious blob uploaded to storage account (malware scanning)","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Storage","CompromisedEntity":"stuploads01","ResourceGroup":"rg-web","Status":"New"},
      {"TimeGenerated":"2026-09-19T02:20:00Z","AlertName":"Brute force attempt against RDP detected","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-jump-01","ResourceGroup":"rg-mgmt","Status":"Resolved"},
      {"TimeGenerated":"2026-09-19T09:45:00Z","AlertName":"Potential SQL injection detected","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"SQL","CompromisedEntity":"sql-orders/ordersdb","ResourceGroup":"rg-data","Status":"InProgress"},
      {"TimeGenerated":"2026-09-19T11:10:00Z","AlertName":"Jailbreak attempt on an AI model deployment blocked by Prompt Shields","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"AI","CompromisedEntity":"aoai-support-bot","ResourceGroup":"rg-ai","Status":"New"},
      {"TimeGenerated":"2026-09-19T14:25:00Z","AlertName":"Privileged container detected","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Containers","CompromisedEntity":"aks-prod-01","ResourceGroup":"rg-aks","Status":"New"},
      {"TimeGenerated":"2026-09-19T20:00:00Z","AlertName":"Suspicious process executed on a virtual machine","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-app-02","ResourceGroup":"rg-app","Status":"New"},
      {"TimeGenerated":"2026-09-20T03:35:00Z","AlertName":"Login from an unusual location to SQL server","AlertSeverity":"Low","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"SQL","CompromisedEntity":"sql-orders","ResourceGroup":"rg-data","Status":"Resolved"},
      {"TimeGenerated":"2026-09-20T08:50:00Z","AlertName":"Credential theft attempt on an AI model deployment","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"AI","CompromisedEntity":"aoai-support-bot","ResourceGroup":"rg-ai","Status":"New"},
      {"TimeGenerated":"2026-09-20T12:00:00Z","AlertName":"Anonymous access to a storage container","AlertSeverity":"Low","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Storage","CompromisedEntity":"stpublicweb01","ResourceGroup":"rg-web","Status":"New"},
      {"TimeGenerated":"2026-09-20T15:40:00Z","AlertName":"Web shell activity pattern detected on App Service","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"AppServices","CompromisedEntity":"app-portal-01","ResourceGroup":"rg-web","Status":"Resolved"},
      {"TimeGenerated":"2026-09-21T01:15:00Z","AlertName":"Access from a TOR exit node to a key vault","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"KeyVault","CompromisedEntity":"kv-prod-01","ResourceGroup":"rg-shared","Status":"New"},
      {"TimeGenerated":"2026-09-21T09:05:00Z","AlertName":"Suspicious sign-in to a virtual machine from an unusual location","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-web-01","ResourceGroup":"rg-web","Status":"New"},
      {"TimeGenerated":"2026-09-21T10:30:00Z","AlertName":"Sensitive data exposure detected in AI model response","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"AI","CompromisedEntity":"aoai-hr-assistant","ResourceGroup":"rg-ai","Status":"InProgress"},
      {"TimeGenerated":"2026-09-21T18:45:00Z","AlertName":"Digital currency mining container detected","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Containers","CompromisedEntity":"aks-dev-01","ResourceGroup":"rg-aks","Status":"New"},
      {"TimeGenerated":"2026-09-22T06:30:00Z","AlertName":"Brute force attempt against SSH detected","AlertSeverity":"Low","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-linux-03","ResourceGroup":"rg-app","Status":"Resolved"},
      {"TimeGenerated":"2026-09-22T11:55:00Z","AlertName":"Jailbreak attempt on an AI model deployment blocked by Prompt Shields","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"AI","CompromisedEntity":"aoai-support-bot","ResourceGroup":"rg-ai","Status":"New"},
      {"TimeGenerated":"2026-09-22T14:10:00Z","AlertName":"Unusual deletion of blobs in a storage account","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Storage","CompromisedEntity":"stfinance01","ResourceGroup":"rg-data","Status":"New"},
      {"TimeGenerated":"2026-09-23T04:20:00Z","AlertName":"Potential SQL brute force attempt","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"SQL","CompromisedEntity":"sql-orders","ResourceGroup":"rg-data","Status":"New"},
      {"TimeGenerated":"2026-09-23T09:15:00Z","AlertName":"Suspicious process executed on a virtual machine","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-app-02","ResourceGroup":"rg-app","Status":"InProgress"},
      {"TimeGenerated":"2026-09-23T16:00:00Z","AlertName":"Anomalous Kubernetes API call from a new service account","AlertSeverity":"Low","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Containers","CompromisedEntity":"aks-prod-01","ResourceGroup":"rg-aks","Status":"Resolved"},
      {"TimeGenerated":"2026-09-24T08:40:00Z","AlertName":"Jailbreak attempt on an AI model deployment blocked by Prompt Shields","AlertSeverity":"Medium","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"AI","CompromisedEntity":"aoai-hr-assistant","ResourceGroup":"rg-ai","Status":"New"},
      {"TimeGenerated":"2026-09-24T13:20:00Z","AlertName":"Informational: new public IP attached to a virtual machine","AlertSeverity":"Informational","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-web-02","ResourceGroup":"rg-web","Status":"New"},
      {"TimeGenerated":"2026-09-24T22:05:00Z","AlertName":"Unusual volume of data extracted from a key vault","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"KeyVault","CompromisedEntity":"kv-dev-01","ResourceGroup":"rg-dev","Status":"Resolved"},
      {"TimeGenerated":"2026-09-25T06:50:00Z","AlertName":"Suspicious outbound traffic to a known malicious domain from a VM","AlertSeverity":"High","ProductName":"Microsoft Defender for Cloud","ProductComponentName":"Servers","CompromisedEntity":"vm-web-01","ResourceGroup":"rg-web","Status":"New"}
    ],
    SecurityRecommendation: [
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Storage accounts should restrict network access","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Storage/storageAccounts","ResourceName":"stfinance01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Storage account public access should be disallowed","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Storage/storageAccounts","ResourceName":"stpublicweb01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Storage accounts should prevent shared key access","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Storage/storageAccounts","ResourceName":"stfinance01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Secure transfer to storage accounts should be enabled","RecommendationSeverity":"High","ResourceType":"Microsoft.Storage/storageAccounts","ResourceName":"stuploads01","RecommendationState":"Healthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Storage accounts should restrict network access","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Storage/storageAccounts","ResourceName":"stuploads01","RecommendationState":"Healthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Storage accounts should prevent shared key access","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Storage/storageAccounts","ResourceName":"stdevlogs01","RecommendationState":"Unhealthy","SubscriptionName":"sub-dev"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Management ports should be closed on your virtual machines","RecommendationSeverity":"High","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-jump-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Management ports should be closed on your virtual machines","RecommendationSeverity":"High","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-web-01","RecommendationState":"Healthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Machines should have vulnerability findings resolved","RecommendationSeverity":"High","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-app-02","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Machines should have vulnerability findings resolved","RecommendationSeverity":"High","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-linux-03","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Machines should have vulnerability findings resolved","RecommendationSeverity":"High","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-web-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Virtual machines should have secure boot enabled","RecommendationSeverity":"Low","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-web-02","RecommendationState":"Unhealthy","SubscriptionName":"sub-dev"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Management ports of virtual machines should be protected with just-in-time network access control","RecommendationSeverity":"High","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-app-02","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Management ports of virtual machines should be protected with just-in-time network access control","RecommendationSeverity":"High","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-jump-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"System updates should be installed on your machines","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Compute/virtualMachines","ResourceName":"vm-linux-03","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Kubernetes clusters should disable automounting API credentials","RecommendationSeverity":"High","ResourceType":"Microsoft.ContainerService/managedClusters","ResourceName":"aks-prod-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Privileged containers should be avoided","RecommendationSeverity":"High","ResourceType":"Microsoft.ContainerService/managedClusters","ResourceName":"aks-prod-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Privileged containers should be avoided","RecommendationSeverity":"High","ResourceType":"Microsoft.ContainerService/managedClusters","ResourceName":"aks-dev-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-dev"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Azure Kubernetes Service clusters should have Defender profile enabled","RecommendationSeverity":"High","ResourceType":"Microsoft.ContainerService/managedClusters","ResourceName":"aks-dev-01","RecommendationState":"Healthy","SubscriptionName":"sub-dev"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"App Service apps should only be accessible over HTTPS","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Web/sites","ResourceName":"app-portal-01","RecommendationState":"Healthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"App Service apps should use managed identity","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Web/sites","ResourceName":"app-portal-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"App Service apps should use the latest TLS version","RecommendationSeverity":"High","ResourceType":"Microsoft.Web/sites","ResourceName":"app-legacy-02","RecommendationState":"Unhealthy","SubscriptionName":"sub-dev"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Key vaults should have purge protection enabled","RecommendationSeverity":"Medium","ResourceType":"Microsoft.KeyVault/vaults","ResourceName":"kv-dev-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-dev"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Key vaults should have purge protection enabled","RecommendationSeverity":"Medium","ResourceType":"Microsoft.KeyVault/vaults","ResourceName":"kv-prod-01","RecommendationState":"Healthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Azure Key Vault should use RBAC permission model","RecommendationSeverity":"Medium","ResourceType":"Microsoft.KeyVault/vaults","ResourceName":"kv-dev-01","RecommendationState":"Unhealthy","SubscriptionName":"sub-dev"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"SQL servers should have a Microsoft Entra administrator provisioned","RecommendationSeverity":"High","ResourceType":"Microsoft.Sql/servers","ResourceName":"sql-orders","RecommendationState":"Healthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"Public network access on Azure SQL Database should be disabled","RecommendationSeverity":"Medium","ResourceType":"Microsoft.Sql/servers","ResourceName":"sql-orders","RecommendationState":"Unhealthy","SubscriptionName":"sub-prod"},
      {"TimeGenerated":"2026-09-24T02:00:00Z","RecommendationName":"SQL servers should have auditing enabled","RecommendationSeverity":"Low","ResourceType":"Microsoft.Sql/servers","ResourceName":"sql-reports","RecommendationState":"NotApplicable","SubscriptionName":"sub-dev"}
    ],
    AzureActivity: [
      {"TimeGenerated":"2026-09-18T08:30:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE","Caller":"lena@contoso.com","CallerIpAddress":"198.51.100.30","ResourceGroup":"rg-data","Resource":"rg-data","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-18T09:00:00Z","OperationNameValue":"MICROSOFT.COMPUTE/VIRTUALMACHINES/WRITE","Caller":"ivan@contoso.com","CallerIpAddress":"198.51.100.17","ResourceGroup":"rg-web","Resource":"vm-web-02","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-18T11:20:00Z","OperationNameValue":"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE","Caller":"ivan@contoso.com","CallerIpAddress":"198.51.100.17","ResourceGroup":"rg-web","Resource":"nsg-web/allow-https-inbound","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-18T15:45:00Z","OperationNameValue":"MICROSOFT.STORAGE/STORAGEACCOUNTS/LISTKEYS/ACTION","Caller":"app-portal-01 (managed identity)","CallerIpAddress":"198.51.100.200","ResourceGroup":"rg-data","Resource":"stfinance01","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-19T07:10:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/POLICYASSIGNMENTS/WRITE","Caller":"lena@contoso.com","CallerIpAddress":"198.51.100.30","ResourceGroup":"rg-data","Resource":"Deny public storage access","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-19T10:05:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE","Caller":"ivan@contoso.com","CallerIpAddress":"198.51.100.17","ResourceGroup":"rg-web","Resource":"rg-web","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-19T13:40:00Z","OperationNameValue":"MICROSOFT.RESOURCES/DEPLOYMENTS/WRITE","Caller":"dana@contoso.com","CallerIpAddress":"198.51.100.13","ResourceGroup":"rg-app","Resource":"deploy-app-release","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-20T02:55:00Z","OperationNameValue":"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE","Caller":"jules@contoso.com","CallerIpAddress":"203.0.113.45","ResourceGroup":"rg-mgmt","Resource":"nsg-jump/allow-rdp-from-any","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-20T03:02:00Z","OperationNameValue":"MICROSOFT.STORAGE/STORAGEACCOUNTS/LISTKEYS/ACTION","Caller":"jules@contoso.com","CallerIpAddress":"203.0.113.45","ResourceGroup":"rg-data","Resource":"stfinance01","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-20T03:10:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE","Caller":"jules@contoso.com","CallerIpAddress":"203.0.113.45","ResourceGroup":"rg-data","Resource":"rg-data","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-20T03:12:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE","Caller":"jules@contoso.com","CallerIpAddress":"203.0.113.45","ResourceGroup":"rg-shared","Resource":"rg-shared","ActivityStatusValue":"Failure","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-20T09:30:00Z","OperationNameValue":"MICROSOFT.COMPUTE/VIRTUALMACHINES/WRITE","Caller":"ivan@contoso.com","CallerIpAddress":"198.51.100.17","ResourceGroup":"rg-app","Resource":"vm-app-02","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-21T08:15:00Z","OperationNameValue":"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE","Caller":"ivan@contoso.com","CallerIpAddress":"198.51.100.17","ResourceGroup":"rg-app","Resource":"nsg-app/allow-sql-from-web-asg","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-21T11:00:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE","Caller":"lena@contoso.com","CallerIpAddress":"198.51.100.30","ResourceGroup":"rg-ai","Resource":"rg-ai","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-21T14:30:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/LOCKS/DELETE","Caller":"gina@contoso.com","CallerIpAddress":"198.51.100.15","ResourceGroup":"rg-shared","Resource":"kv-prod-01/lock-cannotdelete","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-21T14:34:00Z","OperationNameValue":"MICROSOFT.KEYVAULT/VAULTS/DELETE","Caller":"gina@contoso.com","CallerIpAddress":"198.51.100.15","ResourceGroup":"rg-shared","Resource":"kv-prod-01","ActivityStatusValue":"Failure","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-22T09:45:00Z","OperationNameValue":"MICROSOFT.RESOURCES/DEPLOYMENTS/WRITE","Caller":"dana@contoso.com","CallerIpAddress":"198.51.100.13","ResourceGroup":"rg-app","Resource":"deploy-app-release","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-22T16:20:00Z","OperationNameValue":"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE","Caller":"jules@contoso.com","CallerIpAddress":"203.0.113.45","ResourceGroup":"rg-mgmt","Resource":"nsg-jump/allow-ssh-from-any","ActivityStatusValue":"Failure","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-23T08:00:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE","Caller":"ivan@contoso.com","CallerIpAddress":"198.51.100.17","ResourceGroup":"rg-web","Resource":"rg-web","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-23T10:10:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/POLICYASSIGNMENTS/WRITE","Caller":"lena@contoso.com","CallerIpAddress":"198.51.100.30","ResourceGroup":"rg-aks","Resource":"Kubernetes clusters should not allow privileged containers","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-23T19:25:00Z","OperationNameValue":"MICROSOFT.KEYVAULT/VAULTS/DELETE","Caller":"omar@contoso.com","CallerIpAddress":"198.51.100.33","ResourceGroup":"rg-dev","Resource":"kv-dev-01","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-23T19:20:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/LOCKS/DELETE","Caller":"omar@contoso.com","CallerIpAddress":"198.51.100.33","ResourceGroup":"rg-dev","Resource":"rg-dev/lock-readonly","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-24T12:50:00Z","OperationNameValue":"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE","Caller":"lena@contoso.com","CallerIpAddress":"198.51.100.30","ResourceGroup":"rg-data","Resource":"rg-data","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-24T15:15:00Z","OperationNameValue":"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE","Caller":"ivan@contoso.com","CallerIpAddress":"198.51.100.17","ResourceGroup":"rg-web","Resource":"nsg-web/deny-all-inbound","ActivityStatusValue":"Success","CategoryValue":"Administrative"},
      {"TimeGenerated":"2026-09-25T06:05:00Z","OperationNameValue":"MICROSOFT.STORAGE/STORAGEACCOUNTS/LISTKEYS/ACTION","Caller":"jules@contoso.com","CallerIpAddress":"203.0.113.45","ResourceGroup":"rg-data","Resource":"stuploads01","ActivityStatusValue":"Success","CategoryValue":"Administrative"}
    ]
  },
  items: [
    {
      id: "open-high-alerts",
      kind: "kql",
      d: 4,
      tables: ["SecurityAlert"],
      title: "List open high-severity Defender alerts",
      prompt: "`SecurityAlert` holds alerts raised by the Microsoft Defender for Cloud workload protection plans. `Status` is \"New\", \"InProgress\" or \"Resolved\".\n\nReturn alerts with `AlertSeverity` \"High\" that are not resolved. Show `TimeGenerated`, `AlertName`, `ProductComponentName` and `CompromisedEntity`, sorted by `TimeGenerated` ascending.",
      starter: "SecurityAlert\n| where AlertSeverity == \"High\"\n| project TimeGenerated, AlertName, ProductComponentName, CompromisedEntity",
      hint: "Add `and Status != \"Resolved\"` to the filter and finish with a `sort by`.",
      solution: "SecurityAlert\n| where AlertSeverity == \"High\" and Status != \"Resolved\"\n| project TimeGenerated, AlertName, ProductComponentName, CompromisedEntity\n| sort by TimeGenerated asc",
      explain: "Triage starts with open high-severity alerts. ProductComponentName tells you which Defender plan fired (Servers, Storage, SQL, Key Vault, Containers, AI), which matters because each plan must be enabled per subscription and some, like malware scanning for Storage, are add-ons. In Sentinel these alerts become incidents through a Microsoft security analytics rule or the Defender XDR connector."
    },
    {
      id: "unhealthy-storage-recs",
      kind: "kql",
      d: 2,
      tables: ["SecurityRecommendation"],
      title: "Find unhealthy storage account recommendations",
      prompt: "`SecurityRecommendation` lists Defender for Cloud assessments per resource, with `RecommendationState` \"Healthy\", \"Unhealthy\" or \"NotApplicable\".\n\nReturn every unhealthy recommendation for storage accounts (`ResourceType` \"Microsoft.Storage/storageAccounts\"). Show `ResourceName` and `RecommendationName`, sorted by `ResourceName` ascending and then `RecommendationName` ascending.",
      hint: "Two conditions joined with `and`, then `project` the two columns and sort on both.",
      solution: "SecurityRecommendation\n| where RecommendationState == \"Unhealthy\" and ResourceType == \"Microsoft.Storage/storageAccounts\"\n| project ResourceName, RecommendationName\n| sort by ResourceName asc, RecommendationName asc",
      explain: "These map straight to storage hardening objectives: restrict network access with the storage firewall or a private endpoint, disallow anonymous blob access, and disable Shared Key so every request uses Microsoft Entra ID and data-plane RBAC (with user delegation SAS if SAS is still needed). Fixing unhealthy assessments raises secure score, and an Azure Policy Deny or Modify effect stops the drift coming back."
    },
    {
      id: "nsg-rule-changes",
      kind: "kql",
      d: 2,
      tables: ["AzureActivity"],
      title: "Audit NSG rule changes that succeeded",
      prompt: "Every control-plane change lands in `AzureActivity`. Writing an NSG security rule is recorded with `OperationNameValue` \"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE\".\n\nReturn successful NSG rule writes (`ActivityStatusValue` \"Success\"). Show `TimeGenerated`, `Caller`, `CallerIpAddress` and `Resource`, sorted by `TimeGenerated` ascending.",
      starter: "AzureActivity\n| where OperationNameValue has \"NETWORKSECURITYGROUPS\"\n| project TimeGenerated, Caller, CallerIpAddress, Resource",
      hint: "The starter also returns the failed attempt. Filter on the status column too, and sort. You can use `endswith \"SECURITYRULES/WRITE\"` or an exact `==`.",
      solution: "AzureActivity\n| where OperationNameValue == \"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE\" and ActivityStatusValue == \"Success\"\n| project TimeGenerated, Caller, CallerIpAddress, Resource\n| sort by TimeGenerated asc",
      explain: "A rule named allow-rdp-from-any, created at 02:55 from an address outside the admin range, is exactly the exposure Defender flags with \"Management ports should be closed\". The exam fixes: close management ports and use Azure Bastion or just-in-time VM access, use service tags and application security groups instead of Any, and let Virtual Network Manager security admin rules enforce guardrails that NSG owners cannot override."
    },
    {
      id: "vault-and-lock-deletes",
      kind: "kql",
      d: 1,
      tables: ["AzureActivity"],
      title: "Catch deletions of key vaults and resource locks",
      prompt: "Removing a resource lock and then deleting what it protected is a pattern worth alerting on.\n\nFrom `AzureActivity`, return rows whose `OperationNameValue` is \"MICROSOFT.KEYVAULT/VAULTS/DELETE\" or \"MICROSOFT.AUTHORIZATION/LOCKS/DELETE\", whatever the status. Show `TimeGenerated`, `Caller`, `OperationNameValue`, `Resource` and `ActivityStatusValue`, sorted by `TimeGenerated` ascending.",
      hint: "An `in (...)` list with the two operation names keeps the filter readable.",
      solution: "AzureActivity\n| where OperationNameValue in (\"MICROSOFT.KEYVAULT/VAULTS/DELETE\", \"MICROSOFT.AUTHORIZATION/LOCKS/DELETE\")\n| project TimeGenerated, Caller, OperationNameValue, Resource, ActivityStatusValue\n| sort by TimeGenerated asc",
      explain: "A CanNotDelete lock blocks deletion until someone with Microsoft.Authorization/locks/delete (Owner or User Access Administrator) removes it, which is why the lock removal shows up first. For Key Vault, soft delete lets you recover a deleted vault during the retention period, and purge protection stops anyone, even an admin, from purging it early; kv-dev-01 was flagged for missing purge protection."
    },
    {
      id: "alerts-per-plan",
      kind: "kql",
      d: 4,
      tables: ["SecurityAlert"],
      title: "Count alerts per Defender plan",
      prompt: "To see which workload protection plans are the noisiest, count alerts per `ProductComponentName`, ignoring \"Informational\" severity.\n\nReturn `ProductComponentName` and `Alerts`, sorted by `Alerts` descending and then `ProductComponentName` ascending.",
      starter: "SecurityAlert\n| summarize Alerts = count() by ProductComponentName",
      hint: "Filter out Informational with `!=` before the `summarize`, then sort on two keys.",
      solution: "SecurityAlert\n| where AlertSeverity != \"Informational\"\n| summarize Alerts = count() by ProductComponentName\n| sort by Alerts desc, ProductComponentName asc",
      explain: "Counting by plan shows where investigation effort goes and helps justify plan costs. Servers alerts come from Defender for Servers (Plan 2 adds more, such as file integrity monitoring and agentless scanning); AI alerts come from threat protection for AI services. Workflow automation or Sentinel automation rules can route each plan's alerts to the right team."
    },
    {
      id: "role-assignment-writers",
      kind: "kql",
      d: 1,
      tables: ["AzureActivity"],
      title: "Who is granting Azure RBAC roles",
      prompt: "Role assignments are written with `OperationNameValue` \"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE\".\n\nFor successful role assignment writes, return one row per `Caller` with `Assignments` (the count) and `ResourceGroups` (the set of distinct `ResourceGroup` values). Sort by `Assignments` descending, then `Caller` ascending.",
      hint: "Filter on both operation and `ActivityStatusValue`, then `summarize Assignments = count(), ResourceGroups = make_set(ResourceGroup) by Caller`.",
      solution: "AzureActivity\n| where OperationNameValue == \"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE\" and ActivityStatusValue == \"Success\"\n| summarize Assignments = count(), ResourceGroups = make_set(ResourceGroup) by Caller\n| sort by Assignments desc, Caller asc",
      explain: "Only principals with Microsoft.Authorization/roleAssignments/write (Owner, User Access Administrator, Role Based Access Control Administrator) can do this, so every caller here holds a powerful role. jules granted access at 03:10 from the same outside address that opened RDP and listed storage keys. Least privilege means making those roles eligible in PIM for Azure resources and constraining delegation with conditions."
    },
    {
      id: "compute-high-recs",
      kind: "kql",
      d: 3,
      tables: ["SecurityRecommendation"],
      title: "Rank high-severity compute recommendations",
      prompt: "Focus on compute: virtual machines, AKS clusters and App Service apps (`ResourceType` \"Microsoft.Compute/virtualMachines\", \"Microsoft.ContainerService/managedClusters\" or \"Microsoft.Web/sites\").\n\nFor unhealthy recommendations with `RecommendationSeverity` \"High\" on those types, return `RecommendationName` and `Resources` (the number of distinct `ResourceName` values affected). Sort by `Resources` descending, then `RecommendationName` ascending.",
      hint: "Use `in (...)` for the three resource types, then `summarize Resources = dcount(ResourceName) by RecommendationName`.",
      solution: "SecurityRecommendation\n| where RecommendationState == \"Unhealthy\" and RecommendationSeverity == \"High\" and ResourceType in (\"Microsoft.Compute/virtualMachines\", \"Microsoft.ContainerService/managedClusters\", \"Microsoft.Web/sites\")\n| summarize Resources = dcount(ResourceName) by RecommendationName\n| sort by Resources desc, RecommendationName asc",
      explain: "Ranking by affected resources shows which single fix lifts secure score the most. Vulnerability findings come from Defender for Servers vulnerability assessment and are fixed with patching (Azure Update Manager); open management ports are fixed with just-in-time access or Bastion; privileged containers and automounted API credentials are enforced with Azure Policy for AKS; minimum TLS is an App Service setting."
    },
    {
      id: "ai-alert-summary",
      kind: "kql",
      d: 3,
      tables: ["SecurityAlert"],
      title: "Summarize threat protection alerts for AI workloads",
      prompt: "Defender for Cloud threat protection for AI services raises alerts such as jailbreak attempts and sensitive data exposure, with `ProductComponentName` \"AI\".\n\nFor AI alerts, return one row per `AlertName` with `Alerts` (the count) and `Deployments` (the set of distinct `CompromisedEntity` values). Sort by `Alerts` descending, then `AlertName` ascending.",
      starter: "SecurityAlert\n| where ProductComponentName == \"AI\"\n| project AlertName, CompromisedEntity",
      hint: "Replace the `project` with a `summarize` holding `count()` and `make_set(CompromisedEntity)`, grouped by AlertName.",
      solution: "SecurityAlert\n| where ProductComponentName == \"AI\"\n| summarize Alerts = count(), Deployments = make_set(CompromisedEntity) by AlertName\n| sort by Alerts desc, AlertName asc",
      explain: "Repeated jailbreak alerts against the same deployments tell you Prompt Shields in Azure AI Content Safety is doing its job, but also that the app is being probed. The SC-500 controls around it: put models behind an API Management AI gateway that authenticates with managed identity and enforces token limits, keep prompt and response logging, and use Purview DSPM for AI to catch sensitive data leaking into responses."
    },
    {
      id: "sc500-cli-storage-anon", kind: "az", d: 2,
      title: "Close anonymous access on a storage account",
      prompt: "The storage account `stfinance01` in `rg-data` still has legacy settings: plain HTTP is allowed, the minimum TLS version is 1.0, anonymous blob access is allowed, and the `reports` container is publicly readable.\n\nSet the `reports` container's public access to `off`, then update the account to require HTTPS, use a minimum of TLS 1.2 and disallow anonymous blob access. Show the three settings afterwards.",
      hint: "az storage container set-permission changes a container's --public-access. az storage account update takes --https-only, --min-tls-version and --allow-blob-public-access.",
      explain: "Anonymous (public) blob access lets anyone with the URL read data, which has caused many real data leaks. Disabling allowBlobPublicAccess at the account level overrides every container setting, and turning the container off as well keeps it safe if the account setting is ever relaxed. Requiring HTTPS and TLS 1.2 protects data in transit. The built-in policy 'Storage account public access should be disallowed' lets you audit or deny this across a subscription.",
      setup: { groups: { "rg-data": { location: "eastus" } }, storage: { accounts: { stfinance01: { group: "rg-data", httpsOnly: false, minTls: "TLS1_0", publicAccess: true, containers: { reports: "blob", archive: "off" } } } } },
      checks: [
        { label: "The reports container is no longer public", type: "container", account: "stfinance01", name: "reports", publicAccess: "off" },
        { label: "stfinance01 requires HTTPS and TLS 1.2", type: "storage", name: "stfinance01", httpsOnly: true, minTls: "TLS1_2" },
        { label: "Anonymous blob access is disallowed", type: "storage", name: "stfinance01", publicAccess: false }
      ],
      solution: ["az storage container set-permission --account-name stfinance01 --name reports --public-access off", "az storage account update --name stfinance01 --resource-group rg-data --https-only true --min-tls-version TLS1_2 --allow-blob-public-access false", "az storage account show --name stfinance01 --query \"{https:enableHttpsTrafficOnly, tls:minimumTlsVersion, anonymous:allowBlobPublicAccess}\""]
    },
    {
      id: "sc500-cli-nsg-rdp", kind: "az", d: 2,
      title: "Stop exposing RDP to the internet",
      prompt: "The NSG `nsg-mgmt` in `rg-mgmt` has a rule `allow-rdp-any` that allows RDP (TCP 3389) from any source at priority 100.\n\nDelete that rule and replace it with `allow-rdp-admins`: priority 100, inbound, allow, TCP 3389, only from the admin network `203.0.113.0/24`. List the rules as a table to check your work.",
      hint: "az network nsg rule delete removes a rule. az network nsg rule create needs --nsg-name, --name and --priority, plus --protocol, --destination-port-ranges and --source-address-prefixes.",
      explain: "RDP and SSH open to the internet are among the most attacked ports in the cloud, targeted by constant password spraying. Limit them to known admin ranges, or better, remove public exposure and use Azure Bastion or just-in-time VM access in Microsoft Defender for Cloud. Rule priority must be unique per direction in an NSG, which is why the old rule has to go before the new one can reuse priority 100.",
      setup: { groups: { "rg-mgmt": { location: "eastus" } }, nsgs: { "nsg-mgmt": { group: "rg-mgmt", rules: [{ name: "allow-rdp-any", priority: 100, protocol: "Tcp", port: "3389", source: "*" }, { name: "allow-https", priority: 200, protocol: "Tcp", port: "443", source: "*" }] } } },
      checks: [
        { label: "No rule allows RDP from any source", type: "nsgRule", nsg: "nsg-mgmt", port: 3389, access: "Allow", source: "*", present: false },
        { label: "allow-rdp-admins allows 3389 only from 203.0.113.0/24", type: "nsgRule", nsg: "nsg-mgmt", name: "allow-rdp-admins", port: 3389, access: "Allow", source: "203.0.113.0/24" }
      ],
      solution: ["az network nsg rule delete --resource-group rg-mgmt --nsg-name nsg-mgmt --name allow-rdp-any", "az network nsg rule create --resource-group rg-mgmt --nsg-name nsg-mgmt --name allow-rdp-admins --priority 100 --direction Inbound --access Allow --protocol Tcp --destination-port-ranges 3389 --source-address-prefixes 203.0.113.0/24", "az network nsg rule list --resource-group rg-mgmt --nsg-name nsg-mgmt -o table"]
    },
    {
      id: "sc500-cli-db-subnet", kind: "az", d: 2,
      title: "Segment a database subnet with an NSG",
      prompt: "In `rg-app`, the virtual network `vnet-app` has a web subnet `snet-web` (10.0.1.0/24) and a database subnet `snet-db` (10.0.2.0/24) with no NSG.\n\nCreate an NSG `nsg-db` with two inbound rules:\n- `allow-sql-from-web`: priority 100, allow TCP 1433 from 10.0.1.0/24\n- `deny-other-vnet`: priority 4000, deny any protocol on any port from the `VirtualNetwork` service tag\n\nThen associate `nsg-db` with `snet-db`.",
      hint: "Create the NSG, then its rules with az network nsg rule create (quote \"*\" for any port or protocol). az network vnet subnet update --network-security-group associates it.",
      explain: "Every NSG has a default rule, AllowVnetInBound at priority 65000, that lets anything in the virtual network (including peered networks) reach everything else. Adding a lower-numbered deny for the VirtualNetwork service tag, after an explicit allow for the web tier, gives the database tier real micro-segmentation. Associating the NSG with the subnet applies it to every NIC in that subnet, including ones added later.",
      setup: { groups: { "rg-app": { location: "eastus" } }, vnets: { "vnet-app": { group: "rg-app", addressPrefix: "10.0.0.0/16", subnets: { "snet-web": "10.0.1.0/24", "snet-db": "10.0.2.0/24" } } } },
      checks: [
        { label: "nsg-db allows TCP 1433 from the web subnet", type: "nsgRule", nsg: "nsg-db", name: "allow-sql-from-web", port: 1433, access: "Allow", source: "10.0.1.0/24" },
        { label: "nsg-db denies other VirtualNetwork traffic", type: "nsgRule", nsg: "nsg-db", name: "deny-other-vnet", access: "Deny", source: "VirtualNetwork" },
        { label: "snet-db is associated with nsg-db", type: "vnet", name: "vnet-app", subnet: "snet-db", nsg: "nsg-db" }
      ],
      solution: ["az network nsg create --resource-group rg-app --name nsg-db", "az network nsg rule create --resource-group rg-app --nsg-name nsg-db --name allow-sql-from-web --priority 100 --direction Inbound --access Allow --protocol Tcp --destination-port-ranges 1433 --source-address-prefixes 10.0.1.0/24", "az network nsg rule create --resource-group rg-app --nsg-name nsg-db --name deny-other-vnet --priority 4000 --direction Inbound --access Deny --protocol \"*\" --destination-port-ranges \"*\" --source-address-prefixes VirtualNetwork", "az network vnet subnet update --resource-group rg-app --vnet-name vnet-app --name snet-db --network-security-group nsg-db"]
    },
    {
      id: "sc500-cli-keyvault", kind: "az", d: 1,
      title: "Harden a key vault and grant least-privilege secret access",
      prompt: "The key vault `kv-contoso-app` in `rg-sec` still uses legacy access policies and has no purge protection.\n\n1. Turn on purge protection and switch the vault to the Azure RBAC permission model.\n2. Give the developer Priya (`priya@contoso.onmicrosoft.com`) the `Key Vault Secrets User` role scoped to this vault only.\n3. List the role assignments on the vault. Don't print any secret values.",
      hint: "az keyvault update takes --enable-purge-protection and --enable-rbac-authorization. For the role scope, store the vault ID with kvid=$(az keyvault show --name kv-contoso-app --query id -o tsv).",
      explain: "Soft delete keeps deleted vaults and secrets recoverable, and purge protection stops anyone, even an admin or an attacker with admin rights, from permanently purging them during the retention period; once on, it can't be turned off. The Azure RBAC model manages data-plane access with role assignments that can be scoped to a single vault and reviewed like any other access. Key Vault Secrets User can read secret values but can't change or delete them.",
      setup: { groups: { "rg-sec": { location: "eastus" } }, users: [{ upn: "priya@contoso.onmicrosoft.com", displayName: "Priya Patel", jobTitle: "Developer" }], keyvaults: { "kv-contoso-app": { group: "rg-sec", purgeProtection: false, rbac: false, secrets: { SqlConnection: "Server=sql-prod;User=app;Password=Example-Only-1" } } } },
      checks: [
        { label: "Purge protection and RBAC authorization are on", type: "keyvault", name: "kv-contoso-app", purgeProtection: true, rbac: true },
        { label: "Priya has Key Vault Secrets User on this vault only", type: "role", assignee: "priya@contoso.onmicrosoft.com", role: "Key Vault Secrets User", scope: "/subscriptions/3f2a1b4c-5d6e-4f70-8a9b-0c1d2e3f4a5b/resourceGroups/rg-sec/providers/Microsoft.KeyVault/vaults/kv-contoso-app" }
      ],
      solution: ["az keyvault update --name kv-contoso-app --resource-group rg-sec --enable-purge-protection true --enable-rbac-authorization true", "kvid=$(az keyvault show --name kv-contoso-app --query id -o tsv)", "az role assignment create --assignee priya@contoso.onmicrosoft.com --role \"Key Vault Secrets User\" --scope $kvid", "az role assignment list --scope $kvid -o table"]
    },
    {
      id: "sc500-cli-webapp", kind: "az", d: 3,
      title: "Enforce HTTPS and modern TLS on an App Service app",
      prompt: "The web app `app-portal` in `rg-web` still accepts plain HTTP, allows TLS 1.0 and has FTP deployment enabled.\n\nMake the app HTTPS-only, set its minimum TLS version to 1.2 and disable FTP and FTPS. Show the app's configuration afterwards.",
      hint: "az webapp update --https-only true redirects HTTP to HTTPS. az webapp config set takes --min-tls-version and --ftps-state.",
      explain: "HTTPS-only redirects every HTTP request to HTTPS so credentials and session cookies never cross the network in clear text. TLS 1.0 and 1.1 have known weaknesses, so 1.2 is the minimum baseline. Plain FTP sends deployment credentials unencrypted; disabling FTP and FTPS entirely and deploying from a pipeline or with a zip deploy removes that attack path. Defender for Cloud recommends all three.",
      setup: { groups: { "rg-web": { location: "eastus" } }, appServices: { "app-portal": { group: "rg-web", httpsOnly: false, minTls: "1.0", ftps: "AllAllowed" } } },
      checks: [
        { label: "app-portal is HTTPS-only", type: "webapp", name: "app-portal", httpsOnly: true },
        { label: "Minimum TLS is 1.2 and FTP/FTPS is disabled", type: "webapp", name: "app-portal", minTls: "1.2", ftps: "Disabled" }
      ],
      solution: ["az webapp update --resource-group rg-web --name app-portal --https-only true", "az webapp config set --resource-group rg-web --name app-portal --min-tls-version 1.2 --ftps-state Disabled", "az webapp config show --resource-group rg-web --name app-portal -o table"]
    },
    {
      id: "sc500-cli-audit-policy", kind: "az", d: 4,
      title: "Audit security posture with built-in policies",
      prompt: "Security wants visibility across the whole Contoso Dev subscription. Assign two built-in audit policies at the subscription scope:\n- **Storage account public access should be disallowed**, named `audit-storage-public`\n- **App Service apps should only be accessible over HTTPS**, named `audit-app-https`\n\nFind each definition's name (a GUID) with `az policy definition list` and a `--query` filter, and get the subscription ID with `az account show`.",
      hint: "az policy definition list --query \"[?contains(displayName, 'HTTPS')].{name:name, displayName:displayName}\" -o table narrows the list. A subscription scope is /subscriptions/<id>.",
      explain: "Audit-effect policies don't block anything; they mark non-compliant resources so you can see and fix your security posture, and the results feed the regulatory compliance dashboard in Microsoft Defender for Cloud. Assigning at subscription scope covers every current and future resource group. When you are confident a policy won't break workloads, switch to a Deny effect, and use remediation tasks for DeployIfNotExists or Modify policies.",
      setup: { groups: { "rg-web": { location: "eastus" } }, storage: { accounts: { stwebassets01: { group: "rg-web", publicAccess: true } } }, appServices: { "app-portal": { group: "rg-web" } } },
      checks: [
        { label: "audit-storage-public uses the storage public access policy", type: "policyAssignment", name: "audit-storage-public", policy: "Storage account public access should be disallowed" },
        { label: "audit-app-https uses the App Service HTTPS policy", type: "policyAssignment", name: "audit-app-https", policy: "App Service apps should only be accessible over HTTPS" }
      ],
      solution: ["az account show --query id -o tsv", "az policy definition list --query \"[?contains(displayName, 'public access') || contains(displayName, 'HTTPS')].{name:name, displayName:displayName}\" -o table", "az policy assignment create --name audit-storage-public --policy 4fa4b6c0-31ca-4c0d-b10d-24b96f62a751 --scope /subscriptions/3f2a1b4c-5d6e-4f70-8a9b-0c1d2e3f4a5b", "az policy assignment create --name audit-app-https --policy a4af4a39-4135-47fb-b175-47fbdf85311d --scope /subscriptions/3f2a1b4c-5d6e-4f70-8a9b-0c1d2e3f4a5b"]
    }
  ]
});
