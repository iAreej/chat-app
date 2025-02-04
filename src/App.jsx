import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Loginfunction from './Loginpage';
import Signupfunction from './Signup';
import Mainpage from './Mainpage';

 const App=()=>{
  return(  
    
  <div className='mainapp'>
      <>
       <Router>
        <Route exact path='/'
         component={Loginfunction} 
         />
         <Route path='/Signup'
         component={Signupfunction} 
         />
         <Route path='/Mainpage'
         component={Mainpage} 
         />

      </Router> 
      </>
  </div>
  );
    
}
export default App;

