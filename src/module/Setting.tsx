import {useCallback, useEffect, useState, type ChangeEvent} from "react";
import {createRoot} from "react-dom/client";
import {configs} from "../util/registry";
import {appendSide} from "../util/AppendSide";
import {exportConfig} from "../util/ExportConfig";
import {injectCSS, ThemedApp} from "../util/ui";
import {defineModule} from "../util/config";
import settingCSS from "../styles/setting.css" with {type: "text"};

function Checkbox({config, label}: { config: string, label: string }) {
    const [checked, setChecked] = useState(GM_getValue<boolean>(config, false));

    const change = useCallback(() => {
        const newValue = !checked;
        setChecked(newValue);
        GM_setValue(config, newValue);
    }, [checked, config]);

    return (
        <div className="bn-setting-row" onClick={change}>
            <span className="bn-setting-label">{label}</span>
            <div className="bn-toggle-switch">
                <input className="bn-toggle-input" type="checkbox" checked={checked} readOnly/>
                <span className="bn-toggle-slider"/>
            </div>
        </div>
    );
}

function TextBox({config, label}: { config: string, label: string }) {
    const [value, setValue] = useState(GM_getValue<string>(config, ""));

    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        GM_setValue(config, newValue);
        setValue(newValue);
    }, [config]);

    return (
        <div className="bn-setting-item">
            <label className="bn-input-label">{label}</label>
            <input className="bn-input-field" type="text" value={value} onChange={change}/>
        </div>
    );
}

function NumberBox({config, label, min, max}: { config: string, label: string, min: number, max: number }) {
    const [value, setValue] = useState(GM_getValue<number>(config, 0));

    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (!newValue) return;

        const numValue = Number(newValue);
        if (isNaN(numValue) || min > numValue || max < numValue) return;

        GM_setValue(config, numValue);
        setValue(numValue);
    }, [config, min, max]);

    return (
        <div className="bn-setting-item">
            <label className="bn-input-label">{label}</label>
            <input className="bn-input-field" type="number" value={value} onChange={change} min={min} max={max}/>
        </div>
    );
}

function Setting() {
    const [hide, setHide] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState("");
    const [configVersion, setConfigVersion] = useState(0);

    const quit = useCallback(() => location.reload(), []);

    const backup = useCallback(() => {
        const data = exportConfig();

        if (!Object.keys(data).length) {
            unsafeWindow.toastr.info("백업할 설정이 없습니다.", "설정");
            return;
        }

        GM_setClipboard(JSON.stringify(data, null, 2));
        unsafeWindow.toastr.info("설정이 클립보드에 복사되었습니다.", "설정");
    }, []);

    const restore = useCallback(() => {
        if (!modalData.trim()) {
            unsafeWindow.toastr.info("데이터가 비어있습니다.", "설정");
            setShowModal(false);
            return;
        }

        try {
            const config = JSON.parse(modalData);
            for (const [key, value] of Object.entries(config)) {
                GM_setValue(key, value);
            }
            setConfigVersion(v => v + 1);
            unsafeWindow.toastr.info("설정이 복원되었습니다.", "설정");
        } catch (e) {
            unsafeWindow.toastr.info("잘못된 데이터 형식입니다.", "설정");
        }

        setShowModal(false);
        setModalData("");
    }, [modalData]);

    const reset = useCallback(() => {
        if (confirm("모든 설정을 초기화하시겠습니까?")) {
            for (const config of GM_listValues()) {
                GM_deleteValue(config);
            }
            setConfigVersion(v => v + 1);
            unsafeWindow.toastr.info("모든 설정이 초기화되었습니다.", "설정");
        }
    }, []);

    useEffect(() => appendSide("설정", () => setHide(false)), []);

    return (
        <ThemedApp>
            <div className={`bn-app ${hide ? "bn-app--hidden" : ""}`}>
                {showModal && (
                    <div className="bn-modal bn-modal--bottom">
                        <div className="bn-modal-content bn-modal-content--bottom">
                            <h3 className="bn-modal-title">설정 복원</h3>
                            <textarea
                                className="bn-modal-input"
                                placeholder="백업된 설정 데이터를 붙여넣으세요"
                                value={modalData}
                                onChange={(e) => setModalData(e.target.value)}
                                autoFocus
                            />
                            <div className="bn-modal-actions">
                                <button
                                    className="bn-btn bn-btn--outline"
                                    onClick={() => {
                                        setShowModal(false);
                                        setModalData("");
                                    }}
                                >
                                    취소
                                </button>
                                <button className="bn-btn bn-btn--primary" onClick={restore}>
                                    복원
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bn-app-bar">
                    <h1 className="bn-app-title">
                        <i className="bn-module-icon icon ion-ios-gear"/>
                        설정
                        <span className="bn-version-badge">v{GM_info.script.version}</span>
                    </h1>
                    <button className="bn-close-btn" onClick={quit}>
                        <i className="icon ion-close-round"/>
                    </button>
                </div>

                <div className="bn-content-area" key={configVersion}>
                    {configs.length === 0 ? (
                        <div className="bn-empty-message">설정할 항목이 없습니다.</div>
                    ) : (
                        configs.map((module: Configs) => (
                            <div className="bn-module-card" key={module.head}>
                                <div className="bn-module-header">
                                    <h2 className="bn-module-title">
                                        <i className="bn-module-icon icon ion-ios-gear"/>
                                        {module.head}
                                    </h2>
                                </div>
                                <div className="bn-module-body">
                                    {Object.entries(module.configs).map(([key, config]) => (
                                        <div className="bn-setting-item" key={key}>
                                            {config.type === "checkbox" ? (
                                                <Checkbox config={key} label={config.label}/>
                                            ) : config.type === "text" ? (
                                                <TextBox config={key} label={config.label}/>
                                            ) : config.type === "int" && (
                                                <NumberBox
                                                    config={key}
                                                    label={config.label}
                                                    min={config.min as number}
                                                    max={config.max as number}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="bn-bottom-bar">
                    <div className="bn-buttons-group">
                        <button className="bn-btn bn-btn--secondary" onClick={backup}>
                            <i className="bn-btn-icon icon ion-ios-download-outline"/>
                            백업
                        </button>
                        <button className="bn-btn bn-btn--secondary" onClick={() => setShowModal(true)}>
                            <i className="bn-btn-icon icon ion-ios-upload-outline"/>
                            복원
                        </button>
                    </div>
                    <button className="bn-btn bn-btn--danger" onClick={reset}>
                        <i className="bn-btn-icon icon ion-ios-refresh-empty"/>
                        초기화
                    </button>
                </div>
            </div>
        </ThemedApp>
    );
}

export default defineModule({
    exclude: /^\/viewer\//,
    start() {
        injectCSS(settingCSS);

        const appContainer = document.createElement("div");
        document.body.prepend(appContainer);

        const root = createRoot(appContainer);
        root.render(<Setting/>);
    }
});
