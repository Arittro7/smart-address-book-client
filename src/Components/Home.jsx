import AddAddress from "./AddAddress";
import SavedAddress from "./SavedAddress";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <AddAddress></AddAddress>
      <SavedAddress></SavedAddress>
    </div>
  );
};

export default Home;