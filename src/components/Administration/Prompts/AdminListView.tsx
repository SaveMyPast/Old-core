import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useStore } from "@state-adapt/react";
import * as React from "react";
import { promptStore } from "../../../services/stores/promptStore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AdminListView = () => {
  const prompts = useStore(promptStore);

  const handleClick = (tag: string) => {
    promptStore.reset();
    promptStore.filterPromptsByTag(tag);
  };

  return (
    <>
      <Card elevation={0} square>
        <Typography variant="subtitle1" align="center">
          Select a tag to explore prompts
        </Typography>

        <List>
          {prompts.getAllTags.map((tag, key) => (
            <ListItem key={key} divider>
              <ListItemText primary={tag} />
              <IconButton onClick={() => handleClick(tag)}>
                <ChevronRightIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default AdminListView;
