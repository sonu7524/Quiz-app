import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import "./styles.css";

export default function CircularLoader() {
  return (
    <div className='loader'>
      <CircularProgress color="inherit" />
    </div>
  );
}