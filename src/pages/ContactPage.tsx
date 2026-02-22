import Contact from '@/sections/Contact';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24">
            {/* Page Header */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-white/80">Reach Out</span>
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Get in <span className="text-gradient">Touch</span>
                </h1>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Ready to transform your manufacturing operations? Our team of experts is standing by
                    to help you design the perfect automation solution.
                </p>
            </div>

            {/* Contact Section */}
            <Contact />
        </div>
    );
};

export default ContactPage;
