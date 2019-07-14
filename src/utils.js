

export function dropingSort(stateObjects,dragged,dropArea,subItems,itemId){
    console.log(itemId,"itemId utils");
    const {items,deletedItems} = stateObjects;
    let filteredItems = [];
    let index = 0;
    let addedItems = [];
    console.log(subItems, "utils");
        if(dropArea === 'done-list'){
            index = items.findIndex(item => item.name === dragged);
            items[index].subs = subItems;
            deletedItems.unshift(items[index]);
            filteredItems = items.filter(item => item.name !== dragged);
            addedItems = deletedItems;
            
        }else{
            index = deletedItems.findIndex(item => item.name === dragged);
            deletedItems[index].subs = subItems;
            items.unshift(deletedItems[index]);
            filteredItems = deletedItems.filter(item => item.name !== dragged);
            addedItems = items;
        }
        const obj = {filteredItems,addedItems};
        return obj;
}
export function todoModel(item,uid){
    const str = '';
    const subs = item.subs !== null ? item.subs.toString(): null;
    const todo = {
        uid: uid,
        title: item.name,
        list: subs   
    }
    console.log(todo, "toooooooddoooooo");
    return todo;
}

export default {
    dropingSort,todoModel 
}