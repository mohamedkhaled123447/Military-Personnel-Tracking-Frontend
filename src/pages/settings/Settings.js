import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Navbar from "../../components/Navbar";
import { useSettings } from "../../context/SettingsContext";
import { useUser } from "../../context/UserContext";

const Settings = () => {
  const { user, ip } = useUser();
  const {
    settings,
    currentSetting,
    handleChange,
    handleSave,
    setCurrentSetting,
    modalOpen,
    toggleModal,
  } = useSettings();

  if (user.type !== 1)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <h1>هذا الحساب ليس له الصلاحية</h1>
      </div>
    );
  if (!settings)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  const handleEdit = (setting) => {
    setCurrentSetting(setting);
    toggleModal();
  };

  return (
    <MDBContainer className="text-end" dir="rtl">
      <h2 className="text-center my-4">الإعدادات</h2>
      <MDBTable hover responsive>
        <MDBTableHead>
          <tr>
            <th>م</th>
            <th>الإعداد</th>
            <th>القيمة</th>
            <th>الإجراءات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {settings.map((setting, index) => (
            <tr key={setting.id}>
              <td>{index + 1}</td>
              <td>{setting.key}</td>
              <td>
                {setting.value === "لايكن" ? (
                  <img height="50px" src={setting.image} />
                ) : (
                  setting.value
                )}
              </td>
              <td>
                <MDBBtn
                  color="warning"
                  size="sm"
                  className="rounded-pill ms-2"
                  onClick={() => handleEdit(setting)}
                >
                  تعديل
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Modal for editing/adding settings */}
      <MDBModal open={modalOpen} tabIndex="-1">
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleModal}
              ></MDBBtn>
              <MDBModalTitle>
                {currentSetting.id ? "تعديل الإعداد" : "إضافة إعداد"}
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className="mb-3">
                  <label htmlFor="key" className="form-label">
                    الإعداد
                  </label>
                  <input
                    type="text"
                    id="key"
                    name="key"
                    className="form-control"
                    value={currentSetting.key}
                    onChange={handleChange}
                    disabled={!!currentSetting.id}
                  />
                </div>
                {currentSetting.value !== "لايكن" && (
                  <div className="mb-3">
                    <label htmlFor="value" className="form-label">
                      القيمة
                    </label>
                    <input
                      type="text"
                      id="value"
                      name="value"
                      className="form-control"
                      value={currentSetting.value}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {currentSetting.value === "لايكن" && (
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      القيمة
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control"
                      onChange={(e) => {
                        setCurrentSetting({
                          ...currentSetting,
                          image: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                )}
                {currentSetting.key === "الوحدات الفرعية" && (
                  <>
                    <span>* </span>
                    <span>
                      الوحدة الفرعية1,الوحدة الفرعية2 ,الوحدة الفرعية3
                    </span>
                    <span>,....,.....</span>
                  </>
                )}
                {currentSetting.key === "التسكين" && (
                  <>
                    <span>* </span>
                    <span>ك1,ك2,ك3</span>
                    <span>,....,.....</span>
                  </>
                )}
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                className="rounded-pill"
                onClick={toggleModal}
              >
                إلغاء
              </MDBBtn>

              <MDBBtn
                color="primary"
                className="rounded-pill"
                onClick={handleSave}
              >
                حفظ
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

export default Settings;
