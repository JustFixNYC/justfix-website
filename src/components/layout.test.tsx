import { formatImageUrlForSEO } from "./layout";

describe("formatImageUrlForSEO()", () => {
  it("doesn't format regualr urls", () => {
    expect(formatImageUrlForSEO("www.boop.com")).toBe("www.boop.com");
  });
  it("encodes special characters inside urls", () => {
    expect(formatImageUrlForSEO("www.boop.com/HELLO JONES")).toBe(
      "www.boop.com/HELLO%20JONES"
    );
  });
  it("reformats urls that start with two forward slashes", () => {
    expect(formatImageUrlForSEO("//boop.assets.com/image.png")).toBe(
      "https://boop.assets.com/image.png"
    );
  });
  it("reformats and encodes urls at the same time ", () => {
    expect(formatImageUrlForSEO("//boop.assets.com/100% fun.png")).toBe(
      "https://boop.assets.com/100%25%20fun.png"
    );
  });
});
