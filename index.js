//     Create & Read..

const form = document.getElementById("studentform")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

let add =JSON.parse(localStorage.getItem("storage")) || [];

let rollno = document.getElementById("RollNo").value;

let exists = add.some(store => store.RollNo === rollno);

if (exists) {
    alert("Roll Number already exists");
    return;
}

const students={

    name:document.getElementById("name").value,
    Dep:document.getElementById("Dep").value,
    Age:document.getElementById("Age").value,
    RollNo:document.getElementById("RollNo").value,
    gender:document.querySelector('input[name="gender"]:checked')?.value

};

add.push(students);

localStorage.setItem(
    "storage",        // every record is stored under this single key
    JSON.stringify(add)
);

alert("Data Submitted");
form.reset()

displayStudents();

}); 

//    Update 

const updateBtn = document.querySelector(".update");

updateBtn.addEventListener("click", () => {

    let name = document.getElementById("name").value;
    let dep = document.getElementById("Dep").value;
    let age = document.getElementById("Age").value;
    let rollNo = document.getElementById("RollNo").value;
    let gender = document.querySelector(
    'input[name="gender"]:checked'
     )?.value  ;

    
if (!name) {
    alert("Please enter Name");
    return;
}

if (dep === "Select") {
    alert("Please select Department");
    return;
}

if (!age) {
    alert("Please select Age");
    return;
}

if (!rollNo) {
    alert("Please enter Roll Number");
    return;
}

if (!gender) {
    alert("Please select Gender");
    return;
}

    let students =
        JSON.parse(localStorage.getItem("storage")) || [];

    let index = students.findIndex(
        stdindex => stdindex.RollNo === rollNo
    );

    if(index !== -1)
    {
        students[index] = {

            name: document.getElementById("name").value,
            Dep: document.getElementById("Dep").value,
            Age: document.getElementById("Age").value,
            RollNo: document.getElementById("RollNo").value,
            gender: document.querySelector(
                'input[name="gender"]:checked'
            )?.value

        };

        localStorage.setItem(
            "storage",
            JSON.stringify(students)
        );
    }
    else
    {
        alert("Roll Number Not Found");
        return;
    }

    alert("Data Updated");
    form.reset()

    displayStudents();
});

//           Delete

const dltbtn = document.querySelector(".delete");

dltbtn.addEventListener("click",()=>{

    let rollNo= document.getElementById("RollNo").value

    if(!rollNo){
        alert("Please enter Roll Number");
        return;
    }

    let students = JSON.parse(localStorage.getItem("storage")) || [];

     // Check if student exists

    let exists = students.some(
        student => student.RollNo == rollNo
    );

    if (!exists) {
        alert("Roll Number Not Found");
        return;
    }

    students = students.filter(getfilter => getfilter.RollNo !== rollNo);

    localStorage.setItem(
        "storage",
        JSON.stringify(students)
    );

    alert("Student Deleted");
    form.reset();

    displayStudents();
});


const ageslide=document.getElementById("Age");
const showslide =document.getElementById("ageshow");

ageslide.addEventListener("input",()=>{
    ageshow.textContent= ageslide.value + " Age";
});

function displayStudents(){

    let students = JSON.parse(localStorage.getItem("storage")) || []

    let table = document.getElementById("studentTable");

    table.innerHTML="";        // Clear all rows

    students.forEach((get,indx) => {      //   Take each student one by one

        table.innerHTML +=`
        <tr>
        <td>${indx +1}</td>
        <td>${get.name}</td>
        <td>${get.Dep}</td>
        <td>${get.Age}</td>
        <td>${get.RollNo}</td>
        <td>${get.gender}</td>
        </tr>`
        
    });

}
displayStudents();
