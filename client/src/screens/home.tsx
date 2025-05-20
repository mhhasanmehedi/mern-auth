import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

const Home = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl } = useAuth();

  const handlePayment = async () => {
    const response = await axios.post(
      `${backendUrl}/payment`,
      {
        amount: 1000,
        customer: {
          name: "Mehedi Hasan",
          email: "mehedi@gmail.com",
          address: "Dhaka",
          phone: "01726476303",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    if (response.data) {
      window.location.replace(response.data.url);
    } else {
      alert("Failed to initiate payment");
    }
  };
  return (
    <div className="h-screen">
      <Button onClick={handlePayment}>Payment</Button>
    </div>
  );
};

export default Home;
