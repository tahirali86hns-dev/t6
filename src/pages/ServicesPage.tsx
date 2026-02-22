import Services from '@/sections/Services';

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24">
            {/* Page Header */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-white/80">What We Do</span>
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Our <span className="text-gradient">Services</span>
                </h1>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    From PLC programming to full IoT deployments — explore our comprehensive suite of industrial
                    automation services. Click any card to learn more.
                </p>
            </div>

            {/* Services Section (reuse existing component) */}
            <Services />

            {/* Why Choose Us */}
            <section className="py-24 border-t border-white/5">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm text-white/80">Why Cybotics</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
                            Why Choose <span className="text-gradient">Us</span>
                        </h2>
                        <p className="text-white/70">
                            We don't just install systems — we engineer solutions that deliver measurable, lasting results.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                number: '01',
                                title: 'Vendor-Neutral Expertise',
                                desc: 'We work with all major automation platforms and recommend the best technology for your specific needs — not what benefits us.',
                            },
                            {
                                number: '02',
                                title: 'End-to-End Accountability',
                                desc: 'A single point of contact from design through commissioning means no finger-pointing and faster project delivery.',
                            },
                            {
                                number: '03',
                                title: '24/7 Ongoing Support',
                                desc: 'Our relationship doesn\'t end at handover. We provide continuous support, remote monitoring, and rapid on-site response.',
                            },
                        ].map((item) => (
                            <div key={item.number} className="glass rounded-2xl p-8">
                                <span className="font-heading text-5xl font-bold text-white/10">{item.number}</span>
                                <h3 className="font-heading text-xl font-semibold text-white mt-4 mb-3">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
