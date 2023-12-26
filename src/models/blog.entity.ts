import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  images: string;

  @Column({
    nullable: false,
    type: 'longtext',
  })
  blog: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
