/* Python Institute PCAP PCAP-31-03 — generated plan (no hand-written weeks). */
CertHub.register({
  id: "pcap",
  vendor: "Python Institute (OpenEDG)",
  name: "PCAP – Certified Associate Python Programmer",
  short: "PCAP",
  exam: "PCAP-31-03",
  blurb: "Associate-level Python certification covering modules and packages, exceptions, strings, object-oriented programming, comprehensions, lambdas, closures, generators and file I/O, for learners who already know Python basics.",
  status: "check",
  statusNote: "The official syllabus page (pythoninstitute.org/pcap-exam-syllabus) could not be opened from this environment on 2026-09-24. The five sections and weights (Modules and Packages 12%, Exceptions 14%, Strings 18%, Object-Oriented Programming 34%, Miscellaneous 22%), 40 items, 65 minutes and the 70% pass mark come from search-result extracts of the official syllabus page and the official PCAP-31-03 syllabus PDF, not a direct read. Some third-party sites report that PCAP-31-03 will retire and a PCAP-31-04 is in development; Python Institute has not confirmed this in anything read here. Check the official page before booking.",
  lastVerified: "2026-09-24",
  notices: [],
  examInfo: { questions: "40 (single-choice and multiple-choice items)", minutes: 65, pass: "70%", extra: "65 minutes for the exam plus about 10 minutes for the NDA and tutorial. Delivered through Pearson VUE test centers and OpenEDG online proctoring." },
  examSim: { questions: 40, minutes: 65 },
  sources: [
    { label: "Python Institute PCAP certification page", url: "https://pythoninstitute.org/pcap" },
    { label: "PCAP-31-0x exam syllabus", url: "https://pythoninstitute.org/pcap-exam-syllabus" }
  ],
  planWeeks: 8,
  hoursPerWeek: "5–7",

  domains: [
    {
      id: 1,
      name: "Modules and Packages",
      w: 12,
      topics: [
        "Import variants: import, import as, from … import, from … import *, and what each puts in the namespace",
        "Qualifying names in nested modules and packages (package.subpackage.module.name)",
        "Dir() to list the names a module defines",
        "Sys.path: where Python searches for modules and how to extend it at runtime",
        "Math module: ceil(), floor(), trunc(), factorial(), hypot(), sqrt()",
        "Random module: random(), seed(), choice(), sample()",
        "Platform module: platform(), machine(), processor(), system(), version(), python_implementation(), python_version_tuple()",
        "__name__ and the if __name__ == \"__main__\" idiom",
        "__pycache__ and compiled .pyc files",
        "Package layout: directories, __init__.py, nested packages and private (_name) module variables"
      ],
      notes: ["Section 1 objectives: 1.1–1.4 (import variants, math/random/platform, packages and sys.path)"],
      labs: [
        "Build a package `tools/` with `__init__.py`, `text.py` and a nested `tools/maths/stats.py`, then import it four different ways and print `dir()` after each.",
        "Write a module with a `_private` variable and a public one, run `from mod import *` in IDLE, and confirm which names arrive; then print `__name__` inside the module both when run and when imported.",
        "Use `random.seed()` to make a reproducible dice-roll simulator, and print a system report with the `platform` functions; step through it in Python Tutor (pythontutor.com)."
      ]
    },
    {
      id: 2,
      name: "Exceptions",
      w: 14,
      topics: [
        "Try/except, multiple except branches and the order they are checked",
        "Catching several exceptions in one branch: except (E1, E2)",
        "Except … as e and the args attribute",
        "Else and finally branches and when each runs",
        "The built-in exception hierarchy: BaseException, Exception, ArithmeticError, LookupError, and their subclasses",
        "Raise, raise with an instance, and a bare raise to re-raise",
        "Assert and AssertionError",
        "Why except Exception does not catch KeyboardInterrupt or SystemExit",
        "Defining your own exception classes and adding attributes to them"
      ],
      notes: ["Section 2 objectives: 2.1–2.2 (handling exceptions, self-defined exceptions)"],
      labs: [
        "Write a script that deliberately triggers ZeroDivisionError, ValueError, IndexError, KeyError and TypeError, catches each, and prints `type(e).__name__` and `e.args`.",
        "Print the class hierarchy of five built-in exceptions using `__mro__`, and draw the tree on paper from BaseException down.",
        "Create a `BankError` hierarchy (`InsufficientFunds`, `AccountLocked`) with extra attributes, raise them from a small account class, and handle them with try/except/else/finally."
      ]
    },
    {
      id: 3,
      name: "Strings",
      w: 18,
      topics: [
        "Character encoding: ASCII, Unicode, code points, UTF-8",
        "Ord() and chr()",
        "String literals and escape sequences (\\n, \\t, \\\\, quotes)",
        "Indexing, negative indexing and slicing, including steps",
        "Immutability: why item assignment fails",
        "Iterating over strings; in and not in",
        "Concatenation, replication and comparison of strings (and why comparing strings with numbers using < fails)",
        "Character tests: isdigit(), isalpha(), isalnum(), isspace(), isupper(), islower()",
        "Join(), split(), find(), rfind(), index(), and the difference between find and index",
        "Sorted() on strings versus list.sort()"
      ],
      notes: ["Section 3 objectives: 3.1–3.3 (encoding, string operations, string methods)"],
      labs: [
        "Print a table of `ord()` values for A–Z and a–z in IDLE, then write a Caesar cipher using only `ord()`, `chr()` and `%`.",
        "Predict, then run, 20 slicing expressions on the string 'Certification' (including negative indices and steps); record every wrong prediction.",
        "Write a word-frequency counter for a text file using `split()`, `lower()`, `strip()` and `sorted()`, and compare `find()` with `index()` on missing words."
      ]
    },
    {
      id: 4,
      name: "Object-Oriented Programming",
      w: 34,
      topics: [
        "Core ideas: class, object, attribute, method, encapsulation, inheritance, superclass and subclass",
        "Instance variables versus class variables: declaring, initializing and sharing",
        "The __dict__ attribute of objects and classes",
        "Private attributes and name mangling (__name becomes _ClassName__name)",
        "Methods and the self parameter; constructors (__init__) with default arguments",
        "Introspection: hasattr(), type(), __name__, __module__, __bases__, __class__",
        "Single and multiple inheritance, method overriding and super()",
        "Method resolution order (MRO), diamonds and inconsistent hierarchies",
        "Isinstance(), issubclass(), and the is / is not operators versus ==",
        "Polymorphism and the __str__() method"
      ],
      notes: ["Section 4 objectives: 4.1–4.6 (OOP concepts, classes and objects, properties, methods, inheritance, polymorphism)"],
      labs: [
        "Write a `Stack` class twice: once with a public list and once with a private `__items`, then inspect both objects with `__dict__` and try to reach the private list via its mangled name.",
        "Build a diamond hierarchy (A, B(A), C(A), D(B, C)) where every class prints in `__init__` and calls `super().__init__()`; predict the order, run it, and print `D.__mro__`.",
        "Model shapes with a base `Shape` class and subclasses that override `area()` and `__str__()`; loop over a mixed list to show polymorphism, and test types with `isinstance()`."
      ]
    },
    {
      id: 5,
      name: "Miscellaneous",
      w: 22,
      topics: [
        "List comprehensions, including if filters and nested loops",
        "Lambda functions and functions that take a lambda as an argument",
        "Map() and filter(), and the fact that they return one-shot iterators",
        "Closures: inner functions that remember variables from an enclosing scope, and late binding",
        "Generators: yield, next(), and StopIteration",
        "File I/O: open() modes (r, w, a, x, b, t, +), text versus binary",
        "Stream handles and the predefined streams sys.stdin, sys.stdout, sys.stderr",
        "Read(), readline(), readlines(), write(), readinto() with bytearray, close() and with",
        "Errno values (for example ENOENT, EACCES) on I/O errors"
      ],
      notes: ["Section 5 objectives: 5.1–5.4 (comprehensions, lambdas, closures, generators, file processing)"],
      labs: [
        "Rewrite five for-loops from your own code as list comprehensions, then do the same task with `map()`/`filter()` and a lambda, and compare readability.",
        "Write a closure-based counter factory and a generator that yields Fibonacci numbers; step through both in Python Tutor to watch the saved state.",
        "Write a script that copies a binary file in 4 KB chunks with `readinto()` and a `bytearray`, logs errors to `sys.stderr`, and prints `errno.errorcode[e.errno]` when the source is missing."
      ]
    }
  ],

  study: {
    1: [
      ["What is the difference between `import math` and `from math import sqrt`?", "`import math` binds only the name math; you call math.sqrt(). `from math import sqrt` binds sqrt directly in your namespace and does not bind math."],
      ["Why do modules often end with `if __name__ == \"__main__\":`?", "When a file is run directly, __name__ is \"__main__\"; when imported, it is the module's name. The guard lets test or demo code run only when the file is executed, not when it is imported."],
      ["How does Python find a module you import, and how can you add a folder?", "It checks already-loaded modules, built-ins, then each directory in sys.path in order (script folder, PYTHONPATH, standard library, site-packages). Append or insert a path in sys.path to add a folder at runtime."],
      ["What does `from mod import *` skip?", "Names beginning with an underscore, unless the module defines __all__, in which case only the names listed in __all__ are imported."],
      ["What are ceil, floor and trunc of -3.7?", "ceil gives -3 (toward +infinity), floor gives -4 (toward -infinity), trunc gives -3 (toward zero)."]
    ],
    2: [
      ["When do the else and finally branches of a try statement run?", "else runs only if the try block finished without an exception. finally always runs, whether an exception happened, was handled, or the block returned."],
      ["Why does the order of except branches matter?", "Python uses the first branch whose class matches (including superclasses). A broad class such as Exception or LookupError placed first will swallow its subclasses, so put specific exceptions first."],
      ["Which common exceptions derive from LookupError and ArithmeticError?", "LookupError: IndexError and KeyError. ArithmeticError: ZeroDivisionError, OverflowError and FloatingPointError."],
      ["How do you define an exception with an extra field?", "Subclass Exception, call super().__init__(message) in __init__ so args and str() work, and store the extra value as an attribute, e.g. self.code = code."],
      ["Why should you avoid a bare `except:`?", "It also catches BaseException subclasses such as KeyboardInterrupt and SystemExit, which can hide bugs and stop users interrupting the program. Catch specific exceptions, or Exception at most."]
    ],
    3: [
      ["What is the difference between a code point and its UTF-8 encoding?", "A code point is the number Unicode assigns to a character (ord('A') is 65). UTF-8 is a way of storing code points as 1 to 4 bytes; ASCII characters take one byte."],
      ["What does 'Python'[1:5:2] return, and why?", "'yh': start at index 1 ('y'), stop before 5, step 2, so indices 1 and 3."],
      ["How do find() and index() differ?", "Both return the lowest index of a substring. find() returns -1 if it is missing; index() raises ValueError. rfind() searches from the right."],
      ["Why does '10' < '9' evaluate to True?", "Strings compare character by character by code point; '1' (49) is less than '9' (57), so the comparison ends at the first character."],
      ["What is the difference between sorted(s) and s.sort() for a string s?", "sorted(s) returns a new list of the characters in order. Strings have no sort() method because they are immutable; list.sort() sorts a list in place and returns None."]
    ],
    4: [
      ["How do class variables differ from instance variables?", "Class variables live in the class's __dict__ and are shared by all instances. Instance variables are created on self (usually in __init__) and live in each object's __dict__. Assigning obj.x = … creates an instance variable that shadows the class one."],
      ["What is name mangling?", "An attribute named __attr (two leading underscores, at most one trailing) inside class C is stored as _C__attr. It hides the name from casual access and subclasses but is not true privacy."],
      ["Explain the MRO for class D(B, C) where B and C both inherit from A.", "Python uses C3 linearization: D, B, C, A, object. Method lookup follows that order, so B's version wins over C's, and A is visited only once."],
      ["What does super().__init__() do and what happens if a subclass forgets it?", "It calls the next class's __init__ in the MRO. If the subclass defines __init__ without calling it, attributes set by the parent's __init__ are never created."],
      ["What is the difference between `is` and `==`?", "`is` tests identity (the same object); `==` tests equality of value via __eq__. Two separate lists with the same items are == but not is."],
      ["Which attributes help with introspection of a class?", "__name__ (class name), __module__ (module where it was defined, '__main__' for the script), __bases__ (tuple of direct superclasses), __dict__ (its namespace) and __mro__; plus hasattr() and isinstance()."]
    ],
    5: [
      ["Rewrite `result = []; for x in data: if x > 0: result.append(x * 2)` as a comprehension.", "result = [x * 2 for x in data if x > 0]"],
      ["What is a closure?", "An inner function that keeps access to variables of the enclosing function after that function has returned. The variables are looked up when the inner function runs (late binding)."],
      ["How does a generator differ from a function that returns a list?", "A generator function uses yield; calling it returns a generator object that produces values lazily, one per next() call, keeping its state between calls, and raises StopIteration when finished."],
      ["Compare open() modes 'w', 'a' and 'x'.", "'w' creates or truncates the file, 'a' creates or appends to the end, 'x' creates a new file and raises FileExistsError if it already exists. Add 'b' for binary and '+' for read and write."],
      ["How do you tell why an open() call failed?", "Catch OSError (IOError is an alias) as e and compare e.errno with constants from the errno module, such as errno.ENOENT (no such file) or errno.EACCES (permission denied)."]
    ]
  },

  questions: [
    /* ---------- 1 Modules and Packages ---------- */
    ["pc1",0,1,"What is the output of the following code?\nimport math\nprint(math.ceil(-2.5), math.floor(-2.5), math.trunc(-2.5))",["-3 -2 -2","-3 -3 -2","-2 -3 -3","-2 -3 -2"],3,"ceil rounds toward positive infinity (-2), floor toward negative infinity (-3), and trunc toward zero (-2). Mixing up trunc and floor for negative numbers is the usual trap.","1.2 math module"],
    ["pc2",0,1,"A script contains `from math import sqrt as root` and no other imports. Which name can the script use to call the square-root function?",["math.sqrt","sqrt","root","math.root"],2,"The as clause binds only the alias root. Neither math nor sqrt is bound, so math.sqrt and sqrt raise NameError.","1.1 import variants"],
    ["pc3",0,1,"A team wants a folder of modules to behave as a regular package so that `import shop.cart` works on every Python 3 version they support. Which file should the shop folder contain?",["__init__.py","__main__.py","setup.py","__pycache__"],0,"__init__.py marks a directory as a regular package and runs when it is imported. __main__.py is used when running a package with -m, and __pycache__ holds compiled bytecode.","1.4 packages"],
    ["pc4",0,1,"The file greet.py contains only `print(__name__)`. Another script in the same folder runs `import greet`. What does the import print?",["greet","__main__","greet.py","__greet__"],0,"When a module is imported, __name__ is the module name without the .py extension. It is \"__main__\" only when the file itself is run.","1.4 __name__"],
    ["pc5",0,1,"A developer keeps shared modules in /opt/pylibs and wants one script to import them without changing environment variables. Which statement, run before the import, achieves this?",["sys.path.append('/opt/pylibs')","os.chdir('/opt/pylibs/..')","sys.modules.add('/opt/pylibs')","import path('/opt/pylibs')"],0,"sys.path is the list of directories searched for modules, so appending to it works at runtime. sys.modules is a dict of loaded modules, not search locations.","1.4 sys.path"],
    ["pc6",0,1,"What is the output of the following code?\nimport random\nrandom.seed(5)\na = random.random()\nrandom.seed(5)\nb = random.random()\nprint(a == b)",["False","None","True","0.5"],2,"Seeding the generator with the same value restarts the same pseudo-random sequence, so both calls return the same float. Without reseeding, the values would differ.","1.2 random module"],
    ["pc7",0,1,"Which function returns the Python version as a tuple of strings, such as ('3', '12', '4')?",["platform.python_version()","platform.version()","sys.version_info.tuple()","platform.python_version_tuple()"],3,"python_version_tuple() returns a tuple of strings. python_version() returns a single string, and platform.version() describes the operating system version.","1.2 platform module"],
    ["pc8",0,1,"After importing a module for the first time, a developer notices a new __pycache__ folder beside it. What does the folder contain?",["Compiled bytecode (.pyc) files","A backup of the source file","Cached results of function calls","Log files of each import"],0,"Python saves compiled bytecode in __pycache__ so later imports can skip compiling unchanged source. It does not cache function results or logs.","1.4 __pycache__"],
    ["pc9",0,1,"What is the output of the following code?\nimport math\nprint(math.hypot(3, 4))",["5","25.0","7.0","5.0"],3,"hypot returns the Euclidean distance sqrt(3*3 + 4*4) as a float, 5.0. It never returns an int, and it does not return the sum of squares.","1.2 math module"],
    ["pc10",0,1,"Module cfg.py defines `_secret = 1` and `level = 2` and has no __all__. A script runs `from cfg import *`. Which names does the script now have?",["_secret only","cfg, level and _secret","level and _secret","level only"],3,"from … import * skips names that start with an underscore when __all__ is not defined, and it never binds the module name cfg itself.","1.1 import variants"],
    ["pc11",0,1,"What is the output of the following code?\nimport math\nprint(math.factorial(5) // math.sqrt(16))",["30.0","30","30.5","7.5"],0,"factorial(5) is 120 and sqrt always returns a float (4.0). Floor division with a float operand gives a float, so the result is 30.0, not the int 30.","1.2 math module"],

    /* ---------- 2 Exceptions ---------- */
    ["pc12",0,2,"What is the output of the following code?\ntry:\n    x = int('3.5')\nexcept ValueError:\n    print('V', end='')\nexcept Exception:\n    print('E', end='')\nelse:\n    print('OK', end='')\nfinally:\n    print('F', end='')",["EF","OKF","V","VF"],3,"int('3.5') raises ValueError, so the first matching branch prints V; else is skipped because an exception occurred, and finally always prints F.","2.1 try/except/else/finally"],
    ["pc13",0,2,"What is the output of the following code?\ntry:\n    print(1 / 0)\nexcept (ZeroDivisionError, TypeError) as e:\n    print(type(e).__name__)",["ArithmeticError","Exception","TypeError","ZeroDivisionError"],3,"The tuple branch matches either class, and e is bound to the actual exception object, a ZeroDivisionError. Its parent ArithmeticError is not what type(e) reports.","2.1 handling multiple exceptions"],
    ["pc14",0,2,"Which built-in exception is the direct parent class of ZeroDivisionError?",["ValueError","LookupError","ArithmeticError","RuntimeError"],2,"ZeroDivisionError, OverflowError and FloatingPointError derive from ArithmeticError. LookupError is the parent of IndexError and KeyError.","2.1 exception hierarchy"],
    ["pc15",0,2,"A function reads both list positions and dictionary keys supplied by a user. The developer wants a single except branch that catches IndexError and KeyError but not other errors. Which class should the branch name?",["Exception","AttributeError","ValueError","LookupError"],3,"IndexError and KeyError both derive from LookupError. Exception would also catch unrelated errors such as TypeError, which the developer wants to let through.","2.1 exception hierarchy"],
    ["pc16",0,2,"What is the output of the following code?\ntry:\n    d = {}\n    d['k']\nexcept LookupError:\n    print('L')\nexcept KeyError:\n    print('K')",["K","LK","L","Nothing is printed"],2,"KeyError is a subclass of LookupError, and Python takes the first matching branch, so L is printed and the KeyError branch is never reached.","2.1 order of except branches"],
    ["pc17",0,2,"What is the output of the following code?\nx = -1\ntry:\n    assert x > 0, 'neg'\nexcept AssertionError as e:\n    print(e.args)",["('neg',)","neg","()","['neg']"],0,"The assert message becomes the single argument of AssertionError, and args is always a tuple, so the output is ('neg',). Printing e itself would show neg.","2.1 assert and args"],
    ["pc18",0,2,"A library author is writing a custom exception for invalid configuration. Which base class is the best choice?",["Exception","BaseException","object","SystemExit"],0,"User-defined exceptions should inherit from Exception so that `except Exception` handlers catch them. BaseException is reserved for system-exiting exceptions such as KeyboardInterrupt, and a plain object cannot be raised.","2.2 self-defined exceptions"],
    ["pc19",0,2,"What is the output of the following code?\nclass AppError(Exception):\n    def __init__(self, msg, code):\n        super().__init__(msg)\n        self.code = code\ntry:\n    raise AppError('bad', 42)\nexcept AppError as e:\n    print(e, e.code)",["('bad', 42) 42","AppError 42","bad 42","bad None"],2,"Only msg is passed to Exception.__init__, so str(e) is 'bad', and code is stored as an attribute set to 42.","2.2 self-defined exceptions"],
    ["pc20",0,2,"Inside an except branch, a developer logs the error and then wants the same exception to keep propagating to the caller with its original traceback. What should the next statement be?",["return e","raise Exception","pass","raise"],3,"A bare raise inside an except branch re-raises the exception currently being handled. raise Exception would replace it with a new, less specific exception.","2.1 raise"],
    ["pc21",0,2,"What is the output of the following code?\ndef f():\n    try:\n        return 1\n    finally:\n        print('F', end=' ')\nprint(f())",["1","1 F","F","F 1"],3,"finally runs before the function actually returns, so F is printed first; then the returned value 1 is printed by the outer print call.","2.1 finally"],
    ["pc22",0,2,"A long-running loop is wrapped in `try: … except Exception: print('error')`. The user presses Ctrl+C. What happens?",["The branch prints error and the loop continues","The handler ignores it but the loop restarts","KeyboardInterrupt is not caught and ends the program","Python converts it into a ValueError first"],2,"KeyboardInterrupt derives from BaseException, not Exception, so `except Exception` does not catch it and the program stops. A bare except: would catch it, which is why bare excepts are discouraged.","2.1 exception hierarchy"],
    ["pc23",0,2,"In a try statement with except and else branches, when does the else branch run?",["Only when the try block raised no exception","Only when an exception was handled","Always, after the except branch","Only when an exception was not handled"],0,"else runs only after the try block completes without raising. Code that must always run belongs in finally instead.","2.1 else branch"],
    ["pc24",0,2,"What is the output of the following code?\ntry:\n    raise ValueError\nexcept ValueError as e:\n    print(len(e.args))",["1","None","0","An error is raised"],2,"Raising the class without arguments creates an instance with an empty args tuple, so len is 0. Passing a message would make args hold one item.","2.1 args"],

    /* ---------- 3 Strings ---------- */
    ["pc25",0,3,"What is the output of the following code?\nprint(ord('a') - ord('A'))",["26","-32","1","32"],3,"In ASCII and Unicode, 'A' is 65 and 'a' is 97, so the difference is 32. 26 is the number of letters, a tempting but wrong guess.","3.1 ord()"],
    ["pc26",0,3,"What is the output of the following code?\nprint(chr(ord('C') + 2))",["E","D","67","C2"],0,"ord('C') is 67; adding 2 gives 69, and chr(69) is 'E'. chr returns a character, not a number.","3.1 chr()"],
    ["pc27",0,3,"What is the output of the following code?\ns = 'Python'\nprint(s[-4:-1])",["thon","ytho","tho","hon"],2,"Index -4 is 't' and the slice stops before -1 ('n'), giving 'tho'. The stop index is always excluded.","3.2 slicing"],
    ["pc28",0,3,"A script runs `s = 'java'` and then `s[0] = 'J'`. What happens?",["s becomes 'Java'","An IndexError is raised","A new string is bound to s[0]","A TypeError is raised"],3,"Strings are immutable and do not support item assignment, so Python raises TypeError. To change it, build a new string such as 'J' + s[1:].","3.2 immutability"],
    ["pc29",0,3,"What is the output of the following code?\nprint('10' < '9', 10 < 9)",["True False","False False","False True","True True"],0,"Strings compare character by character: '1' has a lower code point than '9', so '10' < '9' is True. The integers compare numerically, so 10 < 9 is False.","3.2 comparing strings"],
    ["pc30",0,3,"What is the output of the following code?\nprint('-'.join(['a', 'b', 'c']))",["-a-b-c","a-b-c-","a-b-c","abc-"],2,"join places the separator only between items, never before the first or after the last.","3.3 join()"],
    ["pc31",0,3,"What is the output of the following code?\nprint('a,b,,c'.split(','))",["['a', 'b', 'c']","['a,b,,c']","['a', 'b', ',', 'c']","['a', 'b', '', 'c']"],3,"With an explicit separator, split keeps empty strings between adjacent separators. Only split() with no argument collapses runs of whitespace.","3.3 split()"],
    ["pc32",0,3,"What is the output of the following code?\nprint(' a  b '.split())",["['a', 'b']","['', 'a', '', 'b', '']","[' a', ' b ']","['a', '', 'b']"],0,"split() without arguments splits on runs of whitespace and ignores leading and trailing whitespace, so no empty strings appear.","3.3 split()"],
    ["pc33",0,3,"What is the output of the following code?\ns = 'banana'\nprint(s.find('na'), s.rfind('na'), s.find('x'))",["2 4 -1","2 4 None","3 5 -1","2 2 -1"],0,"find returns the lowest index (2), rfind the highest (4), and find returns -1 when the substring is missing instead of raising an error.","3.3 find() and rfind()"],
    ["pc34",0,3,"A parser calls `line.index(':')` on user input that sometimes has no colon, and the program crashes. Which change avoids the crash while still showing when the colon is missing?",["Use line.find(':') and check for -1","Use line.rindex(':') instead","Use line.count(':') as the position","Wrap the string with str() first"],0,"find returns -1 instead of raising ValueError. rindex behaves like index and still raises, and count returns how many times the colon appears, not where.","3.3 find() vs index()"],
    ["pc35",0,3,"What is the output of the following code?\nprint(sorted('bca'))",["abc","None","('a', 'b', 'c')","['a', 'b', 'c']"],3,"sorted accepts any iterable and always returns a new list, so it returns a list of characters, not a string. Use ''.join(sorted(s)) to get 'abc'.","3.3 sorted()"],
    ["pc36",0,3,"What is the output of the following code?\nprint('3'.isdigit(), 'a1'.isalnum(), 'Ab'.isupper())",["True False False","True True True","False True False","True True False"],3,"'3' is a digit, 'a1' contains only letters and digits, and 'Ab' has a lowercase letter, so isupper() is False.","3.3 isxxx() methods"],
    ["pc37",0,3,"What is the output of the following code?\nprint(len('\\n\\t\\\\'))",["3","4","5","6"],0,"Each escape sequence is a single character: newline, tab and one backslash, so the length is 3.","3.1 escape sequences"],
    ["pc38",0,3,"Which statement about Unicode and UTF-8 is correct?",["Every UTF-8 character takes exactly two bytes","UTF-8 can only encode the first 256 code points","A code point is a number and UTF-8 stores it in 1 to 4 bytes","ASCII and UTF-8 give different bytes for 'A'"],2,"Unicode assigns each character a code point, and UTF-8 is a variable-width encoding using 1 to 4 bytes. ASCII characters, such as 'A', are encoded identically in both.","3.1 encoding"],
    ["pc39",0,3,"What is the output of the following code?\nprint('ell' in 'Hello', 'H' not in 'hello')",["True False","False True","True True","False False"],2,"'ell' is a substring of 'Hello'. The comparison is case-sensitive, so uppercase 'H' is not in 'hello', which makes `not in` True.","3.2 in and not in"],
    ["pc40",0,3,"Which expression raises a TypeError?",["'1' * 1","'1' == 1","'1' != 1","'1' < 1"],3,"Equality tests between a str and an int simply return False or True, and str * int repeats the string. Ordering comparisons such as < between str and int are not supported and raise TypeError.","3.2 comparing strings with numbers"],

    /* ---------- 4 Object-Oriented Programming ---------- */
    ["pc41",0,4,"What is the output of the following code?\nclass A:\n    count = 0\n    def __init__(self):\n        A.count += 1\na = A()\nb = A()\nprint(A.count, a.count)",["2 2","2 0","1 1","2 1"],0,"count is a class variable shared by every instance; each constructor call increments A.count, and a.count finds the class variable because the instance has none of its own.","4.2 class variables"],
    ["pc42",0,4,"What is the output of the following code?\nclass A:\n    x = 1\na = A()\na.x = 5\nprint(A.x, a.x)",["5 5","1 1","1 5","5 1"],2,"Assigning a.x creates an instance variable that shadows the class variable; A.x is unchanged at 1.","4.2 instance vs class variables"],
    ["pc43",0,4,"What is the output of the following code?\nclass A:\n    def __init__(self):\n        self.v = 1\na = A()\nprint(a.__dict__)",["{}","{'__init__': 1}","{'self.v': 1}","{'v': 1}"],3,"An instance's __dict__ holds only its instance variables. Methods such as __init__ live in the class's __dict__.","4.3 __dict__"],
    ["pc44",0,4,"What is the output of the following code?\nclass A:\n    def __init__(self):\n        self.__s = 7\na = A()\nprint(a._A__s)",["An AttributeError is raised","None","7","__s"],2,"Name mangling stores self.__s as _A__s, so it can still be reached with the mangled name. Accessing a.__s from outside the class would raise AttributeError.","4.3 private attributes"],
    ["pc45",0,4,"What is the output of the following code?\nclass A:\n    def __init__(self):\n        self.__p = 1\nprint(hasattr(A(), '__p'))",["True","1","None","False"],3,"Because of name mangling the attribute is stored as _A__p, so no attribute called __p exists and hasattr returns False.","4.5 introspection"],
    ["pc46",0,4,"What is the output of the following code?\nclass A:\n    pass\nclass B(A):\n    pass\nprint(B.__bases__[0].__name__)",["A","B","object","__main__"],0,"__bases__ is a tuple of direct superclasses, here (A,), and __name__ gives the class name. object is A's base, not B's.","4.5 __bases__"],
    ["pc47",0,4,"What is the output of the following code?\nclass A:\n    def who(self):\n        return 'A'\nclass B(A):\n    def who(self):\n        return 'B'\nclass C(A):\n    def who(self):\n        return 'C'\nclass D(B, C):\n    pass\nprint(D().who())",["A","D","C","B"],3,"D's MRO is D, B, C, A, object; B is searched first because it is listed first, so its who() is used.","4.6 multiple inheritance"],
    ["pc48",0,4,"Classes are defined as A, B(A), C(A) and D(B, C). What is the output of `print([k.__name__ for k in D.__mro__])`?",["['D', 'B', 'A', 'C', 'object']","['D', 'C', 'B', 'A', 'object']","['D', 'B', 'C', 'object', 'A']","['D', 'B', 'C', 'A', 'object']"],3,"C3 linearization visits the shared base A only after both B and C, giving D, B, C, A, object. A depth-first order that visits A before C is the classic wrong guess.","4.6 MRO and diamonds"],
    ["pc49",0,4,"What is the output of the following code?\nclass A:\n    def __init__(self):\n        self.x = 1\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        self.x += 1\nprint(B().x)",["1","2","3","An AttributeError is raised"],1,"super().__init__() runs A's constructor, setting x to 1, and B then adds 1, so x is 2.","4.6 super()"],
    ["pc50",0,4,"What is the output of the following code?\nclass A:\n    def __init__(self):\n        self.x = 1\nclass B(A):\n    def __init__(self):\n        self.y = 2\nb = B()\nprint(hasattr(b, 'x'))",["True","False","1","None"],1,"B overrides __init__ and never calls super().__init__(), so A's constructor never runs and x is never set.","4.6 overriding constructors"],
    ["pc51",0,4,"What is the output of the following code?\nclass P:\n    def __str__(self):\n        return 'P!'\nprint(P())",["P","P!","<__main__.P object>","None"],1,"print calls str() on its argument, which uses the class's __str__ method. Without __str__, a default representation such as <__main__.P object at 0x…> would appear.","4.6 __str__()"],
    ["pc52",0,4,"What is the output of the following code?\nclass A:\n    pass\nclass B(A):\n    pass\nb = B()\nprint(isinstance(b, A), issubclass(A, B))",["True True","False False","False True","True False"],3,"An instance of a subclass is also an instance of its superclass, so isinstance is True. A is the parent of B, not a subclass of it, so issubclass(A, B) is False.","4.6 isinstance() and issubclass()"],
    ["pc53",0,4,"What is the output of the following code?\na = [1]\nb = a\nc = [1]\nprint(a is b, a is c, a == c)",["True True True","True False True","True False False","False False True"],1,"b refers to the same list object as a, so `a is b` is True. c is a separate list with equal contents, so `is` is False but == is True.","4.6 is operator"],
    ["pc54",0,4,"What is the output of the following code?\nclass Shape:\n    def area(self):\n        return 0\nclass Sq(Shape):\n    def __init__(self, s):\n        self.s = s\n    def area(self):\n        return self.s ** 2\nfor sh in [Shape(), Sq(3)]:\n    print(sh.area(), end=' ')",["0 0","0 9","9 9","0 6"],1,"Polymorphism: each object uses its own class's area(). Shape returns 0, and Sq overrides it to return 3 ** 2, which is 9.","4.6 polymorphism"],
    ["pc55",0,4,"A new developer asks why every method in a class has `self` as its first parameter. Which explanation is correct?",["self is a reserved keyword that Python adds itself","self receives the object the method was called on","self holds the class, so class variables can be changed","self is optional and only needed for private methods"],1,"When you call obj.m(), Python passes obj as the first argument, conventionally named self. It is a convention, not a keyword, and it refers to the instance, not the class.","4.4 methods and self"],
    ["pc56",0,4,"A BankAccount class must stop outside code from accidentally overwriting its balance with `acct.balance = 0`, while methods inside the class still use it. Which design follows PCAP-style encapsulation?",["Store it as a class variable called balance","Store it as self.__balance and expose methods","Store it as a global variable in the module","Store it in a local variable inside __init__"],1,"A double-underscore instance attribute is name-mangled, so outside code cannot reach it by its plain name, and deposit/withdraw methods control changes. A local variable in __init__ disappears when the constructor ends.","4.1 encapsulation"],
    ["pc57",0,4,"What is the output of the following code when it is run directly as a script?\nclass A:\n    pass\nprint(A.__module__)",["A","__main__","main","None"],1,"__module__ holds the name of the module where the class was defined; for the script being run, that module is __main__.","4.5 __module__"],
    ["pc58",0,4,"What is the output of the following code?\nclass A:\n    x = 1\nprint('x' in A().__dict__, 'x' in A.__dict__)",["True True","False True","True False","False False"],1,"x is a class variable, so it appears in the class's __dict__. A new instance has no instance variables yet, so its __dict__ is empty.","4.3 __dict__"],
    ["pc59",0,4,"A class defines `def f():` with no parameters, and a script calls `A().f()`. Which exception is raised?",["AttributeError","NameError","TypeError","ValueError"],2,"Python passes the instance as the first argument, but f accepts none, so the call fails with TypeError (takes 0 positional arguments but 1 was given). The method exists, so it is not an AttributeError.","4.4 methods and self"],
    ["pc60",0,4,"What is the output of the following code?\nclass A:\n    x = 'A'\nclass B:\n    x = 'B'\nclass C(A, B):\n    pass\nprint(C.x)",["A","B","AB","An error is raised"],0,"Attribute lookup follows the MRO C, A, B, object, so A.x is found first. Class variables use the same lookup order as methods.","4.6 multiple inheritance"],
    ["pc61",0,4,"A developer writes `class A: pass`, `class B(A): pass` and then `class C(A, B): pass`. What happens when the last class statement runs?",["C is created with MRO C, A, B, object","C is created with MRO C, B, A, object","A TypeError is raised: no consistent MRO","C is created but calls to its methods fail"],2,"Listing A before its own subclass B makes C3 linearization impossible, so Python raises TypeError when the class is defined. Swapping the order to C(B, A) works.","4.6 MRO"],
    ["pc62",0,4,"What is the output of the following code?\nclass A:\n    def hi(self):\n        return 'A'\nclass B(A):\n    def hi(self):\n        return 'B' + super().hi()\nprint(B().hi())",["B","A","AB","BA"],3,"B's override builds its result from 'B' followed by the parent's result 'A', giving BA.","4.6 overriding and super()"],
    ["pc63",0,4,"What is the output of the following code?\nclass A:\n    items = []\n    def add(self, v):\n        self.items.append(v)\na, b = A(), A()\na.add(1)\nprint(b.items)",["[]","[1]","None","An AttributeError is raised"],1,"items is a mutable class variable; self.items.append mutates the single shared list rather than creating an instance copy, so b sees the change.","4.2 class variables"],
    ["pc64",0,4,"A Car needs an Engine. The developer writes `class Car(Engine)`, and a reviewer objects. What is the reviewer's likely point?",["Inheritance cannot be used with constructors","A car has an engine, so composition fits better","Car must inherit from object explicitly first","Only one level of inheritance is allowed"],1,"Inheritance models an is-a relationship. A car has an engine, so storing an Engine object as an attribute (composition) models it correctly. Python allows many levels of inheritance.","4.1 OOP concepts"],
    ["pc65",0,4,"What is the output of the following code?\nclass Dog:\n    pass\nd = Dog()\nprint(type(d).__name__, d.__class__ is Dog)",["Dog True","d True","Dog False","object True"],0,"type(d) and d.__class__ both return the class Dog, whose __name__ is 'Dog'. The variable name d is not stored in the object.","4.5 introspection"],
    ["pc66",0,4,"What is the output of the following code?\nclass A:\n    def __init__(self, v=0):\n        self.v = v\nprint(A().v + A(5).v)",["0","5","10","An error is raised"],1,"The first object uses the default v=0 and the second receives 5, so the sum is 5.","4.4 constructors"],
    ["pc67",0,4,"What is the output of the following code?\nclass A:\n    def set(self):\n        self.z = 3\na = A()\nprint(hasattr(a, 'z'), end=' ')\na.set()\nprint(hasattr(a, 'z'))",["False True","True True","False False","True False"],0,"Instance variables can be created in any method, not only __init__; z does not exist until set() runs.","4.2 instance variables"],
    ["pc68",0,4,"What is the output of the following code?\nclass A:\n    pass\nprint(A.__bases__)",["()","(<class 'object'>,)","None","(<class 'type'>,)"],1,"In Python 3 every class without an explicit base inherits from object, so __bases__ is a one-item tuple containing object. type is the metaclass, not a base.","4.5 __bases__"],
    ["pc69",0,4,"Class Manager inherits from class Employee. Which statement uses the terms correctly?",["Employee is the subclass of Manager","Manager is the superclass of Employee","Employee is the superclass of Manager","Manager and Employee are sibling classes"],2,"The class being inherited from is the superclass (Employee); the class that inherits is the subclass (Manager).","4.1 OOP concepts"],
    ["pc70",0,4,"What is the output of the following code?\nclass A:\n    n = 0\na = A()\nb = A()\na.n += 1\nA.n = 10\nprint(a.n, b.n)",["10 10","1 1","1 10","11 10"],2,"a.n += 1 reads the class value 0 and creates an instance variable a.n = 1. Changing A.n later affects only instances without their own n, so b.n is 10.","4.2 instance vs class variables"],

    /* ---------- 5 Miscellaneous ---------- */
    ["pc71",0,5,"What is the output of the following code?\nprint([x * x for x in range(5) if x % 2])",["[0, 4, 16]","[1, 9]","[1, 4, 9, 16]","[1, 3]"],1,"x % 2 is truthy only for odd x (1 and 3), whose squares are 1 and 9. [0, 4, 16] would be the result for even numbers.","5.1 list comprehensions"],
    ["pc72",0,5,"What is the output of the following code?\nprint([i for i in range(3) for j in range(2)])",["[0, 1, 2, 0, 1, 2]","[0, 0, 1, 1, 2, 2]","[0, 1, 0, 1, 0, 1]","[[0, 0], [1, 1], [2, 2]]"],1,"The for clauses nest left to right, so for each i the inner loop runs twice, repeating i. The result is a flat list, not a list of lists.","5.1 nested comprehensions"],
    ["pc73",0,5,"What is the output of the following code?\nf = lambda x, y=2: x ** y\nprint(f(3), f(2, 3))",["9 8","6 6","9 9","8 9"],0,"f(3) uses the default y=2, giving 9; f(2, 3) is 2 cubed, giving 8.","5.2 lambdas"],
    ["pc74",0,5,"What is the output of the following code?\nprint(list(map(lambda x: x * 2, [1, 2, 3])))",["[1, 2, 3, 1, 2, 3]","[2, 4, 6]","[2, 3, 4]","<map object>"],1,"map applies the lambda to each element and list() collects the results. Multiplying the list itself by 2 would give the repeated list.","5.2 map()"],
    ["pc75",0,5,"What is the output of the following code?\nprint(list(filter(lambda s: len(s) > 2, ['a', 'abc', 'de', 'xyz'])))",["['a', 'de']","[False, True, False, True]","['abc', 'xyz']","[3, 3]"],2,"filter keeps the items for which the function returns a true value; it does not return the booleans themselves.","5.2 filter()"],
    ["pc76",0,5,"What is the output of the following code?\ndef outer(n):\n    def inner(x):\n        return x + n\n    return inner\nadd5 = outer(5)\nprint(add5(10))",["5","10","15","An error is raised"],2,"inner is a closure that remembers n = 5 after outer returns, so add5(10) is 15.","5.3 closures"],
    ["pc77",0,5,"What is the output of the following code?\nfs = [lambda: i for i in range(3)]\nprint([f() for f in fs])",["[0, 1, 2]","[2, 2, 2]","[0, 0, 0]","[3, 3, 3]"],1,"Each lambda looks up i when it is called, not when it is created. By then the comprehension has finished with i = 2, so all three return 2.","5.3 closures and late binding"],
    ["pc78",0,5,"What is the output of the following code?\ndef gen():\n    yield 1\n    yield 2\ng = gen()\nprint(next(g), next(g))",["1 1","1 2","2 2","[1, 2]"],1,"A generator pauses at each yield and resumes from there on the next call to next(), so the calls return 1 and then 2.","5.3 generators"],
    ["pc79",0,5,"A generator function yields exactly two values. A script calls next() on the generator object a third time without a default. What happens?",["It returns None","It restarts and returns the first value","StopIteration is raised","IndexError is raised"],2,"An exhausted generator raises StopIteration on next(). for loops catch this automatically, but a direct next() call without a default does not.","5.3 generators"],
    ["pc80",0,5,"What is the output of the following code?\nm = map(str, [1, 2])\nprint(list(m), list(m))",["['1', '2'] []","['1', '2'] ['1', '2']","[1, 2] [1, 2]","[] []"],0,"map returns a one-shot iterator. The first list() consumes it, so the second list() gets nothing.","5.2 map()"],
    ["pc81",0,5,"A script must add one line to the end of an existing log file each time it runs, keeping all earlier lines. Which open() mode should it use?",["'w'","'x'","'r+'","'a'"],3,"'a' opens for appending and creates the file if needed. 'w' truncates the file, 'x' fails if the file exists, and 'r+' writes from the start unless you seek.","5.4 open() modes"],
    ["pc82",0,5,"A program reads a PNG image with open('logo.png', 'rb').read(). What type is the returned value?",["str","bytes","bytearray","list"],1,"Binary mode returns bytes objects instead of decoded str. A bytearray is only filled when you pass one to readinto().","5.4 binary mode"],
    ["pc83",0,5,"A command-line tool prints results to standard output, and error messages must stay separate so they are not redirected into the results file. Where should error messages be written?",["sys.stdin","sys.stdout","sys.stderr","sys.argv"],2,"sys.stderr is the predefined stream for diagnostics and is not captured by a plain `>` redirect. sys.stdin is for input and sys.argv is a list of arguments.","5.4 predefined streams"],
    ["pc84",0,5,"A backup script wants to print a friendly message only when a file is missing, and re-raise every other I/O error. Which test inside `except OSError as e:` does this?",["if e.errno == errno.ENOENT:","if e.errno == errno.EACCES:","if e.args == 'missing':","if e.strerror is None:"],0,"errno.ENOENT means no such file or directory. EACCES is permission denied, and args is a tuple, never equal to a plain string.","5.4 errno"],
    ["pc85",0,5,"A loop calls f.readline() on a text file opened in 'r' mode. How can the loop tell that the end of the file has been reached?",["readline() returns None","readline() returns an empty string ''","readline() raises EOFError","readline() returns '\\n'"],1,"readline returns '' only at end of file; a blank line in the middle of the file comes back as '\\n'. EOFError is raised by input(), not by file reads.","5.4 readline()"],
    ["pc86",0,5,"A program opens a binary file and runs `buf = bytearray(8)` and then `n = f.readinto(buf)`. What is stored in n?",["The bytes that were read","The number of bytes read into buf","The new file position in characters","True if buf was filled completely"],1,"readinto fills the existing bytearray in place and returns how many bytes it read, which may be less than 8 near the end of the file.","5.4 readinto() and bytearray"],
    ["pc87",0,5,"What is the output of the following code?\nb = bytearray(3)\nb[0] = 65\nprint(list(b))",["[65, 0, 0]","['A', 0, 0]","[65]","[0, 0, 65]"],0,"bytearray(3) creates three zero bytes, and bytearrays are mutable, so assigning 65 to index 0 changes the first byte. Items are integers, not characters.","5.4 bytearray"],
    ["pc88",0,5,"What is the output of the following code?\nm = [[r * c for c in range(3)] for r in range(2)]\nprint(m[1])",["[0, 0, 0]","[0, 1, 2]","[1, 2, 3]","[0, 2, 4]"],1,"Row r = 1 multiplies 1 by each column 0, 1 and 2. Row 0 would be all zeros.","5.1 nested comprehensions"],
    ["pc89",0,5,"What is the output of the following code?\nprint(sorted(['bb', 'a', 'ccc'], key=lambda s: -len(s)))",["['a', 'bb', 'ccc']","['bb', 'a', 'ccc']","['ccc', 'bb', 'a']","['a', 'ccc', 'bb']"],2,"The key function sorts by negative length, so the longest string comes first. Without the key, alphabetical order would give ['a', 'bb', 'ccc'].","5.2 lambdas as arguments"],
    ["pc90",0,5,"A function writes data to a file and may raise an exception halfway through. Which approach guarantees the file is closed either way?",["Call f.close() at the end of the function","Open the file in a with statement","Open the file in 'x' mode","Call f.flush() after every write"],1,"A with block closes the file when it exits, even if an exception is raised. A close() at the end is skipped when an exception jumps out first, and flush() does not close.","5.4 closing files"]
  ]
});
