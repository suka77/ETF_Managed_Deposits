// 1. 구글 API 클라이언트 로드
gapi.load('client', initClient);

// 2. API 클라이언트 초기화
function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyDjEbE4vsbThMNDp_Pb_42k8Tewi0QEShI',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function () {
    // 클라이언트 초기화 성공 시 실행할 함수
    saveDataToSheet();
  }, function (error) {
    // 클라이언트 초기화 실패 시 실행할 함수
    console.log(error);
  });
}

// 데이터 저장 함수
function saveDataToSheet() {
  // 저장할 데이터
  var name = $('#name-input input').val();
  var gender = $('input[name=gender]:checked', '#gender-input').val();
  var age = $('#age-input select').val();

  // 구글 스프레드시트 정보
  var spreadsheetId = '1oJGNEqw9pCR5IErrIu9PC3sf8AsFlUo_QDZCnbC1jyg';
  var sheetName = 'Investment_MBTI';

  // 저장할 데이터 배열
  var data = [[name, gender, age]];

  // 다음 행에 데이터를 추가하기 위해 마지막 행 인덱스를 가져옴
  getLastRow().then(function(lastRow) {
    var nextRow = lastRow + 1;
    var range = sheetName + '!A' + nextRow + ':C' + nextRow; // 다음 행에 추가하도록 range 값 수정

    // 구글 API를 사용하여 데이터 저장
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: data
      }
    }).then((response) => {
      const result = response.result;
      console.log(`${result.updates.updatedCells} cells appended.`);
    }, function (error) {
      console.log(error);
    });
  });
}
