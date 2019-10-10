/**
 * Filter the given list of elements to only one of the given class and return it.
 * 
 * Ordinarily we'd use React/DOM Testing Library's "selector" option to do this
 * but it doesn't seem to be working, which is AWESOME.
 */
export function getSpecificElementTypeFrom<T extends Element>(els: Element[], _class: new () => T): T {
  let found: T|undefined = undefined;

  for (let el of els) {
    if (el instanceof _class) {
      if (found) {
        throw new Error(`Multiple instances found of ${_class.name}`);
      }
      found = el;
    }
  }

  if (!found) {
    throw new Error(`No instances found of ${_class.name}`);
  }

  return found;
}
