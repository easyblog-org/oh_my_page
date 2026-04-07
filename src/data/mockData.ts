import { Project, CreatorInfo } from "../types/types";

export const creatorInfo: CreatorInfo = {
  name: "张明远",
  nickname: "Ming",
  avatar: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_29e0d3ba-d954-4c90-8ca2-abccccbac308.jpg",
  bio: "多领域设计师与开发者，专注于创造极致的用户体验与视觉美学。",
  detailedBio: "作为一名拥有 5 年经验的设计师与开发者，我深信好的设计应当是功能与美学的完美结合。我擅长从概念构思到最终实现的完整流程，并在摄影、UI/UX 设计、前端开发等多个领域有着深入探索。我追求极致的细节，致力于为用户提供简洁、直观且富有感染力的数字化产品。",
  skills: ["UI/UX 设计", "前端开发 (React/Next.js)", "商业摄影", "品牌视觉识别", "交互动效设计", "三维建模与渲染"],
  contact: {
    email: "mingyuan.zhang@example.com",
    socialLinks: [
      { platform: "Behance", url: "https://behance.net", label: "作品展示" },
      { platform: "GitHub", url: "https://github.com", label: "代码仓库" },
      { platform: "Instagram", url: "https://instagram.com", label: "生活影像" }
    ]
  }
};

export const projects: Project[] = [
  {
    id: "1",
    title: "光影之境 - 极简主义摄影集",
    description: "探索城市建筑中的几何美学与自然光影的碰撞。",
    longDescription: "本系列摄影作品捕捉了现代建筑在特定光影条件下的极简几何结构。通过黑白影调的控制，剥离了色彩的干扰，使观众更专注于线条、形体与光线的纯粹交互。这是一场关于空间、时间与光线的静谧对话。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_94506424-31f6-4adf-bde2-cabd38288f69.jpg",
    category: "摄影",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Flow - 智能理财应用 UI 设计",
    description: "为新一代年轻用户打造的简洁直观的财务管理工具。",
    longDescription: "Flow 是一款旨在简化个人财务管理的移动端应用。在设计过程中，我优先考虑了信息层级的清晰度与操作的流畅性。通过模块化的设计系统，确保了应用在不同屏幕上的适配性。同时，引入了轻量级的动效，增强了交互反馈的趣味性。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_bb179aa5-a4f5-4fcb-9e12-5de2cc229e5b.jpg",
    category: "设计",
    createdAt: "2023-11-20"
  },
  {
    id: "3",
    title: "Nebula - 响应式企业官网开发",
    description: "基于 React 与 Tailwind CSS 构建的高性能企业门户。",
    longDescription: "Nebula 是为一家科技初创公司量身定制的响应式官网。项目采用了 React 框架与 Tailwind CSS 样式库，实现了极速的加载性能与极致的响应式体验。核心难点在于复杂背景动效的实现，通过 Three.js 成功打造了具有未来感的视觉效果。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_243fe47a-8897-45ee-9d43-c657f9e61603.jpg",
    category: "代码",
    createdAt: "2024-02-10"
  },
  {
    id: "4",
    title: "静默之美 - 品牌视觉系统",
    description: "为高端家居品牌定制的极简主义视觉识别系统。",
    longDescription: "该项目包含品牌 Logo 设计、字体排版规范、色彩体系以及全套办公用品设计。设计的核心关键词是‘克制’与‘持久’。我们选用了一种低饱和度的配色方案，配合优雅的衬线字体，传递出品牌对品质生活的独特见解。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_3e825b6b-6ed5-4693-8344-e930cfe3615b.jpg",
    category: "设计",
    createdAt: "2023-09-05"
  },
  {
    id: "5",
    title: "城市脉动 - 街头纪实摄影",
    description: "记录夜色下流动的城市色彩与人文情感。",
    longDescription: "这组纪实摄影作品走进了深夜的街道，捕捉了霓虹灯光映衬下的城市百态。从忙碌的便利店到寂静的车站，每张图片背后都隐藏着一段鲜活的人间故事。通过慢速快门的运用，表现出时间的流动感。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_71335a9a-39f7-4d79-bc8f-d6c6e7c5f74d.jpg",
    category: "摄影",
    createdAt: "2023-12-25"
  },
  {
    id: "6",
    title: "Insight - 数据可视化仪表盘",
    description: "将复杂的大数据转化为易于理解的可视化图表。",
    longDescription: "Insight 仪表盘旨在帮助决策者快速洞察核心业务指标。我通过对 D3.js 的深度运用，设计并实现了一系列交互式图表。用户可以通过缩放、筛选、切片等操作，从不同维度探索数据。设计风格保持了专业且严谨的画廊风格。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_2af80010-ee73-42f9-9331-cf0eaeec9a42.jpg",
    category: "代码",
    createdAt: "2024-03-01"
  }
];
