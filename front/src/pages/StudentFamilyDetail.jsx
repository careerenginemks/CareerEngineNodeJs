import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const StudentFamilyDetail = () => {
    const [userID, setUserId] = useState('')
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});
    const [options, setoptions] = useState([]);
    const [family2getdata, setfamily2getdata] = useState([]);

    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState([])
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllStudentDetails();
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId");
        setUserId(getUserid);
        setfamily2getdata([])
        setoptions([])
    }, [setUserId, navigate]);


    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://gnj.onrender.com/api/v1/fetchAllStudentDetails')
            .then(response => response.json())
            .then(data => {
                setStudentDetails(data.data);
                setloading(false);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
                setloading(false);
            });
    };


    const handleSearchChange = (selectedOption) => {
        setSearchStudentCode(selectedOption ? selectedOption.value : '');

        // Update studentCode in formData when searchStudentCode changes
        setFormData((prevData) => ({
            ...prevData,
            studentcode: selectedOption ? selectedOption.value : '',
        }));
    }

    const postFormDataAsJson = async(formalldata) => {

        var plainFormData = formalldata;
        plainFormData['options'] = options;
        const formDataJsonString = JSON.stringify(plainFormData);
        console.log(formDataJsonString, "formDataJsonString");
        return formDataJsonString
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       

        // Check if any select is not selected
        // const errorsObj = {};
        // Object.keys(formData).forEach((fieldName) => {
        //     if (!formData[fieldName]) {
        //         console.log(!formData[fieldName], "sd");
        //         errorsObj[fieldName] = true;
        //     }
        // });

        // if (Object.keys(errorsObj).length > 0) {
        //     // console.log(errorsObj, "errorsObj");
        //     setErrors(errorsObj);
        //     return;
        // }

        // // Reset errors
        // setErrors({});
        setloading(true);
       const formalldata = formData;
        const responseData = await postFormDataAsJson(formalldata);

        console.log(responseData, "responseData");

        // Log the form data



        // Proceed with the second API call
        const response = await fetch("https://gnj.onrender.com/api/v1/addFamilyDetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                StudentCode: formData.studentcode,
                AcademicYear: formData.stuyear,
                CatgCode: formData.CatgCode,
                data: JSON.stringify(responseData),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);

    }

    const handleselectfmg = (e) => {
        // setSkills(skills || []);


        let options = e.target.selectedOptions;
        let newArrayOfSelectedOptionValues = Object.values(options).map(opt => opt.value)
        console.log(newArrayOfSelectedOptionValues, "newArray");
        setoptions(newArrayOfSelectedOptionValues);
    }
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            {
                loading
                    ?
                    <div className="grid grid-cols-1 lg:grid-cols-1">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-black text-center">
                                <div
                                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status">
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="mt-6 flex flex-col">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            Student Family Detail
                        </h1>
                        <form onSubmit={handleSubmit}>
                            {console.log("Form Data imn Render: ", formData )}
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Search Student Code
                                            </label>
                                            <Select
                                                options={studentDetails.map((student) => ({ value: student.StudentCode, label: student.StudentCode }))}
                                                value={searchStudentCode ? { value: searchStudentCode, label: searchStudentCode } : null}
                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleSearchChange}
                                            // onChange={(selectedOption) => setSearchStudentCode(selectedOption ? selectedOption.value : '')}
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Student Code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="studentcode"
                                                    name="studentcode"
                                                    value={searchStudentCode}
                                                    onChange={handleSearchChange}
                                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuyear" className="block text-sm font-medium leading-6 text-gray-900">
                                                Year
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="stuyear"
                                                    name="stuyear"
                                                    
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Year</option>
                                                    <option value="2023-2024">2023-2024</option>
                                                    <option value="2022-2023">2022-2023</option>
                                                    <option value="2021-2022">2021-2022</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                                Category
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="category"
                                                    name="category"
                                                   
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Category</option>
                                                    <option value="SC">SC</option>
                                                    <option value="ST">ST</option>
                                                    <option value="OBC">OBC</option>
                                                    <option value="General">General</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="assisstance" className="block text-sm font-medium leading-6 text-gray-900">
                                                Any Assisstance
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="assisstance"
                                                    name="assisstance"
                                                    
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Category</option>
                                                    <option value="Medical">Medical</option>
                                                    <option value="Pension">Pension</option>
                                                    <option value="Other">Other</option>


                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuyear" className="block text-sm font-medium leading-6 text-gray-900">
                                                Select Head of The Family
                                            </label>
                                            <div className="mt-2">

                                                <select
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                    onChange={handleselectfmg}
                                                     multiple={true} 
                                                     aria-label="option" 
                                                     name='options'>
                                                    <option value="Father" selected={options.includes("Father") ? "selected" : ""}>Father</option>
                                                    <option value="Mother" selected={options.includes("Mother") ? "selected" : ""}>Mother</option>
                                                    <option value="Guardian" selected={options.includes("Guardian") ? "selected" : ""}>Guardian</option>
                                                </select>

                                            </div>
                                        </div>

                                        {options.indexOf("Father") > -1 ?
                                            <div className="sm:col-span-3">
                                                <h5 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-2xl">
                                                    For Father
                                                </h5>
                                                <div >
                                                    <div className="mt-2">
                                                        <div className="">
                                                            <label htmlFor="Father_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Father Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                onChange={handleInputChange}
                                                                name='Father_Name'
                                                                defaultValue={family2getdata.length > 0 ? family2getdata[0].Father_Name != null && family2getdata[0].Father_Name != undefined ? family2getdata[0].Father_Name : "" : ""}
                                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                                    }`}
                                                                id="form-control"
                                                                placeholder='Father Name'
                                                                aria-describedby="Father_Name"

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="">
                                                            <label htmlFor="Father_Education" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Father Education
                                                            </label>
                                                            <input
                                                                type="text"
                                                                onChange={handleInputChange}
                                                                name='Father_Education'
                                                                defaultValue={family2getdata.length > 0 ? family2getdata[0].Father_Education != null && family2getdata[0].Father_Education != undefined ? family2getdata[0].Father_Education : "" : ""}
                                                                className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                                id="Father_Education"
                                                                placeholder='Father Education'
                                                                aria-describedby="Father_Education" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">

                                                            <label htmlFor="Father_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Father Occupation
                                                            </label>

                                                            <input
                                                                type="text"
                                                                onChange={handleInputChange}
                                                                name='Father_Occupation'
                                                                defaultValue={family2getdata.length > 0 ? family2getdata[0].Father_Occupation != null && family2getdata[0].Father_Occupation != undefined ? family2getdata[0].Father_Occupation : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Father_Occupation" placeholder='Father Occupation' aria-describedby="Father_Occupation" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                            <label htmlFor="F_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Father Gross Income (per year)
                                                            </label>
                                                            <input onChange={handleInputChange} type="number" name='F_Gross_Income' defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Gross_Income != null && family2getdata[0].F_Gross_Income != undefined ? family2getdata[0].F_Gross_Income : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Gross_Income" placeholder='Father Gross Income' aria-describedby="F_Gross_Income" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                            <label htmlFor="F_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Father Aadhar Card Number
                                                            </label>

                                                            <input onChange={handleInputChange} type="number" name='F_Aadhar_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Aadhar_No != null && family2getdata[0].F_Aadhar_No != undefined ? family2getdata[0].F_Aadhar_No : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Aadhar_No" placeholder='Father Aadhar Card Number' aria-describedby="F_Aadhar_No" />
                                                        </div>
                                                    </div>

                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                            <label htmlFor="F_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Father Mobile Number
                                                            </label>

                                                            <input onChange={handleInputChange} type="number" name='F_Mobile_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Mobile_No != null && family2getdata[0].F_Mobile_No != undefined ? family2getdata[0].F_Mobile_No : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Mobile_No" placeholder='Father Mobile Number' aria-describedby="F_Mobile_No" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <label htmlFor="Grandfather_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Grandfather Name
                                                        </label>
                                                        <div className="my-2">
                                                            <input onChange={handleInputChange} type="text" name='Grandfather_Name' defaultValue={family2getdata.length > 0 ? family2getdata[0].Grandfather_Name != null && family2getdata[0].Grandfather_Name != undefined ? family2getdata[0].Grandfather_Name : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Grandfather_Name" placeholder='Grandfather Name' aria-describedby="Grandfather_Name" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ""}

                                        {options.indexOf("Mother") > -1 ?
                                            <div className="sm:col-span-3">
                                                <h5 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-2xl">
                                                    For Mother
                                                </h5>

                                                <div className="row">
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label onChange={handleInputChange} htmlFor="Mother_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mother Name
                                                        </label>
                                                        <input type="text" name='Mother_Name' defaultValue={family2getdata.length > 0 ? family2getdata[0].Mother_Name != null && family2getdata[0].Mother_Name != undefined ? family2getdata[0].Mother_Name : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="form-control" placeholder='Mother Name' aria-describedby="Mother_Name" />
                                                                                                                   </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label onChange={handleInputChange} htmlFor="Mother_Education" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mother Education
                                                        </label>
                                                            <input type="text" name='Mother_Education' defaultValue={family2getdata.length > 0 ? family2getdata[0].Mother_Education != null && family2getdata[0].Mother_Education != undefined ? family2getdata[0].Mother_Education : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Mother_Education" placeholder='Mother Education' aria-describedby="Mother_Education" />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="Mother_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mother Occupation
                                                        </label>
                                                           
                                                            <input 
                                                            type="text" 
                                                            name='Mother_Occupation' 
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].Mother_Occupation != null && family2getdata[0].Mother_Occupation != undefined ? family2getdata[0].Mother_Occupation : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                                                            id="Mother_Occupation" 
                                                            onChange={handleInputChange}
                                                            placeholder='Mother Occupation' 
                                                            aria-describedby="Mother_Occupation" 
                                                            
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="M_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mother Gross Income (per year)
                                                        </label>
                                                            
                                                            <input onChange={handleInputChange} type="number" name='M_Gross_Income' defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Gross_Income != null && family2getdata[0].M_Gross_Income != undefined ? family2getdata[0].M_Gross_Income : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Gross_Income" placeholder='Mother Gross Income' aria-describedby="M_Gross_Income" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="M_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mother Aadhar Card Number
                                                        </label>

                                                            <input onChange={handleInputChange} type="number" name='M_Aadhar_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Aadhar_No != null && family2getdata[0].M_Aadhar_No != undefined ? family2getdata[0].M_Aadhar_No : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Aadhar_No" placeholder='Mother Aadhar Card Number' aria-describedby="M_Aadhar_No" />
                                                        </div>
                                                    </div>

                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label  htmlFor="M_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mother Mobile Number
                                                        </label>
                                                        <input onChange={handleInputChange} type="number" name='M_Mobile_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Mobile_No != null && family2getdata[0].M_Mobile_No != undefined ? family2getdata[0].M_Mobile_No : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Mobile_No" placeholder='Mother Mobile Number' aria-describedby="M_Mobile_No" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ""}

                                        {options.indexOf("Guardian") > -1 ?
                                            <div className='sm:col-span-3'>
                                                 <h5 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-2xl">
                                                 For Guardian
                                                </h5>


                                                <div className="row">
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="Guardian_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Guardian Name
                                                        </label>
                                                          
                                                            <input type="text" name='Guardian_Name' defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Name != null && family2getdata[0].Guardian_Name != undefined ? family2getdata[0].Guardian_Name : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="form-control" placeholder='Guardian Name' aria-describedby="Guardian_Name" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="Guardian_Education" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Guardian Education
                                                        </label>

                                                            <input type="text" name='Guardian_Education' defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Education != null && family2getdata[0].Guardian_Education != undefined ? family2getdata[0].Guardian_Education : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="form-control" placeholder='Guardian Education' aria-describedby="Guardian_Education" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="Guardian_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Guardian Occupation
                                                        </label>
                                                           
                                                            <input type="text" name='Guardian_Occupation' defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Occupation != null && family2getdata[0].Guardian_Occupation != undefined ? family2getdata[0].Guardian_Occupation : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Guardian_Occupation" placeholder='Guardian Occupation' aria-describedby="Guardian_Occupation" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="Guardian_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Guardian Gross Income (per year)
                                                        </label>
                                                            <label for="Guardian_Gross_Income" className="form-label"></label>
                                                            <input type="number" name='Guardian_Gross_Income' defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Gross_Income != null && family2getdata[0].Guardian_Gross_Income != undefined ? family2getdata[0].Guardian_Gross_Income : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Gross_Income" placeholder='Guardian Gross Income' aria-describedby="Gross_Income" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="Guardian_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Guardian Aadhar Card Number
                                                        </label>
                                                            <input type="number" name='Guardian_Aadhar_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Aadhar_No != null && family2getdata[0].Guardian_Aadhar_No != undefined ? family2getdata[0].Guardian_Aadhar_No : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Guardian_Aadhar_No" placeholder='Guardian Aadhar Card Number' aria-describedby="Guardian_Aadhar_No" />
                                                        </div>
                                                    </div>

                                                    <div className="mt-2">
                                                        <div className="my-2">
                                                        <label htmlFor="Guardian_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Guardian Mobile Number
                                                        </label>
                                                            <input type="number" name='Guardian_Mobile_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Mobile_No != null && family2getdata[0].Guardian_Mobile_No != undefined ? family2getdata[0].Guardian_Mobile_No : "" : ""} className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Guardian_Mobile_No." placeholder='Guardian Mobile Number' aria-describedby="Guardian_Mobile_No." />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ""}


                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save & Next
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </section>
    )
}

export default StudentFamilyDetail