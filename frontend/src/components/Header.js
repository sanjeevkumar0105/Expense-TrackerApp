
import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

const initialForm = {
  name: '',
  categary: '',
  amount: '',
  date: '',
//   time: ''
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { ...state, [action.field]: action.value }
    case 'reset':
      return initialForm
    default:
      return state
  }
}

const listReducer = (state, action) => {
  switch (action.type) {
    case 'set':
    return action.payload
    case 'total':
      return [...state, action.payload]
      case 'update':
        return state.map((item,i)=>i===action.index?action.payload:item)
    case 'delete':
      return state.filter((_, i) => i !== action.index)
    default:
      return state
  }
}

const Header = () => {
  const [formState, dispatchForm] = useReducer(formReducer, initialForm)
  const [items, dispatchItems] = useReducer(listReducer, [])
  const [edit,setEdit] = useState(null)
  const ABIURL = "http://127.0.0.1:8000/db";

useEffect(() => {
  const fethdata = async () => {
    try {
      const response = await axios.get(`${ABIURL}/item`);
      dispatchItems({ type: 'set', payload: response.data.data });
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  fethdata();
}, [items]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (edit !== null) {
    const response=await axios.put(`${ABIURL}/item/${edit}`,formState)
    dispatchItems({ type: 'update', index: edit, payload:response.data});
    dispatchForm({ type: 'reset' });
    setEdit(null);
  } else {
    try {
      const response = await axios.post(`${ABIURL}/item`, formState);
      dispatchItems({ type: 'total', payload: {...response.data} });
    } catch (err) {
      console.error("Error posting data", err);
    }
  }
  dispatchForm({ type: 'reset' });
};

  
  const handleChange = (e) => {
    dispatchForm({ type: 'add', field: e.target.name, value: e.target.value })
  }

 

  const handleEdit=(item)=>{
    for (let key in item){
        dispatchForm({type:"add",field:key,value:item[key]})
        setEdit(item._id)
    }
  }
  const handleDelete=async(index)=>{
    await axios.delete(`${ABIURL}/item/${index}`)
    dispatchForm({type:"delete",index})
  }

  return (
    <div>
      <div className="text-xl uppercase text-center my-5 font-semibold">
        <h1>Expense Tracker App</h1>
      </div>

      {/* Form */}
      <form
        className="flex flex-col w-[80%] m-auto mt-5"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-md font-medium mb-2">
          Name :-
        </label>
        <input
          type="text"
          placeholder="please enter the name"
          id="name"
          className="border-2 border-orange-500 py-2 px-2 mb-2"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />

        <label htmlFor="categary" className="text-md font-medium mb-2">
          Categary :-
        </label>
        <input
          type="text"
          placeholder="please enter the Categary"
          id="categary"
          name="categary"
          className="border-2 border-orange-500 py-2 px-2 mb-2"
          value={formState.categary}
          onChange={handleChange}
        />

        <label htmlFor="amount" className="text-md font-medium mb-2">
          Amount :-
        </label>
        <input
          type="number"
          placeholder="please enter the Amount"
          id="amount"
          name="amount"
          className="border-2 border-orange-500 py-2 px-2 mb-2"
          value={formState.amount}
          onChange={handleChange}
        />

        <label htmlFor="date" className="text-md font-medium mb-2">
          Date :-
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="border-2 border-orange-500 py-2 px-2 mb-2"
          value={formState.date}
          onChange={handleChange}
        />
{/* 
        <label htmlFor="time" className="text-md font-medium mb-2">
          Time :-
        </label>
        <input
          type="time"
          id="time"
          name="time"
          className="border-2 border-orange-500 py-2 px-2 mb-2"
          value={formState.time}
          onChange={handleChange}
        /> */}

        <button type="submit" className="bg-orange-500 text-white py-2 mt-2 rounded">
          Submit
        </button>
      </form>

      {/* Table */}
      <div className="mt-5 ">
        <table className="border md:w-[80%] w-full text-sm">
          <thead className='bg-orange-500 h-[50px] text-white '>
            <tr>
              <th>Name</th>
              <th>Categary</th>
              <th>Amount</th>
              <th>Date</th>
              {/* <th>Time</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {items.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>{item.categary}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                {/* <td>{item.time}</td> */}
                <td>
                  <button onClick={()=>handleEdit(item)}>Edit</button>
                </td>
                <td>
                  <button onClick={()=>handleDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Header
