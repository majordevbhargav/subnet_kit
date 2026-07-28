# subnetkit

An IPv4 subnet and CIDR calculator, a VLSM planner, and an IPv6 prefix calculator, built with Next.js. Every
result is paired with a live visualization: a bit level grid showing which bits are network versus host, and
a range bar showing the network address, usable host range, and broadcast address.

## Features

- IPv4 subnet calculator: enter an address and a prefix (or paste address/prefix together, such as
  10.0.0.0/24) and get the network address, broadcast address, subnet mask, wildcard mask, first and last
  usable host, total and usable host counts, address class, and public/private scope.
- VLSM planner: enter a base network and a list of segments with the number of hosts each one needs, sorted
  automatically from largest to smallest, and get an allocation plan with no wasted address space.
- IPv6 prefix calculator: enter an address and prefix length and get the compressed network address, the
  last address in the block, and the address count for that prefix.
- Supernetting / route summarization: enter two or more networks and get the smallest single CIDR block
  that covers all of them, with a bar showing where each one sits inside the summarized route.
- IP converter: turn any IPv4 address into its binary, hexadecimal, and unsigned 32 bit integer forms.
- Reverse DNS: generate the PTR record name for an address, plus the reverse zone name at the /24, /16,
  and /8 boundaries.
- Subnet list view: split a base network into every subnet at a chosen prefix length and see them all in
  one table (capped at 512 rows so the list stays readable).
- Every panel includes an inline SVG visualization built from plain React, no charting library required.
- A toggle in the header switches between a dark "blue" theme and a minimal "white" theme.

## Running locally

```
npm install
npm run dev
```

Then open http://localhost:3000.



## Project structure

```
subnetkit/
  app/
    layout.js
    page.js
  components/
    theme.js
    ThemeContext.js
    Tabs.js
    ResultRow.js
    BinaryOctetGrid.js
    RangeVisual.js
    CidrCalculator.js
    VlsmPlanner.js
    Ipv6Calculator.js
    SupernetTool.js
    IpConverterTool.js
    ReverseDnsTool.js
    SubnetListTool.js
  lib/
    subnet.js
    vlsm.js
    ipv6.js
    supernet.js
    ipconvert.js
    reversedns.js
    subnetlist.js
```
