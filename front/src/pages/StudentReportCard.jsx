import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
const StudentReportCard = () => {

    const [userID, setUserId] = useState('')
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});

    const [subjectandmarks_data, setsubjectandmarks_data] = useState([]);
    const [subjecttotalmarks, setsubjecttotalmarks] = useState("0");
    const [maxmarkstotal, setmaxmarkstotal] = useState("0");
    const [maxpercentage, setmaxpercentage] = useState("0");
    const [ResultOption, setResultOption] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState({
        studentcode: "",
        stuyear: "",
        reportcard: "",
        result: "",
        extra: "",
        subjectList: "",
        marksobtained: "",
        markstotal: ""
    })


    const [subjectList, setsubjectList] = useState([{ subjectname: "", total_marks: "", max_marks: "" }]);

    const subjecthandleAddClick = () => {
        setsubjectList([...subjectList, { subjectname: "", total_marks: "", max_marks: "" }])
    };
    const handleCheckboxChange = (id, name) => {
        setSelectedItems((prevItems) => {
            if (prevItems.includes(id)) {
                return prevItems.filter((item) => item !== id);
            } else {
                return [...prevItems, id];
            }
        });
    
        setFormData((prevData) => ({
            ...prevData,
            extra: selectedItems.map((itemId) => items.find((item) => item.id === itemId).name).join(','),
        }));
    };
    const items = [
        { id: 1, name: 'Music' },
        { id: 2, name: 'Dance' },
        { id: 3, name: 'Art' },
        { id: 4, name: 'Game' },
    ];

    const subjecthandleRemoveClick = index => {
        const list = [...subjectList];
        //   console.log(index);
        list.splice(index, 1);
        setsubjectList(list);
        subjectmarkscount(list);
    }
    const subjectListhandleInputChange = (e, index) => {
        var { name, value } = e.target;
        if (name.includes("total_marks")) {
            name = "total_marks";
        }
        if (name.includes("subjectname")) {
            name = "subjectname";
        }
        if (name.includes("max_marks")) {
            name = "max_marks";
        }
        const list = [...subjectList];

        list[index][name] = value;
        setsubjectList(list);
        subjectmarkscount(subjectList);
    };
    const subjectmarkscount = (subjectLists) => {

        var lastval = "";

        var ttlmrks = 0;
        var maxmrks = 0;
        var maxperc = 0;
        subjectLists.map((arr, i) => {
            lastval = arr.subjectname;
            if (lastval != "") {
                var total_markstxt = subjectLists[i].total_marks;
                var max_markstxt = subjectLists[i].max_marks;
                //  var max_perctxt = total_markstxt%max_markstxt;
                //  var max_perctxt = (total_markstxt/max_markstxt)*100;
                ttlmrks = ttlmrks + parseInt(total_markstxt);
                maxmrks = maxmrks + parseInt(max_markstxt);
                //   maxperc  = maxperc+parseInt(max_perctxt);
            }
        });

        setsubjecttotalmarks(ttlmrks.toString());
        setmaxmarkstotal(maxmrks.toString());
        setmaxpercentage((maxmrks / ttlmrks) * 100);
        setFormData((prevData) => ({
            ...prevData,
            marksobtained: ttlmrks.toString(),
            markstotal: maxmrks.toString(),
        }));
    }
    const handleSearchChange = (selectedOption) => {
        setSearchStudentCode(selectedOption ? selectedOption.value : '');

        // Update studentCode in formData when searchStudentCode changes
        setFormData((prevData) => ({
            ...prevData,
            studentcode: selectedOption ? selectedOption.value : '',
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            subjectList: [...subjectList]

        }));
    };

    const navigate = useNavigate();


    useEffect(() => {
        fetchAllStudentDetails();
    
        setsubjectList([{ subjectname: "", total_marks: "", max_marks: "" }]);
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId");
        setUserId(getUserid);
    }, [setsubjectList, setUserId, navigate]);


    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('http://localhost:5000/api/v1/fetchAllStudentDetails')
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


    const handleSubmit = async(e) => {
        e.preventDefault();
console.log('subjectList:', subjectList);
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

        // Log the form data

        

        // Proceed with the second API call
        const response = await fetch("http://localhost:5000/api/v1/addReportDetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                StudentCode: formData.studentcode,
                AcademicYear: formData.stuyear,
                CatgCode: formData.CatgCode,
                data: JSON.stringify({
                    ...formData,
                    subjectList: subjectList,
                    extra:selectedItems
                  }),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);
        // Perform additional actions, e.g., submit data to a server
        // const { name, value } = e.target;

        // setFormData((prevData) => ({
        //     ...prevData,
        //     [name]: value,
        //     subjectList: [...subjectList],
        // }));


    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            {
                loading
                    ?
                    <div className="grid grid-cols-1 lg:grid-cols-1">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-center">
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
                            Student Address Detail
                        </h1>

                     
                        <form onSubmit={handleSubmit}>
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
                                                    value={formData['stuyear']}
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
                                            <label htmlFor="reportcard" className="block text-sm font-medium leading-6 text-gray-900">
                                                Report Card Received
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="reportcard"
                                                    name="reportcard"
                                                    value={formData['reportcard']}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Option</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">NO</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="result" className="block text-sm font-medium leading-6 text-gray-900">
                                                Result
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="result"
                                                    name="result"
                                                    value={formData['result']}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select result</option>
                                                    <option value="Passed">Passed</option>
                                                    <option value="Failed">Failed</option>
                                                    <option value="Re-appear">Re-appear</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="extra" className="block text-sm font-medium leading-6 text-gray-900">
                                                Extra
                                            </label>
                                            <div className="mt-2">
                                                <div className="w-full p-4">
                                                    <ul className="list-none">
                                                        {items.map((item) => (
                                                            <li key={item.id} className="my-2">
                                                                <label className="inline-flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name='extra'
                                                                        checked={selectedItems.includes(item.id)}
                                                                        onChange={() => handleCheckboxChange(item.id,item.name)}
                                                                        className="form-checkbox text-indigo-600"
                                                                    />
                                                                    <span className="ml-2">{item.name}</span>
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                                                Subjects
                                            </label>
                                            <div className="mt-2">
                                                {subjectList.map((input, i) => {
                                                    // console.log(input,i, "Print")
                                                    return (
                                                        <div className="grid grid-cols-4 gap-4" key={i}>
                                                            <div className="">
                                                                <label htmlFor={`subjectname-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Subject Name
                                                                </label>
                                                                <input type="text"
                                                                    name={'subjectname' + i}
                                                                    key='subjectname'
                                                                    className="form-control my-2"
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['subjectname' + i] != null && subjectandmarks_data[0]['subjectname' + i] != undefined ? subjectandmarks_data[0]['subjectname' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='Subject Name'
                                                                    aria-describedby="SubjectName"
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <label htmlFor={`total_marks-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Total Marks
                                                                </label>
                                                                <input type="text"
                                                                    name={'total_marks' + i}
                                                                    key='total_marks'
                                                                    className="form-control my-2 "
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['total_marks' + i] != null && subjectandmarks_data[0]['total_marks' + i] != undefined ? subjectandmarks_data[0]['total_marks' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='ex: 100'
                                                                    aria-describedby="Total_Marks" />
                                                            </div>
                                                            <div className="">
                                                                <label htmlFor={`max_marks-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Max Marks
                                                                </label>
                                                                <input type="text"
                                                                    name={'max_marks' + i}
                                                                    key='max_marks'
                                                                    className="form-control my-2"
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['max_marks' + i] != null && subjectandmarks_data[0]['max_marks' + i] != undefined ? subjectandmarks_data[0]['max_marks' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='ex: 60'
                                                                    aria-describedby="Maximum_Marks" />
                                                            </div>

                                                            <div className=''>
                                                                <div className="add-new-service my-2 ">
                                                                    {subjectList.length !== 1 && <button type="button" className="btn bg-red-500 mb-2 text-white" onClick={() => subjecthandleRemoveClick(i)}>Remove</button>}
                                                                </div>
                                                            </div>

                                                            <div className="add-new-service">
                                                                {subjectList.length - 1 === i && <button type="button" className="btn bg-black text-white" onClick={subjecthandleAddClick}>Add</button>}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text py-5 fw-bold'>
                                <p className=''>Total Marks: {subjecttotalmarks}</p>
                                <p className=''>Maximum  Marks : {maxmarkstotal}</p>
                                <p className=''>Maximum  Marks : {Math.round(maxpercentage, 2)}%</p>
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

export default StudentReportCard