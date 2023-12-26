import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'bidding' })
export class BiddingEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  price: string;

  @Column({
    type: 'longtext',
    nullable: false,
  })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  productId: number;

  @OneToMany(() => ProductEntity, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  productEntity: ProductEntity;

  //   @OneToMany(() => ProductEntity, (product) => product.bidding) )
  //   bidding: BiddingEntity[];
}
