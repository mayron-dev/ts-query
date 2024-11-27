import { RequestBuilder } from '../request';
import { Builder } from './';

export type Body = any

export class BodyBuilder<T = Body> extends Builder<T> {
  protected _value?: T;

  constructor(parent: RequestBuilder, value?: Body) {
    super(parent)
    if (value) this._value = value;
  }
  set(v: Body): this {
    this._value = v;
    return this;
  }

}