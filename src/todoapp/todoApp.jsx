import React, { Component } from 'react';
import AddTodoForm from './addTodoForm';
import {dropingSort,todoModel} from '../utils';
// import './todo.css';
import Todo from './todo';
import myData from './list.json';
import axios from 'axios';


///users: id,name, password 
///lists: id,uid,lists-> 
// doneItems =
// {
//     "[
//         {name:'shoping',subs:['sub','sub']},
//         {name:'trips',subs:['sub','sub']},
//         {name:'',subs:['sub','sub']},               
//     ]"
// } 
                 
class TodoApp extends Component {   
    state = { 
      items: [],
      deletedItems:[],
      item: {id: 0,name: '',subs:[]},
      dropIndex: 1,
     
     }
     
    async componentDidMount(){
        try{
            const deletedItems = [...this.state.deletedItems];

            let {data} = await axios.get("http://todo.yairkiel.com/api/lists");
            
            data.map((element) =>{
                (element.list = (element.list !== null) ? element.list.split(',') : []);  
            } 
            );
            data.forEach((element,index,arr) => {
            console.log(element,index,arr , "value");
                 deletedItems.push({id: element.id, name: element.title, subs:element.list});
            });
            this.setState({deletedItems});
        }catch(ex){
             const {message} = ex;
        }
    }
    /// handle new item list
      handleSubmit = async (e) => {
          e.preventDefault();
          const uid = 3
          try{
              const items = [...this.state.items];
              const obj = todoModel({...this.state.item},uid);
              const {data} = await axios.post("http://todo.yairkiel.com/api/lists",obj);
              console.log(data ,"new Item");
              items.push({id:data.id,name:obj.title,subs:[]});
              this.setState({items,item:{id:0,name:'',subs:[]}});
            //   window.location.reload();
          }catch(ex){
           console.log(ex);
          }
    } 
    
    handleChange =({currentTarget}) => {
        let item = {...this.state.item};
        item.name = currentTarget.value;
        this.setState({item});
    }
     handleDelete = async(currentItem) => {
         try{
             console.log(currentItem, "handleDelet");
             let deletedItems = [...this.state.deletedItems];
                 const {data} = await axios.delete("http://todo.yairkiel.com/api/lists/" + currentItem.id);
         
             console.log(data);
             deletedItems = deletedItems.filter(item => item.name !== currentItem.name);
             this.setState({deletedItems});
         }catch(ex){
           console.log(ex.message);
         }
      
    }
    //// handle drag proccess
        
    onDragStart(e,data,subItems,erea){
     e.dataTransfer.setData("location", e.currentTarget.closest('#' + erea).id);
     e.dataTransfer.setData("text/plain", data.name);
     e.dataTransfer.setData("object", JSON.stringify(subItems));
     e.dataTransfer.setData("id", e.currentTarget.id);
    }
    onDragOver(e){
        e.preventDefault();
    }
   
    onDrop(e){
        e.preventDefault();
      
        if(e.dataTransfer.getData("location") !== e.currentTarget.id){
            let dragged = e.dataTransfer.getData("text");
            let subItems = JSON.parse(e.dataTransfer.getData("object"));
            const dropId = e.currentTarget.id;
            const ItemId = e.dataTransfer.getData("id");
            const obj = dropingSort(this.state,dragged,dropId,subItems,ItemId);
            
            const dropIndex = obj.addedItems.findIndex(item => item.name == dragged);       
                if(dropId === "done-list"){
                   this.setState({deletedItems: obj.addedItems,items: obj.filteredItems});
                } else {
                   this.setState({deletedItems: obj.filteredItems,items: obj.addedItems});
                } 
            this.setState({dropIndex});
            
        }
    }
    
    render() { 
      
      const {items,item,deletedItems,subItems,dropIndex} = this.state;
    
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-12">
                            <h1>Todo's</h1> 
                            <AddTodoForm  
                            data={item} 
                            onSubmit={this.handleSubmit} 
                            onChange={this.handleChange} />
                    </div>
                </div>
                <div className="row">
                        <div className="col-lg-6 text-center col-md-12" >
                            <div className="row">
                                <div className="col-12">
                                    <p>Todo - List</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 col-10 m-auto border bg-success pb-3 pt-2"
                                 id='do-list'
                                 onDragOver={(e) => this.onDragOver(e)}
                                 onDrop={(e) => this.onDrop(e)}
                                 style={{minHeight: '300px'}}>
                                    <div className="row">
                                        {items.map(item => 
                                        <Todo
                                        deletedItems={deletedItems}
                                        erea={'do-list'}
                                        dropIndex={dropIndex}
                                        items={items}
                                        // subs={subItems}
                                        itemClass='todo'
                                        key={item.name} 
                                        data={item}
                                        onDragStart={this.onDragStart}
                                        />)} 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center col-md-12">
                            <div className="row">
                                <div className="col-12">
                                    <p>Done - List</p>
                                </div>
                            </div>
                            <div className="row">
                                <div 
                                id='done-list'
                                onDragOver={(e) => this.onDragOver(e)}
                                onDrop={(e) => this.onDrop(e)}
                                className="col-lg-8 col-10 m-auto border bg-secondary pb-3 pt-2" 
                                style={{minHeight: '300px'}}
                                >
                                    <div className="row">
                                    {deletedItems.map(item => 
                                        <Todo
                                        erea={'done-list'}
                                        deletedItems={deletedItems}
                                        dropIndex={dropIndex}
                                        items={items}
                                        subs={item.subs}
                                        itemClass="done" 
                                        key={item.name} 
                                        data={item}
                                        onDragStart={this.onDragStart}
                                        onDelete={this.handleDelete} 
                                        />)}
                                    </div>            
                                </div>
                            </div >
                        </div>
                </div>

            </div>

          //  </DragDropContext>
        );
    }
}
 
export default TodoApp;