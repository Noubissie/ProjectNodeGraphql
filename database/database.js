const db = require("./db.config")
db.connect((err)=>{
    if(err) {
        console.log("error::",err)
        throw err
    }
    console.log("connected to database......")
})

let creatSchoolInformation = ()=>{
    
        db.query(```CREATE TABLE IF NOT EXISTS schoolInformation (
            schoolName schoolName,
            schoolSection schoolSection,
            country country,
            region region,
            division division,
            subdivision subdivision,
            city city,
            address address
        ) ```,(err,data,field)=>{
            if(err) {
                db.query('ROLLBACK')
            }
            responce = data
        })
        return data
    
   
}

let subjectTaught = ()=>{
    let responce
    db.query('Select * from subjectTaught',(err,data,field)=>{
        if(err) throw err
        responce = data
    })
    return data
}

let classAndSubjectTaught = (clas)=>{
    return new Promise((resolve,reject)=>{
        db.query(`Select classs,subject_thought From school_information WHERE classs='${clas}' ORDER BY subject_thought DESC `,
    (err,data)=>{
        if(err){
            return reject(err)
        }
       return resolve(data)
    })
    })
    
     
}

let studentAndClass = (clas)=>{
    return new Promise((resolve,reject)=>{
        db.query(`Select student_name,student_class From student_information WHERE student_class='${clas}'`,
        (err,data)=>{
        if(err){
            return reject(err)
        }
        return resolve(data) 
        })
        
    })
     
}

let subjectAndMark = (studentName,clas,sequence)=>{
    
    return new Promise((resolve,reject)=>{
    
    db.query(`SELECT student_class,
                    student_name,
                    sequence,
                    staff_name,
                    subject,
                    mark,
                    coefficient FROM subject_and_mark where student_class="${clas}" AND student_name="${studentName}" AND sequence="${sequence}" ORDER BY subject ASC, student_name DESC `,
    // db.query(`SELECT * FROM subject_and_mark where student_class=${clas} ORDER BY student_name DESC `,
    (err,data)=>{
        if(err) {
            return reject(err)
        }
        // console.log(data)
        
        return resolve(data)
        
    } )
})
}
module.exports = {db,subjectAndMark, studentAndClass, classAndSubjectTaught}
// subjectAndMark()
// classAndSubjectTaught()