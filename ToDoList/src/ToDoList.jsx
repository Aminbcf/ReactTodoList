import React, { useState, useEffect } from "react";
import './TodoList.css';

function ToDoList() {
    const [Task, setTask] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function formatDateTime(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    function HandleTitle(event) {
        setTitle(event.target.value);
    }

    function HandleDescreption(event) {
        setDescription(event.target.value);
    }

    function HandleSubmit(event) {
        event.preventDefault();

        const newTask = {
            time: formatDateTime(new Date()),
            description: description,
            title: title
        };

        setTask(t => [...t, newTask]);
        Reset();
    }

    function handleRemove(index) {
        setTask(Task.filter((_, i) => i !== index));
    }

    function Reset() {
        setTitle("");
        setDescription("");
    }

    return (
        <div className="container">
            <ul className="list">
                {Task.map((task, index) => (
                    <li className="ListElement" key={index}>
                        <h3 className="liTitle">{task.title}</h3>
                        <div className="task-details">
                            <p>{task.description}</p>
                            <span className="task-time">{task.time}</span>
                        </div>
                        <button onClick={() => handleRemove(index)} className="RemoveTask">Remove</button>
                    </li>
                ))}
            </ul>

            <form>
                <h2>Enter a new task</h2>
                <input type="text" name="Title" onChange={HandleTitle} className="Title" value={title} placeholder="Task title" />
                <input type="text" name="Description" onChange={HandleDescreption} className="Description" value={description} placeholder="Task description" />
                <p className="ClassName">Current Time: {formatDateTime(currentTime)}</p>
                <button className="Submit" onClick={HandleSubmit}>Submit</button>
                <button type="button" className="Reset" onClick={Reset}>Reset</button>
            </form>
        </div>
    );
}

export default ToDoList;