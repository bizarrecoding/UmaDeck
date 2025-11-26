// src/components/supports/SupportCard.tsx
import React, { memo, useMemo } from 'react'
import { byActiveTags, getCardEffects } from '../../assets/data/supports'

import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { SupportImage } from './SupportImage'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import Card from '../ui/card/Card'
import CardActions from '../ui/card/CardActions'
import { styled, Tooltip, tooltipClasses, type TooltipProps } from '@mui/material'

type SupportCardProps = {
  card: Support
  selected?: boolean
  onPress: React.Dispatch<React.SetStateAction<Support[]>>
}

const SupportCard: React.FC<SupportCardProps> = ({ card, selected = false, onPress: onToggle })=> {
  const { tags } = useSelector((state:RootState)=>state.tags)
  const gameToraUrl = `https://gametora.com/umamusume/supports/${card.support_id}-${card.char_name.toLowerCase().replace(/\s+/g,'-')}`
  const toggleSelect = () => {
    onToggle(deck => {
      const exists = deck.find(p=>p.support_id===card.support_id)
      const char_exist = deck.some(s=>s.char_id===card.char_id) 
      if(exists) return deck.filter(p=>p.support_id!==card.support_id)
      if(!exists && !char_exist && deck.length<6) {
        return [...deck, card]
      }
      return deck
    })
  }

  const effects = useMemo(()=>{
    const uniqueEffects = card.unique?.effects?.map(e=>[e.type, e.value]) || []
    const dataSet = [...card.effects, ...uniqueEffects]
    return getCardEffects(dataSet);
  }, [card]) 
  
  return (
    <Card>
      <Box sx={{ display:'flex',  alignItems:'center' }}>
          <SupportImage card={card} size={48} />
        <Box sx={{flex:1, m:1}}>
          <HtmlTooltip title={<Effect data={effects} />}>
            <Typography sx={{ fontWeight:700 }}>{card.char_name}</Typography>
          </HtmlTooltip>
          <Typography variant="body2" color="text.secondary">{card.release_en}</Typography>
        </Box>
        <CardActions url={gameToraUrl} selected={selected} onToggle={toggleSelect}/>
      </Box>
      <Box sx={{ mt:1, display:'flex', gap:1, flexWrap:'nowrap', overflowX:'auto', pb:0.5 }}>
        {card.tags.slice(0,8).map(t => {        
          const activeChip = tags?.includes(t)
          return (
            <Chip key={t} label={t} size="small" color={activeChip ? 'success' : 'default'} sx={{ flex: '0 0 auto' }} />
          )
        })}
        {card.tags.length > 8 && <Chip label={`+${card.tags.length - 8}`} size="small" />}
      </Box>
      <Box sx={{ mt:1 }}>
        <SkillList label="Event" skills={card.event_skills} />
        <SkillList label="Hint" skills={card.hints.hint_skills} />
      </Box>
    </Card>
  )
}

type SkillListProps = {
  label?: string
  skills: Skill[]
}

const SkillList: React.FC<SkillListProps> = ({ label, skills }) => {
  const { tags } = useSelector((state:RootState)=>state.tags)
  const sorted = useMemo(()=>{
    if(!skills?.length) return [];
    return [...skills].sort((s1,s2)=>byActiveTags(s1,s2,tags))
  },[skills,tags])

  if(sorted.length===0) return null;
  return (
    <div>  
      <Typography variant="caption"><strong>{label}: </strong></Typography>
      {sorted.map((s, index) => {
        const active = s?.explicit_tags?.some(t=>tags.includes(t)) ?? false
        const fontWeight = active ? 'bold' : 'normal';
        const color = active ? 'success' : 'textPrimary';
        if(!s) return null;
        return (
          <Typography key={index} variant="caption" color={color} style={{ fontWeight }}>
            {index===0?'':', '}{s.name} 
          </Typography>
        )
      })}
    </div>
  )
}


type EffectProps = React.PropsWithChildren<{
  data: Record<string, number>;
}>


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const Effect: React.FC<EffectProps> = ({ data }) =>{
  if(!data || Object.keys(data).length===0) return null
  return (
    <>
      {Object.entries(data)?.map(([label, value])=> {
        return (
          <Typography key={label} variant="caption" display="block">
            <strong>{label}: </strong>{value}
          </Typography>
        )
      })}
    </> 
  )
}

export default memo(SupportCard)
