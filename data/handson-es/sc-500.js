/* Spanish text for the Microsoft SC-500 hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/sc-500.js. */
CertHub.addHandsonEs("sc-500", {
  "open-high-alerts": {
    title: "Lista las alertas abiertas de Defender con severidad alta",
    prompt: "`SecurityAlert` contiene las alertas generadas por los planes de protección de cargas de trabajo de Microsoft Defender for Cloud. `Status` es \"New\", \"InProgress\" o \"Resolved\".\n\nDevuelve las alertas con `AlertSeverity` \"High\" que no estén resueltas. Muestra `TimeGenerated`, `AlertName`, `ProductComponentName` y `CompromisedEntity`, ordenados por `TimeGenerated` de forma ascendente.",
    hint: "Agrega `and Status != \"Resolved\"` al filtro y termina con un `sort by`.",
    explain: "El triage empieza con las alertas abiertas de severidad alta. ProductComponentName te dice qué plan de Defender se disparó (Servers, Storage, SQL, Key Vault, Containers, AI), lo cual importa porque cada plan debe habilitarse por suscripción y algunos, como el escaneo de malware para Storage, son complementos. En Sentinel, estas alertas se convierten en incidentes mediante una regla de análisis de seguridad de Microsoft o el conector de Defender XDR."
  },
  "unhealthy-storage-recs": {
    title: "Encuentra recomendaciones no saludables de cuentas de almacenamiento",
    prompt: "`SecurityRecommendation` lista las evaluaciones de Defender for Cloud por recurso, con `RecommendationState` \"Healthy\", \"Unhealthy\" o \"NotApplicable\".\n\nDevuelve todas las recomendaciones no saludables para cuentas de almacenamiento (`ResourceType` \"Microsoft.Storage/storageAccounts\"). Muestra `ResourceName` y `RecommendationName`, ordenados por `ResourceName` de forma ascendente y luego por `RecommendationName` de forma ascendente.",
    hint: "Dos condiciones unidas con `and`, luego haz `project` de las dos columnas y ordena por ambas.",
    explain: "Estas se corresponden directamente con los objetivos de endurecimiento del almacenamiento: restringir el acceso de red con el firewall de almacenamiento o un private endpoint, prohibir el acceso anónimo a blobs y deshabilitar Shared Key para que cada solicitud use Microsoft Entra ID y RBAC del plano de datos (con SAS de delegación de usuario si todavía se necesita SAS). Corregir las evaluaciones no saludables sube el secure score, y un efecto Deny o Modify de Azure Policy evita que la desviación regrese."
  },
  "nsg-rule-changes": {
    title: "Audita los cambios exitosos en reglas de NSG",
    prompt: "Cada cambio del plano de control queda en `AzureActivity`. Escribir una regla de seguridad de un NSG se registra con `OperationNameValue` \"MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE\".\n\nDevuelve las escrituras exitosas de reglas de NSG (`ActivityStatusValue` \"Success\"). Muestra `TimeGenerated`, `Caller`, `CallerIpAddress` y `Resource`, ordenados por `TimeGenerated` de forma ascendente.",
    hint: "El código inicial también devuelve el intento fallido. Filtra también por la columna de estado y ordena. Puedes usar `endswith \"SECURITYRULES/WRITE\"` o un `==` exacto.",
    explain: "Una regla llamada allow-rdp-from-any, creada a las 02:55 desde una dirección fuera del rango de administración, es exactamente la exposición que Defender señala con \"Management ports should be closed\". Las soluciones del examen: cerrar los puertos de administración y usar Azure Bastion o el acceso just-in-time a VM, usar service tags y grupos de seguridad de aplicaciones en lugar de Any, y dejar que las reglas de administrador de seguridad de Virtual Network Manager apliquen barreras que los dueños de los NSG no puedan anular."
  },
  "vault-and-lock-deletes": {
    title: "Detecta eliminaciones de key vaults y bloqueos de recursos",
    prompt: "Quitar un bloqueo de recurso y luego eliminar lo que protegía es un patrón que merece una alerta.\n\nDesde `AzureActivity`, devuelve las filas cuyo `OperationNameValue` sea \"MICROSOFT.KEYVAULT/VAULTS/DELETE\" o \"MICROSOFT.AUTHORIZATION/LOCKS/DELETE\", sin importar el estado. Muestra `TimeGenerated`, `Caller`, `OperationNameValue`, `Resource` y `ActivityStatusValue`, ordenados por `TimeGenerated` de forma ascendente.",
    hint: "Una lista `in (...)` con los dos nombres de operación mantiene el filtro legible.",
    explain: "Un bloqueo CanNotDelete impide la eliminación hasta que alguien con Microsoft.Authorization/locks/delete (Owner o User Access Administrator) lo quite, y por eso la eliminación del bloqueo aparece primero. En Key Vault, soft delete te permite recuperar un vault eliminado durante el periodo de retención, y purge protection impide que cualquiera, incluso un administrador, lo purgue antes de tiempo; kv-dev-01 fue señalado por no tener purge protection."
  },
  "alerts-per-plan": {
    title: "Cuenta las alertas por plan de Defender",
    prompt: "Para ver qué planes de protección de cargas de trabajo son los más ruidosos, cuenta las alertas por `ProductComponentName`, ignorando la severidad \"Informational\".\n\nDevuelve `ProductComponentName` y `Alerts`, ordenados por `Alerts` de forma descendente y luego por `ProductComponentName` de forma ascendente.",
    hint: "Excluye Informational con `!=` antes del `summarize` y luego ordena por dos claves.",
    explain: "Contar por plan muestra a dónde va el esfuerzo de investigación y ayuda a justificar el costo de los planes. Las alertas de Servers vienen de Defender for Servers (el Plan 2 agrega más, como la supervisión de integridad de archivos y el escaneo sin agente); las alertas de AI vienen de la protección contra amenazas para servicios de IA. La automatización de flujos de trabajo o las reglas de automatización de Sentinel pueden enviar las alertas de cada plan al equipo correcto."
  },
  "role-assignment-writers": {
    title: "Quién está otorgando roles de Azure RBAC",
    prompt: "Las asignaciones de roles se escriben con `OperationNameValue` \"MICROSOFT.AUTHORIZATION/ROLEASSIGNMENTS/WRITE\".\n\nPara las escrituras exitosas de asignaciones de roles, devuelve una fila por `Caller` con `Assignments` (el conteo) y `ResourceGroups` (el conjunto de valores distintos de `ResourceGroup`). Ordena por `Assignments` de forma descendente y luego por `Caller` de forma ascendente.",
    hint: "Filtra tanto por la operación como por `ActivityStatusValue`, y luego usa `summarize Assignments = count(), ResourceGroups = make_set(ResourceGroup) by Caller`.",
    explain: "Solo las entidades con Microsoft.Authorization/roleAssignments/write (Owner, User Access Administrator, Role Based Access Control Administrator) pueden hacer esto, así que cada caller que aparece aquí tiene un rol poderoso. jules otorgó acceso a las 03:10 desde la misma dirección externa que abrió RDP y listó las claves de almacenamiento. Privilegio mínimo significa hacer que esos roles sean elegibles en PIM para recursos de Azure y restringir la delegación con condiciones."
  },
  "compute-high-recs": {
    title: "Clasifica las recomendaciones de cómputo de severidad alta",
    prompt: "Concéntrate en el cómputo: máquinas virtuales, clústeres de AKS y apps de App Service (`ResourceType` \"Microsoft.Compute/virtualMachines\", \"Microsoft.ContainerService/managedClusters\" o \"Microsoft.Web/sites\").\n\nPara las recomendaciones no saludables con `RecommendationSeverity` \"High\" en esos tipos, devuelve `RecommendationName` y `Resources` (la cantidad de valores distintos de `ResourceName` afectados). Ordena por `Resources` de forma descendente y luego por `RecommendationName` de forma ascendente.",
    hint: "Usa `in (...)` para los tres tipos de recurso y luego `summarize Resources = dcount(ResourceName) by RecommendationName`.",
    explain: "Clasificar por recursos afectados muestra qué corrección individual sube más el secure score. Los hallazgos de vulnerabilidades vienen de la evaluación de vulnerabilidades de Defender for Servers y se corrigen con parches (Azure Update Manager); los puertos de administración abiertos se corrigen con acceso just-in-time o Bastion; los contenedores privilegiados y las credenciales de API montadas automáticamente se controlan con Azure Policy para AKS; el TLS mínimo es una configuración de App Service."
  },
  "ai-alert-summary": {
    title: "Resume las alertas de protección contra amenazas para cargas de trabajo de IA",
    prompt: "La protección contra amenazas para servicios de IA de Defender for Cloud genera alertas como intentos de jailbreak y exposición de datos sensibles, con `ProductComponentName` \"AI\".\n\nPara las alertas de IA, devuelve una fila por `AlertName` con `Alerts` (el conteo) y `Deployments` (el conjunto de valores distintos de `CompromisedEntity`). Ordena por `Alerts` de forma descendente y luego por `AlertName` de forma ascendente.",
    hint: "Reemplaza el `project` con un `summarize` que contenga `count()` y `make_set(CompromisedEntity)`, agrupado por AlertName.",
    explain: "Las alertas repetidas de jailbreak contra los mismos deployments te dicen que Prompt Shields de Azure AI Content Safety está haciendo su trabajo, pero también que alguien está sondeando la app. Los controles de SC-500 alrededor de esto: poner los modelos detrás de un gateway de IA de API Management que se autentique con identidad administrada y aplique límites de tokens, mantener el registro de prompts y respuestas, y usar Purview DSPM for AI para detectar datos sensibles que se filtren en las respuestas."
  },
  "sc500-cli-storage-anon": {
    title: "Cierra el acceso anónimo en una cuenta de almacenamiento",
    prompt: "La cuenta de almacenamiento `stfinance01` en `rg-data` todavía tiene configuraciones heredadas: se permite HTTP sin cifrar, la versión mínima de TLS es 1.0, se permite el acceso anónimo a blobs y el contenedor `reports` se puede leer públicamente.\n\nConfigura el acceso público del contenedor `reports` en `off` y luego actualiza la cuenta para que exija HTTPS, use como mínimo TLS 1.2 y prohíba el acceso anónimo a blobs. Muestra las tres configuraciones al final.",
    hint: "az storage container set-permission cambia el --public-access de un contenedor. az storage account update acepta --https-only, --min-tls-version y --allow-blob-public-access.",
    explain: "El acceso anónimo (público) a blobs permite que cualquiera con la URL lea los datos, y ha causado muchas filtraciones reales. Deshabilitar allowBlobPublicAccess a nivel de cuenta anula la configuración de todos los contenedores, y desactivarlo también en el contenedor lo mantiene seguro si alguna vez se relaja la configuración de la cuenta. Exigir HTTPS y TLS 1.2 protege los datos en tránsito. La directiva integrada 'Storage account public access should be disallowed' te permite auditar o denegar esto en toda una suscripción.",
    labels: ["El contenedor reports ya no es público", "stfinance01 exige HTTPS y TLS 1.2", "El acceso anónimo a blobs está prohibido"]
  },
  "sc500-cli-nsg-rdp": {
    title: "Deja de exponer RDP a internet",
    prompt: "El NSG `nsg-mgmt` en `rg-mgmt` tiene una regla `allow-rdp-any` que permite RDP (TCP 3389) desde cualquier origen con prioridad 100.\n\nElimina esa regla y reemplázala con `allow-rdp-admins`: prioridad 100, entrante, permitir, TCP 3389, solo desde la red de administración `203.0.113.0/24`. Lista las reglas como tabla para revisar tu trabajo.",
    hint: "az network nsg rule delete elimina una regla. az network nsg rule create necesita --nsg-name, --name y --priority, además de --protocol, --destination-port-ranges y --source-address-prefixes.",
    explain: "RDP y SSH abiertos a internet están entre los puertos más atacados en la nube, objetivo constante de password spraying. Limítalos a rangos de administración conocidos o, mejor aún, elimina la exposición pública y usa Azure Bastion o el acceso just-in-time a VM de Microsoft Defender for Cloud. La prioridad de las reglas debe ser única por dirección en un NSG, por eso hay que eliminar la regla vieja antes de que la nueva pueda reutilizar la prioridad 100.",
    labels: ["Ninguna regla permite RDP desde cualquier origen", "allow-rdp-admins permite 3389 solo desde 203.0.113.0/24"]
  },
  "sc500-cli-db-subnet": {
    title: "Segmenta una subred de base de datos con un NSG",
    prompt: "En `rg-app`, la red virtual `vnet-app` tiene una subred web `snet-web` (10.0.1.0/24) y una subred de base de datos `snet-db` (10.0.2.0/24) sin NSG.\n\nCrea un NSG `nsg-db` con dos reglas entrantes:\n- `allow-sql-from-web`: prioridad 100, permitir TCP 1433 desde 10.0.1.0/24\n- `deny-other-vnet`: prioridad 4000, denegar cualquier protocolo en cualquier puerto desde el service tag `VirtualNetwork`\n\nLuego asocia `nsg-db` con `snet-db`.",
    hint: "Crea el NSG y luego sus reglas con az network nsg rule create (pon \"*\" entre comillas para cualquier puerto o protocolo). az network vnet subnet update --network-security-group lo asocia.",
    explain: "Todo NSG tiene una regla predeterminada, AllowVnetInBound con prioridad 65000, que permite que cualquier cosa en la red virtual (incluidas las redes emparejadas) llegue a todo lo demás. Agregar un deny con número menor para el service tag VirtualNetwork, después de un allow explícito para la capa web, le da a la capa de base de datos una microsegmentación real. Asociar el NSG con la subred lo aplica a cada NIC de esa subred, incluidas las que se agreguen después.",
    labels: ["nsg-db permite TCP 1433 desde la subred web", "nsg-db deniega el resto del tráfico de VirtualNetwork", "snet-db está asociada con nsg-db"]
  },
  "sc500-cli-keyvault": {
    title: "Endurece un key vault y otorga acceso a secretos con privilegio mínimo",
    prompt: "El key vault `kv-contoso-app` en `rg-sec` todavía usa directivas de acceso heredadas y no tiene purge protection.\n\n1. Activa purge protection y cambia el vault al modelo de permisos de Azure RBAC.\n2. Dale a la desarrolladora Priya (`priya@contoso.onmicrosoft.com`) el rol `Key Vault Secrets User` con alcance solo en este vault.\n3. Lista las asignaciones de roles del vault. No imprimas ningún valor de secreto.",
    hint: "az keyvault update acepta --enable-purge-protection y --enable-rbac-authorization. Para el alcance del rol, guarda el ID del vault con kvid=$(az keyvault show --name kv-contoso-app --query id -o tsv).",
    explain: "Soft delete mantiene recuperables los vaults y secretos eliminados, y purge protection impide que cualquiera, incluso un administrador o un atacante con derechos de administrador, los purgue de forma permanente durante el periodo de retención; una vez activado, no se puede desactivar. El modelo de Azure RBAC administra el acceso al plano de datos con asignaciones de roles que pueden limitarse a un solo vault y revisarse como cualquier otro acceso. Key Vault Secrets User puede leer los valores de los secretos, pero no puede cambiarlos ni eliminarlos.",
    labels: ["Purge protection y la autorización RBAC están activadas", "Priya tiene Key Vault Secrets User solo en este vault"]
  },
  "sc500-cli-webapp": {
    title: "Exige HTTPS y TLS moderno en una app de App Service",
    prompt: "La app web `app-portal` en `rg-web` todavía acepta HTTP sin cifrar, permite TLS 1.0 y tiene habilitada la implementación por FTP.\n\nHaz que la app sea solo HTTPS, configura su versión mínima de TLS en 1.2 y deshabilita FTP y FTPS. Muestra la configuración de la app al final.",
    hint: "az webapp update --https-only true redirige HTTP a HTTPS. az webapp config set acepta --min-tls-version y --ftps-state.",
    explain: "HTTPS-only redirige cada solicitud HTTP a HTTPS para que las credenciales y las cookies de sesión nunca viajen por la red en texto claro. TLS 1.0 y 1.1 tienen debilidades conocidas, así que 1.2 es la base mínima. FTP sin cifrar envía las credenciales de implementación sin protección; deshabilitar FTP y FTPS por completo e implementar desde un pipeline o con zip deploy elimina ese vector de ataque. Defender for Cloud recomienda las tres medidas.",
    labels: ["app-portal es solo HTTPS", "El TLS mínimo es 1.2 y FTP/FTPS está deshabilitado"]
  },
  "sc500-cli-audit-policy": {
    title: "Audita la postura de seguridad con directivas integradas",
    prompt: "El equipo de seguridad quiere visibilidad de toda la suscripción Contoso Dev. Asigna dos directivas de auditoría integradas en el alcance de la suscripción:\n- **Storage account public access should be disallowed**, con el nombre `audit-storage-public`\n- **App Service apps should only be accessible over HTTPS**, con el nombre `audit-app-https`\n\nEncuentra el nombre de cada definición (un GUID) con `az policy definition list` y un filtro `--query`, y obtén el ID de la suscripción con `az account show`.",
    hint: "az policy definition list --query \"[?contains(displayName, 'HTTPS')].{name:name, displayName:displayName}\" -o table reduce la lista. El alcance de una suscripción es /subscriptions/<id>.",
    explain: "Las directivas con efecto Audit no bloquean nada; marcan los recursos no conformes para que puedas ver y corregir tu postura de seguridad, y los resultados alimentan el panel de cumplimiento normativo de Microsoft Defender for Cloud. Asignarlas en el alcance de la suscripción cubre todos los grupos de recursos actuales y futuros. Cuando estés seguro de que una directiva no romperá las cargas de trabajo, cámbiala a un efecto Deny, y usa tareas de corrección para las directivas DeployIfNotExists o Modify.",
    labels: ["audit-storage-public usa la directiva de acceso público al almacenamiento", "audit-app-https usa la directiva de HTTPS de App Service"]
  }
});
