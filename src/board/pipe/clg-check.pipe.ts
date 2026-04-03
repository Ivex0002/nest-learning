import {
  ArgumentMetadata,
  // BadRequestException,
  PipeTransform,
} from '@nestjs/common';
// import { BoardStatus } from '../board.model';

export class ClgCheckPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log({ value });
    console.log({ metadata });

    return value;
  }
}

// /**
//  * 강의에서 한 것
//  * 현 프로젝트는 isEnum으로 status 유효성 검사 중
//  */
// export class BoardStatusValidationPipe implements PipeTransform {
//   readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

//   private isStatusValid(status: string): boolean {
//     return this.StatusOptions.includes(status as BoardStatus);
//   }

//   transform(value: string) {
//     value = value.toUpperCase();
//     if (!this.isStatusValid(value)) {
//       throw new BadRequestException(`${value} is invalid`);
//     }
//     return value;
//   }
// }
