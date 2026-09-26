/* Spanish text for the Azure Administrator (AZ-104) hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/az-104.js. */
CertHub.addHandsonEs("az-104", {
  "az104-new-rg": {
    title: "Crea un resource group para un proyecto nuevo",
    prompt: "Un proyecto nuevo necesita su propio contenedor de recursos.\n\nCrea un resource group llamado `rg-project1` en la región `eastus` con New-AzResourceGroup.",
    hint: "New-AzResourceGroup recibe -Name y -Location. Usa eastus como ubicación.",
    explain: "Un resource group es la unidad básica de organización y de ciclo de vida en Azure; cada recurso vive exactamente en uno. New-AzResourceGroup -Name -Location lo crea en la región que elijas, y esa región define dónde se almacenan los metadatos del grupo. Agrupar los recursos por proyecto simplifica el control de acceso, el seguimiento de costos y la limpieza, que son habilidades de gobernanza centrales de AZ-104.",
    labels: ["El resource group rg-project1 existe", "Lo creaste con New-AzResourceGroup"]
  },
  "az104-remove-rg": {
    title: "Elimina un resource group sin uso para controlar costos",
    prompt: "Una revisión de costos encontró un resource group antiguo, `rg-old`, que ya no se necesita. Un segundo grupo, `rg-keep`, debe quedarse.\n\nLista los resource groups y luego elimina solo `rg-old`.",
    hint: "Get-AzResourceGroup los lista. Remove-AzResourceGroup -Name elimina uno; asegúrate de indicar rg-old, no rg-keep.",
    explain: "Eliminar un resource group lo borra junto con todo lo que contiene, así que es una herramienta de limpieza muy potente, y peligrosa si indicas el grupo equivocado. Listar primero con Get-AzResourceGroup confirma exactamente qué existe antes de eliminar algo. Quitar recursos inactivos para controlar el gasto es una tarea de gobernanza y administración de costos que AZ-104 enfatiza.",
    labels: ["El resource group rg-old ya no existe", "El resource group rg-keep sigue existiendo"]
  },
  "az104-storage-rg": {
    title: "Prepara un resource group y un plan de nombres para el almacenamiento",
    prompt: "Estás por desplegar una storage account en East US.\n\nCrea un resource group `rg-storage-eus` en `eastus` y luego registra el nombre previsto de la storage account en `C:\\Az\\storage-plan.txt`. La nota debe mencionar Storage account.",
    hint: "New-AzResourceGroup crea el grupo; Set-Content -Path -Value escribe la nota con el nombre.",
    explain: "Los nombres de las storage accounts deben ser únicos a nivel global y estar en minúsculas, así que planear el nombre antes del despliegue evita comandos fallidos. Colocar la cuenta en un resource group específico de la región mantiene juntos los recursos relacionados y cerca de donde se usan. Las tareas de almacenamiento de AZ-104 premian este tipo de preparación: primero decide el grupo, la región y el nombre, y luego despliega.",
    labels: ["El resource group rg-storage-eus existe", "El plan registra el nombre de la storage account"]
  },
  "az104-compute-rg": {
    title: "Prepara un resource group para máquinas virtuales",
    prompt: "Vas a desplegar varias máquinas virtuales y quieres tenerlas en su propio grupo.\n\nCrea un resource group `rg-compute` en `eastus` y luego lista las máquinas virtuales existentes en la suscripción con Get-AzVM.",
    hint: "New-AzResourceGroup crea el grupo. Get-AzVM lista las VM que ya están en la suscripción.",
    explain: "Dedicar un resource group al cómputo mantiene juntas las máquinas virtuales, sus discos y sus interfaces de red, lo que facilita la administración y la limpieza. New-AzResourceGroup prepara el contenedor y Get-AzVM muestra lo que ya existe para que evites nombres duplicados o en conflicto. Desplegar y organizar VM es una parte importante del objetivo de cómputo de AZ-104.",
    labels: ["El resource group rg-compute existe", "Listaste las VM existentes con Get-AzVM"]
  },
  "az104-network-rg": {
    title: "Crea un resource group de red y registra el espacio de direcciones",
    prompt: "Los recursos de red de un entorno nuevo van en su propio grupo.\n\nCrea un resource group `rg-network` en `westeurope` y luego registra el espacio de direcciones previsto para la red virtual en `C:\\Az\\vnet.txt`. La nota debe contener 10.10.0.0/16.",
    hint: "New-AzResourceGroup crea el grupo en westeurope; Set-Content escribe la nota con el espacio de direcciones.",
    explain: "Planear desde el principio el espacio de direcciones de una red virtual evita superposiciones que más adelante impedirían conexiones de peering o VPN. Un rango 10.10.0.0/16 deja espacio para crear subredes. Crear el resource group en la región de destino y documentar el CIDR es el trabajo previo antes de desplegar la VNet en sí, sobre el cual se construye el objetivo de redes de AZ-104.",
    labels: ["El resource group rg-network existe", "La nota registra el espacio de direcciones de la VNet"]
  },
  "az104-export-inventory": {
    title: "Exporta un inventario de resource groups para revisión",
    prompt: "Para una revisión mensual necesitas guardar una lista de todos los resource groups.\n\nLista los resource groups y envía la salida a `C:\\Az\\rg-list.txt` con Out-File. El archivo guardado debe incluir el grupo `rg-a`.",
    hint: "Canaliza Get-AzResourceGroup hacia Out-File -FilePath. La salida incluye el nombre de cada grupo.",
    explain: "Capturar un inventario de un momento determinado respalda el monitoreo, la auditoría y el seguimiento de cambios. Canalizar Get-AzResourceGroup hacia Out-File escribe la lista formateada en un archivo que puedes adjuntar a una revisión o comparar más adelante. Generar registros como este desde PowerShell forma parte del objetivo de monitoreo y mantenimiento de AZ-104.",
    labels: ["Se creó el archivo de inventario", "El archivo incluye el resource group rg-a"]
  },
  "az104-cli-rg-tags": {
    title: "Crea un resource group con tags usando la Azure CLI",
    prompt: "Tu equipo reporta los costos de la nube por tag.\n\nCrea un resource group llamado `rg-app-dev` en `eastus` con dos tags: `env=dev` y `costCenter=1001`. Luego lista tus resource groups en formato de tabla para confirmar que está ahí.",
    hint: "az group create recibe --name, --location y --tags. Los tags son pares key=value separados por espacios después de un único --tags.",
    explain: "Los tags son pares nombre-valor en resource groups y recursos que alimentan el análisis de costos, la automatización y las consultas de inventario. Los tags de un resource group no se copian automáticamente a los recursos que contiene; Azure Policy (por ejemplo, 'Inherit a tag from the resource group if missing') puede hacerlo. Ten en cuenta que --tags al crear o actualizar reemplaza el conjunto completo de tags, así que para agregar un tag más adelante usa az tag update --operation Merge.",
    labels: ["rg-app-dev existe en eastus", "El grupo tiene el tag env=dev", "El grupo tiene el tag costCenter=1001"]
  },
  "az104-cli-lock": {
    title: "Protege un resource group de producción con un bloqueo contra eliminación",
    prompt: "El resource group `rg-prod-data` contiene el almacenamiento de producción, y la semana pasada alguien casi lo elimina.\n\nAgrega un bloqueo llamado `prod-nodelete` que siga permitiendo al equipo modificar los recursos, pero que impida que cualquiera los elimine. Luego lista los bloqueos del grupo para confirmarlo.",
    hint: "az lock create necesita --name, --lock-type y --resource-group. Un tipo de bloqueo impide cualquier cambio; el otro solo impide las eliminaciones.",
    explain: "CanNotDelete permite que los usuarios autorizados lean y modifiquen los recursos, pero impide eliminarlos. ReadOnly bloquea toda escritura, lo que puede afectar operaciones normales como iniciar una VM o listar las claves de una storage account. Los bloqueos se aplican a todos, incluidos los Owners, y todos los recursos del grupo los heredan. Para eliminar un recurso bloqueado, alguien con permisos Microsoft.Authorization/locks (como un Owner o un User Access Administrator) debe quitar primero el bloqueo.",
    labels: ["rg-prod-data tiene un bloqueo CanNotDelete llamado prod-nodelete", "Listaste los bloqueos para confirmarlo"]
  },
  "az104-cli-storage": {
    title: "Crea una storage account reforzada y un contenedor privado",
    prompt: "Crea una storage account llamada `stcontosologs01` en `rg-storage` con:\n- almacenamiento con redundancia de zona (`Standard_ZRS`) y tipo `StorageV2`\n- tráfico solo por HTTPS y una versión mínima de TLS 1.2\n- acceso anónimo a blobs deshabilitado\n\nLuego crea en ella un contenedor llamado `logs`, autorizándote con tu inicio de sesión de Microsoft Entra (`--auth-mode login`) en lugar de la clave de la cuenta.",
    hint: "Los nombres de storage account tienen de 3 a 24 letras minúsculas y dígitos. Busca --sku, --kind, --https-only, --min-tls-version y --allow-blob-public-access; el comando del contenedor necesita --account-name.",
    explain: "ZRS mantiene tres copias en distintas availability zones de una región, así que sobrevive a la caída de una zona; LRS permanece en un solo datacenter, mientras que GRS y GZRS agregan una copia asíncrona en una región secundaria. Solo HTTPS, TLS 1.2 y el acceso anónimo deshabilitado son la línea base segura, e indicarlos de forma explícita documenta la intención. --auth-mode login usa tu identidad de Entra y RBAC (leer y escribir blobs requiere un rol de datos como Storage Blob Data Contributor) en lugar de la clave de la cuenta, que lo puede todo.",
    labels: ["stcontosologs01 usa Standard_ZRS", "Solo HTTPS, TLS 1.2 y sin acceso anónimo a blobs", "El contenedor logs existe"]
  },
  "az104-cli-vm-resize": {
    title: "Ajusta el tamaño de una VM y deja de pagar por cómputo inactivo",
    prompt: "La VM de procesamiento por lotes `vm-batch01` en `rg-compute` está sobredimensionada en `Standard_D4s_v5` y solo se ejecuta a fin de mes.\n\nCambia su tamaño a `Standard_D2s_v5` y luego apágala para que se detenga la facturación del cómputo. Revisa su estado de energía con `az vm show -d`.",
    hint: "az vm resize recibe --size. az vm stop deja el cómputo asignado y facturado; otro comando lo libera.",
    explain: "Cambiar el tamaño reinicia una VM en ejecución, y si el nuevo tamaño no está disponible en el clúster de hardware actual, es posible que tengas que desasignarla primero. Apagarla desde el sistema operativo, o con az vm stop, deja la VM en estado Stopped pero todavía asignada, así que los cargos de cómputo continúan. az vm deallocate libera el host y detiene la facturación del cómputo, aunque los managed disks se siguen facturando. Una IP pública dinámica se libera al desasignar, y esa es una razón para usar una IP estática o un nombre DNS.",
    labels: ["vm-batch01 tiene el tamaño Standard_D2s_v5", "vm-batch01 está desasignada"]
  },
  "az104-cli-vm-private": {
    title: "Despliega una VM Linux sin IP pública",
    prompt: "Despliega una VM Ubuntu llamada `vm-app01` en la subred existente `snet-app` de `vnet-app`, en `rg-compute`.\n\nUsa la imagen `Ubuntu2204`, el tamaño `Standard_B2s`, el usuario administrador `azureuser` y claves SSH (sin contraseña). La VM no debe recibir una dirección IP pública y, como la subred ya tiene un NSG, tampoco crees un NSG a nivel de NIC. Pasa una cadena vacía (`\"\"`) a las opciones de IP pública y de NSG.",
    hint: "az vm create recibe --image, --size, --admin-username, --generate-ssh-keys, --vnet-name y --subnet. Usa --public-ip-address \"\" y --nsg \"\".",
    explain: "De forma predeterminada, az vm create agrega una IP pública y un NSG a nivel de NIC que abre SSH (22) o RDP (3389) hacia internet. Pasar cadenas vacías omite ambos, así que solo se puede llegar a la VM desde dentro de la red virtual, por ejemplo mediante Azure Bastion, una VPN o un jump host. Las claves SSH eliminan por completo los intentos de adivinar contraseñas. El NSG de la subred sigue filtrando el tráfico, y mantener las reglas en un solo nivel hace que sea más fácil razonar sobre ellas.",
    labels: ["vm-app01 está en ejecución con el tamaño Standard_B2s", "vm-app01 no tiene dirección IP pública", "vm-app01 está en snet-app sin NSG a nivel de NIC"]
  },
  "az104-cli-rbac": {
    title: "Reemplaza una asignación de rol amplia por una de privilegio mínimo",
    prompt: "Alex Kim (`alex@contoso.onmicrosoft.com`) solo administra máquinas virtuales en `rg-compute`, pero alguien le dio Contributor sobre toda la suscripción.\n\nDale a Alex el rol `Virtual Machine Contributor` con alcance en el resource group `rg-compute` y luego quita su asignación de Contributor a nivel de suscripción. Después, lista sus asignaciones para confirmarlo.",
    hint: "az account show --query id -o tsv muestra el ID de la suscripción. El alcance de un resource group tiene la forma /subscriptions/<id>/resourceGroups/<name>. Los nombres de rol con espacios necesitan comillas.",
    explain: "Una asignación de rol es una entidad de seguridad más una definición de rol más un alcance, y los permisos se heredan hacia abajo: del management group a la suscripción, al resource group y al recurso. Asigna el rol más limitado en el alcance más reducido que cumpla la tarea: Virtual Machine Contributor administra las VM, pero no la red virtual ni la storage account que usan, y ni ese rol ni Contributor pueden otorgar acceso a otros. Quitar la asignación amplia anterior es tan importante como agregar la nueva.",
    labels: ["Alex tiene Virtual Machine Contributor sobre rg-compute", "Alex ya no tiene Contributor sobre la suscripción"]
  },
  "az104-cli-peering": {
    title: "Conecta una red spoke al hub con peering",
    prompt: "La red hub `vnet-hub` (10.10.0.0/16) ya existe en `rg-network`.\n\nCrea `vnet-spoke` con el espacio de direcciones 10.20.0.0/16 y una subred `snet-web` (10.20.1.0/24) en el mismo grupo. Luego conecta las dos redes con peering en ambas direcciones: `hub-to-spoke` en el hub y `spoke-to-hub` en el spoke. Un peering solo aparece como Connected cuando existen ambos lados.",
    hint: "az network vnet create acepta --address-prefixes, --subnet-name y --subnet-prefixes. az network vnet peering create necesita --vnet-name, --name y --remote-vnet, y se ejecuta una vez desde cada lado.",
    explain: "El VNet peering se debe crear desde ambos lados; hasta que exista el segundo enlace, el primero aparece como Initiated. Los espacios de direcciones conectados por peering no pueden superponerse, por eso importa planear desde el principio rangos como 10.10.0.0/16 y 10.20.0.0/16. El tráfico entre redes con peering se mantiene en el backbone de Microsoft. El peering no es transitivo, así que dos spokes no pueden comunicarse a través del hub a menos que agregues enrutamiento mediante un firewall o una network virtual appliance.",
    labels: ["vnet-spoke tiene la subred snet-web (10.20.1.0/24)", "hub-to-spoke está Connected", "spoke-to-hub está Connected"]
  },
  "az104-cli-cpu-alert": {
    title: "Alerta al equipo de guardia cuando la CPU esté alta",
    prompt: "Crea un action group llamado `ag-oncall` en `rg-monitor` con el nombre corto `oncall` que envíe un email a `oncall@contoso.com`.\n\nLuego crea una alerta de métrica llamada `alert-cpu-high` en `rg-monitor` sobre la VM `vm-web01` (en `rg-web`). Debe activarse cuando el promedio de `Percentage CPU` sea mayor que 80 en una ventana de 5 minutos, con severidad 2, y notificar al action group.",
    hint: "Crea primero el action group (--action email NAME ADDRESS). El --scopes de la alerta necesita el ID de recurso completo de la VM: az vm show --query id -o tsv lo muestra, y vmid=$(...) lo guarda para el siguiente comando.",
    explain: "Un action group es una lista reutilizable de a quién notificar y qué ejecutar (email, SMS, webhook, Logic App, runbook) que pueden compartir muchas reglas de alerta. Una alerta de métrica revisa una métrica de plataforma con cierta periodicidad (la frecuencia de evaluación) sobre un período hacia atrás (el tamaño de la ventana) y la compara con un umbral. La severidad va de 0 (crítica) a 4 (detallada). Las métricas de plataforma como Percentage CPU no necesitan agente; los contadores del sistema operativo invitado, como la memoria, necesitan el Azure Monitor agent y una data collection rule.",
    labels: ["El action group ag-oncall envía un email a oncall@contoso.com", "alert-cpu-high vigila Percentage CPU con severidad 2", "La alerta notifica a ag-oncall"]
  }
});
