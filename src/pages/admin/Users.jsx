import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Button, TextField, Box,
} from '@mui/material';

const Users = () => {
  const [getUser, setGetUser] = useState([]);

  useEffect(() => {
    const handleUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getUsers/all?role=user', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)
        setGetUser(response.data)
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };
    handleUsers();
  }, [])

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>


        <Button variant="contained" color="outlined" sx={{ marginBottom: 2 }} >
          Users
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
              <TableCell>S.No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>password</TableCell>
              <TableCell>role</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
           <TableBody>

            {getUser && getUser.length > 0 ? (
              getUser.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.password}</TableCell>
                  <TableCell>{item.role}</TableCell>
                
                  {/* <TableCell sx={{ display: 'flex' }}>

                    <IconButton onClick={() => deleteHandler(item._id)}><DeleteIcon /></IconButton>
                    <IconButton onClick={() => handleOpenEditModal(item._id)}><EditIcon /></IconButton>


                  </TableCell> */}
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

      {/* <AddCalculationModal openModal={openModal} closeModal={handleCloseModal} onSave={handleSave} />
      <EditCalculationModal
        openEditModal={OpenEditModal}
        closeEditModal={handleCloseEditModal}
        editData={editData}
      /> */}

    </Box>
  )
}

export default Users