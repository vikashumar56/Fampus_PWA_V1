import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class RatingCreateDto {
  @IsNumber()
  @IsNotEmpty()
  score: number

  @IsString()
  @IsOptional()
  comment?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  outletId?: string
}

export class RatingUpdateDto {
  @IsNumber()
  @IsOptional()
  score?: number

  @IsString()
  @IsOptional()
  comment?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  outletId?: string
}
