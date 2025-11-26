import React, { useMemo } from 'react' 
import { useDispatch } from 'react-redux'
import { tags } from '../../assets/data/skills'
import { EffectKeyGroups } from '../../constants/Values'
import { addTag, removeTag } from '../../redux/tagsSlice'
import { capitalize } from '../../util/strings'
import { Box, Chip, styled } from '@mui/material'
 
type TagPickerProps = {
  active?: string[] 
  show?: boolean
}

const TagPicker: React.FC<TagPickerProps> = ({ active=[] }) => {
  const dispatch = useDispatch()
  const onPressTag = (tag:string, isActive: boolean)=>{
    if(!isActive) dispatch(addTag(tag))
    else dispatch(removeTag(tag))
  }

  const tagList = useMemo(() => {
    const l = Object.keys(tags).concat(EffectKeyGroups) 
    return l.sort((a,b)=>{
      const _a = active.includes(a) 
      const _b = active.includes(b) 
      if(_a === _b) return 0 
      if(_a !== _b) return _a ? -1 : 1
      return 0
    })
  }, [active])
 
  return (
    <ChipsRow aria-label="Filter by tags">
      {tagList.map((t) => {
        const selected = active.includes(t)
        return (
          <Chip
            key={t}
            label={capitalize(t)}
            clickable
            size='small'
            style={{padding:"0px 8px"}}
            color={selected ? 'success' : 'default'}
            variant={selected ? 'filled' : 'outlined'}
            onClick={() => onPressTag(t,selected)}
          />
        )
      })}
    </ChipsRow>
  )
}

export default TagPicker

const ChipsRow = styled(Box)({
  display: 'flex',
  gap: 8,
  overflowX: 'auto',
  padding: '8px 0',
  WebkitOverflowScrolling: 'touch',
})
