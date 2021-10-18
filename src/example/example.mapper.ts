import { ExampleDto } from './dto/example.dto';
import { ExampleEntity } from './entity/example.entity';

export const toExampleDto = (data: ExampleEntity): ExampleDto => {
  const { id, name, description } = data;

  return { id, name, description };
};
