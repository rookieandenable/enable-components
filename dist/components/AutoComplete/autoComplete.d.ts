import { FC, ReactNode } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSource<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (value: string, data?: string[]) => DataSource[] | Promise<DataSource[]>;
    onSelect?: (value: DataSource) => void;
    renderOption?: (value: DataSource) => ReactNode;
    debounceTime?: number;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
