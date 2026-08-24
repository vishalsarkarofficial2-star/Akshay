import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  Building2,
  Users,
  ChevronDown,
  Star,
  Download,
  Calendar,
  Check,
  HelpCircle,
  TrendingUp,
  Briefcase,
  Layers,
  Sparkles,
  Tag,
  Flame,
  Search,
  ExternalLink,
  Lock,
  RotateCcw,
  Smartphone,
  Scale,
  Receipt,
  FileCheck,
  BarChart3,
  DollarSign,
  FileSpreadsheet,
  BadgeCheck,
  BookOpen,
  FolderLock
} from 'lucide-react';
import {
  INDIAN_STATES_AND_UTS,
  BUSINESS_TYPES,
  BUSINESS_ACTIVITIES,
  COMPANY_DETAILS
} from '../data/servicesData';
import { HeaderMegaMenu } from '../components/HeaderMegaMenu';

interface LLPLandingProps {
  onBackToHome: () => void;
  onSelectService: (serviceName: string) => void;
  onOpenBrochure: () => void;
  onOpenAppointment: () => void;
}

// 6 Accordion FAQs
const FAQ_ITEMS = [
  {
    q: 'How long does the complete LLP registration process take in India?',
    a: 'On average, obtaining your digital signature certificates (DSC), DPIN allocation, MCA Name Approval (RUN-LLP), FiLLiP incorporation certificate, and Form 3 LLP agreement filing takes between 7 to 10 working days, subject to MCA portal processing speeds.'
  },
  {
    q: 'What is the minimum and maximum partner requirement for an LLP?',
    a: 'An LLP requires a minimum of 2 partners, and at least 2 of them must be designated partners (with at least one designated partner residing in India). Crucially, there is no upper limit on the maximum number of partners, providing infinite scalability.'
  },
  {
    q: 'Is a statutory tax audit mandatory for every Limited Liability Partnership?',
    a: 'No. An LLP is exempt from mandatory statutory audit unless its annual turnover exceeds ₹40 Lakhs or its total partner capital contribution exceeds ₹25 Lakhs. This significantly lowers compliance expenses for early-stage ventures.'
  },
  {
    q: 'Can foreign nationals or NRIs become designated partners in an Indian LLP?',
    a: 'Yes, foreign nationals, NRIs, and foreign corporate bodies can be partners or designated partners in an Indian LLP under the 100% FDI automatic route for sectors where 100% FDI is permitted, provided at least one designated partner is a resident Indian.'
  },
  {
    q: 'Is there any yearly renewal fee or license expiry for an LLP?',
    a: 'The Certificate of Incorporation (COI) issued by the Ministry of Corporate Affairs has perpetual validity and never expires. The LLP only needs to maintain its active status by filing annual returns (Form 11) and statement of solvency (Form 8) each financial year.'
  },
  {
    q: 'Can an existing Partnership Firm or Private Limited Company convert into an LLP?',
    a: 'Yes, the Limited Liability Partnership Act, 2008 contains specific statutory schedules allowing existing unlisted public companies, private limited companies, and traditional partnership firms to seamlessly convert into an LLP with zero capital gains tax liabilities subject to prescribed conditions.'
  }
];

// Related services cross-linking items
const RELATED_SERVICES = [
  {
    title: 'Private Limited Company',
    desc: 'Most popular corporate vehicle for equity fundraising, angel investment, and venture capital.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  },
  {
    title: 'Sole Proprietorship Firm',
    desc: 'Simple single-owner business structure with zero statutory MCA compliance overhead.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
    price: '₹999'
  },
  {
    title: 'One Person Company (OPC)',
    desc: 'Single entrepreneur corporate structure with full corporate identity and limited liability.',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    price: '₹2,499'
  },
  {
    title: 'Partnership Firm Registration',
    desc: 'Traditional co-founder partnership deed drafting and Registrar of Firms registration.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
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

export const LLPLanding: React.FC<LLPLandingProps> = ({
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
  const [businessType, setBusinessType] = useState('Limited Liability Partnership (LLP)');
  const [businessActivity, setBusinessActivity] = useState(BUSINESS_ACTIVITIES[0]);
  const [panNumber, setPanNumber] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('5P8N2');
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
      setCounterClients(Math.floor(progress * 19200));
      setCounterCertificates(Math.floor(progress * 26500));
      setCounterProfessionals(Math.floor(progress * 160));
      if (start >= steps) {
        clearInterval(timer);
        setCounterClients(19200);
        setCounterCertificates(26500);
        setCounterProfessionals(160);
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
        alert('Please provide your name and mobile number to proceed.');
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
      alert('Invalid Captcha. Please enter the correct verification code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
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
              Akshay B2B Solutions — Premium MCA Corporate Incorporation &amp; Legal Compliance Partner
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
          {/* Ambient Glows */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-15 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-amber-400/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-blue-300/30 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading, Tagline, Intro, Badges & Proof */}
              <div className="lg:col-span-7 space-y-5">
                {/* Location & Trust Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Akshay B2B Solutions • Noida, Uttar Pradesh</span>
                  <span className="w-1 h-1 rounded-full bg-white/60"></span>
                  <span className="text-white">MCA Fast-Track 7-10 Days</span>
                </div>

                {/* H1 Heading & Tagline */}
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight antialiased">
                    Limited Liability Partnership (LLP) Registration
                  </h1>
                  <div className="space-y-0.5">
                    <p className="text-xl sm:text-2xl font-black text-amber-300 antialiased">
                      Register your Limited Liability Partnership starting at{' '}
                      <span className="underline decoration-[#F5A623] decoration-2 underline-offset-4 font-black text-white">
                        ₹1499/- only!
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-blue-100 antialiased">
                      + Govt. Fee, to be paid separately
                    </p>
                  </div>
                </div>

                {/* 3-4 Line Intro Paragraph */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  Registered under the Ministry of Corporate Affairs (MCA), a Limited Liability Partnership (LLP) delivers the ultimate corporate hybrid advantage. Through seamless digital steps—Class-3 DSC procurement, DPIN allocation, RUN-LLP name reservation, FiLLiP incorporation filing, and Form 3 LLP Agreement drafting—this modern structure blends the limited liability protection and perpetual succession of a private company with the internal governance flexibility and lower compliance costs of a partnership.
                </p>

                {/* 6 Feature Badges (Key Deliverables) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <Award className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>Digital Signature (DSC)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <Users className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>DPIN / DIN Allotment</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <FileCheck className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>RUN-LLP Name Reservation</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <Building2 className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>FiLLiP Incorporation Filing</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <ShieldCheck className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>Certificate of Incorp (COI)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white">
                    <FileText className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>Agreement &amp; Form 3 Charter</span>
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
                      <h3 className="text-xl font-bold text-slate-900">LLP Application Received!</h3>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                        Thank you <span className="font-bold">{applicantName}</span>. Our Noida-based LLP incorporation specialist at Akshay B2B Solutions has been assigned to your docket. We will call you within 15 minutes at <span className="font-bold">{applicantMobile}</span> to begin your DSC and Name reservation.
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
                              LLP Online Registration Desk
                            </h3>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                            Step {formStep} of 3 • Flat Single Price Desk
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          MCA Verified Desk
                        </span>
                      </div>

                      {/* Default Single Price Highlight Box */}
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl p-3 mb-4 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0B3D91] text-[#F5A623] flex items-center justify-center font-black text-sm shadow-xs flex-shrink-0">
                            ₹
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block leading-tight">
                              Consultancy &amp; Professional Fee
                            </span>
                            <span className="text-base font-black text-[#0B3D91] leading-none">
                              ₹1499/- only
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
                                State jurisdiction determines RoC ROC registry &amp; state stamp duty for Form 3.
                              </span>
                            </div>

                            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-600 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-[#0B3D91]">
                                <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                                <span>Why Akshay B2B Solutions?</span>
                              </div>
                              <p className="text-[11px]">
                                Complete 2 DPINs, 2 DSCs, RUN-LLP Name Approval, FiLLiP filing, and customized LLP Agreement drafting handled by experienced corporate advocates.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* STEP 2: Business Type + Activity + Applicant */}
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
                                Designated Partner Full Name *
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
                                  placeholder="partner@company.com"
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
                                Designated Partner PAN Number (Optional for quote)
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
                                  <span>LLP Complete Incorporation Plan</span>
                                </span>
                                <span className="text-xs font-black text-[#0B3D91] bg-amber-300 px-2 py-0.5 rounded">
                                  ₹1499/- only
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600">
                                Includes 2 DSCs, 2 DPINs, RUN-LLP Name Approval, COI, PAN, TAN, &amp; Form 3 Agreement drafting. Govt. MCA fees paid separately as applicable.
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
                                  <span>Submit &amp; Get Registration Certificate</span>
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

        {/* 3. STICKY IN-PAGE ANCHOR NAVIGATION */}
        <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs font-bold text-slate-600">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'about', label: 'About' },
                { id: 'act', label: 'Act' },
                { id: 'company-law', label: 'LLP in Company Law' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'features', label: 'Features' },
                { id: 'benefits', label: 'Benefits' },
                { id: 'checklist', label: 'Checklist' },
                { id: 'documents', label: 'Documents' },
                { id: 'process', label: 'Process' },
                { id: 'filings', label: 'Filings' },
                { id: 'compliance-calendar', label: 'Compliance Calendar' },
                { id: 'taxation', label: 'Taxation' },
                { id: 'why-akshayb2b', label: 'Why Akshay B2B Solutions' },
                { id: 'faqs', label: "FAQ's" }
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

        {/* 4. PRICING SECTION (SINGLE FLAT CARD, NO 3-TIER PACKAGES) */}
        <section id="pricing" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Transparent Single Flat Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Limited Liability Partnership (LLP) Incorporation Package
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Zero hidden charges. Complete end-to-end statutory incorporation handled by our expert legal team in Noida.
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
                    Limited Liability Partnership (LLP) Registration
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete corporate incorporation with MCA approval &amp; agreement filing.
                  </p>
                </div>

                <div className="text-left md:text-right bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-0 border-slate-200">
                  <div className="text-4xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
                    ₹1499/- only
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
                    { title: 'RUN-LLP Name Approval', desc: 'Pre-reservation of your unique LLP name with MCA Registrar.' },
                    { title: 'Certificate of Incorporation (COI)', desc: 'Official MCA certificate containing your 7-digit LLPIN number.' },
                    { title: 'Company PAN & TAN Card', desc: 'Permanent Account Number and Tax Deduction Number generated.' },
                    { title: '2 DPIN / DIN Allotments', desc: 'Director Identification Numbers for up to 2 designated partners.' },
                    { title: '2 Class-3 DSC Tokens', desc: 'Government-grade Digital Signature Certificates with 2-year validity.' },
                    { title: 'Customized LLP Agreement Drafting', desc: 'Comprehensive partner rights, profit-sharing & management deed.' },
                    { title: 'Form 3 Filing with RoC', desc: 'Statutory filing of LLP Agreement with Registrar within 30 days.' },
                    { title: 'Current Bank Account Support', desc: 'Corporate resolution kit & direct bank account opening assistance.' },
                    { title: 'Complete Documentation Kit', desc: 'Digital soft copies, statutory registers, and e-certificates.' },
                    { title: 'Timely 7-10 Days Delivery', desc: 'Strict milestone tracking and proactive MCA portal follow-ups.' },
                    { title: 'Dedicated CA & Legal Advisor', desc: 'Direct access to experienced corporate consultants in Noida.' },
                    { title: 'Post-Registration Advisory', desc: 'Initial tax filing, MSME Udyam guidance, and compliance alerts.' }
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
                  <span>Get Started with LLP Registration at ₹1499/-</span>
                  <ArrowRight className="w-4 h-4 text-[#F5A623]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. OVERVIEW SECTION */}
        <section id="overview" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                1. Regulatory Overview
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Overview of Limited Liability Partnership (LLP)
              </h2>
            </div>

            <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
              <p>
                A Limited Liability Partnership (LLP) is a premier corporate legal vehicle regulated under the Ministry of Corporate Affairs (MCA) and governed by the Limited Liability Partnership Act, 2008. The registration process operates digitally across core statutory milestones—obtaining Class-3 Digital Signature Certificates (DSC) for designated partners, securing Designated Partner Identification Numbers (DPIN), reserving a distinctive corporate name through the RUN-LLP (Reserve Unique Name) portal, filing the integrated FiLLiP incorporation form, and executing the mandatory Form 3 LLP Agreement. This hybrid architecture effectively marries the limited liability security of a private limited company with the organizational flexibility of a traditional partnership.
              </p>
              <p>
                From an operational standpoint, an LLP provides monumental advantages for growing enterprises: there is no upper ceiling on the maximum number of partners, partners are insulated from joint liability caused by the misconduct or negligence of other partners, and annual compliance obligations are substantially lighter compared to joint-stock companies. Unlike private companies, LLPs are exempt from mandatory statutory audits until their annual turnover crosses ₹40 Lakhs or capital contribution exceeds ₹25 Lakhs. This structure is universally preferred by service professionals, tech startups, legal and financial consultants, and medium-sized trading firms seeking a credible corporate identity without oppressive compliance overhead.
              </p>
              <p className="font-semibold text-[#0B3D91]">
                Once incorporated, an LLP possesses full legal capacity as a separate corporate persona—capable of holding immovable property in its own name, maintaining a distinct PAN/TAN, entering commercial contracts, securing institutional debt funding, and maintaining perpetual succession independent of changes in partner membership.
              </p>
            </div>
          </div>
        </section>

        {/* 6. ABOUT LLP */}
        <section id="about" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                2. Structure Definition
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                About Limited Liability Partnership (LLP)
              </h2>
            </div>

            <p className="text-sm font-bold text-slate-900 bg-blue-50/80 p-4 rounded-xl border border-blue-100">
              A Limited Liability Partnership is a legally registered corporate body formed and incorporated under the Limited Liability Partnership Act, 2008, functioning as a distinct legal entity separate from its partners.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Separate Legal Entity Status',
                  desc: 'The LLP exists as an independent corporate juridical person in the eyes of law, holding its own assets, debts, and contracts distinct from the individual partners.'
                },
                {
                  title: 'Internal Management Flexibility',
                  desc: 'Mutual rights, duties, capital ratios, and dispute resolution mechanisms are governed flexibly by the mutually drafted LLP Agreement rather than rigid board procedures.'
                },
                {
                  title: 'Governing Statutory Act',
                  desc: 'Incorporated and administered under the statutory oversight of the Ministry of Corporate Affairs (MCA) and the Registrar of Companies (RoC).'
                },
                {
                  title: 'Ideal Use Cases & Archetypes',
                  desc: 'Best suited for professional consultancies, chartered accountancy firms, IT service providers, multi-partner agencies, and small-to-medium enterprises requiring liability shields.'
                },
                {
                  title: 'Mandatory Digital Registration',
                  desc: 'Incorporation is legally validated only upon issuance of the formal Certificate of Incorporation (COI) by the MCA containing the unique LLP Identification Number (LLPIN).'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#0B3D91] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block font-bold mb-0.5">{item.title}:</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 pt-2 leading-relaxed">
              At Akshay B2B Solutions, our Noida corporate legal desk assists entrepreneurs in structuring charter terms that protect minority partners while ensuring seamless operational agility.
            </p>
          </div>
        </section>

        {/* 7. GOVERNING ACT */}
        <section id="act" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                3. Legislative Framework
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Governing Act: Limited Liability Partnership Act, 2008
              </h2>
            </div>

            <p className="text-sm font-bold text-slate-900 bg-slate-100 p-4 rounded-xl border border-slate-200">
              The Limited Liability Partnership Act, 2008 (Act No. 6 of 2009) was officially enacted by the Parliament of India and came into full legal force on March 31, 2009.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Statutory Legal Definition (Section 3)',
                  desc: 'Defines an LLP as a body corporate formed and incorporated under the Act with perpetual succession and a legal identity entirely separate from its partners.'
                },
                {
                  title: 'Partner Provisions & Liability Limitation (Section 27 & 28)',
                  desc: 'Codifies that an obligation of the LLP is solely the obligation of the entity itself, protecting partners from personal liability for another partner wrongful acts or omissions.'
                },
                {
                  title: 'Designated Partner Requirements (Section 7)',
                  desc: 'Mandates every LLP to have at least two designated partners who are individuals, with at least one designated partner having resided in India for not less than 120 days during the financial year.'
                },
                {
                  title: 'Foreign Participation & 100% FDI Automatic Route',
                  desc: 'Enables foreign corporate bodies, foreign nationals, and NRIs to invest and participate as designated partners in compliant industrial sectors without prior RBI/FIPB approval.'
                },
                {
                  title: 'Statutory Filing & Transparency Obligations (Section 34 & 35)',
                  desc: 'Enforces mandatory electronic submission of Statement of Account & Solvency (Form 8) and Annual Returns (Form 11) with the Registrar of Companies to ensure transparent public records.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Scale className="w-5 h-5 text-[#0B3D91] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block font-bold mb-0.5">{item.title}:</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 pt-2 leading-relaxed">
              Recent decriminalization amendments have replaced harsh penal provisions with rationalized monetary penalties, making the LLP Act one of the most entrepreneur-friendly corporate statutes in India. Akshay B2B Solutions continuously audits your filing milestones to ensure total statutory adherence.
            </p>
          </div>
        </section>

        {/* 8. LLP IN COMPANY LAW */}
        <section id="company-law" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                4. Corporate Jurisprudence
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                LLP in Company &amp; Corporate Law
              </h2>
            </div>

            <p className="text-sm font-bold text-slate-900 bg-white p-4 rounded-xl border border-slate-200">
              In contemporary corporate jurisprudence, the LLP occupies a specialized hybrid position—bridging traditional partnership law and full-fledged corporate company law.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Governing Law Overlap & Autonomy',
                  desc: 'While administered by the Ministry of Corporate Affairs, the provisions of the Indian Partnership Act, 1932 do not apply to an LLP, granting it a dedicated, self-contained statutory code.'
                },
                {
                  title: 'Simplified Governance vs. Companies',
                  desc: 'LLPs are exempted from mandatory board meetings, general meetings, quorum requirements, statutory secretarial standards, and intricate director appointment filings mandated under the Companies Act, 2013.'
                },
                {
                  title: 'Perpetual Succession & Continuity',
                  desc: 'The corporate existence of an LLP remains completely unaffected by the insolvency, death, retirement, or mental incapacity of any partner, ensuring business contracts remain unviolated.'
                },
                {
                  title: 'Full Juridical Capacity (SUE / CONTRACT / HOLD)',
                  desc: 'An LLP possesses full legal rights to hold registered property, acquire intellectual property, sue defaulting vendors, and be sued in its own distinct corporate name.'
                },
                {
                  title: 'Audit & Secretarial Exemptions',
                  desc: 'Unlike joint-stock companies that require compulsory statutory audits from inception, LLPs enjoy statutory audit exemptions up to ₹40 Lakhs turnover and ₹25 Lakhs contribution.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                  <Building2 className="w-5 h-5 text-[#0B3D91] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block font-bold mb-0.5">{item.title}:</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 pt-2 leading-relaxed">
              This hybrid nature gives founders institutional credibility without trapping them in the rigid administrative grid of traditional corporate boards.
            </p>
          </div>
        </section>

        {/* 9. MAIN FEATURES (5 SUBSECTIONS) */}
        <section id="features" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                5. Structural Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Main Features of an LLP
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-[#0B3D91] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
                  <span>1. Body Corporate &amp; Distinct Legal Persona</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  An LLP is formed through statutory electronic registration with the Registrar of Companies under the MCA. It is vested with a unique 7-digit alphanumeric LLPIN (LLP Identification Number), functioning with legal identity independent of the founding partners.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-[#0B3D91] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
                  <span>2. Mutual Limited Liability Protection</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every partner acts as an agent of the LLP itself, but not as an agent of the other partners. Consequently, a partner&apos;s personal residential assets, bank accounts, and personal savings are shielded from business liabilities and the negligence of fellow partners.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-[#0B3D91] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
                  <span>3. Flexible Capital Structure &amp; Zero Minimum Capital</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  There is no mandatory minimum paid-up capital threshold required to incorporate an LLP. Partners can begin with as little as ₹1,000 in tangible or intangible capital contributions, eliminating arbitrary capital lock-in barriers.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-[#0B3D91] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
                  <span>4. Perpetual Succession &amp; Contracting Powers</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The life of an LLP continues indefinitely until dissolved through statutory court-approved winding-up procedures. It can enter binding supply contracts, acquire real estate, hire hundreds of employees, and register trademarks under its corporate seal.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-[#0B3D91] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
                  <span>5. Simplified Statutory Compliance Mechanism</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  LLPs are free from mandatory statutory registers, director report disclosures, secretarial audits, and annual general meeting protocols, drastically reducing the ongoing professional fees required for annual maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. BENEFITS (6 ITEMS) */}
        <section id="benefits" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                6. Core Strategic Advantages
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Key Benefits of LLP Registration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Limited Liability Protection',
                  desc: 'Partners liabilities are strictly capped to their agreed capital contribution in the LLP agreement, protecting private personal property.'
                },
                {
                  title: 'Separate Legal Entity Persona',
                  desc: 'Commands high credibility among banks, institutional vendors, foreign buyers, and government tender evaluation committees.'
                },
                {
                  title: 'Substantially Lower Compliance Burden',
                  desc: 'Requires only two annual ROC filings (Form 8 & Form 11) with zero requirement for quarterly board minutes or secretarial filings.'
                },
                {
                  title: 'Unmatched Management Flexibility',
                  desc: 'Internal voting rights, profit sharing, and management rights can be freely drafted without mandatory board structures.'
                },
                {
                  title: 'Zero Minimum Capital Mandate',
                  desc: 'Incorporate your firm with any nominal capital starting from ₹1,000 without freezing working capital reserves.'
                },
                {
                  title: 'Unlimited Scalability & No Partner Cap',
                  desc: 'Bring in dozens or hundreds of professional partners without any statutory cap on the maximum number of members.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-[#0B3D91] font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 text-center pt-2 leading-relaxed">
              Akshay B2B Solutions helps partners design clean, unambiguous agreements that maximize these benefits from day one.
            </p>
          </div>
        </section>

        {/* 11. INCORPORATION CHECKLIST */}
        <section id="checklist" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                7. Pre-Filing Readiness
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                LLP Incorporation Checklist
              </h2>
            </div>

            <p className="text-sm font-bold text-slate-900 bg-blue-50/80 p-4 rounded-xl border border-blue-100">
              Before submitting your electronic incorporation file to the Ministry of Corporate Affairs, ensure the following statutory prerequisites are fully fulfilled:
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Minimum Partner Quorum',
                  desc: 'At least two designated partners must be finalized, with at least one partner satisfying the 120-day Indian resident test.'
                },
                {
                  title: 'Class-3 Digital Signature Certificates (DSC)',
                  desc: 'Valid Class-3 encryption DSCs must be issued for all designated partners to digitally sign MCA electronic forms.'
                },
                {
                  title: 'Designated Partner Identification (DPIN/DIN)',
                  desc: 'All proposed designated partners must possess or apply for DPIN allotment through the integrated FiLLiP filing process.'
                },
                {
                  title: 'Distinct Corporate Name Reservation',
                  desc: 'Selection of 2 unique proposed names complying with MCA Name Availability Guidelines, ending with "LLP" or "Limited Liability Partnership".'
                },
                {
                  title: 'Registered Office Address Proof',
                  desc: 'A valid commercial or residential address with electricity/utility bill (under 2 months old) and signed Owner NOC.'
                },
                {
                  title: 'Founding Charter Terms & Ratio',
                  desc: 'Clear consensus on capital contribution ratio, profit/loss sharing percentage, and designated partner responsibilities.'
                },
                {
                  title: 'Digital Document Collation & Verification',
                  desc: 'PAN card copies, Aadhaar/Passport identification, and partner bank statements verified for cross-record name match.'
                },
                {
                  title: 'Integrated FiLLiP Filing Preparation',
                  desc: 'Generation of pre-filled electronic attachments, subscriber sheets, and consent declarations under Form 9.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block font-bold mb-0.5">{item.title}:</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 pt-2 leading-relaxed">
              Completing this checklist prevents MCA resubmission queries (SCR) and ensures your certificate is issued on the very first submission.
            </p>
          </div>
        </section>

        {/* 12. REQUIRED DOCUMENTS */}
        <section id="documents" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                8. Documentation Requirements
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Documents Required for LLP Registration
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  category: 'Indian Designated Partner Documents',
                  items: 'Self-attested PAN Card (mandatory), Aadhaar Card, Voter ID / Driving License / Passport for identity, and latest Bank Statement / Electricity Bill (not older than 2 months).'
                },
                {
                  category: 'Foreign Partner & NRI Documents',
                  items: 'Notarized and Apostilled / Indian Embassy certified Passport copy, driving license, and foreign bank statement with residential address proof.'
                },
                {
                  category: 'Registered Office Address Proof',
                  items: 'Electricity bill, water bill, or gas bill of the registered premises (under 2 months old), Rent Agreement (if rented), and signed No-Objection Certificate (NOC) from the property owner.'
                },
                {
                  category: 'Class-3 Digital Signature Certificates (DSC)',
                  items: 'Soft copy passport photo, email ID, and Aadhaar-linked mobile verification for DSC token issuance.'
                },
                {
                  category: 'Founding LLP Agreement & Consent',
                  items: 'Form 9 designated partner consent declaration, subscriber sheet signed by all partners, and state stamp paper for Form 3 execution.'
                },
                {
                  category: 'Special Regulatory Approvals (If Applicable)',
                  items: 'In-principle approval or NOC from sectoral regulators (RBI, SEBI, IRDAI, Bar Council, or ICAI) where the business activity is specialized.'
                }
              ].map((doc, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B3D91] mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span>{doc.category}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">{doc.items}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 pt-2 leading-relaxed">
              Document accuracy is paramount. Akshay B2B Solutions conducts thorough pre-filing scrutiny to ensure all spelling, signatures, and addresses match across government databases before submission.
            </p>
          </div>
        </section>

        {/* 13. AKSHAY B2B SOLUTIONS REGISTRATION PROCESS (6 NUMBERED STEPS) */}
        <section id="process" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                9. Step-by-Step Workflow
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Akshay B2B Solutions Registration Process
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                We handle the complete statutory filing so you never have to visit government offices.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: 'Step 1',
                  title: 'Initial Consultation & Entity Structuring',
                  desc: 'Our Noida corporate experts evaluate your business model, verify partner eligibility, review proposed names, and establish your capital contribution matrix.'
                },
                {
                  step: 'Step 2',
                  title: 'Class-3 DSC Procurement',
                  desc: 'We procure high-security Class-3 Digital Signature Certificates with video and Aadhaar OTP verification for all proposed designated partners.'
                },
                {
                  step: 'Step 3',
                  title: 'MCA Name Reservation (RUN-LLP)',
                  desc: 'We draft your primary business objects and submit the RUN-LLP name approval form to secure your brand name with the Registrar of Companies.'
                },
                {
                  step: 'Step 4',
                  title: 'DPIN / DIN Application Allocation',
                  desc: 'We prepare Designated Partner Identification Number applications through the integrated filing system for partners without existing DINs.'
                },
                {
                  step: 'Step 5',
                  title: 'Filing FiLLiP Incorporation Application',
                  desc: 'We compile Form 9 consents, registered office proofs, subscriber sheets, and submit the integrated FiLLiP form to receive your Certificate of Incorporation (COI), PAN, and TAN.'
                },
                {
                  step: 'Step 6',
                  title: 'LLP Agreement Drafting & Form 3 RoC Filing',
                  desc: 'Within 30 days of incorporation, our legal advocates draft your comprehensive LLP Agreement on state stamp paper and formally file Form 3 with the RoC to complete the legal cycle.'
                }
              ].map((st, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-[#0B3D91] text-[#F5A623] font-black text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {st.step}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">{st.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 14. ONGOING / ANNUAL FILINGS (2 DETAILED SUBSECTIONS) */}
        <section id="filings" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                10. Statutory Maintenance
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Ongoing &amp; Annual Filings for LLP
              </h2>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Every Limited Liability Partnership incorporated in India is mandated by the MCA to file two primary statutory forms annually, regardless of whether the business carried out transactions during the financial year:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form 11 */}
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-100 text-[#0B3D91]">
                    Annual Return
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Due: May 30
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Form 11 — Annual Return of LLP
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Summary of management partners and contribution changes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Must be filed within 60 days of the financial year close (by May 30).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Mandatory digital signature verification by designated partners.</span>
                  </li>
                </ul>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium">
                  <strong>Penalty Note:</strong> Late filing incurs a statutory daily additional fee until rectified. Akshay B2B Solutions automated alerts keep your docket compliant.
                </div>
              </div>

              {/* Form 8 */}
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-100 text-amber-900">
                    Solvency Statement
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Due: October 30
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Form 8 — Statement of Account &amp; Solvency
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Declaration of financial position, assets, and liabilities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Certified statement confirming the LLP ability to pay debts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Must be filed within 30 days of 6 months from FY end (by October 30).</span>
                  </li>
                </ul>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium">
                  <strong>Certification:</strong> Certified by designated partners and, if turnover exceeds ₹40 Lakhs, by an independent practicing Chartered Accountant.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 15. COMPLIANCE CALENDAR TABLE (8 ROWS) */}
        <section id="compliance-calendar" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                11. Annual Compliance Schedule
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                LLP Compliance Calendar Matrix
              </h2>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-[#0B3D91] text-white text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 sm:p-4">Compliance Requirement</th>
                    <th className="p-3.5 sm:p-4">Form / Filing</th>
                    <th className="p-3.5 sm:p-4">Due Date / Frequency</th>
                    <th className="p-3.5 sm:p-4">Purpose / Statutory Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">LLP Agreement Execution</td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-[#0B3D91] font-bold">Form 3</td>
                    <td className="p-3.5 sm:p-4">Within 30 Days of COI</td>
                    <td className="p-3.5 sm:p-4">Filing mutual partnership charter &amp; capital ratios with RoC.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-slate-50/50">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">Annual Return Filing</td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-[#0B3D91] font-bold">Form 11</td>
                    <td className="p-3.5 sm:p-4">30th May Annually</td>
                    <td className="p-3.5 sm:p-4">Statutory summary of partners and management changes.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">Statement of Solvency</td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-[#0B3D91] font-bold">Form 8</td>
                    <td className="p-3.5 sm:p-4">30th October Annually</td>
                    <td className="p-3.5 sm:p-4">Annual financial statement and solvency affirmation.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-slate-50/50">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">Income Tax Return (Non-Audit)</td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-[#0B3D91] font-bold">ITR-5</td>
                    <td className="p-3.5 sm:p-4">31st July Annually</td>
                    <td className="p-3.5 sm:p-4">For LLPs whose turnover is below statutory audit limits.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">Income Tax Return (Tax Audit)</td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-[#0B3D91] font-bold">ITR-5 &amp; Form 3CA/CB</td>
                    <td className="p-3.5 sm:p-4">31st October Annually</td>
                    <td className="p-3.5 sm:p-4">Mandatory where turnover &gt; ₹40L or contribution &gt; ₹25L.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-slate-50/50">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">GST Returns Reconciliation</td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-[#0B3D91] font-bold">GSTR-1 &amp; GSTR-3B</td>
                    <td className="p-3.5 sm:p-4">Monthly / Quarterly</td>
                    <td className="p-3.5 sm:p-4">Outward supplies declaration and input tax credit claims.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">Partner &amp; Address Changes</td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-[#0B3D91] font-bold">Form 4 / Form 15</td>
                    <td className="p-3.5 sm:p-4">Within 30 Days of Event</td>
                    <td className="p-3.5 sm:p-4">Notifying RoC of partner appointment, resignation or office shift.</td>
                  </tr>
                  <tr className="hover:bg-amber-50/60 bg-amber-50/30">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0B3D91]">Importance of Compliance</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-700" colSpan={3}>
                      Timely adherence protects partners from daily delayed filing fees and keeps the LLP in &quot;Active&quot; good standing for banking and tender bids.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 16. TAXATION */}
        <section id="taxation" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                12. Fiscal Treatment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Taxation Treatment of Limited Liability Partnerships
              </h2>
            </div>

            <p className="text-sm font-bold text-slate-900 bg-white p-4 rounded-xl border border-slate-200">
              For tax assessment under the Income Tax Act, 1961, an LLP is treated as a separate taxable partnership firm entity rather than a joint-stock company.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Flat 30% Base Corporate Tax Rate',
                  desc: 'Profits earned by an LLP are taxed at a flat base rate of 30%, plus 4% Health & Education Cess, with a 12% surcharge applicable only if total income exceeds ₹1 Crore.'
                },
                {
                  title: 'Exemption from Dividend Distribution Tax (No Double Taxation)',
                  desc: 'Profits distributed among partners after paying entity-level income tax are completely tax-exempt in the hands of the individual partners under Section 10(2A).'
                },
                {
                  title: 'Deductible Partner Remuneration & Interest (Section 40(b))',
                  desc: 'Salary, bonus, commission, and interest on capital (up to 12% p.a.) paid to working partners are allowed as legitimate tax deductions against LLP profits.'
                },
                {
                  title: 'Alternate Minimum Tax (AMT) Applicability',
                  desc: 'LLPs are subject to Alternate Minimum Tax under Section 115JC at 18.5% (plus cess/surcharge) on adjusted total income if tax deductions under Chapter VI-A are claimed.'
                },
                {
                  title: 'Statutory Audit Threshold (Rule 28 & Section 44AB)',
                  desc: 'Statutory audit by a Chartered Accountant is required only if annual turnover exceeds ₹40 Lakhs or total partner capital contribution exceeds ₹25 Lakhs.'
                },
                {
                  title: 'GST & TDS Operational Obligations',
                  desc: 'LLPs crossing the ₹20L/₹40L threshold must collect and remit GST, and deduct TDS on vendor payments under standard business provisions.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                  <Receipt className="w-5 h-5 text-[#0B3D91] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block font-bold mb-0.5">{item.title}:</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 pt-2 leading-relaxed">
              Akshay B2B Solutions tax planning desk assists partners in structuring remuneration agreements that minimize overall direct tax exposure legally.
            </p>
          </div>
        </section>

        {/* 17. WHY AKSHAY B2B SOLUTIONS (6 TRUST CARDS) */}
        <section id="why-akshayb2b" className="py-14 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                13. Trust &amp; Reliability
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Why Akshay B2B Solutions?
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl mx-auto">
                Headquartered in Noida, Uttar Pradesh, our experienced Chartered Accountants, Company Secretaries, and advocates manage your corporate filing with unmatched precision and speed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Expert Guidance',
                  desc: 'Direct consultation with seasoned corporate advocates and CAs in Noida who understand complex partnership charters and regulatory MCA nuances.'
                },
                {
                  title: 'Time-Saving Process',
                  desc: '100% digital, paperless workflows that eliminate physical office visits, securing your COI and Form 3 approval in record turnaround time.'
                },
                {
                  title: 'Affordable Flat Pricing',
                  desc: 'Single flat consultancy fee of ₹1999/- only with zero hidden charges, transparent government fee breakdowns, and maximum startup value.'
                },
                {
                  title: 'Trusted by Thousands',
                  desc: 'Over 19,200+ satisfied corporate founders, consultancies, and emerging tech startups incorporated across Uttar Pradesh and nationwide.'
                },
                {
                  title: 'Compliance Alerts',
                  desc: 'Automated milestone notifications for Form 11, Form 8, and annual tax returns to ensure your firm never incurs late filing penalties.'
                },
                {
                  title: 'Secure and Confidential',
                  desc: 'Bank-grade 256-bit encrypted data processing that protects partner PAN, Aadhaar, and sensitive charter agreements with absolute discretion.'
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B3D91] flex items-center justify-center font-bold mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-[#0B3D91] block font-bold mb-1">
                Precision and Stress-Free Corporate Incorporation:
              </strong>
              <span>
                Our structured process ownership, continuous communication, and deep statutory knowledge guarantee that your Limited Liability Partnership starts on a robust, future-proof legal foundation.
              </span>
            </div>
          </div>
        </section>

        {/* 18. FAQS ACCORDION (6 Q&A PAIRS) */}
        <section id="faqs" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                14. Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Frequently Asked Questions on LLP Registration
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#0B3D91] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0B3D91] flex items-center justify-center text-xs font-black flex-shrink-0">
                          Q
                        </span>
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-[#0B3D91]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed animate-in fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 19. FINAL CONVERSION BANNER & APPOINTMENT CTA */}
        <section className="py-14 bg-gradient-to-br from-[#0B3D91] via-[#0D47A1] to-[#082a66] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="px-3 py-1 rounded-full bg-[#F5A623] text-[#0B3D91] text-xs font-black uppercase tracking-wider inline-block">
              Start Your LLP Registration Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Register Your Business with Confidence
            </h2>
            <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Partner with Akshay B2B Solutions in Noida, Uttar Pradesh for seamless, digital, and fully compliant Limited Liability Partnership incorporation at a single flat price of ₹1499/- only.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('lead-capture-widget')}
                className="px-6 py-3.5 rounded-xl bg-[#F5A623] hover:bg-amber-400 text-[#0B3D91] font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Start LLP Registration at ₹1499/-</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#F5A623]" />
                <span>Book Free Appointment with CA</span>
              </button>
            </div>
          </div>
        </section>

        {/* 20. RELATED SERVICES CROSS-LINKING (9 CARDS) */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Explore More Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Related Business &amp; Legal Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RELATED_SERVICES.map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="h-40 w-full overflow-hidden relative">
                    <img
                      src={srv.img}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#0B3D91] text-white text-xs font-black">
                      From {srv.price}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B3D91] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{srv.desc}</p>
                    </div>
                    <button
                      onClick={() => onSelectService(srv.title)}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0B3D91] hover:text-white text-[#0B3D91] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Learn More &amp; Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 21. SITEMAP FOOTER & REGULATORY DISCLAIMER */}
        <footer className="bg-slate-950 text-slate-400 text-xs pt-12 pb-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Col */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0B3D91] flex items-center justify-center text-[#F5A623] font-black text-sm">
                    A
                  </div>
                  <span className="text-base font-black text-white">Akshay B2B Solutions</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Leading legal, corporate, and tax consultancy firm headquartered in Noida, Uttar Pradesh, empowering Indian enterprises through fast-track statutory registration.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F5A623]" />
                    <span>Sector 62, Noida, Uttar Pradesh 201309</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#F5A623]" />
                    <span>+91 97180 04839</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#F5A623]" />
                    <span>compliance@akshayb2bsolutions.com</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-2">
                <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-800 pb-1.5">
                  Incorporation Services
                </h4>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <button
                      onClick={() => onSelectService('Private Limited Company')}
                      className="hover:text-white text-left transition-colors"
                    >
                      Private Limited Company
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('Sole Proprietorship Firm')}
                      className="hover:text-white text-left transition-colors"
                    >
                      Sole Proprietorship Firm
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('Limited Liability Partnership (LLP)')}
                      className="hover:text-white text-left transition-colors font-bold text-amber-400"
                    >
                      Limited Liability Partnership (LLP)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('One Person Company (OPC)')}
                      className="hover:text-white text-left transition-colors"
                    >
                      One Person Company (OPC)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('Partnership Firm Registration')}
                      className="hover:text-white text-left transition-colors"
                    >
                      Partnership Firm Registration
                    </button>
                  </li>
                </ul>
              </div>

              {/* Taxation & IP */}
              <div className="space-y-2">
                <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-800 pb-1.5">
                  Taxation &amp; Licensing
                </h4>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <button
                      onClick={() => onSelectService('GST Registration')}
                      className="hover:text-white text-left transition-colors"
                    >
                      GST Registration &amp; Filing
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('Trademark Registration')}
                      className="hover:text-white text-left transition-colors"
                    >
                      Trademark (™) Registration
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('MSME Udyam Registration')}
                      className="hover:text-white text-left transition-colors"
                    >
                      MSME / Udyam Certificate
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('FSSAI Food License')}
                      className="hover:text-white text-left transition-colors"
                    >
                      FSSAI Food License
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectService('Import Export Code (IEC)')}
                      className="hover:text-white text-left transition-colors"
                    >
                      Import Export Code (IEC)
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal Links & Support */}
              <div className="space-y-2">
                <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-slate-800 pb-1.5">
                  Help &amp; Legal
                </h4>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <button onClick={onOpenAppointment} className="hover:text-white text-left">
                      Book CA Appointment
                    </button>
                  </li>
                  <li>
                    <button onClick={onOpenBrochure} className="hover:text-white text-left">
                      Download Service Brochure
                    </button>
                  </li>
                  <li>
                    <button onClick={onBackToHome} className="hover:text-white text-left">
                      Back to Homepage
                    </button>
                  </li>
                  <li>
                    <span className="text-slate-500">Privacy Policy &amp; Terms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Regulatory Disclaimer */}
            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
              <p className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-slate-400">
                <strong>Important Disclaimer:</strong> This is not a Government run website and the form is not the actual registration form; it is just to collect information from our clients so that our expert can easily understand their business or needs. The fee collected on this website is a consultancy fee, separate from applicable government fees.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
                <span>
                  © {new Date().getFullYear()} Akshay B2B Solutions. All Rights Reserved. Noida, Uttar Pradesh, India.
                </span>
                <span className="text-slate-400">
                  Secure 256-Bit SSL Encrypted Corporate Gateway
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
