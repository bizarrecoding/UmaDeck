import { createFileRoute } from '@tanstack/react-router'
import TagPicker from '../components/supports/TagPicker'
import TopBar from '../components/ui/TopBar'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { Typography } from '@mui/material'
import SkillGrid from '../components/skills/SkillGrid'
import { skillsData } from '../assets/data/skills'

export const Route = createFileRoute('/skills')({
  component: RouteComponent,
})

function RouteComponent() {
  const {tags} = useSelector((state:RootState)=>state.tags)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Skill[]>([])

  const filtered = useMemo(()=>{
    const temp=skillsData.filter(s=>{
      const name = s?.name?.toLowerCase() ?? ""
      let match = true
      let hasTag = true
      if(query?.length>2){
        match = name.includes(query.toLowerCase())
      }
      if(tags.length > 0){
        hasTag = tags.every(t=> s.tags.includes(t));
      }
      return match && hasTag
    })//.sort()
    return temp
  },[query, tags]) 

  return (
    <>
      <TopBar query={query} onQueryChange={setQuery}/>
      <TagPicker active={tags}/>
      <div style={{padding:16 }}>
        <div style={{marginBottom:12}}>
          <Typography component="h3">Selected ({selected.length})</Typography>      
          <SkillRequirements skills={selected} />
          <SkillGrid list={selected} selected={selected} setSelected={setSelected} />
        </div>
        <Typography component="h3">Skills</Typography>
        <SkillGrid list={filtered} selected={selected} setSelected={setSelected} />
      </div>
    </>
  )
}

const SkillRequirements = ({skills=[]}:{skills:Skill[]})=>{
  const hints = 2
  // 72 turns - 9 races - (72-9-8)/4  rests,  4 points avg and about 100 on events
  const assumedTrainedPoints = (72-13)*4 + 100 

  const trueTotalSP = skills.reduce((total,skill)=>{
    const { baseCost, rarity } = skill
    const cost = rarity===2 ? baseCost*2 : baseCost 
    return total+cost 
  },0)
  const totalSP = skills.reduce((total,skill)=>{
    const { baseCost, rarity } = skill
    const accumulatedCost = rarity===2 ? baseCost*2 : baseCost 
    const cost = accumulatedCost - hints * baseCost/10
    return total+cost 
  },0)
  const approxG1 = Math.max(Math.ceil((totalSP-270-assumedTrainedPoints)/60), 0) 
  
  if(!skills.length) return null
  return (
    <div style={{marginBottom:8}}>
      <Typography>Total Pts {trueTotalSP} ({totalSP} with avg 2 hints)</Typography>
      <Typography>Approximate G1 Races {approxG1}</Typography>
    </div>
  )
}