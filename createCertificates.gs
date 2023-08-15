/**
 * Function to create and send appreciation certificates
 * Loads data from a Google Spreadsheet, fills a Slide template,
 * exports it as a PDF, and emails the certificate to the recipient.

 * row[0] = Full Name
 * row[1] = Certificate ID
 * row[2] = Recipient Short Name
 * row[3] = Recipient Email
 */
function createCertificates() {
  // Log the start of the function execution
  Logger.log('Starting the createCertificates function');

  // Load the Spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  // Load the Slide template ID
  // @see https://stackoverflow.com/questions/62707165/google-slides-api-how-to-get-the-mastertemplate-id
  const slideTemplateId = 'YOUR_SLIDE_TEMPLATE_ID_HERE';
  const yourName = 'YOUR_NAME';

  // Get the data from the Spreadsheet
  const rows = sheet.getDataRange().getValues();

  // Loop through the rows in the Spreadsheet
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // Log the current row being processed
    Logger.log('Processing row %s: %s', i, row.join(', '));

    // Make a copy of the Slide template using DriveApp
    const slideTemplate = DriveApp.getFileById(slideTemplateId);
    const slideCopy = slideTemplate.makeCopy();
    const slideCopyId = slideCopy.getId();

    // Open the copied Slide
    const slide = SlidesApp.openById(slideCopyId);

    // Replace the placeholders with actual data
    const slides = slide.getSlides();
    for (let j = 0; j < slides.length; j++) {
      const shapes = slides[j].getShapes();
      for (let k = 0; k < shapes.length; k++) {
        const textRange = shapes[k].getText();
        if (textRange) {
          const text = textRange.asString();
          const newText = text
            .replace('<<Name>>', row[0])
            .replace('<<CertID>>', row[1]);
          textRange.setText(newText);
        }
      }
    }

    // Log that we have finished updating the Slide for this row
    Logger.log('Slide for row %s has been updated', i);

    // Flush the changes we've made to the instantiated template presentation.
    slide.saveAndClose();

    // Send the certificate as a PDF via email
    const pdf =
      DriveApp.getFileById(slideCopyId).getAs('application/pdf');
    const subject = '[GDSC] Your GDSC Core Team Certificate!';
    const body = `Dear ${row[2]},\n\nPlease find your certificate attached.\n\nBest,\n${yourName}`;
    MailApp.sendEmail({
      to: row[3],
      subject: subject,
      body: body,
      attachments: [pdf],
    });

    // Log that we have sent the email for this row
    Logger.log('Email for row %s has been sent', i);

    // Optional: Delete the temporary Slide copy
    DriveApp.getFileById(slideCopyId).setTrashed(true);

    // Log that we have deleted the temporary Slide copy for this row
    Logger.log('Temporary Slide copy for row %s has been deleted', i);
  }

  // Log the end of the function execution
  Logger.log('Finished executing the createCertificates function');
}
