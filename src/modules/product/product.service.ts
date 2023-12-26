import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  addProductsDto,
  createBidDto,
  getProductbyIdDto,
  getProductsDto,
} from './product.dto';
import { BiddingEntity, ProductEntity } from 'src/models';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(BiddingEntity)
    private biddingRepo: Repository<BiddingEntity>,
  ) {}

  async addProducts(payload: addProductsDto) {
    return await this.productRepo.save(payload);
  }

  getProducts(payload: getProductsDto) {
    return this.productRepo.find({
      where: {
        ...(payload.brandName && { brandName: Like(`%${payload.brandName}%`) }),
        ...(payload.type && { type: Like(`%${payload.type}%`) }),
        ...(payload.carType && { carType: Like(`%${payload.carType}%`) }),
        ...(payload.modelYear && { modelYear: Like(`%${payload.modelYear}%`) }),
        ...(payload.price && { price: Like(`%${payload.price}%`) }),
      },
    });
  }

  getProductsbyId(payload: getProductbyIdDto) {
    return this.productRepo.find({
      where: {
        id: +payload.id,
      },
    });
  }

  async deleteProduct(payload: { id: number }) {
    return await this.productRepo.delete(payload);
  }

  async createBid(payload: { id: number }, body: createBidDto) {
    body = {
      ...body,
      productId: payload.id,
    };
    return await this.biddingRepo.save(body);
  }

  async getBid(payload: { id: number }) {
    console.log({ payload });
    return await this.biddingRepo.find({
      where: {
        productId: payload.id,
      },
    });
  }
}
