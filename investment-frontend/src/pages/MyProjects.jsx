import { useEffect, useState } from "react";
import api from "../api";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects/my_projects/").then((res) => setProjects(res.data)).catch(() => setProjects([]));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>My Projects</Typography>
      <Grid container spacing={3}>
        {projects.length === 0 && <Typography>No projects created yet.</Typography>}
        {projects.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography variant="body2" color="text.secondary">{p.description}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <b>Target:</b> {p.target_amount}
                </Typography>
                <Typography variant="body2">
                  <b>Total Invested:</b> {p.total_invested}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

