import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface TagState { 
  tags: string[]
}

const initialState: TagState = {
  tags: [],
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => { 
      state.tags =  [...state.tags,action.payload]
    },
    removeTag: (state, action: PayloadAction<string>) => { 
      state.tags =  state.tags.filter(t=>t!==action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTag, removeTag } = tagsSlice.actions

export default tagsSlice.reducer
