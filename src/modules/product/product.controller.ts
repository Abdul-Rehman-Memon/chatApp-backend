import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  addProductsDto,
  createBidDto,
  getProductbyIdDto,
  getProductsDto,
} from './product.dto';
import { ProductService } from './product.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addProducts(
    @UploadedFiles() image: any,
    @Body() payload: addProductsDto,
  ) {
    const path = image.map((d) => {
      return d.path;
    });
    JSON.stringify(path);
    payload = {
      ...payload,
      images: path,
    };
    // .map((d)=>{}) })
    return await this.productService.addProducts(payload);
  }

  @Get('/')
  async getProducts(@Query() payload: getProductsDto) {
    return await this.productService.getProducts(payload);
  }

  @Get('/:id')
  async getProductsbyId(@Param() payload: getProductbyIdDto) {
    await this.productService.getProductsbyId(payload);
    return payload;
  }

  @Delete()
  deleteProduct(@Query() payload: { id: number }) {
    return this.productService.deleteProduct(payload);
  }

  //

  @Post('/:id/bid')
  async createBid(
    @Param() payload: { id: number },
    @Body() body: createBidDto,
  ) {
    return await this.productService.createBid(payload, body);
  }

  @Get('/:id/bid')
  async getBid(@Param() payload: { id: number }) {
    return await this.productService.getBid(payload);
  }
}
