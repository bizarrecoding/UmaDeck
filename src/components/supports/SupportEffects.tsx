import { Grid, Typography } from "@mui/material";
import { StatIcon } from "./SupportImage";
import { EffectKeyGroups, EffectMap } from "../../constants/Values";
import type { EFF } from "../../assets/data/supports";

type DeckEffectsProps = {
  values: Record<string,EFF>
}

const DeckEffects: React.FC<DeckEffectsProps> = ({values})=>{
  return (
    <Grid container spacing={2}>
      {Object.entries(values??{}).map(eff=>{
        const [stat, value] = eff
        if(stat==="others") return null;
        return <EffectStat key={stat} stat={stat as Stat} values={value}/>
      })}
      {Object.entries(values?.others ?? {}).map(eff=>{
        const [stat, value] = eff 
        const values = {} as EFF
        values[stat] = value
        return <EffectStat key={stat} stat={"others"} values={values}/>
      })} 
    </Grid>
  )
} 

type EffectStatProps = {
  stat: Stat|"others";
  values: EFF;
}

const EffectStat: React.FC<EffectStatProps> = ({stat, values})=>{
  return (
    <Grid key={stat} size={{ sm: 6, md:4, lg: 2}} sx={{alignItems:"center", display:"flex"}}>
      <div style={{display:"flex", flexDirection:"row", alignItems:"center", gap:8}}>
        <StatIcon stat={stat} size={20} />
        <div>
          <EffectValues stat={stat} values={values}/>
        </div>
      </div>
    </Grid>
  )
}

const EffectValues: React.FC<{stat:string, values:EFF}>= ({stat, values})=>{
  return Object.entries(values??{}).map((data)=>{
    const [labelKey, value] = data
    const label = EffectMap[labelKey]?.replace(new RegExp(`${EffectKeyGroups.join("|")}`,"i"),"").trim()
    return <Typography key={`${stat}-${labelKey}`}>{label}: {value} </Typography>
  })
} 

export default DeckEffects;