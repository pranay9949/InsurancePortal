
import { Route, Routes } from 'react-router-dom';
import './App.css';
import  NewApplication  from './pages/applicationregistration/NewApplication';
import { ViewApplication } from './pages/applicationregistration/ViewApplication';
import { Dashboard } from './pages/dashboard/DashBoard';
import { ContextProvider} from './context/CaseContext';
import CreateCase from './pages/datacollection/CreateCase';
import EducationDetails from './pages/datacollection/EducationDetails';
import IncomeDetails from './pages/datacollection/IncomeDetails';
import KidsDetails from './pages/datacollection/KidsDetails';
import PlanSelection from './pages/datacollection/PlanSelection';
import Summary from './pages/datacollection/Summary';
import NavBar from "./components/NavBar/NavBar"
import EligibilityCheck from './pages/eligibility/EligibiltyCheck';
import Results from './pages/eligibility/Results';
import Correspondence from './pages/correspondence/Correspondence';
import Benefit from './pages/benefitIssuance/Benefit';
import CreatePlan from './pages/admin/CreatePlan';
import ViewPlan from "./pages/admin/ViewPlan"
import CreateCaseWorker from './pages/admin/CreateCaseWorker';
import ViewCaseWorker from './pages/admin/ViewCaseWorker';

function App() {
  return (
    <>
    <div className='global'>

  
       <NavBar/>
      </div>
      <ContextProvider>
    <Routes>
      
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/createapp' element={<NewApplication/>}></Route>
      <Route path='/viewapp' element={<ViewApplication/>}></Route>

         <Route path="/create-case" element={<CreateCase />} />
          <Route path="/plan-selection" element={<PlanSelection />} />
          <Route path="/income-details" element={<IncomeDetails />} />
          <Route path="/education-details" element={<EducationDetails />} />
           <Route path="/kids-details" element={<KidsDetails />} />
            <Route path="/summary" element={<Summary />} />

          <Route path="/check-eligibility" element={<EligibilityCheck />} />
          <Route path="/check-results" element={<Results/>} />
      

           <Route path='/correspondence' element={<Correspondence/>}/>

            <Route path='/benefit' element={<Benefit/>}/>


            <Route path = "/create-plan" element={<CreatePlan/>}></Route>
            <Route path = "/view-plan" element={<ViewPlan/>}></Route>
              <Route path = "/create-caseworker" element={<CreateCaseWorker/>}></Route>
               <Route path = "/view-caseworker" element={<ViewCaseWorker/>}></Route>



    </Routes>
    </ContextProvider>
      </>
  );
}

export default App;
