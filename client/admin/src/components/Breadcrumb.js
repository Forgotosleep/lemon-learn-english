import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      {/* <div></div> */}
      <nav>
        <ol class="bcrumb">
          <li class="bc-item">
            <Link to="/dashboard/class">Class</Link>
          </li>
          <li class="bc-item">
            <FontAwesomeIcon icon={faCaretRight} />
          </li>
          {/* <li class="bc-item" aria-current="page">
            Library
          </li> */}
        </ol>
      </nav>
    </>
  );
}
