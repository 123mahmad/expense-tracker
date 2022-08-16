import React, { useContext } from 'react'
import { Book } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Context } from '../App';



export const LeftBar = () => {

  let {library, user } = useContext(Context);

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar/>
      <Divider/>
      {(user && library) && <List>
        {
          library.map((book)=>{
            return (
            <ListItem key={book.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Book/>
                </ListItemIcon>
                <ListItemText primary={book.name}/>
              </ListItemButton>
            </ListItem>)
          })
        }
      </List>}
    </Drawer>
  )
}
