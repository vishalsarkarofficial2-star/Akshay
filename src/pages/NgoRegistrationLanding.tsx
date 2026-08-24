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
  FileText,
  Building2,
  Users,
  ChevronDown,
  Star,
  Download,
  Calendar,
  Check,
  TrendingUp,
  Briefcase,
  Sparkles,
  Search,
  ExternalLink,
  Lock,
  RotateCcw,
  Smartphone,
  Scale,
  BadgeCheck,
  Share2,
  Heart,
  Globe,
  Landmark,
  GraduationCap
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
import { Footer } from '../components/Footer';
import { NgoRegistrationContentSections, NGO_FAQ_ITEMS } from './ngo/NgoRegistrationContentSections';

interface NgoRegistrationLandingProps {
  onBackToHome: () => void;
  onSelectService: (serviceName: string) => void;
  onOpenBrochure: () => void;
  onOpenAppointment: () => void;
}

// Table of Contents Anchor Links (Exact 18 order requested)
const TOC_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'registration', label: 'Registration/Process' },
  { id: 'what-is-ngo-registration', label: 'What is NGO Registration' },
  { id: 'key-characteristics', label: 'Key Characteristics' },
  { id: 'importance-benefits', label: 'Importance & Benefits' },
  { id: 'packages', label: 'Packages' },
  { id: 'types', label: 'Types' },
  { id: 'comparison-tables', label: 'Comparison Table(s)' },
  { id: 'laws-governing', label: 'Laws Governing' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'step-by-step-process', label: 'Step-by-Step Process' },
  { id: 'compliance', label: 'Post-Registration/Compliance' },
  { id: 'timelines', label: 'Timelines' },
  { id: 'certification', label: 'Certification' },
  { id: 'fees', label: 'Fees' },
  { id: 'taxation', label: 'Taxation' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'faqs', label: "FAQ's" }
];

// Related services cross-linking items (Business Startup — NGO Category)
const RELATED_SERVICES = [
  {
    title: 'Society Registration',
    desc: 'Democratic non-profit entity governed under Societies Registration Act 1860.',
    price: '₹4,999/-'
  },
  {
    title: 'Darpan Registration',
    desc: 'Mandatory NITI Aayog portal enrollment for accessing government grants & ministry schemes.',
    price: '₹1,999/-'
  },
  {
    title: 'Trust Registration',
    desc: 'Public charitable trust formation with perpetual succession for social and religious causes.',
    price: '₹4,999/-'
  },
  {
    title: '12A & 80G Registration',
    desc: 'Income Tax exemptions for NGOs and 50% tax deduction certificates for philanthropic donors.',
    price: '₹3,499/-'
  },
  {
    title: 'CSR 1 Registration',
    desc: 'Mandatory MCA electronic registration to receive Corporate Social Responsibility funds.',
    price: '₹1,999/-'
  },
  {
    title: 'Darpan Registration',
    desc: 'NITI Aayog registration for NGO listing and eligibility for central ministry grants.',
    price: '₹2,499/-'
  },
  {
    title: 'Section 8 Company',
    desc: 'Premier non-profit corporate vehicle under Companies Act 2013 with limited liability.',
    price: '₹2,499/-'
  },
  {
    title: 'Sole Proprietorship Firm',
    desc: 'Simple single-owner business setup with minimum statutory registration hassle.',
    price: '₹999/-'
  },
  {
    title: 'Private Limited Company',
    desc: 'Most popular corporate vehicle for equity fundraising, venture capital, and commercial enterprises.',
    price: '₹3,999/-'
  }
];

export const NgoRegistrationLanding: React.FC<NgoRegistrationLandingProps> = ({
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
  const [selectedState, setSelectedState] = useState('Delhi');
  const [businessType, setBusinessType] = useState('Others');
  const [businessActivity, setBusinessActivity] = useState(BUSINESS_ACTIVITIES[2]);
  const [panNumber, setPanNumber] = useState('');
  const [selectedPackageTier, setSelectedPackageTier] = useState('NGO Registration (₹2,999 + Govt Fee)');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('8K3P9');
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
        setCounterClients(18500);
        setCounterCertificates(25000);
        setCounterProfessionals(150);
        clearInterval(timer);
      }
    }, intervalTime);
    return () => clearInterval(timer);
  }, []);

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep(formStep + 1);
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      alert('Security Captcha does not match. Please verify.');
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNavTab(id);
    }
  };

  const scrollToLeadForm = () => {
    const el = document.getElementById('consultation-form-block');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = 'NGO Registration starting at ₹2999/- only + Govt. Fee! | Akshay B2B Solutions';
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
    } else if (platform === 'gmail') {
      window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out NGO Registration on Akshay B2B Solutions: ' + url)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col antialiased">
      {/* 1. Header / Top Utility Bar */}
      <TopUtilityBar
        onOpenBrochure={onOpenBrochure}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Main Navigation (Mega Menu) */}
      <HeaderMegaMenu
        onSelectService={onSelectService}
        onOpenBrochure={onOpenBrochure}
        onOpenAppointment={onOpenAppointment}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 3. Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-600 flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="hover:text-blue-900 font-semibold cursor-pointer"
          >
            Home
          </button>
          <span>»</span>
          <span className="text-blue-900 font-bold">NGO Registration</span>
        </div>
      </div>

      {/* 4. Hero Section & 7. Lead Capture Form */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white pt-10 pb-16 overflow-hidden">
        {/* Decorative background subtle glow matching website theme */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Hero Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-blue-400" />
                <span>India Non-Profit &amp; Philanthropy Solutions | Trust • Society • Section 8</span>
              </div>

              {/* H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                NGO Registration
              </h1>

              {/* One-line price hook */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-500/20 via-blue-600/15 to-transparent border-l-4 border-blue-400 text-blue-200 font-bold text-sm sm:text-base">
                Obtain NGO Registration starting at ₹2999/- only + Govt. Fee!
              </div>

              {/* 3-4 line intro */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                An NGO (Non-Governmental Organization) is a voluntary, non-profit entity formed to work towards social, charitable, educational, religious, or environmental causes. In India, an NGO can be legally registered as a Trust (under the Indian Trusts Act, 1882), a Society (under the Societies Registration Act, 1860), or a Section 8 Company (under the Companies Act, 2013), depending on the founders' objectives and operational scale. Registration gives the organization a legal identity, enables it to open bank accounts, receive donations/grants, and apply for tax exemptions and government schemes, making it essential for anyone wanting to run a credible, structured, and legally recognized non-profit.
              </p>

              {/* 5-6 short key-term tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'Non-Profit Objective',
                  'Trust / Society / Section 8 Company',
                  '12A & 80G Registration',
                  'FCRA Eligibility',
                  'Limited Liability',
                  'Legal Recognition'
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Key Value Checks */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>100% Tax Exemption (12A/80G Ready)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>NITI Aayog NGO Darpan Enrolment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Form CSR-1 Eligibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Zero Hidden Costs Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Right: Multi-Step Lead Capture Form (Section 7) */}
            <div id="consultation-form-block" className="lg:col-span-5 scroll-mt-24">
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
                {/* Form header */}
                <div className="border-b border-slate-100 pb-4 mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Get Expert Consultation
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fast-track registration with senior non-profit advocates &amp; CAs
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                    Step {formStep} of 3
                  </span>
                </div>

                {formSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-black text-slate-900">
                      Consultation Request Received!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Thank you, <strong>{applicantName || 'Valued Founder'}</strong>. Our NGO legal compliance team will call you shortly on <strong>{applicantMobile}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormStep(1);
                      }}
                      className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                    {/* STEP 1: Select State + Contact */}
                    {formStep === 1 && (
                      <div className="space-y-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Select State / UT <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs bg-white text-slate-800"
                            required
                          >
                            {INDIAN_STATES_AND_UTS.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Your Full Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Dr. Rajesh Verma"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Mobile Number <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="10-digit mobile"
                              pattern="[0-9]{10}"
                              value={applicantMobile}
                              onChange={(e) => setApplicantMobile(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs"
                              required
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Email ID <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="name@email.com"
                              value={applicantEmail}
                              onChange={(e) => setApplicantEmail(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Business Type + Business Activity */}
                    {formStep === 2 && (
                      <div className="space-y-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Business Entity Category <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs bg-white text-slate-800"
                            required
                          >
                            {BUSINESS_TYPES.map((bt) => (
                              <option key={bt} value={bt}>
                                {bt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Primary Activity / Cause <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={businessActivity}
                            onChange={(e) => setBusinessActivity(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs bg-white text-slate-800"
                            required
                          >
                            {BUSINESS_ACTIVITIES.map((ba) => (
                              <option key={ba} value={ba}>
                                {ba}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-slate-700 text-xs">
                          <p className="font-semibold text-blue-900 mb-0.5">Non-Profit Charter Assistance</p>
                          Our legal specialists assist in structuring Trust Deeds, Society Bye-laws, or Section 8 MOAs tailored to your cause.
                        </div>
                      </div>
                    )}

                    {/* STEP 3: PAN Number, Package selection, Captcha */}
                    {formStep === 3 && (
                      <div className="space-y-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Founder / Trustee PAN (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            value={panNumber}
                            onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs uppercase"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Selected Package
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={selectedPackageTier}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs"
                          />
                        </div>

                        {/* Captcha */}
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Security Captcha <span className="text-rose-500">*</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="px-3.5 py-2 bg-slate-900 text-blue-400 font-mono font-black text-sm tracking-widest rounded-xl select-none">
                              {captchaCode}
                            </div>
                            <button
                              type="button"
                              onClick={refreshCaptcha}
                              className="p-2 border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-600 cursor-pointer"
                              title="Refresh Captcha"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                            <input
                              type="text"
                              placeholder="Enter text"
                              value={captchaInput}
                              onChange={(e) => setCaptchaInput(e.target.value)}
                              className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs uppercase font-mono"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Button Controls */}
                    <div className="pt-2 flex items-center gap-2">
                      {formStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setFormStep(formStep - 1)}
                          className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Processing...</span>
                        ) : formStep < 3 ? (
                          <>
                            <span>Continue to Step {formStep + 1}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Get Started</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center">
                      By submitting, you agree to our privacy policy &amp; terms. No spam guaranteed.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trust Stats Bar (animated counters) */}
      <section className="bg-slate-900 text-white py-5 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-800">
            <div className="px-2">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">
                {counterClients.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                Happy Clients
              </div>
            </div>
            <div className="px-2">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">
                {counterCertificates.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                Certificates Issued
              </div>
            </div>
            <div className="px-2">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">
                {counterProfessionals}+
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                Legal &amp; Tax Professionals
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Review Badges Row */}
      <section className="bg-white py-3.5 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-semibold text-slate-700">
            <a
              href="https://google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-800 transition-colors"
            >
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>Google Reviews</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                4.9 ★
              </span>
            </a>

            <a
              href="https://ambitionbox.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-800 transition-colors"
            >
              <div className="flex text-emerald-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>Ambitionbox</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                4.9 ★
              </span>
            </a>

            <a
              href="https://trustpilot.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-800 transition-colors"
            >
              <div className="flex text-blue-600">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>Trustpilot</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 text-[10px] font-bold">
                4.7 ★
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Body with Sticky TOC */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 8. Sticky Table of Contents (jump links) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 px-2">
                Table of Contents
              </h3>
              <nav className="space-y-1 max-h-[75vh] overflow-y-auto pr-1 text-xs">
                {TOC_LINKS.map((item) => {
                  const isActive = activeNavTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-50 text-blue-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-800 flex-shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={scrollToLeadForm}
                  className="w-full py-2 px-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Register at ₹2999</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Center: Detailed Content + Pricing Package + Features */}
          <div className="lg:col-span-9 space-y-12">
            {/* 9. Section-by-Section Content */}
            <NgoRegistrationContentSections
              onScrollToForm={scrollToLeadForm}
              openFaqIndex={openFaqIndex}
              setOpenFaqIndex={setOpenFaqIndex}
            />

            {/* 10. Pricing Package Section (single package — no tiers) */}
            <section id="packages" className="scroll-mt-28 space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Pricing Package
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Transparent Package Pricing
                </h2>
              </div>
              <p className="text-xs text-slate-600">
                Guaranteed single flat fee with zero hidden consultation surcharges or unexpected legal markups.
              </p>

              {/* Single Package Card */}
              <div className="rounded-3xl border-2 border-blue-600 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-800 text-white text-[11px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                  Complete Non-Profit Solution
                </div>

                <div className="max-w-2xl">
                  <h3 className="text-2xl font-black text-slate-900">
                    NGO Registration
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Complete NGO registration handled end-to-end by our experts — choose Trust, Society, or Section 8 Company based on your goals.
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">
                      ₹2999/-
                    </span>
                    <span className="text-sm font-semibold text-slate-500">
                      only + Govt. Fee (to be paid later)
                    </span>
                  </div>

                  {/* Two Highlight Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      <strong className="block font-bold text-amber-950 mb-0.5">
                        Lowest Cost first time ever
                      </strong>
                      Competitive professional fees without compromising on legal quality.
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                      <strong className="block font-bold text-blue-950 mb-0.5">
                        Instant discount available for 24 hours
                      </strong>
                      Fast checkout to unlock your exclusive introductory offer.
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <button
                      onClick={scrollToLeadForm}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-black text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* What you'll get Checklist (8 items with green tick icons) */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                      What you'll get:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Name Availability Check</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Trust Deed / Society MOA &amp; Rules / Section 8 MOA &amp; AOA Drafting (as applicable)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Certificate of Registration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>PAN &amp; TAN Application</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Guidance on 12A &amp; 80G Eligibility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Timely Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Professional Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Post-Registration Guidance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. Why Choose Us (icon grid, 6 cards) */}
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Our Advantages
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Why Choose Akshay B2B Solutions?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
                {[
                  {
                    icon: <Award className="w-5 h-5 text-blue-800" />,
                    title: 'Expert Guidance',
                    desc: 'Senior corporate attorneys and NGO legal specialists handling your NGO registration directly.'
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-blue-800" />,
                    title: 'Time-Saving Process',
                    desc: 'Zero paperwork hassles; 100% digital end-to-end processing across all Indian states.'
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-blue-800" />,
                    title: 'Affordable Pricing',
                    desc: 'Transparent pricing with zero hidden surcharges or surprise markups.'
                  },
                  {
                    icon: <Users className="w-5 h-5 text-blue-800" />,
                    title: 'Trusted by Thousands',
                    desc: 'Over 18,500 non-profits, foundations, and companies incorporated across India.'
                  },
                  {
                    icon: <Zap className="w-5 h-5 text-blue-800" />,
                    title: 'Compliance Alerts',
                    desc: 'Automated reminders for annual ROC returns, AGM filings, 10BD submissions, and audit filings.'
                  },
                  {
                    icon: <Lock className="w-5 h-5 text-blue-800" />,
                    title: 'Secure and Confidential',
                    desc: 'Bank-grade 256-bit encryption for all founder KYC and trust documents.'
                  }
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h3 className="font-bold text-xs text-slate-900">{card.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 12. Social Share Row */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-blue-800" />
                <span>Share this service:</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <button
                  onClick={() => handleShare('facebook')}
                  className="px-3 py-1 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('x')}
                  className="px-3 py-1 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  𝕏 (Twitter)
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="px-3 py-1 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare('gmail')}
                  className="px-3 py-1 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Gmail
                </button>
              </div>
            </div>

            {/* 13. Book Appointment CTA Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-black">
                  Need 1-on-1 Guidance from a Non-Profit &amp; Corporate Advocate?
                </h3>
                <p className="text-xs text-slate-300">
                  Book a confidential 30-minute consultation session to structure your NGO, Trust Deed, 12A/80G filings, and CSR strategy.
                </p>
              </div>
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-colors flex-shrink-0 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

            {/* 14. Related Services Grid (Business Startup — NGO Category) */}
            <section className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  Explore More
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Related Business Startup &amp; NGO Services
                </h2>
              </div>
              <p className="text-xs text-slate-600">
                Explore our full suite of non-profit incorporation, tax exemption certifications, and startup registration solutions across India:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                {RELATED_SERVICES.map((srv, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectService(srv.title)}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-800 transition-colors">
                          {srv.title}
                        </h4>
                        <span className="text-[11px] font-black text-blue-800">
                          {srv.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-blue-800 group-hover:underline">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 16. App Advertisement Banner */}
            <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    Manage Your NGO &amp; Compliance Filings from Your Smartphone
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Download the Akshay B2B Android app to track registrar filings, upload donor records, and access CA support on the go.
                  </p>
                </div>
              </div>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs tracking-wider flex items-center gap-1.5 flex-shrink-0 transition-colors"
              >
                <span>Google Play</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 17. Footer */}
      <Footer onSelectService={onSelectService} />

      {/* 18. Login/Signup Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};
