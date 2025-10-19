import { useEffect, useState } from "react";

function UserHome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:7000/home/user", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data.data); // { name, email }
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen max-w-full flex justify-center items-center">
      <h1 className="font-black text-3xl">Welcome, {user?.name || "Guest"}</h1>
    </div>
  );
}

export default UserHome;

