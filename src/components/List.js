import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function List({ notes }) {
    const [title, setTitle] = useState("");

    if (!notes) {
        return "";
    }
    const handleCompleted = async (id, completed) => {
        const userDoc = doc(db, "todos", id);
        await updateDoc(userDoc, { completed: !completed });
        // console.log(id, completed);
    };

    const handleDeleted = async (id) => {
        console.log(id);
        const docref = doc(db, "todos", id);
        // await deleteDoc(docref);
    };

    const handleTitleChange = async (id, ogtitle) => {
        if (title.trim() !== ogtitle.trim()) {
            const userDoc = doc(db, "todos", id);
            await updateDoc(userDoc, { title: title });
        }
    };

    const notesList = notes.map((note, index) => {
        return (
            <div key={index} className="griditem">
                <div className="index">{index + 1}.</div>
                <div className={`card ${note.completed ? "complete" : "incomplete"}`}>
                    <input
                        className="cardTitle"
                        defaultValue={note.title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => handleTitleChange(note.id, note.title)}
                    ></input>
                    <div className={`completedicon ${note.completed ? "show" : ""}`}>
                        <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <div className="buttondiv">
                        <button
                            className="completed"
                            onClick={() => handleCompleted(note.id, note.completed)}
                        >
                            {note.completed ? "Mark as Incomplete" : "Mark as Completed"}
                        </button>
                        <button className="delete" onClick={() => handleDeleted(note.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    });
    return <div className="grid">{notesList} </div>;
}

export default List;
