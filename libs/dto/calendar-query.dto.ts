import { Allow, IsJSON, IsOptional } from 'class-validator';

export class CalendarQueryDto {
  @Allow()
  @IsOptional()
  start: string;

  @Allow()
  @IsOptional()
  end: string;

  @Allow()
  @IsJSON()
  @IsOptional()
  filter?: string;
}
