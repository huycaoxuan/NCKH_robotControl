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
    basic.showString("A")
    servoStart()
}
function manualStatus () {
    mode = 0
    pins.digitalWritePin(DigitalPin.P5, 0)
    pins.digitalWritePin(DigitalPin.P11, 1)
    diem_dung = 0
    nga_tu = 0
    basic.showString("M")
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
function servoStart () {
    pins.servoWritePin(AnalogPin.P0, 45)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P1, 100)
    basic.pause(1000)
}
function xoaytrai () {
    gocXoay = Math.min(180, gocXoay + 5)
    pins.servoWritePin(AnalogPin.P1, gocXoay)
}
function nang () {
    gocNang = Math.min(180, gocNang + 5)
    pins.servoWritePin(AnalogPin.P0, gocNang)
}
function dapLua () {
    radio.sendNumber(10)
    basic.pause(500)
    for (let index = 0; index < 2; index++) {
        gocNang = 20
        gocXoay = 0
        for (let index = 0; index < 3; index++) {
            pins.servoWritePin(AnalogPin.P0, gocNang)
            basic.pause(1000)
            for (let index = 0; index < 3; index++) {
                pins.servoWritePin(AnalogPin.P1, 0)
                basic.pause(600)
                pins.servoWritePin(AnalogPin.P1, 20)
                basic.pause(600)
            }
            gocNang += 10
        }
    }
    radio.sendNumber(11)
}
function xoayphai () {
    gocXoay = Math.max(0, gocXoay - 5)
    pins.servoWritePin(AnalogPin.P1, gocXoay)
}
function lui () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, toc_thang)
    pins.analogWritePin(AnalogPin.P15, toc_thang)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function ha () {
    gocNang = Math.max(0, gocNang - 5)
    pins.servoWritePin(AnalogPin.P0, gocNang)
}
function tien () {
    pins.analogWritePin(AnalogPin.P13, toc_thang)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, toc_thang)
}
function autoServo () {
    pins.servoWritePin(AnalogPin.P0, 15)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P1, 0)
    basic.pause(2000)
    pins.servoWritePin(AnalogPin.P0, 75)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P1, 180)
    basic.pause(2000)
    pins.servoWritePin(AnalogPin.P0, 45)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P1, 100)
}
let gocNang = 0
let gocXoay = 0
let mode = 0
let nga_tu = 0
let diem_dung = 0
let toc_thang = 0
let toc_re = 0
radio.setGroup(1)
for (let index = 0; index < 4; index++) {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
}
toc_re = 512
toc_thang = 512
diem_dung = 0
nga_tu = 0
manualStatus()
autoServo()
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
                    tien()
                    basic.showNumber(nga_tu)
                } else if (nga_tu == diem_dung) {
                    dung()
                    basic.showNumber(nga_tu)
                    dapLua()
                }
            }
        }
    }
})
