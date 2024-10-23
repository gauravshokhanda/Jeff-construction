import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';
import { setArea } from "../../redux/Slices/areaSlice"

// eslint-disable-next-line react/prop-types
const AreaCard = ({ area, onClose }) => {
    const dispatch = useDispatch();
    return(
        <Container sx={{
            position: 'absolute',
            top: '30%',
            right: '0',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            width: '300px',
        }}>
            <Card variant="outlined" style={{ width: '300px' }}>
                <CardContent>
                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                        Area
                    </Typography>
                    <Typography variant="body1">{area.toFixed(2)} m²</Typography>
                </CardContent>
                <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                        dispatch(setArea(area)); 
                        onClose(); 
                    }}
                >Continue</Button>
                <Button variant="outlined" color="error" style={{ margin: '10px' }} onClick={onClose}>
                    Close
                </Button>
            </Card>
        </Container>
    )
};

AreaCard.propTypes = {
    area: PropTypes.number.isRequired,  
    onClose: PropTypes.func.isRequired, 
};

export default AreaCard;
