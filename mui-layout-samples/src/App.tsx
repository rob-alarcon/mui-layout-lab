import { useEffect, useState } from 'react'   
import { Container } from '@mui/system';
import NoteCard from './components/NoteCard';
import Masonry from 'react-masonry-css';
import { } from './App.css'

export default interface INote {
  id: number,
  title: string,
  details: string,
  category: string
};

function App() {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const handleDelete = async function(id:number) {
    console.log(`ID ${id}`);
    await fetch("http://localhost:8000/notes/" + id, {
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
