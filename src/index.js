// TODO: 이 곳에 정답 코드를 작성해주세요.
class SignupForm {

// 멤버 변수 선언
formElem
idInputElem
checkEngRegex = /[a-z|0-9|_-]$/
checkPwRegex = /^[A-Za-z0-9]{8,16}$/
fontSize = 16
constructor(){
  console.log('컨스트럭터 실행!')
  this.#assignElement()
  this.handleDomEvents()
  console.log(this.fontSize)
}
// 할당하는 메서드
#assignElement(){
  this.formElem = document.getElementById('form')
  this.idInputElem = this.formElem.querySelector('#id')
  this.idInputMsg = this.formElem.querySelector('#id-msg')
  this.pwInputElem = this.formElem.querySelector('#pw')
  this.pwInputMsg = this.formElem.querySelector('#pw-msg')
  this.pwInputCheckElem = this.formElem.querySelector('#pw-check')
  this.pwInputCheckMsg = this.formElem.querySelector('#pw-check-msg')
  this.submitElem = this.formElem.querySelector('#submit')
  this.modalElem = document.getElementById('modal')
  this.modalConfirmId = this.modalElem.querySelector('#confirm-id')
  this.modalConfirmPw = this.modalElem.querySelector('#confirm-pw')
  this.modalApproveBtn = this.modalElem.querySelector('#approve-btn')
  this.modalCancelBtn = this.modalElem.querySelector('#cancel-btn')
  this.fontPlusBtn = document.getElementById('increase-font-btn')
  this.fontMinusBtn = document.getElementById('decrease-font-btn')
}

handleDomEvents(){
  window.addEventListener('DOMContentLoaded', this.handleInputFocus.bind(this))
  this.idInputElem.addEventListener('focusout', () => this.handleIdValidCheck(this.idInputElem.value))
  this.pwInputElem.addEventListener('focusout', () => this.handlePwValidCheck(this.pwInputElem.value))
  this.pwInputCheckElem.addEventListener('focusout', () => this.handlePwConfirmCheck(this.pwInputCheckElem.value))
  this.submitElem.addEventListener('click', this.handleSubmit.bind(this))
  this.modalApproveBtn.addEventListener('click', ()=> this.handleApproveBtn(this.modalElem))
  this.modalCancelBtn.addEventListener('click', ()=> this.handleCloseModal(this.modalElem))
  this.fontPlusBtn.addEventListener('click', this.handleClickFontPlusBtn.bind(this))
  this.fontMinusBtn.addEventListener('click', this.handleClickFontMinusBtn.bind(this))
}

handleInputFocus(){
  this.idInputElem.focus()
}

// 얘는 포커스 아웃될때마다 실행됨
handleIdValidCheck(inputId){
  // 틀리면 if문들에서 걸린다.
  if(!this.handleCheckEmptyValue(inputId)){
    this.handleAddElementBorderColor(this.idInputElem)
    this.handleExposeErrorMessage(this.idInputMsg, '필수 입력값 입니다.')
    return 
  }

  if(!this.handleCheck5to20Letters(inputId)){
    this.handleAddElementBorderColor(this.idInputElem)
    this.handleExposeErrorMessage(this.idInputMsg, '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.')
    return 
  }

  if(!this.handleCheckLettest(inputId)){
    this.handleAddElementBorderColor(this.idInputElem)
    this.handleExposeErrorMessage(this.idInputMsg, '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.')
    return 
  }

  // 정상이면 위의 if문을 타지 않는다.
  this.handleDeleteElementBorderColor(this.idInputElem)
  this.handleExposeErrorMessage(this.idInputMsg, '')
  return true
}
// 비밀번호 유효성 검사
handlePwValidCheck(inputPw){
  if(!this.handleCheckEmptyValue(inputPw)){
    this.handleAddElementBorderColor(this.pwInputElem)
    this.handleExposeErrorMessage(this.pwInputMsg, '필수 입력값 입니다.')
    return 
  }

  if(!this.handleCheckPwLetters(inputPw)){
    this.handleAddElementBorderColor(this.pwInputElem)
    this.handleExposeErrorMessage(this.pwInputMsg, '8~16자 영문 대 소문자, 숫자를 사용하세요.')
    return 
  }

    // 정상이면 위의 if문을 타지 않는다.
  this.handleDeleteElementBorderColor(this.pwInputElem)
  this.handleExposeErrorMessage(this.pwInputMsg, '')
  return true
}
// 비밀번호 확인 유효성 검사
handlePwConfirmCheck(inputPwCheck){
  if(!this.handleCheckEmptyValue(inputPwCheck)){
    this.handleAddElementBorderColor(this.pwInputCheckElem)
    this.handleExposeErrorMessage(this.pwInputCheckMsg, '필수 입력값 입니다.')
    return 
  }

  if(this.pwInputElem.value !== inputPwCheck){
    this.handleAddElementBorderColor(this.pwInputCheckElem)
    this.handleExposeErrorMessage(this.pwInputCheckMsg, '비밀번호가 일치하지 않습니다.')
    return 
  }

  // 정상이면 위의 if문을 타지 않는다.
  this.handleDeleteElementBorderColor(this.pwInputCheckElem)
  this.handleExposeErrorMessage(this.pwInputCheckMsg, '')
  return true
}

handleSubmit(e){
  e.preventDefault()
  // 유효성 검사 한번 더 실행
  if(this.handleIdValidCheck(this.idInputElem.value) &&
  this.handlePwValidCheck(this.pwInputElem.value) &&
  this.handlePwConfirmCheck(this.pwInputCheckElem.value)){
    // 로직 추가
    this.handleOpenModal(this.modalElem, 'open')
  }
}



handleCheckEmptyValue(text){
  if(text.trim().length !==0){
    return true
  }
  return false
}

handleCheck5to20Letters(text){
  if (text.trim().length >=5 && text.trim().length <= 20){
    return true
  }
  return false
}

handleCheckLettest(text){
  if(this.checkEngRegex.test(text)){
    return true
  }
  return false
}

handleCheckPwLetters(text){
  if(this.checkPwRegex.test(text)){
    return true
  }
  return false
}

handleAddElementBorderColor(htmlInputElement){
  htmlInputElement.classList.add('border-red-600')
}

handleDeleteElementBorderColor(htmlInputElement){
  htmlInputElement.classList.remove('border-red-600')
}

handleExposeErrorMessage(msgElement, text){
  msgElement.innerText = text
}

handleOpenModal(modalElment){
  modalElment.showModal()
  this.modalConfirmId.innerText = this.idInputElem.value
  this.modalConfirmPw.innerText = this.pwInputElem.value
}

handleCloseModal(modalElment){
  modalElment.close()
}

handleApproveBtn(modalElment){
  alert("가입이 완료되었습니다! 🥳")
  this.handleCloseModal(modalElment)
}


handleClickFontPlusBtn(){
  // 현재 폰트 크기를 가져와서 변수에 저장
  // 클릭 할때마다 1씩 더해서 fontSize에 반영
  // this.handleSizeFont(this.fontSize)
  this.formElem.style.fontSize = `${++this.fontSize}px`
  this.handleSizeFont(this.fontSize)
}

handleClickFontMinusBtn(){
  // this.handleSizeFont(this.fontSize)
  this.formElem.style.fontSize = `${--this.fontSize}px`
  this.handleSizeFont(this.fontSize)
  
}

handleSizeFont(fontSize){
    console.log(this.fontSize)

  if(fontSize > 19){
    this.fontPlusBtn.setAttribute('disabled', '')
    return
  }
  if(fontSize < 13){
    this.fontMinusBtn.setAttribute('disabled', '')
    return
  }
  if(fontSize < 20 && fontSize >12){
    this.fontPlusBtn.removeAttribute('disabled', '')
    this.fontMinusBtn.removeAttribute('disabled', '')
    return
  }
} 
}


new SignupForm()

// 1. 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
// 1-1 . 페이지가 로드 된 시점 EventHanlder
// 1-2 . ID 입력창 가져오기
// 1-3 . autoFocus 되어야한다. =>


// 2. 유효성 검사 로직 추가
// 유효성 검사 시점 : input focus out 시 해당 input의 유효성을 검사합니다.
// 2-1 . ID 유효성 검사
// ID: 5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
// 3-1 input Field의 색상을 바꿔준다.
// input Field를 가져온다
// input Field의 border-color색상을 바꿔준다.
// id-msg 를 선택한다.
// id-msg innerText에 텍스트를 입력해준다.


// 3. 제출하기 버튼 로직
// 3-1. 유효성 검사 다시 한번 시도.
// 3-2. 성공하면 modal Elment에 open 이라는 attribute 추가


// 4. 폰트 사이즈 조절 로직
// 4-1. + 버튼과 - 버튼을 가져온다.
// 4-2 + 버튼을 클릭했을때 버튼 사이즈를 1씩 증가시킨다.