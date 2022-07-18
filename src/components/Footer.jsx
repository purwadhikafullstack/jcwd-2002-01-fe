import { Box, Grid, Icon, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "assets/logo.png";
import { RiWhatsappFill } from "react-icons/ri";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <Box sx={{ bottom: "0", width: "100%", mt: "80px" }}>
      <Box padding="60px 96px" sx={{ backgroundColor: "whitesmoke" }}>
        <Grid container spacing={10}>
          <Grid item xs={3}>
            <Image src={logo} width="240px" height="50px" />
            <Stack spacing="12px" marginTop="20px">
              <Box display="flex">
                <Icon sx={{ marginRight: "20px", fontSize: "39px" }}>
                  {<RiWhatsappFill />}
                </Icon>
                <Box>
                  <Typography fontWeight="700" fontSize="14px">
                    Chat Whatsapp
                  </Typography>
                  <Typography>+62-0212-3802</Typography>
                </Box>
              </Box>
              <Box display="flex">
                <Icon sx={{ marginRight: "20px", fontSize: "39px" }}>
                  {<MdEmail />}
                </Icon>
                <Box>
                  <Typography fontWeight="700" fontSize="14px">
                    Email
                  </Typography>
                  <Typography>contact@email.com</Typography>
                </Box>
              </Box>
              <Box display="flex">
                <Icon sx={{ marginRight: "20px", fontSize: "39px" }}>
                  {<MdPhoneInTalk />}
                </Icon>
                <Box>
                  <Typography fontWeight="700" fontSize="14px">
                    Call Center
                  </Typography>
                  <Typography>021-123973</Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing="30px" fontSize="14px">
              <Link href="#" underline="hover">
                {"Tentang Kami"}
              </Link>
              <Link href="#" underline="hover">
                {"FAQ"}
              </Link>
              <Link href="#" underline="hover">
                {"Kebijakan Privasi"}
              </Link>
              <Link href="#" underline="hover">
                {"Syarat & Ketentuan"}
              </Link>
              <Link href="#" underline="hover">
                {"Karir"}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing="30px" fontSize="14px">
              <Link href="#" underline="hover">
                {"Blog"}
              </Link>
              <Link href="#" underline="hover">
                {"Cara Belanja"}
              </Link>
              <Link href="#" underline="hover">
                {"Promo"}
              </Link>
              <Link href="#" underline="hover">
                {"Diagnosis"}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography
              fontSize="24px"
              fontWeight="700"
              sx={{ marginBottom: "32px" }}
            >
              Ikuti Kami
            </Typography>
            <Stack spacing="12px">
              <Box display="flex" alignItems="center">
                <Icon sx={{ marginRight: "20px", fontSize: "28px" }}>
                  {<FaFacebookF />}
                </Icon>
                <Typography>Facebook</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Icon sx={{ marginRight: "20px", fontSize: "28px" }}>
                  {<FaTwitter />}
                </Icon>
                <Typography>Twitter</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Icon sx={{ marginRight: "20px", fontSize: "28px" }}>
                  {<AiFillInstagram />}
                </Icon>
                <Typography>Instagram</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        textAlign="center"
        sx={{
          color: "white",
          backgroundColor: "#4F618E",
          height: "95px",
          padding: "36px",
        }}
      >
        designed by ahayde
      </Box>
    </Box>
  );
};

export default Footer;
