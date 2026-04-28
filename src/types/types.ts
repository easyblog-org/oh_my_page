export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  coverImage: string;
  coverImages?: string[];
  category: string;
  createdAt: string;
  tags?: string[];
  tech?: string;
  url?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface Hobby {
  title: string;
  description: string;
  image: string;
}

export interface NavItem {
  name: string;
  anchor: string;
}

export interface CreatorInfo {
  name: string;
  nickname: string;
  avatar: string;
  bio: string;
  detailedBio: string;
  skills: string[];
  hobbies?: Hobby[];
  contact: {
    email: string;
    phone: string;
    wechat: string;
    socialLinks: {
      platform: string;
      url: string;
      label: string;
    }[];
  };
}
