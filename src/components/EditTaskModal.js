import React from 'react';
import Modal from 'react-modal';
import EditTask from './EditTask'

const EditTaskModal = (props) => (
    <Modal
      isOpen={!!props.focusedTask}
      contentLabel="Selected Option"
      onRequestClose={props.handleClearFocusedTask}
      closeTimeoutMS={500}
      //className="modal"
      >
        <div>
      <h3 className="modal__title">{props.editTask ? props.editTask.title : "No selected Task"}</h3>
      <button className="button" onClick={props.handleClearFocusedTask}>Cancel</button>
      {props.editTask &&
      <EditTask
        goalId={props.focusedGoal}
        editTask={props.editTask}
        handleUpdateTask={props.handleUpdateTask}
        display={props.display}
        focusedDate={props.focusedDate}
        goals={props.goals}
        categories={props.categories}
        handleClearFocusedTask={props.handleClearFocusedTask}
      />}
    </div>

    </Modal>
  );


export default EditTaskModal
