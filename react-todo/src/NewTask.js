import { useRef } from "react";
import { OutlinedInput, IconButton, InputAdornment } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { green } from "@mui/material/colors";

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
            <OutlinedInput
                color="error"
                fullWidth
                placeholder="Enter task"
                inputRef={input}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton type="submit">
                            <AddIcon sx={{ color: green[500] }} />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </form>
    );
}
