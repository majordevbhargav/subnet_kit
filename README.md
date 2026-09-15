# SubnetKit

A browser-based IPv4, IPv6, CIDR, VLSM, route-summarization, and DNS utility built with Next.js. Each calculation is paired with a visual representation of the address space or network structure.

## Features

- IPv4 subnet calculator
- CIDR and subnet-mask calculations
- VLSM planning
- IPv6 prefix calculations
- Supernetting and route summarization
- IPv4 binary, hexadecimal, and integer conversion
- Reverse DNS / PTR name generation
- Subnet list generation
- Inline network and address visualizations
- Light and dark presentation themes

## Tech Stack

- Next.js
- React
- JavaScript
- SVG-based visualizations

## Project Structure

```text
subnetkit/
├── app/
│   ├── layout.js
│   └── page.js
├── components/
│   ├── CidrCalculator.js
│   ├── VlsmPlanner.js
│   ├── Ipv6Calculator.js
│   ├── SupernetTool.js
│   ├── IpConverterTool.js
│   ├── ReverseDnsTool.js
│   └── SubnetListTool.js
└── lib/
    ├── subnet.js
    ├── vlsm.js
    ├── ipv6.js
    ├── supernet.js
    ├── ipconvert.js
    ├── reversedns.js
    └── subnetlist.js
```

## Running Locally

```bash
git clone https://github.com/majordevbhargav/subnet_kit.git
cd subnet_kit
npm install
npm run dev
```

Open `http://localhost:3000`.

## Why It Exists

Subnetting is easier to reason about when the arithmetic and the resulting address space are visible together. This project is both a networking utility and a practical frontend exercise.

## Future Direction

- IPv6 subnet planning improvements
- Better validation and edge-case handling
- Exportable subnet plans
- Network design templates
- More routing and address-management utilities

## Author

**Dev Bhargav**

- GitHub: https://github.com/majordevbhargav
- LinkedIn: https://www.linkedin.com/in/devbhargav100
