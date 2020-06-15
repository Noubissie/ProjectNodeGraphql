let timer =()=>{
    let dateTime = new Date()
    let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    let Month =['January','Febuary','March','April','May','June','July','August','September','October','November','December']
    let day =dateTime.getDay()
    let date = dateTime.getDate()
    let month = dateTime.getMonth()
    let year = dateTime.getUTCFullYear()
    let time = dateTime.toLocaleTimeString()

    return [days[day],date,Month[month],year,time]
} 
let logger = (req,res,next)=>{
    let [day,date,month,year,time] = timer()
    let protocol = req.protocol
    let client = req.get('host')
    let browserInformation = req.get('user-agent')
    let dateHead = req.get('Date')
    let originalUrl = req.originalUrl
    // let host = req.host  deprecated
    let hostname = req.hostname
    let ips = req.ips
    let httpVersion = req.httpVersion
    // res.json(res.header)
    // res.sendStatus(400)
    console.log(hostname)

    next()
    

    // let headers = req.headers
    // console.log(`year::${year} --> Month::${month} -->Day::${day} -->Date::${date} \n
    //             time::${time}
    // \n user:${client}\n protocole:${protocol}\n browser:${browserInformation}
    // \n originalUrl:${originalUrl}\n hostname:${hostname}\n
    // ip:${ips}\n httpVersion:${httpVersion}

    // \n header:${headers}\n header_date::${dateHead}\n params::${req.params.id}`)

}
module.exports = logger