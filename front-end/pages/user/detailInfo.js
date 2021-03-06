import {UserIcon} from '@heroicons/react/solid'
import CheckBoxGrp from '../../components/CheckBoxGrp';
import Dropdown from '../../components/Dropdown'
import apiServer from "../../api/apiServer";
import {useState} from "react";

export default function detailInfo() {
    const locationItems = [{
        name: "서울시"
    }, {
        name: "화성시"
    }];
    const interestItems = ["여행", "맛집투어", "운동"];
    const personalityItems = ["활발함", "조용함"];
    const [formData, setFormData] = useState({
        photo:null,
        sex:"",
        location:"서울시",
        interest:[],
        personality:[],
        job:"",
        mbti:""
    });
    const handleChange = (e) => {
        if (e.target.files) {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else if (e.target.name === "personality"){
            if (e.target.checked){
                setFormData({...formData, [e.target.name]: [...formData.personality, e.target.value]})
            }
            else{
                setFormData({...formData, [e.target.name]: formData.personality.filter(value=>value!==e.target.value)})
            }
        } else if (e.target.name === "interest"){
            if (e.target.checked) {
                setFormData({...formData, [e.target.name]: [...formData.interest, e.target.value]})
            }
            else{
                setFormData({...formData, [e.target.name]: formData.interest.filter(value=>value!==e.target.value)})
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }
    const registerDetailInfo = async (e) => {
        e.preventDefault();

        let formDataBasket = new FormData();

        for (let [key, value] of Object.entries(formData)) {
            formDataBasket.append(key, value);
            console.log(key,value)
        }

        // Use fetch or axios to submit the form
        await apiServer
            .post("detailInfo", formDataBasket)
            .then(({data}) => {
                const {redirect} = data;
                // Redirect used for reCAPTCHA and/or thank you page
                // window.location.href = redirect;
                console.log(data);
            })
            .catch((e) => {
                window.location.href = e.response.data.redirect;
            });
    };
    return (
        <>

            <div
                className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 items-center"
            >
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                    <div className="grid  gap-8 grid-cols-1">
                        <div className="flex flex-col ">
                            <div className="flex flex-col sm:flex-row items-center">
                                <h2 className="font-semibold text-lg mr-auto">추가 정보</h2>
                                <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                            </div>
                            <div className="mt-5">
                                <form className="form" onSubmit={registerDetailInfo}>
                                    <div className="md:space-y-2 mb-3">
                                        <label className="text-xs font-semibold text-gray-600 py-2">Company Logo<abbr
                                            className="hidden" title="required">*</abbr></label>
                                        <div className="flex items-center py-6">
                                            <div className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                                                <UserIcon className="w-12 h-12 mr-4 object-cover"/>
                                            </div>
                                            <label className="cursor-pointer ">
                                                <span
                                                    className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">업로드</span>
                                                <input type="file" className="hidden" name="photo"
                                                       accept="accept" onChange={handleChange}/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                                        <div className="mb-3 space-y-2 w-full text-xs">
                                            <label className="font-semibold text-gray-600 py-2">성별</label>
                                            <div className='flex'>
                                                <div className='form-check'>
                                                    <input
                                                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        required="required" type="radio" name="sex"
                                                        id="sex1" value="male" onChange={handleChange}/><label
                                                    className="form-check-label inline-block text-gray-800"
                                                    for="sex1">남자</label>
                                                </div>
                                                <div className='form-check'>
                                                    <input
                                                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        required="required" type="radio" name="sex"
                                                        id="sex2" value="female" onChange={handleChange}/><label
                                                    className="form-check-label inline-block text-gray-800"
                                                    for="sex2">여자</label>
                                                </div>
                                            </div>
                                            <p className="text-red text-xs hidden">Please fill out this field.</p>
                                        </div>
                                        <div className="mb-3 space-y-2 w-full text-xs">
                                            <label className="font-semibold text-gray-600 py-2">거주지</label>
                                            <Dropdown formName="location" items={locationItems} defaultValue="서울시" prevHandleChange={handleChange}></Dropdown>
                                        </div>
                                        <div className="mb-3 space-y-2 w-full text-xs">
                                            <label className="font-semibold text-gray-600 py-2">Company Mail
                                                <abbr
                                                    title="required">*</abbr></label>
                                            <input placeholder="Email ID"
                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                   required="required" type="text"
                                                   id="integration_shop_name" onChange={handleChange}/>
                                            <p className="text-red text-xs hidden">Please fill out this field.</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 space-y-2 w-full text-xs">
                                        <label className=" font-semibold text-gray-600 py-2">Company Website</label>
                                        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                                            <div className="flex">
									<span
                                        className="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                    
                                    </svg>
                                   </span>
                                            </div>
                                            <input type="text"
                                                   className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                                   placeholder="https://"/>
                                        </div>
                                    </div>
                                    <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                        <label className="font-semibold text-gray-600 py-2">관심사</label>
                                        <CheckBoxGrp formName="interest" items={interestItems} prevHandleChange={handleChange}/>
                                    </div>
                                    <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                        <label className="font-semibold text-gray-600 py-2">성격</label>
                                        <CheckBoxGrp formName="personality" items={personalityItems} prevHandleChange={handleChange}/>
                                    </div>
                                    <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                        <label className="font-semibold text-gray-600 py-2">Description</label>
                                        <textarea required="" id=""
                                                  className="min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                                                  placeholder="Enter your comapny info" spellCheck="false"></textarea>
                                        <p className="text-xs text-gray-400 text-left my-3">You inserted 0
                                            characters</p>
                                    </div>
                                    <p className="text-xs text-red-500 text-right my-3">Required fields are marked with
                                        an
                                        asterisk <abbr title="Required field">*</abbr></p>
                                    <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                        <button
                                            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

