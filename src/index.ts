import { http } from './http';
import { Query } from './query';

export * from "./http";

console.log("query", Query);

http
  .get()
  .filter().offset(0).limit(100).back()
  .path("/custom").run()



/*
  method
  path
  body
  search params
  baseUrl
  responseSchema

*/