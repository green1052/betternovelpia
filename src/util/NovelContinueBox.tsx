import React, {useCallback} from "react";
import $ from "cash-dom";

export function NovelContinueBox(props: { url: string, chapter: string, isBookmark?: boolean }) {
    const onClick = useCallback(() => {
        $(".loads").show();
        location.href = props.url;
    }, []);

    return (
        <div style={{
            backgroundColor: "#6143d1",
            color: "#fff",
            width: "100%",
            lineHeight: "40px",
            marginTop: "10px",
            textAlign: "center",
            cursor: "pointer"
        }}
             onClick={onClick}>
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
        </div>
    );
}
