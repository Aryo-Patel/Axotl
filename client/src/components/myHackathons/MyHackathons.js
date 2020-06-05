import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserHackathons, editHackathon } from "../../actions/hackathonActions";

import RecipientHackathon from "./RecipientHackathon";
import EditHackathonModal from "./EditHackathonModal";

//jquery import
import $ from "jquery";
//import the styling
import "../discover/styling/hackathons.css";
import "./styling/main.css";

//spinner
import Spinner from "../common/Spinner";
const MyHackathons = ({ getUserHackathons, id, hackathons, loading, user, editHackathon }) => {
  useEffect(() => {
    getUserHackathons();
  }, [getUserHackathons]);

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
  const [editingHackathon, setEditingHackathon] = useState({ x: "x" });
  const [editHackathonModal, toggleEditHackathonModal] = useState("closed");
  return (
    <Fragment>
      {user.myHackathons.length != 0 ? (
        <Fragment>
          <EditHackathonModal editingHackathon = {editingHackathon} editHackathonModal = {editHackathonModal} toggleEditHackathonModal = {toggleEditHackathonModal} editHackathon = {editHackathon} />
          <div className="top-banner">
            <h1>Your Hackathons</h1>
          </div>
          <div className="hackathon-container">
            {!loading ? (
              hackathons.map((hackathon, index) => (
                <RecipientHackathon
                  hackathon={hackathon}
                  key={index}
                  setEditingHackathon={setEditingHackathon}
                  toggleEditHackathonModal={toggleEditHackathonModal}
                />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </Fragment>
      ) : (
        <div className="emptyMessage">
          <h3 className="heading">You haven't made any hackathons yet</h3>
          <a href="/create-hackathon" className="link">
            Make One Here &rarr;
          </a>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  id: state.auth.user.user._id,
  hackathons: state.hackathons.hackathonList,
  loading: state.hackathons.loading,
  user: state.auth.user.user,
});

MyHackathons.propTypes = {
  getUserHackathons: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  hackathons: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  editHackathon : PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getUserHackathons, editHackathon })(MyHackathons);
