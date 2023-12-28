import { Paginated } from '@src/libs/ports/repository.port';

export abstract class PaginatedResponseDto<T> extends Paginated<T> {
  readonly count: number;

  readonly limit: number;

  readonly cursor: string;

  abstract readonly data: readonly T[];
}
