import { useState, useEffect, useRef, useCallback } from "react";

export default function Player({ name, symbol, isActive, updateName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const inputRef = useRef(null);

  console.log('Entering function Player ' + name);

  useEffect(() => {
    console.log('useEffect name, !isEditing');
    if (!isEditing) {
      console.log('Updating newName to match name');
      setNewName(name);
    }
  }, [name, isEditing]);

  useEffect(() => {
    console.log('useEffect isEditing');
    if (isEditing && inputRef.current) {
      console.log('Focusing input');
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = useCallback(() => {
    console.log("handleEditClick");
    if (isEditing) {
      console.log("isEditing, calling updateName");
      updateName(name, newName);
    }
    console.log("setIsEditing to ", !isEditing);
    setIsEditing(!isEditing);
  }, [isEditing, name, newName, updateName]);

  const handleChange = useCallback((evnt) => {
    console.log(
      `updating the player name from ${name} to ${evnt.target.value}`
    );
    setNewName(evnt.target.value);
  }, []);

  const handleKeyDown = useCallback((evnt) => {
    if (evnt.key === "Enter") {
      handleEditClick();
    }
  }, [handleEditClick]);

  const btnCaption = isEditing ? "Save" : "Edit";

  if (!isEditing) {
    console.log('Rendering Edit span element');
  }

  console.log('rendering player');
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            required
            onChange={handleChange}
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
