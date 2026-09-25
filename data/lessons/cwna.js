/* Lessons for CWNP Certified Wireless Network Administrator (CWNA-109): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cwna", [
 {
  "t": "RF wave characteristics: wavelength, frequency, amplitude and phase, and how wavelength shrinks as frequency rises",
  "body": [
   "Wi-Fi moves data by sending radio frequency (RF) energy through the air. Before you can design, troubleshoot or pass any part of the CWNA (Certified Wireless Network Administrator) exam, you need a clear picture of what an RF wave is. An RF signal is an alternating current (AC) in the transmitter that the antenna turns into an electromagnetic wave. That wave has four properties you must be able to name and explain: wavelength, frequency, amplitude and phase.",
   "Frequency is how many complete cycles the wave makes each second, measured in hertz (Hz). One cycle per second is 1 Hz, and Wi-Fi works in gigahertz (GHz), billions of cycles per second: the 2.4 GHz, 5 GHz and 6 GHz bands. Wavelength is the physical distance the wave travels during one cycle, from one crest to the next. Amplitude is the height, or strength, of the wave; a transmitter with more power produces a wave with greater amplitude, and amplitude falls as the signal travels and is absorbed. Phase describes where a wave is in its cycle compared with another wave of the same frequency, measured in degrees. Two waves that are in phase (0 degrees apart) add together; two waves 180 degrees out of phase cancel each other.",
   "Wavelength and frequency are tied together by the speed of light, about 300,000,000 meters per second. The formula is wavelength = speed of light / frequency. Because the speed is fixed, a higher frequency always means a shorter wavelength. At 2.4 GHz the wavelength is about 12.5 cm (roughly 5 inches). At 5 GHz it is about 6 cm, and at 6 GHz about 5 cm. This inverse relationship is the single most important fact in this lesson.",
   "Why does wavelength matter in practice? Antennas are sized in proportion to wavelength, so 5 GHz antenna elements are smaller than 2.4 GHz ones. More importantly, a receiving antenna built for a shorter wavelength captures less of the passing energy, so higher-frequency signals arrive weaker over the same distance. That is why a 5 GHz or 6 GHz cell is usually smaller than a 2.4 GHz cell from the same access point (AP) at the same transmit power, and why higher frequencies are generally more affected by walls and other obstacles.",
   "Phase matters because of multipath: when copies of the same signal arrive over different paths, they arrive at different phases. Copies that arrive in phase strengthen the signal (upfade), while copies arriving out of phase weaken or cancel it. Modern radios also use phase deliberately: modulation schemes such as QPSK and QAM encode bits by shifting phase and amplitude, and transmit beamforming adjusts the phase at each antenna so signals combine constructively at the client.",
   "For the exam, be ready to identify each property from a description or a drawing, and to reason about relationships. If asked which band has the longest wavelength, the answer is the lowest frequency band, 2.4 GHz. If asked what happens to wavelength when frequency doubles, it halves."
  ],
  "terms": [
   [
    "Frequency",
    "The number of cycles an RF wave completes each second, measured in hertz (Hz)."
   ],
   [
    "Wavelength",
    "The distance a wave travels during one complete cycle; it equals the speed of light divided by the frequency."
   ],
   [
    "Amplitude",
    "The height or strength of a wave, which relates to signal power."
   ],
   [
    "Phase",
    "The position of a wave in its cycle relative to another wave of the same frequency, measured in degrees."
   ],
   [
    "Hertz (Hz)",
    "The unit of frequency, one cycle per second; Wi-Fi uses GHz, or billions of cycles per second."
   ]
  ],
  "example": "An office moves a group of laptops from 2.4 GHz to 5 GHz on the same AP at the same power. Users near the AP see faster speeds, but a few at the far end of the floor now see weak signal. The shorter 5 GHz wavelength gives a smaller effective coverage cell, so the design needs APs placed closer together.",
  "tip": "Remember the inverse relationship: higher frequency means shorter wavelength. Questions often describe it indirectly, for example asking which band gives larger coverage at equal power (2.4 GHz) or which band needs smaller antenna elements (the higher one).",
  "check": [
   [
    "What happens to wavelength when frequency increases?",
    "It decreases, because wavelength equals the speed of light divided by frequency and the speed of light is constant."
   ],
   [
    "Two copies of the same signal arrive 180 degrees out of phase. What is the effect?",
    "They cancel or severely weaken each other, which is the destructive result of multipath."
   ],
   [
    "Which wave property is most directly related to transmit power?",
    "Amplitude, the height or strength of the wave."
   ]
  ]
 },
 {
  "t": "RF behaviors: reflection, refraction, diffraction, scattering, absorption, free space path loss and multipath",
  "body": [
   "Once an RF wave leaves the antenna, the environment changes it. The CWNA exam expects you to recognize each propagation behavior, know which materials cause it and predict its effect on a wireless network. These behaviors explain why a floor plan that looks simple can produce dead spots, poor throughput or odd roaming.",
   "Reflection happens when a wave hits a smooth surface larger than its wavelength, such as metal, a glass window with metallic coating or an elevator door, and bounces off. Reflection is the main cause of multipath indoors. Refraction is the bending of a wave as it passes through a medium of different density, for example air layers of different temperature or humidity; it mostly matters on long outdoor links. Diffraction is the bending of a wave around an obstacle, creating an RF shadow behind it, like light around the edge of a building. Scattering happens when a wave hits an uneven surface or many small objects, such as chain-link fencing, gravel, dust or foliage, and splits into many weaker reflections in different directions.",
   "Absorption is the conversion of RF energy to heat as it passes through a material. Water and dense materials absorb strongly, so people, concrete, brick and water-filled objects all reduce signal. That is why a lecture hall full of people behaves differently from the same empty room during a survey. Materials are often described by their attenuation in decibels (dB), and higher frequencies usually suffer more absorption.",
   "Free space path loss (FSPL) is the weakening of a signal simply because the energy spreads out over a larger area as it travels, even with no obstacles at all. A useful rule of thumb is the 6 dB rule: each time the distance doubles, FSPL increases by about 6 dB, which means about one quarter of the power. FSPL also rises with frequency, which matches what you learned about shorter wavelengths.",
   "Multipath is the arrival of two or more copies of the same signal at a receiver at slightly different times, because some traveled directly and others were reflected. The time difference is called delay spread. Depending on phase, multipath can cause upfade (increased amplitude), downfade (decreased amplitude), nulling (cancellation) and data corruption from intersymbol interference. For older single-antenna radios, multipath was mostly harmful. MIMO (multiple-input, multiple-output) radios used by 802.11n and later actually take advantage of multipath to send several spatial streams at once.",
   "When you troubleshoot, map the symptom to the behavior. Signal that is strong but data that is corrupted suggests multipath. Signal that drops sharply behind a concrete core or a crowd suggests absorption. Coverage that gets weaker simply with distance is FSPL."
  ],
  "terms": [
   [
    "Reflection",
    "A wave bouncing off a smooth surface larger than its wavelength, such as metal or coated glass."
   ],
   [
    "Diffraction",
    "A wave bending around an obstacle, leaving an RF shadow behind it."
   ],
   [
    "Scattering",
    "A wave splitting into many weaker reflections after hitting an uneven surface or many small objects."
   ],
   [
    "Absorption",
    "Loss of RF energy as a material converts it to heat; water, people and concrete absorb strongly."
   ],
   [
    "Free space path loss (FSPL)",
    "Signal weakening caused by the wavefront spreading out with distance, about 6 dB for each doubling of distance."
   ],
   [
    "Multipath",
    "Multiple copies of a signal reaching a receiver at different times over different paths."
   ]
  ],
  "example": "A warehouse with metal racking shows good signal strength everywhere in a survey, yet older handheld scanners report many retries. The metal racks create heavy reflection and multipath. Replacing the scanners with MIMO-capable devices and adjusting AP placement reduces the retries.",
  "tip": "Know which material maps to which behavior: metal and coated glass cause reflection, water and people cause absorption, chain-link fence and foliage cause scattering, and building edges cause diffraction. Also remember that FSPL happens even in a perfect vacuum.",
  "check": [
   [
    "Why does a crowded auditorium reduce signal compared with the same empty room?",
    "Human bodies are mostly water, which absorbs RF energy and converts it to heat."
   ],
   [
    "By roughly how much does free space path loss increase when you double the distance?",
    "About 6 dB, which is about one quarter of the received power."
   ],
   [
    "What four effects can multipath have on a signal?",
    "Upfade, downfade, nulling and data corruption from intersymbol interference."
   ]
  ]
 },
 {
  "t": "RF math: mW and dBm conversion, the rule of 10s and 3s, dB gain and loss, dBi vs dBd",
  "body": [
   "Wireless professionals measure power in two ways: absolute power in milliwatts (mW) and relative or referenced power in decibels. The CWNA exam expects you to convert between them quickly, usually without a calculator. The good news is that a few simple rules cover almost every question.",
   "A decibel (dB) is a relative measure: it compares two power levels on a logarithmic scale. A gain of 10 dB means ten times the power; a loss of 10 dB means one tenth. A gain of 3 dB means double the power; a loss of 3 dB means half. dBm is a decibel value referenced to 1 milliwatt, so 0 dBm = 1 mW. That fixed reference lets dBm express absolute power. The formula is dBm = 10 x log10(power in mW).",
   "The rule of 10s and 3s lets you do these conversions in your head. Start at 0 dBm = 1 mW. Each +10 dB multiplies mW by 10, each -10 dB divides by 10, each +3 dB doubles and each -3 dB halves. You may only use 10s and 3s, and you must apply the matching operation to both columns.",
   "```text\n  0 dBm  =    1 mW\n +3 dBm  =    2 mW\n+10 dBm  =   10 mW\n+13 dBm  =   20 mW\n+20 dBm  =  100 mW\n+30 dBm  = 1000 mW (1 W)\n-10 dBm  =  0.1 mW\n-70 dBm  = 0.0000001 mW\n```",
   "For values that are not direct 10s and 3s, build them from steps. For example, to find 4 dBm, start at 0 dBm = 1 mW, add 10 (10 mW), then subtract 3 twice: 10 - 3 - 3 = 4 dBm, which is 10 mW / 2 / 2 = 2.5 mW. In the real world, 25 mW is about 14 dBm and 50 mW is about 17 dBm.",
   "Gains and losses in a system are simply added in dB. A 20 dBm transmitter feeding a cable with 3 dB of loss and an antenna with 6 dBi of gain radiates 20 - 3 + 6 = 23 dBm. Working in dB turns multiplication into addition, which is why the industry uses it. Note that you add dB to dBm, but you never add two dBm values together as if they were gains.",
   "Antenna gain uses two references. dBi is gain relative to an isotropic radiator, a theoretical point source that radiates equally in all directions. dBd is gain relative to a dipole antenna. A standard dipole itself has 2.14 dBi of gain, so dBi = dBd + 2.14. A 3 dBd antenna is therefore about 5.14 dBi. Most Wi-Fi vendors quote dBi, and EIRP calculations use dBi.",
   "Received signals in Wi-Fi are tiny, typically between -30 dBm and -90 dBm, so you will almost always see negative dBm values in surveys and client utilities. A value closer to zero is stronger: -60 dBm is stronger than -70 dBm, and it is ten times the power."
  ],
  "terms": [
   [
    "dB (decibel)",
    "A relative, logarithmic comparison of two power levels; +3 dB doubles power and +10 dB multiplies it by ten."
   ],
   [
    "dBm",
    "Decibels referenced to 1 milliwatt, so 0 dBm equals 1 mW; used for absolute power."
   ],
   [
    "dBi",
    "Antenna gain relative to a theoretical isotropic radiator."
   ],
   [
    "dBd",
    "Antenna gain relative to a dipole antenna; dBi equals dBd plus 2.14."
   ],
   [
    "Rule of 10s and 3s",
    "A mental method for converting mW and dBm by adding or subtracting 10 dB (multiply or divide by 10) and 3 dB (double or halve)."
   ]
  ],
  "example": "A survey engineer reads -67 dBm at one desk and -64 dBm at another. The 3 dB difference means the second desk receives twice as much power, even though the numbers look close. Knowing this, the engineer does not dismiss small dB differences as trivial.",
  "tip": "Always apply the same step to both columns: +10 dB is x10 mW and +3 dB is x2 mW. Watch for questions that mix dBi and dBd; convert everything to dBi by adding 2.14 before you calculate EIRP.",
  "check": [
   [
    "Convert 100 mW to dBm.",
    "20 dBm: starting from 0 dBm = 1 mW, two +10 dB steps multiply by 100."
   ],
   [
    "An antenna is rated 5 dBd. What is its gain in dBi?",
    "About 7.14 dBi, because dBi equals dBd plus 2.14."
   ],
   [
    "Which is stronger, -72 dBm or -65 dBm, and by roughly how much?",
    "-65 dBm is stronger by 7 dB, which is about five times the power (3 dB doubles, 7 dB is roughly x5)."
   ]
  ]
 },
 {
  "t": "Signal metrics: RSSI, noise floor, SNR, receive sensitivity and fade margin",
  "body": [
   "To judge whether a wireless link will work, you need more than a single signal strength number. The CWNA exam tests five related metrics: received signal strength, noise floor, signal-to-noise ratio, receive sensitivity and fade margin. Together they tell you whether a client can decode frames reliably and at what data rate.",
   "RSSI stands for Received Signal Strength Indicator. In the 802.11 standard, RSSI is an arbitrary, vendor-defined number that the radio uses internally, and the scale differs between chipset makers. That means RSSI values from two different client devices cannot be compared directly. Most tools convert or report received signal in dBm, which is an absolute measurement, but you should remember that client-reported values vary in accuracy by vendor.",
   "The noise floor is the level of background RF energy on a channel when no 802.11 transmission is present, including electrical noise and energy from other devices. A typical quiet indoor noise floor is somewhere around -90 to -95 dBm, but it can rise in noisy environments. Signal-to-noise ratio (SNR) is the difference in dB between the received signal and the noise floor. If the signal is -65 dBm and the noise floor is -92 dBm, the SNR is 27 dB. Note that SNR is a simple subtraction because both values are in dBm, and the result is in dB, not dBm.",
   "SNR matters more than raw signal strength. A strong signal over a high noise floor may still be unusable, while a moderate signal in a quiet environment can support high data rates. Higher-order modulation such as 256-QAM or 1024-QAM needs a high SNR, because the receiver must tell apart many closely spaced symbols. As SNR drops, the radio shifts to more robust, slower data rates, a process called dynamic rate switching. A related metric, SINR (signal to interference plus noise ratio), also counts interference from other transmitters.",
   "Receive sensitivity is the weakest signal a radio can still decode at a given data rate, listed on the vendor data sheet in dBm, for example a value in the -90s for the lowest rate and a much higher value for the fastest rates. Receive sensitivity is different for every modulation and coding scheme because fast rates need more signal.",
   "Fade margin, also called system operating margin in some contexts, is extra signal you plan above the receive sensitivity to absorb fluctuations caused by weather, multipath, people moving or aging equipment. Outdoor point-to-point links commonly plan something like 10 to 25 dB of margin. Indoor designs apply the same idea by designing for a target such as -67 dBm for voice rather than the bare minimum a client can hear."
  ],
  "terms": [
   [
    "RSSI",
    "Received Signal Strength Indicator, a vendor-specific relative value radios use to represent received signal; not comparable across vendors."
   ],
   [
    "Noise floor",
    "The background RF energy level on a channel when no Wi-Fi transmission is present, measured in dBm."
   ],
   [
    "SNR",
    "Signal-to-noise ratio, the difference in dB between received signal and noise floor."
   ],
   [
    "Receive sensitivity",
    "The weakest signal, in dBm, at which a radio can decode frames at a particular data rate."
   ],
   [
    "Fade margin",
    "Extra signal designed above receive sensitivity so a link keeps working when the signal fluctuates."
   ]
  ],
  "example": "Two conference rooms both show -68 dBm from the AP. In one room the noise floor is -94 dBm (SNR 26 dB) and calls are clean. In the other, a failing microwave oven next door raises the noise floor to -78 dBm (SNR 10 dB), and clients drop to low data rates with frequent retries.",
  "tip": "SNR is a subtraction of two dBm values and the answer is in dB. Also remember that RSSI is vendor-defined and not directly comparable between devices, a point exam questions like to test.",
  "check": [
   [
    "A client hears the AP at -70 dBm and the noise floor is -95 dBm. What is the SNR?",
    "25 dB, found by subtracting the noise floor from the signal (-70 minus -95)."
   ],
   [
    "Why can you not directly compare RSSI values reported by two different client chipsets?",
    "The 802.11 standard leaves the RSSI scale to each vendor, so the numbers are relative and not standardized."
   ],
   [
    "What is the purpose of fade margin?",
    "To keep the link working when received signal drops because of weather, multipath or other changes, by designing for more signal than the minimum sensitivity."
   ]
  ]
 },
 {
  "t": "Link budgets and EIRP: transmitter power, cable and connector loss, antenna gain",
  "body": [
   "A link budget is an accounting of every gain and loss between a transmitter and a receiver. It lets you predict whether a link will work before you install it, and it is the basis for checking legal power limits. You will use the RF math from the earlier lesson here, adding and subtracting dB values along the path.",
   "Start at the transmitter. Its output power is measured in dBm at the radio port. The signal then passes through cables, connectors, lightning arrestors and possibly splitters, each of which adds loss in dB. The power that arrives at the antenna input is called the intentional radiator (IR) power. The antenna then focuses the energy and adds gain in dBi. The result is EIRP, Equivalent Isotropically Radiated Power, which is the highest power radiated in the antenna's strongest direction.",
   "```text\nEIRP (dBm) = transmitter power (dBm)\n           - cable and connector loss (dB)\n           + antenna gain (dBi)\n```",
   "For example, a radio set to 17 dBm, feeding 4 dB of cable and connector loss into a 10 dBi antenna, produces an IR of 13 dBm and an EIRP of 23 dBm. Regulators such as the FCC set limits on both conducted power and EIRP, so this calculation tells you whether a particular antenna and power setting is legal.",
   "A full link budget continues past the transmitting antenna. Subtract free space path loss for the distance and frequency, add the receiving antenna gain, subtract the receiver's cable and connector loss, and you get the expected received signal. Compare that with the receiver's sensitivity for the data rate you want. The difference is your fade margin, and it must cover the fluctuations you expect.",
   "```text\nReceived signal = EIRP - FSPL + Rx antenna gain - Rx cable loss\nFade margin     = Received signal - Rx sensitivity\n```",
   "Remember that the same antenna gain applies in both directions. A high-gain antenna improves what an AP hears from a client just as much as what the client hears from the AP, but the client's own transmit power and antenna are usually weaker. That is why designers try to balance power: an AP shouting at high power can be heard by a client that cannot answer back well enough, which causes one-way links and poor roaming.",
   "In the lab, you will practice by reading a data sheet, finding the conducted power, cable loss per length and antenna gain, and calculating EIRP. Keep units straight: power in dBm, gains and losses in dB or dBi."
  ],
  "terms": [
   [
    "Link budget",
    "A calculation of all gains and losses from transmitter to receiver used to predict received signal and margin."
   ],
   [
    "Intentional radiator (IR)",
    "The transmitter plus cabling and connectors up to, but not including, the antenna; its power is measured at the antenna input."
   ],
   [
    "EIRP",
    "Equivalent Isotropically Radiated Power, the power radiated in the antenna's strongest direction: transmit power minus losses plus antenna gain."
   ],
   [
    "Cable loss",
    "Signal attenuation in coaxial cable, which increases with cable length and with frequency."
   ]
  ],
  "example": "An engineer plans a building-to-building bridge using radios set to 20 dBm, 2 dB of cable loss on each side and 23 dBi dish antennas. EIRP is 41 dBm. After subtracting the calculated FSPL and adding the receiving dish gain, the expected signal is 20 dB above the radio's sensitivity for the desired rate, giving an acceptable fade margin.",
  "tip": "IR power is measured before the antenna, and EIRP after it. If a question asks for the power at the antenna input, do not add antenna gain. If it asks for EIRP, subtract losses and add gain in dBi (convert dBd first).",
  "check": [
   [
    "A radio outputs 15 dBm, cable loss is 3 dB and the antenna gain is 8 dBi. What is the EIRP?",
    "20 dBm, because 15 - 3 + 8 = 20."
   ],
   [
    "In the same system, what is the intentional radiator power?",
    "12 dBm, the power at the antenna input after the 3 dB cable loss."
   ],
   [
    "Why do high AP power settings sometimes cause problems for clients?",
    "Clients may hear the AP well but transmit at lower power, so the AP cannot hear them reliably, creating unbalanced, one-way links."
   ]
  ]
 },
 {
  "t": "Antenna types: omnidirectional, semi-directional (patch, panel, Yagi, sector) and highly directional (parabolic dish)",
  "body": [
   "An antenna does not create power; it focuses the power it receives in some directions at the expense of others. Choosing the right antenna shape for a space is a core CWNA skill. The exam groups antennas into three families: omnidirectional, semi-directional and highly directional.",
   "Omnidirectional antennas radiate in all horizontal directions, with a coverage pattern often described as a doughnut when the antenna is mounted vertically. The simplest example is the dipole, often called a rubber duck antenna, with about 2.14 dBi of gain. Higher-gain omnis squeeze the doughnut flatter: they reach farther horizontally but cover less vertically. Most indoor enterprise APs have internal omnidirectional antennas and are mounted on the ceiling to cover the area below. A common problem with high-gain omnis mounted high up is weak coverage directly beneath them.",
   "Semi-directional antennas focus energy in one general direction. Patch and panel antennas are flat and often mounted on walls to cover a hallway, a room from one side or a stadium seating section. Yagi antennas, also called Yagi-Uda, use a row of parallel elements to create a narrower beam, often used for short to medium outdoor links or for covering long corridors. Sector antennas are high-gain semi-directional antennas designed to cover a specific slice, such as 60, 90 or 120 degrees; several sectors mounted back to back on a tower can cover a full circle with separate cells.",
   "Highly directional antennas produce a very narrow beam with high gain. The parabolic dish is the classic example and grid antennas are a lighter variation that resist wind loading. They are used for long-distance point-to-point bridges between buildings or sites. Their narrow beam makes alignment critical; a few degrees of movement from wind or a loose mount can break the link.",
   "Semi-directional and highly directional antennas all have back lobes and side lobes, small areas of radiation behind and beside the main beam. These matter when you place a panel on a wall, because some signal will spill into the room behind it.",
   "Antennas can also be arrays. Modern APs use multiple antennas for MIMO, and some use adaptive or smart antenna arrays that can steer patterns. Specialized indoor options include downtilt antennas for high ceilings and leaky coax (a radiating cable) for tunnels or elevator shafts.",
   "When choosing, match the antenna to the shape of the area: omni for open rooms with a central AP, patch or panel for walls and high-density seating, Yagi or sector for targeted outdoor areas, and a dish for long bridges."
  ],
  "terms": [
   [
    "Omnidirectional antenna",
    "An antenna that radiates in all horizontal directions, producing a doughnut-shaped pattern."
   ],
   [
    "Semi-directional antenna",
    "An antenna that focuses energy in one general direction; includes patch, panel, Yagi and sector types."
   ],
   [
    "Yagi antenna",
    "A semi-directional antenna using a row of parallel elements to produce a relatively narrow beam."
   ],
   [
    "Sector antenna",
    "A semi-directional antenna designed to cover a defined horizontal slice, often combined on a tower to cover 360 degrees."
   ],
   [
    "Parabolic dish",
    "A highly directional antenna with a very narrow beam and high gain, used for long point-to-point links."
   ]
  ],
  "example": "A university covers a lecture hall with wall-mounted patch antennas aimed at the seating so that each AP serves a defined block of students, while the campus library uses ceiling APs with internal omnis. Two buildings a kilometer apart are joined with a pair of dish antennas.",
  "tip": "Higher gain does not add power; it reshapes the pattern. A higher-gain omni gets farther horizontally but has a narrower vertical beamwidth, which can leave poor coverage directly underneath.",
  "check": [
   [
    "Which antenna type would you choose for a long building-to-building bridge?",
    "A highly directional antenna such as a parabolic dish or grid, for its narrow beam and high gain."
   ],
   [
    "What is the effect of increasing the gain of an omnidirectional antenna?",
    "The pattern flattens: horizontal range increases while vertical coverage shrinks."
   ],
   [
    "Name two semi-directional antenna types used indoors.",
    "Patch and panel antennas, often wall-mounted to cover rooms, hallways or seating areas."
   ]
  ]
 },
 {
  "t": "Antenna characteristics: gain, beamwidth, polarization, azimuth and elevation charts",
  "body": [
   "Every antenna data sheet describes the antenna with the same few characteristics. Reading them correctly lets you predict coverage and choose between models. The CWNA exam often shows a radiation chart or lists values and asks what they mean.",
   "Gain describes how much an antenna focuses energy in its strongest direction compared with a reference, measured in dBi (versus an isotropic radiator) or dBd (versus a dipole). Gain is passive: it comes from shaping the pattern, not from adding energy. Gain applies equally to transmitting and receiving, so a higher-gain antenna also hears weaker signals from the direction it points.",
   "Beamwidth is the angle of the main lobe measured between the points where power falls to half, which is 3 dB below the peak. These are the half-power points. Antennas have both a horizontal beamwidth and a vertical beamwidth. As gain increases, beamwidth usually narrows. An omnidirectional antenna has a horizontal beamwidth of 360 degrees but a limited vertical beamwidth; a parabolic dish may have only a few degrees in both planes.",
   "Polarization describes the orientation of the electric field of the wave. Most Wi-Fi antennas are linearly polarized, either vertical or horizontal. For best results, the transmitting and receiving antennas should share the same polarization; a mismatch can cause significant loss on a point-to-point link. Indoors, reflections tend to scramble polarization, so mismatch matters less, but on outdoor bridges alignment of polarization is part of installation. Some bridges deliberately use both vertical and horizontal polarization, which MIMO radios use as separate paths.",
   "Azimuth and elevation charts, also called polar charts or radiation patterns, show the antenna's pattern from two views. The azimuth chart is the horizontal plane, as if you were looking down on the antenna from above. The elevation chart is the vertical plane, as if you were looking at it from the side. The outer ring usually represents the peak gain, and each inner ring is a reduction in dB. Charts are often plotted on a logarithmic scale, which makes side and back lobes look larger than they would on a linear scale.",
   "To read a chart, find the main lobe, then find where it falls 3 dB from the peak on each side to estimate beamwidth. Look for back lobes on directional antennas and for nulls, directions with very little radiation. For an omni, the azimuth chart is nearly a circle, while the elevation chart shows the flattened doughnut."
  ],
  "terms": [
   [
    "Beamwidth",
    "The angle between the half-power (-3 dB) points of an antenna's main lobe, given for horizontal and vertical planes."
   ],
   [
    "Polarization",
    "The orientation of a radio wave's electric field, usually vertical or horizontal for Wi-Fi antennas."
   ],
   [
    "Azimuth chart",
    "A radiation pattern showing the horizontal plane, viewed from above."
   ],
   [
    "Elevation chart",
    "A radiation pattern showing the vertical plane, viewed from the side."
   ],
   [
    "Gain",
    "How strongly an antenna focuses energy in its main direction relative to a reference, in dBi or dBd."
   ]
  ],
  "example": "An installer compares two patch antennas for a warehouse aisle. One has 8 dBi gain with a 70-degree horizontal beamwidth; the other has 13 dBi with 30 degrees. For a long, narrow aisle the 13 dBi model fits, while the wider one suits a square room.",
  "tip": "Beamwidth is measured at the half-power points, 3 dB below peak, not at the edge of coverage. Azimuth means horizontal (top-down) and elevation means vertical (side view); exams often swap them to test you.",
  "check": [
   [
    "Where is beamwidth measured on an antenna pattern?",
    "Between the points on either side of the main lobe where power has fallen 3 dB from the peak."
   ],
   [
    "Which chart would you check to see how an antenna covers the floor beneath a ceiling mount?",
    "The elevation chart, which shows the vertical plane."
   ],
   [
    "What happens on an outdoor bridge if one antenna is vertically polarized and the other horizontally polarized?",
    "Significant signal loss from polarization mismatch, which can make the link unreliable."
   ]
  ]
 },
 {
  "t": "Point-to-point links: visual vs RF line of sight, the Fresnel zone and earth bulge",
  "body": [
   "Point-to-point (PtP) links, also called bridges, connect two networks, such as two buildings on a campus. They use directional antennas aimed at each other. Planning one requires more than seeing the other building; you must confirm the RF path is clear.",
   "Visual line of sight (LOS) is the straight line you see from one antenna to the other. RF line of sight is more demanding, because radio energy spreads out around that straight line. An RF link can have clear visual LOS yet still suffer if trees, rooftops or the ground intrude into the space around the direct path.",
   "That space is described by the Fresnel zone (pronounced fre-NEL), an elongated, football-shaped region centered on the visual line between the two antennas. The first Fresnel zone carries most of the useful energy. It is widest at the midpoint of the link and narrows to the antennas at each end. Its size grows with distance and shrinks with frequency, so long links at lower frequencies need the most clearance.",
   "The CWNA guideline is to keep the first Fresnel zone as clear as possible, with obstruction of no more than 40 percent and ideally no more than 20 percent. Obstructions inside the zone cause diffraction and reflection that weaken or corrupt the signal. Trees are a common issue because they grow and change with the seasons and with rain.",
   "A widely used formula gives the radius of the first Fresnel zone at the midpoint in feet, with D the link distance in miles and F the frequency in GHz. Multiply by 0.6 to get the 60 percent clearance radius.",
   "```text\nradius (ft) = 72.2 x sqrt( D / (4 x F) )\n60% radius  = 43.3 x sqrt( D / (4 x F) )\n```",
   "Earth bulge is the curvature of the earth rising into the path on long links. Because the ground curves away, the midpoint of a long link sits closer to the ground than you might expect. For longer links, commonly beyond about 7 miles (11 km), you add earth bulge to the Fresnel clearance when calculating antenna height. A common rule of thumb for bulge at the midpoint is height in feet = D squared / 8, with D in miles. Total antenna height must clear the obstacles plus the Fresnel clearance plus the earth bulge.",
   "Finally, a PtP link must still meet its link budget and fade margin, respect regulatory EIRP rules for bridges, and be mounted solidly. Wind, ice and slow mount sagging can misalign a narrow-beam antenna over time."
  ],
  "terms": [
   [
    "Visual line of sight",
    "A clear straight line of sight between two antennas as seen by eye."
   ],
   [
    "RF line of sight",
    "A path in which the Fresnel zone around the visual line is sufficiently free of obstructions for RF."
   ],
   [
    "Fresnel zone",
    "An ellipsoid-shaped region around the direct path between antennas that must be kept mostly clear for a strong link."
   ],
   [
    "Earth bulge",
    "The curvature of the earth rising into the path of long links, which must be added to antenna height calculations."
   ]
  ],
  "example": "Two campus buildings have a clear view of each other over a parking lot, but a row of young trees sits near the midpoint. The link works in winter, then degrades each summer as leaves fill the lower Fresnel zone. Raising both antennas a few meters restores clearance.",
  "tip": "Clear visual line of sight does not guarantee RF line of sight. The Fresnel zone is widest at the midpoint and larger at lower frequencies and longer distances; keep blockage under 40 percent and ideally under 20 percent.",
  "check": [
   [
    "Where along a point-to-point link is the Fresnel zone widest?",
    "At the midpoint between the two antennas."
   ],
   [
    "How does increasing the frequency affect the Fresnel zone size for the same distance?",
    "It makes the Fresnel zone smaller, because radius is inversely related to the square root of frequency."
   ],
   [
    "When should earth bulge be included in antenna height calculations?",
    "On longer links, commonly beyond about 7 miles (11 km), where the earth's curvature intrudes into the path."
   ]
  ]
 },
 {
  "t": "MIMO radios: radio chains, spatial streams, transmit beamforming, MU-MIMO",
  "body": [
   "MIMO stands for multiple-input, multiple-output. Introduced to Wi-Fi with 802.11n, it uses several antennas and radio chains on both sides of a link to increase speed and reliability. Every enterprise AP and most clients today are MIMO devices, so you need to understand its parts and the notation vendors use.",
   "A radio chain is a complete transmit or receive path: an antenna plus its own amplifier, converter and supporting circuitry. MIMO devices are described with the notation transmitters x receivers : spatial streams, for example 4x4:4. That means four transmit chains, four receive chains and support for four spatial streams. A smartphone might be 2x2:2. The number of spatial streams can never exceed the smaller of the transmit and receive chain counts.",
   "A spatial stream is a separate, independent flow of data sent simultaneously on the same channel. This technique is called spatial multiplexing. It works because multipath gives each antenna pair a slightly different path; the receiver uses these differences to separate the streams. Each additional stream adds throughput roughly equal to one stream's rate, so a two-stream link is about twice as fast as a one-stream link at the same modulation and channel width. The number of streams actually used is limited by the device with fewer streams, which is usually the client.",
   "Extra radio chains are still useful even when they cannot carry more streams. Receive diversity techniques such as maximal ratio combining (MRC) combine the signals from all receive chains to improve SNR, which lets a 4x4 AP hear a 1x1 client better. On the transmit side, space-time block coding (STBC) and cyclic shift diversity (CSD) send the same data in different ways from multiple antennas to improve reliability.",
   "Transmit beamforming (TxBF) adjusts the phase and amplitude of the signal at each transmit antenna so the copies combine constructively at a particular receiver, increasing SNR there. 802.11ac standardized explicit beamforming: the AP (the beamformer) sends a Null Data Packet Announcement followed by a Null Data Packet, the client (the beamformee) measures the channel and returns feedback, and the AP uses that feedback to build a steering matrix. Beamforming improves signal at the client but does not increase range dramatically or reach past the normal cell edge.",
   "MU-MIMO, multi-user MIMO, lets an AP send different spatial streams to different clients at the same time using beamforming to separate them. Single-user MIMO serves one client per transmission. 802.11ac (Wi-Fi 5, often called wave 2) introduced downlink MU-MIMO, and 802.11ax (Wi-Fi 6) added uplink MU-MIMO. MU-MIMO works best with stationary clients that are physically separated, and it needs accurate, frequent sounding. It is less effective with highly mobile clients or many clients close together."
  ],
  "terms": [
   [
    "Radio chain",
    "A complete transmit or receive path in a radio, consisting of an antenna and its associated electronics."
   ],
   [
    "Spatial stream",
    "An independent data stream transmitted simultaneously on the same channel using spatial multiplexing."
   ],
   [
    "Transmit beamforming (TxBF)",
    "Adjusting phase and amplitude across multiple antennas so signals combine constructively at a target receiver."
   ],
   [
    "MU-MIMO",
    "Multi-user MIMO, in which an AP sends or receives separate spatial streams to or from several clients at the same time."
   ],
   [
    "Maximal ratio combining (MRC)",
    "A receive technique that combines signals from multiple antennas to improve SNR."
   ]
  ],
  "example": "An AP advertised as 4x4:4 serves a 2x2:2 laptop. The link uses two spatial streams, the laptop's limit, but the AP's four receive chains use maximal ratio combining to hear the laptop more reliably, so the link holds its higher data rate farther from the AP.",
  "tip": "In the notation 3x3:2, the first number is transmit chains, the second receive chains and the third spatial streams. The streams in use are limited by the less capable device, usually the client.",
  "check": [
   [
    "What does 2x3:2 mean?",
    "Two transmit chains, three receive chains and support for two spatial streams."
   ],
   [
    "Which amendment introduced uplink MU-MIMO?",
    "802.11ax (Wi-Fi 6); 802.11ac introduced downlink MU-MIMO."
   ],
   [
    "Why can a 4x4 AP still benefit a 1x1 client?",
    "Its extra receive chains improve SNR through maximal ratio combining, and it can use transmit beamforming toward the client."
   ]
  ]
 },
 {
  "t": "Modulation and coding basics: DSSS, OFDM, OFDMA, BPSK through QAM, and MCS indexes",
  "body": [
   "Modulation is how a radio changes a carrier wave to represent bits. Coding adds redundant bits so the receiver can correct errors. Together they determine a link's data rate and how robust it is. The CWNA exam tests the families of spread spectrum and multicarrier techniques, the modulation types and how MCS indexes describe them.",
   "The original 802.11 standard and 802.11b use direct sequence spread spectrum (DSSS). DSSS spreads each bit across a wider channel using a code: Barker coding for 1 and 2 Mbps and complementary code keying (CCK) for 5.5 and 11 Mbps, the High Rate DSSS rates. These rates are slow and occupy a 22 MHz wide channel in 2.4 GHz.",
   "Orthogonal frequency division multiplexing (OFDM) is used by 802.11a, g, n, ac and ax. OFDM divides a channel into many narrow subcarriers that overlap but do not interfere because they are mathematically orthogonal. A legacy 20 MHz OFDM channel has 64 subcarriers spaced 312.5 kHz apart, of which 48 carry data and 4 are pilots used for tracking. Sending many slow parallel symbols makes OFDM resistant to multipath. A guard interval between symbols absorbs delay spread; a short guard interval increases throughput slightly when multipath is low.",
   "Orthogonal frequency division multiple access (OFDMA), introduced in 802.11ax, extends OFDM by assigning groups of subcarriers, called resource units, to different clients in the same transmission. Plain OFDM sends to one client at a time across the whole channel; OFDMA lets several clients share one transmission, which reduces overhead for small frames.",
   "Each subcarrier is modulated using phase and amplitude. Binary phase shift keying (BPSK) carries 1 bit per symbol, quadrature phase shift keying (QPSK) carries 2 bits, and quadrature amplitude modulation (QAM) carries more: 16-QAM 4 bits, 64-QAM 6 bits, 256-QAM 8 bits (802.11ac), 1024-QAM 10 bits (802.11ax) and 4096-QAM 12 bits (802.11be). Each step up packs more bits into each symbol but needs a higher SNR, because the constellation points sit closer together.",
   "The coding rate states how many bits are useful data versus error-correction bits, written as a fraction such as 1/2, 2/3, 3/4 or 5/6. A 5/6 rate is more efficient but less robust than 1/2.",
   "A Modulation and Coding Scheme (MCS) index is a number that bundles a modulation type and coding rate, and in 802.11n also the number of spatial streams. 802.11n uses MCS 0 to 31 for up to four streams. 802.11ac and 802.11ax list MCS values per stream: MCS 0 to 9 for VHT and 0 to 11 for HE, where MCS 0 is BPSK 1/2. The actual data rate also depends on channel width, guard interval and stream count."
  ],
  "terms": [
   [
    "DSSS",
    "Direct sequence spread spectrum, the 802.11 and 802.11b technique that spreads each bit across a 22 MHz channel with a code."
   ],
   [
    "OFDM",
    "Orthogonal frequency division multiplexing, which splits a channel into many orthogonal subcarriers carrying data in parallel."
   ],
   [
    "OFDMA",
    "Orthogonal frequency division multiple access, an 802.11ax extension that assigns subsets of subcarriers to different users at once."
   ],
   [
    "QAM",
    "Quadrature amplitude modulation, which encodes several bits per symbol by varying both amplitude and phase."
   ],
   [
    "MCS index",
    "A number identifying a combination of modulation, coding rate and, in 802.11n, spatial streams."
   ]
  ],
  "example": "A laptop two meters from an AP reports MCS 11 with 1024-QAM. As the user walks to a distant corner, SNR falls and the client steps down through MCS 9, 7 and 4 to MCS 1, trading speed for the more robust modulation needed to keep frames decoding.",
  "tip": "Know the bits per symbol: BPSK 1, QPSK 2, 16-QAM 4, 64-QAM 6, 256-QAM 8, 1024-QAM 10. Higher modulation always needs higher SNR. OFDM serves one user per transmission; OFDMA divides the channel among several.",
  "check": [
   [
    "How many bits per symbol does 256-QAM carry, and which amendment introduced it?",
    "8 bits per symbol, introduced by 802.11ac."
   ],
   [
    "Which spread spectrum technique does 802.11b use for 5.5 and 11 Mbps?",
    "HR-DSSS using complementary code keying (CCK)."
   ],
   [
    "What is the key difference between OFDM and OFDMA?",
    "OFDM sends to a single user across the whole channel per transmission, while OFDMA allocates resource units to multiple users in the same transmission."
   ]
  ]
 },
 {
  "t": "Roles of the IEEE, Wi-Fi Alliance, IETF and national regulators such as the FCC",
  "body": [
   "Wi-Fi works across vendors and countries because several organizations each control a different piece. The CWNA exam expects you to know which organization does what, because questions often describe a function and ask who is responsible.",
   "The IEEE, the Institute of Electrical and Electronics Engineers, writes the 802.11 standard. It defines the physical layer (PHY) and the Media Access Control (MAC) sublayer of the data link layer for wireless LANs. New features are added through amendments with letter suffixes, such as 802.11ac or 802.11ax, developed by task groups. Periodically the IEEE rolls approved amendments into a revised base standard, for example 802.11-2020. The IEEE does not test products and does not set legal power limits.",
   "The Wi-Fi Alliance is an industry association that promotes Wi-Fi and certifies products for interoperability. It tests devices against a subset of the IEEE standard plus its own requirements, and certified products may use the Wi-Fi CERTIFIED logo. The Wi-Fi Alliance created the WPA, WPA2 and WPA3 security certifications, Wi-Fi Multimedia (WMM) for quality of service, Passpoint for hotspot roaming and the consumer generation names such as Wi-Fi 6. It sometimes certifies features before the IEEE amendment is final, as it did with WPA while 802.11i was in progress.",
   "The IETF, the Internet Engineering Task Force, publishes Request for Comments (RFC) documents that define internet protocols. Several protocols used in WLANs come from the IETF rather than the IEEE: RADIUS for authentication servers, EAP (Extensible Authentication Protocol) and its methods such as EAP-TLS, and CAPWAP for controller-to-AP communication. The IEEE 802.1X standard then carries EAP over LANs.",
   "National regulators control the use of radio spectrum in each country. In the United States this is the FCC (Federal Communications Commission). Other examples include Ofcom in the United Kingdom, ISED in Canada and national authorities across Europe that follow ETSI (European Telecommunications Standards Institute) standards. Regulators decide which frequencies are available, maximum transmit power and EIRP, which channels need radar detection and what certification a device must pass to be sold. Internationally, the ITU-R (the radiocommunication sector of the International Telecommunication Union) coordinates spectrum allocation between regions.",
   "A simple way to keep them straight: the IEEE defines how Wi-Fi works, the Wi-Fi Alliance certifies that products work together, the IETF defines higher-layer protocols used with Wi-Fi, and regulators decide what is legal where you are."
  ],
  "terms": [
   [
    "IEEE",
    "The standards body that creates and maintains the 802.11 standard defining the Wi-Fi PHY and MAC layers."
   ],
   [
    "Wi-Fi Alliance",
    "An industry group that certifies interoperability of Wi-Fi products and created WPA2, WPA3, WMM and the Wi-Fi generation names."
   ],
   [
    "IETF",
    "The Internet Engineering Task Force, which publishes RFCs defining protocols such as RADIUS, EAP and CAPWAP."
   ],
   [
    "FCC",
    "The United States Federal Communications Commission, which regulates spectrum use, power limits and device certification."
   ],
   [
    "Amendment",
    "An addition to the 802.11 standard identified by letters, such as 802.11ax, later rolled into a revised base standard."
   ]
  ],
  "example": "A company buys APs certified for WPA3 by the Wi-Fi Alliance, implementing the 802.11ax amendment from the IEEE. The APs authenticate users against a RADIUS server using EAP-TLS, both defined by the IETF, and the country code set on the controller ensures the APs follow the local regulator's channel and power rules.",
  "tip": "The IEEE does not certify products and does not set power limits. If a question asks who tests interoperability, answer Wi-Fi Alliance; who sets legal power, answer the local regulator such as the FCC; who defines RADIUS or EAP, answer the IETF.",
  "check": [
   [
    "Which organization created the WPA3 certification?",
    "The Wi-Fi Alliance."
   ],
   [
    "Which organization defines maximum legal EIRP for Wi-Fi in the United States?",
    "The FCC, the national regulator."
   ],
   [
    "Where do RADIUS and EAP come from?",
    "They are defined in RFCs published by the IETF."
   ]
  ]
 },
 {
  "t": "Wi-Fi Alliance certifications and generation names: Wi-Fi 4, 5, 6, 6E and 7",
  "body": [
   "For most of its history, Wi-Fi was named after IEEE amendments like 802.11n, which meant little to buyers. In 2018 the Wi-Fi Alliance introduced simple generation names. The CWNA exam and job conversations use both, so you need to map them in either direction.",
   "Wi-Fi 4 is 802.11n, the High Throughput (HT) PHY. It introduced MIMO with up to four spatial streams, 40 MHz channels and frame aggregation, and it works in both 2.4 GHz and 5 GHz. Wi-Fi 5 is 802.11ac, the Very High Throughput (VHT) PHY. It works only in 5 GHz, added 80 and 160 MHz channels, 256-QAM, standardized explicit beamforming and downlink MU-MIMO.",
   "Wi-Fi 6 is 802.11ax, the High Efficiency (HE) PHY. Its focus is efficiency in dense environments rather than peak speed for one user. It works in 2.4 GHz and 5 GHz and adds OFDMA, uplink MU-MIMO, 1024-QAM, BSS coloring and Target Wake Time. Wi-Fi 6E is not a new amendment; it is 802.11ax operating in the 6 GHz band, where regulators have opened it. Wi-Fi 7 is 802.11be, Extremely High Throughput (EHT), which adds features such as 320 MHz channels, 4096-QAM and multi-link operation (MLO), which lets a device use more than one band or channel at once.",
   "Older amendments did not receive official generation numbers from the Wi-Fi Alliance. You should still recognize them: 802.11 (the original), 802.11b, 802.11a and 802.11g. Some people informally call them Wi-Fi 1 to 3, but those names are not official and you should not rely on them.",
   "Beyond generation names, the Wi-Fi Alliance runs many certification programs. The ones you should know are Wi-Fi CERTIFIED 6 and similar generation programs; the security programs WPA2 and WPA3 (with Personal and Enterprise modes) and Wi-Fi Enhanced Open (based on Opportunistic Wireless Encryption, OWE); WMM for quality of service and WMM Power Save; Passpoint, which lets devices find and securely join hotspots automatically; Wi-Fi Protected Setup (WPS); Wi-Fi Direct for device-to-device connections; and Wi-Fi Agile Multiband, which relates to 802.11k, v and u style steering. Certification means devices passed interoperability testing for the features covered.",
   "One consequence: a certified Wi-Fi 6 device must support a defined set of 802.11ax features, but optional features in the amendment may not be present. When a data sheet lists features, check which ones are mandatory for the certification and which the vendor actually implemented."
  ],
  "terms": [
   [
    "Wi-Fi 4",
    "The Wi-Fi Alliance name for 802.11n (HT), in 2.4 and 5 GHz."
   ],
   [
    "Wi-Fi 5",
    "The Wi-Fi Alliance name for 802.11ac (VHT), in 5 GHz only."
   ],
   [
    "Wi-Fi 6 and 6E",
    "802.11ax (HE); Wi-Fi 6E is 802.11ax operating in the 6 GHz band."
   ],
   [
    "Wi-Fi 7",
    "The Wi-Fi Alliance name for 802.11be (EHT), adding 320 MHz channels, 4096-QAM and multi-link operation."
   ],
   [
    "Passpoint",
    "A Wi-Fi Alliance certification that lets devices automatically discover and securely connect to hotspots."
   ]
  ],
  "example": "A help desk ticket says a new laptop is Wi-Fi 6E but never connects to the 6 GHz network in one building. The engineer checks and finds the APs there are Wi-Fi 6 (802.11ax) radios in 2.4 and 5 GHz only, so there is no 6 GHz network for the laptop to join.",
  "tip": "Wi-Fi 6E is the same 802.11ax amendment as Wi-Fi 6, just in 6 GHz. Wi-Fi 5 (802.11ac) is 5 GHz only, while Wi-Fi 4 and Wi-Fi 6 operate in both 2.4 and 5 GHz.",
  "check": [
   [
    "Which IEEE amendment corresponds to Wi-Fi 5, and which band does it use?",
    "802.11ac, which operates only in 5 GHz."
   ],
   [
    "Is Wi-Fi 6E a new IEEE amendment?",
    "No. It is 802.11ax operating in the 6 GHz band."
   ],
   [
    "Name one feature introduced with Wi-Fi 7.",
    "Any of: 320 MHz channels, 4096-QAM or multi-link operation (MLO)."
   ]
  ]
 },
 {
  "t": "802.11 PHYs: DSSS/HR-DSSS (b), OFDM (a), ERP (g), HT (n), VHT (ac), HE (ax)",
  "body": [
   "Each 802.11 amendment that changed how bits are sent over the air defined a PHY, a physical layer specification. The 802.11 standard names PHYs by technology rather than by amendment letter, and the CWNA exam uses these names. Learn each PHY with its band, modulation and maximum data rate.",
   "DSSS is the original 1997 PHY with rates of 1 and 2 Mbps in 2.4 GHz. HR-DSSS, High Rate DSSS, from 802.11b added 5.5 and 11 Mbps using CCK. Both use 22 MHz channels. The original standard also had frequency hopping (FHSS) and infrared PHYs, which are obsolete.",
   "OFDM is the PHY from 802.11a in 5 GHz, with rates from 6 to 54 Mbps in 20 MHz channels. ERP, Extended Rate PHY, is from 802.11g. It brought OFDM rates of 6 to 54 Mbps to 2.4 GHz while remaining backward compatible with DSSS and HR-DSSS devices. ERP-OFDM is the term for its OFDM rates. Because ERP devices share a band with older 802.11b devices that cannot decode OFDM, ERP introduced protection mechanisms, which reduce throughput when legacy devices are present.",
   "HT, High Throughput, is the 802.11n PHY. It works in both 2.4 and 5 GHz, adds MIMO with up to four spatial streams, 40 MHz channels, a short guard interval option and aggregation. Its maximum data rate is 600 Mbps with four streams, 40 MHz and a short guard interval.",
   "VHT, Very High Throughput, is the 802.11ac PHY, 5 GHz only. It adds 80 MHz and 160 MHz (or 80+80 MHz) channels, 256-QAM, up to eight spatial streams in the standard and downlink MU-MIMO. The theoretical maximum is about 6.9 Gbps, though real products support fewer streams.",
   "HE, High Efficiency, is the 802.11ax PHY. It works in 2.4, 5 and, where allowed, 6 GHz. It uses 1024-QAM, OFDMA, uplink and downlink MU-MIMO, and a subcarrier spacing four times narrower than earlier OFDM (78.125 kHz instead of 312.5 kHz) with longer symbols. Its theoretical maximum is about 9.6 Gbps. Its successor, EHT (802.11be), is covered as Wi-Fi 7.",
   "Backward compatibility is important. A 2.4 GHz HE radio can serve HR-DSSS, ERP and HT clients, and a 5 GHz radio can serve OFDM, HT, VHT and HE clients. But supporting older rates costs airtime, which is why many designs disable the 802.11b rates."
  ],
  "terms": [
   [
    "PHY",
    "A physical layer specification in the 802.11 standard, defining how bits are transmitted over the air."
   ],
   [
    "ERP",
    "Extended Rate PHY from 802.11g, bringing OFDM rates up to 54 Mbps to 2.4 GHz with backward compatibility."
   ],
   [
    "HT",
    "High Throughput PHY from 802.11n, with MIMO, 40 MHz channels and rates up to 600 Mbps."
   ],
   [
    "VHT",
    "Very High Throughput PHY from 802.11ac, 5 GHz only, with up to 160 MHz channels and 256-QAM."
   ],
   [
    "HE",
    "High Efficiency PHY from 802.11ax, with OFDMA, 1024-QAM and operation in 2.4, 5 and 6 GHz."
   ]
  ],
  "example": "A survey tool lists nearby networks with PHY types. One old printer shows HR-DSSS, most laptops show HE and a few older phones show HT. The engineer confirms the 2.4 GHz radios must still support the printer's 11 Mbps rates, or plans to move the printer to a wired connection so legacy rates can be disabled.",
  "tip": "Match names to bands: OFDM (a) and VHT (ac) are 5 GHz only; DSSS, HR-DSSS and ERP are 2.4 GHz only; HT (n) and HE (ax) are dual band, and HE also operates in 6 GHz.",
  "check": [
   [
    "Which PHY is defined by 802.11g?",
    "ERP, the Extended Rate PHY, in 2.4 GHz."
   ],
   [
    "What is the maximum data rate of the HT PHY?",
    "600 Mbps, with four spatial streams, 40 MHz channels and a short guard interval."
   ],
   [
    "Which PHYs operate only in 5 GHz?",
    "OFDM (802.11a) and VHT (802.11ac)."
   ]
  ]
 },
 {
  "t": "2.4 GHz channels, channel overlap and the 1/6/11 plan",
  "body": [
   "The 2.4 GHz ISM (Industrial, Scientific and Medical) band is shared by Wi-Fi, Bluetooth, microwave ovens and many other devices. It is narrow, about 83.5 MHz wide from 2.400 to 2.4835 GHz, which makes channel planning here unforgiving.",
   "The band is divided into 14 channels whose center frequencies are only 5 MHz apart, starting with channel 1 at 2.412 GHz. Channel 14, at 2.484 GHz, is a special case historically allowed only in Japan and only for DSSS. In the United States, channels 1 through 11 are used; many other regions allow 1 through 13. Always check the regulatory domain configured on your equipment.",
   "The problem is that a Wi-Fi transmission is much wider than the 5 MHz spacing. DSSS and HR-DSSS signals are 22 MHz wide and ERP, HT and HE OFDM signals are 20 MHz wide. As a result, adjacent channel numbers overlap heavily. For channels not to overlap, their centers need to be about 25 MHz apart for DSSS, which is five channel numbers.",
   "That is why the standard plan for North America is channels 1, 6 and 11: the only set of three non-overlapping channels available when you can use channels 1 to 11. In regions with channels 1 to 13, some designers use 1, 5, 9 and 13 for OFDM-only networks, but 1, 6 and 11 remains the common global recommendation and the one the exam focuses on.",
   "Two kinds of interference matter. Co-channel interference, more precisely co-channel contention (CCC), happens when APs and clients on the same channel hear each other; they follow medium contention rules and take turns, which wastes airtime but does not corrupt frames. Adjacent channel interference (ACI) happens when devices use overlapping channels, such as 1 and 3. They cannot decode each other, so they do not defer properly, and their overlapping energy corrupts frames and causes retries. ACI is generally worse than co-channel contention, which is why using only 1, 6 and 11 is recommended over squeezing in channel 3 or 9.",
   "Bonding two 20 MHz channels into a 40 MHz channel in 2.4 GHz is technically possible with 802.11n and later but is strongly discouraged. With only three non-overlapping 20 MHz channels, a 40 MHz channel consumes most of the band and leaves no clean channel plan. In practice, enterprise designs use 20 MHz channels only in 2.4 GHz and often turn off some 2.4 GHz radios in dense deployments to reduce co-channel contention."
  ],
  "terms": [
   [
    "ISM band",
    "Industrial, Scientific and Medical band; unlicensed spectrum that includes 2.4 GHz and is shared by many device types."
   ],
   [
    "Channel overlap",
    "The situation where signals on nearby channel numbers occupy overlapping frequencies because channels are 5 MHz apart but signals are 20 to 22 MHz wide."
   ],
   [
    "Adjacent channel interference (ACI)",
    "Interference from devices on overlapping channels that corrupts frames because the devices do not defer to each other."
   ],
   [
    "Co-channel contention (CCC)",
    "Airtime sharing among devices on the same channel that hear each other and take turns under medium access rules."
   ]
  ],
  "example": "A small office has three APs set to channels 1, 4 and 8 by a well-meaning technician. Users see frequent retries and slow downloads. Changing the APs to 1, 6 and 11 removes the overlapping adjacent channel interference, and throughput improves even though the APs still share the band.",
  "tip": "Channels 1, 6 and 11 are the only three non-overlapping channels when 1 to 11 are allowed. Overlapping channels (ACI) cause corruption, which is usually worse than co-channel contention, where devices simply take turns.",
  "check": [
   [
    "How far apart are 2.4 GHz channel center frequencies?",
    "5 MHz, which is why adjacent channel numbers overlap."
   ],
   [
    "Why is using channels 1, 3, 6, 9 and 11 worse than using only 1, 6 and 11?",
    "Channels 3 and 9 overlap their neighbors, creating adjacent channel interference that corrupts frames."
   ],
   [
    "Why are 40 MHz channels discouraged in 2.4 GHz?",
    "The band has only three non-overlapping 20 MHz channels, so a 40 MHz channel leaves no workable channel reuse plan."
   ]
  ]
 },
 {
  "t": "5 GHz U-NII bands, 20/40/80/160 MHz channel bonding and channel numbering",
  "body": [
   "The 5 GHz band provides far more spectrum than 2.4 GHz and is the workhorse of enterprise Wi-Fi. In the United States it is organized into U-NII bands (Unlicensed National Information Infrastructure). Exact availability varies by country, so treat the following as the common US picture and always check your regulatory domain.",
   "U-NII-1 covers 5.150 to 5.250 GHz, channels 36, 40, 44 and 48. U-NII-2A covers 5.250 to 5.350 GHz, channels 52 to 64. U-NII-2C, sometimes called U-NII-2 Extended, covers 5.470 to 5.725 GHz, channels 100 to 144. U-NII-3 covers 5.725 to 5.850 GHz, channels 149 to 165. The FCC has also opened U-NII-4, 5.850 to 5.925 GHz, with channels 169 to 177, subject to specific rules. U-NII-2A and U-NII-2C are shared with radar, so they require DFS (dynamic frequency selection), covered in a later lesson.",
   "Channel numbers in 5 GHz map directly to frequency. The center frequency in MHz equals 5000 plus 5 times the channel number. Channel 36 is 5000 + 180 = 5180 MHz; channel 149 is 5745 MHz. Because 20 MHz channels are spaced every four channel numbers (36, 40, 44), adjacent 20 MHz channels in 5 GHz do not overlap, unlike 2.4 GHz.",
   "Channel bonding combines adjacent 20 MHz channels into wider channels. 802.11n introduced 40 MHz channels, made of a primary 20 MHz channel and a secondary channel. 802.11ac added 80 MHz and 160 MHz channels, and 80+80 MHz made of two non-contiguous 80 MHz blocks. Bonded channels are identified by their center channel number: for example, 36 to 48 bonded as 80 MHz is often called channel 42, and 36 to 64 as 160 MHz is channel 50. Management and control frames and basic access are still handled on the primary 20 MHz channel.",
   "Wider channels roughly double the data rate for each doubling of width, but they have costs. Fewer non-overlapping channels are available, so co-channel contention rises. Noise across a wider channel is higher, which reduces SNR by about 3 dB per doubling. And many clients cannot use the widest channels. In the US, you have about 25 usable 20 MHz channels when DFS channels are included, around 12 at 40 MHz, about 6 at 80 MHz and only a handful at 160 MHz.",
   "For that reason, most enterprise designs use 20 or 40 MHz channels in 5 GHz, reserving 80 MHz for lower-density areas, and include DFS channels when the environment allows. Home networks often use 80 MHz because there are few neighbors competing."
  ],
  "terms": [
   [
    "U-NII",
    "Unlicensed National Information Infrastructure, the US naming for 5 GHz (and 6 GHz) sub-bands."
   ],
   [
    "Channel bonding",
    "Combining adjacent 20 MHz channels into 40, 80 or 160 MHz channels for higher data rates."
   ],
   [
    "Primary channel",
    "The 20 MHz channel within a bonded channel on which beacons and basic medium access take place."
   ],
   [
    "Center frequency formula",
    "In 5 GHz, center frequency in MHz = 5000 + 5 x channel number."
   ]
  ],
  "example": "A hospital deploys 60 APs across three floors. Using 80 MHz channels would leave only a handful of channels and high co-channel contention, so the design uses 20 MHz channels including DFS channels, giving over 20 channels to reuse and fewer APs sharing each one.",
  "tip": "Wider channels increase peak rate but reduce the number of channels for reuse and raise the noise floor. In dense enterprise designs, 20 or 40 MHz is often the right choice in 5 GHz.",
  "check": [
   [
    "What is the center frequency of channel 44?",
    "5220 MHz, because 5000 + 5 x 44 = 5220."
   ],
   [
    "Which U-NII bands require DFS in the United States?",
    "U-NII-2A (channels 52 to 64) and U-NII-2C (channels 100 to 144)."
   ],
   [
    "Name two drawbacks of 80 MHz channels in a dense deployment.",
    "Fewer channels for reuse, causing more co-channel contention, and a higher noise floor that lowers SNR; many clients also cannot use them."
   ]
  ]
 },
 {
  "t": "6 GHz operation: WPA3 or Enhanced Open requirement and preferred scanning channels",
  "body": [
   "The 6 GHz band is the newest Wi-Fi spectrum, used by Wi-Fi 6E (802.11ax) and Wi-Fi 7 (802.11be) devices. In the United States regulators opened 1200 MHz from 5.925 to 7.125 GHz for unlicensed use; many other countries, including much of Europe, opened a smaller portion, and some have opened none. That makes regulatory domain settings especially important in this band.",
   "6 GHz is a clean slate. Only HE and newer devices may operate there, so there are no legacy 802.11a/b/g/n/ac clients to slow the network down and no need for protection mechanisms. With so much spectrum in the US, the band holds 59 non-overlapping 20 MHz channels, 29 at 40 MHz, 14 at 80 MHz and 7 at 160 MHz, which makes wider channels practical in many designs. Channel numbers run 1, 5, 9 and so on, and the center frequency in MHz is 5950 plus 5 times the channel number.",
   "Security rules are stricter here. The Wi-Fi Alliance requires 6 GHz networks to use WPA3 (Personal with SAE, Simultaneous Authentication of Equals, or Enterprise) or Wi-Fi Enhanced Open, which uses OWE (Opportunistic Wireless Encryption) to encrypt open networks without a password. Protected Management Frames (802.11w) are mandatory. WEP, TKIP, WPA2-only and unencrypted open networks are not allowed. When you add a 6 GHz radio to an existing WPA2 SSID, you must plan a transition, often a WPA3 or transition-mode SSID, because clients cannot join a 6 GHz BSS using WPA2.",
   "Discovery is also different. Scanning 59 channels by sending probe requests on each would be slow and would add a lot of management traffic. So the rules limit active probing in 6 GHz and give clients other ways to find APs. Preferred Scanning Channels (PSCs) are a subset of 20 MHz channels, every fourth one (channels 5, 21, 37 and so on, one in each 80 MHz block), that clients scan first. Designers generally place the primary channel of each 6 GHz BSS on a PSC so clients find it quickly.",
   "Other discovery methods include the Reduced Neighbor Report (RNR) element, which a 2.4 or 5 GHz radio includes in its beacons and probe responses to advertise co-located 6 GHz BSSs. Clients then go straight to the 6 GHz channel. APs may also send FILS Discovery frames or unsolicited broadcast probe responses frequently on the 6 GHz channel, so passive scanning clients discover them fast.",
   "Power in 6 GHz comes in device classes. Low Power Indoor (LPI) APs are for indoor use only at modest power. Standard Power APs can transmit more and can operate outdoors, but they must check an Automated Frequency Coordination (AFC) system to avoid interfering with licensed incumbents such as fixed microwave links. Very Low Power (VLP) devices are intended for short-range, portable use. Exact availability of each class varies by country."
  ],
  "terms": [
   [
    "Preferred Scanning Channel (PSC)",
    "One of a subset of 6 GHz 20 MHz channels, one per 80 MHz block, that clients scan first when discovering APs."
   ],
   [
    "Reduced Neighbor Report (RNR)",
    "An element in 2.4 and 5 GHz beacons and probe responses that advertises co-located 6 GHz BSSs."
   ],
   [
    "Enhanced Open (OWE)",
    "A Wi-Fi Alliance certification using Opportunistic Wireless Encryption to encrypt open networks without a password."
   ],
   [
    "AFC",
    "Automated Frequency Coordination, a system Standard Power 6 GHz devices consult to avoid interfering with licensed users."
   ]
  ],
  "example": "A company enables 6 GHz on its new Wi-Fi 6E APs but leaves the corporate SSID on WPA2-Enterprise. The 6 GHz radios either do not broadcast that SSID or clients cannot join. Moving the SSID to WPA3-Enterprise with PMF enabled lets 6E laptops join, and RNR in the 5 GHz beacons guides them to the 6 GHz channel.",
  "tip": "6 GHz requires WPA3 or Enhanced Open with PMF; WPA2 and open networks are not allowed. Put 6 GHz primary channels on PSCs and remember RNR, sent in 2.4 and 5 GHz beacons, helps clients find 6 GHz APs.",
  "check": [
   [
    "Which security options are allowed on a 6 GHz BSS?",
    "WPA3 (Personal with SAE or Enterprise) or Wi-Fi Enhanced Open (OWE), with Protected Management Frames required."
   ],
   [
    "What is a Preferred Scanning Channel?",
    "One of the 6 GHz 20 MHz channels, one per 80 MHz block, that clients scan first; APs place their primary channel on a PSC to be discovered quickly."
   ],
   [
    "How does a client learn about a 6 GHz AP without scanning every 6 GHz channel?",
    "Through the Reduced Neighbor Report in 2.4 or 5 GHz beacons and probe responses, or by hearing FILS Discovery frames or unsolicited probe responses on PSCs."
   ]
  ]
 },
 {
  "t": "DFS and TPC requirements in 5 GHz radar bands",
  "body": [
   "Parts of the 5 GHz band are shared with radar systems, including military, aviation and weather radar. Radar has priority, so Wi-Fi devices using those channels must detect it and get out of the way. The mechanisms are Dynamic Frequency Selection (DFS) and Transmit Power Control (TPC), originally defined in the 802.11h amendment and now part of the base standard.",
   "In the US, DFS is required in U-NII-2A (channels 52 to 64) and U-NII-2C (channels 100 to 144). The process has several stages. Before an AP transmits on a DFS channel, it performs a Channel Availability Check (CAC), listening for radar, commonly for 60 seconds; some channels near weather radar frequencies require a longer check in some regions. While operating, the AP performs in-service monitoring. If it detects radar, it must stop transmitting on that channel within a short time and move off, and the channel is then placed on a non-occupancy list, commonly for 30 minutes, before the AP may use it again.",
   "To move clients smoothly, the AP can include a Channel Switch Announcement element in beacons and action frames, telling associated clients which channel it is moving to and when. Clients do not need their own radar detection in most cases; they are typically slaves (client devices) that transmit only when an AP (the master) permits it, and they will not actively probe on a DFS channel until they hear a beacon there.",
   "DFS causes some practical issues. Radar events, real or false, force channel changes that interrupt users briefly. Some client devices do not support DFS channels, so an SSID only available on DFS channels may be invisible to them. Clients also discover DFS-channel APs more slowly because they must scan passively. Still, DFS channels more than double the number of 20 MHz channels available in the US (from 9 to 25), so most enterprise designs use them unless a site has frequent radar or unsupported clients.",
   "TPC lets devices reduce transmit power to avoid interference. An AP can advertise a Power Constraint element that tells clients how much below the regulatory maximum they should transmit, and devices can exchange TPC Request and Report frames to learn link margin and transmit power. Some regulators require TPC capability for devices above a certain power level in radar bands. Separately, many vendors use automatic power control in their radio resource management, but that is a vendor feature, not the 802.11h TPC mechanism.",
   "When you see unexpected channel changes in 5 GHz, check the controller's event logs for radar detection. Patterns such as repeated events near an airport or weather station may justify excluding specific channels from the plan."
  ],
  "terms": [
   [
    "DFS",
    "Dynamic Frequency Selection, which requires Wi-Fi devices to detect radar and vacate the channel."
   ],
   [
    "Channel Availability Check (CAC)",
    "The listening period before transmitting on a DFS channel to confirm no radar is present."
   ],
   [
    "Non-occupancy period",
    "The time, commonly 30 minutes, a channel may not be used after radar is detected on it."
   ],
   [
    "TPC",
    "Transmit Power Control, an 802.11h mechanism that allows devices to reduce transmit power, including through the Power Constraint element."
   ],
   [
    "Channel Switch Announcement",
    "An element that tells associated clients the AP is moving to a new channel and when."
   ]
  ],
  "example": "APs near a regional airport log radar events on channels 100 to 116 several times a day. Each event forces a channel change and brief interruptions for voice users. The engineer removes those channels from the automatic channel list for that site while keeping other DFS channels in use.",
  "tip": "DFS protects radar in U-NII-2A and U-NII-2C. Remember the sequence: channel availability check before use, in-service monitoring, move off with a Channel Switch Announcement on detection, then a non-occupancy period.",
  "check": [
   [
    "What must an AP do before transmitting on a DFS channel?",
    "Perform a Channel Availability Check, listening for radar for the required time, commonly 60 seconds."
   ],
   [
    "How does an AP tell its clients it is leaving a channel after detecting radar?",
    "By sending a Channel Switch Announcement in beacons or action frames."
   ],
   [
    "Which 802.11 element tells clients to reduce transmit power below the regulatory maximum?",
    "The Power Constraint element, part of TPC."
   ]
  ]
 },
 {
  "t": "802.11ax features: OFDMA resource units, 1024-QAM, BSS coloring, Target Wake Time, uplink MU-MIMO",
  "body": [
   "802.11ax, called High Efficiency (HE) and marketed as Wi-Fi 6, was designed for crowded environments such as stadiums, schools and apartment blocks. Earlier amendments pushed peak speed for one client; 802.11ax focuses on using airtime more efficiently for many clients. Five features appear on the exam again and again.",
   "OFDMA divides a channel into resource units (RUs), groups of subcarriers that the AP assigns to different clients in the same transmission. RU sizes are named by the number of subcarriers, called tones: 26, 52, 106, 242, 484 and 996 tones, with larger combinations for 160 MHz. A 20 MHz channel can be split into as many as nine 26-tone RUs, so up to nine clients can share one transmission. This greatly reduces overhead for small frames such as voice, chat or IoT traffic. For uplink OFDMA, the AP sends a trigger frame telling each client which RU to use and when, and clients transmit together.",
   "1024-QAM carries 10 bits per symbol, 25 percent more than 256-QAM. It appears as MCS 10 and 11. It needs very high SNR, so in practice only clients close to the AP use it. HE also uses longer OFDM symbols and narrower subcarrier spacing, which improves efficiency and outdoor robustness.",
   "BSS coloring addresses co-channel contention. Each BSS is assigned a color, a number from 1 to 63 carried in the HE PHY header. When a radio hears a frame, it can check the color early. If the frame is from its own BSS, it defers as usual. If it is from an overlapping BSS (OBSS) with a different color and the signal is below an adjusted threshold (OBSS PD, preamble detect), the radio may ignore it and transmit, possibly at reduced power. This spatial reuse lets nearby cells on the same channel transmit more often.",
   "Target Wake Time (TWT), adapted from 802.11ah, lets a client and AP negotiate when the client will wake to send or receive data. The client can sleep for long, scheduled periods, saving battery, and the AP can spread client activity to reduce contention. It is especially useful for IoT sensors and phones.",
   "Uplink MU-MIMO lets multiple clients transmit to the AP on different spatial streams at the same time, coordinated by trigger frames. 802.11ac supported only downlink MU-MIMO. 802.11ax supports both directions. OFDMA and MU-MIMO are different ways to share a transmission: OFDMA divides frequency, while MU-MIMO divides space, and they can be combined.",
   "Keep expectations realistic: many of these benefits require both AP and clients to support 802.11ax, and legacy clients on the same radio still consume airtime the old way."
  ],
  "terms": [
   [
    "Resource unit (RU)",
    "A group of OFDMA subcarriers, such as 26, 52, 106 or 242 tones, assigned to one client within a transmission."
   ],
   [
    "Trigger frame",
    "An 802.11ax control frame that schedules uplink OFDMA or uplink MU-MIMO transmissions from multiple clients."
   ],
   [
    "BSS coloring",
    "A number from 1 to 63 in the HE header that identifies a BSS so radios can distinguish overlapping BSS traffic and apply spatial reuse."
   ],
   [
    "Target Wake Time (TWT)",
    "A negotiated schedule for when a client wakes to communicate, improving battery life and reducing contention."
   ],
   [
    "1024-QAM",
    "A modulation carrying 10 bits per symbol, added in 802.11ax as MCS 10 and 11."
   ]
  ],
  "example": "In a lecture hall, 200 students send small chat and web requests. With OFDMA, an 802.11ax AP serves several of them in each transmission using 26- or 52-tone RUs, cutting per-frame overhead. Meanwhile BSS coloring lets the AP in the next hall on the same channel transmit when it hears weak frames of a different color.",
  "tip": "OFDMA shares frequency (resource units), MU-MIMO shares space (spatial streams). Uplink MU-MIMO and OFDMA are new in 802.11ax; downlink MU-MIMO started with 802.11ac. BSS coloring is about spatial reuse, not security.",
  "check": [
   [
    "What is the maximum number of 26-tone resource units in a 20 MHz channel?",
    "Nine."
   ],
   [
    "What problem does BSS coloring help solve?",
    "Co-channel contention between overlapping BSSs, by letting radios identify frames from other BSSs and transmit when the frame is weak enough (spatial reuse)."
   ],
   [
    "Which frame coordinates uplink OFDMA transmissions?",
    "The trigger frame sent by the AP."
   ]
  ]
 },
 {
  "t": "Roaming and management amendments: 802.11k, 802.11r, 802.11v and 802.11w",
  "body": [
   "Four amendments improve how clients move between APs and how management traffic is protected. They are now part of the base 802.11 standard but are still referred to by their amendment letters. Each solves a different problem, and exam questions often describe the problem and ask which amendment addresses it.",
   "802.11k, Radio Resource Measurement, helps a client decide where to roam. Its best-known feature is the neighbor report: the client asks its AP for a list of nearby APs and their channels, so it can scan only those channels instead of the whole band. 802.11k also defines other measurements, such as beacon reports, where the AP asks a client which APs it can hear and how strongly, and link measurement reports.",
   "802.11v, Wireless Network Management, lets the network suggest actions to clients. BSS Transition Management (BTM) is the key feature: an AP can send a BTM request suggesting that a client move to a different AP, for example because the current AP is overloaded or the client's signal is weak. The client can accept or reject the suggestion; the final decision still belongs to the client. 802.11v also includes power-saving features such as WNM sleep mode and directed multicast service.",
   "802.11r, Fast BSS Transition (FT), speeds up the security part of roaming. With WPA2 or WPA3-Enterprise, a full roam would require a new 802.1X/EAP authentication and 4-way handshake, which can take hundreds of milliseconds and break voice calls. 802.11r creates a key hierarchy (PMK-R0 and PMK-R1) that is distributed to APs in a mobility domain in advance, so the client can derive new keys during the authentication and reassociation exchange itself. FT can happen over the air, directly with the target AP, or over the DS (distribution system), through the current AP. The goal is a transition fast enough for voice, often cited as under about 50 ms of audio gap.",
   "802.11w, Protected Management Frames (PMF), protects certain management frames. Without it, deauthentication and disassociation frames are unauthenticated, so an attacker can forge them to knock clients off the network. PMF adds integrity protection to these frames and to robust action frames, and uses an SA Query procedure to check whether a request to tear down an association is genuine. PMF is required for WPA3 and 6 GHz, and optional or capable mode in WPA2.",
   "In the lab, you can see these features in beacons and association frames: the RSN element shows PMF capability, the Mobility Domain element signals 802.11r, and the Extended Capabilities and RM Enabled Capabilities elements show 802.11v and 802.11k support."
  ],
  "terms": [
   [
    "802.11k",
    "Radio Resource Measurement, providing neighbor reports and other measurements that help clients choose roaming targets."
   ],
   [
    "802.11v",
    "Wireless Network Management, including BSS Transition Management requests that suggest a better AP to a client."
   ],
   [
    "802.11r",
    "Fast BSS Transition, which pre-distributes keys so clients can roam without repeating full 802.1X and the 4-way handshake."
   ],
   [
    "802.11w",
    "Protected Management Frames, adding integrity protection to deauthentication, disassociation and robust action frames."
   ]
  ],
  "example": "A hospital's voice handsets drop calls when nurses walk between wings. Enabling 802.11r cuts the security exchange during each roam, 802.11k neighbor reports shorten the scan, and 802.11w stops forged deauthentication frames seen in a security scan from disconnecting devices.",
  "tip": "Match problem to amendment: which AP is nearby (k), network suggests moving (v), fast secure key exchange (r), protect deauth and disassoc frames (w). The client always makes the final roaming decision, even with 802.11v.",
  "check": [
   [
    "Which amendment lets a client request a list of neighboring APs?",
    "802.11k, through the neighbor report."
   ],
   [
    "What does 802.11w protect against?",
    "Forged deauthentication and disassociation frames and other attacks on robust management frames."
   ],
   [
    "Why is 802.11r important for voice over Wi-Fi with 802.1X?",
    "It avoids a full 802.1X authentication and 4-way handshake at each roam, keeping the transition short enough to avoid dropped audio."
   ]
  ]
 },
 {
  "t": "Regulatory power limits, EIRP rules and why they vary by country",
  "body": [
   "Every country decides for itself how its radio spectrum is used. That is why a Wi-Fi device can legally use a channel or power level in one country and not in another. As a wireless administrator, you must configure equipment to follow the rules of the country where it operates, usually by setting the correct country code or regulatory domain on the controller or AP.",
   "Regulators set rules on several things: which frequencies and channels are allowed, maximum conducted transmit power at the radio, maximum EIRP after antenna gain, power spectral density limits, whether the band may be used indoors or outdoors, whether DFS and TPC are required and what device certification is needed. In the United States, unlicensed Wi-Fi rules are in the FCC's Part 15. In Europe, regulations in each country generally follow ETSI standards. Other countries have their own authorities.",
   "Why do the rules differ? Each country has different incumbent users of spectrum, such as radar, satellite services, fixed links or broadcasting, and has made different policy decisions and international agreements through the ITU-R. For example, the 2.4 GHz band allows channels up to 11 in the US but up to 13 in much of the world, and European 2.4 GHz rules have a much lower EIRP limit, commonly quoted as 100 mW, than US rules. The amount of 6 GHz spectrum opened also differs widely by country.",
   "EIRP rules matter when you change antennas. If you replace an AP's standard antenna with a higher-gain one, EIRP rises by the difference in gain unless you lower transmit power. Vendors certify specific antenna and power combinations, and using an uncertified antenna can make a system illegal even if the radio setting looks fine.",
   "US rules also treat point-to-multipoint (PtMP) and point-to-point (PtP) links differently in some bands. In 2.4 GHz, a PtMP system is commonly limited to 1 W conducted power with a 6 dBi antenna, for 36 dBm (4 W) EIRP. For fixed PtP links, the FCC allows higher-gain antennas: for every 3 dBi of antenna gain above 6 dBi, you reduce the transmitter power by 1 dB, which is known as the 3:1 rule. In the upper 5 GHz U-NII-3 band, fixed PtP links are allowed to use high-gain antennas without that reduction. You do not need to memorize every value, but you should understand why PtP links get more allowance: their narrow beams interfere less with other users.",
   "In practice, enterprise APs rarely run at the legal maximum anyway, because designs balance AP power with client power. Still, the exam expects you to know that EIRP is the value regulators usually care about, that limits depend on the country, band and use type, and that the administrator is responsible for configuring the correct country code."
  ],
  "terms": [
   [
    "Regulatory domain",
    "The set of spectrum rules (channels, power, DFS) for a country, selected on equipment with a country code."
   ],
   [
    "Conducted power",
    "The transmit power delivered by the radio to the antenna system, before antenna gain."
   ],
   [
    "Point-to-point (PtP)",
    "A link between exactly two fixed sites, often allowed more antenna gain because of its narrow beam."
   ],
   [
    "3:1 rule",
    "An FCC 2.4 GHz rule for fixed PtP links: reduce transmitter power by 1 dB for every 3 dBi of antenna gain above 6 dBi."
   ]
  ],
  "example": "A multinational company ships identical APs to offices in the US and Germany. The US controller uses the US country code and allows channels 1 to 11 with higher 2.4 GHz power. The German site's APs use the German country code, which enables channels 12 and 13 but enforces lower EIRP and different 5 GHz rules.",
  "tip": "Regulators usually limit EIRP, so changing to a higher-gain antenna can make an installation illegal unless transmit power is reduced. The administrator, not the vendor, is responsible for setting the correct country code.",
  "check": [
   [
    "Why might an AP legally use channel 13 in one country but not another?",
    "Each country's regulator sets its own allowed channels based on local incumbents and policy."
   ],
   [
    "Under the FCC 3:1 rule, how much must transmitter power drop for a 12 dBi antenna on a 2.4 GHz PtP link?",
    "2 dB, because 12 dBi is 6 dB above the 6 dBi baseline and each 3 dB requires a 1 dB reduction."
   ],
   [
    "What happens to EIRP if you swap a 4 dBi antenna for a 10 dBi antenna without changing transmit power?",
    "EIRP increases by 6 dB, which may exceed the legal limit."
   ]
  ]
 },
 {
  "t": "802.11 frame types: management, control and data, and common subtypes (beacon, probe, auth, assoc, ACK, RTS/CTS, null data)",
  "body": [
   "Every 802.11 transmission is a frame, and each frame has a type and subtype carried in the Frame Control field at the start of the MAC header. There are three main types: management, control and data. Knowing which frames belong to which type, and what each does, is essential for reading packet captures and for the exam.",
   "Management frames create, maintain and end the relationship between clients and APs. Beacons are sent periodically by APs, by default about every 102.4 ms (100 time units), advertising the SSID, supported rates, security and capabilities. Probe requests are sent by clients looking for networks, and probe responses come back from APs. Authentication frames perform 802.11 authentication, which in modern networks is usually Open System, a simple two-frame exchange. Association request and response frames join a client to the AP; reassociation request and response are used when roaming. Deauthentication and disassociation frames end the relationship. Action frames carry many functions, such as 802.11k and v requests, Block Ack setup and channel switch announcements.",
   "Control frames help deliver other frames and manage access to the medium. The acknowledgment (ACK) frame confirms successful receipt of a unicast frame; if the sender does not receive the ACK, it retransmits. Request to Send (RTS) and Clear to Send (CTS) frames reserve the medium before a transmission. Block Ack Request and Block Ack frames acknowledge groups of frames at once. PS-Poll is used by legacy power-saving clients to request buffered data. 802.11ax adds the trigger frame for scheduling multi-user uplink transmissions.",
   "Data frames carry the actual upper-layer payload, such as IP packets. The QoS Data subtype adds a QoS Control field with the traffic priority used by WMM. Some data frames carry no payload at all. The null data frame, and its QoS Null variant, is used mainly to signal power management: a client sends a null data frame with the power management bit set to tell the AP it is going to sleep, often before scanning another channel. Null data frames can also serve as keepalives.",
   "Broadcast and multicast frames are not acknowledged, only unicast frames are. Management frames such as beacons are sent at a basic (mandatory) data rate so all stations can decode them, which is one reason why disabling low data rates reduces airtime used by beacons.",
   "In a protocol analyzer, filter on type and subtype to find these frames. For example, Wireshark displays wlan.fc.type_subtype, and you can filter for beacons, probe responses or ACKs to troubleshoot discovery, association or retry problems."
  ],
  "terms": [
   [
    "Management frame",
    "An 802.11 frame type used to discover, join, maintain and leave a BSS, such as beacons, probes, authentication and association."
   ],
   [
    "Control frame",
    "An 802.11 frame type that assists delivery and medium access, such as ACK, RTS, CTS and Block Ack."
   ],
   [
    "Data frame",
    "An 802.11 frame type carrying upper-layer payload, including QoS Data; null data frames carry no payload."
   ],
   [
    "Beacon",
    "A management frame sent periodically by an AP to advertise the BSS and its capabilities."
   ],
   [
    "Null data frame",
    "A data frame with no payload, commonly used to signal power management state to the AP."
   ]
  ],
  "example": "Looking at a capture, an analyst sees a client send a null data frame with the power management bit set, then probe requests on other channels, then another null data frame with the bit cleared. This shows the client telling the AP to buffer its traffic while it went off-channel to scan.",
  "tip": "Know the type of each frame: beacons, probes, authentication, association and action frames are management; ACK, RTS, CTS, Block Ack and PS-Poll are control; null data is a data frame even though it carries no payload.",
  "check": [
   [
    "Is an association request a management, control or data frame?",
    "A management frame."
   ],
   [
    "What does a client usually use a null data frame for?",
    "To tell the AP it is entering or leaving power save mode, for example before off-channel scanning."
   ],
   [
    "Are broadcast frames acknowledged in 802.11?",
    "No. Only unicast frames receive ACKs."
   ]
  ]
 },
 {
  "t": "Frame addressing: BSSID, SSID/ESSID, source, destination, transmitter and receiver addresses",
  "body": [
   "Wired Ethernet frames need only a source and destination address. 802.11 frames can carry up to four MAC addresses, because a frame may pass through an AP between the wireless medium and the wired network. Understanding which address is which is a frequent exam topic and a practical skill for reading captures.",
   "Start with the network identifiers. The SSID (Service Set Identifier) is the logical network name users see, up to 32 bytes. A basic service set (BSS) is one AP radio and its associated clients. Its unique identifier is the BSSID, a 48-bit MAC address, normally the MAC of the AP radio or a virtual address derived from it when an AP offers several SSIDs. An extended service set (ESS) is a group of BSSs sharing the same SSID connected by a distribution system (DS), usually the wired network, so the SSID of that group is sometimes called the ESSID.",
   "There are four address roles. The source address (SA) is the original sender of the payload. The destination address (DA) is the final recipient. The transmitter address (TA) is the radio that sent this frame over the air. The receiver address (RA) is the radio that should receive this frame over the air. On a wired network, SA and TA are always the same; in Wi-Fi they may differ because the AP relays frames.",
   "Two bits in the Frame Control field, To DS and From DS, tell you how to read Address 1, 2 and 3. Address 1 is always the receiver and Address 2 is always the transmitter.",
   "```text\nTo DS From DS  Address 1   Address 2   Address 3   Address 4\n  0     0       DA (RA)     SA (TA)     BSSID       -\n  1     0       BSSID (RA)  SA (TA)     DA          -\n  0     1       DA (RA)     BSSID (TA)  SA          -\n  1     1       RA          TA          DA          SA\n```",
   "Read the table with examples. A laptop sending a packet to a server on the wired LAN sets To DS = 1: Address 1 is the BSSID (the AP receives it), Address 2 is the laptop (source and transmitter) and Address 3 is the server's MAC (the final destination). When the server replies, the AP sends a frame with From DS = 1: Address 1 is the laptop, Address 2 is the BSSID and Address 3 is the server as source. Both bits at 0 is used for management and control frames and in ad hoc (IBSS) networks. Both bits at 1 is the four-address format used in wireless distribution systems such as mesh and bridge links.",
   "Some control frames, such as ACK and CTS, carry only a receiver address, which is why a capture may show an ACK with no transmitter. You infer the sender from the preceding frame."
  ],
  "terms": [
   [
    "BSSID",
    "The 48-bit MAC address that uniquely identifies a BSS, usually derived from the AP radio's MAC."
   ],
   [
    "SSID / ESSID",
    "The logical network name; ESSID refers to the name shared across all BSSs in an extended service set."
   ],
   [
    "Transmitter address (TA)",
    "The MAC address of the radio that sent the frame over the air."
   ],
   [
    "Receiver address (RA)",
    "The MAC address of the radio intended to receive the frame over the air."
   ],
   [
    "To DS / From DS",
    "Frame Control bits indicating whether a frame is going to or coming from the distribution system, which define address field meanings."
   ]
  ],
  "example": "An analyst traces a missing ping. The capture shows the laptop's frame with To DS = 1, Address 1 set to the BSSID, Address 3 set to the default gateway's MAC. The AP acknowledged it, so the frame reached the AP; the problem must be on the wired side or at the gateway.",
  "tip": "Address 1 is always the receiver and Address 2 is always the transmitter. With To DS set, Address 1 is the BSSID; with From DS set, Address 2 is the BSSID. Four addresses appear only when both bits are 1.",
  "check": [
   [
    "In a frame from a client to the wired network (To DS = 1, From DS = 0), what is Address 3?",
    "The destination address (DA), the final recipient on the wired side."
   ],
   [
    "What is the difference between an SSID and a BSSID?",
    "The SSID is the network name that may be shared by many APs; the BSSID is the MAC address that uniquely identifies a single BSS."
   ],
   [
    "When are four address fields used?",
    "When both To DS and From DS are set to 1, as in wireless distribution systems like mesh or bridge links."
   ]
  ]
 },
 {
  "t": "Joining a BSS: passive and active scanning, open system authentication, association and the 4-way handshake",
  "body": [
   "Before a client can send data through an AP, it goes through a fixed sequence: discover the network, authenticate at the 802.11 level, associate, and, on a secured network, complete the security exchange that creates encryption keys. Knowing this sequence frame by frame lets you pinpoint exactly where a connection fails.",
   "Discovery happens by scanning. In passive scanning, the client listens on each channel for beacons that APs send about ten times a second. In active scanning, the client sends probe requests on each channel, either for a specific SSID (a directed probe) or for any SSID (a wildcard or null probe), and APs answer with probe responses containing the same kind of information as beacons. Most clients use both, and many scan periodically in the background. On DFS channels and in 6 GHz, clients are restricted in active probing and rely more on passive methods.",
   "Next comes 802.11 authentication. Open System authentication is a two-frame exchange: the client sends an authentication request and the AP returns a success response. It performs no real identity check; it exists for backward compatibility with the state machine. The old Shared Key method used WEP and is deprecated. In WPA3-Personal, SAE (Simultaneous Authentication of Equals) uses these same authentication frames to perform a secure password-based exchange.",
   "After authentication, the client sends an association request that lists its capabilities, supported rates, security selections in the RSN element and requested SSID. The AP replies with an association response containing a status code and an association identifier (AID), a number used later in power management. The 802.11 standard describes this as moving from unauthenticated and unassociated, to authenticated and unassociated, to authenticated and associated.",
   "On an open network, data can now flow. On a WPA2 or WPA3 network, the AP's controlled port stays blocked for user traffic until the keys are established. With Enterprise security, 802.1X/EAP authentication runs next between the client, the AP (as authenticator) and a RADIUS server, resulting in a Pairwise Master Key (PMK). With Personal security, the PMK comes from the passphrase (WPA2) or SAE (WPA3).",
   "The 4-way handshake then uses EAPOL-Key frames to prove both sides hold the PMK and to derive fresh keys without sending the PMK itself. In message 1, the AP sends a random number called the ANonce. The client combines the PMK, both nonces and both MAC addresses to derive the Pairwise Transient Key (PTK). In message 2, the client sends its SNonce with a message integrity code (MIC). The AP derives the same PTK and, in message 3, confirms and delivers the Group Temporal Key (GTK) used for broadcast and multicast, encrypted. Message 4 acknowledges. Now encrypted data can flow.",
   "When troubleshooting, find the last successful step. No probe response suggests discovery or SSID issues; an association rejection points to capabilities or policy; failure after EAP suggests credentials or RADIUS; failure at message 2 or 3 of the 4-way handshake often means a wrong passphrase."
  ],
  "terms": [
   [
    "Passive scanning",
    "Discovering networks by listening for beacons on each channel."
   ],
   [
    "Active scanning",
    "Discovering networks by sending probe requests and receiving probe responses."
   ],
   [
    "Open System authentication",
    "A two-frame 802.11 authentication exchange that performs no real identity verification."
   ],
   [
    "Association identifier (AID)",
    "A number the AP assigns to a client in the association response, used in the TIM for power management."
   ],
   [
    "4-way handshake",
    "An EAPOL-Key exchange that confirms both parties hold the PMK and derives the PTK and delivers the GTK."
   ]
  ],
  "example": "A user reports that a new phone cannot join the WPA2-Personal network. The capture shows probe, authentication and association all succeed, then the AP sends message 1 of the 4-way handshake, the phone replies with message 2 and the AP never sends message 3. The MIC in message 2 failed, which points to a mistyped passphrase.",
  "tip": "Order matters: scan, 802.11 authenticate, associate, then 802.1X/EAP (if Enterprise), then the 4-way handshake. Open System authentication is not security; real authentication happens with 802.1X/EAP or SAE.",
  "check": [
   [
    "What is the difference between passive and active scanning?",
    "Passive scanning listens for beacons; active scanning sends probe requests and waits for probe responses."
   ],
   [
    "Which key is delivered to the client in message 3 of the 4-way handshake?",
    "The Group Temporal Key (GTK), used for broadcast and multicast traffic."
   ],
   [
    "Does Open System authentication verify the user's identity?",
    "No. It is a simple two-frame exchange; identity is verified later by 802.1X/EAP or by SAE or the PSK."
   ]
  ]
 },
 {
  "t": "Medium access: CSMA/CA, DCF, physical carrier sense (CCA) and virtual carrier sense (NAV)",
  "body": [
   "A Wi-Fi channel is a shared, half-duplex medium: only one radio in range can successfully transmit at a time, and a transmitting radio cannot listen for collisions while it transmits. Wired Ethernet historically used collision detection, but Wi-Fi uses CSMA/CA, Carrier Sense Multiple Access with Collision Avoidance. Its goal is to reduce collisions before they happen and to confirm delivery afterward.",
   "The basic access method in 802.11 is the Distributed Coordination Function (DCF). Every station, including the AP, follows the same rules and there is no central scheduler. Before transmitting, a station checks whether the medium is idle. If it is busy, the station waits. When the medium becomes idle, the station waits a set interframe space, then counts down a random backoff timer, and transmits only if the medium stayed idle. For unicast frames, the receiver sends an ACK; if no ACK arrives, the sender assumes failure and retries. The next lesson covers interframe spaces and backoff in detail. In QoS networks DCF is enhanced as EDCA, part of the Hybrid Coordination Function (HCF).",
   "Carrier sense uses two separate mechanisms, and the medium is considered busy if either says so. Physical carrier sense is performed by Clear Channel Assessment (CCA). CCA has two parts. Signal detect (also called preamble detect) recognizes an 802.11 preamble at a low signal level, for 20 MHz OFDM commonly around -82 dBm. Energy detect notices any RF energy, including non-Wi-Fi interference, but requires a much stronger level, commonly around -62 dBm for 20 MHz. So a radio defers to Wi-Fi frames it can barely hear, but it only defers to non-Wi-Fi noise when that noise is fairly strong.",
   "Virtual carrier sense uses the Network Allocation Vector (NAV), a timer every station keeps. Most frames carry a Duration/ID field that states how many microseconds the medium will stay busy to complete the current exchange, such as the time for the following ACK. Stations that hear the frame set their NAV to that value and count it down. While the NAV is not zero, the station treats the medium as busy even if it hears nothing. RTS/CTS frames use the Duration field to reserve the medium for an entire exchange.",
   "This design explains several common problems. Hidden nodes are clients that cannot hear each other but both reach the AP; their carrier sense fails, so they collide at the AP. Non-Wi-Fi interference below the energy detect threshold does not stop transmissions but corrupts them. And every station on a channel, including ones in neighboring BSSs within range, shares the same airtime, which is why co-channel contention matters."
  ],
  "terms": [
   [
    "CSMA/CA",
    "Carrier Sense Multiple Access with Collision Avoidance, the 802.11 method of sensing the medium and using backoff and ACKs to avoid and detect failed transmissions."
   ],
   [
    "DCF",
    "Distributed Coordination Function, the basic 802.11 contention-based access method used by all stations."
   ],
   [
    "Clear Channel Assessment (CCA)",
    "Physical carrier sense that uses signal detect and energy detect thresholds to decide whether the medium is busy."
   ],
   [
    "NAV",
    "Network Allocation Vector, a timer set from the Duration field of heard frames that provides virtual carrier sense."
   ],
   [
    "Duration/ID field",
    "A MAC header field stating how long, in microseconds, the medium will be busy for the current exchange."
   ]
  ],
  "example": "In a warehouse, two scanners on opposite ends of an aisle cannot hear each other but both reach the AP in the middle. Their CCA sees an idle medium, so they transmit at the same time and their frames collide at the AP, causing retries. This is the hidden node problem, which RTS/CTS or better AP placement can address.",
  "tip": "Physical carrier sense is CCA (signal detect and energy detect); virtual carrier sense is the NAV, set from the Duration field. Wi-Fi avoids collisions and relies on ACKs because a half-duplex radio cannot detect collisions while transmitting.",
  "check": [
   [
    "Why does 802.11 use collision avoidance rather than collision detection?",
    "Radios are half duplex and cannot listen for collisions while transmitting, so they avoid collisions with carrier sense and backoff and use ACKs to confirm delivery."
   ],
   [
    "What sets a station's NAV?",
    "The Duration/ID value in frames it hears from other stations."
   ],
   [
    "Why is a radio more sensitive to Wi-Fi frames than to non-Wi-Fi energy?",
    "Signal detect recognizes 802.11 preambles at low levels, while energy detect only triggers at a much higher energy level."
   ]
  ]
 },
 {
  "t": "Interframe spaces (SIFS, DIFS, AIFS), random backoff and contention windows",
  "body": [
   "CSMA/CA does not let a station transmit the instant the medium goes quiet. Instead, stations wait for a defined interframe space (IFS) and then a random backoff. The length of each wait sets priority: frames that wait less get the medium first. Knowing the IFS types and how backoff works explains both QoS and why busy channels slow down.",
   "The slot time is the basic unit of timing. It is 20 microseconds for DSSS and HR-DSSS, and 9 microseconds for OFDM-based PHYs (a short slot, also used by ERP when no legacy devices are present). SIFS, the short interframe space, is the shortest gap: 10 microseconds in 2.4 GHz and 16 microseconds in 5 GHz. It is used between parts of an exchange that is already underway, such as between a data frame and its ACK, between RTS and CTS, and between fragments. Because SIFS is shortest, no other station can grab the medium in the middle of an exchange.",
   "DIFS, the DCF interframe space, is used by non-QoS stations before starting a new transmission after the medium is idle. It equals SIFS plus two slot times, for example 34 microseconds with OFDM in 5 GHz. AIFS, the arbitration interframe space, replaces DIFS for QoS stations using WMM/EDCA. Each access category has its own AIFS number (AIFSN), and AIFS equals SIFS plus AIFSN times the slot time, so higher-priority traffic waits a shorter AIFS. Other IFS types exist: PIFS (SIFS plus one slot) used for special functions like channel switching and EIFS, a longer wait used after receiving a corrupted frame.",
   "```text\nSIFS < PIFS < DIFS  (and AIFS varies by access category)\nDIFS = SIFS + 2 x slot\nAIFS[AC] = SIFS + AIFSN[AC] x slot\n```",
   "After the IFS, a station that wants to transmit picks a random backoff value between 0 and the current contention window (CW), measured in slots. It counts down one slot at a time while the medium stays idle. If another station starts transmitting, the countdown pauses and resumes after the medium is idle again for the required IFS. When the counter reaches zero, the station transmits. The randomness means stations that were waiting together rarely pick the same slot.",
   "The contention window starts at CWmin. If a transmission fails because no ACK arrives, the station roughly doubles the window (for example 15, 31, 63 and so on) up to CWmax, making another collision less likely. After a successful transmission, CW resets to CWmin. This exponential backoff keeps the network stable under load, but high retry rates also increase average waiting time, which lowers throughput for everyone on the channel."
  ],
  "terms": [
   [
    "SIFS",
    "Short interframe space, the shortest wait, used between frames of an ongoing exchange such as data and ACK."
   ],
   [
    "DIFS",
    "DCF interframe space, equal to SIFS plus two slot times, used by non-QoS stations before contending."
   ],
   [
    "AIFS",
    "Arbitration interframe space, a per-access-category wait used by QoS stations, equal to SIFS plus AIFSN times the slot time."
   ],
   [
    "Contention window",
    "The range of slots from which a station picks its random backoff, starting at CWmin and growing after failures up to CWmax."
   ],
   [
    "Slot time",
    "The basic timing unit for backoff, 9 microseconds for OFDM PHYs and 20 microseconds for DSSS."
   ]
  ],
  "example": "A client sends a frame and gets no ACK because of interference. It doubles its contention window, picks a new random backoff from the larger range, waits AIFS plus that backoff and retries, setting the Retry flag. After the retry succeeds, its window returns to CWmin.",
  "tip": "SIFS is always the shortest and is used for ACKs and CTS responses, which is how an exchange keeps control of the medium. A lower AIFSN and smaller CWmin give an access category higher priority.",
  "check": [
   [
    "Which interframe space is used between a data frame and its ACK?",
    "SIFS, the short interframe space."
   ],
   [
    "What happens to the contention window after a failed transmission?",
    "It roughly doubles, up to CWmax, and resets to CWmin after a successful transmission."
   ],
   [
    "How is AIFS calculated?",
    "SIFS plus the access category's AIFSN multiplied by the slot time."
   ]
  ]
 },
 {
  "t": "QoS with WMM/EDCA access categories: voice, video, best effort and background",
  "body": [
   "Voice and video are sensitive to delay and jitter, while file downloads mostly care about total throughput. Without quality of service (QoS), all Wi-Fi traffic competes equally. The 802.11e amendment added QoS, and the Wi-Fi Alliance certifies a subset of it called WMM (Wi-Fi Multimedia). The contention method used is EDCA, Enhanced Distributed Channel Access.",
   "EDCA defines four access categories (ACs), each with its own queue in the radio. From highest to lowest priority they are voice (AC_VO), video (AC_VI), best effort (AC_BE) and background (AC_BK). Each queue contends for the medium separately, as if it were a separate station, using its own parameters. Traffic is placed into an AC based on its user priority (UP), values 0 to 7 taken from 802.1D: priorities 6 and 7 map to voice, 4 and 5 to video, 0 and 3 to best effort, and 1 and 2 to background. Note that UP 0, the default for unmarked traffic, is best effort, and background (1 and 2) is lower than 0.",
   "Priority is enforced through the EDCA parameters. A lower AIFSN means a shorter wait before contending. A smaller CWmin and CWmax mean a shorter random backoff. Voice and video use an AIFSN of 2 and small contention windows, while best effort uses 3 and background uses 7 with much larger windows. Higher-priority queues therefore statistically win the medium more often, but priority is not guaranteed; a background frame can still occasionally go first. A TXOP (transmit opportunity) limit sets how long a queue may keep the medium once it wins, letting video and voice send several frames in a burst without contending again.",
   "The AP advertises the EDCA parameter set in its beacons and probe responses, and clients use those values. Admission control can be required for voice or video, meaning a client must request and be granted bandwidth (through an ADDTS exchange) before it can use that category.",
   "Wi-Fi QoS only works end to end if markings are preserved. On the wired network, QoS is commonly carried in the DSCP (Differentiated Services Code Point) field of the IP header, for example EF (46) for voice. The AP maps DSCP to a WMM user priority for downstream traffic and maps WMM priority back to DSCP or 802.1p for upstream traffic. Mismatched mapping, or switches that remove markings, is a common reason voice quality suffers even though WMM is enabled. QoS Data frames carry the UP in their QoS Control field, so you can check markings in a capture.",
   "WMM is also a prerequisite for 802.11n and later high data rates, so it should always be enabled on modern WLANs."
  ],
  "terms": [
   [
    "WMM",
    "Wi-Fi Multimedia, the Wi-Fi Alliance certification of 802.11e QoS features based on EDCA."
   ],
   [
    "EDCA",
    "Enhanced Distributed Channel Access, the QoS contention method using per-access-category AIFS and contention windows."
   ],
   [
    "Access category",
    "One of four WMM priority queues: voice, video, best effort and background."
   ],
   [
    "User priority (UP)",
    "An 802.1D priority value from 0 to 7 that determines a frame's access category."
   ],
   [
    "TXOP",
    "Transmit opportunity, a time period during which a station may send multiple frames after winning contention."
   ]
  ],
  "example": "A clinic's Wi-Fi phones have choppy audio. A capture shows voice packets arriving at the AP marked DSCP 0 because an upstream switch rewrites markings, so the AP sends them as best effort. Fixing the switch trust settings restores DSCP EF, which maps to AC_VO, and call quality improves.",
  "tip": "Know the four categories in order (voice, video, best effort, background) and that UP 1 and 2 map to background, below UP 0 best effort. Priority comes from lower AIFSN and smaller contention windows; it is statistical, not guaranteed.",
  "check": [
   [
    "Which WMM access category do user priorities 4 and 5 map to?",
    "Video (AC_VI)."
   ],
   [
    "What two EDCA parameters give voice traffic an advantage in contention?",
    "A smaller AIFSN (shorter AIFS) and smaller contention window values (CWmin and CWmax)."
   ],
   [
    "Why might voice traffic be treated as best effort even with WMM enabled?",
    "Its DSCP or 802.1p markings may be missing or rewritten on the wired network, so the AP maps it to best effort."
   ]
  ]
 },
 {
  "t": "Protection mechanisms: RTS/CTS and CTS-to-self",
  "body": [
   "Protection mechanisms help radios that use newer PHYs share a channel with older radios that cannot understand their transmissions. They also address hidden nodes. The two mechanisms are RTS/CTS and CTS-to-self. Both work by setting the NAV of other stations so they stay quiet during a transmission.",
   "The original need came from 802.11g. ERP-OFDM frames cannot be decoded by 802.11b stations using DSSS or HR-DSSS. An 802.11b station might see an OFDM transmission only as noise below its energy detect threshold and start transmitting on top of it, causing collisions. When an ERP AP detects a non-ERP station associated or nearby, it sets the Use_Protection bit in the ERP element of its beacons. ERP stations then precede their OFDM frames with a control frame sent at a DSSS rate that every station can understand. That control frame contains a Duration value, so legacy stations set their NAV and defer. HT and later PHYs have similar protection modes for mixed environments.",
   "RTS/CTS is a four-way exchange: the sender transmits a Request to Send, the receiver answers with Clear to Send, then the data frame and ACK follow, each separated by SIFS. Both the RTS and CTS carry durations covering the rest of the exchange. Because the CTS comes from the receiver, usually the AP, stations that can hear the AP but not the sender still set their NAV. That is why RTS/CTS helps with hidden nodes. It can be configured with an RTS threshold, so that only frames larger than a certain size use it.",
   "CTS-to-self is a shorter method: the sender transmits a CTS addressed to itself, which reserves the medium, then sends its data. It has less overhead than RTS/CTS, so it is the common choice for ERP protection. But because only the sender's neighbors hear the CTS, it does not solve hidden node problems. A client hidden from the sender would never hear it.",
   "Protection has a real cost. Every protected frame needs an extra control frame, often sent at a slow legacy data rate, and throughput for the whole cell drops noticeably. That is why one old 802.11b device can reduce performance in a 2.4 GHz network, and why many designs disable 802.11b rates so legacy devices cannot associate. Remember too that protection can be triggered by legacy devices in a neighboring BSS, not only associated ones.",
   "In captures, look for bursts of CTS frames without an RTS before data frames; that pattern shows CTS-to-self in use. Frequent RTS/CTS may indicate the RTS threshold has been lowered to fight hidden nodes."
  ],
  "terms": [
   [
    "RTS/CTS",
    "A Request to Send and Clear to Send exchange that reserves the medium for both sender and receiver neighborhoods before a data frame."
   ],
   [
    "CTS-to-self",
    "A protection method in which the sender transmits a CTS addressed to itself to reserve the medium before sending data."
   ],
   [
    "Use_Protection bit",
    "A flag in the ERP element of beacons indicating that ERP stations must use protection because non-ERP stations are present."
   ],
   [
    "Hidden node",
    "A station that cannot hear another station transmitting to the same AP, leading to collisions at the AP."
   ],
   [
    "RTS threshold",
    "A configurable frame size above which a station uses RTS/CTS before transmitting."
   ]
  ],
  "example": "A retail store's 2.4 GHz throughput drops sharply whenever an old barcode printer powers on. Its 802.11b radio causes the AP to set Use_Protection, and every 802.11g and n client starts sending CTS-to-self frames at a slow DSSS rate. Replacing the printer, or moving it to wired, restores throughput.",
  "tip": "RTS/CTS helps with hidden nodes because the receiver's CTS warns stations near the AP. CTS-to-self is cheaper but does not solve hidden nodes. Both reduce throughput because they add overhead.",
  "check": [
   [
    "Why does RTS/CTS help with the hidden node problem while CTS-to-self does not?",
    "With RTS/CTS the receiver sends the CTS, so stations near the receiver set their NAV; with CTS-to-self only the sender's neighbors hear the CTS."
   ],
   [
    "What triggers ERP protection in a 2.4 GHz BSS?",
    "The presence of non-ERP (802.11b DSSS or HR-DSSS) stations, signaled by the Use_Protection bit in the ERP element."
   ],
   [
    "Why are protection frames often sent at DSSS rates?",
    "So that legacy stations that cannot decode OFDM can still read the Duration value and set their NAV."
   ]
  ]
 },
 {
  "t": "Power management: power save bit, TIM, DTIM, U-APSD and Target Wake Time",
  "body": [
   "Battery-powered Wi-Fi devices save energy by turning off their radios between transmissions. The AP holds, or buffers, traffic for sleeping clients and tells them when it has something to deliver. 802.11 and the Wi-Fi Alliance define several power management methods, and the exam expects you to know how they work.",
   "A client announces that it is going to sleep by setting the Power Management bit in the Frame Control field of a frame it sends to the AP, often a null data frame. The AP then buffers unicast frames for that client. A client in power save mode wakes up periodically to listen for beacons. How often it wakes is related to the listen interval it declared in its association request.",
   "Every beacon contains a Traffic Indication Map (TIM) element. The TIM includes a bitmap indexed by association identifier (AID). If the bit for a client's AID is set, the AP has buffered unicast frames for that client. A legacy power-save client then sends a PS-Poll control frame, and the AP delivers one buffered frame; the More Data bit in that frame tells the client whether more are waiting, and it keeps polling until none remain.",
   "Broadcast and multicast frames need a different approach because they are sent to everyone. Some beacons are DTIM beacons, Delivery Traffic Indication Message. The DTIM period, configured on the AP, sets how many beacons occur between DTIMs; a DTIM period of 1 makes every beacon a DTIM beacon, while 3 makes every third one. The AP transmits buffered broadcast and multicast traffic immediately after a DTIM beacon, and power-saving clients must be awake to receive it. A longer DTIM period saves battery but delays multicast and broadcast, which can affect applications such as push-to-talk that rely on multicast.",
   "U-APSD, Unscheduled Automatic Power Save Delivery, is part of the WMM Power Save certification and improves on PS-Poll, especially for voice. Instead of polling one frame at a time, the client sends a trigger frame, any QoS data or QoS null frame in a trigger-enabled access category. The AP responds by delivering all buffered frames for the client's delivery-enabled categories in a service period, ending with the EOSP (end of service period) bit. A phone during a call can send its voice frame and receive the waiting voice frames in one wake period, then sleep again.",
   "Target Wake Time (TWT), from 802.11ax, schedules wake times through negotiation. A client and AP agree on when the client will be awake, so the client can sleep through many beacons, even for long periods. Broadcast TWT lets an AP set schedules for groups of clients. TWT is especially valuable for IoT sensors that send small amounts of data occasionally."
  ],
  "terms": [
   [
    "Power Management bit",
    "A Frame Control bit a client sets to tell the AP it is entering power save mode."
   ],
   [
    "TIM",
    "Traffic Indication Map, a beacon element with a bitmap by AID showing which sleeping clients have buffered unicast traffic."
   ],
   [
    "DTIM",
    "Delivery Traffic Indication Message, a special TIM after which the AP sends buffered broadcast and multicast frames."
   ],
   [
    "U-APSD",
    "Unscheduled Automatic Power Save Delivery, the WMM Power Save method in which a client trigger frame prompts delivery of buffered frames."
   ],
   [
    "PS-Poll",
    "A legacy control frame a client sends to retrieve one buffered unicast frame from the AP."
   ]
  ],
  "example": "A hospital's voice badges drain their batteries by midday. The engineer finds the DTIM period set to 1 and U-APSD disabled. Enabling WMM Power Save and adjusting the DTIM period after checking the badge vendor's recommendation lets the badges sleep longer while still receiving calls and paging multicast.",
  "tip": "TIM is for buffered unicast traffic and appears in every beacon; DTIM governs buffered broadcast and multicast. A longer DTIM period saves battery but delays multicast. U-APSD replaces one-frame-at-a-time PS-Poll with a trigger and a burst.",
  "check": [
   [
    "How does a client know the AP has buffered unicast frames for it?",
    "The bit matching its AID is set in the TIM element of a beacon."
   ],
   [
    "When does an AP send buffered broadcast and multicast frames?",
    "Immediately after a DTIM beacon."
   ],
   [
    "What does a U-APSD client send to start delivery of buffered frames?",
    "A trigger frame, a QoS data or QoS null frame in a trigger-enabled access category."
   ]
  ]
 },
 {
  "t": "Aggregation and Block Ack; frame control flags such as Retry",
  "body": [
   "Every 802.11 transmission has fixed overhead: interframe spaces, backoff, the PHY preamble and header, and an ACK. At high data rates, the payload takes so little time that overhead dominates. Aggregation, introduced with 802.11n, sends several frames in one transmission to spread that overhead, and Block Ack acknowledges them efficiently.",
   "There are two kinds of aggregation. An A-MSDU (Aggregate MAC Service Data Unit) combines multiple upper-layer packets into one MPDU (MAC Protocol Data Unit) with a single MAC header and single frame check sequence (FCS). It has low overhead, but if any part is corrupted, the whole A-MSDU fails and must be resent. An A-MPDU (Aggregate MAC Protocol Data Unit) combines multiple complete MPDUs, each with its own MAC header and FCS, behind a single PHY header, separated by delimiters. Because each subframe can be checked separately, only the failed subframes need to be retransmitted. A-MPDU is generally more resilient and is heavily used by 802.11ac and 802.11ax; the two methods can also be combined, with A-MSDUs inside an A-MPDU.",
   "Block Ack, from 802.11e and extended by 802.11n, acknowledges many frames with one Block Ack frame containing a bitmap, one bit per frame, showing which ones were received. The sender then retransmits only the missing ones. A Block Ack agreement is set up per traffic identifier using ADDBA Request and ADDBA Response action frames, and torn down with DELBA. A-MPDUs require Block Ack. Aggregation is also limited by the QoS TXOP and by maximum sizes each side advertises in its capabilities.",
   "The Frame Control field, the first two bytes of every MAC header, contains several one-bit flags in addition to type and subtype. To DS and From DS define address meanings. More Fragments shows that more fragments of the same frame follow. Retry is set when a frame is a retransmission, so the receiver can discard duplicates. Power Management shows whether the sender will enter power save. More Data tells a sleeping client that the AP has more buffered frames. Protected Frame shows the payload is encrypted. The last bit, +HTC/Order, indicates an HT Control field is present in newer PHYs.",
   "The Retry flag is especially useful in troubleshooting. A capture tool can count what percentage of frames have Retry set. Some retransmissions are normal, but a sustained retry rate above roughly 10 percent usually indicates interference, hidden nodes, poor signal or excessive co-channel contention. High retries waste airtime and raise latency, harming voice and video.",
   "In Wireshark, the filter wlan.fc.retry == 1 shows retransmitted frames, and Block Ack frames can be examined to see which subframes in an A-MPDU were missing."
  ],
  "terms": [
   [
    "A-MSDU",
    "Aggregate MSDU, multiple payloads in one MPDU sharing a single MAC header and FCS."
   ],
   [
    "A-MPDU",
    "Aggregate MPDU, multiple complete MPDUs, each with its own header and FCS, sent in one PHY transmission."
   ],
   [
    "Block Ack",
    "A control frame with a bitmap that acknowledges multiple frames at once, set up with ADDBA action frames."
   ],
   [
    "Retry flag",
    "A Frame Control bit set on retransmitted frames, used to detect duplicates and to measure retry rates."
   ],
   [
    "Frame Control field",
    "The first MAC header field, containing protocol version, type, subtype and flags such as To DS, From DS, Retry and Protected Frame."
   ]
  ],
  "example": "A capture of a busy classroom shows about 25 percent of data frames with the Retry flag set, mostly from clients at the far end of the room. Block Ack bitmaps show the last subframes of long A-MPDUs often fail. Adding an AP to improve signal and reducing channel width lowers the retry rate and improves throughput.",
  "tip": "A-MSDU uses one header and one FCS, so any error loses the whole frame; A-MPDU gives each subframe its own header and FCS so only failed subframes are resent. The Retry bit marks retransmissions, and a high retry percentage is a key health indicator.",
  "check": [
   [
    "Why is A-MPDU more resilient to errors than A-MSDU?",
    "Each MPDU in an A-MPDU has its own FCS, so the receiver can identify and request only the corrupted subframes, whereas an A-MSDU has one FCS for the whole aggregate."
   ],
   [
    "Which frames establish a Block Ack agreement?",
    "ADDBA Request and ADDBA Response action frames."
   ],
   [
    "What does the Retry bit in the Frame Control field indicate?",
    "That the frame is a retransmission of a previously sent frame."
   ]
  ]
 },
 {
  "t": "Client-driven roaming, reassociation and 802.11k/v assistance",
  "body": [
   "Roaming is when a client moves its association from one AP to another within the same ESS. In Wi-Fi, roaming is client driven: the client alone decides when and where to roam. The network can suggest or encourage, but it cannot directly make a client roam without disconnecting it. This fact explains most roaming problems you will see.",
   "Each client vendor uses its own roaming algorithm, usually based on thresholds such as signal strength, SNR, retry rate or data rate. When the current AP's signal falls below a threshold, the client starts scanning for alternatives, often in the background by briefly leaving its channel. It then chooses a target AP, typically one with a noticeably stronger signal, and roams. Because thresholds differ, two devices standing in the same spot may behave very differently.",
   "The roam itself uses a reassociation request sent to the new AP, which includes the BSSID of the current AP. The new AP responds with a reassociation response. In controller-based or cloud-managed systems, the infrastructure updates its tables so traffic for the client now flows through the new AP, and the old AP may hand off buffered frames. The client then must re-establish security keys: with WPA2 or WPA3-Personal, a new 4-way handshake; with Enterprise, a full 802.1X/EAP exchange unless a fast roaming method such as PMK caching, opportunistic key caching (OKC) or 802.11r is used.",
   "A common problem is the sticky client, one that holds on to a distant AP even when a much better one is nearby. It stays connected at low data rates and consumes lots of airtime. Causes include high AP transmit power making the old AP seem good enough, aggressive client thresholds or cell overlap that does not suit the client. Designs aim for enough overlap between cells that a client can find a new AP before its current signal becomes unusable.",
   "802.11k and 802.11v help without taking away the client's control. With 802.11k, a client asks for a neighbor report and receives a list of nearby APs and their channels, so it can scan a few channels instead of all of them. This shortens scanning and makes better choices likely. With 802.11v BSS Transition Management, the AP can send a BTM request suggesting preferred APs, for example when the client's signal is weak or the AP is overloaded. The request can include a disassociation imminent flag, warning that the AP will disconnect the client soon. The client may accept or reject.",
   "When you troubleshoot roaming, capture on the channels involved, note the signal level where the client roams, and check whether it uses neighbor reports, BTM and fast transition. Survey data showing coverage overlap at the client's actual roaming threshold is often the key."
  ],
  "terms": [
   [
    "Roaming",
    "A client moving its association from one AP to another in the same ESS."
   ],
   [
    "Reassociation",
    "The management frame exchange a client uses to associate with a new AP during a roam, including the previous AP's BSSID."
   ],
   [
    "Sticky client",
    "A client that stays associated with a distant AP despite a better AP being available."
   ],
   [
    "BSS Transition Management (BTM)",
    "An 802.11v mechanism that lets an AP suggest better APs to a client, which may accept or decline."
   ],
   [
    "Neighbor report",
    "An 802.11k response listing nearby APs and their channels to speed client scanning."
   ]
  ],
  "example": "Nurses' tablets keep a weak connection to an AP at the nurses' station as they walk into patient rooms. Lowering AP transmit power to balance cells, enabling 802.11k neighbor reports and 802.11v BTM, and confirming the tablet's roaming threshold aligns with the coverage design makes the tablets roam promptly.",
  "tip": "The client always decides when to roam. 802.11k helps it find candidates (neighbor reports), 802.11v lets the network suggest a move (BTM), and 802.11r speeds up the security exchange during the roam.",
  "check": [
   [
    "Who decides when a Wi-Fi client roams?",
    "The client, using its own vendor-specific algorithm and thresholds."
   ],
   [
    "What frame does a client send to its new AP when roaming?",
    "A reassociation request, which includes the BSSID of its current AP."
   ],
   [
    "How does an 802.11k neighbor report make roaming faster?",
    "It gives the client a list of nearby APs and channels, so it only scans those channels instead of the whole band."
   ]
  ]
 },
 {
  "t": "AP types and devices: autonomous, controller-managed, cloud-managed, mesh and bridges; PoE standards",
  "body": [
   "An access point (AP) is the device that bridges wireless clients onto the wired network. On the CWNA exam you need to know the main ways APs are built and managed, because the choice affects cost, scale, roaming and troubleshooting. The radios may be identical across these models; what changes is where the intelligence and configuration live.",
   "An autonomous AP (sometimes called a fat or standalone AP) holds its own full configuration and makes all its own decisions. You log into each one separately to set SSIDs, security and channels. This is fine for a home or a small office with two or three APs, but at scale it becomes painful: every change must be repeated per AP, and there is no central view of RF or roaming. A controller-managed AP (a lightweight or thin AP) takes its configuration from a WLAN controller, a central appliance or virtual machine that pushes settings, runs radio resource management and often handles roaming and authentication. The AP and controller usually talk over a tunnel, such as CAPWAP (Control and Provisioning of Wireless Access Points), which is an IETF standard, or a vendor protocol.",
   "A cloud-managed AP is configured from a management service hosted on the internet. The AP phones home over an encrypted connection to receive its configuration, report statistics and receive firmware. Client traffic normally does not go to the cloud; it is forwarded locally onto the switch. If the internet link fails, the APs typically keep serving clients with their last configuration, but you lose the ability to make changes and see live data until it returns.",
   "A mesh AP has no wired uplink of its own and instead relays traffic wirelessly through other APs to reach a root (or portal) AP that is wired. Mesh is useful where running cable is impossible, such as outdoor areas or historic buildings, but every wireless hop consumes airtime, so throughput drops and latency rises with each hop. Many designs dedicate one radio or band to the backhaul so client service is less affected. A bridge links two wired networks over a wireless link. Point-to-point bridges join two buildings; point-to-multipoint bridges connect a central site to several remote sites. Bridges usually use directional antennas and need RF line of sight and a clear Fresnel zone, which you studied earlier.",
   "Almost every enterprise AP is powered by Power over Ethernet (PoE), which delivers DC power over the same twisted-pair cable that carries data. The device that supplies power is the power sourcing equipment (PSE), such as a PoE switch (an endpoint or endspan PSE) or an injector placed between a normal switch and the AP (a midspan PSE). The device receiving power is the powered device (PD). The IEEE standards are 802.3af (PoE, Type 1, up to 15.4 W at the PSE port), 802.3at (PoE+, Type 2, up to 30 W at the PSE) and 802.3bt (Type 3 up to 60 W and Type 4 up to 90 W at the PSE). The PD receives somewhat less than the PSE supplies because of cable loss.",
   "Before a PSE applies full power it performs detection, checking for a signature resistance that proves a PoE device is attached, and then classification, where the PD tells the PSE which power class it needs. This protects ordinary Ethernet devices from receiving unexpected power. Newer PDs can also negotiate power more precisely using LLDP (Link Layer Discovery Protocol)."
  ],
  "terms": [
   [
    "Autonomous AP",
    "An AP that stores its own configuration and makes its own decisions without a controller or cloud manager."
   ],
   [
    "Controller-managed AP",
    "A lightweight AP that receives configuration and coordination from a central WLAN controller, often over a CAPWAP or vendor tunnel."
   ],
   [
    "Mesh AP",
    "An AP that uses a wireless backhaul through other APs to reach a wired root AP."
   ],
   [
    "PSE",
    "Power sourcing equipment: the switch port (endspan) or injector (midspan) that supplies PoE power."
   ],
   [
    "PD",
    "Powered device: the equipment, such as an AP, that is powered by PoE."
   ]
  ],
  "example": "A school has a main building with a PoE+ switch closet and a detached gym 150 metres away with no fiber. The main building uses controller-managed APs, while a pair of point-to-point bridges with directional antennas links the gym's switch back to the main network, and the gym APs are powered from a local PoE switch.",
  "tip": "Watch for questions that mix up where configuration lives and where data flows. Cloud-managed APs are configured from the cloud, but client traffic is normally forwarded locally, not through the cloud.",
  "check": [
   [
    "What is the main drawback of deploying 80 autonomous APs?",
    "Each AP must be configured and monitored individually, so changes are slow and error-prone, and there is no central coordination of channels, power or roaming."
   ],
   [
    "What is the difference between an endspan and a midspan PSE?",
    "An endspan PSE is the switch itself supplying power on its ports; a midspan is an injector or power panel inserted between a non-PoE switch and the powered device."
   ],
   [
    "Why does throughput fall as you add hops in a mesh network?",
    "Each hop retransmits the same data over the air, consuming additional airtime, so available capacity is shared across hops and latency grows."
   ]
  ]
 },
 {
  "t": "Management, control and data planes and where each lives in autonomous, controller-based, cloud-managed and distributed designs",
  "body": [
   "Network engineers describe what a device does in three logical planes. Separating them helps you understand WLAN architectures, because the architectures differ mainly in which plane is centralized and which stays on the AP.",
   "The management plane is how the network is configured and monitored: pushing SSIDs and security settings, upgrading firmware, collecting statistics and logs, and running reports. The control plane is the intelligence that coordinates devices while the network runs: radio resource management (automatic channel and power), roaming and key caching, load balancing, and tracking which client is where. The data plane (or user plane) is the actual forwarding of client frames: taking an 802.11 frame from a client, converting it to Ethernet and sending it onto the right VLAN, and the reverse.",
   "In an autonomous design, all three planes live on each AP. Every AP is configured on its own (management), makes its own channel and power decisions without knowledge of neighbors (control), and bridges traffic onto its switch port (data). Some autonomous APs can be managed by a separate management system, which centralizes the management plane but leaves control and data on the AP.",
   "In a controller-based design, the management plane is centralized on the controller or a management system above it, and so is most of the control plane: the controller decides channels and power for all APs and handles roaming. The data plane can be either centralized, with client traffic tunneled back to the controller, or distributed, with the AP forwarding locally. Real-time 802.11 functions that need microsecond timing, such as sending ACKs, beacons and retransmissions, always stay on the AP. This is sometimes called a split-MAC architecture.",
   "In a cloud-managed design, the management plane lives in the cloud service. Control-plane functions are shared: the cloud may compute channel plans or policies, while the APs cooperate locally for things that must happen quickly, such as fast roaming key exchange. The data plane stays local, so traffic goes from the AP to the switch, not across the internet.",
   "A distributed design (sometimes called controllerless or cooperative) keeps control-plane intelligence on the APs themselves, which talk to each other to coordinate channels, roaming and client handling, while management may be centralized in an on-premises or cloud system. One AP may be elected to act as a virtual controller for the group.",
   "On the exam, read each scenario and ask three questions: where are settings entered, what makes the real-time coordination decisions, and where does user traffic enter the wired network? The answers identify the architecture and its failure behavior. For example, if the management plane goes offline, most designs keep passing traffic; if a centralized data plane goes offline, tunneled clients lose connectivity."
  ],
  "terms": [
   [
    "Management plane",
    "Functions used to configure, monitor, upgrade and report on network devices."
   ],
   [
    "Control plane",
    "Functions that coordinate the network during operation, such as RF management, roaming and client tracking."
   ],
   [
    "Data plane",
    "The forwarding of user traffic between the wireless and wired networks."
   ],
   [
    "Split MAC",
    "An architecture where time-critical 802.11 MAC functions stay on the AP and other MAC functions move to a controller."
   ]
  ],
  "example": "A retail chain uses cloud-managed APs. When a store's internet link fails, shoppers on the guest network lose internet but staff can still reach the local point-of-sale server, because the data plane is local. The IT team cannot push new settings to that store until the link returns, because the management plane is in the cloud.",
  "tip": "Exam questions often ask which plane is affected by an outage. Losing a cloud manager affects management; losing a controller that tunnels traffic affects the data plane too.",
  "check": [
   [
    "Which plane handles automatic channel and power assignment?",
    "The control plane, because it coordinates APs during operation rather than configuring them or forwarding user traffic."
   ],
   [
    "In a controller-based design, which 802.11 functions remain on the AP?",
    "Time-critical functions such as ACKs, beacons, retransmissions and encryption timing, because they need very low latency."
   ],
   [
    "In a typical cloud-managed WLAN, where does client data enter the wired network?",
    "At the AP's local switch port; the data plane is distributed and does not go through the cloud."
   ]
  ]
 },
 {
  "t": "Centralized (tunneled) vs local (distributed) data forwarding",
  "body": [
   "Once an AP receives a frame from a wireless client, it has to put that traffic onto the wired network somewhere. There are two basic models, and many controller-based systems let you choose per SSID.",
   "In centralized or tunneled forwarding, the AP encapsulates client traffic in a tunnel, such as CAPWAP data or a vendor protocol like GRE-based tunnels, and sends it to the WLAN controller. The controller removes the encapsulation and places the traffic onto the correct VLAN at the data center or core. The AP's own switch port usually needs only a single access VLAN for its management address, because all client VLANs live at the controller. Advantages include a single place to apply firewall rules and policy, simple roaming because clients keep the same VLAN and IP address no matter which AP they join, and easy isolation of guest traffic by tunneling it to a controller in a demilitarized zone (DMZ).",
   "The drawbacks follow from sending everything through one point. The controller must handle the throughput of all tunneled clients, which becomes a bottleneck as Wi-Fi speeds rise. Traffic between two clients in the same branch may hairpin across the WAN to the controller and back, adding latency. Tunnel headers add overhead and can cause MTU and fragmentation issues if not planned. And if the controller or the path to it fails, tunneled clients lose connectivity.",
   "In local or distributed forwarding, the AP converts 802.11 frames to Ethernet and bridges them directly onto its switch port, tagging them with the appropriate VLAN. The AP port is usually an 802.1Q trunk carrying the management VLAN plus each client VLAN. This scales naturally because each AP handles its own traffic, it avoids hairpinning, and it keeps working if the management system or controller is unreachable, at least for SSIDs that do not depend on central authentication.",
   "The drawbacks of local forwarding are that VLANs must be extended to every access switch where APs live, policy must be enforced at the edge or on switches and firewalls, and roaming across Layer 3 boundaries needs extra mechanisms to keep a client's IP address working, since moving to an AP on a different subnet would otherwise force a new address.",
   "Hybrid designs are common: an organization might tunnel guest traffic to an isolated controller while forwarding corporate traffic locally. Cloud-managed systems generally forward locally, and some offer an optional tunnel to a concentrator for specific SSIDs such as guest or remote workers."
  ],
  "terms": [
   [
    "Tunneled forwarding",
    "Client traffic is encapsulated from the AP to a controller, which then places it on the wired network."
   ],
   [
    "Local forwarding",
    "The AP bridges client traffic directly onto its own switch port, usually with VLAN tags."
   ],
   [
    "Hairpinning",
    "Traffic that travels to a central point and back even though its source and destination are close together."
   ],
   [
    "CAPWAP",
    "Control and Provisioning of Wireless Access Points, an IETF protocol for AP-to-controller control and data tunnels."
   ]
  ],
  "example": "A company with 40 small branch offices originally tunneled all traffic to a controller at headquarters. Branch staff complained that printing to a local printer was slow because each print job crossed the WAN twice. Switching the corporate SSID to local forwarding fixed printing, while guest traffic continued to be tunneled to headquarters for filtering.",
  "tip": "If a question mentions a single choke point, WAN hairpinning or controller throughput limits, the answer usually favors local forwarding; if it stresses central policy, guest isolation or simple roaming, tunneled forwarding fits.",
  "check": [
   [
    "Why might an AP switch port be an access port in a tunneled design but a trunk in a local-forwarding design?",
    "With tunneling, client VLANs exist only at the controller, so the AP needs just its management VLAN; with local forwarding, the AP must place clients on multiple VLANs, which requires an 802.1Q trunk."
   ],
   [
    "What happens to tunneled clients if the controller fails and there is no backup?",
    "They lose connectivity, because their data plane path runs through the controller."
   ]
  ]
 },
 {
  "t": "Gathering requirements: client types and capabilities, applications, density, coverage areas and constraints",
  "body": [
   "A wireless design is only as good as the requirements behind it. Before you place a single AP on a floor plan, you need to know who will use the network, with what devices, for what purpose, where, and under which limits. The CWNA exam expects you to recognize the questions a designer asks and why each matters.",
   "Start with client types and capabilities. A laptop with a modern three-stream radio behaves very differently from a barcode scanner, a VoIP handset, a medical device or a low-power sensor. Record which bands each client supports (2.4, 5 or 6 GHz), which PHYs (802.11n, ac, ax), how many spatial streams, which security methods (WPA2, WPA3, 802.1X EAP types) and which roaming features (802.11k, r, v). The least capable important client often drives the design. If critical handhelds only support 2.4 GHz, you cannot design a 5 GHz-only network, and if a device lacks WPA3 support, your security plan needs a transition approach.",
   "Next, list the applications and their needs. Email and web browsing tolerate delay; voice and video calls need low latency, low jitter and low loss; large file transfers and backups need throughput; real-time location services need several APs to hear each client. For each application, estimate per-user throughput and sensitivity to delay. This leads directly to design targets such as minimum signal strength, signal-to-noise ratio (SNR) and channel utilization limits.",
   "Density is about how many devices will share airtime in an area at the same time. Ask how many people occupy each space at peak and how many devices each carries; a conference hall with 500 attendees, each with a phone and laptop, is a capacity problem long before it is a coverage problem. Coverage areas are where service is required and where it is not: offices, warehouses, stairwells, elevators, parking lots, outdoor courtyards. Also note areas where coverage should be limited, such as outside the building.",
   "Constraints include budget, the building itself and organizational rules. Building constraints cover wall materials, high ceilings, historic or aesthetic restrictions on mounting, and cable run lengths (Ethernet is limited to 100 metres per run). Organizational constraints cover existing switch and PoE capacity, approved vendors, security and compliance policies, and deadlines. Regulatory limits on channels and power in your country are constraints too.",
   "Gather this information through interviews with stakeholders, questionnaires, reviewing existing network documentation and visiting the site. Write it down and get it agreed, because later validation surveys are measured against these documented requirements."
  ],
  "terms": [
   [
    "Client capability",
    "The bands, PHYs, spatial streams, security and roaming features a client device supports."
   ],
   [
    "Density",
    "The number of active devices competing for airtime in a given area at the same time."
   ],
   [
    "Constraint",
    "A limit on the design, such as budget, building materials, mounting restrictions, cabling, policy or regulation."
   ]
  ],
  "example": "A hospital asks for better Wi-Fi. Interviews reveal that nurses use VoIP badges that support only 2.4 GHz and 5 GHz with WPA2-Enterprise, infusion pumps need reliable coverage in every room, and patients stream video. The designer records these, sets voice-grade signal targets for clinical areas and plans guest capacity separately.",
  "tip": "When a question asks what to do first in a design project, the answer is usually to gather and document requirements, not to run a survey or pick hardware.",
  "check": [
   [
    "Why does the least capable critical client often determine design choices?",
    "The network must support every device the business depends on, so its band, security and roaming limits set the minimum features the design must provide."
   ],
   [
    "Name two building constraints that affect AP placement.",
    "Examples include wall materials that absorb RF, ceiling height, aesthetic or historic restrictions on mounting, and cable run length limits."
   ]
  ]
 },
 {
  "t": "Coverage vs capacity design, cell sizing and airtime",
  "body": [
   "Early Wi-Fi designs aimed simply for coverage: place as few APs as possible so every area has a usable signal. Modern designs usually aim for capacity: enough airtime for all the devices and applications in each area. Understanding the difference is central to CWNA's design domain.",
   "A coverage-oriented design uses relatively high transmit power and large cells. It suits low-density spaces such as warehouses with a few scanners or a small office. The risk is that one AP serves many clients, and because Wi-Fi is a shared, half-duplex medium, those clients take turns. Distant clients also connect at low data rates, which makes each of their frames occupy the channel for longer.",
   "A capacity-oriented design uses more APs, each at lower power, creating smaller cells. Each AP serves fewer clients, clients connect at higher data rates because they are closer, and more channels can be reused across the building. The trade-off is more hardware, more cabling and more careful channel planning to avoid APs on the same channel hearing each other.",
   "Airtime is the key idea. Only one transmitter on a channel in a given area can transmit successfully at a time, so the channel's time is the resource being shared. A frame sent at 6 Mbps takes many times longer than the same frame at 300 Mbps, so a few slow clients can consume most of the airtime. Overhead also matters: beacons, probe traffic, ACKs, interframe spaces, contention backoff and retransmissions all use airtime without carrying user data. This is why real throughput is typically around half or less of the advertised data rate.",
   "Cell sizing is controlled mainly through AP transmit power, antenna choice and minimum data rates. Lowering power shrinks the area where clients will associate. Raising the minimum basic rate (for example disabling the lowest rates) makes distant clients less able to associate and encourages them to roam. Directional antennas shape cells to fit a space. Cell edges should be designed with overlap so clients can roam, but not so much that many APs on the same channel hear each other.",
   "To estimate capacity, multiply the number of expected devices by the throughput each application needs, then compare that to the realistic throughput per AP radio and channel. Divide to find how many radios a space needs, then check that you have enough non-overlapping channels to support them without heavy co-channel contention."
  ],
  "terms": [
   [
    "Coverage design",
    "A design that primarily ensures a usable signal everywhere, typically with fewer APs at higher power."
   ],
   [
    "Capacity design",
    "A design that ensures enough airtime and throughput for the expected devices and applications, typically with more APs at lower power."
   ],
   [
    "Airtime",
    "The time a channel is occupied by transmissions; the shared resource that all devices on a channel compete for."
   ],
   [
    "Cell",
    "The area around an AP in which clients can associate and communicate with it."
   ]
  ],
  "example": "A lecture hall has good signal everywhere from a single AP in the hallway, yet students cannot load pages during class. The problem is capacity, not coverage: 200 devices share one channel. Adding several APs inside the hall at lower power on different channels spreads the load and fixes performance.",
  "tip": "Strong signal does not mean enough capacity. If a scenario shows good RSSI but poor performance with many users, think airtime and capacity rather than coverage.",
  "check": [
   [
    "Why do slow clients hurt everyone on the same channel?",
    "Their frames take longer to transmit, consuming more airtime, and all clients on the channel share that airtime."
   ],
   [
    "Name two ways to reduce cell size.",
    "Lower the AP's transmit power, raise the minimum basic data rate, or use a directional antenna to shape coverage."
   ]
  ]
 },
 {
  "t": "Channel reuse plans, co-channel contention and channel width choices",
  "body": [
   "Every AP needs a channel, and there are only a limited number of non-overlapping channels. A channel reuse plan assigns channels so that APs on the same channel are as far apart as possible, and APs next to each other use different channels.",
   "In 2.4 GHz, the only three non-overlapping 20 MHz channels in most regions are 1, 6 and 11. Neighboring APs rotate among these three. Using channels in between, such as 3 or 9, causes adjacent channel interference, because those channels partially overlap their neighbors and the energy looks like noise that cannot be decoded. In 5 GHz there are many more 20 MHz channels, including the Dynamic Frequency Selection (DFS) channels, and 6 GHz adds many more again, so reuse is much easier there.",
   "Co-channel contention (CCC), sometimes called co-channel interference, happens when two or more APs and their clients on the same channel can hear each other. Because 802.11 uses CSMA/CA (carrier sense multiple access with collision avoidance), any device that detects a transmission on its channel defers. So those APs share one channel's airtime as if they were one big cell. It is not interference in the sense of corrupted frames; it is contention that reduces the capacity available to each AP. You reduce it by reducing power, spacing same-channel APs, using more channels, and using building materials that naturally separate areas.",
   "Channel width is the other big decision. 802.11n introduced 40 MHz channels, 802.11ac added 80 and 160 MHz, and later standards extend wider. A wider channel carries more data per transmission, but it uses up more of the available spectrum, so you have fewer separate channels to reuse. In a dense building, using 80 MHz channels might leave only a handful of non-overlapping options in 5 GHz, forcing many APs to share channels and increasing CCC. A wider channel also has a higher noise floor, because it captures noise across more spectrum, which lowers SNR slightly.",
   "General guidance that you will see in CWNA material: use 20 MHz channels in 2.4 GHz, always; in 5 GHz, use 20 or 40 MHz in high-density environments and consider 80 MHz only where AP density is low and enough channels exist; 6 GHz offers enough spectrum that wider channels become more practical. The right answer always depends on AP count, client capabilities and interference.",
   "Most enterprise systems include automatic channel and power assignment, but you should still understand the plan well enough to review it, lock channels where needed and exclude channels affected by radar events or local interference."
  ],
  "terms": [
   [
    "Channel reuse plan",
    "An assignment of channels to APs that keeps same-channel APs as far apart as possible."
   ],
   [
    "Co-channel contention (CCC)",
    "Airtime sharing that happens when devices on the same channel hear each other and defer under CSMA/CA."
   ],
   [
    "Adjacent channel interference (ACI)",
    "Interference from transmitters on overlapping neighboring channels, which raises noise and corrupts frames."
   ],
   [
    "Channel width",
    "The amount of spectrum a channel occupies, such as 20, 40, 80 or 160 MHz."
   ]
  ],
  "example": "An office configured every 5 GHz AP for 80 MHz channels to get high speed tests. With 30 APs and only a few 80 MHz channels available, many APs shared channels and users saw worse performance. Reducing to 40 MHz doubled the number of channels, cut contention and improved real-world throughput.",
  "tip": "Co-channel contention is about devices deferring to each other (lost capacity), while adjacent channel interference is about overlapping energy that corrupts frames (retries). The exam tests this distinction.",
  "check": [
   [
    "Why are channels 1, 6 and 11 used in 2.4 GHz?",
    "They are the only three 20 MHz channels that do not overlap each other in most regulatory domains."
   ],
   [
    "What is the trade-off of wider channels in a dense deployment?",
    "Each transmission is faster, but fewer non-overlapping channels are available, which increases co-channel contention and slightly raises the noise floor."
   ]
  ]
 },
 {
  "t": "Design targets for voice and real-time apps: signal, SNR, secondary coverage",
  "body": [
   "Voice over Wi-Fi and other real-time applications such as video calls, push-to-talk and some medical telemetry are the most demanding clients on a WLAN. They send small packets continuously and cannot tolerate much delay, jitter or loss. A web page that loads half a second late is fine; a voice call that loses half a second of audio is not. That is why voice-grade designs have stricter targets than data-only designs.",
   "The most commonly quoted signal target for voice is a received signal strength of about -67 dBm or better throughout the coverage area, measured as the client would see it. Data-only networks often design around -70 to -72 dBm. The difference is small in numbers but significant in area, because it means cells must overlap more and clients must stay connected at higher data rates. Always check the specific handset vendor's guidance, since device receive sensitivity varies.",
   "Signal-to-noise ratio (SNR) is the difference between the received signal and the noise floor. For voice, a common target is 25 dB or higher. SNR matters more than raw signal because a strong signal in a noisy environment may still decode poorly. If the noise floor is -92 dBm and the signal is -67 dBm, the SNR is 25 dB.",
   "Secondary coverage means that at every point in the area, a client can hear not just its current AP but at least one other AP at a usable level, often around -67 to -70 dBm for voice. This does two things. It gives the client a good roaming candidate before its current signal drops too far, so roams are quick and calls do not break. It also provides redundancy if one AP fails. Secondary coverage must be on different channels, or co-channel contention rises.",
   "Other voice design factors include keeping channel utilization moderate so voice frames can get airtime quickly, enabling Wi-Fi Multimedia (WMM) so voice traffic uses the highest-priority access category, supporting fast roaming such as 802.11r, and limiting the number of calls per AP according to the vendor's recommendations. Retry rates should be low, because every retransmission adds delay.",
   "When you validate a voice design, survey with a device that has similar radio characteristics to the actual handsets, and test calls while walking the routes users take, including stairwells and elevators."
  ],
  "terms": [
   [
    "-67 dBm",
    "A commonly used minimum received signal target for voice-grade Wi-Fi coverage."
   ],
   [
    "SNR",
    "Signal-to-noise ratio, the difference in dB between received signal strength and the noise floor."
   ],
   [
    "Secondary coverage",
    "Coverage from a second AP on a different channel at a usable level everywhere, supporting roaming and redundancy."
   ],
   [
    "Jitter",
    "Variation in packet delay, which disrupts real-time audio and video."
   ]
  ],
  "example": "A warehouse designed for scanners at -72 dBm starts using Wi-Fi phones, and workers complain of dropped calls at aisle ends. A survey shows many spots where only one AP is heard above -70 dBm. Adding APs to achieve -67 dBm primary and a second AP above -70 dBm everywhere removes the drops.",
  "tip": "If a question asks why calls drop while roaming even though signal is acceptable, look for a lack of secondary coverage or missing fast-roaming support rather than raising AP power.",
  "check": [
   [
    "What SNR is commonly targeted for voice?",
    "About 25 dB or higher, so frames can be decoded reliably at good data rates."
   ],
   [
    "Why must secondary coverage come from an AP on a different channel?",
    "An AP on the same channel adds co-channel contention instead of providing a separate roaming option with its own airtime."
   ]
  ]
 },
 {
  "t": "High-density design: more APs at lower power, directional antennas, 5 and 6 GHz",
  "body": [
   "High-density environments include lecture halls, stadiums, conference centers, airports and open-plan offices, where hundreds or thousands of devices share a limited space. In these places the limiting factor is airtime, not signal. The design goal is to create many small, separate cells so that the load is spread across as many independent channels as possible.",
   "The first technique is more APs at lower transmit power. Lower power shrinks each cell so that fewer clients associate with each AP and same-channel APs are less likely to hear each other. More APs mean more total airtime available in the space, provided the channel plan can keep them apart. Simply adding APs at high power backfires, because they all hear each other and co-channel contention cancels the benefit.",
   "The second technique is directional antennas. An omnidirectional antenna radiates in all horizontal directions, so its cell spills across the whole room. A patch or panel antenna mounted above or in front of a seating section focuses energy onto that section and reduces energy toward other sections. In arenas, designers mount APs under seats or on railings pointing down into sections, using the bodies of the audience as additional attenuation between cells. This allows more channel reuse in the same open space.",
   "The third technique is steering clients to 5 GHz and 6 GHz. 2.4 GHz has only three non-overlapping channels, so it runs out of capacity quickly. 5 GHz has many more channels, and 6 GHz adds a large amount of clean spectrum used only by newer Wi-Fi 6E and later devices. In high-density design you typically disable 2.4 GHz radios on some APs, or use them for other purposes, to avoid excessive 2.4 GHz contention, while keeping enough 2.4 GHz coverage for legacy devices that need it. Narrow channels (20 or 40 MHz) are usually chosen in 5 GHz to maximize the number of available channels.",
   "Supporting settings help: raising minimum basic data rates reduces the airtime used by beacons and discourages distant clients; limiting the number of SSIDs reduces beacon overhead; and 802.11ax features such as OFDMA and BSS coloring can improve efficiency when clients support them. Ensure the wired side keeps up too, with enough uplink bandwidth, DHCP scope size and internet capacity.",
   "Finally, plan for the fact that people absorb RF. An empty auditorium measured during a survey will behave very differently when full, so designers account for body loss and validate during a real event when possible."
  ],
  "terms": [
   [
    "High-density WLAN",
    "A network where a large number of devices compete for airtime in a small area, making capacity the main design concern."
   ],
   [
    "Directional antenna",
    "An antenna that focuses energy in a particular direction, such as a patch or panel, used to shape and separate cells."
   ],
   [
    "Body loss",
    "Attenuation of RF signals caused by human bodies, which are mostly water."
   ]
  ],
  "example": "A conference center ballroom originally had four ceiling APs at full power and suffered during keynotes. The redesign used sixteen APs with patch antennas aimed downward at seating zones, set to low power on 20 MHz 5 GHz channels, with 2.4 GHz disabled on most radios. Peak performance improved because each zone had its own airtime.",
  "tip": "In high-density scenarios, the correct answer is rarely to increase power. Look for lower power, more APs, directional antennas, narrower channels and more use of 5 and 6 GHz.",
  "check": [
   [
    "Why does adding APs at high power often fail to improve high-density performance?",
    "The APs hear each other on shared channels and contend for the same airtime, so the added capacity is lost to co-channel contention."
   ],
   [
    "Why are 5 and 6 GHz preferred in high-density design?",
    "They offer many more non-overlapping channels, allowing more independent cells than the three available in 2.4 GHz."
   ]
  ]
 },
 {
  "t": "SSID and VLAN design, 802.1Q trunks to APs, SSID overhead",
  "body": [
   "A service set identifier (SSID) is the network name clients see. A virtual LAN (VLAN) is a logical Layer 2 network on the wired side. In most WLANs, each SSID maps to a VLAN so that wireless users land in the right IP subnet with the right policy. For example, a Corp SSID maps to the staff VLAN, a Guest SSID maps to an isolated guest VLAN, and an IoT SSID maps to a VLAN for devices.",
   "With local forwarding, the AP must place frames onto multiple VLANs, so its switch port is configured as an IEEE 802.1Q trunk. The trunk carries tagged frames, where a 4-byte tag holds the VLAN ID, plus usually one untagged native VLAN, often used for AP management. The switch and AP must agree on which VLANs are allowed and which is native; a mismatch is a classic reason clients on one SSID cannot get an IP address. With tunneled forwarding, the AP port often only needs an access port for management, because client VLANs are handled at the controller.",
   "You do not always need one SSID per user group. With 802.1X authentication, a RADIUS server can return attributes that assign each user to a VLAN dynamically, so staff, contractors and students can share a single SSID but land in different VLANs. Role-based policies on many systems do something similar. This keeps the SSID count low.",
   "Keeping the SSID count low matters because of SSID overhead. Each SSID on each radio sends its own beacon frames, roughly ten times per second by default, and answers probe requests. Beacons are sent at the lowest configured basic rate, which is slow, so they consume noticeable airtime. With many SSIDs across several APs that can hear each other on the same channel, beacons alone can take a large share of the channel's airtime before any user data is sent. A common guideline is to keep to a small number of SSIDs, often three or four at most per radio.",
   "Ways to reduce SSID overhead include consolidating SSIDs using dynamic VLAN assignment, raising the minimum basic rate so beacons are sent faster, and not broadcasting SSIDs on bands or APs where they are not needed. Hiding an SSID does not remove the overhead, because the AP still sends beacons and must respond to probes.",
   "Security design also depends on VLANs: guest VLANs should reach only the internet, IoT VLANs should reach only the systems they need, and firewall rules or access control lists should enforce this separation."
  ],
  "terms": [
   [
    "SSID",
    "Service set identifier, the logical name of a wireless network."
   ],
   [
    "802.1Q trunk",
    "A switch link that carries multiple VLANs by adding a VLAN tag to Ethernet frames."
   ],
   [
    "Native VLAN",
    "The VLAN whose frames are sent untagged on an 802.1Q trunk."
   ],
   [
    "Dynamic VLAN assignment",
    "Placing a user into a VLAN based on attributes returned by RADIUS after 802.1X authentication."
   ]
  ],
  "example": "A university had eight SSIDs for different departments and saw high channel utilization even at night. Moving to one 802.1X SSID with RADIUS-assigned VLANs, plus a guest SSID and an IoT SSID, cut beacon traffic dramatically and freed airtime without changing the department separation.",
  "tip": "When a question describes high utilization with few users, suspect beacon overhead from too many SSIDs and low basic rates.",
  "check": [
   [
    "Why might clients on only one SSID fail to get DHCP addresses while others work?",
    "The VLAN for that SSID may not be allowed on the AP's 802.1Q trunk or may be tagged differently on the switch and AP."
   ],
   [
    "How can you give different user groups different VLANs without adding SSIDs?",
    "Use 802.1X with RADIUS returning a VLAN assignment for each user or group."
   ]
  ]
 },
 {
  "t": "Data rate settings, band steering and load balancing",
  "body": [
   "An AP advertises which data rates it supports and which are basic (required) rates. A client must support all basic rates to associate. Management frames such as beacons, and broadcast and multicast frames, are usually sent at the lowest basic rate so every associated client can decode them. Rates that are supported but not basic can be used for data if the client and AP agree.",
   "Tuning data rates is one of the most effective design tools. By default many APs enable the old 802.11b rates of 1, 2, 5.5 and 11 Mbps in 2.4 GHz. Leaving them on keeps the whole cell in a slow protection-friendly mode, makes beacons take a long time on air, and lets distant clients hang on at very low rates. Disabling those rates and setting a higher minimum basic rate, such as 12 or 24 Mbps, reduces beacon airtime, shrinks the effective cell and pushes clients to roam to closer APs. The trade-off is that clients at the edge of coverage, or legacy 802.11b devices, may no longer connect, so verify requirements first.",
   "Band steering tries to move dual-band clients from 2.4 GHz to 5 GHz (or 6 GHz), where there are more channels and usually less interference. The AP learns which clients are dual-band from their probe requests on both bands, then delays or ignores probe responses on 2.4 GHz for those clients, hoping they will join the higher band. Some systems use 802.11v BSS transition management requests to suggest a better band. Band steering is a nudge, not a command: the client always makes the final decision, and aggressive steering can delay connections for some devices.",
   "Load balancing spreads clients across APs so that one AP is not overloaded while a neighbor sits idle. Techniques include refusing or delaying association to a busy AP when another suitable AP is available, and sending 802.11v suggestions. Like band steering, load balancing depends on the client's willingness to cooperate, and it can hurt real-time traffic if it delays roams, so many designers disable it for voice SSIDs.",
   "In a lab, you can see these settings in AP or controller configuration pages listing each rate as disabled, supported or basic (sometimes called mandatory). A packet capture of a beacon shows the Supported Rates and Extended Supported Rates elements, where basic rates are marked.",
   "Remember that the best tool for client distribution is good design: appropriate power, sensible cell sizes and enough APs. Steering and balancing features help at the margins but cannot fix a poor layout."
  ],
  "terms": [
   [
    "Basic rate",
    "A data rate a client must support to associate; management and broadcast frames are often sent at the lowest basic rate."
   ],
   [
    "Supported rate",
    "A rate the AP can use for data but does not require clients to support."
   ],
   [
    "Band steering",
    "A technique that encourages dual-band clients to associate on 5 or 6 GHz instead of 2.4 GHz."
   ],
   [
    "Load balancing",
    "Techniques that spread clients across APs to avoid overloading any single AP."
   ]
  ],
  "example": "In an office with dense APs, laptops stayed connected to a distant AP at 6 Mbps instead of roaming. After disabling rates below 12 Mbps and setting 12 Mbps as the lowest basic rate, those clients roamed earlier to nearby APs and channel utilization fell.",
  "tip": "Remember the rule: a client must support every basic rate to join the BSS, and management frames go out at the lowest basic rate. Raising that rate cuts overhead and cell size.",
  "check": [
   [
    "What is the effect of disabling 802.11b rates in 2.4 GHz?",
    "Beacons and management frames go out faster, protection overhead is reduced, cells shrink and legacy 802.11b-only devices can no longer associate."
   ],
   [
    "Why is band steering not guaranteed to work?",
    "The client makes the final association decision; the AP can only delay or withhold responses or make suggestions."
   ]
  ]
 },
 {
  "t": "PoE planning: 802.3af, 802.3at and 802.3bt power budgets",
  "body": [
   "Power over Ethernet (PoE) is how nearly every enterprise AP gets its power. Planning it is part of the design, because an AP that receives too little power may not boot, or may boot in a reduced mode with radios or spatial streams disabled, which quietly undermines your RF design.",
   "Know the standards and their headline numbers. IEEE 802.3af (PoE, Type 1) provides up to 15.4 W at the power sourcing equipment (PSE) port, with about 12.95 W available at the powered device (PD) after cable loss. IEEE 802.3at (PoE+, Type 2) provides up to 30 W at the PSE and about 25.5 W at the PD. IEEE 802.3bt adds Type 3, up to 60 W at the PSE (about 51 W at the PD), and Type 4, up to 90 W at the PSE (about 71 W at the PD). 802.3af and 802.3at deliver power over two pairs, while 802.3bt can use all four pairs. PDs also advertise a class number that tells the PSE how much power they need.",
   "Per-port power is only half the story. The switch also has a total PoE budget, the maximum power its power supplies can deliver across all ports at once. A 48-port switch might support full PoE+ on only some of its ports simultaneously. To plan, list every PD on the switch (APs, cameras, phones), note each one's required power from the vendor data sheet, add them up and compare to the switch budget, leaving headroom for growth and for redundancy if a power supply fails.",
   "Check the AP data sheet carefully. Many modern APs, especially those with multiple radios, more spatial streams, USB ports or extra features, need more than 802.3af can provide. Data sheets often list full functionality at one power level and a reduced mode at a lower level, such as disabling a radio or reducing spatial streams. The CWNA exam may present a scenario where an AP works but performs poorly, and the root cause is insufficient PoE.",
   "Use Link Layer Discovery Protocol (LLDP) or a vendor protocol to let the AP negotiate its exact power needs with the switch, which lets the switch allocate power more accurately than class-based allocation. Also account for cable length and quality; the standards assume up to 100 metres of proper cable, and poor cabling adds loss.",
   "Where switches lack PoE or enough budget, midspan injectors can supply power per port. They are useful for a few APs but add equipment to manage, so for larger deployments a PoE switch upgrade is usually cleaner."
  ],
  "terms": [
   [
    "802.3af",
    "The original PoE standard, up to 15.4 W at the PSE port (Type 1)."
   ],
   [
    "802.3at",
    "PoE+, up to 30 W at the PSE port (Type 2)."
   ],
   [
    "802.3bt",
    "Four-pair PoE with Type 3 (up to 60 W) and Type 4 (up to 90 W) at the PSE port."
   ],
   [
    "PoE budget",
    "The total PoE power a switch can supply across all its ports at the same time."
   ]
  ],
  "example": "After an upgrade to new Wi-Fi 6E APs, users report slow speeds even though every AP shows as online. The switch logs show each AP negotiated only 802.3af power, and the AP data sheets say that at that level one radio is disabled. Moving to PoE+ ports with enough switch budget restores full operation.",
  "tip": "Distinguish per-port limits from the total switch budget. A switch may support 802.3at on every port but not have enough total power to run all ports at full PoE+ at once.",
  "check": [
   [
    "How much power does 802.3at provide at the PSE port?",
    "Up to 30 W at the PSE, with about 25.5 W available at the powered device."
   ],
   [
    "What might happen if an AP needing PoE+ is connected to an 802.3af port?",
    "It may fail to boot or run in a reduced-power mode with some radios or features disabled, depending on the vendor."
   ]
  ]
 },
 {
  "t": "Legacy weaknesses: WEP, TKIP, shared key authentication, SSID hiding and MAC filtering",
  "body": [
   "The CWNA exam expects you to know why older Wi-Fi security mechanisms are no longer acceptable, so that you can recognize them in the field and recommend replacements. Several of them were never real security in the first place.",
   "Wired Equivalent Privacy (WEP) was the original 802.11 encryption. It used the RC4 stream cipher with a static shared key of 40 or 104 bits, combined with a 24-bit initialization vector (IV) sent in clear text. The IV space is so small that IVs repeat quickly on a busy network, and weaknesses in how RC4 keys were built from the IV let attackers recover the key after collecting enough traffic. WEP also used a weak integrity check that did not stop frame tampering. WEP can be broken in minutes with freely available tools and must not be used.",
   "Temporal Key Integrity Protocol (TKIP) was an interim fix designed to run on WEP-era hardware through a firmware upgrade. It kept RC4 but added per-packet key mixing, a longer IV with a sequence counter to block replay, and a message integrity check called Michael. TKIP was a big improvement over WEP but has known weaknesses and is now deprecated. It is also limited to legacy data rates: 802.11n and later high-throughput rates are not allowed with TKIP, so enabling TKIP on a modern network slows it down. Use CCMP (AES) instead.",
   "Shared key authentication was the original alternative to open system authentication. The AP sent a clear-text challenge and the client returned it encrypted with the WEP key. An eavesdropper who captures both frames learns a plaintext and matching ciphertext, which helps them attack the key. Counter-intuitively, it was less secure than open system authentication followed by WEP encryption.",
   "SSID hiding (disabling SSID broadcast) removes the network name from beacons. It does not hide the network: the AP still sends beacons, and the SSID appears in clear text whenever a client probes for it or associates. It also makes clients probe for the hidden name wherever they go, which can expose it elsewhere. MAC filtering allows only listed client MAC addresses to associate, but MAC addresses are sent unencrypted in every frame and are easily changed in software, so an attacker can copy an allowed address. Both are at best minor obstacles and add management work.",
   "The correct modern replacements are WPA2 or WPA3 with AES-based encryption, using 802.1X for enterprises and strong passphrases or SAE for personal networks. When a legacy device cannot support these, isolate it on its own SSID and VLAN with strict firewall rules and plan to replace it."
  ],
  "terms": [
   [
    "WEP",
    "Wired Equivalent Privacy, the original 802.11 encryption using RC4 and a 24-bit IV; completely broken."
   ],
   [
    "TKIP",
    "Temporal Key Integrity Protocol, an interim RC4-based fix with per-packet keys and the Michael MIC; now deprecated."
   ],
   [
    "Shared key authentication",
    "A legacy WEP challenge-response method that exposes plaintext and ciphertext to eavesdroppers."
   ],
   [
    "MAC filtering",
    "Allowing only listed client MAC addresses to associate; easily bypassed by spoofing."
   ]
  ],
  "example": "An auditor finds a warehouse SSID using WPA with TKIP, hidden SSID and MAC filtering, justified as three layers of security. The auditor explains that the hidden name and allowed MACs are visible in captured frames and TKIP is deprecated, and recommends moving scanners to WPA2 or WPA3 with AES, isolating any that cannot be upgraded.",
  "tip": "If a question asks which option provides real security, eliminate SSID hiding and MAC filtering first. They are obscurity measures, not encryption or authentication.",
  "check": [
   [
    "Why was shared key authentication weaker than open system authentication with WEP?",
    "It sent a challenge in clear text and then the encrypted response, giving eavesdroppers a plaintext and ciphertext pair to attack the WEP key."
   ],
   [
    "What happens to data rates when TKIP is the only cipher on an 802.11n or later network?",
    "High-throughput rates are not allowed with TKIP, so clients are limited to legacy rates."
   ]
  ]
 },
 {
  "t": "WPA2 and WPA3 Personal and Enterprise; CCMP/AES and GCMP",
  "body": [
   "Wi-Fi Protected Access (WPA) certifications are Wi-Fi Alliance programs that test devices for interoperable security based on the IEEE 802.11 security amendment, originally 802.11i and now part of 802.11 itself. The network security model is called a Robust Security Network (RSN). There are two families that matter today, WPA2 and WPA3, and each comes in Personal and Enterprise modes.",
   "Personal mode uses a shared secret. In WPA2-Personal, every user enters the same passphrase, which is converted into a 256-bit pre-shared key (PSK) that acts as the pairwise master key (PMK). Anyone who knows the passphrase and captures a client's 4-way handshake can attempt to guess the passphrase offline, so weak passphrases are a real risk. WPA3-Personal replaces PSK with Simultaneous Authentication of Equals (SAE), which resists offline guessing and gives each session a unique PMK. WPA3 also requires Protected Management Frames (PMF).",
   "Enterprise mode uses 802.1X with an authentication server, usually RADIUS, and an Extensible Authentication Protocol (EAP) method. Each user or device authenticates with individual credentials or certificates, and each session gets its own keys. WPA2-Enterprise and WPA3-Enterprise work in much the same way, with WPA3-Enterprise requiring PMF. WPA3-Enterprise also offers an optional 192-bit mode aimed at high-security environments, which mandates specific stronger cryptographic suites, including GCMP-256 for data encryption.",
   "The data encryption protocols are also tested. CCMP (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol) uses the Advanced Encryption Standard (AES) with a 128-bit key. It provides confidentiality through counter mode and integrity through CBC-MAC, and it is the mandatory cipher for WPA2 and the baseline for WPA3. GCMP (Galois/Counter Mode Protocol) also uses AES, combining counter mode encryption with Galois-field authentication. It is efficient in hardware and was introduced for very high-throughput PHYs; GCMP-256 is used in WPA3-Enterprise 192-bit mode.",
   "In configuration screens you will typically choose a security type such as WPA2-Personal, WPA3-Personal, WPA2/WPA3 transition, WPA2-Enterprise or WPA3-Enterprise, and then a cipher. Choose AES (CCMP) and avoid any option that includes TKIP. For 6 GHz, WPA3 or Enhanced Open is required; WPA2 is not allowed.",
   "In a packet capture, the RSN information element in beacons and probe responses shows the advertised pairwise and group ciphers and the authentication and key management (AKM) suite, such as PSK, SAE or 802.1X."
  ],
  "terms": [
   [
    "WPA2",
    "Wi-Fi Alliance security certification based on 802.11i RSN, using CCMP/AES with PSK or 802.1X."
   ],
   [
    "WPA3",
    "The newer Wi-Fi Alliance security certification that adds SAE for Personal, requires PMF and offers a 192-bit Enterprise mode."
   ],
   [
    "CCMP",
    "AES-based encryption and integrity protocol used by WPA2 and WPA3."
   ],
   [
    "GCMP",
    "AES Galois/Counter Mode Protocol, an efficient authenticated encryption method; GCMP-256 is used in WPA3-Enterprise 192-bit mode."
   ],
   [
    "AKM",
    "Authentication and key management suite advertised in the RSN element, such as PSK, SAE or 802.1X."
   ]
  ],
  "example": "A small law office uses WPA2-Personal with a short passphrase that former staff still know. The consultant moves staff to WPA2 or WPA3-Enterprise with individual accounts so leavers can be disabled, and moves the lobby tablet to a separate WPA3-Personal SSID with a long passphrase.",
  "tip": "Personal vs Enterprise is about how users authenticate (shared secret vs 802.1X), while CCMP vs GCMP is about how data is encrypted. Do not mix up the layers in exam answers.",
  "check": [
   [
    "What makes WPA2-Personal vulnerable to offline dictionary attacks?",
    "The PMK is derived only from the passphrase and SSID, so an attacker who captures the 4-way handshake can test passphrase guesses offline."
   ],
   [
    "What does WPA3 require that WPA2 did not?",
    "Protected Management Frames, plus SAE in Personal mode instead of PSK."
   ]
  ]
 },
 {
  "t": "SAE and its resistance to offline dictionary attacks; transition mode",
  "body": [
   "Simultaneous Authentication of Equals (SAE) is the password-based authentication used by WPA3-Personal. It is based on a password-authenticated key exchange known as Dragonfly. Its purpose is to let two devices that share a password prove they both know it and derive a strong, unique key, without giving an eavesdropper anything they can use to guess the password offline.",
   "To understand why this matters, recall how WPA2-Personal works. The passphrase and SSID are fed into a key derivation function to produce the PMK. That PMK is used in the 4-way handshake, which includes nonces and a message integrity code (MIC). An attacker who captures a handshake can take a list of candidate passwords, compute the PMK and MIC for each one on their own computer, and check for a match. This is an offline dictionary attack: it needs no further contact with the network, so it can run as fast as the attacker's hardware allows.",
   "SAE changes this. Before association, the client and AP exchange SAE Commit and Confirm messages as part of 802.11 authentication. Each side uses the password to derive a secret element and combines it with fresh random values in a Diffie-Hellman style exchange. The resulting PMK depends on these random values, not just the password. A captured exchange does not let an attacker test guesses offline; each guess requires a fresh live exchange with the AP, which the AP can rate-limit. SAE also provides forward secrecy: if the password is later discovered, previously captured traffic cannot be decrypted, because each session's key came from secrets that were never sent.",
   "After SAE produces the PMK, the normal 4-way handshake runs to create session keys, just as in WPA2. WPA3-Personal also requires Protected Management Frames. SAE still depends on a good password, because an attacker can make online guesses; it just cannot make offline ones.",
   "Transition mode lets an SSID support both WPA3-Personal (SAE) and WPA2-Personal (PSK) with the same passphrase, so older clients keep working while newer ones use SAE. PMF is set to capable (optional) rather than required so that WPA2 clients can connect. The drawback is that the WPA2 side is still exposed to offline attacks against the shared passphrase, and a downgrade concern exists where a client might be tricked into using WPA2. Clients that remember a network as WPA3 can refuse to downgrade. Transition mode is a migration tool, not a final state.",
   "Note that 6 GHz does not permit transition mode with WPA2; networks there must use WPA3 or Enhanced Open."
  ],
  "terms": [
   [
    "SAE",
    "Simultaneous Authentication of Equals, WPA3-Personal's password-based key exchange that resists offline guessing."
   ],
   [
    "Offline dictionary attack",
    "Testing password guesses against captured data without further interaction with the network."
   ],
   [
    "Forward secrecy",
    "A property where compromise of a long-term secret does not expose past session keys."
   ],
   [
    "Transition mode",
    "A configuration allowing both WPA3-SAE and WPA2-PSK clients on one SSID with PMF optional."
   ]
  ],
  "example": "A hotel rolls out WPA3 but still has older smart TVs that support only WPA2. It enables WPA3 transition mode on the guest SSID so both types connect, while planning to replace the TVs and then switch the SSID to WPA3-only with PMF required.",
  "tip": "SAE stops offline guessing, not online guessing. A weak password is still a risk if an attacker can try guesses against the live AP.",
  "check": [
   [
    "Why can't an attacker who captures an SAE exchange run an offline dictionary attack?",
    "The derived key depends on random values exchanged during SAE, so a captured exchange cannot be used to verify guesses; each guess requires a live exchange."
   ],
   [
    "What PMF setting does WPA3 transition mode use and why?",
    "PMF capable (optional), so WPA2 clients that may not support PMF can still connect."
   ]
  ]
 },
 {
  "t": "Enhanced Open (OWE) for open networks",
  "body": [
   "Traditional open Wi-Fi networks, like those in cafes, airports and hotels, use no encryption at all. Anyone nearby with a capture tool can read unencrypted traffic between clients and the AP. Captive portals and passphrases printed on a wall do not really fix this: a portal only controls access, and a shared passphrase known to everyone provides little protection against someone else in the room.",
   "Enhanced Open is a Wi-Fi Alliance certification based on Opportunistic Wireless Encryption (OWE), defined by the IETF in RFC 8110. It gives open networks individual encryption without requiring the user to enter anything. The user experience stays the same: pick the network and connect.",
   "Here is how it works. During association, the client and AP perform an unauthenticated Diffie-Hellman key exchange, with public keys carried in the association request and response. From this exchange, both sides derive a unique pairwise master key (PMK). Then the standard 4-way handshake runs to create session keys, and data frames are encrypted with AES-based encryption. Because each client has its own key, other people on the same network cannot passively decrypt its traffic. Enhanced Open also uses Protected Management Frames.",
   "The key word is unauthenticated. OWE does not prove to the client that the AP is legitimate, because there is no shared secret or certificate. An attacker could still set up an evil twin AP with the same SSID and perform OWE with victims. So OWE protects against passive eavesdropping, not against active impersonation. For authentication of the network, you need WPA3-Enterprise with proper certificate validation, or other means.",
   "Enhanced Open has a transition mode because older clients do not support OWE. The AP advertises two BSSs: a normal open SSID that legacy clients join, and a hidden OWE SSID linked to it by a transition element in the beacon. OWE-capable clients see the link and connect to the encrypted BSS automatically, while legacy clients use the open one without encryption.",
   "In 6 GHz, open networks without encryption are not allowed, so any public network there must use Enhanced Open or WPA3. When designing guest access, Enhanced Open combined with a captive portal for terms of use gives encryption plus access control."
  ],
  "terms": [
   [
    "Enhanced Open",
    "Wi-Fi Alliance certification that adds encryption to open networks using OWE."
   ],
   [
    "OWE",
    "Opportunistic Wireless Encryption, an unauthenticated Diffie-Hellman key exchange during association, defined in RFC 8110."
   ],
   [
    "OWE transition mode",
    "Pairing an open BSS with a hidden OWE BSS so both legacy and OWE-capable clients can connect."
   ]
  ],
  "example": "A coffee shop moves its guest Wi-Fi to Enhanced Open. Customers still connect without a password, but a person at the next table running a capture tool now sees only encrypted data frames from other customers' laptops instead of readable traffic.",
  "tip": "Enhanced Open provides encryption but not authentication. If a question asks whether OWE stops evil twin attacks, the answer is no.",
  "check": [
   [
    "What does OWE protect against, and what does it not protect against?",
    "It protects against passive eavesdropping by giving each client unique encryption keys, but it does not authenticate the AP, so it does not stop evil twin impersonation."
   ],
   [
    "How do legacy clients connect in OWE transition mode?",
    "They join the ordinary open SSID, while OWE-capable clients follow the transition element to the hidden encrypted BSS."
   ]
  ]
 },
 {
  "t": "802.1X roles: supplicant, authenticator and authentication server (RADIUS)",
  "body": [
   "IEEE 802.1X is a port-based network access control standard. Originally designed for wired switch ports, it is the foundation of enterprise Wi-Fi security. The idea is simple: a device is not allowed to send normal traffic through a port until it has proved who it is. On Wi-Fi, the port is the logical connection between a client and an AP after association.",
   "There are three roles. The supplicant is the client device, or more precisely the software on it that requests access and supplies credentials such as a username and password or a certificate. The authenticator is the device that controls the port; in a WLAN this is the AP in autonomous and many distributed designs, or the WLAN controller in controller-based designs. The authentication server checks the credentials and makes the access decision; in practice this is almost always a RADIUS (Remote Authentication Dial-In User Service) server, which may in turn consult a directory such as LDAP or Active Directory.",
   "The authenticator does not verify credentials itself. It relays authentication messages between the supplicant and the server. Between the supplicant and the authenticator, the Extensible Authentication Protocol (EAP) is carried directly in frames using EAP over LAN (EAPOL). Between the authenticator and the RADIUS server, EAP messages are carried inside RADIUS packets over UDP. The authenticator and RADIUS server share a secret that protects this exchange, and every AP or controller must be configured as a RADIUS client on the server.",
   "Until authentication succeeds, the port is in an unauthorized state: the authenticator blocks everything from the client except EAPOL frames. When the RADIUS server returns Access-Accept, the port becomes authorized. The server also delivers keying material (the master session key) to the authenticator, from which the PMK is derived; the supplicant derives the same PMK on its own. The 4-way handshake then creates the encryption keys. If the server returns Access-Reject, the client stays blocked.",
   "RADIUS can return additional attributes with Access-Accept, such as a VLAN assignment or a role name, letting the WLAN apply per-user policy. RADIUS accounting messages can also record session start, stop and usage.",
   "When troubleshooting, think in terms of the three roles. A wrong username is a supplicant or directory problem; an AP not listed as a RADIUS client, or a mismatched shared secret, is an authenticator-to-server problem; an unreachable server or expired server certificate affects everyone. RADIUS server logs are usually the fastest place to find the reason for a rejection."
  ],
  "terms": [
   [
    "Supplicant",
    "The client software that requests network access and provides credentials in 802.1X."
   ],
   [
    "Authenticator",
    "The device controlling the port, such as an AP or WLAN controller, which relays EAP between supplicant and server."
   ],
   [
    "Authentication server",
    "The server, usually RADIUS, that validates credentials and returns accept or reject."
   ],
   [
    "EAPOL",
    "EAP over LAN, the encapsulation used to carry EAP between the supplicant and the authenticator."
   ]
  ],
  "example": "After adding a new branch controller, no users can log in to the corporate SSID, but the same accounts work at headquarters. The RADIUS log shows requests from an unknown client IP. The new controller was never added as a RADIUS client with the shared secret; adding it fixes the problem.",
  "tip": "The AP or controller is the authenticator, not the authentication server. It passes EAP through; the RADIUS server makes the decision.",
  "check": [
   [
    "Which protocol carries EAP between the authenticator and authentication server?",
    "RADIUS, typically over UDP, protected by a shared secret configured on both devices."
   ],
   [
    "What traffic is allowed from a client before 802.1X authentication completes?",
    "Only EAPOL frames; all other traffic is blocked at the unauthorized port."
   ]
  ]
 },
 {
  "t": "EAP methods: EAP-TLS, PEAP, EAP-TTLS and their certificate needs",
  "body": [
   "The Extensible Authentication Protocol (EAP) is a framework, not a single method. Within 802.1X, the supplicant and RADIUS server agree on an EAP method that defines how credentials are actually checked. For CWNA, you need to know the most common methods, how they protect credentials and which side needs a certificate.",
   "EAP-TLS (Transport Layer Security) uses certificates on both sides. The server presents its certificate to the client, and the client presents its own certificate to the server, so authentication is mutual and no passwords are used. It is widely considered the strongest common method because there is no password to phish or guess. The cost is that you need a public key infrastructure (PKI) to issue, install, renew and revoke a certificate on every client device, which is why managed device platforms are often used to deploy them.",
   "PEAP (Protected EAP) builds a TLS tunnel using only a server certificate. Once the tunnel is up, the client authenticates inside it, most commonly with MSCHAPv2 using a username and password. This is sometimes written PEAP-MSCHAPv2 or EAP-PEAPv0. The tunnel protects the password exchange from eavesdroppers. No client certificate is required, making PEAP easy to deploy with existing directory accounts.",
   "EAP-TTLS (Tunneled TLS) is similar to PEAP: a server certificate creates a TLS tunnel, and the client then authenticates inside it. TTLS supports a wider range of inner methods, including older non-EAP methods such as PAP, which lets it work with many kinds of back-end user databases. Again, only the server requires a certificate.",
   "The critical security point for tunneled methods is server certificate validation on the client. If a client does not verify that the server certificate was issued by a trusted certificate authority and matches the expected server name, an attacker running a fake AP and fake RADIUS server can present their own certificate, and the client will send its inner credentials to them. Correctly configured clients, often through managed profiles, validate the certificate and refuse unknown servers. EAP-TLS is also only as safe as its server validation, but it exposes no password.",
   "Other methods you may meet include EAP-FAST, which can use protected access credentials instead of certificates, and older methods such as LEAP and EAP-MD5, which are weak and should not be used. Remember that the outer identity in tunneled methods may be sent in clear before the tunnel forms, so many deployments use an anonymous outer identity."
  ],
  "terms": [
   [
    "EAP-TLS",
    "Certificate-based mutual authentication requiring certificates on both the server and every client."
   ],
   [
    "PEAP",
    "An EAP method that builds a TLS tunnel with a server certificate, then authenticates the user inside it, commonly with MSCHAPv2."
   ],
   [
    "EAP-TTLS",
    "A tunneled method like PEAP that supports a wider range of inner authentication methods, including PAP."
   ],
   [
    "PKI",
    "Public key infrastructure, the system of certificate authorities and processes used to issue and manage certificates."
   ]
  ],
  "example": "A company uses PEAP-MSCHAPv2 but never configured laptops to validate the RADIUS server certificate. A security test shows a rogue AP with a fake server collecting login attempts. The fix is to push a managed profile that trusts only the company's certificate authority and server name, and the company plans a move to EAP-TLS.",
  "tip": "Memorize certificate requirements: EAP-TLS needs server and client certificates; PEAP and EAP-TTLS need only a server certificate.",
  "check": [
   [
    "Which common EAP method requires client certificates?",
    "EAP-TLS, because it performs mutual certificate-based authentication."
   ],
   [
    "Why is server certificate validation important for PEAP?",
    "Without it, clients may complete the tunnel with a fake server and send their inner credentials to an attacker."
   ]
  ]
 },
 {
  "t": "The 4-way handshake: PMK, PTK and GTK",
  "body": [
   "The 4-way handshake is the exchange that turns a pairwise master key (PMK) into the actual encryption keys used for data, and proves that both the client and the AP hold the same PMK. It runs after association in Personal mode, and after 802.1X authentication in Enterprise mode. Every WPA2 and WPA3 connection uses it.",
   "First, where does the PMK come from? In WPA2-Personal, it is derived from the passphrase and SSID. In WPA3-Personal, SAE produces it. In Enterprise mode, it is derived from keying material produced by the EAP method and delivered to the authenticator by the RADIUS server. The PMK itself is never used to encrypt frames and is never sent over the air.",
   "The pairwise transient key (PTK) is derived from the PMK plus two random numbers, the authenticator nonce (ANonce) and supplicant nonce (SNonce), and the MAC addresses of both devices. Because nonces are fresh each time, each session gets a new PTK. The PTK is split into parts: the key confirmation key (KCK), used to compute message integrity codes (MICs) on handshake messages; the key encryption key (KEK), used to encrypt the group key during delivery; and the temporal key (TK), used to encrypt unicast data frames.",
   "The four messages go like this. Message 1: the AP sends the ANonce to the client. The client now has everything to compute the PTK. Message 2: the client sends its SNonce, plus a MIC computed with its KCK, and its security capabilities. The AP computes the PTK and checks the MIC; a valid MIC proves the client has the same PMK. Message 3: the AP sends a MIC-protected message telling the client to install keys, and includes the group temporal key (GTK) encrypted with the KEK. Message 4: the client confirms, and both sides install the keys. Data can now flow encrypted.",
   "The group temporal key (GTK) is shared by all clients of the AP and is used for broadcast and multicast traffic, which the AP sends to everyone at once. It is derived from a group master key (GMK) on the AP. When the GTK changes, for example on a timer or when a client leaves, the AP uses a shorter group key handshake to deliver the new GTK to each client.",
   "In a protocol analyzer, these frames appear as EAPOL-Key messages. If a client repeatedly fails at message 2 with a MIC failure in Personal mode, the passphrase is usually wrong. If messages 1 and 2 repeat without message 3, check for RF retries or mismatched settings."
  ],
  "terms": [
   [
    "PMK",
    "Pairwise master key, the top-level key from PSK, SAE or 802.1X from which session keys are derived."
   ],
   [
    "PTK",
    "Pairwise transient key, derived from the PMK, both nonces and both MAC addresses; contains the KCK, KEK and TK."
   ],
   [
    "GTK",
    "Group temporal key, shared by all clients of an AP to protect broadcast and multicast frames."
   ],
   [
    "Nonce",
    "A random number used once, here ANonce from the AP and SNonce from the client."
   ]
  ],
  "example": "A helpdesk ticket says a phone cannot join the office WPA2-Personal network. A capture shows messages 1 and 2 of the 4-way handshake repeating, followed by a deauthentication. The AP log reports a MIC failure on message 2, which confirms the phone has the wrong passphrase.",
  "tip": "Remember the order: ANonce in message 1, SNonce and MIC in message 2, GTK delivered in message 3, confirmation in message 4. Also remember the PMK is never transmitted.",
  "check": [
   [
    "What inputs are used to derive the PTK?",
    "The PMK, the ANonce, the SNonce, and the MAC addresses of the AP and the client."
   ],
   [
    "In which message is the GTK delivered, and how is it protected?",
    "Message 3, encrypted with the KEK portion of the PTK."
   ]
  ]
 },
 {
  "t": "Protected Management Frames (802.11w)",
  "body": [
   "802.11 management frames handle joining, leaving and controlling the network: beacons, probes, authentication, association, disassociation and deauthentication, plus action frames used for features such as channel switching and radio measurements. In the original standard these frames were never protected. Anyone could forge a deauthentication frame appearing to come from the AP, and the client would obey and disconnect. This made denial-of-service attacks trivial and enabled attackers to force clients to reconnect, for example to capture a handshake or to lure them to an evil twin.",
   "The 802.11w amendment, now part of 802.11 and certified by the Wi-Fi Alliance as Protected Management Frames (PMF), adds cryptographic protection to certain management frames. It protects robust management frames: deauthentication, disassociation and robust action frames. It does not protect beacons, probe requests and responses, or authentication and association frames, because these are exchanged before keys exist.",
   "For unicast robust management frames, PMF uses the pairwise keys from the 4-way handshake to encrypt and integrity-protect them, so a forged deauthentication to a specific client is detected and ignored. For broadcast and multicast management frames, it uses the Broadcast/Multicast Integrity Protocol (BIP) with an integrity group temporal key (IGTK) delivered during the handshake. BIP adds a message integrity check so clients can verify the frame came from the real AP, though the frame is not encrypted.",
   "PMF also adds the security association (SA) query procedure. If an AP receives an association request from a client it believes is already connected with PMF, it does not simply tear down the existing session, which an attacker could exploit. Instead it sends an SA Query to the client over the protected session. If the real client answers, the AP knows the new request is suspicious and rejects it with a temporary refusal and a comeback time. This prevents an attacker from knocking a client off by spoofing an association.",
   "PMF can be set to disabled, capable (optional) or required. WPA3 requires PMF, and 6 GHz operation requires it as well. WPA2 networks can run with PMF capable to protect clients that support it while still allowing older ones. Some legacy clients have trouble connecting to SSIDs that advertise PMF, so test before enabling it widely.",
   "PMF is not a complete defense against every denial-of-service attack. RF jamming, or flooding unprotected frames such as authentication requests, can still disrupt service, which is why wireless intrusion prevention and spectrum analysis remain useful."
  ],
  "terms": [
   [
    "PMF",
    "Protected Management Frames, the Wi-Fi Alliance certification of 802.11w that protects robust management frames."
   ],
   [
    "Robust management frame",
    "A management frame protected under 802.11w, such as deauthentication, disassociation and certain action frames."
   ],
   [
    "BIP",
    "Broadcast/Multicast Integrity Protocol, which provides integrity checks for group-addressed management frames using the IGTK."
   ],
   [
    "SA Query",
    "An 802.11w procedure an AP uses to confirm a protected client is still present before accepting a new association."
   ]
  ],
  "example": "A WIPS system alerts on a flood of deauthentication frames in the lobby. Clients on the WPA3 SSID stay connected, because PMF lets them reject the forged frames, but older clients on a WPA2 SSID without PMF keep dropping. The team enables PMF capable on the WPA2 SSID and plans to move those clients to WPA3.",
  "tip": "Know which frames PMF protects (deauth, disassoc, robust action) and which it does not (beacons, probes, authentication, association). Know that WPA3 and 6 GHz require it.",
  "check": [
   [
    "Why can't PMF protect association request frames?",
    "They are sent before the 4-way handshake has created the keys needed to protect them."
   ],
   [
    "What problem does the SA Query procedure solve?",
    "It stops an attacker from disconnecting a protected client by spoofing an association request, because the AP first verifies the existing client over the protected session."
   ]
  ]
 },
 {
  "t": "Rogue APs, evil twins and WIPS; guest access, captive portals and client isolation",
  "body": [
   "A rogue AP is any unauthorized AP connected to your wired network. Often it is not malicious: an employee plugs in a consumer router to get better coverage. The danger is that it bypasses your security, perhaps with no encryption or weak settings, creating a backdoor into the internal network. The key detail is the wired connection. An AP you can hear but that is not connected to your network is usually a neighbor AP, not a rogue.",
   "An evil twin is an AP set up by an attacker that imitates a legitimate network, using the same SSID and possibly similar settings. Clients that connect to it can have their traffic observed or be presented with fake login pages to capture credentials. Evil twins target clients rather than the wired network. Defenses include using 802.1X with properly configured server certificate validation, WPA3, Protected Management Frames (which stop forged deauthentication used to push clients to the fake AP) and user education about unexpected login prompts.",
   "A wireless intrusion prevention system (WIPS) monitors the RF environment, using dedicated sensors or AP radios that spend time scanning. It classifies detected APs and clients as authorized, neighbor or rogue, often by correlating wireless MAC addresses with addresses seen on the wired network, and it detects attacks such as deauthentication floods and impersonation of your SSIDs. Many systems can locate rogues on a floor plan. Some can contain rogues by sending deauthentication frames to their clients, but containment can disrupt neighboring networks and may violate regulations or law if used against APs you do not own, so it must only be used carefully and on your own networks as policy allows. Often the best response is to find and physically remove the device, and use switch port security or 802.1X on wired ports to prevent recurrence.",
   "Guest access should give visitors internet service without exposing the internal network. A standard design uses a separate guest SSID mapped to a guest VLAN or tunneled to a DMZ, with firewall rules allowing only internet access (plus DHCP and DNS). Bandwidth limits and session timeouts are common.",
   "A captive portal intercepts a new guest's web traffic and redirects the browser to a page where the user accepts terms, enters a code or registers. After that, the system lets the client's traffic through. Remember that a captive portal is access control, not encryption; on an open SSID guest traffic is still readable over the air unless you use Enhanced Open.",
   "Client isolation (also called peer-to-peer blocking) prevents wireless clients on the same SSID from communicating directly with each other through the AP. On a guest network this stops one visitor's infected laptop from attacking another's. It should generally be enabled on guest SSIDs, but may need to be off where devices must talk to each other, such as casting to a display."
  ],
  "terms": [
   [
    "Rogue AP",
    "An unauthorized AP connected to the organization's wired network."
   ],
   [
    "Evil twin",
    "An attacker-controlled AP that imitates a legitimate SSID to lure clients."
   ],
   [
    "WIPS",
    "Wireless intrusion prevention system that monitors RF, classifies devices and detects wireless attacks."
   ],
   [
    "Captive portal",
    "A web page that guests must pass through before gaining network access."
   ],
   [
    "Client isolation",
    "A setting that blocks direct traffic between wireless clients on the same SSID or AP."
   ]
  ],
  "example": "The WIPS dashboard flags an unknown AP whose wireless MAC is one digit off a MAC address seen on a conference room switch port. The team locates it on the floor plan, finds a travel router plugged in by a visiting consultant, removes it and enables 802.1X on conference room ports.",
  "tip": "A rogue AP is defined by its connection to your wired network; an evil twin is defined by impersonating your SSID. Neighbor APs are neither.",
  "check": [
   [
    "How does a WIPS typically decide that an AP is a rogue rather than a neighbor?",
    "It correlates the AP's wireless or wired MAC addresses with traffic seen on the organization's wired network, showing the AP is connected internally."
   ],
   [
    "Does a captive portal encrypt guest traffic?",
    "No. It only controls access; encryption requires something like Enhanced Open or WPA2/WPA3."
   ]
  ]
 },
 {
  "t": "Site survey types: predictive, passive, active and AP-on-a-stick",
  "body": [
   "A site survey measures or models how RF behaves in a building so you can design or verify a WLAN. CWNA expects you to know the main survey types, what each one measures and when to use it. Most real projects combine several.",
   "A predictive survey is done in software, without visiting the site or with only limited visits. You import a scaled floor plan, draw walls and assign materials with attenuation values, define coverage areas and requirements, and let the software place or evaluate APs. It produces heat maps of predicted signal, SNR, channel overlap and capacity. Predictive surveys are fast and cheap, and they are ideal for new buildings that do not exist yet. Their accuracy depends entirely on the quality of the inputs, especially wall types, so they should be followed by on-site validation.",
   "A passive survey walks the site with a survey adapter listening to all the APs it can hear, recording beacons and their signal levels at each point. The client does not associate with any network. The results show coverage from every AP, including neighbors and rogues, plus channel assignments and co-channel overlap. Passive surveys are good for assessing an existing network or the RF environment before a new design.",
   "An active survey connects the survey client to a specific SSID and measures what a connected user would experience: data rates, throughput, retries, packet loss, latency and roaming behavior as you walk. It reveals problems that signal strength alone does not show, such as slow roaming or high retry rates. Active surveys take longer and typically cover one SSID at a time, so they are often done after a passive survey or for critical applications such as voice.",
   "An AP-on-a-stick survey (a pre-deployment survey, not to be confused with the post-installation validation survey) is used when no network exists yet or when you want to measure real propagation before finalizing a design. You mount a representative AP, configured with the power and channel you plan to use, on a tall stand or pole at a proposed mounting location, and then survey around it to see the actual cell boundary. You then move the AP to the next location. It gives very accurate results for difficult environments such as warehouses, hospitals and historic buildings, but it is labor-intensive and requires a portable power source for the AP.",
   "Hybrid approaches are common: create a predictive design, verify key areas with AP-on-a-stick measurements, adjust the model and, after installation, perform passive and active validation surveys. Spectrum analysis is usually added so you know about non-Wi-Fi interference."
  ],
  "terms": [
   [
    "Predictive survey",
    "A software model of RF coverage based on floor plans and wall attenuation, without on-site measurements."
   ],
   [
    "Passive survey",
    "A walk-through that records beacon signals from all APs without associating to any network."
   ],
   [
    "Active survey",
    "A walk-through with the survey client associated to an SSID to measure throughput, retries, latency and roaming."
   ],
   [
    "AP-on-a-stick",
    "Measuring the real coverage of a temporarily mounted AP at a proposed location before final installation."
   ]
  ],
  "example": "A hospital wing is being built. The designer creates a predictive model, but lead-lined imaging rooms and thick concrete walls make the results uncertain. Before finalizing, the team does AP-on-a-stick measurements in those areas, adjusts the design, and after installation performs passive and active validation surveys.",
  "tip": "Passive means listening only; active means associated and passing traffic. If a question asks which survey reveals roaming delays or throughput, the answer is active.",
  "check": [
   [
    "When is a predictive survey the most practical choice?",
    "When the building does not exist yet or you need a fast, low-cost initial design; it should be validated on site later."
   ],
   [
    "What does an active survey measure that a passive survey cannot?",
    "The experience of an associated client, such as throughput, retries, latency, packet loss and roaming behavior."
   ]
  ]
 },
 {
  "t": "Pre-survey preparation: floor plans, scale, requirements, access and safety",
  "body": [
   "A site survey is only as good as the preparation that goes into it. Showing up with a laptop but no accurate floor plans, requirements or access badges wastes time and produces unreliable results. CWNA covers what you should gather and arrange before the survey starts.",
   "First, obtain floor plans for every area in scope. Architectural drawings or CAD files are best; a fire evacuation map may do in a pinch. The plan must be imported into the survey software and calibrated to scale, usually by marking two points of known distance, such as the length of a corridor or a wall you have measured. An incorrect scale distorts every result: coverage appears larger or smaller than reality, and predictive models place APs incorrectly. Note which walls are concrete, brick, glass, drywall or metal, and look for elevator shafts, stairwells, large metal shelving and water features.",
   "Second, confirm the requirements you gathered during design: coverage areas, target signal and SNR, applications such as voice, expected density, client device types and bands to support. The requirements determine what you will measure and what counts as a pass. If voice must work in stairwells, you need to survey stairwells.",
   "Third, arrange access. You may need badges, escorts, keys for locked rooms, ladders or lifts, and permission to enter sensitive areas such as data centers, clean rooms, patient rooms or secure labs. Schedule the survey with facility staff, ideally at times representative of normal use, and find out whether you may mount temporary APs, drill or use ceiling spaces. Ask about existing Wi-Fi and other wireless systems so you do not misinterpret them.",
   "Fourth, plan for safety. Surveys often involve ladders, lifts, ceiling tiles, warehouses with forklifts and outdoor areas. Wear required protective equipment such as hard hats, high-visibility vests or safety shoes, follow site rules, and never work on ladders or lifts without proper training. In healthcare, follow infection control rules when opening ceilings. For outdoor or rooftop work, consider weather, fall protection and RF exposure near other transmitters.",
   "Finally, prepare your equipment: charged laptop and batteries, a supported survey adapter, a spectrum analyzer, a portable AP and battery pack for AP-on-a-stick work, a telescoping mast, a measuring wheel or laser distance meter, and a camera for documenting mounting locations and obstacles."
  ],
  "terms": [
   [
    "Floor plan calibration",
    "Setting the scale of an imported floor plan in survey software using a known distance."
   ],
   [
    "Site access",
    "Permissions, escorts, badges and schedules needed to enter all areas of the survey."
   ],
   [
    "Personal protective equipment",
    "Safety gear such as hard hats, vests and safety shoes required in some survey environments."
   ]
  ],
  "example": "A surveyor calibrated a floor plan using a door width instead of a long corridor. A small measurement error became a large scale error across the building, so the predicted cells looked much larger than reality. Re-calibrating using a measured 40-metre hallway corrected the model before any APs were ordered.",
  "tip": "If a question asks what to do before a survey, think: accurate scaled floor plans, documented requirements, access arrangements and safety. Calibrate scale over the longest distance you can measure.",
  "check": [
   [
    "Why is accurate floor plan scale critical?",
    "All distances and coverage calculations depend on it; a wrong scale makes cells appear larger or smaller than they really are."
   ],
   [
    "Name two safety considerations during a survey.",
    "Examples include ladder or lift safety, required protective equipment in warehouses or construction sites, forklift traffic and infection control in hospitals."
   ]
  ]
 },
 {
  "t": "Post-installation validation surveys against design requirements",
  "body": [
   "After APs are installed and configured, you must prove that the network actually meets the requirements that were agreed at the start. This is the purpose of a post-installation validation survey. A predictive design is a model; the validation survey is the real-world check.",
   "Start by reviewing the design requirements document: target primary signal strength (for example -67 dBm for voice areas), minimum SNR, secondary coverage, maximum co-channel overlap, required data rates or throughput, roaming performance and capacity targets. These become the pass or fail criteria for the survey. Without written requirements, a validation survey only produces pretty heat maps with no conclusion.",
   "Perform a passive survey across all coverage areas to measure signal from every AP, SNR, channel assignments and how many APs on the same channel are heard at each point. Then perform an active survey on the critical SSIDs to measure throughput, retries, latency and roaming as a real client would. For voice, walk the paths users take while on a call, including stairwells, elevator lobbies and building entrances. Collect spectrum analysis data too, because interference that appeared after installation can explain problems.",
   "Survey with a client whose radio behaves like the real devices, or apply an offset in the survey software. A high-gain survey adapter hears signals that a small handset cannot, so readings may look better than users experience. Also note whether automatic radio resource management changed channels or power since the design; validation should capture the network as it actually operates, and you may want to lock settings temporarily.",
   "Compare results to requirements and identify gaps. Typical findings include coverage holes where a wall was more attenuating than modeled, excessive overlap where power is too high, APs installed in slightly different locations than planned, or wrong channels. Remediation might mean adjusting power, changing channels, moving or adding APs, or changing antenna orientation. After changes, survey those areas again.",
   "Deliver a report: the requirements, methods and tools used, heat maps for each metric, a list of issues and fixes, and final confirmation that each requirement is met. This report also becomes the baseline for future troubleshooting, because you can compare later measurements with it."
  ],
  "terms": [
   [
    "Validation survey",
    "A post-installation survey that measures the live network and compares it with design requirements."
   ],
   [
    "Remediation",
    "Changes made to fix gaps found during validation, such as adjusting power or moving APs."
   ],
   [
    "Baseline",
    "Documented measurements of normal network performance used for comparison in later troubleshooting."
   ]
  ],
  "example": "A validation survey of a new clinic finds two exam rooms at -74 dBm against a -67 dBm requirement, because the rooms have lead-lined walls. The team adds an AP in the corridor between them, re-surveys the rooms, confirms -65 dBm, and records the change in the final report.",
  "tip": "A validation survey is always measured against documented requirements. If an answer choice skips comparing to requirements, it is probably wrong.",
  "check": [
   [
    "Why should both passive and active surveys be part of validation?",
    "Passive surveys show coverage, SNR and overlap from all APs, while active surveys show real client throughput, retries and roaming on the SSID."
   ],
   [
    "Why might a survey adapter show better coverage than users experience?",
    "Survey adapters often have better antennas and receive sensitivity than typical client devices, so an offset or a representative client should be used."
   ]
  ]
 },
 {
  "t": "Spectrum analysis: FFT, waterfall and duty cycle views; identifying non-Wi-Fi interferers",
  "body": [
   "A Wi-Fi adapter can only decode Wi-Fi frames. Energy from a microwave oven, a wireless camera or a jammer shows up to a Wi-Fi radio only as noise or a busy channel, and the adapter cannot tell you what it is. A spectrum analyzer measures raw RF energy across a range of frequencies, whatever its source, so it is the tool for finding non-Wi-Fi interference.",
   "The basic display is the FFT (Fast Fourier Transform) view, sometimes called real-time FFT. It plots frequency on the horizontal axis and amplitude, in dBm, on the vertical axis, updated continuously. It usually shows the current trace plus a maximum hold (the highest level seen at each frequency) and an average. The shape of the energy helps identify it: a Wi-Fi OFDM transmission looks like a flat-topped block about 20 MHz wide or wider, while a narrowband signal looks like a thin spike.",
   "The waterfall view, also called a spectrogram, adds time. Frequency runs horizontally, time scrolls vertically, and color represents amplitude. This reveals patterns: frequency-hopping devices such as Bluetooth appear as scattered short dots across the band, a microwave oven shows as regular bursts centered in the upper part of 2.4 GHz, a continuous analog video transmitter shows as a constant vertical stripe, and a jammer can fill the whole band.",
   "The duty cycle view shows the percentage of time that RF energy is above a threshold at each frequency. This matters because a strong signal that is only present briefly may not hurt much, while a weaker signal that is on nearly all the time can make a channel unusable, since Wi-Fi devices defer whenever they detect energy. High duty cycle from a non-Wi-Fi source is a strong sign of harmful interference.",
   "Common non-Wi-Fi interferers in 2.4 GHz include microwave ovens, Bluetooth devices, older cordless phones, wireless video cameras and baby monitors, some wireless headsets and industrial equipment. The 5 GHz band has fewer, but includes some cordless phones, video transmitters, radar (which triggers DFS) and certain point-to-point links. Many analysis tools include signature libraries that classify common devices automatically.",
   "Once identified, remediation options include removing or replacing the device, moving it, shielding, changing the Wi-Fi channel to avoid it, or shifting affected clients to another band. Enterprise APs often include basic spectrum capabilities, but a dedicated analyzer is usually more detailed for troubleshooting."
  ],
  "terms": [
   [
    "Spectrum analyzer",
    "A tool that measures RF energy across frequencies regardless of the transmitter type."
   ],
   [
    "FFT view",
    "A display of amplitude versus frequency at the current moment, often with max hold and average traces."
   ],
   [
    "Waterfall (spectrogram)",
    "A display of frequency over time with color representing amplitude."
   ],
   [
    "Duty cycle",
    "The percentage of time RF energy exceeds a threshold on a frequency."
   ]
  ],
  "example": "Staff in a break room lose Wi-Fi around lunchtime. A spectrum analyzer's waterfall shows strong bursts in the upper part of 2.4 GHz each time the microwave oven runs, with high duty cycle affecting channels near 11. Moving break room users to 5 GHz and away from channel 11 resolves the complaints.",
  "tip": "Protocol analyzers decode 802.11 frames; spectrum analyzers see all RF energy. For non-Wi-Fi interference, the answer is always a spectrum analyzer.",
  "check": [
   [
    "Why can't a normal Wi-Fi adapter identify a microwave oven?",
    "It can only decode 802.11 frames, so non-Wi-Fi energy appears only as noise or a busy medium without identification."
   ],
   [
    "Why is duty cycle important?",
    "A signal that occupies the channel a large percentage of the time causes Wi-Fi devices to defer constantly, even if its amplitude is moderate."
   ]
  ]
 },
 {
  "t": "Protocol analysis: monitor mode, channel selection, capture location, filters",
  "body": [
   "A protocol analyzer captures and decodes 802.11 frames so you can see exactly what devices are saying to each other: probes, authentication, association, 4-way handshakes, data, retries and disconnects. It is the tool that explains why a client behaves as it does, rather than just showing that something is wrong.",
   "To capture Wi-Fi frames properly, the adapter must be in monitor mode (also called RF monitor mode). In normal mode, an adapter is associated to one network and passes only its own traffic, already converted to Ethernet, to the operating system. In monitor mode, it is not associated and passes up every 802.11 frame it can hear on the tuned channel, including management and control frames and frames addressed to other devices, usually with a radiotap header adding signal strength, data rate and channel information. Monitor mode support depends on the adapter and driver; on Linux you might set it with `iw` commands, and some analyzer products provide supported adapters.",
   "A radio can only listen on one channel at a time. You must choose the channel of the AP and client you are troubleshooting, and match the channel width if you want to capture wide-channel frames. If you scan channels, you will miss frames on each channel while you are away. To capture a roaming event between APs on different channels, you need multiple adapters, one per channel, capturing at the same time. Also note that an adapter cannot decode frames using more spatial streams or a newer PHY than it supports.",
   "Capture location matters. The adapter only records what it can hear, and what it hears is not necessarily what the AP or client hears. To see what a client experiences, including retries and frames it does not receive, place the analyzer close to the client. To see the AP's perspective, capture near the AP. Hidden node problems, for example, only become visible when you understand where each device is. Many enterprise APs can also capture from their own radio and stream the frames to an analyzer.",
   "Filters make large captures manageable. Capture filters limit what is saved; display filters hide frames you do not need while viewing. In Wireshark, useful display filters include `wlan.addr == aa:bb:cc:dd:ee:ff` for one device, `eapol` for 4-way handshakes, `wlan.fc.type_subtype == 0x08` for beacons, `wlan.fc.type_subtype == 0x0c` for deauthentication frames and `wlan.fc.retry == 1` for retransmissions.",
   "Remember that encrypted data frames can only be decoded if you have the keys and captured the handshake; otherwise you see only headers. Management frames and the handshake themselves are usually enough for most connection troubleshooting. Only capture on networks you are authorized to analyze."
  ],
  "terms": [
   [
    "Monitor mode",
    "An adapter mode that captures all 802.11 frames on a channel without associating to a network."
   ],
   [
    "Radiotap header",
    "Metadata added to captured frames, such as signal strength, channel and data rate."
   ],
   [
    "Display filter",
    "A rule in an analyzer that shows only matching frames from a capture."
   ],
   [
    "Capture location",
    "The physical position of the analyzer, which determines which frames it can hear."
   ]
  ],
  "example": "A laptop drops off Wi-Fi every few minutes. With an adapter in monitor mode on the AP's channel next to the laptop, the engineer applies the filter for the laptop's MAC and sees the AP sending deauthentication frames with a reason code for inactivity, leading to a power-save driver issue on the laptop.",
  "tip": "One radio, one channel. To capture roaming across channels you need multiple adapters or AP-based captures, and to see a client's experience you capture near the client.",
  "check": [
   [
    "Why is monitor mode needed for Wi-Fi protocol analysis?",
    "Without it, the adapter passes only its own associated traffic converted to Ethernet, not all 802.11 management, control and data frames on the channel."
   ],
   [
    "Where should you place the analyzer to see what a problem client experiences?",
    "Close to the client, so it hears roughly what the client hears, including frames the client may miss."
   ]
  ]
 },
 {
  "t": "Key metrics: RSSI, SNR, retry rate, channel utilization, data rates",
  "body": [
   "Wi-Fi troubleshooting and validation rely on a handful of metrics. Each tells you something different, and the exam expects you to know what each measures, what good values look like and which problems each points to.",
   "RSSI (received signal strength indicator) describes how strong a received signal is. Strictly, RSSI in the 802.11 standard is a relative, vendor-defined value, and each chipset maps it to dBm differently, so two devices in the same spot may report different numbers. Most tools display signal in dBm, where values closer to zero are stronger: -50 dBm is strong, -67 dBm is a common voice target, -80 dBm is weak. Low signal points to coverage problems, clients too far from the AP or obstructions.",
   "SNR (signal-to-noise ratio) is the received signal minus the noise floor, in dB. A signal of -65 dBm over a noise floor of -95 dBm gives an SNR of 30 dB. SNR determines which modulation and data rate a link can sustain; higher-order modulations such as 256-QAM or 1024-QAM need high SNR. Good signal with poor SNR means a noise or interference problem, which calls for spectrum analysis.",
   "Retry rate is the percentage of frames that had to be retransmitted because no acknowledgment was received. Every frame in a capture has a retry bit that is set on retransmissions. Some retries are normal, but high retry rates, often cited as above roughly 10 percent, indicate interference, collisions, hidden nodes, low SNR or clients at the cell edge. Retries waste airtime and add latency, which especially hurts voice.",
   "Channel utilization is the percentage of time the channel is busy, as detected by a radio, whether from Wi-Fi or other energy. Many APs report it, and the QoS Basic Service Set (QBSS) load element in beacons can advertise it. High utilization, for example consistently above about 50 to 60 percent, means little airtime is left for new traffic and latency will rise. Causes include too many clients, low data rates, beacon overhead from too many SSIDs, co-channel contention and non-Wi-Fi interference.",
   "Data rates are the PHY rates used for each frame, shown in captures and client statistics, often as an MCS (modulation and coding scheme) index along with spatial streams and channel width. Clients using low rates when they should be close to an AP suggest interference, poor SNR, sticky clients or rate settings that allow very low rates. Remember that data rate is not throughput; actual throughput is much lower because of overhead and contention.",
   "Use these metrics together. Low signal with low data rates points to coverage; good signal with high retries points to interference or hidden nodes; high utilization with few clients points to overhead or co-channel contention."
  ],
  "terms": [
   [
    "RSSI",
    "A vendor-specific relative measure of received signal strength, commonly displayed in dBm."
   ],
   [
    "Retry rate",
    "The percentage of frames retransmitted because an acknowledgment was not received."
   ],
   [
    "Channel utilization",
    "The percentage of time a channel is detected as busy."
   ],
   [
    "MCS index",
    "A number identifying the modulation and coding scheme, which together with streams and width determines the data rate."
   ]
  ],
  "example": "A meeting room shows -58 dBm signal but users complain of slow video calls. A capture shows a 25 percent retry rate and a spectrum analyzer reveals a wireless presentation system transmitting continuously nearby. Good RSSI but poor SNR and high retries pointed to interference, not coverage.",
  "tip": "Compare RSSI values between different client devices carefully; the scale is vendor-specific. SNR, retries and utilization often explain a problem better than signal alone.",
  "check": [
   [
    "If signal is -60 dBm and the noise floor is -85 dBm, what is the SNR?",
    "25 dB, because SNR is the difference between the signal and the noise floor."
   ],
   [
    "What might high channel utilization with only a few connected clients indicate?",
    "Overhead such as many SSIDs beaconing at low rates, co-channel contention from other APs, or non-Wi-Fi interference."
   ]
  ]
 },
 {
  "t": "Common RF problems: co-channel contention, adjacent channel interference, hidden nodes, low SNR",
  "body": [
   "Many Wi-Fi performance complaints trace back to a small set of RF problems. The CWNA exam expects you to recognize each from its symptoms and choose the right fix.",
   "Co-channel contention (CCC) occurs when multiple APs and clients on the same channel can hear each other. Under CSMA/CA they all defer to one another, so they share one channel's airtime. Frames are not corrupted; the channel is simply shared among too many devices. Symptoms are high channel utilization and poor throughput even with good signal and low retries. A passive survey showing several APs on the same channel above about -85 dBm at one location confirms it. Fixes include lowering AP power, improving the channel plan, using more channels (including DFS and 6 GHz), using narrower channel widths, and removing unnecessary APs or radios.",
   "Adjacent channel interference (ACI) happens when transmitters on overlapping or nearby channels leak energy into each other. In 2.4 GHz this is common when APs use channels other than 1, 6 and 11. Unlike CCC, the energy often cannot be decoded, so it raises noise and corrupts frames, causing retries. It also occurs when a very strong transmitter on a nearby but non-overlapping channel is physically close, because real transmit masks are not perfect. Fixes include using a proper non-overlapping channel plan, reducing power and increasing physical separation.",
   "A hidden node problem occurs when two clients can both hear the AP but cannot hear each other, perhaps because of a wall or distance. Each senses the channel as idle and transmits, and their frames collide at the AP. Symptoms are high retry rates from specific clients, often at the cell edge, while the AP-side view shows collisions. Fixes include adding or relocating APs so clients are closer, removing obstacles, increasing client power where supported, and enabling RTS/CTS for affected clients so the AP's CTS reserves the medium for everyone who hears the AP.",
   "Low SNR means the signal is not far enough above the noise floor. Causes are either weak signal (distance, obstacles, low AP power) or high noise (non-Wi-Fi interference, a wide channel collecting more noise). Symptoms are low data rates and high retries. Diagnose with a spectrum analyzer to see the noise floor and interferers, and a survey to see signal. Fix by improving coverage or removing or avoiding the noise source.",
   "When troubleshooting, collect the key metrics: signal, noise, SNR, retry rate, utilization and the channel plan. Match the pattern to the problem rather than reaching for a generic fix like raising power, which often makes CCC and hidden node imbalance worse."
  ],
  "terms": [
   [
    "Co-channel contention",
    "Sharing of airtime among devices on the same channel that hear each other and defer."
   ],
   [
    "Adjacent channel interference",
    "Corruption and noise from transmitters on overlapping or nearby channels."
   ],
   [
    "Hidden node",
    "A situation where clients that cannot hear each other transmit at the same time, causing collisions at the AP."
   ],
   [
    "RTS/CTS",
    "A protection exchange where a client requests to send and the AP clears it, reserving the medium for all that hear the CTS."
   ]
  ],
  "example": "In a long warehouse, handheld scanners at opposite ends of an aisle both connect to a central AP but are blocked from each other by tall metal racks. Retry rates spike when both are busy. Enabling RTS/CTS on the scanners and adding an AP at each end of the aisle reduces the collisions.",
  "tip": "CCC means deferral and lost capacity (low retries, high utilization). ACI and hidden nodes mean corrupted frames and high retries. Hidden node fixes include RTS/CTS; CCC fixes do not.",
  "check": [
   [
    "Why does a hidden node problem cause collisions despite CSMA/CA?",
    "The clients cannot hear each other, so each senses an idle medium and transmits at the same time, and the frames collide at the AP."
   ],
   [
    "Why can using channel 3 in a 1/6/11 environment cause trouble?",
    "Channel 3 overlaps channels 1 and 6, causing adjacent channel interference that corrupts frames on both."
   ]
  ]
 },
 {
  "t": "Client problems: sticky clients, power mismatch between AP and client, driver issues",
  "body": [
   "Not every Wi-Fi problem is caused by the infrastructure. In 802.11, the client decides when to scan, which AP to join and when to roam. Client behavior therefore strongly shapes the user experience, and CWNA tests several common client-side issues.",
   "A sticky client stays associated to an AP long after a better AP is available. For example, a laptop joins an AP by the entrance and keeps using it as the user walks to the far side of the building, falling to very low data rates rather than roaming. Each client driver has its own roaming threshold, and some roam only when the signal is very weak. Sticky clients hurt themselves and everyone else on the channel, because their slow frames consume airtime. Remedies include enabling 802.11k (neighbor reports) and 802.11v (BSS transition management) so the network can help clients find better APs, raising the minimum basic rate so distant clients cannot hold on, adjusting AP power so cells are not overly large and, where supported, adjusting the client's roaming aggressiveness setting in its driver.",
   "A power mismatch happens when the AP transmits at much higher power than the client can. The client hears the AP loudly and believes it has a good connection, so it stays associated, but the AP cannot hear the client's weaker transmissions reliably. The result is one-way communication problems: the client sees good signal bars, yet its uploads fail, retries climb and connections drop. Typical clients such as phones transmit at lower power than an AP can, so running APs at maximum power creates this imbalance. The fix is to set AP power closer to typical client power, which also shrinks cells and reduces co-channel contention, and to add APs where coverage is then needed.",
   "Driver issues are a frequent and often overlooked cause of problems. Wireless drivers control scanning, roaming decisions, power saving and support for features like WPA3, PMF, 802.11r and newer PHYs. Outdated drivers can cause frequent disconnects, failure to see 5 or 6 GHz networks, failure to connect to SSIDs with newer security settings, or aggressive power-saving that makes the client unreachable. If one model of device misbehaves while others are fine in the same place, suspect the driver. Update drivers and firmware from the manufacturer, check client power management settings, and review release notes for known Wi-Fi fixes.",
   "Troubleshooting clients means gathering client-side evidence: the driver version, the client's own signal and data rate readings, its event logs, and a protocol capture near the client showing its probes, roams and disconnection reason codes."
  ],
  "terms": [
   [
    "Sticky client",
    "A client that remains associated to a distant AP instead of roaming to a better one."
   ],
   [
    "Power mismatch",
    "An imbalance where the AP transmits much more strongly than the client, so the client hears the AP but the AP struggles to hear the client."
   ],
   [
    "802.11k",
    "An amendment that lets APs provide neighbor reports to help clients find roaming candidates."
   ],
   [
    "802.11v BSS transition management",
    "A mechanism that lets the network suggest that a client move to a different AP."
   ]
  ],
  "example": "A new tablet model keeps dropping calls in a hospital while older devices work fine in the same corridors. The team finds the tablets run an outdated Wi-Fi driver with a very low roaming threshold. After a firmware update and enabling 802.11k and 802.11v, the tablets roam promptly and calls stay up.",
  "tip": "Remember that the client decides when to roam. The network can influence roaming with rates, power, 802.11k and 802.11v, but cannot force a well-behaved roam on a poorly written driver.",
  "check": [
   [
    "Why can high AP power cause problems even when clients show full bars?",
    "The client hears the strong AP but its own lower-power transmissions may not reach the AP reliably, causing retries and failed uploads."
   ],
   [
    "What clue suggests a driver issue rather than an RF problem?",
    "Only one make or model of client has problems while other devices in the same place work normally."
   ]
  ]
 },
 {
  "t": "Connection problems: wrong passphrase, expired RADIUS certificates, DHCP and VLAN errors",
  "body": [
   "When a user says they cannot connect to Wi-Fi, the failure can be at any stage: discovery, association, authentication, key exchange, or getting an IP address. Identifying the stage is the fastest way to the cause. This lesson covers several of the most common causes that CWNA scenarios describe.",
   "A wrong passphrase on a WPA2-Personal network shows a clear pattern. The client associates successfully and the 4-way handshake begins, but it fails after message 2 because the client's MIC was computed from the wrong PMK. The AP may log a MIC failure or handshake timeout and then deauthenticate the client, and the client may retry repeatedly. In WPA3-Personal, the failure happens earlier, during the SAE exchange. The fix is to confirm the correct passphrase, and remember that an old saved profile on the device may still hold a previous passphrase.",
   "In 802.1X networks, an expired or replaced RADIUS server certificate can suddenly break authentication for many users at once. Clients configured to validate the server certificate will refuse to complete the TLS tunnel for PEAP, EAP-TTLS or EAP-TLS, and users may see a certificate warning or simply fail to connect. In a capture you see EAP exchanges that stop partway through the TLS handshake, followed by a failure. RADIUS logs usually show the client aborting. The fix is to renew the certificate before it expires, ensure clients trust the issuing certificate authority, and track certificate expiry dates. With EAP-TLS, expired client certificates cause individual users to fail in the same way.",
   "If authentication succeeds but the client shows a self-assigned address (in the 169.254.x.x range on many operating systems) or no IP address, the problem is DHCP. Causes include an exhausted DHCP scope, which is common on busy guest networks with long lease times, a DHCP server that is down, a missing DHCP relay (IP helper) on the router for the client VLAN, or a firewall blocking DHCP. Check scope usage, relay configuration and whether other clients on the same VLAN get addresses.",
   "VLAN errors often look like DHCP errors. If an SSID is mapped to VLAN 30 but VLAN 30 is not allowed on the AP's trunk, or the switch tags it differently, client traffic never reaches the right subnet and DHCP fails. A RADIUS server returning a VLAN that does not exist at that site causes the same symptom for some users only. Verify the SSID-to-VLAN mapping, the switch trunk's allowed VLANs and native VLAN, and any dynamic VLAN attributes.",
   "A disciplined approach is to walk up the connection stages and confirm each one: can the client see the SSID, does it associate, does authentication succeed, does the 4-way handshake complete, does it get an address, and can it reach the gateway and DNS?"
  ],
  "terms": [
   [
    "MIC failure",
    "A failed message integrity check in the 4-way handshake, commonly caused by a wrong passphrase in Personal mode."
   ],
   [
    "Server certificate",
    "The certificate a RADIUS server presents to clients during TLS-based EAP methods."
   ],
   [
    "DHCP scope exhaustion",
    "A condition where all addresses in a DHCP pool are leased, so new clients get no address."
   ],
   [
    "DHCP relay",
    "A router function that forwards DHCP broadcasts from a client VLAN to a DHCP server on another subnet."
   ]
  ],
  "example": "On Monday morning no staff laptops can join the corporate 802.1X SSID, though guest access works. The RADIUS server log shows clients abandoning the TLS handshake, and the server certificate expired over the weekend. Installing a renewed certificate restores access, and the team adds expiry reminders.",
  "tip": "Map symptoms to the stage: failure after message 2 of the handshake suggests a wrong passphrase; failure inside EAP-TLS or PEAP suggests certificates; connected but no IP suggests DHCP or VLAN.",
  "check": [
   [
    "What does a 169.254.x.x address on a Wi-Fi client usually indicate?",
    "The client associated and authenticated but did not receive a DHCP address, pointing to DHCP or VLAN problems."
   ],
   [
    "Why might an expired RADIUS certificate affect all users at once?",
    "Every client using a TLS-based EAP method validates the same server certificate, so all refuse to authenticate when it expires."
   ]
  ]
 },
 {
  "t": "Structured troubleshooting and documenting findings",
  "body": [
   "Random fixes, such as rebooting APs or turning up power, sometimes make a problem go away briefly but rarely explain it. Structured troubleshooting follows a consistent method so you find the true root cause, avoid creating new problems and can explain what happened. CWNA material presents this as a sequence of steps.",
   "First, identify the problem. Gather information from users and systems: who is affected, where, when it started, what changed, which devices and SSIDs, and whether it is constant or intermittent. Reproduce it if you can. A vague report of 'Wi-Fi is slow' needs to become something measurable, such as 'voice calls drop in the east stairwell on handsets from one vendor'.",
   "Second, establish a theory of probable cause. Use what you know about Wi-Fi to list likely causes, starting with the simplest and most common. A layered approach helps: check the physical and RF layer (signal, SNR, interference), then 802.11 association and authentication, then IP and services such as DHCP and DNS, then the application. Ask whether the problem is client-side or infrastructure-side by testing with other devices.",
   "Third, test the theory using the right tools: a survey tool for coverage, a spectrum analyzer for interference, a protocol analyzer for frame-level behavior, and logs from the controller, APs and RADIUS server. If the theory is disproved, form a new one. Fourth, create a plan of action to fix the problem, considering its impact on users and whether a change window is needed. Fifth, implement the fix, or escalate if it is outside your authority.",
   "Sixth, verify full system functionality. Confirm that the original problem is resolved for the affected users and that the change has not caused new problems elsewhere, for example that lowering AP power did not create a coverage hole. Where appropriate, implement preventive measures, such as monitoring alerts or policies.",
   "Finally, document findings, actions and outcomes. Record the symptoms, the evidence you gathered, the root cause, what you changed (with before and after settings), how you verified it and any follow-up work. Save captures, screenshots and survey data. Good documentation speeds up future troubleshooting, supports change management, helps colleagues learn and provides a record if the problem returns. Keep network diagrams, channel plans and baselines current so the next troubleshooter has a known good state to compare against.",
   "Change one thing at a time where possible. If you change power, channels and a driver version at once, you will not know which one fixed the problem, or which one caused a new one."
  ],
  "terms": [
   [
    "Root cause",
    "The underlying reason a problem occurs, as opposed to its symptoms."
   ],
   [
    "Theory of probable cause",
    "A proposed explanation for a problem that is then tested with tools and evidence."
   ],
   [
    "Verification",
    "Confirming the fix resolved the issue and did not introduce new problems."
   ],
   [
    "Documentation",
    "A written record of symptoms, evidence, root cause, changes and outcomes."
   ]
  ],
  "example": "Users report intermittent disconnects on one floor. The engineer interviews users, notes it began after a firmware upgrade, and theorizes a driver incompatibility. Captures show deauthentications with a specific reason code only for one laptop model. A driver update fixes it, the engineer verifies across the floor and records the root cause, evidence and fix in the ticket.",
  "tip": "Exam questions often ask what the next step is. After identifying the problem, form a theory; after fixing, verify; and always finish by documenting.",
  "check": [
   [
    "What should you do immediately after implementing a fix?",
    "Verify full system functionality, confirming the problem is solved and nothing else broke."
   ],
   [
    "Why change only one thing at a time when troubleshooting?",
    "So you can tell which change fixed the problem or caused a new one."
   ]
  ]
 }
], { reviewed: "2026-09-25" });
