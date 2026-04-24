import type { Project } from "../types/types";

export const projects: Project[] = [
  {
    id: "69dcb5c6000000001a02c759",
    title: "基于LLM的智能代码评审助手-CodePal",
    description: "基于开源大模型 + 知识库的 Code Review 实践，类似一个代码评审助手（CR Copilot）",
    longDescription: "为解决代码审查效率低、团队规范落地难、新人上手慢等痛点，独立开发了基于本地大模型的智能代码评审助手。系统集成GitLab，通过Webhook自动监听MR事件，基于代码变更Diff进行多维度审查（代码质量、安全漏洞、性能、最佳实践等），并将评论自动写入MR对应行；同时支持代码知识问答，帮助开发者快速理解项目结构和业务逻辑。项目采用本地化部署方案，数据不外传，确保代码安全。",
    coverImage: "/images/projects/codepal_1.png",
    coverImages: [
      "/images/projects/codepal_1.png",
      "/images/projects/codepal_2.png",
    ],
    category: "AI提效工具",
    createdAt: "2026-01-30",
    tags: ["LLM", "Code Review", "RAG", "知识图谱"],
    tech: "Spring AI Alibaba + Ollama + Neo4j + MySQL + Milvus",
    url: "http://8.163.27.90/login",
  },
  {
    id: "7e3a9f2c1d8b4e5f6a0b3c8d",
    title: "闲鱼自动回复系统",
    description: "专为闲鱼平台打造的AI值守解决方案，实现闲鱼平台7×24小时自动化值守，支持多专家协同决策、智能议价和上下文感知对话。",
    longDescription: "一个功能完整的闲鱼自动回复和管理系统，采用现代化的技术架构，支持多用户、多账号管理，具备智能回复、自动发货、自动确认发货、商品管理等企业级功能。系统基于Python异步编程，使用FastAPI提供RESTful API，SQLite数据库存储，支持Docker一键部署。",
    coverImage: "/images/projects/xianyu_auto_replay_0.png",
    coverImages: [
      "/images/projects/xianyu_auto_replay_0.png",
      "/images/projects/xianyu_auto_replay_1.png",
      "/images/projects/xianyu_auto_replay_2.png",
      "/images/projects/xianyu_auto_replay_3.png",
    ],
    category: "AI提效工具",
    createdAt: "2025-11-20",
    tags: ["LLM", "自动回复", "智能客服", "订单管理", "数据分析"],
    tech: "Python 3 + FastAPI  + Vue",
  },
  {
    id: "a1b2c3d4e5f6789012345678",
    title: "营销自动化系统 (MA)",
    description: "事件驱动架构，集群吞吐量提升40%，任务失败率下降70%",
    longDescription: "基于事件驱动架构的营销自动化平台，整合多渠道触达能力，支持用户行为追踪、自动化营销流程编排和实时效果分析。通过Kafka实现高并发事件处理，Redis缓存热点数据，集群吞吐量提升40%，任务失败率下降70%。",
    coverImage: "/images/projects/ma_system.png",
    category: "后端架构",
    createdAt: "2024-06-15",
    tags: ["营销自动化", "事件驱动", "高并发", "Kafka", "Redis"],
    tech: "Spring Boot & Cloud + Kafka + Redis + MySQL + Aviator",
  },
];
