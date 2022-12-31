import React from 'react'
import { useState, useEffect } from 'react';
import './Analytics.css'
import { AiTwotoneEdit } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal,Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
function Analytics() {
  
  let navigate = useNavigate();

  //userdata and error State
  let [users, setData] = useState([]);
  let [err, setErr] = useState("");

  //user to edit a state
  let [userToEdit, setUSerToEdit] = useState({});

  //modal state
  let [show, setShow] = useState(false)

  let showModal = () => setShow(true);
  let closeModal = () => setShow(false);

  let
    { register,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues
    } = useForm();

  //form Submit
  let submitForm = (userObj) => {
    //save new task in json-server by making http POST req
    axios.post(" http://localhost:4000/users", userObj)
      .then(response => {
        if (response.status === 201) {
          setErr("");
          //navigate to anlayitcs component
          navigate("/Analytics")
        }
      })
      .catch(err => {
        console.log("error is ", err)
        //the client was given an error response [4XX,5XX]
        if (err.response) {
          setErr(err.message)
        }
        //the client recieved a response and the rep was never left
        else if (err.request) {
          setErr(err.message)
        }
        else {
          setErr(err.message)
        }
      })
  };

  //getUsers function
  let getUsers = () => {
    //fetch users
    axios.get("http://localhost:4000/users")
      .then(response => {
        if (response.status === 200)
          setErr("");
        setData(response.data)
      })
      .catch(err => {
        //the client was given an error response [4XX,5XX]
        if (err.response) {
          setErr(err.message)
        }
        //the client recieved a response and the rep was never left
        else if (err.request) {
          setErr(err.message)
        }
        else {
          setErr(err.message)
        }
      })
  }

  //edit user
  let editUser = (dataToBeEdited) => {
    showModal();
    setUSerToEdit(dataToBeEdited)
    //fill input fields with user details
    setValue("inputtask", dataToBeEdited.inputtask)
    setValue("startt", dataToBeEdited.startt)
    setValue("endt", dataToBeEdited.endt)
    setValue("category", dataToBeEdited.category)
    setValue("status", dataToBeEdited.status)
  }

  //save user
  let saveUser = () => {
    closeModal();
    //getmodified data
    let modifiedUser = getValues()

    //set id for modifiedtask
    modifiedUser.id = userToEdit.id;

    //make HTTP PUT req to save modifiedUser object
    axios.put(`http://localhost:4000/users/${modifiedUser.id}`, modifiedUser)
      .then(res => {
        if (res.status === 200) {
          getUsers();
        }
      })
      .catch(err => {
        //the client was given an error response [4XX,5XX]
        if (err.response) {
          setErr(err.message)
        }
        //the client recieved a response and the rep was never left
        else if (err.request) {
          setErr(err.message)
        }
        else {
          setErr(err.message)
        }
      })

  }

  //delete user
  let deleteTask = (taskId) => {
    if (window.confirm('Are you sure?')) {
      axios.delete(`http://localhost:4000/users/${taskId.id}`)
        .then(res => {
          if (res.status === 200) {
            getUsers();
          }
        })
        .catch(err => {
          //the client was given an error response [4XX,5XX]
          if (err.response) {
            setErr(err.message)
          }
          //the client recieved a response and the rep was never left
          else if (err.request) {
            setErr(err.message)
          }
          else {
            setErr(err.message)
          }
        })
    }

  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='table '>
      {err.length !== 0 && <p className='display-4 fw-bold text-center text-danger'>{err}</p>}
      <div className='table mt-4'>
        <table className=' table border p-5 row-cols-sm-1 row-cols-md-1 row-cols-lg-1'>
          <thead >
            <tr className='tablehead'>
              <th>S.no</th>
              <th>Input Task</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='tablebody'>
            {
              users.map(dataObj =>
                <tr key={dataObj.id} >
                  <td>{dataObj.id}</td>
                  <td>{dataObj.inputtask}</td>
                  <td>{dataObj.startt}</td>
                  <td>{dataObj.endt}</td>
                  <td>{dataObj.category}</td>
                  <td>{dataObj.status}</td>
                  <td>
                    <button type="submit" className='btn btn-warning float-start' onClick={() => editUser(dataObj)}>
                      <div> <h4><AiTwotoneEdit /></h4></div>
                    </button>
                    <button type="submit" className='btn btn-danger float-end' onClick={() => deleteTask(dataObj)} >
                      <div > <h4><RiDeleteBinFill /></h4></div>
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      {/* Modal to edit user */}
      <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        centered
        className='modal'
      >

        {/* modal header */}
        <Modal.Header>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>

        {/* modal body */}
        <Modal.Body>
          {/* form to edit */}
          <form onSubmit={handleSubmit(submitForm)}>
            {/* task name */}
            <div className='p-3 fw-bolder'>Task</div>
            <form>
              <div className="task form-group ">
                <input type="task"
                  className=" form-control className='p-3 fw-bolder'"
                  id="exampleInputTask1"
                  placeholder="Enter Task"
                  {...register("inputtask", { required: true })} />
              </div>
              {errors.inputtask?.type === "required" && <p className='text-danger px-4'>{errors.inputtask?.message}*please enter input task</p>}
            </form>

            {/* start time */}
            <div className='p-3 fw-bolder'>Start Time</div>
            <label htmlFor="startt"></label>
            <h4><input  {...register("startt")} className="px-4 mx-4" type="time" id="startt" name="startt"
              min="00:00" max="23:59" required /></h4>

            {/* end time */}
            <div className='p-3 fw-bolder' >End Time</div>
            <label htmlFor="endt"></label>
            <h4><input  {...register("endt")} className='px-4 mx-4' type="time" id="endt" name="endt"
              min="00:00" max="23:59" required /></h4>

            {/* category */}
            <div className='p-3  fw-bolder'>Category</div>
            <select {...register("category")} className='form-select  mx-2' defaultValue={"DEFAULT"} >
              <option value="DEFAULT" disabled>Category</option>
              <option value="Personal">Personal</option>
              <option value="Public">Public</option>
            </select>

            {/* status */}
            <div className='p-3 fw-bolder' >Status</div>
            <select {...register("status")} className='form-select   mx-2 ' defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>Status</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </form>
        </Modal.Body>

        {/* modal footer */}
        <Modal.Footer>
          <Button onClick={saveUser}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Analytics;





