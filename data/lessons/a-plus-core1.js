/* Lessons for CompTIA A+ Core 1 (220-1201): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("a-plus-core1", [
 {
  "t": "Laptop hardware replacement: battery, keyboard, RAM (SODIMM vs soldered), storage (2.5-inch, M.2 SATA vs NVMe), wireless cards and antennas",
  "body": [
   "Laptops pack a whole PC into a thin case, so most parts are smaller, more integrated and harder to reach than in a desktop. As a technician you are expected to know which parts are usually field-replaceable, how to get to them safely and which ones are not worth replacing at all. Before opening any laptop, shut it down, unplug the AC adapter, disconnect or disable the internal battery if the service manual says to, and use an ESD (electrostatic discharge) strap or mat. Always find the manufacturer's service manual first; it shows the screw locations, the order of disassembly and any hidden clips.",
   "Batteries on older laptops slid out from the outside. Most modern laptops use an internal lithium-ion or lithium-polymer battery held in with screws or adhesive. Replace a battery only with the exact model the vendor specifies, and never puncture, bend or pry against a swollen battery. Keyboards vary widely: some come out from the top after releasing a few clips and a ribbon cable, while others are riveted to the palm-rest assembly, so the whole top case is replaced as one part. Ribbon (flex) cables use small ZIF (zero insertion force) connectors with a latch that you flip up before pulling the cable.",
   "Laptop memory uses the SODIMM (small outline dual inline memory module) form factor, which is roughly half the length of a desktop DIMM. You install it at an angle, press it down until the side clips snap in, and it must match the generation the board supports, such as DDR4 or DDR5, because the notches differ. Many thin laptops have some or all RAM soldered to the motherboard. Soldered RAM cannot be upgraded; if it fails, the fix is a motherboard replacement. Check the specifications before promising a customer an upgrade.",
   "Storage comes in two main shapes. A 2.5-inch drive is either a spinning hard disk or a SATA SSD (solid-state drive) and connects through a SATA connector or adapter. M.2 is a small card form factor held by one screw. An M.2 card can speak either SATA or NVMe (Non-Volatile Memory Express). NVMe runs over PCIe lanes and is much faster than SATA, but the slot must support it. M.2 SATA drives usually have a B+M key (two notches), while NVMe drives usually have a single M key notch. A drive that physically fits is not guaranteed to work, so check which protocol the slot supports.",
   "Wi-Fi and Bluetooth usually live on one small M.2 wireless card. The card has tiny antenna connectors that snap onto thin coaxial cables. Those antenna leads are routed up through the hinge and around the display bezel, because the lid is the highest point and gives the best reception. If a laptop has weak Wi-Fi after a screen repair, suspect a pinched or unplugged antenna lead. When replacing the card, note which lead goes to which connector (often labeled main and aux) before removing them."
  ],
  "terms": [
   [
    "SODIMM",
    "Small outline dual inline memory module, the short RAM stick used in laptops and small form factor PCs."
   ],
   [
    "M.2",
    "A compact expansion card form factor used for SSDs and wireless cards; it can carry SATA or PCIe/NVMe signals depending on the slot."
   ],
   [
    "NVMe",
    "Non-Volatile Memory Express, a storage protocol that runs over PCIe and is much faster than SATA."
   ],
   [
    "Soldered RAM",
    "Memory chips attached directly to the motherboard; they cannot be removed or upgraded."
   ],
   [
    "ZIF connector",
    "Zero insertion force connector with a small latch, used for laptop ribbon cables."
   ]
  ],
  "example": "A user wants more speed from a three-year-old laptop. You check the service manual and find 8 GB of soldered RAM plus one empty SODIMM slot, and an M.2 slot that supports NVMe. You add a matching DDR4 SODIMM and clone the old SATA drive to an NVMe SSD, giving the customer a large improvement for a small cost.",
  "tip": "Exam questions like to test that a drive or module can fit but not work: an M.2 SATA drive in an NVMe-only slot, or DDR5 in a DDR4 board. Also remember that soldered RAM means no upgrade path.",
  "check": [
   [
    "A customer's thin laptop has weak Wi-Fi only after the display was replaced. What is the most likely cause?",
    "An antenna lead was pinched or not reconnected, because Wi-Fi antennas run through the hinge and display bezel."
   ],
   [
    "Why might an M.2 SSD fit in a slot but not be detected?",
    "The slot may support only SATA or only NVMe; the keying lets some drives fit physically even when the protocol is not supported."
   ],
   [
    "What must you do before upgrading laptop RAM?",
    "Confirm how much RAM is soldered, whether a SODIMM slot exists and which DDR generation and capacity the board supports."
   ]
  ]
 },
 {
  "t": "Screen parts: LCD vs OLED panels, backlight, digitizer/touch layer, webcam and microphone placement in the bezel",
  "body": [
   "A laptop or phone display is a stack of layers, and knowing the stack tells you which part to replace when something goes wrong. At the back is the panel that creates the image. On top of it may sit a touch layer called the digitizer, and on top of that a protective cover glass. Around the edge is the bezel, the frame that also houses the webcam, microphones and Wi-Fi antennas.",
   "An LCD (liquid crystal display) does not make its own light. Liquid crystals act like shutters that block or pass light, and color filters create red, green and blue subpixels. Light comes from a backlight behind the panel. Modern LCDs use LED backlights; older laptops used a CCFL (cold cathode fluorescent lamp) backlight that needed an inverter board to supply high voltage. If a screen shows a very dim image that you can see with a flashlight held against it, the panel is working and the backlight or its power is the problem.",
   "An OLED (organic light-emitting diode) panel has no backlight. Each pixel produces its own light and can switch fully off, so OLED gives true blacks, high contrast and thinner, lighter screens. The trade-offs are cost and the risk of burn-in, where a static image such as a taskbar leaves a faint permanent ghost after long use. Because OLED has no backlight, a dim OLED screen points to a brightness setting, power issue or panel fault rather than a failed lamp.",
   "The digitizer converts touch into coordinates. Most phones and tablets use capacitive touch, which senses the electrical charge of a finger. On many devices the digitizer is bonded to the cover glass, and on some it is laminated to the display itself, so a cracked screen may mean replacing the whole assembly. The classic symptom split is useful: if the image looks fine but touch does not respond in one area, suspect the digitizer; if touch works but the image is broken, suspect the panel.",
   "The webcam and microphones sit in the top bezel so they face the user, and the antenna leads run beside them. The camera usually connects through a small cable that shares the display cable bundle passing through the hinge. That hinge path is a common failure point: repeated opening and closing can wear the cable, producing a flickering screen, a camera that disappears from Device Manager or a microphone that cuts out when the lid moves. When you replace a display, be careful to reseat the camera and antenna connections and not to pinch any wires in the bezel."
  ],
  "terms": [
   [
    "Backlight",
    "The light source behind an LCD panel; modern ones are LED, older ones were CCFL with an inverter."
   ],
   [
    "Digitizer",
    "The touch-sensitive layer that converts finger or pen contact into position data."
   ],
   [
    "OLED",
    "Organic light-emitting diode display in which each pixel makes its own light, so no backlight is needed."
   ],
   [
    "Inverter",
    "A board that supplied high-voltage AC to a CCFL backlight on older laptops."
   ],
   [
    "Bezel",
    "The frame around a display that also holds the webcam, microphones and wireless antennas."
   ]
  ],
  "example": "A laptop screen appears black, but when you shine a flashlight at an angle you can faintly see the desktop. That tells you the LCD panel is drawing the image and the backlight is not lit, so you check the brightness keys, then the display cable and backlight circuit rather than ordering a new panel first.",
  "tip": "Dim image visible with a flashlight means backlight (or inverter on CCFL models). OLED has no backlight, so that diagnosis does not apply to it. Touch problems with a good image point to the digitizer.",
  "check": [
   [
    "Why can an OLED display show true black while an LCD usually cannot?",
    "OLED pixels emit their own light and can switch fully off, while an LCD relies on a backlight that leaks some light through the crystals."
   ],
   [
    "A tablet shows a perfect image, but taps in the lower third do nothing. Which component is most likely faulty?",
    "The digitizer or touch layer, because the display panel is producing the image correctly."
   ],
   [
    "Why are webcams and Wi-Fi antennas placed in the display bezel?",
    "The bezel faces the user for the camera and microphone, and the lid is the highest point of the laptop, which gives the antennas the best reception."
   ]
  ]
 },
 {
  "t": "Physical privacy and security: biometrics, privacy screens, NFC-based security",
  "body": [
   "Mobile devices go everywhere their users go, which makes them easy to lose, easy to shoulder-surf and easy to steal. Physical privacy and security controls protect the device and the data on it at the point where a person physically interacts with it. The A+ exam expects you to know the common controls, what threat each addresses and how to recommend them.",
   "Biometrics authenticate you by something you are rather than something you know. Common laptop and phone options are fingerprint readers, often built into the power button or a key, and facial recognition, which on Windows is part of Windows Hello and usually uses an infrared camera so it can tell a real face from a photo. Biometrics are convenient and hard to share, but they are not perfect. Devices always keep a PIN or password as a fallback, and the biometric template is normally stored locally in protected hardware rather than as a picture. When enrolling a user, register more than one finger in case of a cut or bandage.",
   "A privacy screen, also called a privacy filter, is a thin film or clip-on panel that narrows the viewing angle. The user looking straight at the display sees normally, while someone to the side sees a dark or blank screen. Some laptops have a built-in electronic privacy mode that does the same thing at the press of a key. Privacy screens defend against shoulder surfing, where someone reads sensitive information over your shoulder in an airport, coffee shop or open office. Pair them with a short screen lock timeout so an unattended device locks itself.",
   "NFC (near-field communication) is a very short-range radio, typically working within a few centimeters. Because you must hold the devices almost touching, it is well suited to deliberate actions. In security it shows up as tap-to-pay with a phone, smart badges and cards that unlock doors or sign in to a PC when tapped on a reader, and hardware security keys that support NFC for multifactor authentication. The short range reduces the chance of casual eavesdropping, but it is not a guarantee; lost NFC badges should be revoked promptly, and phones can require the screen to be unlocked before a payment is allowed.",
   "Other physical controls round out the picture. A cable lock anchors a laptop to a desk through a security slot. Webcam covers or shutters block the camera when not in use. Full-disk encryption protects data if the device is stolen, and remote wipe through mobile device management lets you erase a lost device. Together these form layers: biometrics and PINs stop casual access, privacy screens stop viewing, locks stop theft and encryption protects the data if the other layers fail."
  ],
  "terms": [
   [
    "Biometrics",
    "Authentication based on a physical characteristic such as a fingerprint or face."
   ],
   [
    "Privacy screen",
    "A filter that narrows a display's viewing angle so only the person directly in front can read it."
   ],
   [
    "Shoulder surfing",
    "Observing someone's screen or keypad to steal information such as passwords."
   ],
   [
    "NFC",
    "Near-field communication, a very short-range wireless technology used for tap-to-pay, badges and security keys."
   ]
  ],
  "example": "A sales team works from airports and trains and handles customer pricing. You fit their laptops with privacy filters, enable fingerprint sign-in with a PIN fallback, set a two-minute screen lock and issue NFC-capable security keys for multifactor sign-in, covering viewing, casual access and credential theft.",
  "tip": "Match the control to the threat: shoulder surfing means privacy screen; stolen laptop on a desk means cable lock; lost device data means encryption plus remote wipe; convenient strong sign-in means biometrics with a PIN fallback.",
  "check": [
   [
    "Which control best stops a stranger in a coffee shop from reading a user's screen?",
    "A privacy screen or filter, which narrows the viewing angle, combined with a short screen lock timeout."
   ],
   [
    "Why is NFC a good fit for badge and payment security?",
    "Its range is only a few centimeters, so the user must deliberately tap, which limits accidental or distant connections."
   ],
   [
    "Why do devices with biometrics still require a PIN or password?",
    "As a fallback when the biometric fails or cannot be read, and for sensitive actions such as changing security settings."
   ]
  ]
 },
 {
  "t": "Mobile ports and accessories: USB-C, Lightning, micro-USB, docking stations and port replicators",
  "body": [
   "Mobile devices have few physical ports, so knowing the connectors, what they can carry and how to extend them is a core technician skill. On the exam you will be shown a connector or described one and asked to identify it or pick the right accessory.",
   "USB-C is the small, oval, reversible connector that now dominates laptops, tablets and phones. Because it is reversible, it plugs in either way up. The connector shape is separate from what travels over it: a USB-C port may carry USB data at various speeds, USB Power Delivery for charging, DisplayPort video through alternate mode or Thunderbolt on supported systems. That is why two USB-C ports on the same laptop can behave differently, so look for icons beside the port and check the specifications. Cables matter too; a cheap charge-only cable may not carry data or video at all.",
   "Lightning is Apple's proprietary 8-pin reversible connector, used on iPhones and some iPads and accessories for many years. Newer Apple devices have moved to USB-C, so you will see both in the field. Micro-USB is the older, small, trapezoid-shaped connector used on many earlier Android phones and small gadgets. It is not reversible, which makes it easy to damage by forcing it in upside down, and it offers slower charging and data than USB-C. Mini-USB is an even older, slightly larger connector found on legacy devices such as older cameras.",
   "A docking station gives a laptop a desktop experience through a single connection. Older business laptops used a proprietary dock connector on the underside; modern docks usually connect over USB-C or Thunderbolt. A dock typically provides power to charge the laptop, several USB ports, wired Ethernet, one or more video outputs and audio. A port replicator is a simpler, often smaller device that just duplicates the laptop's ports so you can leave cables plugged in; it usually lacks extras such as expansion bays or its own charging. In practice the terms are often used loosely, but on the exam a docking station is the fuller-featured option.",
   "When a dock misbehaves, check the basics first. Make sure the laptop's USB-C port supports video and power delivery, that the dock's power adapter is connected and adequate, that the dock firmware and laptop drivers are current and that the display cables are seated. If external monitors stay blank but USB devices work, the port may not support video output."
  ],
  "terms": [
   [
    "USB-C",
    "A small reversible connector that can carry USB data, power delivery, DisplayPort video and Thunderbolt, depending on the device."
   ],
   [
    "Lightning",
    "Apple's proprietary 8-pin reversible connector used on older iPhones, iPads and accessories."
   ],
   [
    "Micro-USB",
    "An older non-reversible small USB connector common on earlier Android phones and small devices."
   ],
   [
    "Docking station",
    "A device that connects a laptop to power, displays, network and peripherals through one connection."
   ],
   [
    "Port replicator",
    "A simpler device that duplicates a laptop's ports so cables can stay connected at a desk."
   ]
  ],
  "example": "A user plugs a new USB-C dock into their laptop. The keyboard and mouse on the dock work, but neither monitor lights up. You check the laptop and find that port is data-only, while another USB-C port marked with a display icon supports video. Moving the dock to that port brings up both screens.",
  "tip": "USB-C is a connector shape, not a guarantee of features. Questions often hinge on a port or cable that does not support video, charging or Thunderbolt. Lightning is Apple-only; micro-USB is the non-reversible older one.",
  "check": [
   [
    "Which connector is reversible and proprietary to Apple?",
    "Lightning."
   ],
   [
    "A USB-C dock charges the laptop but no monitor output appears. What should you check first?",
    "Whether that USB-C port and cable support DisplayPort alternate mode or Thunderbolt video."
   ],
   [
    "How does a docking station usually differ from a port replicator?",
    "A docking station is fuller-featured, often adding charging, video, network and expansion, while a port replicator simply duplicates the laptop's existing ports."
   ]
  ]
 },
 {
  "t": "Accessories: touch pens/stylus, headsets, speakers, webcams, trackpads and drawing pads",
  "body": [
   "Accessories extend what a mobile device can do, and supporting them is a daily task. Most connect in one of three ways: a wired USB connection, Bluetooth or a built-in interface such as the headphone jack. Knowing how each connects tells you where to look when it fails.",
   "A touch pen or stylus lets a user write or draw on a touchscreen. Passive, or capacitive, styluses simply act like a fingertip and need no power or pairing. Active styluses contain electronics that communicate with the device's digitizer, enabling pressure sensitivity, palm rejection and buttons. Active pens need power from a battery or charging and often a Bluetooth pairing for their extra buttons. They also have to match a compatible digitizer; a pen made for one brand's tablet may do nothing on another brand's screen. If an active pen stops working, check its charge, its pairing and whether the device supports that pen protocol.",
   "Headsets and speakers can be wired through a 3.5 mm audio jack or USB, or wireless through Bluetooth. A USB or Bluetooth headset appears to the operating system as its own audio device, so a common support call is simply that Windows is still sending sound to the laptop speakers. Fix it by choosing the correct output and input device in the sound settings or the app's audio settings. Bluetooth headsets must be paired first and have enough battery; some have separate profiles for high-quality music and for hands-free calls with the microphone.",
   "External webcams usually connect over USB and use a standard video class driver, so they often work without a separate download. When a webcam is not detected, check the cable and port, look in Device Manager, confirm the camera privacy setting allows apps to use the camera and make sure the correct camera is selected in the meeting app. Laptops may also have a physical shutter or a function key that disables the built-in camera.",
   "Trackpads, also called touchpads, are the laptop's pointing device. They support gestures such as two-finger scrolling and can be adjusted or disabled in settings. A trackpad that seems dead may have been turned off with a function key, while a cursor that jumps while typing points to palm contact that the sensitivity setting can reduce. Drawing pads, or graphics tablets, are external pressure-sensitive surfaces used with a pen for art and design. They connect by USB or Bluetooth and usually need the manufacturer's driver to enable pressure levels and button mapping."
  ],
  "terms": [
   [
    "Active stylus",
    "A powered pen that communicates with the digitizer to provide pressure sensitivity, palm rejection and buttons."
   ],
   [
    "Passive stylus",
    "An unpowered pen with a conductive tip that imitates a fingertip on a capacitive screen."
   ],
   [
    "Drawing pad",
    "An external pressure-sensitive tablet used with a pen for drawing and design, sometimes called a graphics tablet."
   ],
   [
    "Default audio device",
    "The output or input device the operating system uses unless an app is set to use a different one."
   ]
  ],
  "example": "A user's new USB headset has no sound in video calls. The headset shows in Device Manager with no errors, so you open the sound settings and the meeting app's audio settings and find both still set to the laptop speakers and built-in microphone. Selecting the headset for both fixes the issue.",
  "tip": "When an accessory seems dead, check the simple things first: power or battery, pairing, a function-key toggle, privacy settings and whether the correct device is selected in the OS or app.",
  "check": [
   [
    "Why might an active stylus from one manufacturer not work on another brand's tablet?",
    "Active pens rely on a specific digitizer protocol, so the tablet must support that pen technology."
   ],
   [
    "A laptop's trackpad does not respond but an external mouse works. What is a quick first check?",
    "Whether the trackpad was disabled with a function key or in settings."
   ],
   [
    "What is the difference between a passive and an active stylus?",
    "A passive stylus just imitates a finger and needs no power; an active stylus is powered and talks to the digitizer for pressure and extra features."
   ]
  ]
 },
 {
  "t": "Wireless connection methods: Bluetooth pairing, NFC, hotspot and tethering, Wi-Fi",
  "body": [
   "Mobile devices rely on several different radios, each built for a different job. Choosing the right one, and knowing how to set it up and troubleshoot it, is a large part of mobile device support.",
   "Bluetooth is a short-range wireless technology for connecting accessories such as headsets, keyboards, mice, speakers and car systems. It is a PAN (personal area network) technology; typical ranges are around 10 meters for common devices, though this varies by class and environment. Devices must be paired before use. The general pairing process is: turn on Bluetooth on both devices, put the accessory in pairing or discoverable mode, select it on the host device, confirm a matching code or enter a PIN if asked, then test the connection. Once paired, the devices remember each other and reconnect automatically. If pairing fails, remove the old pairing on both sides, check battery levels and move the devices closer together.",
   "NFC (near-field communication) works only across a few centimeters. It is used for tap-to-pay, reading tags and badges, and quickly exchanging information or starting a Bluetooth pairing by tapping two devices together. It must be enabled in the device settings, and payment apps typically require the phone to be unlocked first.",
   "A hotspot turns a phone into a small Wi-Fi access point that shares its cellular data connection with laptops and tablets. You set the network name and a strong password, preferably with WPA2 or WPA3 security. Tethering is the broader term for sharing a phone's cellular connection with another device, which can be done over Wi-Fi (a hotspot), USB or Bluetooth. USB tethering has the advantage of charging the phone at the same time. Carriers may limit or charge for hotspot use, and heavy use drains the battery and uses data quickly.",
   "Wi-Fi connects the device to a wireless LAN for faster, usually cheaper data than cellular. Connecting involves selecting the SSID (service set identifier, the network name), entering the passphrase or corporate credentials and accepting any captive portal on public networks. Phones may randomize their MAC address per network for privacy, which can confuse networks that filter or reserve addresses by MAC. When Wi-Fi fails, check that airplane mode is off, Wi-Fi is enabled, the correct network and password are used and the device is in range, then forget and rejoin the network if needed."
  ],
  "terms": [
   [
    "Pairing",
    "The one-time process of linking two Bluetooth devices so they trust and reconnect to each other."
   ],
   [
    "Hotspot",
    "A feature that turns a phone into a Wi-Fi access point sharing its cellular data connection."
   ],
   [
    "Tethering",
    "Sharing a phone's cellular data connection with another device over Wi-Fi, USB or Bluetooth."
   ],
   [
    "SSID",
    "Service set identifier, the name of a wireless network."
   ]
  ],
  "example": "A consultant arrives at a client site with no guest Wi-Fi. She enables the hotspot on her phone, sets a WPA2 password and connects her laptop. When the phone battery runs low, she switches to USB tethering so the laptop charges the phone while sharing the connection.",
  "tip": "Match the technology to the scenario: accessories use Bluetooth, tap-to-pay and badges use NFC, sharing a phone's cellular connection is tethering or a hotspot and fast local network access is Wi-Fi.",
  "check": [
   [
    "What are the basic steps to pair a Bluetooth headset?",
    "Enable Bluetooth, put the headset in pairing mode, select it on the host, confirm any PIN or code and test."
   ],
   [
    "What is one advantage of USB tethering over a Wi-Fi hotspot?",
    "It charges the phone while sharing the connection and avoids broadcasting a wireless network."
   ],
   [
    "Which wireless method has the shortest range and is used for tap-to-pay?",
    "NFC, which works within a few centimeters."
   ]
  ]
 },
 {
  "t": "Cellular connectivity: 4G/5G, enabling and disabling radios, airplane mode, eSIM vs physical SIM",
  "body": [
   "Cellular connectivity lets phones, tablets and some laptops reach the internet through a mobile carrier's network instead of Wi-Fi. For A+ you need to understand the generations, how to turn radios on and off and how SIM cards identify a device to the carrier.",
   "Cellular generations are named G for generation. 4G, usually delivered as LTE (Long Term Evolution), provides broadband-class speeds and is still widely used as the baseline. 5G is the newer generation that offers higher potential speeds, lower latency and support for many more connected devices. 5G uses different frequency ranges: lower bands travel far and penetrate buildings well but are slower, while very high millimeter-wave bands are extremely fast but have short range and are easily blocked by walls. That is why a phone may show 5G outdoors and drop to 4G indoors. Actual speeds depend on the carrier, signal strength and network load.",
   "Each radio in a mobile device can be controlled separately: cellular voice and data, Wi-Fi, Bluetooth, NFC and GPS. Users can turn cellular data off to avoid charges, disable data roaming when traveling so they do not pay international rates, or turn off radios they do not use to save battery and reduce attack surface. Airplane mode disables all transmitting radios at once. On most modern devices you can then re-enable Wi-Fi or Bluetooth individually while cellular stays off, which is how people use in-flight Wi-Fi and wireless headphones on a plane. A common support call is a user who has no connection because airplane mode was left on.",
   "A SIM (subscriber identity module) holds the information that identifies the subscriber to the carrier. A physical SIM is a small removable card; over time it has shrunk from standard to micro to nano sizes. Moving service to a new phone means moving the card. An eSIM (embedded SIM) is a chip soldered into the device that can be programmed with a carrier profile, usually by scanning a QR code or using the carrier's app. eSIM allows switching carriers without swapping cards, holding more than one profile and dual-SIM setups for work and personal lines. Some newer phones support only eSIM.",
   "Two more identifiers appear in support work. The IMEI (International Mobile Equipment Identity) identifies the device hardware, while the IMSI (International Mobile Subscriber Identity) on the SIM identifies the subscriber. Carriers can block a stolen phone by its IMEI. If a phone shows no service, check airplane mode, whether cellular data is enabled, whether the SIM is seated or the eSIM profile is active, and whether the account is in good standing."
  ],
  "terms": [
   [
    "LTE",
    "Long Term Evolution, the technology most commonly used to deliver 4G cellular data."
   ],
   [
    "Airplane mode",
    "A setting that turns off all transmitting radios at once; Wi-Fi and Bluetooth can usually be re-enabled separately."
   ],
   [
    "eSIM",
    "An embedded, programmable SIM that stores carrier profiles without a removable card."
   ],
   [
    "IMEI",
    "International Mobile Equipment Identity, a number that uniquely identifies a mobile device's hardware."
   ],
   [
    "Data roaming",
    "Using another carrier's network outside your home coverage area, often at extra cost."
   ]
  ],
  "example": "An employee traveling abroad gets a huge data bill. For the next trip, you disable data roaming, show her how to enable Wi-Fi while in airplane mode and add a local travel eSIM profile so her work line stays active on the embedded SIM while data uses the cheaper travel plan.",
  "tip": "Airplane mode kills all radios, but Wi-Fi and Bluetooth can be turned back on individually. eSIM is embedded and provisioned by QR code or app; a physical SIM is a removable card. IMEI identifies the device, IMSI the subscriber.",
  "check": [
   [
    "A user's phone shows 5G outside but 4G inside the office. Why?",
    "Higher 5G frequencies have short range and poor building penetration, so indoors the phone falls back to 4G LTE or lower 5G bands."
   ],
   [
    "How is an eSIM activated with a new carrier?",
    "By downloading a carrier profile, typically by scanning a QR code or using the carrier's app, rather than inserting a card."
   ],
   [
    "Can you use Wi-Fi while airplane mode is on?",
    "On most modern devices, yes; you enable Wi-Fi manually after turning on airplane mode while cellular remains off."
   ]
  ]
 },
 {
  "t": "Location services: GPS and cellular location",
  "body": [
   "Location services let a mobile device work out where it is, which powers maps, navigation, weather, find-my-device features, photo tagging and emergency calls. For A+ you should know how each positioning method works, its strengths and weaknesses and how to control location access for privacy.",
   "GPS (Global Positioning System) is a satellite navigation system. A GPS receiver in the phone listens to signals from several satellites and calculates its position from the time each signal takes to arrive, a process called trilateration. It needs signals from at least four satellites for a reliable position, including altitude. GPS is receive-only, so the phone sends nothing to the satellites. It is accurate outdoors, often to within a few meters, but it needs a reasonably clear view of the sky. It struggles indoors, in underground car parks and among tall buildings, and a cold start can take a while to get a first fix. Modern phones also use other satellite systems in the same way, often grouped under the general name GNSS (global navigation satellite system).",
   "Cellular location estimates position from the cell towers the phone can hear. The carrier knows which tower or towers the phone is connected to and the signal strength or timing to each, so it can triangulate an approximate location. It works indoors and without a sky view, but it is much less precise than GPS, especially in rural areas where towers are far apart. Wi-Fi positioning adds another method: the phone notes which nearby wireless networks it can see and compares them to a database of known access point locations, which is useful indoors in cities.",
   "Phones combine these sources. Assisted GPS (A-GPS) uses the cellular or internet connection to download satellite information so the GPS gets a fix much faster. The operating system fuses GPS, cellular, Wi-Fi and motion sensors to give the best available location while saving battery.",
   "Location also raises privacy and battery concerns. Both iOS and Android let users turn location services off entirely or control access per app, with choices such as always, only while using the app or never, and an option to share an approximate rather than precise location. Location metadata can also be embedded in photos. Organizations may use location through mobile device management to find lost devices, and apps that use location constantly can drain the battery. If a mapping app shows the wrong position, check that location services are on, precise location is allowed for the app and the device has a view of the sky or a Wi-Fi connection."
  ],
  "terms": [
   [
    "GPS",
    "Global Positioning System, satellite-based positioning that calculates location from signal timing."
   ],
   [
    "Trilateration",
    "Calculating position from the measured distances to several known points, such as satellites."
   ],
   [
    "A-GPS",
    "Assisted GPS, which uses network data to help the receiver get a position fix faster."
   ],
   [
    "Cellular location",
    "Estimating a device's position from the cell towers it can reach and their signal characteristics."
   ]
  ],
  "example": "A delivery driver's navigation app is accurate on the road but shows him blocks away inside a large warehouse. Indoors the phone has lost a clear view of the GPS satellites and is falling back to cellular and Wi-Fi positioning, which are less precise. You explain the behavior and confirm precise location is allowed for the app.",
  "tip": "GPS is accurate but needs sky view and is receive-only. Cellular location works indoors but is coarse. Per-app location permissions are the privacy control the exam expects you to recommend.",
  "check": [
   [
    "Why does GPS perform poorly inside a building?",
    "It needs a clear line of sight to several satellites, and walls and roofs block or weaken their signals."
   ],
   [
    "How can a user limit which apps know their location?",
    "By setting per-app location permissions, such as only while using the app or never, or by sharing approximate instead of precise location."
   ],
   [
    "What does A-GPS do?",
    "It uses the phone's network connection to download satellite data so the GPS receiver gets a position fix faster."
   ]
  ]
 },
 {
  "t": "Mobile device management (MDM) and mobile application management: enrollment, policies, remote wipe",
  "body": [
   "Organizations that let staff use phones and tablets for work need a way to configure, secure and track those devices at scale. Mobile device management (MDM) provides that central control. Mobile application management (MAM) is a narrower approach that manages only the organization's apps and data rather than the whole device. Both are delivered through a management console, often a cloud service, that pushes settings to enrolled devices.",
   "Enrollment is how a device comes under management. On a company-owned device, enrollment can be automatic: the device is registered with the vendor's enrollment program, and the first time it is turned on it contacts the MDM and configures itself. This is often called zero-touch or automated enrollment. For personal devices in a BYOD (bring your own device) program, the user typically installs a company portal app or signs in with a work account and agrees to the enrollment. Once enrolled, a management profile is installed that lets the MDM apply policies.",
   "Policies are the rules the MDM enforces. Common examples include requiring a passcode of a minimum length, enforcing device encryption, setting a screen lock timeout, disabling the camera or USB file transfer, pushing Wi-Fi and VPN profiles and email accounts, installing required apps and blocking unapproved ones, and requiring a minimum OS version. Compliance checks can block a device from reaching company email if it is jailbroken or rooted, out of date or missing a passcode.",
   "Remote wipe is the ability to erase a device from the console when it is lost, stolen or when an employee leaves. A full wipe returns the device to factory settings and is appropriate for company-owned devices. A selective or enterprise wipe removes only the corporate apps, accounts and data and leaves personal photos and apps alone, which is the right choice for BYOD. MDM tools also offer remote lock, locate and the ability to reset a forgotten passcode.",
   "MAM focuses on protecting data inside managed apps. It can require a PIN to open a work app, prevent copying and pasting from a work email app into a personal app, block saving work files to personal cloud storage and wipe only the app data. Because it does not take control of the whole device, MAM is often more acceptable to employees who use personal phones. Many organizations combine both: full MDM on corporate devices and MAM app protection on personal ones. Together these support a clear mobile policy that users agree to before they get access to company resources."
  ],
  "terms": [
   [
    "MDM",
    "Mobile device management, centralized control of device settings, security policies and apps on enrolled devices."
   ],
   [
    "MAM",
    "Mobile application management, which protects and controls only managed apps and their data."
   ],
   [
    "BYOD",
    "Bring your own device, a policy that lets employees use personal devices for work."
   ],
   [
    "Remote wipe",
    "Erasing a device, or only its corporate data, from a central console."
   ],
   [
    "Enrollment",
    "The process of registering a device with an MDM so it can receive policies and profiles."
   ]
  ],
  "example": "An employee who used his personal phone for work email leaves the company. Because the phone was enrolled under the BYOD program, you issue a selective wipe that removes the work email profile and managed apps, leaving his personal photos and apps untouched. A lost company tablet the same week gets a full remote wipe.",
  "tip": "Full wipe for corporate devices; selective or enterprise wipe for BYOD. MAM protects apps and data without controlling the whole device, which suits personal phones.",
  "check": [
   [
    "Which wipe type is appropriate for an employee-owned phone when the employee leaves?",
    "A selective or enterprise wipe, which removes only corporate data and apps."
   ],
   [
    "Name three policies an MDM commonly enforces.",
    "Examples include a required passcode, device encryption, screen lock timeout, minimum OS version, blocking jailbroken devices and pushing Wi-Fi or VPN profiles."
   ],
   [
    "How does MAM differ from MDM?",
    "MAM manages only specific apps and their data, while MDM manages settings and policies for the entire device."
   ]
  ]
 },
 {
  "t": "Mobile app and data sync: email, calendar and contacts, cloud sync, two-factor authenticator apps",
  "body": [
   "Users expect their email, calendar, contacts and files to look the same on their phone, laptop and web browser. Synchronization makes that possible by keeping a master copy on a server and syncing changes to every device. As a technician you set up these accounts, fix sync problems and help users move to new phones without losing data.",
   "Email can be configured in several ways. Microsoft Exchange and Microsoft 365 accounts use Exchange ActiveSync or modern equivalents to sync mail, calendar, contacts and tasks together, and they often apply security policies to the device. Google accounts similarly sync Gmail, calendar and contacts. Generic mail accounts use IMAP (Internet Message Access Protocol), which keeps mail on the server and syncs folders across devices, or POP3 (Post Office Protocol version 3), which typically downloads mail to one device and may remove it from the server. For a user with several devices, IMAP or an Exchange-type account is the right choice. Outgoing mail uses SMTP (Simple Mail Transfer Protocol). When setting up manually you need the server names, ports, security type such as SSL/TLS and credentials.",
   "Calendar and contacts sync through the same accounts. Standard protocols such as CalDAV for calendars and CardDAV for contacts are used by some providers. A common problem is duplicate or missing contacts when a phone syncs the same address book from two accounts, or when a user saved contacts to the phone's local storage rather than to a synced account.",
   "Cloud sync services such as iCloud, Google Drive, OneDrive and Dropbox keep files, photos and device backups in online storage. They make device replacement easy: sign in on the new phone and restore. Watch for storage quotas that stop syncing when full, sync paused on metered or cellular connections to save data and conflicts when the same file is edited on two devices. Organizations may restrict personal cloud sync for work data through MAM policies.",
   "Two-factor authenticator apps generate time-based one-time passwords (TOTP), six-digit codes that change every 30 seconds, or accept push approvals. They are more secure than SMS codes, which can be intercepted or redirected through SIM swapping. The key risk is losing the phone: if the authenticator's secrets are not backed up or transferred, the user can be locked out of every account. Before a user wipes or trades in a phone, make sure they move their authenticator accounts, keep recovery codes somewhere safe or use an app that supports secure cloud backup."
  ],
  "terms": [
   [
    "IMAP",
    "Internet Message Access Protocol, which keeps mail on the server and syncs it across multiple devices."
   ],
   [
    "POP3",
    "Post Office Protocol version 3, which downloads mail to a device and often removes it from the server."
   ],
   [
    "Exchange ActiveSync",
    "A protocol that syncs email, calendar, contacts and tasks with Exchange-based services and can enforce device policies."
   ],
   [
    "TOTP",
    "Time-based one-time password, a short code generated from a shared secret and the current time."
   ]
  ],
  "example": "A manager gets a new phone and hands in the old one for recycling. The next morning he cannot sign in to three systems because his authenticator codes were on the old device. Afterward, your team adds a checklist step: transfer authenticator accounts and confirm recovery codes before any phone is wiped.",
  "tip": "For multiple devices, choose IMAP or an Exchange-style account, not POP3. Authenticator apps are stronger than SMS codes, but must be migrated before a phone is wiped.",
  "check": [
   [
    "A user reads mail on a phone and a laptop, and messages disappear from the laptop after the phone downloads them. What is likely misconfigured?",
    "The phone is using POP3 set to delete from the server; switch to IMAP or an Exchange account."
   ],
   [
    "Why are authenticator app codes considered more secure than SMS codes?",
    "They are generated on the device and are not sent over the phone network, so they cannot be intercepted or redirected by SIM swapping."
   ],
   [
    "Contacts are missing on a new phone even though the user signed in. What should you check?",
    "Whether the contacts were stored locally on the old phone instead of in a synced account, and whether contact sync is enabled for the account."
   ]
  ]
 },
 {
  "t": "TCP vs UDP and common ports: FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, HTTP 80, POP3 110, IMAP 143, SNMP 161/162, LDAP 389, HTTPS 443, SMB 445, RDP 3389",
  "body": [
   "Every network conversation needs two things beyond an IP address: a transport protocol and a port number. The IP address gets a packet to the right computer, and the port number gets it to the right service on that computer, such as a web server or mail server. The two main transport protocols are TCP and UDP.",
   "TCP (Transmission Control Protocol) is connection-oriented. Before sending data it sets up a session with a three-way handshake (SYN, SYN-ACK, ACK). It numbers segments, acknowledges what arrives, retransmits anything lost and delivers data in order. That reliability costs some overhead and delay, so TCP is used where every byte matters: web pages, email, file transfers and remote logins. UDP (User Datagram Protocol) is connectionless. It sends datagrams without a handshake or acknowledgments, so it is faster and lighter but does not guarantee delivery. UDP suits short queries such as DNS lookups and DHCP, and real-time traffic like voice and video, where a late packet is useless anyway.",
   "The exam expects you to know these ports. FTP (File Transfer Protocol) uses TCP 20 for data and 21 for control. SSH (Secure Shell) uses TCP 22 for encrypted remote command-line access and secure file transfer. Telnet uses TCP 23 for unencrypted remote access and should be avoided. SMTP (Simple Mail Transfer Protocol) uses TCP 25 to send mail between servers. DNS (Domain Name System) uses port 53, mainly UDP for queries and TCP for large responses and zone transfers. DHCP (Dynamic Host Configuration Protocol) uses UDP 67 on the server and 68 on the client. HTTP uses TCP 80 for unencrypted web traffic.",
   "Continuing the list: POP3 (Post Office Protocol version 3) uses TCP 110 to download mail. IMAP (Internet Message Access Protocol) uses TCP 143 to access mail kept on the server. SNMP (Simple Network Management Protocol) uses UDP 161 for queries to managed devices and UDP 162 for traps, the alerts devices send to the management station. LDAP (Lightweight Directory Access Protocol) uses port 389 to query directories such as Active Directory. HTTPS (HTTP Secure) uses TCP 443 for encrypted web traffic. SMB (Server Message Block) uses TCP 445 for Windows file and printer sharing. RDP (Remote Desktop Protocol) uses TCP 3389 for graphical remote access to Windows.",
   "Ports matter in daily work because firewalls allow or block traffic by port. If users can browse but not send mail through a server, a blocked port 25 or a missing rule is a strong suspect. A good memory trick is to group them: remote access (22, 23, 3389), web (80, 443), mail (25, 110, 143), infrastructure (53, 67/68, 161/162, 389) and file sharing (20/21, 445)."
  ],
  "terms": [
   [
    "TCP",
    "Transmission Control Protocol, a connection-oriented transport that guarantees ordered, reliable delivery."
   ],
   [
    "UDP",
    "User Datagram Protocol, a connectionless transport with low overhead and no delivery guarantee."
   ],
   [
    "Port number",
    "A number that identifies a specific service or application on a host."
   ],
   [
    "Three-way handshake",
    "The SYN, SYN-ACK, ACK exchange that TCP uses to open a connection."
   ],
   [
    "SNMP trap",
    "An unsolicited alert that a managed device sends to a management station, on UDP 162."
   ]
  ],
  "example": "After a firewall change, staff can browse websites but can no longer connect to office PCs from home with Remote Desktop. You review the new rules and find TCP 3389 was removed from the rule that allows traffic through the VPN, then restore it for VPN users only.",
  "tip": "Know which ports pair with secure and insecure versions: Telnet 23 versus SSH 22, HTTP 80 versus HTTPS 443. DHCP and SNMP are UDP; DNS is mostly UDP but also uses TCP. SMB is 445, RDP is 3389.",
  "check": [
   [
    "Why does DNS mostly use UDP?",
    "DNS queries are small and fast, so UDP's low overhead suits them; TCP is used for large responses and zone transfers."
   ],
   [
    "Which port should be open for secure remote command-line administration of a Linux server?",
    "TCP 22 for SSH."
   ],
   [
    "Which ports do SNMP use and what is the difference between them?",
    "UDP 161 for queries to managed devices and UDP 162 for traps sent from devices to the manager."
   ]
  ]
 },
 {
  "t": "Networking hardware: routers, managed vs unmanaged switches, access points, patch panels, firewalls, PoE injectors and switches, cable modems, DSL and ONT",
  "body": [
   "A network is built from devices that each have one job. Knowing what each device does, and at which layer it works, helps you design small networks and track down faults.",
   "A router connects different networks and forwards packets between them based on IP addresses. Your home router connects your local network to the internet service provider's network. Business routers link offices and route between internal subnets. A switch connects devices within the same local network and forwards frames based on MAC (media access control) addresses, learning which device is on which port so it sends traffic only where it needs to go. An unmanaged switch is plug-and-play with no configuration. A managed switch can be configured through a web page or command line, adding features such as VLANs (virtual LANs), port security, link aggregation, traffic monitoring and quality of service. Unmanaged suits a small office; managed suits any business network that needs segmentation or monitoring.",
   "An access point (AP) bridges wireless clients onto the wired network. Home routers usually include an AP, a switch and a router in one box, but businesses use separate APs, often centrally managed by a controller. A patch panel is a passive panel in a rack where permanent in-wall cables terminate. Short patch cables then connect panel ports to switch ports, which keeps cabling tidy and lets you move connections without re-terminating wall runs. A firewall filters traffic according to rules, allowing or blocking by address, port and protocol. It may be a dedicated appliance, a feature of a router or software on a host.",
   "PoE (Power over Ethernet) sends electrical power along with data on an Ethernet cable, so devices such as access points, IP phones and security cameras need no separate power outlet. A PoE switch provides power on its ports. A PoE injector adds power to a single cable when the switch does not support PoE; it sits between the switch and the device. Different PoE standards supply different amounts of power, so check that the switch or injector can supply what the device needs.",
   "At the edge of the network sits the device that talks to the provider. A cable modem connects to the provider's coaxial cable network, typically using the DOCSIS standard. A DSL modem connects over telephone lines. An ONT (optical network terminal) terminates a fiber-to-the-premises connection, converting the light signal to Ethernet. These devices hand off to your router, and they are often combined into a single gateway box supplied by the provider."
  ],
  "terms": [
   [
    "Managed switch",
    "A switch that can be configured for features such as VLANs, port security and monitoring."
   ],
   [
    "Patch panel",
    "A passive rack panel where in-wall cables terminate so patch cables can connect them to switches."
   ],
   [
    "PoE injector",
    "A device that adds Power over Ethernet to a single cable when the switch cannot supply power."
   ],
   [
    "ONT",
    "Optical network terminal, the device that terminates a fiber connection at the customer site and provides Ethernet."
   ],
   [
    "Router",
    "A device that forwards packets between different IP networks."
   ]
  ],
  "example": "A small office wants to add two ceiling-mounted access points where there is no power outlet. Their existing unmanaged switch does not supply PoE, so rather than replacing it, you install a PoE injector for each AP in the network closet, feeding power and data over the existing cable runs.",
  "tip": "Router means between networks (IP); switch means within a network (MAC). Managed switch equals VLAN support. PoE injector powers one device when the switch cannot. ONT means fiber; cable modem means coax; DSL means phone line.",
  "check": [
   [
    "Which device would you choose to separate a small business network into VLANs?",
    "A managed switch, since unmanaged switches cannot be configured for VLANs."
   ],
   [
    "What is the purpose of a patch panel?",
    "It terminates permanent in-wall cabling in the rack so short patch cables can connect those runs to switch ports and be rearranged easily."
   ],
   [
    "What device converts a fiber provider connection to Ethernet at the customer site?",
    "An ONT, or optical network terminal."
   ]
  ]
 },
 {
  "t": "Wireless: 2.4, 5 and 6 GHz bands, channels and regulations, 802.11a/b/g/n/ac/ax, Bluetooth, NFC, RFID",
  "body": [
   "Wi-Fi is defined by the IEEE 802.11 family of standards. The exam expects you to know the frequency bands, which standards use which bands, how channels work and how Wi-Fi compares with other wireless technologies.",
   "Wi-Fi uses three bands. The 2.4 GHz band travels farther and penetrates walls better but is slower and crowded; it has only three non-overlapping channels in most regions, 1, 6 and 11, and it competes with Bluetooth, microwave ovens and cordless devices. The 5 GHz band offers many more non-overlapping channels and higher speeds, but its range and wall penetration are shorter. The 6 GHz band, available to Wi-Fi 6E and newer devices where regulations allow, adds a large amount of clean spectrum with even more channels, again with shorter range. Channels can be bonded together into wider channels (for example 40, 80 or 160 MHz) for more throughput, at the cost of using more spectrum and increasing the chance of interference.",
   "Regulations matter because each country's regulator decides which frequencies and power levels are legal. That is why some channels are unavailable in some countries, why devices must be set to the correct region and why some 5 GHz channels require DFS (dynamic frequency selection), which makes the access point move off a channel if it detects radar.",
   "Know the standards in order. 802.11a used 5 GHz and 802.11b used 2.4 GHz; both are legacy. 802.11g brought faster speeds to 2.4 GHz. 802.11n (Wi-Fi 4) works on both 2.4 and 5 GHz and introduced MIMO (multiple input, multiple output), using several antennas at once. 802.11ac (Wi-Fi 5) works on 5 GHz and added wider channels and multi-user MIMO. 802.11ax (Wi-Fi 6) works on 2.4 and 5 GHz and improves efficiency in crowded places with OFDMA; Wi-Fi 6E extends 802.11ax into 6 GHz. Each generation is backward compatible with older devices on the same band.",
   "Other wireless technologies serve different needs. Bluetooth is a short-range PAN technology in the 2.4 GHz band for accessories. NFC (near-field communication) works within a few centimeters for payments and badges. RFID (radio-frequency identification) uses tags that a reader can detect, often without a battery in the tag, for inventory tracking, access badges and asset management. Passive RFID tags draw power from the reader's signal and have short range; active tags have a battery and longer range. NFC is actually a specialized, very short-range form of high-frequency RFID."
  ],
  "terms": [
   [
    "Non-overlapping channels",
    "Channels far enough apart that they do not interfere; in 2.4 GHz these are 1, 6 and 11."
   ],
   [
    "MIMO",
    "Multiple input, multiple output, using several antennas to send and receive multiple data streams."
   ],
   [
    "DFS",
    "Dynamic frequency selection, which requires Wi-Fi to leave certain 5 GHz channels when radar is detected."
   ],
   [
    "RFID",
    "Radio-frequency identification, using readers and tags to identify and track objects or people."
   ],
   [
    "Channel bonding",
    "Combining adjacent channels into a wider channel to increase throughput."
   ]
  ],
  "example": "An office's 2.4 GHz Wi-Fi is slow and unreliable. A Wi-Fi analyzer shows three neighboring networks all on channel 3. You move the office access points to channels 1, 6 and 11 and encourage capable devices onto 5 GHz, which has more channels and less congestion, and performance improves noticeably.",
  "tip": "Memorize the band per standard: a is 5 GHz, b and g are 2.4 GHz, n is both, ac is 5 GHz, ax is both plus 6 GHz as Wi-Fi 6E. 2.4 GHz means longer range but more interference; 5 and 6 GHz mean more speed but shorter range.",
  "check": [
   [
    "Which three channels should you use in the 2.4 GHz band to avoid overlap?",
    "Channels 1, 6 and 11."
   ],
   [
    "Which 802.11 standard introduced MIMO and works on both 2.4 and 5 GHz?",
    "802.11n, also called Wi-Fi 4."
   ],
   [
    "What is the main trade-off between 2.4 GHz and 5 GHz?",
    "2.4 GHz has better range and wall penetration but less speed and more interference; 5 GHz is faster with more channels but shorter range."
   ]
  ]
 },
 {
  "t": "Networked host services: DNS, DHCP, file and print servers, mail, syslog, web servers, AAA/RADIUS, proxy servers, spam gateways, UTM, load balancers, IoT and legacy/embedded systems",
  "body": [
   "Networks exist to deliver services, and most of those services run on servers. For A+ you need to recognize each common server role, what it does and how a problem with it would appear to users.",
   "A DNS (Domain Name System) server translates names like a company's intranet name into IP addresses. When DNS fails, users often report that the internet is down even though they can still reach sites by IP address. A DHCP (Dynamic Host Configuration Protocol) server hands out IP addresses, subnet masks, default gateways and DNS server addresses automatically. When DHCP fails, clients cannot get an address and may fall back to an APIPA address in the 169.254.x.x range. File servers store shared files, usually shared over SMB on Windows networks. Print servers manage shared printers, queues and drivers so every user does not need a direct connection to each printer.",
   "Mail servers send and receive email; SMTP moves messages between servers, and users collect mail through IMAP, POP3 or a service such as Exchange. A syslog server collects log messages sent from routers, switches, firewalls and servers so administrators can search them in one place, which is important for troubleshooting and security. A web server hosts websites and web applications over HTTP and HTTPS.",
   "AAA stands for authentication, authorization and accounting: proving who you are, deciding what you may do and recording what you did. RADIUS (Remote Authentication Dial-In User Service) is a common AAA protocol used to centralize logins for Wi-Fi with WPA2 or WPA3 Enterprise, VPNs and network devices. TACACS+ is another AAA protocol often used for administering network equipment. A proxy server sits between users and the internet, making requests on their behalf; it can cache content, filter websites and log activity. A spam gateway filters incoming email for spam, phishing and malware before it reaches the mail server. A UTM (unified threat management) appliance combines several security functions, such as firewall, intrusion prevention, antivirus, content filtering and VPN, into one device, which suits small and medium businesses. A load balancer spreads incoming requests across several servers to improve performance and availability, and stops sending traffic to a server that fails health checks.",
   "Not every networked device is a traditional server. IoT (Internet of Things) devices include smart thermostats, cameras, lighting and sensors. Legacy and embedded systems include things like older industrial controllers, medical equipment and building systems that run fixed firmware and cannot easily be patched or upgraded. These devices are often less secure than managed computers, so best practice is to change default passwords, update firmware where possible and place them on a separate network segment or VLAN so a compromise cannot easily spread to business systems."
  ],
  "terms": [
   [
    "AAA",
    "Authentication, authorization and accounting, the framework for controlling and recording access."
   ],
   [
    "RADIUS",
    "A protocol that provides centralized AAA for Wi-Fi, VPN and network device logins."
   ],
   [
    "Syslog",
    "A standard for sending log messages from devices to a central log server."
   ],
   [
    "UTM",
    "Unified threat management, a single appliance combining firewall, intrusion prevention, filtering and other security functions."
   ],
   [
    "Load balancer",
    "A device or service that distributes requests across multiple servers and removes failed servers from rotation."
   ]
  ],
  "example": "Users say the internet is down, but you can ping a public IP address successfully. You then try to resolve a website name and it fails, showing that the DNS server has stopped responding. Restarting the DNS service restores name resolution and everyone's browsing.",
  "tip": "Match the symptom to the service: names fail but IPs work means DNS; 169.254 addresses mean DHCP; central Wi-Fi logins mean RADIUS; many security features in one box means UTM; spreading load across servers means load balancer.",
  "check": [
   [
    "Which server role would you add to centralize logins for WPA2-Enterprise Wi-Fi?",
    "A RADIUS server, which provides AAA for wireless and VPN authentication."
   ],
   [
    "What does a proxy server do for an organization?",
    "It makes web requests on users' behalf, and can cache content, filter sites and log activity."
   ],
   [
    "Why should IoT devices be placed on a separate network segment?",
    "They are often hard to patch and less secure, so isolating them limits the damage if one is compromised."
   ]
  ]
 },
 {
  "t": "SOHO setup: DHCP scopes and reservations, static addressing, NAT, port forwarding, DMZ, UPnP, screened subnet, Wi-Fi security (WPA2/WPA3)",
  "body": [
   "SOHO stands for small office/home office. Setting up a SOHO router is a classic A+ task, often tested with performance-based questions where you must configure settings in a simulated router screen. The usual order is: change the default admin password, update the firmware, configure addressing, set up wireless security, then add any port forwarding the business needs.",
   "The router's DHCP server hands out addresses from a scope, which is the range of addresses available, for example 192.168.1.100 to 192.168.1.199. Leave room outside the scope for devices with static addresses. A static address is typed into the device itself and never changes; it suits servers and network equipment. A DHCP reservation instead ties a specific IP address to a device's MAC address, so the device still uses DHCP but always gets the same address. Reservations are easier to manage centrally, which makes them a good choice for printers.",
   "NAT (network address translation) lets many devices on private addresses share one public IP address from the ISP. The router rewrites outgoing packets with its public address and tracks the connections so replies go back to the right device. NAT also blocks unsolicited inbound connections by default, because the router does not know which internal device should receive them. Port forwarding creates a rule that sends inbound traffic on a specific port to a specific internal IP address, for example forwarding TCP 443 to a web server at 192.168.1.20. That is why the target device needs a static address or reservation.",
   "A DMZ (demilitarized zone), in the SOHO router sense, forwards all unsolicited inbound traffic to one internal host. It is sometimes used for game consoles but exposes that host completely, so it should be avoided when a port forward would do. A screened subnet is the proper business design: a separate network segment between the internet and the internal LAN, protected by firewall rules, where public-facing servers live so a compromise does not reach internal systems. UPnP (Universal Plug and Play) lets devices and applications open port forwards on the router automatically. It is convenient but risky, because malware can use it too, so best practice is to disable it unless needed.",
   "For wireless security, use WPA3 where all devices support it, or WPA2 with AES encryption otherwise. WPA3 uses SAE (simultaneous authentication of equals), which resists offline password-guessing attacks. Personal mode uses a shared passphrase; Enterprise mode uses individual credentials through a RADIUS server. Avoid WEP and the original WPA, and disable WPS (Wi-Fi Protected Setup) because its PIN method is weak. Use a strong passphrase, change the default SSID to something that does not identify the owner and consider a separate guest network that cannot reach internal devices."
  ],
  "terms": [
   [
    "DHCP reservation",
    "A DHCP setting that always gives the same IP address to a device identified by its MAC address."
   ],
   [
    "NAT",
    "Network address translation, which lets private addresses share a public IP address."
   ],
   [
    "Port forwarding",
    "A router rule that sends inbound traffic on a given port to a specific internal host."
   ],
   [
    "Screened subnet",
    "A separate, firewalled network segment for public-facing servers, historically called a DMZ."
   ],
   [
    "UPnP",
    "Universal Plug and Play, which lets devices open router ports automatically; usually best disabled."
   ]
  ],
  "example": "A dental office needs remote staff to reach a camera system on TCP port 8443. You create a DHCP reservation so the camera recorder always gets 192.168.1.50, add a port forward for 8443 to that address, disable UPnP and confirm the Wi-Fi uses WPA3 with a separate guest network for patients.",
  "tip": "Port forwarding needs a fixed internal address, so pair it with a static IP or DHCP reservation. Prefer port forwarding over the SOHO DMZ setting. Choose WPA3, or WPA2 with AES, and disable WPS and UPnP.",
  "check": [
   [
    "What is the difference between a static IP and a DHCP reservation?",
    "A static IP is configured on the device itself; a reservation is configured on the DHCP server and always assigns the same address to that device's MAC address."
   ],
   [
    "Why is the SOHO router's DMZ setting risky?",
    "It forwards all unsolicited inbound traffic to one host, exposing every port on that device to the internet."
   ],
   [
    "Which wireless security setting should you choose for a new SOHO network if all devices support it?",
    "WPA3, which uses SAE for stronger protection of the passphrase."
   ]
  ]
 },
 {
  "t": "IP addressing: IPv4 vs IPv6, public vs private ranges, APIPA, static vs dynamic, subnet mask and default gateway",
  "body": [
   "An IP address identifies a device on a network so traffic can reach it. Understanding the parts of an IP configuration lets you read the output of `ipconfig` and quickly tell whether a device is set up correctly.",
   "IPv4 addresses are 32 bits long, written as four decimal numbers from 0 to 255 separated by dots, such as 192.168.1.25. That gives about 4.3 billion addresses, which is not enough for the modern internet, so private addressing and NAT are used to stretch them. IPv6 addresses are 128 bits long, written as eight groups of four hexadecimal digits separated by colons, such as 2001:0db8:0000:0000:0000:0000:0000:0001. You can shorten IPv6 addresses by dropping leading zeros in each group and replacing one run of all-zero groups with a double colon, so that example becomes 2001:db8::1. IPv6 provides a vast address space. Every IPv6 interface has a link-local address beginning with fe80, and the loopback address is ::1, compared with 127.0.0.1 in IPv4.",
   "Private IPv4 ranges are reserved for internal networks and are not routed on the internet. They are 10.0.0.0 to 10.255.255.255, 172.16.0.0 to 172.31.255.255 and 192.168.0.0 to 192.168.255.255. Everything else usable is public. A home router hands out private addresses internally and uses NAT to share its single public address. If a computer shows an address in the 169.254.x.x range, that is APIPA (Automatic Private IP Addressing). Windows assigns it to itself when it is set for DHCP but cannot reach a DHCP server. An APIPA address can talk only to other APIPA hosts on the same segment, so it is a clear sign of a DHCP or physical connection problem.",
   "Addresses can be static, typed in manually, or dynamic, assigned by DHCP. Static addressing suits servers, printers and network devices whose address others depend on. Dynamic addressing is easier for ordinary clients and avoids typing mistakes and conflicts. A complete IPv4 configuration has four parts: the IP address, the subnet mask, the default gateway and at least one DNS server.",
   "The subnet mask divides an address into a network portion and a host portion. With the common mask 255.255.255.0, also written /24, the first three numbers identify the network and the last identifies the host, so 192.168.1.25 and 192.168.1.80 are on the same network. The default gateway is the router's address on your local network; traffic for any other network is sent there. If a device can reach local printers but nothing on the internet, check that the default gateway is present and correct. If names fail but IP addresses work, check the DNS server setting."
  ],
  "terms": [
   [
    "APIPA",
    "Automatic Private IP Addressing, a self-assigned 169.254.x.x address used when DHCP is unreachable."
   ],
   [
    "Subnet mask",
    "A value that separates the network portion of an IP address from the host portion."
   ],
   [
    "Default gateway",
    "The router address a host sends traffic to when the destination is on another network."
   ],
   [
    "Private IP range",
    "An address block reserved for internal use: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
   ],
   [
    "Link-local address",
    "An IPv6 address beginning with fe80 that is valid only on the local network segment."
   ]
  ],
  "example": "A user can print to the office printer but cannot open any websites. Running `ipconfig` shows a valid 192.168.10.44 address and 255.255.255.0 mask, but the default gateway field is blank because someone set a static address by hand. Adding the router address as the gateway, or switching the PC back to DHCP, restores internet access.",
  "tip": "169.254.x.x means the client could not reach DHCP. Memorize the three private ranges, especially that 172.16 to 172.31 is private but 172.32 is not. Local works but remote fails means gateway; IPs work but names fail means DNS.",
  "check": [
   [
    "Is 172.20.5.10 a public or private address?",
    "Private, because it falls in the 172.16.0.0 to 172.31.255.255 range."
   ],
   [
    "What does a 169.254.x.x address on a Windows PC indicate?",
    "APIPA: the PC is set for DHCP but could not reach a DHCP server."
   ],
   [
    "How would you shorten the IPv6 address 2001:0db8:0000:0000:0000:0000:0000:0001?",
    "2001:db8::1, by dropping leading zeros and replacing the run of zero groups with a double colon once."
   ]
  ]
 },
 {
  "t": "DNS records: A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC); VLANs and VPNs",
  "body": [
   "DNS (Domain Name System) is the internet's directory. A DNS zone for a domain holds records, and each record type answers a different question. Knowing the common types helps you set up websites and email and troubleshoot why mail is rejected or a site will not load.",
   "An A record maps a hostname to an IPv4 address, for example www pointing to 203.0.113.10. An AAAA record, called quad-A, does the same for an IPv6 address. A CNAME (canonical name) record is an alias that points one name to another name rather than to an address; for example, shop could be a CNAME for a hosted store's name, and whatever address that name resolves to is used. An MX (mail exchanger) record tells other mail servers where to deliver email for the domain, and it includes a priority value where the lowest number is tried first, so you can list a backup mail server.",
   "TXT records hold text and are widely used for email security. SPF (Sender Policy Framework) is a TXT record listing which servers are allowed to send mail for the domain; receiving servers check it to spot forged senders. DKIM (DomainKeys Identified Mail) adds a digital signature to outgoing messages, and the public key needed to verify the signature is published in a TXT record. DMARC (Domain-based Message Authentication, Reporting and Conformance) is a TXT record that tells receivers what to do when a message fails DMARC, meaning neither SPF nor DKIM passes for the domain in its From address, such as let it through and report it, quarantine it or reject it, and where to send reports. Together these help stop spoofing and phishing that pretends to come from your domain. If a company's legitimate mail lands in spam after moving to a new email provider, missing or outdated SPF and DKIM records are a common cause.",
   "A VLAN (virtual local area network) splits one physical switch, or a set of switches, into separate logical networks. Devices on different VLANs cannot talk directly; traffic between them must go through a router or firewall, where it can be controlled. Organizations use VLANs to separate staff, guests, voice phones and IoT devices without buying separate switches. VLANs are configured on managed switches, and a trunk link carries traffic for several VLANs between switches using tags, defined by the 802.1Q standard.",
   "A VPN (virtual private network) creates an encrypted tunnel across an untrusted network such as the internet. A remote-access VPN connects an individual user's device to the office network so they can reach internal resources securely from home or a hotel. A site-to-site VPN connects two office networks through their routers or firewalls so users at both sites share resources as if on one network. VPN clients may send all traffic through the tunnel (full tunnel) or only traffic for company networks (split tunnel)."
  ],
  "terms": [
   [
    "A record",
    "A DNS record that maps a hostname to an IPv4 address; AAAA does the same for IPv6."
   ],
   [
    "CNAME",
    "Canonical name record, an alias that points one hostname to another hostname."
   ],
   [
    "MX record",
    "Mail exchanger record, which names the servers that receive email for a domain, with priorities."
   ],
   [
    "SPF",
    "Sender Policy Framework, a TXT record listing servers authorized to send mail for a domain."
   ],
   [
    "VLAN",
    "Virtual LAN, a logical network segment created on managed switches to separate traffic."
   ]
  ],
  "example": "A company moves its email to a cloud provider, and customers report that invoices land in spam. Checking DNS, you find the SPF TXT record still lists only the old on-premises server and no DKIM record exists. After you update SPF, publish the provider's DKIM key and add a DMARC policy, delivery returns to normal.",
  "tip": "A is IPv4, AAAA is IPv6, CNAME is an alias to another name, MX is mail with lowest priority number preferred. SPF, DKIM and DMARC are all stored as TXT records. VLANs separate traffic on one switch; VPNs encrypt traffic across the internet.",
  "check": [
   [
    "Which DNS record tells other servers where to deliver a domain's email?",
    "The MX record."
   ],
   [
    "What is the role of DMARC?",
    "It tells receiving servers how to handle mail that fails DMARC (neither SPF nor DKIM passes in alignment with the From domain) and where to send reports."
   ],
   [
    "What kind of VPN connects two office networks together permanently?",
    "A site-to-site VPN."
   ]
  ]
 },
 {
  "t": "Internet connection types: satellite, fiber, cable, DSL, cellular, fixed wireless (WISP)",
  "body": [
   "Choosing an internet connection means balancing speed, latency, reliability, cost and what is available at the location. The A+ exam typically describes a customer's situation and asks which connection type fits best, so learn the character of each.",
   "Fiber carries data as light through glass strands. It offers the highest speeds, often symmetrical upload and download, very low latency and immunity to electrical interference. At the customer premises an ONT (optical network terminal) converts the light to Ethernet. Its main limitation is availability, since the provider must run fiber to the building. Cable internet runs over the same coaxial network used for cable television, using a cable modem. It delivers high download speeds but usually slower uploads, and because neighbors share the local segment, speeds can drop at busy times.",
   "DSL (digital subscriber line) uses existing telephone copper lines. It is widely available where phone lines exist, but speed falls sharply with distance from the provider's equipment, so a customer far from the exchange may get only modest speeds. Most home DSL is asymmetric (ADSL), with faster downloads than uploads. DSL can share the line with voice calls using filters. It is generally slower than cable or fiber and is being phased out in many areas.",
   "Satellite internet reaches almost anywhere with a clear view of the sky, making it an option for rural and remote sites. Traditional satellite service uses satellites in very high geostationary orbit, which causes high latency because signals travel a long way; that makes video calls and online gaming noticeably laggy. Newer services use large constellations of low Earth orbit satellites, which greatly reduce latency. Satellite service can also be affected by heavy rain or snow and by obstructions such as trees.",
   "Cellular internet uses 4G or 5G mobile networks through a phone hotspot, a USB modem or a dedicated cellular router. It is quick to deploy, good for temporary sites and useful as a backup link, but it may have data caps and performance that varies with signal and network load. Fixed wireless is delivered by a WISP (wireless internet service provider) using a directional antenna on the customer's building aimed at the provider's tower. It usually needs line of sight, and it serves rural areas where laying cable is impractical, generally with lower latency than traditional satellite. When recommending a connection, ask what is available at the address, how many users there are, whether they need strong upload speeds or low latency, and whether a backup link is required."
  ],
  "terms": [
   [
    "Fiber",
    "An internet connection that uses light over glass strands, offering very high, often symmetrical speeds."
   ],
   [
    "DSL",
    "Digital subscriber line, internet over telephone copper whose speed decreases with distance."
   ],
   [
    "WISP",
    "Wireless internet service provider, offering fixed wireless internet from towers to rooftop antennas."
   ],
   [
    "Latency",
    "The delay for data to travel from source to destination and back, measured in milliseconds."
   ],
   [
    "Cable modem",
    "The device that connects to a cable provider's coaxial network to provide internet service."
   ]
  ],
  "example": "A farm office in a valley has no cable or fiber and poor phone lines. A local WISP has a tower on a nearby hill with line of sight to the barn roof, so you recommend fixed wireless as the primary connection and a cellular router as a backup, avoiding the high latency of geostationary satellite for their video calls.",
  "tip": "High latency is the classic weakness of traditional geostationary satellite. DSL slows with distance. Cable is shared with neighbors. Fixed wireless needs line of sight to a tower. Fiber is fastest and most reliable where available.",
  "check": [
   [
    "A remote cabin has no wired service and the owner mainly browses and emails. Which option works almost anywhere?",
    "Satellite internet, since it needs only a clear view of the sky."
   ],
   [
    "Why might a DSL customer get much slower speeds than a neighbor on the same plan?",
    "DSL speed drops with distance from the provider's equipment, so a longer copper line gives lower speeds."
   ],
   [
    "Which connection type typically offers symmetrical high speeds and the lowest latency?",
    "Fiber."
   ]
  ]
 },
 {
  "t": "Network types: LAN, WAN, PAN, MAN, SAN, WLAN",
  "body": [
   "Networks are classified mainly by the geographic area they cover and by their purpose. These names come up constantly in documentation and exam questions, so learn each one along with a typical example.",
   "A PAN (personal area network) is the smallest, covering the space around one person, typically a few meters. Bluetooth headphones paired to a phone, a smartwatch linked to a phone and a wireless mouse connected to a laptop all form a PAN. A LAN (local area network) connects devices within a single building or site, such as a home, an office floor or a school. LANs are usually owned and managed by the organization, run over Ethernet and Wi-Fi and offer high speeds and low latency. A WLAN (wireless LAN) is a LAN that uses Wi-Fi rather than cables to connect devices; in practice most LANs combine wired and wireless parts.",
   "A MAN (metropolitan area network) spans a city or large campus, linking several buildings across a town. Examples include a city government connecting its offices, libraries and schools, or a university linking campuses across a city. MANs are often built on fiber owned by the organization or leased from a provider. A WAN (wide area network) spans large distances such as regions, countries or continents. It connects multiple LANs, usually over links leased from carriers or across the internet with VPNs. A company with offices in several cities uses a WAN, and the internet itself is the largest WAN.",
   "A SAN (storage area network) is different because it is defined by purpose rather than size. It is a dedicated high-speed network that connects servers to shared block-level storage, so servers see the storage as if it were a local disk. SANs use technologies such as Fibre Channel or iSCSI (Internet Small Computer Systems Interface) over Ethernet and live in data centers. Do not confuse a SAN with NAS (network-attached storage), which is a single storage device on the LAN that shares files over protocols such as SMB. A SAN provides block storage to servers; a NAS provides file shares to users.",
   "When a question describes a scenario, look for the scale clue. One person's devices points to a PAN. One building points to a LAN or WLAN. Several buildings across a city points to a MAN. Offices in different cities or countries points to a WAN. Servers connected to shared disk arrays points to a SAN."
  ],
  "terms": [
   [
    "PAN",
    "Personal area network, connecting devices around one person, often with Bluetooth."
   ],
   [
    "LAN",
    "Local area network, connecting devices within one building or site."
   ],
   [
    "MAN",
    "Metropolitan area network, spanning a city or large campus."
   ],
   [
    "WAN",
    "Wide area network, spanning large geographic areas and connecting multiple LANs."
   ],
   [
    "SAN",
    "Storage area network, a dedicated network that gives servers block-level access to shared storage."
   ]
  ],
  "example": "A regional bank has a head office and twenty branches in different cities. Each branch has a LAN with wired PCs and a WLAN for tablets, the branches connect to head office over a WAN built with site-to-site VPNs and the head office data center uses a SAN to give its virtualization hosts shared storage.",
  "tip": "Scale clues decide the answer: person, building, city, country. SAN is the odd one out because it is about storage, not distance, and it is block storage for servers, unlike file-sharing NAS.",
  "check": [
   [
    "A smartwatch syncing to a phone over Bluetooth forms which type of network?",
    "A PAN, or personal area network."
   ],
   [
    "What distinguishes a SAN from a NAS?",
    "A SAN is a dedicated network giving servers block-level storage access; a NAS is a single device sharing files over the LAN."
   ],
   [
    "A city links its library, schools and council offices with fiber. What network type is this?",
    "A MAN, or metropolitan area network."
   ]
  ]
 },
 {
  "t": "Networking tools: crimper, cable stripper, punchdown tool, toner probe, cable tester, loopback plug, Wi-Fi analyzer, network tap",
  "body": [
   "Building and repairing networks takes a small kit of specialized tools. The exam often describes a task and asks which tool to use, so learn what each one is for and when you would reach for it.",
   "A cable stripper removes the outer jacket of a twisted pair cable, and sometimes the insulation on individual wires, without nicking the conductors inside. A crimper attaches a connector, such as an RJ45 plug, to the end of a cable. You untwist the pairs, arrange them in the T568A or T568B order, trim them evenly, push them fully into the plug and squeeze the crimper to press the pins into the wires and lock the jacket in place. A punchdown tool is used at the other end of permanent cabling, pressing individual wires into the insulation-displacement slots of a patch panel, keystone jack or 110 block and trimming the excess. Use the right blade type for the block you are working on.",
   "A toner probe, also called a tone generator and probe, helps you find a particular cable in a bundle or a wall jack's matching patch panel port. You attach the tone generator to one end, then sweep the probe along cables at the other end; it gives an audible tone when it is near the right one. A cable tester checks that a cable is wired correctly. Basic testers verify continuity and pin mapping, catching opens, shorts, crossed pairs and split pairs. More advanced certifiers measure length and performance against a category standard, which is useful when proving a new installation.",
   "A loopback plug connects a port's transmit pins to its receive pins, so a network interface or port can send data to itself. It helps you test whether a NIC or switch port is working independently of the cable and the rest of the network. A Wi-Fi analyzer, which can be an app on a laptop or phone or a dedicated device, shows nearby wireless networks, their channels, signal strength and interference. Use it to pick less-crowded channels, find dead spots and plan access point placement.",
   "A network tap is a device placed inline on a cable that copies all passing traffic to a monitoring port without disturbing the connection. Security and network teams use taps with packet capture tools or intrusion detection systems to see exactly what crosses a link. A similar result can be achieved on a managed switch with port mirroring, but a tap is a separate hardware device. Remember the practical order when making a patch cable: strip, arrange, trim, insert, crimp and then test."
  ],
  "terms": [
   [
    "Crimper",
    "A tool that attaches connectors such as RJ45 plugs to the ends of cables."
   ],
   [
    "Punchdown tool",
    "A tool that seats wires into patch panels, keystone jacks and 110 blocks and trims the excess."
   ],
   [
    "Toner probe",
    "A tone generator and probe used to trace and identify a specific cable."
   ],
   [
    "Loopback plug",
    "A plug that routes a port's transmit signal back into its receive side for testing."
   ],
   [
    "Network tap",
    "An inline device that copies traffic from a link to a monitoring port."
   ]
  ],
  "example": "A new wall jack in an office does not connect. You use a toner probe to find which patch panel port it runs to, then a cable tester shows pins 3 and 6 swapped. You re-punch the wires at the keystone jack with a punchdown tool, retest and the link comes up at full speed.",
  "tip": "Crimper for plugs on cable ends, punchdown for patch panels and jacks, toner probe to find a cable, cable tester to verify wiring, loopback plug to test a port by itself, Wi-Fi analyzer for channels and signal.",
  "check": [
   [
    "Which tool would you use to identify which patch panel port connects to a specific wall jack?",
    "A toner probe (tone generator and probe)."
   ],
   [
    "What does a loopback plug test?",
    "Whether a network port or NIC can send and receive, by looping its transmit signal back to its receive side."
   ],
   [
    "Which tool terminates wires onto a patch panel?",
    "A punchdown tool."
   ]
  ]
 },
 {
  "t": "Displays: LCD panel types (IPS, TN, VA), OLED, mini-LED, resolution, refresh rate, brightness, color gamut, touch screens",
  "body": [
   "Monitors are one of the most visible parts of a computer, and users notice every flaw. To recommend and support displays you need to know the panel technologies and the specifications that describe them.",
   "Most monitors are LCDs (liquid crystal displays) lit by an LED backlight, and they come in three main panel types. TN (twisted nematic) panels are the oldest and cheapest, with very fast response times, which suits competitive gaming, but they have poor viewing angles and weaker color. IPS (in-plane switching) panels offer the best color accuracy and wide viewing angles, making them the usual choice for photo and design work and general office use; they cost more and have a lower contrast ratio. VA (vertical alignment) panels sit in between, with strong contrast and deep blacks, good color and viewing angles that are better than TN, but they can show some smearing in fast motion.",
   "OLED (organic light-emitting diode) displays have no backlight; each pixel lights itself and can turn fully off. That gives perfect blacks, very high contrast and fast response, but OLED costs more and can suffer burn-in from static images. Mini-LED is an improved LCD backlight made of thousands of tiny LEDs grouped into many local dimming zones, so dark areas of the image can be dimmed independently. It boosts contrast and brightness while avoiding OLED's burn-in risk, although small halos can appear around bright objects on dark backgrounds.",
   "Resolution is the number of pixels, written as width by height, such as 1920x1080 (Full HD or 1080p), 2560x1440 (QHD) and 3840x2160 (4K UHD). Every LCD and OLED panel has a native resolution; running anything else makes text look fuzzy. Refresh rate, measured in hertz (Hz), is how many times per second the screen redraws; 60 Hz is standard, and gaming monitors run higher for smoother motion. Response time is how quickly a pixel changes color. Brightness is measured in nits (candelas per square meter), which matters in bright rooms and for HDR (high dynamic range) content. Color gamut is the range of colors a display can show, expressed as coverage of a standard such as sRGB or DCI-P3; wide gamut matters for creative work.",
   "Touch screens add a digitizer layer. Capacitive touch, used on phones and most modern touch monitors, senses the charge of a finger and supports multi-touch. Resistive touch, found on older kiosks and some industrial equipment, responds to pressure from anything, including a gloved finger or stylus, but is less clear and less responsive. After installing a touch monitor on Windows, you may need to calibrate it so touches line up with the image."
  ],
  "terms": [
   [
    "IPS",
    "In-plane switching, an LCD panel type with the best color and viewing angles."
   ],
   [
    "TN",
    "Twisted nematic, a fast and inexpensive LCD panel type with poor viewing angles and color."
   ],
   [
    "VA",
    "Vertical alignment, an LCD panel type known for high contrast and deep blacks."
   ],
   [
    "Native resolution",
    "The physical pixel count of a panel, which gives the sharpest image."
   ],
   [
    "Color gamut",
    "The range of colors a display can reproduce, often stated as a percentage of a standard such as sRGB."
   ]
  ],
  "example": "A graphic designer complains that colors look different when she tilts her head and that prints do not match the screen. Her monitor is an older TN panel. You recommend an IPS monitor with wide color gamut coverage and calibrate it, and the colors become consistent from any angle.",
  "tip": "TN is fastest and cheapest, IPS is best color and viewing angle, VA is best contrast among LCDs. OLED has no backlight and can burn in. Mini-LED is a better LCD backlight with local dimming. Always run the native resolution.",
  "check": [
   [
    "Which LCD panel type is usually best for color-critical work?",
    "IPS, because of its color accuracy and wide viewing angles."
   ],
   [
    "How does mini-LED differ from OLED?",
    "Mini-LED is an LCD with a backlight made of many small LEDs in dimming zones; OLED pixels make their own light with no backlight."
   ],
   [
    "What does a 144 Hz refresh rate mean?",
    "The display redraws the image 144 times per second, giving smoother motion than a 60 Hz display."
   ]
  ]
 },
 {
  "t": "Cables and connectors: USB-A/C, Thunderbolt, HDMI, DisplayPort, DVI, VGA, SATA, Molex, Lightning, Cat 5e/6/6a, T568A/B, plenum vs riser, coax, fiber, adapters",
  "body": [
   "Identifying cables and connectors on sight is one of the most tested A+ skills. For each one, know its shape, what it carries and where you will see it.",
   "USB (Universal Serial Bus) connects most peripherals. USB-A is the flat rectangular connector found on computers and chargers. USB-C is the small reversible oval connector that can carry data, power and video. Thunderbolt is a high-speed interface that on modern systems uses the USB-C connector, identified by a lightning-bolt icon; it carries data, video and power and can daisy-chain devices such as docks, displays and external drives. Lightning is Apple's proprietary 8-pin reversible connector for older iPhones and iPads.",
   "For video, HDMI (High-Definition Multimedia Interface) carries digital video and audio and is standard on TVs, projectors and many monitors. DisplayPort is a digital video and audio interface common on PCs and business monitors, supporting high resolutions and refresh rates and daisy-chaining through multi-stream transport. DVI (Digital Visual Interface) is an older, large connector for digital video, with some versions also carrying analog. VGA (Video Graphics Array) is the oldest: a blue 15-pin connector carrying analog video only, which gives a softer image at high resolutions. Adapters can convert between them, for example DisplayPort to HDMI or USB-C to HDMI; converting digital to analog VGA needs an active adapter.",
   "Inside the PC, SATA (Serial ATA) data cables are thin with an L-shaped 7-pin connector for drives, and SATA power uses a wider 15-pin L-shaped connector. Molex is an older 4-pin power connector, once used for hard drives and optical drives and now mostly for fans and accessories. Twisted pair network cable comes in categories: Cat 5e supports 1 Gbps up to 100 meters, Cat 6 supports 1 Gbps at 100 meters and 10 Gbps over shorter runs of about 55 meters, and Cat 6a supports 10 Gbps at the full 100 meters. RJ45 connectors terminate network cables, wired to either the T568A or T568B standard; use the same standard on both ends for a straight-through cable, and one of each for a crossover.",
   "Cable jackets matter for safety. Plenum-rated cable has a fire-resistant jacket that produces less toxic smoke and is required in plenum spaces, the air-handling areas above drop ceilings or below raised floors. Riser-rated cable is for vertical runs between floors and is less strict. Coaxial cable, with a central conductor and shielding, is used for cable internet and TV, typically with an F-type screw-on connector. Fiber optic cable carries light, is immune to electromagnetic interference and runs much farther than copper. Single-mode fiber uses a laser for long distances, and multimode fiber uses cheaper light sources over shorter distances. Common fiber connectors include LC, SC and ST."
  ],
  "terms": [
   [
    "Thunderbolt",
    "A high-speed interface, using USB-C on modern systems, that carries data, video and power."
   ],
   [
    "T568B",
    "One of two wiring standards for RJ45 connectors; matching standards on both ends make a straight-through cable."
   ],
   [
    "Plenum cable",
    "Cable with a fire-resistant, low-smoke jacket required in air-handling spaces."
   ],
   [
    "Molex",
    "An older 4-pin peripheral power connector from the power supply."
   ],
   [
    "Single-mode fiber",
    "Fiber optic cable with a narrow core for long-distance laser transmission."
   ]
  ],
  "example": "An office renovation will run new network cables through the space above the drop ceiling, which the building uses for air return. You specify Cat 6a plenum-rated cable so the runs can support 10 Gbps at full length and meet fire code for the air-handling space.",
  "tip": "VGA is the only analog video connector in the list. Cat 6 does 10 Gbps only to about 55 meters, Cat 6a to 100 meters. Plenum is required in air-handling spaces. Thunderbolt uses the USB-C shape but is not the same as every USB-C port.",
  "check": [
   [
    "Which network cable category supports 10 Gbps over a full 100-meter run?",
    "Cat 6a."
   ],
   [
    "When is plenum-rated cable required?",
    "When cable runs through plenum spaces used for air circulation, such as above a drop ceiling used for air return."
   ],
   [
    "Which video connector carries analog signals only?",
    "VGA."
   ]
  ]
 },
 {
  "t": "RAM: DDR4 vs DDR5, DIMM vs SODIMM, single, dual and multichannel, ECC, virtual RAM",
  "body": [
   "RAM (random access memory) is the fast, temporary working space where the CPU keeps the programs and data it is using. It is volatile, which means its contents disappear when power is removed. More RAM lets a system run more programs at once without slowing down, and faster RAM feeds the CPU more quickly.",
   "Today's desktop and laptop memory is DDR SDRAM (double data rate synchronous dynamic RAM). DDR4 and DDR5 are the current generations. DDR5 offers higher speeds and larger module capacities, runs at a lower voltage and moves power management onto the module itself. Each generation has a notch in a different position and a different electrical design, so modules are not interchangeable: DDR5 will not fit a DDR4 slot, and a motherboard supports only one generation. When upgrading, match the generation and check the board's maximum capacity and supported speeds.",
   "Desktops use full-length DIMMs (dual inline memory modules). Laptops and small form factor PCs use shorter SODIMMs (small outline DIMMs). The two are not interchangeable either. Install a DIMM by opening the clips, lining up the notch and pressing firmly until the clips lock; a SODIMM goes in at an angle and is pressed down until it clicks.",
   "Memory channels increase bandwidth by letting the memory controller access more than one module at the same time. In single-channel mode it uses one path. In dual-channel mode two matched modules installed in the correct slots are accessed in parallel, which can noticeably improve performance, especially with integrated graphics. Many workstation and server platforms support quad-channel or more, which is called multichannel. Motherboards color-code or label the slots; consult the manual to see which slots to fill first. For best results, install identical modules in pairs.",
   "ECC (error-correcting code) memory detects and corrects single-bit errors caused by electrical interference or faults. It is used in servers and workstations where silent data corruption is unacceptable, but it requires a CPU and motherboard that support it and costs more. Ordinary desktop memory is non-ECC. Virtual RAM, also called virtual memory, is space on a storage drive that the operating system uses as an extension of RAM when physical memory runs low. On Windows it is the paging file. It prevents crashes when memory fills up, but a drive is far slower than RAM, so heavy use of virtual memory makes a system sluggish. If a PC constantly shows high memory use and disk activity, adding physical RAM is the real fix."
  ],
  "terms": [
   [
    "DIMM",
    "Dual inline memory module, the full-size memory stick used in desktops."
   ],
   [
    "Dual-channel",
    "A memory mode where two matched modules are accessed in parallel for more bandwidth."
   ],
   [
    "ECC",
    "Error-correcting code memory, which detects and corrects single-bit memory errors."
   ],
   [
    "Virtual memory",
    "Storage space the OS uses as overflow for RAM, such as the Windows paging file."
   ],
   [
    "DDR5",
    "The newer generation of DDR memory, with higher speeds and on-module power management, not compatible with DDR4 slots."
   ]
  ],
  "example": "A user's desktop has one 16 GB DDR4 module and slows to a crawl with many browser tabs open, with the disk constantly busy. You add a second identical 16 GB DDR4 DIMM in the matching slot shown in the manual, enabling dual-channel mode and reducing paging-file use, and performance improves greatly.",
  "tip": "DDR generations and DIMM versus SODIMM are never interchangeable. Dual channel needs matched modules in the correct slots. ECC needs board and CPU support. Heavy paging-file use is a sign to add physical RAM.",
  "check": [
   [
    "Can you install a DDR5 module in a DDR4 motherboard?",
    "No; the notch position and electrical design differ, so a board supports only one generation."
   ],
   [
    "Why would a server use ECC memory?",
    "To detect and correct single-bit memory errors and prevent silent data corruption or crashes."
   ],
   [
    "What is virtual memory and why is relying on it slow?",
    "It is drive space used as overflow for RAM; drives are much slower than RAM, so heavy use slows the system."
   ]
  ]
 },
 {
  "t": "Storage: HDD speeds and form factors, SSD interfaces (SATA, NVMe, M.2 keys), flash drives and cards, RAID 0, 1, 5, 6 and 10",
  "body": [
   "Storage keeps data when the power is off. You need to know the main drive types, how they connect, how to choose between them and how RAID combines drives for speed or protection.",
   "A hard disk drive (HDD) stores data magnetically on spinning platters read by a moving head. Its speed depends on how fast the platters spin, measured in revolutions per minute: 5,400 rpm is common in low-power and older laptop drives, 7,200 rpm in desktops, and 10,000 and 15,000 rpm drives were used in servers. HDDs come in two form factors: 3.5-inch for desktops and servers and 2.5-inch for laptops and compact systems. They offer large capacities at low cost per gigabyte, but they are slower than SSDs and vulnerable to shock because of their moving parts.",
   "A solid-state drive (SSD) stores data in flash memory with no moving parts, giving much faster access, silent operation and better shock resistance. SSDs connect through different interfaces. A SATA SSD, often in the 2.5-inch shape, is limited by the SATA interface speed. NVMe (Non-Volatile Memory Express) SSDs connect over PCIe lanes and are several times faster. The M.2 form factor is a small card that can be either SATA or NVMe. M.2 connectors are keyed with notches: an M key supports PCIe up to four lanes and is used by NVMe drives, a B key supports SATA and PCIe with fewer lanes, and many M.2 SATA drives have both B and M notches. Check the motherboard manual to learn what each M.2 slot supports.",
   "Flash drives and memory cards are portable flash storage. USB flash drives plug into a USB port. Memory cards include SD (Secure Digital) with its larger-capacity SDHC and SDXC variants, microSD for phones and small devices and CFexpress or CompactFlash in professional cameras. A device must support the card type and capacity class to read it.",
   "RAID (redundant array of independent disks) combines drives. RAID 0 stripes data across two or more drives for speed and full capacity but has no redundancy; one failure loses everything. RAID 1 mirrors two drives so either can fail without data loss, using half the total capacity. RAID 5 stripes data with distributed parity across at least three drives and survives one drive failure, losing one drive's worth of capacity. RAID 6 uses double parity across at least four drives and survives two failures. RAID 10 (1+0) mirrors pairs of drives and then stripes across the pairs, needing at least four drives, giving speed and redundancy at the cost of half the capacity. Remember that RAID provides availability, not backup: deleted or encrypted files are deleted or encrypted on every drive in the array."
  ],
  "terms": [
   [
    "NVMe",
    "A storage protocol over PCIe that makes SSDs much faster than SATA."
   ],
   [
    "M key",
    "An M.2 connector notch used by PCIe/NVMe drives supporting up to four lanes."
   ],
   [
    "RAID 5",
    "Striping with distributed parity across three or more drives, tolerating one drive failure."
   ],
   [
    "RAID 10",
    "Mirrored pairs striped together, needing four or more drives, combining speed and redundancy."
   ],
   [
    "RPM",
    "Revolutions per minute, the spin speed of a hard drive's platters."
   ]
  ],
  "example": "A small business wants a file server that survives a drive failure and gives as much usable space as possible from four 4 TB drives. RAID 5 would give about 12 TB and survive one failure, RAID 6 about 8 TB and survive two, and RAID 10 about 8 TB with better write speed. They choose RAID 6 for extra safety and still set up offsite backups.",
  "tip": "Know minimum drives and fault tolerance: RAID 0 (2, none), RAID 1 (2, one), RAID 5 (3, one), RAID 6 (4, two), RAID 10 (4, one per mirror). RAID is not a backup.",
  "check": [
   [
    "Which RAID level gives the best performance but no fault tolerance?",
    "RAID 0, striping without redundancy."
   ],
   [
    "What is the minimum number of drives for RAID 6, and how many failures can it survive?",
    "Four drives, and it can survive two drive failures."
   ],
   [
    "An M.2 SSD with a single M key notch is most likely which type?",
    "An NVMe drive using PCIe lanes."
   ]
  ]
 },
 {
  "t": "Motherboards: ATX, microATX, Mini-ITX; connectors, headers and expansion slots (PCIe); CPU sockets",
  "body": [
   "The motherboard is the main circuit board that connects every part of a PC: the CPU, memory, storage, expansion cards, power supply and front-panel controls. Choosing and installing one means matching its size to the case, its socket to the CPU and its slots and connectors to the parts you plan to use.",
   "Motherboards come in standard form factors that set their size and mounting-hole positions. ATX (Advanced Technology eXtended) is the full-size standard, measuring about 12 by 9.6 inches, with room for up to seven expansion slots and usually four memory slots. microATX is a smaller square board, about 9.6 by 9.6 inches, with up to four expansion slots; it fits in microATX and most ATX cases. Mini-ITX is a compact board of about 6.7 by 6.7 inches with usually just one expansion slot and two memory slots, built for small home theater and compact PCs. A smaller board can generally go in a larger case, but not the other way around.",
   "Expansion slots on modern boards are PCIe (Peripheral Component Interconnect Express). PCIe uses serial lanes, and slots are described by lane count: x1, x4, x8 and x16. A graphics card normally goes in the top x16 slot, which is wired directly to the CPU. A smaller card can go in a larger slot, and some slots are physically x16 but electrically wired with fewer lanes, so check the manual. Each PCIe generation roughly doubles the bandwidth per lane and remains backward compatible. Older boards had PCI and AGP slots, which are now legacy.",
   "Connectors and headers are how everything plugs in. The 24-pin ATX connector supplies main power, and a 4- or 8-pin CPU power connector (often labeled EPS or ATX12V) near the socket feeds the processor. SATA ports connect drives, and M.2 slots take SSDs. Headers are groups of pins for internal cables: front-panel headers for the power button, reset button and LEDs, USB headers for front USB ports, an audio header for front headphone jacks, fan headers for cooling, and sometimes a TPM header and RGB lighting headers. On the rear I/O panel you find USB ports, audio jacks, network and video outputs for integrated graphics.",
   "The CPU socket must match the processor. Intel desktop boards use LGA (land grid array) sockets, where the pins are in the socket and the CPU has flat contact pads. AMD desktop sockets have used PGA (pin grid array), where the pins are on the CPU, and AMD's newer desktop platform moved to LGA as well. The socket also determines the chipset and CPU generations supported, so check the board's CPU support list and whether a BIOS/UEFI update is needed for newer processors. When installing a CPU, align the triangle marker, drop it in without force and close the retention arm."
  ],
  "terms": [
   [
    "ATX",
    "The full-size standard motherboard form factor, with up to seven expansion slots."
   ],
   [
    "Mini-ITX",
    "A compact motherboard form factor, typically with one expansion slot, for small PCs."
   ],
   [
    "PCIe",
    "Peripheral Component Interconnect Express, the serial expansion bus using x1, x4, x8 and x16 lanes."
   ],
   [
    "LGA",
    "Land grid array, a socket design where the pins are in the socket and the CPU has flat pads."
   ],
   [
    "Front-panel header",
    "Motherboard pins that connect the case's power button, reset button and indicator LEDs."
   ]
  ],
  "example": "A customer wants a small living-room PC that still has a dedicated graphics card. You choose a Mini-ITX board with one PCIe x16 slot and a compact case, confirm the socket matches the chosen CPU and that the board's BIOS supports it, and plan for an M.2 SSD so no extra drive bays are needed.",
  "tip": "Size order from large to small: ATX, microATX, Mini-ITX; smaller boards fit bigger cases. Graphics cards use PCIe x16. The CPU socket must match exactly, and a newer CPU may need a firmware update.",
  "check": [
   [
    "Which form factor would you choose for the smallest possible PC that still takes one expansion card?",
    "Mini-ITX."
   ],
   [
    "Which connector supplies the main power to the motherboard?",
    "The 24-pin ATX power connector, with a separate 4- or 8-pin CPU power connector for the processor."
   ],
   [
    "After building a PC, the power button does nothing, but the power supply works. What should you check?",
    "That the front-panel power switch lead is connected to the correct pins on the front-panel header."
   ]
  ]
 },
 {
  "t": "Firmware: BIOS/UEFI settings, boot order, passwords, Secure Boot, TPM and HSM, virtualization support, fan and temperature monitoring",
  "body": [
   "Firmware is the low-level software stored on a chip on the motherboard that starts the computer before the operating system loads. It runs the POST (power-on self-test), initializes hardware and then hands control to a boot loader. The older standard was BIOS (Basic Input/Output System). Modern systems use UEFI (Unified Extensible Firmware Interface), which supports large drives partitioned with GPT (GUID partition table), faster startup, a graphical setup screen with mouse support and security features such as Secure Boot. Many people still call UEFI setup the BIOS.",
   "You enter the firmware setup by pressing a key during startup, often Delete, F2, F10 or Esc depending on the manufacturer, or from Windows advanced startup options. Common settings include the date and time, which is kept by the CMOS battery on the motherboard, enabling or disabling onboard devices such as audio or network ports, and storage controller mode. Boot order sets which devices the system tries first, such as the internal SSD, a USB drive or network boot (PXE). To install an operating system from a USB drive, move USB above the internal drive or use the one-time boot menu.",
   "Firmware passwords add a layer of protection. A supervisor or administrator password prevents unauthorized changes to firmware settings. A user or power-on password must be entered before the system will boot at all. Some systems also support a drive password. These protect against someone changing boot order to boot their own operating system and bypass Windows security.",
   "Secure Boot is a UEFI feature that checks the digital signatures of boot loaders and drivers against trusted keys stored in firmware, blocking unsigned or tampered code such as boot-sector malware from running at startup. Some older operating systems or tools may need Secure Boot turned off. A TPM (Trusted Platform Module) is a secure crypto processor, either a chip on the board or built into the CPU firmware, that stores encryption keys and measures the boot process. BitLocker drive encryption uses the TPM to protect its keys, and Windows 11 requires TPM 2.0. An HSM (hardware security module) is a dedicated, often external or network-attached device used by organizations to generate and protect large numbers of cryptographic keys, such as for certificate authorities and payment systems.",
   "Virtualization support must be enabled in firmware before hypervisors can use the CPU's hardware virtualization features, labeled Intel VT-x or AMD-V (sometimes SVM). If a virtual machine will not start and reports that virtualization is not available, check this setting first. Firmware also shows hardware monitoring: CPU and system temperatures, fan speeds and voltages. You can set fan curves so fans speed up as temperatures rise and configure alerts or shutdown thresholds. After changing firmware settings, save and exit so the changes take effect."
  ],
  "terms": [
   [
    "UEFI",
    "Unified Extensible Firmware Interface, the modern replacement for BIOS that supports GPT drives and Secure Boot."
   ],
   [
    "Secure Boot",
    "A UEFI feature that allows only signed, trusted boot loaders and drivers to run at startup."
   ],
   [
    "TPM",
    "Trusted Platform Module, a secure crypto processor that stores keys and supports features like BitLocker."
   ],
   [
    "HSM",
    "Hardware security module, a dedicated device for generating and protecting cryptographic keys at scale."
   ],
   [
    "Boot order",
    "The sequence of devices the firmware tries when looking for an operating system to start."
   ]
  ],
  "example": "A developer installs a hypervisor, but the virtual machine refuses to start with a message that hardware virtualization is disabled. You restart into UEFI setup, enable Intel VT-x in the CPU configuration menu, save and exit, and the VM starts normally.",
  "tip": "Know which setting fixes which symptom: VM will not start means enable VT-x or AMD-V; cannot boot from USB means change boot order or use the boot menu; Windows 11 upgrade blocked often means TPM 2.0 or Secure Boot is off; clock resets mean the CMOS battery.",
  "check": [
   [
    "What does Secure Boot protect against?",
    "Unsigned or tampered boot loaders and drivers, such as boot-level malware, running during startup."
   ],
   [
    "How does a TPM differ from an HSM?",
    "A TPM is built into a single computer to protect its keys; an HSM is a dedicated device for managing many keys for an organization or application."
   ],
   [
    "Which firmware password prevents the system from booting at all without it?",
    "The user or power-on password."
   ]
  ]
 },
 {
  "t": "CPUs: x86/x64 vs ARM, cores and threads, integrated graphics; cooling with fans, heat sinks, thermal paste/pads and liquid cooling",
  "body": [
   "The CPU (central processing unit) executes program instructions and is often called the brain of the computer. For A+ you should understand CPU architectures, what cores and threads mean, what integrated graphics provide and how CPUs are kept cool.",
   "An architecture is the set of instructions a processor understands. x86 is the instruction set that Intel and AMD desktop and laptop processors have used for decades. x86 originally referred to 32-bit processing; x64, also called x86-64 or AMD64, is the 64-bit extension. A 64-bit processor and OS can address far more than 4 GB of RAM and can run most 32-bit applications, while a 32-bit OS cannot run 64-bit applications. ARM is a different architecture based on a simpler instruction set (RISC, reduced instruction set computing) designed for power efficiency. ARM dominates phones and tablets and is now common in laptops such as Apple silicon Macs and ARM-based Windows laptops, offering long battery life. Software must be compiled for ARM or run through emulation, so check application compatibility before recommending an ARM device.",
   "A core is an independent processing unit inside the CPU; a quad-core processor can work on four tasks at once. Multithreading technology, such as Intel's Hyper-Threading or AMD's simultaneous multithreading (SMT), lets one physical core run two threads by sharing its resources, so the operating system sees more logical processors than physical cores. More cores and threads help with multitasking, video editing and virtualization, while higher clock speeds help tasks that rely on a single thread. Many modern CPUs mix performance and efficiency cores.",
   "Integrated graphics, sometimes called an iGPU, are built into the CPU and share system RAM. They are fine for office work, video playback and light gaming, and they use less power, but they are much less capable than a dedicated graphics card with its own video memory. If a CPU has integrated graphics, the video outputs on the motherboard's rear panel become usable.",
   "CPUs produce heat and must be cooled. A heat sink is a block of metal fins that draws heat away from the CPU, and a fan blows air through the fins. Thermal paste, also called thermal compound, fills the microscopic gaps between the CPU's heat spreader and the heat sink so heat transfers efficiently; apply a small amount and replace it whenever the cooler is removed. Thermal pads are soft pre-formed pads used in some coolers and on laptop components and graphics memory. Liquid cooling pumps coolant through a block on the CPU to a radiator with fans; all-in-one units are sealed and easy to install. Passive cooling uses a heat sink with no fan. Poor cooling causes thermal throttling, where the CPU slows itself, and sudden shutdowns when it overheats."
  ],
  "terms": [
   [
    "x64",
    "The 64-bit extension of the x86 architecture used by Intel and AMD processors."
   ],
   [
    "ARM",
    "A power-efficient RISC processor architecture used in phones, tablets and many modern laptops."
   ],
   [
    "Hyper-Threading",
    "Intel's technology that lets one physical core run two threads; AMD's equivalent is SMT."
   ],
   [
    "Thermal paste",
    "A compound that fills microscopic gaps between a CPU and heat sink to improve heat transfer."
   ],
   [
    "Integrated graphics",
    "A graphics processor built into the CPU that shares system memory."
   ]
  ],
  "example": "After a customer cleaned his PC and reseated the CPU cooler, the computer shuts down a few minutes into a game. You find the old thermal paste was reused and dried out, leaving gaps. After cleaning both surfaces with isopropyl alcohol and applying fresh paste, temperatures drop and the shutdowns stop.",
  "tip": "A 32-bit OS cannot run 64-bit software. ARM needs compatible or emulated apps. Always apply fresh thermal paste when reinstalling a heat sink. Sudden shutdowns under load point to cooling problems.",
  "check": [
   [
    "What is the difference between a core and a thread?",
    "A core is a physical processing unit; a thread is a stream of instructions, and multithreading lets one core run two threads at once."
   ],
   [
    "Why is ARM popular in laptops and mobile devices?",
    "Its simpler instruction set is very power efficient, giving longer battery life and less heat."
   ],
   [
    "When should you replace thermal paste?",
    "Whenever the heat sink is removed or reseated, and when it has dried out and temperatures have risen."
   ]
  ]
 },
 {
  "t": "Expansion cards: graphics, sound, capture, NIC",
  "body": [
   "Expansion cards add or upgrade capabilities that the motherboard does not provide, or does not provide well enough. They plug into PCIe slots, and installing one follows the same general process: power off and unplug the PC, use ESD protection, remove the slot cover on the back of the case, seat the card firmly in the right slot, secure it with a screw, connect any extra power cables, then boot and install the driver.",
   "A graphics card, also called a video card or GPU (graphics processing unit) card, adds dedicated graphics processing with its own video memory. It is needed for gaming, 3-D design, video editing and many AI and scientific workloads, and it can drive more or higher-resolution monitors. Graphics cards usually go in the primary PCIe x16 slot. Powerful cards need extra PCIe power connectors from the power supply, commonly 6-pin, 8-pin or a newer high-power connector, and a power supply with enough wattage. They can also be long and thick, so check that the case has room. After installing, connect the monitor to the graphics card's outputs, not to the motherboard's.",
   "A sound card provides audio input and output. Motherboards include onboard audio that is fine for most users, so dedicated sound cards are used for higher-quality audio, surround sound, professional recording with better converters or more inputs and outputs. External USB audio interfaces are a common alternative for musicians and podcasters.",
   "A capture card records or streams video from an external source. Gamers use capture cards to record console gameplay, and streamers and video producers use them to bring camera or HDMI feeds into the PC. They can be internal PCIe cards or external USB devices. Look for support for the resolution and frame rate the source produces.",
   "A NIC (network interface card) adds or upgrades network connectivity. Most motherboards have built-in Ethernet, but you might add a NIC for faster speeds such as 2.5, 10 or more gigabits per second, for extra ports on a server, for fiber connections using SFP modules or to replace a failed onboard port. Wireless NICs add Wi-Fi and often Bluetooth to desktops. After installing any card, check Device Manager to confirm it is detected without errors and install the latest driver from the manufacturer. If a new card causes instability, confirm the power supply is sufficient and the card is fully seated."
  ],
  "terms": [
   [
    "GPU",
    "Graphics processing unit, the processor on a graphics card that renders images and handles parallel workloads."
   ],
   [
    "Capture card",
    "A card or device that records or streams video from an external source into the PC."
   ],
   [
    "NIC",
    "Network interface card, which connects a computer to a wired or wireless network."
   ],
   [
    "PCIe power connector",
    "An extra power cable from the PSU, such as 6-pin or 8-pin, used by high-power graphics cards."
   ]
  ],
  "example": "A video editor's PC stutters when rendering 4K footage and the office has just installed 10-gigabit networking to the file server. You install a graphics card in the x16 slot, connect its 8-pin power lead and a 10 GbE NIC in a free x4 slot, install drivers for both and move the monitor cables to the graphics card's outputs.",
  "tip": "After adding a graphics card, plug the monitor into the card, not the motherboard. Check PSU wattage and connectors for power-hungry GPUs. Always confirm in Device Manager and install drivers.",
  "check": [
   [
    "A new graphics card is installed but the monitor stays blank. What is a common simple cause?",
    "The monitor is still connected to the motherboard's video output, or the card's extra power connector is not attached."
   ],
   [
    "Why would you add a NIC to a desktop that already has onboard Ethernet?",
    "For higher speeds, more ports, fiber connectivity, Wi-Fi or to replace a failed onboard port."
   ],
   [
    "What does a capture card do?",
    "It brings video from an external source, such as a console or camera, into the PC for recording or streaming."
   ]
  ]
 },
 {
  "t": "Power supplies: 110/115 vs 220/240 V input, 3.3/5/12 V output, 24-pin, modular, redundant, wattage rating",
  "body": [
   "The power supply unit (PSU) converts alternating current (AC) from the wall outlet into the low-voltage direct current (DC) that computer components use. A weak or failing PSU causes random shutdowns, reboots and failures to start, so choosing and checking the right PSU is an important skill. Never open a PSU; its capacitors can hold a dangerous charge even when unplugged. Failed units are replaced, not repaired.",
   "Wall voltage differs around the world. North America and some other regions use about 110 to 120 volts, while much of Europe, Asia and elsewhere uses about 220 to 240 volts. Most modern PSUs are auto-switching, detecting the input voltage and working across the full range. Some older or cheaper units have a manual voltage selector switch on the back. If a PSU set to 115 V is plugged into 230 V, it can be destroyed; if one set to 230 V is plugged into 115 V, it will not deliver enough power. Always check the switch when moving equipment between countries.",
   "The PSU outputs several DC voltages, called rails. The 12 V rail powers the most demanding components: the CPU, graphics cards, fans and drive motors. The 5 V rail powers USB ports and some drive electronics, and the 3.3 V rail powers some motherboard circuitry and memory. The main 24-pin ATX connector (older boards used 20-pin, and many connectors are 20+4 to fit both) supplies the motherboard. Other connectors include the 4- or 8-pin CPU power connector, PCIe power connectors for graphics cards, SATA power for drives and Molex for older devices.",
   "Cabling style matters for building. A non-modular PSU has all cables permanently attached, which is cheaper but leaves unused cables cluttering the case. A fully modular PSU lets you attach only the cables you need, improving airflow and tidiness. A semi-modular PSU has the essential motherboard and CPU cables fixed and the rest detachable. Servers often use redundant power supplies: two or more hot-swappable units in the same system, each able to carry the load alone, ideally plugged into different power circuits. If one fails, the other keeps the server running and the failed unit can be swapped without shutting down.",
   "The wattage rating is the maximum continuous power the PSU can deliver. Add up the needs of the components, especially the CPU and graphics card, and choose a PSU with comfortable headroom rather than one that just meets the total; running constantly near its limit shortens life and can cause instability. Efficiency ratings, such as the 80 Plus levels, indicate how little power is wasted as heat. When a PC will not power on, check the outlet and power strip, the PSU switch and voltage selector, and the connections, then test the PSU with a power supply tester or multimeter or substitute a known-good unit."
  ],
  "terms": [
   [
    "Auto-switching PSU",
    "A power supply that automatically accepts input voltages across the 110 to 240 V range."
   ],
   [
    "12 V rail",
    "The PSU output that powers the CPU, graphics card, fans and drive motors."
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
  "example": "A gamer upgrades to a much more powerful graphics card, and the PC starts shutting off during demanding games. The old 450 W PSU cannot supply the new card's peak draw. Replacing it with a higher-wattage, modular unit with the right PCIe power connectors ends the shutdowns.",
  "tip": "12 V powers the big consumers. Check the manual voltage switch on older PSUs when changing countries. Redundant PSUs are for servers and are hot-swappable. Never open a PSU; replace it.",
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
   ]
  ]
 },
 {
  "t": "Printers and multifunction devices: setup, drivers, duplex, orientation, tray settings, network and cloud printing, secure print",
  "body": [
   "Printers generate a surprising share of help desk calls. A multifunction device (MFD), also called a multifunction printer, combines printing, scanning, copying and often faxing in one unit. Setting one up correctly the first time avoids most of the problems users would otherwise report.",
   "Setup begins with unpacking: remove all packing tape and shipping locks, install the toner or ink, load paper and connect power. Place the device on a stable surface with good ventilation, near the users who need it. Then connect it. A USB connection links it to one computer. A wired Ethernet or Wi-Fi connection makes it available on the network; give network printers a static IP address or a DHCP reservation so computers can always find them. Print a configuration page from the printer's control panel to confirm its IP address and settings.",
   "Next, install the driver on each computer or on a print server. The driver translates what applications send into the printer's language, commonly PCL (Printer Command Language) or PostScript. Use the correct driver for the operating system and 32-bit or 64-bit architecture. Windows often installs a driver automatically when adding a printer, but the manufacturer's driver may unlock features such as finishing options. In a business, a print server shares printers centrally so drivers and queues are managed in one place. A wrong driver commonly causes garbled output full of strange symbols.",
   "Configure the default settings users need. Duplex printing prints on both sides of the page, saving paper; some printers do this automatically, and others require manual flipping. Orientation is portrait (tall) or landscape (wide). Tray settings tell the printer which paper size and type are loaded in each tray, such as letter in tray 1 and envelopes or labels in the bypass tray. If the tray settings do not match what the job requests, the printer may pause with a message asking for a different paper, or print on the wrong size. Also set print quality and color defaults, for example grayscale to save color toner.",
   "Printing is increasingly networked and cloud-based. Network printing lets many users print over the LAN using protocols such as IPP (Internet Printing Protocol) or raw port 9100. Cloud printing services let users print from anywhere, including phones, through an online service that relays the job to the printer, and many organizations use a cloud print management service to replace on-site print servers. Secure print, sometimes called pull printing or print release, holds a job until the user authenticates at the device with a PIN, badge or login. This stops confidential documents sitting in the output tray for anyone to take. MFDs also need security attention: change the default admin password, keep firmware updated, secure scan-to-email and scan-to-folder settings and consider features that wipe stored jobs from the device's internal drive."
  ],
  "terms": [
   [
    "Multifunction device",
    "A device that combines printing, scanning, copying and often faxing."
   ],
   [
    "Duplex",
    "Printing on both sides of the paper."
   ],
   [
    "Print driver",
    "Software that translates application output into a language the printer understands, such as PCL or PostScript."
   ],
   [
    "Secure print",
    "A feature that holds a job until the user authenticates at the printer to release it."
   ],
   [
    "Print server",
    "A server that shares printers, manages queues and distributes drivers centrally."
   ]
  ],
  "example": "HR reports that salary letters were picked up by the wrong person from the shared printer. You enable secure print on the MFD, integrate it with employee badges so jobs release only when the sender taps a badge at the device, and set duplex and grayscale as defaults to cut paper and toner use.",
  "tip": "Garbled output points to the wrong driver. A printer asking for different paper points to tray settings. Confidential documents left on the tray point to secure print. Give network printers a static IP or reservation.",
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
   ]
  ]
 },
 {
  "t": "Printer types and consumables: laser imaging process and maintenance kits, inkjet, thermal, impact, 3-D printers",
  "body": [
   "Each printer technology has its own strengths, consumables and maintenance. The exam puts particular emphasis on the laser printing process, so learn its steps in order.",
   "Laser printers use static electricity, toner and heat. The imaging process has seven steps. Processing: the printer receives the job and builds an image of the page in memory. Charging: a primary charge roller (or corona wire on older printers) applies a uniform negative charge to the photosensitive imaging drum. Exposing: a laser writes the image onto the drum, neutralizing the charge where toner should go. Developing: toner, which is charged, sticks to the exposed areas of the drum. Transferring: a transfer roller or belt charges the paper so it pulls the toner off the drum. Fusing: the fuser assembly uses heat and pressure to melt the toner into the paper. Cleaning: a blade wipes remaining toner from the drum and the charge is removed, ready for the next page.",
   "Laser consumables include the toner cartridge, which often includes the drum, and a maintenance kit. A maintenance kit typically contains a new fuser, rollers such as the transfer, pickup and separation rollers, and sometimes other wear parts. Install it when the printer's page counter reaches the manufacturer's interval, then reset the counter. Let the fuser cool before touching it, because it gets very hot. Clean spilled toner with a toner-rated vacuum, not a regular vacuum.",
   "Inkjet printers spray tiny droplets of ink through nozzles in a print head. They are inexpensive to buy and good for color photos, but ink costs more per page than toner. Maintenance includes replacing ink cartridges, running the head cleaning routine when output shows streaks or missing colors and running print head alignment after installing new cartridges. Clogs are common if the printer sits unused. Thermal printers use heat. Direct thermal printers darken special heat-sensitive paper, as in receipt printers, and need no ink, but the print fades over time. Thermal transfer printers melt wax or resin from a ribbon onto labels for more durable output. Maintenance means replacing paper rolls or ribbons and cleaning the heating element.",
   "Impact printers, mainly dot matrix, strike an inked ribbon against the paper with pins in the print head. They are loud and low-resolution but can print multipart carbon forms, which is why they persist in warehouses and some billing systems. They often use continuous tractor-feed paper with holes along the edges. Consumables are ribbons and paper, and the print head can wear out. 3-D printers build physical objects layer by layer. The common type melts plastic filament through a heated nozzle onto a build plate, while resin printers cure liquid resin with light. Consumables are filament or resin, and maintenance includes leveling the build plate, cleaning the nozzle and ensuring good ventilation."
  ],
  "terms": [
   [
    "Fuser",
    "The laser printer assembly that uses heat and pressure to bond toner to paper."
   ],
   [
    "Imaging drum",
    "The photosensitive drum in a laser printer on which the image is formed with charge and toner."
   ],
   [
    "Maintenance kit",
    "A set of replacement wear parts, such as the fuser and rollers, installed at a set page count."
   ],
   [
    "Direct thermal",
    "Printing that darkens heat-sensitive paper without ink or ribbon."
   ],
   [
    "Impact printer",
    "A printer, such as dot matrix, that strikes a ribbon against paper; useful for multipart forms."
   ]
  ],
  "example": "A warehouse needs to print three-part carbon delivery forms and durable shipping labels that will not fade. You recommend a dot matrix impact printer for the multipart forms and a thermal transfer label printer with resin ribbons for the labels, rather than direct thermal labels that fade.",
  "tip": "Memorize the laser order: processing, charging, exposing, developing, transferring, fusing, cleaning. Toner that smears off means the fuser. Multipart forms need an impact printer. Direct thermal needs special paper and fades.",
  "check": [
   [
    "Which laser printing step melts toner onto the paper?",
    "Fusing, performed by the fuser assembly with heat and pressure."
   ],
   [
    "Which printer type is required for multipart carbon forms?",
    "An impact printer, such as a dot matrix printer."
   ],
   [
    "What should you do after installing a laser printer maintenance kit?",
    "Reset the maintenance page counter so the printer tracks the next interval."
   ]
  ]
 },
 {
  "t": "Virtualization purposes: sandbox, test/development, application virtualization, legacy software and operating systems",
  "body": [
   "Virtualization lets one physical computer, the host, run one or more virtual machines (VMs), called guests. Each VM behaves like a complete computer with its own operating system, virtual hardware and storage, but it is really software running on shared physical resources. For A+ you should know why people and organizations use virtualization, because questions often describe a situation and ask which use fits.",
   "A sandbox is an isolated environment where you can run something untrusted without risking the host. Security teams open suspicious attachments or test unknown programs in a sandbox VM; if it turns out to be malicious, the damage is contained and the VM can be deleted or reverted. Windows includes a built-in sandbox feature on some editions that creates a temporary, disposable desktop that is erased when closed.",
   "Test and development environments are one of the most common uses. Developers can run several operating systems and versions side by side to check that their software works everywhere. IT staff can test patches, new software or configuration changes on a VM that mirrors production before rolling them out. Snapshots let them roll back instantly if a test goes wrong, which saves hours of rebuilding machines.",
   "Application virtualization separates an application from the underlying operating system. Instead of installing the app normally, it runs in its own isolated package or is streamed from a server, so it does not conflict with other software and does not change the local system. This helps when two versions of an application cannot be installed side by side, and it simplifies deployment and updates for many users.",
   "Legacy software and operating systems are another big reason. Some businesses depend on an old application that runs only on an old version of Windows, or on hardware that is no longer available. Rather than keep aging physical computers alive, you can run the old operating system in a VM on modern hardware. Because legacy systems are often unsupported and unpatched, the VM should be isolated from the network as much as possible. Virtualization also lets organizations consolidate many lightly used servers onto fewer physical hosts, saving power, space and cost, and makes backup and recovery easier because a whole VM is just a set of files."
  ],
  "terms": [
   [
    "Virtual machine",
    "A software-based computer running its own operating system on shared physical hardware."
   ],
   [
    "Host",
    "The physical computer, or its hypervisor, that runs virtual machines."
   ],
   [
    "Guest",
    "An operating system running inside a virtual machine."
   ],
   [
    "Sandbox",
    "An isolated environment for running untrusted code without affecting the host."
   ],
   [
    "Application virtualization",
    "Running an application isolated from the local OS, often streamed or packaged, to avoid conflicts."
   ]
  ],
  "example": "An accounting firm relies on a tax program that only runs on a Windows version that is long out of support. Instead of keeping an old PC under a desk, you create a VM running that OS on a modern host, restrict its network access to the one file share it needs and take regular snapshots.",
  "tip": "Match the scenario: suspicious file means sandbox; trying a patch safely means test environment with snapshots; conflicting app versions means application virtualization; old app on an old OS means a legacy VM.",
  "check": [
   [
    "Why is a sandbox useful for examining a suspicious attachment?",
    "It isolates the file from the host, so any malicious behavior is contained and the environment can be discarded."
   ],
   [
    "How can virtualization help a business that depends on software that runs only on an old OS?",
    "By running that old OS in a VM on modern hardware, isolated from the rest of the network."
   ],
   [
    "What is application virtualization?",
    "Running an application isolated from the local operating system, often packaged or streamed, so it does not conflict with other software."
   ]
  ]
 },
 {
  "t": "Hypervisors: Type 1 (bare metal) vs Type 2 (hosted)",
  "body": [
   "A hypervisor, also called a virtual machine monitor, is the software layer that creates and runs virtual machines. It divides the physical CPU, memory, storage and network among the VMs and keeps them isolated from each other. There are two types, and knowing the difference is a staple of the exam.",
   "A Type 1 hypervisor, also called bare metal or native, runs directly on the physical hardware with no general-purpose operating system underneath. It is effectively a slim operating system designed only to run VMs. Because there is no host OS in the way, Type 1 hypervisors are efficient, fast, stable and more secure, with a smaller attack surface. They are used in data centers and for servers. Examples include VMware ESXi, Microsoft Hyper-V and the Linux KVM (Kernel-based Virtual Machine) hypervisor, as well as Xen. Type 1 hypervisors are usually managed remotely through a web console or management software from another computer, and large deployments use central management tools to move VMs between hosts and handle failover.",
   "A Type 2 hypervisor, also called hosted, runs as an application on top of a normal operating system such as Windows, macOS or Linux. You install it like any other program and then create VMs inside it. Examples include Oracle VirtualBox, VMware Workstation and VMware Fusion on Mac, and Parallels Desktop. Type 2 hypervisors are easy to set up and ideal for desktop use: testing software, learning, running a second OS or practicing labs. The trade-off is performance and overhead, because every request passes through the host operating system, and the VMs depend on that host OS staying healthy. If the host crashes or restarts for updates, every VM stops.",
   "Hyper-V is a common source of confusion. When you enable Hyper-V on Windows 10 or 11 Pro, it looks like an application, but it actually installs a Type 1 hypervisor underneath, and Windows itself then runs as a privileged partition on top of it. For exam purposes, Hyper-V is treated as Type 1.",
   "To choose between them, think about the job. A company consolidating twenty servers onto three physical machines needs a Type 1 hypervisor for performance, reliability and central management. A student who wants to try Linux on a Windows laptop, or a technician who wants a quick test VM, should use a Type 2 hypervisor. Both types need hardware virtualization support (Intel VT-x or AMD-V) enabled in firmware for good performance, and both need enough RAM and storage for the host plus every running guest."
  ],
  "terms": [
   [
    "Hypervisor",
    "Software that creates and runs virtual machines and allocates hardware resources to them."
   ],
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor that runs directly on hardware, used for servers and data centers."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on a normal operating system."
   ],
   [
    "Bare metal",
    "Running directly on physical hardware without an underlying general-purpose operating system."
   ]
  ],
  "example": "A technician studying for A+ wants to practice Linux commands on her Windows laptop without repartitioning the drive. You suggest installing a Type 2 hypervisor such as VirtualBox and creating a Linux VM. Meanwhile, her company's server team runs its production file and database servers on Type 1 hypervisors in the data center.",
  "tip": "Type 1 means bare metal, better performance, servers and data centers. Type 2 means hosted on a desktop OS, easier but slower. If the question mentions installing on top of Windows or macOS as an app, the answer is Type 2.",
  "check": [
   [
    "Which hypervisor type runs directly on the hardware without a host OS?",
    "Type 1, or bare-metal, hypervisor."
   ],
   [
    "Why do Type 2 hypervisors generally perform worse than Type 1?",
    "Their VMs' requests pass through the host operating system, adding overhead, and they share resources with that OS."
   ],
   [
    "Give one example of each hypervisor type.",
    "Type 1: VMware ESXi, Hyper-V, KVM or Xen. Type 2: VirtualBox, VMware Workstation, VMware Fusion or Parallels Desktop."
   ]
  ]
 },
 {
  "t": "Resource requirements for VMs: CPU virtualization support, RAM, storage, network (NAT, bridged, internal)",
  "body": [
   "Every virtual machine consumes real hardware resources on the host. Planning a VM means making sure the host has enough CPU capability, memory and storage for itself plus every guest that will run at the same time, and choosing a network mode that gives the VM the right kind of access.",
   "Start with the CPU. Modern hypervisors rely on hardware-assisted virtualization, labeled Intel VT-x or AMD-V, which must be supported by the processor and enabled in the UEFI or BIOS settings. Second Level Address Translation (Intel EPT or AMD RVI) further improves memory performance and is required by some hypervisors. You assign each VM a number of virtual CPUs (vCPUs). A host can run more total vCPUs than it has physical cores because not every VM is busy at once, but overcommitting too heavily makes every VM slow. More cores on the host let you run more VMs comfortably.",
   "RAM is often the first limit you hit. Each running VM needs its own memory allocation large enough for its guest operating system and applications, and the host OS or hypervisor needs its own share too. For example, a host with 16 GB running Windows plus two VMs of 4 GB each leaves limited room for the host itself. Some hypervisors support dynamic memory that adjusts a VM's allocation as demand changes, but you still need enough physical RAM overall. If the host runs short, it will page to disk and everything slows dramatically.",
   "Storage for a VM is a virtual disk file on the host, such as VHD or VHDX for Hyper-V, VMDK for VMware and VDI for VirtualBox. A dynamically expanding, or thin-provisioned, disk starts small and grows as data is written, saving space. A fixed-size, or thick-provisioned, disk allocates its full size up front, which can perform slightly better and avoids unexpectedly running out of host space. Snapshots also consume disk space. Placing VM files on a fast SSD greatly improves performance.",
   "Virtual networking offers several modes, and the names vary a little between products. NAT mode lets the VM share the host's IP address: the VM can reach the host's network and the internet, but devices on the network cannot easily start connections to it. It is the usual default and simplest choice. Bridged mode connects the VM directly to the physical network as if it were a separate computer, so it gets its own IP address from the network's DHCP server and other devices can reach it; use it for a VM that runs a server others must access. Internal networking lets VMs talk only to each other on an isolated virtual network with no outside access, which is ideal for security testing and malware labs. Some hypervisors also offer host-only networking, where VMs can talk to each other and the host but not the wider network."
  ],
  "terms": [
   [
    "vCPU",
    "A virtual processor assigned to a VM and scheduled onto the host's physical cores."
   ],
   [
    "NAT mode",
    "A VM networking mode where the guest shares the host's IP address to reach external networks."
   ],
   [
    "Bridged mode",
    "A VM networking mode where the guest appears on the physical network with its own IP address."
   ],
   [
    "Internal network",
    "A VM networking mode that lets guests communicate only with each other, isolated from outside networks."
   ],
   [
    "Thin provisioning",
    "Creating a virtual disk that grows as data is written instead of allocating its full size up front."
   ]
  ],
  "example": "A developer runs a web server in a VM using NAT mode, and colleagues cannot reach it from their PCs. Switching the VM's adapter to bridged mode gives it an address from the office DHCP server, and the team can now browse to it directly. A separate malware-analysis VM stays on an internal network with no outside access.",
  "tip": "NAT: VM gets out, outsiders cannot easily get in. Bridged: VM is a full peer on the LAN with its own IP. Internal: VMs talk only to each other. If a VM will not start, check VT-x or AMD-V in firmware; if everything is slow, check host RAM.",
  "check": [
   [
    "Which VM network mode should you choose so other computers on the LAN can connect to a server running in the VM?",
    "Bridged mode, which gives the VM its own address on the physical network."
   ],
   [
    "Which setting must be enabled in firmware for most modern hypervisors to run VMs?",
    "Hardware virtualization support: Intel VT-x or AMD-V."
   ],
   [
    "What is the advantage of a dynamically expanding virtual disk?",
    "It uses only as much host storage as the guest has actually written, saving space until it is needed."
   ]
  ]
 },
 {
  "t": "Security for VMs: isolation, snapshots, patching guests",
  "body": [
   "Virtual machines bring real security benefits, but they are not magically safe. Each VM runs a full operating system that can be attacked, and the hypervisor becomes a critical piece of infrastructure. Securing VMs means relying on isolation correctly, using snapshots wisely and patching guests just as carefully as physical machines.",
   "Isolation is the core promise of virtualization: each VM has its own memory, virtual disk and virtual hardware, and the hypervisor prevents one guest from reading or changing another guest's memory or the host's. That is why VMs are used for sandboxes and testing. Isolation can be weakened by configuration choices, however. Shared folders, a shared clipboard, drag-and-drop and USB passthrough all create paths between guest and host; disable them for any VM that handles untrusted content. Network settings matter too; a malware-analysis VM should use an internal or host-only network, not bridged mode. A rare but serious class of attack called VM escape exploits a hypervisor flaw to break out of a guest and reach the host or other guests, which is why hypervisors themselves must be patched promptly.",
   "Snapshots capture the state of a VM at a moment in time, including its disk and optionally its memory. They are excellent for security work and testing: take a snapshot before installing an update or opening a suspicious file, and revert if anything goes wrong. They are not backups, though. A snapshot depends on the original virtual disk, lives on the same storage and slows performance and consumes space if kept for a long time. Keep snapshots short-lived and use proper backups for recovery. Be aware that reverting a snapshot also rolls back security patches and antivirus definitions applied after it was taken, so patch again after reverting.",
   "Patching guests is essential because every VM is a full operating system with the same vulnerabilities as a physical computer. Each guest needs OS updates, application updates, endpoint protection, a host firewall and strong account security. VMs that are powered off for long periods, or created from old templates, can miss months of patches; update them as soon as they are started and keep templates current. VM sprawl, where many forgotten VMs accumulate, creates unpatched and unmonitored machines, so keep an inventory and remove VMs no longer needed.",
   "The host and hypervisor need the same attention. Apply hypervisor updates, restrict who can access the management console, use strong authentication and separate the management network from ordinary traffic. Anyone who controls the hypervisor controls every VM on it."
  ],
  "terms": [
   [
    "Isolation",
    "The separation that keeps a VM's memory, storage and processes apart from the host and other VMs."
   ],
   [
    "Snapshot",
    "A point-in-time capture of a VM's state that can be reverted to later."
   ],
   [
    "VM escape",
    "An attack that exploits a hypervisor flaw to break out of a guest and access the host or other VMs."
   ],
   [
    "VM sprawl",
    "The uncontrolled growth of VMs, many forgotten and unpatched, in an environment."
   ]
  ],
  "example": "A security analyst takes a snapshot of a clean analysis VM, disables shared folders and the shared clipboard, sets the network to internal only and then opens a suspicious attachment. After observing its behavior, she reverts to the snapshot, returning the VM to a known-clean state without touching the host.",
  "tip": "Snapshots are not backups. Reverting a snapshot can undo patches. Shared folders, clipboard and USB passthrough weaken isolation. Guests need patching and antivirus just like physical PCs, and the hypervisor must be patched too.",
  "check": [
   [
    "Why is a snapshot not a substitute for a backup?",
    "It depends on the original virtual disk, usually lives on the same storage and is not designed for long-term recovery."
   ],
   [
    "Which VM features should be disabled when analyzing untrusted files?",
    "Shared folders, shared clipboard, drag-and-drop, USB passthrough and bridged networking."
   ],
   [
    "What should you do after reverting a VM to an older snapshot?",
    "Reapply any security updates and antivirus definitions released since the snapshot was taken."
   ]
  ]
 },
 {
  "t": "Containers vs virtual machines",
  "body": [
   "Containers and virtual machines both let you run applications in isolated environments on shared hardware, but they isolate at different levels. Understanding the difference helps you see why modern applications are often packaged in containers while VMs remain essential for running whole operating systems.",
   "A virtual machine virtualizes hardware. The hypervisor presents virtual CPU, memory, disk and network devices, and each VM runs a complete guest operating system with its own kernel on top of them. That makes VMs heavy: each one may need gigabytes of disk and memory and takes a while to boot. In exchange they provide strong isolation and flexibility. One host can run Windows, Linux and other operating systems side by side, because each VM carries its own OS.",
   "A container virtualizes the operating system instead. Containers on a host share the host's OS kernel, and a container engine, such as Docker or another runtime, uses kernel features to give each container its own isolated view of files, processes and network. A container image bundles an application with only the libraries and settings it needs, not a whole operating system. As a result containers are small, often megabytes rather than gigabytes, start in seconds or less and let you pack many more onto one host.",
   "The main trade-offs follow from the shared kernel. Containers must match the host's kernel type, so Linux containers need a Linux kernel; running them on Windows or macOS relies on a lightweight Linux VM behind the scenes. Isolation is weaker than a VM's because a kernel vulnerability could affect every container on the host, so containers are often run inside VMs in cloud environments for added protection. Containers are also designed to be disposable; data that must persist is stored in volumes outside the container.",
   "Containers solve the classic problem of software working on one machine but not another, because the image carries everything the application needs and runs the same everywhere. They are central to microservices, where an application is split into many small services, and are usually managed at scale by orchestration platforms such as Kubernetes. Choose a VM when you need a full operating system, a different OS than the host, strong isolation or a legacy application. Choose containers when you want lightweight, fast, portable deployment of many instances of modern applications."
  ],
  "terms": [
   [
    "Container",
    "A lightweight, isolated package of an application and its dependencies that shares the host OS kernel."
   ],
   [
    "Container image",
    "A read-only template that bundles an application with its libraries and settings, used to start containers."
   ],
   [
    "Kernel",
    "The core of an operating system that manages hardware and processes; containers share the host's kernel."
   ],
   [
    "Orchestration",
    "Automated management of many containers across hosts, for example with Kubernetes."
   ]
  ],
  "example": "A development team's web app works on one developer's laptop but fails on the test server because of a different library version. They package the app as a container image that includes the correct library, and it now runs identically on laptops, the test server and in the cloud, starting in seconds each time.",
  "tip": "The key distinction: VMs each have their own full OS and kernel on a hypervisor; containers share the host kernel through a container engine. Containers are lighter and faster; VMs isolate more strongly and can run different operating systems.",
  "check": [
   [
    "Why do containers start faster and use less space than VMs?",
    "They share the host's kernel and include only the application and its dependencies, not a full guest operating system."
   ],
   [
    "When is a VM a better choice than a container?",
    "When you need a full or different operating system, stronger isolation or support for a legacy application."
   ],
   [
    "What does a container engine such as Docker do?",
    "It creates and runs containers from images, isolating them using features of the shared host kernel."
   ]
  ]
 },
 {
  "t": "Virtual desktop infrastructure (VDI) and desktop as a service",
  "body": [
   "Virtual desktops move a user's desktop environment off the physical computer and into a data center or the cloud. The user connects from almost any device and sees a full desktop with their applications and files, but the processing and data stay on central servers. This makes desktops easier to manage, more secure and available from anywhere.",
   "VDI (virtual desktop infrastructure) is the on-premises approach. An organization runs virtual desktop VMs on its own hypervisor hosts in its data center, along with a connection broker that authenticates users and connects them to the right desktop. Users connect through a client app or web browser using a remote display protocol, such as Microsoft's RDP (Remote Desktop Protocol) or vendor-specific protocols. Desktops can be persistent, where each user keeps their own VM with their changes, or non-persistent, where users get a fresh desktop from a standard image each time they log in, with their profile and data stored separately. Non-persistent desktops are easy to patch and keep clean because you update one master image.",
   "DaaS (desktop as a service) delivers the same idea from a cloud provider. The provider runs and maintains the infrastructure, and the organization pays a subscription, typically per user. Examples include Microsoft's cloud PC and virtual desktop offerings and Amazon WorkSpaces. DaaS avoids the up-front cost of servers and storage and makes it easy to add or remove desktops as staff numbers change, while the organization still manages the desktop images, applications and user access.",
   "Virtual desktops bring clear benefits. Data stays in the data center or cloud, so a lost laptop or thin client exposes little. Users can work from home, from a personal device or from a cheap thin client, a small low-powered computer designed only to connect to remote desktops. IT can patch and update centrally and quickly provision desktops for new staff or contractors. There are also trade-offs: virtual desktops depend on a reliable, reasonably fast network connection, and poor latency makes them feel sluggish; graphics-heavy work may need GPU-enabled virtual desktops; and VDI requires significant server, storage and licensing investment.",
   "When supporting a virtual desktop user, remember that problems may be local (their network, client software or peripherals such as USB devices and webcams that must be redirected to the session) or remote (the virtual desktop itself, the broker or the host). Test the user's internet connection and whether other users are affected before diving into the desktop image."
  ],
  "terms": [
   [
    "VDI",
    "Virtual desktop infrastructure, hosting user desktops as VMs on an organization's own servers."
   ],
   [
    "DaaS",
    "Desktop as a service, virtual desktops delivered by a cloud provider on a subscription basis."
   ],
   [
    "Connection broker",
    "The VDI component that authenticates users and connects them to their virtual desktops."
   ],
   [
    "Thin client",
    "A low-powered device designed mainly to connect to remote or virtual desktops."
   ],
   [
    "Non-persistent desktop",
    "A virtual desktop reset to a standard image at each login, with user data stored separately."
   ]
  ],
  "example": "A call center hires fifty seasonal staff for three months. Rather than buy fifty PCs, the company adds fifty DaaS desktops to its subscription, ships inexpensive thin clients to home workers and removes the desktops when the season ends, while customer data never leaves the cloud environment.",
  "tip": "VDI is hosted on the organization's own infrastructure; DaaS is the cloud-hosted subscription version. Both depend on the network, so slow or laggy virtual desktops often point to connection quality.",
  "check": [
   [
    "What is the main difference between VDI and DaaS?",
    "VDI runs on the organization's own servers, while DaaS is provided and hosted by a cloud provider as a subscription."
   ],
   [
    "Why do virtual desktops improve data security for lost laptops?",
    "Data and processing stay on central servers, so the endpoint stores little or no sensitive data."
   ],
   [
    "A remote worker reports that the virtual desktop is very laggy, but others are fine. What should you check first?",
    "The user's own network connection quality, such as bandwidth and latency."
   ]
  ]
 },
 {
  "t": "Cloud deployment models: public, private, hybrid, community",
  "body": [
   "Cloud computing delivers computing resources such as servers, storage, databases and applications over a network on demand. A deployment model describes who owns and uses the cloud infrastructure and who can share it. The exam uses four models, and scenario questions ask you to pick the right one.",
   "A public cloud is owned and operated by a third-party provider and offered to the general public over the internet. Many customers share the same massive infrastructure, each isolated from the others. Well-known examples include Amazon Web Services, Microsoft Azure and Google Cloud. Public cloud requires no up-front hardware purchase, scales almost without limit and charges for what you use. The trade-offs are less direct control over the infrastructure and the need to trust the provider with data, which can raise compliance questions for some industries.",
   "A private cloud is used exclusively by a single organization. It can be run in the organization's own data center or hosted by a provider on dedicated hardware. It offers cloud features such as self-service and automation while giving the organization full control over security, compliance and customization. It costs more because the organization pays for all of the capacity, whether used or not, and must maintain or pay for the infrastructure.",
   "A hybrid cloud combines two or more models, usually a private cloud or on-premises data center with a public cloud, connected so data and applications can move between them. A company might keep sensitive customer records on its private infrastructure while running its public website or burst workloads in the public cloud. Cloud bursting, where an application runs privately but overflows into the public cloud during peak demand, is a classic hybrid use. Hybrid gives flexibility but adds complexity in networking, security and management.",
   "A community cloud is shared by several organizations with common needs, such as the same regulatory requirements, mission or security concerns. Examples include a group of hospitals, government agencies or universities that share infrastructure designed for their specific compliance rules. Costs are spread among the members, making it cheaper than each running its own private cloud while offering more control than a general public cloud. To choose a model, ask who needs to use the resources, how sensitive the data is, what regulations apply and how much the organization wants to invest in and control the infrastructure."
  ],
  "terms": [
   [
    "Public cloud",
    "Cloud infrastructure owned by a provider and shared by many customers over the internet."
   ],
   [
    "Private cloud",
    "Cloud infrastructure dedicated to a single organization."
   ],
   [
    "Hybrid cloud",
    "A combination of private or on-premises infrastructure with public cloud, working together."
   ],
   [
    "Community cloud",
    "Cloud infrastructure shared by organizations with common requirements, such as regulation."
   ],
   [
    "Cloud bursting",
    "Running a workload privately and overflowing into public cloud during demand peaks."
   ]
  ],
  "example": "A regional hospital group must keep patient records under strict control but wants to handle seasonal spikes in its online appointment system. It keeps records in a private cloud and runs the appointment website in the public cloud, a hybrid model. Several hospitals in the region also share a community cloud for a common imaging archive that meets their shared health-data regulations.",
  "tip": "Look for the ownership clue: shared with anyone means public; one organization means private; a mix means hybrid; several organizations with shared rules or mission means community.",
  "check": [
   [
    "Several government agencies with the same security requirements share cloud infrastructure. Which model is this?",
    "A community cloud."
   ],
   [
    "What is the main advantage of a private cloud over a public cloud?",
    "Greater control over security, compliance and customization, because the infrastructure is dedicated to one organization."
   ],
   [
    "A company keeps its database on-premises but runs its web front end in a public cloud. Which model is this?",
    "Hybrid cloud."
   ]
  ]
 },
 {
  "t": "Cloud service models: IaaS, PaaS, SaaS",
  "body": [
   "Cloud service models describe how much of the technology stack the provider manages and how much the customer manages. Think of the stack as layers: physical hardware and networking at the bottom, then virtualization, operating system, middleware and runtime, then applications and data at the top. Each model hands more of those layers to the provider.",
   "IaaS (infrastructure as a service) provides the basic building blocks: virtual machines, storage, networks and load balancers, rented on demand. The provider manages the physical data center, hardware and virtualization. The customer manages everything above that: installing and patching the operating system, configuring firewalls, installing applications and securing data. IaaS gives the most control and flexibility and is the closest to running your own servers. Examples are renting virtual servers or block storage from a major cloud provider. It suits organizations moving existing servers to the cloud with minimal change.",
   "PaaS (platform as a service) provides a ready-to-use platform for building and running applications. The provider also manages the operating system, runtime, middleware and often databases, including patching and scaling. The customer focuses only on their application code and data. Developers simply upload code and the platform runs it. Examples include managed application hosting services and managed database services. PaaS speeds up development but gives less control over the underlying environment and can create some dependence on the provider's specific platform.",
   "SaaS (software as a service) delivers complete applications over the internet, usually through a web browser or app, on a subscription. The provider manages everything, including the application itself; the customer just uses it and manages its own users, settings and data. Examples include web-based email and office suites, customer relationship management systems and online file-sharing services. SaaS requires the least technical effort but offers the least control over how the software works.",
   "The shared responsibility model follows from these layers. In every model the provider secures the physical infrastructure, and in every model the customer remains responsible for its data and for who has access to it. With IaaS the customer also patches the OS; with PaaS the provider does. A simple analogy: IaaS is renting an empty kitchen and cooking yourself, PaaS is a kitchen with cooks and ingredients ready while you provide the recipe, and SaaS is ordering a finished meal. Some sources add other as-a-service models, but IaaS, PaaS and SaaS are the three the exam focuses on."
  ],
  "terms": [
   [
    "IaaS",
    "Infrastructure as a service: rented virtual machines, storage and networks; the customer manages the OS and above."
   ],
   [
    "PaaS",
    "Platform as a service: a managed platform where the customer supplies only application code and data."
   ],
   [
    "SaaS",
    "Software as a service: a complete application delivered over the internet on subscription."
   ],
   [
    "Shared responsibility model",
    "The division of security and management duties between the cloud provider and the customer."
   ]
  ],
  "example": "A small company replaces its on-site mail server with a web-based email subscription (SaaS). Its developers deploy a new customer portal by uploading code to a managed application platform (PaaS). An old inventory server that needs a specific OS configuration is moved to a rented cloud virtual machine (IaaS), where the IT team still applies OS patches.",
  "tip": "Ask who patches the operating system: the customer in IaaS, the provider in PaaS and SaaS. In SaaS the customer just uses the application. Data and access are always the customer's responsibility.",
  "check": [
   [
    "In which service model is the customer responsible for patching the operating system?",
    "IaaS."
   ],
   [
    "A development team wants to deploy code without managing servers or operating systems. Which model fits?",
    "PaaS."
   ],
   [
    "Web-based email used through a browser on a subscription is an example of which model?",
    "SaaS."
   ]
  ]
 },
 {
  "t": "Cloud characteristics: shared vs dedicated resources, metered utilization, rapid elasticity, high availability, multitenancy, file synchronization",
  "body": [
   "Several characteristics set cloud computing apart from traditional IT, and the exam expects you to recognize them by name and by description. Most come from the standard definition of cloud computing: on-demand self-service, broad network access, resource pooling, rapid elasticity and measured service.",
   "Resources in the cloud can be shared or dedicated. Shared resources mean many customers' workloads run on the same physical servers, storage and networks, kept separate by virtualization and software controls. This resource pooling is what makes public cloud cheap and efficient. Dedicated resources are physical hardware reserved for one customer, such as dedicated hosts or private cloud hardware. They cost more but can satisfy strict compliance or licensing requirements and avoid performance impact from other tenants.",
   "Multitenancy is the architecture behind shared resources: a single instance of infrastructure or software serves multiple customers, called tenants, each seeing only its own data and configuration. A SaaS email service with thousands of companies on the same platform is multitenant. The key security requirement is strong isolation, so one tenant can never see another's data.",
   "Metered utilization, also called measured service, means the provider measures what you use, such as compute hours, storage gigabytes or data transferred, and bills accordingly, much like a utility such as electricity. This pay-as-you-go model turns large up-front capital costs into ongoing operating costs, but it also means an unused VM left running or excessive data transfer still costs money, so usage should be monitored. Rapid elasticity is the ability to scale resources up or out quickly, often automatically, when demand grows and back down when it falls. An online retailer can add servers during a holiday sale and remove them afterward, paying only for the extra capacity while it is used. Scalability is the general ability to grow; elasticity emphasizes growing and shrinking automatically with demand.",
   "High availability means designing services to keep running despite failures, by using redundant components, multiple servers behind load balancers and multiple data centers or availability zones in different locations. Cloud providers publish availability commitments in a service level agreement (SLA). File synchronization keeps copies of files consistent across devices and the cloud: edit a document on a laptop, and the updated version appears on your phone and in the web interface. Sync services also offer version history, which helps recover from accidental changes or ransomware, though sync alone is not a full backup because deletions and corruption can sync too."
  ],
  "terms": [
   [
    "Rapid elasticity",
    "The ability to scale cloud resources up and down quickly, often automatically, with demand."
   ],
   [
    "Metered utilization",
    "Measuring resource use and billing for what is consumed, like a utility."
   ],
   [
    "Multitenancy",
    "One instance of infrastructure or software serving multiple isolated customers."
   ],
   [
    "High availability",
    "Designing systems with redundancy so services keep running through component failures."
   ],
   [
    "File synchronization",
    "Keeping copies of files consistent across devices and cloud storage automatically."
   ]
  ],
  "example": "An online ticket seller expects huge traffic when concert sales open. Its cloud setup automatically adds web servers as load rises and removes them afterward (rapid elasticity), bills only for the extra hours used (metered utilization) and spreads servers across multiple data centers so one outage does not stop sales (high availability).",
  "tip": "Match the words: scale with demand is rapid elasticity; pay for what you use is metered utilization; many customers on the same platform is multitenancy; survives failures is high availability. Sync is not a backup, because deletions sync too.",
  "check": [
   [
    "Which cloud characteristic lets resources grow and shrink automatically with demand?",
    "Rapid elasticity."
   ],
   [
    "What does multitenancy mean?",
    "One infrastructure or software instance serves multiple customers, each isolated so they see only their own data."
   ],
   [
    "Why is file synchronization not a replacement for backup?",
    "Deletions, corruption and ransomware-encrypted files can sync to every copy; version history helps but a separate backup is still needed."
   ]
  ]
 },
 {
  "t": "The CompTIA troubleshooting methodology: identify (question users, back up, check recent changes), theorize, test, plan, implement, verify, document",
  "body": [
   "CompTIA teaches a structured troubleshooting methodology, and it appears throughout both A+ exams. Following a consistent process stops you from guessing, making things worse or fixing a symptom while missing the real cause. Learn the steps in order, because questions often ask what you should do next.",
   "Step 1 is to identify the problem. Gather information by questioning the user and identifying their changes to the computer: what happened, when it started, what they were doing, whether there were error messages and whether anything changed recently, such as new software, updates, hardware or a move to a new desk. Review system and application logs, and try to reproduce the issue. Before you make changes, back up data where appropriate so that nothing is lost if a repair goes wrong. Also consider corporate policies, procedures and the impact of any change on other users; some fixes require approval through change management. Duplicate the problem if you can, and approach multiple problems one at a time.",
   "Step 2 is to establish a theory of probable cause, and question the obvious. Start with simple, likely explanations, such as a loose cable or a disabled setting, before complex ones. If necessary, conduct external or internal research based on symptoms, such as vendor knowledge bases and documentation. Step 3 is to test the theory to determine the cause. If the theory is confirmed, determine the next steps to resolve the problem. If it is not confirmed, establish a new theory or escalate to someone with more expertise or access.",
   "Step 4 is to establish a plan of action to resolve the problem and implement the solution, taking into account vendor instructions and any corporate change procedures, and escalating if the fix is beyond your access or expertise. For example, replacing a server drive may need to wait for a maintenance window. Step 5 is to verify full system functionality and, if applicable, implement preventive measures. Confirm with the user that everything works, not just the one symptom, and consider how to stop it happening again, such as scheduling updates or adding a surge protector.",
   "Step 6 is to document findings, actions and outcomes, usually in the ticketing system. Record the symptoms, the cause, what you tried, what fixed it and any follow-up. Good documentation helps the next technician, builds a knowledge base of known fixes and shows patterns such as a batch of failing devices. A useful memory aid for the six steps is: identify, theorize, test, plan and implement, verify, document."
  ],
  "terms": [
   [
    "Theory of probable cause",
    "Your best explanation of what is causing the problem, formed after gathering information."
   ],
   [
    "Escalation",
    "Passing a problem to a more experienced technician or specialized team when you cannot resolve it."
   ],
   [
    "Preventive measures",
    "Actions taken after a fix to stop the problem from recurring."
   ],
   [
    "Change management",
    "The formal process for approving and scheduling changes to systems to limit risk."
   ]
  ],
  "example": "A user's PC started crashing yesterday. You ask questions and learn a new graphics driver was installed that morning, so you back up the user's files, theorize the driver is at fault, roll it back and see the crashes stop. You confirm all applications work, pause that driver update in the management tool and record everything in the ticket.",
  "tip": "Know the exact order and the details inside step 1: question the user, identify recent changes and back up data before making changes. Documentation is always the final step, and verification includes preventive measures.",
  "check": [
   [
    "What should you do if testing does not confirm your theory?",
    "Establish a new theory or escalate the problem."
   ],
   [
    "At which step should you back up data?",
    "During step 1, identifying the problem, before making changes."
   ],
   [
    "What is the last step of the CompTIA troubleshooting methodology?",
    "Document findings, actions and outcomes."
   ]
  ]
 },
 {
  "t": "Motherboard, RAM, CPU and power problems: POST beeps, no power, overheating shutdowns, blue screens, burning smell, swollen capacitors, date/time resets",
  "body": [
   "Core hardware problems often present as dramatic symptoms: a computer that will not turn on, beeps at startup, shuts down suddenly or shows a stop error. Learning to connect each symptom to its likely causes lets you narrow down the fault quickly and safely.",
   "POST (power-on self-test) is the firmware's startup check of core hardware. If it finds a problem before video is available, it reports the error with beep codes, and many boards also have diagnostic LEDs or a two-digit code display. Beep patterns differ between firmware makers, so look up the pattern in the motherboard manual. Commonly, repeated beeps or no video with beeps point to RAM that is missing or not seated, or to a video problem. Reseating the memory is a quick first test. If there are no beeps, no fans and no lights at all, the system is getting no power.",
   "For no power, work from the outside in. Check the outlet with another device, the power strip or surge protector, the power cable, the switch on the back of the PSU and its voltage selector if present. Inside, confirm the 24-pin and CPU power connectors are seated and that the front-panel power switch is connected to the right header pins. Test the PSU with a power supply tester or multimeter, or substitute a known-good unit. If fans spin but nothing appears on screen, suspect RAM, CPU, graphics or the motherboard, and try minimal configuration: only CPU, one RAM module and graphics.",
   "Overheating causes sudden shutdowns or reboots, especially under load, and CPU throttling that makes the system slow. Check for dust-clogged heat sinks and filters, failed fans, blocked vents, a poorly mounted cooler or dried thermal paste, and view temperatures in the firmware or a monitoring utility. Blue screens, known as BSOD (blue screen of death) or stop errors in Windows, can come from faulty RAM, failing drives, overheating or bad drivers. Note the stop code, check Event Viewer and run a memory test. Intermittent random crashes that move around between applications often point to RAM or power.",
   "Some symptoms mean stop immediately. A burning smell or visible smoke indicates a component or PSU is overheating or has failed; power off, unplug and do not power it on again until the source is found and replaced. Swollen or leaking capacitors on the motherboard, recognized by domed or crusty tops, cause instability or failure to boot; the fix is to replace the motherboard or the affected power supply. Finally, if the date and time reset every time the computer is unplugged, or firmware settings keep returning to defaults, the CMOS battery, usually a coin cell such as a CR2032, is dead and should be replaced."
  ],
  "terms": [
   [
    "POST",
    "Power-on self-test, the firmware's check of core hardware at startup."
   ],
   [
    "Beep code",
    "A pattern of beeps the firmware uses to report a POST error before video is available."
   ],
   [
    "BSOD",
    "Blue screen of death, a Windows stop error caused by a critical system fault."
   ],
   [
    "CMOS battery",
    "A coin-cell battery that keeps the real-time clock and firmware settings when the PC is unplugged."
   ],
   [
    "Swollen capacitor",
    "A failing capacitor with a bulging or leaking top, causing instability or failure to boot."
   ]
  ],
  "example": "An office PC loses its clock setting every Monday after the building's weekend power shutdown, and occasionally shows a warning about firmware settings. You replace the CMOS coin-cell battery, set the date and time in UEFI and the problem stops.",
  "tip": "Date and time resetting means CMOS battery. Burning smell means power off immediately. Shutdowns under load mean overheating. Beeps with no video often mean RAM, but always check the board's manual because beep codes vary by manufacturer.",
  "check": [
   [
    "A PC's clock resets to a default date each time it is unplugged. What should you replace?",
    "The CMOS battery on the motherboard."
   ],
   [
    "A computer shuts down only when playing games or rendering video. What is the most likely cause?",
    "Overheating, from dust, a failed fan or poor thermal paste, or possibly an overloaded power supply."
   ],
   [
    "What should you do immediately if a PC gives off a burning smell?",
    "Power it off and unplug it, then find and replace the failed component before using it again."
   ]
  ]
 },
 {
  "t": "Storage problems: clicking or grinding noises, S.M.A.R.T. warnings, bootable device not found, slow performance, degraded or failed RAID",
  "body": [
   "Storage failures matter more than most hardware problems because they put user data at risk. The first priority when a drive shows signs of failure is to back up the data if you still can; diagnosis and repair come second.",
   "Clicking or grinding noises from a hard disk drive (HDD) are a serious warning. A repeated click often means the read/write head cannot find or read the platters, and grinding suggests physical damage. Stop using the drive for anything except copying off important data, and replace it. Do not open the drive; hard drives are sealed, and professional data recovery services are needed if the data is critical and cannot be copied. SSDs have no moving parts, so they fail silently, which makes monitoring even more important.",
   "S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) is built into HDDs and SSDs. It tracks health indicators such as reallocated sectors, read errors, temperature and, on SSDs, wear levels. When values cross a threshold, the firmware, operating system or a utility such as CrystalDiskInfo reports a warning, sometimes at startup. A S.M.A.R.T. warning means the drive is predicting its own failure; back up immediately and plan a replacement.",
   "A message such as bootable device not found, no boot device or operating system not found means the firmware cannot find something to boot. Check the boot order in UEFI settings, and remove any USB drive or disc the system might be trying to boot from. Confirm the drive is detected in firmware; if not, check the data and power cables or reseat the M.2 drive. Also check that the firmware mode matches the disk (UEFI for GPT disks, legacy for MBR). If the drive is detected but the OS still will not start, the boot files may be damaged and can be repaired with the Windows recovery environment. If the drive is not detected at all after reseating, it has likely failed.",
   "Slow performance can have storage causes. An HDD that is nearly full, heavily fragmented or developing bad sectors will be slow; an SSD that is almost full may also slow down. Check free space, run the appropriate optimization tool (defragmenting an HDD, while Windows handles SSDs with TRIM), check S.M.A.R.T. health and confirm the drive is running in its fastest mode. Upgrading from an HDD to an SSD is often the biggest single speed improvement for an older PC.",
   "In a RAID array, a degraded status means a drive has failed but the array is still working using its redundancy, as with a RAID 1, 5, 6 or 10 that has lost one drive. It is urgent: replace the failed drive promptly and let the array rebuild, because another failure could lose the data. A failed array has lost more drives than its redundancy allows, or it was RAID 0 with any drive lost, and the data must be restored from backup. RAID management software or the controller's utility shows array status and alerts."
  ],
  "terms": [
   [
    "S.M.A.R.T.",
    "Self-Monitoring, Analysis and Reporting Technology, drive firmware that tracks health and predicts failure."
   ],
   [
    "Degraded array",
    "A RAID array that has lost a drive but still works using redundancy."
   ],
   [
    "Boot order",
    "The firmware setting that decides which device the system tries to boot from first."
   ],
   [
    "TRIM",
    "A command that lets the OS tell an SSD which blocks are no longer in use, helping maintain performance."
   ]
  ],
  "example": "A server's RAID management tool reports a degraded RAID 5 array after one of four drives fails. You confirm recent backups, hot-swap the failed drive with an identical replacement and monitor the rebuild. Had a second drive failed before the replacement, the array would have failed and required a restore.",
  "tip": "Clicking or grinding or a S.M.A.R.T. warning means back up now and replace the drive. Degraded RAID means replace the failed drive urgently; failed RAID means restore from backup. Boot device not found starts with boot order and removable media.",
  "check": [
   [
    "What should you do first when a hard drive starts clicking?",
    "Back up important data immediately, then replace the drive."
   ],
   [
    "What does a degraded RAID 1 status mean?",
    "One mirrored drive has failed, and the array is running on the remaining drive without redundancy; replace the failed drive promptly."
   ],
   [
    "A PC shows bootable device not found after a user left a USB stick plugged in. What should you check?",
    "Remove the USB stick and check the boot order so the internal drive is tried first."
   ]
  ]
 },
 {
  "t": "Video, projector and display problems: no image, dim image, dead pixels, flickering, burn-in, fuzzy image at non-native resolution, projector overheating",
  "body": [
   "Display problems are easy for users to see but can come from the monitor, the cable, the graphics hardware, the driver or the settings. Work from the simplest checks to the most complex, and use a second monitor or cable to isolate the fault quickly.",
   "For no image, check that the monitor is powered on and its power light is lit, that the brightness is not turned all the way down and that the correct input source, such as HDMI 1 or DisplayPort, is selected on the monitor. Check both ends of the video cable, and make sure the cable is connected to the graphics card rather than the motherboard if a dedicated card is installed. Try another cable or a known-good monitor. On a laptop, try the function key that switches between internal and external displays. If the PC beeps at startup or shows no signs of POST, look at graphics or core hardware.",
   "A dim image on an LCD usually points to low brightness settings, a power-saving mode or a failing backlight. If you can faintly see the image when shining a flashlight on the screen, the backlight or its power circuit has failed. Flickering can come from a loose or damaged cable, a refresh rate the monitor does not support, an outdated or faulty graphics driver or, on laptops, a worn display cable in the hinge; if flickering happens when the lid moves, suspect the hinge cable. Nearby electrical interference can also cause it.",
   "Dead pixels are stuck black because the pixel receives no power, while stuck pixels stay one color such as red, green or blue. Stuck pixels sometimes recover with pixel-exercising software, but dead pixels usually do not; check the manufacturer's warranty policy, which often requires a minimum number of bad pixels before replacement. Burn-in, sometimes called image retention or ghosting, leaves a faint permanent image of static content such as a taskbar, most commonly on OLED and older plasma displays. Prevent it with screen savers, auto-hide taskbars and power-off timers.",
   "A fuzzy or blurry image, or text that looks soft, often means the display is set to a resolution that is not its native resolution, forcing it to scale. Set the resolution to the value marked recommended in the display settings and use scaling to make text larger instead. A stretched image means the aspect ratio does not match.",
   "Projectors have their own issues. The lamp gets very hot, and a projector that shuts off after running for a while is often overheating because of blocked vents, a clogged air filter or a failed fan; clean or replace the filter and keep vents clear. Lamps have a limited life and grow dimmer with age, so a dim projector image may simply mean the lamp needs replacing. Let a projector cool fully before unplugging it or changing the lamp, and never touch a new lamp's glass with bare fingers."
  ],
  "terms": [
   [
    "Native resolution",
    "The physical pixel count of a display; other resolutions look fuzzy because of scaling."
   ],
   [
    "Dead pixel",
    "A pixel that stays black because it receives no power."
   ],
   [
    "Stuck pixel",
    "A pixel that stays lit in one color."
   ],
   [
    "Burn-in",
    "A permanent ghost image left by static content, most common on OLED and plasma screens."
   ],
   [
    "Input source",
    "The monitor setting that selects which connector, such as HDMI or DisplayPort, it displays."
   ]
  ],
  "example": "A conference room projector shuts off about forty minutes into every meeting. You find its air filter packed with dust and one vent pushed against the wall. After cleaning the filter, repositioning the projector for airflow and confirming the fan runs, it runs through meetings without shutting down.",
  "tip": "No image: check power, input source, cable and brightness first. Flashlight shows faint image: backlight. Fuzzy text: non-native resolution. Flicker with lid movement: hinge cable. Projector shutting off: overheating from filter or vents.",
  "check": [
   [
    "Text looks blurry on a new monitor. What is the most likely cause?",
    "The display is not set to its native resolution; set it to the recommended resolution."
   ],
   [
    "A projector turns off after running for a while. What should you check?",
    "Overheating: a clogged air filter, blocked vents or a failed fan."
   ],
   [
    "How can you tell a failed backlight from a failed LCD panel?",
    "Shine a flashlight on the screen; if you can faintly see the image, the panel works and the backlight has failed."
   ]
  ]
 },
 {
  "t": "Mobile device problems: poor battery life, swollen battery, overheating, slow charging, broken screen, cursor drift, liquid damage, no connectivity",
  "body": [
   "Mobile devices fail in predictable ways, many linked to their batteries, radios and the rough handling they receive. Troubleshooting them combines checking settings, which you can fix, with recognizing hardware problems, which usually need repair or replacement.",
   "Poor battery life usually comes from high screen brightness, apps running constantly in the background, weak signal making the radio work harder, location services and old battery chemistry. Check the battery usage screen to find draining apps, lower brightness, disable unused radios and enable battery saver. Lithium-ion batteries lose capacity with age and charge cycles; the device's battery health screen or a diagnostic tool can show this, and an old battery needs replacing. A swollen battery is dangerous. Signs include a screen lifting from its frame, a bulging back panel, a trackpad that no longer clicks or a device that rocks on a flat surface. Stop using and charging the device, do not puncture or press on the battery and have it replaced and disposed of according to hazardous waste rules.",
   "Overheating can come from intensive apps and games, charging while in heavy use, direct sunlight, a thick case blocking heat, a failing battery or malware. Close demanding apps, remove the case and let the device cool. Persistent heat with little activity may mean a failing battery. Slow charging is often a cable or charger issue: try a known-good cable and a charger that supports the device's fast-charging standard, and clean lint out of the charging port gently with a non-conductive tool. Charging over a computer's USB port is slower than a wall charger.",
   "A broken screen is usually replaced as an assembly. If the image is fine but touch fails in places, the digitizer is damaged. Cursor drift, also called ghost touch on phones, is when the pointer or touches move on their own. On laptops it can come from a dirty or damp trackpad, a swollen battery pressing on the trackpad or driver problems; on touchscreens, from a cracked digitizer, a poor screen protector or a faulty charger. Calibrating and updating drivers may help.",
   "Liquid damage requires fast action: power the device off immediately, do not charge it, remove the case and any removable cards and let it dry thoroughly before trying it. Many devices have liquid contact indicators that change color, which can affect warranty. Corrosion can cause failure days or weeks later. For no connectivity, check that airplane mode is off, that Wi-Fi, Bluetooth or cellular is enabled, that the device is within range and the correct network and password are in use and that the SIM or eSIM is active. Forget and rejoin the network, restart the device and, as a later step, reset network settings. If a single app cannot connect, check its permissions and data usage restrictions."
  ],
  "terms": [
   [
    "Swollen battery",
    "A lithium-ion battery that has expanded from internal gas buildup and is a fire hazard."
   ],
   [
    "Cursor drift",
    "Unwanted pointer movement or ghost touches without user input."
   ],
   [
    "Liquid contact indicator",
    "A small sticker inside a device that changes color when exposed to liquid."
   ],
   [
    "Battery health",
    "A measure of a battery's remaining capacity compared with when it was new."
   ]
  ],
  "example": "A user reports that her laptop's trackpad no longer clicks and the case has started to separate near the front. You recognize the signs of a swollen battery pressing up under the trackpad, advise her to stop using and charging it immediately and arrange a battery replacement and safe disposal.",
  "tip": "Swollen battery signs include a lifted screen, bulging case or unclickable trackpad; stop using it immediately. For liquid damage, power off and do not charge. For no connectivity, check airplane mode first.",
  "check": [
   [
    "What should a user do immediately after dropping a phone in water?",
    "Power it off, do not charge it, remove the case and cards and let it dry thoroughly before trying it."
   ],
   [
    "Which setting should you check first when a phone has no Wi-Fi or cellular connection?",
    "Airplane mode, to make sure it is off and the radios are enabled."
   ],
   [
    "Name two common causes of poor battery life on a phone.",
    "Examples include high screen brightness, background apps, weak signal, constant location use and an aging battery."
   ]
  ]
 },
 {
  "t": "Printer problems: faded or streaked prints, ghost images, toner not fused, paper jams, garbled print, stuck print queue, incorrect paper settings",
  "body": [
   "Printer problems are among the most common help desk tickets, and the exam frequently links a print defect to the component that causes it. When you know how the laser printing process works, most defects point clearly to a part.",
   "Faded prints on a laser printer usually mean low toner, economy or draft mode enabled or a worn drum or transfer roller. Shake the toner cartridge gently to redistribute toner as a temporary fix, check print settings, then replace the cartridge. On an inkjet, faded or missing colors mean low ink or clogged nozzles; run the head cleaning routine. Vertical streaks or lines that repeat down the page on a laser printer often come from a scratch or debris on the imaging drum, or toner on a roller; replace the toner cartridge or drum. On inkjets, streaks and banding suggest a dirty or misaligned print head, so clean and align it.",
   "Ghost images are faint copies of earlier parts of the page repeated further down. On laser printers this points to the drum not being cleaned or discharged properly, often from a worn drum or cleaning blade, or to fuser problems; replace the drum or cartridge, or the fuser if needed. Toner that smears or rubs off the page means the toner was not fused, which indicates a failing fuser. Replace the fuser, often as part of a maintenance kit, and remember it is very hot.",
   "Paper jams are caused by worn or dirty pickup and feed rollers, paper that is damp, curled, too heavy or the wrong type, overfilled trays or misadjusted paper guides, and debris or torn paper left inside. Clear jams carefully following the printer's access doors, pulling in the direction of paper travel so it does not tear, then check for fragments. Frequent jams or multiple sheets feeding at once call for cleaning or replacing the pickup and separation rollers. Garbled print, pages full of random characters and symbols, usually means the wrong or corrupted driver or a communication problem. Reinstall the correct driver, check the cable or network connection and restart the printer.",
   "A stuck print queue, where jobs sit waiting and nothing prints, often comes from one bad job blocking the rest or from the print spooler service hanging. Cancel the stuck job; if that fails, restart the Print Spooler service in Windows, which clears the queue, and resend the documents. Incorrect paper settings cause the printer to pause asking for different paper, print on the wrong size or produce poor output on labels and glossy paper. Make sure the paper size and type set in the application and driver match the paper actually loaded and the printer's tray configuration."
  ],
  "terms": [
   [
    "Ghost image",
    "A faint repeated copy of earlier page content, often from drum or cleaning problems."
   ],
   [
    "Print spooler",
    "The Windows service that manages the print queue and sends jobs to printers."
   ],
   [
    "Pickup roller",
    "The roller that grabs paper from the tray and feeds it into the printer."
   ],
   [
    "Garbled print",
    "Output full of random characters, usually caused by a wrong or corrupted driver."
   ]
  ],
  "example": "Several users report that nothing prints and the queue shows dozens of waiting jobs. You try to cancel the first job but it will not delete. Restarting the Print Spooler service clears the stuck job, the queue starts processing and you ask users to resend anything that was lost.",
  "tip": "Toner rubs off: fuser. Repeating marks or ghosting: drum or cleaning. Garbled characters: driver. Nothing prints and queue is stuck: restart the print spooler. Frequent jams or multiple sheets: rollers or paper.",
  "check": [
   [
    "Toner on laser-printed pages smears when touched. Which part is failing?",
    "The fuser assembly."
   ],
   [
    "A printer outputs pages of random symbols. What is the most likely cause?",
    "An incorrect or corrupted print driver."
   ],
   [
    "How do you clear a print queue that will not cancel jobs?",
    "Restart the Print Spooler service, which clears the stuck jobs."
   ]
  ]
 },
 {
  "t": "Wired and wireless network problems: intermittent or no connectivity, APIPA address, IP conflicts, slow speeds, high latency and jitter, interference, SSID not found, port flapping",
  "body": [
   "Network troubleshooting follows a layered approach: start with the physical connection, then addressing, then name resolution and services. Tools like `ipconfig` and `ping` tell you quickly which layer is failing.",
   "For no connectivity on a wired connection, check the link lights on the network adapter and the switch port; no light means a cable, port or adapter problem. Try another cable and port. On Wi-Fi, confirm the adapter is enabled, airplane mode is off and the device is connected to the right network. Intermittent connectivity is harder: a damaged cable, a loose connector, a failing switch port, a weak or interfered wireless signal or power-saving settings on the adapter are common causes. Watch whether drops correlate with movement, time of day or particular locations.",
   "An address starting with 169.254 is an APIPA (Automatic Private IP Addressing) address. It means the device is set to use DHCP but could not get a lease. Check the physical connection, then whether the DHCP server or router is running and has free addresses in its scope, then run `ipconfig /release` and `ipconfig /renew`. An IP conflict occurs when two devices have the same address; Windows warns about it and one or both lose connectivity. It usually comes from a static address set inside the DHCP scope. Fix it by changing the static address to one outside the scope or using a DHCP reservation.",
   "Slow speeds can come from a link that negotiated a lower speed or half duplex because of a bad cable, network congestion, bandwidth-heavy applications, a weak wireless signal forcing lower data rates or too many clients on one access point. Latency is the delay for data to travel and return, measured in milliseconds with `ping`. Jitter is the variation in latency from packet to packet. High latency and jitter damage real-time services like voice and video calls, causing choppy audio and frozen video, and can be reduced with quality of service settings, wired connections and reducing congestion.",
   "Wireless interference comes from overlapping neighboring networks on the same channel, microwave ovens, cordless phones, Bluetooth devices and physical obstacles such as concrete walls, metal and even water in fish tanks. Use a Wi-Fi analyzer to pick less congested channels and move clients to 5 or 6 GHz. SSID not found means the device cannot see the network: it may be out of range, the SSID may be hidden, the access point may be down or the device may not support the band or standard the network uses, such as an older device that cannot see a 5 GHz-only or 6 GHz network. Port flapping is when a switch port repeatedly goes up and down, visible in switch logs. It is usually caused by a bad cable, faulty NIC, speed or duplex mismatch or a loose connection. Replace the cable, check the device's NIC and check the switch port configuration."
  ],
  "terms": [
   [
    "IP conflict",
    "Two devices on the same network using the same IP address."
   ],
   [
    "Jitter",
    "Variation in latency between packets, which disrupts voice and video."
   ],
   [
    "Port flapping",
    "A switch port repeatedly changing between up and down states."
   ],
   [
    "Link light",
    "An LED on a network port that shows whether a physical connection is established."
   ],
   [
    "Hidden SSID",
    "A wireless network that does not broadcast its name, so it must be entered manually."
   ]
  ],
  "example": "Staff complain that video calls are choppy in the afternoons. Ping tests show latency and jitter climbing at that time, and the switch logs show one uplink port flapping. You replace the damaged patch cable on that uplink, and latency and jitter drop back to normal levels.",
  "tip": "169.254 means DHCP failure; duplicate address warning means IP conflict, usually a static inside the DHCP scope; choppy calls mean latency and jitter; switch port going up and down means port flapping, often a bad cable; 5 GHz-only network invisible to an old device means band support.",
  "check": [
   [
    "A PC has a 169.254.10.5 address. What does this mean and what should you check?",
    "It could not reach a DHCP server; check the physical connection, the DHCP server or router and then renew the lease."
   ],
   [
    "What commonly causes an IP address conflict?",
    "A static address assigned manually that falls inside the DHCP scope, so DHCP also gives it to another device."
   ],
   [
    "An older laptop cannot see the office SSID, but newer devices can. What is a likely reason?",
    "The network uses a band or standard, such as 5 or 6 GHz only, that the older laptop's adapter does not support."
   ]
  ]
 },
 {
  "t": "Diagnostic tools: Windows Memory Diagnostic, CrystalDiskInfo, Event Viewer, Device Manager, ping, ipconfig, tracert, nslookup, cable tester and multimeter",
  "body": [
   "Good troubleshooting depends on evidence, and diagnostic tools provide it. For each tool, know what question it answers, so you can pick the right one for a symptom.",
   "Windows Memory Diagnostic tests RAM for errors. You run it from the Start menu by searching for it or with the command `mdsched`; it restarts the computer and tests memory before Windows loads, then reports results after you sign in. Use it for random crashes, blue screens and data corruption that could come from faulty memory. CrystalDiskInfo is a free third-party utility that reads a drive's S.M.A.R.T. data and shows its health status, temperature, power-on hours and warning attributes such as reallocated sectors. Use it when a drive is slow, noisy or suspected of failing.",
   "Event Viewer is the Windows log viewer, opened with `eventvwr.msc`. The Windows Logs section includes System, Application and Security logs, and entries are marked Information, Warning, Error or Critical. Filter by time around when the problem happened to see crashes, driver failures, unexpected shutdowns and service errors. Device Manager, opened with `devmgmt.msc`, lists every hardware device. A yellow exclamation mark shows a device with a problem, such as a missing driver, and a down arrow shows a disabled device. From here you can update, roll back, disable or uninstall drivers.",
   "Command-line network tools test connectivity layer by layer. `ipconfig` shows the IP address, subnet mask and default gateway; `ipconfig /all` adds DNS servers, DHCP details and the MAC address; `ipconfig /release` and `/renew` request a new DHCP lease; and `ipconfig /flushdns` clears the local DNS cache. `ping` sends ICMP echo requests to test whether a host is reachable and how long replies take; ping the loopback, then the gateway, then a remote address, then a name, to find where the failure lies. Note that some devices block ping, so no reply does not always mean the host is down. `tracert` shows each router hop along the path to a destination, revealing where traffic stops or slows. `nslookup` queries DNS directly to check whether a name resolves and which server answered.",
   "Hardware tools complete the kit. A cable tester checks network cables for continuity, open wires, shorts and wrong pin order. A multimeter measures voltage, resistance and continuity; technicians use it to check power supply output voltages, outlet voltage, cable continuity and fuses. Be careful when measuring live voltages, set the meter to the correct mode and range before connecting the probes and never open a power supply to test inside it."
  ],
  "terms": [
   [
    "Event Viewer",
    "The Windows tool that displays system, application and security logs."
   ],
   [
    "Device Manager",
    "The Windows tool for viewing hardware devices and managing their drivers."
   ],
   [
    "tracert",
    "A command that lists each router hop between a computer and a destination."
   ],
   [
    "nslookup",
    "A command that queries DNS servers to test name resolution."
   ],
   [
    "Multimeter",
    "A meter that measures voltage, resistance and continuity."
   ]
  ],
  "example": "A user cannot reach a company website. `ipconfig` shows a valid address and gateway, `ping` to the gateway and to a public IP succeeds, but `nslookup` for the site name times out. That isolates the problem to DNS, so you check the DNS server settings with `ipconfig /all` and find an outdated DNS server address.",
  "tip": "Pick the tool that answers the question: RAM errors, Windows Memory Diagnostic; drive health, CrystalDiskInfo; what happened and when, Event Viewer; driver problems, Device Manager; reachable, ping; where it stops, tracert; names, nslookup; my address, ipconfig; voltage, multimeter.",
  "check": [
   [
    "Which tool would you use to see where along the network path traffic stops?",
    "tracert, which lists each hop to the destination."
   ],
   [
    "A device in Device Manager shows a yellow exclamation mark. What does it indicate?",
    "The device has a problem, often a missing or faulty driver."
   ],
   [
    "Which tool checks whether a PSU is delivering the correct voltages?",
    "A multimeter, or a power supply tester."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
