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
        outlined: {
          borderColor: theme.palette.brand["500"],
          color: theme.palette.brand["500"],
        },
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  };
};

export default Button;
