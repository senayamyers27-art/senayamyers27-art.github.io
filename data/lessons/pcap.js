/* Lessons for PCAP – Certified Associate Python Programmer (PCAP-31-03): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("pcap", [
 {
  "t": "Import variants: import, import as, from … import, from … import *, and what each puts in the namespace",
  "body": [
   "A module is simply a file of Python code, and importing it lets you reuse what it defines. The PCAP exam cares less about the fact that you can import and more about exactly which names become available afterwards. Every module and script has its own namespace: a table that maps names to objects. Each import form adds different entries to the importing namespace, and many exam questions are really asking whether a particular name exists at a particular moment.",
   "The plain form `import math` adds exactly one name, `math`, which refers to the module object. Everything inside it must be qualified: `math.pi`, `math.sqrt(2)`. Writing `sqrt(2)` on its own raises NameError because `sqrt` was never placed in your namespace. The aliased form `import math as m` adds only `m`; the name `math` is not defined, so `math.pi` fails while `m.pi` works. Aliases are handy for long module names and are common with modules such as `import numpy as np` in the wider ecosystem.",
   "The form `from math import sqrt, pi` works the other way round. It adds `sqrt` and `pi` directly, so you call `sqrt(2)` without a prefix, but the name `math` is not defined. You can alias individual names too: `from math import sqrt as root`. Because the names land directly in your namespace, they can collide with your own: if you later write `pi = 3`, you have replaced the imported value, and if you define your own `sqrt` and then import one, the import wins because it happened later. The last binding always wins.",
   "The star form `from math import *` copies every public name from the module into your namespace. If the module defines a list called `__all__`, only the names in that list are imported; otherwise every name that does not start with an underscore is imported. Star imports are discouraged in real code because they hide where a name came from and can silently overwrite your own names, but the exam expects you to know the underscore and `__all__` rules.",
   "```python\nimport math as m\nprint(m.floor(2.7))      # 2\n# print(math.pi)         # NameError: math is not defined\n\nfrom math import pi\nprint(pi)                # 3.141592653589793\npi = 3\nprint(pi)                # 3 - your assignment replaced it\n```",
   "Two more facts round this out. A module's code runs only on its first import in a process; later imports reuse the already-loaded module object stored in `sys.modules`. And every import form executes the whole module file the first time, even `from mod import one_name`, because Python has to run the file to create the name."
  ],
  "terms": [
   [
    "Namespace",
    "A mapping from names to objects; each module, function call and class has its own."
   ],
   [
    "Alias",
    "An alternative name given with as, for example import math as m, which binds only m."
   ],
   [
    "__all__",
    "A list of strings in a module naming what from module import * should import."
   ],
   [
    "Qualified name",
    "A name written with its module prefix, such as math.sqrt."
   ]
  ],
  "example": "A data script starts with from statistics import mean and later defines its own function called mean to handle missing values. Because the def comes after the import, every later call uses the local version, and the original import is shadowed without any warning.",
  "tip": "Ask which names each line adds. import m as x defines only x, never m; from m import f defines only f, never m. Many answer options that look fine fail with NameError for exactly this reason.",
  "check": [
   [
    "After import random as r, does print(random.random()) work?",
    "No. Only the alias r is defined, so random raises NameError; you must write r.random()."
   ],
   [
    "Which names does from mod import * skip when mod has no __all__?",
    "Names beginning with an underscore, such as _helper; all other top-level names are imported."
   ],
   [
    "If a module is imported twice in the same program, how many times does its top-level code run?",
    "Once. The second import finds the module already in sys.modules and reuses it."
   ]
  ]
 },
 {
  "t": "Qualifying names in nested modules and packages (package.subpackage.module.name)",
  "body": [
   "Once a project grows past a few files, modules are grouped into packages, which are directories of modules, and packages can contain subpackages. To reach an object deep inside that tree you use a dotted path that mirrors the directory structure. For a file `extra/good/best/sigma.py` that defines a function `funS()`, the fully qualified name is `extra.good.best.sigma.funS`. Each dot steps one level down: package, subpackage, sub-subpackage, module, and finally the object inside the module.",
   "How much of that path you must type depends on how you imported. With `import extra.good.best.sigma`, Python binds only the top-level name `extra` in your namespace, and you must always write the full path: `extra.good.best.sigma.funS()`. This surprises people, but it is consistent: the import statement guarantees that every package along the path is loaded and attached as an attribute of its parent, so the chain of attribute lookups works starting from `extra`.",
   "Aliasing shortens it: `import extra.good.best.sigma as sig` binds `sig` directly to the module, so you call `sig.funS()`. The `from` form lets you stop at any level. `from extra.good.best import sigma` binds `sigma`, so you write `sigma.funS()`; `from extra.good.best.sigma import funS` binds the function itself, so you write `funS()`. Note that in the plain `import a.b.c` form the last item must be a module or package, not a function; `import extra.good.best.sigma.funS` fails with ModuleNotFoundError because `funS` is not a module.",
   "```python\n# Directory tree (each package directory has __init__.py):\n# extra/\n#     good/\n#         best/\n#             sigma.py   -> def funS(): return 'sigma'\n\nimport extra.good.best.sigma\nprint(extra.good.best.sigma.funS())\n\nfrom extra.good.best.sigma import funS\nprint(funS())\n\nimport extra.good.best.sigma as sig\nprint(sig.funS())\n```",
   "For this to work, the top-level directory, here `extra`, must be findable: it has to sit inside one of the folders listed in `sys.path`, such as the folder containing your main script. You do not add the inner folders to `sys.path`; Python walks down the tree using the dotted name. Traditionally each directory contains an `__init__.py` file marking it as a regular package, and that file runs when the package is first imported.",
   "A useful habit when reading exam code is to write down the directory tree first, then check that each dotted name matches it exactly, including spelling and which level contains the function. Many wrong answers use a path that skips a level or puts the function name where a module should be."
  ],
  "terms": [
   [
    "Package",
    "A directory of modules (and possibly subpackages) that Python can import by name."
   ],
   [
    "Subpackage",
    "A package nested inside another package, reached with a dot, such as extra.good."
   ],
   [
    "Fully qualified name",
    "The complete dotted path from the top package to an object, such as extra.good.best.sigma.funS."
   ]
  ],
  "example": "A team's code lives in company/reports/pdf/render.py. A new script that writes import company.reports.pdf.render must call company.reports.pdf.render.build(); switching to from company.reports.pdf import render lets it call render.build() instead.",
  "tip": "With plain import a.b.c you must use the full a.b.c prefix, and the last component must be a module, not a function or class. Questions often offer import a.b.func as a tempting wrong answer.",
  "check": [
   [
    "After import extra.good.best.sigma, which name is added to your namespace?",
    "Only extra; you reach the function through the full path extra.good.best.sigma.funS()."
   ],
   [
    "What must be true about sys.path for import extra.good.best.sigma to work?",
    "The directory that contains the top-level extra folder must be on sys.path; the inner folders do not need to be listed."
   ]
  ]
 },
 {
  "t": "dir() to list the names a module defines",
  "body": [
   "The built-in function `dir()` lets you look inside a module, object or class and see which names it holds. It returns a sorted list of strings. It is a discovery tool: when you import a module you have never used, `dir()` shows you what it offers without opening documentation, and in the exam it is how questions check whether you understand which names an import created.",
   "Called with a module object, `dir(math)` returns every attribute name defined in that module, including dunder (double-underscore) names such as `__name__`, `__doc__` and `__file__` alongside functions such as `ceil` and `sqrt`. The module must be imported under a name you can pass in: after `import math` you call `dir(math)`; after `import math as m` you call `dir(m)`. After `from math import sqrt`, you cannot call `dir(math)` because the name `math` does not exist in your namespace.",
   "```python\nimport math\nfor name in dir(math):\n    if not name.startswith('_'):\n        print(name, end=' ')\n# acos acosh asin ... ceil ... sqrt tan tanh tau trunc ulp\n```",
   "Called with no argument, `dir()` lists the names in the current local scope. At the top level of a script that means your module's global names, so it is an easy way to confirm what an import added. Run `dir()`, then `import math as m`, then `dir()` again, and you will see `m` appear but not `math`. After `from math import *`, the list grows by dozens of names at once, which makes the namespace-pollution argument against star imports concrete.",
   "The list is sorted alphabetically, and because uppercase letters come before lowercase in character order, names beginning with capitals appear before lowercase ones, and dunder names beginning with an underscore appear after uppercase names but before lowercase ones. You do not need to memorize this, but it explains why the output looks the way it does.",
   "`dir()` works on any object, not only modules. `dir('abc')` lists string methods, `dir([])` lists list methods, and `dir(SomeClass)` lists the class's attributes including inherited ones. This makes it a companion to `help()`, which prints documentation, and to `hasattr()`, which tests for a single name. Remember that `dir()` returns names as strings; to get the actual object behind a name you would use `getattr(module, name)`."
  ],
  "terms": [
   [
    "dir()",
    "Built-in that returns a sorted list of attribute names for an object, or of the current scope when called without arguments."
   ],
   [
    "Dunder name",
    "A name with double underscores on both sides, such as __name__, used for special attributes."
   ],
   [
    "Local scope",
    "The set of names defined in the currently executing block; dir() with no argument lists it."
   ]
  ],
  "example": "While exploring the platform module in IDLE, you run import platform and then print(dir(platform)). Scanning the list, you spot python_implementation and system, and try each one to see what it returns on your machine.",
  "tip": "dir(x) needs a name that actually exists. After from math import sqrt, dir(math) raises NameError; after import math as m, you must call dir(m).",
  "check": [
   [
    "What type does dir(math) return?",
    "A list of strings, sorted alphabetically, naming the module's attributes."
   ],
   [
    "How can you use dir() to see the effect of import os as o?",
    "Call dir() with no argument before and after; the name o appears and os does not."
   ]
  ]
 },
 {
  "t": "sys.path: where Python searches for modules and how to extend it at runtime",
  "body": [
   "When you write `import something`, Python has to find a file or directory called `something`. After checking modules it has already loaded (kept in `sys.modules`) and its built-in modules, it searches a list of directories stored in `sys.path`. Understanding that list explains most ModuleNotFoundError messages and is a named PCAP objective.",
   "`sys.path` is an ordinary Python list of strings. Its first entry is normally the directory containing the script you ran (or an empty string meaning the current directory when you work interactively). After that come any directories named in the `PYTHONPATH` environment variable, then the standard library locations, and then the `site-packages` directory where installed third-party packages live. Python checks the entries in order and uses the first match it finds, so earlier entries win.",
   "```python\nimport sys\nfor entry in sys.path:\n    print(entry)\n\nsys.path.append('/home/me/mylibs')   # search this folder last\nimport helpers                         # now found if helpers.py is there\n```",
   "Because it is a list, you can change it while the program runs. `sys.path.append(folder)` adds a directory at the end, so it is searched last; `sys.path.insert(0, folder)` puts it first, so its modules take priority over everything else. The change must happen before the `import` statement that needs it, and it lasts only for the current process: it is not saved anywhere, and the next run starts with the default list again. On Windows paths, remember that backslashes in string literals start escape sequences, so write `'C:\\\\Users\\\\me\\\\libs'` or use forward slashes, which Python accepts on Windows too.",
   "The first-match rule has a practical side effect called shadowing. If you save your own script as `random.py` in your project folder, then `import random` elsewhere in that folder may load your file instead of the standard library module, because the script's directory is searched before the standard library. The symptom is an AttributeError such as `module 'random' has no attribute 'choice'`. The fix is to rename your file (and delete any stale `__pycache__` copy).",
   "Python can also import from ZIP archives placed on `sys.path`, which is how some tools bundle code; the exam occasionally mentions that a ZIP file entry is a valid search location. Modules that are already in `sys.modules` are never searched for again, so changing `sys.path` after a module is loaded does not reload it."
  ],
  "terms": [
   [
    "sys.path",
    "A list of directory strings that Python searches, in order, when importing a module."
   ],
   [
    "PYTHONPATH",
    "An environment variable whose directories are added to sys.path at startup."
   ],
   [
    "Shadowing",
    "When a module earlier on the search path hides a same-named module later on it."
   ],
   [
    "site-packages",
    "The directory where third-party packages installed with pip usually live."
   ]
  ],
  "example": "A student keeps shared helper modules in a folder outside every project. Instead of copying them, each script starts with import sys and sys.path.append to that folder, followed by import helpers, and the imports succeed only because the append comes first.",
  "tip": "append() searches the new folder last, insert(0, ...) searches it first, and neither change survives past the current run. The modification must come before the import that relies on it.",
  "check": [
   [
    "What is usually the first entry in sys.path when you run a script?",
    "The directory containing that script, so modules next to it are found before the standard library."
   ],
   [
    "Why might import random fail to find random.choice in your project?",
    "A file named random.py in your project folder shadows the standard library module because its folder is searched first."
   ]
  ]
 },
 {
  "t": "math module: ceil(), floor(), trunc(), factorial(), hypot(), sqrt()",
  "body": [
   "The `math` module provides mathematical functions for real numbers. PCAP picks out a handful and tests the details: what each returns, what type it returns, and how it behaves with negative numbers. Import it with `import math` and call functions as `math.name()`.",
   "Three functions turn a float into an integer, and they differ only in the direction they move. `math.floor(x)` returns the largest integer less than or equal to x, so it always moves down the number line: `floor(2.7)` is 2 and `floor(-2.7)` is -3. `math.ceil(x)` (ceiling) returns the smallest integer greater than or equal to x, always moving up: `ceil(2.1)` is 3 and `ceil(-2.7)` is -2. `math.trunc(x)` simply chops off the fractional part, moving toward zero: `trunc(2.7)` is 2 and `trunc(-2.7)` is -2. In Python 3 all three return an `int`, not a float. For positive numbers `floor` and `trunc` agree; for negative numbers `ceil` and `trunc` agree.",
   "```python\nimport math\nfor x in (2.5, -2.5):\n    print(math.floor(x), math.ceil(x), math.trunc(x), round(x))\n# 2 3 2 2\n# -3 -2 -2 -2\n```",
   "Notice `round()` in that example. It is a built-in, not part of `math`, and it rounds halves to the nearest even integer (banker's rounding), which is why `round(2.5)` is 2. Exam options sometimes mix `round` in to see whether you confuse it with the math functions.",
   "`math.factorial(n)` returns n! = 1 × 2 × ... × n as an integer, with `factorial(0)` equal to 1. It requires a non-negative integer; a negative argument raises ValueError. Factorials grow very quickly, but Python integers have no fixed size limit, so large results are exact.",
   "`math.sqrt(x)` returns the square root as a float, even for perfect squares: `sqrt(16)` is `4.0`. A negative argument raises ValueError (math domain error) because `math` works with real numbers only. `math.hypot(x, y)` returns the length of the hypotenuse of a right triangle with sides x and y, which is the Euclidean distance from the origin to the point (x, y): `hypot(3, 4)` is `5.0`. It is equivalent to `sqrt(x*x + y*y)` but written as a single call and computed carefully to avoid overflow. It also returns a float.",
   "Related names you will see in the same questions include the constants `math.pi` and `math.e` and the function `math.pow(x, y)`, which always returns a float, unlike the `**` operator which keeps integers as integers."
  ],
  "terms": [
   [
    "floor()",
    "Rounds down toward negative infinity and returns an int."
   ],
   [
    "ceil()",
    "Rounds up toward positive infinity and returns an int."
   ],
   [
    "trunc()",
    "Discards the fractional part, moving toward zero, and returns an int."
   ],
   [
    "hypot()",
    "Returns the Euclidean distance sqrt(x*x + y*y) as a float."
   ]
  ],
  "example": "A shipping script needs whole boxes for 23 items at 5 items per box. math.ceil(23 / 5) gives 5 boxes, while math.floor would give 4 and leave three items unpacked.",
  "tip": "Test negatives: floor(-2.5) is -3 but trunc(-2.5) and ceil(-2.5) are -2. Also remember sqrt and hypot always return floats, so sqrt(16) prints 4.0, not 4.",
  "check": [
   [
    "What does math.floor(-3.2) + math.ceil(-3.2) evaluate to?",
    "-7, because floor gives -4 and ceil gives -3."
   ],
   [
    "What does math.sqrt(-4) do?",
    "It raises ValueError, because math.sqrt works with real numbers only."
   ],
   [
    "What is printed by print(math.hypot(6, 8))?",
    "10.0, a float, because hypot returns the distance sqrt(36 + 64)."
   ]
  ]
 },
 {
  "t": "random module: random(), seed(), choice(), sample()",
  "body": [
   "The `random` module generates pseudo-random numbers. They are called pseudo-random because they come from a deterministic algorithm: given the same starting state, it produces the same sequence every time. That is perfect for games, simulations and tests, but it also means `random` must never be used for passwords, tokens or anything security-related; Python provides the `secrets` module for that purpose.",
   "`random.random()` takes no arguments and returns a float in the half-open range from 0.0 up to, but not including, 1.0. Many other functions build on it. To get a random integer you would normally use `random.randint(a, b)`, which includes both ends, or `random.randrange(start, stop)`, which excludes stop like `range()` does.",
   "`random.seed(value)` sets the starting state of the generator. After seeding with the same value, the same sequence of calls returns the same results, which makes a program reproducible. If you never call `seed()`, the generator is seeded automatically from a source such as the system time or the operating system's randomness, so each run differs. Calling `seed()` with no argument re-seeds it that same unpredictable way. The exam typically shows two blocks each starting with `random.seed(0)` and asks whether they print the same values; they do.",
   "```python\nimport random\nrandom.seed(42)\na = [random.random() for _ in range(3)]\nrandom.seed(42)\nb = [random.random() for _ in range(3)]\nprint(a == b)                       # True\n\nprint(random.choice(['red', 'green', 'blue']))\nprint(random.sample(range(1, 50), 6))  # six different numbers\n```",
   "`random.choice(seq)` returns one element picked from a non-empty sequence such as a list, tuple or string; `choice('abc')` returns a single character. An empty sequence raises IndexError. `random.sample(population, k)` returns a new list of k elements chosen without replacement, meaning no position is picked twice, so the elements are unique if the population has no duplicates. The original sequence is not changed. If k is larger than the population, sample raises ValueError, since you cannot draw more unique items than exist.",
   "The difference between repeated `choice()` calls and one `sample()` call matters: calling `choice()` six times can return the same element more than once, while `sample(..., 6)` never repeats a position. A lottery draw is a `sample`; rolling a die six times is repeated `choice` or `randint`. For shuffling in place there is also `random.shuffle(list)`, which modifies the list and returns None."
  ],
  "terms": [
   [
    "Pseudo-random",
    "Produced by a deterministic algorithm that only looks random; the same seed gives the same sequence."
   ],
   [
    "Seed",
    "The starting value for the generator; setting it makes results reproducible."
   ],
   [
    "Sampling without replacement",
    "Choosing items so that no position is picked twice, as random.sample() does."
   ]
  ],
  "example": "A teacher writes a quiz generator that picks 10 questions from a bank of 50 with random.sample(bank, 10). While debugging she calls random.seed(1) at the top so every run produces the same quiz and she can reproduce a bug.",
  "tip": "random() can return 0.0 but never 1.0, and sample() raises ValueError if k exceeds the population size. Same seed plus same calls equals same output.",
  "check": [
   [
    "What does random.sample([1, 2, 3], 4) do?",
    "It raises ValueError because you cannot choose 4 unique items from 3."
   ],
   [
    "Why should random not be used to generate a password reset token?",
    "Its output is pseudo-random and predictable from its state; the secrets module is designed for security-sensitive randomness."
   ]
  ]
 },
 {
  "t": "platform module: platform(), machine(), processor(), system(), version(), python_implementation(), python_version_tuple()",
  "body": [
   "The `platform` module lets a program find out about the computer and the Python interpreter it is running on. That is useful for bug reports, for choosing file paths or commands that differ between operating systems, and for checking that the interpreter is new enough. Every function listed in the objective returns a string, except `python_version_tuple()`, which returns a tuple of strings. The exact values depend entirely on the machine, so exam questions ask about what kind of information each function gives rather than a specific output.",
   "`platform.platform()` returns a single human-readable string describing the underlying platform, combining the operating system name, release and other details, for example something like `Linux-6.5.0-x86_64-with-glibc2.35` or `Windows-10-10.0.19045-SP0`. It accepts optional arguments such as `aliased` and `terse`; `terse=True` asks for a shorter string.",
   "`platform.machine()` returns the machine or hardware type, such as `x86_64`, `AMD64` or `arm64`. `platform.processor()` returns the real processor name if it can be found; on some systems it returns an empty string because the information is not available. `platform.system()` returns the operating system name, such as `Linux`, `Windows` or `Darwin` (macOS). `platform.version()` returns the operating system's version string, which is often a long build description, not the Python version. That last point is a classic trap.",
   "```python\nimport platform\nprint(platform.system())                 # e.g. Linux\nprint(platform.machine())                # e.g. x86_64\nprint(platform.python_implementation())  # e.g. CPython\nmajor, minor, patch = platform.python_version_tuple()\nprint(major, minor)                      # e.g. 3 12 (strings)\n```",
   "Two functions describe Python itself. `platform.python_implementation()` names the interpreter implementation: `CPython` for the standard one from python.org, or others such as `PyPy`, `Jython` or `IronPython`. `platform.python_version_tuple()` returns a tuple of three strings, major, minor and patch level, for example `('3', '12', '1')`. Because the parts are strings, comparing them as numbers requires converting with `int()` first; comparing `'10' > '9'` as strings gives False, which would be a subtle bug.",
   "Keep the two meanings of version apart. `platform.version()` is the operating system version. `platform.python_version()` (a string such as `'3.12.1'`) and `platform.python_version_tuple()` describe Python. If a question asks how to learn which interpreter version is running, the tuple or `python_version()` is the answer, not `version()`."
  ],
  "terms": [
   [
    "system()",
    "Returns the OS name such as Linux, Windows or Darwin."
   ],
   [
    "machine()",
    "Returns the hardware architecture name such as x86_64 or arm64."
   ],
   [
    "python_implementation()",
    "Returns the interpreter implementation name, for example CPython or PyPy."
   ],
   [
    "python_version_tuple()",
    "Returns (major, minor, patch) as a tuple of strings."
   ]
  ],
  "example": "A support script prints platform.platform(), platform.python_implementation() and platform.python_version_tuple() at startup, so every bug report a user pastes already says which OS and interpreter they were using.",
  "tip": "platform.version() is the operating system's version, not Python's. python_version_tuple() returns strings, not integers, and processor() may legitimately return an empty string.",
  "check": [
   [
    "What type are the items returned by platform.python_version_tuple()?",
    "Strings, for example ('3', '11', '4'); convert with int() before numeric comparison."
   ],
   [
    "Which function tells you whether you are running CPython or PyPy?",
    "platform.python_implementation()."
   ]
  ]
 },
 {
  "t": "__name__ and the if __name__ == \"__main__\" idiom",
  "body": [
   "Every module has a built-in variable called `__name__`, a string that Python sets before running the module's code. Its value depends on how the file is being used. When you import a module, `__name__` is the module's name, such as `'tools'` for `tools.py`, or the dotted name such as `'pkg.tools'` inside a package. When you run a file directly as the main program, for example with `python tools.py` or Run in IDLE, Python sets its `__name__` to the special string `'__main__'` instead.",
   "That difference lets a file tell whether it is being run or imported, which is the basis of a very common idiom. Code placed under `if __name__ == '__main__':` runs only when the file is the main program and is skipped when another module imports it. You use it for demonstration code, quick tests, or a command-line entry point, so the module can double as a reusable library and a runnable script.",
   "```python\n# tools.py\ndef double(x):\n    return x * 2\n\nprint('tools loaded, __name__ is', __name__)\n\nif __name__ == '__main__':\n    print('self-test:', double(21))\n```",
   "Running `python tools.py` prints `tools loaded, __name__ is __main__` followed by `self-test: 42`. In another file, `import tools` prints only `tools loaded, __name__ is tools`: the unconditional `print` still runs, because importing executes all of the module's top-level code, but the guarded block is skipped. This is exactly the kind of output an exam question asks you to predict, so trace carefully which lines are inside the `if` and which are not.",
   "Without the guard, any test code at the top level would run every time someone imported the module, printing output or doing work the importer never asked for. That is why well-behaved modules keep their top level to definitions (functions, classes, constants) and put anything that acts under the guard. Note that only one module in a running program has `__name__` equal to `'__main__'`: the one Python was started with.",
   "Remember the spelling details. Both sides use two underscores, the comparison uses `==`, and the value is a string, so it must be quoted. The objective shows the idiom with double quotes; single quotes are exactly equivalent in Python. Modules also have other dunder attributes like `__file__` (the path they were loaded from) and `__doc__` (the docstring), but `__name__` is the one this idiom depends on."
  ],
  "terms": [
   [
    "__name__",
    "A module variable holding the module's name, or '__main__' when the file is run directly."
   ],
   [
    "'__main__'",
    "The value of __name__ in the module that started the program."
   ],
   [
    "Top-level code",
    "Statements at module level, outside functions and classes, which run whenever the module is loaded."
   ]
  ],
  "example": "A student writes grades.py with a function average() and some sample calls to check it. Wrapping the sample calls in if __name__ == '__main__': means a classmate can import average without seeing the test output every time.",
  "tip": "Imports still run all unguarded top-level code. Only statements inside the if __name__ == '__main__': block are skipped when the file is imported.",
  "check": [
   [
    "What is the value of __name__ inside mod.py when another file does import mod?",
    "The string 'mod'."
   ],
   [
    "A module prints 'A' at top level and 'B' inside the main guard. What does importing it print?",
    "Only A, because the guarded block is skipped on import."
   ]
  ]
 },
 {
  "t": "__pycache__ and compiled .pyc files",
  "body": [
   "Python source code is not executed directly as text. The interpreter first compiles it into bytecode, a compact, lower-level set of instructions for the Python virtual machine, and then executes that bytecode. Compiling takes time, so when a module is imported, CPython saves the bytecode to disk so the next import can skip that step. Those saved files are `.pyc` files, and they live in a folder called `__pycache__` next to the source files.",
   "The file names include the interpreter and version, for example `__pycache__/tools.cpython-312.pyc` for `tools.py` compiled by CPython 3.12. Including this tag means different Python versions can keep their own compiled copies side by side without overwriting each other, because bytecode is not guaranteed to be compatible between versions.",
   "Before reusing a `.pyc` file, Python checks whether it is still valid. By default it records information about the source file, such as its modification time and size, inside the `.pyc`. If the source has changed since, Python recompiles and rewrites the cached file. So you never need to delete `__pycache__` for your edits to take effect in normal use; it is safe to delete, though, since Python simply recreates it.",
   "Importantly, the script you run directly is not cached. If you run `python main.py`, Python compiles `main.py` in memory every time and does not write `main.cpython-312.pyc`; only the modules that `main.py` imports get `.pyc` files. This explains an exam favorite: after running a program for the first time, a `__pycache__` folder appears containing files for the imported modules but not for the main script. If Python cannot write the folder, for instance because the directory is read-only, the program still runs; it just compiles each time.",
   "```text\nproject/\n    main.py            # run directly: not cached\n    tools.py           # imported by main.py\n    __pycache__/\n        tools.cpython-312.pyc\n```",
   "Two misconceptions are worth clearing up. First, `.pyc` files do not make your program run faster once it is running; they only make it start faster by skipping compilation. Second, they are not a meaningful way to hide source code, because bytecode can be inspected and decompiled. The folder name has double underscores on both sides, like other special Python names, and most projects add `__pycache__/` to their version-control ignore list since the files are regenerated automatically."
  ],
  "terms": [
   [
    "Bytecode",
    "The compiled, platform-independent instructions the Python virtual machine executes."
   ],
   [
    ".pyc file",
    "A file containing cached bytecode for an imported module."
   ],
   [
    "__pycache__",
    "The directory where CPython stores .pyc files, beside the source modules."
   ]
  ],
  "example": "After running app.py, which imports config.py and utils.py, a developer sees __pycache__ containing config and utils .pyc files but nothing for app.py, because only imported modules are cached.",
  "tip": "The main script is compiled but not cached; only imported modules get .pyc files. Caching speeds up loading, not execution.",
  "check": [
   [
    "Why does the .pyc file name include something like cpython-312?",
    "It records the implementation and version, so different interpreters can keep separate, compatible caches."
   ],
   [
    "If you edit tools.py after its .pyc was created, what happens on the next import?",
    "Python notices the source changed, recompiles it and updates the cached .pyc."
   ]
  ]
 },
 {
  "t": "Package layout: directories, __init__.py, nested packages and private (_name) module variables",
  "body": [
   "A package is how Python groups related modules into a folder hierarchy. The directory name becomes the package name, each `.py` file inside is a module, and each subdirectory can be a subpackage. Traditionally, and in everything the PCAP course teaches, each package directory contains a file called `__init__.py`, which marks the directory as a regular package. Python 3 can also import directories without it (namespace packages), but for the exam treat `__init__.py` as the package marker.",
   "`__init__.py` is ordinary Python code. It may be empty, and it often is. When a package is imported for the first time, its `__init__.py` runs once, so it is the place for package-level setup: defining constants, importing selected names so users can write shorter imports, or setting `__all__`. When you import a nested module such as `import shop.cart.items`, the `__init__.py` files of `shop` and then `shop.cart` run in order before `items.py`.",
   "```text\nshop/\n    __init__.py\n    prices.py\n    cart/\n        __init__.py\n        items.py\n```",
   "For `import shop` to work, the directory that contains `shop` must be on `sys.path`. Packages can also be distributed as ZIP files, which Python can import from when the ZIP file's path is on `sys.path`.",
   "Python has no true private variables at module level, but it has a naming convention with teeth. A name that starts with a single underscore, such as `_counter` or `_helper()`, signals that it is internal to the module. The concrete effect is that `from module import *` does not import it, unless the module lists it in `__all__`. The name is still fully reachable by explicit access: `import module` followed by `module._counter` works, and so does `from module import _counter`. The underscore is a request, not a lock.",
   "```python\n# counter.py\n_count = 0\ndef bump():\n    global _count\n    _count += 1\n    return _count\n\n# main.py\nfrom counter import *\nprint(bump())        # 1\n# print(_count)      # NameError: not imported by *\nimport counter\nprint(counter._count)  # 1, explicit access still works\n```",
   "Notice in that example that `_count` lives in the `counter` module's namespace. The function `bump()` changes it there, which is why `counter._count` shows the updated value. Hiding module state behind an underscore and giving users functions to change it is a simple form of encapsulation, and it is the module-level cousin of the private attributes you will meet in classes later."
  ],
  "terms": [
   [
    "__init__.py",
    "A file that marks a directory as a regular package and runs when the package is first imported."
   ],
   [
    "Nested package",
    "A package directory placed inside another package directory."
   ],
   [
    "_name convention",
    "A leading underscore marks a module name as internal; from module import * skips it."
   ]
  ],
  "example": "A game project has a package engine with subpackages engine.audio and engine.graphics, each with its own __init__.py. The graphics module keeps a _cache dictionary; users call engine.graphics.load() and never touch the cache directly.",
  "tip": "A leading underscore only affects from module import *. Explicit imports and qualified access such as module._name still work, so it is a convention rather than real privacy.",
  "check": [
   [
    "When does code in a package's __init__.py run?",
    "Once, the first time the package (or anything inside it) is imported in a process."
   ],
   [
    "After from mod import *, is mod._secret available?",
    "No name _secret is imported (and mod itself is not bound), unless _secret is listed in __all__; import mod then mod._secret would work."
   ]
  ]
 },
 {
  "t": "try/except, multiple except branches and the order they are checked",
  "body": [
   "An exception is Python's way of signalling that something went wrong while a program was running: dividing by zero, converting 'abc' to an int, reading a missing dictionary key. If nothing handles the exception, the program stops and prints a traceback. The `try` statement lets you handle it instead, so the program can recover, report a friendly message or try something else.",
   "You put the risky code in a `try` block and one or more `except` branches after it. Python runs the `try` block. If no exception occurs, all `except` branches are skipped. If an exception occurs, Python abandons the rest of the `try` block immediately (the remaining lines never run) and looks through the `except` branches from top to bottom. The first branch whose exception class matches, either the same class or a superclass of the raised exception, is executed, and all later branches are ignored. At most one `except` branch runs for a given exception.",
   "```python\ntry:\n    x = int(input('Number: '))\n    print(10 / x)\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nexcept ValueError:\n    print('That was not a number')\nexcept:\n    print('Something else went wrong')\nprint('done')\n```",
   "Entering 0 prints the first message, entering `abc` prints the second, and either way `done` follows, because a handled exception lets execution continue after the whole `try` statement. The final bare `except:` with no class catches anything not caught above. Python requires a bare `except` to be the last branch; putting it earlier is a syntax error. Use it sparingly, because it also hides mistakes you did not anticipate.",
   "Order matters because matching includes superclasses. `ZeroDivisionError` is a subclass of `ArithmeticError`, so if you write `except ArithmeticError:` before `except ZeroDivisionError:`, the more general branch catches the division error first and the specific branch can never run. Python does not warn you about such unreachable branches. The rule of thumb is to list exceptions from most specific to most general.",
   "If no branch matches, the exception is not handled here. It propagates outward: to an enclosing `try`, or up to the function's caller, and so on. If it reaches the top level unhandled, the program terminates with a traceback. This propagation is useful: a function can let an exception escape and leave the decision to its caller, which often knows better how to respond. Exceptions raised inside an `except` branch itself are not caught by sibling branches of the same `try`; they propagate outward too."
  ],
  "terms": [
   [
    "Exception",
    "An object representing an error or unusual event that interrupts normal flow."
   ],
   [
    "except branch",
    "A handler that runs when the raised exception matches its class or a subclass of it."
   ],
   [
    "Propagation",
    "An unhandled exception moving outward to enclosing try statements and calling functions."
   ],
   [
    "Bare except",
    "An except with no class, catching everything; it must be the last branch."
   ]
  ],
  "example": "A menu program wraps each user command in try with except ValueError for bad numbers and except KeyError for unknown menu options. A typo no longer crashes the program; it prints a hint and shows the menu again.",
  "tip": "Only the first matching branch runs, and a superclass listed first swallows its subclasses. When two branches could match, the one higher up wins.",
  "check": [
   [
    "With except ArithmeticError followed by except ZeroDivisionError, which runs for 1/0?",
    "The ArithmeticError branch, because it is checked first and ZeroDivisionError is its subclass; the second branch is unreachable."
   ],
   [
    "What happens to the lines in a try block after the one that raises?",
    "They are skipped; control jumps straight to the matching except branch."
   ]
  ]
 },
 {
  "t": "Catching several exceptions in one branch: except (E1, E2)",
  "body": [
   "Sometimes different exceptions deserve the same response. A function that parses user input might fail with ValueError (not a number) or ZeroDivisionError (a zero where a divisor was needed), and in both cases you just want to print an error and ask again. Instead of writing two identical branches, you can list several exception classes in a single `except` using a tuple.",
   "```python\ndef ratio(a, b):\n    try:\n        return int(a) / int(b)\n    except (ValueError, ZeroDivisionError):\n        print('Bad input, please try again')\n        return None\n\nprint(ratio('6', '3'))    # 2.0\nprint(ratio('6', '0'))    # message, then None\nprint(ratio('six', '3'))  # message, then None\n```",
   "The branch matches if the raised exception is an instance of any class in the tuple, including subclasses of any of them. The parentheses are required. Writing `except ValueError, ZeroDivisionError:` is a syntax error in Python 3; it was a different, now-removed feature in Python 2 and appears in exam questions as a distractor.",
   "You can combine a tuple branch with ordinary branches. The top-to-bottom rule still applies: Python checks each branch in turn, and the first branch whose class or tuple matches wins. So a specific single-class branch placed before a tuple branch will handle its exception, and the tuple handles the rest.",
   "When you need to know which of the listed exceptions actually occurred, add `as` to bind the exception object: `except (ValueError, ZeroDivisionError) as e:`. Inside the branch, `type(e).__name__` gives the class name and `e.args` holds the arguments it was created with. This lets you share most of the handling while still logging precise details.",
   "Grouping is a design choice. Group exceptions when your reaction is truly the same. If you catch a broad superclass instead, such as `except ArithmeticError`, you catch all its subclasses at once, which can be simpler but also catches cases you did not intend. Listing the exact classes in a tuple states precisely what you expect and lets anything unexpected propagate, which usually makes bugs easier to find. Avoid adding `Exception` to the tuple just to be safe; it defeats the purpose."
  ],
  "terms": [
   [
    "Exception tuple",
    "A parenthesized list of classes in one except clause; the branch matches any of them."
   ],
   [
    "as binding",
    "The except ... as name form that gives the handler access to the exception object."
   ],
   [
    "Subclass matching",
    "An except branch also catches instances of subclasses of the listed classes."
   ]
  ],
  "example": "A configuration loader catches (KeyError, IndexError) in one branch because a missing setting might come from a dictionary lookup or from a list that is too short, and in both cases it falls back to a default value.",
  "tip": "The tuple needs parentheses: except (A, B): is correct, except A, B: is a SyntaxError in Python 3.",
  "check": [
   [
    "Does except (LookupError, ValueError) catch a KeyError?",
    "Yes, because KeyError is a subclass of LookupError, which is in the tuple."
   ],
   [
    "How can one branch that catches (TypeError, ValueError) report which one happened?",
    "Use except (TypeError, ValueError) as e and inspect type(e).__name__ or e.args."
   ]
  ]
 },
 {
  "t": "except … as e and the args attribute",
  "body": [
   "An exception is not just a signal; it is an object, an instance of an exception class. When you catch it, you can give that object a name with `as` and then inspect it. The syntax is `except ValueError as e:`, and inside the branch the variable `e` refers to the exception instance that was raised.",
   "Every exception object has an attribute called `args`, a tuple of the arguments passed to the exception's constructor. When Python itself raises an exception, `args` usually contains a single message string. When you raise one yourself, `args` contains whatever you passed. `raise ValueError('bad value', 42)` produces an exception whose `args` is `('bad value', 42)`, and `raise ValueError()` produces empty `args`, `()`.",
   "```python\ntry:\n    int('abc')\nexcept ValueError as e:\n    print(e.args)              # (\"invalid literal for int() with base 10: 'abc'\",)\n    print(e)                   # invalid literal for int() with base 10: 'abc'\n    print(type(e).__name__)    # ValueError\n```",
   "Printing the exception object calls its `__str__()` method, which is based on `args`. With one argument, `str(e)` is that argument as text. With no arguments it is an empty string. With several arguments, it is the string form of the whole tuple, parentheses and all. Exam questions like to ask the difference between `print(e)` and `print(e.args)`: the first shows the message, the second shows a tuple, which with one element includes a trailing comma.",
   "```python\ntry:\n    raise Exception('first', 'second')\nexcept Exception as e:\n    print(e)        # ('first', 'second')\n    print(e.args[1])  # second\n```",
   "The name bound by `as` only exists while the `except` branch runs. When the branch finishes, Python deletes the variable to avoid keeping large tracebacks alive. So if you write `print(e)` after the `try` statement, you get a NameError. If you need the exception later, assign it to another variable inside the branch, for example `saved = e`.",
   "You can use `as` with a tuple of classes, `except (KeyError, IndexError) as err:`, and with a bare class like `except Exception as err:`. Combined with `type(err).__name__`, this is the standard way to log what went wrong without stopping the program."
  ],
  "terms": [
   [
    "Exception instance",
    "The object created when an exception is raised; except ... as name binds it."
   ],
   [
    "args",
    "A tuple holding the arguments passed to the exception's constructor."
   ],
   [
    "str(e)",
    "The printable message of an exception, derived from args."
   ]
  ],
  "example": "A logging helper catches Exception as err and writes type(err).__name__ and err.args to a file, so when a nightly job fails the operator sees KeyError ('customer_id',) and knows immediately which field was missing.",
  "tip": "print(e) shows the message; print(e.args) shows a tuple, which for one argument looks like ('message',). The as variable disappears after the except block.",
  "check": [
   [
    "What is printed by: try: raise KeyError('x', 1) / except KeyError as e: print(e.args)?",
    "('x', 1), the tuple of arguments given to the constructor."
   ],
   [
    "What happens if you use e after the try statement ends?",
    "NameError, because the name bound by as is deleted when the except branch finishes."
   ]
  ]
 },
 {
  "t": "else and finally branches and when each runs",
  "body": [
   "A `try` statement can have two more optional branches beyond `except`. Knowing exactly when each runs is a reliable source of exam questions, usually in the form of code that prints letters from different branches and asks what the output is.",
   "The `else` branch comes after all `except` branches and runs only if the `try` block finished without raising any exception. It is where you put code that should happen only on success but that you do not want protected by the handlers. Keeping the `try` block small and moving follow-up work into `else` means an unexpected error in that follow-up code is not accidentally caught by a handler meant for something else. A `try` with `else` must have at least one `except` branch.",
   "The `finally` branch comes last and runs no matter what: after a successful `try` (and its `else`), after an exception that was handled, and even when an exception was not handled and is on its way out of the function. It also runs when the `try` or `except` block exits through `return`, `break` or `continue`. That makes it the place for clean-up that must always happen, such as closing a file or releasing a lock. `try` with only `finally` and no `except` is allowed.",
   "```python\ndef test(x):\n    try:\n        print('A', end=' ')\n        r = 10 / x\n    except ZeroDivisionError:\n        print('B', end=' ')\n    else:\n        print('C', end=' ')\n    finally:\n        print('D')\n\ntest(2)   # A C D\ntest(0)   # A B D\n```",
   "Trace the two calls. With 2 there is no error, so `except` is skipped, `else` runs, then `finally`: A C D. With 0 the division raises, `except` handles it, `else` is skipped because an exception occurred, and `finally` still runs: A B D. If the error were one no branch catches, say `test('two')` raising TypeError, the output would be A then D, followed by the traceback, because `finally` runs before the exception continues outward.",
   "The full order is fixed: `try`, then `except` branches, then `else`, then `finally`. Writing them in another order is a syntax error. One more subtle case: if a `finally` block itself executes a `return`, that return replaces whatever the `try` block was returning and even discards an exception that was propagating. That is legal but confusing, so avoid returning from `finally` in real code; just recognize it if an exam shows it."
  ],
  "terms": [
   [
    "else branch",
    "Runs only when the try block completes without raising an exception."
   ],
   [
    "finally branch",
    "Runs every time the try statement is left, whether normally, by exception or by return."
   ],
   [
    "Clean-up code",
    "Statements that release resources and therefore belong in finally or a with statement."
   ]
  ],
  "example": "A script opens a database connection in try, handles ConnectionError in except, commits the transaction in else so only successful work is saved, and closes the connection in finally so it is never left open.",
  "tip": "else means no exception happened; finally means always. If an exception occurs, else is skipped even when the exception was handled.",
  "check": [
   [
    "An unhandled TypeError is raised in try. Which of except (for ValueError), else and finally run?",
    "Only finally; then the TypeError continues to propagate."
   ],
   [
    "Is try: ... else: ... without any except valid?",
    "No. An else branch requires at least one except branch; try with only finally is allowed."
   ]
  ]
 },
 {
  "t": "The built-in exception hierarchy: BaseException, Exception, ArithmeticError, LookupError, and their subclasses",
  "body": [
   "Python's built-in exceptions are classes arranged in an inheritance tree. That structure is what makes `except` matching work: a branch catches its own class and every class below it. Knowing the main branches of the tree lets you predict which handler catches what and choose handlers at the right level of generality.",
   "At the root is `BaseException`. Directly under it are a few special classes that are not errors in the usual sense: `SystemExit` (raised by `sys.exit()`), `KeyboardInterrupt` (raised when the user presses Ctrl+C), and `GeneratorExit` (used when a generator is closed). Also directly under `BaseException` is `Exception`, the parent of nearly every ordinary error. Your own exception classes should inherit from `Exception` or one of its subclasses.",
   "```text\nBaseException\n +-- SystemExit\n +-- KeyboardInterrupt\n +-- GeneratorExit\n +-- Exception\n      +-- ArithmeticError\n      |    +-- ZeroDivisionError\n      |    +-- OverflowError\n      |    +-- FloatingPointError\n      +-- LookupError\n      |    +-- IndexError\n      |    +-- KeyError\n      +-- AssertionError\n      +-- AttributeError\n      +-- ImportError\n      |    +-- ModuleNotFoundError\n      +-- NameError\n      +-- OSError\n      +-- StopIteration\n      +-- TypeError\n      +-- ValueError\n           +-- UnicodeError\n```",
   "Two intermediate classes deserve attention because the exam names them. `ArithmeticError` groups errors from numeric operations: `ZeroDivisionError` for division or modulo by zero, `OverflowError` for results too large to represent (for example some float operations), and `FloatingPointError`. `LookupError` groups errors from failed lookups in containers: `IndexError` when a sequence index is out of range, and `KeyError` when a dictionary key is missing. Catching `LookupError` therefore handles both a bad list index and a missing dict key.",
   "The other common leaves are worth recognizing by cause. `TypeError`: an operation applied to the wrong type, like `'a' + 1`. `ValueError`: the right type but an unacceptable value, like `int('abc')`. `NameError`: an undefined variable. `AttributeError`: an object has no such attribute. `ImportError` and its subclass `ModuleNotFoundError`: an import fails. `OSError`: an operating system or I/O problem, covered again in the file I/O lessons. `AssertionError`: a failed `assert`.",
   "You can explore the tree yourself. `ZeroDivisionError.__mro__` or `ZeroDivisionError.__bases__` shows its ancestors, and `issubclass(KeyError, LookupError)` returns True. Doing this for a handful of classes is one of the labs for this domain and is the fastest way to make the tree stick."
  ],
  "terms": [
   [
    "BaseException",
    "The root of all built-in exceptions, including non-error signals like KeyboardInterrupt."
   ],
   [
    "Exception",
    "The base class for ordinary errors and for user-defined exceptions."
   ],
   [
    "ArithmeticError",
    "Parent of ZeroDivisionError, OverflowError and FloatingPointError."
   ],
   [
    "LookupError",
    "Parent of IndexError and KeyError, raised when a key or index is invalid."
   ]
  ],
  "example": "A function reads settings from both a list and a dictionary. A single except LookupError branch returns a default value whether the failure was an IndexError from the list or a KeyError from the dictionary.",
  "tip": "Know the parents: ZeroDivisionError under ArithmeticError, IndexError and KeyError under LookupError, ModuleNotFoundError under ImportError, and KeyboardInterrupt directly under BaseException, not Exception.",
  "check": [
   [
    "Which branch catches d['missing'] where d is a dict: except IndexError or except LookupError?",
    "except LookupError, because KeyError is its subclass; IndexError is a sibling and does not match."
   ],
   [
    "Is ZeroDivisionError a subclass of Exception?",
    "Yes, through ArithmeticError, which inherits from Exception."
   ]
  ]
 },
 {
  "t": "raise, raise with an instance, and a bare raise to re-raise",
  "body": [
   "Exceptions are not only raised by Python; your own code can raise them with the `raise` statement. You do this when a function detects a situation it cannot sensibly handle, such as a negative age or an empty list where data is required. Raising an exception hands the problem to the caller in a way that cannot be silently ignored.",
   "The statement takes an exception class or an exception instance. `raise ValueError` names a class; Python creates an instance for you with no arguments, so its `args` is empty. `raise ValueError('age must be positive')` creates an instance yourself, passing a message that ends up in `args` and in the printed traceback. Passing a message is almost always better, because it tells whoever reads the error what went wrong. Whatever you raise must be a class or instance derived from `BaseException`; raising anything else, like a string, is a TypeError.",
   "```python\ndef set_age(age):\n    if age < 0:\n        raise ValueError('age must be non-negative', age)\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(e.args)    # ('age must be non-negative', -5)\n```",
   "Inside an `except` branch you can write `raise` on its own, with no argument. This bare `raise` re-raises the exception currently being handled, unchanged, with its original traceback. It is useful when a handler wants to do something, such as log the error or undo partial work, but still let the exception continue to the caller. Outside any exception handler there is nothing to re-raise, so a bare `raise` there fails with a RuntimeError.",
   "```python\ndef load(path):\n    try:\n        return open(path).read()\n    except OSError:\n        print('load failed for', path)\n        raise          # same exception continues outward\n```",
   "A handler can also raise a different exception, translating a low-level error into a higher-level one. Python records the original automatically as the context, and the traceback shows both. The optional form `raise NewError('msg') from original` marks the original as the explicit cause. PCAP focuses on the three basic forms, but recognizing `from` helps when you read tracebacks.",
   "`raise` is also handy for testing handlers: you can raise a specific exception deliberately to check that the right branch catches it. Remember that execution stops at the `raise`; nothing after it in the same block runs, which is exactly like an error raised by Python itself."
  ],
  "terms": [
   [
    "raise",
    "Statement that signals an exception, given a class or an instance."
   ],
   [
    "Bare raise",
    "raise with no operand inside an except branch; re-raises the current exception unchanged."
   ],
   [
    "Exception chaining",
    "Linking a new exception to the one that caused it, automatically or with raise ... from."
   ]
  ],
  "example": "A payment function catches a ConnectionError, writes a note to its log, and then uses a bare raise so the web handler above it still sees the original error and can show the user a retry message.",
  "tip": "raise ValueError and raise ValueError() both work; the class form creates an instance with empty args. A bare raise is valid only while an exception is being handled.",
  "check": [
   [
    "What are the args of the exception produced by raise IndexError?",
    "An empty tuple, (), because Python instantiates the class with no arguments."
   ],
   [
    "What does a bare raise do inside an except branch?",
    "It re-raises the exception currently being handled, so it propagates to the next enclosing handler or caller."
   ]
  ]
 },
 {
  "t": "assert and AssertionError",
  "body": [
   "The `assert` statement checks a condition that you, the programmer, believe must be true at a certain point. If the condition is true, nothing happens and execution continues. If it is false, Python raises `AssertionError`. Assertions are a debugging aid: they catch impossible states early, close to their cause, instead of letting bad data travel further and fail somewhere confusing.",
   "The syntax has an optional message: `assert condition` or `assert condition, message`. The message becomes the exception's argument, so it appears in the traceback and in `e.args`. The condition is any expression; Python evaluates its truth value, so zero, empty strings and empty containers count as false, just as in an `if`.",
   "```python\nimport math\n\ndef safe_sqrt(x):\n    assert x >= 0, 'x must be non-negative'\n    return math.sqrt(x)\n\ntry:\n    safe_sqrt(-1)\nexcept AssertionError as e:\n    print('Assertion failed:', e)   # Assertion failed: x must be non-negative\n```",
   "Note that `assert` is a statement, not a function. Writing `assert(x > 0, 'message')` with parentheses around both parts creates a two-element tuple, and a non-empty tuple is always true, so the assertion can never fail. Recent Python versions warn about this, and it is a classic trick question.",
   "Assertions can be switched off. When Python runs with the `-O` (optimize) command-line option, all `assert` statements are removed and never evaluated. That is why assertions must not be used for things that have to happen in production, such as validating user input, checking permissions or performing actions with side effects. For those, use an `if` and raise a proper exception like ValueError. A good way to think of it: `assert` documents assumptions about your own code, while exceptions handle problems caused by the outside world.",
   "`AssertionError` sits directly under `Exception` in the hierarchy, so `except Exception` catches it. You can catch it explicitly, as the example does, but most of the time failed assertions are meant to stop the program so the bug gets fixed. Test frameworks such as `unittest` and `pytest` also rely on assertions to report failing checks."
  ],
  "terms": [
   [
    "assert",
    "Statement that raises AssertionError when its condition is false."
   ],
   [
    "AssertionError",
    "The exception raised by a failed assert; a subclass of Exception."
   ],
   [
    "-O option",
    "Interpreter flag that strips assert statements so they are never evaluated."
   ]
  ],
  "example": "In a function that splits a bill, a developer adds assert len(people) > 0, 'no diners' before dividing. During testing it catches a bug in the caller that passed an empty list, long before users see a ZeroDivisionError.",
  "tip": "assert (cond, 'msg') with parentheses is a non-empty tuple and always passes. Also, never rely on assert for input validation, because -O removes it.",
  "check": [
   [
    "What does assert 0, 'zero' do?",
    "Raises AssertionError with the message 'zero', because 0 is false."
   ],
   [
    "Why is assert unsuitable for checking a user's password length?",
    "Assertions can be disabled with -O, so the check might not run; use an if and raise an exception instead."
   ]
  ]
 },
 {
  "t": "Why except Exception does not catch KeyboardInterrupt or SystemExit",
  "body": [
   "It is tempting to wrap a whole program in `try` with `except Exception:` to stop it ever crashing. That works for ordinary errors, but two important events pass straight through such a handler, by design. Understanding why depends on the exception hierarchy covered earlier.",
   "`KeyboardInterrupt` is raised when the user presses Ctrl+C (or the equivalent interrupt key) in the terminal. `SystemExit` is raised by `sys.exit()` when a program asks to end, optionally with an exit status. Neither represents a bug. They are requests to stop, and Python's designers placed them directly under `BaseException`, beside `Exception` rather than beneath it. Because `except` matches only the named class and its subclasses, `except Exception` does not match them, so a program with a broad error handler can still be interrupted by the user and can still exit cleanly when told to. `GeneratorExit` sits in the same place for similar reasons.",
   "```python\nimport sys\ntry:\n    sys.exit(3)\nexcept Exception:\n    print('caught by Exception')   # not printed\nexcept SystemExit as e:\n    print('exit requested:', e.code)   # exit requested: 3\n```",
   "A bare `except:` or `except BaseException:` does catch these. That is exactly why a bare `except` is risky: a loop like `while True: try: ... except: pass` becomes impossible to stop with Ctrl+C, because each interrupt is swallowed and the loop simply continues. If you truly must catch everything, for example to log before exiting, re-raise afterwards with a bare `raise` so the interrupt or exit still happens.",
   "When you do want to respond to Ctrl+C, catch `KeyboardInterrupt` explicitly: print a short message, save work, and end. When code calls `sys.exit()`, the `SystemExit` exception unwinds the stack like any other exception, so `finally` blocks and `with` statements still run their clean-up on the way out. The exception's `code` attribute holds the value passed to `sys.exit()`.",
   "For the exam, the pattern to recognize is a question that raises one of these events inside a `try` that only has `except Exception` and asks what happens. The answer is that the handler does not run and the event propagates, ending the program (after any `finally`). The practical lesson is to catch the narrowest exceptions you can, use `Exception` as a last resort for errors, and leave `BaseException` alone unless you re-raise."
  ],
  "terms": [
   [
    "KeyboardInterrupt",
    "Raised when the user presses the interrupt key (Ctrl+C); inherits directly from BaseException."
   ],
   [
    "SystemExit",
    "Raised by sys.exit(); its code attribute holds the exit status."
   ],
   [
    "except Exception",
    "A broad handler for ordinary errors that deliberately excludes exit and interrupt signals."
   ]
  ],
  "example": "A long-running monitoring script catches Exception inside its loop so a single bad reading does not kill it. When the operator presses Ctrl+C, KeyboardInterrupt bypasses that handler and the script stops as expected.",
  "tip": "KeyboardInterrupt, SystemExit and GeneratorExit inherit from BaseException, not Exception. Only a bare except or except BaseException (or the specific class) catches them.",
  "check": [
   [
    "Will except Exception catch the exception raised by sys.exit()?",
    "No. sys.exit() raises SystemExit, which derives from BaseException, not Exception."
   ],
   [
    "Why is an infinite loop containing try/except: pass hard to stop?",
    "The bare except swallows KeyboardInterrupt, so Ctrl+C is caught and the loop continues."
   ]
  ]
 },
 {
  "t": "Defining your own exception classes and adding attributes to them",
  "body": [
   "Built-in exceptions describe general problems, but your programs have their own failure modes: an account with insufficient funds, an order for an item that is out of stock. Defining your own exception classes lets callers catch exactly those problems by name, and lets you attach the data needed to handle them.",
   "A custom exception is simply a class that inherits from `Exception` (or from a more specific built-in such as `ValueError` if that describes it well). The simplest version needs no body at all beyond `pass`. It already behaves like any exception: you can raise it, catch it, and pass it a message that ends up in `args`.",
   "```python\nclass BankError(Exception):\n    pass\n\nclass InsufficientFunds(BankError):\n    def __init__(self, balance, amount):\n        super().__init__(f'balance {balance} is less than {amount}')\n        self.balance = balance\n        self.amount = amount\n\ntry:\n    raise InsufficientFunds(50, 80)\nexcept BankError as e:\n    print(e)                       # balance 50 is less than 80\n    print(e.amount - e.balance)    # 30\n```",
   "Two design ideas appear there. First, a hierarchy: `InsufficientFunds` inherits from `BankError`, so a caller can catch every banking problem with `except BankError` or just this one with `except InsufficientFunds`. The same most-specific-first ordering rule applies as with built-in exceptions. Second, extra attributes: by defining `__init__`, you store useful data such as `balance` and `amount` on the exception object, and a handler can read them to decide what to do, rather than parsing a message string.",
   "When you override `__init__`, call `super().__init__(...)` with a message. That call sets `args`, which is what `print(e)` and tracebacks display. If you forget it, the exception still works, but `args` holds whatever arguments the constructor call received (Python fills it in automatically at creation), which may not be the message you want, and later code relying on `args` becomes confusing. You can also override `__str__()` to control the printed message directly.",
   "Inherit from `Exception`, not from `BaseException`, so your exceptions are caught by ordinary `except Exception` handlers and do not behave like exit or interrupt signals. By convention, class names end in Error, like the built-ins. Keep custom hierarchies shallow: one base class for your module or package and a few specific subclasses is usually enough."
  ],
  "terms": [
   [
    "Custom exception",
    "A user-defined class inheriting from Exception, raised and caught like built-ins."
   ],
   [
    "Exception hierarchy",
    "A set of related exception classes where a base class lets callers catch the whole group."
   ],
   [
    "super().__init__()",
    "Call to the parent constructor, which sets args and the printed message."
   ]
  ],
  "example": "An online shop defines OrderError with subclasses OutOfStock and PaymentDeclined. The checkout page catches OutOfStock to offer alternatives, reading its item attribute, and catches any other OrderError to show a generic message.",
  "tip": "Custom exceptions should derive from Exception. If you override __init__, pass a message to super().__init__() so args and str(e) stay meaningful.",
  "check": [
   [
    "If class AppError(Exception) and class DbError(AppError) exist, does except AppError catch DbError?",
    "Yes, because DbError is a subclass of AppError."
   ],
   [
    "Why store data as attributes on a custom exception instead of only in the message?",
    "Handlers can read the values directly, for example e.amount, instead of parsing text."
   ]
  ]
 },
 {
  "t": "Character encoding: ASCII, Unicode, code points, UTF-8",
  "body": [
   "Computers store only numbers, so every character of text has to be represented by a number. An agreement about which number stands for which character is a character set, and a rule about how those numbers are written as bytes is an encoding. PCAP expects you to know the vocabulary and the relationship between the main standards, because it underpins how Python strings work.",
   "ASCII (American Standard Code for Information Interchange) is the classic character set. It defines 128 characters, numbered 0 to 127: the English letters in upper and lower case, digits, punctuation, and control characters such as newline (10) and tab (9). Every ASCII code fits in 7 bits, so it fits comfortably in one byte. Some landmarks are worth remembering: space is 32, digit '0' is 48, 'A' is 65 and 'a' is 97. Upper and lower case letters are 32 apart.",
   "ASCII has no room for accented letters, Cyrillic, Chinese characters or emoji. Various 8-bit code pages tried to extend it, each for a different language, which caused endless confusion when text moved between systems. Unicode solved this by assigning a unique number, called a code point, to every character in every writing system, with plenty of space left for more. Code points are written like `U+0041` (hexadecimal) for 'A'. The first 128 Unicode code points are identical to ASCII, so ASCII is a subset of Unicode. Adapting software to many languages this way is called internationalization, often abbreviated I18N.",
   "A code point is just a number; it still needs an encoding to become bytes. UTF-8 is the most widely used Unicode encoding. It is variable-length: it uses one byte for code points in the ASCII range and two, three or four bytes for higher code points. Because one-byte UTF-8 is byte-for-byte the same as ASCII, plain English text is identical in both, which helped UTF-8 become the default on the web and in most modern systems. Other encodings such as UTF-16 and UTF-32 exist and use larger units; UTF-32 uses a fixed four bytes per code point.",
   "```python\ns = 'café'\nprint(len(s))                  # 4 characters\nprint(len(s.encode('utf-8')))  # 5 bytes: é needs two\nprint(ord('é'))                # 233, its code point\n```",
   "In Python 3, the `str` type holds Unicode text: a sequence of code points, independent of any encoding. Encoding happens at the edges, when you write text to a file or network (`str.encode()` turns it into `bytes`) and when you read it back (`bytes.decode()`). That is why `len()` of a string counts characters, not bytes, and why files opened in text mode take an `encoding` argument. A mismatch between the encoding used to write and to read is the usual cause of garbled characters."
  ],
  "terms": [
   [
    "ASCII",
    "A 7-bit character set of 128 characters numbered 0 to 127."
   ],
   [
    "Unicode",
    "A standard assigning a unique code point to every character in every writing system."
   ],
   [
    "Code point",
    "The number Unicode assigns to a character, written like U+0041."
   ],
   [
    "UTF-8",
    "A variable-length Unicode encoding using 1 to 4 bytes per code point, compatible with ASCII."
   ]
  ],
  "example": "A CSV of customer names written on one system as UTF-8 is opened elsewhere with a legacy code page, and José appears as garbled symbols. Re-reading the file with encoding='utf-8' fixes it, because the bytes were never wrong, only their interpretation.",
  "tip": "ASCII is a subset of Unicode; UTF-8 is an encoding of Unicode, not a separate character set. A Python str counts code points, so len('é') is 1 even though it takes 2 bytes in UTF-8.",
  "check": [
   [
    "How many characters does ASCII define?",
    "128, with codes 0 to 127."
   ],
   [
    "Why can UTF-8 files containing only English text be read as ASCII?",
    "UTF-8 encodes code points 0 to 127 as single bytes identical to ASCII."
   ]
  ]
 },
 {
  "t": "ord() and chr()",
  "body": [
   "Two built-in functions connect characters and their Unicode code points. `ord(ch)` takes a string of exactly one character and returns its code point as an integer. `chr(n)` does the reverse: it takes an integer code point and returns the one-character string for it. They are inverses of each other, so `chr(ord(c)) == c` for any single character c, and `ord(chr(n)) == n` for any valid code point n.",
   "```python\nprint(ord('A'), ord('a'), ord('0'), ord(' '))  # 65 97 48 32\nprint(chr(66), chr(122))                       # B z\nprint(ord('a') - ord('A'))                     # 32\nprint(chr(ord('c') + 1))                       # d\n```",
   "Because letters of the English alphabet have consecutive code points, you can do arithmetic on them. `ord(c) - ord('a')` gives a letter's position in the alphabet counting from 0, and adding an offset then calling `chr()` shifts it. Combined with the modulo operator this gives the classic Caesar cipher from this domain's lab. Similarly, `ord(d) - ord('0')` turns a digit character into its numeric value, which is how digit parsing works under the hood.",
   "```python\ndef shift(c, k):\n    if 'a' <= c <= 'z':\n        return chr((ord(c) - ord('a') + k) % 26 + ord('a'))\n    return c\n\nprint(''.join(shift(c, 3) for c in 'xyz abc'))  # abc def\n```",
   "Know the error cases. `ord()` requires a string of length exactly one: `ord('ab')` and `ord('')` both raise TypeError, and so does `ord(65)` since the argument is not a string. `chr()` requires an integer in the valid Unicode range, from 0 up to 0x10FFFF (1,114,111); a negative number or anything above that raises ValueError, and a float raises TypeError.",
   "These functions work for all of Unicode, not just ASCII: `ord('€')` returns 8364 and `chr(960)` returns 'π'. Code points are commonly shown in hexadecimal, so `hex(ord('€'))` gives '0x20ac', matching the U+20AC notation. Python string literals also accept escapes based on code points, such as `'\\u20ac'` for the euro sign, which is equivalent to `chr(0x20ac)`.",
   "Code point order is also what string comparison uses, which is why 'Z' < 'a' is True: 90 is less than 97. When a question asks you to predict comparisons or sorting of mixed-case strings, computing a few `ord()` values in your head settles it."
  ],
  "terms": [
   [
    "ord()",
    "Returns the integer code point of a single-character string."
   ],
   [
    "chr()",
    "Returns the one-character string for an integer code point."
   ],
   [
    "Caesar cipher",
    "A simple substitution that shifts each letter a fixed number of places, easily built with ord and chr."
   ]
  ],
  "example": "A password-strength checker counts uppercase letters by testing 65 <= ord(c) <= 90 for each character. The isupper() method is usually clearer, but the ord version shows exactly which code points count.",
  "tip": "ord() needs exactly one character, otherwise TypeError. chr() needs an int in range 0 to 0x10FFFF, otherwise ValueError. Remember 'A' = 65, 'a' = 97, '0' = 48.",
  "check": [
   [
    "What does chr(ord('A') + 32) return?",
    "'a', because lowercase letters are 32 code points after their uppercase forms."
   ],
   [
    "What happens with ord('hi')?",
    "TypeError, because ord expects a string of length 1."
   ]
  ]
 },
 {
  "t": "String literals and escape sequences (\\n, \\t, \\\\, quotes)",
  "body": [
   "A string literal is text written directly in your source code between quotes. Python accepts single quotes `'...'` and double quotes `\"...\"` interchangeably; they produce identical strings. Having both lets you include one kind of quote easily by delimiting with the other: `\"It's fine\"` or `'She said \"yes\"'`.",
   "Some characters cannot be typed directly inside a literal, or would end it. For those, Python uses escape sequences: a backslash followed by one or more characters that together stand for a single character. The ones to know are `\\n` (newline), `\\t` (horizontal tab), `\\\\` (a literal backslash), `\\'` (single quote) and `\\\"` (double quote). An escape sequence is one character in the resulting string, so `len('a\\nb')` is 3, not 4.",
   "```python\nprint('Name:\\tAda\\nRole:\\tEngineer')\n# Name:   Ada\n# Role:   Engineer\nprint('It\\'s a backslash: \\\\')    # It's a backslash: \\\nprint(len('\\\\'))                  # 1\n```",
   "The backslash-backslash case matters most in practice, for example with Windows paths. `'C:\\new'` does not contain a backslash followed by n; it contains a newline, because `\\n` is an escape. Write `'C:\\\\new'` instead, or use a raw string. A raw string is written with an `r` prefix, such as `r'C:\\new'`, and treats backslashes as ordinary characters, except that it still cannot end with a single backslash.",
   "Triple-quoted strings, written with `'''...'''` or `\"\"\"...\"\"\"`, can span several lines, and the line breaks become newline characters in the string. They are also used for docstrings. Inside them you can use single and double quotes freely.",
   "A backslash at the very end of a line inside ordinary code or a string literal is a line continuation: it joins the next line and adds no character. A backslash followed by a character that is not a recognized escape, like `\\d`, is kept as is for now, but recent Python versions warn about it, so prefer raw strings for patterns full of backslashes.",
   "Two small traps appear on the exam. First, `print()` shows the processed string, while the interactive prompt echoes the representation from `repr()`, which displays escapes: typing `'a\\tb'` at the prompt shows `'a\\tb'`, but `print('a\\tb')` shows a tab. Second, an empty string `''` has length 0, and strings of different quote styles compare equal: `'x' == \"x\"` is True."
  ],
  "terms": [
   [
    "String literal",
    "Text written in source code between single, double or triple quotes."
   ],
   [
    "Escape sequence",
    "A backslash followed by characters that represent one special character, such as \\n."
   ],
   [
    "Raw string",
    "A literal with an r prefix in which backslashes are not treated as escapes."
   ]
  ],
  "example": "A script builds a tab-separated report with '\\t'.join(fields) + '\\n' for each row. Opening the file in a spreadsheet lines everything up in columns, because each \\t is a single tab character.",
  "tip": "Each escape sequence counts as one character: len('\\n') is 1 and len('\\\\') is 1. Watch for accidental escapes in Windows paths.",
  "check": [
   [
    "What is len('a\\tb\\\\')?",
    "4: the characters a, tab, b and one backslash."
   ],
   [
    "How can you write a string containing both ' and \" without escapes?",
    "Use triple quotes, or choose one quote style as the delimiter and escape only the other when needed."
   ]
  ]
 },
 {
  "t": "Indexing, negative indexing and slicing, including steps",
  "body": [
   "A string is a sequence of characters, and each character has a position called an index. Indexes start at 0 for the first character. For `s = 'Python'`, `s[0]` is 'P' and `s[5]` is 'n'. Using an index equal to or beyond the length, such as `s[6]`, raises IndexError. Indexing always returns a string of length one, because Python has no separate character type.",
   "Negative indexes count from the end: `s[-1]` is the last character 'n', `s[-2]` is 'o', and `s[-6]` is 'P'. A useful rule is that `s[-k]` is the same as `s[len(s) - k]`. `s[-7]` is out of range and raises IndexError.",
   "Slicing extracts a substring with the form `s[start:stop:step]`. It returns characters from index start up to, but not including, stop. `s[1:4]` is 'yth'. If you omit start it defaults to the beginning; if you omit stop it defaults to the end, so `s[:2]` is 'Py', `s[2:]` is 'thon' and `s[:]` is a full copy. The length of `s[a:b]` with positive a and b in range is simply b - a. Negative values work in slices too: `s[-3:]` is the last three characters, 'hon', and `s[:-1]` is everything except the last.",
   "Unlike indexing, slicing never raises IndexError. Out-of-range values are clipped to the string's bounds, so `s[2:100]` is 'thon', and a slice whose start is at or after its stop, such as `s[4:2]`, is simply the empty string.",
   "```python\ns = 'Certification'\nprint(s[0], s[-1])     # C n\nprint(s[4:8])          # ific\nprint(s[::2])          # Criiain\nprint(s[::-1])         # noitacifitreC\nprint(s[-3:-8:-1])     # itaci\nprint(s[10:3])         # '' (empty)\n```",
   "The optional step says how far to move between characters. `s[::2]` takes every second character starting at index 0. A negative step walks backwards: `s[::-1]` reverses the string, a very common idiom. With a negative step the defaults flip, so an omitted start means the end of the string and an omitted stop means past the beginning, and start must be to the right of stop to get anything. `s[1:5:-1]` is empty for that reason. A step of 0 raises ValueError.",
   "All of these rules apply equally to lists and tuples, which the exam also slices. When predicting a slice, write the string out with indexes underneath, both positive and negative, and count; it is faster and far more reliable than working it out in your head."
  ],
  "terms": [
   [
    "Index",
    "The position of an element in a sequence, starting at 0."
   ],
   [
    "Negative index",
    "A position counted from the end, where -1 is the last element."
   ],
   [
    "Slice",
    "A subsequence selected with [start:stop:step], excluding the stop position."
   ],
   [
    "Step",
    "The stride between selected positions in a slice; negative values go backwards."
   ]
  ],
  "example": "A script extracts the year from filenames like report_2024_q3.txt with name[7:11], and the file extension check uses name[-4:] == '.txt'. Both keep working even when a filename is shorter than expected, because slices never raise IndexError.",
  "tip": "Indexing out of range raises IndexError; slicing out of range just clips. With a negative step, start must be greater than stop or the result is empty.",
  "check": [
   [
    "What is 'abcdef'[-2:]?",
    "'ef', the last two characters."
   ],
   [
    "What is 'abcdef'[5:1:-2]?",
    "'fd': start at index 5 ('f'), step back by 2 to index 3 ('d'), and stop before index 1."
   ],
   [
    "What does 'abc'[3] do compared with 'abc'[3:]?",
    "'abc'[3] raises IndexError; 'abc'[3:] returns the empty string."
   ]
  ]
 },
 {
  "t": "Immutability: why item assignment fails",
  "body": [
   "Strings in Python are immutable: once a string object is created, its contents can never change. You can read any character with indexing, but you cannot assign to an index or slice, and you cannot delete characters in place. Trying `s[0] = 'J'` raises `TypeError: 'str' object does not support item assignment`, and `del s[0]` raises a similar TypeError. The same applies to slice assignment such as `s[1:3] = 'xy'`.",
   "Immutability sounds limiting, but string methods and operators work around it by always creating new strings. `s.upper()`, `s.replace('a', 'b')` and `s + '!'` each return a brand-new string and leave the original untouched. To change a variable's text, you rebind the name to the new object: `s = s.upper()`. The old string is not modified; the name simply points to a different object, and the old one is discarded once nothing refers to it.",
   "```python\ns = 'Python'\n# s[0] = 'J'           # TypeError\ns = 'J' + s[1:]       # build a new string\nprint(s)              # Jython\n\nt = 'hello'\nt.upper()             # result thrown away\nprint(t)              # hello, unchanged\nt = t.upper()\nprint(t)              # HELLO\n```",
   "That second pattern is a favorite trap: calling a method without assigning the result does nothing visible, because the method cannot change the original. Contrast lists, which are mutable: `lst.append(x)` and `lst.sort()` change the list in place and return None. Confusing the two styles is a common source of bugs, so pay attention to which type you are working with.",
   "Deleting a whole string variable is allowed, because that removes the name, not characters: `del s` works, after which using `s` raises NameError.",
   "Why design strings this way? Immutable objects are safe to share: if two variables refer to the same string, neither can surprise the other by changing it. Immutability also makes strings hashable, which is why they can be dictionary keys and set members, and lets Python optimize storage by reusing identical strings. The cost is that building a long string by repeated `+=` in a loop creates many intermediate strings; for large amounts of text, collect pieces in a list and combine them once with `''.join(pieces)`.",
   "If you genuinely need mutable character data, convert to a list with `list(s)`, modify the list, and join it back. For binary data, the `bytearray` type is the mutable counterpart of immutable `bytes`, and you will meet it again in the file I/O lessons."
  ],
  "terms": [
   [
    "Immutable",
    "Cannot be changed after creation; strings, tuples and bytes are immutable."
   ],
   [
    "Rebinding",
    "Pointing an existing name at a new object, as in s = s.upper()."
   ],
   [
    "Hashable",
    "Having a fixed hash value, which immutability makes possible and dictionaries require for keys."
   ]
  ],
  "example": "A beginner writes name.strip() on a line by itself and is puzzled that the spaces remain. Changing it to name = name.strip() fixes the bug, because strip returns a new string instead of editing the old one.",
  "tip": "Any statement that assigns to s[i] or s[a:b], or deletes s[i], raises TypeError for strings. Methods return new strings; if the result is not assigned, it is lost.",
  "check": [
   [
    "What happens with s = 'abc'; s[1] = 'X'?",
    "TypeError, because str objects do not support item assignment."
   ],
   [
    "After s = 'abc'; s.replace('a', 'z'); print(s), what is printed?",
    "abc, because replace returned a new string that was not assigned."
   ]
  ]
 },
 {
  "t": "Iterating over strings; in and not in",
  "body": [
   "Because a string is a sequence, a `for` loop can walk through it one character at a time. `for ch in 'cat':` runs its body three times with `ch` equal to 'c', 'a' and 't' in turn. This is the natural way to count, test or transform characters, and it avoids manual indexing errors.",
   "```python\ntext = 'Hello, World'\nvowels = 0\nfor ch in text.lower():\n    if ch in 'aeiou':\n        vowels += 1\nprint(vowels)   # 3\n```",
   "If you also need the position of each character, use `enumerate()`, which yields pairs of index and character: `for i, ch in enumerate(text):`. The older style, `for i in range(len(text)):` with `text[i]` inside, works too and appears in exam code, so be comfortable reading both. Because strings are immutable, changing `ch` inside the loop never changes the original string; to transform text, build a new string or list.",
   "The operators `in` and `not in` test membership. For strings they test for substrings, not just single characters: `'ell' in 'Hello'` is True, `'eh' in 'Hello'` is False because the characters must be adjacent and in order, and `'h' in 'Hello'` is False because the test is case-sensitive. `not in` is simply the negation: `'z' not in 'Hello'` is True. Both return a Boolean.",
   "An edge case often tested: the empty string is considered a substring of every string, so `'' in 'abc'` is True, and even `'' in ''` is True. The left operand must be a string when the right one is a string; `1 in 'a1b'` raises TypeError rather than converting the number.",
   "```python\nprint('ell' in 'Hello')     # True\nprint('H' not in 'Hello')   # False\nprint('' in 'abc')          # True\nfor i, ch in enumerate('ab'):\n    print(i, ch)            # 0 a, then 1 b\n```",
   "Membership tests are often the clearest way to express a condition. Instead of `if ch == 'a' or ch == 'e' or ch == 'i' ...`, write `if ch in 'aeiou':`. Just be aware of what that means: `ch in 'aeiou'` would also be True for a multi-character `ch` such as 'ei', which is fine when you know `ch` is one character from a loop, but worth remembering when the value comes from elsewhere. Strings also support `len()`, `min()` and `max()`, which use code point order."
  ],
  "terms": [
   [
    "Iteration",
    "Visiting each element of a sequence in turn, as a for loop does with a string's characters."
   ],
   [
    "Membership operator",
    "in or not in, which test whether a value occurs in a container or a substring occurs in a string."
   ],
   [
    "enumerate()",
    "Built-in that pairs each element with its index during iteration."
   ]
  ],
  "example": "A form validator rejects usernames containing spaces with if ' ' in username, and checks a password contains at least one digit with any(ch in '0123456789' for ch in password).",
  "tip": "For strings, in tests for a contiguous, case-sensitive substring, and the empty string is always in any string. Mixing types, like 3 in 'a3', raises TypeError.",
  "check": [
   [
    "What does 'ab' in 'a b' return?",
    "False, because the characters are not adjacent in 'a b'."
   ],
   [
    "How many times does the body of for c in '' run?",
    "Zero times; the empty string has no characters."
   ]
  ]
 },
 {
  "t": "Concatenation, replication and comparison of strings (and why comparing strings with numbers using < fails)",
  "body": [
   "Two arithmetic operators work on strings with new meanings. `+` concatenates: `'Py' + 'thon'` is 'Python'. Both operands must be strings; `'Age: ' + 30` raises TypeError, so convert first with `str(30)` or use an f-string. `*` replicates: `'ab' * 3` is 'ababab', and the order can be swapped, `3 * 'ab'`. The other operand must be an integer. Multiplying by 0 or a negative number gives the empty string rather than an error. The augmented forms `+=` and `*=` work too and, because strings are immutable, they create new strings and rebind the name.",
   "Strings can be compared with `==`, `!=`, `<`, `<=`, `>` and `>=`. Equality is exact and case-sensitive: `'abc' == 'ABC'` is False. Ordering is lexicographic, like a dictionary, but based on code points rather than alphabet rules. Python compares the first characters; if they differ, the one with the smaller code point makes its string smaller. If they are equal, it moves to the next pair. If one string runs out first and everything so far matched, the shorter string is smaller: `'app' < 'apple'` is True.",
   "```python\nprint('apple' < 'banana')   # True\nprint('Zebra' < 'apple')    # True: 'Z' is 90, 'a' is 97\nprint('10' < '9')           # True: '1' is 49, '9' is 57\nprint('abc' < 'abd')        # True: decided at the third character\nprint('ab' * 0 == '')       # True\n```",
   "Because of code point order, all uppercase letters sort before all lowercase ones, and digits come before letters. Numeric strings compare character by character, so '10' is less than '9', a common bug when sorting numbers read from a file as text. Convert with `int()` before comparing if you want numeric order. For case-insensitive comparison, compare lowercased versions: `a.lower() < b.lower()`.",
   "Comparing a string with a number is where the exam likes to test you. The equality operators always work across types: `'1' == 1` is simply False and `'1' != 1` is True, because values of different types are not equal. The ordering operators do not: `'1' < 1` raises `TypeError: '<' not supported between instances of 'str' and 'int'`. Python 3 refuses to guess a meaningful order between unrelated types. (Python 2 allowed it with arbitrary results, which hid bugs.) The same error appears when you call `sorted()` or `max()` on a list mixing strings and numbers.",
   "In short: `+` and `*` build new strings, comparisons are code-point lexicographic and case-sensitive, `==` across types is safe but False, and `<` across strings and numbers is a TypeError."
  ],
  "terms": [
   [
    "Concatenation",
    "Joining strings end to end with +."
   ],
   [
    "Replication",
    "Repeating a string a whole number of times with *."
   ],
   [
    "Lexicographic order",
    "Comparing sequences element by element, the first difference deciding the result."
   ]
  ],
  "example": "A script reads version numbers from a text file and sorts them as strings, producing 1, 10, 2, 3. Converting each value with int() before sorting gives the intended 1, 2, 3, 10.",
  "tip": "'5' == 5 is False without error, but '5' < 5 raises TypeError. In string ordering, uppercase comes before lowercase and '10' < '9'.",
  "check": [
   [
    "What does 'a' * -2 produce?",
    "The empty string ''; negative replication counts are treated as zero."
   ],
   [
    "Is 'Apple' < 'apple' True or False, and why?",
    "True, because 'A' (65) has a smaller code point than 'a' (97)."
   ],
   [
    "What happens when evaluating 'abc' > 5?",
    "TypeError: ordering comparisons between str and int are not supported."
   ]
  ]
 },
 {
  "t": "Character tests: isdigit(), isalpha(), isalnum(), isspace(), isupper(), islower()",
  "body": [
   "Strings have a family of methods beginning with `is` that test what kind of characters the string contains. Each returns True or False and never changes the string. They are ideal for validating input before converting or storing it. They share two rules that exam questions probe: the test applies to every character in the string, and an empty string returns False for all of them.",
   "`isdigit()` returns True if every character is a digit, so `'2024'.isdigit()` is True, but `'-5'.isdigit()` and `'3.14'.isdigit()` are False because the minus sign and the dot are not digits. `isalpha()` is True if every character is a letter: `'Hello'.isalpha()` is True, while `'Hello World'.isalpha()` is False because of the space. `isalnum()` is True if every character is a letter or a digit, so `'abc123'.isalnum()` is True but `'abc_123'.isalnum()` is False because of the underscore. These methods understand Unicode, so accented letters such as 'é' count as alphabetic.",
   "`isspace()` is True if every character is whitespace: spaces, tabs `\\t` and newlines `\\n` all qualify, so `' \\t\\n'.isspace()` is True. Note that the empty string is not whitespace for this test.",
   "`isupper()` and `islower()` look only at cased characters, meaning letters that have upper and lower forms. `isupper()` is True if there is at least one cased character and all cased characters are uppercase; digits, spaces and punctuation are ignored. So `'ABC 123!'.isupper()` is True, but `'123'.isupper()` is False because there are no cased characters at all. `islower()` works the same way for lowercase. A mixed string such as 'Hello' is neither.",
   "```python\ntests = ['2024', '-5', 'abc', 'abc123', 'A B', '', 'HELLO 1', ' \\t']\nfor s in tests:\n    print(repr(s), s.isdigit(), s.isalpha(), s.isalnum(),\n          s.isspace(), s.isupper(), s.islower())\n```",
   "Running the loop above in IDLE and predicting each line before you look is excellent exam practice. A practical pattern combines these with iteration, for example counting character types in a password: `sum(c.isdigit() for c in pw)` counts digits, because True counts as 1 when summed.",
   "Do not confuse these tests with the converting methods `upper()` and `lower()`, which return new strings. Also note that `'5'.isdigit()` being True does not guarantee `int()` will accept everything `isdigit()` accepts in every script, since some special Unicode digit characters exist; for ordinary ASCII input they agree."
  ],
  "terms": [
   [
    "isdigit()",
    "True if the string is non-empty and every character is a digit."
   ],
   [
    "isalnum()",
    "True if the string is non-empty and every character is a letter or digit."
   ],
   [
    "isspace()",
    "True if the string is non-empty and every character is whitespace."
   ],
   [
    "Cased character",
    "A letter with distinct upper and lower forms; isupper() and islower() consider only these."
   ]
  ],
  "example": "A registration form accepts a username only if username.isalnum() is True, rejecting spaces and symbols, and asks the user to try again when age.isdigit() is False instead of crashing on int(age).",
  "tip": "Every is-method returns False for the empty string. isdigit() rejects '-' and '.', and isupper() needs at least one uppercase letter and no lowercase ones, ignoring digits and symbols.",
  "check": [
   [
    "What does '3.5'.isdigit() return?",
    "False, because the dot is not a digit."
   ],
   [
    "What does 'HELLO WORLD!'.isupper() return?",
    "True: all cased characters are uppercase, and the space and ! are ignored."
   ]
  ]
 },
 {
  "t": "join(), split(), find(), rfind(), index(), and the difference between find and index",
  "body": [
   "These methods break strings apart, glue them together and search inside them. They are among the most used in real code and the most tested in PCAP.",
   "`split()` breaks a string into a list of substrings. With no argument it splits on runs of whitespace and discards leading and trailing whitespace, so `'  a  b\\tc '.split()` is `['a', 'b', 'c']`. With a separator argument it splits on exactly that string and keeps empty pieces: `'a,,b'.split(',')` is `['a', '', 'b']`. An optional second argument limits the number of splits.",
   "`join()` is the opposite, and its shape surprises beginners: it is called on the separator, and the argument is an iterable of strings. `'-'.join(['2024', '09', '25'])` gives '2024-09-25', and `''.join(list_of_chars)` glues characters with nothing between them. Every item must already be a string; `','.join([1, 2])` raises TypeError, so convert first, for example with `','.join(str(n) for n in nums)`.",
   "```python\nwords = 'the quick brown fox'.split()\nprint(words)                 # ['the', 'quick', 'brown', 'fox']\nprint(' '.join(reversed(words)))  # fox brown quick the\n\ns = 'banana'\nprint(s.find('an'))          # 1\nprint(s.rfind('an'))         # 3\nprint(s.find('x'))           # -1\n# s.index('x')               # ValueError: substring not found\n```",
   "`find(sub)` searches for a substring and returns the lowest index where it starts, or -1 if it does not occur. `rfind(sub)` searches from the right and returns the highest starting index, again -1 if absent. Both accept optional start and end arguments to limit the search region: `s.find('a', 2)` begins at index 2. Finding the empty string returns the start position, so `'abc'.find('')` is 0.",
   "`index(sub)` finds a substring exactly like `find()`, returning the lowest index, but when the substring is missing it raises ValueError instead of returning -1. There is also `rindex()`, the counterpart of `rfind()`. So the difference between find and index is only the failure behavior. Use `find()` when absence is normal and you will check for -1; use `index()` when absence would be a bug and you want an exception. A classic mistake with find is writing `if s.find(x):`, which is False when x is found at position 0 and True when it is missing (-1 is truthy). Use `if x in s:` for a simple yes or no.",
   "Lists have an `index()` method too, which raises ValueError when the item is missing, but lists have no `find()`; only strings do."
  ],
  "terms": [
   [
    "split()",
    "Returns a list of substrings separated by whitespace or by a given separator."
   ],
   [
    "join()",
    "Called on a separator string; concatenates an iterable of strings with that separator between them."
   ],
   [
    "find() / rfind()",
    "Return the lowest or highest index of a substring, or -1 if it is absent."
   ],
   [
    "index()",
    "Like find() but raises ValueError when the substring is absent."
   ]
  ],
  "example": "A log parser splits each line with line.split(' ', 2) into date, level and message, uses message.find('user=') to locate an optional field without risking an exception, and rebuilds cleaned lines with '\\t'.join(parts).",
  "tip": "find returns -1 on failure; index raises ValueError. And join is called on the separator: ', '.join(items), never items.join(', ').",
  "check": [
   [
    "What is 'a b  c'.split(' ')?",
    "['a', 'b', '', 'c']: with an explicit separator, consecutive spaces produce an empty string."
   ],
   [
    "What does 'hello'.rfind('l') return?",
    "3, the index of the last 'l'."
   ],
   [
    "Why is if s.find('a'): unreliable?",
    "find returns 0 (falsy) when 'a' is at the start and -1 (truthy) when absent, so the condition is backwards in those cases."
   ]
  ]
 },
 {
  "t": "sorted() on strings versus list.sort()",
  "body": [
   "Python gives you two ways to sort, and they behave differently in ways the exam checks directly. The built-in function `sorted()` accepts any iterable, including a string, and returns a new list containing the items in order. The method `list.sort()` exists only on lists, sorts that list in place, and returns None.",
   "Apply `sorted()` to a string and you get a list of its characters, not a string: `sorted('python')` is `['h', 'n', 'o', 'p', 't', 'y']`. To turn it back into a string, join it: `''.join(sorted('python'))` gives 'hnopty'. The original string is untouched, as it must be, since strings are immutable. That is also why strings have no `sort()` method at all; `'python'.sort()` raises AttributeError.",
   "```python\nword = 'Banana'\nprint(sorted(word))                # ['B', 'a', 'a', 'a', 'n', 'n']\nprint(''.join(sorted(word)))       # Baaann\n\nnames = ['bob', 'Alice', 'carol']\nresult = names.sort()\nprint(result)                      # None\nprint(names)                       # ['Alice', 'bob', 'carol']\nprint(sorted(names, reverse=True)) # ['carol', 'bob', 'Alice']\n```",
   "The default order for strings is code point order, so uppercase letters come before lowercase: `sorted(['b', 'A', 'a', 'B'])` is `['A', 'B', 'a', 'b']`. Both `sorted()` and `list.sort()` accept the same two keyword arguments to change this. `reverse=True` sorts in descending order. `key=` takes a function that is applied to each item to produce the value to compare; `key=str.lower` sorts case-insensitively, and `key=len` sorts strings by length. Items that compare equal keep their original relative order, because Python's sort is stable.",
   "The biggest trap is assignment. Because `list.sort()` returns None, writing `names = names.sort()` destroys your data: `names` becomes None. And `print(names.sort())` prints None even though the list was sorted. With `sorted()`, the opposite mistake is calling it without keeping the result: `sorted(names)` on its own line does nothing lasting.",
   "Choose by need. Use `list.sort()` when you have a list and no longer need the original order; it avoids creating a copy. Use `sorted()` for anything that is not a list (strings, tuples, dictionary keys, generators) or when you want to keep the original unchanged. A handy use is checking anagrams: two words are anagrams if `sorted(a) == sorted(b)`, since both produce lists of the same characters in the same order."
  ],
  "terms": [
   [
    "sorted()",
    "Built-in that returns a new sorted list from any iterable."
   ],
   [
    "list.sort()",
    "Method that sorts a list in place and returns None."
   ],
   [
    "key function",
    "A function passed as key= that computes the value used for comparisons."
   ],
   [
    "Stable sort",
    "A sort that keeps equal items in their original relative order."
   ]
  ],
  "example": "A word-game helper checks whether a player's guess is an anagram of the target with sorted(guess.lower()) == sorted(target.lower()), which works regardless of letter order or capitalization.",
  "tip": "sorted('abc') returns a list, not a string; join it to get a string. list.sort() returns None, so never assign or print its result expecting a list.",
  "check": [
   [
    "What is the type of sorted('hello')?",
    "list, containing the characters in sorted order: ['e', 'h', 'l', 'l', 'o']."
   ],
   [
    "What is x after x = [3, 1, 2].sort()?",
    "None, because sort() works in place and returns None."
   ]
  ]
 },
 {
  "t": "Core ideas: class, object, attribute, method, encapsulation, inheritance, superclass and subclass",
  "body": [
   "Object-oriented programming (OOP) is a way of organizing a program around objects: bundles of data together with the code that works on that data. Instead of separate lists of names, balances and functions that update balances, you create account objects that each know their own balance and how to change it. OOP is the largest section of PCAP, so it pays to get the vocabulary exact.",
   "A class is a blueprint that describes what a kind of object contains and can do. An object, also called an instance, is one concrete thing built from that blueprint. `class Dog:` defines the class; `rex = Dog()` creates an object, and you can create as many independent objects from one class as you like. In Python, even built-in values are objects: `5` is an instance of the class `int`, and `'hi'` is an instance of `str`.",
   "An attribute is a named value that belongs to an object or class, accessed with a dot: `rex.name`. A method is a function defined inside a class that operates on its objects, called with the same dot syntax: `rex.bark()`. Together, attributes hold an object's state and methods define its behavior.",
   "```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name          # attribute\n    def bark(self):               # method\n        return self.name + ' says woof'\n\nclass Puppy(Dog):                 # Puppy is a subclass of Dog\n    def bark(self):\n        return self.name + ' says yip'\n\nprint(Dog('Rex').bark())     # Rex says woof\nprint(Puppy('Bit').bark())   # Bit says yip\n```",
   "Encapsulation means keeping an object's data and the code that manages it together, and controlling access so outside code uses the methods instead of reaching into the data directly. That lets a class enforce rules, such as refusing a negative balance, and change its internal details without breaking the code that uses it. Python supports encapsulation mostly by convention, with underscores, plus name mangling for double-underscore names, as a later lesson explains.",
   "Inheritance lets a new class be defined in terms of an existing one. The new class is the subclass (also called a child or derived class); the existing class is the superclass (parent or base class). A subclass automatically has all attributes and methods of its superclass and can add new ones or override existing ones with its own versions, as `Puppy` overrides `bark()` above. Inheritance expresses an is-a relationship: a Puppy is a Dog. Every class in Python 3 ultimately inherits from the built-in class `object`, even if you do not write it.",
   "One more term the exam uses: a class hierarchy is the tree formed by classes and their subclasses. The more specific a class is, the lower it sits. Moving down the tree means specialization; moving up means generalization."
  ],
  "terms": [
   [
    "Class",
    "A blueprint defining the attributes and methods its objects will have."
   ],
   [
    "Object (instance)",
    "A concrete value created from a class, with its own state."
   ],
   [
    "Encapsulation",
    "Bundling data with the methods that manage it and restricting direct access to that data."
   ],
   [
    "Superclass / subclass",
    "A parent class and a class that inherits from it, specializing or extending it."
   ]
  ],
  "example": "A drawing app defines a Shape superclass with a colour attribute and an area() method, then subclasses Circle and Square that each override area(). The app keeps one list of shapes and asks each one for its area without caring which kind it is.",
  "tip": "A class is the blueprint; an object is an instance built from it. Subclasses inherit everything from superclasses and may override it, and every class inherits from object.",
  "check": [
   [
    "In class Car(Vehicle):, which is the superclass?",
    "Vehicle; Car is the subclass that inherits from it."
   ],
   [
    "What is the difference between an attribute and a method?",
    "An attribute is data stored on an object or class; a method is a function defined in the class that operates on its objects."
   ]
  ]
 },
 {
  "t": "Instance variables versus class variables: declaring, initializing and sharing",
  "body": [
   "Python objects can hold data in two places, and the difference matters. An instance variable belongs to one particular object. It is usually created inside `__init__` by assigning to `self.name`, and each object has its own independent copy. A class variable belongs to the class itself. It is created by an assignment directly in the class body, outside any method, and there is only one copy, shared by all instances.",
   "```python\nclass Counter:\n    created = 0                 # class variable\n\n    def __init__(self, label):\n        self.label = label      # instance variable\n        Counter.created += 1\n\na = Counter('a')\nb = Counter('b')\nprint(a.label, b.label)          # a b\nprint(Counter.created, a.created, b.created)   # 2 2 2\n```",
   "Reading a name through an instance, such as `a.created`, first looks in the instance, and if the name is not there, in its class (and then its superclasses). That is why every instance can read the shared class variable. Class variables exist as soon as the class is defined, before any object is created, so `Counter.created` works even with zero instances.",
   "Writing is different, and this is the key exam trap. Assigning through an instance, `a.created = 100`, never changes the class variable. It creates a new instance variable called `created` on `a` alone, which then shadows the class variable for `a`. `Counter.created` and `b.created` still show the old shared value. To change a class variable, assign through the class: `Counter.created += 1`, as the constructor above does. Inside methods, `self.created += 1` would create an instance variable instead, which is a subtle bug.",
   "Instance variables do not have to be created in `__init__`. Any method, or even code outside the class, can add a new attribute to a single object with `obj.new_attr = value`, and objects of the same class can therefore end up with different sets of attributes. Accessing an attribute that an object does not have (and its class does not provide) raises AttributeError. You can remove an instance variable with `del obj.attr`.",
   "Be careful with mutable class variables such as lists. If the class defines `items = []`, then `self.items.append(x)` does not assign anything; it modifies the one shared list, so every instance sees the change. That is sometimes intended (a shared registry) but usually a bug; per-object lists belong in `__init__` as `self.items = []`.",
   "Use class variables for data truly common to all instances, such as constants, counters of created objects, or default settings. Use instance variables for everything that describes one object."
  ],
  "terms": [
   [
    "Instance variable",
    "An attribute stored on one object, usually set as self.name in __init__."
   ],
   [
    "Class variable",
    "An attribute defined in the class body and shared by all instances."
   ],
   [
    "Shadowing",
    "An instance attribute with the same name hiding a class attribute when accessed through that instance."
   ]
  ],
  "example": "A game's Enemy class has a class variable count to track how many enemies exist and instance variables x, y and health for each one. Damaging one enemy changes only its own health, while Enemy.count rises every time one is spawned.",
  "tip": "obj.x = value always creates or updates an instance variable; it never changes the class variable. Change shared data through the class name.",
  "check": [
   [
    "class A: n = 1. After a = A(); a.n = 5, what are A.n and A().n?",
    "Both are 1; a.n = 5 created an instance variable only on a."
   ],
   [
    "Where does Python look when you read obj.attr?",
    "First in the instance, then in its class, then in the superclasses; if not found, AttributeError."
   ]
  ]
 },
 {
  "t": "The __dict__ attribute of objects and classes",
  "body": [
   "Python stores an object's attributes in a dictionary, and it lets you look at it through the special attribute `__dict__`. For an instance, `obj.__dict__` maps the names of its instance variables to their values. For a class, `ClassName.__dict__` holds the class's own contents: class variables, methods and a few special entries. Examining these dictionaries makes the instance-versus-class distinction concrete, and exam questions often ask you to predict what `__dict__` prints.",
   "```python\nclass Point:\n    dims = 2\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def move(self, dx):\n        self.x += dx\n\np = Point(1, 2)\nprint(p.__dict__)          # {'x': 1, 'y': 2}\nprint('dims' in p.__dict__)  # False\nprint('dims' in Point.__dict__, 'move' in Point.__dict__)  # True True\n```",
   "Notice what the instance dictionary does not contain. Class variables like `dims` are not copied into each instance; they stay in the class dictionary, and instances find them by falling back to the class during lookup. Methods are also stored in the class, not the instance. An instance's `__dict__` contains only the attributes set on that specific object, so it changes when you assign new attributes: after `p.color = 'red'`, `p.__dict__` includes 'color', and after `p.dims = 3`, it includes a `dims` entry shadowing the class variable.",
   "A class's `__dict__` includes, besides your own names, special entries such as `'__module__'`, `'__init__'` (if defined), `'__dict__'`, `'__weakref__'` and `'__doc__'`. It is not an ordinary dict but a read-only view called a mappingproxy, so you cannot assign into it directly; you change class attributes with normal assignment such as `Point.dims = 3`. A subclass's `__dict__` contains only what the subclass itself defines, not what it inherits, which is a handy way to see which methods it overrides.",
   "Private attributes appear in `__dict__` under their mangled names. If `__init__` sets `self.__secret = 1` in class `Vault`, the instance dictionary shows the key `'_Vault__secret'`. The next lesson explains why.",
   "For simple objects you can use `__dict__` for introspection: printing all of an object's state for debugging, or copying values generically. The built-in `vars(obj)` returns the same dictionary and is the more readable spelling. In everyday code you rarely modify `__dict__` directly, but reading it is an excellent learning tool. Not every object has one: many built-in types, such as `int`, store their data differently, and `(5).__dict__` raises AttributeError."
  ],
  "terms": [
   [
    "__dict__",
    "The dictionary (or mapping proxy for classes) holding an object's own attributes."
   ],
   [
    "mappingproxy",
    "The read-only mapping type used for a class's __dict__."
   ],
   [
    "vars()",
    "Built-in returning an object's __dict__."
   ]
  ],
  "example": "Debugging a Customer object, a developer prints vars(customer) and sees only name and email. The missing discount attribute turns out to be a class variable, which appears only in Customer.__dict__.",
  "tip": "Instance __dict__ holds only attributes set on that instance. Class variables and methods live in the class's __dict__, and inherited names do not appear in a subclass's __dict__.",
  "check": [
   [
    "class A: v = 1; def __init__(self): self.w = 2. What is A().__dict__?",
    "{'w': 2}; the class variable v is not in the instance dictionary."
   ],
   [
    "Where is a method stored: in the instance __dict__ or the class __dict__?",
    "In the class __dict__; instances find it through the class."
   ]
  ]
 },
 {
  "t": "Private attributes and name mangling (__name becomes _ClassName__name)",
  "body": [
   "Python does not have strictly private attributes the way some languages do, but it has two conventions that support encapsulation. A single leading underscore, like `self._balance`, means internal: please do not use this from outside. Nothing enforces it. A double leading underscore, like `self.__balance`, with no double underscore at the end, triggers a mechanism called name mangling, which the PCAP exam tests closely.",
   "Name mangling works at compile time inside a class body. Any identifier of the form `__name` written inside `class Account:` is automatically rewritten to `_Account__name`: an underscore, the class name, then the original name. Within the class's own methods you keep writing `self.__balance` and it works, because those references are rewritten too. Outside the class, `acct.__balance` is not rewritten, so it looks for an attribute literally called `__balance`, which does not exist, and raises AttributeError.",
   "```python\nclass Account:\n    def __init__(self, amount):\n        self.__balance = amount\n    def balance(self):\n        return self.__balance\n\na = Account(100)\nprint(a.balance())             # 100\n# print(a.__balance)           # AttributeError\nprint(a._Account__balance)     # 100 - the mangled name\nprint(a.__dict__)              # {'_Account__balance': 100}\n```",
   "As the last two lines show, the data is still reachable if you know the mangled name, and `__dict__` reveals it. So mangling is not security; it is protection against accidents. Its main purpose is to avoid name clashes in inheritance: if a superclass and a subclass both use `__data`, they get `_Parent__data` and `_Child__data`, two separate attributes, so the subclass cannot accidentally overwrite the parent's internal state.",
   "The same rule applies to methods and class variables: a method named `__helper` inside class `Tool` becomes `_Tool__helper`. Names that both start and end with two underscores, such as `__init__` or `__str__`, are special methods and are not mangled. Names with a single leading underscore are never mangled.",
   "A consequence worth noticing: assigning `a.__balance = 5` from outside the class does not change the private value. Because that code is not inside the class body, no mangling happens, and Python simply creates a new, unrelated instance attribute literally named `__balance`. Afterwards `a.balance()` still returns 100. Exam questions use exactly this to test whether you understand that mangling depends on where the code is written."
  ],
  "terms": [
   [
    "Private attribute",
    "An attribute whose name starts with two underscores (and does not end with two), subject to name mangling."
   ],
   [
    "Name mangling",
    "Rewriting __name inside a class to _ClassName__name to avoid clashes."
   ],
   [
    "Single-underscore convention",
    "A leading _ marks a name as internal but has no enforcement."
   ]
  ],
  "example": "A library's Connection class stores self.__socket. A user subclass also defines self.__socket for a different purpose, and thanks to mangling the two become _Connection__socket and _MyConn__socket, so neither breaks the other.",
  "tip": "Inside class C, __x becomes _C__x. Outside the class, obj.__x is not mangled and fails (or creates a separate attribute if assigned). Dunder names like __init__ are never mangled.",
  "check": [
   [
    "In class Box, self.__size = 3 is set. What key appears in the instance __dict__?",
    "'_Box__size'."
   ],
   [
    "Is __str__ mangled?",
    "No. Names ending with two underscores are not mangled."
   ]
  ]
 },
 {
  "t": "Methods and the self parameter; constructors (__init__) with default arguments",
  "body": [
   "A method is a function defined inside a class. Its first parameter receives the object the method was called on, and by strong convention it is named `self`. When you write `obj.method(5)`, Python translates it into `ClassName.method(obj, 5)`, passing the object automatically as the first argument. You never pass `self` yourself in a normal call, but you must always list it in the method definition.",
   "Forgetting `self` in the definition is a classic error. If you write `def greet():` inside a class and call `obj.greet()`, Python still passes the object, so the call fails with a TypeError saying the method takes 0 positional arguments but 1 was given. Inside a method, `self` is how you reach the object's attributes and other methods: `self.name`, `self.helper()`. A bare `name` would refer to a local or global variable instead.",
   "The special method `__init__` is the constructor (more precisely, the initializer). Python calls it automatically right after creating a new object when you call the class, so `Dog('Rex', 3)` runs `__init__(new_dog, 'Rex', 3)`. Its job is to set up the object's instance variables. It must not return a value other than None; returning anything else raises TypeError.",
   "```python\nclass Timer:\n    def __init__(self, minutes=5, label='timer'):\n        self.minutes = minutes\n        self.label = label\n    def describe(self):\n        return f'{self.label}: {self.minutes} min'\n\nprint(Timer().describe())            # timer: 5 min\nprint(Timer(10).describe())          # timer: 10 min\nprint(Timer(label='tea').describe()) # tea: 5 min\n```",
   "Default parameter values in `__init__` let callers omit arguments, just as with ordinary functions. Parameters with defaults must come after those without. Keyword arguments let callers skip earlier defaults, as `Timer(label='tea')` does. Avoid mutable defaults such as `items=[]`: the default list is created once, when the function is defined, and would be shared by every object created without that argument. Use `items=None` and create a new list inside.",
   "Python does not support multiple constructors by overloading. If a class body defines `__init__` twice, the second definition simply replaces the first, just as reassigning a variable does. Default arguments are the Python way to provide flexible construction. If a class defines no `__init__` at all, it inherits one, ultimately from `object`, which accepts no extra arguments; calling such a class with arguments raises TypeError.",
   "Methods can call each other through `self`, can have their own defaults, and can return values like any function. You can also call a method through the class and pass the instance explicitly, `Timer.describe(t)`, which shows clearly what `self` really is."
  ],
  "terms": [
   [
    "self",
    "The conventional name of a method's first parameter, which receives the instance."
   ],
   [
    "__init__",
    "The initializer that runs automatically when an object is created, setting its attributes."
   ],
   [
    "Default argument",
    "A parameter value used when the caller does not supply one."
   ]
  ],
  "example": "A Rectangle class defines __init__(self, width=1, height=1). Code that builds unit squares writes Rectangle(), while a layout engine writes Rectangle(height=4) to take the default width and set only the height.",
  "tip": "Every instance method needs self as its first parameter, and obj.m(a) passes obj automatically. A second __init__ definition replaces the first; Python has no constructor overloading.",
  "check": [
   [
    "class A: def f(): return 1. What happens with A().f()?",
    "TypeError: f() takes 0 positional arguments but 1 was given, because the instance is passed automatically."
   ],
   [
    "What does obj.method(3) translate to?",
    "type(obj).method(obj, 3), with obj bound to self."
   ]
  ]
 },
 {
  "t": "Introspection: hasattr(), type(), __name__, __module__, __bases__, __class__",
  "body": [
   "Introspection means a program examining its own objects at run time: what type something is, which attributes it has, where its class came from. Python makes this easy, and the exam checks a specific set of tools. (Changing objects at run time is called reflection; Python supports that too, through functions like `setattr()`.)",
   "`hasattr(obj, 'name')` returns True if the object has an attribute with that name, either on the instance or through its class and superclasses, and False otherwise. The name must be passed as a string. It is a safe way to check before accessing something that might be missing. Its companions are `getattr(obj, 'name', default)` to read an attribute by name and `setattr(obj, 'name', value)` to set one.",
   "`type(obj)` returns the object's class. `type(5)` is `int`, and for your own objects it is the class you created them from. Every object also has a `__class__` attribute that refers to the same class, so `obj.__class__ is type(obj)` is True.",
   "Classes carry information about themselves in special attributes. `__name__` is the class's name as a string: `Dog.__name__` is 'Dog'. Instances do not have their own `__name__`, so for an object you write `type(obj).__name__` or `obj.__class__.__name__`; `obj.__name__` raises AttributeError. `__module__` is a string naming the module where the class was defined: `'__main__'` for classes defined in the script you ran, or the module name such as 'shapes' for an imported one. Instances can read `__module__` through their class.",
   "`__bases__` is a tuple of a class's direct superclasses, in the order they were listed. For `class C(A, B):`, `C.__bases__` is `(A, B)`. A class with no explicit parent has `(object,)`. It is available only on classes, not instances. It shows only the direct parents; for the whole ancestry, including indirect ones, use `__mro__`.",
   "```python\nclass Animal: pass\nclass Dog(Animal): pass\nd = Dog()\nprint(type(d).__name__)          # Dog\nprint(d.__class__.__name__)      # Dog\nprint(Dog.__module__)            # __main__\nprint(Dog.__bases__)             # (<class '__main__.Animal'>,)\nprint([c.__name__ for c in Dog.__bases__])  # ['Animal']\nprint(hasattr(d, 'speak'))       # False\n```",
   "These tools let generic code adapt to the objects it receives, for example printing any object's class name in a log, or walking a hierarchy with a loop that follows `__bases__` upwards. The PCAP lab for this section asks you to write such a function, which is excellent preparation for questions that print these attributes."
  ],
  "terms": [
   [
    "Introspection",
    "Examining an object's type and attributes at run time."
   ],
   [
    "hasattr()",
    "Returns True if an object has, or can reach, an attribute with the given string name."
   ],
   [
    "__bases__",
    "A tuple of a class's direct superclasses, available on classes only."
   ],
   [
    "__module__",
    "The name of the module in which a class was defined."
   ]
  ],
  "example": "A plugin loader receives unknown objects, checks hasattr(plugin, 'run') before calling it, and logs plugin.__class__.__name__ and plugin.__class__.__module__ so errors name exactly which class and file misbehaved.",
  "tip": "__name__ and __bases__ belong to classes; on an instance, go through type(obj) or obj.__class__ first. __bases__ lists only direct parents, as a tuple.",
  "check": [
   [
    "What does print(Dog.__bases__) show for class Dog: pass?",
    "(<class 'object'>,), a one-element tuple containing object."
   ],
   [
    "Why does obj.__name__ usually fail for an instance?",
    "Instances do not have __name__; the class does, so use type(obj).__name__."
   ]
  ]
 },
 {
  "t": "Single and multiple inheritance, method overriding and super()",
  "body": [
   "Inheritance lets a class reuse and extend another. With single inheritance a class has one direct superclass: `class Car(Vehicle):`. The subclass gets every attribute and method of `Vehicle`, and anything it defines itself is added. When you call a method on a `Car`, Python looks in `Car` first and then in `Vehicle`, then in `Vehicle`'s superclasses, finally reaching `object`.",
   "Method overriding happens when a subclass defines a method with the same name as one in its superclass. The subclass version wins for objects of the subclass, because lookup finds it first. Python matches methods by name only, not by parameter list, so an overriding method may even take different parameters, though keeping them compatible is good design.",
   "Often you want to extend the superclass's behavior rather than replace it completely. `super()` gives access to the superclass's version. The most common case is the constructor: a subclass's `__init__` calls `super().__init__(...)` so the superclass can set up its own attributes, then adds more. If a subclass defines `__init__` and forgets to call the parent's, the parent's attributes are never created, which later causes AttributeError.",
   "```python\nclass Vehicle:\n    def __init__(self, wheels):\n        self.wheels = wheels\n    def describe(self):\n        return f'{self.wheels} wheels'\n\nclass Car(Vehicle):\n    def __init__(self, brand):\n        super().__init__(4)\n        self.brand = brand\n    def describe(self):\n        return self.brand + ', ' + super().describe()\n\nprint(Car('Volvo').describe())   # Volvo, 4 wheels\n```",
   "Notice that `super()` takes no arguments inside a method in Python 3 and you do not pass `self` to the method you call through it: `super().__init__(4)`, not `super().__init__(self, 4)`. The alternative is to call the superclass by name, `Vehicle.__init__(self, 4)`, in which case you must pass `self` explicitly. Both appear on the exam.",
   "With multiple inheritance a class lists several superclasses: `class FlyingCar(Car, Aircraft):`. It inherits from all of them. If more than one parent defines the same method, Python uses the first one found by searching the classes in a defined order, broadly left to right as listed, and each class before its own parents. That order is the method resolution order, the subject of the next lesson. `super()` follows the same order, which lets cooperative classes each call `super()` and have every class's method run once.",
   "Multiple inheritance is powerful but can make code hard to follow. A common, clean use is the mixin: a small class that adds one capability, such as `JsonMixin` providing a `to_json()` method, combined with a main class. Methods are found by name, so a method defined in a subclass can also be called from superclass code through `self`, which is how superclasses provide templates that subclasses fill in."
  ],
  "terms": [
   [
    "Single inheritance",
    "A class with exactly one direct superclass."
   ],
   [
    "Multiple inheritance",
    "A class that lists two or more direct superclasses."
   ],
   [
    "Overriding",
    "Defining a method in a subclass with the same name as one in a superclass, replacing it for the subclass."
   ],
   [
    "super()",
    "Returns a proxy that finds the next class's version of a method in the method resolution order."
   ]
  ],
  "example": "A LoggedList class inherits from list and overrides append() to print a message and then call super().append(item), so it behaves exactly like a list while recording every addition.",
  "tip": "super().method(args) does not take self; ClassName.method(self, args) does. If a subclass overrides __init__ without calling super().__init__(), the parent's attributes are missing.",
  "check": [
   [
    "class A: def hi(self): return 'A'; class B(A): def hi(self): return 'B' + super().hi(). What does B().hi() return?",
    "'BA': B's method runs and calls A's through super()."
   ],
   [
    "If class C(A, B) and both A and B define m(), which one does C().m() use when C does not define m?",
    "A's version, because A is listed first and is searched before B."
   ]
  ]
 },
 {
  "t": "Method resolution order (MRO), diamonds and inconsistent hierarchies",
  "body": [
   "When you access an attribute on an object, Python searches a list of classes in a fixed order and uses the first match. That list is the method resolution order (MRO). For single inheritance it is simple: the class, its parent, the grandparent, up to `object`. With multiple inheritance, Python computes it with an algorithm called C3 linearization, and the exam expects you to predict the result for small hierarchies.",
   "You can see any class's MRO with `ClassName.__mro__` (a tuple) or `ClassName.mro()` (a list). The rules C3 follows can be summarized in two constraints: a class always comes before its own parents, and parents keep the left-to-right order in which they were listed in the class statement. The search follows a single consistent order rather than jumping around, and every class appears exactly once.",
   "The classic test case is the diamond: `B` and `C` both inherit from `A`, and `D` inherits from both `B` and `C`. Drawn out, the inheritance lines form a diamond shape. The MRO of `D` is D, B, C, A, object. Notice that `A` comes after both `B` and `C`, not immediately after `B`. That ensures a method overridden in `C` is found before the version in `A`, and that `A` is visited only once.",
   "```python\nclass A:\n    def who(self): return 'A'\nclass B(A):\n    pass\nclass C(A):\n    def who(self): return 'C'\nclass D(B, C):\n    pass\n\nprint(D().who())                          # C\nprint([k.__name__ for k in D.__mro__])    # ['D', 'B', 'C', 'A', 'object']\n```",
   "`D().who()` returns 'C'. A naive depth-first search going D, B, A would have found `A`'s version first, but the MRO places `C` before `A`. Swapping the order of the bases, `class D(C, B)`, changes the MRO to D, C, B, A, object.",
   "Some hierarchies have no order that satisfies both constraints, and Python refuses to create them. For example, with `class Top:`, `class Middle(Top):` and then `class Bottom(Top, Middle):`, the base list says Top should come before Middle, but Middle is a subclass of Top, so Middle must come before Top. The two rules conflict, and the class statement itself raises `TypeError: Cannot create a consistent method resolution order (MRO)`. The error happens when the class is defined, not when a method is called. Listing the more specific class first, `class Bottom(Middle, Top):`, is valid.",
   "The MRO also drives `super()`. Inside a method, `super()` means the next class after the current one in the MRO of the object's actual class, which may be a sibling rather than a parent. That is what allows cooperative multiple inheritance, where each class calls `super()` and every class in the diamond runs exactly once."
  ],
  "terms": [
   [
    "MRO",
    "Method resolution order: the ordered list of classes searched for attributes."
   ],
   [
    "Diamond problem",
    "A hierarchy where two parents share a common ancestor, raising the question of search order."
   ],
   [
    "C3 linearization",
    "The algorithm Python uses to compute a consistent MRO."
   ],
   [
    "__mro__",
    "A class attribute holding its MRO as a tuple of classes."
   ]
  ],
  "example": "A GUI toolkit's Button inherits from Clickable and Drawable, both of which inherit from Widget. Printing Button.__mro__ shows Button, Clickable, Drawable, Widget, object, confirming that Widget's setup method runs last and only once.",
  "tip": "In a diamond, the shared ancestor comes after all its subclasses in the MRO. Listing a superclass before one of its own subclasses in the bases raises TypeError when the class is defined.",
  "check": [
   [
    "For class D(B, C) where B and C both inherit from A, what is the MRO?",
    "D, B, C, A, object."
   ],
   [
    "When is the inconsistent-MRO TypeError raised?",
    "At class definition time, when Python evaluates the class statement with the conflicting bases."
   ]
  ]
 },
 {
  "t": "isinstance(), issubclass(), and the is / is not operators versus ==",
  "body": [
   "These tools answer different questions: what kind of thing is this object, how are these classes related, and are these two names referring to the same object or just equal values? Mixing them up is a common source of wrong exam answers.",
   "`isinstance(obj, Class)` returns True if the object is an instance of that class or of any of its subclasses. So with `class Dog(Animal):` and `d = Dog()`, both `isinstance(d, Dog)` and `isinstance(d, Animal)` are True, and so is `isinstance(d, object)`, since everything is an object. The second argument can be a tuple of classes, and the result is True if any matches: `isinstance(x, (int, float))`. Prefer `isinstance` over `type(x) == Dog` checks, because comparing types exactly ignores inheritance.",
   "`issubclass(Sub, Super)` compares two classes rather than an object. It returns True if `Sub` is `Super` or inherits from it directly or indirectly. A class counts as a subclass of itself, so `issubclass(Dog, Dog)` is True. Passing an instance instead of a class raises TypeError. This also works for built-ins: `issubclass(bool, int)` is True and `issubclass(KeyError, LookupError)` is True.",
   "```python\nclass Animal: pass\nclass Dog(Animal): pass\nd = Dog()\nprint(isinstance(d, Animal), issubclass(Dog, Animal))  # True True\nprint(issubclass(Animal, Dog))                          # False\n\na = [1, 2]\nb = [1, 2]\nc = a\nprint(a == b, a is b, a is c)   # True False True\n```",
   "The `is` operator tests identity: whether two expressions refer to the very same object in memory. `==` tests equality: whether two objects have equal values, as defined by the type (by calling `__eq__`). In the example, `a` and `b` are two separate lists with equal contents, so `a == b` is True but `a is b` is False. `c = a` does not copy; it makes `c` another name for the same list, so `a is c` is True, and `c.append(3)` changes what `a` shows too. `is not` is simply the negation of `is`.",
   "For objects of your own classes without a custom `__eq__`, `==` falls back to identity, so two separate instances with identical attributes are not equal unless you define `__eq__`. For comparisons with None, always use `is None` or `is not None`, because there is exactly one None object.",
   "Avoid using `is` to compare numbers or strings. Python may reuse objects for small integers or short strings as an optimization, so `is` sometimes appears to work, but that is an implementation detail and can give different results in different situations. Use `==` for values and `is` for identity, and the behavior is always predictable."
  ],
  "terms": [
   [
    "isinstance()",
    "Returns True if an object is an instance of a class or any of its subclasses."
   ],
   [
    "issubclass()",
    "Returns True if a class is the same as, or derives from, another class."
   ],
   [
    "Identity (is)",
    "Whether two references point to the same object."
   ],
   [
    "Equality (==)",
    "Whether two objects have equal values according to their type."
   ]
  ],
  "example": "A function that accepts numbers checks isinstance(value, (int, float)) so it works with subclasses such as bool, and a cache lookup uses if result is None to detect a miss without confusing it with an empty list, which is falsy but not None.",
  "tip": "issubclass(C, C) is True. isinstance also matches superclasses. a == b compares values; a is b compares identity, and assigning b = a creates no copy.",
  "check": [
   [
    "For class B(A), what does isinstance(A(), B) return?",
    "False: an A object is not an instance of the subclass B."
   ],
   [
    "x = [1]; y = x[:]. What are x == y and x is y?",
    "True and False: the slice made a new list with equal contents."
   ]
  ]
 },
 {
  "t": "Polymorphism and the __str__() method",
  "body": [
   "Polymorphism means one interface, many forms: the same method call can do different things depending on the object it is called on. If `Circle`, `Square` and `Triangle` each define `area()`, then a loop that calls `shape.area()` works on all of them, and each object runs its own version. The calling code does not need `if` statements checking the type; the object itself knows how to respond.",
   "In Python this arises naturally from method overriding and dynamic lookup. When a method is called, Python looks it up on the actual object's class at that moment, so a superclass method that calls `self.something()` will run the subclass's version of `something` if the object is a subclass instance. This lets a superclass define the overall steps of an algorithm while subclasses supply the details.",
   "```python\nclass Shape:\n    def area(self):\n        return 0\n    def report(self):\n        return type(self).__name__ + ' area ' + str(self.area())\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s * self.s\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return round(3.14159 * self.r ** 2, 1)\n\nfor sh in (Square(2), Circle(1)):\n    print(sh.report())   # Square area 4, then Circle area 3.1\n```",
   "Python goes further than inheritance-based polymorphism. Because lookup is by name at run time, any object with the right method works, whether or not it shares a superclass. This is called duck typing: if it walks like a duck and quacks like a duck, treat it as a duck. The built-in `len()` works on strings, lists and your own classes that define `__len__`, all through the same idea.",
   "The `__str__()` method is a polymorphic hook that every object has. `print(obj)` and `str(obj)` call it to get a human-readable string. The default version inherited from `object` produces something like `<__main__.Point object at 0x7f...>`, which is rarely useful. Overriding it gives your objects a meaningful printed form. It must return a string; returning anything else causes a TypeError when printing.",
   "```python\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\np = Point(1, 2)\nprint(p)            # (1, 2)\nprint('P=' + str(p))  # P=(1, 2)\n```",
   "A related method, `__repr__()`, provides the developer-oriented representation shown at the interactive prompt and inside containers: printing a list of points uses each element's `__repr__`, not `__str__`. If a class defines only `__repr__`, `str()` falls back to it. For PCAP, focus on `__str__`: know that `print` calls it, that it is inherited and can be overridden like any method, and that it must return a string."
  ],
  "terms": [
   [
    "Polymorphism",
    "The ability of different classes to respond to the same method call in their own way."
   ],
   [
    "Duck typing",
    "Using any object that provides the needed methods, regardless of its class."
   ],
   [
    "__str__()",
    "Special method returning an object's readable string form, used by print() and str()."
   ]
  ],
  "example": "A payroll program keeps Salaried and Hourly employee objects in one list and calls emp.pay() on each. Adding a Contractor class later needs no change to the payroll loop, only a new pay() method.",
  "tip": "print(obj) calls obj.__str__(); without an override you get the default <... object at 0x...> text. Polymorphic calls run the method of the object's actual class, even when called from superclass code.",
  "check": [
   [
    "What must __str__ return?",
    "A string; returning another type makes print() or str() raise TypeError."
   ],
   [
    "A superclass method calls self.area(); the object is a Square that overrides area(). Which area() runs?",
    "Square's, because lookup starts from the object's actual class."
   ]
  ]
 },
 {
  "t": "List comprehensions, including if filters and nested loops",
  "body": [
   "A list comprehension builds a new list from an iterable in a single expression. Instead of creating an empty list and appending inside a `for` loop, you write the whole thing in brackets: `[expression for item in iterable]`. `[x * x for x in range(5)]` produces `[0, 1, 4, 9, 16]`. Comprehensions are shorter than the loop version, usually a little faster, and very common in exam code.",
   "Read a comprehension from the `for` outward: for each `x` in `range(5)`, evaluate `x * x` and collect the result. The loop variable is local to the comprehension in Python 3, so it does not leak out: after the comprehension, `x` is not defined (unless it existed before, in which case it is untouched).",
   "An `if` clause at the end filters items: only those for which the condition is true are included. `[w for w in words if len(w) > 3]` keeps long words. Do not confuse that with a conditional expression at the front, which transforms every item instead of dropping some: `['even' if n % 2 == 0 else 'odd' for n in nums]` produces one entry per number. A filter `if` has no `else`; a conditional expression must have one.",
   "```python\nnums = [1, 2, 3, 4, 5, 6]\nprint([n for n in nums if n % 2 == 0])      # [2, 4, 6]\nprint([n * 10 if n > 3 else n for n in nums])  # [1, 2, 3, 40, 50, 60]\nprint([(x, y) for x in 'ab' for y in (1, 2)])\n# [('a', 1), ('a', 2), ('b', 1), ('b', 2)]\nprint([[r * c for c in range(1, 4)] for r in range(1, 4)])\n# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]\n```",
   "Multiple `for` clauses create nested loops, and they run in the order written, left to right, exactly as if you had written the loops one inside the other. In `[(x, y) for x in 'ab' for y in (1, 2)]`, the first `for` is the outer loop and the second changes fastest. The resulting list is flat. Contrast that with a comprehension inside another comprehension, as in the last example, which produces a list of lists: the inner comprehension builds each row. That form is how you create a two-dimensional grid; writing `[[0] * 3] * 3` instead would make three references to the same inner list, so changing one row would change all of them.",
   "You can combine several `for` and `if` clauses: `[(x, y) for x in range(3) for y in range(3) if x != y]`. Each `if` applies to the loops written before it. Keep comprehensions readable; when one needs more than two clauses, an ordinary loop is often clearer.",
   "The same syntax with different brackets builds other types: braces give a set comprehension or, with `key: value`, a dictionary comprehension, and parentheses give a generator expression, which produces values lazily instead of building a list, as the generators lesson explains."
  ],
  "terms": [
   [
    "List comprehension",
    "An expression in brackets that builds a list by looping over an iterable."
   ],
   [
    "Filter clause",
    "A trailing if in a comprehension that includes only items meeting a condition."
   ],
   [
    "Conditional expression",
    "A if condition else B, which chooses a value for every item."
   ],
   [
    "Nested comprehension",
    "A comprehension inside another, used to build lists of lists."
   ]
  ],
  "example": "A teacher converts a list of raw scores into letter grades with ['pass' if s >= 50 else 'fail' for s in scores] and then collects only the top marks with [s for s in scores if s >= 90].",
  "tip": "In multiple for clauses, the leftmost loop is the outer one. A trailing if filters (no else allowed); a leading if ... else transforms every item.",
  "check": [
   [
    "What is [c for c in 'hello' if c not in 'lo']?",
    "['h', 'e']."
   ],
   [
    "What does [i * j for i in range(2) for j in range(3)] produce?",
    "[0, 0, 0, 0, 1, 2]: i = 0 gives three zeros, then i = 1 gives 0, 1, 2."
   ]
  ]
 },
 {
  "t": "Lambda functions and functions that take a lambda as an argument",
  "body": [
   "A lambda is a small anonymous function written as an expression: `lambda parameters: expression`. `lambda x: x * 2` is a function that takes one argument and returns it doubled. It behaves like `def double(x): return x * 2` but has no name of its own and fits wherever an expression is allowed, such as an argument to another function.",
   "The body of a lambda must be a single expression, and its value is returned automatically; you never write `return`. Statements such as assignments, loops or `if` blocks cannot appear, although a conditional expression can: `lambda n: 'even' if n % 2 == 0 else 'odd'`. A lambda may take no parameters (`lambda: 42`), several parameters (`lambda a, b: a + b`) and default values (`lambda x, y=1: x + y`).",
   "```python\nsquare = lambda x: x ** 2\nprint(square(4))                  # 16\nprint((lambda a, b: a * b)(3, 5)) # 15, called immediately\n\ndef apply(f, value):\n    return f(value)\n\nprint(apply(lambda s: s.upper(), 'hi'))   # HI\nprint(apply(len, 'hello'))                # 5\n```",
   "Functions in Python are objects that can be passed around like any value, and that is where lambdas shine. A function that accepts another function as a parameter is called a higher-order function. In `apply(f, value)` above, `f` can be a lambda, a built-in like `len`, or any `def` function; `apply` just calls it. Writing and tracing such functions is a standard PCAP task, so practice asking: what function is passed in, and what does the receiving function do with it?",
   "The most common real use is the `key` argument of `sorted()`, `min()` and `max()`, and the function argument of `map()` and `filter()`. `sorted(people, key=lambda p: p[1])` sorts tuples by their second item; `max(words, key=lambda w: len(w))` finds the longest word. The lambda is called once per item to produce the value used for comparison.",
   "```python\npairs = [('b', 3), ('a', 1), ('c', 2)]\nprint(sorted(pairs, key=lambda p: p[1]))   # [('a', 1), ('c', 2), ('b', 3)]\nprint(min(pairs, key=lambda p: p[0]))      # ('a', 1)\n```",
   "Assigning a lambda to a name, as `square = lambda x: x ** 2` does, works, but style guides prefer `def` in that case because a named function gives clearer tracebacks. Use lambdas for short, throwaway functions passed straight into another call. Lambdas can also be returned from functions, which leads to closures, covered shortly."
  ],
  "terms": [
   [
    "Lambda",
    "An anonymous function defined by a single expression whose value it returns."
   ],
   [
    "Higher-order function",
    "A function that takes another function as an argument or returns one."
   ],
   [
    "key function",
    "A function passed to sorted(), min() or max() to compute the comparison value for each item."
   ]
  ],
  "example": "An online store sorts products for display with sorted(products, key=lambda p: p['price']), and a user's choice of highest rating first becomes sorted(products, key=lambda p: p['rating'], reverse=True).",
  "tip": "A lambda body is one expression with an implicit return; no statements, no return keyword. When a function receives a lambda, trace it by substituting the argument into the lambda's expression.",
  "check": [
   [
    "What is printed by print((lambda x, y=2: x ** y)(3))?",
    "9, because y defaults to 2 and 3 ** 2 is 9."
   ],
   [
    "Is lambda x: return x valid?",
    "No. The body must be an expression; return is a statement and is not allowed."
   ]
  ]
 },
 {
  "t": "map() and filter(), and the fact that they return one-shot iterators",
  "body": [
   "`map()` and `filter()` apply a function across the items of an iterable. `map(function, iterable)` calls the function on each item and produces the results. `filter(function, iterable)` calls the function on each item and keeps only the items for which it returns a true value. Both are often used with lambdas.",
   "```python\nnums = [1, 2, 3, 4, 5]\nprint(list(map(lambda n: n * n, nums)))         # [1, 4, 9, 16, 25]\nprint(list(filter(lambda n: n % 2 == 1, nums))) # [1, 3, 5]\nprint(list(map(str, nums)))                     # ['1', '2', '3', '4', '5']\n```",
   "In Python 3, neither function returns a list. They return iterator objects, a map object and a filter object, that produce values lazily, one at a time, only when asked. That is why the examples wrap them in `list()`. Printing one directly shows something like `<map object at 0x...>` rather than the values.",
   "Being an iterator has a consequence that the exam loves: it is one-shot. Once you have consumed all its values, by converting it to a list, looping over it, or calling `sum()` on it, it is exhausted, and using it again produces nothing. Creating it does not run anything; the function is called only as values are requested.",
   "```python\nm = map(str.upper, ['a', 'b'])\nprint(list(m))   # ['A', 'B']\nprint(list(m))   # [] - already exhausted\n\nf = filter(None, [0, 1, '', 'x', None, [2]])\nprint(list(f))   # [1, 'x', [2]]\n```",
   "If you need the results more than once, store them in a list first: `results = list(map(...))`. You can also step through an iterator manually with `next()`, which raises StopIteration when nothing is left, the same protocol generators use.",
   "A few more details are tested. `map()` accepts several iterables when the function takes several arguments: `map(lambda a, b: a + b, [1, 2, 3], [10, 20])` gives 11 and 22, stopping at the shortest iterable. `filter()` accepts `None` as the function, which means keep items that are themselves truthy, so it removes zeros, empty strings, None and empty containers. And the function can be any callable, not just a lambda: `map(int, ['1', '2'])` converts strings to integers.",
   "List comprehensions can do the same jobs: `[n * n for n in nums]` equals `list(map(lambda n: n * n, nums))` and `[n for n in nums if n % 2]` equals the filter version. Many Python programmers prefer comprehensions for readability, but you must be able to read both, and to remember that the comprehension builds a list immediately while map and filter are lazy."
  ],
  "terms": [
   [
    "map()",
    "Returns an iterator applying a function to each item of one or more iterables."
   ],
   [
    "filter()",
    "Returns an iterator yielding the items for which a function returns a true value."
   ],
   [
    "Iterator",
    "An object producing values one at a time with next(); once exhausted it yields nothing more."
   ],
   [
    "Lazy evaluation",
    "Computing values only when they are requested."
   ]
  ],
  "example": "A script reads prices with prices = map(float, lines), prints sum(prices), and then tries max(prices), which fails because the map iterator was already exhausted by sum(). Storing list(map(float, lines)) fixes it.",
  "tip": "map and filter return iterators, not lists, and each can be consumed only once. A second list() of the same object gives [].",
  "check": [
   [
    "What is list(filter(lambda s: s.isdigit(), ['1', 'a', '22']))?",
    "['1', '22']."
   ],
   [
    "m = map(abs, [-1, -2]); sum(m); what is list(m)?",
    "[], because sum() consumed the iterator."
   ]
  ]
 },
 {
  "t": "Closures: inner functions that remember variables from an enclosing scope, and late binding",
  "body": [
   "Python lets you define a function inside another function. The inner function can read variables of the outer function, because name lookup follows the LEGB rule: Local, then Enclosing function scopes, then Global, then Built-in. A closure is created when the outer function returns the inner function and the inner one still uses variables from the outer scope. Even though the outer function has finished, the returned function keeps those variables alive and can use them whenever it is called.",
   "```python\ndef make_multiplier(factor):\n    def multiply(x):\n        return x * factor      # factor comes from the enclosing scope\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5), triple(5))    # 10 15\n```",
   "Each call to `make_multiplier` creates a new `factor` variable and a new inner function bound to it, so `double` and `triple` remember different values. Notice that `make_multiplier` returns `multiply`, the function object, without parentheses. Returning `multiply()` would call it immediately instead. Closures are a lightweight way to create configured functions, and they underlie decorators and callbacks.",
   "An inner function can read enclosing variables freely, but assigning to one would normally create a new local variable instead. To rebind the enclosing variable, declare it with `nonlocal`. This lets a closure keep private state between calls.",
   "```python\ndef counter():\n    count = 0\n    def step():\n        nonlocal count\n        count += 1\n        return count\n    return step\n\nc = counter()\nprint(c(), c(), c())   # 1 2 3\n```",
   "Without `nonlocal`, `count += 1` would raise UnboundLocalError, because the assignment makes `count` local to `step` and it is read before being assigned.",
   "Closures capture variables, not values. The enclosing variable is looked up when the inner function runs, not when it is defined. This is called late binding, and it produces a famous surprise with loops: `funcs = [lambda: i for i in range(3)]` creates three functions that all refer to the same variable `i`. By the time you call them the loop has finished and `i` is 2, so `[f() for f in funcs]` gives `[2, 2, 2]`, not `[0, 1, 2]`.",
   "The usual fix is to capture the current value as a default argument, because defaults are evaluated when the function is defined: `[lambda i=i: i for i in range(3)]` gives `[0, 1, 2]`. Another is to create each function through a factory like `make_multiplier`, so each gets its own enclosing variable. When an exam question builds functions in a loop and calls them later, check for late binding first."
  ],
  "terms": [
   [
    "Closure",
    "An inner function that retains access to variables from the enclosing function's scope after it returns."
   ],
   [
    "Enclosing scope",
    "The local scope of an outer function, visible to functions nested inside it."
   ],
   [
    "nonlocal",
    "Declaration that lets an inner function rebind a variable of the enclosing function."
   ],
   [
    "Late binding",
    "Looking up a closure's free variables when it is called, not when it is created."
   ]
  ],
  "example": "A GUI builds a row of buttons in a loop, attaching lambda: select(i) to each. Every button selects the last item until the developer changes it to lambda i=i: select(i), capturing each index at creation time.",
  "tip": "Closures remember variables, not snapshots of values. Functions created in a loop all see the loop variable's final value unless you bind it with a default argument.",
  "check": [
   [
    "What does [f() for f in [lambda: n * 2 for n in range(3)]] return?",
    "[4, 4, 4], because every lambda reads n after the loop has ended with n = 2."
   ],
   [
    "Why does count += 1 inside an inner function fail without nonlocal?",
    "The assignment makes count local to the inner function, so reading it first raises UnboundLocalError."
   ]
  ]
 },
 {
  "t": "Generators: yield, next(), and StopIteration",
  "body": [
   "A generator is a function that produces a sequence of values one at a time instead of computing them all at once and returning a list. You write it like an ordinary function but use `yield` instead of (or as well as) `return`. The presence of `yield` anywhere in the body turns the function into a generator function: calling it does not run its body; it returns a generator object that will run the body step by step on demand.",
   "Each time you ask the generator for a value with `next(gen)`, it runs from where it last stopped until it reaches a `yield`, hands that value back, and pauses, keeping all its local variables intact. The next request resumes right after that `yield`. When the function body finishes, either by reaching the end or by executing `return`, the generator raises StopIteration to signal that there are no more values. Every later `next()` call raises StopIteration again.",
   "```python\ndef countdown(n):\n    print('start')\n    while n > 0:\n        yield n\n        n -= 1\n\ng = countdown(3)       # nothing printed yet\nprint(next(g))         # start, then 3\nprint(next(g))         # 2\nprint(next(g))         # 1\n# next(g)              # StopIteration\n```",
   "In everyday code you rarely call `next()` yourself. A `for` loop calls it automatically and treats StopIteration as the normal end of the loop, so `for x in countdown(3): print(x)` prints 3, 2, 1 with no error. Functions that consume iterables, such as `list()`, `sum()` and `sorted()`, work the same way: `list(countdown(3))` is `[3, 2, 1]`.",
   "Generators are iterators, so, like map and filter objects, they are one-shot. After a generator is exhausted, looping over it again produces nothing; call the generator function again to get a fresh one. `next()` also accepts a default, `next(g, None)`, which is returned instead of raising StopIteration when the generator is finished.",
   "Why use them? A generator uses memory for only one value at a time, so it can represent huge or even infinite sequences, such as every line of a very large file or an endless stream of IDs. It also starts producing results immediately rather than after computing everything. A generator expression gives the same benefit in one line: `(x * x for x in range(10**6))` looks like a list comprehension with parentheses but produces values lazily; `sum(x * x for x in range(10))` needs no extra brackets.",
   "Two details to remember. A `return value` inside a generator ends it; the value is not produced by `next()` but attached to the StopIteration exception. And generator objects are distinct from lists: they have no `len()` and cannot be indexed."
  ],
  "terms": [
   [
    "Generator function",
    "A function containing yield; calling it returns a generator object."
   ],
   [
    "yield",
    "Produces a value and pauses the generator, preserving its state until the next request."
   ],
   [
    "next()",
    "Built-in that asks an iterator for its next value."
   ],
   [
    "StopIteration",
    "Exception raised when an iterator has no more values; for loops handle it automatically."
   ]
  ],
  "example": "A log analyser defines def errors(path) that opens a file and yields only lines containing ERROR. It can scan a multi-gigabyte log with a for loop while holding just one line in memory at a time.",
  "tip": "Calling a generator function runs none of its body until the first next(). After the last yield, next() raises StopIteration, which for loops absorb silently.",
  "check": [
   [
    "def g(): yield 1; yield 2. What does list(g()) return, and what does a third next() on one generator do?",
    "[1, 2]; a third next() on the same generator raises StopIteration."
   ],
   [
    "How does (x for x in range(3)) differ from [x for x in range(3)]?",
    "The first is a lazy, one-shot generator; the second builds a complete list immediately."
   ]
  ]
 },
 {
  "t": "File I/O: open() modes (r, w, a, x, b, t, +), text versus binary",
  "body": [
   "To work with a file, you first open it with `open(filename, mode)`, which returns a stream object for reading and writing. The mode string says what you intend to do, and each mode has precise consequences for existing files, which the exam tests directly.",
   "The main mode letters are these. `'r'` opens for reading and is the default if you give no mode; the file must exist, otherwise FileNotFoundError is raised. `'w'` opens for writing; it creates the file if it does not exist and truncates it to empty if it does, so all previous content is lost immediately on opening. `'a'` opens for appending; it creates the file if needed, keeps existing content, and every write goes to the end. `'x'` opens for exclusive creation; it creates a new file for writing but raises FileExistsError if the file already exists, which protects you from overwriting something by accident.",
   "A plus sign adds the other direction. `'r+'` opens an existing file for both reading and writing without truncating it (it still fails if the file is missing). `'w+'` creates or truncates, then allows reading and writing. `'a+'` allows reading as well as appending. The plus never changes whether the file is created or truncated; that is decided by the letter it modifies.",
   "The letters `'t'` and `'b'` choose text or binary mode and are combined with the others, as in `'rb'` or `'wt'`. Text mode (`'t'`) is the default. In text mode, reading returns `str` objects: Python decodes the bytes using an encoding (you can pass `encoding='utf-8'`; otherwise a platform default is used), and it translates line endings so that Windows `\\r\\n` or old-style `\\r` become `\\n` when reading, and `\\n` becomes the platform's line ending when writing. In binary mode (`'b'`), nothing is translated: reading returns `bytes`, writing requires `bytes` or `bytearray`, and you get exactly what is on disk. Use binary for images, audio, archives and any non-text data.",
   "```python\nwith open('notes.txt', 'w', encoding='utf-8') as f:\n    f.write('line 1\\n')\nwith open('notes.txt', 'a', encoding='utf-8') as f:\n    f.write('line 2\\n')\nwith open('notes.txt') as f:             # 'r' and 't' by default\n    print(f.read())                       # line 1, line 2\nwith open('notes.txt', 'rb') as f:\n    print(f.read())                       # raw bytes, e.g. b'line 1\\nline 2\\n'\n```",
   "Mixing types across modes causes errors: writing a `str` to a file opened with `'wb'` raises TypeError, as does writing `bytes` in text mode. Opening a directory, or a file you lack permission for, raises OSError subclasses such as IsADirectoryError or PermissionError, which the errno lesson covers.",
   "When predicting outcomes, ask three questions for any mode: does the file have to exist, is existing content erased, and does reading or writing produce `str` or `bytes`? Those answers settle almost every open() question."
  ],
  "terms": [
   [
    "'w' mode",
    "Write mode: creates the file or truncates an existing one to zero length."
   ],
   [
    "'x' mode",
    "Exclusive creation: creates a new file and fails with FileExistsError if it exists."
   ],
   [
    "Text mode",
    "Mode that decodes bytes to str using an encoding and translates line endings."
   ],
   [
    "Binary mode",
    "Mode ('b') that reads and writes raw bytes with no decoding or translation."
   ]
  ],
  "example": "A script that saves daily results opens its log with 'a' so each run adds a line, while a report generator opens its output with 'x' so it can never overwrite last month's report by mistake.",
  "tip": "'w' erases existing content the moment the file is opened, 'a' preserves it, 'x' fails if the file exists and 'r' fails if it does not. Text mode gives str, binary mode gives bytes.",
  "check": [
   [
    "Which mode opens an existing file for reading and writing without erasing it?",
    "'r+'; 'w+' would truncate it."
   ],
   [
    "What type does f.read() return for a file opened with 'rb'?",
    "bytes."
   ],
   [
    "What happens with open('data.txt', 'x') if data.txt already exists?",
    "FileExistsError is raised and the file is left untouched."
   ]
  ]
 },
 {
  "t": "Stream handles and the predefined streams sys.stdin, sys.stdout, sys.stderr",
  "body": [
   "Python, like most languages, treats input and output sources as streams: sequences of data you read from or write to in order. A stream handle is the object your program holds to work with a stream. `open()` returns one, and all file operations (read, write, close) are methods called on it. The handle also keeps track of the current position in the file, which moves forward as you read or write.",
   "The exact class of the handle depends on the mode. Text-mode files give a text stream (in CPython, an `io.TextIOWrapper`), whose methods work with `str`. Binary files give a buffered binary stream such as `io.BufferedReader` or `io.BufferedWriter`, whose methods work with `bytes`. You do not need to memorize class names for PCAP, but you should know that text and binary handles are different kinds of object, which is why their methods accept different types.",
   "Three streams are opened automatically for every Python program, before any of your code runs, and are available in the `sys` module. `sys.stdin` is standard input, which by default reads from the keyboard; `input()` reads a line from it. `sys.stdout` is standard output, which by default goes to the screen; `print()` writes to it. `sys.stderr` is standard error, also shown on the screen by default but kept separate so that error messages and diagnostics are not mixed with normal output. Tracebacks from unhandled exceptions are written to `sys.stderr`.",
   "```python\nimport sys\nsys.stdout.write('normal output\\n')\nprint('also normal output')\nprint('something went wrong', file=sys.stderr)\nline = sys.stdin.readline()   # like input(), but keeps the trailing newline\n```",
   "Keeping stdout and stderr separate matters when output is redirected. If you run `python report.py > out.txt` in a terminal, only standard output goes into the file; error messages still appear on the screen, so the user sees them and the file is not polluted. Shells can redirect the three streams independently, and programs can be chained with pipes where one program's stdout becomes the next one's stdin.",
   "Because these are ordinary text streams, they support the same methods as file handles: `sys.stdout.write()`, `sys.stdin.read()` and so on. Note that `write()` does not add a newline, unlike `print()`, and that it returns the number of characters written, which the interactive prompt echoes. You should not close these predefined streams yourself; Python manages them. The `file=` argument of `print()` accepts any writable text stream, so you can send the same print call to the screen, to stderr or to an open file."
  ],
  "terms": [
   [
    "Stream",
    "An ordered flow of data that a program reads from or writes to."
   ],
   [
    "Stream handle",
    "The object returned by open() (or provided by sys) through which a stream is used."
   ],
   [
    "sys.stdout",
    "Standard output, the default destination of print()."
   ],
   [
    "sys.stderr",
    "Standard error, a separate output stream for error messages and diagnostics."
   ]
  ],
  "example": "A command-line tool prints its CSV results to stdout and its progress messages to stderr. A user runs it with output redirected to results.csv and still sees progress on screen, while the file contains only clean data.",
  "tip": "print() writes to sys.stdout by default and input() reads from sys.stdin; sys.stderr is separate so errors survive redirection of normal output. All three are open before your program starts.",
  "check": [
   [
    "How do you make print() send a message to standard error?",
    "print('message', file=sys.stderr), after importing sys."
   ],
   [
    "Do you need to call open() before using sys.stdin?",
    "No. sys.stdin, sys.stdout and sys.stderr are opened automatically when the program starts."
   ]
  ]
 },
 {
  "t": "read(), readline(), readlines(), write(), readinto() with bytearray, close() and with",
  "body": [
   "Once a file is open, its handle offers methods for moving data in and out. Each reads or writes from the current position and moves it forward, so successive calls continue where the previous one stopped.",
   "`read()` with no argument reads everything from the current position to the end and returns it as one string (text mode) or bytes object (binary mode). `read(n)` reads at most n characters or bytes. At end of file, `read()` returns an empty string or empty bytes, which is how you detect that nothing is left. `readline()` reads one line including its trailing newline, `'\\n'`, and returns an empty string at end of file; a blank line in the middle of a file comes back as `'\\n'`, not as an empty string. `readlines()` reads all remaining lines and returns them as a list of strings, each still ending with its newline. The handle is also iterable: `for line in f:` reads one line at a time, which is memory-efficient for large files.",
   "```python\nwith open('data.txt', 'w') as f:\n    n = f.write('alpha\\nbeta\\n')\n    print(n)                   # 11 characters written\n\nwith open('data.txt') as f:\n    print(repr(f.readline()))  # 'alpha\\n'\n    print(f.readlines())       # ['beta\\n']\n    print(repr(f.read()))      # '' - nothing left\n```",
   "`write(s)` writes a string (text mode) or bytes (binary mode) and returns the number of characters or bytes written. It does not add a newline; include `'\\n'` yourself. `writelines(list_of_strings)` writes several strings, also without adding newlines.",
   "`readinto(buffer)` is for binary files. Instead of creating a new bytes object, it fills an existing, mutable `bytearray` with data from the file and returns the number of bytes read, which can be fewer than the buffer size near the end of the file, and 0 at the end. Reusing one buffer avoids allocating new objects in loops over large binary files. It does not work with immutable `bytes` or on text-mode handles.",
   "```python\ndata = bytearray(10)          # 10 zero bytes\nwith open('image.bin', 'rb') as f:\n    count = f.readinto(data)\nprint(count, data[:count])\n```",
   "`close()` finishes with a file: it flushes any buffered writes to disk and releases the operating system resource. Forgetting to close a file you wrote to can leave data unwritten if the program crashes, and using a handle after closing raises ValueError. The `with` statement solves this: `with open(...) as f:` closes the file automatically when the block ends, even if an exception occurs inside it, which is why every example here uses it. It is equivalent to a try/finally that calls `f.close()`. You can check the state with the `f.closed` attribute."
  ],
  "terms": [
   [
    "readline()",
    "Reads one line including its newline; returns an empty string at end of file."
   ],
   [
    "readlines()",
    "Returns a list of all remaining lines, each keeping its newline."
   ],
   [
    "readinto()",
    "Fills an existing bytearray from a binary file and returns the number of bytes read."
   ],
   [
    "with statement",
    "A context manager block that closes the file automatically when it ends."
   ]
  ],
  "example": "A backup tool copies large binary files by allocating one bytearray of 64 KB and repeatedly calling readinto() on the source, writing data[:count] to the destination until readinto() returns 0.",
  "tip": "End of file is signalled by an empty result ('' or b''), not an exception. write() never adds newlines, and readinto() needs a bytearray and a binary-mode file.",
  "check": [
   [
    "What does readline() return for an empty line in the middle of a file?",
    "'\\n', a string containing just the newline; only end of file returns ''."
   ],
   [
    "Why is with open(...) as f: preferred over calling close() manually?",
    "It guarantees the file is closed when the block exits, even if an exception is raised."
   ]
  ]
 },
 {
  "t": "errno values (for example ENOENT, EACCES) on I/O errors",
  "body": [
   "Input and output can fail for many reasons outside your program's control: the file does not exist, you lack permission, the disk is full. When an operating system call fails, Python raises `OSError` (or one of its subclasses), and the exception carries the operating system's error code in its `errno` attribute. Checking that code lets you respond precisely to what went wrong.",
   "The codes are integers, but their numeric values can differ between operating systems, so you should never compare against raw numbers. Instead, the `errno` module provides named constants. The ones PCAP expects you to recognize include `errno.ENOENT` (no such file or directory), `errno.EACCES` (permission denied), `errno.EEXIST` (file exists), `errno.EISDIR` (is a directory), `errno.EBADF` (bad file descriptor, for example using an invalid handle), `errno.EMFILE` (too many open files), `errno.ENOSPC` (no space left on device) and `errno.EFBIG` (file too large).",
   "```python\nimport errno\n\ntry:\n    with open('missing.txt') as f:\n        data = f.read()\nexcept OSError as e:\n    if e.errno == errno.ENOENT:\n        print('The file does not exist')\n    elif e.errno == errno.EACCES:\n        print('You do not have permission to read it')\n    else:\n        print('Other I/O error:', e.strerror)\n```",
   "Besides `errno`, an OSError provides `strerror`, the human-readable message for the code, and often `filename`. To turn any code into its message yourself, call `os.strerror(code)`, for example `os.strerror(errno.ENOENT)`. Printing the exception object shows all of this together, typically in the form `[Errno N] message: 'filename'`.",
   "Modern Python also maps common codes to specific subclasses of OSError, which you can catch directly: `FileNotFoundError` corresponds to ENOENT, `PermissionError` to EACCES (and EPERM), `FileExistsError` to EEXIST, and `IsADirectoryError` to EISDIR. So `except FileNotFoundError:` is a readable alternative to checking `e.errno == errno.ENOENT`. Both styles appear in exam questions, and both are correct; the errno check is useful when you want one handler for several codes or a code without its own subclass.",
   "From a defensive point of view, these errors are expected events, not rare disasters. A robust program checks for them where files are opened and gives the user a clear message instead of a traceback. It should also avoid leaking sensitive details, such as full internal paths, in messages shown to untrusted users, while still logging enough to diagnose problems. Handling ENOENT and EACCES explicitly is the typical minimum for any program that opens files named by a user."
  ],
  "terms": [
   [
    "errno attribute",
    "The operating system error code stored on an OSError instance."
   ],
   [
    "errno module",
    "Standard module defining named constants such as ENOENT and EACCES for error codes."
   ],
   [
    "ENOENT",
    "Error code meaning no such file or directory; matches FileNotFoundError."
   ],
   [
    "EACCES",
    "Error code meaning permission denied; matches PermissionError."
   ]
  ],
  "example": "A photo importer loops over user-selected files. When a file has been deleted it catches OSError with errno ENOENT and skips it with a note, and when a file is locked by permissions (EACCES) it tells the user which one needs its permissions fixed.",
  "tip": "Compare e.errno with errno module constants, never with raw numbers. ENOENT pairs with FileNotFoundError and EACCES with PermissionError, both subclasses of OSError.",
  "check": [
   [
    "Which errno constant indicates that a file you tried to open does not exist?",
    "errno.ENOENT."
   ],
   [
    "How can you get a readable message for an error code?",
    "Use the exception's strerror attribute, or call os.strerror(code)."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
