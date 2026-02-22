import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: number;
    role: 'bot' | 'user';
    text: string;
    options?: string[];
    isInput?: boolean;
    inputField?: 'name' | 'email' | 'company';
}

type Stage =
    | 'greeting'
    | 'intent'
    | 'service_interest'
    | 'collect_name'
    | 'collect_company'
    | 'collect_email'
    | 'done';

const botReplies: Record<string, string> = {
    quote: "Great! I'd love to help you get an estimate for your project. Let me collect a few quick details.",
    learn_more: "Happy to help! Cybotics offers PLC programming, SCADA systems, robotics integration, IoT solutions, and machine vision. Which area interests you most?",
    support: "For support on an existing system, please email support@cybotics.ca or call our 24/7 hotline at +1 (416) 555-0192. Want me to open the contact page?",
    connect_engineer: "Absolutely! I'll connect you with one of our engineers. Let me get your details.",
    plc: "PLCs are the backbone of every automation system. We work with Siemens, Allen-Bradley, Schneider, and Mitsubishi platforms. Want to get a quote for a PLC project?",
    scada: "Our SCADA solutions include Ignition, WinCC, and FactoryTalk platforms. We specialize in unified dashboards across multiple sites. Interested in a demo or quote?",
    robotics: "We integrate ABB, KUKA, FANUC, and UR collaborative robots. Ready to discuss a robotic cell integration?",
    iot: "Our Industry 4.0 / IoT solutions connect your assets to the cloud for predictive maintenance and real-time OEE tracking. Want to learn more?",
};

let idCounter = 10;

const ChatWidget = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [stage, setStage] = useState<Stage>('greeting');
    const [inputValue, setInputValue] = useState('');
    const [unread, setUnread] = useState(1);
    const [leadData, setLeadData] = useState({ name: '', company: '', email: '' });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: 'bot',
            text: "👋 Hi! I'm Alex, your Cybotics automation assistant. How can I help you today?",
            options: ['Get a Project Quote', 'Learn About Services', 'Technical Support', 'Talk to an Engineer'],
        },
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setUnread(0);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const addBotMessage = (text: string, options?: string[], delay = 600) => {
        setTimeout(() => {
            idCounter++;
            setMessages((m) => [...m, { id: idCounter, role: 'bot', text, options }]);
        }, delay);
    };

    const addUserMessage = (text: string) => {
        idCounter++;
        setMessages((m) => [...m, { id: idCounter, role: 'user', text }]);
    };

    const handleOption = (option: string) => {
        addUserMessage(option);

        if (stage === 'greeting') {
            if (option === 'Get a Project Quote') {
                addBotMessage(botReplies.quote);
                addBotMessage("What's your name?", undefined, 1200);
                setStage('collect_name');
            } else if (option === 'Learn About Services') {
                addBotMessage(botReplies.learn_more);
                setStage('service_interest');
            } else if (option === 'Technical Support') {
                addBotMessage(botReplies.support, ['Yes, open Contact page', 'No, thank you']);
                setStage('intent');
            } else if (option === 'Talk to an Engineer') {
                addBotMessage(botReplies.connect_engineer);
                addBotMessage("What's your name?", undefined, 1200);
                setStage('collect_name');
            }
        } else if (stage === 'service_interest') {
            const key = option.toLowerCase().split(' ')[0];
            addBotMessage(botReplies[key] || "Interesting! Let me get your contact details so we can follow up.", ['Yes, get a quote', 'No thanks']);
            setStage('intent');
        } else if (stage === 'intent') {
            if (option === 'Yes, get a quote' || option === 'Yes, open Contact page') {
                if (option === 'Yes, open Contact page') {
                    navigate('/contact');
                    setIsOpen(false);
                    return;
                }
                addBotMessage("Great! What's your name?");
                setStage('collect_name');
            } else {
                addBotMessage("No worries! Is there anything else I can help you with? 😊", ['Get a Project Quote', 'Learn About Services']);
                setStage('greeting');
            }
        }
    };

    const handleTextInput = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const val = inputValue.trim();
        setInputValue('');

        if (stage === 'collect_name') {
            addUserMessage(val);
            setLeadData((ld) => ({ ...ld, name: val }));
            addBotMessage(`Nice to meet you, ${val}! What company are you with?`);
            setStage('collect_company');
        } else if (stage === 'collect_company') {
            addUserMessage(val);
            setLeadData((ld) => ({ ...ld, company: val }));
            addBotMessage(`And finally, what's the best email address to reach you at, ${leadData.name || val}?`);
            setStage('collect_email');
        } else if (stage === 'collect_email') {
            addUserMessage(val);
            setLeadData((ld) => ({ ...ld, email: val }));
            addBotMessage(
                `Perfect! 🎉 We'll have a Cybotics engineer reach out to ${val} within 1 business day. In the meantime, you can get an instant estimate using our Quote Calculator!`,
                ['Open Quote Calculator', 'Close Chat']
            );
            setStage('done');
        } else if (stage === 'done') {
            addUserMessage(val);
            addBotMessage("Thanks! A team member will follow up with you shortly. 👋");
        }
    };

    const showTextInput = ['collect_name', 'collect_company', 'collect_email'].includes(stage);
    const inputPlaceholder =
        stage === 'collect_name' ? 'Your full name...' :
            stage === 'collect_company' ? 'Your company...' :
                stage === 'collect_email' ? 'your@email.com' :
                    'Type a message...';

    const handleDoneOption = (opt: string) => {
        addUserMessage(opt);
        if (opt === 'Open Quote Calculator') {
            navigate('/quote');
            setIsOpen(false);
        } else {
            addBotMessage("Happy to help anytime! Talk soon 👋");
            setTimeout(() => setIsOpen(false), 1500);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => { setIsOpen(true); setIsMinimized(false); }}
                className={`fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
                aria-label="Open chat"
            >
                <MessageCircle className="w-7 h-7 text-white" />
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse">
                        {unread}
                    </span>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-6 right-6 z-[100] w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-400 ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    }`}
            >
                <div
                    className={`flex flex-col bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[520px]'
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border-b border-white/10 flex-shrink-0">
                        <div className="relative w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0e0e0e]" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-semibold text-sm">Alex — Cybotics AI</p>
                            <p className="text-green-400 text-xs">Online · Typically replies instantly</p>
                        </div>
                        <button
                            onClick={() => setIsMinimized((m) => !m)}
                            className="text-white/40 hover:text-white transition-colors p-1"
                            aria-label="Minimize"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/40 hover:text-white transition-colors p-1"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {msg.role === 'bot' && (
                                            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <Bot className="w-4 h-4 text-primary" />
                                            </div>
                                        )}
                                        <div className={`max-w-[80%] space-y-2`}>
                                            <div
                                                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'bot'
                                                        ? 'bg-white/8 text-white/90 rounded-tl-sm'
                                                        : 'bg-primary text-white rounded-tr-sm'
                                                    }`}
                                            >
                                                {msg.text}
                                            </div>
                                            {msg.options && (
                                                <div className="flex flex-col gap-1.5">
                                                    {msg.options.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() =>
                                                                stage === 'done' ? handleDoneOption(opt) : handleOption(opt)
                                                            }
                                                            className="flex items-center gap-2 text-left px-3 py-2 rounded-xl border border-primary/30 text-primary text-xs hover:bg-primary/10 transition-all duration-200 group"
                                                        >
                                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {msg.role === 'user' && (
                                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                                <User className="w-4 h-4 text-white/60" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            {showTextInput && (
                                <form onSubmit={handleTextInput} className="px-3 py-3 border-t border-white/10 flex gap-2 flex-shrink-0">
                                    <input
                                        ref={inputRef}
                                        type={stage === 'collect_email' ? 'email' : 'text'}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={inputPlaceholder}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                                    />
                                    <button
                                        type="submit"
                                        className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center hover:bg-primary-dark transition-colors flex-shrink-0"
                                    >
                                        <Send className="w-4 h-4 text-white" />
                                    </button>
                                </form>
                            )}

                            {/* Branding */}
                            <div className="px-4 py-2 border-t border-white/5 flex-shrink-0">
                                <p className="text-white/20 text-xs text-center">Powered by Cybotics · No spam, ever.</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatWidget;
