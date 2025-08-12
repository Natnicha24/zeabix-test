import React from "react";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { Box, Typography } from "@mui/material";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

function Title({collapsed}:any){
return(
    <Box display={'flex'} sx={{justifyContent:"center",alignItems:"center"}}>
        <DirectionsCarFilledIcon sx={{marginRight:collapsed ?0:2}} />
        <Typography fontSize={15} fontWeight={700}
        display={
            collapsed ?"none":"block"
        }>
            Rental Dashboard
        </Typography>
    </Box>
)
}

export default Title