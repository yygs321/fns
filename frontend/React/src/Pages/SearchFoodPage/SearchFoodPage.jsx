import React, { useState } from 'react';
import { 
  Typography, 
  TextField, 
  Grid, 
  FormControl,
  InputLabel, 
  Select, 
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchFoodPage = () => {
  const [kcal, setKcal] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        음식 정보
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="음식을 검색하세요"
        InputProps={{
          endAdornment: <SearchIcon color="primary" />
        }}
      />

      <br />
      <br />

      <Grid container direction="column" spacing={3}>
        <Grid item container alignItems="center" spacing={1}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>Kcal</InputLabel>
              <Select value={kcal} onChange={(e) => setKcal(e.target.value)}>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={300}>300</MenuItem>
                <MenuItem value={500}>500</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>이하</Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" spacing={1}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>탄수화물</InputLabel>
              <Select value={carbs} onChange={(e) => setCarbs(e.target.value)}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>이하</Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" spacing={1}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>단백질</InputLabel>
              <Select value={protein} onChange={(e) => setProtein(e.target.value)}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>이하</Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems="center" spacing={1}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>지방</InputLabel>
              <Select value={fat} onChange={(e) => setFat(e.target.value)}>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>이하</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchFoodPage;
