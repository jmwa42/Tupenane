import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("projects/", { title, description, target_amount: target });
    alert("Project created!");
    navigate("/projects/mine");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper sx={{ padding: 4, width: 480 }}>
        <Typography variant="h5" gutterBottom>Create Project</Typography>
        <form onSubmit={submit}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            fullWidth
            label="Target Amount"
            margin="normal"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Create
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

