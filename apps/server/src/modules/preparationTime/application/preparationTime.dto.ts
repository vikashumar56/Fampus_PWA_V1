import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PreparationTimeCreateDto {
  @IsNumber()
  @IsNotEmpty()
  timeRequired: number

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  outletId?: string

  @IsString()
  @IsOptional()
  foodItemId?: string
}

export class PreparationTimeUpdateDto {
  @IsNumber()
  @IsOptional()
  timeRequired?: number

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  outletId?: string

  @IsString()
  @IsOptional()
  foodItemId?: string
}
