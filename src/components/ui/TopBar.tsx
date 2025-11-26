import React from 'react'
import {AppBar, Toolbar} from '@mui/material' 
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, styled } from '@mui/material/styles'
import IconButton from './IconButton'
import { useNavigate, useRouter } from '@tanstack/react-router'

const SearchRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: alpha(theme.palette.common.white, 0.06),
  padding: '2px 8px',
  margin: '2px 16px',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxWidth: 520,
}))

type TopBarProps = {
  query: string
  onQueryChange: (q: string) => void
}

const TopBar: React.FC<TopBarProps> = ({ query, onQueryChange}) => {
  const navigate = useNavigate()
  const router = useRouter()
  const {pathname} = router.latestLocation
  const icon = pathname==="/skills" ? "menu" : "book"
  const label = pathname==="/skills" ? "Deck" : "Skills"
  return (
    <>
      <AppBar position="fixed" color="success" elevation={2}>
        <Toolbar>
          <IconButton name="menu" size="small" color="inherit" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Typography variant="h6" component="div" sx={{ mr: 1, flexShrink: 0 }}>
              UMA Deck Builder
            </Typography>
            <SearchRoot aria-label="Search supports">
              <IconButton name="search" size="small" aria-hidden color="inherit" />
              <InputBase
                placeholder="Search by name, rarity or tag"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                inputProps={{ 'aria-label': 'Search supports' }}
                sx={{ ml: 1, flex: 1, color: 'white' }}
              />
              {query && (
                <IconButton 
                  name="clear" 
                  aria-label="Clear search" 
                  size="small" 
                  color="inherit"
                  onClick={() => onQueryChange('')}
                />
              )}
            </SearchRoot>
          </Box>
          <IconButton name={icon} label={label} size="small" color="inherit" onClick={()=>{
            navigate({
              to:pathname==="/skills" ? '/' : '/skills'
            })
          }}/>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  )
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default TopBar;