import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PersistedState = [string, Dispatch<SetStateAction<string>>];

function useLanguageState(defaultValue: string, key: string): PersistedState {
  const [value, setValue] = useState<string>(() => {
    return  localStorage.getItem(key) || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export { useLanguageState };
