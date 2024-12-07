import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const CookList = ({ cookDetailsList }) => {
    return (
        <Grid container spacing={4} sx={{ padding: '20px' }}>
            {cookDetailsList.map((cook, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {cook.dish}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Cook: {cook.name}
                            </Typography>
                            <Typography variant="body1">
                                {cook.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Available Time: {cook.availableTime}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Price: ₹{cook.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                sx={{
                                    backgroundColor: '#ffc93c',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: '#ffb300',
                                    },
                                }}
                            >
                                Order Now
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CookList;
