type Stat = "speed"|"stamina"|"power"|"guts"|"wit"|"intelligence"|"friend"

interface Skill extends SkillDataD, SkillMeta {
  id: string;
  name: string; 
	tags: string[];
	explicit_tags: string[];
}

interface SkillDataD {
	alternatives: Alternative[];
	rarity: number;
}

interface SkillMeta {
  baseCost: number;
  groupId: number;
  iconId: string;
  order: number;
}

interface Alternative {
	baseDuration: number;
	condition: string;
	effects: Effect[];
	precondition: string;
}

interface Effect {
	modifier: number;
	target: number;
	type: number;
}
interface Hint {
  hint_type:number;
  hint_value:number;
}

interface SupportRaw {
  support_id:number;
  char_id:number;
  char_name:string;
  rarity:number;
  type: Stat;
  effects: number[][];
  event_skills: number[];
  release_en: string;
  hints: {
    hint_others: Hint[]
    hint_skills: string[];
  }
  unique:{
    effects: Record<string,number>[]
    level: number;
  }
}

type Support = Omit<SupportRaw,"hints"|"event_skills"> & {
  event_skills: Skill[];
  hints: {
    hint_others: Hint[];
    hint_skills: Skill[];
  }
  rarity_string:string;
  tags: string[];
}