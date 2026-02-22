import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { projects } from '@/lib/projectsData';

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const ProjectCard = ({
  image,
  title,
  category,
  location,
  year,
  description,
  index,
  isVisible,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'
            }`}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-cybotics-black via-cybotics-black/50 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-70'
            }`}
        />

        {/* Blueprint Grid Overlay on Hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 117, 201, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 117, 201, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Category Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm mb-3 w-fit transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
          >
            <span className="text-xs text-primary font-medium">{category}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl font-semibold text-white mb-2 transition-all duration-500">
            {title}
          </h3>

          {/* Description - Shows on Hover */}
          <p
            className={`text-white/70 text-sm mb-4 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
          >
            {description}
          </p>

          {/* Meta Info */}
          <div
            className={`flex items-center gap-4 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
          >
            <div className="flex items-center gap-1 text-white/50 text-xs">
              <MapPin className="w-3 h-3" />
              {location}
            </div>
            <div className="flex items-center gap-1 text-white/50 text-xs">
              <Calendar className="w-3 h-3" />
              {year}
            </div>
          </div>
        </div>

        {/* Arrow Button */}
        <div
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
        >
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Show only the 3 featured projects on the homepage
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  const handleViewAll = () => {
    window.location.href = '/projects';
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            {/* Section Label */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm text-white/80">Portfolio</span>
            </div>

            {/* Heading */}
            <h2
              className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>

          <p
            className={`text-white/70 max-w-md transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            Explore our latest automation implementations across various industries
            and applications.
          </p>
        </div>

        {/* Projects Grid — 3 equal-sized cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              category={project.category}
              location={project.location}
              year={project.year}
              description={project.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg glass text-white font-medium hover:bg-white/10 transition-all duration-300 group cursor-pointer"
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
