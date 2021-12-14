import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import {configs} from "../index";
import {appendSide} from "../util/AppendSide";
import styled, {css} from "styled-components";

function Card(props: { children: any }) {
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

function CardBody(props: { children: any }) {
    return (
        <div className="card-body" style={{padding: "20px"}}>{props.children}</div>
    );
}

function Checkbox(props: { config: Config, label: string }) {
    const [checked, setChecked] = useState((GM_getValue(props.config, false) as boolean) ?? false);

    const change = useCallback(() => {
        setChecked(!checked);
        GM_setValue(props.config, !checked);
    }, [props, checked]);

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
    }, [props]);

    return (
        <div className="form-group">
            <label className="form-control-label" style={{fontSize: "12px"}}>{props.label}:</label>
            <input onChange={(e) => change(e)} className="form-control" type="text" value={value}/>
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
    }, [props]);

    return (
        <div className="form-group">
            <label className="form-control-label" style={{fontSize: "12px"}}>{props.label}:</label>
            <input onChange={(e) => change(e)} className="form-control" type="number" value={value} min={props.min}
                   max={props.max}/>
            <br/>
            <br/>
        </div>
    );
}

function Setting() {
    const [hide, setHide] = useState(true);

    useEffect(() => {
        appendSide(`<hr style="margin: 3px 0;">`);

        appendSide(
            $(`<li style="padding: 10px 25px;"><img style="margin-left: -5px; height: 25px;" src="//novelpia.com/img/new/viewer/btn_theme.png"></li>`)
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
      background-color: white;
      ${hide && css`display: none;`}
    `;

    const TitleDiv = styled.div`
      position: sticky;
      top: 0;
      z-index: 999999;
      background-color: white;
      text-align: center;
      width: 100vw;
      height: 50px;
      box-shadow: rgb(0 0 0 / 16%) 0 1px 4px 0;
    `;

    return (
        <MainDiv>
            <div className="" style={{fontSize: "12px"}}>
                <TitleDiv>
                    <h4 style={{
                        lineHeight: "50px"
                    }} className="tx-gray-800 s_inv">
                        BetterNovelpia - {VERSION}
                        <i onClick={() => {
                            $(".loads").show();
                            location.reload();
                        }}
                           style={{marginLeft: "15px", color: "red"}} className="icon ion-close-round"/>
                    </h4>
                </TitleDiv>

                <div className="am-mainpanel"
                     style={{maxWidth: "1200px", margin: "0px auto 0px auto", padding: "0px 20px"}}>
                    <div className="row mg-t-20 mg-b-20">
                        {
                            Object.values(configs).map(value =>
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