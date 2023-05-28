import {BrowserRouter,Route,Routes,useNavigate} from "react-router-dom"
import {LoginPage,ProtectedRoute } from "./pages"
import {AdminDash,Upload,Data,Team} from './pages/dashboard'
import { ExecutiveDash,Data as ExeData} from "./pages/exicutiveDash"
import { VerifierDash,Data as VerData,} from "./pages/verifierDash"


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
       
        {/* admin */}
        <Route path="/" element={<ProtectedRoute> <AdminDash/> </ProtectedRoute> } >
          <Route index element={<Data/>} />
          <Route  path="upload" element={<Upload/>} />
          <Route path="users" element={<Team/>} />
        </Route>
        {/* executive */}
        <Route path="/executive" element={<ProtectedRoute> <ExecutiveDash/> </ProtectedRoute>} >
          <Route index element={<ExeData/>} />
        </Route>
         {/* verifier  */}
         <Route path="/verifier" element={<ProtectedRoute> <VerifierDash/> </ProtectedRoute> } >
          <Route index element={<VerData/>} />
        </Route>
        {/* login page */}
        <Route path="/auth" element={<LoginPage/>} />
        {/* Not Found */}
        <Route path="*" element={<h1 className="flex justify-center items-center text-[3rem]">Not Found 404</h1>} /> 

        

      </Routes>
    </BrowserRouter>
  )
}






export default App
