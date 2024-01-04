import axios from "axios";
import {readFileSync} from 'fs';
const config = Object.freeze({
    API_URL:"https://validator.fhir.org",
    FILE_NAME:"CorrectBundleFromIG.xml"
})



const file = readFileSync(config.FILE_NAME,'utf-8');
console.log(file)
axios.post(config.API_URL+'/validate',{
    "cliContext":{
        "igs":['hl7.fhir.us.pq-cmc#current'],
        "locale":"en"
    },
    "filesToValidate":[
        {
            "fileName": config.FILE_NAME,
            "fileContent":file,
            "fileType":"xml"
        }
    ]
}).then(res=>{
    console.log(res.data.outcomes[0].issues.map(i=>i.display))
    console.log('Error Count:',res.data.outcomes[0].issues.filter(i=>i.level==='ERROR').length)
    console.log('Warning Count:',res.data.outcomes[0].issues.filter(i=>i.level==='WARNING').length)
})