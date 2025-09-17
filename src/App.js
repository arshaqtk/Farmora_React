
import './App.css';
import {Login_page} from './admin/Login_page';
import {Home} from './admin/Home';
import { Manage_officer } from './admin/Manage_officer';
// import { Add_officer } from './admin/Add_officer';
import { View_user } from './admin/View_user';
import { Send_reply } from './admin/Send_reply';
import { View_complaint } from './admin/View_complaint';
import {View_farmer} from './admin/View_farmer';
import { View_System_feedback } from './admin/View_system_Feedback';

import { Home_page } from './Farmofficer/Home_page';
import {Feedback_rating} from './Farmofficer/Feedback_rating';
import {Doubts} from './Farmofficer/Doubts';
import { Register } from './Farmofficer/Register';
import Forgotpassword from './admin/Forgotpassword';

import { Officer_profile } from './Farmofficer/Profile';

import { Add_plants } from './Farmofficer/Add_plants';
import { Add_scheme } from './Farmofficer/Add_scheme';
import { Add_machinery } from './Farmofficer/Add_machinery';
import { View_machinery } from './Farmofficer/View_machinery';
import { View_plants } from './Farmofficer/View_plants';
import { Send_notification } from './Farmofficer/Send_notification';
import { Officer_View_farmer } from './Farmofficer/Officer_View_farmer';
import { View_scheme } from './Farmofficer/View_scheme';
import { View_subsidy } from './Farmofficer/View_subsidy';
import { Update_plants } from './Farmofficer/Update_plants';
import { Update_machinery } from './Farmofficer/Update_machinery';
import { Send_doubt_reply } from './Farmofficer/Send_Doubt_reply';
import { Plant_order } from './Farmofficer/PlantOrder';
import { Plant_order_details } from './Farmofficer/PlantOrderDetails';
import { Machinery_Order } from './Farmofficer/Machinery_Order';
import { Machinery_Order_details } from './Farmofficer/Machinery_Order_Details';
import { Update_scheme } from './Farmofficer/UpdateScheme';
import { Add_public_notification } from './Farmofficer/AddPublicNotification';
import { Update_profile } from './Farmofficer/Update_profile';
import { View_Notification } from './Farmofficer/View_Notification';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { View_subsidy_bankdetails } from './Farmofficer/ViewSubsidyBankDetails';




function App() {
  return (
    <>
<Router>
      <Routes>
        <Route exact path='' element={<Login_page></Login_page>}></Route>
        <Route exact path='/Admin_Home' element={<Home></Home>}></Route>
        {/* <Route exact path='/Admin_add_officer' element={<Add_officer></Add_officer>}></Route> */}
        <Route exact path='/Admin_Manage_officer' element={<Manage_officer></Manage_officer>}></Route>
        <Route exact path='/Admin_Send_reply/:id' element={<Send_reply></Send_reply>}></Route>
        <Route exact path='/Admin_View_complaint' element={<View_complaint></View_complaint>}></Route>
        <Route exact path='/Admin_View_farmer' element={<View_farmer></View_farmer>}></Route>
        <Route exact path='/Admin_view_user' element={<View_user></View_user>}></Route>
        <Route exact path='/admin_view_System_feedback' element={<View_System_feedback></View_System_feedback>}></Route>
        <Route exact path='/forgot_password' element={<Forgotpassword></Forgotpassword>}></Route>




 
     
        <Route exact path='/Farm_officer_Home' element={<Home_page></Home_page>}></Route>
        <Route exact path='/Farm_officer_profile' element={<Officer_profile></Officer_profile>}></Route>
        <Route exact path='/Farm_officer_update_profile/:id' element={<Update_profile></Update_profile>}></Route>
        <Route exact path='/Farm_officer_Doubts' element={<Doubts></Doubts>}></Route>
        <Route exact path='/Farm_officer_Feedback_rating' element={<Feedback_rating></Feedback_rating>}></Route>
        <Route exact path='/Farm_officer_Machinery_Order' element={<Machinery_Order></Machinery_Order>}></Route>
        <Route exact path='/Farm_officer_Register' element={<Register></Register>}></Route>
        
        <Route exact path='/Farm_officer_Machinery_Order_details/:id' element={<Machinery_Order_details></Machinery_Order_details>}></Route>
        <Route exact path='/Farm_officer_Plant_order_details/:id' element={<Plant_order_details></Plant_order_details>}></Route>
        <Route exact path='/Farm_officer_Plant_Order' element={<Plant_order></Plant_order>}></Route>

        
        <Route exact path='/Farm_officer_Add_plants' element={<Add_plants></Add_plants>}></Route>
        <Route exact path='/Farm_officer_Add_machinery' element={<Add_machinery></Add_machinery>}></Route>
        <Route exact path='/Farm_officer_Add_scheme' element={<Add_scheme></Add_scheme>}></Route>

        <Route exact path='/Farm_officer_View_plants' element={<View_plants></View_plants>}></Route>
        <Route exact path='/Farm_officer_View_machinery' element={<View_machinery></View_machinery>}></Route>
        <Route exact path='/Farm_officer_View_scheme' element={<View_scheme></View_scheme>}></Route>
        
        <Route exact path='/Farm_officer_View_subsidy' element={<View_subsidy></View_subsidy>}></Route>
        <Route exact path='/Farm_officer_View_subsidy_bank_details/:id' element={<View_subsidy_bankdetails></View_subsidy_bankdetails>}></Route>


      
        <Route exact path='/Farm_officer_Update_plants/:id' element={<Update_plants></Update_plants>}></Route>
        <Route exact path='/Farm_officer_Update_machinery/:id' element={<Update_machinery></Update_machinery>}></Route>
        <Route exact path='/Farm_officer_Update_scheme/:id' element={<Update_scheme></Update_scheme>}></Route>




        <Route exact path='/Farm_officer_Send_notification/:id' element={<Send_notification></Send_notification>}></Route>
        <Route exact path='/Farm_officer_Send_doubt_reply/:id' element={<Send_doubt_reply></Send_doubt_reply>}></Route>
        <Route exact path='/Farm_officer_Send_Public_notification' element={<Add_public_notification></Add_public_notification>}></Route>
        <Route exact path='/Farm_officer_View_Public_notification' element={<View_Notification></View_Notification>}></Route>


      
        <Route exact path='/Farm_officer_View_farmer' element={<Officer_View_farmer></Officer_View_farmer>}></Route>







       
      </Routes>
    </Router>

   
    </>
  );
}

export default App;
