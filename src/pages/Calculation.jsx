import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import InfoIcon from '@mui/icons-material/Info';
import {
    Container,
    TextField,
    Typography,
    Grid,
    Paper,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Card, CardContent, CardActions
} from "@mui/material";

const initialFormData = {
    laborChargePerSqFt: '',
    singleStoryCharge: '',
    twoStoryCharge: '',
    email: '',
    phoneNumber: '',
    profile: '',
    companyName: '',
    rates: {
        homeDesignApproval: '',
        excavation: '',
        footingFoundation: '',
        RCCWork: '',
        roofSlab: '',
        brickworkPlastering: '',
        flooringTiling: '',
        electricWiring: '',
        waterSupplyPlumbing: '',
        door: '',
    },
};

const ContractorForm = () => {
    const userId = useSelector(({ auth: { user } }) => user._id);
    const [formData, setFormData] = useState(initialFormData);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e, field, isRate = false) => {
        const value = e.target.value;
        if (isRate) {
            setFormData((prevData) => ({
                ...prevData,
                rates: {
                    ...prevData.rates,
                    [field]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setErrorMessage('');

        try {
            const dataToSubmit = { ...formData, userId };
            const response = await axios.post("http://localhost:5000/api/costs/contractor", dataToSubmit);
            console.log("Form Data Submitted:", response.data);
            alert("Data submitted successfully!");
            setFormData(initialFormData);
        } catch (error) {
            const message = error.response?.data?.message || "There was an error submitting the data.";
            setErrorMessage(message);
            console.error("Error submitting form data:", error);
        }
    };

    const handleOpenModal = async () => {
        setModalLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.get("http://localhost:5000/api/costs/contractor");
            setModalData(response.data);
            setOpen(true);
        } catch (error) {
            const message = error.response?.data?.message || "There was an error fetching the data.";
            setErrorMessage(message);
            console.error("Error fetching data:", error);
        } finally {
            setModalLoading(false);
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
        setModalData([]);
    };

    return (
        <Container maxWidth="md">
            <Paper
                sx={{
                    padding: "2rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                }}
            >
                <Box sx={{
                    display: "flex", // Fixed typo here
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:'space-between',
                    paddingBottom:"10px",
                }}>
                    <Typography variant="h4">
                        Contractor Details
                    </Typography>
                    <Typography variant="h4" sx={{ marginLeft: "16px" }}> {/* Add margin for spacing if needed */}
                        <InfoIcon onClick={handleOpenModal} />
                    </Typography>
                </Box>
               
                {errorMessage && (
                    <Typography color="error" gutterBottom>
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Company Name"
                                fullWidth
                                value={formData.companyName}
                                onChange={(e) => handleInputChange(e, "companyName")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={formData.email}
                                onChange={(e) => handleInputChange(e, "email")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Phone Number"
                                fullWidth
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange(e, "phoneNumber")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Profile"
                                fullWidth
                                value={formData.profile}
                                onChange={(e) => handleInputChange(e, "profile")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Labor Charge per Sq Ft"
                                fullWidth
                                type="number"
                                value={formData.laborChargePerSqFt}
                                onChange={(e) => handleInputChange(e, "laborChargePerSqFt")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Single Story Charge"
                                fullWidth
                                type="number"
                                value={formData.singleStoryCharge}
                                onChange={(e) => handleInputChange(e, "singleStoryCharge")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Two Story Charge"
                                fullWidth
                                type="number"
                                value={formData.twoStoryCharge}
                                onChange={(e) => handleInputChange(e, "twoStoryCharge")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">Rates</Typography>
                        </Grid>
                        {Object.keys(formData.rates).map((rateKey) => (
                            <Grid item xs={6} key={rateKey}>
                                <TextField
                                    label={rateKey
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) => str.toUpperCase())}
                                    fullWidth
                                    type="number"
                                    value={formData.rates[rateKey]}
                                    onChange={(e) => handleInputChange(e, rateKey, true)}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <Button variant="contained"
                                color="primary"
                                fullWidth
                                type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Modal for showing contractor data */}
            <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="md">
                <DialogTitle>Contractor Details</DialogTitle>
                <DialogContent>
                    {modalLoading ? (
                        <CircularProgress />
                    ) : modalData.length > 0 ? (
                        <Box
                            display="flex"
                            flexDirection="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            gap={2} // Use gap for spacing between cards
                        >
                            {modalData.map((contractor) => (
                                <Card key={contractor._id} sx={{ flex: "1 1 30%", marginBottom: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>{contractor.companyName}</Typography>
                                        <Typography>Email: {contractor.email}</Typography>
                                        <Typography>Phone Number: {contractor.phoneNumber}</Typography>
                                        <Typography>Profile: {contractor.profile}</Typography>
                                        <Typography>Labor Charge per Sq Ft: {contractor.laborChargePerSqFt}</Typography>
                                        <Typography>Single Story Charge: {contractor.singleStoryCharge}</Typography>
                                        <Typography>Two Story Charge: {contractor.twoStoryCharge}</Typography>
                                        <Typography variant="h6" gutterBottom>Rates:</Typography>
                                        {Object.entries(contractor.rates).map(([key, value]) => (
                                            <Typography key={key}>
                                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: {value}
                                            </Typography>
                                        ))}
                                    </CardContent>
                                    <CardActions>
                                        {/* You can add additional buttons or actions here if needed */}
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No contractor data available.</Typography>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ContractorForm;
