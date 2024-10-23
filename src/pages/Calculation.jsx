import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox,
     IconButton, Button, TextField,  Box, 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCalculationModal from '../components/CalculationsUtils/AddCalculationModal';
// import EditCalculationModal from '../components/CalculationsUtils/EditCalculationModal';


const InvoiceTable = () => {
    const [getData, setGetData] = useState([]);
    const [deleteData, setDeleteData] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        const handleCalculation = async () => {
            try {
                const response = await axios.get('http://3.111.47.151:5000/api/calculations/all',{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setGetData(response.data)    
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };
        handleCalculation();
    }, [deleteData, openModal])

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`http://3.111.47.151:5000/api/calculations/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDeleteData(true)
        } catch (error) {
            console.error('Error deleting the data:', error);
        }
    };


    const handleOpenModal = () => {
        setOpenModal(true); 
    };

    const handleCloseModal = () => {
        setOpenModal(false); 
    };





    const handleSave = async (formData) => {
        try {
            const response = await axios.post('http://3.111.47.151:5000/api/calculations/add', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                console.log('Calculation added successfully:', response.data);
                setDeleteData((prev) => !prev);
            }
        } catch (error) {
            console.error('Error saving calculation:', error);
        }
    };


    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{
                display:'flex',
                justifyContent: 'space-between',
             }}>

            
                <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleOpenModal}>
                Calculation
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
                        <TableRow>
                            <TableCell><Checkbox /></TableCell>
                            <TableCell>S.No.</TableCell>
                         
                            <TableCell>Width</TableCell>
                            <TableCell>Length</TableCell>
                            <TableCell>Area</TableCell>
                            <TableCell>LabourCharge</TableCell>
                            <TableCell>ClubhousePercentage</TableCell>
                            <TableCell>GardenPercentage</TableCell>
                            <TableCell>SwimmingPoolPercentage</TableCell>
                            <TableCell>CarParkingPercentage</TableCell>
                            <TableCell>GymPercentage</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       
                        {getData && getData.length > 0 ? (
                            getData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>{index + 1}</TableCell> 
                                    
                                    <TableCell>{item.width}</TableCell>
                                    <TableCell>{item.length}</TableCell>
                                    <TableCell>{item.area}</TableCell>
                                    <TableCell>{item.labourCharge}</TableCell>
                                    <TableCell>{item.clubhousePercentage}</TableCell>
                                    <TableCell>{item.gardenPercentage}</TableCell>
                                    <TableCell>{item.swimmingPoolPercentage}</TableCell>
                                    <TableCell>{item.carParkingPercentage}</TableCell>
                                    <TableCell>{item.gymPercentage}</TableCell>
                                    <TableCell sx={{display:'flex'}}>
                                        <IconButton onClick={() => deleteHandler(item._id)}><DeleteIcon /></IconButton>
                                        <IconButton><EditIcon /></IconButton>
                                        
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={11} align="center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <AddCalculationModal openModal={openModal} closeModal={handleCloseModal} onSave={handleSave} />
        </Box>
    );
};

export default InvoiceTable;
