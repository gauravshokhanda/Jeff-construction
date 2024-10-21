import React from 'react'
import { Container, Typography,  Card, CardContent, Button } from '@mui/material'

const CoordinatesForm = () => {
  return (
   <>
          <Container sx={{
              position: 'absolute',
              top: '-20%',
              right: '50%',
              transform: 'translateY(-50%,-50)',
              zIndex: 1000,
              width: '300px',
          }}> 
          <Typography>Latitude</Typography>
              <Card variant="outlined" style={{ width: '300px' }}>
                  <CardContent>
                      <Typography variant="h6" style={{ marginTop: '20px' }}>
                          Area
                      </Typography>
                      {/* <Typography variant="body1"></Typography> */}
                  </CardContent>
                  <Button variant="contained" color="primary" style={{ margin: '10px' }}>
                      Close
                  </Button>
              </Card>
          </Container>
   </>
  )
}

export default CoordinatesForm