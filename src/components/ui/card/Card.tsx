import { Card as MUICard, CardContent } from '@mui/material'
import React from 'react'

type CardProps = React.PropsWithChildren<{
  rarity?: number;
}>

const gradient: Record<string,[string, string]> = {
  normal: ["#fbfbfb","#bfbed0"],
  rare: ["#ffffe9","#fec030"],
  unique: ["#fffeec","#ffbe26"],
}

const Card: React.FC<CardProps> = ({ children, rarity }) => {
  const gradientType = rarity === 1 ? 'normal' : 'rare' 
  const [from, to] = gradient[gradientType]
  const background = rarity ? `linear-gradient(to right top,${from},${to})` : "#F4F5F6"
  return (
    <MUICard variant="outlined" sx={{ gap:2, p:1, background, borderRadius:2 }}>
      <CardContent style={{ display:'flex', flexDirection:'column', flex:1, padding:0 }}>
        {children}
      </CardContent>
    </MUICard>     
  )
}

export default Card