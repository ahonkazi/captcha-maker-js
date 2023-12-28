function generateRandomText() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let text = "";
    for (let i = 0; i < 6; i++) { // Adjust length as needed
        text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
}
const btncheck = document.querySelector('#check');
const input = document.querySelector('#input')

const copyWrapper = document.querySelector('#captcha-wrapper')
const load = () => {
    document.querySelector('#canvas').innerHTML = ''
    document.querySelector('#canvas').appendChild(copyWrapper); // display the canvas

    const images = document.querySelectorAll('.captchaImg')
    const textWrapper = document.querySelector('.text-wrapper')
    images.forEach((item) => {
        let randomNum = Math.floor(Math.random() * images.length - 1) + 1
        if (item.classList.contains('captcha-bg-active')) {
            item.classList.remove('captcha-bg-active')
        }
        images[randomNum].classList.add('captcha-bg-active');

        console.log(randomNum)
    })

    let text = generateRandomText()
    let charList = text.split('')
    textWrapper.innerHTML = ''
    charList.forEach((char) => {
        let randomFontSize = Math.floor(Math.random() * 4) + 1
        textWrapper.innerHTML += `<span class="font-${randomFontSize}">${char}</span>`
    })

    btncheck.addEventListener('click', () => {
        console.log(text)
        if (text === input.value) {
            Swal.fire({
                title: 'Success!',
                text: 'Wow...captcha matched!',
                icon: 'success',
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Not matched!',
                icon: 'error',
            })

        }
    })
    const div = document.getElementById('captcha-wrapper');
    html2canvas(div).then(canvas => {
        // canvas now contains the image of the div
        document.querySelector('#canvas').appendChild(canvas); // display the canvas
        document.querySelector('#captcha-wrapper').remove(); // display the canvas

    });

}

load()


const btnReload = document.querySelector('#reload');
btnReload.addEventListener('click', () => {
    // document.querySelector('#canvas').innerHTML = copyWrapper
    // console.log(document.querySelector('#canvas'))

    load()
})