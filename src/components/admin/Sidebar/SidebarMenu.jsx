import Link from "next/link";
import { useState } from "react";
import { Box, Typography, Collapse, MenuItem } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const SidebarSubmenu = ({ submenuTitle, href }) => {
  return (
    <Link href={href}>
      <MenuItem
        sx={{
          color: "#52637A",
          pl: 4,
          "&:hover": {
            color: "brand.600",
            opacity: [0.9, 0.8, 0.7],
            cursor: "pointer",
          },
        }}
      >
        {submenuTitle}
      </MenuItem>
    </Link>
  );
};

const SidebarMenu = ({ menuTitle, subMenus = [], icon, href = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          color: "#52637A",
          "&:hover": {
            color: "brand.600",
            opacity: [0.9, 0.8, 0.7],
            cursor: "pointer",
          },
          px: 2,
          mb: 1,
        }}
        onClick={() => setMenuOpen((prevState) => !prevState)}
      >
        <Link href={href}>
          <Box display="flex">
            {icon}
            <Typography sx={{ pl: 1 }}>{menuTitle}</Typography>
          </Box>
        </Link>
        {subMenus.length ? (
          <Box>{menuOpen ? <ExpandMore /> : <ExpandLess />}</Box>
        ) : (
          <Box></Box>
        )}
      </Box>

      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        {subMenus.map((val) => {
          return (
            <SidebarSubmenu submenuTitle={val.submenuTitle} href={val.href} />
          );
        })}
      </Collapse>
    </Box>
  );
};

export default SidebarMenu;
