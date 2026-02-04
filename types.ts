
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export enum AppRoute {
  HOME = '/',
  ABOUT = '/about',
  SERVICES = '/services',
  BOOK = '/book',
  CONTACT = '/contact',
  ASSISTANT = '/assistant'
}
