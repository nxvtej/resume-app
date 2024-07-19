/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Header from '@/components/custom/Header'
import { Button } from "@/components/ui/Button";
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';


function ViewResume () {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId} =useParams();
  useEffect(()=> {

    GetResumeInfo()
  },[])
  const GetResumeInfo = () =>{
    GlobalApi.GetResumeById(resumeId).then(res => {
      console.log(res.data.data)
      setResumeInfo(res.data.data)
    })
  } 


  const HandleDownload = () => {
    window.print();
  }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,  setResumeInfo}}>
      <div id="no-print">

   
      <Header />
      View Resume
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
				<h2 className="text-2xl font-medium text-center">Congrats! here is your resume</h2>
        <p className='text-center text-gray-500'>your resume is ready to downlaod and share with url</p>
				<div className='flex justify-between px-48 my-10'>
					<Button onClick={HandleDownload}>Download</Button>



          <RWebShare
        data={{
          text: "Hello everyone",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName
        }}
        onClick={() => console.log("shared successfully!")}
      >


					<Button>Share</Button>
      </RWebShare>
				</div>
        </div>
        
			</div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>

      <div id="printArea" >
          <ResumePreview />
      </div>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume