import React, { useRef } from 'react'
import Input from '@mui/material/Input';
import IconButton from '../ui/IconButton';

type SearchBarProps = React.PropsWithChildren<{
  showFilter?: boolean
  placeholder?: string;
  containerStyle?: React.CSSProperties;
  textStyle?:  React.CSSProperties;
  onSearch: (_text:string)=>void
  onFilter?: ()=>void
}>
const SearchBar: React.FC<SearchBarProps> =({ children, placeholder, onSearch, containerStyle, textStyle, onFilter }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div style={{ ...containerStyle}}>
      <div style={{display:"flex", flexDirection: "row", alignItems:"center" }}>
        <div style={{display:"flex",flexGrow:1, flexDirection:"row", alignItems:"center", padding:"6px 12px", backgroundColor:"#CCCDCE", borderRadius:24 }}>
          <IconButton name="search" sx={{ marginRight:12 }}/>
          <Input
            ref={inputRef}
            aria-label="Search supports"
            placeholder={placeholder}
            onChange={(e)=>onSearch(e.target.value)}
            style={{display:"flex", flex:1, boxSizing:'border-box', border:0,backgroundColor:"#CCCDCE",...textStyle}}
          />  
          <IconButton name="close" onClick={()=>inputRef.current}/> 
        </div>
        <IconButton name="filter" onClick={()=>onFilter?.()}/>
      </div>
      {children}
    </div>
  )
}

export default SearchBar