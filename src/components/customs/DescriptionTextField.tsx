import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';

type TextFieldProps = {
    type?: 'input' | 'textarea';
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    tittle?: string;
    exampleDescription?: string;
    height?: string;
    width?: string;
};
export default function TextField({ type = 'input', tittle, text, setText, exampleDescription, height = '103px', width = '100%' }: TextFieldProps) {
    return (
        <div className="flex flex-col ">
            <p className="">{tittle}</p>
            {type === 'input' ? (
                <input
                    style={{
                        height: height,
                        width: width,
                        padding: '14px',
                        backgroundColor: 'var(--secondary)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        textAlign: 'left',
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={exampleDescription}
                />
            ) : (
                <textarea
                    style={{
                        padding: '14px',
                        backgroundColor: 'var(--secondary)',
                        borderRadius: '8px',
                        height: height,
                        width: width,
                        fontSize: '14px',
                        textAlign: 'left',
                    }}
                    className="outline-none"
                    value={text}
                    placeholder={exampleDescription}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
            )}
        </div>
    );
}
