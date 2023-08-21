import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";


function AddressNew() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const [userInput, setUserInput] = useState({
        consignee: '',
        phone: '',
        address: '',
        label: 'home', // 默认值
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
       
        setError('');

        if (!userInput.consignee) {
            setError('Consignee name is empty');
            return;
        }

        if (!userInput.phone) {
            setError('Phone is empty');
            return;
        }

        if (!userInput.address) {
            setError('Address is empty');
            return;
        }

        if (!userInput.label) {
            setError('Please choose a label');
            return;
        }

        
        console.log(userInput)

        try {
            const response = await axios.post('/api/user/addressBook', userInput, {
                headers: {
                    token: token,
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data)
            navigate('/checkout');
        } catch (error) {
            console.error('Error saving address:', error);
            setError('An error occurred while saving the address.');
        }

    };
    return (
        <>
            <div className="min-h-[65vh] container mx-auto" >
                <div className="bg-white py-8">
                    <div className="flex items-center">
                        <div
                            className="flex space-x-2 items-center border-r px-4 "
                            onClick={() => navigate("/checkout")}
                        >
                            <ArrowLeftOutlined /> <span>Back</span>
                        </div>
                        <span className="px-4 font-extrabold">Add Address</span>
                    </div>
                    <form
                        action=""
                        className="px-10 flex  flex-col space-y-8 py-4 w-full  my-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name">Consignee:</label>
                            <input
                                type="text"
                                id="consignee"
                                name="consignee"
                                value={userInput.consignee}
                                onChange={handleInputChange}
                                className="py-1 border max-w-lg rounded-md"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={userInput.phone}
                                onChange={handleInputChange}
                                className="py-1 border max-w-lg rounded-md"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="username">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={userInput.address}
                                onChange={handleInputChange}
                                className="py-1 border max-w-lg rounded-md"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="label">Label:</label>
                            <select
                                id="label"
                                name="label"
                                value={userInput.label}
                                onChange={handleInputChange}
                                className="py-1 border max-w-lg rounded-md"
                            >
                                <option value="home">Home</option>
                                <option value="office">Office</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="text-red-500 mt-5">{error && error}</div>
                        <div className="flex justify-center border-t py-4 space-x-4">
                            <button
                                className="bg-red-500 border py-2 px-4 rounded-md hover w-24 h-12"
                                onClick={() => navigate("/checkout")}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-yellow-500 py-2 px-4 rounded-md hover w-24 h-12"
                                
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddressNew;