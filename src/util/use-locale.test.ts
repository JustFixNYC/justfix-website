import { getLocaleFromPathname } from "./use-locale";

describe("getLocaleFromPathname()", () => {
  it("works with a pathname with valid locale", () => {
    expect(getLocaleFromPathname("/en/boop/jones/hello")).toBe("en");
  });

  it("works even if there is no leading slash for some reason", () => {
    expect(getLocaleFromPathname("en/boop/jones/hello")).toBe("en");
  });

  it("raises an error if there is no locale specified in the pathname", () => {
    expect(() => getLocaleFromPathname("/boop/jones/hello")).toThrowError(
      "Locale parameter in url is not an accepted locale!"
    );
  });

  it("raises an error if locale in pathname is not an accepted one", () => {
    expect(() => getLocaleFromPathname("/tr/boop/jones/hello")).toThrowError(
      "Locale parameter in url is not an accepted locale!"
    );
  });
});
