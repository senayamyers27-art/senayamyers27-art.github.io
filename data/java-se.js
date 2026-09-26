/* Oracle Certified Professional: Java SE 25 Developer, exam 1Z0-831 — generated plan (no hand-written weeks). */
CertHub.register({
  id: "java-se",
  vendor: "Oracle",
  name: "Oracle Certified Professional: Java SE Developer",
  short: "OCP Java",
  exam: "1Z0-831 (Java SE 25)",
  blurb: "Professional-level Java certification covering the core language, OOP, exceptions, collections, streams, modules, concurrency, I/O and localization on Java SE 25, for working Java developers.",
  status: "check",
  statusNote: "1Z0-831 (Java SE 25 Developer Professional, released May 2026) is the newest Java SE Professional exam; it replaces 1Z0-830 (Java SE 21) as the current target. On Sept 24, 2026 the Oracle exam page could not be opened from this environment, so the exam code, the ten topic groups, 50 questions, 120 minutes and 68% passing score were confirmed only through search results pointing to education.oracle.com. Oracle publishes no domain weights: the weights here are estimates based on how many objectives each topic group has and on published candidate reports. Re-check the topics on the official exam page.",
  lastVerified: "2026-09-24",
  notices: [],
  examInfo: { questions: "50 multiple choice", minutes: 120, pass: "68%" },
  examSim: { questions: 50, minutes: 120 },
  sources: [
    { label: "Oracle: Java SE 25 Developer Professional exam 1Z0-831", url: "https://education.oracle.com/java-se-25-developer-professional/pexam_1Z0-831" },
    { label: "Oracle: Oracle Certified Professional: Java SE 25 Developer track", url: "https://education.oracle.com/products/trackp_JSE25OCP" },
    { label: "Oracle: Java SE 25 API documentation", url: "https://docs.oracle.com/en/java/javase/25/docs/api/index.html" }
  ],
  planWeeks: 12,
  hoursPerWeek: "7–9",

  domains: [
    {
      id: 1,
      name: "Handling date, time, text, numeric and boolean values",
      w: 12,
      topics: [
        "Primitive types, literals (underscores, binary/hex/octal), default values",
        "Wrapper classes, autoboxing/unboxing and Integer caching with ==",
        "Operator precedence, increment/decrement, compound assignment with implicit casts",
        "Widening and narrowing conversions, casting and numeric promotion rules",
        "Math API: round, floor, ceil, abs, max/min, pow",
        "String immutability and key methods: substring, indexOf, charAt, strip, repeat, isBlank",
        "StringBuilder methods: append, insert, reverse, delete, replace",
        "Text blocks: incidental whitespace, \\ line continuation, \\s escape",
        "Date-Time API: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant",
        "Period vs Duration and daylight saving time transitions"
      ],
      notes: ["Topic group: Handling Date, Time, Text, Numeric and Boolean Values"],
      labs: [
        "Install a free JDK 25 (e.g. Eclipse Temurin or Oracle OpenJDK) and use `jshell` to test operator precedence and x++ vs ++x on ten expressions you write yourself, predicting each result first.",
        "In VS Code (Extension Pack for Java) or IntelliJ IDEA Community, write a program that builds a string with StringBuilder, then with a text block, and print both with brackets around them to see the whitespace.",
        "Create a ZonedDateTime for 01:30 on a DST change day in America/New_York and compare plusDays(1), plusHours(24) and plus(Duration.ofDays(1))."
      ]
    },
    {
      id: 2,
      name: "Controlling program flow",
      w: 8,
      topics: [
        "if/else and the ternary operator",
        "Classic switch statements, fall-through and break",
        "Switch expressions with arrow labels, multiple labels and yield",
        "Pattern matching in switch: type patterns, record patterns and when guards",
        "Case dominance and exhaustiveness (enums, sealed types, default)",
        "while, do-while, for and enhanced for loops",
        "break and continue, including labeled statements",
        "Unreachable code and definite assignment compile errors"
      ],
      notes: ["Topic group: Controlling Program Flow"],
      labs: [
        "Rewrite a classic fall-through switch as a switch expression and confirm the output is the same using `java Flow.java` (single-file launch, no build tool needed).",
        "Write nested loops with labeled break and continue, predict the output on paper, then run it in jshell.",
        "Write a pattern-matching switch over Object with a `when` guard, then swap the case order and read the dominance compile error."
      ]
    },
    {
      id: 3,
      name: "Using object-oriented concepts in Java",
      w: 20,
      topics: [
        "Classes, fields, methods, constructors, initializer blocks and initialization order",
        "Flexible constructor bodies (Java 25): statements before super(...) or this(...)",
        "Inheritance, overriding vs overloading vs hiding, polymorphism and casting",
        "Abstract classes and interfaces: default, static and private interface methods",
        "Records: components, canonical and compact constructors, accessors, equals/toString",
        "Sealed classes and interfaces: permits, final, sealed and non-sealed subclasses",
        "Enums with fields, constructors, methods and values()/valueOf()/ordinal()",
        "Nested, inner, local and anonymous classes",
        "instanceof pattern matching and flow scoping",
        "Encapsulation, immutable objects and var local type inference",
        "Object lifecycle and garbage collection eligibility"
      ],
      notes: ["Topic group: Using Object-Oriented Concepts in Java"],
      labs: [
        "Model a small shape hierarchy with a sealed interface and records, then write an exhaustive switch with record patterns and add a new shape to see the compile error.",
        "With JDK 25, write a subclass constructor that validates its argument before calling super(...), and try calling an instance method there to read the error message.",
        "Write a class with static and instance initializers, constructors and fields that print as they run; predict the order for two `new` calls, then run it."
      ]
    },
    {
      id: 4,
      name: "Handling exceptions",
      w: 8,
      topics: [
        "Checked vs unchecked exceptions and the Throwable hierarchy",
        "try/catch/finally flow, including return in try and finally",
        "Multi-catch rules: no related types; the catch variable is effectively final",
        "Catch block ordering and unreachable catch compile errors",
        "try-with-resources, AutoCloseable and reverse close order",
        "Suppressed exceptions and Throwable.getSuppressed()",
        "Declaring exceptions with throws and overriding rules",
        "Creating custom checked and unchecked exceptions"
      ],
      notes: ["Topic group: Handling Exceptions"],
      labs: [
        "Write two AutoCloseable classes that print when closed and throw from close(); use them in try-with-resources and print getSuppressed().",
        "Write a method with return statements in both try and finally, predict the result and run it.",
        "Create a custom checked exception and an unchecked one, and write overriding methods that try to widen the throws clause to see what the compiler rejects."
      ]
    },
    {
      id: 5,
      name: "Working with arrays and collections",
      w: 10,
      topics: [
        "Declaring, creating and copying arrays; Arrays.sort, binarySearch, compare, mismatch",
        "List, Set, Map, Queue and Deque interfaces and their main implementations",
        "Unmodifiable collections: List.of, Set.of, Map.of and Arrays.asList behavior",
        "Sequenced collections: getFirst, getLast, addFirst, reversed",
        "Map methods: merge, computeIfAbsent, getOrDefault, putIfAbsent",
        "Sorting with Comparable and Comparator (comparing, thenComparing, reversed)",
        "TreeSet and TreeMap natural ordering",
        "Generics: type parameters, bounded types and wildcards (? extends, ? super)",
        "List.remove(int) vs remove(Object) with Integer lists"
      ],
      notes: ["Topic group: Working with Arrays and Collections"],
      labs: [
        "In jshell, try add, set and remove on List.of(...), Arrays.asList(...) and new ArrayList<>(...), and record which throw UnsupportedOperationException.",
        "Build a word-frequency counter with Map.merge, then sort the entries by count descending and word ascending with a Comparator chain.",
        "Use ArrayDeque as both a stack (push/pop) and a queue (offer/poll), and print it after each step."
      ]
    },
    {
      id: 6,
      name: "Working with streams and lambda expressions",
      w: 16,
      topics: [
        "Functional interfaces in java.util.function: Supplier, Consumer, Function, Predicate, UnaryOperator, BinaryOperator",
        "Lambda syntax, method references and effectively final variables",
        "Creating streams: collections, Stream.of, IntStream.range/rangeClosed, Stream.iterate",
        "Intermediate operations and lazy evaluation: filter, map, flatMap, peek, sorted, distinct, limit",
        "Terminal operations: forEach, reduce, collect, count, findFirst, anyMatch, toList",
        "Collectors: groupingBy, partitioningBy, counting, joining, toMap and merge functions",
        "Primitive streams and summary statistics",
        "Optional: of, ofNullable, map, orElse, orElseGet, orElseThrow",
        "Stream Gatherers (Java 24+): gather() with Gatherers.windowFixed, windowSliding, fold, scan",
        "Parallel streams and why stateful lambdas cause problems"
      ],
      notes: ["Topic group: Working with Streams and Lambda expressions"],
      labs: [
        "Add peek() calls to a stream pipeline ending in findFirst() and observe which elements are processed, then remove the terminal operation and run it again.",
        "Load a small CSV of your own (e.g. name,dept,salary) with Files.lines and use groupingBy with averagingDouble and counting to summarise it.",
        "With JDK 25, use Gatherers.windowFixed and Gatherers.windowSliding on Stream.of(1..10) and compare the output."
      ]
    },
    {
      id: 7,
      name: "Packaging and deploying Java code",
      w: 7,
      topics: [
        "module-info.java: module, requires, requires transitive, exports, opens",
        "Services: uses, provides ... with, and ServiceLoader",
        "Module path vs class path, named, automatic and unnamed modules",
        "Compiling and running modules with javac --module-path and java --module",
        "Module import declarations (Java 25): import module and ambiguity rules",
        "Compact source files and instance main methods (Java 25), java.lang.IO",
        "Launching single-file and multi-file source programs with the java launcher",
        "JDK tools: jar, jdeps, jlink"
      ],
      notes: ["Topic group: Packaging and Deploying Java Code"],
      labs: [
        "Create two modules (com.app and com.util) with module-info.java files, compile them with `javac -d out --module-source-path src -m com.app` and run with `java --module-path out -m com.app/com.app.Main`.",
        "Write a compact source file with only `void main()` that uses IO.println and List without imports, and run it with `java Hello.java` on JDK 25.",
        "Use `jdeps --list-deps` on your app and then `jlink` to build a trimmed runtime image; compare its size with the full JDK."
      ]
    },
    {
      id: 8,
      name: "Managing concurrent code execution",
      w: 9,
      topics: [
        "Creating threads with Runnable, Thread, and the Thread.Builder API",
        "Platform threads vs virtual threads; Executors.newVirtualThreadPerTaskExecutor()",
        "ExecutorService, Callable and Future; shutdown, awaitTermination, close()",
        "Thread lifecycle and start() vs run()",
        "Race conditions, synchronized blocks and methods, and visibility",
        "Atomic classes (AtomicInteger, AtomicLong) and locks (ReentrantLock, tryLock)",
        "Concurrent collections: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue",
        "Deadlock, starvation and livelock",
        "Scoped values (Java 25): ScopedValue.where(...).run(...) as an alternative to ThreadLocal"
      ],
      notes: ["Topic group: Managing Concurrent Code Execution"],
      labs: [
        "Increment a plain int from 1,000 virtual threads and print the (wrong) total, then fix it with AtomicInteger and again with synchronized.",
        "Submit 10,000 tasks that each Thread.sleep(100) to a fixed pool of 10 platform threads and to a virtual-thread executor; time both.",
        "Replace a ThreadLocal holding a request ID with a ScopedValue and show that the value is not visible after run() returns."
      ]
    },
    {
      id: 9,
      name: "Using the Java I/O API",
      w: 6,
      topics: [
        "Path creation and operations: resolve, relativize, normalize, getFileName, getParent",
        "Files methods: exists, createDirectory vs createDirectories, copy, move, delete",
        "Reading and writing text with Files.readAllLines, Files.lines, Files.writeString",
        "Walking file trees: Files.list vs Files.walk vs Files.find",
        "Byte and character streams, BufferedReader and BufferedWriter",
        "Console and standard input/output",
        "Serialization: Serializable, transient fields, serialVersionUID",
        "Closing resources and stream-returning Files methods"
      ],
      notes: ["Topic group: Using Java I/O API"],
      labs: [
        "In jshell, experiment with Path.of(...).resolve, relativize and normalize on relative and absolute paths and write down the rules you notice.",
        "Write a program that walks a project folder with Files.walk and prints the 10 largest .java files, closing the stream with try-with-resources.",
        "Serialize an object with a transient field to a file with ObjectOutputStream, read it back and print the field values."
      ]
    },
    {
      id: 10,
      name: "Implementing localization",
      w: 4,
      topics: [
        "Locale objects: language, country, Locale.of and Locale.getDefault",
        "Resource bundles: properties files, naming and lookup/fallback order",
        "Formatting numbers and currency with NumberFormat",
        "Compact number formatting (CompactNumberFormat)",
        "Formatting and parsing dates and times with DateTimeFormatter and locales",
        "Message formatting with MessageFormat"
      ],
      notes: ["Topic group: Implementing Localization"],
      labs: [
        "Create Messages.properties, Messages_fr.properties and Messages_fr_CA.properties with overlapping keys and print which value each locale gets.",
        "Format 1234567.891 as number, currency and compact number for Locale.US, Locale.GERMANY and Locale.JAPAN.",
        "Format today's date with DateTimeFormatter.ofPattern(\"EEEE d MMMM yyyy\") in three locales."
      ]
    }
  ],

  study: {
    "1": [
      ["Why does `byte b = 10; b = b * 2;` fail to compile while `b *= 2;` compiles?", "b * 2 is promoted to int, and assigning an int to a byte needs an explicit cast. Compound assignment operators include an implicit cast back to the left-hand type."],
      ["What does `Integer a = 127, b = 127; a == b` return, and why is this risky?", "true, because Integer.valueOf caches -128 to 127 by default. Outside that range == compares different objects and is usually false, so use equals() for wrappers."],
      ["How is a String different from a StringBuilder?", "String is immutable: methods like concat or toUpperCase return a new String. StringBuilder is mutable and its methods change the same object and return it for chaining."],
      ["What does a backslash at the end of a line in a text block do?", "It is a line continuation: the newline is removed and the next line is joined, after incidental whitespace is stripped."],
      ["When should you use Period rather than Duration?", "Period holds date-based amounts (years, months, days) and respects calendar and DST rules; Duration holds exact seconds and nanoseconds."]
    ],
    "2": [
      ["What is the difference between a switch statement and a switch expression?", "A switch expression produces a value, must be exhaustive and uses -> or yield; arrow labels never fall through. A classic statement with colons falls through until break."],
      ["What does `yield` do?", "It returns a value from a block inside a switch expression case."],
      ["What is case dominance?", "A case label is dominated if an earlier label matches every value it would match, such as `case Integer i` before `case Integer i when i > 0`. It is a compile error."],
      ["When does a switch over a sealed interface not need a default?", "When the cases cover every permitted subtype, so the compiler can prove it is exhaustive."],
      ["What does `continue outer;` do in nested loops?", "It ends the current inner iteration and continues with the next iteration of the loop labeled outer."]
    ],
    "3": [
      ["What can go before super(...) in a Java 25 constructor?", "Statements that do not use the object being built: argument checks, local variables and assignments to fields that have no initializer. Reading fields or calling instance methods of this is not allowed."],
      ["What does a record generate for you?", "Private final fields, a canonical constructor, public accessors named after the components, and equals, hashCode and toString based on the components."],
      ["What must a permitted subclass of a sealed type be declared as?", "final, sealed or non-sealed (records and enums are implicitly final)."],
      ["Which is resolved at runtime: overridden instance methods, fields or static methods?", "Only overridden instance methods. Fields and static methods are chosen by the reference's compile-time type (hiding)."],
      ["How do you call a specific interface's default method when two conflict?", "Override the method and call InterfaceName.super.method()."],
      ["When is an object eligible for garbage collection?", "When no live thread can reach it through any chain of references. System.gc() only requests a collection."]
    ],
    "4": [
      ["What is the difference between checked and unchecked exceptions?", "Checked exceptions (Exception but not RuntimeException) must be caught or declared. Unchecked exceptions (RuntimeException and Error) need not be."],
      ["In what order are try-with-resources resources closed?", "In the reverse order of declaration, before any catch or finally block runs."],
      ["What happens if both the try body and close() throw?", "The body's exception is thrown, and the close() exception is added to it as a suppressed exception."],
      ["Why can't you write `catch (FileNotFoundException | IOException e)`?", "Alternatives in a multi-catch cannot be subclasses of each other; catching IOException already covers FileNotFoundException."],
      ["What rule applies to throws clauses when overriding?", "The overriding method may throw fewer or narrower checked exceptions but not new or broader ones. Unchecked exceptions are unrestricted."]
    ],
    "5": [
      ["How does Arrays.asList differ from List.of?", "Arrays.asList is a fixed-size view of the array: set works and writes through to the array, but add and remove throw. List.of is fully unmodifiable and rejects nulls."],
      ["What does List<? extends Number> let you do?", "Read elements as Number, but not add anything except null, because the actual element type is unknown."],
      ["What does Map.merge(key, 1, Integer::sum) do?", "Puts 1 if the key is absent, otherwise replaces the value with oldValue + 1."],
      ["What do the Java 21 sequenced collection methods add?", "getFirst, getLast, addFirst, addLast, removeFirst, removeLast and reversed() on ordered collections like List, Deque and LinkedHashSet."],
      ["How is a TreeSet of Strings ordered?", "By natural (Unicode) order, so uppercase letters sort before lowercase, unless you supply a Comparator."]
    ],
    "6": [
      ["Why does a stream with no terminal operation do nothing?", "Intermediate operations are lazy; processing only starts when a terminal operation runs."],
      ["What is the difference between map and flatMap?", "map turns each element into one result; flatMap turns each element into a stream and joins those streams into one."],
      ["What happens with Collectors.toMap when two elements have the same key?", "It throws IllegalStateException unless you give a merge function as the third argument."],
      ["Why must local variables used in a lambda be effectively final?", "The lambda captures their value, so the compiler forbids changes that would make the captured copy and the variable disagree."],
      ["What are Stream Gatherers?", "Custom intermediate operations used with Stream.gather(), finalised in Java 24. Gatherers provides built-ins such as windowFixed, windowSliding, fold and scan."],
      ["Can a stream be reused after a terminal operation?", "No. A second terminal operation throws IllegalStateException."]
    ],
    "7": [
      ["What is the difference between exports and opens?", "exports gives compile-time and runtime access to public types; opens gives runtime reflective access to all members, including private ones, for frameworks."],
      ["What does requires transitive do?", "Modules that read your module also automatically read the transitive dependency."],
      ["How do modules declare and use services?", "The provider module says `provides Service with Impl;`, the consumer says `uses Service;` and loads implementations with ServiceLoader.load(Service.class)."],
      ["What does `import module java.base;` do?", "It imports all public top-level types in all packages that java.base exports, in one declaration (Java 25)."],
      ["What is a compact source file?", "A source file with methods and fields outside any class declaration, such as `void main()`. It declares an implicit final class and automatically imports module java.base."]
    ],
    "8": [
      ["When should you use virtual threads?", "For large numbers of tasks that spend most of their time blocked on I/O. They do not speed up CPU-bound work."],
      ["What is the difference between Runnable and Callable?", "Callable returns a value and can throw checked exceptions; Runnable returns nothing and cannot throw checked exceptions."],
      ["What happens if you call run() instead of start()?", "The code runs in the calling thread; no new thread is started."],
      ["Why is count++ not thread-safe?", "It is a read-modify-write sequence, so concurrent threads can lose updates. Use AtomicInteger, synchronized or a lock."],
      ["How is a ScopedValue different from a ThreadLocal?", "A ScopedValue is immutable, bound only for the duration of a run/call, and cheap to share with child virtual threads; it has no set() method."]
    ],
    "9": [
      ["What does Path.normalize() do?", "Removes redundant . and name/.. elements from the path without touching the file system."],
      ["What is the difference between Files.list and Files.walk?", "list returns only direct children of a directory; walk goes recursively through the whole tree (optionally to a max depth)."],
      ["Why should Files.lines be used in try-with-resources?", "It keeps the file open until the stream is closed."],
      ["What happens to a transient field when an object is deserialized?", "It is not serialized, so it gets its type's default value (null, 0, false) unless restored by custom code."],
      ["When does Files.createDirectory fail where createDirectories succeeds?", "When a parent directory does not exist; createDirectories creates missing parents."]
    ],
    "10": [
      ["In what order does ResourceBundle search?", "Requested locale (language_country, then language), then the default locale's candidates, then the base bundle. Keys missing from a found bundle are taken from its parent bundles."],
      ["How do you get a currency formatter for Germany?", "NumberFormat.getCurrencyInstance(Locale.GERMANY)."],
      ["What does CompactNumberFormat do?", "Formats numbers in short forms such as 1K or 1M (SHORT) or 1 thousand (LONG), according to the locale."],
      ["Why pass a Locale to DateTimeFormatter.ofPattern?", "Month and day names depend on the locale; without one the default locale is used, which varies by machine."]
    ]
  },

  questions: [
    ["js1",0,1,"What is the output?\nString s = \"Java\";\ns.concat(\" SE\");\ns = s + 25;\nSystem.out.println(s);",["Java SE25","Java25","Java SE 25","It does not compile"],1,"Strings are immutable and the result of concat() is thrown away, so s is still \"Java\" before 25 is appended. Java SE25 would need s = s.concat(\" SE\").","Handling values: String"],
    ["js2",0,1,"What is the output?\nint x = 5;\nint y = x++ + ++x;\nSystem.out.println(x + \" \" + y);",["6 11","7 11","6 12","7 12"],3,"x++ gives 5 and makes x 6; ++x makes x 7 and gives 7, so y = 12 and x = 7. 7 11 comes from treating ++x as 6.","Handling values: operators"],
    ["js3",0,1,"What is the output?\nStringBuilder sb = new StringBuilder(\"abc\");\nsb.append(\"de\").reverse().insert(1, \"-\");\nSystem.out.println(sb);",["e-dcba","-edcba","ed-cba","abcde-"],0,"append makes abcde, reverse makes edcba, and insert(1, \"-\") puts the dash after the first character. All three calls change the same StringBuilder, unlike String.","Handling values: StringBuilder"],
    ["js4",0,1,"What does this print (brackets included)?\nString t = \"\"\"\n    Hi \\\n    there\"\"\";\nSystem.out.println(\"[\" + t + \"]\");",["[Hi\nthere]","[    Hi there]","[Hi there]","[Hi \\ there]"],2,"The backslash at the end of the line joins the next line, and incidental indentation is stripped, leaving \"Hi there\". It is not a newline, and the shared leading spaces are removed.","Handling values: text blocks"],
    ["js5",0,1,"What is the output?\nLocalDate d = LocalDate.of(2024, 1, 31);\nSystem.out.println(d.plusMonths(1));",["2024-03-02","2024-02-29","2024-03-01","A DateTimeException is thrown"],1,"plusMonths clamps to the last valid day of the target month, and 2024 is a leap year, so it is Feb 29. It does not roll over into March and does not throw.","Handling values: Date-Time API"],
    ["js6",0,1,"A scheduler stores a ZonedDateTime and must run a job at 09:00 local time every day, including the days when daylight saving time starts or ends. How should it compute the next run?",["next = current.plusDays(1)","next = current.plusHours(24)","next = current.plus(Duration.ofHours(24))","next = current.plusSeconds(86_400)"],0,"plusDays adds a calendar day and keeps the local time of 09:00 across a DST change. Adding 24 hours of exact time (plusHours or a Duration) lands at 08:00 or 10:00 on a transition day.","Handling values: Date-Time API"],
    ["js7",0,1,"Which line fails to compile?\nbyte b = 10;\nb += 5;      // line 2\nb = b * 2;   // line 3\nshort s = b; // line 4",["Line 2","Line 3","Line 4","All of them compile"],1,"b * 2 is promoted to int, which cannot be assigned to a byte without a cast. Line 2 compiles because compound assignment includes an implicit cast, and line 4 is a widening conversion.","Handling values: casting"],
    ["js8",0,1,"With default JVM settings, what is the output?\nInteger a = 127, b = 127;\nInteger c = 128, d = 128;\nSystem.out.println((a == b) + \" \" + (c == d));",["true true","false false","false true","true false"],3,"Autoboxing uses Integer.valueOf, which caches -128 to 127, so a and b are the same object while c and d are separate objects. Compare wrapper values with equals().","Handling values: wrapper classes"],
    ["js9",0,1,"What is the output?\nSystem.out.println(Math.round(-2.5) + \" \" + Math.round(2.5));",["-3 3","-3 2","-2 2","-2 3"],3,"Math.round adds 0.5 and takes the floor, so -2.5 becomes -2 and 2.5 becomes 3. It does not round half away from zero, which would give -3.","Handling values: Math API"],
    ["js10",0,1,"What is the output?\nSystem.out.println('a' + 'b' + \"c\");",["abc","195c","ab99","It does not compile"],1,"Evaluation is left to right: 'a' + 'b' is char arithmetic promoted to int (97 + 98 = 195), then string concatenation adds \"c\". abc would need a String operand first.","Handling values: numeric promotion"],
    ["js11",0,1,"What is the output?\nString s = \"hello\";\nSystem.out.println(s.substring(1, 3) + s.indexOf('l') + s.charAt(4));",["ell3o","ell2o","el3o","el2o"],3,"substring(1, 3) returns characters 1 and 2 (\"el\"), the first 'l' is at index 2, and charAt(4) is 'o'. The end index of substring is exclusive, so it is not \"ell\".","Handling values: String"],

    ["js12",0,2,"What is the output?\nObject o = 42;\nString r = switch (o) {\n  case Integer i when i > 40 -> \"big\";\n  case Integer i -> \"int\";\n  default -> \"other\";\n};\nSystem.out.println(r);",["int","other","It does not compile","big"],3,"The guarded case is checked first and 42 > 40, so \"big\" is returned. The order is legal because the guarded label comes before the unguarded one.","Program flow: pattern switch"],
    ["js13",0,2,"A developer reorders a pattern switch so that `case Integer i -> \"int\";` comes before `case Integer i when i > 40 -> \"big\";`. What happens?",["Compilation fails because the guarded case is dominated","It compiles and \"big\" can never be returned","It compiles, but a warning says the second case is unused","A MatchException is thrown at runtime"],0,"An unguarded type pattern matches every value the later guarded pattern would, so the later label is dominated and the compiler reports an error. It is not just a warning.","Program flow: pattern switch"],
    ["js14",0,2,"What is the output?\nint n = 2;\nswitch (n) {\n  case 1: System.out.print(\"A\");\n  case 2: System.out.print(\"B\");\n  case 3: System.out.print(\"C\"); break;\n  default: System.out.print(\"D\");\n}",["B","BCD","BC","ABC"],2,"Execution starts at case 2 and falls through into case 3 until the break. default is not reached because of that break.","Program flow: switch statement"],
    ["js15",0,2,"What is the output?\nouter:\nfor (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 3; j++) {\n    if (j == 2) continue outer;\n    if (i == 2) break outer;\n    System.out.print(i + \"\" + j + \" \");\n  }\n}",["00 01 10 11 20 21 ","00 01 10 11 ","00 01 02 10 11 12 ","00 01 "],1,"For i = 0 and i = 1, j prints 0 and 1 and then continue outer skips j = 2. When i = 2, break outer ends both loops before anything prints.","Program flow: labeled break and continue"],
    ["js16",0,2,"An enum Level has constants LOW, MEDIUM and HIGH. A switch expression over a Level variable has cases for all three and no default. What is true?",["It needs a default label or it will not compile","It compiles; if a new constant is added later, the switch no longer compiles until updated","It compiles only when written as a statement, not an expression","It compiles, and new constants fall through to the last case"],1,"A switch expression over an enum is exhaustive when every constant is covered, so no default is required. Adding a constant makes it non-exhaustive and the compiler flags it.","Program flow: switch expressions"],
    ["js17",0,2,"What is the output?\nint i = 10;\ndo {\n  i++;\n} while (i < 5);\nSystem.out.println(i);",["10","11","5","The loop never ends"],1,"A do-while body always runs at least once, so i becomes 11 before the condition is checked and found false. A while loop would leave i at 10.","Program flow: loops"],
    ["js18",0,2,"What is the output?\nint day = 3;\nString s = switch (day) {\n  case 1, 7 -> \"weekend\";\n  default -> {\n    String t = \"weekday\";\n    yield t.toUpperCase();\n  }\n};\nSystem.out.println(s);",["weekday","It does not compile because of yield","weekend","WEEKDAY"],3,"3 matches default, whose block returns a value with yield. yield is how a block in a switch expression returns a value; return is not allowed there.","Program flow: switch expressions"],

    ["js19",0,3,"Given `record Point(int x, int y) {}`, which statement is true?",["It has a no-argument constructor and setters for x and y","equals() compares object identity unless you override it","It can extend another class that defines x and y","Its fields are private and final, and p.x() returns the x component"],3,"Records get private final fields, a canonical constructor and accessors named after the components, plus equals, hashCode and toString based on the components. Records are implicitly final and cannot extend classes.","OO: records"],
    ["js20",0,3,"What is the output?\nclass A { String name = \"A\"; String get() { return name; } }\nclass B extends A { String name = \"B\"; String get() { return name; } }\n// in main:\nA a = new B();\nSystem.out.println(a.name + a.get());",["AA","BB","BA","AB"],3,"Fields are not polymorphic: a.name uses the reference type A. get() is overridden, so the call runs B's version, which returns B's field.","OO: polymorphism"],
    ["js21",0,3,"What is the output?\nclass P { static String id() { return \"P\"; } }\nclass C extends P { static String id() { return \"C\"; } }\n// in main:\nP p = new C();\nSystem.out.println(p.id());",["P","C","It does not compile","PC"],0,"Static methods are hidden, not overridden, so the call is chosen from the reference's compile-time type P. Calling a static method through a reference compiles, with at most a warning.","OO: method hiding"],
    ["js22",0,3,"On Java 25, what is the output of `new Sub(3);`?\nclass Base { Base(int v) { System.out.print(\"Base\" + v + \" \"); } }\nclass Sub extends Base {\n  Sub(int v) {\n    if (v < 0) throw new IllegalArgumentException();\n    System.out.print(\"check \");\n    super(v * 2);\n    System.out.print(\"Sub\");\n  }\n}",["Base6 check Sub","It does not compile: super() must be the first statement","check Base6 Sub","check Base3 Sub"],2,"Java 25 flexible constructor bodies allow statements before super(...) if they do not use the object under construction. The prologue runs first, then Base with 6, then the rest of the body.","OO: flexible constructor bodies"],
    ["js23",0,3,"In a Java 25 subclass constructor, which statement is NOT allowed before the explicit super(...) call?",["A local variable declaration that computes the argument","An if statement that throws for a bad argument","A call to an instance method, such as this.validate(v)","Assigning a parameter to a field that has no initializer"],2,"Code before super(...) cannot use the instance being built, so calling an instance method is rejected. Local variables, argument checks and assigning fields without initializers are allowed.","OO: flexible constructor bodies"],
    ["js24",0,3,"Why does this fail to compile?\nsealed interface Shape permits Circle, Square {}\nrecord Circle(double r) implements Shape {}\nclass Square implements Shape {}",["A record cannot implement a sealed interface","Square must be declared final, sealed or non-sealed","The permits list must use fully qualified names","A sealed interface cannot have more than one implementation"],1,"Every permitted subclass must say how it continues the hierarchy: final, sealed or non-sealed. Records are implicitly final, so Circle is fine.","OO: sealed types"],
    ["js25",0,3,"A method uses `return switch (shape) { case Circle(double r) -> ...; case Square(double s) -> ...; };` over a sealed interface. A developer adds a Triangle record to the permits list but doesn't change the method. What happens?",["The method stops compiling because the switch is no longer exhaustive","It compiles, and Triangle shapes return 0.0","It compiles, but Triangle shapes throw a NullPointerException","The permits change is rejected until a default is added elsewhere"],0,"The compiler checks exhaustiveness over the sealed hierarchy, so a missing permitted subtype is a compile error. That is the benefit of pattern switches over sealed types with no default.","OO: sealed types and record patterns"],
    ["js26",0,3,"What is the output of `System.out.println(new Z().hi());`?\ninterface X { default String hi() { return \"X\"; } }\ninterface Y { default String hi() { return \"Y\"; } }\nclass Z implements X, Y {\n  public String hi() { return X.super.hi() + Y.super.hi(); }\n}",["XY","X","It does not compile","YX"],0,"Z must override hi() because the defaults conflict, and it calls each interface's version with InterfaceName.super.hi(). Without the override, the class would not compile.","OO: interfaces"],
    ["js27",0,3,"What happens when this method is called with \"text\"?\nstatic void show(Object o) {\n  if (!(o instanceof String s)) return;\n  System.out.println(s.length());\n}",["It prints 4","It does not compile because s is out of scope","It prints 0","It throws a ClassCastException"],0,"Flow scoping puts s in scope after the if, because the method returns whenever the pattern does not match. So s is definitely a String on the println line.","OO: pattern matching for instanceof"],
    ["js28",0,3,"What is the output?\nenum Size {\n  S(1), M(2), L(3);\n  final int v;\n  Size(int v) { this.v = v; }\n}\n// in main:\nSystem.out.println(Size.valueOf(\"M\").ordinal() + Size.L.v);",["5","13","4","3"],2,"ordinal() is zero-based, so M is 1, and L.v is 3, giving 4 with int addition. 13 would need string concatenation, and 5 would use M's field value.","OO: enums"],
    ["js29",0,3,"What does `new Init(); new Init();` print?\nclass Init {\n  static { System.out.print(\"S\"); }\n  { System.out.print(\"I\"); }\n  Init() { System.out.print(\"C\"); }\n}",["SICSIC","SICIC","ICSIC","SCISCI"],1,"The static block runs once when the class is first used. Each new object then runs instance initializers before the constructor body.","OO: initialization order"],
    ["js30",0,3,"What is printed by `m(5);`?\nstatic void m(long x)    { System.out.println(\"long\"); }\nstatic void m(Integer x) { System.out.println(\"Integer\"); }\nstatic void m(Object x)  { System.out.println(\"Object\"); }",["Integer","Object","It does not compile: ambiguous","long"],3,"Overload resolution tries widening before boxing, so int widens to long. Integer and Object need boxing and are only used if no primitive match works.","OO: overloading"],
    ["js31",0,3,"A team must make a Money class immutable. It has a String currency and a List<String> history field. Which design is needed?",["Make the fields public final so no one can reassign them","Declare setters private and keep the default constructor","Make the class final, fields private final, copy the list in and out","Mark the class final and the list field volatile"],2,"Immutability needs no subclassing, fields that cannot be reassigned, no setters and defensive copies of mutable parts like the List. A public final list can still be changed through its methods.","OO: encapsulation and immutability"],
    ["js32",0,3,"`Inner` is a non-static inner class of `Outer`. Which statement creates an Inner object from a static method of another class?",["Outer.Inner i = new Outer.Inner();","Outer.Inner i = Outer.new Inner();","Outer.Inner i = new Inner(new Outer());","Outer.Inner i = new Outer().new Inner();"],3,"An inner (non-static) class instance needs an enclosing instance, written outerRef.new Inner(). new Outer.Inner() only works for a static nested class.","OO: nested classes"],
    ["js33",0,3,"After these lines run, how many of the two created objects are eligible for garbage collection?\nObject a = new Object(); // obj1\nObject b = new Object(); // obj2\na = b;\nb = null;",["0","1","2","It cannot be known until System.gc() runs"],1,"obj1 has no references once a points to obj2. obj2 is still referenced by a, so only one object is eligible. Eligibility does not depend on whether the collector has run.","OO: garbage collection"],
    ["js34",0,3,"Which statement about abstract classes is true?",["They cannot declare constructors","All of their methods must be abstract","A class can extend two abstract classes if their methods differ","They can have constructors and state but cannot be instantiated"],3,"An abstract class can have fields, constructors (called by subclasses) and concrete methods, but `new` cannot be used on it. Java has single class inheritance.","OO: abstract classes"],
    ["js35",0,3,"What is the output?\nrecord Pair(String a, int b) {}\n// in main:\nSystem.out.println(new Pair(\"x\", 1));",["Pair[a=x, b=1]","Pair(a=x, b=1)","Pair@1b6d3586","{a=x, b=1}"],0,"A record's generated toString uses the form Name[component=value, ...]. The hash-code form comes from Object.toString, which records override.","OO: records"],
    ["js36",0,3,"A method must be visible to classes in the same package and to subclasses in other packages, but not to unrelated classes elsewhere. Which modifier should be used?",["private","no modifier (package access)","protected","public"],2,"protected gives package access plus access from subclasses. Package access alone leaves out subclasses in other packages.","OO: access modifiers"],
    ["js37",0,3,"Which local variable declaration compiles?",["var n = null;","var nums = {1, 2, 3};","var x;","var list = new ArrayList<String>();"],3,"var needs an initializer with a type the compiler can infer. null has no type, var cannot be declared without a value, and an array initializer needs an explicit type.","OO: var"],
    ["js38",0,3,"Two default methods in an interface share 15 lines of validation logic. The developer wants to share that code without exposing it to implementing classes. What should they use?",["A private method in the interface","A protected method in the interface","A public static method in the interface","A default method marked final"],0,"Interfaces can have private methods (since Java 9) that default methods call but implementers cannot see. Interface methods cannot be protected or final.","OO: interfaces"],

    ["js39",0,4,"What is the output of `System.out.println(f());`?\nstatic int f() {\n  try { return 1; }\n  finally { System.out.print(\"F\"); }\n}",["1F","1","It does not compile","F1"],3,"The return value 1 is saved, the finally block prints F, and then the method returns and println prints 1. finally always runs before the method actually returns.","Exceptions: try/finally"],
    ["js40",0,4,"Why does this fail to compile?\ntry { new FileReader(\"data.txt\"); }\ncatch (FileNotFoundException | IOException e) { }",["FileReader does not throw checked exceptions","Multi-catch types must not be related by subclassing","A multi-catch needs a finally block","The variable e must be declared final"],1,"FileNotFoundException is a subclass of IOException, and multi-catch types cannot be related by subclassing. The catch variable is already implicitly final.","Exceptions: multi-catch"],
    ["js41",0,4,"R prints \"close\" + its name when closed. What is the output?\ntry (R a = new R(\"A\"); R b = new R(\"B\")) {\n  System.out.print(\"body \");\n} finally {\n  System.out.print(\"fin\");\n}",["body closeA closeB fin","body fin closeB closeA","closeB closeA body fin","body closeB closeA fin"],3,"Resources close in reverse order of declaration, right after the body and before finally. finally never runs before the resources are closed.","Exceptions: try-with-resources"],
    ["js42",0,4,"In a try-with-resources block, the body throws IllegalStateException and then the resource's close() throws IOException. What does the caller receive?",["The IOException, with the IllegalStateException as its cause","Both exceptions, one after the other","The IllegalStateException, with the IOException as a suppressed exception","Only the IOException; the first exception is lost"],2,"The body's exception is primary, and the one from close() is attached to it with addSuppressed. It can be read with getSuppressed(). This is an improvement on hand-written finally blocks, which lose the first exception.","Exceptions: suppressed exceptions"],
    ["js43",0,4,"A superclass method is declared `void load() throws IOException`. Which subclass override compiles?",["void load() throws Exception","void load() throws Throwable","void load() throws IOException, SQLException","void load() throws FileNotFoundException"],3,"An override can throw the same, narrower or no checked exceptions. FileNotFoundException is narrower than IOException; Exception, Throwable and SQLException are broader or new checked types.","Exceptions: overriding and throws"],
    ["js44",0,4,"Why does this fail to compile?\ntry { reader.read(); }\ncatch (Exception e) { }\ncatch (IOException e) { }",["read() does not throw IOException","IOException is already caught by the earlier catch block","A try block can only have one catch","Exception is unchecked and cannot be caught"],1,"The catch for Exception already covers IOException, so the second block can never be reached and the compiler rejects it. More specific catch blocks must come first.","Exceptions: catch order"],
    ["js45",0,4,"A library needs an InsufficientFundsException that callers must handle or declare, so the compiler enforces it. How should it be declared?",["class InsufficientFundsException extends Exception","class InsufficientFundsException extends RuntimeException","class InsufficientFundsException extends Error","class InsufficientFundsException implements Throwable"],0,"Subclasses of Exception that are not RuntimeException are checked, so the compiler makes callers handle them. RuntimeException subclasses are unchecked, and Throwable is a class, not an interface.","Exceptions: custom exceptions"],

    ["js46",0,5,"What happens at runtime?\nList<Integer> nums = List.of(1, 2, 3);\nnums.set(0, 9);",["The list becomes [9, 2, 3]","An UnsupportedOperationException is thrown","An IndexOutOfBoundsException is thrown","It does not compile"],1,"List.of returns an unmodifiable list, so every change method throws UnsupportedOperationException. It compiles because set is part of the List interface.","Collections: unmodifiable lists"],
    ["js47",0,5,"What is the output?\nString[] arr = {\"a\", \"b\"};\nList<String> list = Arrays.asList(arr);\nlist.set(0, \"z\");\nSystem.out.println(arr[0]);",["a","null","An UnsupportedOperationException is thrown","z"],3,"Arrays.asList returns a fixed-size list backed by the array, so set writes through to the array. Only add and remove, which change the size, throw.","Collections: Arrays.asList"],
    ["js48",0,5,"What is the output?\nSystem.out.println(new TreeSet<>(List.of(\"banana\", \"Apple\", \"cherry\")));",["[banana, Apple, cherry]","[cherry, banana, Apple]","[banana, cherry, Apple]","[Apple, banana, cherry]"],3,"TreeSet uses natural String order, where uppercase letters come before lowercase ones. Insertion order is not kept.","Collections: TreeSet"],
    ["js49",0,5,"What is the output?\nMap<String, Integer> m = new HashMap<>();\nfor (String w : \"a b a c a\".split(\" \"))\n  m.merge(w, 1, Integer::sum);\nSystem.out.println(m.get(\"a\"));",["1","5","null","3"],3,"merge puts 1 for a new key and otherwise combines the old value with 1 using Integer::sum, so \"a\" ends up with 3. It does not replace the old value with 1.","Collections: Map.merge"],
    ["js50",0,5,"What is the output?\nDeque<Integer> d = new ArrayDeque<>();\nd.push(1);\nd.push(2);\nd.offer(3);\nSystem.out.println(d.pop() + \" \" + d.peekLast());",["3 1","1 3","2 1","2 3"],3,"push adds to the front ([2, 1]) and offer adds to the back ([2, 1, 3]). pop removes the front element 2, and peekLast shows 3.","Collections: Deque"],
    ["js51",0,5,"What is the output?\nList<Integer> l = new ArrayList<>(List.of(10, 20, 30));\nl.remove(1);\nl.remove(Integer.valueOf(10));\nSystem.out.println(l);",["[30]","[20, 30]","[10, 30]","[]"],0,"remove(1) uses the int index overload and removes 20; remove(Integer.valueOf(10)) removes by value. [20, 30] would come from reading remove(1) as removing the value 1.","Collections: List.remove overloads"],
    ["js52",0,5,"A list of words must be sorted by length, and words of the same length alphabetically. Which Comparator does this?",["Comparator.comparing(String::length).reversed()","Comparator.naturalOrder().thenComparing(String::length)","Comparator.comparing(String::length).thenComparing(Comparator.naturalOrder())","Comparator.comparing(String::toString).thenComparing(String::length)"],2,"The first key is length and ties are broken by natural String order. Starting with natural order sorts alphabetically first, so length would almost never matter.","Collections: Comparator"],
    ["js53",0,5,"Given `void add(List<? extends Number> nums)`, which statement inside the method compiles?",["Number n = nums.get(0);","nums.add(Double.valueOf(2.0));","nums.add(1);","nums.add(new Object());"],0,"With ? extends Number you can read elements as Number, but you cannot add (except null) because the real element type might be List<Double> or List<Integer>. Use ? super for adding.","Collections: generics and wildcards"],
    ["js54",0,5,"What is the output (Java 21 or later)?\nList<String> l = new ArrayList<>(List.of(\"a\", \"b\", \"c\"));\nl.addFirst(\"z\");\nSystem.out.println(l.reversed().getFirst() + l.getFirst());",["zc","ca","cz","az"],2,"addFirst makes [z, a, b, c]. reversed() is a reversed view whose first element is c, and the list's own first element is z.","Collections: sequenced collections"],

    ["js55",0,6,"What is the output?\nOptional<Integer> r = Stream.of(1, 2, 3, 4)\n  .peek(n -> System.out.print(n))\n  .filter(n -> n > 1)\n  .findFirst();\nSystem.out.println(\" \" + r.get());",["1234 2","12 2","1 2","2 2"],1,"Streams process elements one at a time and findFirst short-circuits, so only 1 and 2 go through peek. The whole list is not consumed first.","Streams: lazy evaluation"],
    ["js56",0,6,"What is the output?\nStream.of(\"a\", \"b\")\n  .peek(System.out::print)\n  .map(String::toUpperCase);\nSystem.out.println(\"done\");",["abdone","ABdone","done","It does not compile"],2,"The pipeline has no terminal operation, so nothing runs and peek never prints. Only intermediate operations were set up.","Streams: lazy evaluation"],
    ["js57",0,6,"What does m.get(2) return?\nMap<Integer, Long> m = Stream.of(\"aa\", \"b\", \"cc\", \"ddd\")\n  .collect(Collectors.groupingBy(String::length, Collectors.counting()));",["1","[aa, cc]","4","2"],3,"Grouping by length with counting() gives {1=1, 2=2, 3=1}, so two strings have length 2. [aa, cc] would be the result without a downstream collector (toList by default).","Streams: groupingBy"],
    ["js58",0,6,"Stream.of(1, 3).collect(Collectors.partitioningBy(n -> n > 5)) is evaluated. What is the result?",["{false=[1, 3]}","{true=[], false=[1, 3]} (keys in some order)","An empty map","{false=[1, 3], true=null}"],1,"partitioningBy always returns a map with both true and false keys, and an empty list for a partition with no elements. groupingBy would have only the false key.","Streams: partitioningBy"],
    ["js59",0,6,"What is the output?\nSystem.out.println(Stream.of(1, 2, 3, 4).reduce(10, Integer::sum));",["10","20","Optional[20]","Optional[10]"],1,"The identity 10 is the starting value, and 1 + 2 + 3 + 4 is added to it. The overload with an identity returns T, not Optional.","Streams: reduce"],
    ["js60",0,6,"What is the output?\nSystem.out.println(IntStream.rangeClosed(1, 4).map(i -> i * i).sum());",["14","30","10","55"],1,"rangeClosed includes 4, so the squares are 1 + 4 + 9 + 16 = 30. range(1, 4) would stop at 3 and give 14.","Streams: primitive streams"],
    ["js61",0,6,"A developer stores a stream in a variable, calls count() on it, then calls count() again on the same variable. What happens?",["The second call throws IllegalStateException","The second call returns the same count","The second call returns 0","It does not compile"],0,"A stream can only be used once; a second terminal operation throws IllegalStateException. The compiler cannot detect this.","Streams: stream lifecycle"],
    ["js62",0,6,"Which functional interface type can be the target of the lambda `(a, b) -> a + b` that takes two Integers and returns an Integer?",["BinaryOperator<Integer>","Function<Integer, Integer>","Supplier<Integer>","UnaryOperator<Integer>"],0,"BinaryOperator<T> takes two T values and returns a T. Function and UnaryOperator take a single argument, and Supplier takes none.","Streams: functional interfaces"],
    ["js63",0,6,"Why does this fail to compile?\nint count = 0;\nList.of(1, 2, 3).forEach(x -> count++);",["forEach does not accept a lambda","A local variable used in a lambda must be final or effectively final","count must be declared as an Integer","x is never used"],1,"Lambdas can only use local variables that are effectively final, and count++ changes it. Use an AtomicInteger or a stream count() instead.","Streams: lambdas and effectively final"],
    ["js64",0,6,"What is the output?\nSystem.out.println(List.of(List.of(1, 2), List.of(3)).stream()\n  .flatMap(List::stream)\n  .map(i -> i * 2)\n  .toList());",["[[2, 4], [6]]","It does not compile","[1, 2, 3]","[2, 4, 6]"],3,"flatMap turns the nested lists into one stream of 1, 2, 3, which are then doubled. map alone would keep the nested structure.","Streams: flatMap"],
    ["js65",0,6,"What is the output?\nSystem.out.println(Stream.of(\"a\", \"b\", \"c\")\n  .collect(Collectors.joining(\",\", \"[\", \"]\")));",["[a,b,c]","a,b,c","[a],[b],[c]","[a, b, c]"],0,"joining(delimiter, prefix, suffix) puts the prefix and suffix around the whole result, and the delimiter has no space. [a, b, c] is how List.toString looks.","Streams: Collectors.joining"],
    ["js66",0,6,"On Java 25, what is the output?\nSystem.out.println(Stream.of(1, 2, 3, 4, 5)\n  .gather(Gatherers.windowFixed(2))\n  .toList());",["[[1, 2], [3, 4]]","[[1, 2], [2, 3], [3, 4], [4, 5]]","[[1, 2], [3, 4], [5]]","[3, 7, 5]"],2,"windowFixed groups elements into lists of the given size, and the last window can be shorter. Overlapping windows come from windowSliding.","Streams: Stream Gatherers"],
    ["js67",0,6,"What is the output?\nSystem.out.println(Optional.ofNullable(null).map(Object::toString).orElse(\"none\"));",["null","A NullPointerException is thrown","Optional.empty","none"],3,"ofNullable(null) is empty, map does nothing on an empty Optional, and orElse gives the fallback. Optional.of(null) would throw the NullPointerException.","Streams: Optional"],
    ["js68",0,6,"What happens?\nMap<Character, String> m = Stream.of(\"apple\", \"avocado\")\n  .collect(Collectors.toMap(s -> s.charAt(0), s -> s));",["m is {a=avocado}","m is {a=apple}","An IllegalStateException is thrown","It does not compile"],2,"Both keys are 'a' and no merge function was given, so toMap throws IllegalStateException for the duplicate key. A third argument such as (x, y) -> y would keep one value.","Streams: Collectors.toMap"],

    ["js69",0,7,"A framework must use reflection at runtime to set private fields of classes in package com.shop.model, but other modules should not compile against that package. What goes in module-info.java?",["opens com.shop.model;","requires com.shop.model;","exports com.shop.model;","uses com.shop.model;"],0,"opens grants deep reflective access at runtime only. exports gives compile-time access to public types and does not allow reflection on private members.","Modules: opens vs exports"],
    ["js70",0,7,"Module app requires module api, and api's public methods return types from module util. What should api declare so that app can use those types without its own requires util?",["requires transitive util;","exports util;","requires static util;","opens util;"],0,"requires transitive makes every module that reads api also read util. requires static is for optional compile-time dependencies.","Modules: requires transitive"],
    ["js71",0,7,"Module pay.stripe provides an implementation of the service interface com.pay.Gateway, and the app loads implementations with ServiceLoader. Which directive belongs in the provider module?",["uses com.pay.Gateway;","provides com.pay.Gateway with com.stripe.StripeGateway;","exports com.pay.Gateway to com.stripe;","requires service com.pay.Gateway;"],1,"The provider declares provides ... with ..., and the consumer module declares uses. \"requires service\" is not a directive.","Modules: services"],
    ["js72",0,7,"On Java 25, a class starts with `import module java.base;` and `import module java.desktop;` and declares a field `List<String> names;`. What happens?",["It compiles and List means java.util.List","It compiles and List means java.awt.List","It fails: List is ambiguous; add import java.util.List;","It fails because import module needs a module-info.java"],2,"Both modules export a public List type (java.util and java.awt), so the simple name is ambiguous. A single-type import takes priority and fixes it; import module also works in classes on the class path.","Modules: module import declarations"],
    ["js73",0,7,"On Java 25, Hello.java contains only:\nvoid main() {\n  IO.println(\"Hello \" + List.of(1, 2));\n}\nWhat happens with `java Hello.java`?",["It prints Hello [1, 2]","It fails: main must be public static","It fails: no class declaration","It fails because List is not imported"],0,"A compact source file declares an implicit class, may use an instance main method, and automatically imports module java.base, so List needs no import. IO is java.lang.IO.","Packaging: compact source files and instance main"],
    ["js74",0,7,"A team wants to ship a desktop app with a small custom Java runtime that contains only the modules the app needs. Which JDK tool builds that runtime image?",["jlink","jdeps","jar","javadoc"],0,"jlink links the modules you choose into a custom runtime image. jdeps helps by listing which modules are needed, but it does not build the image.","Packaging: JDK tools"],

    ["js75",0,8,"A service calls a slow REST API for each of 50,000 incoming requests; each call spends most of its time waiting on the network. Which approach scales best on Java 25 with minimal code change?",["A fixed thread pool sized to the number of CPU cores","A parallel stream over the requests","Executors.newVirtualThreadPerTaskExecutor()","One platform thread per request created with new Thread()"],2,"Virtual threads are cheap and park while blocked on I/O, so one per task scales to very large numbers of blocking tasks. A core-sized pool or parallel stream would leave most tasks waiting in line.","Concurrency: virtual threads"],
    ["js76",0,8,"Several threads run `hits++` on a shared int field, and the final total is often too low. What is the simplest correct fix?",["Mark the field volatile","Call Thread.yield() after each increment","Use an AtomicInteger and call incrementAndGet()","Give the threads a higher priority"],2,"hits++ is a read-modify-write, and AtomicInteger does it atomically. volatile only gives visibility, not atomicity, so updates can still be lost.","Concurrency: thread safety"],
    ["js77",0,8,"A task submitted to an ExecutorService must return a computed value and may throw a checked IOException. Which should it implement?",["Runnable","Supplier<V>","Thread","Callable<V>"],3,"Callable.call() returns a value and declares throws Exception, and the value is read through Future.get(). Runnable.run() and Supplier.get() cannot throw checked exceptions.","Concurrency: Callable and Future"],
    ["js78",0,8,"Many threads iterate over a list of listeners, while changes to the list are rare. Iteration must never throw ConcurrentModificationException. Which collection fits best?",["ArrayList","LinkedList","CopyOnWriteArrayList","Collections.unmodifiableList(new ArrayList<>())"],2,"CopyOnWriteArrayList copies the array on every write, so iterators work on a snapshot and never throw. It suits many reads and few writes. An unmodifiable wrapper does not allow changes at all.","Concurrency: concurrent collections"],
    ["js79",0,8,"Called from the main method, what is printed?\nThread t = new Thread(() ->\n  System.out.println(Thread.currentThread().getName()));\nt.setName(\"worker\");\nt.run();",["worker","main","Thread-0","Nothing"],1,"Calling run() directly runs the lambda in the current thread (main); only start() creates a new thread. It would print worker if start() were called.","Concurrency: thread lifecycle"],
    ["js80",0,8,"On Java 25, a static final ScopedValue<String> USER is bound with `ScopedValue.where(USER, \"ann\").run(task)`. What is true?",["Inside task, USER.get() returns \"ann\"; after run returns, USER.get() throws NoSuchElementException","USER keeps \"ann\" for the rest of the thread's life, like a ThreadLocal","The task can call USER.set(\"bob\") to change the value","USER.get() returns null after run returns"],0,"A scoped value is bound only while run executes and cannot be changed within that scope. Outside any binding, get() throws NoSuchElementException. That limited lifetime is what separates it from ThreadLocal.","Concurrency: scoped values"],
    ["js81",0,8,"Code uses `try (ExecutorService ex = Executors.newFixedThreadPool(4)) { ... submit tasks ... }`. What happens at the end of the try block?",["close() shuts down the executor and waits for submitted tasks to finish","The code does not compile because ExecutorService is not AutoCloseable","All running tasks are interrupted and dropped at once","The executor keeps running until the JVM exits"],0,"ExecutorService has been AutoCloseable since Java 19, and close() calls shutdown() and then waits for tasks to finish. Interrupting and dropping tasks is what shutdownNow() does.","Concurrency: ExecutorService"],
    ["js82",0,8,"Two threads sometimes deadlock because each holds one lock and waits for the other. Which change most directly avoids waiting forever while keeping explicit locks?",["Use ReentrantLock.tryLock(timeout, unit) and back off if the lock isn't acquired","Add Thread.sleep() before each lock","Mark the shared fields volatile","Raise the priority of one thread"],0,"tryLock with a timeout lets a thread give up and retry instead of blocking forever. Another fix is always taking locks in the same order. Sleeping or changing priority only changes the timing.","Concurrency: locks and deadlock"],

    ["js83",0,9,"What is the output?\nSystem.out.println(Path.of(\"/a/b\").resolve(\"../c\").normalize());",["/a/b/c","/a/c","/c","/a/b/../c"],1,"resolve gives /a/b/../c, and normalize removes b/.. to give /a/c. Without normalize the .. would stay in the path.","I/O: Path operations"],
    ["js84",0,9,"What is the output?\nSystem.out.println(Path.of(\"/x/y\").relativize(Path.of(\"/x/z/w\")));",["z/w","/x/z/w","../z/w","../../z/w"],2,"relativize gives the path from /x/y to /x/z/w: up one level to /x, then down into z/w. z/w would be relative to /x, not /x/y.","I/O: Path operations"],
    ["js85",0,9,"A method counts lines containing \"ERROR\" using Files.lines(path).filter(...).count(). Over time the application runs out of file handles. What is the fix?",["Use Files.readString instead of Files.lines","Wrap the stream in try-with-resources so it is closed","Call System.gc() after each count","Use a parallel stream"],1,"Files.lines keeps the file open until the stream is closed, and a terminal operation does not close it. try-with-resources closes it every time.","I/O: Files and streams"],
    ["js86",0,9,"A Serializable User class has a field `transient String password;`. After a User is written with ObjectOutputStream and read back, what is the password field?",["The original value","An empty string","null","The field's value encrypted"],2,"transient fields are skipped during serialization and get their default value (null for references) on deserialization. They are not stored in any form.","I/O: serialization"],
    ["js87",0,9,"A tool must find every .log file under /var/app, including files in nested subfolders. Which Files method is designed for this?",["Files.list","Files.walk","Files.lines","Files.readAllLines"],1,"Files.walk goes through the whole tree recursively and returns a Stream<Path> to filter. Files.list only returns the direct children of one folder.","I/O: walking directories"],
    ["js88",0,9,"The folder /data does not exist. A program calls Files.createDirectory(Path.of(\"/data/reports/2026\")). What happens?",["All three folders are created","A NoSuchFileException is thrown because the parent is missing","Only 2026 is created, in the current directory","The call returns false"],1,"createDirectory makes only the last element and fails if the parent is missing. createDirectories would create all the missing folders.","I/O: Files methods"],

    ["js89",0,10,"The default locale is en_US. The app has Messages.properties and Messages_fr.properties, and calls ResourceBundle.getBundle(\"Messages\", Locale.CANADA_FRENCH) (fr_CA). Which existing file is used first to look up a key?",["Messages.properties","Messages_en_US.properties","Messages_fr.properties","A MissingResourceException is thrown"],2,"There is no Messages_fr_CA, so lookup falls back to Messages_fr. Keys missing there come from its parent, Messages.properties. The default locale is only tried if no bundle is found for fr at all.","Localization: resource bundles"],
    ["js90",0,10,"What is the output?\nSystem.out.println(NumberFormat.getCurrencyInstance(Locale.US).format(1234.5));",["1,234.50 USD","$1234.5","USD 1234.50","$1,234.50"],3,"The US currency format adds the dollar sign, grouping separators and two decimal places. The ISO code form is not the default for Locale.US.","Localization: NumberFormat"],
    ["js91",0,10,"What is the output?\nSystem.out.println(DateTimeFormatter.ofPattern(\"dd MMM yyyy\", Locale.US)\n  .format(LocalDate.of(2026, 9, 24)));",["24 Sep 2026","24 09 2026","24 September 2026","Sep 24 2026"],0,"MMM is the short month name in the given locale, and dd and yyyy are the two-digit day and year. MMMM would give the full name September.","Localization: DateTimeFormatter"],
    ["js92",0,10,"What is the output?\nSystem.out.println(NumberFormat.getCompactNumberInstance(\n  Locale.US, NumberFormat.Style.SHORT).format(1_200_000));",["1.2M","1 million","1M","1,200K"],2,"Compact formatting defaults to no fraction digits, so 1,200,000 becomes 1M. Call setMaximumFractionDigits(1) to get 1.2M, and use Style.LONG for 1 million.","Localization: CompactNumberFormat"]
  ]
});
