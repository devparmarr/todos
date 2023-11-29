import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import "./TodoApp.css";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ListTodosComponent() {

   
    const [todos,setTodos]=useState([]);
    const [message,setMessage] = useState(null)
    const authContext = useAuth();
    const navigate = useNavigate();
    



    function refreshTodos(){
        retrieveAllTodosForUsernameApi(authContext.username)
        .then((response)=>setTodos(response.data))
        .catch((error)=>console.log(error))
    }
    
    // const todos = [
    //                 {id: 1, description: 'Learn AWS', done: false, targetDate:targetDate},
    //                 {id: 2, description: 'Learn Full Stack Dev', done: false, targetDate:targetDate},
    //                 {id: 3, description: 'Learn DevOps', done: false, targetDate:targetDate},
    //             ]
    useEffect(() => {
        const timer = setTimeout(() => {
          setMessage(null); // or perform any other action to hide the message
        }, 2000);
    
        return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
      }, [message]);



    function deleteTodo(id){
        deleteTodoApi(authContext.username, id)
        .then(

            () => {
                setMessage(`Delete of todo with id = ${id} successful`)
                refreshTodos()
            }
            //1: Display message
            //2: Update Todos list
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id){
      navigate(`/todo/${id}`)
    }

    function addNewTodo() {
      navigate(`/todo/-1`)
  }


    return (
      <>
     
      <div className="container">
        
        <div className="d-flex align-items-center" >
        <h1>Things You Want To Do!</h1>
        <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                
                <th>Description</th>
                <th>Is Done?</th>
                <th>Target Date</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {message && (
          <div className=" message-box"  role="alert">
            {message}
          </div>
        )}
      </>
    );
}