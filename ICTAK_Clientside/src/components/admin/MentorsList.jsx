//import React from 'react'
import Drawer from '@mui/material/Drawer';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const MentorsList = () => {
  const [data, setData] = useState([]);
  const [newMentor, setNewMentor] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    projectTopic: '',
  });
  const [openAdd, setOpenAdd] = useState(false);

  const [updateMentor, setMentorUpdate] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/admin/mentorslist')
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //add Mentor details
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleCloseAddDialog = () => {
    setNewMentor({
    name: '',
    email: '',
    phone: '',
    password: '',
    projectTopic: '',
    });
    setOpenAdd(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewMentor({ ...newMentor, [name]: value });
  };

  const handleAdd = async () => {
    if (!newMentor.name || !newMentor.email || !newMentor.phone || !newMentor.password || !newMentor.projectTopic) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axiosInstance.post(
        '/admin/addmentors',
        newMentor
      );
      setData([...data, response.data]);
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding Mentor:', error);
    }
  };

  // mentor data update operations
  const handleOpenUpdateDialog = (mentors) => {
    setMentorUpdate(mentor);
    setOpenUpdate(true);
  };

  const handleCloseUpdateDialog = () => {
    setMentorUpdate(null);
    setOpenUpdate(false);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setMentorUpdate({ ...updateMentor, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.patch(
        `/admin/updateMentor/${updateMentor._id}`,
        updateMentor
      );
      setData(
        data.map((mentor) =>
          mentor._id === updateMentor._id ? updateMentor : mentor
        )
      );
      handleCloseUpdateDialog();
    } catch (error) {
      console.error('Error updating Mentors:', error);
    }
  };

  //deleting Mentor details
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
    'Are you sure you want to delete this Mentor?'
  );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/admin/deletementor/${id}`);
        setData(data.filter((mentor) => mentor._id !== id));
      } catch (error) {
        console.error('Error deleting mentor:', error);
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
                    <ListItemIcon>{<PersonIcon />}</ListItemIcon>
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
        {/* add codes */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddDialog}
          >
            + Add Mentor
          </Button>
        </Box>

 {/* add tables to show the mentor list  */}
 <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Mentors</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Phone
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Password
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  ProjectTopic
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
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.password}</TableCell>
                  <TableCell align="right">{row.projectTopic}</TableCell>
                  <TableCell align="right">
                    {/* icons for update and delete */}
                    <IconButton onClick={() => handleOpenUpdateDialog(row)}>
                      <EditIcon color="primary" />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* dialog box for adding mentor */}
        <Dialog open={openAdd} onClose={handleCloseAddDialog}>
          <DialogTitle> Add Mentor</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={newMentor.name}
              onChange={handleAddInputChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="text"
              fullWidth
              value={newMentor.name}
              onChange={handleAddInputChange}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone"
              type="number"
              fullWidth
              value={newMentor.phone}
              onChange={handleAddInputChange}
            />
              <TextField
              margin="dense"
              name="password"
              label="Password"
              type="text"
              fullWidth
              value={newMentor.password}
              onChange={handleAddInputChange}
            />
              <TextField
              margin="dense"
              name="projecttopic"
              label="projectTopic"
              type="text"
              fullWidth
              value={newMentor.projectTopic}
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
          <DialogTitle>Edit Mentor</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={updateMentor?.name || ''}
              onChange={handleUpdateInputChange}
            />
              <TextField
              margin="dense"
              name="email"
              label="Email"
              type="text"
              fullWidth
              value={updateMentor?.email || ''}
              onChange={handleUpdateInputChange}
            />
             <TextField
              margin="dense"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              value={updateMentor?.phone || ''}
              onChange={handleUpdateInputChange}
            /> 
             <TextField
            margin="dense"
            name="password"
            label="Password"
            type="text"
            fullWidth
            value={updateMentor?.password || ''}
            onChange={handleUpdateInputChange}
          />
            <TextField
              margin="dense"
              name="projecttopic"
              label="projectTopic"
              type="text"
              fullWidth
              value={updateMentor?.projecttopic || ''}
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

export default MentorsList;
