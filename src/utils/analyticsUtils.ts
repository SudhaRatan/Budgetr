export const modifyColor = (color: string): string => {
  var c = color.split("");
  c[3] = "F";
  c[4] = "F";
  return c.join("");
};
