/* Spanish translation of the Java SE exam simulations. Same ids and structure as data/pbq/java-se.js. */
CertHub.addPbqs("java-se", [
  { id: "values-fill", d: 1, type: "fill", title: "Predice valores primitivos y de String",
    prompt: "Cada variable de abajo se imprime con System.out.println. Completa exactamente lo que se imprime para cada una.",
    context: "int a = 0x1F;\nint b = 010;\nlong c = 7 / 2 * 2L;\ndouble d = Math.floor(-1.5);\nString s = \"  Java  \".strip() + \"!\".repeat(2);\nint e = 10;\ne += e++ + ++e;\nchar ch = 'A';\nch += 2;",
    fields: [
      { label: "a", answers: ["31"] },
      { label: "b", answers: ["8"] },
      { label: "c", answers: ["6"] },
      { label: "d", answers: ["-2.0"] },
      { label: "s", answers: ["Java!!"] },
      { label: "e", answers: ["32"] },
      { label: "ch", answers: ["C"] }
    ],
    explain: "0x1F es el hexadecimal 31 y un 0 inicial hace que 010 sea el octal 8. En c, 7 / 2 es una división entera (3) antes de la multiplicación por long, lo que da 6. Math.floor(-1.5) redondea hacia menos infinito y devuelve el double -2.0. strip() elimina los espacios de los extremos y repeat(2) da \"!!\". Para e, la asignación compuesta guarda primero el valor izquierdo 10; luego e++ produce 10 (e pasa a 11) y ++e produce 12, así que e = 10 + 22 = 32. ch += 2 incluye un cast implícito de vuelta a char, así que 'A' se convierte en 'C'." },

  { id: "sealed-switch", d: 2, type: "select", title: "¿Qué switch con patrones compilan?",
    prompt: "sh es una variable de tipo Shape. Cada opción es el cuerpo de `int k = switch (sh) { ... };`. Selecciona todas las opciones que compilan.",
    context: "sealed interface Shape permits Circle, Square, Rect {}\nrecord Circle(double r) implements Shape {}\nrecord Square(double s) implements Shape {}\nrecord Rect(double w, double h) implements Shape {}",
    options: [
      "case Circle c -> 1; case Square s -> 2; case Rect r -> 3;",
      "case Circle c -> 1; case Square s -> 2;",
      "case Shape x -> 0; case Circle c -> 1; default -> 2;",
      "case Rect(double w, double h) when w == h -> 0; case Rect r -> 1; case Circle c -> 2; case Square s -> 3;",
      "case Circle c -> 1; default -> 0;",
      "case Rect r -> 1; case Rect(var w, var h) when w > h -> 2; case Circle c -> 3; case Square s -> 4;",
      "case Circle c -> 1; case Square s -> 2; case Rect r -> 3; case null -> 0;",
      "case Circle c: yield 1; case Square s -> 2; case Rect r -> 3;"
    ],
    answers: [0, 3, 4, 6],
    explain: "Una expresión switch debe ser exhaustiva: cubrir cada subtipo permitido de una interfaz sealed (opción 1) o agregar default (opción 5) funciona, y case null se permite como etiqueta adicional (opción 7). La opción 2 omite Rect. Las opciones 3 y 6 ponen primero un patrón que coincide con todo, así que un case posterior queda dominado y el compilador lo rechaza. Un patrón de record con guarda antes del case Rect sin guarda (opción 4) está bien. La opción 8 mezcla etiquetas con dos puntos y con flecha en un mismo switch, lo que nunca se permite." },

  { id: "init-order", d: 3, type: "order", title: "Ordena la inicialización de clases y objetos",
    prompt: "Ninguna de las dos clases se ha usado todavía cuando main ejecuta `new Child();`. Ordena los bloques según el orden en que se ejecutan.",
    context: "class Parent {\n  static { System.out.print(\"PS \"); }\n  { System.out.print(\"PI \"); }\n  Parent() { System.out.print(\"PC \"); }\n}\nclass Child extends Parent {\n  static { System.out.print(\"CS \"); }\n  { System.out.print(\"CI \"); }\n  Child() { System.out.print(\"CC \"); }\n}",
    steps: [
      "Inicializador estático de Parent (PS)",
      "Inicializador estático de Child (CS)",
      "Inicializador de instancia de Parent (PI)",
      "Cuerpo del constructor de Parent (PC)",
      "Inicializador de instancia de Child (CI)",
      "Cuerpo del constructor de Child (CC)"
    ],
    explain: "La inicialización de clases va primero y avanza de la superclase a la subclase, así que ambos bloques static se ejecutan antes de construir cualquier objeto. Luego el constructor de Child llama implícitamente a super(): se ejecutan los inicializadores de instancia de Parent y después el cuerpo del constructor de Parent. Solo cuando super() retorna se ejecutan los inicializadores de instancia y el cuerpo del constructor de Child. La salida es PS CS PI PC CI CC, y un segundo new Child() imprimiría solo PI PC CI CC." },

  { id: "poly-match", d: 3, type: "match", title: "Relaciona expresiones con resultados polimórficos",
    prompt: "Usando las clases que se muestran, relaciona cada expresión con el valor al que se evalúa.",
    context: "class Animal {\n  String name = \"animal\";\n  static String kind() { return \"A\"; }\n  String sound() { return \"...\"; }\n}\nclass Dog extends Animal {\n  String name = \"dog\";\n  static String kind() { return \"D\"; }\n  String sound() { return \"woof\"; }\n}\n// in main:\nAnimal a = new Dog();",
    pairs: [["a.name", "animal"], ["((Dog) a).name", "dog"], ["a.sound()", "woof"], ["a.kind()", "A"], ["Dog.kind()", "D"]],
    extra: ["...", "ClassCastException"],
    explain: "Solo los métodos de instancia son polimórficos. a.sound() ejecuta la sobrescritura de Dog porque el objeto es un Dog. Los campos se eligen según el tipo de la referencia, así que a.name lee el campo de Animal, y un cast a Dog lee el campo oculto de Dog. Los métodos static se ocultan en lugar de sobrescribirse, así que a.kind() usa el tipo en tiempo de compilación, Animal. El cast funciona porque el objeto realmente es un Dog." },

  { id: "twr-order", d: 4, type: "order", title: "Ordena los eventos de try-with-resources",
    prompt: "Ordena las líneas impresas según aparecen cuando se ejecuta este código.",
    context: "class Res implements AutoCloseable {\n  final String n;\n  Res(String n) { this.n = n; System.out.println(\"open \" + n); }\n  public void close() { System.out.println(\"close \" + n); }\n}\n// in main:\ntry (Res a = new Res(\"A\"); Res b = new Res(\"B\")) {\n  System.out.println(\"body\");\n  throw new IllegalStateException(\"boom\");\n} catch (IllegalStateException e) {\n  System.out.println(\"catch \" + e.getMessage());\n} finally {\n  System.out.println(\"finally\");\n}",
    steps: ["open A", "open B", "body", "close B", "close A", "catch boom", "finally"],
    explain: "Los recursos se abren en el orden en que se declaran y se cierran en orden inverso. Se cierran en cuanto termina el bloque try, incluso si termina con una excepción, y eso ocurre antes de que se ejecute cualquier bloque catch o finally. Después, el catch maneja la IllegalStateException, y finally siempre se ejecuta al final." },

  { id: "collections-fill", d: 5, type: "fill", title: "Predice la salida de las colecciones",
    prompt: "Completa exactamente lo que imprime cada println numerado (usa el formato normal de toString de Java).",
    context: "List<Integer> list = new ArrayList<>(List.of(5, 3, 8, 3));\nlist.remove(Integer.valueOf(3));\nlist.remove(0);\n\nDeque<String> dq = new ArrayDeque<>();\ndq.push(\"a\");\ndq.push(\"b\");\ndq.offerLast(\"c\");\n\nMap<String, Integer> m = new TreeMap<>();\nm.put(\"b\", 2);\nm.put(\"a\", 1);\nm.putIfAbsent(\"a\", 9);\nm.merge(\"b\", 5, Integer::sum);\n\nTreeSet<String> ts = new TreeSet<>(List.of(\"pear\", \"Fig\", \"apple\"));\n\nSystem.out.println(list);                          // (1)\nSystem.out.println(dq.pollFirst() + dq.peekLast()); // (2)\nSystem.out.println(m);                             // (3)\nSystem.out.println(ts.first());                    // (4)",
    fields: [
      { label: "(1)", answers: ["[8, 3]", "[8,3]"] },
      { label: "(2)", answers: ["bc"] },
      { label: "(3)", answers: ["{a=1, b=7}", "{a=1,b=7}"] },
      { label: "(4)", answers: ["Fig"] }
    ],
    explain: "remove(Integer.valueOf(3)) elimina el primer valor que coincide, lo que da [5, 8, 3], y remove(0) elimina por índice, lo que deja [8, 3]. push agrega al frente, así que el deque es [b, a, c]; pollFirst devuelve b y peekLast devuelve c. putIfAbsent conserva a=1, merge suma 5 a 2, y TreeMap imprime las claves ordenadas. TreeSet usa el orden natural de String, en el que las mayúsculas van antes que las minúsculas, así que Fig es el primero." },

  { id: "stream-match", d: 6, type: "match", title: "Relaciona pipelines de streams con sus resultados",
    prompt: "Dado List<String> w = List.of(\"kiwi\", \"fig\", \"plum\", \"apple\", \"fig\"); relaciona cada expresión con el valor que imprime.",
    pairs: [
      ["w.stream().distinct().count()", "4"],
      ["w.stream().collect(Collectors.groupingBy(String::length, Collectors.counting())).get(3)", "2"],
      ["w.stream().filter(s -> s.length() > 3).map(String::toUpperCase).findFirst().get()", "KIWI"],
      ["w.stream().anyMatch(s -> s.startsWith(\"p\"))", "true"],
      ["w.stream().mapToInt(String::length).max().getAsInt()", "5"],
      ["w.stream().sorted().skip(1).findFirst().get()", "fig"]
    ],
    extra: ["3", "false", "apple"],
    explain: "distinct() descarta el segundo fig, lo que deja 4 elementos. Agrupar por longitud con counting() asocia 3 con 2 porque fig aparece dos veces. La primera palabra de más de 3 caracteres en el orden de encuentro es kiwi, que map convierte en KIWI. plum empieza con p, así que anyMatch es true. apple es la palabra más larga, con 5 caracteres. El orden ordenado es apple, fig, fig, kiwi, plum, así que al saltar uno queda fig primero." },

  { id: "stream-fill", d: 6, type: "fill", title: "Evalúa lambdas y collectors",
    prompt: "Completa el valor impreso para cada variable.",
    context: "var r1 = Stream.of(3, 1, 2).sorted(Comparator.reverseOrder())\n    .map(String::valueOf).collect(Collectors.joining(\"-\"));\nvar r2 = IntStream.range(1, 5).filter(i -> i % 2 == 0).sum();\nvar r3 = Stream.of(\"a\", \"bb\", \"cc\")\n    .collect(Collectors.partitioningBy(s -> s.length() > 1)).get(false);\nvar r4 = Stream.of(1, 2, 3, 4).reduce(0, (x, y) -> x - y);\nvar r5 = Optional.of(\"x\").filter(String::isEmpty)\n    .map(String::toUpperCase).orElse(\"none\");",
    fields: [
      { label: "r1", answers: ["3-2-1"] },
      { label: "r2", answers: ["6"] },
      { label: "r3", answers: ["[a]"] },
      { label: "r4", answers: ["-10"] },
      { label: "r5", answers: ["none"] }
    ],
    explain: "reverseOrder ordena 3, 2, 1 y joining pone el delimitador solo entre ellos. range(1, 5) excluye el 5, así que los valores pares son 2 y 4, que suman 6. partitioningBy pone \"a\" bajo false como una lista. reduce parte de la identidad 0 y resta cada elemento en orden: 0 - 1 - 2 - 3 - 4 = -10. filter vacía el Optional porque \"x\" no está vacío, así que map se omite y orElse devuelve none." },

  { id: "module-match", d: 7, type: "match", title: "Relaciona directivas de module-info con necesidades",
    prompt: "Una aplicación de tienda está dividida en módulos. Relaciona cada requisito con la directiva de module-info.java que lo cumple.",
    pairs: [
      ["Otros módulos deben compilar contra los tipos públicos de com.shop.api", "exports com.shop.api;"],
      ["Un ORM debe asignar campos privados de com.shop.model por reflexión en tiempo de ejecución, pero nadie debe compilar contra ese paquete", "opens com.shop.model;"],
      ["Cualquier módulo que lea este módulo también debe leer com.shop.util, porque los métodos de la API devuelven sus tipos", "requires transitive com.shop.util;"],
      ["Se necesita un módulo de anotaciones para compilar, pero puede faltar en tiempo de ejecución", "requires static com.shop.annotations;"],
      ["Este módulo carga implementaciones de TaxRule con ServiceLoader", "uses com.shop.spi.TaxRule;"],
      ["Este módulo proporciona la implementación EuTax de TaxRule", "provides com.shop.spi.TaxRule with com.shop.tax.EuTax;"]
    ],
    extra: ["requires com.shop.util;", "exports com.shop.model to com.fw.orm;"],
    explain: "exports da acceso a los tipos públicos en tiempo de compilación y de ejecución, mientras que opens da acceso por reflexión (incluidos los miembros privados) solo en tiempo de ejecución. requires transitive transmite la legibilidad a los módulos que leen a este; un requires simple no lo hace. requires static es una dependencia solo de tiempo de compilación. En los servicios, el consumidor declara uses y el proveedor declara provides ... with ...; un exports calificado sigue sin permitir la reflexión profunda sobre campos privados." },

  { id: "counter-select", d: 8, type: "select", title: "Corrige una condición de carrera con actualizaciones perdidas",
    prompt: "El conteo suele ser menor que el número de llamadas. Selecciona todos los cambios que hacen que la clase sea correctamente thread-safe por sí sola.",
    context: "class Stats {\n  private int processed;\n  void record() { processed++; }\n  int get() { return processed; }\n}\n// record() is called from 8 worker threads in a fixed thread pool;\n// after 1,000,000 calls, get() often returns something like 998,412",
    options: [
      "Declarar el campo como private volatile int processed",
      "Reemplazar el campo por un AtomicInteger y llamar a incrementAndGet() en record()",
      "Marcar tanto record() como get() como synchronized",
      "Reemplazar el campo por un LongAdder, llamar a increment() en record() y a sum() en get()",
      "Llamar a Thread.yield() dentro de record() después del incremento",
      "Proteger ambos métodos con el mismo ReentrantLock, llamando a unlock() en un bloque finally",
      "Ejecutar los workers en virtual threads en lugar del pool fijo",
      "Declarar el campo como private final int processed"
    ],
    answers: [1, 2, 3, 5],
    explain: "processed++ es una operación de lectura-modificación-escritura de tres pasos, así que dos hilos pueden leer el mismo valor y una actualización se pierde. Las clases atómicas, LongAdder, los métodos synchronized y un lock compartido hacen que la actualización sea atómica y publican el resultado. volatile solo garantiza visibilidad, no atomicidad, y yield o un tipo de hilo distinto solo cambian los tiempos. Un campo final no se puede incrementar en absoluto, así que esa versión no compila." },

  { id: "path-fill", d: 9, type: "fill", title: "Calcula resultados de Path de NIO.2",
    prompt: "En Linux, con Path p = Path.of(\"/app/logs/2026/../current/app.log\"), completa lo que imprime cada expresión.",
    fields: [
      { label: "p.getFileName()", answers: ["app.log"] },
      { label: "p.getNameCount()", answers: ["6"] },
      { label: "p.normalize()", answers: ["/app/logs/current/app.log"] },
      { label: "p.getParent().getFileName()", answers: ["current"] },
      { label: "Path.of(\"/app/logs\").relativize(Path.of(\"/app/conf/db.properties\"))", answers: ["../conf/db.properties"] },
      { label: "Path.of(\"/app\").resolve(\"/etc/hosts\")", answers: ["/etc/hosts"] }
    ],
    explain: "Los métodos de Path trabajan sobre el texto de la ruta y no tocan el sistema de archivos, así que .. cuenta como un nombre hasta que se llama a normalize(): app, logs, 2026, .., current, app.log son seis nombres. normalize() elimina 2026/.. y da /app/logs/current/app.log. relativize sube un nivel desde /app/logs hasta /app y luego baja a conf. resolve devuelve su argumento sin cambios cuando el argumento ya es una ruta absoluta." },

  { id: "bundle-order", d: 10, type: "order", title: "Ordena la búsqueda de resource bundles",
    prompt: "El locale predeterminado es fr_FR. El código llama a ResourceBundle.getBundle(\"Labels\", Locale.of(\"de\", \"CH\")) y solo existe Labels.properties. Ordena los nombres de bundle en el orden en que Java los busca.",
    steps: ["Labels_de_CH", "Labels_de", "Labels_fr_FR", "Labels_fr", "Labels"],
    explain: "Java primero prueba el locale solicitado, del más específico al menos específico (idioma más país, luego solo idioma). Cuando no encuentra nada más específico que el bundle base para ese locale, prueba el locale predeterminado de la misma manera antes de quedarse con el bundle base Labels. Una vez elegido un bundle, las claves que le faltan se buscan en sus padres, terminando en el bundle base." }
]);
