import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./styling/common.css";
const Alert = ({ alerts }) => {
    const [alertStatus, setAlertStatus] = useState('empty')
    useEffect(() => {
        console.log(alerts)
        if(alerts) {
            setAlertStatus('full')
        }
    }, [alerts])
  return (
    <div className="alerts" data-status={alertStatus}>
      {alerts ? alerts.map((alert) => (
        <h4 className={`alert ${alert.class}`}>{alert.message}</h4>
      )) : null}
    </div>
  );
};

Alert.propTypes = {};
const mapStateToProps = (state) => ({
    alerts : state.alert.alerts
})

export default connect(mapStateToProps, {})(Alert);
