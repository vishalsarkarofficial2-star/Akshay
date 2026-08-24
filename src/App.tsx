import React, { useState } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { HeaderMegaMenu } from './components/HeaderMegaMenu';
import { HeroCarousel } from './components/HeroCarousel';
import { PartnersLogoStrip } from './components/PartnersLogoStrip';
import { ServicesShowcase } from './components/ServicesShowcase';
import { WhatMakesUsDifferent } from './components/WhatMakesUsDifferent';
import { CtaBanner } from './components/CtaBanner';
import { WorkingProcess } from './components/WorkingProcess';
import { OffersUpdatesDueDates } from './components/OffersUpdatesDueDates';
import { WhyLpiHighlights } from './components/WhyLpiHighlights';
import { AiComplianceSection } from './components/AiComplianceSection';
import { GlobalBrandsStrip } from './components/GlobalBrandsStrip';
import { WhyChooseUsGrid } from './components/WhyChooseUsGrid';
import { StatsCounter } from './components/StatsCounter';
import { CustomerReviews } from './components/CustomerReviews';
import { MultiStepLeadForm } from './components/MultiStepLeadForm';
import { MobileAppBanner } from './components/MobileAppBanner';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { PrivateLimitedLanding } from './pages/PrivateLimitedLanding';
import { SoleProprietorshipLanding } from './pages/SoleProprietorshipLanding';
import { LLPLanding } from './pages/LLPLanding';
import { OPCLanding } from './pages/OPCLanding';
import { PartnershipFirmLanding } from './pages/PartnershipFirmLanding';
import { ProducerCompanyLanding } from './pages/ProducerCompanyLanding';
import { Section8CompanyLanding } from './pages/Section8CompanyLanding';
import { NgoRegistrationLanding } from './pages/NgoRegistrationLanding';
import { SocietyRegistrationLanding } from './pages/SocietyRegistrationLanding';
import { DarpanRegistrationLanding } from './pages/DarpanRegistrationLanding';
import { TrustRegistrationLanding } from './pages/TrustRegistrationLanding';
import { TwelveAEightyGLanding } from './pages/TwelveAEightyGLanding';
import { CsrOneRegistrationLanding } from './pages/CsrOneRegistrationLanding';
import { CategoryServiceDetailLanding } from './pages/CategoryServiceDetailLanding';
import { ALL_CATEGORY_SERVICES, ServiceDetailConfig } from './data/categoryServices';
import {
  BrochureModal,
  AppointmentModal,
  ServiceDetailModal,
  BlogArticleModal,
  SuccessModal
} from './components/Modals';
import { ServiceItem, BlogPost, LeadFormData } from './types';
import { SERVICES_DATA } from './data/servicesData';

export function App() {
  // Page view state
  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'pvt-ltd-landing'
    | 'sole-proprietorship'
    | 'llp'
    | 'opc'
    | 'partnership'
    | 'producer'
    | 'section-8'
    | 'ngo-registration'
    | 'society-registration'
    | 'darpan-registration'
    | 'trust-registration'
    | '12a-80g-registration'
    | 'csr1-registration'
    | 'category-service-detail'
  >('home');

  // Modal states
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCategoryService, setSelectedCategoryService] = useState<ServiceDetailConfig | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  // Pre-selected service for lead form
  const [formPreselectedService, setFormPreselectedService] = useState<string>('');

  const handleSelectServiceByName = (serviceName: string) => {
    const lower = serviceName.toLowerCase().trim();

    // 1. First check in Category Services for high-precision matches (e.g. LLP Annual Compliance, Pvt Ltd Compliances, Winding Up Pvt Ltd, GST, etc.)
    const catFound = ALL_CATEGORY_SERVICES.find((cs) => {
      const csName = cs.name.toLowerCase();
      const csSlug = cs.slug.toLowerCase();
      return (
        csSlug === lower ||
        csSlug === lower.replace(/\s+/g, '-') ||
        csName === lower ||
        lower.includes(csName) ||
        csName.includes(lower) ||
        (cs.keywords && cs.keywords.some((k) => lower.includes(k.toLowerCase()) || k.toLowerCase().includes(lower)))
      );
    });

    if (catFound) {
      setSelectedCategoryService(catFound);
      setCurrentPage('category-service-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (lower.includes('12a') || lower.includes('80g')) {
      setCurrentPage('12a-80g-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (lower.includes('csr 1') || lower.includes('csr-1') || lower.includes('csr1')) {
      setCurrentPage('csr1-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (lower.includes('darpan')) {
      setCurrentPage('darpan-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (lower.includes('trust')) {
      setCurrentPage('trust-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (lower.includes('society')) {
      setCurrentPage('society-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('ngo registration') ||
      lower.includes('non governmental')
    ) {
      setCurrentPage('ngo-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('section 8') ||
      lower.includes('section-8') ||
      lower.includes('non profit') ||
      lower.includes('non-profit')
    ) {
      setCurrentPage('section-8');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('producer company') ||
      lower.includes('farmer producer') ||
      lower.includes('fpo')
    ) {
      setCurrentPage('producer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('partnership firm') ||
      lower.includes('partnership deed') ||
      lower.includes('partnership')
    ) {
      setCurrentPage('partnership');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('one person company') ||
      lower.includes('opc')
    ) {
      setCurrentPage('opc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('limited liability partnership') ||
      lower.includes('llp')
    ) {
      setCurrentPage('llp');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('sole proprietorship') ||
      lower.includes('proprietorship firm') ||
      lower.includes('sole proprietor')
    ) {
      setCurrentPage('sole-proprietorship');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      lower.includes('private limited') ||
      lower.includes('pvt ltd')
    ) {
      setCurrentPage('pvt-ltd-landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const found = SERVICES_DATA.find(
      (s) => s.name.toLowerCase() === serviceName.toLowerCase()
    );
    if (found) {
      setSelectedService(found);
    } else {
      // Direct jump to lead form
      setFormPreselectedService(serviceName);
      const contactEl = document.getElementById('contact-consultation-section');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleApply = (serviceName?: string) => {
    const sName = (serviceName || '').toLowerCase().trim();

    if (sName.includes('12a') || sName.includes('80g')) {
      setCurrentPage('12a-80g-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sName.includes('csr 1') || sName.includes('csr-1') || sName.includes('csr1')) {
      setCurrentPage('csr1-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sName.includes('darpan')) {
      setCurrentPage('darpan-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sName.includes('trust')) {
      setCurrentPage('trust-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sName.includes('society')) {
      setCurrentPage('society-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('ngo registration') ||
      sName.includes('non governmental')
    ) {
      setCurrentPage('ngo-registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('section 8') ||
      sName.includes('section-8') ||
      sName.includes('non profit') ||
      sName.includes('non-profit')
    ) {
      setCurrentPage('section-8');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('farmer producer') ||
      (sName.includes('producer') && !sName.includes('epr'))
    ) {
      setCurrentPage('producer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('partnership firm') ||
      sName.includes('partnership deed') ||
      sName === 'partnership'
    ) {
      setCurrentPage('partnership');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('one person company') ||
      sName.includes('opc')
    ) {
      setCurrentPage('opc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('limited liability partnership') ||
      sName.includes('llp')
    ) {
      setCurrentPage('llp');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('sole proprietorship') ||
      sName.includes('proprietorship') ||
      sName.includes('sole proprietor')
    ) {
      setCurrentPage('sole-proprietorship');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      sName.includes('private limited') ||
      sName.includes('pvt ltd')
    ) {
      setCurrentPage('pvt-ltd-landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Match in Category Services
    const catFound = ALL_CATEGORY_SERVICES.find((cs) => {
      const csName = cs.name.toLowerCase();
      const csSlug = cs.slug.toLowerCase();
      return (
        csSlug === sName ||
        csSlug === sName.replace(/\s+/g, '-') ||
        csName === sName ||
        sName.includes(csName) ||
        csName.includes(sName) ||
        (cs.keywords && cs.keywords.some((k) => sName.includes(k.toLowerCase()) || k.toLowerCase().includes(sName)))
      );
    });

    if (catFound) {
      setSelectedCategoryService(catFound);
      setCurrentPage('category-service-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const found = SERVICES_DATA.find(
      (s) => s.name.toLowerCase() === serviceName?.toLowerCase()
    );
    if (found) {
      setSelectedService(found);
    } else {
      setFormPreselectedService(serviceName || '');
      const contactEl = document.getElementById('contact-consultation-section');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLeadSuccess = (lead: LeadFormData) => {
    setSubmittedLead(lead);
  };

  // If on the dedicated Society Registration Landing Page
  if (currentPage === 'society-registration') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col antialiased">
        <SocietyRegistrationLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />
        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated Darpan Registration Landing Page
  if (currentPage === 'darpan-registration') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col antialiased">
        <DarpanRegistrationLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />
        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated Trust Registration Landing Page
  if (currentPage === 'trust-registration') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col antialiased">
        <TrustRegistrationLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />
        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated 12A & 80G Registration Landing Page
  if (currentPage === '12a-80g-registration') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col antialiased">
        <TwelveAEightyGLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />
        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated CSR 1 Registration Landing Page
  if (currentPage === 'csr1-registration') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col antialiased">
        <CsrOneRegistrationLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />
        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated NGO Registration Landing Page
  if (currentPage === 'ngo-registration') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col antialiased">
        <NgoRegistrationLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated Section 8 Company Landing Page
  if (currentPage === 'section-8') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-800 selection:text-white flex flex-col antialiased">
        <Section8CompanyLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated Producer Company Landing Page
  if (currentPage === 'producer') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-800 selection:text-white flex flex-col antialiased">
        <ProducerCompanyLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated Partnership Firm Landing Page
  if (currentPage === 'partnership') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0B3D91] selection:text-white flex flex-col antialiased">
        <PartnershipFirmLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated One Person Company Landing Page
  if (currentPage === 'opc') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
        <OPCLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals available on all pages */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated LLP Landing Page
  if (currentPage === 'llp') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
        <LLPLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals available on all pages */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated Sole Proprietorship Landing Page
  if (currentPage === 'sole-proprietorship') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
        <SoleProprietorshipLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals available on all pages */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on the dedicated Private Limited Landing Page
  if (currentPage === 'pvt-ltd-landing') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
        <PrivateLimitedLanding
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Global Modals available on both pages */}
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />

        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />

        <FloatingActions />
      </div>
    );
  }

  // If on a Category Service Detail Landing Page (RCMC, EPR, GST, Filing, Food, License, Import/Export, Modification, etc.)
  if (currentPage === 'category-service-detail' && selectedCategoryService) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#0c2340] selection:text-white flex flex-col antialiased">
        <CategoryServiceDetailLanding
          service={selectedCategoryService}
          onBackToHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleSelectServiceByName}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={handleApply}
        />
        <FloatingActions />
      </div>
    );
  }

  // Home Page View
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
      {/* 1. TOP UTILITY BAR */}
      <TopUtilityBar
        onOpenBrochure={() => setIsBrochureOpen(true)}
      />

      {/* 2. HEADER & MEGA-MENU NAVIGATION */}
      <HeaderMegaMenu
        onSelectService={handleSelectServiceByName}
        onOpenConsultation={() => {
          const contactEl = document.getElementById('contact-consultation-section');
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <main className="flex-grow">
        {/* 3. HERO SECTION WITH IMAGE CAROUSEL & CTA PILLS */}
        <HeroCarousel
          onSelectService={(serviceName) => {
            if (serviceName.toLowerCase().includes('private limited')) {
              handleApply(serviceName);
            } else {
              handleSelectServiceByName(serviceName);
            }
          }}
          onOpenConsultation={() => setIsAppointmentOpen(true)}
        />

        {/* 4. LOGO STRIP / PARTNERS */}
        <PartnersLogoStrip />

        {/* 5. SERVICES SHOWCASE / POPULAR CATEGORIES */}
        <ServicesShowcase
          onSelectService={(srv) => setSelectedService(srv)}
          onApplyService={(srvName) => handleApply(srvName)}
        />

        {/* 6. WHAT MAKES US DIFFERENT */}
        <WhatMakesUsDifferent onLearnMore={() => setIsAppointmentOpen(true)} />

        {/* 7. "REGISTER YOUR BUSINESS WITH CONFIDENCE" CTA BANNER */}
        <CtaBanner onOpenAppointment={() => setIsAppointmentOpen(true)} />

        {/* 8. WORKING PROCESS SECTION */}
        <WorkingProcess />

        {/* 9. SPECIAL OFFERS + UPDATES & ALERTS + DUE DATES (3-Column) */}
        <OffersUpdatesDueDates
          onApplyOffer={(code) => {
            handleApply(`Offer: ${code}`);
          }}
          onOpenConsultation={() => {
            const contactEl = document.getElementById('contact-consultation-section');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 10. "WHY LPI" / FEATURE HIGHLIGHTS */}
        <WhyLpiHighlights />

        {/* 11. "SIMPLIFYING COMPLIANCE THROUGH AI" DETAILED SECTION */}
        <AiComplianceSection />

        {/* 12. GLOBAL BRANDS LOGO STRIP */}
        <GlobalBrandsStrip />

        {/* 13. "WHY CHOOSE US" ICON GRID */}
        <WhyChooseUsGrid />

        {/* 14. STATS COUNTER SECTION ("Our Journey in Numbers") */}
        <StatsCounter />

        {/* 15. CUSTOMER REVIEWS SECTION */}
        <CustomerReviews />

        {/* 16. CONTACT INFO + MULTI-STEP LEAD FORM SECTION */}
        <MultiStepLeadForm
          initialService={formPreselectedService}
          onSuccess={handleLeadSuccess}
        />

        {/* 17. MOBILE APP PROMOTION BANNER */}
        <MobileAppBanner />

        {/* 18. BLOG SECTION ("Latest Tips & Trends") */}
        <BlogSection onReadArticle={(article) => setSelectedArticle(article)} />
      </main>

      {/* 19. FOOTER */}
      <Footer onSelectService={handleSelectServiceByName} />

      {/* 20. FLOATING ELEMENTS */}
      <FloatingActions />

      {/* Interactive Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onApply={handleApply}
      />

      <BlogArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <SuccessModal
        lead={submittedLead}
        onClose={() => setSubmittedLead(null)}
      />
    </div>
  );
}

export default App;
