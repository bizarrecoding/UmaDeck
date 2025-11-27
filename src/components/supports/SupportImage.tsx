import React from 'react'
import { tintMap } from '../../constants/Colors'

type StatIconProps = {
  stat: Stat|"others";
  size?: number;
  style?: React.CSSProperties;
}

export const StatIcon: React.FC<StatIconProps> = ({ stat, size=30, style }) => {  
  const tintColor = stat!=='others' ? tintMap[stat] : undefined 
  const border = Math.floor(size/6)
  const _stat = stat==="others" ? "friend" : stat
  return (
    <img 
      loading='lazy'
      alt={`${_stat} icon`}
      src={`/UmaDeck/statImages/${_stat}_icon.png`}
      style={{width:size, height:size, backgroundColor:tintColor, borderRadius:border, ...style }}
    />        
  )
}

type SupportImageProps = {
  card: Pick<Support,"support_id"|"type">;
  size?: number;
  style?: React.CSSProperties;
}

export const SupportImage: React.FC<SupportImageProps> = ({ card, size=60, style })=>{
  // const uri = `https://euophrys.github.io/uma-tiers/cardImages/support_card_s_${card.support_id}.png`
  const uri = `/UmaDeck/cardImages/support_card_s_${card.support_id}.png`
  return (
    <div style={{ width:size, height:size, ...style }}>
      <img 
        alt={`Support ${card.support_id}`}
        loading='lazy'
        src={uri}
        style={{width:size, height:size, aspectRatio:1}}  
      />
      <StatIcon 
        stat={card.type} 
        size={size/3} 
        style={{position:"relative", top:-size-4, left:size*2/3}}
      />
    </div>
  )
}
