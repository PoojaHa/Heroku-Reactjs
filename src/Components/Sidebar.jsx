import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#333',
          color: '#fff'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {/* Map through the items and navigate when clicking on them */}
        <ListItem button onClick={() => navigate('/')} key="Home" style={{cursor:"pointer"}}>
          <ListItemIcon>
            <HomeIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={() => navigate('/task')} key="Tasks" style={{cursor:"pointer"}}>
          <ListItemIcon>
            <ListAltIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>

        <ListItem button key="Projects"style={{cursor:"pointer"}}>
          <ListItemIcon>
            <FolderIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>

        <ListItem button key="Team"style={{cursor:"pointer"}}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Team" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;