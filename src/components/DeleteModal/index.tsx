import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"
import {Dispatch, SetStateAction} from "react";

interface DeleteModalProps {
    setOpened: Dispatch<SetStateAction<boolean>>
    itemToDelete: number | null
    deleteHandler: (id: number) => void
    setChosenItem: Dispatch<SetStateAction<number | null>>
}
const DeleteModal = ({setOpened, itemToDelete, deleteHandler, setChosenItem}: DeleteModalProps) => {

    const deleteButtonHandler = () => {
        if (itemToDelete !== null) {
            deleteHandler(itemToDelete)
            setOpened(false)
            setChosenItem(null)

        }
    }


  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={deleteButtonHandler} />
          <Button title="Cancel" outline onClick={() => {setOpened(false)}} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
