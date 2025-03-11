import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PDF from "../../components/pdfSections/PDF";
import Navbar from "../../components/Navbar";
import { renderToString } from "react-dom/server";
import {
  soldierAttributes,
  filterNames,
  officerAttributes,
  sergeantAttributes,
} from "../../utils/MostUsed";
import { MDBCol, MDBRow, MDBCardImage } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import "../../style/ProfilePDF.css";
import { converTextToArabic } from "../../utils/tools";
import { useUser } from "../../context/UserContext";
import SportSection from "../../components/pdfSections/SportSection";
import EducationSection from "../../components/pdfSections/EducationSection";
import ShootingSection from "../../components/pdfSections/ShootingSection";
import DisciplineSection from "../../components/pdfSections/DisciplineSection";
import EltemasSection from "../../components/pdfSections/EltemasSection";
import GiftSection from "../../components/pdfSections/GiftSection";
import DateSection from "../../components/pdfSections/DateSection";
import MedicalSection from "../../components/pdfSections/MedicalSection";
import LeaderOpinionSection from "../../components/pdfSections/LeaderOpinionSection";
import CourseSection from "../../components/pdfSections/CourseSection";
import PreviousPositionSection from "../../components/pdfSections/PreviousPositionSection";
import PreviousUnitSection from "../../components/pdfSections/PreviousUnitSection";
import TestResultsSection from "../../components/pdfSections/TestResultsSection";
export default function ProfilePDF() {
  const { user } = useUser();
  const elementRef = useRef(null);

  const { ip, handleLogout } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [profileData, setProfileDate] = useState();

  const fetchData = async () => {
    const response = await fetch(`${ip}/userData/userinfo/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (response.status == 401) handleLogout();
    const data = await response.json();
    setTimeout(() => {
      setProfileDate(data);
    }, 500);
  };

  const sections = {
    sportSection: !profileData
      ? ""
      : renderToString(
          <SportSection sportData={profileData.fitness_records} />
        ),
    educationSection: !profileData
      ? ""
      : renderToString(
          <EducationSection educationData={profileData.education_records} />
        ),
    shootingSection: !profileData
      ? ""
      : renderToString(
          <ShootingSection shootingData={profileData.shooting_records} />
        ),

    disciplineSection: !profileData
      ? ""
      : renderToString(
          <DisciplineSection disciplineData={profileData.discipline_records} />
        ),
    eltemasSection: !profileData
      ? ""
      : renderToString(
          <EltemasSection eltemasData={profileData.eltemas_records} />
        ),
    giftSection: !profileData
      ? ""
      : renderToString(<GiftSection giftData={profileData.gift_records} />),
    courseSection: !profileData
      ? ""
      : renderToString(<CourseSection courseData={profileData.courses} />),
    previousPositionSection: !profileData
      ? ""
      : renderToString(
          <PreviousPositionSection
            previousPositionData={profileData.previous_positions}
          />
        ),
    previousUnitSection: !profileData
      ? ""
      : renderToString(
          <PreviousUnitSection previousUnitData={profileData.previous_units} />
        ),
    testResultSection: !profileData
      ? ""
      : renderToString(
          <TestResultsSection testResultsData={profileData.user_results} />
        ),

    leaderOpinionSection: !profileData
      ? ""
      : renderToString(
          <LeaderOpinionSection
            leaderOpinionData={profileData.leader_opinion_records}
          />
        ),
    medicalSection: !profileData
      ? ""
      : renderToString(
          <MedicalSection medicalData={profileData.medical_situations} />
        ),
    dateSection: renderToString(<DateSection user={user} />),
  };

  const handleGenerate = () => {
    const container = document.getElementById("content-id");
    if (container) {
      let page = document.createElement("div");
      page.innerHTML = "";
      page.className = "pdf-page mt-2";
      container.appendChild(page);
      let height = 0;
      Object.keys(sections).forEach((section) => {
        if (
          profileData["is_officer"] &&
          (section === "disciplineSection" ||
            section === "eltemasSection" ||
            section === "leaderOpinionSection" ||
            section === "giftSection")
        )
          return;
        if (
          profileData["is_soldier"] &&
          (section === "courseSection" ||
            section === "previousPositionSection" ||
            section === "previousUnitSection" ||
            section === "testResultSection")
        )
          return;
        let element = document.createElement("div");
        element.innerHTML = sections[section];
        page.appendChild(element);
        height += element.offsetHeight;
        if (height > 1600) {
          page.removeChild(element);
          page = document.createElement("div");
          page.innerHTML = "";
          page.className = "pdf-page mt-3";
          height = 0;
          container.appendChild(page);
          element = document.createElement("div");
          element.innerHTML = sections[section];
          page.appendChild(element);
          height += element.offsetHeight;
        }
      });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/login");
    fetchData();
  }, []);

  useEffect(() => {
    handleGenerate();
  }, [sections.leaderOpinionSection]);
  if (!profileData)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  return (
    <>
      <div
        className="d-flex justify-content-around"
        style={{ fontFamily: "none" }}
      >
        <div id="content-id" ref={elementRef}>
          <div>
            <div id="info-section" className="pdf-page">
              <MDBRow className="d-flex justify-content-between image-container">
                <MDBCol className="text-start">
                  <MDBCardImage
                    className="user-image"
                    width={140}
                    src={profileData.image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/man.jpg";
                    }}
                    alt="phone"
                    fluid
                  />
                </MDBCol>
                <MDBCol>
                  <h1 className="text-center fw-bolder mt-5 text-black">
                    كــارت مـتـابـعــة
                  </h1>
                </MDBCol>
                <MDBCol className="text-end">
                  <MDBCardImage
                    width={160}
                    src={`${ip}/media/images/1958.jpg`}
                    alt="phone"
                    fluid
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="p-3">
                <div className="text-end m-4">
                  <h1 className="fw-bolder me-4 fs-2">
                    <span className="border-bottom border-3 border-dark">
                      :البيانات الشخصية
                    </span>
                  </h1>
                </div>

                <div className="row me-4">
                  {profileData["is_officer"]
                    ? officerAttributes.map(([name, label], index) => (
                        <div key={index} className="col-6 text-end" dir="rtl">
                          <p>
                            <span className="border-bottom border-3 border-dark fs-4 fw-bold">
                              {label}
                            </span>
                            <span className="fs-3">
                              :{converTextToArabic(profileData[name], label)}
                            </span>
                          </p>
                        </div>
                      ))
                    : profileData["is_soldier"]
                    ? soldierAttributes.map(([name, label], index) => (
                        <div key={index} className="col-6 text-end" dir="rtl">
                          <p>
                            <span className="border-bottom border-3 border-dark fs-4 fw-bold">
                              {label}
                            </span>
                            <span className="fs-3">
                              :{converTextToArabic(profileData[name], label)}
                            </span>
                          </p>
                        </div>
                      ))
                    : sergeantAttributes.map(([name, label], index) => (
                        <div key={index} className="col-6 text-end" dir="rtl">
                          <p>
                            <span className="border-bottom border-3 border-dark fs-4 fw-bold">
                              {label}
                            </span>
                            <span className="fs-3">
                              : {converTextToArabic(profileData[name], label)}
                            </span>
                          </p>
                        </div>
                      ))}
                </div>
              </MDBRow>
            </div>
          </div>
        </div>
      </div>
      <PDF name={profileData.name} />
    </>
  );
}
