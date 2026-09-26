/* Spanish translation of the Microsoft Azure AI Engineer Associate (AI-102) exam simulations. Same ids and structure as data/pbq/ai-102.js. */
CertHub.addPbqs("ai-102", [
  { id: "service-match", d: 1, type: "match", title: "Relaciona requisitos con servicios de Azure AI",
    prompt: "Un arquitecto está revisando los requisitos de una plataforma de servicio al cliente. Relaciona cada requisito con el servicio de Azure AI que lo cubre de forma más directa.",
    pairs: [
      ["Devolver el nombre del proveedor, la fecha de vencimiento y el total de facturas de proveedores escaneadas", "Azure AI Document Intelligence"],
      ["Leer el texto de fotos de señales de tránsito y etiquetas de productos", "Azure AI Vision"],
      ["Mostrar subtítulos en vivo mientras un agente habla con un cliente en una llamada", "Azure AI Speech"],
      ["Calificar las publicaciones de un foro según odio y violencia antes de publicarlas", "Azure AI Content Safety"],
      ["Convertir mensajes de chat del portugués al inglés en tiempo real", "Azure AI Translator"],
      ["Responder preguntas a partir de documentos de políticas, recuperados al momento de la consulta, con citas", "Azure AI Search con Azure OpenAI"]
    ],
    extra: ["Azure AI Custom Vision", "Azure AI Face"],
    explain: "Los campos específicos de las facturas necesitan Document Intelligence, mientras que el texto simple en fotos es la función Read de Vision. Los subtítulos en vivo son Speech to text, y las puntuaciones de gravedad de contenido dañino vienen de Content Safety, no del análisis de sentimiento. La traducción de texto es Translator. Responder a partir de tus propios documentos con citas es un patrón RAG: Azure AI Search recupera los pasajes y un modelo de Azure OpenAI redacta la respuesta. Custom Vision y Face sirven para modelos de imagen personalizados y rostros, y ninguno de estos requisitos los necesita." },

  { id: "secure-config", d: 1, type: "select", title: "Audita un recurso de IA contra una política de seguridad",
    prompt: "Política de la empresa para los recursos de Azure AI: nada de autenticación basada en claves, ningún acceso desde internet pública, y los clientes deben usar Microsoft Entra ID con managed identities. Revisa la configuración del recurso y selecciona cada ajuste que viola la política.",
    context: "$ az cognitiveservices account show -n lang-contoso-prod -g rg-ai --query \"{kind:kind, sku:sku.name, identity:identity.type, props:properties}\"\n{\n  \"kind\": \"TextAnalytics\",\n  \"sku\": \"S\",\n  \"identity\": \"SystemAssigned\",\n  \"props\": {\n    \"customSubDomainName\": \"lang-contoso-prod\",\n    \"disableLocalAuth\": false,\n    \"publicNetworkAccess\": \"Enabled\",\n    \"networkAcls\": { \"defaultAction\": \"Allow\", \"ipRules\": [], \"virtualNetworkRules\": [] },\n    \"privateEndpointConnections\": []\n  }\n}",
    options: [
      "kind: TextAnalytics",
      "sku: S",
      "identity: SystemAssigned",
      "customSubDomainName: lang-contoso-prod",
      "disableLocalAuth: false",
      "publicNetworkAccess: Enabled",
      "networkAcls defaultAction: Allow"
    ],
    answers: [4, 5, 6],
    explain: "disableLocalAuth en false significa que las claves siguen funcionando, lo que rompe la regla de no usar claves. publicNetworkAccess en Enabled con una acción predeterminada Allow permite que cualquier cliente de internet llegue al endpoint; corrígelo deshabilitando el acceso público y agregando un private endpoint para las aplicaciones internas. El subdominio personalizado es obligatorio para los tokens de Entra ID, y la identidad asignada por el sistema está bien. El tipo (kind) y el nivel de precios no tienen nada que ver con la política." },

  { id: "container-fill", d: 1, type: "fill", title: "Completa un comando de inicio de contenedor",
    prompt: "Un ingeniero ejecuta on-premises el contenedor de sentimiento de Azure AI Language. El contenedor se niega a iniciar. Completa los tres nombres o valores de parámetros de inicio obligatorios que completan el comando.",
    context: "docker run --rm -it -p 5000:5000 --memory 8g --cpus 1 \\\n  mcr.microsoft.com/azure-cognitive-services/textanalytics/sentiment:latest \\\n  Eula=[ value 1 ] \\\n  [ name 2 ]=<endpoint of the Language resource> \\\n  [ name 3 ]=<key of the Language resource>",
    fields: [
      { label: "Valor 1 (aceptación de la licencia)", answers: ["accept"] },
      { label: "Nombre 2 (parámetro que contiene el endpoint)", answers: ["Billing"] },
      { label: "Nombre 3 (parámetro que contiene la clave)", answers: ["ApiKey", "Api-Key"] }
    ],
    explain: "Todo contenedor conectado de Azure AI necesita Eula=accept, Billing con el endpoint de un recurso de Azure correspondiente y ApiKey con la clave de ese recurso. El contenedor los usa para reportar el consumo para la facturación; el texto que analiza se queda on-premises. Si falta cualquiera de los tres, el contenedor no inicia." },

  { id: "response-fill", d: 2, type: "fill", title: "Lee una respuesta de chat completion truncada",
    prompt: "Una aplicación de resúmenes devuelve resúmenes que se cortan a mitad de oración. Lee la respuesta que devolvió el deployment de Azure OpenAI y completa los valores.",
    context: "{\n  \"id\": \"chatcmpl-001\",\n  \"model\": \"gpt-4o-mini\",\n  \"choices\": [ {\n    \"index\": 0,\n    \"finish_reason\": \"length\",\n    \"message\": { \"role\": \"assistant\", \"content\": \"The quarterly report shows revenue grew in all regions, while costs in\" }\n  } ],\n  \"usage\": { \"prompt_tokens\": 1850, \"completion_tokens\": 150, \"total_tokens\": 2000 }\n}\nRequest settings: temperature 0.2, max_tokens 150",
    fields: [
      { label: "Por qué se detuvo la generación (valor de finish_reason)", answers: ["length"] },
      { label: "Total de tokens facturados en esta llamada", answers: ["2000", "2,000"] },
      { label: "Parámetro de la solicitud que debes aumentar para que los resúmenes terminen", answers: ["max_tokens", "max tokens", "max_completion_tokens"] }
    ],
    explain: "finish_reason length significa que la salida llegó al límite de max_tokens de 150, que coincide exactamente con completion_tokens. Se te factura por los tokens del prompt más los de la respuesta, 1,850 + 150 = 2,000. Aumentar max_tokens (o max_completion_tokens en modelos más nuevos), o pedir un resumen más corto, corrige el truncamiento; la temperature no afecta la longitud." },

  { id: "param-match", d: 2, type: "match", title: "Relaciona requisitos con parámetros de la solicitud",
    prompt: "Un equipo está ajustando varias funciones de IA generativa. Relaciona cada requisito con el parámetro de chat completion que lo resuelve.",
    pairs: [
      ["La extracción de campos de facturas debe dar el mismo JSON en cada ejecución", "Temperature cercana a 0"],
      ["La salida debe terminar en cuanto el modelo escriba la línea ###", "Stop sequence"],
      ["Las descripciones largas de productos repiten una y otra vez las mismas frases", "Frequency penalty"],
      ["Las respuestas nunca deben superar una longitud fija, para limitar el costo", "Max tokens"],
      ["El bot siempre debe responder como un amable agente de soporte de Contoso", "System message"]
    ],
    extra: ["Número de opciones (n)", "Streaming"],
    explain: "Una temperature baja hace que el modelo elija los tokens más probables, lo que da una salida repetible. Una stop sequence termina la generación cuando aparece. La frequency penalty reduce la probabilidad de los tokens que ya aparecieron muchas veces, lo que disminuye la repetición. Max tokens limita la longitud de la salida y el costo. La persona y las reglas van en el system message. Devolver varias opciones o usar streaming cambia la forma de entrega, no el comportamiento." },

  { id: "rag-order", d: 2, type: "order", title: "Ordena los pasos de un pipeline de RAG",
    prompt: "Pon en orden los pasos de una solución de retrieval augmented generation, desde la preparación de los documentos hasta la respuesta a la pregunta de un usuario.",
    steps: [
      "Extraer el texto de los documentos de origen en Blob Storage",
      "Dividir el texto en fragmentos (chunks) superpuestos",
      "Generar un vector de embedding para cada fragmento",
      "Guardar los fragmentos, los vectores y los metadatos en un índice de Azure AI Search",
      "Generar el embedding de la pregunta del usuario y ejecutar una consulta híbrida contra el índice",
      "Enviar los mejores fragmentos y la pregunta al modelo de chat y devolver la respuesta con citas"
    ],
    explain: "La ingesta va primero: extraer el texto, dividirlo en fragmentos (la superposición conserva el contexto en los bordes), generar el embedding de cada fragmento con un modelo de embeddings e indexar los fragmentos con sus vectores. Al momento de la consulta, la pregunta se convierte en embedding con el mismo modelo y una consulta híbrida combina la recuperación por palabras clave y por vectores. Solo entonces se colocan los fragmentos recuperados en el prompt para que el modelo responda a partir de ellos y cite las fuentes." },

  { id: "agent-run-order", d: 3, type: "order", title: "Ordena una conversación de Agent Service",
    prompt: "Un desarrollador usa Azure AI Foundry Agent Service con una herramienta de function calling que se ejecuta en la aplicación. Pon en orden los pasos para atender una pregunta de un usuario.",
    steps: [
      "Crear el agente con un deployment de modelo, instrucciones y la herramienta de función",
      "Crear un thread para la conversación del usuario",
      "Agregar la pregunta del usuario como un mensaje en el thread",
      "Crear un run del agente sobre el thread",
      "Cuando el estado del run sea requires_action, ejecutar la función y enviar los tool outputs",
      "Cuando el estado del run sea completed, listar los mensajes del thread y mostrar la respuesta del agente"
    ],
    explain: "La definición del agente (modelo, instrucciones, herramientas) existe antes de cualquier conversación. Un thread contiene la conversación, y el mensaje del usuario se agrega a él antes de que un run le pida al agente procesar el thread. Como la función se ejecuta en la aplicación, el run se pausa en requires_action hasta que la aplicación envía los tool outputs. Solo después de que el run termina, el thread contiene la respuesta del agente." },

  { id: "vision-match", d: 4, type: "match", title: "Elige la capacidad de visión adecuada",
    prompt: "Un minorista tiene varias tareas de imagen y video. Relaciona cada tarea con la capacidad que mejor se adapta a ella.",
    pairs: [
      ["Escribir una oración de texto alternativo para cada foto de producto", "Caption de Image Analysis"],
      ["Marcar la posición de cada abolladura en fotos de electrodomésticos devueltos", "Object detection de Custom Vision"],
      ["Etiquetar cada foto como exactamente uno de los 12 modelos de zapato de la tienda", "Clasificación multiclase de Custom Vision"],
      ["Extraer notas escritas a mano de fotos de pizarrones", "Read (OCR) de Image Analysis"],
      ["Hacer que los videos de capacitación grabados se puedan buscar por lo que se dijo y se mostró", "Azure AI Video Indexer"]
    ],
    extra: ["Clasificación multilabel de Custom Vision", "Face identification"],
    explain: "Una descripción de una oración es la función de caption. Las posiciones de cada abolladura necesitan object detection, que devuelve bounding boxes. Exactamente una etiqueta de tu propio conjunto es clasificación multiclase; la multilabel permitiría varias etiquetas por imagen. La escritura a mano en fotos es la función Read. Video Indexer extrae transcripciones con marcas de tiempo, OCR y etiquetas de videos grabados. Face identification es de Limited Access y aquí no se necesita." },

  { id: "cv-threshold", d: 4, type: "select", title: "Aplica un umbral de probabilidad a las detecciones",
    prompt: "Un modelo de object detection de Custom Vision revisa fotos de estantes. La aplicación conserva solo las detecciones con una probabilidad de 0.70 o más. Selecciona cada detección que conserva la aplicación.",
    context: "POST .../detect/iterations/shelfModel/image\n{ \"predictions\": [\n  { \"tagName\": \"cereal\",  \"probability\": 0.94, \"boundingBox\": {\"left\":0.05,\"top\":0.10,\"width\":0.20,\"height\":0.30} },\n  { \"tagName\": \"cereal\",  \"probability\": 0.66, \"boundingBox\": {\"left\":0.30,\"top\":0.12,\"width\":0.18,\"height\":0.28} },\n  { \"tagName\": \"coffee\",  \"probability\": 0.71, \"boundingBox\": {\"left\":0.55,\"top\":0.50,\"width\":0.12,\"height\":0.20} },\n  { \"tagName\": \"coffee\",  \"probability\": 0.12, \"boundingBox\": {\"left\":0.70,\"top\":0.52,\"width\":0.10,\"height\":0.18} },\n  { \"tagName\": \"tea\",     \"probability\": 0.70, \"boundingBox\": {\"left\":0.80,\"top\":0.10,\"width\":0.15,\"height\":0.22} },\n  { \"tagName\": \"tea\",     \"probability\": 0.49, \"boundingBox\": {\"left\":0.82,\"top\":0.55,\"width\":0.14,\"height\":0.21} }\n] }",
    options: [
      "cereal en left 0.05 (0.94)",
      "cereal en left 0.30 (0.66)",
      "coffee en left 0.55 (0.71)",
      "coffee en left 0.70 (0.12)",
      "tea en left 0.80 (0.70)",
      "tea en left 0.82 (0.49)"
    ],
    answers: [0, 2, 4],
    explain: "Solo se conservan las predicciones iguales o mayores a 0.70: 0.94, 0.71 y exactamente 0.70. Subir el umbral mejoraría la precision, pero dejaría pasar más productos reales (menor recall); bajarlo conservaría el cereal de 0.66, pero también admitiría más detecciones falsas. Los bounding boxes son fracciones del tamaño de la imagen, así que la aplicación los multiplica por el ancho y el alto para dibujarlos." },

  { id: "ssml-fill", d: 5, type: "fill", title: "Completa un documento SSML",
    prompt: "La línea telefónica de una farmacia debe decir las instrucciones despacio, hacer pausas entre los pasos y leer los números de receta dígito por dígito. Completa los nombres de elemento y atributo de SSML que faltan.",
    context: "<speak version=\"1.0\" xml:lang=\"en-US\">\n  <voice name=\"en-US-AvaMultilingualNeural\">\n    Your prescription number is\n    <[ A ] interpret-as=\"characters\">40721</[ A ]>.\n    <[ B ] time=\"700ms\"/>\n    <[ C ] [ D ]=\"slow\">Take one tablet twice a day with food.</[ C ]>\n  </voice>\n</speak>",
    fields: [
      { label: "A: elemento que controla cómo se lee el número", answers: ["say-as"] },
      { label: "B: elemento que inserta una pausa", answers: ["break"] },
      { label: "C: elemento que cambia la velocidad del habla", answers: ["prosody"] },
      { label: "D: atributo de C que establece la velocidad", answers: ["rate"] }
    ],
    explain: "say-as con interpret-as characters lee 40721 dígito por dígito en lugar de como cuarenta mil. break inserta una pausa del tiempo indicado. prosody cambia la velocidad, el tono y el volumen, y su atributo rate con el valor slow hace más lentas las instrucciones. phoneme y sub controlan la pronunciación de las palabras, lo cual aquí no se necesita." },

  { id: "translator-fix", d: 5, type: "select", title: "Corrige una solicitud fallida a Translator",
    prompt: "Esta solicitud debe devolver traducciones al francés y al alemán, pero falla. Selecciona cada cambio que es necesario para que funcione como se espera.",
    context: "POST <translator-endpoint>/translate?api-version=3.0&to=fr\nOcp-Apim-Subscription-Key: <key of the Translator resource in westeurope>\nContent-Type: application/json\n\n[ { \"Text\": \"Your replacement card has been sent.\" } ]\n\nHTTP/1.1 401 Unauthorized\n{ \"error\": { \"code\": 401000, \"message\": \"The request is not authorized because credentials are missing or invalid.\" } }",
    options: [
      "Agregar el encabezado Ocp-Apim-Subscription-Region: westeurope",
      "Agregar &to=de a la query string",
      "Reemplazar el encabezado de la clave por un encabezado api-key",
      "Agregar from=fr a la query string",
      "Cambiar el nombre de la propiedad Text a Content",
      "Enviar una solicitud por cada idioma de destino en lugar de una sola solicitud"
    ],
    answers: [0, 1],
    explain: "Una clave de un recurso regional (o multiservicio) debe enviarse con el encabezado Ocp-Apim-Subscription-Region; de lo contrario, Translator devuelve 401. Agregar un segundo parámetro to devuelve el francés y el alemán en una sola respuesta, así que las solicitudes separadas no son necesarias. api-key es el encabezado de Azure OpenAI, from=fr declararía por error el idioma de origen, y la propiedad del cuerpo debe seguir siendo Text." },

  { id: "search-fill", d: 6, type: "fill", title: "Completa una consulta y un esquema de Azure AI Search",
    prompt: "La página de búsqueda de un hotel debe admitir el término tolerante a errores de escritura 'beech~', mostrar conteos por ciudad y filtrar calificaciones de 4 o más. Completa los valores que faltan.",
    context: "POST /indexes/hotels/docs/search?api-version=<version>\n{\n  \"search\": \"beech~\",\n  \"queryType\": \"[ 1 ]\",\n  \"filter\": \"rating [ 2 ] 4\",\n  \"facets\": [\"city\"],\n  \"select\": \"name,city,rating\"\n}\nIndex fields: rating (Edm.Double) needs attribute [ 3 ]; city (Edm.String) needs attribute [ 4 ] for the counts",
    fields: [
      { label: "1: queryType que admite fuzzy search", answers: ["full"] },
      { label: "2: operador OData para 'mayor o igual que'", answers: ["ge"] },
      { label: "3: atributo que permite usar rating en un filtro", answers: ["filterable"] },
      { label: "4: atributo que permite conteos de facetas en city", answers: ["facetable"] }
    ],
    explain: "La fuzzy search con ~ necesita la sintaxis completa de Lucene, así que queryType debe ser full. Los filtros OData usan operadores con palabras, y ge significa mayor o igual que (gt excluiría el 4). Un campo solo puede aparecer en un filtro si es filterable, y los conteos de facetas necesitan facetable. sortable y searchable habilitan el ordenamiento y la búsqueda de texto completo, que esta página no usa para estos campos." },

  { id: "docint-review", d: 6, type: "select", title: "Envía a revisión los campos de factura con baja confianza",
    prompt: "Una aplicación de cuentas por pagar acepta automáticamente los campos de Document Intelligence con una confianza de 0.90 o más y envía cualquier otro campo a una persona. Selecciona cada campo que pasa a revisión humana.",
    context: "Model: prebuilt-invoice   Status: succeeded\nField          Value                 Confidence\nVendorName     Northwind Traders     0.97\nInvoiceId      INV-20931             0.95\nInvoiceDate    2026-09-02            0.89\nDueDate        2026-10-02            0.91\nSubTotal       1,240.00              0.72\nTotalTax       99.20                 0.90\nInvoiceTotal   1,339.20              0.64\nCustomerName   Contoso Ltd           0.93",
    options: ["VendorName", "InvoiceId", "InvoiceDate", "DueDate", "SubTotal", "TotalTax", "InvoiceTotal", "CustomerName"],
    answers: [2, 4, 6],
    explain: "Los campos por debajo de 0.90 pasan a revisión: InvoiceDate (0.89), SubTotal (0.72) e InvoiceTotal (0.64). TotalTax, con exactamente 0.90, cumple el umbral. Las puntuaciones de confianza te permiten automatizar los campos confiables y mantener a una persona en el proceso para el resto, lo cual es especialmente importante en los montos de dinero. Una confianza baja y repetida en las facturas de un mismo proveedor es señal de que conviene considerar un modelo neuronal personalizado." }
]);
