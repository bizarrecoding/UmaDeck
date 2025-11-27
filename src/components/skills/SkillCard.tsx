import { Box,  Chip, Typography } from "@mui/material";
import CardActions from "../ui/card/CardActions";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { SkillImage } from "./SkillIcon";
import Card from "../ui/card/Card";
import SkillEffect from "./SkillEffect";
import { SupportImage } from "../supports/SupportImage";
import { supports } from "../../assets/data/supports";

type SkillCardProps ={
  skill: Skill;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const SkillCard: React.FC<SkillCardProps> = ({skill, selected, setSelected}) => {
  const { tags } = useSelector((state:RootState)=>state.tags)
  const onToggle = () => setSelected(prev => {
    if(selected)  return prev.filter(s => s.id !== skill.id)
    return [...prev, skill]
  })
  
  return (
    <Card rarity={skill.rarity}>
      <Box sx={{ display:'flex',  alignItems:'center'}}>
        <SkillImage id={skill.iconId} size={32} style={{ marginRight: 8 }} />
        <Typography fontSize={14} sx={{ flex:1, fontWeight:600}}>{skill.name}</Typography>
        <Chip label={`${skill.baseCost} SP`}/>
        <CardActions selected={selected} onToggle={onToggle} />
      </Box>
      <div style={{ display:'flex', flex:1, flexDirection:'row',alignItems:"center", gap:1 }}>
        <SkillEffect skill={skill}/>
        <Box sx={{ display:'flex', flex:1, justifyContent:'flex-end', flexWrap:'nowrap', gap: 1, overflowX:'auto'}}>
          {skill.explicit_tags.slice(0,8).map(t => {        
            const activeChip = tags?.includes(t)
            return (
              <Chip key={t} label={t} size="small" color={activeChip ? 'success' : 'default'} sx={{ flex: '0 0 auto' }} />
            )
          })}
        </Box>
      </div>
      <SkillCardOptions skill_id={skill.id} />  
    </Card>
  )
}

export default SkillCard;

const SkillCardOptions = ({ skill_id }: {skill_id: string})=>{
  const cards = supports.reduce((set,s)=>{
    const eventSkills = s.event_skills.map(es=>es?.id)
    const hintSkills = s.hints.hint_skills.map(hs=>hs?.id)
    if(hintSkills.includes(skill_id)) {
      set.hint.push(s)
    }
    if(eventSkills.includes(skill_id)) {
      set.event.push(s)
    }
    return set;
  },{event: [], hint: []} as Record<string, Support[]>);

  if(cards.event.length===0 && cards.hint.length===0) return null;
  return (
    <>
      {cards.event.length===0 ? null : (
        <Box style={{ marginTop: 8,flexDirection:'row', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
          <Typography variant="caption">From event:</Typography>
          {cards.event.map((s,i) => {
            return <SupportImage key={i} card={s} size={32} style={{}} />;
          })}
        </Box>
      )}
      {cards.hint.length===0 ? null : (
        <Box style={{ marginTop: 8,flexDirection:'row', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
          <Typography variant="caption">From hints:</Typography>
          {cards.hint.map((s,i) => {
            return <SupportImage key={i} card={s} size={32} style={{}} />;
          })}
        </Box>
      )}
    </>
  )
}