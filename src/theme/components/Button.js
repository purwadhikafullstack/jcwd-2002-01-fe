const Button = (theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: theme.palette.brand["500"],
          color: "white",
          "&:hover": {
            backgroundColor: theme.palette.brand["600"],
          },
        },
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  };
};

export default Button;
