import { MDBBtn } from "mdb-react-ui-kit";
import generatePDF from "react-to-pdf";
import { More, Download } from "@mui/icons-material";
const PDF = ({ name }) => {
  const getTargetElement = () => document.getElementById("content-id");
  const handlePDFdownload = async () => {
    generatePDF(getTargetElement, {
      filename: `${name}.pdf`,
      // You don't need to set Resolution.MEDIUM here; just use the value directly
      page: {
        // margin is in MM, default is Margin.NONE = 0
        margin: 7, // Adjust margin if needed
        // default is 'A4'
        format: "A4",
        // default is 'portrait'
        orientation: "portrait",
      },
      overrides: {
        // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
        pdf: {
          compress: true,
        },
        // see https://html2canvas.hertzen.com/configuration for more options
        canvas: {
          useCORS: true,
        },
      },
    });
  };
  return (
    <div className="text-center">
      <MDBBtn className="m-4" onClick={handlePDFdownload}>
        <Download />
      </MDBBtn>
    </div>
  );
};

export default PDF;
