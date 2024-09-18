import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box,  Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'
import { useAddTaskMutation, useGetTasksQuery } from '../redux/Task/Task';
import {  useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setProblems } from '../redux/Auth/problemSlice';
export default function Categories() {
  const [problem, setProblem] = React.useState('');
  const [article, setArticle] = React.useState('');
  const [youtube, setYoutube] = React.useState('');
  const [practice, setPractice] = React.useState('');
  const [note, setNote] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('Easy');
  const [revision, setRevision] = React.useState(false);
  const [categories, setCategories] = React.useState(''); // Updated to an array

  const [addTask, { isLoading, isError, isSuccess }] = useAddTaskMutation();
  const { data: tasks,refetch } = useGetTasksQuery();
  // console.log(tasks, "Fetched Tasks", categories);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const options = React.useMemo(() => (tasks||[]).map(category => ({label: category.categoriesTitle, value: category._id})), tasks)


  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
     problem,
     article,
     youtube,
     practice,
     difficulty,
     revision,
     category:categories
   };


    try {
      const res = await addTask(taskData).unwrap();
      dispatch(setProblems(res.problems));
      navigate('/'); 
    } catch (err) {
      // Handle error
      console.error('Failed to add task: ', err);
    }
  };
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <form onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id="categories-label">Categories</InputLabel>
          <Select
            labelId="categories-label"
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            label="Categories"
          >
            {options.map(opt => (<MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Article"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="YouTube Link"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Practice"
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
    
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Box>
  );
}
