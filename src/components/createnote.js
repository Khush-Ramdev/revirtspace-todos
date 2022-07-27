import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

function Notes() {
    const [note, setNote] = useState({
        id: "",
        title: "",
        completed: false,
        userId: "",
        timeStamp: "",
    });

    const reset = () => {
        setNote({ id: "", title: "", completed: false, userId: "" });
    };

    const handleNoteChange = (e) => {
        const { value, id } = e.target;
        if (id === "title") {
            setNote({ ...note, title: value });
        }
    };

    const submitNote = async (e) => {
        e.preventDefault();
        if (note.title === "") {
            document.querySelector(".error").classList.toggle("hidden");
            setTimeout(() => {
                document.querySelector(".error").classList.toggle("hidden");
            }, 1000);
        } else {
            const colRef = collection(db, "todos");
            addDoc(colRef, note).then((added) => {
                const updateDocId = doc(db, "todos", added.id);
                updateDoc(updateDocId, {
                    id: added.id,
                    timeStamp: Date.now(),
                });
            });
            reset();
        }
    };

    return (
        <div className="createnote">
            <div className="sectionheading">Add a new task in the list</div>
            <form className="newnote">
                <input
                    placeholder="Enter the task here"
                    onChange={handleNoteChange}
                    id="title"
                    value={note.title}
                ></input>
                <button type="submit" onClick={submitNote} id="submit">
                    Submit
                </button>
            </form>
            <div className="error hidden">Description cannot be empty</div>
        </div>
    );
}

export default Notes;
