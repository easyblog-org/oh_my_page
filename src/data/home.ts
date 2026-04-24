import { projects } from "./projects";
import {creatorInfo} from "./my_info";

export const heroTexts = [
  `你好，我是 ${creatorInfo.nickname}`,
  "专业全栈开发者",
  "能够帮您把有趣想法落地为可靠系统",
  "欢迎沟通！",
];

export const codeKeywords = [
  "@Service",
  "@RestController",
  "ApplicationContext",
  "Stream",
  "CompletableFuture",
  "@Autowired",
  "Optional",
  "Mono",
  "Flux",
  "@Transactional",
  "Repository",
  "Component",
];

export const featuredProjects = projects.map((p) => ({
  title: p.title,
  description: p.description,
  tags: p.tags ??  [],
  year: p.createdAt.slice(0, 4),
  tech: p.tech ?? "",
}));
