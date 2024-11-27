import { FilterBuilder } from '../src/builder';
import { GetRequest } from '../src/request';

describe("FilterBuilder", () => {
  let filterBuilder: FilterBuilder;

  beforeEach(() => {
    const query = new GetRequest({} as any); // Mock HttpClient
    filterBuilder = new FilterBuilder(query);
  });

  test("Adds order filter correctly", () => {
    filterBuilder.order({ field: "name", type: "asc" });
    filterBuilder.order({ field: "age", type: "desc" });

    expect(filterBuilder!.value!.order).toEqual([
      { field: "name", type: "asc" },
      { field: "age", type: "desc" },
    ]);
  });

  test("Sets limit and offset correctly", () => {
    filterBuilder.limit(10).offset(5);

    expect(filterBuilder!.value!.limit).toBe(10);
    expect(filterBuilder!.value!.offset).toBe(5);
  });

  test("Adds where conditions correctly", () => {
    filterBuilder.where({ field: "name", operation: "eq", value: "John" });
    filterBuilder.where({ field: "age", operation: "gte", value: 30 });

    expect(filterBuilder!.value!.where).toEqual([
      { field: "name", operation: "eq", value: "John" },
      { field: "age", operation: "gte", value: 30 },
    ]);
  });
});
