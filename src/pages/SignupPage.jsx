import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import useResponsive from '../hooks/useResponsive';

import Logo from '../components/logo';
import SignUpForm from '../sections/auth/Signup/SignUpForm';



const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignUpPage() {
    const mdUp = useResponsive('up', 'md');

    return (
        <>
            <Helmet>
                <title> Sign up  </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back    
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Sign Up
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Already have an account?{' '}
                            <Link variant="subtitle2" component={RouterLink} to="/login">
                                Sign In
                            </Link>
                        </Typography>
                       
                        <SignUpForm />
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}