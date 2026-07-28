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
- Every panel includes an inline SVG visualization built from plain React, no charting library required.

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
    Tabs.js
    ResultRow.js
    BinaryOctetGrid.js
    RangeVisual.js
    CidrCalculator.js
    VlsmPlanner.js
    Ipv6Calculator.js
  lib/
    subnet.js
    vlsm.js
    ipv6.js
```
