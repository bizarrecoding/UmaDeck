import support_list from './supports.json';
import { EffectGroups, EffectMap } from '../../constants/Values';
import { skillsData } from './skills';


const supportList = support_list as unknown as SupportRaw[]

export const supports = supportList.map((s)=>{
  const event_skills = s.event_skills.map(esk=>{
    return skillsData.find(sd=>sd.id===`${esk}`)
  })
  const hint_skills = s.hints.hint_skills.map(sk=>{
    return skillsData.find(sd=>sd.id===`${sk}`)
  })
  const sumSkills = [...event_skills,...hint_skills]
  return {
    ...s,
    event_skills,
    hints:{
      ...s.hints,
      hint_skills
    },
    tags: [...sumSkills.reduce((arr, skill)=>{
      skill?.explicit_tags?.forEach(tag=>{
        arr.add(tag)
      })
      return arr
    },new Set<string>())],
    rarity_string: s.rarity === 1 ? "R" : s.rarity === 2 ? "SR" : "SSR",
  }
}).filter(s=>!!s.release_en && s.rarity>1) as Support[]
//#endregion

//#region Deck Aggregation
export type EFF = Record<string,number>

export const getCardEffects = (effects: number[][]) =>{
  return effects.reduce((r,eff)=>{
    const [type, ...rest] = eff
    const label = EffectMap[type] || "others"
    if(!r[label]) r[label] = Math.max(...rest)
    else r[label] += Math.max(...rest)
    return r 
  },{} as Record<string,number>)
}

const getCardEffectsForDeck = (effects: number[][]) =>{
  return effects.reduce((r,eff)=>{
    const [type, ...rest] = eff
    const match = Object.entries(EffectGroups).find(([_, types])=>{
      return types.includes(type)
    })
    if(!match) return r;
    const [stat] = match
    if(!r[stat]) r[stat] = {}
    if(r[stat][type]) r[stat][type] += Math.max(...rest)
    else r[stat][type] = Math.max(...rest)
    return r 
  },{} as Record<string,EFF>)
}

export const sumDeckEffects =(deck: Support[])=>{
  return deck.reduce((sum, support)=>{
    const uniques = support?.unique?.effects?.map((u)=>{
      return [u.type, u.value]
    }) ??[]
    const effects = [...support.effects, ...uniques]
    const value = getCardEffectsForDeck(effects)
    const keys = Object.keys(value)
    keys.forEach(stat=>{
      if(!sum[stat]) sum[stat] = {}
      Object.keys(value[stat]).forEach((k) => {
        if(sum[stat][k]) sum[stat][k] += value[stat][k]
        else sum[stat][k] = value[stat][k]
      });
    })
    return sum
  },{} as Record<string,EFF>)
} 

//#endregion

//#region Sorts
export const byActiveTags=(s1:Pick<Support,"tags">, s2:Pick<Support,"tags">, active:string[])=>{
  const active1 = s1.tags.reduce((total,t)=> total + (active.includes(t)?1:0),0)
  const active2 = s2.tags.reduce((total,t)=> total + (active.includes(t)?1:0),0)
  return  -1 * Math.sign(active1-active2)
}
export const byActiveSkillTags=(s1:Support, s2:Support, active:string[])=>{
  const skills1 = [
    ...s1.event_skills.map(s=>({...s, event:true})),
    ...s1.hints.hint_skills.map(s=>({...s,event:false}))
  ] as (Skill & { event:boolean })[] 
  
  const skills2 = [
    ...s2.event_skills.map(s=>({...s, event:true})),
    ...s2.hints.hint_skills.map(s=>({...s,event:false}))
  ] as (Skill & { event:boolean })[] 
  
  const active1 = skills1.reduce((total,s)=> {
    const match = s?.explicit_tags?.some(t=>active.includes(t))
    if(match) return total + (s.event ? 5:1)
    return total
  },0)
  const active2 = skills2.reduce((total,s)=> {
    const match = s?.explicit_tags?.some(t=>active.includes(t))
    if(match) return total + (s.event ? 5:1)
    return total
  },0)
  return  -1 * Math.sign(active1-active2)
}

//#endregion