import { Project, CreatorInfo } from "../types/types";

export const creatorInfo: CreatorInfo = {
  name: "黄鑫",
  nickname: "Frank",
  avatar: "/images/my.webp",
  bio: "爱琢磨也爱生活。相信好的代码和好的红烧肉一样，火候到了自然香。",
  detailedBio: "拥有5年深厚的Java开发背景，精通Spring Cloud微服务架构、并发编程及数据库优化。在繁忙的代码世界之外，我热衷于探索AIGC的无限可能，享受技术带来的创造力。我追求代码的整洁与生活的质感，相信平衡的艺术能激发无限的想象力。",
  skills: [
                "Java & JVM 调优", "Spring 全家桶", "MySQL & 性能优化", "Redis & 缓存",
                "Kafka & 消息队列", "Elasticsearch", "Flink", "Docker & K8s",
                "Spring AI", "Ollama", "Vue.js & React", "Python Web开发"
              ],
  hobbies: [
    {
      title: "美食探索",
      description: "从街头小吃到精致料理，记录每一次味觉的旅行。",
      image: "https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_e109cde7-0579-4445-932a-2114abf5c33d.jpg"
    },
    {
      title: "手工DIY",
      description: "将木材与电子元件结合，亲手打造独一无二的作品。",
      image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_7445e11c-e809-432a-94a2-03738989e4b6.jpg"
    }
  ],
  contact: {
    email: "huangxin981230@163.com",
    phone: "+86 18805691256",
    wechat: "hx95152437",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/LoverITer", label: "访问我的GitHub仓库" },
      { platform: "头条", url: "https://toutiao.com", label: "访问我的今日头条" },
      { platform: "公众号", url: "https://weixin.qq.com", label: "访问我的微信公众号" }
    ]
  }
};

export const projects: Project[] = [
  {
    id: "69dcb5c6000000001a02c759",
    title: "基于LLM的智能代码评审助手-CodePal",
    description: "基于开源大模型 + 知识库的 Code Review 实践，类似一个代码评审助手（CR Copilot）",
    longDescription: "为解决代码审查效率低、团队规范落地难、新人上手慢等痛点，独立开发了基于本地大模型的智能代码评审助手。系统集成GitLab，通过Webhook自动监听MR事件，基于代码变更Diff进行多维度审查（代码质量、安全漏洞、性能、最佳实践等），并将评论自动写入MR对应行；同时支持代码知识问答，帮助开发者快速理解项目结构和业务逻辑。项目采用本地化部署方案，数据不外传，确保代码安全。",
    coverImage: "/images/projects/codepal_1.png",
    coverImages: [
      "/images/projects/codepal_1.png",
      "/images/projects/codepal_2.png"
    ],
    category: "AI提效工具",
    createdAt: "2026-01-30",
    labels: ["LLM", "Code Review", "智能代码评审助手"],
    url: "http://8.163.27.90/login"
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
      "/images/projects/xianyu_auto_replay_3.png"
    ],
    category: "AI提效工具",
    createdAt: "2025-11-20"
    // url: "https://github.com/LoverITer/xianyu-auto-reply"
  }
];
