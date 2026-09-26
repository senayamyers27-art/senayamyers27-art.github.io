/* Spanish translation of the CompTIA Project+ exam simulations. Same ids and structure as data/pbq/project-plus.js. */
CertHub.addPbqs("project-plus", [
  { id: "critical-path-fill", d: 1, type: "fill", title: "Encuentra la ruta crítica y la holgura",
    prompt: "Usa la lista de actividades del despliegue de red de una sucursal para completar los valores. Las duraciones están en días hábiles y todas las dependencias son de fin a inicio (finish-to-start).",
    context: "Actividad | Duración | Predecesora(s)\nA  Inspección del sitio            | 4 | -\nB  Pedir y recibir los equipos     | 6 | A\nC  Tender el cableado nuevo        | 3 | A\nD  Instalar los patch panels       | 4 | C\nE  Preparar y configurar           | 2 | B\nF  Instalar y probar               | 3 | D, E",
    fields: [
      { label: "Duración mínima posible del proyecto (días)", answers: ["15", "15 días"] },
      { label: "Ruta crítica (letras de las actividades en orden, p. ej. A-X-Y)", answers: ["A-B-E-F", "ABEF", "A B E F", "A,B,E,F", "A, B, E, F", "A>B>E>F", "A->B->E->F"] },
      { label: "Holgura total de la actividad C (días)", answers: ["1", "1 día"] }
    ],
    explain: "Hay dos rutas: A-B-E-F = 4 + 6 + 2 + 3 = 15 días y A-C-D-F = 4 + 3 + 4 + 3 = 14 días. La ruta más larga es la ruta crítica y fija la duración mínima de 15 días. Las actividades C y D están en la ruta de 14 días, así que cada una puede retrasarse 15 - 14 = 1 día sin atrasar el proyecto. Sumar todas las duraciones (22 días) es un error común porque ignora el trabajo que se hace en paralelo." },

  { id: "risk-response-match", d: 1, type: "match", title: "Relaciona escenarios de riesgo con estrategias de respuesta",
    prompt: "Un equipo de migración de data center planificó una respuesta para cada riesgo. Relaciona cada acción planificada con la estrategia de respuesta al riesgo que representa.",
    pairs: [
      ["Contratar un seguro de transporte para los servidores que se envían al nuevo sitio", "Transferir (Transfer)"],
      ["Hacer dos ensayos completos de la migración en un entorno de pruebas", "Mitigar (Mitigate)"],
      ["Sacar del alcance un producto de almacenamiento no probado y usar el modelo ya comprobado", "Evitar (Avoid)"],
      ["Registrar una pequeña probabilidad de problemas de estacionamiento el día de la mudanza y no tomar ninguna acción", "Aceptar (Accept)"],
      ["Asignar al ingeniero con más experiencia para que una tarea que podría terminar antes efectivamente lo haga", "Explotar (Exploit)"]
    ],
    extra: ["Escalar (Escalate)", "Compartir (Share)"],
    explain: "El seguro traslada el impacto financiero a un tercero (transferir). Los ensayos reducen la probabilidad y el impacto de una falla (mitigar). Quitar el producto riesgoso elimina por completo la amenaza (evitar). Un riesgo de baja prioridad que se deja sin acción se acepta y se vigila en el registro de riesgos. Asegurarte de que una oportunidad se concrete es explotar, una respuesta a riesgos positivos; compartir le daría parte de la oportunidad a un socio, y escalar entrega a otra persona un riesgo que está fuera de la autoridad del proyecto." },

  { id: "change-control-order", d: 1, type: "order", title: "Ordena el proceso de control de cambios",
    prompt: "A mitad del proyecto, un jefe de departamento pide una función de reportes adicional. Ordena correctamente los pasos de control de cambios.",
    steps: [
      "Recibir la solicitud y registrarla como una solicitud de cambio formal",
      "Anotar la solicitud en el registro de cambios (change log)",
      "Evaluar el impacto en alcance, cronograma, costo, calidad y riesgo",
      "Presentar la solicitud y la evaluación de impacto al comité de control de cambios (CCB)",
      "Actualizar las líneas base y los documentos del proyecto afectados después de la aprobación",
      "Comunicar la decisión al solicitante y a los interesados"
    ],
    explain: "Primero, un cambio debe documentarse y registrarse para poder darle seguimiento. Luego el equipo analiza su impacto para que quienes deciden entiendan las concesiones. El comité de control de cambios lo aprueba, lo rechaza o lo pospone. Solo después de la aprobación se actualizan las líneas base y los documentos y se programa el trabajo, y la decisión se comunica para que todos trabajen con el mismo plan. Empezar el trabajo antes de la aprobación es scope creep." },

  { id: "procurement-docs-match", d: 2, type: "match", title: "Elige el documento de adquisiciones correcto",
    prompt: "Un distrito escolar está comprando tecnología para un edificio nuevo. Relaciona cada situación con el documento de adquisiciones que necesita.",
    pairs: [
      ["Conocer qué productos audiovisuales para aulas existen antes de definir las necesidades", "Solicitud de información (RFI)"],
      ["Pedir a los proveedores que propongan un diseño de Wi-Fi, un enfoque y un precio para el edificio", "Solicitud de propuesta (RFP)"],
      ["Obtener precios de 300 laptops de un modelo exacto ya elegido", "Solicitud de cotización (RFQ)"],
      ["Describir los entregables, el cronograma y los criterios de aceptación que debe cumplir el instalador elegido", "Enunciado del trabajo (SOW)"],
      ["Comprometerse formalmente a comprar las laptops al precio acordado", "Orden de compra (PO)"]
    ],
    extra: ["Memorando de entendimiento (MOU)", "Acuerdo de nivel de servicio (SLA)"],
    explain: "Una RFI reúne información del mercado cuando la necesidad todavía es vaga. Una RFP pide a los proveedores que propongan una solución cuando el comprador conoce el problema pero no el mejor enfoque. Una RFQ pide precios cuando el artículo está totalmente especificado. El SOW define el trabajo que realizará el proveedor seleccionado y pasa a formar parte del contrato, y la orden de compra es la autorización formal del comprador para comprar. Un SLA fijaría metas de servicio continuas, algo que ninguna de estas situaciones describe." },

  { id: "pert-estimate-fill", d: 2, type: "fill", title: "Calcula estimaciones de tres puntos (PERT)",
    prompt: "El equipo dio estimaciones de tres puntos, en días, para dos actividades secuenciales de una migración de correo electrónico. Usa la fórmula PERT (beta) para completar los valores.",
    context: "Actividad                          | Optimista | Más probable | Pesimista\nMigración piloto de buzones        |     4     |      6       |     14\nMigración masiva de buzones        |     2     |      5       |     14",
    fields: [
      { label: "Estimación PERT de la migración piloto (días)", answers: ["7", "7 días", "7.0"] },
      { label: "Estimación PERT de la migración masiva (días)", answers: ["6", "6 días", "6.0"] },
      { label: "Duración total esperada de ambas actividades (días)", answers: ["13", "13 días", "13.0"] }
    ],
    explain: "La fórmula PERT es (O + 4M + P) / 6. Piloto: (4 + 24 + 14) / 6 = 42 / 6 = 7 días. Masiva: (2 + 20 + 14) / 6 = 36 / 6 = 6 días. Como las actividades son secuenciales, el total es 13 días. El promedio triangular simple, (O + M + P) / 3, daría 8 y 7 días, lo que le da menos peso al valor más probable." },

  { id: "closing-select", d: 2, type: "select", title: "Elige las actividades de cierre",
    prompt: "El cliente acaba de aceptar el entregable final de un proyecto de sistema de tickets. Selecciona todas las actividades de la lista de pendientes del project manager que pertenecen a la fase de cierre.",
    context: "Lista de pendientes, viernes\n1. Obtener la firma del patrocinador en el formulario de aceptación final\n2. Realizar el taller de lecciones aprendidas con el equipo\n3. Elaborar la estructura de desglose del trabajo (WBS) para las ideas de la fase 2\n4. Devolver a los contratistas y al personal a sus gerentes\n5. Programar la reunión de arranque (kickoff) del proyecto\n6. Archivar los registros del proyecto según la política de retención\n7. Emitir una RFP para una nueva herramienta de monitoreo\n8. Confirmar los entregables del proveedor y pagar la factura final",
    options: [
      "Obtener la firma del patrocinador en el formulario de aceptación final",
      "Realizar el taller de lecciones aprendidas con el equipo",
      "Elaborar la estructura de desglose del trabajo (WBS) para las ideas de la fase 2",
      "Devolver a los contratistas y al personal a sus gerentes",
      "Programar la reunión de arranque (kickoff) del proyecto",
      "Archivar los registros del proyecto según la política de retención",
      "Emitir una RFP para una nueva herramienta de monitoreo",
      "Confirmar los entregables del proveedor y pagar la factura final"
    ],
    answers: [0, 1, 3, 5, 7],
    explain: "El cierre abarca la aceptación formal, las lecciones aprendidas, la liberación de recursos, el archivo de registros y el cierre de contratos (confirmar las obligaciones del proveedor y el pago final). Elaborar una WBS y emitir una RFP son actividades de planificación, y la reunión de kickoff pertenece al inicio; si la fase 2 sigue adelante, empezaría como un proyecto o fase nuevos con su propio inicio y planificación." },

  { id: "evm-fill", d: 3, type: "fill", title: "Calcula las métricas de valor ganado",
    prompt: "Usa los datos de estado del mes 6 de un proyecto de renovación de equipos de escritorio para calcular las métricas de valor ganado. Supón que el desempeño de costos actual va a continuar.",
    context: "Budget at completion (BAC): $400,000\nPlanned value (PV):         $200,000\nEarned value (EV):          $180,000\nActual cost (AC):           $225,000",
    fields: [
      { label: "Variación del costo (CV) en dólares", answers: ["-45000", "-45,000", "-$45,000", "$-45,000", "-$45000"] },
      { label: "Índice de desempeño del costo (CPI)", answers: ["0.8", "0.80", ".8"] },
      { label: "Índice de desempeño del cronograma (SPI)", answers: ["0.9", "0.90", ".9"] },
      { label: "Estimación a la conclusión (EAC) en dólares", answers: ["500000", "500,000", "$500,000", "$500000"] }
    ],
    explain: "CV = EV - AC = 180,000 - 225,000 = -$45,000, así que el proyecto está por encima del presupuesto. CPI = EV / AC = 180,000 / 225,000 = 0.8 y SPI = EV / PV = 180,000 / 200,000 = 0.9, así que también va atrasado. Si el desempeño de costos actual continúa, EAC = BAC / CPI = 400,000 / 0.8 = $500,000, un sobrecosto de $100,000. Todas las fórmulas empiezan con EV, el valor del trabajo realmente completado." },

  { id: "quality-tools-match", d: 3, type: "match", title: "Relaciona cada necesidad con el gráfico o la herramienta correcta",
    prompt: "Un proyecto de mejora de la mesa de servicio tiene varias preguntas por responder. Relaciona cada pregunta con el gráfico o la herramienta que mejor la responde.",
    pairs: [
      ["¿Qué pocas categorías de tickets causan la mayoría de los incidentes?", "Diagrama de Pareto"],
      ["¿Cuáles son las posibles causas de las fallas al preparar laptops, agrupadas por personas, procesos y herramientas?", "Diagrama de espina de pescado (Ishikawa)"],
      ["¿El tiempo de resolución de tickets se mantiene dentro de sus límites superior e inferior cada semana?", "Gráfico de control"],
      ["¿El tiempo de resolución aumenta a medida que aumenta la cantidad de tickets abiertos por analista?", "Diagrama de dispersión"],
      ["¿Cuánto trabajo está hecho y cuánto ha crecido el alcance total en el release?", "Gráfico burnup"],
      ["¿Cuándo empieza y termina cada tarea del despliegue, y cuáles dependen de otras?", "Diagrama de Gantt"]
    ],
    extra: ["Histograma", "Matriz RACI"],
    explain: "Los diagramas de Pareto ordenan las categorías con una línea acumulada para revelar los pocos vitales. Los diagramas de espina de pescado organizan las posibles causas por categoría para el análisis de causa raíz. Los gráficos de control muestran si un proceso se mantiene dentro de los límites de control a lo largo del tiempo. Los diagramas de dispersión muestran la correlación entre dos variables. Los gráficos burnup muestran el trabajo completado frente a una línea de alcance separada, así que el crecimiento del alcance es visible. Los diagramas de Gantt muestran tareas, fechas y dependencias en una línea de tiempo. Un histograma muestra una distribución sin orden ni tiempo, y una matriz RACI muestra responsabilidades." },

  { id: "cab-review-select", d: 4, type: "select", title: "Revisa una solicitud de cambio en producción",
    prompt: "Formas parte del comité asesor de cambios (CAB). Lee la solicitud de cambio y selecciona todos los problemas por los que el CAB debería devolverla antes de aprobarla.",
    context: "Solicitud de cambio CR-2291\nTítulo: Actualizar la base de datos de pedidos a una nueva versión mayor\nSolicitado por: equipo del proyecto ERP\nProgramado: viernes 12 de diciembre, 14:00-16:00\nCalendario de la organización: congelamiento de cambios del 20 de nov al 5 de ene (solo cambios de emergencia)\nClasificación: cambio normal\nImpacto: registro de pedidos no disponible durante unas 2 horas\nPruebas: completadas en staging; resultados adjuntos\nRespaldo: respaldo completo programado a las 13:30 del mismo día\nPlan de rollback: ninguno - el proveedor dice que la actualización no puede fallar\nComunicación a usuarios: no planificada\nAprobadores: dueño de la base de datos, project manager del ERP",
    options: [
      "El cambio está programado en horario laboral en vez de en una ventana de mantenimiento",
      "La fecha cae dentro del congelamiento de cambios y el cambio no es de emergencia",
      "Las pruebas se hicieron en el entorno de staging",
      "No hay plan de rollback",
      "No se planificó ninguna comunicación a los usuarios afectados por la interrupción",
      "Se toma un respaldo completo antes del cambio"
    ],
    answers: [0, 1, 3, 4],
    explain: "Un cambio normal con dos horas de interrupción debe ejecutarse en una ventana de mantenimiento aprobada, no un viernes por la tarde, y no puede realizarse durante un congelamiento de cambios a menos que sea una emergencia real. Todo cambio en producción necesita un plan de rollback, prometa lo que prometa el proveedor, y hay que avisar a los usuarios con anticipación sobre la interrupción planificada. Probar en staging y tomar primero un respaldo completo son buenas prácticas, no problemas." },

  { id: "cloud-model-match", d: 4, type: "match", title: "Relaciona escenarios con modelos de nube",
    prompt: "Un comité directivo de TI está revisando cinco propuestas. Relaciona cada propuesta con el modelo de servicio o de implementación en la nube que describe.",
    pairs: [
      ["Rentar máquinas virtuales y administrar el sistema operativo para una aplicación heredada", "Infraestructura como servicio (IaaS)"],
      ["Implementar el código web propio del equipo mientras el proveedor administra los servidores, el SO y el runtime", "Plataforma como servicio (PaaS)"],
      ["Suscribirse a una aplicación terminada de correo y calendario y administrar solo usuarios y configuraciones", "Software como servicio (SaaS)"],
      ["Mantener el data center local y conectarlo a una nube pública para tener capacidad adicional", "Nube híbrida"],
      ["Operar un entorno de nube dedicado a una sola organización", "Nube privada"]
    ],
    extra: ["Nube comunitaria", "Función como servicio (FaaS)"],
    explain: "IaaS deja al cliente el SO y todo lo que está por encima, así que encaja con una aplicación heredada que necesita control del SO. PaaS oculta los servidores y el SO para que los desarrolladores solo implementen código y administren datos. SaaS entrega una aplicación completa; el cliente la configura y administra usuarios y datos. La nube híbrida combina recursos locales o privados con la nube pública, y una nube privada atiende a una sola organización. Una nube comunitaria la comparten varias organizaciones con requisitos en común." }
]);
