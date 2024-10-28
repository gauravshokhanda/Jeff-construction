import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox,
    IconButton, Button, TextField, Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCalculationModal from '../components/TwoDUtils/AddTwoDModal';
import EditTwoDModal from "../components/TwoDUtils/EditTwoDModal"


const TwoD = () => {
    const [getData, setGetData] = useState([]);
    const [deleteData, setDeleteData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [OpenEditModal, setOpenEditModal] = useState(false);
    const [editData, setEditData] = useState(null);
    


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    useEffect(() => {
        const handleCalculation = async () => {
            try {
                const response = await axios.get('http://3.111.47.151:5000/api/2d-images/', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data)
                setGetData(response.data)
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };
        handleCalculation();
    }, [deleteData, openModal, OpenEditModal])

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`http://3.111.47.151:5000/api/2d-images/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDeleteData(true)
        } catch (error) {
            console.error('Error deleting the data:', error);
        }
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


    const handleOpenEditModal = async (id) => {

        try {
            const response = await axios.get(`http://3.111.47.151:5000/api/2d-images/${id}`);
            setOpenEditModal(true);
            setEditData(response.data)
            console.log('edit data', response.data)
        } catch (error) {
            console.error('Error fetching the data for editing:', error);
        }
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
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
                    <TableBody>

                        {getData && getData.length > 0 ? (
                            getData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.image ? (
                                            <img
                                                src={`http://3.111.47.151:5000/${item.image.replace(/\\/g, '/')}`}
                                                alt={item.name}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                        ) : (
                                            'No Image'
                                        )}
                                    </TableCell>
                                    <TableCell>{item.calculation.name}</TableCell>

                                    <TableCell sx={{ display: 'flex' }}>
                                        <IconButton onClick={() => deleteHandler(item._id)}><DeleteIcon /></IconButton>
                                        <IconButton onClick={() => handleOpenEditModal(item._id)}><EditIcon /></IconButton>

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
            <EditTwoDModal
                openEditModal={OpenEditModal}
                closeEditModal={handleCloseEditModal}
                editData={editData}
            />

        </Box>
    );
};

export default TwoD;
