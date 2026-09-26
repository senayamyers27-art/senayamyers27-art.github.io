/* Exam-day guides: general test-taking advice plus what to expect from each vendor's exams.
   Rendered by assets/examday.js. Keep specifics to long-standing, published facts and point
   readers to the vendor's current candidate handbook for anything that changes often. */
CertHub.addExamDay({
  general: [
    { h: "The week before", points: [
      "Stop learning new material in bulk. Spend the week on review: your weakest domains, your notes, and one or two full-length practice exams under timed conditions.",
      "Read your booking confirmation carefully. Note the exact time and time zone, the address or check-in link, and the ID rules. Make sure the name on your booking matches your ID exactly.",
      "If you are testing online, run the vendor's system test on the same computer, network and room you will use on the day. Fix webcam, microphone, firewall or VPN problems now, not ten minutes before check-in.",
      "If you are going to a test center, plan the route and parking, and aim to arrive early. Late arrivals can lose the appointment.",
      "Keep sleep, meals and exercise steady. A consistent routine helps recall more than an extra late night of cramming."
    ] },
    { h: "The night before and the morning of", points: [
      "Do a light review only: a one-page summary, port numbers or commands you tend to forget, and a few easy questions to build confidence.",
      "Lay out your ID (check the expiry date), confirmation details, and anything else the vendor allows. For online exams, clear your desk and the room of notes, extra screens and devices.",
      "Eat something before you go and use the restroom right before check-in. Many exams do not allow breaks, or stop the clock only in limited ways.",
      "Log in or arrive early. Check-in, ID checks and room scans can take a while, and starting calm is worth a lot."
    ] },
    { h: "Pacing", points: [
      "Work out a rough time per question before you start: divide the minutes by the number of questions, then leave a buffer of ten to fifteen minutes for review.",
      "Check your pace at a few milestones (a quarter, halfway, three quarters) rather than after every question.",
      "Do not let one hard question eat five minutes. Make your best choice, flag it if the exam allows, and move on. Every question you have not reached is a guaranteed miss.",
      "Lab and performance-based items usually take longer than multiple choice. If the exam allows moving around, it is often wise to answer the quick questions first and come back."
    ] },
    { h: "Reading scenario questions", points: [
      "Read the last sentence first so you know what is actually being asked, then read the scenario with that in mind.",
      "Spot the qualifier: BEST, FIRST, MOST likely, LEAST, NEXT. Several answers may be technically true; the qualifier tells you which one the question wants.",
      "Watch for constraints in the scenario such as lowest cost, least administrative effort, minimal downtime, or a specific regulation. The right answer satisfies every stated constraint.",
      "Answer the question as asked, using the vendor's recommended approach, not how your own workplace happens to do it.",
      "Words like always, never and only are often signs of a distractor, though not always."
    ] },
    { h: "Eliminating distractors and flag-and-review", points: [
      "Cross out answers that are clearly wrong first. Getting from four options to two roughly doubles your odds even when you are unsure.",
      "Be suspicious of options that are true statements but do not answer the question, and of options that solve a different problem from the one described.",
      "For multiple-response items, read how many answers are required and treat each option as a separate true-or-false decision.",
      "Unanswered questions score nothing, and most exams do not penalize guessing. Never leave a question blank unless the vendor says otherwise.",
      "Use flags sparingly for questions you genuinely want to revisit. On review, change an answer only if you find a clear reason, such as a detail you misread, not just a vague feeling.",
      "Some exams do not let you go back to earlier questions or sections. Check the vendor guide below so you know before you start."
    ] },
    { h: "Performance-based and lab items", points: [
      "Read the full task and every requirement before touching anything. Make a quick mental checklist and tick items off as you go.",
      "Look for tabs, scroll bars, drop-downs and hidden panes. Missing a second screen of requirements is a common way to lose points.",
      "In live environments, verify your work: check the service is running, the setting persists after a restart, and the change applies where the task says it should.",
      "Partial credit is often available on these items, so complete what you can rather than abandoning a task you cannot finish.",
      "If the environment seems broken, re-read the task, then raise it with the proctor or through the exam's feedback option rather than silently losing time."
    ] },
    { h: "Nerves, breaks and after the exam", points: [
      "If you feel panic building, pause for a few slow breaths, relax your shoulders and read the current question again from the start. A short reset costs less time than a string of rushed answers.",
      "Expect some questions on topics you did not study. Exams often include unscored trial questions, and one strange question says nothing about your overall result.",
      "Know the break rules in advance. Where breaks are allowed, the clock often keeps running; where they are not, leaving your seat or camera view can end the exam.",
      "Afterwards, write down which topics felt weak while it is fresh. You may not discuss specific questions, but your own notes on weak areas are invaluable if you need a retake.",
      "If you pass, take a moment to enjoy it, then note the renewal requirements. If you do not, use the score report to focus your study and book the retake while the material is still fresh."
    ] }
  ],
  vendors: [
    {
      id: "comptia", name: "CompTIA",
      certs: ["security-plus", "cysa-plus", "securityx", "network-plus", "a-plus-core1", "a-plus-core2", "linux-plus", "server-plus", "cloud-plus", "project-plus", "data-plus"],
      intro: "CompTIA exams are delivered by Pearson VUE, at a test center or online, and mix multiple-choice questions with performance-based items.",
      sections: [
        { h: "How scoring works", points: [
          "Most CompTIA exams are scored on a scale of 100 to 900. The passing score is set per exam and published on each exam page; for example, Security+ requires 750.",
          "SecurityX (formerly CASP+) is the exception: it is reported as pass or fail with no scaled score.",
          "Questions are not all worth the same. Performance-based items can carry more weight, and multiple-response items generally need every correct choice selected.",
          "Exams can include unscored questions that CompTIA is trialling. You cannot tell which ones they are, so treat every question seriously."
        ] },
        { h: "Question types", points: [
          "Multiple choice with a single answer, and multiple response where you select more than one.",
          "Performance-based questions (PBQs): drag-and-drop matching, ordering steps, configuring settings in a simulated interface, reading logs, or working in a simulated terminal.",
          "PBQs often appear at the start of the exam. You can usually flag them and return after the multiple-choice section, which many candidates find less stressful.",
          "Check each exam page for the maximum number of questions and the time limit, since these differ by exam."
        ] },
        { h: "Time and pacing", points: [
          "Budget roughly a minute per multiple-choice question and save a larger block for the PBQs.",
          "If a PBQ is taking too long, submit your best partial attempt and flag it. Partial credit may be possible, and the multiple-choice questions that follow are quicker points.",
          "Use the review screen at the end to find anything unanswered or flagged. Unanswered questions count as wrong."
        ] },
        { h: "Test center vs online", points: [
          "At a Pearson VUE test center you store personal items in a locker, show ID, and have your photo taken. Scheduled breaks are not built in, and the clock keeps running if you leave the room.",
          "Online testing uses Pearson VUE OnVUE. You check in with a photo of your ID, photos of your workspace, and a webcam room scan. The desk must be clear, and you must stay in view for the whole exam.",
          "Online exams generally allow no breaks; leaving the camera view can end the session. Use the restroom before check-in.",
          "Run the OnVUE system test ahead of time on the exact machine and network you will use. Work laptops with strict security software often cause problems."
        ] },
        { h: "Booking, rescheduling and retakes", points: [
          "You buy a voucher from CompTIA or a reseller, then schedule through Pearson VUE. Vouchers have an expiry date, so check it when you buy.",
          "Rescheduling and cancelling are allowed up to a cut-off before the appointment. Missing that cut-off or not showing up usually forfeits the fee.",
          "CompTIA has a retake policy with waiting periods that apply after repeated attempts. Check the current policy on CompTIA's site before you book a retake."
        ] },
        { h: "Results and next steps", points: [
          "You normally see your result on screen when you finish, and receive a score report that lists the objectives where you missed questions.",
          "The certification appears in your CompTIA account after processing, usually within a few days. That is where you download the certificate and share a digital badge.",
          "Most CompTIA certifications are valid for three years and are renewed through the Continuing Education program: earning CEUs through activities or higher certifications, or passing the latest version of the exam.",
          "Passing a higher-level CompTIA exam can renew some lower ones. Check the CE program page to see how your certifications stack."
        ] }
      ]
    },
    {
      id: "cisco", name: "Cisco",
      certs: ["ccst-networking", "ccna", "ccnp-encor"],
      intro: "Cisco professional exams such as CCNA and ENCOR are delivered by Pearson VUE; CCST exams are delivered through Certiport. Expect scenario questions, drag-and-drop and simulations.",
      sections: [
        { h: "How scoring works", points: [
          "Cisco reports a scaled score. The passing score is set per exam and can change as the exam is maintained, so Cisco does not promise a fixed number.",
          "Your score report shows pass or fail plus a percentage breakdown by exam section, which is the most useful thing to study from if you need a retake.",
          "Exams can include unscored questions under evaluation."
        ] },
        { h: "Question types", points: [
          "Multiple choice, single and multiple answer.",
          "Drag-and-drop matching and ordering, often used for protocol characteristics or process steps.",
          "Simulations and simlets: you work at a simulated device command line to configure or troubleshoot, or answer questions from `show` command output. Testlets present a scenario with several questions attached.",
          "Know your IOS show commands and their output well. Many questions give you output and ask what it means."
        ] },
        { h: "No going back", points: [
          "On Cisco Pearson VUE exams you cannot return to a previous question once you move on, and there is no flag-and-review at the end.",
          "Treat every question as final. Read it fully, check the exhibits, answer, and then let it go.",
          "Because you cannot skip ahead and come back, pacing matters more. Keep an eye on the clock and do not sink too long into one simulation."
        ] },
        { h: "Test center vs online", points: [
          "CCNA and CCNP exams can be taken at a Pearson VUE test center or online through OnVUE, with the usual ID check, room scan and clear-desk rules.",
          "CCST exams use Certiport, either at a Certiport testing center (often a school or training provider) or online with Certiport's proctoring. Follow the setup steps Certiport sends.",
          "Online exams generally allow no breaks. Check the current rules for your delivery method in the exam confirmation."
        ] },
        { h: "Booking, rescheduling and retakes", points: [
          "Book through Cisco's certification site, which links to Pearson VUE or Certiport depending on the exam.",
          "There are cut-offs for rescheduling or cancelling without losing the fee, and a waiting period before you can retake a failed exam. Check Cisco's current exam policies before booking."
        ] },
        { h: "Results and next steps", points: [
          "You see pass or fail when you finish. The certification then appears in your Cisco certification tracking account after processing.",
          "Cisco certifications such as CCNA and CCNP are valid for three years. You recertify by earning continuing education credits, passing qualifying exams, or a mix of both.",
          "Passing ENCOR is the core requirement for CCNP Enterprise; you also need a concentration exam to earn the full CCNP. ENCOR also counts as the qualifying exam for the CCIE Enterprise lab."
        ] }
      ]
    },
    {
      id: "microsoft", name: "Microsoft",
      certs: ["az-900", "az-104", "az-802", "sc-200", "sc-300", "sc-500", "ai-200", "ai-900", "ai-102"],
      intro: "Microsoft exams are delivered by Pearson VUE, at a test center or online. Role-based exams can include case studies and, unusually, let you search Microsoft Learn during the exam.",
      sections: [
        { h: "How scoring works", points: [
          "Scores are reported on a scale of 1 to 1000, and the passing score is 700 for most exams.",
          "The score is scaled, so 700 is not the same as seventy percent of questions correct. Question weights vary.",
          "Some questions may be unscored items that Microsoft is evaluating. Answer everything as if it counts."
        ] },
        { h: "Question types", points: [
          "Multiple choice, multiple response, drag-and-drop, build-a-list ordering, hot area (click the right part of an image or table) and drop-down completion of statements or code.",
          "Yes/No series: several questions share one scenario, each with a proposed solution. You cannot return to these after answering, so read each proposal carefully.",
          "Case studies on associate and expert exams: a longer scenario with tabs for requirements and existing environment, followed by several questions. Once you leave a case study section you cannot go back to it.",
          "Some exams have included interactive lab tasks. Check the exam's study guide for the current format."
        ] },
        { h: "Open-book access to Microsoft Learn", points: [
          "Role-based and specialty exams let you open Microsoft Learn in a restricted window during the exam. Fundamentals exams such as AZ-900 and AI-900 do not.",
          "The time you spend searching comes out of your exam time. Use it to confirm a specific detail, such as a setting name or limit, not to learn a topic from scratch.",
          "Practise finding things on Microsoft Learn before exam day so you know where the reference pages live."
        ] },
        { h: "Time and pacing", points: [
          "The exam may be split into sections. Before starting a section you are told whether you can return to it, so make sure you are finished before you move on.",
          "Case studies take longer to read. Skim the question first, then look up only the tabs you need.",
          "Microsoft offers a free exam sandbox that shows the interface and question types. It is worth ten minutes before your first exam."
        ] },
        { h: "Test center vs online", points: [
          "At a Pearson VUE test center, bring the ID named in your confirmation and expect a photo and locker for belongings.",
          "Online exams run through Pearson VUE OnVUE with an ID check, workspace photos and a webcam room scan. Keep the desk clear and stay in view.",
          "Breaks are generally not permitted during online exams. Check the current policy in your confirmation, since some exams have had different rules."
        ] },
        { h: "Booking, retakes and renewal", points: [
          "Book through your Microsoft Learn profile, which hands you over to Pearson VUE. Make sure the name on your profile matches your ID.",
          "Microsoft has a retake policy with waiting periods that grow after repeated failures and an annual attempt limit. Check the current policy before booking a retake.",
          "You see pass or fail on screen with a score report that breaks down performance by skill area. The credential appears on your Microsoft Learn profile shortly after.",
          "Role-based certifications (associate and expert) are valid for one year and renew for free by passing an online renewal assessment on Microsoft Learn in the months before expiry. Fundamentals certifications do not expire."
        ] }
      ]
    },
    {
      id: "aws", name: "Amazon Web Services",
      certs: ["aws-cloud-practitioner", "aws-saa", "aws-developer"],
      intro: "AWS exams are delivered by Pearson VUE, at a test center or online, and are almost entirely scenario-based multiple choice and multiple response.",
      sections: [
        { h: "How scoring works", points: [
          "Results are reported as a scaled score from 100 to 1000. The passing score is 700 for Cloud Practitioner and 720 for associate-level exams such as Solutions Architect Associate and Developer Associate.",
          "The exam uses compensatory scoring: you pass on your overall score, not by passing each domain individually.",
          "Each exam includes some unscored questions that AWS is evaluating. They are not marked, so answer everything.",
          "There is no penalty for guessing. Never leave a question unanswered."
        ] },
        { h: "Question types", points: [
          "Multiple choice with one correct answer out of four, and multiple response with two or more correct answers out of five or more. The question says how many to choose.",
          "Newer versions of some exams have added ordering, matching and case-study style items. Check the exam guide for your exam's current question types.",
          "Most questions are short scenarios with constraints like most cost-effective, least operational overhead, or highest availability. The constraint usually decides between two plausible answers."
        ] },
        { h: "Time and pacing", points: [
          "You can flag questions and move freely back and forth, then use the review screen at the end.",
          "Answer every question on the first pass, even if you flag it, so nothing is left blank if time runs out.",
          "If English is not your first language, AWS offers an accommodation that adds extra time. It must be requested before you schedule, so check the current process in your AWS Certification account."
        ] },
        { h: "Test center vs online", points: [
          "At a Pearson VUE test center, bring acceptable ID and expect lockers and a photo.",
          "Online exams use Pearson VUE OnVUE with ID and room checks. Your desk must be clear, and you cannot leave the camera view or take breaks.",
          "Run the system test in advance, preferably on a personal computer on a home network."
        ] },
        { h: "Booking, retakes and results", points: [
          "Book from your AWS Certification account. There are rescheduling and cancellation cut-offs, and a waiting period before a retake after a failed attempt. Check AWS's current policy.",
          "Results usually arrive by email within a few business days, though you may see a result sooner. The score report shows your scaled score and how you performed in each domain.",
          "Passing an AWS exam may earn a discount voucher for your next exam. Look in the Benefits section of your AWS Certification account.",
          "AWS certifications are valid for three years. You recertify by passing the current version of the exam, or in some cases by passing a higher-level exam that covers it."
        ] }
      ]
    },
    {
      id: "google", name: "Google Cloud",
      certs: ["google-cdl", "google-ace"],
      intro: "Google Cloud exams are delivered through Kryterion's Webassessor, either online proctored or at a testing center, and give a pass or fail result rather than a score.",
      sections: [
        { h: "How scoring works", points: [
          "Google Cloud does not publish a passing score and does not give you a numeric score. You receive pass or fail.",
          "Treat every question as counting. Some may be unscored trial items, but you cannot tell which."
        ] },
        { h: "Question types", points: [
          "Multiple choice and multiple select. Multiple-select questions tell you how many answers to choose.",
          "Cloud Digital Leader is aimed at business and technical roles alike. Questions focus on why and when to use Google Cloud products and how they support digital transformation, not on commands.",
          "Associate Cloud Engineer questions are more hands-on in flavour: choosing the right `gcloud` command, IAM role, or service configuration for a scenario. Practical time in the console and Cloud Shell pays off."
        ] },
        { h: "Time and pacing", points: [
          "You can mark questions for review and return to them before submitting.",
          "Many questions include business requirements. Look for the answer that meets them with the most managed, least-effort Google Cloud option, which is usually what the exam favours."
        ] },
        { h: "Test center vs online", points: [
          "Online proctored exams run through Kryterion and require their secure browser plus a system check. You will be asked to show your ID and scan the room with your webcam.",
          "At a testing center, arrive early with valid ID. Personal items are stored away from the testing area.",
          "Breaks are generally not allowed during online exams. Check the current rules in the Google Cloud certification terms before exam day."
        ] },
        { h: "Booking, retakes and results", points: [
          "Book through Webassessor, linked from the Google Cloud certification site. There are cut-offs for rescheduling and cancelling, so check them in your confirmation.",
          "If you do not pass, there are waiting periods before you can retake, and they grow with each attempt. Check the current retake policy before rebooking.",
          "You usually see a provisional result when you finish. The official result and certificate follow by email after Google's review, typically within several days.",
          "Google Cloud certifications are valid for a fixed period, after which you recertify by passing the current exam. Check the certification page for the validity of each certification and when you become eligible to recertify."
        ] }
      ]
    },
    {
      id: "isc", name: "ISC2",
      certs: ["isc2-cc", "sscp", "cissp"],
      intro: "ISC2 exams are delivered at Pearson VUE test centers. The questions are about judgement: what a security professional or manager should do, following ISC2's view of good practice.",
      sections: [
        { h: "How scoring works", points: [
          "Results are reported on a scaled score up to 1000, and the passing score is 700 for CC, SSCP and CISSP.",
          "You receive pass or fail when you finish. If you do not pass, the report ranks your performance by domain to guide further study.",
          "Exams include unscored pretest questions mixed in with the scored ones."
        ] },
        { h: "Question types and format", points: [
          "Mostly multiple choice, with some advanced item types such as drag-and-drop or hotspot on the associate and professional exams.",
          "The CISSP in English is a computerized adaptive test (CAT). The exam picks each question based on your earlier answers and can end once it is confident of the result, so the number of questions you see varies.",
          "On adaptive exams you cannot go back to change earlier answers. Commit to each answer before moving on.",
          "Check the ISC2 exam page for the current length, time limit and delivery format of each exam, as these are updated with new outlines."
        ] },
        { h: "Thinking the ISC2 way", points: [
          "Think like a risk adviser, not a technician. The best answer often protects people first, follows policy, and involves management or the right process rather than a quick technical fix.",
          "For FIRST and BEST questions, look for the answer that comes earliest in the process: understand the situation, assess risk, then act.",
          "Do not feel discouraged if CISSP ends early or late. Stopping at the minimum or running to the maximum says nothing reliable about whether you passed."
        ] },
        { h: "At the test center", points: [
          "Bring the ID named in your confirmation. Expect palm vein or photo capture, lockers for personal items, and strict rules about what is in the room.",
          "On longer exams you can take unscheduled breaks, but the clock keeps running. A short break to stretch and drink water can be worth the time on a long exam.",
          "Online proctoring for ISC2 exams has been limited and varies by exam and region. Check ISC2's current delivery options before you book."
        ] },
        { h: "Booking, retakes and results", points: [
          "Book through ISC2, which links you to Pearson VUE. There are fees and cut-offs for rescheduling and cancelling, and waiting periods before a retake. Check the current policy.",
          "Passing the exam is not the end. SSCP and CISSP require you to complete an endorsement showing your experience, signed by an ISC2 member, and CC requires a short application. You only become certified once that is approved.",
          "Certified members pay an annual maintenance fee and earn continuing professional education (CPE) credits over a three-year cycle to keep the certification active."
        ] }
      ]
    },
    {
      id: "redhat", name: "Red Hat",
      certs: ["rhcsa"],
      intro: "The RHCSA is a fully hands-on exam. There are no multiple-choice questions: you are given a set of systems and a list of tasks, and you are graded on the final state of those systems.",
      sections: [
        { h: "How scoring works", points: [
          "RHCSA is scored out of 300 points, and the passing score is 210.",
          "Grading is done after the exam by checking the systems. What matters is the configuration you leave behind, and that it survives a reboot.",
          "You receive a results email, usually within a few business days, showing your score and performance by objective area."
        ] },
        { h: "What the exam looks like", points: [
          "You work in a real Red Hat Enterprise Linux environment, usually on virtual machines, completing tasks such as managing users and permissions, storage and LVM, networking, services, SELinux, containers and scheduled jobs.",
          "There is no internet access. The documentation installed on the system, such as `man` pages, `--help` output and files under `/usr/share/doc`, is available and worth practising with.",
          "Tasks can depend on each other. If you break networking or the ability to log in, later tasks may become impossible, so be careful with changes that could lock you out.",
          "Some tasks include resetting access or fixing a system that does not boot cleanly. Practise these under time pressure before the exam."
        ] },
        { h: "Time and pacing", points: [
          "Read the whole task list first and do the tasks you are sure of quickly. Leave the fiddly ones for later.",
          "After finishing several tasks, reboot and check that everything still works: mounts come up, services start, SELinux contexts and firewall rules persist.",
          "Leave time at the end for a final reboot and verification. Many failures come from changes that worked live but were not made persistent."
        ] },
        { h: "Test center vs remote", points: [
          "Red Hat exams can be taken remotely on your own computer, booted from a special live USB image that Red Hat provides, or at an approved testing location. Check the current options when you book.",
          "Remote exams have specific hardware requirements, and you need an external webcam as well as a room check. Run the compatibility check well in advance.",
          "Follow the proctor's instructions on breaks. Check the current rules in your confirmation."
        ] },
        { h: "Booking, retakes and next steps", points: [
          "Exams are booked through Red Hat, often bundled with training or a subscription that includes a retake. Check what your purchase includes.",
          "RHCSA is current for three years. You keep it current by passing a newer RHCSA exam or earning further Red Hat certifications, such as RHCE, within that time.",
          "RHCSA is the prerequisite for RHCE, which focuses on automation with Ansible."
        ] }
      ]
    },
    {
      id: "linuxfoundation", name: "The Linux Foundation",
      certs: ["cka", "ckad"],
      intro: "CKA and CKAD are performance-based exams taken online with a remote proctor. You solve tasks in live Kubernetes clusters through a remote desktop, and you can use the official Kubernetes documentation.",
      sections: [
        { h: "How scoring works", points: [
          "Each task is worth a stated weight, shown next to it. Your score is the total of the weights you complete correctly, and partial credit is possible on multi-step tasks.",
          "The passing score is published in the candidate handbook as a percentage. Check the current value before your exam.",
          "Results are emailed after automatic grading, usually within about a day."
        ] },
        { h: "What the exam looks like", points: [
          "Everything is done on the command line with `kubectl` and a text editor, across several clusters. Each task tells you which cluster or context to use; switching context before every task is essential.",
          "You can open the official Kubernetes documentation in the remote desktop browser. Know how to search it quickly and copy YAML examples from it.",
          "Registration includes access to practice simulator sessions that mirror the real environment. Use them, ideally about a week before your exam, and at least once under full timing.",
          "Imperative commands with `--dry-run=client -o yaml` save a lot of typing when you need a manifest to edit."
        ] },
        { h: "Time and pacing", points: [
          "Time is the main challenge. Skip long or low-weight tasks at first and come back, and use the flag feature to remember them.",
          "Do not spend a long time chasing one broken task. Move on and return if time allows.",
          "Verify each task with a quick `kubectl get` or `describe` before moving on. A typo in a name or namespace costs the whole task."
        ] },
        { h: "Online proctoring", points: [
          "The exam is taken through a secure browser on your own computer. You need a working webcam, microphone and a supported operating system, and you must pass a system check.",
          "The proctor will ask you to show your ID and scan the room and desk. The desk must be clear, and you must stay alone and in view throughout.",
          "Only the exam and the permitted documentation may be open. Close other applications before starting, and read the candidate handbook for the current list of allowed resources."
        ] },
        { h: "Booking, retakes and renewal", points: [
          "Registration has historically included one free retake if you do not pass. Check the current terms when you buy.",
          "You have a period after purchase in which to schedule and take the exam. Note the deadline in your account.",
          "The certification is valid for a fixed period, after which you recertify by passing the current exam. Check the Linux Foundation certification page for the current validity."
        ] }
      ]
    },
    {
      id: "pythoninstitute", name: "Python Institute (OpenEDG)",
      certs: ["pcep", "pcap"],
      intro: "The Python Institute exams test how well you can read and reason about Python code. Most questions show a short snippet and ask what it does or what it prints.",
      sections: [
        { h: "How scoring works", points: [
          "The passing score is published as a percentage on each exam page. Check the current value for your exam.",
          "You see your result when the exam ends, and a detailed score report is available in your OpenEDG account."
        ] },
        { h: "Question types", points: [
          "Single-choice and multiple-choice questions, plus types such as drag-and-drop, gap fill and code insertion, depending on the exam.",
          "Many questions ask for the output of a code snippet or whether it raises an error. Trace the code line by line on paper or in your head and watch for off-by-one ranges, integer vs float division, mutability and scoping.",
          "Questions test exact behaviour, so small details matter: a missing colon, the difference between `is` and `==`, or where a `return` sits in a loop."
        ] },
        { h: "Time and pacing", points: [
          "Code tracing is slower than reading prose. Move past a long snippet if it is eating time and return to it at the end.",
          "Use any scratch paper or whiteboard you are allowed to track variable values as you trace."
        ] },
        { h: "Where you take it", points: [
          "PCEP is delivered through the OpenEDG Testing Service. PCAP is delivered through Pearson VUE, at a test center or online. Check the current delivery options on each exam page when you buy.",
          "For proctored exams, expect the usual ID check, and for online exams a room scan and clear-desk rules.",
          "Read the instructions that come with your voucher carefully, as the process differs between the two delivery channels."
        ] },
        { h: "Booking, retakes and next steps", points: [
          "Exams are bought as vouchers. Check the voucher expiry date and the retake rules, which differ by exam and delivery channel.",
          "Python Institute certifications have historically not required renewal. Check the current validity on the exam page.",
          "PCEP leads naturally to PCAP, and PCAP to the professional-level PCPP exams."
        ] }
      ]
    },
    {
      id: "oracle", name: "Oracle",
      certs: ["java-se"],
      intro: "Oracle Java exams are known for detailed code questions. Expect many snippets where the answer turns on precise language rules, including whether the code compiles at all.",
      sections: [
        { h: "How scoring works", points: [
          "The passing score is published on the exam page as a percentage. Check the current value for your exam.",
          "You see pass or fail when you finish, and your full result appears in Oracle's certification system afterwards."
        ] },
        { h: "Question types", points: [
          "Multiple choice with a single answer and multiple response where the question tells you how many to choose.",
          "Many questions show code and ask what it prints, which lines fail to compile, or which change would make it work. Always consider compile errors and runtime exceptions as possible answers.",
          "Read every line of the snippet, including imports, access modifiers and generics. The trick is often in a small detail."
        ] },
        { h: "Time and pacing", points: [
          "Code questions are slow. Aim to answer quickly the ones you know, flag the long ones, and return with the time you saved.",
          "You can mark questions for review and return to them before submitting."
        ] },
        { h: "Where you take it", points: [
          "Oracle exams are delivered through Oracle's own online proctored testing, and in some regions at test centers. Check current options when you register.",
          "For online exams, expect an ID check, a room scan and clear-desk rules. Run the system check in advance."
        ] },
        { h: "Booking, retakes and next steps", points: [
          "You register through Oracle University. There is a waiting period before a retake and limits on attempts. Check the current policy before booking.",
          "Your certification, badge and verification details appear in Oracle's certification system after processing.",
          "Java certifications are tied to a specific Java version. Check Oracle's current policy on validity and when a newer version exam is recommended."
        ] }
      ]
    },
    {
      id: "hashicorp", name: "HashiCorp",
      certs: ["terraform"],
      intro: "The Terraform Associate exam is an online proctored, multiple-choice exam focused on how Terraform works and how you use it day to day.",
      sections: [
        { h: "How scoring works", points: [
          "You receive pass or fail. HashiCorp does not publish a numeric passing score.",
          "Results are usually shown at the end of the exam, with confirmation and the badge following by email."
        ] },
        { h: "Question types", points: [
          "Multiple choice, multiple answer, true or false, and short text-entry items where you type a command or value.",
          "Questions often test exact behaviour of commands such as `terraform init`, `plan`, `apply`, `import` and `state`, and how state, providers, modules and variables work.",
          "Hands-on practice with the CLI is the best preparation. Many questions are easy if you have seen the output and hard if you have only read about it."
        ] },
        { h: "Time and pacing", points: [
          "The exam is relatively short. Most questions are quick, so keep moving and use the review option for anything uncertain.",
          "Watch for Terraform Cloud and HCP Terraform questions, which test features beyond the open-source CLI."
        ] },
        { h: "Online proctoring", points: [
          "The exam is delivered online through HashiCorp's exam partner. You need a webcam, a supported browser, and a quiet private room.",
          "Expect an ID check and a room scan. Keep your desk clear, and do not leave the camera view.",
          "Run the system check before exam day and read HashiCorp's current exam handbook for rules on breaks and allowed items."
        ] },
        { h: "Booking, retakes and renewal", points: [
          "Book through HashiCorp's certification site. Check the current rescheduling and retake rules before you book.",
          "The certification is valid for a fixed period, after which you recertify by passing the current exam version. Check the exam page for the current validity."
        ] }
      ]
    },
    {
      id: "juniper", name: "Juniper Networks",
      certs: ["jncia-junos"],
      intro: "The JNCIA-Junos exam is a multiple-choice exam delivered by Pearson VUE, covering Junos fundamentals, the CLI and basic routing and policy.",
      sections: [
        { h: "How scoring works", points: [
          "You receive pass or fail at the end of the exam. Check Juniper's candidate agreement and exam page for current scoring details.",
          "If you do not pass, the score report shows your performance by objective to guide your next round of study."
        ] },
        { h: "Question types", points: [
          "Multiple choice with single and multiple answers. Some questions include CLI output or configuration snippets.",
          "Know the Junos CLI modes, the candidate and active configuration, `commit` and `rollback`, and how to read `show` output and hierarchical configuration.",
          "Practice on a Junos virtual lab so that configuration structure and command syntax feel familiar."
        ] },
        { h: "Time and pacing", points: [
          "Questions are generally short. Keep a steady pace and flag anything you want to revisit, if review is available on your exam.",
          "Read configuration snippets carefully, including the hierarchy level where each statement sits."
        ] },
        { h: "Test center vs online", points: [
          "Exams can be taken at a Pearson VUE test center or online through OnVUE, depending on availability. Online exams require the usual ID check and room scan.",
          "Breaks are generally not allowed during online exams. Check the rules in your confirmation."
        ] },
        { h: "Booking, retakes and renewal", points: [
          "Book through Pearson VUE. Check Juniper's current retake policy, which includes a waiting period after a failed attempt.",
          "JNCIA-Junos is valid for a fixed period, typically renewed by passing the current exam or a higher-level Juniper exam. Check Juniper's recertification page for the current rules."
        ] }
      ]
    },
    {
      id: "cwnp", name: "CWNP",
      certs: ["cwna"],
      intro: "The CWNA exam is a multiple-choice, vendor-neutral wireless exam delivered by Pearson VUE. It rewards a solid grasp of radio frequency fundamentals and 802.11 behaviour.",
      sections: [
        { h: "How scoring works", points: [
          "The passing score is published as a percentage on the exam page. Check the current value before you sit the exam.",
          "You see pass or fail at the end, with a score report showing performance by objective."
        ] },
        { h: "Question types", points: [
          "Multiple choice with single and multiple answers. Some questions include diagrams, frame captures or spectrum views.",
          "Expect questions that need calculations or reasoning, such as decibel maths, channel planning and data rates. Practise these until they are quick.",
          "Questions are vendor neutral. Answer from the 802.11 standard and CWNP study material, not from the behaviour of one vendor's equipment."
        ] },
        { h: "Time and pacing", points: [
          "Do the quick recall questions first and return to calculation questions. Use scratch material if it is allowed.",
          "Flag and review questions if the exam interface allows it."
        ] },
        { h: "Test center vs online", points: [
          "Exams are delivered by Pearson VUE, at a test center or online where available. Online exams require an ID check and a room scan.",
          "Check the current break rules and allowed items in your confirmation."
        ] },
        { h: "Booking, retakes and renewal", points: [
          "Buy a voucher from CWNP or a reseller and schedule with Pearson VUE. Check CWNP's current retake policy.",
          "CWNA is valid for a fixed period, typically three years. Renew by passing the current exam or earning a higher-level CWNP certification. Check CWNP's recertification page for the current rules."
        ] }
      ]
    },
    {
      id: "paloalto", name: "Palo Alto Networks",
      certs: ["palo-alto-ngfw"],
      intro: "The Next-Generation Firewall Engineer exam is delivered by Pearson VUE and focuses on deploying, configuring and managing Palo Alto Networks firewalls, often through practical scenarios.",
      sections: [
        { h: "How scoring works", points: [
          "You receive pass or fail at the end of the exam. Palo Alto Networks does not always publish a fixed passing score, so check the exam page and candidate guide.",
          "Exams may include unscored items under evaluation."
        ] },
        { h: "Question types", points: [
          "Mainly multiple choice with single and multiple answers. Some questions use screenshots of the management interface or configuration output.",
          "Scenario questions ask which configuration or feature solves a problem, so know where settings live in PAN-OS and Panorama and how policies are evaluated.",
          "Hands-on time with a lab firewall or virtual firewall helps a great deal with interface-based questions."
        ] },
        { h: "Time and pacing", points: [
          "Keep a steady pace and use flag-and-review if it is available, returning to long screenshot questions at the end.",
          "Read policy and NAT questions carefully. Rule order and zone direction often decide the answer."
        ] },
        { h: "Test center vs online", points: [
          "Exams can be taken at a Pearson VUE test center or online through OnVUE. Online exams require an ID check, workspace photos and a room scan.",
          "Breaks are generally not allowed during online exams. Check your confirmation for current rules."
        ] },
        { h: "Booking, retakes and renewal", points: [
          "Book through Palo Alto Networks' certification site and Pearson VUE. Check the current retake waiting periods before rebooking.",
          "The certification is valid for a fixed period. Check Palo Alto Networks' certification policy for the current validity and recertification options."
        ] }
      ]
    },
    {
      id: "fortinet", name: "Fortinet",
      certs: ["fortinet-fortigate"],
      intro: "The FortiGate administrator exam is delivered by Pearson VUE and tests day-to-day FortiOS administration, from firewall policies and NAT to VPNs, security profiles and troubleshooting.",
      sections: [
        { h: "How scoring works", points: [
          "You receive pass or fail when you finish. Check the Fortinet Training Institute exam page for current scoring details.",
          "The score report shows how you did in each topic area, which helps if you need a retake."
        ] },
        { h: "Question types", points: [
          "Mostly multiple choice with single and multiple answers. Many questions show FortiGate GUI screenshots, CLI output or debug output and ask you to interpret them.",
          "Know the common diagnostic commands and what their output means. Troubleshooting questions often hinge on one line of a debug flow or session table.",
          "Questions are tied to a specific FortiOS version. Study the version your exam covers, as defaults and menus change between releases."
        ] },
        { h: "Time and pacing", points: [
          "Screenshot and output questions take longer to read. Answer the short recall questions quickly to bank time.",
          "Use flag-and-review if your exam allows it, and check the review screen for unanswered questions before you finish."
        ] },
        { h: "Test center vs online", points: [
          "Exams can be taken at a Pearson VUE test center or online through OnVUE with an ID check and room scan.",
          "Breaks are generally not allowed during online exams. Check your confirmation for current rules."
        ] },
        { h: "Booking, retakes and renewal", points: [
          "Book through the Fortinet Training Institute and Pearson VUE. Check the current retake policy before rebooking.",
          "Fortinet certifications are valid for a fixed period. Check the Fortinet Training Institute's certification policy for the current validity and how to recertify."
        ] }
      ]
    }
  ]
});
