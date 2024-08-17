export const modifyColor = (color: string): string => {
    var c = color.split("")
    c[2] = '0'
    c[3] = '0'
    return c.join("")
}