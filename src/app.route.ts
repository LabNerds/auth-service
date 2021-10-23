import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { ExampleModule } from '@root/api/v1/example/example.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'v1',
            children: [
              {
                path: 'examples',
                module: ExampleModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class AppRouter {}
