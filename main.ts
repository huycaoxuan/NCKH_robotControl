function servo1_xoay () {
    goc_xoay = 0
    for (let index = 0; index < 4; index++) {
        pins.servoWritePin(AnalogPin.P1, goc_xoay + 6)
        basic.pause(1000)
    }
    for (let index = 0; index < 4; index++) {
        pins.servoWritePin(AnalogPin.P1, goc_xoay - 6)
        basic.pause(1000)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 100) {
        autoStatus()
    } else if (receivedNumber > 100) {
        manualStatus()
    }
    if (mode == 1) {
        if (receivedNumber <= 3) {
            diem_dung = receivedNumber
        }
    } else {
        if (receivedNumber == 0) {
            tien()
        } else if (receivedNumber == 8) {
            lui()
        } else if (receivedNumber == 21) {
            trai()
        } else if (receivedNumber == 22) {
            phai()
        } else if (receivedNumber == 16) {
            ha()
        } else if (receivedNumber == 12) {
            nang()
        } else if (receivedNumber == 50) {
            xoaytrai()
        } else if (receivedNumber == 51) {
            xoayphai()
        } else {
            dung()
        }
    }
})
function dung () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P16, 0)
}
function autoStatus () {
    mode = 1
    pins.digitalWritePin(DigitalPin.P5, 1)
    pins.digitalWritePin(DigitalPin.P11, 0)
    basic.showString("Auto")
}
function manualStatus () {
    mode = 0
    pins.digitalWritePin(DigitalPin.P5, 0)
    pins.digitalWritePin(DigitalPin.P11, 1)
    basic.showString("Manual")
}
function trai () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, toc_re)
}
function phai () {
    pins.analogWritePin(AnalogPin.P13, toc_re)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function xoaytrai () {
    goc_xoay = Math.min(180, goc_xoay + 5)
    pins.servoWritePin(AnalogPin.P1, goc_xoay)
}
function nang () {
    goc_nang = Math.min(180, goc_nang + 5)
    pins.servoWritePin(AnalogPin.P0, goc_nang)
}
function servo2_xoay () {
    goc_nang = 45
    for (let index = 0; index < 3; index++) {
        goc_nang = goc_nang + 5
        pins.servoWritePin(AnalogPin.P0, goc_nang)
        basic.pause(1000)
        servo1_xoay()
    }
    for (let index = 0; index < 3; index++) {
        goc_nang = goc_nang - 5
        pins.servoWritePin(AnalogPin.P0, goc_nang)
        basic.pause(1000)
        servo1_xoay()
    }
}
function xoayphai () {
    goc_xoay = Math.max(0, goc_xoay - 5)
    pins.servoWritePin(AnalogPin.P1, goc_xoay)
}
function lui () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, toc_thang)
    pins.analogWritePin(AnalogPin.P15, toc_thang)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function ha () {
    goc_nang = Math.max(0, goc_nang - 5)
    pins.servoWritePin(AnalogPin.P0, goc_nang)
}
function tien () {
    pins.analogWritePin(AnalogPin.P13, toc_thang)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, toc_thang)
}
let mode = 0
let diem_dung = 0
let goc_xoay = 0
let goc_nang = 0
let toc_thang = 0
let toc_re = 0
radio.setGroup(1)
for (let index = 0; index < 4; index++) {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
}
let nga_tu = 0
toc_re = 512
toc_thang = 512
goc_nang = 45
goc_xoay = 0
pins.servoWritePin(AnalogPin.P0, goc_nang)
pins.servoWritePin(AnalogPin.P1, goc_xoay)
manualStatus()
nga_tu = 0
diem_dung = 0
// Chương trình tự động
basic.forever(function () {
    if (mode == 1) {
        if (nga_tu >= diem_dung) {
            dung()
        } else {
            if (pins.digitalReadPin(DigitalPin.P12) == 1 && ((pins.digitalReadPin(DigitalPin.P8) == 1 || pins.digitalReadPin(DigitalPin.P8) == 0) && pins.digitalReadPin(DigitalPin.P2) == 0)) {
                phai()
            } else if (pins.digitalReadPin(DigitalPin.P12) == 1 && (pins.digitalReadPin(DigitalPin.P8) == 0 && pins.digitalReadPin(DigitalPin.P2) == 1)) {
                tien()
            } else if (pins.digitalReadPin(DigitalPin.P12) == 0 && ((pins.digitalReadPin(DigitalPin.P8) == 1 || pins.digitalReadPin(DigitalPin.P8) == 0) && pins.digitalReadPin(DigitalPin.P2) == 1)) {
                trai()
            } else if (pins.digitalReadPin(DigitalPin.P12) == 0 && (pins.digitalReadPin(DigitalPin.P8) == 0 && pins.digitalReadPin(DigitalPin.P2) == 0)) {
                nga_tu = nga_tu + 1
                if (nga_tu < diem_dung) {
                    basic.showNumber(nga_tu)
                } else if (nga_tu == diem_dung) {
                    dung()
                    basic.showNumber(nga_tu)
                    radio.sendNumber(10)
                    servo2_xoay()
                    radio.sendNumber(11)
                }
            }
        }
    }
})
