import React from 'react';

export interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  petName: string;
  rating: number;
  avatarUrl: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FirstAidTopic {
  title: string;
  icon: React.ReactNode;
  content: string[];
}

export interface Tip {
  category: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface BlogArticle {
  slug: string;
  category: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type Cuidador = {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  services: string[];
  priceRange: string;
  verified: boolean;
};