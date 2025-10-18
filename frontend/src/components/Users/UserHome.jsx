import { useEffect, useState } from "react";

function UserHome() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7000/home/user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err))
  }, []);

  if (!user) return <p className="min-h-screen max-w-full text-4xl flex justify-center items-center text-red-300">Loading....</p>

  return (
    <div className="min-h-screen max-w-full flex justify-center items-center">
      <h1 className="font-black text-3xl">Welcome, {user.name}</h1>
    </div>
  )
}

export default UserHome
