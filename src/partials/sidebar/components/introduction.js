import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

class Introduction extends React.Component {
  render() {
    return !isEmpty(this.props.content) ? (
      <div>
        <p className="Sidebar-Heading u-noPadding">Introduction</p>
        <ul className="Sidebar-List">
          <ul className="Sidebar-List">{this.props.content}</ul>
        </ul>
      </div>
    ) : null;
  }
}

Introduction.propTypes = {
  content: PropTypes.array
};

export default Introduction;
