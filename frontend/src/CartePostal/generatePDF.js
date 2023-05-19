import jsPDF from 'jspdf';

function generatePDF(postcardData) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Carte postale', 10, 10);

  doc.setFontSize(12);
  doc.text(`Expéditeur: ${postcardData.sender}`, 10, 30);
  doc.text(`Destinataire: ${postcardData.recipient}`, 10, 40);
  doc.text(`De: ${postcardData.location}`, 10, 50);
  doc.text(`Message: ${postcardData.message}`, 10, 60);

  doc.addImage(postcardData.image, 'JPEG', 10, 70, 100, 100);

  doc.save('carte_postale.pdf');
}

export default generatePDF;
