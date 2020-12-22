import { Allow, IsJSON, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalendarQueryDto {
  @ApiProperty()
  @Allow()
  @IsOptional()
  start: Date;

  @ApiProperty()
  @Allow()
  @IsOptional()
  end: Date;

  @ApiProperty()
  @Allow()
  @IsJSON()
  @IsOptional()
  filter?: string;
}
