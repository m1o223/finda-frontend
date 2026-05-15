import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, School, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

const schools = [
  { id: "nordic", label: "Nordic School" }, { id: "matteo", label: "Matteo Skolan" },
  { id: "vitra", label: "Vitra School" }, { id: "stella", label: "Stella Academy" },
  { id: "aurora", label: "Aurora School" },
];
const grades = [{ id: "5", label: "Grade 5" }, { id: "6", label: "Grade 6" }, { id: "7", label: "Grade 7" }, { id: "8", label: "Grade 8" }];
const subjects = [
  { id: "swedish", label: "Swedish" }, { id: "english", label: "English" }, { id: "arabic", label: "Arabic" },
  { id: "math", label: "Math" }, { id: "science", label: "Science" }, { id: "history", label: "History" }, { id: "geography", label: "Geography" },
];
const books = [{ id: "a", label: "Book A" }, { id: "b", label: "Book B" }, { id: "c", label: "Book C" }];
const parts = [{ id: "1", label: "Part 1" }, { id: "2", label: "Part 2" }, { id: "3", label: "Part 3" }];

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-1.5 rounded-full transition-all duration-300 flex-1" style={{ backgroundColor: i < current ? 'var(--accent)' : (i === current ? 'var(--border-main)' : 'var(--bg-input)') }} />
      ))}
    </div>
  );
}

function OptionCard({ label, icon: Icon, isSelected, onClick }) {
  return (
    <button onClick={onClick} className="w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer"
      style={{ backgroundColor: isSelected ? 'var(--accent-light)' : 'var(--bg-card)', borderColor: isSelected ? 'var(--accent)' : 'var(--border-main)' }}>
      <div className="flex items-center gap-3">
        {Icon && <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: isSelected ? 'var(--accent)' : 'var(--bg-input)' }}><Icon className="w-5 h-5" style={{ color: isSelected ? '#fff' : 'var(--text-secondary)' }} /></div>}
        <p className="font-medium text-sm sm:text-base" style={{ color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>{label}</p>
      </div>
    </button>
  );
}

function SimpleOption({ label, isSelected, onClick }) {
  return (
    <button onClick={onClick} className="w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl border text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer text-left"
      style={{ backgroundColor: isSelected ? 'var(--accent-light)' : 'var(--bg-card)', borderColor: isSelected ? 'var(--accent)' : 'var(--border-main)', color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
      {label}
    </button>
  );
}

export default function LearningPage() {
  const navigate = useNavigate();
  const { t } = useApp();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({ school: null, grade: null, subject: null, book: null, part: null });
  const [showComingSoon, setShowComingSoon] = useState(false);
  const totalSteps = 5;

  const handleSelect = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    if (key === "part") { setShowComingSoon(true); setTimeout(() => navigate("/chat"), 2000); return; }
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  const handleBack = () => { if (step === 0) { navigate("/chat"); return; } setStep((s) => s - 1); };

  const stepTitles = ["Select Your School", "Select Grade", "Select Subject", "Which book are you studying?", "Select Part"];

  const renderStep = () => {
    if (showComingSoon) {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] flex items-center justify-center mx-auto mb-5"><Construction className="w-8 h-8 text-[#D97706]" /></div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Coming Soon</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Redirecting to chat...</p>
        </motion.div>
      );
    }
    switch (step) {
      case 0: return <div className="space-y-3">{schools.map((s) => <OptionCard key={s.id} label={s.label} icon={School} isSelected={selections.school === s.id} onClick={() => handleSelect("school", s.id)} />)}</div>;
      case 1: return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{grades.map((g) => <SimpleOption key={g.id} label={g.label} isSelected={selections.grade === g.id} onClick={() => handleSelect("grade", g.id)} />)}</div>;
      case 2: return <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{subjects.map((s) => <SimpleOption key={s.id} label={s.label} isSelected={selections.subject === s.id} onClick={() => handleSelect("subject", s.id)} />)}</div>;
      case 3: return <div className="space-y-3">{books.map((b) => <SimpleOption key={b.id} label={b.label} isSelected={selections.book === b.id} onClick={() => handleSelect("book", b.id)} />)}</div>;
      case 4: return <div className="space-y-3">{parts.map((p) => <SimpleOption key={p.id} label={p.label} isSelected={selections.part === p.id} onClick={() => handleSelect("part", p.id)} />)}</div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }} data-testid="learning-page">
      <header className="sticky top-0 z-10 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button onClick={handleBack} className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer" style={{ color: 'var(--text-secondary)' }} data-testid="back-button"><ArrowLeft className="w-5 h-5" /></button>
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Finda" className="w-8 h-8 object-contain" style={{ background: 'none' }} />
            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{t("learning")}</h1>
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {!showComingSoon && (
          <>
            <StepIndicator current={step} total={totalSteps} />
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Step {step + 1} of {totalSteps}</p>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{stepTitles[step]}</h2>
          </>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={showComingSoon ? "done" : step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>{renderStep()}</motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
