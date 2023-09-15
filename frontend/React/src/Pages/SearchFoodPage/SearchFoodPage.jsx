import React, { useState } from 'react';
import { 
  Typography, 
  TextField, 
  Grid, 
  Chip,
  Divider
  
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilteredSearchResults from './FilteredSearchResults';

const SearchFoodPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kcal, setKcal] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');

  const DUMMY_DATA = [
    { name: '식품1', kcal: 80, carbs: 10, protein: 5, fat: 3 },
    { name: '식품2', kcal: 150, carbs: 20, protein: 10, fat: 6 },
    { name: '식품3', kcal: 300, carbs: 30, protein: 15, fat: 9 },
    { name: '식품4', kcal: 400, carbs: 10, protein: 5, fat: 9 },
    { name: '식품5', kcal: 200, carbs: 15, protein: 10, fat: 6 },
    { name: '식품6', kcal: 300, carbs: 30, protein: 5, fat: 3 },
  ];

  const filteredData = DUMMY_DATA.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filters = { kcal, carbs, protein, fat };
  const activeFilters = Object.keys(filters).filter(key => filters[key]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight={"bold"}>
        음식 정보
      </Typography>
  
      <TextField
        fullWidth
        variant="outlined"
        placeholder="음식을 검색하세요"
        onChange={e => {
          setSearchTerm(e.target.value);
          if (!e.target.value) {
            setKcal('');
            setCarbs('');
            setProtein('');
            setFat('');
          }
        }}
        InputProps={{
          endAdornment: <SearchIcon color="primary" />
        }}
      />
  
      <br />
      <br />
  
      {searchTerm ? (
        <div>
          {activeFilters.length > 0 && (
            <Grid container spacing={1} style={{ marginBottom: '10px' }}>
              {activeFilters.map(filterKey => (
                <Grid item key={filterKey}>
                  <Chip
                    label={`${filterKey.toUpperCase()}: ${filters[filterKey]}`}
                    onDelete={() => {
                      switch (filterKey) {
                        case 'kcal':
                          setKcal('');
                          break;
                        case 'carbs':
                          setCarbs('');
                          break;
                        case 'protein':
                          setProtein('');
                          break;
                        case 'fat':
                          setFat('');
                          break;
                        default:
                          break;
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <Divider />
          <FilteredSearchResults data={filteredData} filters={filters} />
        </div>
      ) : (
        <Grid container direction="column" spacing={3}>
          <Grid item container alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Kcal"
                variant="outlined"
                type="number"
                value={kcal}
                onChange={e => setKcal(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>
  
          <Grid item container alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="탄수화물"
                variant="outlined"
                type="number"
                value={carbs}
                onChange={e => setCarbs(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>
  
          <Grid item container alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="단백질"
                variant="outlined"
                type="number"
                value={protein}
                onChange={e => setProtein(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>
  
          <Grid item container alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="지방"
                variant="outlined"
                type="number"
                value={fat}
                onChange={e => setFat(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography>이하</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
  
};

export default SearchFoodPage;
