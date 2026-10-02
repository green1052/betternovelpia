import {GM_deleteValue, GM_getValue, GM_info, GM_listValues, GM_setClipboard, GM_setValue, unsafeWindow} from "$";
import {type ChangeEvent, useEffect, useState} from "preact/compat";
import {createRoot} from "preact/compat/client";
import {appendSide} from "../core/dom";
import {RestoreModal, ThemedApp} from "../components/ui";
import {type CheckboxField, type ConfigField, defineModule, type IntField, registeredModules, type TextField} from "../core/module";
import "../styles/setting.css";

function Checkbox({name, field}: { name: string, field: CheckboxField }) {
    const [checked, setChecked] = useState(GM_getValue(name, field.default));

    const change = () => {
        setChecked(!checked);
        GM_setValue(name, !checked);
    };

    return (
        <div className="bn-setting-row" onClick={change}>
            <span className="bn-setting-label">{field.label}</span>
            <div className="bn-toggle-switch">
                <input className="bn-toggle-input" type="checkbox" checked={checked} readOnly/>
                <span className="bn-toggle-slider"/>
            </div>
        </div>
    );
}

function TextBox({name, field}: { name: string, field: TextField }) {
    const [value, setValue] = useState(GM_getValue(name, field.default ?? ""));

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = (e.target as HTMLInputElement).value;
        GM_setValue(name, newValue);
        setValue(newValue);
    };

    return (
        <div className="bn-setting-item">
            <label className="bn-input-label">{field.label}</label>
            <input className="bn-input-field" type="text" value={value} onChange={change}/>
        </div>
    );
}

function NumberBox({name, field: {label, min, max, default: def}}: { name: string, field: IntField }) {
    const [value, setValue] = useState(GM_getValue(name, def ?? 0));

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = (e.target as HTMLInputElement).value;

        if (!newValue) return;

        const numValue = Number(newValue);
        if (isNaN(numValue) || min > numValue || max < numValue) return;

        GM_setValue(name, numValue);
        setValue(numValue);
    };

    return (
        <div className="bn-setting-item">
            <label className="bn-input-label">{label}</label>
            <input className="bn-input-field" type="number" value={value} onChange={change} min={min} max={max}/>
        </div>
    );
}

function Field({name, field}: { name: string, field: ConfigField }) {
    switch (field.type) {
        case "checkbox":
            return <Checkbox name={name} field={field}/>;
        case "text":
            return <TextBox name={name} field={field}/>;
        case "int":
            return <NumberBox name={name} field={field}/>;
    }
}

function Setting() {
    const [hide, setHide] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [configVersion, setConfigVersion] = useState(0);

    const configs = registeredModules.flatMap(({module}) => module.config ?? []);

    const backup = () => {
        const data = Object.fromEntries(GM_listValues().map(key => [key, GM_getValue(key)]));

        if (!Object.keys(data).length) {
            unsafeWindow.toastr.info("백업할 설정이 없습니다.", "설정");
            return;
        }

        GM_setClipboard(JSON.stringify(data, null, 2), "text");
        unsafeWindow.toastr.info("설정이 클립보드에 복사되었습니다.", "설정");
    };

    const restore = (data: string) => {
        setShowModal(false);

        if (!data.trim()) {
            unsafeWindow.toastr.info("데이터가 비어있습니다.", "설정");
            return;
        }

        try {
            for (const [key, value] of Object.entries(JSON.parse(data))) {
                GM_setValue(key, value);
            }
            setConfigVersion(v => v + 1);
            unsafeWindow.toastr.info("설정이 복원되었습니다.", "설정");
        } catch {
            unsafeWindow.toastr.info("잘못된 데이터 형식입니다.", "설정");
        }
    };

    const reset = () => {
        if (confirm("모든 설정을 초기화하시겠습니까?")) {
            for (const config of GM_listValues()) {
                GM_deleteValue(config);
            }
            setConfigVersion(v => v + 1);
            unsafeWindow.toastr.info("모든 설정이 초기화되었습니다.", "설정");
        }
    };

    useEffect(() => appendSide("설정", () => setHide(false)), []);

    return (
        <ThemedApp>
            <div className={`bn-app ${hide ? "bn-app--hidden" : ""}`}>
                {showModal && (
                    <RestoreModal
                        title="설정 복원"
                        placeholder="백업된 설정 데이터를 붙여넣으세요"
                        position="bottom"
                        onClose={() => setShowModal(false)}
                        onRestore={restore}
                    />
                )}

                <div className="bn-app-bar">
                    <h1 className="bn-app-title">
                        <i className="bn-module-icon icon ion-ios-gear"/>
                        설정
                        <span className="bn-version-badge">v{GM_info.script.version}</span>
                    </h1>
                    <button className="bn-close-btn" onClick={() => location.reload()}>
                        <i className="icon ion-close-round"/>
                    </button>
                </div>

                <div className="bn-content-area" key={configVersion}>
                    {configs.length === 0 ? (
                        <div className="bn-empty-message">설정할 항목이 없습니다.</div>
                    ) : (
                        configs.map(({head, configs}) => (
                            <div className="bn-module-card" key={head}>
                                <div className="bn-module-header">
                                    <h2 className="bn-module-title">
                                        <i className="bn-module-icon icon ion-ios-gear"/>
                                        {head}
                                    </h2>
                                </div>
                                <div className="bn-module-body">
                                    {Object.entries(configs).map(([name, field]) => (
                                        <div className="bn-setting-item" key={name}>
                                            <Field name={name} field={field}/>
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
        const appContainer = document.createElement("div");
        document.body.prepend(appContainer);

        createRoot(appContainer).render(<Setting/>);
    }
});
