// Express 모듈을 가져옵니다.
const express = require('express');
const app = express();
const ejs = require('ejs')

//const connection = await oracledb.getConnection(dbConfig);
app.use(express.static('public')); // 정적 파일들의 디렉토리 설정

const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
app.set('view engine', 'ejs')
app.set('views','./views')


const dbConfig = {
    user: "ILAND",
    password: "1234",
    connectString: "localhost/xe"
};


app.get('/',(req, res)=>{
    res.render('index')
})

app.get('/mypage',(req, res)=>{
    res.render('mypage')
})

// app.get('/vote', (req, res) => {
//     res.render('vote')
// })



app.get('/vote', async (req, res) => {
    try {
        
        const connection = await oracledb.getConnection(dbConfig);

        const sql = `SELECT participantname, image FROM participant`;
        const result = await connection.execute(sql);

        const participants = result.rows; // 참가자 이름 배열

        await connection.close();

        res.render('vote', { participants }); // vote.ejs 템플릿에 데이터 전달
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 오류');
    }
});



// 서버가 3000 포트에서 시작되면 콘솔에 로그를 남깁니다.
const server = app.listen(3000, () => {
    console.log('서버 시작, 포트 3000');
});

// Oracle DB 모듈을 가져옵니다.
//const oracledb = require('oracledb');

// Oracle 클라이언트 초기화를 수행합니다.
(async () => {
    try {
        await oracledb.initOracleClient({ libDir: 'C:/instantclient_21_10' });
        console.log('Oracle 클라이언트 초기화 완료');
    } catch (error) {
        console.error('Oracle 클라이언트 초기화 오류:', error);
    }
})();




// 쿼리 결과를 객체 형태로 출력하도록 설정합니다.
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// '/select' 경로에 대한 GET 요청 처리 함수를 정의합니다.
app.get('/select', async function(request, response) {
    try {
       
        const connection = await oracledb.getConnection({
            user: "ILAND",
            password: "1234",
            connectString: "localhost/xe"
        });

      
        const sql = `SELECT * FROM participant`;
        const result = await connection.execute(sql);


 
        console.log(result);
        response.send(result.rows);

    
        await connection.close();
         



        
    } catch (error) {
        // 오류 발생 시 콘솔에 로그를 남기고 클라이언트에 오류 메시지를 전송합니다.
        console.log(error);
        response.status(500).send("서버 오류");
    }
});


