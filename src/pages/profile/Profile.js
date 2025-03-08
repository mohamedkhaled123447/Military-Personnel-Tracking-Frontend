import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBAccordion,
  MDBAccordionItem,
  MDBCardImage,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import "../../style/Profile.css";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileSport from "../../components/profile/ProfileSport";
import ProfileEducation from "../../components/profile/ProfileEducation";
import ProfileMedical from "../../components/profile/ProfileMedical";
import ProfileDiscipline from "../../components/profile/ProfileDiscipline";
import ProfileShooting from "../../components/profile/ProfileShooting";
import ProfileEltemas from "../../components/profile/ProfileEltemas";
import ProfileLeaderOpinion from "../../components/profile/ProfileLeaderOpinion";
import ProfileGift from "../../components/profile/ProfileGift";
import ProfileCourse from "../../components/profile/ProfileCourse";
import ProfilePreviousPosition from "../../components/profile/ProfilePreviousPosition";
import ProfilePreviousUnit from "../../components/profile/ProfilePreviousUnit";
import ProfileTest from "../../components/profile/ProfileTest";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import Navbar from "../../components/Navbar";
import { InfoInputValidator } from "../../utils/Validators";
import { useUser } from "../../context/UserContext";
export default function Profile() {
  const { ip, user, handleLogout } = useUser();
  const { showAlertSnackbar } = useAlertSnackbar();
  const navigate = useNavigate();

  const [profileData, setProfileDate] = useState();
  const { id } = useParams();
  const fetchData = async () => {
    const response = await fetch(`${ip}/userData/userinfo/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (response.status == 401) handleLogout();
    const data = await response.json();
    setProfileDate(data);
  };

  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/login");
    fetchData();
  }, []);
  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setProfileDate((prevPfofileData) => ({
      ...prevPfofileData,
      [name]: value,
    }));
  };
  const removeAttribute = (obj, key) => {
    const { [key]: _, ...newObj } = obj; 
    return newObj;
  };
  const handleUpdateProfileDate = async () => {
    const Errors = InfoInputValidator(profileData);
    if (Errors.length > 0) {
      showAlertSnackbar(Errors[0], "error");
      return;
    }
    const response = await fetch(
      `${ip}/userData/userinfo/${profileData.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(removeAttribute(profileData, "image")),
      }
    );
    if (!response.ok) {
      // Handle HTTP errors
      showAlertSnackbar("حدث خطا ما", "error");
      // const errors = await response.json();
    } else {
      // Handle successful response
      showAlertSnackbar("تم التعديل بنجاح", "success");
    }
  };
  const [image, setImage] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    if (!user.is_superuser) {
      showAlertSnackbar("الحساب ليس له صلاحية التعديل", "error");
      return;
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        handleUdateProfileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUdateProfileImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(
      `${ip}/userData/userinfo/${profileData.id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      // Handle HTTP errors
      showAlertSnackbar("حدث خطا ما", "error");
      setLoading(false);
    } else {
      // Handle successful response
      showAlertSnackbar("تم التعديل بنجاح", "success");
      setLoading(false);
    }
  };
  return (
    <section>
      {!profileData ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="spinner-grow" role="status"></div>
        </div>
      ) : (
        <MDBContainer className="py-5">
          <MDBRow className="d-flex justify-content-between image-container">
            <MDBCol className="text-start">
              {!loading && (
                <MDBCardImage
                  className="profile-image"
                  width={140}
                  src={!image ? profileData.image : image}
                  onClick={handleImageClick}
                  alt="phone"
                  fluid
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {loading && (
                <MDBSpinner
                  style={{ marginLeft: "60px", marginTop: "60px" }}
                  size="sm"
                  role="status"
                  tag="span"
                />
              )}
            </MDBCol>

            <MDBCol>
              <h1 className="text-center fw-bold">كارت متابعة</h1>
            </MDBCol>
            <MDBCol className="text-end">
              <MDBCardImage
                width={200}
                src={`${ip}/media/images/EW.png`}
                alt="phone"
                fluid
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBAccordion initialActive={1}>
              <MDBAccordionItem collapseId={1} headerTitle="البيانات الشخصية">
                <ProfileInfo
                  profileData={profileData}
                  handleProfileDataChange={handleProfileDataChange}
                  handleUpdateProfileDate={handleUpdateProfileDate}
                />
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={2} headerTitle="الموقف الطبي">
                <ProfileMedical
                  id={id}
                  setProfileDate={setProfileDate}
                  medicalData={profileData.medical_situations}
                />
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={3} headerTitle="مستوي اللياقة">
                <ProfileSport
                  id={id}
                  setProfileDate={setProfileDate}
                  sportData={profileData.fitness_records}
                  birthOfDate={profileData.birthOfDate}
                />
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={4} headerTitle="مستوي الرماية">
                <ProfileShooting
                  id={id}
                  setProfileDate={setProfileDate}
                  shootingData={profileData.shooting_records}
                />
              </MDBAccordionItem>

              {(profileData.is_officer ||
                (!profileData.is_officer && !profileData.is_soldier)) && (
                <>
                  <MDBAccordionItem
                    collapseId={5}
                    headerTitle="الفرق الحاصل عليها"
                  >
                    <ProfileCourse
                      id={id}
                      setProfileDate={setProfileDate}
                      CourseData={profileData.courses}
                    />
                  </MDBAccordionItem>
                  <MDBAccordionItem
                    collapseId={6}
                    headerTitle="الوظائف السابقة"
                  >
                    <ProfilePreviousPosition
                      id={id}
                      setProfileDate={setProfileDate}
                      PositionData={profileData.previous_positions}
                    />
                  </MDBAccordionItem>
                  <MDBAccordionItem
                    collapseId={7}
                    headerTitle="الوحدات السابقة"
                  >
                    <ProfilePreviousUnit
                      id={id}
                      setProfileDate={setProfileDate}
                      UnitData={profileData.previous_units}
                    />
                  </MDBAccordionItem>
                  <MDBAccordionItem
                    collapseId={8}
                    headerTitle="نتائج الاختبارات"
                  >
                    <ProfileTest TestResults={profileData.user_results} />
                  </MDBAccordionItem>
                </>
              )}
              {!profileData.is_officer && (
                <>
                  <MDBAccordionItem
                    collapseId={9}
                    headerTitle="الموقف التعليمي"
                  >
                    <ProfileEducation
                      id={id}
                      setProfileDate={setProfileDate}
                      educationData={profileData.education_records}
                    />
                  </MDBAccordionItem>
                  <MDBAccordionItem
                    collapseId={10}
                    headerTitle="الموقف الانضباطي"
                  >
                    <ProfileDiscipline
                      id={id}
                      setProfileDate={setProfileDate}
                      disciplineData={profileData.discipline_records}
                    />
                  </MDBAccordionItem>
                  <MDBAccordionItem collapseId={11} headerTitle="الالتماسات">
                    <ProfileEltemas
                      id={id}
                      setProfileDate={setProfileDate}
                      eltemasData={profileData.eltemas_records}
                    />
                  </MDBAccordionItem>
                  <MDBAccordionItem
                    collapseId={12}
                    headerTitle="المنح/المكافئات"
                  >
                    <ProfileGift
                      id={id}
                      setProfileDate={setProfileDate}
                      giftData={profileData.gift_records}
                    />
                  </MDBAccordionItem>
                  <MDBAccordionItem
                    collapseId={13}
                    headerTitle="راي القائد المباشر"
                  >
                    <ProfileLeaderOpinion
                      id={id}
                      setProfileDate={setProfileDate}
                      LeaderOpinionData={profileData.leader_opinion_records}
                    />
                  </MDBAccordionItem>
                </>
              )}
            </MDBAccordion>
          </MDBRow>
          <MDBBtn
            className="mt-4"
            onClick={() => navigate(`/records/user/pdf/${id}`)}
          >
            {/* <MDBIcon fas icon="print" size="lg" /> */}
            طباعة
          </MDBBtn>
        </MDBContainer>
      )}
    </section>
  );
}
