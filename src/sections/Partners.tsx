import { useEffect, useRef, useState } from 'react';

const Partners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: 'Siemens', category: 'PLC & Drives' },
    { name: 'Allen-Bradley', category: 'Automation' },
    { name: 'Schneider', category: 'Power & Control' },
    { name: 'ABB', category: 'Robotics' },
    { name: 'KUKA', category: 'Robotics' },
    { name: 'FANUC', category: 'CNC & Robots' },
    { name: 'Wonderware', category: 'SCADA' },
    { name: 'Ignition', category: 'IIoT Platform' },
    { name: 'Cognex', category: 'Vision Systems' },
    { name: 'Keyence', category: 'Sensors' },
    { name: 'Sick', category: 'Safety Systems' },
    { name: 'Pilz', category: 'Safety' },
  ];

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Section Label */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm text-white/80">Partners & Technologies</span>
          </div>

          {/* Heading */}
          <h2
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Technologies We <span className="text-gradient">Work With</span>
          </h2>

          {/* Description */}
          <p
            className={`text-white/70 text-lg transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            We partner with industry-leading technology providers to deliver 
            best-in-class automation solutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`group glass rounded-xl p-6 text-center hover-lift transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <span className="font-heading text-lg font-bold text-primary">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <div className="font-heading text-sm font-semibold text-white mb-1">
                {partner.name}
              </div>
              <div className="text-white/50 text-xs">
                {partner.category}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div
          className={`mt-16 glass rounded-2xl p-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: 'ISO 9001', label: 'Quality Management' },
              { value: 'CSA Certified', label: 'Electrical Safety' },
              { value: 'TSSA Licensed', label: 'Pressure Systems' },
            ].map((cert) => (
              <div key={cert.value} className="group">
                <div className="font-heading text-2xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                  {cert.value}
                </div>
                <div className="text-white/60 text-sm">{cert.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
