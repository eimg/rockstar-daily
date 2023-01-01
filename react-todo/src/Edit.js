import { Container, OutlinedInput } from "@mui/material";

import { useParams, redirect } from "react-router-dom";

export default function Edit({}) {
    const { id } = useParams();

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <OutlinedInput />
			<button onClick={() => {
				redirect("/");
			}}>Update</button>
        </Container>
    );
}
