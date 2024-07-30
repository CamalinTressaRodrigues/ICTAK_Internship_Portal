import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { Button, Grid, TextField } from '@mui/material';
import axiosInstance from '../axiosinterceptor';
import './Mentordashboard.css';

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '16px',
          fontWeight: 600,
        },
      },
    },
  },
});

export default function ClippedDrawer() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [marks, setMarks] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendError, setBackendError] = useState(''); // State to handle backend errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axiosInstance.get(`/submission/get/${id}`);
        setSubmission(response.data);
        setMarks(response.data.marks || '');
        setComments(response.data.comments || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching submission:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      // Assuming submission.evaluationStatus determines if it's already evaluated
      if (submission.evaluationStatus === true) {
        // Update existing evaluation
        response = await axiosInstance.put(`/submission/${id}`, {
          marks,
          comments,
        });
        console.log('Evaluation updated:', response.data);
      } else {
        // Evaluate a new submission
        response = await axiosInstance.post(`/submission/${id}/evaluate`, {
          marks,
          comments,
        });
        console.log('Submission evaluated:', response.data);
      }
      // Navigate back to submissions after evaluation or update
      navigate(`/submissions/${submission?.projectTopic}`);
    } catch (error) {
      console.error('Error evaluating or updating submission:', error);
      if (error.response && error.response.data && error.response.data.msg) {
        setBackendError(error.response.data.msg); // Set backend error message
      } else {
        setBackendError('An unexpected error occurred.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading submission</p>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: { xs: '100%', sm: drawerWidth },
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: { xs: '100%', sm: drawerWidth }, boxSizing: 'border-box' },
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
        <Box component="main" sx={{ flexGrow: 1, marginTop: '35px', width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }, boxSizing: 'border-box', overflowX: 'hidden' }}>
          <Toolbar />
          <Typography className="project-head" sx={{ paddingLeft: 4 }}>
            <h6>Topic:</h6>
          </Typography>
          <Typography sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2, paddingLeft: 4 }}>
            {submission?.projectTopic}
          </Typography>
          <div style={{ position: 'relative', marginLeft: 30, marginTop: 20 }}>
            <Typography className="project-head">
              <h6>Submission:</h6>
            </Typography>
            <TextField
              style={{ marginBottom: '30px', marginTop: 20 }}
              className="textField"
              disabled
              id="outlined"
              label=""
              defaultValue={`Repo Link: https://github.com/\nHost link: https://aws.amazon.com/`}
              variant="outlined"
              multiline
              rows={5}
            />
          </div>
          <div style={{ marginTop: 20, marginBottom: 30, paddingLeft: 30 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Mark"
                  variant="outlined"
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={8} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Comments"
                  variant="outlined"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          {backendError && <span style={{ color: 'red', paddingLeft: '30px' }}>{backendError}</span>} {/* Display backend error */}
          <div className="button-container" style={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#024acf', color: 'white' }}
              onClick={handleSubmit}
            >
              Update
            </Button>
            <Link to={`/submissions/${submission.projectTopic}`}>
              <Button variant="outlined" style={{ marginLeft: '30px' }}>
                Cancel
              </Button>
            </Link>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
