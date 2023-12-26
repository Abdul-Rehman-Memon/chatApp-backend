import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BiddingEntity } from './bidding.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  modelYear: string;

  @Column({ type: 'varchar' })
  brandName: string;

  @Column({ type: 'varchar' })
  carType: string;

  @Column({ type: 'varchar' })
  new: string;

  @Column({ type: 'varchar' })
  price: string;

  @Column({ type: 'varchar' })
  images: string;

  @Column({ type: 'varchar' })
  mileage: string;

  @Column({ type: 'varchar' })
  exterior: string;

  @Column({ type: 'varchar' })
  interior: string;

  @Column({ type: 'varchar' })
  accidented: string;

  @Column({ type: 'varchar' })
  productId: string;

  @Column({ type: 'varchar' })
  type: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => BiddingEntity, (data) => data.productEntity)
  biddingEntity: BiddingEntity;
}
