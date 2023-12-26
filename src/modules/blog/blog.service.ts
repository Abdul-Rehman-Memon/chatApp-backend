import { Injectable } from '@nestjs/common';
import { ICreateBlog, IGetBlog } from './blog.dto';
import { BlogEntity } from 'src/models';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepo: Repository<BlogEntity>,
  ) {}

  getBlog(payload: IGetBlog) {
    return this.blogRepo.find({
      where: {
        ...(payload?.name && { name: Like(`%${payload.name}%`) }),
        ...(payload?.title && { title: Like(`%${payload.title}%`) }),
      },
    });
  }

  createBlog(payload: ICreateBlog) {
    return this.blogRepo.save(payload);
  }

  getBlogById(payload: { id: number }) {
    return this.blogRepo.findOne({
      where: {
        id: payload.id,
      },
    });
  }
}
