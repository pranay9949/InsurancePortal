import "./navbar.css"
import { FaBars } from "react-icons/fa"
import 'bootstrap-icons/font/bootstrap-icons.css';
import SideBar from "../SideBar/SideBar";
import { useState } from "react";

const NavBar=()=>{

     const [isOpen,setIsOpen] = useState(false)
    
        const toogleIsOpen=()=>{
           setIsOpen((prev)=>!prev)
        }
         

    return(
        <div className="nav">

            <FaBars onClick={toogleIsOpen} className="fab"/>
            <SideBar isOpen={isOpen} onClick={toogleIsOpen}/>
            <h3>Insurance Application</h3>
            <div className="new-jersey">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0Ugo2yX6q1ggeonMZIS5weyLE6-dj1uI2w&s"/>
            <p>Official Site of The State of New Jersey</p>
            </div>
            
            <i className="bi bi-person-circle" style={{ fontSize: "24px" }}></i>

        </div>
    )

}


export default NavBar