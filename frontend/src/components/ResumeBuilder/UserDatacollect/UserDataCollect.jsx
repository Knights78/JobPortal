// import React, { useEffect, useState } from 'react';
// import './userDataCollect.css';
// import { IoMdCloudUpload } from 'react-icons/io';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setThemeData,
//   setCheckProj,
//   setCheckWork,
//   setCheckAward,
// } from '@/redux/ResumeSlice';

// const UserDataCollect = () => {
//   const dispatch = useDispatch();
//   const {
//     themeData,
//     checkProj,
//     checkWork,
//     checkAward,
//   } = useSelector((state) => state.resume);

//   const [projectCount, setProjectCount] = useState(0);
//   const [educationCount, setEducationCount] = useState(0);
//   const [workCount, setWorkCount] = useState(0);
//   const [projArrTemplate, setProjArrTemplate] = useState([]);
//   const [educationArrTemplate, setEducationArrTemplate] = useState([]);
//   const [workArrTemplate, setWorkArrTemplate] = useState([]);
//   const [projectData, setProjectData] = useState(themeData.projectData);
//   const [educationData, setEducationData] = useState(themeData.educationData);
//   const [workData, setWorkData] = useState(themeData.workData);
//   const [personalData, setPersonalData] = useState(themeData.personalData);
//   const [awardData, setAwardData] = useState(themeData.awardData);

//   // To Add Personal Data to the State if image is there just check the condition
//   const handleChangePersonal = (e) => {
//     const { name, value } = e.target;
//     setPersonalData({ ...personalData, [name]: value });
//     if (e.target.name === 'profileImage') {
//       setPersonalData({ ...personalData, profileImage: URL.createObjectURL(e.target.files[0]) });
//     }
//   };

//   // To Add Project Data to the State
//   const handleChangeProject = (e) => {
//     const { name, value, id } = e.target;
//     // Create a copy of the projectData object
//     let tempProjectData = { 
//       projectTitles: { ...projectData.projectTitles }, 
//       projectDesc: { ...projectData.projectDesc } 
//     };

//     // Update the corresponding property in the copied object
//     if (name.includes('pName')) {
//       tempProjectData.projectTitles[id] = value;
//     } else {
//       tempProjectData.projectDesc[id] = value;
//     }

//     // Update the state with the new object
//     setProjectData(tempProjectData);
//     dispatch(setThemeData({ ...themeData, projectData: tempProjectData }));
//   };

//   const handleProjectClick = (e) => {
//     e.preventDefault();
//     let i = projectCount;
//     ++i;
//     const template = (
//       <div className='my-2' key={`project-${i}`}>
//         <input
//           className='input-field'
//           disabled={checkProj}
//           id={`pTitle${i}`}
//           name='pName'
//           onChange={handleChangeProject}
//           type='text'
//           placeholder='Enter Project Title'
//           required
//         />
//         <textarea
//           className='input-field'
//           disabled={checkProj}
//           id={`pDescription${i}`}
//           name='pDescription'
//           onChange={handleChangeProject}
//           placeholder='Use comma to separate Description'
//           required
//         />
//       </div>
//     );
//     setProjArrTemplate([...projArrTemplate, template]);
//     setProjectCount(i);
//   };

//   // To Add Education Data to the State
//   const handleChangeEducation = (e) => {
//     const { name, value, id } = e.target;
//     // Create a copy of the educationData object
//     let tempEducationData = {
//       educationTitles: { ...educationData.educationTitles },
//       educationDesc: { ...educationData.educationDesc }
//     };

//     // Update the corresponding property in the copied object
//     if (name.includes('eName')) {
//       tempEducationData.educationTitles[id] = value;
//     } else {
//       tempEducationData.educationDesc[id] = value;
//     }

//     // Update the state with the new object
//     setEducationData(tempEducationData);
//     dispatch(setThemeData({ ...themeData, educationData: tempEducationData }));
//   };

//   const handleEducationClick = (e) => {
//     e.preventDefault();
//     let i = educationCount;
//     ++i;
//     const template = (
//       <div className='my-2' key={`education-${i}`}>
//         <input
//           className='input-field'
//           id={`eTitle${i}`}
//           name='eName'
//           onChange={handleChangeEducation}
//           type='text'
//           placeholder='Enter Education Title'
//           required
//         />
//         <textarea
//           className='input-field'
//           id={`eDescription${i}`}
//           name='eDescription'
//           onChange={handleChangeEducation}
//           placeholder='Use comma to separate Description'
//           required
//         />
//       </div>
//     );
//     setEducationArrTemplate([...educationArrTemplate, template]);
//     setEducationCount(i);
//   };

//   // To Add Work Data to the State
//   const handleChangeWork = (e) => {
//     const { name, value, id } = e.target;
//     // Create a copy of the workData object
//     let tempWorkData = {
//       workTitles: { ...workData.workTitles },
//       workDesc: { ...workData.workDesc }
//     };

//     // Update the corresponding property in the copied object
//     if (name.includes('wName')) {
//       tempWorkData.workTitles[id] = value;
//     } else {
//       tempWorkData.workDesc[id] = value;
//     }

//     // Update the state with the new object
//     setWorkData(tempWorkData);
//     dispatch(setThemeData({ ...themeData, workData: tempWorkData }));
//   };

//   const handleWorkClick = (e) => {
//     e.preventDefault();
//     let i = workCount;
//     ++i;
//     const template = (
//       <div className='my-2' key={`work-${i}`}>
//         <input
//           className='input-field'
//           id={`wTitle${i}`}
//           name='wName'
//           onChange={handleChangeWork}
//           type='text'
//           placeholder='Enter Job Title'
//           required
//         />
//         <textarea
//           className='input-field'
//           id={`wDescription${i}`}
//           name='wDescription'
//           onChange={handleChangeWork}
//           placeholder='Use comma to separate Description'
//           required
//         />
//       </div>
//     );
//     setWorkArrTemplate([...workArrTemplate, template]);
//     setWorkCount(i);
//   };

//   // To Add Awards & Achievements Data to the State
//   const handleChangeAwards = (e) => {
//     const { name, value } = e.target;
//     // Create a copy of the awardData object
//     let tempAwardData = { ...awardData, [name]: value };
    
//     // Update the state with the new object
//     setAwardData(tempAwardData);
//     dispatch(setThemeData({ ...themeData, awardData: tempAwardData }));
//   };

//   // Update theme data when any state changes
//   useEffect(() => {
//     dispatch(setThemeData({ ...themeData, personalData, projectData, educationData, workData, awardData }));
//   }, [personalData, projectData, educationData, workData, awardData, dispatch]);

//   return (
//     <div id='form-collect'>
//       {/* Personal Details */}
//       <div id='form-personal' className='mb-2'>
//         <h4 className='section-heading'>Personal Details</h4>
//         <hr />
//         <div className='my-2'>
//           <div className='file'>
//             <label htmlFor='input-file'>
//               <IoMdCloudUpload size={30} /> Select a file
//             </label>
//             <input
//               accept='image/*'
//               name='profileImage'
//               onChange={handleChangePersonal}
//               id='input-file'
//               type='file'
//             />
//             <img className='blah' src={personalData.profileImage} alt='Profile preview' />
//           </div>
//         </div>
//         <input
//           className='input-field'
//           name='name'
//           onChange={handleChangePersonal}
//           type='text'
//           placeholder='Your Name'
//           required
//         />
//         <input
//           className='input-field'
//           name='summary'
//           onChange={handleChangePersonal}
//           type='text'
//           placeholder='Your summary'
//           required
//         />
//         <input
//           className='input-field'
//           name='workProfile'
//           onChange={handleChangePersonal}
//           type='text'
//           placeholder='Work Profile'
//           required
//         />
//         <input
//           className='input-field'
//           name='address'
//           onChange={handleChangePersonal}
//           type='text'
//           placeholder='Address'
//           required
//         />
//         <input
//           className='input-field'
//           name='phone'
//           onChange={handleChangePersonal}
//           type='text'
//           placeholder='Phone Number'
//           required
//         />
//         <input
//           className='input-field'
//           name='email'
//           onChange={handleChangePersonal}
//           type='text'
//           placeholder='Email ID'
//           required
//         />
//       </div>

//       {/* Technical Skills */}
//       <div id='form-personal' className='mb-2'>
//         <h4 className='section-heading'>Technical Skills</h4>
//         <hr />
//         <input
//           className='input-field'
//           name='skill'
//           onChange={handleChangePersonal}
//           type='text'
//           placeholder='Separate skills by comma'
//           required
//         />
//       </div>

//       {/* Education Section */}
//       <div id='form-personal' className='mb-2'>
//         <h4 className='section-heading'>Education</h4>
//         <hr />
//         <button onClick={handleEducationClick} className='add-button'>Add Education</button>
//         {educationArrTemplate}
//       </div>

//       {/* Projects Section */}
//       <div id='form-personal' className='mb-2'>
//         <div className='d-flex align-items-center justify-content-between'>
//           <h4 className='section-heading'>Projects</h4>
//           <input
//             type='checkbox'
//             checked={!checkProj}
//             onChange={() => dispatch(setCheckProj(!checkProj))}
//           />
//         </div>
//         <hr />
//         <button onClick={handleProjectClick} disabled={checkProj} className='add-button'>
//           Add Projects
//         </button>
//         {projArrTemplate}
//       </div>

//       {/* Work Experience Section */}
//       <div id='form-personal' className='mb-2'>
//         <div className='d-flex align-items-center justify-content-between'>
//           <h4 className='section-heading'>Work Experience</h4>
//           <input
//             type='checkbox'
//             checked={!checkWork}
//             onChange={() => dispatch(setCheckWork(!checkWork))}
//           />
//         </div>
//         <hr />
//         <button onClick={handleWorkClick} disabled={checkWork} className='add-button'>
//           Add Experience
//         </button>
//         {workArrTemplate}
//       </div>

//       {/* Awards & Achievements */}
//       <div id='form-personal' className='mb-2'>
//         <div className='d-flex align-items-center justify-content-between'>
//           <h4 className='section-heading'>Awards & Achievements</h4>
//           <input
//             type='checkbox'
//             checked={!checkAward}
//             onChange={() => dispatch(setCheckAward(!checkAward))}
//           />
//         </div>
//         <hr />
//         <textarea
//           className='input-field'
//           name='awards'
//           disabled={checkAward}
//           onChange={handleChangeAwards}
//           placeholder='Use comma to separate achievements'
//           required
//         />
//       </div>
//     </div>
//   );
// };

// export default UserDataCollect;
import React, { useContext, useEffect, useState } from 'react'
import './userDataCollect.css'
import { IoMdCloudUpload } from 'react-icons/io'
import { FormControl, Input, Heading, Textarea, Button, Switch } from '@chakra-ui/react'
import ResumeContext from '../Context/ResumeContext'
const UserDataCollect = () => {


    const { themeData, checkAward, setCheckAward, setThemeData, checkProj, checkWork, setCheckProj, setCheckWork } = useContext(ResumeContext)


    const [projectCount, setProjectCount] = useState(0)
    const [educationCount, setEducationCount] = useState(0)
    const [workCount, setWorkCount] = useState(0)
    const [projArrTemplate, setProjArrTemplate] = useState([])
    const [educationArrTemplate, setEducationArrTemplate] = useState([])
    const [workArrTemplate, setWorkArrTemplate] = useState([])
    const [projectData, setProjectData] = useState({ 'projectTitles': { pTitle1: "Project Title " }, 'projectDesc': { pDescription1: "Project Description are Shown here , with Bullet Points" } })
    const [educationData, setEducationData] = useState({ 'educationTitles': { eTitle1: "Education Title" }, 'educationDesc': { eDescription1: "Education Description are Shown here , with Bullet Points" } })
    const [workData, setWorkData] = useState({ 'workTitles': { wTitle1: "Work Title" }, 'workDesc': { wDescription1: "Work Description are Shown here , with Bullet Points" } })
    const [personalData, setPersonalData] = useState({ profileImage: 'https://www.w3schools.com/howto/img_avatar.png', name: "Your Name", summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli', profile: "Work Profile", address: "Address Line", phone: "Phone Number", email: "Email Address", skill: 'Your, Skills, are, shown, here', })
    const [awardData, setAwardData] = useState({ awards: 'Your Awards are shown here' })
    // To Add Personal Data to the State
    const handleChangePersonal = (e) => {
        const { name, value } = e.target
        setPersonalData({ ...personalData, [name]: value })
        if (e.target.name === 'profileImage') {
            setPersonalData({ ...personalData, profileImage: URL.createObjectURL(e.target.files[0]) })
        }
    }
    // To Add Project Data to the State
    const handleChangeProject = (e) => {
        const { name, value, id } = e.target
        let tempProjectData = projectData
        if (name.includes('pName')) {
            tempProjectData["projectTitles"][id] = value;
        } else {
            tempProjectData["projectDesc"][id] = value;
        }
        setProjectData({ ...projectData, tempProjectData })
        setThemeData({ ...themeData, projectData: projectData })
    }

    const handleProjectClick = (e) => {
        e.preventDefault();
        let i = projectCount
        ++i;
        const template = (
            <>
                <FormControl isRequired className='my-2'>
                    <Input disabled={checkProj} id={`pTitle${i}`} name='pName' onChange={handleChangeProject} type={'text'} placeholder='Enter Project Title' />
                </FormControl>
                <FormControl isRequired className='my-2'>
                    <Textarea disabled={checkProj} id={`pDescription${i}`} name='pDescription' onChange={handleChangeProject} placeholder='Use comma to separate Description' />
                </FormControl>
            </>
        )
        let arr = projArrTemplate
        arr.push(template)
        setProjArrTemplate(arr)
        setProjectCount(i)
    }

    // To Add Education Data to the State
    const handleChangeEducation = (e) => {
        const { name, value, id } = e.target
        let tempEducationData = educationData
        if (name.includes('eName')) {
            tempEducationData["educationTitles"][id] = value;
        } else {
            tempEducationData["educationDesc"][id] = value;
        }
        setEducationData({ ...educationData }, tempEducationData)
    }
    const handleEducationClick = (e) => {
        e.preventDefault();
        let i = educationCount
        ++i;
        const template = (
            <>
                <FormControl isRequired className='my-2'>
                    <Input id={`eTitle${i}`} name='eName' onChange={handleChangeEducation} type={'text'} placeholder='Enter Title' />
                </FormControl>
                <FormControl isRequired className='my-2'>
                    <Textarea id={`eDescription${i}`} name='eDescription' onChange={handleChangeEducation} placeholder='Use comma to separate Description' />
                </FormControl>
            </>
        )
        let arr = educationArrTemplate
        arr.push(template)
        setEducationArrTemplate(arr)
        setEducationCount(i)
    }

    // To Add Work Data to the State
    const handleChangeWork = (e) => {
        const { name, value, id } = e.target
        let tempWorkData = workData
        if (name.includes('wName')) {
            tempWorkData["workTitles"][id] = value;
        } else {
            tempWorkData["workDesc"][id] = value;
        }
        setWorkData({ ...workData }, tempWorkData)
    }
    const handleWorkClick = (e) => {
        e.preventDefault();
        let i = workCount
        ++i;
        const template = (
            <>
                <FormControl isRequired className='my-2'>
                    <Input id={`wTitle${i}`} name='wName' onChange={handleChangeWork} type={'text'} placeholder='Enter Job Title' />
                </FormControl>
                <FormControl isRequired className='my-2'>
                    <Textarea id={`wDescription${i}`} name='wDescription' onChange={handleChangeWork} placeholder='Use comma to separate Description' />
                </FormControl>
            </>
        )
        let arr = workArrTemplate
        arr.push(template)
        setWorkArrTemplate(arr)
        setWorkCount(i)
    }

    // To Add Award & Achievement Data to the State
    const handleChangeAwards = (e) => {
        const { name, value } = e.target
        setAwardData({ ...awardData, [name]: value })
    }
    useEffect(() => {
        setThemeData({ ...themeData, personalData, projectData, educationData, workData, awardData })
       
    }, [themeData, personalData, setThemeData, projectData, educationData, workData, awardData])

    return (
        <>
            <div id="form-collect">
                {/* Personal Details Area  */}
                <div id="form-personal" className='mb-2'>
                    <Heading as='h4' size='md' className='mb-2'>
                        Personal Details
                    </Heading>
                    <hr />

                    <FormControl isRequired className='my-2'>
                        <div className='file'>
                            <label htmlFor='input-file'>
                                <i className="material-icons"><IoMdCloudUpload size={30} />
                                </i>Select a file
                            </label>
                            <input accept="image/*" name='profileImage' onChange={handleChangePersonal} id='input-file' type='file' />
                            <img className="blah" src={personalData.profileImage} alt="your profile preview" />
                        </div>
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='name' onChange={handleChangePersonal} type={'text'} placeholder='Your Name' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='summary' onChange={handleChangePersonal} type={'text'} placeholder='Your Summary' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='profile' onChange={handleChangePersonal} type={'text'} placeholder='Work Profile' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='address' onChange={handleChangePersonal} type={'text'} placeholder='Address' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='phone' onChange={handleChangePersonal} type={'tel'} placeholder='Phone number' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='email' onChange={handleChangePersonal} type={'email'} placeholder='Email id' />
                    </FormControl>
                </div>

                {/* Skills Area  */}
                <div id="form-personal" className='mb-2'>
                    <Heading as='h4' size='md' className='my-2'>
                        Technical Skills
                    </Heading>
                    <hr />

                    <FormControl isRequired className='my-2'>
                        <Input name='skill' onChange={handleChangePersonal} type={'text'} placeholder='Separate skills by comma' />
                    </FormControl>
                </div>

                {/* Education Area  */}
                <div id="form-personal" className='mb-2'>
                    <Heading as='h4' size='md' className='my-2'>
                        Education
                    </Heading>
                    <hr />
                    <Button onClick={handleEducationClick} className='my-3 w-100' colorScheme='teal' variant='solid'>Add Education</Button>
                    {
                        (educationCount > 0) ? educationArrTemplate.map((element, index) => <div key={index}>{element}</div>) : null
                    }
                </div>

                {/* Projects Area  */}
                <div id="form-personal" className='mb-2'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Heading as='h4' size='md' className='my-2'>
                            Projects
                        </Heading>
                        <Switch defaultChecked={true} onChange={() => (setCheckProj(!checkProj))} colorScheme='teal' />
                    </div>
                    <hr />
                    <Button disabled={checkProj} onClick={handleProjectClick} className='my-3 w-100' colorScheme='teal' variant='solid'>Add Projects</Button>
                    {
                        (projectCount > 0) ? projArrTemplate.map((element, index) => <div key={index}>{element}</div>) : null
                    }
                </div>

                {/* Work Experience Area  */}
                <div id="form-personal" className='mb-2'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Heading as='h4' size='md' className='my-2'>
                            Work Experience
                        </Heading>
                        <Switch defaultChecked={true} onChange={() => (setCheckWork(!checkWork))} colorScheme='teal' />
                    </div>
                    <hr />
                    <Button disabled={checkWork} onClick={handleWorkClick} className='my-3 w-100' colorScheme='teal' variant='solid'>Add Experience</Button>
                    {
                        (workCount > 0) ? workArrTemplate.map((element, index) => <div key={index}>{element}</div>) : null
                    }
                </div>

                {/* Awards & Achievement  */}
                <div id="form-personal" className='mb-2'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Heading as='h4' size='md' className='my-2'>
                            Awards & Achievement
                        </Heading>
                        <Switch defaultChecked={true} onChange={() => (setCheckAward(!checkAward))} colorScheme='teal' />
                    </div>
                    <hr />
                    <FormControl isRequired className='my-2'>
                        <Textarea name='awards' disabled={checkAward} onChange={handleChangeAwards} placeholder='Use comma to separate Achievement' />
                    </FormControl>
                </div>

            </div>
        </>
    )
}

export default UserDataCollect
