import React, { useEffect, useState } from 'react';
import CategoriesItem from './CategoriesItem';

import { useAddTaskMutation, useGetTasksQuery } from '../redux/Task/Task';
import { TempleBuddhist, } from '@mui/icons-material';



const Dashboard = () => {
  const { data: categories,isLoading } = useGetTasksQuery();
  const [loading,setLoading] = useState(false)

  console.log("categoris", categories)
  
  useEffect(()=>{
    if(isLoading){
      setLoading(true)
    }
  },[isLoading])
  console.log(isLoading)
  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Show loading text or a spinner
      ) : (
        (categories || []).map((item) => (
          <CategoriesItem category={item} key={item._id} />
        ))
      )}
    </div>
  );
};
export default Dashboard;
