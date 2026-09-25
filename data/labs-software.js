/* Software engineering labs: Git, Python, Java, REST APIs, containers, CI, Kubernetes,
   serverless and infrastructure as code. One running project ties them together:
   "Shelf", a small book inventory (package -> API -> container -> CI -> Kubernetes / Terraform).
   Format: see tools/check-data.js and docs/LAB_WRITING_BRIEF.md. */
CertHub.registerLabs([
  {
    "id": "lab-git-workflow",
    "title": "Git workflow: branches, pull requests and a real merge conflict",
    "track": "Software engineering",
    "level": "Beginner",
    "minutes": 120,
    "cost": "Free (git and a free GitHub account)",
    "summary": "Set up git properly, work on feature branches, create and resolve a merge conflict by hand, then do the same on GitHub: push a branch, open a pull request with the gh CLI, review it, protect main with a ruleset, and undo mistakes safely with revert, restore and stash.",
    "realWorld": "Every software, DevOps and security engineering team works through branches and pull requests. Reviewers, CI checks and branch protection on main are how teams stop broken or unreviewed code from shipping, and resolving conflicts calmly is a daily skill that interviewers often ask about.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab (or any Linux, macOS or WSL terminal) with git 2.40 or later",
      "A free GitHub account",
      "The GitHub CLI gh (install steps at cli.github.com; on Ubuntu: sudo apt install gh)"
    ],
    "requires": [
      "lab-linux-cli"
    ],
    "safety": "Use a throwaway practice repository. Never put passwords, tokens or keys in a commit: history is permanent and public repositories are scraped for secrets within minutes.",
    "steps": [
      {
        "title": "Configure git once",
        "body": "Set your identity (it is written into every commit), make main the default branch name, and choose merge (not rebase) as the default for git pull so the behavior is predictable while you learn. Use the no-reply email GitHub shows under Settings > Emails if you do not want your address public.",
        "cmd": "git --version\ngit config --global user.name \"Your Name\"\ngit config --global user.email \"you@users.noreply.github.com\"\ngit config --global init.defaultBranch main\ngit config --global pull.rebase false\ngit config --global core.editor nano\ngit config --global --list",
        "check": "git config --list shows your name, email and init.defaultbranch=main."
      },
      {
        "title": "Create a repository with a first commit",
        "body": "A commit is a snapshot of the staged files plus a message. Add a .gitignore first so build output, virtual environments and local secrets never get committed.",
        "cmd": "mkdir -p ~/git-lab && cd ~/git-lab\ngit init\nprintf '# Shelf\\n\\nA tiny book inventory used in the software engineering labs.\\n' > README.md\nprintf '.venv/\\n__pycache__/\\n*.db\\n.env\\n' > .gitignore\ncat > greet.py <<'EOF'\ndef greet(name):\n    return \"Hello, \" + name\nEOF\ngit status\ngit add README.md .gitignore greet.py\ngit commit -m \"Initial commit: README, gitignore and greet()\"\ngit log --oneline",
        "check": "git log shows one commit on main."
      },
      {
        "title": "Work on a feature branch",
        "body": "Branches are cheap pointers to commits. Do all work on a branch named for the change, commit in small steps with messages that say why, then look at the history as a graph.",
        "cmd": "git switch -c feature/friendly-greeting\nsed -i 's/\"Hello, \" + name/f\"Hello, {name}! Welcome to Shelf.\"/' greet.py\ncat greet.py\ngit diff\ngit commit -am \"Make greeting friendlier\"\ngit log --oneline --graph --all",
        "check": "The graph shows feature/friendly-greeting one commit ahead of main."
      },
      {
        "title": "Create a conflict on purpose",
        "body": "A conflict happens when two branches change the same lines differently. Switch back to main and make a competing change to the same line, as a teammate might have done while you were working.",
        "cmd": "git switch main\nsed -i 's/\"Hello, \" + name/\"Hi, \" + name.strip()/' greet.py\ngit commit -am \"Trim whitespace from names\"\ngit log --oneline --graph --all",
        "check": "The graph now shows two branches that diverge from the first commit."
      },
      {
        "title": "Merge and resolve the conflict by hand",
        "body": "Git stops and marks the file. Everything between <<<<<<< and ======= is main's version (HEAD); between ======= and >>>>>>> is the feature branch. Edit the file so it keeps both intents: strip the name AND use the friendly message. Delete all three marker lines, then stage and commit to finish the merge. 'git merge --abort' gets you out if you panic.",
        "cmd": "git merge feature/friendly-greeting\ngit status\ncat greet.py\n# edit greet.py so the function body is exactly:\n#     return f\"Hello, {name.strip()}! Welcome to Shelf.\"\nnano greet.py\ngrep -n '<<<<<<<\\|>>>>>>>\\|=======' greet.py || echo \"no markers left\"\npython3 -c 'from greet import greet; print(greet(\"  Ada \"))'\ngit add greet.py\ngit commit --no-edit\ngit log --oneline --graph",
        "check": "Python prints 'Hello, Ada! Welcome to Shelf.' and the log shows a merge commit with two parents."
      },
      {
        "title": "Push to GitHub",
        "body": "Log in with gh (it stores a token and configures git's credential helper), create a public repository from the local one and push main. Public is fine here because it holds nothing sensitive, and rulesets on private repositories need a paid plan.",
        "cmd": "gh auth login          # choose GitHub.com, HTTPS, and log in with a browser\ngh repo create git-lab --public --source=. --remote=origin --push\ngit remote -v\ngit branch -vv",
        "check": "git branch -vv shows main tracking origin/main, and the repository appears on github.com."
      },
      {
        "title": "Open a pull request",
        "body": "Make a new branch, add a test, push it and open a pull request (PR). The PR is where review, discussion and CI results live; the description should say what changed, why, and how it was tested.",
        "cmd": "git switch -c feature/add-test\ncat > test_greet.py <<'EOF'\nfrom greet import greet\n\n\ndef test_greet_strips_and_welcomes():\n    assert greet(\"  Ada \") == \"Hello, Ada! Welcome to Shelf.\"\nEOF\ngit add test_greet.py\ngit commit -m \"Add a unit test for greet()\"\ngit push -u origin feature/add-test\ngh pr create --base main --title \"Add a unit test for greet()\" --body \"Adds the first test. Tested locally with python3 -m pytest (or by reading it if pytest is not installed yet).\"\ngh pr view --web",
        "check": "The PR page shows one commit, the changed file and a Merge button."
      },
      {
        "title": "Review like a teammate",
        "body": "Read the diff in the Files changed tab and leave a line comment. Then respond as the author with a follow-up commit: pushing to the same branch updates the PR. You cannot approve your own PR, which is exactly why teams require a second person.",
        "cmd": "gh pr diff\ngh pr comment --body \"Could we also cover an empty name?\"\ncat >> test_greet.py <<'EOF'\n\n\ndef test_greet_empty_name():\n    assert greet(\"\") == \"Hello, ! Welcome to Shelf.\"\nEOF\ngit commit -am \"Cover the empty-name case\"\ngit push\ngh pr view",
        "check": "The PR now lists two commits and your comment."
      },
      {
        "title": "Protect main with a ruleset",
        "body": "In the repository go to Settings > Rules > Rulesets > New branch ruleset. Target the default branch, turn on 'Restrict deletions', 'Block force pushes' and 'Require a pull request before merging' (0 required approvals is fine for a solo lab; teams use 1 or more). Enforcement status: Active. Then try to push straight to main.",
        "cmd": "git switch main\necho \"direct change\" >> README.md\ngit commit -am \"Try to bypass review\"\ngit push origin main   # rejected by the ruleset\ngit reset --hard origin/main",
        "check": "The push is rejected with a message naming the rule, and reset puts your local main back."
      },
      {
        "title": "Squash-merge and clean up branches",
        "body": "Squash merging turns the PR's commits into one tidy commit on main. Delete the branch afterwards: it is merged, and stale branches confuse everyone.",
        "cmd": "gh pr merge feature/add-test --squash --delete-branch\ngit switch main\ngit pull\ngit log --oneline --graph\ngit branch -a",
        "check": "main contains a single 'Add a unit test for greet()' commit and the feature branch is gone locally and on GitHub."
      },
      {
        "title": "Undo safely",
        "body": "Know which undo to use. 'git restore' throws away uncommitted edits to a file. 'git stash' parks work in progress. 'git revert' makes a NEW commit that undoes an old one, which is safe on shared branches. 'git reset --hard' rewrites history and should only be used on commits nobody else has.",
        "cmd": "echo \"oops\" >> greet.py && git restore greet.py && git status\necho \"half-done idea\" >> README.md && git stash && git stash list && git stash pop\ngit checkout -- README.md\ngit switch -c fix/revert-demo\ngit revert --no-edit HEAD\ngit log --oneline -3\ngit push -u origin fix/revert-demo",
        "check": "The log shows a 'Revert ...' commit on top of the original, and history was not rewritten."
      }
    ],
    "verify": [
      "git log --graph on main shows your resolved merge commit and the squash-merged PR commit.",
      "greet.py contains no conflict markers and prints 'Hello, Ada! Welcome to Shelf.'",
      "A direct push to main is rejected by your ruleset.",
      "You can explain when to use restore, stash, revert and reset."
    ],
    "deliverable": "The GitHub repository (or screenshots of it) showing the merged PR with its review comment, the ruleset on main, and a short CONTRIBUTING.md you write describing your branch naming, commit message and PR rules.",
    "resume": "Practiced a pull-request based Git workflow with feature branches, code review, squash merges and GitHub branch rulesets; resolved merge conflicts and used revert-based rollbacks on shared branches.",
    "interview": [
      "Merge vs rebase? — Merge keeps the true history with a merge commit; rebase replays your commits on top of the target for a linear history. Never rebase commits others have already pulled.",
      "How do you resolve a merge conflict? — Read both sides, understand each intent, edit to keep the right combination, remove markers, run the tests, then stage and commit. Talk to the other author if unsure.",
      "Why protect main? — So every change is reviewed and passes CI before it lands, force pushes cannot rewrite shared history, and nobody deletes the branch by mistake.",
      "You pushed a bad commit to main. What do you do? — git revert it (a new commit), not reset --hard, because others already have that history."
    ],
    "cleanup": [
      "Delete the practice repository on GitHub (Settings > Danger Zone) or keep it for later labs.",
      "rm -rf ~/git-lab",
      "gh auth logout if this is a shared machine."
    ],
    "links": [
      {
        "label": "Pro Git book (free)",
        "url": "https://git-scm.com/book/en/v2"
      },
      {
        "label": "GitHub Docs: About pull requests",
        "url": "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests"
      },
      {
        "label": "GitHub Docs: About rulesets",
        "url": "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets"
      },
      {
        "label": "GitHub CLI manual",
        "url": "https://cli.github.com/manual/"
      }
    ]
  },
  {
    "id": "lab-python-project",
    "title": "A Python project done right: venv, packaging, pytest and ruff",
    "track": "Software engineering",
    "level": "Beginner",
    "minutes": 150,
    "cost": "Free",
    "summary": "Build a small Python package the way professionals do: an isolated virtual environment, a src layout with pyproject.toml, a class with a custom exception, pytest tests with fixtures and parametrize, coverage, ruff linting and formatting, a command-line entry point, and a wheel you install into a clean environment.",
    "realWorld": "Python is the most common language for automation, security tooling, data and backend work. Teams expect isolated environments, reproducible dependencies, automated tests and a linter in every repository; a project that installs cleanly with pip and has green tests is what reviewers and hiring managers look for on GitHub.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab (or any Linux, macOS or WSL terminal)",
      "Python 3.11 or later with venv (sudo apt install -y python3 python3-venv python3-pip)",
      "git (see lab-git-workflow)"
    ],
    "requires": [
      "lab-linux-cli"
    ],
    "safety": "Always install packages inside a virtual environment, never with sudo pip. Install only packages you meant to type: typosquatted names on PyPI are a known malware route.",
    "steps": [
      {
        "title": "Create the project and a virtual environment",
        "body": "A virtual environment (venv) is a private folder of packages for one project, so projects cannot break each other or the system Python. Activate it in every new terminal; the prompt shows (.venv).",
        "cmd": "mkdir -p ~/shelf && cd ~/shelf\ngit init\npython3 -m venv .venv\nsource .venv/bin/activate\nwhich python\npython -m pip install --upgrade pip\nprintf '.venv/\\n__pycache__/\\n*.egg-info/\\ndist/\\n.coverage\\nhtmlcov/\\n' > .gitignore",
        "check": "which python prints ~/shelf/.venv/bin/python."
      },
      {
        "title": "Lay out a src package",
        "body": "The src layout keeps your importable code in src/shelf so tests run against the installed package, not whatever happens to be in the current folder. __init__.py marks the directory as a regular package and can re-export the public names.",
        "cmd": "mkdir -p src/shelf tests\ncat > src/shelf/__init__.py <<'EOF'\n\"\"\"Shelf: a tiny book inventory.\"\"\"\n\nfrom shelf.inventory import Book, Inventory, OutOfStockError\n\n__all__ = [\"Book\", \"Inventory\", \"OutOfStockError\"]\n__version__ = \"0.1.0\"\nEOF",
        "check": "tree src (or ls -R src) shows src/shelf/__init__.py."
      },
      {
        "title": "Write the module: a class and a custom exception",
        "body": "A dataclass generates __init__, __repr__ and __eq__ for you. The custom exception subclasses Exception so callers can catch exactly this failure. Note the built-in errors used on purpose: ValueError for bad input, KeyError (a LookupError) for an unknown ISBN.",
        "cmd": "cat > src/shelf/inventory.py <<'EOF'\n\"\"\"Book inventory with copy counts.\"\"\"\n\nfrom dataclasses import dataclass\n\n\nclass OutOfStockError(Exception):\n    \"\"\"Raised when a checkout is attempted with no copies left.\"\"\"\n\n\n@dataclass\nclass Book:\n    isbn: str\n    title: str\n    copies: int = 1\n\n\nclass Inventory:\n    \"\"\"Keeps one Book per ISBN and tracks how many copies are on the shelf.\"\"\"\n\n    def __init__(self) -> None:\n        self._books: dict[str, Book] = {}\n\n    def add(self, book: Book) -> None:\n        if book.copies < 0:\n            raise ValueError(\"copies must be 0 or more\")\n        if book.isbn in self._books:\n            self._books[book.isbn].copies += book.copies\n        else:\n            self._books[book.isbn] = book\n\n    def checkout(self, isbn: str) -> Book:\n        book = self._books[isbn]\n        if book.copies == 0:\n            raise OutOfStockError(isbn)\n        book.copies -= 1\n        return book\n\n    def titles(self) -> list[str]:\n        return sorted(b.title for b in self._books.values())\n\n    def __len__(self) -> int:\n        return len(self._books)\nEOF"
      },
      {
        "title": "Add a command-line entry point",
        "body": "argparse gives you --help and argument checking for free. Returning an int from main() lets the console script use it as the exit code.",
        "cmd": "cat > src/shelf/cli.py <<'EOF'\n\"\"\"Command-line interface: shelf ISBN TITLE [--copies N].\"\"\"\n\nimport argparse\n\nfrom shelf.inventory import Book, Inventory\n\n\ndef main(argv: list[str] | None = None) -> int:\n    parser = argparse.ArgumentParser(prog=\"shelf\", description=\"Add a book and show the shelf.\")\n    parser.add_argument(\"isbn\")\n    parser.add_argument(\"title\")\n    parser.add_argument(\"--copies\", type=int, default=1)\n    args = parser.parse_args(argv)\n    inv = Inventory()\n    try:\n        inv.add(Book(args.isbn, args.title, args.copies))\n    except ValueError as exc:\n        parser.error(str(exc))\n    print(f\"{len(inv)} title(s) on the shelf: {', '.join(inv.titles())}\")\n    return 0\nEOF"
      },
      {
        "title": "Describe the project in pyproject.toml",
        "body": "pyproject.toml is the standard place for build settings (PEP 517/518), project metadata and dependencies (PEP 621), and tool configuration. Dev-only tools go in an optional 'dev' extra so users of the package do not install them.",
        "cmd": "cat > pyproject.toml <<'EOF'\n[build-system]\nrequires = [\"hatchling\"]\nbuild-backend = \"hatchling.build\"\n\n[project]\nname = \"shelf\"\nversion = \"0.1.0\"\ndescription = \"A tiny book inventory\"\nreadme = \"README.md\"\nrequires-python = \">=3.11\"\ndependencies = []\n\n[project.optional-dependencies]\ndev = [\"pytest>=8\", \"pytest-cov>=5\", \"ruff>=0.6\", \"build>=1.2\"]\n\n[project.scripts]\nshelf = \"shelf.cli:main\"\n\n[tool.pytest.ini_options]\ntestpaths = [\"tests\"]\naddopts = \"-ra\"\n\n[tool.ruff]\nline-length = 100\nsrc = [\"src\", \"tests\"]\n\n[tool.ruff.lint]\nselect = [\"E\", \"F\", \"I\", \"B\", \"UP\", \"SIM\"]\nEOF\necho \"# shelf\" > README.md\npip install -e \".[dev]\"\nshelf 978-0441013593 Dune --copies 2\nshelf --help",
        "check": "The shelf command prints '1 title(s) on the shelf: Dune'. An editable install (-e) means code edits take effect without reinstalling."
      },
      {
        "title": "Write tests with pytest",
        "body": "pytest finds files named test_*.py and functions named test_*. A fixture builds fresh test data for each test; parametrize runs one test with many inputs; pytest.raises asserts that the right exception is raised.",
        "cmd": "cat > tests/test_inventory.py <<'EOF'\nimport pytest\n\nfrom shelf import Book, Inventory, OutOfStockError\nfrom shelf.cli import main\n\n\n@pytest.fixture\ndef inv() -> Inventory:\n    inventory = Inventory()\n    inventory.add(Book(\"978-0441013593\", \"Dune\", copies=2))\n    return inventory\n\n\ndef test_add_merges_copies(inv):\n    inv.add(Book(\"978-0441013593\", \"Dune\", copies=3))\n    assert len(inv) == 1\n    assert inv.checkout(\"978-0441013593\").copies == 4\n\n\ndef test_checkout_until_empty(inv):\n    inv.checkout(\"978-0441013593\")\n    inv.checkout(\"978-0441013593\")\n    with pytest.raises(OutOfStockError):\n        inv.checkout(\"978-0441013593\")\n\n\ndef test_unknown_isbn_raises_key_error(inv):\n    with pytest.raises(KeyError):\n        inv.checkout(\"000\")\n\n\n@pytest.mark.parametrize(\"copies\", [-1, -10])\ndef test_negative_copies_rejected(copies):\n    with pytest.raises(ValueError, match=\"0 or more\"):\n        Inventory().add(Book(\"1\", \"x\", copies=copies))\n\n\ndef test_titles_sorted(inv):\n    inv.add(Book(\"978-0553293357\", \"Foundation\"))\n    inv.add(Book(\"978-0316769488\", \"Catcher\"))\n    assert inv.titles() == [\"Catcher\", \"Dune\", \"Foundation\"]\n\n\ndef test_cli(capsys):\n    assert main([\"978-0441013593\", \"Dune\"]) == 0\n    assert \"Dune\" in capsys.readouterr().out\nEOF\npytest -v",
        "check": "pytest reports 7 passed (parametrize counts as two tests)."
      },
      {
        "title": "Measure coverage and add a missing test",
        "body": "Coverage shows which lines never ran during tests. It does not prove the tests are good, but uncovered lines are definitely untested. Look at the Missing column, then add a test for the CLI's negative-copies error path (argparse exits with code 2).",
        "cmd": "pytest --cov=shelf --cov-report=term-missing\ncat >> tests/test_inventory.py <<'EOF'\n\n\ndef test_cli_rejects_negative_copies(capsys):\n    with pytest.raises(SystemExit) as exc:\n        main([\"1\", \"x\", \"--copies\", \"-1\"])\n    assert exc.value.code == 2\nEOF\npytest --cov=shelf --cov-report=term-missing",
        "check": "Coverage for cli.py rises to 100% after the new test."
      },
      {
        "title": "Lint and format with ruff",
        "body": "ruff is a fast linter (pyflakes, pycodestyle, isort, bugbear and more) and formatter. Plant two problems, see ruff catch them, and let it fix what it safely can.",
        "cmd": "printf 'import os\\n\\n\\ndef unused_helper(items=[]):\\n    return items\\n' > src/shelf/scratch.py\nruff check .\nruff check --fix .\nruff check .\nrm src/shelf/scratch.py\nruff format .\nruff check . && ruff format --check . && echo \"lint clean\"",
        "check": "ruff reports F401 (unused import os), which --fix removes, and B006 (mutable default argument), which you must fix by hand; after deleting the scratch file the check prints 'lint clean'."
      },
      {
        "title": "Build a wheel and test it in a clean environment",
        "body": "python -m build creates an sdist (.tar.gz) and a wheel (.whl) in dist/. Installing the wheel into a brand-new venv proves the package does not secretly depend on files in your working folder.",
        "cmd": "python -m build\nls dist/\npython -m zipfile -l dist/shelf-0.1.0-py3-none-any.whl\ndeactivate\npython3 -m venv /tmp/shelf-clean && /tmp/shelf-clean/bin/pip install dist/shelf-0.1.0-py3-none-any.whl\n/tmp/shelf-clean/bin/shelf 978-0553293357 Foundation\n/tmp/shelf-clean/bin/python -c 'import shelf; print(shelf.__version__)'\nsource .venv/bin/activate",
        "check": "The clean environment runs the shelf command and prints version 0.1.0."
      },
      {
        "title": "Pin the dev environment and commit",
        "body": "pyproject.toml states compatible ranges; a lock file records the exact versions you tested with so CI and teammates get the same thing. pip freeze is the simplest lock; tools such as uv or pip-tools produce hash-checked locks. Commit everything except what .gitignore excludes.",
        "cmd": "pip freeze --exclude-editable > requirements-dev.lock\nhead requirements-dev.lock\ngit add .\ngit status --short\ngit commit -m \"Shelf package: src layout, tests, ruff config, CLI\"",
        "check": "git status shows no .venv, dist or __pycache__ files staged."
      },
      {
        "title": "Explain the Python concepts you used",
        "body": "Write down, in your own words: what 'from shelf import Book' puts in your namespace versus 'import shelf'; why __init__.py re-exports names; how sys.path finds packages (python -c 'import sys; print(sys.path)'); which exceptions are LookupError subclasses; and what the dataclass decorator generated (print(Book.__init__.__doc__) or help(Book)). These are exactly the PCEP/PCAP topics behind the code.",
        "cmd": "python -c 'import sys; print(*sys.path, sep=\"\\n\")'\npython -c 'import shelf; print(dir(shelf))'\npython -c 'print(issubclass(KeyError, LookupError), KeyError.__mro__)'\npython -c 'from shelf import Book; help(Book)' | head -20"
      }
    ],
    "verify": [
      "pytest shows all tests passing and coverage of 90% or more.",
      "ruff check . and ruff format --check . both pass.",
      "The wheel installs into a fresh venv and the shelf command works there.",
      "You can explain the src layout, editable installs and why tools go in a dev extra."
    ],
    "deliverable": "A GitHub repository for shelf with a README that shows how to create the venv, install with pip install -e \".[dev]\", run tests and lint, plus a screenshot of the pytest coverage report.",
    "resume": "Built and packaged a Python library with a src layout and pyproject.toml, pytest test suite with fixtures and parametrization (100% line coverage), ruff linting/formatting and a console entry point; verified the wheel in a clean environment.",
    "interview": [
      "Why use a virtual environment? — It isolates each project's dependencies and Python version so upgrades in one project cannot break another or the operating system.",
      "What goes in pyproject.toml? — The build backend, project metadata and dependencies, entry points and tool settings such as pytest and ruff.",
      "What is a pytest fixture? — A function that provides set-up data or resources to tests, with a scope, so each test starts from a known state without repeated code.",
      "Is 100% coverage enough? — No. It only shows lines ran; tests must also assert the right behavior, including edge cases and error paths."
    ],
    "cleanup": [
      "deactivate",
      "rm -rf /tmp/shelf-clean",
      "Keep ~/shelf if you plan to do lab-rest-api; otherwise rm -rf ~/shelf"
    ],
    "links": [
      {
        "label": "Python Packaging User Guide",
        "url": "https://packaging.python.org/en/latest/tutorials/packaging-projects/"
      },
      {
        "label": "venv documentation",
        "url": "https://docs.python.org/3/library/venv.html"
      },
      {
        "label": "pytest documentation",
        "url": "https://docs.pytest.org/en/stable/"
      },
      {
        "label": "Ruff documentation",
        "url": "https://docs.astral.sh/ruff/"
      }
    ]
  },
  {
    "id": "lab-java-build-test",
    "title": "Java project with Maven, Gradle and JUnit 5 tests",
    "track": "Software engineering",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free (Eclipse Temurin JDK, Maven, Gradle, JUnit are open source)",
    "summary": "Install a current JDK with SDKMAN, build a small inventory library in modern Java (records, sealed interfaces, switch patterns, streams, a custom exception), drive it with JUnit 5 tests including parameterized ones, measure coverage with JaCoCo, package a runnable jar, then build the same code with Gradle and compare.",
    "realWorld": "Java runs a large share of enterprise backends, banking and Android code. Java developers are expected to use Maven or Gradle, read a pom.xml, write JUnit tests and understand the build lifecycle that CI servers run on every commit.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab (or any Linux, macOS or WSL terminal) with curl, zip and unzip",
      "About 2 GB free disk space for the JDK and dependency caches",
      "An editor; IntelliJ IDEA Community or VS Code with the Java extensions are both free"
    ],
    "requires": [
      "lab-linux-cli"
    ],
    "safety": "Dependencies come from Maven Central. Only add coordinates you have checked on central.sonatype.com; typosquatted and abandoned libraries are a real supply-chain risk.",
    "steps": [
      {
        "title": "Install the JDK, Maven and Gradle with SDKMAN",
        "body": "SDKMAN installs and switches Java toolchains per user without sudo. Pick the current LTS Temurin build (25 at the time of writing; 'sdk list java' shows the exact identifiers available to you).",
        "cmd": "sudo apt install -y zip unzip curl\ncurl -s \"https://get.sdkman.io\" | bash\nsource \"$HOME/.sdkman/bin/sdkman-init.sh\"\nsdk list java | grep -i tem | head\nsdk install java 25-tem      # use the identifier shown in the list, e.g. 25.0.1-tem\nsdk install maven\nsdk install gradle\njava -version && mvn -version && gradle --version",
        "check": "java -version reports 25 (or the LTS you chose) and mvn -version shows the same Java home."
      },
      {
        "title": "Write the pom.xml",
        "body": "The POM names the artifact (groupId:artifactId:version), sets the Java release, imports the JUnit BOM so all JUnit modules share one version, and pins plugin versions so builds are reproducible. Check the current versions on central.sonatype.com and update the numbers if newer ones exist; JaCoCo must be a version that supports your JDK.",
        "cmd": "mkdir -p ~/shelf-java && cd ~/shelf-java\ncat > pom.xml <<'EOF'\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\"\n         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.example</groupId>\n  <artifactId>shelf</artifactId>\n  <version>0.1.0-SNAPSHOT</version>\n\n  <properties>\n    <maven.compiler.release>25</maven.compiler.release>\n    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n  </properties>\n\n  <dependencyManagement>\n    <dependencies>\n      <dependency>\n        <groupId>org.junit</groupId>\n        <artifactId>junit-bom</artifactId>\n        <version>5.13.4</version>\n        <type>pom</type>\n        <scope>import</scope>\n      </dependency>\n    </dependencies>\n  </dependencyManagement>\n\n  <dependencies>\n    <dependency>\n      <groupId>org.junit.jupiter</groupId>\n      <artifactId>junit-jupiter</artifactId>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n\n  <build>\n    <plugins>\n      <plugin>\n        <groupId>org.apache.maven.plugins</groupId>\n        <artifactId>maven-compiler-plugin</artifactId>\n        <version>3.14.0</version>\n      </plugin>\n      <plugin>\n        <groupId>org.apache.maven.plugins</groupId>\n        <artifactId>maven-surefire-plugin</artifactId>\n        <version>3.5.3</version>\n      </plugin>\n      <plugin>\n        <groupId>org.apache.maven.plugins</groupId>\n        <artifactId>maven-jar-plugin</artifactId>\n        <version>3.4.2</version>\n        <configuration>\n          <archive>\n            <manifest>\n              <mainClass>com.example.shelf.App</mainClass>\n            </manifest>\n          </archive>\n        </configuration>\n      </plugin>\n      <plugin>\n        <groupId>org.jacoco</groupId>\n        <artifactId>jacoco-maven-plugin</artifactId>\n        <version>0.8.14</version>\n        <executions>\n          <execution><goals><goal>prepare-agent</goal></goals></execution>\n          <execution><id>report</id><phase>verify</phase><goals><goal>report</goal></goals></execution>\n        </executions>\n      </plugin>\n    </plugins>\n  </build>\n</project>\nEOF\nmkdir -p src/main/java/com/example/shelf src/test/java/com/example/shelf\nmvn -q validate && echo \"POM is valid\"",
        "check": "Maven prints 'POM is valid' (the first run downloads plugins into ~/.m2)."
      },
      {
        "title": "Model the domain with records and a sealed interface",
        "body": "A record is an immutable data carrier with a canonical constructor, accessors, equals, hashCode and toString; a compact constructor validates its fields. A sealed interface lists every allowed implementation, which lets a switch over it be exhaustive without a default branch.",
        "cmd": "cd ~/shelf-java/src/main/java/com/example/shelf\ncat > Book.java <<'EOF'\npackage com.example.shelf;\n\npublic record Book(String isbn, String title, int copies) {\n    public Book {\n        if (isbn == null || isbn.isBlank()) throw new IllegalArgumentException(\"isbn is required\");\n        if (copies < 0) throw new IllegalArgumentException(\"copies must be 0 or more\");\n    }\n\n    public Book withCopies(int newCopies) {\n        return new Book(isbn, title, newCopies);\n    }\n}\nEOF\ncat > OutOfStockException.java <<'EOF'\npackage com.example.shelf;\n\n/** Checked exception: callers must decide what to do when a book is unavailable. */\npublic class OutOfStockException extends Exception {\n    public OutOfStockException(String isbn) {\n        super(\"No copies left for \" + isbn);\n    }\n}\nEOF\ncat > Event.java <<'EOF'\npackage com.example.shelf;\n\npublic sealed interface Event permits Event.Added, Event.CheckedOut {\n    record Added(Book book) implements Event {}\n    record CheckedOut(String isbn, int remaining) implements Event {}\n\n    static String describe(Event e) {\n        return switch (e) {\n            case Added(Book b) -> \"added \" + b.copies() + \" x \" + b.title();\n            case CheckedOut(String isbn, int left) when left == 0 -> isbn + \" is now out of stock\";\n            case CheckedOut(String isbn, int left) -> isbn + \" checked out, \" + left + \" left\";\n        };\n    }\n}\nEOF"
      },
      {
        "title": "Write the Inventory with collections and streams",
        "body": "A TreeMap keeps ISBNs sorted. merge() combines copy counts in one call. Streams express queries such as 'titles with low stock' declaratively, and Optional makes 'may be absent' explicit instead of returning null.",
        "cmd": "cd ~/shelf-java/src/main/java/com/example/shelf\ncat > Inventory.java <<'EOF'\npackage com.example.shelf;\n\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Map;\nimport java.util.Optional;\nimport java.util.TreeMap;\n\npublic class Inventory {\n    private final Map<String, Book> books = new TreeMap<>();\n    private final List<Event> events = new ArrayList<>();\n\n    public void add(Book book) {\n        books.merge(book.isbn(), book, (old, extra) -> old.withCopies(old.copies() + extra.copies()));\n        events.add(new Event.Added(book));\n    }\n\n    public Book checkout(String isbn) throws OutOfStockException {\n        Book book = find(isbn).orElseThrow(() -> new IllegalArgumentException(\"unknown isbn \" + isbn));\n        if (book.copies() == 0) throw new OutOfStockException(isbn);\n        Book updated = book.withCopies(book.copies() - 1);\n        books.put(isbn, updated);\n        events.add(new Event.CheckedOut(isbn, updated.copies()));\n        return updated;\n    }\n\n    public Optional<Book> find(String isbn) {\n        return Optional.ofNullable(books.get(isbn));\n    }\n\n    public List<String> lowStockTitles(int threshold) {\n        return books.values().stream()\n                .filter(b -> b.copies() <= threshold)\n                .map(Book::title)\n                .sorted()\n                .toList();\n    }\n\n    public int totalCopies() {\n        return books.values().stream().mapToInt(Book::copies).sum();\n    }\n\n    public List<String> history() {\n        return events.stream().map(Event::describe).toList();\n    }\n}\nEOF\ncat > App.java <<'EOF'\npackage com.example.shelf;\n\npublic class App {\n    public static void main(String[] args) throws OutOfStockException {\n        Inventory inv = new Inventory();\n        inv.add(new Book(\"978-0441013593\", \"Dune\", 1));\n        inv.add(new Book(\"978-0553293357\", \"Foundation\", 3));\n        inv.checkout(\"978-0441013593\");\n        inv.history().forEach(System.out::println);\n        System.out.println(\"Total copies: \" + inv.totalCopies());\n    }\n}\nEOF\ncd ~/shelf-java && mvn -q compile && echo compiled",
        "check": "Maven prints 'compiled' with no errors."
      },
      {
        "title": "Write JUnit 5 tests",
        "body": "@BeforeEach gives every test a fresh Inventory. assertThrows checks the exception type and returns it so you can check the message. @ParameterizedTest with @ValueSource runs one test for several inputs. Test names describe behavior.",
        "cmd": "cd ~/shelf-java/src/test/java/com/example/shelf\ncat > InventoryTest.java <<'EOF'\npackage com.example.shelf;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\nimport java.util.List;\nimport org.junit.jupiter.api.BeforeEach;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\nimport org.junit.jupiter.params.ParameterizedTest;\nimport org.junit.jupiter.params.provider.ValueSource;\n\nclass InventoryTest {\n    private Inventory inv;\n\n    @BeforeEach\n    void setUp() {\n        inv = new Inventory();\n        inv.add(new Book(\"978-0441013593\", \"Dune\", 2));\n    }\n\n    @Test\n    @DisplayName(\"adding the same ISBN merges copy counts\")\n    void addMergesCopies() {\n        inv.add(new Book(\"978-0441013593\", \"Dune\", 3));\n        assertEquals(5, inv.totalCopies());\n    }\n\n    @Test\n    void checkoutUntilEmptyThrowsCheckedException() throws Exception {\n        inv.checkout(\"978-0441013593\");\n        inv.checkout(\"978-0441013593\");\n        OutOfStockException e = assertThrows(OutOfStockException.class, () -> inv.checkout(\"978-0441013593\"));\n        assertTrue(e.getMessage().contains(\"978-0441013593\"));\n    }\n\n    @Test\n    void unknownIsbnIsRejected() {\n        assertThrows(IllegalArgumentException.class, () -> inv.checkout(\"nope\"));\n        assertTrue(inv.find(\"nope\").isEmpty());\n    }\n\n    @ParameterizedTest\n    @ValueSource(ints = {-1, -50})\n    void negativeCopiesRejected(int copies) {\n        assertThrows(IllegalArgumentException.class, () -> new Book(\"1\", \"x\", copies));\n    }\n\n    @Test\n    void lowStockTitlesAreSorted() {\n        inv.add(new Book(\"978-0553293357\", \"Foundation\", 1));\n        inv.add(new Book(\"978-0316769488\", \"Catcher\", 9));\n        assertEquals(List.of(\"Dune\", \"Foundation\"), inv.lowStockTitles(2));\n    }\n\n    @Test\n    void historyDescribesEvents() throws Exception {\n        inv.checkout(\"978-0441013593\");\n        inv.checkout(\"978-0441013593\");\n        assertEquals(\"978-0441013593 is now out of stock\", inv.history().getLast());\n    }\n}\nEOF\ncd ~/shelf-java && mvn test",
        "check": "Surefire reports 'Tests run: 7, Failures: 0, Errors: 0' and BUILD SUCCESS."
      },
      {
        "title": "Watch a test fail and read the report",
        "body": "Break the code on purpose to see what a failure looks like, run just one test class or method, and find the XML/text reports CI servers collect. Then fix it.",
        "cmd": "cd ~/shelf-java\nsed -i 's/old.copies() + extra.copies()/old.copies()/' src/main/java/com/example/shelf/Inventory.java\nmvn -q test -Dtest=InventoryTest#addMergesCopies || true\nls target/surefire-reports/\nsed -i 's/(old, extra) -> old.withCopies(old.copies()))/(old, extra) -> old.withCopies(old.copies() + extra.copies()))/' src/main/java/com/example/shelf/Inventory.java\nmvn -q test && echo \"green again\"",
        "check": "The failure shows 'expected: <5> but was: <2>', and after the fix Maven prints 'green again'."
      },
      {
        "title": "Package, run and measure coverage",
        "body": "mvn verify runs the lifecycle up to verify: compile, test, package (the jar) and the JaCoCo report bound to verify. The manifest's Main-Class makes the jar runnable. Open the HTML coverage report in a browser.",
        "cmd": "cd ~/shelf-java\nmvn clean verify\njava -jar target/shelf-0.1.0-SNAPSHOT.jar\njar tf target/shelf-0.1.0-SNAPSHOT.jar | head\njdeps --summary target/shelf-0.1.0-SNAPSHOT.jar\nls target/site/jacoco/index.html",
        "check": "The jar prints the event history and 'Total copies: 3'; jdeps shows it depends only on java.base; the JaCoCo report exists."
      },
      {
        "title": "Inspect dependencies",
        "body": "The dependency tree shows direct and transitive dependencies and their scopes. Test-scoped dependencies such as JUnit are not packaged into the jar.",
        "cmd": "cd ~/shelf-java\nmvn dependency:tree\nmvn help:effective-pom | grep -A2 'maven-surefire-plugin' | head",
        "check": "The tree shows junit-jupiter and its transitive modules, all with scope test."
      },
      {
        "title": "Build the same code with Gradle",
        "body": "Gradle uses a Kotlin (or Groovy) script instead of XML and is the default for Android. Create a Gradle build next to Maven, generate the wrapper (gradlew) that pins the Gradle version for everyone, and run the same tests.",
        "cmd": "cd ~/shelf-java\ncat > settings.gradle.kts <<'EOF'\nrootProject.name = \"shelf\"\nEOF\ncat > build.gradle.kts <<'EOF'\nplugins {\n    application\n    jacoco\n}\n\nrepositories { mavenCentral() }\n\njava { toolchain { languageVersion = JavaLanguageVersion.of(25) } }\n\ndependencies {\n    testImplementation(platform(\"org.junit:junit-bom:5.13.4\"))\n    testImplementation(\"org.junit.jupiter:junit-jupiter\")\n    testRuntimeOnly(\"org.junit.platform:junit-platform-launcher\")\n}\n\napplication { mainClass = \"com.example.shelf.App\" }\n\njacoco { toolVersion = \"0.8.14\" }\n\ntasks.test {\n    useJUnitPlatform()\n    finalizedBy(tasks.jacocoTestReport)\n}\nEOF\ngradle wrapper\n./gradlew test run\nls build/reports/tests/test/index.html build/reports/jacoco/test/html/index.html",
        "check": "Gradle runs the same 7 tests, runs App, and writes HTML test and coverage reports under build/reports."
      },
      {
        "title": "Compare and commit",
        "body": "Write a short table: Maven vs Gradle for configuration style, lifecycle (phases vs task graph), incremental builds and caching, wrapper, and where reports land. Commit the project with target/, build/ and .gradle/ ignored; commit the wrapper files (gradlew, gradle/wrapper/) so CI does not need Gradle installed.",
        "cmd": "cd ~/shelf-java\nprintf 'target/\\nbuild/\\n.gradle/\\n.idea/\\n*.iml\\n' > .gitignore\ngit init -q && git add . && git commit -qm \"Shelf Java library with Maven, Gradle and JUnit 5\" && git log --oneline",
        "check": "The commit includes pom.xml, build.gradle.kts, gradlew and the sources, but no target/ or build/ folders."
      }
    ],
    "verify": [
      "mvn clean verify ends with BUILD SUCCESS and Tests run: 7, Failures: 0.",
      "java -jar target/shelf-0.1.0-SNAPSHOT.jar prints the history and total copies.",
      "./gradlew test passes and produces a JaCoCo HTML report.",
      "You can name the Maven lifecycle phases in order and say what each does."
    ],
    "deliverable": "A repository with the Maven and Gradle builds, and a README containing your Maven-vs-Gradle comparison table, the JaCoCo coverage percentage and a screenshot of the test report.",
    "resume": "Developed a Java 25 library using records, sealed interfaces, pattern-matching switch and streams; built it with both Maven and Gradle, tested with JUnit 5 (including parameterized tests) and tracked coverage with JaCoCo.",
    "interview": [
      "Maven lifecycle order? — validate, compile, test, package, verify, install, deploy; running a phase runs every phase before it.",
      "Checked vs unchecked exception? — Checked exceptions (extends Exception) must be caught or declared with throws; unchecked ones (RuntimeException) need not. Use checked for recoverable conditions the caller should handle.",
      "Why a BOM? — It manages the versions of related artifacts in one place so they stay consistent without repeating version numbers.",
      "Why commit the Gradle wrapper? — So every developer and CI server builds with the exact same Gradle version without installing it."
    ],
    "cleanup": [
      "rm -rf ~/shelf-java (or keep it in GitHub)",
      "Optional: rm -rf ~/.m2/repository ~/.gradle/caches to reclaim disk space",
      "Optional: sdk uninstall gradle <version> / sdk uninstall maven <version> if you no longer need them"
    ],
    "links": [
      {
        "label": "Maven: Introduction to the build lifecycle",
        "url": "https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html"
      },
      {
        "label": "JUnit 5 User Guide",
        "url": "https://docs.junit.org/current/user-guide/"
      },
      {
        "label": "Gradle: Building Java applications",
        "url": "https://docs.gradle.org/current/samples/sample_building_java_applications.html"
      },
      {
        "label": "SDKMAN installation",
        "url": "https://sdkman.io/install/"
      }
    ]
  },
  {
    "id": "lab-rest-api",
    "title": "Build, test and document a REST API with FastAPI and OpenAPI",
    "track": "Software engineering",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free",
    "summary": "Build the Shelf book API with FastAPI, Pydantic validation and SQLAlchemy (SQLite locally, Postgres later), using correct HTTP methods and status codes, pagination and a health endpoint. Test it with pytest and TestClient, explore the generated OpenAPI docs, export and lint the spec, and call the API with curl.",
    "realWorld": "Almost every modern system talks over HTTP APIs. Backend and platform engineers design resources, status codes and validation, and publish an OpenAPI contract that frontends, partners and API gateways use. Security reviewers read that same contract to find unauthenticated or over-exposed endpoints.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab with Python 3.11+ and python3-venv",
      "curl and jq (sudo apt install -y curl jq)",
      "Docker (for the OpenAPI linter; also needed in the next lab)"
    ],
    "requires": [
      "lab-python-project"
    ],
    "safety": "Run the API on 127.0.0.1 only. It has no authentication yet, so never expose it on a public interface or cloud host as-is.",
    "steps": [
      {
        "title": "Create the project",
        "body": "This API becomes the application you containerize, test in CI, deploy to Kubernetes and provision with Terraform in the following labs, so use the same folder name. fastapi[standard] brings Uvicorn (the ASGI server), the fastapi CLI and httpx (used by TestClient).",
        "cmd": "mkdir -p ~/shelf-api/app ~/shelf-api/tests && cd ~/shelf-api\ngit init -q\npython3 -m venv .venv && source .venv/bin/activate\ncat > requirements.txt <<'EOF'\nfastapi[standard]>=0.115\nsqlalchemy>=2.0\npsycopg[binary]>=3.2\nEOF\ncat > requirements-dev.txt <<'EOF'\npytest>=8\npytest-cov>=5\nruff>=0.6\nEOF\npip install -r requirements.txt -r requirements-dev.txt\nprintf '.venv/\\n__pycache__/\\n*.db\\n.env\\n.coverage\\ncoverage.xml\\njunit.xml\\n' > .gitignore\ntouch app/__init__.py",
        "check": "pip finishes and python -c 'import fastapi, sqlalchemy' prints nothing (no error)."
      },
      {
        "title": "Add the database layer",
        "body": "Configuration comes from the environment (a twelve-factor principle): DATABASE_URL defaults to a local SQLite file but can point at Postgres in Docker or Kubernetes without code changes. SQLAlchemy 2.0's typed Mapped columns define the table.",
        "cmd": "cat > app/db.py <<'EOF'\n\"\"\"Database engine, session factory and the books table.\"\"\"\n\nimport os\n\nfrom sqlalchemy import Integer, String, create_engine\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker\n\nDATABASE_URL = os.getenv(\"DATABASE_URL\", \"sqlite:///./shelf.db\")\n_connect_args = {\"check_same_thread\": False} if DATABASE_URL.startswith(\"sqlite\") else {}\nengine = create_engine(DATABASE_URL, connect_args=_connect_args, pool_pre_ping=True)\nSessionLocal = sessionmaker(bind=engine)\n\n\nclass Base(DeclarativeBase):\n    pass\n\n\nclass BookRow(Base):\n    __tablename__ = \"books\"\n\n    isbn: Mapped[str] = mapped_column(String(17), primary_key=True)\n    title: Mapped[str] = mapped_column(String(200))\n    copies: Mapped[int] = mapped_column(Integer, default=1)\nEOF"
      },
      {
        "title": "Write the API",
        "body": "Pydantic models validate every request body and document it in OpenAPI. Annotated dependencies inject a database session per request. Each operation uses the right method and status code: POST returns 201 with a Location header, a duplicate returns 409, a missing book 404, DELETE 204, and invalid input is rejected with 422 automatically.",
        "cmd": "cat > app/main.py <<'EOF'\n\"\"\"Shelf API: a small book inventory service.\"\"\"\n\nfrom collections.abc import Iterator\nfrom contextlib import asynccontextmanager\nfrom typing import Annotated\n\nfrom fastapi import Depends, FastAPI, HTTPException, Query, Response, status\nfrom pydantic import BaseModel, ConfigDict, Field\nfrom sqlalchemy import select\nfrom sqlalchemy.orm import Session\n\nfrom app.db import Base, BookRow, SessionLocal, engine\n\nAPI_VERSION = \"1.0.0\"\n\n\n@asynccontextmanager\nasync def lifespan(_: FastAPI):\n    Base.metadata.create_all(engine)\n    yield\n\n\napp = FastAPI(\n    title=\"Shelf API\",\n    version=API_VERSION,\n    summary=\"Book inventory service used in the software engineering labs.\",\n    lifespan=lifespan,\n)\n\n\ndef get_db() -> Iterator[Session]:\n    with SessionLocal() as db:\n        yield db\n\n\nDb = Annotated[Session, Depends(get_db)]\n\n\nclass BookUpdate(BaseModel):\n    title: str = Field(min_length=1, max_length=200, examples=[\"Dune\"])\n    copies: int = Field(default=1, ge=0, le=1000)\n\n\nclass BookIn(BookUpdate):\n    isbn: str = Field(pattern=r\"^[0-9-]{10,17}$\", examples=[\"978-0441013593\"])\n\n\nclass BookOut(BookIn):\n    model_config = ConfigDict(from_attributes=True)\n\n\nclass Problem(BaseModel):\n    detail: str\n\n\nNOT_FOUND = {404: {\"model\": Problem, \"description\": \"No book with that ISBN\"}}\n\n\ndef _get_or_404(db: Session, isbn: str) -> BookRow:\n    row = db.get(BookRow, isbn)\n    if row is None:\n        raise HTTPException(status.HTTP_404_NOT_FOUND, \"Book not found\")\n    return row\n\n\n@app.get(\"/health\", tags=[\"ops\"])\ndef health() -> dict[str, str]:\n    return {\"status\": \"ok\", \"version\": API_VERSION}\n\n\n@app.get(\"/books\", tags=[\"books\"])\ndef list_books(\n    db: Db,\n    limit: Annotated[int, Query(ge=1, le=100)] = 20,\n    offset: Annotated[int, Query(ge=0)] = 0,\n) -> list[BookOut]:\n    rows = db.scalars(select(BookRow).order_by(BookRow.isbn).limit(limit).offset(offset))\n    return [BookOut.model_validate(r) for r in rows]\n\n\n@app.post(\n    \"/books\",\n    status_code=status.HTTP_201_CREATED,\n    tags=[\"books\"],\n    responses={409: {\"model\": Problem, \"description\": \"ISBN already exists\"}},\n)\ndef create_book(book: BookIn, db: Db, response: Response) -> BookOut:\n    if db.get(BookRow, book.isbn) is not None:\n        raise HTTPException(status.HTTP_409_CONFLICT, \"Book already exists\")\n    row = BookRow(**book.model_dump())\n    db.add(row)\n    db.commit()\n    response.headers[\"Location\"] = f\"/books/{row.isbn}\"\n    return BookOut.model_validate(row)\n\n\n@app.get(\"/books/{isbn}\", tags=[\"books\"], responses=NOT_FOUND)\ndef get_book(isbn: str, db: Db) -> BookOut:\n    return BookOut.model_validate(_get_or_404(db, isbn))\n\n\n@app.put(\"/books/{isbn}\", tags=[\"books\"], responses=NOT_FOUND)\ndef replace_book(isbn: str, body: BookUpdate, db: Db) -> BookOut:\n    row = _get_or_404(db, isbn)\n    row.title, row.copies = body.title, body.copies\n    db.commit()\n    return BookOut.model_validate(row)\n\n\n@app.delete(\"/books/{isbn}\", status_code=status.HTTP_204_NO_CONTENT, tags=[\"books\"], responses=NOT_FOUND)\ndef delete_book(isbn: str, db: Db) -> None:\n    db.delete(_get_or_404(db, isbn))\n    db.commit()\nEOF\nfastapi dev app/main.py",
        "check": "Uvicorn starts on http://127.0.0.1:8000 with auto-reload. Leave it running and use a second terminal."
      },
      {
        "title": "Call the API with curl",
        "body": "Exercise every status code from the command line. -i shows the status line and headers.",
        "cmd": "curl -s localhost:8000/health | jq\ncurl -si -X POST localhost:8000/books -H 'content-type: application/json' \\\n  -d '{\"isbn\":\"978-0441013593\",\"title\":\"Dune\",\"copies\":2}'\ncurl -s -o /dev/null -w '%{http_code}\\n' -X POST localhost:8000/books -H 'content-type: application/json' \\\n  -d '{\"isbn\":\"978-0441013593\",\"title\":\"Dune\"}'\ncurl -s -X POST localhost:8000/books -H 'content-type: application/json' -d '{\"isbn\":\"abc\",\"title\":\"\",\"copies\":-1}' | jq\ncurl -s 'localhost:8000/books?limit=5' | jq\ncurl -s -X PUT localhost:8000/books/978-0441013593 -H 'content-type: application/json' -d '{\"title\":\"Dune\",\"copies\":5}' | jq\ncurl -si -X DELETE localhost:8000/books/978-0441013593 | head -1\ncurl -s -o /dev/null -w '%{http_code}\\n' localhost:8000/books/978-0441013593",
        "check": "You see 201 with a Location header, 409 for the duplicate, 422 with three validation errors, 200 lists, 204 for delete and 404 afterwards."
      },
      {
        "title": "Explore the generated OpenAPI documentation",
        "body": "FastAPI builds an OpenAPI 3.1 document from your routes and models. Open http://127.0.0.1:8000/docs (Swagger UI) and /redoc in a browser on the VM (or forward the port with ssh -L 8000:127.0.0.1:8000). Try 'Try it out' on POST /books. Then export the spec to a file you can commit and hand to consumers.",
        "cmd": "curl -s localhost:8000/openapi.json | jq '.info, (.paths | keys)'\ncurl -s localhost:8000/openapi.json | jq '.components.schemas.BookIn'\ncurl -s localhost:8000/openapi.json | jq . > openapi.json",
        "check": "The paths list /health, /books and /books/{isbn}, and the BookIn schema shows the pattern, minLength and minimum constraints you declared."
      },
      {
        "title": "Lint the API contract",
        "body": "Redocly CLI checks an OpenAPI file against good-practice rules (operation ids, descriptions, security, servers, license). Warnings are normal for a first draft; read them and fix at least two by adding metadata in the FastAPI constructor (for example contact and license_info) or descriptions on routes.",
        "cmd": "docker run --rm -v \"$PWD:/spec\" redocly/cli lint openapi.json",
        "check": "Redocly lists errors and warnings with rule names such as info-license or operation-4xx-response."
      },
      {
        "title": "Write tests with TestClient",
        "body": "TestClient calls the app in-process, so tests are fast and need no running server. The conftest sets DATABASE_URL only if it is not already set, which lets CI run the same tests against Postgres later. Each test gets fresh tables.",
        "cmd": "cat > tests/conftest.py <<'EOF'\nimport os\n\nos.environ.setdefault(\"DATABASE_URL\", \"sqlite:///./test.db\")\n\nimport pytest  # noqa: E402\nfrom fastapi.testclient import TestClient  # noqa: E402\n\nfrom app.db import Base, engine  # noqa: E402\nfrom app.main import app  # noqa: E402\n\n\n@pytest.fixture\ndef client():\n    Base.metadata.drop_all(engine)\n    Base.metadata.create_all(engine)\n    with TestClient(app) as c:\n        yield c\nEOF\ncat > tests/test_api.py <<'EOF'\nDUNE = {\"isbn\": \"978-0441013593\", \"title\": \"Dune\", \"copies\": 2}\n\n\ndef test_health(client):\n    assert client.get(\"/health\").json()[\"status\"] == \"ok\"\n\n\ndef test_create_then_get(client):\n    r = client.post(\"/books\", json=DUNE)\n    assert r.status_code == 201\n    assert r.headers[\"location\"] == \"/books/978-0441013593\"\n    assert client.get(\"/books/978-0441013593\").json() == DUNE\n\n\ndef test_duplicate_is_conflict(client):\n    client.post(\"/books\", json=DUNE)\n    assert client.post(\"/books\", json=DUNE).status_code == 409\n\n\ndef test_validation_errors(client):\n    r = client.post(\"/books\", json={\"isbn\": \"abc\", \"title\": \"\", \"copies\": -1})\n    assert r.status_code == 422\n    assert len(r.json()[\"detail\"]) == 3\n\n\ndef test_missing_book_is_404(client):\n    assert client.get(\"/books/000-0000000000\").status_code == 404\n\n\ndef test_update_and_delete(client):\n    client.post(\"/books\", json=DUNE)\n    r = client.put(\"/books/978-0441013593\", json={\"title\": \"Dune\", \"copies\": 7})\n    assert r.json()[\"copies\"] == 7\n    assert client.delete(\"/books/978-0441013593\").status_code == 204\n    assert client.get(\"/books/978-0441013593\").status_code == 404\n\n\ndef test_pagination_limits(client):\n    for i in range(3):\n        client.post(\"/books\", json={\"isbn\": f\"978-000000000{i}\", \"title\": f\"B{i}\"})\n    assert len(client.get(\"/books?limit=2\").json()) == 2\n    assert client.get(\"/books?limit=500\").status_code == 422\n\n\ndef test_openapi_contract(client):\n    spec = client.get(\"/openapi.json\").json()\n    assert set(spec[\"paths\"]) == {\"/health\", \"/books\", \"/books/{isbn}\"}\nEOF\ncat > pyproject.toml <<'EOF'\n[tool.pytest.ini_options]\ntestpaths = [\"tests\"]\npythonpath = [\".\"]\n\n[tool.ruff]\nline-length = 110\n\n[tool.ruff.lint]\nselect = [\"E\", \"F\", \"I\", \"B\", \"UP\"]\nEOF\npytest -v --cov=app --cov-report=term-missing",
        "check": "8 tests pass and coverage of app/ is above 95%."
      },
      {
        "title": "Lint, format and commit",
        "body": "Keep the same quality bar as lab-python-project. Add test.db to .gitignore via the *.db pattern you already have.",
        "cmd": "ruff check --fix . && ruff format . && ruff check . && ruff format --check .\ngit add .\ngit commit -m \"Shelf API: FastAPI + SQLAlchemy, tests, OpenAPI spec\"",
        "check": "ruff reports no issues and the commit contains app/, tests/, requirements files and openapi.json."
      },
      {
        "title": "Review the API design like a reviewer would",
        "body": "Write a short design note: resource naming (plural nouns, no verbs in paths), which methods are idempotent (GET, PUT, DELETE) and which are not (POST), why pagination has an upper limit (protects the database), why errors share one shape, and what is missing before production: authentication (OAuth2/OIDC bearer tokens, see lab-iam-sso), rate limiting, request size limits and structured logging. Map each gap to the OWASP API Security Top 10 (for example API4 Unrestricted Resource Consumption)."
      }
    ],
    "verify": [
      "curl shows 201, 409, 422, 200, 204 and 404 for the right requests.",
      "pytest passes all 8 tests with more than 95% coverage.",
      "openapi.json is committed and Redocly lint runs against it.",
      "You can explain why POST is not idempotent and PUT is."
    ],
    "deliverable": "The shelf-api repository with openapi.json, a README showing curl examples for each endpoint and status code, and your design note listing the production gaps mapped to the OWASP API Security Top 10.",
    "resume": "Designed and built a REST API in Python with FastAPI, Pydantic and SQLAlchemy, with correct HTTP semantics, input validation and pagination; published an OpenAPI 3.1 contract linted with Redocly and covered the service with pytest integration tests.",
    "interview": [
      "PUT vs PATCH vs POST? — POST creates (not idempotent); PUT replaces a resource at a known URL (idempotent); PATCH changes part of it.",
      "What status code for invalid input, a duplicate and a missing item? — 422 or 400 for invalid input, 409 Conflict for a duplicate, 404 Not Found for a missing item.",
      "Why publish an OpenAPI spec? — It is the machine-readable contract: it generates docs and client SDKs, drives contract tests and gateways, and shows reviewers the full attack surface.",
      "How do you keep list endpoints safe? — Paginate with a maximum page size, filter server-side, and never return unbounded result sets."
    ],
    "cleanup": [
      "Stop fastapi dev with Ctrl+C and deactivate the venv.",
      "rm -f shelf.db test.db",
      "Keep ~/shelf-api: lab-docker-compose-app builds it into an image."
    ],
    "links": [
      {
        "label": "FastAPI tutorial",
        "url": "https://fastapi.tiangolo.com/tutorial/"
      },
      {
        "label": "OpenAPI Specification",
        "url": "https://spec.openapis.org/oas/latest.html"
      },
      {
        "label": "SQLAlchemy 2.0 ORM quick start",
        "url": "https://docs.sqlalchemy.org/en/20/orm/quickstart.html"
      },
      {
        "label": "OWASP API Security Top 10",
        "url": "https://owasp.org/API-Security/"
      },
      {
        "label": "Redocly CLI lint",
        "url": "https://redocly.com/docs/cli/commands/lint"
      }
    ]
  },
  {
    "id": "lab-docker-compose-app",
    "title": "Containerize the API: multi-stage Dockerfile, non-root user and Compose with Postgres",
    "track": "Software engineering",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free (Docker Engine and public images)",
    "summary": "Package the Shelf API into a small multi-stage image that runs as a non-root user with a health check, use layer caching well, then run it with Docker Compose next to PostgreSQL with a health-gated startup, a named volume, environment-based configuration and no database port exposed. Finish by tagging a versioned image for the next labs.",
    "realWorld": "Containers are how most teams ship services to Kubernetes, ECS, Azure Container Apps and App Service. Developers are expected to write efficient Dockerfiles and Compose files for local development; reviewers check for root users, bloated images, baked-in secrets and exposed databases.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab with Docker Engine and the Compose plugin (docker compose version)",
      "The ~/shelf-api project from lab-rest-api",
      "curl and jq"
    ],
    "requires": [
      "lab-rest-api"
    ],
    "safety": "Publish ports on 127.0.0.1 only. Keep passwords in a git-ignored .env file, never in the Dockerfile or compose.yaml. For image scanning and deeper runtime hardening (read-only root, dropped capabilities, distroless) see lab-container-security.",
    "steps": [
      {
        "title": "Add a .dockerignore",
        "body": "The build context is everything Docker sends to the builder. Excluding the venv, git history, databases and tests makes builds faster and stops secrets such as .env from ending up in an image layer.",
        "cmd": "cd ~/shelf-api\ncat > .dockerignore <<'EOF'\n.venv\n.git\n__pycache__\n*.db\n.env\ntests\n.coverage\ncoverage.xml\njunit.xml\nEOF"
      },
      {
        "title": "Build a naive single-stage image first",
        "body": "This is the kind of Dockerfile you often find in real repositories. Record its size and user so you can compare.",
        "cmd": "cat > Dockerfile.naive <<'EOF'\nFROM python:3.12\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\nEOF\ndocker build -f Dockerfile.naive -t shelf-api:naive .\ndocker images shelf-api\ndocker run --rm shelf-api:naive id",
        "check": "The naive image is around 1.2 GB and id prints uid=0(root)."
      },
      {
        "title": "Write a multi-stage Dockerfile",
        "body": "Stage one installs dependencies into a virtual environment; stage two copies only that venv and the app code onto a slim base, so pip caches and build tools never reach the final image. Copy requirements.txt before the code so the slow pip layer is cached until dependencies change. A fixed numeric UID lets Kubernetes verify runAsNonRoot. The SQLite default points at /tmp because the non-root user cannot write to /app.",
        "cmd": "cat > Dockerfile <<'EOF'\n# syntax=docker/dockerfile:1\nFROM python:3.12-slim AS build\nENV PIP_NO_CACHE_DIR=1 PIP_DISABLE_PIP_VERSION_CHECK=1\nRUN python -m venv /venv\nENV PATH=/venv/bin:$PATH\nCOPY requirements.txt /tmp/requirements.txt\nRUN pip install -r /tmp/requirements.txt\n\nFROM python:3.12-slim AS runtime\nENV PYTHONDONTWRITEBYTECODE=1 \\\n    PYTHONUNBUFFERED=1 \\\n    PATH=/venv/bin:$PATH \\\n    DATABASE_URL=sqlite:////tmp/shelf.db\nRUN useradd --system --uid 10001 --no-create-home --shell /usr/sbin/nologin app\nWORKDIR /app\nCOPY --from=build /venv /venv\nCOPY app/ ./app/\nUSER 10001\nEXPOSE 8000\nHEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \\\n  CMD [\"python\", \"-c\", \"import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=2)\"]\nCMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\nEOF\ndocker build -t shelf-api:dev .\ndocker images shelf-api\ndocker run --rm shelf-api:dev id\ndocker history shelf-api:dev | head -12",
        "check": "shelf-api:dev is several hundred MB smaller than the naive image and id prints uid=10001."
      },
      {
        "title": "Run the container and watch the health check",
        "body": "Run it detached with the port bound to localhost. Docker runs the HEALTHCHECK command inside the container; the status moves from starting to healthy.",
        "cmd": "docker run -d --name shelf-solo -p 127.0.0.1:8000:8000 shelf-api:dev\nsleep 15\ndocker ps --filter name=shelf-solo --format '{{.Names}}  {{.Status}}'\ncurl -s localhost:8000/health | jq\ndocker inspect --format '{{json .State.Health}}' shelf-solo | jq '.Status, .Log[-1].ExitCode'\ndocker logs shelf-solo | tail -5\ndocker rm -f shelf-solo",
        "check": "docker ps shows '(healthy)' and the health endpoint returns status ok."
      },
      {
        "title": "Prove the layer cache works",
        "body": "Change only application code and rebuild: the pip layer comes from cache. Then change requirements.txt and see the expensive layer rebuild. This ordering is the single biggest build-speed win.",
        "cmd": "sed -i 's/API_VERSION = \"1.0.0\"/API_VERSION = \"1.0.1\"/' app/main.py\ntime docker build -t shelf-api:dev . 2>&1 | grep -E 'CACHED|pip install' | head\nsed -i 's/API_VERSION = \"1.0.1\"/API_VERSION = \"1.0.0\"/' app/main.py",
        "check": "The rebuild shows CACHED for the pip install step and finishes in a few seconds."
      },
      {
        "title": "Create the environment file",
        "body": "Compose reads .env from the project folder for variable substitution. It is already in .gitignore and .dockerignore. Generate a random password rather than typing one.",
        "cmd": "echo \"POSTGRES_PASSWORD=$(openssl rand -hex 16)\" > .env\nchmod 600 .env\ngit check-ignore -v .env",
        "check": "git check-ignore confirms .env is ignored."
      },
      {
        "title": "Write compose.yaml with Postgres",
        "body": "The db service has a health check using pg_isready, a named volume for data and no published port, so only containers on the Compose network can reach it (by the service name 'db'). The api waits with depends_on condition service_healthy, gets its connection string from the environment, and is published on localhost only.",
        "cmd": "cat > compose.yaml <<'EOF'\nservices:\n  db:\n    image: postgres:17-alpine\n    environment:\n      POSTGRES_DB: shelf\n      POSTGRES_USER: shelf\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?set POSTGRES_PASSWORD in .env}\n    volumes:\n      - dbdata:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U shelf -d shelf\"]\n      interval: 5s\n      timeout: 3s\n      retries: 10\n    restart: unless-stopped\n\n  api:\n    build: .\n    image: shelf-api:dev\n    environment:\n      DATABASE_URL: postgresql+psycopg://shelf:${POSTGRES_PASSWORD}@db:5432/shelf\n    ports:\n      - \"127.0.0.1:8000:8000\"\n    depends_on:\n      db:\n        condition: service_healthy\n    restart: unless-stopped\n\nvolumes:\n  dbdata:\nEOF\ndocker compose config --quiet && echo \"compose file OK\"\ndocker compose up -d --build\ndocker compose ps",
        "check": "docker compose ps shows db (healthy) and api (healthy) after a few seconds; the db has no host port."
      },
      {
        "title": "Use the stack",
        "body": "Create data through the API, then read it straight from Postgres with psql inside the db container. docker compose logs shows both services' output with prefixes.",
        "cmd": "curl -s -X POST localhost:8000/books -H 'content-type: application/json' -d '{\"isbn\":\"978-0441013593\",\"title\":\"Dune\",\"copies\":2}' | jq\ncurl -s localhost:8000/books | jq\ndocker compose exec db psql -U shelf -d shelf -c 'SELECT * FROM books;'\ndocker compose logs --tail 5 api\nss -tlnp | grep -E ':5432|:8000' || true",
        "check": "psql shows the Dune row, and ss shows only 127.0.0.1:8000 listening on the host (no 5432)."
      },
      {
        "title": "Prove data persists and understand down -v",
        "body": "Containers are disposable; the named volume keeps the data. 'down' removes containers and the network but keeps volumes; 'down -v' deletes volumes too.",
        "cmd": "docker compose down\ndocker compose up -d\nsleep 10\ncurl -s localhost:8000/books | jq length\ndocker volume ls | grep dbdata",
        "check": "The book is still there (length 1) after recreating the containers."
      },
      {
        "title": "Troubleshoot a broken dependency",
        "body": "Stop the database while the API is running and observe the failure mode, then recover. Knowing how to read container health, logs and exit codes is most of container troubleshooting.",
        "cmd": "docker compose stop db\ncurl -s -o /dev/null -w '%{http_code}\\n' localhost:8000/books\ndocker compose logs --tail 10 api\ndocker compose start db\nsleep 8\ncurl -s -o /dev/null -w '%{http_code}\\n' localhost:8000/books",
        "check": "The API returns 500 while the database is down (logs show a connection error) and 200 again after start; the health endpoint stayed up because it does not check the database, which you should note as a design choice."
      },
      {
        "title": "Tag a versioned image and commit",
        "body": "Mutable tags like dev or latest make it impossible to know what is running. Tag an immutable version (and the git commit) for the Kubernetes and Terraform labs.",
        "cmd": "docker tag shelf-api:dev shelf-api:1.0\ndocker tag shelf-api:dev shelf-api:$(git rev-parse --short HEAD)\ndocker images shelf-api\ndocker image inspect shelf-api:1.0 --format '{{.Config.User}} {{.Size}}'\ngit add Dockerfile Dockerfile.naive .dockerignore compose.yaml\ngit commit -m \"Multi-stage Dockerfile and Compose stack with Postgres\"",
        "check": "shelf-api:1.0 exists with user 10001."
      }
    ],
    "verify": [
      "docker images shows shelf-api:dev much smaller than shelf-api:naive, and it runs as uid 10001.",
      "docker compose ps shows both services healthy and no host port for Postgres.",
      "Books survive docker compose down / up.",
      "You can explain why requirements.txt is copied before the application code."
    ],
    "deliverable": "Your Dockerfile and compose.yaml in the shelf-api repository, plus a README table comparing naive vs multi-stage (size, user, build time on a code-only change) and a screenshot of docker compose ps with both services healthy.",
    "resume": "Containerized a Python REST API with a multi-stage Dockerfile running as a non-root user with health checks, cutting image size by more than half, and built a Docker Compose development stack with PostgreSQL, health-gated startup and persistent volumes.",
    "interview": [
      "Why multi-stage builds? — Build tools and caches stay in the builder stage, so the final image is smaller, faster to pull and has fewer packages to patch.",
      "How does layer caching work? — Each instruction is a layer reused if its inputs did not change; put rarely changing steps (dependencies) before frequently changing ones (code).",
      "CMD vs ENTRYPOINT? — ENTRYPOINT sets the executable; CMD gives default arguments (or the whole command if there is no ENTRYPOINT) and is easily overridden at docker run.",
      "How should a container get its database password? — At runtime from the environment or a mounted secret file provided by the orchestrator, never baked into the image."
    ],
    "cleanup": [
      "docker compose down -v (removes containers, network and the database volume)",
      "docker rmi shelf-api:naive",
      "Keep shelf-api:1.0 for lab-kubernetes-kind and lab-terraform-docker; remove it later with docker rmi shelf-api:1.0 shelf-api:dev",
      "rm .env when you are completely done"
    ],
    "links": [
      {
        "label": "Docker: Multi-stage builds",
        "url": "https://docs.docker.com/build/building/multi-stage/"
      },
      {
        "label": "Docker: Build cache",
        "url": "https://docs.docker.com/build/cache/"
      },
      {
        "label": "Compose file reference",
        "url": "https://docs.docker.com/reference/compose-file/"
      },
      {
        "label": "Postgres official image",
        "url": "https://hub.docker.com/_/postgres"
      }
    ]
  },
  {
    "id": "lab-github-actions-ci",
    "title": "CI pipeline with GitHub Actions: lint, test matrix, Postgres service and image build",
    "track": "Software engineering",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free (GitHub Actions minutes are free on public repositories; private repositories include a monthly free allowance)",
    "summary": "Put the Shelf API under continuous integration: a workflow that lints with ruff, runs pytest across three Python versions with pip caching, runs integration tests against a real Postgres service container, uploads test reports, and builds the Docker image with Buildx layer caching, pushing to GitHub Container Registry only from main. Then make the checks required and watch a broken pull request get blocked.",
    "realWorld": "CI is the safety net of every professional team: no change merges until lint, tests and the build pass. DevOps, platform and developer roles all maintain these pipelines, and questions about caching, matrices, secrets and least-privilege tokens are common in interviews and developer certifications.",
    "youWillNeed": [
      "The ~/shelf-api repository from lab-rest-api and lab-docker-compose-app",
      "A free GitHub account and the gh CLI logged in (lab-git-workflow)",
      "A browser to view the Actions tab"
    ],
    "requires": [
      "lab-docker-compose-app",
      "lab-git-workflow"
    ],
    "safety": "Give the workflow the least permissions it needs (contents: read by default; packages: write only on the image job). Never echo secrets in logs. Pin third-party actions to a release tag or, better, a full commit SHA. Security scanning (SAST, SCA, secrets) is covered in lab-secure-sdlc and can be added as another job.",
    "steps": [
      {
        "title": "Push the repository to GitHub",
        "body": "Create a repository for shelf-api and push main. A public repository gets unlimited free Actions minutes; private works too within your monthly allowance.",
        "cmd": "cd ~/shelf-api\ngit status --short\ngh repo create shelf-api --public --source=. --remote=origin --push\ngh repo view --web",
        "check": "The repository page shows your code, Dockerfile and compose.yaml."
      },
      {
        "title": "Create the workflow skeleton",
        "body": "A workflow is YAML in .github/workflows. It runs on pushes to main and on every pull request. The top-level permissions block makes the GITHUB_TOKEN read-only unless a job asks for more. concurrency cancels outdated runs of the same branch to save minutes.",
        "cmd": "mkdir -p .github/workflows\ncat > .github/workflows/ci.yml <<'EOF'\nname: ci\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\npermissions:\n  contents: read\n\nconcurrency:\n  group: ci-${{ github.ref }}\n  cancel-in-progress: true\n\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: \"3.12\"\n          cache: pip\n          cache-dependency-path: requirements*.txt\n      - run: pip install -r requirements-dev.txt\n      - run: ruff check .\n      - run: ruff format --check .\nEOF\ngit add .github/workflows/ci.yml\ngit commit -m \"CI: lint job\"\ngit push\ngh run watch",
        "check": "gh run watch shows the lint job complete successfully."
      },
      {
        "title": "Add a unit test matrix with caching",
        "body": "A matrix runs the same job for each Python version in parallel. setup-python's pip cache restores downloaded wheels keyed on the requirements files, so later runs install much faster. Test reports are uploaded as artifacts even if tests fail (if: always()).",
        "cmd": "cat >> .github/workflows/ci.yml <<'EOF'\n\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      fail-fast: false\n      matrix:\n        python-version: [\"3.11\", \"3.12\", \"3.13\"]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: ${{ matrix.python-version }}\n          cache: pip\n          cache-dependency-path: requirements*.txt\n      - run: pip install -r requirements.txt -r requirements-dev.txt\n      - run: pytest --junitxml=junit.xml --cov=app --cov-report=xml --cov-report=term\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: test-results-${{ matrix.python-version }}\n          path: |\n            junit.xml\n            coverage.xml\nEOF\ngit commit -am \"CI: pytest matrix with pip cache and reports\"\ngit push\ngh run watch",
        "check": "Three test jobs (3.11, 3.12, 3.13) pass; the run summary lists three downloadable artifacts. On the second run the setup-python log shows 'Cache restored'."
      },
      {
        "title": "Run integration tests against a Postgres service container",
        "body": "SQLite hides real database differences. A service container starts Postgres next to the job; the health options make the job wait until it accepts connections. Because conftest.py only sets DATABASE_URL when it is missing, the same tests now run against Postgres.",
        "cmd": "cat >> .github/workflows/ci.yml <<'EOF'\n\n  integration:\n    runs-on: ubuntu-latest\n    services:\n      postgres:\n        image: postgres:17-alpine\n        env:\n          POSTGRES_DB: shelf\n          POSTGRES_USER: shelf\n          POSTGRES_PASSWORD: ci-only-password\n        ports:\n          - 5432:5432\n        options: >-\n          --health-cmd \"pg_isready -U shelf -d shelf\"\n          --health-interval 5s\n          --health-timeout 3s\n          --health-retries 10\n    env:\n      DATABASE_URL: postgresql+psycopg://shelf:ci-only-password@localhost:5432/shelf\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: \"3.12\"\n          cache: pip\n          cache-dependency-path: requirements*.txt\n      - run: pip install -r requirements.txt -r requirements-dev.txt\n      - run: pytest -v\nEOF\ngit commit -am \"CI: integration tests against Postgres\"\ngit push\ngh run watch",
        "check": "The integration job's log shows the postgres service starting and all tests passing against it. The throwaway password is fine here because the database only exists inside the job."
      },
      {
        "title": "Build and publish the image with Buildx caching",
        "body": "The image job runs only after lint and tests pass (needs). It grants itself packages: write to push to GitHub Container Registry (ghcr.io) using the built-in GITHUB_TOKEN, so no personal token is stored. metadata-action creates tags from the commit SHA and branch. The GitHub Actions cache backend (type=gha) reuses layers between runs. Pull requests build but do not push.",
        "cmd": "cat >> .github/workflows/ci.yml <<'EOF'\n\n  image:\n    needs: [lint, test, integration]\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      packages: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: docker/setup-buildx-action@v3\n      - uses: docker/login-action@v3\n        if: github.event_name == 'push'\n        with:\n          registry: ghcr.io\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n      - id: meta\n        uses: docker/metadata-action@v5\n        with:\n          images: ghcr.io/${{ github.repository }}\n          tags: |\n            type=sha\n            type=ref,event=branch\n      - uses: docker/build-push-action@v6\n        with:\n          context: .\n          push: ${{ github.event_name == 'push' }}\n          tags: ${{ steps.meta.outputs.tags }}\n          labels: ${{ steps.meta.outputs.labels }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\nEOF\ngit commit -am \"CI: build and push image to GHCR with layer cache\"\ngit push\ngh run watch",
        "check": "The image job pushes ghcr.io/<you>/shelf-api with a sha-xxxxxxx tag and a main tag; it appears under your profile's Packages."
      },
      {
        "title": "Pull the image CI built",
        "body": "What CI publishes is what you deploy. Pull it by its SHA tag and run it locally. New packages are private by default; log in to pull, or make the package public in its settings.",
        "cmd": "gh auth token | docker login ghcr.io -u \"$(gh api user --jq .login)\" --password-stdin\nIMAGE=ghcr.io/$(gh api user --jq .login | tr 'A-Z' 'a-z')/shelf-api:sha-$(git rev-parse --short=7 HEAD)\ndocker pull \"$IMAGE\"\ndocker run --rm -d --name ci-built -p 127.0.0.1:8001:8000 \"$IMAGE\" && sleep 5 && curl -s localhost:8001/health && docker rm -f ci-built",
        "check": "The pulled image answers /health with status ok. If the pull is denied, your gh token may need the read:packages scope: gh auth refresh -s read:packages."
      },
      {
        "title": "Require the checks before merging",
        "body": "In Settings > Rules > Rulesets, create (or edit) a ruleset for the default branch: require a pull request and 'Require status checks to pass', adding lint, test (3.11), test (3.12), test (3.13) and integration. Now nothing reaches main without green CI.",
        "check": "The ruleset lists the required checks by name."
      },
      {
        "title": "Watch CI block a bad pull request",
        "body": "Break a test on a branch and open a pull request. The PR shows failing checks and the merge button is blocked. Download the junit.xml artifact to see which assertion failed, fix it and push again.",
        "cmd": "git switch -c break-ci\nsed -i 's/assert r.status_code == 201/assert r.status_code == 200/' tests/test_api.py\ngit commit -am \"Deliberately break a test\"\ngit push -u origin break-ci\ngh pr create --fill\ngh pr checks --watch\ngit revert --no-edit HEAD && git push\ngh pr checks --watch\ngh pr merge --squash --delete-branch",
        "check": "The first checks run fails (test_create_then_get) and merging is blocked; after the revert the checks pass and the PR merges."
      },
      {
        "title": "Keep dependencies and actions updated",
        "body": "Dependabot opens pull requests when a pip package or a GitHub Action has a new version, and your CI then tests the upgrade automatically.",
        "cmd": "git switch main && git pull\ncat > .github/dependabot.yml <<'EOF'\nversion: 2\nupdates:\n  - package-ecosystem: pip\n    directory: /\n    schedule:\n      interval: weekly\n  - package-ecosystem: github-actions\n    directory: /\n    schedule:\n      interval: weekly\n  - package-ecosystem: docker\n    directory: /\n    schedule:\n      interval: weekly\nEOF\ngit add .github/dependabot.yml && git commit -m \"Enable Dependabot version updates\" && git push",
        "check": "Insights > Dependency graph > Dependabot shows the three ecosystems being monitored."
      },
      {
        "title": "Add a status badge and measure the pipeline",
        "body": "Add the badge to the README and compare durations: the first run vs a run with warm pip and Docker layer caches. Note total minutes per run so you can reason about cost on private repositories.",
        "cmd": "echo \"![ci](https://github.com/$(gh api user --jq .login)/shelf-api/actions/workflows/ci.yml/badge.svg)\" >> README.md\ngit add README.md && git commit -m \"CI badge\" && git push\ngh run list --limit 6",
        "check": "gh run list shows recent runs; runs with warm caches are noticeably faster."
      }
    ],
    "verify": [
      "A push to main runs lint, three test jobs, integration and image, all green.",
      "ghcr.io/<you>/shelf-api has sha- and main tags, and you pulled and ran one.",
      "A pull request with a failing test cannot be merged.",
      "You can explain why the image job has packages: write while the rest are read-only."
    ],
    "deliverable": "The public shelf-api repository with the CI badge, the ci.yml workflow, a Dependabot config, and a README section describing each job, the cache strategy, before/after run times and the required checks on main.",
    "resume": "Built a GitHub Actions CI pipeline for a Python API with linting, a multi-version test matrix, Postgres service-container integration tests, cached Docker Buildx builds and least-privilege publishing to GitHub Container Registry; enforced required checks on the main branch.",
    "interview": [
      "What is the difference between CI and CD? — CI builds and tests every change automatically; continuous delivery keeps the result always deployable (and continuous deployment ships it automatically).",
      "How do you speed up a slow pipeline? — Cache dependencies and Docker layers, run independent jobs in parallel, cancel superseded runs and only run expensive jobs when needed.",
      "Why not store a personal access token to push images? — The built-in GITHUB_TOKEN is short-lived and scoped to the repository; you grant only packages: write on the one job that needs it.",
      "Why pin actions to a SHA? — Tags can be moved by an attacker who compromises the action's repository; a full commit SHA cannot."
    ],
    "cleanup": [
      "Delete the package: your profile > Packages > shelf-api > Package settings > Delete",
      "Archive or delete the shelf-api repository if you do not want it public",
      "docker logout ghcr.io"
    ],
    "links": [
      {
        "label": "GitHub Actions: Workflow syntax",
        "url": "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions"
      },
      {
        "label": "GitHub Actions: Creating PostgreSQL service containers",
        "url": "https://docs.github.com/en/actions/use-cases-and-examples/using-containerized-services/creating-postgresql-service-containers"
      },
      {
        "label": "Docker: GitHub Actions cache backend",
        "url": "https://docs.docker.com/build/cache/backends/gha/"
      },
      {
        "label": "GitHub: Working with the Container registry",
        "url": "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry"
      }
    ]
  },
  {
    "id": "lab-kubernetes-kind",
    "title": "Deploy the API to Kubernetes with kind: probes, config, secrets and rolling updates",
    "track": "Software engineering",
    "level": "Advanced",
    "minutes": 210,
    "cost": "Free (kind runs Kubernetes inside Docker on your VM)",
    "summary": "Create a local multi-node Kubernetes cluster with kind, load your Shelf API image, and deploy it with Postgres using a Namespace, ConfigMap, Secret, PersistentVolumeClaim, Deployments with startup, readiness and liveness probes, resource limits and a restricted security context, and ClusterIP Services. Then roll out a new version, break a rollout on purpose, roll back and troubleshoot with describe, logs and events.",
    "realWorld": "Kubernetes is the default platform for running containers at scale. Application developers are expected to write manifests, wire configuration and secrets, set probes and resources, and debug failing pods; these are exactly the hands-on tasks in the CKAD and CKA exams.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab with Docker, at least 4 GB RAM and 2 vCPUs free",
      "The shelf-api:1.0 image from lab-docker-compose-app (docker images shelf-api)",
      "curl, jq and openssl"
    ],
    "requires": [
      "lab-docker-compose-app"
    ],
    "safety": "The cluster is local to your VM. Kubernetes Secrets are only base64-encoded, not encrypted, unless encryption at rest is configured; treat anyone with read access to Secrets as having the passwords.",
    "steps": [
      {
        "title": "Install kubectl and kind",
        "body": "kubectl is the Kubernetes CLI; kind (Kubernetes IN Docker) runs each node as a container. Use the current versions from the kind Quick Start and Kubernetes install pages; replace v0.30.0 below with the latest kind release.",
        "cmd": "curl -LO \"https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl\"\nsudo install -m 0755 kubectl /usr/local/bin/kubectl && rm kubectl\ncurl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.30.0/kind-linux-amd64\nsudo install -m 0755 kind /usr/local/bin/kind && rm kind\nkubectl version --client && kind version\nsource <(kubectl completion bash); echo 'source <(kubectl completion bash)' >> ~/.bashrc",
        "check": "Both commands print version numbers. (Use the arm64 downloads on an ARM machine.)"
      },
      {
        "title": "Create a three-node cluster",
        "body": "One control-plane node and two workers let you see pods spread across nodes. kind writes a kubeconfig context named kind-shelf.",
        "cmd": "mkdir -p ~/shelf-k8s && cd ~/shelf-k8s\ncat > kind.yaml <<'EOF'\nkind: Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nnodes:\n  - role: control-plane\n  - role: worker\n  - role: worker\nEOF\nkind create cluster --name shelf --config kind.yaml\nkubectl cluster-info --context kind-shelf\nkubectl get nodes -o wide\nkubectl get storageclass",
        "check": "Three nodes are Ready, and a default StorageClass named standard exists."
      },
      {
        "title": "Load your image and create a namespace",
        "body": "kind nodes cannot see your local Docker images, so load the image into every node. A namespace groups the app's objects and makes cleanup one command.",
        "cmd": "kind load docker-image shelf-api:1.0 --name shelf\ndocker exec shelf-worker crictl images | grep shelf-api\nkubectl create namespace shelf\nkubectl config set-context --current --namespace shelf\nkubectl config view --minify | grep namespace",
        "check": "crictl lists shelf-api 1.0 on the worker, and the current context namespace is shelf."
      },
      {
        "title": "Create the Secret and ConfigMap",
        "body": "Secrets hold sensitive values; ConfigMaps hold plain configuration. Generate the password so it never appears in a file. Look at how the Secret is stored: base64 is encoding, not encryption.",
        "cmd": "PW=$(openssl rand -hex 16)\nkubectl create secret generic shelf-db \\\n  --from-literal=POSTGRES_PASSWORD=\"$PW\" \\\n  --from-literal=DATABASE_URL=\"postgresql+psycopg://shelf:$PW@db:5432/shelf\"\nunset PW\ncat > config.yaml <<'EOF'\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: shelf-config\ndata:\n  POSTGRES_DB: shelf\n  POSTGRES_USER: shelf\n  LOG_LEVEL: info\nEOF\nkubectl apply -f config.yaml\nkubectl get secret shelf-db -o jsonpath='{.data.POSTGRES_PASSWORD}' | base64 -d; echo\nkubectl describe configmap shelf-config",
        "check": "The decoded password prints, which shows why RBAC on Secrets matters."
      },
      {
        "title": "Deploy Postgres with a PersistentVolumeClaim",
        "body": "The PVC asks the default StorageClass for 1 GiB. The Deployment uses strategy Recreate because two Postgres pods must never share one data directory. The Service named db gives the database a stable DNS name inside the namespace.",
        "cmd": "cat > db.yaml <<'EOF'\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: db-data\nspec:\n  accessModes: [\"ReadWriteOnce\"]\n  resources:\n    requests:\n      storage: 1Gi\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: db\n  labels: {app: db}\nspec:\n  replicas: 1\n  strategy: {type: Recreate}\n  selector:\n    matchLabels: {app: db}\n  template:\n    metadata:\n      labels: {app: db}\n    spec:\n      containers:\n        - name: postgres\n          image: postgres:17-alpine\n          ports: [{containerPort: 5432}]\n          envFrom:\n            - configMapRef: {name: shelf-config}\n          env:\n            - name: POSTGRES_PASSWORD\n              valueFrom:\n                secretKeyRef: {name: shelf-db, key: POSTGRES_PASSWORD}\n            - name: PGDATA\n              value: /var/lib/postgresql/data/pgdata\n          readinessProbe:\n            exec:\n              command: [\"pg_isready\", \"-U\", \"shelf\", \"-d\", \"shelf\"]\n            periodSeconds: 5\n          resources:\n            requests: {cpu: 100m, memory: 256Mi}\n            limits: {memory: 512Mi}\n          volumeMounts:\n            - {name: data, mountPath: /var/lib/postgresql/data}\n      volumes:\n        - name: data\n          persistentVolumeClaim: {claimName: db-data}\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: db\nspec:\n  selector: {app: db}\n  ports: [{port: 5432, targetPort: 5432}]\nEOF\nkubectl apply -f db.yaml\nkubectl rollout status deployment/db --timeout=180s\nkubectl get pvc,pods,svc",
        "check": "The PVC is Bound, the db pod is 1/1 Running and the db Service has a ClusterIP."
      },
      {
        "title": "Deploy the API with probes, resources and a security context",
        "body": "Three replicas behind a Service. The startupProbe gives the app time to boot, the readinessProbe removes a pod from the Service while it cannot serve, and the livenessProbe restarts a hung container. maxUnavailable 0 means a rollout never drops below three ready pods. The securityContext enforces non-root, no privilege escalation, a read-only root filesystem (with an emptyDir for /tmp) and no Linux capabilities.",
        "cmd": "cat > api.yaml <<'EOF'\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: shelf-api\n  labels: {app: shelf-api}\n  annotations:\n    kubernetes.io/change-cause: \"initial release 1.0\"\nspec:\n  replicas: 3\n  revisionHistoryLimit: 5\n  strategy:\n    type: RollingUpdate\n    rollingUpdate: {maxSurge: 1, maxUnavailable: 0}\n  selector:\n    matchLabels: {app: shelf-api}\n  template:\n    metadata:\n      labels: {app: shelf-api}\n    spec:\n      securityContext:\n        runAsNonRoot: true\n        seccompProfile: {type: RuntimeDefault}\n      containers:\n        - name: api\n          image: shelf-api:1.0\n          imagePullPolicy: IfNotPresent\n          command: [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\", \"--log-level\", \"$(LOG_LEVEL)\"]\n          ports: [{name: http, containerPort: 8000}]\n          env:\n            - name: LOG_LEVEL\n              valueFrom:\n                configMapKeyRef: {name: shelf-config, key: LOG_LEVEL}\n            - name: DATABASE_URL\n              valueFrom:\n                secretKeyRef: {name: shelf-db, key: DATABASE_URL}\n          startupProbe:\n            httpGet: {path: /health, port: http}\n            periodSeconds: 2\n            failureThreshold: 30\n          readinessProbe:\n            httpGet: {path: /health, port: http}\n            periodSeconds: 5\n          livenessProbe:\n            httpGet: {path: /health, port: http}\n            periodSeconds: 10\n            failureThreshold: 3\n          resources:\n            requests: {cpu: 50m, memory: 128Mi}\n            limits: {memory: 256Mi}\n          securityContext:\n            allowPrivilegeEscalation: false\n            readOnlyRootFilesystem: true\n            capabilities: {drop: [\"ALL\"]}\n          volumeMounts:\n            - {name: tmp, mountPath: /tmp}\n      volumes:\n        - name: tmp\n          emptyDir: {}\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: shelf-api\nspec:\n  selector: {app: shelf-api}\n  ports: [{name: http, port: 80, targetPort: http}]\nEOF\nkubectl apply -f api.yaml --dry-run=server\nkubectl apply -f api.yaml\nkubectl rollout status deployment/shelf-api\nkubectl get pods -o wide -l app=shelf-api\nkubectl get endpointslices -l kubernetes.io/service-name=shelf-api",
        "check": "Three API pods are 1/1 Running, spread across the worker nodes, and the EndpointSlice lists three pod IPs."
      },
      {
        "title": "Reach the Service",
        "body": "ClusterIP Services are internal. Test from inside the cluster with a throwaway pod (using the Service DNS name), and from your VM with port-forward.",
        "cmd": "kubectl run curl --rm -it --restart=Never --image=curlimages/curl -- curl -s http://shelf-api/health\nkubectl port-forward svc/shelf-api 8080:80 >/dev/null 2>&1 &\nsleep 2\ncurl -s -X POST localhost:8080/books -H 'content-type: application/json' -d '{\"isbn\":\"978-0441013593\",\"title\":\"Dune\",\"copies\":2}' | jq\ncurl -s localhost:8080/books | jq\nkubectl exec deploy/db -- psql -U shelf -d shelf -c 'SELECT count(*) FROM books;'",
        "check": "Both calls reach the API, and psql in the db pod counts 1 book: all three replicas share the same database."
      },
      {
        "title": "Roll out version 1.1",
        "body": "Build a new image, load it and update the Deployment. Watch pods being replaced one at a time while the Service keeps answering. The change-cause annotation shows up in rollout history.",
        "cmd": "cd ~/shelf-api\nsed -i 's/API_VERSION = \"1.0.0\"/API_VERSION = \"1.1.0\"/' app/main.py\ndocker build -t shelf-api:1.1 . && kind load docker-image shelf-api:1.1 --name shelf\ncd ~/shelf-k8s\nkubectl annotate deployment/shelf-api kubernetes.io/change-cause=\"release 1.1\" --overwrite\nkubectl set image deployment/shelf-api api=shelf-api:1.1\nkubectl rollout status deployment/shelf-api\nfor i in 1 2 3; do curl -s localhost:8080/health; echo; done\nkubectl rollout history deployment/shelf-api",
        "check": "Health responses report version 1.1.0, and history shows two revisions with their change causes. (If port-forward dropped during the rollout, restart it.)"
      },
      {
        "title": "Break a rollout and roll back",
        "body": "Deploy a tag that does not exist. With maxUnavailable 0 the old pods keep serving while the new pod is stuck in ImagePullBackOff. Diagnose it, then roll back.",
        "cmd": "kubectl set image deployment/shelf-api api=shelf-api:9.9\nkubectl rollout status deployment/shelf-api --timeout=45s || echo \"rollout stuck\"\nkubectl get pods -l app=shelf-api\nkubectl describe pod -l app=shelf-api | grep -A5 -i 'events:' | tail -8\nkubectl get events --sort-by=.lastTimestamp | tail -5\ncurl -s localhost:8080/health; echo\nkubectl rollout undo deployment/shelf-api\nkubectl rollout status deployment/shelf-api",
        "check": "One pod shows ErrImagePull/ImagePullBackOff while three old pods stay Ready and /health keeps answering; after undo all pods run 1.1 again."
      },
      {
        "title": "See probes and limits at work",
        "body": "Make the readiness probe fail by pointing it at a missing path: pods stay Running but drop out of the Service endpoints (not restarted). Then check how the security context and limits appear on a running pod.",
        "cmd": "kubectl patch deployment shelf-api --type=json -p '[{\"op\":\"replace\",\"path\":\"/spec/template/spec/containers/0/readinessProbe/httpGet/path\",\"value\":\"/nope\"}]'\nsleep 20\nkubectl get pods -l app=shelf-api\nkubectl rollout undo deployment/shelf-api && kubectl rollout status deployment/shelf-api\nkubectl exec deploy/shelf-api -- id\nkubectl exec deploy/shelf-api -- sh -c 'grep \" / \" /proc/mounts'\nkubectl top pods 2>/dev/null || echo \"metrics-server not installed; use kubectl describe for requests/limits\"",
        "check": "The new pod shows 0/1 READY and the rollout stalls without taking old pods away; after undo, id shows uid=10001 and /proc/mounts shows the root filesystem mounted ro."
      },
      {
        "title": "Scale and export clean manifests",
        "body": "Scale imperatively, then capture the state declaratively. In real teams the YAML lives in git and changes go through pull requests (GitOps), so update api.yaml with the new image tag and replica count and check kubectl diff shows nothing.",
        "cmd": "kubectl scale deployment/shelf-api --replicas=4\nkubectl get deploy shelf-api\nsed -i 's/image: shelf-api:1.0/image: shelf-api:1.1/; s/replicas: 3/replicas: 4/; s/initial release 1.0/release 1.1/' api.yaml\nkubectl diff -f api.yaml && echo \"manifests match the cluster\"",
        "check": "kubectl diff prints nothing and the echo confirms the manifests match. If it shows a difference, update api.yaml until it does not."
      }
    ],
    "verify": [
      "kubectl get all -n shelf shows db and shelf-api Deployments ready, Services and a Bound PVC.",
      "The API answers through port-forward and from an in-cluster curl pod.",
      "rollout history shows at least three revisions and you rolled back a broken one without downtime.",
      "You can explain the difference between readiness, liveness and startup probes."
    ],
    "deliverable": "A shelf-k8s repository with kind.yaml, config.yaml, db.yaml and api.yaml, plus a README with the rollout/rollback transcript and a table of each probe, resource and securityContext setting and why it is there.",
    "resume": "Deployed a containerized Python API and PostgreSQL to a multi-node Kubernetes cluster (kind) using Deployments, Services, ConfigMaps, Secrets and PVCs with startup/readiness/liveness probes, resource limits and a restricted security context; performed zero-downtime rolling updates and rollbacks.",
    "interview": [
      "Readiness vs liveness probe? — Readiness failing removes the pod from Service endpoints but leaves it running; liveness failing restarts the container. Startup probes hold off both until the app has booted.",
      "How does a rolling update avoid downtime? — New pods are added (maxSurge) and old ones removed only when new ones are ready (maxUnavailable), with readiness probes gating traffic.",
      "Are Kubernetes Secrets secure? — They are base64-encoded; protect them with RBAC, encryption at rest (KMS) and ideally an external secret manager.",
      "A pod is in CrashLoopBackOff. What do you check? — kubectl describe pod (events, exit code, probe failures), kubectl logs --previous, then config, env and resource limits (OOMKilled)."
    ],
    "cleanup": [
      "kill %1 (stop the background port-forward) or pkill -f 'kubectl port-forward'",
      "kind delete cluster --name shelf",
      "docker rmi shelf-api:1.1 if you no longer need it",
      "In ~/shelf-api, set API_VERSION back if you want the repository at 1.0.0"
    ],
    "links": [
      {
        "label": "kind Quick Start",
        "url": "https://kind.sigs.k8s.io/docs/user/quick-start/"
      },
      {
        "label": "Kubernetes: Configure liveness, readiness and startup probes",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
      },
      {
        "label": "Kubernetes: Deployments",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
      },
      {
        "label": "Kubernetes: Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      },
      {
        "label": "Kubernetes: Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ]
  },
  {
    "id": "lab-lambda-api",
    "title": "Serverless API on AWS Lambda and API Gateway (Free Tier, with cleanup)",
    "track": "Software engineering",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free or a few cents if you follow the steps and clean up (Lambda has an always-free monthly allowance; API Gateway HTTP API charges per million requests after any free-tier or credit allowance on your account). Set a budget alert first.",
    "summary": "Build a Python Lambda function from the CLI: a least-privilege execution role, environment variables, a test invoke and CloudWatch Logs, then front it with an API Gateway HTTP API, add the resource-based permission, throttle the stage, publish versions with a live alias, trace an error through the logs, compare with an AWS SAM template, and delete everything.",
    "realWorld": "Serverless functions power webhooks, small APIs and event-driven glue in most AWS shops. Developers must understand execution roles versus resource policies, versions and aliases, logging and throttling, and these are core topics of the AWS Certified Developer exam.",
    "youWillNeed": [
      "An AWS account secured as in lab-cloud-iam, with a $1 budget alert already configured",
      "AWS CLI v2 signed in as a non-root identity (aws sts get-caller-identity), for example via IAM Identity Center (aws sso login)",
      "Python 3.11+, zip, curl and jq on your VM"
    ],
    "requires": [
      "lab-cloud-iam"
    ],
    "safety": "Never use the root user or long-lived root keys. Throttle the API stage so a leaked URL cannot run up a bill, and run the cleanup step the same day. Free-tier terms changed for accounts created after July 15, 2025 (credits-based free plan); read aws.amazon.com/free for your account.",
    "steps": [
      {
        "title": "Set up the shell and confirm your identity",
        "body": "Pick one region and keep it for the whole lab so cleanup finds everything. Record your account ID for ARNs.",
        "cmd": "export AWS_REGION=us-east-1\naws sts get-caller-identity\nexport ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)\nmkdir -p ~/shelf-lambda && cd ~/shelf-lambda",
        "check": "get-caller-identity shows an assumed role or IAM Identity Center user, not arn:aws:iam::<id>:root."
      },
      {
        "title": "Write the handler and test it locally",
        "body": "The handler receives the event (for HTTP APIs, payload format 2.0 with rawPath and queryStringParameters) and a context object. It returns statusCode, headers and a string body. Logging goes to CloudWatch automatically. A ?fail=1 parameter raises an error so you can practice troubleshooting later.",
        "cmd": "cat > app.py <<'EOF'\nimport json\nimport logging\nimport os\n\nlogger = logging.getLogger()\nlogger.setLevel(os.getenv(\"LOG_LEVEL\", \"INFO\"))\n\n\ndef handler(event, context):\n    params = event.get(\"queryStringParameters\") or {}\n    logger.info(\"path=%s params=%s\", event.get(\"rawPath\"), params)\n    if params.get(\"fail\") == \"1\":\n        raise RuntimeError(\"requested failure for troubleshooting practice\")\n    name = params.get(\"name\", \"world\")[:50]\n    body = {\n        \"message\": f\"{os.getenv('GREETING', 'Hello')}, {name}!\",\n        \"version\": context.function_version,\n        \"requestId\": context.aws_request_id,\n    }\n    return {\"statusCode\": 200, \"headers\": {\"content-type\": \"application/json\"}, \"body\": json.dumps(body)}\nEOF\npython3 - <<'EOF'\nfrom types import SimpleNamespace\nimport app\nctx = SimpleNamespace(function_version=\"local\", aws_request_id=\"test-123\")\nprint(app.handler({\"rawPath\": \"/hello\", \"queryStringParameters\": {\"name\": \"Ada\"}}, ctx))\nEOF",
        "check": "The local call prints statusCode 200 and a body with 'Hello, Ada!'."
      },
      {
        "title": "Create a least-privilege execution role",
        "body": "The execution role is what the function's code runs as. Its trust policy lets only the Lambda service assume it; the AWS managed AWSLambdaBasicExecutionRole policy allows writing its own logs and nothing else. Add more permissions only when the code needs them.",
        "cmd": "cat > trust.json <<'EOF'\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Principal\": {\"Service\": \"lambda.amazonaws.com\"},\n    \"Action\": \"sts:AssumeRole\"\n  }]\n}\nEOF\naws iam create-role --role-name shelf-hello-role --assume-role-policy-document file://trust.json\naws iam attach-role-policy --role-name shelf-hello-role \\\n  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole\nexport ROLE_ARN=$(aws iam get-role --role-name shelf-hello-role --query Role.Arn --output text)\nsleep 10   # new roles take a few seconds to propagate",
        "check": "get-role returns an ARN like arn:aws:iam::123456789012:role/shelf-hello-role."
      },
      {
        "title": "Package and create the function",
        "body": "A .zip deployment package with the handler file. arm64 (Graviton) is cheaper per millisecond than x86_64. A short timeout and small memory limit keep a runaway invocation cheap. The runtime must be one Lambda currently supports (check the Lambda runtimes page).",
        "cmd": "zip function.zip app.py\naws lambda create-function --function-name shelf-hello \\\n  --runtime python3.13 --architectures arm64 \\\n  --handler app.handler --role \"$ROLE_ARN\" \\\n  --zip-file fileb://function.zip \\\n  --timeout 5 --memory-size 128 \\\n  --environment \"Variables={GREETING=Hello,LOG_LEVEL=INFO}\"\naws lambda wait function-active-v2 --function-name shelf-hello\naws lambda get-function-configuration --function-name shelf-hello --query '{State:State,Runtime:Runtime,Arch:Architectures}'",
        "check": "State is Active."
      },
      {
        "title": "Invoke it and read the logs",
        "body": "Invoke directly with a test event, then tail the function's CloudWatch Logs group. Each invocation logs START, your lines, END and a REPORT line with duration, billed duration and max memory used.",
        "cmd": "aws lambda invoke --function-name shelf-hello \\\n  --cli-binary-format raw-in-base64-out \\\n  --payload '{\"rawPath\":\"/hello\",\"queryStringParameters\":{\"name\":\"Ada\"}}' out.json\njq . out.json\naws logs tail /aws/lambda/shelf-hello --since 10m",
        "check": "out.json holds statusCode 200, and the log tail shows a REPORT line with Billed Duration and Init Duration (a cold start)."
      },
      {
        "title": "Create an HTTP API in front of the function",
        "body": "'Quick create' makes an HTTP API with a $default route and an auto-deployed $default stage that proxies every request to the function. API Gateway also needs permission to invoke the function: a resource-based policy on the function, scoped to this API's ARN.",
        "cmd": "export FUNC_ARN=$(aws lambda get-function --function-name shelf-hello --query Configuration.FunctionArn --output text)\nexport API_ID=$(aws apigatewayv2 create-api --name shelf-hello-api --protocol-type HTTP --target \"$FUNC_ARN\" --query ApiId --output text)\naws lambda add-permission --function-name shelf-hello \\\n  --statement-id apigw-invoke --action lambda:InvokeFunction \\\n  --principal apigateway.amazonaws.com \\\n  --source-arn \"arn:aws:execute-api:$AWS_REGION:$ACCOUNT_ID:$API_ID/*\"\nexport API_URL=$(aws apigatewayv2 get-api --api-id \"$API_ID\" --query ApiEndpoint --output text)\ncurl -s \"$API_URL/hello?name=Ada\" | jq\naws lambda get-policy --function-name shelf-hello --query Policy --output text | jq '.Statement[0].Condition'",
        "check": "curl returns the JSON greeting over HTTPS, and the policy condition limits invocation to your API's ARN."
      },
      {
        "title": "Throttle the stage",
        "body": "An unauthenticated public URL can be hammered. Stage-level throttling caps requests before they reach (and bill) Lambda; excess requests get HTTP 429.",
        "cmd": "aws apigatewayv2 update-stage --api-id \"$API_ID\" --stage-name '$default' \\\n  --default-route-settings ThrottlingBurstLimit=5,ThrottlingRateLimit=2\nsleep 5\nfor i in $(seq 1 20); do curl -s -o /dev/null -w '%{http_code} ' \"$API_URL/hello\"; done; echo",
        "check": "Most requests return 200 and some return 429 Too Many Requests."
      },
      {
        "title": "Publish versions and route traffic with an alias",
        "body": "A version is an immutable snapshot of code and configuration; an alias is a named pointer (live) that clients or API Gateway can target. Change the configuration, publish version 2, and move the alias. Weighted aliases can split traffic for canary releases.",
        "cmd": "V1=$(aws lambda publish-version --function-name shelf-hello --query Version --output text)\naws lambda create-alias --function-name shelf-hello --name live --function-version \"$V1\"\naws lambda update-function-configuration --function-name shelf-hello --environment \"Variables={GREETING=Howdy,LOG_LEVEL=INFO}\"\naws lambda wait function-updated-v2 --function-name shelf-hello\nV2=$(aws lambda publish-version --function-name shelf-hello --query Version --output text)\naws lambda update-alias --function-name shelf-hello --name live --function-version \"$V1\" --routing-config \"AdditionalVersionWeights={\\\"$V2\\\"=0.5}\"\nfor i in 1 2 3 4 5 6; do\n  aws lambda invoke --function-name shelf-hello:live --cli-binary-format raw-in-base64-out --payload '{}' \\\n    --query ExecutedVersion --output text alias.json | tr '\\n' ' '\n  jq -r '.body | fromjson | .message' alias.json\ndone\naws lambda update-alias --function-name shelf-hello --name live --function-version \"$V2\" --routing-config 'AdditionalVersionWeights={}'",
        "check": "The alias returns a mix of 'Hello' (v1) and 'Howdy' (v2) during the 50/50 split, then only v2."
      },
      {
        "title": "Troubleshoot an error end to end",
        "body": "Trigger the failure path. API Gateway returns a generic 500 to the client (never leaking the stack trace); the details are in CloudWatch Logs. Then query the Errors metric, which is what an alarm would watch.",
        "cmd": "curl -s -i \"$API_URL/hello?fail=1\" | head -1\nsleep 5\naws logs tail /aws/lambda/shelf-hello --since 5m | grep -A3 -i error | head -12\naws cloudwatch get-metric-statistics --namespace AWS/Lambda --metric-name Errors \\\n  --dimensions Name=FunctionName,Value=shelf-hello \\\n  --start-time $(date -u -d '-15 min' +%FT%TZ) --end-time $(date -u +%FT%TZ) \\\n  --period 300 --statistics Sum",
        "check": "The client sees HTTP 500 Internal Server Error, the logs show the RuntimeError traceback with a request ID, and the Errors metric has a Sum of at least 1 (metrics can lag a minute or two)."
      },
      {
        "title": "Compare with infrastructure as code (AWS SAM)",
        "body": "Everything you did by hand fits in a short SAM template, which CloudFormation turns into the same resources. You do not have to deploy it; if you do (with sam deploy --guided), remember sam delete. Write it down and map each property to the CLI step you ran.",
        "cmd": "cat > template.yaml <<'EOF'\nAWSTemplateFormatVersion: \"2010-09-09\"\nTransform: AWS::Serverless-2016-10-31\nResources:\n  HelloFunction:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: app.handler\n      Runtime: python3.13\n      Architectures: [arm64]\n      MemorySize: 128\n      Timeout: 5\n      AutoPublishAlias: live\n      Environment:\n        Variables: {GREETING: Hello, LOG_LEVEL: INFO}\n      Events:\n        Http:\n          Type: HttpApi\nOutputs:\n  ApiUrl:\n    Value: !Sub \"https://${ServerlessHttpApi}.execute-api.${AWS::Region}.amazonaws.com/\"\nEOF\necho \"SAM template written; the Events: HttpApi entry creates the API and the invoke permission for you.\""
      },
      {
        "title": "Clean up everything",
        "body": "Delete in reverse order and confirm nothing is left. Log groups are not deleted with the function and keep storing data until you remove them.",
        "cmd": "aws apigatewayv2 delete-api --api-id \"$API_ID\"\naws lambda delete-function --function-name shelf-hello\naws iam detach-role-policy --role-name shelf-hello-role --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole\naws iam delete-role --role-name shelf-hello-role\naws logs delete-log-group --log-group-name /aws/lambda/shelf-hello\naws lambda list-functions --query 'Functions[].FunctionName'\naws apigatewayv2 get-apis --query 'Items[].Name'",
        "check": "Both list commands return empty lists (or no shelf-hello entries)."
      }
    ],
    "verify": [
      "curl to the API URL returned the greeting over HTTPS, and a burst produced some 429s.",
      "The live alias moved from version 1 to version 2 via a weighted split.",
      "You found the failure's traceback in CloudWatch Logs by request ID.",
      "After cleanup no function, API, role or log group named shelf-hello remains."
    ],
    "deliverable": "A short write-up with the CLI transcript (account ID redacted), a diagram of client > API Gateway > Lambda > CloudWatch, a table contrasting the execution role and the resource-based policy, and the SAM template annotated with the CLI step each line replaces.",
    "resume": "Built and operated a serverless HTTP API on AWS Lambda and API Gateway with least-privilege IAM, stage throttling, versioned deployments with weighted aliases and CloudWatch-based troubleshooting; captured the design as an AWS SAM template.",
    "interview": [
      "Execution role vs resource-based policy? — The execution role is what the function can do (for example write logs); the resource-based policy says who may invoke the function (for example API Gateway from one API ARN).",
      "What is a cold start and how do you reduce it? — The first invocation on a new execution environment pays init time; keep packages small, initialize clients outside the handler, and use provisioned concurrency or SnapStart where supported if latency matters.",
      "How do you do a canary release in Lambda? — Publish a new version and give it a small weight on the alias (or use CodeDeploy with SAM's DeploymentPreference), watch errors, then shift fully or roll back.",
      "Client gets 502 from API Gateway. Likely cause? — The function returned a malformed proxy response (wrong shape or non-string body) or crashed; check the function logs."
    ],
    "cleanup": [
      "Run the 'Clean up everything' step and confirm the list commands are empty.",
      "Check Billing > Bills the next day for any charges.",
      "rm -rf ~/shelf-lambda (it contains no secrets, but keep template.yaml if you want it)"
    ],
    "links": [
      {
        "label": "AWS Lambda Developer Guide",
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
      },
      {
        "label": "Lambda execution role",
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html"
      },
      {
        "label": "API Gateway HTTP API Lambda integrations",
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html"
      },
      {
        "label": "Lambda aliases",
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html"
      },
      {
        "label": "AWS Free Tier",
        "url": "https://aws.amazon.com/free/"
      }
    ]
  },
  {
    "id": "lab-terraform-docker",
    "title": "Infrastructure as code with Terraform: providers, modules, state and workspaces",
    "track": "Software engineering",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free (Terraform CLI with the Docker, random and local providers; nothing in the cloud)",
    "summary": "Provision the Shelf API stack (network, volume, Postgres and API containers) on your own Docker host with Terraform. Write variables with validation, outputs and a reusable module, run the full init, fmt, validate, plan, apply and destroy workflow, inspect and protect state, detect and fix drift, import an existing resource, and run a second copy of the stack with workspaces.",
    "realWorld": "Infrastructure as code is how teams build cloud and platform environments repeatably and reviewably. Terraform is the most widely used tool; the same workflow, state handling and module design apply whether the provider is Docker, AWS, Azure or Kubernetes, and they are the core of the Terraform Associate exam.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab with Docker",
      "The shelf-api:1.0 image from lab-docker-compose-app",
      "curl and jq"
    ],
    "requires": [
      "lab-docker-compose-app"
    ],
    "safety": "State files contain every attribute Terraform manages, including generated passwords, in plain text. Never commit terraform.tfstate or *.tfvars with secrets; in teams use a remote backend with encryption, locking and restricted access.",
    "steps": [
      {
        "title": "Install Terraform from HashiCorp's repository",
        "body": "Use the official apt repository so updates are signed. If the install page shows a different key or URL, follow the page.",
        "cmd": "sudo apt-get update && sudo apt-get install -y gnupg software-properties-common lsb-release\nwget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null\necho \"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main\" | sudo tee /etc/apt/sources.list.d/hashicorp.list\nsudo apt-get update && sudo apt-get install -y terraform\nterraform version\nterraform -install-autocomplete || true",
        "check": "terraform version prints v1.x."
      },
      {
        "title": "Write a reusable module",
        "body": "A module is a folder of .tf files with inputs (variables) and outputs. This one runs any container on a network, with optional published port, volumes and health check. dynamic blocks generate nested blocks from variables, so one module fits both the database and the API.",
        "cmd": "mkdir -p ~/shelf-tf/modules/container_app && cd ~/shelf-tf\ncat > modules/container_app/main.tf <<'EOF'\nterraform {\n  required_providers {\n    docker = { source = \"kreuzwerker/docker\" }\n  }\n}\n\nvariable \"name\" { type = string }\nvariable \"image\" { type = string }\nvariable \"network\" { type = string }\nvariable \"aliases\" {\n  type    = list(string)\n  default = []\n}\nvariable \"env\" {\n  type    = map(string)\n  default = {}\n}\nvariable \"internal_port\" {\n  type    = number\n  default = null\n}\nvariable \"external_port\" {\n  type    = number\n  default = null\n}\nvariable \"volumes\" {\n  description = \"Map of volume name => container path\"\n  type        = map(string)\n  default     = {}\n}\nvariable \"healthcheck_cmd\" {\n  type    = list(string)\n  default = null\n}\n\nresource \"docker_container\" \"this\" {\n  name    = var.name\n  image   = var.image\n  env     = [for k, v in var.env : \"${k}=${v}\"]\n  restart = \"unless-stopped\"\n\n  networks_advanced {\n    name    = var.network\n    aliases = var.aliases\n  }\n\n  dynamic \"ports\" {\n    for_each = var.external_port == null ? [] : [var.external_port]\n    content {\n      internal = var.internal_port\n      external = ports.value\n      ip       = \"127.0.0.1\"\n    }\n  }\n\n  dynamic \"volumes\" {\n    for_each = var.volumes\n    content {\n      volume_name    = volumes.key\n      container_path = volumes.value\n    }\n  }\n\n  dynamic \"healthcheck\" {\n    for_each = var.healthcheck_cmd == null ? [] : [var.healthcheck_cmd]\n    content {\n      test     = healthcheck.value\n      interval = \"5s\"\n      timeout  = \"3s\"\n      retries  = 10\n    }\n  }\n\n  wait         = var.healthcheck_cmd != null\n  wait_timeout = 90\n}\n\noutput \"name\" { value = docker_container.this.name }\nEOF"
      },
      {
        "title": "Write the root configuration",
        "body": "The terraform block pins provider sources and version ranges; init records the exact versions in .terraform.lock.hcl (commit it). random_password generates the database password so it is never typed. Resource references (docker_network.app.name) create an implicit dependency graph; depends_on adds an explicit one. terraform.workspace becomes part of every name so workspaces do not collide.",
        "cmd": "cat > main.tf <<'EOF'\nterraform {\n  required_version = \">= 1.6\"\n  required_providers {\n    docker = { source = \"kreuzwerker/docker\", version = \"~> 3.0\" }\n    random = { source = \"hashicorp/random\", version = \"~> 3.6\" }\n    local  = { source = \"hashicorp/local\", version = \"~> 2.5\" }\n  }\n}\n\nprovider \"docker\" {}\n\nlocals {\n  prefix = \"${var.project}-${terraform.workspace}\"\n}\n\nresource \"docker_network\" \"app\" {\n  name = \"${local.prefix}-net\"\n}\n\nresource \"docker_volume\" \"dbdata\" {\n  name = \"${local.prefix}-dbdata\"\n}\n\nresource \"random_password\" \"db\" {\n  length  = 24\n  special = false\n}\n\nresource \"docker_image\" \"postgres\" {\n  name         = \"postgres:17-alpine\"\n  keep_locally = true\n}\n\nmodule \"db\" {\n  source          = \"./modules/container_app\"\n  name            = \"${local.prefix}-db\"\n  image           = docker_image.postgres.image_id\n  network         = docker_network.app.name\n  aliases         = [\"db\"]\n  volumes         = { (docker_volume.dbdata.name) = \"/var/lib/postgresql/data\" }\n  healthcheck_cmd = [\"CMD-SHELL\", \"pg_isready -U shelf -d shelf\"]\n  env = {\n    POSTGRES_DB       = \"shelf\"\n    POSTGRES_USER     = \"shelf\"\n    POSTGRES_PASSWORD = random_password.db.result\n  }\n}\n\nmodule \"api\" {\n  source        = \"./modules/container_app\"\n  name          = \"${local.prefix}-api\"\n  image         = var.api_image\n  network       = docker_network.app.name\n  internal_port = 8000\n  external_port = var.api_port\n  env = {\n    DATABASE_URL = \"postgresql+psycopg://shelf:${random_password.db.result}@db:5432/shelf\"\n  }\n  depends_on = [module.db]\n}\n\nresource \"local_file\" \"summary\" {\n  filename = \"${path.module}/out/${terraform.workspace}-summary.txt\"\n  content  = <<-EOT\n    workspace: ${terraform.workspace}\n    api:       http://127.0.0.1:${var.api_port}/docs\n    network:   ${docker_network.app.name}\n    containers: ${module.db.name}, ${module.api.name}\n  EOT\n}\nEOF\ncat > variables.tf <<'EOF'\nvariable \"project\" {\n  description = \"Prefix for every resource name\"\n  type        = string\n  default     = \"shelf\"\n}\n\nvariable \"api_image\" {\n  description = \"Local image for the API\"\n  type        = string\n  default     = \"shelf-api:1.0\"\n}\n\nvariable \"api_port\" {\n  description = \"Host port (bound to 127.0.0.1) for the API\"\n  type        = number\n  default     = 8081\n\n  validation {\n    condition     = var.api_port > 1024 && var.api_port < 65536\n    error_message = \"api_port must be an unprivileged port between 1025 and 65535.\"\n  }\n}\nEOF\ncat > outputs.tf <<'EOF'\noutput \"api_url\" {\n  value = \"http://127.0.0.1:${var.api_port}\"\n}\n\noutput \"db_password\" {\n  value     = random_password.db.result\n  sensitive = true\n}\nEOF\nprintf '.terraform/\\n*.tfstate\\n*.tfstate.*\\n*.tfplan\\nout/\\n' > .gitignore"
      },
      {
        "title": "init, fmt and validate",
        "body": "init downloads providers and sets up the backend (local by default) and modules. fmt rewrites files in canonical style; validate checks syntax and types without touching anything.",
        "cmd": "terraform init\ncat .terraform.lock.hcl | head -8\nterraform fmt -recursive -diff\nterraform validate\nterraform plan -var api_port=80 2>&1 | grep -A3 -i 'invalid value' || true",
        "check": "validate prints 'Success! The configuration is valid.', and the api_port=80 plan fails with your validation message."
      },
      {
        "title": "Plan, save the plan and apply it",
        "body": "A saved plan is exactly what apply will do, which is how teams review changes before they happen. Read the symbols: + create, ~ update in place, -/+ replace, - destroy. Sensitive values show as (sensitive value).",
        "cmd": "terraform plan -out=shelf.tfplan\nterraform show shelf.tfplan | grep -E '^\\s+# '\nterraform apply shelf.tfplan\ndocker ps --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'\ncurl -s \"$(terraform output -raw api_url)/health\" | jq\ncat out/default-summary.txt",
        "check": "Apply reports 7 added (network, volume, password, image, two containers, file); both containers run and /health answers on 127.0.0.1:8081."
      },
      {
        "title": "Inspect state and outputs",
        "body": "State maps each resource address to the real object ID. Read it with state commands, not by editing the JSON. Note that the sensitive output is hidden in normal output but stored in plain text in the state file.",
        "cmd": "terraform state list\nterraform state show module.api.docker_container.this | head -20\nterraform output\nterraform output -raw db_password; echo\ngrep -c '\"result\"' terraform.tfstate",
        "check": "state list shows addresses such as module.db.docker_container.this, and the password is visible in terraform.tfstate."
      },
      {
        "title": "Detect and fix drift",
        "body": "Someone removes a container by hand. terraform plan refreshes state against reality, shows the drift and proposes to recreate it. Then make an intentional change (a new port) and see that it forces replacement because ports cannot be changed on a running container.",
        "cmd": "docker rm -f shelf-default-api\nterraform plan\nterraform apply -auto-approve\nterraform plan -var api_port=8082 | grep -E 'forces replacement|Plan:'\nterraform apply -auto-approve -var api_port=8082\ncurl -s localhost:8082/health | jq -r .status\nterraform apply -auto-approve",
        "check": "The first plan shows 1 to add for the missing container; the port change shows 'forces replacement'; afterwards you are back on 8081."
      },
      {
        "title": "Import an existing resource",
        "body": "Resources created outside Terraform can be brought under management. Create a network by hand, then use an import block and let Terraform generate the matching configuration (Terraform 1.5+).",
        "cmd": "docker network create shelf-legacy-net\nNET_ID=$(docker network inspect -f '{{.Id}}' shelf-legacy-net)\ncat > import.tf <<EOF\nimport {\n  to = docker_network.legacy\n  id = \"$NET_ID\"\n}\nEOF\nterraform plan -generate-config-out=generated.tf\ncat generated.tf\nterraform apply -auto-approve\nterraform state list | grep legacy\n# lab only: stop managing it and remove it so the next steps stay clean\nterraform state rm docker_network.legacy\nrm import.tf generated.tf\ndocker network rm shelf-legacy-net",
        "check": "generated.tf contains a docker_network \"legacy\" block and apply reports 1 imported. In real work you would review and keep generated.tf; here terraform state rm forgets the network without deleting it, then you remove it by hand."
      },
      {
        "title": "Run a second environment with a workspace",
        "body": "Workspaces keep separate state files for the same configuration. Because names include terraform.workspace, the staging stack gets its own network, volume, password and containers.",
        "cmd": "terraform workspace new staging\nterraform workspace list\nterraform apply -auto-approve -var api_port=8090\ndocker ps --format '{{.Names}}' | sort\ncurl -s localhost:8090/health | jq -r .status\nls terraform.tfstate.d/staging/",
        "check": "docker ps shows both shelf-default-* and shelf-staging-* containers, and staging has its own state under terraform.tfstate.d/."
      },
      {
        "title": "Destroy staging safely",
        "body": "Always plan a destroy first. Then switch back and remove the empty workspace.",
        "cmd": "terraform plan -destroy -var api_port=8090 | tail -3\nterraform destroy -auto-approve -var api_port=8090\nterraform workspace select default\nterraform workspace delete staging",
        "check": "Destroy reports 7 destroyed and the staging workspace is deleted."
      },
      {
        "title": "Plan for team use",
        "body": "Write down how this would change in a team: a remote backend (for example HCP Terraform, or S3 with state locking) instead of a local state file; secrets from a secret manager rather than state where possible; plan output posted on pull requests; version-pinned modules from a registry; and moved blocks when refactoring resources into modules so nothing is destroyed. Commit the configuration (not state).",
        "cmd": "git init -q && git add . && git status --short\ngit commit -qm \"Terraform stack for the Shelf API with a reusable container module\"",
        "check": "git status shows .tf files and .terraform.lock.hcl but no tfstate, plan or out/ files."
      }
    ],
    "verify": [
      "terraform apply created the stack and the API answered from the URL in terraform output.",
      "You fixed drift after deleting a container by hand and saw a port change force replacement.",
      "A resource was imported with an import block and generated configuration.",
      "Default and staging workspaces ran side by side, and staging was destroyed cleanly."
    ],
    "deliverable": "A shelf-tf repository (without state) with the module, root configuration and lock file, plus a README describing the workflow, a saved plan excerpt, the drift and import exercises, and your team-use plan for backends and secrets.",
    "resume": "Codified a containerized application stack with Terraform using a reusable module, input validation, sensitive outputs and generated secrets; practiced the plan/apply/destroy workflow, drift remediation, config-driven import and multi-environment workspaces.",
    "interview": [
      "What is Terraform state for? — It maps configuration to real resource IDs and stores attributes, so Terraform can compute diffs; it must be protected, locked and shared through a remote backend in teams.",
      "What does -/+ mean in a plan? — The resource will be destroyed and recreated because a changed argument cannot be updated in place.",
      "Workspaces vs separate directories for environments? — Workspaces share one configuration with separate state; separate directories or stacks allow different configs and access controls per environment, which many teams prefer for production.",
      "How do you bring existing infrastructure under Terraform? — An import block (or terraform import) plus matching configuration, which plan -generate-config-out can draft."
    ],
    "cleanup": [
      "terraform destroy -auto-approve (in the default workspace)",
      "docker network rm shelf-legacy-net if it still exists",
      "rm -rf ~/shelf-tf/.terraform ~/shelf-tf/out ~/shelf-tf/terraform.tfstate*"
    ],
    "links": [
      {
        "label": "Terraform documentation",
        "url": "https://developer.hashicorp.com/terraform/docs"
      },
      {
        "label": "Install Terraform",
        "url": "https://developer.hashicorp.com/terraform/install"
      },
      {
        "label": "Terraform: Import blocks",
        "url": "https://developer.hashicorp.com/terraform/language/import"
      },
      {
        "label": "Docker provider (kreuzwerker/docker)",
        "url": "https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs"
      },
      {
        "label": "Terraform: Workspaces",
        "url": "https://developer.hashicorp.com/terraform/language/state/workspaces"
      }
    ]
  }
]);
