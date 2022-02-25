export default function CheckBoxGrp(props) {
    const {formName, items, prevHandleChange} = props;
    return (
        <div
            className="inline-flex flex-wrap items-center min-h-[100px] max-h-[300px] h-28 appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4">
            {items?.map((item, index) => {
                return (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input ml-2 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                            type="checkbox" value={item} id={index} name={formName} onChange={prevHandleChange}/>
                        <label className="form-check-label text-gray-800" for="flexCheckDefault">
                            {item}
                        </label>
                    </div>)
            })}
        </div>
    )
}