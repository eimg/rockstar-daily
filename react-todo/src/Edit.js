import {
    Container,
    Box,
    OutlinedInput,
    IconButton,
    InputAdornment,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

import { green } from "@mui/material/colors";

import { useEffect, useState } from "react";

const api = "http://localhost:8000";

export default function Edit({ update }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] = useState("");

    useEffect(() => {
		(async () => {
			const res = await fetch(`${api}/tasks/${id}`);
			const task = await res.json();

			setSubject(task.subject);
		})();
    }, [id]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    update(id, subject);
                    navigate("/");
                }}
            >
                <OutlinedInput
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                    fullWidth
                    color="error"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <SaveIcon sx={{ color: green[500] }} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </form>
        </Container>
    );
}
