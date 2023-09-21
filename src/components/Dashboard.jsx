import React, { useState, useEffect } from 'react';
import { TextField, DetailsList, SelectionMode, buildColumns } from '@fluentui/react';

const TableWithSearch = () => {
    const [filterText, setFilterText] = useState('');
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        // Fetch flight data from an API or import from a JSON file
        // For example, if using a JSON file:
        fetch('https://mocki.io/v1/ffae265d-f383-402e-a93c-ce7728ed254c')
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error('Error fetching flight data:', error));
    }, []);

    const handleFilterChange = (event, text) => {
        setFilterText(text);
    };

    const filteredFlights = flights.filter((flight) => {
        //debugger;
        return flight.status.toLowerCase().includes(filterText.toLowerCase())
    }
    );

    //     const columns = buildColumns([
    //     { key: 'Flight_ID', name: 'Flight ID', fieldName: 'Flight_ID', minWidth: 100, maxWidth: 150 },
    //     { key: 'FlightCode', name: 'Flight Code', fieldName: 'FlightCode', minWidth: 100 },
    //     { key: 'Tail', name: 'Tail', fieldName: 'Tail', minWidth: 100 },
    //     { key: 'DST', name: 'DST', fieldName: 'DST', minWidth: 150 },
    //     { key: 'DST', name: 'DST', fieldName: 'DST', minWidth: 100 },
    //     { key: 'ETD_time', name: 'Departure Time', fieldName: 'ETD_time', minWidth: 200 },
    //     { key: 'status', name: 'status', fieldName: 'status', minWidth: 200 },
    //     { key: 'teamchannelID', name: 'Team Channel ID', fieldName: 'teamchannelID', minWidth: 200 },
    //     { key: 'Airport_ID', name: 'Airport_ID', fieldName: 'Airport_ID', minWidth: 200 },
    //     { key: 'Terminal', name: 'Terminal', fieldName: 'Terminal', minWidth: 200 },
    //   ]);
    const columns = buildColumns(filteredFlights);
    return (
        <div>
            <div className="search-box">
                <TextField
                    label="Search by Flight Number"
                    onChange={handleFilterChange}
                    value={filterText}
                />
            </div>
            <div className="flight-dashboard">
                <DetailsList
                    items={filteredFlights}
                    columns={columns}
                    selectionMode={SelectionMode.multiple}
                />
            </div>
        </div>
    );
};

export default TableWithSearch;
