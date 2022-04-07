import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, getNotesAsync, removeNote } from "../redux/todos/notesSlice";
import Loading from "./Loading";
import Error from "./Error";

function Notes({ filterKey }) {
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  const getItemsIsLoading = useSelector(
    (state) => state.notes.getNotes.isLoading
  );
  const getItemsError = useSelector((state) => state.notes.getNotes.error);
  const addItemIsLoading = useSelector(
    (state) => state.notes.addNote.isLoading
  );

  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);

  if (getItemsIsLoading) {
    return <Loading message={"Loading..."} />;
  }
  if (addItemIsLoading) {
    return <Loading message={"Adding..."} />;
  }

  return (
    <div className="mt-5">
      {getItemsError && <Error message={getItemsError} />}
      <div className="modals row">
        {notes.map(
          (note) =>
            note.title.includes(filterKey) && (
              <div key={note.id} className="col-4 modall mt-3">
                <button
                  type="button"
                  className="btn btn-block"
                  style={{ backgroundColor: note.color, color: "white" }}
                  data-toggle="modal"
                  data-target={"#note" + note.id}
                >
                  {note.title}
                </button>

                <div
                  className="modal fade"
                  id={"note" + note.id}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby={
                    note.title.replace(/\s+/g, "") + note.id + "Title"
                  }
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id={
                            note.title.replace(/\s+/g, "") + note.id + "Title"
                          }
                        >
                          {note.title}
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">{note.content}</div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          data-dismiss="modal"
                          className="btn btn-danger"
                          onClick={() => dispatch(removeNote(note.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Notes;
