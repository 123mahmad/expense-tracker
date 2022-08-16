import React, { useContext } from 'react'
import { signIn, signOutUser, getProfilePicUrl } from '../firebase';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { Context } from '../App';


export const TopBar = () => {

  let { user } = useContext(Context);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{justifyContent: 'center'}}>
        <Typography sx={{marginRight: 'auto'}}>Expense Tracker</Typography>
        {!user && <IconButton onClick={signIn}><Avatar sx={{marginRight: '10px'}}/>Sign In</IconButton>}
        {user && <Typography sx={{marginLeft: '10px'}}>{user.displayName}</Typography>}
        {user && <IconButton onClick={signOutUser}><Avatar src={`${getProfilePicUrl}`} sx={{marginRight: '10px'}}/>Sign Out</IconButton>}
      </Toolbar>
    </AppBar>
  )
}
