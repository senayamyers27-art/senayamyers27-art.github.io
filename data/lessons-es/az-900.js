CertHub.addLessons("az-900", [
 {
  t: "What cloud computing is, and the shared responsibility model across on-premises, IaaS, PaaS and SaaS",
  tt: "Qué es la computación en la nube y el modelo de responsabilidad compartida en on-premises, IaaS, PaaS y SaaS",
  body: [
   "La computación en la nube (cloud computing) es la entrega de servicios de cómputo, como servidores, almacenamiento, bases de datos, redes y software, a través de internet desde los datacenters de un proveedor. En lugar de comprar y operar tu propio hardware, alquilas capacidad a un proveedor como Microsoft Azure, la creas en minutos y pagas solo por lo que usas. El proveedor es dueño de los edificios, la energía, la refrigeración y las máquinas físicas; tú obtienes los recursos virtuales que funcionan encima.",
   "Pasar a la nube no significa entregar toda la responsabilidad. El modelo de responsabilidad compartida describe qué tareas le corresponden al proveedor de nube y cuáles se quedan contigo, el cliente. La división depende del tipo de servicio que elijas. En un datacenter on-premises (local) eres responsable de todo: el edificio, los servidores físicos, la red, los sistemas operativos, las aplicaciones, las identidades y los datos.",
   "Con infraestructura como servicio (IaaS), como las máquinas virtuales de Azure, Microsoft se hace cargo de la capa física: el datacenter, la red física y los hosts físicos, incluido el hipervisor. Tú sigues administrando el sistema operativo invitado, sus parches, las aplicaciones, los controles de red como las reglas de firewall que configuras, las identidades y los datos. Con plataforma como servicio (PaaS), como Azure App Service o Azure SQL Database, Microsoft también opera el sistema operativo y el runtime, así que tú te concentras en el código de tu aplicación, su configuración y tus datos. Con software como servicio (SaaS), como Microsoft 365, Microsoft opera toda la aplicación y tú principalmente la configuras y administras quién la usa.",
   "Algunas responsabilidades nunca pasan al proveedor, sin importar qué tipo de servicio elijas. Siempre eres dueño de tu información y tus datos, de los dispositivos (laptops y teléfonos) que se conectan al servicio y de las cuentas e identidades que inician sesión. Si le roban la contraseña a un empleado, o alguien comparte archivos sensibles de forma pública, eso es problema del cliente en todos los modelos. Del mismo modo, en la nube algunas responsabilidades siempre son del proveedor: los hosts físicos, la red física y el datacenter físico.",
   "Una forma útil de recordar el modelo es imaginar una pila de capas que va desde el edificio hasta los datos. Al pasar de on-premises a IaaS, a PaaS y a SaaS, la línea entre 'lo administra el proveedor' y 'lo administras tú' sube por la pila. Cuanto más administra el proveedor, menos control tienes y menos trabajo operativo haces."
  ],
  terms: [
   ["Cloud computing (computación en la nube)", "Entrega de servicios de cómputo como servidores, almacenamiento y software a través de internet, facturados por uso en lugar de comprarse como hardware."],
   ["Shared responsibility model (modelo de responsabilidad compartida)", "La división de tareas de seguridad y administración entre el proveedor de nube y el cliente, que cambia según el tipo de servicio."],
   ["Guest operating system (sistema operativo invitado)", "El sistema operativo que se ejecuta dentro de una máquina virtual; en IaaS el cliente lo instala, configura y parchea."],
   ["Hypervisor (hipervisor)", "El software en un host físico que ejecuta las máquinas virtuales; en la nube lo administra el proveedor."]
  ],
  example: "Un minorista traslada su aplicación de inventario desde su propio cuarto de servidores a VMs de Azure. Ahora Microsoft reemplaza los discos dañados y protege el datacenter, pero el equipo de TI del minorista sigue instalando las actualizaciones mensuales de Windows en las VMs, controla quién puede iniciar sesión y hace respaldos de los datos de inventario.",
  tip: "Las preguntas del examen suelen preguntar quién aplica los parches a algo. Los hosts físicos y el hipervisor siempre son de Microsoft; el sistema operativo invitado en IaaS es tuyo; los datos, dispositivos, cuentas e identidades siempre son tuyos.",
  check: [
   ["En IaaS, ¿quién aplica las actualizaciones de seguridad al sistema operativo Windows Server dentro de una VM?", "El cliente. En IaaS Microsoft administra los hosts físicos y el hipervisor, pero el sistema operativo invitado es responsabilidad del cliente."],
   ["Menciona las responsabilidades que se quedan con el cliente en todos los tipos de servicio.", "La información y los datos, los dispositivos (endpoints) y las cuentas e identidades."]
  ]
 },
 {
  t: "Cloud models: public, private and hybrid cloud, plus multicloud and where Azure Arc fits",
  tt: "Modelos de nube: nube pública, privada e híbrida, además de multicloud y el lugar de Azure Arc",
  body: [
   "Un modelo de nube, a veces llamado modelo de implementación, describe dónde se ejecutan los recursos de nube y quién los usa. El examen AZ-900 espera que reconozcas tres modelos principales, público, privado e híbrido, y que conozcas el término relacionado multicloud.",
   "Una nube pública es construida, poseída y operada por un proveedor externo como Microsoft, y sus servicios se ofrecen a cualquiera a través de internet. Muchos clientes (tenants o inquilinos) comparten la misma infraestructura física, aunque los recursos de cada tenant están aislados. La nube pública no tiene costo inicial de hardware, puedes aprovisionar recursos en minutos y pagas por lo que usas. La contrapartida es que no controlas el hardware físico ni exactamente dónde vive cada componente, más allá de elegir una región.",
   "Una nube privada la usa una sola organización. Puede ejecutarse en el datacenter propio de la organización o estar alojada por un tercero, pero los recursos están dedicados a esa única organización. La nube privada da el mayor control sobre el hardware, la seguridad y la configuración, lo que puede ayudar con requisitos de cumplimiento estrictos, pero la organización debe comprar, mantener y eventualmente reemplazar el hardware, así que pierde gran parte de la ventaja de costo y rapidez de la nube pública.",
   "Una nube híbrida combina nubes públicas y privadas y permite que los datos y las aplicaciones se muevan o trabajen juntos entre ellas. Una razón común es la regulación o la latencia: un hospital podría mantener sus expedientes de pacientes en hardware propio mientras ejecuta su sitio web público y sus análisis en Azure, conectados por un enlace seguro. La nube híbrida también ayuda a las empresas a migrar de forma gradual, o a expandirse hacia la nube pública (bursting) cuando se agota la capacidad on-premises.",
   "Multicloud significa usar servicios de más de un proveedor de nube pública, por ejemplo Azure y otro proveedor, quizá porque distintos equipos eligieron plataformas diferentes o para aprovechar una función que ofrece un proveedor. Multicloud se trata de varios proveedores; híbrido se trata de combinar privado y público. Una organización puede ser ambas cosas a la vez.",
   "Administrar recursos repartidos entre on-premises y varias nubes es difícil, porque cada lugar tiene sus propias herramientas. Azure Arc resuelve esto. Proyecta servidores, clústeres de Kubernetes y algunos servicios de datos que se ejecutan fuera de Azure hacia Azure Resource Manager, para que aparezcan en el Azure portal y puedan gobernarse con las mismas herramientas que usas para los recursos de Azure, como Azure Policy, el control de acceso basado en roles, las etiquetas (tags) y el monitoreo. Arc no mueve la carga de trabajo; esta se queda donde está."
  ],
  terms: [
   ["Public cloud (nube pública)", "Servicios de nube que un proveedor posee y opera, ofrecidos a muchos clientes a través de internet."],
   ["Private cloud (nube privada)", "Recursos de nube dedicados a una sola organización, ya sea on-premises o alojados por un tercero."],
   ["Hybrid cloud (nube híbrida)", "Una combinación de recursos de nube privada y pública que trabajan juntos."],
   ["Multicloud", "Usar servicios de dos o más proveedores de nube pública."],
   ["Azure Arc", "Un servicio que te permite administrar servidores, clústeres de Kubernetes y servicios de datos fuera de Azure mediante Azure Resource Manager."]
  ],
  example: "Un fabricante ejecuta servidores de control de planta on-premises, su tienda web en Azure y un almacén de datos en otra nube pública. Conecta los servidores y el clúster de Kubernetes de la otra nube a Azure Arc para que su equipo de seguridad pueda aplicar las mismas reglas de Azure Policy y las mismas etiquetas a todo desde un solo portal.",
  tip: "Híbrido significa privado más público; multicloud significa más de un proveedor público. Si la pregunta trata de administrar recursos que no están en Azure desde Azure sin moverlos, la respuesta es Azure Arc, no Azure Migrate.",
  check: [
   ["Una empresa usa Azure y otra nube pública, pero no tiene servidores on-premises. ¿Qué término encaja mejor?", "Multicloud, porque usa más de un proveedor de nube pública. Híbrido requeriría un componente privado u on-premises."],
   ["¿Qué modelo de nube le da a una organización el mayor control sobre su hardware?", "La nube privada, porque los recursos están dedicados a esa única organización, lo que también significa que ella paga por ellos y los mantiene."]
  ]
 },
 {
  t: "The consumption-based model and pay-as-you-go pricing compared with buying hardware",
  tt: "El modelo basado en el consumo y el precio de pago por uso frente a comprar hardware",
  body: [
   "Cuando operas tu propio datacenter, compras servidores, almacenamiento y equipos de red antes de poder usarlos. Tienes que adivinar cuánta capacidad necesitarás durante los próximos años. Si calculas de menos, las aplicaciones se vuelven lentas y esperas semanas por hardware nuevo. Si calculas de más, pagaste por máquinas que quedan ociosas. También pagas energía, refrigeración, espacio y personal, estén ocupadas las máquinas o no.",
   "La nube usa un modelo basado en el consumo: pagas por los recursos que realmente usas y nada por adelantado. Azure mide el uso, como cuántas horas estuvo encendida una máquina virtual, cuántos gigabytes están almacenados o cuántas veces se ejecutó una función, y te lo factura, normalmente cada mes. Cuando eliminas un recurso, sus cargos se detienen. Este enfoque de precios suele llamarse pago por uso (pay-as-you-go).",
   "El precio basado en el consumo trae varios beneficios. No hay costos iniciales, así que un equipo pequeño puede comenzar un proyecto sin presupuesto para hardware. No necesitas comprar ni administrar infraestructura costosa que quizá no uses. Puedes agregar recursos cuando los necesitas y quitarlos cuando no, así dejas de pagar por capacidad en los periodos tranquilos. Y se vuelve fácil experimentar: puedes probar una idea durante un día y luego eliminarla.",
   "El pago por uso no es la única opción de compra. Para cargas de trabajo estables puedes comprometerte por adelantado, por ejemplo con Azure Reservations por uno o tres años, a cambio de un precio más bajo, y las verás en las lecciones de administración de costos. El enfoque del examen aquí es la idea básica: en la nube, el costo sigue al uso, mientras que on-premises el costo sigue a lo que compraste.",
   "El precio por consumo también cambia lo que tienes que vigilar. Como los recursos son fáciles de crear, los costos pueden crecer sin que nadie lo note si las personas olvidan eliminar máquinas de prueba. Por eso Azure ofrece herramientas de costos como presupuestos y análisis de costos, y por eso los laboratorios de este curso te recuerdan eliminar los grupos de recursos al terminar."
  ],
  terms: [
   ["Consumption-based model (modelo basado en el consumo)", "Un enfoque de precios en el que pagas solo por los recursos de nube que usas, sin costo inicial."],
   ["Pay-as-you-go (pago por uso)", "Recibir una factura, normalmente mensual, por el uso real de los servicios, con cargos que se detienen cuando se eliminan los recursos."],
   ["Overprovisioning (sobreaprovisionamiento)", "Comprar más capacidad de la que necesitas, lo que desperdicia dinero en hardware ocioso."]
  ],
  example: "Una escuela necesita servidores web adicionales solo durante las dos semanas en que se publican los resultados de los exámenes. On-premises tendría que comprar servidores que quedarían ociosos el resto del año. En Azure ejecuta instancias extra durante esas dos semanas, paga por ellas solo durante ese tiempo y luego las elimina.",
  tip: "Si una pregunta menciona que no hay costo inicial, que pagas solo por lo que usas o que puedes dejar de pagar cuando dejas de usar un servicio, el concepto es el modelo basado en el consumo.",
  check: [
   ["¿Qué pasa con el costo de un recurso de Azure con pago por uso cuando lo eliminas?", "Sus cargos se detienen, porque solo se te factura lo que consumes."],
   ["Menciona dos problemas de comprar hardware que el modelo basado en el consumo evita.", "Pagar por adelantado una capacidad que debes adivinar con anticipación, y pagar por hardware ocioso cuando la demanda es menor de lo planeado."]
  ]
 },
 {
  t: "Capital expenditure (CapEx) vs operational expenditure (OpEx) and how the cloud shifts spending",
  tt: "Gasto de capital (CapEx) frente a gasto operativo (OpEx) y cómo la nube cambia el gasto",
  body: [
   "Los equipos de finanzas agrupan el gasto en dos tipos, y el examen AZ-900 espera que reconozcas ambos. El gasto de capital (CapEx) es dinero gastado por adelantado en activos físicos que la organización posee y usa durante años, como servidores, arreglos de almacenamiento, equipos de red o un edificio. Como el activo dura varios años, su costo normalmente se distribuye en el tiempo en la contabilidad mediante la depreciación.",
   "El gasto operativo (OpEx) es dinero gastado en servicios o productos a medida que se usan, como una factura mensual de nube, suscripciones de software o la electricidad. El OpEx normalmente se registra en el mismo periodo en que se gasta, y no hay ningún activo que depreciar. En general puedes aumentar o reducir el OpEx a medida que cambian tus necesidades.",
   "Un datacenter tradicional es mayormente CapEx. Para agregar capacidad compras hardware, esperas a que llegue, lo instalas y luego lo usas durante años, lo necesites todo o no. Otros costos del datacenter, como el personal y la energía, son continuos, pero las grandes decisiones son compras importantes hechas por adelantado.",
   "La computación en la nube es mayormente OpEx. Alquilas cómputo, almacenamiento y servicios al proveedor y pagas cada mes por lo que consumiste, sin comprar hardware. Esto significa que no necesitas reunir una gran suma al inicio de un proyecto, y tu gasto puede seguir tu demanda real. Si un proyecto se cancela, eliminas los recursos y dejas de pagar, en lugar de quedarte con equipos que ya no necesitas.",
   "El cambio de CapEx a OpEx es un beneficio de negocio, no solo técnico. Reduce la barrera para iniciar proyectos nuevos y disminuye el riesgo de equivocarse al calcular la capacidad futura. También cambia quién vigila el dinero: en lugar de aprobar una sola compra grande, las organizaciones siguen una factura mensual que puede subir o bajar, y por eso los presupuestos y las alertas de costos importan en la nube."
  ],
  terms: [
   ["Capital expenditure, CapEx (gasto de capital)", "Gasto por adelantado en activos físicos que se poseen y se deprecian durante su vida útil."],
   ["Operational expenditure, OpEx (gasto operativo)", "Gasto continuo en servicios o productos a medida que se consumen, registrado en el periodo en que ocurre."],
   ["Depreciation (depreciación)", "Distribuir el costo de un activo propio a lo largo de los años en que se usa."]
  ],
  example: "Un gerente de TI puede comprar ahora un arreglo de almacenamiento y depreciarlo en cinco años (CapEx), o guardar los mismos datos en Azure Storage y pagar una factura mensual que crece o se reduce según la cantidad almacenada (OpEx). Elegir Azure significa que no se necesita aprobar una compra grande.",
  tip: "Comprar hardware, construir un datacenter o cualquier cosa que se deprecie durante años es CapEx. Una factura mensual por los servicios de nube que usas es OpEx. El modelo basado en el consumo de la nube es un modelo OpEx.",
  check: [
   ["Una startup le paga a Azure cada mes por las VMs que ejecutó. ¿Esto es CapEx u OpEx?", "OpEx, porque es un gasto continuo en un servicio a medida que se consume, sin comprar ningún activo."],
   ["¿Por qué reemplazar servidores cada pocos años se considera CapEx?", "Porque la organización paga por adelantado activos físicos que posee y los deprecia durante su vida útil."]
  ]
 },
 {
  t: "High availability, service-level agreements (SLAs) and composite availability",
  tt: "Alta disponibilidad, acuerdos de nivel de servicio (SLA) y disponibilidad compuesta",
  body: [
   "La disponibilidad es la proporción del tiempo en que un servicio está activo y se puede usar. Alta disponibilidad significa diseñar un sistema para que siga disponible aunque falle alguna de sus partes, por ejemplo ejecutando más de una instancia para que otra pueda tomar el relevo. En la nube, obtienes alta disponibilidad combinando funciones de Azure como varias máquinas virtuales, zonas de disponibilidad y almacenamiento redundante.",
   "Microsoft describe su compromiso para cada servicio de Azure en un acuerdo de nivel de servicio (SLA). Un SLA es un documento formal que indica el tiempo de actividad y la conectividad que Microsoft se compromete a ofrecer para un servicio, normalmente como un porcentaje mensual, como 99.9% o 99.99%. También indica qué pasa si Microsoft no cumple ese objetivo, típicamente un crédito de servicio, que es un descuento en tu factura. Los SLA aplican a los servicios de pago; los servicios gratuitos y las funciones en versión preliminar (preview) generalmente no tienen un SLA respaldado financieramente.",
   "Las pequeñas diferencias en el porcentaje importan mucho. En un mes de 30 días hay unos 43,200 minutos. Un SLA de 99.9% permite unos 43 minutos de inactividad en ese mes; 99.95% permite unos 22 minutos; 99.99% permite unos 4 minutos. Cada nueve adicional divide el tiempo de inactividad permitido aproximadamente entre diez. Puedes calcularlo tú mismo: multiplica los minutos del mes por la fracción de no disponibilidad, por ejemplo 43,200 x 0.001 = 43.2 minutos.",
   "El SLA que recibe un servicio puede depender de cómo lo implementas. Por ejemplo, una sola máquina virtual tiene un SLA más bajo que dos o más VMs repartidas en zonas de disponibilidad, porque el diseño redundante puede sobrevivir a la pérdida de una máquina o de un datacenter. Consulta el documento de SLA vigente para ver las cifras exactas en lugar de memorizarlas, porque pueden cambiar.",
   "Una aplicación normalmente depende de varios servicios, como una aplicación web y una base de datos. Si la aplicación necesita que todos funcionen, su disponibilidad total, llamada SLA compuesto, se obtiene multiplicando los SLA individuales. Por ejemplo, dos servicios de 99.9% cada uno dan 0.999 x 0.999, cerca de 99.8%, que es menor que cualquiera de los dos por separado. Agregar dependencias reduce la disponibilidad; agregar copias redundantes de un componente la aumenta."
  ],
  terms: [
   ["High availability (alta disponibilidad)", "Diseñar un sistema para que siga funcionando con un mínimo de inactividad aunque fallen componentes individuales."],
   ["Service-level agreement, SLA (acuerdo de nivel de servicio)", "El compromiso formal de Microsoft sobre el tiempo de actividad y la conectividad de un servicio, con créditos de servicio si no se cumple."],
   ["Composite SLA (SLA compuesto)", "La disponibilidad combinada de una aplicación que depende de varios servicios, calculada multiplicando sus SLA."],
   ["Service credit (crédito de servicio)", "Un porcentaje de la cuota mensual que se reembolsa cuando Microsoft no cumple un SLA."]
  ],
  example: "Un sitio de reservas en línea se ejecuta en una aplicación web de App Service y una base de datos de Azure SQL, y ambas deben funcionar para que las reservas se completen. Aunque cada una tenga un SLA alto, la disponibilidad compuesta del sitio es el producto de ambas, así que el arquitecto agrega redundancia a los componentes más críticos en lugar de suponer que el sitio hereda el mejor SLA.",
  tip: "Los SLA compuestos siempre son menores que el SLA individual más bajo de la cadena. Más nueves significan menos tiempo de inactividad permitido, no más.",
  check: [
   ["¿Aproximadamente cuánto tiempo de inactividad por mes de 30 días permite un SLA de 99.9%?", "Unos 43 minutos, porque el 0.1% de 43,200 minutos es 43.2 minutos."],
   ["Una aplicación necesita una capa web con 99.95% y una base de datos con 99.99%. ¿Su SLA compuesto es mayor o menor que 99.95%?", "Menor. Multiplicar 0.9995 por 0.9999 da cerca de 99.94%, por debajo de cualquiera de los dos servicios por separado."]
  ]
 },
 {
  t: "Scalability and elasticity: scaling up vs scaling out, manual vs automatic",
  tt: "Escalabilidad y elasticidad: escalado vertical frente a horizontal, manual frente a automático",
  body: [
   "La escalabilidad es la capacidad de ajustar los recursos para satisfacer la demanda. Si más personas usan tu aplicación, un sistema escalable puede agregar capacidad para seguir siendo rápido; si menos personas la usan, puedes quitar capacidad para dejar de pagar por ella. En la nube, escalar es un cambio de configuración o unos cuantos clics, no una compra de hardware.",
   "Hay dos direcciones de escalado. El escalado vertical, también llamado scaling up (escalar verticalmente hacia arriba), le da más potencia a un recurso existente, como pasar una máquina virtual a un tamaño con más núcleos de CPU o más memoria. Scaling down es lo contrario. El escalado vertical es sencillo, porque la aplicación sigue ejecutándose en una sola máquina, pero hay un límite a lo grande que puede ser una sola máquina, y cambiar el tamaño de una VM normalmente requiere reiniciarla.",
   "El escalado horizontal, también llamado scaling out (escalar horizontalmente), agrega más instancias de un recurso, como pasar de dos servidores web a seis detrás de un balanceador de carga. Scaling in quita instancias. El escalado horizontal puede crecer mucho más que el vertical y mejora la disponibilidad, porque la pérdida de una instancia no detiene el servicio, pero la aplicación debe estar diseñada para que varias copias puedan repartirse el trabajo.",
   "El escalado puede ser manual o automático. El escalado manual significa que un administrador decide cuándo cambiar el tamaño o el número de instancias. El escalado automático, a menudo llamado autoscale, usa reglas o programaciones: por ejemplo, agregar una instancia cuando el uso promedio de CPU se mantiene por encima de un umbral durante varios minutos, y quitar una cuando se mantiene bajo. Servicios como los conjuntos de escalado de máquinas virtuales (virtual machine scale sets) y App Service admiten autoscale.",
   "Elasticidad es el término para escalar automáticamente en ambas direcciones a medida que cambia la demanda. Un sistema elástico crece cuando llega un pico y se reduce cuando pasa, sin que nadie haga clic en un botón, así que solo pagas la capacidad extra mientras la necesitas. En el examen, la escalabilidad es la capacidad general de agregar o quitar recursos; la elasticidad implica específicamente que esto ocurre de forma automática y dinámica."
  ],
  terms: [
   ["Scaling up, vertical (escalado vertical)", "Aumentar la capacidad de un solo recurso, por ejemplo darle a una VM más CPU o memoria."],
   ["Scaling out, horizontal (escalado horizontal)", "Agregar más instancias de un recurso para que el trabajo se reparta entre ellas."],
   ["Elasticity (elasticidad)", "Agregar y quitar recursos automáticamente a medida que la demanda sube y baja."],
   ["Autoscale (escalado automático)", "Una función que cambia el número de instancias según métricas o una programación."]
  ],
  example: "Un sitio de venta de boletos se ejecuta en un virtual machine scale set con una regla de autoscale. Cuando sale a la venta un concierto popular, el uso de CPU sube y el scale set agrega instancias; una hora después, cuando baja el tráfico, las vuelve a quitar. La empresa paga las instancias extra solo durante esa hora.",
  tip: "Up y down cambian el tamaño de un recurso; out e in cambian el número de recursos. Si la pregunta dice 'automáticamente' en respuesta a la demanda, piensa en elasticidad o autoscale.",
  check: [
   ["Pasas una VM de 2 vCPUs a 8 vCPUs. ¿Qué tipo de escalado es este?", "Escalado vertical, o scaling up, porque un solo recurso obtuvo más capacidad."],
   ["¿Qué hace que un sistema sea elástico y no simplemente escalable?", "Agrega y quita recursos automáticamente a medida que cambia la demanda, en lugar de necesitar que alguien cambie la capacidad a mano."]
  ]
 },
 {
  t: "Reliability and predictability of performance and cost in the cloud",
  tt: "Confiabilidad y previsibilidad del rendimiento y del costo en la nube",
  body: [
   "La confiabilidad (reliability) es la capacidad de un sistema para recuperarse de fallas y seguir funcionando. En la nube, la confiabilidad proviene de la escala global del proveedor y de cómo diseñas tu solución. Azure opera datacenters en muchas regiones del mundo, y muchas regiones contienen varias zonas de disponibilidad. Si repartes una carga de trabajo entre zonas o regiones, una falla en un lugar no tiene por qué tumbar tu aplicación.",
   "La confiabilidad también abarca la recuperación. Servicios como el almacenamiento con redundancia geográfica guardan copias de los datos en otra región, y los servicios de respaldo y recuperación ante desastres te permiten restaurar datos o conmutar por error (failover) a otra región. La nube hace que estos diseños sean asequibles, porque no tienes que construir y pagar un segundo datacenter por tu cuenta. Algunas funciones de confiabilidad vienen integradas; otras debes elegirlas y configurarlas.",
   "La previsibilidad se trata de poder planificar con confianza. El examen la divide en dos partes. La previsibilidad del rendimiento significa que puedes contar con que tu aplicación tendrá los recursos que necesita. El escalado automático agrega capacidad cuando crece la demanda, y el balanceo de carga reparte las solicitudes para que ninguna instancia se sature. Como puedes escalar rápido, es menos probable que te tome por sorpresa una avalancha repentina de usuarios.",
   "La previsibilidad del costo significa que puedes pronosticar y controlar lo que vas a gastar. La nube ofrece herramientas para esto: la Pricing Calculator estima los costos antes de implementar, Microsoft Cost Management registra el gasto real y lo pronostica, y los presupuestos envían alertas cuando el gasto se acerca a un límite. Las reservas para cargas de trabajo estables también hacen los costos más predecibles al fijar el precio durante un plazo.",
   "El Microsoft Azure Well-Architected Framework, un conjunto gratuito de guías, incluye la confiabilidad, la eficiencia del rendimiento y la optimización de costos entre sus pilares. No necesitas conocer el framework a fondo para el AZ-900, pero es un recordatorio de que estos beneficios no son automáticos: los obtienes eligiendo las opciones de redundancia, las reglas de escalado y los controles de costos adecuados."
  ],
  terms: [
   ["Reliability (confiabilidad)", "La capacidad de un sistema para recuperarse de fallas y seguir funcionando."],
   ["Performance predictability (previsibilidad del rendimiento)", "La confianza en que una aplicación tendrá los recursos que necesita, con ayuda del escalado automático y el balanceo de carga."],
   ["Cost predictability (previsibilidad del costo)", "La capacidad de pronosticar y controlar el gasto en la nube con herramientas como calculadoras, presupuestos y análisis de costos."]
  ],
  example: "Una empresa de nóminas implementa su aplicación en varias zonas de disponibilidad para que una caída de un datacenter no detenga el pago de salarios (confiabilidad), agrega autoscale para los picos de fin de mes (previsibilidad del rendimiento) y define un presupuesto mensual con alertas en Cost Management para que finanzas pueda pronosticar la factura (previsibilidad del costo).",
  tip: "Aprende qué herramienta apoya cada tipo de previsibilidad: autoscaling y balanceo de carga para el rendimiento; la Pricing Calculator, la TCO Calculator y Cost Management para el costo.",
  check: [
   ["¿Qué dos técnicas ayudan a mantener un rendimiento predecible cuando cambia la demanda?", "El escalado automático, que agrega o quita recursos, y el balanceo de carga, que reparte el tráfico entre instancias."],
   ["¿Cómo facilita la nube construir una solución confiable y distribuida geográficamente?", "El proveedor ya opera datacenters y zonas de disponibilidad en muchas regiones, así que puedes implementar en varias de ellas sin construir tus propios sitios."]
  ]
 },
 {
  t: "Security, governance and manageability benefits of the cloud (management of the cloud vs in the cloud)",
  tt: "Beneficios de seguridad, gobernanza y administración de la nube (administración de la nube frente a en la nube)",
  body: [
   "Pasar a la nube puede fortalecer la seguridad y la gobernanza, no solo reducir costos. Microsoft invierte mucho en la seguridad física de sus datacenters, en proteger su red contra ataques como las inundaciones de denegación de servicio distribuida (DDoS) a gran escala y en mantener parcheada la plataforma subyacente. Según el tipo de servicio, también puedes dejar en manos de Microsoft la aplicación de parches al sistema operativo, lo que elimina una fuente común de vulnerabilidades. Tú sigues decidiendo quién tiene acceso y cómo se protegen tus datos.",
   "Gobernanza significa establecer reglas y asegurarte de que los recursos las cumplan, por ejemplo permitir recursos solo en regiones aprobadas o exigir ciertas etiquetas. En Azure puedes implementar plantillas que ya cumplen los estándares corporativos, auditar los recursos contra directivas con Azure Policy y ver informes de cumplimiento. Como estos controles se aplican de forma centralizada, es más fácil mantener consistentes cientos de recursos que con revisiones manuales en servidores físicos. Microsoft también publica informes de cumplimiento de sus servicios, para que puedas ver qué estándares cumple la plataforma.",
   "La administración (manageability) se divide en dos ideas que el examen nombra directamente. La administración de la nube (management of the cloud) significa administrar tus recursos en la nube: escalarlos automáticamente, implementarlos desde plantillas, monitorear su estado y recibir alertas cuando algo sale mal. Se trata de los recursos en sí.",
   "La administración en la nube (management in the cloud) significa las formas en que interactúas con tu entorno y lo administras: mediante el Azure portal basado en web, una interfaz de línea de comandos como Azure CLI o Azure PowerShell, interfaces de programación de aplicaciones (APIs) o automatización. Se trata de las herramientas e interfaces que usas.",
   "En pocas palabras, 'de' (of) se refiere a lo que la nube te permite hacerles a tus recursos, como autoscale, plantillas y monitoreo, mientras que 'en' (in) se refiere a cómo entras a administrarlos, como el portal, la CLI y las APIs. Ambas implican menos esfuerzo manual que operar tu propio hardware, pero el examen puede pedirte que clasifiques ejemplos en una categoría u otra."
  ],
  terms: [
   ["Governance (gobernanza)", "Establecer y hacer cumplir reglas y estándares sobre cómo se crean y usan los recursos de nube."],
   ["Management of the cloud (administración de la nube)", "Administrar los propios recursos de nube: escalado, implementación desde plantillas, monitoreo y alertas."],
   ["Management in the cloud (administración en la nube)", "Las interfaces que se usan para administrar recursos: el portal, herramientas de línea de comandos, APIs y automatización."],
   ["DDoS protection (protección contra DDoS)", "Defensas que absorben o filtran inundaciones de tráfico destinadas a dejar un servicio no disponible."]
  ],
  example: "Un equipo de TI configura autoscale en su capa web y recibe alertas cuando se disparan los errores, lo cual es administración de la nube. Sus administradores hacen esos cambios desde el Azure portal y con scripts en Azure CLI, lo cual es administración en la nube. Azure Policy impide que cualquiera cree recursos fuera de dos regiones aprobadas, lo cual es gobernanza.",
  tip: "Si el ejemplo es una función que actúa sobre los recursos (autoscale, plantillas, monitoreo, alertas), es administración de la nube. Si es una forma de acceder a Azure (portal, CLI, PowerShell, APIs), es administración en la nube.",
  check: [
   ["¿Usar Azure PowerShell para crear una cuenta de almacenamiento es un ejemplo de administración de la nube o en la nube?", "Administración en la nube, porque es una interfaz para administrar el entorno."],
   ["Menciona un beneficio de gobernanza de la nube.", "Puedes aplicar estándares de forma centralizada, por ejemplo con Azure Policy restringiendo las regiones permitidas, y auditar los recursos para verificar el cumplimiento."]
  ]
 },
 {
  t: "Infrastructure as a service (IaaS): what you manage and typical use cases such as lift-and-shift",
  tt: "Infraestructura como servicio (IaaS): qué administras y casos de uso típicos como lift-and-shift",
  body: [
   "La infraestructura como servicio (IaaS) es el tipo de servicio en la nube que te da más control. El proveedor suministra los bloques físicos básicos, el datacenter, los servidores físicos, el hardware de almacenamiento y la red física, y tú alquilas versiones virtuales de ellos. El servicio IaaS más conocido de Azure son las máquinas virtuales, junto con las redes virtuales y los discos administrados.",
   "Según el modelo de responsabilidad compartida, IaaS es el tipo de servicio en la nube que te deja más trabajo. Microsoft mantiene funcionando el hardware, protege el datacenter físico y administra el hipervisor. Tú eliges y administras el sistema operativo, aplicas sus actualizaciones, instalas y configuras el middleware y los runtimes, implementas las aplicaciones, configuras los controles de red como las reglas de firewall y proteges tus datos e identidades. Puedes instalar casi cualquier software que quieras, igual que en tu propio servidor.",
   "El escenario de IaaS más común es la migración lift-and-shift (levantar y trasladar). Una organización toma servidores existentes de su datacenter y los recrea como VMs de Azure con cambios mínimos. Esto es rápido, porque no hace falta rediseñar la aplicación, y le permite a la empresa cerrar un datacenter o evitar reemplazar hardware envejecido. Más adelante, puede modernizar partes de la aplicación para usar servicios PaaS.",
   "Otros usos típicos de IaaS incluyen pruebas y desarrollo, donde los equipos crean y eliminan entornos rápidamente; aplicaciones que necesitan un sistema operativo específico, una configuración particular o software heredado que un servicio PaaS no admite; y cargas de trabajo que requieren control de nivel administrador sobre la máquina. IaaS también es útil para almacenamiento, respaldo y computación de alto rendimiento, donde quieres un control fino sobre el hardware virtual.",
   "La contrapartida es el esfuerzo. Como el sistema operativo es tuyo, eres responsable de los parches, el antivirus, la configuración de respaldos y el endurecimiento (hardening). Si no necesitas ese nivel de control, PaaS normalmente cuesta menos de operar porque Microsoft hace más parte del trabajo."
  ],
  terms: [
   ["Infrastructure as a service, IaaS (infraestructura como servicio)", "Un tipo de servicio en la nube en el que el proveedor suministra cómputo, almacenamiento y redes virtuales, y el cliente administra el sistema operativo y todo lo que está encima."],
   ["Lift-and-shift (levantar y trasladar)", "Mover servidores existentes a la nube como máquinas virtuales con poco o ningún cambio en la aplicación."],
   ["Virtual machine, VM (máquina virtual)", "Una emulación por software de una computadora física, con su propio sistema operativo, que se ejecuta en un host del proveedor."]
  ],
  example: "El sistema de documentos de un despacho de abogados se ejecuta en un Windows Server antiguo con software personalizado que el proveedor ya no actualiza. El despacho lo traslada a una VM de Azure con el mismo sistema operativo y configuración para poder retirar el servidor envejecido, aceptando que su equipo de TI sigue aplicando parches y respaldando la VM.",
  tip: "Si un escenario enfatiza el máximo control, una configuración de sistema operativo personalizada o heredada, o mover servidores sin cambiarlos, la respuesta es IaaS.",
  check: [
   ["¿Qué tipo de servicio encaja mejor para migrar servidores on-premises a Azure sin rediseñar las aplicaciones?", "IaaS, porque las VMs de Azure te permiten recrear los servidores tal como están (lift-and-shift)."],
   ["En IaaS, menciona dos tareas que siguen siendo responsabilidad del cliente.", "Cualesquiera dos de: administrar y parchear el sistema operativo invitado, instalar aplicaciones, configurar los controles de red, proteger los datos y administrar las identidades."]
  ]
 },
 {
  t: "Platform as a service (PaaS) and serverless: what the provider manages and typical use cases",
  tt: "Plataforma como servicio (PaaS) y serverless: qué administra el proveedor y casos de uso típicos",
  body: [
   "La plataforma como servicio (PaaS) es un punto intermedio entre IaaS y SaaS. El proveedor administra la infraestructura física y también el sistema operativo, el middleware, el runtime y las herramientas de desarrollo. Tú aportas el código de tu aplicación y tus datos, y configuras cómo se ejecuta el servicio. No inicias sesión en servidores ni les instalas actualizaciones.",
   "Algunos ejemplos de PaaS en Azure son Azure App Service para alojar aplicaciones web y APIs, Azure SQL Database para bases de datos relacionales administradas y Azure Cosmos DB para datos NoSQL distribuidos globalmente. Con Azure SQL Database, por ejemplo, Microsoft se encarga de las actualizaciones del motor de base de datos, los parches y los respaldos; tú diseñas las tablas, escribes las consultas y controlas quién puede conectarse.",
   "Según el modelo de responsabilidad compartida, PaaS sube la línea por la pila. Microsoft es responsable del sistema operativo y el runtime, lo que elimina el trabajo de parches y reduce la superficie de ataque que tienes que mantener. La responsabilidad sobre las aplicaciones, los controles de red y la identidad suele ser compartida, porque tú los configuras usando las opciones que ofrece la plataforma. Como siempre, sigues siendo responsable de tus datos, dispositivos y cuentas.",
   "Los casos de uso típicos de PaaS son crear e implementar aplicaciones rápidamente, sobre todo cuando los desarrolladores quieren concentrarse en el código y no en la infraestructura. Los servicios PaaS normalmente incluyen opciones integradas de escalado, balanceo de carga y alta disponibilidad, y muchos admiten la implementación directamente desde el control de código fuente. La contrapartida es menos control: no puedes elegir cada ajuste del sistema operativo ni instalar software arbitrario en las máquinas subyacentes.",
   "La computación sin servidor (serverless) suele agruparse con PaaS. Con serverless, no administras servidores en absoluto, y en sus planes de tipo consumo pagas solo cuando se ejecuta tu código. Azure Functions ejecuta pequeños fragmentos de código en respuesta a eventos, como una solicitud HTTP, un archivo nuevo en el almacenamiento o un temporizador, y escala automáticamente. Azure Logic Apps crea flujos de trabajo que conectan servicios con poco o nada de código. Los servidores siguen existiendo, pero el proveedor se encarga de ellos por completo, y la aplicación se diseña en torno a eventos."
  ],
  terms: [
   ["Platform as a service, PaaS (plataforma como servicio)", "Un tipo de servicio en la nube en el que el proveedor administra la infraestructura, el sistema operativo y el runtime, y el cliente administra las aplicaciones y los datos."],
   ["Serverless (sin servidor)", "Un modelo en el que el proveedor administra por completo los servidores, escala automáticamente y puede facturar por ejecución."],
   ["Azure Functions", "Un servicio de cómputo serverless basado en eventos que ejecuta código en respuesta a desencadenadores (triggers) como solicitudes HTTP o temporizadores."],
   ["Azure App Service", "Un servicio PaaS para alojar aplicaciones web, APIs REST y back ends móviles."]
  ],
  example: "Un pequeño equipo de desarrollo crea un portal de clientes en Azure App Service con una base de datos de Azure SQL. Implementan código nuevo desde su repositorio varias veces por semana y nunca aplican parches a un sistema operativo. Una función en Azure Functions redimensiona cada foto que suben los clientes, y se ejecuta solo cuando llega un archivo nuevo.",
  tip: "Si los desarrolladores quieren concentrarse en el código y no administrar el sistema operativo, elige PaaS. Si el código debe ejecutarse solo cuando ocurre un evento y facturarse por ejecución, piensa en serverless, normalmente Azure Functions.",
  check: [
   ["¿Quién aplica los parches al motor de base de datos en Azure SQL Database?", "Microsoft, porque Azure SQL Database es un servicio PaaS y el proveedor administra la plataforma."],
   ["¿Qué hace que Azure Functions sea 'serverless'?", "Solo escribes el código y sus desencadenadores; el proveedor administra y escala los servidores por completo, y en el plan de consumo pagas solo cuando la función se ejecuta."]
  ]
 },
 {
  t: "Software as a service (SaaS) and choosing between IaaS, PaaS and SaaS for a scenario",
  tt: "Software como servicio (SaaS) y cómo elegir entre IaaS, PaaS y SaaS para un escenario",
  body: [
   "El software como servicio (SaaS) es una aplicación completa que el proveedor opera y entrega a través de internet, normalmente por una cuota de suscripción por usuario. Algunos ejemplos conocidos son Microsoft 365 para correo y aplicaciones de oficina, Microsoft Teams y Dynamics 365 para procesos de negocio. Usas el software mediante un navegador web o una aplicación cliente; no implementas servidores, no escribes la aplicación ni administras su plataforma.",
   "SaaS es el tipo de servicio con la menor responsabilidad para el cliente. El proveedor administra la infraestructura, el sistema operativo, el runtime y la propia aplicación, incluidas las actualizaciones y las funciones nuevas. Tú sigues administrando lo que nunca deja de ser del cliente: tus datos, los dispositivos que se conectan y las cuentas e identidades de los usuarios, incluida la configuración de opciones como quién puede compartir archivos fuera de la organización.",
   "El beneficio de SaaS es la rapidez y la sencillez: puedes empezar a usar una aplicación madura casi de inmediato, con precios por usuario predecibles y sin mantenimiento. La contrapartida es el menor control. Puedes configurar la aplicación dentro de las opciones que ofrece, pero no puedes cambiar cómo está construida ni dónde se ejecutan sus servidores más allá de lo que permita el proveedor.",
   "Elegir entre los tres tipos es un escenario común en el examen. Pregúntate cuánto control necesita el escenario y quién debe hacer el trabajo. Si necesitas control total sobre el sistema operativo o debes mover servidores existentes tal como están, elige IaaS. Si los desarrolladores quieren crear e implementar su propia aplicación sin administrar servidores, elige PaaS. Si el negocio simplemente necesita una aplicación terminada, como correo, un CRM o uso compartido de archivos, elige SaaS.",
   "Las organizaciones a menudo usan los tres a la vez. Una empresa podría ejecutar un sistema heredado en VMs de Azure (IaaS), alojar un nuevo sitio web para clientes en App Service (PaaS) y usar Microsoft 365 para el correo del personal (SaaS). La responsabilidad compartida es distinta para cada uno, así que los equipos de seguridad necesitan saber qué tipo usa cada carga de trabajo."
  ],
  terms: [
   ["Software as a service, SaaS (software como servicio)", "Una aplicación completa que el proveedor opera y mantiene, y que los clientes usan a través de internet, normalmente por suscripción."],
   ["Subscription licensing (licenciamiento por suscripción)", "Pagar una cuota recurrente, a menudo por usuario, para usar software en lugar de comprarlo de forma definitiva."],
   ["Tenant configuration (configuración del tenant)", "Los ajustes que controla un cliente en un producto SaaS, como las directivas de uso compartido y el acceso de usuarios."]
  ],
  example: "Una organización benéfica necesita correo, calendarios y uso compartido de documentos para 30 voluntarios, y no tiene personal de TI ni desarrolladores. Microsoft 365, un producto SaaS, encaja: los voluntarios inician sesión y lo usan, y la organización solo administra las cuentas y las opciones de uso compartido.",
  tip: "Relaciona el escenario con el control que necesita: control total del sistema operativo o lift-and-shift es IaaS, crear tu propia aplicación sin servidores es PaaS, una aplicación lista para usar es SaaS. Los datos y las identidades son del cliente en los tres.",
  check: [
   ["Una empresa quiere un sistema CRM ya hecho sin implementar ni mantener ningún software. ¿Qué tipo de servicio encaja?", "SaaS, porque el proveedor entrega y mantiene la aplicación completa."],
   ["¿Qué tipo de servicio le deja al cliente la menor cantidad de responsabilidades de administración?", "SaaS. El proveedor opera todo, incluida la aplicación; el cliente conserva los datos, los dispositivos y las identidades."]
  ]
 },
 {
  t: "Azure regions, region pairs and sovereign regions (Azure Government, Azure operated by 21Vianet in China)",
  tt: "Regiones de Azure, pares de regiones y regiones soberanas (Azure Government, Azure operado por 21Vianet en China)",
  body: [
   "Una región de Azure es un área geográfica del planeta que contiene al menos uno, y normalmente varios, datacenters de Azure conectados por una red de baja latencia. Cuando creas la mayoría de los recursos, eliges una región, como East US o West Europe. La región determina dónde se ejecuta físicamente tu recurso y dónde se almacenan sus datos, lo que afecta la latencia para tus usuarios, qué servicios y tamaños de VM están disponibles, el precio y si cumples los requisitos de residencia de datos.",
   "No todos los servicios o funciones se ofrecen en todas las regiones, y los precios pueden variar entre regiones. Algunos servicios son globales y no te piden elegir una región, como Microsoft Entra ID, Azure Front Door y Azure DNS. Las regiones se agrupan en geografías, que son mercados como Estados Unidos o Europa que comparten límites de residencia de datos y de cumplimiento.",
   "Muchas regiones de Azure están emparejadas con otra región de la misma geografía, normalmente lo bastante lejos como para que un desastre regional, como una inundación o una falla eléctrica grave, difícilmente afecte a ambas. Los pares de regiones aportan varios beneficios. Si hay una interrupción amplia, Microsoft prioriza la recuperación de una región de cada par. Las actualizaciones planificadas de la plataforma se aplican a una región del par a la vez, lo que reduce la probabilidad de que una mala actualización afecte a ambas. Algunos servicios, como el almacenamiento con redundancia geográfica, replican datos a la región emparejada. La mayoría de los pares son bidireccionales, pero algunos son unidireccionales, y algunas regiones más nuevas no tienen par y dependen de las zonas de disponibilidad para su resiliencia.",
   "Las regiones soberanas son instancias de Azure aisladas física y lógicamente de la nube pública principal de Azure por razones legales o de cumplimiento. Azure Government atiende a agencias del gobierno de EE. UU. y a sus socios, con datacenters operados por personal estadounidense verificado y certificaciones de cumplimiento adicionales. Azure en China lo opera 21Vianet, una empresa independiente, y no directamente Microsoft; Microsoft no opera los datacenters allí. Las nubes soberanas tienen sus propios portales y endpoints, y no todos los servicios de Azure público están disponibles en ellas.",
   "Al elegir una región, considera la cercanía a los usuarios, la disponibilidad de servicios, el costo y el cumplimiento. Para la resiliencia, diseña entre zonas de disponibilidad dentro de una región, y entre un par de regiones para la recuperación ante desastres."
  ],
  terms: [
   ["Region (región)", "Un área geográfica que contiene uno o más datacenters de Azure conectados por una red de baja latencia."],
   ["Region pair (par de regiones)", "Dos regiones de la misma geografía vinculadas para recuperación ante desastres, actualizaciones escalonadas y recuperación prioritaria."],
   ["Sovereign region (región soberana)", "Una instancia aislada de Azure para necesidades legales o de cumplimiento específicas, como Azure Government o Azure en China."],
   ["Geography (geografía)", "Un mercado que contiene una o más regiones y que comparte límites de residencia de datos y de cumplimiento."]
  ],
  example: "Un minorista europeo implementa su aplicación web en una región de Europa Occidental para mantener los datos de sus clientes dentro de la UE y ofrecerles baja latencia. Configura almacenamiento con redundancia geográfica para que sus imágenes de productos también se copien a la región emparejada, por si toda la región primaria sufre una interrupción grave.",
  tip: "Los pares de regiones ayudan con la recuperación ante desastres y las actualizaciones escalonadas; las zonas de disponibilidad ayudan dentro de una región. Azure en China lo opera 21Vianet, no Microsoft, y Azure Government es para uso del gobierno de EE. UU.",
  check: [
   ["Menciona dos beneficios de los pares de regiones de Azure.", "Cualesquiera dos de: recuperación prioritaria de una región del par durante una interrupción amplia, actualizaciones planificadas aplicadas a una región a la vez, y replicación (como el almacenamiento con redundancia geográfica) hacia la región emparejada."],
   ["¿Quién opera los datacenters de Azure en China?", "21Vianet, una empresa independiente; la nube de China es una región soberana aislada del Azure global."]
  ]
 },
 {
  t: "Availability zones and datacenters: zonal vs zone-redundant services",
  tt: "Zonas de disponibilidad y datacenters: servicios zonales frente a redundantes entre zonas",
  body: [
   "La base física de Azure es el datacenter: un edificio lleno de servidores, almacenamiento y equipos de red con su propia energía, refrigeración y seguridad. Nunca eliges un datacenter individual. En cambio, Azure agrupa los datacenters en zonas de disponibilidad y regiones.",
   "Una zona de disponibilidad (availability zone) es una ubicación físicamente separada dentro de una región de Azure, formada por uno o más datacenters con energía, refrigeración y red independientes. Las zonas están lo bastante separadas como para que una falla local, como un incendio o un corte de energía en un edificio, no afecte a las demás, pero lo bastante cerca como para conectarse mediante una red privada de alta velocidad y baja latencia. Las regiones que admiten zonas de disponibilidad tienen al menos tres zonas. No todas las regiones admiten zonas, así que verifícalo antes de diseñar en torno a ellas.",
   "Las zonas de disponibilidad son la forma principal de proteger una aplicación contra una falla a nivel de datacenter dentro de una región. Si ejecutas copias de tu aplicación en cada una de las tres zonas, la pérdida de una zona deja a las otras dos atendiendo a los usuarios. Usar zonas puede aumentar un poco el costo, por ejemplo por la transferencia de datos entre zonas y por ejecutar más instancias, pero mejora la resiliencia.",
   "Los servicios de Azure que admiten zonas de disponibilidad se dividen en dos categorías. Los servicios zonales están fijados a una zona específica que tú eliges, por ejemplo una máquina virtual, un disco administrado o una dirección IP pública implementados en la zona 1. Para que un diseño zonal sea resiliente, tú mismo implementas varios recursos en distintas zonas. Los servicios redundantes entre zonas (zone-redundant) son replicados o repartidos entre zonas automáticamente por la plataforma, como el almacenamiento con redundancia de zona (ZRS) o una base de datos SQL con redundancia de zona; si una zona falla, el servicio sigue funcionando sin que tengas que hacer nada.",
   "También existen servicios no regionales o siempre disponibles, que son resilientes tanto a interrupciones de zona como de región porque son globales, como Microsoft Entra ID y Azure DNS. En el examen, recuerda que las zonas protegen dentro de una región y los pares de regiones protegen entre regiones."
  ],
  terms: [
   ["Datacenter (centro de datos)", "Un edificio que contiene servidores, almacenamiento y equipos de red, con su propia energía y refrigeración."],
   ["Availability zone (zona de disponibilidad)", "Un grupo de datacenters físicamente separado dentro de una región, con energía, refrigeración y red independientes."],
   ["Zonal service (servicio zonal)", "Un recurso fijado a una sola zona de disponibilidad que tú eliges."],
   ["Zone-redundant service (servicio redundante entre zonas)", "Un servicio que la plataforma replica automáticamente entre zonas de disponibilidad."]
  ],
  example: "Una aseguradora implementa tres VMs de servidor web, una en cada zona de disponibilidad de su región, detrás de un balanceador de carga redundante entre zonas, y guarda los documentos en almacenamiento ZRS. Cuando una zona se queda sin energía, las otras dos VMs siguen atendiendo a los clientes y los documentos siguen siendo legibles.",
  tip: "Una VM colocada en la 'zona 2' es zonal; el almacenamiento ZRS es redundante entre zonas. Las regiones con zonas tienen al menos tres zonas. Las zonas protegen contra fallas de datacenter, no contra fallas de una región completa.",
  check: [
   ["¿Cuál es la diferencia entre un servicio zonal y uno redundante entre zonas?", "Un servicio zonal se ejecuta en una zona que tú eliges; un servicio redundante entre zonas es replicado automáticamente por Azure entre zonas."],
   ["¿Contra qué protege una zona de disponibilidad que una implementación en un solo datacenter no cubre?", "Contra la falla de un datacenter o zona completos, como un corte de energía o de refrigeración, porque las otras zonas de la región siguen funcionando."]
  ]
 },
 {
  t: "Azure resources, resource groups, subscriptions and management groups: the hierarchy and what each is for",
  tt: "Recursos, grupos de recursos, suscripciones y grupos de administración de Azure: la jerarquía y para qué sirve cada uno",
  body: [
   "Azure organiza todo lo que creas en una jerarquía de cuatro niveles. En la base están los recursos: elementos individuales que creas y por los que pagas, como una máquina virtual, una red virtual, una cuenta de almacenamiento o una base de datos.",
   "Cada recurso debe pertenecer exactamente a un grupo de recursos. Un grupo de recursos (resource group) es un contenedor lógico para recursos que comparten un ciclo de vida, como todas las partes de una aplicación o de un entorno. Los grupos de recursos no se pueden anidar. Eliminar un grupo de recursos elimina todos los recursos que contiene, lo que los hace prácticos para laboratorios y entornos temporales. Puedes aplicar permisos de control de acceso basado en roles (RBAC), directivas, bloqueos y etiquetas a un grupo de recursos, y los recursos que contiene heredan los permisos y las directivas. Un grupo de recursos tiene una ubicación donde se almacenan sus metadatos, pero puede contener recursos de otras regiones. La mayoría de los recursos se pueden mover entre grupos de recursos.",
   "Los grupos de recursos viven dentro de una suscripción. Una suscripción (subscription) es una unidad de administración, facturación y escala vinculada a un tenant de Microsoft Entra. Actúa como límite de facturación, porque cada suscripción recibe su propia factura e informes de costos, y como límite de control de acceso. Las organizaciones crean varias suscripciones para separar entornos como producción y desarrollo, para separar departamentos o proyectos en la facturación, o para trabajar dentro de los límites de una suscripción. Una cuenta de Azure puede tener varias suscripciones.",
   "Los grupos de administración (management groups) están por encima de las suscripciones. Te permiten agrupar suscripciones y aplicarles gobernanza, como Azure Policy y asignaciones de RBAC, a todas a la vez. Los grupos de administración se pueden anidar para reflejar tu organización, y cada directorio tiene un único grupo de administración raíz en la cima. Una suscripción solo puede estar en un grupo de administración a la vez.",
   "La idea clave es la herencia. Una directiva o un rol asignado en un grupo de administración fluye hacia abajo a cada suscripción, grupo de recursos y recurso que está debajo. Por ejemplo, una directiva en la raíz que solo permite regiones europeas se aplica en todas partes. Coloca la gobernanza lo más arriba que tenga sentido y deja las excepciones más abajo."
  ],
  terms: [
   ["Resource (recurso)", "Un elemento administrable individual en Azure, como una VM, una cuenta de almacenamiento o una red virtual."],
   ["Resource group (grupo de recursos)", "Un contenedor lógico para recursos que comparten un ciclo de vida; cada recurso pertenece exactamente a uno."],
   ["Subscription (suscripción)", "Una unidad de facturación, administración y control de acceso que contiene grupos de recursos."],
   ["Management group (grupo de administración)", "Un contenedor por encima de las suscripciones que se usa para aplicar directivas y control de acceso a muchas suscripciones a la vez."]
  ],
  example: "Una empresa crea grupos de administración para Producción y Desarrollo, cada uno con varias suscripciones, una por departamento. Asigna una directiva que restringe las regiones en el grupo de administración de Producción, y todos los grupos de recursos y recursos de esas suscripciones la heredan automáticamente.",
  tip: "Orden de arriba hacia abajo: grupos de administración, suscripciones, grupos de recursos, recursos. Los grupos de recursos no se pueden anidar; los grupos de administración sí. Un recurso pertenece a un solo grupo de recursos.",
  check: [
   ["Quieres aplicar una Azure Policy a 15 suscripciones a la vez. ¿Qué usas?", "Un grupo de administración que contenga esas suscripciones, y luego asignas la directiva en ese grupo de administración."],
   ["¿Qué pasa con los recursos cuando eliminas su grupo de recursos?", "Se eliminan todos, porque el ciclo de vida de un grupo de recursos incluye los recursos que contiene."]
  ]
 },
 {
  t: "Compute: virtual machines, VM scale sets, availability sets and Azure Virtual Desktop",
  tt: "Cómputo: máquinas virtuales, VM scale sets, availability sets y Azure Virtual Desktop",
  body: [
   "Las máquinas virtuales (VMs) de Azure son la opción de cómputo IaaS. Una VM es una computadora virtualizada que ejecuta Windows o Linux en el hardware de Microsoft. Eliges una imagen (el sistema operativo, a veces con software preinstalado), un tamaño (el número de CPUs virtuales y la cantidad de memoria), discos y red. Tienes control total del sistema operativo, así que las VMs son adecuadas para migraciones lift-and-shift, software personalizado y pruebas y desarrollo. También te encargas de los parches y la configuración, y una VM en ejecución se factura por cómputo aunque esté inactiva; detenerla y desasignarla (deallocate) detiene los cargos de cómputo, aunque el almacenamiento en disco se sigue facturando.",
   "Los conjuntos de escalado de máquinas virtuales (virtual machine scale sets) te permiten crear y administrar un grupo de VMs idénticas con balanceo de carga. En lugar de construir cada VM a mano, defines la configuración una vez y el scale set crea las instancias. Los scale sets admiten autoscale, agregando VMs cuando crece la demanda y quitándolas cuando baja, y pueden repartir las instancias entre zonas de disponibilidad. Se usan para cargas de trabajo grandes y sin estado, como front ends web o procesamiento por lotes.",
   "Los conjuntos de disponibilidad (availability sets) son una forma más antigua de mantener las VMs disponibles dentro de un solo datacenter. Colocas dos o más VMs que hacen el mismo trabajo en un availability set, y Azure las reparte entre dominios de error y dominios de actualización. Un dominio de error (fault domain) es un grupo de hardware que comparte una fuente de energía y un switch de red, así que una falla de hardware afecta solo a las VMs de ese dominio de error. Un dominio de actualización (update domain) es un grupo de VMs que Azure puede reiniciar al mismo tiempo durante el mantenimiento planificado, para que no se reinicien todas tus VMs juntas. Los availability sets no tienen costo adicional; solo pagas las VMs. Las zonas de disponibilidad protegen contra una falla mayor: un datacenter completo.",
   "Azure Virtual Desktop es un servicio de virtualización de escritorios y aplicaciones. Los usuarios se conectan desde casi cualquier dispositivo a un escritorio completo de Windows o a aplicaciones individuales que se ejecutan en Azure. Como el escritorio se ejecuta en la nube, los datos de la empresa no tienen que almacenarse en el dispositivo del usuario. Azure Virtual Desktop admite Windows multisesión, donde varios usuarios comparten una VM, lo que puede reducir el costo. Es una buena opción para trabajadores remotos, contratistas y personal que necesita un escritorio seguro desde dispositivos personales."
  ],
  terms: [
   ["Virtual machine scale set (conjunto de escalado de máquinas virtuales)", "Un grupo de VMs idénticas con balanceo de carga que pueden escalar automáticamente."],
   ["Availability set (conjunto de disponibilidad)", "Una agrupación que reparte las VMs entre dominios de error y dominios de actualización para reducir la inactividad."],
   ["Fault domain (dominio de error)", "Un grupo de hardware que comparte una fuente de energía y un switch de red."],
   ["Update domain (dominio de actualización)", "Un grupo de VMs que pueden reiniciarse juntas durante el mantenimiento planificado."],
   ["Azure Virtual Desktop", "Un servicio que entrega escritorios y aplicaciones de Windows desde Azure a usuarios en casi cualquier dispositivo."]
  ],
  example: "Una agencia de diseño contrata freelancers que trabajan en sus propias laptops. En lugar de enviarles laptops de la empresa, les da sesiones de Azure Virtual Desktop, así los archivos de los proyectos se quedan en Azure. Su sitio web público se ejecuta en un VM scale set que agrega instancias cuando se lanza una campaña.",
  tip: "Los scale sets tratan de muchas VMs idénticas y autoscale; los availability sets tratan de repartir VMs entre dominios de error y de actualización; Azure Virtual Desktop trata de entregar escritorios a los usuarios.",
  check: [
   ["¿Cuál es la diferencia entre un dominio de error y un dominio de actualización?", "Un dominio de error comparte hardware de energía y red, y protege contra fallas de hardware; un dominio de actualización agrupa VMs que pueden reiniciarse juntas durante el mantenimiento planificado."],
   ["¿Qué servicio elegirías para ejecutar decenas de servidores web idénticos que crecen y se reducen según la demanda?", "Un virtual machine scale set con autoscale."]
  ]
 },
 {
  t: "Containers and serverless compute: Container Instances, Container Apps, AKS, Azure Functions and App Service",
  tt: "Contenedores y cómputo serverless: Container Instances, Container Apps, AKS, Azure Functions y App Service",
  body: [
   "Un contenedor empaqueta una aplicación junto con todo lo que necesita para ejecutarse, como bibliotecas y configuraciones, pero comparte el kernel del sistema operativo del host en lugar de incluir un sistema operativo completo. Por eso los contenedores son más pequeños y arrancan más rápido que las máquinas virtuales, y la misma imagen de contenedor se ejecuta igual en una laptop que en Azure. Un formato y motor de contenedores muy popular es Docker. Azure ofrece varias formas de ejecutar contenedores, de la más sencilla a la que da más control.",
   "Azure Container Instances (ACI) es la forma más rápida y sencilla de ejecutar un contenedor en Azure. Le das una imagen y la ejecuta, sin VMs ni orquestación que administrar, y se factura mientras el contenedor se ejecuta. Es adecuado para aplicaciones simples, automatización de tareas y trabajos de compilación.",
   "Azure Container Apps es una plataforma serverless para ejecutar aplicaciones en contenedores y microservicios. Se basa en Kubernetes pero lo oculta, y agrega funciones como el escalado automático (incluido escalar a cero), la división de tráfico entre versiones y la entrada (ingress) HTTPS. Es un buen punto intermedio cuando quieres más que contenedores individuales pero no quieres administrar Kubernetes.",
   "Azure Kubernetes Service (AKS) es un servicio administrado de Kubernetes. Kubernetes es un orquestador de código abierto que implementa, escala y repara grandes cantidades de contenedores en un clúster de máquinas. En AKS, Azure administra el plano de control de Kubernetes, y tú administras los nodos de trabajo y tus cargas de trabajo. AKS da el mayor control y es adecuado para aplicaciones complejas de microservicios y para equipos que ya conocen Kubernetes.",
   "Azure Functions es cómputo serverless basado en eventos. Escribes una función pequeña, eliges un desencadenador (trigger), como una solicitud HTTP, un mensaje en una cola, un blob nuevo o un temporizador, y Azure la ejecuta cuando ocurre el evento. En el hospedaje basado en consumo escala automáticamente y pagas solo por las ejecuciones. Las funciones pueden ser sin estado, o con estado usando Durable Functions.",
   "Azure App Service es una oferta PaaS para alojar aplicaciones web, APIs REST y back ends móviles en muchos lenguajes, en Windows o Linux, y también puede ejecutar contenedores. Incluye balanceo de carga integrado, autoscale, ranuras de implementación (deployment slots) e integración con el control de código fuente. Elige App Service para aplicaciones web de ejecución prolongada, y Functions para fragmentos cortos de código que reaccionan a eventos."
  ],
  terms: [
   ["Container (contenedor)", "Un paquete ligero de una aplicación y sus dependencias que comparte el kernel del sistema operativo del host."],
   ["Azure Container Instances (ACI)", "Un servicio que ejecuta contenedores individuales sin administrar VMs ni orquestación."],
   ["Azure Kubernetes Service (AKS)", "Un servicio administrado de Kubernetes para orquestar muchos contenedores en un clúster."],
   ["Azure Container Apps", "Una plataforma serverless de contenedores para microservicios con escalado automático e ingress, sin administrar Kubernetes."],
   ["Azure App Service", "Un servicio PaaS para alojar aplicaciones web, APIs y back ends móviles."]
  ],
  example: "Una tienda en línea aloja su escaparate en App Service, ejecuta un trabajo de informes nocturno como contenedor en Container Instances y usa una Azure Function que se activa cada vez que llega un mensaje de pedido a una cola para enviar el correo de confirmación.",
  tip: "Un solo contenedor, lo más sencillo: ACI. Orquestar muchos contenedores con control total: AKS. Código que se ejecuta con eventos y se factura por ejecución: Functions. Alojar aplicaciones web sin administrar servidores: App Service.",
  check: [
   ["¿Qué servicio ejecuta rápidamente un solo contenedor sin administrar servidores ni orquestación?", "Azure Container Instances."],
   ["¿Por qué los contenedores suelen ser más ligeros que las máquinas virtuales?", "Comparten el kernel del sistema operativo del host en lugar de que cada uno incluya un sistema operativo completo."]
  ]
 },
 {
  t: "Virtual networks, subnets, peering, Azure DNS, and public vs private endpoints",
  tt: "Redes virtuales, subredes, peering, Azure DNS y endpoints públicos frente a privados",
  body: [
   "Una red virtual de Azure (VNet) es tu propia red privada en Azure. Permite que los recursos de Azure, como las VMs, se comuniquen entre sí, con internet y con tus redes on-premises. Cuando creas una VNet le asignas un espacio de direcciones en rangos de IP privadas, como 10.1.0.0/16, y vive en una región y una suscripción.",
   "Divides una VNet en subredes (subnets), rangos de direcciones más pequeños como 10.1.1.0/24, para organizar y proteger los recursos. Por ejemplo, podrías poner los servidores web en una subred y los servidores de base de datos en otra. Los recursos en distintas subredes de la misma VNet pueden comunicarse entre sí de forma predeterminada. Puedes filtrar el tráfico entre subredes y hacia internet con grupos de seguridad de red (NSGs), que contienen reglas de permitir y denegar basadas en dirección IP, puerto y protocolo.",
   "Las VNets separadas están aisladas entre sí hasta que las conectas. El emparejamiento de redes virtuales (VNet peering) une dos VNets para que los recursos de cada una puedan comunicarse usando direcciones IP privadas, como si estuvieran en una sola red. El peering puede conectar VNets en la misma región o en regiones distintas (global peering), y el tráfico entre VNets emparejadas viaja por la red troncal (backbone) de Microsoft, no por internet público. Los espacios de direcciones de las VNets emparejadas no deben superponerse.",
   "Azure DNS aloja zonas del Sistema de Nombres de Dominio (DNS) en la red global de Microsoft. DNS traduce nombres como www.example.com a direcciones IP. Con Azure DNS administras tus registros con las mismas credenciales, herramientas y facturación que tus otros recursos de Azure. Azure DNS aloja tus registros, pero el nombre de dominio en sí lo sigues comprando a un registrador. Las zonas DNS privadas ofrecen resolución de nombres dentro de tus VNets.",
   "Se puede llegar a los recursos mediante endpoints públicos o privados. Un endpoint público es una dirección accesible desde internet, como una dirección IP pública en una VM o la dirección pública predeterminada de una cuenta de almacenamiento. Un endpoint privado (private endpoint) es una interfaz de red con una dirección IP privada de tu VNet que se conecta de forma privada a un servicio PaaS de Azure, como una cuenta de almacenamiento o una base de datos SQL. El tráfico hacia un endpoint privado se queda en la red de Microsoft, y entonces puedes desactivar por completo el acceso público al servicio, reduciendo la exposición."
  ],
  terms: [
   ["Virtual network, VNet (red virtual)", "Una red privada aislada en Azure con su propio espacio de direcciones."],
   ["Subnet (subred)", "Un rango de direcciones dentro de una VNet que se usa para agrupar y proteger recursos."],
   ["VNet peering (emparejamiento de VNets)", "Una conexión que permite que dos VNets se comuniquen de forma privada por la red troncal de Microsoft."],
   ["Private endpoint (endpoint privado)", "Una dirección IP privada en tu VNet que se conecta a un servicio de Azure sin usar internet público."],
   ["Azure DNS", "Un servicio que aloja dominios y registros DNS en la infraestructura de Azure."]
  ],
  example: "Una empresa coloca sus servidores web en una subred web y su base de datos en una subred de datos de la misma VNet, empareja esa VNet con una VNet de servicios compartidos en otra región y se conecta a su cuenta de almacenamiento mediante un private endpoint para poder desactivar el acceso de red público de la cuenta de almacenamiento.",
  tip: "El peering conecta VNets; requiere espacios de direcciones que no se superpongan. Un private endpoint le da a un servicio PaaS una IP privada en tu VNet. Azure DNS aloja registros, pero no vende nombres de dominio.",
  check: [
   ["Dos VNets usan 10.1.0.0/16 y 10.1.0.0/16. ¿Puedes emparejarlas?", "No. Las VNets emparejadas deben tener espacios de direcciones que no se superpongan."],
   ["¿Cómo puede una VM llegar a una base de datos de Azure SQL sin que el tráfico use un endpoint público?", "Creando un private endpoint para la base de datos en la VNet de la VM (o en una emparejada), lo que le da a la base de datos una dirección IP privada."]
  ]
 },
 {
  t: "Hybrid connectivity: VPN Gateway (site-to-site, point-to-site) vs ExpressRoute",
  tt: "Conectividad híbrida: VPN Gateway (site-to-site, point-to-site) frente a ExpressRoute",
  body: [
   "Muchas organizaciones necesitan que sus redes on-premises y sus redes virtuales de Azure funcionen como una sola, por ejemplo para que los usuarios de la oficina puedan llegar a una aplicación que se ejecuta en VMs de Azure. Azure ofrece dos opciones principales de conectividad híbrida: VPN Gateway y ExpressRoute.",
   "Una red privada virtual (VPN) crea un túnel cifrado entre dos redes a través de una red no confiable, normalmente internet público. Azure VPN Gateway es un tipo de puerta de enlace de red virtual (virtual network gateway) que se implementa en una subred dedicada de tu VNet. Envía tráfico cifrado entre la VNet y otras ubicaciones a través de internet público.",
   "VPN Gateway admite varios tipos de conexión. Site-to-site (S2S, de sitio a sitio) conecta toda una red on-premises a Azure mediante un dispositivo VPN en la oficina, para que todas las máquinas de la oficina puedan llegar a la VNet. Point-to-site (P2S, de punto a sitio) conecta una computadora individual, como la laptop de un trabajador remoto, a la VNet usando software cliente de VPN, sin necesidad de un dispositivo VPN en la oficina. VNet-to-VNet conecta dos VNets de Azure mediante puertas de enlace. Puedes configurar las puertas de enlace en modo activo-en espera (active-standby) o activo-activo (active-active) para mayor disponibilidad.",
   "Azure ExpressRoute extiende tu red on-premises hacia la nube de Microsoft mediante una conexión privada proporcionada por un socio de conectividad. El tráfico no viaja por internet público. Esto ofrece más confiabilidad, mayores velocidades, latencia constante y mayor seguridad que las conexiones basadas en internet, lo que lo hace adecuado para grandes transferencias de datos, cargas de trabajo críticas y organizaciones con requisitos de cumplimiento estrictos. ExpressRoute puede conectarse a los servicios de Azure y a otros servicios en la nube de Microsoft. Ten en cuenta que privado no significa automáticamente cifrado; las organizaciones con requisitos de cifrado pueden agregar cifrado sobre ExpressRoute.",
   "La contrapartida es el costo y la configuración. VPN Gateway es más rápido de configurar y más barato, pero su rendimiento depende de internet. ExpressRoute requiere trabajar con un proveedor y cuesta más, pero ofrece un rendimiento predecible. Algunas organizaciones usan ambos, con una VPN site-to-site como ruta de respaldo para ExpressRoute. Para un solo usuario remoto, point-to-site es la opción correcta; para conectar una oficina completa a bajo costo, site-to-site."
  ],
  terms: [
   ["VPN Gateway (puerta de enlace VPN)", "Una puerta de enlace de red virtual de Azure que envía tráfico cifrado a otras redes a través de internet público."],
   ["Site-to-site VPN (VPN de sitio a sitio)", "Una VPN que conecta toda una red on-premises a una VNet de Azure mediante un dispositivo VPN."],
   ["Point-to-site VPN (VPN de punto a sitio)", "Una VPN que conecta un dispositivo individual a una VNet de Azure usando software cliente."],
   ["ExpressRoute", "Una conexión privada desde on-premises hacia los servicios en la nube de Microsoft mediante un proveedor de conectividad, sin pasar por internet público."]
  ],
  example: "Un banco traslada terabytes de datos de operaciones bursátiles a Azure cada día y necesita una latencia constante, así que contrata un circuito ExpressRoute a través de un proveedor. También configura una VPN site-to-site como respaldo, y su personal de TI usa una VPN point-to-site para llegar a Azure cuando trabaja desde casa.",
  tip: "Si la pregunta dice que el tráfico no debe cruzar internet público, la respuesta es ExpressRoute. El tráfico de VPN Gateway está cifrado pero viaja por internet. Una laptop significa point-to-site; una oficina completa significa site-to-site.",
  check: [
   ["Una empleada remota necesita conectar su laptop a una VNet de Azure sin un dispositivo VPN de oficina. ¿Qué opción encaja?", "Una VPN point-to-site mediante Azure VPN Gateway."],
   ["¿Cuál es la diferencia principal entre ExpressRoute y una VPN site-to-site?", "ExpressRoute usa una conexión privada mediante un proveedor que no pasa por internet público; una VPN site-to-site usa un túnel cifrado a través de internet."]
  ]
 },
 {
  t: "Azure Storage services (Blob, Files, Queue, Table, Disks), storage account types and access tiers (Hot, Cool, Cold, Archive)",
  tt: "Servicios de Azure Storage (Blob, Files, Queue, Table, Disks), tipos de cuenta de almacenamiento y niveles de acceso (Hot, Cool, Cold, Archive)",
  body: [
   "Azure Storage es el almacenamiento en la nube de Microsoft para muchos tipos de datos. La mayoría de los servicios de almacenamiento viven dentro de una cuenta de almacenamiento (storage account), que le da a tus datos un espacio de nombres único accesible por HTTP o HTTPS. Como el nombre de la cuenta forma parte de las direcciones de endpoints públicos como `mystorage.blob.core.windows.net`, debe ser único en todo Azure y usar solo letras minúsculas y números.",
   "Azure Storage ofrece varios servicios de datos. Blob storage guarda datos no estructurados como imágenes, video, respaldos y archivos de registro, organizados en contenedores; es almacenamiento de objetos optimizado para grandes cantidades de datos. Azure Files ofrece recursos compartidos de archivos totalmente administrados que puedes montar con el protocolo Server Message Block (SMB), y en algunos niveles Network File System (NFS), igual que una unidad de red, lo que es adecuado para hacer lift-and-shift de aplicaciones que usan recursos compartidos de archivos. Queue storage almacena grandes cantidades de mensajes para que las partes de una aplicación se comuniquen de forma asíncrona. Table storage almacena datos estructurados no relacionales (NoSQL) de tipo clave-valor. Azure Disks son volúmenes a nivel de bloque conectados a las VMs de Azure, que Azure administra como discos administrados (managed disks).",
   "Hay varios tipos de cuenta de almacenamiento. Standard general-purpose v2 es el tipo recomendado para la mayoría de los escenarios y admite blobs, archivos, colas y tablas. Los tipos de cuenta Premium usan unidades de estado sólido (SSD) para ofrecer baja latencia y son especializados: premium block blobs, premium file shares y premium page blobs. El tipo de cuenta determina qué servicios y opciones de redundancia están disponibles.",
   "Los datos de blob pueden almacenarse en niveles de acceso (access tiers) que equilibran el costo de almacenamiento con el costo de acceso. El nivel Hot es para datos a los que se accede con frecuencia; tiene el costo de almacenamiento más alto y el costo de acceso más bajo. El nivel Cool es para datos a los que se accede con poca frecuencia y que se conservan al menos 30 días. El nivel Cold es para datos a los que se accede rara vez y que se conservan al menos 90 días. El nivel Archive es para datos a los que casi nunca se accede y que se conservan al menos 180 días, con el costo de almacenamiento más bajo y el costo de recuperación más alto. Eliminar o mover datos fuera de un nivel más frío antes de su periodo mínimo genera un cargo por eliminación anticipada.",
   "Archive es especial: está fuera de línea (offline). Antes de poder leer un blob archivado debes rehidratarlo cambiando su nivel a uno en línea (Hot, Cool o Cold), lo que puede tardar horas. Hot, Cool y Cold se pueden establecer como el nivel predeterminado de la cuenta, mientras que Archive solo se puede establecer en blobs individuales. Las reglas de administración del ciclo de vida (lifecycle management) pueden mover blobs entre niveles automáticamente a medida que envejecen."
  ],
  terms: [
   ["Storage account (cuenta de almacenamiento)", "Un contenedor para los servicios de datos de Azure Storage que proporciona un espacio de nombres único."],
   ["Blob storage (almacenamiento de blobs)", "Almacenamiento de objetos para grandes cantidades de datos no estructurados, organizados en contenedores."],
   ["Azure Files", "Recursos compartidos de archivos administrados accesibles por SMB o NFS."],
   ["Access tier (nivel de acceso)", "Una configuración (Hot, Cool, Cold o Archive) que equilibra el costo de almacenamiento con el costo de acceso para datos de blob."],
   ["Rehydration (rehidratación)", "Mover un blob del nivel Archive, que está fuera de línea, a un nivel en línea para poder leerlo."]
  ],
  example: "Una televisora guarda los episodios nuevos en blob storage de nivel Hot para el streaming, mueve los episodios de la temporada pasada a Cool, envía el material en bruto de más de un año a Archive por retención legal y usa un recurso compartido de Azure Files que montan sus estaciones de edición.",
  tip: "Archive está fuera de línea y necesita una rehidratación que puede tardar horas; solo se puede establecer por blob. Periodos mínimos de retención: Cool 30 días, Cold 90 días, Archive 180 días. Queue es para mensajes; Table, para datos NoSQL de tipo clave-valor.",
  check: [
   ["¿Qué servicio de almacenamiento usarías para reemplazar un recurso compartido de un servidor de archivos on-premises que los usuarios asignan como unidad?", "Azure Files, que ofrece recursos compartidos de archivos SMB administrados."],
   ["Un archivo de cumplimiento casi nunca se lee y debe conservarse siete años al menor costo de almacenamiento. ¿Qué nivel encaja?", "El nivel Archive, aceptando que leer los datos requiere una rehidratación que puede tardar horas."]
  ]
 },
 {
  t: "Storage redundancy: LRS, ZRS, GRS, GZRS and read-access secondary options",
  tt: "Redundancia de almacenamiento: LRS, ZRS, GRS, GZRS y opciones de lectura en la región secundaria",
  body: [
   "Azure Storage siempre mantiene varias copias de tus datos para que sobrevivan a fallas de hardware, y tú eliges qué tan dispersas están esas copias. La elección es un equilibrio entre el costo y el tamaño de la falla que pueden resistir los datos. La opción de redundancia se configura en la cuenta de almacenamiento.",
   "La redundancia en la región primaria tiene dos formas. El almacenamiento con redundancia local (LRS) mantiene tres copias de tus datos dentro de un solo datacenter en la región primaria. Es la opción de menor costo y protege contra la falla de un disco o servidor, pero no contra un desastre que afecte a todo ese datacenter. El almacenamiento con redundancia de zona (ZRS) mantiene tres copias repartidas en tres zonas de disponibilidad de la región primaria, así que los datos siguen disponibles aunque una zona deje de estarlo.",
   "Para protegerte contra la interrupción de una región completa, agregas una región secundaria, que es la región emparejada. El almacenamiento con redundancia geográfica (GRS) copia los datos con LRS en la región primaria y luego los replica de forma asíncrona a la región secundaria, donde se vuelven a almacenar con LRS. Eso da seis copias en total. El almacenamiento con redundancia geográfica y de zona (GZRS) usa ZRS en la región primaria y LRS en la secundaria, combinando la protección contra la falla de una zona con la protección contra un desastre regional.",
   "Con GRS y GZRS, los datos de la región secundaria no se pueden leer a menos que ocurra una conmutación por error (failover). Si necesitas leer la copia secundaria en cualquier momento, por ejemplo para atender lecturas si la región primaria tiene problemas, elige las versiones con acceso de lectura: RA-GRS o RA-GZRS. Como la replicación a la región secundaria es asíncrona, la secundaria puede ir un poco atrasada respecto a la primaria, así que las escrituras más recientes quizá todavía no estén allí.",
   "Una forma sencilla de recordar las opciones: L significa local (un datacenter), Z significa zonas (varios datacenters en una región), G significa geo (una segunda región) y RA significa que puedes leer desde esa segunda región. No todas las opciones están disponibles para cada tipo de cuenta o región. Cambiar la redundancia más adelante es posible en muchas combinaciones, pero puede implicar una migración."
  ],
  terms: [
   ["LRS", "Almacenamiento con redundancia local (locally redundant storage): tres copias en un datacenter de la región primaria."],
   ["ZRS", "Almacenamiento con redundancia de zona (zone-redundant storage): tres copias repartidas entre zonas de disponibilidad de la región primaria."],
   ["GRS", "Almacenamiento con redundancia geográfica (geo-redundant storage): LRS en la región primaria más replicación asíncrona a LRS en una región secundaria."],
   ["GZRS", "Almacenamiento con redundancia geográfica y de zona (geo-zone-redundant storage): ZRS en la región primaria más replicación asíncrona a LRS en una región secundaria."],
   ["RA-GRS / RA-GZRS", "Las opciones con redundancia geográfica que dan acceso de lectura a la región secundaria en todo momento."]
  ],
  example: "Una startup guarda sus datos de desarrollo y pruebas en LRS porque se pueden volver a crear. Sus archivos de clientes de producción usan GZRS para sobrevivir a la caída de una zona y a un desastre regional. Su aplicación de informes usa RA-GZRS para poder seguir leyendo datos desde la región secundaria si la primaria deja de estar disponible.",
  tip: "Relaciona la falla con la opción: falla de disco o rack, LRS; falla de datacenter o zona, ZRS; falla de región, GRS o GZRS. ¿Necesitas leer la secundaria sin un failover? Elige la versión RA-.",
  check: [
   ["¿Qué opción de redundancia mantiene los datos disponibles si falla una zona de disponibilidad, sin pagar una segunda región?", "ZRS, que almacena tres copias repartidas entre zonas de disponibilidad de la región primaria."],
   ["¿Cuál es la diferencia entre GRS y RA-GRS?", "Ambas replican a una región secundaria, pero solo RA-GRS te permite leer desde la región secundaria en cualquier momento sin un failover."]
  ]
 },
 {
  t: "Moving data and migrating: AzCopy, Storage Explorer, Azure File Sync, Azure Migrate and Azure Data Box",
  tt: "Mover datos y migrar: AzCopy, Storage Explorer, Azure File Sync, Azure Migrate y Azure Data Box",
  body: [
   "Llevar datos y cargas de trabajo a Azure es un primer paso común, y Azure ofrece distintas herramientas según la cantidad de datos, la frecuencia con que se mueven y si estás moviendo archivos o servidores completos.",
   "AzCopy es una utilidad de línea de comandos para copiar blobs o archivos hacia o desde una cuenta de almacenamiento, y entre cuentas de almacenamiento. Puedes usarla en scripts para trabajos repetidos, y admite sincronizar una carpeta local con un contenedor en una sola dirección. Por ejemplo, `azcopy copy ./logs \"<container URL with SAS>\" --recursive` sube una carpeta. Es una buena opción cuando te sientes cómodo con la línea de comandos y quieres automatización.",
   "Azure Storage Explorer es una aplicación de escritorio gratuita para Windows, macOS y Linux con una interfaz gráfica para administrar cuentas de almacenamiento. Puedes explorar contenedores, subir y descargar archivos y cambiar propiedades haciendo clic en lugar de escribir comandos. Internamente usa AzCopy para las transferencias.",
   "Azure File Sync centraliza los recursos compartidos de archivos de una organización en Azure Files, manteniendo la flexibilidad y el rendimiento de un servidor de archivos Windows on-premises. Instalas un agente en un Windows Server, y este mantiene las carpetas locales sincronizadas con un recurso compartido de Azure Files. Con la organización en niveles en la nube (cloud tiering), los archivos de uso frecuente se quedan en el servidor local, mientras que los que se usan poco se guardan solo en Azure y se descargan cuando se necesitan. Es un servicio de sincronización continua, no una copia única.",
   "Azure Migrate es un centro (hub) para migrar a Azure. Ofrece un solo lugar para descubrir y evaluar servidores, bases de datos, aplicaciones web y escritorios virtuales on-premises, estimar su costo y su preparación para Azure, y luego migrarlos, usando herramientas integradas de Microsoft y de socios, como Database Migration Service.",
   "Azure Data Box es un servicio de migración física para grandes cantidades de datos cuando subirlos por la red tomaría demasiado tiempo o costaría demasiado. Microsoft te envía un dispositivo de almacenamiento seguro y resistente; copias tus datos en él y lo devuelves, y Microsoft sube los datos a tu cuenta de almacenamiento. Data Box también puede exportar datos desde Azure. Después de la carga, los discos del dispositivo se borran de forma segura. Es adecuado para migraciones únicas de conjuntos de datos muy grandes y para ubicaciones con conectividad limitada o nula."
  ],
  terms: [
   ["AzCopy", "Una herramienta de línea de comandos para copiar datos hacia, desde y entre cuentas de almacenamiento de Azure."],
   ["Azure Storage Explorer", "Una aplicación de escritorio gratuita con interfaz gráfica para administrar datos de Azure Storage."],
   ["Azure File Sync", "Un servicio que sincroniza servidores de archivos Windows con Azure Files, con cloud tiering opcional."],
   ["Azure Migrate", "Un centro para descubrir, evaluar y migrar cargas de trabajo on-premises a Azure."],
   ["Azure Data Box", "Un dispositivo físico que se te envía para mover grandes cantidades de datos hacia o desde Azure sin conexión."]
  ],
  example: "Un archivo cinematográfico tiene cientos de terabytes on-premises y un enlace a internet lento, así que solicita Azure Data Box para enviar los datos a Azure. Sus sucursales siguen usando servidores de archivos Windows locales que Azure File Sync mantiene sincronizados con Azure Files, y un administrador usa AzCopy en un script nocturno para el material nuevo.",
  tip: "Línea de comandos que se puede automatizar: AzCopy. Herramienta gráfica: Storage Explorer. Mantener servidores de archivos on-premises sincronizados con la nube: Azure File Sync. Evaluar y migrar servidores: Azure Migrate. Demasiados datos para la red: Data Box.",
  check: [
   ["¿Qué servicio deberías usar para evaluar la preparación y el costo de VMs on-premises para Azure antes de migrarlas?", "Azure Migrate, que descubre, evalúa y migra cargas de trabajo."],
   ["¿Por qué elegirías Azure Data Box en lugar de AzCopy?", "Cuando la cantidad de datos es tan grande o la red tan limitada que subirlos tomaría demasiado tiempo o costaría demasiado, así que los datos se envían en un dispositivo físico."]
  ]
 },
 {
  t: "Microsoft Entra ID and Entra Domain Services; authentication methods: SSO, MFA and passwordless",
  tt: "Microsoft Entra ID y Entra Domain Services; métodos de autenticación: SSO, MFA y sin contraseña",
  body: [
   "Microsoft Entra ID, antes llamado Azure Active Directory, es el servicio de administración de identidades y acceso basado en la nube de Microsoft. Almacena usuarios, grupos y aplicaciones, y gestiona el inicio de sesión en Azure, Microsoft 365 y miles de otras aplicaciones de software como servicio. Cada organización recibe su propio tenant de Entra, una instancia dedicada del directorio. Entra ID ofrece autenticación, inicio de sesión único, administración de aplicaciones, administración de dispositivos y funciones de protección de identidades, como la detección de inicios de sesión riesgosos.",
   "Muchas organizaciones también tienen Active Directory Domain Services (AD DS) on-premises. Microsoft Entra Connect sincroniza usuarios y grupos del AD on-premises con Entra ID, para que las personas usen una sola identidad en ambos. Sin embargo, Entra ID no es una copia en la nube de AD DS: usa protocolos basados en web como OAuth 2.0, OpenID Connect y SAML, no Kerberos ni LDAP.",
   "Ahí es donde entra Microsoft Entra Domain Services. Ofrece servicios de dominio administrados como la unión a dominio (domain join), la directiva de grupo (group policy), el Lightweight Directory Access Protocol (LDAP) y la autenticación Kerberos o NTLM, sin que tengas que implementar, parchear ni administrar controladores de dominio. Te permite ejecutar en Azure aplicaciones antiguas que necesitan esos protocolos. El dominio administrado se sincroniza en una sola dirección desde Entra ID; los cambios hechos en el dominio administrado no regresan.",
   "La autenticación es el proceso de demostrar quién eres. Entra ID admite varias formas de hacerla más fuerte y más sencilla. El inicio de sesión único (SSO) permite que un usuario inicie sesión una vez y luego acceda a muchas aplicaciones sin volver a iniciar sesión, lo que significa menos contraseñas que recordar y un solo lugar para desactivar el acceso cuando alguien se va.",
   "La autenticación multifactor (MFA) requiere dos o más tipos de evidencia: algo que sabes (una contraseña o PIN), algo que tienes (un teléfono o una llave de hardware) y algo que eres (una huella digital o tu rostro). Así, una contraseña robada por sí sola no basta para iniciar sesión. La autenticación multifactor de Microsoft Entra puede usar la aplicación Microsoft Authenticator, un mensaje de texto o una llamada de voz, o un token de hardware.",
   "La autenticación sin contraseña (passwordless) elimina la contraseña por completo y la reemplaza con algo que tienes más algo que eres o sabes. Las opciones incluyen Windows Hello for Business (biometría o un PIN vinculado a un dispositivo específico), la aplicación Microsoft Authenticator y las llaves de seguridad FIDO2 o passkeys. Los métodos sin contraseña son más cómodos y resisten mejor el phishing que las contraseñas."
  ],
  terms: [
   ["Microsoft Entra ID", "El servicio de administración de identidades y acceso en la nube de Microsoft, antes Azure Active Directory."],
   ["Microsoft Entra Domain Services", "Un servicio administrado que ofrece unión a dominio, LDAP, Kerberos/NTLM y directiva de grupo sin ejecutar controladores de dominio."],
   ["Single sign-on, SSO (inicio de sesión único)", "Iniciar sesión una vez para acceder a muchas aplicaciones."],
   ["Multifactor authentication, MFA (autenticación multifactor)", "Requerir dos o más tipos de evidencia, como una contraseña más una aprobación en el teléfono, para iniciar sesión."],
   ["Passwordless (sin contraseña)", "Autenticación que reemplaza la contraseña con métodos como Windows Hello, Authenticator o llaves FIDO2."]
  ],
  example: "Una empresa traslada a Azure una aplicación heredada que requiere Kerberos y servidores unidos a un dominio. En lugar de construir VMs de controlador de dominio, habilita Entra Domain Services. El personal inicia sesión con Windows Hello for Business en sus laptops y obtiene inicio de sesión único en Microsoft 365 y en las aplicaciones SaaS de la empresa.",
  tip: "Entra ID es el servicio de identidad en la nube (protocolos modernos). Entra Domain Services es para aplicaciones heredadas que necesitan unión a dominio, LDAP o Kerberos sin administrar DCs. MFA agrega un factor; passwordless elimina la contraseña.",
  check: [
   ["¿Qué servicio te permite unir VMs de Azure a un dominio y usar LDAP sin implementar controladores de dominio?", "Microsoft Entra Domain Services."],
   ["¿Qué categorías de evidencia puede combinar MFA?", "Algo que sabes (como una contraseña), algo que tienes (como un teléfono o una llave) y algo que eres (como una huella digital)."]
  ]
 },
 {
  t: "External identities (B2B and customer identity) and Conditional Access",
  tt: "Identidades externas (B2B e identidad de clientes) y acceso condicional",
  body: [
   "Las organizaciones a menudo necesitan dar acceso a sus aplicaciones a personas de fuera de la empresa. Microsoft Entra External ID es el nombre del conjunto de capacidades que hace esto. Los dos escenarios principales del examen son colaborar con socios y atender a clientes.",
   "La colaboración de empresa a empresa (B2B) te permite invitar a usuarios externos, como el personal de un proveedor, a tu propio tenant como usuarios invitados (guest users). Inician sesión con sus propias credenciales, como su cuenta de trabajo en su propia organización, una cuenta Microsoft, o una identidad social o de código de acceso de un solo uso, así que no tienes que crear ni administrar contraseñas para ellos. Luego les concedes acceso a aplicaciones, sitios de SharePoint o recursos de Azure específicos como a cualquier otro usuario, y puedes revisar y quitar ese acceso con el tiempo. B2B direct connect es una opción relacionada que crea una confianza mutua entre dos organizaciones de Entra para escenarios como los canales compartidos de Teams.",
   "Los escenarios de identidad de clientes son diferentes: los usuarios son personas del público que se registran en tu aplicación, como compradores en un sitio web. Las ofertas de identidad de clientes de Microsoft, Azure Active Directory B2C y la más reciente Microsoft Entra External ID for customers, ofrecen páginas de registro e inicio de sesión personalizables, compatibilidad con proveedores de identidad social y un directorio separado para las cuentas de clientes, para mantenerlas apartadas de las de los empleados.",
   "El acceso condicional (Conditional Access) es una función de Microsoft Entra ID, incluida en la licencia Entra ID P1 y superiores, que decide si permitir un inicio de sesión, bloquearlo o exigir pasos adicionales, con base en señales. Las señales pueden incluir quién es el usuario y a qué grupos pertenece, su ubicación o dirección IP, el dispositivo y si cumple las directivas, la aplicación a la que se accede y el riesgo de inicio de sesión calculado. La decisión puede ser permitir el acceso, exigir MFA, exigir un dispositivo compatible o bloquear el acceso.",
   "Las directivas de acceso condicional siguen un patrón si-entonces: si un usuario de cierto grupo inicia sesión desde fuera de la red de confianza en una aplicación sensible, entonces se exige MFA. Esto te permite aplicar controles fuertes solo cuando el riesgo lo justifica, manteniendo sencillos los inicios de sesión cotidianos. Es una parte clave de un enfoque Zero Trust, porque verifica cada solicitud de acceso usando todas las señales disponibles."
  ],
  terms: [
   ["B2B collaboration (colaboración B2B)", "Invitar a usuarios externos a tu tenant como invitados que inician sesión con sus propias identidades."],
   ["Guest user (usuario invitado)", "Una cuenta de usuario externo en tu directorio que representa a alguien de fuera de la organización."],
   ["Customer identity, B2C (identidad de clientes)", "Un servicio de identidad para aplicaciones orientadas al consumidor, con registro de autoservicio e inicio de sesión social."],
   ["Conditional Access (acceso condicional)", "Una función de Entra ID que permite, bloquea o agrega requisitos a los inicios de sesión según señales como usuario, ubicación, dispositivo y riesgo."]
  ],
  example: "Una firma de ingeniería invita a los diseñadores de un socio como invitados B2B para que puedan abrir un sitio de proyecto compartido con sus propias cuentas de trabajo. Una directiva de acceso condicional exige MFA para todos los inicios de sesión de invitados y bloquea los inicios de sesión en la aplicación de finanzas desde fuera de los países donde opera la firma.",
  tip: "Socios y proveedores que necesitan acceso a tus aplicaciones: colaboración B2B. Clientes del público que se registran en tu aplicación: identidad de clientes (B2C o External ID for customers). 'Exigir MFA solo al iniciar sesión desde fuera de la oficina' es acceso condicional.",
  check: [
   ["El personal de un proveedor necesita acceso a uno de tus sitios de SharePoint usando sus propias cuentas de empresa. ¿Qué usas?", "La colaboración B2B de Microsoft Entra, invitándolos como usuarios invitados."],
   ["Menciona tres señales que puede evaluar el acceso condicional.", "Cualesquiera tres de: el usuario o su pertenencia a grupos, la ubicación o dirección IP, el estado o cumplimiento del dispositivo, la aplicación y el riesgo de inicio de sesión."]
  ]
 },
 {
  t: "Azure role-based access control (RBAC), Zero Trust, defense in depth and Microsoft Defender for Cloud",
  tt: "Control de acceso basado en roles de Azure (RBAC), Zero Trust, defensa en profundidad y Microsoft Defender for Cloud",
  body: [
   "La autenticación demuestra quién es alguien; la autorización decide qué puede hacer. El control de acceso basado en roles de Azure (Azure RBAC) es el sistema de autorización para los recursos de Azure. Creas una asignación de rol (role assignment) formada por tres partes: una entidad de seguridad (security principal: un usuario, grupo, entidad de servicio o identidad administrada), una definición de rol (un conjunto de acciones permitidas) y un ámbito (scope, dónde se aplican los permisos).",
   "Azure incluye muchos roles integrados. Cuatro fundamentales son Owner (acceso total, incluida la capacidad de asignar roles a otros), Contributor (puede crear y administrar todos los recursos, pero no puede conceder acceso), Reader (puede ver los recursos pero no cambiarlos) y User Access Administrator (puede administrar el acceso de los usuarios). También hay roles específicos de servicios, como Virtual Machine Contributor, y puedes crear roles personalizados. Los ámbitos siguen la jerarquía de recursos: grupo de administración, suscripción, grupo de recursos o recurso individual. Los ámbitos hijos heredan las asignaciones, y los permisos de varias asignaciones se suman. Sigue el principio de privilegio mínimo: da solo el acceso necesario, en el ámbito más reducido, preferiblemente a grupos en lugar de a personas individuales.",
   "Zero Trust es un modelo de seguridad que supone que la red no es un lugar seguro y que una brecha puede haber ocurrido ya. Sus principios rectores son verificar explícitamente (siempre autenticar y autorizar usando todos los datos disponibles), usar acceso con privilegio mínimo (acceso justo a tiempo y justo el necesario) y asumir la brecha (limitar hasta dónde puede moverse un atacante y usar análisis para detectar amenazas). Herramientas como MFA, el acceso condicional y RBAC ponen en práctica estos principios.",
   "La defensa en profundidad (defense in depth) protege la información usando varias capas de seguridad, de modo que si se vulnera una capa, la siguiente puede detener el ataque. Un modelo común enumera siete capas de afuera hacia adentro: seguridad física, identidad y acceso, perímetro (como la protección contra DDoS y los firewalls), red (como limitar la comunicación entre recursos), cómputo (como proteger las VMs y aplicar parches), aplicación (código seguro) y datos. Cada capa tiene sus propios controles.",
   "Microsoft Defender for Cloud es un servicio de administración de la postura de seguridad en la nube (CSPM) y de protección de cargas de trabajo en la nube. Evalúa continuamente tus recursos frente a las mejores prácticas de seguridad, muestra una puntuación de seguridad (secure score) y da recomendaciones como habilitar MFA o cerrar puertos de administración abiertos. Las funciones básicas de postura están disponibles sin costo adicional; los planes de pago de Defender agregan protección contra amenazas para tipos de recursos específicos, como servidores, almacenamiento y bases de datos. Defender for Cloud también puede proteger cargas de trabajo en otras nubes y máquinas on-premises, incluidas las conectadas mediante Azure Arc."
  ],
  terms: [
   ["Azure RBAC", "El sistema de autorización que otorga roles a entidades de seguridad en un ámbito."],
   ["Role assignment (asignación de rol)", "La combinación de una entidad de seguridad, una definición de rol y un ámbito."],
   ["Zero Trust (confianza cero)", "Un modelo de seguridad basado en verificar explícitamente, el acceso con privilegio mínimo y asumir la brecha."],
   ["Defense in depth (defensa en profundidad)", "Seguridad por capas en la que cada capa protege contra un ataque que logra atravesar la anterior."],
   ["Microsoft Defender for Cloud", "Un servicio que evalúa la postura de seguridad, da recomendaciones y una puntuación de seguridad, y protege las cargas de trabajo en la nube."]
  ],
  example: "Un equipo de soporte necesita ver los recursos del grupo de recursos Production pero no cambiarlos, así que el administrador asigna el rol integrado Reader al grupo del equipo en el ámbito de ese grupo de recursos. Luego Defender for Cloud señala que una VM tiene su puerto de escritorio remoto abierto a internet y recomienda restringirlo.",
  tip: "Contributor puede administrar recursos pero no asignar acceso; Owner puede hacer ambas cosas. RBAC controla quién puede hacer qué; Azure Policy controla qué configuraciones se permiten. Los principios de Zero Trust son verificar explícitamente, privilegio mínimo y asumir la brecha.",
  check: [
   ["Un desarrollador debe crear y administrar VMs en un grupo de recursos, pero no debe conceder acceso a nadie más. ¿Qué rol integrado encaja?", "Contributor en el ámbito del grupo de recursos (o un rol más específico como Virtual Machine Contributor)."],
   ["¿Cuáles son los tres principios de Zero Trust?", "Verificar explícitamente, usar acceso con privilegio mínimo y asumir la brecha."]
  ]
 },
 {
  t: "Factors that affect cost in Azure: resource type, consumption, region, bandwidth, reservations and Azure Hybrid Benefit",
  tt: "Factores que afectan el costo en Azure: tipo de recurso, consumo, región, ancho de banda, reservas y Azure Hybrid Benefit",
  body: [
   "Azure factura la mayoría de los servicios por consumo, así que entender qué impulsa la factura te ayuda a estimarla y controlarla. El examen espera que menciones los principales factores de costo y expliques cómo cada uno cambia lo que pagas.",
   "El tipo de recurso es el primer factor. Cada servicio tiene sus propios medidores de precio: una VM se factura por su tamaño y el tiempo que se ejecuta; una cuenta de almacenamiento, por la cantidad de datos almacenados, su redundancia y su nivel de acceso, y por el número de operaciones de lectura y escritura. Las configuraciones dentro de un recurso también importan, como elegir un tamaño de VM más grande, discos premium o almacenamiento con redundancia geográfica, todo lo cual cuesta más.",
   "El consumo es la cantidad que realmente usas. El pago por uso cobra lo que usas, pero para cargas de trabajo predecibles puedes comprometerte por adelantado para reducir el precio. Azure Reservations te permite comprometerte con un recurso específico, como un tamaño de VM en una región, durante uno o tres años a cambio de un descuento importante. Los planes de ahorro de Azure para cómputo (Azure savings plans for compute), en cambio, te comprometen a un gasto fijo por hora en los servicios de cómputo. Las Spot virtual machines usan capacidad sobrante a un precio menor, pero pueden ser desalojadas cuando Azure necesita recuperar esa capacidad, así que son adecuadas para trabajos que se pueden interrumpir.",
   "La región importa porque los costos del mismo servicio pueden variar entre regiones, debido a la energía, el terreno, los impuestos y la demanda locales. Elegir otra región puede reducir el costo, siempre que se sigan cumpliendo los requisitos de latencia y de residencia de datos.",
   "El ancho de banda, o tráfico de red, a menudo se pasa por alto. Los datos que entran a Azure (ingress) generalmente son gratuitos. Los datos que salen de Azure (egress), como cuando los usuarios descargan archivos, y en muchos casos los datos que se mueven entre regiones o zonas de disponibilidad, se facturan. El precio se basa en zonas del mundo y en la cantidad que transfieres.",
   "Azure Hybrid Benefit te permite usar en Azure licencias on-premises existentes que tengan Software Assurance activo o suscripciones que califiquen, para Windows Server y SQL Server. Así pagas una tarifa menor por la VM porque se elimina la parte del precio que corresponde a la licencia. También se aplica a algunas suscripciones de Linux. Otros factores incluyen las compras en Azure Marketplace, donde los productos de terceros pueden agregar sus propios cargos, y simplemente qué tan bien haces limpieza: desasignar las VMs que no se usan y eliminar los recursos olvidados."
  ],
  terms: [
   ["Azure Reservations (reservas de Azure)", "Un compromiso de uno o tres años con recursos específicos a cambio de un descuento frente al pago por uso."],
   ["Egress (tráfico de salida)", "La transferencia de datos saliente desde Azure, que generalmente se factura; los datos entrantes (ingress) generalmente son gratuitos."],
   ["Azure Hybrid Benefit", "Usar licencias existentes de Windows Server o SQL Server con Software Assurance para reducir el costo de los recursos de Azure."],
   ["Spot VM", "Una VM que usa capacidad sobrante con descuento, pero que puede ser desalojada cuando Azure necesita esa capacidad."]
  ],
  example: "Una empresa ejecuta una VM de base de datos las 24 horas durante años, así que compra una reserva de tres años y aplica Azure Hybrid Benefit con sus licencias existentes de SQL Server. Ejecuta trabajos de renderizado nocturnos en Spot VMs, y nota una línea grande en la factura por egress porque los clientes descargan videos directamente desde el almacenamiento.",
  tip: "La transferencia de datos entrante generalmente es gratuita; la saliente se factura. Las reservas premian un compromiso a largo plazo; Hybrid Benefit reutiliza licencias que ya tienes. El mismo servicio puede costar distinto en diferentes regiones.",
  check: [
   ["¿Qué factor de costo aborda Azure Hybrid Benefit?", "El licenciamiento de software: te permite reutilizar licencias elegibles de Windows Server y SQL Server para no volver a pagar la licencia en Azure."],
   ["Una carga de trabajo se ejecuta sin parar durante los próximos tres años. ¿Cómo puedes reducir su costo de cómputo?", "Comprando una Azure Reservation (o un savings plan) por un plazo de uno o tres años en lugar de pagar las tarifas de pago por uso."]
  ]
 },
 {
  t: "The Pricing Calculator vs the Total Cost of Ownership (TCO) Calculator",
  tt: "La Pricing Calculator frente a la calculadora del costo total de propiedad (TCO Calculator)",
  body: [
   "Microsoft ofrece dos calculadoras web gratuitas para estimar costos, y el examen a menudo pregunta cuál encaja en un escenario. Ninguna de las dos requiere una suscripción de Azure, y ambas producen estimaciones, no precios vinculantes.",
   "La Azure Pricing Calculator (calculadora de precios) estima el costo de los servicios de Azure que planeas implementar. Agregas productos, como una máquina virtual, una cuenta de almacenamiento y una base de datos, y configuras cada uno: la región, el tamaño o nivel, el número de instancias, las horas de uso, la redundancia y la opción de compra, como pago por uso o una reserva. Luego la calculadora muestra un costo mensual y un costo inicial estimados. Puedes guardar y compartir la estimación o exportarla. Es la herramienta que debes usar cuando estás diseñando una nueva solución en Azure y quieres saber cuánto costará, o para comparar opciones como otra región u otro tamaño de VM.",
   "La Total Cost of Ownership (TCO) Calculator (calculadora del costo total de propiedad) compara el costo de ejecutar tu infraestructura on-premises actual con el costo de ejecutar las mismas cargas de trabajo en Azure. Describes tu entorno on-premises: servidores, bases de datos, almacenamiento y redes. Luego ajustas supuestos, como el costo de la electricidad, las tarifas por hora del personal de TI, el espacio del datacenter y los costos de hardware y software. La calculadora produce un informe que muestra el ahorro estimado durante un periodo de varios años, con el desglose de los costos on-premises que evitarías, como energía, refrigeración y mantenimiento.",
   "La diferencia clave es la pregunta que responde cada herramienta. La Pricing Calculator responde '¿Cuánto costarán estos recursos de Azure?'. La TCO Calculator responde '¿Cuánto podría ahorrar si traslado a Azure las cargas de trabajo de mi datacenter actual?'. Por eso la TCO Calculator es más útil cuando se construye un caso de negocio para una migración.",
   "Ninguna de las dos herramientas muestra tu gasto real. Para eso usas Microsoft Cost Management, que informa lo que realmente han costado tus recursos implementados y pronostica el gasto futuro."
  ],
  terms: [
   ["Pricing Calculator (calculadora de precios)", "Una herramienta gratuita que estima el costo de los servicios de Azure que planeas implementar."],
   ["Total Cost of Ownership (TCO) Calculator (calculadora del costo total de propiedad)", "Una herramienta gratuita que compara el costo de ejecutar cargas de trabajo on-premises con el de ejecutarlas en Azure durante varios años."],
   ["Estimate (estimación)", "Un costo proyectado según la configuración que elegiste, no un precio vinculante ni una factura real."]
  ],
  example: "Una directora de finanzas pregunta si cerrar el cuarto de servidores de la empresa ahorraría dinero. El gerente de TI usa la TCO Calculator para comparar cinco años de costos de hardware, energía y personal con Azure. Una vez aprobado, el arquitecto usa la Pricing Calculator para cotizar las VMs y cuentas de almacenamiento específicas que implementará el proyecto.",
  tip: "Comparar on-premises con Azure, o construir un caso de negocio para una migración: TCO Calculator. Estimar el costo de recursos específicos de Azure: Pricing Calculator. Ver lo que realmente gastaste: Cost Management.",
  check: [
   ["¿Qué herramienta estima el costo mensual de dos VMs y una base de datos SQL que planeas crear en Azure?", "La Azure Pricing Calculator."],
   ["¿Qué herramienta ayuda a mostrarle a la dirección el ahorro potencial de migrar un datacenter on-premises a Azure?", "La TCO Calculator, que compara los costos on-premises con los costos de Azure durante varios años."]
  ]
 },
 {
  t: "Microsoft Cost Management: cost analysis, budgets and alerts, and using tags to track spending",
  tt: "Microsoft Cost Management: análisis de costos, presupuestos y alertas, y uso de etiquetas para seguir el gasto",
  body: [
   "Microsoft Cost Management es el servicio integrado para monitorear, asignar y optimizar lo que gastas en Azure. Está disponible en el Azure portal para tus suscripciones y cuentas de facturación, y sus funciones principales no tienen costo adicional. Mientras que las calculadoras estiman, Cost Management informa el gasto real y el pronosticado.",
   "El análisis de costos (cost analysis) te permite explorar tus costos de forma visual. Puedes ver los costos acumulados de un periodo, ver un pronóstico para el resto del mes y agrupar o filtrar los costos por servicio, grupo de recursos, recurso, ubicación o etiqueta. Esto responde rápidamente preguntas como '¿Qué grupo de recursos costó más el mes pasado?' o '¿Por qué subió nuestra factura el martes?'.",
   "Los presupuestos (budgets) te permiten establecer un límite de gasto para un ámbito, como una suscripción o un grupo de recursos, durante un periodo como un mes. Luego defines condiciones de alerta, por ejemplo al 50%, 80% y 100% del presupuesto, según el costo real o el pronosticado. Cuando se alcanza un umbral, Cost Management envía notificaciones por correo y puede activar un grupo de acciones (action group), que puede ejecutar automatizaciones como apagar VMs. Un presupuesto por sí solo no detiene los recursos ni limita el gasto; te avisa. Cost Management también tiene otros tipos de alertas, como las alertas de crédito cuando se está agotando el crédito prepagado, y las alertas de cuota de gasto por departamento para algunos tipos de contrato.",
   "Las etiquetas (tags) te ayudan a seguir el gasto según su significado de negocio y no según la estructura técnica. Una etiqueta es un par nombre-valor, como `CostCenter = Marketing` o `Environment = Production`, que aplicas a recursos, grupos de recursos o suscripciones. Las etiquetas te permiten agrupar los costos en el análisis de costos por departamento, proyecto o entorno, incluso cuando los recursos de un proyecto están repartidos en varios grupos de recursos. También se usan para automatización y operaciones, como identificar qué VMs apagar por la noche.",
   "Los recursos no heredan automáticamente las etiquetas de su grupo de recursos o su suscripción. Si quieres que todos los recursos lleven una etiqueta, puedes usar Azure Policy para exigir etiquetas o para agregarlas o heredarlas automáticamente. Cost Management también se puede configurar para aplicar la herencia de etiquetas en los informes de costos."
  ],
  terms: [
   ["Cost analysis (análisis de costos)", "Una vista de Cost Management para explorar los costos reales y pronosticados agrupados por servicio, recurso, ubicación o etiqueta."],
   ["Budget (presupuesto)", "Un umbral de gasto para un ámbito y un periodo que activa alertas cuando se alcanza."],
   ["Tag (etiqueta)", "Un par nombre-valor que se aplica a los recursos de Azure para organizarlos, por ejemplo por centro de costos o entorno."],
   ["Action group (grupo de acciones)", "Un conjunto de acciones de notificación y automatización que activa una alerta."]
  ],
  example: "Una universidad etiqueta los recursos de cada grupo de investigación con `Project = <name>`. La oficina de finanzas usa el análisis de costos agrupado por la etiqueta Project para cobrarle a cada grupo cada mes, y cada grupo tiene un presupuesto con una alerta por correo al 80% para que nadie se sorprenda con una factura grande.",
  tip: "Los presupuestos alertan; no detienen el gasto por sí solos. Las etiquetas no se heredan de forma predeterminada; usa Azure Policy para exigirlas o heredarlas. Cost Management muestra el gasto real, a diferencia de las calculadoras.",
  check: [
   ["¿Alcanzar el 100% de un presupuesto de Cost Management detiene automáticamente tus recursos?", "No. Un presupuesto envía alertas; para actuar automáticamente, conectas la alerta a un grupo de acciones que ejecute una automatización."],
   ["¿Cómo puedes informar los costos de un proyecto cuyos recursos están repartidos en tres grupos de recursos?", "Aplicando la misma etiqueta, como Project = X, a esos recursos y agrupando o filtrando el análisis de costos por esa etiqueta."]
  ]
 },
 {
  t: "Microsoft Purview for data governance, and the Service Trust Portal for compliance reports",
  tt: "Microsoft Purview para la gobernanza de datos y el Service Trust Portal para los informes de cumplimiento",
  body: [
   "La gobernanza y el cumplimiento son dos necesidades relacionadas. La gobernanza consiste en saber qué datos tienes, dónde viven y cómo se usan, y aplicarles reglas. El cumplimiento (compliance) consiste en demostrar que cumples leyes, regulaciones y estándares de la industria. El examen AZ-900 cubre un servicio de Microsoft para cada área.",
   "Microsoft Purview es una familia de soluciones de gobernanza de datos, riesgo y cumplimiento que te ayuda a obtener una vista única y unificada de tus datos. Purview puede conectarse a orígenes de datos en sistemas on-premises, varias nubes y aplicaciones SaaS, y descubrirlos y escanearlos automáticamente. Construye un mapa de tu patrimonio de datos, clasifica datos sensibles como números de tarjetas de crédito o números de identificación nacional, y registra el linaje de los datos (data lineage), que muestra de dónde vinieron los datos y cómo se han movido y cambiado.",
   "Purview suele describirse en dos grandes áreas. El lado de riesgo y cumplimiento, muy ligado a Microsoft 365, ayuda a proteger los datos sensibles en Teams, OneDrive, Exchange y otros servicios, administrar el ciclo de vida y la retención de los datos y detectar riesgos como la fuga de datos fuera de la organización. El lado de gobernanza de datos unificada te ayuda a administrar datos en orígenes on-premises, multicloud y SaaS, con un catálogo de datos para que las personas encuentren datos confiables, e información sobre dónde se almacenan los datos sensibles.",
   "El Service Trust Portal es un sitio web de Microsoft que ofrece información, herramientas y documentos sobre cómo los servicios en la nube de Microsoft manejan la seguridad, la privacidad y el cumplimiento. Su uso más importante para el AZ-900 es el acceso a informes de auditoría, como informes independientes de terceros sobre los servicios en la nube de Microsoft frente a estándares como ISO/IEC 27001 y SOC (System and Organization Controls), junto con documentos técnicos (whitepapers) y otros documentos de cumplimiento. Inicias sesión con una cuenta Microsoft o una cuenta de trabajo para descargar muchos de ellos.",
   "Las dos herramientas responden preguntas diferentes. Si necesitas descubrir y clasificar los datos de tu propia organización o seguir su linaje, usa Microsoft Purview. Si un auditor pide evidencia de que la nube de Microsoft cumple un estándar, descarga el informe del Service Trust Portal. Recuerda que, según la responsabilidad compartida, el cumplimiento de Microsoft cubre su parte; tú sigues necesitando configurar tus propios recursos de forma que cumplan."
  ],
  terms: [
   ["Microsoft Purview", "Una familia de soluciones de gobernanza de datos, riesgo y cumplimiento que descubre, clasifica y mapea los datos de una organización."],
   ["Data lineage (linaje de datos)", "Un registro de dónde vinieron los datos y cómo se movieron y cambiaron entre sistemas."],
   ["Service Trust Portal", "Un sitio de Microsoft que ofrece informes de auditoría y documentos sobre la seguridad, la privacidad y el cumplimiento de los servicios en la nube de Microsoft."],
   ["Audit report (informe de auditoría)", "Una evaluación independiente, como un informe SOC o ISO, que confirma que un servicio cumple un estándar."]
  ],
  example: "El auditor de una empresa de salud pide pruebas de que Azure cumple ISO/IEC 27001, así que la responsable de cumplimiento descarga el informe de auditoría del Service Trust Portal. Mientras tanto, el equipo de datos usa Microsoft Purview para escanear sus servidores SQL on-premises y su almacenamiento de Azure y encontrar cada tabla que contiene identificadores de pacientes.",
  tip: "Encontrar y clasificar tus propios datos en distintas ubicaciones: Microsoft Purview. Descargar los informes de cumplimiento y de auditoría de Microsoft: Service Trust Portal.",
  check: [
   ["¿Dónde descargarías un informe de auditoría independiente sobre el cumplimiento de Azure con un estándar?", "En el Service Trust Portal."],
   ["¿Qué servicio puede descubrir y clasificar datos sensibles en orígenes on-premises, multicloud y SaaS?", "Microsoft Purview."]
  ]
 },
 {
  t: "Azure Policy: definitions, initiatives, assignments and compliance",
  tt: "Azure Policy: definiciones, iniciativas, asignaciones y cumplimiento",
  body: [
   "Azure Policy es un servicio que te ayuda a hacer cumplir los estándares de la organización y evaluar el cumplimiento a gran escala. Mientras que RBAC controla quién puede hacer algo, Azure Policy controla qué se puede crear y cómo deben configurarse los recursos, sin importar quién lo haga. Por ejemplo, una directiva puede permitir recursos solo en ciertas regiones, exigir una etiqueta en cada grupo de recursos o permitir solo tamaños de VM específicos.",
   "Una definición de directiva (policy definition) describe una regla: la condición que se evalúa y el efecto que se aplica cuando un recurso coincide. Los efectos comunes incluyen Deny, que bloquea una solicitud de creación o actualización que rompe la regla; Audit, que permite la solicitud pero marca el recurso como no conforme; Append y Modify, que agregan o cambian propiedades como las etiquetas; y DeployIfNotExists, que implementa un recurso o configuración relacionada si falta. Azure ofrece muchas definiciones integradas, como 'Allowed locations', y puedes escribir definiciones personalizadas en JSON.",
   "Una iniciativa (initiative), también llamada conjunto de directivas (policy set), agrupa varias definiciones de directivas relacionadas para que puedas administrarlas como una sola unidad hacia un mismo objetivo. Por ejemplo, una iniciativa para un punto de referencia de seguridad podría contener decenas de definiciones que cubren cifrado, registro y reglas de red. Microsoft Defender for Cloud usa una iniciativa integrada para generar sus recomendaciones.",
   "Una definición o una iniciativa no hace nada hasta que creas una asignación (assignment), que la aplica a un ámbito: un grupo de administración, una suscripción o un grupo de recursos. Todos los ámbitos hijos heredan las asignaciones, así que asignar una directiva en un grupo de administración cubre todas sus suscripciones. Puedes excluir ámbitos hijos específicos, y puedes establecer parámetros, como la lista de regiones permitidas.",
   "Azure Policy evalúa los recursos cuando se crean o se modifican, y periódicamente en el caso de los recursos existentes. La vista de cumplimiento muestra qué recursos son conformes o no conformes y por qué. Para muchas directivas, puedes crear tareas de corrección (remediation tasks) que arreglan los recursos no conformes existentes, por ejemplo agregando una etiqueta que falta. Policy también se integra con Azure DevOps y con las canalizaciones (pipelines) de implementación, para que los problemas se detecten antes de implementar."
  ],
  terms: [
   ["Policy definition (definición de directiva)", "Una regla que describe una condición y el efecto, como Deny o Audit, cuando un recurso coincide."],
   ["Initiative (iniciativa)", "Un grupo de definiciones de directivas que se administran juntas hacia un objetivo."],
   ["Assignment (asignación)", "Aplicar una definición de directiva o una iniciativa a un ámbito, del cual la heredan los ámbitos hijos."],
   ["Remediation (corrección)", "Hacer que los recursos no conformes existentes cumplan, por ejemplo agregando una configuración que falta."]
  ],
  example: "Una empresa asigna la directiva integrada 'Allowed locations' en su grupo de administración raíz, con solo dos regiones europeas permitidas. Cuando un desarrollador intenta crear una cuenta de almacenamiento en otra región, la implementación falla con un mensaje Deny de la directiva, y el panel de cumplimiento muestra los recursos más antiguos que estaban fuera de esas regiones.",
  tip: "Policy trata de lo que está permitido (configuración); RBAC trata de quién puede actuar. Una iniciativa agrupa definiciones; una asignación las aplica a un ámbito. Deny bloquea los cambios no conformes; Audit solo los informa.",
  check: [
   ["¿Cuál es la diferencia entre una definición de directiva y una asignación de directiva?", "La definición describe la regla y su efecto; la asignación la aplica a un ámbito específico para que surta efecto."],
   ["Necesitas impedir que cualquiera, incluidos los Owners, cree VMs de tamaños que no estén en una lista aprobada. ¿Qué servicio usas?", "Azure Policy, con una definición como 'Allowed virtual machine size SKUs' usando el efecto Deny."]
  ]
 },
 {
  t: "Resource locks: CanNotDelete vs ReadOnly and how they inherit",
  tt: "Bloqueos de recursos: CanNotDelete frente a ReadOnly y cómo se heredan",
  body: [
   "Incluso con un RBAC cuidadoso, una persona con el rol adecuado puede eliminar o cambiar por accidente un recurso importante. Los bloqueos de recursos (resource locks) agregan una red de seguridad: impiden que los recursos se eliminen o modifiquen, sin importar el rol del usuario, hasta que se quite el bloqueo.",
   "Hay dos niveles de bloqueo. CanNotDelete (que el portal muestra como Delete) significa que los usuarios autorizados aún pueden leer y modificar el recurso, pero no pueden eliminarlo. ReadOnly (que se muestra como Read-only) significa que los usuarios autorizados pueden leer el recurso, pero no pueden eliminarlo ni actualizarlo; funciona como si se limitara a cada usuario a los permisos del rol Reader para ese recurso.",
   "Puedes aplicar un bloqueo a nivel de suscripción, grupo de recursos o recurso. Los bloqueos se heredan: un bloqueo en un grupo de recursos se aplica a todos los recursos de ese grupo, incluidos los que se agreguen después. Gana el bloqueo más restrictivo de la herencia, así que un bloqueo ReadOnly en un grupo de recursos prevalece sobre un bloqueo CanNotDelete en un recurso que está dentro de él.",
   "Los bloqueos se aplican a todos, incluidos los Owners. Para eliminar un recurso bloqueado primero debes quitar el bloqueo, lo que requiere permiso para administrar bloqueos, como el rol Owner o User Access Administrator. Ese paso adicional es justamente el objetivo: obliga a tomar una decisión deliberada antes de hacer cambios destructivos, lo que evita errores cometidos con prisa.",
   "Los bloqueos se aplican a las operaciones de administración enviadas mediante Azure Resource Manager, no a las operaciones sobre los datos dentro de un recurso. Por ejemplo, un bloqueo ReadOnly en una cuenta de almacenamiento no impide que alguien con acceso a los datos suba blobs, pero sí bloquea los cambios en la configuración de la cuenta. Los bloqueos ReadOnly también pueden tener efectos secundarios sorprendentes, porque algunas acciones que parecen lecturas en realidad son operaciones de administración; por ejemplo, se bloquea listar las claves de acceso de una cuenta de almacenamiento. Prueba los bloqueos ReadOnly antes de usarlos ampliamente.",
   "Los bloqueos son diferentes de Azure Policy. Policy controla qué configuraciones se permiten; los bloqueos protegen recursos existentes específicos contra la eliminación o el cambio."
  ],
  terms: [
   ["Resource lock (bloqueo de recurso)", "Una configuración que impide que un recurso se elimine o modifique, incluso por usuarios con permiso, hasta que se quite."],
   ["CanNotDelete", "Un nivel de bloqueo que permite leer y modificar un recurso, pero bloquea su eliminación."],
   ["ReadOnly", "Un nivel de bloqueo que permite leer un recurso, pero bloquea su modificación o eliminación."]
  ],
  example: "Un administrador coloca un bloqueo CanNotDelete en el grupo de recursos que contiene la base de datos de producción y la red virtual de la empresa. Meses después, un colega que ejecuta un script de limpieza intenta eliminar ese grupo por error, y Azure lo rechaza debido al bloqueo.",
  tip: "CanNotDelete aún permite cambios; ReadOnly bloquea los cambios y la eliminación. Los bloqueos se aplican incluso a los Owners y los heredan los recursos hijos. Para eliminar un recurso bloqueado, primero quita el bloqueo.",
  check: [
   ["Un grupo de recursos tiene un bloqueo CanNotDelete. ¿Puede un Contributor cambiar el tamaño de una VM dentro de él?", "Sí. CanNotDelete solo bloquea la eliminación; las modificaciones como el cambio de tamaño siguen permitidas."],
   ["¿Puede el Owner de una suscripción eliminar un recurso protegido por un bloqueo sin cambiar el bloqueo?", "No. Los bloqueos se aplican a todos los usuarios, incluidos los Owners; primero hay que quitar el bloqueo."]
  ]
 },
 {
  t: "Tools for interacting with Azure: the portal, Azure Cloud Shell, Azure CLI and Azure PowerShell",
  tt: "Herramientas para interactuar con Azure: el portal, Azure Cloud Shell, Azure CLI y Azure PowerShell",
  body: [
   "Puedes administrar Azure con varias herramientas. Todas envían solicitudes al mismo lugar, Azure Resource Manager, así que lo que crees con una herramienta se puede administrar con cualquier otra. La elección depende de la tarea y de tu preferencia.",
   "El Azure portal es una consola gráfica basada en web. Inicias sesión desde un navegador y luego creas, configuras y monitoreas recursos mediante menús y formularios, construyes paneles personalizados y ves costos y alertas. El portal es ideal para aprender, para tareas puntuales y para ver las cosas de forma visual. Es menos adecuado para repetir la misma tarea muchas veces, porque llenar formularios a mano es lento y propenso a errores. Microsoft también ofrece una aplicación móvil de Azure para monitorear y hacer acciones rápidas desde cualquier lugar.",
   "Azure Cloud Shell es un shell basado en navegador que abres desde la barra de herramientas del portal o directamente en un navegador. Te permite elegir entre Bash o PowerShell, ya está autenticado con tu cuenta de Azure y tiene preinstalados Azure CLI, Azure PowerShell y herramientas comunes, así que no hay nada que instalar en tu computadora. Cloud Shell puede usar un pequeño recurso compartido de archivos de almacenamiento para conservar tus archivos entre sesiones, o ejecutarse sin él en una sesión efímera.",
   "Azure CLI es una herramienta de línea de comandos multiplataforma que se ejecuta en Windows, macOS y Linux. Sus comandos empiezan con `az`, por ejemplo `az group create --name rg-demo --location eastus` o `az vm list -o table`. Es popular entre quienes usan Bash y es fácil de usar en scripts.",
   "Azure PowerShell es un conjunto de módulos, conocido como el módulo Az, que agrega cmdlets para administrar Azure a PowerShell. Los cmdlets siguen un patrón verbo-sustantivo, como `New-AzResourceGroup -Name rg-demo -Location eastus` o `Get-AzVM`. Es popular entre los administradores de Windows que ya usan PowerShell, y PowerShell también se ejecuta en macOS y Linux.",
   "Azure CLI y Azure PowerShell pueden hacer en general las mismas cosas; el examen puede pedirte que reconozcas a qué herramienta pertenece un comando. Ambos pueden usarse de forma interactiva o en scripts, y ambos están disponibles dentro de Cloud Shell. Para implementaciones repetibles de entornos completos, pasarías a la infraestructura como código, que se cubre en una lección posterior."
  ],
  terms: [
   ["Azure portal", "Una consola gráfica basada en web para administrar recursos de Azure."],
   ["Azure Cloud Shell", "Un shell Bash o PowerShell basado en navegador, ya autenticado y con las herramientas de Azure preinstaladas."],
   ["Azure CLI", "Una herramienta de línea de comandos multiplataforma cuyos comandos empiezan con az."],
   ["Azure PowerShell", "El módulo Az de PowerShell, con cmdlets de tipo verbo-sustantivo como New-AzVM."]
  ],
  example: "Una administradora que usa una laptop prestada necesita listar rápidamente todos los grupos de recursos. Abre Cloud Shell desde el portal, elige Bash y ejecuta `az group list -o table` sin instalar nada. Después cambia el shell a PowerShell y ejecuta `Get-AzResourceGroup` para ver la misma información.",
  tip: "Los comandos que empiezan con az son de Azure CLI; los cmdlets de tipo Verbo-Az sustantivo, como Get-AzVM, son de Azure PowerShell. Cloud Shell no necesita instalación local y admite tanto Bash como PowerShell.",
  check: [
   ["¿Qué herramienta te permite ejecutar comandos de Azure CLI desde un navegador sin instalar nada localmente?", "Azure Cloud Shell."],
   ["¿`New-AzResourceGroup` es un comando de Azure CLI o de Azure PowerShell?", "De Azure PowerShell; es un cmdlet de tipo verbo-sustantivo del módulo Az. El equivalente en la CLI sería `az group create`."]
  ]
 },
 {
  t: "Azure Arc for managing on-premises and multicloud resources",
  tt: "Azure Arc para administrar recursos on-premises y multicloud",
  body: [
   "La mayoría de las organizaciones no ejecutan todo en Azure. Tienen servidores en sus propios datacenters, sucursales y ubicaciones perimetrales (edge), y a veces cargas de trabajo en otras nubes públicas. Administrar cada entorno con herramientas distintas dificulta aplicar seguridad, cumplimiento y monitoreo consistentes. Azure Arc extiende la administración y la gobernanza de Azure a los recursos que están fuera de Azure.",
   "Azure Arc funciona proyectando los recursos que no son de Azure hacia Azure Resource Manager. Instalas un agente ligero en un servidor, o conectas un clúster de Kubernetes, y el recurso aparece en el Azure portal como un recurso de Azure con su propio ID de recurso, ubicado en una suscripción y un grupo de recursos como cualquier otro. La carga de trabajo en sí sigue ejecutándose donde está; Arc no la migra.",
   "Una vez que un recurso está habilitado con Arc, puedes administrarlo con herramientas conocidas de Azure. Puedes organizarlo con grupos de recursos y etiquetas, controlar quién puede administrarlo con Azure RBAC, aplicar y auditar Azure Policy, monitorearlo con Azure Monitor, protegerlo con Microsoft Defender for Cloud y mantenerlo actualizado con la administración de actualizaciones de Azure. Esto te da un panel único (single pane of glass) sobre los entornos on-premises, edge y multicloud.",
   "Azure Arc puede administrar varios tipos de recursos. Los servidores habilitados con Arc (Arc-enabled servers) cubren servidores Windows y Linux físicos y virtuales que se ejecutan fuera de Azure. Kubernetes habilitado con Arc (Arc-enabled Kubernetes) cubre clústeres de Kubernetes alojados en cualquier lugar. Arc también puede administrar instancias de SQL Server fuera de Azure y ejecutar algunos servicios de datos de Azure en tu propia infraestructura. Además, puede conectar plataformas de virtualización como VMware vSphere y entornos de System Center Virtual Machine Manager para que sus VMs se administren desde Azure.",
   "Arc encaja de forma natural con los modelos de nube de lecciones anteriores: es la respuesta de Microsoft para administrar entornos híbridos y multicloud de forma consistente. En el examen, elige Azure Arc cuando el escenario trate de administrar o gobernar recursos que se quedan fuera de Azure. Elige Azure Migrate cuando el objetivo sea trasladarlos a Azure."
  ],
  terms: [
   ["Azure Arc", "Un servicio que extiende la administración y la gobernanza de Azure a servidores, clústeres de Kubernetes y servicios de datos fuera de Azure."],
   ["Arc-enabled server (servidor habilitado con Arc)", "Un servidor físico o virtual fuera de Azure que tiene instalado el agente de Arc y aparece como un recurso de Azure."],
   ["Single pane of glass (panel único)", "Una sola vista de administración que abarca recursos de muchos entornos."]
  ],
  example: "Un minorista tiene servidores Linux en sus tiendas, servidores Windows en su propio datacenter y un clúster de Kubernetes en otra nube. Después de conectarlos todos a Azure Arc, su equipo de seguridad asigna una sola iniciativa de Azure Policy y activa Defender for Cloud en todos los entornos desde el Azure portal.",
  tip: "Arc administra los recursos donde están; no los mueve. Si el escenario dice 'aplicar Azure Policy a servidores on-premises o de otra nube', la respuesta es Azure Arc.",
  check: [
   ["¿Conectar un servidor a Azure Arc traslada su carga de trabajo a Azure?", "No. El servidor sigue ejecutándose donde está; Arc solo lo proyecta hacia Azure Resource Manager para administrarlo."],
   ["Menciona tres capacidades de administración de Azure que puedes usar en un servidor habilitado con Arc.", "Cualesquiera tres de: grupos de recursos y etiquetas, Azure RBAC, Azure Policy, Azure Monitor, Microsoft Defender for Cloud y la administración de actualizaciones."]
  ]
 },
 {
  t: "Azure Resource Manager and infrastructure as code with ARM templates and Bicep",
  tt: "Azure Resource Manager e infraestructura como código con plantillas ARM y Bicep",
  body: [
   "Azure Resource Manager (ARM) es el servicio de implementación y administración de Azure. Cada solicitud para crear, actualizar o eliminar un recurso, ya venga del portal, de Azure CLI, de Azure PowerShell, de las APIs REST o de un SDK, pasa por Resource Manager. Este autentica y autoriza la solicitud y luego la envía al servicio de Azure correspondiente. Como todas las herramientas pasan por la misma capa, obtienes resultados consistentes y funciones consistentes, como RBAC, etiquetas, bloqueos y directivas, sin importar qué herramienta uses.",
   "Resource Manager aporta varios beneficios. Puedes administrar tu infraestructura mediante plantillas declarativas en lugar de scripts. Puedes implementar, administrar y monitorear todos los recursos de una solución como un grupo, en lugar de uno por uno. Puedes volver a implementar de forma consistente durante todo el ciclo de vida del desarrollo. Maneja las dependencias, para que los recursos se creen en el orden correcto, y puede implementar en paralelo los recursos independientes.",
   "La infraestructura como código (IaC) significa describir en archivos de código la infraestructura que necesitas y luego usar esos archivos para crearla. En lugar de hacer clic en el portal, guardas las definiciones en el control de código fuente, revisas los cambios como si fueran código e implementas el mismo entorno una y otra vez. IaC reduce el error humano y la desviación de configuración (configuration drift) entre desarrollo, pruebas y producción.",
   "Las plantillas de Azure Resource Manager (ARM templates) son archivos JSON que definen los recursos que se van a implementar. Son declarativas: indicas lo que quieres, no los pasos para crearlo, y Resource Manager determina cómo llegar ahí. Las implementaciones son idempotentes, lo que significa que puedes implementar la misma plantilla muchas veces y obtener el mismo resultado. Las plantillas pueden usar parámetros, como el nombre del entorno, para que una sola plantilla sirva para muchos entornos, y pueden dividirse en plantillas vinculadas (linked templates).",
   "Bicep es un lenguaje específico de dominio de Microsoft para implementar recursos de Azure de forma declarativa. Usa una sintaxis más sencilla y concisa que JSON y admite módulos para reutilizar código. Un archivo Bicep se compila (transpila) a una plantilla ARM JSON estándar, así que puede hacer todo lo que hacen las plantillas ARM, y los nuevos tipos de recursos de Azure están disponibles en Bicep de inmediato. Por ejemplo, una cuenta de almacenamiento se puede declarar en unas pocas líneas:",
   "```bicep\nresource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: 'stdemo${uniqueString(resourceGroup().id)}'\n  location: resourceGroup().location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}\n```"
  ],
  terms: [
   ["Azure Resource Manager (ARM)", "La capa de implementación y administración por la que pasan todas las solicitudes de administración de Azure."],
   ["Infrastructure as code, IaC (infraestructura como código)", "Definir e implementar la infraestructura a partir de archivos de código en lugar de pasos manuales."],
   ["ARM template (plantilla ARM)", "Un archivo JSON declarativo que define los recursos de Azure que Resource Manager debe implementar."],
   ["Bicep", "Un lenguaje declarativo conciso que se compila a plantillas ARM."],
   ["Idempotent (idempotente)", "Que produce el mismo resultado cuando se ejecuta muchas veces con la misma entrada."]
  ],
  example: "Una empresa de software necesita entornos de desarrollo, pruebas y producción idénticos. Escribe un solo archivo Bicep que describe la VNet, App Service y la base de datos, lo guarda en su repositorio de código y lo implementa tres veces con distintos valores de parámetros, así los tres entornos coinciden exactamente.",
  tip: "Todas las herramientas, incluido el portal, pasan por Azure Resource Manager. Las plantillas ARM son JSON y declarativas; Bicep es un lenguaje más sencillo que se compila a ARM JSON. Declarativo significa que describes el estado final.",
  check: [
   ["¿Qué significa que las plantillas ARM sean declarativas?", "Que describes los recursos y las configuraciones que quieres, y Resource Manager determina cómo crearlos y en qué orden."],
   ["¿Cómo se relaciona Bicep con las plantillas ARM?", "Los archivos Bicep se compilan a plantillas ARM JSON, así que Bicep es una forma más sencilla de escribir las mismas implementaciones."]
  ]
 },
 {
  t: "Azure Advisor recommendations and Azure Service Health (Azure status, Service Health, Resource Health)",
  tt: "Recomendaciones de Azure Advisor y Azure Service Health (Azure status, Service Health, Resource Health)",
  body: [
   "Azure ofrece herramientas que te dicen cómo mejorar tus recursos y si el propio Azure está teniendo problemas. El examen espera que sepas qué herramienta da cada tipo de información.",
   "Azure Advisor evalúa tus recursos de Azure implementados y hace recomendaciones personalizadas basadas en las mejores prácticas. Las recomendaciones se agrupan en cinco categorías. Las recomendaciones de confiabilidad (Reliability) ayudan a asegurar la continuidad del negocio, por ejemplo agregando redundancia. Las recomendaciones de seguridad (Security), que provienen de Microsoft Defender for Cloud, ayudan a detectar amenazas y vulnerabilidades. Las recomendaciones de rendimiento (Performance) ayudan a mejorar la velocidad de las aplicaciones. Las recomendaciones de excelencia operativa (Operational excellence) ayudan con la eficiencia de los procesos y flujos de trabajo y con las mejores prácticas de implementación. Las recomendaciones de costo (Cost) ayudan a reducir el gasto, por ejemplo cambiando el tamaño de VMs poco usadas o apagándolas, o comprando reservas. Cada recomendación incluye la acción propuesta, y Advisor también da una puntuación general (Advisor score). Es gratuito y está disponible en el portal y mediante APIs.",
   "Azure Service Health te ayuda a seguir el estado de los servicios de Azure y de tus recursos, y está formado por tres vistas que van de lo amplio a lo específico. Azure status es una página pública que muestra las interrupciones de servicio en todas las regiones de Azure del mundo. Es una vista global, no personalizada para ti.",
   "Service Health, la segunda vista, se centra en los servicios y las regiones de Azure que realmente usas. Informa sobre problemas de servicio (problemas activos), mantenimiento planificado, avisos de estado (por ejemplo, una función que se va a retirar) y avisos de seguridad. Puedes configurar alertas de Service Health para recibir notificaciones por correo, SMS u otras acciones cuando algo afecta tus servicios, y conserva un historial de incidentes pasados para que puedas revisarlos, incluidos los análisis de causa raíz.",
   "Resource Health, la tercera vista, es la más específica. Muestra el estado de tus recursos individuales, como una VM específica, y si un problema lo causa un evento de la plataforma Azure o alguna otra cosa. También conserva un historial de la disponibilidad de ese recurso, lo que ayuda cuando necesitas demostrar si se incumplió un SLA.",
   "En conjunto, estas herramientas complementan a Azure Monitor. Advisor te dice cómo mejorar, Service Health te dice si Azure te está afectando y Monitor recopila las métricas y registros detallados de tus propios recursos."
  ],
  terms: [
   ["Azure Advisor", "Un servicio gratuito que da recomendaciones personalizadas de confiabilidad, seguridad, rendimiento, excelencia operativa y costo."],
   ["Azure status", "Una vista pública y global del estado de todos los servicios de Azure en todas las regiones."],
   ["Service Health", "Una vista personalizada de los problemas de servicio, el mantenimiento planificado y los avisos que afectan a los servicios y regiones que usas."],
   ["Resource Health", "El estado de un recurso individual, incluido si un evento de la plataforma lo está afectando."]
  ],
  example: "Una tienda web está lenta una mañana. La operadora revisa Service Health y ve un problema de servicio activo que afecta al almacenamiento en su región, con una alerta ya enviada por correo a su equipo. Resource Health de la VM de la tienda muestra que está disponible. Más tarde, Advisor recomienda cambiar el tamaño de dos VMs poco usadas para ahorrar costos.",
  tip: "Recomendaciones para mejorar tus recursos: Advisor. Página global de interrupciones para todos: Azure status. Interrupciones y mantenimiento que afectan tus servicios: Service Health. Estado de un recurso específico: Resource Health.",
  check: [
   ["¿Qué herramienta sugeriría apagar una VM poco usada para ahorrar dinero?", "Azure Advisor, en su categoría de costo."],
   ["Quieres recibir un correo cuando un mantenimiento planificado vaya a afectar los servicios de Azure que usas. ¿Qué herramienta configuras?", "Service Health, con una alerta de Service Health."]
  ]
 },
 {
  t: "Azure Monitor: metrics, Log Analytics, alerts and Application Insights",
  tt: "Azure Monitor: métricas, Log Analytics, alertas y Application Insights",
  body: [
   "Azure Monitor es la plataforma para recopilar, analizar y actuar sobre los datos de monitoreo de tus recursos de Azure, tus máquinas on-premises y otras nubes. Reúne datos de aplicaciones, sistemas operativos, recursos de Azure, suscripciones y el tenant, para que puedas entender cómo funcionan tus sistemas y responder a los problemas.",
   "Azure Monitor trabaja con dos tipos principales de datos. Las métricas (metrics) son valores numéricos recopilados a intervalos regulares, como el porcentaje de CPU, la memoria disponible o las solicitudes por segundo. Son ligeras, casi en tiempo real e ideales para gráficas y alertas rápidas. Muchos recursos de Azure envían métricas de plataforma automáticamente, sin ninguna configuración. Los registros (logs) son registros de eventos y datos con propiedades detalladas, como trazas de aplicaciones, entradas del registro de actividad sobre quién cambió qué, o eventos de seguridad. Los logs se almacenan en un área de trabajo de Log Analytics (Log Analytics workspace).",
   "Log Analytics es la herramienta del Azure portal para escribir y ejecutar consultas de logs sobre esos datos usando Kusto Query Language (KQL). Por ejemplo, una consulta puede contar los inicios de sesión fallidos por hora o encontrar qué VMs tuvieron más errores. Las consultas se pueden anclar a paneles, usar en libros (workbooks) o servir de base para alertas. Una consulta sencilla se ve así:",
   "```kusto\nHeartbeat\n| where TimeGenerated > ago(1h)\n| summarize LastSeen = max(TimeGenerated) by Computer\n```",
   "Las alertas de Azure Monitor te avisan de forma proactiva cuando algo en tus datos de monitoreo requiere atención. Una regla de alerta define qué vigilar (un umbral de métrica, el resultado de una consulta de logs o un evento del registro de actividad) y la condición. Cuando se activa, ejecuta un grupo de acciones (action group), que puede enviar correos, SMS o notificaciones push, llamar a un webhook o iniciar una automatización como una Azure Function o una Logic App.",
   "Application Insights es una función de Azure Monitor para el monitoreo del rendimiento de aplicaciones (APM). Monitorea aplicaciones web en vivo, ya se ejecuten en Azure, on-premises o en otra nube. Registra las tasas de solicitudes, los tiempos de respuesta y las tasas de fallas, las llamadas a dependencias como bases de datos y APIs, las excepciones, las vistas de página y las sesiones de usuario. También puede ejecutar pruebas de disponibilidad que revisan tu sitio a intervalos regulares desde ubicaciones de todo el mundo. Ayuda a los desarrolladores a encontrar la causa de páginas lentas o errores en su código, algo que las métricas de infraestructura por sí solas no revelarían."
  ],
  terms: [
   ["Azure Monitor", "La plataforma de Azure para recopilar, analizar y actuar sobre métricas y logs."],
   ["Metrics (métricas)", "Valores numéricos recopilados a intervalos regulares, adecuados para gráficas y alertas casi en tiempo real."],
   ["Log Analytics", "La herramienta para consultar datos de logs en un Log Analytics workspace usando Kusto Query Language (KQL)."],
   ["Application Insights", "Una función de Azure Monitor para el monitoreo del rendimiento de aplicaciones web en vivo."],
   ["Action group (grupo de acciones)", "El conjunto de notificaciones y acciones que activa una alerta."]
  ],
  example: "Un sitio de viajes configura una alerta de métrica que envía un correo al ingeniero de guardia cuando el uso promedio de CPU de su capa web se mantiene por encima del 85% durante diez minutos. Cuando los clientes se quejan de pagos lentos, Application Insights muestra que una llamada a la API de pagos tarda varios segundos, y una consulta de Log Analytics encuentra errores coincidentes en los logs.",
  tip: "Las métricas son números a lo largo del tiempo; los logs son registros detallados que se consultan con KQL en Log Analytics. Application Insights monitorea aplicaciones (solicitudes, excepciones, dependencias), no solo infraestructura. Las alertas usan grupos de acciones para notificar o automatizar.",
  check: [
   ["¿Qué función de Azure Monitor ayudaría a un desarrollador a descubrir por qué las páginas de una aplicación web cargan lento?", "Application Insights, que registra los tiempos de las solicitudes, las dependencias y las excepciones."],
   ["¿Dónde escribes consultas KQL sobre los datos de logs recopilados?", "En Log Analytics, sobre un Log Analytics workspace."]
  ]
 },
], { lang: "es" });
