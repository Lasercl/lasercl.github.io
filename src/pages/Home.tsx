import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { projects } from "../data/projects";
import SectionHeading from "../components/ui/SectionHeading";
import SkillBar from "../components/ui/SkillBar";
import TimelineItem from "../components/ui/TimelineItem";
import ProjectCard from "../components/projects/ProjectCard";
import HeroScene from "../components/three/HeroScene";
import Reveal from "../components/ui/Reveal";
import { asset } from "../lib/asset";

const FEATURED_IDS = [13, 12, 2, 4];

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

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  const featuredProjects = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-20 px-6 overflow-hidden md:flex md:items-center">
        <div className="relative w-full h-72 sm:h-96 md:absolute md:inset-y-0 md:inset-x-0 md:h-full md:w-full mb-8 md:mb-0">
          <HeroScene />
        </div>

        <div
          aria-hidden
          className="hidden md:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-xl text-center md:text-left space-y-6 mx-auto md:mx-0">
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
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary glow-text">
                Laser Clauss
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
              Software Engineering Student
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto md:mx-0 text-lg">
              Passionate about creating modern, dynamic, and beautiful web experiences. Welcome to
              my personal 3D portfolio.
            </p>
            <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionHeading className="mb-16">About Me</SectionHeading>
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
            <SectionHeading align="left" className="mb-12">
              Experience
            </SectionHeading>
            <div className="space-y-6">
              {experience.map((item) => (
                <TimelineItem key={item.title} variant="glass" {...item} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionHeading align="left" className="mb-12">
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
            <SectionHeading align="left">Featured Projects</SectionHeading>
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
