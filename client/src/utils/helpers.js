export const cutLastChar = (str) => {
  return str ? str.trim().substring(0, str.length - 1) : str;
};
