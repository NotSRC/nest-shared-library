import { Allow, IsEnum, IsJSON, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export class QueryDto {
  @ApiProperty()
  @Allow()
  @Min(1)
  @IsOptional()
  @Transform((value) => parseInt(value || 1, 10))
  page?: number = 1;

  @ApiProperty()
  @Allow()
  @Max(99)
  @Min(1)
  @IsOptional()
  @Transform((value) => parseInt(value || 10, 10))
  limit?: number = 25;

  @ApiProperty()
  @Allow()
  @IsJSON()
  @IsOptional()
  filter?: string;

  @ApiProperty()
  @Allow()
  private sortField: string = 'createdAt';

  @ApiProperty()
  @Allow()
  @IsEnum(SortDirection, { each: true })
  private sortDirection: SortDirection = SortDirection.Asc;

  getSort?() {
    return {
      [this.sortField]: this.sortDirection === SortDirection.Asc ? 1 : -1,
    };
  }
}
