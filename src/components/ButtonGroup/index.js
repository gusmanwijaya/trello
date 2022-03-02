import "./button-group.css";

export default function ButtonGroup({
  handleSave,
  saveLabel,
  handleDelete,
  handleCancel,
}) {
  return (
    <div className="edit-buttons">
      <div
        style={{ backgroundColor: "#5aac44" }}
        onClick={handleSave}
        className="edit-button"
      >
        {saveLabel}
      </div>
      {handleDelete && (
        <div className="edit-button-cancel" onClick={handleDelete}>
          <ion-icon name="trash-outline"></ion-icon>
        </div>
      )}
      <div className="edit-button-cancel" onClick={handleCancel}>
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
  );
}
