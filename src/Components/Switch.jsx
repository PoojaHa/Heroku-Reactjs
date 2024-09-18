import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);
  const [color,setColor] = React.useState('white')
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setColor('black')
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      defaultChecked color="warning"
    />
  );
}
