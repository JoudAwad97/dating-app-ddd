export enum OrderByTypes {
  ASC = 'asc',
  DESC = 'desc',
}

export interface genericOrderBy {
  id?: OrderByTypes;
  createdAt?: OrderByTypes;
  updatedAt?: OrderByTypes;
}
export interface PaginationParams {
  take: number;
  cursor: string | undefined;
  orderBy: genericOrderBy;
}
