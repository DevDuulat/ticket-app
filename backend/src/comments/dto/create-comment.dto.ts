// dto/create-comment.dto.ts
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @Min(1)
  ticketId: number;
}
