import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    CheckCircle2,
    ArrowRight,
    X,
    Maximize2,
    ChevronRight,
    MessageSquare
} from 'lucide-react';
import { projects } from '@/lib/projectsData';
import { Button } from '@/components/ui/button';

const ProjectDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, [id]);

    const project = projects.find((p) => p.id === id);
    const relatedProjects = project
        ? projects.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 2)
        : [];

    if (!project) {
        return (
            <div className="min-h-screen bg-cybotics-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-4xl font-bold mb-4">Project Not Found</h1>
                    <Button onClick={() => navigate('/projects')} className="bg-primary hover:bg-primary-dark">
                        Back to Projects
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24">
            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-cybotics-black via-cybotics-black/40 to-transparent" />

                {/* Navigation Overlays */}
                <div className="absolute top-6 left-6 sm:left-12 lg:left-20 flex flex-col gap-4">
                    <button
                        onClick={() => navigate('/projects')}
                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-white/80 hover:text-white transition-colors text-sm w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Projects
                    </button>

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-medium text-white/50">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white/80 truncate max-w-[200px]">{project.title}</span>
                    </nav>
                </div>

                <div className="absolute bottom-12 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20">
                    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-4 inline-block">
                            {project.category}
                        </span>
                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-white/70">
                            <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> {project.location}</span>
                            <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> {project.year}</span>
                            <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {project.duration}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="font-heading text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-1 h-8 bg-primary rounded-full" />
                                Project Overview
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed">{project.description}</p>
                        </div>

                        {/* Image Gallery */}
                        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="font-heading text-2xl font-bold mb-6">Project Gallery</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {project.gallery?.map((img: string, i: number) => (
                                    <div
                                        key={i}
                                        className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in group"
                                        onClick={() => setActiveImage(img)}
                                    >
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Maximize2 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="font-heading text-2xl font-bold mb-6">Key Results</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {project.results.map((r, i) => (
                                    <div key={i} className="glass p-5 rounded-xl border border-primary/20 flex gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                        <span className="text-white/80 font-medium">{r}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className={`sticky top-32 space-y-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {/* Meta Box */}
                            <div className="glass p-8 rounded-2xl border border-white/10">
                                <h3 className="font-heading text-xl font-bold mb-6">Project Details</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Client</p>
                                        <p className="text-white font-medium">{project.client}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                                        <p className="text-white font-medium">{project.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Completion</p>
                                        <p className="text-white font-medium">{project.year}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Duration</p>
                                        <p className="text-white font-medium">{project.duration}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="glass p-8 rounded-2xl border border-white/10">
                                <h3 className="font-heading text-xl font-bold mb-4">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="relative group overflow-hidden rounded-2xl bg-primary/10 border border-primary/30 p-8 shadow-glow">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <h3 className="font-heading text-xl font-bold text-white mb-3">Project Like This?</h3>
                                <p className="text-white/60 text-sm mb-6">Let's discuss how we can automate your facility.</p>
                                <Button
                                    onClick={() => navigate('/quote')}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-6 rounded-xl hover:shadow-glow-lg transition-all"
                                >
                                    Get an Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-24 bg-white/3 border-t border-white/5">
                    <h2 className="font-heading text-3xl font-bold mb-12 text-center text-white">Related Projects</h2>
                    <div className="grid md:grid-cols-2 max-w-5xl mx-auto gap-8">
                        {relatedProjects.map((rp) => (
                            <div
                                key={rp.id}
                                className="glass rounded-2xl overflow-hidden cursor-pointer group hover-lift"
                                onClick={() => { navigate(`/projects/${rp.id}`); window.scrollTo(0, 0); }}
                            >
                                <div className="h-64 overflow-hidden">
                                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-8">
                                    <span className="text-primary text-xs font-semibold uppercase mb-2 block">{rp.category}</span>
                                    <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{rp.title}</h3>
                                    <p className="text-white/50 text-sm mb-4 line-clamp-2">{rp.description}</p>
                                    <span className="flex items-center gap-2 text-primary font-medium">View Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Floating Request CTA */}
            <div className={`fixed bottom-24 right-6 z-[90] transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <button
                    onClick={() => navigate('/contact')}
                    className="flex items-center gap-3 px-6 py-4 bg-primary rounded-full shadow-glow transform hover:scale-105 transition-all text-white font-bold"
                >
                    <MessageSquare className="w-5 h-5" />
                    <span className="hidden sm:inline">Request Info</span>
                </button>
            </div>

            {/* Lightbox */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setActiveImage(null)}
                >
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={activeImage}
                        alt="Enlarged view"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
                    />
                </div>
            )}
        </div>
    );
};

export default ProjectDetailPage;
