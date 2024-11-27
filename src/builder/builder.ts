import { RequestBuilder } from '../request';

export abstract class Builder<T = any> {
  protected abstract _value?: T;

  constructor(protected _parent: RequestBuilder) { }
  get value() { return this._value }
  run() { return this._parent.run() }
}