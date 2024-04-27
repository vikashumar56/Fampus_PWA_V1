import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class OutletCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsNumber()
  @IsOptional()
  orderDelayTimer?: number

  @IsString()
  @IsOptional()
  paymentQrCode?: string

  @IsString()
  @IsOptional()
  profilePhotoUrl?: string

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
  ownerId?: string
}

export class OutletUpdateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsNumber()
  @IsOptional()
  orderDelayTimer?: number

  @IsString()
  @IsOptional()
  paymentQrCode?: string

  @IsString()
  @IsOptional()
  profilePhotoUrl?: string

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
  ownerId?: string
}
