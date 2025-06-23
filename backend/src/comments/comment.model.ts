// src/comments/comment.model.ts
export interface Comment {
  id: number;
  ticketId: number;
  author: string;
  content: string;
  createdAt: Date;
}
