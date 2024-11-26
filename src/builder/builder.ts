import { Query } from "../query";

export abstract class Builder<T = any> {
  protected abstract _value: T;

  constructor(protected _parent: Query) {}

  getValue() { return this._value }
  back() { return this._parent }
}