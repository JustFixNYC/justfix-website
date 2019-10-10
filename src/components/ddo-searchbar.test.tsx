import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { getDDOURL, DDOSearchBar, DDOSearchBarProps } from './ddo-searchbar';
import { getSpecificElementTypeFrom } from '../util/testing-utils';

describe('getDDOURL()', () => {
  it('includes only address if borough is not provided', () => {
    expect(getDDOURL({address: 'blarg', borough: null}, 'http://boop/')).toBe('http://boop/?address=blarg');
  });

  it('includes address and borough if both are provided', () => {
    expect(getDDOURL({address: 'blarg', borough: 'BRONX'}, 'http://boop/')).toBe('http://boop/?address=blarg&borough=BRONX');
  });
});

describe('<DDOSearchBar>', () => {
  let wasSubmitPrevented: boolean|undefined = undefined;
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
    window.addEventListener('submit', handleSubmit);
    locationAssign = jest.fn();
    delete window.location;
    window.location = {
      assign: locationAssign
    } as any;
  });

  afterEach(() => {
    window.removeEventListener('submit', handleSubmit);
    window.location = originalLocation;
  });

  const renderDDO = (extraProps?: Partial<DDOSearchBarProps>) => {
    const props: DDOSearchBarProps = {
      hiddenFieldLabel: "Enter an address",
      submitLabel: "Search address",
      action: "http://boop.com/",
      ...extraProps
    };
    const rr = render(<DDOSearchBar {...props} />);
    const addressInput = getSpecificElementTypeFrom(rr.getAllByLabelText(props.hiddenFieldLabel), HTMLInputElement);
    const submitButton = rr.getByText(props.submitLabel);

    return {
      rr,
      addressInput,
      submitButton,
      submit() {
        fireEvent.blur(addressInput);
        fireEvent.click(submitButton);
      },
      type(value: string) {
        fireEvent.focus(addressInput);
        fireEvent.change(addressInput, { target: { value } });
      },
      isLoading() {
        return submitButton.classList.contains('is-loading');
      }
    };
  };

  it('does not prevent form submission in baseline experience', () => {
    const ddo = renderDDO({disableAutocomplete: true});
    ddo.type("boop");
    ddo.submit();
    expect(wasSubmitPrevented).toBe(false);
    expect(locationAssign).not.toHaveBeenCalled();
    expect(ddo.isLoading()).toBe(true);
  });

  it('prevents form submission in progressively enhanced experience', () => {
    const ddo = renderDDO();
    ddo.type("boop");
    ddo.submit();
    expect(wasSubmitPrevented).toBe(true);
    expect(locationAssign).toHaveBeenCalledTimes(1);
    expect(locationAssign).toHaveBeenCalledWith("http://boop.com/?address=boop");
    expect(ddo.isLoading()).toBe(true);
  });
});
