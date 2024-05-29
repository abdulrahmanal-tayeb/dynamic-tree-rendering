import { Grow } from "@mui/material";

/**
 * Fixed modal that is shown in the middle of the screen.
 * @param {*} param0 
 * @returns 
 */

export default function Message({ message, title, onClose, className, backgroundColor }) {
    const handleClose = () => {
        if (onClose) return onClose();
        alert("ON CLOSE FAILED");
    }
    return (
        <>
            <div className="background-cover layer-beforetop"></div>
            <Grow in={true} timeout={500} className="modal-container layer-top" style={{ transform: "translate(-50%, -50%)", backgroundColor, minWidth: 200, width: window.innerWidth > 500 && "fit-content" }}>
                <div className={className} style={{}}>
                    {onClose && <div onClick={handleClose} className="message-close"><i className="bi bi-x-lg"></i></div>}
                    <div style={{
                        width: "100%",
                        flexDirection: "column",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}
                    >
                        <h2>{title}</h2>
                        <p>{message}</p>
                    </div>
                </div>
            </Grow>
        </>
    )
}