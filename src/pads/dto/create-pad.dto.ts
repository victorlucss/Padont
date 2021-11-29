import { IsString } from 'class-validator';

export class CreatePadDto {
  @IsString()
  readonly content: string;
}
