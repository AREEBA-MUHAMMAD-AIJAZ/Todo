"use client";
import { useEffect, useState } from "react";
import TodoCards from "../../component/TodoCards";
import Loading from "@/component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Todo = () => {
  const [input, setInput] = useState({ title: "", body: "", email: "" });
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  const Change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submit = async () => {
    {
      if (input.title === "" || input.body === "" || input.email === "") {
        toast.error("Fields Empty");
      } else {
        const res = await axios.post(
          "/api/v2/addTask",
          input
        );
        // console.log(res,"res");
        // setArray([...Array, input]);
        setInput({ title: "", body: "", email: "" });
        toast.success("Task Added...");
        toast.error("Task added but not save! Let's Signup");
      }
    }
  };
  // console.log(Array)

  const del = async (id) => {
    try {
      const res = await axios.delete(
        `/api/v2/deleteTask/${id}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
    // Array.splice(id, "1");
    // setArray(del);
  };
  const getData = async () => {
    const res = await axios.get("/api/v2/getTasks");
    setData(res.data);
    setLoader(false);
    console.log(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const update = async (id, data) => {
    const res = await axios.put(
      `/api/v2/updateTask/${id}`,
      data
    );
  };

  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        <div className="max-w-6xl mx-auto mt-5 text-center">
          <ToastContainer />
          <h1 className="text-4xl font-bold underline">TODO LIST</h1>
          <div className="w-96 mx-auto h-96 pt-20">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={input.title}
              required
              onChange={Change}
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
            />

            <input
              name="email"
              type="email"
              placeholder="email"
              value={input.email}
              required
              onChange={Change}
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className="mt-3 p-2 block w-full rounded-md border-0 text-gray-900 shadow-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
              value={input.body}
              onChange={Change}
            />

            <div className="m-5 text-center">
              <button onClick={submit}>
                <a
                  href="#_"
                  class="relative inline-flex items-center justify-end  px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
                >
                  <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                  <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                    Add Todo
                  </span>
                </a>
              </button>
            </div>
          </div>

          <div className=" border border-3 border-gray-500 rounded-xl mx-3">
            <h1 className="text-3xl font-bold border border-3 border-gray-500  rounded-xl p-3 text-blue-600">
              TodoList
            </h1>
            <div className="">
              {data &&
                data.list.map((item, index) => (
                  <div key={index}>
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      update={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
