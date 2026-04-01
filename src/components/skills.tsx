"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GlassCard from "./glass-card";
import {
  Bot, Workflow, Globe, Server, GitBranch, Palette,
  Zap, Database, Code2, Terminal, Layout, Cloud,
} from "lucide-react";

const skillCategories = [
  {
    title: "AI & Claude Code",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    skills: ["Claude Code", "MCP Servers", "Claude Plugins", "Claude Skills", "Prompt Engineering"],
  },
  {
    title: "Automation",
    icon: Workflow,
    color: "from-indigo-500 to-purple-500",
    skills: ["n8n", "GoHighLevel (GHL)", "Make (Integromat)", "Webhooks & APIs", "Zapier"],
  },
  {
    title: "Frontend",
    icon: Layout,
    color: "from-blue-500 to-indigo-500",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & Data",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Express.js"],
  },
  {
    title: "DevOps & Tools",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    skills: ["Git & GitHub", "Vercel", "Docker", "VS Code", "npm / pnpm"],
  },
  {
    title: "Design",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    skills: ["Figma", "Responsive Design", "UI/UX Principles", "Framer Motion", "Design Systems"],
  },
];

const tools = [
  { name: "Claude Code", icon: Bot },
  { name: "n8n", icon: Workflow },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Terminal },
  { name: "Tailwind", icon: Palette },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Vercel", icon: Cloud },
  { name: "Git", icon: GitBranch },
  { name: "GHL", icon: Zap },
  { name: "Make", icon: Zap },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 bg-white/50 dark:bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase text-sm mb-3">
            What I Use
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Skills & Tech Stack
          </h2>
        </motion.div>

        {/* Tool icons */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={1}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors cursor-default"
            >
              <tool.icon size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tool.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={catIndex + 2}
            >
              <GlassCard className="group">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color}`}>
                      <category.icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200/60 dark:border-white/5 text-gray-700 dark:text-gray-300 group-hover:border-blue-500/20 dark:group-hover:border-blue-500/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
