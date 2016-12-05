// the actual application for hackmerced
// please update and make changes here if you want to change the application

const application = {
    fields:[
      {
        id:"name",
        title:"What's your name?",
        subtitle:"",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type out your name...",
          },
        },
        required:true,
        notSurvey:true,
      },
      {
        id:"location",
        title:"Where are you from?",
        subtitle:"We want to better understand our hackers; just enter in your city name and click on the autocomplete options provided.",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type out a city name...",
          },
        },
        required:true
      },
      {
        id:"reimbursment",
        title:"Will you require a reimbursment to come to Merced?",
        subtitle:"HackMerced will try to reimburse all students travelling from outside the Merced area for travel to the event!",
        input:{
          type:"multiple-choice",
          fields:[
            {type:"Yes", value:"Yes"},
            {type:"No", value:"No"},
          ]
        },
        required:true
      },
      {
        id:"age",
        title:"My age is:",
        subtitle:"We accept students of all ages, if you are under the age of 18, we will provide a special consent form for you.",
        input:{
          type:"number",
          attributes:{
            placeholder:"Age",
            classes:["small"],
          },
        },
        required:true
      },
      {
        id:"education",
        title:"I am a:",
        subtitle:"We accept high schoolers, undergrad, graduate university students as well as college-aged hackers!",
        input:{
          type:"multiple-choice",
          fields:[
            {type:"High School", value:"High Schooler", attributes:{classes:["ifHighSchool"]}},
            {type:"Undergrad Student", value:"Undergrad Student", attributes:{classes:["ifCollege"]}},
            {type:"Graduate Student", value:"Graduate Student", attributes:{classes:["ifCollege"]}},
            {type:"College Aged", value:"College aged non-student", attributes:{classes:["ifLoneWolf"]}},
          ]
        },
        required:true
      },
      {
        id:"university",
        attributes:{
          classes:["isCollege"],
        },
        title:"What university are you from?",
        subtitle:"More applicants from your university == More reimbursments!",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type your university name...",
          },
        },
        required:true
      },
      {
        id:"major",
        attributes:{
          classes:["isCollege"],
        },
        title:"What is your major?",
        subtitle:"HackMerced is for all students, not just CS majors!",
        input:{
          type:"text",
          attributes:{
            placeholder:"Example: Art History",
          },
        },
        required:true
      },
      {
        id:"grad-year",
        attributes:{
          classes:["isCollege"],
        },
        title:"What is your graduation year?",
        subtitle:"(This helps employers reach out to you)",
        input:{
          type:"text",
          attributes:{
            placeholder:"2017",
            classes:["small"],
          },
        },
        required:true
      },
      {
        id:"high-school",
        attributes:{
          classes:["isHighSchool"],
        },
        title:"Which High School do you go to?",
        subtitle:"Helps us work with High Schools to bring more engineering programs to you!",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type your high school's name",
          },
        },
        required:true
      },
      {
        id:"free-time",
        attributes:{
          classes:["isLoneWolf"],
        },
        title:"What do you do in your free time?",
        subtitle:"HackMerced is for all students, not just CS majors!",
        input:{
          type:"text",
          attributes:{
            placeholder:"I run a startup...",
          },
        },
        required:true
      },
      {
        id:"sex",
        title:"I identify as:",
        subtitle:"HackMerced is an all-inclusive community, we just use this information for statistics!",
        input:{
          type:"multiple-choice",
          fields:[
            {type:"Female", value:"Female" },
            {type:"Male", value:"Male" },
            {type:"Non-Binary", value:"Non-Binary" },
            {type:"Undisclosed", value:"I do not wish to disclose" },
          ]
        },
        required:true
      },
      {
        id:"dietary-restrictions",
        title:"Any dietary restrictions?",
        subtitle:"We all gotta eat gud.",
        input:{
          type:"multiple-choice",
          fields:[
            {type:"None", value:"None" },
            {type:"Halal", value:"Halal" },
            {type:"Kosher", value:"Kosher" },
            {type:"Hindu", value:"Hindu/No Beef" },
            {type:"Vegetarian", value:"Vegetarian" },
            {type:"Vegan", value:"Vegan" },
            {type:"Jain", value:"Jain" },
          ]
        },
        required:true
      },
      {
        id:"allergies",
        title:"Do you have any allergies?",
        subtitle:"Gotta make sure not to have that around.",
        input:{
          type:"text",
          attributes:{
            placeholder:"Tacos...",
          },
        },
        required:false
      },
      {
        id:"shirt-size",
        title:"What is your shirt size?",
        subtitle:"We use this data to order shirts.",
        input:{
          type:"multiple-choice",
          fields:[
            {type:"XS", value:"Extra Small" },
            {type:"S", value:"Small" },
            {type:"M", value:"Medium" },
            {type:"L", value:"Large" },
            {type:"XL", value:"Extra Large" },
            {type:"2XL", value:"2x Large" },
          ]
        },
        required:true
      },
      {
        id:"resume",
        title:"Send us your Resume.",
        subtitle:"This helps recruiters and us better understand you!",
        input:{
          type:"filepicker",
          attributes:{
          },
        },
        required:false
      },
      {
        id:"GitHub",
        title:"Do you have a GitHub?",
        subtitle:"Please link us your GitHub!",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type your GitHub url...",
          },
        },
        required:false
      },
      {
        id:"Devpost",
        title:"Do you have a Devpost?",
        subtitle:"Please link us your Devpost!",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type your Devpost url...",
          },
        },
        required:false
      },
      {
        id:"personal-website",
        title:"Do you have a personal website?",
        subtitle:"Please link us your GitHub!",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type your personal website url...",
          },
        },
        required:false
      },
      {
        id:"LinkedIn",
        title:"Do you have a LinkedIn?",
        subtitle:"Please link us your LinkedIn!",
        input:{
          type:"text",
          attributes:{
            placeholder:"Type your LinkedIn url...",
          },
        },
        required:false
      },
      {
        id:"mlh",
        title:"I will at all times abide by and conform to the Major League Hacking Code of Conduct while at the event.",
        subtitle:"<a target='_blank' href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'>https://static.mlh.io/docs/mlh-code-of-conduct.pdf</a>",
        input:{
          type:"multiple-choice",
          fields:[
            {type:"Yes", value:"Yes"},
            {type:"No", value:"No"},
          ]
        },
        required:true
      },
    ]
}

module.exports = application;
