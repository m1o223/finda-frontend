import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MoreVertical, X, ArrowLeft, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bluemind-dashboard/artifacts/laz1bzfy_6028489244713618696.jpg";

const initialReminders = [
  { id: 1, title: "Team standup meeting", description: "Weekly sync with the development team", date: "2026-02-20", time: "09:00" },
  { id: 2, title: "Submit project proposal", description: "Final draft for the Q1 project", date: "2026-02-21", time: "14:00" },
  { id: 3, title: "Doctor appointment", description: "Annual checkup at city clinic", date: "2026-02-22", time: "10:30" },
  { id: 4, title: "Call with client", description: "Discuss requirements for new feature", date: "2026-02-23", time: "16:00" },
];

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
}

function ReminderCard({ reminder, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      className="rounded-xl p-5 border transition-all duration-200 relative"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
      data-testid={`reminder-card-${reminder.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base truncate" style={{ color: 'var(--text-primary)' }}>{reminder.title}</h3>
          <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{reminder.description}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <Calendar className="w-3.5 h-3.5" />{formatDate(reminder.date)}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <Clock className="w-3.5 h-3.5" />{formatTime(reminder.time)}
            </span>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer" style={{ color: 'var(--text-muted)' }} data-testid={`reminder-menu-${reminder.id}`}>
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-9 rounded-lg shadow-lg z-20 py-1 w-28 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
                <button onClick={() => { onEdit(reminder); setMenuOpen(false); }} className="w-full px-3 py-2 text-sm text-left transition-colors cursor-pointer" style={{ color: 'var(--text-primary)' }}>{t("edit")}</button>
                <button onClick={() => { onDelete(reminder.id); setMenuOpen(false); }} className="w-full px-3 py-2 text-sm text-red-500 text-left transition-colors cursor-pointer">{t("delete")}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ReminderModal({ isOpen, onClose, onSave, editData }) {
  const [formData, setFormData] = useState(editData || { title: "", description: "", date: "", time: "" });
  const { t } = useApp();
  const isEdit = !!editData;
  const isValid = formData.title.trim() && formData.date && formData.time;

  const handleSave = () => { if (!isValid) return; onSave({ title: formData.title.trim(), description: formData.description.trim(), date: formData.date, time: formData.time }); onClose(); };
  if (!isOpen) return null;

  const inputStyle = { backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-primary)' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-2xl shadow-xl border w-full max-w-md p-6 z-10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }} data-testid="reminder-modal">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer" style={{ color: 'var(--text-muted)' }}><X className="w-4 h-4" /></button>
        <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{isEdit ? t("editReminder") : t("createReminder")}</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{t("title")}</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder={t("title")} className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all" style={inputStyle} data-testid="modal-title-input" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{t("description")}</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all resize-none" style={inputStyle} data-testid="modal-description-input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{t("date")}</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all" style={inputStyle} data-testid="modal-date-input" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{t("time")}</label>
              <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all" style={inputStyle} data-testid="modal-time-input" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 border rounded-xl text-sm font-medium transition-colors cursor-pointer" style={{ borderColor: 'var(--border-main)', color: 'var(--text-secondary)' }} data-testid="modal-cancel">{t("cancel")}</button>
          <button onClick={handleSave} disabled={!isValid} className="flex-1 py-3 text-white rounded-xl text-sm font-medium disabled:opacity-50 transition-all cursor-pointer" style={{ backgroundColor: 'var(--accent)' }} data-testid="modal-save">{isEdit ? t("save") : t("create")}</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function RemindersPage() {
  const navigate = useNavigate();
  const { t } = useApp();
  const [reminders, setReminders] = useState(initialReminders);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const filteredReminders = reminders.filter((r) => {
    const q = searchQuery.toLowerCase();
    return r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
  });

  const handleEdit = (reminder) => { setEditingReminder(reminder); setModalOpen(true); };
  const handleSave = (data) => {
    if (editingReminder) setReminders((prev) => prev.map((r) => (r.id === editingReminder.id ? { ...r, ...data } : r)));
    else setReminders((prev) => [...prev, { id: Date.now(), ...data }]);
    setEditingReminder(null);
  };
  const handleDelete = (id) => setReminders((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }} data-testid="reminders-page">
      <header className="border-b sticky top-0 z-10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}>
        <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/chat")} className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer" style={{ color: 'var(--text-secondary)' }} data-testid="back-button"><ArrowLeft className="w-5 h-5" /></button>
            <div className="flex items-center gap-2">
              <img src={LOGO_URL} alt="Finda" className="w-8 h-8 object-contain" style={{ background: 'none' }} />
              <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{t("myReminders")}</h1>
            </div>
          </div>
          <button onClick={() => { setEditingReminder(null); setModalOpen(true); }} className="flex items-center gap-1.5 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer" style={{ backgroundColor: 'var(--accent)' }} data-testid="create-reminder-button">
            <Plus className="w-4 h-4" /><span className="hidden sm:inline">{t("create")}</span>
          </button>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("searchReminders")} className="w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:outline-none transition-all" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-primary)' }} data-testid="search-input" />
        </div>
        <div className="space-y-3">
          <AnimatePresence>
            {filteredReminders.map((r) => <ReminderCard key={r.id} reminder={r} onEdit={handleEdit} onDelete={handleDelete} />)}
          </AnimatePresence>
        </div>
        {filteredReminders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-input)' }}><Clock className="w-6 h-6" style={{ color: 'var(--text-muted)' }} /></div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{searchQuery ? t("noMatch") : t("noReminders")}</p>
            {!searchQuery && <button onClick={() => { setEditingReminder(null); setModalOpen(true); }} className="mt-4 text-sm font-medium hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}>{t("createFirst")}</button>}
          </div>
        )}
      </div>
      <AnimatePresence>
        {modalOpen && <ReminderModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingReminder(null); }} onSave={handleSave} editData={editingReminder ? { title: editingReminder.title, description: editingReminder.description, date: editingReminder.date, time: editingReminder.time } : null} />}
      </AnimatePresence>
    </div>
  );
}
