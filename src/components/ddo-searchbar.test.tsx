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

  const handleSubmit = (e: Event) => {
    wasSubmitPrevented = e.defaultPrevented;
    if (!e.defaultPrevented) {
      e.preventDefault();
    }
  };

  beforeEach(() => {
    wasSubmitPrevented = undefined;
    window.addEventListener('submit', handleSubmit);
  });

  afterEach(() => {
    window.removeEventListener('submit', handleSubmit);
  });

  const renderDDO = (extraProps?: Partial<DDOSearchBarProps>) => {
    const props: DDOSearchBarProps = {
      hiddenFieldLabel: "Enter an address",
      submitLabel: "Search address",
      ...extraProps
    };
    const rr = render(<DDOSearchBar {...props} />);
    const addressInput = getSpecificElementTypeFrom(rr.getAllByLabelText(props.hiddenFieldLabel), HTMLInputElement);
    const submitButton = rr.getByText(props.submitLabel);

    return {
      rr,
      addressInput,
      submitButton,
      submit() { fireEvent.click(submitButton); },
      type(value: string) {
        fireEvent.change(addressInput, { target: { value } });
      }
    };
  };

  it('does not prevent form submission in baseline experience', () => {
    const ddo = renderDDO({disableAutocomplete: true});
    ddo.type("boop");
    ddo.submit();
    expect(wasSubmitPrevented).toBe(false);
  });

  it('prevents form submission in progressively enhanced experience', () => {
    const ddo = renderDDO();
    ddo.type("boop");
    ddo.submit();
    expect(wasSubmitPrevented).toBe(true);
  });
});
