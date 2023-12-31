import { PaginatedQueryRequestDto } from '../api/request/paginated-query.request.dto';
import { IPaginatedType } from '../api/response/paginated/paginated.graphql-response.base';
import { ResponseBase } from '../api/response/response.base';

type GetQueryArgs = {
  take: number;
  cursor: string | undefined;
};

type CursorSourceData = {
  id: string;
};

class PaginationUtils {
  buildPaginationOutputGenerator<T extends ResponseBase>(
    data: T[],
    cursorSourceData: CursorSourceData[],
    count: number,
    { take }: PaginatedQueryRequestDto,
  ): IPaginatedType<T> {
    // Figure out if the user is paginating forwards or backwards
    const isBackward = take < 0;

    // We always fetch one more item than what is specified in `take`. If that item exists
    // that means there is at least one more page of data.
    const hasNextItem = data.length > Math.abs(take);

    // `data` is the next set of data that we want to send back to the user.
    //
    // We use `dataStart` to remove the extra element we're fetching (see `hasNextItem` above)
    // to make sure we send back the next page without that additional element.
    //
    // Note: The reason that our `items.slice` is dynamic is because depending which way we
    //       are paginating will change if the extra item is the first element in the array
    //       (paginating backwards) or the last element in the array (paginating forwards).
    const dataStart = isBackward && hasNextItem ? 1 : 0;
    const items = data.slice(dataStart, dataStart + Math.abs(take));
    // if we are using only the "data" for pagination, we can ignore the following code
    cursorSourceData = cursorSourceData.slice(
      dataStart,
      dataStart + Math.abs(take),
    );

    // Get the first and last items in the set so we can provide the start/end cursors
    // to the client and allow them to easily move forwards/backwards through the list.
    // const firstNode = cursorBuilderData[0];
    // if we are using the "items" array instead of the cursorSourceData array, we can use the following code
    // const lastNode = data[data.length - 1];
    const lastNode = cursorSourceData[cursorSourceData.length - 1];

    return {
      data: items,
      pageInfo: {
        hasNextPage: hasNextItem,
        count: count,
        cursor: lastNode ? this.createCursor(lastNode.id) : null,
        take,
      },
    };
  }

  getQueryArgs(input: PaginatedQueryRequestDto): GetQueryArgs {
    // Get the cursor, if there is one, out of the args
    const id = this.parseCursor(input.cursor || null);

    // We will always try to fetch one extra item. We will check its existence and use
    // that to determine if there is a next page. In order to paginate backwards we will
    // pass in a negative `take`. "Fetch -10 items before my cursor" means fetch the 10 items
    // before my cursor.
    //
    // We add one if we are paginating forwards and subtract one if we are paginating backwards.
    // Replace "10" with "11" in my abvove written example.
    const takeAdjustment = input.take < 0 ? -1 : 1;

    // If there is no cursor we only need to specify a take.
    if (!id) {
      return {
        cursor: undefined,
        take: input.take + takeAdjustment,
      };
    }

    return {
      cursor: id,
      take: input.take + takeAdjustment,
    };
  }

  private createCursor(cursor: any) {
    return Buffer.from(JSON.stringify(cursor)).toString('base64');
  }

  parseCursor(cursor: string | null): string | undefined {
    if (!cursor) {
      return undefined;
    }

    return JSON.parse(Buffer.from(cursor, 'base64').toString('ascii'));
  }
}

export default new PaginationUtils();
