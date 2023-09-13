import React from 'react';

function FilteredSearchResults({ data, filters }) {
  return data.filter(item => {
    if (filters.kcal && item.kcal > filters.kcal) return false;
    if (filters.carbs && item.carbs > filters.carbs) return false;
    if (filters.protein && item.protein > filters.protein) return false;
    if (filters.fat && item.fat > filters.fat) return false;
    return true;
  }).map(item => <div key={item.name}>{item.name}</div>);
}

export default FilteredSearchResults;
