//시작할때부터 작동
let com
$( function(){
	
	transferfront();

});
//


// 1. 이체메뉴 클릭시 첫화면
function transferfront(){
	/////계좌번호입력///// //// *******************************
	com='<h6 style="text-align: center;">이체내역을 확인하실 계좌번호를 입력해주십시오.</h6>';$("#comment").html(com);
	let acc = '<div></div>';
	acc += '<h4 style="text-align: center;">계좌번호입력</h4><br>'+
	'<div class="sendaccountinput col-md-4 offset-4">'+
	
	'<input id="achostno" name="achostno" class="form-control"  placeholder="어떤 계좌에서 이체 내역을 확인하시겠습니까" rows=3><br>'+
	'<button class="form-control" type="button" onclick="accpw2()">입력</button>'+
	'<span id="acccheckspan" name="acccheckspan" style="text-align:center;"></span>'+'</div><br>';
	
	$("#accin").html(acc);
	///////////////////
	
	
	//////유효성검사//////
	keycheck2();
	////////////////////
}

// 2. 계좌번호, 이체액 입력 - 유효성검사
let pass2 = [false];

//////유효성검사2-이체에서//////
function keycheck2(){
	$("#achostno").keyup( function(){  // 비밀번호 입력할때마다
		let achostno = $("#achostno").val();  
		let validation = /^[0-9]{12}$/; // 정규표현식

		if( validation.test( achostno ) ){ // 정규표현식 같으면1
			$("#acccheckspan").html("입력조건달성"); pass2[0] = true;
		}else{ // 정규현식 다르면
			$("#acccheckspan").html("14자리 숫자의 계좌번호를 입력해주십시오."); pass2[0] = false;
		}
	}); 
	
	
}



///키패드 이동 관련 선언
let ttt2 = 0;
let pwt21 = 0;	let pww21 = '';//OTP비번
let pwt22 = 0;	let pww22 = '';

////++++추가) 계좌번호 선언, 금액선언
let accnumr1;
let accnumr2;
let	money;
////

// 3. 보내는계좌, 받는계좌, 금액 입력후 입력버튼 클릭 후
///계좌번호입력후비번입력///
function accpw2(){
	if( pass2[0]==true){
		
	// 보내는 계좌번호 임시 저장//
	achostno = $("#achostno").val();
	let arr2 = achostno.slice(undefined,3);
	let arr3 = achostno.slice(3,6);
	let arr4 = achostno.slice(6,undefined);
	let arr = arr2[0]+arr2[1]+arr2[2]+"-"+arr3[0]+arr3[1]+arr3[2]+"-"+arr4[0]+arr4[1]+arr4[2]+arr4[3]+arr4[4]+arr4[5];
	accnumr1 = arr;
	
	////키패드 형태변환///
	ttt2=1;
	
	////계좌번호입력제거////
	acc = '<div></div>';
	$("#accin").html(acc);
	////////////////////
	
	//계좌번호 비번입력용 키패드 새로  띄우기//
	boxview2();
	com = '<h6 style="text-align: center;">보내시는 계좌의 비밀번호를 입력해주십시오.</h6>';
	$("#comment").html(com);
	////////////////
	}
}



//랜덤 키패드 만들기
function boxview2(){	//comment키패드 쓰임새 설명
////////////////랜덤 배열 지정///////////////
	let bxx = ['0','1','2','3','4','5','6','7','8','9'];
	for(let t=0; t<10; t++){
		let renum = Math.floor(Math.random() * 10);
		if(t==0){bxx[0]=renum;}
		else{
			let i;
			for(i=0; i<t; i++){
				if(renum==bxx[i]){
					renum = Math.floor(Math.random() * 10);
					i=-1;
				}
				else if(i==t-1){
					bxx[t]=renum;
				}
				else{
				}
			}
		}
	}
	
/////////////////////////////////////////
/////////////랜덤배열 버튼만들기/////////////

	let bxb = '<div></div><div></div><div></div>';
	let ii;
	for(ii=0; ii<10; ii++ ){
		if(ii==9){
			bxb += '<button class="btn btn-success" onclick="removeone2()"><-</button>';
		}
		bxb += '<button class="btn btn-success" onclick="clickpw2('+bxx[ii]+')">'+bxx[ii]+'</button>';
	}
	bxb += '<button type="button" class="btn btn-success" onclick="checkpw2()">확인</button>';
	$("#box").html(bxb);
/////////////////////////////////////////
}


///키패드 입력
function clickpw2( num ){
	if(pwt21 <= 3){	//ttt로 구분한 OTP,확인,계좌 로직
		if(ttt2==1){//보내는 계좌 비번 입력
			pww21 += num;pwt21++;
			////입력값 표시/////
			let bbb = '<div>'+pww21+'</div>';
			$("#billboard").html(bbb);	
		}	
	}
	else if(pwt22 <=5){
		if(ttt2==2){//otp난수입력
			pww22 += num;pwt22++;
			////입력값 표시/////
			let bbb = '<div>'+pww22+'</div>';
			$("#billboard").html(bbb);	
		}	
	}

}

//키패드 입력1 지우기
function removeone2(){
	if(ttt2==1){
		if(pwt21>0){
			pww21 = pww21.slice(0, -1);
			pwt21--;
			////입력값 표시/////
			let bbb = '<div>'+pww21+'</div>';
			$("#billboard").html(bbb);	
		}
	}
	else if(ttt2==2){
		if(pwt22>0){
			pww22 = pww22.slice(0, -1);
			pwt22--;
			////입력값 표시/////
			let bbb = '<div>'+pww22+'</div>';
			$("#billboard").html(bbb);	
		}
	}
}

//키패드확인 실행
function checkpw2(){
	checkpw00();
}


//키패드확인
function checkpw00(){
	if(ttt2==1){
		if(pww21.length==4){
			////입력값 표시/////
				let bbb = '<div></div>';
				$("#billboard").html(bbb);
			checkaccpw2(pww21,achostno,acguestno);
			
		}else{alert("4자리 모두 입력해주시길 바랍니다.");}
		
	}
	else if(ttt2==2){
		if(pww22.length==6){
			////입력값 표시/////
				let bbb = '<div></div>';
				$("#billboard").html(bbb);
				finalcheck();
		}else{alert("6자리 모두 입력해주시길 바랍니다.");}
		
	}
}

//잠금성
let ghgh66=0;


//잠금성
let ghgh08=0;
///계좌번호와 비번 db비교 확인///
function checkaccpw2(pww21,achostno){
	//계좌번호 저장//
	let arr0=changeaccno(achostno);
	
	alert("계좌번호 및 비번확인중");
	$.ajax({
		url : "/jigmBank_ver.2/checkaccpw3" ,
		data : { "pww21" : pww21,"arr0" : arr0 },
		type : "POST",
		success : function( result ){	/* 통신 성공시 받는 데이터 */
			if( result == 1 ){  
				matchaccpw = true;
				alert("정보일치");
				
				ttt2=2;
				boxview2();
				com = '<h2>1분마다 바뀌는 OTP 난수 입력바람</h2>';
				$("#comment").html(com);

			}else{ 
				matchaccpw = false;
				if(ghgh08==3){
				//계좌잠금
				accrock();
				window.location.href='main.jsp'
				}
				ghgh08= ghgh08+1;
				alert("입력 불일치 /// 입력오류횟수:"+ghgh08+"/3------//////비밀번호를 맞게 입력하였는데 이 메세지창이 뜬다면 잠금된 계좌이므로 가까운 지금은행으로가셔서 신분증과 휴대전화를 지참한 대면인증을 해주시길 바랍니다. ");
			}
		}
	});	
}


 
function changeaccno(acno){
	let arr2 = acno.slice(undefined,3);
	let arr3 = acno.slice(3,6);
	let arr4 = acno.slice(6,undefined);
	let arr0 = arr2[0]+arr2[1]+arr2[2]+"-"+arr3[0]+arr3[1]+arr3[2]+"-"+arr4[0]+arr4[1]+arr4[2]+arr4[3]+arr4[4]+arr4[5];
	return arr0;
}


//////OTP용 계좌잠금
function accrock(){
		$.ajax({
		url : "/jigmBank_ver.2/accrock2" ,
		data : { "accnumr1" : accnumr1 },
		type : "POST",
		success : function( result ){
			if(result==1){
				alert("계좌잠금"+accnumr1);
			}else{
				alert("계좌잠금 실패!");
			}
		}
	});
}
