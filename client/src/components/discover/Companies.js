import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompanies, getDistances } from "../../actions/companies";
import Spinner from "../common/Spinner";
import Company from "./Company";

import $ from "jquery";

//import css
import "./styling/hackathons.css";

const Companies = ({
  companies: { loading, companyList, numCompanies },
  getCompanies,
  getDistances,
}) => {
  const [numFilter, setNumFilter] = useState(1);
  useEffect(() => {
    console.log(numFilter);
    getCompanies(numFilter);
    getDistances(numFilter);
  }, [getDistances, numFilter]);

  //getting more hackathons when "show more" is clicked
  const paginate = async (e) => {
    setNumFilter(numFilter + 1);
  };

  const [search, setSearch] = useState("");

  const [donTag, setDonTag] = useState([]);

  const [distFilter, setDistFilter] = useState("");

  const [distFilterToggle, setDistFilterToggle] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submission");
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };
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

  const addTag = (e) => {
    if (!e.target.classList.contains("pressedTag")) {
      e.target.classList.add("pressedTag");

      setDonTag([...donTag, e.target.id]);
    } else {
      e.target.classList.remove("pressedTag");
      setDonTag(donTag.filter((tag) => tag != e.target.id));
    }
  };

  const prizeTypes = [
    "merch",
    "prizes",
    "food",
    "drinks",
    "workshop Hosting",
    "judging",
    "other",
  ];

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

  //a bit of jquery for animating the companies so they fade in
  $(document).ready(function () {
    let centerX = $(window).width() / 2;

    $(".company-item").each(function () {
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
      $(".company-item").each(function (i) {
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
      <div className="companies__wrapper">
        <div className="hackathons__filters">
          <h2 className="heading">Filters</h2>
          <div className="donTagsWrapper">
            <h3 onClick={(e) => {
                if (
                  document
                    .querySelector(".donTags")
                    .classList.contains("tdown")
                ) {
                  document.querySelector(".donTags").classList.add("tup");
                  document
                    .querySelector(".donTags")
                    .classList.remove("tdown");
                } else {
                  document
                    .querySelector(".donTags")
                    .classList.remove("tup");
                  document
                    .querySelector(".donTags")
                    .classList.add("tdown");
                }
              }} style={{ display: "inline-block" }}>Filter By Contribution</h3>
              <div className="donTags" style={{ overflow: "hidden" }}>
            {prizeTypes.map((prizeType, index) => (
              <div
                id={prizeType}
                key={index}
                className="donTag"
                onClick={(e) => addTag(e)}
              >
                {prizeType}
              </div>
            ))}
          </div>
          </div>

          <div className="locationWrapper">
            <h3
              onClick={(e) => {
                if (
                  document
                    .querySelector(".locationTags")
                    .classList.contains("ldown")
                ) {
                  document.querySelector(".locationTags").classList.add("lup");
                  document
                    .querySelector(".locationTags")
                    .classList.remove("ldown");
                } else {
                  document
                    .querySelector(".locationTags")
                    .classList.remove("lup");
                  document
                    .querySelector(".locationTags")
                    .classList.add("ldown");
                }
              }}
              style={{ display: "inline-block" }}
            >
              Filter by Distance <span className="dropdownArrow">&#86;</span>
            </h3>
            <div
              className="locationTags"
              style={{ overflow: "hidden" }}
              data-status="up"
            >
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
        <div className="companies__content-wrapper">
          <form className="searchingContainer" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              className="searchBar"
              placeholder="Search for a sponsor..."
              onChange={(e) => onChange(e)}
              value={search}
            />
            <input type="submit" className="search" value="Search" />
          </form>

          <div className="company-holder">
            {!loading ? (
              companyList
                .filter((company) => {
                  let distTrue = true;
                  let tagsTrue = true;
                  for (let i = 0; i < donTag.length; i++) {
                    if (!company.donationTypes[donTag[i]]) {
                      tagsTrue = false;
                    }
                  }

                  if (
                    distFilterToggle &&
                    Number(
                      company.distanceFromUser.split(" ")[0].split(",").join("")
                    ) > Number(distFilter.split(" ")[0])
                  ) {
                    distTrue = false;
                  }
                  return (
                    company.organization
                      .substring(0, search.length)
                      .toUpperCase() == search.toUpperCase() &&
                    tagsTrue &&
                    distTrue
                  );
                })
                .map((company, index) => (
                  <Company key={index} company={company} />
                ))
            ) : (
              <Spinner />
            )}
          </div>
          {numCompanies > numFilter * 10 ? (
            <button
              className="companies__see-more button"
              onClick={(e) => {
                console.log(numCompanies);
                console.log(numFilter);
                paginate(e);
              }}
            >
              See More Sponsors
            </button>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

Companies.propTypes = {
  companies: PropTypes.object,
  getCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  companies: state.companies,
});

export default connect(mapStateToProps, { getCompanies, getDistances })(
  Companies
);
