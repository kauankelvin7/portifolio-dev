const fs = require('fs');
const path = require('path');

const locales = ['pt', 'en', 'es', 'fr', 'zh'];

const dataToAdd = {
  pt: {
    ticker: { items: "NEXT.JS · TYPESCRIPT · REACT THREE FIBER · TAILWIND CSS · FRAMER MOTION · PYTHON · SUPABASE · VERCEL · RAILWAY · GROQ" },
    about: { eyebrow: "SOBRE MIM" },
    projects: { 
      eyebrow: "TRABALHOS SELECIONADOS",
      syntax: { title: "SYNTAX", description: "Sistema educacional desenvolvido para estudar programação.", category: "EDUCATION · WEB APP" },
      cinema: { title: "CINEMA", description: "Sistema completo para gestão de clínicas de fisioterapia.", category: "HEALTHCARE · SAAS" },
      omni: { title: "OMNI", description: "SaaS focado no mercado B2B para gestão empresarial.", category: "B2B · ECOSYSTEM" },
      medsync: { title: "MEDSYNC", description: "Prontuário e chat médico inteligente com IA.", category: "AI · HEALTH TECH" }
    },
    process: { 
      eyebrow: "O QUE FAÇO",
      item1: "Frontend premium — Next.js, animações, 3D, performance",
      item2: "Backend sólido — APIs REST, autenticação, banco de dados",
      item3: "Deploy e infra — Vercel, Railway, Supabase, CI/CD",
      item4: "AI integrations — LLMs, agentes, automações"
    },
    contact: { 
      title: "VAMOS TRABALHAR.", 
      subtitle: "Disponível para projetos remotos internacionais.", 
      cta: "ENVIAR MENSAGEM" 
    }
  },
  en: {
    ticker: { items: "NEXT.JS · TYPESCRIPT · REACT THREE FIBER · TAILWIND CSS · FRAMER MOTION · PYTHON · SUPABASE · VERCEL · RAILWAY · GROQ" },
    about: { eyebrow: "ABOUT ME" },
    projects: { 
      eyebrow: "SELECTED WORK",
      syntax: { title: "SYNTAX", description: "Educational system developed for studying programming.", category: "EDUCATION · WEB APP" },
      cinema: { title: "CINEMA", description: "Complete system for physical therapy clinic management.", category: "HEALTHCARE · SAAS" },
      omni: { title: "OMNI", description: "B2B SaaS focused on simplified business management.", category: "B2B · ECOSYSTEM" },
      medsync: { title: "MEDSYNC", description: "Intelligent medical record and chat using AI APIs.", category: "AI · HEALTH TECH" }
    },
    process: { 
      eyebrow: "WHAT I DO",
      item1: "Premium frontend — Next.js, animations, 3D, performance",
      item2: "Solid backend — REST APIs, authentication, databases",
      item3: "Deploy & infra — Vercel, Railway, Supabase, CI/CD",
      item4: "AI integrations — LLMs, agents, automations"
    },
    contact: { 
      title: "LET'S WORK.", 
      subtitle: "Available for international remote projects.", 
      cta: "SEND A MESSAGE" 
    }
  },
  es: {
    ticker: { items: "NEXT.JS · TYPESCRIPT · REACT THREE FIBER · TAILWIND CSS · FRAMER MOTION · PYTHON · SUPABASE · VERCEL · RAILWAY · GROQ" },
    about: { eyebrow: "SOBRE MÍ" },
    projects: { 
      eyebrow: "TRABAJOS SELECCIONADOS",
      syntax: { title: "SYNTAX", description: "Sistema educativo desarrollado para estudiar programación.", category: "EDUCATION · WEB APP" },
      cinema: { title: "CINEMA", description: "Sistema completo para la gestión de clínicas de fisioterapia.", category: "HEALTHCARE · SAAS" },
      omni: { title: "OMNI", description: "SaaS B2B enfocado en la gestión empresarial simplificada.", category: "B2B · ECOSYSTEM" },
      medsync: { title: "MEDSYNC", description: "Expediente médico y chat inteligente que utiliza APIs de IA.", category: "AI · HEALTH TECH" }
    },
    process: { 
      eyebrow: "LO QUE HAGO",
      item1: "Frontend premium — Next.js, animaciones, 3D, rendimiento",
      item2: "Backend sólido — APIs REST, autenticación, base de datos",
      item3: "Deploy e infra — Vercel, Railway, Supabase, CI/CD",
      item4: "Integraciones AI — LLMs, agentes, automatizaciones"
    },
    contact: { 
      title: "TRABAJEMOS.", 
      subtitle: "Disponible para proyectos remotos internacionales.", 
      cta: "ENVIAR MENSAJE" 
    }
  },
  fr: {
    ticker: { items: "NEXT.JS · TYPESCRIPT · REACT THREE FIBER · TAILWIND CSS · FRAMER MOTION · PYTHON · SUPABASE · VERCEL · RAILWAY · GROQ" },
    about: { eyebrow: "À PROPOS" },
    projects: { 
      eyebrow: "TRAVAUX SÉLECTIONNÉS",
      syntax: { title: "SYNTAX", description: "Système éducatif développé para l'étude de la programmation.", category: "EDUCATION · WEB APP" },
      cinema: { title: "CINEMA", description: "Système complet de gestion de cliniques de kinésithérapie.", category: "HEALTHCARE · SAAS" },
      omni: { title: "OMNI", description: "SaaS B2B axé sur la gestion d'entreprise simplifiée.", category: "B2B · ECOSYSTEM" },
      medsync: { title: "MEDSYNC", description: "Dossier médical et chat intelligent utilisant les API d'IA.", category: "AI · HEALTH TECH" }
    },
    process: { 
      eyebrow: "CE QUE JE FAIS",
      item1: "Frontend premium — Next.js, animations, 3D, performance",
      item2: "Backend solide — APIs REST, authentification, bases de données",
      item3: "Déploiement & infra — Vercel, Railway, Supabase, CI/CD",
      item4: "Intégrations IA — LLMs, agents, automatisations"
    },
    contact: { 
      title: "TRAVAILLONS.", 
      subtitle: "Disponible pour des projets distants internationaux.", 
      cta: "ENVOYER UN MESSAGE" 
    }
  },
  zh: {
    ticker: { items: "NEXT.JS · TYPESCRIPT · REACT THREE FIBER · TAILWIND CSS · FRAMER MOTION · PYTHON · SUPABASE · VERCEL · RAILWAY · GROQ" },
    about: { eyebrow: "关于我" },
    projects: { 
      eyebrow: "精选作品",
      syntax: { title: "SYNTAX", description: "为学习编程开发的教育系统。", category: "教育 · 网络应用" },
      cinema: { title: "CINEMA", description: "理疗诊所管理系统。", category: "医疗保健 · SAAS" },
      omni: { title: "OMNI", description: "专注于简化业务管理的 B2B SaaS。", category: "B2B · 生态系统" },
      medsync: { title: "MEDSYNC", description: "使用 AI API 的智能医疗记录和聊天。", category: "人工智能 · 医疗科技" }
    },
    process: { 
      eyebrow: "我的专长",
      item1: "高端前端 — Next.js、动画、3D、性能优化",
      item2: "稳健后端 — REST API、身份验证、数据库",
      item3: "部署与基础设施 — Vercel、Railway、Supabase、CI/CD",
      item4: "AI集成 — 大语言模型、智能体、自动化"
    },
    contact: { 
      title: "合作吧.", 
      subtitle: "欢迎国际远程项目合作。", 
      cta: "发送消息" 
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, `../messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.Ticker = dataToAdd[loc].ticker;
  data.AboutSection = dataToAdd[loc].about;
  data.ProjectsSection = dataToAdd[loc].projects;
  data.ProcessSection = dataToAdd[loc].process;
  data.ContactSection = dataToAdd[loc].contact;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${loc}.json with new keys`);
});
