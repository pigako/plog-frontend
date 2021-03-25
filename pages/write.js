import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

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
    const editorRef = useRef();
    const [editorLoded, setEditorLoded] = useState(false);
    const { CKEditor, ClassicEditor, CodeBlock } = editorRef.current || {};

    const [markdownText, setMarkdownText] = useState("");
    const [previewText, setPreviewText] = useState(markdownText);

    const onChangeMarkdownText = useCallback(
        (e) => {
            setMarkdownText(e.target.value);
        },
        [markdownText]
    );

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
            CodeBlock: require("@ckeditor/ckeditor5-code-block/src/codeblock")
        };
        setEditorLoded(true);
    }, []);

    const onChangeCodeMirror = useCallback((e) => {}, []);

    useEffect(() => {
        console.log(markdownText);
        console.log(previewText);
    }, [markdownText, previewText]);

    return (
        <Wrap>
            <Helmet>
                <title>새 글</title>
                <style type="text/css">
                    {`
                        
                        .ck.ck-editor {width:100%;}
                        .ck-content {
                            line-height: 1.8rem;
                        }
                        .ck-editor__editable { }
                    `}
                </style>
            </Helmet>
            <WriteContainer>
                {editorLoded ? (
                    <CKEditor
                        editor={ClassicEditor}
                        data={markdownText.toString()}
                        config={{
                            toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "codeBlock"],
                            plugins: [CodeBlock],
                            codeBlock: {
                                languages: [
                                    { language: "plaintext", label: "Plain text" },
                                    { language: "css", label: "CSS" },
                                    { language: "html", label: "HTML" },
                                    { language: "javascript", label: "JavaScript" },
                                    { language: "typescript", label: "TypeScript" }
                                ]
                            }
                        }}
                        onChange={(event, ckeditor) => {
                            const data = ckeditor.getData();
                            setMarkdownText(data);
                        }}
                    />
                ) : (
                    <p></p>
                )}
            </WriteContainer>
            <PreviewContainer dangerouslySetInnerHTML={{ __html: previewText }}></PreviewContainer>
        </Wrap>
    );
};

export default Write;
