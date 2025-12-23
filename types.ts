
export interface User {
  id: string;
  name: string;
  email: string;
  org: string;
  role: string;
  avatar?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  skills: string[];
  bio: string;
  location: string;
  matchScore?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'Active' | 'Completed';
  requiredSkills: string[];
  brandingUrl?: string;
}

export enum AppTab {
  Auth = 'auth',
  Dashboard = 'dashboard',
  VolunteerMatch = 'volunteer-match',
  GrantReview = 'grant-review',
  ResourceCenter = 'resource-center',
  ImpactModeling = 'impact-modeling',
  AgentWorkshop = 'agent-workshop',
  NexusIntelligence = 'nexus-intelligence'
}
