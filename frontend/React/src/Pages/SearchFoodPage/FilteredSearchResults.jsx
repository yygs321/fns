import React from 'react';
import { Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

function FilteredSearchResults({ data, filters }) {
  // 먼저 데이터를 필터링합니다.
  const filteredItems = data.filter(item => {
    if (filters.kcal && item.kcal > Number(filters.kcal)) return false;
    if (filters.carbs && item.carbs > Number(filters.carbs)) return false;
    if (filters.protein && item.protein > Number(filters.protein)) return false;
    if (filters.fat && item.fat > Number(filters.fat)) return false;
    return true;
  });

  return (
    <div>
      {filteredItems.map((item, index) => (
        <div key={item.name}>
          {/* 큰 글자로 항목 이름 표시 */}
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/search/food/${item.name}` }>
          <Typography variant="h5" gutterBottom>{item.name}</Typography>
          </Link>

          {/* 항목 정보도 추가 가능, 예시로 kcal 정보를 추가해 보겠습니다. */}
          <Typography variant="body1">{`KCAL: ${item.kcal}`}</Typography>
          <Typography variant="body1">{`탄수화물: ${item.carbs}`}</Typography>
          <Typography variant="body1">{`단백질: ${item.protein}`}</Typography>
          <Typography variant="body1">{`지방: ${item.fat}`}</Typography>

          {/* 마지막 항목이 아닌 경우에만 Divider 추가 */}
          {index !== filteredItems.length - 1 && <Divider style={{ margin: '20px 0' }} />}
        </div>
      ))}
    </div>
  );
}

export default FilteredSearchResults;
