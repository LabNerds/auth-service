import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('example')
export class ExampleEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;
}
