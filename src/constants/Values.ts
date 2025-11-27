export type Groups = "speed"|"stamina"|"power"|"guts"|"wit"|"others"
export const EffectKeyGroups: Groups[]= ["speed","stamina","power","guts","wit","others"]
export const EffectGroups: Record<Groups, number[]> = {
  "speed":[3,9],
  "stamina":[4,10],
  "power":[5,11],
  "guts":[6,12],
  "wit":[7,13],
  "others":[15,16]
}
export const EffectMap: Record<string,string|undefined> = {
  "1":"Friendship Bonus", 
  "2":"Mood Effect", 
  "3":"Speed Bonus", 
  "4":"Stamina Bonus", 
  "5":"Power Bonus", 
  "6":"Guts Bonus", 
  "7":"Wit Bonus",
  "8": "Training Effectiveness",
  "9":"Initial Speed",
  "10":"Initial Stamina",
  "11":"Initial Power",
  "12":"Initial Guts",
  "13":"Initial Wit ",
  "14":"Initial Friendship Gauge",
  "15":"Race Bonus",
  "16":"Fan Bonus",
  "17":"Hint Level",
  "18":"Hint Frequency",
  "19":"Specialty Priority",
  "20":undefined,
  "21":undefined,
  "22":undefined,
  "23":undefined,
  "24":undefined,
  "25":"Event Recovery",
  "26":"Event Effectiveness",
  "27":"Failure Protection",
  "28":"Energy Cost Reduction",
  "29":undefined,
  "30":"Skill Bonus",
  "31":"Wit Friendship Recovery",
}

