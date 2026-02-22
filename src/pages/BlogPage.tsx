import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts, blogCategories } from '@/lib/blogData';
import { Calendar, Clock, ArrowRight, Tag, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BlogPage = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const filteredPosts = blogPosts.filter((p) => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = blogPosts.find((p) => p.featured);

    // Only show featured if no search is active and category is All
    const shouldShowFeatured = featuredPost && activeCategory === 'All' && searchQuery === '';
    const regularPosts = shouldShowFeatured
        ? filteredPosts.filter((p) => !p.featured)
        : filteredPosts;

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

    const getCategoryCount = (cat: string) => {
        if (cat === 'All') return blogPosts.length;
        return blogPosts.filter(p => p.category === cat).length;
    };

    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24">
            {/* Page Header */}
            <section className="py-16 lg:py-20">
                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-white/80">Knowledge Base</span>
                    </div>
                    <h1 className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Insights & <span className="text-gradient">Resources</span>
                    </h1>
                    <p className={`text-white/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Expert knowledge from Cybotics engineers - covering PLC programming, robotics, IoT,
                        SCADA systems, cybersecurity, and industrial automation best practices.
                    </p>
                </div>
            </section>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-24">
                {/* Search & Filter Bar */}
                <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    {/* Category Filter */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <Tag className="w-4 h-4 text-white/40" />
                        {blogCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeCategory === cat
                                        ? 'bg-primary text-white shadow-glow'
                                        : 'glass text-white/60 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'}`}>
                                    {getCategoryCount(cat)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            type="text"
                            placeholder="Search articles or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Featured Post */}
                {shouldShowFeatured && featuredPost && (
                    <div
                        className={`mb-16 cursor-pointer group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                    >
                        <div className="grid lg:grid-cols-2 gap-0 glass rounded-2xl overflow-hidden hover:shadow-glow-lg transition-all duration-300">
                            <div className="relative h-72 lg:h-auto overflow-hidden">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414]/20 lg:bg-gradient-to-r lg:from-transparent lg:to-[#141414]" />
                                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">Featured</span>
                            </div>
                            <div className="p-8 lg:p-10 flex flex-col justify-center">
                                <span className="text-primary text-sm font-medium mb-3">{featuredPost.category}</span>
                                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">{featuredPost.excerpt}</p>
                                <div className="flex items-center gap-4 text-white/40 text-xs mb-6">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(featuredPost.date)}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featuredPost.readTime}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-8 h-8 rounded-full object-cover border border-white/20" />
                                    <div>
                                        <p className="text-white/80 text-sm font-medium">{featuredPost.author}</p>
                                        <p className="text-white/40 text-xs">{featuredPost.authorRole}</p>
                                    </div>
                                    <span className="ml-auto text-primary text-sm group-hover:gap-3 flex items-center gap-2 font-medium">
                                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {regularPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className={`glass rounded-2xl overflow-hidden cursor-pointer group hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 400}ms` }}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                                <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium border border-primary/20">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-heading text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img src={post.authorImage} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                                        <div>
                                            <p className="text-white/70 text-xs font-medium">{post.author}</p>
                                            <p className="text-white/30 text-xs">{post.readTime}</p>
                                        </div>
                                    </div>
                                    <span className="text-white/30 text-xs">{formatDate(post.date)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-white/20" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white mb-2">No results found</h3>
                        <p className="text-white/50">We couldn't find any articles matching "{searchQuery}" in {activeCategory}.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-6 text-primary hover:underline font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
