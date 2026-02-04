
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CLINIC_INFO } from '../constants';
import { Menu, X, Phone, Mail, Instagram, Facebook, Sparkles, MapPin } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-50 glass border-b border-slate-100">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-slate-900 rounded-[18px] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-2xl">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">{CLINIC_INFO.name}</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sky-500 font-black mt-1">{CLINIC_INFO.slogan}</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-12">
            {[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
              { label: 'Services', path: '/services' },
              { label: 'AI Care', path: '/assistant' },
              { label: 'Contact', path: '/contact' }
            ].map(link => (
              <NavLink 
                key={link.path}
                to={link.path} 
                className={({ isActive }) => 
                  `text-sm font-bold tracking-tight transition-all relative py-2 ${
                    isActive ? "text-sky-500" : "text-slate-500 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full"></div>}
                  </>
                )}
              </NavLink>
            ))}
            <Link to="/book" className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
              Book Appointment
            </Link>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-3 bg-slate-50 rounded-2xl text-slate-900">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-8 space-y-6 flex flex-col shadow-2xl animate-in slide-in-from-top duration-300">
            {['/', '/about', '/services', '/assistant', '/contact'].map((path) => (
              <Link 
                key={path}
                to={path} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-2xl font-bold text-slate-900"
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
            <Link to="/book" onClick={() => setIsMenuOpen(false)} className="bg-sky-500 text-white text-center py-5 rounded-3xl font-bold text-lg shadow-xl shadow-sky-100">
              Book Appointment
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-100 pt-32 pb-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-1 space-y-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-[14px] flex items-center justify-center">
                <span className="text-white font-extrabold text-xl">M</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-none">{CLINIC_INFO.name}</h2>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Elevating dental care through innovation and empathy. Experience the difference of premium healthcare.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Instagram, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Resources</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="text-slate-500 hover:text-sky-500 transition-colors">Our History</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-sky-500 transition-colors">Services</Link></li>
              <li><Link to="/book" className="text-slate-500 hover:text-sky-500 transition-colors">Appointments</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-sky-500 transition-colors">Emergency</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Hours</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li className="flex justify-between"><span>Weekdays</span> <span>{CLINIC_INFO.hours.weekdays}</span></li>
              <li className="flex justify-between"><span>Saturdays</span> <span>{CLINIC_INFO.hours.saturday}</span></li>
              <li className="flex justify-between text-sky-500"><span className="font-bold italic">Sunday</span> <span>{CLINIC_INFO.hours.sunday}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Contact</h3>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start space-x-4">
                <Phone size={18} className="text-sky-500 shrink-0" />
                <span className="text-slate-500 leading-tight">{CLINIC_INFO.phone}</span>
              </li>
              <li className="flex items-start space-x-4">
                <Mail size={18} className="text-sky-500 shrink-0" />
                <span className="text-slate-500 leading-tight">{CLINIC_INFO.email}</span>
              </li>
              <li className="flex items-start space-x-4">
                <MapPin size={18} className="text-sky-500 shrink-0" />
                <span className="text-slate-500 leading-tight">{CLINIC_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-32 pt-12 border-t border-slate-50 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
