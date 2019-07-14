import React, { Component } from 'react';
class DoneList extends Component {
    // state = { 
    //     deletedItems:[]
    //  }
    render() { 
        const{onDragOver,onDrop,data} = this.props;
        return ( 
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <p>Done - List</p>
                    </div>
                </div>
                <div className="row">
                    <div 
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e,data)}
                    className="col-8 border border-danger" 
                    style={{minHeight: '300px'}}
                    >
                     
                    </div>
                </div >
            </React.Fragment>
         );
    }
}
 
export default DoneList;