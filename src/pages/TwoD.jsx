import React, {useState } from 'react';
import axios from 'axios';
import {
    Table,  TableCell, TableContainer, TableHead, TableRow, Checkbox,
    Button, TextField, Box,
} from '@mui/material';
import AddCalculationModal from '../components/TwoDUtils/AddTwoDModal';


const TwoD = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSave = async (formData) => {
        try {
            const response = await axios.post('http://3.111.47.151:5000/api/2d-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                console.log('Calculation added successfully:', response.data);
               
            }
        } catch (error) {
            console.error('Error saving calculation:', error);
        }
    };


    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>


                <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleOpenModal}>
                    Add
                </Button>

                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell><Checkbox /></TableCell>
                            <TableCell>S.No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Calculation</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>

            <AddCalculationModal openModal={openModal} closeModal={handleCloseModal} onSave={handleSave} />

        </Box>
    );
};

export default TwoD;
