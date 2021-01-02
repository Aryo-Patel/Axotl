import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";

//import the CSS
import "./styling/hackathons.css";
//import the actions
import {
  getHackathons,
  getHackathonLocations,
} from "../../actions/hackathonActions";

//import components
import Spinner from "../common/Spinner";
import Hackathon from "./Hackathon";

//jquery import
import $ from "jquery";
const Hackathons = ({
  getHackathons,
  hackathons: { hackathonList, numHackathons, loading },
  getHackathonLocations,
}) => {
  const [numFilter, setNumFilter] = useState(1);
  //calls the get hackathon page when loading
  useEffect(() => {
    console.log(numFilter);
    getHackathons();
    getHackathonLocations(numFilter);
  }, [getHackathons, numFilter]);

  //getting more hackathons when "show more" is clicked
  const paginate = async (e) => {
    setNumFilter(numFilter + 1);
  };

  //state for search query
  const [query, setQuery] = useState("");

  //   const [donTag, setDonTag] = useState([]);

  //state for current distance filter
  const [distFilter, setDistFilter] = useState("0");

  //checking if distance is currently filtered
  const [distFilterToggle, setDistFilterToggle] = useState(false);

  //date range filters
  let dateToday = new Date();
  const [startDate, setStartDate] = useState(dateToday);
  let dateMonthOut = new Date();
  dateMonthOut = dateMonthOut.setDate(dateToday.getDate() + 30);
  const [endDate, setEndDate] = useState(dateMonthOut);
  const [dateFiltering, setDateFiltering] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  //   const addTag = (e) => {
  //     if (!e.target.classList.contains("pressedTag")) {
  //       e.target.classList.add("pressedTag");

  //       setDonTag([...donTag, e.target.id]);
  //     } else {
  //       e.target.classList.remove("pressedTag");
  //       setDonTag(donTag.filter((tag) => tag != e.target.id));
  //     }
  //   };

  //   const prizeTypes = [
  //     "merch",
  //     "prizes",
  //     "food",
  //     "drinks",
  //     "workshop Hosting",
  //     "judging",
  //     "other",
  //   ];
  const customLocationRouting = async (e) => {
    setDistFilterToggle(true);
    e.preventDefault();
    console.log(e.target.childNodes[0].value);
    Array.from(e.target.parentNode.parentNode.childNodes).forEach((tag) =>
      tag.classList.contains("pressedTag")
        ? tag.classList.remove("pressedTag")
        : null
    );
    if (e.target.childNodes[0].value === "0") {
      setDistFilter("1");
    } else {
      setDistFilter(e.target.childNodes[0].value);
    }
  };

  const locationRouting = async (e) => {
    const isCurr = e.target.innerHTML == distFilter;
    Array.from(e.target.parentNode.childNodes).forEach((tag) =>
      tag.classList.contains("pressedTag")
        ? tag.classList.remove("pressedTag")
        : null
    );
    if (isCurr) {
      e.target.classList.remove("pressedTag");
      setDistFilterToggle(false);
    } else {
      e.target.classList.add("pressedTag");
      setDistFilterToggle(true);
    }
    setDistFilter(e.target.innerHTML);
  };

  //a bit of jquery for animating the hackathons so they fade in
  $(document).ready(function () {
    let centerX = $(window).width() / 2;

    $(".hackathon-item").each(function () {
      $(this).position().left > centerX
        ? $(this).css({ transform: "translate(300px, 0px)" })
        : $(this).css({ transform: "translate(-300px, 0px)" });

      $(this).hover(
        () => {
          $(this).css({ transform: "scale(1.05)" });
        },
        () => {
          $(this).css({ transform: "scale(1)" });
        }
      );
      if (
        $(this).position().top + $(this).height() - $(this).height() * 0.5 <
        $(window).scrollTop() + $(window).height()
      ) {
        $(this).css({
          transition: "1s",
          transform: "translate(0px, 0px)",
          opacity: "1",
        });
      }
    });
    $(window).resize(function () {
      centerX = $(window).width() / 2;
    });
    $(window).scroll(function (i) {
      $(".hackathon-item").each(function (i) {
        let objectBottom =
          $(this).position().top + $(this).height() - $(this).height() * 0.5;
        let windowBottom = $(window).scrollTop() + $(window).height();
        let windowTop = $(window).scrollTop();
        if (objectBottom < windowBottom) {
          $(this).css({
            transition: "1s",
            transform: "translate(0px, 0px)",
            opacity: "1",
          });
        }
        if (objectBottom > windowBottom || objectBottom < windowTop - 200) {
          $(this).position().left > centerX
            ? $(this).css({ transform: "translate(300px, 0px)", opacity: "0" })
            : $(this).css({
                transform: "translate(-300px, 0px)",
                opacity: "0",
              });
        }
        // if (objectBottom < windowTop) {
        //     console.log('this ran');
        //     $(this).position().left > centerX ? $(this).css({ 'transform': 'translate(300px, 0px)', 'opacity': '0' }) : $(this).css({ 'transform': 'translate(-300px, 0px)', 'opacity': '0' });
        // }
      });
    });
  });
  return (
    <Fragment>
      <div className="hackathons__wrapper">
        <div className="hackathons__filters">
            <h2 className="heading">Filters</h2>
          {/* <div className="donTags">
                        <h3 style={{ display: 'inline-block' }}>Contribution Tags: </h3>
                        {prizeTypes.map((prizeType, index) => (<div id={prizeType} key={index} className='donTag' onClick={e => addTag(e)}>{prizeType}</div>))}
                    </div> */}
            <div className="dateWrapper">
          <h3
            onClick={(e) => {
                    if (document.querySelector('.dateTags').classList.contains('ddown')) {
                        document.querySelector('.dateTags').classList.add('dup');
                        document.querySelector('.dateTags').classList.remove('ddown');
                    } else {
                        document.querySelector('.dateTags').classList.add('ddown');
                        document.querySelector('.dateTags').classList.remove('dup');
                    }
                  
            }}
            style={{ display: "inline-block" }}
          >
            Filter by Date <span className="dropdownArrow">&#86;</span>
          </h3>
          <div style={{overflow: 'hidden'}} className="dateTags" data-status="up">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            <button
              className="dateSubmit"
              onClick={(e) => {
                setDateFiltering(!dateFiltering);
              }}
            >
              Filter
            </button>
          </div>
          </div>
          <div className="locationWrapper">
          <h3
            onClick={(e) => {
                
                    if (document.querySelector('.locationTags').classList.contains('ldown')) {
                        document.querySelector('.locationTags').classList.add('lup');
                        document.querySelector('.locationTags').classList.remove('ldown');
                    } else {
                        document.querySelector('.locationTags').classList.remove('lup');
                        document.querySelector('.locationTags').classList.add('ldown');
                    }
            }}
            style={{ display: "inline-block" }}
          >
            Filter by Distance <span className="dropdownArrow">&#86;</span>
          </h3>
          <div className="locationTags" style={{overflow: 'hidden'}} data-status="up">
            <div className="locTag" onClick={(e) => locationRouting(e)}>
              10 miles
            </div>
            <div className="locTag" onClick={(e) => locationRouting(e)}>
              25 miles
            </div>
            <div className="locTag" onClick={(e) => locationRouting(e)}>
              50 miles
            </div>
            <div className="locTag" onClick={(e) => locationRouting(e)}>
              100 miles
            </div>
            <div className="locTag" onClick={(e) => locationRouting(e)}>
              250 miles
            </div>
            <div className="locTag" onClick={(e) => locationRouting(e)}>
              1000 miles
            </div>
            <div
              className="locTag"
              onClick={(e) => {
                e.target.nextSibling.dataset.status = "custom";
              }}
            >
              Custom Distance
            </div>
            <div className="customLocTag" data-status="nocustom">
              <form
                action=""
                className="locTagForm"
                onSubmit={(e) => customLocationRouting(e)}
              >
                <input type="text" className="locTagInput" />{" "}
                <button className="locTagSubmit">Filter</button>
              </form>
            </div>
          </div>
        </div>
        </div>
        <div className="hackathons__content">
          <form className="searchingContainer" onSubmit={(e) => onSubmit(e)}>
          <div className = "searchBarHolder">
              <div className = "favicon-holder">
                <i id = "faviconSearch" className="fas fa-search"></i>
              </div>
              <input
                type="text"
                className="searchBar"
                placeholder="Search for a hackathon..."
                onChange={(e) => onChange(e)}
                value={query}
              />
            </div>
          </form>

          <div className="hackathon-holder">
            {!loading ? (
              hackathonList
                .filter((hackathon) => {
                  let distTrue = true;
                  let tagsTrue = true;
                  let dateTrue = true;
                  // for(let i = 0; i < donTag.length; i++) {
                  //     if(!hackathon.donationTypes[donTag[i]]) {
                  //         tagsTrue = false;
                  //     }
                  // }
                  // console.log(`distfiltertoggle : ${distFilterToggle}`)
                  // console.log(`distFilter: ${distFilter}`)
                  // console.log(hackathon.distanceFromUser.split(" ")[0].split(",").join(""))

                  //date filtering

                  const testDate = new Date(hackathon.startDate);
                  console.log(testDate);
                  console.log(startDate < testDate && testDate < endDate);
                  console.log(dateFiltering);
                  if (
                    dateFiltering &&
                    !(startDate < testDate && testDate < endDate)
                  ) {
                    dateTrue = false;
                  }
                  console.log(dateTrue);

                  //distance filtering
                  if (hackathon.distanceFromUser || distFilter === "0") {
                    // console.log(distFilterToggle);
                    // console.log(
                    //   distFilterToggle &&
                    //     Number(
                    //       hackathon.distanceFromUser
                    //         .split(" ")[0]
                    //         .split(",")
                    //         .join("")
                    //     ) > Number(distFilter.split(" ")[0])
                    // );
                    if (
                      distFilterToggle &&
                      Number(
                        hackathon.distanceFromUser
                          .split(" ")[0]
                          .split(",")
                          .join("")
                      ) > Number(distFilter.split(" ")[0])
                    ) {
                      distTrue = false;
                    }
                  } else {
                    distTrue = false;
                  }
                  return (
                    hackathon.title.substring(0, query.length).toUpperCase() ==
                      query.toUpperCase() &&
                    dateTrue &&
                    tagsTrue &&
                    distTrue
                  );
                })
                .map((hackathon, index) => (
                  <Hackathon key={index} hackathon={hackathon} />
                ))
            ) : (
              <Spinner />
            )}
          </div>
          {numHackathons > numFilter * 10 ? (
            <button
              className="hackathons__see-more button"
              onClick={(e) => {
                console.log(numHackathons);
                console.log(numFilter);
                paginate(e);
              }}
            >
              See More Hackathons
            </button>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

Hackathons.propTypes = {
  getHackathons: PropTypes.func.isRequired,
  hackathons: PropTypes.object.isRequired,
  numHackathons: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  hackathons: state.hackathons,
});

export default connect(mapStateToProps, {
  getHackathons,
  getHackathonLocations,
})(Hackathons);
