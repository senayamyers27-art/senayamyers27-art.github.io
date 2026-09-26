CertHub.addPbqs("ai-900", [
  { id: "workload-match", d: 1, type: "match", title: "Match business needs to AI workloads",
    prompt: "A consultancy has collected these requests from one client. Match each request to the AI workload it describes.",
    pairs: [
      ["Estimate next quarter's sales for each store from past sales and promotions", "Prediction and forecasting"],
      ["Flag card payments that look very different from a customer's usual spending", "Anomaly detection"],
      ["Count forklifts in each photo from the warehouse cameras", "Computer vision"],
      ["Pull the supplier name and total from scanned invoices into the finance system", "Document processing"],
      ["Draft a first version of each weekly newsletter from bullet-point notes", "Generative AI"],
      ["Tell whether each customer survey comment is positive or negative", "Natural language processing"]
    ],
    extra: ["Clustering", "Speech synthesis"],
    explain: "Estimating a future number is forecasting, and spotting unusual payments is anomaly detection. Counting forklifts in images is computer vision (object detection), while extracting named fields from invoices is document processing, not plain OCR. Writing a new newsletter draft is generative AI, and judging the tone of text is NLP (sentiment analysis). Clustering and speech synthesis do not fit any of these requests." },

  { id: "rai-principles", d: 1, type: "match", title: "Match actions to responsible AI principles",
    prompt: "An AI governance lead lists actions taken on a new loan-approval system. Match each action to the Microsoft responsible AI principle it most directly supports.",
    pairs: [
      ["Compared approval rates for applicants of different ages and genders with similar finances", "Fairness"],
      ["Tested the model on unusual applications and sends low-confidence cases to an underwriter", "Reliability and safety"],
      ["Encrypted applicant data and removed names before training", "Privacy and security"],
      ["Made the online form usable with a screen reader and available in five languages", "Inclusiveness"],
      ["Shows applicants the main factors behind their decision", "Transparency"],
      ["Set up a review board that approves the model and owns complaints about it", "Accountability"]
    ],
    explain: "Fairness is about similar people getting similar outcomes across groups, while inclusiveness is about everyone being able to use the system. Safe handling of unusual and low-confidence cases is reliability and safety. Protecting and minimizing personal data is privacy and security. Explaining decisions is transparency, and clear ownership and governance is accountability." },

  { id: "ml-type-select", d: 2, type: "select", title: "Identify the regression scenarios",
    prompt: "A data science team has a backlog of proposed projects. Select every project that is a regression task.",
    context: "Project backlog\n1. Predict the number of minutes each delivery will take\n2. Decide whether each email is spam or not spam\n3. Estimate next month's electricity use in kWh for each household\n4. Group customers into segments with no predefined categories\n5. Predict the sale price of each used car\n6. Assign each support ticket to one of five teams",
    options: ["1. Delivery time in minutes", "2. Spam or not spam", "3. Electricity use in kWh", "4. Customer segments", "5. Used car sale price", "6. Ticket team assignment"],
    answers: [0, 2, 4],
    explain: "Regression predicts a numeric value, so delivery minutes, kWh and sale price are regression. Spam or not spam is binary classification and ticket routing to five teams is multiclass classification. Grouping customers with no predefined categories is clustering, which is unsupervised." },

  { id: "confusion-fill", d: 2, type: "fill", title: "Calculate metrics from a confusion matrix",
    prompt: "A fraud model was tested on 1,000 transactions. Use the confusion matrix to fill in the metrics as decimals rounded to two places (for example 0.50).",
    context: "                    Predicted fraud   Predicted legitimate\nActual fraud               40                 10\nActual legitimate          20                930",
    fields: [
      { label: "Accuracy ((TP + TN) / total)", answers: ["0.97", ".97", "97%"] },
      { label: "Precision (TP / (TP + FP))", answers: ["0.67", ".67", "67%"] },
      { label: "Recall (TP / (TP + FN))", answers: ["0.80", "0.8", ".8", ".80", "80%"] }
    ],
    explain: "TP = 40, FN = 10, FP = 20 and TN = 930. Accuracy is (40 + 930) / 1000 = 0.97, which looks excellent only because fraud is rare. Precision is 40 / 60 = 0.67, so a third of the alerts are false alarms, and recall is 40 / 50 = 0.80, so the model misses one fraud in five. With imbalanced classes, precision and recall say far more than accuracy." },

  { id: "vision-feature-match", d: 3, type: "match", title: "Choose the vision capability for each requirement",
    prompt: "A media company lists its image requirements. Match each requirement to the Azure capability that meets it.",
    pairs: [
      ["Write a one-sentence description of each photo for screen-reader users", "Azure AI Vision captions"],
      ["Extract the printed text from photos of street signs", "Azure AI Vision Read (OCR)"],
      ["Return the vendor, line items and total from supplier invoices", "Document Intelligence prebuilt invoice model"],
      ["Suggest the best square region of each photo for thumbnails", "Azure AI Vision smart crops"],
      ["Find each face and report whether it is blurred or wearing glasses", "Azure AI Face detection"]
    ],
    extra: ["Azure AI Face emotion recognition", "Azure AI Language key phrase extraction"],
    explain: "Captions produce a readable sentence for alt text, Read extracts text from images, and smart crops choose a thumbnail region. Invoice fields need Document Intelligence, because OCR returns text without knowing which value is the total. Face detection returns face locations and attributes such as blur and glasses. Emotion recognition was retired from Azure AI Face, and key phrase extraction works on text rather than images." },

  { id: "vision-response-select", d: 3, type: "select", title: "Read an image analysis response",
    prompt: "A developer called Azure AI Vision image analysis on a photo of a car park. Select every statement that the response supports.",
    context: "{\n  \"captionResult\": { \"text\": \"a parking lot with cars and a person walking\", \"confidence\": 0.81 },\n  \"objectsResult\": { \"values\": [\n    { \"boundingBox\": { \"x\": 12, \"y\": 140, \"w\": 210, \"h\": 120 }, \"tags\": [{ \"name\": \"car\", \"confidence\": 0.92 }] },\n    { \"boundingBox\": { \"x\": 260, \"y\": 150, \"w\": 190, \"h\": 110 }, \"tags\": [{ \"name\": \"car\", \"confidence\": 0.88 }] },\n    { \"boundingBox\": { \"x\": 480, \"y\": 90, \"w\": 60, \"h\": 170 }, \"tags\": [{ \"name\": \"person\", \"confidence\": 0.77 }] }\n  ] },\n  \"readResult\": { \"blocks\": [ { \"lines\": [ { \"text\": \"EXIT\" } ] } ] }\n}",
    options: [
      "Two cars were detected, each with a bounding box",
      "The service identified who the person in the photo is",
      "The text EXIT was extracted by the Read (OCR) feature",
      "The caption was generated with 81% confidence",
      "The response classifies the whole image as 'car park' only, with no locations",
      "The person was detected with lower confidence than either car"
    ],
    answers: [0, 2, 3, 5],
    explain: "The objects result lists two car objects and one person, each with a bounding box and confidence (0.92, 0.88 and 0.77), and the caption confidence is 0.81. The read result shows OCR extracted EXIT. Object detection locates people but does not identify them; identification would need Azure AI Face under Limited Access. The response includes locations, so it is more than a single whole-image classification." },

  { id: "clu-match", d: 4, type: "match", title: "Label parts of a conversational language understanding request",
    prompt: "A travel bot receives the utterance: 'Book me a flight from Dublin to Rome next Friday.' Match each part to its role in a conversational language understanding (CLU) model.",
    pairs: [
      ["The whole sentence the user typed", "Utterance"],
      ["BookFlight", "Intent"],
      ["Rome", "Entity (destination)"],
      ["next Friday", "Entity (travel date)"]
    ],
    extra: ["Knowledge base answer", "Key phrase"],
    explain: "An utterance is the user's input, the intent is the goal it expresses (BookFlight), and entities are the details the app needs to act, such as destination and date. CLU returns the top intent and entities as structured data for your code; it does not return a knowledge base answer, which is what question answering does." },

  { id: "nlp-service-select", d: 4, type: "select", title: "Pick the services for a call-centre pipeline",
    prompt: "A contact centre wants to take recorded phone calls, produce written transcripts, mask card numbers in the transcripts and score each call as positive, neutral or negative. Select every capability the pipeline needs.",
    context: "Input: 12,000 recorded calls per day (WAV audio, English)\nOutput required per call: transcript text, transcript with card numbers masked, overall sentiment label",
    options: [
      "Azure AI Speech speech to text (batch transcription)",
      "Azure AI Speech text to speech",
      "Azure AI Language PII detection",
      "Azure AI Translator document translation",
      "Azure AI Language sentiment analysis",
      "Azure AI Language question answering"
    ],
    answers: [0, 2, 4],
    explain: "Speech to text turns the recorded audio into transcripts, and batch transcription suits stored recordings. PII detection finds card numbers and returns redacted text, and sentiment analysis labels each transcript. Text to speech produces audio, which is the wrong direction; the calls are already in English, so translation is not needed, and question answering serves FAQ bots rather than analysis." },

  { id: "rag-order", d: 5, type: "order", title: "Put the RAG steps in order",
    prompt: "An HR assistant answers questions from the employee handbook using retrieval augmented generation. Put these steps in the order they happen, from preparing the data to answering a question.",
    steps: [
      "Split the handbook into chunks and create an embedding vector for each chunk",
      "Store the chunks and vectors in a search index",
      "Receive the employee's question and embed it",
      "Retrieve the most relevant chunks from the index",
      "Add the retrieved chunks to the prompt with an instruction to answer only from them",
      "The model generates a grounded answer with citations"
    ],
    explain: "Data preparation comes first: chunk the content, embed it with an embeddings model and index it, for example in Azure AI Search. At question time the app embeds the question, retrieves similar chunks, augments the prompt and only then asks the chat model to generate. Retrieval before generation is what grounds the answer in current, private data without retraining." },

  { id: "genai-settings-fill", d: 5, type: "fill", title: "Choose prompt roles and settings",
    prompt: "A developer is configuring a chat app in the Foundry playground. Fill in the missing terms (one or two words each).",
    context: "Requirement A: Every reply must be in formal English, at most three bullet points, and refuse off-topic questions.\nRequirement B: The same invoice question should get the same wording every time.\nRequirement C: Replies are being cut off mid-sentence.\nRequirement D: The prompt includes three example reviews, each followed by its correct category.",
    fields: [
      { label: "Requirement A belongs in the ... message", answers: ["system", "system message"] },
      { label: "Requirement B: lower this setting", answers: ["temperature", "temp", "top_p", "top p"] },
      { label: "Requirement C: raise this setting", answers: ["max tokens", "max_tokens", "maximum tokens", "max response", "maximum response length", "max length"] },
      { label: "Requirement D is called ... prompting", answers: ["few-shot", "few shot", "fewshot"] }
    ],
    explain: "Rules, tone and format that apply to the whole conversation go in the system message. Lowering temperature (or top_p) makes token choice more deterministic, so answers repeat. Truncated replies mean the maximum response length (max tokens) is too low. Including a few worked examples in the prompt is few-shot prompting; with no examples it would be zero-shot." },

  { id: "rai-genai-order", d: 5, type: "order", title: "Order the responsible generative AI stages",
    prompt: "A team is preparing a customer-facing chatbot. Put Microsoft's responsible generative AI activities in the correct order.",
    steps: [
      "Identify potential harms, for example by red teaming and listing risks such as fabricated refunds or offensive replies",
      "Measure how often and how severely those harms occur using a set of test prompts",
      "Mitigate the harms in layers: content filters, a grounded system message and clear UI disclosures",
      "Operate the solution: phased rollout, monitoring, feedback and an incident response plan"
    ],
    explain: "Microsoft's guidance is identify, measure, mitigate, operate. You cannot measure a harm you have not identified, and measuring first gives a baseline to prove mitigations work. Mitigation uses several layers (model, safety system, system message and grounding, user experience), and operating responsibly continues after launch with monitoring and incident response." }
]);
