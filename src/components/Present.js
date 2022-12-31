import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoIosAddCircleOutline } from 'react-icons/io';
import axios from 'axios';
import './Present.css';

function Present() {
 //navigate hook
  let navigate = useNavigate();
  let [users, setData] = useState([]);
  let [err, setErr] = useState("");
  let
    { register,
      handleSubmit,
      formState: { errors },
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

  //delete all user
  let deleteTask = () => {
    users.map(dataObj =>
        axios.delete(`http://localhost:4000/users/${dataObj.id}`)
        .then(res => {
            if (res.status === 200) {
              getUsers();
              <h1>NO Data</h1>
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
      )
    }

  //making GET Req
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='head  mt-2 '>
      {/* HTTP err message */}
      {err.length !== 0 && <p className='display-4 fw-bold text-center text-danger'>{err}</p>}
      <div className='px-5 fw-bold'> Task List</div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="task">
          {/* task name */}
          <div className="row-cols-sm-1 row-cols-md-1 row-cols-lg-1 ">
            <div className='px-4'>Task</div>
            <form>
              <div className="task  form-group  mt-3 mb-3 pt-4 p">
                <input type="task"
                  className=" form-control "
                  id="exampleInputTask1"
                  placeholder="Enter Task"
                  {...register("inputtask", { required: true })} />
              </div>
            </form>
            {errors.inputtask?.type === "required" && <p className='text-danger px-4'>{errors.inputtask?.message}*please enter input task</p>}
          </div>
          {/* start time */}
          <div className="putTime row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
            <div className=' mt-1'>Start Time</div>
            <label htmlFor="startt"></label>
            <h4> <input     {...register("startt")} className="px-4 " type="time" id="startt" name="startt"
              min="00:00" max="23:59" required /></h4>
          </div>
          {/* end time */}
          <div className="putTime row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
            <div className=' mt-1 '>End Time</div>
            <label htmlFor="endt"></label>
            <h4><input   {...register("endt")} className='px-4 ' type="time" id="endt" name="endt"
              min="00:00" max="23:59" required /></h4>

          </div>
          {/* category */}
          <div className="row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
            <div >Category</div>
            <select {...register("category")} className='form-select mt-5 pt-2' defaultValue={"DEFAULT"} >
              <option value="DEFAULT" disabled>Category</option>
              <option value="Personal">Personal</option>
              <option value="Public">Public</option>
            </select>
          </div>
          {/* status */}
          <div className="row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
            <div >Status</div>
            <select {...register("status")} className='form-select   mt-5 pt-2 ' defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>Status</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>

          </div>
          {/* add button */}
          <div className="row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
            <button type="submit" className='btn  ' >
              <div className='mt-5 mb-3 ' > <h1><IoIosAddCircleOutline /></h1></div>
            </button>

          </div>
        </div>
      </form>
      <div>
        <Link className='del fw-light float-end' to="/analytics" onClick={deleteTask}>clear</Link>
      </div>
      <hr className='mt-5' />
      <div>
        <Link className='del fw-light float-end' to="/analytics">History</Link>
      </div>
      <div>
        <h4>Your streak:{users.length}</h4>
      </div>
    </div>
  );
}
export default Present