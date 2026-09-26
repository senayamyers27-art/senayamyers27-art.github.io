/* Lessons for Oracle Certified Professional: Java SE Developer (1Z0-831 (Java SE 25)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("java-se", [
 {
  "t": "Primitive types, literals (underscores, binary/hex/octal), default values",
  "body": [
   "Java has eight primitive types, and they hold raw values rather than references to objects. Four are whole-number types: `byte` (8 bits), `short` (16 bits), `int` (32 bits) and `long` (64 bits), all signed. Two are floating-point types: `float` (32 bits) and `double` (64 bits). `char` is a 16-bit unsigned value that stores a UTF-16 code unit, so it can be used in arithmetic, and `boolean` holds only `true` or `false`. Unlike some languages, a Java `boolean` is never a number: `if (1)` does not compile.",
   "A literal is a value written directly in source code. A plain whole number such as `42` is an `int` literal, so a value too big for `int` needs the `L` suffix: `long big = 3_000_000_000L;` compiles, but the same number without `L` is a compile error even though the target is a `long`. A number with a decimal point, such as `3.14`, is a `double` literal, so `float f = 3.14;` fails and you must write `3.14f` or cast it. Character literals use single quotes (`'A'`, `'\\n'`, `'\\u0041'`).",
   "Whole-number literals can be written in four bases. Decimal is the default. A leading `0` means octal (`017` is 15), `0x` or `0X` means hexadecimal (`0x1F` is 31), and `0b` or `0B` means binary (`0b101` is 5). The octal rule is a classic trap: `010` is 8, not 10, and `09` does not compile because 9 is not an octal digit.",
   "Underscores can separate digits for readability, as in `1_000_000` or `0b1010_0101`. The rule is that an underscore must sit between two digits. So these are illegal: a leading or trailing underscore (`_100`, `100_`), an underscore next to a decimal point (`1_.5`, `1._5`), one right before a suffix (`10_L`, `2.0_f`) and one straight after the `0x` or `0b` prefix (`0x_FF`). Several underscores in a row are fine (`1__000`), and so is one after the leading zero of an octal literal (`0_17`), because that zero counts as a digit.",
   "Default values apply only to fields (instance and static variables) and to array elements. Numeric fields default to zero (`0`, `0L`, `0.0f`, `0.0`), `char` to `'\\u0000'`, `boolean` to `false`, and every reference type to `null`. Local variables never get a default. Reading a local variable before it has definitely been assigned is a compile error, which the exam likes to hide inside an `if` branch.",
   "```java\nint[] nums = new int[3];      // {0, 0, 0}\nboolean[] flags = new boolean[2]; // {false, false}\nint x;\n// System.out.println(x);    // does not compile: x not initialized\nint hex = 0xFF, oct = 010, bin = 0b11;\nSystem.out.println(hex + oct + bin); // 255 + 8 + 3 = 266\n```"
  ],
  "terms": [
   [
    "Primitive type",
    "One of the eight built-in value types (byte, short, int, long, float, double, char, boolean) that are not objects."
   ],
   [
    "Literal",
    "A fixed value written in source code, such as 42, 3.5f, 'x' or 0b1010."
   ],
   [
    "Octal literal",
    "A whole-number literal with a leading 0, read in base 8, so 010 equals 8."
   ],
   [
    "Default value",
    "The value a field or array element gets automatically: 0, false, '\\u0000' or null. Local variables have none."
   ]
  ],
  "example": "A payments service stores amounts in cents as a `long`. A developer writes `long limit = 5_000_000_000;` and the build fails, because the literal is still an `int` literal and is out of range. Adding `L` (`5_000_000_000L`) fixes it, and the underscores keep the number readable in code review.",
  "tip": "Scan every numeric literal for three things: a leading 0 (octal), a missing L or f suffix on a value that needs it, and an underscore touching a prefix, suffix or decimal point.",
  "check": [
   [
    "Does `float price = 9.99;` compile?",
    "No. 9.99 is a double literal, and assigning a double to a float is a narrowing conversion. Write 9.99f or cast with (float)."
   ],
   [
    "What does `System.out.println(012 + 0x10);` print?",
    "26. 012 is octal for 10 and 0x10 is hexadecimal for 16."
   ],
   [
    "Which of these is legal: `1_000`, `_1000`, `0x_10`, `1000_L`?",
    "Only 1_000. The others put an underscore at the start, right after the 0x prefix, or right before the L suffix."
   ]
  ]
 },
 {
  "t": "Wrapper classes, autoboxing/unboxing and Integer caching with ==",
  "body": [
   "Each primitive type has a wrapper class in `java.lang`: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character` and `Boolean`. Wrappers exist because collections and generics work only with objects, so you cannot write `List<int>`. A wrapper object is immutable and can also be `null`, which a primitive cannot.",
   "Autoboxing is the compiler automatically converting a primitive to its wrapper, and unboxing is the reverse. When you write `Integer n = 5;` the compiler inserts `Integer.valueOf(5)`, and when you write `int m = n;` it inserts `n.intValue()`. Unboxing a `null` reference therefore throws a `NullPointerException` at runtime, a frequent exam scenario with `Map.get` returning `null` into an `int` variable.",
   "Know the difference between the two conversion families. `Integer.parseInt(\"42\")` returns a primitive `int`, while `Integer.valueOf(\"42\")` returns an `Integer` object. The wrapper constructors such as `new Integer(5)` are deprecated and marked for removal, so modern code and exam answers use `valueOf` or autoboxing. Boxing only goes to the matching wrapper: `Long x = 5;` does not compile, because `5` is an `int` and would need to become an `Integer`, which is not a `Long`.",
   "The `==` operator on two wrapper references compares identity (whether they are the same object), not value. `Integer.valueOf` keeps a cache of `Integer` objects for at least the range -128 to 127, and autoboxing uses `valueOf`, so two boxed values in that range usually point at the same cached object. Outside that range each boxing typically creates a new object. That is why `Integer a = 127, b = 127; a == b` is `true` but the same test with 128 is `false`. `Short`, `Long` and `Byte` cache the same range, `Character` caches 0 to 127, and `Boolean` has only `TRUE` and `FALSE`. The fix is simple: compare wrapper values with `equals`.",
   "Mixing a wrapper and a primitive in `==` is different: the wrapper is unboxed, so the comparison is numeric and the cache does not matter. Also watch `equals` across types. `Long.valueOf(1).equals(1)` is `false`, because the argument is boxed to an `Integer`, and `Long.equals` returns `false` for anything that is not a `Long`.",
   "```java\nInteger a = 100, b = 100;\nInteger c = 1000, d = 1000;\nSystem.out.println(a == b);      // true  (cached)\nSystem.out.println(c == d);      // false (different objects)\nSystem.out.println(c.equals(d)); // true\nint e = 1000;\nSystem.out.println(c == e);      // true  (c is unboxed)\n```",
   "Overload resolution also involves boxing. The compiler first looks for an exact or widening match, then tries boxing and unboxing, and only then varargs. So given `m(long)` and `m(Integer)`, the call `m(5)` picks `m(long)`, because widening beats boxing."
  ],
  "terms": [
   [
    "Wrapper class",
    "An immutable class such as Integer or Double that holds one primitive value as an object."
   ],
   [
    "Autoboxing",
    "The automatic conversion of a primitive to its wrapper, done by the compiler through valueOf."
   ],
   [
    "Unboxing",
    "The automatic conversion of a wrapper to its primitive; throws NullPointerException if the reference is null."
   ],
   [
    "Integer cache",
    "A pool of Integer objects for at least -128 to 127 that Integer.valueOf reuses, which makes == appear to work for small values."
   ]
  ],
  "example": "A shop counts orders per customer in a `Map<String, Integer>`. The code `int count = counts.get(id);` works in testing, then crashes in production with a NullPointerException the first time a new customer appears, because `get` returns null and the unboxing fails. Using `getOrDefault(id, 0)` avoids it.",
  "tip": "When you see == between two Integer variables, check whether both values fall in -128 to 127. If they do, expect true; if not, expect false. If one side is a primitive, it is a plain numeric comparison.",
  "check": [
   [
    "What does `Integer x = 128, y = 128; System.out.println(x == y);` print?",
    "Usually false. 128 is outside the guaranteed cache range, so each boxing creates a separate object and == compares identity."
   ],
   [
    "Does `Long total = 10;` compile?",
    "No. 10 is an int, and autoboxing only produces an Integer, which is not assignable to Long. Write 10L."
   ],
   [
    "What happens when `Integer n = null; int m = n;` runs?",
    "It compiles but throws a NullPointerException, because unboxing calls intValue() on null."
   ]
  ]
 },
 {
  "t": "Operator precedence, increment/decrement, compound assignment with implicit casts",
  "body": [
   "Operator precedence decides which operators bind first when an expression has no parentheses. From highest to lowest, the order you need is: postfix (`x++`, `x--`), then unary and prefix (`++x`, `--x`, `+`, `-`, `!`, `~`, casts), then multiplicative (`*`, `/`, `%`), additive (`+`, `-`), shifts (`<<`, `>>`, `>>>`), relational (`<`, `>`, `<=`, `>=`, `instanceof`), equality (`==`, `!=`), then the bitwise and logical `&`, `^` and `|` in that order, then the short-circuit `&&` and `||`, the ternary `?:`, and finally assignment operators (`=`, `+=` and so on). Operands are still evaluated left to right, even when precedence groups them differently.",
   "Increment and decrement have two forms. Prefix `++x` increments first and the expression's value is the new value. Postfix `x++` produces the old value and increments afterwards. In `int x = 3; int y = x++ * 2 + ++x;` the evaluation is left to right: `x++` gives 3 (x becomes 4), `++x` makes x 5 and gives 5, so `y` is `3 * 2 + 5 = 11`. A famous trap is `x = x++;`, which leaves `x` unchanged, because the old value is saved, `x` is incremented, and then the saved old value is assigned back.",
   "The short-circuit operators `&&` and `||` skip the right side when the left side already decides the result, so side effects on the right may never happen. In `if (a > 0 || b++ > 0)`, `b` is not incremented when `a > 0`. The non-short-circuit `&` and `|` on booleans always evaluate both sides.",
   "Compound assignment operators (`+=`, `-=`, `*=`, `/=`, `%=` and the bitwise ones) include an implicit cast back to the type of the left operand. `x += y` means `x = (T)(x + y)` where `T` is the type of `x`, and `x` is evaluated only once. That is why this compiles:",
   "```java\nshort s = 10;\ns += 5;        // OK: implicit cast back to short\n// s = s + 5;  // does not compile: s + 5 is an int\nbyte b = 127;\nb += 1;        // compiles; b overflows to -128\nint i = 7;\ni *= 2.5;      // compiles; (int)(7 * 2.5) = 17\n```",
   "The implicit cast can silently lose data, as the `byte` overflow and the truncated `17` show. The exam uses this to test whether you know that `s = s + 5` fails but `s += 5` works. Remember also that an assignment is itself an expression whose value is the assigned value, so `int a, b; a = b = 4;` sets both to 4 (assignment is right-associative), and `if (flag = true)` compiles for a `boolean` and is always true.",
   "Division and remainder matter too. Integer division truncates toward zero, so `-7 / 2` is `-3`, and the sign of `%` follows the left operand, so `-7 % 2` is `-1`. Integer division by zero throws `ArithmeticException`, while floating-point division by zero gives `Infinity` or `NaN`."
  ],
  "terms": [
   [
    "Operator precedence",
    "The rules that decide which operator in an unparenthesized expression is applied first."
   ],
   [
    "Postfix increment",
    "x++: the expression yields the old value, then x is increased by one."
   ],
   [
    "Compound assignment",
    "An operator like += that combines an operation with assignment and casts the result back to the left operand's type."
   ],
   [
    "Short-circuit evaluation",
    "&& and || skip evaluating the right operand when the left operand already determines the result."
   ]
  ],
  "example": "A game loop stores a health value in a `byte` to save memory. Code that heals with `health += 50;` compiles cleanly, but a player at 100 health suddenly shows -106, because 150 does not fit in a byte and the compound assignment's hidden cast wrapped it around. Using `int` and clamping with Math.min fixes the bug.",
  "tip": "Evaluate operands strictly left to right, tracking each variable's value on paper after every ++ or --. For compound assignment, remember the hidden cast: it compiles where the long form would not.",
  "check": [
   [
    "What is the value of x after `int x = 5; x = x++ + ++x;`?",
    "12. x++ yields 5 (x becomes 6), then ++x makes x 7 and yields 7, so 5 + 7 = 12 is assigned."
   ],
   [
    "Why does `short s = 1; s = s + 1;` fail but `s += 1;` compile?",
    "s + 1 is promoted to int and cannot be assigned to short without a cast, while += includes an implicit cast back to short."
   ],
   [
    "What is printed by `int a = 0; boolean r = (a > 1) && (a++ > 0); System.out.println(a);`?",
    "0. The left side is false, so && short-circuits and a++ never runs."
   ]
  ]
 },
 {
  "t": "Widening and narrowing conversions, casting and numeric promotion rules",
  "body": [
   "A widening primitive conversion moves a value into a type that can hold a larger range, and Java does it automatically. The widening chain is `byte` to `short` to `int` to `long` to `float` to `double`, with `char` also widening to `int` and beyond. Widening from `int` or `long` to `float`, or from `long` to `double`, is allowed even though it can lose precision in the low digits, because the range still fits. Note that `byte` and `short` do not widen to `char`, and `char` does not widen to `short`, because `char` is unsigned.",
   "A narrowing conversion goes the other way and needs an explicit cast, such as `int i = (int) 3.99;`, which truncates toward zero to 3. Casting a whole number to a smaller type keeps only the low-order bits, so `(byte) 200` is -56 and `(byte) 128` is -128. Casting a very large `double` to `int` clamps to `Integer.MAX_VALUE`, and casting `NaN` to `int` gives 0. The compiler does not warn you; it trusts the cast.",
   "There is one important exception to the cast requirement. If the value is a compile-time constant of type `int` (or `char`, `short`, `byte`) and it fits in the target `byte`, `short` or `char`, the compiler narrows it for you in an assignment. So `byte b = 100;` and `char c = 65;` compile, but `byte b = 200;` does not. The same applies to `final` local variables initialized with constants: `final int k = 10; byte b = k;` compiles, but without `final` it does not.",
   "Numeric promotion is what happens to operands of arithmetic operators. The rules are: first, `byte`, `short` and `char` are always promoted to at least `int` in a binary operation; second, if either operand is `double` the other becomes `double`, otherwise if either is `float` both become `float`, otherwise if either is `long` both become `long`, otherwise both are `int`. The result has the promoted type. This is why adding two `byte` values produces an `int`:",
   "```java\nbyte a = 10, b = 20;\n// byte c = a + b;       // does not compile: int result\nbyte c = (byte) (a + b); // OK\nchar ch = 'A';\nSystem.out.println(ch + 1);        // 66 (int)\nSystem.out.println((char) (ch + 1)); // B\nlong big = 1_000_000 * 1_000_000;  // int overflow before widening\nlong ok  = 1_000_000L * 1_000_000; // 1000000000000\n```",
   "The last two lines show a subtle point: promotion is decided by the operand types, not by the target variable. Both literals are `int`, so the multiplication overflows as an `int` before the result is widened to `long`. Making one operand a `long` fixes it. Also remember that casting has high precedence: `(int) 2.5 * 2` is `(int) 2.5` times 2, which is 4, while `(int) (2.5 * 2)` is 5.",
   "Reference types have their own casting rules, covered with polymorphism later, but primitives and wrappers do not mix freely: you cannot cast a `String` to `int`, and `(Integer) 3L` does not compile. Use parsing methods or `intValue()`-style methods for those."
  ],
  "terms": [
   [
    "Widening conversion",
    "An automatic conversion to a type with a larger range, such as int to long or float to double."
   ],
   [
    "Narrowing conversion",
    "A conversion to a type with a smaller range, which needs an explicit cast unless it is a fitting compile-time constant."
   ],
   [
    "Numeric promotion",
    "The rule that operands of arithmetic operators are converted to a common type of at least int before the operation."
   ],
   [
    "Compile-time constant",
    "An expression whose value the compiler knows, such as a literal or a final variable initialized with a literal."
   ]
  ],
  "example": "A reporting job computes total milliseconds with `long ms = days * 24 * 60 * 60 * 1000;` where `days` is an int. For 30 days it prints a negative number, because the whole product is computed as an int and overflows before the widening to long. Writing `days * 24L * 60 * 60 * 1000` keeps the arithmetic in long.",
  "tip": "When a question assigns an arithmetic result to byte, short or char, look for promotion to int. It only compiles with a cast, a compound assignment, or when the whole expression is a constant that fits.",
  "check": [
   [
    "Does `char c = 'a'; c = c + 1;` compile?",
    "No. c + 1 is promoted to int, and assigning an int variable expression to char needs a cast. c++ or c += 1 would compile."
   ],
   [
    "What is `(byte) 130`?",
    "-126. Only the low 8 bits are kept, and 130 in 8-bit two's complement is -126."
   ],
   [
    "What is the type of `5L * 2.0f`?",
    "float. When either operand is float (and neither is double), both are promoted to float."
   ]
  ]
 },
 {
  "t": "Math API: round, floor, ceil, abs, max/min, pow",
  "body": [
   "`java.lang.Math` is a utility class of static methods, so you call them as `Math.round(x)` without creating an object, and there is no need to import it. The exam focuses less on what each method does than on what type it returns and how it treats negative numbers and edge cases.",
   "`Math.round` rounds to the nearest whole number, with halves rounded up toward positive infinity. It is overloaded: `round(double)` returns a `long` and `round(float)` returns an `int`. So `int r = Math.round(2.5);` does not compile, because the argument is a `double` literal and the result is `long`; `Math.round(2.5f)` returns the `int` 3. The half-up rule surprises people with negatives: `Math.round(-2.5)` is -2, while `Math.round(-2.6)` is -3, because -2.5 rounds up toward positive infinity.",
   "`Math.floor` and `Math.ceil` both take a `double` and return a `double`. `floor` goes down to the next whole number toward negative infinity and `ceil` goes up toward positive infinity. `Math.floor(-1.5)` is -2.0 and `Math.ceil(-1.5)` is -1.0. Because they return `double`, printing them shows a `.0`, and assigning them to an `int` needs a cast. Casting with `(int)` is different again: it truncates toward zero, so `(int) -1.5` is -1.",
   "`Math.abs`, `Math.max` and `Math.min` are overloaded for `int`, `long`, `float` and `double`, and the return type follows the argument types after normal promotion. `Math.max(3, 7L)` returns a `long`, and `Math.min(2, 1.5)` returns the `double` 1.5. One edge case appears on tests: `Math.abs(Integer.MIN_VALUE)` returns `Integer.MIN_VALUE` itself, still negative, because the positive value does not fit in an `int`.",
   "`Math.pow(base, exponent)` takes two `double` values and always returns a `double`, even for whole numbers: `Math.pow(2, 3)` is 8.0. Assigning it to an `int` requires a cast, `int p = (int) Math.pow(2, 10);`. Related methods you may see include `Math.sqrt` (returns `double`), `Math.random()` (a `double` from 0.0 inclusive to 1.0 exclusive) and `Math.floorDiv`/`Math.floorMod`, which round toward negative infinity unlike `/` and `%`.",
   "```java\nSystem.out.println(Math.round(3.49));   // 3   (long)\nSystem.out.println(Math.round(-3.5));   // -3\nSystem.out.println(Math.floor(3.9));    // 3.0\nSystem.out.println(Math.ceil(3.1));     // 4.0\nSystem.out.println(Math.abs(-7));       // 7\nSystem.out.println(Math.max(4, 4.0f));  // 4.0 (float)\nSystem.out.println(Math.pow(3, 2));     // 9.0\n```",
   "In a lab, try these in `jshell`: it prints each result along with its type, which makes the return-type rules stick far better than memorizing a table."
  ],
  "terms": [
   [
    "Math.round",
    "Rounds to the nearest whole number with halves toward positive infinity; returns long for a double argument and int for a float."
   ],
   [
    "Math.floor / Math.ceil",
    "Return the double just at or below (floor) or at or above (ceil) the argument, moving toward negative or positive infinity."
   ],
   [
    "Math.pow",
    "Raises a double base to a double exponent and always returns a double."
   ],
   [
    "Overloading by type",
    "abs, max and min have int, long, float and double versions, so the result type follows the promoted argument types."
   ]
  ],
  "example": "A billing script computes the number of pages to print with `int pages = items / 20;` and misses the last partial page. The fix is `int pages = (int) Math.ceil(items / 20.0);`. Note the 20.0: with plain 20 the integer division would truncate before ceil ever sees a fraction.",
  "tip": "Before choosing an answer, write down the return type of each Math call. Most Math questions are really compile-error questions about round returning long or pow returning double.",
  "check": [
   [
    "Does `int n = Math.round(7.5);` compile?",
    "No. 7.5 is a double, so round returns a long, which cannot be assigned to int without a cast."
   ],
   [
    "What does `Math.round(-4.5)` return?",
    "-4. Halves round toward positive infinity."
   ],
   [
    "What is printed by `System.out.println(Math.ceil(-0.5));`?",
    "-0.0. ceil moves toward positive infinity, and the result for this negative fraction is negative zero, printed as -0.0."
   ]
  ]
 },
 {
  "t": "String immutability and key methods: substring, indexOf, charAt, strip, repeat, isBlank",
  "body": [
   "A `String` in Java is immutable: once created, its characters never change. Every method that seems to modify a string, such as `toUpperCase` or `concat`, actually returns a new `String` and leaves the original alone. The most common exam trap is a line like `s.toUpperCase();` whose result is thrown away, so `s` is unchanged when printed. Immutability lets strings be shared safely, cached in the string pool, and used as reliable `HashMap` keys.",
   "String literals are placed in the string pool, so two identical literals refer to the same object and `==` is `true`. A string built at runtime, for example with `new String(\"hi\")` or by concatenating a non-constant variable, is a different object, so `==` is `false` even when the text matches. Always compare text with `equals` (or `equalsIgnoreCase`). Concatenation of compile-time constants, like `\"a\" + \"b\"`, is done by the compiler and does land in the pool.",
   "Indexes are zero-based. `charAt(i)` returns the `char` at position `i` and throws `StringIndexOutOfBoundsException` if `i` is negative or not less than `length()`. `substring(begin)` runs to the end and `substring(begin, end)` includes `begin` but excludes `end`, so its length is `end - begin`. `substring(3, 3)` is an empty string, `substring(len)` is also empty, but `end` greater than `length()` or `begin` greater than `end` throws an exception.",
   "`indexOf` returns the index of the first match of a `char` or `String`, or -1 if there is none, and an overload takes a starting index: `\"banana\".indexOf('a', 2)` is 3. `lastIndexOf` searches from the end. These never throw for a missing value, which makes them useful before a `substring` call.",
   "`strip()` removes leading and trailing whitespace using Unicode's definition of whitespace, while the older `trim()` removes only characters with code up to U+0020. `stripLeading()` and `stripTrailing()` do one side. `isEmpty()` is true only when the length is 0, while `isBlank()` is true when the string is empty or contains only whitespace, so `\"  \".isEmpty()` is false but `\"  \".isBlank()` is true. `repeat(n)` returns the string repeated n times, `repeat(0)` gives an empty string, and a negative count throws `IllegalArgumentException`.",
   "```java\nString s = \"  Java  \";\ns.strip();                       // result discarded\nSystem.out.println(\"[\" + s + \"]\");     // [  Java  ]\nString t = s.strip();\nSystem.out.println(t.charAt(0));       // J\nSystem.out.println(t.substring(1, 3)); // av\nSystem.out.println(t.indexOf(\"va\"));   // 2\nSystem.out.println(\"ab\".repeat(3));    // ababab\nSystem.out.println(\" \\t\".isBlank());   // true\n```",
   "Method chaining works because each call returns a new string: `\" hi \".strip().toUpperCase().repeat(2)` gives `HIHI`. Read chains left to right and keep track of the intermediate value at each step."
  ],
  "terms": [
   [
    "Immutability",
    "The property that an object's state cannot change after creation; String methods return new strings instead."
   ],
   [
    "String pool",
    "A JVM area that stores one shared copy of each string literal and compile-time constant string."
   ],
   [
    "substring(begin, end)",
    "Returns the characters from begin up to but not including end."
   ],
   [
    "isBlank",
    "Returns true if a string is empty or contains only whitespace characters."
   ]
  ],
  "example": "A sign-up form checks `if (name.isEmpty())` to reject empty names, but users typing only spaces slip through and end up with blank display names. Switching to `name.isBlank()`, and storing `name.strip()`, closes the gap.",
  "tip": "Look for string method calls whose return value is not assigned. Because String is immutable, the original variable is unchanged, and that is usually the whole point of the question.",
  "check": [
   [
    "What does `\"develop\".substring(2, 5)` return?",
    "\"vel\". It includes index 2 and excludes index 5, giving three characters."
   ],
   [
    "What is the difference between `isEmpty()` and `isBlank()`?",
    "isEmpty is true only for length 0; isBlank is also true for strings that contain only whitespace."
   ],
   [
    "What is printed by `String s = \"abc\"; s.concat(\"d\"); System.out.println(s);`?",
    "abc. concat returns a new string, which is discarded."
   ]
  ]
 },
 {
  "t": "StringBuilder methods: append, insert, reverse, delete, replace",
  "body": [
   "`StringBuilder` is the mutable counterpart to `String`. It holds a resizable sequence of characters, and its methods change that sequence in place instead of creating new objects. Use it when you build text in a loop, because repeated `String` concatenation creates a new object on every step. (`StringBuffer` has the same methods but is synchronized; `StringBuilder` is the usual choice.)",
   "Most `StringBuilder` methods modify the object and also return a reference to the same object, which is why calls can be chained: `sb.append(\"a\").append(1).reverse()`. This is the opposite of the `String` trap. With a `StringBuilder`, a call whose result is ignored still changes the object. And because the returned reference is the same object, `StringBuilder b2 = sb.append(\"x\");` makes `b2` and `sb` point to one builder.",
   "`append(x)` adds the text form of almost any type to the end. `insert(offset, x)` puts text before the given index, and the offset may equal `length()` to insert at the end. `reverse()` reverses the characters. `delete(start, end)` removes characters from `start` up to but not including `end`; unlike `substring`, an `end` past the length is allowed and simply treated as the length. `deleteCharAt(i)` removes a single character. `replace(start, end, str)` removes the range `start` to `end` (end exclusive) and inserts `str` in its place, and the replacement can be longer or shorter than what it replaces.",
   "Some methods do not change the builder. `substring`, `charAt`, `indexOf` and `length()` read from it, and `substring` returns a `String`. `toString()` makes a `String` copy of the current content. `setLength(n)` truncates or pads with null characters, and `setCharAt(i, c)` replaces one character.",
   "```java\nStringBuilder sb = new StringBuilder(\"java\");\nsb.append(\"25\");          // java25\nsb.insert(0, \"[\");        // [java25\nsb.append(']');           // [java25]\nsb.replace(1, 5, \"JDK\");  // [JDK25]\nsb.delete(4, 99);         // [JDK\nsb.reverse();             // KDJ[\nSystem.out.println(sb);   // KDJ[\n```",
   "Two comparison traps come up. First, `StringBuilder` does not override `equals`, so `new StringBuilder(\"a\").equals(new StringBuilder(\"a\"))` is `false`; compare with `sb1.compareTo(sb2) == 0` or with `sb1.toString().equals(sb2.toString())`. Second, `sb.equals(\"a\")` is also `false`, because a `StringBuilder` is never equal to a `String`, and `sb == \"a\"` does not even compile because the types are unrelated.",
   "Also know the constructors: `new StringBuilder()` starts empty, `new StringBuilder(\"text\")` starts with content, and `new StringBuilder(20)` starts empty with an initial capacity of 20. Capacity is storage space, not length, so `length()` is still 0."
  ],
  "terms": [
   [
    "StringBuilder",
    "A mutable, non-synchronized sequence of characters whose methods change the object in place."
   ],
   [
    "Method chaining",
    "Calling one method on the result of another; it works with StringBuilder because mutating methods return this."
   ],
   [
    "replace(start, end, str)",
    "Removes the characters from start to end (exclusive) and inserts str there."
   ],
   [
    "Capacity",
    "The amount of storage a StringBuilder has reserved, which is separate from its current length."
   ]
  ],
  "example": "A log formatter builds each line with a StringBuilder: it appends a timestamp, inserts a level tag at position 0, and deletes a trailing comma with `deleteCharAt(sb.length() - 1)`. All of it happens on one object, so formatting thousands of lines creates far fewer temporary strings than using + in a loop.",
  "tip": "Track one StringBuilder object through every line, applying each call even when its result is not assigned. Then check the index math: every range method uses an exclusive end.",
  "check": [
   [
    "What is printed by `StringBuilder sb = new StringBuilder(\"abc\"); sb.reverse(); System.out.println(sb);`?",
    "cba. reverse changes the builder itself, so the ignored return value does not matter."
   ],
   [
    "What does `new StringBuilder(\"12345\").delete(1, 3)` contain?",
    "145. It removes indexes 1 and 2 (the end index 3 is excluded)."
   ],
   [
    "Is `new StringBuilder(\"x\").equals(new StringBuilder(\"x\"))` true?",
    "No. StringBuilder inherits equals from Object, which compares identity, and these are two objects."
   ]
  ]
 },
 {
  "t": "Text blocks: incidental whitespace, \\ line continuation, \\s escape",
  "body": [
   "A text block is a multi-line string literal that starts with three double quotes and ends with three double quotes. It produces an ordinary `String`, so everything you know about strings still applies. Text blocks make embedded JSON, SQL or HTML readable, because you can write quotes and line breaks directly instead of escaping them.",
   "The opening delimiter must be followed by a line terminator: the content always starts on the next line. Writing content on the same line as the opening quotes is a compile error. Each line break in the source becomes a `\\n` in the value (line endings are normalized to `\\n`). If the closing delimiter is on its own line, the string ends with a newline; if it sits at the end of the last content line, there is no trailing newline.",
   "Incidental whitespace is the indentation that exists only because the text block is indented along with your code. The compiler removes it by finding the smallest indentation across all non-blank content lines, and the closing delimiter's line if it is on its own line, then stripping that many leading spaces from every line. Moving the closing delimiter to the left therefore adds indentation to the result, and moving it to the right cannot remove more than the content has. Anything beyond the common indentation is essential whitespace and is kept. Trailing spaces at the end of each line are always stripped.",
   "Escape sequences still work, and two are specific to text blocks. A backslash at the very end of a line (`\\` followed by the line break) is a line continuation: it suppresses that newline, so two source lines become one line in the value. The `\\s` escape is a single space, and because it is an escape rather than a literal space it is not removed by trailing-space stripping, so you can use it to keep trailing spaces. You can include a single double quote freely; three in a row must have at least one escaped, as in `\\\"\"\"`.",
   "```java\nString a = \"\"\"\n    Hello\n      World\n    \"\"\";\n// \"Hello\\n  World\\n\"  (4 spaces of incidental whitespace removed)\n\nString b = \"\"\"\n    one \\\n    two\"\"\";\n// \"one two\"  (continuation joins lines, no trailing newline)\n\nString c = \"\"\"\n    red\\s\n    green\n    \"\"\";\n// \"red \\ngreen\\n\"  (\\s keeps the space)\n```",
   "Count carefully on exam questions: note where the closing delimiter is, compute the common indentation, and then decide whether the last line ends with a newline. Also remember that `\"\"\"abc\"\"\"` on one line does not compile, because content cannot start on the opening line.",
   "In your lab, print a text block wrapped in brackets, as in `System.out.println(\"[\" + block + \"]\");`, so you can see the leading spaces and the final newline that would otherwise be invisible."
  ],
  "terms": [
   [
    "Text block",
    "A multi-line String literal delimited by three double quotes, with content starting on the line after the opening delimiter."
   ],
   [
    "Incidental whitespace",
    "Common leading indentation that the compiler strips from every line of a text block."
   ],
   [
    "Line continuation",
    "A backslash at the end of a text block line, which removes the line break so the next line joins it."
   ],
   [
    "\\s escape",
    "An escape for a single space that survives the stripping of trailing whitespace."
   ]
  ],
  "example": "A developer embeds an SQL query in a text block indented inside a method. When logged, the query shows no leading spaces, because the compiler removed the incidental indentation. To keep a long WHERE clause on one physical line in the output while wrapping it in source, the developer ends the first half with a backslash.",
  "tip": "The closing delimiter's position controls indentation: if it is on its own line and further left than the content, the difference becomes leading spaces. If it is on the last content line, there is no final newline.",
  "check": [
   [
    "Does a text block allow content on the same line as the opening three quotes?",
    "No. The opening delimiter must be followed by a line terminator, so that is a compile error."
   ],
   [
    "Why use `\\s` instead of a plain space at the end of a text block line?",
    "Trailing spaces are stripped from each line, but \\s is an escape that is translated after stripping, so the space is kept."
   ],
   [
    "What does a backslash at the end of a text block line do?",
    "It is a line continuation: the newline is removed, and the next line is joined to the current one."
   ]
  ]
 },
 {
  "t": "Date-Time API: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant",
  "body": [
   "The `java.time` package is Java's modern date and time API. Its classes are immutable and thread-safe, and none of them have public constructors: you create values with static factory methods such as `now()`, `of(...)` and `parse(...)`. Because they are immutable, every method that seems to change a value, like `plusDays`, returns a new object. Forgetting to assign that result is the most common exam trap, exactly as with `String`.",
   "Pick the class by how much information you need. `LocalDate` is a date with no time or zone, such as a birthday (`LocalDate.of(2025, 3, 14)`). `LocalTime` is a time of day with no date, such as an alarm at 07:30. `LocalDateTime` combines both but still has no time zone, so it does not name a single moment on the global timeline. `ZonedDateTime` adds a `ZoneId` such as `America/New_York`, so it pins down an exact moment and knows the zone's offset rules. `Instant` is a point on the timeline measured from the epoch (1970-01-01T00:00:00Z) in UTC, and is the natural type for timestamps in logs and databases.",
   "Months are numbered 1 to 12, unlike the old `Calendar` class, and you can also pass a `Month` enum constant: `LocalDate.of(2025, Month.JANUARY, 31)`. Invalid values are rejected at runtime: `LocalDate.of(2025, 2, 30)` throws a `DateTimeException`. Adding months, however, adjusts to the end of the month instead of failing: January 31 plus one month is February 28 (or 29 in a leap year).",
   "Methods only exist where they make sense. `LocalDate` has `plusDays`, `plusWeeks`, `plusMonths` and `plusYears` but no `plusHours`, so calling `plusHours` on a `LocalDate` does not compile. `LocalTime` has `plusHours` and `plusMinutes` but no `plusDays`. Times wrap around midnight: `LocalTime.of(23, 0).plusHours(2)` is 01:00. Getters include `getYear()`, `getMonth()` (an enum), `getMonthValue()` (an int), `getDayOfWeek()` and `getHour()`.",
   "You convert between the types by adding or removing information. `date.atTime(9, 0)` gives a `LocalDateTime`, `ldt.atZone(ZoneId.of(\"Europe/Paris\"))` gives a `ZonedDateTime`, `zdt.toInstant()` gives an `Instant`, and `instant.atZone(zone)` goes back. `ldt.toLocalDate()` drops the time. Comparisons use `isBefore`, `isAfter` and `isEqual`, or `compareTo`.",
   "```java\nLocalDate d = LocalDate.of(2025, 1, 31);\nd.plusDays(1);                      // result discarded\nSystem.out.println(d);              // 2025-01-31\nLocalDate next = d.plusMonths(1);\nSystem.out.println(next);           // 2025-02-28\nLocalDateTime ldt = next.atTime(14, 5);\nSystem.out.println(ldt);            // 2025-02-28T14:05\nZonedDateTime z = ldt.atZone(ZoneId.of(\"UTC\"));\nSystem.out.println(z.toInstant());  // 2025-02-28T14:05:00Z\n```",
   "For text output, `DateTimeFormatter` formats and parses. `DateTimeFormatter.ofPattern(\"yyyy-MM-dd HH:mm\")` uses `MM` for month and `mm` for minutes, and `HH` for a 24-hour clock versus `hh` for 12-hour. Mixing those up is a classic mistake. Formatting a `LocalDate` with a pattern that includes hours throws an exception at runtime, because the date has no time field."
  ],
  "terms": [
   [
    "LocalDate",
    "An immutable date (year, month, day) with no time of day and no time zone."
   ],
   [
    "LocalDateTime",
    "A date and time without a zone, so it does not identify a single global instant."
   ],
   [
    "ZonedDateTime",
    "A date and time with a ZoneId, which identifies an exact moment and applies that zone's offset and daylight saving rules."
   ],
   [
    "Instant",
    "A point on the UTC timeline measured from the epoch 1970-01-01T00:00:00Z."
   ]
  ],
  "example": "An airline stores departure times as ZonedDateTime so that a flight leaving Tokyo and landing in Los Angeles shows the correct local time at each airport, while the booking system logs every change as an Instant so all servers agree on the order of events regardless of where they run.",
  "tip": "When a date-time method call is not assigned, the object is unchanged. Also check that the method exists on that type: LocalDate has no plusHours, and LocalTime has no plusDays.",
  "check": [
   [
    "Which class would you use for a store's opening time that is the same every day?",
    "LocalTime, because it represents a time of day without a date or a zone."
   ],
   [
    "What happens with `LocalDate.of(2025, 4, 31)`?",
    "It throws a DateTimeException at runtime, because April has only 30 days."
   ],
   [
    "What is `LocalDate.of(2024, 1, 31).plusMonths(1)`?",
    "2024-02-29. 2024 is a leap year, and plusMonths clamps to the last valid day of the month."
   ]
  ]
 },
 {
  "t": "Period vs Duration and daylight saving time transitions",
  "body": [
   "Java separates two kinds of amounts of time. A `Period` is a date-based amount in years, months and days, such as \"2 months and 3 days\". A `Duration` is a time-based amount in seconds and nanoseconds, created from days, hours, minutes or seconds. The difference matters because a month or a calendar day does not always have the same length, while a `Duration` is always an exact number of seconds.",
   "Create them with static factories: `Period.of(1, 2, 3)`, `Period.ofDays(10)`, `Period.ofWeeks(2)` (stored as 14 days), and `Duration.ofHours(5)`, `Duration.ofMinutes(90)`, `Duration.ofDays(1)` (stored as 24 hours). You can also measure between values: `Period.between(date1, date2)` for `LocalDate` values, and `Duration.between(t1, t2)` for times. The `toString` formats follow ISO-8601: a `Period` prints like `P1Y2M3D` and a `Duration` prints like `PT1H30M`. `Duration.ofDays(1)` prints `PT24H`.",
   "One trap is chaining factories. `Period.ofYears(1).ofMonths(2)` looks like it builds 1 year and 2 months, but `ofMonths` is a static method, so the call ignores the first object and the result is just `P2M`. Use `Period.of(1, 2, 0)` or `withMonths`/`plusMonths` instead. Another trap is using the wrong amount for the type: a `Period` with a non-zero amount cannot be added to a `LocalTime`, and a `Duration` cannot be added to a `LocalDate`; both compile but throw `UnsupportedTemporalTypeException` at runtime.",
   "Daylight saving time (DST) is where `Period` and `Duration` behave differently on a `ZonedDateTime`. In the spring, clocks jump forward and a local hour is skipped (a gap). In the fall, clocks go back and a local hour repeats (an overlap). A `ZonedDateTime` handles this with its zone rules. If you create a time that falls in a gap, it moves forward by the length of the gap, so 02:30 on a spring-forward day in New York becomes 03:30. In an overlap, it keeps the earlier offset by default.",
   "Date-based arithmetic keeps the local time of day, while time-based arithmetic adds exact elapsed time. On the day before a spring-forward change, `zdt.plusDays(1)` or `zdt.plus(Period.ofDays(1))` gives the same clock time the next day, even though only 23 real hours pass. `zdt.plusHours(24)` or `zdt.plus(Duration.ofDays(1))` adds exactly 24 hours, so the clock reading ends up one hour later.",
   "```java\nZoneId ny = ZoneId.of(\"America/New_York\");\n// US clocks spring forward at 02:00 on 2025-03-09\nZonedDateTime z = ZonedDateTime.of(2025, 3, 8, 12, 0, 0, 0, ny);\nSystem.out.println(z.plusDays(1));   // 2025-03-09T12:00-04:00[America/New_York]\nSystem.out.println(z.plusHours(24)); // 2025-03-09T13:00-04:00[America/New_York]\n```",
   "Notice the offset in the output changes from -05:00 to -04:00 across the transition. When a question prints a `ZonedDateTime`, read both the clock time and the offset. Converting both to `Instant` is a reliable way to check how much real time has passed."
  ],
  "terms": [
   [
    "Period",
    "A date-based amount of time in years, months and days, printed like P1Y2M3D."
   ],
   [
    "Duration",
    "A time-based amount stored as seconds and nanoseconds, printed like PT2H30M."
   ],
   [
    "DST gap",
    "The skipped local hour when clocks spring forward; a time inside it is shifted forward by the gap length."
   ],
   [
    "DST overlap",
    "The repeated local hour when clocks fall back; ZonedDateTime keeps the earlier offset by default."
   ]
  ],
  "example": "A subscription renews monthly, so billing uses `plus(Period.ofMonths(1))` to keep the same calendar day, while a parking app charges by elapsed time and uses `Duration.between(entry, exit)` on Instant values, so a car parked across a DST change is billed for the hours actually used.",
  "tip": "Remember Period for dates (P...Y...M...D) and Duration for times (PT...H...M...S). Across a DST change, plusDays keeps the wall-clock time, while plusHours(24) keeps the exact elapsed time.",
  "check": [
   [
    "What does `Period.ofDays(3).ofWeeks(1)` produce?",
    "P7D. ofWeeks is static, so the first call's result is ignored and one week is stored as 7 days."
   ],
   [
    "What happens to `ZonedDateTime` 02:30 local time on a spring-forward day when that hour is skipped?",
    "It is adjusted forward by the length of the gap, typically to 03:30 with the new offset."
   ],
   [
    "Can you add `Duration.ofHours(2)` to a `LocalDate`?",
    "It compiles but throws UnsupportedTemporalTypeException at runtime, because LocalDate has no time units."
   ]
  ]
 },
 {
  "t": "If/else and the ternary operator",
  "body": [
   "An `if` statement runs a block only when its condition is `true`. The condition must be a `boolean` expression; unlike C, Java will not treat an `int` as true or false, so `if (count)` does not compile. An optional `else` runs when the condition is `false`, and you can chain decisions with `else if`. Only the first branch whose condition is true runs.",
   "Braces are optional when a branch has a single statement, and this is where many exam questions hide. Without braces, only the next statement belongs to the `if`, no matter how it is indented. An `else` always attaches to the nearest preceding unmatched `if`, which is known as the dangling else. Reading indentation instead of structure leads to the wrong answer.",
   "```java\nint x = 5;\nif (x > 10)\n    System.out.println(\"big\");\n    System.out.println(\"always\");   // not part of the if\n\nif (x > 0)\n    if (x > 10) System.out.println(\"A\");\nelse System.out.println(\"B\");        // belongs to the inner if: prints B\n```",
   "Watch for assignment inside a condition. `if (flag = false)` compiles when `flag` is a `boolean`, because the assignment's value is `false`, and the branch never runs. With an `int`, `if (n = 5)` does not compile because the result is an `int`. Also note that a stray semicolon, as in `if (x > 10);`, makes the `if` control an empty statement, and the block that follows always runs.",
   "The ternary (conditional) operator `condition ? valueIfTrue : valueIfFalse` is an expression, so it produces a value and can be used in assignments, method arguments and return statements. Only one of the two value expressions is evaluated, so side effects in the other branch do not happen: `int y = true ? x++ : x--;` increments `x` only. The ternary has low precedence (just above assignment) and is right-associative, so `a ? b : c ? d : e` means `a ? b : (c ? d : e)`.",
   "The result type of a ternary depends on both branches. If one branch is `int` and the other is `double`, numeric promotion makes the result `double`, so `int r = flag ? 1 : 2.0;` does not compile. If the branches are unrelated types, such as `String` and `Integer`, the result is a common supertype, which is fine for `Object o = flag ? \"a\" : 1;` but not for `String s = flag ? \"a\" : 1;`. A ternary cannot stand alone as a statement: `flag ? a() : b();` does not compile.",
   "Use `if/else` when you are choosing between actions, and a ternary when you are choosing between two values. Deeply nested ternaries compile but are hard to read; exam questions use them precisely because they are easy to misread, so add parentheses mentally from right to left."
  ],
  "terms": [
   [
    "Conditional expression",
    "The ternary operator cond ? a : b, which evaluates to one of two values depending on a boolean."
   ],
   [
    "Dangling else",
    "The rule that an else attaches to the closest unmatched if, regardless of indentation."
   ],
   [
    "Boolean condition",
    "An expression of type boolean or Boolean, the only kind accepted by if, while and the ternary operator."
   ],
   [
    "Empty statement",
    "A lone semicolon; after if(...) it becomes the entire body of the if."
   ]
  ],
  "example": "A shipping page shows `String label = weight > 20 ? \"Freight\" : \"Standard\";`. When a teammate later adds a second action to an unbraced `if` for free-shipping customers, the second line runs for everyone. Code review catches it, and the team adopts a rule to always use braces.",
  "tip": "Ignore indentation. Count statements: without braces, only one statement belongs to the if or else, and every else binds to the nearest unmatched if.",
  "check": [
   [
    "What is the type of `true ? 1 : 2L`?",
    "long. Binary numeric promotion applies to the two branches, so the int is widened to long."
   ],
   [
    "Does `if (5) { }` compile in Java?",
    "No. The condition must be boolean; Java does not convert numbers to booleans."
   ],
   [
    "In `int a = 1; int b = (a > 0) ? a++ : a--;`, what are a and b?",
    "a is 2 and b is 1. Only the true branch runs, and the postfix a++ yields 1 before incrementing."
   ]
  ]
 },
 {
  "t": "Classic switch statements, fall-through and break",
  "body": [
   "A `switch` statement picks one of several code paths by comparing a value against `case` labels. In the classic form, each label ends with a colon, and the code after the matching label runs. The selector can be a `char`, `byte`, `short` or `int` (or their wrappers), a `String`, or an `enum`. It cannot be a `long`, `float`, `double` or `boolean` in a classic switch. (Pattern-matching switches, covered later, accept any reference type.)",
   "Each `case` label must be a compile-time constant of a type compatible with the selector: a literal, an enum constant, or a `final` variable initialized with a constant. A non-final variable or a method call as a label does not compile. Duplicate labels are also a compile error. Since Java 14 one `case` can list several values separated by commas, as in `case 1, 2, 3:`. For an enum selector you traditionally write the bare constant name, such as `case MONDAY:`.",
   "Fall-through is the defining behavior of the colon form. Once a label matches, execution continues through all the following statements, including those under later labels, until it reaches a `break`, a `return`, a thrown exception or the end of the switch. Labels are just entry points; they do not stop execution. This is useful for grouping, but it is usually a bug when a `break` is missing.",
   "```java\nint day = 2;\nswitch (day) {\n    case 1:\n        System.out.print(\"Mon \");\n    case 2:\n        System.out.print(\"Tue \");\n    case 3:\n        System.out.print(\"Wed \");\n        break;\n    default:\n        System.out.print(\"Other \");\n}\n// prints: Tue Wed\n```",
   "The `default` label runs when no case matches, and it does not have to be last. If it is in the middle and it is reached, fall-through still applies, so the statements under the labels after it run too until a `break`. If the value matches no case and there is no `default`, a classic switch statement simply does nothing; it does not need to cover every value.",
   "Two runtime points appear on the exam. Switching on a `String` uses `equals`, so it is case-sensitive, and switching on a `null` `String`, wrapper or enum reference without a `case null` label throws a `NullPointerException`. And a `break` inside a switch that is inside a loop only leaves the switch, not the loop; use a labeled break or a `return` to leave the loop.",
   "When you trace a classic switch, find the entry point first (the matching label or `default`), then read downward, printing everything until the first `break`. Do not stop at the next `case` label."
  ],
  "terms": [
   [
    "Fall-through",
    "In a colon-form switch, execution continuing into the next case's statements when there is no break."
   ],
   [
    "case label",
    "A compile-time constant that marks an entry point in a switch."
   ],
   [
    "default label",
    "The entry point used when no case matches; it may appear anywhere in the switch."
   ],
   [
    "Selector expression",
    "The value in switch(...) that is compared with the case labels."
   ]
  ],
  "example": "A menu handler uses a classic switch over the chosen option. A developer adds a new `case 4:` for \"Export\" but forgets the break, so choosing Export also runs the \"Delete\" code under `case 5:`. Switching the code to arrow labels, which never fall through, prevents that class of bug.",
  "tip": "Find where execution enters the switch, then keep going downward past every label until you hit break or the closing brace. A default in the middle still falls through.",
  "check": [
   [
    "Can a classic switch use a `long` selector?",
    "No. Classic switch supports char, byte, short, int, their wrappers, String and enums, but not long, float, double or boolean."
   ],
   [
    "Does `int v = 3; switch (x) { case v: ... }` compile?",
    "No. A case label must be a compile-time constant, and v is not final. Declaring it final int v = 3 would work."
   ],
   [
    "What prints if `x` is 9 in `switch (x) { default: print(\"D\"); case 1: print(\"1\"); break; case 2: print(\"2\"); }`?",
    "D1. The default is entered, then execution falls through into case 1 until the break."
   ]
  ]
 },
 {
  "t": "Switch expressions with arrow labels, multiple labels and yield",
  "body": [
   "A switch expression is a `switch` that produces a value, so you can assign it, return it or pass it as an argument. It is usually written with arrow labels: `case X -> result;`. Arrow labels never fall through, so exactly one branch runs and no `break` is needed. When a switch expression is used as a statement on the right side of an assignment, the whole thing ends with a semicolon after the closing brace.",
   "```java\nint day = 6;\nString type = switch (day) {\n    case 1, 2, 3, 4, 5 -> \"Weekday\";\n    case 6, 7 -> \"Weekend\";\n    default -> throw new IllegalArgumentException(\"bad day\");\n};\n```",
   "The right side of an arrow can be an expression, a block in braces, or a `throw` statement. When it is a block, the block must produce its value with `yield`, as in `case 3 -> { log(\"three\"); yield \"Wed\"; }`. `yield` is to a switch expression what `return` is to a method. Using `return` inside a switch expression is a compile error, because you cannot jump out of an expression, and `break` cannot be used to leave it either.",
   "A switch expression must be exhaustive: every possible selector value must be handled. For an `int` or `String` selector that means a `default` branch is required. For an enum, covering every constant is enough and `default` is optional. Every branch must also produce a value compatible with the target type, or throw. If one branch yields a `String` and another an `int`, assigning to `String` fails.",
   "Multiple labels are listed with commas, `case \"a\", \"e\", \"i\" ->`, and each label must still be a constant and unique. You cannot mix colon labels and arrow labels in the same switch. You can, however, write a switch expression with old colon labels; in that case each group must end with `yield` (or throw), and fall-through between groups is possible, so the arrow form is preferred.",
   "Arrow labels also work in switch statements, which then behave like tidy switches without fall-through and without a value. A switch statement with arrows over an `int` does not need to be exhaustive, but a switch expression always does. That difference is a common exam question: the same switch body can compile as a statement and fail as an expression because a `default` is missing.",
   "```java\nint score = 72;\nchar grade = switch (score / 10) {\n    case 10, 9 -> 'A';\n    case 8 -> 'B';\n    case 7 -> {\n        System.out.println(\"close to B\");\n        yield 'C';\n    }\n    default -> 'F';\n};\nSystem.out.println(grade); // prints close to B, then C\n```"
  ],
  "terms": [
   [
    "Switch expression",
    "A switch that evaluates to a value; it must be exhaustive and cannot fall through when using arrow labels."
   ],
   [
    "Arrow label",
    "case X -> ..., a label whose right side is a single expression, block or throw, with no fall-through."
   ],
   [
    "yield",
    "A statement that supplies the value of a switch expression from inside a block or a colon-style group."
   ],
   [
    "Exhaustiveness",
    "The requirement that a switch expression handles every possible value of its selector."
   ]
  ],
  "example": "A pricing service maps a subscription tier to a monthly fee with a switch expression over an enum. When the product team adds a new PLATINUM tier, the build fails at that switch because it is no longer exhaustive, so the missing price is noticed before release instead of in production.",
  "tip": "In a switch expression, look for three errors: a missing default for int or String selectors, a block branch without yield, and a return or break used to leave the expression.",
  "check": [
   [
    "Does a switch expression over a `String` compile without a `default`?",
    "No. The possible String values are unlimited, so default is needed for exhaustiveness."
   ],
   [
    "How does a block branch of a switch expression return its value?",
    "With a yield statement, for example yield 42;. return is not allowed there."
   ],
   [
    "Can one switch mix `case 1:` and `case 2 ->`?",
    "No. A single switch must use either colon labels or arrow labels, not both."
   ]
  ]
 },
 {
  "t": "Pattern matching in switch: type patterns, record patterns and when guards",
  "body": [
   "Pattern matching lets a `switch` test the type and shape of a value, not just compare it with constants. The selector can be any reference type, such as `Object` or a sealed interface. Each `case` holds a pattern, and when the pattern matches, its variables are bound and ready to use in that branch. This replaces long chains of `instanceof` checks and casts.",
   "A type pattern names a type and a variable: `case String s -> s.length();`. If the selector's runtime object is a `String`, it is bound to `s` with type `String`. The pattern variable is in scope only in that case's branch. A pattern switch can also include `case null ->` to handle null explicitly; without it, a null selector throws `NullPointerException`. `case null` can be combined with default as `case null, default ->`.",
   "A record pattern deconstructs a record into its components: given `record Point(int x, int y)`, the label `case Point(int x, int y) -> x + y;` matches any `Point` and binds its components through the accessors. You may use `var` for components (`case Point(var x, var y)`), and patterns can nest, as in `case Line(Point(var x1, var y1), Point p2) ->`. Since Java 22 you can use the unnamed pattern `_` for a component you do not need, such as `case Point(var x, _)`.",
   "A guard adds a condition with `when`: `case Integer i when i > 100 -> \"large\";`. The case matches only if the pattern matches and the guard is `true`. The guard can use the pattern variables, and it must be a `boolean` expression. If the guard is false, the switch moves on and tries the next case labels.",
   "```java\nsealed interface Shape permits Circle, Square {}\nrecord Circle(double r) implements Shape {}\nrecord Square(double side) implements Shape {}\n\nstatic String describe(Object o) {\n    return switch (o) {\n        case null -> \"nothing\";\n        case Circle(double r) when r > 10 -> \"big circle\";\n        case Circle c -> \"circle \" + c.r();\n        case Square(var s) -> \"square \" + s;\n        case String str -> \"text of length \" + str.length();\n        default -> \"unknown\";\n    };\n}\n```",
   "Cases are tried from top to bottom, so order matters: the first matching label wins. A guarded case must come before the unguarded case for the same type, or the compiler reports that it is dominated. Because the selector here is `Object`, a `default` is needed for exhaustiveness. A pattern switch statement, not just an expression, must also be exhaustive.",
   "In a lab, write a pattern switch over `Object`, run it with a `String`, an `Integer`, a record and `null`, and then deliberately move a guarded case below the unguarded one to read the compiler's error message."
  ],
  "terms": [
   [
    "Type pattern",
    "A pattern like String s that matches when the value is an instance of the type and binds it to a variable."
   ],
   [
    "Record pattern",
    "A pattern like Point(int x, int y) that matches a record and extracts its components."
   ],
   [
    "Guard",
    "A when clause after a pattern that adds a boolean condition for the case to match."
   ],
   [
    "case null",
    "A label that lets a pattern switch handle a null selector instead of throwing NullPointerException."
   ]
  ],
  "example": "An events system receives messages as a sealed interface with records such as `Login(String user)` and `Payment(String user, long cents)`. A single pattern switch routes each record, with `case Payment(var u, var c) when c > 1_000_000 ->` sending large payments to manual review before the ordinary Payment case.",
  "tip": "Read pattern cases top to bottom and pick the first that matches, checking the guard too. A null selector throws NullPointerException unless there is a case null label.",
  "check": [
   [
    "What does `case Integer i when i > 0 ->` match?",
    "Only Integer values greater than zero; the type must match and the guard must be true."
   ],
   [
    "What happens if a pattern switch receives `null` and has no `case null`?",
    "It throws NullPointerException, even if there is a default label."
   ],
   [
    "What does a record pattern such as `case Point(var x, var y)` do?",
    "It matches a Point and binds x and y to its components, with types inferred from the record's component types."
   ]
  ]
 },
 {
  "t": "Case dominance and exhaustiveness (enums, sealed types, default)",
  "body": [
   "Two compiler checks make pattern-matching switches safe: dominance and exhaustiveness. Dominance makes sure every case can be reached. Exhaustiveness makes sure every possible value is handled. Both are compile-time errors, so exam questions usually ask whether a switch compiles.",
   "A case label is dominated when an earlier label matches every value it would match, so it could never run. The main rules are: a type pattern dominates a later pattern of the same type or a subtype (`case CharSequence cs` before `case String s` is an error); an unguarded pattern dominates a guarded pattern of the same type (`case Integer i` before `case Integer i when i > 5` is an error); and a pattern dominates a later constant label of that type (`case Integer i` before `case 42` is an error). The fix is to order cases from most specific to most general. A guarded pattern does not dominate a later pattern, because the compiler cannot know whether the guard is true, but constant labels should still come before any pattern of their type, guarded or not.",
   "`default` also takes part. In a switch that uses patterns, a pattern label after `default` is an error, since `default` would dominate it. The safe habit is to put `default` last. Also, a switch cannot have both a `default` and an unconditional pattern such as `case Object o` when the selector is `Object`, because both would match everything.",
   "Exhaustiveness is required for every switch expression and for any switch statement that uses patterns or `case null`. For an `enum` selector, listing every constant makes the switch exhaustive. For a sealed type, covering every permitted subtype makes it exhaustive, and no `default` is needed. Otherwise, add `default` or an unconditional pattern. A classic switch statement over an `int`, `String` or `enum` with only constant labels is still allowed to skip values.",
   "```java\nsealed interface Vehicle permits Car, Truck {}\nfinal class Car implements Vehicle {}\nfinal class Truck implements Vehicle {}\n\nint wheels(Vehicle v) {\n    return switch (v) {     // exhaustive without default\n        case Car c -> 4;\n        case Truck t -> 6;\n    };\n}\n\n// Does not compile: second case is dominated\n// switch (obj) { case Number n -> 1; case Integer i -> 2; default -> 0; }\n```",
   "Relying on exhaustiveness instead of `default` is a design choice. If someone later adds a permitted subtype or a new enum constant, every switch that lacks `default` stops compiling, pointing to exactly the code that needs updating. If code compiled against the old version runs with a new subtype or constant it does not know about, the switch throws a `MatchException` at runtime (for sealed types; older enum switches used `IncompatibleClassChangeError`).",
   "When checking an answer, first ask: can any later case ever be reached? Then ask: is there a value no case handles? A switch must pass both questions to compile."
  ],
  "terms": [
   [
    "Dominance",
    "A case is dominated when an earlier case matches every value it could match, which makes it unreachable and is a compile error."
   ],
   [
    "Exhaustive switch",
    "A switch whose cases cover every possible selector value, required for switch expressions and pattern switches."
   ],
   [
    "Unconditional pattern",
    "A pattern that matches every value of the selector's type, such as case Object o for an Object selector."
   ],
   [
    "MatchException",
    "The runtime exception an exhaustive switch throws if it meets a value its compiled cases do not cover, such as a newly added subtype."
   ]
  ],
  "example": "A tax engine has a sealed interface `Income` with permitted records `Salary`, `Dividend` and `Rent`. Its switch expressions have no default. When the team adds `Royalty` to the permits list, the compiler flags every switch that needs a new case, so no tax rule is silently skipped.",
  "tip": "Order pattern cases from specific to general: subtypes before supertypes, guarded before unguarded, constants before type patterns, default last.",
  "check": [
   [
    "Why does `case Integer i -> ...; case Integer i when i > 0 -> ...;` fail to compile?",
    "The unguarded Integer pattern matches every value the guarded one would, so the second case is dominated."
   ],
   [
    "Does a switch expression over a sealed interface need `default` if every permitted subtype has a case?",
    "No. Covering every permitted subtype makes it exhaustive."
   ],
   [
    "Does a classic switch statement over an enum with constant labels need to cover every constant?",
    "No. Only switch expressions and pattern switches must be exhaustive."
   ]
  ]
 },
 {
  "t": "While, do-while, for and enhanced for loops",
  "body": [
   "Java has four loop forms. A `while` loop checks its `boolean` condition before each iteration, so its body may run zero times. A `do-while` loop runs the body first and checks the condition afterwards, so its body always runs at least once. The `do-while` must end with a semicolon after the condition: `do { ... } while (x < 3);`. Leaving it out is a compile error.",
   "The basic `for` loop has three parts in parentheses: initialization, condition and update, as in `for (int i = 0; i < 5; i++)`. The initialization runs once, the condition is checked before each iteration, and the update runs after each iteration. All three parts are optional, so `for (;;)` is an infinite loop. The initialization can declare several variables of the same type (`int i = 0, j = 10`) but not of different types, and the update can list several expressions separated by commas (`i++, j--`). A variable declared in the initialization exists only inside the loop.",
   "The enhanced `for` loop (for-each) iterates over an array or any object that implements `Iterable`, such as a `List` or `Set`: `for (String name : names)`. The loop variable is a copy of each element, so assigning to it does not change the array or collection. It does not give you an index, and you cannot use it on a `Map` directly; loop over `map.keySet()`, `map.values()` or `map.entrySet()` instead. Structurally modifying a collection, such as calling `list.remove` inside a for-each over that list, usually throws `ConcurrentModificationException`.",
   "```java\nint i = 10;\nwhile (i < 3) { i++; }        // body never runs\ndo { i++; } while (i < 3);   // runs once: i is 11\n\nfor (int a = 0, b = 5; a < b; a++, b--) {\n    System.out.print(a + \"\" + b + \" \");  // 05 14 23\n}\n\nint[] nums = {1, 2, 3};\nfor (int n : nums) { n *= 10; }\nSystem.out.println(nums[0]);  // 1: the array is unchanged\n```",
   "Infinite loops matter for compilation. `while (true) { }` with no `break` means any statement after the loop is unreachable, which is a compile error. The same is true of `for (;;)`. With a `break` inside, the code after the loop becomes reachable again. The next lessons cover `break`, `continue` and unreachable code in detail.",
   "Choose the loop by intent. Use `while` when you do not know how many iterations you need, `do-while` when the body must run at least once (such as prompting for input), `for` when you count or need an index, and enhanced `for` when you simply visit every element in order.",
   "When tracing loops on the exam, make a small table with one row per iteration and one column per variable, and note when the condition is tested. Most mistakes come from being off by one iteration."
  ],
  "terms": [
   [
    "do-while loop",
    "A loop that runs its body once before testing the condition, so it always executes at least once."
   ],
   [
    "Enhanced for loop",
    "for (T x : source), which visits each element of an array or Iterable without an index."
   ],
   [
    "Iterable",
    "The interface that lets an object be used as the source of an enhanced for loop."
   ],
   [
    "Infinite loop",
    "A loop whose condition never becomes false, such as while(true) or for(;;), usually exited with break or return."
   ]
  ],
  "example": "A command-line tool keeps asking for a password with a do-while loop until the input matches the rules, because it must ask at least once. It then uses an enhanced for loop to print each of the user's saved profiles from a List.",
  "tip": "Check whether the condition is tested before or after the body: while and for can run zero times, do-while always runs at least once. Also check that do-while ends with a semicolon.",
  "check": [
   [
    "How many times does `int x = 5; do { x++; } while (x < 5);` run its body?",
    "Once. The body runs before the condition is tested, and then 6 < 5 is false."
   ],
   [
    "Does `for (int i = 0, long j = 0; i < 3; i++)` compile?",
    "No. All variables declared in the initialization must share one type."
   ],
   [
    "Does assigning to the loop variable in `for (int n : arr)` change the array?",
    "No. The loop variable holds a copy of each element."
   ]
  ]
 },
 {
  "t": "Break and continue, including labeled statements",
  "body": [
   "`break` and `continue` change the normal flow of a loop. `break` ends the innermost enclosing loop (or `switch`) immediately, and execution continues with the statement after it. `continue` skips the rest of the current iteration and goes straight to the next one. In a `for` loop, `continue` still runs the update expression (such as `i++`) before testing the condition again; in a `while` or `do-while` loop it jumps to the condition test.",
   "Without a label, both statements affect only the innermost loop. That is often not what you want with nested loops. A label is an identifier followed by a colon placed before a statement, such as `outer: for (...)`. Then `break outer;` ends the labeled loop entirely, and `continue outer;` ends the current iteration of the inner loop and moves on to the next iteration of the labeled outer loop.",
   "```java\nouter:\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (j == 2) continue outer;  // skip rest of inner loop\n        if (i == 3) break outer;     // leave both loops\n        System.out.print(i + \"\" + j + \" \");\n    }\n}\n// prints: 11 21\n```",
   "Trace that example carefully. When `i` is 1, `j` is 1 and `11` prints; then `j` is 2 and `continue outer` jumps to `i = 2`. The same happens for `i = 2`, printing `21`. When `i` is 3 and `j` is 1, `break outer` ends everything. Note that the checks come before the print, so their order decides the output.",
   "There are rules about where these statements may appear. `continue` is only allowed inside a loop; using it in a plain `switch` or `if` outside a loop is a compile error. `continue` with a label must name a loop. `break` may appear in a loop or a `switch`, and a labeled `break` can even name a labeled block or `if` statement, although that is rare. Using a label that does not enclose the statement is a compile error. Also, any statement directly after a `break` or `continue` in the same block is unreachable and does not compile.",
   "Inside a switch that sits in a loop, an unlabeled `break` exits only the switch, while `continue` affects the loop, since a switch is not a loop. And `break` cannot be used to leave a switch expression: there you must `yield` a value instead.",
   "Labels are legal on any statement, but they only matter for `break` and `continue`. By convention they are written in lowercase or uppercase words, and they live in their own namespace, so a label can have the same name as a variable. Use them sparingly: when you find yourself needing a labeled break, extracting the nested loop into a method and using `return` is often clearer."
  ],
  "terms": [
   [
    "break",
    "Ends the innermost enclosing loop or switch, or the labeled statement it names."
   ],
   [
    "continue",
    "Skips the rest of the current iteration of the innermost loop, or of the labeled loop it names."
   ],
   [
    "Label",
    "An identifier followed by a colon placed before a statement so that break or continue can target it."
   ],
   [
    "Nested loop",
    "A loop inside another loop; an unlabeled break or continue affects only the inner one."
   ]
  ],
  "example": "A seating app searches a 2D array of seats for the first free one. As soon as it finds one, it uses `break search;` to leave both the row loop and the column loop, instead of setting a flag and checking it in the outer loop.",
  "tip": "Ask which loop each break or continue refers to. With no label it is always the innermost loop; with a label it is the loop that carries that label. Remember that continue in a for loop still runs the update.",
  "check": [
   [
    "What does `continue outer;` do when it runs inside an inner loop?",
    "It abandons the rest of the inner loop and starts the next iteration of the loop labeled outer, including its update step."
   ],
   [
    "Can `continue` be used inside a switch that is not inside any loop?",
    "No. continue must be inside a loop, so that is a compile error."
   ],
   [
    "In a switch inside a for loop, what does an unlabeled `break` in a case do?",
    "It exits the switch only; the loop keeps running."
   ]
  ]
 },
 {
  "t": "Unreachable code and definite assignment compile errors",
  "body": [
   "The Java compiler performs flow analysis on every method. Two of its checks produce errors that the exam loves: statements that can never run (unreachable code), and local variables that might be read before they have a value (definite assignment). Both are compile-time errors, not warnings, so a question that seems to be about output may really be about whether the code compiles.",
   "A statement is unreachable if the compiler can prove control never gets there. The common cases are statements directly after `return`, `throw`, `break` or `continue` in the same block; code after an infinite loop such as `while (true)` or `for (;;)` that contains no `break` to exit it; and the body of `while (false)`. The analysis uses only constant expressions: `while (true)` is known to loop forever, but `boolean t = true; while (t)` is not, because `t` is not a constant, unless it is declared `final`.",
   "`if` statements are a deliberate exception. `if (false) { ... }` compiles, so that developers can switch blocks of code on and off with a constant flag. So `while (false) { x++; }` is an error but `if (false) { x++; }` is fine. The exemption covers only the condition, though: if both the `if` and the `else` branch end with `return` or `throw`, a statement placed after the whole `if-else` is unreachable and does not compile.",
   "```java\nint f() {\n    return 1;\n    // System.out.println(\"hi\");  // unreachable: does not compile\n}\n\nvoid g() {\n    while (true) { }\n    // System.out.println(\"done\"); // unreachable\n}\n\nvoid h() {\n    for (int i = 0; ; i++) {\n        if (i > 3) break;\n    }\n    System.out.println(\"ok\");     // reachable because of break\n}\n```",
   "Definite assignment means that the compiler must be able to prove that a local variable has been assigned before it is read, along every possible path. Fields and array elements get default values, but local variables do not. If a variable is assigned only in some branches of an `if` with no `else`, or only inside a loop (which might run zero times), reading it afterwards is a compile error. Assigning in both the `if` and `else` branches, or in every branch of an exhaustive switch, satisfies the rule.",
   "```java\nint x;\nif (Math.random() > 0.5) x = 1;\n// System.out.println(x);   // does not compile: x might not be initialized\n\nint y;\nif (Math.random() > 0.5) y = 1; else y = 2;\nSystem.out.println(y);      // OK\n```",
   "The same analysis governs `final` locals: a `final` variable may be declared without a value and assigned later, but it must be assigned exactly once on every path. Assigning it twice, or in a loop, is an error. A method with a non-void return type must return a value on every path or end in a `throw`; otherwise you get a \"missing return statement\" error."
  ],
  "terms": [
   [
    "Unreachable statement",
    "A statement the compiler can prove will never execute, which is a compile-time error in Java."
   ],
   [
    "Definite assignment",
    "The compiler rule that a local variable must be assigned on every path before it is read."
   ],
   [
    "Constant expression",
    "An expression the compiler can evaluate, such as true or a final variable holding a literal, used in reachability analysis."
   ],
   [
    "Missing return statement",
    "The error reported when a non-void method can reach its end without returning a value."
   ]
  ],
  "example": "A developer temporarily adds `return;` at the top of a method to skip some logic while debugging, and the build breaks with \"unreachable statement\". Changing it to `if (true) return;` compiles, because if statements are exempt from the unreachable-code rule.",
  "tip": "Treat if(false) and while(false) differently: the first compiles, the second does not. For locals, trace every path, including a loop that runs zero times and an if without else.",
  "check": [
   [
    "Does `while (false) { System.out.println(1); }` compile?",
    "No. The body is unreachable because the condition is the constant false."
   ],
   [
    "Does `int x; for (int i = 0; i < 3; i++) x = i; System.out.println(x);` compile?",
    "No. The compiler cannot prove the loop body runs, so x is not definitely assigned."
   ],
   [
    "Is code after `while (true) { if (done()) break; }` reachable?",
    "Yes. The break makes it possible for control to leave the loop."
   ]
  ]
 },
 {
  "t": "Classes, fields, methods, constructors, initializer blocks and initialization order",
  "body": [
   "A class is a blueprint that declares fields (the state each object or the class holds), methods (behavior) and constructors (code that sets up a new object). An instance field belongs to each object, while a `static` field belongs to the class and is shared. A source file can contain many top-level classes, but at most one may be `public`, and that one must match the file name.",
   "A constructor has the class's name and no return type. If you write `void MyClass()`, you have written a method, not a constructor. If a class declares no constructor at all, the compiler adds a no-argument default constructor. As soon as you declare any constructor, that default disappears, so `new MyClass()` stops compiling if you only declared `MyClass(int x)`. Every constructor's body starts, explicitly or implicitly, with a call to `super(...)` or `this(...)`; if you write neither, the compiler inserts `super()`, which fails if the parent has no no-arg constructor.",
   "Initializer blocks are blocks of code in the class body. A `static { ... }` block runs once when the class is initialized, which happens the first time the class is really used (for example when an instance is created or a static member is accessed). An instance initializer, a plain `{ ... }` block, runs every time an object is created. Field initializers such as `int count = 5;` behave the same way as initializer blocks and run in the order they appear in the source.",
   "The full order when you create the first object of a subclass is: first, the superclass's static field initializers and static blocks, then the subclass's, each in textual order (once only); then, for the new object, the superclass part is built completely (its instance initializers and blocks in order, then its constructor body); then the subclass's instance initializers and blocks in order; and finally the rest of the subclass constructor body. When a constructor calls `this(...)`, instance initializers run only once, as part of the constructor that eventually calls `super`.",
   "```java\nclass A {\n    static { System.out.print(\"A-static \"); }\n    { System.out.print(\"A-init \"); }\n    A() { System.out.print(\"A() \"); }\n}\nclass B extends A {\n    static { System.out.print(\"B-static \"); }\n    { System.out.print(\"B-init \"); }\n    B() { System.out.print(\"B() \"); }\n}\n// new B(); new B(); prints:\n// A-static B-static A-init A() B-init B() A-init A() B-init B()\n```",
   "A method declaration includes optional access and other modifiers, a return type (or `void`), a name, a parameter list and an optional `throws` clause. Java passes arguments by value: primitives are copied, and for objects the reference is copied. So a method can change the object a parameter points to, but assigning a new object to the parameter does not affect the caller's variable. Static methods cannot use `this` or access instance members directly, because there is no current object.",
   "When you trace initialization questions, write the output in two phases: the static part (once per class, parent first) and the instance part (per object, parent first, initializers before the constructor body)."
  ],
  "terms": [
   [
    "Default constructor",
    "The no-argument constructor the compiler adds only when a class declares no constructors."
   ],
   [
    "Static initializer",
    "A static { } block that runs once when the class is initialized."
   ],
   [
    "Instance initializer",
    "A { } block in the class body that runs for every new object, before the constructor body but after the superclass constructor."
   ],
   [
    "Pass by value",
    "Java copies each argument into the parameter; for objects, the copied value is the reference."
   ]
  ],
  "example": "A configuration class loads default settings in a static block, so the file is read once when the class is first used, not every time a settings object is created. Each object then copies those defaults in an instance initializer, so every constructor gets them without duplicated code.",
  "tip": "Statics run once, parent before child. For each new object: parent's initializers and constructor body, then child's initializers, then child's constructor body. Initializers run in source order.",
  "check": [
   [
    "If a class declares only `Car(String model)`, does `new Car()` compile?",
    "No. Declaring any constructor stops the compiler from adding the default no-argument constructor."
   ],
   [
    "When does a static initializer block run?",
    "Once, when the class is initialized on first active use, before any instance of it is created."
   ],
   [
    "Is `public void Dog() { }` a constructor?",
    "No. It has a return type, so it is an ordinary method that happens to share the class's name."
   ]
  ]
 },
 {
  "t": "Flexible constructor bodies (Java 25): statements before super(...) or this(...)",
  "body": [
   "Before Java 25, the call to `super(...)` or `this(...)` had to be the very first statement in a constructor. That rule made it awkward to validate or prepare arguments before handing them to the parent constructor; developers resorted to static helper methods or complicated expressions inside the argument list. Flexible constructor bodies, finalized in Java 25, relax the rule: you may now write statements before the explicit constructor call.",
   "The constructor body is split into two parts. The statements before `super(...)` or `this(...)` form the prologue, and the statements after it form the epilogue. The explicit constructor call still has to be a top-level statement of the constructor body; it cannot be placed inside an `if`, a loop or a `try` block, and a constructor still calls `super` or `this` at most once. If there is no explicit call, the compiler still inserts `super()` at the start, as before.",
   "The prologue runs in an early construction context, before the object has been initialized by its superclass. So the prologue may not use the object being built. You cannot read its fields, call its instance methods, use `this` explicitly (except to assign a field), use `super.something`, or create an instance of an inner class that would capture `this`. What you may do is work with parameters and local variables, call static methods, throw exceptions, and assign values to fields declared in this class that have no initializer (assignment only, not reading). A `return` statement is not allowed in the prologue.",
   "```java\nclass Account {\n    Account(long cents) { /* ... */ }\n}\n\nclass SavingsAccount extends Account {\n    private final double rate;\n\n    SavingsAccount(long cents, double rate) {\n        if (cents < 0) {                       // prologue: validate first\n            throw new IllegalArgumentException(\"negative\");\n        }\n        this.rate = rate;                      // allowed: assign own field\n        super(cents);                          // explicit constructor call\n        System.out.println(\"created\");        // epilogue: may use this\n    }\n}\n```",
   "Assigning fields in the prologue matters because of overridden methods. If a superclass constructor calls a method that a subclass overrides, that method previously ran before the subclass fields were set and could see their default values, such as `null` or 0. When the subclass assigns its fields before calling `super(...)`, the overridden method sees the real values.",
   "This changes the initialization order you learned earlier only a little. For a constructor with a prologue, the prologue runs first; then the superclass is constructed; then this class's instance initializers and field initializers run in textual order; then the epilogue. Validation in the prologue also means a bad argument fails fast, before the superclass does any work.",
   "Exam questions on this topic usually show a prologue and ask whether it compiles. Check for any read of an instance field, any instance method call, any `super.` access, a `return`, or a `super(...)` call nested inside another statement: each of those is a compile error."
  ],
  "terms": [
   [
    "Prologue",
    "The statements in a constructor before the explicit super(...) or this(...) call, which cannot use the object being constructed."
   ],
   [
    "Epilogue",
    "The statements after the explicit constructor call, where the object can be used normally."
   ],
   [
    "Early construction context",
    "The prologue and constructor-call arguments, where references to the current instance are restricted."
   ],
   [
    "Explicit constructor invocation",
    "A super(...) or this(...) statement that chains to another constructor."
   ]
  ],
  "example": "A `Temperature` class extends a `Measurement` base class whose constructor logs the value. The subclass now checks in its prologue that the value is above absolute zero and throws IllegalArgumentException if not, so an invalid object never reaches the parent constructor or the log.",
  "tip": "In a prologue, allowed means parameters, locals, static calls, throwing and assigning this class's fields. Not allowed means reading fields, calling instance methods, super.x, return, or putting super(...) inside a block.",
  "check": [
   [
    "Can a Java 25 constructor call a static helper method before `super(...)`?",
    "Yes. Static methods do not need the instance, so they are allowed in the prologue."
   ],
   [
    "Does `Child(int x) { System.out.println(this.name); super(); }` compile?",
    "No. Reading an instance field in the prologue uses the object before it is initialized."
   ],
   [
    "Can `super(...)` appear inside an `if` block in a constructor?",
    "No. The explicit constructor call must be a top-level statement of the constructor body."
   ]
  ]
 },
 {
  "t": "Inheritance, overriding vs overloading vs hiding, polymorphism and casting",
  "body": [
   "A class inherits from one direct superclass with `extends` (Java has single inheritance of classes), and every class ultimately extends `Object`. The subclass inherits accessible members and can add new ones or replace inherited behavior. Private members are not inherited in the sense of being accessible, and constructors are never inherited.",
   "Overriding is when a subclass declares an instance method with the same name and parameter types as an inherited one. The rules are: the return type must be the same or a subtype (a covariant return); the access level cannot be more restrictive (a `public` method cannot be overridden as `protected`); and it cannot declare new or broader checked exceptions. `final` methods cannot be overridden. The `@Override` annotation asks the compiler to confirm that you are really overriding something, and it catches typos.",
   "Overloading is different: methods in the same class (or inherited) share a name but have different parameter lists. Return type and exceptions alone do not distinguish overloads, so two methods differing only in return type do not compile. The compiler picks the overload at compile time from the argument types, preferring an exact match, then widening, then boxing, then varargs.",
   "Hiding applies to static methods and to fields. A static method in a subclass with the same signature as a static method in the parent hides it instead of overriding it, and the version called depends on the reference type at compile time, not on the object. A static method cannot hide an instance method or the reverse; that is a compile error. Fields are also hidden, never overridden: `parentRef.name` reads the parent's field even when the object is a subclass.",
   "Polymorphism means a reference of a supertype can point to an object of any subtype, and calls to overridden instance methods are resolved at runtime using the actual object. The reference type decides which methods you are allowed to call; the object type decides which implementation runs.",
   "```java\nclass Animal {\n    String name = \"animal\";\n    static String kind() { return \"Animal\"; }\n    String sound() { return \"...\"; }\n}\nclass Dog extends Animal {\n    String name = \"dog\";\n    static String kind() { return \"Dog\"; }\n    @Override String sound() { return \"Woof\"; }\n}\nAnimal a = new Dog();\nSystem.out.println(a.sound()); // Woof   (overridden: object type)\nSystem.out.println(a.name);    // animal (field: reference type)\nSystem.out.println(a.kind());  // Animal (static: reference type)\n```",
   "Casting reference types changes the reference type, not the object. Upcasting (subtype to supertype) is automatic. Downcasting needs an explicit cast, `Dog d = (Dog) a;`, and if the object is not really a `Dog` a `ClassCastException` is thrown at runtime. If the two types cannot possibly be related, such as casting a `String` to an `Integer`, the compiler rejects it outright. Use `instanceof` before a downcast when you are not sure."
  ],
  "terms": [
   [
    "Overriding",
    "Redefining an inherited instance method with the same signature; the object's runtime type decides which version runs."
   ],
   [
    "Overloading",
    "Declaring methods with the same name but different parameter lists; the compiler picks one from argument types."
   ],
   [
    "Hiding",
    "Declaring a static method or a field with the same name as one in the parent; the reference type decides which is used."
   ],
   [
    "Covariant return type",
    "An overriding method's return type that is a subtype of the overridden method's return type."
   ]
  ],
  "example": "A drawing program keeps a `List<Shape>` holding circles, squares and triangles. Calling `shape.area()` on each element runs the right formula for each object because `area` is overridden, while the list code never needs to know the concrete classes.",
  "tip": "Instance methods follow the object; fields and static methods follow the reference type. For overriding, check signature, covariant return, access not narrower, and no new broader checked exceptions.",
  "check": [
   [
    "Can a subclass override `public void run()` with `protected void run()`?",
    "No. An overriding method cannot have more restrictive access."
   ],
   [
    "What happens at runtime with `Object o = \"hi\"; Integer i = (Integer) o;`?",
    "It compiles, because Object might be an Integer, but throws ClassCastException because the object is a String."
   ],
   [
    "Do `int calc()` and `long calc()` in the same class compile as overloads?",
    "No. Overloads must differ in parameter lists; a different return type alone is not enough."
   ]
  ]
 },
 {
  "t": "Abstract classes and interfaces: default, static and private interface methods",
  "body": [
   "An abstract class is declared with `abstract` and cannot be instantiated with `new`. It may contain abstract methods, which have no body and end with a semicolon, alongside ordinary methods, fields and constructors. A concrete (non-abstract) subclass must implement every inherited abstract method; an abstract subclass may leave them for its own subclasses. An abstract method cannot be `private`, `static` or `final`, because each of those would stop it from being overridden. A class with an abstract method must itself be abstract.",
   "An interface defines a contract. A class uses `implements` to adopt one or more interfaces, which is how Java supports multiple inheritance of type. An interface cannot have instance fields or constructors; any field you declare is implicitly `public static final`, a constant that must be initialized. Methods without a body are implicitly `public abstract`. An interface can extend several other interfaces.",
   "Interfaces can also contain method bodies of three kinds. A `default` method is an instance method with an implementation that implementing classes inherit and may override; it is implicitly `public`. A `static` method belongs to the interface itself and must be called with the interface name, such as `Validator.isEmail(s)`; it is not inherited by implementing classes or subinterfaces, so calling it through an implementing class or an instance does not compile. A `private` method (instance or static) holds helper code shared by other methods of the interface and is not visible outside it.",
   "When a class inherits two default methods with the same signature from different interfaces, it must override the method, or the class does not compile. Inside the override it can call a specific version with `InterfaceName.super.method()`. If a superclass provides a method with the same signature, the class's method wins over any interface default (\"class wins\"). And if one interface extends another and overrides the default, the more specific interface wins.",
   "```java\ninterface Walker {\n    default String move() { return \"walk\"; }\n    static String info() { return \"Walker\"; }\n}\ninterface Swimmer {\n    default String move() { return \"swim\"; }\n}\nclass Duck implements Walker, Swimmer {\n    @Override public String move() {        // required: conflicting defaults\n        return Walker.super.move() + \" and \" + helper();\n    }\n    private String helper() { return \"swim\"; }\n}\n// Walker.info() works; Duck.info() does not compile\n```",
   "Because interface methods are implicitly `public`, an implementing class must declare its implementations as `public`. Writing `void move()` (package access) in the class is a compile error, since it would reduce visibility.",
   "Choose an abstract class when related classes share state or constructor logic, and an interface when you are describing a capability that unrelated classes can have. A class can extend only one abstract class but implement many interfaces."
  ],
  "terms": [
   [
    "Abstract method",
    "A method with no body that concrete subclasses or implementing classes must implement."
   ],
   [
    "Default method",
    "An interface instance method with a body that implementing classes inherit and may override."
   ],
   [
    "Static interface method",
    "A method belonging to the interface itself, called only as InterfaceName.method()."
   ],
   [
    "Private interface method",
    "A helper method with a body that is visible only inside the interface."
   ]
  ],
  "example": "A library adds a new `default` method `sortedByTitle()` to its `Catalog` interface. Existing classes that implement Catalog keep compiling because they inherit the default, and classes that need a faster version override it.",
  "tip": "Interface methods are public, whether written or not, so implementations must be public. Static interface methods are called only through the interface name, and duplicate defaults must be resolved with an override.",
  "check": [
   [
    "Can an interface method be declared `protected`?",
    "No. Interface methods can be public or private only."
   ],
   [
    "How do you call Walker's version of a conflicting default method from inside Duck?",
    "Walker.super.move(); inside the overriding method."
   ],
   [
    "Can an abstract class have a constructor?",
    "Yes. It cannot be instantiated directly, but its constructor runs when a subclass object is created."
   ]
  ]
 },
 {
  "t": "Records: components, canonical and compact constructors, accessors, equals/toString",
  "body": [
   "A record is a special kind of class designed to carry immutable data. The declaration `record Point(int x, int y) {}` lists the components in its header, and from that the compiler generates a `private final` field for each component, a canonical constructor taking all components in order, an accessor method for each component named exactly like it (`x()` and `y()`, not `getX()`), and implementations of `equals`, `hashCode` and `toString` based on all components.",
   "Records have fixed structural rules. A record is implicitly `final`, so nothing can extend it, and it implicitly extends `java.lang.Record`, so it cannot extend anything else; it can implement interfaces. You cannot declare extra instance fields in the body, though `static` fields, static methods, instance methods and nested types are allowed. The generated fields are final, so records are shallowly immutable: a `List` component can still be modified unless you copy it.",
   "The canonical constructor can be written out in full with all parameters, in which case you must assign every field yourself. More commonly you write a compact constructor, which has no parameter list: `record Point(int x, int y) { Point { if (x < 0) throw new IllegalArgumentException(); } }`. Inside a compact constructor, the parameters are in scope and you can reassign them (for example to normalize or copy a value), and the fields are assigned automatically at the end. You may not assign the fields directly with `this.x = ...` in a compact constructor; that is a compile error.",
   "You can add other constructors, but each must start with (or, in Java 25, reach after a prologue) a call to another constructor using `this(...)`, eventually delegating to the canonical constructor. Records cannot call `super(...)`. You can also override an accessor, which must be `public` and have the same return type, or override `toString`, `equals` or `hashCode`.",
   "```java\nrecord Range(int low, int high) {\n    Range {                          // compact canonical constructor\n        if (low > high) {\n            int tmp = low; low = high; high = tmp;  // reassign parameters\n        }\n    }\n    Range(int single) { this(single, single); }\n    int size() { return high - low; }\n}\nvar r = new Range(9, 3);\nSystem.out.println(r);               // Range[low=3, high=9]\nSystem.out.println(r.low());         // 3\nSystem.out.println(r.equals(new Range(3, 9)));  // true\n```",
   "The generated `toString` prints the record name followed by each component and value in square brackets, such as `Range[low=3, high=9]`. The generated `equals` returns true when the other object is the same record type and all components are equal, so two separately created records with the same values are equal, which makes records reliable keys in a `HashMap` or `HashSet`.",
   "Records also pair naturally with pattern matching: a record pattern like `case Range(var lo, var hi)` deconstructs a record using its accessors, which is one reason they are central to modern Java."
  ],
  "terms": [
   [
    "Record component",
    "A name and type in a record header; each becomes a private final field and a public accessor."
   ],
   [
    "Canonical constructor",
    "The constructor whose parameters match the record components in order and that assigns every field."
   ],
   [
    "Compact constructor",
    "A canonical constructor written without a parameter list, used to validate or normalize parameters before fields are assigned automatically."
   ],
   [
    "Accessor method",
    "The generated method named after a component, such as x(), that returns its value."
   ]
  ],
  "example": "An order service uses `record Money(long cents, String currency)` for amounts. Its compact constructor rejects null currencies and upper-cases the code, so every Money object in the system is valid, and two Money objects for the same amount compare equal in tests.",
  "tip": "Record accessors are named after the components (name(), not getName()). In a compact constructor, reassign the parameters, never this.field, and never declare a parameter list.",
  "check": [
   [
    "Can a record declare a private instance field in its body?",
    "No. Only the components become instance fields; the body may add static fields but not instance fields."
   ],
   [
    "What is printed by `System.out.println(new Point(1, 2));` for `record Point(int x, int y)`?",
    "Point[x=1, y=2]."
   ],
   [
    "Can a record extend another class?",
    "No. It implicitly extends java.lang.Record, but it may implement interfaces."
   ]
  ]
 },
 {
  "t": "Sealed classes and interfaces: permits, final, sealed and non-sealed subclasses",
  "body": [
   "A sealed class or interface restricts which other classes or interfaces may directly extend or implement it. Ordinary inheritance is open: anyone can subclass a non-final class. `final` closes it completely. Sealing sits in between: you name the exact set of allowed direct subtypes. This lets you model a closed set of alternatives, such as the shapes a drawing tool supports, and it lets the compiler check that a switch covers every case.",
   "You declare it with the `sealed` modifier and a `permits` clause listing the permitted direct subtypes: `public sealed class Shape permits Circle, Square, Polygon {}`. The `permits` clause can be omitted when all the permitted subclasses are declared in the same source file; the compiler then infers them. A sealed interface works the same way, and its permitted subtypes can be classes, records, enums or other interfaces.",
   "Every permitted direct subclass must say how it continues the hierarchy, using exactly one of three modifiers. `final` means no further subclasses. `sealed` means it restricts its own subclasses with its own `permits` clause. `non-sealed` reopens the hierarchy from that point, so any class can extend it. Leaving the modifier off is a compile error. Records and enums are implicitly final (enums are implicitly sealed or final), so they satisfy the rule without a modifier, which is why sealed interfaces with record implementations are so common.",
   "There are also location rules. A permitted subclass must directly extend the sealed class, and it must be accessible to it. If the code is in a named module, the sealed class and its permitted subclasses must be in the same module; if it is in the unnamed module (ordinary classpath code), they must be in the same package. A class listed in `permits` that does not actually extend the sealed class is a compile error, as is a class that extends a sealed class without being listed.",
   "```java\npublic sealed interface Payment permits Card, BankTransfer, Voucher {}\n\npublic record Card(String number) implements Payment {}      // implicitly final\npublic final class BankTransfer implements Payment {}\npublic non-sealed class Voucher implements Payment {}        // open again\nclass GiftVoucher extends Voucher {}                         // allowed\n\nstatic String fee(Payment p) {\n    return switch (p) {           // exhaustive: all permitted subtypes\n        case Card c -> \"2%\";\n        case BankTransfer b -> \"flat\";\n        case Voucher v -> \"none\";\n    };\n}\n```",
   "The compiler uses sealing for exhaustiveness. Because `Payment` has exactly three permitted subtypes, a switch over it with a case for each needs no `default`. Note that `case Voucher v` also covers `GiftVoucher`, since it is a subclass of `Voucher`. `non-sealed` is a contextual keyword with a hyphen, the only hyphenated keyword in Java.",
   "Sealing is about who may subclass; it does not affect who may use the type. A sealed class may still be abstract or concrete, and a sealed class can itself be instantiated if it is not abstract. Think of it as a design statement: \"these are all the kinds there are.\""
  ],
  "terms": [
   [
    "Sealed class",
    "A class or interface that allows only the direct subtypes named in its permits clause (or in the same file)."
   ],
   [
    "permits clause",
    "The list of classes or interfaces allowed to directly extend or implement a sealed type."
   ],
   [
    "non-sealed",
    "A modifier for a permitted subclass that reopens the hierarchy so any class may extend it."
   ],
   [
    "Exhaustive hierarchy",
    "A closed set of subtypes that lets the compiler verify a switch handles every case."
   ]
  ],
  "example": "A banking API models account events as `sealed interface Event permits Deposit, Withdrawal, Fee`, each a record. Reporting code switches over Event without a default, and the day someone adds `Interest` to the permits list, the compiler shows every report that must handle it.",
  "tip": "Every permitted subclass needs exactly one of final, sealed or non-sealed, unless it is a record or enum, which are implicitly final. Unnamed-module code must keep them in the same package.",
  "check": [
   [
    "What happens if a class listed in `permits` is declared `class Circle extends Shape {}` with no modifier?",
    "Compile error. A permitted subclass must be declared final, sealed or non-sealed."
   ],
   [
    "When can the `permits` clause be omitted?",
    "When all permitted subclasses are declared in the same source file as the sealed type."
   ],
   [
    "Can a record implement a sealed interface without extra modifiers?",
    "Yes. Records are implicitly final, which satisfies the requirement."
   ]
  ]
 },
 {
  "t": "Enums with fields, constructors, methods and values()/valueOf()/ordinal()",
  "body": [
   "An enum is a class with a fixed set of named instances. `enum Size { SMALL, MEDIUM, LARGE }` creates exactly three `Size` objects, and no code can create more, because enum constructors are always private (implicitly, if you write no modifier; writing `public` or `protected` is a compile error). Each constant is a `public static final` field, so you refer to them as `Size.SMALL`, and since there is only one instance of each, comparing enums with `==` is safe.",
   "Every enum implicitly extends `java.lang.Enum`, so it cannot extend another class, though it can implement interfaces. It gets useful methods for free. `values()` is a static method that returns a new array of all constants in declaration order. `valueOf(String)` returns the constant with exactly that name and throws `IllegalArgumentException` if no constant matches; the match is case-sensitive, so `Size.valueOf(\"small\")` fails. `name()` returns the constant's name, `ordinal()` returns its zero-based position, and `compareTo` orders constants by ordinal. The default `toString` returns the name.",
   "Enums can have fields, constructors and methods like any class. The constant list must come first in the body, and if anything follows it, the list must end with a semicolon. Each constant can pass arguments to the constructor in parentheses. The constructor runs once per constant, when the enum class is initialized, not when you use a constant.",
   "```java\nenum Planet {\n    MERCURY(3.303e23), EARTH(5.976e24);   // semicolon required here\n\n    private final double mass;\n    Planet(double mass) {                    // implicitly private\n        this.mass = mass;\n        System.out.print(\"init \");\n    }\n    double mass() { return mass; }\n}\nSystem.out.println(Planet.EARTH.mass());    // init init 5.976E24\nSystem.out.println(Planet.EARTH.ordinal()); // 1\nSystem.out.println(Planet.valueOf(\"MERCURY\")); // MERCURY\n```",
   "Constants can also have their own class bodies. If the enum declares an abstract method, every constant must supply a body that implements it, as in `PLUS { int apply(int a, int b) { return a + b; } }`. If the method is not abstract, constants may override it selectively. This is a clean alternative to a switch inside the enum.",
   "Enums work well with `switch`. In a classic switch or a switch expression over an enum variable, the case labels are usually the bare constant names (`case SMALL ->`). A switch expression that lists every constant is exhaustive and needs no `default`. Enums also have specialized collections, `EnumSet` and `EnumMap`, that are compact and keep declaration order.",
   "Avoid storing ordinals in files or databases: reordering or inserting constants changes them. Store the name instead and rebuild the constant with `valueOf` when reading it back."
  ],
  "terms": [
   [
    "Enum",
    "A special class with a fixed set of named instances declared at the top of its body."
   ],
   [
    "values()",
    "A generated static method returning an array of all enum constants in declaration order."
   ],
   [
    "valueOf(String)",
    "Returns the constant with the exact given name, or throws IllegalArgumentException."
   ],
   [
    "ordinal()",
    "The zero-based position of a constant in its declaration."
   ]
  ],
  "example": "A coffee shop app defines `enum CupSize { SMALL(250), MEDIUM(350), LARGE(450) }` with a field for millilitres. The order screen loops over CupSize.values() to build its buttons, and the price calculator reads each constant's millilitres instead of using a separate lookup table.",
  "tip": "Enum constructors are private and run once per constant at class initialization. valueOf is case-sensitive and throws IllegalArgumentException, and the constant list needs a semicolon when members follow.",
  "check": [
   [
    "What does `Size.valueOf(\"Medium\")` do if the constant is `MEDIUM`?",
    "It throws IllegalArgumentException, because valueOf matches names exactly and is case-sensitive."
   ],
   [
    "Can you create an enum instance with `new Size()`?",
    "No. Enum constructors are private and the compiler forbids instantiating enums."
   ],
   [
    "What is `Size.LARGE.ordinal()` for `enum Size { SMALL, MEDIUM, LARGE }`?",
    "2, because ordinals start at 0."
   ]
  ]
 },
 {
  "t": "Nested, inner, local and anonymous classes",
  "body": [
   "Java lets you declare a class inside another class or even inside a method. These nested classes keep helper types close to where they are used and can access the enclosing class's private members. There are four kinds, and the exam tests how each is created and what it can access.",
   "A static nested class is declared with `static` inside another class. It behaves like a top-level class that happens to live in the outer class's namespace, and it has no link to any outer object, so it can access only the outer class's static members directly. You create it with `new Outer.Nested()`. Builders and small helper types are often written this way.",
   "An inner class (a member class without `static`) is tied to an instance of the outer class. Every inner object holds a hidden reference to its outer object, so it can read the outer object's fields, including private ones. To create one from outside, you need an outer instance: `Outer o = new Outer(); Outer.Inner i = o.new Inner();`. Inside the outer class's instance methods, `new Inner()` works because `this` is available. If an inner class has a field with the same name as the outer class, `Outer.this.name` reaches the outer one. Since Java 16, inner classes may declare static members too.",
   "A local class is declared inside a method or block and is visible only there. An anonymous class is a local class with no name, declared and instantiated in one expression, usually to implement an interface or extend a class on the spot: `Runnable r = new Runnable() { public void run() { ... } };`. Note the semicolon after the closing brace, because the whole thing is an expression in a statement. An anonymous class can extend one class or implement one interface, not both, and it cannot have a constructor, although it can have an instance initializer.",
   "Local and anonymous classes (and lambdas) can use local variables and parameters of the enclosing method only if those are final or effectively final, meaning they are never reassigned after initialization. Reassigning such a variable anywhere in the method, even after the class declaration, makes the capture a compile error.",
   "```java\npublic class Outer {\n    private int x = 10;\n    static class Nested { int get() { return 1; } }\n    class Inner { int get() { return x; } }       // uses outer field\n\n    void demo() {\n        int y = 5;                                  // effectively final\n        class Local { int get() { return x + y; } }\n        Runnable anon = new Runnable() {\n            public void run() { System.out.println(y); }\n        };\n        // y++;  // would make y not effectively final: compile error above\n    }\n}\nOuter.Nested n = new Outer.Nested();\nOuter.Inner i = new Outer().new Inner();\n```",
   "Access modifiers: member classes (static nested and inner) can be `public`, `protected`, package-private or `private`, like any member. Local and anonymous classes have no access modifier at all, since they are visible only inside their block."
  ],
  "terms": [
   [
    "Static nested class",
    "A class declared static inside another class; it needs no outer instance and is created with new Outer.Nested()."
   ],
   [
    "Inner class",
    "A non-static member class whose instances are tied to an outer instance and can access its members."
   ],
   [
    "Anonymous class",
    "An unnamed class declared and instantiated in a single expression, extending one class or implementing one interface."
   ],
   [
    "Effectively final",
    "A local variable that is never reassigned after initialization, which makes it usable from local classes and lambdas."
   ]
  ],
  "example": "A `LinkedList` implementation keeps its `Node` type as a private static nested class, since nodes do not need a reference to the list, and its iterator as a private inner class, since the iterator must read the list's head and modification count.",
  "tip": "Creating an inner class from outside needs an outer object: outer.new Inner(). A static nested class uses new Outer.Nested(). Captured locals must be effectively final.",
  "check": [
   [
    "How do you create an `Inner` object from a static method when Inner is a non-static member of Outer?",
    "With an outer instance: new Outer().new Inner(), or outerRef.new Inner()."
   ],
   [
    "Can an anonymous class both extend a class and implement an interface?",
    "No. It can extend exactly one class or implement exactly one interface."
   ],
   [
    "Can a local class read a method variable that is reassigned later in the method?",
    "No. Captured local variables must be final or effectively final."
   ]
  ]
 },
 {
  "t": "Instanceof pattern matching and flow scoping",
  "body": [
   "The `instanceof` operator tests whether an object is an instance of a type. Before pattern matching, a test was usually followed by a cast: `if (obj instanceof String) { String s = (String) obj; ... }`. Pattern matching combines the test, the cast and the variable declaration: `if (obj instanceof String s) { ... }`. If the test succeeds, `s` is a `String` variable ready to use. If `obj` is `null`, `instanceof` is `false` and nothing is bound.",
   "The variable introduced by a pattern is a pattern variable, and its scope follows flow scoping: it is in scope only where the compiler can prove the pattern matched. In `if (o instanceof String s) { ... } else { ... }`, `s` is usable in the `if` block and not in the `else` block. You can also use it later in the same condition, after `&&`: `if (o instanceof String s && s.length() > 3)` is fine, because the right side only runs when the left side is true.",
   "With `||` the logic reverses. `if (o instanceof String s || s.isEmpty())` does not compile, because the right side runs exactly when the match failed, so `s` would not be assigned. Negation works the other way round: in `if (!(o instanceof String s)) { return; }`, the pattern variable is not in scope inside the block, but it is in scope after the `if` for the rest of the method, because the only way to get there is if the pattern matched.",
   "```java\nstatic int len(Object o) {\n    if (!(o instanceof String s)) {\n        return -1;              // s not in scope here\n    }\n    return s.length();          // s in scope: pattern must have matched\n}\n\nObject x = \"hello\";\nif (x instanceof String t && t.startsWith(\"h\")) {\n    System.out.println(t.toUpperCase()); // HELLO\n}\n// if (x instanceof String u || u.isEmpty()) {}  // does not compile\n```",
   "A few more rules come up on the exam. A pattern variable cannot have the same name as a local variable already in scope, so `String s = \"\"; if (o instanceof String s)` is a compile error. Pattern variables are not implicitly final, so they can be reassigned, although that is rarely good style. The type in `instanceof` must be compatible with the expression's type: `Integer i = 5; if (i instanceof String s)` does not compile, because an `Integer` can never be a `String`.",
   "Record patterns work with `instanceof` too: `if (obj instanceof Point(int x, int y))` tests the type and binds the components in one step. A record pattern does not match `null`.",
   "Flow scoping is the same idea used by pattern matching in `switch`, and it removes a whole category of `ClassCastException` bugs, because the cast can no longer drift away from the test that protects it."
  ],
  "terms": [
   [
    "Pattern matching for instanceof",
    "An instanceof test that also binds the value to a new variable of the tested type when it matches."
   ],
   [
    "Pattern variable",
    "The variable declared by a pattern, such as s in o instanceof String s."
   ],
   [
    "Flow scoping",
    "The rule that a pattern variable is in scope only where the compiler can prove the match succeeded."
   ],
   [
    "Record pattern",
    "A pattern such as Point(int x, int y) that tests for a record type and binds its components."
   ]
  ],
  "example": "An equals method used to be written with instanceof and a cast on separate lines. Rewriting it as `return o instanceof Money m && cents == m.cents && currency.equals(m.currency);` removes the cast and keeps the whole check in one readable expression.",
  "tip": "After &&, the pattern variable is usable; after ||, it is not. With a negated test that returns or throws, the variable is in scope after the if statement.",
  "check": [
   [
    "Is `s` in scope in the else block of `if (o instanceof String s) { } else { }`?",
    "No. In the else block the match failed, so s is not definitely matched."
   ],
   [
    "What does `null instanceof String s` evaluate to?",
    "false. instanceof never matches null, so no variable is bound."
   ],
   [
    "Why does `if (o instanceof String s || s.length() > 0)` fail to compile?",
    "The right side of || runs only when the match failed, so s is not in scope there."
   ]
  ]
 },
 {
  "t": "Encapsulation, immutable objects and var local type inference",
  "body": [
   "Encapsulation means hiding an object's internal state and exposing it only through methods you control. In practice you make fields `private` and provide methods such as getters and setters, or better, meaningful operations like `deposit(amount)`. Because callers cannot reach the fields directly, the class can validate changes, keep its invariants and change its internal representation later without breaking other code.",
   "Java has four access levels. `private` members are visible only inside the class (including nested classes of it). Package-private, the default when you write no modifier, means visible to classes in the same package. `protected` adds access from subclasses in other packages, through inheritance. `public` means visible everywhere. Encapsulated classes use the narrowest level that works.",
   "An immutable object cannot change after construction. The usual recipe is: make the class `final` (or give it only private constructors) so subclasses cannot add mutable behavior; make all fields `private final`; provide no setters; initialize everything in the constructor; and make defensive copies of mutable inputs and outputs, such as lists and arrays, so callers cannot change your state through a shared reference. `String`, the wrapper classes and the `java.time` classes are immutable, and records give you most of this automatically, apart from the defensive copies.",
   "```java\npublic final class Team {\n    private final String name;\n    private final List<String> members;\n\n    public Team(String name, List<String> members) {\n        this.name = name;\n        this.members = List.copyOf(members);   // defensive copy\n    }\n    public String name() { return name; }\n    public List<String> members() { return members; } // already unmodifiable\n}\n```",
   "Local variable type inference with `var` lets the compiler work out a local variable's type from its initializer: `var list = new ArrayList<String>();` makes `list` an `ArrayList<String>`. The type is still static and fixed at compile time; `var` is not dynamic typing, so assigning a value of another type later is an error.",
   "`var` has strict rules. It can be used only for local variables (including in `for` loops, enhanced `for` loops and try-with-resources) and lambda parameters. It cannot be used for fields, method parameters or return types. It needs an initializer on the same line, and the initializer cannot be `null` alone, an array initializer like `{1, 2}`, or a lambda without a target type. You cannot declare several variables in one `var` statement (`var a = 1, b = 2;` fails). `var` is a reserved type name, not a keyword, so it can still be a variable or method name, but not a class name.",
   "Watch for inferred types that surprise you: `var n = 10;` is an `int`, so `n = 3.5;` fails; `var list = new ArrayList<>();` infers `ArrayList<Object>`; and `var c = 'a' + 1;` is an `int`. Use `var` when the type is obvious from the right side, and write the type explicitly when it helps a reader."
  ],
  "terms": [
   [
    "Encapsulation",
    "Keeping fields private and controlling access to an object's state through methods."
   ],
   [
    "Immutable object",
    "An object whose state cannot change after construction, such as a String or a well-designed record."
   ],
   [
    "Defensive copy",
    "A copy of a mutable input or output that prevents outside code from changing an object's internal state."
   ],
   [
    "var",
    "A reserved type name that makes the compiler infer a local variable's type from its initializer."
   ]
  ],
  "example": "A `Schedule` class returned its internal `ArrayList` of meetings from a getter, and a caller cleared it by accident, wiping the calendar. Returning `List.copyOf(meetings)` instead, and storing a copy in the constructor, made the class immutable from the outside.",
  "tip": "For var, check each line for: a field or parameter use, a missing initializer, a null or {array} initializer, or several variables in one declaration. Each is a compile error.",
  "check": [
   [
    "Does `var x;` followed by `x = 5;` compile?",
    "No. var requires an initializer in the declaration so the type can be inferred."
   ],
   [
    "Why must an immutable class copy a `List` passed to its constructor?",
    "Otherwise the caller keeps a reference to the same list and can change the object's state after construction."
   ],
   [
    "Can `var` be used as the type of an instance field?",
    "No. var is only for local variables and lambda parameters."
   ]
  ]
 },
 {
  "t": "Object lifecycle and garbage collection eligibility",
  "body": [
   "Objects in Java are created on the heap, usually with `new`, and they live as long as they are needed. You never free memory yourself. Instead, the garbage collector (GC), part of the Java Virtual Machine (JVM), finds objects that the program can no longer reach and reclaims their memory. Variables, by contrast, hold either primitive values or references to objects; local variables live on the stack while their method runs.",
   "An object becomes eligible for garbage collection when no live thread can reach it through any chain of references starting from a GC root. Roots include local variables of running methods, static fields and active threads. Common ways an object loses its last reference are: the variable is set to `null`, the variable is reassigned to another object, or the variable goes out of scope when its method or block ends.",
   "Eligible does not mean collected. The JVM decides when, and whether, to run the collector. `System.gc()` is only a request that the JVM may ignore, so no exam answer can rely on it. That is why questions ask \"how many objects are eligible\" at a given line, not how many have been collected. Objects that only reference each other, with no path from a root, are eligible too; this is sometimes called an island of isolation. Java's GC handles cycles, unlike simple reference counting.",
   "```java\npublic class Demo {\n    public static void main(String[] args) {\n        String a = new String(\"A\");   // object 1\n        String b = new String(\"B\");   // object 2\n        a = b;                        // object 1 now unreachable\n        String c = new String(\"C\");   // object 3\n        b = null;                     // object 2 still referenced by a\n        c = a;                        // object 3 now unreachable\n        // Line X: objects 1 and 3 are eligible; object 2 is reachable via a and c\n    }\n}\n```",
   "Trace such questions by drawing boxes for objects and arrows for references, and updating the arrows line by line. At the requested line, count the boxes with no incoming arrow from a live variable or from another reachable object. Be careful with string literals: literals live in the string pool and are not the kind of objects these questions count, which is why exam code uses `new String(...)` or custom classes.",
   "The `Object.finalize()` method was meant to run before collection, but it is deprecated for removal and you should never depend on it; there is no guarantee it runs. For releasing resources such as files and sockets, use try-with-resources and `close()`, which run at a predictable time.",
   "In practice, memory leaks in Java come from references that are kept by accident, such as objects added to a static collection and never removed. The GC cannot collect what is still reachable."
  ],
  "terms": [
   [
    "Garbage collector",
    "The JVM component that automatically reclaims memory used by unreachable objects."
   ],
   [
    "Eligible for garbage collection",
    "An object that no live thread can reach from any GC root; it may be collected at any later time or never."
   ],
   [
    "GC root",
    "A starting point for reachability, such as a local variable in an active method or a static field."
   ],
   [
    "Island of isolation",
    "A group of objects that reference each other but cannot be reached from any root, so all are eligible."
   ]
  ],
  "example": "A web application caches every user session in a static HashMap and never removes entries. Even after users log out, the sessions stay reachable through the static field, so they are never eligible for collection and the server slowly runs out of memory. Evicting entries on logout fixes it.",
  "tip": "Count reachable objects, not variables. Draw references on paper line by line, and remember that System.gc() guarantees nothing.",
  "check": [
   [
    "Does calling `System.gc()` guarantee that eligible objects are collected?",
    "No. It is only a suggestion; the JVM decides when collection happens."
   ],
   [
    "If objects A and B reference each other but nothing else references them, are they eligible?",
    "Yes. Neither can be reached from a GC root, so both are eligible despite the cycle."
   ],
   [
    "When does a local object created in a method become eligible if no reference escapes?",
    "When the method returns and its local variable goes out of scope, or earlier if the variable is reassigned or set to null."
   ]
  ]
 },
 {
  "t": "Checked vs unchecked exceptions and the Throwable hierarchy",
  "body": [
   "An exception is an object that signals something unexpected happened, and throwing it interrupts the normal flow of the program until some code catches it. All exceptions and errors in Java descend from `java.lang.Throwable`. It has two direct subclasses: `Error`, for serious problems in the JVM or environment that applications normally should not try to handle, such as `OutOfMemoryError` and `StackOverflowError`; and `Exception`, for conditions a program might reasonably handle. `RuntimeException` is a subclass of `Exception`.",
   "Java splits these into checked and unchecked exceptions. Unchecked exceptions are `RuntimeException`, `Error` and all their subclasses. Checked exceptions are every other subclass of `Exception` (and `Throwable` itself). The difference is enforced by the compiler through the handle-or-declare rule: if code can throw a checked exception, the method must either catch it or declare it with `throws` in its signature. Unchecked exceptions carry no such requirement.",
   "The reasoning is that checked exceptions represent problems outside your code's control that a caller should plan for, such as a missing file (`IOException`, `FileNotFoundException`) or a parsing failure. Unchecked exceptions usually represent programming bugs that should be fixed rather than caught, such as `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ClassCastException`, `ArithmeticException` and `IllegalArgumentException` (with its subclass `NumberFormatException`). `IllegalStateException` is unchecked too.",
   "```java\nvoid read(Path p) throws IOException {      // declares the checked exception\n    Files.readString(p);                      // may throw IOException\n}\nvoid safe(Path p) {\n    try {\n        read(p);\n    } catch (IOException e) {               // handles it\n        System.out.println(\"missing: \" + e.getMessage());\n    }\n}\nvoid bug(String s) {\n    Integer.parseInt(s);  // NumberFormatException is unchecked: no handling required\n}\n```",
   "Know who typically throws what. The JVM throws `NullPointerException`, `ArithmeticException` (integer division by zero), `ArrayIndexOutOfBoundsException`, `ClassCastException` and errors such as `StackOverflowError`. Library code and programmers throw `IllegalArgumentException`, `NumberFormatException`, `IOException` and others with `throw new ...`. The `throw` keyword throws one exception object; the `throws` keyword in a method header declares what may be thrown.",
   "`Throwable` provides the methods you use to inspect exceptions: `getMessage()` for the detail message, `toString()` for the class name plus message, `printStackTrace()` to print the call stack, and `getCause()` for the exception that caused this one. The last one matters when code wraps a low-level exception in a higher-level one.",
   "When a question asks whether code compiles, find every call that can throw a checked exception and make sure each one is inside a `try` that catches that type or a supertype, or that the method declares it. Unchecked exceptions never cause these compile errors."
  ],
  "terms": [
   [
    "Throwable",
    "The root class of everything that can be thrown, with direct subclasses Error and Exception."
   ],
   [
    "Checked exception",
    "A subclass of Exception, but not of RuntimeException, that must be caught or declared."
   ],
   [
    "Unchecked exception",
    "RuntimeException, Error or any of their subclasses, which the compiler does not require you to handle."
   ],
   [
    "Handle-or-declare rule",
    "The compiler requirement that code throwing a checked exception either catches it or lists it in throws."
   ]
  ],
  "example": "A report generator reads a template file. Because `Files.readString` throws the checked IOException, the compiler forces the developer to decide what should happen when the file is missing, and the team chooses to catch it and show a clear message instead of crashing with a stack trace.",
  "tip": "Memorize the split: RuntimeException and Error subtypes are unchecked; every other Exception is checked. IOException and FileNotFoundException are checked; NumberFormatException is unchecked.",
  "check": [
   [
    "Is `NumberFormatException` checked or unchecked?",
    "Unchecked. It extends IllegalArgumentException, which extends RuntimeException."
   ],
   [
    "What must a method do if it calls code that throws `IOException`?",
    "Catch IOException (or a supertype) or declare throws IOException (or a supertype) in its signature."
   ],
   [
    "Is `StackOverflowError` an Exception?",
    "No. It is an Error, which is a Throwable but not an Exception, and it is unchecked."
   ]
  ]
 },
 {
  "t": "Try/catch/finally flow, including return in try and finally",
  "body": [
   "A `try` block contains code that might throw. It must be followed by at least one `catch` block, a `finally` block, or both; a `try` alone does not compile (try-with-resources is the one exception, covered later). Braces are required for every block, even with a single statement. When an exception is thrown in the `try`, the rest of the `try` is skipped, and Java checks the `catch` blocks from top to bottom, running the first one whose type matches. If none matches, the exception propagates to the caller after the `finally` runs.",
   "The `finally` block runs whether the `try` completes normally, a `catch` handles an exception, or an exception escapes uncaught. That makes it the place for cleanup. The only practical ways to skip it are for the JVM to stop, for example with `System.exit()`, or for the thread to die abruptly.",
   "Returns interact with `finally` in a precise way. If the `try` (or a `catch`) executes `return expr;`, the expression is evaluated first and its value is saved. Then the `finally` block runs, and then the method returns the saved value. So if `finally` changes a local primitive variable, the returned value does not change. If the returned value is a reference to a mutable object, however, changes the `finally` makes to that object are visible to the caller, because the saved value is the reference.",
   "If the `finally` block itself executes `return`, that return wins: it replaces the value from the `try` or `catch`, and it also discards any exception that was propagating. The same happens if `finally` throws a new exception: the original exception is lost. That is why returning or throwing from `finally` is considered bad practice, and why exam questions love it.",
   "```java\nstatic int test() {\n    int x = 1;\n    try {\n        return x;          // value 1 is saved\n    } finally {\n        x = 99;            // does not change the saved value\n        System.out.print(\"finally \");\n    }\n}\n// prints: finally, and test() returns 1\n\nstatic int override() {\n    try {\n        throw new RuntimeException(\"boom\");\n    } finally {\n        return 42;         // exception discarded, 42 returned\n    }\n}\n```",
   "When tracing output, follow the exact path: statements in `try` up to the throw, the matching `catch`, then `finally`, then either the code after the whole statement (if the exception was handled) or a jump to the caller (if not). If a `catch` block throws a new exception, `finally` still runs before that new exception propagates.",
   "Also note scope: a variable declared inside the `try` block is not visible in `catch` or `finally`. Declare it before the `try` if those blocks need it."
  ],
  "terms": [
   [
    "try block",
    "A block containing code that might throw, followed by catch and/or finally blocks."
   ],
   [
    "catch block",
    "A handler that runs when an exception of its declared type (or a subtype) is thrown in the try."
   ],
   [
    "finally block",
    "A block that runs after try and catch whatever happens, unless the JVM exits."
   ],
   [
    "Exception propagation",
    "An uncaught exception leaving the current method and moving up the call stack to the caller."
   ]
  ],
  "example": "A method opens a database transaction in a try block and marks it finished in finally. When a teammate adds `return` inside the finally to return a status code, errors from the try block start disappearing from the logs, because a return in finally discards the propagating exception.",
  "tip": "The return value is fixed when return in try executes; finally runs afterwards and can only replace it by returning itself. A return or throw in finally hides any earlier exception.",
  "check": [
   [
    "Does `try { } ` with no catch or finally compile?",
    "No. A plain try needs at least one catch or a finally block."
   ],
   [
    "If try returns a local int and finally increments that variable, what value is returned?",
    "The original value. It was evaluated and saved before finally ran."
   ],
   [
    "What happens to an exception thrown in try if finally executes `return 0;`?",
    "It is discarded, and the method returns 0 normally."
   ]
  ]
 },
 {
  "t": "Multi-catch rules: no related types; the catch variable is effectively final",
  "body": [
   "A multi-catch block handles several exception types with one handler by separating them with a vertical bar: `catch (IOException | SQLException e)`. It removes duplicated handler code when different exceptions need the same response. There is only one variable name for the whole block, placed after the last type.",
   "The key rule is that the alternatives in a multi-catch cannot be related by subclassing. `catch (FileNotFoundException | IOException e)` does not compile, because `FileNotFoundException` is a subclass of `IOException` and the subclass alternative is redundant; catching `IOException` alone already covers it. The same applies to `RuntimeException | IllegalArgumentException`, or `Exception | anything`. Types must be unrelated siblings or from separate branches of the hierarchy.",
   "The catch parameter of a multi-catch is implicitly `final`. Assigning to it, as in `e = new IOException();`, is a compile error. In a single-type catch the parameter is not final, so reassignment compiles there, although it is poor style. You also cannot declare the variable twice (`catch (IOException e1 | SQLException e2)` is invalid syntax), and each alternative is just a type name.",
   "Inside the block, the variable's static type is the closest common supertype of the alternatives (technically a union type whose members are available through their common supertype). So in `catch (NumberFormatException | ArithmeticException e)`, you can call methods of `RuntimeException`, such as `getMessage()`, but not methods specific to only one of the alternatives without a cast.",
   "```java\ntry {\n    String s = args[0];\n    int n = Integer.parseInt(s);\n    System.out.println(10 / n);\n} catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {\n    System.out.println(\"bad input: \" + e.getMessage());\n    // e = null;   // does not compile: multi-catch parameter is final\n} catch (ArithmeticException e) {\n    e = new ArithmeticException(\"changed\");  // legal in single catch\n    System.out.println(\"zero\");\n}\n```",
   "Multi-catch also affects rethrowing. If you catch and rethrow the variable with `throw e;`, the compiler knows the exact set of types it can be, so the method only needs to declare those types, not a broad supertype. The same precise rethrow works for a single catch of `Exception` when the variable is effectively final and never reassigned.",
   "Ordering rules still apply between separate catch blocks: a multi-catch block that includes a type must not follow a block that already catches that type or its supertype, or it is unreachable. The next lesson covers that ordering in detail."
  ],
  "terms": [
   [
    "Multi-catch",
    "A catch block listing several exception types separated by |, sharing one handler and one variable."
   ],
   [
    "Related types",
    "Exception types where one is a subclass of another; they cannot both appear in the same multi-catch."
   ],
   [
    "Implicitly final parameter",
    "The multi-catch variable, which cannot be reassigned inside the block."
   ],
   [
    "Precise rethrow",
    "Rethrowing a caught, unmodified exception variable so the method only needs to declare the specific types that can actually occur."
   ]
  ],
  "example": "A file importer catches `IOException | DateTimeParseException e` in one block and writes the same \"could not import row\" message for both, instead of copying the logging code into two handlers that would drift apart over time.",
  "tip": "In a multi-catch, check two things: that no type is a subclass of another in the list, and that the variable is never assigned. Either mistake is a compile error.",
  "check": [
   [
    "Does `catch (IOException | Exception e)` compile?",
    "No. IOException is a subclass of Exception, so the types are related."
   ],
   [
    "Can you assign a new value to `e` inside `catch (IOException | SQLException e)`?",
    "No. The multi-catch parameter is implicitly final."
   ],
   [
    "Can you reassign `e` inside a single-type `catch (IOException e)`?",
    "Yes. A single-type catch parameter is not final, although reassigning it is poor style."
   ]
  ]
 },
 {
  "t": "Catch block ordering and unreachable catch compile errors",
  "body": [
   "When an exception is thrown, Java checks the `catch` blocks in the order they appear and runs the first one whose type matches the exception or one of its supertypes. Only one catch block runs per exception. Because a supertype catch matches all its subtypes, the order in which you write catch blocks matters to the compiler.",
   "If a catch block for a supertype comes before a catch block for one of its subtypes, the subtype block can never run, and the compiler reports an error that the exception \"has already been caught\". So you must order catch blocks from most specific to most general: `FileNotFoundException` before `IOException` before `Exception`. Two catch blocks for unrelated types can appear in any order. Catching the exact same type twice is also an error.",
   "```java\ntry {\n    Files.readString(Path.of(\"data.txt\"));\n} catch (NoSuchFileException e) {   // most specific first\n    System.out.println(\"missing\");\n} catch (IOException e) {\n    System.out.println(\"io problem\");\n} catch (Exception e) {\n    System.out.println(\"other\");\n}\n\n// Does not compile: IOException already caught by Exception\n// try { ... } catch (Exception e) { } catch (IOException e) { }\n```",
   "A second rule produces another unreachable-catch error: you cannot catch a checked exception that the `try` block cannot throw. If the `try` contains only `System.out.println(\"hi\")`, then `catch (IOException e)` does not compile, because nothing in the block declares or throws `IOException`. The compiler knows which checked exceptions each method call declares, so it can prove the handler is dead code.",
   "That rule does not apply to unchecked exceptions or to the broad types. You may always catch `RuntimeException` or any of its subclasses, any `Error`, and also `Exception` and `Throwable`, even when the try block is empty, since those types include unchecked exceptions that any code might throw. So `try { } catch (Exception e) { }` compiles while `try { } catch (java.sql.SQLException e) { }` does not.",
   "Multi-catch follows the same logic. A multi-catch listing a type that was already caught by an earlier block is an error, and a multi-catch alternative that is a checked exception the try cannot throw is also an error.",
   "When an exam question has several catch blocks, go through them in order and ask for each: could an earlier block already catch everything this one catches? And if its type is checked and specific, can anything in the try actually throw it? A yes to the first, or a no to the second, means the code does not compile."
  ],
  "terms": [
   [
    "Catch order",
    "The top-to-bottom sequence in which catch blocks are checked; the first matching one runs."
   ],
   [
    "Unreachable catch block",
    "A handler the compiler proves can never run, either because an earlier block catches its type or because the try cannot throw it."
   ],
   [
    "Most specific first",
    "The rule of writing subclass exception handlers before superclass handlers."
   ],
   [
    "Checked exception analysis",
    "The compiler's tracking of which checked exceptions a try block can throw, based on method throws clauses and throw statements."
   ]
  ],
  "example": "A developer adds `catch (Exception e)` at the top of an existing handler chain to log everything, and the build fails because the specific IOException and TimeoutException handlers below it are now unreachable. Moving the broad catch to the bottom restores the specific handling.",
  "tip": "Subclass before superclass, always. And a specific checked exception can only be caught if something in the try can throw it; Exception, Throwable and unchecked types are always allowed.",
  "check": [
   [
    "Does `catch (RuntimeException e) {} catch (IllegalArgumentException e) {}` compile?",
    "No. IllegalArgumentException is a subclass of RuntimeException, so the second block is unreachable."
   ],
   [
    "Can you write `catch (IOException e)` after a try block that only does arithmetic?",
    "No. IOException is checked and nothing in the try can throw it, so the catch is unreachable."
   ],
   [
    "Can you write `catch (Exception e)` after an empty try block?",
    "Yes. Exception includes unchecked exceptions, so the compiler allows it."
   ]
  ]
 },
 {
  "t": "Try-with-resources, AutoCloseable and reverse close order",
  "body": [
   "Many objects hold resources outside the JVM, such as open files, network sockets and database connections, and they must be closed when you are done. Closing them reliably in a `finally` block is verbose and easy to get wrong. The try-with-resources statement automates it: resources declared in parentheses after `try` are closed automatically when the block finishes, whether it completes normally or throws.",
   "A resource must implement `java.lang.AutoCloseable`, whose single method is `void close() throws Exception`. `java.io.Closeable` extends it with `close() throws IOException` and is implemented by streams, readers and writers. Declaring a variable of a class that implements neither interface in the resource list is a compile error. Your own classes can implement `AutoCloseable` and be used the same way.",
   "Resources are declared in the parentheses and separated by semicolons (a trailing semicolon is allowed). Each resource variable is implicitly `final` and is in scope only inside the `try` block, not in `catch` or `finally`. Since Java 9 you can also list an existing variable declared before the statement, as long as it is final or effectively final: `try (reader) { ... }`. A try-with-resources statement may have no `catch` or `finally` at all, but any checked exception thrown by `close()` must still be handled or declared.",
   "Order is the most tested detail. Resources are opened in the order they are declared and closed in the reverse order, so the last one opened is closed first. Closing happens right after the `try` block ends, before any `catch` or `finally` block runs. If a resource's initialization throws, only the resources already opened are closed.",
   "```java\nclass Res implements AutoCloseable {\n    private final String name;\n    Res(String name) { this.name = name; System.out.print(\"open-\" + name + \" \"); }\n    public void close() { System.out.print(\"close-\" + name + \" \"); }\n}\n\ntry (var a = new Res(\"A\"); var b = new Res(\"B\")) {\n    System.out.print(\"body \");\n    throw new RuntimeException();\n} catch (RuntimeException e) {\n    System.out.print(\"catch \");\n} finally {\n    System.out.print(\"finally\");\n}\n// open-A open-B body close-B close-A catch finally\n```",
   "Note that the `close()` implementation in `Res` declares no exception. An overriding method may throw fewer exceptions than `AutoCloseable.close()`, and when it does, the compiler no longer requires you to handle `Exception`. If you keep the `throws Exception` in your class, every try-with-resources using it must handle or declare `Exception`.",
   "In real code, use try-with-resources for every file or connection you open, such as `try (var in = Files.newBufferedReader(path))`, instead of calling `close()` yourself."
  ],
  "terms": [
   [
    "try-with-resources",
    "A try statement that declares resources in parentheses and closes them automatically at the end of the block."
   ],
   [
    "AutoCloseable",
    "The interface with a single close() method that a resource must implement to be used in try-with-resources."
   ],
   [
    "Closeable",
    "A subinterface of AutoCloseable used by I/O classes whose close() throws IOException."
   ],
   [
    "Reverse close order",
    "Resources are closed in the opposite order of declaration, last opened first closed."
   ]
  ],
  "example": "A CSV export opens a database connection, a statement and a file writer in one try-with-resources. If writing a row fails, the writer is closed first, then the statement, then the connection, and only then does the catch block log the error, so no handles are leaked.",
  "tip": "Trace the order: open in declaration order, body, close in reverse order, then catch, then finally. Resource variables are final and not visible in catch or finally.",
  "check": [
   [
    "In `try (var x = new R(\"1\"); var y = new R(\"2\"))`, which resource is closed first?",
    "y (\"2\"), because resources are closed in reverse order of declaration."
   ],
   [
    "Do resources close before or after the catch block runs?",
    "Before. They are closed as soon as the try block ends, then catch and finally run."
   ],
   [
    "Can you use an existing variable in try-with-resources?",
    "Yes, since Java 9, if it is final or effectively final: try (existingResource) { }."
   ]
  ]
 },
 {
  "t": "Suppressed exceptions and Throwable.getSuppressed()",
  "body": [
   "Sometimes more than one exception happens during the same operation. In try-with-resources this is common: the body throws an exception, and then the automatic `close()` call also throws. Java cannot throw both at once, so it has to choose one as the primary exception and remember the other. The one it keeps as primary is the exception from the try block. Any exceptions thrown while closing resources are attached to it as suppressed exceptions.",
   "Suppressed exceptions are stored inside the primary `Throwable`. The method `addSuppressed(Throwable)` adds one, and `getSuppressed()` returns a `Throwable[]` array of them, in the order they were added. With several resources, each failing `close()` adds another suppressed exception, and because resources close in reverse order, the array follows that reverse order. A catch block for the primary exception can loop over the array to log every problem.",
   "If the try block completes normally and only `close()` throws, there is nothing to suppress: the exception from `close()` becomes the primary exception and is thrown normally. If two resources both fail to close and the body succeeded, the first close exception (from the last declared resource) becomes primary and the second one is suppressed inside it.",
   "```java\nclass Door implements AutoCloseable {\n    public void close() { throw new IllegalStateException(\"door stuck\"); }\n}\n\ntry (Door d = new Door()) {\n    throw new RuntimeException(\"fire alarm\");\n} catch (RuntimeException e) {\n    System.out.println(e.getMessage());          // fire alarm\n    for (Throwable t : e.getSuppressed()) {\n        System.out.println(\"suppressed: \" + t.getMessage()); // door stuck\n    }\n}\n```",
   "Suppression happens automatically only in try-with-resources. A classic `try/finally` behaves worse: if the `try` throws and the `finally` also throws, the exception from `finally` replaces the original, and the original is lost entirely unless you add it yourself with `addSuppressed`. This is one of the strongest reasons to prefer try-with-resources over manual cleanup.",
   "Stack traces printed with `printStackTrace()` include suppressed exceptions under a \"Suppressed:\" heading, which you will see in lab output. Do not confuse suppressed exceptions with the cause: `getCause()` returns the exception that led to this one, set when one exception wraps another, while `getSuppressed()` lists additional exceptions that happened alongside it.",
   "On the exam, identify which exception is primary (from the try body if there is one), then list the close exceptions in reverse resource order as suppressed."
  ],
  "terms": [
   [
    "Suppressed exception",
    "An exception thrown while closing a resource that is attached to the primary exception instead of replacing it."
   ],
   [
    "Primary exception",
    "The exception that actually propagates; in try-with-resources, the one thrown by the try block if there is one."
   ],
   [
    "getSuppressed()",
    "A Throwable method returning an array of the exceptions suppressed by this one."
   ],
   [
    "getCause()",
    "A Throwable method returning the exception that caused this one, which is different from suppressed exceptions."
   ]
  ],
  "example": "A backup job fails while writing to a network share, and then closing the connection fails too. Because the job uses try-with-resources, the log shows the real write error as the main exception, with the close failure listed under Suppressed, so the operations team fixes the right problem first.",
  "tip": "In try-with-resources, the body's exception wins and close exceptions become suppressed. In a plain finally, a new exception replaces the original, which is lost.",
  "check": [
   [
    "If the try body and a resource's close() both throw, which exception reaches the catch block?",
    "The one from the try body; the close() exception is available through getSuppressed()."
   ],
   [
    "If only close() throws, is anything suppressed?",
    "No. The close() exception is thrown as the primary exception."
   ],
   [
    "What is the difference between getCause() and getSuppressed()?",
    "getCause returns the exception that caused this one; getSuppressed returns extra exceptions that were thrown alongside it and suppressed."
   ]
  ]
 },
 {
  "t": "Declaring exceptions with throws and overriding rules",
  "body": [
   "The `throws` clause in a method or constructor header lists the checked exceptions it may pass to its caller: `void load(String name) throws IOException, SQLException`. It is part of the method's contract, and callers must then handle or declare those exceptions. Do not confuse it with `throw`, which is a statement that throws one exception object right now.",
   "You may list unchecked exceptions in `throws` as documentation, but the compiler ignores them for handle-or-declare purposes. You may also declare a checked exception that the method never actually throws; that compiles, and it forces callers to deal with it anyway. A `throws` clause can name a supertype, such as `throws Exception`, which covers every checked exception, at the cost of making callers handle a very broad type.",
   "Overriding adds a restriction. An overriding method cannot throw new checked exceptions or broader checked exceptions than the method it overrides. It may throw the same checked exceptions, narrower subclasses of them, fewer of them, or none at all. It may always throw any unchecked exception. The reason is polymorphism: code that calls the method through a supertype reference only prepared for the exceptions the supertype declared, so a subclass must not surprise it.",
   "```java\nclass Loader {\n    void load() throws IOException { }\n}\nclass FileLoader extends Loader {\n    @Override void load() throws FileNotFoundException { }  // OK: narrower\n}\nclass QuietLoader extends Loader {\n    @Override void load() { }                                // OK: none\n}\nclass BadLoader extends Loader {\n    // @Override void load() throws Exception { }            // broader: error\n    // @Override void load() throws SQLException { }         // new: error\n    @Override void load() throws IllegalStateException { }   // OK: unchecked\n}\n```",
   "The rules apply to interface methods too, which matters for `AutoCloseable`: its `close()` declares `throws Exception`, so an implementation may declare anything narrower, including nothing. The declared type that matters for callers is the reference type. If you call `load()` on a `Loader` reference, you must handle `IOException` even when the object is a `QuietLoader`; if you call it on a `QuietLoader` reference, you need not handle anything.",
   "Overloading has no such restriction, because an overload is a different method. And constructors are not inherited or overridden, but a subclass constructor that calls a superclass constructor declaring a checked exception must itself declare that exception (or a supertype); it cannot catch it, because the `super(...)` call cannot sit inside a `try` block.",
   "In practice, declare specific exceptions rather than `throws Exception`, so callers can react to the actual problems."
  ],
  "terms": [
   [
    "throws clause",
    "The part of a method or constructor header that declares the checked exceptions it may pass to callers."
   ],
   [
    "throw statement",
    "A statement that throws one exception object, as in throw new IOException()."
   ],
   [
    "Narrower exception",
    "A subclass of an exception type, which an overriding method may declare in place of the parent type."
   ],
   [
    "Contract",
    "The promises a method's signature makes to callers, including which checked exceptions they must handle."
   ]
  ],
  "example": "A plugin framework declares `void run() throws PluginException`. A plugin author tries to override run with `throws IOException` and the build fails. Wrapping the IOException in a PluginException (passing it as the cause) keeps the contract that the framework's error handling depends on.",
  "tip": "For an override, allowed checked exceptions are: the same, narrower, fewer or none. Never new and never broader. Unchecked exceptions are always allowed.",
  "check": [
   [
    "Can an override of `void m() throws IOException` declare `throws FileNotFoundException`?",
    "Yes. FileNotFoundException is a subclass of IOException, so it is narrower."
   ],
   [
    "Can an override of `void m()` (no throws) declare `throws Exception`?",
    "No. That adds a checked exception the overridden method did not declare."
   ],
   [
    "Must you handle IOException when calling `load()` through a `Loader` reference that points to a subclass declaring no exceptions?",
    "Yes. The compiler uses the reference type's declaration, which throws IOException."
   ]
  ]
 },
 {
  "t": "Creating custom checked and unchecked exceptions",
  "body": [
   "You create your own exception type by extending an existing exception class. The choice of parent decides how it behaves. Extend `Exception` (or another checked exception such as `IOException`) to make a checked exception that callers must catch or declare. Extend `RuntimeException` (or a subclass like `IllegalArgumentException`) to make an unchecked exception. Extending `Error` is reserved for serious JVM-level problems and is not appropriate for application code.",
   "Choose checked when the caller can reasonably recover, for example `InsufficientFundsException` that a banking UI can respond to by asking for a smaller amount. Choose unchecked when the exception means a bug or a broken precondition that the caller should fix in code, such as passing an invalid identifier. Many modern libraries lean towards unchecked exceptions to avoid forcing boilerplate on every caller, but the exam wants you to know both.",
   "Custom exceptions usually provide constructors that pass information up to the parent. The common set is a no-argument constructor, one taking a `String` message, one taking a message and a `Throwable` cause, and one taking only a cause. Constructors are not inherited, so if you want these, you must write them and call `super(...)`. If you declare only a message constructor, `new MyException()` does not compile.",
   "```java\npublic class InsufficientFundsException extends Exception {     // checked\n    private final long shortfall;\n    public InsufficientFundsException(String message, long shortfall) {\n        super(message);\n        this.shortfall = shortfall;\n    }\n    public long getShortfall() { return shortfall; }\n}\n\npublic class AccountNotFoundException extends RuntimeException { // unchecked\n    public AccountNotFoundException(String id, Throwable cause) {\n        super(\"no account \" + id, cause);\n    }\n}\n\nvoid withdraw(long cents) throws InsufficientFundsException {\n    if (cents > balance) {\n        throw new InsufficientFundsException(\"balance too low\", cents - balance);\n    }\n    balance -= cents;\n}\n```",
   "Passing the cause is called exception chaining or wrapping. When a low-level exception, such as an `SQLException`, is caught and a higher-level custom exception is thrown instead, passing the original as the cause keeps the full story. `getCause()` returns it, and the stack trace shows it under \"Caused by:\". Throwing a new exception without the cause loses that information, which makes debugging much harder.",
   "Custom exceptions can add fields and methods, like `getShortfall()` above, so handlers get structured data rather than having to parse message text. Keep exception messages free of secrets such as passwords or full card numbers, since messages often end up in logs and error pages.",
   "On the exam, look at the `extends` clause to decide whether a custom exception is checked, then apply the handle-or-declare and overriding rules exactly as for built-in exceptions."
  ],
  "terms": [
   [
    "Custom exception",
    "An application-defined class that extends Exception, RuntimeException or one of their subclasses."
   ],
   [
    "Exception chaining",
    "Wrapping a caught exception as the cause of a new exception so the original details are kept."
   ],
   [
    "Cause",
    "The Throwable passed to an exception's constructor and returned by getCause()."
   ],
   [
    "super(message)",
    "The constructor call that passes a detail message to the parent exception class."
   ]
  ],
  "example": "An order service catches a low-level `SQLException` when saving an order and throws `OrderSaveException(\"could not save order 42\", e)`. The web layer handles OrderSaveException without knowing about SQL, while the logs still show the SQL error under Caused by.",
  "tip": "The parent class decides everything: extends Exception means checked, extends RuntimeException means unchecked. Constructors are not inherited, so write each one you need and call super.",
  "check": [
   [
    "Is `class ConfigException extends IllegalStateException` checked or unchecked?",
    "Unchecked, because IllegalStateException extends RuntimeException."
   ],
   [
    "Why pass the original exception as the cause when wrapping it?",
    "So getCause() and the stack trace keep the original error details for debugging."
   ],
   [
    "If a custom exception declares only `MyEx(String msg)`, does `new MyEx()` compile?",
    "No. Constructors are not inherited and no no-argument constructor exists."
   ]
  ]
 },
 {
  "t": "Declaring, creating and copying arrays; Arrays.sort, binarySearch, compare, mismatch",
  "body": [
   "An array is a fixed-size object holding elements of one type, indexed from 0. The brackets can go after the type or after the name, and this matters in multi-variable declarations: `int[] a, b;` declares two arrays, while `int a[], b;` declares one array `a` and one plain `int` `b`. You create an array with a size, `new int[5]`, which fills it with default values, or with an initializer, `new int[] {1, 2, 3}`. The short form `int[] x = {1, 2, 3};` works only in a declaration. Giving both a size and an initializer (`new int[3] {1, 2, 3}`) or neither (`new int[]`) is a compile error.",
   "An array's size is the `length` field (no parentheses, unlike `String.length()`), and it never changes. Accessing index `length` or a negative index throws `ArrayIndexOutOfBoundsException`. Multi-dimensional arrays are arrays of arrays, so rows can have different lengths: `int[][] grid = new int[3][];` creates three `null` rows that you fill later. Only the first dimension must be specified.",
   "Arrays do not override `equals` or `toString`. `a.equals(b)` and `a == b` both compare identity, and printing an array shows a type code and hash like `[I@1b6d3586`. Use `Arrays.equals(a, b)` to compare contents and `Arrays.toString(a)` to print them. To copy, use `a.clone()` (a shallow copy of the same length), `Arrays.copyOf(a, newLength)` (truncates, or pads with default values), `Arrays.copyOfRange(a, from, to)` (end exclusive), or `System.arraycopy(src, srcPos, dest, destPos, length)` into an existing array. All of these are shallow: for an array of objects, the copies share the same element objects.",
   "`Arrays.sort(a)` sorts in ascending order in place. Numbers sort numerically. Strings sort in natural (Unicode) order, where digits come before uppercase letters, which come before lowercase letters, so `{\"b\", \"A\", \"10\", \"9\"}` sorts to `[10, 9, A, b]`. Object arrays need elements that are `Comparable`, or a `Comparator` argument.",
   "`Arrays.binarySearch(a, key)` searches a sorted array. If the key is found it returns its index. If not, it returns `-(insertionPoint) - 1`, where the insertion point is the index where the key would go. On an unsorted array the result is undefined, so never assume a value for it.",
   "`Arrays.compare(a, b)` compares two arrays lexicographically, element by element, and returns a negative number, zero, or a positive number. If one array is a prefix of the other, the shorter one is smaller, and a `null` array is smaller than a non-null one. `Arrays.mismatch(a, b)` returns the index of the first position where the arrays differ, or -1 if they are equal; if one is a proper prefix of the other, it returns the length of the shorter array.",
   "```java\nint[] nums = {8, 2, 6, 4};\nArrays.sort(nums);                            // [2, 4, 6, 8]\nSystem.out.println(Arrays.binarySearch(nums, 6)); // 2\nSystem.out.println(Arrays.binarySearch(nums, 5)); // -3 (would go at index 2)\nint[] copy = Arrays.copyOf(nums, 6);          // [2, 4, 6, 8, 0, 0]\nSystem.out.println(Arrays.compare(new int[]{1, 2}, new int[]{1, 3})); // negative\nSystem.out.println(Arrays.mismatch(new int[]{1, 2, 3}, new int[]{1, 2})); // 2\nSystem.out.println(Arrays.mismatch(nums, nums.clone()));  // -1\n```"
  ],
  "terms": [
   [
    "Array",
    "A fixed-length object holding elements of one type, accessed by a zero-based index."
   ],
   [
    "Shallow copy",
    "A copy of an array whose elements are the same object references as the original."
   ],
   [
    "Insertion point",
    "The index where a missing key would be inserted; binarySearch returns -(insertion point) - 1 for it."
   ],
   [
    "Arrays.mismatch",
    "Returns the first index at which two arrays differ, or -1 if they are equal."
   ]
  ],
  "example": "A leaderboard keeps sorted scores in an int array. To find where a new score belongs, the code calls `Arrays.binarySearch`, and when the result is negative it converts it back with `-(result + 1)` to get the insertion point before shifting the lower scores down with System.arraycopy.",
  "tip": "For binarySearch on a missing value, find the index where it would be inserted, negate it, and subtract one. If the array is not sorted, the answer is 'undefined'.",
  "check": [
   [
    "In `int[] a, b[];`, what is the type of b?",
    "int[][], because the brackets after the type apply to both and b adds another dimension."
   ],
   [
    "What does `Arrays.binarySearch(new int[]{1, 3, 5}, 4)` return?",
    "-3. The insertion point is 2, and -(2) - 1 = -3."
   ],
   [
    "What does `Arrays.mismatch(new int[]{5, 6}, new int[]{5, 6})` return?",
    "-1, because the arrays are equal."
   ]
  ]
 },
 {
  "t": "List, Set, Map, Queue and Deque interfaces and their main implementations",
  "body": [
   "The Java Collections Framework is a set of interfaces and implementations in `java.util`. `Collection` is the root interface for `List`, `Set` and `Queue` (and `Deque`, which extends `Queue`). `Map` is part of the framework but does not extend `Collection`, because it stores key-value pairs rather than single elements. You usually declare variables with the interface type, `List<String> names = new ArrayList<>();`, so you can switch implementations later.",
   "A `List` is an ordered sequence that allows duplicates and gives access by index. `ArrayList` is backed by an array: fast random access, slower inserts in the middle. `LinkedList` is a doubly linked list that also implements `Deque`. A classic trap with `List<Integer>` is `remove`: `list.remove(1)` removes the element at index 1, because `remove(int)` is an exact match, while `list.remove(Integer.valueOf(1))` removes the value 1.",
   "A `Set` holds no duplicates. `HashSet` uses `hashCode` and `equals`, gives no ordering guarantee and allows one `null`. `LinkedHashSet` keeps insertion order. `TreeSet` keeps elements sorted and does not allow `null` with natural ordering. `add` returns `false` instead of throwing when the element is already present.",
   "A `Map` associates unique keys with values. `put` returns the previous value for the key, or `null`. `HashMap` allows one `null` key and `null` values and has no order guarantee. `LinkedHashMap` keeps insertion order. `TreeMap` keeps keys sorted. You iterate over a map through `keySet()`, `values()` or `entrySet()`.",
   "A `Queue` usually processes elements first-in, first-out. Each operation comes in two flavors: one that throws an exception when it fails and one that returns a special value. `add` throws if the element cannot be added while `offer` returns `false`; `remove` throws on an empty queue while `poll` returns `null`; `element` throws on an empty queue while `peek` returns `null`. `PriorityQueue` is the exception to FIFO: `poll` always removes the smallest element by natural order or comparator, although iterating over it shows no particular order.",
   "A `Deque` (double-ended queue, pronounced \"deck\") adds operations at both ends: `offerFirst`, `offerLast`, `pollFirst`, `pollLast`, `peekFirst`, `peekLast`, and so on. It can also act as a stack with `push`, `pop` and `peek`, which all work at the front. `ArrayDeque` is the usual implementation and does not allow `null` elements; it is preferred over the old `Stack` class.",
   "```java\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.push(2); stack.push(3);\nSystem.out.println(stack.pop());   // 3 (last in, first out)\n\nQueue<Integer> queue = new ArrayDeque<>();\nqueue.offer(1); queue.offer(2); queue.offer(3);\nSystem.out.println(queue.poll());  // 1 (first in, first out)\n\nQueue<Integer> pq = new PriorityQueue<>(List.of(5, 1, 3));\nSystem.out.println(pq.poll());     // 1 (smallest first)\nSystem.out.println(new ArrayDeque<Integer>().peek()); // null, no exception\n```"
  ],
  "terms": [
   [
    "List",
    "An ordered collection that allows duplicates and index-based access, such as ArrayList or LinkedList."
   ],
   [
    "Set",
    "A collection with no duplicate elements, such as HashSet, LinkedHashSet or TreeSet."
   ],
   [
    "Map",
    "A structure of unique keys mapped to values that is not a Collection, such as HashMap or TreeMap."
   ],
   [
    "Deque",
    "A double-ended queue supporting insertion and removal at both ends, usable as a queue or a stack."
   ]
  ],
  "example": "A help-desk system keeps incoming tickets in an ArrayDeque used as a FIFO queue, urgent tickets in a PriorityQueue ordered by severity, the set of agents on duty in a HashSet, and each agent's assigned tickets in a HashMap keyed by agent name.",
  "tip": "Learn the queue pairs: add/offer, remove/poll, element/peek. The first of each throws on failure, the second returns false or null. push and pop on a Deque work at the front.",
  "check": [
   [
    "For `List<Integer> list = new ArrayList<>(List.of(10, 20, 30));`, what does `list.remove(1)` remove?",
    "The element at index 1, which is 20, because remove(int) matches the int argument exactly."
   ],
   [
    "What does `poll()` return on an empty queue?",
    "null. remove() would throw NoSuchElementException instead."
   ],
   [
    "Does Map extend Collection?",
    "No. Map is a separate interface in the framework."
   ]
  ]
 },
 {
  "t": "Unmodifiable collections: List.of, Set.of, Map.of and Arrays.asList behavior",
  "body": [
   "The factory methods `List.of`, `Set.of` and `Map.of` create unmodifiable collections in one line. Any attempt to change them, such as `add`, `remove`, `put`, `clear` or `set`, compiles fine (the methods exist on the interfaces) but throws `UnsupportedOperationException` at runtime. That is the pattern the exam tests: the code compiles, then fails.",
   "These factories also reject `null`. Passing a `null` element, key or value throws `NullPointerException`. `Set.of` with duplicate elements and `Map.of` with duplicate keys throw `IllegalArgumentException`, because they would otherwise silently drop data. The iteration order of `Set.of` and `Map.of` is unspecified, so do not rely on it. `Map.of` takes key-value pairs directly as arguments for up to 10 pairs; for more, use `Map.ofEntries(Map.entry(k, v), ...)`.",
   "`List.copyOf`, `Set.copyOf` and `Map.copyOf` create unmodifiable copies of an existing collection. They have the same no-null rule, and later changes to the source do not affect the copy. That differs from `Collections.unmodifiableList(list)`, which returns a read-only view: you cannot change it through the view, but changes made to the original list show through.",
   "`Arrays.asList(array)` is a different creature. It returns a fixed-size list backed by the array. You can call `set` to replace elements, and the change writes through to the array, and changes to the array show up in the list. But `add` and `remove` throw `UnsupportedOperationException` because the size is fixed. Unlike `List.of`, `Arrays.asList` allows `null` elements.",
   "```java\nString[] arr = {\"a\", \"b\", \"c\"};\nList<String> fixed = Arrays.asList(arr);\nfixed.set(0, \"z\");              // OK: arr[0] is now \"z\"\narr[1] = \"y\";                   // list sees it: [z, y, c]\n// fixed.add(\"d\");              // UnsupportedOperationException\n\nList<String> immutable = List.of(\"a\", \"b\");\n// immutable.set(0, \"z\");       // UnsupportedOperationException\n// List.of(\"a\", null);          // NullPointerException\n// Set.of(\"a\", \"a\");            // IllegalArgumentException\n\nList<String> growable = new ArrayList<>(List.of(\"a\", \"b\"));\ngrowable.add(\"c\");              // OK: a regular ArrayList copy\n```",
   "Unmodifiable is shallow. A `List.of(sb1, sb2)` holding `StringBuilder` objects cannot gain or lose elements, but each builder can still be changed. True immutability requires immutable elements as well.",
   "A quick way to remember the table: `List.of` is no changes and no nulls; `Arrays.asList` is set yes, add or remove no, nulls allowed, backed by the array; `new ArrayList<>(...)` is fully modifiable."
  ],
  "terms": [
   [
    "Unmodifiable collection",
    "A collection whose mutator methods throw UnsupportedOperationException, such as those from List.of."
   ],
   [
    "UnsupportedOperationException",
    "The runtime exception thrown when a collection does not support a modifying operation."
   ],
   [
    "Fixed-size list",
    "The list returned by Arrays.asList, which supports set but not add or remove."
   ],
   [
    "Unmodifiable view",
    "A read-only wrapper, such as Collections.unmodifiableList, that still reflects changes to the underlying collection."
   ]
  ],
  "example": "A configuration class exposes its allowed file extensions as `List.of(\"pdf\", \"png\", \"jpg\")`. When a plugin tries to add \"exe\" to the list at runtime, it gets an UnsupportedOperationException instead of silently widening what the upload feature accepts.",
  "tip": "Mutating a List.of, Set.of or Map.of collection compiles but throws UnsupportedOperationException. Arrays.asList allows set but not add or remove, and writes through to the array.",
  "check": [
   [
    "What happens with `Map.of(\"a\", 1, \"a\", 2)`?",
    "IllegalArgumentException at runtime, because of the duplicate key."
   ],
   [
    "After `String[] a = {\"x\"}; List<String> l = Arrays.asList(a); l.set(0, \"y\");`, what is a[0]?",
    "\"y\". The list is backed by the array, so set writes through."
   ],
   [
    "Does `List.of(1, 2).add(3)` compile?",
    "Yes, but it throws UnsupportedOperationException at runtime."
   ]
  ]
 },
 {
  "t": "Sequenced collections: getFirst, getLast, addFirst, reversed",
  "body": [
   "Before Java 21, getting the first or last element worked differently for each collection type: `list.get(0)` and `list.get(list.size() - 1)` for lists, `deque.getFirst()` for deques, `sortedSet.first()` for sorted sets, and nothing convenient at all for `LinkedHashSet`. Sequenced collections, added in Java 21, give every collection with a defined encounter order one common set of methods.",
   "The new `SequencedCollection` interface declares `addFirst`, `addLast`, `getFirst`, `getLast`, `removeFirst`, `removeLast` and `reversed`. `List` and `Deque` extend it, and a new `SequencedSet` interface extends it for sets with an order, implemented by `LinkedHashSet` and inherited by `SortedSet` and `NavigableSet`, so `TreeSet` has it too. `HashSet` does not, because it has no defined order. For maps, `SequencedMap` is implemented by `LinkedHashMap` and extended by `SortedMap`, so `TreeMap` has it; `HashMap` does not.",
   "The behavior details are what the exam checks. `getFirst` and `removeFirst` on an empty collection throw `NoSuchElementException`, not return `null`. On unmodifiable collections such as `List.of(...)`, the add and remove methods throw `UnsupportedOperationException`. On sorted collections like `TreeSet`, `addFirst` and `addLast` throw `UnsupportedOperationException`, because the sort order decides where an element goes. On a `LinkedHashSet`, `addFirst` moves an element that is already present to the front.",
   "`reversed()` returns a reverse-ordered view, not a copy. Iterating over it visits elements from last to first, and changes to the original show through the view. If the original is modifiable, changes made through the view (where supported) write back to it.",
   "```java\nList<String> list = new ArrayList<>(List.of(\"b\", \"c\"));\nlist.addFirst(\"a\");                    // [a, b, c]\nlist.addLast(\"d\");                     // [a, b, c, d]\nSystem.out.println(list.getFirst());   // a\nSystem.out.println(list.getLast());    // d\nList<String> rev = list.reversed();\nSystem.out.println(rev);               // [d, c, b, a]\nlist.removeFirst();\nSystem.out.println(rev);               // [d, c, b]  (view reflects change)\n\nvar set = new LinkedHashSet<>(List.of(1, 2, 3));\nset.addFirst(3);                       // [3, 1, 2]\n// new TreeSet<>(set).addFirst(0);     // UnsupportedOperationException\n// new ArrayList<String>().getFirst(); // NoSuchElementException\n```",
   "`SequencedMap` adds `firstEntry`, `lastEntry`, `pollFirstEntry`, `pollLastEntry`, `putFirst`, `putLast` and `reversed`, plus `sequencedKeySet()`, `sequencedValues()` and `sequencedEntrySet()`. As with sets, `putFirst` and `putLast` are unsupported on a `TreeMap`, since the keys' order decides placement.",
   "Remember that `Collection`, `Set` and `Map` themselves did not gain these methods; only the sequenced subtypes did. So `Set<String> s = new LinkedHashSet<>(); s.getFirst();` does not compile, because the reference type is `Set`."
  ],
  "terms": [
   [
    "SequencedCollection",
    "A Java 21 interface for collections with a defined encounter order, providing first/last operations and reversed()."
   ],
   [
    "SequencedSet",
    "A sequenced collection with no duplicates, implemented by LinkedHashSet and inherited by SortedSet."
   ],
   [
    "SequencedMap",
    "A map with a defined entry order, implemented by LinkedHashMap and extended by SortedMap."
   ],
   [
    "reversed()",
    "Returns a reverse-ordered view of a sequenced collection or map that reflects later changes."
   ]
  ],
  "example": "A browser keeps visited pages in a LinkedHashSet. Revisiting a page calls `history.addFirst(url)`, which moves it to the front without duplicating it, and the history menu displays `history.reversed()` or the first ten entries depending on the user's chosen order.",
  "tip": "Check the reference type first: Set and Collection references do not have getFirst. Then check the implementation: TreeSet and TreeMap reject addFirst and putFirst, unmodifiable lists reject all changes, and empty collections throw NoSuchElementException.",
  "check": [
   [
    "Does `HashSet` have `getFirst()`?",
    "No. HashSet has no defined order, so it does not implement SequencedCollection."
   ],
   [
    "What does `new ArrayList<Integer>().getLast()` do?",
    "It throws NoSuchElementException because the list is empty."
   ],
   [
    "Is the list returned by `reversed()` a copy?",
    "No. It is a view, so changes to the original list appear in it."
   ]
  ]
 },
 {
  "t": "Map methods: merge, computeIfAbsent, getOrDefault, putIfAbsent",
  "body": [
   "Beyond `put` and `get`, the `Map` interface has default methods that handle common patterns in a single call: counting, grouping and supplying fallbacks. The exam tests their exact return values and how they treat missing keys and `null` values, so learn each one's rule precisely.",
   "`getOrDefault(key, defaultValue)` returns the value for the key if the key is present, and `defaultValue` otherwise. It does not change the map. For a key that is present but mapped to `null` (possible in a `HashMap`), it returns `null`, not the default, because the key does exist.",
   "`putIfAbsent(key, value)` adds the mapping only if the key is absent or currently mapped to `null`. It returns the previous value: `null` if it added the mapping, or the existing value if it left the map unchanged. It never overwrites a non-null value.",
   "`computeIfAbsent(key, mappingFunction)` calls the function only when the key is absent or mapped to `null`. The function receives the key, and its result is stored and returned. If the key already has a non-null value, the function is not called at all, and the existing value is returned. If the function returns `null`, nothing is stored. This makes it perfect for grouping into lists: `map.computeIfAbsent(dept, k -> new ArrayList<>()).add(name);`. The related `computeIfPresent` runs only when a non-null value exists, and `compute` always runs.",
   "`merge(key, value, remappingFunction)` combines a new value with an existing one. If the key is absent or mapped to `null`, it stores the given value. Otherwise it calls the function with the old value and the new value and stores the result. If the function returns `null`, the key is removed. `merge` returns the new value (or `null` if removed). Counting words becomes one line: `counts.merge(word, 1, Integer::sum);`.",
   "```java\nMap<String, Integer> stock = new HashMap<>();\nstock.put(\"apple\", 5);\nstock.put(\"pear\", null);\n\nSystem.out.println(stock.getOrDefault(\"kiwi\", 0));    // 0\nSystem.out.println(stock.getOrDefault(\"pear\", 0));    // null\nSystem.out.println(stock.putIfAbsent(\"apple\", 9));    // 5 (unchanged)\nSystem.out.println(stock.putIfAbsent(\"pear\", 2));     // null (now 2)\nSystem.out.println(stock.merge(\"apple\", 3, Integer::sum)); // 8\nstock.merge(\"apple\", 0, (oldV, newV) -> null);        // removes apple\nSystem.out.println(stock.computeIfAbsent(\"fig\", k -> k.length())); // 3\nSystem.out.println(stock);  // {pear=2, fig=3} (order not guaranteed)\n```",
   "These methods also exist on `TreeMap`, `LinkedHashMap` and `ConcurrentHashMap`, where the compute and merge methods are atomic. With unmodifiable maps such as `Map.of`, any of them that would change the map throws `UnsupportedOperationException`."
  ],
  "terms": [
   [
    "getOrDefault",
    "Returns the mapped value if the key is present, otherwise the supplied default, without modifying the map."
   ],
   [
    "putIfAbsent",
    "Stores a value only when the key is absent or mapped to null, and returns the previous value."
   ],
   [
    "computeIfAbsent",
    "Computes and stores a value from the key only when the key is absent or mapped to null, returning the current value."
   ],
   [
    "merge",
    "Stores a value for an absent key, or combines it with the existing value using a function; a null result removes the key."
   ]
  ],
  "example": "An analytics job reads millions of log lines and counts hits per page with `hits.merge(page, 1, Integer::sum)`, and it groups error messages by status code with `errors.computeIfAbsent(code, c -> new ArrayList<>()).add(line)`, replacing a dozen lines of if-contains-then-put code.",
  "tip": "Check the return value asked for: putIfAbsent returns the old value (null when it inserted), while merge and computeIfAbsent return the current value. A null result from merge's function removes the key.",
  "check": [
   [
    "What does `putIfAbsent` return when the key already maps to 7?",
    "7, the existing value, and the map is not changed."
   ],
   [
    "When is the function in `computeIfAbsent` called?",
    "Only when the key is absent or mapped to null."
   ],
   [
    "What happens if the remapping function in `merge` returns null?",
    "The key's mapping is removed from the map."
   ]
  ]
 },
 {
  "t": "Sorting with Comparable and Comparator (comparing, thenComparing, reversed)",
  "body": [
   "Java has two ways to define an order. `Comparable<T>` gives a class its natural ordering from inside the class, through one method, `int compareTo(T other)`. `Comparator<T>` defines an ordering from outside the class, through `int compare(T a, T b)`, so you can have many orders for one type. Both return a negative number if the first argument comes first, zero if they are equal in order, and a positive number if the first comes after.",
   "`String`, the wrapper classes, `LocalDate` and enums already implement `Comparable`. Strings compare by Unicode value, so uppercase letters sort before lowercase. Enums compare by ordinal. When you implement `compareTo` yourself, it should be consistent with `equals`: returning 0 exactly when `equals` is true. Sorted collections like `TreeSet` use `compareTo` to decide duplicates, so inconsistency causes surprising results.",
   "For numeric fields, use `Integer.compare(a, b)` rather than subtracting (`a - b`), because subtraction can overflow and give the wrong sign for large values.",
   "The `Comparator` interface has static and default methods that build comparators without writing `compare` by hand. `Comparator.comparing(Person::lastName)` sorts by a key that is `Comparable`. `comparingInt`, `comparingLong` and `comparingDouble` avoid boxing for primitive keys. `thenComparing(...)` adds a tie-breaker used only when the previous comparison returns 0. `reversed()` reverses the whole comparator it is called on. `Comparator.naturalOrder()` and `Comparator.reverseOrder()` give natural ordering and its reverse, and `nullsFirst`/`nullsLast` wrap a comparator to handle `null` values.",
   "```java\nrecord Person(String last, String first, int age) {}\nList<Person> people = new ArrayList<>(List.of(\n    new Person(\"Lee\", \"Ann\", 30),\n    new Person(\"Kim\", \"Bo\", 25),\n    new Person(\"Lee\", \"Al\", 41)));\n\npeople.sort(Comparator.comparing(Person::last)\n                      .thenComparing(Person::first));\n// Kim Bo, Lee Al, Lee Ann\n\npeople.sort(Comparator.comparingInt(Person::age).reversed());\n// Lee Al (41), Lee Ann (30), Kim Bo (25)\n\npeople.sort(Comparator.comparing(Person::last)\n                      .thenComparing(Person::age, Comparator.reverseOrder()));\n// Kim Bo, Lee Al (41), Lee Ann (30)\n```",
   "Position matters with `reversed()`. `comparing(a).thenComparing(b).reversed()` reverses both keys. To reverse only the second key, pass a reversed comparator into `thenComparing`, as in the last example. Another trap: `Comparator.comparing(p -> p.last()).reversed()` may fail to compile, because with the chained call the compiler cannot infer the lambda's parameter type and treats it as `Object`. A method reference or an explicitly typed lambda, `(Person p) -> p.last()`, fixes it.",
   "To sort, call `list.sort(comparator)`, `Collections.sort(list)` for natural order, `Collections.sort(list, comparator)`, or `Arrays.sort(array, comparator)` for object arrays. Sorting objects that are not `Comparable` without a comparator fails with a `ClassCastException` at runtime (or a compile error with `Collections.sort`, whose signature requires `Comparable`). These sorts are stable, so equal elements keep their existing relative order."
  ],
  "terms": [
   [
    "Comparable",
    "An interface a class implements to define its natural ordering through compareTo."
   ],
   [
    "Comparator",
    "A separate object that defines an ordering through compare, allowing several orders for one type."
   ],
   [
    "thenComparing",
    "A Comparator method that adds a secondary key used only when the first comparison is a tie."
   ],
   [
    "Stable sort",
    "A sort that keeps equal elements in their original relative order."
   ]
  ],
  "example": "An online store's product page lets shoppers sort by price, then by rating. The code builds `Comparator.comparingDouble(Product::price).thenComparing(Product::rating, Comparator.reverseOrder())`, so cheaper items come first and, among equal prices, the best rated appear on top.",
  "tip": "Read comparator chains left to right, and apply reversed() to everything before it in the chain. compareTo and compare return negative, zero or positive, not only -1, 0 and 1.",
  "check": [
   [
    "What does `\"apple\".compareTo(\"Banana\")` return, positive or negative?",
    "Positive. Lowercase 'a' has a higher Unicode value than uppercase 'B', so \"apple\" sorts after \"Banana\"."
   ],
   [
    "In `comparing(A).thenComparing(B).reversed()`, which keys are reversed?",
    "Both A and B, because reversed() applies to the whole comparator built so far."
   ],
   [
    "Why is `return this.age - other.age;` risky in compareTo?",
    "The subtraction can overflow for large or negative values and return the wrong sign. Integer.compare avoids that."
   ]
  ]
 },
 {
  "t": "TreeSet and TreeMap natural ordering",
  "body": [
   "`TreeSet` and `TreeMap` keep their elements (or keys) sorted at all times, using a balanced tree internally, so add, remove and lookup take time proportional to the logarithm of the size. By default they use natural ordering, meaning the elements' `compareTo` method: numbers ascending, strings in Unicode order (digits, then uppercase, then lowercase), dates chronologically. You can pass a `Comparator` to the constructor to use a different order, such as `new TreeSet<>(Comparator.reverseOrder())`.",
   "With natural ordering, elements must implement `Comparable`. Adding an object that does not, such as a plain class with no `compareTo`, compiles but throws `ClassCastException` at runtime, even for the very first element. Adding `null` throws `NullPointerException`, because `null` cannot be compared. The same rules apply to `TreeMap` keys; values can be anything, including `null`.",
   "Duplicates are decided by the comparison, not by `equals`. If `compareTo` (or the comparator) returns 0 for two elements, the tree treats them as the same, so the second is not added to a `TreeSet`, and in a `TreeMap` the second `put` replaces the value for the existing key. A `TreeSet<String>` built with `String.CASE_INSENSITIVE_ORDER`, for example, keeps only one of `\"a\"` and `\"A\"`.",
   "Because they are sorted, these classes implement `NavigableSet` and `NavigableMap`, which add navigation methods. `first()` and `last()` give the extremes. `lower(e)` returns the greatest element strictly less than `e`, `floor(e)` the greatest less than or equal, `ceiling(e)` the least greater than or equal, and `higher(e)` the least strictly greater; each returns `null` if there is none. `headSet(to)` is exclusive of `to`, `tailSet(from)` is inclusive of `from`, and `subSet(from, to)` includes `from` but excludes `to`; overloads with boolean flags let you choose. `pollFirst()` and `pollLast()` remove and return the extremes, and `descendingSet()` gives a reverse view.",
   "```java\nTreeSet<Integer> set = new TreeSet<>(List.of(40, 10, 30, 20));\nSystem.out.println(set);               // [10, 20, 30, 40]\nSystem.out.println(set.floor(25));     // 20\nSystem.out.println(set.ceiling(25));   // 30\nSystem.out.println(set.higher(40));    // null\nSystem.out.println(set.headSet(30));   // [10, 20]\nSystem.out.println(set.tailSet(30));   // [30, 40]\n\nTreeMap<String, Integer> map = new TreeMap<>();\nmap.put(\"banana\", 2); map.put(\"Apple\", 1); map.put(\"cherry\", 3);\nSystem.out.println(map);               // {Apple=1, banana=2, cherry=3}\nSystem.out.println(map.firstKey());    // Apple\nSystem.out.println(map.headMap(\"c\"));  // {Apple=1, banana=2}\n```",
   "`TreeMap` offers the matching key methods: `firstKey`, `lastKey`, `floorKey`, `ceilingKey`, `lowerKey`, `higherKey`, their `...Entry` versions that return key-value pairs, `headMap`, `tailMap`, `subMap` and `descendingMap`. The range methods return views backed by the original, so changes to one show in the other.",
   "Choose a tree when you need sorted iteration or range queries, such as finding the next scheduled event after a given time. If you only need fast lookup, `HashSet` and `HashMap` are usually faster."
  ],
  "terms": [
   [
    "Natural ordering",
    "The order defined by an element's own compareTo method from the Comparable interface."
   ],
   [
    "NavigableSet",
    "A sorted set interface with methods such as floor, ceiling, headSet and tailSet, implemented by TreeSet."
   ],
   [
    "floor / ceiling",
    "The greatest element less than or equal to, or the least element greater than or equal to, a given value."
   ],
   [
    "headSet / tailSet",
    "Views of the elements below a bound (exclusive by default) or at and above a bound (inclusive by default)."
   ]
  ],
  "example": "A meeting-room booking system stores each room's bookings in a TreeMap keyed by start time. To check whether a new booking clashes, it calls `floorEntry(newStart)` to find the booking that starts just before it and `ceilingKey(newStart)` to find the next one, instead of scanning the whole list.",
  "tip": "In a TreeSet or TreeMap, compareTo returning 0 means duplicate, regardless of equals. headSet excludes its bound, tailSet includes it, and lower/higher are strict while floor/ceiling are not.",
  "check": [
   [
    "What does `new TreeSet<>(List.of(\"b\", \"A\", \"a\", \"1\"))` print?",
    "[1, A, a, b]. Natural string order puts digits before uppercase before lowercase."
   ],
   [
    "What happens when you add `null` to a TreeSet using natural ordering?",
    "It throws NullPointerException, because null cannot be compared."
   ],
   [
    "For a TreeSet containing 10, 20, 30, what do `lower(20)` and `floor(20)` return?",
    "lower(20) returns 10 (strictly less); floor(20) returns 20 (less than or equal)."
   ]
  ]
 },
 {
  "t": "Generics: type parameters, bounded types and wildcards (? extends, ? super)",
  "body": [
   "Generics let you write a class or method once and have the compiler check the types it works with. When you write `List<String>`, the compiler rejects `list.add(42)` and lets you read elements without a cast. The angle-bracket names such as `T`, `E`, `K` and `V` are type parameters: placeholders that are replaced by real type arguments at each use. The diamond `<>` on the right side (`new ArrayList<>()`) asks the compiler to infer the type argument from the left side.",
   "A generic method declares its own type parameters just before the return type: `static <T> T first(List<T> list)`. The compiler infers `T` from the arguments. A bounded type parameter restricts what `T` can be. `<T extends Number>` means T must be Number or a subclass, so inside the method you may call `doubleValue()` on a T. Multiple bounds use `&`, and a class bound must come first: `<T extends Number & Comparable<T>>`. Note that `extends` is used for both classes and interfaces in a bound.",
   "Generics use type erasure: after compilation, type arguments are removed and replaced by their bound (or Object). That is why you cannot write `new T()`, `new T[10]`, `instanceof List<String>` (unless the compiler can prove the check is safe from the expression's static type; `instanceof List<?>` is always allowed), or overload two methods that differ only by type argument such as `m(List<String>)` and `m(List<Integer>)`; after erasure they have the same signature. Static fields cannot use a class's type parameter either.",
   "Generic types are invariant: `List<Integer>` is not a subtype of `List<Number>`, even though Integer is a Number. If it were, you could add a Double to a list of Integers. Wildcards give you controlled flexibility. `List<?>` is a list of some unknown type; you can read elements as Object but can add only `null`. `List<? extends Number>` is an upper-bounded wildcard: it accepts `List<Integer>` or `List<Double>`, you can read elements as Number, but you cannot add anything except `null` because the compiler does not know the exact element type.",
   "`List<? super Integer>` is a lower-bounded wildcard: it accepts `List<Integer>`, `List<Number>` or `List<Object>`. You can safely add Integers to it, but when you read you only get Object. The rule of thumb is PECS: Producer Extends, Consumer Super. If a parameter produces values you read, use `? extends`; if it consumes values you write, use `? super`. `Collections.copy(List<? super T> dest, List<? extends T> src)` is the classic example.",
   "```java\nstatic double sum(List<? extends Number> nums) {\n    double total = 0;\n    for (Number n : nums) total += n.doubleValue();\n    return total;\n}\nstatic void fill(List<? super Integer> out) {\n    out.add(1); out.add(2);   // OK\n    // Integer i = out.get(0); // does not compile: returns Object\n}\n```"
  ],
  "terms": [
   [
    "Type parameter",
    "A placeholder such as T declared in angle brackets on a class, interface or method and replaced by a type argument at each use."
   ],
   [
    "Bounded type parameter",
    "A type parameter restricted with extends, such as <T extends Comparable<T>>, so the code can call methods of the bound."
   ],
   [
    "Upper-bounded wildcard",
    "? extends X: accepts X or any subtype; safe for reading as X, but only null can be added."
   ],
   [
    "Lower-bounded wildcard",
    "? super X: accepts X or any supertype; safe for adding X values, but reads return Object."
   ],
   [
    "Type erasure",
    "The compiler removes generic type arguments after checking them, so they are not available at run time."
   ]
  ],
  "example": "A reporting utility needs to total prices held in a List<BigDecimal> one day and a List<Integer> the next. Declaring the parameter as List<? extends Number> lets one method accept both, while a method that appends default quantities to a list takes List<? super Integer> so callers can pass a List<Number> or List<Object>.",
  "tip": "Exam questions often show list.add(...) on a List<? extends Something> and ask whether it compiles. It does not (except for null). With ? super, adding the bound type compiles, but assigning get() to anything more specific than Object does not.",
  "check": [
   [
    "Does List<Number> nums = new ArrayList<Integer>(); compile?",
    "No. Generic types are invariant, so ArrayList<Integer> is not a List<Number>. List<? extends Number> would accept it."
   ],
   [
    "Why can you not write new T() inside a generic class?",
    "Because of type erasure the actual type of T is unknown at run time, so the JVM cannot know which constructor to call."
   ],
   [
    "In <T extends Runnable & Serializable>, which must come first if one bound is a class?",
    "The class must be listed first, followed by any interfaces joined with &."
   ]
  ]
 },
 {
  "t": "List.remove(int) vs remove(Object) with Integer lists",
  "body": [
   "The List interface has two methods named remove. `E remove(int index)` removes the element at a position and returns it. `boolean remove(Object o)` removes the first element equal to o and returns true if it found one. With a `List<String>` there is no confusion, but with a `List<Integer>` a call like `list.remove(1)` could mean either, and the exam loves this trap.",
   "Java resolves overloads in phases. In the first phase the compiler looks for a method that matches without boxing or unboxing. The literal `1` is an int, and `remove(int)` accepts an int exactly, so it wins. Boxing to Integer to match `remove(Object)` is only considered if no method matched in the first phase. So `list.remove(1)` always removes by index, never by value.",
   "To remove by value you must pass an object: `list.remove(Integer.valueOf(1))` or `list.remove((Integer) 1)` or `list.remove((Object) 1)`. Now the argument is a reference type, the int overload does not apply, and `remove(Object)` runs. It uses `equals`, so it removes the first element whose value is 1, and returns false if there is none rather than throwing.",
   "The return types differ too, which helps you read a question. `remove(int)` returns the removed element (an Integer), and throws `IndexOutOfBoundsException` if the index is negative or not less than `size()`. `remove(Object)` returns a boolean. If code assigns the result to a boolean, it must be the Object version; if it assigns to an Integer or int, it must be the index version.",
   "```java\nList<Integer> nums = new ArrayList<>(List.of(10, 20, 1, 30));\nnums.remove(1);                  // removes index 1 (20) -> [10, 1, 30]\nnums.remove(Integer.valueOf(1)); // removes value 1     -> [10, 30]\nboolean b = nums.remove(Integer.valueOf(99)); // false, no change\n// nums.remove(5);  // IndexOutOfBoundsException at run time\n```",
   "Watch for related traps. A short or char variable also widens to int and selects the index version. An unmodifiable list from `List.of` throws `UnsupportedOperationException` on either remove. Removing inside an enhanced for loop over the same ArrayList typically throws `ConcurrentModificationException`; use `removeIf(x -> x == 1)` or an Iterator's remove instead. `removeIf` takes a Predicate, so there is no index ambiguity at all."
  ],
  "terms": [
   [
    "remove(int index)",
    "Removes and returns the element at the given position; throws IndexOutOfBoundsException for a bad index."
   ],
   [
    "remove(Object o)",
    "Removes the first element equal to o and returns true if one was removed, false otherwise."
   ],
   [
    "Overload resolution phases",
    "The compiler first tries matches without boxing, then with boxing and unboxing, then with varargs."
   ],
   [
    "removeIf",
    "A Collection method that removes every element matching a Predicate and returns true if anything was removed."
   ]
  ],
  "example": "A developer keeps a List<Integer> of ticket IDs and calls ids.remove(ticketId) where ticketId is an int. Instead of removing ticket 3, the code removes whatever sits at index 3, or crashes when the list is short. Changing the call to ids.remove(Integer.valueOf(ticketId)) fixes the bug.",
  "tip": "For a List<Integer>, a plain int argument always means index. Look for Integer.valueOf, a cast to Integer or Object, or an Integer variable to spot the by-value version.",
  "check": [
   [
    "Given List<Integer> x = new ArrayList<>(List.of(5, 6, 7)); what does x.remove(2) do?",
    "It removes the element at index 2, which is 7, and returns it. The list becomes [5, 6]."
   ],
   [
    "What does x.remove(Integer.valueOf(9)) return if 9 is not in the list?",
    "It returns false and leaves the list unchanged; it does not throw an exception."
   ]
  ]
 },
 {
  "t": "Functional interfaces in java.util.function: Supplier, Consumer, Function, Predicate, UnaryOperator, BinaryOperator",
  "body": [
   "A functional interface is an interface with exactly one abstract method. Default and static methods do not count, and neither do abstract methods that match public methods of Object such as `equals`. Because there is only one abstract method, a lambda or method reference can supply its body. The optional `@FunctionalInterface` annotation makes the compiler check the rule. The package `java.util.function` supplies ready-made interfaces so you rarely need to write your own.",
   "Learn the six core shapes by their method names, because the exam expects you to know which method to call. `Supplier<T>` has `T get()`: no input, one output, useful for lazy values and factories. `Consumer<T>` has `void accept(T t)`: one input, no result, used for side effects such as printing. `Function<T, R>` has `R apply(T t)`: converts a T into an R. `Predicate<T>` has `boolean test(T t)`: answers yes or no.",
   "`UnaryOperator<T>` extends `Function<T, T>`, so its method is still `apply`, but the input and output types are the same, for example `String::toUpperCase`. `BinaryOperator<T>` extends `BiFunction<T, T, T>` with `T apply(T a, T b)`, which is exactly what `reduce` expects, for example `Integer::sum`. The Bi versions take two arguments: `BiConsumer<T, U>` (accept), `BiFunction<T, U, R>` (apply) and `BiPredicate<T, U>` (test). There is no BiSupplier, because a supplier takes no input.",
   "Several of these interfaces have default methods for composition. `Predicate` offers `and`, `or` and `negate`, plus static `Predicate.not(p)` and `Predicate.isEqual(x)`. `Function` offers `andThen` (apply this, then the other) and `compose` (apply the other first), plus static `Function.identity()`. `Consumer` offers `andThen`. `BinaryOperator` has static `minBy(comparator)` and `maxBy(comparator)`.",
   "```java\nSupplier<List<String>> maker = ArrayList::new;\nConsumer<String> show = System.out::println;\nFunction<String, Integer> len = String::length;\nPredicate<String> empty = String::isEmpty;\nUnaryOperator<String> up = String::toUpperCase;\nBinaryOperator<Integer> add = Integer::sum;\n\nFunction<Integer, Integer> plus1 = x -> x + 1, times2 = x -> x * 2;\nplus1.andThen(times2).apply(3); // (3+1)*2 = 8\nplus1.compose(times2).apply(3); // 3*2+1 = 7\n```",
   "To avoid boxing, primitive specializations exist: `IntPredicate`, `IntFunction<R>` (int in, R out), `ToIntFunction<T>` (T in, int out), `IntUnaryOperator`, `IntBinaryOperator`, `IntSupplier` (method `getAsInt`), `BooleanSupplier` (`getAsBoolean`) and matching Long and Double versions. The naming pattern tells you the direction: `IntFunction` takes an int, `ToIntFunction` returns an int."
  ],
  "terms": [
   [
    "Functional interface",
    "An interface with exactly one abstract method, which a lambda or method reference can implement."
   ],
   [
    "Supplier<T>",
    "Takes no arguments and returns a T through get()."
   ],
   [
    "Predicate<T>",
    "Takes a T and returns a boolean through test(); composable with and, or and negate."
   ],
   [
    "UnaryOperator<T>",
    "A Function<T, T> whose input and output types are the same; its method is apply."
   ],
   [
    "BinaryOperator<T>",
    "A BiFunction<T, T, T> that combines two values of the same type into one; used by reduce."
   ]
  ],
  "example": "An order service filters orders with a Predicate<Order> (isPaid), converts them with a Function<Order, Invoice>, and sends each invoice with a Consumer<Invoice>. A Supplier<LocalDate> for today's date is injected so tests can supply a fixed date instead of the real clock.",
  "tip": "Match method names to interfaces: get for Supplier, accept for Consumer, apply for Function and the operators, test for Predicate. Questions often call the wrong method, such as predicate.apply(x), which does not compile.",
  "check": [
   [
    "Which functional interface fits a lambda (a, b) -> a + b where a, b and the result are all Integer?",
    "BinaryOperator<Integer> (or the more general BiFunction<Integer, Integer, Integer>)."
   ],
   [
    "What is the difference between f.andThen(g) and f.compose(g)?",
    "andThen applies f first and then g to the result; compose applies g first and then f."
   ],
   [
    "What method does IntSupplier declare?",
    "int getAsInt(), which returns a primitive int without boxing."
   ]
  ]
 },
 {
  "t": "Lambda syntax, method references and effectively final variables",
  "body": [
   "A lambda expression is a compact implementation of a functional interface's single abstract method. Its shape is parameters, an arrow and a body. Parentheses are optional only for a single parameter with no declared type: `x -> x * 2`. Zero or several parameters need parentheses: `() -> 42`, `(a, b) -> a + b`. You may declare types, `(String s) -> s.length()`, or use `var`, `(var s) -> s.length()`, but you must be consistent: all parameters typed, all `var` or all untyped. Mixing, as in `(var a, b)`, does not compile.",
   "The body is either a single expression or a block. An expression body returns its value automatically and has no semicolon or return keyword inside: `s -> s.isEmpty()`. A block body uses braces, needs semicolons, and must use `return` if the interface returns a value: `s -> { return s.isEmpty(); }`. Writing `s -> { s.isEmpty() }` (no semicolon, no return) or `s -> return s.isEmpty();` (return without braces) are classic compile errors.",
   "A lambda can read local variables from the enclosing method only if they are final or effectively final, meaning they are never reassigned after initialization. The compiler captures a copy of the value, so allowing later changes would create confusion. Instance fields and static fields are different: the lambda reaches them through `this` or the class, so they can be read and modified freely. Lambda parameters and locals also cannot reuse the name of a local variable already in scope, and inside a lambda `this` means the enclosing instance, not the lambda.",
   "```java\nint limit = 10;\nPredicate<Integer> small = n -> n < limit; // OK: limit is effectively final\n// limit++;   // uncommenting breaks the lambda above: no longer effectively final\nString s = \"x\";\n// Function<String, Integer> f = s -> s.length(); // error: s already defined\n```",
   "A method reference is shorthand for a lambda that only calls one existing method. There are four kinds. Static: `Integer::parseInt` means `s -> Integer.parseInt(s)`. Bound instance, on a particular object: `System.out::println` means `x -> System.out.println(x)`. Unbound instance, on an arbitrary object of a type: `String::length` means `s -> s.length()`, where the first parameter becomes the receiver. Constructor: `ArrayList::new` means `() -> new ArrayList<>()` or a version with arguments, depending on the target interface.",
   "The same method reference can fit different interfaces. `String::concat` is a `BinaryOperator<String>` because `(a, b) -> a.concat(b)`. You cannot add extra arguments or logic to a method reference; if you need `s -> s.substring(1)`, you must use a lambda. The target type decides which overload a reference picks, so an ambiguous reference with overloaded methods can fail to compile."
  ],
  "terms": [
   [
    "Lambda expression",
    "An anonymous function written as parameters -> body that implements a functional interface."
   ],
   [
    "Effectively final",
    "A local variable that is never reassigned after it is initialized, so a lambda or inner class may capture it."
   ],
   [
    "Bound method reference",
    "A reference on a specific object, such as System.out::println, whose receiver is fixed when the reference is created."
   ],
   [
    "Unbound method reference",
    "A reference such as String::length where the first argument supplied at call time becomes the receiver."
   ],
   [
    "Constructor reference",
    "ClassName::new, which creates a new object using the constructor that matches the target interface's parameters."
   ]
  ],
  "example": "A sorting utility is refactored from an anonymous Comparator class to people.sort(Comparator.comparing(Person::lastName)). The unbound method reference Person::lastName reads each person's last name, making the code shorter and harder to get wrong.",
  "tip": "Check three things in every lambda question: parentheses rules for parameters, braces with return and semicolons, and whether any captured local variable is reassigned anywhere in the method, even after the lambda.",
  "check": [
   [
    "Does (a, var b) -> a + b compile?",
    "No. Parameters must be all explicitly typed, all var, or all untyped; mixing styles is a compile error."
   ],
   [
    "Rewrite s -> s.trim() as a method reference and name its kind.",
    "String::trim, an unbound instance method reference: the lambda's parameter becomes the object trim is called on."
   ],
   [
    "Can a lambda increment an instance field count++?",
    "Yes. The effectively final rule applies only to captured local variables and parameters, not to fields."
   ]
  ]
 },
 {
  "t": "Creating streams: collections, Stream.of, IntStream.range/rangeClosed, Stream.iterate",
  "body": [
   "A stream is a pipeline for processing a sequence of elements: a source, zero or more intermediate operations, and one terminal operation. A stream does not store data and cannot be reused; once a terminal operation runs, calling another operation on the same stream object throws `IllegalStateException`. The first skill is knowing how to create the source.",
   "From a collection, call `stream()` (or `parallelStream()`): `List.of(\"a\", \"b\").stream()`. A Map is not a Collection, so you stream one of its views, such as `map.entrySet().stream()` or `map.keySet().stream()`. From an array use `Arrays.stream(array)`; for an int[] this gives an `IntStream`, not a `Stream<Integer>`. From individual values use `Stream.of(\"a\", \"b\", \"c\")`. `Stream.empty()` makes an empty stream and `Stream.ofNullable(x)` gives a stream with zero elements if x is null, otherwise one.",
   "`IntStream.range(1, 5)` produces 1, 2, 3, 4: the end is exclusive. `IntStream.rangeClosed(1, 5)` produces 1 through 5 inclusive. The same methods exist on LongStream. These are the stream equivalents of a counting for loop, and the exclusive versus inclusive end is a favorite exam detail.",
   "Streams can also be infinite. `Stream.generate(supplier)` calls the supplier for each element, for example `Stream.generate(() -> \"x\")`. `Stream.iterate(seed, next)` starts with the seed and applies the UnaryOperator repeatedly: `Stream.iterate(1, n -> n * 2)` gives 1, 2, 4, 8 and so on forever. An infinite stream is fine as long as a short-circuiting operation such as `limit`, `findFirst` or `anyMatch` stops it; calling `count()` or `forEach` on it without a limit never finishes.",
   "The three-argument form `Stream.iterate(seed, hasNext, next)` works like a for loop and is finite: `Stream.iterate(1, n -> n <= 100, n -> n * 2)` gives 1, 2, 4, 8, 16, 32, 64. The predicate is tested before each element is emitted, including the seed. Getting the argument order wrong (next before hasNext) will not compile because the types differ.",
   "```java\nStream<String> s1 = Stream.of(\"a\", \"b\", \"c\");\nIntStream s2 = IntStream.rangeClosed(1, 3);          // 1 2 3\nStream<Integer> s3 = Stream.iterate(0, n -> n + 5).limit(4); // 0 5 10 15\nStream<Integer> s4 = Stream.iterate(1, n -> n < 20, n -> n * 3); // 1 3 9\nlong c = s1.count();\n// s1.count();  // IllegalStateException: stream has already been operated upon\n```",
   "Files also produce streams (`Files.lines`, `Files.list`), and `String.chars()` gives an IntStream of character values. Whatever the source, the rules are the same: nothing happens until a terminal operation runs, and each stream object is single use."
  ],
  "terms": [
   [
    "Stream source",
    "Where the elements come from, such as a collection, array, Stream.of values, a range or a generator."
   ],
   [
    "IntStream.range",
    "Produces ints from the start up to but not including the end."
   ],
   [
    "IntStream.rangeClosed",
    "Produces ints from the start up to and including the end."
   ],
   [
    "Stream.iterate",
    "Builds a stream from a seed and a function applied repeatedly; the two-argument form is infinite, the three-argument form stops when a predicate fails."
   ],
   [
    "Infinite stream",
    "A stream with no natural end, made by generate or two-argument iterate, which needs a short-circuiting operation to finish."
   ]
  ],
  "example": "A test harness needs order IDs 1 through 50. Instead of a loop that fills a list, it uses IntStream.rangeClosed(1, 50).mapToObj(i -> \"ORD-\" + i).toList(), which reads as a description of the data rather than a set of instructions.",
  "tip": "Remember range excludes the end and rangeClosed includes it, and that a stream is single use. A question that stores a stream in a variable and calls two terminal operations on it ends in IllegalStateException.",
  "check": [
   [
    "How many elements does IntStream.range(3, 3) produce?",
    "Zero. The end is exclusive, so a range whose start equals its end is empty."
   ],
   [
    "What does Stream.iterate(2, n -> n < 10, n -> n + 3) produce?",
    "2, 5, 8. The next value 11 fails the predicate, so the stream ends."
   ],
   [
    "What happens if you call count() on Stream.generate(() -> 1) without limit?",
    "It never returns, because the stream is infinite and count must consume every element."
   ]
  ]
 },
 {
  "t": "Intermediate operations and lazy evaluation: filter, map, flatMap, peek, sorted, distinct, limit",
  "body": [
   "Intermediate operations transform a stream into another stream. They are lazy: calling `filter` or `map` only records a step in the pipeline. No element is processed until a terminal operation runs. If a pipeline has no terminal operation, none of its lambdas are ever executed, which is why a question with only `peek(System.out::println)` and no terminal operation prints nothing.",
   "`filter(Predicate)` keeps the elements for which the predicate returns true. `map(Function)` converts each element into exactly one new element, possibly of a different type. `flatMap(Function)` converts each element into a stream and then flattens all those streams into one, so a `Stream<List<String>>` becomes a `Stream<String>` with `flatMap(List::stream)`. `mapToInt`, `mapToObj` and similar switch between object and primitive streams.",
   "`distinct()` removes duplicates using `equals` (and `hashCode`). `sorted()` sorts by natural order and requires elements to be Comparable, otherwise a `ClassCastException` occurs when the terminal operation runs; `sorted(Comparator)` uses the supplied order. `limit(n)` passes on at most n elements and `skip(n)` discards the first n. `peek(Consumer)` runs an action on each element as it passes and returns the same elements; it is meant for debugging, not for changing state.",
   "Laziness has a visible effect on order. Elements flow through the pipeline one at a time, vertically, rather than each operation finishing all elements before the next starts. With `limit`, processing stops as soon as enough elements have passed, so earlier steps may run on only a few elements. This is also what lets infinite streams work.",
   "```java\nStream.of(\"b\", \"a\", \"c\", \"d\")\n      .peek(s -> System.out.print(\"p\" + s + \" \"))\n      .filter(s -> !s.equals(\"a\"))\n      .map(String::toUpperCase)\n      .limit(2)\n      .forEach(s -> System.out.print(s + \" \"));\n// prints: pb B pa pc C\n// \"d\" is never peeked: limit(2) was already satisfied\n```",
   "`sorted` and `distinct` are stateful: they must remember elements they have seen. `sorted` in particular has to see every element before it can emit the first one, so in a pipeline with `sorted` all earlier steps run on all elements first, and `sorted` on an infinite stream never finishes even if a `limit` comes after it. Put `limit` before `sorted` when you want to sort only the first few elements of an infinite source.",
   "Intermediate operations never modify the source collection. `list.stream().map(String::toUpperCase)` leaves the list unchanged; you must collect the result into a new collection if you want to keep it."
  ],
  "terms": [
   [
    "Lazy evaluation",
    "Intermediate operations run only when a terminal operation pulls elements through the pipeline."
   ],
   [
    "flatMap",
    "Maps each element to a stream and concatenates the resulting streams into a single stream."
   ],
   [
    "Stateful operation",
    "An intermediate operation such as sorted or distinct that must track elements it has already seen."
   ],
   [
    "Short-circuiting operation",
    "An operation such as limit that can finish without processing every element."
   ],
   [
    "peek",
    "An intermediate operation that performs an action on each element as it passes, mainly for debugging."
   ]
  ],
  "example": "A log analyzer reads millions of lines but only needs the first five error lines. Because streams are lazy, lines().filter(l -> l.contains(\"ERROR\")).limit(5) stops reading as soon as five matches are found instead of scanning the whole file.",
  "tip": "Trace output questions element by element, not operation by operation, and check whether there is a terminal operation at all. Also watch for sorted on an infinite stream, which hangs even with a later limit.",
  "check": [
   [
    "What does Stream.of(1, 2, 3).peek(System.out::println); print?",
    "Nothing. There is no terminal operation, so the lazy pipeline never runs."
   ],
   [
    "How do you turn a List<List<Integer>> into a Stream<Integer>?",
    "listOfLists.stream().flatMap(List::stream)."
   ],
   [
    "Why does Stream.iterate(1, n -> n + 1).sorted().limit(3).toList() never finish?",
    "sorted must see all elements before emitting any, and the source is infinite."
   ]
  ]
 },
 {
  "t": "Terminal operations: forEach, reduce, collect, count, findFirst, anyMatch, toList",
  "body": [
   "A terminal operation ends a pipeline, triggers the processing and produces a result or a side effect. After it runs the stream is consumed. Knowing each operation's return type is essential, because exam code often assigns the result to a variable of the wrong type.",
   "`forEach(Consumer)` performs an action on each element and returns void. `count()` returns a long. `min(Comparator)` and `max(Comparator)` return an `Optional<T>`, because the stream might be empty. `findFirst()` and `findAny()` also return Optional; `findFirst` respects encounter order, while `findAny` may return any element and is cheaper in parallel streams. `toList()` returns an unmodifiable List containing the elements in order; adding to it throws `UnsupportedOperationException`.",
   "`anyMatch`, `allMatch` and `noneMatch` take a Predicate and return a boolean. They short-circuit: `anyMatch` stops at the first true, `allMatch` at the first false. On an empty stream `anyMatch` returns false while `allMatch` and `noneMatch` return true (there is no counterexample). Short-circuiting terminal operations like these and the find methods can finish on an infinite stream; `count` and `forEach` cannot.",
   "`reduce` combines all elements into one value. There are three forms. `reduce(identity, accumulator)` returns a T and uses the identity as the starting value and as the result for an empty stream: `Stream.of(1, 2, 3).reduce(0, Integer::sum)` is 6. `reduce(accumulator)` has no identity, so it returns `Optional<T>`, empty if the stream is empty. `reduce(identity, accumulator, combiner)` lets the result type differ from the element type, and the combiner merges partial results in parallel streams.",
   "`collect` performs a mutable reduction into a container. Most often you pass a Collector such as `Collectors.toList()`, `toSet()`, `joining()` or `groupingBy(...)`. There is also a three-argument form `collect(supplier, accumulator, combiner)`, for example `collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)`. Unlike `toList()`, `Collectors.toList()` makes no promise about mutability; `Collectors.toUnmodifiableList()` explicitly makes it unmodifiable.",
   "```java\nList<String> names = List.of(\"Ana\", \"Bo\", \"Cy\");\nlong n = names.stream().filter(s -> s.length() == 2).count();       // 2\nOptional<String> f = names.stream().findFirst();                     // Optional[Ana]\nboolean any = names.stream().anyMatch(s -> s.startsWith(\"B\"));    // true\nint total = names.stream().map(String::length).reduce(0, Integer::sum); // 7\nOptional<Integer> none = Stream.<Integer>empty().reduce(Integer::sum);  // Optional.empty\nList<String> up = names.stream().map(String::toUpperCase).toList();\n```"
  ],
  "terms": [
   [
    "Terminal operation",
    "The final operation of a pipeline that triggers processing and produces a result or side effect."
   ],
   [
    "reduce",
    "Combines the elements into a single value with an accumulator, optionally starting from an identity value."
   ],
   [
    "Identity value",
    "A starting value that does not change the result when combined, such as 0 for addition or \"\" for concatenation."
   ],
   [
    "collect",
    "A mutable reduction that gathers elements into a container, usually via a Collector."
   ],
   [
    "Stream.toList()",
    "A terminal operation that returns an unmodifiable List of the stream's elements."
   ]
  ],
  "example": "A checkout service checks cart.stream().anyMatch(Item::isRestricted) before asking for age verification, computes the total with map(Item::price).reduce(BigDecimal.ZERO, BigDecimal::add), and builds the receipt lines with toList().",
  "tip": "Know the return types: count is long, min, max, findFirst, findAny and single-argument reduce return Optional, the match methods return boolean, and allMatch on an empty stream is true.",
  "check": [
   [
    "What type does Stream.of(3, 1, 2).max(Comparator.naturalOrder()) return?",
    "Optional<Integer>, here containing 3."
   ],
   [
    "What does Stream.<String>empty().allMatch(s -> s.isEmpty()) return?",
    "true. With no elements, nothing violates the predicate."
   ],
   [
    "What happens when you call add on the list returned by stream.toList()?",
    "It throws UnsupportedOperationException because the list is unmodifiable."
   ]
  ]
 },
 {
  "t": "Collectors: groupingBy, partitioningBy, counting, joining, toMap and merge functions",
  "body": [
   "The `Collectors` class provides ready-made recipes you pass to `collect`. The simple ones gather elements into a container: `toList()`, `toSet()`, `toCollection(TreeSet::new)`. `joining()` concatenates a stream of CharSequence values; `joining(\", \")` adds a delimiter, and `joining(\", \", \"[\", \"]\")` adds a prefix and suffix. Joining an empty stream with a prefix and suffix gives just \"[]\".",
   "`groupingBy(classifier)` builds a `Map<K, List<T>>`: the classifier function computes a key for each element, and elements with the same key go into the same list. Only keys that actually occur appear in the map. A second argument is a downstream collector that processes each group instead of listing it: `groupingBy(String::length, Collectors.counting())` gives a `Map<Integer, Long>`. A three-argument form adds a map factory, `groupingBy(f, TreeMap::new, toList())`, when you need sorted keys; otherwise the map type is unspecified (in practice a HashMap).",
   "`partitioningBy(predicate)` is a special grouping with only two keys, true and false, returning `Map<Boolean, List<T>>`. Unlike groupingBy, both keys are always present, even if one list is empty. It also accepts a downstream collector. Useful downstream collectors include `counting()` (which yields a Long, not an Integer), `summingInt`, `averagingInt` (always a Double), `mapping(f, toList())`, `maxBy(comparator)` (an Optional) and `toSet()`.",
   "`toMap(keyMapper, valueMapper)` builds a map where you choose both key and value. If two elements produce the same key it throws `IllegalStateException` for a duplicate key. To handle collisions, add a merge function, a BinaryOperator that combines the old and new values: `toMap(k, v, (a, b) -> a + b)` or `(a, b) -> a` to keep the first. A fourth argument supplies the map type, such as `TreeMap::new`.",
   "```java\nList<String> words = List.of(\"apple\", \"avocado\", \"banana\", \"cherry\", \"blueberry\");\nMap<Character, List<String>> byLetter =\n    words.stream().collect(Collectors.groupingBy(w -> w.charAt(0)));\n// {a=[apple, avocado], b=[banana, blueberry], c=[cherry]}\nMap<Boolean, Long> longOnes =\n    words.stream().collect(Collectors.partitioningBy(w -> w.length() > 6, Collectors.counting()));\n// {false=3, true=2}\nMap<Character, Integer> totalLen = words.stream().collect(\n    Collectors.toMap(w -> w.charAt(0), String::length, Integer::sum));\n// {a=12, b=15, c=6}\nString csv = words.stream().collect(Collectors.joining(\",\", \"<\", \">\"));\n```",
   "When reading a question, work out the exact generic type of the result map. `groupingBy` with no downstream gives List values; with `counting()` it gives Long values; with `mapping(..., toSet())` it gives Set values. Assigning a `Map<Boolean, List<String>>` result to a `Map<String, List<String>>` variable does not compile."
  ],
  "terms": [
   [
    "groupingBy",
    "A collector that groups elements by a classifier into a Map whose values are lists or the result of a downstream collector."
   ],
   [
    "partitioningBy",
    "A collector that splits elements into a Map<Boolean, ...> with both true and false keys always present."
   ],
   [
    "Downstream collector",
    "A collector passed to groupingBy or partitioningBy that processes each group, such as counting or mapping."
   ],
   [
    "Merge function",
    "A BinaryOperator given to toMap that decides the value when two elements map to the same key."
   ],
   [
    "joining",
    "A collector that concatenates strings with an optional delimiter, prefix and suffix."
   ]
  ],
  "example": "A help desk dashboard groups tickets with groupingBy(Ticket::priority, counting()) to show how many are open at each priority, and partitions them with partitioningBy(Ticket::isOverdue) so the overdue list is always present even when it is empty.",
  "tip": "toMap without a merge function throws IllegalStateException on a duplicate key. counting() produces Long, and averagingX produces Double; exam answers often use Integer instead.",
  "check": [
   [
    "What is the type of stream.collect(groupingBy(String::length, counting())) for a Stream<String>?",
    "Map<Integer, Long>."
   ],
   [
    "If no element satisfies the predicate, what does partitioningBy return?",
    "A map with both keys: true maps to an empty list and false maps to all elements."
   ],
   [
    "How do you keep the first value when toMap sees duplicate keys?",
    "Supply a merge function (a, b) -> a as the third argument."
   ]
  ]
 },
 {
  "t": "Primitive streams and summary statistics",
  "body": [
   "Java has three primitive stream types: `IntStream`, `LongStream` and `DoubleStream`. They exist to avoid the cost of boxing each number into an Integer, Long or Double object, and they add numeric operations that `Stream<T>` lacks, such as `sum()`, `average()` and `summaryStatistics()`. There is no CharStream, ByteStream or FloatStream; `String.chars()` returns an IntStream.",
   "You move between object and primitive streams with mapping methods. From `Stream<T>` use `mapToInt(ToIntFunction)`, `mapToLong` or `mapToDouble`. From a primitive stream back to objects use `mapToObj(IntFunction)` or `boxed()`, which turns an IntStream into a `Stream<Integer>`. Between primitive types use `asLongStream()`, `asDoubleStream()` or `mapToLong` and similar. `map` on an IntStream must return an int (it takes an IntUnaryOperator).",
   "Return types are a frequent exam topic. On an IntStream, `sum()` returns int, and on a LongStream it returns long. `average()` returns `OptionalDouble` for every primitive stream type, because the average of whole numbers can have a fraction and an empty stream has no average. `max()` and `min()` on an IntStream return `OptionalInt`, which you read with `getAsInt()`, not `get()`. `count()` is still long.",
   "When you need several statistics, calling `sum()` and then `max()` fails because a stream can be used only once. Instead call `summaryStatistics()`, which makes one pass and returns an `IntSummaryStatistics` (or the Long or Double version) with `getCount()`, `getSum()`, `getMin()`, `getMax()` and `getAverage()`. For IntSummaryStatistics, `getSum()` returns a long so large totals do not overflow.",
   "```java\nint[] scores = {70, 85, 90};\nIntSummaryStatistics st = Arrays.stream(scores).summaryStatistics();\nst.getMin();     // 70\nst.getMax();     // 90\nst.getAverage(); // 81.666...\nst.getSum();     // 245 (a long)\n\nOptionalDouble avg = IntStream.empty().average(); // OptionalDouble.empty\nint total = Stream.of(\"a\", \"bb\").mapToInt(String::length).sum(); // 3\nList<Integer> boxed = IntStream.range(0, 3).boxed().toList();\n```",
   "For an empty stream, summary statistics do not throw. The count and sum are 0 and the average is 0.0, while `getMin()` returns `Integer.MAX_VALUE` and `getMax()` returns `Integer.MIN_VALUE`, the starting values before any element is seen. That is different from `IntStream.empty().max()`, which returns an empty OptionalInt. The equivalent collectors `Collectors.summarizingInt(...)` produce the same statistics object from a Stream of objects."
  ],
  "terms": [
   [
    "IntStream",
    "A stream of primitive int values with numeric operations such as sum, average and summaryStatistics."
   ],
   [
    "OptionalDouble",
    "An Optional-like container for a double, returned by average() on primitive streams; read with getAsDouble()."
   ],
   [
    "boxed()",
    "Converts a primitive stream into a stream of the matching wrapper objects."
   ],
   [
    "IntSummaryStatistics",
    "An object holding count, sum, min, max and average computed in a single pass."
   ],
   [
    "mapToInt",
    "Converts a Stream<T> into an IntStream using a ToIntFunction."
   ]
  ],
  "example": "A sensor monitor reads temperatures as a DoubleStream and calls summaryStatistics() once per minute to log the min, max and average in a single pass, instead of reopening the data three times.",
  "tip": "average() always returns OptionalDouble, sum() on IntStream returns int, and OptionalInt uses getAsInt(). Answers that assign average() to a double or call get() on an OptionalInt do not compile.",
  "check": [
   [
    "What does IntStream.of(1, 2).average() return?",
    "An OptionalDouble containing 1.5."
   ],
   [
    "What does getMax() return on the summary statistics of an empty IntStream?",
    "Integer.MIN_VALUE; it does not throw."
   ],
   [
    "How do you turn an IntStream into a List<Integer>?",
    "Call boxed() and then a terminal operation such as toList() or collect(Collectors.toList())."
   ]
  ]
 },
 {
  "t": "Optional: of, ofNullable, map, orElse, orElseGet, orElseThrow",
  "body": [
   "`Optional<T>` is a container that either holds one non-null value or is empty. Methods such as `findFirst`, `max` and `reduce` return it so that the caller must think about the no-result case instead of receiving a surprise null. It is meant mainly as a return type; using it for fields or method parameters is discouraged.",
   "There are three ways to create one. `Optional.of(value)` requires a non-null value and throws `NullPointerException` if given null. `Optional.ofNullable(value)` returns an empty Optional for null and a full one otherwise, so use it when the value might be missing. `Optional.empty()` returns an empty Optional directly.",
   "To test and use the value, `isPresent()` and `isEmpty()` return booleans, `ifPresent(Consumer)` runs an action only if there is a value, and `ifPresentOrElse(Consumer, Runnable)` handles both cases. `get()` returns the value or throws `NoSuchElementException` if empty, which is why it is best avoided in favor of the methods below. The no-argument `orElseThrow()` does exactly the same thing as `get()` but its name makes the risk obvious.",
   "`map(Function)` transforms the value if present and returns a new Optional; if the Optional is empty, or the function returns null, the result is empty. `flatMap` is for functions that already return an Optional, so you do not end up with `Optional<Optional<T>>`. `filter(Predicate)` keeps the value only if it matches. These let you chain steps without writing null checks.",
   "Getting a fallback has three variants and the difference is tested. `orElse(other)` returns the value or `other`, but the argument expression is always evaluated, even when the Optional has a value. `orElseGet(Supplier)` calls the supplier only when the Optional is empty, so it is the right choice when the default is expensive or has side effects. `orElseThrow(Supplier)` throws the exception the supplier creates when empty, for example `orElseThrow(() -> new IllegalArgumentException(\"no user\"))`.",
   "```java\nOptional<String> name = Optional.ofNullable(lookup(id));\nint len = name.map(String::length).orElse(0);\nString n1 = name.orElse(loadDefault());          // loadDefault() always runs\nString n2 = name.orElseGet(() -> loadDefault()); // runs only if empty\nString n3 = name.orElseThrow();                  // NoSuchElementException if empty\n// Optional.of(null);  // NullPointerException\n```",
   "Primitive versions `OptionalInt`, `OptionalLong` and `OptionalDouble` come from primitive streams. They have `getAsInt()` and similar instead of `get()`, and they lack `map`, `flatMap` and `filter`."
  ],
  "terms": [
   [
    "Optional.of",
    "Creates an Optional holding a non-null value; throws NullPointerException if the value is null."
   ],
   [
    "Optional.ofNullable",
    "Creates an Optional that is empty if the value is null and full otherwise."
   ],
   [
    "orElse",
    "Returns the value or a fallback; the fallback expression is evaluated every time."
   ],
   [
    "orElseGet",
    "Returns the value or calls a Supplier to produce a fallback only when empty."
   ],
   [
    "orElseThrow",
    "Returns the value or throws: NoSuchElementException with no argument, or a supplied exception."
   ]
  ],
  "example": "A user service returns Optional<User> from findByEmail. The controller writes findByEmail(email).map(User::displayName).orElseGet(() -> \"Guest\") so no null check is needed, and the admin API uses orElseThrow(() -> new NotFoundException(email)) to turn absence into a 404 response.",
  "tip": "The classic trap: orElse(expensiveCall()) runs expensiveCall() even when the Optional has a value; orElseGet does not. Also, Optional.of(null) throws immediately, while ofNullable(null) is empty.",
  "check": [
   [
    "What does Optional.ofNullable(null).map(String::length).orElse(-1) return?",
    "-1. The Optional is empty, so map returns an empty Optional and orElse supplies the fallback."
   ],
   [
    "What does the no-argument orElseThrow() throw on an empty Optional?",
    "NoSuchElementException, the same as get()."
   ]
  ]
 },
 {
  "t": "Stream Gatherers (Java 24+): gather() with Gatherers.windowFixed, windowSliding, fold, scan",
  "body": [
   "Stream Gatherers were finalized in Java 24. They add one new intermediate operation, `Stream.gather(Gatherer)`, that lets you plug in custom transformations the built-in operations cannot express, such as grouping neighbors into windows or emitting running totals. Where `collect` with a Collector is a flexible terminal operation, `gather` with a Gatherer is a flexible intermediate operation: the stream continues afterwards.",
   "A Gatherer can transform elements one to one, one to many, many to one or many to many, can keep state between elements, and can stop early. Internally it is described by up to four functions: an initializer that creates private state, an integrator that receives each element (and may push results downstream), an optional combiner for parallel use, and an optional finisher that can emit final results after the last element. You rarely write one yourself for the exam; you use the built-ins in `java.util.stream.Gatherers`.",
   "`Gatherers.windowFixed(n)` groups elements into consecutive, non-overlapping lists of size n; the last list may be shorter. `Stream.of(1,2,3,4,5).gather(Gatherers.windowFixed(2))` produces [1, 2], [3, 4], [5]. `Gatherers.windowSliding(n)` produces overlapping windows that move one element at a time: `windowSliding(3)` over 1..5 gives [1, 2, 3], [2, 3, 4], [3, 4, 5]. If the stream has fewer elements than n, windowSliding emits one window containing them all. Both result in a `Stream<List<T>>`, and a window size below 1 throws `IllegalArgumentException`.",
   "`Gatherers.fold(initial, folder)` is a many-to-one gatherer: it starts from the value the Supplier provides, combines each element in order, and emits a single result at the end, producing a one-element stream. It resembles `reduce`, but it keeps working in the middle of a pipeline and the result type can differ from the element type. `Gatherers.scan(initial, scanner)` is similar but emits every intermediate result, giving a running total. Scan does not emit the initial value itself.",
   "```java\nStream.of(1, 2, 3, 4)\n      .gather(Gatherers.scan(() -> 0, (acc, x) -> acc + x))\n      .toList();                               // [1, 3, 6, 10]\n\nStream.of(1, 2, 3, 4)\n      .gather(Gatherers.fold(() -> \"\", (acc, x) -> acc + x))\n      .findFirst();                            // Optional[1234]\n\nIntStream.rangeClosed(1, 7).boxed()\n         .gather(Gatherers.windowFixed(3))\n         .toList();                            // [[1, 2, 3], [4, 5, 6], [7]]\n```",
   "Gatherers compose: `g1.andThen(g2)` builds one gatherer from two, and you may call `gather` several times in a pipeline. Note that `gather` is defined on `Stream<T>`, not on IntStream, so call `boxed()` first when starting from a primitive stream. There is also `Gatherers.mapConcurrent(maxConcurrency, mapper)`, which runs a mapping function concurrently on virtual threads while keeping the output in encounter order."
  ],
  "terms": [
   [
    "Gatherer",
    "An object describing a custom intermediate stream operation through an initializer, integrator, combiner and finisher."
   ],
   [
    "windowFixed",
    "A built-in gatherer that groups elements into non-overlapping lists of a fixed size, with a possibly shorter last list."
   ],
   [
    "windowSliding",
    "A built-in gatherer that emits overlapping lists of a fixed size, advancing one element at a time."
   ],
   [
    "fold",
    "A built-in gatherer that combines all elements into a single result emitted when the stream ends."
   ],
   [
    "scan",
    "A built-in gatherer that emits the running result after each element, like a cumulative sum."
   ]
  ],
  "example": "A monitoring job computes a three-reading moving average of CPU samples with gather(Gatherers.windowSliding(3)).map(w -> average(w)), and sends metrics to a server in batches of 100 using gather(Gatherers.windowFixed(100)).",
  "tip": "Distinguish fold from scan by output size: fold emits one element at the end, scan emits one per input element. For windows, fixed does not overlap and its last window can be short; sliding overlaps.",
  "check": [
   [
    "What does Stream.of(\"a\",\"b\",\"c\",\"d\",\"e\").gather(Gatherers.windowFixed(2)).toList() produce?",
    "[[a, b], [c, d], [e]]."
   ],
   [
    "What does scan(() -> 10, (a, x) -> a + x) emit for elements 1 and 2?",
    "11 and then 13; the initial value 10 is not emitted by itself."
   ],
   [
    "Is gather an intermediate or terminal operation?",
    "Intermediate: it returns a new Stream, so a terminal operation is still needed."
   ]
  ]
 },
 {
  "t": "Parallel streams and why stateful lambdas cause problems",
  "body": [
   "A parallel stream splits its source into parts and processes them on several threads at once, then combines the results. You get one by calling `parallelStream()` on a collection or `parallel()` on an existing stream; `sequential()` switches back, and `isParallel()` tells you the mode. Because the whole pipeline has a single mode, the last `parallel()` or `sequential()` call wins. By default the work runs in the common ForkJoinPool.",
   "Parallelism changes which results are predictable. `forEach` on a parallel stream processes elements in whatever order the threads finish, so printing `1 2 3 4 5` may show `3 5 1 4 2`. Use `forEachOrdered` if order matters, at some cost in speed. `findAny` may return any element, while `findFirst` still returns the first in encounter order. Collecting with `toList()` or `Collectors.toList()` still produces elements in encounter order, because each thread builds its own partial result and they are merged in order.",
   "`reduce` in parallel requires the right building blocks. The accumulator must be associative, meaning `(a op b) op c` equals `a op (b op c)`; addition is associative, subtraction is not. The identity must truly be an identity for the operation: `reduce(0, Integer::sum)` is fine, but `reduce(10, Integer::sum)` adds 10 once per chunk in parallel and gives a different answer than sequentially. A non-associative operation gives results that vary between runs.",
   "A stateful lambda is one whose result depends on or changes state outside itself while the stream runs. The classic mistake is adding to a shared ArrayList from `forEach` or `map`. ArrayList is not thread-safe, so in parallel you may lose elements, get duplicates or null entries, or even see an `ArrayIndexOutOfBoundsException`. Even with a synchronized list, the order becomes unpredictable. Counting with a shared `int[]` or a non-atomic field has the same race condition.",
   "```java\nList<Integer> bad = new ArrayList<>();\nIntStream.range(0, 10_000).parallel().forEach(bad::add); // unsafe: size often < 10000\n\nList<Integer> good = IntStream.range(0, 10_000).parallel()\n                              .boxed().toList();         // safe and ordered\n```",
   "The fix is to let the stream do the accumulation through `collect`, `toList`, `reduce` or `sum`, which are designed to give each thread its own container and merge them safely. Keep lambdas stateless and free of side effects. Also remember that parallel is not automatically faster: for small data, or for sources that split poorly such as a LinkedList or `Stream.iterate`, the overhead of splitting and merging can make it slower. Blocking I/O inside a parallel stream can also starve the shared common pool."
  ],
  "terms": [
   [
    "Parallel stream",
    "A stream whose operations run on multiple threads, by default in the common ForkJoinPool."
   ],
   [
    "forEachOrdered",
    "A terminal operation that processes elements in encounter order even in a parallel stream."
   ],
   [
    "Associative operation",
    "An operation where grouping does not matter, (a op b) op c = a op (b op c), required for correct parallel reduce."
   ],
   [
    "Stateful lambda",
    "A lambda that reads or modifies shared mutable state during stream execution, which is unsafe in parallel."
   ]
  ],
  "example": "A developer speeds up a report by switching to parallelStream() but keeps results.add(row) inside forEach. The report sometimes shows 9,987 rows instead of 10,000. Replacing the side effect with .map(this::toRow).toList() fixes both the missing rows and the ordering.",
  "tip": "For output questions on parallel streams, forEach order is unpredictable, findAny is unpredictable, but collect/toList keep encounter order. A reduce with a non-identity starting value gives a different result in parallel.",
  "check": [
   [
    "Why might List.of(1,2,3).parallelStream().forEach(System.out::print) not print 123?",
    "forEach on a parallel stream does not guarantee encounter order; forEachOrdered would."
   ],
   [
    "Is reduce(0, (a, b) -> a - b) safe for a parallel stream?",
    "No. Subtraction is not associative, so splitting the work can produce a different result."
   ],
   [
    "What is the safe replacement for adding to a shared ArrayList inside forEach?",
    "Use a collecting terminal operation such as toList() or collect(Collectors.toList())."
   ]
  ]
 },
 {
  "t": "Module-info.java: module, requires, requires transitive, exports, opens",
  "body": [
   "The Java Platform Module System (JPMS), introduced in Java 9, groups packages into named modules with explicit dependencies and explicit public APIs. A module is described by a file named `module-info.java` placed at the root of the module's source folder, next to the top-level package directories. It compiles to `module-info.class`. The module name usually follows reverse-domain style, like `com.shop.orders`, and it must be unique on the module path.",
   "```java\nmodule com.shop.orders {\n    requires java.sql;\n    requires transitive com.shop.model;\n    exports com.shop.orders.api;\n    exports com.shop.orders.spi to com.shop.plugins;\n    opens com.shop.orders.entity;\n}\n```",
   "`requires M` says this module depends on module M and can read the packages M exports. Every module implicitly requires `java.base`, so you never need to write it. `requires transitive M` does the same and also passes the dependency on: any module that requires this module automatically reads M too. Use it when your exported API exposes M's types, such as a public method returning a type from `com.shop.model`. `requires static M` means M is needed at compile time but optional at run time.",
   "`exports P` makes the public types in package P accessible to other modules at compile time and run time. Packages that are not exported are encapsulated: even their public classes cannot be used from outside the module. `exports P to M1, M2` is a qualified export that grants access only to the listed modules. Exports work on packages, not classes, and not on subpackages: exporting `com.shop` does not export `com.shop.util`.",
   "`opens P` is about reflection. An exported package allows normal access to public members, but deep reflection, such as a framework calling `setAccessible(true)` on private fields, requires the package to be opened. `opens` grants runtime-only reflective access to all members, including private ones, but no compile-time access. `opens P to M` limits it to specific modules, and declaring `open module X { ... }` opens every package in the module. You cannot use `opens` statements inside an open module.",
   "Two more rules are commonly tested. The module graph cannot have cycles among `requires` directives, and a package may be in only one module that a given module reads; two modules containing the same package, called a split package, cause an error. The other directives, `uses` and `provides ... with`, deal with services and are covered in the next lesson."
  ],
  "terms": [
   [
    "module-info.java",
    "The module declaration file at the root of a module's sources, naming the module and its directives."
   ],
   [
    "requires transitive",
    "Declares a dependency and makes it readable to every module that requires this module (implied readability)."
   ],
   [
    "exports",
    "Makes a package's public types accessible to other modules; optionally limited with a to clause."
   ],
   [
    "opens",
    "Allows runtime deep reflection, including private members, on a package without granting compile-time access."
   ],
   [
    "Strong encapsulation",
    "The rule that non-exported packages are inaccessible to other modules even if their classes are public."
   ]
  ],
  "example": "An orders module exposes com.shop.orders.api for other teams, keeps com.shop.orders.internal hidden by not exporting it, and opens com.shop.orders.entity so a persistence framework can reflectively set private fields on its entity classes.",
  "tip": "Exports controls ordinary access and applies at compile and run time; opens controls reflection at run time only. If an exported method's signature uses another module's types, that dependency should be requires transitive.",
  "check": [
   [
    "Module A requires transitive B, and module C requires A. Can C use B's exported types without requiring B?",
    "Yes. requires transitive gives C implied readability of B."
   ],
   [
    "A package is exported but not opened. Can a framework reflectively read its private fields?",
    "No. Deep reflection on private members needs the package to be opened."
   ],
   [
    "Do you need to write requires java.base?",
    "No. Every module requires java.base implicitly."
   ]
  ]
 },
 {
  "t": "Services: uses, provides ... with, and ServiceLoader",
  "body": [
   "A service lets one module use an implementation without knowing, at compile time, which module supplies it. It is Java's built-in plug-in mechanism. There are four roles: the service type (usually an interface) in an exported package, the consumer that uses it, one or more provider modules that implement it, and `java.util.ServiceLoader`, which finds the providers at run time. This keeps the consumer loosely coupled: you can add or remove a provider JAR on the module path without recompiling the consumer.",
   "The consumer module declares `uses` with the service interface, and requires the module that defines the interface. A provider module declares `provides <interface> with <implementation class>`. The implementation class does not need to be in an exported package, which keeps it hidden from everyone except the ServiceLoader. The provider must also require the module containing the interface.",
   "```java\n// module com.pay.api\nmodule com.pay.api { exports com.pay.api; }            // contains interface PaymentGateway\n\n// provider\nmodule com.pay.stripe {\n    requires com.pay.api;\n    provides com.pay.api.PaymentGateway with com.pay.stripe.internal.StripeGateway;\n}\n\n// consumer\nmodule com.shop.app {\n    requires com.pay.api;\n    uses com.pay.api.PaymentGateway;\n}\n```",
   "In the consumer's code, `ServiceLoader.load(PaymentGateway.class)` returns a ServiceLoader that is Iterable over provider instances, so a for-each loop creates and returns each implementation. `findFirst()` returns an `Optional<PaymentGateway>`, empty if none is present. `stream()` returns a `Stream<ServiceLoader.Provider<PaymentGateway>>`; each Provider has `type()` to inspect the class without instantiating it and `get()` to create the instance. That lets you filter providers by annotation or class before creating any.",
   "The provider class must have either a public no-argument constructor or a public static no-argument method named `provider()` that returns an instance. If the consumer module forgets the `uses` directive, calling `ServiceLoader.load` for that service throws a `ServiceConfigurationError`. Loading happens lazily and the loader caches instances; `reload()` clears the cache.",
   "For code on the class path, the older mechanism still works: a text file named `META-INF/services/` followed by the fully qualified interface name, listing implementation class names. Modular JARs use `provides` instead. The exam expects you to know which module declares which directive: `uses` in the consumer, `provides ... with` in the provider, and `exports` of the interface package in the API module."
  ],
  "terms": [
   [
    "Service interface",
    "The type, usually an interface in an exported package, that consumers depend on and providers implement."
   ],
   [
    "uses",
    "A module directive in the consumer declaring that it looks up implementations of a service with ServiceLoader."
   ],
   [
    "provides ... with",
    "A module directive in the provider naming the service interface and the implementation class that supplies it."
   ],
   [
    "ServiceLoader",
    "The class that discovers and instantiates service providers at run time via load, iteration, findFirst or stream."
   ],
   [
    "ServiceLoader.Provider",
    "A handle to a provider that exposes type() without instantiation and get() to create the instance."
   ]
  ],
  "example": "A photo editor defines an ImageFilter service interface. Each filter ships as its own module that provides ImageFilter with its class. The editor calls ServiceLoader.load(ImageFilter.class).stream() to list available filters in its menu, so a new filter appears simply by dropping its JAR on the module path.",
  "tip": "Keep the directive owners straight: uses goes in the consumer, provides ... with goes in the provider, and the interface's package must be exported by whoever defines it. The implementation's package does not need to be exported.",
  "check": [
   [
    "Which module declares uses com.pay.api.PaymentGateway?",
    "The consumer module that calls ServiceLoader.load(PaymentGateway.class)."
   ],
   [
    "What does ServiceLoader.findFirst() return when no provider is found?",
    "An empty Optional."
   ],
   [
    "What must a provider class have so ServiceLoader can create it?",
    "A public no-argument constructor or a public static provider() method."
   ]
  ]
 },
 {
  "t": "Module path vs class path, named, automatic and unnamed modules",
  "body": [
   "Java has two ways to tell the JVM where your code and libraries are. The class path (`-cp` or `--class-path`) is the traditional flat list of directories and JARs; the JVM searches it for classes by name, with no concept of dependencies or encapsulation. The module path (`-p` or `--module-path`) holds modules; the JVM reads each module's descriptor, checks that every `requires` is satisfied before starting, and enforces exports. Where a JAR is placed decides what kind of module it becomes.",
   "A named module, also called an explicit module, is a JAR or directory that contains `module-info.class` and is placed on the module path. It reads only the modules it requires (plus `java.base`) and exposes only the packages it exports. This is the fully modular case with strong encapsulation and reliable configuration.",
   "An automatic module is a plain JAR, without `module-info.class`, placed on the module path. It lets modular code depend on libraries that have not been modularized yet. Its name comes from the `Automatic-Module-Name` attribute in the JAR manifest if present; otherwise it is derived from the file name by dropping `.jar` and any version suffix and replacing characters such as hyphens with dots, so `commons-text-1.10.jar` becomes `commons.text`. An automatic module exports and opens all of its packages and reads every other module, including the unnamed module.",
   "The unnamed module holds everything loaded from the class path. There is one unnamed module per class loader. It reads all modules and exports all its packages, so old code keeps working, but a named module cannot declare `requires` on it, because it has no name. That is the key asymmetry: class path code can use modular code, but modular code can reach class path code only through automatic modules.",
   "```text\n                      module-info?   Where         Exports          Can be required?\nNamed (explicit)      yes            module path   declared only    yes, by its name\nAutomatic             no             module path   all packages     yes, by derived name\nUnnamed               either         class path    all packages     no\n```",
   "A modular JAR placed on the class path is treated as part of the unnamed module; its `module-info.class` is ignored. This is why you can migrate gradually. A common strategy is bottom-up (modularize the libraries with no dependencies first) or top-down (make the application a named module and put its unmodularized dependencies on the module path as automatic modules). Two modules on the module path cannot contain the same package, and a name derived from a file name that is not a valid Java identifier sequence makes the JAR fail to load as an automatic module."
  ],
  "terms": [
   [
    "Module path",
    "The list of locations searched for modules, set with --module-path or -p, where module rules are enforced."
   ],
   [
    "Named module",
    "A module with a module-info.class on the module path that reads only what it requires and exposes only what it exports."
   ],
   [
    "Automatic module",
    "A non-modular JAR on the module path; it gets a derived name, exports all packages and reads all modules."
   ],
   [
    "Unnamed module",
    "The module containing all class path code; it reads everything and exports everything but cannot be required."
   ],
   [
    "Automatic-Module-Name",
    "A manifest attribute that sets a stable name for a JAR used as an automatic module."
   ]
  ],
  "example": "A team modularizes its application but depends on a JSON library that has no module-info. By placing the library JAR on the module path, it becomes an automatic module named from its manifest, and the application's module-info can simply say requires that name.",
  "tip": "Automatic modules come from plain JARs on the module path; the unnamed module comes from anything on the class path. Named modules can require automatic modules but never the unnamed module.",
  "check": [
   [
    "What module type does a JAR without module-info become when placed on the module path?",
    "An automatic module, which exports all its packages and reads all other modules."
   ],
   [
    "Can a named module require code in the unnamed module?",
    "No. The unnamed module has no name, so a requires directive cannot refer to it."
   ],
   [
    "What happens to module-info.class in a modular JAR placed on the class path?",
    "It is ignored; the JAR's classes become part of the unnamed module."
   ]
  ]
 },
 {
  "t": "Compiling and running modules with javac --module-path and java --module",
  "body": [
   "A typical single-module project keeps its sources in a folder named after the module: `src/com.greet/module-info.java` and `src/com.greet/com/greet/Main.java`. You compile with `javac`, pointing `-d` at an output directory and `--module-path` (short `-p`) at any modules you depend on. You list every source file, including `module-info.java`.",
   "```text\njavac -p mods -d out/com.greet src/com.greet/module-info.java src/com.greet/com/greet/Main.java\njava  -p out:mods -m com.greet/com.greet.Main\n```",
   "To run, `java --module-path` (or `-p`) lists directories containing modules, separated by `:` on Linux and macOS and `;` on Windows. `--module` (short `-m`) names the module to start and its main class, in the form `moduleName/fully.qualified.MainClass`. If the module's JAR records a main class, created with `jar --main-class`, you can write just `-m com.greet`. Anything after the module name is passed to `main` as arguments.",
   "Watch the short options, because they mean different things in different tools. For `javac`, `-d` is the output directory. For `java`, `-d` is short for `--describe-module`, which prints a module's descriptor: its requires, exports and other directives. `java --list-modules` shows the modules the JDK (and any module path you give) makes available. `java --show-module-resolution` prints how the module graph was built at startup, which helps debug missing modules. For JARs, `jar --describe-module --file app.jar` shows the descriptor.",
   "When several modules live in one source tree, `javac --module-source-path src --module com.greet,com.util -d out` compiles them together; the source path has one subdirectory per module and output goes into matching subdirectories of `out`. Classes still on the class path can be combined with modules using `-cp`, and `--add-modules` adds modules to the root set when nothing requires them directly, for example when class path code needs a module that is not resolved by default.",
   "Errors to recognize: running with `-m` but forgetting the module path gives a module not found error; a `requires` on a module that is not on the module path fails at compile time and again at startup; using a type from a package that the other module does not export fails to compile with a message that the package is not visible. These checks happening early, before any code runs, are the reliable configuration benefit of modules."
  ],
  "terms": [
   [
    "--module-path (-p)",
    "The option for javac and java that lists directories or JARs containing modules."
   ],
   [
    "--module (-m)",
    "The java option that names the module to run, optionally with /MainClass."
   ],
   [
    "--describe-module (-d)",
    "A java option that prints a module's descriptor; not the same as javac's -d output directory."
   ],
   [
    "--module-source-path",
    "A javac option for compiling several modules at once from one source tree with a folder per module."
   ],
   [
    "--list-modules",
    "A java option that lists the observable modules and their versions."
   ]
  ],
  "example": "A build script compiles two modules with javac --module-source-path src -m com.greet,com.util -d out, packages each with jar, and a support engineer later runs java -p lib --describe-module com.greet to confirm which packages are exported when an integration fails.",
  "tip": "The run syntax is java -p path -m module/package.Class. Remember -d means output directory for javac but describe-module for java.",
  "check": [
   [
    "What does java -p out -m com.greet/com.greet.Main do?",
    "Starts the JVM with out on the module path and runs the main method of com.greet.Main in module com.greet."
   ],
   [
    "Which command prints a module's requires and exports?",
    "java --describe-module (or -d) with the module path set, or jar --describe-module --file for a JAR."
   ]
  ]
 },
 {
  "t": "Module import declarations (Java 25): import module and ambiguity rules",
  "body": [
   "A module import declaration, finalized in Java 25, lets you import an entire module's API in one line: `import module java.base;`. It imports, on demand, every public top-level class and interface in every package the module exports. It also includes packages exported by modules that the named module requires transitively. For example, `java.sql` requires `java.xml` transitively, so `import module java.sql;` also makes java.xml's exported types available.",
   "This is mainly a convenience for small programs, scripts and learners, who otherwise need many lines such as `import java.util.*;`, `import java.util.function.*;` and `import java.nio.file.*;`. It does not change what code can access; it only changes which simple names are in scope. Code in the unnamed module (ordinary class path code) can use it, and compact source files automatically import `java.base` as if they began with `import module java.base;`.",
   "Importing whole modules makes name clashes more likely. `java.base` exports `java.util.List` and `java.desktop` exports `java.awt.List`. With both `import module java.base;` and `import module java.desktop;`, the name `List` is ambiguous. The import lines themselves compile; the error happens only when code actually uses the ambiguous simple name. You can still use a fully qualified name such as `java.util.List` at any time.",
   "The standard fix is shadowing. A single-type import such as `import java.util.List;` takes priority over both on-demand package imports and module imports, so it resolves the ambiguity. In Java 25, an on-demand package import such as `import java.util.*;` also shadows module imports, so it would resolve this particular clash as well. Types declared in the same compilation unit or the same package take precedence over imported ones too.",
   "```java\nimport module java.base;\nimport module java.desktop;\nimport java.util.List;          // resolves the List ambiguity\n\nclass Demo {\n    List<String> names = new ArrayList<>(); // java.util.List\n    Frame window;                           // java.awt.Frame from java.desktop\n}\n```",
   "Keep the vocabulary straight. `import module` is different from `requires` in module-info.java: `requires` controls readability between modules, while `import module` only affects name lookup in one source file. It also differs from `import static`. The name after `import module` is a module name like `java.sql`, not a package name, and the module must be one that the current code can read."
  ],
  "terms": [
   [
    "Module import declaration",
    "import module M; which imports on demand all public top-level types in packages M exports, including those from its transitive dependencies."
   ],
   [
    "Ambiguous simple name",
    "A type name that two imports provide from different packages; using it without qualification is a compile error."
   ],
   [
    "Shadowing",
    "When a more specific import or declaration hides a name that a broader import would otherwise supply."
   ],
   [
    "Single-type import",
    "An import naming one class, such as import java.util.List;, which takes priority over on-demand and module imports."
   ]
  ],
  "example": "A teacher's sample program starts with import module java.base; and uses List, Map, Path and LocalDate without further imports. When a student adds import module java.desktop; to draw a window, uses of List stop compiling until the student adds import java.util.List;.",
  "tip": "An ambiguity from two module imports is reported only where the simple name is used, and a single-type import fixes it. Also remember module imports bring in types from transitively required modules.",
  "check": [
   [
    "With import module java.base; and import module java.desktop;, does a declaration List<String> x; compile?",
    "No. List is ambiguous between java.util.List and java.awt.List unless a single-type import or qualified name resolves it."
   ],
   [
    "Does import module java.sql; make java.xml's exported types available?",
    "Yes, because java.sql requires java.xml transitively."
   ],
   [
    "Which module does a compact source file import automatically?",
    "java.base."
   ]
  ]
 },
 {
  "t": "Compact source files and instance main methods (Java 25), java.lang.IO",
  "body": [
   "Java 25 finalized two features that make small programs shorter. The first is instance main methods. Traditionally the entry point had to be `public static void main(String[] args)`. Now the launcher also accepts a `main` method that is not static, not public and has no parameters. The simplest valid program in a normal class is `class Hello { void main() { System.out.println(\"Hi\"); } }`.",
   "The launcher chooses the method with a defined protocol. If the class declares or inherits a `main(String[])` method, that one is used; otherwise it looks for a `main()` with no parameters. The method must not be private. If the chosen method is static it is called directly. If it is an instance method, the launcher creates an object with the class's non-private no-argument constructor and calls `main` on it; if there is no such constructor, launching fails.",
   "The second feature is compact source files. A source file may contain fields and methods that are not inside any class declaration. The compiler then wraps them in an implicitly declared class, which is final, extends Object, is in the unnamed package, and has only a default constructor. Its name comes from the file name, but other code cannot refer to it by name. A compact source file must contain a launchable `main` method or it does not compile, and it may still declare nested classes, records and enums alongside the top-level members.",
   "```java\n// Greeter.java  (a compact source file)\nString greeting = \"Hello\";\n\nString greet(String who) { return greeting + \", \" + who; }\n\nvoid main() {\n    String name = IO.readln(\"Your name: \");\n    IO.println(greet(name));\n    IO.println(List.of(1, 2, 3)); // java.util types available: java.base is imported\n}\n```",
   "Compact source files automatically import the `java.base` module, so `List`, `Map`, `Path` and other common types need no import statements. The new class `java.lang.IO` provides simple console methods: `IO.println(obj)`, `IO.println()`, `IO.print(obj)`, `IO.readln()` and `IO.readln(prompt)`, which prints the prompt and returns a line of input (or null at end of input). Because IO is in `java.lang`, it needs no import in any Java file, but its methods are static members of IO, so you write `IO.println`, not bare `println`.",
   "These features do not create a separate dialect. A compact source file is ordinary Java, compiled by `javac` or run directly with `java Greeter.java`, and it can grow into a normal class simply by wrapping the members in `class Greeter { ... }` and adding the imports it needs. Exam questions test which main signatures are launchable, what the implicit class can and cannot do, and what is imported automatically."
  ],
  "terms": [
   [
    "Instance main method",
    "A non-static main method, with or without a String[] parameter, that the launcher calls on a newly created instance."
   ],
   [
    "Compact source file",
    "A source file with top-level fields and methods not enclosed in a class, which the compiler wraps in an implicit final class."
   ],
   [
    "Implicitly declared class",
    "The unnamed-package final class the compiler creates for a compact source file; code cannot refer to it by name."
   ],
   [
    "java.lang.IO",
    "A class with static console helpers print, println and readln, available without an import."
   ]
  ],
  "example": "A new developer writes a ten-line Temperature.java with a top-level convert method and void main() that reads input with IO.readln and prints results with IO.println. They run it with java Temperature.java, and later wrap it in a class when it becomes part of a larger project.",
  "tip": "If a class has both main(String[]) and main(), the String[] version is chosen. A private main is not launchable, and an instance main needs a non-private no-argument constructor.",
  "check": [
   [
    "Is void main() in a regular class a valid entry point in Java 25?",
    "Yes. The launcher creates an instance with the no-argument constructor and calls the instance main method."
   ],
   [
    "Can another class refer to the implicit class created from Greeter.java by the name Greeter?",
    "No. An implicitly declared class cannot be referenced by name from other code."
   ],
   [
    "Do you need import statements for List in a compact source file?",
    "No. Compact source files automatically import the java.base module."
   ]
  ]
 },
 {
  "t": "Launching single-file and multi-file source programs with the java launcher",
  "body": [
   "The `java` launcher can run a program directly from source, without a separate `javac` step. Running `java Hello.java arg1 arg2` compiles the file in memory and runs it; no `.class` files are written to disk. This source-file mode is intended for small programs, scripts, experiments and learning. The launcher recognizes it because the first non-option argument ends in `.java`.",
   "In the original single-file mode, all the program's classes had to be in that one file. The class that runs is the first top-level class declared in the file, and it must have a launchable `main` method. The file may declare several top-level classes, and its name need not match the public class name. Arguments that follow the file name are passed to `main`.",
   "Since Java 22 the launcher also supports multi-file programs. When the launched file refers to a class it does not declare, the launcher looks for a matching `.java` file in the directory tree rooted at the directory containing the launched file, using the usual package-to-directory layout, and compiles it on demand. So `java Main.java` works even if `Main` uses `util/Helper.java` in package `util`. Only files actually needed are compiled, and files are compiled when first referenced, so a compile error in a helper may appear only when that class is first used.",
   "```text\nproject/\n  Main.java            (uses util.Helper)\n  util/Helper.java     (package util;)\n\n$ cd project\n$ java Main.java hello      # compiles Main, then Helper on demand, then runs\n$ java -cp 'lib/*' Main.java   # add library JARs to the class path\n```",
   "Useful options: `--class-path` (or `-cp`) adds library JARs, which you can use from the source program; `--source N` tells the compiler which language version to use, and is required when the file does not end in `.java`. That second case allows shebang scripts on Linux and macOS: a file whose first line is `#!/path/to/java --source 25` can be marked executable and run directly; the launcher ignores that first line. Options for the launcher and compiler go before the file name; anything after the file name goes to the program.",
   "Know the limits. Source mode is not a build tool: there is no incremental compilation, no packaging, and annotation processing is disabled. For anything larger you move to `javac`, `jar` and a build system. Combined with compact source files and instance main methods, source mode lets a beginner start with `java Hello.java` and a single `void main()` method."
  ],
  "terms": [
   [
    "Source-file mode",
    "Running java with a .java file name so the launcher compiles the source in memory and runs it without writing class files."
   ],
   [
    "Multi-file source program",
    "A source-mode program whose other classes are found as .java files under the launched file's directory and compiled on demand."
   ],
   [
    "--source",
    "A launcher option setting the language version for source mode; required for files that do not end in .java."
   ],
   [
    "Shebang file",
    "An executable script whose first line starts with #! and names the java launcher, run directly by the operating system."
   ]
  ],
  "example": "An operations engineer keeps a CheckCerts.java utility in a tools folder with a helper class in tools/net/Tls.java. Running java CheckCerts.java host.example compiles both in memory and runs the check, with no build setup and no class files left behind.",
  "tip": "In source mode the first top-level class in the file is launched, arguments after the file name go to main, and no class files are produced. Multi-file support finds other classes as source files by package directory.",
  "check": [
   [
    "Does java Hello.java create Hello.class on disk?",
    "No. Source-file mode compiles in memory only."
   ],
   [
    "If Hello.java declares class A first and class Hello second, which runs?",
    "Class A, the first top-level class in the file, provided it has a launchable main method."
   ],
   [
    "When is --source required?",
    "When the source file name does not end in .java, as in a shebang script."
   ]
  ]
 },
 {
  "t": "JDK tools: jar, jdeps, jlink",
  "body": [
   "The JDK ships command-line tools that the exam expects you to recognize by purpose and by their key options. Three matter most for packaging: `jar` builds and inspects archives, `jdeps` analyzes dependencies, and `jlink` builds a custom runtime image containing only the modules an application needs.",
   "`jar` works like the classic tar tool. `jar --create --file app.jar -C classes .` (short form `jar -cf app.jar -C classes .`) packages the contents of the classes directory; `-C dir` changes to that directory before adding files. `--main-class` (short `-e`) records the entry point in the manifest so `java -jar app.jar` works, and for a modular JAR it also records the main class in module-info. `-t` lists contents (`jar -tf app.jar`), `-x` extracts, `-u` updates, and `-v` makes output verbose. `jar --describe-module --file app.jar` shows a modular JAR's descriptor. The manifest lives at `META-INF/MANIFEST.MF`.",
   "`jdeps` reads class files or JARs and reports what they depend on, at package or module level. `jdeps app.jar` lists package dependencies; `-s` (or `-summary`) prints a module-level summary; `--list-deps` lists the modules needed; `--print-module-deps` prints a comma-separated list suitable for jlink's `--add-modules`. `--jdk-internals` finds uses of internal JDK APIs that strong encapsulation will block, which is valuable before migrating an old application. `--generate-module-info` can draft a module-info.java for a plain JAR.",
   "```text\njar  --create --file mods/app.jar --main-class com.app.Main -C out/com.app .\njdeps -s mods/app.jar\njdeps --jdk-internals legacy.jar\njlink --module-path mods --add-modules com.app \\\n      --output build/runtime --launcher app=com.app/com.app.Main \\\n      --strip-debug --no-header-files --no-man-pages\nbuild/runtime/bin/app\n```",
   "`jlink` links a set of modules and their transitive dependencies into a standalone runtime image: a directory with its own `bin/java`, libraries and only the needed modules. `--module-path` points to your modules (the JDK's own modules are found automatically in current JDKs), `--add-modules` names the root modules, and `--output` names the destination directory, which must not already exist. `--launcher name=module/mainclass` creates a script to start the app, and `--strip-debug`, `--no-header-files`, `--no-man-pages` and `--compress` shrink the image.",
   "jlink requires explicit named modules. It cannot link automatic modules or class path JARs, so an application with non-modular dependencies must modularize them or use another packaging approach. The payoff is a smaller runtime, faster startup and a reduced attack surface, because unused modules are simply absent. Running `bin/java --list-modules` inside the image shows exactly what was included."
  ],
  "terms": [
   [
    "jar",
    "The JDK tool that creates, lists, extracts and updates JAR archives and can record a main class."
   ],
   [
    "jdeps",
    "The JDK dependency analyzer that reports package and module dependencies and internal API use."
   ],
   [
    "jlink",
    "The JDK tool that assembles named modules and their dependencies into a custom runtime image."
   ],
   [
    "Runtime image",
    "A self-contained directory with a JVM and only the modules an application needs."
   ],
   [
    "Manifest",
    "The META-INF/MANIFEST.MF file inside a JAR holding metadata such as Main-Class."
   ]
  ],
  "example": "Before upgrading an old service, a team runs jdeps --jdk-internals on its JARs and finds calls to an internal JDK class. After replacing them and modularizing, they use jlink to build a trimmed runtime for their container image, which starts faster and ships fewer modules to patch.",
  "tip": "Match tool to job: jar packages, jdeps analyzes, jlink builds a runtime. jlink works only with named modules, never automatic modules or the class path.",
  "check": [
   [
    "Which option lists the contents of a JAR?",
    "-t, typically jar -tf app.jar (or jar --list --file app.jar)."
   ],
   [
    "Which jdeps option finds uses of internal JDK APIs?",
    "--jdk-internals."
   ],
   [
    "Can jlink include a plain JAR placed on the module path as an automatic module?",
    "No. jlink only links explicit named modules."
   ]
  ]
 },
 {
  "t": "Creating threads with Runnable, Thread, and the Thread.Builder API",
  "body": [
   "A thread is an independent path of execution within a program. Every Java program starts with a main thread, and you can create more to do work concurrently. The work itself is usually described by a `Runnable`, a functional interface with one method, `void run()`, which takes no arguments, returns nothing and cannot throw checked exceptions. Because it is functional, a lambda works: `Runnable task = () -> System.out.println(\"working\");`.",
   "The classic ways to create a thread are to pass a Runnable to a Thread constructor, or to subclass Thread and override `run`. Passing a Runnable is preferred because it separates the task from the mechanism that runs it and leaves your class free to extend something else. In both cases, nothing happens until you call `start()`, which asks the JVM to create the new thread and run `run()` on it. `join()` makes the calling thread wait until the other one finishes.",
   "```java\nRunnable task = () -> System.out.println(Thread.currentThread().getName());\n\nThread t1 = new Thread(task, \"worker-1\");\nt1.start();\n\nThread t2 = Thread.ofPlatform().name(\"worker-\", 2).daemon(true).start(task);\nThread t3 = Thread.ofVirtual().name(\"v1\").unstarted(task);\nt3.start();\nThread t4 = Thread.startVirtualThread(task);\n\nt1.join();   // wait for t1 to finish; throws InterruptedException\n```",
   "The Thread.Builder API, added alongside virtual threads, gives a fluent way to configure threads. `Thread.ofPlatform()` returns a builder for ordinary operating-system threads and `Thread.ofVirtual()` a builder for virtual threads. You set properties such as `name(\"worker\")`, or `name(\"worker-\", 0)` to number threads with a counter, and platform builders add `daemon(boolean)` and `priority(int)`. Then `start(runnable)` creates and starts the thread, `unstarted(runnable)` creates it without starting, and `factory()` returns a ThreadFactory you can hand to an executor. `Thread.startVirtualThread(runnable)` is a shortcut.",
   "A daemon thread does not keep the JVM alive: when only daemon threads remain, the JVM exits. Virtual threads are always daemon threads. Thread names are not unique identifiers; each thread also has a `threadId()`. `Thread.currentThread()` returns the thread running the current code, which is how a task finds its own name.",
   "In real applications you rarely create threads by hand for each task; you submit tasks to an ExecutorService, which manages threads for you. But the exam still tests the basics: which method a Runnable defines, that `start()` is required to create a new thread, and how the builder methods chain. Remember that `run()` and `start()` are different; calling `run()` directly just runs the code on the current thread."
  ],
  "terms": [
   [
    "Runnable",
    "A functional interface with void run() that represents a task with no result and no checked exceptions."
   ],
   [
    "Thread.Builder",
    "A fluent API, obtained with Thread.ofPlatform() or Thread.ofVirtual(), for configuring and creating threads."
   ],
   [
    "unstarted",
    "A Thread.Builder method that creates a configured thread without starting it."
   ],
   [
    "Daemon thread",
    "A background thread that does not prevent the JVM from exiting."
   ],
   [
    "join",
    "A Thread method that makes the caller wait until that thread terminates."
   ]
  ],
  "example": "A desktop app starts a background indexer with Thread.ofPlatform().name(\"indexer\").daemon(true).start(indexTask) so the UI stays responsive, and the indexer does not block the app from closing when the user quits.",
  "tip": "Runnable's method is run(), it returns void and cannot throw checked exceptions. daemon() and priority() are available on platform builders; virtual threads are always daemon.",
  "check": [
   [
    "What is the difference between Thread.ofVirtual().start(r) and Thread.ofVirtual().unstarted(r)?",
    "start creates and starts the thread immediately; unstarted returns a configured thread you must start yourself."
   ],
   [
    "Why is implementing Runnable usually preferred to extending Thread?",
    "It separates the task from how it is run, lets the class extend another class, and lets executors run the same task."
   ]
  ]
 },
 {
  "t": "Platform threads vs virtual threads; Executors.newVirtualThreadPerTaskExecutor()",
  "body": [
   "A platform thread is a thin wrapper around an operating system thread. It holds that OS thread for its whole life, including while it waits for a database or network reply. OS threads are relatively expensive: each reserves memory for a stack and the OS can schedule only so many efficiently, so applications traditionally used fixed-size thread pools and shared a limited number of threads among many tasks.",
   "A virtual thread, final since Java 21, is a lightweight thread managed by the JVM rather than the OS. The JVM runs virtual threads on a small pool of platform threads called carrier threads. When a virtual thread performs a blocking operation such as reading from a socket or sleeping, the JVM unmounts it from its carrier, parking its stack in heap memory, and the carrier is free to run another virtual thread. When the operation completes, the virtual thread is mounted again, possibly on a different carrier.",
   "The result is that you can have very large numbers of virtual threads, even millions, and write simple blocking code in a thread-per-request style while still scaling. Virtual threads help with throughput of I/O-bound work: many tasks spending most of their time waiting. They do not make CPU-bound code faster, because the number of carrier threads, and therefore of CPU cores in use, stays the same.",
   "```java\ntry (ExecutorService ex = Executors.newVirtualThreadPerTaskExecutor()) {\n    for (int i = 0; i < 10_000; i++) {\n        int id = i;\n        ex.submit(() -> fetchOrder(id));   // each task gets its own new virtual thread\n    }\n}   // close() waits for all submitted tasks to finish\n```",
   "`Executors.newVirtualThreadPerTaskExecutor()` returns an ExecutorService that starts a new virtual thread for every submitted task. There is no pool, because virtual threads are cheap to create; you should not pool virtual threads, and you should not reuse them. If you need to limit concurrent access to a scarce resource, such as a database with ten connections, use a `Semaphore` rather than a small pool. Other ways to create virtual threads are `Thread.ofVirtual().start(r)`, `Thread.startVirtualThread(r)` and `Thread.ofVirtual().factory()`.",
   "Some properties differ from platform threads. Virtual threads are always daemon threads, and calling `setDaemon(false)` on one throws `IllegalArgumentException`. Their priority is fixed at normal, and `setPriority` has no effect. `isVirtual()` tells you which kind a thread is. Thread-local variables work but, with millions of threads, heavy per-thread caches in ThreadLocal waste memory, which is one reason scoped values were introduced.",
   "A virtual thread can be pinned to its carrier, meaning it cannot unmount while blocked; historically this happened when blocking inside a `synchronized` block, and still happens during native method calls. Java 24 removed the synchronized case, but long pinning should still be avoided. For the exam, focus on the model: many cheap virtual threads for blocking I/O, a few platform threads for CPU work, and one virtual thread per task with no pooling."
  ],
  "terms": [
   [
    "Platform thread",
    "A Java thread backed one to one by an operating system thread for its whole lifetime."
   ],
   [
    "Virtual thread",
    "A lightweight JVM-managed thread that unmounts from its carrier while blocked so the carrier can run other work."
   ],
   [
    "Carrier thread",
    "A platform thread on which the JVM mounts virtual threads to execute them."
   ],
   [
    "newVirtualThreadPerTaskExecutor",
    "An Executors factory method returning an ExecutorService that starts a new virtual thread for each task."
   ],
   [
    "Pinning",
    "A state where a blocked virtual thread cannot unmount from its carrier, reducing scalability."
   ]
  ],
  "example": "A web service that calls three slow downstream APIs per request switches from a 200-thread fixed pool to a virtual-thread-per-task executor. Under load it handles far more concurrent requests with the same hardware, because waiting requests no longer tie up operating system threads.",
  "tip": "Virtual threads improve scalability for blocking, I/O-heavy tasks, not raw CPU speed. Do not pool them; limit access to scarce resources with a Semaphore instead. They are always daemon threads.",
  "check": [
   [
    "Will switching a CPU-bound image-resizing job to virtual threads make it finish faster?",
    "Generally no. Virtual threads help when tasks wait on I/O; CPU-bound work is limited by the number of cores."
   ],
   [
    "What happens when a virtual thread blocks on a network read?",
    "The JVM unmounts it from its carrier thread, which can then run other virtual threads until the read completes."
   ],
   [
    "Why should you not create a fixed pool of 10 virtual threads to limit database calls?",
    "Virtual threads are meant to be created per task and not pooled; use a Semaphore to limit concurrency."
   ]
  ]
 },
 {
  "t": "ExecutorService, Callable and Future; shutdown, awaitTermination, close()",
  "body": [
   "An `ExecutorService` separates submitting tasks from deciding which threads run them. You create one with factory methods in `Executors`: `newSingleThreadExecutor()` runs tasks one at a time in order, `newFixedThreadPool(n)` uses n reusable threads, `newCachedThreadPool()` grows and shrinks as needed, `newScheduledThreadPool(n)` runs tasks after a delay or periodically, and `newVirtualThreadPerTaskExecutor()` uses a new virtual thread per task.",
   "Tasks come in two shapes. A `Runnable` has `void run()` and cannot throw checked exceptions. A `Callable<V>` has `V call() throws Exception`, so it can return a result and throw checked exceptions. `execute(Runnable)` is fire-and-forget and returns void. `submit` accepts either a Runnable or a Callable and returns a `Future`. `invokeAll(collection)` runs many Callables and returns a list of Futures once all are done, and `invokeAny(collection)` returns the result of one that completed successfully and cancels the rest.",
   "A `Future<V>` represents a result that may not be ready yet. `get()` blocks until the task finishes and returns the value; for a submitted Runnable the value is null. `get(timeout, unit)` waits at most that long and throws `TimeoutException` if the result is not ready. If the task threw an exception, `get()` throws `ExecutionException` with the original exception as its cause. `get()` also throws the checked `InterruptedException`. `isDone()` checks without blocking, and `cancel(true)` attempts to stop the task by interrupting it.",
   "```java\nExecutorService ex = Executors.newFixedThreadPool(2);\ntry {\n    Future<Integer> f = ex.submit(() -> 6 * 7);   // Callable<Integer>\n    Future<?> r = ex.submit(() -> System.out.println(\"hi\")); // Runnable\n    System.out.println(f.get());                 // 42 (blocks until done)\n} finally {\n    ex.shutdown();\n    if (!ex.awaitTermination(5, TimeUnit.SECONDS)) ex.shutdownNow();\n}\n```",
   "An executor's threads keep the JVM running until you shut it down. `shutdown()` stops accepting new tasks but lets already submitted tasks finish; it does not wait. Submitting after that throws `RejectedExecutionException`. `shutdownNow()` also attempts to stop running tasks by interrupting them and returns the list of tasks that never started. `awaitTermination(timeout, unit)` blocks until all tasks finish after a shutdown, or until the timeout, and returns true if it terminated. `isShutdown()` becomes true after shutdown is called; `isTerminated()` becomes true only when all tasks have completed.",
   "Since Java 19 ExecutorService implements `AutoCloseable`, so you can use try-with-resources. Its `close()` method calls shutdown and then waits for all tasks to finish, so leaving the block guarantees the work is done. This is the idiomatic pattern with virtual-thread executors. Be careful not to confuse `close()`, which waits, with `shutdown()`, which does not."
  ],
  "terms": [
   [
    "Callable<V>",
    "A task interface with V call() throws Exception, returning a result and allowed to throw checked exceptions."
   ],
   [
    "Future<V>",
    "A handle to a pending result, with get, get with timeout, isDone and cancel."
   ],
   [
    "ExecutionException",
    "The checked exception thrown by Future.get when the task itself threw; the original exception is its cause."
   ],
   [
    "shutdown",
    "Stops an executor accepting new tasks while letting submitted tasks complete, without waiting."
   ],
   [
    "awaitTermination",
    "Blocks until all tasks complete after shutdown or a timeout expires, returning whether it terminated."
   ]
  ],
  "example": "A price aggregator submits a Callable per supplier to a fixed pool, then calls future.get(2, TimeUnit.SECONDS) on each so one slow supplier cannot stall the page, and catches TimeoutException to show that supplier as unavailable.",
  "tip": "execute returns void and takes only a Runnable; submit returns a Future. shutdown does not wait, awaitTermination waits, and close() does both. Exceptions inside a task reach you wrapped in ExecutionException from get().",
  "check": [
   [
    "What does Future.get() return for a submitted Runnable?",
    "null, once the task has completed."
   ],
   [
    "After shutdown(), what happens when you submit another task?",
    "It is rejected with a RejectedExecutionException."
   ],
   [
    "What is the difference between isShutdown() and isTerminated()?",
    "isShutdown is true once shutdown was requested; isTerminated is true only after all tasks have finished following shutdown."
   ]
  ]
 },
 {
  "t": "Thread lifecycle and start() vs run()",
  "body": [
   "Every Thread object moves through states defined in the `Thread.State` enum, and `getState()` reports the current one. `NEW` means the thread object exists but `start()` has not been called. `RUNNABLE` means it is running or ready to run; Java does not separate running from waiting for a CPU. `BLOCKED` means it is waiting to acquire a monitor lock to enter a `synchronized` block or method. `WAITING` means it waits indefinitely for another thread, for example in `join()` without a timeout or `Object.wait()`. `TIMED_WAITING` is the same with a time limit, such as `Thread.sleep(100)` or `join(500)`. `TERMINATED` means `run()` has finished, normally or with an exception.",
   "The typical transitions are NEW to RUNNABLE on `start()`, RUNNABLE to BLOCKED, WAITING or TIMED_WAITING and back again as the thread waits for locks, other threads or time, and finally RUNNABLE to TERMINATED. A thread cannot be restarted: once terminated it stays terminated, and calling `start()` a second time on the same Thread object, in any state other than NEW, throws `IllegalThreadStateException`.",
   "The most tested distinction is `start()` versus `run()`. `start()` asks the JVM to create a new thread of execution, which then calls `run()`. Calling `run()` directly is just an ordinary method call: the code executes synchronously on the current thread, no new thread is created, and the Thread object stays in the NEW state.",
   "```java\nRunnable job = () -> System.out.println(Thread.currentThread().getName());\nThread t = new Thread(job, \"worker\");\n\nt.run();    // prints main    (runs on the calling thread)\nt.start();  // prints worker  (runs on a new thread)\n// t.start();  // IllegalThreadStateException: already started\n```",
   "The order of output from multiple threads is not guaranteed. If main starts a thread and then prints, either line may appear first. The only way to force ordering is to coordinate, for example with `join()`, which waits for the other thread to terminate. `Thread.sleep` puts the current thread in TIMED_WAITING; it does not release locks it holds, and it throws the checked `InterruptedException`.",
   "Interruption is the cooperative way to ask a thread to stop. `t.interrupt()` sets the thread's interrupt flag; if the thread is sleeping, waiting or joining, that call throws `InterruptedException` and clears the flag. Well-behaved code checks `Thread.currentThread().isInterrupted()` in long loops and exits cleanly. The old `stop()` method is unsafe and no longer works; you should never rely on it."
  ],
  "terms": [
   [
    "Thread.State",
    "The enum of thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING and TERMINATED."
   ],
   [
    "BLOCKED",
    "The state of a thread waiting to acquire a monitor lock for a synchronized block or method."
   ],
   [
    "TIMED_WAITING",
    "The state of a thread waiting with a time limit, as in sleep or join with a timeout."
   ],
   [
    "IllegalThreadStateException",
    "Thrown when start() is called on a thread that has already been started."
   ],
   [
    "Interrupt",
    "A cooperative signal that sets a thread's interrupt flag and wakes it from sleep, wait or join with InterruptedException."
   ]
  ],
  "example": "A developer notices that their slow export still freezes the UI even though it is wrapped in a Thread. The code calls exportThread.run() instead of start(), so the export runs on the UI thread. Changing it to start() moves the work to a new thread.",
  "tip": "Calling run() does not create a thread, so Thread.currentThread() inside it is the caller. Calling start() twice throws IllegalThreadStateException. Unless code uses join or another coordination tool, output order between threads is unpredictable.",
  "check": [
   [
    "What state is a thread in after it is created but before start() is called?",
    "NEW."
   ],
   [
    "Which state is a thread in while inside Thread.sleep(1000)?",
    "TIMED_WAITING."
   ],
   [
    "Does calling t.run() change t's state to RUNNABLE?",
    "No. run() executes on the calling thread; t stays NEW."
   ]
  ]
 },
 {
  "t": "Race conditions, synchronized blocks and methods, and visibility",
  "body": [
   "A race condition occurs when the result of a program depends on the unpredictable timing of threads that share mutable data. The textbook case is `count++` on a shared field. It looks like one step, but it is three: read count, add one, write it back. If two threads read the same value before either writes, both write the same new value and one increment is lost. Run a million increments on two threads and the total is usually less than two million.",
   "The `synchronized` keyword fixes this with mutual exclusion. Every object has an intrinsic lock, also called a monitor. A synchronized block, `synchronized (lock) { ... }`, lets only one thread at a time hold that lock and run code guarded by it; others trying to enter enter the BLOCKED state until the lock is released. A synchronized instance method is equivalent to `synchronized (this)` around its body, and a synchronized static method locks the Class object, such as `Counter.class`. Instance and static synchronized methods therefore use different locks and do not exclude each other.",
   "```java\nclass Counter {\n    private int count;\n    private final Object lock = new Object();\n    void increment() { synchronized (lock) { count++; } }\n    synchronized int get() { return count; }   // locks this, not lock!\n}\n```",
   "Mutual exclusion only works if every access to the shared data uses the same lock. In the example above, `get()` locks `this` while `increment()` locks `lock`, so they are not coordinated; the fix is to use one lock for both. Intrinsic locks are reentrant: a thread already holding a lock can enter another block synchronized on the same object without deadlocking itself. The lock is released automatically when the block exits, even by exception.",
   "The second problem is visibility. For performance, threads may cache values and the compiler and CPU may reorder instructions, so without synchronization one thread may never see another thread's write. The Java Memory Model defines happens-before relationships: releasing a lock happens-before the next acquisition of the same lock, so everything written inside a synchronized block is visible to the next thread that takes the lock. `Thread.start()` and `join()` also create happens-before edges.",
   "The `volatile` keyword on a field guarantees visibility: every read sees the most recent write, and it prevents harmful reordering around it. It is ideal for a stop flag, `private volatile boolean running = true;`, written by one thread and read by another. But volatile does not make compound actions atomic, so `count++` on a volatile int is still a race condition. For that you need synchronized, a lock, or an atomic class.",
   "Other safe approaches are to avoid sharing: use immutable objects, confine data to one thread, or let a concurrent collection manage it. Synchronization adds contention, so keep synchronized regions short."
  ],
  "terms": [
   [
    "Race condition",
    "A bug where the outcome depends on the timing of threads accessing shared mutable data."
   ],
   [
    "Intrinsic lock (monitor)",
    "The lock built into every object, acquired by synchronized blocks and methods."
   ],
   [
    "synchronized method",
    "A method whose body runs while holding the lock on this, or on the Class object for static methods."
   ],
   [
    "Visibility",
    "Whether a write by one thread is guaranteed to be seen by reads in another thread."
   ],
   [
    "volatile",
    "A field modifier guaranteeing visibility and ordering of reads and writes, but not atomicity of compound operations."
   ]
  ],
  "example": "A web app counts page views with a plain int field updated by many request threads, and the daily total is always lower than the access log shows. Making the update synchronized, or switching to an AtomicLong, removes the lost updates.",
  "tip": "volatile gives visibility but not atomicity, so volatile count++ is still unsafe. Synchronized instance methods lock this and static ones lock the Class object; two methods only exclude each other if they use the same lock.",
  "check": [
   [
    "Why is count++ unsafe when two threads run it on a shared field?",
    "It is a read, an add and a write; threads can interleave between those steps and overwrite each other's updates."
   ],
   [
    "Does a synchronized static method block a thread entering a synchronized instance method of the same class?",
    "No. They lock different objects: the Class object versus the instance."
   ],
   [
    "When is volatile enough?",
    "When one thread writes a value that others only read, such as a stop flag, and no read-modify-write is needed."
   ]
  ]
 },
 {
  "t": "Atomic classes (AtomicInteger, AtomicLong) and locks (ReentrantLock, tryLock)",
  "body": [
   "The `java.util.concurrent.atomic` package offers classes such as `AtomicInteger`, `AtomicLong`, `AtomicBoolean` and `AtomicReference` that perform single-variable updates atomically without explicit locking. They rely on hardware compare-and-swap (CAS) instructions: an update succeeds only if the value has not changed since it was read, and retries otherwise. They also have volatile-like visibility, so every thread sees the latest value.",
   "Know the method names and what they return. `incrementAndGet()` adds one and returns the new value (like `++x`), while `getAndIncrement()` returns the old value (like `x++`). The decrement and add versions follow the same pattern: `decrementAndGet`, `getAndDecrement`, `addAndGet(n)`, `getAndAdd(n)`. `get()` and `set()` read and write. `compareAndSet(expected, newValue)` sets the value only if it currently equals expected and returns a boolean. `updateAndGet(x -> x * 2)` and `accumulateAndGet(5, Integer::sum)` apply a function atomically, retrying if needed, so the function should be free of side effects.",
   "```java\nAtomicInteger hits = new AtomicInteger();\nhits.incrementAndGet();          // 1\nint old = hits.getAndAdd(10);    // old = 1, now 11\nhits.compareAndSet(11, 0);       // true, now 0\nhits.updateAndGet(x -> x + 5);   // 5\n```",
   "Atomics protect a single variable. When an invariant spans several variables, such as moving money between two balances, you need a lock. `ReentrantLock` in `java.util.concurrent.locks` implements the `Lock` interface and provides the same mutual exclusion as synchronized, with more control. The rule is to call `lock()` before the try block and `unlock()` in finally, because unlike synchronized nothing releases the lock automatically.",
   "```java\nprivate final Lock lock = new ReentrantLock();\nvoid transfer(Account a, Account b, int amt) {\n    lock.lock();\n    try { a.withdraw(amt); b.deposit(amt); }\n    finally { lock.unlock(); }\n}\n```",
   "The extra control is mostly about not waiting forever. `tryLock()` attempts to acquire the lock immediately and returns true or false without blocking. `tryLock(1, TimeUnit.SECONDS)` waits up to that long and throws `InterruptedException`. When tryLock returns false you must not call unlock, and you should do something else, such as retry later. `lockInterruptibly()` waits but can be interrupted. `new ReentrantLock(true)` creates a fair lock that grants access roughly in arrival order, at some cost in throughput.",
   "Reentrant means the thread that holds the lock can acquire it again; each `lock()` increments a hold count, and the lock is released only after an equal number of `unlock()` calls. Calling `unlock()` on a lock the current thread does not hold throws `IllegalMonitorStateException`. For read-heavy data, `ReentrantReadWriteLock` lets many readers share access while writers get exclusive access."
  ],
  "terms": [
   [
    "AtomicInteger",
    "An int wrapper with atomic, lock-free operations such as incrementAndGet and compareAndSet."
   ],
   [
    "Compare-and-swap (CAS)",
    "An atomic hardware operation that updates a value only if it still equals an expected value."
   ],
   [
    "ReentrantLock",
    "An explicit Lock implementation that the holding thread can re-acquire, released by matching unlock calls."
   ],
   [
    "tryLock",
    "A Lock method that tries to acquire the lock without blocking, or within a timeout, and returns whether it succeeded."
   ],
   [
    "IllegalMonitorStateException",
    "Thrown when a thread unlocks a lock it does not hold."
   ]
  ],
  "example": "A rate limiter tracks requests with an AtomicLong counter, while a booking system that must update both a seat map and a payment ledger together guards both with one ReentrantLock and uses tryLock with a timeout so a stuck request fails fast instead of hanging.",
  "tip": "incrementAndGet returns the new value and getAndIncrement returns the old one. Always unlock in finally, and only after a successful lock or tryLock; unlocking a lock you do not hold throws IllegalMonitorStateException.",
  "check": [
   [
    "If an AtomicInteger holds 5, what does getAndIncrement() return and what is the new value?",
    "It returns 5 and the value becomes 6."
   ],
   [
    "What does tryLock() return if another thread holds the lock?",
    "false, immediately, without waiting."
   ],
   [
    "A thread calls lock() twice on a ReentrantLock. How many unlock() calls release it?",
    "Two; the hold count must return to zero."
   ]
  ]
 },
 {
  "t": "Concurrent collections: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue",
  "body": [
   "The ordinary collections, ArrayList, HashMap and so on, are not thread-safe. If several threads modify one without coordination you can lose updates, corrupt the internal structure or get a `ConcurrentModificationException`. Wrapping with `Collections.synchronizedList(list)` or `synchronizedMap` makes each method call synchronized on one lock, which is correct but serializes all access, and you must still synchronize manually while iterating. The `java.util.concurrent` package offers collections designed for concurrency.",
   "`ConcurrentHashMap` allows many threads to read and write at once with fine-grained internal locking and lock-free reads. Its iterators are weakly consistent: they never throw ConcurrentModificationException and reflect the map at some point during iteration. It does not permit null keys or null values, and throws NullPointerException if you try. Atomic compound operations such as `putIfAbsent`, `computeIfAbsent`, `compute` and `merge` let you update safely: `counts.merge(word, 1, Integer::sum)` counts words across threads without a separate lock. A get-then-put sequence, by contrast, is still a race.",
   "`CopyOnWriteArrayList` (and `CopyOnWriteArraySet`) copies the whole underlying array on every modification. Iterators work on a snapshot taken when they were created, so they never throw ConcurrentModificationException and do not see later changes, and the iterator's own `remove` is unsupported. This is efficient when reads and iteration vastly outnumber writes, such as a list of event listeners, and wasteful when writes are frequent.",
   "```java\nList<String> listeners = new CopyOnWriteArrayList<>(List.of(\"a\", \"b\"));\nfor (String s : listeners) listeners.add(s + \"!\");  // no exception; loop sees only a, b\nSystem.out.println(listeners);  // [a, b, a!, b!]\n\nBlockingQueue<String> q = new LinkedBlockingQueue<>(100);\nq.put(\"job\");            // waits if the queue is full\nString job = q.take();   // waits if the queue is empty\nString maybe = q.poll(1, TimeUnit.SECONDS); // null if nothing arrives in time\n```",
   "A `BlockingQueue` is the backbone of producer-consumer designs. Producers add work and consumers remove it, and the queue handles the waiting. Its methods come in groups: `add` and `remove` throw exceptions when the queue is full or empty; `offer` and `poll` return false or null immediately; `put` and `take` block until space or an element is available; `offer(e, timeout, unit)` and `poll(timeout, unit)` wait for a limited time. Implementations include `ArrayBlockingQueue` (bounded, array-based), `LinkedBlockingQueue` (optionally bounded) and `PriorityBlockingQueue`.",
   "Other members you may see are `ConcurrentLinkedQueue` (non-blocking), `ConcurrentSkipListMap` and `ConcurrentSkipListSet` (sorted, concurrent versions of TreeMap and TreeSet), and `LinkedBlockingDeque`. The exam usually asks which collection fits a scenario and what happens when you modify during iteration."
  ],
  "terms": [
   [
    "ConcurrentHashMap",
    "A thread-safe map allowing concurrent reads and writes, with weakly consistent iterators and no null keys or values."
   ],
   [
    "CopyOnWriteArrayList",
    "A thread-safe list that copies its array on each write; iterators use a snapshot and never throw ConcurrentModificationException."
   ],
   [
    "BlockingQueue",
    "A queue whose put and take methods wait for space or elements, used for producer-consumer handoff."
   ],
   [
    "Weakly consistent iterator",
    "An iterator that tolerates concurrent modification without throwing and may or may not reflect changes made after it was created."
   ]
  ],
  "example": "A log shipper has several reader threads that put parsed lines on an ArrayBlockingQueue of capacity 10,000 and one sender thread that takes them in batches. When the network slows, the full queue makes readers wait on put instead of running out of memory.",
  "tip": "Modifying an ArrayList while iterating it throws ConcurrentModificationException; a CopyOnWriteArrayList does not, and the loop sees the old snapshot. ConcurrentHashMap rejects null keys and values. put/take block, offer/poll do not.",
  "check": [
   [
    "Which BlockingQueue method waits until an element is available?",
    "take() (or poll with a timeout for a limited wait)."
   ],
   [
    "What happens with map.put(\"k\", null) on a ConcurrentHashMap?",
    "It throws NullPointerException; null values are not allowed."
   ],
   [
    "Why is CopyOnWriteArrayList a poor choice for a list updated thousands of times per second?",
    "Every write copies the entire array, which is expensive when writes are frequent."
   ]
  ]
 },
 {
  "t": "Deadlock, starvation and livelock",
  "body": [
   "These three are liveness problems: the program does not crash, but some or all threads stop making useful progress. The exam expects you to identify each from a description or code sample and to know how to prevent it.",
   "Deadlock happens when two or more threads each hold a lock the other needs, and each waits forever for the other to release it. The classic case: thread 1 locks A then tries to lock B, while thread 2 locks B then tries to lock A. Both are stuck in the BLOCKED state (or WAITING, with explicit locks), and nothing will ever change. Four conditions are all required: mutual exclusion, holding a resource while waiting for another, no forced release, and a circular wait.",
   "```java\n// Thread 1                     // Thread 2\nsynchronized (a) {               synchronized (b) {\n    synchronized (b) { ... }         synchronized (a) { ... }\n}                                }\n// Fix: both threads acquire a first, then b.\n```",
   "To prevent deadlock, break one condition. The most common fix is a consistent lock order: every thread acquires locks in the same global order, for example by account ID, so a circular wait cannot form. Other techniques are holding one lock at a time where possible, keeping synchronized regions small, and using `tryLock` with a timeout so a thread that cannot get the second lock releases the first and retries. To diagnose a live deadlock, take a thread dump, for example with the `jstack` tool or `jcmd <pid> Thread.print`; the JVM reports deadlocked threads and the locks they are waiting on.",
   "Starvation happens when a thread is ready to run but rarely or never gets the resource it needs because others keep taking it. Examples include a thread that always loses when competing for an unfair lock, a low-priority thread that other threads keep crowding out, or one thread holding a lock for a very long time. The fix is fairness: fair locks such as `new ReentrantLock(true)`, shorter critical sections and bounded work queues.",
   "Livelock happens when threads are not blocked but keep reacting to each other so that none progresses, like two people in a corridor who both step aside in the same direction repeatedly. In code, two threads that each detect a conflict, back off, release and retry at the same moment can repeat forever while using CPU. Thread states show RUNNABLE, which is what distinguishes livelock from deadlock. Adding randomized backoff, or making one side yield by priority, breaks the symmetry.",
   "A quick way to remember: deadlock means everyone waits and no one moves; livelock means everyone moves but no one gets anywhere; starvation means some threads get the resource and others never do."
  ],
  "terms": [
   [
    "Deadlock",
    "Two or more threads each waiting forever for a lock held by another, forming a cycle."
   ],
   [
    "Starvation",
    "A thread is perpetually denied access to a resource it needs because other threads keep getting it."
   ],
   [
    "Livelock",
    "Threads stay active, repeatedly responding to one another, but make no progress."
   ],
   [
    "Lock ordering",
    "A prevention technique where all threads acquire multiple locks in the same global order."
   ],
   [
    "Thread dump",
    "A snapshot of every thread's state and stack, used to find deadlocks and blocked threads."
   ]
  ],
  "example": "A banking service occasionally freezes during simultaneous transfers between the same two accounts. A thread dump shows two threads each holding one account's lock and waiting for the other. Locking accounts in order of account number fixes it.",
  "tip": "Deadlocked threads are BLOCKED or WAITING; livelocked threads are RUNNABLE and busy. The standard deadlock fix in answer choices is acquiring locks in a consistent order.",
  "check": [
   [
    "Two threads repeatedly release and retry a lock in response to each other, never finishing, while CPU usage stays high. Which problem is this?",
    "Livelock."
   ],
   [
    "What is the simplest way to prevent the lock A / lock B deadlock?",
    "Make every thread acquire the locks in the same order."
   ],
   [
    "What tool output helps confirm a deadlock in a running JVM?",
    "A thread dump, for example from jstack or jcmd Thread.print, which reports deadlocked threads."
   ]
  ]
 },
 {
  "t": "Scoped values (Java 25): ScopedValue.where(...).run(...) as an alternative to ThreadLocal",
  "body": [
   "Applications often need to pass contextual data, such as the current user or a request ID, down through many method calls without adding a parameter to every method. The traditional tool is `ThreadLocal`, a variable with a separate value per thread. It has drawbacks: any code can call `set` at any time, so data flow is hard to follow; values live until explicitly removed, which leaks data and memory in thread pools; and child threads that inherit values must copy them. With huge numbers of virtual threads these costs grow.",
   "Scoped values, final in Java 25 in `java.lang.ScopedValue`, solve the same problem differently. A scoped value is bound to a value for the duration of a call, the dynamic scope, and is automatically unbound when that call returns. Within the scope, any method called directly or indirectly can read it. Outside the scope it has no value. There is no `set` method, so the binding is effectively immutable for the whole call.",
   "```java\nstatic final ScopedValue<String> USER = ScopedValue.newInstance();\n\nvoid handle(Request req) {\n    ScopedValue.where(USER, req.user()).run(() -> service());\n    // here USER is no longer bound\n}\nvoid service() { audit(); }\nvoid audit() {\n    String who = USER.isBound() ? USER.get() : \"anonymous\";\n    System.out.println(\"action by \" + who);\n}\n```",
   "You create a key with `ScopedValue.newInstance()`, usually as a `static final` field. `ScopedValue.where(key, value)` returns a carrier, and `run(Runnable)` executes code with the binding in place; `call(...)` does the same for code that returns a result. Several bindings can be chained: `where(USER, u).where(REQ_ID, id).run(...)`. Inside, `key.get()` returns the value, `isBound()` checks whether there is one, and `orElse(other)` gives a fallback. Calling `get()` when the value is not bound throws `NoSuchElementException`.",
   "Although a binding cannot be changed, a nested call can rebind the same key with its own `where(...).run(...)`. Inside the nested scope the new value is visible; when it returns, the outer value is visible again. This gives a clear, one-way flow of data from caller to callee, which is easier to reason about than ThreadLocal's arbitrary set calls.",
   "Because bindings end when the scope ends, there is nothing to clean up and no risk of one request's data leaking into the next task on a pooled thread. Scoped values are also designed to be cheap to read and to be shared efficiently with child threads created through structured concurrency. Choose ThreadLocal when code truly needs a mutable per-thread cache; choose scoped values to pass read-only context through a bounded piece of work."
  ],
  "terms": [
   [
    "ScopedValue",
    "A value bound for the duration of a call and readable by all code in that call's dynamic scope, then automatically unbound."
   ],
   [
    "ScopedValue.where",
    "Creates a binding of a scoped value key to a value, followed by run or call to execute code with it."
   ],
   [
    "Dynamic scope",
    "The set of code executed during a call, including methods called indirectly, where a binding is visible."
   ],
   [
    "ThreadLocal",
    "A variable with a separate mutable value per thread that persists until removed."
   ],
   [
    "Rebinding",
    "Binding an already bound scoped value to a new value in a nested where(...).run(...) call."
   ]
  ],
  "example": "A web framework binds the authenticated user with ScopedValue.where(CURRENT_USER, user).run(() -> handler.handle(request)). Deep inside, an audit logger reads CURRENT_USER.get() without the user being passed through every layer, and the binding disappears when the request finishes.",
  "tip": "Scoped values have no set method; the only way to change the visible value is to rebind in a nested scope. get() outside any binding throws NoSuchElementException, so use isBound or orElse when the value may be missing.",
  "check": [
   [
    "After ScopedValue.where(K, \"x\").run(task) returns, is K still bound in the caller?",
    "No. The binding lasts only for the duration of run."
   ],
   [
    "How do you give a scoped value a different value for part of a computation?",
    "Rebind it with a nested ScopedValue.where(K, newValue).run(...) call."
   ],
   [
    "What is one advantage of scoped values over ThreadLocal in thread pools?",
    "Bindings end automatically when the scope ends, so data cannot leak into later tasks and nothing needs removing."
   ]
  ]
 },
 {
  "t": "Path creation and operations: resolve, relativize, normalize, getFileName, getParent",
  "body": [
   "The NIO.2 API in `java.nio.file` represents a location in a file system with the `Path` interface. You create one with `Path.of(\"data\", \"logs\", \"app.log\")` or the older equivalent `Paths.get(...)`. Creating a Path does not touch the disk: the file does not need to exist, and most Path methods are pure string manipulation. An absolute path starts from a root, such as `/` on Linux or `C:\\` on Windows; a relative path is interpreted against the current working directory.",
   "A path is a sequence of name elements. `getFileName()` returns the last element as a Path (`app.log`), `getParent()` returns everything before it (`data/logs`), and `getRoot()` returns the root component or null for a relative path. `getNameCount()` counts elements, not including the root, and `getName(0)` returns the first element after the root. `subpath(begin, end)` extracts elements with the end index exclusive. `getParent()` returns null when there is no parent, such as for the single-element path `app.log`, and `getFileName()` of the root `/` is null.",
   "`resolve(other)` joins paths. `Path.of(\"/home/ana\").resolve(\"docs/a.txt\")` gives `/home/ana/docs/a.txt`. If the argument is absolute, resolve simply returns the argument: `Path.of(\"/home\").resolve(\"/etc\")` is `/etc`. `resolveSibling(other)` resolves against the parent, which is handy for renaming a file in the same directory.",
   "`relativize(other)` answers: how do I get from this path to that one? `Path.of(\"/a/b\").relativize(Path.of(\"/a/c/d\"))` is `../c/d`. Both paths must be of the same type, both absolute or both relative; mixing them throws `IllegalArgumentException`. On Windows they must also share the same root. `normalize()` removes redundant `.` elements and resolves `name/..` pairs: `Path.of(\"/a/./b/../c\").normalize()` is `/a/c`. It works on the text alone, so it does not follow symbolic links and does not check existence; a leading `..` in a relative path is kept.",
   "```java\nPath base = Path.of(\"/srv/app\");\nPath cfg  = base.resolve(\"conf/../conf/./app.properties\");\ncfg.normalize();                 // /srv/app/conf/app.properties\ncfg.getFileName();               // app.properties\ncfg.normalize().getParent();     // /srv/app/conf\nbase.relativize(Path.of(\"/srv/logs/x.log\")); // ../logs/x.log\nPath.of(\"a\").getParent();        // null\n```",
   "Two methods go beyond pure path text. `toAbsolutePath()` prepends the working directory to a relative path without checking existence. `toRealPath()` returns the canonical path with symbolic links resolved and `..` removed, and throws `IOException` if the file does not exist. Normalizing and then checking that a resolved path still starts with an expected base directory is a common defensive pattern against path traversal, where user input like `../../etc/passwd` tries to escape an upload folder."
  ],
  "terms": [
   [
    "Path",
    "An interface representing a file system location as a sequence of name elements, optionally with a root."
   ],
   [
    "resolve",
    "Joins a path to another; returns the argument unchanged if the argument is absolute."
   ],
   [
    "relativize",
    "Builds a relative path from one path to another; both must be absolute or both relative."
   ],
   [
    "normalize",
    "Removes . elements and name/.. pairs by string logic without accessing the file system."
   ],
   [
    "toRealPath",
    "Returns the actual path with links resolved, throwing IOException if the file does not exist."
   ]
  ],
  "example": "A file upload service builds the destination with uploads.resolve(userFileName).normalize() and rejects the request unless the result still startsWith(uploads). A malicious name containing ../ segments is caught before any file is written.",
  "tip": "Resolving an absolute path returns it unchanged, relativize throws IllegalArgumentException when mixing absolute and relative paths, and normalize never checks the disk. Most Path methods do not require the file to exist.",
  "check": [
   [
    "What is Path.of(\"x/y\").resolve(\"/z\")?",
    "/z, because resolving an absolute path returns the argument."
   ],
   [
    "What is Path.of(\"/a/b/c\").relativize(Path.of(\"/a\"))?",
    "../.."
   ],
   [
    "What does Path.of(\"report.txt\").getParent() return?",
    "null, because a single-element relative path has no parent."
   ]
  ]
 },
 {
  "t": "Files methods: exists, createDirectory vs createDirectories, copy, move, delete",
  "body": [
   "Where Path describes a location, the `Files` class contains static methods that act on the file system. Most throw the checked `IOException` or a specific subclass, and the exam often asks which exception occurs. `Files.exists(path)` and `Files.notExists(path)` test existence; both can return false if the program cannot determine the answer, for example because of permissions. `isDirectory`, `isRegularFile`, `isReadable`, `size` and `isSameFile` are other common checks.",
   "`Files.createDirectory(path)` creates exactly one directory. It throws `FileAlreadyExistsException` if something already exists at that path, and `NoSuchFileException` if the parent directory is missing. `Files.createDirectories(path)` creates the directory together with any missing parents, like `mkdir -p`, and does not throw if the directory already exists. `Files.createFile` creates an empty file and throws FileAlreadyExistsException if it exists.",
   "`Files.copy(source, target)` copies a file. By default it fails with `FileAlreadyExistsException` if the target exists; pass `StandardCopyOption.REPLACE_EXISTING` to overwrite. Copying a directory creates an empty directory at the target: the contents are not copied, so copying a tree requires walking it. Overloads copy from an InputStream to a Path, or from a Path to an OutputStream. `COPY_ATTRIBUTES` preserves timestamps where supported.",
   "`Files.move(source, target)` moves or renames. It also throws FileAlreadyExistsException unless REPLACE_EXISTING is given. `StandardCopyOption.ATOMIC_MOVE` asks for an all-or-nothing move and throws `AtomicMoveNotSupportedException` if the file system cannot do it. Renaming within the same directory is a move to a new name, and moving an empty directory is allowed; moving a non-empty directory may require copying across file systems, which move does not do for you.",
   "```java\nPath dir = Path.of(\"out/reports/2026\");\nFiles.createDirectories(dir);                 // creates out, reports and 2026 as needed\nPath src = Path.of(\"draft.txt\");\nFiles.copy(src, dir.resolve(\"final.txt\"), StandardCopyOption.REPLACE_EXISTING);\nFiles.move(src, Path.of(\"archive/draft.txt\")); // NoSuchFileException if archive is missing\nFiles.delete(Path.of(\"tmp.txt\"));        // NoSuchFileException if absent\nboolean gone = Files.deleteIfExists(Path.of(\"tmp.txt\")); // false, no exception\n```",
   "`Files.delete(path)` throws `NoSuchFileException` if the path does not exist and `DirectoryNotEmptyException` if it is a directory that still has entries. `Files.deleteIfExists(path)` returns a boolean instead of throwing when the file is missing, but still throws for a non-empty directory. By default, delete removes a symbolic link itself rather than its target, and exists follows links unless you pass `LinkOption.NOFOLLOW_LINKS`.",
   "Checking `exists` and then acting is a race if another process can change the file in between. Where possible, just attempt the operation and handle the specific exception; `createFile` and `CREATE_NEW` fail safely when a file already exists, which is also the defensive choice for temporary or lock files."
  ],
  "terms": [
   [
    "Files.createDirectories",
    "Creates a directory and all missing parents, without failing if the directory already exists."
   ],
   [
    "FileAlreadyExistsException",
    "Thrown when an operation would create or overwrite a path that already exists without permission to replace it."
   ],
   [
    "REPLACE_EXISTING",
    "A StandardCopyOption that lets copy or move overwrite an existing target."
   ],
   [
    "ATOMIC_MOVE",
    "A move option requesting an all-or-nothing move, failing if the file system cannot guarantee it."
   ],
   [
    "DirectoryNotEmptyException",
    "Thrown when trying to delete a directory that still contains entries."
   ]
  ],
  "example": "A nightly job writes to reports/2026/09 using Files.createDirectories so the first run of each month creates the folders, writes to a temporary file, and then uses Files.move with ATOMIC_MOVE and REPLACE_EXISTING so readers never see a half-written report.",
  "tip": "createDirectory fails if the directory exists or the parent is missing; createDirectories handles both. copy and move fail on an existing target unless REPLACE_EXISTING is given. delete throws for a missing file; deleteIfExists returns false.",
  "check": [
   [
    "What happens with Files.createDirectory(Path.of(\"a/b\")) when a does not exist?",
    "It throws NoSuchFileException because the parent is missing; createDirectories would create both."
   ],
   [
    "Does Files.copy on a directory copy its files?",
    "No. It creates an empty directory at the target; the contents are not copied."
   ],
   [
    "What does Files.delete throw for a directory with files in it?",
    "DirectoryNotEmptyException."
   ]
  ]
 },
 {
  "t": "Reading and writing text with Files.readAllLines, Files.lines, Files.writeString",
  "body": [
   "The `Files` class offers convenient one-call methods for text. They use UTF-8 by default unless you pass a `Charset`. Choosing the right one depends mostly on file size and whether you need all the data at once.",
   "`Files.readAllLines(path)` reads the whole file and returns a `List<String>`, one element per line with the line terminators removed. `Files.readString(path)` returns the whole file as one String. Both are simple and they open and close the file themselves, but they load everything into memory, so they suit small and medium files. If the bytes are not valid in the charset, reading fails with a `MalformedInputException`, a kind of IOException.",
   "`Files.lines(path)` returns a `Stream<String>` that reads lines lazily as the stream is consumed. That makes it suitable for very large files, and it combines naturally with stream operations: `filter`, `map`, `limit` and so on. Because the stream holds an open file handle, you must close it, normally with try-with-resources. An I/O error during consumption surfaces as an `UncheckedIOException`, since stream lambdas cannot throw checked exceptions. `Files.newBufferedReader(path)` is the non-stream alternative for line-by-line reading.",
   "```java\nPath log = Path.of(\"app.log\");\nList<String> all = Files.readAllLines(log);          // whole file in memory\ntry (Stream<String> lines = Files.lines(log)) {      // lazy, must be closed\n    long errors = lines.filter(l -> l.contains(\"ERROR\")).count();\n}\nFiles.writeString(Path.of(\"out.txt\"), \"first line\\n\");\nFiles.writeString(Path.of(\"out.txt\"), \"second line\\n\", StandardOpenOption.APPEND);\nFiles.write(Path.of(\"list.txt\"), List.of(\"a\", \"b\"));  // one element per line\n```",
   "`Files.writeString(path, text)` writes a CharSequence. With no options it uses CREATE, TRUNCATE_EXISTING and WRITE: it creates the file if missing and replaces any existing content. `Files.write(path, lines)` writes an Iterable of strings, adding a line separator after each, and `Files.write(path, bytes)` writes a byte array. `Files.newBufferedWriter` gives a writer for incremental output.",
   "Open options change the behavior, and specifying any option replaces the defaults. `StandardOpenOption.APPEND` adds to the end instead of truncating. If you pass only APPEND and the file does not exist, you get `NoSuchFileException`, so combine it with CREATE when the file may be missing. `CREATE_NEW` fails with FileAlreadyExistsException if the file exists, which is useful when you must not overwrite. Remember the path's parent directory must already exist; none of these methods create directories.",
   "For the exam, focus on return types (List versus Stream versus String), the need to close `Files.lines`, and the default truncate behavior of the write methods."
  ],
  "terms": [
   [
    "Files.readAllLines",
    "Reads an entire file into a List<String>, one element per line, and closes the file."
   ],
   [
    "Files.lines",
    "Returns a lazily populated Stream<String> of the file's lines that must be closed after use."
   ],
   [
    "Files.writeString",
    "Writes a CharSequence to a file, by default creating it or truncating existing content."
   ],
   [
    "StandardOpenOption.APPEND",
    "An open option that writes at the end of an existing file instead of replacing its content."
   ],
   [
    "UncheckedIOException",
    "An unchecked wrapper for an IOException, used when I/O fails inside stream processing."
   ]
  ],
  "example": "A support engineer needs to count failed logins in a 20 GB authentication log. Files.readAllLines would exhaust memory, so they use try (Stream<String> s = Files.lines(log)) { s.filter(...).count(); }, which reads one line at a time and closes the file afterwards.",
  "tip": "readAllLines returns a List and closes the file; lines returns a Stream that you must close. writeString without options truncates existing content, and APPEND alone fails if the file is missing.",
  "check": [
   [
    "Which method is appropriate for a file too large to fit in memory?",
    "Files.lines (or a BufferedReader), which reads lazily line by line."
   ],
   [
    "What happens if you call Files.writeString(path, \"x\") on a file that already has content?",
    "The existing content is replaced, because the default options include TRUNCATE_EXISTING."
   ],
   [
    "Why should Files.lines be used in try-with-resources?",
    "The returned stream keeps the file open until the stream is closed."
   ]
  ]
 },
 {
  "t": "Walking file trees: Files.list vs Files.walk vs Files.find",
  "body": [
   "Three `Files` methods return a `Stream<Path>` describing directory contents, and the difference between them is a common exam question. All three are lazy, all three hold open directory handles, and all three should be used in try-with-resources.",
   "`Files.list(dir)` returns the entries directly inside one directory: files and subdirectories, but not the contents of those subdirectories. It is not recursive, and it does not include the directory itself. It throws `NotDirectoryException` if the path is not a directory. Think of it as `ls`.",
   "`Files.walk(start)` traverses the whole tree depth-first, starting with `start` itself and descending into every subdirectory. `Files.walk(start, maxDepth)` limits the depth: a maxDepth of 0 gives only the start path, 1 gives the start plus its direct children, and so on. So `Files.walk(dir, 1)` is like `Files.list(dir)` plus `dir` itself. By default walk does not follow symbolic links; passing `FileVisitOption.FOLLOW_LINKS` makes it follow them, and a link cycle then causes a `FileSystemLoopException` wrapped in an UncheckedIOException.",
   "`Files.find(start, maxDepth, matcher)` also walks the tree but filters as it goes. The matcher is a `BiPredicate<Path, BasicFileAttributes>`, which gives you the file's attributes, such as size, modification time and whether it is a directory, without an extra system call per file. Unlike walk, the maxDepth parameter is required. Using find is usually more efficient than walk followed by a filter that calls `Files.size` or `Files.isDirectory` on every path.",
   "```java\nPath root = Path.of(\"project\");\ntry (Stream<Path> s = Files.list(root)) {\n    s.forEach(System.out::println);               // direct children only\n}\ntry (Stream<Path> s = Files.walk(root)) {\n    long javaFiles = s.filter(p -> p.toString().endsWith(\".java\")).count();\n}\ntry (Stream<Path> s = Files.find(root, 10,\n        (p, attr) -> attr.isRegularFile() && attr.size() > 1_000_000)) {\n    s.forEach(p -> System.out.println(\"large: \" + p));\n}\n```",
   "Errors that happen while the stream is being consumed, such as a subdirectory you are not permitted to read, are thrown as `UncheckedIOException`. For more control, including actions before and after visiting each directory and the ability to skip subtrees, the older `Files.walkFileTree(start, visitor)` takes a `FileVisitor`, usually a subclass of `SimpleFileVisitor` overriding `visitFile` and `postVisitDirectory`. It is the standard way to delete a directory tree, because each directory must be emptied before it can be deleted."
  ],
  "terms": [
   [
    "Files.list",
    "Returns a lazy Stream<Path> of the direct entries of one directory, without recursion."
   ],
   [
    "Files.walk",
    "Returns a lazy depth-first Stream<Path> of a directory tree, including the start path, optionally limited by maxDepth."
   ],
   [
    "Files.find",
    "Walks a tree to a required maxDepth and returns paths matching a BiPredicate<Path, BasicFileAttributes>."
   ],
   [
    "BasicFileAttributes",
    "An interface exposing size, timestamps and file type information read with the directory entry."
   ],
   [
    "FOLLOW_LINKS",
    "A FileVisitOption that makes walk and find follow symbolic links."
   ]
  ],
  "example": "A cleanup script uses Files.find(logDir, 3, (p, a) -> a.isRegularFile() && a.lastModifiedTime().toInstant().isBefore(cutoff)) to find old log files without calling Files.getLastModifiedTime separately for each file, then deletes each match.",
  "tip": "list is one level and excludes the start directory; walk is recursive and includes the start directory; find requires maxDepth and a BiPredicate taking attributes. All return streams that must be closed.",
  "check": [
   [
    "Does Files.walk(dir) include dir itself in the stream?",
    "Yes. The start path is the first element."
   ],
   [
    "What does Files.walk(dir, 0) return?",
    "A stream containing only dir."
   ],
   [
    "What are the parameter types of the matcher passed to Files.find?",
    "Path and BasicFileAttributes, in a BiPredicate."
   ]
  ]
 },
 {
  "t": "Byte and character streams, BufferedReader and BufferedWriter",
  "body": [
   "The original `java.io` package, still widely used, organizes I/O into streams (not to be confused with the Stream API). Byte streams read and write raw 8-bit bytes and descend from the abstract classes `InputStream` and `OutputStream`. Character streams read and write text as chars and descend from `Reader` and `Writer`. The class name tells you which it is: names ending in Stream handle bytes, names ending in Reader or Writer handle characters.",
   "Use byte streams for binary data such as images or serialized objects: `FileInputStream`, `FileOutputStream`, `BufferedInputStream`, `ObjectInputStream`. Use character streams for text, because they decode bytes into characters using a charset: `FileReader`, `FileWriter`, `BufferedReader`, `PrintWriter`. `InputStreamReader` and `OutputStreamWriter` are the bridges that wrap a byte stream and apply a charset, for example `new InputStreamReader(System.in, StandardCharsets.UTF_8)`. Since Java 18 the default charset is UTF-8.",
   "Streams follow the decorator pattern: low-level streams connect to a source such as a file, and high-level streams wrap another stream to add features. Buffering is the most important feature. Reading one byte or char at a time directly from a file makes a system call each time; a buffered stream reads a large block into memory and serves reads from it. Closing the outermost stream closes the ones it wraps.",
   "```java\ntry (var in = new BufferedReader(new FileReader(\"in.txt\"));\n     var out = new BufferedWriter(new FileWriter(\"out.txt\"))) {\n    String line;\n    while ((line = in.readLine()) != null) {   // null means end of file\n        out.write(line.toUpperCase());\n        out.newLine();                          // platform line separator\n    }\n}   // closing flushes out, then both files are closed\n```",
   "Key methods and return values: `InputStream.read()` returns the next byte as an int from 0 to 255, or -1 at end of stream. `Reader.read()` returns a char as an int, or -1 at the end. `read(byte[])` returns how many bytes were read, or -1. `BufferedReader.readLine()` returns a line without its terminator, or null at end of file. `BufferedWriter.newLine()` writes a line separator, and `flush()` forces buffered data out. Forgetting to flush or close a writer can leave output missing from the file.",
   "`PrintWriter` and `PrintStream` (the type of `System.out`) add `print`, `println`, `printf` and `format`. They never throw IOException from these methods; instead they set an internal error flag you can check with `checkError()`. `new FileWriter(\"log.txt\", true)` opens in append mode. `transferTo(OutputStream)` copies all remaining bytes from an InputStream in one call.",
   "The `Files` class provides modern factories for the same objects, `Files.newBufferedReader(path)` and `Files.newBufferedWriter(path, options)`, which default to UTF-8 and accept the same open options as the other Files methods."
  ],
  "terms": [
   [
    "Byte stream",
    "An InputStream or OutputStream that transfers raw bytes, suited to binary data."
   ],
   [
    "Character stream",
    "A Reader or Writer that transfers characters, decoding and encoding bytes with a charset."
   ],
   [
    "InputStreamReader",
    "A bridge that wraps a byte InputStream and decodes it into characters using a charset."
   ],
   [
    "BufferedReader",
    "A Reader that buffers input and provides readLine(), which returns null at end of file."
   ],
   [
    "flush",
    "Forces any buffered output to be written to the underlying destination."
   ]
  ],
  "example": "A CSV export writes 100,000 rows with a BufferedWriter wrapped around a FileWriter, calling newLine() after each row. Without buffering, each small write would hit the disk separately and the export took minutes; with it, the export finishes in seconds.",
  "tip": "End-of-data signals differ: read() returns -1, readLine() returns null. Classes ending in Stream handle bytes; Reader and Writer handle characters. Closing the outer wrapper closes the inner stream.",
  "check": [
   [
    "What does BufferedReader.readLine() return at end of file?",
    "null."
   ],
   [
    "Which class converts a byte InputStream into a character Reader?",
    "InputStreamReader."
   ],
   [
    "Why might output be missing from a file written with BufferedWriter?",
    "The writer was not flushed or closed, so buffered data was never written."
   ]
  ]
 },
 {
  "t": "Console and standard input/output",
  "body": [
   "Every Java program has three standard streams, available as static fields of `System`. `System.in` is an `InputStream` connected to standard input, usually the keyboard. `System.out` is a `PrintStream` for normal output and `System.err` is a `PrintStream` for error messages. Keeping errors on `System.err` lets users redirect normal output to a file while still seeing errors on screen. `System.setOut` and `System.setIn` can reassign these streams, which is useful in tests.",
   "`System.out` offers `print`, `println`, and formatted output with `printf(format, args)` or its twin `format`. Common specifiers are `%s` for strings, `%d` for integers, `%f` for floating point (`%.2f` for two decimals), `%n` for a platform line separator, and a width such as `%5d` for right-aligned numbers. A mismatched specifier, such as `%d` with a String argument, throws an `IllegalFormatException` at run time.",
   "Because `System.in` is a raw byte stream, you usually wrap it. `new BufferedReader(new InputStreamReader(System.in))` gives `readLine()`, returning null when input ends. `java.util.Scanner` parses tokens: `nextInt()`, `nextDouble()`, `next()` for a word and `nextLine()` for the rest of the line. A classic Scanner trap is calling `nextLine()` after `nextInt()`: nextInt leaves the newline in the input, so the following nextLine returns an empty string. `IO.readln()` in `java.lang.IO` is a simpler option for small programs.",
   "```java\nConsole c = System.console();\nif (c == null) {\n    System.err.println(\"No console available\");\n    return;\n}\nString user = c.readLine(\"User: \");\nchar[] pw = c.readPassword(\"Password: \");   // not echoed\ntry {\n    c.printf(\"Hello %s%n\", user);\n} finally {\n    java.util.Arrays.fill(pw, ' ');           // wipe the password from memory\n}\n```",
   "`System.console()` returns a `java.io.Console`, or null when no console is available, for example in some IDEs or when the program runs as a background service; always check for null. Console provides `readLine()` and `readLine(format, args)` for prompted input, `readPassword()` which disables echo and returns a `char[]`, `printf` and `format`, `flush()`, and `reader()` and `writer()` to get a Reader and PrintWriter bound to the console.",
   "Why a char array for passwords? Strings are immutable and may stay in memory until garbage collected, and they are easy to log by accident. A char array can be overwritten as soon as you are done, which is a small but real defensive measure. Never print or log a password, even while debugging.",
   "For the exam, remember the types (System.in is InputStream, System.out and err are PrintStream), that `System.console()` may return null, and that `readPassword` returns char[] rather than String."
  ],
  "terms": [
   [
    "System.in",
    "The standard input stream, an InputStream usually connected to the keyboard."
   ],
   [
    "System.err",
    "The standard error stream, a PrintStream intended for error and diagnostic messages."
   ],
   [
    "Console",
    "A class obtained from System.console() for interactive text input and output, which may be null when unavailable."
   ],
   [
    "readPassword",
    "A Console method that reads input without echoing it and returns a char array."
   ],
   [
    "printf",
    "A method that writes formatted output using specifiers such as %s, %d, %.2f and %n."
   ]
  ],
  "example": "A command-line admin tool uses System.console().readPassword(\"Password: \") so the password never appears on screen or in the terminal history, wipes the char array after authenticating, and prints failures to System.err so scripts that capture stdout are not polluted.",
  "tip": "System.console() can return null, so exam code that calls a method on it without checking may throw NullPointerException. readPassword returns char[], and System.out and System.err are PrintStreams.",
  "check": [
   [
    "What type does Console.readPassword() return and why?",
    "char[], so the caller can overwrite the password in memory after use, which is not possible with an immutable String."
   ],
   [
    "After scanner.nextInt() reads 5 from the line \"5\", what does scanner.nextLine() return?",
    "An empty string, because nextInt left the line terminator unread."
   ]
  ]
 },
 {
  "t": "Serialization: Serializable, transient fields, serialVersionUID",
  "body": [
   "Serialization converts an object graph into a stream of bytes so it can be saved to a file or sent over a network; deserialization rebuilds the objects from those bytes. In Java, you write with `ObjectOutputStream.writeObject(obj)` and read with `ObjectInputStream.readObject()`, which returns Object (so you cast) and can throw `ClassNotFoundException` as well as IOException.",
   "A class opts in by implementing `java.io.Serializable`, a marker interface with no methods. Every non-transient instance field must itself be serializable, meaning a primitive or a type that implements Serializable, or writing fails at run time with `NotSerializableException`. Many standard types are serializable, such as String, the wrapper classes and the common collections. Records can be serializable too.",
   "Fields marked `transient` are skipped. Use it for data that should not be persisted, such as a password, a cached value that can be recomputed, or a non-serializable resource like a database connection. Static fields are not serialized either, because they belong to the class rather than the object. After deserialization, a transient field has its default value: null, 0 or false.",
   "Deserialization does not call the constructor of a Serializable class, and its field initializers and instance initializer blocks do not run. Instead, the JVM calls the no-argument constructor of the first superclass that is not Serializable, often Object, and fills in the fields from the stream. This is why a transient field declared as `transient int count = 10;` comes back as 0, not 10. Records are the exception: they are rebuilt through their canonical constructor, so its validation runs.",
   "```java\nclass User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String name;\n    private transient String password;   // not written\n    private transient int loginCount = 5; // restored as 0\n}\n\ntry (var out = new ObjectOutputStream(new FileOutputStream(\"u.ser\"))) {\n    out.writeObject(new User());\n}\n```",
   "`serialVersionUID` is a version number for the class, declared as `private static final long serialVersionUID`. When reading, the JVM compares the value in the stream with the value in the current class; if they differ it throws `InvalidClassException`. If you do not declare one, the JVM computes it from details of the class structure, so even a harmless change such as adding a method can alter it and break compatibility with saved data. Declaring it explicitly lets you control when versions are considered compatible.",
   "Security matters here. Deserializing data from an untrusted source is dangerous, because the process can instantiate classes and run their methods before your code sees the object, and this has been the root of serious vulnerabilities. Defensive practice is to avoid Java serialization for untrusted input, prefer formats like JSON with explicit mapping, and when it cannot be avoided, restrict which classes may be deserialized with an `ObjectInputFilter`."
  ],
  "terms": [
   [
    "Serializable",
    "A marker interface that allows instances of a class to be written and read by object streams."
   ],
   [
    "transient",
    "A field modifier that excludes the field from serialization; it is restored with its default value."
   ],
   [
    "serialVersionUID",
    "A private static final long version identifier checked during deserialization to detect incompatible class versions."
   ],
   [
    "NotSerializableException",
    "Thrown at run time when writing an object that has a non-transient field whose type is not serializable."
   ],
   [
    "ObjectInputFilter",
    "A mechanism to restrict which classes and how much data may be deserialized, used to defend against unsafe input."
   ]
  ],
  "example": "A desktop app saves session state with ObjectOutputStream. After an update that added a method, users' saved sessions stopped loading with InvalidClassException. Declaring an explicit serialVersionUID in the next release keeps old saves loadable as long as field changes are compatible.",
  "tip": "On deserialization, transient and static fields are not read from the stream, field initializers do not run, and the Serializable class's constructors are not called; only the first non-serializable superclass's no-arg constructor runs.",
  "check": [
   [
    "A transient String field is set to \"secret\" before serialization. What is it after deserialization?",
    "null, the default value for a reference."
   ],
   [
    "What exception occurs when the stream's serialVersionUID does not match the class?",
    "InvalidClassException."
   ],
   [
    "What happens if a serializable class has a non-transient field of a type that is not Serializable?",
    "Writing the object throws NotSerializableException at run time."
   ]
  ]
 },
 {
  "t": "Closing resources and stream-returning Files methods",
  "body": [
   "Files, sockets, database connections and many streams hold operating system resources that the garbage collector does not release promptly. If you forget to close them you can run out of file handles, leave files locked on Windows, or lose buffered output. The try-with-resources statement is the standard way to guarantee closing.",
   "Any object that implements `AutoCloseable` can be declared in the parentheses after `try`. When the block finishes, normally or by exception, its `close()` method is called automatically. `Closeable`, used by I/O classes, extends AutoCloseable and narrows `close()` to throw IOException; AutoCloseable's `close()` throws Exception, so the compiler makes you handle whatever the declared close method can throw. A resource variable is implicitly final. Since Java 9 you can also list an existing variable that is final or effectively final: `try (reader) { ... }`.",
   "Order is precise. Resources are closed in the reverse order of declaration, and they are closed before any `catch` or `finally` block runs. If the try block throws and then `close()` also throws, the close exception does not replace the original. It is attached as a suppressed exception, retrievable with `getSuppressed()`, and the original exception propagates. If only close throws, that exception propagates.",
   "```java\ntry (var a = new Res(\"A\"); var b = new Res(\"B\")) {\n    System.out.println(\"body\");\n} finally {\n    System.out.println(\"finally\");\n}\n// body, close B, close A, finally\n```",
   "The Stream API interacts with this. `BaseStream`, the parent of Stream, implements AutoCloseable, but most streams, such as those from collections, hold no resources and need no closing. The exception is streams returned by I/O methods: `Files.lines`, `Files.list`, `Files.walk` and `Files.find`. Their Javadoc says to use try-with-resources, because the stream keeps a file or directory handle open until it is closed, and a terminal operation does not close it for you.",
   "```java\ntry (Stream<Path> entries = Files.list(Path.of(\"logs\"))) {\n    entries.filter(p -> p.toString().endsWith(\".gz\")).forEach(System.out::println);\n}\n// By contrast, readAllLines, readString, write and writeString open and close internally.\n```",
   "Methods that return a Reader, Writer or stream object, like `Files.newBufferedReader`, `Files.newInputStream` and `Files.newBufferedWriter`, likewise hand responsibility for closing to you. Methods that do the whole job in one call, like `readAllLines`, `readString`, `write`, `writeString`, `copy` and `size`, close whatever they open. When wrapping streams, closing the outermost wrapper closes the inner ones, so declare the wrapper as the resource. A stream can register cleanup actions with `onClose(Runnable)`, which run when `close()` is called."
  ],
  "terms": [
   [
    "try-with-resources",
    "A try statement that declares AutoCloseable resources and closes them automatically in reverse order."
   ],
   [
    "AutoCloseable",
    "An interface with close() throws Exception, required for resources in try-with-resources."
   ],
   [
    "Closeable",
    "An I/O interface that extends AutoCloseable with close() throws IOException."
   ],
   [
    "Suppressed exception",
    "An exception thrown while closing a resource after the body already threw, attached to the original via addSuppressed."
   ],
   [
    "Resource-backed stream",
    "A Stream such as those from Files.lines, list, walk or find that holds an open handle and must be closed."
   ]
  ],
  "example": "A monitoring service lists a directory every few seconds with Files.list but never closes the stream. After a day it fails with a too-many-open-files error. Wrapping the call in try-with-resources releases each directory handle as soon as the listing finishes.",
  "tip": "Resources close in reverse order, before catch and finally. An exception from close after a body exception is suppressed, not thrown. Files.lines, list, walk and find return streams you must close; readAllLines and writeString do not need it.",
  "check": [
   [
    "In try (var x = ...; var y = ...), which resource is closed first?",
    "y, because resources are closed in the reverse order they were declared."
   ],
   [
    "The try body throws IOException and close() throws IllegalStateException. Which propagates?",
    "The IOException; the IllegalStateException is added as a suppressed exception."
   ],
   [
    "Does calling count() on the stream from Files.lines close the file?",
    "No. A terminal operation does not close the stream; use try-with-resources."
   ]
  ]
 },
 {
  "t": "Locale objects: language, country, Locale.of and Locale.getDefault",
  "body": [
   "Localization means adapting a program to a user's language and region: translated text, and numbers, currencies, dates and times shown the way that user expects. Java represents a language and region choice with `java.util.Locale`. The locale-sensitive classes, such as NumberFormat, DateTimeFormatter and ResourceBundle, take a Locale and adjust their output accordingly.",
   "A Locale is built from a language code, an optional country (region) code and an optional variant. Language codes are lowercase ISO 639 codes such as `en`, `fr` and `de`. Country codes are uppercase ISO 3166 codes such as `US`, `CA` and `DE`. The string form joins them with an underscore, language first: `en_US`, `fr_CA`. A locale can be language only, like `fr`; a country without a language is technically possible (it prints as `_US`) but is rarely useful. The standard way to write a locale as a language tag, used on the web, joins them with a hyphen instead: `en-US`.",
   "`Locale.of(\"fr\", \"CA\")` creates a locale, and `Locale.of(\"fr\")` creates a language-only locale; these factory methods replaced the Locale constructors, which are now deprecated. Locale normalizes case, so `Locale.of(\"EN\", \"us\")` prints as `en_US`. Common locales are available as constants: `Locale.US`, `Locale.UK`, `Locale.FRANCE`, `Locale.GERMANY`, `Locale.CANADA_FRENCH`, and language-only ones such as `Locale.ENGLISH` and `Locale.FRENCH`. `Locale.forLanguageTag(\"pt-BR\")` parses a tag, and `new Locale.Builder().setLanguage(\"es\").setRegion(\"MX\").build()` builds one step by step.",
   "```java\nLocale ca = Locale.of(\"fr\", \"CA\");\nSystem.out.println(ca);                 // fr_CA\nSystem.out.println(ca.getLanguage());   // fr\nSystem.out.println(ca.getCountry());    // CA\nSystem.out.println(ca.toLanguageTag()); // fr-CA\nSystem.out.println(Locale.getDefault()); // depends on the machine, e.g. en_US\nLocale.setDefault(Locale.GERMANY);       // affects only this JVM\n```",
   "`Locale.getDefault()` returns the JVM's default locale, which is initialized from the operating system settings when the JVM starts. `Locale.setDefault(locale)` changes it for the running JVM only, not for the operating system. Any locale-sensitive method called without an explicit Locale uses the default. There are also category-specific defaults: `Locale.Category.DISPLAY` controls the language of user interface text, and `Locale.Category.FORMAT` controls how numbers and dates are formatted, via `Locale.getDefault(Category)` and `Locale.setDefault(Category, locale)`.",
   "Relying on the default locale is a common source of bugs: a program that parses `1.5` as a number may work on a US machine and fail on a German one, where the decimal separator is a comma. For data exchanged between systems, such as files, APIs and logs, pass an explicit locale such as `Locale.ROOT` or `Locale.US`; for text shown to a user, use the user's locale. `getDisplayName()` returns a human-readable name such as \"French (Canada)\", itself localized to the default display locale."
  ],
  "terms": [
   [
    "Locale",
    "An object identifying a language and optional country and variant, used by locale-sensitive classes."
   ],
   [
    "Language code",
    "A lowercase ISO 639 code such as en or fr that forms the first part of a locale."
   ],
   [
    "Country code",
    "An uppercase ISO 3166 code such as US or CA identifying the region of a locale."
   ],
   [
    "Locale.of",
    "The factory method for creating a Locale from a language and optional country and variant."
   ],
   [
    "Default locale",
    "The locale the JVM uses when none is given, initialized from the operating system and changeable with Locale.setDefault."
   ]
  ],
  "example": "An invoicing service formats totals with the customer's Locale taken from their profile, so a customer in Quebec sees French formatting from Locale.of(\"fr\", \"CA\"), while its CSV exports always use Locale.ROOT so the accounting system can parse the numbers regardless of the server's default locale.",
  "tip": "The string form is language_COUNTRY with lowercase language and uppercase country, language always first. Locale.setDefault changes the JVM only. Use Locale.of rather than the deprecated constructors.",
  "check": [
   [
    "What does System.out.println(Locale.of(\"de\", \"AT\")) print?",
    "de_AT."
   ],
   [
    "Does Locale.setDefault change the operating system's locale?",
    "No. It changes the default only for the running JVM."
   ],
   [
    "Can a Locale have a country without a language?",
    "Not in normal use: the language comes first and is the essential part; country and variant are optional refinements."
   ]
  ]
 },
 {
  "t": "Resource bundles: properties files, naming and lookup/fallback order",
  "body": [
   "A resource bundle keeps locale-specific data, mostly user interface text, outside your code so that translators can supply new languages without code changes. The most common form is a family of properties files that share a base name, with the locale appended: `Messages.properties` (the default), `Messages_fr.properties`, `Messages_fr_CA.properties`, `Messages_en_US.properties`. Java class bundles that extend `ListResourceBundle` are also possible and, for the same name, a class is preferred over a properties file.",
   "A properties file holds key-value pairs, one per line: `greeting=Hello` or `greeting: Hello`, where both `=` and `:` separate the key from the value and whitespace around them is ignored. Lines starting with `#` or `!` are comments, and a backslash at the end of a line continues the value on the next line. Since Java 9, properties resource bundles are read as UTF-8 by default.",
   "You load a bundle with `ResourceBundle.getBundle(\"Messages\", locale)` and read values with `getString(\"greeting\")`. `getObject`, `keySet()` and `containsKey()` are also available. If no bundle at all can be found, getBundle throws `MissingResourceException`; if a key is missing from the chosen bundle and all its parents, getString throws the same unchecked exception.",
   "The lookup order is the part the exam tests. Suppose you request `fr_CA` and the default locale is `en_US`. Java tries candidates from most specific to least: `Messages_fr_CA`, then `Messages_fr`, then the default locale's `Messages_en_US`, then `Messages_en`, and finally the base `Messages`. It picks the first one that exists. Note that the default locale is consulted before the base bundle, and only if nothing matched the requested locale.",
   "```text\ngetBundle(\"Messages\", fr_CA) with default en_US tries:\n  1. Messages_fr_CA   2. Messages_fr\n  3. Messages_en_US   4. Messages_en\n  5. Messages          (then MissingResourceException)\n\nIf Messages_fr_CA is chosen, a missing key is looked up in:\n  Messages_fr_CA -> Messages_fr -> Messages\n```",
   "Once a bundle is chosen, key lookup can also fall back, but only along that bundle's parent chain, not the default locale's. The parent of `Messages_fr_CA` is `Messages_fr`, whose parent is the base `Messages`. So a key missing from `Messages_fr_CA` is searched in `Messages_fr` and then `Messages`, never in `Messages_en_US`. This lets you put shared keys in the base file and override only what differs in each language or region.",
   "A practical design puts every key in the base bundle, in whatever language you choose as the final fallback, and adds per-language files with translated values. Values often contain placeholders such as `{0}`, which you fill with MessageFormat. For the exam, draw the list of candidate names before answering, and remember that the requested locale's candidates come before the default locale's."
  ],
  "terms": [
   [
    "Resource bundle",
    "A set of locale-specific key-value resources loaded by base name and locale with ResourceBundle.getBundle."
   ],
   [
    "Base name",
    "The common prefix of a bundle family, such as Messages, to which locale suffixes like _fr_CA are added."
   ],
   [
    "Default (base) bundle",
    "The bundle file with no locale suffix, used as the final fallback and the root of every parent chain."
   ],
   [
    "Parent chain",
    "The sequence of less specific bundles, such as fr_CA to fr to base, searched for a key missing from the chosen bundle."
   ],
   [
    "MissingResourceException",
    "An unchecked exception thrown when no bundle is found or a key is missing from the bundle and its parents."
   ]
  ],
  "example": "A booking site ships Labels.properties in English, Labels_es.properties in Spanish and Labels_es_MX.properties that overrides only a few words used differently in Mexico. A visitor with locale es_MX gets the Mexican file, and any key it lacks is found in Labels_es and then Labels.",
  "tip": "Order: requested locale (language_country, then language), then default locale (language_country, then language), then base. For missing keys, only the chosen bundle's parents are searched, never the default locale's bundles.",
  "check": [
   [
    "Requested locale is de_CH, default is en_US, and only Messages.properties and Messages_en.properties exist. Which is chosen?",
    "Messages_en. No German bundle exists, so the default locale's candidates are tried and Messages_en matches before the base."
   ],
   [
    "Messages_fr_CA is chosen and lacks the key title, which exists only in Messages_en_US and Messages. Where is it found?",
    "In Messages, the base bundle; key fallback follows the parent chain fr_CA, fr, base, not the default locale."
   ],
   [
    "Which characters can separate a key from its value in a properties file?",
    "= or :, with surrounding whitespace ignored."
   ]
  ]
 },
 {
  "t": "Formatting numbers and currency with NumberFormat",
  "body": [
   "Different regions write numbers differently. The value one thousand two hundred thirty-four and a half is written `1,234.5` in the US, `1.234,5` in Germany and with a space as the grouping separator in France. `java.text.NumberFormat` handles these rules. It is abstract; you get an instance from a factory method, passing a Locale or relying on the default.",
   "The factory methods to know are `NumberFormat.getInstance(locale)` and `getNumberInstance(locale)` for general numbers, `getIntegerInstance(locale)` which rounds to whole numbers, `getCurrencyInstance(locale)` which adds the currency symbol and the currency's usual number of decimal places, `getPercentInstance(locale)` which multiplies by 100 and adds a percent sign, and `getCompactNumberInstance` for short forms like 1K. Each returns a formatter whose `format` method returns a String.",
   "```java\ndouble v = 1234.5678;\nNumberFormat.getInstance(Locale.US).format(v);          // 1,234.568\nNumberFormat.getInstance(Locale.GERMANY).format(v);     // 1.234,568\nNumberFormat.getCurrencyInstance(Locale.US).format(v);  // $1,234.57\nNumberFormat.getPercentInstance(Locale.US).format(0.256); // 26%\nNumberFormat.getIntegerInstance(Locale.US).format(2.5); // 2 (half-even)\n```",
   "Rounding follows the formatter's settings. A general number format shows at most three fraction digits by default, currency uses the currency's standard digits (two for dollars and euros), and percent shows none. The default rounding mode is HALF_EVEN, sometimes called banker's rounding: a value exactly halfway rounds to the nearest even digit, so 2.5 becomes 2 and 3.5 becomes 4. You can adjust with `setMaximumFractionDigits`, `setMinimumFractionDigits`, `setRoundingMode(RoundingMode.HALF_UP)` and `setGroupingUsed(false)`.",
   "Parsing goes the other way: `parse(String)` returns a `Number` (a Long if the value is whole and fits, otherwise a Double) and throws the checked `ParseException` if the text does not start with a number. It parses as much of the beginning as it can and ignores the rest, so parsing `\"12abc\"` returns 12. The locale matters when parsing too: `\"1.234\"` parsed with a German format is 1234, while with a US format it is 1.234.",
   "For custom layouts, `DecimalFormat`, the usual concrete subclass, accepts a pattern. In patterns, `0` means a digit that is always shown (padding with zeros), `#` means a digit shown only if needed, `,` marks grouping and `.` the decimal separator: `new DecimalFormat(\"#,##0.00\").format(1234.5)` gives `1,234.50` in a US default locale. The actual separator characters still come from the locale.",
   "NumberFormat instances are not thread-safe, so do not share one across threads without synchronization; create one per use or per thread. For money calculations, keep amounts in `BigDecimal` and use NumberFormat only for display, because binary floating point cannot represent most decimal fractions exactly."
  ],
  "terms": [
   [
    "NumberFormat",
    "An abstract locale-sensitive class for formatting and parsing numbers, obtained through factory methods."
   ],
   [
    "getCurrencyInstance",
    "Returns a NumberFormat that formats values as currency for a locale, with its symbol and standard decimal places."
   ],
   [
    "HALF_EVEN",
    "The default rounding mode that rounds exact halves to the nearest even digit."
   ],
   [
    "ParseException",
    "A checked exception thrown when text cannot be parsed as a number or date."
   ],
   [
    "DecimalFormat",
    "A concrete NumberFormat that formats using a pattern of 0, #, comma and period symbols."
   ]
  ],
  "example": "An online store shows prices with NumberFormat.getCurrencyInstance(customerLocale), so the same BigDecimal amount appears as $1,234.50 to a US shopper and with a comma decimal separator and euro sign to a shopper in Germany, while the order is stored as a plain BigDecimal.",
  "tip": "Know which factory to use, that percent multiplies by 100, that the default rounding is HALF_EVEN, and that parse throws the checked ParseException but accepts text with trailing garbage after a valid number.",
  "check": [
   [
    "What does NumberFormat.getPercentInstance(Locale.US).format(0.5) produce?",
    "50%."
   ],
   [
    "What does NumberFormat.getInstance(Locale.US).parse(\"42 apples\") return?",
    "The number 42 (as a Long); parsing stops at the first character it cannot use."
   ],
   [
    "What does getIntegerInstance(Locale.US).format(3.5) produce?",
    "4, because HALF_EVEN rounds a half to the nearest even digit."
   ]
  ]
 },
 {
  "t": "Compact number formatting (CompactNumberFormat)",
  "body": [
   "Compact number formatting shows large numbers in a short, human-friendly form, such as `1K` for one thousand or `3 million`, the way social media counts and dashboards do. Java provides it through `java.text.CompactNumberFormat`, a subclass of NumberFormat. You normally obtain one with the factory method `NumberFormat.getCompactNumberInstance(locale, style)`.",
   "There are two styles in the `NumberFormat.Style` enum. `SHORT` uses abbreviations: in US English, 1,000 becomes `1K`, 2,000,000 becomes `2M` and 3,000,000,000 becomes `3B`. `LONG` spells the unit out: `1 thousand`, `2 million`, `3 billion`. The words and abbreviations come from the locale's data, so other locales produce their own forms and may even use different magnitudes; for example some Asian locales group by ten thousand rather than by thousand.",
   "```java\nNumberFormat s = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);\nNumberFormat l = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.LONG);\ns.format(999);        // 999\ns.format(1_000);      // 1K\ns.format(1_234_567);  // 1M\nl.format(1_234_567);  // 1 million\ns.setMaximumFractionDigits(1);\ns.format(1_234_567);  // 1.2M\n```",
   "Values below the smallest compact pattern, which is one thousand for US English, are formatted as ordinary numbers. By default a compact format shows no fraction digits and rounds using HALF_EVEN, so 1,234,567 becomes `1M`, not `1.2M`. To keep more precision call `setMaximumFractionDigits(n)`, and to change rounding call `setRoundingMode`. Because of half-even rounding, a value exactly halfway, like 1,500, formats as `2K`, while 2,500 formats as `2K` too.",
   "CompactNumberFormat also parses: with the US SHORT style, `parse(\"1K\")` returns 1000. Grouping separators are off by default and can be enabled with `setGroupingUsed(true)`, which only matters when the compact number itself is large, as in `1,000T`. Negative values keep their sign, so -2,000 formats as `-2K`. Like other formats, instances are not thread-safe.",
   "The exam typically asks you to predict output. Work through three steps: find the magnitude (thousand, million, billion), divide, then apply the fraction digits and HALF_EVEN rounding. Then choose the SHORT or LONG suffix. If the question does not change the maximum fraction digits, the result is a whole number followed by the suffix."
  ],
  "terms": [
   [
    "CompactNumberFormat",
    "A NumberFormat subclass that formats numbers in short locale-specific forms such as 1K or 1 thousand."
   ],
   [
    "NumberFormat.Style.SHORT",
    "The compact style that uses abbreviated suffixes such as K, M and B in US English."
   ],
   [
    "NumberFormat.Style.LONG",
    "The compact style that spells out the magnitude, such as thousand or million."
   ],
   [
    "getCompactNumberInstance",
    "The NumberFormat factory method that returns a compact formatter for a locale and style."
   ]
  ],
  "example": "A video platform displays view counts with NumberFormat.getCompactNumberInstance(viewerLocale, Style.SHORT) and one maximum fraction digit, so a video with 1,234,567 views shows 1.2M to US viewers while viewers in other locales see their own compact form.",
  "tip": "Without changing fraction digits, compact formats round to a whole number using HALF_EVEN, so 1,234,567 is 1M and 1,500 is 2K. Numbers under 1,000 print unchanged in US English.",
  "check": [
   [
    "What does the US SHORT compact format produce for 5_600_000 by default?",
    "6M. It shows no fraction digits by default and 5.6 rounds to 6."
   ],
   [
    "What does the US LONG compact format produce for 2_000?",
    "2 thousand."
   ],
   [
    "How do you get 5.6M instead of 6M?",
    "Call setMaximumFractionDigits(1) on the formatter before formatting."
   ]
  ]
 },
 {
  "t": "Formatting and parsing dates and times with DateTimeFormatter and locales",
  "body": [
   "`java.time.format.DateTimeFormatter` converts java.time objects such as LocalDate, LocalTime, LocalDateTime and ZonedDateTime to and from text. Unlike the old SimpleDateFormat, it is immutable and thread-safe, so a single formatter can be stored in a static final field and shared. You can call `date.format(formatter)` or `formatter.format(date)`; both give the same String.",
   "There are three ways to get a formatter. Predefined constants follow ISO-8601, such as `DateTimeFormatter.ISO_LOCAL_DATE` (2026-09-25) and `ISO_LOCAL_DATE_TIME`; the `toString()` and default `parse` of the java.time classes use these. Localized styles use `ofLocalizedDate(FormatStyle.SHORT)`, `ofLocalizedTime`, or `ofLocalizedDateTime` with SHORT, MEDIUM, LONG or FULL, and produce whatever the locale considers normal. Custom patterns use `ofPattern(\"dd MMM yyyy\")` or `ofPattern(pattern, locale)`.",
   "Pattern letters are case-sensitive and appear often in questions. `y` is year, `M` is month (M gives 9, MM gives 09, MMM gives Sep, MMMM gives September), `d` is day of month, `E` is day of week (EEE gives Fri, EEEE gives Friday), `H` is hour 0 to 23, `h` is hour 1 to 12 with `a` for AM or PM, `m` is minute and `s` is second. Lowercase `mm` means minutes and uppercase `MM` means month, a classic mistake. Text in single quotes is literal, and two single quotes produce an apostrophe. An undefined letter such as an unquoted `b` or `T` makes ofPattern throw IllegalArgumentException.",
   "```java\nLocalDateTime t = LocalDateTime.of(2026, 9, 25, 14, 5);\nDateTimeFormatter f = DateTimeFormatter.ofPattern(\"EEEE d MMMM yyyy, HH:mm\", Locale.US);\nt.format(f);                                     // Friday 25 September 2026, 14:05\nt.format(f.withLocale(Locale.FRANCE));           // vendredi 25 septembre 2026, 14:05\nLocalDate d = LocalDate.parse(\"25/09/2026\", DateTimeFormatter.ofPattern(\"dd/MM/yyyy\"));\n// LocalDate.of(2026, 9, 25).format(DateTimeFormatter.ofPattern(\"HH:mm\"));\n//   UnsupportedTemporalTypeException: a date has no hours\n```",
   "The locale determines month and day names and the layout of localized styles. `ofPattern(\"MMMM\", Locale.GERMANY)` prints September as `September`, while with `Locale.FRANCE` it prints `septembre`. `withLocale(locale)` returns a copy with a different locale, since formatters are immutable. Localized styles adapt the order too: SHORT for a US locale is month/day/year, while for many European locales it is day/month/year. LONG and FULL time styles typically include a time zone name, so formatting a LocalTime or LocalDateTime with them can throw an exception because those types carry no zone.",
   "Parsing uses the type's static `parse` method: `LocalDate.parse(text, formatter)`. If the text does not match the pattern, or a field is invalid such as month 13, it throws `DateTimeParseException`, which is unchecked. Formatting a value that lacks a field the pattern needs, such as hours on a LocalDate, throws `UnsupportedTemporalTypeException`. Another subtle trap is `YYYY`, which means week-based year and can be off by one near the new year; use `yyyy` or `uuuu` for the calendar year."
  ],
  "terms": [
   [
    "DateTimeFormatter",
    "An immutable, thread-safe class that formats and parses java.time values using ISO constants, localized styles or patterns."
   ],
   [
    "FormatStyle",
    "An enum of SHORT, MEDIUM, LONG and FULL used for locale-specific date and time layouts."
   ],
   [
    "ofPattern",
    "Creates a formatter from pattern letters such as yyyy-MM-dd HH:mm, optionally with a Locale."
   ],
   [
    "DateTimeParseException",
    "An unchecked exception thrown when text cannot be parsed into a date or time."
   ],
   [
    "UnsupportedTemporalTypeException",
    "Thrown when formatting requires a field the value does not have, such as hours on a LocalDate."
   ]
  ],
  "example": "A travel app stores departure times as ZonedDateTime and shows them with DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM).withLocale(userLocale), so each traveler sees the date order and month names they expect without separate code per country.",
  "tip": "MM is month and mm is minutes; HH is 24-hour and hh is 12-hour. Formatting a LocalDate with time letters throws UnsupportedTemporalTypeException, and a bad parse throws the unchecked DateTimeParseException.",
  "check": [
   [
    "What does LocalDate.of(2026, 1, 5).format(DateTimeFormatter.ofPattern(\"MM/dd\")) produce?",
    "01/05."
   ],
   [
    "What happens when you format a LocalDate with the pattern \"hh:mm\"?",
    "It throws UnsupportedTemporalTypeException because a LocalDate has no time fields."
   ],
   [
    "Is DateTimeFormatter safe to share between threads?",
    "Yes. It is immutable and thread-safe."
   ]
  ]
 },
 {
  "t": "Message formatting with MessageFormat",
  "body": [
   "Translated messages often need values inserted into them, and the position of those values differs between languages. Concatenating strings in code, such as `\"Hello \" + name + \", you have \" + n + \" messages\"`, fixes the word order in the program and cannot be translated properly. `java.text.MessageFormat` solves this with patterns that contain numbered placeholders, so each translation can place the values wherever its grammar needs.",
   "Placeholders are written `{0}`, `{1}` and so on, where the number is the index of the argument. The static method `MessageFormat.format(pattern, args...)` fills them in using the default locale. Arguments may appear in any order in the pattern and may be used more than once, and not every argument has to be used. A placeholder whose index has no argument is left in the output as written, such as `{2}`.",
   "```java\nString p = \"{0} has {1} new messages\";\nMessageFormat.format(p, \"Ana\", 3);            // Ana has 3 new messages\nMessageFormat.format(\"{1}, {0}!\", \"World\", \"Hello\"); // Hello, World!\nMessageFormat.format(\"Total: {0}\", 12345);      // Total: 12,345 (US default locale)\nMessageFormat.format(\"It''s {0}\", \"late\");      // It's late\n\nvar mf = new MessageFormat(\"{0,number,percent} done\", Locale.FRANCE);\nmf.format(new Object[] { 0.75 });               // 75 % done (French spacing)\n```",
   "A placeholder can include a format type and style: `{1,number}`, `{1,number,integer}`, `{1,number,percent}`, `{1,number,currency}`, `{0,date,short}` or `{0,time}`. Even without a type, numbers are formatted with the locale's rules, so 12345 appears as `12,345` in a US locale and with a different grouping separator in others. The date and time types format `java.util.Date` objects, not java.time types; for java.time values, format them with DateTimeFormatter first and pass the resulting String.",
   "The `choice` type handles simple plurals: `{0,choice,0#no files|1#one file|1<{0} files}` chooses text by numeric range. Each part is a limit, a `#` (greater than or equal) or `<` (greater than) and the text to use.",
   "Apostrophes are the famous trap. In a MessageFormat pattern, a single quote starts a quoted section in which braces are literal, so `\"It's {0}\"` loses the apostrophe and the placeholder is not replaced. Write two single quotes, `It''s {0}`, to produce one apostrophe. Quoting is deliberate when you want literal braces: `'{0}'` prints `{0}`. This matters because translators often write contractions in languages like French and English.",
   "In real applications the pattern comes from a resource bundle: `MessageFormat.format(bundle.getString(\"inbox\"), user, count)`. For a specific locale create an instance with `new MessageFormat(pattern, locale)` and call `format(Object[])`. MessageFormat instances, like other java.text formats, are not thread-safe."
  ],
  "terms": [
   [
    "MessageFormat",
    "A java.text class that builds locale-aware messages by substituting arguments into indexed placeholders."
   ],
   [
    "Placeholder",
    "A {n} element in a pattern replaced by argument n, optionally with a format type such as number or date."
   ],
   [
    "Format type",
    "The second part of a placeholder, such as number, date, time or choice, controlling how the argument is formatted."
   ],
   [
    "Quoting",
    "In MessageFormat, a single quote starts a literal section; two single quotes produce one apostrophe."
   ],
   [
    "ChoiceFormat",
    "A format used through the choice type that selects text based on numeric ranges, useful for simple plurals."
   ]
  ],
  "example": "A mobile app's English bundle has inbox={0}, you have {1} new messages, and its German bundle puts the count earlier in the sentence. The code calls MessageFormat.format(bundle.getString(\"inbox\"), name, count) in both cases, and each language controls its own word order.",
  "tip": "Placeholders are zero-based and can be reused or reordered. A lone apostrophe breaks the pattern, so write two single quotes. Numbers are formatted with locale grouping even without a format type.",
  "check": [
   [
    "What does MessageFormat.format(\"{0} and {0} and {1}\", \"A\", \"B\") return?",
    "A and A and B; placeholders can be reused."
   ],
   [
    "What does MessageFormat.format(\"Don't forget {0}\", \"milk\") produce?",
    "Dont forget {0}. The single quote starts a quoted section, so the apostrophe disappears and the placeholder stays literal; use two single quotes."
   ],
   [
    "What is printed for a placeholder {3} when only two arguments are passed?",
    "The text {3} itself; missing arguments are left as the placeholder."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
