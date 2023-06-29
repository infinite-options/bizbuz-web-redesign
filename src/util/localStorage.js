const useLocalStorage = (key) => {
  const getItem = () => {
    const itemString = localStorage.getItem(key);
    if (itemString) return JSON.parse(itemString);
    return null;
  };
  const setItem = (item) => {
    localStorage.setItem(key, JSON.stringify(item));
  };
  const removeItem = () => {
    return localStorage.removeItem(key);
  };
  return [getItem, setItem, removeItem];
};

export default useLocalStorage;
