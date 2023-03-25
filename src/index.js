// TODO: 이 곳에 정답 코드를 작성해주세요.
class SignupForm {
    // 멤버 변수 선언
    formElem
    idInputElem
    ID_REGEX = /^[a-z0-9_-]{5,20}$/
    PW_REGEX = /^[A-Za-z0-9]{8,16}$/
    fontSize = 16
    ERROR_MSG = {
        required: '필수 정보 입니다.',
        invalidId:
            '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
        invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
        invalidPwCheck: '비밀번호가 일치하지 않습니다.',
    }
    $html
    MAX_FONT_SIZE = 20
    MIN_FONT_SIZE = 12
    constructor() {
        this.#assignElement()
        this.handleDomEvents()
    }
    // 할당하는 메서드
    #assignElement() {
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
        this.$html = document.documentElement
    }

    handleDomEvents() {
        window.addEventListener(
            'DOMContentLoaded',
            this.handleInputFocus.bind(this)
        )
        this.idInputElem.addEventListener('focusout', () =>
            this.handleCheckValidation(this.idInputElem, this.idInputMsg)
        )
        this.pwInputElem.addEventListener('focusout', () =>
            this.handleCheckValidation(this.pwInputElem, this.pwInputMsg)
        )
        this.pwInputCheckElem.addEventListener('focusout', () =>
            this.handleCheckValidation(
                this.pwInputCheckElem,
                this.pwInputCheckMsg
            )
        )
        this.submitElem.addEventListener('click', this.handleSubmit.bind(this))
        this.modalApproveBtn.addEventListener('click', () =>
            this.handleApproveBtn(this.modalElem)
        )
        this.modalCancelBtn.addEventListener('click', () =>
            this.handleCloseModal(this.modalElem)
        )
        this.fontPlusBtn.addEventListener(
            'click',
            this.handleClickFontPlusBtn.bind(this)
        )
        this.fontMinusBtn.addEventListener(
            'click',
            this.handleClickFontMinusBtn.bind(this)
        )
    }

    handleInputFocus() {
        this.idInputElem.focus()
    }

    checkRegex(target) {
        const { value, id } = target
        if (value.length === 0) {
            return 'required'
        } else {
            switch (id) {
                case 'id':
                    return this.ID_REGEX.test(value) ? true : 'invalidId'
                case 'pw':
                    return this.PW_REGEX.test(value) ? true : 'invalidPw'
                case 'pw-check':
                    return this.pwInputElem.value === value
                        ? true
                        : 'invalidPwCheck'
            }
        }
    }

    handleCheckValidation(target, msgTarget) {
        const isValid = this.checkRegex(target)
        if (isValid !== true) {
            this.handleAddElementBorderColor(target)
            this.handleExposeErrorMessage(msgTarget, this.ERROR_MSG[isValid])
        } else {
            this.handleDeleteElementBorderColor(target)
            this.handleExposeErrorMessage(msgTarget, '')
        }

        return isValid
    }

    handleSubmit(e) {
        e.preventDefault()
        // 유효성 검사 한번 더 실행
        const isValid =
            this.handleCheckValidation(this.idInputElem, this.idInputMsg) ===
                true &&
            this.handleCheckValidation(this.pwInputElem, this.pwInputMsg) ===
                true &&
            this.handleCheckValidation(
                this.pwInputCheckElem,
                this.pwInputCheckMsg
            ) === true
        if (isValid === true) {
            this.handleOpenModal(this.modalElem, 'open')
        }
    }

    handleAddElementBorderColor(htmlInputElement) {
        htmlInputElement.classList.add('border-red-600')
    }

    handleDeleteElementBorderColor(htmlInputElement) {
        htmlInputElement.classList.remove('border-red-600')
    }

    handleExposeErrorMessage(msgElement, text) {
        console.log(msgElement)
        msgElement.innerText = text
    }

    handleOpenModal(modalElment) {
        modalElment.showModal()
        this.modalConfirmId.innerText = this.idInputElem.value
        this.modalConfirmPw.innerText = this.pwInputElem.value
    }

    handleCloseModal(modalElment) {
        modalElment.close()
    }

    handleApproveBtn(modalElment) {
        alert('가입이 완료되었습니다! 🥳')
        this.handleCloseModal(modalElment)
    }

    getHTMLFontSize() {
        return parseFloat(window.getComputedStyle(this.$html).fontSize)
    }

    handleClickFontPlusBtn() {
        this.onClickFontSizeControl('increase')
    }

    handleClickFontMinusBtn() {
        this.onClickFontSizeControl('decrease')
    }

    onClickFontSizeControl(flag) {
        const fontSize = this.getHTMLFontSize()
        let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
        this.$html.style.fontSize = newFontSize
        this.fontMinusBtn.disabled = newFontSize <= this.MIN_FONT_SIZE
        this.fontPlusBtn.disabled = newFontSize >= this.MAX_FONT_SIZE
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

// 모든 폰트 사이즈에 접근해서 늘리는건 비효율 적이다.
// 😏 폰트 사이즈가 rem으로 되있기 때문에 원천 html font-size를 바꾸면 다 바뀐다.
// 현재 html에 폰트사이즈를 알고 싶다면??
