import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext();

export default function Parent() {
  const [users, setUsers] = useState();

  useEffect(() => {
    setUsers({
      email: "kgisl@gmail.com",
      name: "kgisl",
    });
  }, []);
  return (
    <>
      <UserContext.Provider value={users}>
        <p>This is a parent component</p>
        <Child />
      </UserContext.Provider>
    </>
  );
}

function Child() {
  return (
    <>
      <p>This is a child component</p>
      <GrandChild />
    </>
  );
}

function GrandChild() {
  const value = useContext(UserContext);
  return (
    <>
      <p>GrandChild</p>
      {value && (
        <div>
          <p>Email: {value.email}</p>
          <p>Name: {value.name}</p>
        </div>
      )}
    </>
  );
}
