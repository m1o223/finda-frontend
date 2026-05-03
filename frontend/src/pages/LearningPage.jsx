import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, GraduationCap, School, BookOpen, Building2, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

const educationTypes = [
  { id: "school", label: "School", icon: School, desc: "Normal school" },
  { id: "highschool", label: "High School", icon: Building2, desc: "Gymnasium" },
  { id: "university", label: "University", icon: GraduationCap, desc: "Higher education" },
];

const schools = [
  { id: "nordic", label: "Nordic School" },
  { id: "matteo", label: "Matteo Skolan" },
  { id: "futura", label: "Futura School" },
  { id: "vitra", label: "Vitra School" },
];

const grades = [
  { id: "5", label: "Grade 5" },
  { id: "6", label: "Grade 6" },
  { id: "7", label: "Grade 7" },
  { id: "8", label: "Grade 8" },
  { id: "9", label: "Grade 9" },
  { id: "hs1", label: "High School Year 1" },
  { id: "hs2", label: "High School Year 2" },
  { id: "hs3", label: "High School Year 3" },
];

const subjects = [
  { id: "swedish", label: "Swedish" },
  { id: "english", label: "English" },
  { id: "math", label: "Math" },
  { id: "science", label: "Science" },
];

const sections = [
  { id: "basics", label: "Basics" },
  { id: "advanced", label: "Advanced" },
  { id: "grammar", label: "Grammar" },
  { id: "reading", label: "Reading" },
  { id: "exercises", label: "Exercises" },
];

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300 flex-1",
            i < current ? "bg-[#193B68]" : (i === current ? "bg-[#193B68]/50" : "bg-[#E5E7EB]")
          )}
        />
      ))}
    </div>
  );
}

function OptionCard({ label, desc, icon: Icon, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer",
        isSelected
          ? "border-[#193B68] bg-[#EEF2FF]"
          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm"
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", isSelected ? "bg-[#193B68]" : "bg-[#F3F4F6]")}>
            <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-[#6B7280]")} />
          </div>
        )}
        <div>
          <p className={cn("font-medium text-sm sm:text-base", isSelected ? "text-[#193B68]" : "text-[#111827]")}>{label}</p>
          {desc && <p className="text-xs text-[#9CA3AF] mt-0.5">{desc}</p>}
        </div>
      </div>
    </button>
  );
}

function SimpleOptionCard({ label, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl border text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer text-left",
        isSelected
          ? "border-[#193B68] bg-[#EEF2FF] text-[#193B68]"
          : "border-[#E5E7EB] bg-white text-[#111827] hover:border-[#D1D5DB] hover:shadow-sm"
      )}
    >
      {label}
    </button>
  );
}

export default function LearningPage() {
  const navigate = useNavigate();
  const { prefs } = useApp();
  const isDark = prefs.theme === "dark";

  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    educationType: null,
    school: null,
    grade: null,
    subject: null,
    section: null,
  });

  const totalSteps = selections.educationType === "school" ? 5 : 4;

  const handleSelect = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    // Auto-advance on select
    setTimeout(() => {
      if (key === "section") return; // Don't advance on last step
      setStep((s) => s + 1);
    }, 200);
  };

  const handleBack = () => {
    if (step === 0) { navigate("/chat"); return; }
    setStep((s) => s - 1);
  };

  const getStepTitle = () => {
    switch (step) {
      case 0: return "Choose Education Type";
      case 1: return selections.educationType === "school" ? "Select Your School" : "Select Grade";
      case 2: return selections.educationType === "school" ? "Select Grade" : "Select Subject";
      case 3: return selections.educationType === "school" ? "Select Subject" : "Select Section";
      case 4: return "Select Section";
      default: return "";
    }
  };

  const renderStep = () => {
    // Step 0: Education Type
    if (step === 0) {
      return (
        <div className="space-y-3">
          {educationTypes.map((type) => (
            <OptionCard
              key={type.id}
              label={type.label}
              desc={type.desc}
              icon={type.icon}
              isSelected={selections.educationType === type.id}
              onClick={() => handleSelect("educationType", type.id)}
            />
          ))}
        </div>
      );
    }

    // Step 1 (School path): School Selection
    if (step === 1 && selections.educationType === "school") {
      return (
        <div className="space-y-3">
          {schools.map((school) => (
            <SimpleOptionCard
              key={school.id}
              label={school.label}
              isSelected={selections.school === school.id}
              onClick={() => handleSelect("school", school.id)}
            />
          ))}
        </div>
      );
    }

    // Grade Selection (step 1 for non-school, step 2 for school)
    const gradeStep = selections.educationType === "school" ? 2 : 1;
    if (step === gradeStep) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {grades.map((grade) => (
            <SimpleOptionCard
              key={grade.id}
              label={grade.label}
              isSelected={selections.grade === grade.id}
              onClick={() => handleSelect("grade", grade.id)}
            />
          ))}
        </div>
      );
    }

    // Subject Selection
    const subjectStep = selections.educationType === "school" ? 3 : 2;
    if (step === subjectStep) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjects.map((subject) => (
            <SimpleOptionCard
              key={subject.id}
              label={subject.label}
              isSelected={selections.subject === subject.id}
              onClick={() => handleSelect("subject", subject.id)}
            />
          ))}
        </div>
      );
    }

    // Section Selection
    const sectionStep = selections.educationType === "school" ? 4 : 3;
    if (step === sectionStep) {
      return (
        <div className="space-y-3">
          {sections.map((section) => (
            <SimpleOptionCard
              key={section.id}
              label={section.label}
              isSelected={selections.section === section.id}
              onClick={() => { setSelections((prev) => ({ ...prev, section: section.id })); setStep(totalSteps); }}
            />
          ))}
        </div>
      );
    }

    // Final: Coming Soon
    if (step >= totalSteps) {
      return (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] flex items-center justify-center mx-auto mb-5">
            <Construction className="w-8 h-8 text-[#D97706]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">This section is coming soon</h3>
          <p className="text-[#6B7280] text-sm mb-8">We're working hard to bring you this content.</p>
          <button
            onClick={() => { setStep(0); setSelections({ educationType: null, school: null, grade: null, subject: null, section: null }); }}
            className="px-6 py-3 bg-[#193B68] text-white rounded-xl text-sm font-medium hover:bg-[#142f54] transition-all cursor-pointer"
          >
            Start Over
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn("min-h-screen", isDark ? "bg-[#1a1a1a]" : "bg-[#FAFBFC]")} data-testid="learning-page">
      {/* Header */}
      <header className={cn("sticky top-0 z-10 border-b", isDark ? "bg-[#222] border-[#333]" : "bg-white border-[#E5E7EB]")}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={handleBack}
            className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer", isDark ? "text-[#999] hover:text-white hover:bg-[#333]" : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]")}
            data-testid="back-button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Finda" className="w-8 h-8 object-contain" style={{ background: 'none' }} />
            <h1 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-[#111827]")}>Learning</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {step < totalSteps && (
          <>
            <StepIndicator current={step} total={totalSteps} />
            <p className={cn("text-xs mb-1", isDark ? "text-[#888]" : "text-[#9CA3AF]")}>Step {step + 1} of {totalSteps}</p>
            <h2 className={cn("text-xl sm:text-2xl font-semibold mb-6", isDark ? "text-white" : "text-[#111827]")}>{getStepTitle()}</h2>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
