/**
 * A hook to typecheck and null check useParams.
 * We do this because react-router can never be sure of where we are calling useParams from.
 * Even if we are sure IN THIS MOMENT, in the future, a route component could be deleted or a param name could change.
 * This gives us a test for that case.
 *
 * @see https://github.com/remix-run/react-router/issues/8200
 */
import { useParams } from 'react-router-dom';
import invariant from 'tiny-invariant';

export function useTypedParams<T extends string>(
  ...paramNames: T[]
): Record<T, string> {
  const params = useParams();
  const initialTypedParams: Record<string, string> = {};

  return paramNames.reduce((typedParams, currentParamName) => {
    const currentParam = params[currentParamName];

    invariant(
      currentParam,
      `${currentParamName} not found in useParams. Check the parent route to make sure nothing changed`,
    );

    typedParams[currentParamName] = currentParam;

    return typedParams;
  }, initialTypedParams);
}
