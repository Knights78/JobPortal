import React from "react";
import "./theme3.css";
import { useSelector } from "react-redux";

const Theme3 = ({ componentRef }) => {
  const {
    themeData,
    checkProj,
    checkWork,
    checkAward,
  } = useSelector((state) => state.resume);

  const { name, address, phone, email, profile, summary, skill } = themeData.personalData;
  const { projectTitles, projectDesc } = themeData.projectData;
  const { educationTitles, educationDesc } = themeData.educationData;
  const { workTitles, workDesc } = themeData.workData;
  const { awards } = themeData.awardData;

  return (
    <div id="section-to-print" ref={componentRef}>
      <div id="theme3" className="theme3-container">
        <header
          id="info"
          className="text-center d-flex justify-content-between align-items-center"
        >
          <div className="info-text text-start">
            <h2 className="mb-2 name-heading">{name}</h2>
            <p className="mt-1 mb-2 profile-text">{profile}</p>
            <div className="contact-info mt-3">
              <p className="address">{address}</p>
              <p className="phone">{phone}</p>
              <p className="email">{email}</p>
            </div>
          </div>
        </header>

        <div className="w-100 border-divider m-auto"></div>

        <section className="bottom-part d-flex mt-3">
          <section className="sections">
            <div className="section-item">
              <h3 className="section-title">Summary</h3>
              <div className="section-content">
                <p className="summary-text">{summary}</p>
              </div>
            </div>

            {!checkWork && (
              <>
                <div className="w-100 border-divider m-auto"></div>
                <div className="section-item">
                  <h3 className="section-title">Experience</h3>
                  <div className="section-content">
                    {Object.entries(workTitles).map((element, index) => (
                      <div key={index} className="mt-1">
                        <h4 className="sub-heading">{element[1]}</h4>
                        {workDesc[element[0]] && workDesc[element[0]].split(",").map((item, i) => (
                          <p key={i}>{item}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="w-100 border-divider m-auto"></div>

            <div className="section-item">
              <h3 className="section-title">Education</h3>
              <div className="section-content">
                {Object.entries(educationTitles).map((element, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="sub-heading">{element[1]}</h4>
                    {educationDesc[element[0]] && educationDesc[element[0]].split(",").map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {!checkProj && (
              <>
                <div className="w-100 border-divider m-auto"></div>
                <div className="section-item">
                  <h3 className="section-title">Projects</h3>
                  <div className="section-content">
                    {Object.entries(projectTitles).map((element, index) => (
                      <div key={index} className="mt-1">
                        <h4 className="sub-heading">{element[1]}</h4>
                        <ul className="sub-details">
                          {projectDesc[element[0]] && projectDesc[element[0]].split(",").map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="w-100 border-divider m-auto"></div>

            <div className="section-item">
              <h3 className="section-title">Skills</h3>
              <div className="section-content">
                <div className="skill-grid">
                  {skill.split(",").map((item, index) => (
                    <div key={index} className="skill-item">
                      <div className="bullet-point"></div>
                      <p className="skill-text">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!checkAward && (
              <>
                <div className="w-100 border-divider m-auto"></div>
                <div className="section-item">
                  <h3 className="section-title">Achievements</h3>
                  <div className="section-content">
                    <div className="skill-grid">
                      {awards.split(",").map((item, index) => (
                        <div key={index} className="skill-item">
                          <div className="bullet-point"></div>
                          <p className="skill-text">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Theme3;
