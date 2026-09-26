/* Spanish translation of the Microsoft Azure AI Fundamentals (AI-900) exam simulations. Same ids and structure as data/pbq/ai-900.js. */
CertHub.addPbqs("ai-900", [
  { id: "workload-match", d: 1, type: "match", title: "Relaciona necesidades de negocio con cargas de trabajo de IA",
    prompt: "Una consultora reunió estas solicitudes de un cliente. Relaciona cada solicitud con la carga de trabajo de IA que describe.",
    pairs: [
      ["Estimar las ventas del próximo trimestre de cada tienda a partir de ventas y promociones pasadas", "Predicción y pronóstico (forecasting)"],
      ["Marcar pagos con tarjeta que se ven muy distintos del gasto habitual de un cliente", "Detección de anomalías"],
      ["Contar los montacargas en cada foto de las cámaras del almacén", "Computer vision (visión por computadora)"],
      ["Extraer el nombre del proveedor y el total de facturas escaneadas hacia el sistema de finanzas", "Procesamiento de documentos"],
      ["Redactar una primera versión de cada boletín semanal a partir de notas en viñetas", "IA generativa"],
      ["Indicar si cada comentario de una encuesta de clientes es positivo o negativo", "Procesamiento de lenguaje natural (NLP)"]
    ],
    extra: ["Clustering (agrupamiento)", "Síntesis de voz"],
    explain: "Estimar un número futuro es forecasting, y detectar pagos inusuales es detección de anomalías. Contar montacargas en imágenes es computer vision (detección de objetos), mientras que extraer campos específicos de facturas es procesamiento de documentos, no simple OCR. Escribir un nuevo borrador de boletín es IA generativa, y juzgar el tono de un texto es NLP (análisis de sentimiento). El clustering y la síntesis de voz no encajan con ninguna de estas solicitudes." },

  { id: "rai-principles", d: 1, type: "match", title: "Relaciona acciones con principios de IA responsable",
    prompt: "Un líder de gobierno de IA enumera las acciones tomadas en un nuevo sistema de aprobación de préstamos. Relaciona cada acción con el principio de IA responsable de Microsoft que apoya de forma más directa.",
    pairs: [
      ["Comparó las tasas de aprobación de solicitantes de distintas edades y géneros con finanzas similares", "Equidad (fairness)"],
      ["Probó el modelo con solicitudes inusuales y envía los casos de baja confianza a un analista de crédito", "Confiabilidad y seguridad (reliability and safety)"],
      ["Cifró los datos de los solicitantes y eliminó los nombres antes del entrenamiento", "Privacidad y seguridad (privacy and security)"],
      ["Hizo que el formulario en línea se pudiera usar con un lector de pantalla y estuviera disponible en cinco idiomas", "Inclusión (inclusiveness)"],
      ["Muestra a los solicitantes los principales factores detrás de su decisión", "Transparencia"],
      ["Creó un comité de revisión que aprueba el modelo y se hace cargo de las quejas sobre él", "Responsabilidad (accountability)"]
    ],
    explain: "La equidad se trata de que personas similares obtengan resultados similares entre distintos grupos, mientras que la inclusión se trata de que todos puedan usar el sistema. Manejar con seguridad los casos inusuales y de baja confianza es confiabilidad y seguridad. Proteger y minimizar los datos personales es privacidad y seguridad. Explicar las decisiones es transparencia, y tener una propiedad y un gobierno claros es responsabilidad (accountability)." },

  { id: "ml-type-select", d: 2, type: "select", title: "Identifica los escenarios de regresión",
    prompt: "Un equipo de ciencia de datos tiene una lista pendiente de proyectos propuestos. Selecciona cada proyecto que sea una tarea de regresión.",
    context: "Backlog de proyectos\n1. Predecir cuántos minutos tardará cada entrega\n2. Decidir si cada correo es spam o no spam\n3. Estimar el consumo eléctrico del próximo mes en kWh de cada hogar\n4. Agrupar a los clientes en segmentos sin categorías predefinidas\n5. Predecir el precio de venta de cada auto usado\n6. Asignar cada ticket de soporte a uno de cinco equipos",
    options: ["1. Tiempo de entrega en minutos", "2. Spam o no spam", "3. Consumo eléctrico en kWh", "4. Segmentos de clientes", "5. Precio de venta de autos usados", "6. Asignación de tickets a equipos"],
    answers: [0, 2, 4],
    explain: "La regresión predice un valor numérico, así que los minutos de entrega, los kWh y el precio de venta son regresión. Spam o no spam es clasificación binaria, y enrutar tickets a cinco equipos es clasificación multiclase. Agrupar clientes sin categorías predefinidas es clustering, que es aprendizaje no supervisado." },

  { id: "confusion-fill", d: 2, type: "fill", title: "Calcula métricas a partir de una matriz de confusión",
    prompt: "Un modelo de fraude se probó con 1,000 transacciones. Usa la matriz de confusión para completar las métricas como decimales redondeados a dos cifras (por ejemplo, 0.50).",
    context: "                    Predicted fraud   Predicted legitimate\nActual fraud               40                 10\nActual legitimate          20                930",
    fields: [
      { label: "Accuracy (exactitud) ((TP + TN) / total)", answers: ["0.97", ".97", "97%"] },
      { label: "Precision (precisión) (TP / (TP + FP))", answers: ["0.67", ".67", "67%"] },
      { label: "Recall (sensibilidad) (TP / (TP + FN))", answers: ["0.80", "0.8", ".8", ".80", "80%"] }
    ],
    explain: "TP = 40, FN = 10, FP = 20 y TN = 930. La accuracy es (40 + 930) / 1000 = 0.97, que se ve excelente solo porque el fraude es poco común. La precision es 40 / 60 = 0.67, así que un tercio de las alertas son falsas alarmas, y el recall es 40 / 50 = 0.80, así que el modelo deja pasar uno de cada cinco fraudes. Con clases desbalanceadas, la precision y el recall dicen mucho más que la accuracy." },

  { id: "vision-feature-match", d: 3, type: "match", title: "Elige la capacidad de visión para cada requisito",
    prompt: "Una empresa de medios enumera sus requisitos de imágenes. Relaciona cada requisito con la capacidad de Azure que lo cumple.",
    pairs: [
      ["Escribir una descripción de una oración de cada foto para usuarios de lectores de pantalla", "Captions de Azure AI Vision"],
      ["Extraer el texto impreso de fotos de señales de tránsito", "Read (OCR) de Azure AI Vision"],
      ["Devolver el proveedor, las partidas y el total de las facturas de proveedores", "Modelo prediseñado de facturas de Document Intelligence"],
      ["Sugerir la mejor región cuadrada de cada foto para las miniaturas", "Smart crops de Azure AI Vision"],
      ["Encontrar cada rostro e informar si está borroso o si la persona usa lentes", "Detección de rostros de Azure AI Face"]
    ],
    extra: ["Reconocimiento de emociones de Azure AI Face", "Extracción de frases clave de Azure AI Language"],
    explain: "Los captions producen una oración legible para el texto alternativo, Read extrae texto de las imágenes y los smart crops eligen una región para la miniatura. Los campos de una factura necesitan Document Intelligence, porque el OCR devuelve texto sin saber qué valor es el total. La detección de rostros devuelve la ubicación de los rostros y atributos como el desenfoque y los lentes. El reconocimiento de emociones se retiró de Azure AI Face, y la extracción de frases clave funciona con texto, no con imágenes." },

  { id: "vision-response-select", d: 3, type: "select", title: "Lee una respuesta de análisis de imagen",
    prompt: "Un desarrollador llamó al análisis de imágenes de Azure AI Vision con una foto de un estacionamiento. Selecciona cada afirmación que la respuesta respalda.",
    context: "{\n  \"captionResult\": { \"text\": \"a parking lot with cars and a person walking\", \"confidence\": 0.81 },\n  \"objectsResult\": { \"values\": [\n    { \"boundingBox\": { \"x\": 12, \"y\": 140, \"w\": 210, \"h\": 120 }, \"tags\": [{ \"name\": \"car\", \"confidence\": 0.92 }] },\n    { \"boundingBox\": { \"x\": 260, \"y\": 150, \"w\": 190, \"h\": 110 }, \"tags\": [{ \"name\": \"car\", \"confidence\": 0.88 }] },\n    { \"boundingBox\": { \"x\": 480, \"y\": 90, \"w\": 60, \"h\": 170 }, \"tags\": [{ \"name\": \"person\", \"confidence\": 0.77 }] }\n  ] },\n  \"readResult\": { \"blocks\": [ { \"lines\": [ { \"text\": \"EXIT\" } ] } ] }\n}",
    options: [
      "Se detectaron dos autos, cada uno con un bounding box",
      "El servicio identificó quién es la persona de la foto",
      "La función Read (OCR) extrajo el texto EXIT",
      "El caption se generó con 81% de confianza",
      "La respuesta clasifica toda la imagen solo como 'car park', sin ubicaciones",
      "La persona se detectó con menor confianza que cualquiera de los dos autos"
    ],
    answers: [0, 2, 3, 5],
    explain: "El resultado de objetos lista dos objetos car y una person, cada uno con un bounding box y una confianza (0.92, 0.88 y 0.77), y la confianza del caption es 0.81. El resultado de lectura muestra que el OCR extrajo EXIT. La detección de objetos ubica a las personas, pero no las identifica; identificarlas requeriría Azure AI Face con Limited Access. La respuesta incluye ubicaciones, así que es más que una simple clasificación de toda la imagen." },

  { id: "clu-match", d: 4, type: "match", title: "Identifica las partes de una solicitud de conversational language understanding",
    prompt: "Un bot de viajes recibe el enunciado: 'Book me a flight from Dublin to Rome next Friday.' Relaciona cada parte con su función en un modelo de conversational language understanding (CLU).",
    pairs: [
      ["La oración completa que escribió el usuario", "Utterance (enunciado)"],
      ["BookFlight", "Intent (intención)"],
      ["Rome", "Entity (destino)"],
      ["next Friday", "Entity (fecha de viaje)"]
    ],
    extra: ["Respuesta de una knowledge base", "Frase clave"],
    explain: "Un utterance es la entrada del usuario, el intent es el objetivo que expresa (BookFlight) y las entities son los detalles que la aplicación necesita para actuar, como el destino y la fecha. CLU devuelve el intent principal y las entities como datos estructurados para tu código; no devuelve una respuesta de una knowledge base, que es lo que hace question answering." },

  { id: "nlp-service-select", d: 4, type: "select", title: "Elige los servicios para un pipeline de call center",
    prompt: "Un centro de contacto quiere tomar llamadas telefónicas grabadas, producir transcripciones escritas, enmascarar los números de tarjeta en las transcripciones y calificar cada llamada como positiva, neutral o negativa. Selecciona cada capacidad que necesita el pipeline.",
    context: "Input: 12,000 recorded calls per day (WAV audio, English)\nOutput required per call: transcript text, transcript with card numbers masked, overall sentiment label",
    options: [
      "Speech to text de Azure AI Speech (batch transcription)",
      "Text to speech de Azure AI Speech",
      "Detección de PII de Azure AI Language",
      "Traducción de documentos de Azure AI Translator",
      "Análisis de sentimiento de Azure AI Language",
      "Question answering de Azure AI Language"
    ],
    answers: [0, 2, 4],
    explain: "Speech to text convierte el audio grabado en transcripciones, y la batch transcription es adecuada para grabaciones almacenadas. La detección de PII encuentra los números de tarjeta y devuelve el texto redactado, y el análisis de sentimiento etiqueta cada transcripción. Text to speech produce audio, que es la dirección equivocada; las llamadas ya están en inglés, así que no hace falta traducir, y question answering sirve para bots de preguntas frecuentes, no para análisis." },

  { id: "rag-order", d: 5, type: "order", title: "Ordena los pasos de RAG",
    prompt: "Un asistente de RR. HH. responde preguntas a partir del manual del empleado usando retrieval augmented generation. Pon estos pasos en el orden en que ocurren, desde la preparación de los datos hasta la respuesta a una pregunta.",
    steps: [
      "Dividir el manual en fragmentos (chunks) y crear un vector de embedding para cada fragmento",
      "Guardar los fragmentos y los vectores en un índice de búsqueda",
      "Recibir la pregunta del empleado y generar su embedding",
      "Recuperar del índice los fragmentos más relevantes",
      "Agregar los fragmentos recuperados al prompt con la instrucción de responder solo a partir de ellos",
      "El modelo genera una respuesta fundamentada (grounded) con citas"
    ],
    explain: "La preparación de los datos va primero: dividir el contenido en fragmentos, generar sus embeddings con un modelo de embeddings e indexarlo, por ejemplo en Azure AI Search. Al momento de la pregunta, la aplicación genera el embedding de la pregunta, recupera fragmentos similares, enriquece el prompt y solo entonces le pide al modelo de chat que genere. Recuperar antes de generar es lo que fundamenta la respuesta en datos actuales y privados sin volver a entrenar." },

  { id: "genai-settings-fill", d: 5, type: "fill", title: "Elige los roles y la configuración del prompt",
    prompt: "Un desarrollador está configurando una app de chat en el playground de Foundry. Completa los términos que faltan (una o dos palabras cada uno).",
    context: "Requisito A: Cada respuesta debe estar en inglés formal, tener como máximo tres viñetas y rechazar las preguntas fuera de tema.\nRequisito B: La misma pregunta sobre una factura debe recibir la misma redacción cada vez.\nRequisito C: Las respuestas se cortan a mitad de una oración.\nRequisito D: El prompt incluye tres reseñas de ejemplo, cada una seguida de su categoría correcta.",
    fields: [
      { label: "El requisito A va en el mensaje ... (message)", answers: ["system", "mensaje del sistema"] },
      { label: "Requisito B: reduce este parámetro", answers: ["temperature", "temp", "top_p", "top p"] },
      { label: "Requisito C: aumenta este parámetro", answers: ["max tokens", "max_tokens", "máximo de tokens", "max response", "longitud máxima de respuesta", "max length"] },
      { label: "El requisito D se llama prompting ...", answers: ["few-shot", "few shot", "fewshot"] }
    ],
    explain: "Las reglas, el tono y el formato que aplican a toda la conversación van en el system message. Reducir la temperature (o top_p) hace que la elección de tokens sea más determinista, así que las respuestas se repiten. Las respuestas truncadas significan que la longitud máxima de respuesta (max tokens) es demasiado baja. Incluir algunos ejemplos resueltos en el prompt es few-shot prompting; sin ejemplos sería zero-shot." },

  { id: "rai-genai-order", d: 5, type: "order", title: "Ordena las etapas de la IA generativa responsable",
    prompt: "Un equipo está preparando un chatbot de cara al cliente. Pon las actividades de IA generativa responsable de Microsoft en el orden correcto.",
    steps: [
      "Identificar los daños potenciales, por ejemplo con red teaming y una lista de riesgos como reembolsos inventados o respuestas ofensivas",
      "Medir con qué frecuencia y gravedad ocurren esos daños usando un conjunto de prompts de prueba",
      "Mitigar los daños por capas: filtros de contenido, un system message fundamentado y avisos claros en la interfaz",
      "Operar la solución: despliegue por fases, monitoreo, retroalimentación y un plan de respuesta a incidentes"
    ],
    explain: "La guía de Microsoft es identificar, medir, mitigar y operar. No puedes medir un daño que no has identificado, y medir primero te da una línea base para demostrar que las mitigaciones funcionan. La mitigación usa varias capas (modelo, sistema de seguridad, system message y grounding, experiencia de usuario), y operar de forma responsable continúa después del lanzamiento con monitoreo y respuesta a incidentes." }
]);
