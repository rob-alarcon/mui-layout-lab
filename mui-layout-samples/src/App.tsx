import { useEffect, useMemo, useState } from 'react'   
import { Container } from '@mui/system';
import NoteCard from './components/NoteCard';
import Masonry from 'react-masonry-css';
import { } from './App.css';
import INote from './model/INote';
import useNotes from './hooks/useNotes';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);

  const { data, isLoading } = useNotes();

  useEffect(() => {
    setNotes(data);
  }, [data]);

  if (isLoading || !notes.length) return (<CircularProgress />);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/notes")
  //     .then(res => res.json())
  //     .then(data => {
  //       setNotes(data.DATA)
  //     });
  // }, []);

  const handleDelete = async function(id:string | undefined) {
    await fetch("http://localhost:3000/api/notes/" + id, {
      method: "DELETE"
    })
    .then(res => {
      if (res.ok) {
        setNotes(notes.filter(x => x.id != id));
      }
    });
  };

  const masonryBreakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Container>
      {/* <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>2</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>4</Paper>
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={note.id}>
            <NoteCard note={note} onClick={handleDelete} />
          </Grid>
          )) 
        }
      </Grid> */}

      <Masonry 
        breakpointCols={masonryBreakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} onClick={handleDelete} />
          </div>
          )) 
        }
      </Masonry>
      
    </Container>
  );
}

export default App
