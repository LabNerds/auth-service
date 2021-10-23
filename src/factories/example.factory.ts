import { Example } from '@example/entity/example.entity';
import { randomUUID } from 'crypto';
import * as Faker from 'faker';
import { define } from 'typeorm-factories';

define(Example, (faker: typeof Faker) => {
  const example = new Example();
  example.id = randomUUID();
  example.name = faker.name.title();
  example.description = faker.name.title();

  return example;
});
