// Blog data for the Cybotics Insights section

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: BlogSection[];
    author: string;
    authorRole: string;
    authorImage: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    image: string;
    featured?: boolean;
}

export interface BlogSection {
    type: 'paragraph' | 'heading' | 'list' | 'callout';
    text?: string;
    items?: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'industry-4-0-guide-manufacturers',
        title: "Industry 4.0: The Complete Guide for Canadian Manufacturers",
        excerpt: "Industry 4.0 is no longer a buzzword - it's a competitive necessity. Here's how to navigate your digital transformation journey without disrupting production.",
        author: 'David Chen',
        authorRole: 'CEO & Lead Engineer',
        authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
        date: '2024-12-15',
        readTime: '8 min read',
        category: 'Industry Insights',
        tags: ['Industry 4.0', 'Digital Transformation', 'IIoT', 'Manufacturing'],
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        featured: true,
        content: [
            { type: 'paragraph', text: "Industry 4.0 represents the fourth industrial revolution - characterized by the fusion of the digital and physical worlds through cyber-physical systems, the Internet of Things (IoT), and cloud computing. For Canadian manufacturers, embracing Industry 4.0 is no longer optional." },
            { type: 'heading', text: 'What Does Industry 4.0 Actually Mean for Your Plant?' },
            { type: 'paragraph', text: "At its core, Industry 4.0 means your machines, systems, and processes are connected, communicating, and making data-driven decisions in real time. This translates to real, measurable outcomes: reduced downtime, lower operating costs, and higher throughput." },
            { type: 'heading', text: 'The 4 Pillars of Your Digital Transformation' },
            { type: 'list', items: ['Connected Systems - OPC-UA, MQTT, and EtherNet/IP linking your PLCs, robots, and sensors', 'Data Visibility - Real-time dashboards and historian databases (InfluxDB, SQL Server)', 'Predictive Analytics - ML models detecting anomalies before failures occur', 'Cloud Integration - Scalable storage and analytics on AWS, Azure, or GCP'] },
            { type: 'heading', text: 'Where to Start' },
            { type: 'paragraph', text: "The most common mistake manufacturers make is trying to do everything at once. Start with a single production line, instrument it with sensors, and build a simple SCADA dashboard. Once you see results, scale from there." },
            { type: 'callout', text: 'Pro Tip: A successful Industry 4.0 journey starts with data - not technology. Before buying any hardware, map your existing processes and identify your top 3 pain points.' },
            { type: 'paragraph', text: "Cybotics has guided over 85 Canadian manufacturers through their digital transformation. Our phased approach minimizes disruption while delivering measurable ROI at every stage." },
        ],
    },
    {
        id: '2',
        slug: 'plc-vs-dcs-choosing-right-system',
        title: 'PLC vs DCS: How to Choose the Right Control System for Your Application',
        excerpt: "Both PLCs and DCS can solve your control problem - but choosing the wrong one is expensive. We break down the decision once and for all.",
        author: 'James Rodriguez',
        authorRole: 'Automation Architect',
        authorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
        date: '2024-11-28',
        readTime: '6 min read',
        category: 'Technical',
        tags: ['PLC', 'DCS', 'Control Systems', 'Engineering'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        content: [
            { type: 'paragraph', text: "One of the most common questions we get from plant engineers is: should we use a PLC or a DCS? While both systems perform process control, choosing the right one for your application can mean the difference between a system that runs flawlessly and one that's constantly patched." },
            { type: 'heading', text: 'PLCs: Speed, Flexibility, and Discrete Control' },
            { type: 'paragraph', text: "Programmable Logic Controllers excel in discrete manufacturing - assembly lines, packaging, stamping presses, and robotic cells. They are fast (sub-millisecond scan times), cost-effective, and available from every major vendor (Siemens, Allen-Bradley, Schneider)." },
            { type: 'heading', text: 'DCS: Continuous Process and Complex Loops' },
            { type: 'paragraph', text: "Distributed Control Systems shine in continuous process industries - oil & gas, chemicals, food processing, and utilities. They offer superior loop management, built-in redundancy, and tighter integration with process historians." },
            { type: 'heading', text: 'Decision Matrix' },
            { type: 'list', items: ['Choose PLC if: discrete control, fast cycle times, lower budget, modular expansion', 'Choose PLC if: discrete control, fast cycle times, lower budget, modular expansion', 'Choose DCS if: continuous process, 100+ control loops, high redundancy requirements, large plant', 'Consider hybrid: modern PLC platforms (Siemens S7-1500, Rockwell PlantPAx) blur the line'] },
            { type: 'callout', text: 'Rule of thumb: Under 500 I/O points with primarily discrete logic -> PLC. Over 500 I/O with significant analog loops -> DCS or hybrid.' },
        ],
    },
    {
        id: '3',
        slug: 'predictive-maintenance-roi-calculator',
        title: 'How to Calculate the ROI of Predictive Maintenance Before You Buy',
        excerpt: "Predictive maintenance sounds expensive. But when you run the numbers, it almost always pays off faster than you think. Here's the formula we use.",
        author: 'Sarah Mitchell',
        authorRole: 'Head of IoT Solutions',
        authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
        date: '2024-11-05',
        readTime: '5 min read',
        category: 'ROI & Business',
        tags: ['Predictive Maintenance', 'ROI', 'IoT', 'Cost Savings'],
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        content: [
            { type: 'paragraph', text: "The number one barrier to adopting predictive maintenance isn't technology - it's justifying the investment to management. Here's the exact ROI model we walk our clients through before any project starts." },
            { type: 'heading', text: 'Step 1: Calculate Your Current Failure Cost' },
            { type: 'list', items: ['Average downtime per failure x hourly production loss', 'Average emergency maintenance cost (parts + labour + expedited shipping)', 'Annual failure frequency x above costs = total annual failure cost'] },
            { type: 'heading', text: 'Step 2: Estimate Avoidable Failures' },
            { type: 'paragraph', text: "Industry data shows that vibration and thermal monitoring can predict 60-80% of rotating equipment failures 2-6 weeks in advance. Apply a conservative 50% avoidance rate to your failure cost." },
            { type: 'heading', text: 'Step 3: Calculate Predictive Maintenance Cost' },
            { type: 'list', items: ['Sensor hardware: $200-$800 per monitoring point', 'Edge gateway + cloud platform: $5,000-$20,000 setup', 'Annual software + support: $3,000-$10,000'] },
            { type: 'callout', text: 'Real Example: A client with 50 critical motors and $15K average failure cost achieved full ROI in 9 months after deploying vibration monitoring across all assets.' },
        ],
    },
    {
        id: '4',
        slug: 'robot-safety-standards-iso-10218',
        title: 'Robot Safety in the Workplace: ISO 10218 & What You Need to Know',
        excerpt: "As regulatory bodies tighten requirements on industrial robotics, staying compliant protects your workers and your business. Here's what the standards require.",
        author: 'Emily Zhang',
        authorRole: 'Robotics Safety Engineer',
        authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
        date: '2024-10-20',
        readTime: '7 min read',
        category: 'Safety & Compliance',
        tags: ['Robotics', 'Safety', 'ISO 10218', 'Compliance'],
        image: 'https://images.unsplash.com/photo-1563191911-e65a18b80825?w=800&q=80',
        content: [
            { type: 'paragraph', text: "With the rapid adoption of industrial robots in Canadian manufacturing, workplace safety compliance has never been more critical. ISO 10218 (Parts 1 & 2) is the primary international standard governing industrial robot safety - and inspectors are paying close attention." },
            { type: 'heading', text: 'What ISO 10218 Covers' },
            { type: 'list', items: ['Part 1: Robot design requirements (manufacturer obligations)', 'Part 2: Robot system integration (your obligations as the system integrator)', 'Risk assessment methodology (ISO 12100)', 'Safety function requirements and SIL levels'] },
            { type: 'heading', text: 'Collaborative Robot (Cobot) Considerations - TS 15066' },
            { type: 'paragraph', text: "Collaborative robots operating without safety fencing must comply with ISO/TS 15066, which defines power and force limits for hand-guided, speed-and-separation monitoring, and power/force limiting modes. Non-compliance exposes you to liability." },
            { type: 'callout', text: "Important: Every robot cell integration must include a documented risk assessment. This isn't just good practice - it's required by law in most Canadian provinces and many US states." },
        ],
    },
    {
        id: '5',
        slug: 'scada-cybersecurity-best-practices',
        title: 'OT Cybersecurity: Protecting Your SCADA Systems in 2025',
        excerpt: "Industrial control system attacks increased 140% in 2023. Your SCADA system may be more exposed than you think. Here's how to harden it.",
        author: 'David Chen',
        authorRole: 'CEO & Lead Engineer',
        authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
        date: '2024-09-12',
        readTime: '9 min read',
        category: 'Cybersecurity',
        tags: ['SCADA', 'OT Security', 'Cybersecurity', 'ICS'],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        content: [
            { type: 'paragraph', text: "The Purdue Model was built for a different era. Today, IT/OT convergence and the push for cloud connectivity has dissolved traditional air gaps, leaving SCADA systems exposed to threats that didn't exist when your control system was designed." },
            { type: 'heading', text: 'The Current Threat Landscape' },
            { type: 'list', items: ['Ransomware targeting OT networks (Colonial Pipeline, JBS Foods)', 'Supply chain attacks through vendor remote access', 'Legacy Windows HMI systems with unpatched CVEs', 'Unencrypted OPC-DA / Modbus communications'] },
            { type: 'heading', text: 'Defense-in-Depth: The 5-Layer Approach' },
            { type: 'list', items: ['Layer 1: Network segmentation (IDMZ, industrial DMZ)', 'Layer 2: Patch management and vulnerability scanning', 'Layer 3: Privileged access management for remote vendors', 'Layer 4: Anomaly detection (Claroty, Dragos, Nozomi)', 'Layer 5: Incident response plan specific to OT systems'] },
            { type: 'callout', text: "Quick Win: If you're running Windows 7 or older on any HMI, that's your #1 priority. An air-gapped HMI is not protected if a USB drive can reach it." },
        ],
    },
];

export const blogCategories = ['All', 'Industry Insights', 'Technical', 'ROI & Business', 'Safety & Compliance', 'Cybersecurity'];
