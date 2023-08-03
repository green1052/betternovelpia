import React, {useCallback} from "react";
import $ from "cash-dom";

export function NovelContinueBox(props: { url: string, chapter: string, isBookmark?: boolean }) {
    const onClick = useCallback(() => {
        $(".loads").show();
        location.href = props.url;
    }, []);

    return (
        <button
            className="btn"
            style={{
                backgroundColor: "#5232DD",
                color: "#fff",
                width: "100%",
                height: "50px",
                textAlign: "center",
                borderRadius: "25px",
                marginTop: "5px"
            }}
            onClick={onClick}
        >
            <span style={{
                backgroundColor: "#7f66de",
                border: "1px solid #fff",
                padding: "1px 6px",
                borderRadius: "10px",
                fontSize: "11px",
                marginRight: "3px"
            }}>
                {props.chapter}
            </span>
            {props.isBookmark === true ? "북마크" : "이전 소설"} 이어보기
        </button>
    );
}
