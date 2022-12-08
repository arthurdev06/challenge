import React, { useState } from "react";
import { CiUndo, CiRedo } from "react-icons/ci";
import "./App.css";

interface ClickedProps {
    clientX: number;
    clientY: number;
}

function App() {
    const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
    const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([]);

    function getCordenates(e: React.MouseEvent<HTMLElement>) {
        const { clientX, clientY } = e;

        setClickedPoints([...clickedPoints, { clientX, clientY }]);
    }

    function handleUndo() {
        const newClickedPoint = [...clickedPoints];
        const undoPoint = newClickedPoint.pop();
        setClickedPoints(newClickedPoint);
        if (!undoPoint) return;
        setUndoPoints([...undoPoints, undoPoint]);
    }

    function handleRedo() {
        const newUndoPoints = [...undoPoints];
        const redoPoint = newUndoPoints.pop();
        if (!redoPoint) return;
        setUndoPoints(newUndoPoints);
        setClickedPoints([...clickedPoints, redoPoint]);
    }

    return (
        <>
            <section>
                <button
                    disabled={clickedPoints.length === 0}
                    onClick={handleUndo}
                >
                    <CiUndo style={{ width: "30px", height: "30px" }} />
                </button>
                <button
                    disabled={undoPoints.length === 0}
                    onClick={handleRedo}
                >
                    <CiRedo style={{ width: "30px", height: "30px" }} />
                </button>
            </section>
            <div className="App" onClick={getCordenates}>
                {clickedPoints.map((clikckedPoint, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                left: clikckedPoint.clientX - 7,
                                top: clikckedPoint.clientY - 7,
                                position: "absolute",
                                borderRadius: "50%",
                                background: "#ffffff",
                                width: "15px",
                                height: "15px",
                                userSelect: "none",
                            }}
                        ></div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
