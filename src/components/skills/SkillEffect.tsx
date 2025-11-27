import { Box, Typography } from "@mui/material"

type SkillEffectProps = {
  skill: Skill 
}

type EffectProps = {
  effect: Effect
}

const effectMap = { 
  "1": "Speed",
  "2": "Stamina",
  "3": "Power",
  "4": "Guts",
  "5": "Wit",
  "8": "Field of view",
  "9": "Recovery",
  "10": "Start delay",
  "13": "Rushed",
  "21": "Current speed",
  "27": "Target speed",
  "28": "Lane movement",
  "31": "Acceleration" 
}

const getParsedValue=(type:string, value:number)=>{
  const mod = value>0 ? "up":"down" 
  const sign = value>0 ? "+":"" 
  if(type==="8") return `${sign}${value/10000}º Deg`;
  if(type==="9") return `${value/100}%`;
  if(type.length<2) {
    return `${mod} ${Math.abs(value/10000)}`;
  }
  if(type==="10") return `x${value/10000}`;
  if(["21","27","28"].includes(type)) return `${value/10000} m/s`;
  if(type==="31") return `${value/10000} m/s^2`;
  return value/10000
}

const SkillEffect = ({skill}: SkillEffectProps) => {
  const [data] = skill.alternatives
  if(!data) return null;
  const { baseDuration = 0, effects=[] } = data;
  return (
    <Box sx={{ display:'flex', flex:1, flexDirection:'column' }}>
      <Typography variant="caption" sx={{ marginTop: 1 }}>
        Duration: {baseDuration>=1 ? `${baseDuration/10000}s` : `instant` }
      </Typography>
      {effects?.map((eff, index)=>(
        <Effect key={`eff${index}-${eff.target}${eff.type}`} effect={eff}/>
      ))}
    </Box>
  )  
}

const Effect = ({effect}: EffectProps) => {
  const type = (effect?.type ? `${effect.type}` : "-1") as keyof typeof effectMap
  const targetStat =  effectMap[type] ?? type
  const value = getParsedValue(type, effect.modifier)
  return <Typography variant="caption">{targetStat} {value}</Typography>
}

export default SkillEffect;