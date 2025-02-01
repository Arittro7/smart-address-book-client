import AddAddress from "./AddAddress";
import SavedAddress from "./SavedAddress";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {

  // server ping to keep it alive
const keepServerAlive = () => {
  setInterval(async () => {
    try {
      await axios.get("https://smart-book-server.vercel.app/");
      // console.log("Server Pinged to Stay Alive");
    } catch (error) {
      console.error("Error keeping server alive", error);
    }
  }, 300000);
};

useEffect(() => {
  keepServerAlive();
}, []);

  return (
    <div className="container mx-auto p-4">
      <AddAddress></AddAddress>
      <SavedAddress></SavedAddress>
    </div>
  );
};

export default Home;