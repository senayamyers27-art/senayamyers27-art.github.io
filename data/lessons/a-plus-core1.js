/* Lessons for CompTIA A+ Core 1 (220-1201): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("a-plus-core1", [
 {
  "t": "Laptop hardware replacement: battery, keyboard, RAM (SODIMM vs soldered), storage (2.5-inch, M.2 SATA vs NVMe), wireless cards and antennas",
  "body": [
   "Laptops pack a whole PC into a thin case, so most parts are smaller, more integrated and harder to reach than in a desktop. As a technician you are expected to know which parts are usually field-replaceable, how to get to them safely and which ones are not worth replacing at all. The A+ exam treats laptop repair as a practical skill: it describes a symptom or an upgrade request and asks which part to replace, which part will fit, or what you should have checked before promising the customer anything.",
   "Safety and preparation come first. Shut the laptop down fully rather than putting it to sleep, unplug the AC adapter, and disconnect or disable the internal battery if the service manual says to; some models have a battery disconnect option in the firmware setup for exactly this purpose. Use an ESD (electrostatic discharge) strap or mat, because static you cannot feel can still damage memory and the motherboard. Always find the manufacturer's service manual first. It shows the screw locations, the order of disassembly and any hidden clips. Keep screws organized by location, since laptops often use several lengths and a long screw in the wrong hole can punch through the board. Ribbon (flex) cables use small ZIF (zero insertion force) connectors with a latch that you flip up before you slide the cable out.",
   "Batteries on older laptops slid out from the outside. Most modern laptops use an internal lithium-ion or lithium-polymer battery held in with screws or adhesive. Replace a battery only with the exact model the vendor specifies, and never puncture, bend or pry against a swollen battery; a swollen pack is a fire risk, should be removed carefully and must be recycled through proper channels rather than thrown away. Keyboards vary widely. Some come out from the top after releasing a few clips and a ribbon cable, while others are riveted or glued to the palm-rest assembly, so the whole top case is replaced as one part.",
   "Laptop memory uses the SODIMM (small outline dual inline memory module) form factor, which is roughly half the length of a desktop DIMM. You insert it at an angle, press it down until the side clips snap in, and it must match the generation the board supports, such as DDR4 or DDR5, because the notch positions differ and the module will not seat in the wrong slot. Many thin laptops have some or all RAM soldered to the motherboard. Soldered RAM cannot be upgraded; if it fails, the fix is a motherboard replacement. Some designs mix the two, with a fixed amount soldered on and one empty SODIMM slot. Check the specifications before promising a customer an upgrade.",
   "Storage comes in two main shapes. A 2.5-inch drive is either a spinning HDD (hard disk drive) or a SATA SSD (solid-state drive) and connects through a SATA connector or adapter. M.2 is a small card form factor held by one screw. An M.2 card can speak either SATA or NVMe (Non-Volatile Memory Express). NVMe runs over PCIe (Peripheral Component Interconnect Express) lanes and is much faster than SATA, but the slot must support it. M.2 SATA drives usually have a B+M key (two notches), while NVMe drives usually have a single M key notch. A drive that physically fits is not guaranteed to work, so check which protocol the slot supports. Wi-Fi and Bluetooth usually share one small M.2 wireless card with tiny antenna connectors that snap onto thin coaxial leads. Those leads run up through the hinge and around the display bezel, because the lid is the highest point and gives the best reception. Note which lead goes to which connector, often labeled main and aux, before removing them.",
   "Consider a worked example. A customer's three-year-old laptop is slow and runs out of memory. You check the service manual and find 8 GB soldered plus one empty DDR4 SODIMM slot, and a 2.5-inch HDD. You recommend adding a matching 8 GB DDR4 SODIMM and replacing the HDD with an SSD. The manual shows an unused M.2 slot that supports NVMe, so you choose an M-key NVMe drive, clone the old disk, and install it. After reassembly Wi-Fi is weak; you reopen the base, find the aux antenna lead disconnected, snap it back on, and signal strength returns to normal.",
   "Common mistakes: assuming any M.2 drive works in any M.2 slot; ordering DDR5 for a DDR4 board or a desktop DIMM for a laptop; promising a RAM upgrade on a machine with fully soldered memory; forgetting to disconnect the battery before working near the board; and leaving antenna leads loose or pinched after a screen or card replacement. Another trap is prying at a swollen battery to get it out faster. Slow down, follow the manual and treat the battery as a hazard.",
   "Exam questions are usually worded as fit-versus-function puzzles. 'The new drive is detected in BIOS but not in the OS' or 'the M.2 drive is not detected at all' points to a SATA versus NVMe mismatch. 'Customer wants more RAM on an ultrathin model' makes you check for soldered memory. 'Wi-Fi weak after a display repair' points to antenna leads. 'Laptop battery is bulging and the touchpad is lifting' points to a swollen battery that must be replaced, not reused."
  ],
  "terms": [
   [
    "SODIMM",
    "Small outline dual inline memory module, the short memory module used in laptops and small form factor PCs."
   ],
   [
    "Soldered RAM",
    "Memory permanently attached to the motherboard that cannot be upgraded or replaced separately."
   ],
   [
    "M.2",
    "A small card form factor for SSDs and wireless cards that can carry SATA or PCIe signals depending on the slot."
   ],
   [
    "NVMe",
    "Non-Volatile Memory Express, a storage protocol that runs over PCIe lanes and is much faster than SATA."
   ],
   [
    "B+M key",
    "An M.2 edge with two notches, typical of M.2 SATA SSDs."
   ],
   [
    "ZIF connector",
    "Zero insertion force connector with a latch that clamps a flat ribbon cable."
   ],
   [
    "Antenna leads",
    "Thin coaxial cables that connect the wireless card to antennas in the display bezel."
   ]
  ],
  "example": "A help desk receives a laptop whose touchpad has started lifting and clicking by itself. The technician removes the bottom cover and finds a swollen lithium-polymer battery pushing up against the palm rest. They power down, avoid pressing or bending the pack, remove it following the service manual, order the exact vendor part number, and send the old battery to the approved battery recycling bin.",
  "tip": "A part that fits is not always a part that works: an M.2 SATA drive in an NVMe-only slot or DDR5 in a DDR4 board will fail. Soldered RAM means no upgrade path.",
  "check": [
   [
    "A customer bought an M.2 SSD with B and M notches, and the laptop's M.2 slot supports only NVMe. What is the problem?",
    "A B+M key drive is usually M.2 SATA, and an NVMe-only slot cannot use the SATA protocol, so it will not be detected even though it fits."
   ],
   [
    "Why might you be unable to upgrade the memory in a thin laptop?",
    "Its RAM may be soldered to the motherboard, leaving no SODIMM slot to add or replace modules."
   ],
   [
    "After a screen replacement the laptop's Wi-Fi signal is much weaker. What should you check first?",
    "The antenna leads routed through the hinge and bezel, which may be pinched or not reconnected to the wireless card."
   ],
   [
    "What should you do before disconnecting components on a laptop motherboard?",
    "Shut down, unplug AC power, disconnect or disable the internal battery per the service manual, and use ESD protection."
   ]
  ]
 },
 {
  "t": "Screen parts: LCD vs OLED panels, backlight, digitizer/touch layer, webcam and microphone placement in the bezel",
  "body": [
   "A laptop or phone display is a stack of layers, and knowing the stack tells you which part to replace when something goes wrong. At the back is the panel that creates the image. On top of it may sit a touch layer called the digitizer, and on top of that a protective cover glass. Around the edge is the bezel, the frame that also houses the webcam, microphones and usually the Wi-Fi antennas. The display connects to the motherboard through a cable bundle that passes through the hinge.",
   "An LCD (liquid crystal display) does not make its own light. Liquid crystals act like shutters that block or pass light, and color filters create red, green and blue subpixels. Light comes from a backlight behind the panel. Modern LCDs use LED (light-emitting diode) backlights. Older laptops used a CCFL (cold cathode fluorescent lamp) backlight that needed an inverter board to convert low-voltage DC into the high-voltage AC the lamp required. If a screen shows a very dim image that you can see with a flashlight held against it, the panel is drawing the picture and the backlight or its power is the problem. On a CCFL laptop that means the lamp or inverter; on an LED model it usually means the backlight circuit, a fuse, or the panel assembly.",
   "An OLED (organic light-emitting diode) panel has no backlight. Each pixel produces its own light and can switch fully off, so OLED gives true blacks, high contrast and thinner, lighter screens. The trade-offs are cost and the risk of burn-in, where a static image such as a taskbar leaves a faint permanent ghost after long use. Because OLED has no backlight, the flashlight test does not apply: a dim or dark OLED screen points to a brightness setting, a power issue, the display cable or a panel fault rather than a failed lamp or inverter.",
   "The digitizer converts touch into coordinates. Most phones and tablets use capacitive touch, which senses the electrical charge of a finger, so it will not respond to an ordinary glove. On many devices the digitizer is bonded to the cover glass, and on some it is laminated to the display itself, so a cracked screen may mean replacing the whole assembly rather than just the glass. The classic symptom split is useful: if the image looks fine but touch does not respond in one area, suspect the digitizer; if touch works but the image is broken, lined or blank, suspect the panel. If touches register in the wrong place, calibration or a driver problem is more likely than hardware.",
   "The webcam and microphones sit in the top bezel so they face the user, and the antenna leads run beside them. The camera usually connects through a small cable that shares the display cable bundle passing through the hinge. That hinge path is a common failure point: repeated opening and closing can wear the cable, producing a flickering screen that changes as you move the lid, a camera that disappears from Device Manager or a microphone that cuts out when the lid moves. Some laptops also have a physical camera shutter or a function key that disables the camera, which can look like a hardware failure.",
   "Consider a worked example. A user says their laptop screen went nearly black overnight. You shine a flashlight at an angle onto the display and can faintly see the desktop icons. That tells you the LCD panel is creating the image but no light is coming from behind it, so the backlight circuit has failed. You confirm with an external monitor, which works normally, proving the graphics hardware is fine. You order the correct LED LCD panel for the model, disconnect the battery, remove the bezel carefully, and when fitting the new panel you reseat the webcam cable and route the antenna leads so they are not pinched.",
   "Common mistakes: applying the flashlight test to an OLED screen, which has no backlight; ordering only cover glass when the digitizer is bonded to it; blaming the panel for a touch problem when the image is fine; forgetting to reconnect the camera and antennas after a display swap; and replacing a screen when the real fault is a worn hinge cable that flickers only at certain lid angles.",
   "Exam questions use symptom wording. 'Very dim image visible with a flashlight' means backlight, or the inverter on an older CCFL model. 'Image fine but touch dead in one corner' means digitizer. 'Flicker or camera loss when the lid moves' means the display or camera cable in the hinge. 'Ghost of a taskbar stays on the screen' means OLED burn-in or image persistence. 'External monitor works but built-in does not' isolates the fault to the laptop's display assembly."
  ],
  "terms": [
   [
    "LCD",
    "Liquid crystal display, a panel that uses crystals as light shutters and needs a separate backlight."
   ],
   [
    "OLED",
    "Organic light-emitting diode display in which each pixel emits its own light, so no backlight is needed."
   ],
   [
    "Backlight",
    "The light source behind an LCD panel, usually LEDs in modern screens."
   ],
   [
    "Inverter",
    "A board in older CCFL-backlit laptops that supplies high-voltage power to the fluorescent lamp."
   ],
   [
    "Digitizer",
    "The touch-sensing layer that converts finger or pen contact into screen coordinates."
   ],
   [
    "Bezel",
    "The frame around the display that holds the webcam, microphones and wireless antennas."
   ],
   [
    "Burn-in",
    "A permanent faint ghost image on an OLED screen caused by long display of static content."
   ]
  ],
  "example": "A field sales rep reports that her tablet's screen shows everything clearly, but tapping the top-left corner does nothing. The technician checks for a stuck screen protector and a pending update, then runs the manufacturer's touch test, which shows a dead zone in that corner. Because the image is perfect, the panel is fine; the digitizer, which on this model is bonded to the cover glass, is replaced as one assembly.",
  "tip": "Dim image visible with a flashlight means backlight (or inverter on CCFL). OLED has no backlight, so that diagnosis does not apply. Good image with bad touch points to the digitizer.",
  "check": [
   [
    "A laptop shows a very faint image only when you shine a flashlight on it. What has most likely failed?",
    "The backlight or its power circuit, since the LCD panel is still forming the image; on older CCFL models the inverter is a likely cause."
   ],
   [
    "Why can an OLED screen not have a backlight failure?",
    "OLED pixels produce their own light, so there is no backlight; dimness points to settings, power, the cable or the panel."
   ],
   [
    "A phone's picture is fine but part of the screen ignores taps. Which component is suspect?",
    "The digitizer, the touch layer, because the display panel is producing a normal image."
   ],
   [
    "The webcam disappears from Device Manager whenever the lid is tilted back. What is the likely cause?",
    "A worn or loose cable running through the hinge to the camera in the top bezel."
   ]
  ]
 },
 {
  "t": "Physical privacy and security: biometrics, privacy screens, NFC-based security",
  "body": [
   "Mobile devices go everywhere their users go, which makes them easy to lose, easy to shoulder-surf and easy to steal. Physical privacy and security controls protect the device and the data on it at the point where a person physically interacts with it. The A+ exam expects you to know the common controls, what threat each addresses and how to recommend the right one for a scenario. The key habit is to match the control to the threat rather than picking whichever sounds most secure.",
   "Biometrics authenticate you by something you are rather than something you know or have. Common laptop and phone options are fingerprint readers, often built into the power button or a key, and facial recognition. On Windows, facial and fingerprint sign-in are part of Windows Hello, and Windows Hello face sign-in uses an infrared camera so it can tell a real face from a photo. Biometrics are convenient and hard to share, but they are not perfect: sensors can fail with wet or cut fingers, and you cannot change your fingerprint if a template were ever exposed. Devices therefore always keep a PIN or password as a fallback, and the biometric template is normally stored locally in protected hardware rather than as a picture. When enrolling a user, register more than one finger in case of a cut or bandage.",
   "A privacy screen, also called a privacy filter, is a thin film or clip-on panel that narrows the viewing angle. The user looking straight at the display sees normally, while someone to the side sees a dark or blank screen. Some laptops have a built-in electronic privacy mode that does the same thing at the press of a key. Privacy screens defend against shoulder surfing, where someone reads sensitive information over your shoulder in an airport, coffee shop or open office. They do nothing against someone who picks up an unlocked device, so pair them with a short screen lock timeout so an unattended device locks itself.",
   "NFC (near-field communication) is a very short-range radio, typically working within a few centimeters. Because you must hold the devices almost touching, it is well suited to deliberate actions. In security it shows up as tap-to-pay with a phone, smart badges and cards that unlock doors or sign in to a PC when tapped on a reader, and hardware security keys that support NFC for MFA (multifactor authentication). The short range reduces the chance of casual eavesdropping, but it is not a guarantee. Lost NFC badges should be revoked promptly, and phones can require the screen to be unlocked or a biometric check before a payment is allowed.",
   "Other physical controls round out the picture. A cable lock anchors a laptop to a desk through a security slot. Webcam covers or shutters block the camera when not in use. Full-disk encryption, such as BitLocker on Windows or FileVault on macOS, protects data if the device is stolen, and remote wipe through MDM (mobile device management) lets you erase a lost device. Together these form layers: biometrics and PINs stop casual access, privacy screens stop viewing, locks stop theft and encryption protects the data if the other layers fail. This layered approach is often called defense in depth.",
   "Consider a worked example. A finance team is starting to work from trains and cafes, and managers worry about three things: strangers reading spreadsheets, laptops left on tables, and employees writing passwords on sticky notes. You recommend privacy filters for the shoulder-surfing risk, a screen lock after a short idle period, Windows Hello fingerprint sign-in with a PIN fallback so users stop writing down long passwords, NFC-capable security keys for MFA, and full-disk encryption plus MDM remote wipe for the risk of a lost laptop. Each recommendation maps to a specific threat.",
   "Common mistakes: recommending a privacy screen when the problem is theft, or a cable lock when the problem is shoulder surfing; believing biometrics remove the need for a PIN or password; assuming NFC's short range makes it immune to misuse, so lost badges are never revoked; and treating encryption as a way to stop someone from stealing the device, when it only protects the data after the device is gone.",
   "Exam questions tend to describe a place and a worry. 'Employees working in public areas where others can see their screens' means a privacy screen. 'Laptops disappearing from open desks' means cable locks. 'Tap a badge on a reader to sign in' means NFC or smart card. 'Sign in with a fingerprint or face' means biometrics, with a PIN as the fallback. 'Protect data on a lost device' means encryption and remote wipe."
  ],
  "terms": [
   [
    "Biometrics",
    "Authentication based on a physical trait such as a fingerprint or face."
   ],
   [
    "Windows Hello",
    "The Windows feature that allows sign-in with face, fingerprint or a device PIN."
   ],
   [
    "Privacy screen",
    "A filter or built-in mode that narrows a display's viewing angle so people to the side cannot read it."
   ],
   [
    "Shoulder surfing",
    "Watching someone's screen or keyboard to steal information or credentials."
   ],
   [
    "NFC",
    "Near-field communication, a radio that works over a few centimeters for payments, badges and security keys."
   ],
   [
    "Cable lock",
    "A steel cable that secures a laptop to furniture through its security slot."
   ],
   [
    "Full-disk encryption",
    "Encryption of an entire drive so data is unreadable without the key if the device is stolen."
   ]
  ],
  "example": "A hospital lets nurses unlock shared workstations by tapping their NFC ID badge and then entering a short PIN. Screens in the hallway carts have privacy filters so visitors cannot read patient records, and the carts are locked in place with cable locks. When a nurse loses a badge, the help desk disables it in the badge system immediately, so a finder cannot use it to sign in.",
  "tip": "Match the control to the threat: shoulder surfing means privacy screen; laptop stolen from a desk means cable lock; lost device data means encryption plus remote wipe; convenient sign-in means biometrics with a PIN fallback.",
  "check": [
   [
    "Staff working in an airport lounge are worried people can read their screens. What should you recommend?",
    "A privacy screen or built-in privacy mode, which limits the viewing angle, plus a short screen lock timeout."
   ],
   [
    "Why does a device that supports fingerprint sign-in still require a PIN or password?",
    "As a fallback when the sensor fails or the finger cannot be read, and because biometrics are not changeable if compromised."
   ],
   [
    "What makes NFC suitable for tap-to-pay and badge sign-in?",
    "Its very short range of a few centimeters, which requires a deliberate tap and reduces casual interception."
   ],
   [
    "Which control protects the data on a laptop after it has been stolen?",
    "Full-disk encryption, ideally combined with remote wipe through device management."
   ]
  ]
 },
 {
  "t": "Mobile ports and accessories: USB-C, Lightning, micro-USB, docking stations and port replicators",
  "body": [
   "Mobile devices have few physical ports, so knowing the connectors, what they can carry and how to extend them is a core technician skill. On the exam you will be shown or described a connector and asked to identify it, or given a user's goal, such as one cable to power and connect two monitors, and asked to pick the right port or accessory. The central idea is that a connector's shape and the features it carries are two different things.",
   "USB-C is the small, oval, reversible connector that now dominates laptops, tablets and phones. Because it is reversible, it plugs in either way up. The connector shape is separate from what travels over it: a USB-C port may carry USB data at various speeds, USB PD (Power Delivery) for charging, DisplayPort video through alternate mode, or Thunderbolt on supported systems. That is why two USB-C ports on the same laptop can behave differently, so look for icons beside the port, such as a lightning-bolt Thunderbolt symbol, a DisplayPort symbol or a charging symbol, and check the specifications. Cables matter too; a cheap charge-only cable may not carry data or video at all, and some cables are rated for less power than a large laptop needs.",
   "Lightning is Apple's proprietary 8-pin reversible connector, used on iPhones and some iPads and accessories for many years. Newer Apple devices have moved to USB-C, so you will see both in the field. Micro-USB is the older, small, trapezoid-shaped connector used on many earlier Android phones and small gadgets such as headsets and battery packs. It is not reversible, which makes it easy to damage by forcing it in upside down, and it offers slower charging and data than USB-C. Mini-USB is an even older, slightly larger connector found on legacy devices such as older cameras and GPS units. Adapters exist between many of these, but an adapter cannot add features the device itself does not support.",
   "A docking station gives a laptop a desktop experience through a single connection. Older business laptops used a proprietary dock connector on the underside; modern docks usually connect over USB-C or Thunderbolt. A dock typically provides power to charge the laptop, several USB ports, wired Ethernet, one or more video outputs and audio, and some older docks included drive bays. A port replicator is a simpler, often smaller device that just duplicates the laptop's ports so you can leave cables plugged in; it usually lacks extras such as expansion bays or its own charging. In practice the terms are used loosely, but on the exam a docking station is the fuller-featured option.",
   "When a dock misbehaves, work from the basics. Confirm that the laptop's USB-C port supports video and power delivery, not just data. Check that the dock's own power adapter is connected and large enough to charge the laptop, that the dock firmware and the laptop's drivers and BIOS are current, and that the display cables are seated. If external monitors stay blank but USB devices on the dock work, the port may not support video output or the dock may need a display driver. If the laptop shows a slow-charging warning, the dock or cable cannot supply enough wattage.",
   "Consider a worked example. An office buys USB-C docks so employees can connect two monitors, a keyboard, a mouse and Ethernet with one cable. On most laptops everything works, but on one older model the keyboard and mouse work while both monitors stay black. You check the laptop's specification sheet and see that its USB-C port supports data and charging only, with no DisplayPort alternate mode or Thunderbolt. The fix is not a new cable or driver; that laptop needs a different dock that uses its HDMI port for video, or a model with a video-capable USB-C port.",
   "Common mistakes: assuming every USB-C port carries video, charging and Thunderbolt; using a charge-only cable for data; forcing a micro-USB plug in upside down and breaking the port; confusing Lightning, which is Apple-only, with USB-C; and troubleshooting a dock's monitors for an hour before checking whether the laptop's port even supports display output. Also remember that a dock's power adapter must be sized for the laptop, or the battery may drain slowly while plugged in.",
   "Exam questions often hinge on capability wording. 'Monitors connected through the dock stay blank but USB works' points to a port without video support. 'One connector for power, video, network and USB' points to a docking station. 'Simply duplicates the ports so cables can stay connected' points to a port replicator. 'Proprietary Apple connector' means Lightning, and 'older, non-reversible small connector on an Android phone' means micro-USB."
  ],
  "terms": [
   [
    "USB-C",
    "A small, reversible connector that can carry USB data, power delivery, video and Thunderbolt depending on the port."
   ],
   [
    "USB Power Delivery",
    "A USB charging standard that negotiates higher power levels over USB-C."
   ],
   [
    "Alternate mode",
    "A USB-C feature that sends non-USB signals such as DisplayPort video over the connector."
   ],
   [
    "Lightning",
    "Apple's proprietary 8-pin reversible connector used on many iPhones and accessories."
   ],
   [
    "Micro-USB",
    "An older, small, non-reversible connector common on earlier Android phones and small gadgets."
   ],
   [
    "Docking station",
    "A device that gives a laptop power, video, network and many ports through one connection."
   ],
   [
    "Port replicator",
    "A simpler device that duplicates a laptop's ports without the extras of a full dock."
   ]
  ],
  "example": "A designer's new laptop has three USB-C ports, but only one has a small Thunderbolt icon. Her Thunderbolt dock drives two 4K monitors when plugged into that port, but only runs USB devices from the others. The technician labels the correct port, explains that the connector shape is the same but the capabilities differ, and adds a note to the asset record so future support calls go faster.",
  "tip": "USB-C is a connector shape, not a guarantee of features. Questions often hinge on a port or cable that does not support video, charging or Thunderbolt. Lightning is Apple-only; micro-USB is the older non-reversible one.",
  "check": [
   [
    "Why might a USB-C dock provide USB devices but no video on a certain laptop?",
    "That laptop's USB-C port may not support DisplayPort alternate mode or Thunderbolt, so it cannot send video."
   ],
   [
    "What is the main difference between a docking station and a port replicator?",
    "A docking station is fuller featured, typically adding power, network, multiple video outputs and more; a port replicator mostly duplicates existing ports."
   ],
   [
    "Which connector is Apple's proprietary 8-pin reversible port?",
    "Lightning."
   ],
   [
    "A user keeps damaging the charging port on an older phone by forcing the cable in. Which connector is likely involved and why?",
    "Micro-USB, because it is not reversible and only fits one way."
   ]
  ]
 },
 {
  "t": "Accessories: touch pens/stylus, headsets, speakers, webcams, trackpads and drawing pads",
  "body": [
   "Accessories extend what a mobile device can do, and supporting them is a daily task for a technician. Most connect in one of three ways: a wired USB connection, Bluetooth, or a built-in interface such as the 3.5 mm headphone jack. Knowing how each accessory connects tells you where to look when it fails. The A+ exam usually presents a user complaint about an accessory and expects you to start with the simplest likely cause before replacing hardware.",
   "A touch pen or stylus lets a user write or draw on a touchscreen. Passive, or capacitive, styluses simply act like a fingertip and need no power or pairing; they work on almost any capacitive screen but offer no pressure sensitivity. Active styluses contain electronics that communicate with the device's digitizer, enabling pressure sensitivity, palm rejection and buttons. Active pens need power from a battery or charging, and often a Bluetooth pairing for their extra buttons. They also have to match a compatible digitizer; a pen made for one brand's tablet may do nothing on another brand's screen. If an active pen stops working, check its charge, its pairing and whether the device supports that pen protocol.",
   "Headsets and speakers can be wired through a 3.5 mm audio jack or USB, or wireless through Bluetooth. A USB or Bluetooth headset appears to the operating system as its own audio device, so a common support call is simply that Windows is still sending sound to the laptop speakers or still listening on the built-in microphone. Fix it by choosing the correct output and input device in the sound settings or the meeting app's audio settings. Bluetooth headsets must be paired first and have enough battery. Many have separate modes for high-quality stereo playback and for hands-free calls with the microphone, and sound quality often drops when the microphone is in use; that is normal behavior, not a fault.",
   "External webcams usually connect over USB and use the standard UVC (USB Video Class) driver, so they often work without a separate download. When a webcam is not detected, check the cable and port, look in Device Manager, confirm the operating system's camera privacy setting allows apps to use the camera, and make sure the correct camera is selected in the meeting app. Laptops may also have a physical shutter or a function key that disables the built-in camera. Only one app can usually use a camera at a time, so a camera that works in one app but not another may simply be busy.",
   "Trackpads, also called touchpads, are the laptop's pointing device. They support gestures such as two-finger scrolling and pinch to zoom, and they can be adjusted or disabled in settings. A trackpad that seems dead may have been turned off with a function key or disabled automatically when a mouse is connected, while a cursor that jumps while typing points to palm contact that a sensitivity or palm-rejection setting can reduce. Drawing pads, or graphics tablets, are external pressure-sensitive surfaces used with a pen for art and design. They connect by USB or Bluetooth and usually need the manufacturer's driver to enable pressure levels and button mapping.",
   "Consider a worked example. A user joins a video call and nobody can hear them, although they hear everyone through their new USB headset. You check the meeting app and see the microphone is still set to the laptop's built-in array, which is muted by a keyboard function key. You select the headset microphone in both Windows sound settings and the app, run the app's test call, and the problem is solved without replacing anything. You also show the user where to switch devices in the app next time.",
   "Common mistakes: assuming a passive stylus will give pressure sensitivity; buying an active pen that uses a different protocol from the device's digitizer; replacing a headset when the real problem is the wrong default audio device; overlooking a camera privacy toggle or physical shutter; and reinstalling drivers for a trackpad that was simply turned off with a function key. For drawing pads, forgetting the vendor driver leaves the pad working like a basic mouse without pressure levels.",
   "Exam questions describe what the user sees. 'Sound still comes from the laptop speakers after connecting a headset' means select the correct output device. 'Webcam not available to any app' points to privacy settings, a shutter or a disabled device. 'Cursor jumps while typing' points to trackpad sensitivity or palm rejection. 'Pen writes but has no pressure' points to a passive stylus or a missing driver. The best first answer is almost always the least invasive check: power, pairing, toggles, settings, then drivers, then hardware."
  ],
  "terms": [
   [
    "Passive stylus",
    "A capacitive pen that mimics a fingertip and needs no power or pairing."
   ],
   [
    "Active stylus",
    "A powered pen that talks to a compatible digitizer for pressure sensitivity, palm rejection and buttons."
   ],
   [
    "Default audio device",
    "The output or input the operating system uses unless an app chooses another."
   ],
   [
    "UVC",
    "USB Video Class, a standard driver model that lets most USB webcams work without extra software."
   ],
   [
    "Trackpad",
    "The touch-sensitive pointing surface on a laptop, also called a touchpad."
   ],
   [
    "Palm rejection",
    "A feature that ignores accidental contact from the hand while typing or writing."
   ],
   [
    "Drawing pad",
    "An external pressure-sensitive tablet used with a pen, usually needing a vendor driver."
   ]
  ],
  "example": "An illustrator connects a new drawing tablet by USB, and the pen moves the cursor but every line is the same thickness regardless of pressure. The technician checks Device Manager, sees the tablet listed as a generic input device, and installs the manufacturer's driver and control panel. After a restart, pressure levels and the express buttons work, and the illustrator maps one button to undo.",
  "tip": "When an accessory seems dead, check the simple things first: power or battery, pairing, a function-key toggle, privacy settings and whether the correct device is selected in the OS or app.",
  "check": [
   [
    "A new Bluetooth headset is paired, but sound still plays from the laptop speakers. What should you do?",
    "Set the headset as the output device in the sound settings or the app's audio settings."
   ],
   [
    "What is the difference between a passive and an active stylus?",
    "A passive stylus just imitates a finger; an active stylus has electronics for pressure, palm rejection and buttons and must match the digitizer."
   ],
   [
    "A laptop's built-in webcam is not available in any app. Name two non-hardware causes to check.",
    "A camera privacy setting blocking apps, a physical shutter, a function-key disable, or the device disabled in Device Manager."
   ],
   [
    "The cursor jumps around while a user types on a laptop. What is the likely fix?",
    "Adjust trackpad sensitivity or palm rejection, or disable the trackpad while typing."
   ]
  ]
 },
 {
  "t": "Wireless connection methods: Bluetooth pairing, NFC, hotspot and tethering, Wi-Fi",
  "body": [
   "Mobile devices rely on several different radios, each built for a different job. Choosing the right one, and knowing how to set it up and troubleshoot it, is a large part of mobile device support. For A+ you should be able to match a scenario to Bluetooth, NFC (near-field communication), a hotspot or tethering, or Wi-Fi, and know the basic setup steps for each well enough to walk a user through them.",
   "Bluetooth is a short-range wireless technology for connecting accessories such as headsets, keyboards, mice, speakers and car systems. It is a PAN (personal area network) technology; typical ranges are around 10 meters for common devices, though this varies by device class and environment. Devices must be paired before use. The general pairing process is: turn on Bluetooth on both devices, put the accessory in pairing or discoverable mode, select it on the host device, confirm a matching code or enter a PIN if asked, then test the connection. Once paired, the devices remember each other and reconnect automatically. If pairing fails, remove the old pairing on both sides, check battery levels, make sure the accessory is not still connected to another phone, and move the devices closer together.",
   "NFC works only across a few centimeters. It is used for tap-to-pay, reading tags and badges, and quickly exchanging information or starting a Bluetooth pairing by tapping two devices together. It must be enabled in the device settings, and payment apps typically require the phone to be unlocked or verified with a biometric first. NFC is not a way to move large files or stay connected; it is for short, deliberate interactions, which is exactly why its range is so small.",
   "A hotspot turns a phone into a small Wi-Fi access point that shares its cellular data connection with laptops and tablets. You set the network name and a strong password, preferably with WPA2 or WPA3 security, where WPA stands for Wi-Fi Protected Access. Tethering is the broader term for sharing a phone's cellular connection with another device, which can be done over Wi-Fi (a hotspot), USB or Bluetooth. USB tethering has the advantage of charging the phone at the same time and avoiding radio interference; Bluetooth tethering uses little power but is slow. Carriers may limit or charge for hotspot use, and heavy use drains the battery and uses data quickly.",
   "Wi-Fi connects the device to a WLAN (wireless local area network) for faster, usually cheaper data than cellular. Connecting involves selecting the SSID (service set identifier, the network name), entering the passphrase or corporate credentials, and accepting any captive portal page on public networks such as hotels. Phones may randomize their MAC (media access control) address per network for privacy, which can confuse networks that filter or reserve addresses by MAC. When Wi-Fi fails, check that airplane mode is off, Wi-Fi is enabled, the correct network and password are used and the device is in range, then forget and rejoin the network if needed.",
   "Consider a worked example. A consultant is at a client site with no guest Wi-Fi and needs to join a video call from her laptop. You suggest tethering to her phone. Because the call will be long and her phone battery is low, USB tethering is the best choice: it shares the cellular connection and charges the phone at the same time. Later she wants to pair new earbuds; you have her put them in pairing mode, select them in the laptop's Bluetooth settings and confirm, and then select them as the audio device in the meeting app.",
   "Common mistakes: confusing NFC with Bluetooth because both are short range, when NFC is centimeters and for taps while Bluetooth is meters and for ongoing connections; leaving a hotspot open or with a weak password; forgetting that a hotspot consumes cellular data and battery; blaming the network when a device's randomized MAC address is what broke a reservation or filter; and troubleshooting Wi-Fi while airplane mode is still on.",
   "Exam questions are usually scenario matches. 'Connect wireless headphones or a keyboard' means Bluetooth pairing. 'Pay at a terminal or tap a badge' means NFC. 'Share the phone's mobile data with a laptop' means hotspot or tethering, and 'while also charging the phone' points to USB tethering. 'Fast connection to the office network' means Wi-Fi. 'Device will not pair' usually leads to discoverable mode, removing the old pairing and checking batteries."
  ],
  "terms": [
   [
    "Pairing",
    "The one-time process of linking two Bluetooth devices so they trust and reconnect to each other."
   ],
   [
    "Discoverable mode",
    "A state in which a Bluetooth device advertises itself so another device can find and pair with it."
   ],
   [
    "NFC",
    "Near-field communication, a radio for taps within a few centimeters such as payments and badges."
   ],
   [
    "Hotspot",
    "A phone acting as a Wi-Fi access point to share its cellular data connection."
   ],
   [
    "Tethering",
    "Sharing a phone's cellular connection with another device over Wi-Fi, USB or Bluetooth."
   ],
   [
    "SSID",
    "Service set identifier, the name of a Wi-Fi network."
   ],
   [
    "MAC randomization",
    "A privacy feature that makes a device use a different hardware address on each Wi-Fi network."
   ]
  ],
  "example": "A small office reserves IP addresses for staff phones by MAC address so they can reach a shared printer. After a phone update, one user's phone gets a different address and loses printer access. The technician sees that the phone is now using a randomized MAC for that SSID, turns off randomization for the trusted office network on that device, and the reservation works again.",
  "tip": "Match the technology to the scenario: accessories use Bluetooth, tap-to-pay and badges use NFC, sharing a phone's cellular connection is tethering or a hotspot, and fast local network access is Wi-Fi.",
  "check": [
   [
    "What are the general steps to pair a Bluetooth headset?",
    "Enable Bluetooth, put the headset in pairing mode, select it on the host, confirm any code or PIN, then test."
   ],
   [
    "Which tethering method also charges the phone?",
    "USB tethering, because the phone is connected by a cable."
   ],
   [
    "A user wants to pay by tapping their phone on a card terminal. Which technology does this use?",
    "NFC, which works within a few centimeters."
   ],
   [
    "A phone suddenly cannot get its reserved IP address on the office Wi-Fi. What phone feature could be responsible?",
    "MAC address randomization, which presents a different MAC than the one the reservation expects."
   ]
  ]
 },
 {
  "t": "Cellular connectivity: 4G/5G, enabling and disabling radios, airplane mode, eSIM vs physical SIM",
  "body": [
   "Cellular connectivity lets phones, tablets and some laptops reach the internet through a mobile carrier's network instead of Wi-Fi. For A+ you need to understand the generations, how to turn individual radios on and off, what airplane mode really does, and how SIM (subscriber identity module) cards and eSIMs identify a subscriber to the carrier. Many support calls about 'no internet' on a phone come down to one of these settings rather than a broken device.",
   "Cellular generations are named G for generation. 4G, usually delivered as LTE (Long Term Evolution), provides broadband-class speeds and is still widely used as the baseline. 5G is the newer generation that offers higher potential speeds, lower latency and support for many more connected devices in the same area. 5G uses different frequency ranges: lower bands travel far and penetrate buildings well but are slower, while very high millimeter-wave bands are extremely fast but have short range and are easily blocked by walls, windows and even hands. That is why a phone may show 5G outdoors and drop to 4G indoors. Actual speeds depend on the carrier, signal strength and network load, so avoid promising a particular speed.",
   "Each radio in a mobile device can be controlled separately: cellular voice and data, Wi-Fi, Bluetooth, NFC (near-field communication) and GPS (Global Positioning System). Users can turn cellular data off to avoid charges, disable data roaming when traveling so they do not pay international rates, or turn off radios they do not use to save battery and reduce the attack surface. Airplane mode disables all transmitting radios at once. On most modern devices you can then re-enable Wi-Fi or Bluetooth individually while cellular stays off, which is how people use in-flight Wi-Fi and wireless headphones on a plane. GPS is receive-only, so some devices keep it available in airplane mode.",
   "A SIM holds the information that identifies the subscriber to the carrier. A physical SIM is a small removable card; over time it has shrunk from standard to micro to nano sizes, and it sits in a tray opened with a small pin. Moving service to a new phone means moving the card. An eSIM (embedded SIM) is a chip built into the device that can be programmed with a carrier profile, usually by scanning a QR code or using the carrier's app. eSIM allows switching carriers without swapping cards, holding more than one profile, and dual-SIM setups for separate work and personal lines. Some newer phones support only eSIM, so the transfer process when upgrading happens in software through the carrier or the phone's setup assistant.",
   "Two more identifiers appear in support work. The IMEI (International Mobile Equipment Identity) identifies the device hardware, while the IMSI (International Mobile Subscriber Identity) stored on the SIM or eSIM profile identifies the subscriber. Carriers can block a stolen phone by its IMEI, so it cannot be used on their network even with a new SIM. A SIM can also be protected with a SIM PIN, which must be entered after a restart before the phone can use the cellular network; too many wrong attempts lock the SIM and require a PUK (PIN unlock key) from the carrier.",
   "Consider a worked example. A traveler returns from a flight and says her phone has no cellular service, though Wi-Fi works at home. You open the quick settings and see the airplane icon is still on; during the flight she had turned Wi-Fi back on, so she never noticed. You turn airplane mode off and the signal returns. She also mentions a large bill from her last trip, so you show her the data roaming toggle and explain that she can leave roaming off abroad and use Wi-Fi or a local eSIM profile instead.",
   "Common mistakes: believing airplane mode permanently prevents Wi-Fi or Bluetooth, when both can be re-enabled individually; confusing the IMEI, which belongs to the hardware, with the IMSI, which belongs to the subscriber; assuming an eSIM can be moved by physically swapping something; expecting millimeter-wave 5G speeds indoors; and replacing a phone for 'no service' before checking airplane mode, cellular data, the SIM seating or eSIM profile, and whether the account is active.",
   "Exam questions usually give a symptom and a clue. 'No cellular, but Wi-Fi and Bluetooth still work' strongly suggests airplane mode was left on with those radios re-enabled. 'Switch carriers without a physical card' or 'activate by scanning a QR code' means eSIM. 'Block a stolen phone from the network' means IMEI. 'Avoid charges while traveling abroad' means turn off data roaming. '5G drops to 4G inside a building' reflects the short range of high-frequency 5G bands."
  ],
  "terms": [
   [
    "LTE",
    "Long Term Evolution, the technology behind most 4G cellular service."
   ],
   [
    "5G",
    "The newer cellular generation with higher potential speed, lower latency and more device capacity."
   ],
   [
    "Airplane mode",
    "A setting that turns off all transmitting radios at once; Wi-Fi and Bluetooth can usually be re-enabled individually."
   ],
   [
    "Data roaming",
    "Using another carrier's network outside your home area, often at extra cost."
   ],
   [
    "SIM",
    "Subscriber identity module, a removable card that identifies the subscriber to the carrier."
   ],
   [
    "eSIM",
    "An embedded SIM built into the device and provisioned with a carrier profile by QR code or app."
   ],
   [
    "IMEI",
    "International Mobile Equipment Identity, a unique number that identifies the phone hardware."
   ],
   [
    "IMSI",
    "International Mobile Subscriber Identity, the subscriber identifier stored on the SIM or eSIM profile."
   ]
  ],
  "example": "An employee's company phone is stolen from a car. The help desk locks and wipes it through device management, then asks the carrier to suspend the line and block the phone by its IMEI. The employee receives a replacement phone that supports eSIM, and the carrier sends a QR code that provisions the same phone number onto the new device within minutes, without any physical card.",
  "tip": "Airplane mode kills all transmitting radios, but Wi-Fi and Bluetooth can be turned back on individually. eSIM is embedded and provisioned by QR code or app. IMEI identifies the device; IMSI identifies the subscriber.",
  "check": [
   [
    "A phone shows Wi-Fi connected but no cellular signal after a flight. What should you check first?",
    "Whether airplane mode is still on, since Wi-Fi can be re-enabled while cellular stays off."
   ],
   [
    "What is the difference between an eSIM and a physical SIM?",
    "A physical SIM is a removable card; an eSIM is built into the device and is programmed with a carrier profile by QR code or app."
   ],
   [
    "Which identifier lets a carrier block a stolen phone regardless of the SIM inserted?",
    "The IMEI, which identifies the device hardware."
   ],
   [
    "Why might a phone show 5G outdoors but 4G inside an office?",
    "High-frequency 5G bands have short range and are easily blocked by walls, so the phone falls back to a stronger band."
   ]
  ]
 },
 {
  "t": "Location services: GPS and cellular location",
  "body": [
   "Location services let a mobile device work out where it is, which powers maps, navigation, weather, find-my-device features, photo tagging and emergency calls. For A+ you should know how each positioning method works, its strengths and weaknesses, why a phone combines several of them, and how to control location access for privacy and battery life. Most support calls in this area are either 'my map shows the wrong place' or 'why does this app know where I am', and both are answered by understanding the methods and the permissions.",
   "GPS (Global Positioning System) is a satellite navigation system. A GPS receiver in the phone listens to signals from several satellites and calculates its position from the time each signal takes to arrive, a process called trilateration. It needs signals from at least four satellites for a reliable position including altitude. GPS is receive-only, so the phone sends nothing to the satellites and GPS itself does not use mobile data. It is accurate outdoors, often to within a few meters, but it needs a reasonably clear view of the sky. It struggles indoors, in underground car parks and among tall buildings, and a cold start without recent satellite data can take a while to get a first fix. Modern phones also use other satellite systems in the same way, often grouped under the general name GNSS (global navigation satellite system).",
   "Cellular location estimates position from the cell towers the phone can hear. The carrier knows which tower or towers the phone is connected to and the signal strength or timing to each, so it can estimate an approximate location. It works indoors and without a sky view, but it is much less precise than GPS, especially in rural areas where towers are far apart. Wi-Fi positioning adds another method: the phone notes which nearby wireless networks it can see and compares them to a database of known access point locations, which is useful indoors in cities. Bluetooth beacons can refine location further in places such as stores and airports.",
   "Phones combine these sources. A-GPS (Assisted GPS) uses the cellular or internet connection to download satellite orbit information so the GPS gets a fix much faster. The operating system fuses GPS, cellular, Wi-Fi and motion sensors such as the accelerometer and compass to give the best available location while saving battery. That is why turning off Wi-Fi scanning can make indoor location noticeably worse even though you are not connected to any network.",
   "Location also raises privacy and battery concerns. Both iOS and Android let users turn location services off entirely or control access per app, with choices such as always, only while using the app, ask each time or never, and an option to share an approximate rather than precise location. Location metadata can also be embedded in photos, which can reveal where someone lives when pictures are shared. Organizations may use location through MDM (mobile device management) to find lost devices, and apps that use location constantly in the background can drain the battery. Emergency calls can generally still share location even when ordinary app access is restricted.",
   "Consider a worked example. A delivery driver says the navigation app keeps placing him a street away and sometimes loses him entirely downtown. You check and find location services on, but the navigation app is set to approximate location only, and he has turned off Wi-Fi to save battery. You set the app to precise location while in use, re-enable Wi-Fi scanning, and explain that tall buildings block GPS, so the phone relies on Wi-Fi and cellular data to fill the gaps. His accuracy improves immediately.",
   "Common mistakes: thinking GPS sends data to satellites or requires a data plan; expecting GPS to work well deep inside a building; confusing cellular location, which is coarse, with GPS, which is precise; granting an app 'always' access when 'while using' would do; forgetting that photos may carry location tags; and blaming the GPS hardware when the real issue is a permission set to approximate.",
   "Exam questions focus on method and privacy. 'Accurate outdoors but fails in a parking garage' describes GPS. 'Works indoors but only roughly' describes cellular location. 'Faster first fix using the data connection' describes A-GPS. 'User concerned an app tracks them' points to per-app location permissions, and 'battery drains quickly' can point to apps using location in the background. When asked for the best privacy control, choose per-app permissions over turning off the whole phone's location."
  ],
  "terms": [
   [
    "GPS",
    "Global Positioning System, a receive-only satellite system that calculates position from signal timing."
   ],
   [
    "GNSS",
    "Global navigation satellite system, the general name for GPS and similar satellite positioning systems."
   ],
   [
    "Trilateration",
    "Working out a position from the distances to several known points, such as satellites."
   ],
   [
    "Cellular location",
    "An approximate position estimated from the cell towers a phone can hear."
   ],
   [
    "Wi-Fi positioning",
    "Estimating location by matching nearby Wi-Fi networks against a database of known locations."
   ],
   [
    "A-GPS",
    "Assisted GPS, which downloads satellite data over a network to get a faster first fix."
   ],
   [
    "Location permission",
    "A per-app setting that controls whether and when an app may read the device's location."
   ]
  ],
  "example": "A company notices that photos posted to its public social media account reveal the exact location of a secure warehouse. The IT team reviews the marketing phones through MDM, disables location access for the camera app, and trains staff to check photo location metadata before posting. Maps and find-my-device still work because location services stay on for those specific apps.",
  "tip": "GPS is accurate but needs a sky view and is receive-only. Cellular location works indoors but is coarse. Per-app location permissions are the privacy control the exam expects you to recommend.",
  "check": [
   [
    "Why does GPS struggle inside large buildings?",
    "GPS needs to receive satellite signals, which are weak and blocked by roofs and walls."
   ],
   [
    "What advantage does cellular location have over GPS, and what is its drawback?",
    "It works indoors without a sky view, but it is much less precise."
   ],
   [
    "How does A-GPS speed up getting a location fix?",
    "It downloads satellite information over the cellular or internet connection instead of waiting to receive it from the satellites."
   ],
   [
    "A user wants a weather app to work but not track them constantly. What should you set?",
    "Location permission to only while using the app, and optionally approximate location."
   ]
  ]
 },
 {
  "t": "Mobile device management (MDM) and mobile application management: enrollment, policies, remote wipe",
  "body": [
   "Organizations that let staff use phones and tablets for work need a way to configure, secure and track those devices at scale. MDM (mobile device management) provides that central control over the whole device. MAM (mobile application management) is a narrower approach that manages only the organization's apps and data rather than the whole device. Both are delivered through a management console, often a cloud service, that pushes settings to enrolled devices. For A+ you need to know how devices are enrolled, what policies can do, and which kind of wipe fits which ownership model.",
   "Enrollment is how a device comes under management. On a company-owned device, enrollment can be automatic: the device is registered with the vendor's enrollment program when it is purchased, and the first time it is turned on it contacts the MDM and configures itself. This is often called zero-touch or automated enrollment, and it saves IT from handling each device. For personal devices in a BYOD (bring your own device) program, the user typically installs a company portal app or signs in with a work account and agrees to enrollment. Once enrolled, a management profile is installed that lets the MDM apply policies, and the device reports its status back to the console.",
   "Policies are the rules the MDM enforces. Common examples include requiring a passcode of a minimum length, enforcing device encryption, setting a screen lock timeout, disabling the camera or USB file transfer, pushing Wi-Fi, VPN (virtual private network) and email profiles, installing required apps and blocking unapproved ones, and requiring a minimum OS version. Compliance checks compare each device against the rules and can block a device from reaching company email or files if it is jailbroken or rooted, out of date or missing a passcode. This connection between device health and access is often called conditional access.",
   "Remote wipe is the ability to erase a device from the console when it is lost, stolen or when an employee leaves. A full wipe returns the device to factory settings and is appropriate for company-owned devices. A selective or enterprise wipe removes only the corporate apps, accounts and data and leaves personal photos and apps alone, which is the right choice for BYOD. MDM tools also offer remote lock, locate and the ability to reset or clear a forgotten passcode. Wiping a device is final, so good practice is to lock and locate first when there is a chance of recovery, then wipe once the device is confirmed lost.",
   "MAM focuses on protecting data inside managed apps. It can require a PIN to open a work app, prevent copying and pasting from a work email app into a personal app, block saving work files to personal cloud storage and wipe only the app data. Because it does not take control of the whole device, MAM is often more acceptable to employees who use personal phones. Many organizations combine both: full MDM on corporate devices and MAM app protection on personal ones. Either way, users should sign an acceptable use or mobile policy before they get access to company resources.",
   "Consider a worked example. A sales team uses a mix of company-issued tablets and personal phones. You enroll the tablets with automated enrollment, apply a policy that requires encryption and a six-digit passcode, and push the corporate Wi-Fi and email profiles. For personal phones you apply MAM policies to the email and file apps only: a PIN to open them and no copying data into personal apps. When a salesperson leaves the company, you perform a selective wipe on her personal phone, removing the work apps and data but leaving her family photos untouched.",
   "Common mistakes: performing a full wipe on a personal BYOD phone and erasing the employee's own data; confusing MDM, which controls the whole device, with MAM, which controls only managed apps; forgetting that compliance policies can block access, so a user locked out of email may simply be missing an OS update; and wiping a device immediately when locking and locating it first might have recovered it.",
   "Exam questions usually turn on ownership and scope. 'Company-owned device lost with sensitive data' points to a full remote wipe. 'Employee leaves and used a personal phone' points to a selective or enterprise wipe. 'Protect company data without controlling the whole personal phone' points to MAM. 'New devices configure themselves when first powered on' means automated or zero-touch enrollment. 'Block email on jailbroken phones' is a compliance policy."
  ],
  "terms": [
   [
    "MDM",
    "Mobile device management, centralized control of whole devices, including settings, apps and wipe."
   ],
   [
    "MAM",
    "Mobile application management, protecting and controlling only managed work apps and their data."
   ],
   [
    "Enrollment",
    "The process of bringing a device under management, which installs a management profile."
   ],
   [
    "BYOD",
    "Bring your own device, a program that lets employees use personal devices for work."
   ],
   [
    "Compliance policy",
    "Rules a device must meet, such as encryption and OS version, before it may access company resources."
   ],
   [
    "Full wipe",
    "A remote reset that erases everything and returns the device to factory settings."
   ],
   [
    "Selective wipe",
    "A remote action that removes only corporate apps, accounts and data, also called an enterprise wipe."
   ]
  ],
  "example": "A school issues tablets to teachers through automated enrollment, so each tablet installs the grading app, joins the staff Wi-Fi and enforces a passcode the first time it is switched on. When a tablet is left on a bus, IT locks it and shows a return message with the office phone number. It is not returned within a few days, so IT performs a full wipe from the console.",
  "tip": "Full wipe for corporate devices; selective or enterprise wipe for BYOD. MAM protects apps and data without controlling the whole device, which suits personal phones.",
  "check": [
   [
    "An employee who used a personal phone for work resigns. Which wipe should IT use?",
    "A selective or enterprise wipe, which removes only corporate apps and data and leaves personal content."
   ],
   [
    "What is the main difference between MDM and MAM?",
    "MDM manages the entire device; MAM manages only specific work apps and the data inside them."
   ],
   [
    "A user suddenly cannot get company email on a phone that works otherwise. What MDM feature might be responsible?",
    "A compliance policy blocking the device, for example because its OS is out of date or it lacks a passcode."
   ],
   [
    "What is zero-touch or automated enrollment?",
    "Company devices are registered in advance so they contact the MDM and configure themselves the first time they are powered on."
   ]
  ]
 },
 {
  "t": "Mobile app and data sync: email, calendar and contacts, cloud sync, two-factor authenticator apps",
  "body": [
   "Users expect their email, calendar, contacts and files to look the same on their phone, laptop and web browser. Synchronization makes that possible by keeping a master copy on a server and syncing changes to every device. As a technician you set up these accounts, fix sync problems, and help users move to new phones without losing data or locking themselves out of accounts. The A+ exam focuses on choosing the right account type, recognizing common sync failures and protecting authenticator apps during device changes.",
   "Email can be configured in several ways. Microsoft Exchange and Microsoft 365 accounts use Exchange ActiveSync or modern equivalents to sync mail, calendar, contacts and tasks together, and they often apply security policies to the device. Google accounts similarly sync Gmail, calendar and contacts. Generic mail accounts use IMAP (Internet Message Access Protocol), which keeps mail on the server and syncs folders across devices, or POP3 (Post Office Protocol version 3), which typically downloads mail to one device and may remove it from the server. For a user with several devices, IMAP or an Exchange-type account is the right choice. Outgoing mail uses SMTP (Simple Mail Transfer Protocol).",
   "When setting up an account manually, you need the incoming and outgoing server names, ports, the security type such as SSL/TLS (Secure Sockets Layer or Transport Layer Security) and the credentials. Many providers now require modern sign-in through a browser window rather than a simple password, and some need an app password when MFA (multifactor authentication) is on. Secure ports are common: IMAP over TLS typically uses 993, POP3 over TLS 995, and mail submission 587. If mail arrives but cannot be sent, look at the SMTP settings first.",
   "Calendar and contacts sync through the same accounts. Standard protocols such as CalDAV for calendars and CardDAV for contacts are used by some providers. A common problem is duplicate or missing contacts when a phone syncs the same address book from two accounts, or when a user saved contacts to the phone's local storage rather than to a synced account; those local contacts will not appear on the new phone. Cloud sync services such as iCloud, Google Drive, OneDrive and Dropbox keep files, photos and device backups in online storage, which makes device replacement easy: sign in on the new phone and restore. Watch for storage quotas that stop syncing when full, sync paused on metered or cellular connections to save data, and conflicts when the same file is edited on two devices.",
   "Two-factor authenticator apps generate TOTP (time-based one-time password) codes, usually six digits that change every 30 seconds, or accept push approvals. They are more secure than SMS (Short Message Service) codes, which can be intercepted or redirected through SIM swapping, where an attacker convinces a carrier to move a phone number to their own SIM. Because TOTP depends on the time, a phone with a badly wrong clock can produce codes that are rejected. The key risk is losing the phone: if the authenticator's secrets are not backed up or transferred, the user can be locked out of every account.",
   "Consider a worked example. A manager is upgrading his phone and plans to factory-reset the old one before trading it in. You check first. His work account is Microsoft 365, so mail, calendar and contacts will sync down automatically on the new phone. His personal mail is set up as POP3, so older messages exist only on the old phone; you switch that account to IMAP on the new phone. His authenticator app holds codes for several services, so you use the app's transfer feature, confirm each code works on the new phone, and only then reset the old one.",
   "Common mistakes: choosing POP3 for a user who reads mail on several devices; wiping a phone before migrating the authenticator app; saving contacts to local phone storage instead of a synced account; ignoring a full cloud storage quota when photos stop backing up; and treating SMS codes as equal to authenticator apps in strength. Also remember that Exchange-type accounts may enforce device policies, so a user who refuses a passcode may not be able to add the account.",
   "Exam questions tend to use clue phrases. 'Mail disappears from the server' or 'only on one device' points to POP3, and the fix for multiple devices is IMAP or Exchange. 'Photos stopped syncing' suggests a full quota or sync paused on cellular. 'User locked out after replacing phone' points to an authenticator app that was not migrated or recovery codes not saved. 'More secure than SMS codes' means an authenticator app."
  ],
  "terms": [
   [
    "IMAP",
    "Internet Message Access Protocol, which keeps mail on the server and syncs it across devices."
   ],
   [
    "POP3",
    "Post Office Protocol version 3, which downloads mail to one device and may remove it from the server."
   ],
   [
    "Exchange ActiveSync",
    "A Microsoft protocol that syncs mail, calendar, contacts and tasks and can apply device policies."
   ],
   [
    "CalDAV and CardDAV",
    "Standard protocols for syncing calendars and contacts."
   ],
   [
    "Cloud sync",
    "A service that keeps files, photos and backups in online storage and synchronizes them across devices."
   ],
   [
    "TOTP",
    "Time-based one-time password, a short code that changes every few seconds and is generated by an authenticator app."
   ],
   [
    "SIM swapping",
    "Fraud in which an attacker gets a victim's phone number moved to another SIM to receive their SMS codes."
   ]
  ],
  "example": "A user reports that email she reads on her laptop vanishes and never appears on her phone. The technician finds the laptop mail client set up with POP3 and configured to delete messages from the server after downloading. They remove the account and add it again using IMAP with TLS on both devices, and now read status and folders stay consistent everywhere.",
  "tip": "For multiple devices, choose IMAP or an Exchange-style account, not POP3. Authenticator apps are stronger than SMS codes, but they must be migrated before a phone is wiped.",
  "check": [
   [
    "A user checks mail on a phone, tablet and laptop. Which account type should you configure, and why?",
    "IMAP or an Exchange-type account, because mail stays on the server and syncs to every device; POP3 downloads to one device."
   ],
   [
    "What should you do before a user factory-resets their old phone?",
    "Migrate their authenticator app accounts and confirm recovery codes, and make sure data is synced or backed up."
   ],
   [
    "Why are authenticator app codes considered stronger than SMS codes?",
    "SMS codes can be intercepted or redirected through SIM swapping, while authenticator codes are generated on the device."
   ],
   [
    "A user's contacts did not appear on their new phone. What is a likely cause?",
    "They were saved to the old phone's local storage rather than to a synced account."
   ]
  ]
 },
 {
  "t": "TCP vs UDP and common ports: FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, HTTP 80, POP3 110, IMAP 143, SNMP 161/162, LDAP 389, HTTPS 443, SMB 445, RDP 3389",
  "body": [
   "Every network conversation needs two things beyond an IP address: a transport protocol and a port number. The IP address gets a packet to the right computer, and the port number gets it to the right service on that computer, such as a web server or mail server. The two main transport protocols are TCP and UDP. The A+ exam expects you to know how they differ and to recall the standard port for each common service, because firewalls, router rules and troubleshooting all depend on them.",
   "TCP (Transmission Control Protocol) is connection-oriented. Before sending data it sets up a session with a three-way handshake: SYN, SYN-ACK, ACK. It numbers segments, acknowledges what arrives, retransmits anything lost and delivers data in order. That reliability costs some overhead and delay, so TCP is used where every byte matters: web pages, email, file transfers and remote logins. UDP (User Datagram Protocol) is connectionless. It sends datagrams without a handshake or acknowledgments, so it is faster and lighter but does not guarantee delivery or order. UDP suits short queries such as DNS lookups and DHCP, and real-time traffic like voice and video, where a late packet is useless anyway.",
   "The first group of ports to learn. FTP (File Transfer Protocol) uses TCP 20 for data and 21 for control. SSH (Secure Shell) uses TCP 22 for encrypted remote command-line access and secure file transfer through SFTP. Telnet uses TCP 23 for unencrypted remote access and should be avoided because it sends credentials in clear text. SMTP (Simple Mail Transfer Protocol) uses TCP 25 to send mail between servers. DNS (Domain Name System) uses port 53, mainly UDP for queries and TCP for large responses and zone transfers. DHCP (Dynamic Host Configuration Protocol) uses UDP 67 on the server and UDP 68 on the client. HTTP (Hypertext Transfer Protocol) uses TCP 80 for unencrypted web traffic.",
   "Continuing the list. POP3 (Post Office Protocol version 3) uses TCP 110 to download mail. IMAP (Internet Message Access Protocol) uses TCP 143 to access mail kept on the server. SNMP (Simple Network Management Protocol) uses UDP 161 for queries to managed devices and UDP 162 for traps, the alerts devices send to the management station. LDAP (Lightweight Directory Access Protocol) uses port 389 to query directories such as Active Directory. HTTPS (HTTP Secure) uses TCP 443 for encrypted web traffic. SMB (Server Message Block) uses TCP 445 for Windows file and printer sharing. RDP (Remote Desktop Protocol) uses TCP 3389 for graphical remote access to Windows.",
   "```text\nRemote access   SSH 22 (secure)   Telnet 23 (clear text)   RDP 3389\nWeb             HTTP 80           HTTPS 443\nMail            SMTP 25 (send)    POP3 110   IMAP 143\nInfrastructure  DNS 53            DHCP 67/68 (UDP)   SNMP 161/162 (UDP)   LDAP 389\nFile sharing    FTP 20/21         SMB 445\n```",
   "Consider a worked example. A small office moves its accounting server behind a new firewall. Afterwards, staff can browse the web but cannot map the shared finance drive, and the administrator cannot connect with Remote Desktop. You look at the firewall rules and see only 80 and 443 allowed between the office VLAN and the server. SMB needs TCP 445 and Remote Desktop needs TCP 3389, so you add rules for those ports from the office subnet only, keeping the server closed to everything else. You leave Telnet 23 blocked and use SSH 22 for the switch instead.",
   "Common mistakes: calling DHCP or SNMP TCP services, when both use UDP; forgetting that DNS uses TCP as well as UDP; mixing up POP3 110 and IMAP 143; giving SMB the old NetBIOS ports when the exam answer for direct SMB is 445; and treating Telnet as acceptable for remote management. Another trap is thinking UDP is unreliable in a bad sense; it is chosen deliberately where speed matters more than guaranteed delivery.",
   "Exam questions often give a port and ask for the service, or describe a blocked function and ask which port to open. 'Secure replacement for Telnet' is SSH 22. 'Encrypted web' is HTTPS 443. 'Clients receive 169.254 addresses after a firewall change' may point to blocked DHCP 67/68. 'Network monitoring traps not arriving' is UDP 162. 'Connectionless, no handshake, suited to streaming' is UDP; 'guaranteed, ordered delivery with a handshake' is TCP."
  ],
  "terms": [
   [
    "TCP",
    "Transmission Control Protocol, a connection-oriented transport with handshakes, acknowledgments and retransmission."
   ],
   [
    "UDP",
    "User Datagram Protocol, a connectionless transport that is fast but does not guarantee delivery."
   ],
   [
    "Three-way handshake",
    "The SYN, SYN-ACK, ACK exchange TCP uses to open a connection."
   ],
   [
    "Port number",
    "A number that identifies a specific service or application on a host."
   ],
   [
    "SSH",
    "Secure Shell, encrypted remote command-line access on TCP 22."
   ],
   [
    "SMB",
    "Server Message Block, Windows file and printer sharing on TCP 445."
   ],
   [
    "RDP",
    "Remote Desktop Protocol, graphical remote access to Windows on TCP 3389."
   ],
   [
    "SNMP trap",
    "An unsolicited alert a managed device sends to a management station on UDP 162."
   ]
  ],
  "example": "A network technician configures a new switch to be managed remotely. The security policy forbids clear-text protocols, so she disables Telnet on TCP 23 and enables SSH on TCP 22. She also points the switch's SNMP traps at the monitoring server on UDP 162 and allows those ports in the firewall between the management VLAN and the switch.",
  "tip": "Pair secure and insecure versions: Telnet 23 vs SSH 22, HTTP 80 vs HTTPS 443. DHCP and SNMP use UDP; DNS is mostly UDP but also TCP. SMB is 445 and RDP is 3389.",
  "check": [
   [
    "Which transport protocol uses a three-way handshake, and why?",
    "TCP, to establish a reliable, connection-oriented session before sending data."
   ],
   [
    "A user can browse the web but cannot connect to a Windows file share. Which port may be blocked?",
    "TCP 445, used by SMB."
   ],
   [
    "Which ports does DHCP use, and over which transport?",
    "UDP 67 on the server and UDP 68 on the client."
   ],
   [
    "What is the secure replacement for Telnet, and on which port?",
    "SSH on TCP 22, which encrypts the session."
   ]
  ]
 },
 {
  "t": "Networking hardware: routers, managed vs unmanaged switches, access points, patch panels, firewalls, PoE injectors and switches, cable modems, DSL and ONT",
  "body": [
   "A network is built from devices that each have one job. Knowing what each device does, and at which layer of the network it works, helps you design small networks, pick the right equipment for a customer, and track down faults. The A+ exam typically describes a need, such as powering a ceiling camera, connecting two subnets or tidying a wiring closet, and asks which device fits.",
   "A router connects different networks and forwards packets between them based on IP addresses, working at Layer 3 of the OSI (Open Systems Interconnection) model. Your home router connects your local network to the ISP (internet service provider) network. Business routers link offices and route between internal subnets. A switch connects devices within the same local network and forwards frames based on MAC (media access control) addresses at Layer 2, learning which device is on which port so it sends traffic only where it needs to go. An unmanaged switch is plug-and-play with no configuration. A managed switch can be configured through a web page or command line, adding features such as VLANs (virtual LANs), port security, link aggregation, traffic monitoring with port mirroring and QoS (quality of service). Unmanaged suits a small office; managed suits any business network that needs segmentation or monitoring.",
   "An AP (access point) bridges wireless clients onto the wired network. Home routers usually include an AP, a switch and a router in one box, but businesses use separate APs, often centrally managed by a wireless controller or cloud service so settings stay consistent. A patch panel is a passive panel in a rack where permanent in-wall cables terminate on punchdown blocks. Short patch cables then connect panel ports to switch ports, which keeps cabling tidy and lets you move connections without re-terminating wall runs. A firewall filters traffic according to rules, allowing or blocking by address, port and protocol. It may be a dedicated appliance, a feature of a router or software on a host.",
   "PoE (Power over Ethernet) sends electrical power along with data on an Ethernet cable, so devices such as access points, IP phones and security cameras need no separate power outlet. A PoE switch provides power on its ports. A PoE injector adds power to a single cable when the switch does not support PoE; it sits between the switch and the device, with data in on one port and data plus power out on the other. Different PoE standards supply different amounts of power, with newer ones such as PoE+ providing more, so check that the switch or injector can supply what the device needs and that the switch's total power budget is not exceeded.",
   "At the edge of the network sits the device that talks to the provider. A cable modem connects to the provider's coaxial cable network, typically using the DOCSIS (Data Over Cable Service Interface Specification) standard. A DSL (digital subscriber line) modem connects over telephone lines. An ONT (optical network terminal) terminates a fiber-to-the-premises connection, converting the light signal to Ethernet. These devices hand off to your router, and they are often combined into a single gateway box supplied by the provider.",
   "Consider a worked example. A dentist's office needs a new ceiling-mounted access point and two IP cameras, but the existing switch is an unmanaged model without PoE, and there are no power outlets in the ceiling. For a single device, a PoE injector would work. For three devices, and because the office also wants patient Wi-Fi separated from office computers, you recommend a managed PoE switch: it powers all three devices over their network cables and supports VLANs to separate guest and staff traffic. The in-wall runs terminate at a patch panel so the closet stays organized.",
   "Common mistakes: saying a switch routes between networks, or that a router forwards by MAC address; recommending an unmanaged switch when VLANs are required; buying a PoE device and plugging it into a non-PoE switch with no injector; confusing a patch panel, which is passive, with a switch; and mixing up the provider devices, such as expecting a cable modem to work on a fiber line.",
   "Exam questions hinge on key phrases. 'Connect two different networks' or 'forward between subnets' means router. 'Connect devices on the same LAN' means switch, and 'needs VLANs or port mirroring' means managed switch. 'Power a single camera where the switch has no PoE' means PoE injector. 'Fiber comes into the building' means ONT; 'coax' means cable modem; 'phone line' means DSL. 'Termination point for in-wall cabling in a rack' means patch panel."
  ],
  "terms": [
   [
    "Router",
    "A Layer 3 device that forwards packets between different networks using IP addresses."
   ],
   [
    "Switch",
    "A Layer 2 device that forwards frames within a LAN using MAC addresses."
   ],
   [
    "Managed switch",
    "A configurable switch that supports features such as VLANs, port security and monitoring."
   ],
   [
    "Access point",
    "A device that connects wireless clients to the wired network."
   ],
   [
    "Patch panel",
    "A passive rack panel where in-wall cables terminate and patch cables connect to switches."
   ],
   [
    "PoE injector",
    "A device that adds Power over Ethernet to a single cable when the switch cannot supply power."
   ],
   [
    "ONT",
    "Optical network terminal, the device that converts a fiber connection to Ethernet at the customer premises."
   ]
  ],
  "example": "A retail store adds a security camera over the back door. The store's switch is unmanaged and has no PoE, and the nearest outlet is far away. The technician runs a Cat 6 cable to the camera and places a PoE injector next to the switch: a short patch cable goes from the switch to the injector's data port, and the long run goes from the injector's power-and-data port to the camera, which powers up without a separate adapter.",
  "tip": "Router means between networks (IP); switch means within a network (MAC). Managed switch equals VLAN support. A PoE injector powers one device when the switch cannot. ONT means fiber, cable modem means coax, DSL means phone line.",
  "check": [
   [
    "What is the main functional difference between a router and a switch?",
    "A router forwards between different networks using IP addresses; a switch forwards within one network using MAC addresses."
   ],
   [
    "A company needs to separate guest and staff traffic on the same switch hardware. What type of switch is required?",
    "A managed switch that supports VLANs."
   ],
   [
    "When would you use a PoE injector instead of a PoE switch?",
    "When only one or a few devices need power and the existing switch does not provide PoE."
   ],
   [
    "Which device terminates a fiber-to-the-premises connection?",
    "The ONT, or optical network terminal."
   ]
  ]
 },
 {
  "t": "Wireless: 2.4, 5 and 6 GHz bands, channels and regulations, 802.11a/b/g/n/ac/ax, Bluetooth, NFC, RFID",
  "body": [
   "Wi-Fi is defined by the IEEE (Institute of Electrical and Electronics Engineers) 802.11 family of standards. The A+ exam expects you to know the frequency bands, which standards use which bands, how channels work and why regulations limit them, and how Wi-Fi compares with other wireless technologies such as Bluetooth, NFC (near-field communication) and RFID (radio-frequency identification). These facts drive practical choices like where to place an access point and which band a device should use.",
   "Wi-Fi uses three bands. The 2.4 GHz band travels farther and penetrates walls better but is slower and crowded. In most regions it has only three non-overlapping 20 MHz channels, 1, 6 and 11, and it competes with Bluetooth, microwave ovens, baby monitors and cordless devices. The 5 GHz band offers many more non-overlapping channels and higher speeds, but its range and wall penetration are shorter. The 6 GHz band, available to Wi-Fi 6E and newer devices where regulations allow, adds a large amount of clean spectrum with even more channels, again with shorter range. Channels can be bonded together into wider channels, for example 40, 80 or 160 MHz, for more throughput, at the cost of using more spectrum and increasing the chance of interference with neighbors.",
   "Regulations matter because each country's regulator decides which frequencies and power levels are legal. That is why some channels are unavailable in some countries, why devices and access points must be set to the correct region, and why some 5 GHz channels require DFS (dynamic frequency selection), which makes the access point listen for radar and move off a channel if it detects it. Transmit power limits also mean you cannot simply turn an access point up to cover a larger area; adding access points is usually the answer.",
   "Know the standards in order. 802.11a used 5 GHz and 802.11b used 2.4 GHz; both are legacy. 802.11g brought faster speeds to 2.4 GHz. 802.11n (Wi-Fi 4) works on both 2.4 and 5 GHz and introduced MIMO (multiple input, multiple output), using several antennas at once. 802.11ac (Wi-Fi 5) works on 5 GHz and added wider channels and MU-MIMO (multi-user MIMO). 802.11ax (Wi-Fi 6) works on 2.4 and 5 GHz and improves efficiency in crowded places with OFDMA (orthogonal frequency-division multiple access), which lets one transmission serve several clients; Wi-Fi 6E extends 802.11ax into 6 GHz. Newer standards are backward compatible with older devices on the same band, though a slow legacy client can reduce efficiency for everyone.",
   "Other wireless technologies serve different needs. Bluetooth is a short-range PAN (personal area network) technology in the 2.4 GHz band for accessories such as headsets, keyboards and watches. NFC works within a few centimeters for payments, badges and quick pairing. RFID uses tags that a reader can detect, often without a battery in the tag, for inventory tracking, access badges and asset management. Passive RFID tags draw power from the reader's signal and have short range; active tags have a battery and longer range. NFC is actually a specialized, very short-range form of high-frequency RFID that supports two-way communication.",
   "Consider a worked example. A small office on the second floor of a busy building complains of slow, dropping Wi-Fi. A Wi-Fi analyzer shows a dozen neighboring networks on 2.4 GHz, several on channels between 1, 6 and 11, and the office's own access point on 2.4 GHz using a 40 MHz channel. You move the office's 2.4 GHz radio to a 20 MHz channel on 1, 6 or 11, whichever is least used, and enable the 5 GHz band with band steering so modern laptops prefer it. Performance improves because the laptops now use a far less crowded band.",
   "Common mistakes: claiming 802.11ac works on 2.4 GHz; forgetting that 802.11n and 802.11ax are dual-band; choosing channels 2 through 5 on 2.4 GHz, which overlap with their neighbors; assuming 5 or 6 GHz always gives better coverage, when they give better speed but shorter range; ignoring the regulatory region; and confusing RFID asset tags with NFC payments, even though they are related.",
   "Exam questions often present a need and a clue word. 'Longest range through walls' points to 2.4 GHz. 'Least interference, most channels' points to 5 GHz or 6 GHz. 'Non-overlapping channels on 2.4 GHz' are 1, 6 and 11. 'Access point changes channel because of radar' means DFS. 'Track pallets in a warehouse with tags' means RFID. 'Standard that introduced MIMO' is 802.11n, and 'Wi-Fi 6E' means 802.11ax on 6 GHz."
  ],
  "terms": [
   [
    "802.11",
    "The IEEE family of standards that defines Wi-Fi."
   ],
   [
    "Non-overlapping channels",
    "Channels that do not share frequencies; on 2.4 GHz these are 1, 6 and 11 in most regions."
   ],
   [
    "Channel bonding",
    "Combining adjacent channels into a wider channel for more throughput."
   ],
   [
    "DFS",
    "Dynamic frequency selection, which moves 5 GHz Wi-Fi off channels where radar is detected."
   ],
   [
    "MIMO",
    "Multiple input, multiple output, using several antennas at once to increase throughput."
   ],
   [
    "OFDMA",
    "A Wi-Fi 6 technique that splits a channel so one transmission can serve several clients."
   ],
   [
    "RFID",
    "Radio-frequency identification, which reads tags wirelessly for tracking and access."
   ]
  ],
  "example": "A warehouse wants to know where its forklifts and high-value pallets are. The company fits passive RFID tags to each pallet and readers at every dock door, so items are logged automatically as they pass. Staff tablets use 5 GHz Wi-Fi for speed near the office, while the 2.4 GHz band remains enabled for scanners that need longer range across the open floor.",
  "tip": "Memorize the band per standard: a is 5 GHz, b and g are 2.4 GHz, n is both, ac is 5 GHz, ax is 2.4 and 5 GHz plus 6 GHz as Wi-Fi 6E. 2.4 GHz means longer range but more interference; 5 and 6 GHz mean more speed but shorter range.",
  "check": [
   [
    "Which three channels are non-overlapping on 2.4 GHz in most regions?",
    "Channels 1, 6 and 11."
   ],
   [
    "Which 802.11 standard introduced MIMO, and which bands does it use?",
    "802.11n (Wi-Fi 4), on both 2.4 GHz and 5 GHz."
   ],
   [
    "Why might an access point suddenly change from one 5 GHz channel to another?",
    "DFS detected radar on that channel and required the access point to move."
   ],
   [
    "What is the difference between passive and active RFID tags?",
    "Passive tags are powered by the reader's signal and have short range; active tags have their own battery and longer range."
   ]
  ]
 },
 {
  "t": "Networked host services: DNS, DHCP, file and print servers, mail, syslog, web servers, AAA/RADIUS, proxy servers, spam gateways, UTM, load balancers, IoT and legacy/embedded systems",
  "body": [
   "Networks exist to deliver services, and most of those services run on servers. For A+ you need to recognize each common server role, what it does, and how a problem with it would appear to users. The exam rarely asks you to configure these servers; instead it describes a symptom or a requirement and asks which service is involved or which appliance should be added.",
   "A DNS (Domain Name System) server translates names like a company's intranet name into IP addresses. When DNS fails, users often report that the internet is down even though they can still reach sites by IP address. A DHCP (Dynamic Host Configuration Protocol) server hands out IP addresses, subnet masks, default gateways and DNS server addresses automatically. When DHCP fails, Windows clients cannot get an address and fall back to an APIPA (Automatic Private IP Addressing) address in the 169.254.x.x range. File servers store shared files, usually shared over SMB (Server Message Block) on Windows networks, with permissions controlling who can read or change them. Print servers manage shared printers, queues and drivers so every user does not need a direct connection to each printer.",
   "Mail servers send and receive email; SMTP (Simple Mail Transfer Protocol) moves messages between servers, and users collect mail through IMAP, POP3 or a service such as Microsoft Exchange. A syslog server collects log messages sent from routers, switches, firewalls and servers so administrators can search them in one place, which is important for troubleshooting and security investigations. A web server hosts websites and web applications over HTTP and HTTPS.",
   "AAA stands for authentication, authorization and accounting: proving who you are, deciding what you may do and recording what you did. RADIUS (Remote Authentication Dial-In User Service) is a common AAA protocol used to centralize logins for Wi-Fi with WPA2 or WPA3 Enterprise, VPNs and network devices. TACACS+ (Terminal Access Controller Access-Control System Plus) is another AAA protocol often used for administering network equipment. A proxy server sits between users and the internet, making requests on their behalf; it can cache content, filter websites and log activity. A spam gateway filters incoming email for spam, phishing and malware before it reaches the mail server.",
   "A UTM (unified threat management) appliance combines several security functions, such as firewall, intrusion prevention, antivirus, content filtering and VPN, into one device, which suits small and medium businesses without separate security teams. A load balancer spreads incoming requests across several servers to improve performance and availability, and stops sending traffic to a server that fails health checks. Not every networked device is a traditional server. IoT (Internet of Things) devices include smart thermostats, cameras, lighting and sensors. Legacy and embedded systems include older industrial controllers such as SCADA (supervisory control and data acquisition) systems, medical equipment and building systems that run fixed firmware and cannot easily be patched. Best practice is to change default passwords, update firmware where possible and place them on a separate network segment or VLAN so a compromise cannot easily spread.",
   "Consider a worked example. Users in a branch office say 'the internet is down', yet a technician can reach a public site by typing its IP address. That points to DNS, not the connection. Later the same week, new laptops show 169.254 addresses, which points to the DHCP server or the path to it. The branch manager also asks for one box to provide firewall, web filtering, antivirus scanning and VPN without buying four products; that is a UTM appliance. Finally, the building's old HVAC controller, which cannot be updated, is moved to its own VLAN.",
   "Common mistakes: blaming the ISP when name resolution is the real failure; confusing a proxy server, which makes requests on users' behalf, with a load balancer, which spreads incoming requests across servers; thinking RADIUS is an encryption method rather than a central authentication service; assuming a syslog server stops attacks, when it only collects logs; and connecting IoT or legacy devices directly to the main business network with default passwords.",
   "Exam questions pair symptoms with services. 'Names fail but IP addresses work' means DNS. '169.254 addresses' means DHCP. 'Central authentication for Wi-Fi and VPN' means RADIUS or AAA. 'Firewall, antivirus and content filtering in one appliance' means UTM. 'Spread web traffic across several servers' means load balancer. 'Cache and filter user web requests' means proxy. 'Collect logs from all network devices' means syslog. 'Device cannot be patched' points to segmenting a legacy or embedded system."
  ],
  "terms": [
   [
    "DNS server",
    "A server that resolves hostnames to IP addresses."
   ],
   [
    "DHCP server",
    "A server that automatically assigns IP addresses and related settings to clients."
   ],
   [
    "Syslog",
    "A standard for sending log messages to a central collector."
   ],
   [
    "AAA",
    "Authentication, authorization and accounting, the framework for controlling and recording access."
   ],
   [
    "RADIUS",
    "Remote Authentication Dial-In User Service, a protocol that centralizes authentication for networks and VPNs."
   ],
   [
    "Proxy server",
    "A server that makes web requests on behalf of clients and can cache, filter and log them."
   ],
   [
    "UTM",
    "Unified threat management, one appliance combining firewall, intrusion prevention, antivirus, filtering and VPN."
   ],
   [
    "Load balancer",
    "A device that distributes incoming requests across multiple servers and skips unhealthy ones."
   ]
  ],
  "example": "A university replaces a shared Wi-Fi password with WPA3-Enterprise. Each student signs in with their own campus account, and the access points pass those credentials to a RADIUS server that checks them against the directory. When a student graduates, disabling their account stops their Wi-Fi access immediately, and accounting records show when each device connected.",
  "tip": "Match the symptom to the service: names fail but IPs work means DNS; 169.254 addresses mean DHCP; central Wi-Fi logins mean RADIUS; many security features in one box means UTM; spreading load across servers means load balancer.",
  "check": [
   [
    "Users can reach a website by IP address but not by name. Which service is failing?",
    "DNS, which resolves names to IP addresses."
   ],
   [
    "What does AAA stand for, and which protocol commonly provides it for Wi-Fi?",
    "Authentication, authorization and accounting; RADIUS commonly provides it for WPA2 or WPA3 Enterprise."
   ],
   [
    "A small business wants firewall, antivirus, content filtering and VPN in one device. What should you recommend?",
    "A UTM (unified threat management) appliance."
   ],
   [
    "How should you protect a legacy embedded controller that cannot be patched?",
    "Change default credentials, update firmware if possible and isolate it on a separate network segment or VLAN."
   ]
  ]
 },
 {
  "t": "SOHO setup: DHCP scopes and reservations, static addressing, NAT, port forwarding, DMZ, UPnP, screened subnet, Wi-Fi security (WPA2/WPA3)",
  "body": [
   "SOHO stands for small office/home office. Setting up a SOHO router is a classic A+ task, often tested with performance-based questions where you configure settings in a simulated router screen. The usual order is: change the default admin password, update the firmware, configure addressing, set up wireless security, then add any port forwarding the business needs. Doing the security steps first matters because a router with default credentials and old firmware is an easy target the moment it is online.",
   "The router's DHCP (Dynamic Host Configuration Protocol) server hands out addresses from a scope, which is the range of addresses available, for example 192.168.1.100 to 192.168.1.199. Leave room outside the scope for devices with static addresses so the router never hands the same address to two devices. A static address is typed into the device itself and never changes; it suits servers and network equipment. A DHCP reservation instead ties a specific IP address to a device's MAC (media access control) address, so the device still uses DHCP but always gets the same address. Reservations are easier to manage centrally, which makes them a good choice for printers and small servers.",
   "NAT (network address translation) lets many devices on private addresses share one public IP address from the ISP (internet service provider). The router rewrites outgoing packets with its public address and tracks the connections so replies go back to the right device. NAT also blocks unsolicited inbound connections by default, because the router does not know which internal device should receive them. Port forwarding creates a rule that sends inbound traffic on a specific port to a specific internal IP address, for example forwarding TCP 443 to a web server at 192.168.1.20. That is why the target device needs a static address or reservation; if its address changes, the rule points at the wrong host.",
   "A DMZ (demilitarized zone), in the SOHO router sense, often called a DMZ host, forwards all unsolicited inbound traffic to one internal host. It is sometimes used for game consoles but exposes that host completely, so it should be avoided when a port forward would do. A screened subnet is the proper business design: a separate network segment between the internet and the internal LAN, protected by firewall rules, where public-facing servers live so a compromise does not reach internal systems. CompTIA now uses screened subnet as the preferred term for this design. UPnP (Universal Plug and Play) lets devices and applications open port forwards on the router automatically. It is convenient but risky, because malware can use it too, so best practice is to disable it unless needed.",
   "For wireless security, use WPA3 (Wi-Fi Protected Access 3) where all devices support it, or WPA2 with AES (Advanced Encryption Standard) otherwise; a WPA2/WPA3 transition mode can support both during a migration. WPA3 Personal uses SAE (Simultaneous Authentication of Equals), which resists offline password-guessing attacks. Personal mode uses a shared passphrase; Enterprise mode uses individual credentials through a RADIUS server. Avoid WEP, the original WPA and TKIP, and disable WPS (Wi-Fi Protected Setup) because its PIN method is weak. Use a strong passphrase, change the default SSID to something that does not identify the owner, and consider a separate guest network that cannot reach internal devices.",
   "Consider a worked example. A photographer runs a small file server at home that clients must reach over HTTPS. You change the router's admin password, update its firmware, and set the DHCP scope to 192.168.1.100 through 199. You create a DHCP reservation of 192.168.1.20 for the server's MAC address, then forward TCP 443 from the internet to 192.168.1.20. You leave the DMZ host setting off and disable UPnP. For Wi-Fi you choose WPA3, disable WPS, and create a guest network for visiting clients.",
   "Common mistakes: forwarding a port to a device that gets a new DHCP address every few days; putting static addresses inside the DHCP scope, causing IP conflicts; using the DMZ host setting when a single port forward would work; leaving UPnP and WPS on for convenience; confusing a SOHO DMZ host with a true screened subnet; and choosing WPA2 with TKIP instead of AES.",
   "Exam questions use configuration clues. 'Port forward stops working after a reboot' points to a missing reservation or static IP. 'Expose one service to the internet' means port forwarding, not the DMZ host. 'Public servers isolated from the internal network' means screened subnet. 'Applications opening ports automatically' means UPnP, which should be disabled. 'Strongest wireless security for a home office' means WPA3, or WPA2 with AES when older devices require it."
  ],
  "terms": [
   [
    "DHCP scope",
    "The range of IP addresses a DHCP server can hand out."
   ],
   [
    "DHCP reservation",
    "A setting that always gives the same IP address to a device based on its MAC address."
   ],
   [
    "NAT",
    "Network address translation, which lets many private addresses share one public address."
   ],
   [
    "Port forwarding",
    "A rule that sends inbound traffic on a specific port to a specific internal host."
   ],
   [
    "DMZ host",
    "A SOHO router setting that forwards all unsolicited inbound traffic to one internal device."
   ],
   [
    "Screened subnet",
    "A separate, firewalled network segment for public-facing servers."
   ],
   [
    "UPnP",
    "Universal Plug and Play, which lets devices open router port forwards automatically."
   ],
   [
    "SAE",
    "Simultaneous Authentication of Equals, the WPA3 Personal handshake that resists offline password guessing."
   ]
  ],
  "example": "A small accounting firm's security camera recorder must be viewable remotely. The technician gives the recorder a DHCP reservation, forwards only the recorder's secure web port to that address, and changes the recorder's default password. They also notice UPnP had opened several unexpected ports, so they disable UPnP, remove the automatic rules and confirm with an external port check that only the intended port is open.",
  "tip": "Port forwarding needs a fixed internal address, so pair it with a static IP or DHCP reservation. Prefer port forwarding over the SOHO DMZ host setting. Choose WPA3, or WPA2 with AES, and disable WPS and UPnP.",
  "check": [
   [
    "Why should a device that receives port-forwarded traffic have a reservation or static IP?",
    "The forwarding rule points to a specific internal address; if the device's address changes, traffic goes to the wrong place."
   ],
   [
    "What is the difference between a DHCP reservation and a static IP address?",
    "A reservation is set on the DHCP server and tied to the device's MAC address; a static IP is configured manually on the device."
   ],
   [
    "Why is using the SOHO DMZ host setting discouraged?",
    "It forwards all unsolicited inbound traffic to one host, exposing it completely, when a specific port forward is usually enough."
   ],
   [
    "Which wireless settings are best practice on a new SOHO router?",
    "WPA3 (or WPA2 with AES), a strong passphrase, WPS disabled and a non-identifying SSID, with a separate guest network if needed."
   ]
  ]
 },
 {
  "t": "IP addressing: IPv4 vs IPv6, public vs private ranges, APIPA, static vs dynamic, subnet mask and default gateway",
  "body": [
   "An IP (Internet Protocol) address identifies a device on a network so traffic can reach it. Understanding the parts of an IP configuration lets you read the output of `ipconfig` on Windows or `ip addr` on Linux and quickly tell whether a device is set up correctly. The A+ exam relies on a small set of facts here: the two address formats, the private ranges, what an APIPA address means, and what the subnet mask and default gateway do.",
   "IPv4 addresses are 32 bits long, written as four decimal numbers from 0 to 255 separated by dots, such as 192.168.1.25. That gives about 4.3 billion addresses, which is not enough for the modern internet, so private addressing and NAT (network address translation) are used to stretch them. IPv6 addresses are 128 bits long, written as eight groups of four hexadecimal digits separated by colons, such as 2001:0db8:0000:0000:0000:0000:0000:0001. You can shorten an IPv6 address by dropping leading zeros in each group and replacing one run of all-zero groups with a double colon, so that example becomes 2001:db8::1. The double colon can be used only once in an address. Every IPv6 interface has a link-local address beginning with fe80, and the loopback address is ::1, compared with 127.0.0.1 in IPv4.",
   "Private IPv4 ranges are reserved for internal networks and are not routed on the internet. They are 10.0.0.0 to 10.255.255.255, 172.16.0.0 to 172.31.255.255 and 192.168.0.0 to 192.168.255.255. Everything else usable is public. A home router hands out private addresses internally and uses NAT to share its single public address. If a computer shows an address in the 169.254.x.x range, that is APIPA (Automatic Private IP Addressing). Windows assigns it to itself when it is set for DHCP (Dynamic Host Configuration Protocol) but cannot reach a DHCP server. An APIPA address can talk only to other APIPA hosts on the same segment, so it is a clear sign of a DHCP or physical connection problem.",
   "Addresses can be static, typed in manually, or dynamic, assigned by DHCP. Static addressing suits servers, printers and network devices whose address others depend on. Dynamic addressing is easier for ordinary clients and avoids typing mistakes and duplicate-address conflicts. A complete IPv4 configuration has four parts: the IP address, the subnet mask, the default gateway and at least one DNS (Domain Name System) server. The subnet mask divides an address into a network portion and a host portion. With the common mask 255.255.255.0, also written /24, the first three numbers identify the network and the last identifies the host, so 192.168.1.25 and 192.168.1.80 are on the same network. The default gateway is the router's address on your local network; traffic for any other network is sent there.",
   "```text\nC:\\> ipconfig\n   IPv4 Address. . . . . . . : 169.254.37.112\n   Subnet Mask . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . :\n```",
   "Consider a worked example. A user says nothing works on their desktop. You run `ipconfig` and see the output above: an address beginning with 169.254 and no default gateway. That tells you the PC asked for an address and got no reply from the DHCP server. You check the network cable, find it loose at the wall jack, reseat it, and run `ipconfig /release` and `ipconfig /renew`. The PC now shows 192.168.1.57, mask 255.255.255.0 and gateway 192.168.1.1, and the internet works. Had it received a valid address but only local printers worked, you would have checked the gateway; had names failed while IP addresses worked, you would have checked DNS.",
   "Common mistakes: treating 172.32.x.x as private, when the private block ends at 172.31; thinking APIPA is a normal working configuration; using a double colon twice in one IPv6 address; confusing the default gateway, which is the local router, with the DNS server; and assigning a static address inside the DHCP scope, which can cause a duplicate address conflict.",
   "Exam questions give you an address or symptom. '169.254.x.x' means the client could not reach DHCP. 'Can reach local devices but not the internet' means the gateway is missing or wrong. 'Can ping IP addresses but not names' means DNS. 'Which address is private?' tests the three ranges. 'Which is the IPv6 loopback?' is ::1, and 'address starting with fe80' is IPv6 link-local."
  ],
  "terms": [
   [
    "IPv4",
    "A 32-bit address written as four decimal numbers separated by dots."
   ],
   [
    "IPv6",
    "A 128-bit address written as eight groups of hexadecimal digits separated by colons."
   ],
   [
    "Private address",
    "An address from 10.0.0.0/8, 172.16.0.0/12 or 192.168.0.0/16 that is not routed on the internet."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing, a 169.254.x.x address Windows assigns itself when DHCP fails."
   ],
   [
    "Subnet mask",
    "A value that separates the network portion of an address from the host portion."
   ],
   [
    "Default gateway",
    "The local router address that a device sends traffic to for other networks."
   ],
   [
    "Link-local address",
    "An IPv6 address starting with fe80 that works only on the local segment."
   ]
  ],
  "example": "A new network printer is given a static address of 192.168.10.50 with mask 255.255.255.0, but staff on 192.168.1.x cannot reach it. The technician compares configurations and sees that the printer is on a different network from the users and has no gateway configured. After correcting the printer to 192.168.1.50 with gateway 192.168.1.1, and reserving that address outside the DHCP scope, everyone can print.",
  "tip": "169.254.x.x means the client could not reach DHCP. Memorize the three private ranges, especially that 172.16 to 172.31 is private but 172.32 is not. Local works but remote fails means gateway; IPs work but names fail means DNS.",
  "check": [
   [
    "A PC has the address 169.254.12.40. What does this tell you?",
    "It is an APIPA address, so the PC is set for DHCP but could not reach a DHCP server."
   ],
   [
    "Is 172.20.5.9 a private or public address?",
    "Private, because it falls within 172.16.0.0 to 172.31.255.255."
   ],
   [
    "How can 2001:0db8:0000:0000:0000:0000:0000:0001 be shortened?",
    "To 2001:db8::1, by dropping leading zeros and replacing one run of zero groups with a double colon."
   ],
   [
    "A laptop can print to a local printer but cannot reach any website by name or IP. What should you check?",
    "The default gateway, since local traffic works but traffic to other networks does not."
   ]
  ]
 },
 {
  "t": "DNS records: A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC); VLANs and VPNs",
  "body": [
   "DNS (Domain Name System) is the internet's directory. A DNS zone for a domain holds records, and each record type answers a different question. Knowing the common types helps you set up websites and email and troubleshoot why mail is rejected or a site will not load. This lesson also covers two network concepts the A+ exam groups nearby: VLANs, which separate traffic inside a network, and VPNs, which protect traffic crossing an untrusted network.",
   "An A record maps a hostname to an IPv4 address, for example www pointing to 203.0.113.10. An AAAA record, called quad-A, does the same for an IPv6 address. A CNAME (canonical name) record is an alias that points one name to another name rather than to an address; for example, shop could be a CNAME for a hosted store's name, and whatever address that name resolves to is used. An MX (mail exchanger) record tells other mail servers where to deliver email for the domain, and it includes a priority value where the lowest number is tried first, so you can list a backup mail server with a higher number. MX records point to hostnames, which then need their own A or AAAA records.",
   "TXT records hold text and are widely used for email authentication. SPF (Sender Policy Framework) is a TXT record listing which servers are allowed to send mail for the domain; receiving servers check it to spot forged senders. DKIM (DomainKeys Identified Mail) adds a digital signature to outgoing messages, and the public key needed to verify the signature is published in a TXT record. DMARC (Domain-based Message Authentication, Reporting and Conformance) is a TXT record that tells receivers what to do when a message fails DMARC, meaning neither SPF nor DKIM passes in alignment with the domain in its From address. The policy can be to let the message through and report it, quarantine it or reject it, and it names where to send reports. Together these help stop spoofing and phishing that pretends to come from your domain.",
   "A VLAN (virtual local area network) splits one physical switch, or a set of switches, into separate logical networks. Devices on different VLANs cannot talk directly; traffic between them must go through a router or firewall, where it can be controlled. Organizations use VLANs to separate staff, guests, voice phones and IoT (Internet of Things) devices without buying separate switches. VLANs are configured on managed switches. An access port belongs to one VLAN, while a trunk link carries traffic for several VLANs between switches or to a router, using tags defined by the IEEE 802.1Q standard.",
   "A VPN (virtual private network) creates an encrypted tunnel across an untrusted network such as the internet. A remote-access VPN connects an individual user's device to the office network so they can reach internal resources securely from home or a hotel. A site-to-site VPN connects two office networks through their routers or firewalls so users at both sites share resources as if on one network, without installing anything on each computer. VPN clients may send all traffic through the tunnel (full tunnel) or only traffic for company networks (split tunnel); full tunnel gives more control and inspection, while split tunnel saves bandwidth.",
   "Consider a worked example. A company moves its email to a cloud provider. The next day, customers report replies landing in spam and some messages bouncing. You check DNS and find the MX records still point to the old server, and the SPF TXT record lists only the old server's address. You update the MX records to the provider's hostnames, replace the SPF record with the provider's include value, publish the provider's DKIM public key as a TXT record, and add a DMARC record that starts in report-only mode so you can watch results before enforcing quarantine or reject.",
   "Common mistakes: pointing a CNAME at an IP address, when it must point to another name; thinking the highest MX priority number is preferred, when the lowest is; believing SPF, DKIM and DMARC are separate record types, when all three are stored as TXT records; confusing VLANs, which separate traffic on local switches, with VPNs, which encrypt traffic across the internet; and assuming devices on different VLANs can talk without a router.",
   "Exam questions use record names and scenarios. 'Map a name to IPv6' is AAAA. 'Alias one name to another' is CNAME. 'Where mail for the domain should go' is MX. 'Which servers may send mail for the domain' is SPF. 'Signature verified with a published public key' is DKIM. 'Policy for failed messages and reporting' is DMARC. 'Separate guest and staff traffic on the same switch' is VLAN. 'Connect two offices securely over the internet' is a site-to-site VPN."
  ],
  "terms": [
   [
    "A record",
    "A DNS record that maps a hostname to an IPv4 address."
   ],
   [
    "AAAA record",
    "A DNS record that maps a hostname to an IPv6 address."
   ],
   [
    "CNAME record",
    "A DNS alias that points one name to another name."
   ],
   [
    "MX record",
    "A DNS record naming the mail servers for a domain, with the lowest priority number preferred."
   ],
   [
    "SPF",
    "Sender Policy Framework, a TXT record listing servers allowed to send mail for a domain."
   ],
   [
    "DKIM",
    "DomainKeys Identified Mail, which signs messages and publishes the verification key in a TXT record."
   ],
   [
    "DMARC",
    "A TXT record that sets the policy and reporting for mail that fails SPF and DKIM alignment."
   ],
   [
    "VLAN",
    "A virtual LAN that logically separates devices on shared switch hardware."
   ]
  ],
  "example": "A clinic has one managed switch serving staff PCs, VoIP phones and a guest Wi-Fi access point. The technician creates three VLANs so guest devices cannot reach patient records and phones get their own traffic class. A trunk link carries all three VLANs to the firewall, which enforces rules between them. Clinicians working from home use a remote-access VPN to reach the records system securely.",
  "tip": "A is IPv4, AAAA is IPv6, CNAME is an alias to another name, MX is mail with the lowest priority number preferred. SPF, DKIM and DMARC are all TXT records. VLANs separate traffic on switches; VPNs encrypt traffic across the internet.",
  "check": [
   [
    "Which DNS record type maps a name to an IPv6 address?",
    "The AAAA (quad-A) record."
   ],
   [
    "A domain has two MX records with priorities 10 and 20. Which server is tried first?",
    "The one with priority 10, because the lowest number is preferred."
   ],
   [
    "Legitimate mail from a company lands in spam after changing email providers. Which records should you check?",
    "The MX records and the SPF, DKIM and DMARC TXT records, which may still reflect the old provider."
   ],
   [
    "What is the difference between a site-to-site VPN and a remote-access VPN?",
    "Site-to-site connects two networks through their gateways; remote-access connects an individual device to a network."
   ]
  ]
 },
 {
  "t": "Internet connection types: satellite, fiber, cable, DSL, cellular, fixed wireless (WISP)",
  "body": [
   "Choosing an internet connection means balancing speed, latency, reliability, cost and what is available at the location. Latency is the delay for data to make a round trip, and it matters most for interactive use such as video calls and gaming. The A+ exam typically describes a customer's situation, such as a rural farm or a busy design studio, and asks which connection type fits best, so learn the character and typical weakness of each.",
   "Fiber carries data as light through glass strands. It offers the highest speeds, often symmetrical upload and download, very low latency and immunity to electrical interference. At the customer premises an ONT (optical network terminal) converts the light to Ethernet. Its main limitation is availability, since the provider must run fiber to the building, and installation can take time. Cable internet runs over the same coaxial network used for cable television, using a cable modem. It delivers high download speeds but usually slower uploads, and because neighbors share the local segment, speeds can drop at busy times of day.",
   "DSL (digital subscriber line) uses existing telephone copper lines. It is widely available where phone lines exist, but speed falls sharply with distance from the provider's equipment, so a customer far from the exchange may get only modest speeds. Most home DSL is asymmetric (ADSL), with faster downloads than uploads. DSL can share the line with voice calls using filters on the telephones. It is generally slower than cable or fiber and is being phased out in many areas as providers retire copper networks.",
   "Satellite internet reaches almost anywhere with a clear view of the sky, making it an option for rural and remote sites. Traditional satellite service uses satellites in very high geostationary orbit, which causes high latency because signals travel a long way up and back; that makes video calls and online gaming noticeably laggy. Newer services use large constellations of LEO (low Earth orbit) satellites, which greatly reduce latency. Satellite service can be affected by heavy rain or snow, called rain fade, and by obstructions such as trees, so dish placement matters.",
   "Cellular internet uses 4G or 5G mobile networks through a phone hotspot, a USB modem or a dedicated cellular router. It is quick to deploy, good for temporary sites and useful as a backup or failover link, but it may have data caps and performance that varies with signal and network load. Fixed wireless is delivered by a WISP (wireless internet service provider) using a directional antenna on the customer's building aimed at the provider's tower. It usually needs line of sight, and it serves rural areas where laying cable is impractical, generally with lower latency than traditional geostationary satellite. Some carriers also offer fixed wireless over their 5G networks to homes.",
   "Consider a worked example. A veterinary practice on a rural road has no cable or fiber, and the nearest telephone exchange is many kilometers away, so DSL would be slow. A local WISP has a tower on a hill that is visible from the practice's roof. You recommend fixed wireless as the primary link because it gives reasonable speed and lower latency for their video consultations, with a cellular router as automatic failover. If the tower had not been in view, a low Earth orbit satellite service would have been the next option to evaluate.",
   "Common mistakes: recommending traditional geostationary satellite for latency-sensitive work such as gaming or video conferencing; assuming DSL performance is the same everywhere, when it depends on distance; expecting cable uploads to match downloads; forgetting that fixed wireless needs line of sight to the tower; and ignoring data caps on cellular links. When recommending, ask what is available at the address, how many users there are, whether they need strong upload speed or low latency, and whether a backup link is required.",
   "Exam questions use a location and a requirement. 'Remote area, no wired options, clear view of sky' suggests satellite, with 'high latency' as the classic drawback of geostationary service. 'Rural business with line of sight to a provider tower' points to fixed wireless or WISP. 'Speed drops the farther the customer is from the provider' is DSL. 'Shared with neighbors, slows in the evening' is cable. 'Fastest, symmetrical, immune to interference' is fiber. 'Temporary site or backup link' points to cellular."
  ],
  "terms": [
   [
    "Latency",
    "The delay for data to travel to its destination and back."
   ],
   [
    "Fiber",
    "Internet service that carries data as light through glass strands, offering high, often symmetrical speeds."
   ],
   [
    "Cable internet",
    "Internet delivered over the coaxial cable TV network using a cable modem."
   ],
   [
    "DSL",
    "Digital subscriber line, internet over telephone copper whose speed drops with distance."
   ],
   [
    "Geostationary satellite",
    "A satellite in very high orbit that stays over one spot, causing high latency."
   ],
   [
    "LEO satellite",
    "A low Earth orbit satellite in a large constellation that provides lower-latency service."
   ],
   [
    "WISP",
    "Wireless internet service provider, delivering fixed wireless service to a directional antenna with line of sight."
   ]
  ],
  "example": "A film production company sets up a temporary office at a remote location for six weeks. There is no wired service, and the team uploads large video files each night. The technician deploys a 5G cellular router with an external antenna as the main connection, checks the plan's data allowance against expected uploads, and adds a low Earth orbit satellite terminal as a backup for days with poor cellular signal.",
  "tip": "High latency is the classic weakness of traditional geostationary satellite. DSL slows with distance. Cable is shared with neighbors. Fixed wireless needs line of sight to a tower. Fiber is fastest and most reliable where available.",
  "check": [
   [
    "Why does traditional satellite internet have high latency?",
    "Signals must travel to a geostationary satellite very far above the Earth and back."
   ],
   [
    "A customer's DSL is much slower than their neighbor's in the next town. What is a likely reason?",
    "They are farther from the provider's equipment, and DSL speed drops with distance."
   ],
   [
    "What does fixed wireless from a WISP usually require at the customer site?",
    "A directional antenna with line of sight to the provider's tower."
   ],
   [
    "Which connection type typically offers symmetrical speeds and immunity to electrical interference?",
    "Fiber."
   ]
  ]
 },
 {
  "t": "Network types: LAN, WAN, PAN, MAN, SAN, WLAN",
  "body": [
   "Networks are classified mainly by the geographic area they cover and, in one important case, by their purpose. These names come up constantly in documentation, vendor proposals and exam questions, so learn each one along with a typical example. The skill the A+ exam tests is simple but easy to rush: read the scenario, find the clue about scale or purpose, and pick the matching network type.",
   "A PAN (personal area network) is the smallest, covering the space around one person, typically a few meters. Bluetooth headphones paired to a phone, a smartwatch linked to a phone and a wireless mouse connected to a laptop all form a PAN. A LAN (local area network) connects devices within a single building or site, such as a home, an office floor or a school. LANs are usually owned and managed by the organization, run over Ethernet and Wi-Fi, and offer high speeds and low latency. A WLAN (wireless LAN) is a LAN that uses Wi-Fi rather than cables to connect devices; in practice most LANs combine wired and wireless parts, and the WLAN is the wireless portion.",
   "A MAN (metropolitan area network) spans a city or large campus, linking several buildings across a town. Examples include a city government connecting its offices, libraries and schools, or a university linking campuses across a city. MANs are often built on fiber owned by the organization or leased from a provider. A WAN (wide area network) spans large distances such as regions, countries or continents. It connects multiple LANs, usually over links leased from carriers or across the internet with VPNs (virtual private networks). A company with offices in several cities uses a WAN, and the internet itself is the largest WAN. WAN links are typically slower and more expensive per unit of bandwidth than LAN links, which is why WAN design focuses on efficiency.",
   "A SAN (storage area network) is different because it is defined by purpose rather than size. It is a dedicated high-speed network that connects servers to shared block-level storage, so servers see the storage as if it were a local disk. SANs use technologies such as Fibre Channel, or iSCSI (Internet Small Computer Systems Interface) over Ethernet, and live in data centers. Do not confuse a SAN with NAS (network-attached storage), which is a single storage device on the LAN that shares files over protocols such as SMB (Server Message Block). A SAN provides block storage to servers; a NAS provides file shares to users.",
   "It helps to see these as layers that nest. Your phone and earbuds form a PAN; the phone joins the office WLAN, which is part of the office LAN; the office LAN connects over a MAN to other buildings in the same city, or over a WAN to offices elsewhere; and in the data center the servers reach their disks over a SAN. One organization can use all of these at once, and a single device can participate in several.",
   "Consider a worked example. A regional hospital group has a main hospital and three clinics in the same city, plus a partner hospital in another state. Within each building, wired PCs and Wi-Fi tablets form the LAN and WLAN. The city buildings are linked by leased fiber, forming a MAN. The connection to the partner hospital across the country uses VPN tunnels over the internet, which is a WAN link. In the hospital's data center, the virtualization servers store patient systems on a Fibre Channel SAN. Doctors' phones paired to Bluetooth headsets form PANs.",
   "Common mistakes: calling a city-wide network a WAN when the exam expects MAN; treating WLAN as a separate network type unrelated to the LAN, when it is the wireless part of a LAN; mixing up SAN and NAS because the acronyms look alike; assuming a SAN is defined by distance; and forgetting that a PAN centers on one person rather than one room.",
   "Exam questions put the answer in the scale clue. 'One person's devices' or 'Bluetooth accessories' points to a PAN. 'One building or floor' points to a LAN, and 'wireless within the building' points to a WLAN. 'Several buildings across a city' points to a MAN. 'Offices in different cities or countries' points to a WAN. 'Servers connected to shared disk arrays with block-level access' points to a SAN, while 'a file-sharing box on the office network' points to NAS."
  ],
  "terms": [
   [
    "PAN",
    "Personal area network, the devices around one person, such as Bluetooth accessories."
   ],
   [
    "LAN",
    "Local area network, devices within one building or site."
   ],
   [
    "WLAN",
    "Wireless LAN, the part of a LAN connected by Wi-Fi."
   ],
   [
    "MAN",
    "Metropolitan area network, linking sites across a city or large campus."
   ],
   [
    "WAN",
    "Wide area network, connecting networks across regions, countries or continents."
   ],
   [
    "SAN",
    "Storage area network, a dedicated network giving servers block-level access to shared storage."
   ],
   [
    "NAS",
    "Network-attached storage, a device on the LAN that shares files with users."
   ]
  ],
  "example": "A city council links its town hall, libraries and fire stations with fiber it owns, creating a MAN. Each building has its own LAN and WLAN for staff and the public. The council also connects to the national government's systems over a secure WAN link, and its data center servers keep their virtual machine disks on a SAN.",
  "tip": "Scale clues decide the answer: person, building, city, country. SAN is the odd one out because it is about storage, not distance, and it gives servers block storage, unlike file-sharing NAS.",
  "check": [
   [
    "A university connects four campuses spread across one city. Which network type is this?",
    "A MAN, or metropolitan area network."
   ],
   [
    "What is the difference between a SAN and a NAS?",
    "A SAN is a dedicated network giving servers block-level storage; a NAS is a single device sharing files over the LAN."
   ],
   [
    "A smartwatch paired to a phone is an example of which network type?",
    "A PAN, or personal area network."
   ],
   [
    "How does a WLAN relate to a LAN?",
    "A WLAN is the wireless portion of a LAN, connecting devices by Wi-Fi instead of cables."
   ]
  ]
 },
 {
  "t": "Networking tools: crimper, cable stripper, punchdown tool, toner probe, cable tester, loopback plug, Wi-Fi analyzer, network tap",
  "body": [
   "Building and repairing networks takes a small kit of specialized tools. The A+ exam often describes a task, such as finding which unlabeled cable goes to a wall jack or attaching a new plug to a patch cable, and asks which tool to use. Learn what each tool is for and the order you would use them in, and these questions become quick points.",
   "A cable stripper removes the outer jacket of a twisted pair cable, and sometimes the insulation on individual wires, without nicking the conductors inside. A crimper attaches a connector, such as an RJ45 plug, to the end of a cable. You untwist the pairs, arrange them in the T568A or T568B order, trim them evenly, push them fully into the plug so each wire reaches the end and the jacket sits inside the plug, and squeeze the crimper to press the pins into the wires and lock the jacket in place. A punchdown tool is used at the other end of permanent cabling, pressing individual wires into the insulation-displacement slots of a patch panel, keystone jack or 110 block and trimming the excess. Use the right blade type for the block you are working on.",
   "A toner probe, also called a tone generator and probe, helps you find a particular cable in a bundle or match a wall jack to its patch panel port. You attach the tone generator to one end, then sweep the probe along cables at the other end; it gives an audible tone when it is near the right one. A cable tester checks that a cable is wired correctly. Basic testers verify continuity and pin mapping, catching opens, shorts, crossed pairs and reversed wires. More advanced certifiers measure length, crosstalk and performance against a category standard, which is useful when proving a new installation meets Cat 6 requirements.",
   "A loopback plug connects a port's transmit pins to its receive pins, so a network interface or port can send data to itself. It helps you test whether a NIC (network interface card) or switch port is working, independently of the cable and the rest of the network. A Wi-Fi analyzer, which can be an app on a laptop or phone or a dedicated device, shows nearby wireless networks, their channels, signal strength and interference. Use it to pick less-crowded channels, find dead spots and plan access point placement. It is the wireless counterpart to a cable tester: it tells you about the medium rather than about one device.",
   "A network tap is a device placed inline on a cable that copies all passing traffic to a monitoring port without disturbing the connection. Security and network teams use taps with packet capture tools or IDS (intrusion detection system) sensors to see exactly what crosses a link. A similar result can be achieved on a managed switch with port mirroring, but a tap is a separate hardware device that captures everything, including errors. A multimeter and a cable certifier may also appear in toolkits, but the exam list focuses on the tools above.",
   "Consider a worked example. You are asked to connect a new desk in an office where none of the wall jacks are labeled. You plug the tone generator into the jack by the desk, go to the wiring closet and sweep the probe across the patch panel until you hear the tone on port 23. You test that run with a cable tester and find the brown pair open, so you re-terminate the keystone jack at the wall with the punchdown tool and test again, which passes. Finally you make a short patch cable with the stripper and crimper, test it, and connect port 23 to the switch.",
   "Common mistakes: reaching for a crimper to terminate a patch panel, which uses a punchdown tool; using a toner probe to verify wiring, when it only locates cables; using a cable tester to find a cable in a bundle; forgetting to test a newly made cable; mixing T568A on one end and T568B on the other when you meant to make a straight-through cable; and assuming a loopback plug tests the cable run, when it tests the port itself.",
   "Exam questions describe a task. 'Attach an RJ45 connector to a cable' means crimper. 'Terminate wires on a patch panel or keystone jack' means punchdown tool. 'Identify which cable in the closet goes to a jack' means toner probe. 'Verify pin-out, opens and shorts' means cable tester. 'Test a NIC or switch port without the network' means loopback plug. 'Find the least-crowded channel' means Wi-Fi analyzer. 'Copy traffic from a link for monitoring' means network tap."
  ],
  "terms": [
   [
    "Crimper",
    "A tool that attaches a connector such as RJ45 to the end of a cable."
   ],
   [
    "Cable stripper",
    "A tool that removes cable jacket and insulation without damaging the conductors."
   ],
   [
    "Punchdown tool",
    "A tool that seats and trims wires in patch panels, keystone jacks and 110 blocks."
   ],
   [
    "Toner probe",
    "A tone generator and probe used to locate a specific cable in a bundle."
   ],
   [
    "Cable tester",
    "A device that checks continuity and wiring order, finding opens, shorts and crossed pairs."
   ],
   [
    "Loopback plug",
    "A plug that connects a port's transmit to its receive so the port can test itself."
   ],
   [
    "Wi-Fi analyzer",
    "A tool that shows wireless networks, channels, signal strength and interference."
   ],
   [
    "Network tap",
    "An inline device that copies all traffic on a link to a monitoring port."
   ]
  ],
  "example": "A security team suspects unusual traffic leaving a branch office. They install a network tap on the cable between the branch firewall and the ISP router and connect its monitor port to a laptop running a packet capture tool. Because the tap is passive, the connection stays up during installation, and the team collects a full record of traffic for analysis without changing the firewall's configuration.",
  "tip": "Crimper for plugs on cable ends, punchdown for patch panels and jacks, toner probe to find a cable, cable tester to verify wiring, loopback plug to test a port by itself, Wi-Fi analyzer for channels and signal.",
  "check": [
   [
    "Which tool do you use to terminate wires on a keystone jack?",
    "A punchdown tool."
   ],
   [
    "You need to find which cable in a closet bundle leads to a specific office jack. Which tool helps?",
    "A toner probe (tone generator and probe)."
   ],
   [
    "What does a loopback plug test?",
    "Whether a network port or NIC can send and receive, independent of the cable and the rest of the network."
   ],
   [
    "After crimping a new patch cable, what should you do before using it?",
    "Test it with a cable tester to confirm correct pin mapping and no opens or shorts."
   ]
  ]
 },
 {
  "t": "Displays: LCD panel types (IPS, TN, VA), OLED, mini-LED, resolution, refresh rate, brightness, color gamut, touch screens",
  "body": [
   "Monitors are one of the most visible parts of a computer, and users notice every flaw. To recommend and support displays you need to know the panel technologies and the specifications that describe them. The A+ exam typically gives a user's priority, such as accurate color for photo editing or fast motion for gaming, and asks which panel type or specification matters, or it gives a symptom such as fuzzy text and asks for the fix.",
   "Most monitors are LCDs (liquid crystal displays) lit by an LED (light-emitting diode) backlight, and they come in three main panel types. TN (twisted nematic) panels are the oldest and cheapest, with very fast response times, which suits competitive gaming, but they have poor viewing angles and weaker color. IPS (in-plane switching) panels offer the best color accuracy and wide viewing angles, making them the usual choice for photo and design work and general office use; they cost more and typically have a lower contrast ratio than VA. VA (vertical alignment) panels sit in between, with strong contrast and deep blacks, good color and viewing angles that are better than TN, but they can show some smearing in fast motion.",
   "OLED (organic light-emitting diode) displays have no backlight; each pixel lights itself and can turn fully off. That gives perfect blacks, very high contrast and fast response, but OLED costs more and can suffer burn-in from static images such as toolbars. Mini-LED is an improved LCD backlight made of thousands of tiny LEDs grouped into many local dimming zones, so dark areas of the image can be dimmed independently. It boosts contrast and brightness while avoiding OLED's burn-in risk, although small halos, called blooming, can appear around bright objects on dark backgrounds. Remember that mini-LED is still an LCD; the LEDs are the backlight, not the pixels.",
   "Resolution is the number of pixels, written as width by height, such as 1920x1080 (Full HD or 1080p), 2560x1440 (QHD) and 3840x2160 (4K UHD). Every LCD and OLED panel has a native resolution; running anything else makes text look fuzzy because the display must scale the image. If text is too small at native resolution, use the operating system's scaling setting instead of lowering the resolution. Refresh rate, measured in hertz (Hz), is how many times per second the screen redraws; 60 Hz is standard, and gaming monitors run higher for smoother motion. The cable, port and graphics card must all support the chosen refresh rate at that resolution. Response time is how quickly a pixel changes color, measured in milliseconds.",
   "Brightness is measured in nits (candelas per square meter), which matters in bright rooms and for HDR (high dynamic range) content. Color gamut is the range of colors a display can show, expressed as coverage of a standard such as sRGB or DCI-P3; wide gamut matters for creative work, and calibration with a colorimeter keeps it accurate. Touch screens add a digitizer layer. Capacitive touch, used on phones and most modern touch monitors, senses the charge of a finger and supports multi-touch. Resistive touch, found on older kiosks and some industrial equipment, responds to pressure from anything, including a gloved finger or stylus, but is less clear and less responsive. After installing a touch monitor on Windows, you may need to calibrate it so touches line up with the image.",
   "Consider a worked example. A marketing team needs new monitors: the designers want accurate color and consistent appearance when two people look at the same screen, while a video editor also wants deep blacks for grading. You recommend IPS panels with wide color gamut coverage for the designers, and either an OLED or a mini-LED monitor for the editor, noting OLED's burn-in risk if static timelines stay on screen all day. After installation one designer complains of blurry text; the resolution was set below native, so you set it back to native and adjust scaling to 125 percent.",
   "Common mistakes: recommending TN for color-critical work; thinking mini-LED is a self-emissive technology like OLED; lowering resolution to make text bigger instead of using scaling; buying a high refresh rate monitor but connecting it with a cable or port that cannot carry that rate; confusing brightness in nits with contrast ratio; and expecting a capacitive screen to work with an ordinary glove.",
   "Exam questions pair a requirement with a technology. 'Best color and viewing angles' means IPS. 'Fastest response, lowest cost' means TN. 'Best contrast among LCDs' means VA. 'Perfect blacks, no backlight, risk of burn-in' means OLED. 'Local dimming zones in the backlight' means mini-LED. 'Text looks fuzzy' means not running native resolution. 'Smooth motion in games' means higher refresh rate. 'Works with gloves or any stylus' means resistive touch."
  ],
  "terms": [
   [
    "TN",
    "Twisted nematic, a fast and inexpensive LCD panel with narrow viewing angles and weaker color."
   ],
   [
    "IPS",
    "In-plane switching, an LCD panel with the best color accuracy and wide viewing angles."
   ],
   [
    "VA",
    "Vertical alignment, an LCD panel with strong contrast that sits between TN and IPS."
   ],
   [
    "Mini-LED",
    "An LCD backlight made of many tiny LEDs in local dimming zones for higher contrast."
   ],
   [
    "Native resolution",
    "The physical pixel grid of a panel, which gives the sharpest image."
   ],
   [
    "Refresh rate",
    "How many times per second a display redraws the image, measured in hertz."
   ],
   [
    "Color gamut",
    "The range of colors a display can reproduce, measured against standards such as sRGB or DCI-P3."
   ],
   [
    "Nit",
    "A unit of brightness equal to one candela per square meter."
   ]
  ],
  "example": "A factory replaces its old monitor-and-mouse stations on the production floor with touch screens. Workers wear gloves, so the technician chooses resistive touch panels that respond to pressure from any object. In the office, the same company buys capacitive touch monitors for staff who use touch gestures, and calibrates each one in Windows after installation so taps land exactly where users expect.",
  "tip": "TN is fastest and cheapest, IPS has the best color and viewing angles, VA has the best contrast among LCDs. OLED has no backlight and can burn in. Mini-LED is a better LCD backlight with local dimming. Always run native resolution.",
  "check": [
   [
    "A photographer needs accurate color and wide viewing angles. Which LCD panel type should you recommend?",
    "IPS (in-plane switching)."
   ],
   [
    "Why does text look blurry when a monitor is set below its native resolution?",
    "The display must scale the image to fit its physical pixel grid, which softens edges."
   ],
   [
    "How is mini-LED different from OLED?",
    "Mini-LED is an LCD with a backlight of many tiny LEDs in dimming zones; OLED pixels emit their own light with no backlight."
   ],
   [
    "Which touch technology works with a gloved finger or any stylus?",
    "Resistive touch, which responds to pressure."
   ]
  ]
 },
 {
  "t": "Cables and connectors: USB-A/C, Thunderbolt, HDMI, DisplayPort, DVI, VGA, SATA, Molex, Lightning, Cat 5e/6/6a, T568A/B, plenum vs riser, coax, fiber, adapters",
  "body": [
   "Cables and connectors are the physical glue of every computer and network, and the A+ exam expects you to identify them by name, shape and purpose, and to choose the right one for a job. Many questions show or describe a connector and ask what it is, or give a requirement such as 10 Gbps over 90 meters and ask which cable category to use.",
   "USB (Universal Serial Bus) connects most peripherals. USB-A is the flat, rectangular connector found on computers and chargers; it only fits one way. USB-C is the small, oval, reversible connector that can carry data, power and, on supporting ports, video. USB speeds vary by version, so a USB-C shape does not guarantee the fastest speed. Thunderbolt is a high-speed interface developed by Intel that carries data, video and power, and supports daisy-chaining devices. Earlier Thunderbolt versions used the Mini DisplayPort connector; modern Thunderbolt uses the USB-C connector, so look for the lightning-bolt icon to tell a Thunderbolt port from an ordinary USB-C port. Lightning is Apple's proprietary 8-pin reversible connector used on many iPhones and accessories.",
   "For video, HDMI (High-Definition Multimedia Interface) carries digital video and audio and is standard on TVs, projectors and many monitors. DisplayPort is a digital video and audio interface common on PCs and business monitors, supporting high resolutions and refresh rates and daisy-chaining through MST (multi-stream transport). DVI (Digital Visual Interface) is an older, large connector for digital video, with some versions also carrying analog. VGA (Video Graphics Array) is the oldest: a blue 15-pin connector carrying analog video only, which gives a softer image at high resolutions. Adapters can convert between them, for example DisplayPort to HDMI or USB-C to HDMI; converting digital to analog VGA needs an active adapter that contains a converter chip.",
   "Inside the PC, SATA (Serial ATA) data cables are thin with an L-shaped 7-pin connector for drives, and SATA power uses a wider 15-pin L-shaped connector. Molex is an older 4-pin power connector, once used for hard drives and optical drives and now mostly for fans and accessories. Twisted pair network cable comes in categories: Cat 5e supports 1 Gbps up to 100 meters; Cat 6 supports 1 Gbps at 100 meters and 10 Gbps over shorter runs of about 55 meters; and Cat 6a supports 10 Gbps at the full 100 meters. RJ45 connectors terminate network cables, wired to either the T568A or T568B standard. Use the same standard on both ends for a straight-through cable, and one of each for a crossover cable. The two standards differ by swapping the orange and green pairs.",
   "Cable jackets matter for safety. Plenum-rated cable has a fire-resistant jacket that produces less toxic smoke and is required in plenum spaces, the air-handling areas above drop ceilings or below raised floors. Riser-rated cable is for vertical runs between floors and is less strict; plenum cable can be used in place of riser, but not the reverse. Coaxial cable, with a central conductor and shielding, is used for cable internet and TV, typically with an F-type screw-on connector, and RG-6 is the common type. Fiber optic cable carries light, is immune to EMI (electromagnetic interference) and runs much farther than copper. Single-mode fiber uses a laser for long distances, and multimode fiber uses cheaper light sources over shorter distances. Common fiber connectors include LC, SC and ST.",
   "Consider a worked example. An office is adding a conference room 90 meters from the wiring closet, with the cable running above a drop ceiling that the building uses for air return, and the room needs 10 Gbps for a video wall. Cat 6 cannot do 10 Gbps that far, so you choose Cat 6a, and because the run passes through a plenum space it must be plenum-rated. You terminate both ends as T568B for a straight-through link. The old projector in the room only has VGA, so you order an active HDMI to VGA adapter for the new laptop.",
   "Common mistakes: assuming every USB-C port is Thunderbolt; choosing Cat 6 for a 10 Gbps run of more than about 55 meters; using riser cable in a plenum ceiling; mixing T568A and T568B by accident and creating a crossover; using a passive adapter for digital-to-VGA conversion; and mixing up SATA data (7-pin) with SATA power (15-pin), or calling a Molex connector SATA.",
   "Exam questions give a connector description or a requirement. 'Blue 15-pin, analog only' is VGA. 'Digital video and audio on a TV' is HDMI. 'Daisy-chain monitors from a PC' suggests DisplayPort or Thunderbolt. '10 Gbps at 100 meters over copper' is Cat 6a. 'Cable above a drop ceiling used for airflow' requires plenum. 'Screw-on connector for cable internet' is F-type on coax. 'Longest distance with a laser' is single-mode fiber."
  ],
  "terms": [
   [
    "Thunderbolt",
    "A high-speed interface for data, video and power that uses the USB-C connector in modern versions."
   ],
   [
    "DisplayPort",
    "A digital video and audio interface common on PCs that supports daisy-chaining with MST."
   ],
   [
    "VGA",
    "Video Graphics Array, a blue 15-pin analog-only video connector."
   ],
   [
    "Cat 6a",
    "Twisted pair cable that supports 10 Gbps up to 100 meters."
   ],
   [
    "T568A and T568B",
    "The two wiring standards for RJ45; the same on both ends makes a straight-through cable."
   ],
   [
    "Plenum cable",
    "Fire-resistant, low-smoke cable required in air-handling spaces."
   ],
   [
    "Single-mode fiber",
    "Fiber that uses a laser and a narrow core for very long distances."
   ],
   [
    "Active adapter",
    "An adapter with electronics that converts signals, such as digital to analog VGA."
   ]
  ],
  "example": "A school's new projector connects by HDMI, but one teacher's older laptop has only a DisplayPort output. The technician supplies a DisplayPort to HDMI adapter. In another room, a legacy projector has only VGA, so for a laptop with only USB-C they provide a USB-C to VGA active adapter, which converts the digital signal to analog.",
  "tip": "VGA is the only analog-only video connector in the list. Cat 6 carries 10 Gbps only to about 55 meters; Cat 6a reaches 100 meters. Plenum is required in air-handling spaces. Thunderbolt uses the USB-C shape, but not every USB-C port is Thunderbolt.",
  "check": [
   [
    "Which cable category supports 10 Gbps over a full 100-meter run?",
    "Cat 6a."
   ],
   [
    "What kind of cable must be used above a drop ceiling that serves as an air-return space?",
    "Plenum-rated cable, which is fire-resistant and produces less toxic smoke."
   ],
   [
    "How do you make a straight-through Ethernet cable?",
    "Terminate both ends using the same standard, either T568A or T568B."
   ],
   [
    "Why does a laptop with only HDMI need an active adapter for a VGA projector?",
    "HDMI is digital and VGA is analog, so a converter is needed to change the signal."
   ]
  ]
 },
 {
  "t": "RAM: DDR4 vs DDR5, DIMM vs SODIMM, single, dual and multichannel, ECC, virtual RAM",
  "body": [
   "RAM (random access memory) is the fast, temporary workspace where the CPU (central processing unit) keeps the programs and data it is using right now. It is volatile, so its contents disappear when power is removed. Too little RAM is one of the most common causes of a slow computer, and choosing the correct type is a frequent A+ question, because memory that looks similar is often not interchangeable at all.",
   "DDR stands for double data rate, meaning data is transferred twice per clock cycle. DDR4 and DDR5 are the current generations. DDR5 offers higher speeds and larger module capacities, runs at a lower voltage, moves power regulation onto the module with its own PMIC (power management integrated circuit), and splits each module into two independent subchannels for better efficiency. DDR5 modules also include on-die ECC inside the memory chips, which improves chip reliability but is not the same as full ECC memory. Most importantly for technicians, the generations are not interchangeable: the key notch is in a different position, so a DDR5 module physically will not seat in a DDR4 slot, and the motherboard and CPU determine which generation you can use.",
   "Desktops use full-length DIMMs (dual inline memory modules). Laptops and small form factor PCs use shorter SODIMMs (small outline DIMMs). The two are not interchangeable either. Install a DIMM by opening the clips at the ends of the slot, lining up the notch and pressing firmly until the clips lock; a SODIMM goes in at an angle and is pressed down until the side clips click. Some laptops and small PCs have memory soldered to the motherboard, which cannot be upgraded. Always check the system or motherboard documentation for the supported type, speed and maximum capacity before buying.",
   "Memory channels increase bandwidth by letting the memory controller access more than one module at the same time. In single-channel mode it uses one path. In dual-channel mode two matched modules installed in the correct slots are accessed in parallel, which can noticeably improve performance, especially with integrated graphics that share system memory. Many workstation and server platforms support quad-channel or more, which is called multichannel. Motherboards color-code or label the slots; consult the manual to see which slots to fill first. For best results, install identical modules in pairs or sets. If modules of different speeds are mixed, the system usually runs them all at the speed of the slowest.",
   "ECC (error-correcting code) memory detects and corrects single-bit errors caused by electrical interference or faults. It is used in servers and workstations where silent data corruption is unacceptable, but it requires a CPU and motherboard that support it and costs more. Ordinary desktop memory is non-ECC. Server platforms often also use registered or buffered modules, which add a chip to help the controller handle many modules. Virtual RAM, also called virtual memory, is space on a storage drive that the operating system uses as an extension of RAM when physical memory runs low. On Windows it is the paging file, `pagefile.sys`; Linux uses swap space. It prevents crashes when memory fills up, but a drive is far slower than RAM, so heavy use of virtual memory makes a system sluggish.",
   "Consider a worked example. A bookkeeper's desktop has one 8 GB DDR4 DIMM and slows to a crawl with several spreadsheets and a browser open. Task Manager shows memory near full and constant disk activity from paging. You check the motherboard manual: it supports DDR4, dual channel, and says to fill the two slots marked A2 and B2 first. You buy a matched kit of two 16 GB DDR4 DIMMs at the supported speed, install them in A2 and B2, and confirm in the firmware setup and Task Manager that 32 GB is recognized in dual-channel mode. Paging drops and the system becomes responsive.",
   "Common mistakes: buying DDR5 for a DDR4 board, or a desktop DIMM for a laptop; installing two modules in slots that share a channel so dual channel is not enabled; assuming on-die ECC in DDR5 equals ECC memory; buying ECC modules for a consumer board that does not support them; and trying to fix constant paging by enlarging the paging file instead of adding physical RAM.",
   "Exam questions use compatibility and symptom clues. 'Module will not fit in the slot' points to the wrong generation or form factor. 'Laptop memory upgrade' means SODIMM. 'Install matched pairs in color-coded slots for more bandwidth' means dual channel. 'Server must detect and correct memory errors' means ECC. 'High memory use and constant disk activity' means the system is relying on virtual memory, and the real fix is more physical RAM."
  ],
  "terms": [
   [
    "DDR",
    "Double data rate, memory that transfers data twice per clock cycle."
   ],
   [
    "DIMM",
    "Dual inline memory module, the full-length memory stick used in desktops."
   ],
   [
    "SODIMM",
    "Small outline DIMM, the shorter module used in laptops and small form factor PCs."
   ],
   [
    "Dual channel",
    "A mode in which two matched modules in the correct slots are accessed in parallel for more bandwidth."
   ],
   [
    "ECC memory",
    "Error-correcting code memory that detects and corrects single-bit errors, requiring board and CPU support."
   ],
   [
    "Paging file",
    "The Windows file on disk used as virtual memory when physical RAM runs low."
   ],
   [
    "Virtual memory",
    "Storage space the operating system uses as an extension of RAM."
   ]
  ],
  "example": "A small engineering firm buys a workstation to run simulations overnight. Because a single flipped bit could quietly corrupt a long result, the technician chooses a workstation-class CPU and motherboard that support ECC, and installs four matched ECC DIMMs to use quad-channel mode. The firm's ordinary office desktops keep standard non-ECC DDR5, installed in dual-channel pairs.",
  "tip": "DDR generations, and DIMM versus SODIMM, are never interchangeable. Dual channel needs matched modules in the correct slots. ECC needs board and CPU support. Heavy paging-file use is a sign to add physical RAM.",
  "check": [
   [
    "Can a DDR5 DIMM be installed in a DDR4 motherboard?",
    "No. The notch is in a different position and the board and CPU support only one generation."
   ],
   [
    "A user installed two identical modules but the system reports single-channel mode. What should you check?",
    "Whether the modules are in the correct slots for dual channel according to the motherboard manual."
   ],
   [
    "What does ECC memory do, and what does it require?",
    "It detects and corrects single-bit memory errors, and it requires a CPU and motherboard that support ECC."
   ],
   [
    "A PC shows high memory use and constant disk activity. What is happening and what is the fix?",
    "It is relying heavily on virtual memory in the paging file; adding physical RAM is the real fix."
   ]
  ]
 },
 {
  "t": "Storage: HDD speeds and form factors, SSD interfaces (SATA, NVMe, M.2 keys), flash drives and cards, RAID 0, 1, 5, 6 and 10",
  "body": [
   "Storage holds the operating system, applications and data when the power is off, and choosing and configuring it is a core technician task. The A+ exam expects you to know the types of drives and how they connect, the form factors and connector keys, the common removable flash formats, and the RAID (redundant array of independent disks) levels, including how many drives each needs and how many failures it survives.",
   "An HDD (hard disk drive) stores data magnetically on spinning platters read by heads on a moving arm. Its speed is measured in RPM (revolutions per minute): 5,400 RPM drives are quiet and power-efficient, 7,200 RPM is typical for desktops, and 10,000 and 15,000 RPM drives were used in servers for faster access. Faster spin means lower latency. HDDs come in two main form factors: 3.5-inch for desktops and servers, and 2.5-inch for laptops and compact systems. HDDs offer large capacity at low cost per gigabyte, but they are slower than SSDs and sensitive to shock because of their moving parts. Clicking or grinding noises are a classic sign of a failing HDD.",
   "An SSD (solid-state drive) stores data in flash memory with no moving parts, giving much faster access, silent operation and better shock resistance. SSDs connect through different interfaces. A SATA SSD, often in the 2.5-inch shape, is limited by the SATA interface speed. NVMe (Non-Volatile Memory Express) SSDs connect over PCIe (Peripheral Component Interconnect Express) lanes and are several times faster. The M.2 form factor is a small card that can be either SATA or NVMe; its size is given by a number such as 2280, meaning 22 mm wide and 80 mm long. M.2 connectors are keyed with notches: an M key supports PCIe up to four lanes and is used by NVMe drives, a B key supports SATA and PCIe with fewer lanes, and many M.2 SATA drives have both B and M notches. Check the motherboard manual to learn what each M.2 slot supports.",
   "Flash drives and memory cards are portable flash storage. USB flash drives plug into a USB port. Memory cards include SD (Secure Digital) with its larger-capacity SDHC and SDXC variants, microSD for phones and small devices, and CFexpress or CompactFlash in professional cameras. A device must support the card type and capacity class to read it; an older reader that supports only SDHC will not read an SDXC card. Flash media is convenient but easy to lose, so sensitive data on it should be encrypted.",
   "RAID combines drives. RAID 0 stripes data across two or more drives for speed and full capacity but has no redundancy; one failure loses everything. RAID 1 mirrors two drives so either can fail without data loss, using half the total capacity. RAID 5 stripes data with distributed parity across at least three drives and survives one drive failure, losing one drive's worth of capacity. RAID 6 uses double parity across at least four drives and survives two failures, losing two drives' worth of capacity. RAID 10 (1+0) mirrors pairs of drives and then stripes across the pairs, needing at least four drives, giving speed and redundancy at the cost of half the capacity; it survives one failure per mirrored pair. Remember that RAID provides availability, not backup: deleted, corrupted or ransomware-encrypted files are affected on every drive in the array.",
   "Consider a worked example. A small architecture firm wants a file server with four 4 TB drives that stays running if a drive fails and gives as much usable space as possible. RAID 0 has no fault tolerance, and RAID 10 or RAID 1 would give only half the space. RAID 5 gives 12 TB usable and survives one failure; RAID 6 gives 8 TB and survives two. Because rebuilding large drives takes a long time, during which a second failure would be fatal to RAID 5, you recommend RAID 6, plus a separate nightly backup because RAID is not a backup.",
   "Common mistakes: installing an M.2 SATA drive in an NVMe-only slot; thinking RAID 0 offers redundancy; forgetting the minimum drive counts; calculating RAID 5 capacity as half instead of total minus one drive; treating RAID as a backup; and blaming a card for being faulty when the reader simply does not support its capacity class.",
   "Exam questions use capacity and fault clues. 'Fastest, no redundancy' is RAID 0. 'Mirror of two drives' is RAID 1. 'Three drives minimum, survive one failure with parity' is RAID 5. 'Survive two drive failures' is RAID 6. 'Mirrored pairs striped together' is RAID 10. 'M.2 drive not detected' suggests a SATA versus NVMe mismatch. 'Clicking noise and slow access' points to a failing HDD."
  ],
  "terms": [
   [
    "RPM",
    "Revolutions per minute, the spin speed of an HDD's platters."
   ],
   [
    "NVMe",
    "Non-Volatile Memory Express, a fast SSD protocol that runs over PCIe lanes."
   ],
   [
    "M key",
    "An M.2 notch position used by PCIe x4 NVMe drives."
   ],
   [
    "B key",
    "An M.2 notch position used for SATA and PCIe x2 devices; SATA drives often have B and M notches."
   ],
   [
    "RAID 5",
    "Striping with distributed parity across at least three drives, surviving one failure."
   ],
   [
    "RAID 6",
    "Striping with double parity across at least four drives, surviving two failures."
   ],
   [
    "RAID 10",
    "Mirrored pairs striped together, needing at least four drives and using half the capacity."
   ],
   [
    "SDXC",
    "A high-capacity SD card class that requires a reader supporting it."
   ]
  ],
  "example": "A video editor's workstation has a 2.5-inch SATA SSD that is too slow for 4K footage. The technician checks the motherboard manual, finds an M.2 slot that supports PCIe x4 NVMe, and installs an M-key 2280 NVMe drive for active projects. Finished projects are archived to a two-drive RAID 1 external enclosure, and the studio keeps a separate off-site backup.",
  "tip": "Know minimum drives and fault tolerance: RAID 0 (2, none), RAID 1 (2, one), RAID 5 (3, one), RAID 6 (4, two), RAID 10 (4, one per mirrored pair). RAID is not a backup.",
  "check": [
   [
    "What is the minimum number of drives for RAID 5, and how many failures can it survive?",
    "Three drives, surviving one drive failure."
   ],
   [
    "Four 2 TB drives are configured as RAID 10. How much usable space is there?",
    "4 TB, because RAID 10 uses half the total capacity for mirroring."
   ],
   [
    "Why might an M.2 SSD not be detected even though it fits the slot?",
    "The drive may be SATA while the slot supports only NVMe, or the reverse."
   ],
   [
    "Why is RAID not a substitute for backups?",
    "Deletions, corruption and ransomware affect every drive in the array, so there is no earlier copy to restore."
   ]
  ]
 },
 {
  "t": "Motherboards: ATX, microATX, Mini-ITX; connectors, headers and expansion slots (PCIe); CPU sockets",
  "body": [
   "The motherboard is the main circuit board that connects every part of a PC: the CPU (central processing unit), memory, storage, expansion cards, power supply and front-panel controls. Choosing and installing one means matching three things: its size to the case, its socket to the CPU, and its slots and connectors to the parts you plan to use. Get any one of those wrong and the build either will not fit, will not boot or will not do what the customer needs.",
   "Motherboards come in standard form factors that set their size and the positions of their mounting holes. ATX (Advanced Technology eXtended) is the full-size standard, about 12 by 9.6 inches, with room for up to seven expansion slots and usually four memory slots. microATX is a smaller square board, about 9.6 by 9.6 inches, with up to four expansion slots; because its mounting holes line up with a subset of ATX holes, it fits in microATX cases and most ATX cases. Mini-ITX is a compact board of about 6.7 by 6.7 inches with usually one expansion slot and two memory slots, built for small home theater and compact PCs. The rule of thumb is that a smaller board can go in a larger case, but not the other way around.",
   "Expansion slots on modern boards are PCIe (Peripheral Component Interconnect Express). PCIe is a point-to-point serial bus built from lanes, and slots are described by lane count: x1, x4, x8 and x16. A graphics card normally goes in the top x16 slot, which is usually wired directly to the CPU for the most bandwidth. A smaller card can go in a larger slot, so an x1 network card works in an x16 slot. Some slots are physically x16 but electrically wired with only four or eight lanes, so read the manual before deciding where a demanding card goes. Each PCIe generation roughly doubles the bandwidth per lane and stays backward compatible, so a newer card runs in an older slot at the older speed. PCI and AGP slots are legacy.",
   "Connectors and headers are how everything plugs in. The 24-pin ATX connector supplies main power, and a 4- or 8-pin CPU power connector (often labeled EPS or ATX12V) near the socket feeds the processor. SATA (Serial ATA) ports connect drives, and M.2 slots take small SSDs (solid-state drives) that may use the SATA or the faster NVMe (Non-Volatile Memory Express) interface over PCIe lanes. Headers are groups of pins for internal cables: front-panel headers for the power button, reset button and LEDs, USB headers for the case's front ports, an audio header for front headphone and microphone jacks, fan headers for cooling, and sometimes a TPM (Trusted Platform Module) header and lighting headers. The rear I/O panel carries USB ports, audio jacks, the network port and video outputs that work only if the CPU has integrated graphics.",
   "The CPU socket must match the processor exactly. Intel desktop boards use LGA (land grid array) sockets, where the pins are in the socket and the CPU has flat contact pads. Older AMD desktop sockets used PGA (pin grid array), where the pins are on the CPU, and AMD's newer desktop platform moved to LGA as well. Laptops often use BGA (ball grid array), where the CPU is soldered to the board and cannot be upgraded. The socket and chipset also limit which CPU generations are supported, so check the board's CPU support list and whether a firmware update is needed first. When installing a CPU, align the triangle marker, lower it in without force and close the retention arm.",
   "Consider a worked example. A customer wants a small living-room PC that still has a dedicated graphics card for light gaming. You pick a Mini-ITX board and a compact case that lists support for full-length cards. You confirm the board's socket matches the chosen CPU and that its support list includes that CPU at the shipping firmware version. Because Mini-ITX has only one expansion slot, you plan on the onboard Wi-Fi rather than a separate card and use an M.2 NVMe SSD so no drive bays are needed. During assembly you connect both power leads and wire the front-panel header from the manual's diagram.",
   "Common mistakes: buying a board that is larger than the case supports; forgetting the separate CPU power connector, which leaves the system dead or unstable; plugging the power switch lead into the wrong front-panel pins so the button does nothing; assuming every x16-sized slot has sixteen lanes; and connecting the monitor to the motherboard's video port when the CPU has no integrated graphics. Another trap is forgetting the standoffs: the board must sit on brass or raised standoffs, not directly on the metal case, or it can short out.",
   "Exam questions usually describe a need and ask you to pick a part. 'Smallest board that still takes a graphics card' points to Mini-ITX. 'Most expansion slots' points to ATX. 'Graphics card slot' points to PCIe x16. 'Pins in the socket, pads on the CPU' points to LGA. 'Power button does nothing but the PSU works' points to the front-panel header. 'New CPU not recognized on an older board' points to a firmware update or an unsupported CPU."
  ],
  "terms": [
   [
    "ATX",
    "Advanced Technology eXtended, the full-size motherboard form factor with up to seven expansion slots."
   ],
   [
    "microATX",
    "A smaller square form factor with up to four expansion slots that fits most ATX cases."
   ],
   [
    "Mini-ITX",
    "A compact motherboard form factor, typically with one expansion slot and two memory slots, for small PCs."
   ],
   [
    "PCIe",
    "Peripheral Component Interconnect Express, the serial expansion bus whose slots come in x1, x4, x8 and x16 lane widths."
   ],
   [
    "LGA",
    "Land grid array, a socket design where the pins are in the socket and the CPU has flat pads."
   ],
   [
    "PGA",
    "Pin grid array, a socket design where the pins are on the CPU and fit into holes in the socket."
   ],
   [
    "Front-panel header",
    "Motherboard pins that connect the case's power button, reset button and indicator LEDs."
   ],
   [
    "Standoff",
    "A raised spacer that holds the motherboard off the metal case so it cannot short circuit."
   ]
  ],
  "example": "A small office orders a compact PC for a reception desk and a workstation for a video editor. For reception you choose a microATX board with integrated graphics and plug the monitor into the rear panel. For the editor you choose an ATX board so the graphics card has the top x16 slot and a 10-gigabit network card and capture card still have room, confirm the socket and firmware support the chosen CPU, and connect both the 24-pin and 8-pin power leads.",
  "tip": "Size order from large to small is ATX, microATX, Mini-ITX, and smaller boards fit bigger cases. Graphics cards go in PCIe x16. LGA puts the pins in the socket, PGA puts them on the CPU. A newer CPU on an older board may need a firmware update first.",
  "check": [
   [
    "Which form factor would you choose for the smallest possible PC that still takes one expansion card?",
    "Mini-ITX, because it is the smallest standard board and usually offers a single PCIe slot."
   ],
   [
    "Which connectors supply power to the motherboard and the processor?",
    "The 24-pin ATX connector powers the board, and a separate 4- or 8-pin CPU connector near the socket powers the processor."
   ],
   [
    "After building a PC, the power button does nothing, but the power supply tests good. What should you check?",
    "That the front-panel power switch lead is connected to the correct pins on the front-panel header, using the motherboard manual."
   ],
   [
    "A network card with an x1 connector needs a slot, and only an x16 slot is free. Will it work?",
    "Yes. A smaller PCIe card works in a larger slot; it simply uses fewer lanes."
   ]
  ]
 },
 {
  "t": "Firmware: BIOS/UEFI settings, boot order, passwords, Secure Boot, TPM and HSM, virtualization support, fan and temperature monitoring",
  "body": [
   "Firmware is the low-level software stored on a chip on the motherboard that starts the computer before the operating system loads. It runs the POST (power-on self-test), initializes hardware and then hands control to a boot loader. The older standard was BIOS (Basic Input/Output System). Modern systems use UEFI (Unified Extensible Firmware Interface), which supports large drives partitioned with GPT (GUID partition table), faster startup, a graphical setup screen with mouse support and security features such as Secure Boot. Many people, and many exam questions, still call UEFI setup the BIOS, so treat the terms as close cousins with UEFI being the modern one.",
   "You enter firmware setup by pressing a key during startup, often Delete, F2, F10 or Esc depending on the manufacturer, or from Windows advanced startup options when fast boot makes the key hard to catch. Common settings include the date and time, which a small CMOS (complementary metal-oxide semiconductor) battery on the board keeps running while the PC is unplugged; enabling or disabling onboard devices such as audio or network ports; and storage controller mode such as AHCI (Advanced Host Controller Interface) or RAID. When the CMOS battery dies, the clock resets and settings may revert to defaults at every power loss.",
   "Boot order sets which devices the firmware tries first, such as the internal SSD, a USB drive or network boot using PXE (Preboot Execution Environment). To install an operating system from a USB drive, move USB above the internal drive or use the one-time boot menu, which changes nothing permanently. Firmware passwords add protection. A supervisor or administrator password prevents unauthorized changes to firmware settings. A user or power-on password must be entered before the system will boot at all. Some systems also support a drive password. Together these stop someone from changing the boot order to start their own operating system and bypass Windows security.",
   "Secure Boot is a UEFI feature that checks the digital signatures of boot loaders and drivers against trusted keys stored in firmware, blocking unsigned or tampered code such as boot-level malware from running at startup. Some older operating systems or tools need it turned off, and it requires UEFI mode rather than legacy BIOS compatibility mode. A TPM (Trusted Platform Module) is a secure crypto processor, either a chip on the board or built into CPU firmware, that stores encryption keys and measures the boot process. BitLocker drive encryption uses the TPM to protect its keys, and Windows 11 requires TPM 2.0. An HSM (hardware security module) is a dedicated device, often an add-in card or network appliance, used by organizations to generate and protect many cryptographic keys, for example for a certificate authority or payment processing.",
   "Virtualization support must be enabled in firmware before a hypervisor can use the CPU's hardware virtualization features, labeled Intel VT-x or AMD-V (sometimes shown as SVM). If a virtual machine will not start and reports that virtualization is unavailable, check this setting first. Firmware also offers hardware monitoring: CPU and system temperatures, fan speeds and voltages. You can set fan curves so fans speed up as temperatures rise, and configure alerts or shutdown thresholds. After changing anything, choose save and exit so the changes take effect.",
   "Consider a worked example. A user wants to upgrade to Windows 11 but the compatibility check fails. You restart into firmware setup and find the system in legacy compatibility mode, Secure Boot off and the firmware TPM disabled. You confirm the disk uses GPT (converting it first if it is MBR, the older master boot record scheme), switch to UEFI mode, enable the firmware TPM and Secure Boot, save and exit. Windows boots normally and the upgrade check now passes. While there, you set an administrator password so the settings cannot be casually changed back.",
   "Common mistakes: confusing the supervisor password (protects settings) with the user password (required to boot); assuming Secure Boot encrypts anything, when it only verifies signatures; mixing up TPM and HSM; enabling virtualization inside Windows and forgetting that the firmware switch comes first; and replacing a whole motherboard when the only problem is a dead CMOS battery. Also remember that clearing CMOS resets settings to defaults, which may disable a TPM-dependent feature and trigger a BitLocker recovery prompt.",
   "Exam wording is usually symptom to setting. 'VM will not start, hardware virtualization unavailable' means enable VT-x or AMD-V. 'Cannot boot from the USB installer' means boot order or the one-time boot menu. 'Windows 11 upgrade blocked' often means TPM 2.0 or Secure Boot is off. 'Clock resets after unplugging' means the CMOS battery. 'Prevent booting unauthorized media' means a firmware password plus boot order. 'Protect keys for many servers' means an HSM."
  ],
  "terms": [
   [
    "UEFI",
    "Unified Extensible Firmware Interface, the modern replacement for BIOS that supports GPT drives and Secure Boot."
   ],
   [
    "POST",
    "Power-on self-test, the firmware's hardware check that runs each time the computer starts."
   ],
   [
    "Secure Boot",
    "A UEFI feature that allows only signed, trusted boot loaders and drivers to run at startup."
   ],
   [
    "TPM",
    "Trusted Platform Module, a secure crypto processor in one computer that stores keys and supports features like BitLocker."
   ],
   [
    "HSM",
    "Hardware security module, a dedicated device for generating and protecting cryptographic keys at scale."
   ],
   [
    "Boot order",
    "The sequence of devices the firmware tries when looking for an operating system to start."
   ],
   [
    "CMOS battery",
    "A small coin-cell battery that keeps the firmware clock and settings when the PC is unplugged."
   ]
  ],
  "example": "A developer installs a hypervisor, but the virtual machine refuses to start with a message that hardware virtualization is disabled. You restart into UEFI setup, enable Intel VT-x in the CPU configuration menu, save and exit, and the VM starts normally. Because the laptop leaves the office, you also set a supervisor password so nobody can quietly change the boot order to a USB drive.",
  "tip": "Match the symptom to the setting: VM will not start means VT-x or AMD-V; cannot boot from USB means boot order; Windows 11 blocked means TPM 2.0 or Secure Boot; clock resets mean the CMOS battery. A TPM protects one computer's keys; an HSM protects many keys for an organization.",
  "check": [
   [
    "What does Secure Boot protect against?",
    "Unsigned or tampered boot loaders and drivers, such as boot-level malware, running during startup."
   ],
   [
    "How does a TPM differ from an HSM?",
    "A TPM is built into a single computer to protect its keys; an HSM is a dedicated device that manages many keys for an organization or application."
   ],
   [
    "Which firmware password prevents the system from booting at all without it?",
    "The user or power-on password; the supervisor password only protects the setup settings."
   ],
   [
    "The PC's date resets to a default every time it is unplugged. What is the likely fix?",
    "Replace the CMOS battery on the motherboard, then set the date, time and any lost settings."
   ]
  ]
 },
 {
  "t": "CPUs: x86/x64 vs ARM, cores and threads, integrated graphics; cooling with fans, heat sinks, thermal paste/pads and liquid cooling",
  "body": [
   "The CPU (central processing unit) executes program instructions and is often called the brain of the computer. For A+ you need to understand CPU architectures, what cores and threads mean, what integrated graphics provide and how CPUs are kept cool. These choices affect which software will run, how well the system multitasks and whether it stays stable under load.",
   "An architecture is the set of instructions a processor understands. x86 is the instruction set Intel and AMD desktop and laptop processors have used for decades; the name originally referred to 32-bit processing. x64, also called x86-64 or AMD64, is the 64-bit extension. A 64-bit processor and operating system can address far more than 4 GB of RAM and can run most 32-bit applications, while a 32-bit operating system cannot run 64-bit applications and is limited to about 4 GB of addressable memory. ARM is a different architecture based on RISC (reduced instruction set computing), designed for power efficiency. ARM dominates phones and tablets and is now common in laptops such as Apple silicon Macs and ARM-based Windows laptops, where it gives long battery life and runs cool. Software must be compiled for ARM or run through emulation, so check application and driver compatibility before recommending an ARM device.",
   "A core is an independent processing unit inside the CPU; a quad-core processor can work on four tasks at once. Multithreading technology, such as Intel's Hyper-Threading or AMD's SMT (simultaneous multithreading), lets one physical core run two threads by sharing its resources, so the operating system sees more logical processors than physical cores. Task Manager shows both numbers. More cores and threads help with multitasking, video rendering and virtualization, while higher clock speed helps tasks that depend on a single thread. Many modern CPUs mix performance cores with smaller efficiency cores to balance speed and power. Cache, a small fast memory on the CPU, also affects performance.",
   "Integrated graphics, sometimes called an iGPU (integrated graphics processing unit), are built into the CPU and share system RAM. They are fine for office work, video playback and light gaming and use less power, but they are much less capable than a dedicated graphics card with its own video memory. The motherboard's rear video outputs work only if the CPU has integrated graphics. Some desktop CPUs are sold without graphics, which means a separate card is required to see any display at all.",
   "CPUs produce heat and must be cooled. A heat sink is a block of metal fins that draws heat away from the CPU, and a fan blows air through the fins; case fans then move the warm air out. Thermal paste, also called thermal compound, fills microscopic gaps between the CPU's heat spreader and the heat sink so heat transfers efficiently. Apply a small amount and replace it whenever the cooler is removed. Thermal pads are soft pre-formed pads used on some coolers, laptop components and graphics memory. Liquid cooling pumps coolant through a block on the CPU to a radiator with fans; all-in-one units are sealed and simple to install. Passive cooling uses a heat sink with no fan, common in fanless mini PCs. Poor cooling causes thermal throttling, where the CPU slows itself to cut heat, and eventually sudden shutdowns.",
   "Consider a worked example. After cleaning his PC and reseating the CPU cooler, a customer reports that the computer shuts off a few minutes into a game. Firmware monitoring shows the CPU temperature climbing fast under load. You remove the cooler and find the old paste was reused and has dried and cracked, leaving air gaps. You clean both surfaces with isopropyl alcohol and a lint-free cloth, apply a small fresh amount of paste, reseat the cooler evenly and confirm the fan is connected to the CPU fan header. Temperatures stay in range and the shutdowns stop.",
   "Common mistakes: assuming a 32-bit operating system can use 16 GB of RAM or run 64-bit software; recommending an ARM laptop for a line-of-business application that has no ARM version and runs poorly under emulation; confusing threads (logical) with cores (physical); applying far too much paste, or none; and leaving the plastic film on a new cooler's base. Another trap is thinking liquid cooling is always required; a good air cooler is enough for most systems.",
   "Exam questions use clear clue words. 'Long battery life, phone or tablet, power efficient' points to ARM. 'Cannot install 64-bit application' points to a 32-bit operating system. 'Logical processors double the core count' points to Hyper-Threading or SMT. 'Shuts down under load, fine at idle' points to cooling: paste, fan or dust. 'Performance drops when hot' points to thermal throttling. 'Shares system memory' points to integrated graphics."
  ],
  "terms": [
   [
    "x64",
    "The 64-bit extension of the x86 architecture used by Intel and AMD processors, also called x86-64 or AMD64."
   ],
   [
    "ARM",
    "A power-efficient RISC processor architecture used in phones, tablets and many modern laptops."
   ],
   [
    "Core",
    "An independent physical processing unit inside a CPU."
   ],
   [
    "Hyper-Threading",
    "Intel's technology that lets one physical core run two threads; AMD's equivalent is SMT."
   ],
   [
    "Integrated graphics",
    "A graphics processor built into the CPU that shares system memory."
   ],
   [
    "Thermal paste",
    "A compound that fills microscopic gaps between a CPU and heat sink to improve heat transfer."
   ],
   [
    "Thermal throttling",
    "A CPU automatically lowering its speed to reduce heat when it gets too hot."
   ]
  ],
  "example": "A design firm asks whether new ARM-based laptops would suit its staff. You check their tools: the office suite and browser have native ARM versions, but a plotter driver and an older accounting add-in are x64 only. You recommend ARM laptops for the sales team, who value battery life, and x64 laptops for the accountants and designers, and document which apps were tested.",
  "tip": "A 32-bit OS cannot run 64-bit software. ARM needs native or emulated apps. Threads are logical, cores are physical. Always apply fresh thermal paste when reinstalling a heat sink, and treat shutdowns under load as a cooling problem first.",
  "check": [
   [
    "What is the difference between a core and a thread?",
    "A core is a physical processing unit; a thread is a stream of instructions, and multithreading lets one core run two threads at once."
   ],
   [
    "Why is ARM popular in laptops and mobile devices?",
    "Its simpler RISC instruction set is very power efficient, giving longer battery life and less heat."
   ],
   [
    "When should you replace thermal paste?",
    "Whenever the heat sink is removed or reseated, and when it has dried out and temperatures have risen."
   ],
   [
    "A new PC has a CPU without integrated graphics and no graphics card. What will the user see?",
    "No display at all, because the motherboard's video outputs need integrated graphics; a graphics card must be installed."
   ]
  ]
 },
 {
  "t": "Expansion cards: graphics, sound, capture, NIC",
  "body": [
   "Expansion cards add or upgrade capabilities that the motherboard does not provide, or does not provide well enough. Almost all modern cards plug into PCIe (Peripheral Component Interconnect Express) slots. For A+ you should know what each common card does, when it is worth adding and how to install it without causing new problems.",
   "Installation follows the same pattern for every card. Power off and unplug the PC, then use ESD (electrostatic discharge) protection such as an antistatic wrist strap. Remove the slot cover on the back of the case, seat the card firmly and evenly in the correct slot until the retention clip catches, and secure its bracket with a screw. Connect any extra power cables the card needs. Boot, install the manufacturer's driver and confirm in Device Manager that the device appears without warning icons. If the card replaces an onboard feature, you may disable the onboard version in firmware to avoid conflicts.",
   "A graphics card, also called a video card, carries a GPU (graphics processing unit) with its own video memory. It is needed for gaming, 3-D design, video editing and many AI and scientific workloads, and it can drive more or higher-resolution monitors than integrated graphics. Graphics cards go in the primary PCIe x16 slot. Powerful cards need extra PCIe power connectors from the power supply, commonly 6-pin, 8-pin or a newer high-power connector, and a PSU (power supply unit) with enough wattage. They can be long and two or three slots thick, so check case clearance and airflow. After installing one, connect the monitor to the card's outputs, not to the motherboard's.",
   "A sound card provides audio input and output. Onboard audio is fine for most users, so dedicated sound cards are chosen for higher-quality audio, surround sound, professional recording with better converters, or more inputs and outputs. External USB audio interfaces are a common alternative for musicians and podcasters because they keep sensitive audio circuitry away from electrical noise inside the case. A capture card records or streams video from an external source. Gamers use one to record console gameplay, and streamers and video producers use them to bring camera or HDMI (High-Definition Multimedia Interface) feeds into the PC. Capture devices can be internal PCIe cards or external USB units. Choose one that supports the resolution and frame rate the source produces, and remember that some sources send copy-protected signals that capture devices will not record.",
   "A NIC (network interface card) adds or upgrades network connectivity. Most motherboards have built-in Ethernet, but you might add a NIC for faster speeds such as 2.5 or 10 gigabits per second, for extra ports on a server, for fiber connections using SFP (small form-factor pluggable) modules, or to replace a failed onboard port. Wireless NICs add Wi-Fi and often Bluetooth to desktops and come with antennas that should be attached for good signal.",
   "Consider a worked example. A video editor's PC stutters when rendering 4K footage, and the office has just installed 10-gigabit networking to the file server. You check the PSU label and confirm it has spare wattage and an 8-pin PCIe lead. You install the graphics card in the top x16 slot and connect its power lead, then put the 10 GbE NIC in a free x4 slot. After booting you install both drivers, move the monitor cables to the graphics card, check Device Manager and run a test render and file copy to confirm the improvement.",
   "Common mistakes: leaving the monitor on the motherboard's port after adding a graphics card; forgetting the card's extra power connector, which often gives a blank screen or a warning light on the card; putting a demanding card in a slot that is physically x16 but electrically x4; ignoring PSU wattage; and skipping the manufacturer's driver so the device runs with limited features. If a new card makes the system unstable, reseat it and check power before blaming the card.",
   "Exam questions are usually need-based. 'Record console gameplay' or 'bring an HDMI camera feed into the PC' means a capture card. 'Faster network, fiber, more ports' means a NIC. 'Professional audio, more inputs' means a sound card or audio interface. 'Blank screen after installing a GPU' means monitor cable location or missing PCIe power. 'Shutdowns after GPU upgrade' means an undersized PSU."
  ],
  "terms": [
   [
    "GPU",
    "Graphics processing unit, the processor on a graphics card that renders images and handles parallel workloads."
   ],
   [
    "Capture card",
    "A card or external device that records or streams video from an external source into the PC."
   ],
   [
    "Sound card",
    "An expansion card that provides higher-quality or additional audio inputs and outputs."
   ],
   [
    "NIC",
    "Network interface card, which connects a computer to a wired or wireless network."
   ],
   [
    "PCIe power connector",
    "An extra power cable from the PSU, such as 6-pin or 8-pin, used by high-power graphics cards."
   ],
   [
    "SFP",
    "Small form-factor pluggable, a module slot on some NICs that accepts fiber or copper transceivers."
   ]
  ],
  "example": "A small church wants to stream its services. The existing PC has integrated graphics and onboard audio. You add an internal capture card to take the HDMI feed from the camera, keep the onboard audio for monitoring, and plug the sound desk into a USB audio interface for clean audio. After installing drivers and checking Device Manager, a test stream shows smooth video and clear sound.",
  "tip": "After adding a graphics card, plug the monitor into the card, not the motherboard. Check PSU wattage and PCIe power connectors for power-hungry GPUs. Capture cards bring video in; graphics cards send video out. Always confirm in Device Manager and install drivers.",
  "check": [
   [
    "A new graphics card is installed but the monitor stays blank. What are two common simple causes?",
    "The monitor is still connected to the motherboard's video output, or the card's extra PCIe power connector is not attached."
   ],
   [
    "Why would you add a NIC to a desktop that already has onboard Ethernet?",
    "For higher speeds, more ports, fiber connectivity, Wi-Fi or to replace a failed onboard port."
   ],
   [
    "What does a capture card do?",
    "It brings video from an external source, such as a console or camera, into the PC for recording or streaming."
   ],
   [
    "What should you do immediately after physically installing any expansion card?",
    "Install the manufacturer's driver and confirm in Device Manager that the device is detected without errors."
   ]
  ]
 },
 {
  "t": "Power supplies: 110/115 vs 220/240 V input, 3.3/5/12 V output, 24-pin, modular, redundant, wattage rating",
  "body": [
   "The power supply unit (PSU) converts alternating current (AC) from the wall outlet into the low-voltage direct current (DC) that computer components use. A weak or failing PSU causes random shutdowns, reboots and failures to start, and those symptoms are easy to blame on other parts, so choosing and checking the right PSU is an important skill. Never open a PSU: its capacitors can hold a dangerous charge even when unplugged. Failed units are replaced, not repaired.",
   "Wall voltage differs around the world. North America and some other regions use roughly 110 to 120 volts, while much of Europe, Asia and elsewhere uses roughly 220 to 240 volts. Most modern PSUs are auto-switching, detecting the input voltage and working across the full range. Some older or budget units have a manual voltage selector switch on the back. If a PSU set to 115 V is plugged into 230 V, it can be destroyed; if one set to 230 V is plugged into 115 V, it will not deliver enough power and the PC may not start. Always check the switch, and the label, when equipment moves between countries.",
   "The PSU outputs several DC voltages, called rails. The 12 V rail powers the most demanding components: the CPU, graphics card, fans and drive motors. The 5 V rail powers USB ports and some drive electronics, and the 3.3 V rail powers some motherboard circuitry and memory. The main 24-pin ATX connector supplies the motherboard; older boards used 20-pin, and many PSUs offer a 20+4-pin connector to fit both. Other connectors include the 4- or 8-pin CPU power connector, PCIe power connectors for graphics cards, SATA power for drives and the older Molex connector for legacy devices.",
   "Cabling style matters when building. A non-modular PSU has all cables permanently attached, which is cheaper but leaves unused cables cluttering the case and blocking airflow. A fully modular PSU lets you attach only the cables you need. A semi-modular PSU has the essential motherboard and CPU cables fixed and the rest detachable. Use only the cables that came with a modular PSU, because pin layouts on the PSU side are not standardized between brands and a mismatched cable can destroy components.",
   "Servers often use redundant power supplies: two or more hot-swappable units in the same system, each able to carry the full load alone. Ideally each is plugged into a different power circuit or UPS (uninterruptible power supply). If one fails, the other keeps the server running, the system raises an alert and the failed unit can be swapped without shutting down. The wattage rating is the maximum continuous power the PSU can deliver. Add up the components' needs, especially the CPU and graphics card, and choose a PSU with comfortable headroom; running constantly near its limit shortens life and can cause instability. Efficiency ratings such as the 80 Plus levels show how little power is wasted as heat.",
   "Consider a worked example. A gamer upgrades to a much more powerful graphics card, and the PC starts shutting off during demanding games but works fine for browsing. You note the PSU label shows a modest wattage and only one PCIe connector, which the user has split with an adapter. You explain that the card's peak draw exceeds what the unit can safely supply. You replace it with a higher-wattage modular unit that has the correct native PCIe connectors, route only the cables needed, and run a stress test to confirm stability.",
   "Common mistakes: confusing input voltage (from the wall) with output voltage (to the components); choosing a PSU whose rating exactly matches the estimated load with no headroom; mixing modular cables between brands; assuming redundant PSUs are for gaming desktops; and opening a PSU to look for a blown fuse. When a PC will not power on at all, check the outlet or power strip, the PSU's rear switch and voltage selector and the 24-pin and CPU connections before replacing parts, then test with a PSU tester or multimeter or substitute a known-good unit.",
   "Exam wording points straight at the answer. 'Moved the PC to another country and it died' points to a manual voltage selector. 'Powers the CPU and GPU' means 12 V. 'Only attach the cables you need' means modular. 'Keep the server running if one fails, hot-swappable' means redundant power supplies. 'Random shutdowns under load after an upgrade' means insufficient wattage. 'Test the PSU' means a PSU tester or multimeter."
  ],
  "terms": [
   [
    "PSU",
    "Power supply unit, which converts AC wall power into the DC voltages a computer uses."
   ],
   [
    "Auto-switching PSU",
    "A power supply that automatically accepts input voltages across the 110 to 240 V range."
   ],
   [
    "12 V rail",
    "The PSU output that powers the CPU, graphics card, fans and drive motors."
   ],
   [
    "24-pin ATX connector",
    "The main power connector from the PSU to the motherboard."
   ],
   [
    "Modular PSU",
    "A power supply whose cables can be detached so only needed cables are installed."
   ],
   [
    "Redundant power supply",
    "Two or more hot-swappable PSUs in one system so it keeps running if one fails."
   ],
   [
    "Wattage rating",
    "The maximum continuous power a PSU can deliver to components."
   ]
  ],
  "example": "A small company's file server has two hot-swappable power supplies, each plugged into a separate UPS. One morning the server's management console shows a power supply fault and one unit's LED is amber. The server is still running on the other unit. You order a matching replacement, slide out the failed unit and insert the new one without shutting down, and the alert clears.",
  "tip": "12 V powers the big consumers; 3.3 V and 5 V power board logic, memory and USB. Check the manual voltage switch on older PSUs when changing countries. Redundant PSUs are for servers and are hot-swappable. Never open a PSU; replace it.",
  "check": [
   [
    "Which PSU output voltage powers the CPU and graphics card?",
    "The 12 V rail."
   ],
   [
    "What is the benefit of redundant power supplies in a server?",
    "If one power supply fails, the other carries the full load so the server keeps running, and the failed unit can be hot-swapped."
   ],
   [
    "A PC shuts down under heavy load after a GPU upgrade. What should you check?",
    "Whether the PSU's wattage and PCIe power connectors are sufficient for the new graphics card."
   ],
   [
    "Why is it risky to use a cable from a different brand's modular PSU?",
    "Pin layouts on the PSU side are not standardized, so the wrong cable can send the wrong voltages and damage components."
   ]
  ]
 },
 {
  "t": "Printers and multifunction devices: setup, drivers, duplex, orientation, tray settings, network and cloud printing, secure print",
  "body": [
   "Printers generate a surprising share of help desk calls. A multifunction device (MFD), also called a multifunction printer, combines printing, scanning, copying and often faxing in one unit. Setting one up correctly the first time, with the right driver, sensible defaults and basic security, avoids most of the problems users would otherwise report. Setup begins with unpacking: remove all packing tape, foam and shipping locks, install the toner or ink, load paper and connect power. Place the device on a stable surface with good ventilation, near the users who need it. Then connect it. USB links it to one computer. Wired Ethernet or Wi-Fi makes it available on the network; give network printers a static IP address or a DHCP (Dynamic Host Configuration Protocol) reservation so computers can always find them. Print a configuration page from the control panel to confirm the IP address, firmware version and installed options.",
   "Next, install the driver on each computer or on a print server. The driver translates what applications send into the printer's language, commonly PCL (Printer Command Language) or PostScript. Use the correct driver for the operating system and for 32-bit or 64-bit architecture. Windows can often install a driver automatically when you add a printer, but the manufacturer's driver may unlock features such as extra trays, stapling or hole punching. In a business, a print server shares printers centrally so drivers, permissions and queues are managed in one place. A wrong driver commonly causes garbled output full of strange symbols.",
   "Configure the defaults users need. Duplex printing prints on both sides of the page, saving paper; automatic duplex uses a built-in unit, while manual duplex asks the user to flip the stack. Orientation is portrait (tall) or landscape (wide). Tray settings tell the printer which paper size and type are loaded in each tray, such as letter in tray 1 and envelopes or labels in the bypass tray. If the tray settings do not match what the job requests, the printer may pause asking for different paper or print on the wrong size. Also set print quality and color defaults, for example grayscale to save color toner.",
   "Printing is increasingly networked and cloud-based. Network printing lets many users print over the LAN (local area network) using protocols such as IPP (Internet Printing Protocol) or a raw TCP/IP port, commonly 9100. Cloud printing services let users print from anywhere, including phones, through an online service that relays the job to the printer, and many organizations use cloud print management instead of on-site print servers. Secure print, also called pull printing or print release, holds a job until the user authenticates at the device with a PIN, badge or login, so confidential documents are not left in the output tray.",
   "MFDs are network computers and need security attention. Change the default admin password, keep firmware updated, restrict the web management page, secure scan-to-email and scan-to-folder settings with proper accounts rather than shared credentials, and enable features that encrypt or wipe stored jobs on the internal drive. Audit logs and user authentication also let you track who printed, scanned or copied what, which supports both cost control and data protection.",
   "Consider a worked example. HR reports that salary letters were picked up by the wrong person from a shared printer. You enable secure print on the MFD and integrate it with employee badges so jobs release only when the sender taps a badge. You set duplex and grayscale as defaults, confirm the device has a DHCP reservation, change the default admin password and update the firmware. You then send a test job, release it at the printer and document the settings.",
   "Common mistakes: letting a network printer take a random DHCP address so it seems to vanish after a lease change; installing a 32-bit driver on a 64-bit system; blaming hardware for garbled output that a correct driver fixes; forgetting to set tray paper types so label jobs pull plain paper; and leaving default passwords on an MFD's web interface. Also remember that secure print is about release at the device, not encryption of the file.",
   "Exam questions give a symptom and expect a setting. 'Garbled symbols' points to the wrong driver. 'Printer asks for a different paper size' points to tray settings. 'Confidential documents left on the tray' points to secure print. 'Printer disappears after a restart' points to a static IP or reservation. 'Print from a phone anywhere' points to cloud printing. 'Save paper' points to duplex."
  ],
  "terms": [
   [
    "Multifunction device",
    "A device that combines printing, scanning, copying and often faxing."
   ],
   [
    "Print driver",
    "Software that translates application output into a language the printer understands, such as PCL or PostScript."
   ],
   [
    "Duplex",
    "Printing on both sides of the paper, automatically or with manual flipping."
   ],
   [
    "Tray settings",
    "Configuration that tells the printer what paper size and type are loaded in each tray."
   ],
   [
    "Print server",
    "A server that shares printers, manages queues and distributes drivers centrally."
   ],
   [
    "Secure print",
    "A feature that holds a job until the user authenticates at the printer to release it."
   ],
   [
    "Cloud printing",
    "Printing through an online service that relays jobs to a printer from any location or device."
   ]
  ],
  "example": "A law firm adds a new MFD. You give it a DHCP reservation, add it to the print server with the manufacturer's 64-bit PCL driver, and push it to staff computers. You set letter in tray 1 and legal in tray 2, turn on duplex by default, enable badge-based secure print for client files, configure scan-to-folder with a dedicated service account, change the admin password and update the firmware.",
  "tip": "Garbled output points to the wrong driver. A printer asking for different paper points to tray settings. Confidential documents left on the tray point to secure print. Give network printers a static IP or reservation so they do not move.",
  "check": [
   [
    "Why should a network printer have a static IP address or DHCP reservation?",
    "So its address never changes and computers configured to print to it can always find it."
   ],
   [
    "What problem does secure print solve?",
    "Confidential documents being left in the output tray; jobs are held until the user authenticates at the printer."
   ],
   [
    "A printer keeps pausing with a request for letter paper even though letter is loaded. What should you check?",
    "The tray settings, which may list a different paper size or type for that tray."
   ],
   [
    "Output from a new printer is full of random symbols. What is the most likely cause?",
    "An incorrect or corrupted print driver; install the correct driver for the model and operating system."
   ]
  ]
 },
 {
  "t": "Printer types and consumables: laser imaging process and maintenance kits, inkjet, thermal, impact, 3-D printers",
  "body": [
   "Each printer technology has its own strengths, consumables and maintenance. Knowing them lets you recommend the right printer for a job and fix the right part when output goes wrong. The exam puts particular emphasis on the laser printing process, so learn its steps in order, and then learn what each other technology uses up and how you look after it. Laser printers use static electricity, toner and heat. The imaging process has seven steps. Processing: the printer receives the job and builds an image of the whole page in memory. Charging: a primary charge roller, or a corona wire on older printers, applies a uniform negative charge to the photosensitive imaging drum. Exposing: a laser writes the image onto the drum, neutralizing the charge wherever toner should go. Developing: charged toner is attracted to those exposed areas of the drum. Transferring: a transfer roller or belt gives the paper a charge so it pulls the toner off the drum, and a static eliminator then reduces the paper's charge so it does not cling to the drum. Fusing: the fuser assembly uses heat and pressure to melt the toner into the paper. Cleaning: a blade wipes leftover toner from the drum and the remaining charge is removed, ready for the next page.",
   "Laser consumables include the toner cartridge, which often includes the drum, and a maintenance kit. A maintenance kit typically contains a new fuser and rollers such as the transfer, pickup and separation rollers, and sometimes other wear parts. Install it when the printer's page counter reaches the manufacturer's interval, then reset the counter so the reminder clears. Let the fuser cool before touching it, because it runs very hot. Clean spilled toner with a toner-rated vacuum, not an ordinary vacuum, because the fine particles pass through normal filters and can be a fire risk.",
   "Inkjet printers spray tiny droplets of ink through nozzles in a print head. They are inexpensive to buy and good for color photos, but ink usually costs more per page than toner. Maintenance includes replacing ink cartridges, running the head cleaning routine when output shows streaks or missing colors, and running print head alignment after installing new cartridges or when lines look jagged. Clogs are common if the printer sits unused, so occasional printing keeps nozzles clear. Some inkjets have a carriage belt and a waste ink pad that also wear out.",
   "Thermal printers use heat instead of ink or toner. Direct thermal printers darken special heat-sensitive paper, as in receipt printers; they need no ink, but the print fades over time and with heat or sunlight. Thermal transfer printers melt wax or resin from a ribbon onto labels for durable output such as shipping and asset labels. Maintenance means replacing paper rolls or ribbons and cleaning the heating element with isopropyl alcohol. Impact printers, mainly dot matrix, strike an inked ribbon against the paper with pins. They are noisy and low resolution, but they are the only type that can print multipart carbon forms, and they often use tractor-fed continuous paper. Replace the ribbon when print fades and watch for a worn or damaged print head.",
   "3-D printers build physical objects layer by layer. The most common type for offices and schools uses filament: a plastic strand on a spool is fed into a heated extruder and laid down in thin layers on a build plate. Resin printers instead cure liquid resin with light, producing finer detail but needing careful handling and ventilation. Consumables are filament or resin, and maintenance includes leveling and cleaning the build plate, clearing nozzle clogs and keeping the area ventilated.",
   "Consider a worked example. A warehouse needs to print shipping labels that survive weeks outdoors, receipts at the packing desk, and multipart delivery forms signed by drivers. You recommend a thermal transfer label printer with resin ribbons for the durable labels, a direct thermal receipt printer because those receipts only need to last a short time, and a dot matrix printer for the carbon forms because only an impact printer can press through all the copies.",
   "Common mistakes: putting the laser steps in the wrong order, especially swapping developing and transferring; thinking the fuser uses toner rather than heat and pressure; using a normal vacuum on toner; recommending a direct thermal printer for documents that must last; and forgetting that impact printers are the answer for multipart forms. Also note that inkjets need alignment after cartridge changes, not a maintenance kit.",
   "Exam wording gives the clue. 'Multipart or carbon forms' means impact. 'Receipt paper, fades over time' means direct thermal. 'Heat and pressure melt toner' means the fuser. 'Laser writes onto the drum' means exposing. 'Page count reached, replace fuser and rollers' means a maintenance kit. 'Streaks or missing colors on an inkjet' means head cleaning. 'Filament' means a 3-D printer."
  ],
  "terms": [
   [
    "Imaging drum",
    "The photosensitive cylinder in a laser printer that holds the charged image of the page."
   ],
   [
    "Fuser",
    "The laser printer assembly that melts toner into paper with heat and pressure."
   ],
   [
    "Maintenance kit",
    "A set of wear parts, usually a fuser and rollers, replaced at a set page count in a laser printer."
   ],
   [
    "Print head",
    "The inkjet component that sprays ink droplets through tiny nozzles onto the paper."
   ],
   [
    "Direct thermal",
    "Printing that darkens heat-sensitive paper without ink, as in receipt printers."
   ],
   [
    "Impact printer",
    "A printer, such as dot matrix, that strikes a ribbon against paper and can print multipart forms."
   ],
   [
    "Filament",
    "The plastic strand fed through a heated extruder in the most common type of 3-D printer."
   ]
  ],
  "example": "An office laser printer shows a 'perform maintenance' message and pages have started to jam and show faint smudges. You check the page counter, which has passed the manufacturer's interval. After letting the printer cool, you install the maintenance kit's new fuser, transfer roller and pickup rollers, reset the counter from the control panel and print a test page that comes out clean and jam free.",
  "tip": "Memorize the laser order: processing, charging, exposing, developing, transferring, fusing, cleaning. Carbon or multipart forms always mean an impact printer. Direct thermal needs special paper and fades; thermal transfer uses a ribbon and lasts.",
  "check": [
   [
    "List the seven steps of the laser imaging process in order.",
    "Processing, charging, exposing, developing, transferring, fusing, cleaning."
   ],
   [
    "Which printer type is required for multipart carbon forms?",
    "An impact printer such as a dot matrix, because it physically strikes through all the copies."
   ],
   [
    "What does a laser printer maintenance kit usually contain, and when is it installed?",
    "A new fuser and rollers such as the transfer and pickup rollers; it is installed at the manufacturer's page-count interval, then the counter is reset."
   ],
   [
    "Receipts printed last year have faded to blank. Which printer type made them?",
    "A direct thermal printer, whose heat-sensitive paper fades over time."
   ]
  ]
 },
 {
  "t": "Virtualization purposes: sandbox, test/development, application virtualization, legacy software and operating systems",
  "body": [
   "Virtualization lets one physical computer, the host, run one or more virtual machines (VMs), called guests. Each VM behaves like a complete computer with its own virtual CPU, memory, disk and network card, and runs its own operating system. Software called a hypervisor divides the real hardware between them. Because a VM is stored as a set of files, it can be copied, moved to another host, backed up or rolled back far more easily than a physical computer, and several lightly used servers can be consolidated onto one host to save power, space and hardware cost. For A+ you need to know why organizations virtualize, because exam questions usually describe a goal and ask which approach meets it.",
   "A sandbox is an isolated environment where you can run something without risking the host or the network. Security teams open suspicious attachments or unknown programs inside a sandboxed VM and watch what they do. If the software turns out to be harmful, you discard the VM or roll back to a snapshot, and the real system is untouched. Windows includes Windows Sandbox on some editions, a lightweight disposable desktop that is wiped every time it closes. The value of a sandbox comes from being disposable: nothing you do inside it is meant to survive, and nothing inside it should be able to reach your real files. For that reason, sandbox VMs are usually kept off the production network, and features that share files or the clipboard with the host are turned off.",
   "Test and development environments are another major use. Developers can build and test software on several operating systems or versions from one workstation. IT staff can test patches, drivers, configuration changes and upgrades on VM copies of production servers before rolling them out, which fits naturally with change management. Snapshots make this fast: take a snapshot, try the change, and if it fails, revert in seconds and try again. Because VMs are just files, you can clone a whole lab of machines from a template. Training and certification labs work the same way, which is why many A+ learners practice on VMs rather than spare hardware.",
   "Application virtualization runs a single application in an isolated package instead of installing it normally on the operating system. The app may be streamed from a server or run in a container-like bubble on the client, and the user sees it as an ordinary program. This avoids conflicts between applications that need different versions of the same component, lets IT deliver and update apps centrally and lets an app follow the user to different devices. It is different from a full VM because only the application, not a whole operating system, is virtualized.",
   "Legacy software and operating systems are a very common reason to virtualize. A business may depend on an old program that only runs on an operating system that is no longer supported, or on hardware that is failing. Running that old operating system as a VM on modern hardware keeps the program working. Because an unsupported operating system no longer receives security updates, the VM should be isolated from the internet and the rest of the network as much as possible, and the plan should be to replace the software eventually.",
   "Consider a worked example. A clinic's appointment program only runs on an old operating system, and the ageing PC it lives on has started failing. Rather than hunting for replacement parts, you convert the PC into a VM and run it on a new, supported workstation using a hypervisor. You give the VM an internal-only network so it can reach the local database but not the internet, take a snapshot before any change, and document that the software needs replacing within the year.",
   "Common mistakes: treating a sandbox as permanent storage when it is designed to be thrown away; confusing application virtualization, which isolates one app, with a full VM; assuming a legacy VM is safe because it is virtual, when an unpatched guest is still vulnerable; and forgetting that virtualization adds overhead, so the host needs enough CPU, RAM and storage. Another trap is thinking snapshots are backups; they depend on the original disk and are meant for short-term rollback.",
   "Exam questions map goals to purposes. 'Safely open a suspicious file' points to a sandbox. 'Test a patch before production' or 'develop on several operating systems' points to test/development. 'Deliver an app without installing it, avoid DLL conflicts' points to application virtualization. 'Old program only runs on an outdated operating system' points to legacy software in a VM. 'Revert quickly after a failed change' points to snapshots."
  ],
  "terms": [
   [
    "Virtual machine",
    "A software-based computer with its own virtual hardware and operating system running on a physical host."
   ],
   [
    "Host",
    "The physical computer whose hardware is shared among virtual machines."
   ],
   [
    "Guest",
    "An operating system running inside a virtual machine."
   ],
   [
    "Sandbox",
    "An isolated, disposable environment for running untrusted software without risk to the host."
   ],
   [
    "Application virtualization",
    "Running a single application isolated from the operating system, often streamed from a server."
   ],
   [
    "Snapshot",
    "A saved point-in-time state of a VM that you can revert to."
   ],
   [
    "Legacy system",
    "An old operating system or application still in use, often no longer supported with updates."
   ]
  ],
  "example": "A help desk analyst receives an unexpected invoice attachment from an unknown sender. Instead of opening it on her workstation, she copies it into a disposable sandbox VM with no access to the company network, opens it and watches for unusual behavior. It tries to launch a script, so she reports it to security, closes the sandbox and the environment is wiped with nothing left behind.",
  "tip": "Match the goal to the purpose: suspicious file means sandbox, trying changes safely means test/development, one app without installing means application virtualization, and an old program on an outdated operating system means a legacy VM kept isolated.",
  "check": [
   [
    "Why is a sandbox useful for opening suspicious attachments?",
    "It isolates the file from the host and network, and the environment can be discarded or reverted afterward."
   ],
   [
    "How does application virtualization differ from running a full virtual machine?",
    "It isolates or streams a single application rather than running an entire guest operating system."
   ],
   [
    "What precaution should you take when running an unsupported operating system in a VM for legacy software?",
    "Isolate it from the internet and other systems as much as possible, because it no longer receives security updates."
   ],
   [
    "How do snapshots help in a test environment?",
    "You can save the VM's state before a change and revert to it in seconds if the change fails."
   ]
  ]
 },
 {
  "t": "Hypervisors: Type 1 (bare metal) vs Type 2 (hosted)",
  "body": [
   "A hypervisor, also called a virtual machine monitor (VMM), is the software that creates and runs virtual machines. It sits between the physical hardware and the guest operating systems, gives each VM its share of CPU time, memory, storage and network access, and keeps the VMs isolated from each other. Because it controls every guest on the host, it is also the most important piece of software to keep patched and secured. The exam divides hypervisors into two types based on where they run, and you need to recognize each from a description.",
   "A Type 1 hypervisor, also called bare metal or native, is installed directly on the physical hardware in place of a normal operating system. It controls the hardware itself and runs VMs on top. Because there is no full host operating system in the way, Type 1 hypervisors are efficient, stable and secure, and they are the standard in data centers and cloud providers. Well-known examples include VMware ESXi, Microsoft Hyper-V, Xen and KVM (Kernel-based Virtual Machine), which is built into the Linux kernel. Type 1 hosts are usually managed remotely through a web console or central management tool rather than by sitting at the server.",
   "A Type 2 hypervisor, also called hosted, runs as an application on top of a normal operating system such as Windows, macOS or Linux. You install it like any other program and create VMs inside it. Examples include Oracle VirtualBox, VMware Workstation, VMware Fusion on macOS and Parallels Desktop. Type 2 hypervisors are easy to set up and ideal for desktops and laptops, where a technician, student or developer wants to run a few VMs alongside normal work. The VM appears in a window on the desktop, and features such as shared folders, a shared clipboard and easy snapshots make it convenient for testing, training and running an occasional program built for another operating system.",
   "The trade-off is performance and overhead. A Type 2 hypervisor must go through the host operating system for hardware access, which adds overhead, and the host operating system itself uses resources and must be patched. If the host operating system crashes or restarts for updates, every VM stops with it. Type 1 avoids that layer, so it is chosen for production servers that must run many VMs reliably. Both types rely on hardware virtualization support, Intel VT-x or AMD-V, enabled in the firmware. In short, choose Type 1 when uptime, density and performance matter, and Type 2 when convenience on an everyday computer matters more.",
   "Microsoft Hyper-V deserves a note because it causes confusion. When you enable the Hyper-V feature in Windows, Hyper-V installs beneath Windows, and Windows itself then runs as a privileged partition on top of it. That makes Hyper-V a Type 1 hypervisor even though you turned it on from inside Windows. Client Hyper-V is available in Pro, Enterprise and Education editions of Windows, not Home. Enabling it can also affect other Type 2 hypervisors on the same computer, which may then run more slowly or need a setting changed to work alongside it.",
   "Consider a worked example. A small business wants to consolidate three ageing servers, a file server, a database server and a domain controller, onto one new machine. You install a Type 1 hypervisor directly on the new server, create three VMs and migrate each workload, managing them from a web console. Separately, a help desk technician wants to practice Linux commands on her Windows laptop, so she installs a Type 2 hypervisor such as VirtualBox and runs a Linux VM in a window beside her email.",
   "Common mistakes: thinking Type 1 means 'first' or 'better for everything', when it simply means it runs on the hardware; calling Hyper-V a Type 2 because you enable it from Windows; assuming Type 2 hypervisors do not need VT-x or AMD-V; and forgetting that a Type 2 guest's uptime depends on the host operating system. Also do not confuse a hypervisor with a container engine, which shares one operating system kernel instead of running full guests.",
   "Exam questions hinge on a few clue words. 'Installed directly on the hardware', 'bare metal', 'data center' or 'no host operating system' points to Type 1. 'Runs as an application on Windows or macOS', 'hosted', 'testing on a laptop' points to Type 2. 'Best performance for production servers' points to Type 1. 'VM will not start, virtualization unavailable' points to enabling VT-x or AMD-V in firmware, whichever type is used."
  ],
  "terms": [
   [
    "Hypervisor",
    "Software that creates, runs and isolates virtual machines by sharing physical hardware among them."
   ],
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor installed directly on hardware, used in data centers and servers."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on top of a normal operating system."
   ],
   [
    "Bare metal",
    "Running directly on the physical hardware without a general-purpose operating system underneath."
   ],
   [
    "KVM",
    "Kernel-based Virtual Machine, a Type 1 hypervisor built into the Linux kernel."
   ],
   [
    "VT-x / AMD-V",
    "Intel and AMD hardware virtualization features that must be enabled in firmware for hypervisors."
   ]
  ],
  "example": "A training company needs every student laptop to run a Windows Server VM and a Linux VM during class. You install a Type 2 hypervisor on each laptop, confirm VT-x or AMD-V is enabled in firmware, and deploy prepared VM images. Meanwhile, the company's own file and web servers run as VMs on a Type 1 hypervisor in its server room, managed from a central console.",
  "tip": "Type 1 runs on the hardware (bare metal) and is for servers and data centers; Type 2 runs on top of an operating system and is for desktops and testing. Hyper-V is Type 1 even when enabled from Windows.",
  "check": [
   [
    "What is the key difference between a Type 1 and a Type 2 hypervisor?",
    "Type 1 runs directly on the hardware; Type 2 runs as an application on top of a host operating system."
   ],
   [
    "Which hypervisor type is best suited to a data center running many production VMs, and why?",
    "Type 1, because it has less overhead and does not depend on a general-purpose host operating system, making it more efficient and stable."
   ],
   [
    "Name two examples of Type 2 hypervisors.",
    "Oracle VirtualBox and VMware Workstation (also VMware Fusion or Parallels Desktop)."
   ],
   [
    "Why does restarting the host operating system affect VMs on a Type 2 hypervisor?",
    "The hypervisor is an application on that operating system, so when the host restarts, all its VMs stop."
   ]
  ]
 },
 {
  "t": "Resource requirements for VMs: CPU virtualization support, RAM, storage, network (NAT, bridged, internal)",
  "body": [
   "Every VM (virtual machine) uses real hardware from its host, so planning resources is part of setting one up. If you give VMs too little, they run slowly; if you give them too much, the host itself struggles. The exam expects you to know the CPU, memory, storage and network requirements and to choose the right virtual network mode for a situation.",
   "The CPU must support hardware-assisted virtualization, Intel VT-x or AMD-V, and it must be enabled in the firmware. Many hypervisors also benefit from SLAT (second level address translation), known as Intel EPT or AMD RVI, which speeds up memory handling for guests. You assign each VM a number of virtual CPUs (vCPUs). You can give out more vCPUs in total than the host has physical cores, because not every VM is busy at once, but overcommitting too heavily makes everything slow. A host with more cores and threads can run more VMs smoothly. Check the guest operating system's own minimum requirements too, because a VM that is given less than the operating system needs will install poorly or not at all.",
   "RAM is often the tightest resource. Each VM needs enough memory for its own operating system and applications, and the host needs enough left over for itself and the hypervisor. A useful habit is to add up the RAM for every VM you will run at the same time plus the host's needs, then add headroom. Some hypervisors support dynamic memory, which adjusts a VM's allocation up and down based on demand. When the host runs out of physical memory it starts paging to disk and every VM slows dramatically. Task Manager or the hypervisor's own performance view shows how much memory each VM and the host are actually using.",
   "Storage holds each VM's virtual disk files, and some hypervisors also store snapshots, configuration and saved memory state alongside them. Virtual disks can be fixed size, which reserves all the space up front for steadier performance, or dynamically expanding (thin provisioned), which grows as data is written and saves space at first but can fill the host drive unexpectedly. Put VMs on fast storage such as an SSD for good performance, and watch free space, because a full host drive can stop VMs from running. Snapshots also consume space as changes accumulate.",
   "Networking lets VMs talk to the host, each other and the outside world. With NAT (network address translation), the VM shares the host's IP address; it can reach the internet and local network, but devices outside cannot easily start connections to it. This is often the default and suits general browsing or updates. Bridged networking connects the VM directly to the physical network as if it were a separate computer, so it gets its own IP address from the network's DHCP (Dynamic Host Configuration Protocol) server and other devices can reach it. Use bridged for a VM that acts as a server. Internal networking, sometimes called private, lets VMs talk only to each other, and in some hypervisors a host-only mode adds the host. Internal is ideal for isolated test labs and malware analysis.",
   "Consider a worked example. A student's laptop has 16 GB of RAM and a quad-core CPU, and she wants to run a Windows Server VM and a Windows client VM for a domain lab. You confirm VT-x is enabled, give each VM two vCPUs and 4 GB of RAM, leaving 8 GB for the host, and store both disks on the SSD as dynamically expanding. Because the lab must not leak onto the campus network, you connect both VMs to an internal network, then add a NAT adapter to the server only when it needs updates.",
   "Common mistakes: assigning all the host's RAM to guests and leaving nothing for the host; forgetting that dynamically expanding disks can fill the host drive; choosing NAT for a VM that other computers must reach as a server; choosing bridged for a malware lab that should be isolated; and blaming the hypervisor when VT-x or AMD-V is simply disabled in firmware.",
   "Exam questions map needs to settings. 'Other PCs must connect to the VM' or 'VM needs its own IP on the LAN' means bridged. 'VM needs internet but should share the host's address' means NAT. 'VMs must only talk to each other' means internal or private. 'Host slows to a crawl with several VMs running' means insufficient RAM. 'VM will not start, virtualization unavailable' means enable VT-x or AMD-V."
  ],
  "terms": [
   [
    "vCPU",
    "A virtual processor assigned to a VM, backed by the host's physical cores and threads."
   ],
   [
    "SLAT",
    "Second level address translation, a CPU feature (Intel EPT, AMD RVI) that speeds memory handling for VMs."
   ],
   [
    "Dynamically expanding disk",
    "A virtual disk that grows as data is written instead of reserving all its space up front."
   ],
   [
    "NAT networking",
    "A VM network mode where the VM shares the host's IP address to reach outside networks."
   ],
   [
    "Bridged networking",
    "A VM network mode that connects the VM directly to the physical network with its own IP address."
   ],
   [
    "Internal networking",
    "A VM network mode that lets VMs communicate only with each other, isolated from outside networks."
   ]
  ],
  "example": "A technician sets up a web server VM on a host with 32 GB of RAM. She confirms AMD-V is enabled, gives the VM four vCPUs and 8 GB of RAM, and stores its fixed-size virtual disk on the host's SSD. She chooses bridged networking so the VM gets its own IP address from the office DHCP server and other computers can browse to it, and she checks that the host keeps enough free memory and disk space.",
  "tip": "NAT shares the host's address (outbound works, inbound is hard); bridged gives the VM its own address on the LAN (use for servers); internal isolates VMs from everything else (use for labs). Leave RAM for the host.",
  "check": [
   [
    "Which VM network mode should you use if other computers on the LAN need to connect to a VM acting as a server?",
    "Bridged, because it gives the VM its own IP address on the physical network."
   ],
   [
    "What happens to the host if you assign too much RAM to running VMs?",
    "The host runs short of memory, pages to disk and slows down, taking all its VMs with it."
   ],
   [
    "Which network mode isolates a malware analysis lab from the rest of the network?",
    "Internal (private) networking, which lets VMs communicate only with each other."
   ],
   [
    "What is the risk of dynamically expanding virtual disks?",
    "They grow as data is written and can unexpectedly fill the host's drive, stopping VMs from running."
   ]
  ]
 },
 {
  "t": "Security for VMs: isolation, snapshots, patching guests",
  "body": [
   "Virtualization brings real security benefits, but only when VMs are managed carefully. A common assumption is that anything inside a VM is automatically safe. In reality, each guest is a full computer that can be attacked, infected and misconfigured like any other, and the hypervisor itself becomes a high-value target because it controls every VM on the host. Good VM security therefore works in layers: protect the hypervisor and host, configure isolation sensibly, and manage each guest as carefully as you would a physical machine.",
   "Isolation is the main security benefit. The hypervisor keeps each VM's memory, processes and virtual disks separate, so a problem in one guest should not spread to the host or to other guests. That is why VMs are used as sandboxes for testing suspicious files. Isolation is not perfect, though. A VM escape is an attack in which code running in a guest breaks out through a hypervisor flaw to reach the host or other VMs. Escapes are rare but serious, which is why hypervisors must be kept patched. Features such as shared folders, a shared clipboard and drag-and-drop weaken isolation, so disable them for VMs that handle untrusted content.",
   "Network settings also affect isolation. A bridged VM sits on the real network and can reach, and be reached by, other devices. A VM with an internal or host-only network is fenced off. Match the network mode to the risk: put test or analysis VMs on isolated networks and treat any bridged VM as a full member of the network that needs the same controls as a physical computer, including a host firewall and endpoint protection. Limit who can use the hypervisor's management console as well, since anyone with that access can copy, start, stop or delete every VM on the host.",
   "Snapshots capture the state of a VM at a moment in time, including its disk and often its memory, so you can revert to that point later. Take a snapshot before installing updates, changing configuration or running something risky; if things go wrong, revert and you are back where you started in seconds. Snapshots are not backups. They usually depend on the original virtual disk, so if that disk is lost or corrupted, the snapshot is useless. Long chains of old snapshots also consume storage and slow performance, so delete them once you no longer need them and use a proper backup product for recovery.",
   "Patching guests is essential. Each guest operating system needs its own updates, antivirus or endpoint protection, and firewall configuration, exactly like a physical machine. VMs that are powered off for long periods, such as templates and rarely used test machines, fall behind on patches and can be exploited as soon as they start, so update templates regularly and patch VMs right after powering them on. The hypervisor or host operating system needs patching too. Also watch for VM sprawl, where unmanaged VMs multiply until nobody knows who owns them or whether they are patched, and keep an inventory.",
   "Consider a worked example. A technician needs to install a major update on a VM running an accounting application. She confirms that last night's backup completed, takes a snapshot, then installs the update. The application fails to start afterward, so she reverts to the snapshot and the VM is back to its working state within a minute. After the vendor releases a fix and the update succeeds, she deletes the snapshot so it does not keep growing on the host's storage.",
   "Common mistakes: relying on snapshots instead of backups; leaving old snapshots in place for months; forgetting to patch templates and powered-off VMs; enabling shared clipboard and folders on a VM used to open untrusted files; and assuming that guest isolation means a guest does not need antivirus or a firewall. Another mistake is patching guests but not the hypervisor, which is the layer an escape would target.",
   "Exam questions use recognizable phrases. 'Revert quickly after a failed update' points to snapshots. 'Recover after the host disk fails' points to backups, not snapshots. 'Malware in a guest reached the host' points to VM escape and hypervisor patching. 'Untrusted file, no data leaves the VM' points to disabling shared clipboard and folders plus an isolated network. 'Unknown, unpatched VMs everywhere' points to VM sprawl."
  ],
  "terms": [
   [
    "Isolation",
    "The separation the hypervisor maintains between VMs and between VMs and the host."
   ],
   [
    "VM escape",
    "An attack in which code in a guest breaks out through a hypervisor flaw to reach the host or other VMs."
   ],
   [
    "Snapshot",
    "A saved point-in-time state of a VM that can be reverted to, not a substitute for a backup."
   ],
   [
    "Guest patching",
    "Applying operating system and application updates inside each VM, as on a physical computer."
   ],
   [
    "VM sprawl",
    "An uncontrolled growth of VMs that are poorly tracked, managed or patched."
   ],
   [
    "Template",
    "A master VM image used to create new VMs, which must itself be kept up to date."
   ]
  ],
  "example": "An IT team finds a dozen forgotten test VMs on a host, several not patched in over a year and some bridged to the production network. They inventory all VMs, assign owners, delete the unused ones, move the remaining test VMs to an internal network, update the templates and schedule monthly patching for guests and the hypervisor.",
  "tip": "Snapshots are for quick rollback, backups are for recovery; they are not interchangeable. Patch each guest and the hypervisor, and patch templates and powered-off VMs as soon as they start. Disable shared clipboard and folders for untrusted content.",
  "check": [
   [
    "Why is a snapshot not a replacement for a backup?",
    "It usually depends on the original virtual disk and is stored with it, so it cannot recover data if that disk or host is lost."
   ],
   [
    "What is a VM escape?",
    "An attack where code in a guest exploits a hypervisor flaw to reach the host or other VMs."
   ],
   [
    "Why do powered-off VMs and templates pose a security risk?",
    "They miss updates while off and can be vulnerable as soon as they are started."
   ],
   [
    "What should you do before installing a risky update on a VM, and after it succeeds?",
    "Take a snapshot before, then delete the snapshot once the update is confirmed working so it does not grow and slow the VM."
   ]
  ]
 },
 {
  "t": "Containers vs virtual machines",
  "body": [
   "Containers and virtual machines both let you run applications in isolated environments on shared hardware, but they work in different ways. Understanding the difference helps you choose the right tool and answer exam questions that describe one or the other. The short version: a VM (virtual machine) virtualizes hardware and runs a whole operating system, while a container virtualizes the operating system and runs just an application.",
   "A virtual machine includes a complete guest operating system with its own kernel, the core of the operating system that manages hardware and processes. The hypervisor presents virtual hardware to each VM, and each VM boots its operating system just like a physical computer. This gives strong isolation and flexibility: you can run Windows and Linux VMs side by side on the same host. The cost is size and speed. Each VM carries a full operating system, uses gigabytes of storage and RAM, and takes time to boot.",
   "A container packages an application together with its libraries, dependencies and configuration, but not a full operating system. All containers on a host share the host's operating system kernel, and a container engine or runtime, such as Docker or containerd, keeps them isolated from each other using kernel features. Containers are small, often tens or hundreds of megabytes, start in seconds or less, and let many more applications run on the same hardware. Containers are built from images, and the same image runs the same way on a developer's laptop, a test server and in the cloud, which solves the familiar 'it works on my machine' problem. Images are stored in registries and are built in layers, so updating an application usually means building a new image and replacing the running containers rather than patching them in place.",
   "The key trade-offs follow from that design. Because containers share the host kernel, they generally must use the same operating system family as the host: Linux containers need a Linux kernel and Windows containers need a Windows host. On Windows and macOS desktops, Linux containers usually run inside a lightweight Linux VM behind the scenes. Container isolation is also generally considered weaker than VM isolation, because a flaw in the shared kernel could affect every container. VMs are the better choice when you need a different operating system, strong isolation or a full desktop environment. Containers are the better choice when you need to run many copies of the same application efficiently, deploy updates quickly and move workloads between environments without surprises.",
   "Containers suit modern application design, where a large application is split into small services, called microservices, that can each be updated, scaled and restarted independently. Orchestration tools such as Kubernetes manage large numbers of containers across many hosts, restarting failed ones and adding more when demand rises. In practice the two technologies are often combined: cloud providers commonly run containers inside VMs to get both efficiency and strong isolation between customers.",
   "Consider a worked example. A development team ships a web application made of a front end, an API and a background worker. Instead of building three VMs with three full operating systems, they package each part as a container image. The same images run on each developer's laptop, on the test server and in production, and during busy periods the orchestration platform starts extra copies of the API container within seconds. Separately, an old Windows-only reporting tool still needs its own full operating system, so it stays in a VM. The team now patches the container images by rebuilding them from updated base images each month, and patches the reporting VM like any other Windows machine.",
   "Common mistakes: thinking each container has its own operating system kernel; assuming a Linux host can run Windows containers directly; believing containers are always more secure than VMs, when VMs generally isolate more strongly; and confusing a container image, the template, with a running container, the instance. Another mix-up is treating application virtualization and containers as identical; both isolate an app, but containers are the standard for packaging and deploying server applications.",
   "Exam wording is usually about weight and scope. 'Shares the host kernel', 'lightweight', 'starts in seconds', 'microservices' or 'Docker' points to containers. 'Full guest operating system', 'run Windows and Linux side by side', 'strongest isolation' or 'hypervisor' points to VMs. 'Same package runs identically everywhere' points to container images."
  ],
  "terms": [
   [
    "Container",
    "An isolated package of an application and its dependencies that shares the host operating system's kernel."
   ],
   [
    "Kernel",
    "The core of an operating system that manages hardware, memory and processes."
   ],
   [
    "Container image",
    "A read-only template containing an application and everything it needs, used to start containers."
   ],
   [
    "Container engine",
    "Software such as Docker or containerd that builds, runs and isolates containers."
   ],
   [
    "Microservices",
    "An application design that splits software into small, independently deployable services."
   ],
   [
    "Orchestration",
    "Automated management of many containers across hosts, as done by tools such as Kubernetes."
   ]
  ],
  "example": "An online store's order system slows during holiday sales. Its developers had packaged each service as a container image, so the operations team configures the orchestration platform to start more copies of the checkout container when load rises. New containers start in seconds, sales go through smoothly, and the extra copies are removed when traffic falls. The store's legacy Windows accounting server remains in its own VM.",
  "tip": "Containers share the host kernel and are lightweight and fast; VMs each run a full operating system with stronger isolation. If the question needs a different operating system from the host or maximum isolation, choose a VM.",
  "check": [
   [
    "What is the main architectural difference between a container and a VM?",
    "A container shares the host operating system's kernel and packages only the app and its dependencies; a VM runs a complete guest operating system with its own kernel."
   ],
   [
    "Why do containers start much faster than VMs?",
    "They do not boot a full operating system; they only start the application process on the already running host kernel."
   ],
   [
    "When would you choose a VM over a container?",
    "When you need a different operating system from the host, stronger isolation or a full desktop environment."
   ],
   [
    "What problem do container images solve for developers?",
    "An application runs the same way on every system, because its dependencies travel with it inside the image."
   ]
  ]
 },
 {
  "t": "Virtual desktop infrastructure (VDI) and desktop as a service",
  "body": [
   "Virtual desktop infrastructure (VDI) delivers a user's desktop from a virtual machine running in a data center instead of from the operating system on the computer in front of them. The user connects from a thin client, laptop, tablet or even a phone, and sees a full Windows or Linux desktop with their applications and files. Keyboard, mouse and screen updates travel over the network, while the actual processing and data stay on central servers.",
   "Here is how it works step by step. Servers in the data center run a hypervisor that hosts many desktop VMs. A connection broker authenticates users and directs each one to the right desktop. The user's device runs a lightweight client that uses a remote display protocol to send input and receive screen images. When the user disconnects, the desktop can stay running, so they can reconnect later from another device and pick up exactly where they left off. Administrators manage images, patches and applications centrally rather than touching every physical PC. Because only screen updates cross the network, the device itself needs little processing power, but the quality of the experience depends heavily on network speed and latency.",
   "Desktops can be persistent or non-persistent. A persistent desktop belongs to one user and keeps their changes, installed apps and settings between sessions, much like a personal PC. A non-persistent desktop is built fresh from a master image each time and discards changes when the user logs off; user settings and files are kept separately, for example in a profile service or network storage. Non-persistent desktops are easier to patch and keep clean, because you update one image and everyone gets the new version at their next login, and any malware a user picks up disappears at logoff.",
   "VDI has clear benefits. Data stays in the data center, so a lost or stolen laptop does not expose company files. Users can work from almost any device, including personal ones, which supports remote work and BYOD (bring your own device). Setting up a new employee can take minutes. Old or low-powered PCs and thin clients become usable because the heavy work happens on the servers. The drawbacks are that it needs a reliable, reasonably fast network connection, the central infrastructure is expensive and complex to build, and if the servers or network fail, many users lose their desktops at once.",
   "DaaS (desktop as a service) is VDI delivered by a cloud provider. Instead of buying and running the servers, storage and connection brokers yourself, you subscribe to a service that hosts the virtual desktops, and you usually pay per user per month. The provider manages the infrastructure, while your organization typically still manages the desktop images, applications and user access. DaaS is attractive for organizations that need to scale quickly, for seasonal or contract staff, and for businesses without the expertise to run VDI on premises. Examples include Windows 365 and Amazon WorkSpaces.",
   "Consider a worked example. An accounting firm hires thirty temporary staff every tax season, many working from home on their own computers. Buying and securing thirty laptops each year is expensive, and client data must not end up on personal devices. The firm subscribes to a DaaS service with non-persistent desktops built from a standard image with its tax software. Staff log in from home through the client with multifactor authentication, data never leaves the cloud desktops, and after the season the firm simply reduces its subscription.",
   "Common mistakes: assuming VDI works well over a poor connection, when lag and disconnection are the most common complaints; thinking non-persistent desktops lose users' files, when files and profiles are stored separately; confusing DaaS, which delivers whole desktops, with SaaS, which delivers individual applications; and forgetting that on-premises VDI means your organization runs the servers, while DaaS means the provider does.",
   "Exam wording uses a few recognizable clues. 'Desktop runs in the data center, user connects from a thin client' points to VDI. 'Provider hosts the virtual desktops, pay per user' points to DaaS. 'Desktop resets to a clean image at every logoff' points to non-persistent. 'User keeps installed apps between sessions' points to persistent. 'Lost laptop, no data exposed' is a VDI benefit, and 'users cannot work when the network is down' is its main drawback."
  ],
  "terms": [
   [
    "VDI",
    "Virtual desktop infrastructure, which hosts user desktops as VMs in a data center and delivers them over the network."
   ],
   [
    "DaaS",
    "Desktop as a service, virtual desktops hosted and managed by a cloud provider for a subscription fee."
   ],
   [
    "Connection broker",
    "The VDI component that authenticates users and connects them to the right virtual desktop."
   ],
   [
    "Persistent desktop",
    "A virtual desktop assigned to one user that keeps their changes between sessions."
   ],
   [
    "Non-persistent desktop",
    "A virtual desktop rebuilt from a master image at each login, with changes discarded at logoff."
   ],
   [
    "Thin client",
    "A low-powered device designed mainly to connect to remote desktops and applications."
   ]
  ],
  "example": "A hospital gives nurses thin clients at shared workstations on every ward. Each nurse taps a badge, and the connection broker connects them to their own virtual desktop in the data center, so they can walk to another ward, tap in and continue exactly where they left off. Patient data never sits on the thin clients, and IT patches one master image instead of hundreds of PCs.",
  "tip": "VDI is on premises and your organization runs the infrastructure; DaaS is the same idea hosted by a cloud provider. Both need reliable network connections. Non-persistent desktops reset at logoff; persistent desktops keep changes.",
  "check": [
   [
    "What is the main difference between VDI and DaaS?",
    "With VDI the organization hosts and manages the infrastructure; with DaaS a cloud provider hosts the virtual desktops as a subscription service."
   ],
   [
    "Why is VDI useful when laptops are frequently lost?",
    "The desktop and data stay in the data center, so the lost device holds little or no company data."
   ],
   [
    "What is a key requirement for users of VDI or DaaS?",
    "A reliable, reasonably fast network or internet connection."
   ],
   [
    "A user installs an app on a virtual desktop, and it is gone at the next login. Why?",
    "The desktop is non-persistent, so it is rebuilt from the master image and changes are discarded at logoff."
   ]
  ]
 },
 {
  "t": "Cloud deployment models: public, private, hybrid, community",
  "body": [
   "A cloud deployment model describes who owns the cloud infrastructure, who can use it and where it runs. It is a separate question from the service model (IaaS, PaaS or SaaS), which describes what the provider manages for you. The A+ exam covers four deployment models, and questions usually describe an organization's needs and ask which model fits. When you read a scenario, ask three questions: who owns the hardware, who is allowed to use it, and whether more than one environment is being combined. The answers point directly to the model.",
   "A public cloud is owned and operated by a provider and offered to the general public over the internet. Many unrelated customers share the provider's infrastructure, each isolated from the others, and each pays for what it uses. Microsoft Azure, Amazon Web Services and Google Cloud are the best-known examples. Public cloud requires no upfront hardware purchase, scales quickly and puts the burden of running data centers on the provider. The trade-offs are less control over the underlying infrastructure, dependence on internet connectivity, and the need to check that the provider's security and data location meet your requirements. Ongoing costs can also grow if usage is not watched.",
   "A private cloud is used by a single organization. It may run in the organization's own data center or be hosted by a provider on dedicated hardware, but either way it is not shared with other customers. A private cloud still offers cloud features such as self-service, automation and pooled resources, so internal teams can request servers or storage on demand. It gives the most control and can help meet strict security or regulatory requirements, but the organization pays for the capacity and the staff to run it, whether or not the capacity is used.",
   "A hybrid cloud combines two or more deployment models, usually a private cloud or on-premises data center with a public cloud, connected so that data and applications can move between them. An organization might keep sensitive databases on premises while running its public website in the public cloud, or use public cloud capacity only when on-premises resources are full, a practice called cloud bursting. Hybrid offers flexibility, but it is more complex to manage, secure and connect, and it needs consistent identity and monitoring across both sides.",
   "A community cloud is shared by several organizations with common concerns, such as the same regulations, security requirements or mission. Examples include government agencies sharing a cloud built to government security standards, or a group of hospitals or universities sharing infrastructure designed for their compliance needs. Costs are split among the members, so it is cheaper than each building its own private cloud while being more tailored and restricted than a public cloud. It may be run by one member or by a third party. Because membership is limited, a community cloud also makes it easier for the participants to share data and tools that are specific to their field, such as research datasets or case management systems.",
   "Consider a worked example. A regional bank must keep customer account data under tight control to satisfy regulators, but wants to launch a mobile app and marketing website that must scale during promotions. The bank keeps core banking systems in a private cloud in its own data center, runs the website and app front end in a public cloud, and connects the two over secure links. That combination is a hybrid cloud. A group of neighboring credit unions, by contrast, might pool resources in a community cloud built for the same financial regulations.",
   "Common mistakes: thinking private cloud must be on premises, when a provider can host it on dedicated hardware; confusing hybrid (mixing models) with community (sharing among similar organizations); mixing deployment models with service models; and assuming the public cloud is inherently insecure, when the real issue is shared responsibility and correct configuration. Another trap is calling any use of two public cloud providers hybrid; that is usually called multicloud.",
   "Exam questions hinge on who shares the infrastructure. 'Available to anyone, pay as you go, provider owns it' points to public. 'Single organization, maximum control' points to private. 'Combination of on-premises and public cloud' or 'burst to the cloud during peaks' points to hybrid. 'Several organizations with the same regulatory requirements share infrastructure' points to community."
  ],
  "terms": [
   [
    "Public cloud",
    "Cloud infrastructure owned by a provider and shared by many unrelated customers over the internet."
   ],
   [
    "Private cloud",
    "Cloud infrastructure used exclusively by one organization, on premises or hosted on dedicated hardware."
   ],
   [
    "Hybrid cloud",
    "A combination of deployment models, such as private and public, connected to work together."
   ],
   [
    "Community cloud",
    "Cloud infrastructure shared by several organizations with common requirements or concerns."
   ],
   [
    "Cloud bursting",
    "Using public cloud capacity when on-premises or private resources reach their limit."
   ],
   [
    "Deployment model",
    "A description of who owns, uses and hosts a cloud environment."
   ]
  ],
  "example": "Several state agencies need email and document storage that meets the same government security requirements. Rather than each building its own private cloud, they share one community cloud certified to those standards. Costs are divided among the agencies, and each gets infrastructure designed for its compliance obligations, while still being separate from the general public cloud.",
  "tip": "Deployment models answer who uses and owns it: public (anyone), private (one organization), hybrid (a mix) and community (a group with shared needs). Do not confuse them with the service models IaaS, PaaS and SaaS.",
  "check": [
   [
    "A company keeps its customer database on premises and runs its website in a public cloud. Which deployment model is this?",
    "Hybrid cloud, because it combines private or on-premises infrastructure with a public cloud."
   ],
   [
    "Several hospitals share a cloud designed for their common healthcare regulations. Which model is this?",
    "Community cloud."
   ],
   [
    "Does a private cloud have to be located in the organization's own data center?",
    "No. It can be hosted by a provider, as long as it is dedicated to that one organization."
   ],
   [
    "What is the main trade-off of a private cloud compared with a public cloud?",
    "More control and easier compliance, but the organization pays for and manages all of the capacity whether it is used or not."
   ]
  ]
 },
 {
  "t": "Cloud service models: IaaS, PaaS, SaaS",
  "body": [
   "Cloud service models describe what a cloud provider manages for you and what you still manage yourself. Think of a stack of layers: the physical data center, networking, storage, servers and virtualization at the bottom; then the operating system and middleware; then the runtime, applications and data at the top. Each service model hands a different amount of that stack to the provider. The more the provider manages, the less control you have and the less work you do.",
   "IaaS (infrastructure as a service) gives you virtualized computing resources: virtual machines, storage and networking. The provider manages the physical hardware, the facility, the network and the hypervisor. You manage everything from the operating system up, including installing updates, configuring firewalls, installing applications and securing your data. IaaS offers the most control and flexibility of the three and suits organizations that want to move existing servers to the cloud without redesigning them, often called lift and shift. Examples include virtual machines in Amazon EC2, Azure Virtual Machines and Google Compute Engine.",
   "PaaS (platform as a service) provides a ready-to-use platform for building and running applications. The provider manages the infrastructure plus the operating system, runtime and middleware such as web servers and database engines. You upload your code and manage your application and data, without patching servers or operating systems. PaaS suits developers who want to focus on writing software rather than maintaining servers. Examples include Azure App Service, Google App Engine and Heroku, as well as managed database services. The trade-off is less control: you work within the languages, versions and settings the platform supports.",
   "SaaS (software as a service) delivers a complete application over the internet, usually through a web browser or a light client app. The provider manages everything: infrastructure, platform and the application itself, including updates and availability. You simply use the software and manage your own data, user accounts and settings. Microsoft 365, Google Workspace, Salesforce and web-based email are familiar examples. SaaS needs the least technical effort from the customer and is typically paid per user by subscription. The trade-off is that you accept the provider's features, update schedule and configuration options, and you depend on the provider's availability.",
   "The shared responsibility model follows from these layers. Security of the cloud, meaning the physical data centers and the provider's infrastructure, is always the provider's job. Security in the cloud depends on the model. In IaaS you patch the operating system and configure security; in PaaS you secure your code and data; in SaaS you still control who has access, how strong their authentication is and how your data is shared. The customer is always responsible for their data and for managing their own users. Many cloud security incidents come not from provider failures but from customer misconfigurations, such as storage left open to the public or accounts without multifactor authentication, which is why understanding your side of the model matters.",
   "Consider a worked example. A small company has three needs. It wants email and office apps without running servers, so it subscribes to a SaaS suite. Its developers want to deploy a customer web app without patching servers, so they use PaaS. It also has an old inventory application that needs a specific operating system configuration, so it runs that on an IaaS virtual machine it manages itself, including monthly operating system updates and firewall rules.",
   "Common mistakes: thinking a SaaS provider is responsible for weak user passwords or overshared files; assuming IaaS means the provider patches your guest operating system; mixing service models with deployment models; and treating PaaS as simply 'hosting', when its point is that the provider maintains the runtime and operating system. A useful memory aid is to compare the models to transport: IaaS is renting a car, where you drive and refuel it; PaaS is a taxi, where you choose the destination; SaaS is a bus, where you simply ride.",
   "Exam questions usually describe who does what. 'Customer manages the operating system and applications, provider manages hardware' points to IaaS. 'Developers deploy code without managing servers' points to PaaS. 'Users access a finished application in a browser' points to SaaS. 'Most control' means IaaS; 'least management' means SaaS. 'Who is responsible for user access and data' is always the customer."
  ],
  "terms": [
   [
    "IaaS",
    "Infrastructure as a service, providing virtual machines, storage and networking while the customer manages the operating system and above."
   ],
   [
    "PaaS",
    "Platform as a service, providing a managed runtime and operating system so customers deploy only code and data."
   ],
   [
    "SaaS",
    "Software as a service, providing a complete application managed entirely by the provider."
   ],
   [
    "Shared responsibility model",
    "The division of security and management duties between cloud provider and customer, which varies by service model."
   ],
   [
    "Lift and shift",
    "Moving existing servers to cloud VMs with little or no redesign, typically using IaaS."
   ],
   [
    "Middleware",
    "Software such as web servers and database engines that sits between the operating system and applications."
   ]
  ],
  "example": "A startup moves its customer portal to the cloud. At first it rents IaaS virtual machines and spends hours each month patching operating systems. It then moves the portal to a PaaS offering, so the provider maintains the operating system and runtime while developers just deploy code. For email and document collaboration the company uses a SaaS suite, managing only user accounts, multifactor authentication and sharing settings.",
  "tip": "Remember the layers: IaaS means you manage the operating system and up, PaaS means you manage only your code and data, SaaS means you just use the application. Whatever the model, the customer always owns its data and user access.",
  "check": [
   [
    "In IaaS, who is responsible for patching the operating system?",
    "The customer, because the provider manages only the hardware, network and virtualization layer."
   ],
   [
    "A development team wants to deploy code without managing servers or operating systems. Which model fits?",
    "PaaS."
   ],
   [
    "Which service model gives the customer the most control, and which the least?",
    "IaaS gives the most control; SaaS gives the least."
   ],
   [
    "Under SaaS, who is responsible for enforcing strong authentication for the company's users?",
    "The customer, who manages its own accounts, access and data even though the provider runs the application."
   ]
  ]
 },
 {
  "t": "Cloud characteristics: shared vs dedicated resources, metered utilization, rapid elasticity, high availability, multitenancy, file synchronization",
  "body": [
   "Cloud computing is defined less by where servers sit and more by how resources are provided and consumed. The A+ exam lists a set of characteristics that distinguish cloud services from traditional IT, and questions often describe a behavior, such as automatically adding servers during a traffic spike or billing by the hour, and ask you to name the characteristic. Shared versus dedicated resources describes whether the hardware behind your service is used by other customers. With shared resources, the most common and cheapest arrangement, your virtual machines or services run on physical servers alongside other customers' workloads, isolated by the hypervisor and the provider's controls. With dedicated resources, sometimes offered as dedicated hosts or instances, the physical hardware is reserved for you alone. Dedicated resources cost more but can satisfy licensing rules that are tied to physical hardware, compliance requirements or a desire for extra isolation.",
   "Metered utilization means you pay for what you actually use, measured by the provider, much like a utility bill for electricity or water. Compute might be billed by the second or hour, storage by the amount stored per month and network traffic by the data transferred. Metering makes costs flexible, because you can start small and pay more only as demand grows, but it also means costs can rise unexpectedly if resources are left running or usage grows. Monitoring, budgets and alerts help keep spending under control.",
   "Rapid elasticity is the ability to add or remove resources quickly, often automatically, to match demand. Scaling out adds more instances of a server, scaling up gives an instance more CPU or memory, and scaling in or down removes capacity when demand falls. To the customer, capacity appears almost unlimited. Elasticity pairs naturally with metered billing, because you pay for extra capacity only while you use it. It is closely related to on-demand self-service, where customers provision resources themselves through a portal or API (application programming interface) without waiting for the provider's staff.",
   "High availability means designing services to keep running despite failures. Providers run multiple data centers grouped into regions and availability zones, and customers can spread workloads across them so that the loss of a server, rack or entire data center does not take the service down. Redundant power, networking and storage, automatic failover and load balancing all contribute. Availability is often promised in an SLA (service level agreement) as a percentage of uptime. High availability is not automatic, though: a single VM in one zone can still go down, and the customer must design for redundancy.",
   "Multitenancy means one instance of the infrastructure or application serves many customers, called tenants, while keeping each tenant's data and configuration separate. SaaS applications are typically multitenant: every company using the service shares the same software and hardware, but each sees only its own data. Multitenancy is what makes public cloud economical, but it relies on strong logical isolation. File synchronization keeps copies of files consistent across devices and the cloud. When you save a file in a synced folder, services such as OneDrive, Google Drive or Dropbox upload the change and update other devices. It enables working anywhere and some version history, but sync is not a true backup, because deletions and corruption also sync.",
   "Consider a worked example. An online ticket seller expects huge demand when concert tickets go on sale at 10:00. Its web tier is configured to scale out automatically from four to forty servers as traffic rises and back down afterward, which is rapid elasticity. It is billed only for the extra servers during those hours, which is metered utilization, and it runs across two availability zones behind a load balancer, which is high availability. The same morning, a staff member deletes a synced shared folder by mistake, and the deletion syncs to every device, so the team restores it from the service's recycle bin and version history.",
   "Common mistakes: confusing elasticity (automatic, rapid scaling) with simply buying bigger servers; assuming high availability is built in without designing for it; thinking file sync is a backup; and mixing up multitenancy (many customers on shared software) with shared resources (many customers on shared hardware), which are closely related but not identical.",
   "Exam wording is usually direct: 'scales automatically with demand' means rapid elasticity; 'pay only for what you use' means metered utilization; 'survives a data center outage' means high availability; 'many customers share one application instance' means multitenancy; 'licensing requires your own physical server' means dedicated resources; 'files updated on all devices' means file synchronization."
  ],
  "terms": [
   [
    "Metered utilization",
    "Billing based on measured use of resources such as compute time, storage and data transfer."
   ],
   [
    "Rapid elasticity",
    "The ability to scale resources out or in quickly, often automatically, to match demand."
   ],
   [
    "High availability",
    "Designing services with redundancy and failover so they keep running despite failures."
   ],
   [
    "Multitenancy",
    "One instance of infrastructure or software serving many customers while keeping their data separate."
   ],
   [
    "Dedicated resources",
    "Physical cloud hardware reserved for a single customer rather than shared."
   ],
   [
    "File synchronization",
    "Keeping copies of files consistent across devices and cloud storage automatically."
   ],
   [
    "SLA",
    "Service level agreement, a contract that defines expected service levels such as uptime."
   ]
  ],
  "example": "A university's online enrollment system slows to a crawl every semester on registration day. After moving it to the cloud, the IT team configures automatic scaling so extra servers start as student logins surge and shut down in the evening. They spread the servers across two availability zones for high availability, set budget alerts because the service is metered, and review the monthly bill to confirm they paid for the extra capacity only on registration day.",
  "tip": "Elasticity is about quickly scaling with demand; metered is about paying for what you use; high availability is about surviving failures; multitenancy is about many customers sharing one instance. File sync is convenient but is not a backup.",
  "check": [
   [
    "A web application automatically adds servers during a traffic spike and removes them afterward. Which characteristic is this?",
    "Rapid elasticity."
   ],
   [
    "Why might an organization choose dedicated rather than shared cloud resources?",
    "For software licensing tied to physical hardware, compliance requirements or extra isolation from other customers."
   ],
   [
    "Why is file synchronization not a substitute for backups?",
    "Deletions, corruption or ransomware encryption sync to every device, so the bad change spreads instead of being preserved against."
   ],
   [
    "What does multitenancy mean in a SaaS application?",
    "Many customers share the same application instance and infrastructure, but each tenant's data and settings are kept separate."
   ]
  ]
 },
 {
  "t": "The CompTIA troubleshooting methodology: identify (question users, back up, check recent changes), theorize, test, plan, implement, verify, document",
  "body": [
   "CompTIA expects every A+ technician to follow a structured troubleshooting methodology. It keeps you from jumping to conclusions, replacing parts at random or making problems worse, and it makes your work repeatable and easy for others to follow. The steps also protect the user: backing up first, respecting policy and confirming the result before closing the ticket all reduce the chance that a repair creates a bigger problem than the one you were called for. Exam questions frequently ask which step comes next, or what you should have done first, so learn the steps in order and what belongs in each.",
   "Step 1: identify the problem. Gather information from the user and from the system: what exactly happens, when it started, whether error messages appear and whether it affects one person or many. Question the user and identify user changes to the computer; a newly installed program or moved cable is often the cause. Inquire about environmental or infrastructure changes, such as a network outage, a power event or an office move. Perform backups before making changes, because repairs can cause data loss. Consider corporate policies, procedures and impacts before implementing changes, and duplicate the problem if you can.",
   "Step 2: establish a theory of probable cause. Question the obvious first: is it plugged in, turned on, connected to the right network? Start with simple, likely causes before complex ones. If necessary, conduct external or internal research based on symptoms: search the vendor's knowledge base, error codes, internal documentation or past tickets. You may have several theories; rank them by likelihood and ease of testing. Step 3: test the theory to determine the cause. Try something that proves or disproves it, such as swapping in a known-good cable or checking a log. Once the theory is confirmed, determine the next steps to resolve the problem. If it is not confirmed, establish a new theory and test again, or escalate to a more senior technician or specialist team when the problem is beyond your knowledge or authority.",
   "Step 4: establish a plan of action to resolve the problem and implement the solution. The plan should consider impact, such as downtime, and may need approval through change management. Refer to the vendor's instructions for guidance on replacing parts or applying fixes. Then implement the solution, or escalate if implementation requires someone else. Step 5: verify full system functionality and, if applicable, implement preventive measures. Confirm with the user that everything works, not just the part you fixed, and take steps to stop a repeat, such as updating a driver across all similar machines, adding a surge protector or training the user.",
   "Step 6: document findings, actions and outcomes. Record the symptoms, the cause, what you did and the result in the ticketing system or knowledge base. Documentation helps the next technician solve the same issue faster, reveals patterns across many tickets and provides a record for audits and warranty claims. Good notes are specific: the exact error message, the part number replaced, the driver version installed and how the user confirmed the fix. Vague notes such as 'fixed PC' help nobody.",
   "Consider a worked example. A user says her PC will not connect to the network since this morning. You ask questions and learn a desk move happened yesterday (identify). You theorize the network cable is loose or plugged into an unpatched wall jack (theory), and swapping ports proves the new jack is not patched to a switch (test). You plan to request a patch, and while waiting you move her to a live port (plan and implement). You confirm she can reach email and shared drives, and ask facilities to label jacks (verify and prevent), then record everything in the ticket (document).",
   "Common mistakes: skipping the backup and losing data during a repair; testing an expensive theory before an obvious one; implementing a fix without considering impact or policy; closing a ticket without confirming with the user; and forgetting documentation. Another is escalating too early without gathering the details the next technician will need, or too late after hours of guessing; when you escalate, pass on everything you have already learned and tested.",
   "Exam questions use clue words. 'Asked the user what changed' is identify. 'Researched the error code' or 'question the obvious' is theory. 'Theory not confirmed' leads to a new theory or escalation. 'Refer to vendor instructions' is plan and implement. 'Confirm it works and prevent recurrence' is verify. The last step is always document."
  ],
  "terms": [
   [
    "Troubleshooting methodology",
    "CompTIA's six-step structured process for diagnosing and resolving problems."
   ],
   [
    "Theory of probable cause",
    "A reasoned guess about what is causing a problem, tested before acting on it."
   ],
   [
    "Question the obvious",
    "Checking simple causes such as power and cables before complex ones."
   ],
   [
    "Escalation",
    "Passing a problem to a more experienced technician or specialist team when it cannot be resolved at the current level."
   ],
   [
    "Preventive measures",
    "Actions taken after a fix to stop the problem from happening again."
   ],
   [
    "Documentation",
    "Recording symptoms, cause, actions and outcome so knowledge is kept and reused."
   ]
  ],
  "example": "Several users report that a shared printer produces blank pages. The technician checks the ticket history and asks whether anything changed; a new toner cartridge was installed yesterday. Her theory is that the protective seal was not removed, and opening the printer confirms it. She removes the seal, prints a test page, has users confirm their jobs print, adds a note to the toner installation procedure and documents the fix in the ticket.",
  "tip": "Remember the order: identify, theorize, test, plan and implement, verify, document. Back up before making changes. If a theory fails, form a new one or escalate. Documentation is always the last step.",
  "check": [
   [
    "What should you do before making changes to a user's system while identifying a problem?",
    "Perform a backup, and consider corporate policies, procedures and impacts, so data is protected if the repair goes wrong."
   ],
   [
    "Your theory is not confirmed by testing. What are your options?",
    "Establish a new theory and test it, or escalate the problem."
   ],
   [
    "Which step comes immediately after implementing the solution?",
    "Verify full system functionality and, if applicable, implement preventive measures."
   ],
   [
    "What is the final step of the methodology, and why does it matter?",
    "Document findings, actions and outcomes, so others can solve the same issue faster and patterns can be spotted."
   ]
  ]
 },
 {
  "t": "Motherboard, RAM, CPU and power problems: POST beeps, no power, overheating shutdowns, blue screens, burning smell, swollen capacitors, date/time resets",
  "body": [
   "Problems with the motherboard, RAM (random access memory), CPU (central processing unit) and power supply often produce dramatic symptoms: a PC that will not start, beeps instead of booting, shuts off without warning or crashes to a blue screen. Because these parts depend on each other, the same symptom can have several causes, so work from the simplest and most likely cause to the most complex, following the troubleshooting methodology. POST (power-on self-test) is the firmware's check of essential hardware each time the computer starts. If POST finds a problem before the display works, it reports it with beep codes, a pattern of beeps, or with diagnostic LEDs or a numeric code on the board. The meaning of beep patterns depends on the firmware manufacturer, so look them up in the motherboard documentation rather than memorizing them. In general, one short beep often means POST passed, and repeated or long beeps commonly indicate memory or video problems. A POST card plugged into an expansion slot can display codes on boards without built-in diagnostics.",
   "No power means nothing happens at all: no fans, no lights. Check the obvious first: the outlet, the power strip or surge protector, the power cable and the switch on the back of the PSU (power supply unit). Then check internal connections, especially the 24-pin and CPU power connectors, and the front-panel power switch cable. Test the PSU with a power supply tester or multimeter, or swap in a known-good unit. If fans spin but there is no display and no beeps, suspect RAM, the CPU, the motherboard or a graphics card, and try reseating the memory first.",
   "Overheating shutdowns occur when a component reaches a temperature limit and the system turns itself off to prevent damage, often during games or heavy workloads. Causes include dust-clogged heat sinks and filters, failed fans, dried-out or missing thermal paste, blocked vents and poor airflow. Check temperatures in firmware or monitoring software, clean with compressed air and replace fans or paste as needed. Intermittent shutdowns or reboots can also come from a failing or undersized PSU.",
   "A blue screen, the Windows stop error or BSOD (blue screen of death), shows a stop code and restarts. It can be caused by faulty RAM, bad or outdated drivers, overheating, storage problems or failing hardware. Note the stop code and check Event Viewer and minidump files, run Windows Memory Diagnostic or another memory test, update or roll back recently changed drivers, and test with known-good RAM. If blue screens began right after new hardware or a driver was installed, that change is your first suspect. Frequent random crashes, spontaneous reboots and application errors may also point to memory.",
   "Some symptoms demand immediate action. A burning smell or smoke means power off and unplug at once; identify the damaged component, often the PSU or a component on the motherboard, and replace it. Swollen or leaking capacitors, visible as bulging tops or brown residue on the board, indicate a failing motherboard or PSU that causes instability; the part should be replaced, not repaired. Date and time that reset to a default whenever the PC is unplugged, along with lost firmware settings, point to a dead CMOS (complementary metal-oxide semiconductor) battery, a coin cell that is simple to replace.",
   "Consider a worked example. A desktop has started rebooting randomly and occasionally shows a blue screen with a memory-related stop code. Nothing was installed recently. You check Event Viewer, which shows unexpected shutdowns, and temperatures look normal. Windows Memory Diagnostic reports errors. You test each RAM module on its own and find one faulty stick, replace it under warranty, run the memory test again with no errors and document the fix.",
   "Common mistakes: replacing the motherboard before checking the outlet and PSU switch; ignoring swollen capacitors; memorizing one vendor's beep codes as universal; and powering a PC back on after a burning smell. Another trap is assuming a blue screen always means failing hardware, when a recently updated driver is a more common cause and is far cheaper to fix.",
   "Exam questions are symptom-driven. 'Clock resets every time the PC is unplugged' points to the CMOS battery. 'Shuts down during games, fine at idle' points to overheating. 'Beeps, no display' points to POST errors, often RAM or video. 'Nothing at all, no fans' points to power. 'Burning smell' means unplug immediately. 'Bulging capacitors' means replace the board or PSU. 'Blue screen after a new driver' means roll back the driver."
  ],
  "terms": [
   [
    "POST",
    "Power-on self-test, the firmware's check of essential hardware at startup."
   ],
   [
    "Beep code",
    "A pattern of beeps from the firmware that identifies a hardware problem during POST."
   ],
   [
    "BSOD",
    "Blue screen of death, a Windows stop error that halts the system and shows a stop code."
   ],
   [
    "Swollen capacitor",
    "A bulging or leaking capacitor that indicates a failing motherboard or power supply."
   ],
   [
    "CMOS battery",
    "A coin cell battery that keeps the firmware clock and settings when the PC is unplugged."
   ],
   [
    "Thermal shutdown",
    "An automatic power-off triggered when a component exceeds a safe temperature."
   ],
   [
    "POST card",
    "An expansion card that displays POST diagnostic codes on boards without built-in diagnostics."
   ]
  ],
  "example": "An office PC displays the wrong date after every weekend, and it loses its boot settings whenever the office power is turned off. The technician recognizes the pattern, replaces the coin-cell CMOS battery on the motherboard, re-enters the correct date, time and boot settings in firmware, and the PC keeps its settings from then on.",
  "tip": "Clock resets mean the CMOS battery. Shutdowns under load mean overheating or a weak PSU. Beeps mean POST errors, so look up the vendor's codes. Burning smell means unplug immediately. Swollen capacitors mean replace the board or PSU, never repair it.",
  "check": [
   [
    "A PC's date and time reset every time it is unplugged. What should you replace?",
    "The CMOS battery on the motherboard."
   ],
   [
    "A computer shuts down only during games or heavy workloads. What is a likely cause?",
    "Overheating from dust, failed fans or dried thermal paste, or an insufficient power supply."
   ],
   [
    "You smell burning from a PC. What should you do first?",
    "Power it off and unplug it immediately, then find and replace the damaged component."
   ],
   [
    "A PC beeps several times at startup and shows no display. How do you interpret the beeps?",
    "Look up the pattern in the motherboard or firmware manufacturer's documentation, since beep codes vary by vendor; they often indicate RAM or video problems."
   ]
  ]
 },
 {
  "t": "Storage problems: clicking or grinding noises, S.M.A.R.T. warnings, bootable device not found, slow performance, degraded or failed RAID",
  "body": [
   "Storage problems deserve urgent attention because the drive holds the user's data. The first rule whenever a drive shows signs of trouble is to back up the data immediately, while you still can. Only then diagnose and repair. Many storage symptoms get worse with use, so every extra hour of running a failing drive risks losing more files. Clicking or grinding noises come from HDDs (hard disk drives), which have spinning platters and moving read/write heads. A repeated click, sometimes called the click of death, usually means the heads cannot read the platters properly, and grinding can mean physical contact that is destroying the surface. These are signs of imminent mechanical failure. Stop using the drive as soon as possible, copy critical data off it, and replace it. If it has already failed and the data is irreplaceable, a professional data recovery service may help; do not open the drive yourself, because dust ruins platters. SSDs (solid-state drives) have no moving parts and do not click, though they can fail suddenly or become read-only near the end of their life.",
   "S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) is built into drives and tracks health indicators such as reallocated sectors, read errors, temperature, power-on hours and, for SSDs, wear level. When values cross a threshold, the firmware or operating system may show a warning such as 'S.M.A.R.T. status bad, back up and replace'. Tools such as CrystalDiskInfo or vendor utilities display S.M.A.R.T. data. Treat a S.M.A.R.T. warning as a prediction of failure: back up and plan replacement right away.",
   "'Bootable device not found', 'no boot device' or 'operating system not found' means the firmware could not find a drive with a working boot loader. Check the simple causes first: a USB drive or disc left in the system and set earlier in boot order, a loose or failed data or power cable, or a drive not detected in firmware setup. If the drive is detected, check boot order and whether the firmware is set to UEFI (Unified Extensible Firmware Interface) or legacy mode to match how the drive was partitioned. If the boot files are damaged, boot from Windows installation media and use startup repair or the recovery environment. A drive that does not appear in firmware at all may have failed.",
   "Slow performance can come from a nearly full drive, a failing drive retrying reads, fragmentation on an HDD, a heavy background task such as indexing or an antivirus scan, malware or simply the limits of an old HDD. Check free space, look at disk activity in Task Manager or Resource Monitor, run the drive optimization tool, which defragments HDDs and sends TRIM to SSDs, and check S.M.A.R.T. health. Upgrading from an HDD to an SSD is one of the most effective performance improvements.",
   "RAID (redundant array of independent disks) combines drives for redundancy, speed or both. When a drive fails in a redundant level such as RAID 1, 5 or 10, the array becomes degraded: it still works, but it has lost its protection, and another failure could lose everything. Replace the failed drive promptly with a compatible one and let the array rebuild, which can take hours and stresses the remaining drives. A failed array has lost more drives than it can tolerate, as with any single drive failure in RAID 0, which has no redundancy. Data must then be restored from backup. RAID is not a backup, because deletions, corruption and ransomware affect every drive in the array.",
   "Consider a worked example. A file server's management tool reports that its RAID 5 array is degraded, and one drive's light is amber. You confirm the current backup completed, identify the failed drive by its slot and serial number, hot-swap it with an identical replacement and watch the rebuild complete. You then check S.M.A.R.T. data on the remaining drives, since drives bought together often fail close together.",
   "Common mistakes: running repair tools before backing up; ignoring a S.M.A.R.T. warning because the PC still boots; opening an HDD; leaving a degraded array unrepaired; forgetting to check for a USB drive when a PC reports no boot device; and defragmenting an SSD.",
   "Exam questions use clear symptom words. 'Clicking or grinding' means a failing HDD: back up and replace. 'S.M.A.R.T. warning' means predicted failure: back up and replace. 'Bootable device not found' means check boot order, cables, detection and removable media, then boot repair. 'Degraded RAID' means replace the failed drive and rebuild. 'Slow after years of use' suggests a full or fragmented HDD, or upgrading to an SSD. Whenever data is at risk, the first step is back up."
  ],
  "terms": [
   [
    "S.M.A.R.T.",
    "Self-Monitoring, Analysis and Reporting Technology, which tracks drive health indicators and predicts failure."
   ],
   [
    "Click of death",
    "Repeated clicking from an HDD whose heads cannot read the platters, signaling imminent failure."
   ],
   [
    "Degraded RAID",
    "A redundant array that has lost a drive and still runs but without its fault tolerance."
   ],
   [
    "Rebuild",
    "The process of restoring a RAID array's redundancy onto a replacement drive."
   ],
   [
    "Boot order",
    "The firmware setting that determines which device the system tries to start from first."
   ],
   [
    "TRIM",
    "A command that tells an SSD which blocks are no longer in use so it can manage them efficiently."
   ]
  ],
  "example": "A laptop starts making a faint clicking sound and takes minutes to open files, and CrystalDiskInfo shows a caution status with a rising count of reallocated sectors. You immediately copy the user's documents to a network share, clone the drive to a new SSD, swap the drives and boot successfully. The laptop is noticeably faster, and you document the failed drive for warranty.",
  "tip": "Any sign of drive failure means back up first. Clicking means HDD mechanical failure. A S.M.A.R.T. warning predicts failure. Degraded RAID still runs but has no protection, so replace the drive quickly. RAID is not a backup.",
  "check": [
   [
    "What should you do first when a drive starts clicking or reports a S.M.A.R.T. warning?",
    "Back up the data immediately, then plan to replace the drive."
   ],
   [
    "What does a degraded RAID 5 array mean?",
    "One drive has failed and the array still works, but without redundancy; another failure could lose all data."
   ],
   [
    "A PC reports 'bootable device not found' after a user left a flash drive in it. What is the likely fix?",
    "Remove the flash drive or change the boot order so the internal drive is tried first."
   ],
   [
    "Why should you not defragment an SSD?",
    "It gains nothing from defragmentation and extra writes add wear; the optimization tool sends TRIM to SSDs instead."
   ]
  ]
 },
 {
  "t": "Video, projector and display problems: no image, dim image, dead pixels, flickering, burn-in, fuzzy image at non-native resolution, projector overheating",
  "body": [
   "Display problems are easy to notice and often easy to fix if you work methodically. The key is to separate the display device from the video source: is the monitor or projector at fault, or the computer, cable or settings feeding it? Swapping in a known-good monitor or cable, or connecting the display to a different computer, quickly tells you which side has the problem. No image is the classic call. Check the obvious first: is the monitor on and plugged in, and is its power light on? Is the video cable firmly connected at both ends? Is the monitor set to the correct input source, such as HDMI (High-Definition Multimedia Interface) or DisplayPort? If a dedicated graphics card is installed, the cable must connect to the card, not the motherboard's port. On laptops, try the function key that switches between the built-in screen and an external display. If the computer beeps and shows nothing, the problem may be the graphics card or memory rather than the monitor.",
   "A dim image usually means a backlight problem. On an LCD (liquid crystal display), the liquid crystals do not produce light; an LED backlight behind them does. If you can faintly see the image with a flashlight held close to the screen, the backlight or its power circuit has failed, or on older displays the inverter. First check brightness settings, power-saving or adaptive brightness and any ambient light sensor. OLED (organic light-emitting diode) displays have no backlight, because each pixel produces its own light.",
   "Dead pixels are pixels that never light, appearing as black dots; stuck pixels stay one color, such as bright red or green. A few may be within the manufacturer's tolerance, so check the warranty policy. Stuck pixels sometimes recover with pixel-exercising tools, but dead pixels usually do not. Flickering can be caused by a loose or damaged cable, a refresh rate the monitor does not support, an outdated video driver, a failing backlight or, on laptops, a damaged display cable in the hinge. Try another cable, set the recommended refresh rate and update the driver. Burn-in, also called image retention, is a faint ghost of a static image, such as a taskbar or logo, that remains visible. It mainly affects OLED and older plasma screens. Prevent it with screen savers, auto-hiding taskbars and turning displays off when idle.",
   "A fuzzy or blurry image often means the display is not running at its native resolution. LCD and OLED panels have a fixed number of physical pixels, and anything else must be scaled, which makes text soft. Set the operating system's resolution to the recommended native value, and use display scaling rather than a lower resolution if text looks too small. Distorted or stretched images can mean the wrong aspect ratio, and odd colors can point to a damaged cable or bent pin.",
   "Projectors add their own issues. They use a bright lamp or a laser or LED light source that produces heat, and they rely on fans and filters for cooling. Projector overheating, often shown by a temperature warning light or automatic shutdown, is usually caused by clogged air filters, blocked vents or a failed fan. Clean or replace the filter, give the projector space to breathe, and let it cool before restarting. Lamp-based projectors also have a limited lamp life; a dim image or lamp warning means it is time to replace the lamp and reset the lamp timer. Keystone correction fixes a trapezoid-shaped image caused by the projector's angle.",
   "Consider a worked example. A conference room projector shuts off after about twenty minutes of every meeting, and its temperature light is on. You find the air filter clogged with dust and the projector pushed against a wall. You clean the filter, move the projector so its vents are clear and confirm the fan runs. Meetings run without shutdowns.",
   "Common mistakes: replacing a monitor before checking the input source or cable; setting a low resolution to make text bigger instead of using scaling; confusing dead pixels with burn-in; ignoring the projector filter; and forgetting that a flashlight test separates backlight failure from a panel with no signal.",
   "Exam wording maps well to causes. 'Faint image visible with a flashlight' means backlight. 'Text blurry after changing resolution' means non-native resolution. 'Ghost of the taskbar remains' means burn-in. 'Single black dot' means dead pixel. 'Flicker' means cable, refresh rate or driver. 'Projector shuts down, temperature light' means clean the filter and improve ventilation. 'No image' means power, input source and cable first."
  ],
  "terms": [
   [
    "Native resolution",
    "The number of physical pixels in a display panel, which gives the sharpest image."
   ],
   [
    "Backlight",
    "The light source behind an LCD panel that makes the image visible."
   ],
   [
    "Dead pixel",
    "A pixel that never lights, appearing as a permanent black dot."
   ],
   [
    "Stuck pixel",
    "A pixel that remains one color regardless of the image displayed."
   ],
   [
    "Burn-in",
    "A lasting ghost of a static image on a display, mainly OLED and plasma."
   ],
   [
    "Keystone correction",
    "A projector adjustment that corrects a trapezoid-shaped image caused by projecting at an angle."
   ],
   [
    "Input source",
    "The display setting that selects which connector, such as HDMI or DisplayPort, supplies the image."
   ]
  ],
  "example": "A user's new monitor shows soft, slightly blurry text. You open Display settings and find the resolution set lower than the panel's native value because an old setting carried over. You select the recommended native resolution, then set scaling to 125 percent so text is still comfortable to read. The text is sharp and the user is satisfied.",
  "tip": "Dim image seen with a flashlight means backlight failure. Blurry text means non-native resolution. A ghost image means burn-in. Projector overheating means filters and ventilation. For no image, check power, input source and cable before replacing hardware.",
  "check": [
   [
    "A laptop screen is very dark, but you can faintly see the desktop when shining a flashlight on it. What has failed?",
    "The backlight or its power circuit."
   ],
   [
    "Why does text look fuzzy when a monitor is set below its native resolution?",
    "The panel has a fixed number of pixels, so the image must be scaled, which softens edges."
   ],
   [
    "A projector shuts off during meetings and shows a temperature warning. What should you check?",
    "The air filter, vents and fan; clean or replace the filter and make sure airflow is not blocked."
   ],
   [
    "After adding a graphics card, the monitor shows 'no signal'. What are the first two things to check?",
    "That the monitor cable is connected to the graphics card rather than the motherboard, and that the monitor's input source is correct."
   ]
  ]
 },
 {
  "t": "Mobile device problems: poor battery life, swollen battery, overheating, slow charging, broken screen, cursor drift, liquid damage, no connectivity",
  "body": [
   "Mobile devices such as phones, tablets and laptops pack batteries, radios and screens into small, sealed cases, so their problems often involve power, heat and physical damage. Some issues can be fixed with settings; others, such as a swollen battery, are safety hazards that need immediate care. Follow the troubleshooting methodology, back up data when possible and check warranty and repair options before opening a sealed device. Poor battery life has many causes. Lithium-ion batteries wear out and hold less charge after many charge cycles, and the device's battery health or battery report shows how much capacity remains. Software also drains batteries: high screen brightness, apps running in the background, constant location services, weak cellular signal causing the radio to search, and malware. Check battery usage by app in settings, lower brightness, enable battery saver, update the operating system and apps, and remove unneeded apps. If capacity is badly degraded, replace the battery.",
   "A swollen battery is dangerous. Signs include a bulging case, a screen lifting away from the frame, a trackpad that no longer clicks or a device that rocks on a flat surface. Stop using and charging the device immediately, do not puncture or press on the battery, and have it replaced by a qualified technician. Dispose of it through a proper battery recycling program, never in regular trash. Overheating can come from heavy apps or games, charging while in use, direct sunlight, a thick case trapping heat, blocked laptop vents, malware or a failing battery. Close heavy apps, remove the case while charging, keep the device out of heat and clean laptop vents. Devices may shut down or throttle performance to protect themselves.",
   "Slow charging often comes from the accessories. Try a known-good cable and charger rated for the device; cheap or damaged cables and low-output USB ports charge slowly. Clean lint from the charging port carefully with a non-metallic tool. Using the device heavily while charging, high temperatures and battery wear also slow charging. Fast charging requires a charger and cable that both support the same fast-charging standard as the device.",
   "A broken screen may still work under the cracks, but damaged glass can cut users, let in moisture and worsen. Back up data and arrange a screen replacement; many devices need the whole display assembly replaced. If the touchscreen does not respond correctly, clean it, remove a poor screen protector, restart and check for updates before assuming hardware failure. Cursor drift, where the pointer moves by itself, is common on laptops with touchpads: check for a palm resting on the touchpad, clean it, adjust sensitivity, update drivers, disable the touchpad when using an external mouse, and suspect a swollen battery pushing up against the touchpad from underneath.",
   "Liquid damage requires fast action: power off, do not charge, remove the case and any removable battery or cards, and let the device dry thoroughly. Putting it in rice is not reliable. Corrosion can cause failures days later, and many devices have liquid contact indicators that change color and may affect warranty. No connectivity can mean airplane mode is on, Wi-Fi or Bluetooth is off, the device is out of range, the SIM card or eSIM profile has a problem or a setting is wrong. Toggle airplane mode, forget and rejoin the Wi-Fi network, restart the device, check the SIM and update the carrier settings. A reset of network settings clears stubborn configuration problems.",
   "Consider a worked example. A user reports that her laptop's touchpad no longer clicks and the pointer drifts on its own, and the laptop wobbles on the desk. You recognize the signs of a swollen battery pressing on the touchpad from below. You shut it down, unplug it, back up her data from another machine where possible, and send it for battery replacement.",
   "Common mistakes: recharging a swollen device; blaming the battery for drain caused by a rogue app; replacing a charging port before trying another cable; charging a wet device; and forgetting to check airplane mode.",
   "Exam questions pair symptoms with likely causes. 'Bulging case, screen lifting' means swollen battery: stop using it. 'Drains fast after an app install' means check battery usage by app. 'Charges slowly' means cable, charger or port. 'Pointer moves on its own' means cursor drift: touchpad settings, drivers or a swollen battery. 'Dropped in water' means power off and dry, do not charge. 'No bars or Wi-Fi' means airplane mode, radios or SIM."
  ],
  "terms": [
   [
    "Charge cycle",
    "One full discharge and recharge of a battery's capacity, which gradually reduces battery health."
   ],
   [
    "Swollen battery",
    "A lithium-ion battery that has expanded due to gas buildup, creating a fire and safety hazard."
   ],
   [
    "Cursor drift",
    "A pointer that moves on the screen without user input, often from touchpad issues."
   ],
   [
    "Liquid contact indicator",
    "A small sticker inside a device that changes color when exposed to liquid."
   ],
   [
    "Airplane mode",
    "A setting that turns off the device's wireless radios."
   ],
   [
    "Battery saver",
    "A mode that reduces background activity and performance to extend battery life."
   ]
  ],
  "example": "A salesperson's phone battery suddenly lasts only half a day. You open the battery usage screen and see that a newly installed navigation app has been using location in the background all day. After changing its location permission to 'while using the app' and enabling battery saver, the battery lasts a full day again, so no hardware replacement is needed.",
  "tip": "A swollen battery means stop using and charging immediately and have it replaced. Check software before hardware: app battery usage, airplane mode and settings. For slow charging, try a known-good cable and charger first. Never charge a wet device.",
  "check": [
   [
    "What should you do if a laptop battery is swollen?",
    "Stop using and charging the device, avoid pressing or puncturing the battery, have it replaced and recycle it properly."
   ],
   [
    "A phone charges very slowly with its current cable. What should you try first?",
    "A known-good cable and a charger rated for the device, and check the charging port for lint."
   ],
   [
    "A laptop pointer moves on its own. Name two possible causes.",
    "A palm touching the touchpad or oversensitive settings, a driver problem, or a swollen battery pushing up on the touchpad."
   ],
   [
    "A phone was dropped in water. What should the user do immediately?",
    "Power it off, do not charge it, remove the case, SIM tray and any removable battery, and let it dry thoroughly."
   ]
  ]
 },
 {
  "t": "Printer problems: faded or streaked prints, ghost images, toner not fused, paper jams, garbled print, stuck print queue, incorrect paper settings",
  "body": [
   "Printer problems are frequent, but most have a small set of common causes. The trick is to match the symptom on the page to the part of the printing process that produced it. Knowing the laser imaging process of processing, charging, exposing, developing, transferring, fusing and cleaning helps you work out which component to check, and many symptoms apply to inkjets with their own causes. Faded prints on a laser printer usually mean low toner, toner density set too light or an economy or draft mode enabled; on an inkjet, low ink or clogged nozzles. Vertical streaks or lines on a laser printer often come from a scratched or dirty imaging drum, a dirty charge roller or debris in the paper path. A streak that repeats at regular intervals points to a roller, and the distance between marks can identify which roller. On an inkjet, streaks or missing colors are fixed by running the head cleaning routine, then print head alignment. Blank pages on a laser printer can mean the protective seal was left on a new toner cartridge.",
   "Ghost images are faint copies of earlier parts of the page appearing further down. They usually indicate a problem with the imaging drum's cleaning or discharge stage, where the drum is not fully cleared between rotations, or a worn drum. Replacing the drum or toner cartridge, if they are combined, usually fixes it; a failing fuser can also cause ghosting.",
   "Toner not fused means toner smears or rubs off the page because the fuser did not melt it into the paper. The fuser assembly may be failing or not reaching temperature, or the paper type setting may be wrong, such as heavy paper printed with a plain-paper setting. Check the paper type setting first, then replace the fuser, often as part of a maintenance kit. Let the fuser cool before touching it.",
   "Paper jams have mechanical and paper-related causes. Remove jammed paper carefully in the direction of the paper path, and check for torn scraps left inside. Common causes are worn or dirty pickup and separation rollers, damp or curled paper, overfilled trays, the wrong paper weight and misaligned tray guides. If the printer grabs several sheets at once, the separation pad or roller is worn. Keep paper dry, fan the stack before loading and replace rollers with a maintenance kit. Incorrect paper settings cause problems when the paper size or type configured for a tray does not match what is loaded or what the job requests; the printer may pause, prompt for paper or print on the wrong size. Update the tray settings in the printer's menu or driver.",
   "Garbled print, pages of random characters or symbols, usually means the wrong or a corrupted print driver, often a driver for a different model or printer language. Install the correct driver and clear the queue. A loose cable or a large corrupted job can also cause it. A stuck print queue means jobs sit waiting and nothing prints, or one failed job blocks the rest. Clear the queue from Printers and scanners; if that does not work, restart the Print Spooler service from Services or with `net stop spooler` and `net start spooler`. Deleting stuck job files from the spooler folder while the service is stopped may be needed.",
   "Consider a worked example. Users complain that printouts from a laser printer smear when touched and the toner comes off on their hands. You check the tray settings and see heavy card stock was printed with the plain paper setting. After correcting the paper type, prints from that tray are fine, but pages from the main tray still smudge and the page count is past the maintenance interval, so you install the maintenance kit's new fuser.",
   "Common mistakes: replacing a toner cartridge for smudging, which is a fuser issue; forgetting the toner seal; reinstalling hardware for garbled output that a driver fixes; and deleting spool files without stopping the spooler.",
   "Exam questions pair symptoms with components. 'Smears or rubs off' means fuser or paper type. 'Repeating marks down the page' means drum or roller. 'Faint copy of earlier text' means ghosting and the drum. 'Random symbols' means driver. 'Jobs stuck, nothing prints' means restart the Print Spooler. 'Multiple sheets fed' means worn separation pad. 'Faded' means toner or density. 'Printer asks for different paper' means tray settings."
  ],
  "terms": [
   [
    "Fuser",
    "The laser printer component that melts toner into paper with heat and pressure."
   ],
   [
    "Ghosting",
    "Faint repeated images on a page, usually from incomplete drum cleaning or a worn drum."
   ],
   [
    "Print Spooler",
    "The Windows service that queues print jobs and sends them to the printer."
   ],
   [
    "Pickup roller",
    "The roller that grabs paper from the tray and feeds it into the printer."
   ],
   [
    "Separation pad",
    "A part that ensures only one sheet feeds at a time, preventing multiple-sheet jams."
   ],
   [
    "Toner density",
    "A setting that controls how much toner is applied, affecting how dark prints appear."
   ]
  ],
  "example": "An office printer stops printing, and the queue shows a dozen documents waiting with one marked as error. Cancelling does nothing. The technician opens Services, stops the Print Spooler, deletes the stuck files from the spooler folder, starts the service again and resends the documents. Everything prints, and she notes the failed document that started the blockage.",
  "tip": "Smudging or toner rubbing off means the fuser or paper type setting. Garbled output means the driver. Repeating marks mean the drum or a roller. A stuck queue means restart the Print Spooler. Multiple sheets feeding means a worn separation pad.",
  "check": [
   [
    "Toner rubs off printed pages. Which component or setting should you check?",
    "The fuser assembly, and the paper type setting, since the toner is not being melted into the paper."
   ],
   [
    "A printer outputs pages of random symbols. What is the most likely cause?",
    "An incorrect or corrupted print driver."
   ],
   [
    "How do you fix a print queue that will not clear?",
    "Stop the Print Spooler service, delete the stuck job files if needed, then start the service again."
   ],
   [
    "A laser printer prints marks that repeat at the same interval down each page. What does that suggest?",
    "A defect on a rotating component such as the drum or a roller, which the distance between marks can help identify."
   ]
  ]
 },
 {
  "t": "Wired and wireless network problems: intermittent or no connectivity, APIPA address, IP conflicts, slow speeds, high latency and jitter, interference, SSID not found, port flapping",
  "body": [
   "Network problems are among the most common help desk calls. A structured approach, starting at the physical layer and working upward, saves a lot of time: check cables, lights and wireless signal first, then IP configuration, then name resolution and services. Commands such as `ipconfig`, `ping`, `tracert` and `nslookup` help at each stage.",
   "No connectivity means the device cannot reach the network at all. For wired connections, check that the cable is plugged in at both ends, the link lights on the NIC (network interface card) and switch port are lit, and the cable is not damaged. Try a known-good cable and another port. For wireless, check that Wi-Fi is enabled, airplane mode is off and the device is connected to the correct network. Intermittent connectivity, working then dropping, can come from a loose cable, a failing NIC or port, weak wireless signal, interference, power-saving settings that turn off the adapter, or an IP conflict.",
   "An APIPA (Automatic Private IP Addressing) address in the range 169.254.x.x means the computer is set to obtain an address automatically but could not reach a DHCP (Dynamic Host Configuration Protocol) server, so it assigned itself one. With APIPA you can talk only to other APIPA devices on the same segment, not to the router or internet. Check the physical connection, confirm the DHCP server is running and has free addresses, check the switch port's VLAN (virtual local area network) assignment, then run `ipconfig /release` and `ipconfig /renew`. An IP conflict occurs when two devices use the same IP address, usually because someone set a static address inside the DHCP pool. Windows warns about the conflict and one or both devices lose connectivity. Assign static addresses outside the DHCP range or use DHCP reservations.",
   "Slow speeds can have many causes: a duplex mismatch or a link that negotiated a lower speed, a damaged cable, too many users on a busy wireless network, weak signal, interference, bandwidth-heavy applications, malware or an ISP (internet service provider) problem. Check the adapter's link speed, try a wired connection to compare, run a speed test and look for heavy traffic. Latency is the delay for data to travel to its destination and back, measured in milliseconds with `ping`. Jitter is variation in that latency. High latency and jitter harm real-time services such as VoIP (voice over IP) and video calls, causing choppy audio and frozen video. QoS (quality of service) settings that prioritize voice traffic help.",
   "Wireless interference comes from other Wi-Fi networks on the same or overlapping channels, microwave ovens, cordless phones, Bluetooth devices and physical barriers such as metal, concrete and water. The 2.4 GHz band has only three non-overlapping channels, 1, 6 and 11, and is crowded, while the 5 GHz and 6 GHz bands offer more channels and less congestion but shorter range. Use a Wi-Fi analyzer to find a clear channel, move the access point, or add access points. SSID (service set identifier) not found means the network name is not visible: the device is out of range, the access point is down, the SSID broadcast is disabled so it must be entered manually, or the device does not support the band or security standard the network uses. Port flapping is a switch port repeatedly going up and down, usually from a bad cable, a failing NIC, a duplex mismatch or a loose connection; the switch log shows it.",
   "Consider a worked example. A user reports no internet, and `ipconfig` shows 169.254.23.10. Other users on the same switch are fine. You check the cable, then notice the patch cable at the wall jack is loose. After reseating it and running `ipconfig /renew`, the PC receives a proper address from DHCP and browsing works.",
   "Common mistakes: rebooting the router for one user's APIPA problem before checking that user's cable; setting static addresses inside the DHCP pool; placing every access point on the same 2.4 GHz channel; blaming the ISP for slow Wi-Fi without testing wired speed; and forgetting that a hidden SSID must be entered manually.",
   "Exam questions translate symptoms into causes. '169.254 address' means DHCP not reached: APIPA. 'Duplicate IP address warning' means IP conflict. 'Choppy calls, variable delay' means jitter. 'Wi-Fi drops when the microwave runs' means 2.4 GHz interference. 'Network name not visible' means SSID not found: range, broadcast or band. 'Switch log shows the port going up and down' means port flapping: cable or NIC. 'Slow only on wireless' means signal, congestion or interference."
  ],
  "terms": [
   [
    "APIPA",
    "Automatic Private IP Addressing, a self-assigned 169.254.x.x address used when DHCP cannot be reached."
   ],
   [
    "IP conflict",
    "Two devices on the same network using the same IP address, disrupting connectivity."
   ],
   [
    "Latency",
    "The time it takes data to travel to a destination and back, measured in milliseconds."
   ],
   [
    "Jitter",
    "Variation in latency that disrupts real-time services such as voice and video calls."
   ],
   [
    "SSID",
    "Service set identifier, the name of a wireless network."
   ],
   [
    "Port flapping",
    "A switch port rapidly and repeatedly changing between up and down states."
   ],
   [
    "Interference",
    "Radio noise from other devices or networks that degrades wireless performance."
   ]
  ],
  "example": "Staff in one office complain that Wi-Fi calls become choppy every afternoon. A Wi-Fi analyzer shows the office access point on a 2.4 GHz channel shared with several neighboring networks, and the break room microwave is next to the wall. The technician moves most clients to the 5 GHz band, sets the 2.4 GHz radio to a less crowded non-overlapping channel and enables QoS for voice traffic, and call quality improves.",
  "tip": "169.254.x.x means DHCP was not reached. Duplicate address warnings mean an IP conflict; keep statics outside the DHCP pool. Jitter hurts voice and video. For wireless trouble, think range, channel, band and interference. Port flapping points to cables or NICs.",
  "check": [
   [
    "A computer shows an IP address of 169.254.10.20. What does this indicate?",
    "APIPA: the computer could not reach a DHCP server and assigned itself an address, so it cannot reach other networks."
   ],
   [
    "How can you prevent IP address conflicts on a network?",
    "Assign static addresses outside the DHCP scope, or use DHCP reservations for devices that need fixed addresses."
   ],
   [
    "Which network problem most affects VoIP call quality?",
    "High latency and jitter, which cause delayed, choppy or dropped audio."
   ],
   [
    "A laptop cannot see the office Wi-Fi network in its list, but others can. What are possible causes?",
    "It is out of range, the SSID is hidden and must be entered manually, or the laptop does not support the band or security standard used."
   ]
  ]
 },
 {
  "t": "Diagnostic tools: Windows Memory Diagnostic, CrystalDiskInfo, Event Viewer, Device Manager, ping, ipconfig, tracert, nslookup, cable tester and multimeter",
  "body": [
   "Good troubleshooting depends on choosing the right tool to confirm or rule out a theory. The A+ exam expects you to know what each common diagnostic tool does and when to use it, so that you gather evidence rather than guessing and replacing parts. Think of the tools in three groups: those for hardware inside the PC, those for the operating system and devices, and those for the network and cabling.",
   "Windows Memory Diagnostic tests RAM (random access memory) for errors. Run it by searching for it in the Start menu or running `mdsched.exe`; it restarts the computer, tests memory before Windows loads and shows the results after you sign in, also recording them in Event Viewer. Use it when you see random crashes, blue screens or corrupted files that might point to faulty memory. If errors appear, test modules one at a time to find the bad stick. CrystalDiskInfo is a free third-party utility that reads a drive's S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) data, showing a health status of good, caution or bad, along with temperature, power-on hours and attributes such as reallocated sectors. Use it when a drive is slow, noisy or suspected of failing, and back up immediately if it shows caution or bad.",
   "Event Viewer (`eventvwr.msc`) shows the logs Windows keeps about system, security and application events. The System log records hardware and driver errors, unexpected shutdowns and service failures; the Application log records program crashes; the Security log records sign-ins and audit events. Look for Error and Critical entries around the time the problem occurred. Device Manager (`devmgmt.msc`) lists every hardware device. A yellow warning triangle indicates a problem, often a missing or bad driver, and a down arrow means the device is disabled. From Device Manager you can update, roll back, disable or uninstall drivers and scan for hardware changes.",
   "The command-line network tools each answer a different question. `ipconfig` shows the IP address, subnet mask, default gateway and, with `/all`, DNS (Domain Name System) servers, DHCP details and the MAC address. `ipconfig /release` and `/renew` request a new DHCP lease, and `ipconfig /flushdns` clears the DNS cache. `ping` tests whether a host responds and measures round-trip time; start by pinging your own gateway, then an external address. `tracert` shows each router hop on the path to a destination, revealing where delays or failures occur. `nslookup` queries DNS to see whether a name resolves to an IP address. If `ping` to an IP address works but to a name fails, suspect DNS.",
   "Physical tools test hardware directly. A cable tester checks network cables for continuity, open wires, shorts, crossed or split pairs and correct wiring order, and some models measure cable length or trace a cable through a building. Use one when a wired connection fails and the cable is suspect. A multimeter measures voltage, resistance and continuity. Technicians use it to check a power supply's output voltages, confirm an outlet provides power or test a cable or fuse for continuity. Use the correct setting and probes carefully, and never open a power supply to test inside it.",
   "Consider a worked example. A user cannot reach an internal website by name. `ipconfig` shows a valid address and gateway, and `ping` to the gateway succeeds. `ping` to the web server's IP address succeeds, but `ping` using its name fails. `nslookup` shows the name does not resolve with the configured DNS server. You find the PC has a manually entered, outdated DNS server, set DNS back to automatic, run `ipconfig /flushdns` and the site loads.",
   "Common mistakes: using `tracert` when a simple `ping` to the gateway would isolate the fault; forgetting that some hosts block ping, so no reply is not always a failure; ignoring Event Viewer; and using a multimeter to test a network cable's wiring order, which is the cable tester's job.",
   "Exam questions describe the need and expect the tool. 'Random crashes, suspect RAM' means Windows Memory Diagnostic. 'Check drive health' means CrystalDiskInfo or S.M.A.R.T. 'Why did the PC restart overnight' means Event Viewer. 'Yellow triangle on a device' means Device Manager. 'What IP address do I have' means `ipconfig`. 'Is the host reachable' means `ping`. 'Where does the path fail' means `tracert`. 'Does the name resolve' means `nslookup`. 'Is the cable wired correctly' means a cable tester. 'Is the PSU giving 12 volts' means a multimeter."
  ],
  "terms": [
   [
    "Windows Memory Diagnostic",
    "A built-in Windows tool that tests RAM for errors during a restart."
   ],
   [
    "CrystalDiskInfo",
    "A third-party utility that displays a drive's S.M.A.R.T. health data."
   ],
   [
    "Event Viewer",
    "A Windows tool that displays system, application and security logs."
   ],
   [
    "Device Manager",
    "A Windows tool that lists hardware devices and manages their drivers."
   ],
   [
    "tracert",
    "A command that shows each router hop on the path to a destination."
   ],
   [
    "nslookup",
    "A command that queries DNS to check how names resolve to IP addresses."
   ],
   [
    "Cable tester",
    "A device that checks network cables for continuity, shorts and correct wiring."
   ],
   [
    "Multimeter",
    "An instrument that measures voltage, resistance and continuity."
   ]
  ],
  "example": "A user's desktop keeps restarting overnight. The technician opens Event Viewer and finds Kernel-Power critical errors and a memory-related stop code at each restart. She runs Windows Memory Diagnostic, which reports hardware problems, tests each module separately, finds the faulty stick and replaces it. She checks Event Viewer the next day to confirm no further unexpected restarts.",
  "tip": "Match the tool to the question: RAM means Windows Memory Diagnostic, drive health means CrystalDiskInfo, logs mean Event Viewer, drivers mean Device Manager, IP settings mean ipconfig, reachability means ping, path means tracert, names mean nslookup, cable wiring means cable tester, voltage means multimeter.",
  "check": [
   [
    "Which tool would you use to find out why a PC restarted unexpectedly overnight?",
    "Event Viewer, checking the System log for errors such as Kernel-Power events."
   ],
   [
    "A website loads by IP address but not by name. Which command confirms the likely cause?",
    "`nslookup`, to check whether the name resolves; the problem is likely DNS."
   ],
   [
    "What does a yellow triangle next to a device in Device Manager indicate?",
    "The device has a problem, often a missing, incorrect or corrupted driver."
   ],
   [
    "What is the difference between a cable tester and a multimeter?",
    "A cable tester checks network cable wiring, continuity and faults; a multimeter measures voltage, resistance and continuity for power and electrical testing."
   ]
  ]
 }
], { reviewed: "2026-09-30" });
