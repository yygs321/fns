// CheckBoxTestPage.jsx
import React, { useState } from 'react';

const CheckBoxTestPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(prevState => !prevState);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkbox Test Page</h2>
      <label>
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={handleCheckboxChange}
        />
        Check me
      </label>
    </div>
  );
};

export default CheckBoxTestPage;
