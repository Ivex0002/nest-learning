import { IsEnum, IsNotEmpty } from 'class-validator';

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

/**
 * 강의에서는 Controller 측에서 유효성 검증 패턴을 보여줬으나
 * patch, post에서의 재활용을 목적으로 보드 객체 자체에서 검증토록 변경
 */
export class Board {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(BoardStatus)
  status: BoardStatus;
}
