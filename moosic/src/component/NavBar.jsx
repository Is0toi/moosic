import React, {usestate} from 'react';

function NavBar({isDark, setIsOpen}) {

    const[isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
  return <>
    <header>
        <div className = "NavBar"> 
            <h2>
                
            </h2>


        </div>


    </header>
  
  
  
  </>
  
}

export default NavBar
