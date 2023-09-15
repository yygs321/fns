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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SearchFoodPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kcal, setKcal] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');

  const DUMMY_DATA = [
    { name: '식품1', kcal: 80, carbs: 9, protein: 53, fat: 3 },
    { name: '식품2', kcal: 150, carbs: 60, protein: 90, fat: 66 },
    { name: '식품3', kcal: 300, carbs: 36, protein: 105, fat: 19 },
    { name: '식품4', kcal: 400, carbs: 100, protein: 56, fat: 96 },
    { name: '식품5', kcal: 200, carbs: 15, protein: 60, fat: 60 },
    { name: '식품6', kcal: 300, carbs: 90, protein: 50, fat: 30 },
    { name: '식품7', kcal: 720, carbs: 75, protein: 10, fat: 15 },
    { name: '식품8', kcal: 500, carbs: 90, protein: 65, fat: 30 },
  ];
  const filterKeyToLabel = {
    kcal: 'KCAL',
    carbs: '탄수화물',
    protein: '단백질',
    fat: '지방'
  };
  

  const filteredData = DUMMY_DATA.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filters = { kcal, carbs, protein, fat };
  const activeFilters = Object.keys(filters).filter(key => filters[key]);

  const handleBackClick = () => {
    // 검색창만 초기화
    setSearchTerm('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container justifyContent="space-between" alignItems="center">
      {searchTerm && <ArrowBackIosIcon onClick={handleBackClick} style={{ cursor: 'pointer' }} />}
        <Typography variant="h4" gutterBottom align="center" fontWeight={"bold"} style={{ flex: 1 }}>
        음식 정보
      </Typography>
      </Grid>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="음식을 검색하세요"
        onChange={e => {
          setSearchTerm(e.target.value);
          // if (!e.target.value) {
          //   setKcal('');
          //   setCarbs('');
          //   setProtein('');
          //   setFat('');
          // } 검색창이 비면 필터를 초기화
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
                    label={`${filterKeyToLabel[filterKey]}: ${filters[filterKey]}`}
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
