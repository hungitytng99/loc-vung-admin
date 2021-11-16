import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CKEditorVi from 'utils/ckeditor5/build/ckeditor';

import './editor.css';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapterPlugin from './UploadAdapterPlugin';
// import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
// import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';

export default function EditorBase({
    type = 'classic',
    placeholder = '',
    onTextChange,
    initContent,
    items = [],
}) {
    const [showTool, setShowTool] = useState(false);
    const [data, setdata] = useState('');
    const [isEditorReady, setIsEditorReady] = useState(false);
    const itemsClassic = [
        'heading',
        '|',
        'fontfamily',
        'fontsize',
        '|',
        'alignment',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'link',
        'insertImage',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
    ];
    const itemsInline = ['bold', 'italic', 'underline', '|', 'MathType', 'ChemType'];

    useEffect(() => {
        if (initContent && isEditorReady) {
            setdata(initContent);
        }
    }, [initContent, isEditorReady]);

    return (
        <div
            className={
                (type == 'inline' && !showTool ? 'hidden-toolbar' : '') +
                ` ${type}` +
                ' compose-editor'
            }
        >
            <CKEditor
                editor={CKEditorVi}
                key="ckeditor"
                config={{
                    placeholder: placeholder,
                    // extraPlugins: [
                    //   UploadAdapterPlugin,
                    // ],
                    toolbar: {
                        items: type !== 'inline' ? itemsClassic : itemsInline,
                    },
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log('data: ', data);
                    onTextChange && onTextChange(data);
                }}
                data={data}
                onBlur={(event, editor) => {
                    type == 'inline' && setShowTool(false);
                }}
                onFocus={(event, editor) => {
                    type == 'inline' && setShowTool(true);
                }}
                onReady={(editor) => {
                    setIsEditorReady(true);
                }}
            />
        </div>
    );
}
