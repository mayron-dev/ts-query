import { RequestBuilder } from '../request';
import { Builder } from './';

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

export class FilterBuilder extends Builder<Filter> {
  override _value: Filter = { limit: 0, offset: 0, order: [], where: [] };
  constructor(_parent: RequestBuilder) { super(_parent) }

  limit(v: number): this {
    if (v < 0) throw new Error("Limit must be non-negative");
    this._value.limit = v;
    return this;
  }

  order(order: Order | Order[]): this {
    const isValidOrder = (o: Order) => ["desc", "asc"].includes(o.type);
    const orders = Array.isArray(order) ? order : [order];
    for (const o of orders) {
      if (!isValidOrder(o)) throw new Error(`Invalid order type: ${o.type}`);
    }
    this._value.order = [...(this._value.order || []), ...orders];
    return this;
  }


  offset(v: number): this {
    this._value.offset = v;
    return this;
  }

  where<T = any>(where: Where<T> | Where<T>[]): this {
    if (Array.isArray(where)) {
      this._value.where?.push(...where);
    } else {
      this._value.where?.push(where);
    }
    return this;
  }
}
