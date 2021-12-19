import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import {configs} from "../index";
import {appendSide} from "../util/AppendSide";
import styled, {css} from "styled-components";
import {isDarkMode} from "../util/IsDarkMode";
import useForceUpdate from "use-force-update";
import toastr from "toastr";

function Card(props: { children: React.ReactNode }) {
    return (
        <div className="col-lg-4">
            <hr/>
            <div className="card rounded-10 mg-b-10" style={{boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)"}}>
                {props.children}
            </div>
        </div>
    );
}

function CardHead(props: { label: string }) {
    return (
        <div className="card-header card-header-default bg-dark"
             style={{borderRadius: "10px 10px 0px 0px", height: "45px"}}>
            <span style={{color: "#eee", fontSize: "14px"}}>
                <i className="icon ion-ios-gear"/>
                &nbsp;
                {props.label}
            </span>
        </div>
    );
}

function CardBody(props: { children: React.ReactNode }) {
    return (
        <div className="card-body" style={{padding: "20px"}}>{props.children}</div>
    );
}

function Checkbox(props: { config: Config, label: string }) {
    const [checked, setChecked] = useState((GM_getValue(props.config, false) as boolean) ?? false);

    const change = useCallback(() => {
        setChecked(!checked);
        GM_setValue(props.config, !checked);
    }, [checked]);

    return (
        <>
            <div onClick={change} className="ui-switcher" aria-checked={checked}/>
            {props.label}
            <br/>
            <br/>
        </>
    );
}

function TextBox(props: { config: Config, label: string }) {
    const [value, setValue] = useState((GM_getValue(props.config, "") as string) ?? "");

    const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        GM_setValue(props.config, e.target.value);
        setValue(e.target.value);
    }, []);

    return (
        <div className="form-group">
            <label className="form-control-label" style={{fontSize: "12px"}}>{props.label}:</label>
            <input onChange={change} className="form-control" type="text" value={value}/>
            <br/>
            <br/>
        </div>
    );
}

function NumberBox(props: { config: Config, label: string, min: number, max: number }) {
    const [value, setValue] = useState((GM_getValue(props.config, 0) as number) ?? 0);

    const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const changeValue = e.target.value;

        if (!changeValue) return;

        const convert = Number(changeValue);

        if (isNaN(convert) || props.min > convert || props.max < convert) return;

        GM_setValue(props.config, convert);
        setValue(convert);
    }, []);

    return (
        <div className="form-group">
            <label className="form-control-label" style={{fontSize: "12px"}}>{props.label}:</label>
            <input onChange={change} className="form-control" type="number" value={value} min={props.min}
                   max={props.max}/>
            <br/>
            <br/>
        </div>
    );
}

function exportConfig() {
    return GM_listValues().reduce((acc, key) => ({...acc, [key]: GM_getValue(key)}), {});
}

function Setting() {
    const [hide, setHide] = useState(true);
    const [inputHide, setInputHide] = useState(true);
    const [data, setData] = useState("");

    const forceUpdate = useForceUpdate();

    const quit = useCallback(() => {
        $(".loads").show();
        location.reload();
    }, []);

    const backup = useCallback(() => {
        const data = exportConfig();

        if (!Object.keys(data).length) return;

        GM_setClipboard(JSON.stringify(data));

        toastr.info("클립보드로 복사되었습니다.", "설정");
    }, []);

    const restore = useCallback(() => {
        if (data) {
            for (const [key, value] of Object.entries(JSON.parse(data)))
                GM_setValue(key as GMValue, value);

            toastr.info("복원되었습니다.", "북마크");
        } else
            toastr.info("데이터가 비어있습니다.", "북마크");

        setInputHide(true);
        setData("");
    }, [data]);

    const reset = useCallback(() => {
        for (const config of GM_listValues())
            GM_deleteValue(config);

        forceUpdate();
    }, []);

    useEffect(() => {
        appendSide(`<hr style="margin: 3px 0;">`);

        appendSide(
            $(`<li style="padding: 10px 25px;"><span style="width:20px;display: inline-block;text-align:center;"><i class="icon ion-ios-gear"></i></span> 설정</li>`)
                .on("click", () => setHide(false))
        );
    }, []);

    const MainDiv = styled.div`
      overflow: auto;
      bottom: 0;
      position: fixed;
      z-index: 99999;
      width: 100vw;
      height: 100vh;
      background-color: ${isDarkMode() ? "black" : "white"};
      ${hide && css`display: none;`};
    `;

    const TitleDiv = styled.div`
      position: sticky;
      top: 0;
      z-index: 999999;
      text-align: center;
      width: 100vw;
      height: 50px;
      box-shadow: rgb(0 0 0 / 16%) 0 1px 4px 0;
      ${isDarkMode()
              ? css`background-color: black;
                color: white;`
              : css`background-color: white;`};
    `;

    const UnderDiv = styled.div`
      position: sticky;
      bottom: 0;
      z-index: 999999;
      width: 100vw;
      height: 30px;
      box-shadow: rgb(0 0 0 / 16%) 0 1px 4px 0;
      ${isDarkMode()
              ? css`background-color: black;
                color: white;`
              : css`background-color: white;`};
    `;

    return (
        <MainDiv>
            {
                !inputHide && <div style={{
                    display: "flex",
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 999999
                }}>
                    <input onChange={(e) => setData(e.target.value)}
                           value={data}
                           type="text"
                           placeholder="데이터를 입력해주세요"/>
                    <button onClick={restore} style={{marginLeft: "5px"}}>적용</button>
                    <button onClick={() => setInputHide(true)} style={{marginLeft: "5px"}}>취소</button>
                </div>
            }

            <TitleDiv>
                <h4 style={{lineHeight: "50px"}}>
                    BetterNovelpia - {VERSION}
                    <i onClick={quit}
                       style={{marginLeft: "15px", color: "red"}} className="icon ion-close-round"/>
                </h4>
            </TitleDiv>

            <div className="" style={{fontSize: "12px"}}>
                <div className="am-mainpanel"
                     style={{maxWidth: "1200px", margin: "0px auto 0px auto", padding: "0px 20px"}}>
                    <div className="row mg-t-20 mg-b-20">
                        {
                            configs.map(value =>
                                <Card>
                                    <CardHead label={value.head}/>
                                    <CardBody>
                                        {
                                            Object.entries(value.configs).map(([key, value2]) =>
                                                value2.type === "text"
                                                    ? <TextBox config={key as Config}
                                                               label={value2.label}/>
                                                    : value2.type === "checkbox"
                                                        ? <Checkbox config={key as Config} label={value2.label}/>
                                                        : value2.type === "int" &&
                                                        <NumberBox config={key as Config} label={value2.label}
                                                                   min={value2.min} max={value2.max}/>
                                            )
                                        }
                                    </CardBody>
                                </Card>
                            )
                        }
                    </div>
                </div>
            </div>

            <UnderDiv>
                <div style={{display: "flex", float: "right"}}>
                    <button onClick={backup}>백업</button>
                    <button onClick={() => setInputHide(false)} style={{marginLeft: "5px"}}>복원</button>
                    <button style={{marginLeft: "5px", marginRight: "5px"}} onDoubleClick={() => reset()}>초기화
                    </button>
                </div>
            </UnderDiv>
        </MainDiv>
    );
}

export default {
    exclude: /^\/viewer\//,
    start() {
        const appContainer = document.createElement("div");
        document.body.prepend(appContainer);
        ReactDOM.render(<Setting/>, appContainer);
    }
} as Module;