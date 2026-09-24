"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MessageSquare, User } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  const field = (id: string, label: string, type = "text", icon?: React.ElementType) => {
    const Icon = icon;
    const hasError = !!errors[id];
    return (
      <div>
        <label htmlFor={id} className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">{label}</label>
        <div className="relative">
          {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />}
          <input
            id={id}
            type={type}
            value={form[id as keyof typeof form]}
            onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
            className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-[#111] border rounded-xl text-sm text-white placeholder-gray-700 focus:outline-none transition-colors font-mono ${
              hasError ? "border-red-700 focus:border-red-500" : "border-white/10 focus:border-red-900/60"
            }`}
            placeholder={label}
          />
        </div>
        {hasError && <p className="text-xs text-red-500 mt-1 font-mono">{errors[id]}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-gray-500 text-xs font-mono mb-4">SECURE CONTACT</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Get in <span className="text-red-500">Touch</span></h1>
          <p className="text-gray-500 text-sm">Questions, research collaboration, or vulnerability reports — we&apos;re here.</p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-[#111] border border-green-900/40 rounded-2xl p-12"
          >
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Message Sent</h2>
            <p className="text-gray-500 text-sm">We&apos;ll respond within 24–48 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {field("name", "Full Name", "text", User)}
              {field("email", "Email Address", "email", Mail)}
            </div>
            {field("subject", "Subject", "text", MessageSquare)}
            <div>
              <label htmlFor="message" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={`w-full px-4 py-3 bg-[#0d0d0d] border rounded-xl text-sm text-white placeholder-gray-700 focus:outline-none transition-colors resize-none font-mono ${
                  errors.message ? "border-red-700" : "border-white/10 focus:border-red-900/60"
                }`}
                placeholder="Describe your inquiry..."
              />
              {errors.message && <p className="text-xs text-red-500 mt-1 font-mono">{errors.message}</p>}
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-800 hover:bg-red-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
