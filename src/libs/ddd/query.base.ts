import { OrderBy, PaginatedQueryParams } from '../ports/repository.port';

/**
 * Base class for regular queries
 */
export abstract class QueryBase {}

/**
 * Base class for paginated queries
 */
export abstract class PaginatedQueryBase extends QueryBase {
  limit: number;
  orderBy: OrderBy;
  cursor: string;

  constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super();
    this.limit = props.limit || 20;
    this.cursor = props.cursor || undefined;
    this.orderBy = props.orderBy || { field: 'id', param: 'desc' };
  }
}

// Paginated query parameters
export type PaginatedParams<T> = Omit<T, 'limit' | 'orderBy' | 'page'> &
  Partial<PaginatedQueryParams>;
