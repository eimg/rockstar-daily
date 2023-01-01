import { useState } from "react";

import TaskList from "./TaskList";
import NewTask from "./NewTask";

import { Box, Button, AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function App() {
    const [items, setItems] = useState([
        { id: 1, subject: "Egg", done: false },
        { id: 2, subject: "Apple", done: true },
        { id: 3, subject: "Bread", done: false },
    ]);

    const add = (subject) => {
        setItems([{ id: items.length + 1, subject, done: false }, ...items]);
    };

    const remove = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const toggle = (id) => {
        const result = items.map((item) => {
            if (item.id === id) item.done = !item.done;
            return item;
        });

        setItems(result);
    };

	const clear = () => {
		setItems( items.filter(item => !item.done) );
	}

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Todo App
                        </Typography>

                        <Button color="inherit" onClick={clear}>Clear</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container maxWidth="sm">
                <NewTask add={add} />

                <TaskList
                    items={items.filter((item) => !item.done)}
                    remove={remove}
                    toggle={toggle}
                />
                <TaskList
                    items={items.filter((item) => item.done)}
                    remove={remove}
                    toggle={toggle}
                />
            </Container>
        </Box>
    );
}
