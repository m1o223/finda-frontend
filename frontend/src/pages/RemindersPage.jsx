import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Plus, Bell, CheckCircle2, Circle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

const initialReminders = [
  {
    id: 1,
    title: "Team meeting",
    description: "Weekly sync with the design team",
    dueDate: new Date(Date.now() + 86400000),
    completed: false,
    priority: "high",
  },
  {
    id: 2,
    title: "Review project proposal",
    description: "Go through the Q1 project proposals",
    dueDate: new Date(Date.now() + 172800000),
    completed: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Update documentation",
    description: "Update API documentation for v2",
    dueDate: new Date(Date.now() + 259200000),
    completed: true,
    priority: "low",
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for client demo",
    dueDate: new Date(Date.now() + 345600000),
    completed: false,
    priority: "high",
  },
];

const priorityColors = {
  high: "border-l-rose-500",
  medium: "border-l-amber-500",
  low: "border-l-emerald-500",
};

const priorityBadges = {
  high: "bg-rose-500/10 text-rose-400",
  medium: "bg-amber-500/10 text-amber-400",
  low: "bg-emerald-500/10 text-emerald-400",
};

function ReminderCard({ reminder, onToggle, onDelete }) {
  const isOverdue = new Date(reminder.dueDate) < new Date() && !reminder.completed;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-zinc-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md card-hover flex flex-col border-l-4",
        priorityColors[reminder.priority],
        reminder.completed && "opacity-60"
      )}
      data-testid={`reminder-card-${reminder.id}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(reminder.id)}
            className="mt-0.5 text-zinc-400 hover:text-white transition-colors"
            data-testid={`reminder-toggle-${reminder.id}`}
          >
            {reminder.completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <div>
            <h3
              className={cn(
                "font-semibold font-['Outfit'] text-white",
                reminder.completed && "line-through text-zinc-500"
              )}
            >
              {reminder.title}
            </h3>
            <p className="text-sm text-zinc-400 mt-1">{reminder.description}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(reminder.id)}
          className="text-zinc-500 hover:text-rose-400 transition-colors"
          data-testid={`reminder-delete-${reminder.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Clock className={cn("w-4 h-4", isOverdue ? "text-rose-400" : "text-zinc-500")} />
          <span className={cn(isOverdue ? "text-rose-400" : "text-zinc-400")}>
            {format(new Date(reminder.dueDate), "MMM d, yyyy")}
          </span>
        </div>
        <span className={cn("text-xs px-2 py-1 rounded-full capitalize", priorityBadges[reminder.priority])}>
          {reminder.priority}
        </span>
      </div>
    </motion.div>
  );
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState(initialReminders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "medium",
  });

  const handleToggle = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddReminder = () => {
    if (!newReminder.title.trim()) return;

    setReminders((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newReminder,
        completed: false,
      },
    ]);

    setNewReminder({
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "medium",
    });
    setIsDialogOpen(false);
  };

  const activeReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="min-h-screen p-6 md:p-10"
      data-testid="reminders-page"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-['Outfit'] gradient-text">Reminders</h1>
            <p className="text-zinc-400 mt-2">Stay on top of your tasks</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full px-6 gap-2"
                data-testid="add-reminder-button"
              >
                <Plus className="w-4 h-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md" data-testid="add-reminder-dialog" aria-describedby="add-reminder-description">
              <DialogHeader>
                <DialogTitle className="font-['Outfit'] text-xl gradient-text">New Reminder</DialogTitle>
                <p id="add-reminder-description" className="text-sm text-zinc-400">Create a new reminder with title, description, due date, and priority.</p>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1.5 block">Title</label>
                  <Input
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    placeholder="Enter reminder title"
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500"
                    data-testid="reminder-title-input"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-1.5 block">Description</label>
                  <Input
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    placeholder="Add a description"
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500"
                    data-testid="reminder-description-input"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-1.5 block">Due Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-800"
                        data-testid="reminder-date-picker"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {format(newReminder.dueDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={newReminder.dueDate}
                        onSelect={(date) => date && setNewReminder({ ...newReminder, dueDate: date })}
                        className="bg-zinc-900 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-1.5 block">Priority</label>
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewReminder({ ...newReminder, priority: p })}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-xl text-sm capitalize transition-all",
                          newReminder.priority === p
                            ? priorityBadges[p]
                            : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800"
                        )}
                        data-testid={`priority-${p}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleAddReminder}
                  disabled={!newReminder.title.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl"
                  data-testid="save-reminder-button"
                >
                  Save Reminder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <Bell className="w-4 h-4" />
              <span className="text-sm">Total</span>
            </div>
            <p className="text-2xl font-bold font-['Outfit'] text-white">{reminders.length}</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Active</span>
            </div>
            <p className="text-2xl font-bold font-['Outfit'] text-white">{activeReminders.length}</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Completed</span>
            </div>
            <p className="text-2xl font-bold font-['Outfit'] text-white">{completedReminders.length}</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Overdue</span>
            </div>
            <p className="text-2xl font-bold font-['Outfit'] text-white">
              {activeReminders.filter((r) => new Date(r.dueDate) < new Date()).length}
            </p>
          </div>
        </div>

        {/* Active Reminders */}
        {activeReminders.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold font-['Outfit'] text-white mb-4">Active</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeReminders.map((reminder, index) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ReminderCard
                    reminder={reminder}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold font-['Outfit'] text-zinc-400 mb-4">Completed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedReminders.map((reminder, index) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ReminderCard
                    reminder={reminder}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {reminders.length === 0 && (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold font-['Outfit'] text-white mb-2">No reminders yet</h3>
            <p className="text-zinc-400">Create your first reminder to get started</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
