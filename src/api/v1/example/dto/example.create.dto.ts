import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ExampleCreateDto {
  @IsNotEmpty()
  name: string;

  @MaxLength(500)
  @MinLength(5)
  description?: string;
}
