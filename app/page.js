import { Container, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const WelcomePage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}
      
    >
      <Card sx={{ width: '80%', maxWidth: '400px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Welcome!!
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            We are glad to have you here!
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" component={Link} href="/register" sx={{ mr: 2 }}>
              Register
            </Button>
            <Button variant="outlined" color="primary" component={Link} href="/login">
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WelcomePage;