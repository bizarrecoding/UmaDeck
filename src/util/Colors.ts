export const hexToRGBArray=(color:string)=>{
  const R = color.substring(1,3)
  const G = color.substring(3,5)
  const B = color.substring(5,7)
  return [parseInt(R,16),parseInt(G,16),parseInt(B,16)]
}

export const RGBArrayToHex=(color:number[])=>{
  return color.reduce((c, component)=>{
    return c + component.toString(16)
  },"#")
}

export const mergeRGB =(color:string,base:string)=>{
  const _color = hexToRGBArray(color)
  const _base = hexToRGBArray(base)
  const merge = _color.map((c,i)=>{
    return Math.ceil((c +_base[i])/2)
  })
  console.log("🚀 ~ mergeRGB ~ merge:", merge);
  return RGBArrayToHex(merge)
}