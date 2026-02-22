import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, DollarSign, Send, Cpu, Monitor, Settings, Bot, Wifi, Eye, Printer, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const services = [
    { id: 'plc', icon: Cpu, label: 'PLC Programming', base: 15000 },
    { id: 'scada', icon: Monitor, label: 'SCADA Systems', base: 25000 },
    { id: 'automation', icon: Settings, label: 'Automation Integration', base: 35000 },
    { id: 'robotics', icon: Bot, label: 'Robotics Integration', base: 50000 },
    { id: 'iot', icon: Wifi, label: 'IoT Solutions', base: 20000 },
    { id: 'vision', icon: Eye, label: 'Vision Systems', base: 18000 },
];

const scaleFactors: Record<string, number> = {
    small: 0.7,
    medium: 1.0,
    large: 1.6,
    enterprise: 2.5,
};

const timelineFactors: Record<string, number> = {
    urgent: 1.35,
    standard: 1.0,
    flexible: 0.9,
};

const complexityFactors: Record<string, number> = {
    low: 0.8,
    medium: 1.0,
    high: 1.4,
    custom: 1.8,
};

interface FormData {
    selectedServices: string[];
    scale: string;
    complexity: string;
    timeline: string;
    name: string;
    company: string;
    email: string;
    phone: string;
}

const QuoteCalculatorPage = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState<FormData>({
        selectedServices: [],
        scale: '',
        complexity: '',
        timeline: '',
        name: '',
        company: '',
        email: '',
        phone: '',
    });

    const toggleService = (id: string) => {
        setForm((f) => ({
            ...f,
            selectedServices: f.selectedServices.includes(id)
                ? f.selectedServices.filter((s) => s !== id)
                : [...f.selectedServices, id],
        }));
    };

    const baseTotal = form.selectedServices.reduce((sum, id) => {
        const s = services.find((s) => s.id === id);
        return sum + (s?.base || 0);
    }, 0);

    const estimate = Math.round(
        baseTotal *
        (scaleFactors[form.scale] || 1) *
        (complexityFactors[form.complexity] || 1) *
        (timelineFactors[form.timeline] || 1)
    );
    const estimateHigh = Math.round(estimate * 1.35);

    const formatPrice = (n: number) =>
        new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

    const canNext = () => {
        if (step === 1) return form.selectedServices.length > 0;
        if (step === 2) return form.scale && form.complexity;
        if (step === 3) return form.timeline;
        if (step === 4) return true; // Review step
        if (step === 5) return form.name && form.email;
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const steps = [
        { label: 'Services', number: 1 },
        { label: 'Scope', number: 2 },
        { label: 'Timeline', number: 3 },
        { label: 'Review', number: 4 },
        { label: 'Contact', number: 5 },
    ];

    const getServiceLabel = (id: string) => services.find(s => s.id === id)?.label || id;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-cybotics-black text-white pt-24 print:bg-white print:text-black">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none print:hidden">
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 pb-24">
                {/* Header */}
                <div className="text-center mb-12 print:text-black">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 print:hidden">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-sm text-white/80">Free Estimate</span>
                    </div>
                    <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 print:text-black">
                        Project <span className="text-gradient">Quote Calculator</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto print:hidden">
                        Get an instant estimate for your automation project. No commitment required -
                        our team will follow up with a detailed proposal.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-12 print:hidden">
                    {steps.map((s, i) => (
                        <div key={s.number} className="flex items-center gap-2">
                            <div
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${step === s.number
                                        ? 'bg-primary text-white shadow-glow'
                                        : step > s.number
                                            ? 'bg-primary/20 text-primary border border-primary/20'
                                            : 'bg-white/5 text-white/30 border border-white/10'
                                    }`}
                            >
                                {step > s.number ? <Check className="w-4 h-4" /> : <span>{s.number}</span>}
                                <span className="hidden sm:inline">{s.label}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`w-6 h-0.5 ${step > s.number ? 'bg-primary' : 'bg-white/10'}`} />
                            )}
                        </div>
                    ))}
                </div>

                {submitted ? (
                    /* Success Screen */
                    <div className="max-w-lg mx-auto text-center glass rounded-2xl p-12 print:glass-none print:p-0 print:border print:border-black/10">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 print:hidden">
                            <Check className="w-10 h-10 text-green-400" />
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-white mb-4 print:text-black">You're All Set!</h2>
                        <p className="text-white/60 mb-8 print:text-black">
                            Thanks, <span className="text-white font-bold print:text-black">{form.name}</span>! We've received your project estimate request.
                        </p>

                        <div className="glass rounded-xl p-8 mb-8 border border-primary/30 bg-primary/5 print:bg-white print:border-black print:text-black">
                            <p className="text-white/50 text-sm mb-2 uppercase tracking-widest font-bold">Your Estimated Range</p>
                            <p className="font-heading text-4xl font-bold text-primary print:text-black">
                                {formatPrice(estimate)} - {formatPrice(estimateHigh)}
                            </p>
                            <p className="text-white/30 text-xs mt-4">Project ID: CYB-{Math.floor(Math.random() * 90000) + 10000}</p>
                        </div>

                        <div className="flex flex-col gap-4 print:hidden">
                            <Button
                                onClick={handlePrint}
                                variant="outline"
                                className="border-white/10 text-white/70 hover:text-white"
                            >
                                <Printer className="w-4 h-4 mr-2" /> Save or Print Estimate
                            </Button>
                            <p className="text-white/50 text-sm">
                                A Cybotics engineer will contact you at <span className="text-white print:text-black font-medium">{form.email}</span> within 1 business day with a detailed proposal.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            {/* Step 1: Services */}
                            {step === 1 && (
                                <div>
                                    <h2 className="font-heading text-2xl font-semibold text-white mb-2">What services do you need?</h2>
                                    <p className="text-white/50 text-sm mb-8">Select all that apply - you can choose multiple.</p>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {services.map((s) => {
                                            const selected = form.selectedServices.includes(s.id);
                                            const Icon = s.icon;
                                            return (
                                                <button
                                                    key={s.id}
                                                    onClick={() => toggleService(s.id)}
                                                    className={`relative flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 ${selected
                                                            ? 'bg-primary/10 border-primary/40 shadow-glow'
                                                            : 'bg-white/3 border-white/10 hover:bg-white/5 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-primary/20' : 'bg-white/5'}`}>
                                                        <Icon className={`w-5 h-5 ${selected ? 'text-primary' : 'text-white/40'}`} />
                                                    </div>
                                                    <span className={`font-medium text-sm ${selected ? 'text-white' : 'text-white/60'}`}>{s.label}</span>
                                                    {selected && (
                                                        <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Scope */}
                            {step === 2 && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="font-heading text-2xl font-semibold text-white mb-2">Project Scale</h2>
                                        <p className="text-white/50 text-sm mb-6">How large is your facility / operation?</p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                { id: 'small', label: 'Small', desc: 'Single line / fewer than 50 I/O' },
                                                { id: 'medium', label: 'Medium', desc: '1-3 lines / 50-300 I/O' },
                                                { id: 'large', label: 'Large', desc: 'Full facility / 300-1000 I/O' },
                                                { id: 'enterprise', label: 'Enterprise', desc: 'Multi-site / 1000+ I/O' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setForm((f) => ({ ...f, scale: opt.id }))}
                                                    className={`p-5 rounded-xl border text-left transition-all duration-300 ${form.scale === opt.id
                                                            ? 'bg-primary/10 border-primary/40'
                                                            : 'bg-white/3 border-white/10 hover:bg-white/5'
                                                        }`}
                                                >
                                                    <div className={`font-heading font-semibold mb-1 ${form.scale === opt.id ? 'text-primary' : 'text-white'}`}>{opt.label}</div>
                                                    <div className="text-white/50 text-sm">{opt.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="font-heading text-xl font-semibold text-white mb-2">Complexity</h2>
                                        <p className="text-white/50 text-sm mb-6">How complex is your process?</p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                { id: 'low', label: 'Standard', desc: 'Simple logic, straightforward integration' },
                                                { id: 'medium', label: 'Moderate', desc: 'Some custom sequences, mid-level integration' },
                                                { id: 'high', label: 'Complex', desc: 'Advanced logic, safety systems, multi-vendor' },
                                                { id: 'custom', label: 'Custom R&D', desc: 'Novel application, research required' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setForm((f) => ({ ...f, complexity: opt.id }))}
                                                    className={`p-5 rounded-xl border text-left transition-all duration-300 ${form.complexity === opt.id
                                                            ? 'bg-primary/10 border-primary/40'
                                                            : 'bg-white/3 border-white/10 hover:bg-white/5'
                                                        }`}
                                                >
                                                    <div className={`font-heading font-semibold mb-1 ${form.complexity === opt.id ? 'text-primary' : 'text-white'}`}>{opt.label}</div>
                                                    <div className="text-white/50 text-sm">{opt.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Timeline */}
                            {step === 3 && (
                                <div>
                                    <h2 className="font-heading text-2xl font-semibold text-white mb-2">What's your timeline?</h2>
                                    <p className="text-white/50 text-sm mb-8">Urgent projects may incur a premium due to resource prioritization.</p>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {[
                                            { id: 'urgent', label: 'Urgent', desc: 'Under 3 months', note: '+35% priority fee' },
                                            { id: 'standard', label: 'Standard', desc: '3-6 months', note: 'Regular pricing' },
                                            { id: 'flexible', label: 'Flexible', desc: '6+ months', note: '-10% discount' },
                                        ].map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setForm((f) => ({ ...f, timeline: opt.id }))}
                                                className={`p-6 rounded-xl border text-center transition-all duration-300 ${form.timeline === opt.id
                                                        ? 'bg-primary/10 border-primary/40 shadow-glow-sm'
                                                        : 'bg-white/3 border-white/10 hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className={`font-heading text-xl font-bold mb-2 ${form.timeline === opt.id ? 'text-primary' : 'text-white'}`}>{opt.label}</div>
                                                <div className="text-white/60 text-sm mb-2">{opt.desc}</div>
                                                <div className={`text-xs font-medium ${opt.id === 'urgent' ? 'text-yellow-400' : opt.id === 'flexible' ? 'text-green-400' : 'text-white/40'}`}>{opt.note}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Review Summary */}
                            {step === 4 && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="font-heading text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                                            <ListChecks className="w-6 h-6 text-primary" /> Review Your Selection
                                        </h2>
                                        <p className="text-white/50 text-sm mb-8">Confirm your selections before continuing to contact info.</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="glass p-6 rounded-xl border border-white/10">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Selected Services</h3>
                                            <div className="space-y-2">
                                                {form.selectedServices.map(sid => (
                                                    <div key={sid} className="flex items-center gap-2 text-white/80">
                                                        <Check className="w-4 h-4 text-green-400" />
                                                        <span className="text-sm font-medium">{getServiceLabel(sid)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="glass p-5 rounded-xl border border-white/10">
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Project Scale</h3>
                                                <p className="text-white font-medium capitalize">{form.scale} Scale Operation</p>
                                            </div>
                                            <div className="glass p-5 rounded-xl border border-white/10">
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Complexity</h3>
                                                <p className="text-white font-medium capitalize">{form.complexity} Lifecycle</p>
                                            </div>
                                            <div className="glass p-5 rounded-xl border border-white/10">
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Timeline</h3>
                                                <p className="text-white font-medium capitalize">{form.timeline} Schedule</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="glass rounded-xl p-8 border border-primary/40 bg-primary/10 text-center shadow-glow">
                                        <p className="text-white/50 text-xs mb-1 uppercase font-bold">Estimated Project Range</p>
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="font-heading text-3xl font-bold text-white">{formatPrice(estimate)}</span>
                                            <span className="text-white/40">-</span>
                                            <span className="font-heading text-4xl font-bold text-primary">{formatPrice(estimateHigh)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Contact */}
                            {step === 5 && (
                                <form onSubmit={handleSubmit}>
                                    <h2 className="font-heading text-2xl font-semibold text-white mb-2">Your Details</h2>
                                    <p className="text-white/50 text-sm mb-8">We'll send your estimate and follow up within 1 business day.</p>

                                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                                        <div>
                                            <label className="block text-white/60 text-sm mb-2">Full Name *</label>
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                required
                                                value={form.name}
                                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/60 text-sm mb-2">Company</label>
                                            <Input
                                                type="text"
                                                placeholder="Your Company"
                                                value={form.company}
                                                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/60 text-sm mb-2">Email Address *</label>
                                            <Input
                                                type="email"
                                                placeholder="john@company.com"
                                                required
                                                value={form.email}
                                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/60 text-sm mb-2">Phone (optional)</label>
                                            <Input
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                value={form.phone}
                                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-6 rounded-xl transition-all duration-300 hover:shadow-glow-lg group"
                                    >
                                        <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Send My Estimate Request
                                    </Button>
                                    <p className="text-white/30 text-xs text-center mt-3">
                                        No spam, no pressure. We'll reach out with a free, detailed proposal within 24 hours.
                                    </p>
                                </form>
                            )}

                            {/* Navigation */}
                            {!submitted && (
                                <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                                    <Button
                                        onClick={() => setStep((s) => Math.max(1, s - 1))}
                                        variant="ghost"
                                        className="text-white/50 hover:text-white px-6"
                                        disabled={step === 1}
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                    {step < 5 && (
                                        <Button
                                            onClick={() => setStep((s) => s + 1)}
                                            disabled={!canNext()}
                                            className="bg-primary hover:bg-primary-dark text-white px-8 font-bold disabled:opacity-40 rounded-lg group"
                                        >
                                            {step === 4 ? 'Continue to Contact' : 'Next Step'} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteCalculatorPage;
