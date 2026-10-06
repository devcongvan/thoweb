const RSVP_TOKEN = "abcabc123";
const RSVP_HEADERS = ["timestamp", "name", "attendance", "location", "guests", "message"];

function doPost(event) {
  let data;
  try {
    data = JSON.parse(event.postData.contents);
  } catch (error) {
    return jsonResponse({ status: "error", message: "Dữ liệu gửi lên không hợp lệ." });
  }

  if (!data || data.token !== RSVP_TOKEN) {
    return jsonResponse({ status: "error", message: "Yêu cầu không hợp lệ." });
  }

  const name = cleanText(data.name);
  const attendance = cleanText(data.attendance);
  const location = cleanText(data.location);
  const guests = cleanText(data.guests);
  const message = cleanText(data.message);

  if (!name || !attendance || !location || !guests) {
    return jsonResponse({ status: "error", message: "Vui lòng điền đầy đủ thông tin bắt buộc." });
  }

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const headers = sheet.getRange(1, 1, 1, RSVP_HEADERS.length).getDisplayValues()[0];
    if (RSVP_HEADERS.some((header, index) => headers[index] !== header)) {
      return jsonResponse({
        status: "error",
        message: "Tên hoặc thứ tự các cột trong Google Sheet chưa đúng."
      });
    }

    sheet.appendRow([new Date(), name, attendance, location, guests, message]);
    return jsonResponse({ status: "ok" });
  } catch (error) {
    console.error("Không thể ghi RSVP vào Google Sheet.", error);
    return jsonResponse({
      status: "error",
      message: "Không thể ghi dữ liệu vào Google Sheet. Vui lòng thử lại sau."
    });
  }
}

function cleanText(value) {
  const text = String(value || "").trim();
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
