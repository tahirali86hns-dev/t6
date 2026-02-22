import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const testimonials = [
    {
      quote: "Cybotics transformed our production line with their exceptional automation expertise. The ROI was visible within the first quarter, and their team's dedication to quality is unmatched.",
      author: 'John Davidson',
      role: 'Plant Manager',
      company: 'AutoTech Manufacturing',
      avatar: `${import.meta.env.BASE_URL}images/avatar-1.jpg`,
      rating: 5,
    },
    {
      quote: "Working with Cybotics was a game-changer for our facility. Their SCADA implementation gave us unprecedented visibility into our operations, reducing downtime by 40%.",
      author: 'Sarah Mitchell',
      role: 'Operations Director',
      company: 'Precision Industries',
      avatar: `${import.meta.env.BASE_URL}images/avatar-2.jpg`,
      rating: 5,
    },
    {
      quote: "The robotics integration project exceeded all expectations. Cybotics delivered on time, within budget, and provided excellent training and support throughout.",
      author: 'Michael Roberts',
      role: 'Engineering Manager',
      company: 'SteelForge Corp',
      avatar: `${import.meta.env.BASE_URL}images/avatar-3.jpg`,
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
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
            <span className="text-sm text-white/80">Testimonials</span>
          </div>

          {/* Heading */}
          <h2
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Client <span className="text-gradient">Success Stories</span>
          </h2>

          {/* Description */}
          <p
            className={`text-white/70 text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Hear from industry leaders who have transformed their operations
            with our automation solutions.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          {/* Main Card */}
          <div className="relative glass rounded-3xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="font-heading text-xl md:text-2xl text-white leading-relaxed mb-8 min-h-[120px]">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <div className="font-heading text-lg font-semibold text-white">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-white/60 text-sm">
                    {testimonials[activeIndex].role}
                  </div>
                  <div className="text-primary text-sm">
                    {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                  ? 'bg-primary w-8'
                  : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>

          {/* Preview Cards */}
          <div className="hidden lg:flex justify-center gap-4 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeIndex === index
                  ? 'glass border-primary/30'
                  : 'opacity-50 hover:opacity-75'
                  }`}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="text-white text-sm font-medium">
                    {testimonial.author}
                  </div>
                  <div className="text-white/50 text-xs">
                    {testimonial.company}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
