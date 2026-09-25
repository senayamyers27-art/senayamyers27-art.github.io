/* Network engineering labs: multi-area OSPF and BGP with FRRouting, VRRP failover, dual-stack IPv6,
   QoS with tc, Junos CLI, AWS VPC networking and a Wi-Fi site survey. Format: LABS_FORMAT.md. */
CertHub.registerLabs([
  {
    "id": "lab-frr-ospf-multiarea",
    "title": "Multi-area OSPF, stub areas and route redistribution with FRRouting",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free (Docker, containerlab and the FRRouting container image, all open source)",
    "summary": "Build a four-router, three-area OSPF network out of FRRouting containers with containerlab, read the link-state database (LSA types 1, 2, 3, 4 and 5), summarize an area at its ABR, redistribute static routes through a prefix-list and route-map, turn an area into a totally stubby area, and diagnose an MTU mismatch that leaves neighbors stuck in ExStart.",
    "realWorld": "Enterprise and campus networks split OSPF into areas so that a flapping link in one branch does not make every router recompute its routes. Network engineers design the area boundaries, summarize at the ABRs, and control exactly which external routes are injected, because a careless 'redistribute static' has taken down more than one production network. FRRouting is the same routing suite used in SONiC switches, Cumulus Linux and many cloud routers, so the skills transfer directly.",
    "youWillNeed": [
      "Your Ubuntu Server 24.04 VM (ubuntu-srv01) from lab-home-lab with at least 4 GB RAM, 2 vCPUs and NAT internet access",
      "Docker Engine and containerlab (installed in step 1)",
      "The FRRouting image quay.io/frrouting/frr:10.2.1 and the ghcr.io/hellt/network-multitool image for test hosts (about 400 MB in total)"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli",
      "lab-pt-ospf"
    ],
    "safety": "Everything runs in containers inside your own VM and never touches your real network. containerlab needs root and edits Docker networks, so use your lab VM, not a work laptop or a production host. Take a snapshot first so you can roll the VM back.",
    "steps": [
      {
        "title": "Snapshot the VM and install Docker and containerlab",
        "body": "containerlab builds network topologies from a YAML file: each node is a container and each link is a virtual Ethernet (veth) pair. The FRR image runs the real FRRouting daemons (zebra, ospfd, bgpd) that ship in commercial Linux-based routers. Pin a version tag so your output matches this lab; if 10.2.1 is no longer published, pick the newest 10.x tag from quay.io/repository/frrouting/frr.",
        "cmd": "VBoxManage snapshot \"ubuntu-srv01\" take \"pre-clab\"\n# On ubuntu-srv01:\nsudo apt update && sudo apt install -y docker.io\nsudo systemctl enable --now docker\nbash -c \"$(curl -sL https://get.containerlab.dev)\"\ncontainerlab version\nsudo docker pull quay.io/frrouting/frr:10.2.1\nsudo docker pull ghcr.io/hellt/network-multitool",
        "check": "containerlab version prints a version number and both docker pull commands finish with 'Status: Downloaded newer image' or 'Image is up to date'."
      },
      {
        "title": "Plan the areas and addresses",
        "body": "Draw this before you type anything. Area 0 is the backbone between r1 and r2. r1 is the ABR for area 1 (r3 and host h1), r2 is the ABR for area 2 (r4 and host h2). r4 has four LAN prefixes 10.2.0.0/24 to 10.2.3.0/24 so there is something to summarize, and it will later act as an ASBR that injects 'partner' static routes. Router IDs are 1.1.1.1 to 4.4.4.4 on each router's loopback.",
        "cmd": "# link / subnet           area   addresses\n# r1 eth1 - r2 eth1       0      10.0.12.0/30  (r1 .1, r2 .2)\n# r1 eth2 - r3 eth1       1      10.1.13.0/30  (r1 .1, r3 .2)\n# r2 eth2 - r4 eth1       2      10.2.24.0/30  (r2 .1, r4 .2)\n# r3 eth2 - h1            1      10.1.1.0/24   (r3 .1, h1 .10)\n# r4 eth2 - h2            2      10.2.0.0/24 to 10.2.3.0/24 (r4 .1, h2 10.2.0.10)",
        "check": "Your diagram shows three areas, two ABRs (r1, r2), one future ASBR (r4) and every subnet above."
      },
      {
        "title": "Write the daemons file and the topology",
        "body": "FRR reads /etc/frr/daemons to decide which routing daemons to start. The topology file gives every router the same image, mounts its config, and deletes the Docker management default route so it cannot hide the routes OSPF learns. The hosts are small Linux containers with ping and traceroute.",
        "cmd": "mkdir -p ~/clab/ospf && cd ~/clab/ospf\ncat > daemons <<'EOF'\nzebra=yes\nospfd=yes\nbgpd=no\nvtysh_enable=yes\nzebra_options=\"  -A 127.0.0.1 -s 90000000\"\nospfd_options=\"  -A 127.0.0.1\"\nstaticd_options=\"-A 127.0.0.1\"\nEOF\ncat > ospf.clab.yml <<'EOF'\nname: ospf\ntopology:\n  kinds:\n    linux:\n      image: quay.io/frrouting/frr:10.2.1\n  nodes:\n    r1:\n      kind: linux\n      binds:\n        - daemons:/etc/frr/daemons\n        - r1.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n    r2:\n      kind: linux\n      binds:\n        - daemons:/etc/frr/daemons\n        - r2.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n    r3:\n      kind: linux\n      binds:\n        - daemons:/etc/frr/daemons\n        - r3.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n    r4:\n      kind: linux\n      binds:\n        - daemons:/etc/frr/daemons\n        - r4.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n    h1:\n      kind: linux\n      image: ghcr.io/hellt/network-multitool\n      exec:\n        - ip addr add 10.1.1.10/24 dev eth1\n        - ip route replace default via 10.1.1.1\n    h2:\n      kind: linux\n      image: ghcr.io/hellt/network-multitool\n      exec:\n        - ip addr add 10.2.0.10/24 dev eth1\n        - ip route replace default via 10.2.0.1\n  links:\n    - endpoints: [\"r1:eth1\", \"r2:eth1\"]\n    - endpoints: [\"r1:eth2\", \"r3:eth1\"]\n    - endpoints: [\"r2:eth2\", \"r4:eth1\"]\n    - endpoints: [\"r3:eth2\", \"h1:eth1\"]\n    - endpoints: [\"r4:eth2\", \"h2:eth1\"]\nEOF",
        "check": "ls shows daemons and ospf.clab.yml."
      },
      {
        "title": "Write the ABR configs (r1 and r2)",
        "body": "FRR accepts per-interface OSPF: 'ip ospf area X' puts every address on that interface into the area. An ABR is simply a router with interfaces in area 0 and another area. Point-to-point network type skips the DR/BDR election on the /30 links, and both ends must agree on it.",
        "cmd": "cat > r1.conf <<'EOF'\nfrr defaults traditional\nhostname r1\ninterface lo\n ip address 1.1.1.1/32\n ip ospf area 0\ninterface eth1\n ip address 10.0.12.1/30\n ip ospf area 0\n ip ospf network point-to-point\ninterface eth2\n ip address 10.1.13.1/30\n ip ospf area 1\n ip ospf network point-to-point\nrouter ospf\n ospf router-id 1.1.1.1\nEOF\ncat > r2.conf <<'EOF'\nfrr defaults traditional\nhostname r2\ninterface lo\n ip address 2.2.2.2/32\n ip ospf area 0\ninterface eth1\n ip address 10.0.12.2/30\n ip ospf area 0\n ip ospf network point-to-point\ninterface eth2\n ip address 10.2.24.1/30\n ip ospf area 2\n ip ospf network point-to-point\nrouter ospf\n ospf router-id 2.2.2.2\nEOF",
        "check": "Both files exist and each has exactly one interface in a non-backbone area."
      },
      {
        "title": "Write the internal router configs (r3 and r4)",
        "body": "r3 and r4 are internal routers: all their interfaces are in one area. 'ip ospf passive' advertises the LAN without sending hellos to the hosts. r4's LAN interface carries four prefixes, and r4 also holds three static blackhole routes that stand in for a partner network; nothing redistributes them yet.",
        "cmd": "cat > r3.conf <<'EOF'\nfrr defaults traditional\nhostname r3\ninterface lo\n ip address 3.3.3.3/32\n ip ospf area 1\ninterface eth1\n ip address 10.1.13.2/30\n ip ospf area 1\n ip ospf network point-to-point\ninterface eth2\n ip address 10.1.1.1/24\n ip ospf area 1\n ip ospf passive\nrouter ospf\n ospf router-id 3.3.3.3\nEOF\ncat > r4.conf <<'EOF'\nfrr defaults traditional\nhostname r4\ninterface lo\n ip address 4.4.4.4/32\n ip ospf area 2\ninterface eth1\n ip address 10.2.24.2/30\n ip ospf area 2\n ip ospf network point-to-point\ninterface eth2\n ip address 10.2.0.1/24\n ip address 10.2.1.1/24\n ip address 10.2.2.1/24\n ip address 10.2.3.1/24\n ip ospf area 2\n ip ospf passive\nip route 192.0.2.0/24 blackhole\nip route 198.51.100.0/24 blackhole\nip route 203.0.113.0/24 blackhole\nrouter ospf\n ospf router-id 4.4.4.4\nEOF",
        "check": "You have r1.conf to r4.conf in ~/clab/ospf."
      },
      {
        "title": "Deploy and check the adjacencies",
        "body": "containerlab names each container clab-<lab>-<node>. vtysh is FRR's Cisco-like shell; you can open it interactively or pass single commands with -c. Adjacencies take up to about 40 seconds to reach Full.",
        "cmd": "cd ~/clab/ospf && sudo containerlab deploy -t ospf.clab.yml\nsleep 40\nsudo docker exec clab-ospf-r1 vtysh -c \"show ip ospf neighbor\"\nsudo docker exec clab-ospf-r2 vtysh -c \"show ip ospf neighbor\"\nsudo docker exec clab-ospf-r1 vtysh -c \"show ip ospf\" | grep -iE \"abr|area\"",
        "check": "r1 lists 2.2.2.2 and 3.3.3.3 and r2 lists 1.1.1.1 and 4.4.4.4, all in state Full/-. 'show ip ospf' on r1 says it is an ABR and has attached areas 0.0.0.0 and 0.0.0.1."
      },
      {
        "title": "Read the link-state database and the inter-area routes",
        "body": "Type 1 (router) LSAs describe each router's links inside one area. ABRs turn them into type 3 (summary) LSAs for the other areas, so r3 never sees area 2's topology, only its prefixes. In the routing table, 'O' is intra-area and 'O IA' is inter-area. Save this output: you will compare it after summarization and the stub change.",
        "cmd": "sudo docker exec clab-ospf-r3 vtysh -c \"show ip ospf database\"\nsudo docker exec clab-ospf-r3 vtysh -c \"show ip route ospf\"\nsudo docker exec clab-ospf-h1 ping -c 3 10.2.0.10\nsudo docker exec clab-ospf-h1 traceroute -n 10.2.0.10",
        "check": "r3's database has Router Link States for area 1 only and Summary Link States from 1.1.1.1; its routing table shows four separate 'O IA' routes 10.2.0.0/24 to 10.2.3.0/24. h1 reaches h2 through 10.1.1.1, 10.1.13.1, 10.0.12.2, 10.2.24.2."
      },
      {
        "title": "Summarize area 2 at its ABR",
        "body": "Summarization happens only at area borders in OSPF. 'area 2 range' on r2 replaces the four type 3 LSAs with one, so a LAN flapping in area 2 no longer changes anything outside it. Open vtysh interactively and paste the configuration.",
        "cmd": "sudo docker exec -it clab-ospf-r2 vtysh\nconfigure terminal\nrouter ospf\n area 2 range 10.2.0.0/22\nend\nexit\nsudo docker exec clab-ospf-r3 vtysh -c \"show ip route ospf\" | grep 10.2\nsudo docker exec clab-ospf-r2 vtysh -c \"show ip route 10.2.0.0/22\"",
        "check": "r3 now shows a single 'O IA 10.2.0.0/22' instead of four /24s; r2 itself still has the four /24 routes plus a blackhole discard route for the summary."
      },
      {
        "title": "Redistribute only approved static routes (r4 becomes an ASBR)",
        "body": "Never redistribute without a filter. The prefix-list approves two of the three partner prefixes; the route-map applies it, sets metric type 1 (the internal cost is added as the route travels) and tags the routes so they can be identified or filtered anywhere in the domain.",
        "cmd": "sudo docker exec -it clab-ospf-r4 vtysh\nconfigure terminal\nip prefix-list PARTNER seq 10 permit 192.0.2.0/24\nip prefix-list PARTNER seq 20 permit 198.51.100.0/24\nroute-map STATIC-TO-OSPF permit 10\n match ip address prefix-list PARTNER\n set metric-type type-1\n set metric 50\n set tag 400\nrouter ospf\n redistribute static route-map STATIC-TO-OSPF\nend\nexit\nsudo docker exec clab-ospf-r1 vtysh -c \"show ip ospf database external\"\nsudo docker exec clab-ospf-r1 vtysh -c \"show ip ospf database asbr-summary\"\nsudo docker exec clab-ospf-r3 vtysh -c \"show ip route ospf\" | grep -E \"E1|E2\"",
        "check": "r1 sees type 5 (AS External) LSAs for 192.0.2.0/24 and 198.51.100.0/24 from advertising router 4.4.4.4 with 'Metric Type: 1' and 'Tag: 400', plus a type 4 ASBR-summary for 4.4.4.4 originated by an ABR. 203.0.113.0/24 appears nowhere outside r4."
      },
      {
        "title": "Make area 1 totally stubby",
        "body": "Area 1 has one exit, so r3 needs no detail about the rest of the network. A stub area blocks type 5 LSAs; 'no-summary' on the ABR also blocks type 3, leaving only a default route. The stub flag is carried in hellos, so the adjacency drops until both ends match: configure r1, then r3, and watch it come back.",
        "cmd": "sudo docker exec clab-ospf-r1 vtysh -c \"configure terminal\" -c \"router ospf\" -c \"area 1 stub no-summary\"\nsudo docker exec clab-ospf-r3 vtysh -c \"show ip ospf neighbor\"\nsudo docker exec clab-ospf-r3 vtysh -c \"configure terminal\" -c \"router ospf\" -c \"area 1 stub\"\nsleep 40\nsudo docker exec clab-ospf-r3 vtysh -c \"show ip route ospf\"\nsudo docker exec clab-ospf-r3 vtysh -c \"show ip ospf database\" | grep -iE \"link states|external\"\nsudo docker exec clab-ospf-h1 ping -c 3 10.2.0.10",
        "check": "Between the two commands r3 has no neighbor. Afterwards r3's OSPF routes are its own area 1 prefixes plus one 'O IA 0.0.0.0/0' via 10.1.13.1; there are no E1 routes or AS External link states, and h1 still reaches h2."
      },
      {
        "title": "Fault: MTU mismatch leaves neighbors stuck in ExStart",
        "body": "OSPF compares the interface MTU in its Database Description packets, and a router that receives a DBD bigger than its own MTU refuses it, so the adjacency stalls in ExStart or Exchange. This is common when one side of a link has a tunnel or jumbo-frame setting. Record the current MTU (containerlab uses 9500 by default), lower it on r3 only, and flap the link to force a new adjacency.",
        "cmd": "sudo docker exec clab-ospf-r3 ip link show eth1 | grep -o \"mtu [0-9]*\"\nsudo docker exec clab-ospf-r3 sh -c \"ip link set eth1 down; ip link set eth1 mtu 1400; ip link set eth1 up\"\nsleep 20\nsudo docker exec clab-ospf-r1 vtysh -c \"show ip ospf neighbor\"\nsudo docker exec clab-ospf-r3 vtysh -c \"show ip ospf interface eth1\" | grep -i mtu",
        "check": "r1 shows 3.3.3.3 stuck in ExStart or Exchange (never Full), and the interface output on r3 reports MTU 1400 while r1's is 9500."
      },
      {
        "title": "Fix the fault, capture the evidence and tear down",
        "body": "Restore the original MTU (the right fix is always to make both ends agree; 'ip ospf mtu-ignore' only hides the problem). Save every router's running config into your notes, then destroy the lab. The .conf files stay on disk, so 'containerlab deploy' rebuilds the base topology in seconds.",
        "cmd": "sudo docker exec clab-ospf-r3 sh -c \"ip link set eth1 down; ip link set eth1 mtu 9500; ip link set eth1 up\"\nsleep 40; sudo docker exec clab-ospf-r1 vtysh -c \"show ip ospf neighbor\"\nfor r in r1 r2 r3 r4; do sudo docker exec clab-ospf-$r vtysh -c \"show running-config\" > $r-final.txt; done\nsudo containerlab destroy -t ospf.clab.yml",
        "check": "3.3.3.3 returns to Full, four *-final.txt files hold the configs, and 'sudo docker ps' shows no clab-ospf containers."
      }
    ],
    "verify": [
      "r3's routing table showed four O IA /24s before summarization and one O IA 10.2.0.0/22 after.",
      "r1 showed type 5 LSAs for 192.0.2.0/24 and 198.51.100.0/24 with tag 400 and metric type 1, and no LSA for 203.0.113.0/24.",
      "After the totally stubby change r3 had only intra-area routes and a single O IA default route, and h1 could still ping h2.",
      "You captured an adjacency stuck in ExStart/Exchange caused by an MTU mismatch and its recovery to Full."
    ],
    "deliverable": "An 'OSPF multi-area design' write-up: the area diagram with ABRs and ASBR marked, an LSA-type table (type, who originates it, how far it floods) filled in from your own database output, before/after routing tables for summarization and the stub change, the commented route-map with an explanation of why 203.0.113.0/24 was not redistributed, and an incident note for the MTU fault (symptom, commands, root cause, fix).",
    "resume": "Built a three-area OSPF network with FRRouting and containerlab, implemented ABR summarization, a totally stubby area and filtered, tagged redistribution with prefix-lists and route-maps, and diagnosed an MTU mismatch that stalled adjacencies in ExStart.",
    "interview": [
      "Why use multiple OSPF areas? — To limit the size of each link-state database and the scope of SPF recalculations; topology changes inside one area are hidden from others, and ABRs can summarize prefixes at the boundary.",
      "What is the difference between a stub, totally stubby and NSSA area? — A stub area blocks type 5 external LSAs and gets a default route; totally stubby also blocks type 3 summaries; an NSSA blocks type 5 but lets a local ASBR inject externals as type 7, which the ABR converts to type 5.",
      "What is the difference between E1 and E2 external routes? — E2 (the default) keeps the metric set at redistribution no matter how far away the ASBR is; E1 adds the internal path cost, so routers prefer the closer exit when several ASBRs advertise the same prefix.",
      "An OSPF neighbor is stuck in ExStart. What do you check? — MTU on both ends first, then duplicate router IDs and unicast reachability between the neighbors."
    ],
    "cleanup": [
      "sudo containerlab destroy -t ~/clab/ospf/ospf.clab.yml (if you did not in the last step).",
      "Keep the images if you will do lab-frr-bgp, lab-vrrp-failover or lab-ipv6-dual-stack; otherwise sudo docker image prune -a.",
      "Or revert ubuntu-srv01 to the 'pre-clab' snapshot."
    ],
    "links": [
      {
        "label": "FRRouting documentation: OSPFv2",
        "url": "https://docs.frrouting.org/en/latest/ospfd.html"
      },
      {
        "label": "containerlab: quick start",
        "url": "https://containerlab.dev/quickstart/"
      },
      {
        "label": "RFC 2328: OSPF Version 2",
        "url": "https://www.rfc-editor.org/rfc/rfc2328"
      },
      {
        "label": "RFC 3101: The OSPF Not-So-Stubby Area (NSSA) Option",
        "url": "https://www.rfc-editor.org/rfc/rfc3101"
      }
    ]
  },
  {
    "id": "lab-frr-bgp",
    "title": "eBGP and iBGP between two autonomous systems with FRRouting",
    "track": "Networking",
    "level": "Advanced",
    "minutes": 210,
    "cost": "Free (containerlab and FRRouting containers on your own VM)",
    "summary": "Connect a dual-homed enterprise (AS 65001, two edge routers running iBGP over an OSPF underlay) to a provider (AS 65002) with eBGP, see FRR refuse to exchange routes until a policy exists, write prefix-list and route-map filters that drop a leaked prefix, steer traffic both ways with local preference and AS-path prepending, then test failover and fix a classic iBGP next-hop fault.",
    "realWorld": "BGP connects every network on the internet and increasingly runs inside data centers too. Enterprise network engineers multi-home to two providers and must control which link carries traffic in each direction; route leaks caused by missing filters have taken large parts of the internet offline. Knowing how to read 'show bgp' output and why a path was or was not chosen is core CCNP and on-call knowledge.",
    "youWillNeed": [
      "Your Ubuntu VM with Docker, containerlab and the FRR and network-multitool images from lab-frr-ospf-multiarea",
      "About 3 GB free RAM"
    ],
    "requires": [
      "lab-frr-ospf-multiarea"
    ],
    "safety": "Use private AS numbers (64512 to 65534) and private or documentation prefixes only, and keep everything inside containerlab. Never configure BGP toward a real provider or internet exchange without an agreement and change approval: a mistaken announcement can hijack someone else's traffic.",
    "steps": [
      {
        "title": "Plan the two autonomous systems",
        "body": "AS 65001 (a1 and a2) is your company; AS 65002 (b1) is the provider, connected to both of your edge routers. a1 and a2 run OSPF only to reach each other's loopbacks, and the iBGP session runs between those loopbacks so it survives the loss of any single link. ha sits on your LAN behind a2; hb sits behind b1. b1 also 'accidentally' announces 192.168.99.0/24, a private prefix you must refuse.",
        "cmd": "# link              subnet            addresses\n# a1 eth1 - a2 eth1 10.0.12.0/30      a1 .1, a2 .2   (OSPF area 0)\n# a1 eth2 - b1 eth1 172.31.13.0/30    a1 .1, b1 .2   (eBGP)\n# a2 eth2 - b1 eth2 172.31.23.0/30    a2 .1, b1 .2   (eBGP)\n# a2 eth3 - ha      10.1.0.0/24       a2 .1, ha .10\n# b1 eth3 - hb      10.2.0.0/24       b1 .1, hb .10\n# loopbacks: a1 10.255.0.1, a2 10.255.0.2, b1 10.255.0.3\n# b1 also owns 10.2.100.0/24 and 192.168.99.0/24",
        "check": "Your diagram shows both AS boundaries, the iBGP session between loopbacks and the two eBGP sessions."
      },
      {
        "title": "Write the daemons file and the topology",
        "body": "Same pattern as the OSPF lab, with bgpd switched on.",
        "cmd": "mkdir -p ~/clab/bgp && cd ~/clab/bgp\ncat > daemons <<'EOF'\nzebra=yes\nbgpd=yes\nospfd=yes\nvtysh_enable=yes\nzebra_options=\"  -A 127.0.0.1 -s 90000000\"\nbgpd_options=\"   -A 127.0.0.1\"\nospfd_options=\"  -A 127.0.0.1\"\nstaticd_options=\"-A 127.0.0.1\"\nEOF\ncat > bgp.clab.yml <<'EOF'\nname: bgp\ntopology:\n  kinds:\n    linux:\n      image: quay.io/frrouting/frr:10.2.1\n  nodes:\n    a1:\n      kind: linux\n      binds:\n        - daemons:/etc/frr/daemons\n        - a1.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n    a2:\n      kind: linux\n      binds:\n        - daemons:/etc/frr/daemons\n        - a2.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n    b1:\n      kind: linux\n      binds:\n        - daemons:/etc/frr/daemons\n        - b1.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n    ha:\n      kind: linux\n      image: ghcr.io/hellt/network-multitool\n      exec:\n        - ip addr add 10.1.0.10/24 dev eth1\n        - ip route replace default via 10.1.0.1\n    hb:\n      kind: linux\n      image: ghcr.io/hellt/network-multitool\n      exec:\n        - ip addr add 10.2.0.10/24 dev eth1\n        - ip route replace default via 10.2.0.1\n  links:\n    - endpoints: [\"a1:eth1\", \"a2:eth1\"]\n    - endpoints: [\"a1:eth2\", \"b1:eth1\"]\n    - endpoints: [\"a2:eth2\", \"b1:eth2\"]\n    - endpoints: [\"a2:eth3\", \"ha:eth1\"]\n    - endpoints: [\"b1:eth3\", \"hb:eth1\"]\nEOF",
        "check": "daemons and bgp.clab.yml exist in ~/clab/bgp."
      },
      {
        "title": "Configure AS 65001: OSPF underlay plus iBGP and eBGP",
        "body": "update-source lo makes the iBGP session use loopback addresses. next-hop-self is essential: without it a2 would receive b1's routes with a next hop of 172.31.13.2, a subnet a2 has no route to. soft-reconfiguration inbound keeps an unfiltered copy of what each provider sends so you can compare it with what your policy accepts.",
        "cmd": "cat > a1.conf <<'EOF'\nfrr defaults traditional\nhostname a1\ninterface lo\n ip address 10.255.0.1/32\n ip ospf area 0\ninterface eth1\n ip address 10.0.12.1/30\n ip ospf area 0\n ip ospf network point-to-point\ninterface eth2\n ip address 172.31.13.1/30\nrouter ospf\n ospf router-id 10.255.0.1\nrouter bgp 65001\n bgp router-id 10.255.0.1\n neighbor 10.255.0.2 remote-as 65001\n neighbor 10.255.0.2 update-source lo\n neighbor 172.31.13.2 remote-as 65002\n neighbor 172.31.13.2 description b1-provider\n address-family ipv4 unicast\n  neighbor 10.255.0.2 next-hop-self\n  neighbor 172.31.13.2 soft-reconfiguration inbound\n exit-address-family\nEOF\ncat > a2.conf <<'EOF'\nfrr defaults traditional\nhostname a2\ninterface lo\n ip address 10.255.0.2/32\n ip ospf area 0\ninterface eth1\n ip address 10.0.12.2/30\n ip ospf area 0\n ip ospf network point-to-point\ninterface eth2\n ip address 172.31.23.1/30\ninterface eth3\n ip address 10.1.0.1/24\nrouter ospf\n ospf router-id 10.255.0.2\nrouter bgp 65001\n bgp router-id 10.255.0.2\n neighbor 10.255.0.1 remote-as 65001\n neighbor 10.255.0.1 update-source lo\n neighbor 172.31.23.2 remote-as 65002\n neighbor 172.31.23.2 description b1-provider\n address-family ipv4 unicast\n  network 10.1.0.0/24\n  neighbor 10.255.0.1 next-hop-self\n  neighbor 172.31.23.2 soft-reconfiguration inbound\n exit-address-family\nEOF",
        "check": "Both files have one iBGP neighbor on a loopback and one eBGP neighbor on a /30."
      },
      {
        "title": "Configure the provider (AS 65002)",
        "body": "b1 announces its two customer-facing prefixes and, by mistake, 192.168.99.0/24. A 'network' statement only announces a prefix that already exists in the routing table, which is why the prefixes are configured as addresses on b1's interfaces.",
        "cmd": "cat > b1.conf <<'EOF'\nfrr defaults traditional\nhostname b1\ninterface lo\n ip address 10.255.0.3/32\n ip address 10.2.100.1/24\n ip address 192.168.99.1/24\ninterface eth1\n ip address 172.31.13.2/30\ninterface eth2\n ip address 172.31.23.2/30\ninterface eth3\n ip address 10.2.0.1/24\nrouter bgp 65002\n bgp router-id 10.255.0.3\n neighbor 172.31.13.1 remote-as 65001\n neighbor 172.31.23.1 remote-as 65001\n address-family ipv4 unicast\n  network 10.2.0.0/24\n  network 10.2.100.0/24\n  network 192.168.99.0/24\n exit-address-family\nEOF\nsudo containerlab deploy -t bgp.clab.yml",
        "check": "containerlab prints a table with five running containers."
      },
      {
        "title": "See the sessions come up and FRR refuse to exchange routes",
        "body": "FRR follows RFC 8212: an eBGP session with no inbound or outbound policy is established but exchanges nothing. The State/PfxRcd column shows '(Policy)'. The iBGP session is not affected. This default exists because unfiltered eBGP sessions cause route leaks.",
        "cmd": "sleep 30\nsudo docker exec clab-bgp-a1 vtysh -c \"show ip ospf neighbor\"\nsudo docker exec clab-bgp-a1 vtysh -c \"show bgp summary\"\nsudo docker exec clab-bgp-b1 vtysh -c \"show bgp summary\"",
        "check": "a1 has OSPF neighbor 10.255.0.2 in Full. In 'show bgp summary' the 10.255.0.2 session shows a prefix count, while 172.31.13.2 shows '(Policy)' in both the PfxRcd and PfxSnt columns."
      },
      {
        "title": "Write the inbound and outbound policy on both edge routers",
        "body": "Inbound, accept only the provider's customer space (10.2.0.0/16, nothing longer than /24). Outbound, announce only your own space, which prevents you from ever becoming a transit path between providers. Apply the same policy on a1 and a2, and give b1 a permissive policy (a careless provider) so it sends its leak.",
        "cmd": "for r in a1 a2; do\n  if [ $r = a1 ]; then P=172.31.13.2; else P=172.31.23.2; fi\n  sudo docker exec clab-bgp-$r vtysh -c \"configure terminal\" \\\n    -c \"ip prefix-list FROM-AS65002 seq 10 permit 10.2.0.0/16 le 24\" \\\n    -c \"ip prefix-list OUR-PREFIXES seq 10 permit 10.1.0.0/16 le 24\" \\\n    -c \"route-map AS65002-IN permit 10\" -c \"match ip address prefix-list FROM-AS65002\" -c \"exit\" \\\n    -c \"route-map AS65002-OUT permit 10\" -c \"match ip address prefix-list OUR-PREFIXES\" -c \"exit\" \\\n    -c \"router bgp 65001\" -c \"address-family ipv4 unicast\" \\\n    -c \"neighbor $P route-map AS65002-IN in\" -c \"neighbor $P route-map AS65002-OUT out\" \\\n    -c \"neighbor $P maximum-prefix 100\"\ndone\nsudo docker exec clab-bgp-b1 vtysh -c \"configure terminal\" -c \"route-map ANY permit 10\" -c \"exit\" \\\n  -c \"router bgp 65002\" -c \"address-family ipv4 unicast\" \\\n  -c \"neighbor 172.31.13.1 route-map ANY in\" -c \"neighbor 172.31.13.1 route-map ANY out\" \\\n  -c \"neighbor 172.31.23.1 route-map ANY in\" -c \"neighbor 172.31.23.1 route-map ANY out\"\nsleep 10\nsudo docker exec clab-bgp-a1 vtysh -c \"show bgp ipv4 unicast neighbors 172.31.13.2 received-routes\"\nsudo docker exec clab-bgp-a1 vtysh -c \"show bgp ipv4 unicast neighbors 172.31.13.2 routes\"",
        "check": "received-routes (before policy) lists three prefixes including 192.168.99.0/24; routes (after policy) lists only 10.2.0.0/24 and 10.2.100.0/24. 'show bgp summary' no longer shows (Policy)."
      },
      {
        "title": "Test end to end and read the best-path decision",
        "body": "a2 knows 10.2.0.0/24 two ways: directly from b1 (eBGP) and from a1 (iBGP). With equal local preference and AS-path length, eBGP beats iBGP. The detailed 'show bgp' output marks the best path and says why.",
        "cmd": "sudo docker exec clab-bgp-ha ping -c 3 10.2.0.10\nsudo docker exec clab-bgp-ha traceroute -n 10.2.0.10\nsudo docker exec clab-bgp-a2 vtysh -c \"show bgp ipv4 unicast 10.2.0.0/24\"\nsudo docker exec clab-bgp-b1 vtysh -c \"show bgp ipv4 unicast 10.1.0.0/24\"",
        "check": "The ping succeeds and the traceroute goes 10.1.0.1, 172.31.23.2, 10.2.0.10 (the direct a2-b1 link). a2 shows two paths with the eBGP path from 172.31.23.2 marked best."
      },
      {
        "title": "Engineer traffic: make the a1 link primary in both directions",
        "body": "Outbound traffic is controlled by what you prefer: set local preference 200 on routes learned at a1, and iBGP carries that preference to a2, so both routers exit via a1. Inbound traffic is controlled by what you advertise: prepend your AS twice on a2's announcements so b1 sees a longer path there. Apply with a soft clear so sessions do not reset.",
        "cmd": "sudo docker exec clab-bgp-a1 vtysh -c \"configure terminal\" -c \"route-map AS65002-IN permit 10\" -c \"set local-preference 200\" -c \"end\" \\\n  -c \"clear bgp ipv4 unicast 172.31.13.2 soft in\"\nsudo docker exec clab-bgp-a2 vtysh -c \"configure terminal\" -c \"route-map AS65002-OUT permit 10\" -c \"set as-path prepend 65001 65001\" -c \"end\" \\\n  -c \"clear bgp ipv4 unicast 172.31.23.2 soft out\"\nsleep 5\nsudo docker exec clab-bgp-a2 vtysh -c \"show bgp ipv4 unicast 10.2.0.0/24\"\nsudo docker exec clab-bgp-b1 vtysh -c \"show bgp ipv4 unicast 10.1.0.0/24\"\nsudo docker exec clab-bgp-ha traceroute -n 10.2.0.10",
        "check": "a2's best path for 10.2.0.0/24 is now via 10.255.0.1 with 'localpref 200'; b1 shows the path via 172.31.23.1 with AS path '65001 65001 65001' and prefers 172.31.13.1. The traceroute goes 10.1.0.1, 10.0.12.1, 172.31.13.2, 10.2.0.10."
      },
      {
        "title": "Fail the primary link and measure convergence",
        "body": "Start a continuous ping from ha, then take a1's provider link down. FRR tears down a directly connected eBGP session as soon as the interface goes down, withdraws the routes, and a2 falls back to its own eBGP path. If the link had stayed up but the far end had died, you would wait for the hold timer (180 seconds by default), which is why production networks add BFD.",
        "cmd": "sudo docker exec clab-bgp-ha sh -c \"ping -c 40 -i 0.5 10.2.0.10 > /tmp/ping.txt\" &\nsleep 5; sudo docker exec clab-bgp-a1 ip link set eth2 down\nsleep 25\nsudo docker exec clab-bgp-a2 vtysh -c \"show bgp ipv4 unicast 10.2.0.0/24\" | head -8\nwait; sudo docker exec clab-bgp-ha tail -2 /tmp/ping.txt\nsudo docker exec clab-bgp-a1 ip link set eth2 up",
        "check": "During the outage a2's only path is via 172.31.23.2. The ping summary shows a small loss (a few packets) rather than a long outage; after the link returns, traffic moves back to a1 within about a minute."
      },
      {
        "title": "Fault: remove next-hop-self and read the symptom",
        "body": "Remove next-hop-self on a1 and soft-reset the iBGP session. a2 now receives the provider routes with the original next hop 172.31.13.2, which it cannot resolve because that subnet is not in OSPF. FRR marks the path 'inaccessible', so the high local preference no longer helps and a2 silently falls back to its own link.",
        "cmd": "sudo docker exec clab-bgp-a1 vtysh -c \"configure terminal\" -c \"router bgp 65001\" -c \"address-family ipv4 unicast\" \\\n  -c \"no neighbor 10.255.0.2 next-hop-self\" -c \"end\" -c \"clear bgp ipv4 unicast 10.255.0.2 soft out\"\nsleep 5\nsudo docker exec clab-bgp-a2 vtysh -c \"show bgp ipv4 unicast 10.2.0.0/24\"\nsudo docker exec clab-bgp-a1 vtysh -c \"configure terminal\" -c \"router bgp 65001\" -c \"address-family ipv4 unicast\" \\\n  -c \"neighbor 10.255.0.2 next-hop-self\" -c \"end\" -c \"clear bgp ipv4 unicast 10.255.0.2 soft out\"",
        "check": "While the fault is present, a2 lists the path from 10.255.0.1 with next hop 172.31.13.2 and the word 'inaccessible', and the best path is via 172.31.23.2. After the fix, the localpref 200 path via 10.255.0.1 is best again."
      },
      {
        "title": "Save the configs and destroy the lab",
        "body": "Keep the running configs as evidence and as a starting point for experiments (communities, MED, BFD).",
        "cmd": "for r in a1 a2 b1; do sudo docker exec clab-bgp-$r vtysh -c \"show running-config\" > $r-final.txt; done\nsudo containerlab destroy -t bgp.clab.yml",
        "check": "Three *-final.txt files exist and 'sudo docker ps' shows no clab-bgp containers."
      }
    ],
    "verify": [
      "Before any policy, 'show bgp summary' showed (Policy) on the eBGP sessions and a prefix count on the iBGP session.",
      "a1's received-routes from b1 listed 192.168.99.0/24 but its accepted routes did not.",
      "After traffic engineering, ha's traceroute to hb went through a1, and b1 saw AS path 65001 65001 65001 via a2.",
      "You captured the 'inaccessible' next hop on a2 when next-hop-self was removed, and the recovery."
    ],
    "deliverable": "A 'Dual-homed BGP' design note: the AS diagram, the final commented configs for a1, a2 and b1, a table of the BGP best-path steps you observed (local preference, AS-path length, eBGP over iBGP) with the output that proved each, the failover ping result, and an incident note for the next-hop-self fault.",
    "resume": "Built a dual-homed eBGP/iBGP design with FRRouting (private ASNs, loopback iBGP over an OSPF underlay), implemented prefix-list and route-map filters that blocked a route leak, engineered inbound and outbound path selection with local preference and AS-path prepending, and tested link failover.",
    "interview": [
      "Why is next-hop-self needed on iBGP sessions from an edge router? — eBGP-learned routes keep the external peer's address as next hop when passed to iBGP peers; if the IGP does not carry that subnet, the route is unusable, so the edge router rewrites the next hop to its own loopback.",
      "How do you influence outbound versus inbound traffic in BGP? — Outbound: local preference (or weight on one router) on routes you receive. Inbound: change what you advertise, such as AS-path prepending, MED to the same neighbor AS, or provider communities.",
      "What protects you against a peer leaking routes to you, and you leaking to them? — Inbound and outbound prefix-list or route-map filters, maximum-prefix limits, RPKI origin validation, and RFC 8212 default-deny behavior on eBGP sessions.",
      "Why run iBGP between loopbacks? — The loopback stays up as long as any path exists, so the session survives a single link failure; the IGP provides the reachability to the loopbacks."
    ],
    "cleanup": [
      "sudo containerlab destroy -t ~/clab/bgp/bgp.clab.yml if it is still running.",
      "Keep ~/clab/bgp for reference, or delete it."
    ],
    "links": [
      {
        "label": "FRRouting documentation: BGP",
        "url": "https://docs.frrouting.org/en/latest/bgp.html"
      },
      {
        "label": "RFC 4271: A Border Gateway Protocol 4 (BGP-4)",
        "url": "https://www.rfc-editor.org/rfc/rfc4271"
      },
      {
        "label": "RFC 8212: Default External BGP Route Propagation Behavior without Policies",
        "url": "https://www.rfc-editor.org/rfc/rfc8212"
      },
      {
        "label": "MANRS: Mutually Agreed Norms for Routing Security",
        "url": "https://www.manrs.org/"
      }
    ]
  },
  {
    "id": "lab-vrrp-failover",
    "title": "First-hop redundancy with VRRP (keepalived) and failover testing",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free (keepalived, Alpine Linux and containerlab)",
    "summary": "Give a LAN a virtual default gateway shared by two routers using VRRPv3 with keepalived, watch the advertisements and gratuitous ARPs on the wire, then fail the master three different ways (uplink loss tracked by a health script, LAN link loss, a frozen router) and measure how many packets each failure costs.",
    "realWorld": "Every host has one default gateway, so a single router is a single point of failure for the whole subnet. VRRP (and Cisco's HSRP) lets two gateways share a virtual IP. Network engineers configure it on every core and distribution pair, and keepalived does the same job for Linux load balancers, firewalls and HAProxy pairs. Knowing the failover timers and why object tracking matters is standard interview and on-call material.",
    "youWillNeed": [
      "Your Ubuntu VM with Docker and containerlab from lab-frr-ospf-multiarea",
      "Internet access to build a small Alpine image with keepalived (about 15 MB)"
    ],
    "requires": [
      "lab-frr-ospf-multiarea"
    ],
    "safety": "Run VRRP only inside the lab. On a real LAN a second device claiming an existing virtual router ID or gateway address can take over the gateway and black-hole traffic for everyone on the subnet.",
    "steps": [
      {
        "title": "Understand the design",
        "body": "gw1 and gw2 sit on the LAN 192.168.50.0/24 with real addresses .2 and .3 and share the virtual IP 192.168.50.1, which the client uses as its gateway. Each gateway has its own uplink to 'core', whose loopback 198.51.100.1 stands in for the internet, and NATs LAN traffic out of its uplink, like a small office with two internet routers. A container named sw acts as the LAN switch using a Linux bridge.",
        "cmd": "# client 192.168.50.100 --- sw (bridge) --- gw1 eth1 192.168.50.2  (priority 120)\n#                                      \\--- gw2 eth1 192.168.50.3  (priority 100)\n# VIP 192.168.50.1, VRID 50, VRRPv3, advert every 1 s\n# gw1 eth2 10.0.1.1/30 --- core eth1 10.0.1.2   core lo 198.51.100.1\n# gw2 eth2 10.0.2.1/30 --- core eth2 10.0.2.2",
        "check": "You can explain which router should be master and why."
      },
      {
        "title": "Build a keepalived image",
        "body": "A two-line Dockerfile adds keepalived, iptables and tcpdump to Alpine. The start script waits for containerlab to plug in the interfaces, addresses them, enables forwarding and NAT, then runs keepalived in the foreground so its log goes to 'docker logs'.",
        "cmd": "mkdir -p ~/clab/fhrp && cd ~/clab/fhrp\ncat > Dockerfile <<'EOF'\nFROM alpine:3.20\nRUN apk add --no-cache keepalived iproute2 iptables tcpdump\nEOF\nsudo docker build -t lab/keepalived:1 .\nfor n in 1 2; do\ncat > start-gw$n.sh <<EOF\n#!/bin/sh\nuntil ip link show eth2 >/dev/null 2>&1; do sleep 1; done\nsysctl -w net.ipv4.ip_forward=1\nip addr add 192.168.50.$((n+1))/24 dev eth1\nip addr add 10.0.$n.1/30 dev eth2\nip route replace default via 10.0.$n.2\niptables -t nat -A POSTROUTING -o eth2 -j MASQUERADE\nexec keepalived --dont-fork --log-console --log-detail -f /etc/keepalived/keepalived.conf\nEOF\ndone\ncat start-gw2.sh",
        "check": "The build ends with 'naming to docker.io/lab/keepalived:1' and start-gw2.sh uses 192.168.50.3, 10.0.2.1 and 10.0.2.2."
      },
      {
        "title": "Write the keepalived configs",
        "body": "Both routers start as BACKUP and the higher priority wins the election. The vrrp_script pings the router's own uplink every 2 seconds; after 2 failures it subtracts 30 from the priority, so gw1 (120) drops to 90 and loses to gw2 (100). This is object tracking: without it gw1 would stay master with a dead uplink.",
        "cmd": "for n in 1 2; do\n  if [ $n = 1 ]; then PRIO=120; else PRIO=100; fi\ncat > gw$n.conf <<EOF\nglobal_defs {\n  router_id gw$n\n  vrrp_version 3\n  script_user root\n  enable_script_security\n}\nvrrp_script chk_uplink {\n  script \"/bin/ping -c 1 -W 1 10.0.$n.2\"\n  interval 2\n  fall 2\n  rise 2\n  weight -30\n}\nvrrp_instance LAN {\n  state BACKUP\n  interface eth1\n  virtual_router_id 50\n  priority $PRIO\n  advert_int 1\n  virtual_ipaddress {\n    192.168.50.1/24\n  }\n  track_script {\n    chk_uplink\n  }\n}\nEOF\ndone\ngrep -E \"priority|script \\\"\" gw1.conf gw2.conf",
        "check": "gw1.conf has priority 120 and pings 10.0.1.2; gw2.conf has priority 100 and pings 10.0.2.2."
      },
      {
        "title": "Write the topology and deploy",
        "body": "The switch container bridges its three ports. The client uses the virtual IP as its default gateway, never a real router address.",
        "cmd": "cat > fhrp.clab.yml <<'EOF'\nname: fhrp\ntopology:\n  nodes:\n    gw1:\n      kind: linux\n      image: lab/keepalived:1\n      binds:\n        - gw1.conf:/etc/keepalived/keepalived.conf\n        - start-gw1.sh:/start.sh\n      cmd: sh /start.sh\n    gw2:\n      kind: linux\n      image: lab/keepalived:1\n      binds:\n        - gw2.conf:/etc/keepalived/keepalived.conf\n        - start-gw2.sh:/start.sh\n      cmd: sh /start.sh\n    sw:\n      kind: linux\n      image: ghcr.io/hellt/network-multitool\n      exec:\n        - ip link add br0 type bridge\n        - ip link set br0 up\n        - ip link set eth1 master br0\n        - ip link set eth2 master br0\n        - ip link set eth3 master br0\n    client:\n      kind: linux\n      image: ghcr.io/hellt/network-multitool\n      exec:\n        - ip addr add 192.168.50.100/24 dev eth1\n        - ip route replace default via 192.168.50.1\n    core:\n      kind: linux\n      image: ghcr.io/hellt/network-multitool\n      exec:\n        - ip addr add 10.0.1.2/30 dev eth1\n        - ip addr add 10.0.2.2/30 dev eth2\n        - ip addr add 198.51.100.1/32 dev lo\n  links:\n    - endpoints: [\"gw1:eth1\", \"sw:eth1\"]\n    - endpoints: [\"gw2:eth1\", \"sw:eth2\"]\n    - endpoints: [\"client:eth1\", \"sw:eth3\"]\n    - endpoints: [\"gw1:eth2\", \"core:eth1\"]\n    - endpoints: [\"gw2:eth2\", \"core:eth2\"]\nEOF\nsudo containerlab deploy -t fhrp.clab.yml\nsleep 10\nsudo docker logs clab-fhrp-gw1 2>&1 | grep -i state\nsudo docker logs clab-fhrp-gw2 2>&1 | grep -i state",
        "check": "gw1's log ends with '(LAN) Entering MASTER STATE' and gw2's with '(LAN) Entering BACKUP STATE'."
      },
      {
        "title": "Verify the virtual IP and reachability",
        "body": "Only the master holds the VIP as a secondary address. The client's ARP entry for 192.168.50.1 is gw1's real MAC, because keepalived by default answers with the master's interface MAC and sends gratuitous ARPs on failover (rather than using the VRRP virtual MAC 00:00:5e:00:01:32).",
        "cmd": "sudo docker exec clab-fhrp-gw1 ip -4 addr show eth1\nsudo docker exec clab-fhrp-gw2 ip -4 addr show eth1\nsudo docker exec clab-fhrp-client ping -c 3 198.51.100.1\nsudo docker exec clab-fhrp-client ip neigh show 192.168.50.1\nsudo docker exec clab-fhrp-gw1 cat /sys/class/net/eth1/address",
        "check": "Only gw1 lists 192.168.50.1; the ping succeeds; the client's neighbor entry for 192.168.50.1 has the same MAC as gw1's eth1."
      },
      {
        "title": "Watch VRRP on the wire",
        "body": "VRRP adverts are IP protocol 112 sent to 224.0.0.18 once per advert interval, only by the master. Capture a few on the client, which sees them because they are multicast on the LAN.",
        "cmd": "sudo docker exec clab-fhrp-client tcpdump -ni eth1 -c 5 vrrp",
        "check": "Five lines like '192.168.50.2 > 224.0.0.18: VRRPv3, Advertisement, vrid 50, prio 120, intvl 100cs', all from 192.168.50.2 (gw1)."
      },
      {
        "title": "Failure 1: the master loses its uplink",
        "body": "The LAN side of gw1 is still fine, so without tracking gw1 would keep the VIP and black-hole traffic. Start a ping at 5 packets per second in the background, cut gw1's uplink, and read the logs and the loss. Busybox and iputils ping both accept -i 0.2 as root; if yours rejects it, drop -i and count seconds instead.",
        "cmd": "sudo docker exec clab-fhrp-client sh -c \"ping -c 100 -i 0.2 198.51.100.1 > /tmp/f1.txt\" &\nsleep 3; sudo docker exec clab-fhrp-gw1 ip link set eth2 down\nwait; sudo docker exec clab-fhrp-client tail -2 /tmp/f1.txt\nsudo docker logs clab-fhrp-gw1 2>&1 | tail -5\nsudo docker exec clab-fhrp-gw2 ip -4 addr show eth1 | grep 192.168.50.1",
        "check": "gw1's log shows 'Script(chk_uplink) now returning 1' (or 'failed'), then 'Entering BACKUP STATE'; gw2 now holds 192.168.50.1; the ping lost roughly 15 to 30 packets (3 to 6 seconds: two failed checks plus the takeover)."
      },
      {
        "title": "Restore the uplink and watch preemption",
        "body": "When the script succeeds twice, gw1's priority returns to 120 and, because preemption is on by default, it takes the VIP back. Preemption is convenient but causes a second short interruption; many teams add preempt_delay so a flapping router cannot bounce the gateway.",
        "cmd": "sudo docker exec clab-fhrp-gw1 ip link set eth2 up\nsleep 8\nsudo docker logs clab-fhrp-gw1 2>&1 | tail -3\nsudo docker exec clab-fhrp-client ip neigh show 192.168.50.1",
        "check": "gw1 logs 'Entering MASTER STATE' again and the client's ARP entry for 192.168.50.1 shows gw1's MAC again."
      },
      {
        "title": "Failure 2: freeze the master completely",
        "body": "docker pause freezes every process in gw1, like a hung router: its links stay up but it stops sending adverts. The backup takes over after the Master_Down_Interval, 3 x advert interval + skew time, where skew = (256 - priority) / 256 seconds, so about 3.6 seconds for gw2. Capture gratuitous ARPs on the client while it happens.",
        "cmd": "sudo docker exec clab-fhrp-client sh -c \"timeout 15 tcpdump -ni eth1 'vrrp or arp' > /tmp/f2cap.txt 2>&1\" &\nsudo docker exec clab-fhrp-client sh -c \"ping -c 60 -i 0.2 198.51.100.1 > /tmp/f2.txt\" &\nsleep 2; sudo docker pause clab-fhrp-gw1\nwait\nsudo docker exec clab-fhrp-client tail -2 /tmp/f2.txt\nsudo docker exec clab-fhrp-client grep -E \"prio 100|is-at\" /tmp/f2cap.txt | head -5\nsudo docker unpause clab-fhrp-gw1",
        "check": "The capture shows adverts switching from 192.168.50.2 (prio 120) to 192.168.50.3 (prio 100) and ARP replies '192.168.50.1 is-at <gw2 MAC>'. Loss is about 3 to 4 seconds of pings (15 to 20 packets). After unpause, gw1 preempts."
      },
      {
        "title": "Failure 3: the master's LAN link goes down",
        "body": "If the interface VRRP runs on fails, keepalived puts that instance into FAULT state immediately and stops advertising. Try it, record the result, and restore.",
        "cmd": "sudo docker exec clab-fhrp-gw1 ip link set eth1 down\nsleep 5\nsudo docker logs clab-fhrp-gw1 2>&1 | tail -3\nsudo docker exec clab-fhrp-client ping -c 3 198.51.100.1\nsudo docker exec clab-fhrp-gw1 ip link set eth1 up\nsleep 5; sudo docker logs clab-fhrp-gw1 2>&1 | tail -2",
        "check": "gw1 logs 'Entering FAULT STATE', gw2 becomes master and the ping works; after the link returns gw1 goes back to MASTER. Note: the VIP address is removed from gw1 while it is down; when eth1 returns, keepalived re-adds it."
      },
      {
        "title": "Summarize the timings and tear down",
        "body": "Put your three measured losses in a table next to the theoretical failover times, then destroy the lab.",
        "cmd": "sudo containerlab destroy -t fhrp.clab.yml",
        "check": "Your table has one row per failure type: detection mechanism, expected time, measured packet loss."
      }
    ],
    "verify": [
      "In steady state only gw1 held 192.168.50.1 and the client's ARP entry pointed to gw1's MAC.",
      "A tcpdump showed VRRPv3 adverts from the master every second with the configured priority.",
      "Losing gw1's uplink moved the VIP to gw2 because of the tracked script, and restoring it preempted back to gw1.",
      "You measured packet loss for uplink failure, a frozen router and a LAN link failure."
    ],
    "deliverable": "A 'Gateway redundancy test report': the diagram, both keepalived configs with comments, the failover-timing table (failure, detection, expected time, measured loss), the tcpdump excerpt showing adverts and gratuitous ARP during takeover, and a recommendation on preemption and tracking for a production pair.",
    "resume": "Implemented VRRPv3 gateway redundancy with keepalived including uplink tracking, then ran and documented failover tests (uplink loss, frozen node, LAN link loss) with measured packet loss and packet captures of the takeover.",
    "interview": [
      "How does a backup VRRP router decide the master has failed? — It stops receiving advertisements for the Master_Down_Interval, which is three advert intervals plus a skew time based on its priority, then becomes master and sends gratuitous ARPs for the virtual IP.",
      "Why do you need interface or object tracking with VRRP or HSRP? — VRRP only checks that the peer is alive on the LAN; if the master loses its uplink it would keep the virtual IP and drop traffic, so tracking lowers its priority to hand the role to a router with a working path.",
      "What are the main differences between VRRP, HSRP and GLBP? — VRRP is an open standard (RFC 5798) where the master can own the real address; HSRP is Cisco-proprietary with active/standby routers and different default timers and virtual MAC; GLBP (Cisco) also load-balances hosts across several gateways by answering ARP with different virtual MACs.",
      "What is the risk of preemption? — A router that flaps comes back, takes over, fails again, and causes repeated interruptions; a preempt delay gives it time to converge its routing before it takes the gateway role."
    ],
    "cleanup": [
      "sudo containerlab destroy -t ~/clab/fhrp/fhrp.clab.yml if still running.",
      "sudo docker rmi lab/keepalived:1 if you no longer need the image."
    ],
    "links": [
      {
        "label": "keepalived documentation: configuration synopsis",
        "url": "https://keepalived.readthedocs.io/en/latest/configuration_synopsis.html"
      },
      {
        "label": "RFC 5798: Virtual Router Redundancy Protocol (VRRP) Version 3",
        "url": "https://www.rfc-editor.org/rfc/rfc5798"
      },
      {
        "label": "containerlab: Linux kind and exec",
        "url": "https://containerlab.dev/manual/kinds/linux/"
      }
    ]
  },
  {
    "id": "lab-ipv6-dual-stack",
    "title": "Build and troubleshoot a dual-stack IPv6 network: SLAAC, DHCPv6 and OSPFv3",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 200,
    "cost": "Free (FRRouting, dnsmasq and Alpine Linux containers)",
    "summary": "Run IPv4 and IPv6 side by side: one LAN configured by SLAAC with RDNSS, another by stateful DHCPv6, routed with OSPFv2 and OSPFv3 to a dual-stack server. Read router advertisements, EUI-64 addresses and neighbor discovery, see which protocol applications prefer, then troubleshoot four classic IPv6 faults: missing RAs, blocked ICMPv6, a missing IPv6 route and duplicate address detection.",
    "realWorld": "Most mobile and many residential networks are now IPv6-first, cloud providers charge for public IPv4, and US federal policy requires agencies to move to IPv6-only. Network and systems engineers are expected to deploy dual stack and, more importantly, to troubleshoot it: the typical ticket is 'the site is slow for some users', caused by broken IPv6 that clients try first.",
    "youWillNeed": [
      "Your Ubuntu VM with Docker, containerlab and the FRR image from lab-frr-ospf-multiarea",
      "Internet access to build two small images (FRR plus dnsmasq, and an Alpine test host)"
    ],
    "requires": [
      "lab-frr-ospf-multiarea",
      "lab-subnetting"
    ],
    "safety": "Use only the documentation prefix 2001:db8::/32 inside containerlab. Do not run a router advertisement daemon or DHCPv6 server on a real LAN: a rogue RA can silently become every host's IPv6 default gateway.",
    "steps": [
      {
        "title": "Plan the addressing",
        "body": "Every segment gets a /64, the only prefix length SLAAC works with. LAN-A uses SLAAC (hosts build their own address from the prefix in the router advertisement). LAN-B uses stateful DHCPv6: the RA sets the Managed flag and hosts ask a DHCPv6 server for an address. IPv4 runs alongside on every link.",
        "cmd": "# segment            IPv6                  IPv4\n# LAN-A r1 eth1      2001:db8:a::/64       192.168.10.0/24   SLAAC + RDNSS\n# LAN-B r1 eth2      2001:db8:b::/64       192.168.20.0/24   DHCPv6 (M and O flags)\n# r1 eth3 - r2 eth1  2001:db8:12::/64      10.0.12.0/30      OSPFv3 + OSPFv2\n# r2 loopback        2001:db8:ffff::1/128  198.51.100.1/32   'server'",
        "check": "Your plan has an IPv6 and an IPv4 prefix for every segment and marks which LAN uses which method."
      },
      {
        "title": "Build the images",
        "body": "r1 and r2 use the FRR image plus dnsmasq (DNS and DHCPv6) and Python (a tiny web server). The hosts get dhcpcd (a DHCPv6 client), ndisc6 (rdisc6 shows raw router advertisements), dig, curl and tracepath.",
        "cmd": "mkdir -p ~/clab/v6 && cd ~/clab/v6\ncat > Dockerfile.frr <<'EOF'\nFROM quay.io/frrouting/frr:10.2.1\nRUN apk add --no-cache dnsmasq python3 iptables ip6tables\nEOF\ncat > Dockerfile.host <<'EOF'\nFROM alpine:3.20\nRUN apk add --no-cache dhcpcd ndisc6 bind-tools curl iproute2 iputils tcpdump\nEOF\nsudo docker build -t lab/frr-dns:1 -f Dockerfile.frr .\nsudo docker build -t lab/v6host:1 -f Dockerfile.host .",
        "check": "Both builds finish and 'sudo docker images | grep lab/' lists lab/frr-dns and lab/v6host."
      },
      {
        "title": "Configure r1: router advertisements for two different LANs",
        "body": "FRR suppresses RAs by default; 'no ipv6 nd suppress-ra' turns them on. On LAN-A the prefix is advertised with the autonomous flag (SLAAC) and RDNSS tells hosts the DNS server. On LAN-B 'no-autoconfig' clears the autonomous flag and the managed and other-config flags send hosts to DHCPv6. The 10-second RA interval makes the lab quicker; the default is several minutes.",
        "cmd": "cat > daemons <<'EOF'\nzebra=yes\nospfd=yes\nospf6d=yes\nvtysh_enable=yes\nzebra_options=\"  -A 127.0.0.1 -s 90000000\"\nospfd_options=\"  -A 127.0.0.1\"\nospf6d_options=\" -A ::1\"\nstaticd_options=\"-A 127.0.0.1\"\nEOF\ncat > r1.conf <<'EOF'\nfrr defaults traditional\nhostname r1\nipv6 forwarding\ninterface eth1\n ip address 192.168.10.1/24\n ipv6 address 2001:db8:a::1/64\n no ipv6 nd suppress-ra\n ipv6 nd ra-interval 10\n ipv6 nd prefix 2001:db8:a::/64\n ipv6 nd rdnss 2001:db8:a::1\n ip ospf area 0\n ip ospf passive\n ipv6 ospf6 area 0\n ipv6 ospf6 passive\ninterface eth2\n ip address 192.168.20.1/24\n ipv6 address 2001:db8:b::1/64\n no ipv6 nd suppress-ra\n ipv6 nd ra-interval 10\n ipv6 nd prefix 2001:db8:b::/64 no-autoconfig\n ipv6 nd managed-config-flag\n ipv6 nd other-config-flag\n ip ospf area 0\n ip ospf passive\n ipv6 ospf6 area 0\n ipv6 ospf6 passive\ninterface eth3\n ip address 10.0.12.1/30\n ipv6 address 2001:db8:12::1/64\n ip ospf area 0\n ip ospf network point-to-point\n ipv6 ospf6 area 0\n ipv6 ospf6 network point-to-point\nrouter ospf\n ospf router-id 1.1.1.1\nrouter ospf6\n ospf6 router-id 1.1.1.1\nEOF",
        "check": "r1.conf has RA settings on eth1 and eth2 and both OSPF versions on all three interfaces."
      },
      {
        "title": "Configure r2, DNS and DHCPv6, and the topology",
        "body": "dnsmasq on r1 serves DNS for both LANs and stateful DHCPv6 on LAN-B only (it sends no RAs itself; FRR does). server.lab.internal has both an A and an AAAA record; v4only.lab.internal has only an A record. r2 runs a dual-stack web server on port 8080.",
        "cmd": "cat > r2.conf <<'EOF'\nfrr defaults traditional\nhostname r2\nipv6 forwarding\ninterface lo\n ip address 198.51.100.1/32\n ipv6 address 2001:db8:ffff::1/128\n ip ospf area 0\n ipv6 ospf6 area 0\ninterface eth1\n ip address 10.0.12.2/30\n ipv6 address 2001:db8:12::2/64\n ip ospf area 0\n ip ospf network point-to-point\n ipv6 ospf6 area 0\n ipv6 ospf6 network point-to-point\nrouter ospf\n ospf router-id 2.2.2.2\nrouter ospf6\n ospf6 router-id 2.2.2.2\nEOF\ncat > dnsmasq-r1.conf <<'EOF'\nbind-dynamic\nlisten-address=2001:db8:a::1,2001:db8:b::1,192.168.10.1,192.168.20.1\nno-resolv\nno-hosts\nhost-record=server.lab.internal,198.51.100.1,2001:db8:ffff::1\nhost-record=v4only.lab.internal,198.51.100.1\ndhcp-range=2001:db8:b::100,2001:db8:b::1ff,64,1h\ndhcp-option=option6:dns-server,[2001:db8:b::1]\ndhcp-option=option6:domain-search,lab.internal\nlog-dhcp\nlog-facility=/tmp/dnsmasq.log\nEOF\ncat > v6.clab.yml <<'EOF'\nname: v6\ntopology:\n  nodes:\n    r1:\n      kind: linux\n      image: lab/frr-dns:1\n      binds:\n        - daemons:/etc/frr/daemons\n        - r1.conf:/etc/frr/frr.conf\n        - dnsmasq-r1.conf:/etc/dnsmasq-lab.conf\n      exec:\n        - ip route del default\n        - 'sh -c \"ip -6 route del default || true\"'\n        - sysctl -w net.ipv6.conf.all.forwarding=1\n        - dnsmasq --conf-file=/etc/dnsmasq-lab.conf\n    r2:\n      kind: linux\n      image: lab/frr-dns:1\n      binds:\n        - daemons:/etc/frr/daemons\n        - r2.conf:/etc/frr/frr.conf\n      exec:\n        - ip route del default\n        - 'sh -c \"ip -6 route del default || true\"'\n        - sysctl -w net.ipv6.conf.all.forwarding=1\n        - 'sh -c \"mkdir -p /srv && echo dual-stack-ok > /srv/index.html && cd /srv && nohup python3 -m http.server 8080 --bind :: > /dev/null 2>&1 &\"'\n    hosta:\n      kind: linux\n      image: lab/v6host:1\n      cmd: tail -f /dev/null\n      exec:\n        - 'sh -c \"ip -6 route del default || true\"'\n        - sysctl -w net.ipv6.conf.eth1.disable_ipv6=0\n        - ip addr add 192.168.10.10/24 dev eth1\n        - ip route replace default via 192.168.10.1\n    hostb:\n      kind: linux\n      image: lab/v6host:1\n      cmd: tail -f /dev/null\n      exec:\n        - 'sh -c \"ip -6 route del default || true\"'\n        - sysctl -w net.ipv6.conf.eth1.disable_ipv6=0\n        - ip addr add 192.168.20.10/24 dev eth1\n        - ip route replace default via 192.168.20.1\n  links:\n    - endpoints: [\"r1:eth1\", \"hosta:eth1\"]\n    - endpoints: [\"r1:eth2\", \"hostb:eth1\"]\n    - endpoints: [\"r1:eth3\", \"r2:eth1\"]\nEOF\nsudo containerlab deploy -t v6.clab.yml",
        "check": "containerlab shows four running nodes. The exec lines remove Docker's management default routes so the routes you build are the only ones."
      },
      {
        "title": "Read a router advertisement and the SLAAC address",
        "body": "rdisc6 asks for an RA and prints every field. On hosta the kernel has already built a global address from the prefix plus an interface ID. With EUI-64 the ID is the MAC with ff:fe inserted in the middle and the seventh bit flipped; many operating systems use random or stable-privacy IDs instead. The default route points at r1's link-local address, not its global one.",
        "cmd": "sleep 20\nsudo docker exec clab-v6-hosta rdisc6 eth1\nsudo docker exec clab-v6-hosta ip -6 addr show dev eth1\nsudo docker exec clab-v6-hosta cat /sys/class/net/eth1/address\nsudo docker exec clab-v6-hosta ip -6 route",
        "check": "rdisc6 shows 'Stateful address conf. : No', 'Prefix : 2001:db8:a::/64' with 'Autonomous address conf.: Yes' and 'Recursive DNS server : 2001:db8:a::1'. hosta has a 2001:db8:a:: address whose last 64 bits contain ff:fe and its MAC, a fe80:: link-local address, and 'default via fe80::... dev eth1 proto ra'."
      },
      {
        "title": "Get an address by DHCPv6 on LAN-B",
        "body": "On hostb, rdisc6 shows the Managed and Other flags set and autonomous configuration off, so no SLAAC address appears. Start dhcpcd for IPv6 only and read the four-message exchange (Solicit, Advertise, Request, Reply) in the server log. DHCPv6 hands out a /128; the on-link /64 route comes from the RA, and the default route always comes from the RA because DHCPv6 has no gateway option.",
        "cmd": "sudo docker exec clab-v6-hostb rdisc6 eth1 | grep -iE \"stateful|autonomous\"\nsudo docker exec clab-v6-hostb dhcpcd -6 eth1\nsleep 10\nsudo docker exec clab-v6-hostb ip -6 addr show dev eth1 scope global\nsudo docker exec clab-v6-hostb ip -6 route\nsudo docker exec clab-v6-r1 grep -E \"DHCPSOLICIT|DHCPADVERTISE|DHCPREQUEST|DHCPREPLY\" /tmp/dnsmasq.log | tail -4",
        "check": "hostb shows 'Stateful address conf. : Yes' and 'Stateful other conf. : Yes', then an address between 2001:db8:b::100 and ::1ff with /128, a default route via fe80:: proto ra, and r1's log shows the Solicit, Advertise, Request and Reply."
      },
      {
        "title": "Check routing and neighbor discovery",
        "body": "OSPFv3 runs over link-local addresses and carries IPv6 prefixes separately from OSPFv2. Neighbor discovery replaces ARP: the neighbor table shows the MAC for each IPv6 neighbor and its state (REACHABLE, STALE, DELAY, PROBE, FAILED).",
        "cmd": "sudo docker exec clab-v6-r1 vtysh -c \"show ipv6 ospf6 neighbor\" -c \"show ipv6 route ospf6\" -c \"show ip route ospf\"\nsudo docker exec clab-v6-hosta ping -c 3 2001:db8:ffff::1\nsudo docker exec clab-v6-hosta ping -c 3 198.51.100.1\nsudo docker exec clab-v6-hosta tracepath -n 2001:db8:ffff::1\nsudo docker exec clab-v6-hosta ip -6 neigh",
        "check": "r1 has OSPFv3 neighbor 2.2.2.2 in Full and an ospf6 route to 2001:db8:ffff::1/128; both pings succeed; tracepath shows two hops; the neighbor table lists r1's fe80:: address with a MAC."
      },
      {
        "title": "See which protocol applications choose",
        "body": "When a name has both A and AAAA records, clients try IPv6 first (RFC 6724 address selection) and fall back to IPv4 using Happy Eyeballs (RFC 8305). curl -v prints the address it tries first.",
        "cmd": "sudo docker exec clab-v6-hosta sh -c \"echo nameserver 2001:db8:a::1 > /etc/resolv.conf\"\nsudo docker exec clab-v6-hosta dig +short server.lab.internal AAAA\nsudo docker exec clab-v6-hosta dig +short server.lab.internal A\nsudo docker exec clab-v6-hosta curl -sv http://server.lab.internal:8080/ 2>&1 | grep -E \"Trying|Connected|dual\"\nsudo docker exec clab-v6-hosta curl -sv http://v4only.lab.internal:8080/ 2>&1 | grep -E \"Trying|Connected\"",
        "check": "dig returns 2001:db8:ffff::1 and 198.51.100.1; curl to server.lab.internal connects to [2001:db8:ffff::1]:8080 and prints dual-stack-ok; v4only.lab.internal connects over 198.51.100.1."
      },
      {
        "title": "Fault 1: router advertisements stop",
        "body": "Suppress RAs on LAN-A and restart hosta's interface to simulate a host joining. It keeps only a link-local address and has no IPv6 default route, while IPv4 still works. Users report 'IPv6 doesn't work' but everything else is fine. Restore RAs afterwards.",
        "cmd": "sudo docker exec clab-v6-r1 vtysh -c \"configure terminal\" -c \"interface eth1\" -c \"ipv6 nd suppress-ra\"\nsudo docker exec clab-v6-hosta sh -c \"ip link set eth1 down; ip link set eth1 up; ip addr add 192.168.10.10/24 dev eth1 2>/dev/null; ip route replace default via 192.168.10.1\"\nsleep 15\nsudo docker exec clab-v6-hosta ip -6 addr show dev eth1 scope global\nsudo docker exec clab-v6-hosta ip -6 route show default\nsudo docker exec clab-v6-hosta rdisc6 -1 -w 2000 eth1\nsudo docker exec clab-v6-r1 vtysh -c \"configure terminal\" -c \"interface eth1\" -c \"no ipv6 nd suppress-ra\"",
        "check": "With RAs suppressed hosta has no global IPv6 address and no IPv6 default route, and rdisc6 reports 'No response'. About 10 seconds after the fix, both return."
      },
      {
        "title": "Fault 2: someone blocks ICMPv6",
        "body": "A firewall rule copied from IPv4 thinking ('drop ICMP') breaks IPv6 entirely, because neighbor discovery, router discovery and path-MTU discovery are all ICMPv6. Block it on r1, watch the neighbor entry fail, then replace the rule with a policy that allows the essential types (RFC 4890).",
        "cmd": "sudo docker exec clab-v6-r1 ip6tables -I INPUT -p ipv6-icmp -j DROP\nsudo docker exec clab-v6-hosta sh -c \"ip -6 neigh flush dev eth1; ping -c 3 -W 1 2001:db8:a::1; ip -6 neigh show 2001:db8:a::1\"\nsudo docker exec clab-v6-r1 ip6tables -D INPUT -p ipv6-icmp -j DROP\nfor t in 1 2 3 4 128 129 133 134 135 136; do sudo docker exec clab-v6-r1 ip6tables -A INPUT -p ipv6-icmp --icmpv6-type $t -j ACCEPT; done\nsudo docker exec clab-v6-r1 ip6tables -A INPUT -p ipv6-icmp -j DROP\nsudo docker exec clab-v6-hosta ping -c 3 2001:db8:a::1\nsudo docker exec clab-v6-r1 ip6tables -F INPUT",
        "check": "With the blanket drop, ping fails and the neighbor entry for 2001:db8:a::1 is FAILED or INCOMPLETE. With the explicit allow list (errors, echo, and NDP types 133 to 136) the ping works again."
      },
      {
        "title": "Fault 3: IPv6 route missing, IPv4 fine",
        "body": "Remove OSPFv3 from r2's loopback so the server's IPv6 address is no longer advertised. IPv4 keeps working, curl falls back to IPv4 after its Happy Eyeballs timer, and only a protocol-specific test shows the real fault. This is the classic 'slow for some users' ticket.",
        "cmd": "sudo docker exec clab-v6-r2 vtysh -c \"configure terminal\" -c \"interface lo\" -c \"no ipv6 ospf6 area 0\"\nsleep 5\nsudo docker exec clab-v6-hosta curl -s -o /dev/null -w \"%{remote_ip} %{time_total}s\\n\" http://server.lab.internal:8080/\nsudo docker exec clab-v6-hosta curl -6 -s -m 5 http://server.lab.internal:8080/ || echo IPV6-FAILED\nsudo docker exec clab-v6-hosta tracepath -n 2001:db8:ffff::1\nsudo docker exec clab-v6-r1 vtysh -c \"show ipv6 route 2001:db8:ffff::1\"\nsudo docker exec clab-v6-r2 vtysh -c \"configure terminal\" -c \"interface lo\" -c \"ipv6 ospf6 area 0\"",
        "check": "The first curl succeeds but reports 198.51.100.1 as the remote address; curl -6 prints IPV6-FAILED; tracepath stops at r1 (no route or unreachable); r1 has no route to 2001:db8:ffff::1. After the fix curl uses the IPv6 address again."
      },
      {
        "title": "Fault 4: duplicate address detection",
        "body": "Before using a new address, a host sends a neighbor solicitation for it (DAD). Manually assign r1's address to hosta and the kernel refuses to use it.",
        "cmd": "sudo docker exec clab-v6-hosta ip -6 addr add 2001:db8:a::1/64 dev eth1\nsleep 3\nsudo docker exec clab-v6-hosta ip -6 addr show dev eth1 | grep -A1 \"2001:db8:a::1/\"\nsudo docker exec clab-v6-hosta ip -6 addr del 2001:db8:a::1/64 dev eth1",
        "check": "The address is shown with the flags 'tentative dadfailed' and is never used."
      },
      {
        "title": "Save evidence and destroy the lab",
        "body": "Collect the router configs and the DHCPv6 log for your report.",
        "cmd": "for r in r1 r2; do sudo docker exec clab-v6-$r vtysh -c \"show running-config\" > $r-final.txt; done\nsudo docker exec clab-v6-r1 cat /tmp/dnsmasq.log > dnsmasq.log\nsudo containerlab destroy -t v6.clab.yml",
        "check": "r1-final.txt, r2-final.txt and dnsmasq.log exist, and no clab-v6 containers are running."
      }
    ],
    "verify": [
      "hosta configured a global 2001:db8:a:: address by SLAAC with a default route via r1's link-local address, and rdisc6 showed the RDNSS option.",
      "hostb received a /128 from DHCPv6 and r1's log shows Solicit, Advertise, Request and Reply.",
      "curl reached server.lab.internal over IPv6 by default and over IPv4 for the A-only name.",
      "You reproduced and fixed four faults: no RAs, blocked ICMPv6, missing IPv6 route (with silent IPv4 fallback) and a DAD failure."
    ],
    "deliverable": "A 'Dual-stack deployment and troubleshooting guide': the addressing plan, the RA flag table (A, M, O and what each combination means for hosts), annotated rdisc6 and DHCPv6 output, the ICMPv6 allow list with the reason for each type, and a troubleshooting flowchart for 'IPv6 not working' built from your four faults.",
    "resume": "Deployed a dual-stack IPv4/IPv6 network with FRRouting (OSPFv2 and OSPFv3), SLAAC with RDNSS and stateful DHCPv6, and documented troubleshooting of missing router advertisements, blocked ICMPv6, IPv6-only routing failures and duplicate address detection.",
    "interview": [
      "What do the A, M and O flags in a router advertisement mean? — A (in the prefix option) lets hosts build a SLAAC address from that prefix; M tells them to get addresses from stateful DHCPv6; O tells them to get other settings such as DNS from DHCPv6.",
      "Where does an IPv6 host get its default gateway? — Only from router advertisements; DHCPv6 has no default gateway option, and the gateway is normally the router's link-local address.",
      "Why must you not block all ICMPv6? — Neighbor discovery (types 135 and 136), router discovery (133 and 134) and path-MTU discovery (Packet Too Big, type 2) all use ICMPv6; blocking them breaks address resolution and large transfers.",
      "Users say a site is slow but it loads eventually. What might be wrong? — Broken IPv6 on the path: clients try IPv6 first and fall back to IPv4 after a Happy Eyeballs delay or a full timeout; test with curl -6 and curl -4 separately."
    ],
    "cleanup": [
      "sudo containerlab destroy -t ~/clab/v6/v6.clab.yml if still running.",
      "sudo docker rmi lab/frr-dns:1 lab/v6host:1 when finished."
    ],
    "links": [
      {
        "label": "FRRouting documentation: IPv6 router advertisements",
        "url": "https://docs.frrouting.org/en/latest/ipv6.html"
      },
      {
        "label": "RFC 4861: Neighbor Discovery for IPv6",
        "url": "https://www.rfc-editor.org/rfc/rfc4861"
      },
      {
        "label": "RFC 4862: IPv6 Stateless Address Autoconfiguration",
        "url": "https://www.rfc-editor.org/rfc/rfc4862"
      },
      {
        "label": "RFC 4890: Recommendations for Filtering ICMPv6 Messages in Firewalls",
        "url": "https://www.rfc-editor.org/rfc/rfc4890"
      },
      {
        "label": "dnsmasq manual page",
        "url": "https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html"
      }
    ]
  },
  {
    "id": "lab-qos-tc",
    "title": "QoS on Linux: shaping, DSCP marking and prioritization with tc and iperf3",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free (iproute2 tc, iptables and iperf3 on your Ubuntu VM)",
    "summary": "Build a client-router-server path out of Linux network namespaces, emulate a 20 Mbit/s WAN link with 40 ms of latency, measure bufferbloat under load, fix it with fq_codel, then mark traffic with DSCP (EF, CS1), build an HTB class hierarchy that prioritizes voice over bulk traffic, enforce a trust boundary, and prove every result with iperf3, ping and tc counters.",
    "realWorld": "QoS matters wherever demand exceeds a link: branch WAN circuits, VPN tunnels, Wi-Fi uplinks and busy data center uplinks. Network engineers mark voice and video at the edge, queue by class on congested interfaces, and re-mark traffic from untrusted devices. Linux tc is what runs inside SD-WAN appliances, firewalls such as OPNsense and OpenWrt routers, and the bufferbloat fixes it offers (fq_codel, CAKE) are now standard.",
    "youWillNeed": [
      "Your Ubuntu Server 24.04 VM (ubuntu-srv01) from lab-home-lab with 2 vCPUs",
      "iperf3 and tcpdump (installed in step 1); tc and ip are already present"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "Everything runs in network namespaces inside your VM. Do not attach qdiscs to your VM's real interfaces over SSH: a mistyped rate can cut off your own session. Run iperf3 only between machines you own; flooding other people's links is a denial of service.",
    "steps": [
      {
        "title": "Snapshot, get a root shell and install the tools",
        "body": "Namespaces and tc need root, so work in a root shell for this lab. iperf3 asks whether to start a system daemon when installed; the noninteractive install skips that.",
        "cmd": "VBoxManage snapshot \"ubuntu-srv01\" take \"pre-qos\"\n# On ubuntu-srv01:\nsudo -i\nDEBIAN_FRONTEND=noninteractive apt install -y iperf3 tcpdump\ntc -V; iperf3 --version | head -1",
        "check": "tc prints an iproute2 version and iperf3 prints 3.x."
      },
      {
        "title": "Build client, router and server namespaces",
        "body": "Each namespace has its own interfaces, routes and firewall, like a separate machine. Veth pairs are virtual cables. The router namespace forwards between 10.10.1.0/24 (client side) and 10.10.2.0/24 (server side); you will shape on r-srv, the router's interface toward the server, which is the egress for client-to-server traffic.",
        "cmd": "for n in cli rtr srv; do ip netns add $n; done\nip link add c-eth0 type veth peer name r-cli\nip link add s-eth0 type veth peer name r-srv\nip link set c-eth0 netns cli; ip link set r-cli netns rtr\nip link set s-eth0 netns srv; ip link set r-srv netns rtr\nip -n cli addr add 10.10.1.10/24 dev c-eth0\nip -n rtr addr add 10.10.1.1/24 dev r-cli\nip -n rtr addr add 10.10.2.1/24 dev r-srv\nip -n srv addr add 10.10.2.10/24 dev s-eth0\nfor n in cli rtr srv; do ip -n $n link set lo up; done\nip -n cli link set c-eth0 up; ip -n srv link set s-eth0 up\nip -n rtr link set r-cli up; ip -n rtr link set r-srv up\nip -n cli route add default via 10.10.1.1\nip -n srv route add default via 10.10.2.1\nip netns exec rtr sysctl -w net.ipv4.ip_forward=1\nip netns exec cli ping -c 2 10.10.2.10",
        "check": "The ping from cli to 10.10.2.10 succeeds with an RTT well under 1 ms."
      },
      {
        "title": "Measure the unshaped baseline",
        "body": "Start three iperf3 servers (one per test stream) in the server namespace, then measure throughput and RTT with nothing configured. Virtual links run at CPU speed, many Gbit/s.",
        "cmd": "for p in 5201 5202 5203; do ip netns exec srv iperf3 -s -p $p -D; done\nip netns exec cli iperf3 -c 10.10.2.10 -t 5\nip netns exec cli ping -c 5 10.10.2.10 | tail -1",
        "check": "iperf3 reports several Gbit/s and ping shows sub-millisecond RTTs. Write both numbers down."
      },
      {
        "title": "Emulate a WAN: 40 ms of latency with netem",
        "body": "netem adds delay, jitter and loss. Putting it on the router's interface toward the client delays everything flowing back to the client (ping replies, TCP ACKs), giving a realistic 40 ms round trip like a branch-to-HQ link.",
        "cmd": "ip netns exec rtr tc qdisc add dev r-cli root netem delay 40ms\nip netns exec cli ping -c 5 10.10.2.10 | tail -1\nip netns exec rtr tc qdisc show dev r-cli",
        "check": "The ping average is about 40 ms and tc shows 'qdisc netem ... delay 40ms'."
      },
      {
        "title": "Shape to 20 Mbit/s with a big FIFO buffer and measure bufferbloat",
        "body": "A token bucket filter (tbf) limits the rate; its 'latency 400ms' lets up to 400 ms of packets queue, like many consumer and carrier devices. Run 4 bulk TCP streams in the background and ping at the same time. TCP fills the buffer, and every other packet, including your 'voice' pings, waits behind it.",
        "cmd": "ip netns exec rtr tc qdisc add dev r-srv root tbf rate 20mbit burst 32kbit latency 400ms\nip netns exec cli iperf3 -c 10.10.2.10 -t 20 -P 4 --logfile /tmp/bulk.txt &\nsleep 5; ip netns exec cli ping -c 10 10.10.2.10 | tail -1\nwait; grep SUM /tmp/bulk.txt | tail -1",
        "check": "Throughput is about 19 Mbit/s and the ping average jumps from about 40 ms to several hundred ms. That extra delay is bufferbloat."
      },
      {
        "title": "Fix the latency with HTB and fq_codel",
        "body": "Replace the FIFO with an HTB shaper whose leaf queue is fq_codel. fq_codel gives each flow its own queue and drops packets that have waited too long, so TCP backs off before the queue grows. Throughput stays the same; latency under load collapses.",
        "cmd": "ip netns exec rtr tc qdisc del dev r-srv root\nip netns exec rtr tc qdisc add dev r-srv root handle 1: htb default 20\nip netns exec rtr tc class add dev r-srv parent 1: classid 1:1 htb rate 20mbit ceil 20mbit\nip netns exec rtr tc class add dev r-srv parent 1:1 classid 1:20 htb rate 20mbit ceil 20mbit\nip netns exec rtr tc qdisc add dev r-srv parent 1:20 fq_codel\nip netns exec cli iperf3 -c 10.10.2.10 -t 20 -P 4 --logfile /tmp/bulk2.txt &\nsleep 5; ip netns exec cli ping -c 10 10.10.2.10 | tail -1\nwait; grep SUM /tmp/bulk2.txt | tail -1",
        "check": "Throughput is still about 19 Mbit/s but the ping average under load stays within a few ms of the 40 ms baseline."
      },
      {
        "title": "Mark traffic with DSCP and see it on the wire",
        "body": "DSCP is the top six bits of the IP ToS byte. EF (46) is used for voice, AF41 (34) for interactive video, CS1 (8) for scavenger or bulk traffic. iperf3 marks with --dscp and ping with -Q (which takes the whole ToS byte: EF is 46 x 4 = 0xb8). Capture on the router to confirm the marking arrives.",
        "cmd": "ip netns exec rtr tcpdump -ni r-cli -v -c 3 'icmp' > /tmp/ef.txt 2>&1 &\nsleep 1; ip netns exec cli ping -c 3 -Q 0xb8 10.10.2.10 > /dev/null\nwait; grep -o \"tos 0x[0-9a-f]*\" /tmp/ef.txt | sort | uniq -c\nip netns exec rtr tcpdump -ni r-cli -v -c 3 'tcp dst port 5201' > /tmp/cs1.txt 2>&1 &\nsleep 1; ip netns exec cli iperf3 -c 10.10.2.10 -t 2 --dscp CS1 > /dev/null\nwait; grep -o \"tos 0x[0-9a-f]*\" /tmp/cs1.txt | sort | uniq -c",
        "check": "The ping capture shows 'tos 0xb8' (EF) and the iperf3 capture shows 'tos 0x20' (CS1 = 8 x 4)."
      },
      {
        "title": "Build a three-class policy: voice, best effort, scavenger",
        "body": "HTB guarantees each class its 'rate', lends spare bandwidth up to 'ceil', and gives spare bandwidth to lower 'prio' numbers first. u32 filters match the DSCP bits (mask 0xfc ignores the two ECN bits). Unmatched traffic goes to the default class 1:20.",
        "cmd": "ip netns exec rtr tc qdisc del dev r-srv root\nip netns exec rtr tc qdisc add dev r-srv root handle 1: htb default 20\nip netns exec rtr tc class add dev r-srv parent 1: classid 1:1 htb rate 20mbit ceil 20mbit\nip netns exec rtr tc class add dev r-srv parent 1:1 classid 1:10 htb rate 3mbit ceil 20mbit prio 0\nip netns exec rtr tc class add dev r-srv parent 1:1 classid 1:20 htb rate 15mbit ceil 20mbit prio 1\nip netns exec rtr tc class add dev r-srv parent 1:1 classid 1:30 htb rate 2mbit ceil 20mbit prio 2\nfor c in 10 20 30; do ip netns exec rtr tc qdisc add dev r-srv parent 1:$c fq_codel; done\nip netns exec rtr tc filter add dev r-srv parent 1: protocol ip prio 1 u32 match ip dsfield 0xb8 0xfc flowid 1:10\nip netns exec rtr tc filter add dev r-srv parent 1: protocol ip prio 2 u32 match ip dsfield 0x20 0xfc flowid 1:30\nip netns exec rtr tc -s class show dev r-srv | grep -E \"^class\"\nip netns exec rtr tc filter show dev r-srv",
        "check": "tc shows four HTB classes (1:1, 1:10, 1:20, 1:30) and two u32 filters pointing to 1:10 and 1:30."
      },
      {
        "title": "Run competing traffic and read the counters",
        "body": "Run three flows at once for 20 seconds: 4 scavenger (CS1) TCP streams, 4 unmarked best-effort streams, and a 1 Mbit/s EF UDP stream that behaves like a voice call. The receiver-side numbers show who got what; UDP reports jitter and loss.",
        "cmd": "ip netns exec rtr tc -s class show dev r-srv > /tmp/before.txt\nip netns exec cli iperf3 -c 10.10.2.10 -p 5201 -t 20 -P 4 --dscp CS1 --logfile /tmp/t-cs1.txt &\nip netns exec cli iperf3 -c 10.10.2.10 -p 5202 -t 20 -P 4 --logfile /tmp/t-be.txt &\nip netns exec cli iperf3 -c 10.10.2.10 -p 5203 -u -b 1M -t 20 --dscp EF --logfile /tmp/t-ef.txt\nwait\ngrep SUM /tmp/t-cs1.txt | grep receiver; grep SUM /tmp/t-be.txt | grep receiver\ngrep -A1 \"Jitter\" /tmp/t-ef.txt | tail -1\nip netns exec rtr tc -s class show dev r-srv | grep -A2 -E \"class htb 1:(10|20|30)\"",
        "check": "Best effort gets most of the link (roughly 15 to 17 Mbit/s), scavenger is held near its 2 Mbit/s guarantee, and the EF stream shows 0% (or near 0%) loss with jitter well under 1 ms. The 'Sent' bytes counters grew in all three classes."
      },
      {
        "title": "Enforce a trust boundary on the router",
        "body": "Hosts can mark anything, so a user could label a large download EF and jump the queue. Re-mark at the edge: reset all DSCP arriving from the client side to 0, then mark EF only for the traffic you have approved as voice (here UDP port 5203). The DSCP target does not stop rule processing, so the reset must come first. Then try to cheat and see where the traffic lands.",
        "cmd": "ip netns exec rtr iptables -t mangle -A PREROUTING -i r-cli -j DSCP --set-dscp 0\nip netns exec rtr iptables -t mangle -A PREROUTING -i r-cli -p udp --dport 5203 -j DSCP --set-dscp-class EF\nip netns exec rtr tc -s class show dev r-srv | grep -A1 \"class htb 1:10\" > /tmp/ef-before.txt\nip netns exec cli iperf3 -c 10.10.2.10 -p 5201 -t 10 -P 4 --dscp EF > /dev/null\nip netns exec rtr tc -s class show dev r-srv | grep -A1 \"class htb 1:10\"; cat /tmp/ef-before.txt\nip netns exec rtr iptables -t mangle -L PREROUTING -v -n",
        "check": "The EF class byte counter barely changes while the 'cheating' TCP streams run, because the router re-marked them to 0 and they were classified as best effort. The iptables counters show packets hitting the reset rule."
      },
      {
        "title": "Write the QoS policy and clean up",
        "body": "Record the class table (class, DSCP, rate, ceil, prio, queue), the measurements from every step, and the trust-boundary rules. Then delete the namespaces, which also removes every veth, qdisc and iptables rule inside them.",
        "cmd": "ip netns exec rtr tc -s qdisc show dev r-srv > /tmp/qos-final.txt\npkill iperf3\nfor n in cli rtr srv; do ip netns del $n; done\nip netns list",
        "check": "ip netns list prints nothing, and you have your measurements in a table."
      }
    ],
    "verify": [
      "Under 4 bulk TCP streams, ping RTT rose to hundreds of ms with the tbf FIFO and stayed near 40 ms with HTB plus fq_codel.",
      "tcpdump showed tos 0xb8 for EF-marked pings and 0x20 for CS1-marked iperf3 traffic.",
      "With three competing flows, the EF UDP stream had near-zero loss and sub-millisecond jitter, and the tc class counters grew in 1:10, 1:20 and 1:30.",
      "After the trust-boundary rules, TCP traffic marked EF by the client did not land in the EF class."
    ],
    "deliverable": "A 'WAN QoS policy' document: the namespace diagram, a class table (traffic type, DSCP, HTB rate/ceil/prio, leaf queue), before/after bufferbloat measurements, the three-flow test results with tc counters, the trust-boundary rules with an explanation, and the full tc and iptables commands as an appendix.",
    "resume": "Designed and tested a Linux QoS policy with tc: emulated a WAN with netem, eliminated bufferbloat with HTB and fq_codel, classified DSCP EF/CS1 traffic into prioritized classes, enforced a DSCP trust boundary with iptables, and validated results with iperf3 and tc statistics.",
    "interview": [
      "What is the difference between shaping and policing? — Shaping queues excess traffic and sends it later at the configured rate, adding delay but few drops; policing drops or re-marks traffic that exceeds the rate immediately, with no queue.",
      "Where should traffic be marked and where should it be queued? — Mark (or re-mark) as close to the source as possible at a trust boundary you control; queue on the egress of the congestion point, usually the WAN or uplink interface, and shape just below the provider's rate so the queue is yours, not theirs.",
      "What is bufferbloat and how do you fix it? — Excessively large FIFO buffers that fill under load and add hundreds of ms of latency; active queue management such as fq_codel or CAKE keeps queues short and isolates flows.",
      "Which DSCP values are commonly used for voice and video? — EF (46) for voice media, AF41 (34) for interactive video, CS3 or CS5 for call signaling depending on the design, and CS1 for scavenger traffic."
    ],
    "cleanup": [
      "for n in cli rtr srv; do sudo ip netns del $n; done (if still present).",
      "sudo pkill iperf3.",
      "Or revert to the 'pre-qos' snapshot."
    ],
    "links": [
      {
        "label": "tc-htb(8) manual page",
        "url": "https://man7.org/linux/man-pages/man8/tc-htb.8.html"
      },
      {
        "label": "tc-fq_codel(8) manual page",
        "url": "https://man7.org/linux/man-pages/man8/tc-fq_codel.8.html"
      },
      {
        "label": "iperf3 documentation",
        "url": "https://software.es.net/iperf/invoking.html"
      },
      {
        "label": "RFC 4594: Configuration Guidelines for DiffServ Service Classes",
        "url": "https://www.rfc-editor.org/rfc/rfc4594"
      }
    ]
  },
  {
    "id": "lab-junos-cli",
    "title": "Junos CLI fundamentals: commit model, rollback, interfaces, static routes and routing policy",
    "track": "Networking",
    "level": "Beginner",
    "minutes": 180,
    "cost": "Free (Juniper vLabs with a free Juniper account, or the free vJunos-router image on your own KVM host)",
    "summary": "Learn Junos the way JNCIA tests it: operational versus configuration mode, the candidate configuration and commit, commit confirmed as a safety net, rollback, interfaces and loopbacks, static routes and route preference, OSPF, a routing policy that exports only approved static routes, and a firewall filter that protects the routing engine.",
    "realWorld": "Juniper routers and SRX firewalls run in service-provider, data center and enterprise networks, and the Junos commit model (edit a candidate, review the diff, commit with an automatic rollback timer) is the gold standard that other network operating systems have copied. Engineers who can safely change a Junos box and prove what changed are trusted with production change windows.",
    "youWillNeed": [
      "A free Juniper user account and a reservation in Juniper vLabs (jlabs.juniper.net/vlabs) of a sandbox topology with at least two connected Junos routers, or two vJunos-router VMs you run yourself",
      "A text editor to keep your command log",
      "Optional: containerlab with the vJunos-router image on a KVM-capable Linux host (at least 8 GB RAM per router)"
    ],
    "requires": [
      "lab-subnetting"
    ],
    "safety": "Use only lab devices you have reserved or run yourself. Always use 'commit confirmed' for any change that could cut off your management access (interfaces, filters, routing), so the router rolls itself back if you lose the session.",
    "steps": [
      {
        "title": "Get two Junos routers and map the links",
        "body": "In vLabs, reserve a sandbox with two or more routers and open a console to each. Interface names differ by platform and topology (ge-0/0/0, ge-0/0/1 and so on), so list them first and note which interface on R1 faces R2. This lab calls that link ge-0/0/0 on both sides; substitute your real names everywhere.",
        "cmd": "show version\nshow interfaces terse\nshow lldp neighbors",
        "check": "You know the Junos version and the exact interface on each router that connects to the other (LLDP shows it if enabled; otherwise use the vLabs topology drawing)."
      },
      {
        "title": "Operational mode: look around",
        "body": "The '>' prompt is operational mode, used for monitoring and troubleshooting. Pipes filter output; '| no-more' stops paging; '?' shows options at any point.",
        "cmd": "show chassis hardware\nshow system uptime\nshow route\nshow interfaces ge-0/0/0 | match \"Physical|Link-level|Speed\"\nshow configuration | count\nshow configuration system | display set\nhelp topic interfaces address",
        "check": "You can read the hardware inventory, the (mostly empty) route table, and the system configuration as set commands."
      },
      {
        "title": "Configuration mode and the candidate configuration",
        "body": "'configure' enters configuration mode ('#' prompt). Every change goes into a candidate copy; nothing is live until you commit. 'show | compare' shows the diff against the active configuration. 'commit check' validates without applying.",
        "cmd": "configure\nset system host-name R1\nset system time-zone UTC\nset system login message \"Authorized lab use only\"\nshow | compare\ncommit check\ncommit comment \"R1 base system settings\"\nrun show system commit",
        "check": "show | compare lists your three lines with '+'; after commit the prompt shows R1 and 'show system commit' lists your comment at position 0."
      },
      {
        "title": "Configure interfaces and loopbacks with commit confirmed",
        "body": "Junos configures IP addresses on a logical unit (unit 0) of an interface. 'commit confirmed 5' applies the change and rolls it back automatically in 5 minutes unless you commit again, which protects you from locking yourself out. Configure R2 the same way with 10.0.12.2/30 and 2.2.2.2/32.",
        "cmd": "edit interfaces\nset ge-0/0/0 unit 0 family inet address 10.0.12.1/30\nset lo0 unit 0 family inet address 1.1.1.1/32\ntop\nshow interfaces ge-0/0/0\ncommit confirmed 5 comment \"R1 addressing\"\nrun ping 10.0.12.2 count 3\ncommit",
        "check": "After R2 is addressed the ping succeeds, and the second commit prints 'commit complete' so the rollback timer is cancelled."
      },
      {
        "title": "Make a mistake and roll back",
        "body": "Delete the interface address and commit. Then use the rollback history: 'rollback 1' loads the previous configuration into the candidate (it does not activate it until you commit). Junos keeps up to 50 previous configurations.",
        "cmd": "delete interfaces ge-0/0/0 unit 0 family inet\ncommit comment \"oops\"\nrun ping 10.0.12.2 count 2\nrun show system commit\nrun show system rollback 1 compare 0\nrollback 1\nshow | compare\ncommit comment \"restore after rollback\"\nrun ping 10.0.12.2 count 2",
        "check": "The first ping fails, 'show system rollback 1 compare 0' shows the deleted address, show | compare after rollback 1 shows it being added back, and the final ping succeeds."
      },
      {
        "title": "Static routes and route preference",
        "body": "Add static routes to the other router's loopback. Junos uses 'preference' (Cisco calls it administrative distance): direct 0, static 5, OSPF internal 10, OSPF external 150, BGP 170. The active route is marked '*'. A floating static with preference 200 only becomes active if every better route disappears.",
        "cmd": "set routing-options router-id 1.1.1.1\nset routing-options static route 2.2.2.2/32 next-hop 10.0.12.2\nset routing-options static route 192.168.100.0/24 next-hop 10.0.12.2 preference 200\ncommit comment \"static routes\"\nrun show route protocol static\nrun ping 2.2.2.2 source 1.1.1.1 count 3",
        "check": "show route lists 2.2.2.2/32 as '*[Static/5]' and 192.168.100.0/24 as '[Static/200]'; the ping sourced from the loopback succeeds once R2 has the reverse static route to 1.1.1.1/32."
      },
      {
        "title": "Add OSPF and compare preferences",
        "body": "Enable OSPF on the link and loopback on both routers. Because static (5) beats OSPF (10), the static route stays active and the OSPF route is shown as inactive. Delete the static route and OSPF takes over.",
        "cmd": "set protocols ospf area 0.0.0.0 interface ge-0/0/0.0 interface-type p2p\nset protocols ospf area 0.0.0.0 interface lo0.0 passive\ncommit comment \"OSPF area 0\"\nrun show ospf neighbor\nrun show route 2.2.2.2\ndelete routing-options static route 2.2.2.2/32\ncommit comment \"remove static to R2 loopback\"\nrun show route 2.2.2.2",
        "check": "show ospf neighbor shows the other router 'Full'. First show route lists Static/5 active and OSPF/10 inactive; after the delete only '*[OSPF/10]' remains."
      },
      {
        "title": "Write a routing policy that exports only approved statics",
        "body": "OSPF does not advertise static routes unless an export policy says so. A policy-statement is evaluated term by term; the final reject term makes the intent explicit. Create two discard routes and approve only one. 'test policy' shows what a policy would accept without applying it.",
        "cmd": "set routing-options static route 172.16.10.0/24 discard\nset routing-options static route 172.16.20.0/24 discard\nset policy-options prefix-list LAB-APPROVED 172.16.10.0/24\nset policy-options policy-statement STATIC-TO-OSPF term APPROVED from protocol static\nset policy-options policy-statement STATIC-TO-OSPF term APPROVED from prefix-list LAB-APPROVED\nset policy-options policy-statement STATIC-TO-OSPF term APPROVED then accept\nset policy-options policy-statement STATIC-TO-OSPF term REST then reject\nset protocols ospf export STATIC-TO-OSPF\ncommit comment \"export approved statics to OSPF\"\nrun test policy STATIC-TO-OSPF 172.16.0.0/16\n# on R2:\nshow route protocol ospf\nshow ospf database external",
        "check": "test policy on R1 lists only 172.16.10.0/24. R2 has 172.16.10.0/24 as an OSPF external route ('[OSPF/150]') and no route for 172.16.20.0/24."
      },
      {
        "title": "Protect the routing engine with a firewall filter",
        "body": "A filter applied to lo0 input polices all traffic destined to the router itself, on every interface. Allow what the router needs (OSPF, ICMP, SSH), count and discard the rest. Use commit confirmed: if you lose your session, the router undoes the change. In production you would also restrict SSH to management subnets and allow return traffic for NTP, DNS and similar services.",
        "cmd": "set firewall family inet filter PROTECT-RE term OSPF from protocol ospf\nset firewall family inet filter PROTECT-RE term OSPF then accept\nset firewall family inet filter PROTECT-RE term ICMP from protocol icmp\nset firewall family inet filter PROTECT-RE term ICMP then accept\nset firewall family inet filter PROTECT-RE term SSH from protocol tcp\nset firewall family inet filter PROTECT-RE term SSH from destination-port ssh\nset firewall family inet filter PROTECT-RE term SSH then accept\nset firewall family inet filter PROTECT-RE term DENY then count RE-DENIED\nset firewall family inet filter PROTECT-RE term DENY then discard\nset interfaces lo0 unit 0 family inet filter input PROTECT-RE\ncommit confirmed 5 comment \"RE protection filter\"\nrun show ospf neighbor\n# on R2 (operational mode), within the 5 minutes:\ntelnet 10.0.12.1\n# back on R1:\ncommit\nrun show firewall filter PROTECT-RE",
        "check": "OSPF stays Full; a telnet from R2 to R1 (not allowed) fails; the final commit keeps the filter, and 'show firewall filter PROTECT-RE' shows a non-zero RE-DENIED counter after the telnet attempt."
      },
      {
        "title": "Maintenance: rescue config, saved files and logs",
        "body": "A rescue configuration is a known-good config you can load in an emergency ('rollback rescue'). Save a copy to a file, and learn where to look when something goes wrong.",
        "cmd": "run request system configuration rescue save\nsave /var/tmp/r1-baseline.conf\nexit\nfile list /var/tmp/\nshow log messages | last 20\nshow system alarms\nshow configuration | display set | save /var/tmp/r1-set.txt",
        "check": "file list shows r1-baseline.conf and r1-set.txt, and show system alarms reports its status (often 'No alarms currently active')."
      },
      {
        "title": "Compare with Cisco IOS and write your notes",
        "body": "Make a two-column table mapping every Junos command you used to its closest IOS equivalent (for example 'show | compare' has no direct IOS equivalent; 'show route' vs 'show ip route'; preference vs administrative distance; policy-statement vs route-map). JNCIA questions often test exactly these Junos-specific behaviors.",
        "check": "Your table has at least 15 rows, and you can explain candidate vs active configuration and commit confirmed without notes."
      }
    ],
    "verify": [
      "show system commit lists your commits with comments, including the 'oops' commit and the rollback that fixed it.",
      "show route 2.2.2.2 showed Static/5 active over OSPF/10, then OSPF only after the static was removed.",
      "R2 learned 172.16.10.0/24 as an OSPF external route but not 172.16.20.0/24.",
      "The PROTECT-RE filter kept OSPF up, blocked telnet, and its RE-DENIED counter increased."
    ],
    "deliverable": "A 'Junos change log': every commit with its comment and 'show | compare' output, the final 'show configuration | display set' for both routers, the rollback evidence, the test policy and OSPF external route output, the firewall filter counters, and your Junos-to-IOS command table.",
    "resume": "Configured Junos routers from the CLI using the candidate/commit model with commit confirmed and rollback, built interfaces, static routes and OSPF, wrote a policy-statement that exported only approved routes, and protected the routing engine with a loopback firewall filter.",
    "interview": [
      "What does commit confirmed do? — It activates the candidate configuration and automatically rolls back to the previous one after the given number of minutes unless you issue another commit, protecting against changes that cut off access.",
      "What is the difference between the candidate and active configuration? — The candidate is your private working copy edited in configuration mode; the active configuration is what the router is running. Only commit copies the candidate to active.",
      "How does Junos route preference compare to Cisco administrative distance? — Same idea, lower wins, but different values: direct 0, static 5, OSPF internal 10, IS-IS level 1 15, RIP 100, OSPF external 150, BGP 170.",
      "Why is a filter applied to lo0 so powerful? — lo0 input filters are applied to all traffic destined to the routing engine regardless of the ingress interface, so one filter protects every management and control-plane service."
    ],
    "cleanup": [
      "vLabs reservations end automatically; end yours when finished so others can use the capacity.",
      "If you ran vJunos yourself, shut the VMs down or destroy the containerlab topology."
    ],
    "links": [
      {
        "label": "Juniper vLabs",
        "url": "https://jlabs.juniper.net/vlabs/"
      },
      {
        "label": "Junos OS CLI User Guide",
        "url": "https://www.juniper.net/documentation/us/en/software/junos/cli/index.html"
      },
      {
        "label": "Junos OS Routing Policies, Firewall Filters, and Traffic Policers User Guide",
        "url": "https://www.juniper.net/documentation/us/en/software/junos/routing-policy/index.html"
      },
      {
        "label": "containerlab: Juniper vJunos-router kind",
        "url": "https://containerlab.dev/manual/kinds/vr-vjunosrouter/"
      }
    ]
  },
  {
    "id": "lab-aws-vpc",
    "title": "AWS VPC networking: subnets, route tables, security groups vs NACLs, peering and flow logs",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Low if you clean up the same day: free-tier-eligible EC2 instances, a few cents of S3 and flow-log delivery. Public IPv4 addresses are billed hourly (about $0.005 per hour each) unless your free tier covers them. Do NOT create a NAT gateway: it costs about $0.045 per hour plus data processing (over $30 a month) even when idle.",
    "summary": "Build two VPCs with the AWS CLI: public and private subnets, an internet gateway and route tables, a bastion host and a private instance, then prove that security groups are stateful and NACLs are stateless, use a NACL deny rule, peer the VPCs and fix routing so they can talk, read VPC flow logs from S3 including rejected internet scans, and tear it all down in dependency order.",
    "realWorld": "Almost every company's network now extends into a cloud VPC, and network engineers are asked to design the addressing, routing and segmentation there just as they do on-premises. Most cloud connectivity tickets come down to one of four things you will break and fix here: a missing route, a security group, a NACL, or a non-transitive peering. Flow logs are the cloud equivalent of NetFlow and are used by both network and security teams.",
    "youWillNeed": [
      "An AWS account you own, secured as in lab-cloud-iam, with a budget alert already set",
      "AWS CLI v2 configured with an admin identity (aws sts get-caller-identity works)",
      "An SSH client on your Ubuntu VM or host"
    ],
    "requires": [
      "lab-cloud-iam",
      "lab-subnetting"
    ],
    "safety": "COST WARNING: check that your budget alert exists before you start, use only the resources in this lab, never create a NAT gateway or Elastic IP, and run the teardown step the same day. Append every resource ID to ~/vpc-lab.env as you go so you can clean up even if your shell closes. Open SSH only to your own public IP, never 0.0.0.0/0, and never commit the private key file anywhere.",
    "steps": [
      {
        "title": "Check identity, region and free-tier instance types",
        "body": "Pick one region and stay in it. The last command lists instance types your account can run under the free tier; use one of them as TYPE in later steps (t3.micro or t2.micro in most accounts). Every resource gets a Project=vpc-lab tag so you can find leftovers.",
        "cmd": "aws sts get-caller-identity\nexport AWS_REGION=us-east-1 AWS_DEFAULT_REGION=us-east-1\naws ec2 describe-instance-types --filters Name=free-tier-eligible,Values=true --query 'InstanceTypes[].InstanceType' --output text\nT='{Key=Project,Value=vpc-lab}'\necho \"export AWS_REGION=us-east-1 AWS_DEFAULT_REGION=us-east-1\" > ~/vpc-lab.env",
        "check": "get-caller-identity shows your account and admin identity, and the free-tier query lists at least one type such as t3.micro."
      },
      {
        "title": "Create VPC A and its subnets",
        "body": "A VPC is a private address space in one region; subnets live in one Availability Zone each. AWS reserves five addresses in every subnet (network, router, DNS, future use, broadcast), so a /24 has 251 usable addresses. Every VPC gets a main route table with a single 'local' route.",
        "cmd": "VPC_A=$(aws ec2 create-vpc --cidr-block 10.20.0.0/16 --tag-specifications \"ResourceType=vpc,Tags=[{Key=Name,Value=lab-vpc-a},$T]\" --query Vpc.VpcId --output text)\naws ec2 modify-vpc-attribute --vpc-id $VPC_A --enable-dns-hostnames '{\"Value\":true}'\nAZ=$(aws ec2 describe-availability-zones --query 'AvailabilityZones[0].ZoneName' --output text)\nSUB_PUB=$(aws ec2 create-subnet --vpc-id $VPC_A --cidr-block 10.20.1.0/24 --availability-zone $AZ --tag-specifications \"ResourceType=subnet,Tags=[{Key=Name,Value=lab-a-public},$T]\" --query Subnet.SubnetId --output text)\nSUB_PRIV=$(aws ec2 create-subnet --vpc-id $VPC_A --cidr-block 10.20.2.0/24 --availability-zone $AZ --tag-specifications \"ResourceType=subnet,Tags=[{Key=Name,Value=lab-a-private},$T]\" --query Subnet.SubnetId --output text)\necho \"VPC_A=$VPC_A SUB_PUB=$SUB_PUB SUB_PRIV=$SUB_PRIV AZ=$AZ\" >> ~/vpc-lab.env\naws ec2 describe-subnets --subnet-ids $SUB_PUB --query 'Subnets[0].AvailableIpAddressCount'\naws ec2 describe-route-tables --filters Name=vpc-id,Values=$VPC_A --query 'RouteTables[].Routes[]'",
        "check": "The subnet reports 251 available addresses and the main route table has one route: 10.20.0.0/16 to 'local'."
      },
      {
        "title": "Add an internet gateway and a public route table",
        "body": "A subnet is 'public' only because its route table sends 0.0.0.0/0 to an internet gateway (IGW). The private subnet stays on the main route table with no default route. Private instances would need a NAT gateway to reach the internet, which is exactly the resource this lab avoids because of its cost.",
        "cmd": "IGW=$(aws ec2 create-internet-gateway --tag-specifications \"ResourceType=internet-gateway,Tags=[{Key=Name,Value=lab-igw},$T]\" --query InternetGateway.InternetGatewayId --output text)\naws ec2 attach-internet-gateway --internet-gateway-id $IGW --vpc-id $VPC_A\nRT_PUB=$(aws ec2 create-route-table --vpc-id $VPC_A --tag-specifications \"ResourceType=route-table,Tags=[{Key=Name,Value=lab-a-public-rt},$T]\" --query RouteTable.RouteTableId --output text)\naws ec2 create-route --route-table-id $RT_PUB --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW\naws ec2 associate-route-table --route-table-id $RT_PUB --subnet-id $SUB_PUB\necho \"IGW=$IGW RT_PUB=$RT_PUB\" >> ~/vpc-lab.env\naws ec2 describe-route-tables --route-table-ids $RT_PUB --query 'RouteTables[0].Routes'",
        "check": "The public route table has the local route plus 0.0.0.0/0 via igw-..., and is associated with the public subnet."
      },
      {
        "title": "Create security groups",
        "body": "Security groups are stateful allow-lists attached to network interfaces. The bastion allows SSH only from your public IP. The private group allows SSH only from members of the bastion group (a reference, not an address) and ICMP from 10.0.0.0/8 so the other VPC can ping it later.",
        "cmd": "MYIP=$(curl -s https://checkip.amazonaws.com)\nSG_BASTION=$(aws ec2 create-security-group --group-name lab-bastion --description \"SSH from my IP\" --vpc-id $VPC_A --tag-specifications \"ResourceType=security-group,Tags=[$T]\" --query GroupId --output text)\naws ec2 authorize-security-group-ingress --group-id $SG_BASTION --protocol tcp --port 22 --cidr $MYIP/32\nSG_PRIV=$(aws ec2 create-security-group --group-name lab-private --description \"From bastion only\" --vpc-id $VPC_A --tag-specifications \"ResourceType=security-group,Tags=[$T]\" --query GroupId --output text)\naws ec2 authorize-security-group-ingress --group-id $SG_PRIV --protocol tcp --port 22 --source-group $SG_BASTION\naws ec2 authorize-security-group-ingress --group-id $SG_PRIV --ip-permissions 'IpProtocol=icmp,FromPort=-1,ToPort=-1,IpRanges=[{CidrIp=10.0.0.0/8}]'\necho \"SG_BASTION=$SG_BASTION SG_PRIV=$SG_PRIV\" >> ~/vpc-lab.env",
        "check": "Both commands return sg-... IDs and the authorize calls return 'Return: true'."
      },
      {
        "title": "Launch a bastion and a private instance",
        "body": "The AMI is resolved from AWS's public SSM parameter for the latest Amazon Linux 2023, so you never hard-code an image ID. Only the bastion gets a public IP. Replace t3.micro with a type from step 1's list if different.",
        "cmd": "aws ec2 create-key-pair --key-name vpc-lab --key-type ed25519 --query KeyMaterial --output text > ~/vpc-lab.pem && chmod 400 ~/vpc-lab.pem\nAMI=resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64\nTYPE=t3.micro\nBASTION=$(aws ec2 run-instances --image-id $AMI --instance-type $TYPE --key-name vpc-lab --subnet-id $SUB_PUB --security-group-ids $SG_BASTION --associate-public-ip-address --tag-specifications \"ResourceType=instance,Tags=[{Key=Name,Value=lab-bastion},$T]\" --query 'Instances[0].InstanceId' --output text)\nPRIV=$(aws ec2 run-instances --image-id $AMI --instance-type $TYPE --key-name vpc-lab --subnet-id $SUB_PRIV --security-group-ids $SG_PRIV --no-associate-public-ip-address --tag-specifications \"ResourceType=instance,Tags=[{Key=Name,Value=lab-private},$T]\" --query 'Instances[0].InstanceId' --output text)\necho \"BASTION=$BASTION PRIV=$PRIV\" >> ~/vpc-lab.env\naws ec2 wait instance-running --instance-ids $BASTION $PRIV\nBASTION_IP=$(aws ec2 describe-instances --instance-ids $BASTION --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)\nPRIV_IP=$(aws ec2 describe-instances --instance-ids $PRIV --query 'Reservations[0].Instances[0].PrivateIpAddress' --output text)\necho \"BASTION_IP=$BASTION_IP PRIV_IP=$PRIV_IP\"",
        "check": "Both instances reach 'running', the bastion has a public IP, and the private instance has a 10.20.2.x address only."
      },
      {
        "title": "Test reachability through the bastion",
        "body": "Load the key into ssh-agent so the jump (-J) works through the bastion to the private instance. The bastion reaches the internet; the private instance cannot, because its route table has no default route.",
        "cmd": "eval \"$(ssh-agent -s)\"; ssh-add ~/vpc-lab.pem\nssh -o StrictHostKeyChecking=accept-new ec2-user@$BASTION_IP \"ip route; ping -c 3 $PRIV_IP; curl -s -m 5 -o /dev/null -w '%{http_code}\\n' https://aws.amazon.com\"\nssh -o StrictHostKeyChecking=accept-new -J ec2-user@$BASTION_IP ec2-user@$PRIV_IP \"ip route; curl -s -m 5 https://aws.amazon.com > /dev/null && echo INTERNET || echo NO-INTERNET\"",
        "check": "The bastion pings the private instance and gets HTTP 200 from aws.amazon.com; the jump to the private instance works and prints NO-INTERNET."
      },
      {
        "title": "NACLs are stateless: break SSH and fix it",
        "body": "Network ACLs apply to whole subnets, are evaluated in rule-number order, and are stateless: return traffic must be allowed explicitly. A new custom NACL denies everything. Allow inbound SSH and ICMP from the public subnet and outbound ICMP only, move the private subnet onto it, and try again. Ping works; SSH hangs because the replies go to the bastion's ephemeral port, which the outbound rules do not allow. Then add the ephemeral range.",
        "cmd": "NACL=$(aws ec2 create-network-acl --vpc-id $VPC_A --tag-specifications \"ResourceType=network-acl,Tags=[{Key=Name,Value=lab-private-nacl},$T]\" --query NetworkAcl.NetworkAclId --output text)\necho \"NACL=$NACL\" >> ~/vpc-lab.env\naws ec2 create-network-acl-entry --network-acl-id $NACL --ingress --rule-number 100 --protocol 6 --port-range From=22,To=22 --cidr-block 10.20.1.0/24 --rule-action allow\naws ec2 create-network-acl-entry --network-acl-id $NACL --ingress --rule-number 110 --protocol 1 --icmp-type-code Type=-1,Code=-1 --cidr-block 10.20.1.0/24 --rule-action allow\naws ec2 create-network-acl-entry --network-acl-id $NACL --egress --rule-number 110 --protocol 1 --icmp-type-code Type=-1,Code=-1 --cidr-block 10.20.1.0/24 --rule-action allow\nASSOC=$(aws ec2 describe-network-acls --filters Name=association.subnet-id,Values=$SUB_PRIV --query \"NetworkAcls[0].Associations[?SubnetId=='$SUB_PRIV'].NetworkAclAssociationId\" --output text)\naws ec2 replace-network-acl-association --association-id $ASSOC --network-acl-id $NACL\nssh ec2-user@$BASTION_IP \"ping -c 2 $PRIV_IP; timeout 10 ssh -o BatchMode=yes -o ConnectTimeout=8 $PRIV_IP true; echo ssh-exit=\\$?\"\naws ec2 create-network-acl-entry --network-acl-id $NACL --egress --rule-number 100 --protocol 6 --port-range From=1024,To=65535 --cidr-block 10.20.1.0/24 --rule-action allow\nssh -J ec2-user@$BASTION_IP ec2-user@$PRIV_IP \"echo SSH-OK-THROUGH-NACL\"",
        "check": "Before the ephemeral rule, ping works but the inner SSH times out (ssh-exit=255 or 124). After adding outbound 1024-65535, the jump prints SSH-OK-THROUGH-NACL. The security groups never needed a return rule because they are stateful."
      },
      {
        "title": "Use a NACL deny rule (something a security group cannot do)",
        "body": "Security groups can only allow. NACLs can deny, and the lowest-numbered matching rule wins. Deny ICMP from the bastion's private address with rule 90, which is evaluated before the allow at 110.",
        "cmd": "BASTION_PRIV=$(aws ec2 describe-instances --instance-ids $BASTION --query 'Reservations[0].Instances[0].PrivateIpAddress' --output text)\naws ec2 create-network-acl-entry --network-acl-id $NACL --ingress --rule-number 90 --protocol 1 --icmp-type-code Type=-1,Code=-1 --cidr-block $BASTION_PRIV/32 --rule-action deny\nssh ec2-user@$BASTION_IP \"ping -c 2 -W 2 $PRIV_IP || echo PING-BLOCKED\"\naws ec2 describe-network-acls --network-acl-ids $NACL --query 'NetworkAcls[0].Entries[?Egress==`false`].[RuleNumber,Protocol,RuleAction,CidrBlock]' --output table\naws ec2 delete-network-acl-entry --network-acl-id $NACL --ingress --rule-number 90",
        "check": "The ping prints PING-BLOCKED while SSH still works, and the table shows rules 90 (deny), 100, 110 and the default '*' deny in order."
      },
      {
        "title": "Create VPC B and peer the two VPCs",
        "body": "VPC peering connects two VPCs privately, but it is not transitive and it adds no routes by itself. After accepting the peering, a ping still fails until both sides have a route to the other's CIDR. Note that only the public subnet's route table gets the route here, so the private instance still cannot reach VPC B: routes are per route table.",
        "cmd": "VPC_B=$(aws ec2 create-vpc --cidr-block 10.30.0.0/16 --tag-specifications \"ResourceType=vpc,Tags=[{Key=Name,Value=lab-vpc-b},$T]\" --query Vpc.VpcId --output text)\nSUB_B=$(aws ec2 create-subnet --vpc-id $VPC_B --cidr-block 10.30.1.0/24 --availability-zone $AZ --tag-specifications \"ResourceType=subnet,Tags=[$T]\" --query Subnet.SubnetId --output text)\nSG_B=$(aws ec2 create-security-group --group-name lab-b --description \"ICMP from VPC A\" --vpc-id $VPC_B --tag-specifications \"ResourceType=security-group,Tags=[$T]\" --query GroupId --output text)\naws ec2 authorize-security-group-ingress --group-id $SG_B --ip-permissions 'IpProtocol=icmp,FromPort=-1,ToPort=-1,IpRanges=[{CidrIp=10.20.0.0/16}]'\nINST_B=$(aws ec2 run-instances --image-id $AMI --instance-type $TYPE --subnet-id $SUB_B --security-group-ids $SG_B --no-associate-public-ip-address --tag-specifications \"ResourceType=instance,Tags=[{Key=Name,Value=lab-b},$T]\" --query 'Instances[0].InstanceId' --output text)\nPCX=$(aws ec2 create-vpc-peering-connection --vpc-id $VPC_A --peer-vpc-id $VPC_B --tag-specifications \"ResourceType=vpc-peering-connection,Tags=[$T]\" --query VpcPeeringConnection.VpcPeeringConnectionId --output text)\necho \"VPC_B=$VPC_B SUB_B=$SUB_B SG_B=$SG_B INST_B=$INST_B PCX=$PCX\" >> ~/vpc-lab.env\naws ec2 accept-vpc-peering-connection --vpc-peering-connection-id $PCX > /dev/null\naws ec2 wait instance-running --instance-ids $INST_B\nB_IP=$(aws ec2 describe-instances --instance-ids $INST_B --query 'Reservations[0].Instances[0].PrivateIpAddress' --output text)\nssh ec2-user@$BASTION_IP \"ping -c 2 -W 2 $B_IP || echo NO-ROUTE-YET\"\naws ec2 create-route --route-table-id $RT_PUB --destination-cidr-block 10.30.0.0/16 --vpc-peering-connection-id $PCX\nRT_B=$(aws ec2 describe-route-tables --filters Name=vpc-id,Values=$VPC_B Name=association.main,Values=true --query 'RouteTables[0].RouteTableId' --output text)\naws ec2 create-route --route-table-id $RT_B --destination-cidr-block 10.20.0.0/16 --vpc-peering-connection-id $PCX\nssh ec2-user@$BASTION_IP \"ping -c 3 $B_IP\"",
        "check": "The first ping prints NO-ROUTE-YET; after routes are added on both sides the bastion pings the VPC B instance."
      },
      {
        "title": "Turn on VPC flow logs and read them",
        "body": "Flow logs record accepted and rejected connections per network interface (not packet contents). Delivering them to S3 needs no IAM role; AWS adds the bucket policy for you. Logs arrive in batches every few minutes. Internet scanners will already be probing your bastion's public IP, which shows up as REJECT records. In the default format, field 13 is the action.",
        "cmd": "ACCT=$(aws sts get-caller-identity --query Account --output text)\nBUCKET=vpc-lab-flowlogs-$ACCT-$RANDOM\naws s3api create-bucket --bucket $BUCKET\nFL=$(aws ec2 create-flow-logs --resource-type VPC --resource-ids $VPC_A --traffic-type ALL --log-destination-type s3 --log-destination arn:aws:s3:::$BUCKET --max-aggregation-interval 60 --query 'FlowLogIds[0]' --output text)\necho \"BUCKET=$BUCKET FL=$FL\" >> ~/vpc-lab.env\nssh ec2-user@$BASTION_IP \"ping -c 5 $PRIV_IP; ping -c 5 $B_IP\"\nnc -zv -w 3 $BASTION_IP 3389\n# wait about 10 minutes, then:\naws s3 cp s3://$BUCKET/ ./flowlogs --recursive --quiet\nzcat $(find flowlogs -name '*.log.gz') | head -3\nzcat $(find flowlogs -name '*.log.gz') | awk '$13==\"REJECT\"' | head\nzcat $(find flowlogs -name '*.log.gz') | awk '$13==\"ACCEPT\" && $8==1' | head -3",
        "check": "The first line is the field header (version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status). You find REJECT records for your port 3389 attempt and for unknown internet addresses, and ACCEPT records with protocol 1 (ICMP) between 10.20.1.x and 10.20.2.x or 10.30.1.x. Outside us-east-1, add --create-bucket-configuration LocationConstraint=$AWS_REGION to create-bucket."
      },
      {
        "title": "Tear everything down in dependency order",
        "body": "Resources must be deleted in reverse order of their dependencies: instances before security groups and subnets, subnets before the NACL, the IGW detached before the VPC is deleted. If your shell closed, run 'source ~/vpc-lab.env' first. Finish by searching for anything still tagged Project=vpc-lab.",
        "cmd": "aws ec2 delete-flow-logs --flow-log-ids $FL\naws ec2 terminate-instances --instance-ids $BASTION $PRIV $INST_B > /dev/null\naws ec2 wait instance-terminated --instance-ids $BASTION $PRIV $INST_B\naws ec2 delete-vpc-peering-connection --vpc-peering-connection-id $PCX\naws ec2 delete-key-pair --key-name vpc-lab; rm -f ~/vpc-lab.pem\nfor s in $SUB_PUB $SUB_PRIV $SUB_B; do aws ec2 delete-subnet --subnet-id $s; done\naws ec2 delete-network-acl --network-acl-id $NACL\nfor g in $SG_PRIV $SG_BASTION $SG_B; do aws ec2 delete-security-group --group-id $g; done\naws ec2 delete-route-table --route-table-id $RT_PUB\naws ec2 detach-internet-gateway --internet-gateway-id $IGW --vpc-id $VPC_A\naws ec2 delete-internet-gateway --internet-gateway-id $IGW\naws ec2 delete-vpc --vpc-id $VPC_A; aws ec2 delete-vpc --vpc-id $VPC_B\naws s3 rb s3://$BUCKET --force\naws resourcegroupstaggingapi get-resources --tag-filters Key=Project,Values=vpc-lab --query 'ResourceTagMappingList[].ResourceARN'\naws ec2 describe-addresses --query 'Addresses[].PublicIp'",
        "check": "Every delete succeeds, the tag search returns an empty list (terminated instances may linger in the list for up to an hour, which is harmless), and there are no Elastic IPs. Check Billing the next day to confirm charges are zero or a few cents."
      }
    ],
    "verify": [
      "The private instance was reachable only through the bastion and printed NO-INTERNET, while the bastion had a working default route via the IGW.",
      "SSH through the custom NACL failed until outbound ephemeral ports were allowed, while security groups needed no return rule.",
      "A ping to VPC B failed after the peering was accepted and worked only after routes were added on both sides.",
      "Your flow logs contained both ACCEPT and REJECT records and you could explain each field."
    ],
    "deliverable": "A 'VPC design and test report': a diagram of both VPCs with CIDRs, subnets, route tables, IGW and peering; a route-table table per subnet; a security group vs NACL comparison backed by your SSH/ping results; a flow log excerpt with a REJECT from the internet annotated field by field; and the teardown checklist with the final empty tag search.",
    "resume": "Built and documented AWS VPC networking with the AWS CLI: public/private subnets, internet gateway and route tables, a bastion pattern, stateful security groups versus stateless NACLs, VPC peering, and VPC flow log analysis in S3, with a cost-controlled, fully scripted teardown.",
    "interview": [
      "What makes a subnet public in AWS? — Its route table has a route for 0.0.0.0/0 (or ::/0) to an internet gateway, and instances in it have public IP addresses; nothing else about the subnet is different.",
      "Security groups versus network ACLs? — Security groups are stateful, allow-only, attached to network interfaces, and evaluate all rules together; NACLs are stateless, support allow and deny, apply to whole subnets, and are evaluated in rule-number order.",
      "Is VPC peering transitive? — No. If A peers with B and B with C, A cannot reach C through B; you need a direct peering or a Transit Gateway, and CIDRs must not overlap.",
      "How would private instances reach the internet, and what does it cost? — A NAT gateway in a public subnet with a default route from the private route table; it is billed per hour and per GB processed, so for AWS services alone use VPC endpoints (the S3 and DynamoDB gateway endpoints are free) instead."
    ],
    "cleanup": [
      "Run the teardown step; if variables are gone, run 'source ~/vpc-lab.env' first.",
      "In the console, check VPC > Your VPCs, EC2 > Instances, VPC > NAT gateways and EC2 > Elastic IPs in your region are empty of lab resources.",
      "Delete ~/vpc-lab.env and the flowlogs folder when done.",
      "Check Billing and Cost Management the next day."
    ],
    "links": [
      {
        "label": "Amazon VPC User Guide",
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
      },
      {
        "label": "Amazon VPC: Control subnet traffic with network ACLs",
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html"
      },
      {
        "label": "Amazon VPC: Flow log records",
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html"
      },
      {
        "label": "Amazon VPC pricing (NAT gateway and public IPv4)",
        "url": "https://aws.amazon.com/vpc/pricing/"
      },
      {
        "label": "AWS Free Tier",
        "url": "https://aws.amazon.com/free/"
      }
    ]
  },
  {
    "id": "lab-wifi-survey",
    "title": "Wi-Fi site survey, channel plan and written design for your home or office",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free (built-in OS tools, iperf3, diagrams.net; optionally a free survey app such as the free edition of NetSpot or the open-source WiFiAnalyzer for Android)",
    "summary": "Survey a real space the way a wireless engineer does: write requirements, draw a floor plan to scale, run a passive scan of every nearby network, walk a grid recording RSSI, noise and link rate, run active throughput tests with iperf3, build a heat map, then produce a channel, width and power plan, apply it to your own access point, re-survey, and write it up as a design document.",
    "realWorld": "Wireless engineers survey before a deployment (predictive and on-site), after installation (validation) and whenever users complain. Most Wi-Fi problems are design problems: too much transmit power, too-wide channels on crowded bands, or access points in closets. The deliverable here is the same shape as a professional survey report and a strong portfolio piece for CWNA and network roles.",
    "youWillNeed": [
      "Admin access to your own Wi-Fi router or access points",
      "A laptop with Wi-Fi running Linux (iw and nmcli) or Windows 11 (netsh); VMs cannot see the Wi-Fi radio, so run the commands on the host",
      "A second computer or server wired to the network to run the iperf3 server",
      "A tape measure (or a phone measuring app) and diagrams.net for the floor plan",
      "Optional: an Android phone with WiFiAnalyzer, or NetSpot Free on Windows or macOS, for heat maps"
    ],
    "requires": [
      "lab-wifi-audit"
    ],
    "safety": "Survey only your own home or an office where you have written permission. Passive scans list only what nearby networks already broadcast; never try to join, deauthenticate or test networks you do not own. Blur SSIDs, BSSIDs and addresses of neighbors' networks in anything you publish.",
    "steps": [
      {
        "title": "Write the requirements first",
        "body": "A survey measures against targets, so decide them before walking around. Common design targets: primary signal of -67 dBm or better for voice and video calls (-70 dBm for general data), signal-to-noise ratio of at least 25 dB, and at least two access points heard at -67 dBm or better where roaming matters. List the rooms that must be covered, the devices and their capabilities (2.4 GHz only IoT, Wi-Fi 6/6E laptops), and the demanding applications.",
        "check": "You have a one-page requirements table: areas, device types, applications, RSSI and SNR targets, and any areas explicitly out of scope."
      },
      {
        "title": "Draw the floor plan to scale",
        "body": "Measure the rooms and draw them in diagrams.net with a scale bar. Mark wall materials, because attenuation differs a lot: drywall about 3 dB, glass 2 to 4 dB, brick 6 to 10 dB, concrete 10 to 20 dB, and metal, mirrors, elevators and fish tanks worse. Mark the current AP and any mesh nodes, then place survey points on a grid about every 3 m (10 ft) plus in every room that matters.",
        "check": "The plan has a scale, wall materials, AP positions and numbered survey points (usually 15 to 40 for a home)."
      },
      {
        "title": "Check what your adapter can see",
        "body": "A survey is only as good as the adapter. Record which bands and channels it supports and whether it is Wi-Fi 5, 6 or 6E (6 GHz). On Linux, find the interface name with iw dev; on Windows use netsh.",
        "cmd": "# Linux:\niw dev\niw list | grep -A 30 \"Frequencies:\" | grep -v disabled | head -40\nnmcli -f GENERAL.DEVICE,GENERAL.DRIVER device show | head\n# Windows (PowerShell):\nnetsh wlan show drivers | Select-String \"Radio types|Driver\"\nnetsh wlan show interfaces",
        "check": "You know your interface name (for example wlp2s0), the radio types it supports and whether 5 GHz DFS and 6 GHz channels are listed."
      },
      {
        "title": "Passive scan: who else is on the air",
        "body": "From the middle of the space, list every network the adapter hears with its BSSID, channel, width and signal. Repeat at two or three other points. On 2.4 GHz only channels 1, 6 and 11 do not overlap (in most regions); on 5 GHz count how many networks use each 20/40/80 MHz block.",
        "cmd": "# Linux:\nnmcli -f SSID,BSSID,CHAN,FREQ,RATE,SIGNAL,SECURITY device wifi list --rescan yes\nsudo iw dev wlp2s0 scan | grep -E \"^BSS|freq:|signal:|SSID:|channel width|\\* primary channel\"\n# Windows:\nnetsh wlan show networks mode=bssid",
        "check": "You have a table of neighbor networks per band and channel with signal levels, and you can name the busiest and quietest channels on 2.4 and 5 GHz."
      },
      {
        "title": "Record noise and channel utilization",
        "body": "Noise floor and channel busy time show interference that a network list does not. On Linux, 'iw survey dump' reports noise and how much of the time the channel was busy for every channel the adapter visited during the last scan. A typical good noise floor is around -90 to -95 dBm.",
        "cmd": "sudo iw dev wlp2s0 scan > /dev/null\niw dev wlp2s0 survey dump | grep -E \"frequency|noise|channel active time|channel busy time\"",
        "check": "You have noise and busy-time figures for your AP's channel and at least two alternatives on each band. (On Windows, note that netsh does not report noise; use the SNR estimate from a survey app instead.)"
      },
      {
        "title": "Walk the grid: signal and link rate at every point",
        "body": "Stand at each numbered point for about 20 seconds holding the laptop as a user would, and log signal, frequency and bitrates. Windows reports signal as a percentage; a rough conversion is dBm = (percent / 2) - 100.",
        "cmd": "# Linux, at each point (Ctrl+C after about 20 s):\nP=01; while true; do echo \"$(date +%T) $(iw dev wlp2s0 link | grep -E 'freq|signal|tx bitrate|rx bitrate' | tr -s ' ' | tr '\\n' ' ')\"; sleep 2; done | tee -a point-$P.txt\n# Windows PowerShell, at each point:\n1..10 | ForEach-Object { netsh wlan show interfaces | Select-String \"BSSID|Channel|Signal|Receive rate|Transmit rate\"; Start-Sleep 2 } | Out-File -Append point-01.txt",
        "check": "You have one log file per survey point with signal (dBm or %), band and rates, and a spreadsheet summarizing the median signal per point."
      },
      {
        "title": "Active survey: throughput, latency and roaming",
        "body": "Signal is not the whole story. Run iperf3 against a wired server at each point (or every other point) in both directions, and a ping to the gateway to see latency and loss. If you have mesh nodes or several APs, walk slowly between them with a continuous ping running and note where the laptop roams (the BSSID changes) and whether pings drop.",
        "cmd": "# On the wired server:\niperf3 -s\n# At each survey point on the laptop:\niperf3 -c SERVER_IP -t 10 | tail -3\niperf3 -c SERVER_IP -t 10 -R | tail -3\nping -c 20 GATEWAY_IP | tail -2\n# Roaming walk (Linux):\nwhile true; do echo \"$(date +%T) $(iw dev wlp2s0 link | grep -E 'Connected|signal' | tr '\\n' ' ')\"; sleep 1; done",
        "check": "Your spreadsheet now has upload and download Mbit/s, average latency and loss per point, and you have recorded where roaming happened (or where the client stuck to a far AP)."
      },
      {
        "title": "Build the heat map",
        "body": "Turn the numbers into a picture. Either import the floor plan into a survey app and repeat the walk with it, or color each grid point in diagrams.net by band using fixed thresholds: green at -67 dBm or better, yellow -68 to -75 dBm, red below -75 dBm. Make one map per band and one for throughput.",
        "check": "You have at least two heat maps (2.4 GHz and 5 GHz signal) with a legend, and the areas that miss the requirement are obvious."
      },
      {
        "title": "Analyze the findings",
        "body": "Compare the maps and scan data to the requirements. Look for: coverage holes; co-channel interference (neighbors on your channel at strong signal); adjacent-channel overlap on 2.4 GHz (anyone on 3, 4, 8 or 9); 40 MHz channels on 2.4 GHz; 80 or 160 MHz channels on a crowded 5 GHz band; DFS channels and whether radar events have moved your AP; far too much transmit power (a strong AP heard everywhere, but clients that cannot talk back as loudly); and sticky clients that do not roam.",
        "check": "You have a numbered findings list, each with the evidence (map, scan table or log line) and its impact on the requirements."
      },
      {
        "title": "Write the channel, width and power plan",
        "body": "For each AP and band choose channel, width and transmit power, with a one-line justification. Typical choices: 2.4 GHz at 20 MHz on 1, 6 or 11 whichever is quietest, with power turned down; 5 GHz at 40 or 80 MHz depending on how busy the band is; 6 GHz at 80 or 160 MHz if your devices support it. If coverage cannot be met, recommend AP placement (central, high, out of closets and away from metal) or an additional wired AP rather than more power.",
        "check": "Your plan table has AP, band, channel, width, transmit power, placement and justification for every radio."
      },
      {
        "title": "Apply the plan and validate",
        "body": "Screenshot the current router settings, apply your channel, width and power choices on your own equipment, wait for clients to reconnect, and repeat the survey at the same points. A validation survey is what proves the design worked.",
        "check": "You have before and after heat maps and a table of per-point signal and throughput showing where things improved, stayed the same or got worse, with an explanation for any regressions."
      },
      {
        "title": "Write the design document",
        "body": "Assemble a professional-style report: executive summary, requirements, method and tools, floor plan, passive scan results, before heat maps, findings, channel and power plan, validation results, security settings (WPA3 or WPA2-AES with protected management frames, separate guest and IoT networks), and a short bill of materials if you recommend new hardware.",
        "check": "A reader who has never been to the site could understand what was wrong, what you changed and how you proved it."
      }
    ],
    "verify": [
      "You recorded signal and throughput at every numbered survey point, before and after your changes.",
      "Your passive scan table lists neighbor networks by band and channel with signal levels.",
      "Every radio in your channel plan has a channel, width, power level and justification tied to scan data.",
      "The validation survey shows whether each requirement is now met."
    ],
    "deliverable": "A 'Wireless site survey and design' report (PDF or Markdown): requirements, scaled floor plan with survey points, neighbor scan table, noise and utilization data, before and after heat maps per band, findings with evidence, the channel/width/power plan, validation results and security recommendations. Blur all neighbors' identifiers.",
    "resume": "Performed a passive and active Wi-Fi site survey (RSSI, SNR, channel utilization, iperf3 throughput, roaming), produced heat maps and a channel, width and transmit-power plan, validated the changes with a post-change survey, and wrote a professional wireless design report.",
    "interview": [
      "What signal level do you design for, and why? — Commonly -67 dBm primary coverage with an SNR of at least 25 dB for voice and video, because below that data rates drop, retries increase and real-time traffic suffers; general data can tolerate around -70 to -75 dBm.",
      "Why not just turn the transmit power up to maximum? — Clients transmit at much lower power, so the client can hear the AP but the AP cannot hear the client; high power also increases co-channel interference and makes clients stick to distant APs instead of roaming.",
      "Why use 20 MHz channels on 2.4 GHz? — There are only three non-overlapping 20 MHz channels (1, 6, 11 in most regions); a 40 MHz channel consumes most of the band and interferes with everyone nearby.",
      "What is the difference between a predictive, passive and active survey? — Predictive models coverage from floor plans and wall materials in software; passive listens to beacons and measures signal and noise on site; active associates and measures real throughput, latency, loss and roaming."
    ],
    "cleanup": [
      "Keep your new settings if validation improved things; otherwise restore from your 'before' screenshots.",
      "Stop the iperf3 server on the wired machine.",
      "Delete raw logs that contain neighbors' SSIDs or BSSIDs once your report is finished."
    ],
    "links": [
      {
        "label": "Linux wireless documentation: iw",
        "url": "https://wireless.docs.kernel.org/en/latest/en/users/documentation/iw.html"
      },
      {
        "label": "NetworkManager: nmcli reference",
        "url": "https://networkmanager.dev/docs/api/latest/nmcli.html"
      },
      {
        "label": "iperf3 documentation",
        "url": "https://software.es.net/iperf/invoking.html"
      },
      {
        "label": "diagrams.net",
        "url": "https://www.drawio.com/"
      }
    ]
  }
]);
