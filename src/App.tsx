import "./App.scss";
import {ReactComponent as Add} from "./assets/icons/add.svg";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import TaskCard from "./components/TaskCard";
import {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;


export interface Task {
    id: number,
    title: string,
    priority: string,
    status: string,
    progress: number
}
const App = () => {
    const [taskList, setTasks] = useState<Task[]>([])
    const [showAddEditModal, setAddEditModal] = useState<boolean>(false)
    const [showDeleteModal, setDeleteModal] = useState<boolean>(false)
    const [ taskChosen, setChosen ] = useState<number | null>(null)

    // fetching data from server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/taskList');
                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
    }, [])

    // delete task and setting new list of tasks
    const deleteHandler = (id: number) => {
        const newTaskList: Task[] = taskList.filter( (task: Task) => task.id !== id)
        setTasks(newTaskList)
    }

    // changing progress values in tasks
    const onProgressHandler = (id: number) => {
        const newTaskList: Task[] = taskList.map( (task: Task) => {
            if ( task.id === id ) {
                return {...task, progress: task.progress === 100 ? 0 : task.progress + 50}
            } else {
                return task
            }
        })
        setTasks(newTaskList)
    }

    return (
        <div className="container">
            <div className="page-wrapper">
                <div className="top-title">
                    <h2>Task List</h2>
                    <Button title="Add Task" icon={<Add/>} onClick={() => {
                        setAddEditModal(true)
                    }}/>
                </div>
                <div className="task-container">
                    {taskList.map((task) => (
                        <TaskCard task={task} key={task.id}
                                  isOpenedDelete={showDeleteModal}
                                  setOpenedDeleteModal={setDeleteModal}
                                  deleteHandler={deleteHandler}
                                  setChosenTask={setChosen}
                                  setAddEditModal={setAddEditModal}
                                  onProgressHandler={onProgressHandler}
                        />
                    ))}
                </div>
            </div>
            {showAddEditModal && <AddEditTaskForm setOpened={setAddEditModal}
                                                  taskList={taskList}
                                                  setTasks={setTasks}
                                                  taskChosen={taskChosen}
                                                  setChosenItem={setChosen}
            />}
            {showDeleteModal && <DeleteModal
                                             setOpened={setDeleteModal}
                                             itemToDelete={taskChosen}
                                             deleteHandler={deleteHandler}
                                             setChosenItem={setChosen}
            />}
        </div>
    );
};

export default App;
