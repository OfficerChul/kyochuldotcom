import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkMode = (): [boolean, () => void] => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;