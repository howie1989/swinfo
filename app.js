const LCD = require("raspberrypi-liquid-crystal");
const cp = require("child_process");
//Init display
const lcd = new LCD(1, 0x27, 16, 2);
lcd.beginSync();

async function getDetails() {
  try {
    const lldpcli = await cp.spawnSync("lldpcli", ["sh", "nei", "-f", "json"]);
    const output = lldpcli.stdout.toString();
    const outputJSON = JSON.parse(output);
    const port = outputJSON.lldp.interface.eth0.port.id.value;
    const sw = Object.keys(outputJSON.lldp.interface.eth0.chassis);
    const swname = sw[0];
    // console.log(swname.slice(-5))

    // Clear any previously displayed content
    lcd.clearSync();
    lcd.printLineSync(0, swname.slice(-16));
    lcd.printLineSync(1, port);

    console.log(swname.slice(16), port);
  } catch (error) {
    lcd.clearSync();
    lcd.printLineSync(0, "Waiting...");
  }
}

setInterval(() => {
  getDetails();
}, 5000);
