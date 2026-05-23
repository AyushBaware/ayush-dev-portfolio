import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();
  const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID; 
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
  
  // Clean, professional reference pointing to your .env file
  const autoReplyTemplateId = import.meta.env.VITE_EMAIL_AUTO_REPLY_TEMPLATE_ID; 

  if (!serviceId || !templateId || !autoReplyTemplateId || !publicKey) {
    toast.error("Keys missing!");
    return;
  }

  setIsSending(true);

  // STEP 1: Send details to your personal inbox
  emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
    .then(() => {
      // STEP 2: Trigger confirmation email back to the visitor
      return emailjs.sendForm(serviceId, autoReplyTemplateId, formRef.current, publicKey);
    })
    .then((response) => {
      console.log("Both emails sent successfully!", response.status, response.text);
      toast.success("Message received!");
      formRef.current.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error Breakdown:", error);
      toast.error(`Failed to send: ${error?.text || "Unknown Server Error"}`);
    })
    .finally(() => setIsSending(false));
};

  return (
    <section className="pointer-events-auto relative isolate mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-start px-6 pt-12 pb-12 md:pt-20 lg:flex-row lg:items-center lg:justify-between">
      
      {/* Contact Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-30 w-full max-w-xl rounded-[1.5rem] border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-10 transition-colors duration-500"
      >
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-[60px]" />

        <div className="mb-6 md:mb-8 text-center lg:text-left">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-cyan-500 dark:text-cyan-400 uppercase">
            Contact
          </h2>
          <h3 className="mt-1 text-4xl font-black text-slate-900 dark:text-white md:text-6xl">
            Let's <span className="text-slate-400 dark:text-slate-500">Connect.</span>
          </h3>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {/* Full Name */}
          <div className="group relative">
            <label className="text-[10px] font-bold uppercase text-slate-500 group-focus-within:text-cyan-500 transition-colors">
              Full Name
            </label>
            <input
              type="text"
              name="from_name"
              placeholder="Ayush Baware"
              required
              className="mt-1.5 w-full rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all focus:border-cyan-500/50"
            />
          </div>

          {/* Email Address */}
          <div className="group relative">
            <label className="text-[10px] font-bold uppercase text-slate-500 group-focus-within:text-cyan-500 transition-colors">
              Email Address
            </label>
            <input
              type="email"
              name="reply_to"
              placeholder="example@gmail.com"
              required
              className="mt-1.5 w-full rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all focus:border-cyan-500/50"
            />
          </div>

          {/* Message */}
          <div className="group relative">
            <label className="text-[10px] font-bold uppercase text-slate-500 group-focus-within:text-cyan-500 transition-colors">
              Message
            </label>
            <textarea
              name="message"
              placeholder="What's on your mind?"
              rows="3"
              required
              className="mt-1.5 w-full rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all focus:border-cyan-500/50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isSending}
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-white dark:text-slate-950 transition-all hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? "SENDING..." : "SEND MESSAGE"}
          </motion.button>
        </form>
      </motion.div>

      {/* 3D Model Placeholder Spacing */}
      <div className="hidden lg:block lg:w-1/3" />
    </section>
  );
};

export default Contact;