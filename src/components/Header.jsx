import PropTypes from "prop-types";
import {
  IoHelpCircleOutline,
  IoMoonOutline,
  IoRefreshOutline,
  IoSunnyOutline,
} from "react-icons/io5";

function Header({ toggleShowHelp, toggleDarkMode, darkMode }) {
  return (
    <header className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 shadow-lg flex justify-between items-center p-3">
      <div className="inline-flex items-center gap-1">
        <img src="tipOffLogo.png" alt="TipOff Logo" className="w-10 mr-1" />{" "}
        <h1 className="text-xl font-bold mt-1">
          We&apos;re live for the tip-off!
        </h1>
      </div>
      <div className="inline-flex items-center gap-6 text-gray-900 dark:text-gray-100">
        <button onClick={() => window.location.reload(false)}>
          <IoRefreshOutline size={36} />
        </button>
        <button onClick={toggleShowHelp}>
          <IoHelpCircleOutline size={36} />
        </button>
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <IoMoonOutline size={30} />
          ) : (
            <IoSunnyOutline size={30} />
          )}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  toggleShowHelp: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Header;
