
type Order = {
  field: string;
  type: "desc" | "asc"
}

type SingleWhere<T> = {
  field: string;
  operation: "eq" | "neq" | "like" | "gt" | "gte" | "lt" | "lte";
  value: T;
}

type MultiWhere<T> = {
  field: string;
  operation: "in";
  value: T[]
}

export type Where<T> = SingleWhere<T> | MultiWhere<T>;

export type Filter = {
  order?: Order[];
  limit?: number;
  offset?: number;
  where?: Where<any>[];
}

type FilterBuilder = {
  order: (order: Order | Order[]) => FilterBuilder;
  limit: (v: number) => FilterBuilder;
  offset: (v: number) => FilterBuilder;
  where: (where: Where<any> | Where<any>[]) => FilterBuilder;
  build: () => Filter
}
const internalFilter = (oldValue?: Filter): FilterBuilder => {
  const value = oldValue ?? {} as Filter;
  return {
    order: (order: Order | Order[]): FilterBuilder => {
      const isValidOrder = (o: Order) => ["desc", "asc"].includes(o.type);
      const orders = Array.isArray(order) ? order : [order];
      for (const o of orders) {
        if (!isValidOrder(o)) throw new Error(`Invalid order type: ${o.type}`);
      }
      value.order = [...(value.order || []), ...orders];
      return internalFilter(value);
    },
    limit: (v: number): FilterBuilder => {
      if (v < 0) throw new Error("Limit must be non-negative");
      value.limit = v;
      return internalFilter(value);
    },
    offset: (v: number): FilterBuilder => {
      if (v < 0) throw new Error("Offset must be non-negative");
      value.offset = v;
      return internalFilter(value);
    },
    where: (where: Where<any> | Where<any>[]): FilterBuilder => {
      value.where = [...(value.where || []), ...Array.isArray(where) ? where : [where]];
      return internalFilter(value);
    },
    build: (): Filter => value
  }
}

export const filter = () => internalFilter();