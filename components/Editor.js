import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";

import Context from "@ckeditor/ckeditor5-core/src/context";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
// import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";

const Wrap = styled.div`
    width: 100%;
    height: 100%;
`;

export default class Editor extends Component {
    render() {
        return (
            <Wrap>
                <Helmet>
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
                <CKEditorContext context={Context}>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            plugins: [
                                Essentials,
                                Paragraph,
                                Bold,
                                Italic,
                                Heading,
                                Indent,
                                IndentBlock,
                                Underline,
                                Strikethrough,
                                BlockQuote,
                                Font,
                                Alignment,
                                List,
                                Link,
                                MediaEmbed,
                                PasteFromOffice,
                                Image,
                                ImageStyle,
                                ImageToolbar,
                                ImageUpload,
                                ImageResize,
                                Table,
                                TableToolbar,
                                TextTransformation,
                                CodeBlock,
                                SimpleUploadAdapter
                            ],
                            placeholder: "본문을 입력해주세요...",
                            toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "underline",
                                "strikethrough",
                                "|",
                                "fontSize",
                                "fontColor",
                                "fontBackgroundColor",
                                "|",
                                "alignment",
                                "outdent",
                                "indent",
                                "bulletedList",
                                "numberedList",
                                "blockQuote",
                                "|",
                                "link",
                                "insertTable",
                                "imageUpload",
                                "mediaEmbed",
                                "|",
                                "undo",
                                "redo",
                                "indentCodeBlock",
                                "codeBlock"
                            ],
                            simpleUpload: {
                                // The URL that the images are uploaded to.
                                uploadUrl: process.env.NODE_ENV === "production" ? "https://www.pigako.com/api/v1/file/upload/image" : "http://localhost:4000/api/v1/file/upload/image",

                                // Enable the XMLHttpRequest.withCredentials property.
                                withCredentials: true,

                                // Headers sent along with the XMLHttpRequest to the upload server.
                                headers: {}
                            },
                            heading: {
                                options: [
                                    {
                                        model: "paragraph",
                                        view: "p",
                                        title: "본문",
                                        class: "ck-heading_paragraph"
                                    },
                                    {
                                        model: "heading1",
                                        view: "h1",
                                        title: "헤더1",
                                        class: "ck-heading_heading1"
                                    },
                                    {
                                        model: "heading2",
                                        view: "h2",
                                        title: "헤더2",
                                        class: "ck-heading_heading2"
                                    },
                                    {
                                        model: "heading3",
                                        view: "h3",
                                        title: "헤더3",
                                        class: "ck-heading_heading3"
                                    }
                                ]
                            },
                            fontSize: {
                                options: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 27, 29, 31, 33, 35]
                            },
                            alignment: {
                                options: ["justify", "left", "center", "right"]
                            },
                            table: {
                                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
                            },
                            image: {
                                resizeUnit: "px",
                                toolbar: ["imageStyle:alignLeft", "imageStyle:full", "imageStyle:alignRight", "|", "imageTextAlternative"],
                                styles: ["full", "alignLeft", "alignRight"]
                            },
                            typing: {
                                transformations: {
                                    remove: ["enDash", "emDash", "oneHalf", "oneThird", "twoThirds", "oneForth", "threeQuarters"]
                                }
                            }
                        }}
                        data={this.props.text}
                        onReady={(editor) => {}}
                        onChange={this.props.onChange}
                    />
                </CKEditorContext>
            </Wrap>
        );
    }
}
