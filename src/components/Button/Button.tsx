import styled from "@emotion/styled";
import { Button, colors } from "@mui/material";

const StyledButton = styled(Button)({
  fontFamily: "var(--font-oswald), sans-serif",
  border: `1px solid ${colors.green[800]}`,
  color: colors.green[800],
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: colors.green[50],
    borderColor: colors.green[600],
    color: colors.green[600],
  },
});

export default StyledButton;
