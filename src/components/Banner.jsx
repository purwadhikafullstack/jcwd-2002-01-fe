import {Paper, Box} from "@mui/material";
import Image from "next/image"
import ProgramHamil from "../assets/program-hamil.png"
import IdulFitri from "assets/idul-fitri.png"

const Banner = () => {
    return (
        <Box width="90%"  display="flex" alignItems="center" justifyContent="center" >
            <Box>
            <Image src={ProgramHamil}/> 
            </Box>
            <Box>
            <Image src={IdulFitri}/> 
            </Box>
        </Box>

    )
}

export default Banner
