//import React from 'react'
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosinterceptor';
import Drawer from '@mui/material/Drawer';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';

const drawerWidth = 240;

const ProjectsList = () => {
  const [data, setData] = useState([]);
  const [newProject, setNewProject] = useState({
    topic: '',
    // stack: '',
    duration: '',
  });
  const [openAdd, setOpenAdd] = useState(false);

  const [updateProject, setProjectUpdate] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/admin/projectslist')
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //add new project details
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleCloseAddDialog = () => {
    setNewProject({
      topic: '',
      // stack: '',
      duration: '',
    });
    setOpenAdd(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAdd = async () => {
    if (!newProject.topic  || !newProject.duration) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axiosInstance.post(
        '/admin/addproject',
        newProject
      );
      setData([...data, response.data]);
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // project data update operations
  const handleOpenUpdateDialog = (project) => {
    setProjectUpdate(project);
    setOpenUpdate(true);
  };

  const handleCloseUpdateDialog = () => {
    setProjectUpdate(null);
    setOpenUpdate(false);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setProjectUpdate({ ...updateProject, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      console.log('Updating project:', updateProject);
      await axiosInstance.patch(
        `/admin/updateproject/${updateProject._id}`,
        updateProject
      );
      setData(
        data.map((proj) =>
          proj._id === updateProject._id ? updateProject : proj
        )
      );
      handleCloseUpdateDialog();
    } catch (error) {
      console.error('Error updating Project:', error);
    }
  };

  //deleting project details
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
    'Are you sure you want to delete this project?'
  );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/admin/deleteproject/${id}`);
        setData(data.filter((project) => project._id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <Box
      sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          backgroundColor: '#fff',
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Link to={'/admin'}>
            <List>
              {['Dashboard'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    sx={{
                      color: 'rgba(0, 0, 0, 0.87)', // Default text color
                    }}
                  >
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Link>

          <Link to={'/admin/mentorslist/'}>
            <List>
              {['Mentors'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    sx={{
                      color: 'rgba(0, 0, 0, 0.87)', // Default text color
                    }}
                  >
                    <ListItemIcon>{ <Dashboard /> }</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Link> 

          <Divider />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '65px' }}>
        {/* button to add project on right side */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddDialog}
          >
            + Add Project
          </Button>
        </Box>

        {/* add tables to show the project list  */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Projects</TableCell>
                {/* <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Stack
                </TableCell> */}
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Duration
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.topic}
                  </TableCell>
                  {/* <TableCell align="right">{row.stack}</TableCell> */}
                  <TableCell align="right">{row.duration}</TableCell>
                  <TableCell align="right">
                    {/* icons for updatte and delete */}
                    <IconButton onClick={() => handleOpenUpdateDialog(row)}>
                      <EditIcon color="primary" />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon  style={{ color: 'red' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* dialog box for adding project */}
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle> Add Project</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="topic"
              label="Topic"
              type="text"
              fullWidth
              value={newProject.topic}
              onChange={handleAddInputChange}
            />
            <TextField
              margin="dense"
              name="duration"
              label="Duration"
              type="text"
              fullWidth
              value={newProject.duration}
              onChange={handleAddInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* dialog box for updating  */}
        <Dialog open={openUpdate} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="topic"
              label="Topic"
              type="text"
              fullWidth
              value={updateProject?.topic || ''}
              onChange={handleUpdateInputChange}
            />
            <TextField
              margin="dense"
              name="duration"
              label="Duration"
              type="text"
              fullWidth
              value={updateProject?.duration || ''}
              onChange={handleUpdateInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ProjectsList;