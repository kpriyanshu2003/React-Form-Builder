import { Fragment } from "react";

// Material UI
import { Box, Paper, TextField } from "@mui/material";
import { HeaderProps } from "../../@types/Header";

const Header = ({ header, setHeader }: HeaderProps) => {
  return (
    <Fragment>
      <Box sx={{ mb: 3 }}>
        <Paper elevation={2} sx={{ p: 3, borderTop: "8px solid #9C27B0" }}>
          <TextField
            defaultValue={header.title}
            onChange={(e) => setHeader({ ...header, title: e.target.value })}
            variant="standard"
            placeholder="Form Title"
            name="title"
            sx={{ mb: 3 }}
            fullWidth
          />
          <TextField
            name="description"
            defaultValue={header.description}
            onChange={(e) =>
              setHeader({ ...header, description: e.target.value })
            }
            variant="standard"
            placeholder="Form Description"
            fullWidth
            sx={{ mb: 2 }}
            multiline
            rows={2}
          />
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Header;
