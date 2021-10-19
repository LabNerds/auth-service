import { MaxLength } from 'class-validator';

export class ExampleUpdateDto {
  @MaxLength(500)
  description?: string;
}
