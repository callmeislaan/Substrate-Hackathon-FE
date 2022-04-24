export type Comment = {
  fullName: string;
  avatar: string;
  content: string;
  rating: number;
  createdDate: string;
} | null;

export type Comments = Comment[] | null;
