import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface SkillState { 
  selected: Skill[]
}

const initialState: SkillState = {
  selected: [],
}

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Skill>) => { 
      state.selected =  [...state.selected,action.payload]
    },
    remove: (state, action: PayloadAction<Skill>) => { 
      state.selected =  state.selected.filter(s=>s.id!==action.payload.id)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = skillsSlice.actions

export default skillsSlice.reducer
