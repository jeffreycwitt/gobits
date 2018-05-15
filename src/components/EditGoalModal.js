import React from 'react';
import Modal from 'react-modal';
import EditGoal from './EditGoal'

const EditGoalModal = (props) => (
    <Modal
      isOpen={!!props.focusedEditGoal}
      contentLabel="Selected Option"
      onRequestClose={props.handleClearFocusedEditGoal}
      closeTimeoutMS={500}
      //className="modal"
      >
        <div>
      <h3 className="modal__title">{props.focusedEditGoal ? props.focusedEditGoal.title : "No selected Goal"}</h3>
      <button className="button" onClick={props.handleClearFocusedEditGoal}>Cancel</button>
      {props.focusedEditGoal &&
      <EditGoal
        categoryId={props.focusedCategory}
        focusedEditGoal={props.focusedEditGoal}
        handleUpdateFocusedEditGoal={props.handleUpdateFocusedEditGoal}
        display={props.display}
        focusedDate={props.focusedDate}
        categories={props.categories}
        handleClearFocusedEditGoal={props.handleClearFocusedEditGoal}
      />}
    </div>

    </Modal>
  );


export default EditGoalModal
