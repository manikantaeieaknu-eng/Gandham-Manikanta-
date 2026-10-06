import { jsPDF } from "jspdf";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function generateAndDownloadResumePDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - 16) {
      doc.addPage();
      cursorY = 16;
    }
  };

  const drawSectionHeading = (title: string) => {
    checkPageBreak(12);
    cursorY += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.text(title, margin, cursorY);

    // Red/Crimson accent bar matching the attached resume design!
    doc.setDrawColor(185, 28, 28);
    doc.setLineWidth(1.2);
    doc.line(margin + doc.getTextWidth(title) + 4, cursorY - 1, pageWidth - margin, cursorY - 1);
    cursorY += 5;
  };

  // 1. Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(17, 17, 17);
  doc.text(PORTFOLIO_DATA.personal.fullName, margin, cursorY);
  cursorY += 5.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(PORTFOLIO_DATA.personal.title, margin, cursorY);
  cursorY += 4.5;

  doc.text(`Gender: ${PORTFOLIO_DATA.personal.gender}`, margin, cursorY);
  cursorY += 4.5;
  doc.text(`Date of Birth: ${PORTFOLIO_DATA.personal.dateOfBirth}`, margin, cursorY);
  cursorY += 4.5;
  doc.text(`E-mail: ${PORTFOLIO_DATA.personal.email}`, margin, cursorY);
  cursorY += 4.5;
  doc.text(`LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}`, margin, cursorY);
  cursorY += 4.5;
  doc.text(`Location: ${PORTFOLIO_DATA.personal.place}, Andhra Pradesh, India`, margin, cursorY);
  cursorY += 4;

  // Thin separator under header
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 3;

  // 2. Educational Qualification
  drawSectionHeading("Educational Qualification");

  // Table header
  checkPageBreak(30);
  const colX = [margin, margin + 18, margin + 65, margin + 145, pageWidth - margin];
  const rowH = 7;

  doc.setFillColor(245, 245, 245);
  doc.rect(margin, cursorY, contentWidth, rowH, "F");
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(0.3);
  doc.rect(margin, cursorY, contentWidth, rowH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text("Year", colX[0] + 2, cursorY + 4.8);
  doc.text("Degree / Examination", colX[1] + 2, cursorY + 4.8);
  doc.text("Institution / Board", colX[2] + 2, cursorY + 4.8);
  doc.text("CGPA / Marks", colX[3] + 2, cursorY + 4.8);
  cursorY += rowH;

  PORTFOLIO_DATA.education.forEach((edu) => {
    checkPageBreak(12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(40, 40, 40);

    const instLines = doc.splitTextToSize(edu.institution, colX[3] - colX[2] - 4);
    const itemHeight = Math.max(rowH, instLines.length * 4.2 + 2);

    doc.rect(margin, cursorY, contentWidth, itemHeight);
    // Draw vertical cell dividers
    doc.line(colX[1], cursorY, colX[1], cursorY + itemHeight);
    doc.line(colX[2], cursorY, colX[2], cursorY + itemHeight);
    doc.line(colX[3], cursorY, colX[3], cursorY + itemHeight);

    doc.text(edu.year, colX[0] + 2, cursorY + 4.5);
    doc.text(edu.degree, colX[1] + 2, cursorY + 4.5);
    doc.text(instLines, colX[2] + 2, cursorY + 4.2);
    doc.setFont("helvetica", "bold");
    doc.text(edu.score, colX[3] + 2, cursorY + 4.5);
    doc.setFont("helvetica", "normal");

    cursorY += itemHeight;
  });
  cursorY += 3;

  // 3. Internship Experience
  drawSectionHeading("Internship Experience");
  PORTFOLIO_DATA.internships.forEach((intern) => {
    checkPageBreak(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    const bulletText = `•  ${intern.title}:`;
    doc.text(bulletText, margin + 2, cursorY);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    doc.text(intern.period, pageWidth - margin, cursorY, { align: "right" });
    cursorY += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(50, 50, 50);
    doc.text(`   ${intern.organization}`, margin + 4, cursorY);
    cursorY += 4;
  });

  // 4. Projects
  drawSectionHeading("Projects");
  PORTFOLIO_DATA.projects.forEach((proj) => {
    checkPageBreak(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    const bulletText = `•  ${proj.title}:`;
    doc.text(bulletText, margin + 2, cursorY);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    doc.text(proj.period, pageWidth - margin, cursorY, { align: "right" });
    cursorY += 4.2;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const summaryLines = doc.splitTextToSize(`   ${proj.summary}`, contentWidth - 6);
    doc.text(summaryLines, margin + 2, cursorY);
    cursorY += summaryLines.length * 3.8 + 1;
  });

  // 5. Technical Skills and Certifications
  drawSectionHeading("Technical Skills and Certifications");
  const skillsList = [
    { label: "Programming Languages", val: "Basics of C, Arduino IDE, Basics of Python" },
    { label: "Engineering Software", val: "LT Spice XVII, MATLAB, LabView" },
    { label: "Other Software", val: "Microsoft Office (Word, PowerPoint, Excel)" },
    { label: "Certifications", val: "Basics Python – Simple Learn; Getting Started with Arduino uno (Line sensor & Ultrasonic) – Infosys" },
  ];

  skillsList.forEach((s) => {
    checkPageBreak(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text(`•  ${s.label}`, margin + 2, cursorY);

    const colonX = margin + 55;
    doc.text(":", colonX, cursorY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    const valLines = doc.splitTextToSize(s.val, pageWidth - margin - colonX - 4);
    doc.text(valLines, colonX + 3, cursorY);
    cursorY += Math.max(4.5, valLines.length * 4.2);
  });

  // 6. Area Of Interest
  drawSectionHeading("Area Of Interest");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text("•  Process Control and Instrumentation", margin + 2, cursorY);
  cursorY += 4.5;
  doc.text("•  Bio-Medical", margin + 2, cursorY);
  cursorY += 4.5;

  // 7. Academic Achievements and Extra-Curricular Activities
  drawSectionHeading("Academic Achievements and Extra-Curricular Activities");
  PORTFOLIO_DATA.achievements.forEach((ach) => {
    checkPageBreak(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(`•  ${ach.title}`, contentWidth - 4);
    doc.text(lines, margin + 2, cursorY);
    cursorY += lines.length * 4.2;
  });

  // 8. Declaration
  drawSectionHeading("Declaration");
  checkPageBreak(25);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  const declLines = doc.splitTextToSize(PORTFOLIO_DATA.personal.declaration, contentWidth);
  doc.text(declLines, margin, cursorY);
  cursorY += declLines.length * 4.2 + 8;

  checkPageBreak(15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text("Date: " + new Date().toLocaleDateString("en-GB"), margin, cursorY);
  cursorY += 5;
  doc.text(`Place: ${PORTFOLIO_DATA.personal.place}`, margin, cursorY);

  doc.setFont("helvetica", "bold");
  doc.text(`(G.V.V.MANIKANTA)`, pageWidth - margin, cursorY, { align: "right" });

  doc.save("Gandham_Veera_Venkata_Manikanta_Resume.pdf");
}
