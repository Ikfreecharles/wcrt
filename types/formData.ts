import { DocumentFragment } from 'lib/graphql';

export type FeedbackFormData = {
  text: string;
};

export type CommentFormData = {
  text: string;
};

export type ImpulseFormData = {
  title: string;
  intro: string;
  images: DocumentFragment[];
  locations: string[];
  categories: string[];
  hasSolution: boolean;
  solution?: string;
};

export type ArticleFormData = {
  title: string;
  intro: string;
  text: string;
  images: DocumentFragment[];
  locations: string[];
  categories: string[];
};

export type AccountContactFormData = {
  email: string;
  currentPassword: string;
};

export type AccountPasswordFormData = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

export type ProfileFormData = {
  name: string;
  info: string;
  intro: string;
  image: DocumentFragment | null;
  locations: string[];
};

export type GroupFormData = {
  name: string;
  info: string;
  image: DocumentFragment | null;
  intro: string;
  contactInfo: string;
  categories: string[];
  locations: string[];
};

export type MembershipRequestFormData = {
  text: string;
};

export type TaskFormData = {
  title: string;
  completed: boolean;
};
