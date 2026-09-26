/* Hands-on exercises for PCAP – Certified Associate Python Programmer (PCAP-31-03). Checked by tools/check-data.js (and tools/check-python.js for Python). */
CertHub.addHandson("pcap", {
  tables: {},
  items: [
    {
      id: "pcap-math-rounding",
      kind: "code",
      d: 1,
      title: "Floor, ceil and trunc from math",
      prompt: "Import the `math` module and write `round_three(x)` that returns a tuple `(math.floor(x), math.ceil(x), math.trunc(x))`.\n\nFor `2.5` the result is `(2, 3, 2)` and for `-2.5` it is `(-3, -2, -2)`. The starter uses `int()` everywhere, which only gets some of these right.",
      hint: "floor always goes down, ceil always goes up, and trunc just drops the fraction. The difference shows up with negative numbers.",
      starter: `def round_three(x):
    return (int(x), int(x) + 1, int(x))
`,
      solution: `import math

def round_three(x):
    return (math.floor(x), math.ceil(x), math.trunc(x))
`,
      tests: [
        { name: "positive number", code: `assert round_three(2.5) == (2, 3, 2), "round_three(2.5) should be (2, 3, 2)"` },
        { name: "negative number", code: `assert round_three(-2.5) == (-3, -2, -2), "round_three(-2.5) should be (-3, -2, -2)"` },
        { name: "whole number stays the same", code: `assert round_three(4.0) == (4, 4, 4), "round_three(4.0) should be (4, 4, 4)"` }
      ],
      explain: "math.floor() rounds toward minus infinity, math.ceil() toward plus infinity and math.trunc() toward zero, which is also what int() does. They only differ for negative numbers and for whole numbers, and PCAP questions usually pick exactly those cases. The exam also expects you to know that these functions live in the math module and must be imported."
    },
    {
      id: "pcap-seeded-dice",
      kind: "code",
      d: 1,
      title: "Reproducible dice with random.seed()",
      prompt: "Write `roll_dice(n, seed)` that uses the `random` module to return a list of `n` dice rolls, each an int from 1 to 6. Calling it twice with the same seed must give exactly the same list, so tests and demos are repeatable.\n\nCall `random.seed()` with the given seed before rolling.",
      hint: "Seed the generator first, then use a function that returns whole numbers with both ends included, or pick from a range with choice().",
      starter: `import random

def roll_dice(n, seed):
    pass
`,
      solution: `import random

def roll_dice(n, seed):
    random.seed(seed)
    return [random.randint(1, 6) for _ in range(n)]
`,
      tests: [
        { name: "returns n rolls between 1 and 6", code: `r = roll_dice(20, 1)
assert isinstance(r, list) and len(r) == 20, "roll_dice(20, 1) should return a list of 20 rolls"
assert all(1 <= x <= 6 for x in r), "every roll should be between 1 and 6"` },
        { name: "same seed gives the same rolls", code: `assert roll_dice(10, 42) == roll_dice(10, 42), "the same seed should repeat the same rolls"` },
        { name: "zero rolls gives an empty list", code: `assert roll_dice(0, 3) == [], "roll_dice(0, 3) should be []"` }
      ],
      explain: "The random module produces pseudo-random numbers from an internal state. random.seed(value) sets that state, so the same seed always produces the same sequence, which is why seeding appears on the PCAP syllabus. randint(a, b) includes both ends, while random() returns a float from 0.0 up to but not including 1.0."
    },
    {
      id: "pcap-custom-exception",
      kind: "code",
      d: 2,
      title: "Define and raise your own exception",
      prompt: "Create an exception class `InsufficientFunds` that inherits from `Exception`. Its constructor takes `needed` (the missing amount), stores it as `self.needed`, and passes a message to the parent class.\n\nThen write `withdraw(balance, amount)` that returns the new balance, or raises `InsufficientFunds` with `needed` set to `amount - balance` when the balance is too small.",
      hint: "Call super().__init__() with a message so that args is filled in, then add your own attribute.",
      starter: `class InsufficientFunds:
    pass

def withdraw(balance, amount):
    return balance - amount
`,
      solution: `class InsufficientFunds(Exception):
    def __init__(self, needed):
        super().__init__(f"short by {needed}")
        self.needed = needed

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds(amount - balance)
    return balance - amount
`,
      tests: [
        { name: "normal withdrawal works", code: `assert withdraw(100, 30) == 70, "withdraw(100, 30) should be 70"` },
        { name: "overdraw raises InsufficientFunds with needed", code: `try:
    withdraw(50, 80)
except InsufficientFunds as e:
    assert e.needed == 30, "needed should be 80 - 50 = 30"
    assert len(e.args) == 1, "pass a message to the parent constructor so args is set"
else:
    raise AssertionError("withdraw(50, 80) should raise InsufficientFunds")` },
        { name: "it is a real Exception subclass", code: `assert issubclass(InsufficientFunds, Exception), "InsufficientFunds should inherit from Exception"` }
      ],
      explain: "Only classes derived from BaseException can be raised, and user exceptions should derive from Exception so that except Exception still catches them. Calling super().__init__() fills the args tuple, and extra attributes such as needed give handlers useful detail. PCAP section 2.2 covers defining your own exceptions and adding attributes to them."
    },
    {
      id: "pcap-convert-errors",
      kind: "code",
      d: 2,
      title: "Catch two exceptions in one branch",
      prompt: "Write `convert_all(items)` that tries `int(item)` on every element. It returns a tuple `(numbers, errors)`: `numbers` holds the values that converted, in order, and `errors` holds the class name of each exception that happened, such as `\"ValueError\"`.\n\n`convert_all([\"1\", \"x\", None, \"4\"])` returns `([1, 4], [\"ValueError\", \"TypeError\"])`. Handle both exceptions in a single `except` branch using `as`, and put the successful append in an `else` branch.",
      hint: "except (A, B) as e catches either one. type(e).__name__ gives the class name as a string.",
      starter: `def convert_all(items):
    numbers, errors = [], []
    for item in items:
        try:
            value = int(item)
        except ValueError as e:
            errors.append(str(e))
        else:
            numbers.append(value)
    return numbers, errors
`,
      solution: `def convert_all(items):
    numbers, errors = [], []
    for item in items:
        try:
            value = int(item)
        except (ValueError, TypeError) as e:
            errors.append(type(e).__name__)
        else:
            numbers.append(value)
    return numbers, errors
`,
      tests: [
        { name: "mixed input", code: `assert convert_all(["1", "x", None, "4"]) == ([1, 4], ["ValueError", "TypeError"]), "expected ([1, 4], ['ValueError', 'TypeError'])"` },
        { name: "all good input", code: `assert convert_all(["7", " 8 "]) == ([7, 8], []), "int() accepts surrounding spaces"` },
        { name: "unsupported type is recorded", code: `assert convert_all([[1]]) == ([], ["TypeError"]), "a list cannot be converted with int()"` }
      ],
      explain: "int('x') raises ValueError because the type is right but the value is not, while int(None) raises TypeError because the type is wrong. A tuple in the except clause catches either, and as e binds the exception object. The else branch runs only when the try block raised nothing. PCAP tests the order and meaning of try, except, else and finally."
    },
    {
      id: "pcap-caesar",
      kind: "code",
      d: 3,
      title: "Caesar cipher with ord() and chr()",
      prompt: "Write `caesar(text, shift)` that shifts every letter by `shift` places in the alphabet, wrapping from z back to a, keeping upper case as upper and lower case as lower. Anything that is not an ASCII letter stays unchanged.\n\n`caesar(\"Hello, World\", 3)` returns `\"Khoor, Zruog\"`, and a negative shift decodes.",
      hint: "Turn the letter into a position 0 to 25 by subtracting the code point of 'a' or 'A', shift it with %, then add the base back.",
      starter: `def caesar(text, shift):
    out = ""
    for ch in text:
        out += chr(ord(ch) + shift)
    return out
`,
      solution: `def caesar(text, shift):
    out = []
    for ch in text:
        if "a" <= ch <= "z":
            base = ord("a")
        elif "A" <= ch <= "Z":
            base = ord("A")
        else:
            out.append(ch)
            continue
        out.append(chr((ord(ch) - base + shift) % 26 + base))
    return "".join(out)
`,
      tests: [
        { name: "encodes and keeps punctuation", code: `assert caesar("Hello, World", 3) == "Khoor, Zruog", "caesar('Hello, World', 3) should be 'Khoor, Zruog'"` },
        { name: "wraps around the alphabet", code: `assert caesar("xyz XYZ", 3) == "abc ABC", "x, y and z should wrap to a, b and c"` },
        { name: "negative shift decodes", code: `assert caesar(caesar("Python 3.12", 11), -11) == "Python 3.12", "shifting back should restore the text"` }
      ],
      explain: "ord() returns a character's Unicode code point and chr() turns a code point back into a character. Subtracting the base letter maps a to z onto 0 to 25, and % 26 wraps the shift in both directions, even for negative numbers. PCAP section 3 covers code points, ASCII versus Unicode and these two functions."
    },
    {
      id: "pcap-find-all",
      kind: "code",
      d: 3,
      title: "Find every occurrence with find()",
      prompt: "Write `find_all(text, sub)` that returns a list of every index where `sub` starts in `text`, including overlapping matches. `find_all(\"banana\", \"ana\")` returns `[1, 3]` and a missing substring returns `[]`.\n\nUse `str.find()` with its start argument. The starter uses `index()`, which behaves differently when nothing is found.",
      hint: "find() returns -1 when it fails; index() raises an exception. Start the next search one position after the last match.",
      starter: `def find_all(text, sub):
    found = []
    pos = text.index(sub)
    while pos != -1:
        found.append(pos)
        pos = text.index(sub, pos + 1)
    return found
`,
      solution: `def find_all(text, sub):
    found = []
    pos = text.find(sub)
    while pos != -1:
        found.append(pos)
        pos = text.find(sub, pos + 1)
    return found
`,
      tests: [
        { name: "overlapping matches", code: `assert find_all("banana", "ana") == [1, 3], "find_all('banana', 'ana') should be [1, 3]"` },
        { name: "missing substring gives an empty list", code: `assert find_all("banana", "x") == [], "no match should give []"` },
        { name: "several single-character matches", code: `assert find_all("a-b-c", "-") == [1, 3], "find_all('a-b-c', '-') should be [1, 3]"` }
      ],
      explain: "str.find() returns the lowest index of the substring from an optional start position, or -1 when there is none. str.index() does the same search but raises ValueError when nothing is found, so the loop never sees -1. PCAP asks directly about the difference between find() and index(), and about rfind() which searches from the right."
    },
    {
      id: "pcap-username-rules",
      kind: "code",
      d: 3,
      title: "Validate a username with character tests",
      prompt: "Write `valid_username(name)` that returns `True` only if all of these hold:\n\nIt is 3 to 12 characters long.\n\nThe first character is a letter.\n\nEvery character is a letter, a digit or an underscore.\n\n`valid_username(\"alex_99\")` is `True`, while `\"9lives\"`, `\"ab\"` and `\"bad name\"` are all `False`.",
      hint: "isalpha() and isalnum() test characters. Check the empty and short cases before you look at name[0].",
      starter: `def valid_username(name):
    return name.isalnum()
`,
      solution: `def valid_username(name):
    if not 3 <= len(name) <= 12:
        return False
    if not name[0].isalpha():
        return False
    return all(ch.isalnum() or ch == "_" for ch in name)
`,
      tests: [
        { name: "accepts a good name with an underscore", code: `assert valid_username("alex_99") is True, "'alex_99' is valid"` },
        { name: "rejects a leading digit or a space", code: `assert valid_username("9lives") is False, "must start with a letter"
assert valid_username("bad name") is False, "spaces are not allowed"` },
        { name: "checks the length limits", code: `assert valid_username("ab") is False, "too short"
assert valid_username("") is False, "empty is invalid"
assert valid_username("a" * 13) is False, "too long"` }
      ],
      explain: "isalnum() is False for the whole string as soon as one underscore appears, so each character has to be tested on its own and underscores allowed explicitly. isalpha() on the first character enforces the letter rule, and checking the length first avoids an IndexError on an empty string. The is-methods for strings are listed in PCAP section 3.3."
    },
    {
      id: "pcap-class-counter",
      kind: "code",
      d: 4,
      title: "Class variable versus instance variable",
      prompt: "Write a class `Ticket` whose constructor takes `owner`. The class keeps a class variable `issued` that counts how many tickets have been created, and each ticket gets its own instance variable `number` equal to the count at the moment it was made (the first ticket is 1).\n\nThe starter increments the counter through `self`, which quietly creates an instance variable instead.",
      hint: "Update the counter through the class name, then copy its value into the instance.",
      starter: `class Ticket:
    issued = 0

    def __init__(self, owner):
        self.owner = owner
        self.issued += 1
        self.number = self.issued
`,
      solution: `class Ticket:
    issued = 0

    def __init__(self, owner):
        self.owner = owner
        Ticket.issued += 1
        self.number = Ticket.issued
`,
      tests: [
        { name: "numbers go up for each ticket", code: `Ticket.issued = 0
a = Ticket("ana")
b = Ticket("ben")
assert (a.number, b.number) == (1, 2), "the first two tickets should be numbered 1 and 2"
assert Ticket.issued == 2, "the class variable should count 2 tickets"` },
        { name: "counter lives only in the class", code: `Ticket.issued = 0
t = Ticket("cy")
assert "issued" not in t.__dict__, "issued should not become an instance variable"
assert t.__dict__ == {"owner": "cy", "number": 1}, "instance __dict__ should hold only owner and number"` }
      ],
      explain: "Reading self.issued finds the class variable, but assigning to self.issued creates a new instance variable that hides it, so the shared count never changes. Assigning through Ticket.issued updates the one value all instances share. Inspecting __dict__ on the object and on the class shows exactly where each variable lives, which PCAP asks about often."
    },
    {
      id: "pcap-private-balance",
      kind: "code",
      d: 4,
      title: "Private attribute and name mangling",
      prompt: "Write a class `Account` that stores its balance in a private attribute named `__balance`, starting at 0. Give it:\n\n`deposit(amount)`, which adds a positive amount and raises `ValueError` for zero or negative amounts.\n\n`balance()`, which returns the current balance.\n\nCode outside the class should not be able to read `acct.__balance` directly.",
      hint: "Two leading underscores inside a class trigger name mangling. Check the amount before changing anything.",
      starter: `class Account:
    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
`,
      solution: `class Account:
    def __init__(self):
        self.__balance = 0

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.__balance += amount

    def balance(self):
        return self.__balance
`,
      tests: [
        { name: "deposits update the balance", code: `a = Account()
a.deposit(50)
a.deposit(25)
assert a.balance() == 75, "balance() should return 75"` },
        { name: "the attribute is name-mangled", code: `a = Account()
assert not hasattr(a, "__balance"), "__balance should not be reachable by that name"
assert hasattr(a, "_Account__balance"), "the mangled name _Account__balance should exist"` },
        { name: "bad deposits raise ValueError", code: `a = Account()
try:
    a.deposit(-5)
except ValueError:
    pass
else:
    raise AssertionError("deposit(-5) should raise ValueError")
assert a.balance() == 0, "a rejected deposit must not change the balance"` }
      ],
      explain: "Inside a class body, a name like __balance is rewritten to _Account__balance. That makes it hard to reach from outside by accident, though not impossible, so Python privacy is a convention backed by mangling rather than true access control. PCAP asks what the mangled name is, what __dict__ shows, and what hasattr() returns for each form."
    },
    {
      id: "pcap-shapes-super",
      kind: "code",
      d: 4,
      title: "Inheritance, super() and __str__",
      prompt: "A class `Rectangle` is given. Write `Square(Rectangle)` whose constructor takes one `side` and calls the parent constructor through `super()`. Then give `Rectangle` a `__str__()` method so that `str(Rectangle(2, 3))` is `\"Rectangle 2x3\"` and `str(Square(4))` is `\"Square 4x4\"`, using the class name rather than a hard-coded word.",
      hint: "type(self).__name__ gives the name of the actual class, even when the method is inherited.",
      starter: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class Square(Rectangle):
    def __init__(self, side):
        self.side = side
`,
      solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def __str__(self):
        return f"{type(self).__name__} {self.width}x{self.height}"


class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
`,
      tests: [
        { name: "Square gets width, height and area from Rectangle", code: `s = Square(4)
assert (s.width, s.height) == (4, 4), "Square(4) should have width and height 4"
assert s.area() == 16, "Square(4).area() should be 16"` },
        { name: "__str__ uses the real class name", code: `assert str(Rectangle(2, 3)) == "Rectangle 2x3", "str(Rectangle(2, 3)) should be 'Rectangle 2x3'"
assert str(Square(4)) == "Square 4x4", "str(Square(4)) should be 'Square 4x4'"` },
        { name: "a Square is a Rectangle", code: `assert isinstance(Square(1), Rectangle), "Square should inherit from Rectangle"
assert issubclass(Square, Rectangle), "issubclass(Square, Rectangle) should be True"` }
      ],
      explain: "A subclass constructor replaces the parent's, so the parent's attributes exist only if you call super().__init__(). __str__ defined once in the base class is inherited, and type(self) resolves to the object's real class, which is polymorphism in action. isinstance() and issubclass() confirm the relationship, all of which appear in PCAP section 4."
    },
    {
      id: "pcap-diamond-mro",
      kind: "code",
      d: 4,
      title: "Cooperative methods in a diamond",
      prompt: "Four classes form a diamond: `B(A)`, `C(A)` and `D(B, C)`. Each has a method `trail()` that should return its own letter followed by whatever the next class in the method resolution order returns, so that `D().trail()` is `\"DBCA\"`, `B().trail()` is `\"BA\"` and `A().trail()` is `\"A\"`.\n\nThe starter calls the parents by name, so A is visited twice and C's position is wrong.",
      hint: "super() does not mean the parent class. It means the next class in the MRO of the object you started with.",
      starter: `class A:
    def trail(self):
        return "A"

class B(A):
    def trail(self):
        return "B" + A.trail(self)

class C(A):
    def trail(self):
        return "C" + A.trail(self)

class D(B, C):
    def trail(self):
        return "D" + B.trail(self) + C.trail(self)
`,
      solution: `class A:
    def trail(self):
        return "A"

class B(A):
    def trail(self):
        return "B" + super().trail()

class C(A):
    def trail(self):
        return "C" + super().trail()

class D(B, C):
    def trail(self):
        return "D" + super().trail()
`,
      tests: [
        { name: "D follows the MRO", code: `assert D().trail() == "DBCA", "D().trail() should be 'DBCA'"
assert [k.__name__ for k in D.__mro__] == ["D", "B", "C", "A", "object"], "the MRO should be D, B, C, A, object"` },
        { name: "single chains still work", code: `assert B().trail() == "BA", "B().trail() should be 'BA'"
assert C().trail() == "CA", "C().trail() should be 'CA'"
assert A().trail() == "A", "A().trail() should be 'A'"` }
      ],
      explain: "Python linearises a class hierarchy with the C3 method resolution order: for D(B, C) it is D, B, C, A, object. super() in B, called on a D object, moves to C rather than A, so every class runs exactly once. Calling parents by name breaks this and repeats the shared base. PCAP tests MRO in diamonds and what makes a hierarchy inconsistent."
    },
    {
      id: "pcap-comprehension-lambda",
      kind: "code",
      d: 5,
      title: "Comprehensions and a lambda sort key",
      prompt: "Write two functions:\n\n`even_squares(nums)` returns a list of the squares of the even numbers only, using a list comprehension with an `if` filter. `even_squares([1, 2, 3, 4])` is `[4, 16]`.\n\n`by_last_letter(words)` returns a new list sorted by each word's last letter, using `sorted()` with a lambda as the key. Words with the same last letter keep their original order.",
      hint: "The filter goes at the end of the comprehension. The key function receives one word and returns what to sort by.",
      starter: `def even_squares(nums):
    return [n * n for n in nums]

def by_last_letter(words):
    words.sort()
    return words
`,
      solution: `def even_squares(nums):
    return [n * n for n in nums if n % 2 == 0]

def by_last_letter(words):
    return sorted(words, key=lambda w: w[-1])
`,
      tests: [
        { name: "squares only the even numbers", code: `assert even_squares([1, 2, 3, 4]) == [4, 16], "even_squares([1, 2, 3, 4]) should be [4, 16]"
assert even_squares([1, 3]) == [], "no even numbers gives []"` },
        { name: "sorts by the last letter and keeps ties in order", code: `assert by_last_letter(["cat", "dog", "bee", "ant"]) == ["bee", "dog", "cat", "ant"], "expected ['bee', 'dog', 'cat', 'ant']"` },
        { name: "does not change the original list", code: `w = ["b", "a"]
by_last_letter(w)
assert w == ["b", "a"], "use sorted(), which returns a new list, not list.sort()"` }
      ],
      explain: "A list comprehension of the form [expr for x in seq if cond] filters and transforms in one step. sorted() returns a new list and accepts a key function, here a lambda that returns the last character; Python's sort is stable, so ties keep their order. list.sort() sorts in place and returns None. PCAP section 5 pairs comprehensions with lambdas, map() and filter()."
    },
    {
      id: "pcap-closure-late-binding",
      kind: "code",
      d: 5,
      title: "Fix a late-binding closure",
      prompt: "Write `make_adders(n)` that returns a list of `n` functions, where the function at position `i` adds `i` to its argument. So `make_adders(3)[2](10)` is 12 and `make_adders(3)[0](10)` is 10.\n\nThe starter builds lambdas in a loop, but every one of them ends up adding the same number.",
      hint: "A closure looks up the loop variable when it is called, not when it is created. Capture the current value at creation time, for example with a default argument or a factory function.",
      starter: `def make_adders(n):
    adders = []
    for i in range(n):
        adders.append(lambda x: x + i)
    return adders
`,
      solution: `def make_adders(n):
    def make(i):
        def add(x):
            return x + i
        return add
    return [make(i) for i in range(n)]
`,
      tests: [
        { name: "each function adds its own position", code: `fs = make_adders(3)
assert [f(10) for f in fs] == [10, 11, 12], "expected [10, 11, 12]"` },
        { name: "returns the right number of functions", code: `assert len(make_adders(5)) == 5, "make_adders(5) should return 5 functions"
assert make_adders(0) == [], "make_adders(0) should return []"` }
      ],
      explain: "Every lambda created in the loop closes over the same variable i, and by the time they run the loop has finished, so all of them see its last value. A factory function (or a default argument like lambda x, i=i: x + i) creates a new scope that stores the current value. PCAP section 5 covers closures, and late binding is the usual trick question."
    },
    {
      id: "pcap-file-generator",
      kind: "code",
      d: 5,
      title: "Read records with a generator",
      prompt: "Write a generator function `read_records(path)` that opens a text file with `with open(...)`, and yields each line with surrounding whitespace removed, skipping blank lines and lines that start with `#`.\n\nIt must be a generator (use `yield`), so that a large file is processed one line at a time instead of being loaded into a list.",
      hint: "Iterating over a file object gives one line at a time. Strip first, then decide whether to skip.",
      starter: `def read_records(path):
    f = open(path)
    return f.readlines()
`,
      solution: `def read_records(path):
    with open(path, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            yield line
`,
      tests: [
        { name: "yields cleaned lines and skips blanks and comments", code: `with open("/tmp/pcap_records.txt", "w") as f:
    f.write("# users\\nalice\\n\\n  bob  \\n# end\\ncarol\\n")
assert list(read_records("/tmp/pcap_records.txt")) == ["alice", "bob", "carol"], "expected ['alice', 'bob', 'carol']"` },
        { name: "it is a generator", code: `import types
with open("/tmp/pcap_records2.txt", "w") as f:
    f.write("one\\ntwo\\n")
g = read_records("/tmp/pcap_records2.txt")
assert isinstance(g, types.GeneratorType), "read_records should be a generator function"
assert next(g) == "one", "the first next() should give 'one'"` },
        { name: "a finished generator raises StopIteration", code: `with open("/tmp/pcap_records3.txt", "w") as f:
    f.write("only\\n")
g = read_records("/tmp/pcap_records3.txt")
next(g)
try:
    next(g)
except StopIteration:
    pass
else:
    raise AssertionError("a second next() should raise StopIteration")` }
      ],
      explain: "A function containing yield returns a generator object; each next() runs until the following yield, and StopIteration signals the end. with open() closes the file automatically, even if an error occurs, while a bare open() leaves it to you. Iterating over a text-mode file reads one line at a time. PCAP section 5 covers generators, open() modes and file streams."
    }
  ]
});
