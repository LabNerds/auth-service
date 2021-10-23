import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('example')
export class Example {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'text', nullable: false }) description?: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;
}
