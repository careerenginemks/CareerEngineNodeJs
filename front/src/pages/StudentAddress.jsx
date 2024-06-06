import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const StudentAddress = () => {
    const [userID, setUserId] = useState('')
    const [loading, setloading] = useState(false);

    const [selectedBasti, setSelectedBasti] = useState('');
    const [stateValue, setStateValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [tehsilValue, setTehsilValue] = useState('');
    const [options, setOptions] = useState([]);
    const [bastiError, setBastiError] = useState(false);
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);

    const [formData, setFormData] = useState({
        studentcode: "",
        stuyear: "",
        stustate: "",
        studistrict: "",
        stutehsil: "",
        stubasti: "",
        stuvillage: "",
        stuaddress: "",
        stupin: "",
        rep1: "",
        rep2: "",

    })
    const [errors, setErrors] = useState({});

    const handleSearchChange = (selectedOption) => {
        setSearchStudentCode(selectedOption ? selectedOption.value : '');

        // Update studentCode in formData when searchStudentCode changes
        setFormData((prevData) => ({
            ...prevData,
            studentcode: selectedOption ? selectedOption.value : '',
        }));
    };


    const navigate = useNavigate();
    useEffect(() => {
        fetchAllStudentDetails();

        fetchBastiData();
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)

    }, [])

    useEffect(() => {
        const filteredDetails = studentDetails.filter(
            (detail) => detail.StudentCode.includes(searchStudentCode)
        );
        setFilteredStudentDetails(filteredDetails);
    }, [searchStudentCode, studentDetails]);


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
    const fetchBastiData = () => {
        console.log("Start");
        fetch('https://gnj.onrender.com/api/v1/bastilist')
            .then(response => response.json())
            .then(data => {
                // Assuming the API response contains basti name, state, and city
                const bastiData = data;

                console.log(bastiData, "dataprint")
                // Parse the json string within the data object and setOptions
                const parsedData = bastiData.data.map(item => JSON.parse(item.Json));
                console.log(parsedData, "parsedData"); // Print the parsed data object in the console
                setOptions(parsedData);

                if (parsedData.length > 0) {
                    // Assuming the API response contains basti name, state, and city
                    const { basti_name, State, District, Tehsil } = parsedData[0];

                    // console.log(basti_name, State, District, "basti_name, State, District")

                    setSelectedBasti(basti_name);
                    setStateValue(State);
                    setDistrictValue(District);
                    setTehsilValue(Tehsil);
                }

            })
            .catch(error => {
                console.error('Error fetching basti data:', error);
            });
    };

    const handleBastiChange = (event) => {
        const selectedBasti = event.target.value;
        setSelectedBasti(selectedBasti);

        const selectedBastiData = options.find(item => item.basti_name === selectedBasti);

        if (selectedBastiData) {
            // Update form data with selected basti details
            setFormData((prevData) => ({
                ...prevData,
                stustate: selectedBastiData.State,
                studistrict: selectedBastiData.District,
                stutehsil: selectedBastiData.Tehsil,
                stubasti: selectedBastiData.basti_name,
            }));
            setBastiError(false); // Clear the error flag
        } else {
            setBastiError(true); // Set the error flag if basti is empty
        }
    };




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

        // Log the form data
        console.log('Form Data:', formData);

        // Proceed with the second API call
        const response = await fetch("https://gnj.onrender.com/api/v1/addStudentAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                StudentCode: formData.studentcode,
                AcademicYear: formData.stuyear,
                CatgCode: formData.CatgCode,
                data: JSON.stringify(formData),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);
        // Perform additional actions, e.g., submit data to a server
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name] : value,
        }));
    };
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
                                                Search Student Code {console.log(studentDetails, "studentDetails")}
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
                                            <label htmlFor="stubasti" className="block text-sm font-medium leading-6 text-gray-900">
                                                Basti
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="stubasti"
                                                    name="stubasti"
                                                    // value={formData['stubasti']}
                                                    onChange={handleBastiChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    {options.map((option, index) => (
                                                        <option
                                                            key={index}
                                                            value={option.basti_name}

                                                        >
                                                            {option.basti_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stustate"
                                                    id="stustate"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.basti_name === selectedBasti).State : ''}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                District
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="studistrict"
                                                    id="studistrict"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.basti_name === selectedBasti).District : ''}

                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Tehsil
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stutehsil"
                                                    id="stutehsil"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.basti_name === selectedBasti).Tehsil : ''}

                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuvillage" className="block text-sm font-medium leading-6 text-gray-900">
                                                Village
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stuvillage"
                                                    value={formData['stuvillage']}
                                                    id="stuvillage"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuaddress ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>



                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuaddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stuaddress"
                                                    value={formData['stuaddress']}
                                                    id="stuaddress"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuaddress ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stupin" className="block text-sm font-medium leading-6 text-gray-900">
                                                PIN
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stupin"
                                                    value={formData['stupin']}
                                                    id="stupin"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep1" className="block text-sm font-medium leading-6 text-gray-900">
                                                Representation Mobile Number 1
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="rep1"
                                                    id="rep1"
                                                    value={formData['rep1']}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep1 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep2" className="block text-sm font-medium leading-6 text-gray-900">
                                                Representation Mobile Number 2
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="rep2"
                                                    value={formData['rep2']}
                                                    id="rep2"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep2 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

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

export default StudentAddress