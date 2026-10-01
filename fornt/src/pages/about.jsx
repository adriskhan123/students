import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MapPin,
  MessageCircle,
  Users,
  Wrench,
  Target,
  Compass,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  HardHat,
  Flame,
  Snowflake,
  Smartphone,
  Monitor,
  Car,
  Scissors,
  Sparkles,
  Settings,
  Menu,
} from "lucide-react";

const steps = [
  {
    title: "Post Your Work",
    text: "Customers describe the work they need and provide their location and budget.",
    icon: ClipboardList,
  },
  {
    title: "Find the Right Skill",
    text: "Workers and customers can search by skill categories such as Electrician, Plumber, Carpenter, Painter, Mason, Welder, AC Technician, Driver, Mechanic, and more.",
    icon: Search,
  },
  {
    title: "Match by Location",
    text: "Find relevant opportunities and professionals based on city and area.",
    icon: MapPin,
  },
  {
    title: "Connect Directly",
    text: "Customers and workers can communicate directly through WhatsApp or the available contact method.",
    icon: MessageCircle,
  },
];

const customerPoints = [
  "Post work easily",
  "Select required skill",
  "Add city and area",
  "Set budget/payment",
  "Add work details",
  "Contact workers directly",
];

const workerPoints = [
  "Find relevant work",
  "Search by skill",
  "Search by city",
  "Search by area",
  "View work details",
  "Contact customers directly",
];

const categories = [
  { name: "Electrician", icon: Zap },
  { name: "Plumber", icon: Droplets },
  { name: "Carpenter", icon: Hammer },
  { name: "Painter", icon: Paintbrush },
  { name: "Mason", icon: HardHat },
  { name: "Welder", icon: Flame },
  { name: "AC Technician", icon: Snowflake },
  { name: "Mobile Repair", icon: Smartphone },
  { name: "Computer Technician", icon: Monitor },
  { name: "Driver", icon: Car },
  { name: "Tailor", icon: Scissors },
  { name: "Cleaner", icon: Sparkles },
  { name: "Mechanic", icon: Settings },
  { name: "Other Skills", icon: Menu },
];

const benefits = [
  {
    title: "Local Connections",
    text: "Meet people and professionals in your own city and neighborhood.",
    icon: Users,
  },
  {
    title: "Simple Search",
    text: "Search by skill, city, or area and get to the right listings quickly.",
    icon: Search,
  },
  {
    title: "Skill-Based Matching",
    text: "Customers see the skills they need and workers see work that fits theirs.",
    icon: Target,
  },
  {
    title: "Direct Communication",
    text: "Talk straight to the other person on WhatsApp or the listed contact method.",
    icon: MessageCircle,
  },
  {
    title: "Easy Work Posting",
    text: "Add a skill, location, budget, and description in a few simple fields.",
    icon: ClipboardList,
  },
  {
    title: "Location-Based Discovery",
    text: "Find work and workers close by, so jobs are practical to reach.",
    icon: Compass,
  },
];

function ActionButtons({ light = false }) {
  const focus =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      <Link
        to="/find-workers"
        className={`group flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none ${focus} ${
          light
            ? "bg-white text-blue-700 shadow-blue-900/20 hover:bg-blue-50 focus-visible:ring-white focus-visible:ring-offset-blue-700"
            : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 focus-visible:ring-blue-600"
        }`}
      >
        <Search size={19} aria-hidden="true" />
        Find a Worker
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
        />
      </Link>

      <Link
        to="/post-job"
        className={`group flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none ${focus} ${
          light
            ? "border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-blue-700"
            : "border-slate-200 bg-white text-slate-700 shadow-md hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:ring-emerald-600"
        }`}
      >
        <BriefcaseBusiness size={19} aria-hidden="true" />
        Post Your Work
      </Link>
    </div>
  );
}

function ChecklistCard({ icon: Icon, title, intro, points, accent }) {
  const styles =
    accent === "blue"
      ? {
          iconBox: "bg-blue-50 text-blue-600",
          check: "text-blue-600",
          hover: "hover:border-blue-200 hover:shadow-blue-100",
        }
      : {
          iconBox: "bg-emerald-50 text-emerald-600",
          check: "text-emerald-600",
          hover: "hover:border-emerald-200 hover:shadow-emerald-100",
        };

  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none sm:p-9 ${styles.hover}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${styles.iconBox}`}
      >
        <Icon size={28} aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 leading-7 text-slate-600">{intro}</p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2.5 text-[15px] font-medium text-slate-700"
          >
            <CheckCircle2
              size={18}
              aria-hidden="true"
              className={`mt-0.5 shrink-0 ${styles.check}`}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full bg-emerald-100/50 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Connecting Skills With{" "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text pb-1 text-transparent">
              Opportunities
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            SkillConnect makes it easier to find skilled workers near you and
            helps local professionals discover work opportunities in their
            area.
          </p>

          <div className="mt-9">
            <ActionButtons />
          </div>
        </div>
      </section>

      {/* ABOUT SKILLCONNECT */}
      <section
        aria-labelledby="about-heading"
        className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="about-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              About SkillConnect
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SkillConnect is a local work marketplace designed to connect
              people who need skilled services with professionals who can
              provide them. Customers can post their work requirements with a
              skill, city, area, budget, and description. Workers can discover
              relevant opportunities based on their skills and location.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Local work depends on who is nearby. Matching skills to
              locations helps customers find someone who can actually reach
              them, and helps workers spend their time on jobs in their own
              area. Once there is a match, both sides talk directly.
            </p>
          </div>

          {/* Example listing card */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-100/70 to-emerald-100/70 blur-2xl"
            />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <p className="text-sm font-semibold text-slate-500">
                A work post includes
              </p>

              <dl className="mt-4 divide-y divide-slate-100">
                {[
                  ["Skill", "The kind of worker you need"],
                  ["City", "Where the work is"],
                  ["Area", "The neighborhood or locality"],
                  ["Budget", "What you plan to pay"],
                  ["Description", "Details about the job"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <dt className="font-bold text-slate-900">{label}</dt>
                    <dd className="text-right text-sm text-slate-500">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                <MessageCircle size={18} aria-hidden="true" />
                Workers contact you directly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        aria-labelledby="how-heading"
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2
              id="how-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              How It Works
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Four simple steps from a work requirement to a direct
              conversation.
            </p>
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.title}
                  className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-100 motion-reduce:transform-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={28} aria-hidden="true" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-4xl font-extrabold text-slate-200 transition-colors duration-300 group-hover:text-blue-100"
                    >
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-slate-600">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* CUSTOMERS & WORKERS */}
      <section
        aria-label="For customers and workers"
        className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2 lg:gap-8">
          <ChecklistCard
            icon={Users}
            accent="blue"
            title="For Customers"
            intro="Need a skilled person for your work? Post your requirement and make it easier for local professionals to discover your job."
            points={customerPoints}
          />
          <ChecklistCard
            icon={Wrench}
            accent="emerald"
            title="For Workers"
            intro="Have a skill? Discover work opportunities near you and connect directly with customers."
            points={workerPoints}
          />
        </div>
      </section>

      {/* MISSION */}
      <section
        aria-labelledby="mission-heading"
        className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2
            id="mission-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Our Mission
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-50 sm:text-xl sm:leading-9">
            Our mission is to make local work discovery simple, accessible, and
            direct by bringing customers and skilled professionals closer
            together.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        aria-labelledby="skills-heading"
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2
              id="skills-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Skills You Can Find
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Browse workers and work by skill category.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={`/find-workers?skill=${encodeURIComponent(item.name)}`}
                  className="group flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:transform-none"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={30} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
                    {item.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        aria-labelledby="benefits-heading"
        className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2
              id="benefits-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Why Use SkillConnect
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Built around local work, clear search, and direct conversations.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 motion-reduce:transform-none"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-slate-600">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        aria-labelledby="cta-heading"
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-blue-600 px-6 py-14 text-center shadow-2xl shadow-blue-200 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
          />
          <div className="relative">
            <h2
              id="cta-heading"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Ready to Connect?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              Whether you need skilled help or you&apos;re looking for your next
              opportunity, SkillConnect helps bring local people and skills
              together.
            </p>
            <div className="mt-8">
              <ActionButtons light />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;