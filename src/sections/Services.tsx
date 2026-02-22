import { useEffect, useRef, useState } from 'react';
import {
  Cpu,
  Monitor,
  Settings,
  Bot,
  Wifi,
  Eye,
  ArrowRight
} from 'lucide-react';
import ServiceModal from '@/components/ServiceModal';
import type { ServiceDetail } from '@/components/ServiceModal';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
  isVisible: boolean;
  onClick: () => void;
}

const ServiceCard = ({ icon: Icon, title, description, features, index, isVisible, onClick }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group perspective-1000 transition-all duration-700 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`relative glass rounded-2xl p-8 h-full transition-all duration-500 preserve-3d ${isHovered ? 'shadow-glow-lg -translate-y-2' : ''
          }`}
        style={{
          transform: isHovered ? 'rotateX(-5deg) translateY(-8px)' : 'rotateX(0) translateY(0)',
        }}
      >
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-500 ${isHovered ? 'bg-primary/20 scale-110' : ''
            }`}
        >
          <Icon className="w-8 h-8 text-primary" />
        </div>

        {/* Content */}
        <h3 className="font-heading text-xl font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Click for Details */}
        <div
          className={`inline-flex items-center gap-2 text-primary text-sm font-medium transition-all duration-300 ${isHovered ? 'gap-3' : ''
            }`}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </div>

        {/* Click Hint Badge */}
        <div
          className={`absolute top-4 right-4 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
        >
          Click to explore
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-2xl bg-primary/5 transition-opacity duration-500 -z-10 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        />
      </div>
    </div>
  );
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services: ServiceDetail[] = [
    {
      icon: Cpu,
      title: 'PLC Programming',
      description: 'Expert programming for all major PLC platforms including Siemens, Allen-Bradley, Schneider, and Mitsubishi. We design, develop, and commission control logic that optimizes every aspect of your production process.',
      features: [
        'Ladder Logic & Structured Text',
        'Siemens TIA Portal & Step 7',
        'Allen-Bradley RSLogix / Studio 5000',
        'Schneider EcoStruxure',
        'Real-time diagnostics & fault handling',
        'Remote access & monitoring',
      ],
      technologies: ['Siemens S7-1500', 'Allen-Bradley', 'Schneider Modicon', 'Mitsubishi iQ-R', 'Beckhoff TwinCAT', 'CODESYS'],
      process: [
        'Requirements gathering and P&ID review to understand control objectives.',
        'Control philosophy documentation and I/O mapping.',
        'PLC program development with modular, reusable function blocks.',
        'Offline simulation and FAT (Factory Acceptance Testing).',
        'On-site commissioning, startup, and operator training.',
      ],
      benefits: [
        { label: 'Avg. Uptime Improvement', value: '35%' },
        { label: 'Fault Response Time', value: '<2s' },
        { label: 'Projects Delivered', value: '60+' },
      ],
      caseStudy: {
        client: 'Nexgen Automotive',
        challenge: 'Outdated relay-logic control causing 8+ hours of unplanned downtime per week on their stamping line.',
        result: 'Migrated to Siemens S7-1500, implemented predictive fault detection — downtime reduced by 78% in the first month.',
      },
    },
    {
      icon: Monitor,
      title: 'SCADA Systems',
      description: 'Comprehensive SCADA solutions for real-time monitoring, control, and data acquisition. We build operator-friendly interfaces that provide full visibility into your production environment.',
      features: [
        'Custom HMI / SCADA dashboard design',
        'Wonderware System Platform',
        'WinCC & WinCC OA',
        'FactoryTalk View',
        'Ignition by Inductive Automation',
        'Historical data trending & reporting',
      ],
      technologies: ['Ignition', 'Wonderware', 'WinCC', 'FactoryTalk', 'OPC-UA', 'MQTT'],
      process: [
        'System architecture design and SCADA platform selection.',
        'Tag database configuration and communication driver setup.',
        'HMI screen development using ISA-101 design standards.',
        'Historian configuration for data logging and analytics.',
        'User acceptance testing and go-live support.',
      ],
      benefits: [
        { label: 'Avg. Downtime Reduction', value: '40%' },
        { label: 'Data Latency', value: '<100ms' },
        { label: 'Happy Clients', value: '45+' },
      ],
      caseStudy: {
        client: 'Precision Industries',
        challenge: 'No centralized monitoring across 3 production facilities — operators had no visibility into cross-site OEE.',
        result: 'Deployed enterprise Ignition SCADA with unified dashboards; OEE visibility improved, production KPIs up 22%.',
      },
    },
    {
      icon: Settings,
      title: 'Automation Integration',
      description: 'End-to-end automation solutions that seamlessly integrate with your existing infrastructure. From greenfield builds to legacy upgrades, we engineer complete, production-ready systems.',
      features: [
        'System design & engineering drawings',
        'Panel building & professional wiring',
        'Commissioning & startup support',
        'Legacy system upgrades & migrations',
        'Safety system integration (SIL 1-3)',
        'MES & ERP connectivity',
      ],
      technologies: ['EtherNet/IP', 'PROFINET', 'DeviceNet', 'Modbus TCP', 'ASi-Bus', 'IO-Link'],
      process: [
        'Site survey and existing system assessment.',
        'Detailed engineering: electrical schematics, panel layouts, BOM.',
        'Panel fabrication and pre-wiring at our facility.',
        'Installation, field wiring, and loop checks.',
        'Full system commissioning, SAT, and handover documentation.',
      ],
      benefits: [
        { label: 'Avg. ROI Timeline', value: '8mo' },
        { label: 'System Availability', value: '99.5%' },
        { label: 'Integrations Done', value: '80+' },
      ],
      caseStudy: {
        client: 'MaplePak Foods',
        challenge: 'Manual packaging line with 3 operators per shift, high labor cost, and inconsistent throughput.',
        result: 'Full automation integration reduced headcount by 2 per shift, throughput increased 55%, ROI achieved in 7 months.',
      },
    },
    {
      icon: Bot,
      title: 'Robotics Integration',
      description: 'Industrial robot programming and integration for manufacturing automation. We handle everything from simulation to final commissioning, including collaborative robot deployments.',
      features: [
        'ABB RobotStudio programming',
        'KUKA KRC4 / KRC5 programming',
        'FANUC RoboGuide simulation',
        'Collaborative Robots (Cobots)',
        'End-of-arm tooling design',
        'Vision-guided robotics',
      ],
      technologies: ['ABB', 'KUKA', 'FANUC', 'Universal Robots', 'Yaskawa', 'Stäubli'],
      process: [
        'Application feasibility study and cycle time analysis.',
        'Offline programming and 3D simulation to validate reach and cycle times.',
        'Safety risk assessment and guarding design (ISO 10218).',
        'On-site installation, calibration, and robot-to-PLC integration.',
        'Operator and maintenance staff training.',
      ],
      benefits: [
        { label: 'Cycle Time Reduction', value: '50%' },
        { label: 'Repeatability', value: '±0.02mm' },
        { label: 'Robot Cells Deployed', value: '35+' },
      ],
      caseStudy: {
        client: 'SteelForge Corp',
        challenge: 'Manual MIG welding causing inconsistent weld quality and high rework rates (12%).',
        result: 'Integrated 2x ABB IRB 1600 welding robots with vision guidance; rework rate dropped to <1%, throughput up 3x.',
      },
    },
    {
      icon: Wifi,
      title: 'IoT Solutions',
      description: 'Smart factory implementations with Industrial IoT sensors and connectivity. We bridge the gap between your shop floor and the cloud, enabling real-time insights and predictive capabilities.',
      features: [
        'Industrial sensor integration',
        'Edge computing & data pre-processing',
        'Cloud connectivity (AWS, Azure, GCP)',
        'Predictive maintenance algorithms',
        'OEE monitoring dashboards',
        'Custom mobile & web apps',
      ],
      technologies: ['AWS IoT', 'Azure IoT Hub', 'Node-RED', 'InfluxDB', 'Grafana', 'MQTT', 'Sparkplug B'],
      process: [
        'Asset mapping and sensor strategy planning.',
        'Edge device deployment and network topology design.',
        'Cloud platform setup and data pipeline configuration.',
        'Dashboard and alerting system development.',
        'Ongoing monitoring, model tuning, and support.',
      ],
      benefits: [
        { label: 'Avg. Maintenance Cost Reduction', value: '30%' },
        { label: 'Data Refresh Rate', value: '1s' },
        { label: 'IoT Deployments', value: '25+' },
      ],
      caseStudy: {
        client: 'NorthStar Mining',
        challenge: 'Unexpected motor failures causing costly emergency shutdowns in a remote facility.',
        result: 'Deployed vibration + thermal IoT sensors with ML-based anomaly detection; prevented 4 major failures in first 6 months.',
      },
    },
    {
      icon: Eye,
      title: 'Vision Systems',
      description: 'Machine vision solutions for quality control and inspection automation. We design and implement vision systems that detect defects, measure dimensions, and guide robots with sub-millimeter precision.',
      features: [
        'Cognex VisionPro & In-Sight',
        'Keyence CV-X Series',
        'AI-powered defect detection',
        'Dimensional measurement & gauging',
        'OCR / barcode reading',
        'Robot guidance & bin picking',
      ],
      technologies: ['Cognex', 'Keyence', 'Basler', 'OpenCV', 'HALCON', 'TensorFlow (edge)'],
      process: [
        'Sample part analysis and imaging requirements specification.',
        'Camera, lens, and lighting system selection and design.',
        'Vision algorithm development and training (for AI models).',
        'Integration with PLC, robot, or conveyor reject systems.',
        'Production validation, golden sample library setup, and training.',
      ],
      benefits: [
        { label: 'Defect Detection Accuracy', value: '99.8%' },
        { label: 'Inspection Speed', value: '<50ms' },
        { label: 'Vision Systems Deployed', value: '40+' },
      ],
      caseStudy: {
        client: 'CircuitMaster Electronics',
        challenge: 'Manual visual inspection of PCBs missing 3–5% of defects, leading to field returns and warranty claims.',
        result: 'Deployed Cognex-based AOI (Automated Optical Inspection); defect escape rate reduced to 0.02%, saving $400K/year.',
      },
    },
  ];

  return (
    <>
      <section
        id="services"
        ref={sectionRef}
        className="relative py-24 lg:py-32 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* Section Label */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm text-white/80">Our Solutions</span>
            </div>

            {/* Heading */}
            <h2
              className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              Services We <span className="text-gradient">Offer</span>
            </h2>

            {/* Description */}
            <p
              className={`text-white/70 text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              From concept to commissioning, we provide comprehensive automation solutions
              tailored to your specific manufacturing needs.{' '}
              <span className="text-primary/80">Click any card to explore details.</span>
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                index={index}
                isVisible={isVisible}
                onClick={() => setActiveService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  );
};

export default Services;
