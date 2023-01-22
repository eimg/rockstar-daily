import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";

import {
    Delete as DeleteIcon,
    Check as CheckIcon,
    Edit as EditIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@mui/icons-material";

import { pink, green } from "@mui/material/colors";

import { Link } from "react-router-dom";
export default function TaskList({ items, remove, toggle }) {
    return (
        <Box>
            {items.map((item) => {
                return (
                    <List key={item._id}>
                        <ListItem>
                            <IconButton onClick={() => toggle(item._id)}>
                                {item.done ? (
                                    <CheckIcon sx={{ color: green[500] }} />
                                ) : (
                                    <CheckBoxOutlineBlankIcon />
                                )}
                            </IconButton>

                            <ListItemText
                                sx={{
                                    ml: 3,
                                    color: item.done ? "text.fade" : "text.light",
                                }}
                            >
                                {item.subject}
                            </ListItemText>

                            <Link to={`/edit/${item._id}`}>
                                <EditIcon sx={{ color: "grey", mr: 2 }} />
                            </Link>

                            <IconButton onClick={() => remove(item._id)}>
                                <DeleteIcon sx={{ color: pink[500] }} />
                            </IconButton>
                        </ListItem>
                    </List>
                );
            })}
        </Box>
    );
}
