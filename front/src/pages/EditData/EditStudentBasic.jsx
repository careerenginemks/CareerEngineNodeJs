import React, { useState, useEffect } from 'react';
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams  } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";

const EditStudentBasic = () => {
  const [userID, setUserId] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [fetchData, setfetchData] = useState({ data: { data: [] } });
  const [fetchDataId, setfetchDataId] = useState('');



  const [formData, setFormData] = useState({
    studentcode: "",
    stuyear: "",
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    dob: "",
    joindate: "",
    religion: "",
    refby: "",
    approveby: "",
    sikligar: "",
    status: "",
    contact1type: "",
    contact1: "",
    contact2type: "",
    contact2: "",
    identity: "",
    fileupload: "abc.jpg",

  }
  );
  const {studentCode,year,table} = useParams();



  useEffect(() => {
    const getUserid = localStorage.getItem("UserId")
    // console.log("Updated FormData:", formData);
    fetchUserInfo();

    setUserId(getUserid)
    if (!localStorage.getItem("UserauthToken")) {
      navigate("/");
    }
  }, [])
  const fetchUserInfo = async () => {
    console.log('fetch');
    setloading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/getAllData/${studentCode}/${year}/${table}`);
      if (!response.ok) {
        throw new Error(`Error fetching student details: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Initialize fetchData with the expected structure
      console.log(data.data.data.length, "Data")
      if(data.data.data.length > 0){
          setfetchData(JSON.parse(data.data.data[0].json));
          setFormData(JSON.parse(data.data.data[0].json));
          setfetchDataId(JSON.parse(data.data.data[0].id));
      }else {
        alert("No such user found!");
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    } finally {
      setloading(false);
    }
  };
  
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    console.log(fetchDataId, "fetchDataId :Handle Start");
    e.preventDefault();

    // Check if any select is not selected
    const errorsObj = {};
    // Object.keys(formData).forEach((fieldName) => {
    //   if (!formData[fieldName]) {
    //     errorsObj[fieldName] = true;
    //   }
    // });

    // if (Object.keys(errorsObj).length > 0) {
    //   setErrors(errorsObj);
    //   return;
    // }

    // setErrors({}); // Reset errors
    setloading(true);

    try {
    //   const imgurl = await imageupload();
    //   console.log("imgurl: ", imgurl);

    //   // Now that the Cloudinary API call is complete, update the formData with the Cloudinary URL
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     fileupload: imgurl,
    //   }));

    //   console.log("After Cloudinary Upload:", formData);
// console.log(formData.id, "formData.id")
      // Proceed with the second API call
      const response = await fetch(`http://localhost:5000/api/v1/updateBasicDetail/${fetchDataId}`, {
        method: "PUT", // Assuming you are using PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentCode: formData.studentcode,
          year: formData.stuyear,
          data: JSON.stringify(formData),
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      setloading(false);
      navigate('/studentsList')

    } catch (error) {
      setloading(false);
      console.error("Error:", error.message);
    }
  };

  const imageupload = async () => {




    const data = new FormData();
 
    // if (!image) {
    //   alert("No image selected.")
    //   throw new Error("No image selected.");
    // }
  // Check the file type
//   const allowedTypes = ["image/png", "image/jpeg"];
//   if (!allowedTypes.includes(image.type)) {
//     alert("Invalid file type. Please select a PNG or JPG file.")
//     throw new Error("Invalid file type. Please select a PNG or JPG file.");
//   }

  // Check the file size (in bytes)
//   const maxSizeMB = 2; // Set the maximum file size in megabytes
//   const maxSizeBytes = maxSizeMB * 1024 * 1024;
//   if (image.size > maxSizeBytes) {
//     alert(`File size exceeds the maximum limit of ${maxSizeMB} MB.`)
//     throw new Error(`File size exceeds the maximum limit of ${maxSizeMB} MB.`);
//   }


    

  data.append("file", image);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "dxwge5g8f");
    try {
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dxwge5g8f/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      if (!cloudinaryResponse.ok) {
        console.error("Error uploading image to Cloudinary:", cloudinaryResponse.statusText);
        return;
      }

      const cloudinaryData = await cloudinaryResponse.json();
      console.log("Cloudinary URL:", cloudinaryData.url);

      return cloudinaryData.url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error.message);
      return null;
    }
  };
 
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name == "file-upload") {
      const selectedFile = e.target.files[0];

      // Check if a file is selected
    //   if (selectedFile) {
    //     // Check the file type
    //     const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
    //     if (!allowedTypes.includes(selectedFile.type)) {
    //       alert("Invalid file type. Please select a PNG, JPG, or GIF file.");
    //       return;
    //     }

    //     // Check the file size (in bytes)
    //     const maxSizeMB = 10; // Set the maximum file size in megabytes
    //     const maxSizeBytes = maxSizeMB * 1024 * 1024;
    //     if (selectedFile.size > maxSizeBytes) {
    //       alert(`File size exceeds the maximum limit of ${maxSizeMB} MB.`);
    //       return;
    //     }

    //     // If the file passes the checks, update the state
    //     setImage(selectedFile);
    //   }
    } else {
      // Validation based on the field name
      let updatedValue = value;

      switch (name) {
        case "firstname":
        case "middlename":
        case "lastname":
        case "refby":
        case "approveby":
          // Allow only alphabets in the name fields
          updatedValue = value.replace(/[^a-zA-Z]/g, '');
          break;

        case "contact1":
        case "contact2":
          // Allow only numeric values in the contact number fields
          updatedValue = value.replace(/[^0-9]/g, '');
          break;

        // Add additional cases for other fields with specific validation requirements

        default:
          break;
      }

      // Update the state with the sanitized value
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    }
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
              Edit Basic Infromation
              {console.log(fetchData,"fetchData")}
              {console.log(formData,"formData.studentcode.length")}
              {/* {console.log(formData.studentcode.length,"formData.studentcode.length")} */}
            
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Student Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="studentcode"
                          id="studentcode"
                          placeholder='Student Code'
                          defaultValue={formData.studentcode || (fetchData ? fetchData.studentcode : "No Data")}
                          onChange={handleInputChange}

                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                            }`}
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
                          defaultValue={formData.stuyear || (fetchData ? fetchData.stuyear : "No Data")}
                        //   value={formData['stuyear']}
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

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="firstname"
                          placeholder='First Name'
                          id="firstname"
                          defaultValue={formData.firstname || (fetchData ? fetchData.firstname : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.firstname ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="middlename" className="block text-sm font-medium leading-6 text-gray-900">
                        Middle Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="middlename"
                          placeholder='Middle Name'
                          id="middlename"
                          value={formData.middlename || (fetchData ? fetchData.middlename : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.middlename ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-2">
                      <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="lastname"
                          placeholder='Last Name'
                          id="lastname"
                          value={formData.lastname || (fetchData ? fetchData.lastname : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.lastname ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                        Gender
                      </label>
                      <div className="mt-2">
                        <select
                          id="gender"
                          name="gender"
                          defaultValue={formData.gender || (fetchData ? fetchData.gender : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.gender ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Gender</option>
                          <option selected value="Male">Male</option>
                          <option value="Female">Female</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of Birth
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="dob"
                          defaultValue={formData['dob'] || (fetchData ? fetchData.dob : "No Data")}
                          id="dob"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.dob ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="joindate" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of Joining
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="joindate"
                          defaultValue={formData['joindate'] || (fetchData ? fetchData.joindate : "No Data")}
                          onChange={handleInputChange}
                          id="joindate"
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.joindate ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="religion" className="block text-sm font-medium leading-6 text-gray-900">
                        Religion
                      </label>
                      <div className="mt-2">
                        <select
                          id="religion"
                          name="religion"
                          defaultValue={formData['religion'] || (fetchData ? fetchData.religion : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.religion ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Religion</option>
                          <option value="Sikh">Sikh</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Muslim">Muslim</option>
                          <option value="Christian">Christian</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="refby" className="block text-sm font-medium leading-6 text-gray-900">
                        Referred By
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="refby"
                          defaultValue={formData['refby'] || (fetchData ? fetchData.refby : "No Data")}
                          placeholder='Referred By'
                          id="refby"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.refby ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-3">
                      <label htmlFor="approveby" className="block text-sm font-medium leading-6 text-gray-900">
                        Approved By
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="approveby"
                          placeholder='Approved By'
                          defaultValue={formData.approveby || (fetchData ? fetchData.approveby : "No Data")}
                          onChange={handleInputChange}
                          id="approveby"
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.approveby ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="sikligar" className="block text-sm font-medium leading-6 text-gray-900">
                        Sikligar
                      </label>
                      <div className="mt-2">
                        <select
                          id="sikligar"
                          name="sikligar"
                          defaultValue={formData.sikligar || (fetchData ? fetchData.sikligar : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.sikligar ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Student is Sikligar</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                      </label>
                      <div className="mt-2">
                        <select
                          id="status"
                          name="status"
                          defaultValue={formData.status || (fetchData ? fetchData.status : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.status ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Student Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="contact1type" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Number Type
                      </label>
                      <div className="mt-2">
                        <select
                          id="contact1type"
                          name="contact1type"
                          defaultValue={formData.contact1type || (fetchData ? fetchData.contact1type : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact1type ? 'border-red-500' : ''
                            }`}
                        >
                          <option>Select Number belongd to</option>
                          <option value="Self">Self</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="GrandFather">GrandFather</option>
                          <option value="Gurdian">Gurdian</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact1" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Number 1
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="contact1"
                          defaultValue={formData.contact1 || (fetchData ? fetchData.contact1 : "No Data")}
                          placeholder='Contact Number 1'
                          onChange={handleInputChange}
                          id="contact1"
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact1 ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="contact2type" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Number Type
                      </label>
                      <div className="mt-2">
                        <select
                          id="contact2type"
                          name="contact2type"
                          defaultValue={formData.contact2type || (fetchData ? fetchData.contact2type : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact2type ? 'border-red-500' : ''
                            }`}
                        >
                          <option>Select Number belongd to</option>
                          <option value="Self">Self</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="GrandFather">GrandFather</option>
                          <option value="Gurdian">Gurdian</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact2" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Number 2
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="contact2"
                          id="contact2"
                          defaultValue={formData.contact2 || (fetchData ? fetchData.contact2 : "No Data")}
                          placeholder='Contact Number 2'
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact2 ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="identity" className="block text-sm font-medium leading-6 text-gray-900">
                        Identity Document Type
                      </label>
                      <div className="mt-2">
                        <select
                          id="identity"
                          name="identity"
                          defaultValue={formData.identity || (fetchData ? fetchData.identity : "No Data")}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.identity ? 'border-red-500' : ''
                            }`}
                        >
                          <option>Select Identity Option</option>
                          <option value="Adhard Card">Adhard Card</option>
                          <option value="Birth Certificate">Birth Certificate</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="sm:col-span-5">
                      <label htmlFor="identityphoto" className="block text-sm font-medium leading-6 text-gray-900">
                        Identity Document
                      </label>
                
                      <div className='imgstc'>
                        <img src={formData.fileupload || (fetchData ? fetchData.fileupload : "No Data")} />
                      </div>
                      <div className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${errors.fileupload ? 'border-red-500' : ''
                        }`}>
                        <div className="text-center">
                          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                // onChange={(e)=>setImage(e.target.files[0])}
                                onChange={(e) => setImage(e.target.files[0])}
                                id="file-upload"
                                type="file"
                                name="file-upload"
                                className={`sr-only ${errors.fileupload ? 'border-red-500' : ''
                                  }`}

                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB</p>
                        </div>
                      </div>
                    </div> */}


                  </div>
                </div>
              </div>

              {errors.gender && <p className="text-red-500">Please select a gender.</p>}
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

export default EditStudentBasic