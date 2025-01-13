import PropTypes from "prop-types";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoCheckmark,
  IoCloseCircleOutline,
  IoSquare,
} from "react-icons/io5";

function HelpCard({ toggleShowHelp, showHelp }) {
  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:text-white flex justify-center items-center z-50">
      <section className="text-left bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">How to Play</h1>
          <IoCloseCircleOutline
            onClick={toggleShowHelp}
            size={30}
            className="hover:cursor-pointer"
          />
        </header>
        <main className="flex flex-col text-left space-y-2">
          <p>
            Start typing a player&apos;s name and select the player you want to
            guess. You&apos;ll get feedback after each guess to help you get
            closer to the right answer.
          </p>
          <p className="inline-flex items-center">
            <IoArrowUpOutline size={24} className="mr-1" /> = Number is higher.
          </p>
          <p className="inline-flex items-center">
            <IoArrowDownOutline size={24} className="mr-1" /> = Number is lower.
          </p>
          <p className="inline-flex items-center">
            <span className="inline-flex items-center justify-center">
              <IoSquare
                size={24}
                className="mr-1 text-yellow-300 bg-yellow-300"
              />
            </span>
            = Player plays multiple positions. Height, draft number, draft year
            ±2. weight ±20.
          </p>

          <p className="inline-flex items-center">
            <IoCheckmark size={24} className="mr-1 bg-green-300" /> = Correct.
          </p>
        </main>
        <footer>
          <p className="mt-3">Good luck!</p>
        </footer>
      </section>
    </div>
  );
}

HelpCard.propTypes = {
  toggleShowHelp: PropTypes.func.isRequired,
  showHelp: PropTypes.bool.isRequired,
};

export default HelpCard;
