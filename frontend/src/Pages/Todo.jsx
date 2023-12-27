import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from "../graphql/mutation";
import { ALL_TODOS, ME_USER } from "../graphql/query";

const Todo = () => {
  const {
    data: { user },
  } = useQuery(ME_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    skip: !localStorage.getItem("token"),
  });

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    user: user?._id,
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      alert(error.message);
    },
    refetchQueries: [{ query: ALL_TODOS }],
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted() {
      setTodo({
        title: "",
        description: "",
        user: user?._id,
      });
    },
    onError(error) {
      alert(error.message);
    },
    refetchQueries: [{ query: ALL_TODOS }],
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted() {
      setUpdateModal(false);
      setTodo({
        title: "",
        description: "",
        user: user?._id,
      });
    },
    onError(error) {
      alert(error.message);
    },
    refetchQueries: [{ query: ALL_TODOS }],
  });

  const [updateModal, setUpdateModal] = useState(false);

  const { data } = useQuery(ALL_TODOS);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateClick = (todoData) => {
    setTodo({
      _id: todoData._id,
      title: todoData.title,
      description: todoData.description,
      user: user?._id,
    });
    setUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setUpdateModal(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTodo({
        variables: {
          id: todo._id,
          newTodo: {
            title: todo.title,
            description: todo.description,
          },
        },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTodo({
      variables: {
        newTodo: todo,
      },
    });
    setTodo({
      title: "",
      description: "",
      user: user?._id,
    });
  };

  return (
    <div className="container mx-auto">
      {!updateModal ? (
        <form className=" relative " onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={todo.title}
            required
            onChange={handleChange}
            className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            required
            onChange={handleChange}
            value={todo.description}
            className=" flex-1 my-5 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Description"
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            type="submit"
          >
            Add Todo
          </button>
        </form>
      ) : (
        <div className="modal">
          <div className="modal-content">
            <span className="close cursor-pointer" onClick={handleUpdateClose}>
              &times;
            </span>
            <h2>Update Todo</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="title"
                value={todo.title}
                className=" flex-1 my-5 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={handleChange}
                placeholder="Title"
              />
              <input
                type="text"
                name="description"
                value={todo.description}
                className=" flex-1 my-5 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={handleChange}
                placeholder="Description"
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                type="submit"
              >
                Update Todo
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="my-5">
        {data?.todos?.map((todo) => (
          <div key={todo?._id} className="border border-gray-300 p-2">
            <div className="flex justify-between items-center my-2">
              <div className="">
                <p>{todo.title}</p>
                <p>{todo.description}</p>
              </div>
              <div>
                <button
                  onClick={() => handleUpdateClick(todo)}
                  className="bg-blue-500 text-white px-2 h-8 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteTodo({ variables: { id: todo?._id } })}
                  className="bg-red-500 text-white px-2 h-8"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
