import React, {useCallback, useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {ModulesInfo} from "../index";
import {appendSide} from "../util/AppendSide";
import styled, {createGlobalStyle, keyframes} from "styled-components";
import {isDarkMode} from "../util/IsDarkMode";
import useForceUpdate from "use-force-update";
import {exportConfig} from "../util/ExportConfig";

type Config = string;
type ConfigData = {
    label: string;
    type: string;
    default?: boolean;
    min?: number;
    max?: number;
};

interface ModuleConfig {
    head: string;
    configs: Record<string, ConfigData>;
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }
`;

const AppContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background-color: ${() => isDarkMode() ? "#121212" : "#f0f0f0"};
    color: ${() => isDarkMode() ? "#ffffff" : "#121212"};
    display: ${(props: { hide: boolean }) => props.hide ? "none" : "flex"};
    flex-direction: column;
    animation: ${fadeIn} 0.3s ease;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const AppBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: ${() => isDarkMode() ? "#1e1e1e" : "#ffffff"};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AppTitle = styled.h1`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;

const VersionBadge = styled.span`
    background-color: ${() => isDarkMode() ? "#333333" : "#f2f2f2"};
    color: ${() => isDarkMode() ? "#bbbbbb" : "#666666"};
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: 8px;
    font-weight: 400;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    font-size: 24px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:active {
        background-color: ${() => isDarkMode() ? "#333333" : "#eeeeee"};
    }
`;

const ContentArea = styled.div`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
    }
`;

const ModuleCard = styled.div`
    background-color: ${() => isDarkMode() ? "#2a2a2a" : "#ffffff"};
    border-radius: 12px;
    margin-bottom: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ModuleHeader = styled.div`
    background-color: ${() => isDarkMode() ? "#333333" : "#f8f8f8"};
    padding: 12px 16px;
    border-bottom: 1px solid ${() => isDarkMode() ? "#444444" : "#eeeeee"};
`;

const ModuleTitle = styled.h2`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    display: flex;
    align-items: center;
`;

const ModuleIcon = styled.i`
    margin-right: 8px;
    color: ${() => isDarkMode() ? "#bbbbbb" : "#666666"};
`;

const ModuleBody = styled.div`
    padding: 16px;
`;

const SettingItem = styled.div`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const SettingRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
`;

const SettingLabel = styled.label`
    font-size: 14px;
    flex: 1;
    margin-right: 16px;
`;

const ToggleSwitch = styled.div`
    position: relative;
    width: 50px;
    height: 28px;
`;

const ToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;

    &:checked + span {
        background-color: #4CD964;
    }

    &:checked + span:before {
        transform: translateX(22px);
    }
`;

const ToggleSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${() => isDarkMode() ? "#555555" : "#cccccc"};
    transition: 0.3s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

const InputField = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${() => isDarkMode() ? "#444444" : "#dddddd"};
    background-color: ${() => isDarkMode() ? "#333333" : "#ffffff"};
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #007AFF;
    }
`;

const InputLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: ${() => isDarkMode() ? "#bbbbbb" : "#666666"};
`;

const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    background-color: ${() => isDarkMode() ? "#1e1e1e" : "#ffffff"};
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled.button<{ variant?: "primary" | "danger" | "secondary" }>`
    background-color: ${props => {
        if (props.variant === "primary") return "#007AFF";
        if (props.variant === "danger") return "#FF3B30";
        return props.variant === "secondary" ?
                (isDarkMode() ? "#3a3a3a" : "#f2f2f2") :
                "transparent";
    }};
    color: ${props => {
        if (props.variant === "primary" || props.variant === "danger") return "#ffffff";
        return isDarkMode() ? "#ffffff" : "#333333";
    }};
    border: none;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:active {
        opacity: 0.8;
        transform: scale(0.98);
    }
`;

const ButtonIcon = styled.i`
    margin-right: 8px;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 10000;
    animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
    background-color: ${() => isDarkMode() ? "#2a2a2a" : "#ffffff"};
    width: 100%;
    border-radius: 16px 16px 0 0;
    padding: 20px;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);
    animation: ${slideUp} 0.3s ease;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
`;

const ModalTitle = styled.h3`
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
`;

const ModalInput = styled.textarea`
    width: 100%;
    height: 120px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${() => isDarkMode() ? "#444444" : "#dddddd"};
    background-color: ${() => isDarkMode() ? "#333333" : "#ffffff"};
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    font-size: 14px;
    resize: none;
    margin-bottom: 16px;

    &:focus {
        outline: none;
        border-color: #007AFF;
    }
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 32px 0;
    color: ${() => isDarkMode() ? "#bbbbbb" : "#999999"};
    font-size: 14px;
`;

const ButtonsGroup = styled.div`
    display: flex;
    gap: 8px;
`;

function Checkbox({config, label}: { config: Config, label: string }) {
    const [checked, setChecked] = useState(GM_getValue<boolean>(config, false));

    const change = useCallback(() => {
        const newValue = !checked;
        setChecked(newValue);
        GM_setValue(config, newValue);
    }, [checked, config]);

    return (
        <SettingRow>
            <SettingLabel>{label}</SettingLabel>
            <ToggleSwitch onClick={change}>
                <ToggleInput type="checkbox" checked={checked} readOnly/>
                <ToggleSlider/>
            </ToggleSwitch>
        </SettingRow>
    );
}

function TextBox({config, label}: { config: Config, label: string }) {
    const [value, setValue] = useState(GM_getValue<string>(config, ""));

    const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        GM_setValue(config, newValue);
        setValue(newValue);
    }, [config]);

    return (
        <SettingItem>
            <InputLabel>{label}</InputLabel>
            <InputField type="text" value={value} onChange={change}/>
        </SettingItem>
    );
}

function NumberBox({config, label, min, max}: { config: Config, label: string, min: number, max: number }) {
    const [value, setValue] = useState(GM_getValue<number>(config, 0));

    const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (!newValue) return;

        const numValue = Number(newValue);
        if (isNaN(numValue) || min > numValue || max < numValue) return;

        GM_setValue(config, numValue);
        setValue(numValue);
    }, [config, min, max]);

    return (
        <SettingItem>
            <InputLabel>{label}</InputLabel>
            <InputField
                type="number"
                value={value}
                onChange={change}
                min={min}
                max={max}
            />
        </SettingItem>
    );
}

function Setting() {
    const [hide, setHide] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState("");
    const forceUpdate = useForceUpdate();

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
            forceUpdate();
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
            forceUpdate();
            unsafeWindow.toastr.info("모든 설정이 초기화되었습니다.", "설정");
        }
    }, []);

    useEffect(() => appendSide("설정", () => setHide(false)), []);

    return (
        <AppContainer hide={hide}>
            <GlobalStyle/>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <ModalTitle>설정 복원</ModalTitle>
                        <ModalInput
                            placeholder="백업된 설정 데이터를 붙여넣으세요"
                            value={modalData}
                            onChange={(e) => setModalData(e.target.value)}
                            autoFocus
                        />
                        <ModalActions>
                            <ActionButton
                                variant="secondary"
                                onClick={() => {
                                    setShowModal(false);
                                    setModalData("");
                                }}
                            >
                                취소
                            </ActionButton>
                            <ActionButton variant="primary" onClick={restore}>
                                복원
                            </ActionButton>
                        </ModalActions>
                    </ModalContent>
                </Modal>
            )}

            <AppBar>
                <AppTitle>
                    <ModuleIcon className="icon ion-ios-gear"/>
                    설정
                    <VersionBadge>v{GM_info.script.version}</VersionBadge>
                </AppTitle>
                <CloseButton onClick={quit}>
                    <i className="icon ion-close-round"/>
                </CloseButton>
            </AppBar>

            <ContentArea>
                {ModulesInfo.configs.length === 0 ? (
                    <EmptyMessage>설정할 항목이 없습니다.</EmptyMessage>
                ) : (
                    ModulesInfo.configs.map((module: ModuleConfig) => (
                        <ModuleCard key={module.head}>
                            <ModuleHeader>
                                <ModuleTitle>
                                    <ModuleIcon className="icon ion-ios-gear"/>
                                    {module.head}
                                </ModuleTitle>
                            </ModuleHeader>
                            <ModuleBody>
                                {Object.entries(module.configs).map(([key, config]) => (
                                    <SettingItem key={key}>
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
                                    </SettingItem>
                                ))}
                            </ModuleBody>
                        </ModuleCard>
                    ))
                )}
            </ContentArea>

            <BottomBar>
                <ButtonsGroup>
                    <ActionButton variant="secondary" onClick={backup}>
                        <ButtonIcon className="icon ion-ios-download-outline"/>
                        백업
                    </ActionButton>
                    <ActionButton variant="secondary" onClick={() => setShowModal(true)}>
                        <ButtonIcon className="icon ion-ios-upload-outline"/>
                        복원
                    </ActionButton>
                </ButtonsGroup>
                <ActionButton variant="danger" onClick={reset}>
                    <ButtonIcon className="icon ion-ios-refresh-empty"/>
                    초기화
                </ActionButton>
            </BottomBar>
        </AppContainer>
    );
}

export default {
    exclude: /^\/viewer\//,
    start() {
        const appContainer = document.createElement("div");
        document.body.prepend(appContainer);

        const root = createRoot(appContainer);
        root.render(<Setting/>);
    }
};