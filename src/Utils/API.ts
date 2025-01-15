import axios from 'axios';

const apiKey = '15e3934bc4mshf186db97633dddcp1db6c7jsn50c2adecdbd8';
const baseURL = 'https://api.apiheya.com/api/v1/flights/';

const headers = {
  'X-RapidAPI-Key': apiKey,
  'X-RapidAPI-Host': 'apiheya.p.rapidapi.com',
};

// Fetch nearby airports based on latitude and longitude
export const getNearbyAirports = async (lat, lng) => {
  try {
    const response = await axios.get(`${baseURL}getNearByAirports`, {
      headers,
      params: { lat, lng },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby airports:', error);
    throw error;
  }
};

// Search for airports by name or location (city, address, etc.)
export const searchAirport = async (query) => {
  try {
    const response = await axios.get(`${baseURL}searchAirport`, {
      headers,
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for airport:', error);
    throw error;
  }
};

// Search for flights between two airports
export const searchFlights = async (originSkyId, destinationSkyId, originEntityId, destinationEntityId, date, optionalParams = {}) => {
  try {
    const response = await axios.get(`${baseURL}searchFlights`, {
      headers,
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        ...optionalParams, // Optional params like returnDate, adults, etc.
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for flights:', error);
    throw error;
  }
};

