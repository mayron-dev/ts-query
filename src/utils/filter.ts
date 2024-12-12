import { Filter } from '../factory/filter';

export const buildFilter = (filter: Filter) => {
  const params = new URLSearchParams()
  // limit
  if (filter.limit) {
    params.append("limit", filter.limit.toString());
  }

  // offset
  if (filter.offset) {
    params.append("offset", filter.offset.toString());
  }

  // order
  if (filter.order && filter.order.length > 0) {
    filter.order.forEach((order) => {
      params.append("order", `${order.field.toLowerCase()}:${order.type}`);
    });
  }

  // where
  if (filter.where && filter.where.length > 0) {
    filter.where.forEach((where) => {
      params.append(
        where.field,
        `${where.operation}:${Array.isArray(where.value) ? where.value.join(",") : where.value}`
      );
    });
  }

  return decodeURIComponent(params.toString());
}