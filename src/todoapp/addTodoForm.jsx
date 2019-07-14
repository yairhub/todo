import React from 'react';


const AddTodoForm = ({onSubmit,onChange,data,ref}) => {
    return (
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input className='form-control'
                    onChange={(e) => onChange(e)}
                    type="text" 
                    value={data.name} 
                    name="add" 
                    placeholder='Add Somthing To Do...'
                    />
                </div>
            </form>

      );
}
 
export default AddTodoForm;