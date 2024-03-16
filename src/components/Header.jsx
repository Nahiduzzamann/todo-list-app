import { Button, Modal } from "antd";
import { useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";
const Header = ({ user, setUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsModalVisible(false);
      setUpdate(Math.randome());
    } catch (error) {
      console.error(error);
      setIsModalVisible(false);
    }
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUpdate(Math.randome());
    } catch (error) {
      console.error(error);
    }
  };
  //   console.log(user);
  return (
    <div className="bg-blue-500  py-4 px-2">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className=" text-white text-xl md:text-3xl">Todo List App</h1>
        {user ? (
          <div>
            <p className="text-sm md:text-lg text-white cursor-pointer">
              Welcom, {user?.displayName}
            </p>
            <Button
              className="border border-white text-white"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            className="border border-white text-white"
            onClick={handleShowModal}
          >
            LogIn
          </Button>
        )}

        <Modal
          title="Login with Google"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              className="text-black "
              onClick={handleGoogleSignIn}
            >
              <GoogleOutlined /> Google Login
            </Button>,
          ]}
        >
          <p>Please LogIn and Enjoy your Todo App</p>
        </Modal>
      </div>
    </div>
  );
};
export default Header;
