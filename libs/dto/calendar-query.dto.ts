import { Allow, IsJSON, IsOptional } from 'class-validator';

export class CalendarQueryDto {
  @Allow()
  @IsOptional()
  start: Date;

  @Allow()
  @IsOptional()
  end: Date;

  @Allow()
  @IsJSON()
  @IsOptional()
  filter?: string;
}
