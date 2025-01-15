import React, { useState, useEffect } from 'react';
import { CalendarIcon, ChevronDownIcon, GlobeIcon, LuggageIcon, MapIcon, MenuIcon, PlaneTakeoffIcon, SearchIcon, UserIcon } from 'lucide-react';

// Function to fetch flight data
const fetchFlights = async (originSkyId, destinationSkyId, originEntityId, destinationEntityId, date) => {
  const apiUrl = `https://api.example.com/api/v1/flights/searchFlights`; // Replace with actual API URL
  const params = new URLSearchParams({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
  });

  try {
    const response = await fetch(`${apiUrl}?${params}`);
    const data = await response.json();
    return data.data; // Assuming 'data' contains the flight details
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};

export default function Component() {
  const [flights, setFlights] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState('Economy');

  const handleSearch = async () => {
    // Example values, replace with actual SkyId and EntityId
    const originSkyId = 'NYCA';  // For example: New York (Any)
    const destinationSkyId = 'LAX'; // For example: Los Angeles (LAX)
    const originEntityId = '27537542';  // Replace with actual entityId
    const destinationEntityId = '27537543'; // Replace with actual entityId
    const date = departureDate;

    const flightResults = await fetchFlights(
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date
    );

    setFlights(flightResults);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <PlaneTakeoffIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Google Flights</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <button className="text-gray-700 hover:text-gray-900">Explore</button>
            <button className="text-gray-700 hover:text-gray-900">Trips</button>
            <button className="text-gray-700 hover:text-gray-900">Help</button>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-700 hover:bg-gray-200">
              <MenuIcon className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-gray-700 hover:bg-gray-200">
              <UserIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="mb-4 flex space-x-4">
            <button className="py-2 px-4 border border-gray-300 rounded">Round trip</button>
            <button className="py-2 px-4 border border-gray-300 rounded">One way</button>
            <button className="py-2 px-4 border border-gray-300 rounded">Multi-city</button>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="from" className="block text-gray-700">From</label>
              <input 
                id="from" 
                placeholder="City or airport" 
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="to" className="block text-gray-700">To</label>
              <input 
                id="to" 
                placeholder="City or airport" 
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="depart" className="block text-gray-700">Depart</label>
              <input 
                id="depart" 
                type="date" 
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="return" className="block text-gray-700">Return</label>
              <input 
                id="return" 
                type="date" 
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="passengers" className="text-gray-700">Passengers</label>
              <select 
                id="passengers" 
                className="border border-gray-300 rounded px-3 py-2"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}>
                <option>1 adult</option>
                <option>2 adults</option>
                <option>3 adults</option>
                <option>4 adults</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="class" className="text-gray-700">Class</label>
              <select 
                id="class" 
                className="border border-gray-300 rounded px-3 py-2"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}>
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
          </div>
          <button 
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded flex items-center"
            onClick={handleSearch}>
            <SearchIcon className="mr-2 h-4 w-4" /> Search flights
          </button>
        </div>

        {/* Filters and Flight Results */}
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Filter Section */}
          <div className="md:col-span-1 bg-white rounded-lg shadow p-6 space-y-6">
            {/* Stops Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Stops</h2>
              <div className="flex items-center space-x-2">
                <input type="radio" name="stops" id="any" className="mr-2" />
                <label htmlFor="any" className="text-gray-700">Any</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="stops" id="nonstop" className="mr-2" />
                <label htmlFor="nonstop" className="text-gray-700">Nonstop only</label>
              </div>
            </div>

            {/* Airlines Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Airlines</h2>
              <div className="flex items-center">
                <input type="checkbox" id="airline1" className="mr-2" />
                <label htmlFor="airline1" className="text-gray-700">Airline 1</label>
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-lg shadow mb-4 p-4 flex justify-between items-center">
              <div>
                <span className="font-semibold">{flights.length} results</span>
                <span className="text-gray-500 ml-2">sorted by price</span>
              </div>
              <button className="text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center">
                <MapIcon className="mr-2 h-4 w-4" /> Map view
              </button>
            </div>

            {flights.length === 0 ? (
              <p className="text-gray-500">No flights found.</p>
            ) : (
              flights.map((flight, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-lg font-semibold">{flight.departureTime}</span>
                      <span className="text-gray-500 mx-2">-</span>
                      <span className="text-lg font-semibold">{flight.arrivalTime}</span>
                    </div>
                    <span className="text-2xl font-bold">${flight.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{flight.airline}</span>
                    <span>{flight.duration}</span>
                    <span>{flight.route}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <LuggageIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-500">{flight.baggage}</span>
                    </div>
                    <button className="bg-blue-600 text-white rounded px-4 py-2">Select</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Footer links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">How Google Flights works</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Google Flights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


