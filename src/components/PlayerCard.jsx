import PropTypes from "prop-types";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoCheckmark,
  IoSquare,
} from "react-icons/io5";

function convertHeightToInches(height) {
  const [feet, inches] = height.split("-").map(Number);
  return feet * 12 + inches;
}

function PlayerCard({ guess, answer }) {
  // Convert height and weight for comparison
  const guessHeight = convertHeightToInches(guess.height);
  const answerHeight = convertHeightToInches(answer.height);
  const guessWeight = parseInt(guess.weight, 10);
  const answerWeight = parseInt(answer.weight, 10);
  const guessDraftNumber = guess.draft_number;
  const answerDraftNumber = answer.draft_number;
  const guessDraftYear = guess.draft_year;
  const answerDraftYear = answer.draft_year;

  // Handle multiple positions
  const guessPositions = guess.position.split("-");
  const answerPositions = answer.position.split("-");
  const isPartialPositionMatch = answerPositions.includes(guessPositions[0]);

  const isHeightClose = Math.abs(guessHeight - answerHeight) <= 2;
  const isWeightClose = Math.abs(guessWeight - answerWeight) <= 20;
  const isDraftNumberClose =
    Math.abs(guessDraftNumber - answerDraftNumber) <= 2;
  const isDraftYearClose = Math.abs(guessDraftYear - answerDraftYear) <= 2;

  return (
    <div className="flex flex-wrap gap-6 items-center bg-gray-100 dark:bg-gray-600 dark:text-gray-100 p-2 rounded-lg text-lg sm:flex-col md:flex-row">
      {/* First + Last Name */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">
          {guess.first_name} {guess.last_name}
        </p>
        {guess.first_name === answer.first_name &&
        guess.last_name === answer.last_name ? (
          <IoCheckmark size={18} className="bg-green-300 mb-1" />
        ) : (
          ""
        )}
      </span>

      {/* Team Name */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.team.abbreviation}</p>
        {guess.team.abbreviation === answer.team.abbreviation ? (
          <IoCheckmark size={18} className="bg-green-300" />
        ) : (
          ""
        )}
      </span>

      {/* Team Conference */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.team.conference}</p>
        {guess.team.conference === answer.team.conference ? (
          <IoCheckmark size={18} className="bg-green-300" />
        ) : (
          ""
        )}
      </span>

      {/* Team Division */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.team.division}</p>
        {guess.team.division === answer.team.division ? (
          <IoCheckmark size={18} className="bg-green-300" />
        ) : (
          ""
        )}
      </span>

      {/* Position */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guessPositions[0]}</p>
        {guess.position === answer.position ? (
          <IoCheckmark size={18} className="bg-green-300" />
        ) : isPartialPositionMatch ? (
          <IoSquare size={18} className="text-yellow-300 bg-yellow-300" />
        ) : (
          ""
        )}
      </span>

      {/* Height */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.height}</p>
        {guessHeight < answerHeight ? (
          <IoArrowUpOutline
            size={18}
            className={isHeightClose ? "bg-yellow-300" : ""}
          />
        ) : guessHeight > answerHeight ? (
          <IoArrowDownOutline
            size={18}
            className={isHeightClose ? "bg-yellow-300" : ""}
          />
        ) : (
          <IoCheckmark size={18} className="bg-green-300" />
        )}
      </span>

      {/* Weight */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.weight}</p>
        {guessWeight < answerWeight ? (
          <IoArrowUpOutline
            size={18}
            className={isWeightClose ? "bg-yellow-300" : ""}
          />
        ) : guessWeight > answerWeight ? (
          <IoArrowDownOutline
            size={18}
            className={isWeightClose ? "bg-yellow-300" : ""}
          />
        ) : (
          <IoCheckmark size={18} className="bg-green-300" />
        )}
      </span>

      {/* Draft Year */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.draft_year}</p>
        {guess.draft_year > answer.draft_year ? (
          <IoArrowDownOutline
            size={18}
            className={isDraftYearClose ? "bg-yellow-300" : ""}
          />
        ) : guess.draft_year < answer.draft_year ? (
          <IoArrowUpOutline
            size={18}
            className={isDraftYearClose ? "bg-yellow-300" : ""}
          />
        ) : (
          <IoCheckmark size={18} className="bg-green-300" />
        )}
      </span>

      {/* Draft Number */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.draft_number}</p>
        {guessDraftNumber > answerDraftNumber ? (
          <IoArrowDownOutline
            size={18}
            className={isDraftNumberClose ? "bg-yellow-300" : ""}
          />
        ) : guessDraftNumber < answerDraftNumber ? (
          <IoArrowUpOutline
            size={18}
            className={isDraftNumberClose ? "bg-yellow-300" : ""}
          />
        ) : (
          <IoCheckmark size={18} className="bg-green-300" />
        )}
      </span>

      {/* Country */}
      <span className="inline-flex items-center gap-1">
        <p className="mt-1 text-sm sm:text-base">{guess.country}</p>
        {guess.country === answer.country ? (
          <IoCheckmark size={18} className="bg-green-300" />
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

PlayerCard.propTypes = {
  guess: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
};

export default PlayerCard;
