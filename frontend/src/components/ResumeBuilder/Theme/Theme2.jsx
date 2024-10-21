import React from 'react';
import './theme2.css';
import { useSelector } from 'react-redux';

const Theme2 = ({ componentRef }) => {
  const {
    themeData,
    checkProj,
    checkWork,
    checkAward,
  } = useSelector((state) => state.resume);

  const { name, address, phone, email, profile, profileImage, summary, skill } = themeData.personalData;
  const { projectTitles, projectDesc } = themeData.projectData;
  const { educationTitles, educationDesc } = themeData.educationData;
  const { workTitles, workDesc } = themeData.workData;
  const { awards } = themeData.awardData;

  return (
    <div id="section-to-print" ref={componentRef}>
      <div id="theme2">
        <header id="info" className="text-center m-2 d-flex justify-content-between align-items-center">
          <div className="info-text text-start">
            <h2 className="mb-2">{name}</h2>
            <p className="mt-1 mb-2 profile-text">{profile}</p>
            <p className="mt-1 mb-2 summary-text">{summary}</p>
          </div>
          <div className="mx-2 mb-2">
            <img id="resume-avatar" src={profileImage} alt="Profile" />
          </div>
        </header>

        <div className="w-100 border border-dark m-auto"></div>

        <section className="bottom-part d-flex mt-3">
          <section className="partition-1">
            <div>
              <h3 className="section-heading">Contact</h3>
              <div className="mt-3">
                <h4 className="sub-heading">Phone</h4>
                <p className="sub-text">{phone}</p>
                <h4 className="sub-heading">Email</h4>
                <p className="sub-text">{email}</p>
                <h4 className="sub-heading">Address</h4>
                <p className="sub-text">{address}</p>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="section-heading">Skills</h3>
              <div className="mt-3">
                {skill.split(',').map((item, index) => (
                  <span key={index} className="badge skill-badge">{item}</span>
                ))}
              </div>
            </div>
          </section>

          <div style={{ height: '536px' }} className="border border-dark mx-4"></div>

          <section className="partition-2">
            <div id="education-area">
              <h3 className="section-heading">Education</h3>
              {Object.entries(educationTitles).map((element, index) => (
                <div key={index} className="mt-3">
                  <h4 className="sub-heading">{element[1]}</h4>
                  <ul className="sub-details">
                    {educationDesc[element[0]] && educationDesc[element[0]].split(',').map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {!checkProj && (
              <div id="project-area">
                <h3 className="section-heading">Projects</h3>
                {Object.entries(projectTitles).map((element, index) => (
                  <div key={index} className="mt-1">
                    <h4 className="sub-heading">{element[1]}</h4>
                    <ul className="sub-details">
                      {projectDesc[element[0]] && projectDesc[element[0]].split(',').map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {!checkWork && (
              <div id="experience-area">
                <h3 className="section-heading">Work Experience</h3>
                {Object.entries(workTitles).map((element, index) => (
                  <div key={index} className="mt-1">
                    <h4 className="sub-heading">{element[1]}</h4>
                    <ul className="sub-details">
                      {workDesc[element[0]] && workDesc[element[0]].split(',').map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {!checkAward && (
              <div id="award-area">
                <h3 className="section-heading">Awards & Achievements</h3>
                <ul className="mt-1">
                  {awards.split(',').map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Theme2;
