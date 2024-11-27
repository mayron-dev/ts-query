import { BodyBuilder } from '../src/builder';
import { PostRequest } from '../src/request';

describe("BodyBuilder", () => {
  let bodyBuilder: BodyBuilder;

  beforeEach(() => {
    const query = new PostRequest({} as any); // Mock HttpClient
    bodyBuilder = new BodyBuilder(query, { initial: "value" });
  });

  test("Initial body is set correctly", () => {
    expect(bodyBuilder.value).toEqual({ initial: "value" });
  });

  test("Sets body correctly", () => {
    bodyBuilder.set({ name: "John", age: 30 });

    expect(bodyBuilder.value).toEqual({ name: "John", age: 30 });
  });
});
