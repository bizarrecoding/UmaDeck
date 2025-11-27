import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '../redux/store'
import { supports, byActiveTags, sumDeckEffects } from '../assets/data/supports'
import SupportCard from '../components/supports/SupportCard'
import TagPicker from '../components/supports/TagPicker'
import TopBar from '../components/ui/TopBar'
import { Typography } from '@mui/material'
import SupportEffects from '../components/supports/SupportEffects'


export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() { 
  const {tags} = useSelector((state:RootState)=>state.tags)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Support[]>([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return supports
      .filter(s => {
        if(selected.some(sl=>sl.support_id === s.support_id)) return false
        if (!q) return true
        const inName = s.char_name.toLowerCase().includes(q)
        const inRarity = s.rarity_string.toLowerCase().includes(q)
        const inTags = s.tags.join(' ').toLowerCase().includes(q) 
        return inName || inRarity || inTags
      })
      .sort((a,b)=> byActiveTags(a,b, tags))
  }, [selected, query, tags])
  

  const deckValue = sumDeckEffects(selected)
 
  return (
    <>
      <TopBar query={query} onQueryChange={setQuery}/>
      <TagPicker active={tags}/>
      <div style={{padding:16 }}>
        <div style={{marginBottom:12}}>
          <Typography component="h3">Selected ({selected.length})</Typography>      
          <SupportEffects values={deckValue} />
          <SupportGrid list={selected} selected={selected} setSelected={setSelected} />
        </div>
        <Typography component="h3">Supports</Typography>
        <SupportGrid list={filtered} selected={selected} setSelected={setSelected} />
      </div>
    </>
  )
}

type SupportGridProps ={
  list: Support[];
  selected: Support[];
  setSelected: React.Dispatch<React.SetStateAction<Support[]>>;
}

const SupportGrid: React.FC<SupportGridProps> = ({list, selected, setSelected}) => {
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:12, paddingTop:8}}>
      {list.map((s) => {
        const isSelected = !!selected.find(p=>p.support_id===s.support_id)
        return <SupportCard key={s.support_id} card={s} selected={isSelected} onPress={setSelected} />;
      })}
    </div>
  )
}
