import { Button } from "@mui/material";

const confirmIcon =
  "https://www.figma.com/api/mcp/asset/59530da3-2f2b-4d35-a36f-dae9515c0b21";
const cancelIcon =
  "https://www.figma.com/api/mcp/asset/ce0b3d20-4e85-444a-889d-ce9c89079223";

export const Screen1 = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "8px",
      }}
    >
      <Button
        variant="contained"
        startIcon={<img src={confirmIcon} alt="" width={20} height={20} />}
        sx={{
          height: 48,
          backgroundColor: "#6750a4",
          borderRadius: "100px",
          color: "white",
          textTransform: "none",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: "0.1px",
          px: 2,
          "&:hover": {
            backgroundColor: "#5a4490",
          },
        }}
      >
        Confirm
      </Button>
      <Button
        variant="contained"
        startIcon={<img src={cancelIcon} alt="" width={20} height={20} />}
        sx={{
          height: 48,
          backgroundColor: "#f7f2fa",
          borderRadius: "100px",
          color: "#6750a4",
          textTransform: "none",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: "0.1px",
          px: 2,
          boxShadow:
            "0px 1px 2px 0px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: "#ede8f3",
          },
        }}
      >
        Cancel
      </Button>
    </div>
  );
};
