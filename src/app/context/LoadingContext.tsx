import { createContext } from 'react';

// Based on: https://stackoverflow.com/a/67957976
interface Store {
  setLoading: Function,
}

export default createContext<Store>({} as Store)


