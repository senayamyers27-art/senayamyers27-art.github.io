CertHub.addPbqs("ai-102", [
  { id: "service-match", d: 1, type: "match", title: "Match requirements to Azure AI services",
    prompt: "An architect is reviewing requirements for a customer service platform. Match each requirement to the Azure AI service that fits it most directly.",
    pairs: [
      ["Return the vendor name, due date and total from scanned supplier invoices", "Azure AI Document Intelligence"],
      ["Read the text on photos of street signs and product labels", "Azure AI Vision"],
      ["Show live captions while an agent talks to a customer on a call", "Azure AI Speech"],
      ["Score forum posts for hate and violence before they are published", "Azure AI Content Safety"],
      ["Convert chat messages from Portuguese to English in real time", "Azure AI Translator"],
      ["Answer questions from policy documents, retrieved at query time, with citations", "Azure AI Search with Azure OpenAI"]
    ],
    extra: ["Azure AI Custom Vision", "Azure AI Face"],
    explain: "Named fields from invoices need Document Intelligence, while plain text in photos is Vision's Read feature. Live captions are Speech to text, and harmful-content severity scores come from Content Safety, not sentiment analysis. Text translation is Translator. Answering from your own documents with citations is a RAG pattern: Azure AI Search retrieves passages and an Azure OpenAI model writes the answer. Custom Vision and Face are for custom image models and faces, which none of these needs." },

  { id: "secure-config", d: 1, type: "select", title: "Audit an AI resource against a security policy",
    prompt: "Company policy for Azure AI resources: no key-based authentication, no access from the public internet, and callers must use Microsoft Entra ID with managed identities. Review the resource configuration and select every setting that violates the policy.",
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
    explain: "disableLocalAuth false means keys still work, which breaks the no-keys rule. publicNetworkAccess Enabled with a default action of Allow lets any internet caller reach the endpoint; fix them by disabling public access and adding a private endpoint for internal apps. The custom subdomain is required for Entra ID tokens, and the system-assigned identity is fine. The kind and pricing tier have nothing to do with the policy." },

  { id: "container-fill", d: 1, type: "fill", title: "Complete a container start command",
    prompt: "An engineer runs the Azure AI Language sentiment container on premises. The container refuses to start. Fill in the three required startup parameter names or values that complete the command.",
    context: "docker run --rm -it -p 5000:5000 --memory 8g --cpus 1 \\\n  mcr.microsoft.com/azure-cognitive-services/textanalytics/sentiment:latest \\\n  Eula=[ value 1 ] \\\n  [ name 2 ]=<endpoint of the Language resource> \\\n  [ name 3 ]=<key of the Language resource>",
    fields: [
      { label: "Value 1 (license acceptance)", answers: ["accept"] },
      { label: "Name 2 (parameter holding the endpoint)", answers: ["Billing"] },
      { label: "Name 3 (parameter holding the key)", answers: ["ApiKey", "Api-Key"] }
    ],
    explain: "Every connected Azure AI container needs Eula=accept, Billing set to the endpoint of a matching Azure resource and ApiKey set to that resource's key. The container uses them to report usage for billing; the text it analyzes stays on premises. If any of the three is missing, the container will not start." },

  { id: "response-fill", d: 2, type: "fill", title: "Read a truncated chat completion response",
    prompt: "A summarization app returns summaries that stop mid-sentence. Read the response returned by the Azure OpenAI deployment and fill in the values.",
    context: "{\n  \"id\": \"chatcmpl-001\",\n  \"model\": \"gpt-4o-mini\",\n  \"choices\": [ {\n    \"index\": 0,\n    \"finish_reason\": \"length\",\n    \"message\": { \"role\": \"assistant\", \"content\": \"The quarterly report shows revenue grew in all regions, while costs in\" }\n  } ],\n  \"usage\": { \"prompt_tokens\": 1850, \"completion_tokens\": 150, \"total_tokens\": 2000 }\n}\nRequest settings: temperature 0.2, max_tokens 150",
    fields: [
      { label: "Why generation stopped (finish_reason value)", answers: ["length"] },
      { label: "Total tokens billed for this call", answers: ["2000", "2,000"] },
      { label: "Request parameter to raise so summaries finish", answers: ["max_tokens", "max tokens", "max_completion_tokens"] }
    ],
    explain: "finish_reason length means the output hit the max_tokens limit of 150, which matches completion_tokens exactly. You are billed for prompt plus completion tokens, 1,850 + 150 = 2,000. Raising max_tokens (or max_completion_tokens on newer models), or asking for a shorter summary, fixes the truncation; temperature does not affect length." },

  { id: "param-match", d: 2, type: "match", title: "Match requirements to request settings",
    prompt: "A team is tuning several generative AI features. Match each requirement to the chat completion setting that addresses it.",
    pairs: [
      ["Invoice field extraction must give the same JSON on every run", "Temperature near 0"],
      ["Output must end as soon as the model writes the line ###", "Stop sequence"],
      ["Long product descriptions keep repeating the same phrases", "Frequency penalty"],
      ["Replies must never exceed a set length, to cap cost", "Max tokens"],
      ["The bot must always answer as a polite Contoso support agent", "System message"]
    ],
    extra: ["Number of choices (n)", "Streaming"],
    explain: "Low temperature makes the model pick the most likely tokens, giving repeatable output. A stop sequence ends generation when it appears. The frequency penalty lowers the chance of tokens that have already appeared often, reducing repetition. Max tokens caps output length and cost. Persona and rules belong in the system message. Returning several choices or streaming changes delivery, not behavior." },

  { id: "rag-order", d: 2, type: "order", title: "Order the steps of a RAG pipeline",
    prompt: "Put the steps of a retrieval augmented generation solution in order, from preparing the documents to answering a user's question.",
    steps: [
      "Extract text from the source documents in Blob Storage",
      "Split the text into overlapping chunks",
      "Generate an embedding vector for each chunk",
      "Store chunks, vectors and metadata in an Azure AI Search index",
      "Embed the user's question and run a hybrid query against the index",
      "Send the top chunks and the question to the chat model and return the cited answer"
    ],
    explain: "Ingestion comes first: extract text, chunk it (overlap keeps context at boundaries), embed each chunk with an embedding model and index chunks with their vectors. At query time the question is embedded with the same model and a hybrid query combines keyword and vector retrieval. Only then are the retrieved chunks placed in the prompt so the model can answer from them and cite sources." },

  { id: "agent-run-order", d: 3, type: "order", title: "Order an Agent Service conversation",
    prompt: "A developer uses Azure AI Foundry Agent Service with a function-calling tool that runs in the app. Put the steps for handling one user question in order.",
    steps: [
      "Create the agent with a model deployment, instructions and the function tool",
      "Create a thread for the user's conversation",
      "Add the user's question as a message on the thread",
      "Create a run of the agent on the thread",
      "When the run status is requires_action, execute the function and submit the tool outputs",
      "When the run status is completed, list the thread's messages and show the agent's reply"
    ],
    explain: "The agent definition (model, instructions, tools) exists before any conversation. A thread holds the conversation, and the user's message is added to it before a run asks the agent to process the thread. Because the function runs in the app, the run pauses in requires_action until the app submits tool outputs. Only after the run completes does the thread contain the agent's reply." },

  { id: "vision-match", d: 4, type: "match", title: "Choose the right vision capability",
    prompt: "A retailer has several image and video tasks. Match each task to the capability that fits it best.",
    pairs: [
      ["Write one sentence of alt text for every product photo", "Image Analysis caption"],
      ["Mark the position of every dent on photos of returned appliances", "Custom Vision object detection"],
      ["Label each photo as exactly one of the store's 12 shoe models", "Custom Vision multiclass classification"],
      ["Extract handwritten notes from photos of whiteboards", "Image Analysis Read (OCR)"],
      ["Make recorded training videos searchable by what was said and shown", "Azure AI Video Indexer"]
    ],
    extra: ["Custom Vision multilabel classification", "Face identification"],
    explain: "A one-sentence description is the caption feature. Positions of each dent need object detection, which returns bounding boxes. Exactly one label from your own set is multiclass classification; multilabel would allow several tags per image. Handwriting in photos is the Read feature. Video Indexer extracts time-coded transcripts, OCR and labels from recorded video. Face identification is Limited Access and not needed here." },

  { id: "cv-threshold", d: 4, type: "select", title: "Apply a probability threshold to detections",
    prompt: "A Custom Vision object detection model checks shelf photos. The app keeps only detections with a probability of 0.70 or higher. Select every detection the app keeps.",
    context: "POST .../detect/iterations/shelfModel/image\n{ \"predictions\": [\n  { \"tagName\": \"cereal\",  \"probability\": 0.94, \"boundingBox\": {\"left\":0.05,\"top\":0.10,\"width\":0.20,\"height\":0.30} },\n  { \"tagName\": \"cereal\",  \"probability\": 0.66, \"boundingBox\": {\"left\":0.30,\"top\":0.12,\"width\":0.18,\"height\":0.28} },\n  { \"tagName\": \"coffee\",  \"probability\": 0.71, \"boundingBox\": {\"left\":0.55,\"top\":0.50,\"width\":0.12,\"height\":0.20} },\n  { \"tagName\": \"coffee\",  \"probability\": 0.12, \"boundingBox\": {\"left\":0.70,\"top\":0.52,\"width\":0.10,\"height\":0.18} },\n  { \"tagName\": \"tea\",     \"probability\": 0.70, \"boundingBox\": {\"left\":0.80,\"top\":0.10,\"width\":0.15,\"height\":0.22} },\n  { \"tagName\": \"tea\",     \"probability\": 0.49, \"boundingBox\": {\"left\":0.82,\"top\":0.55,\"width\":0.14,\"height\":0.21} }\n] }",
    options: [
      "cereal at left 0.05 (0.94)",
      "cereal at left 0.30 (0.66)",
      "coffee at left 0.55 (0.71)",
      "coffee at left 0.70 (0.12)",
      "tea at left 0.80 (0.70)",
      "tea at left 0.82 (0.49)"
    ],
    answers: [0, 2, 4],
    explain: "Only predictions at or above 0.70 are kept: 0.94, 0.71 and exactly 0.70. Raising the threshold would improve precision but miss more real products (lower recall); lowering it would keep the 0.66 cereal but also admit more false detections. Bounding boxes are fractions of the image size, so the app multiplies them by the width and height to draw them." },

  { id: "ssml-fill", d: 5, type: "fill", title: "Complete an SSML document",
    prompt: "A pharmacy phone line must speak instructions slowly, pause between steps and read prescription numbers one digit at a time. Fill in the missing SSML element and attribute names.",
    context: "<speak version=\"1.0\" xml:lang=\"en-US\">\n  <voice name=\"en-US-AvaMultilingualNeural\">\n    Your prescription number is\n    <[ A ] interpret-as=\"characters\">40721</[ A ]>.\n    <[ B ] time=\"700ms\"/>\n    <[ C ] [ D ]=\"slow\">Take one tablet twice a day with food.</[ C ]>\n  </voice>\n</speak>",
    fields: [
      { label: "A: element that controls how the number is read", answers: ["say-as"] },
      { label: "B: element that inserts a pause", answers: ["break"] },
      { label: "C: element that changes speaking speed", answers: ["prosody"] },
      { label: "D: attribute of C that sets the speed", answers: ["rate"] }
    ],
    explain: "say-as with interpret-as characters reads 40721 digit by digit instead of as forty thousand. break inserts a pause of the given time. prosody changes rate, pitch and volume, and its rate attribute set to slow slows the instructions. phoneme and sub control pronunciation of words, which is not needed here." },

  { id: "translator-fix", d: 5, type: "select", title: "Fix a failing Translator request",
    prompt: "This request must return French and German translations, but it fails. Select every change that is required to make it work as intended.",
    context: "POST <translator-endpoint>/translate?api-version=3.0&to=fr\nOcp-Apim-Subscription-Key: <key of the Translator resource in westeurope>\nContent-Type: application/json\n\n[ { \"Text\": \"Your replacement card has been sent.\" } ]\n\nHTTP/1.1 401 Unauthorized\n{ \"error\": { \"code\": 401000, \"message\": \"The request is not authorized because credentials are missing or invalid.\" } }",
    options: [
      "Add the header Ocp-Apim-Subscription-Region: westeurope",
      "Add &to=de to the query string",
      "Replace the key header with an api-key header",
      "Add from=fr to the query string",
      "Rename the Text property to Content",
      "Send one request per target language instead of one request"
    ],
    answers: [0, 1],
    explain: "A key from a regional (or multi-service) resource must be sent with the Ocp-Apim-Subscription-Region header, or Translator returns 401. Adding a second to parameter returns both French and German in one response, so separate requests are unnecessary. api-key is the Azure OpenAI header, from=fr would wrongly declare the source language, and the body property must stay Text." },

  { id: "search-fill", d: 6, type: "fill", title: "Complete an Azure AI Search query and schema",
    prompt: "A hotel search page must support the typo-tolerant term 'beech~', show counts per city, and filter to ratings of 4 or higher. Fill in the missing values.",
    context: "POST /indexes/hotels/docs/search?api-version=<version>\n{\n  \"search\": \"beech~\",\n  \"queryType\": \"[ 1 ]\",\n  \"filter\": \"rating [ 2 ] 4\",\n  \"facets\": [\"city\"],\n  \"select\": \"name,city,rating\"\n}\nIndex fields: rating (Edm.Double) needs attribute [ 3 ]; city (Edm.String) needs attribute [ 4 ] for the counts",
    fields: [
      { label: "1: queryType that supports fuzzy search", answers: ["full"] },
      { label: "2: OData operator for 'greater than or equal'", answers: ["ge"] },
      { label: "3: attribute that allows rating in a filter", answers: ["filterable"] },
      { label: "4: attribute that allows facet counts on city", answers: ["facetable"] }
    ],
    explain: "Fuzzy search with ~ needs the full Lucene syntax, so queryType must be full. OData filters use word operators, and ge means greater than or equal (gt would exclude 4). A field can only appear in a filter if it is filterable, and facet counts need facetable. sortable and searchable enable ordering and full-text search, which this page does not use for these fields." },

  { id: "docint-review", d: 6, type: "select", title: "Route low-confidence invoice fields to review",
    prompt: "An accounts payable app auto-accepts Document Intelligence fields with confidence of 0.90 or higher and sends any other field to a person. Select every field that goes to human review.",
    context: "Model: prebuilt-invoice   Status: succeeded\nField          Value                 Confidence\nVendorName     Northwind Traders     0.97\nInvoiceId      INV-20931             0.95\nInvoiceDate    2026-09-02            0.89\nDueDate        2026-10-02            0.91\nSubTotal       1,240.00              0.72\nTotalTax       99.20                 0.90\nInvoiceTotal   1,339.20              0.64\nCustomerName   Contoso Ltd           0.93",
    options: ["VendorName", "InvoiceId", "InvoiceDate", "DueDate", "SubTotal", "TotalTax", "InvoiceTotal", "CustomerName"],
    answers: [2, 4, 6],
    explain: "Fields below 0.90 go to review: InvoiceDate (0.89), SubTotal (0.72) and InvoiceTotal (0.64). TotalTax at exactly 0.90 meets the threshold. Confidence scores let you automate the reliable fields and keep a person in the loop for the rest, which is especially important for money amounts. Repeated low confidence on one vendor's invoices is a sign to consider a custom neural model." }
]);
