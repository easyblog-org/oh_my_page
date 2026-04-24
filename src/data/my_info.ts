import { CreatorInfo } from "../types/types";

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
      { platform: "头条号", url: "https://toutiao.com", label: "访问我的今日头条" },
      { platform: "公众号", url: "https://weixin.qq.com", label: "访问我的微信公众号" }
    ]
  }
};
