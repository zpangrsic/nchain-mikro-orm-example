import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TagAllQueryDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ default: false })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  deleted: boolean = false;

  @IsOptional()
  @IsString()
  @ApiProperty({
    nullable: true,
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.replaceAll(' ', '-').toLowerCase();
    }
    return value;
  })
  name?: string;
}
