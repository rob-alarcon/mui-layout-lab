import { KeyboardArrowRight } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Container, styled } from "@mui/system";
import { FormEvent, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [category, setCategory] = useState('todos');
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDetails, setErrorDetails] = useState(false);
    const navigateTo = useNavigate();
    const handleOnSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // clean previous state
        setErrorTitle(false);
        setErrorDetails(false);
        
        if (!title) {
            setErrorTitle(true);
        }

        if (!details) {
            setErrorDetails(true);
        }

        if (!title || !details) {
            return;
        }

        // create new note
        fetch("http://localhost:3000/api/notes", {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({title, details, category})
        }).then(() => {
            navigateTo('/');
        })
    };

    return (
        <Container sx={{width:'100%'}}>
            <Typography 
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom>
                    Create a new Note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
                <TextField 
                    onChange={(e) => setTitle(e.target.value)}
                    label="Note Title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={errorTitle}
                    sx={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        display: 'block'
                    }}
                    />

                <TextField 
                    onChange={(e) => setDetails(e.target.value)}
                    label="Details"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    error={errorDetails}
                    sx={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        display: 'block'
                    }}
                    />

                <FormControl sx={{display:'block'}}>
                    <FormLabel>Category</FormLabel>
                    <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                        <FormControlLabel 
                            control={
                                <Radio /> 
                            }
                            label="Money"
                            value="money"
                        />
                        <FormControlLabel 
                            control={
                                <Radio /> 
                            }
                            label="Todos"
                            value="todos"
                        />
                        <FormControlLabel 
                            control={
                                <Radio /> 
                            }
                            label="Reminders"
                            value="reminders"
                        />
                        <FormControlLabel 
                            control={
                                <Radio /> 
                            }
                            label="Work"
                            value="work"
                        />
                    </RadioGroup>
                </FormControl>
                
                <Button 
                    type="submit" 
                    color="secondary" 
                    variant="contained" 
                    endIcon={<KeyboardArrowRight />}>
                    Submit
                </Button>

            </form>

        </Container>
    );
};