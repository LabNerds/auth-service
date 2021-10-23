import { MaxLength, MinLength } from 'class-validator';

export class ExampleUpdateDto {
  @MaxLength(500)
  @MinLength(5)
  description?: string;
}
