import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const restaurantData = {
  'Vijayawada': ['Pizza Palace', 'Sushi World'],
  'Guntur': ['Burger King', 'Indian Spice'],
  'Hyderabad': ['Thai Delight'],
};

function DiningOptions() {
  const [selectedLocation, setSelectedLocation] = useState('Vijayawada');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleReserve = (restaurant) => {
    if (selectedDate && selectedTime) {
      alert(`Reservation made at ${restaurant} on ${selectedDate.toLocaleDateString()} at ${selectedTime.toLocaleTimeString()}`);
    } else {
      alert('Please select both a date and time');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dining Options
        </Typography>

        {/* Location Selector */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="location-select-label">Select Location</InputLabel>
          <Select
            labelId="location-select-label"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {Object.keys(restaurantData).map((location) => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {restaurantData[selectedLocation].map((restaurant) => (
            <Card key={restaurant} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">{restaurant}</Typography>

                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ mb: 2 }}
                />

                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={(newTime) => setSelectedTime(newTime)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#ffc93c', color: '#000' }} // Change only the button color to yellow
                  onClick={() => handleReserve(restaurant)}
                >
                  Reserve
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default DiningOptions;
