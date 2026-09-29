/* Spanish translation of the CISM exam simulations. Same ids and structure as data/pbq/cism.js. */
CertHub.addPbqs("cism", [
  { id: "governance-roles-match", d: 1, type: "match", title: "Quién hace qué en la gobernanza de seguridad",
    prompt: "Una aseguradora mediana está documentando sus roles de gobernanza de seguridad. Relaciona cada responsabilidad con el rol que debe tenerla.",
    pairs: [
      ["Aprueba el apetito de riesgo y rinde cuentas en última instancia por proteger los activos de información", "Consejo y alta dirección"],
      ["Reúne a líderes de negocio, TI, legal y riesgos para priorizar las iniciativas de seguridad", "Comité directivo de seguridad"],
      ["Diseña y dirige el programa de seguridad y reporta el riesgo a la dirección", "Gerente de seguridad de la información (CISO)"],
      ["Decide la clasificación de los datos de siniestros y aprueba quién puede acceder a ellos", "Dueño de los datos"],
      ["Aplica la configuración de acceso aprobada y ejecuta los respaldos de la base de datos de siniestros", "Custodio de los datos"],
      ["Da al consejo un aseguramiento independiente de que los controles funcionan", "Auditoría interna"]
    ],
    extra: ["Evaluador externo de penetración", "Supervisor de la mesa de ayuda"],
    explain: "La rendición de cuentas está en el consejo y los ejecutivos, que además fijan el apetito de riesgo. El comité directivo coordina a todo el negocio, el CISO es responsable de dirigir el programa, los dueños de datos (gerentes de negocio) clasifican los datos y aprueban los accesos, y los custodios implementan esas decisiones. Auditoría interna debe ser independiente de los controles que revisa, por eso brinda aseguramiento en lugar de operar controles. Un error común es hacer al CISO o a TI dueños de los datos del negocio." },
  { id: "strategy-steps-order", d: 1, type: "order", title: "Construir una estrategia de seguridad de la información",
    prompt: "A un nuevo CISO le piden elaborar una estrategia de seguridad a tres años. Ordena los pasos como deben ocurrir.",
    steps: [
      "Entender los objetivos del negocio, el apetito de riesgo y las obligaciones legales",
      "Evaluar el estado actual de las capacidades de seguridad y del riesgo",
      "Definir el estado deseado necesario para apoyar al negocio",
      "Analizar las brechas entre el estado actual y el deseado",
      "Priorizar las brechas en una hoja de ruta con recursos y métricas",
      "Obtener la aprobación y el financiamiento de la alta dirección"
    ],
    explain: "La estrategia empieza por el negocio: los objetivos, el apetito y las obligaciones determinan cómo se ve lo 'bueno'. Luego se evalúa el estado actual y se define el deseado, para analizar la brecha entre ambos. Las brechas se priorizan según el riesgo para el negocio en una hoja de ruta con costos y métricas, que aprueba la alta dirección. Elegir un marco o herramientas antes de entender el negocio es la trampa clásica." },
  { id: "control-value-fill", d: 2, type: "fill", title: "¿Vale la pena el control?",
    prompt: "Usa la entrada del registro de riesgos que aparece abajo para calcular cada valor. Escribe los montos en dólares enteros como números simples (por ejemplo 5000).",
    context: "Registro de riesgos R-07 - Caída de la tienda en línea por ataque DDoS\nPérdida por caída (SLE):                 $90,000\nCaídas esperadas por año (ARO):          0.5\n\nControl propuesto: servicio de protección DDoS\nCosto anual:                             $18,000\nARO esperado después del control:        0.1 (SLE sin cambios)",
    fields: [
      { label: "Expectativa de pérdida anualizada (ALE) antes del control", answers: ["45000", "$45,000", "45,000", "$45000"] },
      { label: "ALE después del control", answers: ["9000", "$9,000", "9,000", "$9000"] },
      { label: "Valor neto anual del control (ALE antes - ALE después - costo anual)", answers: ["18000", "$18,000", "18,000", "$18000"] }
    ],
    explain: "ALE = SLE x ARO, así que antes del control es 90,000 x 0.5 = 45,000 y después es 90,000 x 0.1 = 9,000. El control reduce la pérdida esperada en 36,000 al año y cuesta 18,000, lo que deja un valor neto de 18,000, así que está justificado financieramente. Un error común es comparar el costo del control con la SLE en lugar de con la reducción de la ALE." },
  { id: "kri-select", d: 2, type: "select", title: "Elige los indicadores clave de riesgo",
    prompt: "El comité de riesgos quiere señales de alerta temprana para sus principales riesgos. Selecciona las TRES métricas que funcionan mejor como indicadores clave de riesgo (KRI).",
    options: [
      "Porcentaje de servidores críticos con parches vencidos por más de 30 días",
      "Número de módulos de concientización publicados este año",
      "Número de cuentas privilegiadas no revisadas en los últimos 90 días",
      "Número total de reglas de firewall en el centro de datos",
      "Porcentaje de proveedores críticos cuya evaluación de seguridad venció",
      "Número de empleados de seguridad que asistieron a una conferencia"
    ],
    answers: [0, 2, 4],
    explain: "Un KRI señala que la exposición al riesgo aumenta antes de que ocurra una pérdida. Los parches vencidos en servidores críticos, las cuentas privilegiadas sin revisar y las evaluaciones de proveedores vencidas apuntan directamente a una mayor probabilidad de compromiso y pueden tener umbrales que disparen acciones. Los módulos publicados, el conteo de reglas de firewall y la asistencia a conferencias miden actividad o tamaño, no cambios en la exposición." },
  { id: "risk-ownership-select", d: 2, type: "select", title: "Detecta los errores de propiedad",
    prompt: "Revisa el extracto de un registro de riesgos. Selecciona las DOS entradas en las que el dueño del riesgo asignado no es adecuado.",
    context: "ID   Riesgo                                                          Dueño\nR-01 Reembolsos fraudulentos por el portal de atención al cliente     Jefe de atención al cliente\nR-02 Exposición de datos de nómina por un sistema de RR. HH. mal configurado   Gerente de seguridad de la información\nR-03 Paro de planta por ransomware en sistemas de producción         Director de operaciones\nR-04 Pérdida de datos de ventas si falla el proveedor del CRM        Administrador de bases de datos\nR-05 Multa regulatoria por notificar tarde una filtración            Director jurídico",
    options: ["R-01", "R-02", "R-03", "R-04", "R-05"],
    answers: [1, 3],
    explain: "Los dueños de riesgos deben ser los gerentes que rinden cuentas por el proceso de negocio afectado, con autoridad para financiar y aceptar el tratamiento. R-02 nombra al gerente de seguridad, que asesora sobre el riesgo pero no es dueño del proceso de RR. HH.; debería serlo el director de RR. HH. R-04 nombra a un administrador de bases de datos, un custodio que puede ser dueño de controles pero no puede tomar decisiones de negocio sobre el riesgo del proveedor del CRM; debería serlo el líder de ventas. Los demás dueños rinden cuentas por sus procesos." },
  { id: "doc-hierarchy-match", d: 3, type: "match", title: "¿Qué documento de gobernanza es?",
    prompt: "Cada frase proviene de un documento distinto del conjunto de acceso remoto de una empresa. Relaciona cada frase con su tipo de documento.",
    pairs: [
      ["\"El acceso remoto a los sistemas de la empresa debe estar autorizado y protegido según la clasificación de los datos.\"", "Política"],
      ["\"El acceso remoto requiere la VPN corporativa con MFA resistente al phishing en un dispositivo administrado.\"", "Estándar"],
      ["\"1. Abre el portal de MFA. 2. Escanea el código QR. 3. Ingresa el código de seis dígitos. 4. Cierra el ticket.\"", "Procedimiento"],
      ["\"En la medida de lo posible, evita trabajar con archivos confidenciales en redes Wi-Fi públicas.\"", "Guía"]
    ],
    extra: ["Registro de riesgos", "Acuerdo de nivel de servicio"],
    explain: "La política es la intención obligatoria de alto nivel de la dirección. El estándar fija un requisito obligatorio específico (VPN, MFA, dispositivo administrado). El procedimiento da las instrucciones paso a paso de una tarea. La guía es un consejo opcional, por eso usa expresiones como 'en la medida de lo posible'. Las tecnologías específicas van en los estándares para que la política se mantenga estable cuando cambia la tecnología." },
  { id: "vendor-clauses-select", d: 3, type: "select", title: "Cláusulas de contrato para un proveedor SaaS",
    prompt: "Una empresa tercerizará la atención al cliente con un proveedor SaaS que almacenará datos personales de clientes. Selecciona las TRES cláusulas que más ayudan a gestionar el riesgo de seguridad.",
    options: [
      "Derecho a auditar, o entrega anual de un informe de aseguramiento independiente como SOC 2 Tipo II",
      "Notificación de incidentes de seguridad que afecten datos de la empresa dentro de un número definido de horas",
      "El logotipo del proveedor debe aparecer en todos los correos de soporte",
      "Divulgación de subcontratistas, con obligaciones de seguridad equivalentes trasladadas a ellos",
      "Una garantía de que el proveedor nunca sufrirá un incidente de seguridad",
      "El proveedor usará la misma marca de laptops que la empresa"
    ],
    answers: [0, 1, 3],
    explain: "Los derechos de aseguramiento permiten verificar los controles a lo largo del tiempo, la notificación oportuna de incidentes permite cumplir los propios deberes legales, y la divulgación de subcontratistas con obligaciones trasladadas atiende el riesgo de cuarta parte. Una promesa de cero incidentes no se puede cumplir y no da protección práctica, mientras que los logotipos y las marcas de laptops no tienen valor de seguridad." },
  { id: "ir-phase-match", d: 4, type: "match", title: "Relaciona acciones con fases de respuesta a incidentes",
    prompt: "Estas acciones se realizaron durante un incidente de ransomware. Relaciona cada acción con la fase de respuesta a incidentes a la que pertenece.",
    pairs: [
      ["Hacer un ejercicio de mesa y autorizar de antemano a los respondedores para aislar equipos", "Preparación"],
      ["Validar una alerta del SIEM y confirmar que se están cifrando archivos", "Identificación"],
      ["Mover los servidores afectados a un segmento de red aislado", "Contención"],
      ["Eliminar la persistencia del atacante y parchear el equipo VPN explotado", "Erradicación"],
      ["Restaurar archivos desde respaldos limpios e inmutables y vigilar si hay reinfección", "Recuperación"],
      ["Hacer una revisión sin culpas y asignar acciones de mejora con responsables", "Lecciones aprendidas"]
    ],
    extra: ["Aceptación del riesgo", "Compras"],
    explain: "La preparación ocurre antes del incidente. La identificación confirma que el incidente es real. La contención limita la propagación, la erradicación elimina la causa y la debilidad que permitió la entrada, y la recuperación restaura operaciones limpias con monitoreo estrecho. Las lecciones aprendidas convierten la experiencia en mejoras. Restaurar antes de contener y erradicar es el error de orden más común, porque invita a la reinfección." },
  { id: "bcp-program-order", d: 4, type: "order", title: "Construir un programa de continuidad del negocio",
    prompt: "Una empresa no tiene ninguna capacidad de continuidad del negocio. Ordena los pasos para construirla.",
    steps: [
      "Obtener el patrocinio de la alta dirección y aprobar la política y el alcance de continuidad",
      "Realizar el análisis de impacto al negocio para fijar MTD, RTO y RPO",
      "Evaluar los riesgos para los procesos críticos e identificar controles preventivos",
      "Seleccionar estrategias de continuidad y recuperación",
      "Redactar los planes de continuidad del negocio y de recuperación ante desastres",
      "Capacitar al personal y probar los planes con ejercicios",
      "Mantener y actualizar los planes tras cambios y resultados de pruebas"
    ],
    explain: "El patrocinio de la dirección da autoridad y recursos al programa. El BIA identifica los procesos críticos y fija los objetivos de recuperación, la evaluación de riesgos identifica amenazas y controles preventivos, y esos resultados guían la elección de estrategias. Solo entonces se redactan, prueban y mantienen los planes. Elegir un sitio de recuperación antes del BIA es un error clásico, porque todavía no conoces los RTO que el sitio debe cumplir." },
  { id: "recovery-targets-fill", d: 4, type: "fill", title: "Objetivos de recuperación a partir del BIA",
    prompt: "Usa los resultados del BIA que aparecen abajo para responder cada pregunta. Escribe las horas como números simples (por ejemplo 12), o sí o no.",
    context: "BIA - Proceso de despacho de pedidos\nTiempo máximo tolerable de inactividad (MTD):     24 horas\nTiempo de recuperación del trabajo tras volver los sistemas:  6 horas (revisar y volver a capturar pedidos)\nPérdida de datos máxima aceptable:               4 horas\n\nCalendario actual de respaldos: cada 6 horas (00:00, 06:00, 12:00, 18:00)",
    fields: [
      { label: "RTO más largo (horas) del sistema de despacho que mantiene la inactividad total dentro del MTD", answers: ["18", "18 horas", "18h"] },
      { label: "RPO del proceso (horas)", answers: ["4", "4 horas", "4h"] },
      { label: "Pérdida de datos en el peor caso (horas) con el calendario de respaldos actual", answers: ["6", "6 horas", "6h"] },
      { label: "¿El calendario de respaldos actual cumple el RPO? (sí o no)", answers: ["no", "No", "NO"] }
    ],
    explain: "El sistema debe volver con tiempo suficiente para la recuperación del trabajo, así que RTO = MTD - tiempo de recuperación del trabajo = 24 - 6 = 18 horas. El RPO es la pérdida de datos máxima aceptable, 4 horas. Con respaldos cada 6 horas, una falla justo antes del siguiente respaldo pierde hasta 6 horas de datos, lo que supera el RPO de 4 horas, así que hay que cambiar el calendario (por ejemplo, respaldos cada 4 horas o replicación)." },
  { id: "evidence-handling-select", d: 4, type: "select", title: "Preserva la evidencia",
    prompt: "Se sospecha que un servidor de archivos se usó para robar datos de clientes, y es probable que haya acciones legales. Selecciona las TRES acciones que mejor preservan la evidencia.",
    options: [
      "Capturar la memoria y las conexiones de red activas antes de apagar el servidor",
      "Iniciar sesión en el servidor y explorar carpetas en busca de los archivos robados",
      "Crear una imagen forense del disco y registrar su hash criptográfico",
      "Ejecutar un antivirus completo sobre el disco original para eliminar el malware",
      "Registrar a cada persona que maneja la evidencia, cuándo y dónde se guarda",
      "Reinstalar el sistema operativo para que el servidor vuelva a operar rápido"
    ],
    answers: [0, 2, 4],
    explain: "Los datos volátiles, como la memoria, se pierden al apagar, así que se recolectan primero (orden de volatilidad). Una imagen forense con su hash registrado permite trabajar sobre una copia verificada mientras el original queda intacto, y los registros de cadena de custodia demuestran que la evidencia no se alteró. Explorar, escanear o reinstalar sobre el original cambia o destruye la evidencia y debilitaría cualquier caso legal." }
]);
