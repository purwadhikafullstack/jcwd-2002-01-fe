import Link from "next/link";
import { useState } from "react";
import { Box, Typography, Collapse, MenuItem } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/router";

const SidebarSubmenu = ({ submenuTitle, href }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <MenuItem>
        <Box
          sx={{
            pl: 4,
            color: router.pathname.startsWith(href) ? "brand.600" : "#52637A",
            "&:hover": {
              color: "brand.600",
              opacity: [0.9, 0.8, 0.7],
              cursor: "pointer",
            },
          }}
        >
          {submenuTitle}
        </Box>
      </MenuItem>
    </Link>
  );
};

const SidebarMenu = ({ menuTitle, subMenus = [], icon, href = "", prefix }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
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
          <Box
            display="flex"
            sx={{
              color: router.pathname.startsWith(prefix)
                ? "brand.600"
                : "#52637A",
            }}
          >
            {icon}
            <Typography
              sx={{
                pl: 1,
                color: router.pathname.startsWith(prefix)
                  ? "brand.600"
                  : "#52637A",
              }}
            >
              {menuTitle}
            </Typography>
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
