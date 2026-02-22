import { useState, useEffect } from 'react';
import { Menu, X, Cpu, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const primaryLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Insights', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const serviceLinks = [
    { name: 'PLC Programming', href: '/services' },
    { name: 'SCADA Systems', href: '/services' },
    { name: 'Robotics', href: '/services' },
    { name: 'IoT Solutions', href: '/services' },
    { name: 'Vision Systems', href: '/services' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-cybotics-black/90 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group"
            >
              <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-lg group-hover:shadow-glow transition-shadow duration-300">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-white">Cybotics</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {primaryLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative text-sm font-medium transition-colors duration-300 group ${isActive ? 'text-primary' : 'text-white/70 hover:text-white'
                      }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesHover(true)}
                onMouseLeave={() => setServicesHover(false)}
              >
                <Link
                  to="/services"
                  className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-300 group ${location.pathname === '/services' ? 'text-primary' : 'text-white/70 hover:text-white'
                    }`}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesHover ? 'rotate-180' : ''}`} />
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/services' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
                <div
                  className={`absolute top-8 left-1/2 -translate-x-1/2 min-w-[200px] bg-cybotics-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${servicesHover ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                >
                  {serviceLinks.map((sl) => (
                    <Link
                      key={sl.name}
                      to={sl.href}
                      className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      {sl.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/quote"
                className="text-sm font-medium text-white/70 hover:text-primary transition-colors flex items-center gap-1"
              >
                Get a Quote
              </Link>
              <Button
                onClick={() => navigate('/contact')}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-glow text-sm"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-20 left-4 right-4 bg-cybotics-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex flex-col gap-3">
            {[...primaryLinks, { name: 'Services', href: '/services' }, { name: 'Get a Quote', href: '/quote' }].map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name + link.href}
                  to={link.href}
                  className={`text-base font-medium py-2 border-b border-white/5 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white/70 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button
              onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }}
              className="bg-primary hover:bg-primary-dark text-white font-semibold mt-3 py-3 rounded-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
