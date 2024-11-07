import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    Container,
    TextField,
    Typography,
    Grid,
    Paper,
    Button,
    Box,
    CircularProgress,
    Card, CardContent, CardActions,
    Dialog, DialogTitle, DialogContent, DialogActions, Avatar
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
    const [contractors, setContractors] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchContractors = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/costs/contractor");
                setContractors(response.data);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || "There was an error fetching the data.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContractors();
    }, []);

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

            // Update contractors state to include the new contractor
            setContractors((prevContractors) => [...prevContractors, response.data.contractor]);
            console.log(response.data.contractor)
            setFormData(initialFormData); // Reset form data
            setFormOpen(false); // Close the form modal
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "There was an error submitting the data.");
            console.error("Error submitting form data:", error);
        }
    };


    const handleOpenForm = () => setFormOpen(true);
    const handleCloseForm = () => {
        setFormOpen(false);
        setFormData(initialFormData);
    };

    return (
        <Container maxWidth="md">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Contractor Details</Typography>
                <Button variant="contained" color="primary" onClick={handleOpenForm}>
                    Add Contract
                </Button>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : contractors.length > 0 ? (
                    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3}>
                        {contractors.map((contractor) => (
                            <Card
                                key={contractor._id}
                                sx={{
                                    width: "100%",
                                    maxWidth: "350px",
                                    paddingTop: 2,
                                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                                    borderRadius: "15px",
                                    transition: "transform 0.3s",
                                    "&:hover": {
                                        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
                                        transform: "scale(1.05)",
                                    },
                                    backgroundColor: "#f7f9fc",
                                }}
                            >
                                <Box display="flex" justifyContent="center">
                                    <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2" }}>
                                        {contractor.companyName.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" align="center" fontWeight="bold" color="#1976d2" gutterBottom>
                                        {contractor.companyName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                                        {contractor.profile}
                                    </Typography>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <EmailIcon sx={{ color: "#1976d2", mr: 1 }} />
                                            <Typography variant="body2">{contractor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <PhoneIcon sx={{ color: "#1976d2", mr: 1 }} />
                                            <Typography variant="body2">{contractor.phoneNumber}</Typography>
                                        </Box>
                                    </Box>
                                    <Box mt={2} borderTop="1px solid #e0e0e0" pt={2}>
                                        <Typography variant="subtitle2" color="textSecondary" fontWeight="bold">
                                            Charges:
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Labor Charge per Sq Ft: {contractor.laborChargePerSqFt}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Single Story Charge: {contractor.singleStoryCharge}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Two Story Charge: {contractor.twoStoryCharge}
                                        </Typography>
                                    </Box>
                                    <Box mt={2} borderTop="1px solid #e0e0e0" pt={2}>
                                        <Typography variant="subtitle2" color="textSecondary" fontWeight="bold">
                                            Rates:
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Home Design Approval: {contractor.rates.homeDesignApproval}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Excavation: {contractor.rates.excavation}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Footing Foundation: {contractor.rates.footingFoundation}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            RCC Work: {contractor.rates.RCCWork}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Roof Slab: {contractor.rates.roofSlab}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Brickwork Plastering: {contractor.rates.brickworkPlastering}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Flooring Tiling: {contractor.rates.flooringTiling}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Electric Wiring: {contractor.rates.electricWiring}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Water Supply Plumbing: {contractor.rates.waterSupplyPlumbing}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            Door: {contractor.rates.door}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
            ) : (
                <Typography>No contractor data available.</Typography>
            )}

            {/* Form Modal */}
            <Dialog open={formOpen} onClose={handleCloseForm} fullWidth maxWidth="md">
                <DialogTitle>Add Contractor</DialogTitle>
                <DialogContent>
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
                                        label={rateKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                        fullWidth
                                        type="number"
                                        value={formData.rates[rateKey]}
                                        onChange={(e) => handleInputChange(e, rateKey, true)}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ContractorForm;
