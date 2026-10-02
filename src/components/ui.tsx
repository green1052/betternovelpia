import type {ReactNode} from "preact/compat";
import {useState} from "preact/hooks";
import Cookies from "js-cookie";
import "../styles/ui.css";

export function ThemedApp({children}: { children: ReactNode }) {
    const theme = Cookies.get("DARKMODE") === "1" ? "dark" : "light";
    return <div data-theme={theme} className="bn-root">{children}</div>;
}

export function RestoreModal({title, placeholder, position, onClose, onRestore}: {
    title: string;
    placeholder: string;
    position: "center" | "bottom";
    onClose: () => void;
    onRestore: (data: string) => void;
}) {
    const [data, setData] = useState("");

    return (
        <div className={`bn-modal bn-modal--${position}`}>
            <div className={`bn-modal-content bn-modal-content--${position}`}>
                <h3 className="bn-modal-title">{title}</h3>
                <textarea
                    className="bn-modal-input"
                    placeholder={placeholder}
                    value={data}
                    onChange={(e) => setData((e.target as HTMLTextAreaElement).value)}
                    autoFocus
                />
                <div className="bn-modal-actions">
                    <button className="bn-btn bn-btn--outline" onClick={onClose}>
                        취소
                    </button>
                    <button className="bn-btn bn-btn--primary" onClick={() => onRestore(data)}>
                        복원
                    </button>
                </div>
            </div>
        </div>
    );
}
