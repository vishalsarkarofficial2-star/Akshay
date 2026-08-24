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
  FolderLock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Share2,
  Send,
  MessageSquare
} from 'lucide-react';
import {
  INDIAN_STATES_AND_UTS,
  BUSINESS_TYPES,
  BUSINESS_ACTIVITIES,
  COMPANY_DETAILS
} from '../data/servicesData';
import { HeaderMegaMenu } from '../components/HeaderMegaMenu';
import { TopUtilityBar } from '../components/TopUtilityBar';
import { AuthModal } from '../components/AuthModal';
import { PartnershipContentSections } from './partnership/PartnershipContentSections';

interface PartnershipFirmLandingProps {
  onBackToHome: () => void;
  onSelectService: (serviceName: string) => void;
  onOpenBrochure: () => void;
  onOpenAppointment: () => void;
}

// Table of Contents Anchor Links (Exact order requested)
const TOC_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'registration', label: 'Registration' },
  { id: 'partnership-firm', label: 'Partnership Firm' },
  { id: 'key-characteristics', label: 'Key Characteristics' },
  { id: 'importance-benefits', label: 'Importance & Benefits' },
  { id: 'package-section', label: 'Packages' },
  { id: 'types', label: 'Types' },
  { id: 'table-registered-vs-unregistered', label: 'Partnership vs Unregistered' },
  { id: 'table-partnership-vs-llp', label: 'Partnership vs LLP' },
  { id: 'table-differences', label: 'Difference (Key Comparison)' },
  { id: 'laws-governing', label: 'Laws Governing' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'process', label: 'Registration Process' },
  { id: 'compliance', label: 'Post-Registration Compliance' },
  { id: 'timelines', label: 'Timelines' },
  { id: 'post-registration-detailed', label: 'Post-Registration (Detailed)' },
  { id: 'certification', label: 'Certification' },
  { id: 'fees', label: 'Fees' },
  { id: 'taxation', label: 'Taxation' },
  { id: 'why-akshayb2b', label: 'Why Akshay B2B Solutions' },
  { id: 'faqs', label: "FAQ's" }
];

// Related services cross-linking items
const RELATED_SERVICES = [
  {
    title: 'Limited Liability Partnership (LLP)',
    desc: 'Combines partnership operational flexibility with full limited liability protection.',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  },
  {
    title: 'Private Limited Company',
    desc: 'Most popular corporate vehicle for equity fundraising, venture capital, and startups.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  },
  {
    title: 'One Person Company (OPC)',
    desc: 'Single entrepreneur corporate structure with separate legal entity status.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
    price: '₹1,999'
  },
  {
    title: 'Sole Proprietorship Firm',
    desc: 'Simple single-owner business setup with minimal statutory registration hassle.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    price: '₹999'
  },
  {
    title: 'GST Registration & Filing',
    desc: 'Mandatory tax registration with end-to-end monthly input tax credit filing.',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    price: '₹999'
  },
  {
    title: 'Trademark (™) Registration',
    desc: 'Protect brand names, logos, slogans, and trade identity across all 45 classes.',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    price: '₹1,499'
  }
];

export const PartnershipFirmLanding: React.FC<PartnershipFirmLandingProps> = ({
  onBackToHome,
  onSelectService,
  onOpenBrochure,
  onOpenAppointment
}) => {
  // Navigation tabs state
  const [activeNavTab, setActiveNavTab] = useState('overview');

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Form state
  const [formStep, setFormStep] = useState(1);
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [businessType, setBusinessType] = useState('Partnership');
  const [businessActivity, setBusinessActivity] = useState(BUSINESS_ACTIVITIES[0]);
  const [panNumber, setPanNumber] = useState('');
  const [selectedPackageTier, setSelectedPackageTier] = useState('Standard Partnership Registration (₹2,999 + Govt Fee)');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K4B9');
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
      if (!businessType || !businessActivity) return;
      setFormStep(3);
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const reloadCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaCode.toUpperCase()) {
      alert('Security Captcha does not match. Please verify.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveNavTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToLeadForm = () => {
    const el = document.getElementById('partnership-lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#0B3D91] selection:text-white flex flex-col antialiased">
      {/* 1. HEADER / TOP UTILITY BAR */}
      <div id="top-utility-bar" className="bg-[#0B3D91] text-white text-xs py-2 px-4 border-b border-white/10 z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Left: Email & Phone */}
          <div className="flex items-center gap-4">
            <a
              id="top-email-link"
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="flex items-center gap-1.5 text-blue-100 hover:text-[#F5A623] transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
            <span className="hidden md:inline text-white/30">|</span>
            <a
              id="top-phone-link"
              href={`tel:${COMPANY_DETAILS.phoneClean}`}
              className="flex items-center gap-1.5 text-white hover:text-[#F5A623] transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
          </div>

          {/* Right: Brochure, Login, Socials */}
          <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4">
            <button
              id="top-brochure-btn"
              onClick={onOpenBrochure}
              className="flex items-center gap-1 text-blue-100 hover:text-white transition-colors cursor-pointer font-medium"
              title="Download Corporate Brochure"
            >
              <Download className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Company Brochure</span>
            </button>

            <span className="text-white/30">|</span>

            <button
              id="top-login-btn"
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1 text-white hover:text-[#F5A623] transition-colors cursor-pointer font-semibold"
            >
              <Lock className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Login</span>
            </button>

            <span className="hidden lg:inline text-white/30">|</span>

            {/* Social Icons */}
            <div className="hidden lg:flex items-center gap-2 text-white/80">
              <a
                href={COMPANY_DETAILS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#F5A623] transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_DETAILS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#F5A623] transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_DETAILS.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#F5A623] transition-colors p-1"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_DETAILS.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#F5A623] transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION MENU (MEGA MENU) */}
      <HeaderMegaMenu
        onSelectService={(service) => {
          if (service.toLowerCase().includes('partnership')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            onSelectService(service);
          }
        }}
        onBackToHome={onBackToHome}
        onOpenBrochure={onOpenBrochure}
        onOpenAppointment={onOpenAppointment}
      />

      {/* 3. BREADCRUMB */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-600 font-medium">
          <button
            onClick={onBackToHome}
            className="hover:text-[#0B3D91] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>»</span>
          <span className="text-[#0B3D91] font-bold">Partnership Firm</span>
        </div>
      </div>

      {/* 4. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#0B3D91] via-[#0D47A1] to-[#0A2E6E] text-white pt-10 pb-16 px-4 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Heading, Hook, Intro, Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#F5A623] text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast Track 7-14 Days Registrar of Firms Registration</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Partnership Firm
            </h1>

            {/* One-line price hook */}
            <div className="bg-[#F5A623]/20 border border-[#F5A623]/40 rounded-xl p-3.5 text-[#F5A623] font-bold text-base sm:text-lg inline-block">
              ⚡ Obtain Partnership Firm Registration at just ₹2999/- only + Govt. Fee!
            </div>

            {/* 3-4 line intro paragraph */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              A Partnership Firm is a traditional commercial structure formed by two or more individuals sharing profits, operational responsibilities, and management duties. Operates strictly under an executed partnership deed defining partner rights, capital contribution, and duties. Governed under the landmark Indian Partnership Act, 1932, it remains one of India's most popular business formats due to its simplicity, ease of formation, and minimal statutory compliance burden for small and medium enterprises.
            </p>

            {/* 5-6 short key-term tags/badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Partnership Deed',
                'Profit Sharing Ratio',
                'Rights & Duties of Partners',
                'Indian Partnership Act, 1932',
                'Firm Name Registration',
                'PAN & TAN'
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 5. TRUST STATS BAR (ANIMATED COUNTERS) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-[#F5A623]">
                  {counterClients.toLocaleString()}+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Happy Clients</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {counterCertificates.toLocaleString()}+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Certificates Issued</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-[#F5A623]">
                  {counterProfessionals.toLocaleString()}+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Professionals</div>
              </div>
            </div>

            {/* 6. REVIEW BADGES ROW */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <span className="text-xs font-bold text-white">Google Reviews</span>
                <div className="flex items-center text-[#F5A623]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-black text-white ml-1">4.9/5</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <span className="text-xs font-bold text-white">Ambitionbox</span>
                <div className="flex items-center text-emerald-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-black text-white ml-1">4.9/5</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <span className="text-xs font-bold text-white">Trustpilot</span>
                <div className="flex items-center text-[#F5A623]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-black text-white ml-1">4.7/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 7. LEAD CAPTURE FORM ("Get Expert Consultation") */}
          <div className="lg:col-span-5" id="partnership-lead-form">
            <div className="bg-white rounded-2xl shadow-2xl p-6 text-slate-900 border border-slate-200 relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-[#0B3D91]">
                    Get Expert Consultation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Registration handled end-to-end by Senior Corporate Lawyers &amp; CAs
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0B3D91] flex items-center justify-center font-black text-xs">
                  {formStep}/3
                </div>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Application Initiated!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <span className="font-bold text-slate-900">{applicantName || 'Partner'}</span>. Our senior partnership registration advisor is reviewing your application details and will call you on{' '}
                    <span className="font-bold text-slate-900">{applicantMobile || 'your mobile'}</span> within 15 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormStep(1);
                    }}
                    className="mt-4 px-6 py-2 rounded-xl bg-[#0B3D91] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Step 1: Select State */}
                  {formStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Applicant Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar & Suresh Gupta"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={applicantMobile}
                            onChange={(e) => setApplicantMobile(e.target.value)}
                            placeholder="10-digit mobile"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            placeholder="contact@firm.com"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Step 1: Select State (Jurisdiction) *
                        </label>
                        <select
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-white"
                        >
                          {INDIAN_STATES_AND_UTS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <p className="text-[10px] text-slate-500 mt-1">
                          State stamp duty and RoF procedures will be calibrated for {selectedState}.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full py-3 px-4 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                      >
                        <span>Continue to Step 2</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Step 2: Business Type & Activity */}
                  {formStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Business Type *
                        </label>
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-white"
                        >
                          <option value="Partnership">Partnership Firm</option>
                          <option value="Sole Proprietorship">Sole Proprietorship</option>
                          <option value="Limited Liability Partnership (LLP)">LLP</option>
                          <option value="OPC-Pvt Ltd">OPC / Private Limited</option>
                          <option value="Limited">Public Limited</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Business Activity *
                        </label>
                        <select
                          value={businessActivity}
                          onChange={(e) => setBusinessActivity(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-white"
                        >
                          {BUSINESS_ACTIVITIES.map((act) => (
                            <option key={act} value={act}>
                              {act}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-2/3 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                        >
                          <span>Continue to Step 3</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: PAN Number, Package Tier, Captcha */}
                  {formStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Primary Partner PAN (Optional for verification)
                        </label>
                        <input
                          type="text"
                          maxLength={10}
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                          placeholder="ABCDE1234F"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] uppercase tracking-wider font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Selected Package Plan *
                        </label>
                        <select
                          value={selectedPackageTier}
                          onChange={(e) => setSelectedPackageTier(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-white font-semibold text-slate-800"
                        >
                          <option value="Standard Partnership Registration (₹2,999 + Govt Fee)">
                            Standard Partnership Registration — ₹2,999 + Govt. Fee
                          </option>
                          <option value="Partnership + GST + MSME Combo (₹3,999 + Govt Fee)">
                            Partnership + GST + MSME Combo — ₹3,999 + Govt. Fee
                          </option>
                          <option value="Comprehensive Enterprise Setup + Trademark (₹5,999 + Govt Fee)">
                            Comprehensive Setup + Trademark — ₹5,999 + Govt. Fee
                          </option>
                        </select>
                      </div>

                      {/* Captcha */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Security Captcha *
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-xl font-mono text-sm font-black tracking-widest text-[#0B3D91] select-none">
                            {captchaCode}
                          </div>
                          <button
                            type="button"
                            onClick={reloadCaptcha}
                            className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
                            title="Reload Captcha"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <input
                            type="text"
                            required
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            placeholder="Enter code"
                            className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-2/3 py-2.5 rounded-xl bg-[#F5A623] hover:bg-amber-600 text-slate-900 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <span>Get Started</span>
                              <CheckCircle2 className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. STICKY TABLE OF CONTENTS JUMP-LINK BAR */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-3 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold whitespace-nowrap scrollbar-none">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mr-1">
            Quick Jump:
          </span>
          {TOC_LINKS.map((tab) => {
            const isActive = activeNavTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B3D91] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN BODY LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 Cols: 9. Section-by-Section SEO Content + 10. Pricing Package */}
        <div className="lg:col-span-8">
          {/* 10. PRICING PACKAGE SECTION (Single Package Card as requested in Section 10) */}
          <section id="package-section" className="scroll-mt-28 mb-12">
            <div className="rounded-3xl border-2 border-[#0B3D91] bg-gradient-to-b from-white to-blue-50/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Highlight Badge */}
              <div className="absolute top-0 right-0 bg-[#F5A623] text-slate-900 text-[11px] font-black uppercase px-4 py-1 rounded-bl-2xl tracking-wider shadow-sm">
                Lowest Cost First Time Ever
              </div>

              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0B3D91] text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>All-Inclusive Dedicated Service</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Partnership Firm Registration
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Complete Partnership Firm registration handled end-to-end by our experts, including custom deed drafting, state stamp duty advisory, and RoF filing.
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B3D91]">
                    ₹2999/-
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                    only + Govt. Fee (to be paid later)
                  </span>
                </div>

                {/* Two Highlight Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-600" />
                      <span>Lowest Cost Guarantee</span>
                    </div>
                    <p className="text-[11px] text-amber-800 mt-1">
                      Competitive professional fees without compromising on legal quality or drafting precision.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>Limited-Time Urgency</span>
                    </div>
                    <p className="text-[11px] text-blue-800 mt-1">
                      Instant discount available for 24 hours — fast checkout to unlock your preferential offer.
                    </p>
                  </div>
                </div>

                {/* "What you'll get" checklist (8 items with green ticks) */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                    What You'll Get in This Package:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Basic Name Availability Check',
                      'Firm Name Registration',
                      'Partnership Deed Drafting',
                      'PAN Application in Firm Name',
                      'Timely Service & Status Updates',
                      'Professional CA & Advocate Support',
                      'Dedicated Legal Advisor',
                      'Post-Registration Compliance Guidance'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={scrollToLeadForm}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0B3D91] hover:bg-blue-900 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                  >
                    <span>Get Started with Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section-by-Section SEO Content */}
          <PartnershipContentSections
            onScrollToForm={scrollToLeadForm}
            openFaqIndex={openFaqIndex}
            setOpenFaqIndex={setOpenFaqIndex}
          />
        </div>

        {/* Right 4 Cols: Sticky Sidebar (Quick Info, 11. Why Choose Us, 12. Social Share, 13. Book Appointment) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Lead Form CTA Card */}
          <div className="p-5 rounded-2xl bg-[#0B3D91] text-white space-y-4 shadow-lg">
            <h4 className="text-base font-black flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#F5A623]" />
              <span>Register Your Firm in 7 Days</span>
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Skip cumbersome paperwork. Our corporate compliance attorneys manage everything from customized deed drafting to RoF registration.
            </p>
            <button
              onClick={scrollToLeadForm}
              className="w-full py-2.5 rounded-xl bg-[#F5A623] hover:bg-amber-500 text-slate-900 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Apply for Partnership Deed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 11. WHY CHOOSE US (6 Icon Cards) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Why Choose Akshay B2B Solutions
            </h4>
            <div className="space-y-3.5">
              {[
                {
                  icon: <Award className="w-4 h-4 text-[#0B3D91]" />,
                  title: 'Expert Guidance',
                  desc: 'Handled directly by veteran corporate advocates and chartered accountants specializing in Indian partnership law.'
                },
                {
                  icon: <Clock className="w-4 h-4 text-[#0B3D91]" />,
                  title: 'Time-Saving Process',
                  desc: 'Swift document turnaround and pre-verified RoF application filing to prevent government scrutiny queries.'
                },
                {
                  icon: <DollarSign className="w-4 h-4 text-[#0B3D91]" />,
                  title: 'Affordable Pricing',
                  desc: 'Unmatched single flat pricing at ₹2999/- only with complete transparency and zero hidden surprises.'
                },
                {
                  icon: <Users className="w-4 h-4 text-[#0B3D91]" />,
                  title: 'Trusted by Thousands',
                  desc: 'Over 18,500+ satisfied co-founders and micro-enterprises incorporated across Uttar Pradesh and India.'
                },
                {
                  icon: <FileCheck className="w-4 h-4 text-[#0B3D91]" />,
                  title: 'Compliance Alerts',
                  desc: 'Automated statutory reminder engine for income tax return deadlines, GST filing, and deed amendments.'
                },
                {
                  icon: <Lock className="w-4 h-4 text-[#0B3D91]" />,
                  title: 'Secure and Confidential',
                  desc: 'Bank-grade 256-bit encryption safeguards your partner KYCs and proprietary financial arrangements.'
                }
              ].map((card, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {card.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                    <p className="text-[11px] text-slate-600 leading-normal mt-0.5">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 12. SOCIAL SHARE ROW */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#0B3D91]" />
              <span>Share this Service with Partners</span>
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white flex items-center justify-center transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
                title="Share on X"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white flex items-center justify-center transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://api.whatsapp.com/send?text=Check%20out%20Partnership%20Firm%20Registration%20at%20Akshay%20B2B%20Solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                title="Share via WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:?subject=Partnership%20Firm%20Registration&body=Check%20out%20this%20service%20by%20Akshay%20B2B%20Solutions"
                className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors"
                title="Share via Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 13. BOOK APPOINTMENT CTA BANNER */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B3D91] text-white shadow-lg space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F5A623]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black">Need a Custom Deed Consultation?</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Schedule a 1-on-1 virtual or in-person consultation with our senior corporate attorney in Noida to structure customized partnership terms.
              </p>
            </div>
            <button
              onClick={onOpenAppointment}
              className="w-full py-2.5 rounded-xl bg-white text-[#0B3D91] hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Book Appointment</span>
              <Calendar className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 14. RELATED PRODUCTS/SERVICES GRID */}
      <section className="bg-white border-t border-slate-200 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Related Business Registrations &amp; Compliance Services
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore complementary entity formations and intellectual property registrations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_SERVICES.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-lg text-xs font-black text-[#0B3D91] shadow-xs">
                    From {item.price}
                  </div>
                </div>
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0B3D91] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectService(item.title)}
                    className="w-full py-2 rounded-xl bg-white hover:bg-[#0B3D91] text-[#0B3D91] hover:text-white border border-[#0B3D91]/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. APP ADVERTISEMENT BANNER */}
      <section className="bg-gradient-to-r from-[#0B3D91] to-[#0A2E6E] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F5A623] flex-shrink-0">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-black">
                Download the Akshay B2B Solutions Mobile Compliance App
              </h4>
              <p className="text-xs text-blue-100 mt-0.5">
                Track your Partnership Firm registration status, chat live with CA advisors, and receive tax return alerts.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-black text-xs hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-md"
            >
              <span>Get on Google Play</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 17. FOOTER */}
      <footer className="bg-slate-950 text-slate-300 text-xs pt-12 pb-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Brand & Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0B3D91] text-white flex items-center justify-center font-black">
                  A
                </div>
                <span className="text-base font-black text-white">Akshay B2B Solutions</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {COMPANY_DETAILS.address}
              </p>
              <div className="space-y-1.5 text-[11px]">
                <p>
                  <strong className="text-white">Email:</strong>{' '}
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-[#F5A623]">
                    {COMPANY_DETAILS.email}
                  </a>
                </p>
                <p>
                  <strong className="text-white">Phone:</strong>{' '}
                  <a href={`tel:${COMPANY_DETAILS.phoneClean}`} className="hover:text-[#F5A623]">
                    {COMPANY_DETAILS.phone}
                  </a>
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F5A623] hover:underline pt-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Get Direction</span>
                </a>
              </div>
            </div>

            {/* Column 2: Startup & Business */}
            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Business Setup
              </h5>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li><button onClick={() => onSelectService('Partnership Firm Registration')} className="hover:text-white cursor-pointer">Partnership Firm</button></li>
                <li><button onClick={() => onSelectService('Limited Liability Partnership (LLP)')} className="hover:text-white cursor-pointer">Limited Liability Partnership</button></li>
                <li><button onClick={() => onSelectService('Private Limited Company')} className="hover:text-white cursor-pointer">Private Limited Company</button></li>
                <li><button onClick={() => onSelectService('One Person Company (OPC)')} className="hover:text-white cursor-pointer">One Person Company</button></li>
                <li><button onClick={() => onSelectService('Sole Proprietorship Firm')} className="hover:text-white cursor-pointer">Sole Proprietorship</button></li>
                <li><button onClick={() => onSelectService('Section 8 NGO Company')} className="hover:text-white cursor-pointer">Section 8 NGO</button></li>
              </ul>
            </div>

            {/* Column 3: Useful Links */}
            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Useful Links
              </h5>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li><button onClick={onBackToHome} className="hover:text-white cursor-pointer">About Us</button></li>
                <li><button onClick={onOpenAppointment} className="hover:text-white cursor-pointer">Contact Us</button></li>
                <li><button onClick={onBackToHome} className="hover:text-white cursor-pointer">Compliance Blogs</button></li>
                <li><button onClick={onBackToHome} className="hover:text-white cursor-pointer">Tax Updates &amp; Circulars</button></li>
                <li><button onClick={onBackToHome} className="hover:text-white cursor-pointer">Statutory Due Dates Calendar</button></li>
                <li><button onClick={onOpenAppointment} className="hover:text-white cursor-pointer">Partner With Us</button></li>
              </ul>
            </div>

            {/* Column 4: Important Links & Pay Now */}
            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Important Links
              </h5>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms &amp; Conditions</a></li>
                <li><a href="#refund" className="hover:text-white">Refund &amp; Cancellation Policy</a></li>
                <li><a href="#presence" className="hover:text-white">Our Regional Presence</a></li>
                <li><a href="#sitemap" className="hover:text-white">XML Sitemap</a></li>
              </ul>

              <div className="pt-2">
                <a
                  href="#pay-now"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToLeadForm();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Click For Pay Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
            <p>
              <strong>Disclaimer:</strong> Akshay B2B Solutions is a private legal consultancy and corporate compliance technology advisory enterprise based in Noida, Uttar Pradesh, India. We are NOT a government department, government ministry, or affiliated agency of the Ministry of Corporate Affairs or state Registrar of Firms. Any fees collected through this website are professional facilitation, legal drafting, and technology consultancy fees. Statutory government stamp duties and registrar portal filing fees are paid directly to respective authorities.
            </p>
          </div>

          {/* Copyright Line */}
          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Akshay B2B Solutions. All Rights Reserved.</p>
            <p>Designed &amp; Maintained by Akshay B2B Solutions Web Team</p>
          </div>
        </div>
      </footer>

      {/* 18. LOGIN / SIGNUP MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};
