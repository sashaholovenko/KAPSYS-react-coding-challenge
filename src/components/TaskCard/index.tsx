import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import {Dispatch, SetStateAction} from "react";
import {Task} from "../../App";


interface TaskCard {
    setOpenedDeleteModal: Dispatch<SetStateAction<boolean>>
    isOpenedDelete: boolean
    deleteHandler: () => void
    setChosenTask: Dispatch<SetStateAction<number>>
    setAddEditModal: Dispatch<SetStateAction<boolean>>
    onProgressHandler: (id: number) => void
}

const progressList: { [key: number]: string } = {
    0: "To Do",
    50: "In Progress",
    100: "Done",
};

const TaskCard = ({ task, setOpenedDeleteModal , setChosenTask, setAddEditModal, onProgressHandler }: any) => {
  const { id, title, priority, status, progress }: Task = task

    // show modal & set task id to delete
    const onDeleteHandler = () => {
        setOpenedDeleteModal(true)
        setChosenTask(id)
    }

    // show modal & set task id to edit
    const onEditHandler = () => {
        setAddEditModal(true)
        setChosenTask(id)
    }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper" onClick={() => onProgressHandler(id)}>
        <button className="status">{progressList[progress]}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={onEditHandler}/>
        <DeleteIcon className="cp" onClick={onDeleteHandler}/>
      </div>
    </div>
  )
}

export default TaskCard
