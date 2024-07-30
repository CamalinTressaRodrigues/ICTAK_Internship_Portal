import { useState, useEffect } from 'react';
import axiosInstance from '../axiosinterceptor';
import {
  Button, Box, CircularProgress, Alert, IconButton, TableCell, TableRow, TableBody, TableHead, Table,  Grid, Paper,
  ThemeProvider,
  CssBaseline,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dashboard, LibraryBooks } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

const ReferenceMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [openMaterialDelete, setOpenMaterialDelete] = useState(false);

  const fetchMaterials = async () => {
    try {
      const response = await axiosInstance.get('/reference/'); // Adjust the endpoint as necessary
      setMaterials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching materials:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleAdd = () => {
    navigate(`/reference-materials-form`);
  };

  const handleDeleteMaterial = (id) => {
    setCurrentMaterial(id);
    setOpenMaterialDelete(true);
  };

  const confirmDeleteMaterial = async () => {
    try {
      await axiosInstance.delete(`/reference/${currentMaterial}`);
      setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== currentMaterial));
      setOpenMaterialDelete(false);
      setCurrentMaterial(null);
    } catch (error) {
      console.error('Error deleting material:', error);
      setOpenMaterialDelete(false);
      setCurrentMaterial(null);
    }
  };

  const handleCloseMaterial = () => {
    setOpenMaterialDelete(false);
    setCurrentMaterial(null);
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%', p:3, ml:'drawerWidth' }}>
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
    <Box p={2} sx={{ marginTop: '55px'}}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button onClick={handleAdd} variant="contained" color="primary">
           + Add Reference Material
          </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Table sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Topic</TableCell>
                  <TableCell>Reference Material</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material._id}>
                    <TableCell>{material.topic}</TableCell>
                    <TableCell>
                      <a href={material.referenceMaterial} target="_blank" rel="noopener noreferrer">
                        {material.referenceMaterial}
                      </a>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteMaterial(material._id)} >
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={openMaterialDelete} onClose={handleCloseMaterial}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this reference material?</DialogContentText>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleCloseMaterial} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDeleteMaterial} color="secondary">
                Confirm
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
    </Box>
    </Box>
    </ThemeProvider>
  );
};

export default ReferenceMaterial;