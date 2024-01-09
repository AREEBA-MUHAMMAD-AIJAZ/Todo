import  Update from '@/component/UpdateList'
import { useState } from 'react';

const TodoCards = ({ title, body , delid , id , update }) => {
  const [open , setOpen ] = useState(false) 

  return (<>
    {
      open ? <Update 
      setOpen={setOpen}
      title={title}
      body={body}
      id={id}
      update={update}
      /> : 
    <div className="border text-start flex justify-between items-center max-w-6xl mx-auto" >
      <h1 className=" text-2xl font-semibold p-2 uppercase text-blue-600 ">
        {title} 
      </h1>
      <h1 className=" text-xl font-light p-2 ">
        {body.split("" , 20)}...
      </h1>
      <div className="flex justify-end gap-5 p-3">

        <button onClick={() => {setOpen(true)}}>
          <img src="edit.png" alt="edit icon" width={40}  />
        </button>
        <button onClick={()=>delid(id)} >
         <div> <img src="delete.png" alt="deleted icon" width={40}  /></div>
        </button>
      </div>
    </div>
    }
    </>
  );
};

export default TodoCards;
