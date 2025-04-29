import React from "react";
import { Breadcrumbs, Link, Typography } from '../../MaterialComponents';
import './breadcrumbs.css'

const CustomBreadcrumbs = ({links,current})=>{
    return(
        <Breadcrumbs aria-labl="breadcrumb">
            {links.map((link, index)=>(
                <Link key={index}
                underline="hover"
                sx={{display:"flex",alignItems:"center"}}
                color="inherit"
                href={link.href}
                >{link.label}
                </Link>
            ))}
         <Typography
         className="activeBreadcrumb"
         sx={{display:"flex",alignItems:"center"}} 
         >
            {current.label}
         </Typography>
        </Breadcrumbs>
    )
}

export default CustomBreadcrumbs