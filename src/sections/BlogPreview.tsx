import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '@/lib/blogData';

const BlogPreview = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // The 3 latest posts
    const latestPosts = blogPosts.slice(0, 3);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <section ref={sectionRef} className="relative py-24 border-t border-white/5 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-96 h-56 bg-primary/4 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        >
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm text-white/80">Knowledge Base</span>
                        </div>
                        <h2
                            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                        >
                            Insights & <span className="text-gradient">Resources</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => navigate('/blog')}
                        className={`flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 group pb-1 border-b border-primary/30 hover:border-primary ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                        View All Articles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Posts Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {latestPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className={`glass rounded-2xl overflow-hidden cursor-pointer group hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${index * 150 + 200}ms` }}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                            {/* Thumbnail */}
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium border border-primary/20">
                                    {post.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-heading text-base font-semibold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-3 text-white/40 text-xs mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {formatDate(post.date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {post.readTime}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={post.authorImage}
                                        alt={post.author}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="text-white/50 text-xs">{post.author}</span>
                                    <span className="ml-auto text-primary text-xs flex items-center gap-1 font-medium group-hover:gap-2 transition-all">
                                        Read <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
