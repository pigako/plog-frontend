import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import showdown from "showdown";
// import CodeMirror from "@uiw/react-codemirror";
// import "codemirror/theme/meterial";

function checkiOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

const Wrap = styled.div`
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const WriteContainer = styled.div`
    height: 100%;
    width: 50%;
`;

const WriteTextbox = styled.textarea`
    width: 100% !important;
    height: 100% !important;

    font-size: 1.2rem;

    padding: 10px 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #e8e8e8;
    resize: none;
`;

const PreviewContainer = styled.div`
    height: 100%;
    width: 50%;

    padding: 10px 20px;
`;

const Write = () => {
    let editor;
    let codeMirror;
    const [markdownText, setMarkdownText] = useState("");
    const [previewText, setPreviewText] = useState(markdownText);

    const converter = new showdown.Converter();

    const onChangeMarkdownText = useCallback(
        (e) => {
            setMarkdownText(e.target.value);
            setPreviewText(converter.makeHtml(e.target.value));
        },
        [markdownText, converter]
    );

    useEffect(() => {
        const CodeMirror = require("codemirror");
        codeMirror = CodeMirror.fromTextArea(editor, {
            mode: "markdown",
            theme: "material",
            lineNumbers: false,
            lineWrapping: true,
            // scrollbarStyle: "overlay",
            placeholder: "당신의 이야기를 적어보세요..."
        });

        // window.codeMirror = codeMirror;
        codeMirror.on("change", onChangeCodeMirror);

        codeMirror.toTextArea();
    }, []);

    const onChangeCodeMirror = useCallback((e) => {}, []);

    useEffect(() => {
        console.log(markdownText);
        console.log(previewText);
    }, [markdownText, previewText, editor, codeMirror]);

    return (
        <Wrap>
            <WriteContainer>
                <WriteTextbox
                    ref={(ref) => {
                        editor = ref;
                    }}
                    onChange={onChangeMarkdownText}
                    value={markdownText}
                />
                {/* <CodeMirror
                    value={markdownText}
                    options={{
                        mode: "markdown",
                        theme: "material",
                        lineNumbers: false,
                        lineWrapping: true,
                        scrollbarStyle: "overlay",
                        placeholder: "당신의 이야기를 적어보세요..."
                    }}
                /> */}
            </WriteContainer>
            <PreviewContainer dangerouslySetInnerHTML={{ __html: previewText }}></PreviewContainer>
        </Wrap>
    );
};

export default Write;
