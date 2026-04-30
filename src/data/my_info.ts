import { CreatorInfo } from "../types/types";

export const creatorInfo: CreatorInfo = {
  name: "黄三金",
  nickname: "Frank",
  avatar: "/images/my.webp",
  bio: "写代码是逻辑的艺术，做产品是平衡的哲学。不追逐潮流，只相信能落地的技术才有价值",
  heroBio: "深耕全栈架构与系统设计5年，同时热衷探索AI提效与变现。在确定性与可能性之间，我选择兼收并蓄。追求逻辑的严谨与技术的温度，平衡代码的确定性与AI的可能性，在技术浪潮里走自己的路。",
  detailedBio: "Hi！我是Frank，一名专注于后端的Java工程师。五年来，我帮助多个项目构建过高并发、高可靠的系统，参与过数据分表、性能调优、架构演进等核心工作。我相信好的代码和好的红烧肉一样，火候到了自然香——持续打磨细节，才能让人放心。工作中，我追求架构的稳定与逻辑的严谨；生活里，我享受烹饪、手工和一切能让人慢下来的事物。一个配方可以反复试验数十次，一段关键代码也值得不断重构。保持好奇，耐心打磨，这就是我的方式。",
  skills: [
    "Java & JVM 调优", "Spring 全家桶", "MySQL & 性能优化", "Redis & 缓存",
    "Kafka/消息队列", "Elasticsearch", "Flink", "Docker & K8s",
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
      { platform: "头条号", url: "https://toutiao.com", label: "访问我的今日头条" },
      { platform: "公众号", url: "https://weixin.qq.com", label: "访问我的微信公众号" }
    ]
  }
};
