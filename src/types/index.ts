
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface EnvironmentalData {
  id: string;
  type: 'air' | 'water' | 'temperature';
  value: number;
  unit: string;
  location: string;
  timestamp: string;
  status: 'good' | 'moderate' | 'poor' | 'hazardous';
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: ForumComment[];
  tags: string[];
}

export interface ForumComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  postId: string;
}
