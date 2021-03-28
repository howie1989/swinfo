const LCD = require("raspberrypi-liquid-crystal");
const cp = require("child_process");
//Init display
const lcd = new LCD(1, 0x27, 16, 2);
lcd.beginSync();

async function getDetails() {
  try {
    // Get Switch info from command line
    const lldpcli = await cp.spawnSync("lldpcli", ["sh", "nei", "-f", "json"]);
    const output = lldpcli.stdout.toString();
    const outputJSON = JSON.parse(output);
    const port = outputJSON.lldp.interface.eth0.port.id.value;
    const sw = Object.keys(outputJSON.lldp.interface.eth0.chassis);
    const swname = sw[0];

    // Clear any previously displayed content
    lcd.clearSync();
    // Write to LCD
    lcd.printLineSync(0, swname.slice(-16));
    lcd.printLineSync(1, port);
    //Write to command line
    console.log(swname.slice(16), port);
    return;
  } catch (error) {
    //if no connection then display waiting
    lcd.clearSync();
    lcd.printLineSync(0, "Waiting...");
  }
}

//Run above function every 5 seconds
setInterval(() => {
  getDetails();
}, 5000);
