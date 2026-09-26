/* Lessons for PCEP – Certified Entry-Level Python Programmer (PCEP-30-02): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("pcep", [
 {
  "t": "Fundamental terms: interpreting vs compiling, lexis, syntax and semantics, source code and the Python interpreter",
  "body": [
   "A computer's processor only understands machine code: long sequences of binary instructions specific to that processor. People do not write that directly. Instead you write source code in a high-level programming language such as Python, and a program translates it into something the machine can execute. The PCEP exam expects you to know the vocabulary for how that translation happens and for the rules a language imposes.",
   "There are two classic translation strategies. Compilation translates the whole program ahead of time into a separate executable file (machine code), which can then be run many times without the compiler. Interpretation reads the source code and executes it statement by statement each time the program runs, so you always need the interpreter present. Compiled programs tend to run faster and can be shipped without source code; interpreted programs are easier to test and move between platforms, because the same source runs anywhere an interpreter exists. Python is treated as an interpreted language: you run `python3 script.py` and the interpreter executes it. (Internally, CPython first converts source into bytecode for its virtual machine, but for the exam, Python is interpreted.)",
   "Every language, human or computer, has three layers of rules. Lexis is the vocabulary: the set of valid words and symbols, such as keywords, operators and literals. Syntax is the grammar: the rules for how those words may be combined into valid statements. Semantics is meaning: whether a statement that is well formed actually makes sense. For example, `print(\"hi\"` is a syntax error because a parenthesis is missing, while `print(10 / 0)` is syntactically fine but fails at run time because dividing by zero has no meaning.",
   "The interpreter checks your code at different times. Syntax errors are found before any line runs; the interpreter reports the line and usually marks the position with a caret. Run-time errors (exceptions) appear only when the faulty line is actually reached, so earlier lines may already have produced output. Logic errors are the hardest: the program runs without complaint but gives the wrong answer, and no tool will flag them for you.",
   "CPython is the reference implementation of Python, written in C, and it is what you get from python.org. You can use it in two modes: interactive mode (the REPL, or read-eval-print loop, shown by the `>>>` prompt), where each line is evaluated immediately, and script mode, where you save code in a `.py` file and run the whole file. Python source files are plain text, so any editor works, though an editor such as VS Code adds syntax highlighting and error hints."
  ],
  "terms": [
   [
    "Source code",
    "The human-readable program text you write, stored in Python as a plain-text .py file."
   ],
   [
    "Compiler",
    "A program that translates the whole source code into machine code ahead of time, producing a separate executable."
   ],
   [
    "Interpreter",
    "A program that reads and executes source code each time it runs, statement by statement; CPython is Python's reference interpreter."
   ],
   [
    "Lexis",
    "The vocabulary of a language: the valid words and symbols it recognises."
   ],
   [
    "Syntax",
    "The grammar rules for combining lexical elements into valid statements."
   ],
   [
    "Semantics",
    "The rules deciding whether a well-formed statement makes sense and what it means."
   ]
  ],
  "example": "You save a file with three print() calls, but the third is missing its closing parenthesis. When you run it, nothing is printed at all: the interpreter reports a SyntaxError before executing anything. Fix that, but make the second line print(1 / 0), and now the first line prints, then a ZeroDivisionError stops the program.",
  "tip": "Exam questions often ask which kind of error a snippet produces. Missing brackets, bad indentation or misplaced keywords are syntax errors found before execution; valid code that does something impossible is a run-time (semantic) error found only when that line runs.",
  "check": [
   [
    "What is the key practical difference between compiling and interpreting?",
    "A compiler translates the whole program once into an executable that runs without the compiler; an interpreter translates and runs the source every time, so the interpreter must be present."
   ],
   [
    "Is print(\"a\" + 5) a syntax error or a run-time error?",
    "A run-time error (TypeError). The line is grammatically valid, but adding a string and an integer has no meaning, so it fails only when executed."
   ],
   [
    "Which of lexis, syntax or semantics is violated by writing prnt instead of print?",
    "None at parse time; prnt is a valid name, so the code parses. It fails at run time with NameError because the name is not defined, which is a semantic problem."
   ]
  ]
 },
 {
  "t": "Python logic and structure: keywords, instructions, indentation and comments",
  "body": [
   "A Python program is a sequence of instructions (statements) that the interpreter executes from top to bottom. Normally each statement sits on its own line. You can put several short statements on one line separated by semicolons, and you can continue a long statement across lines inside parentheses, brackets or braces, or with a backslash at the end of a line, but the plain one-statement-per-line style is what you should write.",
   "Keywords are reserved words with a fixed meaning in the language, such as `if`, `else`, `elif`, `while`, `for`, `in`, `def`, `return`, `pass`, `break`, `continue`, `import`, `global`, `try`, `except`, `and`, `or`, `not`, `is`, `None`, `True` and `False`. You cannot use a keyword as a variable or function name; `for = 3` is a syntax error. Keywords are case sensitive: `True` is a keyword but `true` is an ordinary (and here undefined) name. You can see the full list with `import keyword` followed by `print(keyword.kwlist)`.",
   "Indentation is part of Python's syntax, not just style. A compound statement such as `if`, `while`, `for`, `def` or `try` ends its header line with a colon, and the lines that belong to it (its block or suite) must be indented more than the header. The block ends when indentation returns to the earlier level. All lines in a block must use the same indentation. PEP 8, Python's style guide, recommends four spaces per level. Mixing tabs and spaces inconsistently leads to `TabError`, and a wrong level leads to `IndentationError`, which is a kind of `SyntaxError`.",
   "```python\nx = 7\nif x > 5:\n    print(\"big\")      # inside the if block\n    print(\"still in\")\nprint(\"always runs\")  # back at the outer level\n```",
   "Comments start with `#` and run to the end of the line. The interpreter ignores them entirely, so they are for human readers: explain why the code does something, not what each obvious line does. A `#` inside a string literal is just a character, not a comment. Python has no special multi-line comment syntax; you either put `#` on each line or, by convention, use a triple-quoted string, which is really a string literal that is evaluated and discarded (and, when it is the first statement in a function or module, becomes its docstring).",
   "Unexpected indentation matters on the exam. If a line is indented without a preceding colon header, you get `IndentationError: unexpected indent`. If a header's colon is followed by nothing indented, you get `IndentationError: expected an indented block`. That second case is exactly why the `pass` keyword exists."
  ],
  "terms": [
   [
    "Keyword",
    "A reserved word with fixed meaning, such as if, for or def, that cannot be used as an identifier."
   ],
   [
    "Block (suite)",
    "The group of indented statements belonging to a header line that ends with a colon."
   ],
   [
    "Comment",
    "Text after # to the end of the line, ignored by the interpreter."
   ],
   [
    "IndentationError",
    "The SyntaxError subclass raised when indentation is missing, unexpected or inconsistent."
   ]
  ],
  "example": "A learner writes a loop whose second body line is indented with three spaces instead of four. Python reports an IndentationError (unindent does not match any outer indentation level) before running anything. Re-indenting both lines to four spaces makes the program run.",
  "tip": "Remember that True, False and None are capitalised keywords; lowercase true is just an undefined name. Also remember that # inside quotes is not a comment.",
  "check": [
   [
    "What happens if you write if x > 3: and the next line is not indented?",
    "Python raises IndentationError: expected an indented block, because a compound statement header must be followed by an indented block."
   ],
   [
    "Can you name a variable pass?",
    "No. pass is a keyword, so pass = 1 is a SyntaxError."
   ],
   [
    "What does print(\"a # b\") output?",
    "a # b. The # is part of the string, not a comment."
   ]
  ]
 },
 {
  "t": "Literals: Boolean, integer, float, scientific notation and string literals",
  "body": [
   "A literal is a value written directly in your code, such as `42`, `3.5`, `\"cat\"` or `True`. The way you write it decides its type, which you can check with `type()`. PCEP tests whether you can recognise each kind of literal and predict its type.",
   "Integer literals (type `int`) are whole numbers with no decimal point: `0`, `17`, `-4`. Python integers have no fixed size limit; they grow as large as memory allows. You may use underscores to group digits for readability, so `1_000_000` is the same as `1000000`. You may not write leading zeros on a non-zero decimal integer: `007` is a syntax error (a leading zero is reserved for prefixes like `0o`).",
   "Float literals (type `float`) contain a decimal point or an exponent: `3.14`, `2.0`, `.5` (which is 0.5) and `4.` (which is 4.0). The presence of the point matters: `4` is an int, `4.0` is a float, even though they compare equal. Scientific notation uses `e` or `E` meaning \"times ten to the power of\": `3e8` is 300000000.0 and `1.5E-3` is 0.0015. A literal written in scientific notation is always a float, even if the value is whole, so `type(3e8)` is `float`. Python may also print very large or very small floats in this notation, for example `print(0.00001)` shows `1e-05`.",
   "String literals (type `str`) are text in single or double quotes: `'hello'` and `\"hello\"` are identical. Triple quotes (`'''...'''` or `\"\"\"...\"\"\"`) allow text to span several lines. An empty string is `''`. Digits in quotes are text, not numbers: `\"12\"` is a string, and `\"12\" + \"3\"` gives `\"123\"`.",
   "Boolean literals are `True` and `False` (type `bool`). They must be capitalised. `bool` is actually a subclass of `int`, so `True` behaves as 1 and `False` as 0 in arithmetic: `True + True` is 2. Finally, `None` is a special literal of type `NoneType` meaning \"no value\".",
   "```python\nprint(type(10), type(10.0), type(1e3))  # int, float, float\nprint(1_000 + 1)                          # 1001\nprint(True + 1)                           # 2\n```"
  ],
  "terms": [
   [
    "Literal",
    "A value written directly in source code, whose form determines its type."
   ],
   [
    "Scientific notation",
    "Float notation using e or E for a power of ten, as in 6.02e23; always produces a float."
   ],
   [
    "bool",
    "The Boolean type with values True and False, a subclass of int where True equals 1 and False equals 0."
   ],
   [
    "str",
    "Python's text type, written in single, double or triple quotes."
   ]
  ],
  "example": "A price list script stores tax_rate = 2e-2 and quantity = 3. print(quantity * tax_rate) prints 0.06, a float, because the scientific-notation literal 2e-2 is a float and int times float gives a float.",
  "tip": "Watch for the decimal point and the e: 5 is int, 5.0 and 5. are float, 5e0 is float. And \"5\" in quotes is a str no matter what it looks like.",
  "check": [
   [
    "What is the type of 2E2 and what value does it print?",
    "float; it prints 200.0."
   ],
   [
    "Is 1_000_000 a valid literal, and what does it equal?",
    "Yes. Underscores are allowed between digits for readability; it equals the int 1000000."
   ],
   [
    "What does True * 3 evaluate to?",
    "3, because True behaves as the integer 1 in arithmetic."
   ]
  ]
 },
 {
  "t": "Binary, octal and hexadecimal integer literals (0b, 0o, 0x)",
  "body": [
   "People normally write numbers in decimal (base 10), but computers store them in binary (base 2), and programmers often use octal (base 8) and hexadecimal (base 16) as compact ways to write binary patterns. Python lets you write integer literals in all of these bases using a prefix. The prefix only changes how you write the number; the result is always an ordinary `int`, and Python prints it in decimal.",
   "Binary literals start with `0b` or `0B` and may contain only the digits 0 and 1. Each position is a power of two, so `0b1010` means 8 + 0 + 2 + 0, which is 10. Octal literals start with `0o` or `0O` (zero followed by the letter o) and use digits 0 to 7; `0o17` means 1 x 8 + 7, which is 15. Hexadecimal literals start with `0x` or `0X` and use digits 0 to 9 plus letters A to F (either case) for the values 10 to 15; `0xFF` means 15 x 16 + 15, which is 255, and `0x10` is 16.",
   "```python\nprint(0b1010, 0o17, 0xFF, 0x10)   # 10 15 255 16\nprint(bin(10), oct(15), hex(255)) # 0b1010 0o17 0xff\nprint(int(\"ff\", 16), int(\"101\", 2))  # 255 5\n```",
   "Going the other way, the built-in functions `bin()`, `oct()` and `hex()` take an integer and return a string showing it in that base, including the prefix. Note that they return strings, not numbers, and `hex()` uses lowercase letters. To convert text in some base back into an integer, use `int()` with a second argument naming the base: `int(\"ff\", 16)` returns 255. Using a digit that is not valid for the base causes an error: `0b102` is a syntax error, and `int(\"9\", 8)` raises `ValueError`.",
   "A quick way to convert by hand: for binary, write powers of two from the right (1, 2, 4, 8, 16, ...) above the digits and add the ones under a 1. For hexadecimal, each hex digit corresponds to exactly four binary digits, which is why hex is popular for memory addresses, colours such as `0xFF8800`, and byte values. For octal, each digit is three bits, which is why it still appears in Unix file permissions like `0o755`.",
   "Negative numbers work with prefixes too: `-0x10` is -16. Because all these literals produce ordinary ints, you can mix them freely in arithmetic: `0x10 + 0b1` is 17."
  ],
  "terms": [
   [
    "0b prefix",
    "Marks a binary (base 2) integer literal, using only digits 0 and 1."
   ],
   [
    "0o prefix",
    "Marks an octal (base 8) integer literal, using digits 0 to 7."
   ],
   [
    "0x prefix",
    "Marks a hexadecimal (base 16) integer literal, using 0 to 9 and A to F."
   ],
   [
    "bin(), oct(), hex()",
    "Built-in functions that return a string representation of an integer in base 2, 8 or 16, with prefix."
   ]
  ],
  "example": "A web designer stores a colour as 0x33CC99 in a script. print(0x33CC99) shows 3394713, the same number in decimal, while hex(3394713) returns the string '0x33cc99' to put back into a stylesheet.",
  "tip": "The octal prefix is zero plus the letter o (0o), not two zeros, and a plain leading zero like 017 is a SyntaxError in Python 3. Remember that bin(), oct() and hex() return strings.",
  "check": [
   [
    "What does print(0o10 + 0x10 + 0b10) output?",
    "26, because 0o10 is 8, 0x10 is 16 and 0b10 is 2."
   ],
   [
    "What is the type of hex(31)?",
    "str. It returns the string '0x1f'."
   ],
   [
    "Is 0b21 valid?",
    "No. Binary literals may contain only 0 and 1, so it is a SyntaxError."
   ]
  ]
 },
 {
  "t": "Variables and naming rules, reserved keywords and PEP 8 naming conventions",
  "body": [
   "A variable is a name that refers to a value stored in memory. In Python you create a variable simply by assigning to it: `age = 30`. There is no separate declaration and no fixed type attached to the name; the value carries the type, and the same name can later refer to a value of a different type (`age = \"thirty\"` is legal). Using a variable before it has been assigned raises `NameError`.",
   "The legal naming rules are strict and testable. A name may contain letters, digits and underscores. It must not start with a digit, so `2cats` is illegal but `cats2` is fine. It may start with an underscore, as in `_total`. It must not contain spaces, hyphens or other symbols: `my-var` is read as `my` minus `var`. It must not be a keyword such as `class`, `for` or `None`. Names are case sensitive, so `Total`, `total` and `TOTAL` are three different variables. Python 3 also allows non-English letters in names, although that is rarely wise.",
   "A subtle point: names of built-in functions like `print`, `list`, `str` or `input` are not keywords, so Python lets you assign to them. Doing so shadows the built-in. After `list = [1, 2]`, calling `list(\"abc\")` fails with `TypeError` because `list` now refers to your list object. Avoid reusing built-in names.",
   "PEP 8 is the official style guide for Python code. Its naming conventions are not enforced by the interpreter, but they are what other programmers expect and what the exam refers to. Variables and functions use lowercase words separated by underscores (snake_case): `total_price`, `get_input()`. Constants, which are ordinary variables you promise not to change, use uppercase with underscores: `MAX_SIZE = 100`. Class names use CapWords (also called CamelCase): `BankAccount`. Avoid single-character names `l`, `O` and `I` because they look like digits.",
   "```python\nuser_name = \"Ana\"   # good: snake_case\nMAX_RETRIES = 3       # constant by convention\n_count = 0            # legal: leading underscore\n# 3rd_place = 1       # SyntaxError: starts with a digit\n# my var = 1          # SyntaxError: contains a space\n```",
   "Assignment works right to left: the expression on the right is evaluated first, then the name on the left is bound to the result. That is why `x = x + 1` makes sense in programming even though it is false in algebra. You can also assign several names at once: `a, b = 1, 2` binds both, and `a, b = b, a` swaps them."
  ],
  "terms": [
   [
    "Variable",
    "A name bound to a value by assignment; the value, not the name, has a type."
   ],
   [
    "Identifier",
    "Any name you create; it must use letters, digits and underscores and not start with a digit or be a keyword."
   ],
   [
    "PEP 8",
    "Python's official style guide, recommending snake_case for variables and functions and UPPER_CASE for constants."
   ],
   [
    "Shadowing a built-in",
    "Assigning to a built-in name such as list or str, which hides the original function in that scope."
   ]
  ],
  "example": "A beginner names a variable sum = 0 and later calls sum([1, 2, 3]), getting TypeError: 'int' object is not callable. Renaming the variable to total restores the built-in sum() and follows PEP 8 at the same time.",
  "tip": "Legal and conventional are different questions. Exam items may ask which names are invalid (digit first, hyphen, space, keyword) versus which break PEP 8 but still run (MyVariable for a variable, for example).",
  "check": [
   [
    "Which of these names are legal: _x, x_1, 1_x, x-1, While?",
    "_x, x_1 and While are legal (While differs from the keyword while by case). 1_x starts with a digit and x-1 contains a hyphen, so both are illegal."
   ],
   [
    "Does Python stop you from changing a constant named PI?",
    "No. Upper-case naming is only a PEP 8 convention; the interpreter lets you reassign it."
   ],
   [
    "After a, b = 3, 5 and a, b = b, a, what are a and b?",
    "a is 5 and b is 3; the right-hand tuple is built first, then unpacked."
   ]
  ]
 },
 {
  "t": "Numeric operators: ** * / % // + - and the difference between / and //",
  "body": [
   "Python's arithmetic operators are `+` (addition), `-` (subtraction), `*` (multiplication), `/` (true division), `//` (floor division), `%` (remainder, called modulo) and `**` (exponentiation). The PCEP exam loves these, especially the three division-related ones, so you need to predict both the value and the type of every result.",
   "The type rule is simple for most operators: if both operands are `int`, the result is `int`; if either is `float`, the result is `float`. So `3 + 4` is 7 but `3 + 4.0` is 7.0. The big exception is `/`: true division always returns a float, even when the division is exact. `6 / 3` is 2.0, not 2.",
   "Floor division `//` divides and then rounds down toward negative infinity, giving the largest whole number not greater than the true quotient. With two ints the result is an int; with any float it is a float with a whole value. `7 // 2` is 3 and `7.0 // 2` is 3.0. Rounding down matters for negatives: `-7 // 2` is -4, not -3, because -3.5 rounded toward negative infinity is -4. It does not simply chop off the fraction.",
   "The `%` operator gives the remainder that goes with floor division, and Python guarantees that `(a // b) * b + (a % b) == a`. So `7 % 2` is 1 and `-7 % 2` is 1 (because -4 x 2 + 1 = -7). The result takes the sign of the divisor: `7 % -2` is -1. Common uses are checking even numbers (`n % 2 == 0`) and wrapping values around a range.",
   "```python\nprint(7 / 2, 7 // 2, 7 % 2)     # 3.5 3 1\nprint(-7 // 2, -7 % 2)          # -4 1\nprint(6 / 3, 2 ** 3, 2 ** -1)   # 2.0 8 0.5\nprint(10 // 0.3)                # 33.0\n```",
   "Exponentiation `**` raises the left operand to the power of the right: `2 ** 10` is 1024. With int operands and a non-negative exponent the result is an int; a negative exponent gives a float (`2 ** -1` is 0.5). Dividing by zero with `/`, `//` or `%` raises `ZeroDivisionError`, whether the operands are ints or floats.",
   "The unary operators `+` and `-` apply to a single operand, as in `-x`. Binary `+` and `-` combine two. Keep them separate in your mind, because they have different priorities, which the operator-priority lesson covers."
  ],
  "terms": [
   [
    "True division (/)",
    "Division that always returns a float, even for exact results like 4 / 2 = 2.0."
   ],
   [
    "Floor division (//)",
    "Division rounded down toward negative infinity; int with two ints, float otherwise."
   ],
   [
    "Modulo (%)",
    "The remainder paired with floor division, taking the sign of the divisor in Python."
   ],
   [
    "Exponentiation (**)",
    "Raises the left operand to the power of the right operand."
   ]
  ],
  "example": "A script splits 17 cookies among 5 children: 17 // 5 gives 3 cookies each and 17 % 5 gives 2 left over. If it had used 17 / 5 it would get 3.4, which is useless for counting whole cookies.",
  "tip": "Two classic traps: / always returns a float, and // rounds toward negative infinity, so -7 // 2 is -4. Check every negative floor-division or modulo question twice.",
  "check": [
   [
    "What do 9 / 3 and 9 // 3 return?",
    "9 / 3 returns 3.0 (float); 9 // 3 returns 3 (int)."
   ],
   [
    "What is -9 % 4?",
    "3, because -9 // 4 is -3 and -3 x 4 + 3 = -9."
   ],
   [
    "What is the type and value of 7.5 // 2?",
    "float 3.0; floor division with a float operand gives a whole-valued float."
   ]
  ]
 },
 {
  "t": "String operators (+ and *), assignment and compound assignment operators (+=, *=, etc.)",
  "body": [
   "Two arithmetic symbols also work on strings, with different meanings. The `+` operator concatenates (joins) two strings: `\"snow\" + \"ball\"` gives `\"snowball\"`. The `*` operator replicates a string a whole number of times: `\"ab\" * 3` gives `\"ababab\"`. The order of the operands for `*` does not matter, so `3 * \"ab\"` is the same. Multiplying by zero or a negative number gives an empty string `\"\"`.",
   "These operators are strict about types. Both operands of `+` must be strings, so `\"Age: \" + 30` raises `TypeError`; you must convert first with `\"Age: \" + str(30)`. For `*`, one operand must be a string and the other an int; `\"ab\" * 2.0` raises `TypeError` because you cannot repeat something 2.0 times, and `\"ab\" * \"2\"` fails too. The same two operators work on lists and tuples: `[0] * 3` is `[0, 0, 0]`.",
   "The plain assignment operator `=` binds the name on its left to the value of the expression on its right. It is a statement, not a comparison; comparing uses `==`. Python also supports chained assignment, `a = b = 0`, which binds both names to the same value, and multiple assignment, `x, y = 1, 2`.",
   "Compound (augmented) assignment operators combine an operation with assignment. `x += 5` means `x = x + 5`, and the same pattern exists for `-=`, `*=`, `/=`, `//=`, `%=` and `**=`, plus the bitwise forms `&=`, `|=`, `^=`, `<<=` and `>>=`. The variable must already exist; `count += 1` on an undefined `count` raises `NameError`. The type rules of the underlying operator still apply, so after `x = 10` and `x /= 2`, `x` is the float 5.0.",
   "```python\ns = \"ha\"\ns *= 3          # s = s * 3\nprint(s)        # hahaha\nn = 7\nn //= 2         # n = n // 2\nn **= 2         # n = n ** 2\nprint(n)        # 9\n```",
   "One subtle point the exam likes: the right-hand side of a compound assignment is evaluated fully before the operation. So `x *= 2 + 3` means `x = x * (2 + 3)`, not `x = x * 2 + 3`. If `x` is 4, the result is 20, not 11.",
   "Strings are immutable, so `s += \"!\"` does not change the original string object; it builds a new string and rebinds `s` to it. You will not see a difference in simple programs, but it explains why other names bound to the old string are unaffected."
  ],
  "terms": [
   [
    "Concatenation",
    "Joining two strings with +, producing a new string."
   ],
   [
    "Replication",
    "Repeating a string (or list) with * and an integer count."
   ],
   [
    "Compound assignment",
    "An operator such as += or //= that applies an operation and rebinds the variable to the result."
   ],
   [
    "Chained assignment",
    "Binding several names to one value in a single statement, as in a = b = 0."
   ]
  ],
  "example": "A console game draws a border with print(\"-\" * 20) and builds a score message with \"Score: \" + str(points). When a player wins a round it updates points += 10 instead of writing points = points + 10.",
  "tip": "Expect a question where a number is added to a string. \"3\" + 4 is a TypeError, \"3\" * 4 is \"3333\", and x *= 2 + 1 multiplies by 3, because the whole right side is evaluated first.",
  "check": [
   [
    "What does print(\"=\" * 0 + \"x\") show?",
    "x. Replicating by zero gives an empty string, then \"x\" is concatenated."
   ],
   [
    "If a = 3 and you run a **= 1 + 1, what is a?",
    "9. The right side 1 + 1 is evaluated first, then a = a ** 2."
   ],
   [
    "Why does \"Total: \" + 5 fail?",
    "+ cannot join a str and an int, so Python raises TypeError. Convert with str(5) first."
   ]
  ]
 },
 {
  "t": "Operator priority and binding, including right-to-left ** and unary minus",
  "body": [
   "When an expression contains several operators, Python uses priority (also called precedence) to decide which operations happen first, and binding (associativity) to decide the order among operators of the same priority. Parentheses override both, so when in doubt, add them. The exam, however, gives you expressions without helpful parentheses and asks for the result.",
   "The order you need for PCEP, from highest to lowest priority, is: `**`; then unary `+`, `-` and `~`; then `*`, `/`, `//` and `%`; then binary `+` and `-`; then the shifts `<<` and `>>`; then `&`; then `^`; then `|`; then the comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`, plus `in`, `not in`, `is`, `is not`); then `not`; then `and`; and finally `or`. Assignment operators are not part of expressions at all; they happen last.",
   "Most operators bind left to right. `10 - 4 - 3` is `(10 - 4) - 3`, which is 3, and `100 / 10 / 5` is 2.0. The notable exception is `**`, which binds right to left. So `2 ** 3 ** 2` is `2 ** (3 ** 2)`, which is `2 ** 9`, or 512, not `8 ** 2` (64).",
   "Unary minus has an unusual relationship with `**`. Because `**` has higher priority than a unary minus on its left, `-2 ** 2` is `-(2 ** 2)`, which is -4. To square negative two you must write `(-2) ** 2`, which is 4. On the right side of `**`, however, a unary operator is allowed and applies to the exponent: `2 ** -1` is 0.5. Compared with multiplication, unary minus binds tighter: `-3 * 2` is `(-3) * 2`, which is the same value either way, but `-2 ** 2` is where it matters.",
   "```python\nprint(2 ** 3 ** 2)      # 512  (right to left)\nprint(-2 ** 2)          # -4   (** before unary minus)\nprint((-2) ** 2)        # 4\nprint(2 + 3 * 4 ** 2)   # 50\nprint(17 % 5 * 2 // 3)  # 1   ((17 % 5) * 2) // 3 = 4 // 3\n```",
   "To evaluate a tricky expression, work in passes: first resolve parentheses, then every `**` from right to left, then unary signs, then `*`, `/`, `//` and `%` from left to right, then `+` and `-` from left to right, and so on. Writing each intermediate result down is the most reliable exam technique."
  ],
  "terms": [
   [
    "Priority (precedence)",
    "The rule deciding which operators are applied first in an expression."
   ],
   [
    "Binding (associativity)",
    "The order in which operators of equal priority are applied, usually left to right."
   ],
   [
    "Right-to-left binding",
    "The behaviour of **, so a ** b ** c means a ** (b ** c)."
   ],
   [
    "Unary operator",
    "An operator with one operand, such as -x, +x or ~x."
   ]
  ],
  "example": "A physics script computes energy with -g ** 2 expecting a positive square of a negative constant. Because ** runs before the unary minus, it gets a negative result; writing (-g) ** 2 or simply g ** 2 fixes the bug.",
  "tip": "Memorise the two exceptions: ** binds right to left, and ** beats a unary minus on its left. Everything else at the same level runs left to right, so % * // / are applied strictly in reading order.",
  "check": [
   [
    "What does print(-3 ** 2) output?",
    "-9, because 3 ** 2 is evaluated before the unary minus."
   ],
   [
    "What is 2 ** 2 ** 3?",
    "256, because ** binds right to left: 2 ** (2 ** 3) = 2 ** 8."
   ],
   [
    "Evaluate 10 - 2 * 3 // 4.",
    "9. 2 * 3 is 6, 6 // 4 is 1, then 10 - 1 is 9."
   ]
  ]
 },
 {
  "t": "Bitwise operators: ~ & ^ | << >>",
  "body": [
   "Bitwise operators work on the individual binary digits (bits) of integers rather than on their overall values. They only accept integers (and Booleans, which are integers); using them on floats raises `TypeError`. You will meet them in low-level work such as flags, permissions and network masks, and the exam checks that you can compute them by hand.",
   "The binary operators compare two numbers bit by bit. `&` (AND) gives 1 only where both bits are 1. `|` (OR) gives 1 where at least one bit is 1. `^` (XOR, exclusive or) gives 1 where the bits differ. Take 6 (binary 110) and 3 (binary 011): `6 & 3` is 010, which is 2; `6 | 3` is 111, which is 7; `6 ^ 3` is 101, which is 5. Line the numbers up in binary, work column by column, and convert back.",
   "The unary operator `~` (NOT, or bitwise negation) flips every bit. Because Python integers use two's complement behaviour for negatives, the practical rule is `~x == -x - 1`. So `~6` is -7, `~0` is -1 and `~-1` is 0. Do not confuse `~` with the logical `not`: `not 6` is `False`, while `~6` is -7.",
   "The shift operators move bits left or right. `x << n` shifts left by n positions, filling with zeros, which multiplies by 2 to the power n: `6 << 1` is 12 and `1 << 4` is 16. `x >> n` shifts right, dropping the lowest bits, which floor-divides by 2 to the power n: `6 >> 1` is 3 and `13 >> 2` is 3. For negative numbers the right shift still floors, so `-5 >> 1` is -3.",
   "```python\na, b = 12, 10          # 1100 and 1010\nprint(a & b, a | b, a ^ b)  # 8 14 6\nprint(~a, a << 2, a >> 2)   # -13 48 3\n```",
   "Remember their priorities: `~` sits with the unary signs just below `**`; shifts come after `+` and `-`; then `&`, then `^`, then `|`, all above comparisons. So `1 + 2 << 1` is `(1 + 2) << 1`, which is 6, and `5 & 3 == 1` means `(5 & 3) == 1`, which is `True`, because `&` has higher priority than `==`.",
   "A common use is a bit mask: to test whether bit 2 of `flags` is set, check `flags & 4 != 0`; to set it, use `flags |= 4`; to clear it, `flags &= ~4`; to toggle it, `flags ^= 4`."
  ],
  "terms": [
   [
    "Bitwise AND (&)",
    "Produces 1 in each bit position where both operands have 1."
   ],
   [
    "Bitwise XOR (^)",
    "Produces 1 in each bit position where the operands differ."
   ],
   [
    "Bitwise NOT (~)",
    "Flips all bits; for Python ints ~x equals -x - 1."
   ],
   [
    "Shift (<< >>)",
    "Moves bits left or right, multiplying or floor-dividing by powers of two."
   ]
  ],
  "example": "A file permission value 0o755 is checked for owner write access with (mode & 0o200) != 0. The & masks away every bit except the one being tested, so the result is non-zero only if that permission is set.",
  "tip": "The fastest route through ~ questions is the formula ~x = -x - 1. For & | ^, always convert to binary and line up the columns; guessing from decimal values is where mistakes happen.",
  "check": [
   [
    "What is 5 ^ 3?",
    "6. 101 XOR 011 is 110."
   ],
   [
    "What does ~5 return?",
    "-6, because ~x equals -x - 1."
   ],
   [
    "What is 20 >> 2?",
    "5, the same as 20 // 4."
   ]
  ]
 },
 {
  "t": "Boolean and relational operators, float accuracy and rounding surprises",
  "body": [
   "Relational (comparison) operators compare two values and return a Boolean: `==` equal, `!=` not equal, `<` less than, `>` greater than, `<=` less than or equal, and `>=` greater than or equal. Note that `=` assigns while `==` compares. Numbers of different types compare by value, so `1 == 1.0` is `True` and `True == 1` is also `True`. Strings compare character by character using character codes, so `\"B\" < \"a\"` is `True` because uppercase letters come before lowercase ones. Comparing a string with a number using `<` raises `TypeError`, although `==` simply returns `False`.",
   "Python allows chained comparisons: `1 < x < 10` means `1 < x and x < 10`, with `x` evaluated once. It reads naturally and is often tested. `a == b == c` is `True` only when all three are equal.",
   "The logical (Boolean) operators combine conditions. `and` is true only when both sides are true; `or` is true when at least one side is; `not` reverses a single value. Their priority, lowest last, is `not`, then `and`, then `or`, all below the comparisons. So `not a == b` means `not (a == b)`, and `a or b and c` means `a or (b and c)`. Both `and` and `or` short-circuit: they stop as soon as the answer is known, which the next lesson on truthiness explores.",
   "Floats are stored in binary with a limited number of bits, so most decimal fractions such as 0.1 cannot be represented exactly. Tiny errors appear: `0.1 + 0.2` prints `0.30000000000000004`, and `0.1 + 0.2 == 0.3` is `False`. This is not a Python bug; it happens in nearly every language. When comparing floats, check whether the difference is tiny, for example `abs(a - b) < 1e-9`, instead of using `==`.",
   "```python\nprint(0.1 + 0.2 == 0.3)            # False\nprint(abs(0.1 + 0.2 - 0.3) < 1e-9) # True\nprint(round(2.5), round(3.5))      # 2 4\nprint(round(3.14159, 2))           # 3.14\n```",
   "The built-in `round()` has its own surprise. With one argument it returns an int, rounding halves to the nearest even number (banker's rounding): `round(0.5)` is 0, `round(1.5)` is 2 and `round(2.5)` is 2. With a second argument it rounds to that many decimal places and returns a float, but because of binary representation some values that look like halves are slightly below them, so results such as `round(2.675, 2)` giving 2.67 can surprise you. Also remember that `int()` truncates toward zero instead of rounding: `int(2.9)` is 2."
  ],
  "terms": [
   [
    "Relational operator",
    "An operator such as ==, != or <= that compares two values and returns True or False."
   ],
   [
    "Chained comparison",
    "An expression such as 0 <= x < 5, equivalent to two comparisons joined by and."
   ],
   [
    "Floating-point error",
    "The small inaccuracy caused by storing decimal fractions in binary, as in 0.1 + 0.2."
   ],
   [
    "Banker's rounding",
    "round()'s rule of sending exact halves to the nearest even integer."
   ]
  ],
  "example": "A shop script checks if total == 0.3 after adding items of 0.1 and 0.2 and never takes the discount branch. Changing the test to abs(total - 0.3) < 1e-9, or working in whole cents as ints, makes it behave correctly.",
  "tip": "If an exam snippet compares float sums with ==, suspect False. If it calls round() on a .5 value, remember round-half-to-even: round(2.5) is 2 and round(3.5) is 4.",
  "check": [
   [
    "What does print(3 < 5 > 4) output?",
    "True. It is 3 < 5 and 5 > 4, and both are true."
   ],
   [
    "What is round(4.5)?",
    "4, because exact halves round to the nearest even integer."
   ],
   [
    "How is not 1 == 2 grouped?",
    "As not (1 == 2), because comparisons have higher priority than not; the result is True."
   ]
  ]
 },
 {
  "t": "Type casting with int(), float(), str() and bool()",
  "body": [
   "Type casting (type conversion) means creating a value of one type from a value of another. Python does some conversions automatically, for example turning an int into a float when you add `2 + 0.5`, but it never silently turns a string into a number or a number into a string. For those you call a conversion function: `int()`, `float()`, `str()` or `bool()`. Each returns a new value; the original is unchanged.",
   "`int(x)` builds an integer. From a float it truncates toward zero, dropping the fractional part rather than rounding: `int(3.9)` is 3 and `int(-3.9)` is -3. From a string it accepts only text that looks like a whole number, optionally with a sign and surrounding spaces: `int(\" 42 \")` is 42, but `int(\"4.2\")` and `int(\"abc\")` raise `ValueError`. From a Boolean, `int(True)` is 1. With a second argument it reads other bases: `int(\"1f\", 16)` is 31.",
   "`float(x)` builds a float. `float(7)` is 7.0, `float(\"3.5\")` is 3.5, `float(\"1e3\")` is 1000.0 and `float(\" -2 \")` is -2.0. Non-numeric text raises `ValueError`. To turn the string `\"4.2\"` into an int, go through float first: `int(float(\"4.2\"))` gives 4.",
   "`str(x)` produces the text that `print()` would show: `str(10)` is `\"10\"`, `str(2.50)` is `\"2.5\"`, `str(True)` is `\"True\"` and `str(None)` is `\"None\"`. It is how you join numbers into messages with `+`.",
   "`bool(x)` applies Python's truthiness rules. It returns `False` for zero values and empty things: `0`, `0.0`, `\"\"` (empty string), `[]`, `()`, `{}` and `None`. Everything else is `True`, including negative numbers, `\" \"` (a space) and the string `\"False\"`, because that string is not empty. With no argument, `bool()` is `False`, `int()` is 0, `float()` is 0.0 and `str()` is `\"\"`.",
   "```python\nprint(int(7.99), int(\"-12\"), float(\"2\"))  # 7 -12 2.0\nprint(str(3) + str(4))                     # 34\nprint(bool(\"False\"), bool(0.0), bool(-1)) # True False True\n```",
   "Errors to recognise: `ValueError` when the value has the right type but unusable content (`int(\"ten\")`), and `TypeError` when the type itself is not accepted (`int([1, 2])` or `int(None)`)."
  ],
  "terms": [
   [
    "Type casting",
    "Explicitly converting a value to another type with a function such as int() or str()."
   ],
   [
    "Truncation",
    "Dropping the fractional part toward zero, as int() does with floats."
   ],
   [
    "Truthiness",
    "The rule bool() uses: zero, empty and None are False; everything else is True."
   ],
   [
    "ValueError",
    "Raised when a conversion function gets the right type but an unusable value, such as int(\"3.7\")."
   ]
  ],
  "example": "A form collects a height as the text \"1.82\". int(\"1.82\") crashes with ValueError, so the program uses float(\"1.82\") for calculations and str(round(h * 100)) + \" cm\" to display it.",
  "tip": "int() never rounds; it truncates toward zero, and it refuses strings containing a decimal point. bool() of any non-empty string, even \"0\" or \"False\", is True.",
  "check": [
   [
    "What does int(-2.7) return?",
    "-2, because int() truncates toward zero."
   ],
   [
    "What is bool(\"0\")?",
    "True, since the string is not empty."
   ],
   [
    "Which error does float(\"12a\") raise?",
    "ValueError: the argument is a string (acceptable type) but its content is not a number."
   ]
  ]
 },
 {
  "t": "Console I/O: print() with sep= and end=, input() returning a string, converting input to numbers",
  "body": [
   "Console programs talk to the user through two built-in functions: `print()` for output and `input()` for input. Both show up constantly in PCEP questions, usually as \"what exactly is printed?\"",
   "`print()` accepts any number of positional arguments of any type. It converts each to text (as `str()` would), joins them with a separator, and adds an ending. By default the separator is a single space and the ending is a newline, so `print(\"a\", 1, True)` prints `a 1 True` followed by a line break. Calling `print()` with no arguments prints just an empty line.",
   "Two keyword arguments change that behaviour. `sep=` sets the string placed between arguments: `print(1, 2, 3, sep=\"-\")` prints `1-2-3`, and `sep=\"\"` removes the spaces. `end=` sets what is printed after the last argument: `print(\"Hi\", end=\"\")` prints without moving to a new line, so the next print continues on the same line. These must be passed by keyword, and they must come after the positional arguments. The separator only goes between arguments, so with one argument `sep` has no visible effect.",
   "```python\nprint(\"a\", \"b\", sep=\"*\", end=\"!\\n\")  # a*b!\nprint(\"x\", end=\" \")\nprint(\"y\")                              # x y\nprint(\"one\\ntwo\")                       # two lines\n```",
   "`input()` pauses the program, optionally displaying a prompt string you pass (`input(\"Name: \")`), and waits for the user to press Enter. It returns everything they typed, without the trailing newline, as a string. It always returns a `str`, even if the user types digits. That is the source of many bugs: `age = input(\"Age: \")` followed by `age + 1` raises `TypeError`, and `input() * 2` repeats the text rather than doubling a number.",
   "To get numbers, wrap the call in a conversion function: `age = int(input(\"Age: \"))` or `price = float(input(\"Price: \"))`. If the user types something that cannot be converted, such as `abc` or `3.5` for `int()`, a `ValueError` is raised, which you can handle with try-except once you reach the exceptions domain.",
   "A classic exam item combines these: if the user enters 2 and 3 for `a = input()` and `b = input()`, then `print(a + b)` shows `23` (string concatenation), while `print(int(a) + int(b))` shows `5`."
  ],
  "terms": [
   [
    "sep=",
    "print() keyword argument giving the string inserted between arguments; default is a single space."
   ],
   [
    "end=",
    "print() keyword argument giving the string printed after the last argument; default is a newline."
   ],
   [
    "input()",
    "Built-in that reads one line from the user and always returns it as a string."
   ],
   [
    "Prompt",
    "The optional string passed to input() and shown before the user types."
   ]
  ],
  "example": "A tip calculator asks bill = float(input(\"Bill: \")) and pct = int(input(\"Tip %: \")), then prints print(\"Tip:\", round(bill * pct / 100, 2), end=\" dollars\\n\") so the result reads naturally on one line.",
  "tip": "When a question uses input(), assume a string until you see int() or float(). With print(), count separators carefully: sep appears only between arguments, and end appears once, at the very end.",
  "check": [
   [
    "What does print(1, 2, sep=\"\", end=\"3\") followed by print(4) display?",
    "1234 on one line, then a newline: 12 from the first call with no separator, 3 as its ending, then 4 from the second call."
   ],
   [
    "If the user types 5, what does print(input() * 2) show?",
    "55, because input() returns the string \"5\" and * replicates it."
   ],
   [
    "What does int(input()) do when the user types 7.0?",
    "It raises ValueError, because int() cannot parse a string containing a decimal point."
   ]
  ]
 },
 {
  "t": "If, if-else and if-elif-else statements, and why the order of elif conditions matters",
  "body": [
   "Conditional statements let a program choose what to do based on data. The simplest form is `if`: a header line with a condition and a colon, followed by an indented block. If the condition is true, the block runs; if not, Python skips it and carries on after the block.",
   "Adding `else` gives a two-way choice. The `else:` line sits at the same indentation as its `if` and has no condition of its own; its block runs exactly when the `if` condition is false. One of the two blocks always runs, never both.",
   "For more than two paths, use `elif` (short for \"else if\"). Python tests the `if` condition first, then each `elif` condition in order from top to bottom. As soon as one condition is true, its block runs and the whole statement is finished; no later conditions are even evaluated. An optional final `else` catches every case where nothing matched. You can have any number of `elif` branches but at most one `else`, and it must come last.",
   "```python\nscore = 85\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"   # this runs; the rest are skipped\nelif score >= 70:\n    grade = \"C\"\nelse:\n    grade = \"F\"\nprint(grade)       # B\n```",
   "Because only the first true branch runs, the order of `elif` conditions matters whenever conditions overlap. In the grading example, a score of 95 also satisfies `score >= 80` and `score >= 70`, but it gets an A because that test comes first. If you reversed the order and checked `score >= 70` first, every passing score would get a C and the A and B branches would never be reachable. The rule of thumb: with overlapping ranges, test the most specific or most restrictive condition first.",
   "Compare that with a series of separate `if` statements. Each independent `if` is tested on its own, so several blocks can run. Exam questions often show both versions side by side and ask how many lines are printed. With `if` followed by `elif`, at most one block runs; with `if` followed by `if`, every true condition runs its block.",
   "Conditions do not have to be comparisons. Any expression works, and Python evaluates its truthiness, so `if items:` means \"if the list is not empty\". The body may be one or more statements; a short body may also be written on the header line, as in `if x: print(x)`, though PEP 8 discourages that."
  ],
  "terms": [
   [
    "if statement",
    "Runs its indented block only when its condition is true."
   ],
   [
    "elif",
    "An extra condition tested only if all earlier conditions in the same statement were false."
   ],
   [
    "else",
    "The branch that runs when no earlier if or elif condition was true; it takes no condition."
   ],
   [
    "Overlapping conditions",
    "Conditions that can be true at the same time, which makes the order of elif branches significant."
   ]
  ],
  "example": "A shipping script checks weight > 20 for freight, then weight > 5 for a parcel, else a letter. If a developer moves the weight > 5 test first, a 30 kg crate is charged as a parcel, because the first true branch wins and the freight branch is never reached.",
  "tip": "Count how many branches can run. An if-elif-else chain runs exactly one block (or none without else); a stack of separate ifs can run several. That single distinction answers many PCEP output questions.",
  "check": [
   [
    "With x = 15, what does if x > 10: print(\"A\") elif x > 5: print(\"B\") print?",
    "Only A. The first true branch runs and the elif is not evaluated."
   ],
   [
    "Can an if statement have two else clauses?",
    "No. It may have many elif branches but at most one else, which must be last."
   ],
   [
    "Why check score >= 90 before score >= 80?",
    "Because the ranges overlap; testing >= 80 first would capture scores of 90 and above and the A branch would never run."
   ]
  ]
 },
 {
  "t": "Multiple conditions with and, or and not; truthy and falsy values",
  "body": [
   "Real decisions often depend on more than one fact, so Python lets you combine conditions with the logical operators `and`, `or` and `not`. `a and b` is true only when both are true. `a or b` is true when at least one is true. `not a` flips a value. For example, `if age >= 18 and has_ticket:` requires both, while `if day == \"Sat\" or day == \"Sun\":` accepts either.",
   "Priority matters: `not` is applied first, then `and`, then `or`, and all three come after the comparison operators. So `a or b and c` means `a or (b and c)`, and `not x > 3` means `not (x > 3)`. Use parentheses when you mix `and` and `or` so the reader does not have to remember.",
   "Every value in Python can be used as a condition. Values that count as false are called falsy: `False`, `None`, `0`, `0.0`, the empty string `\"\"`, and empty collections such as `[]`, `()`, `{}` and `range(0)`. Everything else is truthy, including negative numbers, the string `\"0\"` and a list containing `[0]`. That is why `if name:` is a common way to check that a string is not empty.",
   "`and` and `or` short-circuit, and they return one of their operands, not necessarily a Boolean. `a and b` evaluates `a`; if `a` is falsy it returns `a` immediately without evaluating `b`; otherwise it returns `b`. `a or b` evaluates `a`; if `a` is truthy it returns `a`; otherwise it returns `b`. `not` always returns a real `True` or `False`.",
   "```python\nprint(0 and 5)       # 0   (first falsy value)\nprint(3 and 5)       # 5   (all truthy: last value)\nprint(\"\" or \"guest\") # guest\nprint(not [])        # True\nprint(None or 0)     # 0   (nothing truthy: last value)\n```",
   "Short-circuiting is useful for safety. In `if n != 0 and total / n > 2:`, the division only happens when `n` is not zero, so no `ZeroDivisionError` can occur. Likewise `name = user_input or \"guest\"` supplies a default when the input is empty.",
   "A common beginner error is `if x == 1 or 2:`. It reads naturally in English but Python parses it as `(x == 1) or 2`, and since 2 is truthy the condition is always true. Write `if x == 1 or x == 2:` or `if x in (1, 2):` instead."
  ],
  "terms": [
   [
    "Truthy",
    "Any value that counts as true in a condition, such as non-zero numbers and non-empty collections."
   ],
   [
    "Falsy",
    "A value that counts as false: False, None, zero and empty strings or collections."
   ],
   [
    "Short-circuit evaluation",
    "and and or stop evaluating as soon as the result is known."
   ],
   [
    "Logical operator",
    "and, or or not, used to combine or invert conditions."
   ]
  ],
  "example": "A login form uses display = nickname or email. If the user left nickname blank, the empty string is falsy, so display becomes the email address; otherwise the nickname is shown, with no if statement needed.",
  "tip": "When an exam prints the result of and or or, do not answer True or False automatically. and returns the first falsy operand (or the last one); or returns the first truthy operand (or the last one).",
  "check": [
   [
    "What does print(5 or 0) show?",
    "5, because or returns the first truthy operand."
   ],
   [
    "What does print([] and 7) show?",
    "[], because the empty list is falsy and and returns it without evaluating 7."
   ],
   [
    "Why is if x == 3 or 4: always true?",
    "It is parsed as (x == 3) or 4, and 4 is truthy."
   ]
  ]
 },
 {
  "t": "Nested conditional statements and indentation",
  "body": [
   "A nested conditional is an `if` statement placed inside the block of another `if`, `elif` or `else`. You use nesting when a second decision only makes sense after the first one has been made: first check that a user is logged in, then, only for logged-in users, check whether they are an administrator.",
   "In Python, indentation alone shows which block a line belongs to. Each level of nesting adds one more level of indentation, conventionally four spaces. The inner `if` is indented under the outer header, and the inner block is indented once more. When a line returns to an earlier level, it has left the inner block.",
   "```python\nage = 20\nmember = False\nif age >= 18:\n    if member:\n        print(\"Adult member price\")\n    else:\n        print(\"Adult price\")      # this runs\nelse:\n    print(\"Child price\")\nprint(\"Done\")                      # always runs\n```",
   "The position of `else` decides which `if` it belongs to. An `else` pairs with the `if` at exactly the same indentation. In the example, the first `else` (indented four spaces) belongs to `if member:`, while the second (at the left margin) belongs to `if age >= 18:`. Move an `else` left or right by one level and the program's meaning changes completely, even though every word is the same. Exam questions often test exactly this, so trace the columns carefully.",
   "Nesting and logical operators can often express the same thing. `if a: if b: ...` with no `else` branches is equivalent to `if a and b:`. The flat form is usually easier to read. Nesting is the better choice when each level has its own `else` or does different work, as in the pricing example. Deep nesting (four or more levels) is a sign the code could be simplified, for example with `elif` or by moving part of it into a function.",
   "Indentation errors are common with nesting. Lines inside the same block must line up exactly. If an inner block is indented with a different number of spaces than its sibling lines, Python raises `IndentationError`. If you forget to indent the inner `if` itself, it becomes a separate statement at the outer level and runs regardless of the outer condition, which is a logic error rather than a syntax error.",
   "To predict output, trace from the top: evaluate the outer condition, pick the matching block, then evaluate any conditions inside it, ignoring every branch you did not enter."
  ],
  "terms": [
   [
    "Nested conditional",
    "An if statement inside the block of another conditional branch."
   ],
   [
    "Indentation level",
    "The column at which a line starts; it defines which block the line belongs to."
   ],
   [
    "Dangling else",
    "The question of which if an else belongs to; in Python, the one at the same indentation."
   ]
  ],
  "example": "A thermostat script checks if heating_on:, and inside that, if temp < 18: to turn the boiler up, else: to hold. A developer accidentally dedents the inner else, attaching it to the outer if, so the boiler is told to hold whenever heating is off. The code runs, but the logic is wrong.",
  "tip": "Line up else and elif with their if using the indentation column, not the order they appear in. The same words at a different indent produce a different program.",
  "check": [
   [
    "When is if a: followed by an indented if b: equivalent to if a and b:?",
    "When neither level has an else or elif branch and nothing else is in the outer block."
   ],
   [
    "Which if does an else belong to?",
    "The if at the same indentation level directly above it in the same block."
   ],
   [
    "What error do you get if two lines in the same inner block have different indentation?",
    "IndentationError, a subclass of SyntaxError, before the program runs."
   ]
  ]
 },
 {
  "t": "The pass instruction as a placeholder body",
  "body": [
   "Python requires every compound statement header (a line ending in a colon, such as `if`, `elif`, `else`, `while`, `for`, `def`, `class`, `try` or `except`) to be followed by at least one indented statement. Sometimes you have nothing to put there yet, or deliberately want nothing to happen. Leaving the block empty is a syntax error: `IndentationError: expected an indented block`. A comment does not help, because the interpreter ignores comments and the block is still empty.",
   "The `pass` keyword solves this. It is a statement that does nothing at all. It exists purely to fill a place where the syntax needs a statement. When Python reaches `pass`, it simply continues with the next line.",
   "```python\nfor n in range(5):\n    pass            # loop runs 5 times, doing nothing\n\ndef save_report():\n    pass            # to be written later\n\nif error_count == 0:\n    pass            # nothing to do in the normal case\nelse:\n    print(\"Errors found\")\n```",
   "Common uses include stubs while you are planning a program (define all your function names with `pass` bodies, then fill them in one by one), empty branches where one case needs no action, and in the exceptions domain, an `except` block that deliberately ignores an error, although silently ignoring errors is usually a bad idea.",
   "Do not confuse `pass` with `continue` or `break`. Inside a loop, `pass` does nothing and execution carries on with the rest of the current iteration. `continue` skips the rest of the current iteration and moves on to the next one. `break` leaves the loop completely. So a line after `pass` in the same loop body still runs, but a line after `continue` does not.",
   "```python\nfor i in range(3):\n    if i == 1:\n        pass\n    print(i)        # prints 0, 1, 2\n```",
   "In that loop, replacing `pass` with `continue` would print only 0 and 2. The exam uses this contrast often. Also note that `pass` is a keyword, so it cannot be a variable name, and that a function whose body is only `pass` returns `None` when called."
  ],
  "terms": [
   [
    "pass",
    "A keyword statement that does nothing, used where syntax requires a statement."
   ],
   [
    "Stub",
    "A placeholder function or block, often with a pass body, to be completed later."
   ],
   [
    "Empty block error",
    "IndentationError: expected an indented block, raised when a colon header has no body."
   ]
  ],
  "example": "While designing a to-do app, you sketch def add_task():, def remove_task(): and def list_tasks(): each with a pass body. The file runs without errors, so you can build and test the menu loop before writing the real functions.",
  "tip": "pass does not skip or exit anything; the code after it in the same block still runs. If an answer choice treats pass like continue, it is wrong.",
  "check": [
   [
    "Can a comment alone serve as the body of an if?",
    "No. Comments are ignored, so the block is still empty and Python raises IndentationError; use pass."
   ],
   [
    "What does a function with body pass return?",
    "None, like any function that ends without a return statement."
   ],
   [
    "In a loop, what is the difference between pass and continue?",
    "pass does nothing and execution continues with the next line; continue skips the rest of the iteration and starts the next one."
   ]
  ]
 },
 {
  "t": "While loops, loop conditions and avoiding infinite loops",
  "body": [
   "A `while` loop repeats a block as long as its condition is true. Python checks the condition before each pass (iteration). If it is true, the body runs, then Python goes back and checks again. When it is false, the loop ends and execution continues after the block. If the condition is false the very first time, the body never runs at all.",
   "```python\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"Liftoff\")   # prints 3, 2, 1, Liftoff\n```",
   "A well-formed `while` loop has three parts: something set up before the loop (here `count = 3`), a condition that depends on it (`count > 0`), and a change inside the body that eventually makes the condition false (`count -= 1`). Use `while` when you do not know in advance how many iterations you need, for example repeating until the user types `quit` or until a value converges.",
   "An infinite loop is a loop whose condition never becomes false. The usual causes are forgetting to update the loop variable, updating it in the wrong direction (`count += 1` when counting down), or using a condition that the update skips over, such as `while x != 10:` with `x += 3` starting from 0, which jumps from 9 to 12. Using `<` or `>` instead of `!=` makes the loop more robust. If you start an infinite loop in the console, press Ctrl+C, which raises `KeyboardInterrupt` and stops the program.",
   "Sometimes an infinite loop is intentional. `while True:` runs forever unless something inside it stops it, typically `break` when a goal is reached. This pattern is common for menus and input validation: keep asking until the input is valid, then break out.",
   "```python\nwhile True:\n    answer = input(\"Type yes or no: \")\n    if answer in (\"yes\", \"no\"):\n        break\nprint(\"Thanks\")\n```",
   "Any truthy or falsy value can be a condition. `while items:` runs while a list is not empty, which works nicely with `items.pop()`. `while n:` runs until `n` becomes 0. To count iterations for an exam question, write down the variable's value at each check of the condition, including the final check that fails, and count how many times the body ran."
  ],
  "terms": [
   [
    "while loop",
    "A loop that repeats its body as long as its condition is true, checking before each iteration."
   ],
   [
    "Iteration",
    "One execution of a loop's body."
   ],
   [
    "Infinite loop",
    "A loop whose condition never becomes false, so it runs until interrupted or broken out of."
   ],
   [
    "KeyboardInterrupt",
    "The exception raised when the user presses Ctrl+C, used to stop a runaway program."
   ]
  ],
  "example": "A savings script loops while balance < goal, adding a monthly deposit and counting months. If the deposit is accidentally set to 0, the balance never changes and the loop is infinite; adding a check that the deposit is positive before the loop prevents it.",
  "tip": "Count carefully: a while loop's condition is checked one more time than the body runs. Also watch for != conditions that a step can jump over.",
  "check": [
   [
    "How many times does the body of i = 0; while i < 5: i += 2 run?",
    "3 times, with i equal to 0, 2 and 4 at the checks that pass; the check with i = 6 fails."
   ],
   [
    "What happens with n = 0 followed by while n: print(n)?",
    "Nothing is printed; 0 is falsy, so the body never runs."
   ],
   [
    "How do you normally end a while True loop?",
    "With a break statement inside the body when some condition is met (or by an exception or return)."
   ]
  ]
 },
 {
  "t": "For loops over range() with start, stop and step, including negative steps and empty ranges",
  "body": [
   "A `for` loop runs its body once for each item in a sequence. To repeat something a known number of times, you usually loop over `range()`, which produces a series of integers on demand. The loop variable takes each value in turn.",
   "`range()` takes one, two or three integer arguments. `range(stop)` counts from 0 up to but not including `stop`: `range(4)` gives 0, 1, 2, 3. `range(start, stop)` counts from `start` up to but not including `stop`: `range(2, 5)` gives 2, 3, 4. `range(start, stop, step)` moves by `step` each time: `range(0, 10, 3)` gives 0, 3, 6, 9. The stop value is always excluded, which is the most important rule to remember.",
   "A negative step counts downward: `range(5, 0, -1)` gives 5, 4, 3, 2, 1 (still excluding the stop, 0), and `range(10, 0, -3)` gives 10, 7, 4, 1. To include 0 when counting down, use a stop of -1: `range(3, -1, -1)` gives 3, 2, 1, 0.",
   "An empty range produces no numbers at all, so a loop over it runs zero times without any error. This happens whenever you cannot reach the stop by moving in the step's direction: `range(0)`, `range(5, 2)` (default step +1 but stop is below start), `range(3, 3)` and `range(1, 5, -1)`. Exam questions often include an empty range and ask how many times the body runs; the answer is zero.",
   "```python\nfor i in range(2, 11, 4):\n    print(i, end=\" \")   # 2 6 10\nprint()\nfor i in range(5, 2):\n    print(\"never\")      # empty range\nprint(list(range(6, 0, -2)))  # [6, 4, 2]\n```",
   "All arguments must be integers. `range(1.5)` raises `TypeError`, and a step of 0 raises `ValueError`. To count how many values a range produces with a positive step, you can use the ceiling of (stop - start) / step when stop is greater than start; `len(range(0, 10, 3))` is 4. Wrapping a range in `list()` shows its values, which is useful in the REPL.",
   "If you do not need the loop variable, the convention is to name it `_`, as in `for _ in range(3): print(\"hi\")`."
  ],
  "terms": [
   [
    "range()",
    "Built-in that produces integers from start up to but not including stop, moving by step."
   ],
   [
    "Step",
    "The amount added each time; negative steps count downward and 0 is not allowed."
   ],
   [
    "Empty range",
    "A range that produces no values, such as range(5, 2), so a loop over it runs zero times."
   ],
   [
    "Loop variable",
    "The name that takes each successive value in a for loop."
   ]
  ],
  "example": "A countdown timer uses for s in range(10, 0, -1): print(s) and then prints Go. A developer who writes range(10, 0) instead gets an empty range and the countdown silently prints nothing, because the default step is +1.",
  "tip": "The stop value is never included, and a range that cannot move from start toward stop in the step's direction is empty, not an error.",
  "check": [
   [
    "What values does range(1, 8, 2) produce?",
    "1, 3, 5, 7."
   ],
   [
    "How many times does for i in range(4, 1): print(i) print?",
    "Zero times; the range is empty because the default step is +1 and 4 is already beyond 1."
   ],
   [
    "What does list(range(3, -2, -2)) give?",
    "[3, 1, -1]."
   ]
  ]
 },
 {
  "t": "Iterating over strings, lists and other sequences with for",
  "body": [
   "A `for` loop is not limited to numbers. It works with any iterable, meaning any object that can hand out its items one at a time. Strings, lists, tuples, dictionaries, sets and ranges are all iterable. The syntax is always `for name in iterable:`, and on each pass the name is bound to the next item.",
   "Looping over a string gives you its characters one at a time, as one-character strings. Looping over a list or tuple gives you each element in order. This is usually cleaner than looping over indexes.",
   "```python\nfor ch in \"cat\":\n    print(ch, end=\"-\")    # c-a-t-\nprint()\ncolours = [\"red\", \"green\", \"blue\"]\nfor c in colours:\n    print(c.upper())      # RED, GREEN, BLUE\n```",
   "If you need the position as well as the item, you have two options. The traditional one is `for i in range(len(colours)):` and then `colours[i]`. The more Pythonic one is `enumerate()`, which gives pairs of index and item: `for i, c in enumerate(colours):`. Both appear in exam code, so be able to read both.",
   "Assigning to the loop variable does not change the list. In `for x in nums: x = x * 2`, each `x` is just a name bound to an element; rebinding it has no effect on `nums`. To modify a list in place, loop over indexes and assign `nums[i] = nums[i] * 2`. Strings cannot be modified in place at all, because they are immutable; you build a new string instead, for example `result = result + ch.upper()`.",
   "Looping over a dictionary gives its keys by default. Looping over an empty sequence runs the body zero times. Adding items to or removing them from a list while looping over the same list causes confusing behaviour (skipped or repeated items), so loop over a copy, such as `for x in items[:]:`, if you must change it.",
   "Many exam questions accumulate something while iterating: counting vowels, summing numbers, or building a reversed string. Set up the accumulator before the loop (`total = 0` or `text = \"\"`), update it inside, and use it after. Forgetting to initialise it before the loop, or resetting it inside the loop, are the classic mistakes.",
   "```python\nvowels = 0\nfor ch in \"Programming\":\n    if ch in \"aeiou\":\n        vowels += 1\nprint(vowels)   # 3\n```"
  ],
  "terms": [
   [
    "Iterable",
    "An object whose items can be taken one at a time, such as a string, list, tuple, dict or range."
   ],
   [
    "enumerate()",
    "Built-in that yields (index, item) pairs while iterating."
   ],
   [
    "Accumulator",
    "A variable set before a loop and updated each iteration to build a total or result."
   ]
  ],
  "example": "A password checker loops for ch in password: and increments counters for digits with ch.isdigit() and uppercase letters with ch.isupper(). After the loop it reports whether each requirement was met, never touching indexes at all.",
  "tip": "Changing the loop variable never changes the sequence. If a question does for x in lst: x += 1 and then prints lst, the list is unchanged.",
  "check": [
   [
    "What does for ch in \"hi!\": print(ch) print?",
    "Three lines: h, i and !."
   ],
   [
    "After nums = [1, 2] and for n in nums: n = n * 10, what is nums?",
    "[1, 2]; rebinding the loop variable does not modify the list."
   ],
   [
    "What does iterating directly over a dictionary give you?",
    "Its keys."
   ]
  ]
 },
 {
  "t": "Break and continue, and how break affects only the innermost loop",
  "body": [
   "Normally a loop runs its whole body on every iteration and stops only when its condition fails or its sequence runs out. Two keywords let you change that from inside the body. `break` ends the loop immediately; execution jumps to the first statement after the loop. `continue` ends only the current iteration; the rest of the body is skipped and the loop moves on to its next iteration (a `while` loop re-checks its condition, a `for` loop takes the next item).",
   "```python\nfor n in range(1, 8):\n    if n == 3:\n        continue      # skip 3\n    if n == 6:\n        break         # stop completely at 6\n    print(n, end=\" \")\n# output: 1 2 4 5\n```",
   "Use `break` when you have found what you were looking for, or when continuing makes no sense, for example searching a list for the first negative number. Use `continue` to skip items that should not be processed, such as blank lines or invalid entries, without wrapping the rest of the body in an extra `if`.",
   "Both keywords are valid only inside a loop. Using them elsewhere is a `SyntaxError`. They affect the loop they are directly inside, and nothing else.",
   "That point matters with nested loops. `break` exits only the innermost loop that contains it. The outer loop carries on with its next iteration as if the inner loop had ended normally. Similarly, `continue` in an inner loop skips to the next iteration of the inner loop only.",
   "```python\nfor i in range(3):\n    for j in range(3):\n        if j == 1:\n            break      # leaves the j loop only\n        print(i, j)\n# prints 0 0, 1 0, 2 0\n```",
   "Here the inner loop always stops when `j` reaches 1, but the outer loop still runs three times, so three lines are printed. To stop both loops, you need an extra step: set a flag variable before breaking and check it in the outer loop (`if found: break`), or put the loops in a function and use `return`, which leaves the whole function at once.",
   "In a `while` loop, be careful where `continue` sits relative to the update. If the counter is incremented after a `continue`, the increment is skipped on that iteration and the loop can become infinite. Put the update before the `continue`, or at the top of the body."
  ],
  "terms": [
   [
    "break",
    "Immediately exits the innermost enclosing loop."
   ],
   [
    "continue",
    "Skips the rest of the current iteration and begins the next one of the innermost loop."
   ],
   [
    "Flag variable",
    "A Boolean set inside a loop to signal an event, such as found = True, checked later to stop an outer loop."
   ]
  ],
  "example": "A seat finder loops over rows and, inside, over seats. When it finds a free seat it breaks, but the outer row loop keeps going and later finds more seats. Setting found = True before the break and adding if found: break after the inner loop makes it stop at the first free seat.",
  "tip": "break never jumps out of two loops. When a nested-loop question uses break, only the inner loop stops; keep counting the outer loop's iterations.",
  "check": [
   [
    "A loop over range(5) executes continue when i % 2 is truthy and otherwise prints i. What is printed?",
    "0, 2 and 4, because odd values are skipped by continue."
   ],
   [
    "If break runs in an inner loop, what happens to the outer loop?",
    "It continues with its next iteration; only the innermost loop is exited."
   ],
   [
    "Why can continue cause an infinite while loop?",
    "If the loop variable is updated after the continue, that update is skipped, so the condition may never change."
   ]
  ]
 },
 {
  "t": "While-else and for-else: when the else clause runs and when break skips it",
  "body": [
   "Python lets a loop have an `else` clause, which surprises people who know `else` only from `if`. The `else` block is written at the same indentation as the `for` or `while` header and runs once, after the loop, if the loop finished normally. \"Normally\" means the `while` condition became false or the `for` loop ran out of items. If the loop was ended by `break`, the `else` block is skipped.",
   "```python\nfor n in [3, 7, 9]:\n    if n % 2 == 0:\n        print(\"Found even\", n)\n        break\nelse:\n    print(\"No even numbers\")   # runs: no break happened\n```",
   "The best way to read loop-else is as \"no break\". It is designed for search loops: you loop looking for something, `break` when you find it, and the `else` handles the \"not found\" case without needing a separate flag variable.",
   "Several details are testable. First, the `else` runs even if the loop body never executed: `for x in []:` followed by `else: print(\"done\")` prints `done`, and so does a `while` whose condition is false at the start. Second, `continue` does not skip the `else`; only `break` does (as do `return` from a function and an unhandled exception, which leave everything). Third, in nested loops, a `break` in the inner loop skips only the inner loop's `else`; the outer loop's `else` still depends on whether the outer loop itself was broken.",
   "```python\ni = 0\nwhile i < 3:\n    i += 1\nelse:\n    print(\"while ended, i =\", i)   # runs, i = 3\n\nfor k in range(5):\n    if k == 2:\n        break\nelse:\n    print(\"not printed\")\nprint(k)                            # 2\n```",
   "A common mistake is to think the `else` runs when the loop condition is false \"instead of\" the loop, as with `if`. It does not replace the loop; it follows it. If a `while` loop runs five times and then its condition fails, the `else` runs after those five iterations.",
   "Many programmers avoid loop-else because it confuses readers, but it is part of the PCEP syllabus. When tracing, ask one question after the loop finishes: did a `break` execute? If yes, skip the `else`; if no, run it."
  ],
  "terms": [
   [
    "Loop else clause",
    "A block after a for or while loop that runs only if the loop ended without break."
   ],
   [
    "Normal termination",
    "A loop ending because its condition became false or its items ran out."
   ],
   [
    "Search loop",
    "A loop that looks for an item and breaks when it finds it, often paired with else for the not-found case."
   ]
  ],
  "example": "A login script gives the user three attempts with for attempt in range(3):, breaking on a correct password. The else clause after the loop prints Account locked, which happens only when all three attempts were used without a break.",
  "tip": "Read else after a loop as \"if no break\". An empty loop still runs its else, and continue does not prevent it.",
  "check": [
   [
    "Does for x in range(0): pass followed by else: print(\"E\") print E?",
    "Yes. The loop ends normally (it simply had no items) and no break ran."
   ],
   [
    "If a for loop executes continue on every iteration, does its else run?",
    "Yes. Only break (or leaving via return or an exception) skips the else."
   ],
   [
    "When is the else of a while loop skipped?",
    "When the loop is exited with break."
   ]
  ]
 },
 {
  "t": "Nested loops and counting iterations",
  "body": [
   "A nested loop is a loop inside the body of another loop. For every single iteration of the outer loop, the inner loop runs from start to finish. Nested loops are how you work with two-dimensional data (rows and columns), generate every pair of items, or print patterns and tables.",
   "```python\nfor row in range(1, 4):\n    for col in range(1, 4):\n        print(row * col, end=\"\\t\")\n    print()   # new line after each row\n```",
   "That prints a 3 by 3 multiplication table. Notice the structure: the inner `print` uses `end=\"\\t\"` to keep values on one line, and the outer loop's own `print()` runs once per row, after the inner loop finishes. Which loop a statement belongs to is decided only by its indentation.",
   "Counting iterations is a favourite exam task. When the inner loop's range does not depend on the outer variable, the total number of inner-body executions is simply outer count multiplied by inner count: `for i in range(4): for j in range(3):` runs the inner body 12 times, and the outer body runs 4 times.",
   "When the inner range depends on the outer variable, you must add up each round separately. In `for i in range(4): for j in range(i):`, the inner loop runs 0, 1, 2 and 3 times, for a total of 6. In `for i in range(1, 4): for j in range(i, 4):` it runs 3, 2 and 1 times, again 6. Write the counts per outer value in a small table; do not try to do it in your head.",
   "```python\ncount = 0\nfor i in range(3):\n    for j in range(i, 3):\n        count += 1\nprint(count)   # 3 + 2 + 1 = 6\n```",
   "`break` and `continue` change the counts. A `break` in the inner loop ends only that run of the inner loop, so the outer loop keeps going. A `while` loop nested in a `for` (or the reverse) follows the same rules, but make sure the inner loop's control variable is reset inside the outer loop; if you set `j = 0` only once, before both loops, the inner `while` will run fully on the first outer pass and not at all afterwards.",
   "Nested loops multiply work quickly: two loops over 1,000 items each means a million inner iterations. That is fine for exercises, but it is why programmers look for ways to avoid unnecessary nesting in larger programs."
  ],
  "terms": [
   [
    "Nested loop",
    "A loop placed inside the body of another loop; the inner loop completes fully for each outer iteration."
   ],
   [
    "Outer loop",
    "The enclosing loop, which controls how many times the inner loop is started."
   ],
   [
    "Iteration count",
    "The total number of times a loop body runs, found by multiplying or summing per outer pass."
   ]
  ],
  "example": "A cinema seating chart loops for row in \"ABCDE\": and inside for seat in range(1, 11): to print labels like A1 to E10. The inner print runs 5 x 10 = 50 times, while the outer loop's newline print runs 5 times.",
  "tip": "If the inner range uses the outer variable, never multiply; list the inner count for each outer value and add them up.",
  "check": [
   [
    "How many times does print run in for i in range(3): for j in range(4): print(i, j)?",
    "12 times (3 x 4)."
   ],
   [
    "How many times does the inner body run in for i in range(1, 5): for j in range(i):?",
    "1 + 2 + 3 + 4 = 10 times."
   ],
   [
    "With a while loop inside a for loop, why reset the inner counter inside the outer loop?",
    "Otherwise the counter keeps its final value after the first pass and the inner while never runs again."
   ]
  ]
 },
 {
  "t": "The value of the loop variable after a for loop ends",
  "body": [
   "In Python, the loop variable of a `for` loop is an ordinary variable in the surrounding scope. It does not disappear when the loop ends. After the loop, it still holds the last value it was assigned. Many other languages behave differently, so this is a favourite PCEP trap.",
   "```python\nfor i in range(5):\n    pass\nprint(i)      # 4, not 5\n```",
   "Notice the value: 4, not 5. `range(5)` produces 0 to 4, and the loop variable is only ever bound to values the range produces. The stop value is never assigned. Compare this with a `while` loop that counts with `i += 1` while `i < 5`: there the variable ends at 5, because the final increment happens before the condition fails. Exam questions often put these two side by side.",
   "```python\ni = 0\nwhile i < 5:\n    i += 1\nprint(i)      # 5\n\nfor ch in \"code\":\n    pass\nprint(ch)     # e\n```",
   "If the loop is ended by `break`, the variable keeps the value it had when `break` ran. In `for n in range(10): if n * n > 20: break`, `n` is 5 afterwards, because 5 x 5 = 25 is the first square over 20.",
   "If the iterable is empty, the loop body never runs and the loop variable is never assigned. If the name did not exist before, using it afterwards raises `NameError`. If it already existed, it keeps its old value. For example, with `x = 99` followed by `for x in []: pass`, `x` is still 99.",
   "Assigning to the loop variable inside the body does not affect the next iteration of a `for` loop. In `for i in range(3): i = 10`, the next iteration still gets the next value from the range, and after the loop `i` is 10, because the last thing done to it was the assignment in the final iteration. The iterable decides each new value; your assignments only last until the next iteration starts.",
   "When tracing, keep one column for the loop variable and update it at the top of each iteration and at every assignment. Its final entry is the answer."
  ],
  "terms": [
   [
    "Loop variable scope",
    "In Python a for loop's variable remains defined after the loop, holding its last value."
   ],
   [
    "Last assigned value",
    "For range(n), the loop variable ends at n - 1, not n."
   ],
   [
    "NameError",
    "Raised if you use a loop variable that was never assigned because the loop ran zero times."
   ]
  ],
  "example": "A script searches a list with for idx in range(len(items)):, breaking when it finds a match, then prints items[idx]. If no match exists, idx is the last index, not a not-found marker, so the program wrongly reports the last item. A for-else or a found flag fixes it.",
  "tip": "After for i in range(n), i is n - 1; after a counting while loop, the counter is usually n. After an empty for loop, the variable is unchanged or undefined.",
  "check": [
   [
    "What is printed by for k in range(2, 9, 3): pass followed by print(k)?",
    "8. The range yields 2, 5, 8, so the last value assigned is 8."
   ],
   [
    "What happens with for z in range(0): pass then print(z), if z was never defined?",
    "NameError, because the empty loop never assigned z."
   ],
   [
    "After for i in range(4): i *= 2, what is i?",
    "6. The last iteration gets i = 3 from the range and then doubles it."
   ]
  ]
 },
 {
  "t": "Lists: building, indexing (including negative indexes) and slicing",
  "body": [
   "A list is an ordered, changeable (mutable) collection of values. You write it with square brackets and commas: `nums = [10, 20, 30]`. A list may contain values of mixed types, duplicates and even other lists. An empty list is `[]` or `list()`. You can also build one from any iterable, so `list(\"abc\")` is `['a', 'b', 'c']` and `list(range(3))` is `[0, 1, 2]`.",
   "Indexing selects one element by position with square brackets. Positions start at 0, so in `nums = [10, 20, 30]`, `nums[0]` is 10 and `nums[2]` is 30. Negative indexes count from the end: `nums[-1]` is the last element (30), `nums[-2]` is the second last. Index `-len(nums)` is the first element. Any index outside the range from `-len` to `len - 1` raises `IndexError: list index out of range`. Because lists are mutable, you can assign through an index: `nums[1] = 99` changes the list to `[10, 99, 30]`.",
   "Slicing extracts a part of a list as a new list, using `lst[start:stop:step]`. Like `range()`, the start is included and the stop is excluded. Omitting start means \"from the beginning\", omitting stop means \"to the end\", and step defaults to 1. Negative values work in all three positions.",
   "```python\nx = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nprint(x[1:3])    # ['b', 'c']\nprint(x[:2])     # ['a', 'b']\nprint(x[-2:])    # ['d', 'e']\nprint(x[::2])    # ['a', 'c', 'e']\nprint(x[::-1])   # ['e', 'd', 'c', 'b', 'a']\nprint(x[3:1])    # []\n```",
   "Slices are forgiving where indexes are strict. A slice with positions beyond the end never raises an error; it just stops at the edge, so `x[2:100]` is `['c', 'd', 'e']`. If start is at or after stop (with a positive step), the result is an empty list, as `x[3:1]` shows. With a negative step, the slice moves right to left, so start should be to the right of stop: `x[4:1:-1]` is `['e', 'd', 'c']`.",
   "Slices can also be assigned to and deleted, which changes the original list: `x[1:3] = [\"B\"]` replaces two items with one, giving `['a', 'B', 'd', 'e']`. A slice read, by contrast, always produces a new list and leaves the original alone, which is why `x[:]` is a common way to copy a list.",
   "Finally, remember that a single index returns an element, while a slice always returns a list, even if it contains one item: `x[0]` is `'a'` but `x[0:1]` is `['a']`."
  ],
  "terms": [
   [
    "List",
    "An ordered, mutable sequence written in square brackets."
   ],
   [
    "Index",
    "An element's position, starting at 0; negative indexes count from the end, -1 being the last."
   ],
   [
    "Slice",
    "A sub-list taken with [start:stop:step], including start and excluding stop."
   ],
   [
    "IndexError",
    "Raised when an index is outside the valid range of a sequence."
   ]
  ],
  "example": "A weather app keeps temps = [18, 21, 19, 24, 22, 20, 17] for the week. temps[-1] is today's reading, temps[-3:] gives the last three days for a trend, and temps[::-1] lists the week newest first.",
  "tip": "Indexes out of range raise IndexError, but slices out of range quietly return what exists, possibly an empty list. A one-item slice is still a list.",
  "check": [
   [
    "For a = [1, 2, 3, 4, 5], what is a[-4:-1]?",
    "[2, 3, 4]; start at index -4 (value 2), stop before index -1 (value 5)."
   ],
   [
    "What does a[10] do for a five-item list, and what does a[10:] do?",
    "a[10] raises IndexError; a[10:] returns an empty list."
   ],
   [
    "What is the difference between a[0] and a[:1]?",
    "a[0] is the first element itself; a[:1] is a new list containing that element."
   ]
  ]
 },
 {
  "t": "List methods and functions: append(), insert(), index(), remove(), sort(), len(), sorted(), del",
  "body": [
   "Lists come with methods, which you call with dot notation on the list itself, and they also work with several general built-in functions and statements. The difference matters: methods like `append()` usually change the list in place and return `None`, while functions like `sorted()` leave the list alone and return something new.",
   "`lst.append(x)` adds one item to the end. If `x` is itself a list, it is added as a single nested element, so `[1, 2].append([3, 4])` gives `[1, 2, [3, 4]]`. `lst.insert(i, x)` puts `x` at position `i`, shifting later items right. An index beyond the end simply appends, and a negative index inserts before that position counted from the end: `insert(-1, x)` places `x` just before the last item.",
   "`lst.index(x)` returns the position of the first occurrence of `x`, and raises `ValueError` if `x` is not in the list. `lst.remove(x)` deletes the first occurrence of the value `x` (not the item at index `x`) and also raises `ValueError` if it is absent. The `del` statement removes by position: `del lst[0]` removes the first item, `del lst[1:3]` removes a slice, and `del lst` deletes the variable itself, so using `lst` afterwards raises `NameError`.",
   "```python\nx = [3, 1, 2]\nx.append(5)        # [3, 1, 2, 5]\nx.insert(0, 9)     # [9, 3, 1, 2, 5]\nx.remove(1)        # [9, 3, 2, 5]\ndel x[-1]          # [9, 3, 2]\nprint(x.index(2), len(x))  # 2 3\n```",
   "`lst.sort()` sorts the list in place, ascending by default, or descending with `sort(reverse=True)`. It returns `None`, so `y = x.sort()` leaves `y` equal to `None`, a very common trap. `sorted(iterable)` is a built-in function that returns a new sorted list and leaves the original unchanged; it works on any iterable, including strings and tuples, and also accepts `reverse=True`. Sorting a list that mixes numbers and strings raises `TypeError` because they cannot be compared. Related in-place method: `lst.reverse()` reverses order and also returns `None`.",
   "`len(lst)` returns the number of top-level items. A nested list counts as one item, so `len([1, [2, 3]])` is 2. You will often see `len()` combined with indexes, as in `lst[len(lst) - 1]`, which is the last item.",
   "Other handy tools: `lst.pop()` removes and returns the last item (or `pop(i)` for position `i`), `lst.count(x)` counts occurrences, and `min()`, `max()` and `sum()` work on lists of numbers."
  ],
  "terms": [
   [
    "append()",
    "Adds one item to the end of a list, in place."
   ],
   [
    "insert(i, x)",
    "Inserts x before position i, shifting later items to the right."
   ],
   [
    "remove(x) vs del",
    "remove deletes the first matching value; del deletes by index or slice."
   ],
   [
    "sort() vs sorted()",
    "sort() orders the list in place and returns None; sorted() returns a new sorted list."
   ]
  ],
  "example": "A leaderboard stores scores = [40, 75, 60]. To display without disturbing the original, it prints sorted(scores, reverse=True). When a new score arrives it calls scores.append(88), and when a cheat is detected it calls scores.remove(75).",
  "tip": "Methods that change a list in place (append, insert, remove, sort, reverse) return None. If an answer prints the result of x.sort(), it prints None.",
  "check": [
   [
    "What is x after x = [1, 2, 3] and x.insert(1, 7)?",
    "[1, 7, 2, 3]."
   ],
   [
    "What does print([3, 1, 2].sort()) show?",
    "None, because sort() sorts in place and returns None."
   ],
   [
    "For x = [5, 6, 5], what do x.remove(5) and del x[0] each do?",
    "remove(5) deletes the first 5, giving [6, 5]; del x[0] deletes the item at index 0, which here also gives [6, 5]; one works by value, the other by position."
   ]
  ]
 },
 {
  "t": "Iterating through lists, in and not in, list comprehensions with conditions",
  "body": [
   "The most common thing to do with a list is to process each item. A `for` loop over the list gives you each element directly: `for price in prices: total += price`. If you also need positions, loop over `range(len(prices))` or use `enumerate(prices)`. When you need to change items in place, use the index form, because assigning to the loop variable does not modify the list.",
   "The membership operators `in` and `not in` test whether a value appears in a list and return `True` or `False`. `3 in [1, 2, 3]` is `True`; `\"x\" not in [\"a\", \"b\"]` is also `True`. They compare with `==`, so `1.0 in [1, 2]` is `True`. They only look at top-level items: `2 in [[1, 2], 3]` is `False`, because the list contains a list and a 3, not a 2. The same operators work with strings (`\"ell\" in \"hello\"` checks for a substring), tuples and dictionary keys.",
   "A list comprehension builds a new list from an iterable in a single expression. The pattern is `[expression for item in iterable]`. It is equivalent to creating an empty list and appending the expression inside a loop, but shorter.",
   "```python\nsquares = [n * n for n in range(5)]\nprint(squares)      # [0, 1, 4, 9, 16]\nevens = [n for n in range(10) if n % 2 == 0]\nprint(evens)        # [0, 2, 4, 6, 8]\n```",
   "Adding an `if` clause at the end filters items: only those for which the condition is true are included. Read `[n for n in range(10) if n % 2 == 0]` as \"n, for each n in range(10), if n is even\". The loop version would be `evens = []`, then `for n in range(10): if n % 2 == 0: evens.append(n)`.",
   "You may also see a conditional expression at the front, which transforms every item instead of filtering: `[\"even\" if n % 2 == 0 else \"odd\" for n in range(3)]` gives `['even', 'odd', 'even']`. The difference is important. An `if` after the `for` decides whether an item is included, and has no `else`. An `if ... else` before the `for` decides what value each item becomes, and must have an `else`.",
   "Comprehensions can also be nested, as in `[[0] * 3 for _ in range(2)]`, which makes a 2 by 3 grid of zeros. In Python 3 the comprehension's loop variable does not leak out: after `[i for i in range(3)]`, a name `i` defined only there does not exist, unlike a normal `for` loop."
  ],
  "terms": [
   [
    "in / not in",
    "Membership operators that test whether a value is (or is not) an item of a sequence."
   ],
   [
    "List comprehension",
    "An expression such as [x * 2 for x in data] that builds a new list from an iterable."
   ],
   [
    "Filter clause",
    "The trailing if in a comprehension, which includes only items meeting the condition."
   ]
  ],
  "example": "An online shop has sizes = [\"S\", \"M\", \"XL\"]. Before accepting an order it checks if choice not in sizes: to reject bad input, and it builds a price list with [p * 0.9 for p in prices if p > 50] to show discounted prices only for expensive items.",
  "tip": "A trailing if filters (fewer items, no else allowed); a leading if-else transforms (same number of items, else required). Also remember that in does not search inside nested lists.",
  "check": [
   [
    "What does [c for c in \"banana\" if c != \"a\"] produce?",
    "['b', 'n', 'n']."
   ],
   [
    "Is 2 in [[2], 3] True or False?",
    "False; the top-level items are [2] and 3, and neither equals 2."
   ],
   [
    "How many items does [x if x > 0 else 0 for x in [-1, 5, -3]] have?",
    "Three: [0, 5, 0]. A leading if-else transforms every item rather than filtering."
   ]
  ]
 },
 {
  "t": "Copying vs aliasing lists: b = a compared with a[:] or list(a)",
  "body": [
   "In Python, a variable does not contain a list; it holds a reference to a list object stored somewhere in memory. This small fact explains one of the most tested behaviours on the PCEP exam. When you write `b = a` where `a` is a list, Python does not copy anything. It makes `b` refer to the very same list object. Now `a` and `b` are two names (aliases) for one list, and a change made through either name is visible through the other.",
   "```python\na = [1, 2, 3]\nb = a          # alias, not a copy\nb.append(4)\nprint(a)       # [1, 2, 3, 4]\nprint(a is b)  # True\n```",
   "To get an independent list, make a copy. Three common ways produce a new list with the same items: slicing the whole list with `a[:]`, calling `list(a)`, and calling the method `a.copy()`. After `c = a[:]`, `c` is a different object, so `c.append(99)` leaves `a` unchanged. You can check with the identity operator: `a is c` is `False`, while `a == c` is `True` right after copying, because `==` compares contents and `is` compares identity.",
   "```python\na = [1, 2, 3]\nc = a[:]\nc[0] = 100\nprint(a, c)    # [1, 2, 3] [100, 2, 3]\n```",
   "Watch for operations that rebind a name instead of mutating the list. After `b = a`, the statement `b = b + [5]` creates a brand-new list and binds `b` to it, so `a` is not affected. But `b += [5]` on a list mutates it in place (it behaves like `extend`), so `a` does change. Similarly, `b.append(5)`, `b[0] = 5`, `b.sort()` and `del b[0]` all mutate the shared object.",
   "These copies are shallow. The new outer list is independent, but if the items are themselves lists, both copies point to the same inner lists. For `m = [[1, 2], [3, 4]]` and `n = m[:]`, the assignment `n[0][0] = 9` changes `m` too, because `n[0]` and `m[0]` are the same inner list. Appending a new row to `n` does not affect `m`. For fully independent nested structures, the standard library offers `copy.deepcopy()`, which you only need to recognise at this level.",
   "Aliasing also happens when you pass a list to a function: the parameter is another name for the caller's list, so a function that appends to its parameter changes the caller's list. That is the same rule, not a special case.",
   "Immutable values such as numbers, strings and tuples do not show this surprise, because they cannot be changed in place; any \"change\" produces a new object."
  ],
  "terms": [
   [
    "Alias",
    "A second name bound to the same object, created by plain assignment such as b = a."
   ],
   [
    "Shallow copy",
    "A new outer list whose items are the same objects as the original's, made with a[:], list(a) or a.copy()."
   ],
   [
    "is vs ==",
    "is tests whether two names refer to the same object; == tests whether their values are equal."
   ],
   [
    "Mutation",
    "Changing an object in place, which is visible through every alias of it."
   ]
  ],
  "example": "A teacher stores backup = grades before curving scores in grades with a loop. Afterwards backup shows the curved scores too, because it was only an alias. Using backup = grades[:] would have kept the original scores safe.",
  "tip": "b = a never copies a list. If a question mutates b after that line, a changes as well. Slices, list() and copy() make new outer lists, but nested lists inside are still shared.",
  "check": [
   [
    "After a = [1]; b = a; b = b + [2], what is a?",
    "[1]. b + [2] creates a new list and rebinds b, so a is unaffected."
   ],
   [
    "After a = [1]; b = a; b += [2], what is a?",
    "[1, 2]. += mutates the list in place, and b is an alias of a."
   ],
   [
    "For x = [[0], [0]] and y = x[:], does y[1][0] = 5 change x?",
    "Yes. The slice copies only the outer list, so y[1] and x[1] are the same inner list."
   ]
  ]
 },
 {
  "t": "Nested lists and matrices (list of lists)",
  "body": [
   "A list can contain other lists. A list whose items are all lists of the same length is a convenient way to represent a matrix or grid: a table with rows and columns, such as a game board, a seating plan or a spreadsheet of numbers. Each inner list is one row.",
   "```python\ngrid = [\n    [1, 2, 3],\n    [4, 5, 6]\n]\nprint(grid[1])      # [4, 5, 6]  (second row)\nprint(grid[1][2])   # 6          (row 1, column 2)\nprint(len(grid), len(grid[0]))  # 2 3\n```",
   "Indexing uses two sets of brackets, applied left to right. `grid[1]` picks the row, then `[2]` picks the element inside that row. So `grid[r][c]` means row `r`, column `c`. Negative indexes work at both levels: `grid[-1][-1]` is the bottom-right element. `len(grid)` gives the number of rows, and `len(grid[0])` the number of columns in the first row. You can assign to an element, as in `grid[0][0] = 99`.",
   "To visit every element, use nested loops: the outer loop over rows, the inner loop over the items of each row. With `for row in grid: for value in row:` you get each value in reading order. If you need positions, use `for r in range(len(grid)): for c in range(len(grid[r])):`.",
   "Comprehensions are the neat way to build a grid: `[[0] * 3 for _ in range(2)]` creates two separate rows of three zeros. `[[r * c for c in range(3)] for r in range(3)]` builds a small multiplication table. A diagonal, where row index equals column index, can be read with `[grid[i][i] for i in range(len(grid))]`.",
   "There is one serious trap. `[[0] * 3] * 2` looks like it builds the same grid, but the outer `* 2` repeats a reference to the same inner list twice. Changing one row then changes both: after `bad = [[0] * 3] * 2` and `bad[0][0] = 1`, `bad` is `[[1, 0, 0], [1, 0, 0]]`. The comprehension version creates a new inner list on every iteration, so the rows are independent. (Using `* 3` on the inner `[0]` is fine, because integers are immutable.)",
   "Rows do not have to be the same length; a \"jagged\" list such as `[[1], [2, 3], [4, 5, 6]]` is legal. Code that assumes equal lengths, like `len(grid[0])`, may then give wrong results or `IndexError`. Nesting can go deeper too, for a three-dimensional structure, and each extra level adds another pair of brackets: `cube[z][y][x]`."
  ],
  "terms": [
   [
    "Nested list",
    "A list that contains other lists as items."
   ],
   [
    "Matrix",
    "A rectangular grid of values, represented in Python as a list of equal-length row lists."
   ],
   [
    "Double indexing",
    "grid[r][c]: the first index picks the row, the second picks the item in that row."
   ],
   [
    "Shared-row trap",
    "[[0] * n] * m repeats one inner list m times, so all rows change together."
   ]
  ],
  "example": "A tic-tac-toe game stores board = [[\" \"] * 3 for _ in range(3)]. When a player chooses row 2, column 0, the code sets board[2][0] = \"X\", then checks each row, column and the two diagonals for three matching marks.",
  "tip": "grid[1][2] is row 1, column 2, both counted from 0. And [[0] * 3] * 3 creates three references to one row, so a single assignment appears in every row.",
  "check": [
   [
    "For m = [[1, 2], [3, 4], [5, 6]], what is m[2][0] and len(m)?",
    "m[2][0] is 5 and len(m) is 3 (the number of rows)."
   ],
   [
    "What does x = [[0] * 2] * 2; x[0][1] = 7; print(x) show?",
    "[[0, 7], [0, 7]], because both rows are the same list object."
   ],
   [
    "How do you build a 3 x 4 grid of zeros with independent rows?",
    "[[0] * 4 for _ in range(3)] (or [[0 for c in range(4)] for r in range(3)])."
   ]
  ]
 },
 {
  "t": "Tuples: building (including one-item tuples), indexing, slicing, immutability and tuples vs lists",
  "body": [
   "A tuple is an ordered sequence like a list, but immutable: once created, its items cannot be added, removed or replaced. You usually write a tuple with parentheses and commas, `point = (3, 4)`, but it is actually the comma that makes a tuple. `t = 1, 2, 3` (tuple packing) creates a tuple without parentheses. An empty tuple is `()` or `tuple()`, and `tuple(\"ab\")` gives `('a', 'b')`.",
   "The comma rule creates a famous trap with one-item tuples. `(5)` is just the integer 5 in parentheses, because parentheses alone only group an expression. To make a one-item tuple you need a trailing comma: `(5,)` or `5,`. So `type((5))` is `int`, while `type((5,))` is `tuple`. Likewise, `(\"a\")` is a string, not a tuple.",
   "Indexing and slicing work exactly as with lists: `t[0]`, `t[-1]`, `t[1:3]` and `t[::-1]`. A slice of a tuple is a new tuple. `len()`, `in`, `not in`, `for` loops, `min()`, `max()`, `sorted()` (which returns a list), concatenation with `+` and replication with `*` all work. Tuples have just two methods: `count()` and `index()`.",
   "```python\nt = (10, 20, 30, 20)\nprint(t[1:], t.count(20), t.index(30))  # (20, 30, 20) 2 2\nt2 = t + (40,)       # new tuple; t is unchanged\nprint(len(t2))       # 5\n# t[0] = 99          # TypeError: does not support item assignment\n```",
   "Immutability means that `t[0] = 99`, `del t[0]`, `t.append(5)` and `t.sort()` all fail (with `TypeError` for item assignment and deletion, `AttributeError` for missing methods). You can still delete the whole tuple variable with `del t`, and you can rebind the name to a new tuple, as `t = t + (5,)` does. That does not change the old tuple; it creates a new one. One more subtlety: a tuple holding a list cannot swap that list for another, but the list itself remains mutable, so `(1, [2])[1].append(3)` works.",
   "Tuple unpacking assigns each item to a name: `x, y = (3, 4)` sets `x` to 3 and `y` to 4. The number of names must match the number of items, or you get `ValueError`. Unpacking is what makes `a, b = b, a` swap values, and it is how functions return several values.",
   "When should you choose which? Use a list for a collection that will grow, shrink or change, such as a shopping cart. Use a tuple for a fixed group of related values, such as coordinates, an RGB colour or a date, or when you need to use the sequence as a dictionary key, which lists cannot be because they are mutable. Tuples also signal to readers that the data is not meant to change."
  ],
  "terms": [
   [
    "Tuple",
    "An ordered, immutable sequence, created with commas and usually parentheses."
   ],
   [
    "One-item tuple",
    "A tuple of a single value, which needs a trailing comma: (5,)."
   ],
   [
    "Immutability",
    "The property that an object's contents cannot be changed after creation."
   ],
   [
    "Tuple unpacking",
    "Assigning a tuple's items to several names at once, as in x, y = point."
   ]
  ],
  "example": "A map app stores each city's location as a tuple such as (51.5, -0.12) and uses those tuples as keys in a dictionary of city names. A list could not be used as a key, and the tuple also guarantees that a coordinate is not changed by accident.",
  "tip": "The comma, not the parentheses, makes a tuple. (7) is an int, (7,) is a tuple, and 7, is a tuple too. Any attempt to assign to t[i] raises TypeError.",
  "check": [
   [
    "What is type((\"x\"))?",
    "str. Without a trailing comma the parentheses only group the expression."
   ],
   [
    "After t = (1, 2) and t = t * 2, what is t, and was the original tuple changed?",
    "t is (1, 2, 1, 2); a new tuple was created and bound to t, and the original was not modified."
   ],
   [
    "Why can a tuple be a dictionary key but a list cannot?",
    "Keys must be hashable, which requires immutability; tuples (of immutable items) are, lists are not."
   ]
  ]
 },
 {
  "t": "Dictionaries: building, indexing, adding, changing and removing keys",
  "body": [
   "A dictionary (type `dict`) stores key-value pairs. Instead of looking items up by numeric position, as with a list, you look them up by key. You write a dictionary in curly braces with a colon between each key and its value: `ages = {\"Ana\": 31, \"Ben\": 27}`. An empty dictionary is `{}` or `dict()`. Note that `{}` is an empty dict, not an empty set.",
   "Keys must be unique and immutable (technically, hashable): strings, numbers, Booleans and tuples of immutable items all work, but a list cannot be a key and raises `TypeError`. Values can be anything, including lists and other dictionaries. If a literal repeats a key, the last value wins: `{\"a\": 1, \"a\": 2}` is `{'a': 2}`. Since Python 3.7, dictionaries keep keys in the order they were inserted, but you still cannot index them by position; `ages[0]` looks for a key 0.",
   "To read a value, index with its key: `ages[\"Ana\"]` returns 31. If the key is missing, Python raises `KeyError`. The `get()` method is the safe alternative: `ages.get(\"Zoe\")` returns `None`, and `ages.get(\"Zoe\", 0)` returns the default 0, without raising an error.",
   "Adding and changing use the same syntax. Assigning to a key that does not exist adds a new pair; assigning to an existing key replaces its value: `ages[\"Cy\"] = 40` adds, `ages[\"Ana\"] = 32` changes. The `update()` method merges another dictionary in, adding or overwriting keys.",
   "```python\nd = {\"x\": 1}\nd[\"y\"] = 2          # add\nd[\"x\"] = 10         # change\nprint(d.get(\"z\", -1))  # -1\ndel d[\"y\"]          # remove\nprint(d, len(d))    # {'x': 10} 1\n```",
   "There are several ways to remove entries. `del d[key]` removes a pair and raises `KeyError` if it is missing. `d.pop(key)` removes the pair and returns its value (also raising `KeyError` if missing unless you give a default, as in `d.pop(key, None)`). `d.popitem()` removes and returns the last inserted pair as a tuple. `d.clear()` empties the dictionary, and `del d` deletes the variable itself.",
   "`len(d)` counts key-value pairs. Like lists, dictionaries are mutable and are affected by aliasing: after `e = d`, changes through `e` show up in `d`. Use `d.copy()` or `dict(d)` for a separate shallow copy."
  ],
  "terms": [
   [
    "Dictionary",
    "A mutable collection of unique keys mapped to values, written {key: value}."
   ],
   [
    "Key",
    "The unique, immutable identifier used to look up a value."
   ],
   [
    "KeyError",
    "Raised when you index or delete a key that is not in the dictionary."
   ],
   [
    "get()",
    "Returns the value for a key, or None or a given default if the key is missing."
   ]
  ],
  "example": "A stock tracker holds stock = {\"apples\": 10}. A delivery runs stock[\"pears\"] = 5 to add a product and stock[\"apples\"] += 3 to update one. A sale of a discontinued item calls stock.pop(\"plums\", None) so it does not crash if the key is already gone.",
  "tip": "d[key] on a missing key raises KeyError; d.get(key) returns None. Assigning d[key] = value never fails: it adds if new and replaces if present.",
  "check": [
   [
    "What does {1: \"a\", 1: \"b\"} evaluate to?",
    "{1: 'b'}; duplicate keys keep the last value."
   ],
   [
    "What happens with d = {} followed by d[[1, 2]] = 3?",
    "TypeError, because a list is mutable and cannot be a key."
   ],
   [
    "What does d.pop(\"k\") return?",
    "The value that was stored under \"k\", after removing that pair (or KeyError if \"k\" is missing and no default is given)."
   ]
  ]
 },
 {
  "t": "Iterating dictionaries with keys(), values() and items(); checking whether a key exists",
  "body": [
   "Dictionaries give you three views of their contents. `d.keys()` returns the keys, `d.values()` returns the values, and `d.items()` returns the key-value pairs as tuples. These are view objects, not lists: they reflect later changes to the dictionary, and you can loop over them or convert them with `list()`. Printing one shows something like `dict_keys(['a', 'b'])`.",
   "Looping directly over a dictionary gives you its keys, in insertion order, so `for k in d:` and `for k in d.keys():` behave the same. To get the value inside such a loop, index with the key: `d[k]`.",
   "```python\nprices = {\"tea\": 2.5, \"cake\": 3.0}\nfor name in prices:\n    print(name, prices[name])\nfor p in prices.values():\n    print(p)\nfor name, p in prices.items():\n    print(name, \"costs\", p)\n```",
   "The `items()` form is usually the clearest when you need both key and value. Each item is a two-element tuple, which the `for name, p in ...` syntax unpacks into two variables. You can sort as you iterate: `for k in sorted(d):` visits keys in sorted order, and `sorted(d.values())` gives a sorted list of values.",
   "To check whether a key exists, use `in` or `not in` on the dictionary: `\"tea\" in prices` is `True`. This tests keys only. `2.5 in prices` is `False` even though 2.5 is a value; to search values, use `2.5 in prices.values()`. Checking before indexing is a common way to avoid `KeyError`: `if key in d: print(d[key])`. The alternative is `d.get(key)`, which returns `None` or a default if the key is absent.",
   "A frequent pattern is counting: loop over data and increase a count for each item, creating the key the first time it appears.",
   "```python\ncounts = {}\nfor word in \"a b a c a\".split():\n    if word in counts:\n        counts[word] += 1\n    else:\n        counts[word] = 1\nprint(counts)   # {'a': 3, 'b': 1, 'c': 1}\n```",
   "Do not add or remove keys while looping over a dictionary; Python raises `RuntimeError` because its size changed during iteration. Changing the values of existing keys is fine. If you need to delete entries, loop over a copy of the keys, such as `for k in list(d):`."
  ],
  "terms": [
   [
    "keys()",
    "Returns a view of a dictionary's keys."
   ],
   [
    "values()",
    "Returns a view of a dictionary's values."
   ],
   [
    "items()",
    "Returns a view of (key, value) tuples, handy for unpacking in a for loop."
   ],
   [
    "Membership on a dict",
    "key in d tests keys only, never values."
   ]
  ],
  "example": "A class register stores marks = {\"Ana\": 88, \"Ben\": 64}. A report loops for student, mark in marks.items(): and prints PASS or FAIL. Before looking up a name typed by the teacher, it checks if name in marks: so an unknown name produces a friendly message instead of a KeyError.",
  "tip": "in on a dictionary checks keys, not values. Looping over a dictionary gives keys; use items() to get both parts at once.",
  "check": [
   [
    "For d = {\"a\": 1}, what are \"a\" in d and 1 in d?",
    "\"a\" in d is True; 1 in d is False, because in checks keys only."
   ],
   [
    "What does for k, v in {\"x\": 1, \"y\": 2}.items(): print(k * v) output?",
    "x then yy, since each key string is replicated by its value."
   ],
   [
    "How do you get a list of the dictionary's values?",
    "list(d.values())."
   ]
  ]
 },
 {
  "t": "Strings: indexing, slicing (including [::-1]), immutability and comparison",
  "body": [
   "A string is an immutable sequence of characters. Because it is a sequence, it supports the same indexing and slicing rules as lists and tuples. `s = \"Python\"` has length 6; `s[0]` is `'P'`, `s[5]` and `s[-1]` are both `'n'`, and `s[6]` raises `IndexError`. Python has no separate character type: indexing a string returns another string of length one.",
   "Slicing uses `s[start:stop:step]`, with start included and stop excluded. `s[0:2]` is `'Py'`, `s[2:]` is `'thon'`, `s[:-2]` is `'Pyth'`, and `s[::2]` takes every second character, `'Pto'`. As with lists, slices never raise errors for out-of-range positions: `s[4:100]` is just `'on'`, and `s[4:2]` is the empty string.",
   "`s[::-1]` is the idiomatic way to reverse a string. With both start and stop omitted and a step of -1, the slice walks from the last character to the first. It is how you would test for a palindrome: `word == word[::-1]`.",
   "```python\ns = \"Python\"\nprint(s[1:4], s[-3:], s[::-1])  # yth hon nohtyP\nprint(len(s), \"th\" in s)         # 6 True\n```",
   "Strings are immutable: you cannot change a character in place. `s[0] = \"J\"` raises `TypeError: 'str' object does not support item assignment`, and `del s[0]` fails too. To \"change\" a string you build a new one, for example `s = \"J\" + s[1:]`, which gives `'Jython'`. String methods such as `upper()` and `replace()` also return new strings and leave the original untouched, so calling `s.upper()` without assigning the result has no lasting effect.",
   "Strings can be compared with `==`, `!=`, `<`, `>`, `<=` and `>=`. Equality requires identical characters, including case: `\"abc\" == \"ABC\"` is `False`. Ordering is lexicographic, character by character, using each character's numeric code (Unicode code point, which you can see with `ord()`; `chr()` goes the other way). All uppercase letters have lower codes than all lowercase letters, so `\"Zebra\" < \"apple\"` is `True`. The first differing character decides; if one string is a prefix of the other, the shorter one is smaller: `\"cat\" < \"cats\"`.",
   "Digits in strings are compared as characters, not numbers, so `\"10\" < \"9\"` is `True` because `'1'` comes before `'9'`. Convert to `int` if you want numeric comparison. Comparing a string with a number using `<` raises `TypeError`, while `==` just returns `False`."
  ],
  "terms": [
   [
    "String immutability",
    "Characters of a string cannot be changed in place; operations return new strings."
   ],
   [
    "[::-1]",
    "The slice that reverses a sequence by stepping backwards through all of it."
   ],
   [
    "Lexicographic order",
    "Dictionary-like ordering that compares strings character by character by code point."
   ],
   [
    "Ord() and chr()",
    "ord() gives a character's code point; chr() gives the character for a code point."
   ]
  ],
  "example": "A sign-up form stores usernames in lowercase with name.lower() so that \"Ana\" and \"ana\" cannot both register, since == is case sensitive. A report later lists usernames with sorted(), which orders them lexicographically.",
  "tip": "Uppercase sorts before lowercase, and digit strings compare as text, so \"100\" < \"20\" is True. Any attempt to assign to s[i] is a TypeError.",
  "check": [
   [
    "What is \"stressed\"[::-1]?",
    "\"desserts\"."
   ],
   [
    "What happens when you run s = \"hat\"; s[0] = \"c\"?",
    "TypeError, because strings are immutable; build a new string such as \"c\" + s[1:]."
   ],
   [
    "Is \"Apple\" < \"apple\" True or False?",
    "True. 'A' has a lower code point (65) than 'a' (97)."
   ]
  ]
 },
 {
  "t": "Escaping with \\, quotes and apostrophes inside strings, multi-line strings",
  "body": [
   "A string literal is delimited by quotes, so putting quote characters inside it needs care. Python gives you two easy ways out. First, choose the other kind of quote for the delimiters: `\"It's fine\"` contains an apostrophe inside double quotes, and `'She said \"hi\"'` contains double quotes inside single quotes. Second, escape the quote with a backslash: `'It\\'s fine'` and `\"She said \\\"hi\\\"\"` are both valid.",
   "The backslash `\\` is the escape character. Combined with the next character, it forms an escape sequence that stands for a single character. The ones you need are `\\n` (newline), `\\t` (tab), `\\\\` (a literal backslash), `\\'` (single quote) and `\\\"` (double quote). Each counts as one character, so `len(\"a\\nb\")` is 3. When printed, `\\n` moves to a new line and `\\t` inserts a tab; in the REPL, echoing the string without `print` shows the escape sequences instead.",
   "```python\nprint('It\\'s here')         # It's here\nprint(\"Col1\\tCol2\\nA\\tB\")    # two lines, tab separated\nprint(\"C:\\\\temp\")            # C:\\temp\nprint(len(\"\\\\\"))              # 1\n```",
   "A backslash cannot be the last character of a string literal, because it would escape the closing quote: `\"folder\\\"` is a syntax error (the string is never closed). Write `\"folder\\\\\"` instead. Also be careful with Windows paths: in `\"C:\\new\"`, the `\\n` becomes a newline. Doubling the backslashes avoids that, and so does a raw string, written with an `r` prefix (`r\"C:\\new\"`), in which backslashes are kept literally.",
   "Multi-line strings use triple quotes, either `'''...'''` or `\"\"\"...\"\"\"`. Everything between them, including line breaks and any single or double quotes, becomes part of the string. The newlines are real characters: a triple-quoted string that spans three lines contains two `\\n` characters (more if you break the line right after the opening quotes). Triple-quoted strings are also used as docstrings to document functions.",
   "```python\nmsg = \"\"\"Dear user,\nIt's \"done\".\nBye\"\"\"\nprint(msg)            # three lines\nprint(msg.count(\"\\n\"))  # 2\n```",
   "An ordinary single- or double-quoted string cannot contain a raw line break; pressing Enter inside one gives a syntax error. To put a line break inside such a string, use `\\n`. Finally, remember that `print()` shows the processed text, while the escape sequences are only how you type special characters into your source code."
  ],
  "terms": [
   [
    "Escape character",
    "The backslash, which gives the next character a special meaning in a string literal."
   ],
   [
    "Escape sequence",
    "A backslash combination such as \\n, \\t, \\\\ or \\' that represents one character."
   ],
   [
    "Triple-quoted string",
    "A string delimited by ''' or \"\"\" that may span several lines and contain quotes freely."
   ],
   [
    "Raw string",
    "A literal with an r prefix in which backslashes are not treated as escapes."
   ]
  ],
  "example": "A script prints a Windows path with print(\"C:\\new_folder\") and gets C:, a line break and ew_folder, because \\n became a newline. Writing \"C:\\\\new_folder\" or r\"C:\\new_folder\" prints the path correctly.",
  "tip": "Each escape sequence is one character when counting length. A string that ends in a single backslash is a syntax error because the backslash escapes the closing quote.",
  "check": [
   [
    "What is len(\"a\\tb\\\\\")?",
    "4: a, tab, b and one backslash."
   ],
   [
    "Write the text It's \"ok\" as a single Python literal.",
    "Use triple quotes or escapes, for example 'It\\'s \"ok\"' or \"It's \\\"ok\\\"\"."
   ],
   [
    "How many newline characters are in \"\"\"one\\ntwo\"\"\" if written on one line?",
    "One, from the \\n escape sequence."
   ]
  ]
 },
 {
  "t": "Common string methods: split(), join(), upper(), lower(), strip(), find(), count(), replace()",
  "body": [
   "Strings have many built-in methods, called with dot notation such as `text.upper()`. Because strings are immutable, none of these methods change the original string. Each returns a new value, and you must assign or use that result. Writing `name.strip()` on its own line and expecting `name` to change is a classic bug.",
   "`upper()` returns a copy with all letters in uppercase and `lower()` with all in lowercase; other characters are untouched. They are handy for case-insensitive comparisons: `answer.lower() == \"yes\"`. `strip()` removes whitespace (spaces, tabs, newlines) from both ends, but not from the middle: `\"  hi there \".strip()` is `'hi there'`. Given an argument, it strips any of those characters from the ends instead: `\"xxhixx\".strip(\"x\")` is `'hi'`. There are also `lstrip()` and `rstrip()` for one side only.",
   "`split()` breaks a string into a list of substrings. With no argument, it splits on any run of whitespace and ignores leading and trailing whitespace, so `\" a  b c \".split()` is `['a', 'b', 'c']`. With a separator argument it splits exactly at that separator, and empty strings can appear: `\"a,,b\".split(\",\")` is `['a', '', 'b']`. `join()` does the reverse. It is called on the separator string and takes an iterable of strings: `\"-\".join([\"2026\", \"09\", \"25\"])` is `'2026-09-25'`. Every item must be a string, so joining a list of numbers raises `TypeError` until you convert them, for example with `str()` in a comprehension.",
   "```python\nline = \"  red, green ,blue \"\nparts = [p.strip() for p in line.split(\",\")]\nprint(parts)                 # ['red', 'green', 'blue']\nprint(\" | \".join(parts).upper())  # RED | GREEN | BLUE\n```",
   "`find(sub)` returns the lowest index where `sub` starts, or -1 if it is not found. It never raises an error, which distinguishes it from `index(sub)`, which raises `ValueError` when the substring is missing. Be careful: -1 is a valid-looking index, so check `if s.find(x) != -1:` or simply use `x in s`. `find()` accepts an optional start position: `\"banana\".find(\"a\", 2)` is 3.",
   "`count(sub)` returns how many non-overlapping times `sub` occurs: `\"banana\".count(\"a\")` is 3 and `\"aaaa\".count(\"aa\")` is 2. `replace(old, new)` returns a copy with every occurrence of `old` replaced by `new`; an optional third argument limits the number of replacements: `\"a-b-c\".replace(\"-\", \"+\", 1)` is `'a+b-c'`. If `old` does not occur, the string comes back unchanged.",
   "Methods can be chained because each returns a string: `raw.strip().lower().replace(\" \", \"_\")` cleans up text in one line, applying the methods from left to right."
  ],
  "terms": [
   [
    "split()",
    "Returns a list of substrings, splitting on whitespace by default or on a given separator."
   ],
   [
    "join()",
    "Called on a separator string; returns one string made from an iterable of strings."
   ],
   [
    "strip()",
    "Returns a copy without leading and trailing whitespace (or given characters)."
   ],
   [
    "find() vs index()",
    "Both locate a substring; find() returns -1 if missing, index() raises ValueError."
   ]
  ],
  "example": "A contact importer reads the line \" Ana Lopez ; ana@example.org \". It calls line.split(\";\"), strips each part, applies lower() to the email, and later builds a CSV row with \",\".join(fields), turning messy input into clean records.",
  "tip": "String methods return new strings; the original never changes. find() returns -1 instead of failing, and join() is called on the separator, not on the list.",
  "check": [
   [
    "What does \"one two  three\".split() return?",
    "['one', 'two', 'three']; runs of whitespace count as one separator."
   ],
   [
    "What is \"hello\".find(\"z\")?",
    "-1, because find() returns -1 when the substring is absent."
   ],
   [
    "After s = \"Hi\" and s.upper(), what is s?",
    "Still \"Hi\"; upper() returns a new string that was not assigned."
   ]
  ]
 },
 {
  "t": "Decomposition: splitting a program into functions",
  "body": [
   "As programs grow, putting all the code in one long sequence becomes hard to read, test and change. Decomposition is the practice of breaking a problem into smaller, well-defined sub-problems and giving each one its own function. Instead of one 200-line script, you might have `read_scores()`, `average()`, `grade_for()` and `print_report()`, and a short main section that calls them in order.",
   "A function is a named block of code that performs one task. You define it once with `def`, and you can call (invoke) it as many times as you need. Functions can take input through parameters and hand back output with `return`. Python already gives you many built-in functions, such as `print()`, `len()` and `input()`; decomposition means writing your own in the same spirit.",
   "There are several reasons to decompose. Reuse: code needed in several places is written once, so a fix is made once. Readability: a well-named call like `is_valid_email(address)` tells the reader what happens without their reading the details. Testing: a small function with clear inputs and outputs can be checked on its own in the REPL. Teamwork: different people can write different functions. Abstraction: a caller only needs to know what a function does, not how.",
   "```python\ndef get_numbers():\n    return [int(x) for x in input(\"Numbers: \").split()]\n\ndef average(values):\n    return sum(values) / len(values)\n\nnums = get_numbers()\nprint(\"Average:\", average(nums))\n```",
   "Good functions tend to do one thing, have a descriptive verb-based name in snake_case (as PEP 8 recommends), and communicate through parameters and return values rather than by reading or changing global variables. A sign that decomposition is needed is duplicated code, or a comment such as \"now calculate the tax\" in the middle of a long block; that comment usually names the function you should extract.",
   "Decomposition is often done top down: write the main steps first as calls to functions that do not exist yet, give each a `pass` or simple placeholder body, then implement and test them one at a time. Functions can call other functions, so a large task becomes a tree of smaller ones.",
   "Python also organises code at a larger scale into modules (files) and packages, which you bring in with `import`. The same principle applies at every level: group related code, give it a clear interface, and keep the pieces small enough to understand."
  ],
  "terms": [
   [
    "Decomposition",
    "Dividing a program into smaller functions, each solving one part of the problem."
   ],
   [
    "Function",
    "A named, reusable block of code defined with def and run by calling it."
   ],
   [
    "Abstraction",
    "Using a function by what it does, without needing to know how it does it."
   ],
   [
    "Top-down design",
    "Planning the main steps first as function calls, then implementing each function."
   ]
  ],
  "example": "A payroll script repeated the same overtime calculation in three places, and a rate change was fixed in only two of them. Moving the calculation into a single overtime_pay(hours, rate) function means future changes happen in one place and the three call sites stay consistent.",
  "tip": "Exam questions on decomposition focus on why: reuse, readability, easier testing and teamwork. A function that returns a value is more reusable than one that only prints it.",
  "check": [
   [
    "Give two benefits of splitting a program into functions.",
    "Any two of: code reuse, easier reading, easier testing and debugging, division of work, and hiding details behind a clear name."
   ],
   [
    "Why is returning a result often better than printing it inside the function?",
    "The caller can then use the value in further calculations, store it or print it however it likes."
   ],
   [
    "What is a stub, and how does it help decomposition?",
    "A placeholder function (often with a pass body) that lets you write and run the overall program before every piece is finished."
   ]
  ]
 },
 {
  "t": "Defining and invoking functions; functions must be defined before they are called",
  "body": [
   "You define a function with the `def` keyword, followed by the function name, a pair of parentheses containing any parameters, and a colon. The indented block below is the function body. Defining a function does not run the body; it creates a function object and binds it to the name. The body runs only when you call (invoke) the function by writing its name followed by parentheses, with any arguments inside.",
   "```python\ndef greet(name):\n    print(\"Hello,\", name)\n\ngreet(\"Ana\")    # Hello, Ana\ngreet(\"Ben\")    # Hello, Ben\n```",
   "The parentheses matter. `greet(\"Ana\")` calls the function. `greet` without parentheses is just a reference to the function object; writing it alone does nothing visible, and `print(greet)` shows something like `<function greet at 0x...>`. Calling a function with the wrong number of arguments raises `TypeError`.",
   "Python runs a script from top to bottom, and a `def` statement is executed like any other statement: when Python reaches it, it creates the function. So a function must be defined before the line that calls it runs. Calling it earlier raises `NameError: name '...' is not defined`.",
   "```python\nsay_hi()        # NameError: not defined yet\n\ndef say_hi():\n    print(\"hi\")\n```",
   "There is an important subtlety. Inside a function body, names are looked up only when the function runs, not when it is defined. So function `a()` can call function `b()` even if `b` is defined later in the file, as long as `b` exists by the time `a()` is actually called. That is why the usual pattern of defining all functions first and calling the main one at the bottom always works.",
   "Function names follow the same rules as variable names, and they share the same namespace. If you later assign `greet = 5`, the name no longer refers to the function, and `greet(\"x\")` raises `TypeError: 'int' object is not callable`. Defining a second function with the same name replaces the first one; Python does not support overloading by number of parameters. A function whose body contains only `pass` is valid and returns `None` when called.",
   "In a lab, you can type a function definition into the REPL: after the header line, the prompt changes to `...` for the body, and a blank line finishes the definition."
  ],
  "terms": [
   [
    "def",
    "The keyword that starts a function definition."
   ],
   [
    "Invocation (call)",
    "Running a function by writing its name followed by parentheses and arguments."
   ],
   [
    "Function object",
    "The value created by def and bound to the function's name; it can be referenced without calling it."
   ],
   [
    "NameError",
    "Raised when a call happens before the function's def statement has been executed."
   ]
  ],
  "example": "A student puts the main code at the top of a file and the helper functions at the bottom. Running the script fails immediately with NameError. Moving the calls into a main() function called on the last line fixes it, because every def has run before main() executes.",
  "tip": "A def must execute before the call runs, but one function body may refer to another function defined later, because names inside a body are looked up only at call time.",
  "check": [
   [
    "What does defining a function do by itself?",
    "It creates a function object and binds it to the name; the body does not run until the function is called."
   ],
   [
    "What happens if you define two functions named f?",
    "The second definition replaces the first; calls use the latest one."
   ],
   [
    "def a(): return b() is defined before def b(): return 1, then a() is called at the end. Does it work?",
    "Yes. When a() runs, b already exists, so the lookup succeeds and it returns 1."
   ]
  ]
 },
 {
  "t": "Return and yield, returning several values as a tuple, the None value",
  "body": [
   "The `return` statement ends a function immediately and sends a value back to the caller. The call expression then evaluates to that value, so you can assign it, print it or use it in a larger expression: `total = add(2, 3)`. Any code after an executed `return` in the same function is skipped. A function can contain several `return` statements, for example one in each branch of an `if`, but only one of them runs per call.",
   "```python\ndef sign(n):\n    if n > 0:\n        return \"positive\"\n    elif n < 0:\n        return \"negative\"\n    return \"zero\"\n\nprint(sign(-4))   # negative\n```",
   "A function that finishes without reaching a `return`, or uses a bare `return` with no value, returns the special value `None`. `None` is the single object of type `NoneType` and means \"no value\". It is falsy, it prints as `None`, and the correct way to test for it is `x is None`. A classic exam trap is printing the result of a function that prints but does not return: `print(greet())` shows the greeting and then `None`.",
   "To return several values, list them after `return` separated by commas: `return low, high`. Python packs them into a single tuple, so the function actually returns one object. The caller can keep the tuple or unpack it: `lo, hi = min_max(data)`. The number of names must match the number of values, or you get `ValueError`.",
   "```python\ndef min_max(values):\n    return min(values), max(values)\n\nresult = min_max([4, 9, 1])\nprint(result)         # (1, 9)\nlo, hi = min_max([4, 9, 1])\nprint(lo, hi)         # 1 9\n```",
   "`yield` looks similar but works very differently, and PCEP expects you to recognise it. A function containing `yield` anywhere in its body becomes a generator function. Calling it does not run the body; it returns a generator object. Each time you ask the generator for a value (for example with a `for` loop, `next()` or `list()`), the body runs until the next `yield`, hands out that value, and pauses, keeping its local variables for next time. `return` ends a function for good; `yield` produces a value and suspends.",
   "```python\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))   # [3, 2, 1]\n```",
   "Generators are useful for producing long or endless sequences one item at a time without building a whole list in memory."
  ],
  "terms": [
   [
    "return",
    "Ends a function and passes a value (or None) back to the caller."
   ],
   [
    "None",
    "The special value meaning no value; returned by functions that do not return anything else."
   ],
   [
    "Tuple packing on return",
    "return a, b returns a single tuple (a, b), which the caller can unpack."
   ],
   [
    "yield / generator",
    "yield makes a function a generator that produces values one at a time, pausing between them."
   ]
  ],
  "example": "A statistics helper returns count, mean from one call. The report code writes n, avg = stats(data). Another helper that only printed its result, with no return, caused avg to be None, and a later calculation failed with TypeError.",
  "tip": "If a function has no return (or a bare return), its call evaluates to None; print(f()) will show None after anything f prints. A comma-separated return gives a tuple.",
  "check": [
   [
    "What does print(print(\"a\")) output?",
    "a on one line, then None, because print() returns None."
   ],
   [
    "What is the type of the value returned by return 1, 2?",
    "tuple; the function returns (1, 2)."
   ],
   [
    "What does calling a function that contains yield return?",
    "A generator object; the body runs only as values are requested."
   ]
  ]
 },
 {
  "t": "Recursion, base cases and RecursionError",
  "body": [
   "A recursive function is one that calls itself. Recursion is a way of solving a problem by reducing it to a smaller version of the same problem. The factorial of n (written n!, the product of all integers from 1 to n) is a standard example: n! equals n times (n - 1)!, and 1! is 1.",
   "```python\ndef factorial(n):\n    if n <= 1:          # base case\n        return 1\n    return n * factorial(n - 1)   # recursive case\n\nprint(factorial(5))   # 120\n```",
   "Every correct recursive function has two parts. The base case is a condition under which the function returns an answer directly, without calling itself. The recursive case calls the function again with an argument that moves closer to the base case. Without a reachable base case, the function would call itself forever.",
   "It helps to trace what happens. `factorial(5)` needs `factorial(4)`, which needs `factorial(3)`, and so on down to `factorial(1)`, which returns 1. Each call waits, with its own separate local variables, on a stack of pending calls. Then the results come back up: 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = 24, 5 x 24 = 120. Recursive calls do not share local variables; each call has its own `n`.",
   "Python limits how deep recursion can go, to protect the interpreter from running out of memory. In CPython the default limit is 1000 frames (you can inspect it with `sys.getrecursionlimit()`). If a function recurses deeper than that, usually because the base case is missing or can never be reached, Python raises `RecursionError: maximum recursion depth exceeded`. `RecursionError` is a subclass of `RuntimeError`. For example, `factorial(-1)` in a version whose base case is `if n == 1:` would move further away from 1 with every call and never stop, eventually raising `RecursionError`; using `n <= 1` avoids that.",
   "Another well-known example is the Fibonacci sequence, where each number is the sum of the previous two: `fib(n) = fib(n - 1) + fib(n - 2)` with base cases for 0 and 1. It shows that a function can call itself more than once per call, which makes it elegant but slow for large n, because the same values are computed repeatedly.",
   "Anything recursion can do, a loop can also do. Recursion is clearer for problems that are naturally self-similar, such as nested structures and tree-like data; loops are usually more efficient and do not risk hitting the depth limit. On the exam, focus on tracing small recursive calls by hand and spotting a missing or unreachable base case."
  ],
  "terms": [
   [
    "Recursion",
    "A function calling itself to solve a smaller version of the same problem."
   ],
   [
    "Base case",
    "The condition under which a recursive function returns without calling itself."
   ],
   [
    "Recursive case",
    "The branch that calls the function again with input closer to the base case."
   ],
   [
    "RecursionError",
    "Raised when recursion exceeds Python's maximum depth, typically because the base case is never reached."
   ]
  ],
  "example": "A function sums the digits of a number: digit_sum(n) returns n if n < 10, otherwise n % 10 + digit_sum(n // 10). For 472 it computes 2 + digit_sum(47), then 7 + digit_sum(4), and returns 13. Removing the n < 10 check makes it recurse on 0 forever and raise RecursionError.",
  "tip": "When tracing recursion, write each call on its own line with its argument, go down to the base case, then multiply or add on the way back up. A base case that the arguments can skip over is as bad as none.",
  "check": [
   [
    "What does def f(n): return 0 if n == 0 else n + f(n - 1) return for f(4)?",
    "10 (4 + 3 + 2 + 1 + 0)."
   ],
   [
    "What happens if you call that same f with -1?",
    "n never equals 0, so it recurses until Python raises RecursionError."
   ],
   [
    "Do recursive calls share the same local variables?",
    "No. Each call gets its own local variables."
   ]
  ]
 },
 {
  "t": "Parameters vs arguments; positional, keyword and mixed argument passing",
  "body": [
   "The words parameter and argument are often used loosely, but the exam uses them precisely. A parameter is the name listed in the function definition; it exists only inside the function. An argument is the actual value you pass when calling the function. In `def area(width, height):`, `width` and `height` are parameters; in `area(3, 4)`, 3 and 4 are arguments. When the function is called, each parameter is bound to its argument, and the parameter then behaves like a local variable.",
   "Positional arguments are matched to parameters by order: the first argument goes to the first parameter, and so on. `area(3, 4)` sets `width = 3` and `height = 4`; swapping them to `area(4, 3)` swaps the meanings.",
   "Keyword arguments are matched by name, using `parameter=value` in the call. Their order does not matter: `area(height=4, width=3)` is identical to `area(3, 4)`. Keyword arguments make calls self-explanatory and protect you from mixing up the order. You already use them with `print(..., sep=\"\", end=\"\")`.",
   "You can mix the two styles in one call, but positional arguments must come first. `area(3, height=4)` is valid. `area(width=3, 4)` is a `SyntaxError` (positional argument follows keyword argument). You also cannot give the same parameter two values: `area(3, width=5)` raises `TypeError` because `width` already received 3 positionally (\"got multiple values for argument 'width'\"). Using a keyword that is not a parameter name, such as `area(3, depth=4)`, raises `TypeError` too.",
   "```python\ndef intro(name, age, city):\n    print(name, age, city)\n\nintro(\"Ana\", 30, \"Lima\")               # positional\nintro(city=\"Lima\", name=\"Ana\", age=30) # keyword\nintro(\"Ana\", city=\"Lima\", age=30)      # mixed\n# intro(\"Ana\", 30)        -> TypeError: missing 'city'\n# intro(name=\"Ana\", 30, \"Lima\") -> SyntaxError\n```",
   "Every parameter without a default value must receive exactly one argument, otherwise Python raises `TypeError` reporting the missing or extra arguments. The next lesson shows how default values make some parameters optional.",
   "Passing an argument binds the parameter to the same object the caller has; nothing is copied. Rebinding the parameter inside the function (`values = []`) does not affect the caller, but mutating a mutable argument (`values.append(1)`) does, because both names refer to the same list."
  ],
  "terms": [
   [
    "Parameter",
    "A name in a function definition that receives a value when the function is called."
   ],
   [
    "Argument",
    "The actual value supplied in a function call."
   ],
   [
    "Positional argument",
    "An argument matched to a parameter by its position in the call."
   ],
   [
    "Keyword argument",
    "An argument matched by name, written name=value in the call."
   ]
  ],
  "example": "A booking function book(room, nights, guests) was called as book(2, 101, 3), silently booking room 2 for 101 nights. Rewriting calls as book(room=101, nights=2, guests=3) makes the intent explicit and prevents order mix-ups.",
  "tip": "Positional before keyword, always. A keyword argument before a positional one is a SyntaxError; giving one parameter two values or a nonexistent name is a TypeError.",
  "check": [
   [
    "For def f(a, b): ..., is f(b=1, a=2) valid?",
    "Yes. Keyword arguments can appear in any order; a is 2 and b is 1."
   ],
   [
    "What does f(1, a=2) do for def f(a, b)?",
    "TypeError: a receives 1 positionally and again by keyword (multiple values for argument 'a'), and b is missing."
   ],
   [
    "In def f(x): and f(5), which is the parameter and which the argument?",
    "x is the parameter; 5 is the argument."
   ]
  ]
 },
 {
  "t": "Default parameter values and why defaults must follow required parameters",
  "body": [
   "A parameter can be given a default value in the function definition with `name=value`. If the caller supplies an argument for it, that argument is used; if not, the default is used. This lets one function serve both simple and detailed calls. `print()` itself works this way: `sep` defaults to a space and `end` to a newline.",
   "```python\ndef greet(name, greeting=\"Hello\"):\n    print(greeting + \", \" + name)\n\ngreet(\"Ana\")                 # Hello, Ana\ngreet(\"Ben\", \"Hi\")           # Hi, Ben\ngreet(\"Cy\", greeting=\"Hey\")  # Hey, Cy\n```",
   "Parameters without defaults are called required parameters, because every call must supply them. The rule is that in the definition all required parameters must come before any parameter that has a default. `def f(a, b=2):` is fine, but `def f(a=1, b):` is a `SyntaxError` (reported as \"non-default argument follows default argument\", or in Python 3.12 and later as \"parameter without a default follows parameter with a default\").",
   "Why this rule? Positional arguments are assigned left to right. In `def f(a=1, b):`, a call such as `f(5)` would be ambiguous: should 5 go to `a`, leaving `b` without a value, or should it skip `a` and go to `b`? Python avoids the ambiguity by insisting that the optional parameters come last, so positional arguments always fill the required ones first and any leftover positions fill the optional ones in order.",
   "You can override just some defaults. With `def box(w, h=1, d=1):`, the call `box(5, d=3)` uses the default for `h` and overrides `d`. Using a keyword is the only way to skip over an earlier optional parameter; positionally, `box(5, 3)` sets `h`, not `d`.",
   "Default values are evaluated once, when the `def` statement runs, not at each call. For immutable defaults such as numbers, strings, `None` or tuples, this makes no difference. For a mutable default such as a list, all calls that use the default share the same list object, so changes accumulate between calls. The standard fix is to use `None` as the default and create the list inside the function.",
   "```python\ndef add_item(item, bag=None):\n    if bag is None:\n        bag = []\n    bag.append(item)\n    return bag\n\nprint(add_item(1), add_item(2))   # [1] [2]\n```",
   "With a default of `bag=[]` instead, the second call would return `[1, 2]`, which is rarely what anyone wants."
  ],
  "terms": [
   [
    "Default parameter value",
    "A value given in the definition with name=value, used when the caller omits that argument."
   ],
   [
    "Required parameter",
    "A parameter with no default, which every call must supply."
   ],
   [
    "Non-default argument follows default argument",
    "The SyntaxError raised when a required parameter is placed after one with a default."
   ],
   [
    "Mutable default trap",
    "A list or dict default is created once and shared by all calls that use it."
   ]
  ],
  "example": "A logging helper is defined as def log(msg, level=\"INFO\", to_screen=True). Most calls are simply log(\"Started\"), while an error path calls log(\"Disk full\", level=\"ERROR\"), overriding one default and keeping the other.",
  "tip": "Defaults go on the right. def f(a=1, b) never even gets defined: it is a SyntaxError at definition time, not an error at call time.",
  "check": [
   [
    "Is def f(a, b=2, c=3): valid, and what does f(1, c=9) give for b?",
    "Valid; b keeps its default 2 and c is 9."
   ],
   [
    "Why is def f(x=0, y): rejected?",
    "Required parameters must precede defaulted ones; otherwise positional arguments could not be matched unambiguously."
   ],
   [
    "When is a default value evaluated?",
    "Once, when the def statement is executed, not on each call."
   ]
  ]
 },
 {
  "t": "Name scopes, shadowing and the global keyword; UnboundLocalError",
  "body": [
   "A name's scope is the part of the program where that name can be seen and used. Names assigned at the top level of a script live in the global scope and are visible everywhere in the file, including inside functions. Names created inside a function, including its parameters, are local: they exist only while that call is running and cannot be seen from outside. Using a function's local variable after the function returns raises `NameError`.",
   "When Python looks up a name, it searches the local scope first, then any enclosing function scopes, then the global scope, and finally the built-in names such as `print` and `len`. The first match wins. This is often summarised as LEGB: local, enclosing, global, built-in.",
   "Reading a global variable inside a function works without any special syntax. Assigning to a name inside a function, however, makes that name local to the whole function. If a local variable has the same name as a global one, the local one hides (shadows) the global inside the function, and the global is left untouched. Parameters shadow globals the same way.",
   "```python\nx = 10\ndef show():\n    print(x)      # reads the global: 10\ndef change():\n    x = 99        # creates a local x; global unchanged\nchange()\nprint(x)          # 10\n```",
   "To assign to a global variable from inside a function, declare it with the `global` keyword at the start of the function: `global counter`. After that, assignments to `counter` in the function affect the global variable, and if the global does not exist yet, the assignment creates it. Use `global` sparingly; passing values in as arguments and getting results back with `return` keeps functions independent and easier to test.",
   "```python\ncounter = 0\ndef bump():\n    global counter\n    counter += 1\nbump(); bump()\nprint(counter)    # 2\n```",
   "`UnboundLocalError` is the error that ties these rules together. Python decides which names are local when it compiles the function: any name assigned anywhere in the body is local throughout the body. So if you read that name before the local assignment has happened, there is no local value yet, and Python does not fall back to the global. `x = 1` at the top level followed by `def f(): print(x); x = 2` raises `UnboundLocalError` when `f()` is called, even though a global `x` exists. The same happens with `count += 1` inside a function without `global count`, because `+=` both reads and assigns. `UnboundLocalError` is a subclass of `NameError`.",
   "Mutating a global object is different from assigning to its name. `items.append(4)` inside a function changes a global list without any `global` statement, because the name `items` is only read, not rebound."
  ],
  "terms": [
   [
    "Scope",
    "The region of code in which a name is visible, such as local or global."
   ],
   [
    "Shadowing",
    "A local name hiding a global or built-in name with the same spelling inside a function."
   ],
   [
    "global keyword",
    "Declares that a name used in a function refers to the global variable, so assignments change it."
   ],
   [
    "UnboundLocalError",
    "Raised when a local variable is read before it is assigned in that function; a subclass of NameError."
   ]
  ],
  "example": "A game keeps score = 0 globally and has def add_points(): score += 10. The first call crashes with UnboundLocalError, because += makes score local. Adding global score fixes it, but a cleaner design is def add_points(score): return score + 10.",
  "tip": "Any assignment to a name anywhere in a function makes it local for the entire function, so reading it earlier in the same function raises UnboundLocalError instead of reading the global.",
  "check": [
   [
    "x = 5; def f(): x = 7 is called, then print(x). What is shown?",
    "5. The assignment inside f created a local x."
   ],
   [
    "Why does def g(): total += 1 fail when total is a global?",
    "+= assigns to total, making it local, and reading the unassigned local raises UnboundLocalError."
   ],
   [
    "Does a function need global to call append() on a global list?",
    "No. Mutating the object does not rebind the name, so no global declaration is needed."
   ]
  ]
 },
 {
  "t": "The exception hierarchy: BaseException, Exception, SystemExit, KeyboardInterrupt, ArithmeticError, LookupError",
  "body": [
   "When something goes wrong at run time, Python raises an exception: an object describing the error. Exceptions are organised into a class hierarchy, a family tree in which more specific exception types inherit from more general ones. This matters because an `except` clause that names a class also catches every class below it in the tree.",
   "At the root is `BaseException`. Every exception inherits from it. Directly under it are a few special exceptions that are not really errors, most importantly `SystemExit`, raised by `sys.exit()` to end the program, and `KeyboardInterrupt`, raised when the user presses Ctrl+C. (`GeneratorExit` is another, used internally by generators.) Also directly under `BaseException` is `Exception`, the base class for all ordinary errors.",
   "```text\nBaseException\n +-- SystemExit\n +-- KeyboardInterrupt\n +-- Exception\n      +-- ArithmeticError\n      |    +-- ZeroDivisionError\n      |    +-- OverflowError\n      +-- LookupError\n      |    +-- IndexError\n      |    +-- KeyError\n      +-- TypeError\n      +-- ValueError\n      +-- NameError\n           +-- UnboundLocalError\n```",
   "Why are `SystemExit` and `KeyboardInterrupt` kept outside `Exception`? Because code that catches `Exception` to handle ordinary errors should not accidentally prevent the program from exiting or stop the user from interrupting it. `except Exception:` lets Ctrl+C and `sys.exit()` pass through, while a bare `except:` (or `except BaseException:`) swallows them too, which is why a bare except is discouraged.",
   "`ArithmeticError` groups errors from numeric operations. Its subclasses include `ZeroDivisionError` (dividing or taking a remainder by zero) and `OverflowError` (a result too large to represent, which with Python's unlimited integers mostly happens with floats, for example `2.0 ** 10000`). Catching `ArithmeticError` handles all of them.",
   "`LookupError` groups errors caused by an invalid index or key when looking something up in a collection. `IndexError` (a sequence index out of range) and `KeyError` (a missing dictionary key) are both subclasses. So `except LookupError:` catches `[1, 2][5]` and `{}[\"x\"]` alike.",
   "You can check relationships in the REPL with `issubclass(ZeroDivisionError, ArithmeticError)`, which returns `True`, or `issubclass(KeyboardInterrupt, Exception)`, which returns `False`. On the exam, you will be asked which `except` branch catches a given error, and the answer always follows this tree."
  ],
  "terms": [
   [
    "BaseException",
    "The root class of all Python exceptions."
   ],
   [
    "Exception",
    "The base class for ordinary errors; it excludes SystemExit and KeyboardInterrupt."
   ],
   [
    "ArithmeticError",
    "Base class for numeric errors such as ZeroDivisionError and OverflowError."
   ],
   [
    "LookupError",
    "Base class for IndexError and KeyError, raised by invalid indexes or keys."
   ],
   [
    "KeyboardInterrupt",
    "Raised when the user presses Ctrl+C; derives from BaseException, not Exception."
   ]
  ],
  "example": "A data-processing loop wraps each record in try with except Exception: to log bad records and continue. When the operator presses Ctrl+C, KeyboardInterrupt is not an Exception subclass, so it passes through and the program stops as intended. A bare except would have trapped it and kept looping.",
  "tip": "Know which classes sit under which: IndexError and KeyError under LookupError, ZeroDivisionError under ArithmeticError, and SystemExit and KeyboardInterrupt directly under BaseException, outside Exception.",
  "check": [
   [
    "Does except LookupError: catch a KeyError?",
    "Yes. KeyError is a subclass of LookupError."
   ],
   [
    "Does except Exception: catch KeyboardInterrupt?",
    "No. KeyboardInterrupt inherits directly from BaseException."
   ],
   [
    "Which class is the common parent of ZeroDivisionError and OverflowError?",
    "ArithmeticError."
   ]
  ]
 },
 {
  "t": "Common built-in exceptions: ZeroDivisionError, IndexError, KeyError, TypeError, ValueError, NameError",
  "body": [
   "PCEP expects you to look at a short snippet and name the exception it raises. Six built-in exceptions come up again and again. Learn what triggers each one and how they differ, especially the pair `TypeError` and `ValueError`.",
   "`ZeroDivisionError` is raised when the right operand of `/`, `//` or `%` is zero, whether it is `0` or `0.0`: `5 / 0`, `5 // 0.0` and `5 % 0` all raise it. Note that `0 ** -1` also raises it. It is a subclass of `ArithmeticError`.",
   "`IndexError` is raised when a sequence index is out of range: `[1, 2, 3][3]`, `\"abc\"[-4]` or `()[0]`. Slices never raise it. `KeyError` is raised when a dictionary key is missing: `{\"a\": 1}[\"b\"]`, or `del d[\"b\"]` for a key that is not there. Both are subclasses of `LookupError`. Note that `list.index(x)` and `list.remove(x)` with a missing value raise `ValueError`, not `IndexError`, because the problem is the value, not a position.",
   "`TypeError` means an operation or function received a value of an inappropriate type. Examples: `\"a\" + 1`, `len(5)`, `\"ab\" * 2.0`, calling something that is not callable (`5()`), assigning to a tuple or string item, or calling a function with the wrong number of arguments.",
   "`ValueError` means the type was acceptable but the particular value was not. Examples: `int(\"abc\")`, `int(\"3.5\")`, `float(\"x\")`, `[1, 2].index(9)`, `[1, 2].remove(9)` and unpacking the wrong number of items, as in `a, b = (1, 2, 3)`. The quick test: if a different value of the same type would have worked, it is a `ValueError`; if no value of that type could work, it is a `TypeError`.",
   "`NameError` is raised when a name is used that has not been defined in any reachable scope: a misspelled variable (`prnt(1)`), a variable used before assignment at the top level, or a function called before its `def` ran. Its subclass `UnboundLocalError` covers local variables read before assignment inside a function.",
   "```python\ntests = [lambda: 1 / 0, lambda: [0][1], lambda: {}[\"k\"],\n         lambda: \"a\" + 1, lambda: int(\"x\"), lambda: undefined_name]\nfor t in tests:\n    try:\n        t()\n    except Exception as e:\n        print(type(e).__name__)\n```",
   "Running that loop in a lab prints the six names in order. When an exception is not handled, Python prints a traceback ending with a line like `ZeroDivisionError: division by zero`; the last line names the exception type and message, which is where to look first."
  ],
  "terms": [
   [
    "ZeroDivisionError",
    "Raised when dividing or taking a remainder by zero."
   ],
   [
    "IndexError vs KeyError",
    "IndexError: sequence index out of range; KeyError: missing dictionary key."
   ],
   [
    "TypeError",
    "An operation received a value of the wrong type, such as adding str and int."
   ],
   [
    "ValueError",
    "A value has the right type but an unacceptable content, such as int(\"abc\")."
   ],
   [
    "NameError",
    "A name is used that has not been defined."
   ]
  ],
  "example": "A survey script reads ages with int(input()). A respondent types \"twenty\" and the program stops with ValueError; another record has a missing field, so row[5] raises IndexError. Recognising each error from its last traceback line tells the developer which check to add.",
  "tip": "TypeError is about the kind of value, ValueError about the specific value. list.index() and list.remove() on a missing item raise ValueError, not IndexError.",
  "check": [
   [
    "What does int([1]) raise, and what does int(\"1.5\") raise?",
    "int([1]) raises TypeError (a list cannot be converted); int(\"1.5\") raises ValueError (a string is fine, that content is not)."
   ],
   [
    "What does {\"a\": 1}.get(\"b\") raise?",
    "Nothing. get() returns None for a missing key; only indexing with [] raises KeyError."
   ],
   [
    "Which exception does a, b = [1, 2, 3] raise?",
    "ValueError: too many values to unpack."
   ]
  ]
 },
 {
  "t": "Try-except, except with several exceptions, bare except and except Exception",
  "body": [
   "Exception handling lets your program respond to errors instead of crashing. You put code that might fail in a `try` block and the recovery code in one or more `except` blocks. If no exception occurs in the `try` block, all `except` blocks are skipped. If an exception occurs, the rest of the `try` block is abandoned immediately, and Python looks for the first `except` clause whose type matches the exception or one of its parent classes. If one matches, its block runs and execution continues after the whole statement. If none matches, the exception continues upward as if there were no handler.",
   "```python\ntry:\n    n = int(input(\"Number: \"))\n    print(100 / n)\nexcept ValueError:\n    print(\"That was not a whole number\")\nexcept ZeroDivisionError:\n    print(\"Zero is not allowed\")\nprint(\"Carrying on\")\n```",
   "Only one `except` branch runs per exception, even if several could match. To handle different exceptions in the same way, list them as a tuple in one clause: `except (ValueError, TypeError):`. Always write the parentheses; they are required in every Python version before 3.14 and whenever you add `as`. To access the exception object, add `as` and a name: `except ZeroDivisionError as e: print(e)` prints the message `division by zero`.",
   "A bare `except:` with no exception type catches everything, including `SystemExit` and `KeyboardInterrupt`. It must be the last `except` clause, or the code is a `SyntaxError`. Because it also hides typos (a `NameError` from a misspelled variable is silently caught) and can stop Ctrl+C from working, it is generally discouraged. `except Exception:` is the usual \"catch almost everything\" choice: it catches all ordinary errors but lets `SystemExit` and `KeyboardInterrupt` through, because those do not inherit from `Exception`.",
   "Two optional clauses complete the statement. An `else:` block, placed after all the `except` clauses, runs only if the `try` block raised no exception. A `finally:` block runs in every case, whether an exception occurred, was handled or not, which makes it the place for clean-up such as closing a file. The order is always `try`, `except` clauses, `else`, `finally`.",
   "```python\ntry:\n    value = [1, 2][5]\nexcept (IndexError, KeyError) as err:\n    print(\"Lookup failed:\", err)\nelse:\n    print(\"No error\")\nfinally:\n    print(\"Always runs\")\n```",
   "Keep `try` blocks small, wrapping only the statements that can actually fail. Catch the most specific exception you can reasonably handle, and do not use `except:` with `pass` to silence errors you do not understand; that turns a clear crash into a mysterious wrong answer."
  ],
  "terms": [
   [
    "try-except",
    "A statement that runs code in try and, if a matching exception occurs, runs the corresponding except block."
   ],
   [
    "Exception tuple",
    "except (A, B): handles any of several exception types in one branch."
   ],
   [
    "Bare except",
    "except: with no type; catches every exception, including SystemExit and KeyboardInterrupt, and must come last."
   ],
   [
    "finally",
    "A block that always runs after try, whether or not an exception occurred."
   ]
  ],
  "example": "A unit converter wraps float(input()) in try with except ValueError: to reprompt the user. An earlier version used a bare except, and when the developer misspelled a variable inside the try, the NameError was silently caught and reported to users as \"invalid number\".",
  "tip": "Only the first matching except runs. A bare except must be last and catches even KeyboardInterrupt; except Exception does not catch SystemExit or KeyboardInterrupt.",
  "check": [
   [
    "If the first line of a try block raises an exception, do the other lines of the try block run?",
    "No. The try block is abandoned at the failing line and control jumps to the matching except."
   ],
   [
    "How do you catch both ValueError and ZeroDivisionError in one clause?",
    "except (ValueError, ZeroDivisionError): with the types in a tuple."
   ],
   [
    "Is it valid to put except: before except ValueError:?",
    "No. A bare except must be the last except clause, otherwise Python reports a SyntaxError."
   ]
  ]
 },
 {
  "t": "Ordering except branches from specific to general",
  "body": [
   "When an exception is raised inside a `try` block, Python checks the `except` clauses from top to bottom and runs the first one that matches. A clause matches if the exception is an instance of the named class or of any of its subclasses. Once a clause has matched, no later clauses are considered. This first-match rule is why the order of `except` branches matters.",
   "Consider what happens if a general class comes first. `except Exception:` matches almost every error, and `except LookupError:` matches both `IndexError` and `KeyError`. If you put one of these above a more specific clause, the specific clause can never run: it is unreachable.",
   "```python\ntry:\n    print([1, 2][9])\nexcept LookupError:\n    print(\"lookup problem\")   # this runs\nexcept IndexError:\n    print(\"bad index\")        # never reached\n```",
   "Python does not report an error for this; the code runs, but the `IndexError` branch is dead code. Exam questions frequently show a snippet like this and ask what is printed, so always scan the clauses in order and stop at the first one whose class is the same as, or an ancestor of, the raised exception.",
   "The correct pattern is to order the branches from most specific to most general: subclasses first, then their parents, then `Exception`, and a bare `except:` (if you use one at all) last. That way each specific case gets its tailored handling, and the general clause acts as a safety net for anything unexpected.",
   "```python\ntry:\n    result = data[key] / count\nexcept KeyError:\n    print(\"No such key\")\nexcept ZeroDivisionError:\n    print(\"Count is zero\")\nexcept ArithmeticError:\n    print(\"Other maths problem\")\nexcept Exception as e:\n    print(\"Unexpected:\", type(e).__name__)\n```",
   "Two exceptions that are not related (neither inherits from the other), such as `KeyError` and `ZeroDivisionError`, can appear in either order without changing behaviour, because a given exception can match only one of them. Order only matters along a single branch of the hierarchy. To reason about any snippet, you therefore need the hierarchy from the earlier lesson: `ZeroDivisionError` under `ArithmeticError`, `IndexError` and `KeyError` under `LookupError`, and all of them under `Exception`, which itself sits under `BaseException`.",
   "The same logic applies when one clause lists a tuple: `except (ValueError, LookupError):` placed above `except KeyError:` makes the `KeyError` branch unreachable too."
  ],
  "terms": [
   [
    "First match rule",
    "Python runs only the first except clause whose type matches the exception or one of its parents."
   ],
   [
    "Unreachable handler",
    "An except clause that can never run because an earlier clause catches a parent class."
   ],
   [
    "Specific to general",
    "The recommended ordering: subclasses before their base classes, Exception last."
   ]
  ],
  "example": "A configuration loader has except Exception: followed by except KeyError: to print \"missing setting\". Users always see the generic message because Exception matches first. Swapping the two clauses makes missing keys produce the helpful specific message.",
  "tip": "Trace except clauses strictly top to bottom and stop at the first ancestor-or-same class. A general class above a specific one makes the specific branch dead code, and Python does not warn you.",
  "check": [
   [
    "With except ArithmeticError: above except ZeroDivisionError:, which runs for 1 / 0?",
    "The ArithmeticError branch, because ZeroDivisionError is its subclass and it comes first."
   ],
   [
    "Does the order of except KeyError: and except TypeError: matter?",
    "No. They are unrelated classes, so any given exception can match at most one of them."
   ],
   [
    "Where should except Exception: go among several except clauses?",
    "After all more specific clauses (only a bare except, if used, may follow it)."
   ]
  ]
 },
 {
  "t": "Propagating exceptions through function boundaries and deciding where to handle them",
  "body": [
   "An exception does not have to be handled in the function where it is raised. If a function has no matching `except` for an exception, the function stops immediately, and the exception is passed (propagated) to the code that called it, at the point of the call. If that caller does not handle it either, it moves up again, through each calling function in turn. If it reaches the top level of the program without being handled, Python prints a traceback and the program ends.",
   "```python\ndef parse(text):\n    return int(text)          # may raise ValueError\n\ndef read_age(text):\n    age = parse(text)         # no handler here\n    return age\n\ntry:\n    print(read_age(\"abc\"))\nexcept ValueError:\n    print(\"Please enter digits\")   # handled at the top\n```",
   "Here `int(\"abc\")` raises `ValueError` inside `parse`. Neither `parse` nor `read_age` handles it, so both stop at once, the `return` statements never run, and the exception arrives at the `try` around the call to `read_age`, where it is handled. The traceback Python prints for an unhandled exception lists this chain of calls, oldest first, with the line where the error was raised at the bottom, just above the exception name and message. Reading a traceback from the bottom up is the fastest way to find where things went wrong.",
   "Once an exception has been handled, it stops propagating. If `parse` had caught the `ValueError` itself and returned, say, `None`, the caller would never know an error happened, and would receive `None` instead. That is a design decision, not just syntax.",
   "So where should you handle an exception? Handle it at the level that knows what to do about it. A low-level helper like `parse` usually cannot know whether to ask the user again, use a default or abort, so it is often better to let the exception propagate. The code that talks to the user, such as an input loop, is the right place to catch it and re-prompt. Conversely, if a function can genuinely recover (for example, return a sensible default for a missing dictionary key), handling it locally keeps callers simpler.",
   "A function can also raise exceptions deliberately with the `raise` statement, for example `raise ValueError(\"age must be positive\")`, to signal a problem to its caller. Inside an `except` block, a bare `raise` re-raises the current exception so it continues to propagate after you have, for instance, logged it.",
   "On the exam, trace propagation by asking at each level: is the failing call inside a `try` with a matching `except` here? If not, skip the rest of this function and move to its caller. Remember that lines after the failing call in each abandoned function never run, but a `finally` block on the way up still does."
  ],
  "terms": [
   [
    "Propagation",
    "An unhandled exception leaving the current function and passing to its caller, up the call chain."
   ],
   [
    "Traceback",
    "The report Python prints for an unhandled exception, listing the chain of calls and the error."
   ],
   [
    "raise",
    "A statement that raises an exception; a bare raise in an except block re-raises the current one."
   ],
   [
    "Call stack",
    "The chain of active function calls through which an exception propagates."
   ]
  ],
  "example": "A banking app's withdraw() raises ValueError(\"insufficient funds\") instead of printing a message. The web handler that called it catches ValueError and shows the message to the user, while a batch job calling the same function catches it and logs the failed transaction. Each caller decides what the error means for it.",
  "tip": "When an exception escapes a function, every remaining line in that function is skipped, including its return. The exception is caught by the nearest enclosing try with a matching except anywhere up the call chain.",
  "check": [
   [
    "If f() calls g() and g() raises KeyError with no handler anywhere in g, where is it caught?",
    "By the nearest matching except around the call in f, or in f's callers; if none exists, the program stops with a traceback."
   ],
   [
    "After an exception propagates out of a function, does its return statement run?",
    "No. The function is abandoned at the failing line, so later lines, including return, are skipped (a finally block still runs)."
   ],
   [
    "Why might a low-level helper choose not to catch an exception?",
    "It may not know the right recovery; letting the exception propagate allows the caller, which has more context, to decide."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
