import { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, Shield, Users } from 'lucide-react';

const About = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images Column */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <div
                className={`col-span-2 relative overflow-hidden rounded-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                  }`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/about-1.jpg`}
                  alt="Factory Worker"
                  className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cybotics-black/60 to-transparent" />
              </div>

              {/* Secondary Image */}
              <div
                className={`relative overflow-hidden rounded-2xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/about-2.jpg`}
                  alt="Robotic Arm"
                  className="w-full h-48 lg:h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cybotics-black/60 to-transparent" />
              </div>

              {/* Stats Card */}
              <div
                className={`glass rounded-2xl p-6 flex flex-col justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
              >
                <div className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-2">
                  98<span className="text-white">%</span>
                </div>
                <div className="text-white/70 text-sm">Client Satisfaction Rate</div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-2xl" />
          </div>

          {/* Content Column */}
          <div>
            {/* Section Label */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm text-white/80">About Us</span>
            </div>

            {/* Heading */}
            <h2
              className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              Who We <span className="text-gradient">Are</span>
            </h2>

            {/* Description */}
            <div
              className={`space-y-4 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              <p className="text-white/70 text-lg leading-relaxed">
                Cybotics is a leading provider of industrial automation solutions, specializing in
                PLC programming, SCADA systems, robotics integration, and IoT implementations.
                With over a decade of experience, we help manufacturers optimize their operations
                and embrace Industry 4.0.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Our team of certified engineers and technicians brings unparalleled expertise
                to every project, ensuring seamless integration, minimal downtime, and maximum
                return on investment for our clients.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`glass rounded-xl p-5 hover-lift group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
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
      </div>
    </section>
  );
};

export default About;
