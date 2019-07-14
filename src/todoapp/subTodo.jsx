import React, { Component } from 'react';
import subcheck from '../subcheck.png';

class SubTodo extends Component {
    state = { 
        color: "green",
        marked: false
    }
    
    handleClick=(color,marked,doZone)=>{
        if(doZone){
            const element = !marked ? true: false;
            const changedColor = color === "green" ? "grey": "green";
            this.setState({color:changedColor, marked: element});
        } 
    }
    render() { 
        const {color,marked} =  this.state;
        const {erea,subRemove,data} =  this.props;
        const doZone = (erea === "do-list");
        const display = doZone ? " d-block" :" d-none";
        return ( 
           <React.Fragment>
                   <div className="row">
                        <div className="col-9">
                            <p 
                            className={"mb-1 subItem " + display}
                            onClick={() => {this.handleClick(color,marked,doZone)}} 
                            style={{color: color,cursor:"pointer"}}
                            >
                            {!marked && <b className="mr-2">-</b>} 
                            {marked && <img className="mr-2" src={subcheck}/>}
                            {data}
                            </p>
                            
                        </div>   
                        <div className="col-3 d-flex">
                            <span 
                            style={{fontSize: "10px",cursor:"pointer"}}
                            className={display + " align-self-center removeSub"} 
                            onClick={(e) => subRemove(e,data)}
                            >
                            remove
                            </span>
                        </div>   
                    </div>
                
            </React.Fragment>

         );
    }
}
 
export default SubTodo;

