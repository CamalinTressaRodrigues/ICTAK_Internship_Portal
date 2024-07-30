import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard, LibraryBooks } from '@mui/icons-material';
import { Button, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor'; // Import axios instance
import './Mentordashboard.css'; // Import your CSS file

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Specify Poppins as the default font
  },
});

export default function MentorDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/mentor/projects');
        console.log('API Response:', response.data);
        setData(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Fetch user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser?.email); // Set the user email
    }
  }, []);

  const handleView = (projectTopic) => {
    navigate(`/submissions/${projectTopic}`);
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="5vh"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100vw' }}>
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
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 2, width: `calc(100% - ${drawerWidth}px)`, boxSizing: 'border-box', overflowX: 'hidden' }}>
        <Toolbar />
          <div className="container">
            <img
              src="https://jobick.dexignlab.com/react/demo/static/media/profile1.45c723dab8349c3d75ef.jpg"
              alt="Background"
              className="bg-image"
            />
            <div className="content">
              <div className="profile-pic">
                <img
                  src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                  alt="Employee Profile"
                  className="profile-image"
                />
              </div>
              <div className="profile-details">
                <h4 className="employee-name">{user}</h4>
              </div>
              
              <Button variant="contained" className="update-profile-button"
              >Update Profile</Button>
            </div>
          </div>
          <Typography variant="h4" className="project-head">
            Projects
          </Typography>
          <div className="card-container">
            {data.map((projectTopics) => (
              <Card key={projectTopics.id} className="project-card">
                <CardMedia
                  component="img"
                  src="https://cdn-jokon.nitrocdn.com/AwoEWBPBIgGShARSNTzFxrQfWkDFHrAw/assets/images/optimized/rev-470ca55/www.rankraze.com/wp-content/uploads/2023/07/internship-blue-green-typography-banner-260nw-1366933799-e1690735957752.webp"
                  alt="Project"
                  className="project-image"
                />
                <CardContent className="project-card-details">
                  <Typography variant="h6" className="project-card-title">
                  {projectTopics}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    className="view-button"
                    onClick={() => handleView(projectTopics)}
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}