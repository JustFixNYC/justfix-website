import React from 'react'
import { render } from '@testing-library/react'
import { getDDOURL, DDOSearchBar } from './ddo-searchbar';

describe('getDDOURL()', () => {
  it('includes only address if borough is not provided', () => {
    expect(getDDOURL({address: 'blarg', borough: null}, 'http://boop/')).toBe('http://boop/?address=blarg');
  });

  it('includes address and borough if both are provided', () => {
    expect(getDDOURL({address: 'blarg', borough: 'BRONX'}, 'http://boop/')).toBe('http://boop/?address=blarg&borough=BRONX');
  });
});

describe('<DDOSearchBar>', () => {
  it('works', () => {
    render(<DDOSearchBar hiddenFieldLabel="addr" submitLabel="submit" />);
  });
});
