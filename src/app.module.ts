import 'dotenv/config';

import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [ExampleModule],
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASS,
      database: process.env.DB_TEST_NAME,
      synchronize: true,
      logging: true,
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/migration/*.ts'],
      cli: {
        entitiesDir: 'src/**/*.entity.ts',
        migrationsDir: 'src/migration',
      },
    }),
  ],
  providers: [AppService],
})
export class AppTestModule {}
