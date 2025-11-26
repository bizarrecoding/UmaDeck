import MUIIconButton, { type IconButtonProps as MUIIconButtonProps} from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'
import FilterIcon from '@mui/icons-material/FilterAlt'
import CloseIcon from '@mui/icons-material/Close'
import ClearIcon from '@mui/icons-material/Clear'
import MenuIcon from '@mui/icons-material/Menu'
import BookIcon from '@mui/icons-material/MenuBook'


type IconButtonProps = MUIIconButtonProps & {
  name: string;
  label?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ name, label,...rest })=>{
  return (
    <MUIIconButton {...rest}>
      {label ? <span style={{marginRight:4}}>{label}</span> : null}
      {name==="search" ? <SearchIcon  /> : null}
      {name==="close" ? <CloseIcon /> : null}
      {name==="clear" ? <ClearIcon /> : null}
      {name==="filter" ? <FilterIcon /> : null}
      {name==="menu" ? <MenuIcon /> : null}
      {name==="book" ? <BookIcon /> : null}
    </MUIIconButton>
  )
}

export default IconButton
