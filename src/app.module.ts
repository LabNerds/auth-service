import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { FactoryModule } from 'typeorm-factories';

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
  imports: [MainAppModule, FactoryModule, TypeOrmModule.forRoot()],
  providers: [AppService],
})
export class AppTestModule {}
