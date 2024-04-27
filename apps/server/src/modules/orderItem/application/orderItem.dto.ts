import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class OrderItemCreateDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number

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
  orderId?: string

  @IsString()
  @IsOptional()
  foodItemId?: string
}

export class OrderItemUpdateDto {
  @IsNumber()
  @IsOptional()
  quantity?: number

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
  orderId?: string

  @IsString()
  @IsOptional()
  foodItemId?: string
}
