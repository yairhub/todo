import React ,{Component} from 'react';
import axios from "axios";
import {todoModel} from '../utils';
import SubTodo from './subTodo';
import ManageTodo from './ManageTodo';


import trashPic from '../garbage.png';
import commentPic from '../writing.png';

class Todo extends Component {
    state = {
        inputFocus: true,
        inputRef :React.createRef(),
        subItem: '',
        subItems: [],       
    }
    componentDidMount(){
        const {items,dropIndex,erea,subs} = this.props;

        if(erea === "do-list"){
            if(this.state.inputRef.current){
                this.state.inputRef.current.focus();
            } 
            if(items[dropIndex]){
                const subItems = items[dropIndex].subs;
                this.setState({subItems});
                items[dropIndex].subs = [];
            }else{
                console.log("no drop Index");
            }   
        }else{
            this.setState({inputFocus: false,subItems : subs}); 
        }
        
    }
        
    handleFocus(e){
       e.currentTarget.style = {
            focused: {
                color: '#4A90E2'
            }
        };
    }
    handleClick= (e,itemClass)=> {
        if(itemClass === 'todo'){ 
            this.setState({inputFocus: true});
        }else {
            this.setState({inputFocus: false}); 
        }
    }
 
    handleChange =({currentTarget}) => {
        const subItem = currentTarget.value;
        this.setState({subItem});
    }

    handleSubmit = async (e) => {
        const uid = 3
        e.preventDefault();
        try{
            const {items} = this.props;
            const itemList = items.filter(item => item.name == this.props.data.name);
            const ItemId = itemList[0].id;

            const subItem = this.state.subItem;
            const subItems = [...this.state.subItems];
            subItems.push(subItem);

            const obj = todoModel({name:this.props.data.name,subs:subItems},uid);
            const {data} = await axios.put("http://todo.yairkiel.com/api/lists/" + ItemId, obj);
            this.setState({subItems,subItem: ''});
        }catch(ex){
            console.log(ex.message);
        }
        
    } 
    handleSubRemove =async (e,subItem)=>{
        try{const uid = 3
        // ItemId  getItemId
        const {items} = this.props;
        const itemList = items.filter(item => item.name == this.props.data.name);
        const ItemId = itemList[0].id;
        let subItems = [...this.state.subItems];
        subItems = subItems.filter(item => item !== subItem);
        const obj = todoModel({name:this.props.data.name,subs:subItems},uid);
        const {data} = await axios.put("http://todo.yairkiel.com/api/lists/" + ItemId, obj);
        console.log(obj,"obj");
        this.setState({subItems});
        }catch(ex){
            console.log(ex.message);
        }
    }
    

    render() { 
        const {data,onDragStart,itemClass,onDelete,items,erea,deletedItems} = this.props;
        const {inputFocus,inputRef,subItem,subItems} = this.state;
        const currentDeleted = deletedItems.filter(item => item.name === data.name);
        const currentItems = items.filter(item => item.name === data.name);
        const currentId = currentItems[0] ? currentItems[0].id: currentDeleted[0].id;
  
        const c = (itemClass === 'todo');
        const managePics = c ? commentPic : trashPic;
        const description = c ? 'add comment': 'trash';
           
        return (
                    <div className="col-12 m-auto text-left mt-2" onClick={(e) => this.handleClick(e,itemClass)}>
                        <div className="row mb-2">
                           
                            <div className={"col-8 m-auto draggable rounded " + itemClass}>
                                <div className="row">
                                    
                                    <div className={c ? "col-12 mb-2" : "col-12" }>
                                        <div className="row">
                                            <div className="col-10 d-flex">
                                                <p 
                                                id={currentId}
                                                value={data && data.name}
                                                onDragStart = {(e) => onDragStart(e,data,subItems,erea)}
                                                draggable
                                                className={"m-1 listName"}
                                                style={{background:"white"}}
                                                >
                                                {data && data.name}
                                                </p>
                                                {!c && data.subs.length < 1 && <small className={"d-flex mb-1 align-items-center"}>(empty)</small>}
                                            </div>
                                            <div className="col-2 align-items-center p-1 manage">
                                                {!c &&      
                                                <ManageTodo 
                                                data={data}
                                                path={managePics} 
                                                alt={description} 
                                                onClick={onDelete}
                                                />}
                                           

                                            </div>
                                        </div>
                                    </div>
                                    <div className={c ? "col-12 mb-2" : "col-12"}>
                                            <form action="" className="p-0" onSubmit={(e) => this.handleSubmit(e)}>
                                                {!inputFocus || 
                                                    <input
                                                    style={{outlineColor:"grey"}}
                                                    className=""                                                   
                                                    placeholder="add sub item..." 
                                                    type="text" 
                                                    value={subItem} 
                                                    onChange={(e) => this.handleChange(e)} 
                                                    ref={inputRef}
                                                    onFocus={(e) => this.handleFocus(e)} 
                                                    // onBlur={(e)=>this.handleBlur(e)}
                                                    />
                                                }
                                            </form>
                                    </div>      
                                    <div className="col-12">
                                                    {(subItems && subItems.length > 0 && 
                                                        subItems.map(item =>     
                                                        <SubTodo 
                                                        subRemove={this.handleSubRemove}
                                                        key={item} data={item} erea={erea} 
                                                        className="subItem"
                                                        />))
                                                    }   
                                    </div> 
                                 </div>
                            </div>
                        </div>
                    </div>
            
             );
        
    }
}
 
export default Todo;

