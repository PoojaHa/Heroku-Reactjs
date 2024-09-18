import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { useGetAllProblemsByCategoryQuery } from '../redux/Task/Task';
import { useAddRevisionMutation, useRemoveRevisionMutation } from '../redux/Auth/authApi';
import { useSelector ,useDispatch} from 'react-redux';
import { saveRevision } from '../redux/Auth/authSlice';
// Modal styling for notes
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// Define columns
const columns = [
  { field: '_id', headerName: 'ID', width: 70,
    renderCell: ({row}) =><p>{row._id.slice(0, 2)+'...'+ row._id.slice(row._id.length-2, row._id.length)}</p> 
   },
  
  {
    field: 'problem',
    headerName: 'Problem',
    width: 200,
    renderCell: (params) => <a href="#">{params.row.problem}</a>, // Link to any problem statement
  },
  {
    field: 'article',
    headerName: 'Article',
    width: 130,
    renderCell: (params) => <a href={params.row.article} target="_blank" rel="noopener noreferrer">Article</a>,
  },
  {
    field: 'youtube',
    headerName: 'Youtube',
    width: 130,
    renderCell: (params) => <a href={params.row.youtube} target="_blank" rel="noopener noreferrer">Watch</a>,
  },
  {
    field: 'practice',
    headerName: 'Practice',
    width: 130,
    renderCell: (params) => <a href={params.row.practice} target="_blank" rel="noopener noreferrer">Practice</a>,
  },
  {
    field: 'note',
    headerName: 'Note',
    width: 130,
    renderCell: (params) => <NoteModal note={params.row.note} />,
  },
  {
    field: 'difficulty',
    headerName: 'Difficulty',
    width: 130,
    renderCell: (params) => <DifficultyDropdown difficulty={params.row.difficulty} />,
  },
  {
    field: 'revision',
    headerName: 'Revision',
    width: 100,
    renderCell: ({row}) => <RevisionIcon isRevised={row.revision} taskId={row._id}/>,
  },
];

// Define sample rows
const rows = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', status: true, problem: 'Two Sum', article: 'https://example.com', youtube: 'https://youtube.com/some-video', practice: 'https://leetcode.com', note: 'Note for Two Sum', difficulty: 'Easy', revision: false },
  { id: 2, firstName: 'Arya', lastName: 'Stark', status: false, problem: 'Reverse Linked List', article: 'https://example.com', youtube: 'https://youtube.com/some-video', practice: 'https://leetcode.com', note: 'Note for Reverse Linked List', difficulty: 'Medium', revision: true },
];

// Modal component for notes
function NoteModal({ note }) {
  const [open, setOpen] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState(note);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    console.log('Note saved:', currentNote);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit Note</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Edit Note</Typography>
          <TextField
            label="Note"
            fullWidth
            multiline
            rows={4}
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          <Button onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
        </Box>
      </Modal>
    </>
  );
}

// Dropdown for difficulty
function DifficultyDropdown({ difficulty }) {
  const [currentDifficulty, setCurrentDifficulty] = React.useState(difficulty);

  return (
    <select value={currentDifficulty} onChange={(e) => setCurrentDifficulty(e.target.value)}>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>
  );
}

// Star icon for revision
function RevisionIcon({taskId }) {
  const [revised, setRevised] = React.useState(false);
  const [addRevision, {isError, isLoading}] = useAddRevisionMutation();
  const [removeRevison, {isError: removeError,isLoading: removeLoading}] = useRemoveRevisionMutation();
  const userId = useSelector(state => state.auth?.data?.userId);
  const revision = useSelector(state => state.auth.data.activity);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const isRevised = (revision || []).includes(taskId);
    setRevised(isRevised);
  }, [revision]);

  const handleRevison = async () => {
    try{
    if(!revised){
     const res = await addRevision({userId, taskId})
     console.log(res,"res")
     dispatch(saveRevision(res.data.activity));
    } else {
      const res = await removeRevison({userId, taskId})
      dispatch(saveRevision(res.data.activity));
    }
    setRevised(!revised)
  }catch(error){
    console.log(error.messege)
  }
  }

  return (
    <Checkbox
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon sx={{ color: 'yellow' }} />}
      checked={revised}
      onChange={handleRevison}
    />
  );
}

export default function DataTable({categoryId}) {
  const {data: problems} = useGetAllProblemsByCategoryQuery(categoryId);
  console.log("problems", problems);
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(item) => item._id}
        rows={problems}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
