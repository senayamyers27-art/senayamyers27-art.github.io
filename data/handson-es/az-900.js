/* Spanish text for the Azure Fundamentals (AZ-900) hands-on exercises. Only the words learners read; commands, setup, checks and answers stay in data/handson/az-900.js. */
CertHub.addHandsonEs("az-900", {
  "az900-cli-rg": {
    title: "Crea tu primer resource group",
    prompt: "Los resource groups son los contenedores que agrupan recursos de Azure relacionados.\n\nCrea un resource group llamado `rg-learn` en la región `westeurope` y luego lista todos los resource groups en formato de tabla.",
    hint: "Usa az group create con --name y --location, y luego az group list -o table.",
    explain: "Cada recurso de Azure vive exactamente en un resource group, y un grupo normalmente contiene recursos que comparten un ciclo de vida, como las VM, el almacenamiento y la red de una misma app. La ubicación del grupo solo indica dónde se almacenan sus metadatos; los recursos que contiene pueden estar en otras regiones. Eliminar un resource group elimina todo lo que contiene, lo que facilita la limpieza y es también la razón por la que existen los bloqueos.",
    labels: ["rg-learn existe en westeurope", "Listaste los resource groups"]
  },
  "az900-cli-deallocate": {
    title: "Deja de pagar por una máquina virtual inactiva",
    prompt: "La VM de prueba `vm-test01` en `rg-learn` no se necesita hasta la próxima semana. Con los precios de pago por uso, pagas el cómputo mientras la VM está asignada.\n\nApaga la VM para que se detengan los cargos de cómputo, pero consérvala (no la elimines). Luego revisa su estado de energía.",
    hint: "Hay una diferencia entre detenida y desasignada. Revisa az vm deallocate y luego az vm show -d --query powerState.",
    explain: "El modelo de la nube basado en el consumo significa que pagas por lo que usas, un gasto operativo (OpEx) en lugar de comprar hardware por adelantado (CapEx). Una VM desasignada libera su cómputo, así que la facturación del cómputo se detiene, mientras que sus discos permanecen y se siguen facturando a una tarifa mucho menor. Una VM que solo se detuvo desde el sistema operativo sigue asignada y sigue costando dinero.",
    labels: ["vm-test01 está desasignada", "vm-test01 todavía existe"]
  },
  "az900-cli-scale-up": {
    title: "Escala una VM verticalmente cuando necesite más potencia",
    prompt: "La app en `vm-app01` dentro de `rg-learn` ya superó su tamaño `Standard_B1s`.\n\nEscala la VM a `Standard_B2ms` y luego muestra sus detalles en formato de tabla para confirmar el nuevo tamaño.",
    hint: "az vm resize cambia el tamaño con --size. az vm show -o table muestra el resultado.",
    explain: "Escalar verticalmente (scale up) le da a una sola VM más CPU y memoria; escalar horizontalmente (scale out) agrega más instancias, por ejemplo con Virtual Machine Scale Sets. La escalabilidad es la capacidad de agregar recursos, y la elasticidad es agregarlos y quitarlos automáticamente según cambia la demanda. En la nube, un cambio de tamaño toma minutos en lugar de una compra de hardware, aunque cambiar el tamaño de una VM en ejecución la reinicia.",
    labels: ["vm-app01 tiene el tamaño Standard_B2ms", "vm-app01 está en ejecución"]
  },
  "az900-cli-grs": {
    title: "Crea una storage account con redundancia geográfica",
    prompt: "Tus backups deben sobrevivir a la pérdida de una región completa de Azure.\n\nCrea una storage account llamada `stlearngrs01` en `rg-learn` usando almacenamiento con redundancia geográfica (`Standard_GRS`). Luego muestra el SKU de la cuenta.",
    hint: "az storage account create recibe --name, --resource-group y --sku. Los nombres de storage account solo llevan letras minúsculas y dígitos.",
    explain: "El almacenamiento con redundancia local (LRS) mantiene tres copias en un solo datacenter, y el almacenamiento con redundancia de zona (ZRS) distribuye tres copias entre las availability zones de una región. El almacenamiento con redundancia geográfica (GRS) agrega una copia asíncrona en la región secundaria emparejada, lo que protege contra la caída de una región; RA-GRS además te permite leer desde la secundaria. GZRS combina la redundancia de zona en la región primaria con una copia geográfica.",
    labels: ["stlearngrs01 usa Standard_GRS", "stlearngrs01 solo acepta HTTPS"]
  },
  "az900-cli-tags": {
    title: "Etiqueta los recursos para los reportes de costos",
    prompt: "Finanzas quiere los costos agrupados por centro de costos.\n\nAgrega el tag `costCenter=4410` al resource group `rg-learn` y a la VM `vm-app01`, sin quitar los tags que ya tienen (la VM tiene el tag `env=test`). Usa `az tag update` con la operación Merge.",
    hint: "az tag update necesita --resource-id, --operation Merge y --tags. Obtén los IDs con az group show --query id -o tsv y az vm show --query id -o tsv, y guárdalos en variables como rgid=$(...).",
    explain: "Los tags son pares nombre-valor que te permiten agrupar costos, encontrar recursos e impulsar la automatización. Cost Management puede filtrar y agrupar el gasto por tag. az tag update --operation Merge agrega o cambia los tags que indicas y conserva el resto; Replace reemplaza el conjunto completo y Delete quita los tags indicados. Azure Policy puede exigir tags o copiarlos desde el resource group para que se mantengan consistentes.",
    labels: ["rg-learn tiene el tag costCenter=4410", "vm-app01 tiene el tag costCenter=4410", "vm-app01 conservó su tag env=test"]
  },
  "az900-cli-guardrails": {
    title: "Agrega controles de gobernanza: un bloqueo y una política",
    prompt: "Aplica dos controles a `rg-learn`:\n1. Un bloqueo `CanNotDelete` llamado `learn-nodelete`.\n2. Una asignación de la política integrada **Allowed locations** llamada `allowed-locations`, con alcance en `rg-learn`, que permita solo `westeurope` y `northeurope`.\n\nEncuentra el nombre de la definición de la política (un GUID) con `az policy definition list` y un filtro `--query` sobre displayName.",
    hint: "az policy definition list --query \"[?displayName=='Allowed locations'].name\" -o tsv muestra el GUID. La asignación necesita --policy, --resource-group y --params con un valor listOfAllowedLocations.",
    explain: "Los bloqueos de recursos impiden eliminaciones o cambios accidentales, sin importar quién haya iniciado sesión. Azure Policy evalúa las propiedades de los recursos: Allowed locations deniega los recursos nuevos fuera de las regiones indicadas, lo que ayuda con las reglas de residencia de datos. RBAC decide quién puede actuar, Policy decide qué está permitido y los bloqueos protegen lo que ya existe; juntos son herramientas centrales de gobernanza en Azure.",
    labels: ["rg-learn tiene un bloqueo CanNotDelete llamado learn-nodelete", "Allowed locations está asignada a rg-learn como allowed-locations"]
  }
});
