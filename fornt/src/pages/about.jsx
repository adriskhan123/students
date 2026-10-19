import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, BriefcaseBusiness, ArrowRight, CheckCircle2, ClipboardList,
  MapPin, MessageCircle, Users, Wrench, Target, Compass, Zap, Droplets,
  Hammer, Paintbrush, HardHat, Flame, Snowflake, Smartphone, Monitor, Car,
  Scissors, Sparkles, Settings, ShieldCheck, ChevronRight, ChevronDown,
  Eye, Handshake, Lightbulb, Heart, Lock
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const steps = [
  { number: "01", title: "Post Your Work", text: "Tell us what you need, choose a skill, add your location, budget, and job details.", icon: ClipboardList },
  { number: "02", title: "Choose a Skill", text: "Find the right professional by selecting the service or skill required for your work.", icon: Search },
  { number: "03", title: "Discover Locally", text: "Browse relevant workers and opportunities based on city, area, and skill.", icon: MapPin },
  { number: "04", title: "Connect Directly", text: "Contact the right person directly through WhatsApp or the available contact method.", icon: MessageCircle }
];

const customerPoints = ["Post your work requirement", "Choose the required skill", "Add your city and area", "Set your expected budget", "Describe the work clearly", "Connect directly with workers"];
const workerPoints = ["Discover nearby work", "Search by your skill", "Filter by city", "Explore local opportunities", "View complete work details", "Contact customers directly"];

const categories = [
  { name: "Electrician", icon: Zap }, { name: "Plumber", icon: Droplets },
  { name: "Carpenter", icon: Hammer }, { name: "Painter", icon: Paintbrush },
  { name: "Mason", icon: HardHat }, { name: "Welder", icon: Flame },
  { name: "AC Technician", icon: Snowflake }, { name: "Mobile Repair", icon: Smartphone },
  { name: "Computer Technician", icon: Monitor }, { name: "Driver", icon: Car },
  { name: "Tailor", icon: Scissors }, { name: "Cleaner", icon: Sparkles },
  { name: "Mechanic", icon: Settings }
];

const benefits = [
  { title: "Local Connections", text: "Discover workers and opportunities within your own city and nearby areas.", icon: Users },
  { title: "Simple Discovery", text: "Find the right service using skill, city, and area-based search.", icon: Search },
  { title: "Skill-Based Search", text: "Connect people with professionals who have the skills needed for the job.", icon: Target },
  { title: "Direct Communication", text: "Talk directly with workers or customers without unnecessary steps.", icon: MessageCircle },
  { title: "Easy Work Posting", text: "Create a work request with the important details in just a few simple fields.", icon: ClipboardList },
  { title: "Practical Local Discovery", text: "Location-based listings make it easier to discover relevant nearby work.", icon: Compass }
];

const values = [
  { title: "Simplicity", text: "Clear pages, short forms, and no unnecessary steps between a need and a conversation.", icon: Lightbulb, tone: "bg-amber-50 text-amber-600" },
  { title: "Transparency", text: "Work details, skills, and locations are shown clearly so everyone knows what to expect.", icon: Eye, tone: "bg-blue-50 text-blue-600" },
  { title: "Respect for Skill", text: "Skilled work deserves to be seen. We want good workers to be easy to find.", icon: Handshake, tone: "bg-emerald-50 text-emerald-600" },
  { title: "Community First", text: "Strong local connections help neighbourhoods and the people working in them grow.", icon: Heart, tone: "bg-rose-50 text-rose-500" }
];

const tips = [
  { title: "Describe the work clearly", text: "The more detail you give about the job, the easier it is for the right person to respond." },
  { title: "Agree details before starting", text: "Talk about price, timing and scope directly before any work begins." },
  { title: "Meet in safe, familiar places", text: "When meeting someone new, choose a public place or have someone with you." },
  { title: "Share only what's needed", text: "Keep personal and payment details private until you are comfortable with the other person." }
];

const faqs = [
  { q: "What is SkillConnect?", a: "SkillConnect is a website that helps people who need work done find skilled professionals nearby, and helps workers discover local opportunities." },
  { q: "How do I find a worker?", a: "Go to the Find a Worker page, choose a skill and your location, and browse the results. When you find a suitable person, contact them directly." },
  { q: "How do I post my work?", a: "Open the Post Your Work page and fill in the skill, city, area, budget and a short description of the job." },
  { q: "How do customers and workers communicate?", a: "Directly, through WhatsApp or the available contact method, so you can discuss the work without extra steps." },
  { q: "Which skills are available?", a: "Electricians, plumbers, carpenters, painters, masons, welders, AC technicians, mobile and computer repair, drivers, tailors, cleaners, mechanics and more." }
];

const fadeUp = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } } };
const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: "easeOut" } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const viewport = { once: true, amount: 0.15 };

function ActionButtons({ light = false }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Link to="/find-workers" className={`group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition hover:-translate-y-1 sm:px-7 sm:text-base ${light ? "bg-white text-blue-700 shadow-lg hover:bg-blue-50" : "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"}`}>
        <Search size={19} /> Find a Worker <ArrowRight size={18} className="transition group-hover:translate-x-1" />
      </Link>
      <Link to="/post-job" className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition hover:-translate-y-1 sm:px-7 sm:text-base ${light ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}`}>
        <BriefcaseBusiness size={19} /> Post Your Work
      </Link>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, light = false, align = "center" }) {
  const left = align === "left";
  return (
    <motion.div variants={fadeUp} className={`max-w-3xl ${left ? "text-left" : "mx-auto text-center"}`}>
      <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${light ? "bg-white/10 text-blue-100" : "bg-blue-50 text-blue-600"}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" /> {eyebrow}
      </div>
      <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {text && <p className={`mt-4 max-w-2xl text-base leading-7 sm:text-lg ${left ? "" : "mx-auto"} ${light ? "text-blue-100" : "text-slate-600"}`}>{text}</p>}
    </motion.div>
  );
}

function ChecklistCard({ icon: Icon, title, intro, points, accent, cta, to }) {
  const blue = accent === "blue";
  return (
    <motion.div variants={card} whileHover={{ y: -7 }} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
      <div className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl ${blue ? "bg-blue-100/70" : "bg-cyan-100/70"}`} />
      <div className="relative">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${blue ? "bg-blue-50 text-blue-600" : "bg-cyan-50 text-cyan-600"}`}><Icon size={27} /></div>
        <h3 className="mt-6 text-2xl font-extrabold text-slate-900">{title}</h3>
        <p className="mt-3 leading-7 text-slate-600">{intro}</p>
        <div className="my-6 h-px bg-slate-100" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {points.map(point => <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-slate-700"><CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${blue ? "text-blue-600" : "text-cyan-600"}`} />{point}</li>)}
        </ul>
        <Link to={to} className={`mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 ${blue ? "bg-blue-600 hover:bg-blue-700" : "bg-cyan-600 hover:bg-cyan-700"}`}>{cta}<ArrowRight size={16} /></Link>
      </div>
    </motion.div>
  );
}

function About() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-white text-slate-900 antialiased">
        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 -z-10"><div className="absolute left-[-15%] top-[-25%] h-[520px] w-[520px] rounded-full bg-blue-100/60 blur-3xl" /><div className="absolute bottom-[-30%] right-[-15%] h-[500px] w-[500px] rounded-full bg-cyan-100/50 blur-3xl" /></div>
          <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <motion.div variants={fadeUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"><ShieldCheck size={17} /> Connecting People & Skills</div>
              <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Connecting <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills With</span><span className="block">Opportunities.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">SkillConnect makes local work discovery easier by bringing customers and skilled professionals together through simple, location-based connections.</p>
              <div className="mt-9"><ActionButtons /></div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-slate-100 pt-7 text-sm font-semibold text-slate-500">{["Skill-based discovery", "Local connections", "Direct communication"].map(t => <span key={t} className="flex items-center gap-2"><CheckCircle2 size={17} className="text-blue-600" />{t}</span>)}</div>
            </motion.div>
            <motion.div variants={scaleIn} className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-6 rounded-[3rem] bg-blue-100/60 blur-3xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">SkillConnect</p><h3 className="mt-1 text-lg font-extrabold">Find local skills</h3></div><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><Search size={19} /></div></div>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">What do you need?</p><div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"><Wrench size={18} className="text-blue-600" /><span className="text-sm font-semibold">Electrician</span><ChevronRight size={17} className="ml-auto text-slate-400" /></div></div>
                <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-slate-100 p-4 shadow-sm"><MapPin size={18} className="text-blue-600" /><p className="mt-3 text-xs font-semibold text-slate-400">Location</p><p className="mt-1 text-sm font-bold">Your Area</p></div><div className="rounded-2xl border border-slate-100 p-4 shadow-sm"><Users size={18} className="text-blue-600" /><p className="mt-3 text-xs font-semibold text-slate-400">Professionals</p><p className="mt-1 text-sm font-bold">Nearby Workers</p></div></div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white"><MessageCircle size={19} /><div><p className="text-sm font-bold">Connect directly</p><p className="text-xs text-blue-100">Contact the professional you choose</p></div><ArrowRight size={18} className="ml-auto" /></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section className="border-y border-slate-200 bg-slate-900"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center sm:px-6 md:grid-cols-4 lg:px-8">{[{ value: `${categories.length}+`, label: "Skill categories" }, { value: "City & Area", label: "Location-based search" }, { value: "Direct", label: "Worker-to-customer contact" }, { value: "2 Sides", label: "Customers and workers" }].map(s => <div key={s.label}><p className="text-2xl font-extrabold text-white sm:text-3xl">{s.value}</p><p className="mt-1 text-sm text-slate-400">{s.label}</p></div>)}</div></section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20"><div><SectionHeading align="left" eyebrow="About SkillConnect" title="A simpler way to connect local skills." text="SkillConnect is designed around one simple idea: make it easier for people who need work done to discover skilled professionals who can help." /><div className="mt-8 space-y-5 text-base leading-8 text-slate-600"><p>Customers can create work requests with the skill, city, area, budget, and details they need. Workers can discover relevant opportunities based on their skills and location.</p><p>Instead of making local work complicated, SkillConnect focuses on clear information, practical discovery, and direct communication between the people involved.</p></div><Link to="/find-workers" className="mt-8 inline-flex items-center gap-2 font-bold text-blue-600 hover:gap-3">Explore skilled workers <ArrowRight size={18} /></Link></div><motion.div variants={scaleIn} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Work Request</p><h3 className="mt-1 text-xl font-extrabold">What a customer can provide</h3></div><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><ClipboardList size={21} /></div></div><div className="mt-7 space-y-3">{[["Skill", "The type of professional needed"], ["City", "Where the work is located"], ["Area", "The local neighborhood"], ["Budget", "Expected payment or budget"], ["Description", "Important job details"]].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-5 rounded-xl bg-slate-50 px-4 py-3.5"><span className="text-sm font-bold">{label}</span><span className="text-right text-xs font-medium text-slate-500">{value}</span></div>)}</div><div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5"><MessageCircle size={19} className="text-blue-600" /><span className="text-sm font-bold text-blue-700">Connect directly with the right person</span></div></motion.div></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Simple Process" title="How SkillConnect Works" text="A straightforward journey from a work requirement to a direct connection." /><motion.div variants={stagger} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{steps.map(step => { const Icon = step.icon; return <motion.div key={step.number} variants={card} whileHover={{ y: -7 }} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:border-blue-200 hover:shadow-xl"><div className="flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={23} /></div><span className="text-sm font-extrabold text-slate-200">{step.number}</span></div><h3 className="mt-7 text-xl font-extrabold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p></motion.div>; })}</motion.div></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Built For Both Sides" title="One platform, two simple experiences." text="Whether you need skilled help or you're looking for work, SkillConnect gives you tools built around your goal." /><motion.div variants={stagger} className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8"><ChecklistCard icon={Users} accent="blue" title="For Customers" intro="Need a skilled professional? Create your requirement and make it discoverable to workers who match your needs." points={customerPoints} cta="Post Your Work" to="/post-job" /><ChecklistCard icon={Wrench} accent="cyan" title="For Workers" intro="Have a skill? Discover relevant work opportunities and connect directly with customers in your area." points={workerPoints} cta="Find Opportunities" to="/find-workers" /></motion.div></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Skills & Services" title="Find the skill you need." text="Explore different categories of skilled professionals available through SkillConnect." /><motion.div variants={stagger} className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">{categories.map(category => { const Icon = category.icon; return <motion.div key={category.name} variants={card} whileHover={{ y: -6, scale: 1.02 }}><Link to={`/find-workers?skill=${encodeURIComponent(category.name)}`} className="group block rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-lg"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"><Icon size={21} /></div><h3 className="mt-4 text-sm font-bold">{category.name}</h3><div className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:gap-2 group-hover:opacity-100">Explore <ArrowRight size={13} /></div></Link></motion.div>; })}</motion.div></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={scaleIn} className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="relative mx-auto max-w-4xl text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white"><Target size={27} /></div><h2 className="mt-7 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Our Mission</h2><p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">Our mission is to make local work discovery simple and accessible by bringing people who need services closer to skilled professionals who can provide them.</p></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="What We Believe" title="The values behind SkillConnect." text="The principles that guide how we build and improve the platform." /><motion.div variants={stagger} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map(({ title, text, icon: Icon, tone }) => <motion.div key={title} variants={card} whileHover={{ y: -7 }} className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm hover:shadow-xl"><div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}><Icon size={26} /></div><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></motion.div>)}</motion.div></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Why SkillConnect" title="Designed around local work." text="Everything is focused on making discovery, matching, and communication easier." /><motion.div variants={stagger} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{benefits.map(benefit => { const Icon = benefit.icon; return <motion.div key={benefit.title} variants={card} whileHover={{ y: -7 }} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:border-blue-200 hover:shadow-xl"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={23} /></div><h3 className="mt-6 text-lg font-extrabold">{benefit.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{benefit.text}</p></motion.div>; })}</motion.div></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><SectionHeading align="left" eyebrow="Stay Safe" title="Tips for a good experience." text="SkillConnect connects you directly, so a little care goes a long way." /><div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700"><Lock size={19} /> Always use your own judgement when working with someone new.</div></div><motion.div variants={stagger} className="space-y-4">{tips.map((tip, i) => <motion.div key={tip.title} variants={card} className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200 hover:shadow-lg"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white">{i + 1}</span><div><h3 className="font-extrabold">{tip.title}</h3><p className="mt-1.5 text-sm leading-7 text-slate-600">{tip.text}</p></div></motion.div>)}</motion.div></div></motion.section>

        <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={fadeIn} className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-3xl"><SectionHeading eyebrow="FAQ" title="Frequently asked questions." text="Quick answers about how SkillConnect works." /><motion.div variants={stagger} className="mt-12 space-y-3">{faqs.map((faq, i) => { const open = openFaq === i; return <motion.div variants={card} key={faq.q} className={`overflow-hidden rounded-2xl border bg-white ${open ? "border-blue-200 shadow-lg" : "border-slate-200 shadow-sm"}`}><button type="button" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"><span className="font-bold">{faq.q}</span><ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-blue-600" : "text-slate-500"}`} /></button><motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><p className="px-6 pb-5 leading-7 text-slate-600">{faq.a}</p></motion.div></motion.div>; })}</motion.div></div></motion.section>

        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><motion.div initial="hidden" whileInView="show" viewport={viewport} variants={scaleIn} className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 to-indigo-800 px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-20"><div className="relative"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white"><BriefcaseBusiness size={26} /></div><h2 className="mt-7 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Ready to connect?</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">Find skilled help for your work or discover opportunities that match your skills.</p><div className="mt-9"><ActionButtons light /></div></div></motion.div></section>
      </main>
      <Footer />
    </>
  );
}

export default About;
