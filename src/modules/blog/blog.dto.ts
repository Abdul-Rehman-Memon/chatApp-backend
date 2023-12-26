import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ICreateBlog {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  blog: string;

  @IsString()
  @IsOptional()
  images:string
  
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class IGetBlog {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  blog: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsDate()
  @IsOptional()
  date: Date;
}
