import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, ArrowUpRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects, projectCategories, type Project } from '@/lib/projectsData';

interface ProjectFullCardProps {
    project: Project;
    index: number;
    isVisible: boolean;
}

const ProjectFullCard = ({ project, index, isVisible }: ProjectFullCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/projects/${project.id}`);
        window.scrollTo(0, 0);
    };

    return (
        <div
            className={`glass rounded-2xl overflow-hidden group transition-all duration-700 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'
                        }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

                {/* Blueprint hover overlay */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0, 117, 201, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 117, 201, 0.15) 1px, transparent 1px)
            `,
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium border border-primary/20">
                        {project.category}
                    </span>
                </div>

                {/* Arrow icon */}
                <div
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-primary flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-4 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{project.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{project.year}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{project.duration}
                    </span>
                </div>

                {/* Results */}
                <div className="space-y-1 mb-4">
                    {project.results.slice(0, 2).map((r, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            {r}
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/50 text-xs"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/40 text-xs">
                            +{project.techStack.length - 3} more
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory || p.tags.includes(activeCategory));

    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
            </div>

            {/* Page Header */}
            <section className="relative py-16 lg:py-20">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center">
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-white/80">Our Portfolio</span>
                    </div>
                    <h1
                        className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                    >
                        All <span className="text-gradient">Projects</span>
                    </h1>
                    <p
                        className={`text-white/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                    >
                        Browse our complete portfolio of industrial automation implementations — from PLC
                        programming and SCADA systems to robotics integration and IoT solutions.
                    </p>
                </div>
            </section>

            {/* Stats Row */}
            <div
                className={`w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                        { value: `${projects.length}+`, label: 'Projects Shown' },
                        { value: '5', label: 'Industries' },
                        { value: '8+', label: 'Provinces' },
                        { value: '100%', label: 'On-Time Delivery' },
                    ].map((s) => (
                        <div key={s.label} className="glass rounded-xl p-4 text-center">
                            <div className="font-heading text-2xl font-bold text-primary mb-1">{s.value}</div>
                            <div className="text-white/50 text-xs">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Tabs */}
            <div
                className={`w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
            >
                <div className="flex items-center gap-3 flex-wrap">
                    <Layers className="w-4 h-4 text-white/40" />
                    {projectCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? 'bg-primary text-white shadow-glow'
                                : 'glass text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <span className="ml-auto text-white/30 text-sm">
                        {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map((project, index) => (
                        <ProjectFullCard
                            key={project.id}
                            project={project}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-white/40 text-lg">No projects found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
