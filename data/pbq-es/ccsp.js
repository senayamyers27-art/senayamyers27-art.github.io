/* Spanish translation of the CCSP exam simulations. Same ids and structure as data/pbq/ccsp.js. */
CertHub.addPbqs("ccsp", [
  {
    "id": "cloud-terms-match",
    "d": 1,
    "type": "match",
    "title": "Relaciona los conceptos de nube con sus descripciones",
    "prompt": "Cada afirmación describe un concepto de computación en la nube de NIST SP 800-145 o ISO/IEC 17788. Relaciona cada afirmación con el concepto que describe.",
    "pairs": [
      [
        "Varias dependencias estatales con las mismas reglas de cumplimiento comparten un entorno de nube y dividen sus costos.",
        "Nube comunitaria"
      ],
      [
        "Una nube privada envía el trabajo excedente a un proveedor público en los picos de temporada, y ambas siguen conectadas.",
        "Nube híbrida"
      ],
      [
        "Una empresa ejecuta analítica en un proveedor y correo en otro para no depender de un solo proveedor.",
        "Multinube"
      ],
      [
        "Una aplicación agrega 40 servidores automáticamente a las 9 a. m. y los elimina a las 6 p. m.",
        "Elasticidad rápida"
      ],
      [
        "La factura mensual muestra las horas de cómputo y los gigabytes de almacenamiento usados por cada departamento.",
        "Servicio medido"
      ]
    ],
    "extra": [
      "Nube privada",
      "Agrupación de recursos"
    ],
    "explain": "Una nube comunitaria la comparten organizaciones con intereses comunes. Una nube híbrida conecta nubes distintas para que las cargas de trabajo se muevan entre ellas, como en el cloud bursting. Multinube simplemente significa usar más de un proveedor. La elasticidad rápida es la capacidad de crecer y reducirse rápidamente, y el servicio medido es la medición que permite el pago por uso y el cobro interno. Híbrida y multinube son el par que más se confunde: híbrida trata de modelos de despliegue distintos que trabajan juntos, multinube trata de más de un proveedor."
  },
  {
    "id": "bia-backup-check",
    "d": 1,
    "type": "fill",
    "title": "¿El diseño de respaldos cumple el BIA?",
    "prompt": "Usa el diseño de respaldos y el análisis de impacto al negocio de abajo para responder cada pregunta. Escribe los números como dígitos simples y responde las preguntas de sí o no con sí o no.",
    "context": "Base de datos de pedidos - análisis de impacto al negocio\nRPO: 2 horas          RTO: 3 horas\n\nDiseño actual\nCalendario de instantáneas:   cada 4 horas (00:00, 04:00, 08:00 ...)\nRestaurar la instantánea en una instancia nueva:  90 minutos\nRedirigir la aplicación y el DNS:                 30 minutos",
    "fields": [
      {
        "label": "Pérdida de datos en el peor caso, en horas",
        "answers": [
          "4",
          "4 horas",
          "4h"
        ]
      },
      {
        "label": "Tiempo total de recuperación, en minutos",
        "answers": [
          "120",
          "120 minutos"
        ]
      },
      {
        "label": "¿Se cumple el RPO? (sí o no)",
        "answers": [
          "no"
        ]
      },
      {
        "label": "¿Se cumple el RTO? (sí o no)",
        "answers": [
          "sí",
          "si"
        ]
      }
    ],
    "explain": "Con instantáneas cada cuatro horas, una falla justo antes de la siguiente instantánea pierde hasta cuatro horas de datos, el doble del RPO de dos horas. La recuperación toma 90 + 30 = 120 minutos, dentro del RTO de tres horas. La solución es replicar o respaldar al menos cada dos horas (por ejemplo con replicación continua de la base de datos), no acelerar la restauración. Recuerda que el RPO determina la frecuencia de respaldo y el RTO la velocidad de restauración."
  },
  {
    "id": "data-protection-match",
    "d": 2,
    "type": "match",
    "title": "Elige la técnica de protección de datos",
    "prompt": "Relaciona cada requisito con la técnica de protección de datos que mejor lo cumple.",
    "pairs": [
      [
        "Quitar los números de tarjeta reales de los sistemas de pedidos y analítica para sacarlos de la mayor parte del alcance de PCI DSS, mientras los pagos siguen funcionando.",
        "Tokenización"
      ],
      [
        "Dar a los desarrolladores una copia realista pero alterada de forma permanente de los datos de clientes de producción para pruebas.",
        "Enmascaramiento estático"
      ],
      [
        "Permitir que los agentes de soporte vean solo los últimos cuatro dígitos de un teléfono mientras los supervisores lo ven completo, desde la misma base de datos.",
        "Enmascaramiento dinámico"
      ],
      [
        "Hacer ilegible cada copia de un conjunto de datos retirado en el almacenamiento compartido de un proveedor que no puedes borrar físicamente.",
        "Borrado criptográfico"
      ],
      [
        "Impedir que un antiguo socio abra un documento de diseño que ya descargó en su laptop.",
        "Gestión de derechos de información"
      ]
    ],
    "extra": [
      "Hashing",
      "Prevención de pérdida de datos"
    ],
    "explain": "La tokenización cambia los valores sensibles por tokens aleatorios y guarda los valores reales en una bóveda separada, lo que reduce el alcance de cumplimiento. El enmascaramiento estático crea una copia enmascarada permanente para usos fuera de producción, mientras que el dinámico oculta los valores al consultar según el usuario. El borrado criptográfico destruye las llaves para que todas las copias cifradas sean ilegibles, el método práctico de sanitización en la nube. IRM mantiene la protección unida al archivo para poder revocar derechos después de que sale. El hashing es unidireccional y no sirve para pagos, y la DLP impide que los datos salgan, pero no alcanza una copia ya entregada."
  },
  {
    "id": "data-lifecycle-order",
    "d": 2,
    "type": "order",
    "title": "Ciclo de vida seguro de los datos en la nube",
    "prompt": "Ordena las fases del ciclo de vida seguro de los datos en la nube, según las describe la Cloud Security Alliance.",
    "steps": [
      "Crear",
      "Almacenar",
      "Usar",
      "Compartir",
      "Archivar",
      "Destruir"
    ],
    "explain": "Los datos se crean (incluida la modificación), se almacenan casi de inmediato, luego se usan y se comparten, se archivan cuando ya no están activos y al final se destruyen. Los datos reales pueden pasar muchas veces por usar y compartir, pero este es el orden de referencia. La clasificación pertenece a la fase de creación, y la destrucción en la nube suele depender del borrado criptográfico porque el cliente no puede destruir físicamente los medios compartidos."
  },
  {
    "id": "bucket-policy-review",
    "d": 2,
    "type": "select",
    "title": "Revisa la política de un bucket de almacenamiento",
    "prompt": "Requisito: solo el rol de reportes puede leer objetos, nadie fuera de la cuenta puede acceder al bucket, las solicitudes deben usar TLS y los objetos deben cifrarse con la llave administrada por el cliente de la empresa. Selecciona cada ajuste que viola el requisito.",
    "context": "Bucket: finance-reports-prod\n1  Bloqueo de acceso público a nivel de cuenta:   DESACTIVADO\n2  Declaración A: Allow  s3:GetObject   Principal: role/reporting\n3  Declaración B: Allow  s3:GetObject   Principal: *  (cualquiera)\n4  Declaración C: Deny   s3:*          Condition: aws:SecureTransport = false\n5  Cifrado predeterminado: SSE con llave administrada por el proveedor\n6  Registro de acceso al servidor: activado hacia la cuenta log-archive",
    "options": [
      "Ajuste 1",
      "Ajuste 2",
      "Ajuste 3",
      "Ajuste 4",
      "Ajuste 5",
      "Ajuste 6"
    ],
    "answers": [
      0,
      2,
      4
    ],
    "explain": "El ajuste 3 da acceso de lectura a cualquiera, lo que expone los informes públicamente, y el ajuste 1 deja desactivado el bloqueo de acceso público de la cuenta, así que nada impide ese permiso. El ajuste 5 usa una llave administrada por el proveedor en lugar de la llave administrada por el cliente que se exige. El ajuste 2 es el permiso previsto de mínimo privilegio, el ajuste 4 niega correctamente cualquier solicitud que no use TLS y el ajuste 6 envía los registros de acceso a una cuenta separada, lo que apoya la rendición de cuentas."
  },
  {
    "id": "security-group-review",
    "d": 3,
    "type": "select",
    "title": "Reglas de grupos de seguridad frente a la política",
    "prompt": "Política: solo el balanceador de carga puede llegar a la capa de aplicación en el puerto 443, solo la capa de aplicación puede llegar a la base de datos en el 5432, y los administradores se conectan mediante el administrador de sesiones del proveedor (sin SSH ni RDP desde internet). Selecciona cada regla que viola la política.",
    "context": "Grupos de seguridad - reglas de entrada\n#  Grupo     Origen            Puerto  Protocolo\n1  app-sg    lb-sg             443     tcp\n2  app-sg    0.0.0.0/0         22      tcp\n3  db-sg     app-sg            5432    tcp\n4  db-sg     10.0.0.0/16       5432    tcp\n5  lb-sg     0.0.0.0/0         443     tcp\n6  app-sg    0.0.0.0/0         3389    tcp",
    "options": [
      "Regla 1",
      "Regla 2",
      "Regla 3",
      "Regla 4",
      "Regla 5",
      "Regla 6"
    ],
    "answers": [
      1,
      3,
      5
    ],
    "explain": "Las reglas 2 y 6 abren SSH y RDP a toda internet, lo que la política prohíbe porque la administración pasa por el administrador de sesiones. La regla 4 permite que todo el rango de direcciones de la VPC llegue a la base de datos, no solo la capa de aplicación. Las reglas 1 y 3 hacen referencia a los grupos de seguridad del balanceador y de la aplicación, que es el patrón preciso de mínimo privilegio, y la regla 5 expone correctamente a internet solo el balanceador en HTTPS."
  },
  {
    "id": "tier-match",
    "d": 3,
    "type": "match",
    "title": "Niveles de centros de datos",
    "prompt": "Relaciona cada descripción con el nivel Tier del Uptime Institute que define.",
    "pairs": [
      [
        "Una sola ruta de energía y enfriamiento sin componentes redundantes; el mantenimiento requiere apagar.",
        "Tier I"
      ],
      [
        "Componentes de capacidad redundantes, como generadores adicionales, pero todavía una sola ruta de distribución.",
        "Tier II"
      ],
      [
        "Varias rutas de distribución para dar mantenimiento a cualquier componente sin apagar el equipo de TI.",
        "Tier III"
      ],
      [
        "Sigue operando ante cualquier falla individual no planificada, con sistemas redundantes compartimentados.",
        "Tier IV"
      ]
    ],
    "extra": [
      "Tier 0",
      "Tier V"
    ],
    "explain": "Las palabras clave son básico (Tier I), componentes redundantes (Tier II), mantenible de forma concurrente (Tier III) y tolerante a fallas (Tier IV). El Tier III es el nivel más bajo que permite mantenimiento planificado sin tiempo de inactividad; el Tier IV agrega tolerancia a fallas no planificadas. La clasificación del Uptime Institute tiene solo cuatro niveles."
  },
  {
    "id": "stride-match",
    "d": 4,
    "type": "match",
    "title": "Clasificación de amenazas STRIDE",
    "prompt": "Un equipo hace el modelado de amenazas de una API de nube para compartir archivos. Relaciona cada hallazgo con su categoría de STRIDE.",
    "pairs": [
      [
        "Quien llama puede subir archivos que parecen venir de otro usuario.",
        "Suplantación"
      ],
      [
        "Los archivos en tránsito entre dos microservicios pueden modificarse sin que se detecte.",
        "Manipulación"
      ],
      [
        "Los borrados no se registran, así que un usuario puede negar haber eliminado una carpeta compartida.",
        "Repudio"
      ],
      [
        "Una página de error devuelve la cadena de conexión completa del almacenamiento.",
        "Divulgación de información"
      ],
      [
        "Un cliente puede enviar subidas grandes ilimitadas y agotar el servicio para todos.",
        "Denegación de servicio"
      ],
      [
        "Un usuario normal puede llamar a un endpoint solo para administradores que cambia las cuotas de otros usuarios.",
        "Elevación de privilegios"
      ]
    ],
    "explain": "STRIDE relaciona cada amenaza con la propiedad que viola: la suplantación rompe la autenticación, la manipulación la integridad, el repudio el no repudio, la divulgación de información la confidencialidad, la denegación de servicio la disponibilidad y la elevación de privilegios la autorización. Las mitigaciones típicas son una identidad fuerte de quien llama, firmas o TLS, registro de auditoría, errores genéricos y gestión de secretos, límites de tasa y cuotas, y autorización del lado del servidor en cada solicitud."
  },
  {
    "id": "cloud-forensics-order",
    "d": 5,
    "type": "order",
    "title": "Preserva la evidencia de una instancia comprometida",
    "prompt": "Un servidor web en IaaS muestra señales de compromiso. Ordena los pasos de respuesta de manera que se detenga el ataque y se preserve la mayor cantidad de evidencia.",
    "steps": [
      "Aplicar a la instancia un grupo de seguridad de aislamiento restrictivo",
      "Capturar la memoria volátil con el agente preinstalado",
      "Tomar instantáneas de los volúmenes de disco conectados",
      "Calcular y anotar los hashes SHA-256 de la imagen de memoria y las instantáneas en el formulario de cadena de custodia",
      "Analizar copias de la evidencia en una cuenta forense separada",
      "Reconstruir la carga de trabajo desde una imagen dorada limpia"
    ],
    "explain": "El aislamiento contiene al atacante sin apagar la instancia, así que la memoria se conserva. La memoria es la evidencia más volátil y se captura primero; después se toman instantáneas de los discos. Calcular el hash al adquirir y anotarlo en el formulario de cadena de custodia demuestra la integridad después. El análisis se hace sobre copias en una cuenta separada para que la evidencia quede intacta, y solo entonces se reconstruye la carga de trabajo. Terminar o reiniciar primero es el error clásico porque destruye la evidencia volátil."
  },
  {
    "id": "itsm-match",
    "d": 5,
    "type": "match",
    "title": "Procesos operativos",
    "prompt": "Relaciona cada actividad con el proceso de gestión de servicios de TI (ITIL / ISO/IEC 20000-1) al que pertenece.",
    "pairs": [
      [
        "Restaurar el servicio de pago en menos de 30 minutos después de que deja de responder.",
        "Gestión de incidentes"
      ],
      [
        "Averiguar por qué los certificados siguen venciendo y eliminar la causa.",
        "Gestión de problemas"
      ],
      [
        "Evaluar, aprobar y programar una actualización de reglas de firewall con un plan de reversión.",
        "Gestión de cambios"
      ],
      [
        "Mantener en la CMDB los registros de los servidores, sus versiones de software y sus dependencias.",
        "Gestión de la configuración"
      ],
      [
        "Empaquetar, probar y pasar a producción una nueva versión de la aplicación.",
        "Gestión de liberaciones y despliegues"
      ]
    ],
    "extra": [
      "Gestión de la capacidad",
      "Gestión de niveles de servicio"
    ],
    "explain": "La gestión de incidentes restaura el servicio lo más rápido posible, mientras que la gestión de problemas encuentra y elimina las causas raíz para que los incidentes no se repitan. La gestión de cambios controla las modificaciones mediante evaluación y aprobación, la gestión de la configuración mantiene un registro preciso de los elementos de configuración y sus relaciones, y la gestión de liberaciones y despliegues pasa los cambios probados a producción en paquetes controlados."
  },
  {
    "id": "compliance-match",
    "d": 6,
    "type": "match",
    "title": "Leyes, estándares y programas",
    "prompt": "Relaciona cada situación con la ley, el estándar o el programa que la rige de forma más directa.",
    "pairs": [
      [
        "El proveedor de nube de un hospital de EE. UU. debe firmar un acuerdo para proteger los expedientes de pacientes.",
        "HIPAA"
      ],
      [
        "Una tienda en línea guarda y transmite datos de titulares de tarjetas en la nube.",
        "PCI DSS"
      ],
      [
        "Un servicio de nube quiere vender a dependencias federales de EE. UU.",
        "FedRAMP"
      ],
      [
        "Un banco de EE. UU. debe proteger la información financiera personal no pública de sus clientes.",
        "GLBA"
      ],
      [
        "Una empresa trata datos personales de personas en la Unión Europea.",
        "RGPD"
      ]
    ],
    "extra": [
      "ISO/IEC 27050",
      "SOX"
    ],
    "explain": "HIPAA cubre la información de salud en EE. UU. y exige acuerdos de socio comercial con los proveedores que la manejan. PCI DSS es el estándar contractual de la industria de tarjetas para los datos de titulares. FedRAMP estandariza la autorización de seguridad de los servicios de nube para uso federal de EE. UU., con base en NIST SP 800-53 y el RMF. GLBA cubre la información de clientes de las instituciones financieras, y el RGPD aplica a los datos personales de personas en la UE sin importar dónde esté la organización. ISO/IEC 27050 trata del eDiscovery y SOX de los controles de información financiera."
  }
]);
