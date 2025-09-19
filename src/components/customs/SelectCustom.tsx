import { SetStateAction } from 'jotai';
import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'shadcn/select';

export type SelectItemType = {
    label: string;
    value: string;
};

type SelectCustomProps = {
    tittle?: string;
    width?: string;
    height?: string;
    selectedValue: SelectItemType;
    setSelectedValue: React.Dispatch<SetStateAction<SelectItemType>>;
    selectionList: Array<SelectItemType>;
};

export function SelectCustom({ tittle, selectedValue, setSelectedValue, selectionList, width, height }: SelectCustomProps) {
    return (
        <div>
            {tittle && <p className="">{tittle}</p>}
            <Select
                value={selectedValue.value} // bind the selected value
                onValueChange={(val) => {
                    const item = selectionList.find((i) => i.value === val);
                    if (item) setSelectedValue(item);
                }}
            >
                <SelectTrigger style={{ width: width || '100%', height: height }}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {selectionList.map((item) => (
                            <SelectItem
                                className={selectedValue.value === item.value ? 'border border-primary rounded-md' : ''}
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                    setSelectedValue(item);
                                }}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
