import { Allow, IsJSON, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalendarQueryDto {
  @ApiProperty({ type: Date })
  @Allow()
  @IsOptional()
  start: Date;

  @ApiProperty({ type: Date })
  @Allow()
  @IsOptional()
  end: Date;

  @ApiProperty({ type: String })
  @Allow()
  @IsJSON()
  @IsOptional()
  filter?: string;
}
