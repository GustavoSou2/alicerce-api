import { PartialType } from '@nestjs/mapped-types';
import { CreateSubItemDto } from './create-sub_item.dto';

export class UpdateSubItemDto extends PartialType(CreateSubItemDto) {}
