import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { GlobalContext } from "../context/GlobalContext";
import useForm from "../hooks/useForm";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TaskForm = () => {

  const { addTask, tasks, editTask } = useContext(GlobalContext)

  const [formValues, setFormValues, handleInputChange] = useForm({
    id: "",
    title: "",
    description: "",
  });

  const { title, description } = formValues;

  const history = useHistory();
  const params = useParams()

  const onSubmitForm = (e) => {
    e.preventDefault();

    if(title === '' || description === '') {
      return (
        Swal.fire('Error', 'Please complete all the fields', 'error')
      )
    }

    if(formValues.id) {
      editTask(formValues);
    } else {
      addTask(formValues);
    }
      
    history.push('/')
  }

  useEffect(() => {

    const taskFound = tasks.find(task => task.id === params.id)

    if(taskFound) {
      setFormValues(taskFound)
    } 

  }, [params.id, tasks, setFormValues])

  return (
    <div className="flex justify-center items-center h-3/4 animate__animated animate__fadeIn">
      <form className="w-6/12 bg-gray-900 p-10" onSubmit={onSubmitForm}>
        <h2
          className="mb-10 text-center uppercase"
          style={{ fontSize: "3rem" }}
        >
          { formValues.id ? 'Edit Task' : 'Add Task' }
        </h2>

        <div className="mb-5">
          <input
            type="text"
            className="py-3 px-4 focus:outline-none focus:text-gray-100 bg-gray-700 w-full"
            placeholder="Write a Title"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus="on"
          />
        </div>

        <div className="mb-5">
          <textarea
            rows="2"
            className="py-3 px-4 focus:outline-none focus:text-gray-100 bg-gray-700 w-full"
            placeholder="Write a description"
            name="description"
            value={description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button className="bg-green-600 w-full hover:bg-green-500 py-2 px-4 mt-5">
          { formValues.id ? 'Update Task' : 'Create Task' }
        </button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default TaskForm;
