import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Plus, Bell, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const initialReminders = [
  { id: 1, title: "Team meeting", description: "Weekly sync", dueDate: new Date(Date.now() + 86400000), completed: false, priority: "high" },
  { id: 2, title: "Review proposal", description: "Q1 project", dueDate: new Date(Date.now() + 172800000), completed: false, priority: "medium" },
  { id: 3, title: "Update docs", description: "API v2", dueDate: new Date(Date.now() + 259200000), completed: true, priority: "low" },
];

const priorityStyles = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState(initialReminders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: "", description: "", dueDate: new Date(), priority: "medium" });

  const handleToggle = (id) => setReminders((prev) => prev.map((r) => r.id === id ? { ...r, completed: !r.completed } : r));
  const handleDelete = (id) => setReminders((prev) => prev.filter((r) => r.id !== id));
  
  const handleAddReminder = () => {
    if (!newReminder.title.trim()) return;
    setReminders((prev) => [...prev, { id: Date.now(), ...newReminder, completed: false }]);
    setNewReminder({ title: "", description: "", dueDate: new Date(), priority: "medium" });
    setIsDialogOpen(false);
  };

  const activeReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#212121] p-6"
      data-testid="reminders-page"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold">Reminders</h1>
            <p className="text-[#b4b4b4] text-sm mt-1">Stay on top of your tasks</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#10a37f] hover:bg-[#0e8f70] text-white rounded-xl px-5 py-5 transition-all duration-200 hover:scale-[1.02]" data-testid="add-reminder-button">
                <Plus className="w-4 h-4 mr-2" />Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#2f2f2f] border-[#4a4a4a] text-white max-w-md" data-testid="add-reminder-dialog" aria-describedby="dialog-desc">
              <DialogHeader>
                <DialogTitle>New Reminder</DialogTitle>
                <p id="dialog-desc" className="text-sm text-[#b4b4b4]">Create a new reminder</p>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-[#b4b4b4] mb-1 block">Title</label>
                  <Input value={newReminder.title} onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })} placeholder="Reminder title" className="bg-[#303030] border-[#4a4a4a] text-white rounded-lg" data-testid="reminder-title-input" />
                </div>
                <div>
                  <label className="text-sm text-[#b4b4b4] mb-1 block">Description</label>
                  <Input value={newReminder.description} onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })} placeholder="Description" className="bg-[#303030] border-[#4a4a4a] text-white rounded-lg" data-testid="reminder-description-input" />
                </div>
                <div>
                  <label className="text-sm text-[#b4b4b4] mb-1 block">Due Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start bg-[#303030] border-[#4a4a4a] text-white hover:bg-[#3a3a3a] rounded-lg" data-testid="reminder-date-picker">
                        <Calendar className="w-4 h-4 mr-2" />{format(newReminder.dueDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#2f2f2f] border-[#4a4a4a]" align="start">
                      <CalendarComponent mode="single" selected={newReminder.dueDate} onSelect={(date) => date && setNewReminder({ ...newReminder, dueDate: date })} className="bg-[#2f2f2f] text-white" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm text-[#b4b4b4] mb-1 block">Priority</label>
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((p) => (
                      <button key={p} onClick={() => setNewReminder({ ...newReminder, priority: p })} className={cn("flex-1 py-2 rounded-lg text-sm capitalize transition-colors", newReminder.priority === p ? "bg-[#10a37f] text-white" : "bg-[#303030] text-[#b4b4b4] hover:bg-[#3a3a3a]")} data-testid={`priority-${p}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleAddReminder} disabled={!newReminder.title.trim()} className="w-full bg-[#10a37f] hover:bg-[#0e8f70] text-white rounded-lg" data-testid="save-reminder-button">Save Reminder</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">
          {[{ label: "Total", value: reminders.length, icon: Bell }, { label: "Active", value: activeReminders.length, icon: Circle }, { label: "Completed", value: completedReminders.length, icon: CheckCircle2, color: "text-[#10a37f]" }, { label: "Overdue", value: activeReminders.filter((r) => new Date(r.dueDate) < new Date()).length, icon: Clock, color: "text-red-400" }].map((stat) => (
            <div key={stat.label} className="bg-[#2f2f2f] border border-[#4a4a4a] rounded-xl p-4">
              <div className={cn("flex items-center gap-2 text-[#b4b4b4] mb-1", stat.color)}>
                <stat.icon className="w-4 h-4" /><span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {activeReminders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-[#b4b4b4] mb-4">Active</h2>
            <div className="space-y-3">
              {activeReminders.map((reminder) => (
                <div key={reminder.id} className={cn("bg-[#2f2f2f] border border-[#4a4a4a] rounded-xl p-4 border-l-4", priorityStyles[reminder.priority])} data-testid={`reminder-card-${reminder.id}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button onClick={() => handleToggle(reminder.id)} className="mt-0.5 text-[#b4b4b4] hover:text-white" data-testid={`reminder-toggle-${reminder.id}`}><Circle className="w-5 h-5" /></button>
                      <div>
                        <h3 className="font-medium">{reminder.title}</h3>
                        <p className="text-sm text-[#b4b4b4]">{reminder.description}</p>
                        <div className="flex items-center gap-2 text-xs text-[#6b6b6b] mt-2"><Clock className="w-3 h-3" />{format(new Date(reminder.dueDate), "MMM d, yyyy")}</div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(reminder.id)} className="text-[#6b6b6b] hover:text-red-400" data-testid={`reminder-delete-${reminder.id}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedReminders.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-[#6b6b6b] mb-4">Completed</h2>
            <div className="space-y-3">
              {completedReminders.map((reminder) => (
                <div key={reminder.id} className="bg-[#2f2f2f] border border-[#4a4a4a] rounded-xl p-4 opacity-60" data-testid={`reminder-card-${reminder.id}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button onClick={() => handleToggle(reminder.id)} className="mt-0.5 text-[#10a37f]" data-testid={`reminder-toggle-${reminder.id}`}><CheckCircle2 className="w-5 h-5" /></button>
                      <div>
                        <h3 className="font-medium line-through text-[#6b6b6b]">{reminder.title}</h3>
                        <p className="text-sm text-[#6b6b6b]">{reminder.description}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(reminder.id)} className="text-[#6b6b6b] hover:text-red-400" data-testid={`reminder-delete-${reminder.id}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
