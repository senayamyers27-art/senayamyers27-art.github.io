/* Lessons for Red Hat Certified System Administrator (EX200 (RHEL 10)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("rhcsa", [
 {
  "t": "Using a shell prompt and running commands with correct syntax",
  "body": [
   "Almost everything on the RHCSA exam happens at a shell prompt. The shell (on Red Hat Enterprise Linux, RHEL, this is Bash, the Bourne Again SHell) reads a line you type, splits it into words, expands special characters and then runs a program. Knowing exactly how it does that is what separates a command that works from one that silently does the wrong thing on a live exam system.",
   "The prompt itself tells you who and where you are. A typical RHEL prompt looks like `[student@servera ~]$`: the user name, the short host name, the current directory (`~` means your home directory) and a final character that is `$` for a normal user and `#` for root. Before you change anything on the exam, glance at the prompt so you know which machine and which account you are on.",
   "A command line has a simple structure: the command name, then options, then arguments. Options change how the command behaves and usually start with a dash. Short options are single letters and can be grouped, so `ls -l -a -h` is the same as `ls -lah`. Long options start with two dashes and are spelled out, such as `ls --all`. Arguments are what the command acts on, usually file names. Spaces separate words, which is why a file name containing a space must be quoted (`'my file'`) or escaped with a backslash.",
   "```bash\nls -lah /etc/ssh          # command, grouped options, one argument\ncp --verbose a.txt b.txt   # long option, two arguments\ncommand1 ; command2        # run one after the other\nsleep 300 &                # run in the background\n```",
   "The shell expands several things before the program ever sees them. Globs such as `*.conf` become the list of matching file names, `~` becomes your home directory, `$HOME` becomes the value of a variable and `$(date)` becomes a command's output. Because the shell does this, `rm *.log` and `rm a.log b.log` are identical from the point of view of `rm`. Use `echo` in front of a risky command (`echo rm *.log`) to preview what the expansion will produce.",
   "Bash also saves effort. Tab completes command and file names and shows the choices when you press it twice, which avoids typos in long paths. The Up arrow and `history` recall earlier commands, `Ctrl+R` searches them, and `Ctrl+C` interrupts a running command. `type` tells you whether a word is a built-in, an alias or a program, and `which` shows the path of a program found through your PATH variable.",
   "Finally, remember that Linux is case-sensitive: `File.txt` and `file.txt` are different files, and `-R` and `-r` can be different options. When a command fails, read the error message; it usually names the word it could not understand."
  ],
  "terms": [
   [
    "Shell",
    "The program (Bash on RHEL) that reads your command lines, expands them and starts the requested programs."
   ],
   [
    "Option",
    "A word beginning with - or -- that changes how a command behaves, such as -l or --all."
   ],
   [
    "Argument",
    "A word after the options that the command acts on, usually a file or directory name."
   ],
   [
    "Glob",
    "A wildcard pattern such as *.conf or file?.txt that the shell expands into matching file names."
   ],
   [
    "Tab completion",
    "Pressing Tab to have Bash finish a command or path name, reducing typing errors."
   ]
  ],
  "example": "An exam task asks you to list every file in /etc/ssh including hidden ones with human-readable sizes. You check the prompt to confirm you are on servera, type `ls -lah /etc/ssh`, and use Tab to complete the path so a typo cannot send you to the wrong directory.",
  "tip": "The shell, not the command, expands globs, variables and ~. If a result surprises you, put echo in front of the command to see exactly which arguments the program will receive.",
  "check": [
   [
    "What does the # at the end of a prompt usually indicate?",
    "You are logged in as root; a normal user's prompt ends in $."
   ],
   [
    "Are `ls -la` and `ls -l -a` different?",
    "No. Short options can be grouped behind a single dash, so both give a long listing including hidden files."
   ],
   [
    "How do you pass a file named `my report.txt` to a command?",
    "Quote it ('my report.txt') or escape the space (my\\ report.txt) so the shell treats it as one argument."
   ]
  ]
 },
 {
  "t": "Input and output redirection: >, >>, 2>, 2>&1, <, pipes and tee",
  "body": [
   "Every process starts with three open channels called file descriptors. Standard input (stdin, descriptor 0) is where it reads input, normally the keyboard. Standard output (stdout, descriptor 1) is where normal results go, and standard error (stderr, descriptor 2) is where error messages go; both normally appear on your terminal. Redirection lets you connect these channels to files or to other commands instead, which is how you capture results for an exam task that says 'save the output to a file'.",
   "The output operators are easy to confuse, so learn them precisely. `>` sends stdout to a file, creating it or overwriting it. `>>` appends stdout to the end of a file, keeping what was there. `2>` sends stderr to a file, and `2>>` appends stderr. `<` makes a file the command's stdin. Redirecting to `/dev/null`, a special file that discards everything written to it, is the standard way to throw away unwanted output.",
   "```bash\nfind /etc -name '*.conf' > found.txt 2> errors.txt   # split results and errors\nfind /etc -name '*.conf' > all.txt 2>&1             # both into one file\nfind /etc -name '*.conf' 2> /dev/null               # hide permission errors\nsort < names.txt                                   # file as stdin\n```",
   "`2>&1` means 'send descriptor 2 to wherever descriptor 1 currently points'. The shell processes redirections left to right, so order matters. `cmd > file 2>&1` first points stdout at the file and then points stderr at the same place, so both land in the file. `cmd 2>&1 > file` points stderr at the terminal (where stdout was at that moment) and only then moves stdout, so errors still appear on screen. Bash also accepts `&> file` as a shortcut for sending both to a file.",
   "A pipe, `|`, connects the stdout of one command to the stdin of the next, letting you build a small processing line: `ps aux | grep sshd | wc -l`. Only stdout travels through a pipe; stderr still goes to the terminal unless you add `2>&1` before the pipe. Pipes are the reason small tools such as `grep`, `sort`, `uniq`, `head` and `wc` are so useful together.",
   "`tee` is the tool for when you want to see output and save it at the same time. It copies its stdin to stdout and to one or more files: `df -h | tee disk.txt`. Use `tee -a` to append instead of overwrite. `tee` is also the usual way to write a root-owned file from a normal account, because in `sudo echo text > /etc/file` the redirection is done by your own unprivileged shell and fails, whereas `echo text | sudo tee /etc/file` runs the writing process as root."
  ],
  "terms": [
   [
    "stdin, stdout, stderr",
    "File descriptors 0, 1 and 2: the standard input, normal output and error output of every process."
   ],
   [
    "> and >>",
    "Redirect stdout to a file, overwriting it (>) or appending to it (>>)."
   ],
   [
    "2>&1",
    "Redirect stderr to wherever stdout currently points; place it after the stdout redirection."
   ],
   [
    "Pipe (|)",
    "Connects one command's stdout to the next command's stdin."
   ],
   [
    "tee",
    "Copies its input both to the screen (stdout) and to files; -a appends."
   ]
  ],
  "example": "A task says: search the whole file system for files owned by user harry and save the list to /root/harry-files, discarding errors. You run `find / -user harry > /root/harry-files 2> /dev/null`, then `cat /root/harry-files` to confirm the file contains only paths and no 'Permission denied' lines.",
  "tip": "Order matters: `> file 2>&1` captures both streams in the file, but `2>&1 > file` leaves errors on the terminal. Also remember a single > overwrites; use >> when the task says append.",
  "check": [
   [
    "What is the difference between `>` and `>>`?",
    "> truncates (overwrites) the target file, while >> adds to the end of it."
   ],
   [
    "Why does `sudo echo hi > /etc/motd` fail for a normal user?",
    "Your own unprivileged shell performs the redirection before sudo runs; use `echo hi | sudo tee /etc/motd` instead."
   ],
   [
    "Does a pipe carry error messages to the next command?",
    "No, only stdout. Add 2>&1 before the pipe if you want stderr to travel through it too."
   ]
  ]
 },
 {
  "t": "grep and regular expressions: ^, $, ., *, [ ], -i, -v, -r, -E",
  "body": [
   "`grep` prints the lines of its input that match a pattern. On the RHCSA you use it constantly: to find a setting in a configuration file, to pick lines out of a log, or to satisfy a task such as 'save every line of /usr/share/dict/words containing the string ich into /root/lines'. The pattern is a regular expression (regex), a small language for describing text.",
   "The core regex characters are few. `^` anchors the match to the start of a line and `$` to the end, so `^root` matches lines beginning with root and `bash$` matches lines ending in bash. A dot `.` matches any single character. A star `*` means 'zero or more of the preceding item', so `a*` matches nothing, a, aa and so on, and `.*` matches any run of characters. Square brackets list a set of allowed characters: `[0-9]` is one digit, `[aeiou]` one vowel, and `[^0-9]` (with a caret inside the brackets) any character that is not a digit.",
   "```bash\ngrep '^root' /etc/passwd            # lines starting with root\ngrep -v '^#' /etc/ssh/sshd_config   # hide comment lines\ngrep -v '^$' file                   # hide empty lines\ngrep -i 'error' /var/log/messages   # case-insensitive\ngrep -r 'PermitRootLogin' /etc/ssh  # search a directory tree\ngrep -E '^(root|student):' /etc/passwd\n```",
   "The options on this topic each do one clear job. `-i` ignores case. `-v` inverts the match and prints lines that do not match, which combined with `^#` and `^$` is the classic way to see only the active lines of a config file. `-r` searches recursively through every file under a directory and prefixes each result with the file name. Other useful ones are `-n` for line numbers, `-c` to count matching lines and `-l` to list only the names of matching files.",
   "Plain `grep` uses basic regular expressions, in which `+`, `?`, `|`, `{ }` and `( )` are ordinary characters unless you put a backslash in front of them. `grep -E` switches to extended regular expressions, where those characters are special without backslashes: `+` means one or more, `?` zero or one, `|` alternation, `{3}` exactly three and parentheses group. So `grep -E 'cat|dog'` finds either word, whereas plain `grep 'cat|dog'` looks for the literal text cat|dog.",
   "Always put the pattern in single quotes. Characters such as `*`, `$` and `[ ]` are also special to the shell, and without quotes Bash may expand them into file names or variable values before grep ever sees them. To match a literal dot, escape it: `grep '\\.conf$'`."
  ],
  "terms": [
   [
    "Regular expression",
    "A pattern language for describing text, used by grep, sed, vim and many other tools."
   ],
   [
    "Anchor",
    "^ matches the start of a line and $ matches the end; they match positions, not characters."
   ],
   [
    "Character class",
    "A bracket expression such as [a-z] that matches one character from the listed set; [^...] negates it."
   ],
   [
    "-v",
    "grep option that prints lines that do NOT match the pattern."
   ],
   [
    "-E",
    "grep option that enables extended regular expressions, making + ? | {} and () special."
   ]
  ],
  "example": "To review only the active settings in /etc/ssh/sshd_config, you run `grep -v -e '^#' -e '^$' /etc/ssh/sshd_config`. Comment and blank lines disappear and you can quickly confirm whether PasswordAuthentication is set.",
  "tip": "In a regex, * does not mean 'anything' as it does in a shell glob; it means 'zero or more of the previous character'. The regex for 'anything' is .* and patterns belong in single quotes.",
  "check": [
   [
    "Which command prints lines of /etc/passwd that end in nologin?",
    "grep 'nologin$' /etc/passwd, because $ anchors the match to the end of the line."
   ],
   [
    "Why might `grep 'a|b' file` find nothing when lines contain a or b?",
    "In basic regex | is literal; use grep -E 'a|b' (or escape it as \\|) to get alternation."
   ],
   [
    "What does `grep -v '^$'` do?",
    "It removes empty lines, because ^$ matches a line with nothing between start and end and -v inverts the match."
   ]
  ]
 },
 {
  "t": "Accessing remote systems with ssh; logging in and switching users (su -, sudo -i) in multiuser targets",
  "body": [
   "RHEL servers usually run in the multi-user target, a text-mode state with networking and services running but no graphical desktop. You reach them with a text console or, far more often, over the network with SSH (Secure Shell), which encrypts the whole session. On the exam you will ssh between machines and switch between accounts constantly, so these commands should become automatic.",
   "The basic form is `ssh user@host`. If you omit the user, ssh uses your current user name. The first time you connect to a host, ssh shows the server's key fingerprint and asks you to accept it; accepted keys are stored in `~/.ssh/known_hosts`, and a later mismatch triggers a warning that could mean the server was rebuilt or that someone is intercepting the connection. You can also run a single command remotely: `ssh root@serverb 'systemctl is-active sshd'`. Type `exit` or press `Ctrl+D` to log out.",
   "Key-based authentication replaces passwords with a key pair. `ssh-keygen` creates a private key (for example `~/.ssh/id_ed25519`) and a matching public key ending in `.pub`. `ssh-copy-id user@host` appends the public key to `~/.ssh/authorized_keys` on the server. After that you log in without a password, and the private key never leaves your machine, so protect it with a passphrase and tight permissions.",
   "Once logged in you often need another identity. `su` (substitute user) starts a shell as another user after asking for that user's password. The dash matters: `su - harry` starts a login shell that loads harry's environment, PATH and home directory, while plain `su harry` keeps most of your current environment, which can make commands behave unexpectedly. `su -` with no name means root.",
   "`sudo` runs a single command as root (or another user) after asking for your own password, and only if the sudo policy in `/etc/sudoers` and `/etc/sudoers.d/` allows it. On RHEL, members of the `wheel` group are allowed by default. `sudo -i` opens an interactive root login shell, similar to `su -`, but authenticates you with your own password and records the action in the logs, which is why administrators prefer it to sharing the root password.",
   "```bash\nssh student@servera\nsudo -i          # root login shell using your password\nsu - harry       # full login as harry using harry's password\nwhoami; id       # confirm who you are now\nexit             # return to the previous identity\n```",
   "Each `su` or `sudo -i` stacks a new shell on top of the old one, so `exit` takes you back one level at a time. Check `whoami` and the prompt before doing anything important."
  ],
  "terms": [
   [
    "SSH",
    "Secure Shell: an encrypted protocol and client (ssh) for logging in to and running commands on remote systems."
   ],
   [
    "su -",
    "Switch user with a full login shell and that user's environment; asks for the target user's password."
   ],
   [
    "sudo -i",
    "Start a root login shell after authenticating with your own password, as allowed by the sudoers policy."
   ],
   [
    "wheel group",
    "The group whose members RHEL's default sudoers policy allows to run any command with sudo."
   ],
   [
    "multi-user.target",
    "The systemd target for a text-mode system with networking and services but no graphical login."
   ]
  ],
  "example": "You log in to servera as student, then run `ssh root@serverb` to finish a task there. Back on servera you use `sudo -i` to edit /etc/fstab, type `exit` to return to student, and `whoami` confirms you are no longer root.",
  "tip": "su asks for the TARGET user's password; sudo asks for YOUR password. And always use the dash (su -) when you need the other user's full environment.",
  "check": [
   [
    "What is the practical difference between `su harry` and `su - harry`?",
    "su - harry starts a login shell with harry's environment, PATH and home directory; su harry keeps much of the current environment."
   ],
   [
    "Whose password does `sudo -i` ask for?",
    "The invoking user's own password, and only if sudoers permits that user."
   ],
   [
    "Which file on the server holds public keys that may log in to an account?",
    "~/.ssh/authorized_keys in that account's home directory."
   ]
  ]
 },
 {
  "t": "Archiving and compressing with tar, gzip, bzip2 and xz (-c, -x, -t, -z, -j, -J, -f)",
  "body": [
   "Archiving and compressing are two different jobs. Archiving bundles many files and directories, with their permissions, ownership and timestamps, into one file. Compressing makes a file smaller. `tar` (tape archive) does the bundling and can call a compressor at the same time, which is why backup files often end in `.tar.gz`, `.tar.bz2` or `.tar.xz`. A typical exam task reads: 'create a bzip2-compressed archive of /etc named /root/etc.tar.bz2'.",
   "tar's options describe the action first. `-c` creates an archive, `-x` extracts one and `-t` lists its contents without extracting. `-f` names the archive file and must be followed directly by that file name, which is why it is conventionally the last letter in a group: `-cf archive.tar` works, but `-fc archive.tar` would treat c as the file name. `-v` (verbose) prints each file as it is processed.",
   "The compression options pick the compressor: `-z` for gzip (`.gz`, fast, moderate compression), `-j` for bzip2 (`.bz2`, slower, usually smaller) and `-J` for xz (`.xz`, slowest, usually smallest). When extracting or listing, modern GNU tar detects the compression automatically, but writing the matching letter is harmless and makes your intent clear.",
   "```bash\ntar -czvf /root/etc.tar.gz /etc      # create, gzip\ntar -cjf /root/etc.tar.bz2 /etc      # create, bzip2\ntar -cJf /root/etc.tar.xz /etc       # create, xz\ntar -tf /root/etc.tar.gz             # list contents\ntar -xzf /root/etc.tar.gz -C /tmp    # extract into /tmp\n```",
   "tar removes the leading `/` from stored paths and prints a notice about it. That is a safety feature: extracting then recreates `etc/...` relative to your current directory (or the directory given with `-C`) instead of overwriting the live `/etc`. Always check where you are, or use `-C`, before extracting.",
   "The compressors also work alone on single files. `gzip file` replaces it with `file.gz` and `gunzip file.gz` (or `gzip -d`) reverses it; `bzip2`/`bunzip2` and `xz`/`unxz` behave the same way. By default they replace the original file, so use `-k` to keep it. They do not bundle directories, which is why they are normally paired with tar. `zcat`, `bzcat` and `xzcat` print a compressed file's contents without decompressing it on disk.",
   "After creating an archive, verify it: `tar -tf` should list the expected paths and `file /root/etc.tar.bz2` should report bzip2 compressed data. Graders check both the name and the format."
  ],
  "terms": [
   [
    "Archive",
    "A single file that bundles many files and directories along with their metadata; created with tar."
   ],
   [
    "-c / -x / -t",
    "tar actions: create an archive, extract it, or list (table of contents) without extracting."
   ],
   [
    "-f",
    "tar option naming the archive file; the file name must immediately follow it."
   ],
   [
    "-z / -j / -J",
    "Use gzip, bzip2 or xz compression respectively."
   ],
   [
    "-C",
    "tar option that changes to a directory before extracting (or archiving)."
   ]
  ],
  "example": "Asked to back up /var/log as an xz-compressed archive, you run `tar -cJf /root/logs.tar.xz /var/log`, then `tar -tf /root/logs.tar.xz | head` to confirm the paths are there and `file /root/logs.tar.xz` to confirm it is XZ compressed data.",
  "tip": "Match the letter to the extension: z = .gz, j = .bz2, J = .xz. Keep f last in the option group so the archive name follows it directly.",
  "check": [
   [
    "Which command lists the contents of backup.tar.gz without extracting it?",
    "tar -tzf backup.tar.gz (or tar -tf backup.tar.gz, since tar detects compression when reading)."
   ],
   [
    "Why does tar print 'Removing leading /' when archiving /etc?",
    "It stores relative paths so extraction does not overwrite the live system files; they are recreated under the current or -C directory."
   ],
   [
    "What does `gzip notes.txt` do to the original file?",
    "It replaces it with notes.txt.gz; use -k to keep the original."
   ]
  ]
 },
 {
  "t": "Creating and editing text files with vim or nano",
  "body": [
   "Linux configuration lives in plain text files, so editing them quickly and correctly is a core RHCSA skill. RHEL always provides `vi`, and usually `vim` (Vi IMproved) is installed; `nano` is a simpler editor you can install if you prefer it. On the exam you may use either, but vi is guaranteed to be present even on minimal systems, so it is worth being comfortable with vi/vim basics.",
   "Vim is modal: the same key does different things depending on the mode. You start in normal mode, where keys are commands. Press `i` to enter insert mode and type text (`a` appends after the cursor, `o` opens a new line below). Press `Esc` to return to normal mode. Typing `:` from normal mode opens command-line mode at the bottom of the screen, where you save and quit. Most beginner confusion comes from typing text while still in normal mode, so when in doubt press `Esc`.",
   "```text\n:w        save          :q        quit\n:wq or :x save and quit :q!       quit, discard changes\ndd        delete line   yy / p    copy line / paste below\nu         undo          Ctrl+r    redo\n/text     search down   n         next match\ngg / G    top / bottom  :set nu   show line numbers\n```",
   "A few more commands make config editing fast. `:%s/old/new/g` replaces every occurrence in the file. `x` deletes one character, `cw` changes a word and a number before a command repeats it, so `5dd` deletes five lines. Visual mode (`v`, or `V` for whole lines) lets you select text and then delete, copy or indent it. If vim warns that a swap file exists, another session was editing the file or crashed; choose to open read-only or recover rather than blindly deleting it.",
   "nano is modeless: you just type. The shortcuts are shown at the bottom of the screen, where `^` means Ctrl. `Ctrl+O` writes the file (press Enter to confirm the name), `Ctrl+X` exits, `Ctrl+W` searches and `Ctrl+K` cuts a line. It is easier to learn, though slower for large edits.",
   "Some files have safer, purpose-built editing commands. Use `visudo` for `/etc/sudoers`, because it checks the syntax before saving and prevents you from locking yourself out of sudo. `vipw` and `vigr` lock the account files while you edit them. For new small files, redirection also works: `echo 'text' > file` or a here-document with `cat > file`.",
   "Whatever editor you use, verify your change afterwards with `cat`, `grep` or the service's own test command, and restart or reload the service that reads the file."
  ],
  "terms": [
   [
    "Normal mode",
    "Vim's default mode, in which keys are commands for moving, deleting, copying and pasting."
   ],
   [
    "Insert mode",
    "Vim mode entered with i, a or o in which typed keys become text; Esc leaves it."
   ],
   [
    ":wq / :q!",
    "Vim commands to save and quit, or to quit discarding unsaved changes."
   ],
   [
    "visudo",
    "Safely edits the sudoers file, locking it and checking syntax before saving."
   ],
   [
    "Swap file",
    "A .swp recovery file vim keeps while editing; a leftover one signals a concurrent or crashed edit."
   ]
  ],
  "example": "You need to set `PermitRootLogin no` in /etc/ssh/sshd_config. In vim you type `/PermitRootLogin` to find the line, `cw` to change the value, Esc, then `:wq`. You check with `grep PermitRootLogin /etc/ssh/sshd_config` and run `systemctl reload sshd`.",
  "tip": "If vim seems to ignore your typing or does strange things, you are in the wrong mode: press Esc, then use :wq to save or :q! to abandon changes.",
  "check": [
   [
    "How do you quit vim without saving after making changes?",
    "Press Esc, then type :q! and Enter."
   ],
   [
    "Why use visudo instead of editing /etc/sudoers directly?",
    "visudo checks the syntax before saving, so a typo cannot break sudo access."
   ],
   [
    "Which vim command replaces every 'foo' with 'bar' in the file?",
    ":%s/foo/bar/g"
   ]
  ]
 },
 {
  "t": "Creating, deleting, copying and moving files and directories (mkdir -p, cp -a, mv, rm -r)",
  "body": [
   "Managing files is the everyday base of administration. The commands are short, but their options decide whether a task succeeds, whether metadata survives and whether you accidentally destroy data. Linux has no recycle bin at the command line: what `rm` removes is gone.",
   "`mkdir` creates directories. Plain `mkdir /data/projects/web` fails if `/data/projects` does not exist yet. `mkdir -p` creates every missing parent along the way and does not complain if the directory already exists, which makes it the safe choice in tasks and scripts. `touch file` creates an empty file, or updates the timestamp of an existing one.",
   "`cp source destination` copies files. To copy a directory you need `-r` (recursive). By default the copy belongs to you, gets the current time and default permissions. `cp -a` (archive) copies recursively and preserves permissions, ownership, timestamps, links and, on RHEL, SELinux contexts and other extended attributes. When a task asks you to copy files 'preserving attributes' or to move data to a new file system, `-a` is the answer. `cp -i` asks before overwriting.",
   "`mv` moves or renames; there is no separate rename command. Within the same file system `mv` simply changes the name in the directory, so it is instant and keeps the file's metadata, including its SELinux context. Across file systems it copies and then deletes. This is a classic SELinux trap: a file created in your home directory and moved into `/var/www/html` keeps its home-directory context, whereas a copied file gets the context of its new location.",
   "```bash\nmkdir -p /srv/app/{logs,data}   # braces create both subdirectories\ncp -a /etc/httpd /root/httpd.bak\nmv report.txt /srv/app/data/\nmv old.conf new.conf            # rename\nrm -r /srv/app/logs             # remove a directory tree\nrmdir /srv/empty                # remove an empty directory only\n```",
   "`rm` removes files; `rm -r` removes a directory and everything beneath it, and `-f` suppresses prompts and errors. `rmdir` removes only empty directories, which makes it a safe way to clean up. Before any recursive delete, run `ls` on the same path, avoid trailing wildcards you have not checked, and be especially careful as root. Using `rm -i` or previewing with `echo rm -r path/*` costs seconds and can save the exam.",
   "Paths can be absolute (starting with `/`) or relative to your current directory; `.` is the current directory and `..` its parent. When in doubt, use absolute paths so the command does the same thing no matter where you are."
  ],
  "terms": [
   [
    "mkdir -p",
    "Create a directory and any missing parent directories; no error if it already exists."
   ],
   [
    "cp -a",
    "Archive copy: recursive, preserving permissions, ownership, timestamps, links and extended attributes such as SELinux contexts."
   ],
   [
    "mv",
    "Moves or renames files; within one file system it keeps the file's metadata unchanged."
   ],
   [
    "rm -r",
    "Recursively remove a directory and all of its contents."
   ],
   [
    "Absolute path",
    "A path starting at the root directory /, independent of the current directory."
   ]
  ],
  "example": "A task says to copy /home/harry/site to /var/www/site keeping ownership and timestamps. You run `mkdir -p /var/www` then `cp -a /home/harry/site /var/www/` and check with `ls -lZ /var/www/site` that the owners and times match the source.",
  "tip": "Know which command preserves what: mv within a file system keeps everything (including the old SELinux context), cp without -a takes new ownership and default attributes, and cp -a preserves them.",
  "check": [
   [
    "Why does `mkdir /a/b/c` fail on a fresh system while `mkdir -p /a/b/c` succeeds?",
    "Without -p the parent directories /a and /a/b must already exist; -p creates them."
   ],
   [
    "What does -a add to cp?",
    "Recursion plus preservation of mode, ownership, timestamps, links and extended attributes like SELinux contexts."
   ],
   [
    "Which command removes a directory only if it is empty?",
    "rmdir."
   ]
  ]
 },
 {
  "t": "Hard links vs symbolic links (ln, ln -s) and their limits",
  "body": [
   "To understand links you first need the idea of an inode. A file's data and metadata (owner, permissions, timestamps, size, where the data blocks are) live in an inode, identified by a number. A file name is just a directory entry that points to an inode. `ls -i` shows inode numbers, and the second column of `ls -l` shows the link count: how many names point to that inode.",
   "A hard link is simply another name for the same inode, created with `ln target linkname`. Both names are equal; neither is the 'original'. Editing the file through one name changes what you see through the other, and they always share permissions and ownership because there is only one inode. Deleting one name only decrements the link count; the data is freed when the count reaches zero and no process still has the file open.",
   "A symbolic (soft) link is a separate small file whose content is a path, created with `ln -s target linkname`. When you open the link, the system follows the path. `ls -l` shows it with an `l` type and an arrow: `lrwxrwxrwx ... current -> /opt/app-2.1`. If the target is moved or deleted, the symlink remains but points at nothing; this is called a dangling or broken link, and `ls` usually highlights it in red.",
   "```bash\nln /data/report.txt /data/report-hard.txt\nln -s /etc/httpd/conf/httpd.conf /root/httpd.conf\nls -li /data                  # same inode number, link count 2\nreadlink -f /root/httpd.conf  # where the symlink really points\n```",
   "The limits are what the exam asks about. Hard links cannot cross file systems, because inode numbers are only unique within one file system; trying gives an 'Invalid cross-device link' error. Hard links to directories are not allowed (not even for root), which prevents loops in the tree. Symbolic links have neither restriction: they can point to directories and to files on other file systems or even to paths that do not exist yet. The price is that they break when the target moves.",
   "Watch the argument order: `ln` takes the existing target first and the new name second, just like `cp`. With symlinks, a relative target is interpreted relative to the link's own directory, not your current directory, so `ln -s ../conf/app.conf /etc/app.conf` points to `/conf/app.conf`. Using absolute targets avoids that confusion.",
   "Also note that a symlink's own permissions (always shown as rwxrwxrwx) are ignored; access is decided by the target's permissions."
  ],
  "terms": [
   [
    "Inode",
    "The on-disk structure holding a file's metadata and data locations, identified by a number unique within its file system."
   ],
   [
    "Hard link",
    "An additional directory entry pointing to the same inode; created with ln."
   ],
   [
    "Symbolic link",
    "A special file containing a path to another file or directory; created with ln -s."
   ],
   [
    "Link count",
    "The number of hard links (names) referring to an inode, shown in the second column of ls -l."
   ],
   [
    "Dangling link",
    "A symbolic link whose target no longer exists."
   ]
  ],
  "example": "An application expects its configuration at /etc/app.conf but you keep the real file on a separate /data file system. A hard link fails with 'Invalid cross-device link', so you create `ln -s /data/app/app.conf /etc/app.conf` and confirm it with `ls -l /etc/app.conf`.",
  "tip": "Hard links: same inode, same file system only, no directories, survive deletion of the other name. Symlinks: separate file holding a path, can cross file systems and point to directories, break if the target moves.",
  "check": [
   [
    "If you delete the original name of a file that has a hard link, what happens to the data?",
    "Nothing is lost; the data remains reachable through the other name until the last link is removed."
   ],
   [
    "Why can't you hard-link a file from /home to /boot when they are different file systems?",
    "Hard links reference inode numbers, which are only meaningful within one file system."
   ],
   [
    "How can you tell a symbolic link in `ls -l` output?",
    "The first character is l and the name is followed by -> and the target path."
   ]
  ]
 },
 {
  "t": "Listing, setting and changing standard ugo/rwx permissions in numeric and symbolic form",
  "body": [
   "Every file and directory has an owner user, an owning group and three sets of permissions: for the user who owns it (u), for members of the owning group (g) and for everyone else, the others (o). Each set has read (r), write (w) and execute (x). `ls -l` shows them as ten characters, for example `-rwxr-x---`: the first character is the type (`-` file, `d` directory, `l` link), then three characters each for u, g and o.",
   "The meaning of r, w and x differs between files and directories, and exams test this. On a file, r lets you read the contents, w lets you change them and x lets you run it as a program. On a directory, r lets you list the names inside, w lets you create, delete and rename entries in it (regardless of the files' own permissions), and x lets you enter the directory and reach things inside it. A directory with r but no x shows names but you cannot open anything; with x but no r you can open files whose names you already know.",
   "Numeric (octal) mode gives each permission a value: r = 4, w = 2, x = 1. Add them for each set and write three digits for u, g and o. So 7 is rwx, 6 is rw-, 5 is r-x, 4 is r-- and 0 is nothing. `chmod 750 script.sh` gives the owner rwx, the group r-x and others nothing. `chmod 640 app.conf` is a typical config file mode.",
   "Symbolic mode changes permissions relative to what is there. It combines who (`u`, `g`, `o` or `a` for all), an operator (`+` add, `-` remove, `=` set exactly) and the permissions. `chmod g+w file` adds group write, `chmod o-rwx dir` removes everything for others, and `chmod u=rw,go=r file` sets an exact mode. `-R` applies a change recursively; the capital `X` adds execute only to directories and to files that already have execute for someone, which is handy for fixing a tree.",
   "```bash\nls -ld /srv/shared\nchmod 2770 /srv/shared     # rwxrws---, setgid on the directory\nchmod u+x deploy.sh\nchmod -R g+rX /srv/docs\nchown harry:web /srv/web   # change owner and group\nchgrp web /srv/web/index.html\n```",
   "Ownership is changed with `chown user:group file` (root only for the user part) and `chgrp group file`. When a process accesses a file, Linux checks only the first matching class: if you are the owner, only the user bits apply, even if the group bits would give you more. New files get their starting permissions from the umask, commonly leaving files at 664 and directories at 775 for normal accounts (umask 0002) and 644/755 for root (umask 0022).",
   "The special bits (setuid, setgid and sticky) add a fourth leading digit, as in 2770 above; they are covered with collaborative directories, but recognise them in `ls -l` as s or t in the execute positions."
  ],
  "terms": [
   [
    "ugo",
    "The three permission classes: user (owner), group and others; a means all three."
   ],
   [
    "Octal mode",
    "Numeric permissions where r=4, w=2 and x=1 are summed per class, e.g. 755 or 640."
   ],
   [
    "Symbolic mode",
    "chmod notation such as u+x, g-w or o=r that changes specific permissions."
   ],
   [
    "Execute on a directory",
    "Permission to enter the directory and access items within it."
   ],
   [
    "chown",
    "Changes a file's owning user and optionally its group (user:group)."
   ]
  ],
  "example": "A task says only the owner of /root/backup.sh may read, write and run it, and its group may read it. You run `chmod 740 /root/backup.sh` and `ls -l` shows -rwxr-----. Later you use `chmod g+x` to let the group run it too, giving 750.",
  "tip": "Deleting a file depends on write permission on the DIRECTORY, not on the file. And remember the owner class is checked first: an owner with fewer rights than the group does not inherit the group's rights.",
  "check": [
   [
    "What octal mode corresponds to rw-r-----?",
    "640: rw- = 6, r-- = 4, --- = 0."
   ],
   [
    "What does execute permission on a directory allow?",
    "Entering (cd into) the directory and accessing files or subdirectories within it."
   ],
   [
    "What is the symbolic chmod command to remove all permissions from others?",
    "chmod o-rwx file (or chmod o= file)."
   ]
  ]
 },
 {
  "t": "Finding documentation with man, man -k, info and /usr/share/doc",
  "body": [
   "The RHCSA is taken without internet access, so the documentation installed on the system is your only reference. Knowing how to find the right page quickly is a genuine exam skill: many candidates rescue a half-remembered option or configuration syntax by checking a man page or an example file.",
   "Manual pages, read with `man command`, are the main source. Each page follows the same layout: NAME, SYNOPSIS (the syntax, with optional parts in square brackets), DESCRIPTION, OPTIONS, often EXAMPLES near the end, and SEE ALSO pointing to related pages. Inside the viewer, `/text` searches forward, `n` jumps to the next match, `Space` pages down, `g` and `G` go to the top and bottom, and `q` quits.",
   "Man pages are organised in numbered sections, and the same name can exist in several. The ones you will use most are section 1 (user commands), 5 (file formats such as `/etc/fstab`), 7 (overviews and conventions) and 8 (system administration commands). `man 5 passwd` describes the `/etc/passwd` file, while `man passwd` shows the command in section 1. For the exam, `man 5 fstab`, `man 5 crontab`, `man 5 sshd_config`, `man 7 regex` and `man 8 semanage-fcontext` are especially valuable.",
   "When you do not know the page name, search by keyword. `man -k keyword` (the same as `apropos`) searches page names and short descriptions: `man -k partition` lists tools such as `fdisk`, `parted` and `gdisk`. The search relies on an index database; if it returns nothing on a fresh system, run `mandb` as root to rebuild it. You can filter by section with grep, for example `man -k user | grep '(8)'`.",
   "```bash\nman -k selinux | grep '(8)'   # admin commands about SELinux\nman 5 fstab                   # file format\nman -K 'Storage='            # full-text search (slow)\ninfo coreutils                # GNU info manual\nls /usr/share/doc/            # package docs and samples\n```",
   "`info` shows GNU info documents, which are more like books with nodes and links; GNU tools such as coreutils, tar and grep have their most complete documentation there. Move with arrow keys, press Enter on a link, `u` to go up and `q` to quit. Many commands also print a quick summary with `--help`.",
   "Finally, `/usr/share/doc/` holds per-package directories with README files, licenses and, most usefully, sample configuration files. When you need the syntax of an unfamiliar config file, `rpm -qd package` lists that package's documentation files and `/usr/share/doc/<package>/` often contains a commented example you can adapt."
  ],
  "terms": [
   [
    "man page",
    "A manual page viewed with man, organised into standard sections such as SYNOPSIS, OPTIONS and EXAMPLES."
   ],
   [
    "Man section",
    "A numbered category of man pages: 1 user commands, 5 file formats, 8 administration commands."
   ],
   [
    "man -k",
    "Searches man page names and descriptions for a keyword; equivalent to apropos."
   ],
   [
    "mandb",
    "Builds or updates the index database that man -k searches."
   ],
   [
    "/usr/share/doc",
    "Directory holding installed packages' extra documentation and sample configuration files."
   ]
  ],
  "example": "You cannot remember the name of the tool for changing a user's password expiry. `man -k expir` shows chage(1) among the results; `man chage` then reminds you that `chage -M 90 harry` sets the maximum password age.",
  "tip": "If `man -k` returns 'nothing appropriate', the index has not been built yet: run mandb as root and search again. Use the section number (man 5 ...) when you need a file format rather than a command.",
  "check": [
   [
    "Which man section documents configuration file formats?",
    "Section 5, e.g. man 5 fstab or man 5 passwd."
   ],
   [
    "How do you search man pages when you don't know the command name?",
    "man -k keyword (apropos keyword), after mandb has built the index if needed."
   ],
   [
    "Where would you look for a sample configuration file shipped with a package?",
    "In /usr/share/doc/<package>/, which you can find with rpm -qd package."
   ]
  ]
 },
 {
  "t": "Configuring access to RPM repositories: .repo files in /etc/yum.repos.d/ (baseurl, enabled, gpgcheck, gpgkey)",
  "body": [
   "RHEL installs software as RPM packages (RPM originally stood for Red Hat Package Manager). The `dnf` tool downloads packages from repositories: directories of RPM files plus metadata describing them. On the exam the systems are often not registered to Red Hat, so a task will give you the location of the BaseOS and AppStream repositories and ask you to configure the machine to use them. If this step is wrong, every later install task fails, so it is worth getting perfect.",
   "Repositories are defined in files ending in `.repo` inside `/etc/yum.repos.d/`. The directory still carries the name of yum, dnf's predecessor. Each file can contain one or more sections. A section starts with a repository ID in square brackets, which must be unique and contain no spaces, followed by key=value settings.",
   "```ini\n[BaseOS]\nname=RHEL BaseOS\nbaseurl=file:///mnt/rhel/BaseOS\nenabled=1\ngpgcheck=1\ngpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release\n\n[AppStream]\nname=RHEL AppStream\nbaseurl=file:///mnt/rhel/AppStream\nenabled=1\ngpgcheck=1\ngpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release\n```",
   "The key settings are these. `name` is a human-readable description. `baseurl` is the location of the repository, the directory that contains the `repodata/` subdirectory; it can be an HTTP, HTTPS, FTP or `file://` URL (note the three slashes in `file:///mnt/...`: two for the scheme plus the leading slash of the path). On the exam you will use exactly the address the task gives you. `enabled=1` makes dnf use the repository, while `enabled=0` keeps the definition but ignores it.",
   "`gpgcheck=1` tells dnf to verify each package's GPG (GNU Privacy Guard) signature before installing it, which proves the package came from the publisher and was not altered. `gpgkey` points to the public key used for that check; Red Hat's keys are installed under `/etc/pki/rpm-gpg/`. If the task does not provide a key, or says signatures need not be checked, set `gpgcheck=0`; with gpgcheck enabled and no usable key, installs fail with a signature or key error. Keys can also be imported directly with `rpm --import keyfile`.",
   "After writing the file, test it: `dnf repolist` should show both repository IDs with package counts, and `dnf install` of a small package should succeed. Typical mistakes are a baseurl pointing one level too high or low (it must contain repodata), a typo in the scheme, missing `enabled=1` and a gpgcheck setting that does not match the available keys. Running `dnf clean all` after fixing a file makes dnf discard stale cached metadata."
  ],
  "terms": [
   [
    "Repository",
    "A collection of RPM packages plus metadata (repodata) that dnf can download from."
   ],
   [
    "Repository ID",
    "The unique name in square brackets that starts a section of a .repo file."
   ],
   [
    "baseurl",
    "The URL of the directory containing the repository's repodata; may use http, https, ftp or file schemes."
   ],
   [
    "gpgcheck",
    "Setting that makes dnf verify package signatures (1) or skip verification (0)."
   ],
   [
    "gpgkey",
    "Location of the public key used to verify package signatures when gpgcheck=1."
   ]
  ],
  "example": "The task gives BaseOS and AppStream URLs on content.example.com. You create /etc/yum.repos.d/exam.repo with two sections using those URLs as baseurl, enabled=1 and gpgcheck=0 because no key was provided, then `dnf repolist` lists both and `dnf install -y tree` works.",
  "tip": "baseurl must point to the directory that contains repodata/. On RHEL, BaseOS and AppStream are separate repositories, so you normally need two sections, each with its own unique ID.",
  "check": [
   [
    "What does `enabled=0` in a repository section do?",
    "It keeps the repository definition but dnf ignores it unless it is enabled, for example with --enablerepo."
   ],
   [
    "What happens with gpgcheck=1 and no valid gpgkey?",
    "Installing packages fails because dnf cannot verify their signatures."
   ],
   [
    "Where are repository definition files stored?",
    "In files ending in .repo under /etc/yum.repos.d/."
   ]
  ]
 },
 {
  "t": "dnf config-manager --add-repo, dnf repolist and dnf clean all",
  "body": [
   "Writing a `.repo` file by hand is only one way to add a repository. The `config-manager` subcommand, provided by the dnf-plugins-core package that RHEL installs by default, can create the file for you, and two other commands let you check the result and reset dnf's cache. Together they make repository tasks quick to complete and easy to verify.",
   "`dnf config-manager --add-repo` followed by a URL creates a new `.repo` file in `/etc/yum.repos.d/`. If the URL ends in `.repo`, dnf downloads that file. Otherwise it treats the URL as a repository location and writes a minimal definition with an ID and name derived from the URL, the URL as `baseurl` and `enabled=1`. It does not add a `gpgkey`, so after using it you usually open the generated file and add `gpgcheck=0` or the correct `gpgkey` line as the task requires.",
   "```bash\ndnf config-manager --add-repo file:///mnt/rhel/BaseOS\ndnf config-manager --add-repo file:///mnt/rhel/AppStream\nls /etc/yum.repos.d/\nvim /etc/yum.repos.d/mnt_rhel_BaseOS.repo   # add gpgcheck / gpgkey\ndnf config-manager --set-disabled mnt_rhel_AppStream\ndnf repolist all\n```",
   "The exact file names and IDs generated depend on the URL, so list the directory rather than guessing. `config-manager` can also switch existing repositories on and off with `--set-enabled` and `--set-disabled` followed by the repository ID. For a single command you can override the configuration temporarily with `--enablerepo=ID` or `--disablerepo=ID`.",
   "`dnf repolist` shows the enabled repositories with their IDs and names. `dnf repolist all` includes disabled ones and shows their status, and `dnf repolist -v` shows details such as the baseurl, package count and when metadata was last refreshed. It is the fastest proof that your configuration works: if a repository is missing from the list, or dnf reports it cannot download metadata, the file or URL needs fixing.",
   "dnf caches repository metadata and downloaded packages under `/var/cache/dnf/`. When you change a repository's address or content, the cache can make dnf keep using old information. `dnf clean all` deletes the cached metadata and packages for enabled repositories so the next command downloads fresh metadata; `dnf makecache` downloads it immediately. It is a good reflex after editing repository files or when you see errors mentioning metadata or checksums.",
   "Remember that repository configuration persists in files, so there is nothing extra to do for it to survive a reboot, but the files must be syntactically correct and reachable at boot time as well as now."
  ],
  "terms": [
   [
    "dnf config-manager",
    "dnf plugin command for adding repositories and enabling or disabling them."
   ],
   [
    "--add-repo",
    "Creates a .repo file in /etc/yum.repos.d from a repository URL or a downloaded .repo file."
   ],
   [
    "dnf repolist",
    "Lists enabled repositories; add all to include disabled ones, -v for details."
   ],
   [
    "dnf clean all",
    "Removes cached repository metadata and packages so dnf fetches fresh data."
   ],
   [
    "--enablerepo / --disablerepo",
    "Options that enable or disable a repository for one dnf command only."
   ]
  ],
  "example": "After running `dnf config-manager --add-repo` for the two URLs in the task, `dnf install httpd` fails with a GPG key error. You edit each generated file in /etc/yum.repos.d, add gpgcheck=0 as the task allows, run `dnf clean all` and `dnf repolist`, and the install now succeeds.",
  "tip": "config-manager --add-repo does not configure a GPG key. Check the generated file and add gpgcheck or gpgkey yourself, then confirm with dnf repolist.",
  "check": [
   [
    "How do you list disabled as well as enabled repositories?",
    "dnf repolist all."
   ],
   [
    "Why run `dnf clean all` after changing a repository's baseurl?",
    "To remove stale cached metadata so dnf downloads current metadata from the new location."
   ],
   [
    "How do you disable a repository persistently by its ID?",
    "dnf config-manager --set-disabled ID (or set enabled=0 in its .repo file)."
   ]
  ]
 },
 {
  "t": "Installing, updating and removing RPM packages with dnf (install, remove, update, reinstall, history undo)",
  "body": [
   "`dnf` is the package manager on RHEL. Its job is to install software from the configured repositories while resolving dependencies: if a package needs libraries or other packages, dnf finds and installs them too, and when you remove something it removes packages that depend on it. Almost every service task on the RHCSA begins with installing a package, so these commands need to be second nature.",
   "`dnf install package` installs one or more packages, showing a transaction summary and asking for confirmation; `-y` answers yes automatically. You can also install a local RPM file with `dnf install ./file.rpm`, and dnf will pull any missing dependencies from the repositories, which is why it is preferred over `rpm -i` for local files. `dnf remove package` uninstalls a package plus anything that depends on it; read the summary before confirming so you do not remove more than intended.",
   "`dnf update` (also spelled `dnf upgrade`) installs newer versions of all installed packages, or of the ones you name: `dnf update openssh-server`. `dnf check-update` lists available updates without installing them. Kernel packages are special: dnf installs the new kernel alongside the old ones rather than replacing it, so you can boot an older kernel if the new one has problems, and a limited number of kernels are kept.",
   "`dnf reinstall package` reinstalls the same version. This is the quick fix when files belonging to a package were deleted or damaged, for example a removed binary or a mangled default configuration file in a lab.",
   "```bash\ndnf install -y httpd mod_ssl\ndnf remove -y telnet\ndnf update -y\ndnf reinstall -y openssh-server\ndnf history               # list past transactions\ndnf history info 7        # what transaction 7 changed\ndnf history undo 7        # reverse it\n```",
   "Every dnf transaction is recorded. `dnf history` lists them with an ID, the command line, the date and the number of packages changed. `dnf history info ID` shows exactly which packages were installed, upgraded or removed. `dnf history undo ID` reverses that one transaction: packages it installed are removed and packages it removed are reinstalled, provided the needed versions are still available from a repository. `dnf history rollback ID` goes further and undoes every transaction after the given one.",
   "Useful safety habits: use `dnf list installed name` or `rpm -q name` to confirm a result, and `--assumeno` to see what a command would do without doing it. Most exam tasks only require that the software is installed and working afterwards, which often also means enabling and starting its service."
  ],
  "terms": [
   [
    "dnf install",
    "Installs packages and their dependencies from enabled repositories or local RPM files."
   ],
   [
    "dnf remove",
    "Uninstalls packages together with packages that depend on them."
   ],
   [
    "dnf update",
    "Upgrades installed packages to the newest available versions; also called dnf upgrade."
   ],
   [
    "dnf reinstall",
    "Reinstalls the current version of a package, restoring its files."
   ],
   [
    "dnf history undo",
    "Reverses the changes made by a specific recorded dnf transaction."
   ]
  ],
  "example": "In a lab you accidentally removed a package group that took several tools with it. `dnf history` shows the removal as transaction 12; `dnf history info 12` confirms the list, and `dnf history undo 12` reinstalls everything it removed.",
  "tip": "Prefer `dnf install ./file.rpm` over `rpm -i file.rpm` for local packages: dnf resolves dependencies from the repositories and records the change in dnf history.",
  "check": [
   [
    "How do you restore files deleted from an installed package?",
    "dnf reinstall package."
   ],
   [
    "What does `dnf history undo 5` do?",
    "It reverses transaction 5: removes what it installed and reinstalls what it removed, if those versions are available."
   ],
   [
    "Why does dnf keep old kernels after an update?",
    "New kernels are installed alongside old ones so you can boot a previous kernel if the new one fails."
   ]
  ]
 },
 {
  "t": "Finding packages and files: dnf search, dnf provides, dnf info",
  "body": [
   "Exam tasks rarely tell you the exact package name. They say 'install the tool that provides the semanage command' or 'make sure the system can serve web pages'. Three dnf subcommands bridge the gap between what you need and the package that delivers it.",
   "`dnf search keyword` looks for the keyword in package names and summaries across all enabled repositories. `dnf search web server` lists packages whose name or summary matches, with name matches shown first. If you get too few hits, `dnf search --all keyword` also searches descriptions and URLs. Search is best when you know the kind of software you want but not its name.",
   "`dnf provides` (also `dnf whatprovides`) answers a different question: which package contains a particular file or command? Give it a path, a command name or a glob. `dnf provides semanage` reports policycoreutils-python-utils; `dnf provides '*/bin/sealert'` finds the SELinux troubleshooting tool. Quote globs so the shell does not expand them first. This is the most useful of the three on the exam, because many tasks name a command rather than a package.",
   "```bash\ndnf search nfs\ndnf provides semanage\ndnf provides '*/bin/ifconfig'\ndnf info httpd\ndnf list --installed 'python3*'\ndnf list --available 'php*'\n```",
   "`dnf info package` shows a package's details: name, version, release, architecture, size, the repository it comes from, a summary and a description. The Repository field shows `@System` (or similar) when the package is already installed. Use it to confirm you have the right package before installing it, or to see what version is available.",
   "`dnf list` complements these by showing packages by name pattern, divided into installed and available sections, and it accepts globs such as `'kernel*'`. For files belonging to packages that are already installed, `rpm -qf /path` is faster than `dnf provides` because it only reads the local database, while `dnf provides` searches repository metadata and can therefore find files in packages you have not installed yet.",
   "These searches depend on working repositories. If they return nothing, first check `dnf repolist`: an empty or broken repository configuration is a more common cause than a missing package."
  ],
  "terms": [
   [
    "dnf search",
    "Searches package names and summaries (or with --all, descriptions too) for keywords."
   ],
   [
    "dnf provides",
    "Finds which package contains a given file, command or path glob; also called whatprovides."
   ],
   [
    "dnf info",
    "Displays details about a package, such as version, repository, size and description."
   ],
   [
    "dnf list",
    "Lists installed and available packages matching a name pattern."
   ],
   [
    "@System",
    "Label dnf uses to show that a package is installed locally rather than available from a repository."
   ]
  ],
  "example": "A task asks you to set an SELinux port label, but `semanage` is not found. `dnf provides semanage` shows that policycoreutils-python-utils supplies /usr/sbin/semanage, so you install that package and continue.",
  "tip": "When a task names a command, not a package, reach for `dnf provides command` (quote globs like '*/bin/name'). Use dnf search when you only know what the software does.",
  "check": [
   [
    "Which command tells you which package would install /usr/bin/dig?",
    "dnf provides /usr/bin/dig (or dnf provides dig)."
   ],
   [
    "How can dnf info show you whether a package is already installed?",
    "Installed packages list the repository as @System or appear under 'Installed Packages'."
   ],
   [
    "Why might dnf search return no results for a package that exists?",
    "The repositories may be misconfigured or disabled; check dnf repolist first."
   ]
  ]
 },
 {
  "t": "Querying installed packages with rpm -q, -qa, -qi, -ql, -qf, -qc",
  "body": [
   "While `dnf` handles repositories and dependencies, the lower-level `rpm` command reads the local RPM database directly, which describes every package installed on the system. Its query mode, `-q`, is fast, works offline and is the standard way to answer questions such as 'is this installed?', 'which files did it install?' or 'which package owns this file?'.",
   "`rpm -q package` checks whether a package is installed and prints its full name with version, release and architecture, such as `openssh-server-9.x-y.el10.x86_64`, or 'package X is not installed'. Because it sets its exit status accordingly, it is also handy in scripts. `rpm -qa` lists all installed packages; pipe it to grep or give it a glob, as in `rpm -qa 'kernel*'`, to narrow the list.",
   "The other options add detail about a package. `rpm -qi package` shows information similar to `dnf info`: version, install date, vendor, signature, summary and description. `rpm -ql package` lists every file the package installed. `rpm -qc package` lists only its configuration files, which is often the quickest way to discover where a service keeps its settings. `rpm -qd` lists its documentation files.",
   "`rpm -qf /path/to/file` works in the other direction: it tells you which installed package owns a file. `rpm -qf /etc/ssh/sshd_config` returns openssh-server. If the answer is 'not owned by any package', the file was created locally by an administrator or an application at runtime. Combine with `$(which command)` to find the package of a command: `rpm -qf $(which ss)`.",
   "```bash\nrpm -q httpd\nrpm -qa | wc -l\nrpm -qi chrony\nrpm -ql chrony | grep bin\nrpm -qc chrony            # /etc/chrony.conf and friends\nrpm -qf /usr/bin/ssh\nrpm -qp --list ./app.rpm  # query a package file not yet installed\n```",
   "Adding `-p` queries an RPM file instead of the installed database, so `rpm -qpl file.rpm` shows what a downloaded package would install before you install it. `rpm -V package` verifies installed files against the database and reports changed sizes, checksums or permissions, which helps spot modified or damaged files.",
   "Use rpm for queries, but install and remove with dnf. Installing with `rpm -i` does not resolve dependencies from repositories and is not recorded in dnf history."
  ],
  "terms": [
   [
    "RPM database",
    "The local database recording every installed package and its files, queried with rpm -q."
   ],
   [
    "rpm -qa",
    "Lists all installed packages."
   ],
   [
    "rpm -ql / -qc",
    "Lists all files, or only the configuration files, installed by a package."
   ],
   [
    "rpm -qf",
    "Shows which installed package owns a given file."
   ],
   [
    "rpm -qi",
    "Shows detailed information about an installed package."
   ]
  ],
  "example": "You need to change the NTP servers but are unsure of the file. `rpm -qc chrony` lists /etc/chrony.conf, so you edit it, add your server line and restart chronyd. Later `rpm -qf /etc/chrony.conf` confirms it belongs to chrony.",
  "tip": "Map the letters: a = all, i = info, l = list files, c = config files, f = which package owns this file, p = query a package file instead of the database.",
  "check": [
   [
    "Which command shows the package that owns /usr/sbin/sshd?",
    "rpm -qf /usr/sbin/sshd."
   ],
   [
    "How do you list only the configuration files of the httpd package?",
    "rpm -qc httpd."
   ],
   [
    "How can you see what files a downloaded RPM would install without installing it?",
    "rpm -qpl package.rpm."
   ]
  ]
 },
 {
  "t": "Package groups: dnf group list and dnf group install",
  "body": [
   "Some jobs need many packages at once: a graphical desktop, development tools or a full set of server utilities. Rather than listing dozens of names, repositories define package groups, and dnf can install a whole group in one command. The definitions come from the repository's group metadata (often called comps), so the available groups depend on your configured repositories.",
   "There are two kinds of grouping. A group is a set of related packages such as 'Development Tools' or 'System Tools'. An environment group is a larger bundle made of several groups, representing a complete kind of system, such as 'Server with GUI' or 'Minimal Install'; these are the choices you see in the installer. Inside a group, packages are classified as mandatory, default or optional. By default dnf installs the mandatory and default packages; optional ones need `--with-optional`.",
   "`dnf group list` shows available and installed environment groups and groups. Some groups are hidden by default; `dnf group list hidden` shows them too, and `dnf group list --ids` shows the short IDs that are easier to type than names with spaces. `dnf group info 'Development Tools'` lists the packages in a group by category, so you can see what you are about to install.",
   "```bash\ndnf group list\ndnf group list --ids\ndnf group info 'System Tools'\ndnf group install -y 'Development Tools'\ndnf group install -y --with-optional 'System Tools'\ndnf group remove 'Development Tools'\n```",
   "`dnf group install` installs a group or environment group. Put names containing spaces in quotes, or use the ID. The older syntax `dnf install @groupname` (and `@^environment` for environments) is equivalent and handy in scripts. `dnf group remove` removes packages that were installed as part of the group, and `dnf group upgrade` brings a group up to date, including packages newly added to its definition.",
   "On the RHCSA you might be asked to install a group to provide some tools, or to install a group then verify a command from it works. Check your result with `dnf group list --installed` or by running one of the expected commands. As with any dnf work, if `dnf group list` shows nothing useful, check that your repository configuration includes the repositories that carry the group data; on RHEL both BaseOS and AppStream contribute."
  ],
  "terms": [
   [
    "Package group",
    "A named set of related packages defined in repository metadata, installable in one step."
   ],
   [
    "Environment group",
    "A larger bundle of groups representing a complete system type, such as Server with GUI."
   ],
   [
    "Mandatory / default / optional",
    "Package classes within a group; dnf installs mandatory and default unless told --with-optional."
   ],
   [
    "dnf group info",
    "Shows the packages contained in a group, sorted by class."
   ],
   [
    "@group syntax",
    "Shorthand for groups in dnf install, e.g. dnf install @development; @^ marks an environment group."
   ]
  ],
  "example": "A developer needs a compiler and make on a minimal server. `dnf group list --ids` shows development-tools; `dnf group info development-tools` confirms gcc and make are included, and `dnf group install -y development-tools` installs them. `gcc --version` proves it worked.",
  "tip": "Quote group names with spaces or use their IDs, and remember optional packages are not installed unless you add --with-optional.",
  "check": [
   [
    "How do you see which packages a group contains before installing it?",
    "dnf group info 'Group Name'."
   ],
   [
    "What is the difference between a group and an environment group?",
    "An environment group is a larger bundle composed of several groups describing a whole system type."
   ],
   [
    "Which alternative syntax installs a group with dnf install?",
    "dnf install @groupname (or @^environmentname for an environment group)."
   ]
  ]
 },
 {
  "t": "Configuring access to Flatpak repositories: flatpak remote-add, flatpak remotes",
  "body": [
   "Flatpak is a second way to distribute software on RHEL, aimed mainly at desktop applications. A Flatpak application is packaged together with a runtime, a shared set of libraries it runs on, and it executes in a sandbox that limits what it can access on the host. Because applications bring their own runtime, they can be updated independently of the operating system's RPM packages. The current EX200 objectives include configuring Flatpak repositories and managing Flatpak applications.",
   "Flatpak repositories are called remotes. A remote is a named source of applications and runtimes, much like a dnf repository, but configured with the `flatpak` command rather than a `.repo` file. Remotes can be added system-wide, available to all users and stored under `/var/lib/flatpak`, which is the default (it needs root or administrator authorization), or per user with `--user`, stored under `~/.local/share/flatpak`. Make sure the flatpak package itself is installed first (`dnf install flatpak`).",
   "`flatpak remote-add` adds a remote. You give it a name and a location, which is usually a `.flatpakrepo` file: a small descriptor containing the repository URL, title and the GPG key used to verify its content. `--if-not-exists` makes the command succeed quietly if the remote is already there, which is useful in scripts and when repeating a task.",
   "```bash\nflatpak remote-add --if-not-exists myremote /path/or/url/to/myremote.flatpakrepo\nflatpak remotes                 # list configured remotes\nflatpak remotes --show-details  # include URLs and options\nflatpak remote-ls myremote      # what the remote offers\nflatpak remote-modify --disable myremote\nflatpak remote-delete myremote\n```",
   "`flatpak remotes` lists the configured remotes with their name and options such as `system` or `user`; `--show-details` adds titles and URLs. `flatpak remote-ls NAME` lists the applications and runtimes available from a remote, which is the Flatpak equivalent of checking that a repository works. `remote-modify` changes settings of an existing remote, for example disabling it, and `remote-delete` removes it.",
   "Signatures matter here as with RPM. A `.flatpakrepo` file normally includes the GPG key, so content is verified automatically. If you add a remote directly by URL without a key, you may need to supply one with `--gpg-import=keyfile`; disabling verification with `--no-gpg-verify` should only be done in a controlled lab and only if a task explicitly allows it. On the exam, use exactly the remote name and location the task specifies, since graders check the name with `flatpak remotes`."
  ],
  "terms": [
   [
    "Flatpak",
    "A system for distributing sandboxed applications that ship with their own runtimes, independent of RPM packages."
   ],
   [
    "Remote",
    "A named Flatpak repository from which applications and runtimes are installed."
   ],
   [
    "Runtime",
    "A shared set of libraries and services that Flatpak applications run on top of."
   ],
   [
    ".flatpakrepo file",
    "A descriptor containing a remote's URL, title and GPG key, used with flatpak remote-add."
   ],
   [
    "System vs user installation",
    "System remotes and apps are shared by all users (/var/lib/flatpak); --user ones live in the user's home."
   ]
  ],
  "example": "A task asks for a system-wide Flatpak remote named examplerepo using the .flatpakrepo file provided on the classroom server. As root you run `flatpak remote-add --if-not-exists examplerepo` with that location, then `flatpak remotes` shows examplerepo with the system option and `flatpak remote-ls examplerepo` lists its applications.",
  "tip": "Check whether the task wants a system-wide remote (run as root, the default) or a per-user one (--user). The remote name you choose must match the task exactly.",
  "check": [
   [
    "What command lists the Flatpak remotes configured on a system?",
    "flatpak remotes (add --show-details for URLs)."
   ],
   [
    "What does --if-not-exists do in flatpak remote-add?",
    "It makes the command succeed without error when a remote of that name already exists."
   ],
   [
    "Where are system-wide Flatpak remotes and applications stored?",
    "Under /var/lib/flatpak; per-user ones are under ~/.local/share/flatpak."
   ]
  ]
 },
 {
  "t": "Installing, listing, updating and removing Flatpak applications (flatpak install, list, update, uninstall, run)",
  "body": [
   "Once a remote is configured, the `flatpak` command manages applications from it in much the same way dnf manages RPMs. The difference is in the naming: Flatpak applications are identified by an application ID in reverse-DNS form, such as `org.example.Editor`, and a full reference (ref) also includes the architecture and branch, like `app/org.example.Editor/x86_64/stable`.",
   "`flatpak install REMOTE APPID` installs an application and, automatically, any runtime it needs. Without a remote name, flatpak searches all configured remotes and asks you to choose. `-y` answers prompts automatically, and `--user` or `--system` selects where it is installed; system installs are the default. `flatpak search keyword` finds application IDs across remotes when you do not know the exact name.",
   "```bash\nflatpak search editor\nflatpak install -y myremote org.example.Editor\nflatpak list                 # installed apps and runtimes\nflatpak list --app           # apps only\nflatpak info org.example.Editor\nflatpak run org.example.Editor\nflatpak update -y\nflatpak uninstall -y org.example.Editor\nflatpak uninstall --unused   # remove runtimes no app needs\n```",
   "`flatpak list` shows what is installed: name, application ID, version, branch, origin remote and installation (system or user). `--app` limits the list to applications and `--runtime` to runtimes. `flatpak info APPID` shows details of one installed application, including the runtime it uses and its installed size.",
   "`flatpak run APPID` starts an application inside its sandbox. Desktop environments also add installed Flatpaks to their application menus, but on a server or exam system `flatpak run` is the direct way to prove an application works. The sandbox restricts the application to the permissions its packager declared, which you can inspect with `flatpak info --show-permissions APPID`.",
   "`flatpak update` updates all installed applications and runtimes to their latest versions from their remotes, or only the one you name. `flatpak uninstall APPID` removes an application, but leaves its runtime in place because other applications may share it; `flatpak uninstall --unused` cleans up runtimes that nothing needs any more. Adding `--delete-data` also removes the application's saved data in users' home directories.",
   "Flatpak and dnf are independent: `rpm -qa` will not show Flatpak applications and `flatpak list` will not show RPMs. When a task says 'install the application from the Flatpak repository', verify with `flatpak list`, not rpm."
  ],
  "terms": [
   [
    "Application ID",
    "A reverse-DNS style identifier for a Flatpak app, such as org.example.Editor."
   ],
   [
    "Ref",
    "A full Flatpak reference combining type, ID, architecture and branch, e.g. app/ID/x86_64/stable."
   ],
   [
    "flatpak install",
    "Installs an application and its required runtime from a remote."
   ],
   [
    "flatpak run",
    "Starts an installed Flatpak application in its sandbox."
   ],
   [
    "flatpak uninstall --unused",
    "Removes runtimes and extensions no longer needed by any installed application."
   ]
  ],
  "example": "A task asks you to install an application from the examplerepo remote for all users. You run `flatpak search` to get its ID, install it as root with `flatpak install -y examplerepo org.example.App`, confirm with `flatpak list --app` that the Installation column says system, and start it with `flatpak run org.example.App`.",
  "tip": "Use the application ID (reverse-DNS name) with flatpak commands, and verify Flatpak tasks with flatpak list; rpm and dnf know nothing about Flatpak apps.",
  "check": [
   [
    "Which command shows installed Flatpak applications but not runtimes?",
    "flatpak list --app."
   ],
   [
    "Why doesn't uninstalling an app remove its runtime?",
    "Runtimes can be shared by several apps; use flatpak uninstall --unused to remove unneeded ones."
   ],
   [
    "How do you start a Flatpak application from the command line?",
    "flatpak run followed by its application ID."
   ]
  ]
 },
 {
  "t": "Shebang lines, making scripts executable and running them from PATH",
  "body": [
   "A shell script is a text file containing commands you could type at the prompt, saved so they can run again reliably. The RHCSA asks you to write simple scripts, and a script only counts if it runs the way the task describes: usually by name, from anywhere, with the right interpreter. Three things make that happen: the shebang line, the execute permission and the PATH.",
   "The shebang is the first line of the script and starts with `#!` followed by the absolute path of the interpreter, for Bash scripts `#!/bin/bash`. When you run the file as a program, the kernel reads this line and starts that interpreter with the script as its input. Without a shebang, your current shell usually runs the file itself, which may work by accident but is not reliable. The shebang must be the very first line, with no blank line or space before it.",
   "```bash\n#!/bin/bash\n# report.sh - show host name and disk usage\necho \"Host: $(hostname)\"\ndf -h /\n```",
   "Next, the file needs execute permission: `chmod +x report.sh` (or `chmod 755`). Without it, running `./report.sh` gives 'Permission denied'. You can still run a non-executable script by passing it to the interpreter explicitly, `bash report.sh`, which is useful for testing, but tasks normally expect the file itself to be executable. Also note that the script runs in a new child process, so variables it sets and directory changes it makes do not affect your current shell; `source report.sh` (or `. report.sh`) runs it in the current shell instead.",
   "Finally, the shell finds commands by searching the directories listed in the PATH environment variable, in order. `echo $PATH` shows it. The current directory is deliberately not in PATH, which is why you must type `./report.sh` to run a script in the current directory. To run it by name alone, place it in a directory that is in PATH. `/usr/local/bin` is the conventional place for administrator scripts available to all users, and `~/bin` or `~/.local/bin` are added to each user's PATH by the default RHEL shell startup files.",
   "```bash\nvim /usr/local/bin/report.sh\nchmod 755 /usr/local/bin/report.sh\nreport.sh              # works from any directory\nwhich report.sh        # /usr/local/bin/report.sh\n```",
   "If a script behaves strangely, run it with `bash -x script` to print each command as it executes. And check for Windows line endings if you copied it from elsewhere: a stray carriage return after `/bin/bash` produces a confusing 'bad interpreter' error."
  ],
  "terms": [
   [
    "Shebang",
    "The #! first line naming the interpreter, e.g. #!/bin/bash, used when the file is executed."
   ],
   [
    "Execute permission",
    "The x permission that lets a file be run as a program; set with chmod +x."
   ],
   [
    "PATH",
    "Environment variable listing directories the shell searches, in order, for commands."
   ],
   [
    "/usr/local/bin",
    "Conventional system-wide directory in PATH for locally created scripts and programs."
   ],
   [
    "source",
    "Runs a script in the current shell rather than a child process; also written as a dot."
   ]
  ],
  "example": "A task asks for a command called `sysinfo` that any user can run. You create /usr/local/bin/sysinfo starting with #!/bin/bash, add the commands, run `chmod 755 /usr/local/bin/sysinfo`, then log in as a normal user and type `sysinfo` from /tmp to prove it works from PATH.",
  "tip": "Running a script by name needs all three: a correct shebang on line 1, execute permission, and a location in PATH. Otherwise you must use ./script or bash script.",
  "check": [
   [
    "Why must you type ./myscript.sh even when you are in its directory?",
    "The current directory is not in PATH, so you must give a path to the file."
   ],
   [
    "What error do you get running an executable script without x permission, and how do you fix it?",
    "Permission denied; fix it with chmod +x (or run it with bash script)."
   ],
   [
    "Where should a system-wide admin script be placed so every user can run it by name?",
    "In /usr/local/bin, which is in the default PATH."
   ]
  ]
 },
 {
  "t": "Conditionally running code with if, elif, else and test / [ ] (-f, -d, -z, -eq, -gt, string compares)",
  "body": [
   "Scripts become useful when they make decisions: create a directory only if it is missing, refuse to run without an argument, warn when a disk is nearly full. Bash makes decisions with `if`, which runs a command and branches on its exit status: zero means true (success) and anything else means false.",
   "The command most often used in an `if` is `test`, usually written in its bracket form `[ ... ]`. The `[` is itself a command whose last argument must be `]`, which is why the spaces are mandatory: `[ -f file ]` works, while `[-f file]` is an error. Bash also offers `[[ ... ]]`, a more forgiving built-in form, but plain `[ ]` is portable and is what most exam material uses.",
   "```bash\n#!/bin/bash\nif [ -d /backup ]; then\n    echo \"/backup exists\"\nelif [ -f /backup ]; then\n    echo \"/backup is a file, not a directory\"\nelse\n    mkdir -p /backup\nfi\n```",
   "File tests check the file system. `-e` is true if the path exists, `-f` if it is a regular file, `-d` if it is a directory, `-r`, `-w` and `-x` if you can read, write or execute it, and `-s` if the file exists and is not empty. String tests compare text: `-z \"$var\"` is true if the string is empty, `-n \"$var\"` if it is not, `=` tests equality and `!=` inequality. Always quote variables inside `[ ]`; an unquoted empty variable disappears and leaves the test with a missing operand.",
   "Numbers use different operators because `<` and `>` are redirections to the shell. Use `-eq` (equal), `-ne` (not equal), `-lt` (less than), `-le`, `-gt` (greater than) and `-ge`. So `[ \"$count\" -gt 10 ]` compares numerically, while `[ \"$a\" = \"$b\" ]` compares strings. Mixing them up is a classic mistake: `[ 10 = 10.0 ]` is false as strings, and `-eq` with non-numbers gives an 'integer expression expected' error. `!` negates a test: `[ ! -d /data ]`.",
   "The structure is always `if condition; then ... fi`, with optional `elif condition; then` branches and a final `else`. Each `if` must end with `fi`. You can combine tests with `&&` and `||` between separate brackets: `if [ -f \"$1\" ] && [ -r \"$1\" ]; then`. Any command can be the condition, not only test: `if grep -q '^harry:' /etc/passwd; then` branches on whether grep found a match, with `-q` keeping it quiet.",
   "Indent the body of each branch consistently. The shell does not care, but you will read and debug the script faster under exam time pressure."
  ],
  "terms": [
   [
    "test / [ ]",
    "Command that evaluates a condition and returns exit status 0 (true) or 1 (false); spaces around brackets are required."
   ],
   [
    "-f / -d / -e",
    "Tests for a regular file, a directory, or any existing path."
   ],
   [
    "-z / -n",
    "Tests whether a string is empty or not empty."
   ],
   [
    "-eq / -gt / -lt",
    "Numeric comparison operators: equal, greater than, less than (also -ne, -ge, -le)."
   ],
   [
    "elif",
    "Additional condition checked only if the previous if or elif was false."
   ]
  ],
  "example": "A script must print 'large' if the file given as its argument is bigger than 1024 bytes. You get the size with `size=$(stat -c %s \"$1\")` and test `if [ \"$size\" -gt 1024 ]; then echo large; else echo small; fi`, first checking `[ -f \"$1\" ]` so a missing file gives a clear message.",
  "tip": "Use -eq/-gt/-lt for numbers and = / != for strings, keep spaces inside the brackets, and quote every variable in a test.",
  "check": [
   [
    "Why does `[\"$a\" = \"b\"]` fail?",
    "There must be spaces after [ and before ], because [ is a command and ] its final argument."
   ],
   [
    "Which test is true if a variable is empty?",
    "[ -z \"$var\" ]."
   ],
   [
    "How do you test whether the number in $n is greater than 5?",
    "[ \"$n\" -gt 5 ]; > would be treated as a redirection."
   ]
  ]
 },
 {
  "t": "Exit status ($?), && and ||, and exit codes in scripts",
  "body": [
   "Every command that finishes returns an exit status, a number from 0 to 255. By convention 0 means success and any non-zero value means some kind of failure; the specific value can identify the error, and a command's man page often documents its codes. The shell uses exit statuses to drive `if`, `while`, `&&` and `||`, so understanding them is the key to scripts that react correctly to failure.",
   "The special variable `$?` holds the exit status of the most recently completed command. Check it immediately, because the next command, even `echo`, replaces it. For example, `grep -q harry /etc/passwd; echo $?` prints 0 if harry exists and 1 if not; grep uses 2 for errors such as a missing file.",
   "```bash\nls /nonexistent\necho $?                    # 2 for ls: serious trouble\nmkdir -p /backup && cp -a /etc /backup/   # copy only if mkdir worked\nping -c1 -W1 serverb || echo \"serverb unreachable\"\nsystemctl is-active sshd && echo up || echo down\n```",
   "`&&` and `||` chain commands based on status. `cmd1 && cmd2` runs cmd2 only if cmd1 succeeded; `cmd1 || cmd2` runs cmd2 only if cmd1 failed. They let you write short guard lines such as `cd /data || exit 1`, which stops a script rather than continuing in the wrong directory. The combination `a && b || c` is often used as a compact if/else, but beware: c also runs if a succeeded and b failed, so use a real `if` when that matters.",
   "Scripts return exit codes too. The `exit` built-in ends the script immediately with the number you give, `exit 0` for success or `exit 1` (or another non-zero value) for failure. Without an explicit exit, a script returns the status of the last command it ran. Setting a clear code matters because other tools rely on it: a scheduled job, a systemd service or another script can only know your script failed if it returns non-zero. A task might say 'if no argument is given, print a usage message and exit with status 2'.",
   "```bash\n#!/bin/bash\nif [ $# -ne 1 ]; then\n    echo \"Usage: $0 username\" >&2\n    exit 2\nfi\nid \"$1\" &> /dev/null || { echo \"no such user\" >&2; exit 1; }\necho \"$1 exists\"\nexit 0\n```",
   "In that script, `>&2` sends error messages to stderr, which is good practice, and the braces group several commands to run after `||`. You can verify a script's code the same way as any command: run it, then `echo $?`. Some administrators also add `set -e` to stop on any failing command, but it has surprising exceptions, so explicit checks are clearer for exam scripts."
  ],
  "terms": [
   [
    "Exit status",
    "A number 0 to 255 returned by every command; 0 means success, non-zero means failure."
   ],
   [
    "$?",
    "Special variable holding the exit status of the last command that finished."
   ],
   [
    "&&",
    "Runs the next command only if the previous one succeeded (exit status 0)."
   ],
   [
    "||",
    "Runs the next command only if the previous one failed (non-zero exit status)."
   ],
   [
    "exit",
    "Built-in that ends a script immediately with a given status code."
   ]
  ],
  "example": "A backup script starts with `mountpoint -q /backup || { echo 'backup disk not mounted' >&2; exit 1; }`. When the disk is missing, the script stops with status 1 instead of filling the root file system, and the cron job's failure is visible in the logs.",
  "tip": "$? is overwritten by every command, including echo and [ ]; save it to a variable (rc=$?) right away if you need it later.",
  "check": [
   [
    "What exit status indicates success?",
    "0; any non-zero value indicates failure."
   ],
   [
    "In `mkdir /data && touch /data/ok`, when does touch run?",
    "Only if mkdir succeeded."
   ],
   [
    "What status does a script return if it has no exit command?",
    "The exit status of the last command it executed."
   ]
  ]
 },
 {
  "t": "Looping with for (over lists, globs, $(seq)) and while read",
  "body": [
   "Loops let a script repeat work: create ten users, check every configuration file, process each line of a list. Bash has two loops you need for the RHCSA: `for`, which walks through a list of words, and `while`, which repeats as long as a command succeeds. Combined with `read`, a while loop processes a file line by line.",
   "A `for` loop assigns each item in a list to a variable in turn and runs the body once per item. The list can be written literally, produced by a glob that matches file names, or generated by a command. The structure is `for var in list; do ... done`.",
   "```bash\nfor user in alice bob carol; do\n    useradd \"$user\"\ndone\n\nfor f in /etc/*.conf; do\n    echo \"$f: $(wc -l < \"$f\") lines\"\ndone\n\nfor n in $(seq 1 5); do\n    echo \"server$n\"\ndone\n```",
   "Globs in a for loop are expanded by the shell into matching file names, which is safer than parsing `ls` output because names with spaces stay intact. If nothing matches, the loop receives the literal pattern, so scripts often test `[ -e \"$f\" ] || continue` inside the loop. `seq FIRST LAST` prints a sequence of numbers, and `seq 0 5 20` counts in steps of 5. Bash's brace expansion `{1..5}` gives a similar sequence without running a command, and C-style loops `for ((i=1; i<=5; i++))` also work.",
   "A `while` loop repeats while its condition command returns 0. `while read line` is the standard idiom for reading input line by line: `read` returns success each time it gets a line and failure at the end of the input, which ends the loop. Feed the file with a redirection after `done`.",
   "```bash\nwhile read -r name uid; do\n    echo \"Creating $name with UID $uid\"\n    useradd -u \"$uid\" \"$name\"\ndone < /root/newusers.txt\n```",
   "`read` splits each line on whitespace into the variables you name, with any leftover words going into the last one. `-r` stops backslashes being treated as escapes, which is almost always what you want. To split on another character, set IFS (the Internal Field Separator) for the read only: `while IFS=: read -r user x uid rest; do ... done < /etc/passwd`. Inside any loop, `continue` skips to the next item and `break` leaves the loop entirely.",
   "A caution: piping into a while loop (`cat file | while read ...`) runs the loop in a subshell, so variables set inside it are lost afterwards. Redirecting with `< file` avoids that."
  ],
  "terms": [
   [
    "for loop",
    "Repeats a block once for each word in a list, assigning the word to a variable."
   ],
   [
    "while loop",
    "Repeats a block as long as its condition command returns exit status 0."
   ],
   [
    "read",
    "Built-in that reads one line of input into variables; returns non-zero at end of input."
   ],
   [
    "seq",
    "Command that prints a sequence of numbers, e.g. seq 1 10."
   ],
   [
    "IFS",
    "Internal Field Separator: the characters read and word splitting use to split text."
   ]
  ],
  "example": "Given /root/hosts.txt with one host name per line, you write `while read -r h; do ping -c1 -W1 \"$h\" &>/dev/null && echo \"$h up\" || echo \"$h down\"; done < /root/hosts.txt` and get a quick status report for every host.",
  "tip": "Loop over files with a glob (for f in /dir/*), not with $(ls), and read files line by line with while read -r ... done < file rather than for line in $(cat file), which splits on every space.",
  "check": [
   [
    "How do you loop over the numbers 1 to 10?",
    "for i in $(seq 1 10); do ...; done (or for i in {1..10})."
   ],
   [
    "What ends a `while read line` loop?",
    "read returns a non-zero status at the end of the input, making the while condition false."
   ],
   [
    "What does `break` do inside a loop?",
    "It exits the loop immediately; continue would skip to the next iteration instead."
   ]
  ]
 },
 {
  "t": "Processing script inputs: $1, $2, $#, $@ and $0",
  "body": [
   "Scripts are far more useful when they accept input on the command line, like normal commands do. When you run `./adduser.sh harry 2001`, the words after the script name are its arguments, also called positional parameters, and Bash makes them available through special variables. Exam tasks frequently specify exactly how a script should respond to its arguments, including what to do when they are missing.",
   "`$1` is the first argument, `$2` the second, and so on; from the tenth on you need braces, `${10}`. `$0` holds the name the script was run with, including any path you typed, so it is ideal for usage messages. `$#` is the number of arguments, which lets you check that the user supplied what the script needs.",
   "`$@` expands to all the arguments. Written in double quotes, `\"$@\"`, it expands to each argument as a separate word, preserving arguments that contain spaces, which makes it the right choice for loops and for passing arguments on to another command. `$*` also means all arguments, but `\"$*\"` joins them into one single word separated by spaces; it is mainly useful for printing them together.",
   "```bash\n#!/bin/bash\n# mkusers.sh - create each user named on the command line\nif [ $# -eq 0 ]; then\n    echo \"Usage: $0 user [user...]\" >&2\n    exit 1\nfi\necho \"Creating $# user(s)\"\nfor u in \"$@\"; do\n    useradd \"$u\" && echo \"created $u\"\ndone\n```",
   "Always quote positional parameters when you use them: `\"$1\"` rather than `$1`. If an argument is empty or contains spaces, an unquoted reference is split or disappears, which can make tests fail with confusing errors or pass the wrong names to commands. Checking `$#` at the top of the script and printing a usage line to stderr with a non-zero exit status is the standard defensive pattern.",
   "`shift` discards `$1` and moves every other argument down one place, so `$2` becomes `$1` and `$#` decreases by one. It is useful for handling a first special argument and then treating the rest as a list, or for processing arguments one at a time in a `while [ $# -gt 0 ]` loop. You can also supply default values: `${1:-/tmp}` uses the first argument if given and `/tmp` otherwise.",
   "Test your script with zero, one and several arguments, including one containing a space, before you consider an exam task finished. `bash -x ./script a 'b c'` shows exactly how each parameter was expanded."
  ],
  "terms": [
   [
    "Positional parameters",
    "The arguments passed to a script, available as $1, $2 and so on."
   ],
   [
    "$0",
    "The name of the script as it was invoked."
   ],
   [
    "$#",
    "The number of arguments passed to the script."
   ],
   [
    "\"$@\"",
    "All arguments as separate, correctly quoted words; the right form for loops and passing arguments on."
   ],
   [
    "shift",
    "Discards $1 and renumbers the remaining arguments down by one."
   ]
  ],
  "example": "A task wants /usr/local/bin/greet that prints 'Hello NAME' for its first argument, or prints 'Usage: greet name' and exits 1 if none is given. You test `[ $# -lt 1 ]` for the usage branch, then use `echo \"Hello $1\"`, and try it with no argument and with 'Ada Lovelace' in quotes.",
  "tip": "Use \"$@\" (with quotes) to loop over or pass on all arguments; unquoted $@ or $* splits arguments that contain spaces.",
  "check": [
   [
    "If a script is run as `./s.sh a b c`, what are $# and $2?",
    "$# is 3 and $2 is b."
   ],
   [
    "What does $0 contain?",
    "The name (and path, as typed) used to run the script."
   ],
   [
    "Why is \"$@\" preferred over $* in a for loop?",
    "\"$@\" keeps each argument as one word even if it contains spaces; $* splits or joins them."
   ]
  ]
 },
 {
  "t": "Processing the output of shell commands with $( ) command substitution",
  "body": [
   "Command substitution runs a command and puts its output into your command line or into a variable. It is how a script learns facts about the system, such as the host name, today's date, the number of lines in a file or the IP address of an interface, and then uses them in messages, file names or tests.",
   "The syntax is `$(command)`. The shell runs the command in a subshell, captures its standard output, removes trailing newlines and substitutes the result in place. `today=$(date +%F)` stores something like 2026-09-25 in a variable, and `echo \"Kernel: $(uname -r)\"` embeds the output directly in a message. The older form, which wraps the command in backquote characters, does the same thing but is harder to read and to nest, so prefer `$( )`.",
   "```bash\n#!/bin/bash\nhost=$(hostname -s)\nusers=$(who | wc -l)\nrootuse=$(df --output=pcent / | tail -1 | tr -d ' %')\necho \"$host has $users login(s); / is ${rootuse}% full\"\nif [ \"$rootuse\" -gt 90 ]; then\n    echo \"WARNING: root file system almost full\" >&2\nfi\ntar -czf /backup/etc-$(date +%F).tar.gz /etc\n```",
   "Often you must trim a command's output down to exactly the value you need, and a pipeline inside the substitution does that. `cut` selects fields (`cut -d: -f1 /etc/passwd` gives user names), `awk '{print $2}'` prints a whitespace-separated column, `tr` deletes or translates characters, `head` and `tail` pick lines and `grep` filters them. Try the pipeline at the prompt first and only then wrap it in `$( )`.",
   "Only stdout is captured. Error messages still go to the terminal, so add `2>/dev/null` inside the parentheses if you want them silenced. The command's exit status is available afterwards in `$?`, which lets you write `out=$(some_cmd) || echo 'failed'`.",
   "Quoting matters here too. When you use a substitution as an argument, put it in double quotes, `\"$(command)\"`, to keep its output as one word; unquoted, the result is split on whitespace and glob characters in it are expanded. The exception is when you deliberately want word splitting, such as `for u in $(cut -d: -f1 /etc/passwd)`, which gives one loop iteration per user name.",
   "Substitutions nest cleanly: `echo \"Config owned by $(rpm -qf $(which sshd))\"` finds the sshd binary and then the package that owns it."
  ],
  "terms": [
   [
    "Command substitution",
    "$(command): replaces itself with the standard output of the command."
   ],
   [
    "Backticks",
    "The older `command` form of command substitution; equivalent but harder to nest."
   ],
   [
    "cut",
    "Extracts fields or character ranges from each line, e.g. cut -d: -f1."
   ],
   [
    "awk '{print $N}'",
    "Prints the Nth whitespace-separated field of each line."
   ],
   [
    "Subshell",
    "A child copy of the shell in which the substituted command runs."
   ]
  ],
  "example": "A task asks for a script that saves a list of users with UID 1000 or above into a file named after the host. You compute `file=/root/users-$(hostname -s).txt` and fill it with `awk -F: '$3 >= 1000 {print $1}' /etc/passwd > \"$file\"`.",
  "tip": "$( ) captures stdout only and strips trailing newlines. Quote it (\"$(cmd)\") unless you intentionally want the output split into separate words.",
  "check": [
   [
    "How do you store the current date as YYYY-MM-DD in a variable?",
    "d=$(date +%F)."
   ],
   [
    "Does $(command) capture error messages?",
    "No, only standard output; redirect 2>&1 inside the parentheses to include them."
   ],
   [
    "Why prefer $( ) over backticks?",
    "It is easier to read and nests without escaping."
   ]
  ]
 },
 {
  "t": "Reading input and using variables and quoting correctly",
  "body": [
   "Variables hold values in a script: names, paths, counts. In Bash you assign with `name=value` and there must be no spaces around the `=`; `name = value` would try to run a command called name. You use the value with `$name`, or `${name}` when the name is followed by other characters, as in `${file}.bak`. Variable names are case-sensitive, and by convention scripts use lowercase for their own variables and leave uppercase for environment variables such as PATH and HOME.",
   "A variable exists only in the current shell unless you export it. `export NAME=value` makes it part of the environment passed to child processes, which is how programs started from your script see it. Variables set inside a script vanish when the script ends, because the script runs in its own process.",
   "`read` takes input from the user or from stdin. `read name` waits for a line and stores it in name; `read -p 'Enter user: ' user` shows a prompt first. `-s` hides typing, useful for passwords, and `-t 10` times out after ten seconds. With several variable names, read splits the line on whitespace and puts the remainder in the last variable.",
   "```bash\n#!/bin/bash\nread -p \"Directory to archive: \" dir\nif [ -z \"$dir\" ] || [ ! -d \"$dir\" ]; then\n    echo \"Not a directory: '$dir'\" >&2\n    exit 1\nfi\ndest=\"/backup/$(basename \"$dir\")-$(date +%F).tar.gz\"\ntar -czf \"$dest\" \"$dir\" && echo \"Saved to $dest\"\n```",
   "Quoting controls what the shell expands, and it is where most script bugs come from. Double quotes, `\"...\"`, allow variable expansion, command substitution and backslash escapes, but prevent word splitting and glob expansion, so `\"$dir\"` stays a single argument even if it contains spaces. Single quotes, `'...'`, prevent all expansion: `echo '$HOME'` prints the literal text $HOME. A backslash escapes a single character: `echo \\$HOME` also prints $HOME.",
   "The practical rule is simple: put double quotes around every variable and command substitution unless you have a specific reason not to. Use single quotes for fixed strings that contain special characters, such as regular expressions for grep or awk programs. You can mix them: `echo \"User $USER said 'hello'\"` works because single quotes inside double quotes are ordinary characters.",
   "Arithmetic has its own syntax. `$(( ))` evaluates integer expressions: `count=$((count + 1))` or `echo $((60 * 60))`. Inside the double parentheses you do not need `$` before variable names. Bash arithmetic is integer only, so `$((7 / 2))` is 3."
  ],
  "terms": [
   [
    "Variable assignment",
    "name=value with no spaces around =; referenced later as $name or ${name}."
   ],
   [
    "export",
    "Marks a variable for inclusion in the environment of child processes."
   ],
   [
    "read -p",
    "Reads a line of input into variables after displaying a prompt."
   ],
   [
    "Double quotes",
    "Allow $ expansion but prevent word splitting and globbing."
   ],
   [
    "Single quotes",
    "Prevent all expansion; the text is taken literally."
   ]
  ],
  "example": "A script asks for a user name with `read -p 'User: ' u` and runs `id $u`. When someone presses Enter without typing, unquoted $u vanishes and id reports on the current user (root) instead. Changing the test to `[ -z \"$u\" ] && exit 1` and using `id \"$u\"` fixes the bug.",
  "tip": "No spaces around = in assignments, double quotes around every $variable, single quotes when you want text taken literally. `'$HOME'` prints $HOME; `\"$HOME\"` prints /root.",
  "check": [
   [
    "What is wrong with `count = 5`?",
    "Spaces around = make Bash run a command named count; it must be count=5."
   ],
   [
    "What does `echo '$USER'` print?",
    "The literal text $USER, because single quotes prevent expansion."
   ],
   [
    "How do you add 1 to the variable n?",
    "n=$((n + 1))."
   ]
  ]
 },
 {
  "t": "case statements for simple argument handling",
  "body": [
   "When a script must choose among several fixed options, such as start, stop and status, a long chain of `if`/`elif` string comparisons becomes hard to read. The `case` statement matches one value against a list of patterns and runs the block for the first pattern that matches. It is the standard way to handle a command-line argument that selects an action.",
   "The structure is `case WORD in`, then one or more clauses, then `esac` (case spelled backwards). Each clause is a pattern ending in `)`, followed by commands, and ends with `;;`. The patterns are shell glob patterns, not regular expressions: `*` matches anything, `?` any single character and `[ ]` a set. You can list alternatives in one clause with `|`. A final `*)` clause acts as the default, catching anything not matched earlier.",
   "```bash\n#!/bin/bash\n# svc.sh - control the web server\ncase \"$1\" in\n    start|up)\n        systemctl start httpd ;;\n    stop|down)\n        systemctl stop httpd ;;\n    status)\n        systemctl status httpd --no-pager ;;\n    *)\n        echo \"Usage: $0 {start|stop|status}\" >&2\n        exit 1 ;;\nesac\n```",
   "Patterns are tested in order and only the first match runs, so put specific patterns before general ones and the catch-all `*)` last. Quote the word being tested, `\"$1\"`, so an empty or spaced argument is handled cleanly; an empty argument then falls through to the default clause, which is exactly where you print a usage message and exit with a non-zero status.",
   "Case patterns make it easy to accept variations. `[Yy]|[Yy][Ee][Ss])` matches y, Y, yes, YES and mixed case, and `*.tar.gz|*.tgz)` matches file names by extension. This makes `case` useful for interpreting user input from `read`, too: ask a question, then use case to decide what the answer means.",
   "Case also combines well with loops. A common pattern processes options one at a time: `while [ $# -gt 0 ]; do case \"$1\" in -v) verbose=1 ;; -h) usage ;; *) files+=(\"$1\") ;; esac; shift; done`. For the RHCSA, the simpler form of matching a single argument against a few words is usually enough.",
   "Watch the punctuation, since it is the usual source of syntax errors: `in` after the word, `)` after each pattern, `;;` at the end of each clause and `esac` at the end. Running `bash -n script` checks the syntax without executing anything."
  ],
  "terms": [
   [
    "case ... esac",
    "Statement that compares a value against patterns and runs the first matching clause."
   ],
   [
    ";;",
    "Terminates a case clause; execution then continues after esac."
   ],
   [
    "Pattern alternatives",
    "Several patterns in one clause separated by |, such as start|up)."
   ],
   [
    "*) default clause",
    "A final clause matching anything not matched earlier, typically for usage errors."
   ],
   [
    "bash -n",
    "Checks a script's syntax without running it."
   ]
  ],
  "example": "A task asks for a script that prints 'green' when run with 'go', 'red' with 'stop', and 'Usage: script go|stop' otherwise with exit code 2. You write a case on \"$1\" with go), stop) and *) clauses, then test all three plus no argument, checking $? each time.",
  "tip": "case uses shell glob patterns, not regex, stops at the first match, and needs ;; after each clause and esac at the end. Put the catch-all *) last.",
  "check": [
   [
    "What keyword ends a case statement?",
    "esac."
   ],
   [
    "How do you make one clause match both 'start' and 'up'?",
    "Use start|up) as the pattern."
   ],
   [
    "What happens if two patterns could match the same value?",
    "Only the first matching clause in order runs."
   ]
  ]
 },
 {
  "t": "Booting, rebooting and shutting down normally (systemctl reboot, poweroff)",
  "body": [
   "On a RHEL system, systemd is the first process the kernel starts (process ID 1). It brings up services in the right order during boot and stops them cleanly at shutdown. Shutting down or rebooting through systemd, rather than pulling the power, gives services time to save data, unmount file systems and flush disk caches. On the exam you will reboot often, because every configuration must survive a reboot, so you should do it cleanly and know what happens.",
   "The main commands are `systemctl reboot` to restart the machine, `systemctl poweroff` to shut down and switch off the power, and `systemctl halt` to stop the system without powering it off. The traditional commands `reboot`, `poweroff` and `halt` still exist and call systemd for you. `shutdown` adds scheduling: `shutdown -r now` reboots immediately, `shutdown -h +10` powers off in ten minutes and warns logged-in users, and `shutdown -c` cancels a scheduled shutdown.",
   "```bash\nsystemctl reboot\nsystemctl poweroff\nshutdown -r +5 \"Rebooting for kernel update\"\nshutdown -c\nsystemctl get-default        # target used at boot\nsystemctl set-default multi-user.target\n```",
   "Behind these commands are systemd targets, groups of units that describe a system state. `poweroff.target` and `reboot.target` are what the commands activate. At boot, systemd starts the default target, normally `multi-user.target` for servers (text mode with networking and services) or `graphical.target` for systems with a desktop. `systemctl get-default` shows it and `systemctl set-default` changes it persistently; `systemctl isolate multi-user.target` switches the running system to another target immediately without rebooting.",
   "The boot sequence is worth knowing in outline because later topics build on it. Firmware (BIOS or UEFI) runs first and starts the boot loader, GRUB 2. GRUB loads the kernel and the initramfs, a small initial file system containing the drivers needed to find the real root file system. Code in the initramfs mounts the root file system and hands control to systemd, which starts the default target.",
   "After a reboot, confirm the system came up as expected: log in, check `systemctl --failed` for units that did not start, and use `journalctl -b` to see messages from the current boot or `journalctl -b -1` for the previous boot, if the journal is persistent. On the exam, do a final reboot before you finish and check that your mounts, services and settings are all still in place, because that is how the grader will see the machine.",
   "Avoid forcing a reset unless the system is truly hung. An unclean shutdown can leave file systems needing repair and loses anything that was not yet written to disk."
  ],
  "terms": [
   [
    "systemd",
    "The init system and service manager, process 1 on RHEL, which starts and stops everything else."
   ],
   [
    "systemctl reboot / poweroff",
    "Cleanly restart the system or shut it down and power it off."
   ],
   [
    "Target",
    "A systemd unit that groups other units to describe a system state, e.g. multi-user.target."
   ],
   [
    "Default target",
    "The target systemd starts at boot; shown by systemctl get-default and changed by set-default."
   ],
   [
    "initramfs",
    "Initial RAM file system loaded with the kernel, containing what is needed to mount the real root file system."
   ]
  ],
  "example": "After finishing all tasks you run `systemctl reboot`, log back in, and check `findmnt /data`, `systemctl is-active httpd` and `systemctl --failed`. You discover a typo in /etc/fstab left a mount missing, fix it, and reboot again before time runs out.",
  "tip": "systemctl set-default changes what happens at the NEXT boot; systemctl isolate changes the target NOW. The exam grades the system after a reboot, so test by rebooting.",
  "check": [
   [
    "Which command shows the target the system boots into by default?",
    "systemctl get-default."
   ],
   [
    "How do you schedule a reboot in 10 minutes and then cancel it?",
    "shutdown -r +10, then shutdown -c."
   ],
   [
    "What is the role of the initramfs in booting?",
    "It provides the drivers and tools needed to find and mount the real root file system before handing over to systemd."
   ]
  ]
 },
 {
  "t": "Booting into different targets manually from the GRUB menu (systemd.unit=rescue.target, emergency.target)",
  "body": [
   "Sometimes a system will not boot normally: a bad `/etc/fstab` entry, a broken service or a forgotten password. Rather than reinstalling, you can tell systemd to start a smaller, more basic target for one boot only, by editing the kernel command line in the GRUB 2 boot loader menu. This is a key troubleshooting skill and a likely exam task.",
   "To do it, reboot and interrupt the GRUB menu by pressing an arrow key before the countdown ends. Highlight the kernel entry you want (normally the first) and press `e` to edit it. Find the line that starts with `linux` (it loads the kernel and lists its parameters), move to the end of that line and add your parameter. Press `Ctrl+X` to boot with the change. The edit applies to this boot only; nothing is written to disk.",
   "`systemd.unit=rescue.target` boots into rescue mode, the modern equivalent of single-user mode. systemd mounts all local file systems from `/etc/fstab`, starts a few basic services, and gives you a root shell after asking for the root password. Networking and most services are not started. Rescue mode is the right choice when file systems are fine but something in the normal startup, such as a misbehaving service, is the problem.",
   "`systemd.unit=emergency.target` is even more minimal. It mounts only the root file system, and read-only, and gives a root shell (again after the root password). It is used when rescue mode itself cannot start, typically because an `/etc/fstab` entry refers to a disk or file system that is missing or broken. In emergency mode you remount root read-write, fix the problem, and continue.",
   "```bash\n# in emergency mode, after entering the root password\nmount -o remount,rw /\nvim /etc/fstab        # fix or comment out the bad line\nsystemctl daemon-reload\nmount -a              # test all fstab entries\nsystemctl default     # continue to the default target (or reboot)\n```",
   "In fact, if an `/etc/fstab` entry cannot be mounted during normal boot, systemd usually drops you into emergency mode automatically with a message to that effect, so recognising this shell and knowing the recovery steps is essential. The same targets can be reached on a running system with `systemctl isolate rescue.target`, and `systemctl rescue` or `systemctl emergency` do so directly.",
   "Both targets require the root password. If the root account is locked or the password is unknown, you need the initramfs break technique instead, which is covered separately. The names `rescue.target` and `emergency.target` must be spelled exactly; with a typo you do not get the target you asked for."
  ],
  "terms": [
   [
    "GRUB 2",
    "The boot loader on RHEL; its menu lets you choose and temporarily edit kernel entries."
   ],
   [
    "Kernel command line",
    "Parameters on the linux line in GRUB, passed to the kernel and systemd at boot."
   ],
   [
    "rescue.target",
    "Minimal target that mounts all local file systems and provides a root shell, without networking."
   ],
   [
    "emergency.target",
    "Most minimal target: only root mounted read-only and a root shell."
   ],
   [
    "systemd.unit=",
    "Kernel parameter telling systemd which target to start instead of the default."
   ]
  ],
  "example": "After someone adds a mistyped UUID to /etc/fstab, the server stops at an emergency shell on boot. You enter the root password, run `mount -o remount,rw /`, correct the line using `blkid` to get the real UUID, run `mount -a` successfully and reboot to a normal login.",
  "tip": "Rescue mounts all file systems; emergency mounts only root, read-only. If fstab is broken, rescue fails, so use emergency and remember to remount / read-write before editing.",
  "check": [
   [
    "Which key edits a GRUB menu entry and which boots the edited entry?",
    "e edits the entry; Ctrl+X boots it."
   ],
   [
    "Why would you choose emergency.target over rescue.target?",
    "When file systems in /etc/fstab cannot be mounted, since emergency only mounts root (read-only)."
   ],
   [
    "Is a parameter added in the GRUB editor permanent?",
    "No, it applies only to that boot."
   ]
  ]
 },
 {
  "t": "Interrupting the boot process to gain access (rd.break, chroot /sysroot, passwd, touch /.autorelabel)",
  "body": [
   "If the root password is lost, rescue and emergency modes do not help because both ask for it. RHEL documents a recovery procedure that stops the boot inside the initramfs, before systemd on the real system takes over and before any password is requested. It is a legitimate administrator technique and a classic RHCSA task. It also shows why physical or console access to a server must be protected: anyone with console access can do the same, which is why data centres restrict console access and why a GRUB password or disk encryption can be used to block it.",
   "The key parameter is `rd.break`, understood by dracut, the tool that builds the initramfs. It tells the initramfs to stop and give you a shell just before switching to the real root file system. At that point the real root is mounted read-only at `/sysroot`, and you are working in the tiny initramfs environment.",
   "```bash\n# GRUB: press e, add rd.break to the end of the linux line, Ctrl+X\nmount -o remount,rw /sysroot\nchroot /sysroot\npasswd root                # set the new password\ntouch /.autorelabel\nexit                       # leave the chroot\nexit                       # continue booting (or reboot)\n```",
   "Step by step: remount `/sysroot` read-write so you can change files. `chroot /sysroot` makes `/sysroot` appear as `/` for your shell, so commands such as `passwd` operate on the real system's `/etc/shadow` instead of the initramfs. Change the password with `passwd` (or `passwd root`). Then create the empty file `/.autorelabel`.",
   "That last step is the one people forget, and it matters because of SELinux (Security-Enhanced Linux). During this procedure SELinux policy is not loaded, so when `passwd` replaces `/etc/shadow` the new file gets no correct SELinux label. With SELinux enforcing, the system would then deny access to the file and nobody could log in. `/.autorelabel` tells the system to relabel every file with its correct context on the next boot, which takes a few minutes and triggers an extra automatic reboot. Do not interrupt it.",
   "Typing `exit` twice leaves the chroot and then the initramfs shell, and the boot continues. Some systems need a GRUB edit to remove `rhgb quiet` to see messages, and on some virtual machines the console is on a serial line, but the procedure is the same. An alternative sometimes used is booting with `init=/bin/bash`; in all cases the idea is to get a root shell before authentication and then restore SELinux labels.",
   "Afterwards, verify by logging in as root with the new password. If login fails with the correct password, the relabel step was probably skipped; you can fix it by repeating the procedure, or, from a working root shell, with `restorecon -v /etc/shadow`."
  ],
  "terms": [
   [
    "rd.break",
    "Kernel parameter that makes the initramfs stop and open a shell before switching to the real root."
   ],
   [
    "/sysroot",
    "Where the real root file system is mounted inside the initramfs, read-only by default."
   ],
   [
    "chroot",
    "Runs a shell with a given directory treated as the root /, here /sysroot."
   ],
   [
    "/.autorelabel",
    "Empty file that triggers a full SELinux relabel of the file system at the next boot."
   ],
   [
    "dracut",
    "The tool that builds the initramfs and understands rd.* kernel parameters."
   ]
  ],
  "example": "On an exam system the root password is unknown. You add rd.break in GRUB, remount /sysroot read-write, chroot, run `passwd` and `touch /.autorelabel`, then exit twice. The system relabels, reboots on its own and you log in as root with the new password.",
  "tip": "Remember the order: remount,rw /sysroot, chroot /sysroot, passwd, touch /.autorelabel, exit, exit. Skipping the autorelabel leaves /etc/shadow mislabeled and logins fail under SELinux.",
  "check": [
   [
    "Why must you remount /sysroot before changing the password?",
    "It is mounted read-only at the rd.break point, so the password change could not be written."
   ],
   [
    "What problem does touch /.autorelabel prevent?",
    "The new /etc/shadow lacking a correct SELinux context, which would block logins when SELinux is enforcing."
   ],
   [
    "Why do you chroot into /sysroot?",
    "So passwd modifies the real system's files rather than the initramfs environment."
   ]
  ]
 },
 {
  "t": "Identifying CPU- and memory-intensive processes with top, ps aux --sort and killing them (kill, pkill, signals 15 and 9)",
  "body": [
   "A process is a running instance of a program, identified by a process ID (PID). When a system is slow, your job is to find which processes are using the CPU or memory and decide whether to stop them. The RHCSA expects you to identify such processes and terminate them correctly.",
   "`top` gives a live, refreshing view. The header shows uptime, load average (average number of processes waiting to run over 1, 5 and 15 minutes), task counts, CPU usage and memory. Below, processes are listed with PID, USER, priority (PR), nice value (NI), memory columns (VIRT, RES for resident memory in RAM), state (S), %CPU, %MEM and COMMAND. By default top sorts by CPU; press `M` to sort by memory, `P` to return to CPU, `k` to kill a process by PID, `r` to renice one and `q` to quit.",
   "`ps` takes a snapshot. `ps aux` lists every process with user, PID, %CPU, %MEM, VSZ, RSS, state, start time and full command. Add `--sort` to order it: `ps aux --sort=-%cpu | head` shows the heaviest CPU users first (the minus means descending), and `--sort=-%mem` does the same for memory. `ps -ef` is another common style, and `ps -o pid,ni,%cpu,cmd -p PID` shows chosen columns. `pgrep name` prints PIDs whose name matches.",
   "```bash\nps aux --sort=-%cpu | head -5\nps aux --sort=-%mem | head -5\npgrep -l dd\nkill 4312          # SIGTERM (15), polite request\nkill -9 4312       # SIGKILL, cannot be ignored\npkill -u harry     # signal all of harry's processes\nkillall stress-ng\n```",
   "Processes are stopped by sending signals. `kill PID` sends SIGTERM, signal 15, by default. SIGTERM asks the process to terminate; a well-written program catches it, saves its work, closes files and exits cleanly. SIGKILL, signal 9 (`kill -9 PID` or `kill -KILL PID`), is handled by the kernel: the process is removed immediately and cannot catch, delay or ignore it, so it gets no chance to clean up. The right approach is SIGTERM first and SIGKILL only if the process does not exit. Other signals include SIGHUP (1), which many daemons treat as 'reload configuration', and SIGINT (2), what Ctrl+C sends. `kill -l` lists them all.",
   "`pkill` and `killall` signal processes by name or other attributes rather than PID. `pkill -u harry` targets a user's processes, `pkill -t pts/1` those on a terminal, and `killall name` matches exact command names. Because they can match more than you intend, preview with `pgrep -l` first.",
   "Normal users can signal only their own processes; root can signal any. Killing a process that belongs to a systemd service may simply cause systemd to restart it, so for services use `systemctl stop` instead."
  ],
  "terms": [
   [
    "PID",
    "Process ID: the unique number identifying a running process."
   ],
   [
    "top",
    "Interactive, live view of processes sorted by resource use; M sorts by memory, P by CPU, k kills."
   ],
   [
    "ps aux --sort=-%cpu",
    "Snapshot of all processes sorted by descending CPU usage."
   ],
   [
    "SIGTERM (15)",
    "Default kill signal requesting a clean shutdown; the process may catch it."
   ],
   [
    "SIGKILL (9)",
    "Signal that terminates a process immediately; it cannot be caught or ignored."
   ]
  ],
  "example": "The load average is climbing. `ps aux --sort=-%cpu | head -3` shows a runaway `dd` owned by harry at 99% CPU. `kill 5821` has no effect after a few seconds, so you use `kill -9 5821`, and top shows the CPU returning to idle.",
  "tip": "Try SIGTERM (15, the default) before SIGKILL (9). SIGKILL cannot be caught, so the process gets no chance to clean up. Use a minus in --sort=-%cpu for highest first.",
  "check": [
   [
    "Which signal does `kill PID` send by default?",
    "SIGTERM, signal 15."
   ],
   [
    "How do you list the five most memory-hungry processes?",
    "ps aux --sort=-%mem | head -6 (header plus five), or press M in top."
   ],
   [
    "Why can a process not ignore SIGKILL?",
    "SIGKILL is acted on by the kernel directly and cannot be caught or blocked by the process."
   ]
  ]
 },
 {
  "t": "Adjusting process scheduling with nice and renice (range -20 to 19)",
  "body": [
   "The Linux scheduler decides which process runs on a CPU at any moment. When there is more work than CPU time, processes compete, and the nice value is how you tell the scheduler which ones matter more. It does not make a process faster in absolute terms; it changes how CPU time is shared when the CPU is busy. On an idle system, a low-priority process still gets all the CPU it wants.",
   "Nice values range from -20 to 19. The default is 0. A higher number means the process is 'nicer' to others and gets a smaller share of CPU; a lower (negative) number means a larger share and higher priority. So -20 is the highest priority and 19 the lowest. A good way to remember: a nice process lets others go first.",
   "Permissions are asymmetric. Any user can make their own processes nicer (raise the value toward 19). Only root can lower a nice value, whether to a negative number or back down after raising it. This prevents ordinary users from grabbing CPU at the expense of everyone else.",
   "`nice` starts a new command with a chosen value: `nice -n 10 tar -czf /backup/home.tar.gz /home` runs the backup at nice 10. Without `-n`, nice uses 10. `renice` changes a running process: `renice -n 5 -p 2345` sets PID 2345 to 5, and `renice -n 15 -u harry` changes all of harry's processes. Within `top`, press `r`, enter the PID and the new value.",
   "```bash\nnice -n 19 ./cpu-hog.sh &       # start at lowest priority\nps -o pid,ni,%cpu,comm -p $!    # $! is the PID of the last background job\nrenice -n -5 -p 2345            # root only: raise priority\nps axo pid,ni,comm --sort=-ni | head\n```",
   "To see nice values, look at the NI column in `top` or add `ni` to `ps` output with `-o` or `axo`. `top` also shows PR, the kernel's priority; for normal processes it equals 20 plus the nice value, so nice 0 shows as PR 20 and nice 19 as PR 39. Real-time processes show `rt` there and use a separate scheduling scheme you do not need to manage for the RHCSA.",
   "Typical uses are running backups, compressions or batch jobs at a high nice value so interactive users and services stay responsive, and occasionally giving an important process a negative value. An exam task might ask you to start a command with a specific nice value or change one; verify the result with `ps -o ni`."
  ],
  "terms": [
   [
    "Nice value",
    "A number from -20 (highest priority) to 19 (lowest) that influences a process's CPU share; default 0."
   ],
   [
    "nice",
    "Starts a command with a specified nice value; default adjustment is 10."
   ],
   [
    "renice",
    "Changes the nice value of running processes by PID, user or group."
   ],
   [
    "PR",
    "The priority column in top; for normal processes it is 20 plus the nice value."
   ],
   [
    "Scheduler",
    "The kernel component that decides which runnable process uses a CPU next."
   ]
  ],
  "example": "A nightly report job slows down the web application. You find its PID with `pgrep -f report` and run `renice -n 15 -p 7710`. The job still finishes, but the web server's requests are now scheduled ahead of it and response times recover.",
  "tip": "Higher nice number = lower priority. Anyone can raise a value (be nicer); only root can lower it or set a negative value.",
  "check": [
   [
    "What is the lowest-priority nice value?",
    "19; -20 is the highest priority."
   ],
   [
    "Can a regular user renice their process from 10 back to 0?",
    "No, lowering a nice value requires root."
   ],
   [
    "How do you start `updatedb` at nice value 15?",
    "nice -n 15 updatedb."
   ]
  ]
 },
 {
  "t": "Managing tuning profiles with tuned-adm (active, recommend, profile)",
  "body": [
   "Different workloads want different kernel and hardware settings. A database server benefits from settings favouring throughput, a laptop from power saving, and a virtual machine guest from settings suited to virtualised disks and CPUs. RHEL's tuned service applies sets of such settings, called profiles, so you do not have to adjust dozens of parameters by hand. Selecting a profile is an RHCSA objective.",
   "tuned runs as the `tuned` service. A profile can change things such as CPU frequency governors, disk I/O schedulers, kernel sysctl parameters and power-management behaviour. Some tuned profiles also monitor the system and adjust dynamically. Profiles shipped with the package live in `/usr/lib/tuned/`, and administrators can create custom ones under `/etc/tuned/`.",
   "Commonly seen profiles include `balanced` (a compromise between performance and power), `powersave`, `throughput-performance` (tuned for high throughput), `latency-performance`, `network-latency`, `network-throughput`, `virtual-guest` (for systems running as virtual machines) and `virtual-host` (for hypervisors). The exact list depends on the installed version, so check it rather than memorising it.",
   "```bash\ndnf install -y tuned\nsystemctl enable --now tuned\ntuned-adm list          # available profiles and the current one\ntuned-adm active        # currently active profile\ntuned-adm recommend     # profile suggested for this system\ntuned-adm profile virtual-guest\ntuned-adm verify        # check the settings are applied\ntuned-adm off           # disable tuning\n```",
   "The workflow is simple. Make sure tuned is installed and the service is enabled and running, because the profile is applied by the service. `tuned-adm active` shows the current profile. `tuned-adm recommend` prints the profile tuned considers best for this machine, based on detection of things like whether it is a virtual machine. `tuned-adm profile NAME` switches to a profile immediately, and the choice is saved, so it persists across reboots as long as the service is enabled.",
   "An exam task usually reads 'set the recommended tuning profile' or 'set the tuning profile to X'. For the first, run `tuned-adm recommend`, then pass its output to `tuned-adm profile`, and confirm with `tuned-adm active`. You can combine profiles by listing several names, with later ones overriding earlier ones where they conflict, but single profiles are normal.",
   "If `tuned-adm` reports that it cannot talk to the daemon, the service is not running; start and enable it and try again. Because the service applies the profile at boot, a disabled tuned service is the usual reason a profile seems to be lost after a reboot."
  ],
  "terms": [
   [
    "tuned",
    "The RHEL service that applies tuning profiles adjusting kernel and hardware settings for a workload."
   ],
   [
    "Tuning profile",
    "A named set of performance and power settings, such as balanced or virtual-guest."
   ],
   [
    "tuned-adm active",
    "Shows the currently active tuning profile."
   ],
   [
    "tuned-adm recommend",
    "Shows the profile tuned recommends for the detected system."
   ],
   [
    "tuned-adm profile",
    "Switches to and persistently saves the given profile."
   ]
  ],
  "example": "A task says to apply the recommended tuning profile on serverb. `tuned-adm recommend` prints virtual-guest, so you run `systemctl enable --now tuned` and `tuned-adm profile virtual-guest`, then `tuned-adm active` confirms it. After a reboot it still shows virtual-guest.",
  "tip": "The profile is applied by the tuned service, so make sure it is enabled and running (systemctl enable --now tuned). Don't guess the recommended profile: ask tuned-adm recommend.",
  "check": [
   [
    "How do you find which profile tuned suggests for a machine?",
    "tuned-adm recommend."
   ],
   [
    "Which command shows the profile currently in use?",
    "tuned-adm active."
   ],
   [
    "Why might a chosen profile not be active after a reboot?",
    "The tuned service is not enabled, so nothing applies the profile at boot."
   ]
  ]
 },
 {
  "t": "Locating and reading system logs: /var/log/messages, /var/log/secure, journalctl -u, -p, -b, --since",
  "body": [
   "Logs are the first place to look when something fails: a service that will not start, a login that is refused, a disk that will not mount. RHEL has two cooperating logging systems. systemd-journald collects messages from the kernel, the boot process, services and programs into a structured binary journal. rsyslog, a traditional syslog daemon, receives messages from the journal and writes them to plain text files in `/var/log/`, sorted by type.",
   "The text files are easy to search with `less`, `tail` and `grep`. `/var/log/messages` holds most general system messages. `/var/log/secure` holds security and authentication events: logins, sudo use, SSH connections and failed passwords. `/var/log/cron` records scheduled jobs, `/var/log/maillog` mail activity and `/var/log/boot.log` boot messages. `tail -f /var/log/secure` follows a file live, which is useful while you reproduce a problem in another terminal. Which messages go to which file is decided by rules in `/etc/rsyslog.conf`. Many services also keep their own logs, for example the web server under `/var/log/httpd/`.",
   "`journalctl` reads the journal and can filter it far more precisely. On its own it shows everything, oldest first, in a pager. `-e` jumps to the end and `-f` follows new entries. `-n 20` shows the last 20 entries. The most useful filters are these.",
   "```bash\njournalctl -u sshd               # one unit (service)\njournalctl -p err                # priority err and more severe\njournalctl -b                    # current boot only\njournalctl -b -1                 # previous boot (needs persistence)\njournalctl --since '1 hour ago'\njournalctl --since '2026-09-25 08:00' --until '2026-09-25 09:00'\njournalctl -u httpd -p warning --since today\n```",
   "`-u UNIT` shows messages from one systemd unit, which is the fastest way to see why a service failed; `systemctl status UNIT` also shows its last few journal lines. `-p` filters by priority, and includes everything at that level and above. The syslog priorities from most to least severe are emerg (0), alert (1), crit (2), err (3), warning (4), notice (5), info (6) and debug (7). `-b` limits output to a boot; `-b -1` is the previous one and `--list-boots` shows those available. `--since` and `--until` accept dates like `'2026-09-25 14:00'` and words such as `today`, `yesterday` or `'10 min ago'`.",
   "Other handy options are `-o verbose` to show all stored fields of each entry, `_PID=1234` or `_COMM=sshd` to filter by fields, and `-k` for kernel messages only. You need to be root or a member of a group allowed to read the system journal, such as `systemd-journal`, to see all entries; other normal users see only their own.",
   "Remember that by default on RHEL the journal may be kept only in memory under `/run/log/journal`, so journal entries from previous boots can be missing. The text files in `/var/log` survive reboots regardless, because rsyslog writes them to disk."
  ],
  "terms": [
   [
    "systemd-journald",
    "Service that collects log messages into the structured systemd journal."
   ],
   [
    "rsyslog",
    "Syslog daemon that writes messages to text files under /var/log according to /etc/rsyslog.conf."
   ],
   [
    "/var/log/secure",
    "Text log for authentication and security events such as logins and sudo."
   ],
   [
    "journalctl -u",
    "Shows journal entries for a specific systemd unit."
   ],
   [
    "Syslog priority",
    "Severity level from emerg (0) to debug (7); journalctl -p shows that level and more severe ones."
   ]
  ],
  "example": "Users say SSH logins to serverb fail. You run `tail -n 30 /var/log/secure` and see repeated 'Failed password' lines for one account, then `journalctl -u sshd --since '30 min ago'` shows sshd restarted with a configuration warning, pointing you to the bad setting.",
  "tip": "journalctl -p err shows err AND everything more severe (crit, alert, emerg). Authentication problems go to /var/log/secure, not /var/log/messages.",
  "check": [
   [
    "Which file records failed SSH logins and sudo usage?",
    "/var/log/secure."
   ],
   [
    "How do you show only this boot's messages from the chronyd service?",
    "journalctl -b -u chronyd."
   ],
   [
    "What does journalctl -p warning include?",
    "Messages with priority warning and all more severe priorities (err, crit, alert, emerg)."
   ]
  ]
 },
 {
  "t": "Preserving the systemd journal across reboots (Storage=persistent, /var/log/journal)",
  "body": [
   "By default the systemd journal on RHEL may live only in memory. In that case journald writes to `/run/log/journal/`, a directory on a temporary file system that is emptied at every boot, so `journalctl -b -1` (the previous boot) returns nothing. That makes it hard to investigate a crash or a failed boot after the fact. Making the journal persistent means storing it on disk in `/var/log/journal/`, and it is a standard RHCSA task.",
   "The behaviour is controlled by the `Storage=` setting in the `[Journal]` section of `/etc/systemd/journald.conf`, or in a drop-in file under `/etc/systemd/journald.conf.d/`. Its values are: `persistent`, which stores on disk in `/var/log/journal` and creates that directory if needed; `volatile`, which keeps logs only in memory under `/run/log/journal`; `auto`, which stores on disk only if `/var/log/journal` already exists and otherwise in memory; and `none`, which discards journal data (messages can still be forwarded to rsyslog). The file ships with the settings commented out, showing the compiled-in defaults, so you uncomment and change the line.",
   "```ini\n# /etc/systemd/journald.conf\n[Journal]\nStorage=persistent\n```",
   "```bash\nvim /etc/systemd/journald.conf        # set Storage=persistent\nsystemctl restart systemd-journald\nls /var/log/journal/                  # a directory named by machine ID appears\njournalctl --list-boots               # after the next reboot, several boots\njournalctl --disk-usage\n```",
   "After editing, restart the service with `systemctl restart systemd-journald` so it picks up the setting and begins writing to disk. You will see a subdirectory named after the machine ID inside `/var/log/journal`. An alternative that works when the setting is left at `auto` is simply to create the directory: `mkdir -p /var/log/journal` followed by `systemd-tmpfiles --create --prefix /var/log/journal` to set its ownership and permissions, then restart journald. Setting `Storage=persistent` explicitly is clearer and is what exam tasks usually ask for.",
   "A persistent journal does not grow forever. journald limits it to a share of the file system by default, and you can set limits such as `SystemMaxUse=` in the same file, or trim it manually with `journalctl --vacuum-size=` or `--vacuum-time=`. Note that journal files are also rotated, so very old entries eventually disappear.",
   "To confirm the change, reboot and run `journalctl --list-boots`. If it lists more than one boot, and `journalctl -b -1` shows the previous boot's messages, the journal is persistent. That verification step is worth the minute it takes, because a typo in the setting (for example a lowercase key name or a line left commented out) silently keeps the old behaviour."
  ],
  "terms": [
   [
    "Storage=",
    "journald.conf option choosing where the journal is kept: persistent, volatile, auto or none."
   ],
   [
    "/var/log/journal",
    "On-disk location of a persistent journal."
   ],
   [
    "/run/log/journal",
    "In-memory (tmpfs) location of a volatile journal, lost at reboot."
   ],
   [
    "systemd-journald",
    "The journal service; restart it after changing journald.conf."
   ],
   [
    "journalctl --list-boots",
    "Lists the boots recorded in the journal; more than one indicates persistence."
   ]
  ],
  "example": "A server rebooted unexpectedly overnight but `journalctl -b -1` shows no data. You set Storage=persistent in /etc/systemd/journald.conf and restart systemd-journald. After the next incident, `journalctl -b -1 -p err` shows the errors leading up to the reboot.",
  "tip": "Storage=auto only persists if /var/log/journal exists; Storage=persistent creates it. Either way, restart systemd-journald and confirm with journalctl --list-boots after a reboot.",
  "check": [
   [
    "Where is the journal stored when it is not persistent?",
    "In /run/log/journal, which is cleared at every boot."
   ],
   [
    "After setting Storage=persistent, what must you do for it to take effect?",
    "Restart systemd-journald (systemctl restart systemd-journald)."
   ],
   [
    "How can you prove the journal now survives reboots?",
    "Reboot, then journalctl --list-boots lists multiple boots and journalctl -b -1 shows the previous one."
   ]
  ]
 },
 {
  "t": "Starting, stopping and checking network services (systemctl status, ss -tlnp)",
  "body": [
   "A network service is a daemon, a background program, that listens on a network port for clients: sshd on port 22, a web server on 80 and 443, chronyd for time. On RHEL, systemd manages daemons as service units, such as `sshd.service` or `httpd.service`, and `systemctl` is how you control them. A service task is only finished when the service is running now, will start at boot, and is actually listening where clients expect.",
   "Two separate ideas are easy to mix up. Starting or stopping changes the current state: `systemctl start httpd`, `systemctl stop httpd`, `systemctl restart httpd` (stop then start) and `systemctl reload httpd` (re-read configuration without dropping connections, if the service supports it). Enabling or disabling changes what happens at boot: `systemctl enable httpd` makes it start automatically, `disable` stops that. `systemctl enable --now httpd` does both at once, and is the usual command on the exam.",
   "```bash\nsystemctl enable --now httpd\nsystemctl status httpd          # state, PID, recent log lines\nsystemctl is-active httpd       # active / inactive / failed\nsystemctl is-enabled httpd      # enabled / disabled / masked\nsystemctl list-units --type=service --state=running\nsystemctl mask telnet.socket    # prevent any start\n```",
   "`systemctl status UNIT` is the main diagnostic. It shows whether the unit is loaded and enabled, its active state (active (running), inactive (dead) or failed), the main PID, memory and CPU use, and the most recent journal lines, which usually explain a failure. `is-active` and `is-enabled` return just the state and a matching exit status, which is handy in scripts. `systemctl --failed` lists units that failed. Masking a unit with `systemctl mask` links it to nothing so it cannot be started at all, even as a dependency, until you `unmask` it.",
   "`ss` (socket statistics) shows what the system is actually listening on, which proves the service is reachable at the network level. `ss -tlnp` means TCP (`-t`), listening sockets only (`-l`), numeric addresses and ports instead of names (`-n`), and the process owning each socket (`-p`, which needs root to show other users' processes). Add `-u` for UDP. The Local Address column tells you where it listens: `0.0.0.0:22` or `[::]:22` means all IPv4 or IPv6 addresses, while `127.0.0.1:631` means localhost only, reachable from nowhere else.",
   "If a service is running but clients still cannot connect, check the next layers. The firewall must allow the port (`firewall-cmd --list-all`), and SELinux must allow the service to use a non-standard port. If a service will not start at all, read `systemctl status` and `journalctl -u UNIT`, fix the configuration, and use the service's own syntax check if it has one, such as `sshd -t` or `apachectl configtest`.",
   "After changing a unit file itself, run `systemctl daemon-reload` so systemd rereads its definitions before you restart the service."
  ],
  "terms": [
   [
    "Service unit",
    "A systemd unit (name.service) that describes how to run and manage a daemon."
   ],
   [
    "start vs enable",
    "start runs the service now; enable makes it start at boot. enable --now does both."
   ],
   [
    "systemctl status",
    "Shows a unit's load, enable and active state, main PID and recent log lines."
   ],
   [
    "ss -tlnp",
    "Lists listening TCP sockets numerically with the owning process."
   ],
   [
    "mask",
    "Links a unit to /dev/null so it cannot be started until unmasked."
   ]
  ],
  "example": "You install httpd and run `systemctl enable --now httpd`. `systemctl status httpd` shows active (running), and `ss -tlnp | grep ':80'` shows httpd listening on *:80. A test from another host fails, so you add the http service in firewalld and the page loads.",
  "tip": "A task that says the service must be running and persistent needs both start and enable: systemctl enable --now. Then prove it with systemctl is-enabled, is-active and ss -tlnp.",
  "check": [
   [
    "What is the difference between `systemctl start` and `systemctl enable`?",
    "start runs the service now; enable configures it to start automatically at boot."
   ],
   [
    "What do the letters in ss -tlnp mean?",
    "TCP, listening sockets, numeric output, and show the owning process."
   ],
   [
    "What does 127.0.0.1:25 in ss output tell you?",
    "The service listens only on the loopback interface, so remote hosts cannot connect."
   ]
  ]
 },
 {
  "t": "Securely transferring files between systems with scp, sftp and rsync over ssh",
  "body": [
   "Administrators constantly move files between systems: configuration files, backups, logs for analysis. Doing it over SSH means the transfer is encrypted and authenticated with the same accounts and keys you already use to log in, so no separate file-transfer service is needed. RHEL provides three tools that do this: scp, sftp and rsync.",
   "`scp` (secure copy) works like `cp` with remote locations written as `user@host:path`. `scp file.txt root@serverb:/tmp/` copies a local file to serverb, and `scp root@serverb:/etc/hosts .` copies a remote file to the current directory. `-r` copies directories recursively, `-p` preserves modification times and modes, and `-P` (capital) sets a non-default SSH port. A path after the colon without a leading slash is relative to the remote user's home directory. Note that current OpenSSH versions implement scp using the SFTP protocol underneath, but the command line is unchanged.",
   "`sftp` is interactive, like an FTP client, but runs over SSH. `sftp user@host` opens a session with an `sftp>` prompt where `ls` and `cd` act on the remote side, `lls` and `lcd` on the local side, `get` downloads, `put` uploads, `mkdir` creates a remote directory and `exit` quits. It is handy when you need to browse before deciding what to transfer.",
   "```bash\nscp -p /etc/chrony.conf root@serverb:/etc/\nscp -r root@serverb:/var/log/httpd ./serverb-logs\nsftp student@serverb\n  sftp> cd /tmp\n  sftp> put report.txt\n  sftp> get data.csv\nrsync -av /srv/web/ root@serverb:/srv/web/\nrsync -avn --delete /srv/web/ root@serverb:/srv/web/   # dry run\n```",
   "`rsync` synchronises files efficiently. It compares source and destination and sends only what changed, even only the changed parts of large files, so repeated transfers are fast. Over the network it uses SSH by default. `-a` (archive) recurses and preserves permissions, timestamps, symbolic links, owner and group (owner only when run as root on the receiving side), and `-v` lists what is transferred. Add `-X` for extended attributes such as SELinux contexts and `-A` for access control lists. `--delete` removes files from the destination that no longer exist in the source, so run it first with `-n` (dry run) to see what would happen. rsync must be installed on both machines.",
   "The trailing slash on an rsync source changes the result. `rsync -a /srv/web/ host:/backup/web/` copies the contents of web into the destination, while `rsync -a /srv/web host:/backup/` creates `/backup/web` and copies into that. When results end up one directory too deep, this is usually why.",
   "All three tools authenticate like ssh, so key-based login lets you script transfers without passwords, and a host key warning means the same thing it does for ssh. Choose scp for quick one-off copies, sftp for interactive browsing and rsync for large or repeated transfers and backups."
  ],
  "terms": [
   [
    "scp",
    "Secure copy: copies files to or from remote hosts over SSH using user@host:path syntax."
   ],
   [
    "sftp",
    "Interactive file transfer client over SSH with commands like get, put, ls and lcd."
   ],
   [
    "rsync",
    "Synchronises files, transferring only differences, over SSH by default."
   ],
   [
    "rsync -a",
    "Archive mode: recursive, preserving permissions, times, links, and ownership where possible."
   ],
   [
    "--delete",
    "rsync option removing destination files that are absent from the source; test first with -n."
   ]
  ],
  "example": "You need a nightly copy of /srv/web on serverb. The first `rsync -av /srv/web/ root@serverb:/srv/web/` takes several minutes, but the next run sends only the three files that changed and finishes in seconds. Adding --delete after a -n dry run keeps the copy an exact mirror.",
  "tip": "In rsync, a trailing slash on the source means 'the contents of this directory'; without it the directory itself is copied into the destination. scp uses -P for port, while ssh uses -p.",
  "check": [
   [
    "How do you copy /etc/hosts from serverb into the current local directory?",
    "scp user@serverb:/etc/hosts ."
   ],
   [
    "Why is rsync faster than scp for repeated backups?",
    "It transfers only files and parts of files that changed since the last run."
   ],
   [
    "In sftp, what is the difference between cd and lcd?",
    "cd changes the remote directory; lcd changes the local directory."
   ]
  ]
 },
 {
  "t": "Listing disks and partitions with lsblk, blkid and fdisk -l",
  "body": [
   "Before you partition, format or mount anything, you must know exactly which disks exist, how they are divided and what is already in use. Picking the wrong device is the most destructive mistake possible on the exam, so these read-only listing commands are the first thing to run in any storage task.",
   "Linux names block devices after their driver. SATA, SAS and USB disks appear as `/dev/sda`, `/dev/sdb` and so on; virtual machines often use virtio disks named `/dev/vda`, `/dev/vdb`; NVMe drives appear as `/dev/nvme0n1`. Partitions add a number: `/dev/vdb1`, or `/dev/nvme0n1p1` for NVMe, where a `p` separates the number. LVM logical volumes appear as `/dev/mapper/vg-lv` and `/dev/vg/lv`.",
   "`lsblk` (list block devices) shows every disk, partition and logical volume as a tree, with its size, type (disk, part, lvm, rom) and mount points. The tree shows the relationship directly: a partition appears under its disk, and a logical volume under the partition used as its physical volume. It is the fastest way to find the empty disk a task refers to. `lsblk -f` adds the file system type, label and UUID (universally unique identifier), and `lsblk -p` prints full device paths.",
   "```bash\nlsblk\nlsblk -f\nblkid\nblkid /dev/vdb1\nfdisk -l /dev/vdb\nparted /dev/vdb print\ncat /proc/partitions\n```",
   "`blkid` prints the attributes of devices that contain a recognised signature: the UUID, the file system TYPE (xfs, ext4, swap, LVM2_member), the LABEL if one was set and, for GPT partitions, the PARTUUID. Its main exam use is getting the UUID to put in `/etc/fstab`. A device with no output from blkid has no recognised file system or signature yet. Run it as root for complete results.",
   "`fdisk -l` lists the partition table of every disk, or only the one you name. It shows the disk's size and sector size, the partition table type (`dos` for the older MBR, Master Boot Record, scheme or `gpt` for the GUID Partition Table) and each partition's start and end sector, size and type, such as 'Linux filesystem', 'Linux LVM' or 'Linux swap'. `parted DEVICE print` gives similar information and shows free space clearly.",
   "Together they answer the key questions: which disk is new or has free space (lsblk, fdisk -l), which partition type it has (fdisk -l), what is on it (lsblk -f, blkid) and where it is mounted (lsblk, findmnt). Make a habit of running `lsblk` before and after every change: before to pick the right device, after to confirm the result."
  ],
  "terms": [
   [
    "Block device",
    "A storage device such as a disk or partition accessed in blocks, found under /dev."
   ],
   [
    "lsblk",
    "Lists block devices as a tree with size, type and mount point; -f adds file system details."
   ],
   [
    "blkid",
    "Shows UUID, file system type and label of devices with recognised signatures."
   ],
   [
    "fdisk -l",
    "Lists partition tables, showing table type (dos or gpt) and each partition's size and type."
   ],
   [
    "UUID",
    "Universally unique identifier assigned to a file system or other signature, stable across device renaming."
   ]
  ],
  "example": "A task says to create a swap partition on the second disk. `lsblk` shows /dev/vda with the system partitions and an unused 5G /dev/vdb with no children. `fdisk -l /dev/vdb` confirms a gpt label with no partitions, so you know exactly which device to work on.",
  "tip": "Run lsblk before touching any disk to be sure you have the right device name, and use blkid (or lsblk -f) to get the UUID for /etc/fstab. NVMe partitions include a p: nvme0n1p1.",
  "check": [
   [
    "Which command shows disks, partitions and logical volumes as a tree with mount points?",
    "lsblk."
   ],
   [
    "How do you get the UUID of /dev/vdb1?",
    "blkid /dev/vdb1 (or lsblk -f /dev/vdb1)."
   ],
   [
    "How can you tell whether a disk uses MBR or GPT?",
    "fdisk -l shows Disklabel type dos (MBR) or gpt; parted print shows the Partition Table."
   ]
  ]
 },
 {
  "t": "Creating and deleting GPT partitions with parted, gdisk or fdisk; setting the partition type (lvm, swap)",
  "body": [
   "Partitioning divides a disk into independent sections that can each hold a file system, swap space or an LVM physical volume. RHEL supports two partition table schemes. The older MBR (Master Boot Record, shown as 'dos') allows only four primary partitions and disks up to 2 TiB. GPT (GUID Partition Table) allows many partitions (128 by default) and very large disks, stores a backup copy of the table at the end of the disk, and is the norm on modern and UEFI systems. Exam tasks may ask for GPT specifically.",
   "Three tools can do the job. `fdisk` is interactive and handles both MBR and GPT. `gdisk` is an fdisk-like tool for GPT only. `parted` works interactively or with commands on one line, which suits scripts. Changes in fdisk and gdisk are held in memory until you write them (`w`), while parted applies each command immediately.",
   "```text\nfdisk /dev/vdb\n  g            create a new empty GPT table (only on an empty disk!)\n  n            new partition: accept number and first sector,\n               last sector +1G for a 1 GiB partition\n  t            change type: enter lvm, swap or linux (L lists aliases)\n  p            print the table to check\n  w            write and exit (q quits without saving)\n```",
   "With parted, the same work is: `parted /dev/vdb mklabel gpt` to create the table, `parted /dev/vdb mkpart data xfs 1MiB 1025MiB` to create a partition, where for GPT the first argument is a partition name and the file system type only sets a type hint, and `parted /dev/vdb set 1 lvm on` or `set 2 swap on` to set the type flag. `parted /dev/vdb print` shows the result and `rm 1` deletes partition 1. Starting at 1MiB keeps partitions aligned for performance.",
   "In gdisk, `n` also creates partitions, and the type is given as a four-digit hex code: `8300` Linux filesystem (the default), `8e00` Linux LVM and `8200` Linux swap; `l` lists them and `w` writes. In fdisk on a GPT disk, the `t` command accepts aliases such as `lvm` and `swap`. Setting the right type is required when a task says so, and it documents the partition's purpose for tools and administrators, even though the kernel will let you use a partition of any type.",
   "Deleting is `d` in fdisk or gdisk (then choose the number) and `rm NUMBER` in parted. Deleting a partition destroys access to its data, so first make sure it is unmounted, not used as swap and not a physical volume in a volume group; remove it from `/etc/fstab` too.",
   "After writing, run `lsblk` to confirm the kernel sees the new partitions. If the disk was in use and the kernel could not reread the table, run `partprobe /dev/vdb` or `udevadm settle`. Never create a new partition table (`g`, `o` or `mklabel`) on a disk that already holds data you need; it effectively wipes all existing partitions."
  ],
  "terms": [
   [
    "GPT",
    "GUID Partition Table: modern scheme supporting many partitions and very large disks, with a backup table."
   ],
   [
    "MBR (dos)",
    "Older partition scheme limited to four primary partitions and 2 TiB disks."
   ],
   [
    "Partition type",
    "Identifier describing a partition's purpose, such as Linux LVM (8e00) or Linux swap (8200)."
   ],
   [
    "mklabel",
    "parted command that creates a new, empty partition table (msdos or gpt)."
   ],
   [
    "partprobe",
    "Asks the kernel to reread a disk's partition table after changes."
   ]
  ],
  "example": "You need a 2 GiB LVM partition on the empty disk /dev/vdc. You run `parted /dev/vdc mklabel gpt`, `parted /dev/vdc mkpart lvmpart 1MiB 2049MiB`, `parted /dev/vdc set 1 lvm on`, then `lsblk /dev/vdc` shows vdc1 at 2G and `fdisk -l /dev/vdc` shows its type as Linux LVM.",
  "tip": "fdisk and gdisk change nothing until you press w; parted applies each command immediately. Creating a new label (g, o, mklabel) on a disk with data wipes its partitions.",
  "check": [
   [
    "What is the gdisk type code for a Linux LVM partition?",
    "8e00 (8200 is Linux swap, 8300 Linux filesystem)."
   ],
   [
    "How do you mark partition 1 as LVM with parted?",
    "parted /dev/DISK set 1 lvm on."
   ],
   [
    "Why use +1G at the last-sector prompt in fdisk?",
    "It creates a partition 1 GiB in size starting at the chosen first sector, without calculating sectors by hand."
   ]
  ]
 },
 {
  "t": "Creating and removing physical volumes (pvcreate, pvremove, pvs)",
  "body": [
   "LVM (Logical Volume Manager) adds a flexible layer between disks and file systems. Instead of formatting a partition directly, you pool storage from one or more devices and carve volumes out of the pool, which can later be grown, moved or spread across disks. LVM has three layers: physical volumes (PVs) at the bottom, volume groups (VGs) that pool them, and logical volumes (LVs) that you format and mount. This lesson covers the first layer.",
   "A physical volume is a block device that has been initialised for LVM use. It can be a whole disk (`/dev/vdb`), a partition (`/dev/vdb1`, ideally with its type set to Linux LVM) or other block devices such as a RAID array. Initialising writes a small LVM label and metadata area onto the device, which identifies it as belonging to LVM and later records which volume group it belongs to. Its space is divided into physical extents, the units a volume group hands out; their size is set when the device joins a volume group.",
   "```bash\nlsblk /dev/vdb                  # confirm the right, unused device\npvcreate /dev/vdb1 /dev/vdc1    # initialise two partitions\npvs                             # brief list\npvdisplay /dev/vdb1             # detailed view\npvremove /dev/vdc1              # wipe the LVM label\n```",
   "`pvcreate DEVICE...` initialises one or more devices. If the device already contains a file system or another signature, pvcreate warns and asks before wiping it, which is your last chance to notice you picked the wrong device. The device must not be mounted or otherwise in use.",
   "`pvs` gives a one-line summary per PV: its name, the VG it belongs to (empty if none yet), format (lvm2), attributes, total size (PSize) and free space (PFree). `pvdisplay` shows more detail, including the extent size and the number of total, free and allocated physical extents once the PV belongs to a VG. `lsblk` and `blkid` also recognise PVs, showing them with type LVM2_member.",
   "`pvremove DEVICE` erases the LVM label so the device is no longer a PV and can be reused for something else. It only works if the PV does not belong to a volume group. If it does, you first remove it from the group with `vgreduce VG DEVICE` (after moving any data off it with `pvmove` if it holds allocated extents) or remove the whole volume group. The logical order for dismantling is always top down: unmount and remove LVs, then remove or reduce the VG, then remove the PV, and finally delete the partition if you want the space back.",
   "Initialising a PV is not something you see persisted in `/etc/fstab` or any config file; the label on the device itself is what LVM scans for at boot, so there is nothing else to configure for it to survive a reboot."
  ],
  "terms": [
   [
    "LVM",
    "Logical Volume Manager: pools block devices into volume groups and allocates flexible logical volumes."
   ],
   [
    "Physical volume (PV)",
    "A disk or partition initialised with an LVM label so it can join a volume group."
   ],
   [
    "pvcreate",
    "Initialises devices as physical volumes."
   ],
   [
    "pvs / pvdisplay",
    "Show physical volumes in brief (pvs) or detailed (pvdisplay) form."
   ],
   [
    "pvremove",
    "Removes the LVM label from a device that is not in any volume group."
   ]
  ],
  "example": "To prepare storage for a new volume group, you create /dev/vdb1 with type Linux LVM, then run `pvcreate /dev/vdb1`. `pvs` shows /dev/vdb1 with a size of about 2g, an empty VG column and PFree equal to its size, ready for vgcreate.",
  "tip": "Build LVM bottom up (partition, pvcreate, vgcreate, lvcreate, mkfs, mount) and dismantle it top down. pvremove fails while a PV still belongs to a volume group.",
  "check": [
   [
    "What must happen before you can pvremove a PV that is part of a VG?",
    "It must be removed from the VG with vgreduce (after moving data off with pvmove if needed), or the VG removed."
   ],
   [
    "Which column in pvs shows whether a PV belongs to a volume group?",
    "The VG column; it is empty for an unassigned PV."
   ],
   [
    "Can a whole disk without partitions be a physical volume?",
    "Yes, pvcreate works on whole disks as well as partitions."
   ]
  ]
 },
 {
  "t": "Creating volume groups and assigning physical volumes (vgcreate -s, vgextend, vgs)",
  "body": [
   "A volume group (VG) is the storage pool in LVM. It combines the space of one or more physical volumes into a single pool, from which you allocate logical volumes. Because a logical volume draws from the pool rather than a single disk, it can be larger than any one device, and you can grow the pool later simply by adding another physical volume.",
   "`vgcreate NAME PV...` creates a volume group from one or more physical volumes. If a device you list is not yet a PV, current versions of LVM initialise it automatically, but running `pvcreate` first is clearer. The name you choose becomes part of the device paths for its logical volumes, `/dev/NAME/LVNAME` and `/dev/mapper/NAME-LVNAME`, so exam tasks always specify it and you must use it exactly.",
   "The space in a VG is divided into physical extents (PEs), fixed-size units. Every logical volume is made of a whole number of extents, so the extent size is the granularity of allocation. The default extent size is 4 MiB. `vgcreate -s SIZE` sets a different size at creation, for example `-s 16M` for 16 MiB extents; it is normally a power of two. Exam tasks often specify the extent size and then ask for a logical volume measured in extents, so getting `-s` right matters. It is chosen when the VG is created and is not something you would normally change later.",
   "```bash\nvgcreate -s 16M datavg /dev/vdb1\nvgs                          # summary\nvgdisplay datavg             # PE Size, Total PE, Free PE\npvcreate /dev/vdc1\nvgextend datavg /dev/vdc1    # add space to the pool\nvgs datavg\nvgreduce datavg /dev/vdc1    # remove an unused PV\nvgremove datavg              # delete the VG (after removing its LVs)\n```",
   "`vgs` lists volume groups with the number of PVs and LVs, attributes, total size (VSize) and free space (VFree). `vgdisplay NAME` shows much more, including 'PE Size', 'Total PE', 'Alloc PE / Size' and 'Free PE / Size'. Those lines tell you how many extents are available, which you need when a task asks for a volume of a given number of extents or for all remaining space.",
   "`vgextend VG PV` adds a physical volume to an existing group, increasing its free space immediately without affecting existing logical volumes. This is the standard first step when a logical volume needs to grow but the VG is full. The reverse, `vgreduce VG PV`, removes a PV that holds no allocated extents; `pvmove` can first migrate extents off it to other PVs in the group. `vgremove` deletes a whole group once its logical volumes are gone.",
   "As with PVs, a VG needs no configuration file to persist. Its metadata is stored on its physical volumes and is found automatically at boot."
  ],
  "terms": [
   [
    "Volume group (VG)",
    "An LVM storage pool made from one or more physical volumes."
   ],
   [
    "Physical extent (PE)",
    "The fixed-size allocation unit of a volume group; 4 MiB by default."
   ],
   [
    "vgcreate -s",
    "Creates a volume group with a specified physical extent size."
   ],
   [
    "vgextend",
    "Adds physical volumes to an existing volume group to increase its capacity."
   ],
   [
    "vgdisplay",
    "Shows detailed volume group information including PE size and free extents."
   ]
  ],
  "example": "A task asks for a volume group named research with 8 MiB extents on /dev/vdb2. You run `pvcreate /dev/vdb2` and `vgcreate -s 8M research /dev/vdb2`, and `vgdisplay research | grep 'PE Size'` confirms 8.00 MiB.",
  "tip": "Read the task for an extent size: vgcreate -s must be set at creation. Later, an LV of -l 50 in a VG with 16 MiB extents is 800 MiB, not 200 MiB.",
  "check": [
   [
    "What is the default physical extent size?",
    "4 MiB."
   ],
   [
    "How do you add /dev/vdd1 to the existing VG datavg?",
    "pvcreate /dev/vdd1 (if needed), then vgextend datavg /dev/vdd1."
   ],
   [
    "Where can you see how many free extents a VG has?",
    "vgdisplay (Free PE / Size line), or vgs -o +vg_free_count."
   ]
  ]
 },
 {
  "t": "Creating and deleting logical volumes by size (-L) or extent count (-l) (lvcreate, lvremove, lvs)",
  "body": [
   "Logical volumes (LVs) are the top layer of LVM and the part you actually use: you put a file system or swap on an LV and mount it, just as you would a partition. The difference is flexibility. An LV is allocated from a volume group's pool, can span several disks, and can be extended later without repartitioning.",
   "`lvcreate` makes a logical volume. `-n` gives it a name and the last argument is the volume group. You specify the size in one of two ways, and exam tasks test both. `-L` (capital) takes a size with units: `-L 500M`, `-L 2G`. `-l` (lowercase) takes a number of extents: `-l 50` allocates 50 physical extents, so its real size depends on the VG's extent size. `-l` also accepts percentages, such as `-l 100%FREE` for all remaining space or `-l 50%VG` for half the group.",
   "```bash\nlvcreate -n weblv -L 1G datavg\nlvcreate -n dblv -l 60 datavg        # 60 extents\nlvcreate -n archive -l 100%FREE datavg\nlvs\nlvdisplay /dev/datavg/weblv\nmkfs.xfs /dev/datavg/weblv\nmkdir -p /web && mount /dev/datavg/weblv /web\n```",
   "The extent arithmetic is simple multiplication. In a VG with 16 MiB extents, `-l 60` gives 960 MiB; in the default 4 MiB, the same command gives 240 MiB. With `-L`, if the size is not an exact multiple of the extent size, LVM rounds up to the next whole extent and tells you so. Check `vgdisplay` for the extent size and free extents before calculating. A task that says 'a logical volume of 20 extents' wants `-l 20`, and one that says '800 MiB' wants `-L 800M`; the grader usually accepts a small tolerance for sizes but not a wrong unit.",
   "After creation, the LV appears as `/dev/VG/LV` (a symbolic link) and `/dev/mapper/VG-LV`; both refer to the same device. Create a file system on it with `mkfs.xfs` or `mkfs.ext4`, or make it swap with `mkswap`, then mount it and, for persistence, add it to `/etc/fstab`.",
   "`lvs` lists logical volumes with their VG, attributes and size. `lvdisplay` gives details including the number of current extents (Current LE), the path and the status. `lvs -o +devices` shows which PVs an LV uses.",
   "`lvremove /dev/VG/LV` deletes a logical volume and everything on it. Before running it, unmount the file system (or `swapoff` for swap) and remove its `/etc/fstab` entry; otherwise lvremove refuses because the volume is in use, or the next boot fails trying to mount a device that no longer exists. lvremove asks for confirmation; read the name it shows before answering y."
  ],
  "terms": [
   [
    "Logical volume (LV)",
    "A volume allocated from a volume group that holds a file system or swap, like a flexible partition."
   ],
   [
    "lvcreate -L",
    "Creates an LV with a size given in units such as M or G."
   ],
   [
    "lvcreate -l",
    "Creates an LV with a size given in extents, or percentages such as 100%FREE."
   ],
   [
    "lvs / lvdisplay",
    "List LVs briefly, or show details such as Current LE and path."
   ],
   [
    "lvremove",
    "Deletes a logical volume; unmount it and remove it from fstab first."
   ]
  ],
  "example": "A task asks for an LV named database with exactly 50 extents in VG datavg, whose extent size is 16 MiB. You run `lvcreate -n database -l 50 datavg`, then `lvdisplay /dev/datavg/database` shows Current LE 50 and LV Size 800.00 MiB, format it with mkfs.ext4 and mount it.",
  "tip": "Capital -L is a size with units; lowercase -l is a count of extents (or a percentage). Multiply extents by the VG's PE size to know the real size.",
  "check": [
   [
    "How big is an LV created with -l 25 in a VG with 8 MiB extents?",
    "200 MiB (25 x 8 MiB)."
   ],
   [
    "How do you create an LV using all remaining space in vg01?",
    "lvcreate -n name -l 100%FREE vg01."
   ],
   [
    "What should you do before lvremove on a mounted LV?",
    "Unmount it (or swapoff if swap) and remove its /etc/fstab entry."
   ]
  ]
 },
 {
  "t": "Mounting file systems at boot by UUID or label in /etc/fstab",
  "body": [
   "Mounting attaches a file system to a directory, its mount point, so its contents appear there. A `mount` command lasts only until reboot. For a file system to be mounted automatically every boot, it must have an entry in `/etc/fstab` (file system table). The RHCSA grades your storage work after a reboot, so a correct fstab entry is essential, and a broken one can stop the system at an emergency shell.",
   "Each non-comment line in `/etc/fstab` has six whitespace-separated fields. First, the device, preferably identified by `UUID=...` or `LABEL=...`. Second, the mount point, or `none` for swap. Third, the file system type, such as `xfs`, `ext4`, `vfat` or `swap`. Fourth, mount options, where `defaults` means a standard set (read-write, allow device files and executables, mount automatically and so on); several options are separated by commas with no spaces. Fifth, the dump field, almost always 0. Sixth, the fsck order: 0 means do not check at boot, 1 is for the root file system and 2 for others that should be checked; XFS file systems normally use 0 because XFS does not use boot-time fsck.",
   "```text\nUUID=4f3c1d2e-...-9a7b  /data     xfs   defaults         0 0\nLABEL=backup             /backup   ext4  defaults,noatime 0 2\n/dev/datavg/weblv        /web      xfs   defaults         0 0\nUUID=91b2...             none      swap  defaults         0 0\n```",
   "Why UUID or label instead of `/dev/vdb1`? Device names are assigned in the order the kernel detects disks and can change when disks are added or removed, so a name that was correct today might point to a different disk tomorrow. A UUID is created when the file system is made and stays the same wherever the disk appears. Get it with `blkid /dev/vdb1` or `lsblk -f`. A label is a name you assign, for example `xfs_admin -L backup /dev/vdb1` for XFS or `e2label /dev/vdb1 backup` for ext4, or with `-L` at `mkfs` time. LVM paths such as `/dev/datavg/weblv` are also stable, because they come from LVM names, so they are acceptable too.",
   "```bash\nmkdir -p /data\nblkid /dev/vdb1                  # copy the UUID\nvim /etc/fstab                   # add the line\nsystemctl daemon-reload          # systemd regenerates mount units\nmount -a                         # mount everything in fstab, reports errors\nfindmnt --verify                 # check fstab syntax and devices\nfindmnt /data ; df -h /data\n```",
   "Always test before rebooting. `mount -a` mounts every fstab entry not already mounted and prints an error for any bad line, which is far better than discovering the error at boot. `findmnt --verify` checks fstab for mistakes. On RHEL, systemd turns fstab entries into mount units, so run `systemctl daemon-reload` after editing to avoid a warning that the file changed. The mount point directory must exist before mounting.",
   "If a bad entry does make it through, the boot usually stops in emergency mode; fix fstab there as described in the boot-targets lesson. For removable or optional disks, the `nofail` option lets the boot continue if the device is missing."
  ],
  "terms": [
   [
    "/etc/fstab",
    "File listing file systems to mount at boot: device, mount point, type, options, dump and fsck order."
   ],
   [
    "Mount point",
    "An existing directory where a file system's contents are attached."
   ],
   [
    "UUID=",
    "fstab device syntax using a file system's universally unique identifier, stable across device renaming."
   ],
   [
    "LABEL=",
    "fstab device syntax using a human-assigned file system label."
   ],
   [
    "mount -a",
    "Mounts all fstab entries not yet mounted; used to test fstab before rebooting."
   ]
  ],
  "example": "You format /dev/vdb1 with XFS and need it at /archive permanently. `blkid /dev/vdb1` gives its UUID; you add `UUID=<that value> /archive xfs defaults 0 0` to /etc/fstab, create /archive, run `systemctl daemon-reload` and `mount -a`, and `findmnt /archive` confirms it before you reboot to be sure.",
  "tip": "Always run mount -a (and ideally findmnt --verify) after editing /etc/fstab. A typo you catch now is a two-second fix; the same typo at boot drops you into emergency mode.",
  "check": [
   [
    "Why are UUIDs preferred over /dev/sdX names in fstab?",
    "Device names can change when disks are added or detected in a different order; UUIDs stay with the file system."
   ],
   [
    "What does the sixth fstab field control?",
    "The fsck order at boot: 0 no check, 1 root, 2 other file systems."
   ],
   [
    "How do you test new fstab entries without rebooting?",
    "Run mount -a (after systemctl daemon-reload) and check for errors; findmnt --verify also helps."
   ]
  ]
 },
 {
  "t": "Adding new partitions, logical volumes and swap without destroying existing data",
  "body": [
   "Many RHCSA storage tasks are set on disks that already hold data or configuration you must keep. The grader checks both that your new storage works and that the existing partitions, volumes and file systems are intact. The skill here is adding storage non-destructively: using free space, not re-creating anything that exists, and verifying before and after.",
   "Start by surveying. `lsblk`, `lsblk -f`, `fdisk -l` or `parted DEVICE print free`, `pvs`, `vgs` and `swapon --show` tell you what exists, what is mounted and where free space is. Look for unallocated space at the end of a disk, an entirely unused disk, or free extents in a volume group.",
   "To add a partition, open the disk with fdisk, gdisk or parted and create a new partition in the free space only. Do not create a new partition table (fdisk `g`/`o`, parted `mklabel`); that discards every existing partition. Accept the default first sector, which is the start of free space, and specify a size with `+SIZE`. After writing, if the disk has mounted partitions, the kernel may not reread the table immediately; `partprobe` or `udevadm settle` usually solves it, and `lsblk` should show the new partition.",
   "To add a logical volume, check `vgs` for free space. If there is enough, `lvcreate` in the existing VG does not touch other LVs. If not, add a new partition or disk as a PV and `vgextend` the VG first. Never run `pvcreate` or `mkfs` on a device that already holds data: both overwrite what is there.",
   "Swap is disk space the kernel uses as overflow memory. To add swap non-destructively, create a new partition (type Linux swap) or LV, then:",
   "```bash\nmkswap /dev/vdb3                 # writes a swap signature, prints UUID\nswapon /dev/vdb3                 # activate now\necho 'UUID=<uuid-from-mkswap> none swap defaults 0 0' >> /etc/fstab\nswapoff /dev/vdb3 && swapon -a   # test the fstab entry\nswapon --show ; free -h          # confirm total swap increased\n```",
   "Note the `>>` to append; a single `>` would wipe fstab. `swapon -a` activates all swap entries in fstab and is the test for them, like `mount -a` for file systems. A task may say to add swap while keeping the existing swap, so the total in `free -h` should rise rather than one area replacing the other. Priorities (`pri=` option) set which swap is used first but are rarely required.",
   "Finish every storage task the same way: `lsblk` to see the layout, `mount -a` and `swapon -a` to test fstab, a reboot, and then `findmnt`, `swapon --show` and a look at the old data to confirm nothing was lost."
  ],
  "terms": [
   [
    "Free space",
    "Unallocated area on a disk or free extents in a volume group, where new storage can be added safely."
   ],
   [
    "Swap space",
    "Disk space used by the kernel to hold memory pages when RAM is under pressure."
   ],
   [
    "mkswap",
    "Writes a swap signature to a device, preparing it for use as swap."
   ],
   [
    "swapon / swapoff",
    "Activate or deactivate swap areas; swapon -a activates all fstab swap entries."
   ],
   [
    "swapon --show",
    "Lists active swap areas with their size, usage and priority."
   ]
  ],
  "example": "A disk /dev/vdb has a 1 GiB XFS partition mounted at /data and 4 GiB free. You add a 512 MiB swap partition with fdisk (n, default start, +512M, t swap, w), run `mkswap` and `swapon`, append its UUID to /etc/fstab with >>, and after a reboot `free -h` shows the extra swap while /data still has its files.",
  "tip": "Never recreate a partition table or run pvcreate/mkfs on something that holds data. Append to fstab with >> (or edit it), and test with mount -a and swapon -a before rebooting.",
  "check": [
   [
    "Which fdisk commands would destroy all existing partitions on a disk?",
    "g (new GPT table) or o (new DOS table), followed by w."
   ],
   [
    "How do you activate a new swap partition and test its fstab entry?",
    "mkswap and swapon it, add a UUID line to fstab, then swapoff it and run swapon -a to confirm fstab activates it."
   ],
   [
    "A VG has no free space but you need a new LV. What do you do first?",
    "Add a new PV (partition or disk) and vgextend the VG, then lvcreate."
   ]
  ]
 },
 {
  "t": "Creating and enabling swap (mkswap, swapon, swapon --show) and making it persistent",
  "body": [
   "Swap is disk space the kernel uses as overflow for memory. When RAM fills up, the kernel moves pages that have not been touched recently out to swap so active programs can keep running. Swap is much slower than RAM, so it is a safety net rather than a performance feature, but many workloads and the RHCSA exam expect you to add it on request. Swap can live on a partition, on a logical volume or in a file; exam tasks usually ask for a partition or a logical volume of a given size.",
   "The workflow has three steps. First create the space: a partition (in `fdisk` set the type to Linux swap, in `parted` use `mkpart` with the `linux-swap` file system type, in `gdisk` use type code 8200) or a logical volume with `lvcreate`. Second, write a swap signature with `mkswap`, which also assigns a UUID (universally unique identifier). Third, activate it with `swapon`. Check the result with `swapon --show` or `free -h`.",
   "```bash\nmkswap /dev/vdb2            # writes signature, prints UUID\nswapon /dev/vdb2            # activate now\nswapon --show               # list active swap areas\nfree -h                     # Swap: line shows the new total\n```",
   "Activation with `swapon` does not survive a reboot. To make swap persistent, add a line to `/etc/fstab`. For swap, the mount point field is `none` (or `swap`), the type is `swap`, and the dump and fsck fields are both 0. Use the UUID from `mkswap` or `blkid` instead of the device name, because device names like `/dev/vdb` can change between boots.",
   "```\nUUID=3f1c...-9a2e  none  swap  defaults  0 0\n```",
   "After editing `/etc/fstab`, test the entry without rebooting: run `swapon -a`, which activates every swap entry listed in the file, then `swapon --show` again. If you had already activated the device by hand, turn it off first with `swapoff /dev/vdb2` so that `swapon -a` proves the fstab line works. You can also set a priority with the `pri=` option; the kernel uses higher-priority swap areas first.",
   "Common mistakes are forgetting the `mkswap` step (swapon then fails with an invalid signature), putting a mount point path in the second field, or typing the UUID wrong. On the exam, a system that does not boot because of a broken fstab line costs far more than the swap task, so always test with `swapon -a` and `findmnt --verify` before you reboot."
  ],
  "terms": [
   [
    "Swap space",
    "Disk space the kernel uses to hold memory pages that do not fit in RAM."
   ],
   [
    "mkswap",
    "Writes a swap signature and UUID to a partition, logical volume or file so it can be used as swap."
   ],
   [
    "swapon / swapoff",
    "Activate or deactivate swap areas; swapon -a activates every swap entry in /etc/fstab."
   ],
   [
    "UUID",
    "A universally unique identifier stored in a file system or swap signature, used to refer to a device reliably in /etc/fstab."
   ]
  ],
  "example": "You are asked to add a 512 MiB swap partition on /dev/vdb that is active after reboot. You create partition 2 with parted as linux-swap, run mkswap /dev/vdb2, copy the UUID into /etc/fstab with none, swap, defaults, 0 0, then run swapon -a and confirm with swapon --show before rebooting.",
  "tip": "Persistence is the part graders check. A swap area activated only with swapon disappears at reboot, so the task fails unless the /etc/fstab line exists and swapon -a activates it cleanly.",
  "check": [
   [
    "What three commands take a new partition to active, verified swap?",
    "mkswap to write the signature, swapon to activate it, and swapon --show (or free -h) to verify it."
   ],
   [
    "What goes in the mount point and fsck fields of a swap line in /etc/fstab?",
    "The mount point is none (or swap) and both the dump and fsck order fields are 0, since swap is never mounted or checked."
   ],
   [
    "Why use the UUID rather than /dev/vdb2 in /etc/fstab?",
    "Device names can change between boots when disks are added or detected in a different order, while the UUID stays with the swap signature."
   ]
  ]
 },
 {
  "t": "Creating vfat, ext4 and xfs file systems (mkfs.vfat, mkfs.ext4, mkfs.xfs)",
  "body": [
   "A partition or logical volume is only raw block space until you put a file system on it. The file system decides how files, directories, permissions and free space are tracked. RHEL uses XFS as its default, supports ext4 as a mature alternative, and uses vfat (the FAT family) where other operating systems or firmware must read the disk, such as the EFI (Extensible Firmware Interface) system partition or a USB stick.",
   "Each type has its own `mkfs` helper. `mkfs.xfs` comes from the xfsprogs package, `mkfs.ext4` from e2fsprogs, and `mkfs.vfat` from dosfstools. You can also run `mkfs -t xfs /dev/vdb1`, which simply calls the right helper. Labels are optional but handy: XFS and ext4 take `-L label`, while vfat uses `-n LABEL`.",
   "```bash\nmkfs.xfs  /dev/vg1/data        # default RHEL file system\nmkfs.ext4 -L logs /dev/vdb1    # ext4 with a label\nmkfs.vfat -n USBDATA /dev/vdc1 # FAT, readable by other systems\nlsblk -f                       # shows FSTYPE, LABEL, UUID\nblkid /dev/vdb1                # prints UUID and TYPE\n```",
   "Know the differences the exam leans on. XFS is fast with large files and parallel I/O, can be grown while mounted, but cannot be shrunk. ext4 can be grown online and shrunk offline. vfat has no Linux ownership or permission bits at all; the owner and mode you see are set at mount time with options such as `uid=`, `gid=` and `umask=`, so `chmod` and `chown` on files inside it do not work the way you expect.",
   "`mkfs` destroys whatever was on the device. If the device already holds a file system, `mkfs.xfs` refuses and asks for `-f` to force it; `mkfs.ext4` asks for confirmation. That refusal is a useful safety check, so read the message before forcing. Double-check the device name with `lsblk` first, especially on a VM with several similar disks.",
   "Creating the file system does not make it usable yet: you still need a mount point directory, a mount, and usually an `/etc/fstab` line. After `mkfs`, run `blkid` to get the new UUID for that fstab line. Note that re-running `mkfs` on the same device generates a new UUID, so any fstab entry that used the old one must be updated."
  ],
  "terms": [
   [
    "XFS",
    "The default RHEL file system; high performance and growable online, but it cannot be shrunk."
   ],
   [
    "ext4",
    "The fourth extended file system; mature, growable online and shrinkable while unmounted."
   ],
   [
    "vfat",
    "The Linux driver for FAT file systems, used for EFI partitions and removable media; it stores no Linux ownership or permissions."
   ],
   [
    "blkid",
    "Prints the UUID, label and file system type of block devices, used when writing /etc/fstab entries."
   ]
  ],
  "example": "A task asks for an ext4 file system labeled archive on the logical volume /dev/vgdata/lvarch. You run mkfs.ext4 -L archive /dev/vgdata/lvarch, confirm with lsblk -f that FSTYPE is ext4 and LABEL is archive, and then use blkid to copy its UUID into /etc/fstab.",
  "tip": "Match the requested type exactly. A grader checking for ext4 will fail an XFS volume even if it mounts and works, so confirm with lsblk -f or blkid before moving on.",
  "check": [
   [
    "Which option sets a label for XFS and ext4, and which for vfat?",
    "XFS and ext4 use -L label; mkfs.vfat uses -n LABEL."
   ],
   [
    "Why can't you fix ownership inside a vfat file system with chown?",
    "FAT stores no Linux owner or permission bits; ownership and mode are set for the whole file system at mount time with options like uid=, gid= and umask=."
   ],
   [
    "What happens to the UUID if you run mkfs again on the same device?",
    "A new UUID is generated, so any /etc/fstab entry using the old UUID must be updated."
   ]
  ]
 },
 {
  "t": "Mounting, unmounting and using file systems; mount -a and findmnt --verify",
  "body": [
   "Linux has one directory tree starting at `/`. Mounting attaches a file system to a directory in that tree, called the mount point, so its contents appear there. Whatever was inside the mount point directory before is hidden until you unmount. On RHEL you mount manually to test and use `/etc/fstab` to make mounts persistent across reboots.",
   "A manual mount takes a device and a directory. The device can be a path, `UUID=...` or `LABEL=...`. The kernel usually detects the file system type, but you can state it with `-t`. Options go after `-o`, for example `ro` for read-only or `noexec` to block running programs from that file system.",
   "```bash\nmkdir -p /data\nmount UUID=5b2e...c7 /data        # or: mount /dev/vg1/data /data\nmount -o remount,ro /data          # change options in place\nfindmnt /data                      # show source, type, options\ndf -h /data                        # size and free space\numount /data                       # detach it\n```",
   "Unmounting fails with target is busy if any process has a file open there or a shell has it as its current directory, which is often your own shell. Run `cd /` and try again. To find the culprit, `lsof /data` or `fuser -vm /data` lists the processes using it. Avoid lazy unmounts as a habit; fix the cause.",
   "For persistent mounts, add a line to `/etc/fstab`, then test it. `mount -a` mounts every fstab entry that is not already mounted, so an error there points at your new line. `findmnt --verify` goes further: it parses the whole file and reports problems such as a missing mount point directory, an unknown file system type or a UUID that does not exist, without mounting anything. Run both before you reboot.",
   "On RHEL, systemd turns each fstab line into a mount unit at boot. After editing the file, run `systemctl daemon-reload` so systemd picks up the change; otherwise `mount` may warn that fstab was modified and systemd still uses the old version. A bad fstab line that is not marked `nofail` can drop the system into emergency mode at boot, where you must log in as root, fix the file and reboot.",
   "To use the mounted file system, just work in the mount point. Remember that ownership and permissions of the mount point are those of the root directory of the mounted file system, not of the empty directory you created, so set `chown` and `chmod` after mounting."
  ],
  "terms": [
   [
    "Mount point",
    "An existing directory where a file system is attached to the directory tree."
   ],
   [
    "mount -a",
    "Mounts every file system listed in /etc/fstab that is not already mounted, used to test new entries."
   ],
   [
    "findmnt --verify",
    "Checks /etc/fstab for errors such as missing mount points, bad types or unknown devices without mounting."
   ],
   [
    "target is busy",
    "The umount error shown when a process has open files or a working directory inside the file system."
   ]
  ],
  "example": "After adding an fstab line for /backup, you run systemctl daemon-reload, then findmnt --verify, which warns that /backup does not exist. You create the directory, run mount -a with no errors, and findmnt /backup shows the right device and options, so the reboot is safe.",
  "tip": "Never reboot after editing /etc/fstab without running mount -a and findmnt --verify. A typo can leave the exam system in emergency mode and cost you time on every other task.",
  "check": [
   [
    "umount /data reports target is busy. What are the usual cause and fix?",
    "A process or your own shell is using a file or directory there; cd out of it, or find the process with lsof or fuser -vm and stop it, then unmount."
   ],
   [
    "What does findmnt --verify check that mount -a does not?",
    "It parses every fstab line and reports problems such as missing mount point directories, unknown types or unresolvable UUIDs without mounting anything, including entries already mounted."
   ],
   [
    "Why run systemctl daemon-reload after editing /etc/fstab?",
    "systemd generates mount units from fstab; the reload makes it regenerate them so it uses your new entries."
   ]
  ]
 },
 {
  "t": "/etc/fstab fields: device, mount point, type, options, dump, fsck order",
  "body": [
   "`/etc/fstab` (file system table) lists file systems to mount at boot. Each non-comment line has six fields separated by spaces or tabs. You will edit this file on nearly every RHCSA storage task, so learn the fields in order until you can write a line without looking.",
   "```\n# device                  mount point  type  options           dump fsck\nUUID=5b2e...c7            /data        xfs   defaults          0    0\nLABEL=logs                /logs        ext4  defaults,noatime  0    2\n/dev/vg1/lvapp            /app         xfs   defaults          0    0\nUUID=3f1c...9a2e          none         swap  defaults          0    0\nserver1:/export/share     /mnt/share   nfs   defaults,_netdev  0    0\n```",
   "Field 1 is the device: `UUID=`, `LABEL=`, a logical volume path such as `/dev/vg1/lvapp` (stable because LVM names persist), or `host:/path` for NFS (Network File System). Avoid raw names like `/dev/vdb1` for disks. Field 2 is the mount point, an existing absolute directory, or `none` for swap. Field 3 is the type: `xfs`, `ext4`, `vfat`, `swap`, `nfs` and so on.",
   "Field 4 holds comma-separated options with no spaces. `defaults` means rw, suid, dev, exec, auto, nouser and async. Useful extras: `ro` (read-only), `noexec`, `nosuid`, `noauto` (do not mount at boot), `nofail` (boot continues if the device is missing), `_netdev` (wait for the network), and for vfat `uid=`, `gid=` and `umask=`.",
   "Field 5 is the dump flag, used by the old `dump` backup tool; set it to 0. Field 6 is the fsck order: 0 means never check at boot, 1 is for the root file system, and 2 is for other file systems checked after root. XFS does not use boot-time fsck, so XFS lines normally use 0, and so do swap and network file systems. ext4 data file systems commonly use 2.",
   "Workflow: get the UUID with `blkid` or `lsblk -f`, create the mount point with `mkdir -p`, add the line, run `systemctl daemon-reload`, then `mount -a` and `findmnt --verify`. Tip for speed: `blkid /dev/vdb1 >> /etc/fstab` appends the UUID so you can edit it into shape instead of retyping it, but clean up the extra text carefully.",
   "Order matters for nested mounts: a line for `/data/archive` must come after the line for `/data`. Fields are whitespace separated, so a space inside the options list breaks the whole line."
  ],
  "terms": [
   [
    "/etc/fstab",
    "The file that lists file systems and swap to mount or activate at boot, one six-field line each."
   ],
   [
    "defaults",
    "The option set rw, suid, dev, exec, auto, nouser and async."
   ],
   [
    "fsck order",
    "The sixth fstab field: 0 skips checking, 1 is root, 2 is other file systems checked after root."
   ],
   [
    "nofail",
    "An fstab option that lets boot continue if the device is not present."
   ]
  ],
  "example": "You need /dev/vgdata/lvweb (XFS) mounted read-only at /srv/web at boot. You add the line /dev/vgdata/lvweb /srv/web xfs ro 0 0, run systemctl daemon-reload and mount -a, and findmnt /srv/web shows the options column starting with ro.",
  "tip": "Exam questions often ask what the fifth and sixth fields mean. Dump is legacy and set to 0; fsck order is 1 for root, 2 for others, and 0 for XFS, swap and network mounts.",
  "check": [
   [
    "List the six fstab fields in order.",
    "Device, mount point, file system type, mount options, dump flag and fsck order."
   ],
   [
    "Why do XFS lines usually end in 0 0?",
    "The dump flag is unused, and XFS is not checked by fsck at boot (it repairs via its journal and xfs_repair), so the fsck order is 0."
   ],
   [
    "What does noauto do?",
    "It keeps the file system from mounting at boot or with mount -a; it mounts only when requested explicitly."
   ]
  ]
 },
 {
  "t": "Mounting and unmounting NFS network file systems (mount -t nfs, _netdev)",
  "body": [
   "NFS (Network File System) lets a server share, or export, directories that clients mount over the network as if they were local. The RHCSA tests the client side: finding a share, mounting it by hand, and making it mount at boot. The client tools come from the nfs-utils package, which is often already installed.",
   "An NFS source is written `server:/exported/path`. To see what a server exports, `showmount -e server` works when the server also offers the older NFSv3 services; with an NFSv4-only server it may fail, and you can instead mount the server's root export and browse it. RHEL clients try NFS version 4 first by default, and you can force a version with `-o nfsvers=4.2` or `vers=3`.",
   "```bash\ndnf install -y nfs-utils\nmkdir -p /mnt/share\nmount -t nfs server1.example.com:/exports/share /mnt/share\nfindmnt /mnt/share      # shows type nfs4 and options\numount /mnt/share\n```",
   "For a persistent mount, the fstab line uses the NFS source as the device, `nfs` as the type, and includes `_netdev`. That option marks the file system as needing the network, so systemd waits until networking is up before mounting it and unmounts it before the network goes down at shutdown. Dump and fsck are 0 because there is nothing local to check.",
   "```\nserver1.example.com:/exports/share  /mnt/share  nfs  defaults,_netdev  0 0\n```",
   "Troubleshooting follows the path of the request. Can you resolve and reach the server (`ping`, `getent hosts server1`)? Is the export path spelled exactly as exported? Does the client firewall matter? Usually not, because the client makes outbound connections, but the server's firewall must allow the nfs service. Access denied errors often mean the server does not export to your client address. Permission errors after mounting usually come from UID mismatches or root squashing, where the server maps the client's root user to an unprivileged user.",
   "If a server is down, NFS mounts can hang processes that touch them, since the default hard mount retries forever. That is by design to protect data, but it is another reason to test mounts before rebooting. When the task asks for on-demand mounting instead of a permanent one, use autofs, covered next."
  ],
  "terms": [
   [
    "NFS",
    "Network File System; a protocol for sharing directories from a server so clients can mount them over the network."
   ],
   [
    "Export",
    "A directory an NFS server makes available to clients."
   ],
   [
    "_netdev",
    "An fstab option marking a file system as network-dependent so it mounts after networking starts."
   ],
   [
    "Root squash",
    "An NFS server behavior that maps a client's root user to an unprivileged account, the default for exports."
   ]
  ],
  "example": "A task says to mount server1:/exports/projects at /projects at every boot. You create /projects, test with mount -t nfs server1:/exports/projects /projects, unmount, add server1:/exports/projects /projects nfs defaults,_netdev 0 0 to /etc/fstab, then run systemctl daemon-reload and mount -a to confirm.",
  "tip": "Include _netdev on network mounts in /etc/fstab. It documents that the mount needs the network and keeps boot and shutdown ordering correct, and it is the option exam answers look for.",
  "check": [
   [
    "What is the device field for an NFS mount in /etc/fstab?",
    "The server name or address and exported path, written server:/path."
   ],
   [
    "Why might showmount -e fail against a working NFS server?",
    "It relies on NFSv3 services; a server offering only NFSv4 may not answer it, even though mounts work."
   ],
   [
    "Files you create on an NFS mount as root show up owned by nobody. Why?",
    "The server uses root squash, mapping client root to an unprivileged user."
   ]
  ]
 },
 {
  "t": "Configuring autofs: /etc/auto.master.d/*.autofs, map files and wildcard (* and &) entries",
  "body": [
   "autofs is the automounter. Instead of mounting file systems at boot, it watches directories and mounts a file system the moment someone accesses a path under them, then unmounts it after a period of inactivity. It is the standard way to give users network home directories: nothing is mounted until a user logs in, and an unreachable server does not slow down boot.",
   "Setup has three parts. Install and enable the service with `dnf install autofs` and `systemctl enable --now autofs`. Create a master map entry, preferably a drop-in file ending in `.autofs` under `/etc/auto.master.d/`, that names a base directory and the map file that controls it. Then write the map file itself.",
   "```\n# /etc/auto.master.d/guests.autofs\n/rhome   /etc/auto.guests\n\n# /etc/auto.guests  (indirect map)\nuser1   -rw,sync   server1:/rhome/user1\n```",
   "With that indirect map, autofs owns `/rhome`. Accessing `/rhome/user1` mounts `server1:/rhome/user1` there. Do not create `/rhome/user1` yourself; autofs creates the key directories on demand, and `ls /rhome` looks empty until something is accessed. That surprises people but is normal. Test with `cd /rhome/user1` or `ls /rhome/user1`.",
   "Wildcards let one line cover every user. In the key column `*` matches any name, and in the location `&` is replaced by the key that matched. So the line `* -rw,sync server1:/rhome/&` means accessing `/rhome/alice` mounts `server1:/rhome/alice`, and `/rhome/bob` mounts `server1:/rhome/bob`.",
   "A direct map uses `/-` as the base in the master map, and its map file lists full absolute paths as keys, for example `/mnt/docs -ro server1:/exports/docs`. Direct maps suit a few fixed mount points scattered across the tree; indirect maps suit many mounts under one parent.",
   "After changing maps, run `systemctl restart autofs` (or reload). If a mount does not appear, check the service status, `journalctl -u autofs`, that the master map file name ends in `.autofs`, that the server export is reachable with a manual `mount`, and that you are not mixing up the master map and map file names. Because autofs mounts on demand, there is no `/etc/fstab` line for these paths."
  ],
  "terms": [
   [
    "autofs",
    "A service that mounts file systems automatically when a path is accessed and unmounts them when idle."
   ],
   [
    "Master map",
    "The top-level autofs configuration, in /etc/auto.master and /etc/auto.master.d/*.autofs, mapping base directories to map files."
   ],
   [
    "Indirect map",
    "A map whose keys are names relative to a base directory given in the master map."
   ],
   [
    "Wildcard entry",
    "A map line with * as the key and & in the location, so any key name maps to a matching server path."
   ]
  ],
  "example": "Users ldapuser1 through ldapuser9 need home directories from server1:/home/guests mounted under /home/guests. You add /home/guests /etc/auto.guests to /etc/auto.master.d/guests.autofs, write * -rw,sync server1:/home/guests/& in /etc/auto.guests, enable autofs, and su - ldapuser5 lands in a mounted home directory.",
  "tip": "Do not create the subdirectories under an autofs base or add fstab lines for them. An empty ls of the base directory is expected; test by accessing the full path.",
  "check": [
   [
    "In the map line * -rw server1:/home/&, what does & mean?",
    "It is replaced by the key that * matched, so /base/alice mounts server1:/home/alice."
   ],
   [
    "What name must a master map drop-in file have?",
    "It must be in /etc/auto.master.d/ and end in .autofs."
   ],
   [
    "How does a direct map differ from an indirect map in the master map?",
    "A direct map uses /- as its base and lists absolute paths in its map file; an indirect map names a base directory and lists relative keys."
   ]
  ]
 },
 {
  "t": "Extending existing logical volumes and their file systems (lvextend -r, xfs_growfs, resize2fs)",
  "body": [
   "Growing storage without downtime is one of LVM's (Logical Volume Manager's) main benefits. A logical volume (LV) takes space from its volume group (VG), which pools one or more physical volumes (PVs). Extending means two things: making the LV larger, and then making the file system on it use the new space. Forget the second step and `df` still shows the old size.",
   "First check free space in the volume group with `vgs` (the VFree column) or `vgdisplay`. If there is not enough, add a disk or partition: `pvcreate /dev/vdc` then `vgextend vg1 /dev/vdc`. Then extend the LV. `-L` sets size in units (`-L 2G` makes it 2 GiB total, `-L +500M` adds 500 MiB), while `-l` works in extents (`-l +100%FREE` takes all remaining space in the VG).",
   "```bash\nvgs                                  # check VFree\nlvextend -r -L +500M /dev/vg1/data   # grow LV and file system together\ndf -h /data                          # confirm new size\n```",
   "The `-r` (`--resizefs`) option is the simplest and safest choice: after growing the LV it calls the right file system tool for you. If you forgot it, grow the file system yourself. For XFS, run `xfs_growfs` on the mount point, for example `xfs_growfs /data`; XFS must be mounted to grow. For ext4, run `resize2fs /dev/vg1/data`, which grows ext4 online while mounted.",
   "```bash\nlvextend -L +1G /dev/vg1/data   # LV only\nxfs_growfs /data                # XFS: pass the mount point\nresize2fs /dev/vg1/data         # ext4: pass the device\n```",
   "Watch the size wording in tasks. Grow to 800 MiB means total size, `-L 800M`; add 800 MiB means `-L +800M`. Also note that sizes are approximate: LVM rounds to whole extents (4 MiB by default), and graders usually accept a range. Verify with `lvs` for the volume and `df -h` for the file system; both must show the new size.",
   "Swap on an LV is a special case: `swapoff` it, `lvextend`, run `mkswap` again (which changes the UUID, so update fstab), then `swapon`."
  ],
  "terms": [
   [
    "lvextend",
    "Increases the size of a logical volume, optionally resizing its file system with -r."
   ],
   [
    "xfs_growfs",
    "Grows a mounted XFS file system to fill its device; takes the mount point."
   ],
   [
    "resize2fs",
    "Resizes an ext2, ext3 or ext4 file system; it can grow online and shrink offline."
   ],
   [
    "Physical extent",
    "The fixed-size unit (4 MiB by default) in which LVM allocates space, so LV sizes round to multiples of it."
   ]
  ],
  "example": "The /data volume (XFS on /dev/vg1/data) must grow from 1 GiB to 1.5 GiB. vgs shows 2 GiB free, so you run lvextend -r -L 1.5G /dev/vg1/data. lvs shows 1.50g, and df -h /data reports roughly 1.5G, so both layers are done without unmounting.",
  "tip": "The most common failure is growing the LV but not the file system. Use lvextend -r every time, and check df -h, not just lvs, before moving on.",
  "check": [
   [
    "What is the difference between lvextend -L 2G and -L +2G?",
    "-L 2G sets the total size to 2 GiB; -L +2G adds 2 GiB to the current size."
   ],
   [
    "Which argument does xfs_growfs take and which does resize2fs take?",
    "xfs_growfs takes the mount point of the mounted XFS file system; resize2fs takes the device path."
   ],
   [
    "The volume group has no free space. What do you do before lvextend?",
    "Initialize a new disk or partition with pvcreate and add it to the group with vgextend."
   ]
  ]
 },
 {
  "t": "XFS can grow but not shrink; ext4 can do both when unmounted",
  "body": [
   "When you resize storage, the file system type decides what is possible. This is one of the most tested distinctions in RHCSA storage: XFS, the RHEL default, can only get bigger. ext4 can get bigger while mounted, and it can get smaller, but only while unmounted. Knowing this lets you pick the right file system at creation time and avoid destroying data during a resize.",
   "XFS was designed around large, growing data sets. `xfs_growfs` extends it while it is mounted and in use, which is why growing XFS is quick and painless. There is no tool to shrink XFS in place. If an XFS volume truly must become smaller, the only path is to back up the data (for example with `xfsdump` or `tar`), unmount, reduce or recreate the logical volume, run `mkfs.xfs` again, and restore. On the exam that usually means you should not have chosen XFS for a volume the task says will shrink.",
   "ext4 grows online with `resize2fs` exactly like XFS grows with `xfs_growfs`. Shrinking requires more care, because the file system must be made smaller before the volume under it, never the other way around. Cutting the LV first chops off the end of the file system and corrupts data. The manual order is: unmount, check, shrink the file system, then shrink the LV.",
   "```bash\numount /logs\ne2fsck -f /dev/vg1/logs          # required check before shrinking\nresize2fs /dev/vg1/logs 800M     # shrink file system first\nlvreduce -L 800M /dev/vg1/logs   # then the LV to match\nmount /logs\n```",
   "The safer shortcut is `lvreduce -r -L 800M /dev/vg1/logs`. The `-r` option calls `fsadm`, which checks and shrinks the file system in the correct order before reducing the LV; it will unmount if needed or ask you to. Used on an XFS volume, `lvreduce -r` fails because XFS cannot shrink, which protects you. Without `-r`, `lvreduce` shows a warning that data may be destroyed; treat that warning seriously.",
   "Remember also that you cannot shrink an ext4 file system below the space its data uses, and `resize2fs` will refuse. Always confirm with `df -h` and `lvs` afterwards, and check that the data is still readable."
  ],
  "terms": [
   [
    "Shrink",
    "Reducing a file system and its volume to a smaller size; supported offline by ext4 and not at all by XFS."
   ],
   [
    "e2fsck -f",
    "Forces a full consistency check of an ext file system, required by resize2fs before shrinking."
   ],
   [
    "lvreduce",
    "Decreases the size of a logical volume; with -r it shrinks the file system first."
   ],
   [
    "fsadm",
    "A helper used by lvextend -r and lvreduce -r to resize the file system on a logical volume."
   ]
  ],
  "example": "A colleague needs 300 MiB back from the ext4 /reports volume. You unmount it, run lvreduce -r -L -300M /dev/vg1/reports, which checks and shrinks the file system before the LV, then remount and confirm the files are intact. The same request on an XFS volume would mean back up, recreate and restore.",
  "tip": "Order is everything when shrinking: file system first, then logical volume. For growing it is the reverse: volume first, then file system. The -r option handles both orders for you.",
  "check": [
   [
    "Can you shrink a mounted ext4 file system?",
    "No. ext4 grows online but must be unmounted, and checked with e2fsck -f, before it can be shrunk."
   ],
   [
    "How do you reduce the size of an XFS volume?",
    "You cannot shrink XFS; back up the data, recreate a smaller LV and file system, and restore."
   ],
   [
    "Why is running lvreduce before resize2fs dangerous?",
    "It removes space the file system still thinks it owns, cutting off data at the end and corrupting the file system."
   ]
  ]
 },
 {
  "t": "Diagnosing and correcting file permission problems (ls -l, namei -l, chmod, chown)",
  "body": [
   "When a user gets Permission denied, the cause is almost always one of a few things: the wrong owner or group, missing permission bits on the file, or missing permission on a directory somewhere along the path. SELinux and ACLs (access control lists) can also block access, but start with standard permissions because they are checked first and are the most common exam problem.",
   "Every file has an owner, a group and three sets of bits: user (owner), group and other. `ls -l` shows them, and `ls -ld dir` shows a directory itself rather than its contents. Linux checks only one set: if you are the owner, owner bits apply; otherwise if you are in the group, group bits apply; otherwise other bits apply. That means an owner with fewer rights than other is still restricted by the owner bits.",
   "Bits mean different things on directories. `r` lets you list names, `w` lets you create, delete and rename entries (together with `x`), and `x` lets you enter the directory and reach anything inside it. To open `/srv/app/conf/app.ini`, you need `x` on every directory in the path plus `r` on the file. `namei -l` shows the owner and mode of every component, which makes a missing `x` easy to spot.",
   "```bash\nnamei -l /srv/app/conf/app.ini\n# f: /srv/app/conf/app.ini\n# dr-xr-xr-x root root   /\n# drwxr-xr-x root root   srv\n# drwx------ root root   app      <- others cannot traverse\n# drwxr-xr-x app  app    conf\n# -rw-r----- app  app    app.ini\n```",
   "Fix with the smallest change that meets the requirement. `chown user:group file` changes owner and group, `chgrp` changes just the group, and `-R` recurses. `chmod` accepts symbolic modes like `g+rw` or `o-rwx` and numeric modes like `750` (r=4, w=2, x=1 per set). A capital `X` in `chmod -R g+rX` adds execute only to directories and files that already have it, which is ideal for opening a tree without making every file executable.",
   "Test as the affected user, not as root, because root bypasses normal permission checks: `su - alice -c 'cat /srv/app/conf/app.ini'` or `sudo -u alice cat ...`. If permissions look right and access still fails, check for ACLs with `getfacl` (a `+` after the mode in `ls -l` indicates one) and for SELinux denials in the audit log. Avoid the quick fix `chmod 777`; it hides the real problem and opens the file to every user."
  ],
  "terms": [
   [
    "namei -l",
    "Lists each component of a path with its owner, group and mode, used to find where traversal fails."
   ],
   [
    "Execute bit on a directory",
    "Permission to enter a directory and access entries inside it, needed on every directory in a path."
   ],
   [
    "chmod",
    "Changes permission bits using symbolic (u+x, g-w) or numeric (755) modes."
   ],
   [
    "chown",
    "Changes the owner, and optionally the group, of files with the form user:group."
   ]
  ],
  "example": "Members of the devs group cannot read /opt/project/notes.txt even though the file is -rw-rw---- root:devs. namei -l shows /opt/project is drwx------, so the group cannot traverse it. You run chgrp devs /opt/project and chmod 750 /opt/project, and su - dev1 -c 'cat /opt/project/notes.txt' now works.",
  "tip": "Linux applies only the first matching class: owner, then group, then other. And access needs x on every parent directory, which namei -l reveals in one command.",
  "check": [
   [
    "A file is mode 644 but a user still gets Permission denied reading it. What do you check first?",
    "The directories in the path; the user needs execute permission on every one, which namei -l shows."
   ],
   [
    "What does chmod -R g+rX do differently from g+rx?",
    "Capital X adds execute only to directories and files that already have an execute bit, so regular files do not become executable."
   ],
   [
    "Why should you test access as the user instead of as root?",
    "Root bypasses standard permission checks, so a test as root proves nothing about what the user can do."
   ]
  ]
 },
 {
  "t": "Scheduling tasks with at, cron (crontab -e, /etc/cron.d) and systemd timer units (OnCalendar=, OnBootSec=)",
  "body": [
   "RHEL gives you three ways to run commands later. `at` runs a job once at a set time. cron runs jobs repeatedly on a schedule. systemd timer units also run jobs on a schedule or relative to events like boot, and they integrate with logging and service management. The exam may ask for any of them, so know the syntax of each.",
   "`at` needs the atd service running (`systemctl enable --now atd`). You give it a time and type the commands, ending with Ctrl+D, or pipe them in. `atq` lists pending jobs and `atrm N` removes job N.",
   "```bash\necho 'tar czf /tmp/etc.tgz /etc' | at now + 30 minutes\nat 17:00 tomorrow\natq\natrm 3\n```",
   "cron is run by crond. Each user edits their own table with `crontab -e`; root can manage another user's with `crontab -e -u alice` and list with `crontab -l -u alice`. A line has five time fields, then the command: minute (0-59), hour (0-23), day of month (1-31), month (1-12) and day of week (0-7, where 0 and 7 are Sunday). `*` means every value, `*/15` means every 15, commas list values and dashes give ranges. So `30 2 * * 1-5 /usr/local/bin/backup.sh` runs at 02:30 Monday to Friday.",
   "System-wide jobs go in files under `/etc/cron.d/`. These use the same five fields plus a sixth field naming the user to run as, for example `0 * * * * root /usr/local/bin/cleanup.sh`. Forgetting that user field is a common mistake. Scripts dropped into `/etc/cron.daily/`, `/etc/cron.weekly/` and `/etc/cron.monthly/` are run by anacron, which catches up on jobs missed while the machine was off.",
   "A systemd timer is a `.timer` unit that activates a matching `.service` unit. `OnCalendar=` sets wall-clock schedules such as `daily`, `Mon..Fri 02:30` or `*-*-* 02:30:00`. `OnBootSec=15min` runs a set time after boot, and `OnUnitActiveSec=` repeats relative to the last run. `Persistent=true` runs a missed calendar job at the next boot.",
   "```ini\n# /etc/systemd/system/backup.timer\n[Unit]\nDescription=Nightly backup\n\n[Timer]\nOnCalendar=*-*-* 02:30:00\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n```",
   "Create `backup.service` with `Type=oneshot` and `ExecStart=/usr/local/bin/backup.sh`, then run `systemctl daemon-reload` and `systemctl enable --now backup.timer`; you enable the timer, not the service. `systemctl list-timers` shows the next run, `systemd-analyze calendar 'Mon..Fri 02:30'` checks an expression, and `journalctl -u backup.service` shows output."
  ],
  "terms": [
   [
    "at",
    "Schedules a one-time job, run by the atd service; atq lists and atrm removes jobs."
   ],
   [
    "crontab",
    "A per-user table of recurring jobs with five time fields and a command, edited with crontab -e."
   ],
   [
    "/etc/cron.d",
    "A directory of system cron files whose lines include a user field between the schedule and the command."
   ],
   [
    "Timer unit",
    "A systemd .timer file that starts a matching service on a calendar schedule (OnCalendar=) or after an event (OnBootSec=)."
   ]
  ],
  "example": "The task: user natasha must run /bin/echo hello every day at 14:23. As root you run crontab -e -u natasha and add 23 14 * * * /bin/echo hello, then confirm with crontab -l -u natasha. Because it is her crontab, no user field is needed.",
  "tip": "Know which cron format needs a user field: personal crontabs never do, /etc/crontab and /etc/cron.d files always do. And remember to enable the .timer unit, not the .service, for systemd timers.",
  "check": [
   [
    "What does the cron schedule */10 8-17 * * 1-5 mean?",
    "Every 10 minutes from 08:00 through 17:50, Monday to Friday."
   ],
   [
    "How do you make a systemd timer start at boot and run on schedule?",
    "Create the .timer and matching .service, run systemctl daemon-reload, then systemctl enable --now name.timer."
   ],
   [
    "What does OnBootSec=10min do?",
    "It triggers the service ten minutes after the system boots."
   ]
  ]
 },
 {
  "t": "Starting and stopping services and configuring them to start at boot (systemctl enable --now, disable, mask)",
  "body": [
   "systemd is RHEL's init system and service manager. It starts services, called units, and tracks their state. Two questions are separate and the exam tests both: is the service running right now (active), and will it start at boot (enabled)? A service can be running but not enabled, which means it disappears after the reboot that graders perform.",
   "`systemctl start`, `stop` and `restart` change the current state. `reload` asks a running service to reread its configuration without stopping, if it supports that. `systemctl status sshd` shows whether it is active, whether it is enabled, its main process and its latest log lines. Quick checks: `systemctl is-active sshd` and `systemctl is-enabled sshd`.",
   "`systemctl enable httpd` creates symlinks in the `.wants` directory of the target named in the unit's `[Install]` section, usually `multi-user.target`, so it starts at boot. `disable` removes those links. Neither changes the current state, which is why `enable --now` exists: it enables and starts in one command. Likewise `disable --now` disables and stops.",
   "```bash\nsystemctl enable --now httpd     # start now and at every boot\nsystemctl status httpd\nsystemctl disable --now cups     # stop now and at boot\nsystemctl mask cups              # block it entirely\nsystemctl unmask cups\nsystemctl list-units --type=service --state=running\nsystemctl list-unit-files --type=service\n```",
   "Masking is stronger than disabling. A disabled service can still be started manually or pulled in as a dependency of another unit. `mask` links the unit to `/dev/null`, so nothing can start it until you `unmask` it. Use it to keep conflicting services off, for example when two services would compete for the same port.",
   "If you edit a unit file or create a new one, run `systemctl daemon-reload` so systemd reads it. If a service fails to start, `systemctl status` and `journalctl -u name` usually show the reason, such as a configuration error, a port already in use or an SELinux denial. Some services, such as those started by a socket or timer, are enabled through the `.socket` or `.timer` unit instead of the service."
  ],
  "terms": [
   [
    "Unit",
    "An object managed by systemd, such as a .service, .socket, .timer, .mount or .target."
   ],
   [
    "enable --now",
    "Configures a unit to start at boot and starts it immediately in one command."
   ],
   [
    "mask",
    "Links a unit to /dev/null so it cannot be started manually or as a dependency until unmasked."
   ],
   [
    "daemon-reload",
    "Makes systemd reread unit files after they are created or changed."
   ]
  ],
  "example": "After installing httpd you run systemctl start httpd and the web page works. That is not enough for the exam: after reboot httpd is stopped. Running systemctl enable --now httpd, then checking that is-enabled prints enabled and is-active prints active, makes the result survive the reboot.",
  "tip": "Enabled and active are independent. Exam answers that only start a service, or only enable it, are both incomplete; enable --now covers both.",
  "check": [
   [
    "What is the difference between disable and mask?",
    "disable removes boot-time links but the unit can still be started manually or by dependencies; mask links it to /dev/null so it cannot start at all."
   ],
   [
    "You edited /etc/systemd/system/app.service. What must you run before restarting it?",
    "systemctl daemon-reload, so systemd rereads the unit file."
   ],
   [
    "Which single command stops a service and prevents it starting at boot?",
    "systemctl disable --now name."
   ]
  ]
 },
 {
  "t": "Setting the default boot target (systemctl get-default, set-default)",
  "body": [
   "A systemd target is a named group of units that represents a system state. It replaces the old numbered runlevels. At boot, systemd starts the default target and everything it depends on. The two targets you will set most often are `multi-user.target`, a full system with networking and services but a text console only, and `graphical.target`, which adds a graphical login on top of multi-user.",
   "`systemctl get-default` prints the current default. `systemctl set-default multi-user.target` changes it. Behind the scenes the default is a symlink, `/etc/systemd/system/default.target`, pointing to the chosen target, and `set-default` simply replaces that link. The change applies at the next boot.",
   "```bash\nsystemctl get-default\nsystemctl set-default multi-user.target\n# Created symlink /etc/systemd/system/default.target -> .../multi-user.target\nsystemctl isolate multi-user.target   # switch now, without rebooting\n```",
   "To change the current state immediately, use `systemctl isolate target`, which starts that target's units and stops everything not needed by it. Only targets marked as isolatable can be used this way. Switching from graphical to multi-user with isolate ends the graphical session, so do it from a console or SSH session you do not mind losing.",
   "Other targets matter for recovery. `rescue.target` gives a single-user root shell with local file systems mounted but no networking; `emergency.target` gives an even more minimal shell with the root file system read-only. You can pick one for a single boot by editing the kernel line at the GRUB menu (press e) and adding `systemd.unit=rescue.target`, then Ctrl+X to boot. This does not change the default.",
   "Old runlevel names still exist as aliases, such as `runlevel3.target` for multi-user and `runlevel5.target` for graphical, and you may see them in older documentation. Use the real target names on the exam. After setting a default, verify with `get-default`; graders often check exactly that output."
  ],
  "terms": [
   [
    "Target",
    "A systemd unit that groups other units to define a system state, replacing runlevels."
   ],
   [
    "multi-user.target",
    "A full non-graphical system state with networking and services, the usual default for servers."
   ],
   [
    "graphical.target",
    "multi-user.target plus a graphical login manager."
   ],
   [
    "isolate",
    "A systemctl command that switches the running system to a target, stopping units not required by it."
   ]
  ],
  "example": "A server boots to a graphical login and wastes memory. You run systemctl set-default multi-user.target, check that get-default prints multi-user.target, and optionally run systemctl isolate multi-user.target to switch now instead of waiting for the next reboot.",
  "tip": "set-default changes the next boot only; isolate changes the current state only. A task that says the system must boot into a text console needs set-default.",
  "check": [
   [
    "Which file does systemctl set-default change?",
    "It replaces the /etc/systemd/system/default.target symlink to point to the chosen target."
   ],
   [
    "How do you boot into rescue.target once without changing the default?",
    "Edit the kernel line in the GRUB menu and append systemd.unit=rescue.target, then boot with Ctrl+X."
   ],
   [
    "What is the difference between multi-user.target and graphical.target?",
    "graphical.target includes everything in multi-user.target plus a graphical display manager for login."
   ]
  ]
 },
 {
  "t": "Configuring time service clients with chronyd (/etc/chrony.conf, chronyc sources) and timedatectl",
  "body": [
   "Accurate time matters more than it seems. Logs from different systems must line up during troubleshooting, Kerberos and many TLS (Transport Layer Security) checks fail when clocks drift, and scheduled jobs run at the wrong moment. RHEL keeps time with chrony, an implementation of NTP (Network Time Protocol). The daemon is `chronyd`, configured in `/etc/chrony.conf` and queried with `chronyc`.",
   "The configuration names time sources. A `server` line names one NTP server; a `pool` line names a DNS (Domain Name System) name that resolves to several servers. The `iburst` option sends a quick burst of requests at startup so the clock synchronizes faster. To point a client at a specific server, comment out the default pool line and add your own.",
   "```\n# /etc/chrony.conf\n#pool 2.rhel.pool.ntp.org iburst\nserver classroom.example.com iburst\ndriftfile /var/lib/chrony/drift\nmakestep 1.0 3\n```",
   "After editing, restart the service with `systemctl restart chronyd` and make sure it is enabled. Then check with `chronyc sources -v`. The line beginning with `^*` is the source currently selected for synchronization; `^+` marks acceptable candidates and `^?` means the source is unreachable or not yet evaluated. `chronyc tracking` shows the current offset and stratum.",
   "`timedatectl` is the general tool for clock settings. Plain `timedatectl` shows local time, UTC (Coordinated Universal Time), the time zone, whether NTP is active and whether the clock is synchronized. `timedatectl set-timezone Europe/Berlin` sets the zone (list names with `timedatectl list-timezones`). `timedatectl set-ntp true` enables network time, which on RHEL starts and enables chronyd; `set-ntp false` stops it so you can set the time by hand with `timedatectl set-time`.",
   "```bash\ntimedatectl set-timezone America/New_York\ntimedatectl set-ntp true\nsystemctl restart chronyd\nchronyc sources -v\ntimedatectl        # System clock synchronized: yes\n```",
   "If a source never gets `^*`, check name resolution for the server, network reachability, and that UDP port 123 is not blocked on the path. A client does not need a local firewall opening for NTP, because it initiates the requests."
  ],
  "terms": [
   [
    "NTP",
    "Network Time Protocol, used to synchronize clocks with time servers over the network."
   ],
   [
    "chronyd",
    "The RHEL NTP daemon, configured in /etc/chrony.conf."
   ],
   [
    "iburst",
    "A chrony server option that sends several quick requests at startup to synchronize faster."
   ],
   [
    "timedatectl",
    "A systemd tool to view and set the time, time zone and whether NTP synchronization is on."
   ]
  ],
  "example": "A task asks you to make the system a time client of classroom.example.com. You replace the pool line in /etc/chrony.conf with server classroom.example.com iburst, run systemctl enable chronyd and systemctl restart chronyd, and after a minute chronyc sources shows ^* classroom.example.com.",
  "tip": "In chronyc sources output, the asterisk after the caret marks the source you are actually synchronized to. No asterisk means the configuration is not working yet.",
  "check": [
   [
    "Which line would you add to /etc/chrony.conf to use ntp1.example.com?",
    "server ntp1.example.com iburst, then restart chronyd."
   ],
   [
    "What does timedatectl set-ntp true do on RHEL?",
    "It turns on network time synchronization by enabling and starting chronyd."
   ],
   [
    "In chronyc sources output, what does ^? mean?",
    "The source is unreachable or has not yet been evaluated."
   ]
  ]
 },
 {
  "t": "Installing and updating packages from the Red Hat CDN, a remote repository or the local file system",
  "body": [
   "RHEL installs software as RPM (RPM Package Manager) packages, managed with `dnf`. dnf reads repositories, which are collections of packages plus metadata, resolves dependencies and installs everything needed. Repositories can come from the Red Hat CDN (content delivery network) after registration, from a remote server your organization runs, or from local media such as the installation DVD.",
   "Everyday commands: `dnf install httpd`, `dnf remove httpd`, `dnf update` (or `dnf upgrade`) for all updates, `dnf update kernel` for one package, `dnf search keyword`, `dnf info pkg`, `dnf provides /usr/sbin/semanage` to find which package contains a file, and `dnf list installed`. `dnf repolist` shows enabled repositories and `dnf repolist all` shows disabled ones too. Groups install related sets: `dnf group list` and `dnf group install 'Server'`.",
   "On a registered RHEL system, the CDN repositories, usually BaseOS and AppStream, are configured automatically by subscription-manager in `/etc/yum.repos.d/redhat.repo`. BaseOS holds the core operating system and AppStream holds applications, languages and databases.",
   "Exam systems often have no CDN access, and you are told to use a repository at a given URL. Create a file ending in `.repo` in `/etc/yum.repos.d/`. Each section has an ID in brackets, a `name`, a `baseurl`, `enabled=1` and GPG (GNU Privacy Guard) settings. With `gpgcheck=1` you also give `gpgkey=` pointing at the vendor key; set `gpgcheck=0` only if the task says so.",
   "```ini\n# /etc/yum.repos.d/local.repo\n[BaseOS-local]\nname=BaseOS from DVD\nbaseurl=file:///mnt/dvd/BaseOS\nenabled=1\ngpgcheck=0\n\n[AppStream-local]\nname=AppStream from DVD\nbaseurl=file:///mnt/dvd/AppStream\nenabled=1\ngpgcheck=0\n```",
   "For a remote repository the `baseurl` simply uses the web address you were given instead of `file:///`. `dnf config-manager --add-repo` with that address can generate a basic file for you; check and edit it afterwards. For the DVD, mount the ISO (`mount -o loop rhel.iso /mnt/dvd`), and add an fstab line if it must survive reboot. Run `dnf clean all` and `dnf repolist` to confirm dnf sees the new repositories.",
   "A single package file already on disk installs with `dnf install ./package.rpm`, which still pulls dependencies from enabled repositories. The low-level `rpm` tool queries what is installed: `rpm -qa` lists everything, `rpm -qi pkg` shows details, `rpm -ql pkg` lists files and `rpm -qf /path` names the owning package. Avoid `rpm -i` for installs because it does not resolve dependencies."
  ],
  "terms": [
   [
    "dnf",
    "The RHEL package manager that installs, updates and removes RPM packages and resolves dependencies from repositories."
   ],
   [
    ".repo file",
    "A file in /etc/yum.repos.d/ that defines repositories with an ID, name, baseurl, enabled and gpgcheck settings."
   ],
   [
    "BaseOS and AppStream",
    "The two main RHEL repositories: core operating system packages, and applications and runtimes."
   ],
   [
    "GPG check",
    "Verification of a package's signature against a trusted key before installing it."
   ]
  ],
  "example": "The exam gives you two repository addresses for BaseOS and AppStream. You create /etc/yum.repos.d/exam.repo with two sections, each with a baseurl, enabled=1 and gpgcheck=0 as instructed, then dnf repolist lists both and dnf install -y httpd succeeds.",
  "tip": "A .repo file must end in .repo and each section needs a unique ID in brackets and a baseurl. A typo there makes every later install task fail, so confirm with dnf repolist straight away.",
  "check": [
   [
    "How do you find which package provides the semanage command?",
    "dnf provides semanage (or the full path /usr/sbin/semanage)."
   ],
   [
    "What baseurl form points at a locally mounted DVD?",
    "file:/// followed by the path, such as file:///mnt/dvd/BaseOS."
   ],
   [
    "Why use dnf install ./pkg.rpm instead of rpm -i pkg.rpm?",
    "dnf resolves and installs dependencies from enabled repositories, while rpm -i fails on missing dependencies."
   ]
  ]
 },
 {
  "t": "Registering systems with subscription-manager (Developer subscription)",
  "body": [
   "A RHEL system needs to be registered with Red Hat to receive packages and updates from the Red Hat CDN (content delivery network). Registration ties the machine to a Red Hat account and its subscriptions. For study, the no-cost Red Hat Developer subscription for individuals lets you register personal RHEL systems, so you can practice on the real product rather than a rebuild.",
   "The tool is `subscription-manager`. You register with your Red Hat account username, and it prompts for the password. Organizations with many systems usually use an activation key and an organization ID instead, which avoids typing passwords into scripts.",
   "```bash\nsubscription-manager register --username your_login\nsubscription-manager status\nsubscription-manager repos --list-enabled\ndnf repolist\n```",
   "Red Hat accounts now use simple content access, in which a registered system gets access to the content its account is entitled to without attaching a specific subscription to each machine. Older guides tell you to run `subscription-manager attach --auto`; with simple content access that step is not needed. After registering, the BaseOS and AppStream repositories appear in `/etc/yum.repos.d/redhat.repo`, and `dnf repolist` shows them.",
   "Other useful commands: `subscription-manager repos --enable repo-id` and `--disable repo-id` turn extra repositories on or off; `subscription-manager identity` shows the system's registration identity; `subscription-manager unregister` removes the registration, for example before you retire a VM so it stops counting against your account. The graphical installer and the web console can also register a system.",
   "On the exam you should not expect CDN access; tasks usually provide a repository address instead. Registration is still worth knowing, because the objective lists installing from the Red Hat CDN and because your practice VMs need it for updates. If registration fails, check name resolution and outbound network access, and remember that a system cloned from a registered VM carries the same identity, so unregister and register the clone again."
  ],
  "terms": [
   [
    "subscription-manager",
    "The command-line tool that registers a RHEL system with Red Hat and manages its repositories."
   ],
   [
    "Developer subscription",
    "A no-cost Red Hat subscription for individuals that allows registering RHEL systems for development and learning."
   ],
   [
    "Simple content access",
    "Red Hat's model where a registered system can use entitled content without attaching subscriptions to each machine."
   ],
   [
    "Activation key",
    "A preconfigured key used with an organization ID to register systems without a username and password."
   ]
  ],
  "example": "You install RHEL 10 in a VM for practice. After first boot, dnf repolist shows nothing. You run subscription-manager register --username with your Red Hat Developer login, enter the password, and dnf repolist now shows the BaseOS and AppStream repositories, so dnf update works.",
  "tip": "If dnf repolist is empty on a fresh RHEL install, the system is probably not registered. Registration, not a missing .repo file you wrote, is what provides the CDN repositories.",
  "check": [
   [
    "Which file holds CDN repositories after registration?",
    "/etc/yum.repos.d/redhat.repo, managed by subscription-manager."
   ],
   [
    "Why might you register with an activation key instead of a username?",
    "It avoids putting account passwords into scripts and lets an organization control which content registered systems get."
   ],
   [
    "What should you do before deleting a registered practice VM?",
    "Run subscription-manager unregister so it no longer counts against your account."
   ]
  ]
 },
 {
  "t": "Modifying the boot loader: grubby, /etc/default/grub and grub2-mkconfig",
  "body": [
   "GRUB 2 (GRand Unified Bootloader) is the boot loader on RHEL. It shows the boot menu, loads the chosen kernel and initial RAM disk, and passes the kernel command line. RHEL stores each kernel's menu entry as its own small file in `/boot/loader/entries/`, following the BLS (Boot Loader Specification). Knowing where settings live tells you which tool changes them.",
   "There are two layers of configuration. `/etc/default/grub` holds global settings such as `GRUB_TIMEOUT` (seconds the menu waits) and `GRUB_CMDLINE_LINUX` (default kernel arguments). The generated file `/boot/grub2/grub.cfg` is what GRUB actually reads, and you never edit it by hand; `grub2-mkconfig` rebuilds it from `/etc/default/grub` and scripts in `/etc/grub.d/`. On current RHEL releases the same path is used on both BIOS and UEFI (Unified Extensible Firmware Interface) systems, because the file on the EFI partition just points to it.",
   "```bash\nvim /etc/default/grub            # e.g. GRUB_TIMEOUT=10\ngrub2-mkconfig -o /boot/grub2/grub.cfg\n```",
   "Because kernel arguments are stored in each BLS entry, editing `GRUB_CMDLINE_LINUX` and regenerating does not by default rewrite the arguments of kernels already installed; it affects kernels installed later. To change existing entries too, pass `--update-bls-cmdline` to `grub2-mkconfig`, or, more simply, use `grubby`.",
   "`grubby` edits boot entries directly and is Red Hat's recommended tool for kernel arguments and the default kernel. `grubby --info=ALL` lists every entry with its index, kernel path and arguments. `grubby --default-kernel` shows the default. `grubby --update-kernel=ALL --args='quiet'` adds an argument to every entry and `--remove-args='rhgb'` removes one. Changes take effect at the next boot; confirm afterwards with `cat /proc/cmdline`.",
   "```bash\ngrubby --info=ALL | grep -E '^(index|kernel|args)'\ngrubby --update-kernel=ALL --args='console=ttyS0'\ngrubby --update-kernel=ALL --remove-args='rhgb quiet'\n```",
   "Be careful: a boot loader mistake can make a system unbootable, which on the exam may take other tasks down with it. Make one change at a time, read the output, and keep a working older kernel entry available in the menu as a fallback."
  ],
  "terms": [
   [
    "GRUB 2",
    "The RHEL boot loader that presents the boot menu and loads the kernel with its command line."
   ],
   [
    "/etc/default/grub",
    "The file of global GRUB settings such as GRUB_TIMEOUT and GRUB_CMDLINE_LINUX, applied by grub2-mkconfig."
   ],
   [
    "grub2-mkconfig",
    "Regenerates /boot/grub2/grub.cfg from /etc/default/grub and /etc/grub.d scripts."
   ],
   [
    "grubby",
    "A tool that reads and edits boot entries directly, including default kernel and kernel arguments."
   ]
  ],
  "example": "You must make the boot menu wait 10 seconds. You set GRUB_TIMEOUT=10 in /etc/default/grub and run grub2-mkconfig -o /boot/grub2/grub.cfg. On reboot the menu counts down from 10 before starting the default kernel.",
  "tip": "Menu settings like the timeout need /etc/default/grub plus grub2-mkconfig. Per-kernel arguments are easiest with grubby, which updates existing entries immediately.",
  "check": [
   [
    "Why should you not edit /boot/grub2/grub.cfg directly?",
    "It is generated by grub2-mkconfig, so manual edits are overwritten the next time it is rebuilt."
   ],
   [
    "Which command adds a kernel argument to every installed kernel?",
    "grubby --update-kernel=ALL --args='argument'."
   ],
   [
    "How can you confirm the arguments the running kernel booted with?",
    "cat /proc/cmdline."
   ]
  ]
 },
 {
  "t": "Choosing the default kernel and adding or removing kernel arguments",
  "body": [
   "RHEL keeps several kernels installed at once, so a bad update never leaves you without a working one. By default, dnf keeps a limited number of kernel versions and removes the oldest when a new one arrives. The default boot entry is normally the newest kernel, but you may need to boot an older one permanently, for example while a driver problem in the new kernel is investigated.",
   "Start by seeing what is installed: `rpm -q kernel` lists kernel packages and `grubby --info=ALL` lists boot entries with their index numbers and kernel paths. `grubby --default-kernel` prints the default kernel path, and `grubby --default-index` prints its menu position, counting from 0.",
   "To change the default permanently, give `grubby` the kernel path or an index. The setting is stored as the saved entry in the GRUB environment block, and `uname -r` confirms which kernel is running after reboot.",
   "```bash\ngrubby --info=ALL | grep -E '^(index|kernel)'\ngrubby --set-default /boot/vmlinuz-<older-version>\n# or: grubby --set-default-index=1\ngrubby --default-kernel\nreboot\nuname -r\n```",
   "Kernel arguments tune the kernel at boot. Examples you may meet include `quiet` and `rhgb` (reduce messages and show a graphical boot splash), `console=` to send output to a serial console, `systemd.unit=rescue.target` for recovery, and `crashkernel=` to reserve memory for crash dumps. Add or remove them with `--args` and `--remove-args`. `--update-kernel` accepts `ALL`, `DEFAULT`, or a specific kernel path.",
   "```bash\ngrubby --update-kernel=DEFAULT --args='audit=1'\ngrubby --update-kernel=ALL --remove-args='quiet'\ngrubby --info=DEFAULT | grep args\n```",
   "Distinguish permanent from one-time changes. Arguments added with grubby persist. Arguments typed at the GRUB menu after pressing e apply to that boot only, which is exactly what you want for recovery tasks such as booting into `rescue.target` or `rd.break`. Always check the result with `cat /proc/cmdline` after rebooting."
  ],
  "terms": [
   [
    "Kernel argument",
    "An option on the kernel command line that changes kernel or systemd behavior at boot."
   ],
   [
    "grubby --set-default",
    "Sets the default boot entry by kernel path, persisting across reboots."
   ],
   [
    "uname -r",
    "Prints the release of the currently running kernel."
   ],
   [
    "/proc/cmdline",
    "A virtual file showing the command line the running kernel was booted with."
   ]
  ],
  "example": "After an update, a storage driver misbehaves on the newest kernel. You list entries with grubby --info=ALL, run grubby --set-default on the previous kernel's vmlinuz path, reboot, and uname -r shows the older version while the new kernel stays installed for later testing.",
  "tip": "Edits made at the GRUB menu with e last for one boot only. If a task says persistent, use grubby (or /etc/default/grub with grub2-mkconfig) and verify after a reboot.",
  "check": [
   [
    "How do you see which kernel will boot by default?",
    "grubby --default-kernel (or --default-index for its position)."
   ],
   [
    "Which command removes the quiet argument from every kernel?",
    "grubby --update-kernel=ALL --remove-args='quiet'."
   ],
   [
    "What is the difference between adding an argument at the GRUB menu and with grubby?",
    "The GRUB menu edit applies only to that boot; grubby changes the stored entry so it persists."
   ]
  ]
 },
 {
  "t": "Configuring static and DHCP IPv4 and IPv6 addresses with nmcli (ipv4.method manual/auto, ipv4.addresses, ipv4.gateway)",
  "body": [
   "RHEL manages networking with NetworkManager, and `nmcli` is its command-line interface. NetworkManager separates devices (physical or virtual interfaces such as `enp1s0`) from connections (saved configuration profiles). A device can have several connection profiles, only one active at a time. Almost every exam network task is: modify or create a connection, then activate it.",
   "`nmcli device status` shows devices and which connection each uses. `nmcli connection show` (short: `nmcli con show`) lists profiles, and `nmcli con show name` prints every property. Properties use a `setting.property` naming style, such as `ipv4.method`, `ipv4.addresses`, `ipv4.gateway` and `ipv4.dns`.",
   "`ipv4.method auto` means DHCP (Dynamic Host Configuration Protocol): the address, gateway and DNS come from a server. `ipv4.method manual` means static: you supply the address in CIDR (Classless Inter-Domain Routing) form, such as `192.168.10.20/24`, and usually a gateway and DNS servers. IPv6 is parallel: `ipv6.method auto` uses router advertisements and DHCPv6, `manual` takes `ipv6.addresses` like `fd00:10::20/64`, and `disabled` turns IPv6 off.",
   "```bash\nnmcli con add con-name static1 ifname enp1s0 type ethernet \\\n  ipv4.method manual ipv4.addresses 192.168.10.20/24 \\\n  ipv4.gateway 192.168.10.1 ipv4.dns 192.168.10.1 \\\n  ipv6.method manual ipv6.addresses fd00:10::20/64\nnmcli con up static1\n```",
   "To change an existing profile, use `nmcli con mod`. Changes are saved at once but do not reach the running interface until you reactivate the connection with `nmcli con up name`. That is the most common reason a change seems not to work. To add an extra address instead of replacing the list, prefix the property with a plus: `nmcli con mod static1 +ipv4.addresses 10.0.0.5/24`; a minus removes one.",
   "```bash\nnmcli con mod 'Wired connection 1' ipv4.method auto   # back to DHCP\nnmcli con mod static1 ipv4.addresses 192.168.10.30/24\nnmcli con up static1\nip addr show enp1s0\n```",
   "Order matters when switching to manual: setting `ipv4.method manual` with no address is rejected, so give the method and address in the same command. When switching back to auto, clear stale static values with empty strings, for example `ipv4.addresses ''` and `ipv4.gateway ''`, so they are not added on top of the DHCP lease. Tab completion works for nmcli properties and saves typing."
  ],
  "terms": [
   [
    "NetworkManager",
    "The RHEL service that configures and manages network interfaces using connection profiles."
   ],
   [
    "Connection profile",
    "A saved set of network settings that NetworkManager applies to a device when activated."
   ],
   [
    "ipv4.method",
    "The property that selects auto (DHCP), manual (static), link-local or disabled addressing."
   ],
   [
    "CIDR notation",
    "An address followed by a slash and prefix length, such as 192.168.10.20/24, giving address and netmask together."
   ]
  ],
  "example": "The exam says to give serverb the static address 172.25.250.11/24, gateway 172.25.250.254 and DNS 172.25.250.254 on its existing connection. You run one nmcli con mod command setting ipv4.method manual with the address, gateway and DNS, then nmcli con up, and ip addr and ip route show the new values.",
  "tip": "nmcli con mod saves the profile but does not apply it. Always follow with nmcli con up (and be aware this can drop an SSH session if the address changes).",
  "check": [
   [
    "Which ipv4.method value means DHCP?",
    "auto."
   ],
   [
    "How do you add a second IPv4 address without removing the first?",
    "nmcli con mod name +ipv4.addresses address/prefix, then reactivate the connection."
   ],
   [
    "You changed the address with nmcli con mod but ip addr shows the old one. Why?",
    "The profile is saved but not reapplied; run nmcli con up name to activate it."
   ]
  ]
 },
 {
  "t": "NetworkManager keyfiles in /etc/NetworkManager/system-connections/ (RHEL 10 no longer uses ifcfg files)",
  "body": [
   "NetworkManager stores each connection profile as a file. For many years RHEL used the ifcfg format, shell-style files in `/etc/sysconfig/network-scripts/`. RHEL 10 no longer supports that format: profiles are keyfiles, INI-style text files in `/etc/NetworkManager/system-connections/`, named after the connection with a `.nmconnection` extension. Older study guides that tell you to edit `ifcfg-eth0` do not apply.",
   "A keyfile has sections in brackets that match nmcli setting names: `[connection]`, `[ethernet]`, `[ipv4]`, `[ipv6]`. Addresses are listed as `address1=`, `address2=` and so on, each in CIDR form, optionally followed by a comma and the gateway. DNS servers are a semicolon-separated list.",
   "```ini\n# /etc/NetworkManager/system-connections/static1.nmconnection\n[connection]\nid=static1\nuuid=0c8f...e21a\ntype=ethernet\ninterface-name=enp1s0\nautoconnect=true\n\n[ipv4]\nmethod=manual\naddress1=192.168.10.20/24,192.168.10.1\ndns=192.168.10.1;\n\n[ipv6]\nmethod=auto\n```",
   "The recommended way to create and change these files is still `nmcli` or `nmtui`, which validate your values and write the file for you. Reading the file is still useful: it shows at a glance what a profile contains and is a clean way to back up or copy network configuration.",
   "If you edit a keyfile by hand, two rules apply. First, it must be owned by root with mode 600; NetworkManager ignores keyfiles that other users can read, because they can contain secrets such as Wi-Fi or VPN (virtual private network) passwords. Second, NetworkManager does not notice the edit on its own. Run `nmcli con reload` (or `nmcli con load /path/file`) so it rereads the file, then `nmcli con up id` to apply it.",
   "```bash\nchmod 600 /etc/NetworkManager/system-connections/static1.nmconnection\nnmcli con reload\nnmcli con up static1\n```",
   "Profiles that exist only in memory, for example ones generated at boot for DHCP on a new interface, may live under `/run/NetworkManager/system-connections/` and vanish on reboot. Once you modify such a profile with nmcli it is written to `/etc`, which makes it persistent."
  ],
  "terms": [
   [
    "Keyfile",
    "NetworkManager's INI-style profile format, stored as .nmconnection files in /etc/NetworkManager/system-connections/."
   ],
   [
    "ifcfg file",
    "The legacy shell-style network configuration format in /etc/sysconfig/network-scripts/, not supported in RHEL 10."
   ],
   [
    "nmcli con reload",
    "Tells NetworkManager to reread connection files from disk after manual edits."
   ],
   [
    "address1=",
    "The keyfile key for the first static address in CIDR form, optionally followed by a comma and the gateway."
   ]
  ],
  "example": "You copy a working profile to a new VM, but NetworkManager does not list it. ls -l shows the file is mode 644. After chmod 600, chown root:root and nmcli con reload, the connection appears in nmcli con show and activates with nmcli con up.",
  "tip": "Hand-edited keyfiles need mode 600 and root ownership, and a reload. If a question mentions ifcfg files for RHEL 10, the answer is that keyfiles in /etc/NetworkManager/system-connections replaced them.",
  "check": [
   [
    "Where does RHEL 10 store persistent connection profiles?",
    "As .nmconnection keyfiles in /etc/NetworkManager/system-connections/."
   ],
   [
    "Why might NetworkManager ignore a keyfile you copied in?",
    "Its permissions are too open or it is not owned by root; keyfiles must be root-owned with mode 600."
   ],
   [
    "What must you run after editing a keyfile by hand?",
    "nmcli con reload (or nmcli con load file), then nmcli con up to apply the profile."
   ]
  ]
 },
 {
  "t": "Bringing connections up and down and making them autoconnect (nmcli con up, connection.autoconnect)",
  "body": [
   "A NetworkManager connection profile does nothing until it is activated on a device. `nmcli con up name` activates a profile, applying its addresses, routes and DNS. `nmcli con down name` deactivates it. Because only one profile can be active on a device at a time, bringing up a second profile on the same interface replaces the first.",
   "Activation is also how you apply changes. After `nmcli con mod`, the stored profile is updated but the live interface keeps its old settings until you run `nmcli con up` again. There is also `nmcli device reapply enp1s0`, which applies some changes to the active connection without a full down and up.",
   "Whether a profile activates at boot is controlled by `connection.autoconnect`. When it is yes (the default for new profiles), NetworkManager brings it up automatically at boot and when the device becomes available. Set it to no for profiles you only want to use by hand, and yes for the profile the system must use after reboot. `connection.autoconnect-priority` breaks ties when several autoconnect profiles match the same device; the higher number wins.",
   "```bash\nnmcli con mod static1 connection.autoconnect yes\nnmcli con mod 'Wired connection 1' connection.autoconnect no\nnmcli -f NAME,DEVICE,AUTOCONNECT con show\nnmcli con up static1\n```",
   "`nmcli con down` and `nmcli device disconnect` look similar but differ. `con down` deactivates the profile, but NetworkManager may autoconnect a profile again later, for example on the next boot. `device disconnect enp1s0` deactivates the device and stops NetworkManager from automatically activating anything on it until you bring a connection up or the system restarts.",
   "Be careful when working over SSH: taking down the connection you are logged in through cuts your session. On the exam, make network changes from the console, or chain the commands so the change completes even if the session drops. After every change, verify with `nmcli con show --active`, `ip addr` and `ip route`, and ideally reboot once at the end to prove the right profile comes up on its own."
  ],
  "terms": [
   [
    "nmcli con up",
    "Activates a connection profile on its device, applying its current settings."
   ],
   [
    "connection.autoconnect",
    "A profile property that makes NetworkManager activate it automatically at boot and when the device appears."
   ],
   [
    "autoconnect-priority",
    "A number that decides which of several autoconnect profiles wins for a device; higher wins."
   ],
   [
    "nmcli device disconnect",
    "Deactivates a device and prevents automatic reactivation until a connection is brought up manually or the system restarts."
   ]
  ],
  "example": "A server has two profiles for enp1s0: the installer's DHCP profile and your static one. After reboot it keeps coming up with the DHCP address. You set connection.autoconnect no on the DHCP profile and yes on the static profile, bring up the static profile, and the next reboot comes up static.",
  "tip": "If the wrong settings come back after reboot, look for another autoconnect profile on the same device. Either delete it, set autoconnect to no, or raise the priority of the one you want.",
  "check": [
   [
    "What property makes a profile activate at boot?",
    "connection.autoconnect set to yes."
   ],
   [
    "You modified a profile; how do you apply the changes to the live interface?",
    "Run nmcli con up name (or nmcli device reapply for some changes)."
   ],
   [
    "Two autoconnect profiles match the same device. How do you choose which one wins?",
    "Set a higher connection.autoconnect-priority on the preferred one, or disable autoconnect on the other."
   ]
  ]
 },
 {
  "t": "Configuring hostname resolution: hostnamectl, /etc/hosts, ipv4.dns and /etc/resolv.conf",
  "body": [
   "Two related jobs fall under this objective: giving the machine its own name, and making it able to turn names into addresses. Both are routine exam tasks, and a system that cannot resolve names will make later tasks such as NFS mounts, time sync and repositories fail.",
   "The static hostname is stored in `/etc/hostname` and set with `hostnamectl set-hostname server1.example.com`, which updates the file and the running system at once, so no reboot is needed. Run `hostnamectl` or `hostname` to check. Use the fully qualified domain name (FQDN) when the task gives one.",
   "Name resolution uses sources listed on the `hosts:` line in `/etc/nsswitch.conf`, normally `files` first and then `dns`. `files` means `/etc/hosts`, a simple list of address followed by names and aliases. Entries there take effect immediately and override DNS for those names, which is handy in labs and small setups.",
   "```\n# /etc/hosts\n127.0.0.1      localhost localhost.localdomain\n192.168.10.20  server1.example.com server1\n192.168.10.30  server2.example.com server2\n```",
   "DNS (Domain Name System) servers are listed in `/etc/resolv.conf` as `nameserver` lines, and `search` lists domains appended to short names. On RHEL, NetworkManager writes this file from the active connections, so hand edits are overwritten when a connection comes up. Configure DNS on the connection instead.",
   "```bash\nnmcli con mod static1 ipv4.dns '192.168.10.1 192.168.10.2'\nnmcli con mod static1 ipv4.dns-search example.com\nnmcli con mod static1 ipv4.ignore-auto-dns yes   # with DHCP, use only these\nnmcli con up static1\ncat /etc/resolv.conf\n```",
   "With DHCP, the server usually provides DNS servers too; `ipv4.ignore-auto-dns yes` makes the profile use only the servers you listed. Use `+ipv4.dns` to add a server to the existing list. After any change, test with `getent hosts name`, which uses the same lookup order as applications, including `/etc/hosts`."
  ],
  "terms": [
   [
    "hostnamectl",
    "The tool that shows and sets the system hostname, writing the static name to /etc/hostname."
   ],
   [
    "/etc/hosts",
    "A local file of address-to-name mappings consulted before DNS by default."
   ],
   [
    "/etc/resolv.conf",
    "The resolver file listing nameserver and search domains, generated by NetworkManager on RHEL."
   ],
   [
    "ipv4.dns",
    "The NetworkManager connection property holding DNS server addresses for that profile."
   ]
  ],
  "example": "You set the hostname with hostnamectl set-hostname servera.lab.example.com, then add DNS 172.25.250.254 with nmcli con mod on the active connection and reactivate it. /etc/resolv.conf now lists that nameserver, and getent hosts classroom.lab.example.com returns an address.",
  "tip": "Do not fix DNS by editing /etc/resolv.conf directly on RHEL; NetworkManager rewrites it. Set ipv4.dns on the connection and bring it up again.",
  "check": [
   [
    "Which command permanently sets the hostname without a reboot?",
    "hostnamectl set-hostname name."
   ],
   [
    "Which file decides whether /etc/hosts is checked before DNS?",
    "/etc/nsswitch.conf, on its hosts: line."
   ],
   [
    "Why do your manual edits to /etc/resolv.conf disappear?",
    "NetworkManager regenerates it from connection DNS settings; configure ipv4.dns with nmcli instead."
   ]
  ]
 },
 {
  "t": "Checking addresses, routes and name resolution: ip addr, ip route, ping, getent hosts",
  "body": [
   "When networking misbehaves, test layer by layer: does the interface have the right address, does the system know where to send traffic, can it reach the next hop and the destination, and can it resolve names? A handful of commands answer each question, and they are the same ones you use to verify your own exam work.",
   "`ip addr` (short `ip a`) lists interfaces and their addresses. Look for `state UP`, the `inet` line with the IPv4 address and prefix, and `inet6` lines for IPv6. `ip link` shows only link state and MAC (media access control) addresses. A missing address usually means the connection profile is not active or is set incorrectly.",
   "`ip route` (short `ip r`) shows the routing table. The `default via` line is the default gateway, used for anything not on a local network. Directly connected networks appear as `proto kernel` routes. `ip -6 route` shows IPv6 routes, and `ip route get 8.8.8.8` shows which route and interface a specific destination would use.",
   "```bash\nip -br addr                # brief: one line per interface\nip route\n# default via 192.168.10.1 dev enp1s0 proto static metric 100\nping -c 3 192.168.10.1     # gateway reachable?\nping -c 3 server2          # name + reachability\ngetent hosts server2       # resolution only\nss -tlnp                   # listening TCP ports\n```",
   "`ping` sends ICMP (Internet Control Message Protocol) echo requests. Always use `-c` to set a count, or it runs until Ctrl+C. Ping the gateway first, then a remote address, then a name. If the address works but the name does not, the problem is resolution, not connectivity. Note that some hosts and firewalls drop ICMP, so a failed ping is a clue, not proof.",
   "`getent hosts name` resolves a name exactly as applications do, following `/etc/nsswitch.conf`: `/etc/hosts` first, then DNS. Tools like `dig` and `host` (from the bind-utils package) query DNS servers directly and skip `/etc/hosts`, which is useful for testing DNS itself but can mislead you about what applications see.",
   "Finally, `ss -tulpn` lists listening TCP and UDP sockets with the owning process, which tells you whether a service is actually listening before you blame the firewall."
  ],
  "terms": [
   [
    "ip addr",
    "Shows network interfaces with their state and IPv4 and IPv6 addresses."
   ],
   [
    "Default gateway",
    "The router that receives traffic for destinations not on a directly connected network, shown as default via in ip route."
   ],
   [
    "getent hosts",
    "Resolves a name using the system's configured order (nsswitch), including /etc/hosts and DNS."
   ],
   [
    "ICMP",
    "Internet Control Message Protocol, used by ping for echo requests and replies."
   ]
  ],
  "example": "A server cannot install packages from the repository host. ip addr shows the right address, ping to the gateway works, ping to the repository's IP works, but getent hosts on its name returns nothing. The issue is name resolution, so you fix ipv4.dns on the connection instead of touching routes.",
  "tip": "getent hosts shows what applications will resolve; dig and host bypass /etc/hosts. Pick the tool that matches the question being asked.",
  "check": [
   [
    "Which line in ip route output shows the default gateway?",
    "The line starting with default via, followed by the gateway address and interface."
   ],
   [
    "Ping to an IP address works but ping to its name fails. Where is the problem?",
    "In name resolution: /etc/hosts, DNS server settings or the DNS server itself."
   ],
   [
    "Why can dig give a different answer from getent hosts?",
    "dig queries DNS directly and ignores /etc/hosts and nsswitch order, while getent uses the same lookup path as applications."
   ]
  ]
 },
 {
  "t": "Configuring network services to start automatically at boot",
  "body": [
   "A network service is only useful if it is listening when clients arrive, including after a reboot. On RHEL, making a network service start at boot involves the same systemd commands as any service, plus two network-specific checks: the network connection itself must come up automatically, and clients must be allowed through the firewall.",
   "Step one is the service unit. After installing a package such as httpd, vsftpd or nfs-utils, the service is usually installed but disabled. Run `systemctl enable --now httpd` so it starts now and at every boot, then confirm with `systemctl is-enabled httpd` and `systemctl is-active httpd`. `ss -tlnp` confirms that the process is listening on the expected port.",
   "Step two is the network itself. NetworkManager must be enabled (it is by default) and the connection profile must have `connection.autoconnect yes`. Check with `systemctl is-enabled NetworkManager` and `nmcli -f NAME,AUTOCONNECT con show`. A service can be enabled perfectly and still be unreachable after reboot because the interface did not come up with the right address.",
   "Step three is access. Open the service in firewalld permanently, for example `firewall-cmd --permanent --add-service=http` followed by `firewall-cmd --reload`. If the service uses a non-standard port, SELinux may also need a port label, which is covered in the SELinux lessons.",
   "```bash\ndnf install -y httpd\nsystemctl enable --now httpd\nfirewall-cmd --permanent --add-service=http\nfirewall-cmd --reload\nsystemctl is-enabled httpd NetworkManager\nss -tlnp | grep ':80'\n```",
   "Some services need to wait until the network is fully configured, not just until NetworkManager has started. Units that need this order themselves after `network-online.target`; NetworkManager provides that target through its wait-online service. Most packaged services already handle this, but it explains why `_netdev` exists for network mounts and why a custom unit that binds to a specific address might start too early.",
   "The final and most reliable test is a reboot. After it, check the service status, the listening port, the interface address and a connection from another host."
  ],
  "terms": [
   [
    "enable --now",
    "Enables a unit to start at boot and starts it immediately."
   ],
   [
    "network-online.target",
    "A systemd target reached when the network is fully configured, used to order services that need working networking."
   ],
   [
    "ss -tlnp",
    "Lists listening TCP sockets with numeric ports and the owning processes."
   ],
   [
    "Permanent firewall rule",
    "A firewalld change saved with --permanent so it survives reloads and reboots."
   ]
  ],
  "example": "You set up vsftpd and it works, but after the grader's reboot clients cannot connect. systemctl is-enabled vsftpd prints disabled. Running systemctl enable --now vsftpd and adding the ftp service to the firewall with --permanent and --reload makes it survive the next reboot.",
  "tip": "For network services, check three things before calling a task done: the service is enabled, the connection autoconnects, and the firewall rule is permanent. Then reboot and test.",
  "check": [
   [
    "Which two systemctl checks confirm a service will run after reboot and is running now?",
    "systemctl is-enabled for boot and systemctl is-active for current state."
   ],
   [
    "The service is enabled but unreachable after reboot. Name two network causes.",
    "The connection profile did not autoconnect or came up with the wrong address, or the firewall rule was runtime-only."
   ],
   [
    "What is network-online.target for?",
    "It marks when networking is fully configured, so services that need a working network can be ordered after it."
   ]
  ]
 },
 {
  "t": "Restricting network access with firewalld and firewall-cmd (services, ports, zones, --permanent, --reload)",
  "body": [
   "A host firewall decides which incoming network connections reach services on the machine. RHEL uses firewalld, a service that manages the kernel's packet filtering (nftables) for you. You describe what to allow in terms of zones, services and ports, and firewalld builds the low-level rules. `firewall-cmd` is the command-line client, and firewalld must be running for it to work (`systemctl enable --now firewalld`).",
   "A zone is a trust level with its own set of allowed services. Each network interface belongs to one zone, and the default zone, normally `public`, applies to interfaces not assigned elsewhere. The `public` zone allows little besides SSH, DHCPv6 client and, on RHEL, cockpit (the web console) traffic by default. Anything not allowed in the zone is rejected.",
   "A service is a named definition of ports and protocols, such as `http` (TCP 80), `https` (TCP 443), `nfs` or `ssh`. List them with `firewall-cmd --get-services`. When a program uses a port without a service definition, or a non-standard port, open the port itself with the form `port/protocol`, such as `8080/tcp`.",
   "```bash\nfirewall-cmd --get-default-zone\nfirewall-cmd --list-all                   # rules in the default zone\nfirewall-cmd --permanent --add-service=http\nfirewall-cmd --permanent --add-port=8080/tcp\nfirewall-cmd --permanent --remove-service=cockpit\nfirewall-cmd --reload\nfirewall-cmd --list-all\n```",
   "The key idea is runtime versus permanent. Without `--permanent`, a change affects the running firewall immediately but is lost at reload or reboot. With `--permanent`, the change is saved to configuration but does not apply until `firewall-cmd --reload`. The usual exam pattern is to add rules with `--permanent`, then reload. Alternatively, make runtime changes, test them, and save everything with `firewall-cmd --runtime-to-permanent`.",
   "Add `--zone=name` to work on a zone other than the default. `firewall-cmd --get-active-zones` shows which zones are in use and by which interfaces. Always finish by checking `firewall-cmd --list-all` after the reload, because that shows the runtime state, which after a reload equals the permanent state.",
   "Remember that the firewall is one of several gates. A client may still be blocked by the service not listening, by SELinux or by the service's own access settings. When a service works locally but not remotely, the firewall is the first thing to check."
  ],
  "terms": [
   [
    "firewalld",
    "The RHEL firewall service that manages packet filtering rules through zones, services and ports."
   ],
   [
    "Zone",
    "A named trust level holding allowed services and ports, applied to interfaces or source addresses."
   ],
   [
    "--permanent",
    "Saves a firewall-cmd change to configuration without applying it until a reload."
   ],
   [
    "--reload",
    "Reloads firewalld so the permanent configuration becomes the running configuration, discarding runtime-only changes."
   ]
  ],
  "example": "A web server must accept HTTP and a management app on TCP 8443. You run firewall-cmd --permanent --add-service=http and --permanent --add-port=8443/tcp, then firewall-cmd --reload. --list-all shows services including http and ports 8443/tcp, and a browser on another machine can reach both.",
  "tip": "A --permanent change without --reload does nothing yet; a change without --permanent is gone after the next reload or reboot. The exam grader reboots, so permanent plus reload is the safe pattern.",
  "check": [
   [
    "What happens to a rule added without --permanent when firewalld reloads?",
    "It is lost, because reload replaces the runtime configuration with the permanent one."
   ],
   [
    "How do you open TCP port 8080 permanently in the default zone?",
    "firewall-cmd --permanent --add-port=8080/tcp, then firewall-cmd --reload."
   ],
   [
    "Which command shows the running rules for the default zone?",
    "firewall-cmd --list-all."
   ]
  ]
 },
 {
  "t": "Using nmtui as a text-based alternative to nmcli",
  "body": [
   "`nmtui` (NetworkManager text user interface) is a menu-driven program for the same tasks you do with nmcli. It runs in any terminal, uses the arrow keys, Tab, Enter and the space bar, and writes the same keyfiles as nmcli. Under exam time pressure, many people find it quicker and less error-prone for one-off changes, because every field is labeled and nothing needs exact property names. It comes from the NetworkManager-tui package, which may need installing.",
   "The main menu offers three choices. Edit a connection lets you add, change or delete connection profiles. Activate a connection lets you bring profiles up or down. Set system hostname sets the static hostname, like `hostnamectl set-hostname`. You can jump straight to one with `nmtui edit`, `nmtui connect` or `nmtui hostname`, optionally naming a connection, as in `nmtui edit static1`.",
   "When editing a profile, the IPv4 CONFIGURATION line has a setting such as Automatic or Manual. Choose Manual, then select Show to expand the fields for Addresses, Gateway, DNS servers and Search domains. Enter addresses in CIDR form, such as `192.168.10.20/24`. Below that are check boxes including Automatically connect, which maps to `connection.autoconnect`, and the same settings exist for IPv6.",
   "The one trap is activation. Saving in nmtui writes the profile, but, just as with `nmcli con mod`, the running interface may keep its old settings. After saving, go to Activate a connection and deactivate then activate the profile, or run `nmcli con up name` from the shell.",
   "```bash\ndnf install -y NetworkManager-tui\nnmtui edit 'Wired connection 1'   # change settings, OK\nnmcli con up 'Wired connection 1'  # apply them\nip addr; ip route; cat /etc/resolv.conf\n```",
   "Use whichever tool you are faster and more accurate with, but know both. nmtui is great interactively; nmcli is scriptable, works over any connection and is easier to verify with `nmcli con show`. Either way, verify the result with `ip addr`, `ip route` and a test connection, and confirm the profile has autoconnect enabled so it survives the reboot."
  ],
  "terms": [
   [
    "nmtui",
    "A text-based, menu-driven NetworkManager interface for editing connections, activating them and setting the hostname."
   ],
   [
    "NetworkManager-tui",
    "The package that provides the nmtui command."
   ],
   [
    "Automatically connect",
    "The nmtui check box that sets connection.autoconnect for a profile."
   ],
   [
    "Activate a connection",
    "The nmtui menu for bringing profiles up or down so saved changes take effect."
   ]
  ],
  "example": "On the exam console you need a static address, gateway, DNS and hostname. You run nmtui, set IPv4 to Manual with the values, tick Automatically connect, save, reactivate the profile under Activate a connection, then set the hostname from the third menu option, and verify with ip addr and hostnamectl.",
  "tip": "nmtui saves the profile but may not apply it; deactivate and reactivate the connection afterwards, exactly as you would run nmcli con up after nmcli con mod.",
  "check": [
   [
    "What three tasks does the nmtui main menu offer?",
    "Edit a connection, activate a connection, and set the system hostname."
   ],
   [
    "You saved new settings in nmtui but ip addr shows the old address. What do you do?",
    "Reactivate the connection in nmtui's Activate menu or with nmcli con up."
   ],
   [
    "Do nmtui and nmcli store configuration differently?",
    "No; both use NetworkManager and write the same keyfiles in /etc/NetworkManager/system-connections/."
   ]
  ]
 },
 {
  "t": "Creating, deleting and modifying local user accounts (useradd -u -G -s -c, usermod, userdel -r)",
  "body": [
   "Local user accounts are defined in files on the system itself, as opposed to accounts from a central directory. RHCSA tasks ask you to create users with specific properties, change them later and remove them cleanly. The three tools are `useradd`, `usermod` and `userdel`, and they share most of their options.",
   "`useradd name` creates the account with defaults: the next free UID (user ID) from 1000 up, a private group with the same name, a home directory under `/home` copied from `/etc/skel`, and the default shell `/bin/bash`. The account has no usable password until you set one with `passwd`. Options override the defaults.",
   "```bash\nuseradd -u 2001 -G wheel,devs -s /bin/bash -c 'Alice Ng' alice\npasswd alice\nid alice\n# uid=2001(alice) gid=2001(alice) groups=2001(alice),10(wheel),1005(devs)\n```",
   "Key options: `-u` sets the UID, `-g` sets the primary group (which must exist), `-G` sets a comma-separated list of supplementary groups, `-s` sets the login shell, `-c` sets the comment field (usually the full name), `-d` sets the home directory and `-m` or `-M` forces or skips creating it. System accounts for services use `-r`, which picks a UID below 1000 and skips the home directory.",
   "`usermod` changes an existing account with the same letters: `usermod -s /sbin/nologin alice`, `usermod -c 'New Name' alice`, `usermod -u 3001 alice`. The option people get wrong is `-G`. On its own, `usermod -G devs alice` replaces all of alice's supplementary groups with just devs. To add a group while keeping the others, use `-aG`, meaning append. Other useful options: `-l` renames the login, and `-d newhome -m` moves the home directory.",
   "`userdel name` removes the account but leaves the home directory and mail spool, which then belong to a UID that no longer has a name. `userdel -r name` also removes the home directory and mail spool. Files the user owned elsewhere remain; find them with `find / -nouser` and reassign or remove them. A later user given the same UID would own them, which is why deleting properly matters.",
   "Always verify with `id user` and `getent passwd user`. Changes to group membership apply to new logins, so a user who is already logged in must log out and back in to get a new group."
  ],
  "terms": [
   [
    "UID",
    "User ID, the number the kernel uses to identify a user; regular users start at 1000 on RHEL."
   ],
   [
    "Primary group",
    "The group assigned to new files a user creates, set with -g and stored in /etc/passwd."
   ],
   [
    "Supplementary group",
    "An additional group membership that grants group permissions, set with -G."
   ],
   [
    "usermod -aG",
    "Appends supplementary groups to a user without removing existing ones."
   ]
  ],
  "example": "A task asks for user harry with UID 3000, comment Harry Potter, and membership in the sysadmins group. You run useradd -u 3000 -c 'Harry Potter' -G sysadmins harry, then set his password, and id harry shows uid=3000 with sysadmins among his groups.",
  "tip": "usermod -G without -a replaces every supplementary group. When a task says add a user to a group, use usermod -aG group user.",
  "check": [
   [
    "What does userdel -r do that plain userdel does not?",
    "It also deletes the user's home directory and mail spool."
   ],
   [
    "Which option sets a user's supplementary groups at creation?",
    "-G followed by a comma-separated list of groups."
   ],
   [
    "After usermod -aG devs bob, bob still cannot use the devs group in his open session. Why?",
    "Group membership is read at login; bob must log out and back in."
   ]
  ]
 },
 {
  "t": "Non-interactive shells for service accounts (/sbin/nologin)",
  "body": [
   "Not every account is for a person. Services such as web servers, databases and backup jobs run as their own users so that a compromise of one service does not hand over the whole system. Those accounts should own files and run processes, but nobody should be able to log in as them. Giving them a non-interactive shell is the standard way to enforce that.",
   "The shell is the last field of an account's line in `/etc/passwd`, and it is the program started when the user logs in. Set it to `/sbin/nologin` and any interactive login, whether at the console, over SSH or with `su -`, starts nologin instead. That program prints a short message, by default This account is currently not available, and exits. On RHEL, `/sbin` is a link to `/usr/sbin`, so `/usr/sbin/nologin` is the same file.",
   "```bash\nuseradd -r -s /sbin/nologin -c 'Backup service' backupsvc\nusermod -s /sbin/nologin sarah       # existing account\ngetent passwd sarah\n# sarah:x:1003:1003::/home/sarah:/sbin/nologin\nsu - sarah\n# This account is currently not available.\n```",
   "Understand the limits. nologin blocks shells, not everything. A user with `/sbin/nologin` may still authenticate to services that do not start a shell, such as some FTP or mail setups, and root can still run commands as that user with `sudo -u` or `runuser`. SSH port forwarding might still be possible depending on server settings. If an account must not authenticate at all, also lock it or expire it.",
   "A related tool is `/bin/false`, which simply exits with failure and prints nothing. It also blocks interactive logins, but nologin is preferred on RHEL because it explains why the login failed. Exam tasks that say the user must not have an interactive shell expect `/sbin/nologin`.",
   "The list of valid login shells is in `/etc/shells`. Some services, such as certain FTP servers, refuse users whose shell is not listed there, which is worth knowing if a service account unexpectedly cannot authenticate. You can check any user's shell with `getent passwd user` or by looking at the last field."
  ],
  "terms": [
   [
    "Service account",
    "An account used by a program rather than a person, typically created with useradd -r."
   ],
   [
    "/sbin/nologin",
    "A shell that politely refuses interactive login, used to block logins for service accounts."
   ],
   [
    "Login shell",
    "The program started when a user logs in, stored in the last field of /etc/passwd."
   ],
   [
    "/etc/shells",
    "The list of valid login shells on the system."
   ]
  ],
  "example": "The task: create user sarah as a member of sysadmins who must not have an interactive shell. You run useradd -G sysadmins -s /sbin/nologin sarah and set her password. su - sarah prints This account is currently not available, which confirms the requirement.",
  "tip": "No interactive shell on the exam means -s /sbin/nologin. It blocks shell logins but not authentication itself, so combine with locking when an account must be fully disabled.",
  "check": [
   [
    "Where is a user's login shell stored?",
    "In the seventh (last) field of the user's line in /etc/passwd."
   ],
   [
    "How do you give an existing user a non-interactive shell?",
    "usermod -s /sbin/nologin username."
   ],
   [
    "Does /sbin/nologin stop root from running a command as that user?",
    "No; root can still use sudo -u or runuser, because nologin only blocks interactive shell logins."
   ]
  ]
 },
 {
  "t": "Changing passwords (passwd, passwd --stdin) and adjusting password aging (chage -M -m -W -E -d 0)",
  "body": [
   "Passwords are stored as hashes in `/etc/shadow`, along with aging information that controls how long a password is valid. RHCSA tasks ask you to set passwords, force users to change them and apply aging rules. Two commands cover this: `passwd` sets passwords, and `chage` (change age) manages aging.",
   "A user runs `passwd` to change their own password, after typing the old one. Root runs `passwd alice` to set anyone's password without knowing the old one. For scripts, RHEL's `passwd` accepts `--stdin`, which reads the new password from standard input, and `chpasswd` reads `user:password` lines. Be aware that passwords typed on a command line can end up in shell history.",
   "```bash\npasswd alice\necho 'N3w-Passw0rd' | passwd --stdin alice\nchage -l alice          # show aging settings\n```",
   "The aging fields, and the `chage` option for each, are: `-M` maximum days a password is valid before it must be changed; `-m` minimum days between changes, which stops users cycling straight back to an old password; `-W` warning days before expiry; `-I` inactive days after expiry during which the user can still log in to set a new password; and `-E` the account expiration date, as YYYY-MM-DD or days since 1 January 1970. `-E -1` removes the expiration date.",
   "`chage -d 0 alice` sets the date of the last change to day zero, meaning the password is considered expired, so alice must choose a new one at her next login. This is the standard way to hand out a temporary password. `passwd -e alice` does the same thing.",
   "```bash\nchage -M 90 -m 7 -W 14 alice      # 90 day max, 7 day min, warn 14 days\nchage -E 2026-12-31 contractor1   # account stops working after that date\nchage -d 0 newhire                # force change at next login\nchage -l alice\n```",
   "Know the difference between password expiry and account expiry. When the password expires (after `-M` days), the user can still log in but is forced to change it, unless the inactive period has also passed. When the account expires (`-E`), the account cannot be used at all, whatever the password. Running `chage alice` with no options walks you through each value interactively, which is handy when you forget the letters."
  ],
  "terms": [
   [
    "chage",
    "Views and changes password aging and account expiration for a user."
   ],
   [
    "Maximum password age",
    "Days a password stays valid before the user must change it, set with chage -M."
   ],
   [
    "Minimum password age",
    "Days a user must wait between password changes, set with chage -m."
   ],
   [
    "Account expiration",
    "A date after which the account cannot be used at all, set with chage -E."
   ]
  ],
  "example": "The new hire mia's password must expire after 60 days, and she must change her temporary password when she first logs in. You run chage -M 60 mia and chage -d 0 mia; chage -l mia now shows Password must be changed and a maximum of 60.",
  "tip": "chage -d 0 forces a password change at next login; chage -E 0 or a past date expires the whole account. Mixing them up either locks the user out or does nothing useful.",
  "check": [
   [
    "Which command forces user tom to change his password at next login?",
    "chage -d 0 tom (or passwd -e tom)."
   ],
   [
    "What does chage -m 7 mean?",
    "The user must wait at least 7 days between password changes."
   ],
   [
    "What is the difference between password expiry and account expiry?",
    "An expired password must be changed at login but the account works; an expired account cannot be used at all."
   ]
  ]
 },
 {
  "t": "Default aging in /etc/login.defs and account defaults in /etc/default/useradd and /etc/skel",
  "body": [
   "When `useradd` creates an account, it fills in everything you did not specify from three places. Changing these defaults is how you make sure every future account follows policy without remembering options each time. The key point, often tested: these files affect only accounts created afterwards, not existing ones.",
   "`/etc/login.defs` holds shadow-suite settings. Its password aging lines set the values copied into `/etc/shadow` for new users: `PASS_MAX_DAYS`, `PASS_MIN_DAYS` and `PASS_WARN_AGE`. It also sets the UID and GID (group ID) ranges for regular and system accounts (`UID_MIN`, `UID_MAX`, `SYS_UID_MIN` and the GID equivalents), whether home directories are created (`CREATE_HOME`), the default `UMASK` used for new home directories, and the password hashing method (`ENCRYPT_METHOD`).",
   "```\n# /etc/login.defs (excerpt)\nPASS_MAX_DAYS   90\nPASS_MIN_DAYS   1\nPASS_WARN_AGE   14\nUID_MIN         1000\nCREATE_HOME     yes\n```",
   "`/etc/default/useradd` holds useradd's own defaults: `HOME` (base directory for homes, normally `/home`), `SHELL` (default login shell), `SKEL` (the skeleton directory), `INACTIVE` and `EXPIRE` (default inactive period and account expiry), and `GROUP`. You can view it with `useradd -D` and change values with, for example, `useradd -D -s /bin/bash` or by editing the file directly.",
   "`/etc/skel` is the skeleton directory. Its contents are copied into each new home directory, so files placed there, such as a standard `.bashrc`, a README or an empty directory, appear for every new user. RHEL ships it with `.bash_logout`, `.bash_profile` and `.bashrc`. Hidden files are included, which is easy to forget when you look with plain `ls`; use `ls -a /etc/skel`.",
   "```bash\nuseradd -D                     # show useradd defaults\necho 'Welcome' > /etc/skel/README\nuseradd testuser\nls -a /home/testuser           # README is there\nchage -l testuser              # shows login.defs aging values\n```",
   "For existing accounts, apply the policy yourself with `chage` for each user. A typical exam task reads: new users must have passwords that expire after 30 days. The answer is `PASS_MAX_DAYS 30` in `/etc/login.defs`, and, if it also mentions existing users, `chage -M 30` for them."
  ],
  "terms": [
   [
    "/etc/login.defs",
    "Configuration for new accounts: default password aging, UID and GID ranges, CREATE_HOME, UMASK and hashing method."
   ],
   [
    "/etc/default/useradd",
    "useradd defaults such as base home directory, default shell, skeleton directory and expiry, shown with useradd -D."
   ],
   [
    "/etc/skel",
    "The skeleton directory whose files are copied into every new user's home directory."
   ],
   [
    "PASS_MAX_DAYS",
    "The login.defs setting for default maximum password age applied to new accounts."
   ]
  ],
  "example": "Policy says every new account's password must expire after 20 days. You set PASS_MAX_DAYS 20 in /etc/login.defs, create user kim, and chage -l kim shows a maximum of 20. User lee, created last week, still shows 99999 until you run chage -M 20 lee.",
  "tip": "login.defs and /etc/default/useradd change only accounts created afterwards. If existing users must comply, run chage on them as well.",
  "check": [
   [
    "Which file sets the default maximum password age for new users?",
    "/etc/login.defs, using PASS_MAX_DAYS."
   ],
   [
    "How do you see useradd's current default shell and home base?",
    "Run useradd -D, which prints the values from /etc/default/useradd."
   ],
   [
    "You put a file in /etc/skel. Which users get it?",
    "Only users whose home directories are created after that point; existing homes are not changed."
   ]
  ]
 },
 {
  "t": "Creating, deleting and modifying local groups and memberships (groupadd -g, usermod -aG, gpasswd)",
  "body": [
   "Groups let you grant permissions to several users at once: give a directory to a group and control membership instead of changing file permissions for each person. Local groups live in `/etc/group`, with group passwords and administrators in `/etc/gshadow`. On RHEL, each user also gets a private group of the same name, so shared access needs extra groups.",
   "`groupadd name` creates a group with the next free GID. `-g` sets a specific GID, which tasks often require so IDs match across systems, and `-r` creates a system group. `groupmod -n newname oldname` renames a group and `groupmod -g` changes its GID. `groupdel name` deletes it, but it will refuse to delete a group that is still the primary group of some user.",
   "```bash\ngroupadd -g 3000 sysadmins\ngroupmod -n admins sysadmins\ngetent group admins\n# admins:x:3000:\ngroupdel admins\n```",
   "Membership can be managed from the user side or the group side. From the user side, `usermod -aG sysadmins alice` appends a supplementary group; remember that `-G` without `-a` replaces the list. From the group side, `gpasswd -a alice sysadmins` adds one user and `gpasswd -d alice sysadmins` removes one, without touching the user's other groups. `gpasswd -M alice,bob sysadmins` sets the whole member list at once.",
   "```bash\ngpasswd -a bob sysadmins\ngpasswd -d bob sysadmins\ngpasswd -A alice sysadmins   # alice can manage members herself\nid bob\ngroups bob\n```",
   "`gpasswd -A` makes a user a group administrator, who can then add and remove members without root. `newgrp group` starts a new shell with that group as the primary group, which is useful for creating files with a specific group.",
   "Group membership takes effect at login. After adding a user to a group, `id user` from root shows the new group immediately, but the user's existing sessions do not have it until they log in again. Common exam pattern: create a group with a given GID, add users as supplementary members, create a shared directory owned by that group, and set permissions, often with the setgid bit so new files inherit the group."
  ],
  "terms": [
   [
    "GID",
    "Group ID, the number identifying a group in /etc/group."
   ],
   [
    "groupadd -g",
    "Creates a group with a specific GID."
   ],
   [
    "gpasswd",
    "Administers /etc/group and /etc/gshadow: add or remove members, set the member list and assign group administrators."
   ],
   [
    "/etc/gshadow",
    "The secure group file holding group passwords, administrators and members."
   ]
  ],
  "example": "You create the group sysadmins with GID 4000 and make natasha and harry members: groupadd -g 4000 sysadmins, then usermod -aG sysadmins natasha and gpasswd -a harry sysadmins. getent group sysadmins shows sysadmins:x:4000:natasha,harry.",
  "tip": "Both usermod -aG and gpasswd -a add one group without removing others. The trap is usermod -G without -a, which wipes a user's existing supplementary groups.",
  "check": [
   [
    "How do you create group devops with GID 5000?",
    "groupadd -g 5000 devops."
   ],
   [
    "Which command removes carol from group finance only?",
    "gpasswd -d carol finance."
   ],
   [
    "Why might groupdel refuse to delete a group?",
    "It is still the primary group of at least one user."
   ]
  ]
 },
 {
  "t": "Account databases: /etc/passwd, /etc/shadow, /etc/group; id and getent",
  "body": [
   "Local accounts are stored in plain text files, one line per entry, with fields separated by colons. Reading these files fluently lets you verify any user or group task in seconds and spot mistakes such as a wrong shell or a missing group member. You should inspect them freely but change them with the proper tools (`useradd`, `usermod`, `chage`, `groupmod`) or, if you must edit by hand, with `vipw` and `vigr`, which lock the files safely.",
   "`/etc/passwd` is readable by everyone and has seven fields: login name, password placeholder (`x` means the hash is in shadow), UID, primary GID, GECOS comment (usually the full name), home directory and login shell.",
   "```\nalice:x:2001:2001:Alice Ng:/home/alice:/bin/bash\n```",
   "`/etc/shadow` is readable only by root and holds the password hash and aging data in nine fields: login name, hash, date of last change (days since 1 January 1970), minimum age, maximum age, warning period, inactivity period, account expiration date and a reserved field. A hash starting with `!` or `!!` means the password is locked or was never set; `*` means no password login is possible. RHEL's hashes begin with an identifier such as `$6$` for SHA-512 or `$y$` for yescrypt.",
   "`/etc/group` has four fields: group name, password placeholder, GID and a comma-separated list of supplementary members. Users whose primary group this is are usually not listed in the last field, because that membership comes from the GID in `/etc/passwd`. That is why checking only `/etc/group` can make it look as though a group has no members.",
   "```\n# name:password:GID:members\nsysadmins:x:4000:natasha,harry\n```",
   "Two commands give reliable answers. `id user` prints the UID, primary GID and every group the user belongs to, combining both sources. `getent` queries the system databases through NSS (Name Service Switch), so it includes local files and any network sources such as LDAP (Lightweight Directory Access Protocol): `getent passwd alice`, `getent group sysadmins`, and as root `getent shadow alice`. Prefer them to `grep` on the files, because on systems joined to a directory, network users do not appear in `/etc/passwd` at all.",
   "```bash\nid alice\ngetent passwd alice | cut -d: -f7   # just the shell\ngetent group sysadmins\n```"
  ],
  "terms": [
   [
    "/etc/passwd",
    "The world-readable account file with seven fields: name, x, UID, GID, comment, home and shell."
   ],
   [
    "/etc/shadow",
    "The root-only file holding password hashes and aging fields for each account."
   ],
   [
    "/etc/group",
    "The group file with name, x, GID and a list of supplementary members."
   ],
   [
    "getent",
    "Queries system databases such as passwd and group through NSS, including local and network sources."
   ]
  ],
  "example": "After creating user sarah with a nologin shell and membership in sysadmins, you verify with getent passwd sarah, which ends in /sbin/nologin, and id sarah, which lists sysadmins. getent shadow sarah shows a hash starting with $, proving a password is set.",
  "tip": "A user's primary group is set by the GID field in /etc/passwd, not listed in /etc/group. Use id to see all memberships at once.",
  "check": [
   [
    "What does the x in the second field of /etc/passwd mean?",
    "The password hash is stored in /etc/shadow instead."
   ],
   [
    "What does !! at the start of a shadow hash field indicate?",
    "The account has no password set yet or is locked, so password login is not possible."
   ],
   [
    "Why use getent passwd instead of grep on /etc/passwd?",
    "getent follows NSS and includes network sources like LDAP, so it shows every account the system knows."
   ]
  ]
 },
 {
  "t": "Configuring superuser access: the wheel group, /etc/sudoers.d/ drop-ins and visudo",
  "body": [
   "Administrators should not log in as root for daily work. `sudo` lets approved users run specific commands as root (or another user) using their own password, and it logs what they ran. That gives accountability and lets you grant just the privileges someone needs. Its rules live in `/etc/sudoers` and in drop-in files under `/etc/sudoers.d/`.",
   "RHEL ships with this rule enabled in `/etc/sudoers`: `%wheel ALL=(ALL) ALL`. The percent sign means a group. So the quickest way to give a user full administrative rights is to add them to the wheel group with `usermod -aG wheel alice`. After alice logs in again, `sudo -i` or `sudo command` works after she enters her own password.",
   "A sudoers rule reads: who, on which hosts, as which users, may run which commands. In `alice ALL=(ALL) ALL`, the first ALL is hosts, `(ALL)` is the users she may act as, and the final ALL is commands. Adding `NOPASSWD:` before the command list skips the password prompt. Command lists should use full paths.",
   "```\n# /etc/sudoers.d/admins\n%sysadmins   ALL=(ALL)  ALL\nbob          ALL=(root) NOPASSWD: /usr/bin/systemctl restart httpd\nbackup       ALL=(root) /usr/bin/rsync, /usr/bin/tar\n```",
   "Never edit sudoers files with a plain editor. `visudo` opens the file with locking and checks the syntax before saving; if there is an error it offers to re-edit rather than saving a broken file that could lock everyone out of sudo. Use `visudo -f /etc/sudoers.d/admins` to create or edit a drop-in, and `visudo -c` to check every file. Drop-in files keep your changes separate from the vendor file, which package updates may replace.",
   "Drop-in rules: files in `/etc/sudoers.d/` must not contain a dot or end in a tilde in their names, or sudo ignores them, so use names like `admins`, not `admins.conf`. They should be owned by root with mode 0440, which visudo sets when it creates them.",
   "Test as the user: `sudo -l` lists what the current user may run, and `sudo -l -U bob` run by root shows bob's rights. When a rule does not work, check the file name, group membership (and a fresh login), full command paths and `visudo -c`. Failures are logged in the journal, which you can search with `journalctl -t sudo`."
  ],
  "terms": [
   [
    "sudo",
    "Runs a command as root or another user according to sudoers rules, logging the action."
   ],
   [
    "wheel group",
    "The RHEL administrative group granted full sudo rights by the default sudoers rule %wheel ALL=(ALL) ALL."
   ],
   [
    "visudo",
    "Edits sudoers files safely with locking and syntax checking; -f edits a drop-in and -c checks all files."
   ],
   [
    "/etc/sudoers.d/",
    "A directory of drop-in sudoers files that keeps local rules separate from the main file."
   ]
  ],
  "example": "Members of sysadmins must run any command as root, and user deploy may only restart httpd without a password. You run visudo -f /etc/sudoers.d/local and add %sysadmins ALL=(ALL) ALL and deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart httpd, then visudo -c reports the files parsed OK.",
  "tip": "Always use visudo; a syntax error in a sudoers file can remove everyone's sudo access. And a drop-in file whose name contains a dot is silently ignored.",
  "check": [
   [
    "What is the fastest way to give alice full sudo rights on RHEL?",
    "Add her to the wheel group with usermod -aG wheel alice; she gets the rights at her next login."
   ],
   [
    "What does %devs ALL=(ALL) NOPASSWD: ALL mean?",
    "Members of group devs can run any command as any user on any host without entering a password."
   ],
   [
    "Why would /etc/sudoers.d/admins.conf be ignored?",
    "sudo skips drop-in files whose names contain a dot or end with a tilde."
   ]
  ]
 },
 {
  "t": "Locking and unlocking accounts (usermod -L, passwd -l, chage -E 0)",
  "body": [
   "Sometimes an account must stop working without being deleted: an employee is on leave, a contractor's work is paused, or you suspect a password was exposed. Locking keeps the account, its files and its UID intact so you can restore access later. RHEL offers two different mechanisms, and understanding what each actually blocks is the key point.",
   "The first is locking the password. `usermod -L alice` or `passwd -l alice` puts an exclamation mark in front of the hash in `/etc/shadow`. The hash no longer matches any password, so password logins fail. `usermod -U` or `passwd -u` removes the mark and restores the old password. `passwd -S alice` shows status, with `LK` or a similar note for a locked password.",
   "```bash\nusermod -L alice\ngetent shadow alice | cut -d: -f2 | cut -c1-5   # starts with !\npasswd -S alice\nusermod -U alice\n```",
   "The weakness: a password lock does not block logins that do not use the password. A user with an SSH key in `~/.ssh/authorized_keys` can still log in, and other authentication methods may still work. So a password lock is not enough to disable an account completely.",
   "The second mechanism is account expiry. `chage -E 0 alice` sets the expiration date to day zero, 1 January 1970, which is in the past, so the account is expired. PAM (Pluggable Authentication Modules) checks account expiry for every login method, including SSH keys, so the account cannot be used at all. To undo it, run `chage -E -1 alice`, which removes the expiry date. `usermod -e` sets the same field. You can also combine both locks: `usermod -L -e 1 alice`.",
   "```bash\nchage -E 0 alice      # expire: blocks all logins\nchage -l alice        # Account expires: Jan 01, 1970\nchage -E -1 alice     # remove expiry\n```",
   "Changing the shell to `/sbin/nologin` is a third, different tool: it stops interactive shells but not authentication itself. For a complete disable, the usual combination is expiring the account and locking the password. Also check for running processes and scheduled jobs belonging to the user, since locking does not stop existing sessions; `loginctl terminate-user alice` or `pkill -u alice` ends them."
  ],
  "terms": [
   [
    "Password lock",
    "An exclamation mark prefixed to the shadow hash by usermod -L or passwd -l, which blocks password authentication only."
   ],
   [
    "Account expiry",
    "The shadow expiration date; chage -E 0 sets it in the past so every login method is refused."
   ],
   [
    "passwd -S",
    "Shows the password status of an account, including whether it is locked."
   ],
   [
    "chage -E -1",
    "Removes an account's expiration date, reversing chage -E 0."
   ]
  ],
  "example": "A developer goes on leave but uses SSH keys. After usermod -L the developer can still log in with a key, so you also run chage -E 0 dev1. The next SSH attempt is refused because the account is expired. On return, chage -E -1 dev1 and usermod -U dev1 restore access.",
  "tip": "usermod -L and passwd -l block only password logins; chage -E 0 blocks every login method, including SSH keys. Choose based on what the task says must be prevented.",
  "check": [
   [
    "What does usermod -L change in /etc/shadow?",
    "It puts an exclamation mark at the start of the password hash so it cannot match."
   ],
   [
    "Why can a locked user still log in over SSH?",
    "Password locking does not affect key-based authentication; expire the account with chage -E 0 to block all logins."
   ],
   [
    "How do you remove an expiration date set with chage -E 0?",
    "Run chage -E -1 username."
   ]
  ]
 },
 {
  "t": "Configuring firewall settings with firewall-cmd: zones, services, ports, sources, runtime vs permanent",
  "body": [
   "The networking lesson covered opening services and ports. The security objective goes further: using zones and source addresses to control who may connect, and being precise about runtime and permanent configuration. The goal is least privilege, meaning allow only what a service needs from only the networks that need it.",
   "firewalld assigns each incoming packet to one zone. If the packet's source address matches a source bound to a zone, that zone applies. Otherwise the zone of the incoming interface applies, and if the interface has none, the default zone. Predefined zones range from `drop` (silently drop everything) and `block` (reject everything) through `public` and `internal` to `trusted` (allow everything). Each has its own services and ports.",
   "Binding a source network to a zone lets you treat certain clients differently. For example, allow SSH only from an admin network by putting that network in the `internal` zone with ssh allowed, and removing ssh from `public`.",
   "```bash\nfirewall-cmd --permanent --zone=internal --add-source=10.0.5.0/24\nfirewall-cmd --permanent --zone=internal --add-service=ssh\nfirewall-cmd --permanent --zone=public --remove-service=ssh\nfirewall-cmd --reload\nfirewall-cmd --get-active-zones\nfirewall-cmd --zone=internal --list-all\n```",
   "Other zone commands: `--set-default-zone=name` changes the default immediately and permanently, `--change-interface=enp1s0 --zone=internal` moves an interface (for NetworkManager-managed interfaces the lasting setting is the connection's `connection.zone`), and `--list-all-zones` shows everything. Services and ports are added per zone with `--add-service`, `--add-port=port/proto` and removed with the matching `--remove-` options; `--query-service=http` answers yes or no.",
   "Runtime versus permanent is the concept most often tested. Runtime changes apply now and vanish on reload or reboot. Permanent changes are saved but do not apply until reload. The two can drift apart; `firewall-cmd --list-all` shows runtime and `firewall-cmd --permanent --list-all` shows saved configuration. A safe way to experiment remotely is to make runtime changes, test, then `--runtime-to-permanent`. If you lock yourself out with a runtime change, a reload or reboot restores the saved rules.",
   "When a service must stay reachable after reboot, the permanent configuration must include it. Always compare runtime and permanent output before finishing a task."
  ],
  "terms": [
   [
    "Source binding",
    "Assigning a source address or network to a zone so packets from it use that zone's rules."
   ],
   [
    "Default zone",
    "The zone used for interfaces and traffic not assigned to any other zone, public unless changed."
   ],
   [
    "Runtime configuration",
    "The firewall rules currently in effect, lost on reload or reboot unless saved."
   ],
   [
    "--runtime-to-permanent",
    "Saves the current runtime firewall configuration as the permanent configuration."
   ]
  ],
  "example": "Only the 192.168.50.0/24 admin network may use the web console on TCP 9090. You add that network as a source to the internal zone with cockpit allowed, remove cockpit from public, all with --permanent, reload, and confirm with --get-active-zones and --zone=internal --list-all.",
  "tip": "Source bindings take priority over interface zones. Compare firewall-cmd --list-all with --permanent --list-all to be sure your runtime and saved rules agree.",
  "check": [
   [
    "How does firewalld choose a zone for an incoming packet?",
    "A matching source binding first, then the zone of the incoming interface, then the default zone."
   ],
   [
    "How do you save working runtime rules without retyping them?",
    "firewall-cmd --runtime-to-permanent."
   ],
   [
    "Which command shows the saved, rather than running, rules for a zone?",
    "firewall-cmd --permanent --zone=name --list-all."
   ]
  ]
 },
 {
  "t": "Managing default file permissions with umask (shell and /etc/login.defs, ~/.bashrc)",
  "body": [
   "When a program creates a file or directory, it asks for a starting mode: 666 (rw-rw-rw-) for regular files and 777 (rwxrwxrwx) for directories. The umask (user file-creation mask) then removes bits from that request. Each process has its own umask, inherited from its parent, so the value set in your shell controls the permissions of everything you create from it.",
   "The umask lists bits to take away. With umask 022, write is removed for group and other: new files get 644 (rw-r--r--) and new directories 755. With umask 002, only other loses write: files 664, directories 775. With umask 077, group and other lose everything: files 600, directories 700. Files never get execute from the umask, because programs do not request it for regular files.",
   "```bash\numask            # 0022\numask -S         # u=rwx,g=rx,o=rx\numask 027\ntouch f; mkdir d\nls -ld f d       # -rw-r----- f   drwxr-x--- d\n```",
   "Setting `umask 027` at the prompt affects only that shell and its children, and is gone when you log out. To make it persistent for one user, add the `umask` line to `~/.bashrc` (read by interactive shells) or `~/.bash_profile` (read at login). Changes take effect in new shells.",
   "System-wide defaults come from several places on RHEL. `/etc/login.defs` has a `UMASK` setting, used for example when creating home directories and applied at login by PAM (Pluggable Authentication Modules). Shell startup files such as `/etc/profile` and `/etc/bashrc` can also set it, and the cleanest place for a site-wide shell override is a script in `/etc/profile.d/`. Typical results are 0022 for root and 0002 for regular users, which suits RHEL's private user groups because a user's group contains only that user.",
   "```bash\n# /etc/profile.d/umask.sh  (all users)\numask 027\n\n# ~/.bashrc  (one user)\numask 077\n```",
   "Two things to remember. The umask never grants permissions; it only removes them, so it cannot make a file executable. And it applies at creation only; existing files keep their modes, so use `chmod` to fix them. Some services, such as systemd units with `UMask=`, set their own values independently of your shell."
  ],
  "terms": [
   [
    "umask",
    "A per-process mask of permission bits removed from new files and directories."
   ],
   [
    "Default creation mode",
    "The mode programs request before masking: 666 for files and 777 for directories."
   ],
   [
    "~/.bashrc",
    "A per-user shell startup file where a persistent umask for that user can be set."
   ],
   [
    "/etc/profile.d/",
    "A directory of shell scripts run at login for all users, a clean place for site-wide settings like umask."
   ]
  ],
  "example": "User daniel must have new files readable only by himself. You add umask 077 to /home/daniel/.bashrc. After he logs in again, touch report.txt creates -rw------- and mkdir notes creates drwx------.",
  "tip": "Subtract the umask from 666 for files and 777 for directories. With umask 027, files are 640 and directories 750.",
  "check": [
   [
    "With umask 007, what modes do new files and directories get?",
    "Files 660 (rw-rw----) and directories 770 (rwxrwx---)."
   ],
   [
    "Where would you set a persistent umask for just one user?",
    "In that user's ~/.bashrc or ~/.bash_profile."
   ],
   [
    "Can umask make new regular files executable?",
    "No; it only removes bits, and programs request 666 for files, so execute is never set by default."
   ]
  ]
 },
 {
  "t": "Configuring key-based SSH authentication (ssh-keygen, ssh-copy-id, ~/.ssh permissions, sshd_config)",
  "body": [
   "SSH (Secure Shell) key authentication replaces a typed password with a key pair. The private key stays on your client; the public key is copied to the server. When you connect, the server challenges the client to prove it holds the matching private key, and the private key itself never crosses the network. Keys resist password guessing, allow automation, and are expected on the RHCSA whenever a task says passwordless login.",
   "Generate a pair with `ssh-keygen`. The default type on current RHEL is Ed25519 or RSA depending on version, and you can choose with `-t ed25519`. Accept the default location in `~/.ssh/` and choose whether to protect the private key with a passphrase; an empty passphrase allows unattended use, while a passphrase adds protection if the file is stolen, and `ssh-agent` can cache it.",
   "```bash\nssh-keygen -t ed25519            # creates ~/.ssh/id_ed25519 and .pub\nssh-copy-id student@serverb      # asks for the password once\nssh student@serverb              # now logs in with the key\n```",
   "`ssh-copy-id` appends your public key to `~/.ssh/authorized_keys` on the server for the target user and sets sane permissions. If you copy by hand, the permissions matter, because sshd refuses keys when files are too open: the home directory must not be writable by group or other, `~/.ssh` should be 700, `authorized_keys` 600 and the private key 600. Everything must be owned by the user. SELinux labels matter too; if you create the files by moving them, run `restorecon -Rv ~/.ssh`.",
   "Server behavior is set in `/etc/ssh/sshd_config` and, preferably, in drop-in files under `/etc/ssh/sshd_config.d/` ending in `.conf`, which are read first; for most options the first value found wins. Common settings: `PubkeyAuthentication yes` (the default), `PasswordAuthentication no` to require keys, and `PermitRootLogin` with values `yes`, `no` or `prohibit-password` (root may log in with a key only).",
   "```bash\n# /etc/ssh/sshd_config.d/50-local.conf\nPasswordAuthentication no\nPermitRootLogin no\n\nsshd -t                  # test syntax\nsystemctl reload sshd\n```",
   "Before disabling passwords, confirm the key login works in a second session so you cannot lock yourself out. If a key is refused, run the client with `ssh -v` and read the server side in `journalctl -u sshd`, which usually names the bad permission. Protect private keys like passwords: never copy them to servers, and remove public keys from authorized_keys when access should end."
  ],
  "terms": [
   [
    "Key pair",
    "A private key kept on the client and a matching public key placed on servers for authentication."
   ],
   [
    "authorized_keys",
    "The file ~/.ssh/authorized_keys on a server listing public keys allowed to log in as that user."
   ],
   [
    "ssh-copy-id",
    "Copies a public key into a remote user's authorized_keys file with correct permissions."
   ],
   [
    "PermitRootLogin",
    "An sshd setting controlling root logins: yes, no or prohibit-password (key only)."
   ]
  ],
  "example": "User student on servera must log in to serverb without a password. As student you run ssh-keygen accepting defaults, then ssh-copy-id student@serverb and enter the password once. ssh student@serverb hostname now prints serverb without prompting, and journalctl -u sshd on serverb shows Accepted publickey.",
  "tip": "Most key failures are permissions: ~/.ssh must be 700, authorized_keys 600, and the home directory not group- or world-writable. Check journalctl -u sshd on the server for the reason.",
  "check": [
   [
    "Which file on the server must contain your public key?",
    "~/.ssh/authorized_keys in the home directory of the account you log in as."
   ],
   [
    "What do you run after changing sshd settings?",
    "sshd -t to check syntax, then systemctl reload sshd (or restart)."
   ],
   [
    "What does PermitRootLogin prohibit-password allow?",
    "Root may log in with a key but not with a password."
   ]
  ]
 },
 {
  "t": "Setting SELinux enforcing and permissive modes (getenforce, setenforce, /etc/selinux/config)",
  "body": [
   "SELinux (Security-Enhanced Linux) is mandatory access control built into the kernel. On top of normal file permissions, every process and file carries a security label, and a policy says which process types may access which object types. Even if a service is compromised, SELinux can stop it touching files and ports it was never meant to use. RHEL enables it by default and the RHCSA expects it to stay on.",
   "SELinux runs in one of three modes. Enforcing applies the policy: forbidden access is denied and logged. Permissive loads the policy and logs what would be denied, but allows it; it is a troubleshooting mode, not a security setting. Disabled means no SELinux at all, which loses protection and requires a full relabel when you turn it back on.",
   "`getenforce` prints the current mode, and `sestatus` shows more detail: current mode, mode from the config file and loaded policy name. `setenforce 0` switches to permissive and `setenforce 1` back to enforcing, immediately and only until the next boot. setenforce cannot enable or disable SELinux itself.",
   "```bash\ngetenforce            # Enforcing\nsetenforce 0          # permissive until reboot\nsetenforce 1\nsestatus\ngrep ^SELINUX= /etc/selinux/config\n```",
   "The boot-time mode is set in `/etc/selinux/config` with `SELINUX=enforcing`, `permissive` or `disabled`, alongside `SELINUXTYPE=targeted`, the standard policy. Change it there to make a mode persistent. On current RHEL releases, setting disabled in that file does not fully remove SELinux from the kernel; the supported way to disable it completely is the `selinux=0` kernel argument. You can also choose a mode for one boot with `enforcing=0` on the kernel command line.",
   "A common exam scenario: a system boots in permissive or with SELinux disabled, and you must make it enforcing persistently. Set `SELINUX=enforcing` in the config file, run `setenforce 1` if SELinux is currently permissive, and if it was disabled, create `/.autorelabel` with `touch /.autorelabel` before rebooting so every file gets a correct label.",
   "Never solve an access problem by leaving SELinux permissive. Use permissive briefly to confirm SELinux is the cause, then fix the labels, port types or booleans, and return to enforcing."
  ],
  "terms": [
   [
    "SELinux",
    "Security-Enhanced Linux, kernel mandatory access control based on labels and policy."
   ],
   [
    "Enforcing mode",
    "SELinux applies the policy, denying and logging forbidden access."
   ],
   [
    "Permissive mode",
    "SELinux logs policy violations but allows them, used for troubleshooting."
   ],
   [
    "/etc/selinux/config",
    "The file setting the SELinux mode and policy type used at boot."
   ]
  ],
  "example": "A server was left permissive by a previous admin. getenforce prints Permissive and the config file says SELINUX=permissive. You change the file to SELINUX=enforcing, run setenforce 1, and sestatus now shows both current and config mode as enforcing, so it stays that way after reboot.",
  "tip": "setenforce changes only the running mode; /etc/selinux/config sets the mode at boot. A persistent change needs the file, and graders check after a reboot.",
  "check": [
   [
    "What is the difference between enforcing and permissive?",
    "Enforcing denies and logs policy violations; permissive only logs them and allows the access."
   ],
   [
    "Can setenforce disable SELinux?",
    "No; it only switches between enforcing and permissive at runtime."
   ],
   [
    "What should you do before rebooting a system that had SELinux disabled and must now enforce?",
    "Set SELINUX=enforcing in /etc/selinux/config and touch /.autorelabel so files are relabeled at boot."
   ]
  ]
 },
 {
  "t": "Listing and identifying SELinux file and process contexts (ls -Z, ps -eZ, id -Z)",
  "body": [
   "Everything SELinux decides is based on labels called security contexts. Every file, directory, process, port and user session has one. Before you can fix an SELinux problem, you need to read these labels and notice when one is wrong. Almost every RHCSA SELinux task starts with a `-Z` option.",
   "A context has four colon-separated fields: user, role, type and level, for example `system_u:object_r:httpd_sys_content_t:s0`. The SELinux user and role matter little in the default targeted policy. The type, ending in `_t`, is the part that matters: targeted policy rules are written as which process type may do what to which object type. This is called type enforcement. The level (`s0`) is used for multi-level security and can usually be ignored.",
   "Many standard commands accept `-Z`. `ls -Z` shows file contexts, and `ls -dZ` shows a directory itself. `ps -eZ` (or `ps axZ`) shows the context of every process, so you can see that the web server runs as `httpd_t`. `id -Z` shows your own context, usually `unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023` for a normal login, meaning your shell is not confined by targeted policy. `ss -Z` shows sockets with process contexts.",
   "```bash\nls -Z /var/www/html/index.html\n# unconfined_u:object_r:httpd_sys_content_t:s0 /var/www/html/index.html\nps -eZ | grep httpd\n# system_u:system_r:httpd_t:s0   1234 ?  00:00:00 httpd\nid -Z\n```",
   "Reading these explains most failures. A process of type `httpd_t` may read files labeled `httpd_sys_content_t`, but not files labeled `user_home_t` or `admin_home_t`. So when a web page file shows the wrong type, that is your problem, even if its permission bits are fine.",
   "Where do file labels come from? A new file normally inherits the type of the directory it is created in. That is why `cp` into `/var/www/html` gives the right label, while `mv` from a home directory keeps the old home label, because moving does not create a new file. `cp -a` and `tar` with the `--selinux` option preserve the original labels. The policy's list of what the label should be for each path is shown with `semanage fcontext -l`, and `matchpathcon /path` prints the expected label for one path.",
   "Compare the actual label from `ls -Z` with the expected one; a mismatch is what the next lesson's `restorecon` fixes."
  ],
  "terms": [
   [
    "Security context",
    "An SELinux label of the form user:role:type:level attached to files, processes and ports."
   ],
   [
    "Type",
    "The context field ending in _t that targeted policy uses to decide access."
   ],
   [
    "Type enforcement",
    "SELinux policy rules that allow a process type specific access to object types."
   ],
   [
    "unconfined_t",
    "The type of normal user login sessions, which targeted policy does not restrict."
   ]
  ],
  "example": "A page you moved into /var/www/html gives 403 Forbidden while others work. ls -Z shows the new file is admin_home_t while the others are httpd_sys_content_t, and ps -eZ shows the server runs as httpd_t. The mismatch comes from using mv instead of cp, and relabeling the file fixes it.",
  "tip": "mv keeps a file's old context while cp creates a new file with the directory's context. A moved file with the wrong type is a classic exam trap.",
  "check": [
   [
    "Which field of an SELinux context matters most in the targeted policy?",
    "The type field, ending in _t."
   ],
   [
    "How do you see the context of running httpd processes?",
    "ps -eZ | grep httpd (or ps axZ)."
   ],
   [
    "Why does a file moved with mv keep the wrong context?",
    "mv keeps the existing file and its label, while a newly created file inherits the directory's type."
   ]
  ]
 },
 {
  "t": "Restoring default file contexts (restorecon -Rv) and adding rules with semanage fcontext",
  "body": [
   "SELinux keeps a policy database of which label each path should have, written as regular expressions such as `/var/www(/.*)?` mapped to `httpd_sys_content_t`. The actual label is stored on each file. When the two disagree, the fix is to reset the file to what the policy says. When the policy itself has no rule for your custom path, you first add one.",
   "`restorecon` sets files back to the label the policy expects. `-R` recurses and `-v` prints each change, so you can see what was wrong. `restorecon -Rv /var/www/html` fixes files moved there from home directories. It is safe to run repeatedly, since it only changes labels that differ from policy. `restorecon -Rnv` shows what would change without changing anything.",
   "```bash\nrestorecon -Rv /var/www/html\n# Relabeled /var/www/html/page.html from ...admin_home_t:s0 to ...httpd_sys_content_t:s0\n```",
   "Custom locations need a rule. If you serve web content from `/web`, the policy's default label for that path is `default_t`, which httpd may not read, and restorecon would just put `default_t` back. Add a rule with `semanage fcontext -a -t type 'regex'`, then apply it with restorecon. The regular expression `'/web(/.*)?'` matches the directory and everything inside it; quote it so the shell does not expand it.",
   "```bash\nsemanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'\nrestorecon -Rv /web\nls -dZ /web\nsemanage fcontext -l -C        # list local customizations\n```",
   "`semanage fcontext -l` lists all rules, and you can grep it for a similar existing path to find the right type, for example `semanage fcontext -l | grep '/var/www'`. `-d` deletes a local rule and `-m` modifies one. semanage comes from the policycoreutils-python-utils package, which you may need to install. Because the rule is stored in the policy, it survives reboots and full relabels.",
   "Contrast with `chcon`, which changes a file's label directly, for example `chcon -t httpd_sys_content_t /web/index.html`. It works immediately but is temporary in the sense that restorecon or a relabel will undo it, since the policy still says otherwise. On the exam, use semanage fcontext plus restorecon for anything that must persist.",
   "Two related tricks: `touch /.autorelabel` and a reboot relabels the entire file system, and `restorecon` is the right fix after copying SSH keys or configuration files into place with `mv`."
  ],
  "terms": [
   [
    "restorecon",
    "Resets file SELinux labels to the values defined in policy; -R recurses and -v reports changes."
   ],
   [
    "semanage fcontext",
    "Adds, modifies, deletes or lists the policy rules mapping path patterns to file types."
   ],
   [
    "chcon",
    "Changes a file's label directly; the change is lost on restorecon or relabel."
   ],
   [
    "(/.*)?",
    "The regular expression suffix that matches a directory and everything beneath it in fcontext rules."
   ]
  ],
  "example": "Apache must serve content from /srv/site. You run semanage fcontext -a -t httpd_sys_content_t '/srv/site(/.*)?', then restorecon -Rv /srv/site, which relabels every file. After a full relabel test with touch /.autorelabel and reboot, ls -Z still shows httpd_sys_content_t because the rule is in policy.",
  "tip": "semanage fcontext only records the rule; it does not change any file. Always follow it with restorecon -Rv on the path, and prefer this pair over chcon for persistence.",
  "check": [
   [
    "You added a semanage fcontext rule but ls -Z shows the old label. What did you forget?",
    "Running restorecon -Rv on the path to apply the rule to existing files."
   ],
   [
    "Why is chcon not a persistent fix?",
    "It changes the label on the file only; restorecon or a relabel resets it to what the policy says."
   ],
   [
    "What does the pattern '/data(/.*)?' match?",
    "The /data directory itself and everything beneath it."
   ]
  ]
 },
 {
  "t": "Managing SELinux port labels (semanage port -a -t http_port_t -p tcp)",
  "body": [
   "SELinux labels network ports as well as files. Policy says which process types may bind to, meaning listen on, which port types. For example, `httpd_t` may bind to ports labeled `http_port_t`, which by default include 80, 443 and a few others such as 8008 and 8443 (8080 is labeled http_cache_port_t). If you configure a service to listen on a port that does not carry its type, SELinux blocks the bind and the service fails to start, even though the configuration is otherwise perfect.",
   "`semanage port -l` lists port types and their numbers. Filter it to find what a service already allows, for example `semanage port -l | grep http_port_t` or `grep ssh_port_t`. This tells you both whether your port is already covered and which type name to use.",
   "```bash\nsemanage port -l | grep -w http_port_t\n# http_port_t   tcp   80, 81, 443, 488, 8008, 8009, 8443, 9000\nsemanage port -a -t http_port_t -p tcp 82\nsemanage port -l | grep -w http_port_t\n```",
   "To allow a new port, add it with `semanage port -a -t type -p protocol port`. `-a` adds, `-t` gives the type, and `-p` gives the protocol, tcp or udp. The change is stored in policy and survives reboots. If the port is already assigned to a different type, `-a` fails with an error saying it is already defined; use `-m` to modify it to the new type instead. `-d` deletes a local addition. Ranges work too, such as `8100-8110`.",
   "A typical exam task: the web server must serve content on port 82. That needs three changes, and missing any one fails the task. Set `Listen 82` in the httpd configuration. Add the SELinux port label with `semanage port -a -t http_port_t -p tcp 82`. Open the firewall with `firewall-cmd --permanent --add-port=82/tcp` and reload. Then `systemctl restart httpd` and test with `curl` from another host.",
   "The same pattern applies to SSH on a non-standard port (`ssh_port_t`), and to other services with their own port types. When a service fails to start after a port change, `systemctl status` shows a bind error such as permission denied, and the audit log shows an AVC (access vector cache) denial with `name_bind`, which points straight at a missing port label."
  ],
  "terms": [
   [
    "Port type",
    "An SELinux label on a network port, such as http_port_t or ssh_port_t, that controls which process types may use it."
   ],
   [
    "name_bind",
    "The permission a process needs to listen on a port; denials of it indicate a missing port label."
   ],
   [
    "semanage port -a",
    "Adds a port number and protocol to an SELinux port type."
   ],
   [
    "semanage port -m",
    "Modifies a port that is already defined with another type."
   ]
  ],
  "example": "SSH must also listen on port 2222. You add Port 22 and Port 2222 to a drop-in in /etc/ssh/sshd_config.d/, run semanage port -a -t ssh_port_t -p tcp 2222, open 2222/tcp in firewalld permanently, reload, and restart sshd. ss -tlnp shows sshd listening on both ports.",
  "tip": "A service moved to a non-standard port needs three things: its own config, an SELinux port label, and a firewall rule. If the port already has another type, use -m instead of -a.",
  "check": [
   [
    "How do you check which ports the web server may bind to?",
    "semanage port -l | grep http_port_t."
   ],
   [
    "semanage port -a reports the port is already defined. What now?",
    "Use semanage port -m with the same options to change its type."
   ],
   [
    "httpd fails to start after changing Listen to 8888. Which SELinux permission is likely denied?",
    "name_bind on port 8888, because it is not labeled http_port_t."
   ]
  ]
 },
 {
  "t": "Using SELinux booleans (getsebool -a, setsebool -P, semanage boolean -l)",
  "body": [
   "SELinux policy covers many ways a service might reasonably be used, but not all of them are safe to allow on every system. Booleans are on/off switches built into the policy for optional behavior, such as letting the web server serve users' home directories, letting it make outbound network connections, or letting FTP write to certain directories. You flip a boolean instead of writing new policy.",
   "`getsebool -a` lists every boolean and its current value; filter it with grep, as in `getsebool -a | grep httpd`. `getsebool httpd_enable_homedirs` shows one. `semanage boolean -l` gives more: the current value, the default value and a short description, which is how you find the right boolean when you do not know its name. Adding `-C` to that shows only booleans changed locally.",
   "```bash\ngetsebool -a | grep httpd\nsemanage boolean -l | grep -i home\n# httpd_enable_homedirs  (off , off)  Allow httpd to read home directories\nsetsebool -P httpd_enable_homedirs on\ngetsebool httpd_enable_homedirs\n```",
   "`setsebool name on` changes a boolean immediately, but only until the next reboot. `setsebool -P name on` changes it and also writes it to the policy so it persists. Without `-P`, the change looks successful and the task fails after the reboot, so use `-P` whenever a change must last. With `-P` the command can take a few seconds while the policy is rebuilt.",
   "In `semanage boolean -l` output the pair in parentheses is (current, default). If it reads (on, off), someone switched it on and it may or may not be persistent; `semanage boolean -l -C` lists persistent local changes.",
   "Common examples: `httpd_enable_homedirs` for user web pages, `httpd_can_network_connect` and `httpd_can_network_connect_db` for web applications that talk to other servers or databases, `httpd_use_nfs` for web content on NFS, and `use_nfs_home_dirs` for NFS-mounted home directories. Denials that a boolean would fix are reported by sealert with a suggestion naming the boolean.",
   "Before turning a boolean on, read its description and turn on only what the task needs. Each boolean widens what a service can do, so it is a small, deliberate reduction in protection, still far better than disabling SELinux."
  ],
  "terms": [
   [
    "SELinux boolean",
    "A policy switch that turns an optional set of permissions on or off without writing new policy."
   ],
   [
    "getsebool -a",
    "Lists all booleans and their current values."
   ],
   [
    "setsebool -P",
    "Sets a boolean and makes the change persistent across reboots."
   ],
   [
    "semanage boolean -l",
    "Lists booleans with current value, default value and description."
   ]
  ],
  "example": "Users' personal web pages under ~/public_html return 403 errors. semanage boolean -l | grep homedirs shows httpd_enable_homedirs is off. You run setsebool -P httpd_enable_homedirs on, fix the directory permissions and labels, and the pages load, including after a reboot.",
  "tip": "setsebool without -P is lost at reboot. When a task asks for a persistent change, check afterwards with semanage boolean -l -C, which lists only locally changed booleans.",
  "check": [
   [
    "What does -P add to setsebool?",
    "It makes the change persistent across reboots by writing it into the policy."
   ],
   [
    "How can you find a boolean when you do not know its name?",
    "semanage boolean -l | grep a keyword, which searches names and descriptions."
   ],
   [
    "In semanage boolean -l output, what does (on , off) mean?",
    "The boolean is currently on and its default is off."
   ]
  ]
 },
 {
  "t": "Diagnosing routine SELinux denials: /var/log/audit/audit.log, ausearch -m AVC, sealert",
  "body": [
   "When SELinux blocks something, the application usually reports only a vague error such as permission denied or 403 Forbidden. The real explanation is in the audit log. Troubleshooting SELinux is a routine: confirm SELinux is involved, find the denial, understand which label, port or boolean is wrong, and fix that specific thing.",
   "Denials are recorded by the audit daemon, auditd, in `/var/log/audit/audit.log` as AVC (access vector cache) messages. Each one names the permission denied, such as `read`, `open` or `name_bind`, the process with its source context (`scontext`), the target with its context (`tcontext`) and the object class (`tclass`), such as file, dir or tcp_socket.",
   "```\ntype=AVC msg=audit(...): avc:  denied  { read } for  pid=2143\n  comm=\"httpd\" name=\"index.html\" dev=\"vda1\" ino=12345\n  scontext=system_u:system_r:httpd_t:s0\n  tcontext=unconfined_u:object_r:admin_home_t:s0 tclass=file\n```",
   "Read it as: the `httpd` process, type `httpd_t`, was denied read on a file labeled `admin_home_t`. Web servers may read `httpd_sys_content_t`, so the file label is wrong, and `restorecon` or a `semanage fcontext` rule fixes it. A `name_bind` denial on a tcp_socket points to a port label, and a denial for a legitimate but optional action often points to a boolean.",
   "`ausearch` searches the audit log without scrolling through it. `ausearch -m AVC -ts recent` shows AVC messages from the last ten minutes, `-ts today` from today, and `-c httpd` filters by command name. Add `-i` to interpret numeric values into readable names.",
   "`sealert` from the setroubleshoot-server package goes further. When installed, the setroubleshoot service writes a one-line summary to the journal, and `sealert -l id` prints a full explanation, including likely causes and suggested commands such as the exact `semanage fcontext`, `semanage port` or `setsebool` line. `sealert -a /var/log/audit/audit.log` analyzes the whole log. Search the journal with `journalctl | grep sealert` or look for the text SELinux is preventing.",
   "```bash\nausearch -m AVC -ts recent -i\njournalctl -t setroubleshoot --since '10 min ago'\nsealert -l 3e4f...   # id from the journal message\n```",
   "Two cautions. If there is no AVC but you suspect SELinux, briefly use `setenforce 0` and retry; if it then works, SELinux is involved, possibly through a rule that does not log (a dontaudit rule), and you should return to enforcing immediately. And read sealert's suggestions critically: its last-resort advice to build a custom module with `audit2allow` is almost never right for exam tasks, where the answer is a correct label, port type or boolean."
  ],
  "terms": [
   [
    "AVC denial",
    "An audit log record of an access blocked by SELinux, naming the permission, source context, target context and class."
   ],
   [
    "auditd",
    "The audit daemon that writes SELinux denials and other events to /var/log/audit/audit.log."
   ],
   [
    "ausearch",
    "Searches the audit log by message type, time and command; -m AVC selects SELinux denials."
   ],
   [
    "sealert",
    "A setroubleshoot tool that explains denials in plain language and suggests fixes."
   ]
  ],
  "example": "Apache returns 403 for a new site under /srv/site. ausearch -m AVC -ts recent shows httpd_t denied read on files with tcontext default_t. sealert suggests semanage fcontext -a -t httpd_sys_content_t '/srv/site(/.*)?' followed by restorecon. You apply it, and the site loads with SELinux still enforcing.",
  "tip": "Read the tcontext of the denial: a wrong file type means restorecon or semanage fcontext, name_bind means semanage port, and an optional behavior means a boolean. Never leave SELinux permissive as the fix.",
  "check": [
   [
    "Which command shows SELinux denials from the last few minutes?",
    "ausearch -m AVC -ts recent."
   ],
   [
    "In an AVC message, what do scontext and tcontext represent?",
    "scontext is the context of the process attempting access; tcontext is the context of the target file, port or other object."
   ],
   [
    "No AVC appears, but switching to permissive makes the problem go away. What might explain that?",
    "A dontaudit rule is silently denying the access, so SELinux is still the cause even though nothing is logged."
   ]
  ]
 }
]);
