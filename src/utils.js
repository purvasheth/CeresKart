export const checkItem = (array, id) => {
  console.log(array);
  return !!array.find((item) => item.id === id);
};

export const makeBackroundUnscrollable = (isModelOpen) => {
  if (isModelOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
};
