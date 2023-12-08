import { endpoint, loginAsAdmin, loginAsSubstitute, buildRequestedShiftsList, initApp, buildShiftsList } from "./main.js";
import { viewChange } from "./view-router.js";

// let isLoggedIn;

async function login(event) {
    event.preventDefault();

    const form = event.target;

    const userName = form.username.value;
    const password = form.password.value;

    const user = await checkUsernameAndPassword(userName, password);

    if (user) {
        const confirmedUser = user.employee;

        localStorage.setItem("currentUser", JSON.stringify(confirmedUser));
        // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // console.log(currentUser);

        viewChange();

        // if (currentUser.IsAdmin) {
        //     console.log("logging in as admin");
        //     viewChange();
                        
        //     // buildRequestedShiftsList();
        //     // buildShiftsList();
        //     loginAsAdmin();
        // } else if (!currentUser.IsAdmin) {
        //     console.log("logging in as user");
            
        //     viewChange();

        //     loginAsSubstitute();
        // }
    }
}

// login clicked
// async function loginClicked() {
//     const form = event.target;
//     const userName = form.username.value;
//     const password = form.password.value;
//     let employeeData = await checkUsernameAndPassword(userName, password);
//     employee = employeeData.employee;
//     // console.log(employee);
//     // console.log(employee.IsAdmin);
//     // Checks if user logged in is admin or substitute
//     if (Number(employee.IsAdmin) === 1) {
//         isAdmin = true;
//     } else {
//         isAdmin = false;
//     }
//     // console.log(isAdmin);
//     setLoginUsername();

//     viewChange(employee);
//     return employee;
// }

// Post response to backend to see, if entered username and password is correct
async function checkUsernameAndPassword(enteredUserName, enteredPassword) {
    try {
        const userNameAndPassword = { userName: enteredUserName, password: enteredPassword };
        const userNameAndPasswordAsJSON = JSON.stringify(userNameAndPassword);

        const response = await fetch(`${endpoint}/login`, {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: userNameAndPasswordAsJSON,
        });

        if (response.ok) {
            // if response ok, set isLoggedIn = true and return JSON data
            // isLoggedIn = true;
            // console.log(isLoggedIn);
            // retrieve JSON-data from backend and returns it
            const data = response.json();
            // console.log(data);
            return data;
        } else {
            console.log("Login fejlede");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// function setLoginUsername() {
//     // console.log(employee);
//     document.querySelector("#username-logged-in").textContent = `Du er logget ind som ${employee.Username}`;
// }

export { login };
