import type { Project } from "../types/types";

export const projects: Project[] = [
   {
    id: "2064360369920544770",
    title: "易搭 Yida",
    description: "基于 Spring Boot 3 + LangChain4j 的 零代码 AI 应用生成平台前端，支持多种模式的智能代码生成、可视化编辑预览、一键部署分享、应用管理、AI 智能路由等。",
    longDescription: "Yida（译：易搭）是一个基于 AI 对话生成应用的平台。用户只需通过自然语言与 AI 助手进行对话，描述自己想要的应用功能，AI 将自动生成完整的 Web 应用代码并支持一键部署预览。平台提供了完善的应用管理、案例广场、评论收藏、用户关注等社交化功能，同时为管理员提供审核管理、LLM 调用监控等运维能力。",
    coverImage: "/images/projects/yida_0.png",
    coverImages: [
      "/images/projects/yida_0.png",
      "/images/projects/yida_1.png",
      "/images/projects/yida_2.png",
      "/images/projects/yida_3.png",
      "/images/projects/yida_4.png",
      "/images/projects/yida_5.png",
      "/images/projects/yida_6.png",
      "/images/projects/yida_7.png",
       "/images/projects/yida_8.png",
    ],
    category: "AI提效工具",
    createdAt: "2026-05-15",
    tags: ["Spring Boot 3", "LangChain4j", "ReAct", "自主规划智能体" ,"零代码编程", "易搭", "Yida"],
    tech: "Spring Boot 3 + LangChain4j + ReAct",
    githubUrl: "https://github.com/LoverITer",
    demoUrl: "https://yida.xinxinnote.tech/",
  },
  {
    id: "2064360369920544769",
    title: "智能代码评审助手",
    description: "基于本地大模型的GitLab MR自动审查，数据不外传确保代码安全",
    longDescription: "为解决代码审查效率低、团队规范落地难、新人上手慢等痛点，独立开发了基于本地大模型的智能代码评审助手。系统集成GitLab，通过Webhook自动监听MR事件，基于代码变更Diff进行多维度审查（代码质量、安全漏洞、性能、最佳实践等），并将评论自动写入MR对应行；同时支持代码知识问答，帮助开发者快速理解项目结构和业务逻辑。项目采用本地化部署方案，数据不外传，确保代码安全。技术栈基于Spring AI Alibaba + Ollama + Neo4j + MySQL + Milvus，实现RAG检索增强生成与知识图谱的深度融合。",
    coverImage: "/images/projects/codepal_1.png",
    coverImages: [
      "/images/projects/codepal_1.png",
      "/images/projects/codepal_2.png",
    ],
    category: "AI提效工具",
    createdAt: "2026-01-30",
    tags: ["Spring AI", "Ollama", "Neo4j", "RAG"],
    tech: "Spring AI Alibaba + Ollama + Neo4j + MySQL + Milvus",
    githubUrl: "https://github.com/LoverITer"
  },
  {
    id: "2064360369920544768",
    title: "闲鱼自动回复系统",
    description: "专为闲鱼平台打造的AI值守解决方案，实现7×24小时自动化值守，支持多专家协同决策、智能议价和上下文感知对话。",
    longDescription: "一个功能完整的闲鱼自动回复和管理系统，采用现代化的技术架构，支持多用户、多账号管理，具备智能回复、自动发货、自动确认发货、商品管理等企业级功能。系统基于Python异步编程，使用FastAPI提供RESTful API，SQLite数据库存储，支持Docker一键部署。核心亮点包括：多专家协同决策引擎，根据商品类型和用户意图智能路由至对应专家；上下文感知对话管理，支持多轮对话中保持语义连贯；智能议价策略，基于商品定价和市场行情自动生成合理报价。",
    coverImage: "/images/projects/xianyu_auto_replay_0.png",
    coverImages: [
      "/images/projects/xianyu_auto_replay_0.png",
      "/images/projects/xianyu_auto_replay_1.png",
      "/images/projects/xianyu_auto_replay_2.png",
      "/images/projects/xianyu_auto_replay_3.png",
    ],
    category: "AI提效工具",
    createdAt: "2025-11-20",
    tags: ["Python", "FastAPI", "AI", "Docker"],
    tech: "Python 3 + FastAPI + Vue",
    githubUrl: "https://github.com/LoverITer"
  },
];
