// Shared projects data used on both the homepage (Projects.tsx) 
// and the full ProjectsPage

export interface Project {
    id: string;
    image: string;
    gallery?: string[];
    title: string;
    category: string;
    tags: string[];
    location: string;
    year: string;
    duration: string;
    client: string;
    description: string;
    results: string[];
    techStack: string[];
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: 'automated-assembly-line',
        image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80',
        title: 'Automated Assembly Line',
        category: 'Automation',
        tags: ['Automation', 'PLC'],
        location: 'Toronto, Canada',
        year: '2024',
        duration: '6 months',
        client: 'Nexgen Automotive',
        description: 'Complete automation of automotive parts assembly line with 12 robotic stations and integrated quality control. The project involved migrating from manual operations to a fully automated system with real-time monitoring.',
        results: ['78% reduction in unplanned downtime', '3x throughput increase', 'ROI achieved in 7 months'],
        techStack: ['Siemens S7-1500', 'WinCC', 'ABB Robots', 'EtherNet/IP'],
        featured: true,
    },
    {
        id: 'smart-factory-iot',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        title: 'Smart Factory IoT Platform',
        category: 'IoT',
        tags: ['IoT', 'SCADA'],
        location: 'Vancouver, Canada',
        year: '2024',
        duration: '4 months',
        client: 'NorthStar Mining',
        description: 'Industry 4.0 implementation with real-time monitoring, predictive maintenance, and cloud analytics. Sensor data from 200+ assets is fed into a cloud dashboard for actionable insights.',
        results: ['30% reduction in maintenance costs', '4 major failures prevented in 6 months', '100% asset visibility'],
        techStack: ['AWS IoT', 'InfluxDB', 'Grafana', 'MQTT', 'Node-RED'],
        featured: true,
    },
    {
        id: 'robotic-welding-cell',
        image: 'https://images.unsplash.com/photo-1563191911-e65a18b80825?w=800&q=80',
        title: 'Robotic Welding Cell',
        category: 'Robotics',
        tags: ['Robotics', 'Vision'],
        location: 'Calgary, Canada',
        year: '2023',
        duration: '5 months',
        client: 'SteelForge Corp',
        description: 'High-precision robotic welding system for structural steel fabrication with vision guidance. Two ABB IRB 1600 welding robots with vision-guided seam tracking replaced manual MIG welding.',
        results: ['Rework rate dropped from 12% to <1%', '3x throughput increase', '$400K annual savings'],
        techStack: ['ABB IRB 1600', 'RobotStudio', 'Cognex Vision', 'Allen-Bradley PLC'],
        featured: true,
    },
    {
        id: 'vision-quality-system',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        title: 'PCB Vision Quality System',
        category: 'Vision Systems',
        tags: ['Vision', 'AI'],
        location: 'Montreal, Canada',
        year: '2023',
        duration: '3 months',
        client: 'CircuitMaster Electronics',
        description: 'AI-powered machine vision system for defect detection in electronic component manufacturing. The system inspects 1,200 boards/hour at 99.8% accuracy using a custom-trained deep learning model.',
        results: ['99.8% defect detection accuracy', 'Escape rate reduced to 0.02%', '$400K/year in warranty savings'],
        techStack: ['Cognex VisionPro', 'Basler Cameras', 'TensorFlow (Edge)', 'HALCON'],
    },
    {
        id: 'scada-multi-site',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        title: 'Multi-Site SCADA Platform',
        category: 'SCADA',
        tags: ['SCADA', 'IoT'],
        location: 'Ontario, Canada',
        year: '2023',
        duration: '8 months',
        client: 'Precision Industries',
        description: 'Enterprise-wide SCADA deployment connecting 3 production facilities under a single unified monitoring platform. Real-time OEE dashboards with cross-site KPI benchmarking and automated alarming.',
        results: ['22% improvement in overall OEE', '40% reduction in alarm response time', 'Unified view of all 3 sites'],
        techStack: ['Ignition SCADA', 'OPC-UA', 'SQL Server', 'Perspective Module'],
    },
    {
        id: 'cobot-packaging',
        image: 'https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=800&q=80',
        title: 'Collaborative Robot Packaging',
        category: 'Robotics',
        tags: ['Robotics', 'Automation'],
        location: 'Mississauga, Canada',
        year: '2024',
        duration: '3 months',
        client: 'MaplePak Foods',
        description: 'Deployment of 4 Universal Robot UR10 collaborative robots for pick-and-place packaging. The cobots work alongside human operators without safety fencing, increasing throughput while maintaining flexibility.',
        results: ['55% throughput increase', '2 operators freed per shift', 'ROI in 7 months'],
        techStack: ['Universal Robots UR10', 'OnRobot Grippers', 'Siemens PLC', 'Conveyor Integration'],
    },
    {
        id: 'predictive-maintenance',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        title: 'Predictive Maintenance System',
        category: 'IoT',
        tags: ['IoT', 'AI'],
        location: 'Edmonton, Canada',
        year: '2024',
        duration: '4 months',
        client: 'PetroCan Processing',
        description: 'Industrial IoT solution with ML-based anomaly detection for rotating equipment. Vibration, temperature, and current sensors on 80 motors with edge-to-cloud data pipeline and automated maintenance work orders.',
        results: ['60% reduction in unplanned stoppages', '25% maintenance cost reduction', 'MTBF increased by 40%'],
        techStack: ['Azure IoT Hub', 'Edge Gateway', 'InfluxDB', 'Python ML', 'Power BI'],
    },
    {
        id: 'plc-migration',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80',
        title: 'Legacy PLC Migration',
        category: 'Automation',
        tags: ['PLC', 'Automation'],
        location: 'Windsor, Canada',
        year: '2022',
        duration: '10 months',
        client: 'AutoPress Industries',
        description: 'Complete migration of 24 aging Siemens S5 PLCs to modern S7-1500 platform across a stamping facility. Project included full I/O mapping, program conversion, factory and site acceptance testing, with zero production loss.',
        results: ['Zero production downtime during cutover', '60% faster fault diagnosis', '15-year lifespan extension'],
        techStack: ['Siemens S7-1500', 'TIA Portal', 'PROFINET', 'WinCC Comfort'],
    },
];

export const projectCategories = ['All', 'Automation', 'Robotics', 'SCADA', 'IoT', 'Vision Systems'];
