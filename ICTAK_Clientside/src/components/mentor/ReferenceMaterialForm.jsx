import { useState } from 'react';
import { Box, Button, createTheme, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material';
import axiosInstance from '../axiosinterceptor';
import { Link, useNavigate } from 'react-router-dom';
import { Dashboard, LibraryBooks } from '@mui/icons-material';

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});
const Image = 'https://images.pexels.com/photos/4467858/pexels-photo-4467858.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

const ReferenceMaterialForm = () => {
  const [newMaterial, setNewMaterial] = useState({
    topic: '',
    referenceMaterial: '',
    postedDate: '',
    status: '',
    url: '' // Add url field
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Added Data:', newMaterial);
    try {
      const response = await axiosInstance.post('/reference/add', newMaterial);
      console.log(response.data);
      alert('New Material added Successfully');
      navigate('/reference-materials');
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const handleCancel = () => {
    navigate('/reference-materials');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            backgroundColor: '#fff'
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/mentordashboard"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)', // Default text color
                  }}
                >
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/reference-materials"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)', // Default text color
                  }}
                >
                  <ListItemIcon>
                    <LibraryBooks />
                  </ListItemIcon>
                  <ListItemText primary="Reference Materials" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Drawer>
        <Box sx={{ flex: 1, p: 3, marginLeft:'30px', display: 'flex', gap: 3, marginTop: '65px' }}>
          <Box sx={{ width: '60%' }}>
            {/* <Typography variant="h4" gutterBottom>
              Reference Materials Addition
            </Typography> */}
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="topic"
                name="topic"
                label="Topic"
                value={newMaterial.topic}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                id="referenceMaterial"
                name="referenceMaterial"
                label="Reference Material"
                value={newMaterial.referenceMaterial}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                id="postedDate"
                name="postedDate"
                label="Posted Date"
                type="date"
                value={newMaterial.postedDate}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id="url"
                name="url"
                label="URL"
                value={newMaterial.url}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                id="status"
                name="status"
                label="Status"
                value={newMaterial.status}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mr: 2 }}>
                Submit
              </Button>
              <Button type="button" variant="contained" color="secondary" sx={{ mt: 3 }} onClick={handleCancel}>
                Cancel
              </Button>
            </form>
          </Box>
          <Box sx={{width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              component="img"
              sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              alt="Employee form image"
              src={Image}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ReferenceMaterialForm;