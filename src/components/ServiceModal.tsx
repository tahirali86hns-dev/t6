import { useEffect } from 'react';
import { X, CheckCircle, ArrowRight, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ServiceDetail {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    technologies: string[];
    process: string[];
    benefits: { label: string; value: string }[];
    caseStudy: {
        client: string;
        challenge: string;
        result: string;
    };
}

interface ServiceModalProps {
    service: ServiceDetail | null;
    onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
    useEffect(() => {
        if (service) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [service]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    if (!service) return null;

    const Icon = service.icon;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-white/10 shadow-2xl"
                style={{ boxShadow: '0 0 60px rgba(0, 117, 201, 0.15)' }}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#141414]/95 backdrop-blur-xl border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-heading text-xl font-bold text-white">{service.title}</h2>
                            <p className="text-white/50 text-sm">Full Service Details</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-8">
                    {/* Description */}
                    <p className="text-white/70 text-base leading-relaxed">{service.description}</p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {service.benefits.map((b) => (
                            <div key={b.label} className="glass rounded-xl p-4 text-center">
                                <div className="font-heading text-2xl font-bold text-primary mb-1">{b.value}</div>
                                <div className="text-white/50 text-xs">{b.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Features */}
                        <div>
                            <h3 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                Key Features
                            </h3>
                            <ul className="space-y-2">
                                {service.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                            <h3 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {service.technologies.map((t, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Our Process */}
                    <div>
                        <h3 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                            Our Process
                        </h3>
                        <div className="space-y-3">
                            {service.process.map((step, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-primary text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <p className="text-white/70 text-sm leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Case Study */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Cpu className="w-4 h-4 text-primary" />
                            <span className="text-primary text-sm font-semibold">Case Study — {service.caseStudy.client}</span>
                        </div>
                        <p className="text-white/60 text-sm mb-2">
                            <span className="text-white/80 font-medium">Challenge: </span>
                            {service.caseStudy.challenge}
                        </p>
                        <p className="text-white/60 text-sm">
                            <span className="text-white/80 font-medium">Result: </span>
                            {service.caseStudy.result}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 p-6 bg-[#141414]/95 backdrop-blur-xl border-t border-white/10">
                    <Button
                        onClick={() => {
                            onClose();
                            const contactSection = document.querySelector('#contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/contact';
                            }
                        }}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-5 rounded-lg transition-all duration-300 hover:shadow-glow group"
                    >
                        Get a Quote for {service.title}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
