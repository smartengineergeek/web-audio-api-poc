const agentColor = "red"; // "lightskyblue";
const clientColor = "green" // "darkorange";

let segments = [];

for(let i=0;i< 600;i = i+100){
    let agent = {
        startTime: i,
        endTime: i+50,
        editable: false,
        // color: {agentColor},
        labelText: "agent startTime = "+i+" endTime = "+(i+50)
    }
    let client = {
        startTime: i+50,
        endTime: i+100,
        editable: false,
        // color: {clientColor},
        labelText: "client startTime = "+(i+50)+" endTime = "+(i+100)
    }
    segments.push(agent, client);
}

// console.log(segments);

export default segments;

