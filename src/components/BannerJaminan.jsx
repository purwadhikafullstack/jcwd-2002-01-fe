import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ObatAsli from "../assets/obat-asli.png"
import JaminHemat from "../assets/jamin-hemat.png"
import GratisOngkir from "../assets/gratis-ongkir.png"

const BannerJaminan = () => {
    return (
        <Box width= "100%" >
            <Box>
            <Typography variant="h5" ml="80px"color="navy" fontWeight="bold">Jaminan Untuk Anda</Typography>
            </Box>
            <Box display="flex" justifyContent="space-evenly">
            <Image src={ObatAsli}/> 
            <Image src={JaminHemat}/> 
            <Image src={GratisOngkir}/> 
            </Box>
        </Box>

    )
}

export default BannerJaminan