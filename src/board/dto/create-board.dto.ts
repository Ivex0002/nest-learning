import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Board } from '../board.model';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 기존 보드에서 id 값을 제외한 나머지 요소
 * 이후 보드에 속성 추가시 추가 수정 불필요
 */
class BoardPayload extends OmitType(Board, ['id'] as const) {}

/**
 * 단순 crud 객체에는 과한 관리 (no flat)
 * 이후 board 뿐만 아니라 meta, user 등의 속성도 함께 묶기 위해 확장 설계함
 */
export class CreateBoardDto {
  @ValidateNested()
  @Type(() => BoardPayload)
  board: BoardPayload;
}

/**
 * 업데이트용 페이로드 객체(Partial)
 */
class UpdateBoardPayload extends PartialType(BoardPayload) {}

export class UpdateBoardDto {
  @ValidateNested()
  @Type(() => UpdateBoardPayload)
  board?: UpdateBoardPayload;
}
