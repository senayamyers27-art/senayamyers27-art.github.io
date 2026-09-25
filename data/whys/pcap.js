CertHub.addWhys("pcap", {
  "pc1": [
    "This swaps ceil and floor: ceil(-2.5) is -2 (rounding toward +infinity), not -3, and floor is -3, not -2.",
    "It gets ceil wrong: ceil rounds toward positive infinity, so ceil(-2.5) is -2, not -3.",
    "ceil and floor are right here, but trunc(-2.5) drops the fraction toward zero, giving -2, not -3.",
    null
  ],
  "pc2": [
    "The module name math is never bound by a `from math import ...` statement, so math.sqrt raises NameError.",
    "The original name sqrt is not bound because the `as root` alias replaces it; only root is available.",
    null,
    "Neither math nor an attribute named root on it exists, so math.root raises NameError."
  ],
  "pc3": [
    null,
    "__main__.py is executed when a package is run with `python -m package`; it does not mark a directory as an importable package.",
    "setup.py is a packaging/build script for distributing a project, not a file Python looks for to treat a folder as a package.",
    "__pycache__ is an auto-generated folder holding compiled .pyc bytecode, not something you add to define a package."
  ],
  "pc4": [
    null,
    "__name__ equals '__main__' only for the file run directly, not for a module that is imported.",
    "__name__ never includes the .py extension; it is just the bare module name.",
    "Imported modules use their plain file name; Python does not wrap module names in dunder underscores like this."
  ],
  "pc5": [
    null,
    "os.chdir changes the current working directory, which does not affect where Python searches for importable modules.",
    "sys.modules is a dict of already-loaded modules and has no add method; it does not control search locations.",
    "This is not valid Python; there is no such import form or `path(...)` call."
  ],
  "pc6": [
    "Seeding with the same value replays the identical sequence, so the two floats are equal and the result is True.",
    "random.random() returns a float and the == comparison yields a bool, so the printed value is never None.",
    null,
    "The code prints the boolean result of a == b, not the underlying random float value."
  ],
  "pc7": [
    "python_version() returns the version as a single string like '3.12.4', not a tuple of strings.",
    "platform.version() returns the operating system's version string, unrelated to the Python version.",
    "version_info has no tuple() method; it is a named tuple of integers, not strings.",
    null
  ],
  "pc8": [
    null,
    "__pycache__ does not store copies of your source file; it holds compiled bytecode only.",
    "Bytecode caching is unrelated to memoizing function return values.",
    "No import logs are written there; the folder only contains .pyc files."
  ],
  "pc9": [
    "hypot returns a float, so the result prints as 5.0, not the integer 5.",
    "25 is 3*3 + 4*4 without the square root; hypot takes the square root of that sum of squares.",
    "7 is 3 + 4, but hypot computes the Euclidean distance, not the sum of the two legs.",
    null
  ],
  "pc10": [
    "Names beginning with an underscore are exactly what `import *` skips, so _secret is not imported.",
    "The module name cfg is never bound by `import *`, and _secret is skipped because of its leading underscore.",
    "_secret starts with an underscore, so it is excluded when the module has no __all__.",
    null
  ],
  "pc11": [
    null,
    "sqrt returns a float, so 120 // 4.0 is the float 30.0, not the integer 30.",
    "Floor division discards the remainder, so no fractional .5 can appear in the result.",
    "This is not a division of 120 by 16; factorial(5) is 120 and 120 // 4.0 is 30.0, not 7.5."
  ],
  "pc12": [
    "int('3.5') raises ValueError, which the first branch catches and prints V; the Exception branch that would print E is never reached.",
    "else runs only when no exception occurs, but an exception did occur, so 'OK' is not printed.",
    "This omits the finally branch, which always runs and prints F.",
    null
  ],
  "pc13": [
    "ArithmeticError is the parent class; type(e).__name__ reports the actual class, which is ZeroDivisionError.",
    "Exception is a distant ancestor, not the exact type of the raised object, which is ZeroDivisionError.",
    "No TypeError occurs; 1/0 raises ZeroDivisionError, which is the tuple member that matches.",
    null
  ],
  "pc14": [
    "ValueError is unrelated to arithmetic and is not in ZeroDivisionError's ancestry.",
    "LookupError is the parent of IndexError and KeyError, not of ZeroDivisionError.",
    null,
    "RuntimeError is a separate branch of the hierarchy and is not a parent of ZeroDivisionError."
  ],
  "pc15": [
    "Catching Exception would also trap unrelated errors such as TypeError, which the developer wants to let through.",
    "AttributeError is not a parent of IndexError or KeyError, so it would catch neither.",
    "ValueError is unrelated to indexing or key lookups and would not catch either error.",
    null
  ],
  "pc16": [
    "KeyError is a subclass of LookupError, and the LookupError branch comes first, so L prints, not K.",
    "Only the first matching branch runs; once LookupError matches, the KeyError branch is skipped.",
    null,
    "The missing key does raise KeyError, which matches the LookupError branch, so something is printed."
  ],
  "pc17": [
    null,
    "Printing e.args shows the tuple, not the bare string; str(e) would give 'neg'.",
    "The assert has a message, so args holds one item rather than being empty.",
    "args is a tuple, not a list, so it prints with parentheses, not square brackets."
  ],
  "pc18": [
    null,
    "Inheriting from BaseException means `except Exception` handlers miss it; BaseException is reserved for system-exiting exceptions.",
    "A plain object is not raisable as an exception, so this cannot be raised.",
    "SystemExit is meant to terminate the interpreter, not to signal a configuration error."
  ],
  "pc19": [
    "Only msg is passed to super().__init__, so str(e) is 'bad', not a two-item tuple.",
    "Printing the exception shows its message 'bad', not the class name.",
    null,
    "code is explicitly set to 42 in __init__, so e.code is 42, not None."
  ],
  "pc20": [
    "Returning the exception object does not propagate it; the caller just receives a value.",
    "raise Exception raises a new, generic exception and discards the original type and traceback.",
    "pass silently swallows the exception, so nothing propagates to the caller.",
    null
  ],
  "pc21": [
    "The finally block prints F before the function returns, so F is printed as well as 1.",
    "finally runs before the return value reaches the caller, so F is printed before 1, not after.",
    "The returned value 1 is still printed by the outer print, so 1 also appears.",
    null
  ],
  "pc22": [
    "KeyboardInterrupt derives from BaseException, not Exception, so `except Exception` does not catch it and the loop cannot continue.",
    "The handler never runs for KeyboardInterrupt, so the loop does not restart; the program stops instead.",
    null,
    "Python does not transform KeyboardInterrupt into any other exception type."
  ],
  "pc23": [
    null,
    "else runs precisely when no exception was raised, which is the opposite of a handled exception.",
    "else is skipped whenever an except branch runs; use finally for code that must always run.",
    "An unhandled exception propagates out of the try statement and skips else entirely."
  ],
  "pc24": [
    "Raising ValueError with no argument gives an empty args tuple, so its length is 0, not 1.",
    "args is always a tuple, so len() returns an integer, never None.",
    null,
    "Raising the exception class without arguments is valid and does not itself error here."
  ],
  "pc25": [
    "26 is the number of letters in the alphabet, not the code-point difference, which is 32.",
    "The order is ord('a') - ord('A') = 97 - 65 = 32, a positive value, not -32.",
    "'a' and 'A' differ by 32 in code points, not by 1.",
    null
  ],
  "pc26": [
    null,
    "Adding 2 to ord('C')=67 gives 69, which is 'E'; 'D' would be only +1.",
    "chr() converts the number back to a character, so the result is a letter, not the integer 67.",
    "The expression does arithmetic on code points, not string concatenation, so 'C2' is not produced."
  ],
  "pc27": [
    "The slice stops before index -1, excluding the final 'n', so the result is 'tho', not 'thon'.",
    "Index -4 is 't', not 'y'; 'ytho' would start one position earlier.",
    null,
    "This reads the last three characters, but s[-4:-1] starts at -4 ('t') and stops before -1."
  ],
  "pc28": [
    "Strings are immutable, so item assignment cannot modify them in place; s does not become 'Java'.",
    "Index 0 is valid; the failure is about immutability, which raises TypeError, not IndexError.",
    "You cannot assign to an index of a string at all, so no new binding to s[0] occurs.",
    null
  ],
  "pc29": [
    null,
    "'10' < '9' compares '1' (49) to '9' (57), so it is True, not False.",
    "String comparison makes the first result True, and 10 < 9 is False, so both values are reversed here.",
    "The integer comparison 10 < 9 is False, so the second value cannot be True."
  ],
  "pc30": [
    "join puts the separator only between items, never before the first one, so no leading '-' appears.",
    "join adds no trailing separator after the last item.",
    null,
    "The separator appears between each pair of items, not once at the end."
  ],
  "pc31": [
    "With an explicit separator, the empty field between the two commas is preserved, not dropped.",
    "split divides the string on each comma, so it returns multiple items, not the whole string unchanged.",
    "The separator characters are removed, so a lone ',' element never appears in the result.",
    null
  ],
  "pc32": [
    null,
    "split() with no argument discards leading and trailing whitespace and collapses runs, so no empty strings appear.",
    "Argument-less split strips surrounding spaces from each token rather than keeping them.",
    "Consecutive spaces are treated as one separator, so no empty element sits between the words."
  ],
  "pc33": [
    null,
    "find returns -1 (not None) when the substring is absent.",
    "The first 'na' begins at index 2, not 3, and the last at 4, not 5.",
    "rfind searches from the right and finds the later 'na' at index 4, not 2."
  ],
  "pc34": [
    null,
    "rindex, like index, raises ValueError when the colon is missing, so it does not avoid the crash.",
    "count returns how many colons exist, not their position, so it cannot locate the colon.",
    "The value is already a string, so wrapping it with str() changes nothing about the missing colon."
  ],
  "pc35": [
    "sorted returns a list of characters, not a joined string; use ''.join(sorted(s)) to get 'abc'.",
    "sorted returns a new list; it is list.sort() that returns None.",
    "sorted returns a list, not a tuple, so parentheses are wrong here.",
    null
  ],
  "pc36": [
    "'a1'.isalnum() is True because it contains only letters and digits, so the middle value is True, not False.",
    "'Ab'.isupper() is False because it contains a lowercase letter, so all three cannot be True.",
    "'3'.isdigit() is True, so the first value is True, not False.",
    null
  ],
  "pc37": [
    null,
    "Each escape (\\n, \\t, \\\\) is a single character, so the length is 3, not 4.",
    "The backslash escapes each represent one character, so the length is 3, not 5.",
    "Counting each backslash-letter pair as two characters is the mistake; they are single characters."
  ],
  "pc38": [
    "UTF-8 is variable-width, using 1 to 4 bytes, so characters are not all exactly two bytes.",
    "UTF-8 can encode the entire Unicode range, far beyond the first 256 code points.",
    null,
    "UTF-8 encodes ASCII characters identically to ASCII, so 'A' is the same byte in both."
  ],
  "pc39": [
    "'H' not in 'hello' is True because the check is case-sensitive, so the second value is True, not False.",
    "'ell' is a substring of 'Hello', so the first value is True, not False.",
    null,
    "Both parts are actually True, so neither value is False."
  ],
  "pc40": [
    "Multiplying a string by an int is valid repetition and returns '1', so it raises no error.",
    "Equality between a str and an int simply returns False without raising.",
    "Inequality across types returns True and does not raise.",
    null
  ],
  "pc41": [
    null,
    "a.count reads the shared class variable through the instance, so it is 2, not 0.",
    "Each constructor call increments A.count and two instances were created, so it is 2, not 1.",
    "a has no instance variable count, so a.count falls back to the class value 2, not 1."
  ],
  "pc42": [
    "Assigning a.x creates an instance variable and leaves the class variable A.x unchanged at 1, not 5.",
    "a.x was set to 5, so the instance value is 5, not 1.",
    null,
    "The values are reversed; A.x stays 1 and a.x becomes 5."
  ],
  "pc43": [
    "__init__ set self.v, so the instance dict is not empty.",
    "Methods such as __init__ live in the class __dict__, not the instance __dict__, and would not map to 1.",
    "The stored key is just the attribute name 'v'; the 'self.' prefix is not part of the key.",
    null
  ],
  "pc44": [
    "The mangled name _A__s does exist, so accessing a._A__s succeeds rather than raising.",
    "The attribute was set to 7, so its value is 7, not None.",
    null,
    "Printing a._A__s prints its value 7, not the literal string '__s'."
  ],
  "pc45": [
    "Name mangling stores the attribute as _A__p, so no attribute literally named __p exists and hasattr is False.",
    "hasattr returns a boolean, not the attribute's value.",
    "hasattr always returns True or False, never None.",
    null
  ],
  "pc46": [
    null,
    "__bases__ lists B's parents, not B itself, so the first base is A.",
    "object is A's base, but B.__bases__[0] is A, whose name is 'A'.",
    "__main__ is a module name, not the name of B's base class."
  ],
  "pc47": [
    "D's MRO reaches B before A, and B defines who(), so A's version is never used.",
    "D does not define who(), so it inherits one; the MRO selects B's implementation.",
    "B is listed before C in D(B, C), so B's who() wins over C's.",
    null
  ],
  "pc48": [
    "C3 never visits the shared base A before C, so A cannot appear before C in the MRO.",
    "B is listed first in D(B, C), so B precedes C in the MRO.",
    "object is always last, after A, not before it.",
    null
  ],
  "pc49": [
    "super().__init__() sets x to 1 and then B adds 1, so the final value is 2, not 1.",
    null,
    "Only one increment happens after the parent sets x to 1, giving 2, not 3.",
    "super().__init__() creates x, so accessing it does not raise an AttributeError."
  ],
  "pc50": [
    "B's __init__ never calls super().__init__(), so A's constructor does not run and x is never set.",
    null,
    "hasattr returns a boolean, not the value 1.",
    "hasattr returns True or False, never None."
  ],
  "pc51": [
    "__str__ returns 'P!', including the exclamation mark, so 'P' alone is incomplete.",
    null,
    "Because __str__ is defined, print uses it instead of the default object representation.",
    "print outputs the string returned by __str__; it does not print None."
  ],
  "pc52": [
    "issubclass(A, B) is False because A is the parent of B, not its subclass.",
    "isinstance(b, A) is True since b is a B, which is a subclass of A.",
    "Both values are reversed; isinstance is True and issubclass(A, B) is False.",
    null
  ],
  "pc53": [
    "a and c are separate list objects, so `a is c` is False, not True.",
    null,
    "a and c have equal contents, so a == c is True, not False.",
    "b is bound to the same object as a, so `a is b` is True, not False."
  ],
  "pc54": [
    "Sq overrides area() to return s**2, so the second value is 9, not 0.",
    null,
    "The base Shape instance uses its own area(), which returns 0, so the first value is 0, not 9.",
    "Sq(3).area() is 3**2 = 9, not 3*2 = 6."
  ],
  "pc55": [
    "self is only a naming convention, not a reserved keyword, and Python does not add it automatically.",
    null,
    "self refers to the instance, not the class; the class is reached via type(self) or the class name.",
    "Every instance method needs a first parameter to receive the instance, regardless of visibility."
  ],
  "pc56": [
    "A class variable would be shared by all accounts and still openly writable, so it does not protect a per-object balance.",
    null,
    "A module global is shared program-wide and freely writable, offering no encapsulation for an account.",
    "A local variable in __init__ vanishes when the constructor returns, so the balance would not persist on the object."
  ],
  "pc57": [
    "__module__ holds the module name, not the class name 'A'.",
    null,
    "The run script's module is named '__main__' with double underscores, not 'main'.",
    "__module__ is always a string naming the defining module, never None."
  ],
  "pc58": [
    "A fresh instance has no instance variables, so 'x' is not in its __dict__; the first value is False.",
    null,
    "x is a class variable, so it is in the class __dict__ (True), but the instance __dict__ is empty.",
    "x does appear in the class __dict__, so the second value is True, not False."
  ],
  "pc59": [
    "The method f exists on the instance, so it is found; the error is about arguments, not a missing attribute.",
    "f is defined and reachable, so no name lookup fails.",
    null,
    "The mismatch is in the number of positional arguments, which raises TypeError, not ValueError."
  ],
  "pc60": [
    null,
    "The MRO is C, A, B, so A.x is found first and B.x is never reached.",
    "Attribute lookup returns a single value from the first class that defines it, not a concatenation.",
    "C(A, B) has a valid MRO, so the lookup succeeds and returns A.x rather than raising."
  ],
  "pc61": [
    "Listing A before its subclass B makes this order impossible, so no such MRO can be built.",
    "C3 cannot produce any consistent order here, so the class is not created at all.",
    null,
    "The failure happens at class-definition time with a TypeError, so C is never created."
  ],
  "pc62": [
    "The method concatenates 'B' with super().hi(), which returns 'A', so the result includes A too.",
    "B overrides hi() to prepend 'B' before calling the parent, so 'B' comes first.",
    "The order is 'B' then the parent's 'A', giving 'BA', not 'AB'.",
    null
  ],
  "pc63": [
    "items is a shared class variable, so appending through a mutates the one list that b also sees, giving [1].",
    null,
    "b.items refers to the shared list, which now contains [1], not None.",
    "items exists as a class variable, so accessing b.items succeeds without an AttributeError."
  ],
  "pc64": [
    "Inheritance works fine with constructors; that is not the reviewer's concern.",
    null,
    "Classes implicitly inherit from object already, so this is not the issue.",
    "Python supports arbitrarily deep inheritance, so depth is not the objection."
  ],
  "pc65": [
    null,
    "type(d).__name__ is the class name 'Dog'; the variable name d is not stored on the object.",
    "d.__class__ is Dog, so the identity check is True, not False.",
    "type(d) is Dog, not object, so the name is 'Dog'."
  ],
  "pc66": [
    "A() uses the default 0 but A(5) supplies 5, so the sum is 5, not 0.",
    null,
    "Only one object receives 5; the other uses the default 0, so the total is 5, not 10.",
    "The default value makes both calls valid, so no error occurs."
  ],
  "pc67": [
    null,
    "Before set() runs, z does not exist, so the first hasattr is False, not True.",
    "After set() creates self.z, the second hasattr becomes True, not False.",
    "The values are reversed; z is absent first and present after set()."
  ],
  "pc68": [
    "Every class inherits from object, so __bases__ is not an empty tuple.",
    null,
    "__bases__ is always a tuple of base classes, never None.",
    "type is the metaclass, not a base class; the single base here is object."
  ],
  "pc69": [
    "It is the reverse: Manager inherits from Employee, so Manager is the subclass, not Employee.",
    "Manager inherits from Employee, so Manager is the subclass, not the superclass.",
    null,
    "One class inherits from the other, so they are in a parent-child relationship, not siblings."
  ],
  "pc70": [
    "a.n += 1 gives a its own instance n of 1, so a.n is 1, not 10.",
    "b never gets its own n, so b.n reads the updated class value 10, not 1.",
    null,
    "a.n was set to 1 before A.n changed, and instance values do not track later class changes, so a.n is 1, not 11."
  ],
  "pc71": [
    "x % 2 keeps odd numbers, not even ones, so 0, 2 and 4 are excluded.",
    null,
    "The filter drops even x, so 4 and 16 (squares of 2 and 4) are not included.",
    "The expression squares each kept value, so it yields 1 and 9, not the raw 1 and 3."
  ],
  "pc72": [
    "The outer loop is i and the inner is j, so each i repeats before advancing, giving 0,0,1,1,2,2.",
    null,
    "The emitted value is i, not j, so the output does not cycle 0,1.",
    "The comprehension produces a flat list of i values, not nested lists."
  ],
  "pc73": [
    null,
    "f(3) is 3**2 = 9, not 3*2 = 6; the lambda exponentiates rather than multiplies.",
    "f(2, 3) overrides y with 3, giving 2**3 = 8, not 9.",
    "The results are swapped; f(3) is 9 and f(2, 3) is 8."
  ],
  "pc74": [
    "This repeats the list; map instead applies the lambda to each element, doubling it.",
    null,
    "The lambda multiplies by 2, not adds 1, so the values double to 2, 4, 6.",
    "list() consumes the map iterator and produces an actual list, so the object repr is not shown."
  ],
  "pc75": [
    "filter keeps items where len > 2 is True, which excludes 'a' and 'de' rather than keeping them.",
    "filter returns the matching items, not the boolean results of the predicate.",
    null,
    "filter returns the strings themselves, not their lengths."
  ],
  "pc76": [
    "inner adds n (5) to its argument 10, giving 15, not just n.",
    "The closure adds the remembered n=5 to 10, producing 15, not 10 alone.",
    null,
    "inner is a valid closure that remembers n after outer returns, so no error occurs."
  ],
  "pc77": [
    "Each lambda reads i when called, not when created, so they all see the final i rather than distinct values.",
    null,
    "i ends at 2 after the loop, so the shared lookup returns 2, not 0.",
    "range(3) stops at i = 2, so the final value is 2, not 3."
  ],
  "pc78": [
    "The generator advances past the first yield on the second next(), so it returns 2, not 1 again.",
    null,
    "The first next() returns 1, since the generator starts at the first yield.",
    "next() returns individual values one at a time, not a list."
  ],
  "pc79": [
    "A bare next() on an exhausted generator raises rather than returning None; None comes only with a default argument.",
    "Generators do not restart; once exhausted they stay exhausted.",
    null,
    "Exhausted iterators signal completion with StopIteration, not IndexError."
  ],
  "pc80": [
    null,
    "map is a one-shot iterator, so the second list() finds it already consumed and empty.",
    "map(str, ...) produces strings, so the elements are '1' and '2', not integers.",
    "The first list() does consume the values, so it is not empty; only the second one is."
  ],
  "pc81": [
    "Write mode truncates the file to empty, destroying the earlier log lines.",
    "Exclusive-create mode fails with FileExistsError once the log file already exists.",
    "Read/write mode writes from the start and can overwrite existing lines unless you seek to the end.",
    null
  ],
  "pc82": [
    "Binary mode does not decode text, so read() returns bytes, not a str.",
    null,
    "read() in binary mode returns an immutable bytes object; a bytearray is only produced when you supply one to readinto().",
    "read() returns a single bytes object, not a list of values."
  ],
  "pc83": [
    "stdin is the input stream, not a place to write error messages.",
    "stdout carries the normal results and is captured by a `>` redirect, so errors would mix into the results file.",
    null,
    "argv is a list of command-line arguments, not an output stream."
  ],
  "pc84": [
    null,
    "EACCES means permission denied, not a missing file, so it would not detect the file-not-found case.",
    "args is a tuple, never equal to a plain string, so this test is always False.",
    "strerror holds a descriptive message for OSErrors, so it is not None and does not identify a missing file."
  ],
  "pc85": [
    "readline returns '' at end of file, never None.",
    null,
    "File reads do not raise EOFError; that comes from input(). readline just returns ''.",
    "A '\\n' indicates a blank line within the file, not the end of the file."
  ],
  "pc86": [
    "readinto stores the bytes in the provided buffer and returns a count instead of the data.",
    null,
    "readinto returns the number of bytes read, not the file offset or position.",
    "It returns an integer count, which may be less than the buffer size, not a boolean."
  ],
  "pc87": [
    null,
    "bytearray items are integers, so the first element is 65, not the character 'A'.",
    "bytearray(3) has three elements; assigning to index 0 does not shrink it to one.",
    "The assignment targets index 0, so 65 goes to the front, not the end."
  ],
  "pc88": [
    "That is row 0 (r=0), where every product is 0; row 1 multiplies 1 by each column.",
    null,
    "Columns run 0, 1, 2, so row 1 is 0, 1, 2, not 1, 2, 3.",
    "That would be row 2 (r=2), but the grid only has rows 0 and 1."
  ],
  "pc89": [
    "That is ascending length order; the negative-length key sorts the longest first instead.",
    "Sorting by -len groups strictly by descending length, so 'ccc' must come first.",
    null,
    "The key sorts purely by descending length, producing 'ccc', 'bb', 'a', not this mix."
  ],
  "pc90": [
    "If an exception jumps out before that line, the close() call is skipped and the file stays open.",
    null,
    "Exclusive-creation mode controls how the file is opened, not whether it is closed on error.",
    "flush pushes buffered data to disk but does not close the file."
  ]
});
