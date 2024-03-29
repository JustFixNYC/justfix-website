import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { getDDOURL, DDOSearchBar, DDOSearchBarProps } from "./ddo-searchbar";
import { getSpecificElementTypeFrom } from "../util/testing-utils";
import { GeoAutocompleteProps } from "./geo-autocomplete";
import { act } from "react-dom/test-utils";

describe("getDDOURL()", () => {
  it("includes only address if borough is not provided", () => {
    expect(getDDOURL({ address: "blarg", borough: null }, "http://boop/")).toBe(
      "http://boop/?address=blarg"
    );
  });

  it("includes address and borough if both are provided", () => {
    expect(
      getDDOURL({ address: "blarg", borough: "BRONX" }, "http://boop/")
    ).toBe("http://boop/?address=blarg&borough=BRONX");
  });

  it("includes locale path if provided", () => {
    expect(
      getDDOURL({ address: "blarg", borough: "BRONX" }, "http://boop/", "es")
    ).toBe("http://boop/es/?address=blarg&borough=BRONX");
  });

  it("includes utm tags if provided", () => {
    expect(
      getDDOURL(
        { address: "blarg", borough: "BRONX" },
        "http://boop/",
        "en",
        "utm_source=boop"
      )
    ).toBe("http://boop/en/?address=blarg&borough=BRONX&utm_source=boop");
  });
});

describe("<DDOSearchBar>", () => {
  let wasSubmitPrevented: boolean | undefined = undefined;
  let locationAssign = jest.fn();
  const originalLocation = window.location;

  const handleSubmit = (e: Event) => {
    wasSubmitPrevented = e.defaultPrevented;
    if (!e.defaultPrevented) {
      e.preventDefault();
    }
  };

  beforeEach(() => {
    wasSubmitPrevented = undefined;
    window.addEventListener("submit", handleSubmit);

    // https://remarkablemark.org/blog/2018/11/17/mock-window-location/
    locationAssign = jest.fn();
    delete (window as Partial<Window>).location;
    window.location = {
      assign: locationAssign,
    } as any;
  });

  afterEach(() => {
    window.removeEventListener("submit", handleSubmit);
    window.location = originalLocation;
  });

  const renderDDO = (extraProps?: Partial<DDOSearchBarProps>) => {
    const props: DDOSearchBarProps = {
      hiddenFieldLabel: "Enter an address",
      submitLabel: "Search address",
      action: "http://boop.com/",
      ...extraProps,
    };
    const rr = render(<DDOSearchBar {...props} />);
    const getAddressInput = () =>
      getSpecificElementTypeFrom(
        rr.getAllByLabelText(props.hiddenFieldLabel),
        HTMLInputElement
      );
    const submitButton = rr.getByText(props.submitLabel);

    return {
      rr,
      props,
      getAddressInput,
      submitButton,
      submit() {
        fireEvent.blur(getAddressInput());
        fireEvent.click(submitButton);
      },
      type(value: string) {
        fireEvent.focus(getAddressInput());
        fireEvent.change(getAddressInput(), { target: { value } });
      },
      isLoading() {
        return submitButton.classList.contains("is-loading");
      },
    };
  };

  const createFakeGeoAutocomplete = () => {
    let latestProps: GeoAutocompleteProps | undefined;
    const testId = "fake-addr";

    const geoAutocompleteComponent = (props: GeoAutocompleteProps) => {
      latestProps = props;

      return (
        <>
          <label htmlFor="fake-addr">{props.label}</label>
          <input id="fake-addr" data-testid={testId} />
        </>
      );
    };

    return {
      geoAutocompleteComponent,
      getProps() {
        if (!latestProps) throw new Error("Component has not yet rendered!");
        return latestProps;
      },
      testId,
    };
  };

  it("does not prevent form submission in baseline experience", () => {
    const ddo = renderDDO({ disableAutocomplete: true });
    ddo.type("boop");
    ddo.submit();
    expect(wasSubmitPrevented).toBe(false);
    expect(locationAssign).not.toHaveBeenCalled();
    expect(ddo.isLoading()).toBe(true);
  });

  it("prevents form submission in progressively enhanced experience", () => {
    const ddo = renderDDO();
    ddo.type("boop");
    ddo.submit();
    expect(wasSubmitPrevented).toBe(true);
    expect(locationAssign).toHaveBeenCalledTimes(1);
    expect(locationAssign).toHaveBeenCalledWith(
      "http://boop.com/?address=boop&utm_source=orgsite&utm_medium=ddosearch"
    );
    expect(ddo.isLoading()).toBe(true);
  });

  it("does not navigate to search result on onChange w/o borough", () => {
    const fakeGeo = createFakeGeoAutocomplete();
    const ddo = renderDDO(fakeGeo);

    // Simulate a geo autocomplete change event.
    act(() => fakeGeo.getProps().onChange({ address: "boop", borough: null }));
    expect(locationAssign).not.toHaveBeenCalled();

    // Make sure our geo autocomplete is being rendered.
    ddo.rr.getByTestId(fakeGeo.testId);
  });

  it("navigates to search results on item select", () => {
    const fakeGeo = createFakeGeoAutocomplete();
    const ddo = renderDDO(fakeGeo);
    act(() =>
      fakeGeo.getProps().onChange({ address: "boop", borough: "BRONX" })
    );
    ddo.rr.getByTestId(fakeGeo.testId);
    expect(locationAssign).toHaveBeenCalledTimes(1);
    expect(locationAssign).toHaveBeenCalledWith(
      "http://boop.com/?address=boop&borough=BRONX&utm_source=orgsite&utm_medium=ddosearch"
    );
    expect(ddo.isLoading()).toBe(true);
  });
});
