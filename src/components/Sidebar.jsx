import {
  Box,
  Collapse,
  Divider,
  Input,
  Link,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

ExpandMore;

const SidebarSubmenu = ({ submenuTitle, href, icon, isMenu = true }) => {
  return (
    <Link href={href || undefined} underline="none">
      <MenuItem
        sx={{
          color: "#52637A",
          "&:hover": {
            color: "#44B2E9",
            opacity: [0.9, 0.8, 0.7],
            cursor: "pointer",
          },
          textDecoration: "none",
          fontSize: "14px",
          mb: "5px",
          px: "28px",
        }}
        disableRipple={(isMenu? false : true)}
      >
        {submenuTitle}
      </MenuItem>
    </Link>
  );
};

const SidebarMenu = ({ menuTitle, subMenus = [], icon, }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          color: "#52637A",
          "&:hover": {
            color: "#1BA1E4",
            cursor: "pointer",
          },
          p: "28px",
        }}
        onClick={() => setMenuOpen((prevState) => !prevState)}
      >
        <Box display="flex">
          {icon}
          <Typography fontSize="16px" fontWeight="700">
            {menuTitle}
          </Typography>
        </Box>

        {menuOpen ? <ExpandMore /> : <ExpandLess />}
      </Box>

      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        {subMenus.map((val) => {
          return (
            <SidebarSubmenu isMenu={val.isMenu} submenuTitle={val.submenuTitle} href={val.href} />
          );
        })}
      </Collapse>
    </Box>
  );
};

const UserSidebar = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "300px",
          height: "auto",
          mb: "20px",
          py: "12px",
          boxShadow: "0px 7px 8px 2px #E8F6FC",
          borderRadius: "8px",
        }}
      >
        <SidebarMenu
          menuTitle="Kategori"
          subMenus={[
            {
              submenuTitle: "Obat-obatan",
              href: "/",
            },
            {
              submenuTitle: "Nutrisi",
              href: "/",
            },
            {
              submenuTitle: "Herbal",
              href: "/",
            },
            {
              submenuTitle: "Vitamin & Suplemen",
              href: "/",
            },
            {
              submenuTitle: "Alat Kesehatan",
              href: "/",
            },
            {
              submenuTitle: "Perawatan Tubuh",
              href: "/",
            },
            {
              submenuTitle: "Ibu & Anak",
              href: "/",
            },
          ]}
        />
      </Box>
      <Box
        sx={{
          width: "300px",
          height: "auto",
          py: "12px",
          boxShadow: "0px 2px 3px 2px #E8F6FC, 0px 4px 12px 4px #E8F6FC",
          borderRadius: "8px",
        }}
      >
        <SidebarMenu
          menuTitle="Keluhan"
          subMenus={[
            {
              submenuTitle: "Pusing",
              href: "/",
            },
            {
              submenuTitle: "Demam",
              href: "/",
            },
            {
              submenuTitle: "Sakit Gigi",
              href: "/",
            },
          ]}
        />
        <Divider />
        <SidebarMenu
          isMenu={false}
          menuTitle="Harga"
          subMenus={[
            {
              submenuTitle: (
                <OutlinedInput
                  sx={{ height: "36px" }}
                  placeholder="Harga Minimum"
                  startAdornment={
                    <Typography sx={{ mr: "10px", fontWeight: "700" }}>
                      Rp.
                    </Typography>
                  }
                />
              ),
              isMenu: false
            },
            {
              submenuTitle: (
                <OutlinedInput
                  sx={{ height: "36px" }}
                  placeholder="Harga Maximal"
                  startAdornment={
                    <Typography sx={{ mr: "10px", fontWeight: "700" }}>
                      Rp.
                    </Typography>
                  }
                />
              ),
              isMenu: false
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default UserSidebar;
