module.exports = function makeIterator(array) {
  let nextIndex = 0;

  return {
    next: () => {
      return nextIndex < array.length ? array[nextIndex++] : null ;
    },
  };
};
