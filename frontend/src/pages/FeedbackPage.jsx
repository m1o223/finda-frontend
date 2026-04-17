import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star, MessageCircleHeart, ThumbsUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const feedbackTypes = [
  { id: "suggestion", label: "Suggestion", icon: Sparkles },
  { id: "bug", label: "Bug Report", icon: MessageCircleHeart },
  { id: "praise", label: "Praise", icon: ThumbsUp },
];

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast.error("Please enter your feedback message");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thank you for your feedback!", {
      description: "We appreciate you taking the time to help us improve.",
    });

    // Reset form
    setRating(0);
    setFeedbackType("suggestion");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="min-h-screen p-6 md:p-10 flex items-center justify-center"
      data-testid="feedback-page"
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 glow-purple">
            <MessageCircleHeart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-['Outfit'] gradient-text">Share Feedback</h1>
          <p className="text-zinc-400 mt-3">Help us make BlueMind AI even better</p>
        </div>

        {/* Feedback Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md"
          data-testid="feedback-form"
        >
          {/* Rating */}
          <div className="mb-8">
            <label className="text-sm text-zinc-400 mb-3 block">How would you rate your experience?</label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                  data-testid={`rating-star-${star}`}
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors",
                      (hoveredRating || rating) >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-600"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Type */}
          <div className="mb-6">
            <label className="text-sm text-zinc-400 mb-3 block">What type of feedback?</label>
            <div className="flex gap-2">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFeedbackType(type.id)}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm",
                    feedbackType === type.id
                      ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-purple-500/30"
                      : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-transparent"
                  )}
                  data-testid={`feedback-type-${type.id}`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-zinc-400 mb-1.5 block">Name (optional)</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 rounded-xl"
              data-testid="feedback-name-input"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-zinc-400 mb-1.5 block">Email (optional)</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 rounded-xl"
              data-testid="feedback-email-input"
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="text-sm text-zinc-400 mb-1.5 block">Your feedback *</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what you think..."
              rows={5}
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 rounded-xl resize-none"
              data-testid="feedback-message-input"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.message.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl py-6 text-base font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="feedback-submit-button"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Feedback
              </span>
            )}
          </Button>
        </motion.form>

        {/* Footer note */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Your feedback helps us improve BlueMind AI for everyone.
        </p>
      </div>
    </motion.div>
  );
}
