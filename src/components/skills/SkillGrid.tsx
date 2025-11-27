import SkillCard from "./SkillCard";

type SupportGridProps ={
  list: Skill[];
  selected: Skill[];
  setSelected: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const SkillGrid: React.FC<SupportGridProps> = ({list, selected, setSelected}) => {
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:12, paddingTop:8}}>
      {list.map((s) => {
        const isSelected = !!selected.find(p=>p.id===s.id)
        return <SkillCard key={s.id} skill={s} selected={isSelected} setSelected={setSelected} />;
      })}
    </div>
  )
}

export default SkillGrid
