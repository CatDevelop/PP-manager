import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
    tags?: number[];
    student_count?: number;
    track?: number;
}
