import { ExampleDto } from './dto/example.dto';
import { Example } from './entity/example.entity';

export const toExampleDto = (data: Example): ExampleDto => {
  const { id, name, description } = data;

  return { id, name, description };
};
