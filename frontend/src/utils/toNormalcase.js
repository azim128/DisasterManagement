export const toNormalCase = (str) => {
    return str.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  };