import { useEffect, useRef, useState } from 'react';
import { MessageSquare, PenTool, Wrench, Headphones } from 'lucide-react';

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: 'Consultation',
      description: 'We begin by understanding your unique challenges, goals, and requirements. Our experts analyze your current systems and identify opportunities for optimization.',
    },
    {
      icon: PenTool,
      number: '02',
      title: 'Design',
      description: 'Our engineering team develops a comprehensive solution architecture, including system design, hardware selection, and software specifications tailored to your needs.',
    },
    {
      icon: Wrench,
      number: '03',
      title: 'Implementation',
      description: 'We execute the project with precision, handling installation, programming, testing, and commissioning to ensure seamless integration with minimal downtime.',
    },
    {
      icon: Headphones,
      number: '04',
      title: 'Support',
      description: 'Our commitment continues with 24/7 technical support, preventive maintenance, and ongoing optimization to keep your systems running at peak performance.',
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 H40 M60 50 H100 M50 0 V40 M50 60 V100" stroke="#0075c9" strokeWidth="1" fill="none"/>
              <circle cx="50" cy="50" r="3" fill="#0075c9"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
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
            <span className="text-sm text-white/80">Our Process</span>
          </div>

          {/* Heading */}
          <h2
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            How We <span className="text-gradient">Work</span>
          </h2>

          {/* Description */}
          <p
            className={`text-white/70 text-lg transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Our proven methodology ensures successful project delivery from initial 
            consultation to ongoing support.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-primary transition-all duration-1000"
              style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Card */}
                <div
                  className={`relative glass rounded-2xl p-8 transition-all duration-500 ${
                    activeStep === index ? 'shadow-glow border-primary/30' : ''
                  }`}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <span
                      className={`font-heading text-5xl font-bold transition-colors duration-500 ${
                        activeStep === index ? 'text-primary' : 'text-white/10'
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 mt-4 transition-all duration-500 ${
                      activeStep === index
                        ? 'bg-primary text-white'
                        : 'bg-white/5 text-white/50'
                    }`}
                  >
                    <step.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Pulse Indicator */}
                  {activeStep === index && (
                    <div className="absolute top-4 right-4">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Mobile Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-white/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? 'bg-primary w-8'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
