
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ChatWidget } from './components/ChatWidget';
import { SERVICES, TESTIMONIALS, ICON_MAP, CLINIC_INFO } from './constants';
import { ArrowRight, Star, MapPin, Phone, Mail, CheckCircle2, Sparkles, MessageCircle, Mic, ShieldCheck, Play } from 'lucide-react';

// --- Page Components ---

const Home = () => (
  <div className="space-y-32 pb-32 overflow-hidden">
    {/* Hero Section */}
    <section className="relative pt-24 pb-40">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10 z-10 relative">
          <div className="inline-flex items-center space-x-2 bg-sky-50 text-sky-600 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase border border-sky-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>Welcoming New Smiles</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 leading-[1.05]">
            Experience<br />
            <span className="text-sky-500 italic">Excellence</span> in<br />
            Dental Care
          </h1>
          <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-light">
            Modern, compassionate dentistry for the whole family. We combine advanced technology with a gentle touch.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link to="/book" className="bg-sky-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-sky-600 transition-all shadow-xl shadow-sky-200/50 hover:translate-y-[-2px]">
              Reserve Your Visit
            </Link>
            <Link to="/services" className="bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-sky-500 hover:text-sky-500 transition-all hover:bg-sky-50/30">
              View Services
            </Link>
          </div>
          <div className="flex items-center space-x-6 pt-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-14 h-14 rounded-2xl border-4 border-white object-cover" alt="Patient" />
              ))}
            </div>
            <div>
              <div className="flex text-amber-400 gap-0.5">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm font-semibold text-slate-400 mt-1">Join 2,500+ happy patients</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-10 bg-sky-100 rounded-[60px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative rounded-[40px] overflow-hidden border-[12px] border-white shadow-2xl animate-float bg-slate-100">
            {/* Professional Hero Video */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              poster="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000"
              className="w-full h-full object-cover aspect-[4/5] opacity-90 transition-opacity duration-700 hover:opacity-100"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-dentist-performing-a-checkup-on-a-patient-41443-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-3xl shadow-lg border border-white/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white">
                  <ShieldCheck />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Certified Excellence</h4>
                  <p className="text-xs text-slate-500">Global Dental Standards 2024</p>
                </div>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white animate-pulse">
              <Play size={16} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Services Overview */}
    <section className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div className="max-w-xl space-y-4">
          <p className="text-sky-500 font-bold text-sm tracking-widest uppercase">Our Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold">Solutions for every smile.</h2>
        </div>
        <p className="text-slate-500 max-w-sm">From routine maintenance to complex surgical procedures, we offer world-class expertise.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map(service => (
          <div key={service.id} className="group p-10 bg-white border border-slate-100 rounded-[32px] hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500 hover:translate-y-[-8px] overflow-hidden">
            <div className="mb-8 p-5 bg-slate-50 rounded-2xl w-fit group-hover:bg-sky-500 group-hover:scale-110 transition-all">
              <div className="group-hover:text-white transition-colors">
                {ICON_MAP[service.icon]}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-slate-500 mb-8 leading-relaxed font-light">{service.description}</p>
            <Link to="/services" className="inline-flex items-center text-slate-900 font-bold group-hover:text-sky-500 transition-colors">
              Explore service <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Banner with Subtle Video Background */}
    <section className="container mx-auto px-6">
      <div className="bg-slate-900 rounded-[48px] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-3xl">
        {/* Subtle Background Video for CTA */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none grayscale"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-professional-dentist-showing-teeth-model-to-a-child-41444-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
        <div className="relative z-10 space-y-12">
          <h2 className="text-5xl md:text-7xl font-bold max-w-4xl mx-auto leading-tight italic">
            Ready to fall in love with your smile again?
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Link to="/book" className="bg-sky-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-sky-400 transition-all shadow-2xl shadow-sky-500/20 hover:scale-105 active:scale-95">
              Request Your Free Consult
            </Link>
            <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center space-x-4 text-white font-bold text-xl hover:text-sky-400 transition-colors">
              <Phone /> <span>{CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-32 bg-sky-50/50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">What patients say.</h2>
          <p className="text-slate-500">Real stories from real smiles.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500">
              <div className="flex text-amber-400 mb-8 gap-0.5">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-2xl font-light text-slate-700 mb-10 leading-relaxed italic">"{t.content}"</p>
              <div className="flex items-center space-x-5 border-t border-slate-50 pt-8">
                <img src={`https://i.pravatar.cc/150?u=${t.id + 20}`} className="w-16 h-16 rounded-2xl object-cover" alt={t.name} />
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{t.name}</h4>
                  <p className="text-xs text-sky-500 uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const About = () => (
  <div className="pb-32 space-y-32">
    <section className="bg-white pt-32 pb-16">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">Decades of<br /><span className="text-sky-500">Trusted Care</span></h1>
        <p className="text-2xl text-slate-500 font-light leading-relaxed">We have been redefining dental experiences for over 15 years, prioritizing patient comfort above all else.</p>
      </div>
    </section>
    
    <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div className="space-y-10">
        <h2 className="text-4xl md:text-5xl font-bold">Our Philosophy</h2>
        <p className="text-lg text-slate-500 leading-relaxed font-light">
          At {CLINIC_INFO.name}, we don't just treat teeth—we treat people. Our mission is to provide an environment where you feel heard, safe, and valued.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            'Patient Comfort First',
            'Transparent Pricing',
            'Advanced Bio-Materials',
            'Modern Sedation Options'
          ].map(item => (
            <div key={item} className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                <CheckCircle2 size={14} className="text-white" />
              </div>
              <span className="font-bold text-slate-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 bg-sky-500 rounded-[48px] rotate-2 -z-10"></div>
        {/* Professional About Video */}
        <div className="rounded-[40px] shadow-2xl overflow-hidden aspect-video bg-slate-100">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-dentist-explaining-a-dental-procedure-to-his-patient-41440-large.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  </div>
);

const ServicesPage = () => (
  <div className="pb-32">
    <section className="pt-32 pb-24 text-center container mx-auto px-6">
      <h1 className="text-6xl md:text-8xl font-bold mb-8">What we do.</h1>
      <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">Our clinical team utilizes the latest breakthroughs in digital dentistry to provide predictable, beautiful results.</p>
    </section>
    
    {/* Video Showcase Section for Services */}
    <section className="container mx-auto px-6 mb-32">
      <div className="bg-slate-50 rounded-[64px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 border border-slate-100">
        <div className="lg:w-1/2 space-y-8">
           <div className="w-16 h-16 bg-sky-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-sky-100">
              <Sparkles size={32} />
           </div>
           <h2 className="text-4xl md:text-5xl font-bold leading-tight">Precision through<br />Modern Technology</h2>
           <p className="text-lg text-slate-500 font-light leading-relaxed">We invest in the most advanced dental technologies to ensure your treatments are as efficient, effective, and painless as possible.</p>
           <Link to="/book" className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all">
              Discover Our Tech <ArrowRight className="ml-2 w-4 h-4" />
           </Link>
        </div>
        <div className="lg:w-1/2 rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
           <video 
             autoPlay 
             muted 
             loop 
             playsInline
             className="w-full h-full object-cover aspect-video"
           >
             <source src="https://assets.mixkit.co/videos/preview/mixkit-dental-care-equipment-41439-large.mp4" type="video/mp4" />
           </video>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {SERVICES.map(s => (
          <div key={s.id} className="space-y-8 p-10 bg-white border border-slate-100 rounded-[40px] hover:border-sky-500 transition-all group">
             <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
               {ICON_MAP[s.icon]}
             </div>
             <div>
               <h2 className="text-3xl font-bold mb-4">{s.title}</h2>
               <p className="text-slate-500 leading-relaxed font-light">{s.description}</p>
             </div>
             <div className="pt-4">
                <Link to="/book" className="font-bold text-sm text-sky-500 uppercase tracking-widest hover:text-sky-600 transition-colors">Book Now</Link>
             </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const BookAppointment = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pb-32">
      <section className="pt-32 pb-16 text-center container mx-auto px-6">
        <h1 className="text-6xl font-bold mb-6">Reservation</h1>
        <p className="text-xl text-slate-500 font-light">Simple, fast, and stress-free appointment booking.</p>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-[48px] shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
          <div className="lg:col-span-5 bg-slate-900 p-16 md:p-24 text-white space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]"></div>
            <h2 className="text-4xl font-bold leading-tight relative">Your journey to a<br /><span className="text-sky-400">new smile</span> starts here.</h2>
            <ul className="space-y-10 relative">
              <li className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} className="text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Priority Scheduling</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">New patients get seen within 48 hours for emergencies.</p>
                </div>
              </li>
              <li className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} className="text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Insurance Specialists</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">We handle all the paperwork for direct insurance billing.</p>
                </div>
              </li>
            </ul>
            <div className="pt-12 relative border-t border-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Direct Concierge</p>
              <p className="text-3xl font-bold text-sky-400">{CLINIC_INFO.phone}</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 p-16 md:p-24 bg-white">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" required className="w-full bg-slate-50 border-b border-slate-200 px-0 py-4 focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-300" placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</label>
                    <input type="tel" required className="w-full bg-slate-50 border-b border-slate-200 px-0 py-4 focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-300" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preferred Service</label>
                  <select className="w-full bg-transparent border-b border-slate-200 px-0 py-4 focus:outline-none focus:border-sky-500 transition-colors">
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date Preference</label>
                  <input type="date" required className="w-full bg-transparent border-b border-slate-200 px-0 py-4 focus:outline-none focus:border-sky-500 transition-colors" />
                </div>
                <button type="submit" className="w-full bg-sky-500 text-white font-bold py-6 rounded-2xl hover:bg-sky-600 transition-all shadow-xl shadow-sky-500/10 text-lg hover:scale-[1.02]">
                  Request Appointment
                </button>
              </form>
            ) : (
              <div className="text-center py-24 space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-sky-50 text-sky-500 rounded-[32px] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-bold">Request Received</h2>
                <p className="text-slate-500 max-w-sm mx-auto font-light leading-relaxed">Thank you. One of our patient coordinators will contact you within 2 business hours to finalize your slot.</p>
                <button onClick={() => setSubmitted(false)} className="text-sky-500 font-bold border-b-2 border-sky-500 pb-1 hover:text-sky-600 transition-colors">Request another booking</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const Contact = () => (
  <div className="pb-32 space-y-32">
    <section className="pt-32 pb-16 text-center container mx-auto px-6">
      <h1 className="text-6xl font-bold mb-6">Hello.</h1>
      <p className="text-xl text-slate-500 font-light leading-relaxed">Reach out and let's start the conversation.</p>
    </section>
    
    <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
      <div className="space-y-16">
        <div className="space-y-8">
          <h2 className="text-5xl font-bold">Our Studio</h2>
          <p className="text-lg text-slate-500 leading-relaxed font-light">A serene, boutique environment designed to provide the ultimate in patient comfort and safety.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">Location</h4>
            <p className="text-slate-700 leading-relaxed font-semibold">{CLINIC_INFO.address}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">Call Us</h4>
            <p className="text-slate-700 leading-relaxed font-semibold">{CLINIC_INFO.phone}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">Email</h4>
            <p className="text-slate-700 leading-relaxed font-semibold">{CLINIC_INFO.email}</p>
          </div>
        </div>
        <div className="rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative h-[400px]">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale brightness-90" alt="Map" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-white p-6 rounded-[32px] shadow-2xl flex items-center space-x-6 animate-float border border-slate-100">
                <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">M</div>
                <div>
                   <p className="font-extrabold text-slate-900 leading-tight">Visit {CLINIC_INFO.name}</p>
                   <p className="text-xs text-sky-500 font-bold uppercase tracking-widest mt-0.5">We're open now</p>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-16 md:p-24 rounded-[48px] border border-slate-100 shadow-2xl space-y-12">
        <h2 className="text-4xl font-bold">Send us a note.</h2>
        <form className="space-y-10">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Name</label>
            <input type="text" className="w-full bg-slate-50 border-b border-slate-200 px-0 py-4 focus:outline-none focus:border-sky-500 transition-colors" placeholder="Full Name" />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
            <input type="email" className="w-full bg-slate-50 border-b border-slate-200 px-0 py-4 focus:outline-none focus:border-sky-500 transition-colors" placeholder="Email Address" />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
            <textarea rows={4} className="w-full bg-slate-50 border-b border-slate-200 px-0 py-4 focus:outline-none focus:border-sky-500 transition-colors" placeholder="Your Message"></textarea>
          </div>
          <button className="w-full bg-slate-900 text-white font-bold py-6 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:scale-[1.02]">Send Message</button>
        </form>
      </div>
    </section>
  </div>
);

const AssistantPage = () => (
  <div className="pb-32">
    <section className="bg-slate-900 pt-48 pb-64 text-white relative overflow-hidden rounded-b-[80px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent"></div>
      <div className="container mx-auto px-6 text-center max-w-5xl relative z-10 space-y-12">
        <div className="w-28 h-28 bg-white/5 backdrop-blur-3xl rounded-[32px] flex items-center justify-center mx-auto border border-white/10 shadow-2xl animate-float">
          <Sparkles className="w-12 h-12 text-sky-400" />
        </div>
        <h1 className="text-6xl md:text-[100px] font-bold leading-[0.9] tracking-tighter">Meet<br /><span className="text-sky-400">Dr. Smile</span></h1>
        <p className="text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          A calm, intelligent, and compassionate AI presence designed to guide you through every step of your dental journey.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-6 -mt-32 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 space-y-8 hover:translate-y-[-10px] transition-all duration-500 group">
           <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all"><MessageCircle /></div>
           <div>
             <h3 className="text-2xl font-bold mb-3">Conversational</h3>
             <p className="text-slate-500 text-sm leading-relaxed font-light">Instant answers to your queries with human-like understanding and professional empathy.</p>
           </div>
        </div>
        <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 space-y-8 hover:translate-y-[-10px] transition-all duration-500 group">
           <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all"><Mic /></div>
           <div>
             <h3 className="text-2xl font-bold mb-3">Voice Enabled</h3>
             <p className="text-slate-500 text-sm leading-relaxed font-light">Switch to voice mode for a natural, soothing spoken interaction whenever you need it.</p>
           </div>
        </div>
        <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 space-y-8 hover:translate-y-[-10px] transition-all duration-500 group">
           <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all"><CheckCircle2 /></div>
           <div>
             <h3 className="text-2xl font-bold mb-3">Scheduling</h3>
             <p className="text-slate-500 text-sm leading-relaxed font-light">Directly reserve your appointment slot without ever having to wait on hold.</p>
           </div>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-6 py-40 text-center">
       <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-5xl font-bold italic">Experience it now.</h2>
          <p className="text-xl text-slate-500 font-light leading-relaxed">Simply tap the chat bubble at the bottom of your screen to begin your consultation with Dr. Smile.</p>
          <div className="inline-flex items-center gap-6 p-4 bg-slate-50 rounded-[32px] border border-slate-100">
             <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i + 40}`} className="w-12 h-12 rounded-2xl border-2 border-white object-cover shadow-sm" alt="AI User" />)}
             </div>
             <p className="text-xs font-bold text-sky-600 uppercase tracking-[0.2em] pr-4">32 patients chatting now</p>
          </div>
       </div>
    </section>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
        <ChatWidget />
      </Layout>
    </HashRouter>
  );
};

export default App;
