import { Project, CreatorInfo } from "../types/types";

export const creatorInfo: CreatorInfo = {
  name: "黄鑫",
  nickname: "HX",
  avatar: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_34894f0a-b7bc-4115-86b8-09c18981b600.jpg",
  bio: "5年经验Java资深开发工程师，热衷于构建高性能后端系统。",
  detailedBio: "拥有5年深厚的Java开发背景，精通Spring Cloud微服务架构、并发编程及数据库优化。在繁忙的代码世界之外，我热衷于探索美食的极致味蕾体验，并享受亲手DIY木工与电子产品的创作过程。我追求代码的整洁与生活的质感，相信平衡的艺术能激发无限的创造力。",
  skills: ["Java & JVM 调优", "Spring Cloud 微服务", "Redis & 分布式缓存", "MySQL & 性能优化", "Kubernetes & Docker", "Kafka 消息中间件"],
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
    email: "huangxin.dev@example.com",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com", label: "代码仓库" },
      { platform: "LinkedIn", url: "https://linkedin.com", label: "职业档案" },
      { platform: "Blog", url: "https://blog.huangxin.me", label: "技术博客" }
    ]
  }
};

export const projects: Project[] = [
  {
    id: "1",
    title: "分布式电商秒杀系统",
    description: "基于 Spring Cloud Alibaba 与 Redis 的高并发秒杀解决方案。",
    longDescription: "该项目旨在解决电商平台在促销期间面临的高并发访问压力。通过集成 Spring Cloud Alibaba 体系，实现了服务的治理与限流降级。利用 Redis 的原子性操作进行库存预扣减，配合 RocketMQ 异步处理订单，极大地提升了系统的响应速度与吞吐量。同时，通过多级缓存策略，有效降低了数据库的负载。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_9cd3e6c6-e42a-4cff-8309-80d0ba88eaab.jpg",
    category: "后端开发",
    createdAt: "2024-03-15"
  },
  {
    id: "2",
    title: "云原生监控告警平台",
    description: "基于 Prometheus + Grafana 的全方位集群监控系统。",
    longDescription: "为企业级 Kubernetes 集群定制的监控方案。系统实现了对容器、节点、数据库及应用指标的实时采集与可视化。通过 Alertmanager 实现了多渠道告警（钉钉、邮件、飞书），并在 Grafana 中预置了多套性能看板。该方案显著缩短了线上问题的响应时间，保障了系统的稳定性。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_2af80010-ee73-42f9-9331-cf0eaeec9a42.jpg",
    category: "架构设计",
    createdAt: "2023-11-20"
  },
  {
    id: "3",
    title: "微服务网关安全中心",
    description: "深度定制 Spring Cloud Gateway 实现的流量管控系统。",
    longDescription: "项目在 Spring Cloud Gateway 的基础上，开发了动态路由配置、基于 JWT 的统一身份鉴权、接口防刷以及精细化的流量灰度策略。通过整合 Sentinel 实现了对微服务接口的保护。系统支持通过配置中心实时调整路由与安全规则，无需重启服务。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_243fe47a-8897-45ee-9d43-c657f9e61603.jpg",
    category: "后端开发",
    createdAt: "2024-01-10"
  },
  {
    id: "4",
    title: "自制实木工作台",
    description: "从选材到抛光，亲手打造的极简主义工作空间。",
    longDescription: "这是一次从代码世界回归物理世界的实践。我选用了北美黑胡桃木，采用了传统的榫卯结构进行拼接。整个过程经历了设计图纸、开料、刨削、组装、精细打磨以及最后上木蜡油。这个过程让我体会到了匠人精神中对细节的极致追求。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_7445e11c-e809-432a-94a2-03738989e4b6.jpg",
    category: "DIY创作",
    createdAt: "2023-09-05"
  },
  {
    id: "5",
    title: "智能环境监测仪",
    description: "基于 ESP32 与各类传感器的家用空气质量检测设备。",
    longDescription: "结合了电子设计与嵌入式编程。硬件部分使用了 ESP32 作为主控，集成了 PM2.5、温湿度及 CO2 传感器。软件部分通过 MQTT 协议将数据上传至自建的云平台，并开发了一个简单的 Web 端看板展示实时数据。这充分展示了编程如何服务于日常生活。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_d19f2e01-38b5-4b90-b14a-a3550a6f1e74.jpg",
    category: "DIY创作",
    createdAt: "2023-12-25"
  },
  {
    id: "6",
    title: "川味红烧肉的完美比例",
    description: "探索烹饪中的化学反应与味觉平衡。",
    longDescription: "在做菜中，我也喜欢用工程化的思维。通过数十次的试验，我总结出了红烧肉肥而不腻、入口即化的关键变量：煎炸的时间、糖色的比例以及小火慢炖的恒温控制。烹饪与编程一样，都是关于逻辑与艺术的结合。",
    coverImage: "https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_e109cde7-0579-4445-932a-2114abf5c33d.jpg",
    category: "美食探索",
    createdAt: "2024-02-01"
  }
];
