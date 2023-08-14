import { useOutletContext } from 'react-router-dom';
import { LayoutOutletContextType } from '../common/types';

export default function useLayoutOutletContext() {
  return useOutletContext<LayoutOutletContextType>();
}

// `useOutletContext` w/ TS: https://reactrouter.com/en/main/hooks/use-outlet-context
