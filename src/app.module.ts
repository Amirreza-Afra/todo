import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todolist } from './todo/entities/todo.entities';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Amirreza.1381711',
    database: 'nestdb',
    entities: [Todolist],
    synchronize: true,
  }), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
