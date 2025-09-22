import { useEffect, useState } from "react";
import api from "../api";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UsersGrouped() {
  const [groups, setGroups] = useState({});

  useEffect(() => {
    api.get("users/grouped/").then((res) => setGroups(res.data)).catch(() => setGroups({}));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Users Grouped by Location</Typography>
      {Object.keys(groups).length === 0 && <Typography>No users found.</Typography>}
      {Object.keys(groups).map((loc) => (
        <Accordion key={loc}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{loc}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {groups[loc].map((u) => (
                <ListItem key={u.id}>
                  <ListItemText primary={u.username} secondary={u.email} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

