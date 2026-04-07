import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: '首页',
    path: '/',
    element: <HomePage />,
    public: true,
  },
  {
    name: '作品列表',
    path: '/projects',
    element: <ProjectsPage />,
    public: true,
  },
  {
    name: '作品详情',
    path: '/projects/:id',
    element: <ProjectDetailPage />,
    public: true,
  },
  {
    name: '关于我',
    path: '/about',
    element: <AboutPage />,
    public: true,
  },
  {
    name: '联系',
    path: '/contact',
    element: <ContactPage />,
    public: true,
  }
];

export default routes;
