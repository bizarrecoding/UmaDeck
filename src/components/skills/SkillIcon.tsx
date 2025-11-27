type SkillImageProps = {
  id: string | number;
  size?: number;
  style?: React.CSSProperties;
}

export const SkillImage: React.FC<SkillImageProps> = ({ id, size, style })=>{
  return (
    <img 
      alt={`Skill ${id}`}
      loading='lazy'
      src={`/skillImages/${id}.png`}
      style={{width:size, height:size, aspectRatio:1,...style}}  
    />
  )
}
