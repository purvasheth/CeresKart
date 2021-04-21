export const DeleteModal = ({ onCancel, onDelete, calledFrom }) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-content">
          <button
            id="close-btn"
            className="btn-close btn-lg"
            onClick={onCancel}
          >
            <i className="fa fa-times"></i>
          </button>
          <div className="modal--delete">
            {`Item will be removed from ${calledFrom} permanently`}
            <div className="modal__buttons">
              <button id="cancel-btn" className="btn btn-sm" onClick={onCancel}>
                Cancel
              </button>
              <button
                id="delete-btn"
                className="btn bg-red-600 btn-sm ml-1"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
