CertHub.addPbqs("java-se", [
  { id: "values-fill", d: 1, type: "fill", title: "Predict primitive and String values",
    prompt: "Each variable below is printed with System.out.println. Fill in exactly what is printed for each one.",
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
    explain: "0x1F is hex 31 and a leading 0 makes 010 octal 8. In c, 7 / 2 is int division (3) before the long multiply, giving 6. Math.floor(-1.5) rounds toward negative infinity and returns the double -2.0. strip() removes the outer spaces and repeat(2) gives \"!!\". For e, compound assignment saves the left value 10 first, then e++ yields 10 (e becomes 11) and ++e yields 12, so e = 10 + 22 = 32. ch += 2 has an implicit cast back to char, so 'A' becomes 'C'." },

  { id: "sealed-switch", d: 2, type: "select", title: "Which pattern switches compile?",
    prompt: "sh is a variable of type Shape. Each option is the body of `int k = switch (sh) { ... };`. Select every option that compiles.",
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
    explain: "A switch expression must be exhaustive: covering every permitted subtype of a sealed interface (option 1) or adding default (option 5) works, and case null is allowed as an extra label (option 7). Option 2 misses Rect. Options 3 and 6 put a pattern that matches everything first, so a later case is dominated and the compiler rejects it. A guarded record pattern before the unguarded Rect case (option 4) is fine. Option 8 mixes colon and arrow labels in one switch, which is never allowed." },

  { id: "init-order", d: 3, type: "order", title: "Order class and object initialization",
    prompt: "Neither class has been used yet when main runs `new Child();`. Put the blocks in the order they execute.",
    context: "class Parent {\n  static { System.out.print(\"PS \"); }\n  { System.out.print(\"PI \"); }\n  Parent() { System.out.print(\"PC \"); }\n}\nclass Child extends Parent {\n  static { System.out.print(\"CS \"); }\n  { System.out.print(\"CI \"); }\n  Child() { System.out.print(\"CC \"); }\n}",
    steps: [
      "Parent static initializer (PS)",
      "Child static initializer (CS)",
      "Parent instance initializer (PI)",
      "Parent constructor body (PC)",
      "Child instance initializer (CI)",
      "Child constructor body (CC)"
    ],
    explain: "Class initialization comes first and goes from superclass to subclass, so both static blocks run before any object is built. Then the Child constructor calls super() implicitly: Parent's instance initializers run, then Parent's constructor body. Only after super() returns do Child's instance initializers and constructor body run. The output is PS CS PI PC CI CC, and a second new Child() would print only PI PC CI CC." },

  { id: "poly-match", d: 3, type: "match", title: "Match expressions to polymorphic results",
    prompt: "Using the classes shown, match each expression to what it evaluates to.",
    context: "class Animal {\n  String name = \"animal\";\n  static String kind() { return \"A\"; }\n  String sound() { return \"...\"; }\n}\nclass Dog extends Animal {\n  String name = \"dog\";\n  static String kind() { return \"D\"; }\n  String sound() { return \"woof\"; }\n}\n// in main:\nAnimal a = new Dog();",
    pairs: [["a.name", "animal"], ["((Dog) a).name", "dog"], ["a.sound()", "woof"], ["a.kind()", "A"], ["Dog.kind()", "D"]],
    extra: ["...", "ClassCastException"],
    explain: "Only instance methods are polymorphic. a.sound() runs Dog's override because the object is a Dog. Fields are chosen by the reference type, so a.name reads Animal's field, and a cast to Dog reads Dog's hidden field. Static methods are hidden rather than overridden, so a.kind() uses the compile-time type Animal. The cast succeeds because the object really is a Dog." },

  { id: "twr-order", d: 4, type: "order", title: "Order try-with-resources events",
    prompt: "Put the printed lines in the order they appear when this code runs.",
    context: "class Res implements AutoCloseable {\n  final String n;\n  Res(String n) { this.n = n; System.out.println(\"open \" + n); }\n  public void close() { System.out.println(\"close \" + n); }\n}\n// in main:\ntry (Res a = new Res(\"A\"); Res b = new Res(\"B\")) {\n  System.out.println(\"body\");\n  throw new IllegalStateException(\"boom\");\n} catch (IllegalStateException e) {\n  System.out.println(\"catch \" + e.getMessage());\n} finally {\n  System.out.println(\"finally\");\n}",
    steps: ["open A", "open B", "body", "close B", "close A", "catch boom", "finally"],
    explain: "Resources are opened in declaration order and closed in reverse order. They are closed as soon as the try block ends, even when it ends with an exception, and that happens before any catch or finally block runs. The catch then handles the IllegalStateException, and finally always runs last." },

  { id: "collections-fill", d: 5, type: "fill", title: "Predict collection output",
    prompt: "Fill in exactly what each numbered println prints (use Java's normal toString format).",
    context: "List<Integer> list = new ArrayList<>(List.of(5, 3, 8, 3));\nlist.remove(Integer.valueOf(3));\nlist.remove(0);\n\nDeque<String> dq = new ArrayDeque<>();\ndq.push(\"a\");\ndq.push(\"b\");\ndq.offerLast(\"c\");\n\nMap<String, Integer> m = new TreeMap<>();\nm.put(\"b\", 2);\nm.put(\"a\", 1);\nm.putIfAbsent(\"a\", 9);\nm.merge(\"b\", 5, Integer::sum);\n\nTreeSet<String> ts = new TreeSet<>(List.of(\"pear\", \"Fig\", \"apple\"));\n\nSystem.out.println(list);                          // (1)\nSystem.out.println(dq.pollFirst() + dq.peekLast()); // (2)\nSystem.out.println(m);                             // (3)\nSystem.out.println(ts.first());                    // (4)",
    fields: [
      { label: "(1)", answers: ["[8, 3]", "[8,3]"] },
      { label: "(2)", answers: ["bc"] },
      { label: "(3)", answers: ["{a=1, b=7}", "{a=1,b=7}"] },
      { label: "(4)", answers: ["Fig"] }
    ],
    explain: "remove(Integer.valueOf(3)) removes the first matching value, giving [5, 8, 3], and remove(0) removes by index, leaving [8, 3]. push adds to the front, so the deque is [b, a, c]; pollFirst returns b and peekLast returns c. putIfAbsent keeps a=1, merge adds 5 to 2, and TreeMap prints keys in sorted order. TreeSet uses natural String order, where uppercase letters sort before lowercase, so Fig is first." },

  { id: "stream-match", d: 6, type: "match", title: "Match stream pipelines to results",
    prompt: "Given List<String> w = List.of(\"kiwi\", \"fig\", \"plum\", \"apple\", \"fig\"); match each expression to the value it prints.",
    pairs: [
      ["w.stream().distinct().count()", "4"],
      ["w.stream().collect(Collectors.groupingBy(String::length, Collectors.counting())).get(3)", "2"],
      ["w.stream().filter(s -> s.length() > 3).map(String::toUpperCase).findFirst().get()", "KIWI"],
      ["w.stream().anyMatch(s -> s.startsWith(\"p\"))", "true"],
      ["w.stream().mapToInt(String::length).max().getAsInt()", "5"],
      ["w.stream().sorted().skip(1).findFirst().get()", "fig"]
    ],
    extra: ["3", "false", "apple"],
    explain: "distinct() drops the second fig, leaving 4 elements. Grouping by length with counting() maps 3 to 2 because fig appears twice. The first word longer than 3 characters in encounter order is kiwi, which map turns into KIWI. plum starts with p, so anyMatch is true. apple is the longest word at 5 characters. Sorted order is apple, fig, fig, kiwi, plum, so skipping one leaves fig first." },

  { id: "stream-fill", d: 6, type: "fill", title: "Evaluate lambdas and collectors",
    prompt: "Fill in the value printed for each variable.",
    context: "var r1 = Stream.of(3, 1, 2).sorted(Comparator.reverseOrder())\n    .map(String::valueOf).collect(Collectors.joining(\"-\"));\nvar r2 = IntStream.range(1, 5).filter(i -> i % 2 == 0).sum();\nvar r3 = Stream.of(\"a\", \"bb\", \"cc\")\n    .collect(Collectors.partitioningBy(s -> s.length() > 1)).get(false);\nvar r4 = Stream.of(1, 2, 3, 4).reduce(0, (x, y) -> x - y);\nvar r5 = Optional.of(\"x\").filter(String::isEmpty)\n    .map(String::toUpperCase).orElse(\"none\");",
    fields: [
      { label: "r1", answers: ["3-2-1"] },
      { label: "r2", answers: ["6"] },
      { label: "r3", answers: ["[a]"] },
      { label: "r4", answers: ["-10"] },
      { label: "r5", answers: ["none"] }
    ],
    explain: "reverseOrder sorts 3, 2, 1 and joining puts only the delimiter between them. range(1, 5) excludes 5, so the even values are 2 and 4, totalling 6. partitioningBy puts \"a\" under false as a list. reduce starts from the identity 0 and subtracts each element in order: 0 - 1 - 2 - 3 - 4 = -10. filter empties the Optional because \"x\" is not empty, so map is skipped and orElse returns none." },

  { id: "module-match", d: 7, type: "match", title: "Match module-info directives to needs",
    prompt: "A shop application is split into modules. Match each requirement to the module-info.java directive that meets it.",
    pairs: [
      ["Other modules must compile against the public types in com.shop.api", "exports com.shop.api;"],
      ["An ORM must set private fields in com.shop.model by reflection at runtime, but nobody should compile against it", "opens com.shop.model;"],
      ["Any module that reads this module must also read com.shop.util, because API methods return its types", "requires transitive com.shop.util;"],
      ["An annotations module is needed to compile but may be missing at runtime", "requires static com.shop.annotations;"],
      ["This module loads TaxRule implementations with ServiceLoader", "uses com.shop.spi.TaxRule;"],
      ["This module supplies the EuTax implementation of TaxRule", "provides com.shop.spi.TaxRule with com.shop.tax.EuTax;"]
    ],
    extra: ["requires com.shop.util;", "exports com.shop.model to com.fw.orm;"],
    explain: "exports gives compile-time and runtime access to public types, while opens gives reflective access (including private members) only at runtime. requires transitive passes readability on to modules that read this one; a plain requires does not. requires static is a compile-time-only dependency. For services, the consumer declares uses and the provider declares provides ... with ...; a qualified exports still does not allow deep reflection on private fields." },

  { id: "counter-select", d: 8, type: "select", title: "Fix a lost-update race",
    prompt: "The count is often lower than the number of calls. Select every change that makes the class correctly thread-safe on its own.",
    context: "class Stats {\n  private int processed;\n  void record() { processed++; }\n  int get() { return processed; }\n}\n// record() is called from 8 worker threads in a fixed thread pool;\n// after 1,000,000 calls, get() often returns something like 998,412",
    options: [
      "Declare the field as private volatile int processed",
      "Replace the field with an AtomicInteger and call incrementAndGet() in record()",
      "Mark both record() and get() as synchronized",
      "Replace the field with a LongAdder, call increment() in record() and sum() in get()",
      "Call Thread.yield() inside record() after the increment",
      "Guard both methods with the same ReentrantLock, calling unlock() in a finally block",
      "Run the workers on virtual threads instead of the fixed pool",
      "Declare the field as private final int processed"
    ],
    answers: [1, 2, 3, 5],
    explain: "processed++ is a read-modify-write of three steps, so two threads can read the same value and one update is lost. Atomic classes, LongAdder, synchronized methods and a shared lock all make the update atomic and publish the result. volatile only guarantees visibility, not atomicity, and yield or a different thread type just changes the timing. A final field cannot be incremented at all, so that version does not compile." },

  { id: "path-fill", d: 9, type: "fill", title: "Work out NIO.2 Path results",
    prompt: "On Linux, with Path p = Path.of(\"/app/logs/2026/../current/app.log\"), fill in what each expression prints.",
    fields: [
      { label: "p.getFileName()", answers: ["app.log"] },
      { label: "p.getNameCount()", answers: ["6"] },
      { label: "p.normalize()", answers: ["/app/logs/current/app.log"] },
      { label: "p.getParent().getFileName()", answers: ["current"] },
      { label: "Path.of(\"/app/logs\").relativize(Path.of(\"/app/conf/db.properties\"))", answers: ["../conf/db.properties"] },
      { label: "Path.of(\"/app\").resolve(\"/etc/hosts\")", answers: ["/etc/hosts"] }
    ],
    explain: "Path methods work on the text of the path and do not touch the file system, so .. counts as a name until normalize() is called: app, logs, 2026, .., current, app.log is six names. normalize() removes 2026/.. to give /app/logs/current/app.log. relativize goes up one level from /app/logs to /app and then down into conf. resolve returns its argument unchanged when the argument is already an absolute path." },

  { id: "bundle-order", d: 10, type: "order", title: "Order resource bundle lookup",
    prompt: "The default locale is fr_FR. The code calls ResourceBundle.getBundle(\"Labels\", Locale.of(\"de\", \"CH\")) and only Labels.properties exists. Put the bundle names in the order Java looks for them.",
    steps: ["Labels_de_CH", "Labels_de", "Labels_fr_FR", "Labels_fr", "Labels"],
    explain: "Java first tries the requested locale from most to least specific (language plus country, then language alone). When nothing more specific than the base bundle is found for it, it tries the default locale the same way before settling on the base bundle Labels. Once a bundle is chosen, keys missing from it are looked up in its parents, ending at the base bundle." }
]);
