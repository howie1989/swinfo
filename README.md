# Raspberry Pi Switch Port Info

## Introduction

Simple program written in Node.js to display switch name and port number on an I2C 16x02 LCD display
Needed to install LLDPCLI on the pi

## Hardware

Tested on RaspberryPi 4 8gb running Raspbian
I2C 1602 display from Amazon

Tested on Cisco Switches

## Install instructions

Install Rasbian in the normal way

Install Node JS in the normal way

`apt-get install lldpd`

Clone Repo

`npm i`

## Improvements

- Install on PiZero
- Test with micro USB Ethernet Adaptor
- Log outputs to file
- Log to Android App
