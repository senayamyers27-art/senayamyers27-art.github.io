CertHub.addPbqs("pcap", [
  {
    id: "import-binds", d: 1, type: "match",
    title: "Match each import statement to the name it binds",
    prompt: "For each import form, match it to the single name it adds to your namespace.",
    pairs: [
      ["import math", "math"],
      ["import math as m", "m"],
      ["from math import pi", "pi"],
      ["from math import sqrt as root", "root"]
    ],
    extra: ["sqrt", "math.pi"],
    explain: "Plain `import math` binds only the module name math, so you call math.pi. `import math as m` binds only the alias m; the name math is undefined. `from math import pi` binds pi directly (not math), and the `as` clause in `from math import sqrt as root` binds only root, so neither sqrt nor math is available. Referencing an unbound name such as sqrt raises NameError."
  },
  {
    id: "exc-parents", d: 2, type: "match",
    title: "Match each exception to its direct parent class",
    prompt: "Match each built-in exception to the class it inherits from directly.",
    pairs: [
      ["ZeroDivisionError", "ArithmeticError"],
      ["KeyError", "LookupError"],
      ["FileNotFoundError", "OSError"],
      ["AssertionError", "Exception"]
    ],
    extra: ["BaseException", "ValueError"],
    explain: "ZeroDivisionError (with OverflowError and FloatingPointError) derives from ArithmeticError, while IndexError and KeyError derive from LookupError. FileNotFoundError is one of the OSError subclasses, and AssertionError sits directly under Exception. BaseException is above Exception and is reserved for system-exiting exceptions like KeyboardInterrupt, so ordinary code should not inherit from it."
  },
  {
    id: "try-flow-select", d: 2, type: "select",
    title: "Reason about try/except/else/finally",
    prompt: "Given the function below, select every statement that is TRUE.",
    context: "def process(data):\n    try:\n        value = int(data['count'])\n        result = 100 / value\n    except (KeyError, ValueError) as e:\n        print('input error:', type(e).__name__)\n        return None\n    except ZeroDivisionError:\n        print('cannot divide by zero')\n        return None\n    else:\n        print('ok')\n        return result\n    finally:\n        print('done')",
    options: [
      "process({'count': '0'}) prints 'cannot divide by zero'.",
      "process({'count': '0'}) prints 'ok' before it returns.",
      "process({'count': '0'}) prints 'done'.",
      "process({'count': 'x'}) is handled by the (KeyError, ValueError) branch.",
      "process({}) lets a KeyError propagate uncaught to the caller.",
      "The else branch runs every time the finally branch runs."
    ],
    answers: [0, 2, 3],
    explain: "With count '0', int() succeeds but 100/0 raises ZeroDivisionError, so that branch prints its message; the else branch is skipped whenever an exception occurs, but finally always runs, so 'done' is printed. With count 'x', int('x') raises ValueError, which the tuple branch catches. An empty dict makes data['count'] raise KeyError, which the same tuple branch catches, so nothing propagates. else runs only on a clean try, unlike finally."
  },
  {
    id: "str-slice-fill", d: 3, type: "fill",
    title: "Slice and inspect a string",
    prompt: "The variable s is set to 'Certification' (indices 0 through 12). Fill in each result exactly as Python would print it.",
    fields: [
      { label: "s[0:4]", answers: ["Cert"] },
      { label: "s[-4:]", answers: ["tion"] },
      { label: "s[3]", answers: ["t"] },
      { label: "s.count('i')", answers: ["3"] }
    ],
    explain: "s[0:4] takes indices 0..3, giving 'Cert' (the stop index is excluded). s[-4:] starts four characters from the end, giving 'tion'. s[3] is the single character 't'. The letter 'i' appears at indices 4, 6 and 10, so s.count('i') returns 3."
  },
  {
    id: "str-tests-select", d: 3, type: "select",
    title: "Predict string test-method results",
    prompt: "Select every expression that evaluates to True.",
    options: [
      "'Hello'.isalpha()",
      "'Hello123'.isalnum()",
      "'   '.isspace()",
      "'Hello'.isupper()",
      "'123'.isdigit()",
      "'12.5'.isdigit()",
      "'Hello world'.isalpha()"
    ],
    answers: [0, 1, 2, 4],
    explain: "isalpha() is True only when every character is a letter, so 'Hello' passes but 'Hello world' fails because of the space. isalnum() allows letters and digits, so 'Hello123' passes. '   '.isspace() is True for whitespace-only text. isupper() checks that cased letters are all uppercase, and 'Hello' has lowercase letters, so it is False. isdigit() is True for '123' but False for '12.5' because '.' is not a digit."
  },
  {
    id: "mro-order", d: 4, type: "order",
    title: "Order the classes in a diamond MRO",
    prompt: "A diamond hierarchy is defined as: class A, class B(A), class C(A), class D(B, C). Put the classes in the exact order that Python's C3 linearization (D.__mro__) visits them.",
    steps: ["D", "B", "C", "A", "object"],
    explain: "C3 linearization starts with the class itself, then follows the base list left to right, but it never places a class before any of its subclasses. So D comes first, then B (listed first), then C, then their shared parent A, and finally object. A common wrong guess is depth-first order D, B, A, C, which would visit A before C and is not what Python uses."
  },
  {
    id: "introspect-match", d: 4, type: "match",
    title: "Match introspection expressions to results",
    prompt: "Given `class Dog:` with a class variable `species = 'canine'` and `def __init__(self, name): self.name = name`, and `d = Dog('Rex')`, match each expression to its result.",
    pairs: [
      ["type(d).__name__", "Dog"],
      ["Dog.__bases__[0].__name__", "object"],
      ["'name' in d.__dict__", "True"],
      ["'species' in d.__dict__", "False"]
    ],
    extra: ["'canine'", "None"],
    explain: "type(d) is the class Dog, whose __name__ is the string 'Dog'. Dog has no explicit base, so __bases__ is (object,) and its name is 'object'. An instance's __dict__ holds only its own instance variables, so 'name' is present but 'species' is not, because species lives in the class __dict__, not the instance __dict__."
  },
  {
    id: "mangling-fill", d: 4, type: "fill",
    title: "Class variables and name mangling",
    prompt: "Given the class below, followed by `a = Counter()` and `b = Counter()`, fill in each value.",
    context: "class Counter:\n    total = 0\n    def __init__(self):\n        self.__n = 0\n        Counter.total += 1",
    fields: [
      { label: "Counter.total after both objects are created", answers: ["2"] },
      { label: "The mangled attribute name that stores a's __n", answers: ["_Counter__n"] },
      { label: "Result of hasattr(a, '__n')", answers: ["False"] }
    ],
    explain: "total is a class variable and each __init__ runs Counter.total += 1, so after two objects it is 2. A double-underscore name like __n is mangled to _ClassName__n, here _Counter__n, so the value is reachable under that name. Because no attribute literally named __n exists on the object, hasattr(a, '__n') returns False."
  },
  {
    id: "functional-fill", d: 5, type: "fill",
    title: "Comprehensions, map and filter",
    prompt: "Fill in the value each expression produces, written exactly as Python would print it.",
    fields: [
      { label: "[x * x for x in range(4) if x % 2]", answers: ["[1, 9]", "[1,9]"] },
      { label: "list(map(lambda x: x + 1, [0, 1, 2]))", answers: ["[1, 2, 3]", "[1,2,3]"] },
      { label: "list(filter(lambda x: x > 1, [0, 1, 2, 3]))", answers: ["[2, 3]", "[2,3]"] }
    ],
    explain: "The comprehension keeps only odd x (1 and 3, since x % 2 is truthy) and squares them, giving [1, 9]. map applies the lambda to each element, adding 1 to produce [1, 2, 3]. filter keeps the elements for which the predicate is true (values greater than 1), giving [2, 3]; it returns the items themselves, not booleans."
  },
  {
    id: "open-modes-match", d: 5, type: "match",
    title: "Match file open() modes to their behavior",
    prompt: "Match each single-character open() mode to what it does when the file is opened.",
    pairs: [
      ["'r'", "read only; error if the file does not exist"],
      ["'w'", "truncate to empty (or create), then write"],
      ["'a'", "append to the end, creating the file if needed"],
      ["'x'", "create a new file; error if it already exists"]
    ],
    extra: ["read and write starting at the beginning without truncating"],
    explain: "'r' opens an existing file for reading and raises FileNotFoundError if it is missing. 'w' always empties the file (or creates it) before writing, discarding earlier content. 'a' preserves existing content and writes at the end. 'x' is exclusive creation and raises FileExistsError if the file already exists. The extra option describes 'r+', which is a different mode."
  }
]);
