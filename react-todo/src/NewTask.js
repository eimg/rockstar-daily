import { useRef } from "react";

import {
	TextField,
	IconButton,
} from "@mui/material";

import {
	Add as AddIcon
} from "@mui/icons-material";

export default function NewTask({ add }) {
	const input = useRef();

	return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                let subject = input.current.value;
                if (!subject) return false;

                add(subject);

                input.current.value = "";
                input.current.focus();
            }}
        >
            <TextField
				placeholder="Enter task"
				inputRef={input}
			/>
            <IconButton>
				<AddIcon />
			</IconButton>
        </form>
    );
}