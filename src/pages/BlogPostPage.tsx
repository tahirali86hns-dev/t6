import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight, Share2, Linkedin, Twitter, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';
import { Button } from '@/components/ui/button';

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setIsVisible(true), 100);

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setReadingProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [slug]);

    const post = blogPosts.find((p) => p.slug === slug);
    const relatedPosts = post
        ? blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2)
        : [];

    if (!post) {
        return (
            <div className="min-h-screen bg-cybotics-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-4xl font-bold text-white mb-4">Post Not Found</h1>
                    <Button onClick={() => navigate('/blog')} className="bg-primary text-white">
                        Back to Blog
                    </Button>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

    const shareUrl = window.location.href;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        setShowShareMenu(false);
    };

    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
                <div
                    className="h-full bg-primary transition-all duration-150 shadow-glow"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Hero Image */}
            <div className="relative h-[50vh] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-cybotics-black via-cybotics-black/40 to-transparent" />

                {/* Navigation Overlays */}
                <div className="absolute top-6 left-6 sm:left-12 lg:left-20 flex flex-col gap-4">
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-white/80 hover:text-white transition-colors text-sm w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" /> All Articles
                    </button>

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-medium text-white/50">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/blog" className="hover:text-white transition-colors">Insights</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white/80 truncate max-w-[200px]">{post.title}</span>
                    </nav>
                </div>

                {/* Share Button Floating */}
                <div className="absolute top-6 right-6 sm:right-12 lg:right-20">
                    <div className="relative">
                        <button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-primary transition-all"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>

                        {showShareMenu && (
                            <div className="absolute top-12 right-0 w-48 glass border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                                <button
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors text-left"
                                >
                                    <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                                </button>
                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`)}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors text-left"
                                >
                                    <Twitter className="w-4 h-4 text-[#1da1f2]" /> Twitter
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors text-left border-t border-white/5"
                                >
                                    <LinkIcon className="w-4 h-4" /> Copy Link
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 pb-24">
                <div className="max-w-3xl mx-auto">
                    {/* Meta */}
                    <div className={`flex flex-wrap items-center gap-4 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/20 text-primary text-xs font-medium">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-white/40 text-sm">
                            <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1 text-white/40 text-sm">
                            <Clock className="w-3.5 h-3.5" /> {post.readTime}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {post.title}
                    </h1>

                    {/* Author */}
                    <div className={`flex items-center gap-4 mb-10 pb-10 border-b border-white/10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                        <div>
                            <p className="text-white font-medium">{post.author}</p>
                            <p className="text-white/50 text-sm">{post.authorRole}</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <button className="text-white/30 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></button>
                            <button className="text-white/30 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {post.content.map((section, i) => {
                            if (section.type === 'paragraph' && section.text) {
                                return (
                                    <p key={i} className="text-white/70 text-base leading-relaxed">
                                        {section.text}
                                    </p>
                                );
                            }
                            if (section.type === 'heading' && section.text) {
                                return (
                                    <h2 key={i} className="font-heading text-xl sm:text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-3">
                                        <span className="w-1 h-7 bg-primary rounded-full inline-block flex-shrink-0" />
                                        {section.text}
                                    </h2>
                                );
                            }
                            if (section.type === 'list' && section.items) {
                                return (
                                    <ul key={i} className="space-y-3">
                                        {section.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3 text-white/70 text-base">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }
                            if (section.type === 'callout' && section.text) {
                                return (
                                    <div key={i} className="glass rounded-xl p-6 border-l-4 border-primary bg-primary/5">
                                        <p className="text-white/80 text-base leading-relaxed font-medium italic">{section.text}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap mt-12 pt-8 border-t border-white/10">
                        <Tag className="w-4 h-4 text-white/30" />
                        {post.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/50 text-xs hover:border-primary transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Banner */}
                    <div className="mt-12 glass rounded-2xl p-8 text-center border border-primary/20 bg-primary/5">
                        <h3 className="font-heading text-2xl font-bold text-white mb-3">Ready to automate your facility?</h3>
                        <p className="text-white/60 mb-6 text-sm">Get a free project estimate from our engineering team - no obligation.</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button onClick={() => navigate('/quote')} className="bg-primary hover:bg-primary-dark text-white px-8 py-3 hover:shadow-glow font-bold">
                                Get a Free Quote
                            </Button>
                            <Button onClick={() => navigate('/contact')} variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
                                Contact an Engineer
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="max-w-3xl mx-auto mt-16">
                        <h3 className="font-heading text-xl font-semibold text-white mb-6">Related Articles</h3>
                        <div className="grid md:grid-cols-2 gap-5">
                            {relatedPosts.map((rp) => (
                                <div
                                    key={rp.id}
                                    className="glass rounded-xl overflow-hidden cursor-pointer group hover-lift"
                                    onClick={() => { navigate(`/blog/${rp.slug}`); window.scrollTo(0, 0); }}
                                >
                                    <div className="h-40 overflow-hidden">
                                        <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5">
                                        <span className="text-primary text-xs font-medium">{rp.category}</span>
                                        <h4 className="font-heading text-sm font-semibold text-white mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h4>
                                        <span className="flex items-center gap-1 text-primary text-xs font-medium">
                                            Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPostPage;
