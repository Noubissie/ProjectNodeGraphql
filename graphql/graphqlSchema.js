let graphql = require("graphql")
let {subjectAndMark,db,studentAndClass, classAndSubjectTaught} = require("../database/database")

let {GraphQLObjectType, GraphQLInputObjectType, GraphQLSchema, GraphQLID,GraphQLNonNull, GraphQLFloat, GraphQLInt,GraphQLList, GraphQLString} = graphql

let studentRegistrationType = new GraphQLObjectType({
    name:"studentRegistration",
    fields:()=>(
        {
            studentId:{type:GraphQLID},
            familyName:{type:GraphQLString},
            givenName:{type:GraphQLString},
            // dateOfBirth:{type:GraphQL},
            studentGender:{type:GraphQLString},
            studentContact:{type:GraphQLString},
            GuidantFamilyName:{type:GraphQLString},
            GuidantGivenName:{type:GraphQLString},
            GuidantOccupation:{type:GraphQLString},
            guidantDateOfBirth:{type:GraphQLString},
            guidantGender:{type:GraphQLString},
            guidantContactNumber:{type:GraphQLString},
            studentPassword:{type:GraphQLID},
        }
    )
})



let authorizationType = new GraphQLObjectType(
    {
        name:"userAuthorizationType",
        fields:()=>({
            id: {type:GraphQLID},
            username:{type:GraphQLString},
            password:{type:GraphQLString},
            auth:{
                type:auth,
                resolve(parent,args){
                    
                   return  {
                        username:parent.username,
                        password:parent.password
                    }
                    
                    // console.log(parent.username)
                    // console.log(parent.password)
                }
            }
        })
    }
) 
let auth = new GraphQLObjectType(
    {
        name:"userAuth",
        fields:()=>({
            id: {type:GraphQLID},
            username:{type:GraphQLString},
            password:{type:GraphQLString}
        })
    }
)

let verifierQueryType = new GraphQLObjectType({
    name:"verifierClientType",
    fields:()=>({
        clientID:{type:GraphQLID},
        client:{
            type:new GraphQLList(studentRegistrationType),
            resolve(parent,args){
                return [{
                    studentId:1,
                    familyName:"Noubissie",
                    givenName:"landry placid",
                },
                {
                    studentId:2,
                    familyName:"Noubissie",
                    givenName:"landry placid",
                },
                {
                    studentId:3,
                    familyName:"Noubissie",
                    givenName:"landry placid",
                },
                {
                    studentId:4,
                    familyName:"Noubissie",
                    givenName:"landry placid",
                },
                {
                    studentId:5,
                    familyName:"Noubissie",
                    givenName:"landry placid",
                }
            ]
            }
        }
    })
})

let studentSubjectAndMarkType = new GraphQLObjectType({
    name:"SubjectAndMarkType",
    fields:()=>({
        student_class:{type:GraphQLString},
        student_name:{type:GraphQLString},
        sequence:{type:GraphQLString},
        staff_name:{type:GraphQLString},
        subject:{type:GraphQLString},
        mark:{type:GraphQLFloat},
        coefficient:{type:GraphQLInt}
    })
    
})

let classAndSubjectTaughtType = new GraphQLObjectType({
    name:"classAndSubjectTaughtType",
    fields:()=>({
        classs:{type:GraphQLString},
        subject_thought:{type:new GraphQLList(GraphQLString)},
    })
    
})
let studentAndClassType = new GraphQLObjectType({
    name:"studentAndClassType",
    fields:()=>({
        student_name:{type:GraphQLString},
        student_class:{type:GraphQLString},
        // sequence:{type:GraphQLString},

        studentSubjectAndMark:{
            type: new GraphQLList(studentSubjectAndMarkType),
            args:{
                sequence:{type:GraphQLString}
            },
            resolve(parent,args){
                let responce = subjectAndMark(studentName=parent.student_name, clas=parent.student_class,sequence=args.sequence)
                return responce
            }
        },
    })

})
let RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:()=>({
        verifierQuery:{
            type:new GraphQLList(verifierQueryType),
            args:{
                clientID:{type:new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                return [{
                    clientID:args.clientID, 
                    
                }]
            }
        },
        authorization:{
            type:authorizationType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)},
                username:{type:new GraphQLNonNull(GraphQLString)},
                password:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                console.log(args.username)
                console.log(args.password)
                return {
                    username:args.username,
                    password:args.password,
                    
                }
            }
            },
        studentSubjectAndMark:{
            type: new GraphQLList(studentSubjectAndMarkType),
            args:{
                student_class:{type:new GraphQLNonNull(GraphQLString)},
                sequence:{type:new GraphQLNonNull(GraphQLString)},
                student_name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                // console.log(subjectAndMark(clas=args.student_class,sequence=args.sequence))
                let responce = subjectAndMark(studentName=args.student_name,clas=args.student_class,sequence=args.sequence)
                return responce
            }
        },
        studentAndClass:{
            type: new GraphQLList(studentAndClassType),
            args:{
                student_class:{type:new GraphQLNonNull(GraphQLString)},
                // sequence:{type:new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent,args){
                let responce = studentAndClass(clas=args.student_class)
                return responce
            }
        },
        classAndSubjectTaught:{
            type: new GraphQLList(classAndSubjectTaughtType),
            args:{
                classs:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                console.log("classs:::",args.classs)
                let responce = classAndSubjectTaught(clas=args.classs)
                return new Promise((resolve,reject)=>{
                    
                    // let responce = classAndSubjectTaught(clas=args.classs)
                    
                    responce.then((result)=>{
                        // console.log("data::",JSON.parse((JSON.parse(JSON.stringify(result))[0]).subject_thought))
                        if(JSON.parse(JSON.stringify(result))[0]){
                            let responc = [
                                {
                                    classs:JSON.parse(JSON.stringify(result))[0].classs,
                                    subject_thought:JSON.parse((JSON.parse(JSON.stringify(result))[0]).subject_thought).sort()
                                }
                            ]
                            return resolve(responc)
                        }
                        else{
                            return resolve([
                                {
                                classs:"",
                                subject_thought:[]
                            }
                        ])
                        }
                    }).catch((err)=>{
                        return reject(err)
                    })
                   
                    
                })

              
            }
        },
        
    })
})


// MUTATION TYPES TO BE SENT TO ANOTHER FILE
let sectionType = new GraphQLInputObjectType({
    name:"sectionType",
    fields:()=>({
        key:{type:new GraphQLNonNull(GraphQLID)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        value:{type:new GraphQLNonNull(GraphQLString)}
    })
})
let sectionOutputType = new GraphQLObjectType({
    name:"sectionOutputType",
    fields:()=>({
        key:{type:new GraphQLNonNull(GraphQLID)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        value:{type:new GraphQLNonNull(GraphQLString)}
    })
})

let schoolInformationType = new GraphQLObjectType({
    name:"schoolInformationType",
    fields:()=>({
        schoolName:{type:GraphQLString},
        schoolSection:{
            type:new GraphQLList(sectionOutputType)
            
        },
        country:{type:GraphQLString},
        region:{type:GraphQLString},
        division:{type:GraphQLString},
        subdivision:{type:GraphQLString},
        city:{type:GraphQLString},
        address:{type:GraphQLString},
    })
})
let mutation = new GraphQLObjectType({
    name:"mutation",
    fields:()=>({
        schoolInformation:{
            type:schoolInformationType,
            args:{
                schoolName:{type: new GraphQLNonNull(GraphQLString)},
                schoolSection:{type:new GraphQLList(sectionType)},
                country:{type:new GraphQLNonNull(GraphQLString)},
                region:{type:new GraphQLNonNull(GraphQLString)},
                division:{type:new GraphQLNonNull(GraphQLString)},
                subdivision:{type:new GraphQLNonNull(GraphQLString)},
                city:{type:new GraphQLNonNull(GraphQLString)},
                address:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                console.log("*************************************")
                console.log("schoolInformation recieved")
                console.log(args.schoolSection)
                return args
            }

        },
        studentRegistration:{
            type:studentRegistrationType,
            args:{
                studentId:{type:GraphQLID},
                familyName:{type:GraphQLString},
                givenName:{type:GraphQLString},
                // dateOfBirth:{type:GraphQL},
                studentGender:{type:GraphQLString},
                studentContact:{type:GraphQLString},
                GuidantFamilyName:{type:GraphQLString},
                GuidantGivenName:{type:GraphQLString},
                GuidantOccupation:{type:GraphQLString},
                guidantDateOfBirth:{type:GraphQLString},
                guidantGender:{type:GraphQLString},
                guidantContactNumber:{type:GraphQLString},
                studentPassword:{type:GraphQLID}
            },
            resolve(parent,args){
                console.log("**********************************************************")
                // console.log(args)
                console.log("**********************************************************")
                return args
            }
        },
        
    })
})

module.exports = new GraphQLSchema(
    {
        query:RootQuery,
        mutation
    }
)

db.end