import {useState} from "react";

export default function Dropdown(props) {
    const {formName, items, prevHandleChange} = props;
    const [Selected, setSelected] = useState("서울시");
    const handleSelect = (e) => {
        setSelected(e.target.value);
        prevHandleChange(e)
    }
    return (
        <div className="flex justify-center">
            <div>
                <select
                    className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                    aria-label=".form-select-sm example"
                    onChange={handleSelect} value={Selected}
                    name={formName}
                >
                    {items.map((item, index) => {
                        return (
                            <option key={index} value={item.name} defaultValue={props.defaultValue === item.name}>
                                {item.name}
                            </option>)
                    })}
                </select>
            </div>
        </div>
    )
}