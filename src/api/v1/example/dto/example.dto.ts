import { IsNotEmpty } from 'class-validator';

export class ExampleDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  description?: string;
}
