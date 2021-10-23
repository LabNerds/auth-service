import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { FactoryModule } from 'typeorm-factories';

import { AppRouter } from './app.route';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from '@root/api/v1/example/example.module';

@Module({
  imports: [ExampleModule, AppRouter],
})
class MainAppModule {}

@Module({})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [MainAppModule, TypeOrmModule.forRoot(connOptions)],
      providers: [AppService],
    };
  }
}

@Module({
  controllers: [AppController],
  imports: [
    MainAppModule,
    FactoryModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'sqlite',
      database: ':memory:',
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/migrations/*.ts'],
      cli: {
        entitiesDir: 'src/**/*.entity.ts',
        migrationsDir: 'src/migration',
      },
      dropSchema: true,
      synchronize: true,
    }),
  ],
  providers: [AppService],
})
export class AppTestModule {}
