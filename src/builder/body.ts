import { Query } from '../query';
import { Builder } from './builder';

export type Body = any

export class BodyBuilder extends Builder<Body> {
  protected _value: any = {}

  constructor(parent: Query, value?: Body) {
    super(parent)
    if (value) this._value = value;
  }
  set(v: Body): this {
    this._value = v;
    return this;
  }

}