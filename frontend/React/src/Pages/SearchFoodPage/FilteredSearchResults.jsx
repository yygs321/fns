import React from "react";
import { Link } from "react-router-dom";

import { Typography, Divider } from "@mui/material";

function FilteredSearchResults({ data, filters }) {
  const filteredItems = data.filter((item) => {
    if (filters.kcal && item.kcal > Number(filters.kcal)) return false;
    if (filters.carbs && item.carbs > Number(filters.carbs)) return false;
    if (filters.protein && item.protein > Number(filters.protein)) return false;
    if (filters.fat && item.fat > Number(filters.fat)) return false;
    return true;
  });

  return (
    <>
      {filteredItems.map((item, index) => (
        <div key={item.name}>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/search/food/${item.name}`}
          >
            <Typography variant="h5" gutterBottom>
              {item.name}
            </Typography>
          </Link>

          <Typography variant="body1">{`kcal: ${item.kcal}`}</Typography>
          <Typography variant="body1">{`탄수화물: ${item.carbs}`}</Typography>
          <Typography variant="body1">{`단백질: ${item.protein}`}</Typography>
          <Typography variant="body1">{`지방: ${item.fat}`}</Typography>

          {index !== filteredItems.length - 1 && (
            <Divider style={{ margin: "20px 0" }} />
          )}
        </div>
      ))}
    </>
  );
}

export default FilteredSearchResults;
