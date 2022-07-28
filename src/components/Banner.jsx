import {Box} from "@mui/material";
import Image from "next/image"
import ProgramHamil from "../assets/programhamil.png"
import IdulFitri from "assets/idulfitri.png"

const Banner = () => {
    return (
 
            <Box  sx={{display: {xs: "block",md: "flex",}, height: "212px",}}>
            <Box>
            <Image src={ProgramHamil} marginRight="50px"/> 
            </Box>
            <Box>
            <Image src={IdulFitri}/> 
            </Box>
        </Box>
    )
}

export default Banner
