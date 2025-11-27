//cspell:ignore lastspurt finalcorner skillnames
import skills_raw from './skill_data.json'
import skill_meta_raw from './skill_meta.json'
import skill_names_raw from './skillnames.json'

const skills = skills_raw as unknown as Record<string,SkillDataD>

const skillNames = skill_names_raw as unknown as Record<string,string>

const skillMeta = skill_meta_raw as unknown as Record<string,SkillMeta>

const excluded =["Gatekept","Reckless","Packphobia","Ramp Revulsion" ]

export const distance_tags = {
  "dirt":{
    reg: /ground_type==(\d)/,
    match: "1",
  },
  "sprint":{
    reg: /distance_type==(\d)/,
    match: "1",
  },
  "mile":{
    reg: /distance_type==(\d)/,
    match: "2",
  },
  "medium":{
    reg: /distance_type==(\d)/,
    match: "3",
  },
  "long":{
    reg: /distance_type==(\d)/,
    match: "4",
  },
}

export const run_tags = {
 "escape":{
    reg: /running_style==(\d)/,
    match: "0",
  },
 "front":{
    reg: /running_style==(\d)/,
    match: "1",
  },
  "pace":{
    reg: /running_style==(\d)/,
    match: "2",
  },
  "late":{
    reg: /running_style==(\d)/,
    match: "3",
  },
  "end":{
    reg: /running_style==(\d)/,
    match: "4",
  },
}

export const race_tags = {
  "early":{
    reg: /phase[_random]*==(\d)/,
    match: "0",
  },
  "mid-race":{
    reg: /phase[_random]*==(\d)/,
    match: "1",
  },
  "late-race":{
    reg: /phase[_random]*==(\d)/,
    match: "2",
  },
  "last":{
    reg: /phase[_random]*==(\d)/,
    match: "3",
  },
}

export const tags = {
  ...run_tags,
  ...distance_tags,
  ...race_tags,
  "corner":{
    reg: /corner_random==(\d)|is_finalcorner_random==(1)/,
    match:"any",
  },
  "straight":{
    reg: /straight_random==(\d)|is_lastspurt==(1)/,
    match:"any",
  },
  "recovery":{
    reg: new RegExp(""),
    match:"none",
  },
  "debuff":{
    reg: new RegExp(""),
    match:"none",
  },
}
const isDebuff = (skill:SkillDataD) =>{
  const [data] = skill.alternatives
  if(!data) return false
  return data.effects.some(e=> e.modifier<0)
}

const getCornerOrStraight = (condition:string) =>{
  if(/corner_random==(\d)|is_finalcorner_random==1/.test(condition)) return ["corner"]
  if(/straight_random==(\d)|is_lastspurt==1/.test(condition)) return ["straight"]
  return [];
} 

const getTagsFromMatcher = (condition:string, tags: (string|null)[], reg: RegExp, debug=false) =>{
  if(condition.match(/ground_type==1/) ) return ["dirt"]
  if(condition.match(/is_lastspurt==1|is_finalcorner_random==1/) ) return ["last"]
  const index = condition.match(reg)?.at(1) as number|undefined
  if(debug) console.log("🚀 ~ getTagsFromMatcher ~ index:", reg, condition.match(reg));
  if(!index) return tags
  return [tags.at(index)].filter(Boolean)
} 

const getExplicitTags = (condition?: string,debug=false)=>{
  if(!condition) return []
  if(/always|running_style_count_same|same_skill_horse_count|popularity|season|weather|grade|post_number|is_basis_distance|track_id|rotation|ground_condition/.test(condition)) return["early"]
  if(condition.match(/is_lastspurt==1|is_finalcorner_random==1/) ) return ["last"]
  return Object.entries(tags).reduce((arr,tagPair)=>{
    const [key, matcher] = tagPair
    const res = condition.match(matcher.reg)
    if(debug) console.log("🚀 ~ getTagsFromMatcher ~ index:", condition,res)
    if((res?.at(1) && matcher.match==="any" || res?.at(1)===matcher.match)) arr.push(key)
    return arr;
  },[] as string[])  
}

const getTags = (condition?: string,debug=false)=>{
  if(!condition) return []
  if(/running_style_count_same|popularity|season|weather|grade|post_number|is_basis_distance|track_id|rotation|ground_condition/.test(condition)) return["early"]

  const distanceTags = getTagsFromMatcher(condition,Object.keys(distance_tags),/distance_type==(\d)/) 
  const runStyleTags = getTagsFromMatcher(condition, Object.keys(run_tags),/running_style==(\d)/) 
  const raceTags = getTagsFromMatcher(condition,Object.keys(race_tags),/phase[_random]*==(\d)/,debug) 
  const cornerStraightTags = getCornerOrStraight(condition)
  const uniqueTags = new Set([...runStyleTags,...distanceTags,...raceTags, ...cornerStraightTags])
  if(debug) {     
    console.log("🚀 ~ getTags ~ condition:", condition.substring(0,40),[...uniqueTags]);
  }

  return [...uniqueTags]
}

export const skillsData = Object.entries(skills).map((item)=>{
  const [code, data] = item
  const meta = skillMeta[code] ?? {}
  const name = skillNames[code]?.[0] ?? "N/A";
  const condition = data?.alternatives?.at(0)?.condition;
  const tags = getTags(condition);
  const explicit_tags = getExplicitTags(condition)
  const isRecover = data.alternatives.at(0)?.effects?.some(e=>e.type===9 && e.modifier>0)
  if(isRecover) {
    tags.push("recovery");
    explicit_tags.push("recovery")
  }
  if(isDebuff(data)) {
    tags.push("debuff");
    explicit_tags.push("debuff")
  }
  if(name.includes("savvy")) {
    tags.push("early");
    explicit_tags.push("early")
  }
  if(name.includes("×") || excluded.includes(name)) return null;
  if(data.rarity>2) return null;
  return {
    ...data,
    ...meta,
    id: code,
    name,
    tags,
    explicit_tags,
    // assume inherited
    baseCost: meta.baseCost ?? 200,
  }
}).filter(Boolean) as Skill[]
