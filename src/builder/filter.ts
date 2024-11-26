import { Query } from '../query';
import { Builder } from './builder';

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
  constructor(_parent: Query) { super(_parent) }

  order(order: Order | Order[]): this {
    if (Array.isArray(order)) {
      this._value.order?.push(...order)
    } else {
      this._value.order?.push(order)
    }
    return this;
  }

  limit(v: number): this {
    this._value.limit = v;
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