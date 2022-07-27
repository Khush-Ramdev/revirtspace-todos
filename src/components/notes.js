import React, { useEffect, useState } from "react";
import List from "./List";
import { db } from "../firebase";
import { collection, onSnapshot, query, limit, orderBy } from "firebase/firestore";

function Notes() {
    const [notes, setNotes] = useState();
    const [filterednotes, setfilteredNotes] = useState();
    const [complete, setComplete] = useState(false);
    const [incomplete, setInComplete] = useState(false);

    useEffect(() => {
        // console.log("fetch");
        const colref = collection(db, "todos");
        const q = query(colref, orderBy("timeStamp"), limit(50));
        const unsub = onSnapshot(q, (fetched) => {
            setNotes(fetched.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsub;
        //eslint-disable-nextline
    }, []);

    useEffect(() => {
        setfilteredNotes(notes);
    }, [notes]);

    useEffect(() => {
        // console.log(complete, incomplete);
        if ((complete && incomplete) || (!complete && !incomplete)) {
            // console.log("here", notes);
            setfilteredNotes(notes);
        } else if (complete) {
            setfilteredNotes(notes.filter((note) => note.completed === complete));
        } else if (incomplete) {
            setfilteredNotes(notes.filter((note) => note.completed !== incomplete));
        }
    }, [complete, incomplete, notes]);

    return (
        <div className="notessection">
            <div className="flex">
                <div className="notesheading">Added task to the List</div>
                <div className="filters">
                    <form>
                        <input
                            className="check"
                            type="checkbox"
                            value="complete"
                            name="complete"
                            checked={complete}
                            onChange={() => setComplete(!complete)}
                        />
                        <label htmlFor="complete" className="label">
                            Complete
                        </label>
                        <input
                            className="check"
                            type="checkbox"
                            value="incomplete"
                            name="complete"
                            checked={incomplete}
                            onChange={() => setInComplete(!incomplete)}
                        />
                        <label htmlFor="complete" className="label">
                            Incomplete
                        </label>
                    </form>
                </div>
            </div>
            <List notes={filterednotes} />
        </div>
    );
}

export default Notes;
