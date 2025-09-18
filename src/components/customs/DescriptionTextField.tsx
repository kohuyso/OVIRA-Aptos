import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';

type DescriptionTextFieldProps = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    tittle?: string;
    exampleDescription?: string;
    height?: string;
};
export default function DescriptionTextField({ tittle, text, setText, exampleDescription, height = '103px' }: DescriptionTextFieldProps) {
    return (
        <div className="flex flex-col ">
            <p className="">{tittle}</p>
            <textarea
                style={{
                    padding: '14px',
                    backgroundColor: 'var(--secondary)',
                    borderRadius: '8px',
                    height: height,
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
        </div>
    );
}
