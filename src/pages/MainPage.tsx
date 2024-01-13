import React, { useState } from 'react';
import AuthComponent from '../components/Auth/AuthComponent';


const MainPage: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);
    return (
        <div>
          {<AuthComponent user={user} setUser={setUser}/>}
        </div>
      );
}

export default MainPage