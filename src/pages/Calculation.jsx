import React, { useState, useEffect } from "react";
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
    CircularProgress,
    Card, CardContent, CardActions,
    Dialog, DialogTitle, DialogContent, DialogActions,
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
    }, [formData]);

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
            alert("Data submitted successfully!");
            setContractors((prev) => [...prev, response.data]);
            setFormData(initialFormData);
            setFormOpen(false);
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
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
                    {contractors.map((contractor) => (
                        <Card
                            key={contractor._id}
                            sx={{
                                flex: "1 1 30%",
                                marginBottom: 4,
                                boxShadow: 3,
                                borderRadius: 2,
                                bgcolor: "#f5f5f5", // Light background color
                                padding: 2
                            }}
                        >
                            <CardContent>
                                {/* Company Name */}
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#1976d2", // Primary color
                                        marginBottom: 1
                                    }}
                                >
                                    {contractor.companyName}
                                </Typography>

                                {/* Email with bold label */}
                                <Typography sx={{ display: "flex", marginBottom: 1 }}>
                                    <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>Email:</Typography>
                                    {contractor.email}
                                </Typography>

                                {/* Phone Number */}
                                <Typography sx={{ display: "flex", marginBottom: 1 }}>
                                    <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>Phone Number:</Typography>
                                    {contractor.phoneNumber}
                                </Typography>

                                {/* Profile */}
                                <Typography sx={{ display: "flex", marginBottom: 1 }}>
                                    <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>Profile:</Typography>
                                    {contractor.profile}
                                </Typography>

                                {/* Labor Charges */}
                                <Typography sx={{ display: "flex", marginBottom: 1 }}>
                                    <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>Labor Charge per Sq Ft:</Typography>
                                    {contractor.laborChargePerSqFt}
                                </Typography>
                                <Typography sx={{ display: "flex", marginBottom: 1 }}>
                                    <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>Single Story Charge:</Typography>
                                    {contractor.singleStoryCharge}
                                </Typography>
                                <Typography sx={{ display: "flex", marginBottom: 1 }}>
                                    <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>Two Story Charge:</Typography>
                                    {contractor.twoStoryCharge}
                                </Typography>

                                {/* Rates Section */}
                                <Typography variant="h6" gutterBottom sx={{ marginTop: 2, fontWeight: "bold", color: "#424242" }}>
                                    Rates:
                                </Typography>
                                {contractor.rates
                                    ? Object.entries(contractor.rates).map(([key, value]) => (
                                        <Typography
                                            key={key}
                                            sx={{ marginLeft: 2, color: "#555" }}
                                        >
                                            {/* Displaying the key (label) in bold and value next to it */}
                                            <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                                            </Typography>
                                            {value}
                                        </Typography>
                                    ))
                                    : <Typography>No rates available</Typography>
                                }
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
