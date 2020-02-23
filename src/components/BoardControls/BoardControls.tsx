import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "./board-controls.css";
import { SortDirection } from "../Main/Main";
import { useOvermind } from "../../overmind";
import { AppMode } from "../../overmind/state";
interface BoardControlsProps {
  addColumn: () => void;
  title: string;
  socket: SocketIOClient.Socket;
  boardId: string;
  remainingStars: number | undefined;
  sortDirection: SortDirection;
  sortColumnCardsByStars: (e: React.MouseEvent) => void;
};

export const BoardControls = (props: BoardControlsProps) => {
  let titleInput = React.createRef<HTMLInputElement>();
  let [isEditingTitle, updateIsEditingTitle] = useState(false);
  let { state: { mode } } = useOvermind();

  function editTitle(event?: React.MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    updateIsEditingTitle(!isEditingTitle);
  }

  function saveTitle() {
    props.socket.emit("board:updated", {
      boardId: props.boardId,
      title: titleInput?.current?.value,
      sessionId: sessionStorage.getItem("retroSessionId"),
    });
    editTitle();
  }

  let titleContent;
  if (isEditingTitle) {
    titleContent = (
      <>
        <input className="board-title--text" type="text" autoFocus={true} defaultValue={props.title} ref={titleInput}></input>
        <div className="board-title--actions">
          <button onClick={saveTitle}>Save</button>
          <a href="" onClick={event => editTitle(event)}>cancel</a>
        </div>
      </>
    );
  } else {
    titleContent = (
      <h1 className="board-title--text">
        {props.title} <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon" onClick={() => editTitle()} />
      </h1>
    );
  }

  return (
    <div id="board-controls">
      <div id="board-title">
        { titleContent }
      </div>
      {
        mode === AppMode.review ?
          <button className="button button__sort" onClick={props.sortColumnCardsByStars}>
            ⭐️s { props.sortDirection === SortDirection.asc ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} /> }
          </button>
        :
        <div className="board-actions">
          <button
            className="button button--create"
            onClick={() => props.addColumn()}
          >
            New Column
            </button>
          <strong className="stars-remaining">
            ⭐️: {props.remainingStars}
          </strong>
        </div>
      }
    </div>
  );
}
