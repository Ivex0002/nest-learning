import { PartialType } from '@nestjs/mapped-types';
import { BoardValidate } from '../board.model';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 단순 crud 객체에는 과한 관리 (no flat)
 *
 * 이후 board 뿐만 아니라 meta, user 등의 속성도 함께 묶기 위해 확장 설계함
 *
 * - ValidateNested + Type
 *    - board 내부 객체까지 validation 수행
 *    - transform: true 적용 시 BoardPayload 인스턴스로 변환 보장
 */
export class CreateBoardDto {
  @ValidateNested()
  @Type(() => BoardValidate)
  board: BoardValidate;
}

/**
 * 업데이트용 페이로드 객체
 *
 * CreateBoardDto 와 같은 로직(Partial)
 */
class UpdateBoardPayload extends PartialType(BoardValidate) {}

export class UpdateBoardDto {
  @ValidateNested()
  @Type(() => UpdateBoardPayload)
  board?: UpdateBoardPayload;
}
