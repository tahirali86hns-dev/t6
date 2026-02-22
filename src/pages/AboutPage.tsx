import { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, Shield, Users, Award, Clock, Briefcase, Globe } from 'lucide-react';

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const values = [
        {
            icon: Target,
            title: 'Precision',
            description: 'Every solution engineered with meticulous attention to detail and accuracy.',
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'Cutting-edge technologies that push the boundaries of automation.',
        },
        {
            icon: Shield,
            title: 'Reliability',
            description: 'Robust systems designed for 24/7 operation with minimal downtime.',
        },
        {
            icon: Users,
            title: 'Partnership',
            description: 'Long-term relationships built on trust, transparency, and results.',
        },
    ];

    const stats = [
        { icon: Briefcase, value: '150+', label: 'Projects Completed' },
        { icon: Users, value: '85+', label: 'Happy Clients' },
        { icon: Clock, value: '12+', label: 'Years Experience' },
        { icon: Globe, value: '5+', label: 'Countries Served' },
    ];

    const team = [
        {
            name: 'David Chen',
            role: 'CEO & Lead Engineer',
            expertise: 'PLC & SCADA Systems',
            experience: '18 years',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        },
        {
            name: 'Sarah Mitchell',
            role: 'Head of Robotics',
            expertise: 'ABB, KUKA, FANUC',
            experience: '14 years',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        },
        {
            name: 'James Rodriguez',
            role: 'IoT Solutions Architect',
            expertise: 'Industry 4.0 & Cloud',
            experience: '10 years',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
        },
        {
            name: 'Emily Zhang',
            role: 'Vision Systems Lead',
            expertise: 'Cognex & Machine Learning',
            experience: '8 years',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
        },
    ];

    const milestones = [
        { year: '2012', title: 'Founded', desc: 'Cybotics established in Toronto, Ontario with a team of 3 engineers.' },
        { year: '2015', title: 'First Major Contract', desc: 'Secured a $2M automation contract with Nexgen Automotive, our largest at the time.' },
        { year: '2018', title: 'Robotics Division', desc: 'Launched dedicated robotics integration division with certified ABB and KUKA partners.' },
        { year: '2020', title: 'IoT & Industry 4.0', desc: 'Expanded into Industrial IoT and predictive maintenance solutions.' },
        { year: '2022', title: '100th Project', desc: 'Celebrated our 100th successfully completed automation project.' },
        { year: '2024', title: 'National Presence', desc: 'Offices in Toronto, Calgary, and Vancouver. 45+ team members.' },
    ];

    const certifications = [
        'ISA Certified Automation Professional (CAP)',
        'Siemens TIA Portal Certified',
        'Rockwell Authorized System Integrator',
        'Ignition Gold Integrator (Inductive Automation)',
        'ISO 9001:2015 Certified',
        'ABB Certified Robot Integrator',
    ];

    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center">
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-white/80">Our Story</span>
                    </div>
                    <h1
                        className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                    >
                        About <span className="text-gradient">Cybotics</span>
                    </h1>
                    <p
                        className={`text-white/70 text-lg max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                    >
                        We are a leading industrial automation company with over 12 years of experience helping
                        manufacturers across Canada transform their operations with precision engineering and
                        cutting-edge technology.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 border-y border-white/5">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`text-center group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                    }`}
                                style={{ transitionDelay: `${i * 100 + 300}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                    <stat.icon className="w-7 h-7 text-primary" />
                                </div>
                                <div className="font-heading text-4xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-white/60 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-24" ref={sectionRef}>
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-sm text-white/80">Who We Are</span>
                            </div>
                            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
                                Engineering the Future of <span className="text-gradient">Manufacturing</span>
                            </h2>
                            <div className="space-y-4 text-white/70 text-base leading-relaxed">
                                <p>
                                    Cybotics was founded in 2012 by a group of passionate automation engineers who saw an
                                    opportunity to bring enterprise-level automation expertise to Canadian manufacturers of all sizes.
                                </p>
                                <p>
                                    Today, we are a team of 45+ certified engineers, technicians, and project managers
                                    delivering turnkey automation solutions — from consultation and design to installation,
                                    commissioning, and ongoing support.
                                </p>
                                <p>
                                    Our commitment to quality, innovation, and long-term client partnerships has made us
                                    one of Canada's most trusted automation integrators, with clients spanning automotive,
                                    food & beverage, mining, electronics, and more.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="glass rounded-xl p-6 hover-lift group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                                        <value.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-heading text-lg font-semibold text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 border-t border-white/5">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm text-white/80">Our Team</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                            Meet the <span className="text-gradient">Experts</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="glass rounded-2xl p-6 text-center hover-lift group">
                                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-heading text-lg font-semibold text-white mb-1">{member.name}</h3>
                                <p className="text-primary text-sm mb-2">{member.role}</p>
                                <p className="text-white/50 text-xs mb-1">{member.expertise}</p>
                                <p className="text-white/40 text-xs">{member.experience} experience</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 border-t border-white/5">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm text-white/80">Our Journey</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                            Company <span className="text-gradient">Milestones</span>
                        </h2>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10" />
                        {milestones.map((m, i) => (
                            <div
                                key={m.year}
                                className={`relative flex gap-8 mb-10 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className="glass rounded-xl p-5 inline-block max-w-xs w-full">
                                        <span className="text-primary font-heading font-bold text-lg">{m.year}</span>
                                        <h4 className="font-heading text-white font-semibold mt-1 mb-2">{m.title}</h4>
                                        <p className="text-white/60 text-sm">{m.desc}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 top-5 w-4 h-4 rounded-full bg-primary border-4 border-cybotics-black z-10" />
                                <div className="flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-24 border-t border-white/5">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm text-white/80">Credentials</span>
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-white">
                            Certifications & <span className="text-gradient">Partnerships</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {certifications.map((cert) => (
                            <div key={cert} className="glass rounded-xl p-4 flex items-center gap-3">
                                <Award className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-white/80 text-sm">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
