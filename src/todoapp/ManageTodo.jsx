import React from 'react';
const ManageTodo = ({path,alt,onClick,data}) => {
    return ( 
      
            <span>
                <img 
                className="text-center" 
                src={path} 
                alt={alt} 
                onClick={() => onClick(data)}
                />
            </span>
   
     );
}
 
export default ManageTodo;