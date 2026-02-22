import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, support: 0 });
  const [videoError, setVideoError] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Animate counters
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { projects: 150, clients: 85, years: 12, support: 24 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        projects: Math.floor(targets.projects * easeOut),
        clients: Math.floor(targets.clients * easeOut),
        years: Math.floor(targets.years * easeOut),
        support: Math.floor(targets.support * easeOut),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover transition-all duration-[1.8s] ease-out ${isVisible ? 'scale-100' : 'scale-110'
              }`}
            poster="/images/hero-bg.jpg"
          >
            {/* Industrial/factory free-use video from Pexels */}
            <source
              src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
            <source
              src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          /* Fallback static image */
          <img
            src="/images/hero-bg.jpg"
            alt="Industrial Automation"
            className={`w-full h-full object-cover transition-all duration-[1.8s] ease-out ${isVisible ? 'scale-100 blur-0' : 'scale-110 blur-sm'
              }`}
          />
        )}
        {/* Dark gradient overlays — keeps text readable over video */}
        <div className="absolute inset-0 bg-gradient-to-b from-cybotics-black/80 via-cybotics-black/60 to-cybotics-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-cybotics-black/90 via-transparent to-cybotics-black/50" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 117, 201, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 117, 201, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-white/80">Industrial Automation Experts</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span
              className={`block transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Industrial
            </span>
            <span
              className={`block text-gradient transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Automation
            </span>
            <span
              className={`block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              & Robotics
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Engineering the future of manufacturing with precision, innovation, and
            cutting-edge automation solutions that transform your operations.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            <Button
              onClick={() => scrollToSection('#services')}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-6 rounded-lg text-lg transition-all duration-300 hover:shadow-glow group"
            >
              Explore Solutions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => { window.location.href = '/quote'; }}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-lg text-lg transition-all duration-300"
            >
              Get a Free Quote
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            {[
              { value: counters.projects, suffix: '+', label: 'Projects Completed' },
              { value: counters.clients, suffix: '+', label: 'Happy Clients' },
              { value: counters.years, suffix: '', label: 'Years Experience' },
              { value: counters.support, suffix: '/7', label: 'Support Available' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 group"
        >
          <span className="text-sm">Scroll Down</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
