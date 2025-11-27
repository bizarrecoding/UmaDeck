import { CardActions as MUICardActions, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import OpenIcon from '@mui/icons-material/OpenInNew'

type CardActionsProps = { 
  selected: boolean;
  url?: string;
  onToggle: () => void;
  onOpen?: () => void;
}

const CardActions = ({ selected, onToggle, url, onOpen }: CardActionsProps) => {
  return (
    <MUICardActions onToggle={undefined}>
      {onOpen ? (
        <IconButton aria-label="Open details" onClick={onOpen} size="small">
          <OpenIcon />
        </IconButton>
      ):null}
      <IconButton aria-label={selected ? 'Remove card' : 'Add card'} onClick={onToggle} size="small">
        {selected ? <RemoveIcon /> : <AddIcon />}
      </IconButton>
      {url ? (
        <IconButton aria-label="Open details" component="a" href={url} target="_blank" rel="noopener noreferrer" size="small">
          <OpenInNewIcon />
        </IconButton>
      ) : null}
    </MUICardActions>
  )
}

export default CardActions 