import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ICreateBlog, IGetBlog } from './blog.dto';
import { BlogService } from './blog.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/')
  get(@Query() payload: IGetBlog) {
    return this.blogService.getBlog(payload);
  }

  @Get('/:id')
  getBlogById(@Param() payload: { id: number }) {
    return this.blogService.getBlogById(payload);
  }

  @Post('/')
  @UseInterceptors(FilesInterceptor('images',10,{
    storage:diskStorage({
      destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
    })
  }))
  create(@UploadedFiles() image: any, @Body() payload: ICreateBlog) {
    
    const path =image.map((d)=>{
      return d.path
    })
    JSON.stringify(path)
    payload = {
      ...payload,
      images:path
    }
    
    return this.blogService.createBlog(payload);
  }
}
