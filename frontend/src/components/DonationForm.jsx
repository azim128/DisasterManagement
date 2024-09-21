import { DollarSign, Heart, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useDonation from "../hooks/useDonation";
import useFetchData from "../hooks/useFetchData"; // Import the custom hook
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import Modal from "./ui/Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createDonation, loading, error, success } = useDonation();

  const {
    data: lastDayDonations,
    loading: loadingDonations,
    error: donationsError,
    refetch: refetchDonations, 
  } = useFetchData(`/api/v1/donation/last-n-days`, { days: 1 });

  useEffect(() => {
    if (success) {
      toast.success("Thank you for your donation!");
      setIsModalOpen(true);
      setAmount("");
      setName("");
      setEmail("");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDonation(amount, name, email);
  };

  const handleModalClose = async () => {
    setIsModalOpen(false);
    await refetchDonations(); // Fetch data again when modal closes
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-bold text-center py-4">
            Make a Donation
          </CardTitle>
          <CardDescription className="text-center text-blue-100 pb-4">
            Your generosity makes a difference
          </CardDescription>
          <div className="text-center mt-2">
            {loadingDonations ? (
              <p>Loading...</p>
            ) : donationsError ? (
              <p className="text-red-500">{donationsError}</p>
            ) : (
              <p>
                Total Donations Today: $
                {lastDayDonations.data.length > 0
                  ? lastDayDonations.data[lastDayDonations.data.length - 1]
                      .total
                  : 0}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-700">
                Donation Amount ($)
              </Label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Your Name
              </Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              disabled={loading}
            >
              <Heart className="mr-2 h-5 w-5" />
              {loading ? "Processing..." : "Donate Now"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600 bg-gray-50 rounded-b-xl">
          Thank you for supporting our cause!
        </CardFooter>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message={`Thank you for your generous donation of $${amount}, ${name}!`}
      />
    </div>
  );
};

export default DonationForm;
