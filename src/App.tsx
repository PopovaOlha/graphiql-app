import { useState } from "react";
import AuthComponent from './components/Auth/AuthComponent';

function App() {
  const [user, setUser] = useState<any | null>(null);

  return (
    <>
      <AuthComponent user={user} setUser={setUser} />
    </>
  );
}

export default App;
