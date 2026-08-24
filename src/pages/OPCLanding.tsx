import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  MapPin,
  FileText,
  Building2,
  Users,
  Star,
  RotateCcw,
  BadgeCheck,
  Flame,
  UserCheck,
  Briefcase,
  Layers,
  Scale,
  DollarSign,
  Calendar,
  Lock,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  FileCheck,
  Sparkles,
  BookOpen,
  FolderLock,
  Mail
} from 'lucide-react';
import {
  INDIAN_STATES_AND_UTS,
  BUSINESS_TYPES,
  BUSINESS_ACTIVITIES
} from '../data/servicesData';
import { HeaderMegaMenu } from '../components/HeaderMegaMenu';

interface OPCLandingProps {
  onBackToHome: () => void;
  onSelectService: (serviceName: string) => void;
  onOpenBrochure: () => void;
  onOpenAppointment: () => void;
}

// 6 Accordion FAQs
const FAQ_ITEMS = [
  {
    q: 'Who is eligible to incorporate a One Person Company in India?',
    a: 'Only a natural person who is an Indian citizen (whether resident in India or NRI, having stayed in India for not less than 120 days during the immediately preceding financial year) is eligible to incorporate an OPC and act as the sole shareholder and nominee.'
  },
  {
    q: 'Can a person incorporate or be a nominee in more than one One Person Company?',
    a: 'No. A natural person cannot incorporate more than one One Person Company (OPC) or be a nominee in more than one OPC at any given time as per Section 2(62) of the Companies Act, 2013 and Rule 3 of Companies (Incorporation) Rules.'
  },
  {
    q: 'Is there any minimum paid-up capital required to start an OPC?',
    a: 'No statutory minimum paid-up capital requirement exists under the Companies Act, 2013. You can legally incorporate your One Person Company with as little as ₹1,000/- or whatever authorized capital suits your business plan.'
  },
  {
    q: 'Can a One Person Company be converted into a Private Limited Company?',
    a: 'Yes. An OPC can easily convert into a Private Limited Company or Public Limited Company at any time by increasing the minimum number of directors to 2 (or 3 for public) and shareholders to 2 (or 7 for public), and filing Form INC-6 with the MCA without any threshold restrictions.'
  },
  {
    q: 'What are the mandatory annual compliances for a One Person Company?',
    a: 'Mandatory annual compliances include statutory annual audit by an independent Chartered Accountant, filing Form AOC-4 (Financial Statements) within 180 days of FY closure, filing Form MGT-7A (Abridged Annual Return) within 60 days of FY closure, holding at least 2 board meetings per year, and filing ITR-6.'
  },
  {
    q: 'What post-incorporation support does Akshay B2B Solutions provide?',
    a: 'Akshay B2B Solutions provides comprehensive end-to-end post-incorporation services including corporate bank account opening facilitation, Director KYC (DIR-3 KYC), Commencement of Business filing (INC-20A), GST registration, MSME Udyam registration, accounting, and annual filing packages.'
  }
];

// Related services cross-linking items
const RELATED_SERVICES = [
  {
    title: 'Private Limited Company',
    desc: 'Ideal for startups seeking equity funding, multiple co-founders, and fast venture scalability.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  },
  {
    title: 'Limited Liability Partnership (LLP)',
    desc: 'Hybrid corporate vehicle blending limited liability with flexible internal partnership management.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    price: '₹1,499'
  },
  {
    title: 'Sole Proprietorship Firm',
    desc: 'Simplest single-owner business setup with zero statutory MCA compliance overhead.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
    price: '₹999'
  },
  {
    title: 'Partnership Firm Registration',
    desc: 'Traditional co-founder partnership deed drafting and Registrar of Firms registration.',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  },
  {
    title: 'GST Registration & Return',
    desc: 'Mandatory tax registration for goods/service providers with complete monthly reconciliation.',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    price: '₹999'
  },
  {
    title: 'Trademark (™) Registration',
    desc: 'Protect brand names, logos, slogans, and intellectual property across all 45 classes.',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    price: '₹1,499'
  },
  {
    title: 'MSME / Udyam Registration',
    desc: 'Government recognized MSME certificate for bank loan priority and collateral-free subsidies.',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    price: '₹499'
  },
  {
    title: 'FSSAI Food License',
    desc: 'Mandatory food business operator license for manufacturers, distributors, and cloud kitchens.',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  },
  {
    title: 'Import Export Code (IEC)',
    desc: 'Lifetime DGFT registration required for international customs clearance and foreign remittance.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  }
];

export const OPCLanding: React.FC<OPCLandingProps> = ({
  onBackToHome,
  onSelectService,
  onOpenBrochure,
  onOpenAppointment
}) => {
  // Navigation tabs state
  const [activeNavTab, setActiveNavTab] = useState('overview');

  // Form state
  const [formStep, setFormStep] = useState(1);
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [businessType, setBusinessType] = useState('One Person Company (OPC)');
  const [businessActivity, setBusinessActivity] = useState(BUSINESS_ACTIVITIES[0]);
  const [panNumber, setPanNumber] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K4M9');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantMobile, setApplicantMobile] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  // Animated counters
  const [counterClients, setCounterClients] = useState(0);
  const [counterCertificates, setCounterCertificates] = useState(0);
  const [counterProfessionals, setCounterProfessionals] = useState(0);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Counter animation effect
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const steps = 40;
    const intervalTime = duration / steps;
    const timer = setInterval(() => {
      start += 1;
      const progress = start / steps;
      setCounterClients(Math.floor(progress * 18500));
      setCounterCertificates(Math.floor(progress * 25000));
      setCounterProfessionals(Math.floor(progress * 150));
      if (start >= steps) {
        clearInterval(timer);
        setCounterClients(18500);
        setCounterCertificates(25000);
        setCounterProfessionals(150);
      }
    }, intervalTime);
    return () => clearInterval(timer);
  }, []);

  const handleNextStep = () => {
    if (formStep === 1) {
      if (!selectedState) return;
      setFormStep(2);
    } else if (formStep === 2) {
      if (!applicantName || !applicantMobile) {
        alert('Please provide your full name and mobile number to continue.');
        return;
      }
      setFormStep(3);
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      alert('Invalid Captcha. Please enter the correct code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 850);
  };

  const regenerateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveNavTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
      {/* 1. TOP ANNOUNCEMENT & BRAND HEADER */}
      <div className="bg-[#0B3D91] text-white text-xs py-2 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-[#F5A623] text-[#0B3D91] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
              Noida, Uttar Pradesh
            </span>
            <span className="hidden sm:inline font-medium text-slate-200">
              Akshay B2B Solutions — Solo Corporate Incorporation &amp; MCA Filing Advisory
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="tel:+919718004839"
              className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 97180 04839</span>
            </a>
            <button
              onClick={onBackToHome}
              className="text-slate-300 hover:text-white underline text-xs font-bold cursor-pointer"
            >
              ← Back to All Services
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Mega Menu */}
      <HeaderMegaMenu
        onSelectService={onSelectService}
        onOpenConsultation={() => scrollToSection('lead-capture-widget')}
      />

      <main className="flex-grow">
        {/* 2. HERO SECTION */}
        <section
          id="hero-section"
          className="relative bg-gradient-to-br from-[#0B3D91] via-[#0D47A1] to-[#082a66] text-white pt-8 sm:pt-12 pb-14 sm:pb-16 overflow-hidden border-b border-slate-200"
        >
          {/* Ambient Background Glows */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-15 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-amber-400/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-300/30 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading, Tagline, Intro, Badges & Proof */}
              <div className="lg:col-span-7 space-y-5">
                {/* Location & Speed Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Akshay B2B Solutions • Noida, Uttar Pradesh</span>
                  <span className="w-1 h-1 rounded-full bg-white/60"></span>
                  <span className="text-white">Fast-Track 7 Working Days</span>
                </div>

                {/* H1 Heading & Tagline */}
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight antialiased">
                    One Person Company
                  </h1>
                  <div className="space-y-0.5">
                    <p className="text-xl sm:text-2xl font-black text-amber-300 antialiased">
                      Get One Person Company registration starting at{' '}
                      <span className="underline decoration-[#F5A623] decoration-2 underline-offset-4 font-black text-white">
                        ₹1999/- only!
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-blue-100 antialiased">
                      + Govt. Fee, to be paid separately
                    </p>
                  </div>
                </div>

                {/* 3-4 Line Intro Paragraph */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  A One Person Company (OPC) is a prestigious private limited corporate structure that empowers a single entrepreneur to independently own, direct, and manage a complete corporate entity. It offers limited liability protection, perpetual succession, and separate legal identity while enabling 100% equity ownership retention. This structure is universally ideal for solo founders, consultants, professionals, and freelancers seeking high institutional credibility without the need for co-founders.
                </p>

                {/* 6 Feature Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <Clock className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>7 Working Days</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <Building2 className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>One Person Company</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>Name Approval</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <Award className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>DSC &amp; DIN Included</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <ShieldCheck className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>Fast Process</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <Users className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>Dedicated Advisor</span>
                  </div>
                </div>

                {/* Trust Counters */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xl sm:text-3xl font-black text-amber-300 font-mono">
                      {counterClients.toLocaleString()}+
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mt-0.5">
                      Happy Clients
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xl sm:text-3xl font-black text-white font-mono">
                      {counterCertificates.toLocaleString()}+
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mt-0.5">
                      Certificates Issued
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xl sm:text-3xl font-black text-amber-300 font-mono">
                      {counterProfessionals}+
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mt-0.5">
                      Professionals
                    </div>
                  </div>
                </div>

                {/* Review Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-white">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold">4.9/5</span>
                    <span className="text-slate-300 text-[11px]">Google Reviews</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-white">
                    <Award className="w-3 h-3 text-amber-300" />
                    <span className="font-bold">4.9/5</span>
                    <span className="text-slate-300 text-[11px]">Ambitionbox</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-white">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span className="font-bold">4.7/5</span>
                    <span className="text-slate-300 text-[11px]">Trustpilot</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Multi-Step Lead Capture Form */}
              <div id="lead-capture-widget" className="lg:col-span-5 scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400/80 p-5 sm:p-6 text-slate-900 relative">
                  {/* Urgency Badge */}
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#F5A623] text-[#0B3D91] text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-[#0B3D91]" />
                    <span>Instant ₹1,000 Less</span>
                  </div>

                  {formSubmitted ? (
                    <div className="text-center py-8 space-y-4 animate-in fade-in">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">OPC Application Received!</h3>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                        Thank you <span className="font-bold">{applicantName}</span>. Our Noida-based One Person Company registration desk has recorded your details. A dedicated corporate CA will contact you at <span className="font-bold">{applicantMobile}</span> within 15 minutes to initiate your DSC and SPICe+ filing.
                      </p>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormStep(1);
                        }}
                        className="px-5 py-2 rounded-lg bg-[#0B3D91] text-white text-xs font-bold shadow-md hover:bg-blue-900 transition-colors cursor-pointer"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Form Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <h3 className="text-base font-extrabold text-[#0B3D91]">
                              One Person Company Desk
                            </h3>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                            Step {formStep} of 3 • Flat Single Price Desk
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          MCA SPICe+ Desk
                        </span>
                      </div>

                      {/* Single Price Banner Box */}
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl p-3 mb-4 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0B3D91] text-[#F5A623] flex items-center justify-center font-black text-sm shadow-xs flex-shrink-0">
                            ₹
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block leading-tight">
                              Professional Fee
                            </span>
                            <span className="text-base font-black text-[#0B3D91] leading-none">
                              ₹1999/- only
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                            + Govt. Fee
                          </span>
                          <span className="text-[10px] font-medium text-slate-500 block leading-tight">
                            (to be paid separately)
                          </span>
                        </div>
                      </div>

                      {/* Step Progress Indicators */}
                      <div className="grid grid-cols-3 gap-1.5 mb-5">
                        <div className={`h-1.5 rounded-full ${formStep >= 1 ? 'bg-[#0B3D91]' : 'bg-slate-200'}`}></div>
                        <div className={`h-1.5 rounded-full ${formStep >= 2 ? 'bg-[#0B3D91]' : 'bg-slate-200'}`}></div>
                        <div className={`h-1.5 rounded-full ${formStep >= 3 ? 'bg-[#0B3D91]' : 'bg-slate-200'}`}></div>
                      </div>

                      <form onSubmit={handleSubmitForm} className="space-y-4">
                        {/* STEP 1: State Selector */}
                        {formStep === 1 && (
                          <div className="space-y-3 animate-in fade-in">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Select Registered Office State *
                              </label>
                              <select
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91]"
                              >
                                {INDIAN_STATES_AND_UTS.map((st) => (
                                  <option key={st} value={st}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                              <span className="text-[11px] text-slate-500 mt-1 block">
                                Determines RoC jurisdiction, SPICe+ stamp duty, and state filings.
                              </span>
                            </div>

                            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-600 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-[#0B3D91]">
                                <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                                <span>Complete Solo Corporate Setup</span>
                              </div>
                              <p className="text-[11px]">
                                Includes Class-3 DSC, DIN for Director, SPICe+ Name Approval, eMOA &amp; eAOA drafting, INC-3 Nominee consent, PAN, TAN, &amp; COI issuance.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* STEP 2: Business Type + Activity + Founder Details */}
                        {formStep === 2 && (
                          <div className="space-y-3 animate-in fade-in">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                  Business Type *
                                </label>
                                <select
                                  value={businessType}
                                  onChange={(e) => setBusinessType(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B3D91]"
                                >
                                  {BUSINESS_TYPES.map((bt) => (
                                    <option key={bt} value={bt}>
                                      {bt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                  Business Activity *
                                </label>
                                <select
                                  value={businessActivity}
                                  onChange={(e) => setBusinessActivity(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B3D91]"
                                >
                                  {BUSINESS_ACTIVITIES.map((ba) => (
                                    <option key={ba} value={ba}>
                                      {ba}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Solo Founder / Director Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={applicantName}
                                onChange={(e) => setApplicantName(e.target.value)}
                                placeholder="As per PAN / Aadhaar"
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B3D91]"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                  Mobile Number *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={applicantMobile}
                                  onChange={(e) => setApplicantMobile(e.target.value)}
                                  placeholder="10-digit mobile"
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B3D91]"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  value={applicantEmail}
                                  onChange={(e) => setApplicantEmail(e.target.value)}
                                  placeholder="founder@company.com"
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B3D91]"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 3: PAN Number + Captcha (Single Flat Price - No Package Dropdown) */}
                        {formStep === 3 && (
                          <div className="space-y-3 animate-in fade-in">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Founder PAN Number (Optional for quote)
                              </label>
                              <input
                                type="text"
                                value={panNumber}
                                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                                placeholder="ABCDE1234F"
                                maxLength={10}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono uppercase font-bold text-slate-900 focus:outline-none focus:border-[#0B3D91]"
                              />
                            </div>

                            {/* Service Flat Package Confirmation */}
                            <div className="p-3 bg-blue-50/90 border border-[#0B3D91]/30 rounded-xl space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-[#0B3D91] flex items-center gap-1">
                                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                  <span>OPC Complete Incorporation Plan</span>
                                </span>
                                <span className="text-xs font-black text-[#0B3D91] bg-amber-300 px-2 py-0.5 rounded">
                                  ₹1999/- only
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600">
                                Includes 1 Class-3 DSC, 1 DIN, SPICe+ Part A Name Approval, eMOA, eAOA, INC-3 Nominee filing, PAN, TAN, &amp; COI. Govt. MCA fees paid separately as applicable.
                              </p>
                            </div>

                            {/* Captcha */}
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Security Verification *
                              </label>
                              <div className="flex items-center gap-2">
                                <div className="bg-slate-900 text-[#F5A623] px-3 py-2 rounded-lg font-mono font-bold tracking-widest text-sm select-none">
                                  {captchaCode}
                                </div>
                                <button
                                  type="button"
                                  onClick={regenerateCaptcha}
                                  className="p-2 text-slate-500 hover:text-[#0B3D91] transition-colors"
                                  title="Change Captcha"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </button>
                                <input
                                  type="text"
                                  required
                                  value={captchaInput}
                                  onChange={(e) => setCaptchaInput(e.target.value)}
                                  placeholder="Enter code"
                                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 uppercase focus:outline-none focus:border-[#0B3D91]"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="pt-2 flex items-center gap-2">
                          {formStep > 1 && (
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
                            >
                              Back
                            </button>
                          )}
                          {formStep < 3 ? (
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="flex-1 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                            >
                              <span>Continue to Step {formStep + 1}</span>
                              <ArrowRight className="w-4 h-4 text-[#F5A623]" />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg transition-colors cursor-pointer"
                            >
                              {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                  <span>Processing...</span>
                                </span>
                              ) : (
                                <>
                                  <span>Submit &amp; Get OPC Certificate</span>
                                  <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. STICKY IN-PAGE ANCHOR NAVIGATION (15 ITEMS) */}
        <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs font-bold text-slate-600">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'what-is-opc', label: 'What is OPC' },
                { id: 'company-act', label: 'Company Act' },
                { id: 'features', label: 'Features' },
                { id: 'privileges', label: 'Privileges' },
                { id: 'status', label: 'Status' },
                { id: 'advantages', label: 'Advantages' },
                { id: 'requirements', label: 'Requirements' },
                { id: 'process', label: 'Process' },
                { id: 'compliance', label: 'Compliance' },
                { id: 'due-date', label: 'Due Date' },
                { id: 'taxability', label: 'Taxability' },
                { id: 'provisions', label: 'Provisions' },
                { id: 'why-akshayb2b', label: 'Why Akshay B2B Solutions' },
                { id: 'faqs', label: 'FAQs' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                    activeNavTab === tab.id
                      ? 'bg-[#0B3D91] text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. PRICING SECTION (SINGLE CLEAN BLOCK - NO PACKAGE TIERS) */}
        <section id="pricing" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Single Flat Transparent Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                One Person Company (OPC) Registration Package
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Zero hidden charges. Complete end-to-end corporate incorporation handled by our expert legal team in Noida.
              </p>
            </div>

            {/* Single Clean Pricing Card */}
            <div className="bg-white rounded-3xl border-2 border-[#0B3D91] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                      Lowest Cost first time ever
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                      Instant ₹1,000 less
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    One Person Company Registration
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete corporate incorporation with SPICe+ MCA approval &amp; nominee filing.
                  </p>
                </div>

                <div className="text-left md:text-right bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-0 border-slate-200">
                  <div className="text-4xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
                    ₹1999/- only
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                    + Govt. Fee (to be paid later)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    State stamp duty &amp; MCA portal fees as applicable
                  </div>
                </div>
              </div>

              {/* Combined "What you'll get" Deliverables Checklist */}
              <div className="py-8 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B3D91] flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#F5A623]" />
                  <span>Comprehensive Deliverables Checklist (Everything Included in One Plan):</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Company Name Approval', desc: 'SPICe+ Part A name reservation with the Ministry of Corporate Affairs.' },
                    { title: 'Certificate of Incorporation', desc: 'Official MCA certificate containing 21-digit corporate CIN number.' },
                    { title: 'PAN Number', desc: 'Permanent Account Number for company income tax and banking operations.' },
                    { title: 'TAN Number', desc: 'Tax Deduction and Collection Account Number for TDS compliance.' },
                    { title: 'DIN of Director', desc: 'Director Identification Number for the solo promoter/director.' },
                    { title: 'DSC of Director', desc: 'Class-3 government-grade Digital Signature Certificate with 2-year validity.' },
                    { title: 'eMOA & eAOA Drafting', desc: 'Electronic Memorandum & Articles of Association tailored for your industry.' },
                    { title: 'INC-3 Nominee Consent Filing', desc: 'Statutory drafting and formal filing of nominee consent and documents.' },
                    { title: 'Current Bank Account Opening Support', desc: 'Resolution kit and direct corporate bank account facilitation.' },
                    { title: 'Documentation Kit', desc: 'Complete set of digital incorporation masters, share certificates, and registers.' },
                    { title: 'Timely Service Delivery', desc: 'Strict milestone tracking and fast-track MCA portal follow-ups.' },
                    { title: 'Professional Support by CAs/CSs', desc: 'Direct guidance from qualified corporate professionals at Noida.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{item.title}</span>
                        <span className="text-[11px] text-slate-600 leading-snug block">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => scrollToSection('lead-capture-widget')}
                  className="w-full py-4 rounded-2xl bg-[#0B3D91] hover:bg-blue-900 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Get Started with OPC Registration at ₹1999/-</span>
                  <ArrowRight className="w-4 h-4 text-[#F5A623]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SECTION 1: OVERVIEW */}
        <section id="overview" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                1. Structural Overview
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Overview of One Person Company (OPC)
              </h2>
            </div>

            <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-semibold text-slate-900 text-base">
                A One Person Company (OPC) is a revolutionary corporate entity introduced under the Companies Act, 2013, designed specifically to enable a single individual to establish, own, and direct a fully recognized corporate entity with limited liability.
              </p>
              <p>
                Governed under Section 2(62) of the Companies Act, 2013, the OPC structure bridges the historic gap between an unorganized sole proprietorship and a full-fledged private limited company. Under traditional proprietorships, the promoter faces unlimited personal financial liability where private assets—such as residential homes, personal vehicles, and personal bank savings—remain at severe risk in case of commercial insolvency or debt recovery. In contrast, an OPC legally separates the promoter from the corporate entity, capping shareholder liability strictly to unpaid shares while safeguarding personal assets.
              </p>
              <p>
                This structure is especially targeted at independent professionals, freelancers, software developers, technical consultants, specialized service providers, and visionary solo entrepreneurs who seek corporate prestige, institutional banking trust, and seamless contract signing with global clients without being forced to dilute equity or onboard passive sleeping co-founders. Furthermore, an OPC offers immense scalability under corporate regulation, allowing effortless future conversion into a multi-shareholder private limited company when institutional capital, angel investments, or business expansions arise.
              </p>
            </div>
          </div>
        </section>

        {/* 6. SECTION 2: OPC REGISTRATION IN INDIA (WHAT IS OPC) */}
        <section id="what-is-opc" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                2. Registration Overview
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                OPC Registration in India
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900">
                In India, One Person Company incorporation is administered centrally by the Ministry of Corporate Affairs (MCA) under the statutory framework of the Companies Act, 2013 and the Companies (Incorporation) Rules, 2014.
              </p>
              <p>
                The complete registration cycle operates electronically through the MCA SPICe+ (SPICe Plus) integrated web portal. Key milestones encompass obtaining a Class-3 Digital Signature Certificate (DSC), securing a Director Identification Number (DIN), reserving a unique corporate name under SPICe+ Part A, drafting electronic charter documents (eMOA &amp; eAOA), filing statutory nominee consent in Form INC-3, and submitting the integrated SPICe+ Part B form along with AGILE-PRO-S for automatic PAN, TAN, EPFO, ESIC, and bank account allotment.
              </p>

              <div className="space-y-3 pt-3">
                {[
                  {
                    title: 'Strategic Corporate Value:',
                    desc: 'Grants solo founders the elite status of a registered corporate enterprise, unlocking corporate tenders, vendor agreements, and institutional credibility.'
                  },
                  {
                    title: 'Certificate of Incorporation Outcome:',
                    desc: 'Culminates in the issuance of a permanent Certificate of Incorporation (COI) along with a unique 21-digit Corporate Identity Number (CIN) signed by the Registrar of Companies (RoC).'
                  },
                  {
                    title: 'Market & Funding Benefits:',
                    desc: 'Enhances institutional banking creditworthiness, facilitates commercial equipment leasing, and establishes a clear legal track record for venture conversions.'
                  },
                  {
                    title: 'Processing Timeline:',
                    desc: 'The entire end-to-end incorporation cycle is generally executed within 7 to 10 working days, subject to MCA RoC scrutiny and name approval timelines.'
                  },
                  {
                    title: 'Compliance Discipline:',
                    desc: 'Demands adherence to annual audit standards and RoC statutory filings, cementing unshakeable legal transparency and financial governance.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm font-bold">{item.title} </strong>
                      <span className="text-slate-600 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 italic pt-2">
                Akshay B2B Solutions acts as your dedicated facilitator throughout the SPICe+ registration lifecycle in Noida, ensuring flawless compliance and zero rejection risk.
              </p>
            </div>
          </div>
        </section>

        {/* 7. SECTION 3: OPC IN COMPANY LAW (COMPANY ACT) */}
        <section id="company-act" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                3. Statutory Framework
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                OPC in Company Law
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 text-base">
                Under the Companies Act, 2013, Section 2(62) explicitly defines a One Person Company as a company which has only one person as a member. The Act uniquely allows the single shareholder and the sole director to be the exact same individual, granting complete executive and ownership supremacy without co-founder disputes.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Compliance Exemptions vs. Obligations:',
                    desc: 'An OPC enjoys critical statutory exemptions under the Companies Act, such as exemption from holding Annual General Meetings (AGM) under Section 96, exemption from preparing a Cash Flow Statement as part of financial statements under Section 2(40), and relaxed secretarial audit requirements.'
                  },
                  {
                    title: 'Board Meeting Requirements:',
                    desc: 'If the OPC operates with a single director, the statutory provisions of Section 173 regarding board meetings do not apply. If there are multiple directors, at least one meeting of the Board of Directors must be held in each half of a calendar year with an interval of not less than 90 days.'
                  },
                  {
                    title: 'Mandatory Nominee Appointment Provision:',
                    desc: 'Section 3(1)(c) mandates that the sole subscriber must designate a nominee in the Memorandum of Association (MOA) through Form INC-3. In the event of the sole member’s death or incapacity to contract, the nominee automatically steps in as the member to ensure continuity.'
                  },
                  {
                    title: 'Perpetual Succession Framework:',
                    desc: 'Because the nominee mechanism is legally hardcoded into the corporate charter, the company enjoys uninterrupted perpetual succession, shielding business assets, client contracts, and operations from sudden legal freeze.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Scale className="w-5 h-5 text-[#0B3D91] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm font-bold">{item.title} </strong>
                      <span className="text-slate-600 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-bold text-slate-900 pt-2">
                By synthesizing corporate autonomy with legislative exemptions, Company Law grants an OPC all the commercial muscle of a corporate enterprise alongside uncompromised solo control.
              </p>
            </div>
          </div>
        </section>

        {/* 8. SECTION 4: FEATURES */}
        <section id="features" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                4. Core Characteristics
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Features of One Person Company
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Single Shareholder Structure:',
                  desc: 'Requires strictly 1 natural person as the sole equity shareholder, preserving 100% ownership and voting authority.'
                },
                {
                  title: 'Sole Director Option:',
                  desc: 'The single member can act as the sole director, or appoint up to 15 directors for operational management without diluting shares.'
                },
                {
                  title: 'Separate Legal Status:',
                  desc: 'Maintains an autonomous corporate identity distinct from its owner, possessing its own PAN, bank accounts, and asset title.'
                },
                {
                  title: 'Limited Liability Protection:',
                  desc: 'Caps financial exposure strictly to the nominal value of unpaid shares, shielding personal properties and bank savings from company debts.'
                },
                {
                  title: 'Mandatory Nominee Requirement:',
                  desc: 'Every OPC must name a nominee who succeeds the sole owner in case of incapacitation, guaranteeing legal continuity.'
                },
                {
                  title: 'Reduced Compliance vs. Multi-Member Firms:',
                  desc: 'Enjoys streamlined RoC compliance with abridged annual returns (Form MGT-7A) and simplified director report requirements.'
                },
                {
                  title: 'Universal Sector Applicability:',
                  desc: 'Can engage in almost all commercial, industrial, IT, consulting, and service activities (excluding Section 8 non-profit or NBFC activities).'
                },
                {
                  title: 'Effortless Scalability:',
                  desc: 'Can convert into a Private Limited Company or Public Company smoothly as business operations and shareholder requirements expand.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#F5A623]" />
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-slate-500 italic pt-2">
              These defining characteristics make the One Person Company the gold standard structure for solo founders seeking corporate power with complete autonomy.
            </p>
          </div>
        </section>

        {/* 9. SECTION 5: PRIVILEGES */}
        <section id="privileges" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                5. Statutory Privileges
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Privileges of One Person Company
              </h2>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              {[
                {
                  title: 'AGM Exemption:',
                  desc: 'Section 96(1) of the Companies Act explicitly exempts an OPC from the mandatory obligation to convene an Annual General Meeting, eliminating complex notice and quorum formalities.'
                },
                {
                  title: 'Simplified Financial Statement Filing:',
                  desc: 'Under Section 2(40), an OPC is not required to prepare or submit a Cash Flow Statement as part of its financial filings, drastically lowering accounting complexity.'
                },
                {
                  title: 'Flexibility to Appoint Multiple Directors:',
                  desc: 'While equity ownership remains 100% with the sole member, the OPC can appoint up to 15 professional directors to manage daily business verticals without ceding equity control.'
                },
                {
                  title: 'Seamless Conversion Pathway:',
                  desc: 'Recent MCA amendments have removed paid-up capital and turnover thresholds, allowing voluntary conversion into a Private Limited Company anytime via Form INC-6.'
                },
                {
                  title: 'Improved Institutional Funding Access:',
                  desc: 'Banks and financial institutions view an OPC as a structured corporate borrower, making collateral-free MSME loans and working capital credit lines easier to secure than for proprietorships.'
                },
                {
                  title: 'Nominee-Based Ownership Transfer:',
                  desc: 'In unfortunate events, company ownership seamlessly transfers to the nominated individual without prolonged probate or civil court inheritance disputes.'
                },
                {
                  title: 'Abridged Annual Return Certification:',
                  desc: 'The annual return of an OPC (Form MGT-7A) does not mandate full Company Secretary (CS) certification; it can be signed solely by the single director.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <Award className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-sm font-bold">{item.title} </strong>
                    <span className="text-slate-600 text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}

              <p className="text-sm font-semibold text-[#0B3D91] pt-3">
                These statutory privileges deliver the optimal balance of corporate legal protection and lean, agile operational freedom for ambitious solopreneurs.
              </p>
            </div>
          </div>
        </section>

        {/* 10. SECTION 6: LEGAL STATUS AND OWNERSHIP STRUCTURE */}
        <section id="status" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                6. Corporate Identity
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Legal Status and Ownership Structure
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 text-base">
                Upon incorporation by the Registrar of Companies, a One Person Company attains an artificial juridical persona distinct from its creator. This separate legal identity is the cornerstone of modern corporate jurisprudence.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Sole Voting Rights & Unfettered Decision Making:',
                    desc: 'The single subscriber holds 100% of the voting equity, eliminating board deadlocks, minority shareholder disputes, and cumbersome proxy meetings.'
                  },
                  {
                    title: 'Mandatory Nominee for Business Continuity:',
                    desc: 'The corporate charter legally embeds a named nominee to step in instantly if the sole owner becomes incapacitated, preserving contracts and employee payroll.'
                  },
                  {
                    title: 'Zero Personal Liability Beyond Capital:',
                    desc: 'The promoter’s liability is strictly restricted to unpaid subscription shares. Commercial lenders, vendors, and creditors have recourse only against company assets.'
                  },
                  {
                    title: 'Direct Ownership of Property & Intellectual Rights:',
                    desc: 'An OPC can purchase commercial real estate, open domestic and international bank accounts, license software, and register trademarks in its own corporate name.'
                  },
                  {
                    title: 'Enhanced Regulatory & Banking Transparency:',
                    desc: 'Publicly registered filings on the MCA portal provide suppliers, foreign clients, and banks with verified financial and operational data, building immense trust.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <UserCheck className="w-5 h-5 text-[#0B3D91] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm font-bold">{item.title} </strong>
                      <span className="text-slate-600 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-bold text-slate-900 pt-2">
                In summary, the OPC structure binds absolute entrepreneurial control, ironclad personal liability protection, and full statutory corporate recognition into a single cohesive vehicle.
              </p>
            </div>
          </div>
        </section>

        {/* 11. SECTION 7: ADVANTAGES (6 ITEMS) */}
        <section id="advantages" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                7. Business Benefits
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Advantages of One Person Company
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Limited Liability Protection:',
                  desc: 'Protects the solo promoter from personal insolvency by restricting financial liability strictly to their unpaid share contribution.'
                },
                {
                  title: 'Separate Legal Identity:',
                  desc: 'Enjoys its own legal persona recognized across courts, banking institutions, government tenders, and global vendor networks.'
                },
                {
                  title: 'Full Control of Ownership:',
                  desc: 'Enables swift, decisive executive governance without waiting for board approvals or negotiating with conflicting partners.'
                },
                {
                  title: 'Perpetual Succession:',
                  desc: 'Guarantees unhindered business continuity through the statutory nominee clause, preventing sudden legal paralysis.'
                },
                {
                  title: 'Easier Compliance Burden:',
                  desc: 'Exempt from AGM mandates, cash flow disclosures, and heavy secretarial filings, resulting in lower compliance overhead.'
                },
                {
                  title: 'Enhanced Institutional Credibility:',
                  desc: 'Attracts enterprise clients and institutional financing much faster than informal sole proprietorships or unregistered setups.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. SECTION 8: REGISTRATION REQUIREMENTS */}
        <section id="requirements" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                8. Prerequisites &amp; Eligibility
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                OPC Registration Requirements
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 text-base">
                To incorporate a One Person Company in India, the promoter and nominee must satisfy specific statutory eligibility conditions stipulated under the Companies Act, 2013 and MCA Incorporation Rules.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    title: 'Natural Person & Citizen Requirement:',
                    desc: 'The single subscriber and nominee must be living natural individuals holding Indian citizenship (minors and legal entities are ineligible).'
                  },
                  {
                    title: 'Relaxed Residency Benchmark:',
                    desc: 'NRIs and overseas Indian citizens are eligible, provided they have resided in India for at least 120 days during the preceding financial year.'
                  },
                  {
                    title: 'One OPC Limitation Rule:',
                    desc: 'A single individual can incorporate only 1 One Person Company and act as a nominee in only 1 OPC at any given time.'
                  },
                  {
                    title: 'Mandatory Written Nominee Consent:',
                    desc: 'Written prior consent from the designated nominee must be executed and filed electronically in Form INC-3.'
                  },
                  {
                    title: 'Unique Company Name:',
                    desc: 'The proposed name must be completely distinct, not infringe registered trademarks, and end with the suffix "(OPC) Private Limited".'
                  },
                  {
                    title: 'Class-3 DSC & DIN Allotment:',
                    desc: 'A valid Class-3 Digital Signature Certificate is mandatory for the promoter to electronically sign the SPICe+ incorporation forms.'
                  },
                  {
                    title: 'Valid Registered Office Proof:',
                    desc: 'Proof of commercial or residential address (utility bill < 2 months old + NOC from property owner) must be provided.'
                  },
                  {
                    title: 'Zero Minimum Capital Mandate:',
                    desc: 'No minimum paid-up capital is required by law; promoters can start with any nominal authorized capital (e.g. ₹1,000/-).'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <strong className="text-slate-900 text-xs font-bold block mb-1">{item.title}</strong>
                    <span className="text-slate-600 text-xs">{item.desc}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 italic pt-2">
                Akshay B2B Solutions verifies and prepares every document before SPICe+ submission to guarantee 100% first-pass MCA clearance.
              </p>
            </div>
          </div>
        </section>

        {/* 13. SECTION 9: AKSHAY B2B SOLUTIONS REGISTRATION PROCESS */}
        <section id="process" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                9. Step-by-Step Execution
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Akshay B2B Solutions Registration Process
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                We manage the entire legal, drafting, and MCA portal filing workload for you from our Noida headquarters.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Initial Consultation & Document Collection',
                  desc: 'We examine your identity proofs, registered office utility records, and proposed business activities to draft a watertight incorporation strategy.'
                },
                {
                  step: '02',
                  title: 'Obtain Class-3 DSC & DIN Allotment',
                  desc: 'We procure an encrypted Class-3 Digital Signature Certificate for the sole promoter and apply for Director Identification Number (DIN) integration.'
                },
                {
                  step: '03',
                  title: 'MCA Name Approval (SPICe+ Part A)',
                  desc: 'We perform trademark and MCA database searches, then file SPICe+ Part A to secure your desired company name with the Registrar of Companies.'
                },
                {
                  step: '04',
                  title: 'Draft eMOA, eAOA & INC-3 Nominee Consent',
                  desc: 'Our corporate legal team drafts customized electronic charter documents (eMOA & eAOA) and secures the formal INC-3 nominee consent form.'
                },
                {
                  step: '05',
                  title: 'Filing Integrated SPICe+ Part B & AGILE-PRO-S',
                  desc: 'We submit the comprehensive incorporation forms with MCA along with integrated applications for company PAN, TAN, EPFO, and ESIC numbers.'
                },
                {
                  step: '06',
                  title: 'Certificate of Incorporation & Post-Setup Delivery',
                  desc: 'Upon RoC approval, we deliver your official Certificate of Incorporation (COI) containing your CIN, company PAN/TAN, and bank account opening kit.'
                }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-[#0B3D91] text-[#F5A623] font-mono font-black text-base flex items-center justify-center flex-shrink-0 shadow-xs">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 14. SECTION 10: COMPLIANCE TABLE #1 (GENERAL STATUTORY COMPLIANCE) */}
        <section id="compliance" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                10. Statutory Compliance Matrix
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                One Person Company Statutory Compliance Table
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Overview of mandatory statutory duties, records, and audit obligations under the Companies Act, 2013.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B3D91] text-white uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Requirement</th>
                    <th className="px-4 py-3">Details</th>
                    <th className="px-4 py-3">Timeline</th>
                    <th className="px-4 py-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Annual Financials &amp; Returns</td>
                    <td className="px-4 py-3">Filing Form AOC-4 (Financials) and Form MGT-7A (Annual Return) with RoC</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800">Within 180 / 60 days of FY close</td>
                    <td className="px-4 py-3 text-slate-600">Disclose balance sheet, P&amp;L, and shareholder status to MCA.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Statutory Auditor Appointment</td>
                    <td className="px-4 py-3">Appointing a practicing Chartered Accountant via Form ADT-1</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800">Within 30 days of incorporation (5-yr tenure)</td>
                    <td className="px-4 py-3 text-slate-600">Conduct independent annual audits of financial records.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Accounting Records &amp; Registers</td>
                    <td className="px-4 py-3">Maintaining statutory registers (Members, Directors, Loans, Contracts)</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800">Continuous / Updated regularly</td>
                    <td className="px-4 py-3 text-slate-600">Mandatory corporate record-keeping at registered office.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Income Tax Returns (ITR-6)</td>
                    <td className="px-4 py-3">Annual corporate tax return filing with audited balance sheet</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800">31st October of Assessment Year</td>
                    <td className="px-4 py-3 text-slate-600">Comply with Income Tax Act, 1961 provisions and corporate rates.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Board Meetings (Multi-Director)</td>
                    <td className="px-4 py-3">Holding board meetings if company has more than 1 director</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800">1 meeting per half year (min 90-day gap)</td>
                    <td className="px-4 py-3 text-slate-600">Review business operations, director resolutions, and financials.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Statutory Exemptions</td>
                    <td className="px-4 py-3">Exempt from holding AGM, Cash Flow Statement, and secretarial audit</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800">Statutory Lifetime Privilege</td>
                    <td className="px-4 py-3 text-slate-600">Significantly reduces professional accounting and legal overhead.</td>
                  </tr>
                  <tr className="hover:bg-red-50/50 transition-colors bg-red-50/20">
                    <td className="px-4 py-3 font-bold text-rose-900">Non-Compliance Consequences</td>
                    <td className="px-4 py-3 text-rose-800">Additional MCA filing fees of ₹100 per day per form + promoter penalties</td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-rose-900">Immediate upon deadline lapse</td>
                    <td className="px-4 py-3 text-rose-700">Risk of director disqualification and company strike-off by RoC.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 15. SECTION 11: COMPLIANCE DUE DATE TABLE (CALENDAR) */}
        <section id="due-date" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                11. Annual Filing Due Date Calendar
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                OPC Compliance Due Date Table
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Deadlines and statutory form numbers for annual corporate filings in India.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B3D91] text-white uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Compliance Requirement</th>
                    <th className="px-4 py-3">Form / Filing</th>
                    <th className="px-4 py-3">Deadline / Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Financial Statements Filing</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0B3D91]">Form AOC-4 (OPC)</td>
                    <td className="px-4 py-3 font-medium text-slate-800">Within 180 days of FY closure (By 27th September)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Abridged Annual Return</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0B3D91]">Form MGT-7A</td>
                    <td className="px-4 py-3 font-medium text-slate-800">Within 60 days of entering accounts in minute book</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Corporate Income Tax Return</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0B3D91]">ITR-6 (Income Tax)</td>
                    <td className="px-4 py-3 font-medium text-slate-800">31st October of every Assessment Year</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Auditor Appointment Notification</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0B3D91]">Form ADT-1</td>
                    <td className="px-4 py-3 font-medium text-slate-800">Within 15 days of appointing CA auditor</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Director Annual e-KYC</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0B3D91]">DIR-3 KYC Web</td>
                    <td className="px-4 py-3 font-medium text-slate-800">30th September of every financial year</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Quarterly TDS Returns</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0B3D91]">Form 26Q / 24Q</td>
                    <td className="px-4 py-3 font-medium text-slate-800">Quarterly (31st July, 31st Oct, 31st Jan, 31st May)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">Monthly / Quarterly GST Filings</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0B3D91]">GSTR-1 &amp; GSTR-3B</td>
                    <td className="px-4 py-3 font-medium text-slate-800">11th &amp; 20th of succeeding month (if GST registered)</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors bg-blue-50/30">
                    <td className="px-4 py-3 font-bold text-[#0B3D91]">Annual Compliance Retainer Desk</td>
                    <td className="px-4 py-3 font-medium text-slate-800">Akshay B2B Solutions CA Desk</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">Year-Round Automated Tracking &amp; Alerts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 16. SECTION 12: TAXABILITY */}
        <section id="taxability" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                12. Corporate Taxation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Taxability of One Person Company
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 text-base">
                For income tax purposes under the Income Tax Act, 1961, a One Person Company is taxed as a domestic corporate company. The standard base corporate income tax rate for domestic companies is flat 25% (for companies with turnover up to ₹400 Crores) or 22% under the concessional regime.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Surcharge & Health/Education Cess:',
                    desc: 'A mandatory 4% Health and Education Cess applies on the aggregate of income tax and applicable surcharge (surcharge applies if total taxable profit exceeds ₹1 Crore).'
                  },
                  {
                    title: 'Minimum Alternate Tax (MAT):',
                    desc: 'If taxable profit under normal provisions is lower than 15% of book profits, MAT at 15% (plus cess and surcharge) applies under Section 115JB (exempt if opting for Section 115BAA).'
                  },
                  {
                    title: 'Dividend Taxation in Shareholder Hands:',
                    desc: 'Dividend Distribution Tax (DDT) at the company level has been abolished; declared dividends are taxed in the hands of the solo shareholder at their individual slab rates.'
                  },
                  {
                    title: 'Allowable Director Remuneration:',
                    desc: 'Director salary, performance bonuses, and office expenses paid to the promoter are fully deductible as business expenditure from gross profit, optimizing net corporate tax liability.'
                  },
                  {
                    title: 'GST Compliance Overlap:',
                    desc: 'Mandatory GST registration applies when annual aggregate revenue exceeds ₹20 Lakhs (services) or ₹40 Lakhs (goods), with full input tax credit (ITC) eligibility.'
                  },
                  {
                    title: 'Timely Advance Tax Schedule:',
                    desc: 'OPCs must pay advance tax in 4 quarterly installments (15% by June 15, 45% by Sept 15, 75% by Dec 15, and 100% by March 15) to avoid interest under Section 234B/C.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                    <DollarSign className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm font-bold">{item.title} </strong>
                      <span className="text-slate-600 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm font-semibold text-[#0B3D91] pt-2">
                Akshay B2B Solutions delivers strategic corporate tax advisory to ensure you leverage all allowable exemptions, salary structures, and deductions legally.
              </p>
            </div>
          </div>
        </section>

        {/* 17. SECTION 13: SPECIFIC TAX PROVISIONS */}
        <section id="provisions" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                13. Statutory Tax Code Sections
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Specific Tax Provisions for One Person Company
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 text-base">
                Understanding targeted tax code provisions ensures your One Person Company remains fully compliant while optimizing corporate tax outgo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    title: 'Section 115BAA Concessional Tax Regime:',
                    desc: 'Domestic OPCs can opt for a flat 22% corporate tax rate (effective 25.17% including 10% surcharge and 4% cess) subject to foregoing specific exemptions, with complete MAT exemption.'
                  },
                  {
                    title: 'TDS Deduction & Compliance Obligations:',
                    desc: 'OPCs must deduct Tax Deducted at Source (TDS) on commercial vendor payments, contractor charges (Section 194C), professional fees (Section 194J), and commercial rent (Section 194I).'
                  },
                  {
                    title: 'GST Thresholds & Reverse Charge (RCM):',
                    desc: 'Must register for GST upon crossing ₹20 Lakhs (services) or ₹40 Lakhs (goods) turnover, and discharge GST liabilities under Reverse Charge Mechanism where statutory.'
                  },
                  {
                    title: 'Section 44AB Statutory Audit Benchmark:',
                    desc: 'Under the Companies Act, an OPC must undergo annual audit by a Chartered Accountant regardless of turnover; Income Tax audit applies if business turnover crosses statutory limits.'
                  },
                  {
                    title: 'Allowable Business Expenditure Deductions:',
                    desc: 'Legitimate business expenses including office rent, software licenses, travel, employee salaries, and marketing can be fully claimed against gross revenue.'
                  },
                  {
                    title: 'Advance Tax Assessment Benchmarks:',
                    desc: 'Every OPC having an estimated tax liability of ₹10,000/- or more in a financial year is mandated to pay advance tax to prevent penal interest levies.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 text-xs font-bold block mb-1">{item.title}</strong>
                    <span className="text-slate-600 text-xs">{item.desc}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 italic pt-2">
                Our tax experts in Noida provide end-to-end advance tax planning, quarterly TDS returns, and corporate ITR-6 filing services.
              </p>
            </div>
          </div>
        </section>

        {/* 18. SECTION 14: WHY AKSHAY B2B SOLUTIONS HELPS */}
        <section id="why-akshayb2b" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                14. Our Value Proposition
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                How Akshay B2B Solutions Helps
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 text-base">
                Incorporating a One Person Company requires precision drafting, trademark screening, and meticulous SPICe+ MCA compliance. Akshay B2B Solutions serves as your dedicated corporate advisory partner based out of Noida, Uttar Pradesh.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Comprehensive Documentation & Drafting Handling:',
                    desc: 'We draft customized eMOA, eAOA, and INC-3 nominee declarations tailored to your unique commercial objectives.'
                  },
                  {
                    title: 'Direct MCA RoC Portal Coordination:',
                    desc: 'Our experienced Company Secretaries and Advocates interface directly with the Ministry of Corporate Affairs for swift approvals.'
                  },
                  {
                    title: 'Post-Registration Compliance Securing:',
                    desc: 'We set up your corporate bank accounts, draft Board Resolutions, file Form INC-20A (Commencement of Business), and appoint statutory auditors.'
                  },
                  {
                    title: 'Completely Transparent Single Pricing:',
                    desc: 'A flat ₹1999/- fee with zero hidden consultation charges, ensuring honest, predictable legal budgeting.'
                  },
                  {
                    title: 'Continuous Communication & Status Alerts:',
                    desc: 'Real-time updates via WhatsApp, phone, and email across every milestone—from DSC to Certificate of Incorporation.'
                  },
                  {
                    title: 'Elimination of Rejection Risks:',
                    desc: 'Rigorous multi-tier verification before submission ensures 100% compliance with MCA naming rules and zero resubmissions.'
                  },
                  {
                    title: 'Year-Round Compliance Retainer Support:',
                    desc: 'Dedicated CA support for annual AOC-4, MGT-7A, DIR-3 KYC, and corporate ITR filings throughout the life of your business.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm font-bold">{item.title} </strong>
                      <span className="text-slate-600 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-bold text-slate-900 pt-2 text-center">
                Experience seamless, professional, and stress-free One Person Company incorporation with Akshay B2B Solutions.
              </p>
            </div>
          </div>
        </section>

        {/* 19. SECTION 15: FAQ SECTION (6 ACCORDION PAIRS) */}
        <section id="faqs" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                15. Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Questions on One Person Company Registration
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                        openFaqIndex === idx ? 'transform rotate-180 text-[#0B3D91]' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 20. TRUST / WHY US SECTION (6 CARDS) */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                The Akshay B2B Solutions Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Why Entrepreneurs Choose Akshay B2B Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B3D91] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Expert Guidance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct consultation with seasoned corporate advocates and Chartered Accountants in Noida with over a decade of MCA corporate advisory experience.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Time-Saving Process</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Streamlined digital workflows enable rapid Class-3 DSC procurement, SPICe+ name approval, and incorporation within 7 to 10 working days.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Affordable Pricing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent flat pricing at ₹1999/- only with zero hidden consultation charges. Pay applicable government fees separately as mandated.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Trusted by Thousands</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Over 18,500+ satisfied solo founders, tech consultants, and startups across India trust Akshay B2B Solutions for their corporate compliance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Compliance Alerts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated reminders for DIR-3 KYC, Form AOC-4, Form MGT-7A, and advance tax deadlines to safeguard your company from penalties.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Secure and Confidential</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enterprise-grade document security protocols to ensure your PAN, Aadhaar, and sensitive corporate charters remain 100% confidential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 21. CONVERSION CTA BANNER */}
        <section className="py-12 bg-gradient-to-r from-[#0B3D91] via-[#0D47A1] to-[#0B3D91] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-[#0B3D91] text-xs font-black uppercase tracking-wider">
              Noida Corporate Desk • Fast 7-Day Incorporation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Register Your Business with Confidence
            </h2>
            <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Partner with Akshay B2B Solutions in Noida, Uttar Pradesh for seamless, digital, and fully compliant One Person Company incorporation at a single flat price of ₹1999/- only.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('lead-capture-widget')}
                className="px-6 py-3.5 rounded-xl bg-[#F5A623] hover:bg-amber-400 text-[#0B3D91] font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Start OPC Registration at ₹1999/-</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Book Free Appointment with CA</span>
              </button>
            </div>
          </div>
        </section>

        {/* 22. RELATED SERVICES CROSS-LINKING (9 CARDS) */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Explore Other Entity Structures
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Popular Legal &amp; Compliance Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RELATED_SERVICES.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow bg-white flex flex-col justify-between group"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-[#F5A623] text-[#0B3D91] font-black text-[10px]">
                      Starts at {item.price}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        onSelectService(item.title);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2 rounded-lg bg-slate-100 hover:bg-[#0B3D91] text-slate-700 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 23. FOOTER */}
      <footer className="bg-slate-950 text-white pt-12 pb-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Company Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F5A623] text-[#0B3D91] font-black flex items-center justify-center text-base">
                  A
                </div>
                <span className="font-black text-base tracking-tight text-white">
                  Akshay B2B Solutions
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Premier corporate incorporation and legal compliance consultancy based in Noida, Uttar Pradesh. Empowering businesses across India with transparent, digital legal workflows.
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
                <MapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>Sector 62, Noida, Uttar Pradesh - 201309</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">
                Entity Formations
              </h4>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li>
                  <button
                    onClick={() => {
                      onSelectService('One Person Company');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    One Person Company (OPC)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectService('Limited Liability Partnership');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Limited Liability Partnership (LLP)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectService('Private Limited Company');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Private Limited Company
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectService('Sole Proprietorship');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Sole Proprietorship Firm
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Tax & Compliances */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">
                Tax &amp; Registrations
              </h4>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li>
                  <button
                    onClick={() => {
                      onSelectService('GST Registration');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    GST Registration &amp; Filings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectService('Trademark Registration');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Trademark (™) Registration
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectService('MSME Registration');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    MSME / Udyam Certificate
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectService('FSSAI Food License');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    FSSAI Food License
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Desk */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">
                Noida Headquarters Desk
              </h4>
              <div className="space-y-2 text-slate-400 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
                  <a href="tel:+919718004839" className="hover:text-white">
                    +91 97180 04839
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F5A623]" />
                  <a href="mailto:contact@akshayb2bsolutions.com" className="hover:text-white">
                    contact@akshayb2bsolutions.com
                  </a>
                </div>
                <div className="pt-2">
                  <button
                    onClick={onOpenAppointment}
                    className="w-full py-2 rounded-lg bg-[#F5A623] hover:bg-amber-400 text-[#0B3D91] font-bold text-xs transition-colors cursor-pointer"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory Disclaimer */}
          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed text-center">
            <p>
              <strong>Disclaimer:</strong> This is not a Government run website. Akshay B2B Solutions is a private legal, corporate compliance, and business consultancy firm based in Noida, Uttar Pradesh. The fee collected on this website is a consultancy and professional facilitation fee, which is separate from applicable government fees and statutory stamp duties.
            </p>
            <p className="mt-2 text-slate-600">
              © {new Date().getFullYear()} Akshay B2B Solutions. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
