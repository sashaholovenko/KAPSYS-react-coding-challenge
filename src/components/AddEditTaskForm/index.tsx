import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {Task} from "../../App";

interface AddEditTaskFormProps {
  setOpened: Dispatch<SetStateAction<boolean>>
  taskList: Array<any>
  setTasks: Dispatch<SetStateAction<any>>
    taskChosen: number | null
    setChosenItem: Dispatch<SetStateAction<number | null>>
}

const AddEditTaskForm = ({setOpened, taskList, setTasks, taskChosen, setChosenItem}: AddEditTaskFormProps) => {
  const [ taskTitle, setTaskTitle ] = useState<string>('')
  const [ taskPriority, setTaskPriority ] = useState<string>('')

    // setting values in form when editing task
    useEffect(() => {
        if (taskChosen !== null) {
            const chosenTask = taskList.find(elem => elem.id === taskChosen);
            if (chosenTask) {
                setTaskTitle(chosenTask.title);
                setTaskPriority(chosenTask.priority);
            }
        }
    }, [taskChosen])

    // creating or updating of Task
  const formHandler = ( event: React.FormEvent ) => {
      event.preventDefault()

      if ( taskTitle && taskPriority ) {
          const newTask = {
              // id: +taskList[taskList.length - 1].id + 1,
              id: uuidv4(),
              title: taskTitle,
              priority: taskPriority,
              status: "To Do",
              progress: 0
          }

          // logic of updating or creating
          if ( taskChosen === null ) {
              setTasks([newTask, ...taskList])
          } else {
              const newTaskList = taskList.map( task => {
                  if ( task.id === taskChosen ) {
                      console.log({...task, title: taskTitle})
                      return {...task, title: taskTitle, priority: taskPriority}
                  } else {

                      return task
                  }
              })
              setTasks(newTaskList)
              setChosenItem(null)
          }
          setOpened(false)
      }


  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close className="cp" onClick={() => setOpened(false)}/>
          </div>
          <Input label="Task" placeholder="Type your task here..." onChange={(event) => { setTaskTitle(event.currentTarget.value) }} name="title" value={taskTitle} />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li key={priority} className={
                    classNames({ [`${priority}-selected`]: priority === taskPriority, [ priority]: true})
                }
                    onClick={() => setTaskPriority(priority)}>
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title="Add" onClick={ (e) => formHandler(e)} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
