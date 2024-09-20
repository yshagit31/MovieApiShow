import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './index.css';

const paginationModel = { page: 0, pageSize: 10 };

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://dummyapi.online/api/movies");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch movies data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();

    const col = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'movie', headerName: 'Movie Name', width: 400 },
      {
        field: 'rating',
        headerName: 'Rating',
        type: 'number',
        width: 90,
      },
    ];
    setColumns(col);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <h1 className='heading'>Movies dataset</h1>
      <div className='table'>
        <Paper sx={{ height: 640, width: '65%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{
              border: 0,
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#1976d2',
              },
            }}
          />
        </Paper>
      </div>
    </>
  );
}

export default App;
