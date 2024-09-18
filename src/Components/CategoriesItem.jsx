import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable from './DataTable';

export default function CategoriesItem({category}) {
  const [expaned, setExpaned] = useState(false);
  const handleChange = (e, isExpaned) => {
      setExpaned(isExpaned);
  }
  return (
      <Accordion sx={{marginTop:"30px"}} onChange={handleChange}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category.categoriesTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {expaned && <DataTable categoryId={category._id}/> }
          </AccordionDetails>
      </Accordion>
  )
}
