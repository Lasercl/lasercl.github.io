import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data/projects";
import SectionHeading from "../components/ui/SectionHeading";
import SkillBar from "../components/ui/SkillBar";
import TimelineItem from "../components/ui/TimelineItem";
import ProjectCard from "../components/projects/ProjectCard";
import HeroScene from "../components/three/HeroScene";
import { HERO_VIEWS, getHeroView, type HeroViewId } from "../components/three/heroViews";
import Reveal from "../components/ui/Reveal";
import { asset } from "../lib/asset";

const FEATURED_IDS = [13, 12, 2, 4];

const samsungExperience = [
  {
    title: "Samsung R&D Institute Indonesia",
    role: "Software Engineer — Contract",
    period: "Mar 30, 2026 - Present",
    description:
      "Continuing at Samsung R&D Institute Indonesia on a contract after completing the internship program.",
    image: "images/contract-samsung.jpg",
    imagePosition: "center 55%",
    badge: "Contract",
    current: true,
  },
  {
    title: "Samsung R&D Institute Indonesia",
    role: "Software Engineer — Internship",
    period: "Mar 3, 2025 - Feb 28, 2026",
    description:
      "One-year internship at Samsung R&D Institute Indonesia, working alongside R&D engineers on real products.",
    image: "images/intern-samsung.jpg",
    imagePosition: "center 35%",
    badge: "Internship · 1 Year",
    current: false,
  },
];

const experience = [
  {
    title: "Skilvul Samsung Bootcamp",
    subtitle: "Feb 2024 - Mar 2024",
    description: "Student Member focusing on Python Programming.",
  },
  {
    title: "BINUS Basketball Semarang",
    subtitle: "2022 - 2023",
    description: "Served as the Secretary.",
  },
  {
    title: "BINUS OK Kristen Semarang",
    subtitle: "2022 - 2023",
    description: "Served as the Secretary.",
  },
  {
    title: "Orphanage Volunteer",
    subtitle: "July 2023",
    description: "Taught Mathematics to children in the orphanage.",
  },
];

const skills = [
  { name: "HTML & CSS", level: "Intermediate", percent: 75 },
  { name: "C Programming", level: "Intermediate", percent: 65 },
  { name: "Java Programming", level: "Intermediate", percent: 70 },
  { name: "Ms. Office Suite", level: "Intermediate", percent: 80 },
  { name: "Public Speaking", level: "Intermediate", percent: 75 },
];

const characterTraits = ["Discipline", "Friendly", "Patient", "Humble", "Deft", "Learner"];

const heroStats = [
  { value: `${projects.length}+`, label: "Projects Built" },
  { value: "1+", label: "Year at Samsung R&D" },
  { value: "4+", label: "Years of Study" },
];

export default function Home() {
  const location = useLocation();
  const [view, setView] = useState<HeroViewId>("overview");
  const activeView = getHeroView(view);

  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  const featuredProjects = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  const selectView = (id: HeroViewId) => setView((current) => (current === id ? "overview" : id));

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-20 px-6 overflow-hidden md:flex md:items-center">
        <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none" />

        <div className="relative w-full h-80 sm:h-96 md:absolute md:inset-y-0 md:inset-x-0 md:h-full md:w-full mb-8 md:mb-0">
          <HeroScene view={view} onViewChange={selectView} />

          {/* 3D viewpoint controls */}
          <div className="absolute inset-x-0 bottom-2 md:bottom-8 z-20 flex flex-col items-center md:items-end gap-3 px-3 md:px-10 pointer-events-none">
            <AnimatePresence mode="wait">
              {view === "overview" ? (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-auto glass rounded-full px-4 py-2 text-xs md:text-sm text-purple-200"
                >
                  <i className="fa-solid fa-wand-magic-sparkles mr-2 text-violet-400" />
                  Click a glowing object to explore my desk
                </motion.p>
              ) : (
                <motion.div
                  key={activeView.id}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-auto glass rounded-2xl px-5 py-4 max-w-xs md:max-w-sm text-left shadow-[0_10px_40px_-10px_rgba(109,40,217,0.6)]"
                >
                  <p className="flex items-center gap-2 text-base md:text-lg font-semibold text-white">
                    <i className={`${activeView.icon} text-violet-400`} />
                    {activeView.title}
                  </p>
                  <p className="mt-1.5 text-xs md:text-sm text-gray-300 leading-relaxed">
                    {activeView.blurb}
                  </p>
                  {activeView.cta && (
                    <Link
                      to={activeView.cta.to}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-white transition-colors"
                    >
                      {activeView.cta.label} <i className="fa-solid fa-arrow-right text-xs" />
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pointer-events-auto flex flex-wrap justify-center md:justify-end gap-2">
              {HERO_VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => selectView(v.id)}
                  className={`view-chip ${view === v.id ? "active" : ""}`}
                  aria-pressed={view === v.id}
                >
                  <i className={`${v.icon} text-[0.7rem]`} />
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="hidden md:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full pointer-events-none">
          <div className="max-w-xl text-center md:text-left space-y-6 mx-auto md:mx-0 pointer-events-auto">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <img
                src={asset("images/foto-profile.jpg")}
                alt="Laser Clauss"
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/60 shadow-[0_0_15px_rgba(109,40,217,0.6)]"
              />
              <p className="text-primary font-medium tracking-widest uppercase">
                Welcome to my universe
              </p>
            </div>

            <div className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 text-sm text-gray-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Currently at Samsung R&D Institute Indonesia
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Hi, I'm <br />
              <span className="text-gradient glow-text">Laser Clauss</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
              Software Engineer
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto md:mx-0 text-lg">
              Passionate about creating modern, dynamic, and beautiful web experiences. Welcome to
              my personal 3D portfolio.
            </p>

            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                to="/#projects"
                className="px-8 py-3.5 bg-primary hover:bg-purple-600 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(109,40,217,0.4)] hover:shadow-[0_0_30px_rgba(109,40,217,0.6)] hover:-translate-y-1"
              >
                View My Work
              </Link>
              <Link
                to="/#about"
                className="px-8 py-3.5 glass hover:bg-white/10 text-white rounded-full font-medium transition-all"
              >
                About Me
              </Link>
            </div>

            <div className="flex justify-center md:justify-start gap-8 pt-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionHeading kicker="Who I am" className="mb-16">
              About Me
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card p-8 md:p-12">
              <p className="text-xl text-gray-300 leading-relaxed mb-10 text-center md:text-left">
                My name is Laser Clauss Latupeirissa. I'm a student from Bina Nusantara University in
                Indonesia. I enjoy creating projects, especially related to Computer Science and
                Software Engineering. I strive to learn and build impactful digital solutions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-purple-300">
                    <i className="fa-solid fa-user-astronaut" /> Character
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {characterTraits.map((trait) => (
                      <span
                        key={trait}
                        className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-purple-300">
                    <i className="fa-solid fa-graduation-cap" /> Education
                  </h3>
                  <div className="space-y-4">
                    <TimelineItem title="Bina Nusantara University" subtitle="2022 - 2026" />
                    <TimelineItem title="Loyola College High School" subtitle="2019 - 2022" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills & Experience Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal>
            <SectionHeading kicker="My journey" align="left" className="mb-12">
              Experience
            </SectionHeading>

            <div className="space-y-6">
              {samsungExperience.map((job) => (
                <div key={job.period} className="glass-card overflow-hidden group/exp">
                  <div className="relative h-52 sm:h-64 overflow-hidden">
                    <img
                      src={asset(job.image)}
                      alt={`${job.title} — ${job.badge}`}
                      style={{ objectPosition: job.imagePosition }}
                      className="w-full h-full object-cover transform group-hover/exp:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary/80 backdrop-blur-md text-white shadow-[0_0_12px_rgba(109,40,217,0.6)]">
                      {job.badge}
                    </span>
                    {job.current && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                        </span>
                        Present
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-white group-hover/exp:text-purple-300 transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-violet-300 text-sm mt-1">{job.role}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{job.period}</p>
                    <p className="text-gray-400 mt-3">{job.description}</p>
                  </div>
                </div>
              ))}

              {experience.map((item) => (
                <TimelineItem key={item.title} variant="glass" {...item} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionHeading kicker="What I can do" align="left" className="mb-12">
              Skills
            </SectionHeading>
            <div className="glass-card p-8">
              <div className="space-y-6">
                {skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <SectionHeading kicker="Selected work" align="left">
              Featured Projects
            </SectionHeading>
            <Link
              to="/projects"
              className="hidden md:inline-flex text-primary hover:text-purple-300 font-medium transition-colors items-center gap-2"
            >
              View All Projects <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/projects"
              className="inline-flex text-primary hover:text-purple-300 font-medium transition-colors items-center gap-2"
            >
              View All Projects <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
