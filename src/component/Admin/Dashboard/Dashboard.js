// import React, {useState} from 'react';
// import { useEffect } from 'react';
// import {useContext} from 'react';
// import Admin from '../Admin/Admin';

// const Dashboard = () => {
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);  
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         fetch('https://warm-reef-27135.herokuapp.com/isAdmin' ,{
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({email: loggedInUser.email})
//         })
//         .then(res => res.json())
//         .then(data => setIsAdmin(data))
//     },[])
//     return (
//         <div>
//             {
//                 loggedInUser.isAdmin && <Admin/>
//             }
//             {
//                 !isAdmin && <h2>
//                     You Are a Not Admin
//                 </h2>
//             }
//         </div>
//     );
// };

// export default Dashboard;